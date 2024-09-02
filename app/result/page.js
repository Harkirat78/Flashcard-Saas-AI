'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResultPage = () => {
    const theme = useTheme();

    return (
        <Container 
            maxWidth="100vw" 
            sx={{ 
                textAlign: 'center', 
                mt: 4, 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center',
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                color: theme.palette.common.white,
                padding: 4
            }}
        >
            <Box
                sx={{
                    background: theme.palette.background.paper,
                    borderRadius: 4,
                    padding: 4,
                    boxShadow: theme.shadows[4],
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <Typography 
                    variant="h4" 
                    sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.text.primary }}
                >
                    Coming Soon for Pro Users!
                </Typography>
                <Typography 
                    variant="body1" 
                    sx={{ mb: 4, color: theme.palette.text.secondary }}
                >
                    An updated version with exciting new features will be available soon. Thank you for your patience!
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    sx={{ padding: '10px 20px', fontWeight: 'bold', borderRadius: '30px', boxShadow: theme.shadows[6] }}
                >
                    Stay Updated
                </Button>
            </Box>
        </Container>
    );
};

export default ResultPage;
