// this manipulates data and handles input
const fs = require("fs");

let _contactList = null;

const loadContacts = (fileName, callback) => {
  //ui prints out loading message
  //console.log(`Loading contacts from ${fileName}...`);
  fs.readFile(fileName, (err, data) => {
    if (err === null) {
      try {
        const contacts = JSON.parse(data);
        //ui prints out loaded contacts amount
        //console.log(`Loaded ${contactsLength} contacts`);
        callback(null, contacts);
      } catch (parseError) {
        callback(new Error(`Failed to parse JSON in ${fileName}: ${parseError.message}`));
      }
    } else if (err.code === "ENOENT") {
      //ui prints error: create a new file
      //console.log("File not found - creating new contact list");
      fs.writeFile(fileName, "", (err) => {
        callback(new Error(`File not found - creating new contact list`));
      });
    } else {
      callback(new Error(`Failed to read ${fileName}: ${err.message}`));
    }
  });
};

const saveContacts = (fileName, contacts) => {
  //recieves the filename and a contacts object to push it into the file.
  fs.writeFile(fileName, JSON.stringify(contacts));
  //ui prints out save message
  console.log(`Contacts saved to ${fileName}`);
};

const addContact = (contacts, name, email, phone) => {
  if (isNaN(name)) {
    return "Error: Name must only contain letters";
  }
  if (!email.includes("@")) {
    return "Error: Email must contain @ symbol";
  }
  if (phone.length < 12) {
    return "Error: Phone number must contain 10 digits separated by dashes";
  } else if (isNaN(phone)) {
    return "Error: Phone number must be a number";
  }
  contacts.push({ name, email, phone });
  //ui prints out contact saved to file
};

const deleteContact = (contacts, email) => {
  for (let contactIdx in contacts) {
    if (contacts[contactIdx].email === email) {
      contacts.splice(contactIdx, 1);
    } //else return false???
  }
};

const searchContact = (contacts, searchStr) => {
  for (let contact of contacts) {
    if (contact.name.includes(searchStr) || contact.email.includes(searchStr)) {
      return contact;
    }
  }
  //return false???
};

const contactList = (contacts) => {
  // should UI do this??
};

// callback MUST be used to be able to print out _contactList, otherwise the function's async behaviour makes it undefined.
// example:
// loadContacts("contax.json", (contacts) => {
//   _contactList = contacts;
//   console.log(_contactList);
// });

module.exports = {
  loadContacts,
  saveContacts,
  addContact,
  deleteContact,
  searchContact,
};
