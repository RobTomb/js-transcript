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
	menu();
}
function findMid(arr) {
	return arr.length % 2 === 0 ? (arr[parseInt((arr.length-1)/2)] + arr[arr.length/2]) / 2 : arr[(arr.length-1)/2];
}
function countScore() {
	let totalScore = {mid:0 , avg:0};
	let sum = 0;
	let score = [];
	data.forEach( (item)=>{
		item['sum'] = item.math + item.chinese + item.english + item.progromming;
		item['avg'] = item.sum / 4;
		sum += item.sum;
		score.push(item.sum);
	})
	score = score.sort();
	totalScore.avg = sum / data.length;
	totalScore.mid = findMid(score); 
	return totalScore;
}

const tipId = ['Please input the students id to be printed\n' , 
				'Please enter the information in the correct format\n'];

function readId(flag) {
	const readlineSync = require('readline-sync');
	const format = `id , id , ...`;
	return readlineSync.question(tipId[flag] + '\n' + format + '\n');
}

function isDBCS(str) {
	return str.match(/[^\x00-\xff]/ig);
}

function isTrue(id) {
	if( !isDBCS(id))
		return 2;
	return 1;
}

function formatId(id) {
	return idStr.split(',').map( i => parseInt(i));
}

function formatStu(obj) {
	return `${obj.name}|${obj.math}|${obj.chinese}|${obj.english}|${obj.progromming}|${obj.avg}|${obj.sum}\n`;
}

function printInfo(id) {
	let totalScore = countScore(data);
	let info = `\n成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n========================\n`;

	id.forEach( (item)=>{
		let site = data.findIndex( (obj)=>{
			return obj.id === item;
		})
		if( site !== -1 )
			info += formatStu(data[site]);
	})
	info += `========================\n`;

	info += `全班总分平均数：${totalScore.avg}\n全班总分中位数：${totalScore.mid}`;
	console.log(info);
}

function showInfo() {
	let flag = 0;
	let id = '';
	while(flag !== 2){
		idStr = readId(flag);
		flag = isTrue(idStr);
	}
	id = formatId(id);
	printInfo(id);
}


function menu() {

	const readlineSync = require('readline-sync'),
		menu = ['ADD STUDENT','PRINT TRANSCRIPT'];
		index = readlineSync.keyInSelect(menu, 'Pleace input your choice:');
	if( index !== -1 )
		eval(funName[index])();
}

function main() {
	menu();
}

main();