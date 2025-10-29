
import { UserFormData } from "../model/userFormData.model";
import { UserService } from "../services/user.service";


const userService = new UserService

function initializeForm(): void {
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

    userService.add(formData)
        .then(() => {
            window.location.href = '../index.html'
        }).catch(error => {
            console.error(error.status, error.text);
        })
}

document.addEventListener("DOMContentLoaded", initializeForm)