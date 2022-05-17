import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api';
import { getJwt } from '../auth/jwt'

export default class ModalC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            artigo: []
        }
    }

    remove = (slug) => {
        slug = this.props.slug
        const jwt = getJwt();
        api.delete('/artigos/' + slug, { headers: { Authorization: `Token ${jwt}` } }).then(response => {
            console.log(response)
        })

    }

    toggle = () => {

        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <div id="modal">
                <button className={this.props.className} onClick={this.toggle} type='submit' slug={this.props.slug}>{this.props.buttonLabel}</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><i className="far fa-trash-alt"></i> Excluir Artigo</ModalHeader>
                    <ModalBody>
                        Você realmente deseja excluir este artigo?
                </ModalBody>
                    <ModalFooter>
                        <Link to={this.props.link}><Button color="outline-secondary" onClick={this.remove}>Excluir</Button></Link>
                        <Button color="outline-secondary" onClick={this.toggle}>Cancelar</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

