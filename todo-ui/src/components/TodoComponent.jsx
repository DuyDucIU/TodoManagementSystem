import React, { useEffect } from 'react'
import { useState } from 'react'
import { getTodo, saveTodo, updateTodo } from '../services/TodoService'
import { useNavigate, useParams } from 'react-router-dom'

const TodoComponent = () => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [completed, setCompleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()


    function saveOrUpdateTodo(e) {
        e.preventDefault()
        setLoading(true)

        const todo = { title, description, completed }
        console.log(todo);

        if (id) {
            updateTodo(id, todo).then((response) => {
                navigate('/todos')
            }).catch(error => {
                console.error(error);
                setLoading(false)
            })
        } else {
            saveTodo(todo).then((response) => {
                console.log(response.data)
                navigate('/todos')
            }).catch(error => {
                console.error(error);
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        if (id) {
            getTodo(id).then((response) => {
                console.log(response.data)
                setTitle(response.data.title)
                setDescription(response.data.description)
                setCompleted(response.data.completed)
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    return (
        <div className='todo-form-container'>
            <div className='todo-form-card'>
                <div className='todo-form-header'>
                    <h2>{id ? '✎ Edit Task' : '+ Create New Task'}</h2>
                </div>

                <div className='todo-form-body'>
                    <form onSubmit={saveOrUpdateTodo}>
                        <div className='form-group'>
                            <label className='form-label'>Task Title</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='What needs to be done?'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>Description</label>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Add more details...'
                                name='description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className='form-group'>
                            <label className='form-label'>Status</label>
                            <div className='toggle-group'>
                                <label className='toggle-switch'>
                                    <input
                                        type='checkbox'
                                        checked={completed}
                                        onChange={(e) => setCompleted(e.target.checked)}
                                    />
                                    <span className='toggle-slider'></span>
                                </label>
                                <span className='toggle-label'>
                                    {completed ? 'Completed' : 'In Progress'}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                            <button
                                className='btn btn-primary'
                                type='submit'
                                disabled={loading}
                                style={{ flex: 1 }}
                            >
                                {loading ? 'Saving...' : (id ? 'Update Task' : 'Create Task')}
                            </button>
                            <button
                                className='btn btn-secondary'
                                type='button'
                                onClick={() => navigate('/todos')}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TodoComponent