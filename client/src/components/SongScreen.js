import { createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import PublishPlaylistModal from './PublishPlaylistModal.js'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import { Button } from '@mui/material'
import { darken } from '@mui/material'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    // document.onkeydown = (e) => {
    //     if (e.key === "z" && e.ctrlKey) {
    //         store.undo(props.playlist)
    //     }

    //     else if (e.key === "y" && e.ctrlKey) {
    //         store.redo(props.playlist)
    //     }
    // }

    function background() {
        let isPlaying = props.playlist && store.listCurrentlyPlaying && store.listCurrentlyPlaying._id === props.playlist._id
        if (isPlaying) {
            return "#ffb300"
        } else {
            return (props.playlist && props.playlist.publishInfo.isPublished) ? "#5c6bc0" : "#1565c0"
        }
    }

    let display = props.playlist && props.playlist.publishInfo.isPublished ? 'none' : 'block'

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    else if (store.isPublishListModalOpen()) {
        modalJSX = <PublishPlaylistModal />;
    }

    function handleAddNewSong() {
        store.addNewSong(props.playlist);
    }

    return (
        <Box>
            <List>
                {
                    props.playlist.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                            playlist={props.playlist}
                        />
                    ))
                }
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <Button variant='contained' onClick={handleAddNewSong} startIcon={<AddIcon />} sx={{ width: "100%", borderRadius: 3, my: 1, mx: 2, p: 2, fontSize: 18, display: display, "&:hover": { backgroundColor: darken(background(), 0.1) }, bgcolor: background() }}></Button>
                </Box>
            </List>
            <EditToolbar playlist={props.playlist} />
            {modalJSX}
        </Box>
    )
}

export default SongScreen;