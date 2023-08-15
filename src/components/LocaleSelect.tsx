import { Select } from "antd"
import { LocaleCode } from "../faker/generatePeople"

type SelectProps = {
    value: LocaleCode,
    setValue: (value: LocaleCode) => void
}

const options: Array<{value: LocaleCode, label: string}> = [
    {
        value: 'en',
        label: 'English'
    },
    {
        value: 'de',
        label: 'German'
    },
    {
        value: 'fr',
        label: 'French'
    }
]

const LocaleSelect = ({ value, setValue }: SelectProps) => {
    return <>
        <Select
            value={value}
            onChange={setValue}
            options={options}
            style={{width: 200}}
        />
    </>
}

export default LocaleSelect