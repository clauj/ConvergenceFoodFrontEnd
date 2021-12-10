import axios from 'axios';
// baseURL: 'http://convergencefood.guilhermepellegrini.com.br/api/'

const api = axios.create({
    baseURL: 'https://convergencefood.guilhermepellegrini.com.br/api/',
})

export default api;