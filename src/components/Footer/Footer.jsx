import React from "react";
import { Box, Container, Grid, Typography, IconButton, Link, Tooltip } from "@mui/material";
import { FaArrowUp } from "react-icons/fa";
import { styled } from "@mui/system";

const StyledFooter = styled(Box)(({ theme }) => ({
  background: "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
  color: "#fff",
  padding: "48px 0 24px 0",
  position: "relative",
  marginTop: "auto"
}));

const StyledLink = styled(Link)({
  color: "#fff",
  textDecoration: "none",
  transition: "opacity 0.3s",
  "&:hover": {
    opacity: 0.8,
    textDecoration: "none"
  }
});

const ScrollTopButton = styled(IconButton)({
  position: "absolute",
  bottom: "24px",
  right: "24px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)"
  }
});

const Footer = () => {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              © {new Date().getFullYear()} GoodReads - ITI. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: { xs: 1, sm: 3 },
                justifyContent: { sm: "flex-end" }
              }}
            >
              <StyledLink href="/about" aria-label="About us">
                About
              </StyledLink>
              <StyledLink href="/terms" aria-label="Terms of Service">
                Terms of Service
              </StyledLink>
            </Box>
          </Grid>
        </Grid>

        <Tooltip title="Back to Top" arrow>
          <ScrollTopButton
            onClick={handleScrollTop}
            aria-label="scroll to top"
            size="large"
          >
            <FaArrowUp />
          </ScrollTopButton>
        </Tooltip>
      </Container>
    </StyledFooter>
  );
};

export default Footer;