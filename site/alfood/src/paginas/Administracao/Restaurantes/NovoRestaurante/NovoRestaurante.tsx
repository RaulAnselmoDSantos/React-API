import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import IRestaurante from "../../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import httpV2 from "../../../../http/index";

const NovoRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      httpV2
        .get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then((resposta) => setNomeRestaurante(resposta.data.nome));
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const onSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      httpV2
        .put<IRestaurante>(`restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Atualizado com sucesso");
        })
        .catch((erro: any) => {
          console.log(erro);
          alert("Ouve um problema ao atualizar o nome do Restaurante");
        });
    } else {
      httpV2
        .post<IRestaurante>("restaurantes/", {
          nome: nomeRestaurante,
        })
        .then(() => {
          alert("Restaurante Cadastrado");
        })
        .catch((erro: any) => {
          console.log(erro);
          alert("Ouve um problema ao cadastrar o Restaurante");
        });
    }
    setNomeRestaurante("");
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: "1" }}>
          <Paper sx={{ mt: "10px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "10px",
              }}
            >
              <Typography component={"h1"} variant={"h6"}>
                Adicionar Restaurante
              </Typography>
              <Box
                component={"form"}
                sx={{ width: "100%" }}
                onSubmit={onSubmiterForm}
              >
                <TextField
                  value={nomeRestaurante}
                  onChange={(evento) => setNomeRestaurante(evento.target.value)}
                  id="outlined-basic"
                  label="Nome do Restaurante"
                  variant="outlined"
                  fullWidth
                  required
                />
                <Button
                  sx={{ marginTop: 1 }}
                  type="submit"
                  fullWidth
                  variant="outlined"
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default NovoRestaurante;
