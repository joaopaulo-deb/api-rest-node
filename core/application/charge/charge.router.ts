
import * as restify from "restify";
import { Auth } from "../auth/auth";
import { config } from "../common/config";
import { Router } from "../common/router";
import { Charge } from "./charge";

class ChargeRouter extends Router {
    applyRoutes(application: restify.Server): void {
        application.get('/cobrancas', async (request, response, next) => {           
            const auth = new Auth(config.certification_path,
                    { client_id: config.client_id, client_secret: config.client_secret });

            const charge = new Charge(auth);
    
            const listCharge = await charge.listCharge();
            response.json(listCharge);
            next();
        });

        application.post('/criar_cobranca', async (request, response, next) => {
            const dataCob = request.body;
            const auth = new Auth(config.certification_path,
                    { client_id: config.client_id, client_secret: config.client_secret });

            const charge = new Charge(auth);
            const cobranca = await charge.createCharge(dataCob);
            response.json(cobranca);
            next();
        });

        application.get('/cobrancas/:id', async (request, response, next) => {
            const idCharge = request.params.id;
            const auth = new Auth(config.certification_path,
                    { client_id: config.client_id, client_secret: config.client_secret });

            const charge = new Charge(auth);
            const qrcode = await charge.getQRCode(idCharge);

            response.json(qrcode);            
            next();
        });
    }
}

export const chargeRouter = new ChargeRouter();