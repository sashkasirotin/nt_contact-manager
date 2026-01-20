const contactService = require('./contactService')

//const contactInputValidations = require('./contactInputValidations')



function help() {
    console.log('Usage: node contacts.js [command] [arguments]\n' +
        '\n\nCommands:\n' +
        '  add "name" "email" "phone"  - Add a new contact\n' +
        '  list                        - List all contacts\n' +
        '  search "query"              - Search contacts by name or email\n' +
        '  delete "email"              - Delete contact by email\n' +
        '  help                        - Show this help message\n'






    )
}

function actionsMenu() {
    console.log("arguments:", process.argv)
    let action = process.argv[2]

    while (action != 'exit') {
        //action = process.argv[2]
        // let name = process.argv[3]
        //let email = process.argv[4]
        //let phoneNumber = process.argv[5]
        console.log("action " + action)
        action = process.argv[2]
        switch (action.toLowerCase()) {
            case ("add"):
                //let name = process.argv[3]
                //let email = process.argv[4]
                //let phoneNumber = process.argv[5]
                const contact = { name: process.argv[3], email: process.argv[4], phoneNumber: process.argv[5] }
                console.log("name:" + contact.name + "email: " + contact.email + "" + contact.phoneNumber)
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
                help()
                action = 'exit'
                break;
            default:
                action = 'exit'
                break;

        }
    }
}

actionsMenu()

module.exports = {
    actionsMenu
};

