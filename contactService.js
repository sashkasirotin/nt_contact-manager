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

const saveContacts = (fileName, contacts, callback) => {
  //recieves the filename and a contacts object to push it into the file.
  const data = JSON.stringify(contacts, null, 2);
  fs.writeFile(fileName, data, (err) => {
    if (callback) {
      callback(err);
    }
  });
  //ui prints out save message
  //   console.log(`Contacts saved to ${fileName}`);
};

const addContact = (contacts, contactObj) => {
  //   ui checks input:
  //   if (!isNaN(name)) {
  //     return "Error: Name must only contain letters";
  //   }
  //   if (!email.includes("@")) {
  //     return "Error: Email must contain @ symbol";
  //   }
  //   if (phone.length < 12) {
  //     return "Error: Phone number must contain 10 digits separated by dashes";
  //   } else if (isNaN(phone)) {
  //     return "Error: Phone number must be a number";
  //   }

  contacts.push({ name: contactObj.name, email: contactObj.email, phone: contactObj.phone });
  //ui prints out contact saved to file
  return contacts;
};

const deleteContact = (contacts, email) => {
  return contacts.filter((contact) => contact.email !== email);
};

const searchContact = (contacts, searchStr) => {
  const normalizedStr = searchStr.toLowerCase();
  return contacts.filter((contact) => contact.name.toLowerCase() === normalizedStr || contact.email.toLowerCase() === normalizedStr);
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
