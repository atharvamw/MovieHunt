const currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerText = currentYear + " Movies";

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}`;
var cardsOfTheYear = [];

	fetch(url)
	.then(response=>
	{
		return response.json();
	})
	
	.then(data=>{
		for(index in data.results)
		{	
			insertCard(cardsOfTheYear,index,data,"2024");
		}
	})
	
	.catch(err=> {
		console.log(err);
	});
	
	