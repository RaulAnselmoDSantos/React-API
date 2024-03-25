
import { useEffect, useState } from "react";
import IPrato from "../../../../interfaces/IPrato";
import {
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import httpV2 from "../../../../http/index";
import IRestaurante from "../../../../interfaces/IRestaurante";
import axios from "axios";


const AdministracaoPrato = () => {
  const [prato, setPrato] = useState<IPrato[]>([]);
  const [nomeRestaurantes, setNomeRestaurantes] = useState<IRestaurante[]>([]);
    

  useEffect(() => {
    httpV2
      .get<IPrato[]>("pratos/")
      .then((resposta) => setPrato(resposta.data))
      .catch((erro: any) => { console.log(erro)})
    axios.get('')

  }, []);

  const excluirPrato = (pratoParaExclusao: IPrato) => {
    httpV2.delete(`pratos/${pratoParaExclusao.id}/`).then(() => {
      const listaNovosPrato = prato.filter(
        (pratos) => pratos.id !== pratoParaExclusao.id
      );
      setPrato([...listaNovosPrato]);
    });
  };

  

  return (
    <>
      <Container sx={{ margin: "10px" }}>
        <Paper>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Prato</TableCell>
                  <TableCell>Tag</TableCell>
                  <TableCell>Imagem</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Excluir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prato.map((prato) => (
                  <TableRow key={prato.id}>
                    <TableCell>{prato.nome}</TableCell>
                    <TableCell>{prato.tag}</TableCell>
                    <TableCell> <a href={prato.imagem} target="_blank" rel="noreferrer">[Ver Imagem]</a></TableCell>
                    <TableCell>
                      {" "}
                      <Link to={`/admin/prato/${prato.id}`}>
                        [Editar]
                      </Link>{" "}
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => excluirPrato(prato)}
                      >
                        Excluir
                      </Button>{" "}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </>
  );
};
export default AdministracaoPrato;
