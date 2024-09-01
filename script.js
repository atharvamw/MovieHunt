const currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerText = currentYear + " Movies";

const urlYear = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}`;

var cardsOfTheYear = [];
var cardsOfTheGenres = {};
	
	
	async function loadYearCards()
	{	
		let response = await fetch(urlYear);
		let data = await response.json();
		
		for(index in data.results)
		{	
			insertCard(cardsOfTheYear,index,data,"2024");
		}
	}
	
	async function exec()
	{
		await loadMovieGenres();
		loadYearCards();

		if(localStorage.getItem('genres')!==null && localStorage.getItem('genres')!==[] )
		{
			let genreArray = JSON.parse(localStorage.getItem('genres'));
			console.log(genreArray);

			for(genre of genreArray)
			{
				let genId = Object.keys(movieGenres).find(key => movieGenres[key] === genre);
				let genUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genId}&sort_by=popularity.desc`
				
				let response = await fetch(genUrl);
				let data = await response.json();
				console.log(data.results[0]);
				
				let sliderContainer = document.createElement("div");
				sliderContainer.className = "slide-container";
				
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
					insertCard(cardsOfTheGenres[genre],index,data,genre);
				}

			}
		}
		
		const prevBtns = document.querySelectorAll('.movies-section .scroll-btn.prev-btn');
		const nextBtns = document.querySelectorAll('.movies-section .scroll-btn.next-btn');
		console.log(prevBtns);
		for(prevbtn of prevBtns)
		{	
			console.log(prevbtn.parentElement.querySelector(".movies-slider"));
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


		
	
