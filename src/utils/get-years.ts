export function getYears() {
  const currentYear = new Date().getFullYear() + 1
  const years = []

  for (let i = 0; i < 50; i++) {
    years.push(currentYear - i)
  }

  return years
}
