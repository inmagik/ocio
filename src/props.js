import { Either } from 'ramda-fantasy'
import mapper from './mapper'
const Left = Either.Left
const Right = Either.Right

const getScalarValue = (localValues, field) => result => {
  if (typeof localValues[field] === 'undefined') {
    return Left(new Error(`Bad scalar ${field}`));
  }
  return Right({
    ...result,
    [field]: localValues[field]
  })
}

const getMapperValue = (localValues, globalValues, field, fieldConf) => result => {
  if (typeof localValues[field] === 'undefined') {
    return Left(new Error(`Invalid mapper conf ${field}`))
  }
  if (typeof localValues[field].key === 'undefined') {
    return Left(new Error(`Invalid mapper key for ${field}`))
  }
  if (typeof localValues[field].args === 'undefined') {
    return Left(new Error(`Invalid mapper args for ${field}`))
  }

  const { key, args } = localValues[field]

  if (typeof globalValues[key] === 'undefined') {
    return Left(new Error(`Invalid mapper key for ${field}`))
  }

  const validatedArgs = generateProps(fieldConf.mapper, args, globalValues)
  const mappedValue = validatedArgs.chain((args) => mapper(fieldConf.mapper.type, globalValues[key], args))
  return mappedValue.chain(value => (Right({
    ...result,
    [field]: value
  })))
}

// props = I + local + global
const generateProps = (instructions, localValues, globalValues) => {
  return Object.keys(instructions.fields).reduce((result, field) => {
    const fieldConf = instructions.fields[field]

    if (fieldConf.type === 'SCALAR') {
      return result.chain(getScalarValue(localValues, field))
    } else if (fieldConf.type === 'MAPPER') {
      return result.chain(getMapperValue(localValues, globalValues, field, fieldConf))
    } else {
      return Left(new Error(`Bad instructions unsupported type ${fieldConf.type}`))
    }
  }, Right({}))
}

export default generateProps
