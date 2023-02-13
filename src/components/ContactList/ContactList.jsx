import PropTypes from 'prop-types';
import React from 'react';
import { ItemList } from './ItemList/ItemList';
import './ContactList.css';

export const ContactList = ({ contacts, deleteContacts }) => {
  return (
    <>
      <ul className="Container">
        {contacts.map(({ id, name, number }) => (
          <ItemList
            key={id}
            name={name}
            number={number}
            deleteContacts={deleteContacts}
            id={id}
          />
        ))}
      </ul>
    </>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
};
