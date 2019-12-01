import xlrd
import json

def getSheet(fileName: str = '', index: int = 0):
    location = (fileName)
    workbook = xlrd.open_workbook(location)
    sheet = workbook.sheet_by_index(index)
    return sheet

def main():
    sheet = getSheet(fileName='enfermedades.xlsx', index=0)
    preloadedModel = []

    for column in range(1, 11):
        disease = sheet.cell_value(0, column).capitalize()
        values = []

        for row in range(3, 34):
            content = sheet.cell_value(row, column)
            val = float(content if content != '' else 0)
            values.append(val)

        preloadedModel.append({
            'disease': disease,
            'values': values
        })

    preloadedModel = {
        'preloadedModel': preloadedModel
    }

    print(json.dumps(preloadedModel, indent=2))

if __name__ == '__main__':
    main()