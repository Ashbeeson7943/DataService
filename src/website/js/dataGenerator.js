let customerButton = document.getElementById("cust");
let numberButton = document.getElementById("numb");
let displayEl = document.getElementById('display');


customerButton.addEventListener("click", (submittedEvent) => {
    submittedEvent.preventDefault();
    getData('customer');

});

numberButton.addEventListener("click", (submittedEvent) => {
    submittedEvent.preventDefault();
    getData('number');
});



function getData(dataType) {

    displayEl.innerHTML = '';
    fetch(`http://localhost:9000/api/generic/v1/get/generator/${dataType}`, {

    }).then(function (dataObject) {
        if (dataObject.status == 200) {
            return dataObject.json();
        }
    }).then(function (data) {
        displayEl.appendChild(prettifyJSONData(dataType, data));
        enableNestedProperties()
    });
}




function prettifyJSONData(dataType, json) {
    let boundingDiv = document.createElement('div');
    switch (dataType) {
        case 'number':
            boundingDiv.innerHTML = `
            <div>
                <div class="bold inline-block">Number:</div> <div class="inline-block" >${json.data.number}</div>
            </div>    
            `;
            return boundingDiv;
        case 'customer':
            boundingDiv.innerHTML = `
            <ul id="customerDetails">
                <li><span class="caret bold">Customer</span>
                    <ul class="nested">
                        <li><span class="caret bold">Personal Details</span>
                            <ul class="nested">
                                <li>First Name: ${json.data.firstName}</li>
                                <li>Last Name: ${json.data.lastName}</li>
                                <li>Age: ${json.data.age}</li>
                                <li>Phone Number: ${json.data.phoneNumber}</li>
                            </ul>
                        </li>
                        <li><span class="caret bold">Location</span>
                            <ul class="nested">
                                <li class="center">Street: ${json.data.street}</li>
                                <li class="center">City: ${json.data.city}</li>
                                <li class="center">Postcode: ${json.data.postcode}</li>
                            </ul>
                        </li>
                        <li><span class="caret bold">Card Information</span>
                            <ul class="nested">
                                <li class="center">Type: ${json.data.cardDetails.cardType}</li>
                                <li class="center">Number: ${json.data.cardDetails.cardNumber}</li>
                                <li class="center">Exipry Date: ${json.data.cardDetails.expirationDate}</li>
                                <li class="center">cvv: ${json.data.cardDetails.cvv}</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            `;


            return boundingDiv;
    }
}


function enableNestedProperties() {
    let toggler = document.getElementsByClassName("caret");
    let i;

    for (i = 0; i < toggler.length; i++) {
        toggler[i].addEventListener("click", function () {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        });
    }
}