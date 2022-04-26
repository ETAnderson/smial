import meow from 'meow';
import meowHelp from 'cli-meow-help';

const flags = {
	chat: {
		type: 'boolean',
		default: false,
		alias: 'c',
		desc: 'Open a your default browser pointed at Google Messages for web, unless a browser tab pointed at it currently exists'
	},
	clear: {
		type: `boolean`,
		default: true,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		desc: `Print debug info`
	},
	dev: {
		type: 'boolean',
		default: false,
		alias: 'd',
		desc: 'Build out your CWD in VSC'
	},
	git: {
		type: 'boolean',
		default: false,
		alias: 'g',
		desc: 'access git commands'
	},
	mail: {
		type: 'boolean',
		default: false,
		desc: 'Open a your default browser (or new tab in already opened default browser) pointed at Gmail Inbox'
	},
	music: {
		type: `boolean`,
		default: false,
		desc: `Open default browser (or new tab in already opened default browser) pointed at YouTube Music`
	},
	newProject: {
		type: 'boolean',
		default: false,
		alias: 'n',
		desc: 'access new project menu'
	},
	todo: {
		type: 'boolean',
		default: false,
		desc: 'access todo menu'
	},
	serve: {
		type: 'boolean',
		default: false,
		desc: 'start up your server for your current working directory, based on NPM and Yarn standards'
	},
	version: {
		type: `boolean`,
		desc: `Print CLI version`
	},
	view: {
		type: `boolean`,
		default: false,
		alias: `v`,
		desc: `View your current working directory`
	}
};

const commands = {
	help: { desc: `Print help info` }
};

const helpText = meowHelp({
	name: `smial`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

export default meow(helpText, options);
