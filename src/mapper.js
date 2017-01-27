// MAP ALL THE THINGS!

const swapKeys = (data, swappings) => {
  return data.map(d => {
    return Object.keys(swappings).reduce((r, key) => ({
      ...r,
      [key]: typeof swappings[key] !== 'undefined' ? d[swappings[key]] : undefined
    }), {})
  })
}

export default (type) => {
  switch (type) {
    case 'SWAP_KEYS':
      return swapKeys
    default:
      throw new Error(`Unsupported mapper ${type}.`)
  }
}
