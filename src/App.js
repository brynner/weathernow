import React, { Component } from 'react';
import './App.scss';

import CityWeather from './components/widgets/CityWeather/CityWeather';

export default class App extends Component {

  render() {
    return(
      <main className="app">

        <div className="topbar">
          <img src="images/logo.svg" alt="Weather Now" />
        </div>

        <div className="container">

          <div className="item">
            <CityWeather name="Nuuk, GL" />
          </div>

          <div className="item">
            <CityWeather name="Urubici, BR" showInfo={true} />
          </div>

          <div className="item">
            <CityWeather name="Nairobi, KE" />
          </div>

        </div>

      </main>
    )
  }
}
