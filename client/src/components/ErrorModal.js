import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext } from "react"
import AuthContext from '../auth';
import Alert from "@mui/material/Alert"
import Typography from "@mui/material/Typography"
import { Button } from '@mui/material';

const ErrorModal = () => {
    const { auth } = useContext(AuthContext);

    const style = {
        position: 'absolute',
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 250,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        borderRadius: "10px"
    };

    function handleClose(event) {
        auth.hideErrorModal()
    }

    return (
        <Modal
            open={auth.errorMessage !== null}
        >
            <Box sx={style} className="error-modal-box">
                <Typography sx={{ textAlign: "center", fontSize: 24 }}>Error</Typography>
                <Alert severity="error">{auth.errorMessage}</Alert>
                <Button onClick={handleClose}>Close</Button>
            </Box>
        </Modal>
    )
}

export default ErrorModal