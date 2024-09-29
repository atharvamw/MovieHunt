	
	const movieId = localStorage.getItem("selectedMovieId");
	const apiURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
	const ytURL = "https://www.youtube.com/embed/"
	
	const videoList = new Array();
	const videosSlider = document.getElementById("videos-slider");
	
	
	async function fetchData()
	{
		var response = await fetch(apiURL);
		var data = await response.json();
		var releaseDate = new Date(data.release_date);
		var posterPath = imgPrefixLink + data.poster_path;
		
		document.getElementById("heading").innerText = data.title;
		document.getElementById("rDate").innerText = releaseDate.toUTCString().slice(5,17);
		document.getElementById("poster").src = posterPath;
		document.getElementById("rating").innerText = "Rating: " + data.vote_average.toString().substr(0,3) + "/10";
		document.getElementById("voteCount").innerText = "(" + data.vote_count + ")";
		document.title = data.title;
			
		var apiTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
		var response = await fetch(apiTrailer);
		var trailerData = await response.json();
		
		
		var apiCredits = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
		var response = await fetch(apiCredits);
		var creditsData = await response.json();
		var castList = creditsData.cast;
		
		var ytKey;
		var ytAltKey;
		var videoSection = document.getElementById("videos-slider");
		let vidCount = 0;
		
		for(item of trailerData.results)
		{	
			if(item.name.toLowerCase().includes("official trailer"))
				ytKey = item.key;
			
			if(item.name.toLowerCase().includes("trailer"))
				ytAltKey = item.key;
			
			if(vidCount<6)
			{
				videoList.push(item.key);
				let vid = document.createElement("iframe");
				vid.classList = "video";
				vid.setAttribute('frameborder','0');
				vid.setAttribute('src',ytURL + item.key);
				videoSection.append(vid);
				vidCount++;
			}
			else if(vidCount==6)
			{	
				break;
			}
		}
		
		if(ytKey === undefined)
		{	
			if(ytAltKey !== undefined)
			ytKey = ytAltKey;
			delete ytAltKey;
			else
			ytKey = trailerData.results[0].key;
		}
		
		var trailerURL = ytURL + ytKey;
		document.getElementById("trailer").src = trailerURL;
		
		for(cast of castList)
		{
			addCast(cast.profile_path, cast.name, cast.character);
		}
		
	}
	
		function addCast(imgKey, castName, charName)
		{
			var div = document.createElement("div");
			div.className = "castCard";
			div.innerHTML = 
			`	
					<img class="castImg" src="${imgPrefixLink + imgKey}" onerror="this.onerror=null; this.src='Images/user.png';">
					<div>
						<h2 class="castName">${castName}</h2>
						<h3 class="charName">${charName}</h3>
					</div>
			`;
			
			document.getElementById("castGrid").append(div);
		}
	
	
		const prevBtns = document.querySelectorAll('.scroll-btn.prev-btn');
		const nextBtns = document.querySelectorAll('.scroll-btn.next-btn');

		for(prevbtn of prevBtns)
		{	
			const slideArea = prevbtn.parentElement.querySelector("#videos-slider");
			prevbtn.onclick = function()
				{
					slideArea.scrollBy({
						left: -600,
						behavior: 'smooth'
					});
				}
		}
		
		for(nextbtn of nextBtns)
		{	
			const slideArea = nextbtn.parentElement.querySelector("#videos-slider");
			nextbtn.onclick = function()
				{
					slideArea.scrollBy(
					{
						left: 600,
						behavior: 'smooth'
					});
				}
		}
	
	fetchData();