function caricaFormazione(squadra,id){

let area = document.getElementById(id);

area.style.display = "block";
area.innerHTML = "Caricamento...";

fetch("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=" + squadra)

.then(r => r.json())

.then(dati => {

let t = dati.teams[0];

area.innerHTML = `
<h3>${t.strTeam}</h3>
<img src="${t.strTeamBadge}" width="120">
<p><b>Stadio:</b> ${t.strStadium}</p>
<p><b>Anno fondazione:</b> ${t.intFormedYear}</p>
<p>Dati caricati in tempo reale</p>
`;

})

.catch(() => {
area.innerHTML = "Errore caricamento dati";
});

}
