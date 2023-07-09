import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Box, Button, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useNetwork, useTransaction} from 'wagmi';
import JSConfetti from 'js-confetti'
import env from "../../../config/env";
import {USERNAME_ADDRESS} from "../../../services/web3";
import {save} from "../../../utils/storage";

interface INFTDATA {
    name: string,
    description: string,
    image: string
}

const IMAGE = {
    width: "150px",
    borderRadius: "20px",
    mb: 1,
    mt:2,
    boxShadow: "-21px -4px 27px #1514269e, 23px -2px 31px #f8c136c4"
}

const USERNAME = {
    fontFamily: "Karla",
    mt: 2,
    mb: 5,
    fontWeight: "bold",
    fontSize: "20px",
}


const {OPENSEA} = env;


export const Setup5 = ({transaction}: { transaction: string }) => {

    const successElemets = transaction.split("||"); // 0 tx, 1 url
    const ipfsConverter = successElemets[1].replaceAll("ipfs://", "https://ipfs.io/ipfs/")
    const [data, setData] = useState<INFTDATA>();
    const [nftId, setNftId] = useState(0)

    const jsConfetti = new JSConfetti()
    const { chain} = useNetwork();


    const { data:hashedData } = useTransaction({
        hash: (successElemets[0] as unknown as any),
    })


    async function checkNftsData(){
        const url = "https://deep-index.moralis.io/api/v2/block/"+ hashedData?.blockNumber +"/nft/transfers?chain=" + "0xaa36a7"

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

        for (let i = 0; i < nfts?.length; i++) {
            if(nfts?.[i]?.transaction_hash === successElemets[0]) setNftId(nfts?.[i]?.token_id);
        }

    }


    const checkNftDetails = async () => {
        return await axios
            .get(ipfsConverter)
            .then(function (response) {
                setData(response?.data)
            });
    }

    function deneme(){
       return  jsConfetti.addConfetti({
           emojis: ['🌙', "🎉"],
           emojiSize: 100,
           confettiNumber: 30,
       })
    }


    function genareteHashed(hashed: any) {
        save("access_token", btoa(JSON.stringify(hashed)));
        return
    }



    useEffect(() => {
        checkNftDetails()
        checkNftsData()
    }, [])



    useEffect(() => {
        deneme()
        if(data) {
             genareteHashed(data)
        }
    } ,[data])


    useEffect(() => {
        checkNftsData()
    },[hashedData])

    return (
        <Box>
            <Box sx={{position:"absolute", top:0, left:0, width:"360px", height:"100%", zIndex:-1, opacity: "0.06", backgroundImage:"url(/assets/caw_token.png)", backgroundSize:"25px 28px"}}>
            </Box>
            {
                data ?
                    <Box>
                        <Typography sx={{...USERNAME,mb:2}}> You have successfully minted an NFT 🔮</Typography>
                        <Box sx={IMAGE} component={"img"} src={data?.image?.replaceAll("ipfs://","https://ipfs.io/ipfs/")}/>
                        <Typography sx={USERNAME}> @{data?.name} <br/> successfully minted 🎉 🌙</Typography>
                    </Box>
                    :
                    <>
                        <Box sx={{height: "150px", width: "100%"}} display={"flex"} justifyContent={"center"}>
                            <Skeleton width={"150px"} height={"250px"}/>
                        </Box>
                        <Box sx={{mt:7}} display={"flex"} justifyContent={"center"}>
                            <Skeleton>
                                <Typography sx={{...USERNAME, mt:3}}> dsfsdfsd <br/> successfully minted 🎉 🌙</Typography>
                            </Skeleton>
                        </Box>
                    </>
            }

            <Button onClick={() => window.open(chain?.blockExplorers?.default?.url + "tx/" + successElemets[0],"_blank")}>VIEW ETHERSCAN</Button>
            <Button onClick={() => window.open(OPENSEA + "/" + USERNAME_ADDRESS + "/" + nftId,"_blank")}>VIEW OPENSEA</Button>
            <Button onClick={() => window.open("https://nft.cawmnty.com" + "/" + "asset" + "/" + nftId,"_blank")}>VIEW CAW MARKET</Button>
        </Box>
    );
};
