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
  if (contacts.some((contact) => contact.email === contactObj.email)) {
    return false;
  }
  contacts.push({ name: contactObj.name, email: contactObj.email, phone: contactObj.phone });
  return contacts;
};

const deleteContactFromList = (contacts, email) => {
  if (contacts.some((contact) => contact.email === email)) {
    const deletedName = contacts.find((contact) => contact.email === email).name;
    const newArray = contacts.filter((contact) => contact.email !== email);
    return { newArray, deletedName };
  } else {
    return false;
  }
};

const searchContactInList = (contacts, searchStr) => {
  if (!Array.isArray(contacts) || !searchStr) return false;
  const normalizedStr = searchStr.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase().includes(normalizedStr) || contact.email.toLowerCase().includes(normalizedStr));
};

module.exports = {
  loadContacts,
  saveContacts,
  addContactToList,
  deleteContactFromList,
  searchContactInList,
};
