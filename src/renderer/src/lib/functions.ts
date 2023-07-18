export const refactorMilliseconds = (milliseconds: number): string => {
  let days = Math.floor(milliseconds / (86400 * 1000))
  milliseconds -= days * (86400 * 1000)
  let hours = Math.floor(milliseconds / (60 * 60 * 1000))
  milliseconds -= hours * (60 * 60 * 1000)
  let minutes = Math.floor(milliseconds / (60 * 1000))
  return `${days} days\t${hours} hours\t${minutes} minutes`
}
