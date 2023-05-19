import React, { useState, useEffect } from "react";
import Form from "./Form";
import ContactList from "./ContactList";
import Filter from "./Filter";
import { nanoid } from "nanoid";

const App = () => {
  const [parsedContacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = contacts ? JSON.parse(contacts) : [];
    return parsedContacts;
  });

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(parsedContacts));
  }, [parsedContacts]);

  const filterContacts = parsedContacts.filter(
    (contact) =>
      contact.name &&
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleSubmit = (contact) => {
    const { name } = contact;
    const lowerCaseName = name.toLowerCase();
    const isNameUnique = !parsedContacts.some(
      (existingContact) =>
        existingContact.name.toLowerCase() === lowerCaseName
    );

    if (isNameUnique) {
      const id = nanoid();
      setContacts([...parsedContacts, { ...contact, id }]);
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const handleDelete = (id) => {
    setContacts(parsedContacts.filter((contact) => contact.id !== id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto",
        backgroundColor: "lightblue",
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter filter={filter} onFilter={setFilter} />
        <ContactList contacts={filterContacts} onDeleteContact={handleDelete} />
      </div>
    </div>
  );
};

export { App };
