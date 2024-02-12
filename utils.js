const { faker } = require('@faker-js/faker');

function fakeNumber() {
    let fakeNumber = removeWhitespace(faker.phone.number());
    fakeNumber = fakeNumber.replace('05', '07');
    fakeNumber = fakeNumber.replace('010', '070');
    if (fakeNumber.length < 11) {
        const diff = 11 - fakeNumber.length;
        fakeNumber = fakeNumber + fakeNumber.slice(0, diff);
    }

    return fakeNumber.replace('0', '+44');
}

module.exports = fakeNumber;