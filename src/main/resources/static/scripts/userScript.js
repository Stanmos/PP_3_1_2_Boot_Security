async function getUser(id) {
    let url = "http://localhost:8080/api/users";
    let response = await fetch(`${url}/${id}`);
    let user = await response.json();
    return user;
}

function generateUserInfo() {
    let id = document.querySelector("meta[name='currentId']").content;
    getUser(id)
        .then((user) => {
            let table = generateTableBodyUserInfo(user);
            let tableContainer = document.getElementById("userInfoTable");
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

function generateTableBodyUserInfo(user) {
    let tbody = document.createElement("tbody");

    // Заполнение тела таблицы данными
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

    tr.appendChild(tdId);
    tr.appendChild(tdFirstName);
    tr.appendChild(tdLastName);
    tr.appendChild(tdAge);
    tr.appendChild(tdEmail);
    tr.appendChild(tdRole);

    tbody.appendChild(tr);

    return tbody;
}

generateUserInfo();