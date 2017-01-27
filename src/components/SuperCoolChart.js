import React from 'react'

// THIS IS THE FINAL PIECE THE SUPER COOL CHART FOR RENDERING


export default ({ width, height, data }) => {
  return (
    <div style={{ width }}>
      {data.map((d, index) => (
        <div key={index} style={{ border: '1px solid black', textAlign: 'center', height }}>
          <h3 style={{ color: 'green' }}>X ~> {d.x}</h3>
          <h3 style={{ color: 'red' }}>Y ~> {d.y}</h3>
        </div>
      ))}
    </div>
  )
}
