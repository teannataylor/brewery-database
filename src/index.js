// asynchronous event; DOMContentLoaded (1)

const baseURL = "https://api.openbrewerydb.org"

window.addEventListener('DOMContentLoaded', () =>{
    getBreweries()

    document.getElementById("brewery").addEventListener('click', getBreweries)
})

function getBreweries(){
    const info = document.getElementById('info')
    const ul = document.getElementById('brewery-list')
    info.innerHTML= ''
    ul.innerHTML= ''
    getBeer()
    .then(data => {
        data.forEach(breweries => {
            ul.innerHTML +=
            `<li><a href="#" data-id="${breweries.id}">${breweries.name}</a>
            </li>`

           
        })

        attachClicksToLinks()
    })
}

const attachClicksToLinks = () => {
    const breweries = document.querySelectorAll('a')
    breweries.forEach((brewery) =>{
        brewery.addEventListener('click', displayBrewery)
    })
}

const displayBrewery = (event) => {
    console.log(event.target.dataset.id)
    const info = document.getElementById('info')
    const ul = document.getElementById('brewery-list')
    ul.innerHTML = ''
    fetch(baseURL + `/breweries/${event.target.dataset.id}`)
    .then(res => res.json())
    .then(data => {
    console.log(data)
        info.innerHTML = `
        
    <h1>${data.name}</h1>
    <h3>Information:</h3>

    <h5>City:</h5>
    <p>${data.city}</p>
    <h5>State:</h5>
    <p>${data.state}</p>
    <h5>Country:</h5>
    <p>${data.country}</p>
    <h5>Phone #:</h5>
    <p>${data.phone}</p>

    <h5>Brewery Type:</h5>
    <p>${data.brewery_type}</p>
`

    })


}

async function getBeer(){
    let res = await fetch(baseURL + '/breweries')
    let data = await res.json()
    return data
}