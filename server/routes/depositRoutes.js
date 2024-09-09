const express = require('express');
const { trackDeposits, getDeposits, addDeposit } = require('../controllers/depositController');
const { authenticateToken } = require('../utils/authMiddleware');
const { generateToken } = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Eth2 deposit tracker API' });
});

router.get('/deposits', getDeposits);
router.post('/deposits', addDeposit);
router.post('/deposits/track', authenticateToken, trackDeposits);
router.get('/login', generateToken);

module.exports = router;
