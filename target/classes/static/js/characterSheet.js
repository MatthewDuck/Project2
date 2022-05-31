"use strict";

let createBtn = document.querySelector("#btnSave")
let deleteBtn = document.querySelector("#btnDelete")
let readAllBtn = document.querySelector("#btnReadAll")
let updateBtn = document.querySelector("#btnUpdate")

let form = document.querySelector("form")


let getAll = () => {
    axios.get("http://localhost:8080/charactersheet/getAll")
        .then((response) => {
            console.log(response);
            //displayCharacter(response.data.data)
        })
        .catch((err) => {
            console.error(err)
        })
}

let create = () => {

    let charactersheet = {
        "forename": inputForename.value,
        "surname": inputSurname.value,
        "level":level.value,
        "class":charClass.value,
        "race":race.value,
        "alignment":alignment.value,
        "background":background.value,
        "gender":gender.value
    }
    
    axios.post("http://localhost:8080/charactersheet/create", charactersheet)
        .then((response) => {
            console.log(response);
            getAll();
        })
        .catch((err) => {
            console.error(err);
        })
}

let deleteId = (id) => {
    axios.delete("http://localhost:8080/charactersheet/delete/{id}", id)
        .then((response) => {
            console.log(response);
            getAll();
        })
}

let update = (id) => {
    axios.get("http://localhost:8080/charactersheet/get/{id}", id)
    axios.put("http://localhost:8080/charactersheet/update/{id}", id)
        .then((response) => {
            console.log(response);
            getAll();
        })
}

let displayCharacter = (data) => {
    for (let entry of data) {
        const text = document.createTextNode(`${entry.forename} ${entry.surname} ${entry.class}`);
    }

}

createBtn.addEventListener("click", create);
deleteBtn.addEventListener("click", deleteId(id));
readAllBtn.addEventListener("click", getAll);
updateBtn.addEventListener("click", update(id));

