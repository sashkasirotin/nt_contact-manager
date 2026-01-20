const contactService = require("./contactService");
const appController = require("./app");

//const contactInputValidations = require('./contactInputValidations')

function help() {
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
    //action = process.argv[2]
    // let name = process.argv[3]
    //let email = process.argv[4]
    //let phoneNumber = process.argv[5]
    console.log("action " + action);
    action = process.argv[2];
    const input = [process.argv[2], process.argv[3], process.argv[4], process.argv[5]];

    switch (action.toLowerCase()) {
      case "add":
        return input;
        break;

      case "delete":
        //email = process.argv[3]
        return input;
        break;

      case "list": {
        return input;
        break;
      }
      case "search": {
        return input;
        break;
      }
      case "help":
        help();
        action = "exit";
        break;
      default:
        break;
    }
  }
}

const printMessage = (msg) => {
  console.log(msg);
};

//actionsMenu()

module.exports = {
  actionsMenu,
  printMessage,
};
