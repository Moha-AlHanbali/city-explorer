import React from 'react';
import Card from 'react-bootstrap/Card';

class WeatherDay extends React.Component {

  render() {


    return (
      <>
        <Card>
          <Card.Body>
            {/* <h4>City: {this.props.enteredCity}</h4> */}
            <h5>The Week's Forecast</h5>
            <br />
            {
              this.props.forecast.map((element, index) => {
                return (
                  <ul key={index}>
                    <li>Date: {element.date}</li>
                    <ul>
                      <li> Description: low temp of {element.low} and high of {element.high} with {element.description}.</li>
                    </ul>
                  </ul>
                );
              })
            }
          </Card.Body>
        </Card>
      </>
    );
  }

}

export default WeatherDay;
