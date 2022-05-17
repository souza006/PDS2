import React, { useEffect, useState } from 'react';
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
import DadosArtigo from '../DadosArtigo'
import Curtir from '../CurtirArtigo';
import { getJwt } from '../auth/jwt';
import api from '../../api';
import Descurtir from '../DescurtirArtigo';
import parseHtml from 'html-react-parser'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function LerArtigo(props) {
    const [artigo, setArtigo] = useState(Object)
    const [autor, setAutor] = useState(Object)
    const [curtidas, setCurtidas] = useState(0)
    const [favoritos, setFavoritos] = useState([])
    const [comentarios, setComentarios] = useState([])
    const [tags, setTags] = useState([])
    const [isLiked, setIsLiked] = useState(false)
    const [isFollow, setIsFollow] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [isLogged, setLogged] = useState(false);
    const [corpo, setCorpo] = useState("");
    const [hasChangePerm, setHasChangePerm] = useState(false)
    var qtd_coments = 0

    useEffect(async () => {
        const url1 = props.location.pathname;
        const slug = url1.slice(9)
        const jwt = getJwt();
        let res = {}
        let user = {}

        if (document.location.search) {
            toast.success('Comentario Salvo com Sucesso')
        }

        let artigo_id = 0
        let autor_data = 0

        res = await api.get(`${url1}`)
        setCurtidas(res.data.artigo.curtidasCont)
        setComentarios(res.data.artigo.comentarios)
        setArtigo(res.data.artigo)
        setTags(res.data.artigo.listaTags)
        setCorpo(res.data.artigo.corpo)
        setAutor(res.data.artigo.autor)
        artigo_id = res.data.artigo.id
        autor_data = res.data.artigo.autor
        try {
            user = await api.get(`usuario`, { headers: { Authorization: `Token ${jwt}` } })
            if (user.data.username === autor_data.username) {
                setHasChangePerm(true)
            }
            setLogged(true)

        } catch (err) {
            setLogged(false)
        }
        api.get(`usuario`, { headers: { Authorization: `Token ${jwt}` } }).then(user => {
            setLogged(true)

            const artigosCurtidos = user.data.artigosCurtidos
            document.getElementById("like-button").classList.add("btn")
            document.getElementById("like-button").classList.add("btn-primary")
            artigosCurtidos.map(id => {
                if (id == artigo_id) {
                    setIsLiked(true)
                    document.getElementById("like-button").classList.add("btn-warning")
                    document.getElementById("like-button").classList.remove("btn-primary")
                    document.getElementById("like-button").innerHTML = "<i class='fas fa-thumbs-down'></i> Descurtir"
                }
            })

            const autoresSeguidos = user.data.seguindo
            console.log(user.data.seguindo)
            document.getElementById("follow-button").classList.add("btn")
            document.getElementById("follow-button").classList.add("btn-primary")
            document.getElementById("follow-button").innerHTML = "<i class='fa fa-user-plus'></i> Follow"
            autoresSeguidos.map(author => {

                if (autor_data.username == author.username) {
                    setIsFollow(true)
                    document.getElementById("follow-button").classList.add("btn-warning")
                    document.getElementById("follow-button").classList.remove("btn-primary")
                    document.getElementById("follow-button").innerHTML = "<i class='fa fa-user-times'></i> Unfollow"
                }

            })
        }).catch(err => {
            setLogged(false)
            document.getElementById("like-button").disabled = true
            document.getElementById("follow-button").disabled = true

        })
    }, [])

    //muda o estado do botao de curtir e curte e descurte com base no estado atual 
    const toggleLike = async (event) => {
        const jwt = getJwt();
        var response = {}
        if (isLiked) {
            response = await api.delete(`artigos/` + artigo.slug + `/curtir`, { headers: { Authorization: `Token ${jwt}` } })

            setIsLiked(false)
            setCurtidas(curtidas - 1)
            document.getElementById("like-button").classList.add("btn-primary")
            document.getElementById("like-button").classList.remove("btn-warning")
            document.getElementById("like-button").innerHTML = "<i class='fas fa-thumbs-up'></i> Curtir"
        } else {
            response = await api.post('artigos/' + artigo.slug + '/curtir/', {}, { headers: { Authorization: `Token ${jwt}` } })
            setIsLiked(true)
            setCurtidas(curtidas + 1)
            document.getElementById("like-button").classList.add("btn-warning")
            document.getElementById("like-button").classList.add("btn-primary")
            document.getElementById("like-button").innerHTML = "<i class='fas fa-thumbs-down'></i> Descurtir"

        }

    }

    const toggleSave = async (event) => {
        const jwt = getJwt();
        let response = {}
        if (isSaved){
            response = await api.delete('/artigos/' + artigo.slug + '/favoritar', {headers: { Authorization: `Token ${jwt}`}})
            setIsSaved(false)
            document.getElementById("save-button").innerHTML = "<i class='far fa-bookmark'></i>"
        } else {
            response = await api.post('artigos/' + artigo.slug + '/favoritar', {}, { headers: { Authorization: `Token ${jwt}` } })
            setIsSaved(true);
            document.getElementById("save-button").innerHTML = "<i class='fas fa-bookmark'></i>"
        }
    }

    const togglefollow = async (event) => {
        const jwt = getJwt();
        var response = {}
        if (isFollow) {
            response = await api.delete(`/perfil/` + artigo.autor.username + `/seguir`, { headers: { Authorization: `Token ${jwt}` } })
            setIsFollow(false)
            document.getElementById("follow-button").classList.add("btn-primary")
            document.getElementById("follow-button").classList.remove("btn-warning")
            document.getElementById("follow-button").innerHTML = "<i class='fa fa-user-plus'></i> Follow"
        }
        else {
            response = await api.post(`/perfil/` + artigo.autor.username + `/seguir`, {}, { headers: { Authorization: `Token ${jwt}` } })
            setIsFollow(true)
            document.getElementById("follow-button").classList.add("btn-warning")
            document.getElementById("follow-button").classList.add("btn-primary")
            document.getElementById("follow-button").innerHTML = "<i class='fas fa-user-times'></i> Unfollow"
        }
    }

    return (
        <div className="App">
            <NavBar />
            <body>
                <main>
                    <Container>
                        <ToastContainer />
                        <h1 className="mt-5"> {artigo.titulo}</h1>
                        <p className="mb-5 subtitulo"> {artigo.descricao}</p>
                        <div className="custom-tag-container">
                            {tags.map(tag =>

                                <Link location={'/tag/' + tag} to={'/tag/' + tag}><div className="custom-tag">{tag.toLowerCase()}</div></Link>
                            )}
                        </div>
                        <Row>
                            <Col md={8} className="cla-author-box">
                                <img className="iconUserArtigo" width='10%' alt="icon"
                                    src={iconUser} />
                                <div className="createArticle">
                                    <p className='ml-2'> <b>{autor.username} </b> <br />
                                        {artigo.createdAt}
                                    </p>
                                </div>
                            </Col>
                            <Col md={4} >
                                <Row className='mb-3'>
                                    <button id="follow-button" onClick={togglefollow} className="btn btn-info"></button>
                                    <Col md={2} hidden={!hasChangePerm}> <ModalExcluir buttonLabel="Excluir" className="buttonArtigoExcluir" link='/artigo' slug={artigo.slug}></ModalExcluir> </Col>
                                    <Col md={2} hidden={!hasChangePerm} > <Link to={'/editarArtigo/' + artigo.slug}> <Button variant="" className='buttonArtigo'>  Editar </Button> </Link> </Col>
                                </Row>
                            </Col>
                        </Row>
                        <hr />
                        <p className='corpoArtigo'> {parseHtml(corpo)} </p>

                        <hr />

                        <label>{curtidas}</label>

                        {console.log(artigo)}

                        <button id="like-button" onClick={toggleLike} className="btn"><i className="fas fa-thumbs-up"></i>curtir</button>
                        <button id="save-button" onClick={toggleSave} className="btn"><i class="far fa-bookmark"></i></button>
                        <h6> <b> Comentários </b> </h6>

                        <div className="mb-5">

                            <div>
                                <img className="cla-icon mr-2" alt="icon2" src={Likes} />
                                <img className="cla-icon" alt="icon3" src={Coment} />



                            </div>
                            <div>
                                {/*listagem dos comentários*/}
                                {comentarios.map(comment => (
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
                                <FormComentario slug={artigo.slug} />
                            </Container>

                        </div>
                    </Container>

                </main>
            </body>

        </div >
    );



}
