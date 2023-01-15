export const environment = {
  production: true,
  jokeURL: "https://api.chucknorris.io/jokes/random",
  weatherAPICallByGeolocation: (latCode: number, lonCode: number) => {
    let lat = latCode;
    let lon = lonCode;
    let key = '3e571ad5743072e40a4e19ff4b0a1a2d';
    let lang = 'en';
    let units = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    return url;
  },
  weatherAPICallByCity: (cityCode: string) => {
    let city = cityCode;
    let key = '3e571ad5743072e40a4e19ff4b0a1a2d';
    let lang = 'en';
    let units = 'metric';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${units}&lang=${lang}`;
    return url;
  },
  weatherImgAPICall: (iconCode: string) => {
    let icon = iconCode;
    let url = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    return url;
  }
};
