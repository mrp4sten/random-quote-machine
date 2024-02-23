import axios from 'axios'

const txtField = document.getElementById('text') // HTML div element called "text"
const txtAuthor = document.getElementById('author') // HTML div element called "author"

/**
 * A promise that resolves to an object with a quote and an author
 * @returns {Promise<Object>}
 */
const getQuote = async () => {
  const category = 'computers'
  const url = `${process.env.API_URL}?category=${category}`

  try {
    const response = await axios.get(url, {
      headers: {
        'X-Api-Key': process.env.API_KEY,
        'Content-Type': 'application/json'
      }
    })
    return response.data[0]
  } catch (error) {
    console.error('Error:', error)
  }
}

getQuote().then(quote => {
  txtField.innerText = quote.quote // User Story #6
  txtAuthor.innerText = quote.author // User Story #7
})
