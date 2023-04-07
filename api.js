
// Déclare les variables et les récupérer en appellant leurs classes.

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

// Créer l'événement en appuyant sur le bouton et faire appel à une ville. 

 search.addEventListener('click', () => {

    const APIKey = '51bf887c1ee1cc8ac544c981e5386a92';
    const city = document.querySelector('.search-box input').value;
   

// Si le nom de la ville est correcte, on demande au Json de nous retourner les infos 
// à travers l'url de l'api.
    if (city === '')
        return;
 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

// Si la ville n'existe pas le Json retourne un message d'erreur et il affiche l'image 404
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn'); 
                return;
            }

// Faire disparaitre l'image d'erreu "404"
            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
          
// Récupérer les images correspenadantes au temps qu'il fait dans la ville demandée. 

            switch (json.weather[0].main) {  /* les data sont stokés sous forme de tableau dans json*/
                case 'Clear':
                    image.src = 'img/clear.png';
                    break;

                case 'Rain':
                    image.src = 'img/rain.png';
                    break;

                case 'Snow':
                    image.src = 'img/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'img/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'img/mist.png';
                    break;

                default:
                    image.src = '';
            }

// appeler les infos météo de l'api  en utilsant le "main" de l'api qui nous renvoit les données météo.

           /* "parseInt" pour transformer la donnée récupérée de string en chiffre */
           description.innerHTML = `${json.weather[0].description}`; 
        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`; /*<span> pour affichage particulier du °C */
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

// Donner le style (d'animation) d'affichage pour la (div class = container) qui contient les info météo
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


  })
 
