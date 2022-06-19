import { React, useEffect, useState } from "react"
import axios from "axios"
import MessagePopup from "./MessagePopup"

export default function Post(props) {
    //props will have a User, Message, and Time

    const [isOpen, setIsOpen] = useState(false)
    const [update, setUpdate] = useState(false)
    const [toDelete, setToDelete] = useState(false)


    const handleIsOpen = () => {
        console.log("this is update on handleIsOpen: " + update);
        console.log("this is toDelete on handleIsOpen: " + toDelete);
        setIsOpen(!isOpen)
    }

    async function handlePost(e) {

        try {
            console.log("update in try of handle " + update);
            console.log("delete in try of handle " + toDelete);
            // If the delete button is pressed

            console.log("!update & toDelete");
            setToDelete(!toDelete)
            setUpdate(!update)
            console.log(toDelete);
            if (localStorage.getItem("loggedUser") !== { props }.props.user) {
                console.log("Username of post does not match");
            }
            else {
                try {
                    console.log({props}.props.selectedMessageId);
                    axios.delete(`http://localhost:9080/messages/${{ props }.props.selectedMessageId}`)
                        .then((res) => {
                            console.log("Delete was successful")
                            window.location.reload();
                        })
                } catch (error) {

                }
            }

        }
        catch (err) {
            console.log(err);
        }
    }

    const toggleUpdate = () => {
        setUpdate(true)
        setToDelete(false)
    }

    const toggleDelete = () => {
        setUpdate(false)
        setToDelete(true)
    }

    useEffect(() => {

    }, []);

    return (
        <div className='post'>
            <button className="edit-icon" style={{ height: "20px", float: "right", backgroundColor: "yellow" }}>
                <small style={{ position: "relative", bottom: "7px", fontWeight: "bold", }} onClick={handleIsOpen}>...</small>
            </button>
            <h4>Sent to: {props.target.username}      Sender: {props.user}</h4>
            <p>{props.msg}</p>
            <div className="timestamp">
                <small>{props.time.toLocaleString()}</small>
            </div>
            {isOpen && <MessagePopup
                content={
                    <>
                        <div style={{ paddingTop: "50px" }}>
                            <h1>Delete Message</h1>
                        </div>
                        <div>
                            <button id="delete-post" onClick={handlePost}>delete</button>
                            <button style={{ margin: "50px" }} onClick={handleIsOpen}>cancel</button>
                        </div>
                    </>}
            />

            }
        </div >
    )
}