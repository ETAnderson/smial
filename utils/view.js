import readFiles from './readFiles.js';
import chalk from 'chalk';
import ora from 'ora';



export default async function view() {
  const spinner = ora('');
  
      spinner.start('`  Lets take a look\n');
      

      await readFiles(process.cwd(), (filepath, name, ext) => {
        console.log(chalk.blue('file name:'), chalk.bold(name));
        console.log(chalk.yellow('file extension:'), chalk.bold(ext));
        console.log(chalk.dim('file path:'), chalk.dim(filepath), '\n' );
      });

      spinner.succeed(chalk.bold('  Folder contents successfully loaded\n'));

};

