import React, { Component } from 'react'
import NavBar from '../../components/NavBar';
import EditarUsuario from '../../components/EditarUsuario'
export default class ListarArtigo extends Component {

    render() {

        return (
            <>
                <div>
                    <NavBar />
                </div>
                <div>
                    <EditarUsuario />
                </div>
            </>
        )
    }


}
