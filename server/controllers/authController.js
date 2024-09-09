const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const generateToken = (req, res) => {
    const username = req.body.username;
    logger.info(`Generating token for user: ${username}`);

    if (!username) {
        return res.status(400).json({ message: 'Username is required' });
    }

    if (username) {
        const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Username is required' });
    }
};

module.exports = { generateToken };
