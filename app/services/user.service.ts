import { User } from "../model/user.model";
import { UserFormData } from "../model/userFormData.model";

export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:5014/api/users';
    }

    getAll(): Promise<User[]> {
        return fetch(this.apiUrl)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((users: User[]) => {
                return users;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    getById(id: string): Promise<User> {
        return fetch(`${this.apiUrl}/${id}`)
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json();
            }).then((user: User) => {
                return user;
            }).catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    add(formData: UserFormData): Promise<User> {
        return fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((user: User) => {
                return user
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            })
    }

    update(id: string, formData: UserFormData): Promise<User> {
        return fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                return response.json()
            })
            .then((user: User) => {
                return user;
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }

    deleteUser(userId: string): Promise<void> {
        return fetch(`${this.apiUrl}/${userId}`, { method: 'DELETE' })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
            })
            .catch(error => {
                console.error('Error:', error.status)
                throw error
            });
    }
}