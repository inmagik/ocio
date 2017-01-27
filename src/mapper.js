// MAP ALL THE THINGS!

import { Either } from 'ramda-fantasy'
import { identity, find } from 'ramda'
const Left = Either.Left
const Right = Either.Right

const swapKeys = (rows, swappings) => {
  const swappedRows = rows.map(row => {
    return Object.keys(swappings).reduce((r, key) => {
      return r.chain(r => {
        if (typeof row[swappings[key]] === 'undefined') {
          return Left(new Error(`Invalid swapping key ${swappings[key]}`))
        }
        return Right({ ...r, [key]: row[swappings[key]] })
      })
    }, Right({}))
  })
  // TODO BAD BAD APPROACH FIND A BETTER WAY!
  // This is only for check one of collection is bad swapped and
  // extract real correct value from monads...
  const wrongSwappedRow = find(r => r.isLeft)(swappedRows)
  if (wrongSwappedRow) {
    return wrongSwappedRow
  }
  return Right(swappedRows.map(row => Either.either(identity, identity)(row)))
}

export default (type, rows, args) => {
  switch (type) {
    case 'SWAP_KEYS':
      return swapKeys(rows, args)
    default:
      return Left(new Error(`Unsupported mapper ${type}.`))
  }
}
