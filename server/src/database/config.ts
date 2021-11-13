import mysql from 'mysql2';

export const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'socialwebapp',
    rowsAsArray: false,
});


export default sql;