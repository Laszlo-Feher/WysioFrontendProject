// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  jokeAPI: "https://api.chucknorris.io/jokes/random?category=dev",
  jokeImageAPI: "https://api.chucknorris.io/img/chucknorris_logo_coloured_small@2x.png",
  weatherAPI: "https://api.openweathermap.org/data/2.5/weather?",
  weatherImageAPI: "http://openweathermap.org/img/wn/",
  weatherAPIKey: "3e571ad5743072e40a4e19ff4b0a1a2d"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
