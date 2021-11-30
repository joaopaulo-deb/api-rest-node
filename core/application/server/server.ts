
import * as restify from 'restify';
import { Router } from '../common/router';
import { environment } from '../common/environment';

export class Server {
    
    application! : restify.Server;

    createServer(): Promise<any> {
        return new Promise((resolve, reject)=>{
            try{

                this.application = restify.createServer({
                    name: 'charge-api',
                    version: '1.0.0'
                });
                
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());

                this.application.listen(environment.server.port, ()=> {
                    resolve(this.application);
                });

            } catch(error) {
                reject();
            }
        });
    }

    loadRoutes(routers: Router[]): void {
        for (let router of routers){
            router.applyRoutes(this.application);
        }
    }

    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.createServer()
                .then(()=>this.loadRoutes(routers))
                .then(()=>this);
    }
}