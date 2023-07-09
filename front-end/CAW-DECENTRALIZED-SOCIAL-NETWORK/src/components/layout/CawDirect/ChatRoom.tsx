import React, {useEffect, useRef, useState} from 'react';
import {Alert, Avatar, Box, IconButton} from "@mui/material";
import {shuffleBotMessage, shuffleColor} from "../../../services/functions";
import Typography from "@mui/material/Typography";
import {ROOM} from "../../../config/customData";
import {RoomChats} from "../RoomChats";
import {You} from "./UserMessage/You";
import {Me} from "./UserMessage/Me";

const random = shuffleColor;

const AVATAR = {
    background: random,
    width: "35px",
    height: "35px",
    fontSize: "15px",
    ml:1
}

const HEADER = {
    backgroundColor: "krmrPlate.mainBg",
    position: "absolute",
    top: 55,
    left: 0,
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.07))",

}

const USERNAME = {
    ml: "15px",
    fontSize: "18px",
    fontFamily: "Karla",
    fontWeight: "bold"
}

const ICON = {
    fontSize: "21px",
    color: "#F9C336"
}

const MESSAGE_BOX = {
    backgroundColor: "krmrPlate.mainBg",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "60px",
    display: "flex",
    alignItems: "center",
    boxShadow: "20px 17px 19px 17px rgba(0, 0, 0, 0.1)",
    px: "29px",
    zIndex: 5
}

const INPUT = {
    width: "98%",
    marginRight: "15px",
    height: "42px",
    paddingLeft: "24px",
    backgroundColor: "#F1F1F1",
    border: "none",
    borderRadius: "12px",
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Karla",
    color: "black"
}

const SEND_BUTTON = {
    height: "42px",
    width: "42px",
    backgroundColor: "#F9C336",
    border: "none",
    borderRadius: "12px",
    fontSize: "20px",
    cursor: "pointer"
}

export const ChatRoom = ({id,setActive}: { id: string,setActive:any }) => {

    const filtered = ROOM.filter(event => event.chatId === id);

    if (filtered.length < 1) return (<Box sx={{px: "14px"}}>
            <Alert severity="error" color="error">
                Unable to access chat.
            </Alert>
        </Box>
    )

    const chat = filtered?.[0];
    const [send, setSend] = useState<any[]>([...chat?.message]);
    const [meToMessage, setMeToMessage] = useState('');


    const handleChange = (event: any) => {
        setMeToMessage(event.target.value);
    };

    const handleEnter = (event: any) => {
        if (event.code === "Enter") return sendMessage()
    };

    function sendMessage() {
        const newMessage = [...send, {
            type: "me",
            message: meToMessage
        }]
        bot(newMessage, meToMessage)
        setSend(newMessage);
    }


    function bot(message: any, myMessage: string) {

        setTimeout(() => {
            setSend([...message, {
                type: "you",
                message: shuffleBotMessage(myMessage)
            }]);
        }, 1100)
    }


    useEffect(() => {
        setMeToMessage("")
    }, [send])

    return (
        <Box>
            <Box sx={HEADER}>
                <Box display={"flex"} alignItems={"center"} sx={{width: "50%"}}>
                    <IconButton onClick={() => setActive("")} sx={{
                        ml: "25px",
                        fontSize:"20px"
                    }}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </IconButton>
                    <Box component={"img"}
                         src={"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0Ij48ZGVmcz48c3R5bGU+LmNscy0xe2lzb2xhdGlvbjppc29sYXRlO2ZpbGw6dXJsKCNBZHNpel9kZWdyYWRlXzEwKTt9LmNscy0ye2ZvbnQtc2l6ZTo4OC4zNHB4O2ZvbnQtZmFtaWx5OlZlcmRhbmEtQm9sZCwgVmVyZGFuYTtmb250LXdlaWdodDo3MDA7fS5jbHMtM3tmaWxsOm5vbmU7fS5jbHMtNHtmaWxsLXJ1bGU6ZXZlbm9kZDt9PC9zdHlsZT48bGluZWFyR3JhZGllbnQgaWQ9IkFkc2l6X2RlZ3JhZGVfMTAiIHgxPSItMS42NSIgeTE9IjkzLjk1IiB4Mj0iODMzLjM3IiB5Mj0iNzczLjU2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZlZTM4Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZWM5MDAxIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3QgY2xhc3M9ImNscy0xIiB3aWR0aD0iMTAyNCIgaGVpZ2h0PSIxMDI0IiByeD0iNDIuOCIvPjx0ZXh0IGNsYXNzPSJjbHMtMiIgc3R5bGU9InRleHQtYW5jaG9yOm1pZGRsZTsiIHg9IjUxMiIgeT0iNTEyIj5BSTwvdGV4dD48cmVjdCBjbGFzcz0iY2xzLTMiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHJ4PSI0Mi44Ii8+PHBhdGggZD0iTTUxMiw3ODAuNzZjLTEzNC4xMiwwLTI0My4yMiwxMDkuMTItMjQzLjIzLDI0My4yNEgzMDQuNWMwLTExNC40MSw5My4wOC0yMDcuNSwyMDcuNDktMjA3LjVTNzE5LjQ5LDkwOS41OSw3MTkuNSwxMDI0aDM1LjczQzc1NS4yMiw4ODkuODgsNjQ2LjExLDc4MC43Niw1MTIsNzgwLjc2WiIvPjxwYXRoIGQ9Ik02NzMuMzQsOTYzbC00MS42OCw2MWgtNjAuNmMzLjU0LTI0LjUzLDIzLjQ1LTQ2LDI4LjkxLTUyLjg0bDAsMGgwWiIvPjxwYXRoIGQ9Ik00NTMsMTAyNEgzOTIuMzJsLTQxLjY3LTYwLjczLDczLjM0LDhoMEM0MjkuNDUsOTc4LjEzLDQ0OS4zOSw5OTkuNDcsNDUzLDEwMjRaIi8+PHBhdGggZD0iTTQ4Ny40OCw4NTkuMjdjMTUuOS0zLjQ0LDMyLjU1LTMuMTksNDkuNzksMGwtMTAuOTEsNDMuNjEsMjQuODcsMTYsOTIuNC03LjE5TDYwMCw5NzEuMTVjLTEwLjIyLDEuNTItNDguMzYsMTAuNTMtNzIuMy04LjA3TDUxMiw5OTkuMmgwbC0xNS43My0zNi4xYy0yMy45MSwxOC42NC02Mi4wNiw5LjctNzIuMjgsOC4xOWwtNDMuNzItNTkuNDYsOTIuNDEsNy4wNiwyNC44NS0xNi0xMS00My41OWMxNy4yNC0zLjE3LDMzLjg5LTMuNDUsNDkuNzksMFoiLz48ZyBpZD0iXzk2NjM4NCIgZGF0YS1uYW1lPSI5NjYzODQiPjxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTUwMS40OCw2MDIuNzVsLTEzLjgxLTEzLjgxLTQuNiw0LjZMNTAxLjQ4LDYxMmwzOS40NS0zOS40Ni00LjYtNC42WiIvPjwvZz48L3N2Zz4="}
                         sx={{...AVATAR, borderRadius:"100px"}}/>
                    <Typography sx={USERNAME}>@{chat.user}</Typography>
                </Box>
                <Box display={"flex"} justifyContent={"end"} sx={{width: "50%"}}>
                    <IconButton sx={{mr: "25px"}} color="inherit">
                        <Box component={"i"} sx={ICON} className="fa-solid fa-circle-info"></Box>
                    </IconButton>
                </Box>
            </Box>


            <RoomChats messages={send}/>
            <Box sx={MESSAGE_BOX}>
                <Box sx={INPUT} value={meToMessage} onChange={handleChange} placeholder={"Message..."}
                     component={"input"} onKeyPress={handleEnter}/>
                <Box sx={SEND_BUTTON} onClick={() => sendMessage()} component={"button"}>
                    <Box component={"i"} className="fa-solid fa-paper-plane"></Box>
                </Box>
            </Box>

        </Box>
    );
};
