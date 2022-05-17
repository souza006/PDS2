import React, { Component } from 'react'
import Header from '../NavBar/index'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bool: false
        }
    }

    logoff = () => {
        localStorage.removeItem('token');
        this.setState({ bool: true })
    }

    render() {
        console.log(this.state)
        if (!this.state.bool) {
            return (
                <>
                    <Header></Header>
                    <div>
                        <h1>Você deseja sair?</h1>
                        <button type='button' onClick={this.logoff}>Sim</button>
                    </div>

                </>
            )
        } else {
            return <Redirect to='/' />
        }
    }
}