import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
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

    function handleUndo() {
        store.undo(props.playlist);
    }
    function handleRedo() {
        store.redo(props.playlist);
    }

    function handlePublish() {
        store.openPublishModal(props.playlist)
    }

    let background = (props.playlist && props.playlist.publishInfo.isPublished) ? "#ff9100" : "#1565c0"
    let display = props.playlist && props.playlist.publishInfo.isPublished ? 'hidden' : 'visible'

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", px: 2, py: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                    disabled={!store.canUndo(props.playlist)}
                    onClick={handleUndo}
                    variant="contained"
                    sx={{visibility: display }}>
                    <UndoIcon />
                </Button>
                <Button
                    disabled={!store.canRedo(props.playlist)}
                    onClick={handleRedo}
                    variant="contained"
                    sx={{visibility: display }}>
                    <RedoIcon />
                </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" size="medium" onClick={handlePublish} sx={{visibility: display }}>Publish</Button>
                <Button variant="contained" size="medium" sx={{bgcolor: background, "&:hover": { backgroundColor: darken(background, 0.1) }}}>Duplicate</Button>
            </Box>
        </Box>
    )
}

export default EditToolbar;