import PropTypes from 'prop-types';
import './ItemList.css';

export const ItemList = ({ name, number, deleteContacts, id }) => {
  return (
    <li className="ContactList">
      {name}: {number}
      <button
        className="ItemButton"
        type="button"
        onClick={() => {
          deleteContacts(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ItemList.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
