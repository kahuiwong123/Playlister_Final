import React from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect } from "react"
import AuthContext from '../auth';
import Alert from "@mui/material/Alert"
import { Button } from '@mui/material';
import { GlobalStoreContext } from '../store/index.js'
import api from "../auth/auth-request-api"
const UnauthorizedModal = () => {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
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
        store.closeCurrentList()
    }


    let authorized = true;
    useEffect(async () => {
        const response = await api.getLoggedIn();
        if (auth.user !== response.data.user) {
            authorized = false
        }
    }, [])

    return (
        <Modal
            open={store.currentList == null || !authorized}
        >
            <Box sx={style} className="error-modal-box">
                <Box sx={{ textAlign: "center", fontSize: 24 }}>Error</Box>
                <Alert severity="error">"Unauthorized Action!"</Alert>
                <Button onClick={handleClose}>Return to Main Screen</Button>
            </Box>
        </Modal>
    )
}

export default UnauthorizedModal