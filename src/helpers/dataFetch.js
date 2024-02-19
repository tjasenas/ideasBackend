const mysql = require("mysql2/promise");
const { dbConfig } = require("../config");

module.exports.dataFetch = async (sql, argArr = []) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows, error] = await connection.execute(sql, argArr);
    return [rows, null];
  } catch (error) {
    console.log("error from dataFetch");
    console.log("error ====", error);
    return [null, error];
  } finally {
    if (connection) connection.end();
  }
};
