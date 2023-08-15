import { Person } from "../types/Person"
import { stringify } from 'csv-stringify/browser/esm/sync'
import FileSaver from 'file-saver'

const saveFile = (str: string) => {
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" })
    FileSaver.saveAs(blob, "fakePeople.csv")
}

export const exportCsv = (people: Array<Person>) => {
    const csv = stringify(people)
    saveFile(csv)
}