import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axiosInstance from "../../apis/config";
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';

const AuthorBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [authorBooks, setAuthorBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axiosInstance.get(`/books/filter?authors=${id}`);
        setAuthorBooks(res.data.books);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, [id]);

  return (
    <Container >
      <Typography variant="h3" align="center" gutterBottom>
        Author Books
      </Typography>
      {authorBooks && authorBooks.length > 0 ? (
        <Grid container spacing={2} justifyContent="center">
          {authorBooks.map((authorBook) => (
            <Grid item xs={12} sm={6} md={3} key={authorBook._id}>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onClick={() => navigate(`/bookDetails?bookId=${authorBook._id}`)}
              >
                <Box
                  component="img"
                  src={
                    authorBook.img.includes("imgur")
                      ? authorBook.img.replace("imgur", "i.imgur") + ".jpg"
                      : authorBook.img
                  }
                  alt={`${authorBook.name} image`}
                  sx={{ width: "100%", height: "auto" }}
                />
                <Typography variant="subtitle1">{authorBook.title}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};

export default AuthorBooks;
