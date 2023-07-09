import React from "react";
import MainLayout from "../../layouts/MainLayout";
import {observer} from "mobx-react-lite";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "../../utils/routing";

export const TestScreen = observer(() => {
    const navigate = useNavigate();

    function navigateToHome() {
        navigate("home")
    }

    return (
        <MainLayout disableGutters fullWidth>
            <Typography align="center" variant="h2" component="h2" gutterBottom sx={{width: "100%"}}>Test</Typography>
            <Button variant="contained" onClick={navigateToHome}>Navigate to Home</Button>
        </MainLayout>
    )
});
