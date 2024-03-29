import React from 'react'
import { useEffect, useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { Box, List, Button, Typography } from '@mui/material';
import ListCard from './ListCard';
import AuthContext from '../auth';
import MUIDeleteModal from './MUIDeleteModal';
import AddIcon from '@mui/icons-material/Add';

const PlaylistScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const auth = useContext(AuthContext)
    const [list, setList] = useState(null)

    useEffect(() => {
        display()
    }, [store.screenType, store.idNamePairs, store.searchText, store.sortType])

    useEffect(() => {
        const temp = async () => {
            await store.getTPS()
            display()
        }
        temp()
    }, [auth.notGuest])

    function handleCreateNewList() {
        store.createNewList();
    }

    let displayType = store.isAllLists() || store.isUsers() ? 'hidden' : 'visible'
    let resultFound = list && list.length !== 0 ? 'none' : 'block'

    function display() {
        if (store && store.isHome()) {
            setList(store.idNamePairs)
            search()
            sort()
        }

        if (store && (store.isAllLists() || store.isUsers())) {
            const getPlaylists = async () => {
                let playlists = await store.getAllLists()
                const publishedLists = playlists.filter(playlist => { return playlist.publishInfo.isPublished })
                setList(publishedLists)
                search()
                sort()
            }
            getPlaylists()
        }
    }

    function search() {
        if (store && store.searchText !== null) {
            if (store.isAllLists() || store.isHome()) {
                setList(prev => prev.filter(playlist => { return playlist.name.toLowerCase().includes(store.searchText.toLowerCase()) }))
            }

            else if (store.isUsers()) {
                setList(prev => prev.filter(playlist => { return playlist.publishInfo.publisher.toLowerCase().includes(store.searchText.toLowerCase()) }))
            }
            // console.log(list)
        }
    }

    function sort() {
        if (list && store && store.sortByListens()) {
            setList(prev => [].concat(prev).sort((a, b) => b.listens - a.listens))
        }

        else if (list && store && store.sortByName()) {
            setList(prev => [].concat(prev).sort((a, b) => a.name.localeCompare(b.name)))
        }

        else if (list && store && store.sortByLikes()) {
            setList(prev => [].concat(prev).sort((a, b) => b.likes - a.likes))
        }

        else if (list && store && store.sortByDislikes()) {
            setList(prev => [].concat(prev).sort((a, b) => b.dislikes - a.dislikes))
        }

        else if (list && store && store.sortByDate()) {
            setList(prev => [].concat(prev).sort((a, b) => b.publishInfo?.publishDate?.dateData > a.publishInfo?.publishDate?.dateData))
        }
    }

    return (
        <Box sx={{ width: "55%" }}>
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