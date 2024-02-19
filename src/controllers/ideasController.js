const { dataFetch } = require("../helpers/dataFetch");

module.exports.ecceptedIdeas = async (req, res) => {
  try {
    const sql = "SELECT * FROM ideas WHERE accepted=1";
    const [rows, error] = await dataFetch(sql);
    if (error) {
      res.json({ msg: "Įvyko klaida!" });
    }
    res.json({ rows });
  } catch (error) {
    console.log(error);
  }
};
module.exports.getAllIdeas = async (req, res) => {
  try {
    const sql = "SELECT * FROM ideas";
    const [rows, error] = await dataFetch(sql);
    if (error) {
      res.json({ msg: "Įvyko klaida!" });
    }

    res.json({ rows });
  } catch (error) {
    console.log(error);
  }
};
module.exports.acceptIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const sql = "UPDATE ideas SET accepted=? WHERE id=?";
    const [rows, error] = await dataFetch(sql, [1, ideaId]);
    if (error) {
      res.json({ msg: "Įvyko klaida!" });
    }
    res.json({ msg: "Sėkmingai patvirtinote" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.removeIdea = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const sql = "DELETE FROM ideas WHERE id=?";
    const [rows, error] = await dataFetch(sql, [ideaId]);
    if (error) {
      res.json({ msg: "Įvyko klaida!" });
    }
    res.json({ msg: "Sėkmingai ištrintas" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.addIdea = async (req, res) => {
  try {
    const { title, content, img, need, person } = req.body;
    console.log(title, content, img, need, person);

    const sql = "INSERT INTO ideas (title, content, img, need, person ) VALUES (?,?,?,?,?)";
    const [rows, error] = await dataFetch(sql, [title, content, img, need, person]);

    if (error) {
      res.json(error);
      return;
    }

    res.status(201).json({ msg: "Sekmingai sukurta! Laukite patvirtinimo." });
  } catch (error) {
    console.log(error);
  }
};
