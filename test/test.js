var assert = require('assert');


describe('Generic Data', function () {

    it('Create generic Data', () => {

        // Data to be sent in the POST request (in JSON format)
        const postData = {
            "dataDescription": "World",
            "fieldOne": 2222,
            "customData": "Ford"
        };

        // POST request options
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        };

        // Make the POST request
        fetch('http://localhost:9000/api/generic/v1/save/data/', requestOptions)
            .then(response => {
                // Check if the request was successful
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the JSON response
                assert.equal(response.status, 201);
                // return response.json();
            })
            // Use returned data
            // .then(data => {
            //     // Handle the data returned from the server
            //     console.log('Post request response:', data);
            // })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('There was a problem with the fetch operation:', error);
            });


    });
});


