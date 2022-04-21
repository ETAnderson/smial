#!/usr/bin/env node

/**
 * Smial
 * A home for me to be productive from
 *
 * @author Eric Anderson <https://github.com/ETAnderson>
 */
import 'dotenv/config';
import init from './utils/init.js';
import chat from './utils/chat.js';
import cli from './utils/cli.js';
import git from './utils/git.js';
import log from './utils/log.js';
import view from './utils/view.js'; 
import mail from './utils/mail.js';
import music from './utils/music.js';
import serve from './utils/serve.js';
import dev from './utils/dev.js';
import newProject from './utils/newProject.js';

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);

	//accept chat flag and open default browser pointed at Messages
	//can be changed by altering url in the "await open(`...`) in utils/chat" 
	flags.chat && (await chat());

	//accept git flag and access git command menu
	flags.git && (await git());
	
	//accept mail flag and open default browser pointed at Gmail Inbox
	//can be changed by altering url in the "await open(`...`) in utils/mail"
	flags.mail && (await mail());
	
	//accept music flag and open default browser pointed at YouTube Music
	//can be changed by altering url in the "await open(`...`) in utils/music"
	flags.music && (await music());

	//accept new flag and access new project menu
	flags.newProject && (await newProject());
	
	//accept dev flag and open current folder in VSCode
	flags.dev && (await dev());

	//accept serve flag and start up your server, based on NPM and Yarn standards
	flags.serve && (await serve());
	
	//accept user flag for view and display formatted folder file contents
	flags.view && (await view());

	debug && log(flags);
})();
