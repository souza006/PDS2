![ClarimAPI](./signo-transparente.png)

![Badge](https://img.shields.io/static/v1?label=NodeJS&message=v12.18.1&color=blue&style=<STYLE>&logo=ghost) 
![Badge](https://img.shields.io/static/v1?label=ReactJS&message=v16.14.0&color=blue&style=<STYLE>&logo=ghost)



# Clarim Diário
Interface web da aplicação do projeto Clarim Diário


  
## Pré-Requisitos 📃
   * Node Js
   * MongoDB

## Instalação 💻
   
   * Primeiramente baixe o arquivo ou clone com o comando git clone
   
~~~
 git clone https://gitlab.devops.ifrn.edu.br/tads.cnat/pdscorporativo/2020.2/clarim-diario/cd-web.git
~~~

  * Em seguida entre no diretório da aplicação
  
  ~~~
    cd cd-web
  ~~~
   * Dentro da pasta instale as dependencias executando :
   
  ~~~
    npm install
  ~~~
  
 
  * Por ultimo inicie o serviço com o comando :
  ~~~
   npm start
  ~~~

  O serviço estará rodando em http://127.0.0.1:3000

## Utilizando com Docker 🐳
 
 Na pasta do projeto , rode o comando para gerar a imagem do projeto com 


  ~~~
    docker build -t clarimfront:latest .
  ~~~


  após gerar a imagem inicie o container com 
  ~~~
    docker run -p 3000:3000 -it clarimfront:latest
  ~~~


