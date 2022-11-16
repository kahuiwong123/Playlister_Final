import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from "@mui/material/Button"
const style = {
    position: 'absolute',
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

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        store.hideModals();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                <Box className="dialog-header">
                    Delete the {name} Playlist?
                </Box>
                <div id="confirm-cancel-container">
                    <Button
                        id="dialog-yes-button"
                        className="modal-button"
                        onClick={handleDeleteList}
                    >Confirm</Button>
                    <Button
                        id="dialog-no-button"
                        className="modal-button"
                        onClick={handleCloseModal}
                    >Cancel</Button>
                </div>
            </div>
            </Box>
        </Modal>
    );
}