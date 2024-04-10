
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
        phoneNumber: generateRandomPhoneNumber('UK'),
        cardDetails: generateRandomCreditCard()
    };

    return customer;
}


export function generateRandomPhoneNumber(countryCode, json = false) {
    let phoneNumber = '';
    if (countryCode === 'UK') {
        // Generate a random UK phone number
        const areaCode = Math.floor(Math.random() * (1999 - 1000 + 1)) + 100;
        const localNumber = Math.floor(Math.random() * 899999) + 100000;
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

export function generateRandomCreditCard() {
    const cardTypes = ['Visa', 'Mastercard', 'American Express'];
    const randomCardType = cardTypes[Math.floor(Math.random() * cardTypes.length)];

    let cardNumber = '';
    switch (randomCardType) {
        case 'Visa':
            cardNumber = '4';
            break;
        case 'Mastercard':
            cardNumber = '5';
            break;
        case 'American Express':
            cardNumber = '3';
            break;
    }

    for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    const expirationMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const expirationYear = String(new Date().getFullYear() + Math.floor(Math.random() * 5));
    const cvv = String(Math.floor(100 + Math.random() * 900)); // Generates a 3-digit CVV

    return {
        cardType: randomCardType,
        cardNumber: cardNumber,
        expirationDate: expirationMonth + '/' + expirationYear.slice(-2),
        cvv: cvv
    };
}