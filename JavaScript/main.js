// Kjører når man trykker på vis resultat
function calculatePoints() {
    const form = document.getElementById('valgomatForm');
    const statements = form.querySelectorAll('.statement_box');

    // Initialize party points og Total points
    const partyPoints = {
        rødt: 0,
        sv: 0,
        ap: 0,
        sp: 0,
        mdg: 0,
        krf: 0,
        venstre: 0,
        høyre: 0,
        frp: 0
    };

    // Går gjennom hvert statement og ser om en radio er chekced, hvis ja ser den på verdien, og legger til poeng til tilsvarende parti i partyPoints
    statements.forEach((statement, index) => {
        const selectedRadio = statement.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            const selectedParties = selectedRadio.value.split(',');
            for (const party of selectedParties) {
                if (partyPoints.hasOwnProperty(party)) {
                    partyPoints[party]++;
                }
            }
        }
    });

    // Tester at det funker
    console.log(partyPoints);

    const percentageResults = {};

    // Finner verdien til partiene og deler det på antall spørsmål hvis den har mer enn 0
    const numStatements = statements.length;
    for (const party in partyPoints) {
        if (partyPoints.hasOwnProperty(party)) {
            const partyPointsValue = partyPoints[party];
            const percentage = numStatements > 0 ? (partyPointsValue / numStatements) * 100 : 0; // Unngå deling på 0
            percentageResults[party] = percentage;
        }
    }

    // Sorter percentageResults fra høyest til lavest
    const sortedResults = Object.entries(percentageResults)
        .sort(([, a], [, b]) => b - a)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    // Console logger sortedResults
    console.log(sortedResults);

    const exportElement = document.getElementById("formResults");

    // Clearer forrige resultater
    exportElement.innerHTML = "";

    // Legger til "barn" og resultatene i HTML
    for (const party in sortedResults) {
        if (sortedResults.hasOwnProperty(party)) {
            const percentage = sortedResults[party];
            exportElement.appendChild(document.createElement("p"));
            exportElement.lastChild.innerHTML = `${party}: ${percentage.toFixed(2)}%`; // Rund opp til 2 decimaler
        }
    }

    exportElement.classList.add("results")
}

// Scroller når man trykker på en radio (funker bare på 16:10 skjerm)
document.getElementById('valgomatForm').addEventListener('change', function (event) {
    const x = 1050;
        window.scrollBy({
            top: x,
            behavior: "smooth"
        });
})

// Scroller nesderst når man trykker på vis resultat
document.addEventListener("DOMContentLoaded", function () {
    var scrollButton = document.getElementById("visResultatBtn");

    scrollButton.addEventListener("click", function () {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
});

const formContainer = document.getElementById("valgomatForm");

const images = ["Assets/Crying.png", 'Assets/Disappointed.png', 'Assets/Happy.png', 'Assets/LOL.png'];

function lagSporsmal(sporsmalTekst, nr, partyValues) {
    const placementBox = document.createElement("div");
    placementBox.classList.add("placement_box");

    const infoBox = document.createElement("div");
    infoBox.classList.add("info_box");

    const infoBoxStuff = document.createElement("div");
    infoBoxStuff.classList.add("info_box_stuff");

    const statementBox = document.createElement("div");
    statementBox.classList.add("statement_box");

    const sporsmal = document.createElement("h2");
    sporsmal.textContent = sporsmalTekst;

    const statementBoxChoices = document.createElement("div");
    statementBoxChoices.classList.add("statement_box_choises");

    const labels = ["Helt enig", "Litt enig", "Litt uenig", "Helt uenig"];

    for (let teller = 0; teller < labels.length; teller++) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        const radioImage = document.createElement("div");
        const radioText = document.createElement("span");

        input.type = "radio";
        input.name = "statement" + nr;
        input.value = partyValues[teller];

        radioImage.style.backgroundImage = "url('" + images[teller] + "')";

        radioText.textContent = labels[teller];

        label.classList.add("radio_label");
        radioImage.classList.add("radio_image");
        radioText.classList.add("radio_text");

        label.appendChild(input);
        label.appendChild(radioImage);
        label.appendChild(radioText);

        statementBoxChoices.appendChild(label);
    };

    statementBox.appendChild(sporsmal);
    statementBox.appendChild(statementBoxChoices);
    infoBoxStuff.appendChild(statementBox);
    infoBox.appendChild(infoBoxStuff);
    placementBox.appendChild(infoBox);
    formContainer.appendChild(placementBox);
};

lagSporsmal("Vi bør ha høye skatter i Norge, for å ha råd til flere fellesgoder.", "1", ["høyre,frp", "venstre,krf", "ap,venstre,krf", "ap,venstre,krf"]);
lagSporsmal("Vi trenger flere private alternativ i blant annet helsesektoren for å få flere valg for pasienter.", "2", ["rødt,sv,ap", "sp", "venstre,krf", "høyre,frp"]);
lagSporsmal("Norge bør innføre strengere innvandringsregler.", "3", ["venstre,mdg", "sv,krf,rødt", "ap,sp", "høyre,frp"]);
lagSporsmal("Vi trenger en rusreform der vi avkriminaliserer brukerdoser med cannabis.", "4", ["frp", "sp", "krf,ap", "høyre,sv,venstre,mdg,rødt"]);
lagSporsmal("De rikeste fikk for mye hjelp under koronakrisen.", "5", ["høyre", "krf,venstre,frp", "ap,sp,mdg", "rødt,sv"]);
lagSporsmal("Jeg mener vi bør slutte å lete etter mer olje nå.", "6", ["sp,høyre,frp", "ap", "krf", "rødt,sv,mdg,venstre"]);
lagSporsmal("Jeg er bekymret for at internasjonale avtaler fører til at Norge får mindre makt.", "7", ["mdg,venstre,høyre", "ap,krf", "frp", "rødt,sv,sp"]);
lagSporsmal("Den kristne kulturarven bør påvirke de politiske vedtakene vi gjør.", "8", ["rødt,sv,ap,mdg,venstre", "", "høyre,frp", "sp,krf"]);
lagSporsmal("Sammenslåtte kommuner og fylker bør få oppheve sammenslåingen.", "9", ["krf,venstre,høyre,frp", "", "ap,mdg", "rødt,sv,sp"]);
lagSporsmal("EØS-avtalen er for dårlig for Norge, vi bør si den opp og prøve å forhandle fram noe bedre.", "10", ["ap,mdg,krf,venstre,høyre", "sp", "frp", "rødt,sv,sp"]);
