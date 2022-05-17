import axios from 'axios'

const api = axios.create({
    //baseURL: 'http://localhost:8080/api/',
    baseURL: 'https://clarimdiarioapi.devops.ifrn.edu.br/api/',
    Headers: {
        'Content-Type': 'application/json',
    }
}

)

export default api;
