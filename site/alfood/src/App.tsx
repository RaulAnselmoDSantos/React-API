import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurantes/AdministracaoRestaurantes';
import NovoRestaurante from './paginas/Administracao/Restaurantes/NovoRestaurante/NovoRestaurante';
import Admin from './paginas/Administracao/Admin';
import AdministracaoPrato from './paginas/Administracao/Restaurantes/Pratos/AdministracaoPratos';
import NovosPratos from './paginas/Administracao/Restaurantes/Pratos/NovosPratos/NovosPratos';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<Admin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/Novo" element={<NovoRestaurante />} />
        <Route path="restaurantes/:id" element={<NovoRestaurante />} />
        <Route path="pratos" element={<AdministracaoPrato />} />
        <Route path="pratos/Novos" element={<NovosPratos />} />
        <Route path="prato/:id" element={<Home />} />
      </Route>

    </Routes>
  );
}

export default App;
