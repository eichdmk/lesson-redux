import { useDispatch, useSelector } from "react-redux"
import { API } from "../api/api"
import { deleteUser, setEditingUser, setUsers, updateStatus } from "../store/usersSlice"
import { useEffect } from "react"

export function UsersList() {

    const users = useSelector(state => state.users.list)
    const dispatch = useDispatch()

    async function getUsers() {
        const { data } = await API.get('/users')

        dispatch(setUsers(data))

    }

    useEffect(() => {
        getUsers()
    }, [])

    async function handleDelete(id) {
        await API.delete('/users/' + id)

        dispatch(deleteUser(id))
    }

    async function handleUpdateStatus(u) {
        await API.put('/users/' + u.id, { is_active: !u.is_active })

        dispatch(updateStatus(u.id))
    }

    return (
        <>
            <h1>Список пользователей</h1>

            {users.map(u => {
                return <li key={u.id}>
                    <p>E-mail: {u.email}</p>
                    <p>username: {u.username}</p>
                    <button onClick={() => handleUpdateStatus(u)}>{u.is_active ? 'Активный' : 'Неактивен'}</button>
                    <button onClick={() => handleDelete(u.id)}>Удалить</button>
                    <button onClick={()=> dispatch(setEditingUser(u))}>Редактирвоать</button>
                </li>
            })}
        </>
    )
}