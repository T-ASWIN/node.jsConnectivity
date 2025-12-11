import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

app.get("/students", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM students");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// app.get("/students",aysnc (req,res)=>
// {

// })
// insert
app.post("/insert", async (req, res) => {
  try {
    let { id, tamil, english, maths, science, social } = req.body;
    await pool.query(
      `INSERT INTO students (id, tamil, english, maths, science, social)
     VALUES (?, ?, ?, ?, ?, ?)`,
      [id, tamil, english, maths, science, social]
    );
    res.json({ message: "Inserted value:" });
  } catch (err) {
    console.log(err);
  }
});

//const insert = await createStudent(31, 90, 90, 90, 90, 90);

//delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(`DELETE FROM students WHERE id = ?`, [id]);

    res.json({ message: "Student deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Delete failed" });
  }
});

app.listen(4000, () => console.log("API running on port 4000"));
// async function getDada() {
//   const result = await pool.query("SELECT*FROM students");
//   return result;
// }

// const result = getDada();
// const tables = document.getElementById("table");

// const marks = result
//   .map(
//     (val) =>
//       `<tr><td>${val.id}</td><td>${val.tamil}</td><td>${val.english}</td><td>${val.maths}</td><td>${val.science}</td><td>${val.social}</td>`
//   )
//   .json("");

// tables.innerHTML = `<table border="1" cellspacing="0" cellpadding="8">
// <thead><tr><td>ID</td><td>Tamil</td><td>English</td><td>Maths</td><td>Science</td><td>social</td></tr></thead>
// <tbody>${marks}</tbody></table>`;

// const results = await getDada();
// console.log(results);

//2 insert
// async function createStudent(id, tamil, english, maths, science, social) {
//   await pool.query(
//     `INSERT INTO students (id, tamil, english, maths, science, social)
//      VALUES (?, ?, ?, ?, ?, ?)`,
//     [id, tamil, english, maths, science, social]
//   );
// }
// const insert = await createStudent(31, 90, 90, 90, 90, 90);

//3 create
// async function createTable() {
//   const query = `
//     CREATE TABLE IF NOT EXISTS details (
//       id INT PRIMARY KEY AUTO_INCREMENT,
//       name VARCHAR(20),
//       address VARCHAR(20),
//       present BOOLEAN
//     );
//   `;

//   try {
//     await pool.query(query);
//     console.log("Table 'details' created successfully!");
//   } catch (err) {
//     console.log("Error creating table:", err);
//   }
// }

// await createTable();

//4 insert
// async function insertdetails(name, address, present) {
//   await pool.query(`insert into details(name,address,present) values(?,?,?)`, [
//     "aswinT",
//     "tiruppur",
//     true,
//   ]);
// }

// await insertdetails();

// //4 update
// async function updatedetails() {
//   await pool.query(`update details set address="magalam" where name="aswin";`);
// }

// await updatedetails();

// //5 update
// async function updatedetails2() {
//   await pool.query(`update details set `);
// }
