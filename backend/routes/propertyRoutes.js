const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const {
  getAll,
  create,
  update,
  delete: del,
  markInterest,
  getPropertyById
} = require('../controllers/propertyController');

router.get('/', getAll);
router.post('/', verifyToken, upload.single('image'), create);
router.put('/:id', verifyToken, isAdmin, update);
router.delete('/:id', verifyToken, isAdmin, del);
router.post('/:id/interest', verifyToken, markInterest);
router.get('/:id', getPropertyById);

module.exports = router;
