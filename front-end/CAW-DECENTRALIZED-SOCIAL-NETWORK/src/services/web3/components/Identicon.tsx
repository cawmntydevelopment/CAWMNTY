import React, {useEffect, useRef} from "react";
// @ts-ignore
import Jazzicon from "@metamask/jazzicon";
import {Box} from "@mui/material";

export default function Identicon({address, sx = {}, ...props}: { address?: string | undefined, sx?: any }) {
    const ref = useRef<HTMLDivElement>();

    useEffect(() => {
        if (address && ref.current) {
            ref.current.innerHTML = "";
            ref.current.appendChild(Jazzicon(16, parseInt(address.slice(2, 10), 16)));
        }
    }, [address]);

    return <Box ref={ref as any} sx={{
        height: "1rem",
        width: "1rem",
        borderRadius: "1.125rem",
        backgroundColor: "black",
        ...sx
    }} {...props}/>;
}
