import { Faker, en, de, fr, LocaleDefinition } from "@faker-js/faker"
import { Person } from "../types/Person"

let faker: Faker

const removeRandomCharacter = (str: string): string => {
    if (str.length < 2) return str
    const index = faker.number.int(str.length - 1)
    return str.slice(0, index) + str.slice(index + 1)
}

const addRandomCharacter = (str: string): string => {
    const index = faker.number.int(str.length - 1)
    const character = faker.string.alphanumeric()
    return str.slice(0, index) + character + str.slice(index)
}

const swapRandomCharacters = (str: string): string => {
    if (str.length < 2) return str
    const index = faker.number.int(str.length - 2)
    return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2)
}

const getRandomError = (): ((str: string) => string) => {
    return faker.helpers.arrayElement([
        removeRandomCharacter,
        addRandomCharacter,
        swapRandomCharacters
    ])
}

const getWeightedRandomField = (person: Person): 'name' | 'address' | 'phoneNumber' => {
    return faker.helpers.weightedArrayElement([
        { weight: person.name.length, value: 'name' },
        { weight: person.address.length, value: 'address' },
        { weight: person.phoneNumber.length, value: 'phoneNumber' }
    ])
}

const addError = (person: Person): void => {
    const fieldToCorrupt = getWeightedRandomField(person)
    const corrupt = getRandomError()
    person[fieldToCorrupt] = corrupt(person[fieldToCorrupt])
}

const getExactErrorCount = (errorCount: number): number => {
    const lastErrorProbability = errorCount % 1
    const lastError = faker.helpers.maybe(() => true, {
        probability: lastErrorProbability
    })
    return lastError ? Math.floor(errorCount) + 1 : Math.floor(errorCount)
}

const addErrors = (person: Person, errorCount: number): Person => {
    const exactErrorCount = getExactErrorCount(errorCount)
    const corrupted = person
    for (let i = 0; i < exactErrorCount; i++) {
        addError(corrupted)        
    }
    return corrupted
}

const generateAddress = (): string => {
    const addressParts = [
        faker.helpers.maybe(faker.location.state),
        faker.location.city(),
        faker.location.street(),
        faker.location.buildingNumber(),
        faker.helpers.maybe(faker.location.secondaryAddress)
    ]
    return addressParts.filter(p => p).join(' ')
}

const generatePerson = (seed: number, errorCount: number): Person => {
    faker.seed(seed)
    const person = {
        id: faker.number.int(),
        name: faker.person.fullName(),
        address: generateAddress(),
        phoneNumber: faker.phone.number()
    }
    return addErrors(person, errorCount)
}

const bunchSize = 1000

type LocaleCode = 'en' | 'de' | 'fr'

const getLocale = (localeCode: LocaleCode): LocaleDefinition => {
    const locales = {
        en: en,
        de: de,
        fr: fr
    }
    return locales[localeCode]
}

const getFaker = (localeCode: LocaleCode): Faker => {
    return new Faker({
        locale: getLocale(localeCode)
    })
}

type Options = {
    localeCode: LocaleCode,
    bunch: number,
    from: number,
    amount: number,
    errorCount: number
}

const generatePeople = (options: Options): Person[] => {
    faker = getFaker(options.localeCode)
    const people = []
    const firstSeed = options.bunch * bunchSize + options.from
    for (let i = firstSeed; i < firstSeed + options.amount; i++) {
        people.push(generatePerson(i, options.errorCount))
    }
    return people
}

export default generatePeople
export type { LocaleCode }