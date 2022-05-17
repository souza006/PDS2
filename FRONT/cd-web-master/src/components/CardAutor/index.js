import React, { Component } from 'react'
import api from '../../api'
// import axios from 'axios';
// import image from './header.jpg';
// import { Button } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import ReactPaginate from 'react-paginate';
import './styles.css'
import MoriohImage from '../../public/images/morioh-city.png'
import ModalExcluir from '../ModalExcluir'

export default class Test extends Component {

    constructor(props) {

        super(props)


        this.state = {
            offset: 0, //deslocamento nas páginas. (0 - 5 / 5 - 10, ...)
            perPage: 5,  //número de artigos por página.
            pageCount: 0, //quantidade de páginas na navegação.
            currentPage: 0, //página que está sendo acessada.
            artigos: [],
            // orgtableData: [],
            tableData: [] //array com o intervalo fornecido do array artigos.
        }
    }

    async componentDidMount() {

        const autor = localStorage.getItem('autor');
        const response = await api.get('/perfil/' + autor + '/artigos');
        this.setState(this.state.artigos = response.data);
        console.log(this.state);
        console.log(this.state.artigos);

        var slice = this.state.artigos.slice(this.state.offset, this.state.offset + this.state.perPage);  //intervalo que vamos pegar do array de artigos (Ex: [0,1,2,3,4]).

        // console.log(slice);
        // console.log(Math.ceil(this.state.artigos.length/this.state.perPage));

        this.setState({
            pageCount: Math.ceil(this.state.artigos.length / this.state.perPage), //Quantidade de páginas. utilizando o Math.ceil (retorna o menor inteiro maior ou igual)
            tableData: slice //Pasando o "pedaço" do array pra tableData.
        });





    }

    handlePageClick = (e) => {

        const selectedPage = e.selected; //Pega a página que foi selecionada, iniciando com o 0.
        // console.log(selectedPage);
        const offset = selectedPage * this.state.perPage; //Atualizando o intervalo. 

        //atualizando os estados.
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData() //chamando a função para carregar mais dados.
        });
    };

    loadMoreData() {
        const slice = this.state.artigos.slice(this.state.offset, this.state.offset + this.state.perPage);
        console.log(slice)
        this.setState({
            pageCount: Math.ceil(this.state.artigos.length / this.state.perPage),
            tableData: slice
        });
    }

    render() {

        const { tableData } = this.state;

        return (


            <>
                <div className="cla-container-list">
                    {tableData.map(artigo => (

                        <div className="cla-article-card">
                            <img className="cla-article-image" alt='img01' src={MoriohImage} />
                            <h3>{artigo.titulo}</h3>
                            <small className='dataHour'> {artigo.createdAt.substring(8, 10) + '/' + artigo.createdAt.substring(5, 7) + '/' + artigo.createdAt.substring(0, 4) + ' - ' + artigo.createdAt.substring(11, 16)}</small><br />
                            <small>{artigo.descricao}</small>
                            <div>
                                <p className="cla-article-content"> {artigo.corpo}</p>
                            </div>

                            <div className="cla-actions-box">
                                <a href={'/artigos/' + artigo.slug}><button className='cla-btn cla-btn-success' type='submit'> Acessar </button></a>
                                <a href={'/artigos/' + artigo.slug}><button className="cla-btn cla-btn-warning"> Editar </button></a>
                                <ModalExcluir slug={artigo.slug} buttonLabel="Excluir" className="cla-btn cla-btn-danger" link="/artigo"></ModalExcluir>
                            </div>
                        </div>


                    ))}


                </div>
            </>

        )
    }
}