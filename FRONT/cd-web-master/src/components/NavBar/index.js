import React, { Component } from 'react'
import './styles.css'
import { Link, withRouter } from 'react-router-dom'
import logoNotification from '../../images/icons/notification.png'
import logoClarim from '../../public/images/signo-transparente-branco.png'
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    UncontrolledDropdown

} from 'reactstrap';
import api from '../../api';
import { getJwt } from '../auth/jwt';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
//import SearchIcon from '@material-ui/icons/Search';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            username: '',
            email: '',
            imagem: '',
            query: '',
            type: '1',
            notifications: []
        }
    }


    async componentDidMount() {
        const jwt = getJwt();
        let response
        const url = this.props.location.search

        if (url) {
            let type = url.substring(url.length - 1);
            let query = url.substring(6, url.length - 7)

            this.setState({ type: type, query: query })
        }
        try {
            response = await api.get('/usuario', { headers: { Authorization: `Token ${jwt}` } });
            this.setState({ username: response.data.username, imagem: response.data.imagem, notifications: response.data.notificacoes })
        } catch (error) {
            localStorage.removeItem('token')
        }
        console.log(response)

    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    submitHandler = event => {
        event.preventDefault();
        this.props.history.push(`/busca?text=${this.state.query}&type=${this.state.type}`)
        if (`/busca?text=${this.state.query}` !== this.props.location.search) {
            document.location.reload()
        }
    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    render() {
        if (localStorage.getItem('token') === null) {
            return (
                <div>
                    <Navbar color="#fbc271" dark expand="md" className='navbar'>
                        <NavbarBrand href="/"><img src={logoClarim} alt='' width='50%' className="imgLogo"></img></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto espaco" navbar>
                            </Nav>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <form className="form-inline input-group" onSubmit={this.submitHandler}>
                                        {/* <button className="btn" type='submit'></button>
                                        <input className=" form-control formInput" type="text" name="query" value={this.state.query} onChange={this.changeHandler}></input>
                                        <label>Gostaria de Pesquisar por:</label>
                                        <select name="tipo" form="form-inline input-group">
                                            <option name="type" value={this.state.type} onChange={this.changeHandler}>Artigo</option>
                                            <option name="type" value={this.state.type} onChange={this.changeHandler}>Autor</option>
                                            {console.log(this.state.query)}
                                        </select> */}
                                        <select className=" form-control" name="type" onChange={this.changeHandler} value={this.state.type}>
                                            <option value="1">Título</option>
                                            <option value="2">Autor</option>
                                            <option value="3">Palavra-Chave</option>
                                        </select>
                                        <InputBase className=" form-control formInput" placeholder="Search…" inputProps={{ 'aria-label': 'search' }} name="query" value={this.state.query} onChange={this.changeHandler} />
                                        <button className="btn" type='submit'><i class="fas fa-search"></i></button>
                                    </form>

                                </NavItem>
                            </Nav>
                            <Nav className="mr-auto espaco" navbar>
                            </Nav>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <Link to='/login'><Button variant="contained" color="primary">Login</Button></Link>

                                    <Link to='/register' style={{ marginLeft: "10px" }}><Button variant="contained" color="primary" >Cadastro</Button></Link>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar color="#fbc271" dark expand="md" className='navbar'>
                        <NavbarBrand href="/"><img src={logoClarim} alt='' className="imgLogo"></img></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="mr-auto espaco" navbar>
                            </Nav>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <form className="form-inline input-group" onSubmit={this.submitHandler}>
                                        <select className=" form-control" name="type" onChange={this.changeHandler} value={this.state.type} defaultValue={this.state.type}>
                                            <option value="1">Título</option>
                                            <option value="2">Autor</option>
                                            <option value="3">Palavra-Chave</option>
                                        </select>
                                        <input className=" form-control formInput" type="text" name="query" value={this.state.query} onChange={this.changeHandler} />
                                        <button className="btn" type='submit'><i className="fas fa-search"></i></button>
                                    </form>
                                </NavItem>
                            </Nav>
                            <NavbarBrand className="" navbar>
                                <Link to='/registroartigo'><Button variant="contained" color="primary">Escrever</Button></Link>
                            </NavbarBrand>
                            {/*  notificação  */}
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className='perfil'>
                                        <img src={logoNotification} style={{ height: "28px" }} />
                                        <span class="badge badge-light">{this.state.notifications.length}</span>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {/* <DropdownItem divider /> */}
                                        <div className='container-notification'>
                                            {this.state.notifications.map(notificacao =>
                                                <DropdownItem>

                                                    <p>{notificacao.descricao}</p>
                                                </DropdownItem>
                                            )}
                                        </div>
                                        <DropdownItem>
                                            <Button variant="contained" color="primary">Limpar</Button>
                                            <Button variant="contained" color="primary">Ver Mais</Button>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <Nav>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret className='perfil'>
                                        {this.state.username.toUpperCase()}
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        {/* <DropdownItem divider /> */}
                                        <DropdownItem>
                                            <Link to={`/perfil/${this.state.username}`} className='dropdownMenu'><AccountBoxIcon /> Meu Perfil</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/diario' className='dropdownMenu'><LibraryBooksIcon /> Meu Diário</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/editarusuario' className='dropdownMenu'><SettingsApplicationsIcon /> Gerenciar Conta</Link>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <Link to='/logout' className='dropdownMenu'><ExitToAppIcon />Sair</Link>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </Navbar>
                </div>
            )
        }
    }
}
export default withRouter(Header)