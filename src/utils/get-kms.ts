export function getKms() {
  const kms = [{ key: 'qualquer', value: 'Qualquer' }]

  for (let i = 10; i <= 200; ) {
    const value = i * 1000
    kms.push({
      key: value.toString(),
      value: value.toLocaleString('pt-BR') + ' ou menor',
    })
    i += i < 100 ? 10 : 20
  }

  return kms
}
