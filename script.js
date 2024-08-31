const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=2024`;
var cards2024 = [];

	fetch(url)
	.then(response=>
	{
		return response.json();
	})
	
	.then(data=>{
		for(index in data.results)
		{	
			insertCard(cards2024,index,data,"2024");
		}
	})
	
	.catch(err=> {
		console.log(err);
	});


	
	