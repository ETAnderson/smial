import readline from 'readline';
import ora from 'ora';
import open from 'open';

export default async function smial() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
    async function buildSmial(){
        const spinner = ora({
            text:'',
        }).start('Building your smial');

       await open.openApp('code', {arguments: ['.']});

       spinner.succeed('Enjoy your dev time!');
      };
       
      buildSmial();
  };
