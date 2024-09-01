const currentYear = new Date().getFullYear();
document.getElementById("currentYear").innerText = currentYear + " Movies";

const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${currentYear}`;

var cardsOfTheYear = [];
	
	async function load2024Cards()
	{
		let response = await fetch(url);
		let data = await response.json();
		await loadMovieGenres();
		
		for(index in data.results)
		{	
			insertCard(cardsOfTheYear,index,data,"2024");
		}	
	}
	
	load2024Cards();

		const sliderContainer = document.querySelector('.movies-section .movies-slider');
		const prevBtn = document.getElementById('prev-btn');
		const nextBtn = document.getElementById('next-btn');
		
		prevBtn.onclick = function(){
			console.log('Previous button clicked!');
			sliderContainer.scrollBy({
				left: -460,
				behavior: 'smooth'
			});
		}

		nextBtn.addEventListener('click', () => {
			console.log('Next button clicked!');
			sliderContainer.scrollBy({
				left: 460,
				behavior: 'smooth'
			});
		});
	
	