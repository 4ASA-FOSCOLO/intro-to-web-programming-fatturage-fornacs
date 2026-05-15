function mostra(id){

    let contenuti =
    document.querySelectorAll(".contenuto"); contenuti.forEach(function(elemento)
            {elemento.style.display="none";});
      
  document.getElementById(id)
          .style.display="block";}

function caricaFormazione(squadra,id)
{mostra(id);
  let area=
    document.getElementById(id);
    area.innerHTML= "Caricamento formazione...";

   fetch("https://www.thesportsdb.com/api/v1/json/3/searchteams.php?t=" + squadra)
        .then(function(risposta){return risposta.json();})
        .then(function(dati){

        let team=dati.teams[0];

        area.innerHTML=`

        <h3>${team.strTeam}</h3>

        <img src="${team.strTeamBadge}"
        width="120">

        <p><b>Stadio:</b>
        ${team.strStadium}</p>

        <p><b>Anno fondazione:</b>
        ${team.intFormedYear}</p>

        <p>
        Dati caricati online con JavaScript
        </p> ;})

    .catch(function()
      { area.innerHTML=
        "Errore caricamento dati";});
}
