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

function checkNeighbour (arr, i, j, count) {
	let condition = false
	let dict = {}
	dict[[i, j]] = true
	let m, n
	for(let k = i - 1; k <= i + 1; k++) {
		if(arr[k] !== undefined) {
			for (let l = j - 1; l <= j + 1; l++) {
				if (arr[k][l] !== undefined) {
					if(arr[k][l] !== '0') {
						if(!dict[k, l]) {
							dict[[k, l]] = true
						}
						count++
						m = k
						n = l
						condition = true
						arr[k][l] = '0'
					}
				}
			}
		}
	}
	if(condition) {
		return checkNeighbour(arr, m, n, count)
	} else {
		return count++
	}
}