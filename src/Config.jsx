// src/config.js
const applicationMode = "development";
var appName = "Playful Pencil";
var apiUrl = "https://api.playfulpencil.in/api/";
var pageSize = 10;
var logo = "/logo.png";
var imageBasePath = "https://api.playfulpencil.in/api/uploads";

if (applicationMode === 'development') {
  appName = "Playful Pencil";
  
  //server
  apiUrl = "https://api.playfulpencil.in/api/";
  imageBasePath = "https://api.playfulpencil.in/api/uploads";
  
}
const config = {
  appName: appName,
  apiUrl: apiUrl,
  pageSize: pageSize,
  logo: logo,
  imageBasePath: imageBasePath,
};
export default config;