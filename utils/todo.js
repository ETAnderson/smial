import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default async function todo() {
	const __filename = fileURLToPath(import.meta.url);
	const __dirname = dirname(__filename).slice(0, -5) + 'todo/';
	const spinner = ora();
	const displayTodoList = () => {
		let data = [];

		const fileData = fs.readFileSync(__dirname + 'todo.txt').toString();
		data = fileData.split('\n');

		let filterData = data.filter(function (value) {
			return value !== '';
		});

		if (filterData.length === 0) {
			console.log('There are no pending todos!');
		}

		for (let i = 0; i < filterData.length; i++) {
			console.log(filterData.length - i + '. ' + filterData[i]);
		}
	};

	const question = [
		{
			name: 'todoMenu',
			type: 'list',
			message: chalk.bold('Todo Menu Options'),
			choices: ['start', 'list', 'add', 'delete', 'complete', 'report'],
			default: 'report'
		}
	];
	const answer = await inquirer.prompt(question);

	if (answer.todoMenu == 'start') {
		console.log(__dirname);
		if (fs.existsSync(__dirname + 'todo.txt') === false) {
			spinner.start('building todo.txt....');
			let createStream = fs.createWriteStream(__dirname + 'todo.txt');
			createStream.end();
			spinner.succeed('todo.txt built!');
		}

		if (fs.existsSync(__dirname + 'done.txt') === false) {
			spinner.start('building done.txt...');
			let createStream = fs.createWriteStream(__dirname + 'done.txt');
			createStream.end();
			spinner.succeed('done.txt built!');
		}
	} else if (answer.todoMenu == 'list') {
		displayTodoList();
	} else if (answer.todoMenu == 'add') {
		const question = [
			{
				name: 'addMenu',
				type: 'input',
				message: 'What task would you like to add?'
			}
		];

		const answer = await inquirer.prompt(question);

		const newTask = answer.addMenu;

		let data = [];
		const fileData = fs.readFileSync(__dirname + 'todo.txt').toString();

		fs.writeFile(
			__dirname + 'todo.txt',
			newTask + '\n' + fileData,
			function (err) {
				if (err) throw err;

				console.log(`new task added: ${chalk.italic(newTask)}`);
			}
		);
	} else if (answer.todoMenu == 'delete') {
		displayTodoList();
		const question = [
			{
				name: 'deleteMenu',
				type: 'input',
				message: 'Which task to delete?'
			}
		];

		const answer = await inquirer.prompt(question);

		let data = [];

		const deleteIndex = parseInt(answer.deleteMenu, 10);

		const fileData = fs.readFileSync(__dirname + 'todo.txt').toString();

		data = fileData.split('\n');

		let filterData = data.filter(function (value) {
			return value !== '';
		});

		if (deleteIndex > filterData.length || deleteIndex <= 0) {
			console.log(
				'Error: todo #' +
					deleteIndex +
					' does not exist. Nothing deleted.'
			);
		} else {
			spinner.start(chalk.italic(`removing task at ${deleteIndex}`));
			filterData.splice(filterData.length - deleteIndex, 1);

			// Join the array to form a string
			const newData = filterData.join('\n');

			// Write the new data back in file
			fs.writeFile(__dirname + 'todo.txt', newData, function (err) {
				if (err) throw err;

				// Logs the deleted index
				spinner.succeed(chalk.italic(`Deleted todo # ${deleteIndex}`));
			});
		}
	} else if (answer.todoMenu == 'complete') {
		displayTodoList();
		const question = [
			{
				name: 'completeMenu',
				type: 'input',
				message: 'Which task did you complete'
			}
		];

		const answer = await inquirer.prompt(question);

		const completeIndex = parseInt(answer.completeMenu, 10);
		if (completeIndex) {
			let data = [];

			let dateobj = new Date();

			let dateString = dateobj.toISOString().substring(0, 10);

			const fileData = fs
				.readFileSync(__dirname + '/todo.txt')
				.toString();

			const doneData = fs.readFileSync(__dirname + 'done.txt').toString();

			data = fileData.split('\n');

			let filterData = data.filter(function (value) {
				return value !== '';
			});

			if (completeIndex > filterData.length || completeIndex <= 0) {
				console.log(
					'Error: todo #' + completeIndex + ' does not exist.'
				);
			} else {
				spinner.start('finishing task...');
				const deleted = filterData.splice(
					filterData.length - completeIndex,
					1
				);

				const newData = filterData.join('\n');

				fs.writeFile(__dirname + 'todo.txt', newData, function (err) {
					if (err) throw err;
				});

				fs.writeFile(
					__dirname + 'done.txt',
					'x ' + dateString + ' ' + deleted + '\n' + doneData,
					function (err) {
						if (err) throw err;
						spinner.succeed(
							'Marked todo #' + completeIndex + ' as done.'
						);
					}
				);
			}
		} else {
			console.log('Error: Missing NUMBER for' + ' marking todo as done.');
		}
	} else if (answer.todoMenu == 'report') {
		let todoData = [];

		let doneData = [];

		let dateobj = new Date();

		let dateString = dateobj.toISOString().substring(0, 10);

		const todo = fs.readFileSync(__dirname + 'todo.txt').toString();
		const done = fs.readFileSync(__dirname + 'done.txt').toString();

		todoData = todo.split('\n');

		doneData = done.split('\n');
		let filterTodoData = todoData.filter(function (value) {
			return value !== '';
		});

		let filterDoneData = doneData.filter(function (value) {
			return value !== '';
		});

		console.log(
			dateString +
				' ' +
				'Pending : ' +
				filterTodoData.length +
				' Completed : ' +
				filterDoneData.length
		);
	}
}
