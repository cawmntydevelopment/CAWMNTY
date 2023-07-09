import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import {AccountBox} from "./Swipper/AccountBox";
import {ACCOUNT} from "../../config/customData";
import {shuffleColor} from "../../services/functions";


export const AccountsSwipper = () => {
    return (
        <Swiper
            spaceBetween={50}
            slidesPerView={2}
        >
            {ACCOUNT.map((user) => {
                return (
                    <SwiperSlide>
                        <AccountBox username={user.username} bg={shuffleColor()} count={+user.count}/>
                    </SwiperSlide>
                )
            })}


        </Swiper>
    );
};

