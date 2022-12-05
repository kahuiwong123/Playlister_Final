import React from 'react';
import YouTube from 'react-youtube';
import GlobalStoreContext from '../store';
import { useContext, useState, useEffect } from 'react';
import { Box, Typography, IconButton, Toolbar } from "@mui/material"
import FastRewindIcon from '@mui/icons-material/FastRewind';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import MusicOffIcon from '@mui/icons-material/MusicOff';
export default function YouTubePlayerExample(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    const { store } = useContext(GlobalStoreContext);
    const { playlist } = props
    const [currentSong, setCurrentSong] = useState(0)
    const [youtubeEvent, setYoutubeEvent] = useState({})
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST

    let flag = playlist && playlist[currentSong] && playlist.length !== 0

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    useEffect(() => {
        // let list = store.listCurrentlyPlaying.songs.map(song => song.youTubeId) 
        // setPlaylist(list)
        if (store?.listCurrentlyPlaying) {
            setCurrentSong(0)
        }
    }, [store?.listCurrentlyPlaying])

    const playerOptions = {
        height: '275px',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        setCurrentSong(prev => (prev + 1) % playlist.length)
    }

    function onPlayerReady(event) {
        setYoutubeEvent(event)
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        setYoutubeEvent(event)
        if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        }
    }

    function handleForward() {
        incSong()
    }

    function handleRewind() {
        setCurrentSong(prev => (prev - 1) % playlist.length)
    }

    function handlePause() {
        youtubeEvent.target.pauseVideo()
    }

    function handlePlay() {
        youtubeEvent.target.playVideo()
    }

    function musicVideo() {
        if (flag) {
            return <YouTube
                videoId={playlist[currentSong]}
                opts={playerOptions}
                onReady={onPlayerReady}
                onStateChange={onPlayerStateChange} />
        }
        return <Box sx={{ height: "275px", width: "100%" }}>
            <MusicOffIcon sx={{ height: "100%", width: "100%" }} />
        </Box>
    }

    let textStyle = { pl: 3, fontSize: 16 }
    return (
        <Box style={{ display: props.index === 1 ? 'none' : 'block' }}>
            {musicVideo()}
            <Box sx={{ height: 120 }}>
                <Typography sx={{ textAlign: "center" }}>Now Playing</Typography>
                <Typography sx={textStyle}>Playlist: {flag && store?.listCurrentlyPlaying?.name}</Typography>
                <Typography sx={textStyle}>Song #: {flag && currentSong + 1}</Typography>
                <Typography sx={textStyle}>Title: {flag && store?.listCurrentlyPlaying?.songs[currentSong]?.title}</Typography>
                <Typography sx={textStyle}>Artist: {flag && store?.listCurrentlyPlaying?.songs[currentSong]?.artist}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Toolbar sx={{ bgcolor: "#bdbdbd", borderRadius: 8, mb: 2 }}>
                    <IconButton onClick={handleRewind} disabled={currentSong === 0 || !store?.listCurrentlyPlaying}>
                        <FastRewindIcon fontSize='large' />
                    </IconButton>
                    <IconButton onClick={handlePause} disabled={youtubeEvent.data === 2 || !store?.listCurrentlyPlaying}>
                        <StopIcon fontSize='large' />
                    </IconButton>
                    <IconButton onClick={handlePlay} disabled={youtubeEvent.data === 1 || !store?.listCurrentlyPlaying}>
                        <PlayArrowIcon fontSize='large' />
                    </IconButton>
                    <IconButton onClick={handleForward} disabled={!store?.listCurrentlyPlaying}>
                        <FastForwardIcon fontSize='large' />
                    </IconButton>
                </Toolbar>
            </Box>
        </Box>)
}