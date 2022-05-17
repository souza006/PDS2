import React from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
import {getJwt}from '../auth/jwt'
import './styles.css';
import iconUser from '../../public/images/emersonIcon.jpg';
import imageCard from '../../public/images/PaginaInicial.jpg';

import ModalExcluir from '../ModalExcluir';
import { Container, Row, Col } from 'reactstrap';
import api from '../../api'
import parseHtml from 'html-react-parser'


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default class UserAutor extends React.Component {

    state = {
        autor: "",
        email: "",
        bio: "",
        artigos: [],
        hasChangePerm:false
    }

    async componentDidMount() {
        let url1 = this.props.location.pathname;
        let url2=this.props.location.pathname.slice(1)
        const jwt = getJwt()
        let mockuser ={data:{username:"teste"}}
        let user
        console.log(jwt)
        if(jwt!==undefined || jwt!==null){
            try {
             user = await api.get(`usuario`, { headers: { Authorization: `Token ${jwt}` } })
            }catch(err){
                user=mockuser
            }
        }
            api.get(`${url2}`)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('autor', res.data.username);
                const autor = res.data.username;
                const email = res.data.email;
                const bio = res.data.bio;
                this.setState({ autor, email, bio });
                if(user.data.username === autor){
                  
                    this.setState({hasChangePerm:true})
                }

            })

        const partes = url1.split('/')[2]
        api.get(`${url1}/artigos`)
            .then(res => {
                const artigos = res.data.artigos
                this.setState({ artigos });
            })


    }

    render() {
        return (
            <div className="App">
                <NavBar />
                <body>
                    <Container className='mt-5 cardAutor'>
                        <Row className='justify-content-d-center'>
                            <Col xs='2' className='mt-2'>
                                <img className="imageAutor" width='100%' src="https://icon-library.com/images/user-profile-icon/user-profile-icon-23.jpg" />
                            </Col>
                            <Col className='dadosAutor'>
                                <h2> {this.state.autor} </h2>
                                <Row>
                                    <Col xs='3'> 
                                        <p className='emailAutor'>
                                            <b> {this.state.email} </b>
                                        </p>
                                    </Col> 
                                    <Col className='btnEditUser' hidden={!this.state.hasChangePerm}> 
                                        <a href='/editarusuario' className="btn btn-outline-info"> Editar Perfil </a>
                                    </Col>
                                </Row>
                                
                                <hr />

                                <h4 className=''> BIO </h4>
                                <p className="bioAutor cla-author-bio">
                                    {this.state.bio}
                                </p>
                            </Col>
                        </Row>
                        <Row className='justify-content-d-center'>
                            <Col>
                                
                            </Col>
                        </Row>
                    </Container>
                    <hr />
                    <Container>
        
                        <h3> Artigos publicados </h3> 
                        <div className='areaArtigos'>
                            {this.state.artigos.map(artigo => (
                                <Card className="cardArtigo">
                                <CardActionArea>
                                  <CardMedia
                                    component="img"
                                    image={imageCard}
                                    
                                  />
                                  <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                     {artigo.titulo}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       {parseHtml(artigo.corpo.substring(0,99))}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <p className='dataHour mt-2'> <b> {artigo.createdAt.substring(8, 10) + '/' + artigo.createdAt.substring(5, 7) + '/' + artigo.createdAt.substring(0, 4) + ' - ' + artigo.createdAt.substring(11, 16)} </b> </p>
                                    </Typography>
                                  </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <a href={'/artigos/' + artigo.slug}>
                                        <Button size="small" color="primary">
                                            Ler mais
                                        </Button>
                                    </a>
                                </CardActions>
                              </Card>
                                // <div className="cardArtigo">
                                //     {/* <img className="flex-column" alt='img01' src={MoriohImage} /> */}
                                //     <h4>{artigo.titulo}</h4>
                                //     <p className='dataHour mt-2'> <b> {artigo.createdAt.substring(8, 10) + '/' + artigo.createdAt.substring(5, 7) + '/' + artigo.createdAt.substring(0, 4) + ' - ' + artigo.createdAt.substring(11, 16)} </b> </p>
                                //     <p>{artigo.descricao}</p>
                                //     <div>
                                //         <p className=""> {parseHtml(artigo.corpo)}</p>
                                //     </div>

                                //     <div className="">
                                //         <a href={'/artigos/' + artigo.slug}><Button className='buttonUser' type='submit'> Acessar </Button></a>
                                //         <a href={'/editarArtigo/' + artigo.slug}><Button className="buttonUser" hidden={!this.state.hasChangePerm}> Editar </Button></a>
                                //          <div hidden={!this.state.hasChangePerm} >
                                //          <ModalExcluir slug={artigo.slug}  buttonLabel="Excluir" className="buttonUserExcluir"  link="/artigo"></ModalExcluir>
                                //         </div>

                                        
                                //     </div>
                                // </div>
                            ))}
                        </div>
                    </Container>
                    {/**/}
                </body>
            </div>


        );
    }

}