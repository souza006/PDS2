import React, { Component } from 'react'
import api from '../../api'
import './styles.css'
import image from '../../public/images/PaginaInicial.jpg';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import axios from 'axios'
import parseHtml from 'html-react-parser'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button2 from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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

        axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
        const response = await api.get('/artigos');
        this.setState(this.state.artigos = response.data);

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
                {tableData.map(artigo => (
                    <div className='postArtigo' key={artigo.slug}>
                        <Card>
                            <CardActionArea>
                                <Link to={{
                                    pathname: "/artigos/" + artigo.slug
                                }}>
                                    <CardMedia
                                        component="img"
                                        alt="clarimdiario"
                                        image={artigo.imagem || image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {artigo.titulo}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {parseHtml(artigo.corpo.substring(0, 99))}...
                                    </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {artigo.createdAt.substring(8, 10) + '/' + artigo.createdAt.substring(5, 7) + '/' + artigo.createdAt.substring(0, 4) + ' - ' + artigo.createdAt.substring(11, 16)}
                                        </Typography>
                                        <Link to={{ pathname: "/perfil/" + artigo.autor.username }}>
                                            <Typography variant="caption text" component="h6">
                                                {artigo.autor.username}
                                            </Typography>
                                        </Link>
                                    </CardContent>
                                </Link>
                            </CardActionArea>
                            <CardActions>
                                <Link style={{ width: "100%" }} to={{ pathname: "/artigos/" + artigo.slug }}>
                                    <Button2 size="large" variant="outlined" color="primary" fullWidth={true}>
                                        Leia Mais
                                </Button2>
                                </Link>
                            </CardActions>
                        </Card>
                    </div>
                ))}

                <ReactPaginate
                    previousLabel={"Anterior"}
                    nextLabel={"Próxima"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </>
        )
    }
}