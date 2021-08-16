import React from 'react';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      forecast: {}
    };
  }

  forecast = async () => {
    await this.setState({ forecast: this.props.forecast });
    console.log('Weather', this.state.forecast);
  }



  render() {
    console.log('Weather', this.props.forecast);
    let date = this.props.forecast[0].date;
    let low = this.props.forecast[0].low;
    let high = this.props.forecast[0].high;
    let description = this.props.forecast[0].description;

    
    //   this.props.forecast.map(element => {
    //     date = element.date;
    //     return date;
    //   });
 

    return (

      <>

        <p>City: {this.props.enteredCity}   </p>
        <p>Date: {date}   </p>
        <p>Description: low temp of {low} and high of {high} with {description} </p>

      </>
    );
  }

}

export default Weather;
