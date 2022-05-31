"use strict";

let createBtn = document.querySelector("#btnCreate")
let readBtn = document.querySelector("#btnRead")
let form = document.querySelector("form")

let displayResult = (data) => {
    for (let entry of data) {

    }
}


let getAll = () => {
    axios.get("http://localhost:8080/charactersheet/getAll")
        .then((response) => {
            displayResult(response.data);
        })
        .catch((err) => {
            console.error(err)
        })
}

let create = (e) => {
    const charactersheet = Object.fromEntries(new FormData(e.target).entries());

    axios.post("http://localhost:8080/charactersheet/create", charactersheet)
        .then((response) => {
            console.log(response);
            getAll();
        })
        .catch((err) => {
            console.error(err);
        })
}

createBtn.addEventListener("click", create(e));
readBtn.addEventListener("click", getAll);

