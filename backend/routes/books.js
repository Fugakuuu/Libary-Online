const express = require("express");
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getStats,
} = require("../controllers/bookController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected routes (Admin Only)
router.use(protect);
router.use(authorize("admin"));

router.post("/", createBook);
router.get("/admin/stats", getStats);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
