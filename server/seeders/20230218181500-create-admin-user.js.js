const bcrypt = require('bcrypt');
const { User } = require('../models');

const createAdminUser = async () => {
    const candidate = await User.findOne({ where: { login: 'admin' } });
    if (candidate) return;

    const password = await bcrypt.hash('Qwerty12345', 5);
    await User.create({ login: 'admin', password });
}

module.exports = createAdminUser;