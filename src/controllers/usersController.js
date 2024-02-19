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

    // if (!bcrypt.compareSync(password, row[0].password)) {
    //   return res.json({ msg: "User password is incorrect" });
    // }

    const payload = { email, sub: row[0].id, role: row[0].role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?,?,?,?)";
    const [rows, error] = await dataFetch(sql, [name, email, hashPassword, "user"]);

    if (error) {
      res.json(error);
      return;
    }

    res.status(201).json({ msg: "Registracija sėkminga!" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.favorites = async (req, res) => {
  try {
    // const { name, email, password } = req.body;

    const params = req.params;

    // res.json(params.userId);

    const sql = `SELECT items.id, items.title, items.description, items.price, items.rating, items.stock, items.cat_id, items.img_url FROM favorites LEFT JOIN items ON items.id = favorites.product_id WHERE user_id = ${params.userId}`;
    const [rows, error] = await dataFetch(sql, []);

    // if (error) {
    //   res.json(error);
    //   return;
    // }

    res.status(201).json(rows);
  } catch (error) {
    console.log(error);
  }
};
module.exports.addTofavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const sql = "INSERT INTO favorites (product_id, user_id) VALUES (?,?)";
    const [rows, error] = await dataFetch(sql, [productId, userId]);

    if (error) {
      res.json(error);
      return;
    }

    res.status(201).json({ msg: "Produktas pridėtas prie mėgstamu!" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.userFavorites = async (req, res) => {
  try {
    const params = req.params;
    const sql = `SELECT * FROM favorites WHERE user_id=?`;
    const [rows, error] = await dataFetch(sql, [params.userId]);

    if (error) {
      return res.json({ msg: "Failed to get favorites products" });
    }

    res.json(rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports.removeFromFavorites = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    const sql = `DELETE FROM favorites WHERE product_id = ${productId} AND user_id = ${userId} LIMIT 1`;
    const [rows, error] = await dataFetch(sql, []);

    if (error) {
      res.json(error);
      return;
    }

    res.status(200).json({ msg: "Produktas sekmigai išimtas iš mėgstamiausiu" });
  } catch (error) {
    console.log(error);
  }
};
