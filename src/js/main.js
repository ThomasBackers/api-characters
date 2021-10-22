import 'regenerator-runtime/runtime'

const apiUrl = "https://character-database.becode.xyz/"

/**
 * @param {String} url - link to API data 
 * @returns {Object} - JSON object built from data
 */
const apiGet = async url => {
    return await (await fetch(url)).json()
}

/**
 * @param {String} url - link to API
 * @param {Object} data - object to post on API
 */
const apiPost = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return result
}

const abu = apiGet(`${apiUrl}characters/40631458-60dd-4e8b-99cc-40c5c80fe01b`)
console.log(abu.name)
