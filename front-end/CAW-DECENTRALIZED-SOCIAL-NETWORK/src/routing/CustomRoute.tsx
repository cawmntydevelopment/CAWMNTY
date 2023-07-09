import React from "react";
import {Navigate} from "react-router-dom";
import {paths} from "./Router";
import {observer} from "mobx-react-lite";
import {motion} from "framer-motion";
import {styled} from "@mui/material/styles";
import {CustomRouteInterface} from "./types";
import {Helmet} from "react-helmet-async";
import env from "../config/env";

const defaultRouteMotion = {
    animations: {
        initial: {opacity: 0},
        animate: {opacity: 1},
        exit: {opacity: 0},
    },
    transition: {duration: 0.25}
};

const AnimationWrapper = styled(motion.div)(({theme}) => ({
    width: "100%",
    height: "100%",

}))

const {APP_NAME} = env;

const CustomRoute = ({route}: CustomRouteInterface) => {
    //const store = useStore();
    //const isAuthenticated = store.auth.isLoggedIn;

    const isProtected = route?.isProtected;
    const isAuthenticated = true;
    const isAuthorized = !isProtected || isAuthenticated;

    const isAnimated = typeof route?.isAnimated !== "undefined" ? route?.isAnimated : true;

    const motionAnimations = route?.motion?.animations ?? defaultRouteMotion.animations;
    const motionTransation = route?.motion?.transition ?? defaultRouteMotion.transition;

    const RouteContent = route.element;

    const ContentWithHelmet = (
        <>
            <Helmet>
                <title>{route?.title?.head ?? APP_NAME}</title>

            </Helmet>
            <RouteContent/>
        </>
    );

    const AnimatedRoute = isAnimated ?
        <>
            <AnimationWrapper
                variants={motionAnimations}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={motionTransation}
            >
                {ContentWithHelmet}
            </AnimationWrapper>
        </>
        : ContentWithHelmet

    return isAuthorized ?
        AnimatedRoute
        :
        <Navigate  to={paths.login}/>;
};

export default observer(CustomRoute);
