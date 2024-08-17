const url = "http://localhost:8080/task/find-all/4";

function hideLoader() {
    document.getElementById("loading").style.display = "none";
}

function show(tasks) {
    let tab = `<thead>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">User Id</th>
                <th scope="col">Description</th>
            </thead><tbody>`;

    for (let task of tasks) {
        tab += `
                <tr>
                
                    <td scope="row">${task.id}</td>
                    <td>${task.user.username}</td>
                    <td>${task.user.id}</td>
                    <td>${task.description}</td>
                </tr>
            `;
    }

    tab += `</tbody>`;
    document.getElementById("tasks").innerHTML = tab;
}

async function getAPI(url) {
    try {
        const response = await fetch(url, { method: "GET" });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
        hideLoader();
        show(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getAPI(url);