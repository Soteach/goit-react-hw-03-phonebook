import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import '../components/App.css';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
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

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts !== null) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState);
    // console.log(this.props, this.state);
    if (prevState.contacts !== this.state.contacts) {
      // console.log('contacts updated');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

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
