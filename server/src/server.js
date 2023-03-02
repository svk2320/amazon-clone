const http = require('http');
const { mongoConnect } = require('./mongo')
const app = require('./app');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
    });
};

startServer();