import { InputNumber, Slider, Space } from "antd"

type ErrorsRangeProps = {
    value: number,
    setValue: (value: number) => void
}

const ErrorsRange = ({ value, setValue }: ErrorsRangeProps) => {
    const onChange = (value: number | null) => {
        if (value) {
            setValue(value)
        }
    }
    
    return <Space size='middle'>
        <Slider
            value={Math.min(value, 10)}
            onChange={setValue}
            min={0}
            max={10}
            step={0.25}
            style={{width: 200}}
        />
        <InputNumber
            value={value}
            onChange={onChange}
            min={0}
            max={1000}
        />
    </Space>
}

export default ErrorsRange