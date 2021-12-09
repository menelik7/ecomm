const express = require("express");
const ProductsRepo = require("../repositories/products");
const productIndexTemplate = require("../views/products/index");

const router = express.Router();

router.get("/", async (req, res) => {
	const products = await ProductsRepo.getAll();
	res.send(productIndexTemplate({ products }));
});

module.exports = router;
