"use strict";

let createBtn = document.querySelector("#btnSave");
let displayDiv = document.querySelector("#accordionFlushExample");

let form = document.querySelector("form");

let count = 0;

let getAll = () => {
    displayDiv.innerHTML="";
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

let displayCharacter = (data) => {
    for (let entry of data) {
        count++;
        
        const characterDetails = document.createTextNode(`${entry.level} ${entry.charClass} ${entry.race} ${entry.alignment} ${entry.background} ${entry.gender}`);

        let accordionItem = document.createElement("div");
        accordionItem.setAttribute("class", "accordion-item");

        let accordionHeader = document.createElement("h2");
        accordionHeader.setAttribute("class", "accordion-header");
        accordionHeader.setAttribute("id", "flush-heading"+count);

        let accordionBtn = document.createElement("button");
        accordionBtn.setAttribute("class", "accordion-button collapsed");
        accordionBtn.setAttribute("type", "button");
        accordionBtn.setAttribute("date-bs-toggle", "collapse");
        accordionBtn.setAttribute("data-bs-target", "#flush-collapse"+count);
        accordionBtn.setAttribute("aria-expanded", "false");
        accordionBtn.setAttribute("aria-controls", "flush-collapse"+count);
        accordionBtn.textContent = `${entry.forename} ${entry.surname}`;

        let flushCollapse = document.createElement("div");
        flushCollapse.setAttribute("id", "flush-collapse"+count);
        flushCollapse.setAttribute("class", "accordion-collapse collapse");
        flushCollapse.setAttribute("aria-labelledby", "flush-heading"+count);
        flushCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

        let accordionBody = document.createElement("div");
        accordionBody.setAttribute("class", "accordion-body");

        // let updateBtn = document.createElement("button");
        // updateBtn.setAttribute("id", "btnUpdate");
        // updateBtn.setAttribute("type", "button");
        // updateBtn.setAttribute("class", "btn btn-outline-dark");
        // updateBtn.innerHTML = "Update Character";

        // let deleteBtn = document.createElement("button");
        // deleteBtn.setAttribute("id", "btnDelete");
        // deleteBtn.setAttribute("type", "button");
        // deleteBtn.setAttribute("class", "btn btn-outline-dark");
        // deleteBtn.innerHTML = "Delete Character";

        //let buttonDiv = document.createElement("div");

       
        accordionHeader.appendChild(accordionBtn);
        accordionItem.appendChild(accordionHeader);
        //buttonDiv.appendChild(updateBtn);
        //buttonDiv.appendChild(deleteBtn);
        accordionBody.appendChild(characterDetails);
        //accordionBody.appendChild(buttonDiv);
        flushCollapse.appendChild(accordionBody);
        accordionItem.appendChild(flushCollapse);
        displayDiv.appendChild(accordionItem);

        //deleteBtn.addEventListener("click", function () { deleteId(entry.id); });
       // updateBtn.addEventListener("click", function () { update(entry.id); });
        
        
    }
}

createBtn.addEventListener("click", create);

