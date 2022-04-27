import chalk from 'chalk';
import ora from 'ora';
import notifier from 'node-notifier';
import inquirer from 'inquirer';

export default async function pomodoro() {
	const spinner = ora();
	const twentyFiveAlert = {
		title: '25 minutes',
		timer: () => {
			notifier.notify('Twenty-five minutes have elapsed');
			spinner.succeed(chalk.bold('Times up!'));
		},
		duration: 1500000
	};

	const fifteenAlert = {
		title: '15 minutes',
		timer: () => {
			notifier.notify('15 minutes have elapsed');
			spinner.succeed(chalk.bold('Times up!'));
		},
		duration: 900000
	};

	const fiveAlert = {
		title: '5 minutes',
		timer: () => {
			notifier.notify('Five minutes have elapsed');
			spinner.succeed(chalk.bold('Times up!'));
		},
		duration: 300000
	};

	async function pomodoroTimer(alert) {
		spinner.start(`counting down ${alert.title}...`);
		setTimeout(alert.timer, alert.duration);
	}

	const question = [
		{
			name: 'timer',
			type: 'list',
			message: 'Start a pomodoro timer or break timer?',
			choices: ['pomodoro', 'break'],
			default: 'pomodoro'
		}
	];

	const answer = await inquirer.prompt(question);

	if (answer.timer == 'pomdoro') {
		pomodoroTimer(twentyFiveAlert);
	} else {
		const question = [
			{
				name: 'breakTimer',
				type: 'list',
				message: 'Choose your break timer',
				choices: ['15 minutes', '5 minutes'],
				default: '5 minutes'
			}
		];
		const answer = await inquirer.prompt(question);
		if (answer.breakTimer == '15 minutes') {
			pomodoroTimer(fifteenAlert);
		} else {
			pomodoroTimer(fiveAlert);
		}
	}
}
