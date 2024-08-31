var nav = document.createElement("nav");
nav.className = "nav-bar";


nav.innerHTML = 
`    
	<div id="logo">
		<img src="logo.png" width="40px" height="40px">
		<h2>MovieHunt</h2>
	</div>
	<ul>
		<li><a href="index.html">Home</a></li>
		<li><a href="#">Movies</a></li>
		<li><a href="#">TV Shows</a></li>
		<li>
			<a href="profileform.html">
				<img src="user.png" width="20px">
			</a>
		</li>
	</ul>
`;

document.body.prepend(nav);

