import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import UnauthorizedModal from './UnauthorizedModal'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen() {
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


    if (store.currentList == null) {
        return <UnauthorizedModal />
    }

    return (
        <Box>
            <List
                id="playlist-cards"
                sx={{ width: '100%', bgcolor: 'background.paper', overflow: "scroll", maxHeight: "500px" }}
            >
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))
                }
            </List>
            {modalJSX}
        </Box>
    )
}

export default WorkspaceScreen;