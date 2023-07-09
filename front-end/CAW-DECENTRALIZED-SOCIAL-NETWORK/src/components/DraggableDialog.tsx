import React, {ComponentProps} from "react";
import {Dialog, Paper, Typography, IconButton, styled, Theme} from "@mui/material";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Draggable from "react-draggable";
import CloseIcon from '@mui/icons-material/Close';

const TITLE = ((theme: Theme) => ({
    margin: 0,
    padding: theme.spacing(2)
}));

const DialogTitleStyled = styled(MuiDialogTitle)(({theme}) => ({
    margin: 0,
    padding: theme.spacing(2)
}));

const CloseButtonWrapper = styled(IconButton)(({theme}) => ({
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
}));

function PaperComponent(props: ComponentProps<typeof Paper>) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={"[class*=\"MuiDialogContent-root\"]"}>
            <Paper {...props} />
        </Draggable>
    );
}

const DialogTitle = ({children, onClose, showCloseButton, ...props}: {
    children: React.ReactNode,
    onClose?: () => void,
    showCloseButton?: boolean,
    [key: string]: any
}) => {
    return (
        <DialogTitleStyled {...props}>
            <Typography variant="h6">{children}</Typography>
            {showCloseButton && onClose ? (
                <CloseButtonWrapper aria-label="close" onClick={onClose}>
                    <CloseIcon/>
                </CloseButtonWrapper>
            ) : null}
        </DialogTitleStyled>
    );
};


function DraggableDialog({open, onClose, showCloseButton = false, title, children, ...props}: {
    open: boolean,
    onClose: () => void,
    showCloseButton?: boolean,
    title: string,
    children: React.ReactNode,
    [key: string]: any
}) {

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            {...props}
        >
            <DialogTitle id="draggable-dialog-title"
                         showCloseButton={showCloseButton}
                         onClose={onClose}
                         style={{cursor: "move"}}>
                {title}
            </DialogTitle>
            {children}
        </Dialog>
    );
}

export default DraggableDialog;
