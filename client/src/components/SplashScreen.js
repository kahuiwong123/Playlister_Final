import { TextField, Button, Link, Grid, Box, Typography, ScopedCssBaseline } from "@mui/material";
import Copyright from "./Copyright"
import AuthContext from '../auth';
import { useContext } from "react"


export default function SplashScreen() {
    const { auth } = useContext(AuthContext)

    function handleGuest() {
        auth.loginGuest()
    }

    return (
        <Box sx={{
            backgroundImage: "url(https://images.pexels.com/photos/1037992/pexels-photo-1037992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)", backgroundSize: 'cover',
            backgroundPosition: 'center', width: "100%", height: "90%"
        }}>
            <Box
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '55%',
                    transform: 'translate(-50%, -50%)',
                    background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(21,125,205,1) 0%, rgba(0,212,255,1) 100%)",
                    height: "70%",
                    width: "60%",
                    borderRadius: 5,
                    py: 2,
                    opacity: 0.8
                }}
            >
                <Typography variant="h2" sx={{ textAlign: "center" }}>Playlister</Typography>
                <Typography variant="h4" sx={{ textAlign: "center" }}>A powerful application for customizing and viewing playlists!</Typography>
                <Box sx={{ display: "flex", flexDirection: 'column', mt: 5, gap: 4, alignItems: "center" }}>
                    <Button href="/login/" variant="contained" sx={{ width: "50%", py: "8px", fontSize: 20 }}>Login</Button>
                    <Button href="/register/" variant="contained" sx={{ width: "50%", py: "8px", fontSize: 20 }}>Create Account</Button>
                    <Button variant="contained" onClick={handleGuest} sx={{ width: "50%", py: "8px", fontSize: 20 }}>Continue as Guest</Button>
                </Box>
            </Box>
        </Box>
    )
}