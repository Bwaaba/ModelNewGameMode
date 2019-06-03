const electron = require('electron');
const url = require('url');
const path = require('path');
const {app,BrowserWindow,Menu,ipcMain,dialog}=electron;

let mainWindow; 
let addWindow;


app.on('ready',function(){

    // créer la fenêtre la charge
    mainWindow = new BrowserWindow({});

    // charge le fichier html dans  la fenêtre
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'configrules.html'),
        protocol:'file:',
        slashes:true
    }));

    // si cette fenêtre est fermé alors ferme aussi les autres
    mainWindow.on('closed',function(){
        app.quit();
    })

    mainWindow.on('close',function(){
        console.log("mainwindow se ferme");
    });

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
 
   mainWindow.setMenu(mainMenu);
});

function createAddWindow(){
      // créer la fenêtre la charge
      addWindow = new BrowserWindow({});
    
        console.log("new window");

      // charge le fichier html dans  la fenêtre
      addWindow.loadURL(url.format({
          pathname:path.join(__dirname,'ConfigJeu.html'),
          protocol:'file:',
          slashes:true
      }));
  
      //garbage collection
      addWindow.on('close',function(){
        addWindow = null;
      });
}


// Catch item:add
ipcMain.on('item:add', function(e, item){
    console.log(item);
    mainWindow.webContents.send('item:add', item);
    addWindow.close(); 
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
    //addWindow = null;
  });
const mainMenuTemplate = [
    {
        label:'menu',
        submenu:[
            {
                label:'Quit',
                accelerator: process.platform == 'darwin'?'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }

            },
            {
                label:'Clear Items',
                click(){
                  mainWindow.webContents.send('item:clear');
                }
              },
            {
                label:'New game',
                click(){
                    createAddWindow();
                }
            }
            
        ]
    }
];


// agencement d'un menu propre sous MAC sinon petit décalage
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Dev Tools',
        submenu:[
            {
                label:'dev tools',
                accelerator: process.platform == 'darwin'?'Command+I':'Ctrl+I',
               
                click(item,focusedwindow){
                    focusedwindow.toggleDevTools();
                }
            },
            {
    
                
                role:'reload'
            }
        ]
        
    });
   
}


// creation de fonction par url
function openWindowByUrl(urlpage,mymenu){// urlpage n'est pas le chemin absolue mais relatif au dossier

    addWindow = new BrowserWindow({});
    
    console.log("new window");

  // charge le fichier html dans  la fenêtre
  addWindow.loadURL(url.format({
      pathname:path.join(__dirname,urlpage),
      protocol:'file:',
      slashes:true
  }));

/*if(mymenu !== null){
  const Wmenu = Menu.buildFromTemplate(mymenu)
 
  addWindow.setMenu(Wmenu);
}
else*/

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  addWindow.setMenu(null);



  //garbage collection
  addWindow.on('close',function(){
    addWindow = null;
  });
}

//catch askfileload
ipcMain.on('askfile-load',function(event){
    console.log("askfile-load");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('repfileload',savePath);
});

//catch askFRule
ipcMain.on('askFRule',function(event){
    console.log("askFRule");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('SFRulep',savePath);
});


//catch askFOperators
ipcMain.on('askFOperators',function(event){
    console.log("askFOperators");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('SFOperatorsp',savePath);
});

//catch askFGraphics
ipcMain.on('askFGraphics',function(event){
    console.log("askFGraphics");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('SFGraphicsp',savePath);
});

//catch askFCustomrules
ipcMain.on('askFCustomrules',function(event){
    console.log("askFCustomrules");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('SFCustomrulesp',savePath);
    event.BrowserWindow.loadURL()
});

// catch askSave
ipcMain.on('askSave',function(event){
    console.log("askSave");
    const savePath = dialog.showOpenDialog(null);
    console.log(savePath);
    if(savePath !== undefined)
    event.sender.send('Savepath',savePath);
});
// catch newGame
ipcMain.on('newGame',function(){
    console.log("try newgame window");
   openWindowByUrl('configrules.html',null);
});

// catch validation-ask
ipcMain.on('validation-ask',function(){
    console.log("valid ask");
    BrowserWindow.getFocusedWindow().loadURL(url.format({
        pathname:path.join(__dirname,'partie.html'),
        protocol:'file:',
        slashes:true
    }));
});


