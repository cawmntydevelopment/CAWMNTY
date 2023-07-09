import React, {useState} from 'react';
import {Box} from "@mui/material";
import {custom_3} from "../../../config/customData";
import {IPOSTDATA} from "../../../services/types";
import {Post} from "../Post";
import {LoadPost} from "../Loader/LoadPost";

const BOX = {
    marginTop: "18px",
    px: 2.5
}

const TABS = {
    width: "50%",
    height: "45px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontFamily: "Karla",
    fontWeight: "700",
    fontSize: "18px",
    "&.active": {
        transition: "0.3s",
        borderBottom: "5px solid #F9C336"
    }
}


export const UserPosts = ({myBookmarksData, myPostData}: {myBookmarksData: any, myPostData: any }) => {

    const [tabs, setTabs] = useState<"post" | "bookmakrs">("post")

    const handleTabs = () => {
        if (tabs === "post") return setTabs("bookmakrs")
        return setTabs("post")
    }

    function SelectedScreen() {
        if (tabs === "post") {
            return (
                <>
                    {myPostData ?
                        myPostData?.map((data: IPOSTDATA, count: number) => {
                            return <Post key={count} data={data}/>
                        }) :
                        custom_3.map(() => <LoadPost/>)
                    }
                </>

            )
        }
        if (tabs === "bookmakrs") {
            return (
                <>
                    {myPostData ?
                        myBookmarksData?.map((data: IPOSTDATA, count: number) => {
                            return <Post key={count} data={data}/>
                        }):
                        custom_3.map(() => <LoadPost/>)
                    }
                </>
            )
        }
    }


    return (
        <>
            <Box sx={(theme) => (
                {
                    ...BOX,
                    [theme.breakpoints.down('md')]: {
                        px: 0
                    },
                }
            )} display={"flex"}>
                <Box sx={TABS} onClick={handleTabs} className={tabs === "post" ? "active" : ""}>Post</Box>
                <Box sx={TABS} onClick={handleTabs} className={tabs === "bookmakrs" ? "active" : ""}>Bookmarks</Box>
            </Box>
            <Box sx={{px: 2}}>
                {SelectedScreen()}
            </Box>
        </>
    );
};
