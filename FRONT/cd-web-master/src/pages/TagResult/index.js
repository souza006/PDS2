import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/NavBar'
import TagsResult from '../../components/TagsResult'
import api from '../../api'
import './style.css'
import parseHtml from 'html-react-parser'


function TagResult(props) {
    const [tag,setTag]= useState()
    const [artigos,setArtigos]= useState([])

    useEffect(()=>{
       

        async function loadArticlesPerTags(){
            const url = props.location.pathname
            setTag(url.slice(5))
            const data = await api.get('artigos/busca/tag?tag='+url.slice(5))  
            console.log(data.data.artigos) 

            if(data.data.artigos!==undefined){
                setArtigos(data.data.artigos)
            }
           

    }
    loadArticlesPerTags()
                 
    },[])

        const url = props.location.pathname;
    return (
        
        <div>
            <Navbar path="/"></Navbar>
            <div className="result-container"> 
                <div>
                    
                    <h1>Buscando por {url.slice(5)}</h1>
                    <div className="custom-card-result-container">{artigos.map(artigo =>
                        <div className="custom-card-result">
                        <Link to={{
                            pathname: "/artigos/" + artigo.slug
                        }}><h2 style={{color: "#6495ED"}}>{artigo.titulo}</h2></Link>
                        <small>{artigo.autor.username.toUpperCase()}</small>
                        <p>{parseHtml(artigo.corpo.substring(0,150))}</p>
                        <Link to={{
                            pathname: "/artigos/" + artigo.slug
                        }}><p>Continue lendo...</p></Link>
                        {console.log("/artigos/"+artigo.slug)}
                        </div>
                        
                    )}
                   </div>

                </div>
            </div>
        </div>
    )

}

export default TagResult;
