import axios from 'axios';

//for our API server
export default axios.create({
    baseURL: 'http://localhost:3001'
});