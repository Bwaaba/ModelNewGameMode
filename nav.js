const electron = require('electron');
const {ipcRenderer} = electron;


// les liens du des pages avec les evenements associés

var linkGame = document.getElementById('newGame');



linkGame.addEventListener('click',function(){
    console.log("call");
    ipcRenderer.send('newGame');
});
    



