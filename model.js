const Mysql = require('mysql');
class Model {
	constructor(host,account,password,database,tableName) {
		this.db = Mysql.createConnection({
			host: host,
			user: account,
			password: password,
			database: database
		});
		this.db.connect(function(err) {
			if (err) console.log(err);
		});
		this.tableName = tableName;
	}

	endConnection() {
		this.db.end();
	}

	getAll(columns,where,orderBy) {
		var sql = "SELECT ";
		if (columns != "" && columns != undefined) {
			sql += columns+" FROM "+this.tableName;
		}
		if (where != "" && where != undefined) {
			sql += " WHERE "+where+" ";
		}
		if (orderBy != "" && orderBy != undefined) {
			sql += "ORDER BY "+orderBy;
		}
		return [sql,this.db];
	}

	getRow(columns,where,orderBy) {
		var sql = sql = `SELECT LIMIT 1 ${columns} FROM ${this.tableName} WHERE ${where} ORDER BY ${orderBy}`;
		this.response = undefined;
		this.db.query(sql,(err,response) => {
			this.response = response;
		})

		if (this.response != undefined) return this.response;
	}

	getCountRow(columns,where,orderBy,countLine) {
		var sql = sql = `SELECT LIMIT ${countLine} ${columns} FROM ${this.tableName} WHERE ${where} ORDER BY ${orderBy}`;
		this.response = undefined;
		this.db.query(sql,(err,response) => {
			this.response = response;
		})

		if (this.response != undefined) return this.response;
	}

	insert(columns, values) {
		var sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;
		this.db.query(sql,(err,response) => {
			if (err) console.log(err);
			this.responseInsert = response;
		})
		return true;
	}

	update(set,where) {
		var sql = `UPDATE ${this.tableName} SET ${set} WHERE ${where}`;
		this.db.query(sql,(err,response) =>{});
	}

	remove(where) {
		var sql = `DELETE FROM ${this.tableName} WHERE ${where}`;
		this.db.query(sql,(err,response) => {
		})
	}
}

module.exports = Model