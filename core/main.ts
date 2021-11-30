
import { Server } from './application/server/server';
import { chargeRouter } from './application/charge/charge.router';

const server = new Server();

server.bootstrap([chargeRouter]).then(server => {
    console.log('Server is listening on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.error(error);
    process.exit(1);
});
