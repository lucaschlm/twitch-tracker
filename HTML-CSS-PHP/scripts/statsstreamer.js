const axios = require("axios").default;

const input = document.getElementById("searchStreamer");

let name = ""

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter')
    {
        name = input.value.toLowerCase().replace(/\s/g, '');
        update();
    }
  });

const dateList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
let labels = [];

const data = {
  labels: labels,
  datasets: []
};

const config = {
  type: "line",
  data: data,
  options: {}
};

let configTpsStreame = structuredClone(config);
let configViewersMoyens = structuredClone(config);
let configViewersMax = structuredClone(config);
let configViewedHours = structuredClone(config);
let configFollowers = structuredClone(config);
let configFollowersGain = structuredClone(config);
let configViews = structuredClone(config);
let configRank = structuredClone(config);

const streamedTimeChart = new Chart(document.getElementById("chartStreamedTime"), configTpsStreame);
const avgViewersChart = new Chart(document.getElementById("chartAvgViewers"), configViewersMoyens);
const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), configViewersMax);
const ViewedHoursChart = new Chart(document.getElementById("chartViewedHours"), configViewedHours);
const FollowersChart = new Chart(document.getElementById("chartFollowers"), configFollowers);
const FollowersGainChart = new Chart(document.getElementById("chartFollowersGain"), configFollowersGain);
const ViewsChart = new Chart(document.getElementById("chartViews"), configViews);
const RankChart = new Chart(document.getElementById("chartRank"), configRank);

const update = () => {
    axios.get("https://twitchtracking.maximilienherr.web-edu.fr/index.php/streamerName/".concat(name)) //On récupère l'api
      .then(function (response) {
        labels = []; //On vide les labels (dans le cas où il a déjà été utilisé)
        data.datasets = [{
          label: "",
          backgroundColor: "#EB5D1B",
          borderColor: "#EB5D1B",
          data: []
          }]; //Pareil pour les datas
        data.labels = labels;
    //////////////////////////////////////////
    //             TEMPS STREAME            //
    //////////////////////////////////////////     
      let dataTpsStreame = structuredClone(data);   
      configTpsStreame.data = dataTpsStreame;
      console.log(configTpsStreame);
      dataTpsStreame.datasets[0].label = "Temps streamé"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        dataTpsStreame.labels.push(dateFormat);
        dataTpsStreame.datasets[0].data.push(element.minutes_streamed / 60); //On change la valeur pour le graphique
      });
      console.log(configTpsStreame);
      streamedTimeChart.update();
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
        
      let dataViewersMoyens = structuredClone(data);
      configViewersMoyens.data = dataViewersMoyens;             

      dataViewersMoyens.datasets[0].label = "Viewers moyens"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        dataViewersMoyens.labels.push(dateFormat);
        dataViewersMoyens.datasets[0].data.push(element.avg_viewers); //On change la valeur pour le graphique
      });
      avgViewersChart.update();
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
   
        let dataViewersMax = structuredClone(data);
        configViewersMax.data = dataViewersMax;     
  
        dataViewersMax.datasets[0].label = "Viewers max"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViewersMax.labels.push(dateFormat);
          dataViewersMax.datasets[0].data.push(element.max_viewers); //On change la valeur pour le graphique
        });
        maxViewersChart.update();
    //////////////////////////////////////////
    //             HEURES VUES              //
    //////////////////////////////////////////
    
        let dataViewedHours = structuredClone(data);
        configViewedHours.data = dataViewedHours;    
  
        dataViewedHours.datasets[0].label = "Heures vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViewedHours.labels.push(dateFormat);
          dataViewedHours.datasets[0].data.push(element.hours_watched); //On change la valeur pour le graphique
        });
        ViewedHoursChart.update();
    //////////////////////////////////////////
    //              FOLLOWERS               //
    //////////////////////////////////////////
  
        let dataFollowers = structuredClone(data);
        configFollowers.data = dataFollowers;     
  
        dataFollowers.datasets[0].label = "Followers"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataFollowers.labels.push(dateFormat);
          dataFollowers.datasets[0].data.push(element.followers_total); //On change la valeur pour le graphique
        });
        FollowersChart.update();
    //////////////////////////////////////////
    //           FOLLOWERS GAGNES           //
    //////////////////////////////////////////

        let dataFollowersGain = structuredClone(data);
        configFollowersGain.data = dataFollowersGain;        
  
        dataFollowersGain.datasets[0].label = "Followers Gagnés"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataFollowersGain.labels.push(dateFormat);
          dataFollowersGain.datasets[0].data.push(element.followers); //On change la valeur pour le graphique
        });
        FollowersGainChart.update();
    //////////////////////////////////////////
    //                 VUES                 //
    //////////////////////////////////////////
   
        let dataViews = structuredClone(data);
        configViews.data = dataViews;       
  
        dataViews.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViews.labels.push(dateFormat);
          dataViews.datasets[0].data.push(element.views); //On change la valeur pour le graphique
        });
        ViewsChart.update();
    //////////////////////////////////////////
    //                 RANK                 //
    //////////////////////////////////////////

        let dataRank = structuredClone(data);
        configRank.data = dataRank;         
  
        dataRank.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataRank.labels.push(dateFormat);
          dataRank.datasets[0].data.push(element.rank); //On change la valeur pour le graphique
        });
        RankChart.update();
    })
      .catch(function (error) {
        // handle error
        if (error.response.status == 404)
        {
          alert("Streamer introuvable");
        }
      })
      .then(function () {
        // always executed
      });
};
