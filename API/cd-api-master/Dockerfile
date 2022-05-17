#Versao do node 
FROM node:14.15.4

#lugar aonde a aplicacao ira trabalhar
WORKDIR /usr/backend

#copia dos arquivos de dependencias para instalacao
COPY package*.json ./
RUN npm install

COPY . . 

#Settar variaveis de ambiente
RUN echo "MONGO_URI=mongodb+srv://clarim:diario@clarimdiario.pjpg7.mongodb.net/test \nPORT='8080'"> .env 
EXPOSE 8080
CMD ["npm","start"]


