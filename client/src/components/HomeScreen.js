import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylistToolbar from './PlaylistToolbar';
import PlaylistScreen from './PlaylistScreen';
import { Box } from "@mui/material"
import YoutubeScreen from './YoutubeScreen';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = (props) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <PlaylistToolbar notGuest={props.notGuest}/>
            <Box sx={{ display: "flex", flexDirection: "row", bgcolor: "#e0e0e0" }}>
                <PlaylistScreen />
                <YoutubeScreen />
            </Box>
        </Box>
    )
}

export default HomeScreen;