import { useEffect, useState } from "react"
import { GenerationParams } from "./types/GenerationParams"
import GenerationControls from "./components/GenerationControls"
import PersonTable from "./components/PersonTable"
import { Person } from "./types/Person"
import generatePeople from "./faker/generatePeople"
import ExportButton from "./components/ExportButton"

const defaultParams: GenerationParams = {
    locale: 'en',
    seed: 0,
    errorCount: 0
}

function App() {
    const [params, setParams] = useState<GenerationParams>(defaultParams)
    const [people, setPeople] = useState<Array<Person>>([])

    const generate = (from: number, amount: number): Array<Person> => {
        return generatePeople({
            localeCode: params.locale,
            bunch: params.seed,
            from: from,
            amount: amount,
            errorCount: params.errorCount
        })
    }
    
    useEffect(() => {
        setPeople(generate(0, 20))
    }, [params])

    const add = () => {
        const pageSize = 10
        const newPeople = generate(people.length, pageSize)
        setPeople([...people, ...newPeople])
    }

    return (
        <div style={{ padding: 24 }}>
            <GenerationControls
                params={params}
                setParams={setParams}
            />
            <ExportButton people={people} />
            <PersonTable
                people={people}
                add={add}
            />
        </div>
    )
}

export default App
