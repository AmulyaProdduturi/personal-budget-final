const fs = require('fs');
const {resolve, join} = require('path');
const MongodbMemoryServer = require('mongodb-memory-server');
const cwd = process.cwd();

const debug = require('debug')('jest-mongodb:setup');
const mongod = new MongodbMemoryServer.default(getMongodbMemoryOptions());

const globalConfigPath = join(cwd, 'globalConfig.json');

module.exports = async () => {
  if (!mongod.isRunning) {
    await mongod.start();
  }

  const options = getMongodbMemoryOptions();

  const mongoConfig = {
    mongoUri: await mongod.getConnectionString(),
    mongoDBName: options.instance.dbName
  };

  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  debug('Config is written');

  global.__MONGOD__ = mongod;
  process.env.MONGO_URL = mongoConfig.mongoUri;
};