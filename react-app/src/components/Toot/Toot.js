import React, { useState } from "react";
import {format} from 'timeago.js';
import { useParams } from "react-router-dom";
import ReplyModal from "../ReplyModal";
import OpenModalButton from "../OpenModalButton";
import { useSelector } from "react-redux";
import RetootModal from "../RetootModal";

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
    function viewsAlert(e){
        e.preventDefault();
        alert('These are the views of this individual tweet.');
    }

    const innerToot=<div id="inner">
        <div id="left" style={{height: 'min-content'}} dangerouslySetInnerHTML={{__html:`<a href='/user/${toot.author.id}'>
            <img src=${toot.author.picture||
                'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'}
                alt="" id="small_picture">
            </img>
        </a>`}}/>
        <div id="right">
            <span id="author" dangerouslySetInnerHTML={
                {__html: `<a href='/user/${toot.author.id}'><span id="username_link">${toot.author.name}</span> @${toot.author.username}</a> · ${format(toot.time)}` }
            }/>
            <br></br>
            {showReplying && toot.parent_author && <p dangerouslySetInnerHTML={{__html: `Replying to <a id="tag" href="/user/${toot.parent_author.id}">@${toot.parent_author.username}</a>`}}/>}
            <br></br>
            {formatText(toot.text)}
            <br></br>
            <br></br>
            <span id="stats">
                <OpenModalButton
                    buttonText={`<span>💬${replies || '\u00A0'}</span>`}
                    modalComponent={<ReplyModal parent={toot} setReplies={setReplies}/>}
                />

                <OpenModalButton
                    buttonText={`<span>🔄${toot.retoots || '\u00A0'}</span>`}
                    modalComponent={<RetootModal original={toot}/>}
                />

                <div onClick={toggleLike}>
                    <span>{liked ? '❤️' : '🤍'}</span>
                    <span>{likes || '\u00A0'}</span>
                </div>
                
                <div onClick={viewsAlert}>📈{toot.views || '\u00A0'}</div>

                <div onClick={copyURL}>{copied ? '✅' : '📤'}</div>
            </span>
        </div>
    </div>


    
    if(toot.original_id){
        return <div id="toot">
            <br></br>
            <a href={`/user/${toot.author.id}`}><span id="retoot">🔄 {toot.author.name} Retooted</span></a>
            <Toot toot={toot.original}/>
        </div>
    } else {
        return(
            <div id="toot" ref={ref}>
                {parseInt(tootId)===toot.id ? innerToot : <a href={`/toot/${toot.id}`}>{innerToot}</a>}
            </div>
        )
    }

});

export default Toot;