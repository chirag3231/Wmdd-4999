import React from 'react'

import '../../App'
import Container from '@material-ui/core/Container'

import AddArtistContainer from '../containers/AddCharacterContainer'
import AddInstumentContainer from '../containers/AddInstumentContainer'

import Title from '../layout/Title'
import Artists from '../lists/Artists'

const Home = () => {
  return (
    <Container className='App'>
      <Title />
      <AddArtistContainer />
      <AddInstumentContainer />
      <Artists />
    </Container>
  )
}

export default Home
