// topper random selector total toppers +1 since starts from 0
var toppersCount = 53;
var randomTopper = Math.floor(Math.random() * toppersCount);
var baseUrl = 'https://mhinfographics.github.io/img/topper/';
document.querySelector('#topper').style.backgroundImage = `url(${baseUrl}/topper_${randomTopper}.jpg)`;