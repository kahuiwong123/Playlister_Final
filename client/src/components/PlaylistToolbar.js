import React from 'react'
import { AppBar, IconButton, Box, TextField, Menu, MenuItem } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonIcon from '@mui/icons-material/Person';
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';


const PlaylistToolbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar sx={{ width: "100%", height: "12%", position: "absolute", top: "10%", px: 2, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Box>
                <IconButton aria-label='home' >
                    <HomeIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='people' >
                    <PeopleAltIcon fontSize='large' />
                </IconButton>
                <IconButton aria-label='person' >
                    <PersonIcon fontSize='large' />
                </IconButton>
            </Box>
            <TextField variant='filled' sx={{ width: "45%" }} label="Search" size='large' InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }} />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <InputLabel>SORT BY</InputLabel>
                <IconButton aria-label='sort' >
                    <SortIcon fontSize='large' onClick={handleClick} />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>Name (A-Z)</MenuItem>
                    <MenuItem onClick={handleClose}>Publish Date (Newest)</MenuItem>
                    <MenuItem onClick={handleClose}>Listens (High-Low)</MenuItem>
                    <MenuItem onClick={handleClose}>Likes (High-Low)</MenuItem>
                    <MenuItem onClick={handleClose}>Dislikes (High-Low)</MenuItem>
                </Menu>
            </Box>
        </AppBar>
    )
}

export default PlaylistToolbar