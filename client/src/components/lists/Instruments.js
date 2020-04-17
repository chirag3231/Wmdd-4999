import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_INSTRUMENTS } from '../../queries'

import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'

import InstrumentContainer from '../containers/InstrumentContainer'


const Instruments = (props) => {
  const { loading, error, data } = useQuery(GET_INSTRUMENTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  // console.log(data)

  return (
    <ul>
      {
        data.devices.map(({ id, year, brand, type, price,artistId }) => (          
          (props.artistId ===artistId) ?
          <Container key={id}>
            <List>
              <InstrumentContainer
                key={id}
                id={id}
                year={year}
                brand={brand}
                type={type}
                price={price}
               artistId={artistId}
              />
            </List>
          </Container>
          :
          <span></span>
        ))
      }
    </ul>
  )
}

export default Instruments
