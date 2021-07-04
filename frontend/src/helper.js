export function roundUpAmount(amount) {
    const bitness = Math.pow(10, Math.ceil(amount).toString().length - 1)
    const rest = Math.floor(amount % bitness)
    const roundTo = rest >= bitness / 2 ? amount + bitness - rest : amount - rest
    return Math.floor(roundTo)
}
