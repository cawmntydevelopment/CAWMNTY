import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog, {DialogProps} from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import {Box} from "@mui/material";

const COLOR_1 = {
    background: "#535f6d",
    borderBottom: "0px",
    color: "white"
}

const COLOR_2 = {
    background: "#4c5662",
    borderBottom: "0px",
    color: "white"
}

const COLOR_3 = {
    background: "#535f6d",
    borderBottom: "0px",
    color: "white"
}

export const Calculator = ({handleClose, open, scroll, descriptionElementRef}: any) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                maxWidth={"xl"}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle sx={{
                    backgroundColor: "#454f5b",
                    color:"white"

                }} id="scroll-dialog-title">Calculator</DialogTitle>
                <DialogContent sx={{
                    p:0,
                    border:"0px",
                    backgroundColor: "krmrPlate.mainBg"
                }} dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <Paper sx={{width: '100%'}}>
                            <TableContainer sx={{maxHeight: 440}}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableRow>
                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#657283",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >
                                            <Box sx={{mt: 1}}>
                                                ACTION
                                            </Box>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#5a6875",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >
                                            <Box sx={{mt: 1}}>
                                                BURN
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#657283",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >
                                            <Box sx={{mt: 1}}>
                                                MCTD
                                            </Box>
                                        </TableCell>
                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#5a6777",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >

                                            <Box sx={{mt: 1}}>
                                                50 mln
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#657283",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >
                                            <Box sx={{mt: 1}}>
                                                1 bln
                                            </Box>
                                        </TableCell>

                                        <TableCell
                                            style={{
                                                top: 57,
                                                minWidth: 100,
                                                background: "#657283",
                                                color: "white",
                                                fontWeight: "bold",
                                                borderBottom: 0
                                            }}
                                        >
                                            <Box sx={{mt: 1}}>
                                                10 bln
                                            </Box>
                                        </TableCell>

                                    </TableRow>

                                    <TableBody>

                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 1 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                1T CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                48.1k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                90k
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                1.8M
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                18M
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 2 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                240B CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                11.5k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                21.6k
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                432k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                4.3M
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 3 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                60B CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                2.9k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                5.4k
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                108k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                1.1M
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 4 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                6B CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                288.6
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                540
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                10.8k
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                108k
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 5 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                200M CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                9.6
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                18
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                360
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                3.6k
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 6 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                20M CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                0.9620
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                1.8
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                36
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                360
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint 7 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                10M CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                0.4810
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.9000
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                18
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                180
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Mint +8 Character username
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                10M CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                0.4810
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.9000
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                1.8
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                18
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Follow an Account
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                30k CAW paid 80/20% to account and stakepool
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                0.0540
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.5400
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Send a CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                5k CAW paid 100% to stakepool
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                0.0090
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.0900
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                Like a CAW
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                2k CAW paid 80/20% to account and stakepool
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.0360
                                            </TableCell>
                                        </TableRow>
                                        <TableRow hover role="checkbox" tabIndex={-1}>
                                            <TableCell sx={COLOR_1}>
                                                ReCAW
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                4k CAW paid 50/50% to account and stakepool
                                            </TableCell>
                                            <TableCell sx={COLOR_3}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_1}>
                                                NA
                                            </TableCell>
                                            <TableCell sx={COLOR_2}>
                                                0.0720
                                            </TableCell>
                                        </TableRow>

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{
                    backgroundColor: "#454f5b",
                }}>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>


        </div>
    );
};

