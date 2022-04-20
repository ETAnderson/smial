import readFiles from "./readFiles.js";
import { exec } from 'child_process';
import ora from 'ora';
import chalk from 'chalk';

export default async function serve() {
    const spinner = ora({
        text: ''
    });

    spinner.start('Checking for package configuration files');

    readFiles(process.cwd(), (filepath, name, ext) => {
      if (name == 'yarn' && ext == '.lock') {
        spinner.succeed(chalk.bold('yarn.lock found!'));
        spinner.start(`Starting local server at 'http://localhost:3000'...`);
        exec('yarn run dev', (error, stdout, stderr) => {
            if (error) {
                spinner.fail(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                spinner.fail(`stderr: ${stderr}`);
                return;
            }
            spinner.succeed(`stdout: ${stdout}`);
        });

      } else if (name == 'package-lock' && ext == '.json') {
        spinner.succeed('package-lock.json found!');
        spinner.start(`Starting local server at 'http://localhost:3000'...`);
        exec('npm start', (error, stdout, stderr) => {
            if (error) {
                spinner.fail(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                spinner.fail(`stderr: ${stderr}`);
                return;
            }
            spinner.succeed(`stdout: ${stdout}`);
        })
      };
    });
};