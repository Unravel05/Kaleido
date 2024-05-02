import sendRequest from "./send-request";
const BASE_URL ='/api/characters'

export async function saveCharacter(character) {
    return sendRequest(BASE_URL, 'POST', character)
  }
export async function getCharacter() {
    return sendRequest(BASE_URL)
  }

export async function deleteCharacter(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export async function editCharacter(character, id) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', character)
}
