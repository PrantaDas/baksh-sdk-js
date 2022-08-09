const BaseClass = require("../src/base");
const Bkash = require("../src/index");

let username = "sandboxTokenizedUser02";
let password = "sandboxTokenizedUser02@12345";
let appKey = "4f6o0cjiki2rfm34kfdadl1eqq";
let appSecret = "2is7hdktrekvrbljjh44ll3d9l1dtjo4pasmjvs5vl5qr3fug4b";

(async () => {
  // const obj = new Bkash(username, password, appKey, appSecret, true);
  const obj = await Bkash.init(username, password, appKey, appSecret, true);

  // console.log(obj)

  /**
   * Initiating authorzation token/ refresh token
   */

  // setTimeout(async () => {
  //   await obj.getRefreshToken(
  //     obj.refreshToken
  //   );
  //   console.log(obj.refreshToken);
  // }, 40000);

  /**
   * Creating Agreement
   */


  const payment = await obj.createAgreement();
  console.log(payment);

  /**
   * Excuting Agreement
   */

  setTimeout(async () => {
    const execute = await obj.executeAgreement();
    console.log(execute);
  }, 60000);

  /**
   * Query Agreement
   */

  setTimeout(async () => {
    const status = await obj.queryAgreement();
    console.log(status);

  }, 70000);

  /**
   * Cancel Agreement
   */

  // const cancel = await obj.cancelAgreement();
  // console.log(cancel); 

  /**
   * Create Payment
   */

  setTimeout(async () => {
    const createPayment = await obj.createPayment();
    console.log(createPayment);
  }, 80000);

  /**
   * Execute Payment
   */

  setTimeout(async () => {
    const execute = await obj.executePayement();
    console.log(execute);
  }, 140000);

  /**
   * Query payment
   */

  setTimeout(async () => {
    const queryPayment = await obj.queryPayment();
    console.log(queryPayment);
  },160000);


  /**
   * Search transaction
   */

  setTimeout(async () => {
    const searachTransaction = await obj.searchTransaction();
    console.log(searachTransaction);
  },180000);


})(); 
