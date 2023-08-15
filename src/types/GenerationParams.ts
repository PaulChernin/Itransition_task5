import { LocaleCode } from "../faker/generatePeople"

export type GenerationParams = {
    locale: LocaleCode,
    seed: number,
    errorCount: number   
}