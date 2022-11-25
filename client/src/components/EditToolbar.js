import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import Button from '@mui/material/Button';
import Box from "@mui/material/Box"
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import { darken } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    function handleUndo() {
        store.undo(props.playlist);
    }
    function handleRedo() {
        store.redo(props.playlist);
    }

    function handlePublish() {
        store.openPublishModal(props.playlist)
    }

    function handleUnpublish() {
        store.openUnpublishModal(props.playlist)
        console.log(store.currentModal)
    }


    let display = props.playlist && props.playlist.publishInfo.isPublished && props.playlist.ownerEmail !== auth.user.email ? 'hidden' : 'visible'

    function background() {
        let isPlaying = props.playlist && store.listCurrentlyPlaying && store.listCurrentlyPlaying._id === props.playlist._id
        if (isPlaying) {
            return "#ffb300"
        } else {
            return (props.playlist && props.playlist.publishInfo.isPublished) ? "#5c6bc0" : "#1565c0"
        }
    }

    function publishButton() {
        if (props.playlist && !props.playlist.publishInfo.isPublished) {
            return <Button variant="contained" size="medium" onClick={handlePublish} sx={{ visibility: display, bgcolor: background(), "&:hover": { backgroundColor: darken(background(), 0.1) } }}>Publish</Button>
        }

        return <Button variant="contained" size="medium" onClick={handleUnpublish} sx={{ visibility: display, bgcolor: background(), "&:hover": { backgroundColor: darken(background(), 0.1) } }}>Unpublish</Button>
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", px: 2, py: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                {props.playlist && !props.playlist.publishInfo.isPublished && <Button
                    disabled={!store.canUndo(props.playlist)}
                    onClick={handleUndo}
                    variant="contained"
                    sx={{ bgcolor: background(), "&:hover": { backgroundColor: darken(background(), 0.1) } }}>
                    <UndoIcon />
                </Button>}
                {props.playlist && !props.playlist.publishInfo.isPublished && <Button
                    disabled={!store.canRedo(props.playlist)}
                    onClick={handleRedo}
                    variant="contained"
                    sx={{ bgcolor: background(), "&:hover": { backgroundColor: darken(background(), 0.1) } }}>
                    <RedoIcon />
                </Button>}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                {publishButton()}
                <Button variant="contained" size="medium" sx={{ bgcolor: background(), "&:hover": { backgroundColor: darken(background(), 0.1) } }}>Duplicate</Button>
            </Box>
        </Box>
    )
}

export default EditToolbar;