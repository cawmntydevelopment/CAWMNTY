import React, {useEffect, useRef} from 'react';
import {Alert, Box} from "@mui/material";
import {Me} from "./CawDirect/UserMessage/Me";
import {You} from "./CawDirect/UserMessage/You";

const BOX = {
    width: "100%",
    height: "90vh",
    overflow: "auto",
    py: "60px",
    fontSize: "18px",
}
export const RoomChats = ({messages}: { messages: any }) => {


    const bottomEl = useRef(null);

    const scrollToBottom = () => {
        (bottomEl?.current as unknown as any)?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages])



    return (
        <Box sx={BOX}>

            {
                messages.length < 1 &&
							<Box sx={{px: 4}}>
								<Alert severity="info">You do not have a message with this user. Say hello to him 👋 Start with hello 🫢</Alert>
							</Box>
            }

            {messages?.map((msg: any) => {
                if (msg.type === "you") return <You message={msg.message}/>
                if (msg.type === "me") return <Me message={msg.message}/>
            })}
            <div ref={bottomEl}></div>

        </Box>
    );
};

