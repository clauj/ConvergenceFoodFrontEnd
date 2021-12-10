import axios from 'axios';

const api = axios.create({
    baseURL: 'http://convergencefood.guilhermepellegrini.com.br/api/',
})

export default api;