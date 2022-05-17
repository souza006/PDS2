import React, { useState, useEffect } from 'react'
import api from '../../api'
import { getJwt } from '../auth/jwt'
import { Link } from 'react-router-dom'
import Header from '../NavBar/index'
import './style.css';
import { browserHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DefaultImage from '../../public/images/PaginaInicial.jpg'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});
export default function Diario(props) {

  const classes = useStyles();
  const [usuario, setUsuario] = useState()
  const [artigos, setArtigos] = useState([])

  useEffect(() => {

    async function salvarDiario() {
      let res = {}
      let user = {}
      const jwt = getJwt();

      res = await api.get("/usuario", { headers: { Authorization: `Token ${jwt}` } }).then(user => {
        setUsuario(user.data.username);
        setArtigos(user.data.artigosFavoritados)
      })
    }
    salvarDiario();
  })

  let remove = async function (slug) {
    let jwt = getJwt();
    console.log(`removendo :}`)
    await api.delete(`artigos/${slug}/favoritar`, { headers: { Authorization: `Token ${jwt}` } })
    props.history.push('/diario')
  }
  return (
    <div className="App">
      <Header></Header>
      <div className="container">
        <h2>Meu Diário <LibraryBooksIcon /></h2>
        <div className="diary-container">


          {artigos.map((artigo =>
            <Card className={classes.root}>
              <Link to={{ pathname: `/artigos/${artigo.slug}` }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={artigo.descricao}
                    height="140"
                    image={DefaultImage}
                    title={artigo.titulo}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {artigo.titulo}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      {artigo.corpo.substring(0, 150)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Link to={{ pathname: `/artigos/${artigo.slug}` }}><Button size="small" color="primary">Acessar<ArrowForwardIcon /></Button></Link>
                <Button size="small" color="primary" onClick={() => { remove(artigo.slug) }}><DeleteForeverIcon />Remover</Button>
              </CardActions>
            </Card>
          ))}
        </div>
      </div>
    </div>

  )
}



