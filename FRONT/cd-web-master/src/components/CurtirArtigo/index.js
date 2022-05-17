import React from 'react';
import api from '../../api';
import { getJwt } from '../auth/jwt';


 export default class Curtir extends React.Component {

    
    addCurtida = async (slug) => {
        slug = this.props.slug
        const jwt = getJwt();
        const response = await api.post('/artigos/' + slug + '/curtir/', {}, { headers: { Authorization: `Token ${jwt}` } })
        console.log(response.data);
    }
    DesfazerCurtida = (slug) =>{
        slug = this.props.slug
        const jwt = getJwt();
        const response = api.delete(`/artigos/`+slug+`/curtir`,{headers: { Authorization: `Token ${jwt}` }})
        console.log(response)
    }
        render(){
        return(
            <div>
            <button onClick={this.addCurtida} class ="btn btn-primary" alt="Curtir" type="submit"><i class="fas fa-thumbs-up"></i></button>
            <button onClick={this.DesfazerCurtida} class ="btn btn-danger" alt="Descurtir" type="button"><i class="fas fa-thumbs-down"></i></button>
            </div>
        )
    }

}