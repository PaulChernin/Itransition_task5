import { Button } from "antd"
import { Person } from "../types/Person"
import { exportCsv } from "../utils/exportCsv"

type ExportButtonProps = {
    people: Array<Person>
}

const ExportButton = ({ people }: ExportButtonProps) => {
    return <>
        <Button onClick={() => exportCsv(people)}>Export CSV</Button>
    </>
}

export default ExportButton