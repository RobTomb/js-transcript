const data = require('./data')();

function input() {

}

function showInfo() {

}

function menu() {

	const readlineSync = require('readline-sync'),
		menu = ['ADD STUDENT','PRINT TRANSCRIPT'];
		index = readlineSync.keyInSelect(menu, 'Pleace input your choice:');

	if(index === 0)
		input();
	else if(index === 1)
		showInfo();
}

function main() {
	menu();
}

main();