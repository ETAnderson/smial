import { pool } from './db';
import ora from 'ora';
import inquirer from 'inquirer';

export default async function insertData() {
	const task = process.argv.slice(2);

	try {
		const res = await pool.query(
			'INSERT INTO todo(task, complete) VALUES($1, 0)',
			task
		);
	} catch (error) {
		console.log(error);
	}
}
