import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMessages, getMessages } from "../../store/message";
import OpenModalButton from "../OpenModalButton";
import MessageModal from "../MessageModal";

function Messages(){
    const dispatch = useDispatch();
    const sessionUser = useSelector((state)=>state.session.user);
    const messages = useSelector(getMessages);
    const [viewSent,setViewSent] = useState(false);

    useEffect(()=>{
        dispatch(fetchMessages());
    },[dispatch]);
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    function formatSent(msg){
        return <div id="inner" key={msg.id}>
            <div id="left" style={{height: 'min-content'}} dangerouslySetInnerHTML={{__html:`<a href='/user/${msg.sender.id}'>
                <img src=${msg.receiver.picture||
                    'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'}
                    alt="" id="small_picture">
                </img>
            </a>`}}/>
            <div id="right">
                <div id="title">
                    <span id="author" dangerouslySetInnerHTML={
                        {__html: `<a href='/user/${msg.receiver.id}'><span>To: </span><span id="username_link">${msg.receiver.name}</span> @${msg.receiver.username}</a>` }
                    }/>
                </div>
                <br></br>
                {msg.text}
                <br></br>
            </div>
            <OpenModalButton
                buttonText={'<div id="blue-button">Message</div>'}
                modalComponent={<MessageModal user={msg.receiver}/>}
            />
        </div>
    }

    function formatInbox(msg){
        return <div id="inner" key={msg.id}>
            <div id="left" style={{height: 'min-content'}} dangerouslySetInnerHTML={{__html:`<a href='/user/${msg.sender.id}'>
                <img src=${msg.sender.picture||
                    'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'}
                    alt="" id="small_picture">
                </img>
            </a>`}}/>
            <div id="right">
                <div id="title">
                    <span id="author" dangerouslySetInnerHTML={
                        {__html: `<a href='/user/${msg.sender.id}'><span>From: </span><span id="username_link">${msg.sender.name}</span> @${msg.sender.username}</a>` }
                    }/>
                </div>
                <br></br>
                {msg.text}
                <br></br>
            </div>
            <OpenModalButton
                buttonText={'<div id="blue-button">Reply</div>'}
                modalComponent={<MessageModal user={msg.sender}/>}
            />
        </div>
    }
    
    const inbox = messages.filter((msg)=>sessionUser&&msg.receiver.id===sessionUser.id);
    const sent = messages.filter((msg)=>sessionUser&&msg.sender.id===sessionUser.id);
    

    return <div id="messages">
        <h3>Messages</h3>
        <div id="follow_bar">
            <div id="half" onClick={()=>setViewSent(false)}>
                <span style={viewSent ? {} : {fontWeight: "bold"}} >Inbox</span>
            </div>
            
            <div id="half" onClick={()=>setViewSent(true)}>
                <span style={viewSent ? {fontWeight: "bold"} : {}} >Sent</span>
            </div>
        </div>
        {/* <div id="blue-button" onClick={()=>alert('To write a message, click the blue "Message" button on any user\'s profile!')}>Write a Message</div> */}
        {messages && viewSent && sent.map(formatSent)}
        {messages && !viewSent && inbox.map(formatInbox)}
    </div>
}

export default Messages;