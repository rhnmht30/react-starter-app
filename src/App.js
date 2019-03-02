import React, { Component } from "react";
import { Route } from "react-router-dom";
import ListContacts from "./ListContacts";
import CreateContacts from "./CreateContacts";
import * as ContactsAPI from "./utils/ContactsAPI";
class App extends Component {
  state = {
    contacts: []
  };

  componentDidMount() {
    ContactsAPI.getAll().then(contacts => {
      this.setState({ contacts });
    });
  }

  removeContact = contact => {
    // this.setState(state => ({
    //   contacts: state.contacts.filter(c => c.id !== contact.id)
    // }));
    // ContactsAPI.remove(contact);
    ContactsAPI.remove(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.filter(c => c.id !== contact.id)
      }));
    });
  };

  createContact(contact) {
    ContactsAPI.create(contact).then(contact => {
      this.setState(state => ({
        contacts: state.contacts.concat([contact])
      }));
    });
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListContacts
              onDeleteContact={this.removeContact}
              contacts={this.state.contacts}
            />
          )}
        />

        <Route
          path="/create"
          render={({ history }) => (
            <CreateContacts
              onCreateContact={contact => {
                this.createContact(contact);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
