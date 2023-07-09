import React, {useEffect, useState} from 'react';
import {Box, Grid} from "@mui/material";
import {RightBar} from "../../components/layout/RightBar";
import {ProfileHeader} from "../../components/layout/ProfileHeader";
import {UserInfo} from "../../components/layout/Profile/UserInfo";
import {UserPosts} from "../../components/layout/Profile/UserPosts";
import {BOOKMARKS_DATA, myUserData, POST_DATA} from "../../config/customData";
import {CAW} from "../../components/layout/caw";
import {load} from "../../utils/storage";

const MAIN = {
    animation: "fadeInUpBig",
    animationDuration: "1s"
}

export const ProfileScreen = ({trendData,accountData}:{trendData:any,accountData?:any}) => {
    const [profileData, setProfileData] = useState<any>();
    const [myPostData, setMyPostData] = useState<any[]>()
    const [myBookmarksData, setMyBookmarksData] = useState<any[]>()

    useEffect(() => {
        setTimeout(() => setProfileData(myUserData), 2000);
        setTimeout(() => setMyPostData(POST_DATA), 2000);
        setTimeout(() => setMyBookmarksData(BOOKMARKS_DATA), 2000);
    }, []);

    const isData = profileData ? {p: 2.5, pt: "75px"} : {px: 2.5};

    const [profileHash, setProfileHash] = useState("");

    const decodeProfile = () => {
        if (profileHash?.length > 0) {
            return JSON.parse(atob(profileHash))
        }
    }


    useEffect(() => {
        setInterval(() => {
            if (profileHash !== load("access_token")) {
                setProfileHash(load("access_token"))
            }
        }, 900)
    }, [])


    return (
        <Box sx={MAIN}>
            <CAW/>
            <Grid container spacing={0}>
                <Grid sx={{marginBottom: "85px"}} item lg={8} md={8} sm={12} xs={12}>
                    <Box sx={isData}>
                        <ProfileHeader decodeProfile={decodeProfile} data={profileData}/>
                        <UserInfo decodeProfile={decodeProfile} data={profileData}/>
                    </Box>
                    <UserPosts myBookmarksData={myBookmarksData} myPostData={myPostData}/>
                </Grid>
                <Grid item  lg={4} md={4} sm={12} xs={12} sx={(theme) => (
                    {
                        pt: "75px",
                        [theme.breakpoints.down('md')]: {
                            display: "none",
                        },
                    }
                )}>
                    <RightBar trendData={trendData} accountData={accountData}/>
                </Grid>
            </Grid>
        </Box>
    );
};

