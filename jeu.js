const electron = require('electron');
      const {ipcRenderer} = electron;
      
     
    // detection des clicks boutton avec injection du contenu dans le champ (recuperation de la valeur par le main process)
      document.querySelector('form#frule button').addEventListener('click',function(){
        ipcRenderer.send('askFGraphics');
      });

     ipcRenderer.on('SFRulep',function(event,arg){
        document.getElementById("rulefile").value = arg;
     });
    
   

      document.querySelector('form#fgraphics button').addEventListener('click',function(){
        ipcRenderer.send('askFGraphics');
      });

      ipcRenderer.on('SFGraphicsp',function(event,arg){
         document.getElementById("graphicsfile").value = arg;
      });

      document.querySelector('form#foperators button').addEventListener('click',function(){
        ipcRenderer.send('askFOperators');
      });

      ipcRenderer.on('SFOperatorsp',function(event,arg){
         document.getElementById("operatorsfile").value = arg;
      });

      document.querySelector('form#fcustomrules button').addEventListener('click',function(){
        ipcRenderer.send('askFCustomrules');
      });

      ipcRenderer.on('SFCustomrulesp',function(event,arg){
         document.getElementById("customrulesfile").value = arg;
      });

     document.querySelector('div#div-save button').addEventListener('click',function(){
      ipcRenderer.send('askSave');
    });

    ipcRenderer.on('Savepath',function(event,arg){
      document.getElementById("savedFile").value = arg;
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

      document.getElementById("validation").addEventListener('click',function(){
          ipcRenderer.send('validation-ask');
      });
