import React, { Component } from 'react'

import AddInstrument from '../forms/AddDevice'
const uuidv4 = require('uuid/v4')

class AddInstrumentContainer  extends Component {
  state = {
    id: uuidv4(),
    year: '',
    brand: '',
    type: '',
    price: '',
    artistId: ''
  }

  handleInputChange = (key, value) => {
    this.setState({ [key]: value })
  }

  handleChange = event => {
    this.setState({
      artistId: event.target.value
    })
  };

  render() {
    const { id, year, brand, model, price, artistId } = this.state
    return (
      <AddDevice
        id = {id}
        year = {year}
        brand = {brand}
        model = {model}
        price = {price}
        artistId = {artistId}
        onInputChange={this.handleInputChange}
      />
    )
  }
}

export default AddInstrumentContainer 