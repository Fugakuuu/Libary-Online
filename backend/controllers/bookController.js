const Book = require("../models/Book");
const User = require("../models/User");
const { Op } = require("sequelize");

exports.getBooks = async (req, res) => {
  try {
    const { search, category, author, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    const where = {};
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { author: { [Op.iLike]: `%${search}%` } },
      ];
    }
    if (category) where.category = category;
    if (author) where.author = { [Op.iLike]: `%${author}%` };

    const { count, rows } = await Book.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [
        { model: User, as: "uploader", attributes: ["id", "fullName"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json({
      data: rows,
      pagination: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: User, as: "uploader", attributes: ["id", "fullName"] },
      ],
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      addedBy: req.user.id,
    });
    res.status(201).json({ data: newBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Assuming admin can edit any book
    await book.update(req.body);
    res.status(200).json({ data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await book.destroy();
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const totalBooks = await Book.count();
    const booksAddedByMe = await Book.count({
      where: { addedBy: req.user.id },
    });
    const categories = await Book.findAll({
      attributes: ["category"],
      group: ["category"],
    });

    res.status(200).json({
      totalBooks,
      booksAddedByMe,
      uniqueCategories: categories.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
