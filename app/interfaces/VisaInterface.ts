export default interface VisaInterface {
    visaId: number,
    name: string,
    processTimeInDays: number,
    feesLow: number,
    feesHigh: number,
    countryCode: string,
    region: string,
    gdpRank: number,
    hasRoadToCitizenship: boolean,
    hasPerks: boolean
}