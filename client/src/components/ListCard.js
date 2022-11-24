import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import SongScreen from './SongScreen';
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import Link from "@mui/material/Link"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { Button } from '@mui/material';
import { darken } from '@mui/material';
import AuthContext from '../auth';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext)
    const [editActive, setEditActive] = useState(false);
    const [playlist, setPlaylist] = useState(null)
    const [text, setText] = useState("");
    const { idNamePair, selected, list } = props;
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (list) {
            setPlaylist(list)
        }
    }, [])

    useEffect(() => {
        const getPlaylist = async () => {
            let playlist = await store.getCurrentList(idNamePair._id)
            setPlaylist(playlist)
        }
        getPlaylist()
    }, [idNamePair])

    async function handleClick() {
        if (playlist.songs.length > 0) {
            store.listenPlaylist(playlist)
        }
    }

    function handleExpand(event) {
        event.stopPropagation()
        // if (open && playlist && !playlist.publishInfo.isPublished) {
        //     store.clear(playlist)
        // }
        setOpen(!open)
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        console.log(id)
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleLike(event) {
        event.stopPropagation()
        store.likePlaylist(playlist)
    }

    function handleDislike(event) {
        event.stopPropagation()
        store.dislikePlaylist(playlist)
    }

    function background() {
        let isPlaying = playlist && store.listCurrentlyPlaying && store.listCurrentlyPlaying._id === playlist._id
        if (isPlaying) {
            return "#ffca28"
        } else {
          return (playlist && playlist.publishInfo.isPublished) ? "#7986cb" : "#2196f3"  
        }
    }

    let border = playlist && store.listCurrentlyPlaying && store.listCurrentlyPlaying._id === playlist._id ? 2 : 0
    let display = playlist && !playlist.publishInfo.isPublished ? 'none' : 'block'
    let cardElement =
        <Box>
            <ListItem
                id={idNamePair._id}
                key={idNamePair._id}
                sx={{ "&:hover": { backgroundColor: darken(background(), 0.1) }, bgcolor: background(), height: "20%", fontSize: 24, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", border: border }}
                button
                onClick={handleClick}
            >
                <Box sx={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                    <Typography sx={{ fontSize: 24 }}>{idNamePair.name}</Typography>
                    <Typography sx={{ fontSize: 14 }}><span style={{ marginRight: "10px" }}>By: </span> {playlist && <Link underline="hover" color="inherit">{playlist.publishInfo.publisher}</Link>}</Typography>
                    <Typography sx={{ fontSize: 14, display: display }}>Published: {playlist && playlist.publishInfo.publishDate}</Typography>
                    <Typography sx={{ fontSize: 14, display: display }}>Listens: {playlist && playlist.listens}</Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <Box sx={{ p: 1, display: playlist && !playlist.publishInfo.isPublished ? 'none' : 'block' }} >
                        <IconButton onClick={handleLike}>
                            {playlist && playlist.likedUsers.includes(auth.user.username) ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
                            <Typography sx={{ pl: 2 }}>{playlist && playlist.likes}</Typography>
                        </IconButton>
                        <IconButton onClick={handleDislike}>
                            {playlist && playlist.dislikedUsers.includes(auth.user.username) ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
                            <Typography sx={{ pl: 2 }}>{playlist && playlist.dislikes}</Typography>
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1, display: playlist && playlist.publishInfo.isPublished ? 'none' : 'block' }}>
                        <IconButton onClick={handleToggleEdit} aria-label='edit'>
                            <EditIcon style={{ fontSize: '24pt' }} />
                        </IconButton>
                    </Box>
                    <Box sx={{ p: 1, display: playlist && playlist.publishInfo.isPublished ? 'none' : 'block' }}>
                        <IconButton onClick={(event) => {
                            handleDeleteList(event, idNamePair._id)
                        }} aria-label='delete'>
                            <DeleteIcon style={{ fontSize: '24pt' }} />
                        </IconButton>
                    </Box>
                    <IconButton onClick={handleExpand}>
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </Box>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ bgcolor: background(), border: border, borderTop: 0 }}>
                <SongScreen playlist={playlist} />
            </Collapse>
        </Box>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{ style: { fontSize: 48 } }}
                InputLabelProps={{ style: { fontSize: 24 } }}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;