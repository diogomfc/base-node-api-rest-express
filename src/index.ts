import {server} from './server/Server';

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT || 3333,
}, () => {
  console.log('🚀 Server ready!');
});
