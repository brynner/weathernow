import axios from "axios";
const config = require('../config/config.json');

export default class PlayerController {
    
    static getTemperatureFromCity(city) {
        return new Promise((resolve, reject) => {
            axios.get(`${config.weatherApi.url}appid=${config.weatherApi.appid}&q=${city}`)
        .then(result => resolve(result)).catch(result => reject(result));
        })
    }
}
