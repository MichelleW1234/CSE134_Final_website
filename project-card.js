class ProjectCard extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {

        const project = this.projectData;

        let descriptionList = project.projectDescription
            .map(line => `<li>${line}</li>`)
            .join("");

        let mediaList = project.projectMedia
            .map(m => `<a href="${m.link}" ${m.target ? `target="${m.target}"` : ""}">${m.name}</a>`)
            .join("");

            
        this.innerHTML = `
            <div class = "card" name = "${project.cardName}">
                <h3> ${project.projectTitle} </h3>
                <hr>
                <div class = "project-intro">
                    <picture>
                        <source srcset=${project.projectImage}>
                        <img src = ${project.projectImage} alt="${project.projectTitle} image">
                    </picture>
                    <p>
                        project type : ${project.projectType} <br>
                        association : ${project.projectAssociation} <br>
                    </p>
                </div>
                <b> Project Details: </b>
                <ul> 
                    ${descriptionList}
                </ul>
                <b> Actions: </b>
                <nav>
                    ${mediaList}
                </nav>
            </div>
        `;
    }

}

customElements.define("project-card", ProjectCard);
