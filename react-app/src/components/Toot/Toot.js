import React from "react";
import {format} from 'timeago.js';

function Toot({toot}){
    return(<div id="toot">
        <img src={toot.author.picture} alt="" id="picture"></img>
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