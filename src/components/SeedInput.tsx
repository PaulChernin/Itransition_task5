import { faker } from "@faker-js/faker"
import { Button, InputNumber } from "antd"

type SeedInputProps = {
    value: number,
    setValue: (value: number) => void
}

const SeedInput = ({ value, setValue }: SeedInputProps) => {
    const onChange = (value: number | null) => {
        if (value !== null) {
            setValue(value)
        }
    }

    const max = 100000

    const setRandom = () => {
        setValue(faker.number.int(max))
    }
    
    return <>
        <InputNumber
            value={value}
            onChange={onChange}
            min={0}
            max={max}
            addonAfter={<Button type="text" onClick={setRandom}>Random</Button>}
        />
        
    </>
}

export default SeedInput