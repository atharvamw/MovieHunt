function Save() // when save is clicked
{	
	event.preventDefault();
	let checkedBoxes = document.querySelectorAll(".genre input[type='checkbox']:checked");
	
	let strGenre = [];
	for(box of checkedBoxes)
	{
		strGenre.push(box.id);
	}
	
	localStorage.setItem('genres', JSON.stringify(strGenre));
	localStorage.setItem('username', document.form.username.value);
}
		
function Clear() // when clear is clicked
{
	localStorage.clear();
}

if(username !== null) // to load username on profile section
{
	document.getElementById("usertf").value = username;
}

let genreArr = JSON.parse(localStorage.getItem("genres"));			

function createGenreCheckboxes() // dynamically creates the checkbox elements for all genres to tick.
{
	for(key in movieGenres)
	{	
		let div = document.createElement("div");
		div.className = "genre";
						
		let elem = document.createElement("input");
		elem.type = "checkbox";
		elem.name = elem.id = elem.value = movieGenres[key];
						
		let lab = document.createElement("label");
		lab.setAttribute('for',elem.id);
		lab.innerText = movieGenres[key];
						
		div.append(elem);
		div.append(lab);
						
		document.querySelector("#genres").append(div);
	}
}
			
function loadGenresOnProfile() // loads the previously ticked checkboxes
{	
		if(genreArr!==null) // if previously ticked
		{
			for(genre of genreArr)
			{	
				document.form[genre].checked = true;
			}
		}
}	

async function exec()
{
	await loadMovieGenres();  // load genres from API.
	createGenreCheckboxes();  // creates empty genre checkboxes.
	loadGenresOnProfile();    // load genres on profile.
}

exec();