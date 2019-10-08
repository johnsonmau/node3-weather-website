const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

document.getElementById('loader').style.display='none'; 

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    document.getElementById('loader').style.display='block'; 

    const location = search.value

    messageOne.textContent = ''
    messageTwo.textContent = ''
    
fetch('/weather?address='+location).then((response) => { 
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent = data.error
        } else if (data.location !== undefined) {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        } else {
            messageOne.textContent = 'Please enter a location'
        }
        document.getElementById('loader').style.display='none'; 
    })
})
})
