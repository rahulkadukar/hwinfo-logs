const assert = require('assert')
const { readFileSync, writeFileSync } = require('fs')

const assertCheck = fnData => assert(fnData.errNo === 0, fnData.errMsg)

const formatDate = (date) => {
  let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear().toString().substring(2,4)

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [year, month, day].join('')
}

const fileName = 'hwinfo_' + formatDate(new Date()) + '.log'

const fileContents = readFile(fileName)
assertCheck(fileContents)

const processData = processFile(fileContents.data)

function processFile(inputData) {
  const header = inputData[0]
  console.log(header)
  const headerColumns = header.split(',').length
  console.log(headerColumns)

  for (let x = 1; x < inputData.length; ++x) {
    console.log(inputData[x].split(',').length)
    break
  }
}

function readFile(inputFile) {
  let fileData
  let outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  try {
    fileData = readFileSync(inputFile, 'utf-8')
  } catch (err) {
    consoleError(`ERROR => Unable to read file the ${inputFile}`)
    consoleError(`USAGE => file should be placed in the temp folder`)
    outputData.errMsg = `ERROR => Unable to read the file ${inputFile}`
    outputData.errNo = -1
  } finally {
    if (fileData) {
      outputData.data = fileData.split(/\r\n|\r|\n/).filter((r) => r.length > 0)
    }

    return outputData
  }
}