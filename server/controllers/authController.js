const jwt = require('jsonwebtoken');

const generateToken = (req, res) => {
    console.log('Generating token...');
    const username = req.body.username;
    console.log('Username:', username);

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
