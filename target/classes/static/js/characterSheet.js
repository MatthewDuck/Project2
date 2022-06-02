"use strict";

let createBtn = document.querySelector("#btnCreate");
let displayDiv = document.querySelector("#accordionResults");
let saveBtn = document.querySelector("#btnSave")

let form = document.querySelector("form");

let updateForm = document.querySelector("#updateSheet");
let updateForename = document.querySelector("#updateForename");
let updateSurname = document.querySelector("#updateSurname");
let updateLevel = document.querySelector("#updateLevel");
let updateCharClass = document.querySelector("#updateCharClass");
let updateRace = document.querySelector("#updateRace");
let updateAlignment = document.querySelector("#updateAlignment");
let updateBackground = document.querySelector("#updateBackground");
let updateGender = document.querySelector("#updateGender");


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
        "gender": gender.value,
        "charImage" : inputCharImage.value
    }

    //   classInfoDisplay("Artificer");
    // raceInfoDisplay("Dragonborn");
    // backgroundInfoDisplay("Acolyte");


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
        })
        .catch((err) => {
            console.error(err);
        });
}

let populateModal = (id) => {
    axios.get(`http://localhost:8080/charactersheet/get/${id}`)
        .then((response) => {
            console.log(response);
            let entry = response.data;
            updateForm.entryId.value = entry.id;
            updateForm.updateForename.value = entry.forename;
            updateForm.updateSurname.value = entry.surname;
            updateForm.updateLevel.value = entry.level;
            updateForm.updateCharClass.value = entry.charClass;
            updateForm.updateRace.value = entry.race;
            updateForm.updateAlignment.value = entry.alignment;
            updateForm.updateBackground.value = entry.background;
            updateForm.updateGender.value = entry.gender;
            updateForm.updateCharImage.value=entry.charImage;

        })
        .catch((err) => {
            console.error(err);
        });

    classInfoDisplayUpdate(updateCharClass.value);
    raceInfoDisplayUpdate(updateRace.value);
    backgroundInfoDisplayUpdate(updateBackground.value);
}

let update = () => {
    let charactersheetUpdated = {
        "forename": updateForename.value,
        "surname": updateSurname.value,
        "level": updateLevel.value,
        "charClass": updateCharClass.value,
        "race": updateRace.value,
        "alignment": updateAlignment.value,
        "background": updateBackground.value,
        "gender": updateGender.value
    }

    axios.put(`http://localhost:8080/charactersheet/update/${updateForm.entryId.value}`, charactersheetUpdated)
        .then((response) => {
            console.log(response);
            getAll();
        })
        .catch((err) => {
            console.error(err);
        });
}

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

        let imageDiv = document.createElement("div");
        imageDiv.setAttribute("id", "img" + count);

        let charImage = document.createElement("img");
        charImage.src = `${entry.charImage}`

        let flushCollapse = document.createElement("div");
        flushCollapse.setAttribute("id", "flush-collapse" + count);
        flushCollapse.setAttribute("class", "accordion-collapse collapse");
        flushCollapse.setAttribute("aria-labelledby", "flush-heading" + count);
        flushCollapse.setAttribute("data-bs-parent", "#accordionFlushExample");

        let accordionBody = document.createElement("div");
        accordionBody.setAttribute("class", "accordion-body");

        let updateBtn = document.createElement("button");
        updateBtn.setAttribute("id", `${entry.id}`);
        updateBtn.setAttribute("type", "button");
        updateBtn.setAttribute("class", "btn btn-outline-dark");
        updateBtn.setAttribute("data-bs-toggle", "modal");
        updateBtn.setAttribute("data-bs-target", "#updateModal");
        updateBtn.setAttribute("onclick", "populateModal(this.id)");
        updateBtn.innerHTML = "Update Character";

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", `${entry.id}`);
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("class", "btn btn-outline-dark");
        deleteBtn.setAttribute("onclick", "deleteId(this.id)");
        deleteBtn.innerHTML = "Delete Character";

        let buttonDiv = document.createElement("div");

        accordionButton.textContent = `${entry.forename} ${entry.surname}`
        accordionBody.textContent = `${entry.forename} ${entry.surname} is a level ${entry.level} ${entry.gender} ${entry.race} ${entry.charClass}. They are ${entry.alignment} and spent their time as a ${entry.background} before becoming an adventurer.`;

        buttonDiv.appendChild(updateBtn);
        buttonDiv.appendChild(deleteBtn);
        imageDiv.appendChild(charImage);
        accordionBody.appendChild(imageDiv);
        accordionBody.appendChild(buttonDiv);

        accordionHeader.appendChild(accordionButton);
        flushCollapse.appendChild(accordionBody);
        accordionItem.appendChild(accordionHeader);
        accordionItem.appendChild(flushCollapse);

        displayDiv.appendChild(accordionItem);
    }
}

function classInfoDisplay() {
    classData.textContent = "";
    let classDisplay = charClass.value;
    classData.textContent = classInfo(classDisplay);
}

function classInfoDisplayUpdate() {
    classData.textContent = "";
    let classDisplay = updateCharClass.value;
    classDataUpdate.textContent = classInfo(classDisplay);
}

function classInfo(classDisplay) {
    if (classDisplay == "Artificer") {
        return "Masters of invention, artificers use ingenuity and magic to unlock extraordinary capabilities in objects. They see magic as a complex system waiting to be decoded and then harnessed in their spells and inventions.";
    } else if (classDisplay == "Barbarian") {
        return "For some, their rage springs from a communion with fierce animal spirits. Others draw from a roiling reservoir of anger at a world full of pain. For every barbarian, rage is a power that fuels not just a battle frenzy but also uncanny reflexes, resilience, and feats of strength.";
    } else if (classDisplay == "Bard") {
        return "Whether scholar, skald, or scoundrel, a bard weaves magic through words and music to inspire allies, demoralize foes, manipulate minds, create illusions, and even heal wounds. The bard is a master of song, speech, and the magic they contain.";
    } else if (classDisplay == "Cleric") {
        return "Clerics are intermediaries between the mortal world and the distant planes of the gods. As varied as the gods they serve, clerics strive to embody the handiwork of their deities. No ordinary priest, a cleric is imbued with divine magic.";
    } else if (classDisplay == "Druid") {
        return "Whether calling on the elemental forces of nature or emulating the creatures of the animal world, druids are an embodiment of nature's resilience, cunning, and fury. They claim no mastery over nature, but see themselves as extensions of nature's indomitable will.";
    } else if (classDisplay == "Fighter") {
        return "Fighters share an unparalleled mastery with weapons and armor, and a thorough knowledge of the skills of combat. They are well acquainted with death, both meting it out and staring it defiantly in the face.";
    } else if (classDisplay == "Monk") {
        return "Monks are united in their ability to magically harness the energy that flows in their bodies. Whether channeled as a striking display of combat prowess or a subtler focus of defensive ability and speed, this energy infuses all that a monk does.";
    } else if (classDisplay == "Paladin") {
        return "Whether sworn before a god's altar and the witness of a priest, in a sacred glade before nature spirits and fey beings, or in a moment of desperation and grief with the dead as the only witness, a paladin's oath is a powerful bond.";
    } else if (classDisplay == "Ranger") {
        return "Far from the bustle of cities and towns, past the hedges that shelter the most distant farms from the terrors of the wild, amid the dense-packed trees of trackless forests and across wide and empty plains, rangers keep their unending watch.";
    } else if (classDisplay == "Rogue") {
        return "Rogues rely on skill, stealth, and their foes' vulnerabilities to get the upper hand in any situation. They have a knack for finding the solution to just about any problem, demonstrating a resourcefulness and versatility that is the cornerstone of any successful adventuring party.";
    } else if (classDisplay == "Sorcerer") {
        return "Sorcerers carry a magical birthright conferred upon them by an exotic bloodline, some otherworldly influence, or exposure to unknown cosmic forces. No one chooses sorcery; the power chooses the sorcerer.";
    } else if (classDisplay == "Warlock") {
        return "Warlocks are seekers of the knowledge that lies hidden in the fabric of the multiverse. Through pacts made with mysterious beings of supernatural power, warlocks unlock magical effects both subtle and spectacular.";
    } else if (classDisplay == "Wizard") {
        return "Wizards are supreme magic-users, defined and united as a class by the spells they cast. Drawing on the subtle weave of magic that permeates the cosmos, wizards cast spells of explosive fire, arcing lightning, subtle deception, brute-force mind control, and much more.";
    }
}

function raceInfoDisplay() {
    raceData.textContent = "";
    let raceDisplay = race.value;
    raceData.textContent = raceInfo(raceDisplay);
}

function raceInfoDisplayUpdate() {
    raceData.textContent = "";
    let raceDisplay = updateRace.value;
    raceDataUpdate.textContent = raceInfo(raceDisplay);
}

function raceInfo(raceDisplay) {
    if (raceDisplay == "Dragonborn") {
        return "The dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids.";
    } else if (raceDisplay == "Dwarf") {
        return "Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs. These common threads unite all dwarves.";
    } else if (raceDisplay == "Elf") {
        return "Elves are a magical people of otherworldly grace, living in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry.";
    } else if (raceDisplay == "Gnome") {
        return "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.";
    } else if (raceDisplay == "Half-elf") {
        return "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.";
    } else if (raceDisplay == "Half-orc") {
        return "When alliances between humans and orcs are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.";
    } else if (raceDisplay == "Halfling") {
        return "The comforts of home are the goals of most halflings' lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies. Others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. Halflings work readily with others, and they are loyal to their friends, whether halfling or otherwise. They can display remarkable ferocity when their friends, families, or communities are threatened.";
    } else if (raceDisplay == "Human") {
        return "In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that's why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.";
    } else if (raceDisplay == "Tiefling") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    }
}

function backgroundInfoDisplay() {
    backgroundData.textContent = "";
    let backgroundDisplay = background.value;
    backgroundData.textContent = backgroundInfo(backgoundDisplay);
}

function backgroundInfoDisplayUpdate() {
    backgroundData.textContent = "";
    let backgroundDisplay = updateBackground.value;
    backgroundDataUpdate.textContent = backgroundInfo(backgroundDisplay);
}

function backgroundInfo(backgroundDisplay) {
    if (backgroundDisplay == "Acolyte") {
        return "The dragonborn walk proudly through a world that greets them with fearful incomprehension. Shaped by the dragons themselves, dragonborn originally hatched from dragon eggs as a unique race, combining the best attributes of dragons and humanoids.";
    } else if (backgroundDisplay == "Athlete") {
        return "Kingdoms rich in ancient grandeur, halls carved into the roots of mountains, the echoing of picks and hammers in deep mines and blazing forges, a commitment to clan and tradition, and a burning hatred of goblins and orcs. These common threads unite all dwarves.";
    } else if (backgroundDisplay == "Charlatan") {
        return "Elves are a magical people of otherworldly grace, living in places of ethereal beauty, in the midst of ancient forests or in silvery spires glittering with faerie light, where soft music drifts through the air and gentle fragrances waft on the breeze. Elves love nature and magic, art and artistry, music and poetry.";
    } else if (backgroundDisplay == "City Watch") {
        return "A constant hum of busy activity pervades the warrens and neighborhoods where gnomes form their close-knit communities. Louder sounds punctuate the hum: a crunch of grinding gears here, a minor explosion there, a yelp of surprise or triumph, and especially bursts of laughter. Gnomes take delight in life, enjoying every moment of invention, exploration, investigation, creation, and play.";
    } else if (backgroundDisplay == "Criminal") {
        return "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of their elf and human parents: human curiosity, inventiveness, and ambition tempered by the refined senses, love of nature, and artistic tastes of the elves.";
    } else if (backgroundDisplay == "Entertainer") {
        return "When alliances between humans and orcs are sealed by marriages, half-orcs are born. Some half-orcs rise to become proud chiefs of orc tribes, their human blood giving them an edge over their full-blooded orc rivals. Some venture into the world to prove their worth among humans and other more civilized races. Many of these become adventurers, achieving greatness for their mighty deeds and notoriety for their barbaric customs and savage fury.";
    } else if (backgroundDisplay == "Feylost") {
        return "The comforts of home are the goals of most halflings' lives: a place to settle in peace and quiet, far from marauding monsters and clashing armies. Others form nomadic bands that travel constantly, lured by the open road and the wide horizon to discover the wonders of new lands and peoples. Halflings work readily with others, and they are loyal to their friends, whether halfling or otherwise. They can display remarkable ferocity when their friends, families, or communities are threatened.";
    } else if (backgroundDisplay == "Fisher") {
        return "In the reckonings of most worlds, humans are the youngest of the common races, late to arrive on the world scene and short-lived in comparison to dwarves, elves, and dragons. Perhaps it is because of their shorter lives that they strive to achieve as much as they can in the years they are given. Or maybe they feel they have something to prove to the elder races, and that's why they build their mighty empires on the foundation of conquest and trade. Whatever drives them, humans are the innovators, the achievers, and the pioneers of the worlds.";
    } else if (backgroundDisplay == "Gladiator") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    } else if (backgroundDisplay == "Hermit") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    } else if (backgroundDisplay == "Knight") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    } else if (backgroundDisplay == "Noble") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    } else if (backgroundDisplay == "Pirate") {
        return "To be greeted with stares and whispers, to suffer violence and insult on the street, to see mistrust and fear in every eye: this is the lot of the tiefling. And to twist the knife, tieflings know that this is because a pact struck generations ago infused the essence of Asmodeus, overlord of the Nine Hells (and many of the other powerful devils serving under him) into their bloodline. Their appearance and their nature are not their fault but the result of an ancient sin, for which they and their children and their children's children will always be held accountable.";
    }
}


createBtn.addEventListener("click", create);
btnSave.addEventListener("click", update);