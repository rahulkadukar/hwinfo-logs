const assert = require('assert')
const { readFileSync } = require('fs')
const fs = require('fs')
const path = require('path')

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

function processData(inputData) {
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0
  outputData.sensorData = []

  //console.log(headerData.data.sensorData)

  for (let x = 1; x < inputData.length; ++x) {
    const sensorRecord = {}
    const rawSensorData = inputData[x].split('|')

    sensorRecord.date = rawSensorData[0]
    sensorRecord.time = rawSensorData[1]
    sensorRecord.tstamp = timeStampFromDateTime(rawSensorData[0], rawSensorData[1])

    // Disk data processing here
    sensorRecord.disk0_temp = rawSensorData[123]
    sensorRecord.disk0_driveFailure = rawSensorData[124]
    sensorRecord.disk0_driveWarning = rawSensorData[125]
    sensorRecord.disk0_totalHostWrites = rawSensorData[126]
    sensorRecord.disk0_totalHostReads = rawSensorData[127]

    sensorRecord.disk1_temp = rawSensorData[128]
    sensorRecord.disk1_driveFailure = rawSensorData[129]
    sensorRecord.disk1_driveWarning = rawSensorData[130]
    sensorRecord.disk1_totalHostWrites = rawSensorData[131]
    sensorRecord.disk1_totalHostReads = rawSensorData[132]

    sensorRecord.disk2_temp = rawSensorData[133]
    sensorRecord.disk2_driveFailure = rawSensorData[134]
    sensorRecord.disk2_driveWarning = rawSensorData[135]
    sensorRecord.disk2_totalHostWrites = rawSensorData[136]
    sensorRecord.disk2_totalHostReads = rawSensorData[137]

    sensorRecord.disk3_temp = rawSensorData[138]
    sensorRecord.disk3_driveFailure = rawSensorData[139]
    sensorRecord.disk3_driveWarning = rawSensorData[140]
    sensorRecord.disk3_totalHostWrites = rawSensorData[141]
    sensorRecord.disk3_totalHostReads = rawSensorData[142]

    sensorRecord.disk4_temp = rawSensorData[143]
    sensorRecord.disk4_driveFailure = rawSensorData[144]
    sensorRecord.disk4_driveWarning = rawSensorData[145]
    sensorRecord.disk4_totalHostWrites = rawSensorData[146]
    sensorRecord.disk4_totalHostReads = rawSensorData[147]

    sensorRecord.disk5_temp = rawSensorData[148]
    sensorRecord.disk5_driveFailure = rawSensorData[149]
    sensorRecord.disk5_driveWarning = rawSensorData[150]
    sensorRecord.disk5_totalHostWrites = rawSensorData[151]
    sensorRecord.disk5_totalHostReads = rawSensorData[152]

    outputData.sensorData.push(sensorRecord)
  }

  const file = fs.createWriteStream('array.txt');
  file.on('error', function(err) { /* error handling */ });
  outputData.sensorData.forEach(function(v) {
    let oStr = `${v.tstamp}|${v.disk0_temp}|${v.disk1_temp}|${v.disk2_temp}|`
    oStr += `${v.disk3_temp}|${v.disk4_temp}|${v.disk5_temp}\n`
    file.write(oStr)
  })
  file.end();
  

  return outputData
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

function readHeaderFile() {
  let fileData
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  const fileName = path.resolve(__dirname, `data/metadata.json`)
  
  try {
    fileData = readFileSync(path.resolve(__dirname, fileName))

    if (fileData) {
      outputData.data = JSON.parse(fileData)
    }
    
    return outputData
  } catch (err) {
    consoleError(`ERROR => Error in processing file ${fileName}`)
    consoleError(`ERROR => ${err}`)
    outputData.errMsg = `ERROR => Error in processing file ${fileName}`
    outputData.errNo = -1
    return outputData
  }
}

function timeStampFromDateTime(inDate, inTime) {
  let tstampData = ''
  
  const dateArr = inDate.split('.')
  const timeArr = inTime.split(':')

  let jsDate = new Date(
    dateArr[2], dateArr[1] - 1, dateArr[0],
    timeArr[0], timeArr[1], timeArr[2]).toISOString()
  
  return jsDate
}

function verifyColumns(inputData) {
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  const header = inputData[0]
  const headerColumns = header.split('|').length

  for (let x = 1; x < inputData.length; x += 1) {
    if ((inputData[x].split('|').length) !== headerColumns) {
      consoleError(`ERROR => Column count mismatch on row ${x}`)
      consoleError(`USAGE => Verify the number of columns on row`)
      outputData.errMsg = `ERROR => Column count mismatch on row ${x}`
      return outputData
    }
  }

  return outputData
}

const fileName = `hwinfo_${formatDate(new Date())}.log`

const fileContents = readFile(fileName)
assertCheck(fileContents)

assertCheck(verifyColumns(fileContents.data))

const headerData = readHeaderFile()
assertCheck(headerData)

const processedData = processData(fileContents.data)
assertCheck(processedData)

console.log(processedData.sensorData)

