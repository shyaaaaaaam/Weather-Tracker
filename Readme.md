# Weather-Tracker
A Modern Weather Tracking App Made With React Native, Expo, And OpenWeatherMap API.<br />

To Run This Application On Your Android Or IOS Device, You Require `node.js` `npm` and `npx` packages. <br />
You Can Install Them At https://nodejs.org/en/download <br />
[NOTE: You Do Not Require Chocolatey For This Application, You May Uncheck The Option For This Application.<br /><br />

You May Run This Program On Both Android and IOS Devices, But Make Sure Of Platform Dependencies While Further Modifying Code! <br />
- - - -

Make Sure To Change The OpenWeatherMap API Key On The `App.js` Script. You Can Get An API Key From Their Website https://openweathermap.org/ <br />
You Can Change The Temprature Unit From Celsius To Farenheit By Changing The Axiom Request Value From `metric` to `imperial`. <br />

Steps To Run The Application On Android Devices:<br />
- Download The ZIP File From This Git Repository And Extract It.<br />
- Open Command Prompt In The Directory Where The Repository Is Installed. <br />
-  - You Can Do This By Either: <br />
   - `cd directory_location` <br />
   - Open Command Prompt Directly In The Folder Where The Application Code Is Installed By Clicking On The Directory Bar At The Top Of The Folder Application <br />
- Type In `npm install`, This Should Install All The Necessary Packages Required To Run The Application. <br />
- - Incase `npm` Does Not Install All The Necessary Packages, Type In `npm install expo-location` and `npm install axiom` <br />
- Type In `npx expo start`, This Should Start The Server Required For The Program. <br />
- Install `Expo` Application On Your Android Device. This Can Be Done From https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&gl=US <br />
- Scan The QR Code In Your Command Prompt From Your Android `Expo` Application. Your Application Should Now Run On Your Android Device. <br />
- - Make Sure That Your Android Device And Computer Are Running On The Same Network! <br />

Current Features:<br />
- Uses StyleSheet And JS To Present A Home Screen With A Title, Sub Title, Boxes Representing Current Weather Information Such As: <br />
- - Sunrise Time
  - UV Index
  - Wind Speed
  - Wind Direction
  - Precipitation
  - Visibility
  - Humidity
  - Pressure
- Search Button With Search Dynamic Search TextBox That Can Be Used To Search For Queries. <br />
- Empty Search Query Will Lead To The Last Search Being Removed And The Background Changed Back To Current Destination Weather.
- Dynamic Background Based On Current Weather Or Searched Weather!

Todo: <br />
- Add A Toggle To Convert Temperature From Celsius To Farenheit<br />
- - - - -
Output: <br />
<img width="192" alt="image" src="https://github.com/shyaaaaaaam/Weather-Tracker/assets/66993859/b6c50c8a-75cc-4613-9024-9b6f6a42c984">

