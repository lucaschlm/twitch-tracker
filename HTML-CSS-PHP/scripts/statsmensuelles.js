const axios = require("axios").default;

const input = document.getElementById("searchbar");

let inputDate = ""

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter')
    {
        inputDate = input.value.replace(/\s/g, '');
        update();
    }
  });

let labels = [];

const data = {
  labels: labels,
  datasets: []
};

const config = {
  type: "bar",
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
const streamedAvgViewers = new Chart(document.getElementById("chartAvgViewers"), configViewersMoyens);
const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), configViewersMax);
const ViewedHoursChart = new Chart(document.getElementById("chartViewedHours"), configViewedHours);
const FollowersChart = new Chart(document.getElementById("chartFollowers"), configFollowers);
const FollowersGainChart = new Chart(document.getElementById("chartFollowersGain"), configFollowersGain);
const ViewsChart = new Chart(document.getElementById("chartViews"), configViews);
const RankChart = new Chart(document.getElementById("chartRank"), configRank);


const update = () => {
    axios.get("https://twitchtracking.maximilienherr.web-edu.fr/index.php/steamerDate/".concat(inputDate)) //On récupère l'api
      .then(function (response) {
        labels = []; //On vide les labels (dans le cas où il a déjà été utilisé)
        data.datasets = []; //Pareil pour les datas
        data.labels = labels;
        labels.push(inputDate);
    //////////////////////////////////////////
    //             TEMPS STREAME            //
    //////////////////////////////////////////    
      let dataTpsStreame = structuredClone(data);
      configTpsStreame.data = dataTpsStreame;     
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
        dataTpsStreame.datasets.push({
          label: element.name,
          backgroundColor: "#EB5D1B",
          borderColor: "#EB5D1B",
          data: [element.minutes_streamed / 60]
        });
      });
      streamedTimeChart.update();
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
    let dataViewersMoyens = structuredClone(data);
    configViewersMoyens.data = dataViewersMoyens;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewersMoyens.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.avg_viewers]
      });
    });
    streamedAvgViewers.update();
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
    let dataViewersMax = structuredClone(data);
    configViewersMax.data = dataViewersMax;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewersMax.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.max_viewers]
      });
    });
    maxViewersChart.update();
    //////////////////////////////////////////
    //             HEURES VUES              //
    //////////////////////////////////////////
    let dataViewedHours = structuredClone(data);
    configViewedHours.data = dataViewedHours;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewedHours.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.hours_watched]
      });
    });
    ViewedHoursChart.update();
    //////////////////////////////////////////
    //              FOLLOWERS               //
    //////////////////////////////////////////
    let dataFollowers = structuredClone(data);
    configFollowers.data = dataFollowers;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataFollowers.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.followers_total]
      });
    });
    FollowersChart.update();
    //////////////////////////////////////////
    //           FOLLOWERS GAGNES           //
    //////////////////////////////////////////
    let dataFollowersGain = structuredClone(data);
    configFollowersGain.data = dataFollowersGain;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataFollowersGain.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.followers]
      });
    });
    FollowersGainChart.update();
    //////////////////////////////////////////
    //                 VUES                 //
    //////////////////////////////////////////
    let dataViews = structuredClone(data);
    configViews.data = dataViews;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViews.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.views]
      });
    });
    ViewsChart.update();
    //////////////////////////////////////////
    //                 RANK                 //
    //////////////////////////////////////////
    let dataRank = structuredClone(data);
    configRank.data = dataRank;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataRank.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.rank]
      });
    });
    RankChart.update();
    })
      .catch(function (error) {
        // handle error
        if (error.response.status == 404)
        {
          alert("Date introuvable (pensez à vérifier le format");
        }
      })
      .then(function () {
        // always executed
      });
};
