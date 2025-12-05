let records = {};
let projects = {};

function displayProjects(container, projects) {

    container.innerHTML = "";
    
    for (let i = 0; i < projects.length; i++) {

        const card = document.createElement("project-card");
        card.projectData = projects[i];
        container.appendChild(card);

    };

}

function creatingProject(projects, form, formString, projectKey){

    const title = form.querySelector(`[name="${formString}title"]`).value.trim();
    const type = form.querySelector(`[name="${formString}type"]`).value.trim();
    const association = form.querySelector(`[name="${formString}association"]`).value.trim();
    const image = form.querySelector(`[name="${formString}image"]`).value.trim();

    const description = form.querySelector(`[name="${formString}description"]`).value.trim();
    const descriptionLines= description.split('\n').map(line => line.trim()).filter(line => line);

    const buttonsContainer = form.querySelector(`#${formString}projectButtonsContainer`);
    const buttonEntries = buttonsContainer.querySelectorAll('button-inner-container');
    const buttons = Array.from(buttonEntries).map(entry => {
        const name = entry.querySelector(`[name="${formString}buttonNames"]`).value.trim();
        const url = entry.querySelector(`[name="${formString}buttonLinks"]`).value.trim();
        return { name, url };
    });

    const newProject = {

        cardName: title.toLowerCase(),
        projectTitle: title,
        projectType: type,
        projectAssociation: association,
        projectImage: image,
        projectDescription: descriptionLines,
        projectMedia: buttons.map(b => ({

            name: b.name,
            link: b.url

        }))

    };

    projects[projectKey] = newProject;
    localStorage.setItem("projects", JSON.stringify(projects));

}

function updateDropdown(projects, dropDownUpdate, dropDownDelete){

    dropDownUpdate.innerHTML = `
        <option value="">-- Select a project --</option>
    `;
    dropDownDelete.innerHTML = `
        <option value="">-- Select a project --</option>
    `;

    Object.entries(projects).forEach(([id, project]) => {

        const optionUpdate = document.createElement("option");
        optionUpdate.value = id;
        optionUpdate.textContent = project.projectTitle;
        dropDownUpdate.appendChild(optionUpdate);

        const optionDelete = document.createElement("option");
        optionDelete.value = id;
        optionDelete.textContent = project.projectTitle;
        dropDownDelete.appendChild(optionDelete);

    });

}

function addingButton(buttonContainerId, formString){

    const newEntry = document.createElement("button-inner-container");
    newEntry.innerHTML = `
        <input type="text" name="${formString}buttonNames" minlength="3" placeholder="Button name" required>
        <input type="text" name="${formString}buttonLinks" placeholder="Enter your url" required>
    `;
    buttonContainerId.appendChild(newEntry);

}

function deletingButton(buttonContainerId){

    if (buttonContainerId.children.length > 1) {
        buttonContainerId.removeChild(buttonContainerId.lastElementChild);
    }

}





window.addEventListener('DOMContentLoaded', async () => {

    // Multiple forms: 

    const container = document.getElementById("project-container");
    const url = "https://api.jsonbin.io/v3/b/692eb290ae596e708f7e2ed4";

    projects = JSON.parse(localStorage.getItem("projects")) || {};

    const dropDownUpdate = document.getElementById("project_dropdown_update");
    const dropDownDelete = document.getElementById("project_dropdown_remove");

    Object.entries(projects).forEach(([id, project]) => {

        const optionUpdate = document.createElement("option");
        optionUpdate.value = id;
        optionUpdate.textContent = project.projectTitle;
        dropDownUpdate.appendChild(optionUpdate);

        const optionDelete = document.createElement("option");
        optionDelete.value = id;
        optionDelete.textContent = project.projectTitle;
        dropDownDelete.appendChild(optionDelete);

    });






    // Adding form: 

    const addForm = document.getElementById("addproject");
    const addButton = document.getElementById("addButton");
    const deleteButton = document.getElementById("deleteButton");
    const buttonsContainer = document.getElementById("projectButtonsContainer");

    addButton.addEventListener("click", () => {

        addingButton(buttonsContainer, "");
    });

    deleteButton.addEventListener("click", () => {
        deletingButton(buttonsContainer, "");
    });


    addForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const newProjectKey = crypto.randomUUID();
        creatingProject(projects, e.target, "", newProjectKey);

        updateDropdown(projects, dropDownUpdate, dropDownDelete);
        e.target.reset();
        
        buttonsContainer.innerHTML = ``;
        addingButton(buttonsContainer, "");

    });






    // Delete form:

    const removeForm = document.getElementById("deleteproject");

    removeForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const selectedId = dropDownDelete.value;
        
        if (!selectedId){
            
            return;

        }

        delete projects[selectedId];
        localStorage.setItem("projects", JSON.stringify(projects));

        updateDropdown(projects, dropDownUpdate, dropDownDelete);

        e.target.reset();

    });






    // Update form:

    const updateForm = document.getElementById("updateproject");
    const addUpdatedButton = document.getElementById("updated_addButton");
    const deleteUpdatedButton = document.getElementById("updated_deleteButton");
    const updatedButtonsContainer = document.getElementById("updated_projectButtonsContainer");

    addUpdatedButton.addEventListener("click", () => {

        addingButton(updatedButtonsContainer, "updated_");

    });

    deleteUpdatedButton.addEventListener("click", () => {

        deletingButton(updatedButtonsContainer, "updated_");

    });

    dropDownUpdate.addEventListener("change", () => {
        
        const selectedId = dropDownUpdate.value;
        
        if (!selectedId){
            
            return;

        }

        const projectToUpdate = projects[selectedId];

        document.getElementById("updated_title").value = projectToUpdate.projectTitle;
        document.getElementById("updated_type").value = projectToUpdate.projectType;
        document.getElementById("updated_association").value = projectToUpdate.projectAssociation;
        document.getElementById("updated_image").value = projectToUpdate.projectImage;
        document.getElementById("updated_description").value = projectToUpdate.projectDescription.join("\n");

        updatedButtonsContainer.innerHTML = ``;
        projectToUpdate.projectMedia.forEach(btn => {

            const entry = document.createElement("button-inner-container");
            entry.innerHTML = `
                <input type="text" name="updated_buttonNames" minlength = "3" placeholder="Button name" value="${btn.name}" required>
                <input type="text" name="updated_buttonLinks" placeholder="Enter your url" value="${btn.link}" required>
            `;

            updatedButtonsContainer.appendChild(entry);

        });

    });

    updateForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const selectedId = dropDownUpdate.value;
        
        if (!selectedId){
            
            return;

        }

        creatingProject(projects, e.target, "updated_", selectedId);

        updateDropdown(projects, dropDownUpdate, dropDownDelete);

        e.target.reset();

        updatedButtonsContainer.innerHTML = ``;
        addingButton(updatedButtonsContainer, "updated_");

    });







    // Load buttons: 

    const localButton = document.getElementById("local");
    const remoteButton =  document.getElementById("remote");

    remoteButton.addEventListener("click", async () => {

        try {

            const response = await fetch(url);

            if (!response.ok) {

                throw new Error(`Response status: ${response.status}`);

            }

            const data = await response.json();
            records = data.record;
            const projectsArray = Object.values(data.record || data);
            displayProjects(container, projectsArray);

        } catch (err) {

            console.error("Failed to load remote JSON.");

        }

    });

    localButton.addEventListener("click", () => {

        try {

            const projectsArray = Object.values(projects);
            displayProjects(container, projectsArray);

        } catch (err){

            console.error("No local data stored in localStorage under 'projects'.");

        }

    });

});
