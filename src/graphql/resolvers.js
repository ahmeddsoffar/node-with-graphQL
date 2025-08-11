const Product = require("../../models/product");

const resolvers = {
  Query: {
    products: async () => {
      return await Product.find();
    },
    product: async (_, { id }) => {
      return await Product.findById(id);
    },
    sortedProducts: async (_, { field, order }) => {
      const allowedFields = new Set(["title", "category", "price", "inStock"]);
      if (!allowedFields.has(field)) {
        throw new Error("Invalid sort field");
      }
      const sortDirection = order === "DESC" ? -1 : 1;
      return await Product.find().sort({ [field]: sortDirection });
    },
  },
  Mutation: {
    addProduct: async (_, { title, category, price, inStock }) => {
      const created = await Product.create({ title, category, price, inStock });
      return created;
    },
    updateProduct: async (_, { id, title, category, price, inStock }) => {
      const update = {};
      if (typeof title !== "undefined") update.title = title;
      if (typeof category !== "undefined") update.category = category;
      if (typeof price !== "undefined") update.price = price;
      if (typeof inStock !== "undefined") update.inStock = inStock;

      const updated = await Product.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
      });
      if (!updated) throw new Error("Product not found");
      return updated;
    },
    deleteProduct: async (_, { id }) => {
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) throw new Error("Product not found");
      return true;
    },
  },
};

module.exports = { resolvers };
