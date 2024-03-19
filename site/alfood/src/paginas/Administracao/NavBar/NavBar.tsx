import { AppBar, Container, Toolbar, Typography, Box, Button, Link } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"


export default function NavBar(){
    return(
        <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: "1" }}>
              <Link component={RouterLink} to={'/admin/restaurantes'}>
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to={'/admin/restaurantes/Novo'}>
                <Button sx={{ my: 2, color: "white" }}>
                  Novos Restaurantes
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    )
}