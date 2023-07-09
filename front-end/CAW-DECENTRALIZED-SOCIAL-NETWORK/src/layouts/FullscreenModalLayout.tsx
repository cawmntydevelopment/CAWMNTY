import {
    AppBar,
    AppBarPropsColorOverrides,
    Dialog,
    Grid,
    IconButton,
    Paper,
    PropTypes,
    Slide,
    Toolbar,
    Typography
} from "@mui/material";
import {Close as CloseIcon} from '@mui/icons-material';
import React, {forwardRef, useEffect} from "react";
import MainLayout from "./MainLayout";
import {CircularLoading} from "../components/Loading";
import {OverridableStringUnion} from "@mui/types";

const FULL_SIZE = {
    width: "100%",
    height: "100%"
}

const APP_BAR = {
    position: "fixed"
}

// @ts-ignore
const TITLE = (theme) => ({
    marginLeft: theme.spacing(2),
    flex: 1
})

const Transition = forwardRef(({children, ...props}, ref) => (
    <Slide direction="up" ref={ref} {...props}>
        {children as React.ReactElement}
    </Slide>
));

function FullscreenModalLayout(
    {
        open,
        onClose,
        onEnter,
        children,
        loading = false,
        title,
        paperWrap = false,
        color = "primary",
        MiddleComponent,
        CustomAppBar = null,
        ...props
    }: {
        open: boolean,
        onClose: () => void,
        onEnter: () => void,
        children: React.ReactNode,
        loading?: boolean,
        title?: string,
        paperWrap?: boolean,
        color?: OverridableStringUnion<PropTypes.Color | 'transparent', AppBarPropsColorOverrides>,
        MiddleComponent?: React.ReactNode,
        CustomAppBar?: React.ReactNode,
        [key: string]: any
    }) {

    function closeHandler() {
        if (!loading) {
            onClose();
        }
    }

    const Content = paperWrap ? (
        <MainLayout>
            <Paper sx={FULL_SIZE}>
                {children}
            </Paper>
        </MainLayout>
    ) : children;

    useEffect(!!onEnter ? onEnter : () => null, []);

    return (
        <Dialog
            fullScreen
            open={open}
            onClose={closeHandler}
            scroll="body"
            TransitionComponent={Transition as any}
            {...props}
        >
            {
                CustomAppBar ??
							<AppBar sx={APP_BAR} color={color}>
								<Toolbar>
									<Grid container alignItems="center">
										<Grid container justifyContent="flex-start" item md={4} xs={12}>
											<Typography variant="h6" sx={TITLE}>
                          {loading ? "Loading..." : title}
											</Typography>
										</Grid>

										<Grid container justifyContent="center" item md={4} xs={10}>
                        {MiddleComponent}
										</Grid>
										<Grid container justifyContent="flex-end" item md={4} xs={2}>
											<IconButton
												edge="start"
												color="inherit"
												onClick={closeHandler}
												aria-label="close"
											>
												<CloseIcon/>
											</IconButton>
										</Grid>

									</Grid>
								</Toolbar>
							</AppBar>
            }
            {loading ? <CircularLoading/> : Content}
        </Dialog>
    );
}

export default FullscreenModalLayout;
