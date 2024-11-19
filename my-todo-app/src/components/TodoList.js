import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS for modal functionality
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    useEffect(() => {
        const fetchTodos = async () => {
            const response = await axios.get('http://localhost:5000/api/todos', {
                headers: { Authorization: token },
            });
            setTodos(response.data);
        };
        fetchTodos();
    }, [token]);

    const addTodo = async () => {
        if (!title || !description || !priority) return;
        const response = await axios.post('http://localhost:5000/api/todos',
            { title, description, priority },
            { headers: { Authorization: token } }
        );
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
        setPriority('');
    };

    const deleteTodo = async (id) => {
        await axios.delete(`http://localhost:5000/api/todos/${id}`, {
            headers: { Authorization: token },
        });
        setTodos(todos.filter(todo => todo._id !== id));
    };

    const updateTodo = async (id) => {
        const updatedTitle = prompt("Enter new title:");
        const updatedDescription = prompt("Enter new description:");
        const updatedPriority = prompt("Enter new priority (low, medium, high):");

        if (updatedTitle && updatedDescription && updatedPriority) {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`,
                { title: updatedTitle, description: updatedDescription, priority: updatedPriority },
                { headers: { Authorization: token } }
            );
            setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
        }
    };

    const toggleComplete = async (id) => {
        const todo = todos.find(todo => todo._id === id);
        const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !todo.completed }, {
            headers: { Authorization: token },
        });
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    };

    const getCardClass = (priority) => {
        switch (priority) {
            case 'low':
                return 'light';
            case 'medium':
                return 'warning';
            case 'high':
                return 'danger';
            default:
                return '';
        }
    };

    const filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Group todos by priority
    const groupedTodos = {
        low: filteredTodos.filter(todo => todo.priority === 'low'),
        medium: filteredTodos.filter(todo => todo.priority === 'medium'),
        high: filteredTodos.filter(todo => todo.priority === 'high'),
    };

    return (
        <div className="container mt-5 todo-page">
            <h2 className="text-center mb-4">Transform Your Thoughts into Actions!</h2> {/* Catchy Heading */}

            <p className="text-center mb-4">"Every task you complete is a step towards your goals!"</p> {/* Catchy Quote */}


            <div className="d-flex justify-content-between align-items-center mb-4">

                <div className="input-group" style={{ width: '1000px' }}>
                    <label className="form-label">Search</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search todos"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button type="button" className="btn btn-success btn-lg" data-bs-toggle="modal" data-bs-target="#addTodoModal">
                    Add Todo
                </button>

            </div>


            {/* Modal */}
            <div className="modal fade" id="addTodoModal" tabIndex="-1" aria-labelledby="addTodoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTodoModalLabel">Add New Todo</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <label className="form-label"> Title </label>
                                <input
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Add new todo title"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="form-label">Description</label>
                                <input
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add new todo description"
                                />
                            </div>
                            <div className="input-group mb-3">
                                <label className="form-label">Priority</label>
                                <select
                                    className="form-control"
                                    value={priority}
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="">Choose priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={addTodo} data-bs-dismiss="modal">Add Todo</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Todo list display */}
            <div className="row">
                <div className="col-md-4">
                    <h4 className="priority-heading">Low Priority</h4>
                    <hr className='priority-divider' />
                    {groupedTodos.low.map((todo) => (
                        <div className={`card mb-3 shadow-sm ${getCardClass(todo.priority)} ${todo.completed ? 'completed' : ''}`} key={todo._id}>
                            <div className="card-body">
                                <h5 className="card-title">{todo.completed ? <s>{todo.title}</s> : todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
                                <p className="card-text"><strong>Priority: </strong>{todo.priority}</p>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo._id)}
                                    />
                                    <label className="form-check-label">Completed</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning btn-sm" onClick={() => updateTodo(todo._id)} disabled={todo.completed}>Update</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <h4 className="priority-heading">Medium Priority</h4>
                    <hr className='priority-divider' />

                    {groupedTodos.medium.map((todo) => (
                        <div className={`card mb-3 shadow-sm ${getCardClass(todo.priority)} ${todo.completed ? 'completed' : ''}`} key={todo._id}>
                            <div className="card-body">
                                <h5 className="card-title">{todo.completed ? <s>{todo.title}</s> : todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
                                <p className="card-text"><strong>Priority: </strong>{todo.priority}</p>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo._id)}
                                    />
                                    <label className="form-check-label">Completed</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning btn-sm" onClick={() => updateTodo(todo._id)} disabled={todo.completed}>Update</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-md-4">
                    <h4 className="priority-heading">High Priority</h4>
                    <hr className='priority-divider' />

                    {groupedTodos.high.map((todo) => (
                        <div className={`card mb-3 shadow-sm ${getCardClass(todo.priority)} ${todo.completed ? 'completed' : ''}`} key={todo._id}>
                            <div className="card-body">
                                <h5 className="card-title">{todo.completed ? <s>{todo.title}</s> : todo.title}</h5>
                                <p className="card-text">{todo.description}</p>
                                <p className="card-text"><strong>Priority: </strong>{todo.priority}</p>
                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleComplete(todo._id)}
                                    />
                                    <label className="form-check-label">Completed</label>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning btn-sm" onClick={() => updateTodo(todo._id)} disabled={todo.completed}>Update</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TodoList;
