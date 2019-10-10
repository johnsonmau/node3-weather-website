const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const today = document.querySelector('#today')
const todayp1 = document.querySelector('#today1')
const todayp2 = document.querySelector('#today2')
const todayp3 = document.querySelector('#today3')
const todayp4 = document.querySelector('#today4')
const rain = document.querySelector('#rain')

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
            today.textContent = data.fiveday[0].time+ ' ' + data.fiveday[0].summary
            todayp1.textContent = data.fiveday[1].summary
            todayp2.textContent = data.fiveday[2].summary
            todayp3.textContent = data.fiveday[3].summary
            todayp4.textContent = data.fiveday[4].summary

            var d = new Date(data.fiveday[0].time)
            
            console.log(d.toJSON())

        } else {
            messageOne.textContent = 'Please enter a location'
        }
        document.getElementById('loader').style.display='none'; 
    })
})
})
