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
