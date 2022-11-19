import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylistToolbar from './PlaylistToolbar';
import PlaylistScreen from './PlaylistScreen';
import { Box } from "@mui/material"
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <PlaylistToolbar />
            <PlaylistScreen />
        </Box>
    )
}

export default HomeScreen;