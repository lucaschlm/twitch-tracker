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
      let dataTpsStreame = structuredClone(data);
      let configTpsStreame = structuredClone(config);     
      configTpsStreame.data = dataTpsStreame;
      console.log(response.data);
      dataTpsStreame.datasets[0].label = "Temps streamé"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        dataTpsStreame.labels.push(dateFormat);
        dataTpsStreame.datasets[0].data.push(element.minutes_streamed / 60); //On change la valeur pour le graphique
      });
      
      console.log(configTpsStreame);
      const streamedTimeChart = new Chart(document.getElementById("chartStreamedTime"), configTpsStreame);
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
        
      let dataViewersMoyens = structuredClone(data);
      let configViewersMoyens = structuredClone(config);
      configViewersMoyens.data = dataViewersMoyens;             
      console.log(response.data);
      dataViewersMoyens.datasets[0].label = "Viewers moyens"; //On change le label
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
        const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
        const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
        dataViewersMoyens.labels.push(dateFormat);
        dataViewersMoyens.datasets[0].data.push(element.avg_viewers); //On change la valeur pour le graphique
      });
      const avgViewersChart = new Chart(document.getElementById("chartAvgViewers"), configViewersMoyens);
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
   
        let dataViewersMax = structuredClone(data);
        let configViewersMax = structuredClone(config);
        configViewersMax.data = dataViewersMax;     
        console.log(response.data);
        dataViewersMax.datasets[0].label = "Viewers max"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViewersMax.labels.push(dateFormat);
          dataViewersMax.datasets[0].data.push(element.max_viewers); //On change la valeur pour le graphique
        });
        const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), configViewersMax);
    //////////////////////////////////////////
    //             HEURES VUES              //
    //////////////////////////////////////////
    
        let dataViewedHours = structuredClone(data);
        let configViewedHours = structuredClone(config);
        configViewedHours.data = dataViewedHours;    
        console.log(response.data);
        dataViewedHours.datasets[0].label = "Heures vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViewedHours.labels.push(dateFormat);
          dataViewedHours.datasets[0].data.push(element.hours_watched); //On change la valeur pour le graphique
        });
        const ViewedHoursChart = new Chart(document.getElementById("chartViewedHours"), configViewedHours);
    //////////////////////////////////////////
    //              FOLLOWERS               //
    //////////////////////////////////////////
  
        let dataFollowers = structuredClone(data);
        let configFollowers = structuredClone(config);
        configFollowers.data = dataFollowers;     
        console.log(response.data);
        dataFollowers.datasets[0].label = "Followers"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataFollowers.labels.push(dateFormat);
          dataFollowers.datasets[0].data.push(element.followers_total); //On change la valeur pour le graphique
        });
        const FollowersChart = new Chart(document.getElementById("chartFollowers"), configFollowers);
    //////////////////////////////////////////
    //           FOLLOWERS GAGNES           //
    //////////////////////////////////////////

        let dataFollowersGain = structuredClone(data);
        let configFollowersGain = structuredClone(config);
        configFollowersGain.data = dataFollowersGain;        
        console.log(response.data);
        dataFollowersGain.datasets[0].label = "Followers Gagnés"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataFollowersGain.labels.push(dateFormat);
          dataFollowersGain.datasets[0].data.push(element.followers); //On change la valeur pour le graphique
        });
        const FollowersGainChart = new Chart(document.getElementById("chartFollowersGain"), configFollowersGain);
    //////////////////////////////////////////
    //                 VUES                 //
    //////////////////////////////////////////
   
        let dataViews = structuredClone(data);
        let configViews = structuredClone(config);
        configViews.data = dataViews;       
        console.log(response.data);
        dataViews.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataViews.labels.push(dateFormat);
          dataViews.datasets[0].data.push(element.views); //On change la valeur pour le graphique
        });
        const ViewsChart = new Chart(document.getElementById("chartViews"), configViews);
    //////////////////////////////////////////
    //                 RANK                 //
    //////////////////////////////////////////

        let dataRank = structuredClone(data);
        let configRank = structuredClone(config);
        configRank.data = dataRank;         
        console.log(response.data);
        dataRank.datasets[0].label = "Nombre de vues"; //On change le label
        response.data.forEach(element => { //On parcourt toutes les valeurs (tous les mois du streamer)
          const date = new Date(element.date); //On transforme la date en format Date pour pouvoir la traiter facilement
          const dateFormat = dateList[date.getMonth()] + " " + date.getFullYear();
          dataRank.labels.push(dateFormat);
          dataRank.datasets[0].data.push(element.rank); //On change la valeur pour le graphique
        });
        const RankChart = new Chart(document.getElementById("chartRank"), configRank);
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
