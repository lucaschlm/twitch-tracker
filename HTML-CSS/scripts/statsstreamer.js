const axios = require("axios").default;

const input = document.getElementById("searchStreamer");


let api = "";

input.addEventListener("keypress", (e) => {
    if (e.key === 'Enter')
    {
        api = 
        {
            method: "GET",
            url: "http://localhost:3000/".concat(input.value.toLowerCase())
        };
        update();
    }
  });

  