const path = require('path');
const express = require('express');

const customServer = require(path.resolve('./src/server/'));

const app = express();
app.use(express.urlencoded());
app.use(express.json());
customServer(app);

app.listen(3002, () => {
    // eslint-disable-next-line no-console
    console.log('Yay, local server started');
});
