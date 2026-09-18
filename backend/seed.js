const sequelize = require("./config/database");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Book = require("./models/Book");

const seedDatabase = async () => {
  try {
    // Sync database (force: true drops existing tables)
    await sequelize.sync({ force: true });
    console.log("Database synced");

    // Create Admin User
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash("password123", salt);
    const userPassword = await bcrypt.hash("password123", salt);

    const admin = await User.create({
      email: "admin@example.com",
      password: adminPassword,
      fullName: "Admin User",
      role: "admin",
    });
    console.log("Admin user created: admin@example.com");

    // Create Regular User
    const regularUser = await User.create({
      email: "user@example.com",
      password: userPassword,
      fullName: "Regular User",
      role: "user",
    });
    console.log("Regular user created: user@example.com");

    // Sample Books
    const books = [
      {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Harry Potter, an orphan raised by his cruel aunt and uncle, discovers on his eleventh birthday that he is a wizard. He attends Hogwarts School of Witchcraft and Wizardry, where he makes friends, learns magic, and uncovers the truth about his parents' death.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/2DCs73x6P8seNobQ9zBSbO/1a5dfd6ed5fc0ed9545370470fc3d74c/English_Harry_Potter_1_Epub_9781781100219.jpg?q=75&fm=jpg&w=914",
        rating: 4.8,
      },
      {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Harry returns to Hogwarts for his second year, where a mysterious force is petrifying students. He discovers the Chamber of Secrets and faces the heir of Slytherin, uncovering dark secrets about the school's past.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/6VuPUG4wPtmg3xvqwm6ZSn/2465365bae53ac09562f7bcea0b75cb3/English_Harry_Potter_2_Epub_9781781100226.jpg?q=75&fm=jpg&w=914",
        rating: 4.7,
      },
      {
        title: "Harry Potter and the Prisoner of Azkaban",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Sirius Black, an alleged supporter of Lord Voldemort, escapes Azkaban prison. Harry learns about his godfather and the truth behind his parents' betrayal, while dealing with Dementors and time travel.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/24YWmI4UcyoMwj7wdKrEcL/374de1941927db12bd844fb197eab11f/English_Harry_Potter_3_Epub_9781781100233.jpg?q=75&fm=jpg&w=914",
        rating: 4.9,
      },
      {
        title: "Harry Potter and the Goblet of Fire",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Hogwarts hosts the Triwizard Tournament, and Harry's name is mysteriously entered. He competes in dangerous tasks, uncovers a plot to resurrect Voldemort, and faces the Dark Lord himself.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/3d9kpFpwHyjACq8H3EU6ra/85673f9e660407e5e4481b1825968043/English_Harry_Potter_4_Epub_9781781105672.jpg?q=75&fm=jpg&w=914",
        rating: 4.8,
      },
      {
        title: "Harry Potter and the Order of the Phoenix",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "The Ministry of Magic denies Voldemort's return. Harry forms Dumbledore's Army to teach defensive magic, battles Death Eaters, and learns about the prophecy that links him to the Dark Lord.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/29op5HEVpvrKK2JKYCsFiO/5b939002fe3611b3f77659df83a76551/English_Harry_Potter_5_Epub_9781781100240.jpg?q=75&fm=jpg&w=914",
        rating: 4.6,
      },
      {
        title: "Harry Potter and the Half-Blood Prince",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Harry learns about Horcruxes, objects containing pieces of Voldemort's soul. He investigates the past, uncovers secrets from Dumbledore's youth, and prepares for the final battle against evil.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/35KbpLHvQvQtBBKs0vKErL/43985bc9e5bea863ccf9cc9561b62827/English_Harry_Potter_6_Epub_9781781100257.jpg?q=75&fm=jpg&w=914",
        rating: 4.8,
      },
      {
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        category: "Fiksi",
        description:
          "Harry, Ron, and Hermione hunt for Horcruxes to defeat Voldemort. They face dangers, learn about the Deathly Hallows, and engage in the epic Battle of Hogwarts to end the war.",
        coverImage:
          "https://contentful.harrypotter.com/usf1vwtuqyxm/6S51pK7uwnyhkS9Io9DsAn/320c162c5150f853b8d8568c4715dcef/English_Harry_Potter_7_Epub_9781781100264.jpg?q=75&fm=jpg&w=914",
        rating: 4.9,
      },
    ];

    for (const book of books) {
      await Book.create({
        ...book,
        addedBy: admin.id,
      });
    }

    console.log(`8 sample books created`);
    console.log("🎉 Database seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
