// IMPORTS
import "regenerator-runtime/runtime"

// VARIABLES
// --- links ---
const apiUrl = "https://character-database.becode.xyz/characters/"
const initId = "07380f8d-d601-42a0-acf8-12285b25210d"
// --- pages content ---
const homeContent = document.querySelector(".--home")
const editContent = document.querySelector(".--edit")
const profileContent = document.querySelector(".--profile")
// --- buttons ---
const addButton = document.querySelector(".top-bar__add-btn")
const searchButton = document.querySelector(".top-bar__search__btn")
// --- templates ---
const cardTemplate = document.querySelector(".card-template")
// --- others ---
const searchInput = document.querySelector(".top-bar__search__input")

// FUNCTIONS
// --- api handling ---
/**
 * @param {String} url - link to API
 * @param {String} id - object to get ID
 * @returns {Object} - JSON object built from retrieved data
 */
const apiGet = async (url, id) => {
    try {
        return await (await fetch(url + id)).json()
    } catch(error) {
        console.log(error)
    }
}

/**
 * @param {String} url - link to API
 * @param {Object} data - object to post on API
 */
const apiPost = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(response)
    } catch(error) {
        console.log(error)
    }
}

const apiPut = async (url, id, data) => {
    try {
        const response = await fetch(url + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(response)
    } catch(error) {
        console.log(error)
    }
}

/**
 * @param {String} url - link to API
 * @param {String} id - data to delete ID
 */
const apiDel = async (url, id) => {
    try {
        const response = await fetch(url + id, {
            method: "DELETE"
        })
        console.log(response)
    } catch(error) {
        console.log(error)
    }
}

const main = async () => {
    const characters = await apiGet(apiUrl, "")
    characters.forEach(character => {
        const currentArticle = document.importNode(cardTemplate.content, true)
        // set <img>
        const img = currentArticle.querySelector("img")
        img.setAttribute("src", "data:image/jpeg;base64," + character.image)
        img.setAttribute("alt", character.name)
        // set name
        const name = currentArticle.querySelector(".characters__card__text__name")
        name.innerText = character.name
        // set description
        const shortDescription = currentArticle.querySelector(".characters__card__text__description")
        shortDescription.innerText = character.shortDescription
        // append currentArticle to section
        const container = homeContent.querySelector(".container")
        //
        //
        container.appendChild(currentArticle)
    })

    const cards = document.querySelectorAll(".characters__card")
    cards.forEach(card => {
        card.addEventListener("mouseover", () => {
            const cardLine = card.querySelector(".characters__card__line")
            cardLine.style.animation = "smooth-line 0.2s ease forwards"
            const cardImg = card.querySelector("img")
            cardImg.style.animation = "zoom-img 0.2s ease forwards"
        })
        card.addEventListener("mouseout", () => {
            const cardLine = card.querySelector(".characters__card__line")
            cardLine.style.animation = "undo-smooth-line 0.2s ease forwards"
            const cardImg = card.querySelector("img")
            cardImg.style.animation = "undo-zoom-img 0.2s ease forwards"
        })
    })

    const searchButtonEffect = () => {
        if (searchInput.value !== "") {
            if (homeContent.style.display === "none") {
                //editContent.style.display = "none"
                //profileContent.style.display = "none"
                homeContent.style.display = "initial"
            }
            const purpose = searchInput.value.toLowerCase()
            cards.forEach(card => {
                if (!card.innerText.toLowerCase().includes(purpose)) card.style.display = "none"
                else card.style.display = "initial"
            })
        }
    }

    searchButton.addEventListener("click", searchButtonEffect)

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") searchButtonEffect()
    })
}

// --- event listeners ---
addButton.addEventListener("click", () => {
    homeContent.style.display = "none"
    //editContent.style.display = "initial"
})

 /*
 function getDataUrl(img) {
   // Create canvas
   const canvas = document.createElement('canvas');
   const ctx = canvas.getContext('2d');
   // Set width and height
   canvas.width = img.width;
   canvas.height = img.height;
   // Draw the image
   ctx.drawImage(img, 0, 0);
   return canvas.toDataURL('image/jpeg');
}
// Select the image
const img = document.querySelector('#my-image');
img.addEventListener('load', function (event) {
   const dataUrl = getDataUrl(event.currentTarget);
   console.log(dataUrl);
});
 */
const imgToBase64 = img => {
    // create canvas
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    // set canvas width and height
    canvas.width = img.width
    canvas.height = img.height
    // draw the img
    context.drawImage(img, 0, 0)
    return canvas.toDataURL("image/jpeg")
}

main()
