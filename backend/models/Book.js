const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publishedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pages: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "Indonesian",
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    availability: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    addedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  },
);

// Define Relationships
User.hasMany(Book, { foreignKey: "addedBy" });
Book.belongsTo(User, { foreignKey: "addedBy", as: "uploader" });

module.exports = Book;
