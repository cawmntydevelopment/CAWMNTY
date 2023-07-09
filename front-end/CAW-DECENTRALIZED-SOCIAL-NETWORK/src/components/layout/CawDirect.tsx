import React from 'react';
import {Box} from "@mui/material";
import {SettingButton} from "./Settings/SettingButton";
import Typography from "@mui/material/Typography";
import {MessageBox} from "./CawDirect/MessageBox";
import {MESSAGES} from "../../config/customData";


export const CawDirect = ({setActive}: { setActive: any }) => {


    return (
        <Box sx={{px: "20px", mt: "23px"}}>
            {MESSAGES.map((item) => {
                return <MessageBox view={item.view} setActive={setActive} id={item.chatId} image={item.image} username={item.username}
                                   message={item.message}/>
            })}
        </Box>
    );
};
