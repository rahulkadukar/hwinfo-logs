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

  for (let x = 2; x < inputData.length; ++x) {
    const sR = {}
    const rawSD = inputData[x].split('|')
    const prevSD = inputData[x - 1].split('|')

    sR.date = rawSD[0]
    sR.time = rawSD[1]
    sR.tstamp = timeStampFromDateTime(rawSD[0], rawSD[1])

    // RAM data
    sR.virtMemUsed = rawSD[2]
    sR.virtMemAvail = rawSD[3]
    sR.physMemUsed = rawSD[5]
    sR.physMemAvail = rawSD[6]

    // CPU data 
    sR.cpu0_temp = rawSD[24]
    sR.cpu1_temp = rawSD[25]

    // Disk data
    sR.disk0_temp = rawSD[123]
    sR.disk0_driveFailure = rawSD[124]
    sR.disk0_driveWarning = rawSD[125]
    sR.disk0_totalHostWrites = rawSD[126]
    sR.disk0_totalHostReads = rawSD[127]

    sR.disk0_hostWrites = rawSD[126] - prevSD[126]
    sR.disk0_hostReads = rawSD[127] - prevSD[127]
    sR.disk0_hostWriteMB = rawSD[180] - prevSD[180]
    sR.disk0_hostReadMB = rawSD[179] - prevSD[179]

    sR.disk1_temp = rawSD[128]
    sR.disk1_driveFailure = rawSD[129]
    sR.disk1_driveWarning = rawSD[130]
    sR.disk1_totalHostWrites = rawSD[131]
    sR.disk1_totalHostReads = rawSD[132]

    sR.disk1_hostWrites = rawSD[131] - prevSD[131]
    sR.disk1_hostReads = rawSD[132] - prevSD[132]
    sR.disk1_hostWriteMB = rawSD[187] - prevSD[187]
    sR.disk1_hostReadMB = rawSD[186] - prevSD[186]

    sR.disk2_temp = rawSD[133]
    sR.disk2_driveFailure = rawSD[134]
    sR.disk2_driveWarning = rawSD[135]
    sR.disk2_totalHostWrites = rawSD[136]
    sR.disk2_totalHostReads = rawSD[137]

    sR.disk2_hostWrites = rawSD[136] - prevSD[136]
    sR.disk2_hostReads = rawSD[137] - prevSD[137]
    sR.disk2_hostWriteMB = rawSD[194] - prevSD[194]
    sR.disk2_hostReadMB = rawSD[193] - prevSD[193]

    sR.disk3_temp = rawSD[138]
    sR.disk3_driveFailure = rawSD[139]
    sR.disk3_driveWarning = rawSD[140]
    sR.disk3_totalHostWrites = rawSD[141]
    sR.disk3_totalHostReads = rawSD[142]

    sR.disk3_hostWrites = rawSD[141] - prevSD[141]
    sR.disk3_hostReads = rawSD[142] - prevSD[142]
    sR.disk3_hostWriteMB = rawSD[201] - prevSD[201]
    sR.disk3_hostReadMB = rawSD[200] - prevSD[200]

    sR.disk4_temp = rawSD[143]
    sR.disk4_driveFailure = rawSD[144]
    sR.disk4_driveWarning = rawSD[145]
    sR.disk4_totalHostWrites = rawSD[146]
    sR.disk4_totalHostReads = rawSD[147]

    sR.disk4_hostWrites = rawSD[146] - prevSD[146]
    sR.disk4_hostReads = rawSD[147] - prevSD[147]
    sR.disk4_hostWriteMB = rawSD[208] - prevSD[208]
    sR.disk4_hostReadMB = rawSD[207] - prevSD[207]

    sR.disk5_temp = rawSD[148]
    sR.disk5_driveFailure = rawSD[149]
    sR.disk5_driveWarning = rawSD[150]
    sR.disk5_totalHostWrites = rawSD[151]
    sR.disk5_totalHostReads = rawSD[152]

    sR.disk5_hostWrites = rawSD[151] - prevSD[151]
    sR.disk5_hostReads = rawSD[152] - prevSD[152]
    sR.disk5_hostWriteMB = rawSD[166] - prevSD[166]
    sR.disk5_hostReadMB = rawSD[165] - prevSD[165]
    if (x === 244){ console.log(sR) }
    outputData.sensorData.push(sR)
  }

  const workDir = '/home/rahul/code/logs/hwinfo-logs'
  const outputFile = fs.createWriteStream(path.resolve(workDir, 'datafile.private'))
  outputFile.on('error', function(err) { /* error handling */ });
  outputData.sensorData.forEach(function(v) {
    let oStr = `${v.tstamp}|${v.virtMemUsed}|${v.virtMemAvail}|${v.physMemUsed}|${v.physMemAvail}|`
    oStr += `${v.cpu0_temp}|${v.cpu1_temp}|`
    oStr += `${v.disk0_temp}|${v.disk1_temp}|${v.disk2_temp}|`
    oStr += `${v.disk3_temp}|${v.disk4_temp}|${v.disk5_temp}|`
    oStr += `${v.disk0_hostReads}|${v.disk0_hostWrites}|${v.disk1_hostReads}|${v.disk1_hostWrites}|`
    oStr += `${v.disk2_hostReads}|${v.disk2_hostWrites}|${v.disk3_hostReads}|${v.disk3_hostWrites}|`
    oStr += `${v.disk4_hostReads}|${v.disk4_hostWrites}|${v.disk5_hostReads}|${v.disk5_hostWrites}|`
    oStr += `${v.disk0_hostReadMB}|${v.disk0_hostWriteMB}|${v.disk1_hostReadMB}|${v.disk1_hostWriteMB}|`
    oStr += `${v.disk2_hostReadMB}|${v.disk2_hostWriteMB}|${v.disk3_hostReadMB}|${v.disk3_hostWriteMB}|`
    oStr += `${v.disk4_hostReadMB}|${v.disk4_hostWriteMB}|${v.disk5_hostReadMB}|${v.disk5_hostWriteMB}\n`
    outputFile.write(oStr)
  })
  outputFile.end();

  return outputData
}

function readFile(inputFile) {
  let fileData
  const outputData = {}
  outputData.errMsg = ''
  outputData.errNo = 0

  const workDir = '/home/rahul/code/logs/hwinfo-logs'

  try {
    fileData = readFileSync(path.resolve(workDir, inputFile), 'utf-8')
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

  const workDir = '/home/rahul/code/logs/hwinfo-logs'
  const fileName = `data/metadata.json`
  
  try {
    fileData = readFileSync(path.resolve(workDir, fileName))

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

// console.log(processedData.sensorData)

