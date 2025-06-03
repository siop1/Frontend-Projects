const MAX_CHARACTERS=100;

const textContainerElem=document.getElementById('text-container');
const totalCharactersElem=document.getElementById('total-characters');
const remainingCharactersElem=document.getElementById('remaining-characters');

remainingCharactersElem.innerText=MAX_CHARACTERS;
textContainerElem.maxLength=MAX_CHARACTERS;

function updateData(){
    let totalCharacters=textContainerElem.value.length;
    totalCharactersElem.innerText=totalCharacters;
    remainingCharactersElem.innerText=MAX_CHARACTERS-totalCharacters;
}
textContainerElem.addEventListener('keyup',updateData);