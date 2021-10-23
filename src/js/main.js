// IMPORTS
import "regenerator-runtime/runtime"

// VARIABLES
// --- links ---
const apiUrl = "https://character-database.becode.xyz/characters/"
const initializerId = "07380f8d-d601-42a0-acf8-12285b25210d"
// --- pages content ---
const homeContent = document.querySelector(".--home")
const editContent = document.querySelector(".--edit")
const profileContent = document.querySelector(".--profile")
// --- buttons ---
const addButton = document.querySelector(".top-bar__add-btn")
const searchButton = document.querySelector(".top-bar__search__btn")
// --- others ---
const searchInput = document.querySelector(".top-bar__search__input")
const cards = document.querySelectorAll(".characters__card")

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

// --- eventListeners callbacks ---
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

// EXECUTION
addButton.addEventListener("click", () => {
    homeContent.style.display = "none"
    //editContent.style.display = "initial"
})

searchButton.addEventListener("click", searchButtonEffect)

searchInput.addEventListener("keydown", event => {
    if (event.key === "Enter") searchButtonEffect()
})

apiPut(apiUrl, initializerId, {
    name: "ft_initializer",
    map: []
})
