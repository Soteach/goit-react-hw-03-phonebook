import React, { Component } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import './ContactForm.css';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(20)
    .required('Please enter correct name includes more then 2 letter'),
  number: yup
    .number()
    .min(6)
    .max(19)
    .required('Enter correct number')
    .positive()
    .integer(),
});

export class ContactForm extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
  };

  handleChange = event => {
    const { name, value } = event.currentTarget;
    // console.log(event.currentTarget.name);
    // console.log(event.currentTarget.value);
    this.setState({ [name]: value });
    // на місце виразу в квадратних лапках буде підставвлено значення атрибута name
    // буквально const a="123" -> [a]:5 -> {123:5}
    // this.setState({ name: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.state);
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '' });
    this.setState({ number: '' });
  };

  render() {
    return (
      <>
        <Formik validationSchema={schema}>
          <form className="Form" onSubmit={this.handleSubmit}>
            <label className="FormLabel" htmlFor="name">
              Name
            </label>
            <input
              className="FormInput"
              type="text"
              name="name"
              value={this.state.name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
            ></input>
            <ErrorMessage name="name" />

            <label className="FormLabel" htmlFor="number">
              Number
            </label>
            <input
              className="FormInput"
              type="tel"
              name="number"
              value={this.state.number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
            ></input>
            <ErrorMessage name="number" />
            <button type="submit">Add contact</button>
          </form>
        </Formik>
      </>
    );
  }
}

ContactForm.propTypes = {
  stats: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};
