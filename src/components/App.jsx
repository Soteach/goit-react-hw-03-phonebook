import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import '../components/App.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  changeFilter = filterValue => {
    this.setState({ filter: filterValue });
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  formSubmitHandler = data => {
    // console.log(data.name);
    // console.log(data.number);

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: nanoid(),
            name: data.name,
            number: data.number,
          },
        ],
      };
    });
  };

  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <>
        <div>
          <h1 className="FormHeader">Phonebook</h1>
          <ContactForm onSubmit={this.formSubmitHandler} />
          <h2 className="ContactsHeader">Contacts</h2>
          <Filter changeFilter={this.changeFilter} />
          <ContactList
            contacts={filteredContacts}
            deleteContacts={this.deleteContacts}
          />
        </div>
      </>
    );
  }
}
