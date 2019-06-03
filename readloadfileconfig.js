const electron = require('electron');
      const {ipcRenderer} = electron;
      
     
    // detection des clicks boutton avec injection du contenu dans le champ (recuperation de la valeur par le main process)
      document.querySelector('button#askfile-load').addEventListener('click',function(){
        ipcRenderer.send('askfile-load');
        document.getElementById("areafile").value = 'coucou';
        document.querySelector('textarea#areafile').value = 'salut';
        window.location.reload();
      });


      document.querySelector('button#askfile-save').addEventListener('click',function(){
        ipcRenderer.send('askfile');
      });
     ipcRenderer.on('repfilesave',function(event,arg){
        document.getElementById("rulefile").value = arg;
     });

     ipcRenderer.on('repfileload',function(event,arg){
        document.getElementById("areafile").value = 'coucou';
     });
    
   

    
    


      document.querySelector('#btn-save').addEventListener('click',function(){
        let myelt = document.getElementById("div-save");
         if( myelt.style.display == "none"){
          ShowElement(myelt,"block");
          document.getElementById("btn-save").textContent = "No Save";
         } 
          else{
            HideElement(myelt);
            document.getElementById("btn-save").textContent = "Use a save";
          }
            
      });


      function HideElement(elt){
        elt.style.display = "none";
      }

      function ShowElement(elt,way){
        elt.style.display = way;
      }

      
