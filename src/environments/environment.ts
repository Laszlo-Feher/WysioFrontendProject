// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  jokeUrl: "https://api.chucknorris.io/jokes/random?category=dev",
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
