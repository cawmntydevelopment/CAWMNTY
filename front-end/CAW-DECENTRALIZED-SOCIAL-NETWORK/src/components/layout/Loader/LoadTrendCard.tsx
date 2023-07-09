import React from 'react';
import {Box, Skeleton} from "@mui/material";

export const LoadTrendCard = () => {
    return (
        <Box key={(Math.random() * 10000)}
             sx={{marginTop: "10px", marginBottom: "10px", fontSize: "18px"}}
             display={"flex"}>
            <Skeleton>
                <Box sx={{justifyContent: "start", fontWeight: "bold"}}>#TREND TAG CAW</Box>
            </Skeleton>
            <Box sx={{margin: "auto"}}/>
            <Skeleton>
                <Box sx={{justifyContent: "start", fontWeight: "bold"}}>100K+</Box>
            </Skeleton>
        </Box>

    );
};
