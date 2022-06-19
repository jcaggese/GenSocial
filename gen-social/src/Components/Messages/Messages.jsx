import { React, useState, useEffect } from "react"
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";
import HomepageNavbar from "../Homepage/HomepageNavbar";
import Message from "./Message"


export default function Posts() {

    const [messageEls, setMessageEls] = useState([])

    function handleMessage() {
        if(document.getElementById("message-box").value === "" && document.getElementById("username-to-send").value === ""){
            console.log("Please fill out the fields");
            return;
        }
        if(document.getElementById("message-box").value === ""){
            console.log("Message text is empty");
            return;
        }
        if(document.getElementById("username-to-send").value === ""){
            console.log("No username to send message to");
            return;
        }
        try {
            axios.post(`http://localhost:9080/messages/${localStorage.getItem("loggedId")}`, {
                "text": document.getElementById("message-box").value,
                "target": document.getElementById("username-to-send").value,
                "username": localStorage.getItem("loggedUser")
            }).then((response) => {
                console.log("here");
                if (response.status === 200) {
                    console.log("Posted!")
                    window.location.reload();
                }
                else {
                    console.log("found error");
                }
            }).catch(err => {
                if(err.response.status === 404){
                    console.log("User not found");
                }
                else{
                    console.log("I don't know what happened");
                }
            })
        }
        catch (err) {
            console.log("Error Posting")
            console.log(err);
        }
    };

    async function getMessages() {
        axios.get(`http://localhost:9080/messages`).then((response) => {
            if (response.status === 200) {
                console.log("Messages retrieved")
                let toShow = [localStorage.getItem("loggedUser")]
                console.log(toShow)
                console.log("Response data");
                console.log(response.data);
                let el = []
                for (let i = 0, j = 0; i < response.data.length; i++) {
                    if (toShow.includes(response.data[i].target.username) || toShow.includes(response.data[i].user.username)) {
                        console.log("aye");
                        console.log(response.data[i].target)
                        console.log(response.data[i].messageText);
                        el[j++] = <Message key={response.data[i].messageId} selectedMessageId={response.data[i].messageId} user={response.data[i].user.username} target={response.data[i].target} msg={response.data[i].messageText}
                            time={new Date(response.data[i].time)} />
                    }
                }
                setMessageEls(el.reverse())
            }
        })
    }



    useEffect(() => {
        getMessages();
    }, []);

    return (
        <div>
            <div>
                <HomepageNavbar />
            </div>
            <div className='messages' style={{ display: "flex", backgroundColor: "#2E8BC0" }}>
                <div className='settings-account' style={{ border: "solid black 5px", width: "300px", height: "200px", aligncontent: "center" }}>
                    <h2 className='settings-account-picture'>{localStorage.getItem("loggedUser")}</h2>
                </div>
                <div className='messages-container' style={{ alignContent: "center" }}>
                    <div>
                        <label style={{ color: "white"}}>Please enter desired user to receive the message: </label>
                        <input id="username-to-send" type="text"></input>
                        <textarea id="message-box" className="new-post-box" placeholder="Type message here"></textarea>
                    </div>

                    {messageEls}
                    <button onClick={handleMessage}>Send Message</button>
                </div>
            </div>
        </div>
    )
}

