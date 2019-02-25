var env = process.env.NODE_ENV || 'development';
if (env === 'development' || env === 'test') {
  const config = require('./config.json');
  const envConfig = config[env];

  Object.keys(envConfig).forEach(key => {
    process.env[key] = envConfig[key];
  });
  process.env.PORT = envConfig.PORT;
  process.env.DB = envConfig.DB;
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.DB = 'mongodb://localhost:27017/TodoApp';
// } else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.DB = 'mongodb://localhost:27017/TodoAppTest';
// }
