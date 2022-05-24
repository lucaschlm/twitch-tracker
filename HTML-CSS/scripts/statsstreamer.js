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

const dateList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
let labels = [];

const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      backgroundColor: "#EB5D1B",
      borderColor: "#EB5D1B",
      data: []
    }
  ]
};

const config = {
  type: "line",
  data: data,
  options: {}
};


const update = () => {
    axios.get("https://twitchtracking.maximilienherr.web-edu.fr/index.php/streamerName/".concat(name)) //On récupère l'api
      .then(function (response) {
    //////////////////////////////////////////
    //             TEMPS STREAME            //
    //////////////////////////////////////////
      labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite      
      data.datasets[0].data.length = 0; // pareil pour les données         
      console.log(response.data);
      data.datasets[0].label = "Temps streamé"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        labels.push(dateFormat);
        data.datasets[0].data.push(element.minutes_streamed / 60); //On change la valeur pour le graphique
      });
      const streamedTimeChart = new Chart(document.getElementById("chartStreamedTime"), config);
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
      labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite              
      data.datasets[0].data.length = 0; // pareil pour les données            
      console.log(response.data);
      data.datasets[0].label = "Viewers moyens"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        labels.push(dateFormat);
        data.datasets[0].data.push(element.avg_viewers); //On change la valeur pour le graphique
      });
      const avgViewersChart = new Chart(document.getElementById("chartAvgViewers"), config);
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Viewers max"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.max_viewers); //On change la valeur pour le graphique
        });
        const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), config);
    //////////////////////////////////////////
    //             HEURES VUES              //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Heures vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.hours_watched); //On change la valeur pour le graphique
        });
        const ViewedHoursChart = new Chart(document.getElementById("chartViewedHours"), config);
    //////////////////////////////////////////
    //              FOLLOWERS               //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Followers"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.followers_total); //On change la valeur pour le graphique
        });
        const FollowersChart = new Chart(document.getElementById("chartFollowers"), config);
    //////////////////////////////////////////
    //           FOLLOWERS GAGNES           //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Followers Gagnés"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.followers); //On change la valeur pour le graphique
        });
        const FollowersGainChart = new Chart(document.getElementById("chartFollowersGain"), config);
    //////////////////////////////////////////
    //                 VUES                 //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.views); //On change la valeur pour le graphique
        });
        const ViewsChart = new Chart(document.getElementById("chartViews"), config);
    //////////////////////////////////////////
    //                 RANK                 //
    //////////////////////////////////////////
        labels.length = 0; // on vide le tableau des labels car on va le reremplir par la suite  
        data.datasets[0].data.length = 0; // pareil pour les données         
        console.log(response.data);
        data.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          labels.push(dateFormat);
          data.datasets[0].data.push(element.rank); //On change la valeur pour le graphique
        });
        const RankChart = new Chart(document.getElementById("chartRank"), config);
    })
      .catch(function (error) {
        // handle error
        console.log(error);
        // window.location.href = "http://localhost:1234/homepage.html ";
      })
      .then(function () {
        // always executed
      });
};
