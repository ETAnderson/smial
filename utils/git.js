import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { exec } from 'child_process';
import path from 'path';

export default async function git() {
	const spinner = ora('');
	const question = [
		{
			name: 'proceed',
			type: 'input',
			message: 'Access git actions?',
			choices: ['Yes', 'No'],
			default: 'Yes'
		}
	];

	const answer = await inquirer.prompt(question);

	if (answer.proceed == 'Yes') {
		//activate git actions here.
		const question = [
			{
				name: 'actions',
				type: 'list',
				message: 'Choose an Action',
				choices: ['add', 'commit', 'push'],
				default: 'add'
			}
		];

		const answer = await inquirer.prompt(question);
		if (answer.actions == 'add') {
			spinner.start(chalk.gray('Adding all changes...'));
			exec('git add .', (error, stdout, stderr) => {
				if (error) {
					spinner.fail(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					spinner.fail(`stderr: ${stderr}`);
					return;
				}
				spinner.succeed(chalk.bold(`All changes added!`));
			});
		} else if (answer.actions == 'commit') {
			const question = [
				{
					name: 'commitMessage',
					type: 'input',
					message: 'Please input a semantic commit message',
					default: 'feat:'
				}
			];

			const answer = await inquirer.prompt(question);
			spinner.start(chalk.dim('Committing all changes with message...'));
			exec(
				`git commit -m "${answer.commitMessage}"`,
				(error, stdout, stderr) => {
					if (error) {
						spinner.fail(`error: ${error.message}`);
						return;
					}
					if (stderr) {
						spinner.fail(`stderr: ${stderr}`);
						return;
					}
					spinner.succeed(chalk.bold(`All changes committed!`));
				}
			);
		} else if (answer.actions == 'push') {
			const question = [
				{
					name: 'pushConfirm',
					type: 'input',
					message: 'Please confirm push action (y/n)',
					default: 'n'
				}
			];
			const answer = await inquirer.prompt(question);
			if (answer.pushConfirm == 'y') {
				spinner.start('Pushing to remote repository');
				await exec(
					`git push https://${process.env.GITHUB_TOKEN}@github.com/${
						process.env.GITHUB_USERNAME
					}/${path.basename(path.resolve(process.cwd()))}.git`,
					(error, stdout, stderr) => {
						// if (error) {
						// 	spinner.fail(`error: ${error.message}`);
						// 	return;
						// }
						// if (stderr) {
						// 	spinner.fail(`stderr: ${stderr}`);
						// 	return;
						// }
						spinner.succeed(chalk.bold(`${stdout}`));
					}
				);
			} else {
				console.log('Push canceled');
			}
		}
	} else {
		process.exit(1);
	}
}
