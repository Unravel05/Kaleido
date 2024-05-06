import sendRequest from "./send-request";
const BASE_URL ='/api/artists'

export async function saveArtist(artist) {
    return sendRequest(BASE_URL, 'POST', artist)
  }

  export async function getArtist() {
    return sendRequest(BASE_URL)
  }

export async function deleteArtist(id) {
    return sendRequest(`${BASE_URL}/${id}`, 'DELETE')
}

export async function editArtist(id, artist) {
    return sendRequest(`${BASE_URL}/${id}`, 'PUT', artist)
}

export async function getArtistById(artistId) {
  return sendRequest(`${BASE_URL}/${artistId}`);
}