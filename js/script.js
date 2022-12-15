const skipAnnouncement = (editplaceholder) => {

    const textAd = document.querySelector(".ytp-ad-text");
    if (textAd) document.querySelector("video").currentTime = "200";


    const buttonskipAd = document.querySelector(".ytp-ad-skip-button");
    if (buttonskipAd) buttonskipAd.click();

    const inputSearch = document.querySelector("input#search")
    if (inputSearch && editplaceholder) {

        const placeholder = inputSearch.getAttribute("placeholder");
        placeholder.includes("•") ?
            inputSearch.setAttribute("placeholder", "Pesquisar") :
            inputSearch.setAttribute("placeholder", "Pesquisar  •");
    };
    document.querySelectorAll(".ytp-ce-element").forEach((item) => item.remove());
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
    if (activated) executeBruteForceSkipAnnounceForFiveSeconds();
    return setInterval(async () => {
        await getOn()
        if (activated) skipAnnouncement(true);
    }, 500);
};

let oldHref = window.location.href;
console.log(oldHref);

setInterval(() =>{
    if(activated){
        if(oldHref != window.location.href){
            executeBruteForceSkipAnnounceForFiveSeconds();
            oldHref = window.location.href;
        }
    }
}, 0)

function executeBruteForceSkipAnnounceForFiveSeconds(){
    
    let count = 0;
    
    const a = setInterval(() => {count += 1; console.log(count)}, 1000)
    
    const b = setInterval(() => {
        skipAnnouncement(false);
        if (count > 5) {
            clearInterval(a)
            clearInterval(b)
        }
    }, 0)
}

getOn();
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