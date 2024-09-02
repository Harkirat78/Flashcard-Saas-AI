// This is a Client Component
'use client'

import { Button, CardActionArea, CardContent, Dialog, DialogContent, DialogActions, DialogContentText, TextField, CircularProgress } from "@mui/material"
import { db } from "@/firebase"
import { useState } from "react"
import { Container, Grid, Card, Box, Typography, Paper, DialogTitle } from "@mui/material"
import { getFirestore, doc, collection, getDoc, setDoc, writeBatch } from "firebase/firestore";
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export default function Generate() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async () => {
        setLoading(true)
        fetch('/api/generate', {
            method: 'POST',
            body: text,
        })
            .then((res) => res.json())
            .then((data) => {
                setFlashcards(data)
                setLoading(false)
            })
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashCards = async () => {
        if (!name) {
            alert('Please enter a name')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []

            if (collections.find((f) => f.name === name)) {
                alert("Flashcard has same name - Already Exists")
                return
            } else {
                collections.push({ name })
                batch.set(userDocRef, { flashcards: collections }, { merge: true })
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ name }] })
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
                <Box sx={{ mb: 4, display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Poppins', sans-serif" }}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "#3f51b5", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)", mb: 2 }}>
                        Generate Flashcards
                    </Typography>
                    <Paper sx={{ p: 4, width: "100%", boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", borderRadius: "12px" }}>
                        <TextField
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            label="Enter Text"
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            sx={{ mb: 2, borderRadius: "8px" }}
                        />
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{
                                mb: 2,
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                                color: "#fff",
                                transition: "transform 0.3s",
                                "&:hover": {
                                    transform: "scale(1.05)",
                                },
                            }}
                        >
                            Submit
                        </Button>
                    </Paper>
                </Box>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                        <CircularProgress size={60} sx={{ color: "#3f51b5" }} />
                    </Box>
                ) : flashcards.length > 0 ? (
                    <Box sx={{ mt: 4 }}>
                        <Typography
                            variant="h5"
                            sx={{
                                color: "#3f51b5",
                                fontWeight: "bold",
                                fontSize: "2rem",
                                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
                                borderBottom: "2px solid #3f51b5",
                                paddingBottom: "8px",
                                textAlign: "center",
                            }}
                        >
                            Flashcards Preview
                        </Typography>

                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {flashcards.map((flashcard, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Card
                                        sx={{
                                            borderRadius: "16px",
                                            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                                            "&:hover": {
                                                transform: "translateY(-10px)",
                                                transition: "transform 0.3s",
                                            },
                                        }}
                                    >
                                        <CardActionArea onClick={() => handleCardClick(index)}>
                                            <CardContent>
                                                <Box
                                                    sx={{
                                                        perspective: "1000px",
                                                        "& > div": {
                                                            transition: "transform 0.6s",
                                                            transformStyle: "preserve-3d",
                                                            position: "relative",
                                                            width: "100%",
                                                            height: "200px",
                                                            boxShadow: "0 4px 8px 0 rgba(0,0,0, 0.2)",
                                                            transform: flipped[index] ? "rotateY(180deg)" : "rotateY(0deg)",
                                                        },
                                                        "& > div > div": {
                                                            position: "absolute",
                                                            width: "100%",
                                                            height: "100%",
                                                            backfaceVisibility: "hidden",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            padding: 2,
                                                            boxSizing: "border-box",
                                                        },
                                                        "& > div > div.front": {
                                                            backgroundColor: "#fff",
                                                            borderRadius: "16px",
                                                        },
                                                        "& > div > div.back": {
                                                            backgroundColor: "#f7f7f7",
                                                            borderRadius: "16px",
                                                            transform: "rotateY(180deg)",
                                                        },
                                                    }}
                                                >
                                                    <div>
                                                        <div className="front">
                                                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                                                                {flashcard.front}
                                                            </Typography>
                                                        </div>
                                                        <div className="back">
                                                            <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                                                                {flashcard.back}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleOpen}
                                sx={{
                                    fontWeight: "bold",
                                    fontSize: "1.1rem",
                                    background: "linear-gradient(45deg, #f50057 30%, #ff4081 90%)",
                                    color: "#fff",
                                    transition: "transform 0.3s",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                            >
                                Save Flashcards
                            </Button>
                        </Box>
                    </Box>
                ) : null}
            </Container>

            <Box sx={{ textAlign: "center", py: 2, bgcolor: "#1976d2", color: "#fff" }}>
                <Typography variant="body2">&copy; {new Date().getFullYear()} StudyFuzeAI. All rights reserved.</Typography>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText>Enter a name for your flashcard collection</DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Collection Name"
                        type="text"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        variant="outlined"
                        sx={{ borderRadius: "8px" }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={saveFlashCards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}