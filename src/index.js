const BaseClass = require('./base');

class Bkash extends BaseClass {
  constructor(username, password, appKey, appSecret, isDev) {
    super(username, password, appKey, appSecret, isDev);
  }
}

module.exports = Bkash;