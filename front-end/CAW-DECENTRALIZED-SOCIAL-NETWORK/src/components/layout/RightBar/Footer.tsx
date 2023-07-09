import React from 'react';
import {Box} from "@mui/material";

const SPAN = {
    cursor:"pointer",
    color:"krmrPlate.mainTextColor"
}
export const Footer = () => {
    return (
        <Box sx={{mt:2, fontSize:"13px", fontWeight:"bold", textAlign:"center"}}>
            <Box sx={SPAN} component={"span"}><Box component={"a"} target={"_blank"} sx={{color:"krmrPlate.mainTextColor"}} href={"https://github.com/cawmntydevelopment/CAWMNTY"}>GITHUB</Box></Box>
            <Box sx={SPAN} component={"span"}> · </Box>
            <Box sx={SPAN} component={"span"}><Box component={"a"} target={"_blank"} sx={{color:"krmrPlate.mainTextColor"}} href={"https://cawmnty.com/manifesto.php"}>MANIFESTO</Box></Box>
            <Box sx={SPAN} component={"span"}> · </Box>
            <Box sx={SPAN} component={"span"}>TERMS OF SERVICE</Box>
            <Box sx={SPAN} component={"span"}> · </Box>
            <Box sx={SPAN} component={"span"}>PRIVACY POLICY</Box>
            <Box sx={SPAN} component={"span"}> · </Box>
            <Box sx={SPAN} component={"span"}>© 2023 CAW Social Media.</Box>
        </Box>
    );
};
