import React, { Component } from 'react';
import WeatherController from '../../../controllers/WeatherController';
import Card from '../../../components/ui/Card/Card';
import * as UtilFormat from '../../../utils/format'

export default class CityWeather extends Component {

    constructor(props) {
        super(props);

        this.state = {
            minutesToUpdate: 10,
            card: {
                loading: true,
                error: false,
                temperature: null
            }
        }
    }

    componentDidMount() {
        this.fetchDataInterval(this.props.name);
    }

    fetchDataInterval = (cityName) => {
        this.fetchData(cityName);
        this.intervalNotification = setInterval(() => {
            this.fetchData(cityName);
        }, (1000));
    }
    
    fetchData = (cityName) => {

        this.showLoading();
        
        let weatherNowInCity = JSON.parse(localStorage.getItem(`weatherNow-${cityName}`));
        let expiredData = this.verifyIfDataHasExpired(cityName);

        if (!weatherNowInCity || expiredData) {

            this.resetData(cityName);
            
            /**
             * Não há dados em cache ou foram expirados, 
             * portanto consultá-los novamente via API
             */
            WeatherController.getTemperatureFromCity(cityName).then(result => {

            const currentDate = UtilFormat.dateToTimestamp(new Date());

            /**
             * Atualiza estado da tela
             */
            const { card } = this.state;
            card.loading = false;
            card.error = false;
            card.updatedAt = currentDate;
            card.temperature = result.data.main.temp;
            card.humidity = result.data.main.humidity;
            card.pressure = result.data.main.pressure;
            this.setState({ card });
            
            /**
             * Armazena dados em cache
             */
            localStorage.setItem(`weatherNow-${cityName}`, JSON.stringify({
                updatedAt: currentDate,
                temperature: card.temperature,
                humidity: card.humidity,
                pressure: card.pressure
            }));

            }).catch(result => {

                /**
                 * Atualiza estado da tela
                 */
                const { card } = this.state;
                card.loading = false;
                card.error = true;
                this.setState({ card });
            })

        } else {

            /**
             * Atualiza estado da tela, com dados do cache
             */
            const { card } = this.state;
            card.loading = false;
            card.error = false;
            card.updatedAt = weatherNowInCity.updatedAt;
            card.temperature = weatherNowInCity.temperature;
            card.humidity = weatherNowInCity.humidity;
            card.pressure = weatherNowInCity.pressure;
            this.setState({ card });
        }
    }

    resetData = (cityName) => {
        
        // Clean Storage
        localStorage.removeItem(`weatherNow-${cityName}`);

        // Clean State
        const { card } = this.state;
        card.temperature = null;
        this.setState({ card });
    }

    verifyIfDataHasExpired = (cityName) => {

        /**
         * Verificar se dado está disponível em cache
         * e se já passou 10 minutos desde sua última atualização
         */
        let weatherNowInCity = JSON.parse(localStorage.getItem(`weatherNow-${cityName}`));
        
        if (weatherNowInCity && weatherNowInCity.updatedAt) {

            let dateToExpires = UtilFormat.addMinutesToTimestamp(weatherNowInCity.updatedAt, this.state.minutesToUpdate);
            let currentDate = UtilFormat.dateToTimestamp(new Date());

            /**
             * Se data atual for maior do que a data de expiração
             * buscar novamente dados da API
             */
            if (currentDate > dateToExpires) {
                return true;
            }
        }
    }

    showLoading = () => {
        const { card } = this.state;
        card.loading = true;
        card.error = false;
        this.setState({ card });
    }

    reloadWeather = () => {
        
        /**
         * Deixar o 'loading' por 1.5 segundos para mostrar
         * ao usuário que houve uma tentativa de buscar dados
         */
        this.showLoading();
        
        setTimeout(() => {
            //this.resetData(this.props.name);
            this.fetchData(this.props.name);
        }, 1500);
    }

    statsColor = (temperature) => {
        if (temperature <= 5) {
            return 'blue';
        } else if (temperature > 5 && temperature <= 25) {
            return 'orange';
        } else {
            return 'red';
        }
    }
    
    render() {

        const footerInfo = {
            show: this.props.showInfo,
            firstInfo: `Humidity`,
            firstValue: `${this.state.card.humidity}`,
            firstValueSymbol: `%`,
            secondInfo: `Pressure`,
            secondValue: `${this.state.card.pressure}`,
            secondValueSymbol: `hPa`,
            statusInfo: `Updated at`,
            statusValue: UtilFormat.timestampToFormattedTime(this.state.card.updatedAt)
        }

        return(
            <main>
                <Card 
                    loading={this.state.card.loading}
                    reloadCard={this.reloadWeather}
                    error={this.state.card.error}
                    title={this.props.name} 
                    stats={UtilFormat.convertTemperatureFromKelvinToCelcius(this.state.card.temperature)}
                    statsSymbol={`°`}
                    statsColor={this.statsColor(UtilFormat.convertTemperatureFromKelvinToCelcius(this.state.card.temperature))}
                    footerInfo={footerInfo}
                />
            </main>
        )
    }
}