/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

function validerNom(nom) {
    if (nom.length < 2) {
     throw new Error("Le champ nom est trop court")
    }
 }
 
function validerEmail(email) {
    let nomRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!nomRegExp.test(email)) {
        throw new Error("Le champ email est invalide")
    }
}

function afficherMessageErreur(erreur) {
    
    let spanErreurMessage = document.getElementById("erreurMessage")

    if (!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage" 
                              
        popup.append(spanErreurMessage)
    } 

    spanErreurMessage.innerText = erreur 
}
 
function gererFormulaire (scoreEmail) {
        try {
            let nom = document.getElementById("nom").value
            validerNom(nom)

            let email = document.getElementById("email").value
            validerEmail(email)

            afficherMessageErreur("")

            afficherEmail(nom, email, scoreEmail)

        } catch (erreur) {
            let messageErreur = erreur.message
            console.log(messageErreur)
            afficherMessageErreur(messageErreur)
        }
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

    //Gestion de l'évènement Submit sur le formulaire de partage
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`

        gererFormulaire(scoreEmail)
    })    
        

    afficherResultat(score, i)
}

try {
    let recettes = 500
    let nbPlaceVendue = 50
    let prixPlace = nbPlaceVendue / recettes
    console.log(placePrix)
} catch (erreur) {
    console.log("Une erreur est survenue");
}

/*
const form = document.querySelector('form');

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();

    // On fait la vérification.
    const baliseNom = document.getElementById('nom');
    const valeurNom = baliseNom.value;
    if (valeurNom.trim() === "") {
        console.log('Le champ nom est vide');
    } else {
        console.log('Le champ nom est rempli');
    }
});
*/

/*
const baliseNom = document.getElementById('nom');
baliseNom.addEventListener('input', (event) => {
    const valeurNom = event.target.value;
    if (valeurNom.trim() === "") {
        console.log('Le champ nom est vide');
    } else {
        console.log('Le champ nom est rempli');
    }
});
*/

/*
function afficherResultat(score,totalPropositions) {
    let spanScore = document.querySelector(".zoneScore span")
    let affichageScore = ` ${score} / ${totalPropositions}` 
    // console.log(affichageScore)
    spanScore.innerText = affichageScore
    // console.log(spanScore)
}

//----- ANCIENNE VERISION DE LA FONCTION AFFICHERRESULTAT -----
//function afficherResultat(score,totalPropositions) {
//    console.log( 'Votre score est de ' + score + ' sur ' + totalPropositions)
//}

// ----- FONCTION INUTILE POUR FINALISER LE PROJET -----
//function choisirPhrasesOuMots() {
//    let choixListe = prompt ('Souhaitez-vous saisir des mots ou des phrases')
//    while (choixListe !== 'mots' && choixListe !== 'phrases'){
//        choixListe = prompt ('Souhaitez-vous saisir des mots ou des phrases')
//    }
//    return choixListe
//}
 
// ----- FONCTION INUTILE POUR LE MOMENT DANS LE PROJET -----
//function lancerBoucleDeJeu(listePropositions) {
//    let score = 0
//    let i = 0
//        while (i < listePropositions.length){
//            let motUtilisateur = prompt('Entrez le mot : ' + listePropositions[i])
//            if (motUtilisateur === listePropositions[i]) {
//                score++
//            }
//            i++
//        } 
//    return score
//}

function afficherProposition (proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerHTML = proposition
}

function lancerJeu() {
    // ----- INITIALISATION -----
    //let choixListe = choisirPhrasesOuMots()  
    let score = 0
    let totalPropositions = 0
    let i = 0
    let listeProposition = listeMots

    let listeBtnRadio = document.querySelectorAll('input[type="radio"]')
        
    for(let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event)=> {
            console.log(event.target.value)
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                listeProposition = listePhrases
            }
            afficherProposition(listeProposition[i])
        }) 
    }

    let btnValiderMot = document.getElementById("btnValiderMot") 
    let inputEcriture = document.getElementById("inputEcriture")

    afficherProposition(listeProposition[i])
    btnValiderMot.addEventListener ("click", ()=> {
        if (listeProposition[i] === inputEcriture.value) {
            score++
            totalPropositions++
        } else {
            totalPropositions++
        }
        afficherResultat(score,totalPropositions)  
         
        i++

        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini!")
            btnValiderMot.disabled = true
        } else {    
            afficherProposition(listeProposition[i])    
        }
        inputEcriture.value = ""
        })


    //if (choixListe === "mots") {
    //    score = lancerBoucleDeJeu(listeMots)
    //    totalPropositions = listeMots.length
    //} 
    // ------ EN ATTENTE -----
    //else {
    //    score = lancerBoucleDeJeu(listePhrases)
    //    totalPropositions = listePhrases.length
    //}

    afficherResultat(score,totalPropositions)    
}

*/



//-----------------------------------------------------------------------------

//document.addEventListener('keypress', (event) => {
//    console.log(event.key);
//});

//-----------------------------------------------------------------------------

//let monBouton = document.getElementById("btnValiderMot")
//monBouton.addEventListener("click",() => {
//    let body = document.querySelector("body")
//    body.style.backgroundColor = "red"
//})

//-----------------------------------------------------------------------------

//let listeInputRadio = document.querySelectorAll(".zoneChoix input");
//console.log(listeInputRadio);

//for (let i = 0; i < listeInputRadio.length; i++) {
//    console.log(listeInputRadio[i]);
//}

//-----------------------------------------------------------------------------

//let baliseZonePropositionSpan = document.querySelector("#zoneProposition span");
//console.log(baliseZonePropositionSpan);

//let baliseZoneProposition = document.getElementById("zoneProposition")
//console.log(baliseZoneProposition)
//console.log(baliseZoneProposition.clientHeight)

//-----------------------------------------------------------------------------

//function afficherResultat (score,totalPropositions) {
//    let message = "Votre score est de " + score + " sur " + totalPropositions
//    console.log(message)
//    return message
//}

//function choisirPhrasesOuMots () {
//    let choixListe = prompt ("Souhaitez-vous saisir des mots ou des phrases")
//    return choixListe
//}
 
//let choixUtilisateur = choisirPhrasesOuMots ()

//while (choixUtilisateur !== "mots" && choixUtilisateur !== "phrases"){
//   choisirPhrasesOuMots ()
//   choixUtilisateur =  choisirPhrasesOuMots ()
//}

//let score = 0
//if (choixUtilisateur === "mots") {
//        let i = 0
//        while (i < listeMots.length){
//            let motUtilisateur = prompt("Entrez le mot : " + listeMots[i])
//            if (motUtilisateur === listeMots[i]) {
//                score ++
//            }
//            i++
//        } 
//        let totalPropositions = listeMots.length
//        afficherResultat(score,totalPropositions)
//    } else {
//        let i = 0
//        while (i < listePhrases.length){
//            let phraseUtilisateur = prompt("Entrez la phrase : " + listePhrases[i])
//            if (phraseUtilisateur === listePhrases[i]) {
//                score ++
//            }
//            i++
//        } 
//        let totalPropositions = listePhrases.length
//        afficherResultat(score,totalPropositions)
//        }

//-----------------------------------------------------------------------------

//const listeMots = ["Cachalot","Pétunia","Serviette"]
//const listePhrases = ["Pas de panique !","La vie, l’univers et le reste","Merci pour le poisson","Allez, arrête !!"]

//let choixListe = prompt ("Souhaitez-vous saisir des mots ou des phrases")

//while (choixListe !== "mots" && choixListe !== "phrases"){
//    choixListe = prompt ("Souhaitez-vous saisir des mots ou des phrases")
//}

//let score = 0

//if (choixListe === "mots") {
//    let i = 0
//    while (i < listeMots.length){
//        let motUtilisateur = prompt("Entrez le mot : " + listeMots[i])
//        if (motUtilisateur === listeMots[i]) {
//            score ++
//        }
//        i++
//    } 
//    console.log("Votre score est de " + score + " sur " + listeMots.length)
//} else {
//    let i = 0
//    while (i < listePhrases.length){
//        let phraseUtilisateur = prompt("Entrez la phrase : " + listePhrases[i])
//        if (phraseUtilisateur === listePhrases[i]) {
//            score ++
//        }
//        i++
//    } 
//    console.log("Votre score est de " + score + " sur " + listePhrases.length)
//    }

//-----------------------------------------------------------------------------

//const listeMots = ["Cachalot","Pétunia","Serviette"]
//let score = 0
//
//let i = 0
//while (i < listeMots.length){
//    let motUtilisateur = prompt("Entrez le mot : " + listeMots[i])
//    if (motUtilisateur === listeMots[i]) {
//        score ++
//    }
//    i++
//}

//console.log("Votre score est de " + score + " sur " + listeMots.length)

//-----------------------------------------------------------------------------

//const listeMots = ["Cachalot","Pétunia","Serviette"]
//let score = 0
//let motUtilisateur = prompt("Entrez le mot : " + listeMots[0])
//if (motUtilisateur === listeMots[0]) {
//    score += 1
//}
//console.log(score)

//motUtilisateur = prompt("Entrez le mot : " + listeMots[1])
//if (motUtilisateur === listeMots[1]) {
//    score ++
//}
//console.log(score)

//motUtilisateur = prompt("Entrez le mot : " + listeMots[2])
//if (motUtilisateur === listeMots[2]) {
//    score ++
//}
//console.log(score)

// Affichage du score de l'utilisateur
//console.log("Votre score est de " + score + " sur 3")

//-----------------------------------------------------------------------------

//const motApplication = "Bonjour" // Essayez de mettre un autre mot ici !
//let motUtilisateur = prompt("Entrez le mot : " + motApplication)

//switch (motUtilisateur) {
//    case motApplication:
//        console.log("Bravo !")
//        break
//    case "Gredin":
//        console.log("Restez correct !")
//        break
//    case "Mécréant":
//        console.log("Restez correct !")
//        break
//    case "Vilain":
//        console.log("Soyez gentil !")
//        break
//    default:
//        console.log("Vous avez fait une erreur de frappe.")
//}

//-----------------------------------------------------------------------------

//const motApplication = "Bonjour" // Essayez de mettre un autre mot ici !
//let motUtilisateur = prompt("Entrez le mot : " + motApplication)

//if (motUtilisateur === motApplication) {
//    console.log("Bravo !")
//} else {
//    if (motUtilisateur === "Gredin") {
//        console.log("Restez correct !")
//    } else {
//        if (motUtilisateur === "Mécréant") {
//            console.log("Restez correct !")
//        } else {
//            if (motUtilisateur === "Vilain") {
//                console.log("Soyez gentil !")
//            } else {
//                console.log("Vous avez fait une erreur de frappe.")
//            }
//        }
//    }
//}

//-----------------------------------------------------------------------------

//const motApplication = "Bonjour" // Essayez de mettre un autre mot ici !
//let motUtilisateur = prompt("Entrez le mot : " + motApplication)

//if (motUtilisateur === motApplication) {
//    console.log("Bravo !")
//} else {
//    console.log("Vous avez fait une erreur de frappe.")
//}

//-----------------------------------------------------------------------------

//let motUtilisateur = prompt("Entrez un mot :")
//console.log(motUtilisateur)

//-----------------------------------------------------------------------------

// let motTapeOk = false // Essayez de mettre false à la place de true
//if (motTapeOk) {
//    console.log("Bravo, vous avez correctement tapé le mot")
//} else {
//    console.log("Échec, le mot n'est pas correct")
//}






















