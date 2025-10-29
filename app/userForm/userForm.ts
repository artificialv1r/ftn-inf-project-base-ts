
import { UserFormData } from "../model/userFormData.model";
import { UserService } from "../services/user.service";


const userService = new UserService

function initializeForm(): void {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if (id) {
        userService.getById(id)
            .then(user => {
                (document.querySelector('#username') as HTMLInputElement).value = user.username;
                (document.querySelector('#name') as HTMLInputElement).value = user.name;
                (document.querySelector('#lastName') as HTMLInputElement).value = user.lastName;
                (document.querySelector('#birthday') as HTMLInputElement).value = user.birthday
                    ? new Date(user.birthday).toISOString().split('T')[0]
                    : '';
            }).catch(error => {
                console.error(error.status, error.text)
            })
    }
    const button = document.querySelector("#submit")
    if (button) {
        button.addEventListener("click", submit)
    }
}

function submit(): void {

    const username = (document.querySelector('#username') as HTMLInputElement).value
    const name = (document.querySelector('#name') as HTMLInputElement).value
    const lastName = (document.querySelector('#lastName') as HTMLInputElement).value
    const date = (document.querySelector('#birthday') as HTMLInputElement).value
    const birthday = new Date(date)

    if (!username || !name || !lastName || !date) {
        alert("All fields are required!");
        return
    }

    const formData: UserFormData = { username, name, lastName, birthday }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    if (id) {
        userService.update(id, formData)
            .then(() => {
                window.location.href = '../index.html'
            }).catch(error => {
                console.error(error.status, error.text);
            })
    } else {

        userService.add(formData)
            .then(() => {
                window.location.href = '../index.html'
            }).catch(error => {
                console.error(error.status, error.text);
            })
    }
}

document.addEventListener("DOMContentLoaded", initializeForm)