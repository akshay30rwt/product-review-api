const Product = require('../models/Product');
const Review = require('../models/Review');

const addProduct = async (req, res) => {
    try {
        const { name, description, category, price } = req.body;

        const product = new Product({ name, description, category, price });
        await product.save();

        return res.status(201).json({
            message: 'Product added successfully',
            product
        });
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if(products.length === 0) {
            return res.status(404).json({
                message: 'There are no products'
            });
        }

        return res.status(200).json(products);
    }
    catch(error) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);

        if(!product) {
            return res.status(404).json({
                message: `There is no product with ID: ${id}`
            });
        }

        return res.status(200).json(product);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, category, price } = req.body;

        const product = await Product.findByIdAndUpdate(
            id, 
            { name, description, category, price }, 
            { new: true, runValidators: true }
        );

        if(!product) {
            return res.status(404).json({
                message: `There is no product with ID: ${id}`
            });
        }
        return res.status(200).json({
            message: 'Product updated successfully',
            product
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product) {
            return res.status(404).json({
                message: `There is no product with ID: ${id}`
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            product
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const addProductReview = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);
        if(!product) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const { content, rating } = req.body;
        const review = new Review({ content, rating, product: id, reviewedBy: req.user.userId });
        await review.save();

        return res.status(201).json({
            message: 'Review added successfully',
            review
        });
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

const getProductReview = async(req, res) => {
    try {
        const { id } = req.params;
        const reviews = await Review.find({ product: id }).populate('product').populate('reviewedBy', 'name email');

        if(reviews.length == 0) {
            return res.status(404).json({
                message: `There are no reviews for product: ${id}`
            });
        }
        
        return res.status(200).json(reviews);
    }
    catch(error) {
        if(error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid ID'
            });
        }
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
}

module.exports = { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct, addProductReview, getProductReview };