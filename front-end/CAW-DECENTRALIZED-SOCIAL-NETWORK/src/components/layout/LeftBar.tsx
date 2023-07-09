import React, {useEffect, useState} from 'react';
import {Box, Modal, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "../../utils/routing";
import {useAccount, useDisconnect} from "wagmi";
import {WalletButton} from "../../services/web3";
import {WalletConnectorBox} from "./LeftBar/WalletConnectedBox";
import {MenuItem} from "./LeftBar/MenuItem";
import {Link, useLocation} from "react-router-dom";
import {MintUsernameModal} from "./MintUsernameModal";
import {load} from "../../utils/storage";


// STYLE
const MAIN = {
    width: "10%",
    position: "fixed",
    borderRadius: "0",
    paddingLeft: "10px",
    paddingRight: "10px",
    // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    zIndex: 4,
    animation: "fadeInLeftBig",
    animationDuration: "1s",
}

const DISPLAY_NONE = {
    display: 'none'
}

const MENU_LOGO = {
    width: "50px",
    height: '50px',

}

const MENU_BOX = {
    textAlign: "center",
    marginBottom: "20px"
}


const MENU = {
    display: "grid",
    justifyContent: "center"
};


export const LeftBar = ({theme,handleModalOpen,handleModalClose,mintModalOpenn}: any) => {

    // WAGMI
    const {address: account} = useAccount();
    const plate = theme.palette.krmrPlate;
    const cawDirectLogo = theme.palette.mode === "dark" ? "/assets/img/caw-direct-dark.png" : "/assets/img/caw-direct-light.png";
    const cawDirectText = theme.palette.mode === "dark" ? "/assets/img/caw-direck-text-dark.png" : "/assets/img/caw-direck-text-light.png";
    const location = useLocation();
    const pathname = location.pathname;




    return (
        <Box sx={{height: '100vh', position:"relative"}} display={"flex"} alignItems={"center"}>
            <Box sx={(theme) => (
                {
                    ...MAIN,
                    backgroundColor: "krmrPlate.mainBg",
                    [theme.breakpoints.down('md')]: DISPLAY_NONE,
                }
            )}>
                <Box>
                    <Box sx={MENU_BOX}>
                        <img style={MENU_LOGO} src={"/assets/img/logo.png"}/>
                    </Box>
                </Box>


                <Box sx={MENU}>
                    <Link to="/">
                        <MenuItem image={false} icon={"fa-solid fa-house"} name={"home"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/explore">
                        <MenuItem image={false} icon={"fa-solid fa-hashtag"} name={"explore"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/notifications">
                        <MenuItem image={false} icon={"fa-solid fa-bell"} name={"notifications"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/caw-direct">
                        <MenuItem image={true} imageName={"caw-direct"} icon={cawDirectLogo} name={cawDirectText}
                                  plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/crypto-center">
                        <MenuItem image={false} icon={"fa-solid fa-users-between-lines"} name={"CryptoCenter"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/settings">
                        <MenuItem image={false} icon={"fa-solid fa-gear"} name={"settings"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    <Link to="/profile">
                        <MenuItem image={false} icon={"fa-solid fa-user"} name={"profile"} plate={plate}
                                  currentRoute={pathname}/>
                    </Link>
                    {/*<Box sx={{...ITEMS, marginTop: "54px"}} component={'button'}>*/}
                    {/*    <Box sx={{display: "flex"}}>*/}
                    {/*        <i style={{...MENU_ICON, color: "#F9C336"}} className="fa-solid fa-users-between-lines"></i>*/}
                    {/*        <Typography*/}
                    {/*            sx={(theme) => ({...MENU_ITEM, [theme.breakpoints.down(1220)]: {display: "none"}})}>*/}
                    {/*            Crypto Center*/}
                    {/*        </Typography>*/}
                    {/*        <Typography sx={(theme) => ({*/}
                    {/*            ...MENU_ITEM,*/}
                    {/*            display: "none",*/}
                    {/*            [theme.breakpoints.down(1220)]: {display: "block"}*/}
                    {/*        })}>*/}
                    {/*            CryptoCNTR*/}
                    {/*        </Typography>*/}
                    {/*    </Box>*/}
                    {/*</Box>*/}
                </Box>

            </Box>

            <Box>
                <Box sx={{position:"fixed", bottom:10}}>
                    {
                        account ?
                            <WalletConnectorBox handleOpen={handleModalOpen} plate={plate} account={account}/> :
                            <WalletButton/>
                    }
                </Box>
            </Box>


            <Modal
                open={mintModalOpenn}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <MintUsernameModal handleModalClose={handleModalClose}/>
            </Modal>
        </Box>
    );
};

