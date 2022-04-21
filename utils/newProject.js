import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { exec } from 'child_process';

export default async function newProject() {
    const spinner = ora('');
    const menuQuestion = [{
        name: 'menu',
        type: 'list',
        message: 'Select what type of project to start',
        choices: ['expressJS', 'react (with CRA)', 'nextJS' ],
        default: 'expressJS'
    }];
    const typescriptQuestion = [{
        name: 'typescript',
        type: 'list',
        message: 'with Typescript?',
        choices: ['Yes', 'No'],
        default: 'No'
    }]; 
    const projectNameQuestion = [{
        name: 'projectName',
        type: 'input',
        message: 'Name your project (kebab-case)'
    }];

    const pAnswer = await inquirer.prompt(projectNameQuestion);
    const mAnswer = await inquirer.prompt(menuQuestion);

    if (mAnswer.menu == 'react (with CRA)') {
        const answer = await inquirer.prompt(typescriptQuestion);
        if (answer.typescript == 'Yes') {
            spinner.start('Build react project with CRA and TS...');
            exec(`yarn create react-app ${pAnswer.projectName} --template typescript`, (error, stdout, stderr) => {
				if (error) {
					spinner.fail(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					spinner.fail(`stderr: ${stderr}`);
					return;
				}
				spinner.succeed(chalk.bold(`stdout: ${stdout}`));
			})
        } else {
            spinner.start("Building react project with CRA....");
            exec(`yarn create react-app ${pAnswer.projectName}`,  (error, stdout, stderr) => {
				if (error) {
					spinner.fail(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					spinner.fail(`Finished with stderr: ${stderr.message}`);
					return;
				}
				spinner.succeed(chalk.bold(`stdout: ${stdout}`));
			})
        }
    } else if (mAnswer.menu == 'nextJS') {
        const answer = await inquirer.prompt(typescriptQuestion);
        if (answer.typescript == 'Yes') {
            spinner.start('Building nextJS project with TS...');
            exec(`yarn create next-app --typescript ${pAnswer.projectName}`, (error, stdout, stderr) => {
				if (error) {
					spinner.fail(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					spinner.fail(`Finished with stderr: ${stderr}`);
					return;
				}
				spinner.succeed(chalk.bold(`stdout: ${stdout}`));
			});
        } else {
            spinner.start('Building nextJS project...');
            exec(`yarn create next-app ${pAnswer.projectName}`, (error, stdout, stderr) => {
				if (error) {
					spinner.fail(`error: ${error.message}`);
					return;
				}
				if (stderr) {
					spinner.fail(`Finished with stderr: ${stderr}`);
					return;
				}
				spinner.succeed(chalk.bold(`stdout: ${stdout}`));
			})
        }
    } else if (mAnswer.menu == 'expressJS') {
        const answer = await inquirer.prompt(typescriptQuestion);
        if (answer.typescript == 'Yes') {
            spinner.start('Building express project...')
        } else {

        };
    };
}