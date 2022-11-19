import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from "@mui/material/Box"
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [draggedTo, setDraggedTo] = useState(0);
    const { song, index, playlist } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(playlist, sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(playlist, index, song);
    }

    function handleClick(event) {
        // DOUBLE CLICK IS FOR SONG EDITING
        if (event.detail === 2) {
            store.showEditSongModal(playlist, index, song);
        }
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "white", justifyContent: "space-between", flexDirection: "row", fontSize: 18, p: 1, borderRadius: 3, my: 1, mx: 2 }}
            key={index}
            id={'song-' + index + '-card'}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            onClick={handleClick}
        > <span>
                {index + 1}.
                <a
                    id={'song-' + index + '-link'}
                    className="song-link"
                    href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                    {song.title} by {song.artist}
                </a>
            </span>
            <IconButton onClick={handleRemoveSong}>
                <ClearIcon fontSize="large" />
            </IconButton>
        </Box>
    );
}

export default SongCard;