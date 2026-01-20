const contactService = require('./contactService')

//const contactInputValidations = require('./contactInputValidations')




function actionsMenu() {
    console.log("arguments:", process.argv)
    const action = process.argv[2]

    while (action !== 'exit') {
        action = process.argv[2]
        // let name = process.argv[3]
        //let email = process.argv[4]
        //let phoneNumber = process.argv[5]
        console.log("action " + action)

        switch (action.toLowerCase()) {
            case ("add"):
                //let name = process.argv[3]
                //let email = process.argv[4]
                //let phoneNumber = process.argv[5]

                const contact = { name: process.argv[3], email: process.argv[4], phoneNumber: process.argv[5] }
                console.log("email: " + email + "" + phoneNumber)
                contactService.addContact(email, phoneNumber)
                break;

            case ("delete"):
                email = process.argv[3]
                contactService.deleteContact(email)
                break;

            case ("list"): {
                contactService.loadContacts()
                break;
            }
            case ("search"): {
                contactService.searchContact()
                break;
            }
            case ("help"):
                console.log('=== All Contacts ===')
                break;
            default: {
                action = 'exit'
                break;
            }
        }
    }
}

//actionsMenu()

module.exports = {
    actionsMenu
};

