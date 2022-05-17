import React, { Component } from 'react'
import api from '../api';
import { getJwt } from './auth/jwt'
import { withRouter } from 'react-router-dom'

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }
    componentDidMount() {
        const jwt = getJwt();
        if (!jwt) {
            this.props.history.push('/login')
        }
        api.get('/usuario', { headers: { Authorization: `Token ${jwt}` } }).then(response => {
                this.setState({ user: 'Logado' })
                console.log(this.state)
        }).catch(err => {
            localStorage.removeItem('token');
            this.props.history.push('/login')
        });

    }

    render() {
        if (this.state === undefined) {
            return (

                <div>
                    <p>Loading...</p>
                </div>
            )
        }
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(PrivateRoute)