import React from 'react'
import { useContext } from "react"
import GlobalStoreContext from '../store';
import { Modal, Typography, Button, Box } from "@mui/material"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
};

const DuplicatePlaylistModal = () => {
    const { store } = useContext(GlobalStoreContext)

    const handleConfirm = () => {
        store.duplicatePlaylist()
        store.hideModals()
    }

    const handleClose = () => {
        store.hideModals();
    }

    return (
        <Modal open={store.isDuplicateListModalOpen()}>
            <Box sx={style}>
                <Typography sx={{ textAlign: "center", fontSize: 24 }}>Are you sure you want to duplicate the {store && store.currentList.name} playlist?</Typography>
                <Box sx={{ display: "flex", gap: 3 }}>
                    <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
                    <Button variant="contained" onClick={handleClose}>Cancel</Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default DuplicatePlaylistModal