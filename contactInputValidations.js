function validateEmailAndPhone(email, phone) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phonePattern = /^\d{10}$/;
    if (!emailPattern.test(email) && emailPattern.) {
        return 'invalid email structure'
    }
    else if (phonePattern.test(phone)) {
        return 'invalid phone number'
    }
    return sucsees

}



