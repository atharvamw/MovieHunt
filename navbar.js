var nav = document.createElement("nav");
nav.className = "nav-bar";

nav.innerHTML = 
`    
	<a href="index.html" id="logo">
		<img src="Images/logo.png" width="40px" height="40px">
		<h2>MovieHunt</h2>
	</a>
	<ul>
		<li>
			<div style="display: flex;">
			<input type="text" id="searchbar">
			<a href="search.html" onclick="searchIt()"><img src="Images/search.png" width=22px></a>
			</div>
		</li>
		
		<li><a href="index.html">Home</a></li>
		<li><a href="#">Movies</a></li>
		<li><a href="#">TV Shows</a></li>
		<li>
			<a href="profileform.html" id="navprofile">
				<img src="Images/user.png" width="20px">
			</a>
		</li>
	</ul>
`;

function searchIt()
{
	var searchBar = document.getElementById("searchbar");
	
	document.cookie = `search = ${searchBar.value}; expires=Thu, 12 Jun 3000 12:00:00 UTC`

}

document.body.prepend(nav);


