import React from 'react';
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";

const BOX = {
    textAlign: "center",
    cursor:"pointer"
}

const IMAGE = {
    width: "60px",
    borderRadius: "100px",
    border: "4px solid transparent"
}

const NEW = {
    border: "4px solid #F9C336"
}

const ONLINE = {
    border: "4px solid #63E368"
}

const BLOCK = {
    border: "4px solid #DC5454"
}

const AVATAR = {
    position: "relative"
}

const STATUS = {
    position: "absolute",
    bottom: 0,
    borderRadius: "4px",
    pl: "5px",
    pr: "5px",
    fontSize: "13px",
    fontWeight: "bold"
}

const USERNAME = {
    fontSize: "13px",
    mt: "3px",
    fontWeight: "bold",
    fontFamily: "Karla",
    color:"krmrPlate.mainTextColor"
}

export const UserCard = ({username, image, type}: { username: string, image: string, type?: string | undefined }) => {

    const typeSX = () => {
        if (type) {

            if (type === "new") return {
                name: "NEW",
                sx: {...IMAGE, ...NEW},
                background: "#F9C336"
            };

            if (type === "online") return {
                name: "ONLINE",
                sx: {...IMAGE, ...ONLINE},
                background: "#63E368"
            };

            if (type === "block") return {
                name: "BLOCK",
                sx: {...IMAGE, ...BLOCK},
                background: "#DC5454"
            };

        }
        return {
            name: null,
            sx: {...IMAGE},
            background: "#F9C336"
        }
    }

    const imgSX = username === "AI" ? {...typeSX().sx, width: "95px"} : typeSX().sx;


    return (
        <Box key={username + (Math.floor(Math.random() * 10000))} sx={BOX}>
            <Box sx={AVATAR} display={"flex"} justifyContent={"center"}>
                <Box component={"img"} sx={imgSX} src={image}/>
                {type &&
									<Box sx={{...STATUS, background: typeSX().background}}>{typeSX().name}</Box>
                }
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
                <Typography
                    sx={USERNAME}>
                    @{username}</Typography>

            </Box>
        </Box>
    );
};
