const url = 'https://icanhazdadjoke.com/'

const fetchData = async (location) => {
  const res = await fetch(location)
  const reader = res.body
    .pipeThrough(new TextDecoderStream())
    .getReader()
  
  let count = 0
  const dataDiv = document.getElementById('data')
  while(true) {
    count++
    const { value, done } = await reader.read()
    if(done) break

    const newDiv = document.createElement('div')
    const messageDiv = document.createElement('div')
    newDiv.innerHTML = `<strong>${count}) chunk received: -----------------------------</strong>`
    messageDiv.innerHTML += value
    newDiv.appendChild(messageDiv)
    dataDiv.appendChild(newDiv)
  }
}

fetchData(url)