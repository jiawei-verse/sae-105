// SONGS PLAYLIST DATA
var playIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.33301 2L12.6663 8L3.33301 14V2Z" fill="white" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`
var pauseIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.66667 2.6665H4V13.3332H6.66667V2.6665Z" fill="white"/>
<path d="M12 2.6665H9.33333V13.3332H12V2.6665Z" fill="white"/>
<path d="M6.66667 2.6665H4V13.3332H6.66667V2.6665Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 2.6665H9.33333V13.3332H12V2.6665Z" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`
var replayIcon = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_237_49)">
<path d="M0.666992 2.6668V6.6668M0.666992 6.6668H4.66699M0.666992 6.6668L3.76033 3.76013C4.68093 2.84108 5.87529 2.24611 7.16344 2.06487C8.45159 1.88364 9.76375 2.12595 10.9022 2.7553C12.0407 3.38466 12.9438 4.36696 13.4754 5.5542C14.0071 6.74143 14.1385 8.06929 13.8498 9.3377C13.5612 10.6061 12.8681 11.7464 11.8751 12.5866C10.882 13.4269 9.64282 13.9217 8.34414 13.9964C7.04545 14.0712 5.75764 13.7218 4.67476 13.001C3.59188 12.2802 2.77259 11.227 2.34033 10.0001" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_237_49">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`

var musicInfoCode =
    `
<li class='song-card' id='song-{{id}}'>
    <div class='cover'>
        <div class='audio-player'>
                <audio id='audio-{{id}}'>
                <source src='./public/songs/{{audio}}' type='audio/mpeg'>
                </audio>
                <button class='play secondary float btn' id='{{id}}'>${playIcon}Extrait</button>
            </div>
        <div class='disc-record'>
            <img class='artwork' src='./public/images/artworks/{{artwork}}' alt='{{artiste}} - {{titre}} (Album Cover)'/>
            <img class='record-overlay' src='./public/images/RecordOverlay.svg'/>
        </div>
    </div>
    <div class='song-details'>
        <h1 class='song-title'>{{titre}}</h1>
        <h3 class='song-subtitle'>{{artiste}} — <a class='inline-link' title="Afficher l'album sur Apple Music" id='album-link' href='{{album-url}}' rel='noopener noreferrer'>{{album}}</a></h3>
        <p class='desc'>{{desc}}</p>
    </div>
</li>
`;

var songCreditsCode =
    `
<li class='song-credit' id='song-{{id}}'><strong>{{artiste}} – {{titre}}</strong><br>{{credits}}</li>
`

var selectionMusicale = document.querySelector(".selection-musicale")
var credits = document.querySelector("#song-credits")
var numMusique = 0

let totalSongs;

fetch('./scripts/data.json')
    .then(response => response.json())
    .then(data => {
        totalSongs = data.length;

        data.forEach(music => {
            // console.log("Musique : "+ element)

            let currentMusicInfo = musicInfoCode;

            function updateMusicInfoCode() {
                // console.log(element.titre)

                currentMusicInfo = currentMusicInfo.replace("{{titre}}", music.titre)
                    .replace("{{titre}}", music.titre) //for Alt text
                    .replace("{{artiste}}", music.artiste)
                    .replace("{{artiste}}", music.artiste) //for Alt text
                    .replace("{{album}}", music.album)
                    .replace("{{desc}}", music.desc)
                    .replace("{{artwork}}", music.artwork)
                    .replace("{{audio}}", music.audio)
                    .replace("{{id}}", music.id) //for Song Card
                    .replace("{{album-url}}", music["album-url"]) //for Button Link
                    .replace("{{album-url}}", music["album-url"]) //for Inline Link
                    .replace("{{id}}", music.id) //for Play-button
                    .replace("{{id}}", music.id) //for Audio
            }

            // console.log(currentMusicInfo)
            updateMusicInfoCode()
            selectionMusicale.innerHTML += currentMusicInfo

            // CREDITS

            let currentSongCredits = songCreditsCode;

            function updateSongCreditsCode() {
                currentSongCredits = currentSongCredits.replace("{{artiste}}", music.artiste)
                    .replace("{{titre}}", music.titre)
                    .replace("{{credits}}", music.credits)
                    .replace("{{id}}", music.id)
            }

            updateSongCreditsCode()
            credits.innerHTML += currentSongCredits

            numMusique++ //++ est la même chose que numMusique = numMusique + 1
        })

        // AUDIO PLAYER

        const playButtons = document.querySelectorAll('.play.btn');

        playButtons.forEach(button => {
            button.addEventListener('click', function () {
                var selectedSongId = this.getAttribute('id');
                var selectedSongAudio = document.querySelector("#audio-" + selectedSongId);
                var selectedSongCover = document.querySelector(".song-card#song-" + selectedSongId + " .disc-record .artwork");
                var audios = document.querySelectorAll("audio");

                if (selectedSongAudio.paused) {
                    audios.forEach(audio => {
                        if (!audio.paused) {
                            audio.pause();
                            audio.currentTime = 0;
                            let otherAudioPlayingId = audio.getAttribute('id');
                            otherAudioPlayingId = otherAudioPlayingId.replace("audio-", "");
                            document.querySelector(".play.btn[id='" + otherAudioPlayingId + "']").innerHTML = playIcon + "Extrait";
                        }
                    });
                    selectedSongAudio.play();
                    button.innerHTML = pauseIcon + "En cours";
                } else {
                    selectedSongAudio.pause();
                    button.innerHTML = playIcon + "Extrait";
                }

                selectedSongAudio.addEventListener('play', () => {
                    selectedSongCover.style.animationPlayState = 'running';
                });

                selectedSongAudio.addEventListener('pause', () => {
                    selectedSongCover.style.animationPlayState = 'paused';
                });

                selectedSongAudio.addEventListener('ended', () => {
                    selectedSongCover.style.animationPlayState = 'paused';
                    button.innerHTML = replayIcon + "Extrait";
                });
            });
        });

        // CAROUSEL

        initializeCarousel()
    })
    .catch(error => {
        console.error("Il y a eu un problème avec la requête fetch :", error);
    });


// FORM SUBMISSION

// var champTitre = document.querySelector("#submission-title")
var champMsg = document.querySelector("#submission-msg")
var champEmail = document.querySelector("#submission-email")
// var champNom = document.querySelector("#submission-name")
// var champLien = document.querySelector("#submission-url")

var submitButton = document.querySelector("#submit")
// var baseSubmitUrl = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=pang&courriel={{email}}&message={{message}}&nom={{nom}}&titre={{titre}}&lien={{lien}}"
var baseSubmitUrl = "https://perso-etudiant.u-pem.fr/~gambette/portrait/api.php?format=json&login=pang&courriel={{email}}&message={{message}}"

submitButton.addEventListener('click', function (event) {
    // Empêche la soumission du formulaire par défaut
    event.preventDefault();

    // Vérifiez si les champs sont remplis
    if (champEmail.value.trim() === "") {
        alert("Veuillez renseigner une adresse-mail.");
        champEmail.focus(); // Met le focus sur le champ email
        return; // Arrête l'exécution si le champ n'est pas rempli
    }

    if (champMsg.value.trim() === "") {
        alert("Veuillez renseigner un message.");
        champMsg.focus(); // Met le focus sur le champ message
        return; // Arrête l'exécution si le champ n'est pas rempli
    }
    submitForm();
});

// Fonction pour soumettre le formulaire
function submitForm() {
    let submitUrl = baseSubmitUrl;

    function updateFormSubmitUrl() {
        // console.log(element.titre)

        submitUrl = submitUrl.replace("{{email}}", champEmail.value)
            .replace("{{message}}", champMsg.value)
            .replace("{{nom}}", champNom.value)
            .replace("{{titre}}", champTitre.value)
            .replace("{{lien}}", champLien.value)
    }

    

    updateFormSubmitUrl()

    fetch(submitUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log("Réponse reçue : ", data);
            alert("Votre suggestion a bien été reçue.");
        })
        .catch(error => {
            console.error("Il y a eu un problème avec la requête fetch :", error);
        });
}

//NAVIGATION

// Carousel

function initializeCarousel() {
    let currSlideId = 0;
    const slidesContainer = document.querySelector(".selection-musicale");
    const songSlides = document.querySelectorAll(".song-card");
    const prevButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");

    function loadCarr() {
        songSlides[currSlideId].classList.add('active');
        songSlides[currSlideId].style.transform = 'none';
        songSlides[currSlideId].style.zIndex = 1;

        const activeCardSpacing = 130;  // Escpacements pour les cartes adjacentes à l'active
        const baseSpacing = 125;        // Espacements de base pour les cartes
        const spacingIncrement = 50;    // Incrément d'espacement entre les cartes as they get plus loin de la carte active pour assurer un espace égal entre les cartes

        let numSlide = 0;

        // Transform les slides droite
        for (let num = currSlideId + 1; num < songSlides.length; num++) { //Boucle qui continue pour de la slide actuelle jusqu'à la fin de songSlides
            numSlide++;
            let spacing = numSlide === 1 ? activeCardSpacing : baseSpacing + (numSlide - 1) * spacingIncrement; //Espace entre les slides
            // "===" est un opérateur d'égalité stricte qui vérifie si les deux valeurs sont égales et de même type.
            // "?" est un opérateur d'interrogation qui permet de simplifier une instruction if else en une seule ligne (condition ? instruction si vrai : instruction si faux)
            songSlides[num].style.transform = `translateX(${spacing}%) scale(.8) perspective(16px) rotatey(-1deg)`; //${expression} permet d'insérer une expression JS dans une chaine de caractère sans avoir à concaténer (bla bla + expression + bla bla)
            songSlides[num].style.zIndex = -numSlide;
        }

        // Transform les slides gauche
        numSlide = 0;
        for (let num = currSlideId - 1; num >= 0; num--) {
            numSlide++; //Boucle qui continue pour de la slide actuelle jusqu'au début de songSlides
            let spacing = numSlide === 1 ? activeCardSpacing : baseSpacing + (numSlide - 1) * spacingIncrement;
            songSlides[num].style.transform = `translateX(${-spacing}%) scale(.8) perspective(16px) rotatey(1deg)`;
            songSlides[num].style.zIndex = -numSlide;
        }

        // Cacher les flèches quand on est aux extremités

        if (currSlideId === 0) {
            prevButton.style.opacity = 0
            prevButton.style.pointerEvents = "none"
        } else {
            prevButton.style.opacity = 1
            prevButton.style.pointerEvents = "auto"
        }

        if (currSlideId === totalSongs - 1) {
            nextButton.style.opacity = 0
            nextButton.style.pointerEvents = "none"
        } else {
            nextButton.style.opacity = 1
            nextButton.style.pointerEvents = "auto"
        }

        console.log(currSlideId)
    }

    loadCarr();

    // Arrow Navigation

    nextButton.addEventListener('click', function () {
        currSlideId = currSlideId + 1 < songSlides.length ? currSlideId + 1 : currSlideId;
        loadCarr();
        songSlides[currSlideId - 1].classList.remove('active');
        songSlides[currSlideId].classList.add('active');
    });

    prevButton.addEventListener('click', function () {
        currSlideId = currSlideId - 1 >= 0 ? currSlideId - 1 : currSlideId;
        loadCarr();
        songSlides[currSlideId + 1].classList.remove('active');
        songSlides[currSlideId].classList.add('active');
    });
}

// Open submission form

var formModal = document.querySelector("#submission")
var openFormButton = document.querySelector("#open-form")
var closeFormButton = document.querySelector("#close-form")

function openForm() {
    formModal.classList.add('active');
    formModal.style.display = "flex";
    setTimeout(() => { document.querySelector("#submission .modal").classList.add('active') }, 10);
}

function closeForm() {
    formModal.classList.remove('active');
    formModal.style.display = "none";
    document.querySelector("#submission .modal").classList.remove('active');
}

openFormButton.addEventListener('click', openForm)
closeFormButton.addEventListener('click', closeForm)

// Open Credits

var creditsModal = document.querySelector("#credits")
var openCreditsButton = document.querySelector("#open-credits")
var closeCreditsButton = document.querySelector("#close-credits")

function openCredits() {
    creditsModal.classList.add('active');
    creditsModal.style.display = "flex";
    setTimeout(() => { document.querySelector("#credits .modal").classList.add('active') }, 10);

}

function closeCredits() {
    creditsModal.classList.remove('active');
    creditsModal.style.display = "none";
    document.querySelector("#credits .modal").classList.remove('active');
}

openCreditsButton.addEventListener('click', openCredits)
closeCreditsButton.addEventListener('click', closeCredits)

