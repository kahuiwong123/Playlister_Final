import React from 'react'
import { Box, Typography, Link } from "@mui/material"

const CommentCard = (props) => {
    const { comment } = props
    return (
        <Box sx={{width: "90%", height: "10%", py: 3, px: 1, bgcolor: "#ffc400", borderRadius: 3, border: 2}}>
            <Link sx={{fontSize: 18}}>{comment.commenter}</Link>
            <Typography sx={{fontSize: 18}}>{comment.comment}</Typography>
        </Box>
    )
}

export default CommentCard