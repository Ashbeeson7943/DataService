function saveGenericData(payload) {
    fetch(`http://localhost:9000/api/generic/v1/save/data/`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    }).then(function (dataObject) {
        console.log(dataObject)
        if (dataObject.status == 201) {
            return dataObject.json()
        } else return undefined
    }).then(function (data) {
        if (data != undefined) {
            document.getElementById('dataViewer').innerHTML = JSON.stringify(data)
        } else {
            document.getElementById('dataViewer').innerHTML = JSON.stringify({ message: 'something went wrong' })
        }
    })
}

let dataForm = document.getElementById("dataSaveForm");

dataForm.addEventListener("submit", (submittedEvent) => {
    submittedEvent.preventDefault()

    let desc = document.getElementById('desc').value
    let data = document.getElementById('data').value

    let payload = {
        dataDescription: desc,
        customData: data
    }

    console.log(payload)
    saveGenericData(payload)

})


// Payload
/*

{
  "dataDescription":"Hello",
  "customData":{},
  "scenarioId": "6ae568de-2950-41b3-999e-893626d747e8"
}

*/