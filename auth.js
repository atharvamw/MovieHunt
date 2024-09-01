	let username = localStorage.getItem("username")
	
	function loadName()
	{
		if(username!==null)
		{
			document.getElementById("navprofile").insertAdjacentText('beforeend',username);
		}
	}
	
	loadName();
