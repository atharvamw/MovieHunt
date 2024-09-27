	
	const title = localStorage.getItem("card");
	const apiURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&page=1`
	const ytURL = "https://www.youtube.com/embed/"
	
	const videoList = new Array();
	const videosSlider = document.getElementById("videos-slider");
	
	
	async function fetchData()
	{
		var response = await fetch(apiURL);
		var data = await response.json();
		var posPath = imgPrefixLink+data.results[0].poster_path;
		var backPath = imgPrefixLink+data.results[0].backdrop_path;
		var releaseDate = new Date(data.results[0].release_date);
		var movieId = data.results[0].id;
		
		var apiTrailer = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
		var response = await fetch(apiTrailer);
		var trailerData = await response.json();
		
		var apiCredits = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
		var response = await fetch(apiCredits);
		var creditsData = await response.json();
		var castList = creditsData.cast;
		
		console.log(creditsData.cast);
		
		var ytKey;
		var videoSection = document.getElementById("videos-slider");
		let vidCount = 0;
		
		for(item of trailerData.results)
		{	
			if(item.name.toLowerCase().includes("official trailer"))
			{
				ytKey = item.key;
			}
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
		}
		
		if(ytKey === undefined)
		{	
			for(item of trailerData.results)
			{
				if(item.name.toLowerCase().includes("trailer"))
				{
					ytKey = item.key;
					break;
				}
			}
			
			if(ytKey === undefined)
			ytKey = trailerData.results[0].key
		}
		
		var trailerURL = ytURL + ytKey;
	
		for(cast of castList)
		{
			console.log(cast);
			addCast(cast.profile_path, cast.name, cast.character);
		}
		
		console.log(data.results[0]);
		console.log(trailerData.results);
		
		document.getElementById("heading").innerText = title;
		document.getElementById("rDate").innerText = releaseDate.toUTCString().slice(5,17);
		document.getElementById("poster").src = posPath;
		document.getElementById("trailer").src = trailerURL;
		document.getElementById("rating").innerText = "Rating: " + data.results[0].vote_average.toString().substr(0,3) + "/10";
		document.getElementById("voteCount").innerText = "(" + data.results[0].vote_count + ")";
		document.title = title;
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