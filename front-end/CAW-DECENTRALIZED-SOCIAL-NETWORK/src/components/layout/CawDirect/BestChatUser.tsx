import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {Box} from '@mui/material';
import {UserCard} from "./UserCard";
import {MESSAGES} from "../../../config/customData";

const BOX = {
    width: "100%",
    border: "4px solid #F9C336",
    p: 2,
    position: "relative",
    borderRadius: "20px"
}

const BEST_ICON = {
    background: "#F9C336",
    borderRadius: "14px 0px 46px",
    width: "55px",
    height: "45px",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    display: "flex",
}

export const BestChatUser = ({setActive}: {setActive: any }) => {
    return (
        <div>
            <Box sx={BOX}>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                >
                    {MESSAGES.map((data) => {
                        return (
                            <SwiperSlide onClick={() => setActive(data.chatId)}>
                                <UserCard image={data.image} type={data.type} username={data.username}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                <Box sx={BEST_ICON}>
                    <Box sx={{fontSize: "20px", mt: "7px", ml: "11px", color:"krmrPlate.starIcon"}} component={"i"} className={"fa-solid fa-star"}/>
                </Box>
            </Box>
        </div>
    )
};

