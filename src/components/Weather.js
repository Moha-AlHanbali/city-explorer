import React from 'react';
import Card from 'react-bootstrap/Card';

class Weather extends React.Component {

  render() {
    return (
      <>
        {
          this.props.forecast.map((element, index) => {
            return (
              <Card key={index}>
                <Card.Body>
                  <p>City: {this.props.enteredCity}</p>
                  Date: {element.date}
                  Description: low temp of {element.low} and high of {element.high} with {element.description}
                </Card.Body>
              </Card>
            );
          })
        }
      </>
    );
  }

}

export default Weather;
