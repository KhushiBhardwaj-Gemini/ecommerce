const Product = require("../models/Product");

const createProduct = (data) => Product.create(data);

const getAllProducts = async ({
  search,
  category,
  sort,
  page = 1,
  limit = 15,
}) => {
  let query = {};

  // SEARCH
  if (search) {
    query.title = { $regex: search, $options: "i" };
  }

  //CATEGORY
  if (category) {
    query.category = category;
  }

  // PAGINATION CALCULATION
  const skip = (page - 1) * limit;

  let dbQuery = Product.find(query)
    .select("title price category image user")
    .populate("user", "name")
    .skip(skip)
    .limit(Number(limit));

  // SORTING
  if (sort === "low") dbQuery = dbQuery.sort({ price: 1 });
  if (sort === "high") dbQuery = dbQuery.sort({ price: -1 });

  const products = await dbQuery;

  // TOTAL COUNT
  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  };
};

const getProductById = (id) =>
  Product.findById(id).populate("user", "name email");

const updateProduct = (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });

const deleteProduct = (id) => Product.findByIdAndDelete(id);

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
