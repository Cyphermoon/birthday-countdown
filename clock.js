const clock_type = document.querySelector("#clock_type")
const clocks = document.querySelector(".clocks")
const clock = document.querySelector(".clock")
const digital_clock = document.querySelector(".digital_clock")

clock_type.addEventListener("change", (e) => {
    if(clock_type.value.toLowerCase() === "digital"){
        showDigital()
    }
    
    if(clock_type.value.toLowerCase() === "analog"){
        showAnalog()
    }

})

function showAnalog(){
    const hour_hand = document.querySelector(".hour")
    const minute_hand = document.querySelector(".minute")
    const sec_hand = document.querySelector(".sec")

    digital_clock.classList.remove("active")
    clock.classList.add("active")
    clocks.classList.add("unactive")

    function setClock(){
        let analogDate = new Date()
        let secondsRatio = analogDate.getSeconds() / 60
        let minuteRatio = (secondsRatio + analogDate.getMinutes()) / 60
        let hourRatio = (minuteRatio + analogDate.getHours()) / 12

        setRotation(sec_hand, secondsRatio)
        setRotation(hour_hand, hourRatio)
        setRotation(minute_hand, minuteRatio) 
    }

    function setRotation(element, rotationValue){
        element.style.setProperty("--rotation", rotationValue * 360)
    }

    setClock()
    setInterval(setClock,1000)
}

showAnalog()

function showDigital(){
    digital_clock.classList.add("active")
    clock.classList.remove("active")
    clocks.classList.remove("unactive")

    function setDigitalClock (){
        const digital_time = document.querySelector(".digital_time")
        const date_format = document.querySelector(".date_format")
        let currentDate = new Date()
        let hours = check_time(currentDate.getHours())
        let minute = check_time(currentDate.getMinutes())
        let seconds = check_time(currentDate.getSeconds())
        let meridian = check_meridian(hours)
        let utcFormat = currentDate.toDateString()

        digital_time.textContent = `${hour_format(hours)}:${minute}:${seconds} ${meridian}`
        date_format.textContent = utcFormat

        function check_time(time){
            if(time < 10){
                time = "0" + time
                return time
            } 
            else{
                time = time
                return time
            }  
        }

        function check_meridian(h){
            if(h > 12)return "PM"
        
            else return "AM"
        }

        function hour_format(hr){
            if(hr > 12){
                hr = hr - 12
                return hr
            }
            else return hr
        }
    }  
    setDigitalClock()
    setInterval(setDigitalClock,1000)
}  



function showCountdown(){
    const countdown_display = document.querySelector(".countdown_container");
    const countdown_days_text = document.querySelector(".countdown_days")
    const countdown_minutes_text = document.querySelector(".countdown_minutes")
    const countdown_hours_text = document.querySelector(".countdown_hours")
    const countdown_seconds_text = document.querySelector(".countdown_seconds")
    const  date_value = document.querySelector(".date_value")
    const date_form = document.querySelector("[type=submit]")
    countdown_display.classList.add("active")
    let date_form_text = "2022-02-28"

    date_form.addEventListener("click", (e) => {
        e.preventDefault()
        let dateRegex = /\d{4}(-|\/|\s)\d{2}\1\d{2}/g;

        if(date_value.value && dateRegex.test(date_value.value)){
            date_form_text = date_value.value
            date_value.value = ""
        }
        else{
            date_value.placeholder = "invalid input"
            date_value.value = "invalid input"

            setTimeout(() => {
                date_value.value = ""
                date_value.placeholder = "YYYY-MM-DD"
        }, 1000)
        }
    })

    function setCountdown(){
        let currentDate = new Date().getTime()
        let futureDate = Date.parse(date_form_text)
        let distance = futureDate - currentDate

        let days = Math.floor( distance/(1000*60*60*24) );
        let hours = Math.floor( (distance/(1000*60*60)) % 24 );
        let minutes = Math.floor( (distance/(1000*60)) % 60 );
        let seconds = Math.floor( (distance/1000) % 60 );
        let singular = days > 1 ? "days" : "day"

        if(days <= 0 && hours < 0){
            clearInterval(setCountdownInterval)
            days = 0
            hours = 0
            minutes = 0
            seconds = 0

            let audio =  document.createElement("audio");
            //audio.autoplay = true
            audio.src = "../audio/Jason_Derulo_-_Savage_Love.mp3";
            //audio.preload = "metadata"

            window.onclick = (e) => {audio.play()}

            window.ondblclick = (e) => {audio.pause()}    
        }

        countdown_days_text.innerHTML = `${days}<span>${singular}</span>`;
        countdown_minutes_text.innerHTML = `${minutes}<span>minutes</span>`;
        countdown_hours_text.innerHTML = `${hours}<span>hours</span>`;
        countdown_seconds_text.innerHTML = `${seconds}<span>seconds</span>`;
    }
    let setCountdownInterval = setInterval(setCountdown,1000)
}

showCountdown()