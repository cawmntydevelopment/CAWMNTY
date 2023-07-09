import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Tokens} from "../MintUsername/Tokens/Tokens";
import {Avatar, Chip, CircularProgress, Grid, Menu, MenuItem} from "@mui/material";
import axios from "axios";
import {CAW_ADDRESS, DATA_URI_ABI, GENERATOR, USERNAME_ABI, USERNAME_ADDRESS} from "../../../services/web3";
import {useAccount, useContractReads} from 'wagmi';
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import env from "../../../config/env";
import {Alchemy, Network} from "alchemy-sdk";
import {load, save} from "../../../utils/storage";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    bgcolor: 'krmrPlate.mainBg',
    border: '4px solid #000',
    boxShadow: 24,
    borderColor: "krmrPlate.mainTextColor",
    borderRadius: "20px",
    p: 4,
    pt: 7,
};

const HEADER = {
    position: "absolute",
    top: 0,
    height: "40px",
    width: "100%",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: "krmrPlate.mainTextColor",
    left: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

const TITLE = {
    fontSize: "20px",
    color: "krmrPlate.newPostButton",
    fontFamily: "Karla",
    fontWeight: "bold"
}

const CHIP = {
    mr: 1,
    mt: 1,
}


const {SEPOLIA_ALCHEMY, OPENSEA} = env;
const web3 = createAlchemyWeb3(SEPOLIA_ALCHEMY);

export const WalletBalances = ({handleClose, open}: { handleClose: any, open: any }) => {

        if (!open) return <></>

        const [allNfts, setAllNfts] = useState<any[]>()
        const [cawNfts, setCawNfts] = useState<any[]>()
        const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

        const {address: account} = useAccount();
        const checkSelectedUser = load("access_token");

        const openMenu = Boolean(anchorEl);

        const handleClick = (event: any) => {
            setAnchorEl(event.currentTarget);
        };
        const handleCloseMenu = () => {
            setAnchorEl(null);
        };

        const decodeProfile = () => {
            if (checkSelectedUser?.length > 0) {
                return JSON.parse(atob(checkSelectedUser))
            }
        }

        function genareteHashed(hashed: any) {
            save("access_token", btoa(JSON.stringify(hashed)));
            handleClose()
            return
        }

        const runApp = async () => {


            const url = "https://deep-index.moralis.io/api/v2/" + account + "/nft?chain=" + "0xaa36a7" + "&format=decimal&media_items=true"
            const response = await axios.get(
                url,
                {
                    headers: {
                        "Accept": 'application/json',
                        'X-API-Key': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjhkYjljYzBiLTUzZWQtNDQ1MS1iZTc4LWNmZjY4OGE4OWM2OCIsIm9yZ0lkIjoiMzQ2NTE2IiwidXNlcklkIjoiMzU2MjAwIiwidHlwZUlkIjoiMzExOGY2ZDAtOWZmNS00YjUwLWIwODEtYTJhZDQxMzhjYjFhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODgzODU1OTEsImV4cCI6NDg0NDE0NTU5MX0.lY9mno2hKnu_U2P4ncD7VKS2MXKY4hIBU6JFrcr2ofY",
                    }
                }
            )
            const nfts = response?.data?.result;
            setAllNfts(nfts)
        };

        async function allCawNfts() {
            let cawNfts = [];
            for (let i = 0; i < ((allNfts ?? "").length ?? 0); i++) {
                const nft = allNfts?.[i];
                if (nft?.token_address?.toLowerCase() === USERNAME_ADDRESS?.toLowerCase()) {
                    console.log(nft)
                    const contract = new web3.eth.Contract((USERNAME_ABI as unknown as any), USERNAME_ADDRESS);
                    const data = await contract.methods.getProfileImageURI(allNfts?.[i]?.token_id).call()
                    const response = await axios.get(data)
                    cawNfts.push({...response?.data, tokenId: allNfts?.[i]?.token_id, tx:allNfts?.[i]?.transaction_hash})
                }
            }
            setCawNfts(cawNfts)
        }

        useEffect(() => {
            runApp()
        }, [])

        useEffect(() => {
            runApp()

        }, [account])

        useEffect(() => {
            if ((allNfts ?? "")?.length > 0) {
                allCawNfts()
            }
        }, [allNfts])


        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={HEADER}>
                        <Typography sx={TITLE}>
                            Details
                        </Typography>
                    </Box>

                    <Grid sx={{mt: 2, mb: 4}} container>
                        <Tokens col={12} tokenAddress={CAW_ADDRESS} imgSize={"25px"}
                                img={"/assets/img/logo.png"} setup={2}/>
                        <Tokens col={12} isEth={true} img={"/assets/img/eth.png"} imgSize={"15px"} setup={2}/>
                    </Grid>

                    <Box sx={{textAlign: "-webkit-center"}}>
                        {
                            cawNfts ?
                                cawNfts.map((nft) => {
                                    const image = nft?.image?.replaceAll("ipfs://", "https://ipfs.io/ipfs/");

                                    console.log(nft)

                                    // () => genareteHashed(nft)

                                    // @ts-ignore
                                    // @ts-ignore
                                    return (
                                        <Box>
                                            <Chip sx={CHIP}
                                                  color={decodeProfile() && decodeProfile()?.name === nft.name ? "success" : "default"}
                                                  onClick={(event) => handleClick(event)} avatar={<Avatar src={image}/>}
                                                  label={"@" + nft.name}/>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={openMenu}
                                                onClose={handleCloseMenu}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem onClick={() => window.open("https://nft.cawmnty.com" + "/" + "asset" + "/" + nft.tokenId,"_blank")}>View CAW Market</MenuItem>
                                                <MenuItem onClick={() => window.open(OPENSEA + "/" + USERNAME_ADDRESS + "/" + nft.tokenId,"_blank")}>View Opensea</MenuItem>
                                                <MenuItem onClick={() => window.open("https://sepolia.etherscan.io/nft" + "/" + USERNAME_ADDRESS + "/" + nft.tokenId,"_blank")}>View Etherscan</MenuItem>
                                                <MenuItem onClick={() => genareteHashed(nft)}>Change Account</MenuItem>
                                            </Menu>
                                        </Box>
                                    )
                                })
                                :
                                <CircularProgress color={"warning"}></CircularProgress>
                        }
                    </Box>

                    <Typography id="modal-modal-description" sx={{mt: 2, textAlign: "center"}}>
                        Click to switch between accounts.
                    </Typography>
                </Box>
            </Modal>
        );
    }
;
