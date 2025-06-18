
const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { getOverview } = require('../controllers/adminController');

router.get('/overview', verifyToken, isAdmin, getOverview);

module.exports = router;
