const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addProductReview, getProductReview } = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/',protect, addProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id',protect, updateProduct);
router.delete('/:id',protect, deleteProduct);
router.post('/:id/reviews', protect, addProductReview);
router.get('/:id/reviews', getProductReview);

module.exports = router;