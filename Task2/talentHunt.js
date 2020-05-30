/*
input comes from a file that is read using node file system,
file name is entered as an arguments in terminal. if file name
is not entered or if file name is not from any of those 3 input 
files in this folder will resolve to error word.
*/
const fs = require('fs')
const inputFilePath = './' + process.argv[2]
if (!process.argv[2]) {
	console.log('You need to enter your input file name')
} else if(process.argv[2] != 'input1.txt' && process.argv[2] != 'input2.txt' && process.argv[2] != 'input3.txt') {
	console.log('You need to enter the correct file name')
} else {
	const input = fs.readFileSync(inputFilePath, 'utf8')
	let inputObj = hashInput(input)
	console.log(main(inputObj))
}
