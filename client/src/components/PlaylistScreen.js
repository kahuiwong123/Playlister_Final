import React from 'react'
import { useEffect, useContext } from 'react';
import { GlobalStoreContext } from '../store'
import { Box, List, Button } from '@mui/material';
import ListCard from './ListCard';
import MUIDeleteModal from './MUIDeleteModal';
import AddIcon from '@mui/icons-material/Add';

const PlaylistScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    return (
        <Box sx={{display: "flex", flexDirection: "column", bgcolor: "#e0e0e0"}}>
            <Box sx={{ width: "55%", height: "450px", overflow: "scroll", px: 2, py: 1, border: "#bdbdbd"}}>
                <List sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {store && store.idNamePairs.map((pair) => (
                        <ListCard
                            key={pair._id}
                            idNamePair={pair}
                            selected={false}
                        />
                    ))
                    }
                </List>
            </Box>
            <Button variant="text" onClick={handleCreateNewList} startIcon={<AddIcon fontSize="medium" />} sx={{ "&:hover": { color: "#4dabf5" }, fontSize: 18, bgcolor: "#e0e0e0", ml:2, width: "55%" }}>Your Lists</Button>
            <MUIDeleteModal />
        </Box>
    )
}

export default PlaylistScreen