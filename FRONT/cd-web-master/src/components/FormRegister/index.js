import React, { Component } from 'react'
import './styles.css'
import logoClarim2 from '../../public/images/digitando2.jpg'
import api from '../../api'
import Header from '../NavBar'
import Modal from '../ModalArtigo'
import { Container, Row, Col } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PaginaInicial from '../../public/images/PaginaInicial.jpg';
import { Route , withRouter} from 'react-router-dom';
import customRedirect from '../utils/customRedirect'


 class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    submitHandler = event => {
        event.preventDefault();
        const usuario = {
            usuario: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }
        }
        api.post('/auth/registro/', usuario).then(response => {
          api.post('/auth/login/',{usuario:{email:this.state.email,password:this.state.password}}).then(res=>{
            localStorage.setItem('token',res.data.usuario.token)
            console.log("primeiro verifique a token")
            console.log(localStorage.getItem('token'))
            console.log('mudando raskdoakd')
            customRedirect('?registered=True')
          }).catch(err =>{
                console.log(err)

          })
        })
       
      
    }

    render() {
        const { username, email, password } = this.state
        return (
            <div>
                <Header path='/'></Header>
                <div className='d-flex flex-row cadastro'>
                    <div className="flex-column cadastroDiv">
                        <h2 className="diario mb-5">CADASTRO</h2>
                        <form className="formCadastro" onSubmit={this.submitHandler} >
                            <TextField className="inputForm"  id="outlined-basic" name="username" label="Nickname (Apelido)" type="text" variant="outlined"  value={username} onChange={this.changeHandler}/>
                            <TextField className="inputForm"  id="outlined-basic" name="email" label="Email" type="email" variant="outlined"  value={this.state.email} onChange={this.changeHandler}/>
                            <TextField  className="inputForm" id="outlined-basic" name="password" label="Senha" type="password" variant="outlined"  value={this.state.password} onChange={this.changeHandler}/>
                            <TextField  className="inputForm" id="outlined-basic" label="Repita a senha" type="password" variant="outlined"/>
                            <Button
                                    variant="contained"
                                    color="primary"
                                    className="inputForm"
                                    type="submit"
                                    endIcon={<Icon>send</Icon>}
                                >
                                    Cadastrar
                            </Button>
                         
                        </form>
                    </div>
                    <div className="flex-column ladoImage">
                        <img src={PaginaInicial} width='100%' />
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(FormRegister)