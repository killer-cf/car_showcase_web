export function getKms() {
  const kms = []

  for (let i = 10; i <= 200; ) {
    kms.push((i * 1000).toLocaleString('pt-BR'))
    i += i < 100 ? 10 : 20
  }

  return kms
}
