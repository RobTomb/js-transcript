
module.exports = {menu:menu};

const input = require('./input.js');
const output = require('./output.js');

const funName = ['input' , 'output'];

function menu(data) {
	let flag = 0;

	while(flag !== -1 ){
		const readlineSync = require('readline-sync'),
			menu = ['添加学生','生成成绩单'];
			index = readlineSync.keyInSelect(menu, '请输入你的选择:');
		if( index !== -1 )
			eval(funName[index])(data);
		flag = index;
	}
}
