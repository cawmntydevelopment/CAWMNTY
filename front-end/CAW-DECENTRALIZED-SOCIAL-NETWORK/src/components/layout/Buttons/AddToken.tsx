import React from 'react';
import {Button} from "@mui/material";

export const AddToken = ({tokenAddress,tokenSymbol,tokenDecimals,tokenImage, text} : {tokenAddress: `0x${string}`,tokenSymbol:string,tokenDecimals:number,tokenImage:string, text:string}) => {

    async function add(){


        try {
            // @ts-ignore
            const wasAdded = await ethereum.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: tokenAddress,
                        symbol: tokenSymbol,
                        decimals: tokenDecimals,
                        image: tokenImage,
                    },
                },
            });

            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
       <Button sx={{mt:1}} onClick={() => add()}>{text}</Button>
    );
};
