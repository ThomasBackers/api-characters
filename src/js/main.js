// IMPORTS
import "regenerator-runtime/runtime"

// VARIABLES
// --- links ---
const apiUrl = "https://character-database.becode.xyz/characters/"
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
        // store character id
        const charId = currentArticle.querySelector(".characters__card__char-id")
        charId.innerText = character.id
        //store long description
        const longDescription = currentArticle.querySelector(".characters__card__long-description")
        longDescription.innerHTML = character.description
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

    //Read profile button
    const readProfile = document.querySelectorAll(".characters__card__text__button")
    readProfile.forEach(profile => {
        profile.addEventListener("click", (event) => {

            const shortDescription = event.target.parentNode.previousElementSibling.innerText
            const characterID = event.target.parentNode.nextElementSibling.innerText
            const name = event.target.parentNode.previousElementSibling.previousElementSibling.innerText
            const longDescription = event.target.parentNode.nextElementSibling.nextElementSibling.innerHTML
            const image = event.target.parentNode.parentNode.previousElementSibling.previousElementSibling.lastElementChild

            image.style.animation = ""

            profileContent.querySelector(".profiles__profile__visuel").appendChild(image)
            profileContent.querySelector(".profiles__profile__text__name").innerText = name
            profileContent.querySelector(".profiles__profile__text__short-description").innerText = shortDescription
            profileContent.querySelector(".profiles__profile__text__long-description").innerHTML = longDescription
            profileContent.querySelector(".profiles__profile__char-id").innerText = characterID

            homeContent.style.display = "none"
            editContent.style.display= "none"
            profileContent.style.display = "block"
        })
    })

    // set search bar
    const searchButtonEffect = () => {
        if (searchInput.value !== "") {
            if (homeContent.style.display === "none") {
                editContent.style.display = "none"
                profileContent.style.display = "none"
                homeContent.style.display = "block"
            }
            const purpose = searchInput.value.toLowerCase()
            cards.forEach(card => {
                if (!card.innerText.toLowerCase().includes(purpose)) card.style.display = "none"
                else card.style.display = "block"
            })
        }
    }

    searchButton.addEventListener("click", searchButtonEffect)
    document.querySelector(".top-bar__side-menu__list__element__search-btn").addEventListener("click", ()=>{
        if (document.querySelector(".top-bar__side-menu__list__element__input").value !== "") {
            if (homeContent.style.display === "none") {
                editContent.style.display = "none"
                //profileContent.style.display = "none"
                homeContent.style.display = "block"
            }
            const purpose = document.querySelector(".top-bar__side-menu__list__element__input").value.toLowerCase()
            cards.forEach(card => {
                if (!card.innerText.toLowerCase().includes(purpose)) card.style.display = "none"
                else card.style.display = "block"
            })
        }
    })

    searchInput.addEventListener("keydown", event => {
        if (event.key === "Enter") searchButtonEffect()
    })
}

// --- event listeners ---
addButton.addEventListener("click", () => {
    homeContent.style.display = "none"
    profileContent.style.display = "none"
    editContent.style.display = "block"

    const img = editContent.querySelector(".update__form__figure").querySelector("img")
    img.remove()
    editContent.querySelector("input[name=\"name\"]").value = ""
    editContent.querySelector("textarea[name=\"short-description\"]").value = ""
    editContent.querySelector("textarea[name=\"description\"]").value = ""
    editContent.querySelector(".update__form__char-ID").innerText = ""

    profileContent.style.display = "none"
    editContent.style.display = "block"
})

document.querySelector(".top-bar__side-menu__list__element__add-btn").addEventListener("click", () => {
    homeContent.style.display = "none"
    profileContent.style.display = "none"
    editContent.style.display = "block"
})

document.querySelector(".top-bar__burger-menu").addEventListener("click", ()=>{
    const sideMenu = document.querySelector(".top-bar__side-menu")
    sideMenu.style.animation = "show-side-menu 0.3s ease-out forwards"
    const sideVoid = document.querySelector(".top-bar__side-menu__void")
    sideVoid.style.animation = "become-opaque 0.125s ease-out 0.3s forwards"
})

document.querySelector(".top-bar__side-menu__void").addEventListener("click", ()=>{
    const sideMenu = document.querySelector(".top-bar__side-menu")
    sideMenu.style.animation = "hide-side-menu 0.3s ease-out forwards"
    const sideVoid = document.querySelector(".top-bar__side-menu__void")
    sideVoid.style.animation = "become-transparent 0.01s ease-out forwards"
})

main()


// upoad image button
const uploadButton = document.querySelector("input[type=\"file\"]")
const previewFigure = document.querySelector(".update__form__figure")

uploadButton.addEventListener("change", () => {
    const reader = new FileReader()
    reader.onload = () => {
        const image = new Image()
        image.src = reader.result
        previewFigure.appendChild(image)
    }
    reader.readAsDataURL(uploadButton.files[0])
}, false)


// edit buttons
const saveButton = document.querySelector(".update__form__buttons__save")
const deleteButton = document.querySelector(".update__form__buttons__delete")

// save changes button
saveButton.addEventListener("click", async() => {
    const image = previewFigure.querySelector("img").src
    const name = document.querySelector("input[name=\"name\"]").value
    const shortDescription = document.querySelector("textarea[name=\"short-description\"]").value
    const description = document.querySelector("textarea[name=\"description\"]").value

    const objectToPost = {
        name: name,
        image: image.split(",")[1],
        description: description,
        shortDescription: shortDescription,
    }
    if (!name || !image || !shortDescription || !description) {
    }
    else {
        const charID = document.querySelector(".update__form__char-ID").innerText
        if (!charID) {
            await apiPost(apiUrl, objectToPost)
            location.reload()
        }
        else {
            await apiPut(apiUrl, charID, objectToPost)
            location.reload()
        }
    }
})

// delete button
deleteButton.addEventListener("click", async () => {
    const charID = document.querySelector(".update__form__char-ID").innerText
    if (charID) await apiDel(apiUrl, charID)
    location.reload()
})

document.querySelector(".profiles__profile__text__buttons__delete").addEventListener("click", async () => {
    const charID = document.querySelector(".profiles__profile__char-id").innerText
    await apiDel(apiUrl, charID)
    location.reload()
})

// update profile
const saveButton_ = document.querySelector(".profiles__profile__text__buttons__save")
saveButton_.addEventListener("click", () => {
    const image = document.querySelector(".profiles__profile__visuel").querySelector("img")
    const name = document.querySelector(".profiles__profile__text__name")
    const shortDescription = document.querySelector(".profiles__profile__text__short-description")
    const longDescription = document.querySelector(".profiles__profile__text__long-description")
    const charId = document.querySelector(".profiles__profile__char-id")

    editContent.querySelector(".update__form__figure").appendChild(image)
    editContent.querySelector("input[name=\"name\"]").value = name.innerText
    editContent.querySelector("textarea[name=\"short-description\"]").value = shortDescription.innerText
    editContent.querySelector("textarea[name=\"description\"]").value = longDescription.innerHTML
    editContent.querySelector(".update__form__char-ID").innerText = charId.innerText

    profileContent.style.display = "none"
    editContent.style.display = "block"
})
