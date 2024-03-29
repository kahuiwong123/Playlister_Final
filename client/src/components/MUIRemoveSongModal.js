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
    width: 600,
    height: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "10px"
};

export default function MUIRemoveSongModal(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong() {
        store.addRemoveSongTransaction();
        store.hideModals();
    }

    function handleCancelRemoveSong() {
        store.hideModals();
    }

    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentSong !== null && store.currentList !== null}
        >
            <Box sx={style}>
                <div
                    id="remove-song-modal"
                    className={modalClass}
                    data-animation="slideInOutLeft">
                    <div className="modal-dialog" id='verify-remove-song-root'>
                        <div className="modal-north">
                            Remove {songTitle}?
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content">
                                Are you sure you wish to permanently remove {songTitle} from the {store.currentList.name} playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <Button
                                id="remove-song-confirm-button"
                                className="modal-button"
                                onClick={handleConfirmRemoveSong}>Confirm</Button>
                            <Button
                                id="remove-song-cancel-button"
                                className="modal-button"
                                onClick={handleCancelRemoveSong}
                            >Cancel</Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}
