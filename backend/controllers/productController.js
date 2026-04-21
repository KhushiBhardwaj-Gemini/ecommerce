const productService = require("../services/productService");

// CREATE
const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Image is required" });
    }

    const product = await productService.createProduct(
      {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        category: req.body.category?.toLowerCase().trim(),
        image: req.file.filename
      },
      req.user.id
    );

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL (PUBLIC)
const getProducts = async (req, res) => {
  try {
    const products = await productService.getProducts(req.query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET BY ID (PUBLIC)
const getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE
const updateProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (product.user._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updatedData = { ...req.body };

    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updated = await productService.updateProduct(
      req.params.id,
      updatedData
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE
const deleteProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (product.user._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    await productService.deleteProduct(req.params.id);

    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};


































// const productService = require("../services/productService");

// const createProduct = async (req, res) => {
//   try {
//     //Safety check
//     if (!req.file) {
//       return res.status(400).json({ msg: "Image is required" });
//     }

//     const product = await productService.createProduct(
//       {
        
//         title: req.body.title,
//         price: req.body.price,
//         description: req.body.description,
//         category: req.body.category?.toLowerCase().trim(), 
//         image: req.file.filename
      
//       },
//   req.user.id
//     );

// res.status(201).json(product);

//   } catch (err) {
//   res.status(500).json({ msg: err.message });
// }
// };

// const getProductById = async (req, res) => {
//   try {
//     const product = await productService.getProductById(req.params.id);

//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }

//     res.json(product);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const product = await productService.getProductById(req.params.id);

//     //ownership check
//     if (product.user._id.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }
//     const updatedData = {
//       ...req.body
//     };

//     //If new image uploaded → replace
//     if (req.file) {
//       updatedData.image = req.file.filename;
//     }

//     const updated = await productService.updateProduct(
//       req.params.id,
//       updatedData
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


// const deleteProduct = async (req, res) => {
//   try {
//     const product = await productService.getProductById(req.params.id);

//     // ownership check
//     if (product.user._id.toString() !== req.user.id) {
//       return res.status(403).json({ msg: "Not authorized" });
//     }

//     await productService.deleteProduct(req.params.id);

//     res.json({ msg: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// const getProducts = async (req, res) => {
//   try {
//     const products = await productService.getProducts(req.query);
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };



// module.exports = {
//   createProduct,
//   getProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct
// };