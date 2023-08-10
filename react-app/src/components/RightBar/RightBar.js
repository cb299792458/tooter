import React, { useState } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function RightBar() {
    const sessionUser = useSelector(state => state.session.user);
    const [query,setQuery] = useState('');
    const history = useHistory();

    function search(){
        history.push(`/search/${query}`)
    }

    return <div id="right-holder">
        {sessionUser && <div id="right-bar">
            <form onSubmit={search}>
                <input type="search" placeholder="Search Tooter" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </form>
            <div>Get Verified</div>
            <div>What's Happening</div>
            <div>Who to Follow</div>
            <div>Footer</div>
        </div>}
    </div>
}

export default RightBar;