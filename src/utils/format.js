export function addMinutesToTimestamp (timestamp, minutes) {
    let thisDate = timestamp+(60*minutes);
    return thisDate;
}

export function dateToTimestamp (thisDate) {
    thisDate = Date.parse(thisDate);
    return thisDate/1000;
}

export function timestampToFormattedTime (timestamp) {
    let thisDate = new Date(timestamp * 1000);
    let amOrPm = (thisDate.getHours() < 12) ? 'AM' : 'PM';
    let hours = thisDate.getHours() < 10 ? `0${thisDate.getHours()}` : thisDate.getHours();
    let minutes = thisDate.getMinutes() < 10 ? `0${thisDate.getMinutes()}` : thisDate.getMinutes();
    let seconds = thisDate.getSeconds() < 10 ? `0${thisDate.getSeconds()}` : thisDate.getSeconds();
    let formattedTime = `${hours}:${minutes}:${seconds} ${amOrPm}`;
    return formattedTime;
}

export function convertTemperatureFromKelvinToCelcius(temperature) {
    if (temperature) {
        const temperature_converted = temperature-273.15;
        return Math.round(temperature_converted);
    }
}