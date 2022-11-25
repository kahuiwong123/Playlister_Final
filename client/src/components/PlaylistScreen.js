import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { Box, List, Button, Typography } from '@mui/material';
import ListCard from './ListCard';
import MUIDeleteModal from './MUIDeleteModal';
import AddIcon from '@mui/icons-material/Add';

const PlaylistScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [list, setList] = useState(null)

    useEffect(() => {
        store.loadIdNamePairs()
    }, [])

    useEffect(() => {
        display()
    }, [store.screenType, store.idNamePairs, store.searchText])

    // useEffect(() => {
    //     search()
    // }, [store.searchText, store.screenType])

    function handleCreateNewList() {
        store.createNewList();
    }

    let displayType = store.isAllLists() || store.isUsers() ? 'hidden' : 'visible'
    let resultFound = list && list.length !== 0 ? 'none' : 'block'

    function display() {
        if (store && store.isHome()) {
            setList(store.idNamePairs)
            search()
        }

        if (store && (store.isAllLists() || store.isUsers())) {
            const getPlaylists = async () => {
                let playlists = await store.getAllLists()
                setList(playlists)
                search()
            }
            getPlaylists()
        }
    }

    function search() {
        if (store && store.searchText !== null) {
            console.log("searching: " + store.searchText)
            setList(prev => prev.filter(playlist => { return playlist.name.toLowerCase().includes(store.searchText.toLowerCase()) }))
            console.log(list)
        }
    }

    return (
        <Box sx={{ width: "55%", border: 1 }}>
            <Box sx={{ height: "450px", overflow: "scroll", px: 2, py: 1, border: "#bdbdbd" }}>
                <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Typography sx={{ display: resultFound, textAlign: "center", fontSize: 24 }}>- No Results Found -</Typography>
                    {list && list.map(playlist => <ListCard key={playlist._id} list={playlist} />)}
                </List>
            </Box>
            <Button variant="text" onClick={handleCreateNewList} startIcon={<AddIcon fontSize="medium" />} sx={{ "&:hover": { color: "#4dabf5" }, visibility: displayType, fontSize: 18, bgcolor: "#e0e0e0", width: "100%", textAlign: "center" }}>Your Lists</Button>
            <MUIDeleteModal />
        </Box>
    )
}

export default PlaylistScreen