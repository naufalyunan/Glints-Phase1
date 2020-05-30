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

/*
change input from string into lists of jobs and candidates
*/
function hashInput(str) {
	const arr = str.split('\n')
	const inputArr = arr.map(el => el.split(' '))
	let job = []
	let candidate = []
	const middle = Math.floor(inputArr.length / 2)
	/*
	assign each element of jobs list and candidates list a
	weight of value
	*/
	for (let i = 0; i < inputArr.length; i++) {
		let helper = {}
		let weightJob = inputArr[i].length - 1
		let weightC = inputArr[i].length - 1
		if(inputArr[i].length > 1) {
			for (let j = 0; j < inputArr[i].length; j++) {
				let key = inputArr[i][0].slice(0, -1)
				if(j == 0) {
					helper[key] = []
					if(i < middle) {
						job.push(helper)
					} else {
						candidate.push(helper)
					}
				} else {
					if(i < middle) {
						let objJob = {
							value: inputArr[i][j],
							weight: weightJob
						}
						helper[key].push(objJob)
						weightJob--
					} else {
						let objC = {
							value: inputArr[i][j],
							weight: weightC
						}
						helper[key].push(objC)
						weightC--
					}
				}
				
			}
		}
	}
	/*
	return an object containing both jobs lists and 
	candidates lists
	*/
	let nodes = {
		jobs: job,
		candidates: candidate
	}
	return nodes
}

/*
create a function that updates an input that returns a new input
*/
function updateInput(input, candidate, job) {
	for (let i = 0; i < input.jobs.length; i++) {
		let jobKey = Object.keys(input.jobs[i])[0]
		let candidateKey = Object.keys(input.candidates[i])[0]
		/*
		loop through both jobs lists and candidates lists, if a given candidate and job
		from an argument is found, delete it because both of them is a pair already and 
		each of the element have 1-1 relation
		*/
		for (let j = 0; j < input.candidates[i][candidateKey].length; j++) {
			let conditionC = false
			if(input.candidates[i][candidateKey] && input.candidates[i][candidateKey][j].value == job[0]) {
				input.candidates[i][candidateKey].splice(j, 1)
				conditionC = true
			}
			if (conditionC) {
				j--
			}
		}

		for (let k = 0; k < input.jobs[i][jobKey].length; k++) {
			let conditionJ = false
			if(input.jobs[i][jobKey][k] && input.jobs[i][jobKey][k].value == candidate ) {
				input.jobs[i][jobKey].splice(k, 1)
				conditionJ = true
			}
			if(conditionJ) {
				k--
			}
		}
	}
	/*
	delete a lists for a given candidate and job from the argument
	*/
	let indexC = input.candidates.findIndex(el => Object.keys(el) == candidate)
	let indexJ = input.jobs.findIndex(el => Object.keys(el) == job[0])
	input.candidates.splice(indexC, 1)
	input.jobs.splice(indexJ, 1)
	
	return input
}

/*
find maximum value from an input object. return the key of the 
maximum value if found, else return false
*/
function findMax(obj, key) {
	const arrValues = Object.values(obj[key])
	const arrKeys = Object.keys(obj[key])
	const maxValue = Math.max(...arrValues)
	let count = 0
	arrValues.forEach(el => {
		if(el === maxValue) {
			count++
		}
	})
	if(count > 1) {
		return false
	} else {
		const indexMax = arrValues.indexOf(maxValue)
		return arrKeys[indexMax]
	}
}

/*
make function to find pair of job and candidate with an argument 
of input, output, keyToCheck.
*/
function findPair(input, output, keyToCheck = null) {
	let helper = {}
	// base case of recursion
	if(input.jobs.length === 0) {
		return output
	}
	/*
	if there are more than max value, check the next key of
	the input first!
	*/
	let key
	let idx
	if(keyToCheck) {
		if(!helper[Object.keys(input.jobs[1])]) {
			helper[Object.keys(input.jobs[1])] = {}
		}
		key = Object.keys(input.jobs[1])
		idx = 1
	} else {
		if(!helper[Object.keys(input.jobs[0])]) {
			helper[Object.keys(input.jobs[0])] = {}
		}
		key = Object.keys(input.jobs[0])
		idx = 0
	}
	/*
	find the weight of each job of the element in the array with
	a corresponding candidate
	*/
	for (let j = 0; j < input.jobs[idx][key].length; j++) {
		let fromJobs = input.jobs[idx][key][j]
		const indexCandidate = input.candidates.findIndex(el => Object.keys(el) == fromJobs.value)
		const indexJob = input.candidates[indexCandidate][fromJobs.value].findIndex(el => el.value == key)
		let fromCandidate = input.candidates[indexCandidate][fromJobs.value][indexJob]
		let sumWeight = fromJobs.weight + fromCandidate.weight
		helper[key][fromJobs.value] = sumWeight	
	}
	/*
	find the maximum value for each job
	*/
	let maxValue = findMax(helper, key)
	/*
	if maxValue is found, recurse with newInput, else recurse
	with the same input and assign true to keyToCheck so the function
	check the next key of the input
	*/
	if(maxValue) {
		let newInput = updateInput(input, maxValue, key)
		output += `${maxValue} ${key[0]}\n`
		return findPair(newInput, output)
	} else {
		return findPair(input, output, true)
	}
}

/*
sort output to make in in order like c1,c2,c3,c4.
*/
function sortOutput(output) {
	const outputHelperArr = output.split('\n')
	const outputArr = outputHelperArr.map(el => el.split(' '))
	outputArr.pop()
	outputArr.sort((a, b) => a[0][1] - b[0][1])
	let sortedOutput = outputArr.map(el => el.join(' ')).join('\n')
	return sortedOutput
}

function main (input) {
	let output = ''
	output = findPair(input, output)
	return sortOutput(output)
}