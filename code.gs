function doGet() {
 return HtmlService.createTemplateFromFile('index').evaluate()
 .addMetaTag('viewport', 'width=device-width, initial-scale=1')
 .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
}

/** @Include Files */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/** เชื่อม Spreadsheet */
function getData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Mix")
  const dataRange = ws.getRange("A1").getDataRegion() // CMD+A
  const data = dataRange.getDisplayValues()
 Logger.log(data)
// แยกส่วนหัวออกจากข้อมูล
  const headers = data.shift()

// แมพ data ลงในตัวแปล jsData แล้วใช้คำสั่งเล่นกับข้อมูล
  const jsData = data.map(r =>{
    const tempObject = {}
    headers.forEach((headers,i) =>{
      tempObject[headers] = r[i]
    })
    return  tempObject
      
  })
// console.log(jsData)
    return jsData
}

/** ฟังก์ชันแก้ไข */
function editCell(props){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Mix")
    const ws2 = ss.getSheetByName("Sum")
  const idCellMatched =  ws.getRange("A2:A").createTextFinder(props.id).matchEntireCell(true).matchCase(true).findNext()
  const collumnCellMatched =  ws.getRange("1:1").createTextFinder(props.field).matchEntireCell(true).matchCase(true).findNext()
  if(idCellMatched === null) throw new Error("No Matching Record")
  if(collumnCellMatched === null) throw new Error("Invalid")
 const recordRowNumber = idCellMatched.getRow()
 const recordColumnNumber = collumnCellMatched.getColumn()
  ws.getRange(recordRowNumber,recordColumnNumber).setValue(props.val)
  const dataAfterDelete = ws2.getRange(2,1,1,3).getDisplayValues()
  return dataAfterDelete
}


/** ฟังก์ชันลบ */
function deleteRecord(props){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Mix")
  const ws2 = ss.getSheetByName("Sum")

const idCellMatched =  ws.getRange("A2:A").createTextFinder(props.id).matchEntireCell(true).matchCase(true).findNext()
  if(idCellMatched === null) throw new Error("No Matching Record")
const recordRowNumber = idCellMatched.getRow()
  ws.deleteRow(recordRowNumber)

  const dataAfterDelete = ws2.getRange(2,1,1,3).getDisplayValues()
  return dataAfterDelete
}


/** ฟังก์ชันเพิ่มข้อมูลด้วย form */ 
function expenseData(exp){
  const ss = SpreadsheetApp.getActive().getSheetByName("Mix")
  const timestamp = new Date().getTime().toString()
  const newID = timestamp.substring(0,4) +"-"+ timestamp.substring(4)
  ss.appendRow([
    newID,
    exp.type,
    exp.data1,
    exp.data2
  ])
  return (exp)
}


/** // ฟังก์ชันเพิ่มข้อมูลรายได้ด้วย form 2 */
function incomeData(inc){
  const ss = SpreadsheetApp.getActive().getSheetByName("Mix")
  const timestamp = new Date().getTime().toString()
  const newID = timestamp.substring(0,4) +"-"+ timestamp.substring(4)
  ss.appendRow([
    newID,
    inc.type,
    inc.list,
    inc.income
    ])
  return (inc)
}

/** Summary DataTable */ 
function getDatatable(){
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const ws = ss.getSheetByName("Sum")
  const data2 = ws.getDataRange().getDisplayValues()
  data2.shift()
  Logger.log(data2)
  return data2
}


