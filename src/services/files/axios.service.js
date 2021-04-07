const axios = require('axios');
const { logUtils } = require('../../utils');

class AxiosService {

    constructor() {
        this.serverAPI = axios.create({
            headers: { 'content-type': 'application/json' }
        });
    }

    async getRequest(url) {
        let response = null;
        try {
            response = await this.serverAPI.get(url);
        } catch (error) {
            logUtils.log(error);
        }
        return response;
    }
}

module.exports = new AxiosService();