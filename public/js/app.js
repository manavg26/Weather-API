
console.log("Client side JS file loaded")

const form = document.querySelector("form")
const text = document.querySelector("input")
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')
const p3 = document.querySelector('#p3')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    loc = text.value
    //console.log(loc)

    p1.textContent = "Loading..."
    p2.textContent=""
    p3.textContent=""
    fetch('http://localhost:3000/weather?place=' + encodeURIComponent(loc)).then((response) => {
        response.json().then(({ temperature, description, location, error } = {}) => {
            if (error) {
                p2.innerHTML = ""
                p3.innerHTML=""
                return p1.textContent = error
            }
            p1.textContent = "Temperature: " + temperature+" °C"
            p2.innerHTML = "Weather: " + description
            p3.innerHTML = "Location: " + location

        })
    })
})