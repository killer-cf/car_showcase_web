export function getPrices() {
  const prices = []

  for (let i = 10; i <= 1000; ) {
    prices.push(i * 1000)
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

export const prices = getPrices().map((price) => ({
  key: price.toString(),
  value:
    'Até ' +
    price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
}))
