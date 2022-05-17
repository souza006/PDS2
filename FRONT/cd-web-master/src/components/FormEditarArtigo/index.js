import React from 'react';

import api from '../../api.js';
import { Container, Col, Row, Form, FormGroup, Input, Label } from 'reactstrap';
import Modal from '../ModalArtigo'
import { getJwt } from '../auth/jwt.js';
import 'react-tagsinput/react-tagsinput.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TagsInput from 'react-tagsinput'

class FormArtigoEditar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            descricao: '',
            corpo: '',
            nomeautor: '',
            slug: '',
            tags: [],
        }
    }

    async componentDidMount() {
        this.state.slug = window.location.href.split('/editarArtigo')[1];
        api.get(`artigos/${this.state.slug}`).then(
            res => {
                this.setState({
                    titulo: res.data.artigo.titulo,
                    descricao: res.data.artigo.descricao,
                    corpo: res.data.artigo.corpo,
                    nomeautor: res.data.artigo.autor.username,
                    tags: res.data.artigo.listaTags

                });
            }

        )
    }

    changeHandler = (e) => {
        console.log('changing')
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()
        const artigo = {
            artigo: {
                titulo: this.state.titulo,
                descricao: this.state.descricao,
                corpo: this.state.corpo,
                listaTags: this.state.tags
            },
            autor: this.state.nomeautor
        }
        const jwt = getJwt();
        console.log(this.state.slug)
        api.put(`artigos/${this.state.slug}`, artigo, { headers: { Authorization: `Token ${jwt}` } })
            .then(response => {
                console.log(response)
            })
    }

    handleChangeTags = (tags) => {
        this.setState({ tags })
    }
    render() {
        const tituloPost = this.state.titulo;
        const descricaoPost = this.state.descricao;
        const corpoPost = this.state.corpo;
        const nomeautorPost = this.state.nomeautor;
        return (
            <Container fluid='xl' id="areaForm">

                <Row className='titleEditar'>
                    <h4 className='title2Editar'> Editar Artigo </h4>
                </Row>

                <Form className='pl-5 pr-5' id='formArticle' onSubmit={this.submitHandler}>

                    <FormGroup className='mb-4' row>
                        <Label className='label'> Autor: </Label>
                        <Input className='form-control' type="text" name="nomeautor" placeholder="Id do autor" value={nomeautorPost} onChange={this.changeHandler} disabled />
                    </FormGroup>

                    <FormGroup className='mb-4' row>
                        <Label className='label'> Título: </Label>
                        <Input className='form-control' type="text" name="titulo" value={tituloPost} placeholder="Título do post" onChange={this.changeHandler} />
                    </FormGroup>

                    <FormGroup className='mb-4' row>
                        <Label className='label'> Descrição: </Label>
                        <Input className='form-control' type="text" name="descricao" value={descricaoPost} placeholder="Subtitulo" onChange={this.changeHandler} />
                    </FormGroup>


                    <FormGroup className='mb-4' row>
                        <Label className='label' > Tags:</Label>
                    </FormGroup>

                    <FormGroup className='mb-4' row>
                        <div >
                            <TagsInput value={this.state.tags} addKeys={[32, 9]} maxTags={5} onChange={this.handleChangeTags} />
                        </div>
                    </FormGroup>


                    <FormGroup className='mb-4' row>
                        <Label className='label'> Corpo: </Label>
                        <Input className='' id='corpo' hidden rows={10} type="textarea" name="corpo" value={corpoPost} placeholder="Corpo do post" onChange={this.changeHandler} />
                    </FormGroup>
                    <FormGroup>
                        <CKEditor
                            editor={ClassicEditor}
                            data={corpoPost}
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
                            {/* <Button color="success" className='col-4' type='submit'> Editar </Button>   */}
                            <Modal action='atualizado' className='botaoEditar' name="artigo" buttonLabel='Editar' link='/'></Modal>
                        </Col>
                    </Row>

                </Form>
            </Container>

        );
    }

}

export default FormArtigoEditar;
