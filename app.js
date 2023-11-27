// define location
const url = 'https://icanhazdadjoke.com/'
// get HTML elements to manipulate
const dataDiv = document.getElementById('data')
const button = document.getElementById('btn')
button.classList.add('btn')
// add button listener
button.addEventListener('click', () => fetchData(url))

//
// fetchs data from the location URL provided
//
const fetchData = async (location) => {
  // clear the data div content
  dataDiv.textContent = ''

  // define headers and request parameters
  const h = new Headers()
  h.append('Accept', 'text/html')
  const req = new Request(location, {
    method: 'GET',
    headers: h
  })
  
  // fetch data and get the reader text decoder
  const res = await fetch(req)
  const reader = res.body
    .pipeThrough(new TextDecoderStream())
    .getReader()
  
  // get chunks while not done
  let chunkCount = 0
  while(true) {
    chunkCount++
    // read the data from the chunk
    const { value, done } = await reader.read()
    // exit if done 
    if(done) break
    // crete a new div to display the value
    createChunkDiv(chunkCount, value)
  }
}

//
// create the chunk HTML element
//
const createChunkDiv = (id, text) => {
  const chunkWrapper = document.createElement('div')
  chunkWrapper.innerHTML = `${id}) chunk received:`
  chunkWrapper.classList.add('header')
  
  const chunkText = document.createElement('div')
  chunkText.classList.add('text')
  chunkText.innerHTML += text
  
  chunkWrapper.appendChild(chunkText)
  dataDiv.appendChild(chunkWrapper)
}

const checkStatus = (response) => {
  if(response.ok) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

const showImage = () => {
// ** FETCHING THE IP ADDRESS
let url = 'http://worldtimeapi.org/api/timezone/Africa/Harare'
// use the Headers Interface
let h = new Headers()
h.append('Accept', 'application/json')
// use the Request Interface
let req = new Request(url, {
  method: 'GET',
  headers: h
})

// define our AJAX fetch request
fetch(req)
  .then(checkStatus)
  .then(res => res.json())
  .then( data => document.getElementById('iptext').innerHTML = data.client_ip)
  .catch(e =>console.log('Oops, there was a network error:', e))

  // ** FETCHING THE IMAGE
  let showBtn = document.getElementById('btn-img')
  let imageURL = "./ajax.png"
  let imageElement = document.getElementById('ajax-img')
  // add an event listener
  showBtn.addEventListener('click', fetchImage)

  // create our fetchImage function
  function fetchImage() {
  // using the Headers Interface
  let h = new Headers()
  h.append('Accept', 'image/png')
  // using the Request Interface
  const req = new Request(imageURL, {
      method: 'GET',
      headers: h
  }); 
  
  // perform our fetch call
  fetch(req)
    .then(checkStatus)
    .then(res => res.blob())
    .then(imgObj => {
        const pictureURL = URL.createObjectURL(imgObj)
        imageElement.src = pictureURL
    })
    .catch(e => {
        console.log('Something went wrong:', e)
    })
  }
}

showImage()