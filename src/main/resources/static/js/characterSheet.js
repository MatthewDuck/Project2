"use strict";

let createBtn = document.querySelector("#btnCreate")
let readBtn = document.querySelector("#btnRead")
let form = document.querySelector("form")


let getAll = () => {
    axios.get("http://localhost:8080/charactersheet/getAll")
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.error(err)
        })
}

let create = () => {
    axios.post("http://localhost:8080/charactersheet/create", charactersheet)
        .then((response) => {
            console.log(response);
            getAll();
        })
        .catch((err) => {
            console.error(err);
        })
}

createBtn.addEventListener("click", create);
readBtn.addEventListener("click", getAll);

