const mainElem = document.querySelector('main');

(async function () {
    let response = await fetch("assets/projects.json");
    let projectCardsArr = await response.json();
    let allProjectCards = "";
    projectCardsArr.forEach((e) => {
        allProjectCards += ` <div class="project-card">
            <h1 class="project-card-title">${e.title}</h1>
            <p class="project-card-description">${e.description}</p>
            <a class="open-url" href="tools/${e.url}/index.html" target="_blank">Open</a>
        </div>`;

    })
    mainElem.innerHTML = allProjectCards;
})();


// this also works same as async await
// let promise = fetch("assets/projects.json");
// promise
//     .then((res) => {
//         return res.json();
//     })
//     .then((projectCardsArr) => {
//         let allProjectCards = "";
//         projectCardsArr.forEach((e) => {
//             allProjectCards += ` <div class="project-card">
//             <h1 class="project-card-title">${e.title}</h1>
//             <p class="project-card-description">${e.description}</p>
//             <a class="open-url" href="tools/${e.url}/index.html" target="_blank">Open</a>
//         </div>`;
//         })
//             mainElem.innerHTML = allProjectCards;
//         })


