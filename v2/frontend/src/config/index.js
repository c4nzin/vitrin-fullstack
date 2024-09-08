const { cleanEnv, port, str } = require('envalid');

const config = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  NODE_ENV: str({ choices: ['development', 'production'] }),
});

exports.module = { config };
