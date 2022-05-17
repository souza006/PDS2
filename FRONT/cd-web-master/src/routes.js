import React from 'react';
import Register from './pages/Register'
import Login from './pages/Login'
import RegistroArtigo from './pages/RegistroArtigo'
import Artigo from './components/DadosArtigo'
import Artigos from './pages/ListarArtigos'
import LerArtigo from './components/LerArtigo'
import ArtigoExcluir from './components/ConfirmDeleteArtigo'
import CardAutor from './components/CardAutor'
import UserAutor from './components/UserAutor'
import EditarArtigo from './pages/EditarArtigo'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/auth/logout';
import TagResult from './pages/TagResult'
import Busca from './pages/Busca'
import EditarUsuario from './pages/EditarUsuario'
import Diario from './components/Diario/index'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Artigos} />
                <Route path="/register" exact component={Register} />
                <Route path="/login" exact component={Login} />
                <Route path="/artigos/:slug" exact component={LerArtigo} />
                <Route path="/artigos" exact component={Artigos} />
                <Route path="/perfil/:slug" exact component={UserAutor} />
                <Route path="/perfil/:slug/artigos/" exact component={CardAutor} />
                <Route path="/login" exact component={Login} />
                <Route path="/tag/:tag" exact component={TagResult} />
                <Route path="/busca" exact component={Busca} />
                <Route path="/diario" exact component={Diario} />
                <PrivateRoute>
                    <Route path="/editarusuario" exact component={EditarUsuario} />
                    <Route path="/editarArtigo/:slug" exact component={EditarArtigo} />
                    <Route path="/registroArtigo" exact component={RegistroArtigo} />
                    <Route path="/artigo" exact component={ArtigoExcluir} />
                    <Route path='/logout' exact component={Logout} />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;