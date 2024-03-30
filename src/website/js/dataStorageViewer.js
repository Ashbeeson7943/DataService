
let auth = btoa('admin:admin')

function getDataByDataId(dataId) {
    if (dataId != undefined || '') {
        fetch(`http://localhost:9000/api/generic/v1/get/data/${dataId}`, {
            headers: {
                'Authorization': `Basic ${auth}`
            }
        }).then(function (dataObject) {
            if (dataObject.status == 200) {
                return dataObject.json()
            } else dataObject.status
        }).then(function (data) {
            console.log(data)
            if (data != undefined || data != 232) {
                if (data[0] != undefined) {
                    document.getElementById('dataViewer').innerHTML = JSON.stringify(data[0])
                }
            } else {
                dataNotFound(dataId)
            }
        })
    } else document.getElementById('dataViewer').innerHTML = JSON.stringify({ message: `Please enter an ID` })
}

function getDataByScenarioId(scenarioId) {
    fetch(`http://localhost:9000/api/generic/v1/get/scenario/${scenarioId}`, {
        headers: {
            'Authorization': `Basic ${auth}`
        }
    }).then(function (dataObject) {
        if (dataObject.status == 200) {
            return dataObject.json()
        }
    }).then(function (data) {
        if (data[0] != undefined) {
            document.getElementById('dataViewer').innerHTML = JSON.stringify(data)
        } else {
            dataNotFound(scenarioId)
        }
    })
}

function dataNotFound(id) {
    document.getElementById('dataViewer').innerHTML = JSON.stringify({ message: `Information not found with ID: ${id}` })
}

let loginForm = document.getElementById("dataSearchForm");

loginForm.addEventListener("submit", (submittedEvent) => {
    submittedEvent.preventDefault()

    let dataType = document.getElementById('dataType').value
    let id = document.getElementById('fieldId').value
    switch (dataType) {
        case 'data':
            getDataByDataId(id)
            break;
        case 'scenario':
            getDataByScenarioId(id)
            break
    }

})

