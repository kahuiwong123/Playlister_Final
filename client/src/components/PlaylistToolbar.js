import React from 'react'
import { useContext, useState, useEffect } from 'react';
import { Toolbar, IconButton, Box, TextField, Menu, MenuItem, Button, darken } from '@mui/material'
import { GlobalStoreContext } from '../store';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import CancelIcon from '@mui/icons-material/Cancel';
import AuthContext from '../auth';
const PlaylistToolbar = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { store } = useContext(GlobalStoreContext)
    const auth = useContext(AuthContext)
    const [text, setText] = useState("")
    const [focused, setFocused] = React.useState(false)
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (store && store.searchText) {
            setText(store.searchText)
        }
    }, [store.searchText])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleHome = () => {
        store.displayHome()
    }

    const handleAllLists = () => {
        store.displayAllLists()
    }

    const handleUsers = () => {
        store.displayUsers()
    }

    const handleTextChange = (e) => {
        setText(e.target.value)

    }

    const handleSearch = (event) => {
        if (event.keyCode == 13 && text !== "") {
            console.log(text)
            store.setSearchText(text)

        }
    }

    const handleReset = (event) => {
        event.stopPropagation()
        setText("")
        store.setSearchText(null)
    }

    const handleSort = (type) => {
        store.setSortType(type)
        setAnchorEl(null)
    }

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    return (
        <Toolbar disableGutters sx={{ bgcolor: "#e0e0e0", width: "100%", height: "12%", position: "relative", top: "10%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
                <IconButton aria-label='home' disabled={!props.notGuest} onClick={handleHome}>
                    <HomeIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='people' onClick={handleAllLists}>
                    <PeopleAltIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='person' onClick={handleUsers}>
                    <PersonIcon fontSize='large' />
                </IconButton>
                <Chip label={store.screenType} sx={{ width: 100, fontSize: "medium" }} />
            </Box>
            <TextField error={focused && text === ""} onBlur={onBlur} onFocus={onFocus} label={focused && text === "" ? "Search string cannot be empty" : "Search"} value={text} onChange={handleTextChange} onKeyDown={handleSearch} variant='filled' sx={{ width: "45%" }} size='large' InputProps={{
                startAdornment: (
                    <InputAdornment position="start" >
                        <SearchIcon />
                    </InputAdornment>
                ),

                endAdornment: (
                    <InputAdornment position="end">
                        <Button onClick={handleReset} variant="contained" endIcon={<CancelIcon />} sx={{ "&:hover": { backgroundColor: darken("#bdbdbd", 0.1) }, bgcolor: "#bdbdbd", fontSize: 10 }}>
                            Reset Filter
                        </Button>
                    </InputAdornment>
                ),

            }} />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <InputLabel>SORT BY</InputLabel>
                <Chip label={store.sortType} sx={{ width: 100, fontSize: "medium" }} />
                <IconButton aria-label='sort' onClick={handleClick}>
                    <SortIcon fontSize='large' />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => { handleSort("NAME") }}>Name (A-Z)</MenuItem>
                    <MenuItem onClick={() => { handleSort("DATE") }}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={() => { handleSort("LISTENS") }}>Listens (High-Low)</MenuItem>
                    <MenuItem onClick={() => { handleSort("LIKES") }}>Likes (High-Low)</MenuItem>
                    <MenuItem onClick={() => { handleSort("DISLIKES") }}>Dislikes (High-Low)</MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    )
}

export default PlaylistToolbar