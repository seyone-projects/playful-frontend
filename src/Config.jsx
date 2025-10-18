// src/config.js
const applicationMode = "development";
var appName = "Playful Pencil";
var apiUrl = "https://playfulpencil.in/api/";
var pageSize = 10;
var logo = "/logo.png";
var imageBasePath = "https://playfulpencil.in/uploads";

if (applicationMode === 'development') {
  appName = "Playful Pencil";
  
  //local
  apiUrl = "https://playfulpencil.in/api/"; 
  imageBasePath = "https://playfulpencil.in/uploads";  

  //server
  //apiUrl = "http://13.53.39.107/api/";
  //imageBasePath = "http://13.53.39.107/uploads";
  
}
const config = {
  appName: appName,
  apiUrl: apiUrl,
  pageSize: pageSize,
  logo: logo,
  imageBasePath: imageBasePath,
};
export default config;