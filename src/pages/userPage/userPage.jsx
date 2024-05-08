import React, { useState, useEffect } from "react";
import * as userService from '../../utilities/users-service'; // Importing userService
import CharactersPage from "../CharactersPage/CharactersPage";

function UserPage() {
    const [user, setUser] = useState(userService.getUser());
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            // You can remove the import of userAPI and use userService.getUser directly
            const data = userService.getUser(); // Correct usage of getUser from userService
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };

    return (
        <div>
            <h2>Hola!</h2>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>{user.password}</p>
            {/* Render the CharactersPage component */}
            <CharactersPage users={users} setUsers={setUsers} />
        </div>
    );
}

export default UserPage;

