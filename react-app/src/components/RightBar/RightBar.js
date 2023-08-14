import React, { useState } from "react"
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import desantis from "./desantis.png"
import fight from "./fight.png"
import elon from "./elon.png"
import flag from "./flag.png"
import kill from "./kill.jpg"

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
                <input id="search-bar" type="search" placeholder="&#128270; Search" value={query} onChange={(e)=>setQuery(e.target.value)} />
            </form>
            <div id='verified'>
                <h5>Get Verified</h5>
                <h6>Get a blue checkmark for $8.</h6>
                <div id="blue-button" onClick={()=>alert('Tootr is 100% free. Tootr is not responsible for nor entitled to any part of funds exchanged between users. If you would like to waste $8 per month in order to show off your own stupidity, then you\'re not the right kind of person to use Tootr.')}><h5>Get Verified</h5></div>
            </div>
            <div id="happening">
                <h5>What's Happening</h5>
                <a href="https://www.cnn.com/2023/08/14/tech/zuckerberg-musk-cage-fight-move-on-hnk-intl/index.html">
                    <div id="article">
                        <h6>Sports · Trending</h6>
                        <h5>Musk Scared to Fight Zuckerberg</h5>
                        <h6>867k posts</h6>
                    </div>
                    <img src={fight} alt='' />
                </a>
                <a href="https://www.bloomberg.com/news/articles/2023-07-24/twitter-turning-into-x-is-set-to-kill-billions-in-brand-value#xj4y7vzkg">
                    <div id="article">
                        <h6>Business · Trending</h6>
                        <h5>Twitter Losing Billions</h5>
                        <h6>309k posts</h6>
                    </div>
                    <img src={kill} alt='' />
                </a>
                <a href="https://apnews.com/article/twitter-spaces-musk-desantis-presidential-f1d67097d0ec19616bd0b0d320cb27d1">
                    <div id="article">
                        <h6>Politics · Trending</h6>
                        <h5>DeSantis Campaign Ruined</h5>
                        <h6>420k posts</h6>
                    </div>
                    <img src={desantis} alt='' />
                </a>
                <a href="https://www.cnn.com/2023/04/19/tech/twitter-hateful-conduct-policy-transgender-protections/index.html">
                    <div id="article">
                        <h6>Trending in United States</h6>
                        <h5>Transphobia on Twitter</h5>
                        <h6>745k posts</h6>
                    </div>
                    <img src={flag} alt='' />
                </a>
                <a href="https://www.vanityfair.com/news/2022/04/elon-musk-twitter-terrible-things-hes-said-and-done">
                    <div id="article">
                        <h6>Celebrities · Trending</h6>
                        <h5>Elon Generally Horrible, also bald (not projecting)</h5>
                        <h6>745k posts</h6>
                    </div>
                    <img src={elon} alt='' />
                </a>

            </div>
            <div id="footer">
                Terms of Service
                Privacy Policy
                Cookie Policy
                Accessibility
                More Info
                © 2023 Tootr Corp.
            </div>
        </div>}
    </div>
}

export default RightBar;