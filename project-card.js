class ProjectCard extends HTMLElement {

    constructor(){
        super();
    }

    connectedCallback() {

        const cardName = this.getAttribute("name") || "Unknown name";
        const title = this.getAttribute("projectTitle") || "Unknown title";
        const type = this.getAttribute("projectType") || "Unknown type";
        const association = this.getAttribute("projectAssociation") || "Unknown association";
        const image = this.getAttribute("projectImage") || "";

        this.innerHTML = `
            <div class = "card" name = "${cardName}">
                <h3> ${title} </h3>
                <hr>
                <div class = "project-intro">
                    <picture>
                        <source srcset=${image}>
                        <img src = ${image} alt="${title} image">
                    </picture>
                    <p>
                        project type : ${type} <br>
                        association : ${association} <br>
                    </p>
                </div>
                <b> Project Details: </b>
                <ul> 
                    <slot name="description"></slot>
                </ul>
                <b> Actions: </b>
                <nav>
                    <slot name="media"></slot>
                </nav>
            </div>
        `;
    }

}

customElements.define("project-card", ProjectCard);
