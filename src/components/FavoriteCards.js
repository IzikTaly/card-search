import React, { Component } from 'react';
import axios from 'axios';

class FavoriteCards extends Component {
    state = {
        cards: [],
    };

    componentWillReceiveProps(props) {
        Promise.all(props.favoriteCards.map(id => (
            axios.get('https://api.magicthegathering.io/v1/cards/' + id)
                .then(response => response.data)
        )))
            .then(cards => {
                this.setState({
                    cards,
                });
            });
    }

    render() {
        const cards = this.state.cards
            .map(card => (
                <div key={card.card.id} className="card" >
                    <img src = {card.card.imageUrl} alt = {card.card.name} />
                    <button
                        className = 'delete-button'
                        type="button"
                        onClick={() => this.props.onCardDelete(card.card.id)}
                    >
                        Remove
                    </button>
                </div>
            ));
        
        return (
            <div className = 'favorite-box'>
                <h2>Favorites! ♥</h2>
                
                {cards}
            </div>
        );
    }
}

export default FavoriteCards;