
import * as https from 'https';
import * as axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { config } from '../common/config';

export class Auth {
    certificatePath: string;
    credencials: string;

    agent!: https.Agent;

    constructor(certificatePath: string, credencials: any) {
        this.certificatePath = certificatePath;
        this.credencials = `${credencials.client_id}:${credencials.client_secret}`;
    }

    private createRequest(): any {
        const certification: Buffer = fs.readFileSync(path.resolve(__dirname, this.certificatePath));
        this.agent = new https.Agent({
            pfx: certification,
            passphrase: ""
        });

        const credencialsBase64 = Buffer.from(this.credencials).toString("base64");
        const request: axios.AxiosRequestConfig = {
            method: "POST",
            url: `${config.url}/oauth/token`,
            headers: {
                Authorization: `Basic ${credencialsBase64}`,
                "Content-Type": "application/json",
            },
            httpsAgent: this.agent,
            data: JSON.stringify({ grant_type: "client_credentials" }),
        };

        return request;
    }

    public getToken(): Promise<any> {
        const request = this.createRequest();
        const response = axios.default.request<any>(request)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
        return response;
    }
}
