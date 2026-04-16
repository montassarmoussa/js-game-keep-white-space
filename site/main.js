const lettres = document.querySelectorAll('.lettre');
const lettres2 = document.querySelectorAll('.lettre2');

console.log(lettres);

const coulleurs = ['#fed1b0', '#ee1c25', '#0065b3','#1dc687','#894c2f',]
const coulleurs2 = ['#fed1b0', '#ee1c25', '#0065b3','#1dc687','#894c2f',]


const couleurAleatoire = coulleurs[Math.floor(Math.random() * coulleurs.length)];
const couleurAleatoire2 = coulleurs2[Math.floor(Math.random() * coulleurs2.length)];



lettres.forEach((lettre, index) => {
    lettre.style.color = couleurAleatoire[index];
});

setInterval(() => {
    const couleurMelange = [...coulleurs].sort(() => Math.random() - 0.5);
    lettres.forEach((lettre, index) => {
        lettre.style.color = couleurMelange[index];
    });
}, 300);

setInterval(() => {
    const couleurMelange = [...coulleurs2].sort(() => Math.random() - 0.5);
    lettres2.forEach((lettre, index) => {
        lettre.style.color = couleurMelange[index];
    });
}, 300);


const btnJouer = document.getElementById('btn-jouer');
  const btnFermer = document.getElementById('btn-fermer');                                               
  const modal = document.getElementById('modal-jeu');
  const iframe = document.getElementById('iframe-jeu');
                                                                                                         
btnJouer.addEventListener('click', () => {
    iframe.src = 'KeepWhiteSpace/index.html';
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    iframe.addEventListener('load', () => {
      iframe.focus();
    });
  });

  btnFermer.addEventListener('click', () => {
    modal.classList.add('hidden');
    iframe.src = '';
    document.body.style.overflow = 'auto';
  });

const audio = document.getElementById('audio');
  audio.src = "src/audio/DonkeyKongCountry.mp3";

  function toggle() {
    audio.paused ? audio.play() : audio.pause();
  }                                                                                                      
   
  audio.addEventListener('play', () => playBtn.textContent = '⏸');                                       
  audio.addEventListener('pause', () => playBtn.textContent = '▶');
