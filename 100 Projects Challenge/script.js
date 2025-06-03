const notesContainerElem=document.getElementById('notes-container');
const addNoteBtnElem=document.getElementById('add-note-btn');


addNoteBtnElem.addEventListener('click',()=>{
    let textAreaElem=document.createElement('textarea');
    textAreaElem.placeholder='Empty Note';
    notesContainerElem.prepend(textAreaElem);
})

