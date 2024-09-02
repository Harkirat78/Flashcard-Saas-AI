'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { collection, doc, getDocs } from "firebase/firestore"
import { db } from "../../firebase"
import { Button, Grid, CardActionArea, Card, CardContent, Container, TextField, Typography, Box } from "@mui/material"
import { useRouter, useSearchParams } from "next/navigation"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([]) 
    const [flipped, setFlipped] = useState([]) 
    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const querySnapshot = await getDocs(colRef)
            const flashcardsData = []

            querySnapshot.forEach((doc) => {
                flashcardsData.push({ id: doc.id, ...doc.data() })
            })
            setFlashcards(flashcardsData)
        }
        getFlashcard()
    }, [user, search])

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    if (!isLoaded || !isSignedIn) {
        return <></>
    }

    return (
        <Container maxWidth="100vw">
            <Grid container spacing={3} sx={{mt: 4}}>
            {flashcards.length > 0 && (
                <Box sx={{mt: 4, width: '100%'}}>
                    <Typography variant="h5" sx={{ color: "blue", fontWeight: "bold", fontSize: "2rem", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)", borderBottom: "2px solid blue", paddingBottom: "8px", textAlign: "center" }}>Flashcards Preview</Typography>

                    <Grid container spacing={3}>
                        {flashcards.map((flashcard, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => {
                                            handleCardClick(index);
                                        }}
                                    >
                                        <CardContent>
                                            <Box sx={{
                                                perspective: '1000px',
                                                '& > div': {
                                                    transition: 'transform 0.6s',
                                                    transformStyle: 'preserve-3d',
                                                    position: 'relative',
                                                    width: '100%',
                                                    height: '200px',
                                                    boxShadow: '0 4px 8px 0 rgba(0,0,0, 0.2)',
                                                    transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                },
                                                '& > div > div': {
                                                    position: 'absolute',
                                                    width: '100%',
                                                    height: '100%',
                                                    backfaceVisibility: 'hidden',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    padding: 2,
                                                    boxSizing: 'border-box',
                                                },
                                                '& > div > div.front': {
                                                    backgroundColor: '#fff',
                                                },
                                                '& > div > div.back': {
                                                    backgroundColor: '#f7f7f7',
                                                    transform: 'rotateY(180deg)',
                                                },
                                            }}>
                                                <div>
                                                    <div className="front">
                                                        <Typography variant="h5" component="div">
                                                            {flashcard.front}
                                                        </Typography>
                                                    </div>
                                                    <div className="back">
                                                        <Typography variant="h5" component="div">
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
                </Box>
            )}
            </Grid>
        </Container>
    )
}