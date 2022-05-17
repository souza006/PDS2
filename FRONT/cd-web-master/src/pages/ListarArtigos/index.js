import React, { Component } from 'react';
import '../../components/style/Artigos.css';
import '../../components/style/Pagination.css';
import CardPostRight from '../../components/CardPostRight';
import CardPostArtigo from '../../components/CardPostArtigo';
import Tags from '../../components/Tags.js';
import Axios from 'axios';
import api from '../../api'
import NavBar from '../../components/NavBar';
import { Link } from 'react-router-dom';
import './style.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Container } from 'reactstrap'
export default class ListarArtigo extends Component {

    constructor(props) {

        super(props)

        this.state = {
            offset: 0,
            tableData: [],
            orgtableData: [],
            perPage: 10,
            currentPage: 0,
            randomfact: {},
            tags: [],
            registered: false,
            message: ''
        }
    }

    componentDidMount() {
        Axios.get('https://cat-fact.herokuapp.com/facts/random').then((response) => {
            this.setState({ randomfact: response.data })
            console.log(this.state)
            api.get('tags').then(res => {
                console.log('your response')
                let tagsArtigos = []
                for (let i = 0; i < 15; i++) {
                    tagsArtigos.push(res.data.tagsArtigos[i])

                }

                this.setState({ tags: tagsArtigos })

            })
            if (document.location.search) {
                toast.success('Cadastro efetuado com sucesso, seja bem vindo ao clarim 📙')
            }
        })
    }
    render() {
        return (
            <div>
                <NavBar />
                <ToastContainer />
                <Container>
                    <div className="main-custom-tag-container">
                        {this.state.tags.map(tag =>
                            <Link location={'/tag/' + tag} to={'/tag/' + tag}><div className="main-custom-tag" >{tag.toLowerCase()}</div></Link>
                        )}
                    </div>
                    <div className="d-flex flex-row pageArtigosHome">
                        <div className='flex-column'>
                            <h2 className='titleHome sm-8'> Artigos assim, só no Clarim! </h2>
                            <CardPostArtigo />
                        </div>
                    </div>
                </Container>

            </div>
        );
    }
}