import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../api/api";
import { addUser, setEditingUser, updateUser } from "../store/usersSlice";
import { UsersList } from "./UsersList";

export function UsersForm() {
    const editingUser = useSelector(state => state.users.editingUser)
    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (editingUser) {
            setUsername(editingUser.username)
            setEmail(editingUser.email)
        } else {
            setUsername('')
            setEmail('')
        }
    }, [editingUser])



    async function handleSubmit(e) {
        e.preventDefault()

        if (editingUser) {
            const { data } = await API.put('/users/' + editingUser.id, { username, email })
            dispatch(updateUser(data))
        } else {
            const { data } = await API.post('/users', { username, email })
            dispatch(addUser(data))
        }

        setUsername('')
        setEmail('')

        dispatch(setEditingUser(null))
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <button>{editingUser ? 'Редактировать' : 'Добавить'}</button>
            </form>
            <UsersList/>
        </>
    )
}