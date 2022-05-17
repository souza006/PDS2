import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import api from '../../api'
import './styles.css'
import logoClarim2 from '../../public/images/logo-tipo-2.png'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import Reading from '../../public/images/reading.svg';

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: false,
            erroEmail: false,
            erroPassword: false,
        }
    }
    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    submitHandler = event => {
        event.preventDefault();
        const usuario = {
            usuario: {
                email: this.state.email,
                password: this.state.password,
            }
        }
        api.post('/auth/login', usuario).then(response => {
            console.log(response)
            localStorage.setItem('token', response.data.usuario.token);
            this.setState({
                redirect: true
            })
            toast.succes('Seja bem vindo')
        }).catch(err => {
            if (err.response !== undefined && err.response.status === 422) {
                toast.error('opss algo deu errado...\n confira suas credenciais🗝️')
                console.log(err.response.data.message)
                if (err.response.data.message == 'Missing credentials') {

                    this.setState({ erroEmail: true, erroPassword: true })

                } else if (err.response.data.message == 'Email incorreto.') {
                    this.setState({ erroEmail: true })
                    this.setState({ erroPassword: false })
                } else if (err.response.data.message == 'Senha incorreta.') {
                    this.setState({ erroEmail: false })
                    this.setState({ erroPassword: true })
                } else {
                    console.log("pass")
                }
            }

        })
    }

    render() {

        if (!this.state.redirect) {
            return (
                <div className="">
                    <div id="content" className="d-flex flex-row login" >
                        <div className="flex-column loginDiv">
                            <form className="formLogin" onSubmit={this.submitHandler} >
                                <h2 className='login-name mb-5'>LOGIN</h2>
                                <TextField className="inputForm" error={this.state.erroEmail} id="email-field" name="email" label="Email" type="email" variant="outlined" value={this.state.email} onChange={this.changeHandler} />
                                <small className="error" hidden={!this.state.erroEmail}>Email invalido</small>
                                <TextField className="inputForm" error={this.state.erroPassword} id="outlined-basic" name="password" label="Senha" type="password" variant="outlined" value={this.state.password} onChange={this.changeHandler} />
                                <small className="error" hidden={!this.state.erroPassword}>Senha invalida</small>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="inputForm"
                                    type="submit"
                                    endIcon={<Icon>send</Icon>}
                                >
                                    Login
                                </Button>

                                <ToastContainer />
                            </form>
                        </div>
                        <div className="flex-column">
                            <img class="readingImage" src={Reading} alt="" />
                            <h3 className="customMessage">Encontre seus assuntos favoritos</h3>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to='/'></Redirect>
        }
    }
}

export default withRouter(Login)