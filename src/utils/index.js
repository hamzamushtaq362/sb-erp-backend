const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

async function doesTableExist(tableName) {
  const query = `SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = ? AND table_name = ?`;

  try {
    const [results, _] = await connection
      .promise()
      .query(query, [connection.config.database, tableName]);
    return results[0].count > 0;
  } catch (error) {
    throw error;
  }
}

// doesTableExist("users")
//   .then((exists) => {
//     if (exists) {
//       console.log("Table exists.");
//     } else {
//       console.log("Table does not exist.");
//     }
//   })
//   .catch((error) => {
//     console.error("Error checking table existence:", error);
//   });

module.exports = doesTableExist;
