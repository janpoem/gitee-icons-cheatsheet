const { resolve } = require('path');
const os = require('os');
const fastify = require('fastify');

const publicDir = resolve(__dirname, 'public');

const filterAddress = ({ family, address, internal }) =>
  family === 'IPv4' && address !== '127.0.0.1' && !internal;

const getLANAddresses = () => {
  const interfaces = os.networkInterfaces();
  const addresses = [];
  Object.keys(interfaces).forEach(face => {
    const res = interfaces[face]?.filter(filterAddress);
    res.length > 0 && addresses.push(...res);
  });
  return addresses;
};

const server = (options = {}) => {
  const server = fastify({
    ...options,
  });
  const prefixAvoidTrailingSlash = true;
  // static 插件的 list 有问题
  server.register(require('fastify-static'), {
    root  : publicDir,
    prefix: '/',
    prefixAvoidTrailingSlash,
  });

  return server;
};

const start = () => {
  const port = 9673;
  server().listen(port, '0.0.0.0', (err, address) => {
    if (err) {
      console.error(`fastify start error: ${err.message}\n`);
      console.error(err.stack);
      process.exit();
    } else {
      let othersIP = getLANAddresses().map(({ address: addr }) => `http://${addr}:${port}/`).join(', ');
      othersIP.length > 0 && (othersIP = ` (others: ${othersIP} )`);
      console.info(`fastify start at ${address}${othersIP}\n`);
    }
  });
};

start();
