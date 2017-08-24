const data = require('./data')();
const funName = ['input' , 'showInfo'];
const tips = ['Please enter student information in accordance with the format\n' , 
			'Please enter in the correct format\n' ];

function readInfo(flag) {
	const readlineSync = require('readline-sync');
	const format = `name:"jing" , id:2019 , class:1 , math:45 , chinese:60 , english:79 , progromming:99 `;
	return readlineSync.question(tips[flag] + '\n' + format + '\n');
}

function formatStuInfo(stuInfo) {
	return eval("("+'{'+stuInfo+'}'+")");
}

function sameKeys(stuInfo) {
	const keys = [ 'name','id','class','math','chinese','english','progromming' ];
	return keys + '' === Object.keys(stuInfo) + '';
}

function TorF(stuInfo) {

	try{
		stuInfo = formatStuInfo(stuInfo);
	}catch(e){
		return 1;
	}
	if(sameKeys(stuInfo))
		return 2;
	return 1; 
}

function push(stuInfo) {
	stuInfo = formatStuInfo(stuInfo);
	stuInfo['avg'] = 0 ;
	stuInfo['sum'] = 0;
	data.push(stuInfo);
}

function input() {
	let flag = 0;
	let stuInfo = '';
	while(flag !== 2){
		stuInfo = readInfo(flag);
		flag = TorF(stuInfo);
	}
	push(stuInfo);
	console.log(data);
}

function showInfo() {

}

function menu() {

	const readlineSync = require('readline-sync'),
		menu = ['ADD STUDENT','PRINT TRANSCRIPT'];
		index = readlineSync.keyInSelect(menu, 'Pleace input your choice:');
	eval(funName[index])();
}

function main() {
	menu();
}

main();