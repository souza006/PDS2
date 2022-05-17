import React from 'react'
import { Component } from 'react';
import './style.css'
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap'
import imagemUsuario from '../../public/images/imagemUsuario.png'
import { getJwt } from '../auth/jwt';
import api from '../../api';

export default class EditarUsuario extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usernameAtual: '',
            emailAtual: '',
            imagemAtual: '',
            bioAtual: '',
            passwordAtual: '',
            username: '',
            email: '',
            password: '',
            bio: '',
            imagem: ''
        }
    }

    async componentDidMount() {
        const jwt = getJwt();
        api.get('/usuario', { headers: { Authorization: `Token ${jwt}` } }).then(
            res => {
                console.log(res.data)
                this.setState({
                    usernameAtual: res.data.username,
                    emailAtual: res.data.email,
                    // password: res.data.password,
                    bio: res.data.bio,
                    // imagem: res.data.imagem
                });
            }
        )
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        console.log("Nome do Usuário: " + this.state.username)

        console.log("Nome do Usuário: " + this.state.username)
        const usuario = {
            usuario: {
                username: `${this.state.username ? this.state.username : this.state.usernameAtual}`,
                email: `${this.state.email ? this.state.email : this.state.emailAtual}`,
                imagem: `${this.state.imagem ? this.state.imagem : this.state.imagemAtual}`,
                password: `${this.state.password ? this.state.password : this.state.passwordAtual}`,
                bio: `${this.state.bio ? this.state.bio : this.state.bioAtual}`,
            },
        }
        console.log(usuario);
        const jwt = getJwt();
        api.put('/usuario', usuario, { headers: { Authorization: `Token ${jwt}` } })
            .then(response => {
                console.log(response)
            })
    }

    render() {
        let username = this.state.username;
        const imagem = this.state.imagem;
        const bio = this.state.bio;
        const email = this.state.email;
        const password = this.state.password;

        if (this.username === '') {
            this.username = this.state.usernameAtual
        }


        return (
            <div>
                <Container className="container">
                    <Form onSubmit={this.submitHandler}>
                        <Row className="div-perfil">

                            <h3 className="perfil"><i class="fas fa-user" style={{ paddingRight: 10 + "px" }}></i>Perfil de {this.state.usernameAtual.toUpperCase()}</h3>
                        </Row>
                        <Row className="div-imagem">
                            <Col>
                                <img src={imagemUsuario} className="imgUsuario img-fluid col-auto" alt="imagem do usuário" />
                                <FormGroup>
                                    <i class="fas fa-upload iconUpload"></i>
                                    <label for='selecao-arquivo' className="upload-file">Escolha uma imagem</label>
                                    <input name="imagem" value={imagem} onChange={this.changeHandler} type="file" id="selecao-arquivo" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="form-1 col-auto">
                                    <input type="text" placeholder={this.state.usernameAtual} name="username" value={username} onChange={this.changeHandler} className="input-style form-control" />
                                    <i className="fas fa-user iconUsername" />
                                    <input type="password" placeholder="Senha " name="password" value={password} onChange={this.changeHandler} className="input-style form-control input-2" />
                                    <i class="fas fa-key iconPassword"></i>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="form-1 coluna3">
                                    <input type="text" placeholder={this.state.emailAtual} name="email" value={email} onChange={this.changeHandler} className="input-style form-control" />
                                    <i class="fas fa-at iconEmail"></i>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="form-1">
                                    <textarea placeholder={this.state.bioAtual} rows="7" name="bio" value={bio} onChange={this.changeHandler} className="form-textarea form-control" />
                                    <i class="fas fa-book iconBio"></i>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button className="botaoSalvar">Salvar</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>

            </div >
        )

    }


}
