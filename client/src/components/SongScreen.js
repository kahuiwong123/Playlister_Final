import { createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import EditToolbar from './EditToolbar.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import { Button } from '@mui/material'

/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function SongScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();

    document.onkeydown = (e) => {
        if (e.key === "z" && e.ctrlKey) {
            store.undo()
        }

        else if (e.key === "y" && e.ctrlKey) {
            store.redo()
        }
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }


    // if (store.currentList == null) {
    //     return <UnauthorizedModal />
    // }

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
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                <Button variant='contained'  onClick={handleAddNewSong} startIcon={<AddIcon/>} sx={{width: "93%", borderRadius: 3, my: 1, p: 2, fontSize: 18 }}></Button>
                </Box>
            </List>
            <EditToolbar />
            {modalJSX}
        </Box>
    )
}

export default SongScreen;