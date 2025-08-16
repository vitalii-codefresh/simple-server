const { log } = require('console');
const express = require('express');
const crypto = require(`crypto`);
const { appendFile, readFile } = require("fs/promises");
const { readdirSync } = require("fs");
const { resolve } = require("path");
require('dotenv').config();

const router = express.Router();
const port = process.env.PORT || 8000;
const serviceId = crypto.randomBytes(5).toString("hex");
const resultFile = "./data/results.csv";

const app = express();


router.get('/', (req, res) => {
    res.statusCode = 200;
    res.header("Content-Type", "application/json");
    res.json({ result: "hello", serviceId });
});

router.get('/add', express.json(), async (req, res) => {
    const body = req.body;
    if (!body || typeof body.firstValue === 'undefined' || typeof body.secondValue === 'undefined') {
        res.statusCode = 400;
        res.send("body is required");
        return;
    }
    const firstValue = body.firstValue;
    const secondValue = body.secondValue;
    const result = firstValue + secondValue;
    await writeResult(result, serviceId);
    res.send({ result, serviceId });
});

router.get('/getResults', async (req, res) => {
    try {
        const results = await readResults();
        res.json({ results, serviceId });
    } catch (e) {
        res.statusCode = 500;
        res.send("internal error");
    }
});

router.get('/getDir', async (req, res) => {
    try {
        const myPath = resolve();
        const files = readdirSync("./");
        const dataContent = readdirSync("./data");
        res.json({ files, dataContent, myPath, serviceId });
    } catch (e) {
        res.statusCode = 500;
        res.send("internal error");
    }
});

app.use("/app1", router);

module.exports = { app };

if (require.main === module) {
    app.listen(port, () => {
        log(`server starts at port ${port}`, `id is - ${serviceId}`);
    });
}


async function writeResult(result, serviceId) {
    await appendFile(resultFile, `${result};SERVICE_ID-${serviceId};` + "\n");
}

async function readResults() {
    return readFile(resultFile, { encoding: "utf-8" });
}