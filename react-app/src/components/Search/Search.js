import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function Search(){
    const {query} = useParams();
    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return <div id="search">
        {'You searched for '+query}
    </div>
}

export default Search;