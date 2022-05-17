import React from 'react';
import { useHistory } from "react-router-dom";
import  customRedirect from '../utils/customRedirect'
import './styles.css'
import { getJwt } from '../auth/jwt.js';
import api from '../../api'
import { Form, FormGroup, Label, Button, Input } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 

class FormComentario extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            slug: '',
            content: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()
        console.log(this.props)
        const jwt = getJwt();
        const comentario = {
            comentario: this.state.comentario
        }
        if(this.state.comentario==undefined){
            console.log('teste===========================================')
            toast.error('Comentarios nao podem ser vazios')

        }else if (this.state.comentario.length>300){
            toast.error('Seu Comentario nao pode ter mais de 300 caracteres ')
        }else {
            api.post('artigos/comentar/' + this.props.slug, comentario, { headers: { Authorization: `Token ${jwt}` } }).then(response => {
                customRedirect(`artigos/${this.props.slug}?success=True`)
            }).catch(err => {
                if (jwt == null){
                    toast.error('ops.. Voce precisa estar logado para realizar esta Acao!')
                }
               
            })

        }
        

    }
    componentDidMount() {
        console.log(this.props)
    }

    render() {

        return (
            <Form className='mt-5' onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input type='textarea' placeholder='Deixe aqui seu comentário.' className='' rows='5' name="comentario" value={this.state.value} onChange={this.changeHandler} />
                    <Button className="buttonArtigo mt-2" type="submit">Comentar</Button>
                    <ToastContainer/>
                </FormGroup>
            </Form>)
    }

}


export default FormComentario;