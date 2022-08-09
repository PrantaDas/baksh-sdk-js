const fetch = require('./utils/fetch');

class BaseClass {
  sandbox = "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout";
  live = "https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout";

  constructor(username, password, appKey, appSecret, isDev) {
    this.username = username;
    this.password = password;
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.baseUrl = isDev ? this.sandbox : this.live;
  };

  /**
   * 
   * @param {*} username 
   * @param {*} password 
   * @param {*} appKey 
   * @param {*} appSecret 
   * @param {*} isDev 
   * @returns 
   */

  static async init(username, password, appKey, appSecret, isDev) {
    const o = new BaseClass(username, password, appKey, appSecret, isDev);
    await o.grantToken();

    return o;
  }

  /**
   * Grant token
   */

  async grantToken() {
    try {
      let url = this.baseUrl + '/token/grant';
      let headers = {
        'username': this.username,
        'password': this.password
      };
      let data = {
        app_key: this.appKey,
        app_secret: this.appSecret
      };
      let res = await fetch({
        method: "POST",
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.token = res?.id_token;
        this.tokenType = res?.token_type;
        this.refreshToken = res?.refresh_token;
      }
    } catch (e) {
      throw new Error(e.message);
    }
  }

  /**
   * Generating refresh token
   * @param {*} token 
   */

  async getRefreshToken(token) {

    try {
      let url = this.baseUrl + '/token/refresh';
      let headers = {
        'username': this.username,
        'password': this.password
      };
      let data = {
        app_key: this.appKey,
        app_secret: this.appSecret,
        refresh_token: token
      };


      let res = await fetch({
        method: "POST",
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.token = res?.id_token;
        this.tokenType = res?.token_type;
        this.refreshToken = res?.refresh_token;
      }
    } catch (e) {
      throw new Error(e.message);
    }

  };

  /**
   * Creating agreement
   * @returns 
   */

  async createAgreement() {
    try {
      let url = this.baseUrl + '/create';

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let data = {
        "mode": "0000",
        "callbackURL": "https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout",
        "payerReference": "01770618575",
        "amount": '500'
      };

      const res = await fetch({
        method: 'POST',
        url, headers, data
      });


      if (res?.statusCode === '0000') {
        this.statusMessage = res?.statusMessage;
        this.bkashURL = res?.bkashURL;
        this.successCallbackURL = res?.successCallbackURL;
        this.failureCallbackURL = res?.failureCallbackURL;
        this.cancelledCallbackURL = res?.cancelledCallbackURL;
        this.agreementStatus = res?.agreementStatus;
        this.paymentID = res?.paymentID;
        return this;
      }


    }
    catch (error) {
      throw new Error(error.message);
    }

  };

  /**
   * Executing agreement
   * @returns 
   */

  async executeAgreement() {
    try {
      let url = this.baseUrl + '/execute';

      let data = {
        'paymentID': this.paymentID
      };

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let res = await fetch({
        method: 'POST',
        headers, data, url
      })

      if (res?.statusCode === '0000') {
        this.agreementID = res?.agreementID;
        this.statusMessage = res?.statusMessage;

      }
      return res;
    }
    catch (error) {
      // throw new Error(error?.message);
      console.log(error.message)
    }
  };

  /**
   * Query agreement
   * @returns 
   */

  async queryAgreement() {
    try {
      let url = this.baseUrl + '/agreement/status';

      let data = {
        'agreementID': this.agreementID
      };

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let res = await fetch({
        method: 'POST',
        headers, data, url
      })

      if (res?.statusCode === '0000') {
        this.agreementID = res?.agreementID;
      }
      // console.log(this.trxID);
      return res;
    }
    catch (error) {
      // throw new Error(error?.message);
      console.log(error.message)
    }
  };

  /**
   * Cancelling agreement
   * @returns 
   */

  async cancelAgreement() {
    try {
      let url = this.baseUrl + '/agreement/cancel';

      let data = {
        'agreementID': 'TokenizedMerchant02V0SKRZX1660022171265'
      };

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let res = await fetch({
        method: 'POST',
        headers, data, url
      })

      if (res?.statusCode === '0000') {
        this.agreementStatus = res?.agreementStatus;
      }
      return res;
    }
    catch (error) {
      // throw new Error(error?.message);
      console.log(error.message)
    }
  };

  /**
   * Creating payment
   * @returns 
   */

  async createPayment() {
    try {
      let url = this.baseUrl + '/create';

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let data = {
        'agreementID': this.agreementID,
        "mode": "0001",
        "payerReference": "01770618575",
        "callbackURL": "http://localhost:5000/bkash",
        "merchantAssociationInfo": "MI05MID54RF09123456One",
        "amount": "7",
        "currency": "BDT",
        "intent": "sale",
        "merchantInvoiceNumber": "Inv0124"
      };

      let res = await fetch({
        method: "POST",
        url,
        headers, data
      });

      if (res?.statusCode === '0000') {
        this.paymentID = res?.paymentID;
      };

      return res;
    }
    catch (error) {
      throw new Error(error?.message);
      console.log(error.message);
    }
  };

  /**
   * Executing payment
   * @returns 
   */


  async executePayement() {
    try {
      let url = this.baseUrl + '/execute';

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let data = {
        'paymentID': this.paymentID,
      };

      let res = await fetch({
        method: 'POST',
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.agreementID = res?.agreementID;
        this.trxID = res?.trxID;
      };

      return res;

    }

    catch (error) {
      throw new Error(error.message);
      console.log(error.message);
    };
  };

  /**
   * Query payment
   */

  async queryPayment() {
    try {
      let url = this.baseUrl + '/payment/status';

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let data = {
        paymentId: this.paymentID,
      };



      let res = await fetch({
        method: 'POST',
        url, headers, data
      });

      if (res?.statusCode === '0000') {
        this.trxID = res?.trxID;
      };
      return res;
    }

    catch (error) {
      throw new Error(error.message);
      console.log(error.message);
    }
  };


  /**
   * Search transaction
   */

  async searchTransaction() {
    try {
      let url = this.baseUrl + '/general/searchTransaction';

      let headers = {
        'authorization': this.token,
        'x-app-key': this.appKey
      };

      let data = {
        'trxID': this.trxID,
      };

      let res = await fetch({
        method: 'POST',
        url, headers, data
      });
    }
    catch (error) {
      throw new error(error.message);
      console.log(error.message);
    }

  };

}

module.exports = BaseClass;