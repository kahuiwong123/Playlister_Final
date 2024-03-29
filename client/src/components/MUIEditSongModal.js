import { useContext, useState } from 'react'
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
    width: 700,
    height: 350,
    bgcolor: '#e1e4cb',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: "10px"
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [title, setTitle] = useState(store.currentSong.title);
    const [artist, setArtist] = useState(store.currentSong.artist);
    const [youTubeId, setYouTubeId] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);
        store.hideModals();
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentSong !== null}
        >
            <Box sx={style}>
                <div
                    id="edit-song-modal"
                    className="modal is-visible"
                    data-animation="slideInOutLeft">
                    <div
                        id='edit-song-root'
                        className="modal-root">
                        <div
                            id="edit-song-modal-header"
                            className="modal-north">Edit Song</div>
                        <div
                            id="edit-song-modal-content"
                            className="modal-center">
                            <div id="title-prompt" className="modal-prompt">Title:</div>
                            <input
                                id="edit-song-modal-title-textfield"
                                className='modal-textfield'
                                type="text"
                                defaultValue={title}
                                onChange={handleUpdateTitle} />
                            <div id="artist-prompt" className="modal-prompt">Artist:</div>
                            <input
                                id="edit-song-modal-artist-textfield"
                                className='modal-textfield'
                                type="text"
                                defaultValue={artist}
                                onChange={handleUpdateArtist} />
                            <div id="you-tube-id-prompt" className="modal-prompt">You Tube Id:</div>
                            <input
                                id="edit-song-modal-youTubeId-textfield"
                                className='modal-textfield'
                                type="text"
                                defaultValue={youTubeId}
                                onChange={handleUpdateYouTubeId} />
                        </div>
                        <div className="modal-south">
                            <Button
                                id="edit-song-confirm-button"
                                
                                onClick={handleConfirmEditSong}>Confirm</Button>
                            <Button
                                id="edit-song-cancel-button"
                                
                                onClick={handleCancelEditSong}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}