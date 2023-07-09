import React from 'react';
import {
    Box,
    Drawer,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Typography
} from "@mui/material";
import {WalletButton} from "../../services/web3";
import {useAccount, useDisconnect} from "wagmi";
import {SearchInput} from "../SearchInput";
import {Link} from "react-router-dom";

const BOTTOM = {
    position: "absolute",
    bottom: 0
}

const ITEM = {
    marginTop: "30px",
    display: "block",

}

const ITEM_ICON = {
    color: "#F9C336",
    fontSize: "32px",
    marginLeft: "10px"
}

const ITEM_TEXT = {
    fontSize: "21px",
    fontFamily: "Karla",
    fontWeight: "bold",
    color: "#F9C336"
}

const LIST_BUTTON = {
    marginBottom: "12px",
    "&:hover": {
        background: "transparent"
    }
}

export const DrawerBar = ({
                              state,
                              toggleDrawer,
                              theme,
                              colorChange,
                              handleOpen,
                              handleModalOpen,
                              handleClickOpen
                          }: {
    state: any, toggleDrawer: any, theme: any, colorChange: any, handleOpen: any, handleModalOpen: any,
    handleClickOpen: any
}) => {

    // WAGMI
    const {address: account} = useAccount();
    const {disconnect} = useDisconnect();

    const addressSubstr = account?.substring(0, 5) + "..." + account?.substring((account?.length - 5), account?.length);
    const plate = theme.palette.krmrPlate;

    const activeTheme = () => {
        if (theme.palette.mode === "dark") {
            return {
                icon: "fa-solid fa-sun",
                name: "Ligth"
            }
        }

        return {
            icon: "fa-solid fa-moon",
            name: "Dark"
        }

    };

    return (
        <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
        >

            <Box
                sx={{width: 320, p: 2, background: plate.mainBg, height: "100vh", position: "relative"}}
                role="presentation"
            >
                <Box display={"flex"} alignItems={"center"} sx={{marginTop: "17px", marginBottom: "21.57px"}}>
                    <Box component={"img"} src={"/assets/img/logo.png"} sx={{margin: "auto", width: "50px"}}/>
                    <Box component={"div"} sx={{margin: "auto"}}> </Box>
                    <Box component={"i"}
                         onClick={toggleDrawer("left", false)}
                         sx={{margin: "auto", fontSize: "27px", cursor: "pointer", color: plate.cancelButton}}
                         className={"fa-solid fa-xmark"}/>
                </Box>


                <ListItem sx={ITEM} disablePadding>
                    {
                        account ?
                            <>
                                <ListItemButton onClick={handleOpen} sx={LIST_BUTTON}>
                                    <ListItemIcon>
                                        <i style={ITEM_ICON} className="fa-solid fa-wallet"></i>
                                    </ListItemIcon>
                                    <Typography sx={ITEM_TEXT}>{addressSubstr}</Typography>
                                </ListItemButton>
                            </>
                            :
                            <Box sx={{mb: "12px"}}>
                                <WalletButton/>
                            </Box>
                    }

                    <ListItemButton onClick={() => {
                        handleModalOpen()
                    }} sx={LIST_BUTTON}>
                        <ListItemIcon>
                            <i style={{...ITEM_ICON}}
                               className="fa-solid fa-plus"></i>
                        </ListItemIcon>
                        <Typography sx={ITEM_TEXT}>Nft Mint</Typography>
                    </ListItemButton>

                    <Link to={"/crypto-center"} onClick={toggleDrawer("left", false)}>
                        <ListItemButton sx={LIST_BUTTON}>
                            <ListItemIcon>
                                <i style={{...ITEM_ICON, fontSize: "23px"}}
                                   className="fa-solid fa-users-between-lines"></i>
                            </ListItemIcon>
                            <Typography sx={ITEM_TEXT}>Crypto Center</Typography>
                        </ListItemButton>
                    </Link>

                    <ListItemButton onClick={handleClickOpen("paper")} sx={LIST_BUTTON}>
                        <ListItemIcon>
                            <i style={ITEM_ICON} className="fa-solid fa-calculator"></i>
                        </ListItemIcon>
                        <Typography sx={ITEM_TEXT}>Calculator</Typography>
                    </ListItemButton>

                </ListItem>
                <Box sx={BOTTOM}>
                    <ListItemButton sx={LIST_BUTTON} onClick={colorChange}>
                        <ListItemIcon>
                            <i style={ITEM_ICON} className={activeTheme().icon}></i>
                        </ListItemIcon>
                        <Typography sx={ITEM_TEXT}>{activeTheme().name} Mode</Typography>
                    </ListItemButton>
                    {
                        account &&
											<>
												<Link to={"/settings"} onClick={toggleDrawer("left", false)}>
													<ListItemButton sx={LIST_BUTTON}>
														<ListItemIcon>
															<i style={ITEM_ICON} className={"fa-solid fa-gear"}></i>
														</ListItemIcon>
														<Typography sx={ITEM_TEXT}>Settings</Typography>
													</ListItemButton>
												</Link>
												<ListItemButton onClick={() => disconnect()} sx={{...LIST_BUTTON}}>
													<ListItemIcon>
														<i style={{...ITEM_ICON, color: "red"}}
															 className="fa-solid fa-arrow-right-from-bracket"></i>
													</ListItemIcon>
													<Typography sx={{...ITEM_TEXT, color: "red"}}>Logout</Typography>
												</ListItemButton>
											</>
                    }
                </Box>
            </Box>
        </Drawer>
    );
};
