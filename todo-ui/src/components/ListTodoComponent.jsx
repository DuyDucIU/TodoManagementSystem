import React, { useEffect, useState } from 'react'
import { completeTodo, deleteTodo, getAllTodos, inCompleteTodo } from '../services/TodoService'
import { useNavigate } from 'react-router-dom'
import { isAdminUser } from '../services/AuthService'

const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    const isAdmin = isAdminUser()

    useEffect(() => {
        listTodos();
    }, [])

    function listTodos() {
        setLoading(true)
        getAllTodos().then((response) => {
            setTodos(response.data);
            setLoading(false)
        }).catch(error => {
            console.error(error);
            setLoading(false)
        })
    }

    function addNewTodo() {
        navigate('/add-todo')
    }

    function updateTodo(id) {
        console.log(id)
        navigate(`/update-todo/${id}`)
    }

    function removeTodo(id) {
        deleteTodo(id).then((response) => {
            listTodos();
        }).catch(error => {
            console.error(error)
        })
    }

    function markCompleteTodo(id) {
        completeTodo(id).then((response) => {
            listTodos()
        }).catch(error => {
            console.error(error)
        })
    }

    function markInCompleteTodo(id) {
        inCompleteTodo(id).then((response) => {
            listTodos();
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='main-container'>
            <div className='todo-header'>
                <h2>📋 My Tasks</h2>
                {isAdmin && (
                    <button className='btn btn-primary' onClick={addNewTodo}>
                        + Add New Task
                    </button>
                )}
            </div>

            {loading ? (
                <div className='empty-state'>
                    <div className='empty-state-icon'>⏳</div>
                    <h3>Loading tasks...</h3>
                </div>
            ) : todos.length === 0 ? (
                <div className='empty-state'>
                    <div className='empty-state-icon'>📝</div>
                    <h3>No tasks yet</h3>
                    <p>Create your first task to get started!</p>
                </div>
            ) : (
                <div className='todo-list'>
                    {todos.map((todo, index) => (
                        <div
                            className='todo-item'
                            key={todo.id}
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className='todo-item-header'>
                                <div className='todo-content'>
                                    <h3 className='todo-title'>{todo.title}</h3>
                                    <p className='todo-description'>{todo.description}</p>
                                </div>
                                <span className={`todo-status ${todo.completed ? 'status-completed' : 'status-pending'}`}>
                                    {todo.completed ? '✓ Completed' : '○ Pending'}
                                </span>
                            </div>

                            <div className='todo-actions'>
                                {!todo.completed && (
                                    <button
                                        className='btn btn-success btn-sm'
                                        onClick={() => markCompleteTodo(todo.id)}
                                    >
                                        ✓ Complete
                                    </button>
                                )}
                                {todo.completed && (
                                    <button
                                        className='btn btn-secondary btn-sm'
                                        onClick={() => markInCompleteTodo(todo.id)}
                                    >
                                        ↩ Reopen
                                    </button>
                                )}
                                {isAdmin && (
                                    <>
                                        <button
                                            className='btn btn-secondary btn-sm'
                                            onClick={() => updateTodo(todo.id)}
                                        >
                                            ✎ Edit
                                        </button>
                                        <button
                                            className='btn btn-danger btn-sm'
                                            onClick={() => removeTodo(todo.id)}
                                        >
                                            🗑 Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListTodoComponent