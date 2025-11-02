import { Container, Paper, Typography } from '@mui/material'

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome
      </Typography>

      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to Regtech Partners! Navigate using the menu above.
        </Typography>
      </Paper>
    </Container>
  )
}

export default Home
