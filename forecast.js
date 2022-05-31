class Forecast{
    constructor(){
        this.key = 'GzMS3zmqCDLziYZAUohG3GeujPZMyL7m';
        this.cityURL = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURL = 'http://dataservice.accuweather.com/currentconditions/v1/';
    }
    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const cityWeather = await this.getWeather(cityDetails.Key);
    
        return{ cityDetails, cityWeather};
    }
    async getCity(city){
        const query = `?apikey=${this.key}&q=${city}`;

        const response = await fetch(this.cityURL + query);
        const data = await response.json();

        return data[0];
    }
    async getWeather(id){
        const query = `${id}?apikey=${this.key}`;

        const response = await fetch(this.weatherURL + query);
        const data = await response.json();
        return data[0];
    }
}