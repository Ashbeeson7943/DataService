let customerButton = document.getElementById("cust");
let numberButton = document.getElementById("numb");


customerButton.addEventListener("click", (submittedEvent) => {
    submittedEvent.preventDefault()
    getData('customer');
})

numberButton.addEventListener("click", (submittedEvent) => {
    submittedEvent.preventDefault()
    getData('number');
})

function getData(dataType) {
    fetch(`http://localhost:9000/api/generic/v1/get/generator/${dataType}`, {

    }).then(function (dataObject) {
        if (dataObject.status == 200) {
            return dataObject.json()
        }
    }).then(function (data) {
        document.getElementById('display').innerHTML = JSON.stringify(data)
    })
}