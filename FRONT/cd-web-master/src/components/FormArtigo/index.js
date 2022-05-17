import React, { Component } from 'react';
import api from '../../api.js';
import { Container, Col, Row, Form, FormGroup, Input, Label } from 'reactstrap';
import Modal from '../ModalArtigo'
import { getJwt } from '../auth/jwt.js';
import 'react-tagsinput/react-tagsinput.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TagsInput from 'react-tagsinput'


class FormArtigo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            descricao: '',
            corpo: '',
            nomeautor: '',
            tags: [],
        }
    }
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    /*submitHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        const artigo = {
            artigo: {
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                corpo: this.state.corpo
            },
            autor: this.state.nomeautor
        }*/

    submitHandler = e => {
        e.preventDefault()
        // console.log(this.state)
        const artigo = {
            artigo: {
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                corpo: this.state.corpo,
                listaTags: this.state.tags
            },
            autor: this.state.nomeautor
        }
        console.log(artigo)
        const jwt = getJwt();
        api.post('/artigos', artigo, { headers: { Authorization: `Token ${jwt}` } })
            .then(response => {
                console.log(response)
            })
    }

    handleChangeTags = (tags) => {

        this.setState({ tags })
    }
    render() {
        const { tituloPost, descricaoPost, corpoPost, nomeAutor } = this.state
        return (
            <Container fluid='xl' id="areaForm">
                <Row className='titleEditar'>
                    <h5 className='title2Editar mt-2 ml-5'> Escrever Artigo </h5>
                </Row>
                <Form className='pl-5 pr-5' id='formArticle' onSubmit={this.submitHandler}>

                    <FormGroup className='mb-4' row>
                        <Label className='label'> Título: </Label>
                        <Input className='form-control' type="text" name="titulo" placeholder="Título do post" value={tituloPost} onChange={this.changeHandler} />
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                        <Label className='label'> Descrição: </Label>
                        <Input className='form-control' type="text" name="descricao" placeholder="Subtitulo" value={descricaoPost} onChange={this.changeHandler} />
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                        <Label className='label' > Tags:</Label>
                    </FormGroup>
                    <FormGroup className='mb-4' row>
                        <div >
                            <TagsInput
                                value={this.state.tags}
                                addKeys={[32, 9]}
                                maxTags={5}
                                onChange={this.handleChangeTags}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup className='mb-4' row>
                        <Label className='label'> Corpo: </Label>
                        <Input className='hidden' hidden id="corpo" type="textarea" name="corpo" placeholder="Corpo do post" value={corpoPost} rows={10} onChange={this.changeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <CKEditor
                            editor={ClassicEditor}
                            data=""
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                document.getElementById('corpo').value = data
                                this.setState({ corpo: data })
                                console.log({ event, editor, data });
                            }}
                            onBlur={(event, editor) => {
                                console.log('Blur.', editor);
                            }}
                            onFocus={(event, editor) => {
                                console.log('Focus.', editor);
                            }}
                        />
                    </FormGroup>

                    {/* <div className='mb-4'> 
                                <Ckeditor/>
                            </div>  */}

                    {/* <FormGroup className='mb-4' row>
                                <Input type="text" name="tagsPost" placeholder="Tags do post (#design #javascript)" value=''/>
                            </FormGroup> } */}

                    <Row className='mt-5'>
                        <Col>
                            {/* <Button color="success" className='col-4' type='submit'> Publicar </Button>   */}
                            <Modal action='cadastrado' name="artigo" buttonLabel='Cadastrar' className="botaoRegistrar col-4" link='/'></Modal>
                        </Col>
                    </Row>

                </Form>
            </Container>

        );
    }

}

export default FormArtigo;
