const container = document.getElementById("project-container");
const url = "https://api.jsonbin.io/v3/b/692eb290ae596e708f7e2ed4";
fetch(url)
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("projects", JSON.stringify(data.record));
    });
let records = {};




function createProjectCard(project) {

    const card = document.createElement("project-card");
    card.projectData = project;
    return card;

}

function displayProjects(projects) {

    container.innerHTML = "";
    projects.forEach(p => container.appendChild(createProjectCard(p)));
    
}




window.addEventListener('DOMContentLoaded', async () => {

    document.getElementById("remote").addEventListener("click", async () => {

        try {

            const response = await fetch(url);

            if (!response.ok) {

                throw new Error(`Response status: ${response.status}`);

            }

            const data = await response.json();
            records = data.record;
            const projectsArray = Object.values(data.record || data);
            displayProjects(projectsArray);

        } catch (err) {

            console.error("Failed to load remote JSON.");

        }

    });

    document.getElementById("local").addEventListener("click", () => {

        try {

            const data = JSON.parse(localStorage.getItem("projects"));
            const projectsArray = Object.values(data);
            displayProjects(projectsArray);

        } catch (err){

            console.error("No local data stored in localStorage under 'projects'.");

        }

    });

});
