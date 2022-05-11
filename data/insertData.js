import { pool } from './db';
import ora from 'ora';
import inquirer from 'inquirer';

export default async function insertData() {
	const spinner = ora();
	const question = [
		{
			name: 'insert',
			type: 'input',
			message: 'State the task to add'
		}
	];
	const answer = await inquirer.prompt(question);
	const task = answer.insert;

	try {
		spinner.start('Adding task to Todo list');
		const res = await pool.query(
			'INSERT INTO todo(task, complete) VALUES($1, 0)',
			task
		);
		spinner.succeed(`added task: ${task}`);
	} catch (error) {
		spinner.fail(error);
	}
}
