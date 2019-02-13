import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import noImage from './noImage.png'
import Header from './components/Header';
import CardArtist from './components/CardArtist'
import FavoriteCards from './components/FavoriteCards'

const baseUrl = 'http://localhost:3002';

class App extends Component {

  state= {
    cardSearch: [],
    query: '',
    additionalArt: [],
    favCardIds: []
  }

  componentWillMount() {
    axios.get(`${baseUrl}/api/favorites`)
      .then(response => {
        this.setState({
          favCardIds: response.data,
        });
      });
  }

  moreArtist( name ){

    axios.get('https://api.magicthegathering.io/v1/cards?artist=' + name)
      .then(response => {
        this.setState({
          additionalArt: response.data.cards,
        })
      })
  }

  search( event ) {
    event.preventDefault();
    axios.get('https://api.magicthegathering.io/v1/cards?name=' + this.state.query )
    .then(response => {
      this.setState({
        cardSearch: response.data.cards,
      })
    })
  }

  handleSearchChange( event ){
    this.setState({
      query: event.target.value,
    })
  }

  
  addToFavorites( id ){
    axios.post('http://localhost:3002/api/favorites/', { id })
      .then(response => {
        this.setState({
          favCardIds: response.data,
        });
      });
  }

  deleteFromFavorites( id ){
    axios.delete('http://localhost:3002/api/favorites/' + id)
      .then(response => {
        this.setState({
          favCardIds: response.data,
        });
      });
  }
  
 

  render() {
    
    const moreArt = this.state.additionalArt
    const displayCards = this.state.cardSearch.map(cards => (
        <li key={cards.id} className = 'flex-container' >
          <h2 className = 'card-name'>{cards.name}</h2>

          <div className = 'image-display'><img src = {cards.imageUrl || noImage} alt = {cards.name}/></div>
          <div className = 'art-by' >Art by {cards.artist}</div>

          <div id = 'card-artist'>
          <CardArtist moreArt = {moreArt}/>
          </div>

          

          <button className = 'artist-button' 
            type='button' 
            onClick= {() => this.moreArtist(cards.artist)}>
            More by this artist
          </button>

          <button 
            className = 'fav-button'
            type = 'button'
            onClick ={() => this.addToFavorites(cards.id)}
          >
          Add to favorites
          </button>
        </li>
        
      ));

    return (
      <div className="App">

       <Header />
      <form onSubmit={event => this.search(event)} className='input-form'>
        <input 
          placeholder='Card name'
          type='text'
          value = {this.state.query}
          className = 'input-field'
          onChange={event => this.handleSearchChange(event)}  />
        <button type='submit' className='submit-button'>Search</button>
      </form>

      <div className= 'divider-top' />

      {displayCards}

      <FavoriteCards 
        favoriteCards = {this.state.favCardIds}
        onCardDelete={id => this.deleteFromFavorites(id)} />
      </div>
    );
  }
}



export default App;
