import React from 'react'
import { Box, Tabs, Tab, List, TextField, Container, Typography } from "@mui/material"
import { useState } from 'react'
import YouTubePlayerExample from './PlaylisterYouTubePlayer'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import CommentCard from './CommentCard'
import { useContext } from 'react'
const YoutubeScreen = () => {

  const [value, setValue] = React.useState(0);
  const { store } = useContext(GlobalStoreContext)
  const auth = useContext(AuthContext)
  const [text, setText] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <Box>
              {children}
            </Box>
          </Container>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function handleTextChange(event) {
    setText(event.target.value)
  }

  function handleAddComment(event) {
    if (event.keyCode == 13 && text !== "") {
      // console.log('value', event.target.value);
      store.addCommentToPlaylist(text)
      setText("")
    }
  }

  function commentSection() {
    if (store.listCurrentlyPlaying && store.listCurrentlyPlaying.comments.length === 0) {
      return <Typography sx={{ fontSize: 18 }}>This playlist currently has no comments...</Typography>
    }

    else if (store.listCurrentlyPlaying && store.listCurrentlyPlaying.comments.length > 0) {
      return store.listCurrentlyPlaying.comments.map((comment, index) => (<CommentCard key={index} comment={comment} />))
    }
  }

  let display = store.listCurrentlyPlaying && !store.listCurrentlyPlaying.publishInfo.isPublished ? 'hidden' : 'visible'

  return (
    <Box sx={{ width: "45%" }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example" centered>
          <Tab label="Player" {...a11yProps(0)} />
          <Tab label="Comments" {...a11yProps(1)} disabled={!store.listCurrentlyPlaying} />
        </Tabs>
      </Box>
      <YouTubePlayerExample index={value} />
      <TabPanel value={value} index={1} sx={{ height: "90%" }}>
        <List sx={{ height: "350px", overflow: "scroll", display: "flex", flexDirection: "column", gap: 1, alignItems: "left" }}>
          {commentSection()}
        </List>
        <TextField disabled={auth && !auth.notGuest} sx={{ width: "100%", mt: 3, visibility: display }} label="Add Comment" value={text} onChange={handleTextChange} onKeyDown={handleAddComment} autoFocus />
      </TabPanel>
    </Box>
  )
}

export default YoutubeScreen