const axios = require("axios").default;

const input = document.getElementById("searchStreamer");


let api = "";

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter')
    {
        api = 
        {
            method: "GET",
            url: "http://localhost:3002/".concat(input.value.toLowerCase())
        };
        // update();
    }
  });

const labels = ["January", "February", "March", "April", "May", "June"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgb(255, 99, 132)",
      data: [0, 10, 5, 2, 20, 30, 45]
    }
  ]
};

const config = {
  type: "line",
  data: data,
  options: {}
};

const myChart = new Chart(document.getElementById("chartStreamedTime"), config);

// const update = () => {
//     axios.get("");
//     axios
//       .request(api)
//       .then(function (response) {

//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//       .then(function () {
//         // always executed
//       });
// };
