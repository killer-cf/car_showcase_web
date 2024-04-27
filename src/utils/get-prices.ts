export function getPrices() {
  const prices = []

  for (let i = 10; i <= 1000; ) {
    prices.push((i * 1000).toLocaleString('pt-BR'))
    if (i < 100) {
      i += 10
    } else if (i < 200) {
      i += 20
    } else if (i < 500) {
      i += 50
    } else {
      i += 100
    }
  }

  return prices
}
