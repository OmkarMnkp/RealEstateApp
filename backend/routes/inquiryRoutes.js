const express = require('express');
const router = express.Router();
const { submitInquiry, getAllInquiries } = require('../controllers/inquiryController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/', submitInquiry);
router.get('/', verifyToken, isAdmin, getAllInquiries);

module.exports = router;

