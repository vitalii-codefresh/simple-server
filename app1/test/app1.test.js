const request = require('supertest');
const { app } = require('../index');

jest.mock('fs/promises', () => ({
    appendFile: jest.fn(() => Promise.resolve()),
    readFile: jest.fn(() => Promise.resolve('10;SERVICE_ID-abcde;\n20;SERVICE_ID-fghij;\n')),
}));

jest.mock('fs', () => ({
    readdirSync: jest.fn((path) => {
        if (path === './') return ['app.js', 'package.json', 'data'];
        if (path === './data') return ['results.csv'];
        return [];
    }),
}));

describe('Express App Tests', () => {
    let server;

    beforeAll((done) => {
        server = app.listen(0, done);
    });
    afterAll((done) =>{
        server.close(done);
    });

    test('GET /app1/ should return hello and serviceId', async () => {
        const res = await request(server).get('/app1/');
        expect(res.statusCode).toEqual(200);
        expect(res.headers['content-type']).toMatch(/application\/json/);
        expect(res.body.result).toEqual('hello');
        expect(res.body).toHaveProperty('serviceId');
    });

    test('GET /app1/add with valid body should return sum and serviceId', async () => {
        const res = await request(server)
            .get('/app1/add')
            .send({ firstValue: 5, secondValue: 3 })
            .set('Content-Type', 'application/json');

        expect(res.statusCode).toEqual(200);
        expect(res.body.result).toEqual(8);
        expect(res.body).toHaveProperty('serviceId');
        expect(require('fs/promises').appendFile).toHaveBeenCalledWith(
            './data/results.csv',
            expect.stringContaining('8;SERVICE_ID-'),
        );
    });

    test('GET /app1/add without body should return 400', async () => {
        const res = await request(server).get('/app1/add'); // Без .send()
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('body is required');
    });

    test('GET /app1/add with missing firstValue should return 400', async () => {
        const res = await request(server)
            .get('/app1/add')
            .send({ secondValue: 3 })
            .set('Content-Type', 'application/json');
        expect(res.statusCode).toEqual(400);
        expect(res.text).toEqual('body is required');
    });

    test('GET /app1/getResults should return results from file', async () => {
        const res = await request(server).get('/app1/getResults');
        expect(res.statusCode).toEqual(200);
        expect(res.body.results).toEqual('10;SERVICE_ID-abcde;\n20;SERVICE_ID-fghij;\n');
        expect(res.body).toHaveProperty('serviceId');
        // Перевіряємо, що readFile був викликаний
        expect(require('fs/promises').readFile).toHaveBeenCalledWith(
            './data/results.csv',
            { encoding: 'utf-8' }
        );
    });

    test('GET /app1/getDir should return directory contents and path', async () => {
        const res = await request(server).get('/app1/getDir');
        expect(res.statusCode).toEqual(200);
        expect(res.body.files).toEqual(['app.js', 'package.json', 'data']);
        expect(res.body.dataContent).toEqual(['results.csv']);
        expect(res.body).toHaveProperty('myPath');
        expect(res.body).toHaveProperty('serviceId');
    });
});