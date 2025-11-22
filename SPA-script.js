document.addEventListener("DOMContentLoaded", () => {

    const cardNames = ["arcade", "tritonturnup", "snowAgent", "wordProcessor"];

    const cards = document.querySelectorAll("project-card");

    const forwards = document.getElementById("forwards-button");
    const backwards = document.getElementById("backwards-button");


    forwards.addEventListener("click", () => {

        if (!document.startViewTransition){

            updateCardForwards();
            return;

        }

        document.startViewTransition(() => updateCardForwards());

    });

    backwards.addEventListener("click", () => {

        if (!document.startViewTransition){

            updateCardBackwards();
            return;

        }

        document.startViewTransition(() => updateCardBackwards());

    });



    function updateCardForwards(){

        const currentCard = document.querySelector(".card:not(.hidden)");
        const cardName = currentCard ? currentCard.getAttribute("name") : null;

        const currIndex = cardNames.indexOf(cardName);

        if (currIndex === 3){

            showCard(cardNames[0]);

        } else {

            showCard(cardNames[currIndex + 1]);

        }

    }



    function updateCardBackwards(){

        const currentCard = document.querySelector(".card:not(.hidden)");
        const cardName = currentCard ? currentCard.getAttribute("name") : null;

        const currIndex = cardNames.indexOf(cardName);

        if (currIndex === 0){

            showCard(cardNames[3]);

        } else {

            showCard(cardNames[currIndex - 1]);

        }

    }


    function showCard(name) {

        cards.forEach(card => {

            if (card.getAttribute("name") === name) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    }

});