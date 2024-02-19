require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { dataFetch } = require("../helpers/dataFetch");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email=?`;
    const [row, error] = await dataFetch(sql, [email]);

    if (error) {
      return res.json({ msg: "User email or password is incorrect" });
    }

    const payload = { email, sub: row[0].id, role: row[0].role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
