const express = require('express');
require('dotenv').config();
const sequelize_db = require('./db');
const Models = require('./models');

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
    try {
        await sequelize_db.authenticate();
        await sequelize_db.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.error(e);
    }
}
start();