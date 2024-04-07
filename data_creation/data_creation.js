
export function generateRandomCustomer() {
    // Arrays of possible values for generating random details
    const firstNames = ["John", "Emma", "Michael", "Sophia", "William", "Olivia", "James", "Ava", "Alexander", "Isabella"];
    const lastNames = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor"];
    const cities = ["London", "Birmingham", "Manchester", "Glasgow", "Liverpool", "Leeds", "Bristol", "Sheffield", "Edinburgh", "Newcastle"];
    const streets = ["High Street", "Church Street", "Station Road", "Main Street", "Park Avenue", "Victoria Road", "Queens Road", "Church Road", "London Road", "Green Lane"];

    // Randomly select values for customer details
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const age = Math.floor(Math.random() * 60) + 18; // Random age between 18 and 77
    const city = cities[Math.floor(Math.random() * cities.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const postcode = Math.floor(Math.random() * 90) + 10 + " " + Math.floor(Math.random() * 9) + "AA"; // Random UK postcode format

    // Construct the customer object
    const customer = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        city: city,
        street: street,
        postcode: postcode,
        phoneNumber: generateRandomPhoneNumber('UK')
    };

    return customer;
}


export function generateRandomPhoneNumber(countryCode, json = false) {
    let phoneNumber = '';
    if (countryCode === 'UK') {
        // Generate a random UK phone number
        const areaCode = Math.floor(Math.random() * (199 - 100 + 1)) + 100;
        const localNumber = Math.floor(Math.random() * 89999999) + 10000000;
        phoneNumber = `0${areaCode}${localNumber}`;
    } else if (countryCode === 'US') {
        // Generate a random US phone number
        const areaCode = Math.floor(Math.random() * (999 - 200 + 1)) + 200;
        const exchangeCode = Math.floor(Math.random() * 800) + 200; // US exchange codes range from 200 to 999
        const subscriberNumber = Math.floor(Math.random() * 8999) + 1000; // US subscriber numbers range from 1000 to 9999
        phoneNumber = `(${areaCode}) ${exchangeCode}-${subscriberNumber}`;
    } else {
        phoneNumber = 'Invalid country code';
    }

    if (json) {
        return { number: phoneNumber }
    } else {
        return phoneNumber;
    }
}

