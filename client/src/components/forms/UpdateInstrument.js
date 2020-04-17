import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { GET_ARTISTS, UPDATE_INSTRUMENT } from '../../queries'

const UpdateInstrument = (props) => {
  const { id, year, brand, type, price, artistId, onButtonClick, onInputChange } = props
  const [updateInstrument] = useMutation(UPDATE_INSTRUMENT)

  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        updateInstrument({
          variables: {
            id, year, brand, type, price, artistId
          }
        })
        onButtonClick()
      }}
    >
      <TextField
        label='Year'
        defaultValue={year}
        placeholder='i.e. 2019'
        onChange={e => onInputChange('year', e.target.value)}
        type='number'
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='brand'
        defaultValue={brand}
        placeholder='i.e. Apple'
        onChange={e => onInputChange('brand', e.target.value)}
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='type'
        defaultValue={type}
        placeholder='i.e. iPhone'
        onChange={e => onInputChange('type', e.target.value)}
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='Price'
        defaultValue={price}
        placeholder='i.e. 5000'
        onChange={e => onInputChange('price', e.target.value)}
        type='number'
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <Select
        native
        defaultValue='1'
        value={artistId}
        onChange={e => onInputChange('artistId', e.target.value)}
        input={
          <OutlinedInput name='character' id="outlined-age-native-simple" />
        }
        style={{ display: 'flex', margin: '10px' }}
      >
        {data.characters.map(({ id, firstName, lastName }) => (
          <option value={id}>{firstName} {lastName}</option>
        ))}
      </Select>
      <Button
        type='submit'
        variant='contained'
        color='primary'
        style={{ margin: '10px' }}
      >
        Update Instrument
      </Button>
      <Button
        onClick={onButtonClick}
        variant='contained'
        color='secondary'
        style={{ margin: '10px' }}
      >
        Cancel
      </Button>
    </form>
  )
}

export default UpdateInstrument