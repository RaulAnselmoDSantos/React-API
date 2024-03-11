import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import IRestaurante from "../../../../interfaces/IRestaurante";

const NovoRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const onSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    
    axios.post<IRestaurante>('http://localhost:8000/api/v2/restaurantes/', 
      {  
        nome: nomeRestaurante
      }
    )
      .then( () => {
        alert("Restaurante Cadastrado");
      })
      .catch((erro : any) => {
        console.log(erro);
      })
  };

  return (
    <form onSubmit={onSubmiterForm}>
      <TextField
        value={nomeRestaurante}
        onChange={(evento) => setNomeRestaurante(evento.target.value)}
        id="outlined-basic"
        label="Nome do Restaurante"
        variant="outlined"
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default NovoRestaurante;
