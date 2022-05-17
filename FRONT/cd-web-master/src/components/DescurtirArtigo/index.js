import React from 'react';
import api from '../../api';
import { getJwt } from '../auth/jwt';

export default class Descurtir extends React.Component {

    DesfazerCurtida = (slug) =>{
        slug = this.props.slug
        const jwt = getJwt();
        const response = api.delete(`/artigos/`+slug+`/curtir`,{} , {headers: { Authorization: `Token ${jwt}` }})
        console.log(response)
    }
    render(){
        return(
            <button onClick={this.DesfazerCurtida} class ="btn btn-danger" alt="Descurtir" type="button"><i class="fas fa-thumbs-down"></i></button>
        )
    }

}