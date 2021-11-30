
import * as axios from 'axios';
import { config } from '../common/config';
import { Auth } from '../auth/auth';

export class Charge {
    
    auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }

    public async createCharge(dataCob : any): Promise<any> {
        const acessToken =  await this.auth.getToken().then(response=>response.access_token);
        const endpoint = `${config.url}/v2/cob`;

        const requestConfig = {
            httpsAgent: this.auth.agent,
            headers: {
                Authorization: `Bearer ${acessToken}`,
                "Content-Type": "application/json",
            }
        }

        dataCob.chave = config.key_pix;
        dataCob.devedor.cpf = config.fake_cpf;
        
        return axios.default.post(endpoint, dataCob, requestConfig)
                .then((response) => response.data)
                .catch((error) => error.response.data);
    }

    public async listCharge(): Promise<any> {
        const acessToken = await this.auth.getToken().then(response=>response.access_token);
        const endpoint = `${config.url}/v2/cob?inicio=2021-01-01T16:01:35Z&fim=2023-12-31T20:10:00Z`;

        const requestConfig = {
            httpsAgent: this.auth.agent,
            headers: {
                Authorization: `Bearer ${acessToken}`,
                "Content-Type": "application/json",
            }
        }
        return axios.default.get(endpoint, requestConfig)
                .then((response) => {
                    return response.data.cobs;
                })
                .catch((error) => {
                    console.log(error.response.data);
        });
    }

    public async getQRCode(id: string): Promise<any> {
        const acessToken = await this.auth.getToken().then(response=>response.access_token);
        const endpoint = `${config.url}/v2/loc/${id}/qrcode`;

        const requestConfig = {
            httpsAgent: this.auth.agent,
            headers: {
                Authorization: `Bearer ${acessToken}`,
                "Content-Type": "application/json",
            }
        }
        return axios.default.get(endpoint, requestConfig)
                .then((response) => response.data)
                .catch((error) => error);
    }
}
