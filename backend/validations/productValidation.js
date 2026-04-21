const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Product name is required"
  }),

  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required"
  }),

  description: Joi.string().allow("").optional(),

  category: Joi.string().required().messages({                     //.allow(.,..).messages->category-enum
    "string.empty": "Category is required"

  })
});

//multer

module.exports = {
  productSchema
};