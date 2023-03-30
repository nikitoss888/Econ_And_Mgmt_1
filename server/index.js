const express = require('express');
require('dotenv').config();
const sequelize_db = require('./db');
const { createAdmin } = require('./models');

const PORT = process.env.PORT || 5000;
const cors = require('cors');
const routes = require('./routes');
const ErrorHandling = require('./middleware/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use(ErrorHandling);

const start = async () => {
    console.log('Starting server');

    let maxRetries = parseInt(process.env.DB_CONNECTION_RETRIES);
    let delay = parseInt(process.env.DB_CONNECTION_RETRIES_DELAY);
    let connected = false;

    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log('Connecting to database...');
            await sequelize_db.authenticate()
                .then(() => console.log('\x1b[32mDatabase connected'));

            connected = true;
            break;
        } catch (e) {
            console.log(`Retrying connection to database... ${i + 1}/${maxRetries}`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }

    if (!connected) {
        console.error('\x1b[31mError: Could not connect to database');
        return;
    }

    try {
        console.log('Synchronizing database...');
        await sequelize_db.sync()
            .then(() => console.log('\x1b[32mDatabase synchronized'));

        createAdmin();
        app.listen(PORT, () => console.log(`\x1b[32mServer started on port ${PORT}`));
    } catch (e) {
        console.error('\x1b[31mError: ', e);
    }
}
start();