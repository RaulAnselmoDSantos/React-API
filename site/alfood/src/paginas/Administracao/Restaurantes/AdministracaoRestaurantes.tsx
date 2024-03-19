import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Link } from "react-router-dom";
import httpV2 from "../../../http/index";
import NavBar from "../NavBar/NavBar";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        httpV2.get<IRestaurante[]>('restaurantes/')
        .then(
            resposta => setRestaurantes(resposta.data)
        )
        .catch((erro : any) => {
            console.log(erro);
        })
    }, [] )



    const excluirRestaurante = (restauranteParaExclusao: IRestaurante) => {
        httpV2.delete(`restaurantes/${restauranteParaExclusao.id}/`)
            .then(() => {
                const listaNovosRestaurantes = restaurantes.filter(restaurantes => restaurantes.id !== restauranteParaExclusao.id)
                setRestaurantes([ ...listaNovosRestaurantes ])
            })
    }

    return(
        <>
            <NavBar></NavBar>
            <Container sx={{margin: '10px'}}>
                    <Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Primeiro Restaurante</TableCell>
                                    <TableCell>Editar</TableCell>
                                    <TableCell>Excluir</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {restaurantes.map (restaurante => 
                                    <TableRow key={restaurante.id}>
                                        <TableCell>{restaurante.nome}</TableCell>
                                        <TableCell> <Link to={`/admin/restaurantes/${restaurante.id}`}>[Editar]</Link> </TableCell>
                                        <TableCell> <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>Excluir</Button> </TableCell>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>                        
            </Container>
        </>
    )
}
export default AdministracaoRestaurantes;