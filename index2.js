const $ = document;
const showVolume2 = $.getElementById("showVolume2");
const volumeInp2 = $.getElementById("volume2");
const ChoiseTime = $.querySelectorAll(".ChoiseTime");
const tax = $.getElementById("tax");
const Installment = $.getElementById("Installment");
const taskN = $.getElementById("taskN");
const final = $.getElementById("final");
let time = 13.04;
let time2 = 12.5;
volumeInp2.addEventListener("mousemove", test);

function test(e) {
    showVolume2.innerHTML = e.target.value;
    let Number = (e.target.value * 1000000 * time2) / 100;
    let test = e.target.value * 1000000 + (e.target.value * 1000000 * 22) / 100;
    let Number2 = Math.floor(test / time);

    function separate(Number) {
        Number += "";
        Number = Number.replace(",", "");
        x = Number.split(".");
        y = x[0];
        z = x.length > 1 ? "." + x[1] : "";
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
        return y + z;
    }
    tax.innerHTML = separate(Number);
    Installment.innerHTML = separate(Number2);
    final.innerHTML = time == 13.04 ? separate(test) : separate(test + 1000000);
}
//

let selectBtn = null;

ChoiseTime.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (selectBtn) {
            selectBtn.style.backgroundColor = "white";
            selectBtn.style.color = "red";
        }
        e.target.style.backgroundColor = "#000000";
        e.target.style.color = "white";
        selectBtn = e.target;
        time = e.target.dataset.time;
        time2 = e.target.dataset.time2;
    });
});