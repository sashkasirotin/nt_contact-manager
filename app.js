const { printMessage, actionsMenu, help } = require("./contactUi");
const { loadContacts, saveContacts, addContactToList, deleteContactFromList, searchContactInList } = require("./contactService");

const FILE = "contacts.json";
let contactList = null;
//get user input for fileName and action
//UI sends an array with user input [0] = choice, [1] = contact name, [2] = contact email, [3] = phone
//depending on user input --->

const addContact = (name, email, phone) => {
  printMessage(`Loading contacts from ${FILE}`);
  loadContacts(FILE, (err, contacts) => {
    if (err) {
      printMessage(err.message);
      return;
    }

    contactList = contacts;
    printMessage(`Loaded ${contactList.length} contacts`);
    if (!contactList.some((contact) => contact.email == email)) {
      addContactToList(contacts, { name, email, phone });
      printMessage(`Contact added: ${name}`);
      saveContacts(FILE, contacts, (err) => {
        if (err) {
          printMessage(err.message);
          return;
        }
      });
      printMessage(`Contacts saved to ${FILE}`);
    } else {
      printMessage(`Contact already exists in ${FILE}`);
    }
  });
};

const deleteContact = (email) => {
  printMessage(`Loading contacts from ${FILE}`);
  loadContacts(FILE, (err, contacts) => {
    if (err) {
      printMessage(err.message);
      return;
    }

    contactList = contacts;
    printMessage(`Loaded ${contactList.length} contacts`);

    // deleteContactFromList(contacts, email);
    let postDeleteInfo = deleteContactFromList(contactList, email);
    contactList = postDeleteInfo.newArray;
    printMessage(`Contact deleted ${postDeleteInfo.deletedName}`);
    saveContacts(FILE, contactList, (err) => {
      if (err) {
        printMessage(err.message);
        return;
      }
    });
    printMessage(`Contacts saved to ${FILE}`);
  });
};

const run = () => {
  const input = actionsMenu();

  switch (input[0]) {
    case "add":
      addContact(input[1], input[2], input[3]);
      break;
    case "delete":
      deleteContact(input[1]);
      break;
    case "help":
      help();
      break;

    default:
      printMessage(`Error, unknown command '${input[0]}'`);
      break;
  }
};

run();
