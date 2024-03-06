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
module.exports.donate = async (req, res) => {
  try {
    const { person, amount, ideaId } = req.body;

    const sql = "INSERT INTO donated (person, amount, ideas_id ) VALUES (?,?,?)";
    const [rows, error] = await dataFetch(sql, [person, amount, ideaId]);

    if (error) {
      console.log(error);
      res.status(400).json({ msg: "Nepavyko paaukoti, bandykite vėliau" });
      return;
    }

    const sql2 = "SELECT * FROM ideas WHERE id=?";
    const [rows2, error2] = await dataFetch(sql2, [ideaId]);

    if (error2) {
      console.log(error);
      res.status(400).json({ msg: "Nepavyko paaukoti, bandykite vėliau" });
      return;
    }

    const newAmount = +rows2[0].collected + amount;

    const sql3 = "UPDATE ideas SET  collected=? WHERE id=?";
    const [rows3, error3] = await dataFetch(sql3, [newAmount, ideaId]);

    if (error3) {
      console.log(error);
      res.status(400).json({ msg: "Nepavyko paaukoti, bandykite vėliau" });
      return;
    }

    res.status(201).json({ msg: "Sekmingai paaukojote!" });
  } catch (error) {
    console.log(error);
  }
};
module.exports.donateList = async (req, res) => {
  try {
    const { ideaId } = req.params;
    const sql = "SELECT * FROM donated WHERE ideas_id=?";
    const [rows, error] = await dataFetch(sql, [ideaId]);
    if (error) {
      res.json({ msg: "Įvyko klaida!" });
    }

    res.json({ rows });
  } catch (error) {
    console.log(error);
  }
};
