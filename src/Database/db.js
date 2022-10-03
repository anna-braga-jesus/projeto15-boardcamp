import pkg from 'pg';
const {Pool} = pkg;

const connection =  new Pool({
    user: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '12345',
    database: 'boardcamp'
});

export { connection };