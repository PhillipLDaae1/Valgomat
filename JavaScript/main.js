let partiPoeng = {
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

function calculatePoints() {

    

    const form = document.getElementById('valgomatForm');
    const statements = form.querySelectorAll('.statement_box');

    // Initialize party points and total points
    const partyPoints = { rødt: 0, sv: 0, ap: 0, sp: 0, mdg: 0, krf: 0, venstre: 0, høyre: 0, frp: 0 };
    let totalPoints = 0;

    statements.forEach((statement, index) => {
        const selectedRadio = statement.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            const selectedParties = selectedRadio.value.split(',');
            for (const party of selectedParties) {
                if (partyPoints.hasOwnProperty(party)) {
                    partyPoints[party]++;
                    totalPoints++; // Increment total points for each selected answer
                }
            }
        }
    });

    // Now you can display or do whatever you want with the partyPoints object
    console.log(partyPoints);

    // Reset the form (uncheck radio buttons) if needed
    form.reset();

    const percentageResults = {};

    for (const party in partyPoints) {
        if (partyPoints.hasOwnProperty(party)) {
            const partyPointsValue = partyPoints[party];
            const percentage = totalPoints > 0 ? (partyPointsValue / totalPoints) * 100 : 0; // Avoid division by zero
            percentageResults[party] = percentage;
        }
    }

    // Sort percentageResults by highest percentage in descending order
    const sortedResults = Object.entries(percentageResults)
        .sort(([, a], [, b]) => b - a)
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    // Now you can display or do whatever you want with the sortedResults object
    console.log(sortedResults);

    const exportElement = document.getElementById("formResults");

    // Clear any previous results
    exportElement.innerHTML = "";

    for (const party in sortedResults) {
        if (sortedResults.hasOwnProperty(party)) {
            const percentage = sortedResults[party];
            exportElement.appendChild(document.createElement("p"));
            exportElement.lastChild.innerHTML = `${party}: ${percentage.toFixed(2)}%`; // Round to 2 decimal places
        }
    }

    exportElement.classList.add("results")
}



document.getElementById('valgomatForm').addEventListener('change', function (event) {
    const x = 1050;
        window.scrollBy({
            top: x,
            behavior: "smooth"
        });
})

document.addEventListener("DOMContentLoaded", function () {
    // Get a reference to the button element by its ID
    var scrollButton = document.getElementById("visResultatBtn");

    // Add a click event listener to the button
    scrollButton.addEventListener("click", function () {
        // Scroll to the bottom of the page
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });
    });
});
