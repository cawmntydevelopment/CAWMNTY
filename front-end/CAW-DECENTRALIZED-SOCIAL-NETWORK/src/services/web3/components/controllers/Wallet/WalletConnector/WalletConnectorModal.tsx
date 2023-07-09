import * as React from "react";
import {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import {Box, Grid, ListItemIcon, MenuItem, MenuList} from "@mui/material";
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import {CircularLoading} from "../../../../../../components/Loading";
import dapprexLogoSmall from "../../../../../../assets/dapprex_small.png"
import {Connector, useAccount, useConnect} from "wagmi";
import {getConnectorInformationByConnector} from "../../../../helpers";
import env from "../../../../../../config/env";
import CableIcon from '@mui/icons-material/Cable';
import KRMR from "../../../../../../assets/krmr.png"

const CONNECTOR_LOGO = {
    width: 32,
    height: 32,
};

const TOOLTIP = (theme: any) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgb(64, 68, 79, 0.3)",
        color: "white",
        fontSize: theme.typography.pxToRem(10)
    }
});

const TOOLTIP_TYPOGRAPHY = (theme: any) => ({
    p: 0.3,
    fontSize: theme.typography.pxToRem(10)
});

const DEVELOPER_LOGO = {
    width: 24,
    height: 24
};

const PAPER_PROPS = {
    component: Grid,
    container: true,
    justifyContent: "center",
    alignItems: "center",
    sx: {
        backgroundColor: "white",
        padding: 3,
        borderRadius: "14px",
    }
};

const MENU_ITEM = (theme: any) => ({
    my: 2,
    py: 1.5,
    width: "100%",
    backgroundColor: "#F9C336",
    borderRadius: theme.spacing(1.5),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
    height:"53px",
    "&:hover": {
        transition: "0.5s",
        background: "#14213D"
    }
});

const BOX_BG_TOP = {
    width: "100%",
    height: "16px",
    background: "#F9C336",
    position: "absolute",
    top: 0
}

const BOX_BG_BOTTOM = {
    width: "100%",
    height: "16px",
    background: "#F9C336",
    position: "absolute",
    bottom: 0
}

const DEVELOPER_URL = atob(env.DEVELOPER_URL_BTOA);
const DEVELOPER_NAME = atob(env.DEVELOPER_NAME_BTOA);

function ConnectorActivatorButton(
    {
        loading,
        setLoading,
        connector
    }: { loading: boolean, setLoading: (status: boolean) => void, connector: Connector }) {
    const {connect} = useConnect({connector});
    const {isConnecting} = useAccount();

    const connectorInformation = getConnectorInformationByConnector(connector);

    async function handleActivateConnector() {
        !loading && connect();
    }

    useEffect(() => {
        setLoading(isConnecting);
    }, [isConnecting])

    return (
        <MenuItem onClick={handleActivateConnector} key={connector.id} sx={MENU_ITEM}>
            <ListItemIcon>
                {
                    connectorInformation?.icon ?
                        <Box component="img" src={connectorInformation.icon} sx={CONNECTOR_LOGO}/> :
                        <CableIcon sx={{ml: "3px"}}/>

                }
            </ListItemIcon>
            <Typography variant="inherit" sx={{color: "white",fontSize:"20px", fontWeight:"bold"}}>{connector.name}</Typography>
        </MenuItem>
    )
}

function WalletConnectorModal({onClose, open}: { onClose: () => void; open: boolean; }) {
    const [loading, setLoading] = useState(false);
    const {connectors} = useConnect();

    const handleClose = () => {
        !loading && onClose();
    };

    function handleSetLoading(status: boolean) {
        setLoading(status);
    }

    return (
        <Dialog disableEscapeKeyDown={loading} maxWidth="xs"
                fullWidth
                onClose={handleClose}
                open={open}
                PaperProps={PAPER_PROPS}
        >
            <Box sx={BOX_BG_TOP}/>
            <Box sx={{width:"45px", marginTop: "23px", marginBottom:"15px"}} component={"img"} src={"/assets/img/logo.png"}/>
            <CircularLoading loading={loading} sx={{zIndex: 9999}}/>
            <MenuList sx={{width: "100%"}}>
                {connectors.map((connector: Connector) => (
                    <ConnectorActivatorButton key={connector.id} loading={loading} setLoading={handleSetLoading}
                                              connector={connector}/>
                ))}
            </MenuList>
            {/*<Tooltip*/}
            {/*    title={*/}
            {/*        <Typography sx={TOOLTIP_TYPOGRAPHY}>{atob('RGV2ZWxvcGVkIGJ5')} {DEVELOPER_NAME}</Typography>*/}
            {/*    }*/}
            {/*    sx={TOOLTIP}>*/}
            {/*    <Box component="a" href={DEVELOPER_URL} target="_blank" sx={{mb: -1}}>*/}
            {/*        <Box component="img" src={KRMR} draggable="false" sx={DEVELOPER_LOGO}/>*/}
            {/*    </Box>*/}
            {/*</Tooltip>*/}
            <Box sx={BOX_BG_BOTTOM}/>
        </Dialog>
    );
}

export default WalletConnectorModal
