/*
Read input from .txt file which is chosen from file name
input in terminal. if not including name or file name other
than input1.txt or input2.txt will resolve to an error
e.g to run command: 
node checkCluster.js input1.txt
*/
const fs = require('fs')
const inputFilePath = './' + process.argv[2]
if(!process.argv[2]) {
	console.log('You need to enter your input file name')
} else if(process.argv[2] != 'input1.txt' && process.argv[2]) {
	console.log('You need to enter the correct file name')
} else {
	const input = fs.readFileSync(inputFilePath, 'utf8')
	console.log(demolition(input))
}

