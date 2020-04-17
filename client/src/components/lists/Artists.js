import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ARTISTS } from '../../queries'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'

import ArtistContainer from '../containers/ArtistContainer'

const Artists = () => {
  const { loading, error, data } = useQuery(GET_CHARACTERS)
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`
  // console.log(data)
  return (
    <ul>
      {data.characters.map(({ id, firstName, lastName }) => (
        <Container key={id}>
          <List>
            <ArtistContainer
              key={id}
              id={id}
              firstName={firstName}
              lastName={lastName}
            />
          </List>
        </Container>
      ))}
    </ul>
  )
}

export default Artists
