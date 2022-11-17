import React from 'react'
import { Toolbar, IconButton, Box, TextField, Menu, MenuItem } from '@mui/material'
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
        <Toolbar disableGutters sx={{ bgcolor: "#e0e0e0", width: "100%", height: "12%", position: "relative", top: "10%", display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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
            <TextField variant='filled' sx={{ width: "45%", m: 0 }} label="Search" size='large' InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }} />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 1 }}>
                <InputLabel>SORT BY</InputLabel>
                <IconButton aria-label='sort' onClick={handleClick}>
                    <SortIcon fontSize='large' />
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
        </Toolbar>
    )
}

export default PlaylistToolbar