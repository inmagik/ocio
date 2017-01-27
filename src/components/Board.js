import React from 'react'
import { connect } from 'react-redux'
import SuperCoolChart from './SuperCoolChart'
import DataSource from './DataSource'
import Adapter from './Adapter'

const I = {
  fields: {
    width: { type: 'SCALAR' },
    height: { type: 'SCALAR' },
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
    <div>
      <DataSource namespace={'cities'} />
      <DataSource namespace={'friends'} />
    </div>
    <div>
      <SuperCoolChartAdapter namespace={'pippo'} />
      <SuperCoolChartAdapter namespace={'kawabonga'} />
    </div>
  </div>
)

export default Board
