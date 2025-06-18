const express = require('express');
const router = express.Router();


// const {
//   submitGeneralInquiry,
//   getAllGeneralInquiries,
// } = require('../controllers/generalInquiryController');


const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const { getAllGeneralInquiries, submitGeneralInquiry } = require('../controllers/generalInquiryController');

router.post('/', submitGeneralInquiry);
router.get('/', verifyToken, isAdmin, getAllGeneralInquiries);

module.exports = router;
