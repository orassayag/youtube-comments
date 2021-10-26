import axios from 'axios';
import { logUtils } from '../../utils';

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

export default new AxiosService();