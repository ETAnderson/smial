import { Pool } from 'pg';

export const pool = new Pool(process.env.POOL);
