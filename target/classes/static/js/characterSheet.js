"use strict";

let createBtn = document.querySelector("#btnCreate");
let displayDiv = document.querySelector("#accordionFlushExample");
let saveBtn = document.querySelector("#btnSave")

let form = document.querySelector("form");

let count = 0;

let getAll = () => {
    displayDiv.innerHTML = "";
    axios.get("http://localhost:8080/charactersheet/getAll")
        .then((response) => {
            console.log(response);
            displayCharacter(response.data)
        })
        .catch((err) => {
            console.error(err);
        });
}

let create = () => {

    let charactersheet = {
        "forename": inputForename.value,
        "surname": inputSurname.value,
        "level": level.value,
        "charClass": charClass.value,
        "race": race.value,
        "alignment": alignment.value,
        "background": background.value,
        "gender": gender.value
    }

    console.log(charactersheet);

    axios.post("http://localhost:8080/charactersheet/create", charactersheet)
        .then((response) => {
            console.log(response);
            getAll();
        })
        .catch((err) => {
            console.error(err);
        });
}



let deleteId = (id) => {
    axios.delete(`http://localhost:8080/charactersheet/delete/${id}`)
        .then((response) => {
            console.log(response);
            getAll();
        });
}

let update = (id) => {
    axios.get(`http://localhost:8080/charactersheet/get/${id}`)
    axios.put(`http://localhost:8080/charactersheet/update/${id}`)
        .then((response) => {
            console.log(response);
            getAll();
        });
}

// let update = () => {

//     axios.get(`http://localhost:8080/charactersheet/get/${id}`)
//     console.log(charactersheet);
//     for (let entry of data) {
//         let charactersheet = {
//             "forename": entry.forename,
//             "surname": inputSurname.value,
//             "level": level.value,
//             "charClass": charClass.value,
//             "race": race.value,
//             "alignment": alignment.value,
//             "background": background.value,
//             "gender": gender.value
//         }
//     }
// }

// let save = () => {
//     let charactersheet = {
//         "forename": inputForename.value,
//         "surname": inputSurname.value,
//         "level": level.value,
//         "charClass": charClass.value,
//         "race": race.value,
//         "alignment": alignment.value,
//         "background": background.value,
//         "gender": gender.value
//     }

//     console.log(charactersheet);

//     axios.put(`http://localhost:8080/charactersheet/update/${id}`, charactersheet)
//         .then((response) => {
//             console.log(response);
//             getAll();
//         })
//         .catch((err) => {
//             console.error(err);
//         });
// }

let displayCharacter = (data) => {
    for (let entry of data) {
        count++;

        let accordionItem = document.createElement("div");
        accordionItem.setAttribute("class", "accordion-item");

        let accordionHeader = document.createElement("h2");
        accordionHeader.setAttribute("class", "accordion-header");
        accordionHeader.setAttribute("id", "flush-heading" + count);

        let accordionButton = document.createElement("button");
        accordionButton.setAttribute("class", "accordion-button collapsed");
        accordionButton.setAttribute("type", "button");
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", "#flush-collapse" + count);
        accordionButton.setAttribute("aria-expanded", "false");
        accordionButton.setAttribute("aria-controls", "flush-collapse" + count);

        let flushCollapse = document.createElement("div");
        flushCollapse.setAttribute("id", "flush-collapse" + count);
        flushCollapse.setAttribute("class", "accordion-collapse collapse");
        flushCollapse.setAttribute("aria-labelledby", "flush-heading" + count);
        flushCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

        let accordionBody = document.createElement("div");
        accordionBody.setAttribute("class", "accordion-body");

        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("id", "btnUpdate");
        updateBtn.setAttribute("type", "button");
        updateBtn.setAttribute("class", "btn btn-outline-dark");
        updateBtn.setAttribute("data-bs-toggle", "modal");
        updateBtn.setAttribute("data-bs-target", "#updateModal");
        updateBtn.innerHTML = "Update Character";

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "btnDelete");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("class", "btn btn-outline-dark");
        deleteBtn.innerHTML = "Delete Character";

        let buttonDiv = document.createElement("div");

        accordionButton.textContent = `${entry.forename} ${entry.surname}`
        accordionBody.textContent = `${entry.forename} ${entry.surname} is a level ${entry.level} ${entry.gender} ${entry.race} ${entry.charClass}.  They are ${entry.alignment} and spent their time as a ${entry.background} before becoming an adventurer.`;

        buttonDiv.appendChild(updateBtn);
        buttonDiv.appendChild(deleteBtn);
        accordionBody.appendChild(buttonDiv);

        accordionHeader.appendChild(accordionButton);
        flushCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(flushCollapse);

        displayDiv.appendChild(accordionItem);

        deleteBtn.addEventListener("click", function () { deleteId(entry.id); });
        updateBtn.addEventListener("click", function () { update(entry.id); });
    }
}

createBtn.addEventListener("click", create);
//saveBtn.addEventListener("click", save);

