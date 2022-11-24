import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { Box, List, Button } from '@mui/material';
import ListCard from './ListCard';
import MUIDeleteModal from './MUIDeleteModal';
import AddIcon from '@mui/icons-material/Add';

const PlaylistScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [list, setList] = useState(null)

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    useEffect(() => {
        const getPlaylists = async () => {
            let playlists = await store.getAllLists()
            setList(playlists)
        }
        getPlaylists()
    }, [store.screenType])

    function handleCreateNewList() {
        store.createNewList();
    }

    let displayType = store.isAllLists() || store.isUsers() ? 'hidden' : 'visible'

    function display() {
        if (store && store.isHome()) {
            console.log("home")
            return store && store.idNamePairs.map((pair) => (
                <ListCard
                    key={pair._id}
                    idNamePair={pair}
                    selected={false}
                />
            ))
        }
        else if (store && (store.isAllLists() || store.isUsers())) {
            return list.map(playlist => (
                <ListCard
                    key={playlist._id}
                    idNamePair={{ _id: playlist._id, name: playlist.name }}
                    selected={false} 
                    list={playlist} />
            ))
        }
    }

    return (
        <Box sx={{ width: "55%", border: 1 }}>
            <Box sx={{ height: "450px", overflow: "scroll", px: 2, py: 1, border: "#bdbdbd" }}>
                <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {display()}
                </List>
            </Box>
            <Button variant="text" onClick={handleCreateNewList} startIcon={<AddIcon fontSize="medium" />} sx={{ "&:hover": { color: "#4dabf5" }, visibility: displayType, fontSize: 18, bgcolor: "#e0e0e0", width: "100%", textAlign: "center" }}>Your Lists</Button>
            <MUIDeleteModal />
        </Box>
    )
}

export default PlaylistScreen