import React, { PropTypes, Component } from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {red500, green500, lightBlack} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Email from 'material-ui/svg-icons/communication/email';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

export default class Shelf extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <List>
        <Subheader>Liste des produits</Subheader>
        {this.props.products.map((prd, i) => (
          <div key={i}>
            <Divider inset={true} />
            <ListItem
              primaryText={<span>{prd.name} <small>({prd.portion_description.toUpperCase()})</small> <small style={{color: lightBlack}}>– {prd.brand}</small></span>}
              secondaryTextLines={2}
              secondaryText={
                <p>
                  {
                    prd.stock ? <span><b>Prix</b>: <span style={{color: lightBlack}}>{prd.price/100}&euro;</span></span> : <strong style={{color: red500}}>Epuisé</strong>
                  }
                  <br />
                  <b>Catégorie</b>: <span style={{color: lightBlack}}>{prd.category}</span>
                </p>
              }
              leftAvatar={<Avatar src={prd.picture} />}
              rightIconButton={prd.stock ? <IconButton><AddShoppingCart color={green500} /></IconButton> : <IconButton><Email /></IconButton> }
            />
          </div>
        ))}
      </List>
    )
  }
}

Shelf.propTypes = {
  products: PropTypes.array.isRequired
}
