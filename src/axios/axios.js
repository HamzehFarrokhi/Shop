import axios from "axios";
//import apikey from "./apiKey";

const instance = axios.create({
    baseURL: "https://armateam.ir/rest/api",
    // headers: {
    //     'apikey': apikey
    // }
})

export default instance