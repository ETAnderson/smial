import ora from 'ora';
import open from 'open';

export default async function dev() {
    const spinner = ora('').start('Opening your environment...');

    await open.openApp('code', {arguments: ['.']});

    spinner.succeed('Enjoy your dev time!');
};

