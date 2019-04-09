const assert = require('assert')
const { readFileSync } = require('fs')
const path = require('path')

const assertCheck = fnData => assert(fnData.errNo === 0, fnData.errMsg)
const consoleError = msg => console.error('\x1b[31m%s\x1b[0m', msg)

function displayContents(headerData) {
  const sensorData = headerData.sensorData
  const totalSensors = sensorData.length

  for (let x = 0; x < totalSensors; ++x) {
    let headerLines = sensorData[x].rows
    let totalHeader = headerLines.length
    const allNums = []

    for (let y = 0; y < totalHeader; ++y) {
      const numIndex = headerLines[y].split('-')
      if (numIndex.length === 2) {
        for (let z = parseInt(numIndex[0], 10); z <= parseInt(numIndex[1], 10); ++z) {
          allNums.push(z)
        }
      } else {
        allNums.push(parseInt(headerLines[y], 10))
      }
    }
    console.log(allNums)
  }
}


function readHeaderFile() {
  let fileData
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  const fileName = path.resolve(__dirname, `data/header.json`)
  
  try {
    fileData = readFileSync(path.resolve(__dirname, fileName))

    if (fileData) {
      outputData.data = JSON.parse(fileData)
    }
    
    return outputData
  } catch (err) {
    console.log(err)
    consoleError(`ERROR => Error in processing file ${fileName}`)
    consoleError(`ERROR => ${err}`)
    outputData.errMsg = `ERROR => Error in processing file ${fileName}`
    outputData.errNo = -1
    return outputData
  }
}

const fileContents = readHeaderFile()
assertCheck(fileContents)

const displayHeader = displayContents(fileContents.data)