import React from 'react'
import Header from '../NavBar'
import './styles.css'
import logoClarim2 from '../../public/images/digitando2.jpg'


export default (props) =>
    <>
        <div className='container-fluid'>
            <Header path='/'></Header>
            <div className='contentExcluir'>
                <div className="divExcluirArtigo col-md-4">
                    <h1>O artigo foi excluído</h1>
                    <a href='/'>voltar para a página inicial</a>
                    <a href='/registroArtigo'>escreva um novo artigo</a>
                </div>
                <div className="col-md-4">
                    <img src={logoClarim2} className="img-fluid" alt="Logo Clarim"></img>
                </div>
            </div>
        </div>
    </>


