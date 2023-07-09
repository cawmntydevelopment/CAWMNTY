import {Box, CircularProgress, Skeleton, SkeletonTypeMap} from "@mui/material";
import React from "react";
// @ts-ignore
import LoadingMask from "react-loadingmask";
import "react-loadingmask/dist/react-loadingmask.css";
import MainLayout from "../layouts/MainLayout";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SxProp} from "../styles/theme";

const LOADING_SHADING = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, .3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

const LOADING_ICON = {
    position: "absolute",
    fontSize: "20px",
    zIndex: 999999999
    //top: "calc(45% - 10px)",
    //left: "calc(50% - 10px)"
}

const LOADING_SHADING_WRAPPER = {
    "&::after": {
        backgroundColor: "rgba(255, 255, 255, .3)"
    }
}

const LOADING_ICON_WRAPPER = {
    fontSize: "20px"
}


export function CircularLoadingWrapper({sx = {}, loading, children, ...props}: {
    sx?: SxProp,
    loading?: boolean,
    children?: React.ReactNode,
    [key: string]: any
}) {
    const CircularIndicator = (
        <CircularProgress sx={LOADING_ICON_WRAPPER}/>
    );

    return (
        <LoadingMask sx={[LOADING_SHADING_WRAPPER, sx]}
                     loading={loading}
                     indicator={CircularIndicator}
                     {...props}>
            {children}
        </LoadingMask>
    );
}

export function CircularLoading({sx = {}, center = false, loading = true, ...props}: {
    sx?: SxProp,
    center?: boolean,
    loading?: boolean,
    [key: string]: any
}) {
    const LoadingCircle = (
        <Box sx={[
            LOADING_SHADING,
            //@ts-ignore
            sx
        ]} {...props}>
            <CircularProgress sx={LOADING_ICON as any}/>
        </Box>
    );

    if (!loading) return null;
    if (center) {
        return (
            <MainLayout dynamicHeight={!center}>
                {LoadingCircle}
            </MainLayout>
        );
    } else {
        return LoadingCircle;
    }
}


export function SkeletonLoadingWrapper({
                                           loading = true,
                                           variant = "text",
                                           animation = "wave",
                                           loadingComponent,
                                           children,
                                           ...props
                                       }: SkeletonLoadingWrapperInterface) {
    return (
        loading ?
            <Skeleton variant={variant} animation={animation} {...props}>
                {loadingComponent ?? children}
            </Skeleton>
            : children
    );
}

interface SkeletonLoadingWrapperInterface extends OverridableComponent<SkeletonTypeMap> {
    animation: "pulse" | "wave" | false,
    classes: any,
    component: JSX.Element,
    height: string | number,
    variant: "text" | "rectangular" | "circular" | undefined,
    width: string | number,
    loading: boolean,
    loadingComponent: JSX.Element,
    children: React.ReactNode
}
