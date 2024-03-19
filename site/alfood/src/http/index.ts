import axios from "axios";

const httpV2 = axios.create({
    baseURL : 'http://localhost:8000/api/v2/'
}) 

export default httpV2;