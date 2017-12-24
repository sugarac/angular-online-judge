import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://react-burger-builder-5d065.firebaseio.com/',

});

export default instance