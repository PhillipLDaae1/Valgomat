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

document.getElementById('valgomatForm').addEventListener('change', function (event) {
    const selectedStatement = event.target.name; // Get the name of the selected statement
    const selectedValue = event.target.value;
    const selectedParties = selectedValue.split(',');

    for (const party of selectedParties) {
        if (partiPoeng.hasOwnProperty(party)) {
            partiPoeng[party]++;
        }
    }

    const x = 1050;
    window.scrollBy({
        top: x,
        behavior: "smooth"
    });

    console.log(partiPoeng);
});
