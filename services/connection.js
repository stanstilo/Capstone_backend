const conStr = "postgres://me:password@localhost:2700/api";
const pg = require("pg");
const {Pool} = require("pg");

const pool = new pg.Pool({
  connectionString: conStr
});
module.exports = pool