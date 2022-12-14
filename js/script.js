const skipAnnouncement = () => {
    const buttonskipAd = document.querySelector(".ytp-ad-skip-button");
    if(buttonskipAd) buttonskipAd.click();

    const inputSearch = document.querySelector("input#search")
    if (inputSearch) {
        
        const placeholder = inputSearch.getAttribute("placeholder");
        placeholder.includes("•") ?
            inputSearch.setAttribute("placeholder","Pesquisar") :
            inputSearch.setAttribute("placeholder","Pesquisar  •");
    };
    document.querySelectorAll(".ytp-ce-element").forEach((item)=> item.remove());
}

let activated;

async function getOn() {
    await chrome.storage.local.get(["on"]).then((result) => {
        if (result.on == undefined) {
            activated = true
        } else {
            activated = result.on
        };
    });
};

async function start() {
    if(activated) skipAnnouncement();
    return setInterval(async () => {
        await getOn()
        if(activated) skipAnnouncement();
    }, 1000);
};

//await getOn();
start();
console.log("Starting..")

// async function getYoutubeTabs() {
//     const tabs = await chrome.tabs.query({
//         url: "https://*.youtube.com/*"
//     });
//     return tabs;
// }

// async function run() {

//     const youtubeTabs = await getYoutubeTabs
// ();
//     if (youtubeTabs != '') {
//         youtubeTabs.forEach(tab => {
//             chrome.scripting.executeScript({
//                 target: {
//                     tabId: tab.id
//                 },
//                 function: skipAnnouncement,
//             });
//         })
//     }
// }
