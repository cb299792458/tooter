import React from "react"
import { useSelector } from "react-redux";

function RightBar() {
    const sessionUser = useSelector(state => state.session.user)

return <>
    {sessionUser && <div id="right-bar">
        <input type="search" placeholder="Search Tooter"></input>
        <div>Get Verified</div>
        <div>What's Happening</div>
        <div>Who to Follow</div>
        <div>Footer</div>
    </div>}
</>
}

export default RightBar;