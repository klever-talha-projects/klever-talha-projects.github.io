var baseUrl = document.getElementById("base-url").innerText
var oapiToken = document.getElementById("oapi-token").innerText
var playerIds = document.querySelectorAll(".playerid")
var conditions = document.querySelectorAll(".condition")
var notificationPanel = document.querySelector(".fade");

function sendRequest(buttonClickedValue){

    var condition = conditions[buttonClickedValue].innerText
    var playerID = playerIds[buttonClickedValue].innerText

    // Check if conditionToSend is valid
    if (!condition || (condition.trim().length <= 0)) {
        conditionMessage = "Tried to send an empty condition..."
        errorNotification()
        return;
    }

     // Check if platformBaseURL is valid
    if (!playerID || (playerID.trim().length <= 0)) {
        conditionMessage = "Player Id not valid, not sending condition  "+ condition
        errorNotification()
        return;
    }

    // Check if platformBaseURL is valid
    if (!baseUrl || (baseUrl.trim().length <= 0)) {
        conditionMessage = "Missing parameter for platform base URL, not sending condition " + condition
        errorNotification()
        return;
    }


    fetch(`${baseUrl}/oapi/${oapiToken}/playercontrol/${playerID}/condition/${condition}`, {
        method: 'POST'
    })
    .then(response => {
        if (response.ok) {
            conditionMessage = "Launched " + condition;
            setTimeout(()=>{
                document.querySelector(".screen-1").style.display = "none"
                document.querySelector("#video-choose-"+ buttonClickedValue).style.display = "flex"
            }, 200)
            SuccessNotification()
        } else {
            conditionMessage = "Error sending condition. Status code: " + response.status;
            errorNotification()
        }

    })
    .catch(error => {
        conditionMessage = "Network error while sending condition: " + error.message;
        errorNotification()
    });

    // Reset the message after 2 seconds
    setTimeout(function () {
        conditionMessage = "";
    }, 2000);
}


function SuccessNotification(){
    document.querySelector(".fade").innerHTML = "<div class='conditionMessagePanel fade' style='background-color: #15a440; animation: fadeInOut 3s ease-in-out forwards;'>" + conditionMessage + "</div>"
}

function errorNotification(){
    document.querySelector(".fade").innerHTML = "<div class='conditionMessagePanel fade' style='background-color: #e61111; animation: fadeInOut 3s ease-in-out forwards;'>" + conditionMessage + "</div>"
}
