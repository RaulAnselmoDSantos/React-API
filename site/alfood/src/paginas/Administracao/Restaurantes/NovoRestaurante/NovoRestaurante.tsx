import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import IRestaurante from "../../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";

const NovoRestaurante = () => {

  const parametros = useParams(); 

  useEffect(() => {
    if(parametros.id){
      axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const onSubmiterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if(parametros.id){

      axios.put<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, 
      {  
        nome: nomeRestaurante
      }
    )
      .then( () => {
        alert("Restaurante Atualizado com sucesso");
      })
      .catch((erro : any) => {
        console.log(erro);
        alert("Ouve um problema ao atualizar o nome do Restaurante");
      })

    }else{
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
        alert("Ouve um problema ao cadastrar o Restaurante");
      })
    }
    
    
  };

  return (
    <div>
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
    </div>
  );
};

export default NovoRestaurante;
