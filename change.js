

// Créer la fonction qui fait appel aux options (la monnaie de chaque pays) à travers l' ID du formulaire.

document.querySelector('#form').onsubmit = () =>{
    const base = document.querySelector('#currency-from').value;

 // appeler le lien de l'api pour fournir les réponses nécéssaires à la demande du change monnaitaire.
   
 fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
 
        .then((response) => response.json())  /* demander une réponse de json*/
        .then((data) => {
            const amount = document.querySelector("#amount").value; /* le montant saisi */
            const currencyTo = document.querySelector("#currency-to").value; /* la monnaie choisie pour le change */
            const rate = data.rates[currencyTo]; /*récupérer le taux de change de la monnaie du pays séléctionné depuis l'api sous forme de tableau */

// Fonction qui va faire le calcul du change en récupérant le montant saisi et le multiplier par la monnaie du pays sélectionné.    
        // Elle se met en éxécution qu'on appuie sur le bouton  
 function convert(){   
                return amount * rate;   /* exemple: (12 euros * 20 try) */
            }

 // Afficher le message résultat, en récupérant l'id pour montant saisi + la devise  (équivalent à)  le montant et la devise du pays qu'on cherche, 
//  ici c'est pour Istanbul (TRY). toujours en faisant appel à l'id {currencyTo}
            document.querySelector(".display-result").innerHTML = `${amount} ${base.toUpperCase()} équivalent à ${convert().toFixed(2)} ${currencyTo}`;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
        return false;
}