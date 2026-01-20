const fs = require("fs");

const loadContacts = (fileName, callback) => {
  fs.readFile(fileName, (err, data) => {
    if (err === null) {
      try {
        const contacts = JSON.parse(data);
        callback(null, contacts);
      } catch (parseError) {
        callback(new Error(`Failed to parse JSON in ${fileName}: ${parseError.message}`));
      }
    } else if (err.code === "ENOENT") {
      fs.writeFile(fileName, "", (err) => {
        callback(new Error(`File not found - creating new contact list`));
      });
    } else {
      callback(new Error(`Failed to read ${fileName}: ${err.message}`));
    }
  });
};

const saveContacts = (fileName, contacts, callback) => {
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFile(fileName, data, (err) => {
    if (callback) {
      callback(err);
    }
  });
};

const addContactToList = (contacts, contactObj) => {
  contacts.push({ name: contactObj.name, email: contactObj.email, phone: contactObj.phone });
  return contacts;
};

const deleteContactFromList = (contacts, email) => {
  const deletedName = contacts.find((contact) => contact.email === email).name;
  const newArray = contacts.filter((contact) => contact.email !== email);
  return { newArray, deletedName };
};

const searchContactInList = (contacts, searchStr) => {
  const normalizedStr = searchStr.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase() === normalizedStr || contact.email.toLowerCase() === normalizedStr);
};

module.exports = {
  loadContacts,
  saveContacts,
  addContactToList,
  deleteContactFromList,
  searchContactInList,
};
