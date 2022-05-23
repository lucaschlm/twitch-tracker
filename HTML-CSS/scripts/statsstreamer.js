const axios = require("axios").default;

const input = document.getElementById("searchStreamer");

let name = ""

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter')
    {
        name = input.value.toLowerCase();
        update();
    }
  });

const labels = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "#EB5D1B",
      borderColor: "#EB5D1B",
      data: [null, null, null, null, null, null, null, null, null, null, null, null]
    }
  ]
};

const config = {
  type: "line",
  data: data,
  options: {}
};


const update = () => {
    axios.get("http://localhost:3000/".concat(name)) //On récupère l'api

      .then(function (response) {
    //////////////////////////////////////////
    //             TEMPS STREAME            //
    //////////////////////////////////////////        
        console.log(response.data);
        data.datasets[0].label = "Temps streamé"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          data.datasets[0].data[date.getMonth() - 1] = element.minutes_streamed / 60; //On change la valeur pour le graphique
        });
        const streamedTimeChart = new Chart(document.getElementById("chartStreamedTime"), config);
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
        console.log(response.data);
        data.datasets[0].label = "Viewers moyens"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          data.datasets[0].data[date.getMonth() - 1] = element.avg_viewers; //On change la valeur pour le graphique
        });
        const avgViewersChart = new Chart(document.getElementById("chartAvgViewers"), config);
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
        console.log(response.data);
        data.datasets[0].label = "Viewers max"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          data.datasets[0].data[date.getMonth() - 1] = element.max_viewers; //On change la valeur pour le graphique
        });
        const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), config);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
};
