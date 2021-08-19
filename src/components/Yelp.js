import React from 'react';
import YelpRestaurant from './YelpRestaurant.js';

class Yelp extends React.Component {

  render() {
    return (
      <>
        <YelpRestaurant yelp={this.props.yelp} />
      </>
    );
  }

}

export default Yelp;
