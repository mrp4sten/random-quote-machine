import axios from 'axios'

const txtField = document.getElementById('text') // HTML div element called "text"
const txtAuthor = document.getElementById('author') // HTML div element called "author"
const btnNewQuote = document.getElementById('new-quote') // HTML button element called "new-quote"
const lnkTweet = document.getElementById('tweet-quote') // HTML link element called "tweet-quote"

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

/**
 * Fills the text and author elements with the quote and author from the API
 * @returns {void}
 */
const fillTextAndAuthor = () => {
  getQuote().then(quote => {
    txtField.innerText = quote.quote // User Story #6
    txtAuthor.innerText = quote.author // User Story #7
    lnkTweet.href =
      'https://twitter.com/intent/tweet?text=' +
        encodeURIComponent(`"${txtField.innerText}" - ${txtAuthor.innerText}`) // User Story #10
  })
}

fillTextAndAuthor()

// User Story #8 & #9
btnNewQuote.addEventListener('click', () => fillTextAndAuthor())
