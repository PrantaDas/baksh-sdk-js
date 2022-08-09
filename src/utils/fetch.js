const axios = require('axios');

const fetch = async ({method, url, headers, data}) => {
  try {
    let res = await axios({
      url,
      method,
      headers,
      data
    });

    return res?.data;
  } catch (e) {
    throw new Error(e?.message);
  }
};

module.exports = fetch;