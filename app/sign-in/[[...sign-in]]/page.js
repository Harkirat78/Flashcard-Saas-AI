'use client'

import { SignIn } from "@clerk/nextjs";
import { AppBar, Container, Toolbar, Typography, Button, Box, Link, CircularProgress } from "@mui/material";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <AppBar position="static" sx={{ background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)", boxShadow: "0px 4px 8px rgba(0,0,0,0.3)" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: "#fff", fontWeight: "bold" }}>StudyFuzeAI</Typography>
          <Button color="inherit" component={Link} href="/sign-in" sx={{ background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)", color: "#fff", fontWeight: "bold", '&:hover': { background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)" } }}>
            Login
          </Button>
          <Button color="inherit" component={Link} href="/sign-up" sx={{ background: "linear-gradient(45deg, #66ccff 30%, #0066cc 90%)", color: "#fff", fontWeight: "bold", ml: 2, '&:hover': { background: "linear-gradient(45deg, #0066cc 30%, #66ccff 90%)" } }}>
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ color: "#0066cc", fontWeight: "bold" }}>
            Sign In
          </Typography>
          {loading ? (
            <CircularProgress size={60} sx={{ color: "#0066cc" }} />
          ) : (
            <SignIn
              afterSignInUrl="/flashcards"
              afterSignUpUrl="/flashcards"
              onSignInLoading={() => setLoading(true)}
              onSignInSuccess={() => setLoading(false)}
            />
          )}
        </Box>
      </Container>
      <Box sx={{ textAlign: "center", py: 2, bgcolor: "#0066cc" }}>
        <Typography variant="body2" sx={{ color: "#fff" }}>&copy; {new Date().getFullYear()} StudyFuzeAI. All rights reserved.</Typography>
      </Box>
    </Box>
  );
}