// @ts-nocheck
import Excel from 'exceljs'

// 具体 api 参考 exceljs 官网文档
export type ExcelColumn = { header: string; key: string; style: Object; [key: string]: any }

export interface ExcelOptions {
  filename: string
  columns: ExcelColumn[]
  data: Record<string, any>[]
  firstRowStyle?: Record<string, any>
}

const defaultOptions = {
  filename: 'excel.xlsx',
  columns: [],
  data: [],
  firstRowStyle: { font: { size: 10, bold: true } }
}

export async function exportExcel(options: ExcelOptions) {
  options = { ...defaultOptions, ...(options || {}) }
  const { filename, columns, firstRowStyle, data: rows } = options

  const workbook = new Excel.Workbook()
  const worksheet = workbook.addWorksheet()

  worksheet.columns = columns
  worksheet.addRows(rows)

  autoWidth(worksheet, 10, columns)
  setFirstRowStyle(worksheet, columns, firstRowStyle)

  const buffer = await workbook.xlsx.writeBuffer()
  await writeFile(filename, buffer)

  // workbook.xlsx.writeFile(filename).then(function () {
  //   console.log('file is written')
  //   res.sendFile(tempFilePath, function (err) {
  //     console.log('---------- error downloading file: ' + err)
  //   })
  // })
}

const setFirstRowStyle = (worksheet, columns, style) => {
  Object.keys(style).forEach(key => {
    const row = worksheet.getRow(1)
    columns.forEach((col, index) => {
      row.getCell(index + 1)[key] = style[key]
      row.getCell(index + 1).alignment = { horizontal: 'center' }
    })
  })
}

const autoWidth = (worksheet, minimalWidth = 10, columns = []) => {
  worksheet.columns.forEach((column, index) => {
    if (columns[index]?.width) {
      column.width = columns[index].width
    } else {
      let maxColumnLength = 0
      column.eachCell({ includeEmpty: true }, cell => {
        maxColumnLength = Math.max(
          maxColumnLength,
          minimalWidth,
          cell.value ? cell.value.toString().length : 0
        )
      })
      column.width = maxColumnLength + 2
    }
  })
}

const autoHeight = worksheet => {
  const lineHeight = 12 // height per line is roughly 12
  worksheet.eachRow(row => {
    let maxLine = 1
    row.eachCell(cell => {
      maxLine = Math.max(cell.value.split('\n').length - 1, maxLine)
    })
    row.height = lineHeight * maxLine
  })
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

export const writeFile = async (
  filename: string,
  content: any,
  options: Record<string, any> = {}
) => {
  const a = document.createElement('a')
  const blob = new Blob([content], { type: 'text/plain', ...options })
  a.download = filename
  a.href = URL.createObjectURL(blob)
  a.click()
  await delay(100)
  a.remove()
}

export const writeBase64File = async (
  filename: string,
  base64Str: string,
  options?: Record<string, any> = {}
) => {
  const bStr = atob(base64Str)
  let n = bStr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bStr.charCodeAt(n)
  }
  await writeFile(filename, u8arr, options)
}
