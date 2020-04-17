import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'

import Button from '@material-ui/core/Button'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { ADD_INSTRTUMENT, GET_INSTRUMENTS, GET_ARTISTS } from '../../queries'

const AddInstrument = ({ id, year, brand, type, price, characterId, onInputChange }) => {
  const [AddInstrument] = useMutation(
    ADD_INSTRTUMENT,
    {
      update(cache, { data: { AddInstrument } }) {
       
        const { devices } = cache.readQuery({ query: GET_INSTRUMENTS })
        cache.writeQuery({
          query: GET_INSTRUMENTS,
          data: { devices: devices.concat([AddInstrument])}
        })
      }
    }
  )

  const { loading, error, data } = useQuery(GET_ARTISTS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  return (
    <form onSubmit={e => {
      e.preventDefault()
      AddInstrument({
        variables: {
          id, year, brand, type, price, characterId
        },
        optimisticResponse: {
          __typename: 'Mutation',
          AddInstrument: {
            __typename: 'Device',
            id, 
            year, 
            brand, 
            type, 
            price, 
            artistId
          }
        }
      })
    }}>
     <TextField
        label='Year'
        defaultValue='2019'
        value={year}
        placeholder='i.e. 2019'
        onChange={e => onInputChange('year', e.target.value)}
        type='number'
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='Brand'
        defaultValue='amaha'
        value={brand}
        placeholder='i.e. Acoustic Guitar'
        onChange={e => onInputChange('brand', e.target.value)}
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='Model'
        defaultValue='Guitar'
        value={type}
        placeholder='i.e. Guitar'
        onChange={e => onInputChange('type', e.target.value)}
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <TextField
        label='Price'
        defaultValue='1500'
        value={price}
        placeholder='i.e. 1500'
        onChange={e => onInputChange('price', e.target.value)}
        type='number'
        margin='normal'
        variant='outlined'
        style={{ display: 'flex', margin: '10px' }}
      />
      <Select
        native
        defaultValue='1'
        value={characterId}
        onChange={e => onInputChange('characterId', e.target.value)}
        input={
          <OutlinedInput name='device' id="outlined-age-native-simple" />
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
        style={{ marginTop: '20px', alignItems: 'center', marginLeft: '10px' }}
      >
        Add Instrument
      </Button>
    </form>
  )
}

export default AddInstrument