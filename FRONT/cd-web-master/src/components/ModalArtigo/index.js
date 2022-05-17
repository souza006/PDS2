import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalC extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            action: ''
        }
    }


    toggle = () => {

        this.setState({ modal: !this.state.modal });
    }

    render() {
        return (
            <div id="modal">
                <Button className={this.props.className} onClick={this.toggle} type='submit'>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}></ModalHeader>
                    <ModalBody>
                        <p style={{color:"black"}}>O seu {this.props.name} foi {this.props.action} com sucesso.</p>
                </ModalBody>
                    <ModalFooter>
                        <Link to={this.props.link}><Button color="outline-secondary" onClick={this.toggle}>Fechar</Button></Link>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

