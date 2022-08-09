const express = require('express');
const app = express();

app.use(express.json());

app.get('/bkash', async (req, res) => {
    const request = req.body;
    res.status(200).send('Payment Successful!');
    console.log(request);
});


app.listen(5000, () => {
    console.log(`Starting Server`);
})