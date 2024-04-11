export function authCheck(cookies) {
    let token = cookies['authToken']
    if (token == 'valid') {
        return true;
    } else {
        return false;
    }
}