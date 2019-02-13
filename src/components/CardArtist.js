import React, {Component} from 'react';
import App from '../App.js'
import noImage from '../noImage.png'

class CardArtist extends Component{
    render(){
        const cardArt = this.props.moreArt.slice(0, 10).map( artistCard => (
            <li key={artistCard.id} className = 'card-artist'>
                <img src= {artistCard.imageUrl || noImage} />
            </li>
        ));
        return(cardArt);
    }
}

export default CardArtist