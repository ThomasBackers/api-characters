import "regenerator-runtime/runtime"

// VARIABLES
const apiUrl = "https://character-database.becode.xyz/characters/"

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
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        console.log(result)
    } catch(error) {
        console.log(error)
    }
}

/**
 * @param {String} url - link to data
 * @param {String} id - data id
 */
const apiDel = async (url, id) => {
    try {
        const result = await fetch(url + id, {
            method: 'DELETE'
        })
        console.log(result)
    } catch(error) {
        console.log(error)
    }
}

// EXECUTION
