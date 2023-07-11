<!--Скрипт заполнения модального окна редактирования-->
const editUserModal = document.getElementById('editUserModal')
if (editUserModal) {
    editUserModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const userid = button.getAttribute('data-bs-id')
        const username = button.getAttribute('data-bs-name')
        const userlastname = button.getAttribute('data-bs-lastname')
        const userage = button.getAttribute('data-bs-age')
        const useremail = button.getAttribute('data-bs-email')

        // Update the modal's content.
        let modalBodyInput = editUserModal.querySelector('input#user-id')
        modalBodyInput.value = userid
        modalBodyInput = editUserModal.querySelector('input#user-first-name')
        modalBodyInput.value = username
        modalBodyInput = editUserModal.querySelector('input#user-last-name')
        modalBodyInput.value = userlastname
        modalBodyInput = editUserModal.querySelector('input#user-age')
        modalBodyInput.value = userage
        modalBodyInput = editUserModal.querySelector('input#user-email')
        modalBodyInput.value = useremail
    })
}

<!--Скрипт заполнения модального окна удаления-->
const deleteUserModal = document.getElementById('deleteUserModal')
if (deleteUserModal) {
    deleteUserModal.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget
        // Extract info from data-bs-* attributes
        const userid = button.getAttribute('data-bs-id')
        const username = button.getAttribute('data-bs-name')
        const userlastname = button.getAttribute('data-bs-lastname')
        const userage = button.getAttribute('data-bs-age')
        const useremail = button.getAttribute('data-bs-email')
        const userrolesString = button.getAttribute('data-bs-roles');
        const userroles = userrolesString.split(','); // Преобразование строки в массив

        // Update the modal's content.
        let modalBodyInput = deleteUserModal.querySelector('input#user-did')
        modalBodyInput.value = userid
        modalBodyInput = deleteUserModal.querySelector('input#user-first-dname')
        modalBodyInput.value = username
        modalBodyInput = deleteUserModal.querySelector('input#user-last-dname')
        modalBodyInput.value = userlastname
        modalBodyInput = deleteUserModal.querySelector('input#user-dage')
        modalBodyInput.value = userage
        modalBodyInput = deleteUserModal.querySelector('input#user-demail')
        modalBodyInput.value = useremail

        const selectElement = deleteUserModal.querySelector('select#user-droles');
        selectElement.innerHTML = ''; // Очистить текущие опции

        userroles.forEach(role => {
            const option = document.createElement('option');
            option.value = role;
            option.text = role;
            selectElement.appendChild(option);
        });
    })
}

function editUser() {
    const id = document.getElementById('user-id').value;
    const url = '/api/users/' + id;

    // Получение CSRF-токена
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    // Создание заголовка для CSRF-токена
    const headers = new Headers();
    headers.append(csrfHeader, csrfToken);

    // Получение данных из формы
    const firstName = document.getElementById('user-first-name').value;
    const lastName = document.getElementById('user-last-name').value;
    const age = document.getElementById('user-age').value;
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    let roles = Array.from(document.getElementById('user-roles').selectedOptions).map(option => option.value);

    if (roles.length == 0) {
        roles = null;
    }

    // Создание объекта с данными пользователя
    const user = {
        id: id,
        name: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    };

    // Преобразование объекта в JSON-строку
    const userJson = JSON.stringify(user);

    // Выполнение AJAX-запроса для отправки данных формы на указанный URL
    fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: userJson
    })
        .then(response => {
            if (response.ok) {
                generateUsersDetails();

                // Программное нажатие кнопки "Close"
                const closeButton = document.getElementById('editeCloseButton');
                closeButton.click();
            } else {
                // Обработка ошибки удаления пользователя
                console.error('Error deleting user:', response.status);
            }
        })
        .catch(error => {
            // Обработка ошибок сети или других ошибок
            console.error('Error deleting user:', error);
        });
}

async function getUsers() {
    let url = "http://localhost:8080/api/users";
    let response = await fetch(url);
    return await response.json();
}

function generateTableBodyUsers(users) {
    let tbody = document.createElement("tbody");

    // Заполнение тела таблицы данными
    users.forEach((user) => {
        let tr = document.createElement("tr");
        let {id, name, lastName, age, email, roles} = user;
        let tdId = document.createElement("td");
        tdId.textContent = id;
        let tdFirstName = document.createElement("td");
        tdFirstName.textContent = name;
        let tdLastName = document.createElement("td");
        tdLastName.textContent = lastName;
        let tdAge = document.createElement("td");
        tdAge.textContent = age;
        let tdEmail = document.createElement("td");
        tdEmail.textContent = email;
        let tdRole = document.createElement("td");
        tdRole.textContent = "";

        roles.forEach((role) => {
            tdRole.textContent += role.role.substring(5) + " ";
        });

        let tdEdit = document.createElement("td");
        let editButton = document.createElement("input");
        editButton.classList.add("btn", "btn-info", "text-light");
        editButton.setAttribute("type", "submit");
        editButton.setAttribute("value", "Edit");
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#editUserModal");
        editButton.setAttribute("data-bs-id", id);
        editButton.setAttribute("data-bs-name", name);
        editButton.setAttribute("data-bs-lastname", lastName);
        editButton.setAttribute("data-bs-age", age);
        editButton.setAttribute("data-bs-email", email);
        tdEdit.appendChild(editButton);

        let tdDelete = document.createElement("td");
        let deleteButton = document.createElement("input");
        deleteButton.classList.add("btn", "btn-danger", "text-light");
        deleteButton.setAttribute("type", "submit");
        deleteButton.setAttribute("value", "Delete");
        deleteButton.setAttribute("data-bs-toggle", "modal");
        deleteButton.setAttribute("data-bs-target", "#deleteUserModal");
        deleteButton.setAttribute("data-bs-id", id);
        deleteButton.setAttribute("data-bs-name", name);
        deleteButton.setAttribute("data-bs-lastname", lastName);
        deleteButton.setAttribute("data-bs-age", age);
        deleteButton.setAttribute("data-bs-email", email);
        deleteButton.setAttribute("data-bs-roles", roles.map((role) => role.role.substring(5)));
        tdDelete.appendChild(deleteButton);

        tr.appendChild(tdId);
        tr.appendChild(tdFirstName);
        tr.appendChild(tdLastName);
        tr.appendChild(tdAge);
        tr.appendChild(tdEmail);
        tr.appendChild(tdRole);
        tr.appendChild(tdEdit);
        tr.appendChild(tdDelete);

        tbody.appendChild(tr);
    });

    return tbody;
}

function generateUsersDetails() {
    getUsers()
        .then((users) => {
            let table = generateTableBodyUsers(users);
            let tableContainer = document.getElementById("usersDetailsTable");
            let tbody = tableContainer.querySelector("tbody");
            if (tbody) {
                tableContainer.removeChild(tbody);
            }
            tableContainer.appendChild(table);
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
}

function addUser() {
    const url = '/api/users';

    // Получение CSRF-токена
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    // Создание заголовка для CSRF-токена
    const headers = new Headers();
    headers.append(csrfHeader, csrfToken);

    // Получение данных из формы
    const firstName = document.getElementById('new-user-first-name').value;
    const lastName = document.getElementById('new-user-last-name').value;
    const age = document.getElementById('new-user-age').value;
    const email = document.getElementById('new-user-email').value;
    const password = document.getElementById('new-user-password').value;
    let roles = Array.from(document.getElementById('new-user-roles').selectedOptions).map(option => option.value);

    if (roles.length == 0) {
        roles = null;
    }

    // Создание объекта с данными пользователя
    const user = {
        name: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    };

    // Преобразование объекта в JSON-строку
    const userJson = JSON.stringify(user);

    // Выполнение AJAX-запроса для отправки данных формы на указанный URL
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        },
        body: userJson
    })
        .then(response => {
            if (response.ok) {
                generateUsersDetails();

                // Активация вкладки UsersTab и ее содержимого
                checkoutToUsersTab();
            } else {
                // Обработка ошибки удаления пользователя
                console.error('Error deleting user:', response.status);
            }
        })
        .catch(error => {
            // Обработка ошибок сети или других ошибок
            console.error('Error deleting user:', error);
        });
}

function deleteUser() {
    const id = document.getElementById('user-did').value;
    const url = '/api/users/' + id;

    // Получение CSRF-токена
    const csrfToken = document.querySelector("meta[name='_csrf']").content;
    const csrfHeader = document.querySelector("meta[name='_csrf_header']").content;

    // Создание заголовка для CSRF-токена
    const headers = new Headers();
    headers.append(csrfHeader, csrfToken);

    // Выполнение AJAX-запроса для отправки данных формы на указанный URL
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            [csrfHeader]: csrfToken
        }
    })
        .then(response => {
            if (response.ok) {
                generateUsersDetails();

                // Программное нажатие кнопки "Close"
                const closeButton = document.getElementById('closeButton');
                closeButton.click();
            } else {
                // Обработка ошибки удаления пользователя
                console.error('Error deleting user:', response.status);
            }
        })
        .catch(error => {
            // Обработка ошибок сети или других ошибок
            console.error('Error deleting user:', error);
        });
}


function checkoutToUsersTab() {

    // Устанавливаем активный класс для вкладки 1
    const tab1 = document.getElementById('tab1');
    tab1.classList.add('active');
    tab1.setAttribute('aria-current', 'page');

    // Удаляем активный класс для вкладки 2
    const tab2 = document.getElementById('tab2');
    tab2.classList.remove('active');
    tab2.removeAttribute('aria-current');

    const content1 = document.getElementById('users-table');
    content1.classList.add('show', 'active');

    const content2 = document.getElementById('new-user');
    content2.classList.remove('show', 'active');

}

generateUsersDetails();
