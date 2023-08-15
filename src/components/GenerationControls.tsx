import { Form } from "antd"
import { GenerationParams } from "../types/GenerationParams"
import ErrorsRange from "./ErrorsRange"
import LocaleSelect from "./LocaleSelect"
import SeedInput from "./SeedInput"

type ControlsProps = {
    params: GenerationParams,
    setParams: (params: GenerationParams) => void
}

const GenerationControls = ({ params, setParams }: ControlsProps) => {
    return <Form labelAlign="left" labelCol={{span: 4}}>
        <Form.Item label='Locale:'>
            <LocaleSelect
                value={params.locale}
                setValue={value => setParams({ ...params, locale: value })}
            />
        </Form.Item>
        <Form.Item label='Errors number:'>
            <ErrorsRange
                value={params.errorCount}
                setValue={value => setParams({ ...params, errorCount: value })}
            />
        </Form.Item>
        <Form.Item label='Seed:'>
            <SeedInput
                value={params.seed}
                setValue={value => setParams({ ...params, seed: value })}
            />
        </Form.Item>
    </Form>
}

export default GenerationControls