import React, { useState } from "react";
import {format} from 'timeago.js';
import { useParams } from "react-router-dom";
import ReplyModal from "../ReplyModal";
import OpenModalButton from "../OpenModalButton";
import { useSelector } from "react-redux";

// function Toot({toot}){
const Toot = React.forwardRef(({toot,showReplying},ref) => {
    const {tootId}=useParams();
    const [replies,setReplies] = useState(toot.reply_count);
    const [copied,setCopied] = useState(false);
    const [likes,setLikes] = useState(toot.likes.length);
    const sessionUser = useSelector((state)=>state.session.user);

    const sessionUserLiked = () => {
        if(!sessionUser||!toot) return false;
        for(let like of toot.likes){
            if(like.liker_id===sessionUser.id) return true;
        }
        return false;
    }
    const [liked,setLiked] = useState(sessionUserLiked());
    

    const puncts = './!\n'.split('');
    function formatText(text){
        let words = text.split(' ');
        let res = <span>
            {words.map((word,i)=>{
                if(word && word[0] && (word[0]==='@' || word[0]==='#')){
                    let space=' '
                    if(puncts.includes(word.at(-1))){
                        space=word.at(-1)+' '
                        word=word.slice(0,word.length-1)
                    }
                    const type = word[0]==='@' ? 'u=' : 't='
                    return <span key={i} dangerouslySetInnerHTML={{__html: `<a id="tag" href='/search/${type}${word.slice(1)}'>${word+space}</a>`}}/>
                } else {
                    return <span key={i}>{word+' '}</span>;
                }
            })}
        </span>
        return res
    }
    function copyURL(e){
        e.preventDefault();
        setCopied(true);
        navigator.clipboard.writeText(`https://tootr.onrender.com/toot/${toot.id}`);
    }
    async function toggleLike(e){
        e.preventDefault();

        const res = await fetch('/api/likes/toggle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({liker_id: sessionUser.id, liked_toot_id: toot.id})
        })

        if(res.ok){
            const change = liked ? -1 : 1;
            setLikes(likes + change);
            setLiked((p)=>!p);
        }
    }

    const innerToot=<>
        <div id="left" style={{height: 'min-content'}} dangerouslySetInnerHTML={{__html:`<a href='/user/${toot.author.id}'>
            <img src=${toot.author.picture||
                'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'}
                alt="" id="small_picture">
            </img>
        </a>`}}/>
        <div id="right">
            <span id="author" dangerouslySetInnerHTML={
                {__html: `<a href='/user/${toot.author.id}'><span id="username_link">${toot.author.name}</span> @${toot.author.username}</a> ${format(toot.time)}` }
            }/>
            <br></br>
            {/* {showReplying && toot.parent_author && <p>Replying to <a id="tag" href={`/user/${toot.parent_author.id}`}>@{toot.parent_author.username}</a></p>} */}
            {showReplying && toot.parent_author && <p dangerouslySetInnerHTML={{__html: `Replying to <a id="tag" href="/user/${toot.parent_author.id}">@${toot.parent_author.username}</a>`}}/>}
            <br></br>
            {formatText(toot.text)}
            <br></br>
            <br></br>
            <span id="stats">
                <OpenModalButton
                    buttonText={`<span>💬
                        ${replies || ''}
                    </span>`}
                    modalComponent={<ReplyModal parent={toot} setReplies={setReplies}/>}
                />

                <div>🔄</div>

                <div onClick={toggleLike}>
                    <span>{liked ? '❤️' : '🤍'}</span>
                    <span>{likes || ''}</span>
                </div>
                
                <div>📈{toot.views || ''}</div>

                <div onClick={copyURL}>{copied ? '✅' : '📤'}</div>
                {/* <svg viewBox="0 0 24 24" onClick={copyURL}><g><path d={copied ? "M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z" : "M12 2.59l5.7 5.7-1.41 1.42L13 6.41V16h-2V6.41l-3.3 3.3-1.41-1.42L12 2.59zM21 15l-.02 3.51c0 1.38-1.12 2.49-2.5 2.49H5.5C4.11 21 3 19.88 3 18.5V15h2v3.5c0 .28.22.5.5.5h12.98c.28 0 .5-.22.5-.5L19 15h2z"}></path></g></svg> */}
            </span>
        </div>
    </>

    return(
        <div id="toot" ref={ref}>
            {parseInt(tootId)===toot.id ? innerToot : <a href={`/toot/${toot.id}`}>{innerToot}</a>}
        </div>
    )
});

export default Toot;