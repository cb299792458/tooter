import React from "react";
import {format} from 'timeago.js';

function Toot({toot}){
    // toot.author.picture||='https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'
    return(<div id="toot">
        <img src={toot.author.picture||'https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/egg-3442-e1f6463624338504cd021bf23aef8441@1x.jpg'} alt="" id="picture"></img>
        <div id="right">
            <span id="author">{toot.author.name} @{toot.author.username} {format(toot.time)}</span>
            <br></br>
            <br></br>
            <p>{toot.text}</p>
            <br></br>
            <span id="stats">Replies Retoot Likes Views Share</span>
        </div>
    </div>)
}

export default Toot;