import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Box from "@mui/material/Box"
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';

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

    return (
        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", px: 2, py: 2 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                    disabled={!store.canUndo(props.playlist)}
                    onClick={handleUndo}
                    variant="contained">
                    <UndoIcon />
                </Button>
                <Button
                    disabled={!store.canRedo(props.playlist)}
                    onClick={handleRedo}
                    variant="contained">
                    <RedoIcon />
                </Button>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Button variant="contained" size="medium" onClick={handlePublish}>Publish</Button>
                <Button variant="contained" size="medium">Duplicate</Button>
            </Box>
        </Box>
    )
}

export default EditToolbar;