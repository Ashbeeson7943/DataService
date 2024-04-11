export function getMessage(messageType) {
    switch (messageType.toLowerCase()) {
        case 'not authorised':
            return { message: "User is not Authenticated" }
        case 'details incorrect':
            return { message: "Username or Password is incorrect" }
    }
}