import React from "react";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router';
const GradientBackground = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  position: "relative",
  overflow: "hidden"
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
}));

const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <GradientBackground>
      <ContentWrapper maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "4rem", lg: "4.5rem" },
              fontWeight: 700,
              color: "rgb(44, 44, 44)",
              marginBottom: 2,
              fontFamily: "b612"
            }}
          >
            Discover Your Next Great Read
          </Typography>
        
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "1.5rem", md: "2rem" },
              fontWeight: 500,
              color: "common.white",
              marginBottom: 4,
              opacity: 0.9
            }}
          >
            Unlock a world of knowledge with our vast collection of digital books
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "flex-start" }
          }}
        >
          <Button
            onClick= {() => navigate("/books")}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "common.white",
              color: "primary.main",
              fontSize: "1.1rem",
              padding: "12px 32px",
              "&:hover": {
                backgroundColor: "common.white",
                transform: "scale(1.05)",
                transition: "transform 0.3s ease"
              }
            }}
          >
            Explore Our Books
          </Button>
          <Button
            onClick= {() => navigate("/categories")}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "common.white",
              color: "common.white",
              fontSize: "1.1rem",
              padding: "12px 32px",
              "&:hover": {
                borderColor: "common.white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "scale(1.05)",
                transition: "transform 0.3s ease"
              }
            }}
          >
            Browse Categories
          </Button>
        </Box>
      </ContentWrapper>
    </GradientBackground>
  );
};

export default HeroSection;