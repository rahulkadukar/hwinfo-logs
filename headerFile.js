const assert = require('assert')
const { readFileSync } = require('fs')

const assertCheck = fnData => assert(fnData.errNo === 0, fnData.errMsg)
const consoleError = msg => console.error('\x1b[31m%s\x1b[0m', msg)

const formatDate = (date) => {
  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear().toString().substring(2, 4)

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('')
}

function readFile(inputFile) {
  let fileData
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  try {
    fileData = readFileSync(inputFile, 'utf-8')
    if (fileData) {
      outputData.data = fileData.split(/\r\n|\r|\n/).filter(r => r.length > 0)
    }

    return outputData
  } catch (err) {
    consoleError(`ERROR => Unable to read file the ${inputFile}`)
    consoleError('USAGE => file should be placed in the temp folder')
    outputData.errMsg = `ERROR => Unable to read the file ${inputFile}`
    outputData.errNo = -1

    return outputData
  }
}

function writeHeader(inputData) {
  const header = inputData[0].split(',')
  const headerColumns = header.length

  for (let x = 0; x < headerColumns; x += 1) {
    console.log(header[x])
  }
}

const fileName = `hwinfo_${formatDate(new Date())}.log`

const fileContents = readFile(fileName)
assertCheck(fileContents)

writeHeader(fileContents.data)
