import React from 'react'
import { connect } from 'react-redux'
import SuperCoolChart from './SuperCoolChart'
import Adapter from './Adapter'

const I = {
  fields: {
    width: { type: 'SCALAR' },
    height: { type: 'SCALAR' },
    n: { type: 'SCALAR' },
    data: {
      type: 'MAPPER',
      mapper: {
        type: 'SWAP_KEYS',
        fields: {
          x: { type: 'SCALAR' },
          y: { type: 'SCALAR' }
        }
      }
    }
  }
}
const SuperCoolChartAdapter = Adapter(SuperCoolChart, I)


const Board = ({ data }) => (
  <div>
    OCIO!
    <SuperCoolChartAdapter namespace={'pippo'} />
    {/* <SuperCoolChart width='300px' height='100px' data={data}  /> */}
  </div>
)

export default Board
// export default connect((state) => ({
//   data: (state.sources['cities'] || []).map(d => ({ x: d.name, y: d.population }))
// }))(Board)
