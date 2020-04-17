import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import filter from 'lodash/filter'
import Button from '@material-ui/core/Button'
import { GET_ARTISTS, REMOVE_ARTIST } from '../../queries'


const RemoveArtist = ({ id, firstName, lastName}) => {
    const [removeArtist] = useMutation(
      REMOVE_ARTIST,
      {
        update(cache, { data: { removeArtist } }) {
          const { artists} = cache.readQuery({
            query: GET_ARTISTS
          })
          cache.writeQuery({
            query: GET_ARTISTS,
            data: { artists: filter(artists, c => { return c.id !== removeArtist.id })}
          })
        }
      }
    )
  return (
    <Button  onClick={e => {
      e.preventDefault()
      removeArtist({
        variables: {
          id
        },
        optimisticResponse: {
          __typename: 'Mutation',
          removeArtist: {
            __typename: 'Artist',
            id,
            firstName,
            lastName
          }
        }
      })
    }}
      variant='contained'
      color='secondary'
      style={{ margin: '10px' }}
    variant='contained' color='secondary' style={{ margin: '10px' }}> 
      Delete
    </Button>
  )
}

export default RemoveArtist
