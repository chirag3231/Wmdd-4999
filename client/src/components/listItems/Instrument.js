import React from 'react'
import Currency from 'react-currency-formatter'
import Button from '@material-ui/core/Button'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import DisplayCard from '../cards/DisplayCard'
import UpdateInstrument from '../forms/UpdateInstrument'
import RemoveInstrument from '../buttons/RemoveInstrument'

const Instrument = (props) => {
  const { editMode, id, year, brand, type, price, artistId, onButtonClick, onInputChange } = props
  const fullName = `${year} ${brand} ${type}`

  const renderInstrument = () => (
      editMode ?
        <UpdateInstrument
          id={id}
          year={year}
          brand={brand}
          type={type}
          price={price}
          artistId={artistId}
          onButtonClick={onButtonClick}
          onInputChange={onInputChange}
        />
        :
        <ListItem>
          <ListItemText
            primary={fullName}
            secondary={<Currency quantity={price} currency='CAD' />}
          />
          <Button
            onClick={onButtonClick}
            variant='contained'
            style={{ margin: '5px' }}
          >
            Edit
          </Button>
          <RemoveInstrument
            id={id}
            year={year}
            brand={brand}
            type={type}
            price={price}
            artistId={artistId}
          />
        </ListItem>
  )

  return (
    <DisplayCard>
      {renderInstrument()}
    </DisplayCard>
  )
}

export default Instrument