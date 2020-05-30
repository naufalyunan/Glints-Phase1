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
} else if(process.argv[2] != 'input1.txt' && process.argv[2] != 'input2.txt') {
	console.log('You need to enter the correct file name')
} else {
	const input = fs.readFileSync(inputFilePath, 'utf8')
	console.log(demolition(input))
}

function checkNeighbour (arr, i, j, count) {
	/*
	check the elements around the [i, j] element if it is not a 0,
	increment counter, put it in dictionary, turn that element to 0
	and set condition to true. do this until all elements around [i, j] is checked
	*/
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
	/*
	if  condition is true recurse the function in [m, n position] with
	the updated array. if false, then return the counter
	*/
	if(condition) {
		return checkNeighbour(arr, m, n, count)
	} else {
		return count++
	}
}

function demolition(str) {
	/*
	change input string into array
	*/
	let inputArr = str.split('\n')
	inputArr.forEach((el, i, arr) => {
		let temp = el.split('')
		arr[i] = temp
	})
	/*
	call checkNeighbour for each element in the input, if count > 1 
	increment the distinct cluster
	*/
	let output = 0
	for(let i = 0; i < inputArr.length; i++) {
		for(let j = 0; j < inputArr[i].length; j++) {
			let count = 0
			count = checkNeighbour(inputArr, i, j ,count)
			if(count > 1) {
				output++
			}
		}
	}
	return output
}