import React from 'react';
import { Link } from 'react-router-dom'

import axios from 'axios';
import NavBar from '../NavBar';
import { Container, Button, Row, Col } from 'reactstrap';
import './styles.css'
import Coment from '../../images/icons/coments.png';
import Likes from '../../images/icons/heart-plus.png';
import ModalExcluir from '../ModalExcluir'
import FormComentario from '../FormComentario'
import iconUser from '../../public/images/iconUser.png';
import Curtir from '../CurtirArtigo';
import { getJwt } from '../auth/jwt';
import api from '../../api';
import Descurtir from '../DescurtirArtigo';

export default class Artigo extends React.Component {

    state = {
        artigo: "",
        autor: "",
        createdAt: "",
        coments: [],
        isLike: false,
        curtidas: "",
        slug: ""
    }

    async componentDidMount() {
        const url1 = this.props.location.pathname;
        this.state.slug = url1.slice(9)
        const jwt = getJwt();
        console.log(url1)
        axios.get(`${url1}`)
            .then(res => {
                const artigo = res.data.artigo;
                const autor = res.data.artigo.autor;
                const createdAt = res.data.artigo.createdAt.substring(8, 10) + '/' + res.data.artigo.createdAt.substring(5, 7) + '/' + res.data.artigo.createdAt.substring(0, 4) + ' - ' + res.data.artigo.createdAt.substring(11, 16);
                const coments = res.data.artigo.comentarios;
                const curtidas = res.data.artigo.curtidasCont;
                this.setState({ artigo, autor, createdAt, coments, curtidas });
                const url2 = this.props.location.pathname;
                this.state.slug = url1.slice(9)

                axios.post(`/${url2}/curtir`, {}, { headers: { Authorization: `Token ${jwt}` } }).then(res => {
                    console.log(url2);
                    if (curtidas != res.data.artigo.curtidasCont) {
                        api.delete(`${url2}/curtir`, {}, { headers: { Authorization: `Token ${jwt}` } });
                    }
                    else {
                        this.setState({ isLike: true });
                    }
                })
            })
    }

    Curtir() {
        const jwt = getJwt();
        if (this.state.isLike == true) {
            api.delete(`artigos/${this.state.artigo.slug}/curtir`);
        }
        else {
            api.post('artigos/' + this.state.artigo.slug + '/curtir/', {}, { headers: { Authorization: `Token ${jwt}` } })
            console.log(this.state.artigo.slug)
        }
    }

    render() {


        return (
            <div className="App">
                <NavBar />
                <body>
                    <main>
                        <Container>
                            <h1 className="mt-5"> {this.state.artigo.titulo}</h1>
                            <p className="mb-5 subtitulo"> {this.state.artigo.descricao}</p>
                            <Row>
                                <Col md={8} className="cla-author-box">
                                    <img className="iconUserArtigo" width='10%' alt="icon"
                                        src={iconUser} />
                                    <div className="createArticle">
                                        <p className='ml-2'> <b> {this.state.autor.username} </b> <br />
                                            {this.state.createdAt}
                                        </p>
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <Row className='mb-3'>
                                        <Col md={2}> <ModalExcluir buttonLabel="Excluir" className="buttonArtigoExcluir" link='/artigo' slug={this.state.artigo.slug}></ModalExcluir> </Col>
                                        <Col md={2}> <Link to={'/editarArtigo/' + this.state.artigo.slug}> <Button variant="" className='buttonArtigo'>  Editar </Button> </Link> </Col>
                                    </Row>
                                </Col>
                            </Row>
                            <hr />
                            <p className='corpoArtigo'> {this.state.artigo.corpo} </p>

                            <hr />
                            <h6> <b> Comentários </b> </h6>

                            <div className="mb-5">

                                <div>
                                    <img className="cla-icon mr-2" alt="icon2" src={Likes} />
                                    <img className="cla-icon" alt="icon3" src={Coment} />

                                    <Curtir slug={this.state.artigo.slug}></Curtir>
                                    <label>{this.state.curtidas}</label>

                                </div>

                                <div>
                                    {/*listagem dos comentários*/}
                                    {this.state.coments.map(comment => (
                                        <div className="comments">
                                            <div>
                                                <div>
                                                    <p className='nomeAutorComment'> <b> {comment.autor_name} </b> </p>
                                                    <p className='dataComment'>
                                                        {comment.createdAt.substring(8, 10) + '/' + comment.createdAt.substring(5, 7) + '/' + comment.createdAt.substring(0, 4) + ' - ' + comment.createdAt.substring(11, 16)}
                                                    </p>
                                                </div>
                                                <p> <i> {comment.corpo} </i> </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                <Container className=''>
                                    <FormComentario slug={this.state.slug} />
                                </Container>

                            </div>
                        </Container>

                    </main>
                </body>

            </div >
        );
    }
}
