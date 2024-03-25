import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
  } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IPrato from "../../../../../interfaces/IPrato";
import httpV2 from "../../../../../http";
  
  const NovosPratos = () => {
    const parametros = useParams();
  
    useEffect(() => {
      if (parametros.id) {
        httpV2
          .get<IPrato>(`pratos/${parametros.id}/`)
          .then((resposta) => setNomePrato(resposta.data.nome));
      }
    }, [parametros]);
  
    const [nomePrato, setNomePrato] = useState("");
  
    const onSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
      evento.preventDefault();
  
      if (parametros.id) {
        httpV2
          .put<IPrato>(`pratos/${parametros.id}/`, {
            nome: nomePrato,
            tag: parametros.tag,
            descricao: parametros.descricao,
            restaurante: parametros.restaurante
          })
          .then(() => {
            alert("Prato Atualizado com sucesso");
          })
          .catch((erro: any) => {
            console.log(erro);
            alert("Ouve um problema ao atualizar o nome do Prato");
          });
      } else {
        httpV2
          .post<IPrato>("pratos/", {
            nome: nomePrato,
          })
          .then(() => {
            alert("Prato Cadastrado");
          })
          .catch((erro: any) => {
            console.log(erro);
            alert("Ouve um problema ao cadastrar o Prato");
          });
      }
      setNomePrato("");
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
                  Adicionar Novos Pratos
                </Typography>
                <Box
                  component={"form"}
                  sx={{ width: "100%" }}
                  onSubmit={onSubmiterForm}
                >
                  <TextField
                    value={nomePrato}
                    onChange={(evento) => setNomePrato(evento.target.value)}
                    id="outlined-basic"
                    label="Nome do Prato"
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
  
  export default NovosPratos;
  