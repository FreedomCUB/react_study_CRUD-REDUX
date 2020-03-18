import axios from "axios";

const clientAxios = axios.create({
    baseURL: 'https://myjson-server-heroku.herokuapp.com/'
})

export default clientAxios;