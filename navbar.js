var nav = document.createElement("nav");
nav.className = "nav-bar";


nav.innerHTML = 
`    
	<a href="#" id="logo">
		<img src="logo.png" width="40px" height="40px">
		<h2>MovieHunt</h2>
	</a>
	<ul>
		<li><a href="index.html">Home</a></li>
		<li><a href="#">Movies</a></li>
		<li><a href="#">TV Shows</a></li>
		<li>
			<a href="profileform.html" id="navprofile">
				<img src="user.png" width="20px">
			</a>
		</li>
	</ul>
`;

document.body.prepend(nav);

