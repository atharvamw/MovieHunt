	let username = localStorage.getItem("username")
	
	if(username!==null)
	{
		document.getElementById("navprofile").insertAdjacentText('beforeend',username);
	}