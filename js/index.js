let activated;

async function getOn() {
    chrome.storage.local.get(["on"]).then((result) => {
        if (result.on == undefined) {
            activated = true
        } else {
            activated = result.on
        }
        colorButton(result.on)
    });
};

function colorButton(activated) {

    if (activated) {
        button.style.backgroundColor = "green"
    } else {
        button.style.backgroundColor = "red"
    }

}

const button = document.querySelector("#click");
button.onclick = async () => {

   await chrome.storage.local.set({
        on: !activated
    }).then(() => {
        console.log(`set on: ${!activated}`)
        activated = !activated
    });

    colorButton(activated);
}

getOn();