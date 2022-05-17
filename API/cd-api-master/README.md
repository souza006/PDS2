![ClarimAPI](signo-transparente.png)

![Badge](https://img.shields.io/static/v1?label=NodeJS&message=v12.18.1&color=blue&style=<STYLE>&logo=ghost) 
![Badge](https://img.shields.io/static/v1?label=Express&message=v4.16.1&color=blue&style=<STYLE>&logo=ghost)
![Badge](https://img.shields.io/static/v1?label=Mongoose&message=v5.10.8&color=blue&style=<STYLE>&logo=ghost>) 


# ClarimAPI
API Rest do projeto Clarim Diário


## Pré-Requisitos📃
   * Node Js
   * MongoDB

## Instalação💻
   
   * Primeiramente baixe o arquivo ou clone com o comando git clone
   
~~~
 git clone https://gitlab.devops.ifrn.edu.br/tads.cnat/pdscorporativo/2020.2/clarim-diario/cd-api.git
~~~

  * Em seguida entre no diretório da aplicação
  
  ~~~
    cd cd-api
  ~~~
   * Dentro da pasta instale as dependencias executando :
   
  ~~~
    npm install
  ~~~~
  
  * Dentro da pasta *cd-api* crie um aquivo '.env' e com o seguinte formato:
  ```bash
    #URI para o serviço de banco de dados
    MONGO_URI="mongodb://127.0.0.1:27017/my_database"
    #Porta que o serviço irá escutar
    PORT="8080"
  ```
  
  * Por último inicie o serviço com o comando :
  ~~~
   npm start
  ~~~

  O Serviço estará disponivel em http://127.0.0.1:8080

## Utilizando com Docker 🐳

Para executar o container com o docker execute o comando:
~~~
   docker-compose up
~~~

O Serviço estará disponivel em http://127.0.0.1:8080
