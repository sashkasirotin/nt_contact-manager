const vlidator = require("./contactInputValidations");

function printHelp() {
  console.log(
    "Usage: node contacts.js [command] [arguments]\n" +
      "\n\nCommands:\n" +
      '  add "name" "email" "phone"  - Add a new contact\n' +
      "  list                        - List all contacts\n" +
      '  search "query"              - Search contacts by name or email\n' +
      '  delete "email"              - Delete contact by email\n' +
      "  help                        - Show this help message\n",
  );
}

function actionsMenu() {
  console.log("arguments:", process.argv);
  let action = process.argv[2];

  while (action != "exit") {
    action = process.argv[2];
    const input = [process.argv[2], process.argv[3], process.argv[4], process.argv[5]];

    switch (action.toLowerCase()) {
      case "add":
        if (vlidator.validateEmailAndPhone(process.argv[3], process.argv[4])) {
          return input;
        }
      case "delete":
        return input;

      case "list": {
        return input;
      }
      case "search": {
        return input;
      }
      case "help":
        return input;
      // action = 'exit'
      default:
        break;
    }
  }
}

const printMessage = (msg) => {
  console.log(msg);
};
const printContacts = (contactList) => {
  contactList.forEach((contact, idx) => {
    console.log(`${idx + 1}. ${contact.name} | ${contact.email} | ${contact.phone}`);
  });
};

module.exports = {
  actionsMenu,
  printMessage,
  printHelp,
  printContacts,
};
