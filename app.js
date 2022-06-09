const form = document.querySelector('form');
const card = document.querySelector('.myccard');
const details = document.querySelector('.mycdetails');
const icon = document.querySelector('.mycicon img');
const time = document.querySelector('img.myctime');
const forecast = new Forecast();

const updateUI = (data) => {

    const {cityDetails, cityWeather} = data;
    
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${cityWeather.WeatherText}</div>
        <div class="display-4 my-4 p-4">
            <span>${cityWeather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
        `;

    let timeSRC = cityWeather.IsDayTime ? 'day.jpg' : 'night.jpg';

    time.setAttribute('src', timeSRC);

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};


form.addEventListener('submit', e => {
    e.preventDefault();
    const city = form.city.value.trim();

    form.reset();

    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem('city', city);
    
});
if (localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
