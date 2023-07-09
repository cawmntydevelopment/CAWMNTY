import React, {useEffect, useState} from 'react';
import Typography from "@mui/material/Typography";
import {Box, Checkbox, CircularProgress, FormControlLabel, Grid, Snackbar, SnackbarOrigin} from "@mui/material";
import {
    CAW_ADDRESS, DATA_URI_ABI,
    GENERATOR,
    TOKEN_ABI,
    USERNAME_ABI,
    USERNAME_ADDRESS,
} from "../../../services/web3";
import {Tokens} from "./Tokens/Tokens";
import {WalletBox} from "./Wallet/WalletBox";
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction
} from "wagmi";
import {BigNumber} from "ethers";
import {createAlchemyWeb3} from "@alch/alchemy-web3";
import axios from "axios";
import env from "../../../config/env";

const {SEPOLIA_ALCHEMY, PINITA_API_KEY, PINITA_API_SECRET} = env;

interface ISETUP4 {
    username: string,
    usdt: string | null,
    caw: string | null,
    eth: string | null,
    rawToken: any,
    loader: (type?: "go" | "back" | "mint") => void,
    transaction: any,
}

const TITLE = {
    fontSize: "17px",
    fontWeight: "800",
    fontFamily: "Karla",
}

const DESC = {
    fontSize: "17px",
    fontFamily: "Karla",
}

const GROUP = {
    mt: 2,
    mb: 2
}

const GO_BTN = {
    position: "absolute",
    right: "25px",
    background: "#F9C336",
    py: 1,
    px: 4,
    border: "none",
    borderRadius: "24px",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px",
    marginBottom: 10
}

const LOAD_STYLE = {
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.48)",
    position: "absolute",
    left: 0,
    zIndex: 10,
    borderRadius: "13px",
    top: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}

interface State extends SnackbarOrigin {
    open: boolean;
}

const web3 = createAlchemyWeb3(SEPOLIA_ALCHEMY);

export const Setup4 = ({loader, username, usdt, caw, eth, rawToken, transaction}: ISETUP4) => {

    const {address: account} = useAccount();
    const [ipfs, setIpfs] = useState("")
    const [manualLoader, setManualLoader] = useState(false)
    const [check, setCheck] = useState(false)
    const [mintTransaction, setMintTransaction] = useState()
    const [mintLoaders, setMintLoaders] = useState(false)
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    console.log(state)

    const { vertical, horizontal, open } = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        console.log(newState)
        setState({ ...newState, open: true });
    };



    const {data: allowanceData} = useContractRead({
        address: CAW_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'allowance',
        args: [account?.toLowerCase(), USERNAME_ADDRESS],
        watch: true
    })


    const isAllowance = (allowanceData as BigNumber)?.gte(BigNumber.from(rawToken ?? 0))

    const {config} = usePrepareContractWrite({
        address: CAW_ADDRESS,
        abi: TOKEN_ABI,
        functionName: 'approve',
        args: [USERNAME_ADDRESS.toLowerCase(), rawToken],

    })

    // @ts-ignore
    const {data: approveData, write: approve} = useContractWrite(config)


    async function deneme(ipfsUri:string){
        const contract = new web3.eth.Contract((USERNAME_ABI as unknown as any), USERNAME_ADDRESS);
        await contract.methods.createNFT(username, ipfsUri, BigNumber.from(rawToken)).send({from:account}).then((e:any) => {
            setMintTransaction(e.transactionHash)
            setMintLoaders(false)
        }).catch((error : any) => {
            setMintLoaders(false)
        })
    }



    const {status: approveLoading} = useWaitForTransaction({
        hash: approveData?.hash,
    })

    const {status: mintLoading} = useWaitForTransaction({
        hash: mintTransaction,
    })


    let generatorPromise = new Promise(async function (myResolve, myReject) {
        const contract = new web3.eth.Contract((DATA_URI_ABI as unknown as any), GENERATOR);
        const data = await contract.methods.generate(username).call()

        if (data) {
            myResolve(data);
        } else {
            myReject("Error");
        }
    });

    const checkHandleChange = (event: any) => {
        setCheck(event.target.checked)
    }

    const mint = async () => {
        setManualLoader(true)
        generatorPromise.then(
            function (value) {
                handleFile(value)
            },
            function (error) {
                setManualLoader(false)
                console.log(error)
            }
        );
    }


    function urltoFile(url:string, filename:any, mimeType:any){
            mimeType = mimeType || (url.match(/^data:([^;]+);/)||'')[1];
            return (fetch(url)
                    .then(function(res){return res.arrayBuffer();})
                    .then(function(buf){return new File([buf], filename, {type:mimeType});})
            );
    }



    const svgToPng = (svgDataurl:any, width:number, height:number) => new Promise((resolve, reject) => {
        let canvas;
        let ctx : any;
        let img : any;

        img = new Image();
        img.src= svgDataurl;
        img.onload = () => {
            canvas = document.createElement('canvas');
            canvas.width = 1080;
            canvas.height = 1080;
            ctx = canvas.getContext('2d');
            ctx.drawImage(img,0, 0, 1080, 1080, 0, 0, width, height);
            img = new Image();
            img.src = canvas.toDataURL('image/png');
            img.onload = () => {
                canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0,0);
                resolve(canvas.toDataURL('image/png'));
            }
        };
    });

    const handleFile = async (genareteData: any) => {
        setMintLoaders(true)
        const json = atob(genareteData?.substring(29));
        const result = JSON.parse(json);

        const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
        const urlImage = "https://api.pinata.cloud/pinning/pinFileToIPFS";

        svgToPng(
            result?.image,
            700,
            700
        ).then((png: any) => {
            urltoFile(png, result?.name + '.png',"image/png")
                .then(async function(file){

                    const formData = new FormData();
                    formData.append("file", file);

                    const responseIMAGE = await axios.post(
                        urlImage,
                        formData,
                        {
                            // @ts-ignore
                            maxContentLength: "Infinity",
                            headers: {
                                "Content-Type": "multipart/form-data",
                                'pinata_api_key': PINITA_API_KEY,
                                'pinata_secret_api_key': PINITA_API_SECRET
                            }
                        }
                    )

                    const ImgHash = `https://ipfs.io/ipfs/${responseIMAGE.data.IpfsHash}`;

                    if(ImgHash) {

                        var data = JSON.stringify({
                            "pinataMetadata": {
                                "name": result?.name,
                                "keyvalues": {
                                    "customKey": "customValue",
                                    "customKey2": "customValue2"
                                }
                            },
                            "pinataContent": {
                                ...result,
                                image:ImgHash
                            }
                        });


                        const response = await axios.post(
                            url,
                            data,
                            {
                                // @ts-ignore
                                maxContentLength: "Infinity",
                                headers: {
                                    "Content-Type": 'application/json',
                                    'pinata_api_key': PINITA_API_KEY,
                                    'pinata_secret_api_key': PINITA_API_SECRET
                                }
                            }
                        )

                        deneme("https://ipfs.io/ipfs/" + response.data.IpfsHash)
                        setIpfs("https://ipfs.io/ipfs/" + response.data.IpfsHash)
                        setManualLoader(false)
                    }
                })
        });

    }

    useEffect(() => {
        if (mintLoading === "success") {
            transaction(mintTransaction + "||" + ipfs)
            setTimeout(() => loader("go"), 500)
        }
    }, [mintLoading])

    console.log(check)

    useEffect(() => {
        console.log(check)
        if(check) {
            setState({ vertical: 'top', horizontal: 'center', open:true });
        } else {
            setState({ vertical: 'top', horizontal: 'center', open:false });
        }
    },[check])


    return (
        <Box>
            {
                 mintLoaders &&
							<Box sx={LOAD_STYLE}>
								<CircularProgress color={"warning"}></CircularProgress>
							</Box>
            }

            {
                approveLoading === "loading"  &&
							<Box sx={LOAD_STYLE}>
								<CircularProgress color={"warning"}></CircularProgress>
							</Box>
            }


            <Box sx={GROUP}>
                <Typography sx={TITLE}>
                    Your username is
                </Typography>
                <Typography sx={DESC}>
                    @{username}
                </Typography>
            </Box>

            <Box sx={GROUP}>
                <Typography sx={TITLE}>
                    Will be owned by this address
                </Typography>
                <WalletBox notTitle={false} account={account}/>
            </Box>


            <Box sx={GROUP}>
                <FormControlLabel sx={{fontFamily: "Karla"}}
                                  control={<Checkbox onChange={checkHandleChange}/>}
                                  label={ <>I have read and accept the user agreement. </>}/>
            </Box>

            <Grid sx={{my: "31px"}} container>
                <Box sx={{width: "100%", fontFamily: "Karla", fontSize: "18px", fontWeight: "700", mb: 2}}>
                    Cost;
                </Box>
                <Tokens col={12} price={eth} customSymbol={"ETH"} isEth={true} img={"/assets/eth_token.png"}
                        imgSize={"20px"} setup={3}/>
                <Tokens col={12} price={caw} customSymbol={"CAW (tCAW)"}
                        tokenAddress={"0xf3b9569F82B18aEf890De263B84189bd33EBe452"} imgSize={"20px"}
                        img={"/assets/img/logo.png"} setup={3}/>
                <Tokens col={12} price={usdt} customSymbol={"USDT"}
                        tokenAddress={"0xdAC17F958D2ee523a2206206994597C13D831ec7"} imgSize={"20px"}
                        img={"/assets/img/ust.png"} setup={3}/>
            </Grid>

            {
                isAllowance ? <Box component={"button"} disabled={(!check || manualLoader)} onClick={() => mint()}
                                   sx={GO_BTN}>MINT</Box> :
                    <Box component={"button"} disabled={(!check || manualLoader)} onClick={() => approve?.()} sx={GO_BTN}>APPROVE</Box>
            }

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                autoHideDuration={6000}
                onClick={() => setState({ ...state, open: false })}
                message="This is decentralized social media. I agree to; I am responsible for my own funds, that I do all the operations related to the username and actions, and that the username I mint cannot be changed again."
                key={vertical + horizontal}
            />

        </Box>
    );
};
