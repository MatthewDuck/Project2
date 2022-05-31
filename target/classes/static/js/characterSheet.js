"use strict";

let createBtn = document.querySelector("#create")

let createSheet = () => {
    axios.create("localhost:8080").then((Response) => {
        console.log(response.data);
        displayResult(response.data);
    })
    .catch((err) => {
        console.error(err);
    })
}

let displayResult = (data) => {
    for(let entry of data) {
        
    }
}







createBtn.addEventListener("click", createSheet);