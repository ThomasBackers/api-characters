// IMPORTS
import "regenerator-runtime/runtime"

// VARIABLES
// --- links ---
const apiUrl = "https://character-database.becode.xyz/characters/"
// --- pages content ---
const homeContent = document.querySelector(".--home")
const editContent = document.querySelector(".--edit")
// --- buttons ---
const addButton = document.querySelector(".top-bar__add-btn")
const searchButton = document.querySelector(".top-bar__search__btn")
// --- others ---
const searchInput = document.querySelector(".top-bar__search__input")
const cards = document.querySelectorAll(".characters__card")

// FUNCTIONS
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

// EXECUTION
addButton.addEventListener("click", () => {
    homeContent.style.display = "none"
    editContent.style.display = "initial"
})

searchButton.addEventListener("click", () => {
    if (homeContent.style.display !== "none") {
        const purpose = searchInput.value
        cards.forEach(card => {
            if (card.innerHTML.includes) {}
        })
    }
})

console.log(cards.textContent)

