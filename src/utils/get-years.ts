export function getYears() {
  const currentYear = new Date().getFullYear()
  const years = []

  for (let i = 0; i < 50; i++) {
    years.push(currentYear - i)
  }

  return years
}
