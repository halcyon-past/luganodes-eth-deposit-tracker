const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
    const username = req.body.username;

    if (username) {
        const token = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Username is required' });
    }
};

module.exports = { generateToken };
