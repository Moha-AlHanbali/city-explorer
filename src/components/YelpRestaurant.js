import React from 'react';
import Card from 'react-bootstrap/Card';

class YelpRestaurant extends React.Component {

  render() {
    let timeStamp;

    return (
      <>
        <Card>
          <Card.Body>
            {/* <h4>City: {this.props.enteredCity}</h4> */}
            <h5>Our food picks</h5>
            <br />
            {
              this.props.yelp.map((element, index) => {
                timeStamp = element.timeStamp;
                return (
                  <ul key={index}>
                    <li>Restaurant: {element.businesseName}</li>
                    <ul>
                      <li>Cuisine: {element.category}</li>
                      <li> Price: {element.price}</li>
                      <li> Reviews: {element.reviews}</li>
                      <li>Rating: {element.rating}</li>
                      <li>
                        <Card.Img variant="top" src={element.image} />
                      </li>
                    </ul>
                  </ul>
                );
              })
            }
            <p>Restaurants list last updated on: {timeStamp}</p>
          </Card.Body>
        </Card>
      </>
    );
  }

}

export default YelpRestaurant;
