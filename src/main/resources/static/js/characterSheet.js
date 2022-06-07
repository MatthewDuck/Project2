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
        "gender": updateGender.value,
        "charImage" : updateCharImage.value
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
        accordionBody.appendChild(buttonDiv);
        accordionBody.appendChild(imageDiv);
        

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
        return "You have spent your life in the service of a temple to a specific god or pantheon of gods. You act as an intermediary between the realm of the holy and the mortal world, performing sacred rites and offering sacrifices in order to conduct worshipers into the presence of the divine. You are not necessarily a cleric – performing sacred rites is not the same thing as channeling divine power.";
    } else if (backgroundDisplay == "Athlete") {
        return "You strive to perfect yourself physically and in execution of everything you do. The thrill of competition lights fire in your blood, and the roar of the crowd drives you forward. Tales of your exploits precede you and might open doors or loosen tongues.Whether in one of the poleis, between them, or among the nonhuman peoples of Theros, physical contests and those who pursue them command respect bordering on reverence. Athletes arise from all walks of life and all cultures and quite often cross paths with one another.";
    } else if (backgroundDisplay == "Charlatan") {
        return "You have always had a way with people. You know what makes them tick, you can tease out their hearts' desires after a few minutes of conversation, and with a few leading questions you can read them like they were children's books. It's a useful talent, and one that you're perfectly willing to use for your advantage.You know what people want and you deliver, or rather, you promise to deliver. Common sense should steer people away from things that sound too good to be true, but common sense seems to be in short supply when you're around. The bottle of pink colored liquid will surely cure that unseemly rash, this ointment – nothing more than a bit of fat with a sprinkle of silver dust can restore youth and vigor, and there's a bridge in the city that just happens to be for sale. These marvels sound implausible, but you make them sound like the real deal.";
    } else if (backgroundDisplay == "City Watch") {
        return "ou have served the community where you grew up, standing as its first line of defense against crime. You aren't a soldier, directing your gaze outward at possible enemies. Instead, your service to your hometown was to help police its populace, protecting the citizenry from lawbreakers and malefactors of every stripe.You might have been part of the City Watch of Waterdeep, the baton-wielding police force of the City of Splendors, protecting the common folk from thieves and rowdy nobility alike. Or you might have been one of the valiant defenders of Silverymoon, a member of the Silverwatch or even one of the magic-wielding Spellguard.Perhaps you hail from Neverwinter and have served as one of its Wintershield watchmen, the newly founded branch of guards who vow to keep safe the City of Skilled Hands.Even if you're not city-born or city-bred, this background can describe your early years as a member of law enforcement. Most settlements of any size have their own constables and police forces, and even smaller communities have sheriffs and bailiffs who stand ready to protect their community.";
    } else if (backgroundDisplay == "Criminal") {
        return "You are an experienced criminal with a history of breaking the law. You have spent a lot of time among other criminals and still have contacts within the criminal underworld. You're far closer than most people to the world of murder, theft, and violence that pervades the underbelly of civilization, and you have survived up to this point by flouting the rules and regulations of society.";
    } else if (backgroundDisplay == "Entertainer") {
        return "You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger. Your music raises their spirits or captures their sorrow. Your dance steps captivate, your humor cuts to the quick. Whatever techniques you use, your art is your life.";
    } else if (backgroundDisplay == "Feylost") {
        return "You grew up in the Feywild after disappearing from your home plane as a child. Perhaps you were spirited away by kindly Fey who thought you were destined for great things. Perhaps you stumbled through a Fey crossing by chance during a twilight stroll in the woods. Perhaps you were kidnapped by evil Fey but escaped from their clutches. Whatever the manner of your disappearance, you gradually fell under the Feywild's spell and learned a little about the nature of the mercurial tricksters that dwell there.When you finally returned to your home plane, you did not come back unchanged. You are haunted by the fact the Feywild-a mirror world hidden behind a mere twist of perception-is only a hair's breadth away. Although your memories of the Feywild grow fainter with each passing day, your heart swells with a mixture of fear and joy at the prospect of one day venturing back to the Plane of Faerie-your home away from home.";
    } else if (backgroundDisplay == "Fisher") {
        return "You have spent your life aboard fishing vessels or combing the shallows for the bounty of the ocean. Perhaps you were born into a family of fisher folk, working with your kin to feed your village. Maybe the job was a means to an end - a way out of an undesirable circumstance that forced you to take up life aboard a ship. Regardless of how you began, you soon fell in love with the sea, the art of fishing, and the promise of the eternal horizon.";
    } else if (backgroundDisplay == "Gladiator") {
        return "You thrive in front of an audience. You know how to entrance them, entertain them, and even inspire them. Your poetics can stir the hearts of those who hear you, awakening grief or joy, laughter or anger. Your music raises their spirits or captures their sorrow. Your dance steps captivate, your humor cuts to the quick. Whatever techniques you use, your art is your life. A gladiator is as much an entertainer as any minstrel or circus performer trained to make the arts of combat into a spectacle the crowd can enjoy. This kind of flashy combat is your entertainer routine, though you might also have some skills as a tumbler or actor.";
    } else if (backgroundDisplay == "Hermit") {
        return "You lived in seclusion, either in a sheltered community such as a monastery, or entirely alone, for a formative part of your life. In your time apart from the clamor of society, you found quiet, solitude, and perhaps some of the answers you were looking for.";
    } else if (backgroundDisplay == "Knight") {
        return "You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevated to the nobility, or a disinherited scoundrel with a disproportionate sense of entitlement. Or you could be an honest, hard-working landowner who cares deeply about the people who live and work on your land, keenly aware of your responsibility to them. A knighthood is among the lowest noble titles in most societies, but it can be a path to higher status.";
    } else if (backgroundDisplay == "Noble") {
        return "You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence. You might be a pampered aristocrat unfamiliar with work or discomfort, a former merchant just elevated to the nobility, or a disinherited scoundrel with a disproportionate sense of entitlement. Or you could be an honest, hard-working landowner who cares deeply about the people who live and work on your land, keenly aware of your responsibility to them.";
    } else if (backgroundDisplay == "Pirate") {
        return "You spent your youth under the sway of a dread pirate, a ruthless cutthroat who taught you how to survive in a world of sharks and savages. You've indulged in larceny on the high seas and sent more than one deserving soul to a briny grave. Fear and bloodshed are no strangers to you, and you've garnered a somewhat unsavory reputation in many a port town.";
    }
}


createBtn.addEventListener("click", create);
btnSave.addEventListener("click", update);