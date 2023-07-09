import React from 'react';
import {Box, Skeleton} from "@mui/material";


const USERNAME = {
    fontSize: "19px",
    fontWeight: "bold",
    fontFamily: "Karla",
    textAlign: "center"
}

const WALLET_BUTTON = {
    backgroundColor: "#EEEEEE",
    px: "25px",
    py: "2px",
    textAlign: "center",
    borderRadius: "5px",
    fontSize: "12px",
    fontWeight: "bold",
    fontFamily: "Karla",
    mt: "9px",
    cursor: "pointer",
    color: "#8C8C8C",

}

const WALL_BOX = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const WALLET_ICON = {
    mr: "9px",
}

const FOLLOWERS_BOX = {
    display: "flex",
    justifyContent: "center",
    mt: "15px",
    alignItems: "center"
}

const FOLLOWERS_BOX_ITEM = {
    fontFamily: "Karla",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#8C8C8C",
    cursor: "pointer",
    display: "flex"
}

const LINE = {
    mx: "9px",
    height: "14.5px",
    width: "2px",
    background: "#E8E8E8",
}


const BUTTON = {
    width: "75px",
    border: "none",
    borderRadius: "100px",
    py: "3px",
    fontFamily: "Karla",
    fontWeight: "bold",
    backgroundColor: "#F9C336",
    cursor: "pointer",
    fontSize: "17px",
    ml:1
}

export const UserInfo = ({decodeProfile,data}: { decodeProfile:any,data: any }) => {

    return (
        <Box sx={{mt: "43px", width: "100%"}} display={"grid"} justifyContent={"center"}>
            {
                data ?
                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Box sx={USERNAME}>{decodeProfile() ? "@" + decodeProfile()?.name : data.username}</Box>
                        <Box justifyContent={"center"} display={"flex"} sx={BUTTON}>
                            Follow
                        </Box>
                    </Box>

                    :
                    <Box sx={USERNAME}>
                        <Skeleton></Skeleton>
                    </Box>

            }



            <Box sx={WALL_BOX}>
                {
                    data ?
                        <Box sx={WALLET_BUTTON}>
                            <Box sx={WALLET_ICON} component={"i"} className={"fa-solid fa-wallet"}/>

                            0x1b5...1Acee
                        </Box>
                        :
                        <Skeleton width={"100px"}/>
                }
            </Box>
            <Box sx={FOLLOWERS_BOX}>
                <Box sx={FOLLOWERS_BOX_ITEM}>{data ? data.follower : <Skeleton sx={{mr: 1}} width={"45px"}/>} Follower</Box>
                <Box sx={LINE}/>
                <Box sx={FOLLOWERS_BOX_ITEM}>{data ? data.followed : <Skeleton sx={{mr: 1}} width={"45px"}/>} Followed</Box>
            </Box>

        </Box>
    );
};
