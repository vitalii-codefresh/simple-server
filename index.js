const {log} = require('console');
const express = require('express')
const crypto = require(`crypto`);
require('dotenv').config();

const port = process.env.PORT || 8000;
const serviceId = crypto.randomBytes(5).toString("hex");

const app = express();
app.get('/', (req, res) => {
    res.end({result: "hello", serviceId})
})
app.get('/add', express.json(), (req, res) => {
    const body = req.body;
    if (!body || !body.firstValue || !body.secondValue) {
        res.statusCode = 400;
        res.end("body is required");
        return;
    }
    const firstValue = body.firstValue;
    const secondValue = body.secondValue;
    res.send({result: firstValue + secondValue, serviceId});
})

app.listen(port, () => {
    log(`server starts at port ${port}`, `id is - ${serviceId}`);
})
