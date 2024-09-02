'use client'

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Grid, Link } from "@mui/material";
import Head from "next/head";
import Stripe from "stripe";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter();
  const handleSubmit = () => {
    // Navigate to the result page
    router.push('/result');
  };

  const basic = () => {
    // Navigate to the result page
    router.push('/generate');
  }
  const startIt = () => {
    // Navigate to the result page
    router.push('/generate');
  }
  /*
  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000', //YOOOOO change to vercel domain
      },
    })

    const checkoutSessionJSON = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJSON.id
    })

    if (error) {
      console.warn(error.message)
    }

  }
  */
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Head>
        <title>StudyFuzeAI</title>
        <meta name="description" content="StudyFuzeAI - Your Personal Study Assistant" />
      </Head>

      <AppBar position="static" sx={{ background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)", boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff", fontWeight: "bold" }}>StudyFuzeAI</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in" sx={{ background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)", color: "#fff", fontWeight: "bold", '&:hover': { background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)" } }}>
              Log In
            </Button>
            <Button color="inherit" href="/sign-up" sx={{ background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)", color: "#fff", fontWeight: "bold", ml: 2, '&:hover': { background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)" } }}>
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container maxWidth="100vw" sx={{ bgcolor: "#f4f4f4", flexGrow: 1 }}>
        <Box sx={{ textAlign: "center", my: 8, px: 2, py: 4, bgcolor: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)" }}>
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", color: "#0066cc" }}>
            Welcome to StudyFuze AI!
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: "#333" }}>
            Make Studying FlashCards With the Click of a Button!
          </Typography>
          <Button variant="contained" color="primary" onClick={basic} sx={{
            mt: 2,
            background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)",
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            transition: "transform 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)",
            },
          }}>
            Get Started
          </Button>
        </Box>

        <Box sx={{ my: 6, px: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold", color: "#0066cc" }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", bgcolor: "#fff", transition: "transform 0.3s", '&:hover': { transform: "scale(1.02)", boxShadow: "0px 8px 16px rgba(0,0,0,0.4)" } }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#0066cc" }}>
                Easy Text Input
              </Typography>
              <Typography>
                Simply input your text and let our software do the rest. Creating flashcards has never been easier.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", bgcolor: "#fff", transition: "transform 0.3s", '&:hover': { transform: "scale(1.02)", boxShadow: "0px 8px 16px rgba(0,0,0,0.4)" } }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#0066cc" }}>
                Smart Flashcards
              </Typography>
              <Typography>
                Our AI intelligently breaks down your text into concise flashcards, perfect for studying.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 3, border: "1px solid", borderColor: "grey.300", borderRadius: 2, boxShadow: "0px 4px 12px rgba(0,0,0,0.3)", bgcolor: "#fff", transition: "transform 0.3s", '&:hover': { transform: "scale(1.02)", boxShadow: "0px 8px 16px rgba(0,0,0,0.4)" } }}>
              <Typography variant="h6" gutterBottom sx={{ color: "#0066cc" }}>
                Accessible Anywhere
              </Typography>
              <Typography>
                Access your flashcards from any device, at any time. Study on the go with ease.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ my: 6, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#0066cc" }}>
          Pricing
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              bgcolor: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              '&:hover': {
                transform: "scale(1.02)",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.4)"
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#0066cc" }}>
                Basic
              </Typography>
              <Typography variant="h6" gutterBottom>
                $0 / Month
              </Typography>
              <Typography>
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" onClick={basic} sx={{
                mt: 2,
                background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)",
                color: "#fff",
                fontWeight: "bold",
                '&:hover': {
                  background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)"
                }
              }}>
                Choose Basic
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
              bgcolor: "#fff",
              transition: "transform 0.3s, box-shadow 0.3s",
              '&:hover': {
                transform: "scale(1.02)",
                boxShadow: "0px 8px 16px rgba(0,0,0,0.4)"
              }
            }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#0066cc" }}>
                Pro
              </Typography>
              <Typography variant="h6" gutterBottom>
                $10 / Month
              </Typography>
              <Typography>
                Unlimited flashcards and storage with priority support.
              </Typography>
              <Button variant="contained" color="primary" onClick={handleSubmit} sx={{
                mt: 2,
                background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)",
                color: "#fff",
                fontWeight: "bold",
                '&:hover': {
                  background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)"
                }
                
              }}>
                Choose Pro
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      </Container>

      <Box sx={{ textAlign: "center", py: 2, bgcolor: "#0066cc" }}>
        <Typography variant="body2" sx={{ color: "#fff" }}>
          &copy; {new Date().getFullYear()} StudyFuzeAI. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}