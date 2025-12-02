export function getMyComponentCSS() {
    return `
                .simple-card {
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    border: 1px solid black;
                    text-align: center;
                    margin: 10px;
                }

                .simple-card img {
                    width: 100%;
                    height: auto;
                    display: block;
                }

                hgroup .year {
                    font-size: 0.9rem;
                    color: #888;
                    margin: 10px;
                }

                hgroup .model {
                    font-size: 1.2rem;
                    margin: 10px;
                }

                .simple-card p {
                    color: red;
                }
                
                .simple-card textarea{
                    width: 100%;
                }
                `;
}