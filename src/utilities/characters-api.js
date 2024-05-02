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

export async function editCharacter(id, character) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', character)
}

export async function getCharacterById(characterId) {
  return sendRequest(`${BASE_URL}/${characterId}`);
}