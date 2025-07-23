const {log} = require('console');
const express = require('express')
const crypto = require(`crypto`);
require('dotenv').config();
const app1Host = process.env.APP1_HOST;
const router = express.Router();
const port = 8010;
const serviceId = crypto.randomBytes(5).toString("hex");
const app = express();

router.get('/', (req, res) => {
    res.statusCode = 200;
    res.header("Content-Type", "application/json");
    res.json({result: "hello", serviceId});
})

router.get('/getRes', express.json(), async (req, res) => {
    if (!app1Host) {
        res.statusCode = 500;
        res.send("APP1_HOST - variable was not set");
        return;
    }
    try {
        const results = await (await fetch(`${app1Host}/getResults`)).json();
        res.send({results, serviceId});
    } catch (e) {
        console.error(e)
        res.statusCode = 500;
        res.send("Internal error");
    }
});

app.use("/app2", router);

app.listen(port, () => {
    log(`server starts at port ${port}`, `id is - ${serviceId}`);
    console.log("app1Host is :"+ app1Host);
})
