const currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerText = currentYear + " Movies";

const urlYear = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}&certification_country=US&certification.lte=PG-13&include_adult=false`;

var cardsOfTheYear = [];
var cardsOfTheGenres = {};
	
	
	async function loadYearCards()
	{	
		let response = await fetch(urlYear);
		let data = await response.json();
		
		for(index in data.results)
		{	
			insertCard(cardsOfTheYear,index,data.results,"2024");
		}
	}
	
	async function exec()
	{
		await loadMovieGenres();
		loadYearCards();

		if(localStorage.getItem('genres')!==null && localStorage.getItem('genres')!==[] )
		{
			let genreArray = JSON.parse(localStorage.getItem('genres'));

			for(genre of genreArray)
			{
				let genId = Object.keys(movieGenres).find(key => movieGenres[key] === genre);
				let genUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genId}&sort_by=popularity.desc&include_adult=false&vote_count.gte=100&vote_average.gte=7`
				
				let response = await fetch(genUrl);
				let data = await response.json();
				
				let sliderContainer = document.createElement("div");
				sliderContainer.className = "slide-container";
				
				let h2 = document.createElement("h2");
				h2.innerText = genre;
				sliderContainer.append(h2);
				
				let div = document.createElement("div");
				div.id = genre;
				div.className = "movies-slider";
				
				let prev = document.createElement("button");
				sliderContainer.append(prev);
				prev.outerHTML = "<button class='scroll-btn prev-btn'> &#8249;</button>";
				let next = document.createElement("button");
				sliderContainer.append(next);
				next.outerHTML = "<button class='scroll-btn next-btn'> &#8250;</button>";
				
				
				sliderContainer.append(div);
				document.querySelector(".movies-section").append(sliderContainer);
				
				cardsOfTheGenres[genre] = [];
				
				for(index in data.results)
				{	
					insertCard(cardsOfTheGenres[genre],index,data.results,genre);
				}

			}
		}
		
		const prevBtns = document.querySelectorAll('.movies-section .scroll-btn.prev-btn');
		const nextBtns = document.querySelectorAll('.movies-section .scroll-btn.next-btn');

		for(prevbtn of prevBtns)
		{	
			const slideArea = prevbtn.parentElement.querySelector(".movies-slider");
			prevbtn.onclick = function()
				{
					slideArea.scrollBy({
						left: -460,
						behavior: 'smooth'
					});
				}
		}
		
		for(nextbtn of nextBtns)
		{	
			const slideArea = nextbtn.parentElement.querySelector(".movies-slider");
			nextbtn.onclick = function()
				{
					slideArea.scrollBy(
					{
						left: 460,
						behavior: 'smooth'
					});
				}
		}
		
	}
	
	exec();


		
	
