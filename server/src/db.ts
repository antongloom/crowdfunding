import { Pool } from 'pg'

const pool = new Pool({
  user: 'company_test',
  password: '123456',
  host: 'postgres_container',
  port: 5432,
  database: 'company'
});

export default pool