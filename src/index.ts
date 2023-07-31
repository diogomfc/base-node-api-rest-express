import {server} from './server/server';

server.listen({
  host: '0.0.0.0',
  port: 3333
}, () => {
  console.log('🚀 Server ready!');
});
