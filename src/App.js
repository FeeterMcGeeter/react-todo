import React, { Component } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import './sass/App.scss';

class App extends Component {
    // Setting the initial state
    constructor(props) {
        super(props);
        this.state = {
            newItem: '',
            toDoList: [],
        };
    }

    // Using LocalStorage
    componentDidMount() {
        this.hydrateStateWithLocalStorage();

        // Saving state to LocalStorage when user leaves or refreshes page
        window.addEventListener(
            'beforeunload',
            this.saveStateToLocalStorage.bind(this)
        );
    }

    componentWillUnmount() {
        window.removeEventListener(
            'beforeunload',
            this.saveStateToLocalStorage.bind(this)
        );

        this.saveStateToLocalStorage();
    }

    hydrateStateWithLocalStorage() {
        for (let key in this.state) {
            // if key exists in LocalStorage
            if (localStorage.hasOwnProperty(key)) {
                // get key's value from LocalStorage
                let value = localStorage.getItem(key);

                // parse LocalStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }

    saveStateToLocalStorage() {
        for (let key in this.state) {
            // save to LocalStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    updateInput(key, value) {
        // update the state
        this.setState({ [key]: value });
    }

    addItem() {
        const newItem = {
            id: 1 + Math.random(),
            value: this.state.newItem.slice(),
        };

        // Copy current list of items
        const toDoList = [...this.state.toDoList];

        // Add new item to list
        toDoList.push(newItem);

        // Update state with new list
        this.setState({
            toDoList,
            newItem: '',
        });
    }

    deleteItem(id) {
        // Copy current list of items
        const toDoList = [...this.state.toDoList];

        // filter out item to be deleted
        const updatedList = toDoList.filter((item) => item.id !== id);

        this.setState({ toDoList: updatedList });
    }

    render() {
        return (
            <div className='todo'>
                <h1 className='todo__title'>React To Do List</h1>

                <div className='todo__form-container'>
                    <input
                        className='todo__input'
                        type='text'
                        placeholder='Add Item'
                        value={this.state.newItem}
                        onChange={(e) =>
                            this.updateInput('newItem', e.target.value)
                        }
                    />
                    <button
                        className='todo__add-btn'
                        onClick={() => this.addItem()}
                        disabled={!this.state.newItem.length}
                    >
                        Add Item
                    </button>
                </div>

                <div className="todo__list-container">
                    <ul className='todo__list'>
                        {this.state.toDoList.map((item) => {
                            return (
                                <li key={item.id} className='todo__item'>
                                    {item.value}
                                    <span>
                                        <FaTrashAlt
                                            className='todo__delete-btn'
                                            onClick={() => this.deleteItem(item.id)}
                                        />
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;

// Create the To Do List UI elements
// Create the Add task functionality
// Display the new tasks
// Persisting data w/ LocalStorage
// Create the Remove task functionality
// Styling & animation
