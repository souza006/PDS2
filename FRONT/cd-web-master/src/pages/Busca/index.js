import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import api from '../../api'
import './styles.css'
import image from '../../components/header.jpg';
import { Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import NavBar from '../../components/NavBar';

class busca extends Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            query: '',
            artigos: [],
            autores: []
        }
    }

    async componentDidMount() {
        const url = this.props.location.search
        let response 

  
        let type= url.substring(url.length - 1);
        this.state.url = url.substring(url.length - 1);
        let text=url.substring(6,url.length - 7)
        if(type==`3`){
            response = await api.get(`/artigos/busca/chave/?tag=${text}`)
            this.setState(this.state.artigos = response.data.artigosFiltrados)
        }else{
            response = await api.get(`/artigos/busca${url}`)
            this.setState(this.state.artigos = response.data)
        }
       
    }

    render() {
        if (this.state.url === "1" || this.state.url=== "3") {
            const { artigos } = this.state;
            return (
                <div className='resultadoBusca'>
                    <NavBar />
                    <Container className='containerBusca'>
                        <h5>Sua pesquisa retornou {artigos.length} resultado(s).</h5>
                        {artigos.map(artigo => (
                            <div className='postBusca' key={artigo.slug}>
                                <div className='headerPost'>
                                    <img className='mb-2' src={image} width='100%' alt="header" height='200px' />
                                </div>
                                <div className='bodyPost'>
                                    <div className='titlePost'>
                                        <a href={'/artigos/' + artigo.slug}> {artigo.titulo} </a>
                                    </div>
                                    <div className='dataPublicPost d-flex'>
                                        <p> Publicado por <a className='' href={'/perfil/' + artigo.autor.username}> {artigo.autor.username} </a>   </p>
                                        <p className='dataHour'>
                                            {artigo.createdAt.substring(8, 10) + '/' + artigo.createdAt.substring(5, 7) + '/' +
                                                artigo.createdAt.substring(0, 4)
                                                + ' - ' + artigo.createdAt.substring(11, 16)}
                                        </p>
                                        {/* <img className='iconUserPost' src={iconUser} width='10%'/> */}
                                    </div>
                                    <div className='contentPost pb-2'>
                                        {artigo.corpo.substring(0, 98) + '... Clique no botão "ACESSAR" para ler na íntegra.'}
                                    </div>
                                    <div className='buttonAccessPost'>
                                        <Link to={'/artigos/' + artigo.slug}><Button color="" className='button col' type='submit'> Acessar </Button></Link>
                                    </div>
                                </div>
                               
                            </div>
                        ))}
                        
                    </Container>
                </div>
            )
        } else {
            const { autores } = this.state;
            return (
                <div className='resultadoBusca'>
                    <NavBar />
                    <Container className='containerBusca'>
                        <h5>Sua pesquisa retornou {autores.length} resultado(s).</h5>
                        {autores.map(autor => (
                            <div className='postBusca' key={autor.username}>
                                <img className='mb-2' src={autor.imagem} width='13%' alt="header" />
                                <div className='bodyBusca'>
                                    <div className='buttonAccessPost'>
                                        <div>{autor.username.toUpperCase()}</div>
                                        <div>{autor.email}</div>
                                        <Link to={'/perfil/' + autor.username}><Button color="" className='btn-primary buttonResult' type='submit'> Ver Perfil </Button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Container>
                </div>
            )
        }
    }
}

export default withRouter(busca)
