
"use strict";
//Get input from buttons & dropdown
//let weatherSearch = document.getElementById("Search").value;
//let weath = document.getElementById("SearchForWeather").value;
let storageTerm = [];

const app = new Vue({
	el: '#app',
	data: {
		title: "",
		newsDateSeg:"&from=",
		author: "",
		article: "",
		urlToImage:"",
		totalresults:"",		
		newsResults: {},
		profileImage:"",		
		altText:"no image",
		searchCity: "",
		herokuURL: "https://cors-anywhere.herokuapp.com/",
		baseURL: "http://newsapi.org/v2/everything?q=",
		baseWeatherURL: "https://api.weatherapi.com/v1/current.json?key=0ed7f0edd1cc49ebbd1160210202807&q=",
		endURL: "&sortBy=publishedAt&apiKey=4159143b0df34c3f9d5c525ffd2f2304",		
		weatherKey: "0ed7f0edd1cc49ebbd1160210202807",
		dateString: "2020-07-20",
		oneDay: (24*60*60*1000),  // in milliseconds
		daysAgoToGetNews: 2  // this may be a good value to let the user change in the UI
		
	},
	methods:{
	  setDateString(){
	    let newsDate = new Date();
	    newsDate.setTime(newsDate.getTime() - (this.oneDay * this.daysAgoToGetNews));
	    this.dateString = newsDate.getFullYear() + "-" + (newsDate.getMonth()+1) + "-" + newsDate.getDate();
	    // months are 0-11
	    // https://www.w3schools.com/js/js_date_methods.asp
	  },
  	searchNews(){
  	  this.setDateString();  // set the datestring that we will include in the URL
  		//if (! this.term.trim()) return;
  		
  		// build the URL from the pieces defined above including the dateString.
  		fetch(this.herokuURL + this.baseURL + this.title + this.newsDateSeg + this.dateString + this.endURL, {
  		  // Add header required by herokuapp
  		  headers: { 'X-Requested-With' : 'XMLHttpRequest' }
  		   })
  		.then(response => {
  			if(!response.ok){
  				throw Error(`ERROR: ${response.statusText}`);
  			}
  			return response.json();
  		})
  		.then(json => {	
  		
  				this.author=json.articles[0].author;
				this.totalresults=json.totalResults;
				this.newsResults=json;		
    			
		})},

	

 // end search
	} // end methods

});










