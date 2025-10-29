import { UserService } from "./services/user.service";

const userService = new UserService()

function renderData(): void {
    userService.getAll()
        .then(users => {
            const table = document.querySelector('table tbody');

            if (!table) {
                console.error('Table body not found');
                return;
            }

            // za svakog korisnika dodajemo po red u tabeli
            for (let i = 0; i < users.length; i++) {

                // kreiramo novi red
                const newRow = document.createElement('tr');

                // kreiramo ćeliju za id knjige
                const cell1 = document.createElement('td');
                cell1.textContent = users[i].id.toString();
                newRow.appendChild(cell1);

                // kreiramo ćeliju za korisnicko ime korisnika
                const cell2 = document.createElement('td');
                cell2.textContent = users[i].username;
                newRow.appendChild(cell2);

                // kreiramo ćeliju za ime korisnika
                const cell3 = document.createElement('td');
                cell3.textContent = users[i].name;
                newRow.appendChild(cell3);

                // kreiramo ćeliju za prezime korisnika
                const cell4 = document.createElement('td');
                cell4.textContent = users[i].lastName;
                newRow.appendChild(cell4);

                // kreiramo ćeliju za datum rodjenja korisnika
                const cell5 = document.createElement("td");
                const date = new Date(users[i].birthday);

                // Formatiramo u dd.mm.yyyy
                const formattedDate = date.toLocaleDateString("sr-RS", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                });

                cell5.textContent = formattedDate;
                newRow.appendChild(cell5);

                // dodajemo dugme za ažuriranje u svaki red
                const cel6 = document.createElement('td');
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.style.width = 'auto';
                cel6.style.textAlign = 'center';

                const userId = users[i].id;
                editButton.onclick = function () {
                    window.location.href = `./userForm/userForm.html?id=${userId}`;
                };
                cel6.appendChild(editButton);
                newRow.appendChild(cel6);

                const cel7 = document.createElement('td');
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remove';
                deleteButton.style.width = 'auto';
                cel7.style.textAlign = 'center';

                // stavljamo da se klikom na dugme pošalje DELETE zahtev za brisanje korisnika
                deleteButton.onclick = function () {
                    userService.deleteUser(userId.toString())
                        .then(() => {
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error(error.status, error.text);
                        });
                };
                cel7.appendChild(deleteButton);
                newRow.appendChild(cel7);

                // dodajemo red u tabelu
                table.appendChild(newRow);
            }
        })
        .catch(error => {
            console.error(error.status, error.message);
        });
}

renderData();