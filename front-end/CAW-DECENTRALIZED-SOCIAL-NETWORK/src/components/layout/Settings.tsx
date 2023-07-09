import React from 'react';
import {Box} from "@mui/material";
import {SettingButton} from "./Settings/SettingButton";

export const Settings = ({ active, setActive}: { active: string, setActive: any }) => {


    return (
        <Box>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-user"}
                           name={"settings-1"} title={"My Account"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-user-shield"}
                           name={"settings-2"} title={"My Security Settings"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-comment"}
                           name={"settings-3"} title={"CAW Direct Preferences"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-chart-line"}
                           name={"settings-4"} title={"Creator Statistics"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-bell"}
                           name={"settings-5"} title={"Notifications"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-hands"}
                           name={"settings-6"} title={"Display and Accessibility Settings"}/>
            <SettingButton active={active} setActive={setActive} icon={"fa-solid fa-wand-magic-sparkles"}
                           name={"settings-7"} title={"Other Preferences"}/>
        </Box>
    );
};
