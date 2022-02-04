const express = require('express');
const cors = require('cors');

const app = express(), 
	port = 3080;

app.use(cors());

app.get("/Musiques", (req, res) => {
	res.json(
		[{
		"Titre" : "Macarena",
		"Album" : "Ipseite",
		"Artiste" : "Damso"}
		]
	);
});

app.listen(port, () => {
	console.log('Server running on port 3080');
});
