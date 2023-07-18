import "./story.css"
import { Link } from "react-router-dom/cjs/react-router-dom.min"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import OneStory from "../oneStory/OneStory";

function Story() {
    const { user:currentUser } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [stories, setStories] = useState([]);

    useEffect(()=>{
        const fetchStory = async() => {
            const res = await axios.get("/story/friends/"+currentUser._id)
            setStories(res.data);
        }
        fetchStory()
    }, [currentUser])

    return (
        <div className="storyContainer">
            <div className="storyFriends">
                <Link to="/createstory" style={{textDecoration: "none", color: "#000"}}>
                <div className="storyFriend" >
                    <div className="storyProfileImgDiv" >
                    <img className="storyProfileImg" src={PF + currentUser.profilePicture} />
                    </div>
                    <span className="storyUsername">Your Story</span>
                </div>
                </Link>
                
                {stories.map(str=>{
                    return <OneStory key={str} story={str}/>
                })}
            </div>
        </div>
    )
}

export default Story
