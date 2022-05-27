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

const update = () => {
    axios.get("http://localhost:3000/".concat(inputDate)) //On récupère l'api
      .then(function (response) {
        labels.push(inputDate);
    //////////////////////////////////////////
    //             TEMPS STREAME            //
    //////////////////////////////////////////    
      let dataTpsStreame = structuredClone(data);
      let configTpsStreame = structuredClone(config);
      configTpsStreame.data = dataTpsStreame;     
      response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
        dataTpsStreame.datasets.push({
          label: element.name,
          backgroundColor: "#EB5D1B",
          borderColor: "#EB5D1B",
          data: [element.minutes_streamed / 60]
        });
      });
      const streamedTimeChart = new Chart(document.getElementById("chartStreamedTime"), configTpsStreame);
    //////////////////////////////////////////
    //            VIEWERS MOYENS            //
    //////////////////////////////////////////
    let dataViewersMoyens = structuredClone(data);
    let configViewersMoyens = structuredClone(config);
    configViewersMoyens.data = dataViewersMoyens;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewersMoyens.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.avg_viewers]
      });
    });
    const streamedAvgViewers = new Chart(document.getElementById("chartAvgViewers"), configViewersMoyens);
    //////////////////////////////////////////
    //             VIEWERS MAX              //
    //////////////////////////////////////////
    let dataViewersMax = structuredClone(data);
    let configViewersMax = structuredClone(config);
    configViewersMax.data = dataViewersMax;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewersMax.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.max_viewers]
      });
    });
    const maxViewersChart = new Chart(document.getElementById("chartMaxViewers"), configViewersMax);
    //////////////////////////////////////////
    //             HEURES VUES              //
    //////////////////////////////////////////
    let dataViewedHours = structuredClone(data);
    let configViewedHours = structuredClone(config);
    configViewedHours.data = dataViewedHours;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViewedHours.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.hours_watched]
      });
    });
    const ViewedHoursChart = new Chart(document.getElementById("chartViewedHours"), configViewedHours);
    //////////////////////////////////////////
    //              FOLLOWERS               //
    //////////////////////////////////////////
    let dataFollowers = structuredClone(data);
    let configFollowers = structuredClone(config);
    configFollowers.data = dataFollowers;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataFollowers.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.followers_total]
      });
    });
    const FollowersChart = new Chart(document.getElementById("chartFollowers"), configFollowers);
    //////////////////////////////////////////
    //           FOLLOWERS GAGNES           //
    //////////////////////////////////////////
    let dataFollowersGain = structuredClone(data);
    let configFollowersGain = structuredClone(config);
    configFollowersGain.data = dataFollowersGain;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataFollowersGain.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.followers]
      });
    });
    const FollowersGainChart = new Chart(document.getElementById("chartFollowersGain"), configFollowersGain);
    //////////////////////////////////////////
    //                 VUES                 //
    //////////////////////////////////////////
    let dataViews = structuredClone(data);
    let configViews = structuredClone(config);
    configViews.data = dataViews;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataViews.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.views]
      });
    });
      const ViewsChart = new Chart(document.getElementById("chartViews"), configViews);
    //////////////////////////////////////////
    //                 RANK                 //
    //////////////////////////////////////////
    let dataRank = structuredClone(data);
    let configRank = structuredClone(config);
    configRank.data = dataRank;     
    response.data.forEach(element => { //On parcourt toutes les valeurs (tous les streamers)
      dataRank.datasets.push({
        label: element.name,
        backgroundColor: "#EB5D1B",
        borderColor: "#EB5D1B",
        data: [element.rank]
      });
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
