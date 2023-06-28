const accessKey = "CmmueaWmd_LlJmPyNKGNjFgbsy4-OgvA5iaXLCzQm5s";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-result");
const showMore = document.getElementById("show-more");

let input = "";
let page = 1;

async function searchImages(){

    // user's input
    input = inputEl.value;
    // created url
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input}&client_id=${accessKey}`;

    // fetched data from url using FETCH method
    const resp = await fetch(url);
    const data = await resp.json();
    const results = data.results;

    // default images on browser if no input is provided
    if(page===1){
        searchResults.innerHTML = "";
    }

    results.map((res)=>{

        // created 'result DIV' from HTML file
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("result");

        // created image with its attributes
        const image = document.createElement("img");
        image.src = res.urls.small;
        image.alt = res.alt_description;

        // created anchor tag ('a') with its attributes
        const imageLink = document.createElement("a");
        imageLink.href = res.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = res.alt_description;

        // combined all items 
        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;

    // display show more button if page length > 1
    if(page>1){
        showMore.style.display = "block"
    }
}

// search button event listener
formEl.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

// show more button event listener
showMore.addEventListener("click", ()=>{
    searchImages();
})
