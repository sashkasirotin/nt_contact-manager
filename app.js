const { printMessage, actionsMenu, printHelp, printContacts } = require("./contactUi");
const { loadContacts, saveContacts, addContactToList, deleteContactFromList, searchContactInList } = require("./contactService");

const FILE = "contacts.json";

const handleContacts = (contactsLoadedFunction, { save = false } = {}) => {
  printMessage(`Loading contacts from ${FILE}`);

  loadContacts(FILE, (err, contacts) => {
    if (err) {
      printMessage(err.message);
      return;
    }

    printMessage(`Loaded ${contacts.length} contacts`);

    const result = contactsLoadedFunction(contacts);

    if (Array.isArray(result)) {
      contacts = result;
    }

    if (save && result) {
      saveContacts(FILE, result, () => {
        printMessage(`Contacts saved to ${FILE}`);
      });
    }
  });
};

const addContact = (name, email, phone) => {
  handleContacts(
    (contacts) => {
      const updatedContacts = addContactToList(contacts, { name, email, phone });
      if (!updatedContacts) {
        printMessage("Contact already exists");
        return;
      }

      printMessage(`Contact added: ${name}`);
      return updatedContacts;
    },
    { save: true },
  );
};

const searchContact = (searchStr) => {
  handleContacts((contacts) => {
    contacts = searchContactInList(contacts, searchStr);
    if (contacts) {
      printMessage(`=== Search Results for "${searchStr}" ===`);
      printContacts(contacts);
    } else {
      printMessage(`Nothing to show.`);
    }
  });
};

const deleteContact = (email) => {
  handleContacts(
    (contacts) => {
      let postDeleteInfo = deleteContactFromList(contacts, email);
      if (!postDeleteInfo) {
        printMessage(`Error: No contact found with email: ${email}`);
        return;
      }
      printMessage(`Contact deleted ${postDeleteInfo.deletedName}`);
      return postDeleteInfo.newArray;
    },
    { save: true },
  );
};

const showList = () => {
  handleContacts((contacts) => {
    printMessage(`=== All Contacts ===`);
    printContacts(contacts);
  });
};

const run = () => {
  const input = actionsMenu();

  switch (input[0]) {
    case "add":
      addContact(input[1], input[2], input[3]);
      break;
    case "list":
      showList();
      break;
    case "search":
      searchContact(input[1]);
      break;
    case "delete":
      deleteContact(input[1]);
      break;
    case "help":
      printHelp();
      break;
    default:
      printMessage(`Error, unknown command '${input[0]}'`);
      break;
  }
};

run();
