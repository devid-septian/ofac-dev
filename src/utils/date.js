export const parsingDate = (parsingDate) => {
    const date = parsingDate.getDate()
    const month = parsingDate.getMonth() + 1
    const year = parsingDate.getFullYear()
    const dataDob = `${year}-${month}-${date}`
    return dataDob
}
