//@target illustrator
//@targetengine ScriptLauncher
//@strict on



/// author: aivaras gontis 2021
/// www.illustratorscripts.com
/// MIT LICENSE 


//Cudos to Jongware, Silly-V, and Carlos for all inspiration and examples!!!

(function (){


  var HALP={
    title:"                               Huge library of free scripts - www.illustratorScripts.com                      ",
    rightClickLaunchShort:" You can launch this window by\n right clicking on main window.",
    colorUpdate:"Main tree view will update colors \nonly when you close shortcut window.",
    removeShortcut:"Press any 2 letter keys simultaneously to remove shortcut.",
    multiselect:"You can SHIFT and CTR select several tree items.",
    enableLabels:"You probably want to enable color labels in settings.",
    search:"   Filter scripts here..  ",
    navigateAway: "Navigate away to save. "


  }
  HALP.navigateAway+=HALP.removeShortcut;

  
  const VERSION = 0.4
  const APP_VERSION = parseInt(app.version.split(/\./)[0]);
  const FILE_URL = File($.fileName);
  const FOLDER_URL = Folder(FILE_URL.path);




  function ScriptItem(fileName,folderName,fullPath,shortcut,color){
    this.fileName=fileName;
    this.folderName=folderName;
    this.fullPath=fullPath;
    this.shortcut=shortcut||"";
    this.color=color||""; 
    this.cachedScript="";
  }
   ScriptItem.prototype.importSettings=function(savedScriptItem){
     for(var s in savedScriptItem){
       this[s]=savedScriptItem[s]
     }
   }

   //updates data item by script's data
   ScriptItem.prototype.populate=function(ditem){
     //returns estimated rendered string w by hardcoded char width arr.
     //.. experimental
     function getStringWidth(s){
       var a=[3.8,3.8,4.49,7.59,7.59,8.03,8.37,2.75,3.91,3.91,5.79,9.54,3.8,6.95,3.8,6.3,7.59,7.59,7.59,7.59,7.59,7.59,7.59,7.59,7.59,7.59,3.8,3.8,9.54,9.54,9.54,5.07,10.31,8.28,6.91,8.31,8.99,6.51,6.44,8.68,8.82,3.46,3.74,7.84,6.4,10.34,8.87,9.33,6.64,9.33,7.59,6.47,7.59,8.32,7.85,10.27,7.52,7.48,7.26,3.91,6.3,3.91,7.59,6,7.38,6.63,7.56,6.15,7.56,6.69,4.23,7.49,7.45,3.47,3.66,7.02,3.47,11.21,7.45,7.38,7.56,7.56,4.92,6.12,4.49,7.45,6.22,9.25,7.36,6.27,6.88,3.91,4.49,3.91,7.59];
       var len=0
       for (var i=0,l=s.length;i<l;i++){
           //trace(s.charCodeAt(i));
           var charWidth=a[s.charCodeAt(i)-32];
           charWidth=charWidth? charWidth : 7;
           len+=charWidth;
       }
       return len;
     }


    //trace("populate::this.fileName<",this.fileName+">")
    //trace("populate::color",this.color)
    if(this.color){
      ditem.image=IMAGES.dots[this.color];
      var tab="\t"
    }else{
      var tab="\t  "
      ditem.image=null;
    }
    //trace("populate::NAME<",name+">")

    if (this.shortcut) {
    	var name = this.fileName;
    	name = trimToChars(name, 20);
    	var w = getStringWidth(name);
    	var d = 180 - w;
    	//space's width is 3.8
    	var c = Math.round(d / 3.8);
    	name += multiplyString(c, " ") + tab + this.shortcut;

    	ditem.text = name;
    } else
    	ditem.text = this.fileName;

    ditem.script = this;

    //trace("populate end?")
   }

   ScriptItem.prototype.execute = function() {
     trace("EXEC",this.fullPath)

     function executeScript(file) {

       function BTEncode(txt) {
         return encodeURIComponent(txt).replace(/\r/, "%0d").replace(/\n/, "%0a").replace(/\\/, "%5c").replace(/'/g, "%27").replace(/"/g, "%22")
       };
       file.open('r') ;
       var scriptString = file.read();
       file.close();
       var bt = new BridgeTalk();
       bt.target = 'illustrator-' + APP_VERSION;
       if (extractExtention(file.name) == "jsxbin")
         bt.body = scriptString;
       else {
         //consider expanding this to deal with unordhodox scripts approaches:::::::::::::::::
         scriptString = scriptString.replaceAll(escapeRegExp("$.fileName"), "('" + file + "')")
         var message = "var btCoded ='" + BTEncode(scriptString) + "';\neval(decodeURI( btCoded ));\n";
         bt.body = message;
       }
       bt.onError = function(errObj) {
         alert("ERROR " + errObj.body);
       }
       bt.onResult = function(a) {
         $.SCRIPT_LAUNCHER.onScriptExecuted(a);
       }
       bt.send();
     };
     executeScript(File(this.fullPath))
   }

   //////////////////////////////////////////

  function Scripts(settings){
    this.lastActiveTreeItem;
    this.settings=settings;
    this.shortcuts={};

    //{folderName:[ScripItem(),ScripItem()]}
    this.collection={}

    this.collectFromDisk();
    if(settings.scripts)
      this.importSettings(settings.scripts)

  }
  Scripts.prototype.collectFromDisk=function(){
    var that=this;

    //function readTextFile(fileURL) {
    function readTextFile(file) {
      //var file = File(fileURL);
      var stringArray = [];
      
      if (file.exists) {
          file.open("r");
          while (!file.eof) {
              var line = file.readln();
              stringArray.push(line);
          }
          file.close();
      } else {
          alert("File not found: " + fileURL);
      }
      
      return stringArray;
    }

    function createFolders(folderURLs) {
      var folderArray = [];
      
      for (var i = 0; i < folderURLs.length; i++) {

          var folder = folderURLs[i] == ".." ? new Folder(FOLDER_URL.parent) : new Folder(folderURLs[i]);
          if (folder.exists) {
            folderArray.push(folder);
          }
          
      }
      
      return folderArray;
    }

    function foldersIn(folder) {
      return Folder(folder).getFiles(function(f) {
        //trace(f,f instanceof Folder,f.alias);
        // !!!!!!!!!!!!!! Illustrator bug, does not work in 24
        if(f.alias){

          f= f.resolve();

        }
        return f instanceof Folder
      });
    };

    function scriptsIn(folder) {
      var files = Folder(folder).getFiles(function(f) {
        if (f instanceof File) {
          var ext = extractExtention(f.name);
          return (ext === "js") || (ext === "jsx") || (ext === "jsxbin")
        }
        return false
      });
      var o = {};
      var l = files.length;
      if(l==0)return null
      for (var i = 0; i < l; i++) {
        var file = files[i];
        if(file.alias){
          file=file.resolve();
        }  
        o[decodeURI(file.name)] = new ScriptItem(decodeURI(file.name), decodeURI(folder.name), decodeURI(file.fsName));
      }
      return o;
    };
    var folders = foldersIn(FOLDER_URL);

    //add folders defined in text file
    var foldersTXT=new File(FOLDER_URL+"/folders.txt")
    var foldersInTXT;
    if(foldersTXT.exists){
      try{
        var a=readTextFile(foldersTXT);
        foldersInTXT=createFolders(a)
      } catch (e){
        trace(e)
      } 
    }
    folders=folders.concat(foldersInTXT);
    //add root folder as 1st item
    folders.unshift(FOLDER_URL);
    //extract scripts from all folders 1 deep
    var l = folders.length;
    for (var i = 0; i < l; i++) {
      folder = folders[i];
      var scripts=scriptsIn(folder);
      if(scripts)
        this.collection[decodeURI(folder.name)]=scripts;
    }
  }
  Scripts.prototype.buildData=function(parent,main){
    var data=[];
    var item,node,file,folder;
    var that=this;
    var dataItem, script;
    // function addItemNode(script){
    //   item=node.add("item",script.fileName);
    //   script.populate(item);
    // }
    //:::::::::: ????decodeURI(FOLDER_URL
    //we make root first directory in list
    var root=this.collection[decodeURI(FOLDER_URL.name)];
    node={text:decodeURI(FOLDER_URL.name),_items:[],_expanded:true}
    data.push(node);
    //...tipo galejau su esamu tree componentu dirbt, jee butumem ji perpiese..
    for(file in root){
      dataItem={};
      script=root[file];
      script.populate(dataItem);
      node._items.push(dataItem)
    }
    //..remaining dirs
    for(folder in this.collection){
      if (this.collection[folder]===root) continue;
      node={text:folder,_items:[],_expanded:false}
      data.push(node)
      for(file in this.collection[folder]){
        dataItem={};
        script=this.collection[folder][file];
        script.populate(dataItem);
        node._items.push(dataItem)

      }
    }
    return data
  }
  Scripts.prototype.draw=function(parent,main){
    var data=this.buildData();
    //trace("###########",parent.window.children[1])
    return this.tree=new Tree(parent,data,parent.window.children[1],{USE_IMAGES:main.settings.useColors});
  }
  Scripts.prototype.redraw=function(tree){
    var data=this.buildData();
    this.tree=tree;
    this.tree.draw(data)
    return data

  }
  Scripts.prototype.importSettings=function(savedScriptData){
    var script
    for(folder in savedScriptData){
      for(file in savedScriptData[folder]){
        ///::::?????? = ????? wtf??!
        if(this.collection[folder]&&this.collection[folder][file]){
          script=this.collection[folder][file];
          ///::::::::::;;trace(script)
          script.importSettings(savedScriptData[folder][file]);
          if(script.shortcut){
            //trace("this.shortcuts[",script.shortcut,"]",script.fileName)
            this.shortcuts[script.shortcut]=script
          }
        }
      }
    }
  }
  Scripts.prototype.getDataItemBy=function(d,script){
    var result=null
    function findItem(data, item) {
      //trace("getDataItemBy>>",data,item)
      var branches = data._items;
      for (var i = 0; i < branches.length; i++) {
        if (branches[i]._items) {
          findItem(branches[i], item);
        } else if (branches[i].script === item) {
          result= branches[i]
        }
      }
    }
    findItem({_items:d},script)
    return result;
  }

  function Settings(settingsFileName){

    this.oneClickOperation=false;
    this.searchBarFocus=true;
    this.artBoardFocus=true;
    this.useColors=true;

    this.settingsFileURL=""+Folder.myDocuments + "/"+settingsFileName;
    this.positionW=[800,200];
    this.scripts={};
    
    this.load()
    
  }
  //updates all nooks and cranies by settings
  Settings.prototype.update=function(main){
    if(this.oneClickOperation)
        main.tree.list.selection=null;

    main.tree.ONE_CLICK=this.oneClickOperation;

    //artBoardFocus is handled in main.onScriptExecuted
    if(main.tree.USE_IMAGES!=this.useColors){
      main.tree.USE_IMAGES=this.useColors;
      main.tree.draw()
      trace("drawing tree:::::::::::::::::")
    }

    if(this.searchBarFocus){
      main.editIsActive=true;
      main.edit.active=true;
      main.edit.text="";
    }else{
      main.editIsActive=false;
    }


  }
  Settings.prototype.load=function(){
    var file = File(this.settingsFileURL);
    if(file.exists){
      file.open('r');
      
      var data=[]
      try{
        data = JSON.parse(file.read());
      }catch (e){
        
        trace(e);
      }
      file.close();
    }
    if(data)
      for(var key in data){
        this[key]=data[key]
      }
    else {
      trace("no data");
    }
  };
  Settings.prototype.save=function(scripts,mainWindowPosition){
    var file = File(this.settingsFileURL);
    trace("saving...", this.settingsFileURL, file, file.exists)
    file.open("w");
    file.encoding = "UTF-8";

    //??
    this.scripts=scripts//._collection;
    this.windowLocation=mainWindowPosition
    
    var s=JSON.stringify(this)
    trace(s )
    file.write(s);
    
    file.close();
  };

  //:::::::::::::::::::;


  function SettingsW(main) {
    var that = this;
    this.main=main;

    this.open=false;
    this.name="Settings";

    var w = this.w = new Window("palette", this.name, undefined);this.w.preferredSize ={width:252,height:252};this.w.alignChildren = ["fill", "top"];this.w.spacing = 10;this.w.margins = 11;this.w.closeButton=true;this.w.opacity = .98;

    var checkbox1 = w.add("checkbox", undefined, undefined, {name: "checkbox1"});

        ///TODO::::: move helplines to HALP class
        checkbox1.helpTip = "This mimics button mode - you will be able to launch scripts with one click.";
        checkbox1.text = "One click operation";
        checkbox1.preferredSize.width = 220;
        checkbox1.name="c1";
        checkbox1.alignment = ["center","top"];
        checkbox1.onClick=function(){that.onChange(this)};
        checkbox1.value=this.main.settings.oneClickOperation


    var statictext1 = w.add("group");
        statictext1.orientation = "column";
        statictext1.alignChildren = ["left","center"];
        statictext1.spacing = 0;

        statictext1.add("statictext", undefined, "This mimics button mode - you will be ", {name: "statictext1"});
        statictext1.add("statictext", undefined, "able to launch scripts with one click.", {name: "statictext1"});

    var divider1 = w.add("panel", undefined, undefined, {name: "divider1"});
        divider1.alignment = "fill";

    var checkbox2 = w.add("checkbox", undefined, undefined, {name: "checkbox2"});
        checkbox2.helpTip = "Disable if you prefer using shortcuts.";
        checkbox2.text = "Focus on search bar upon start";
        checkbox2.value = this.main.settings.searchBarFocus;
        checkbox2.name="c2";
        checkbox2.preferredSize.width = 220;
        checkbox2.alignment = ["center","top"];
        checkbox2.onClick=function(){that.onChange(this)};


    var statictext2 = w.add("statictext", undefined, undefined, {name: "statictext2"});
        statictext2.text = "Disable if you prefer using shortcuts.";

    var divider2 = w.add("panel", undefined, undefined, {name: "divider2"});
        divider2.alignment = "fill";

    var checkbox3 = w.add("checkbox", undefined, undefined, {name: "checkbox3"});
        checkbox3.helpTip = "After running script focus will be returned to artboard. Useful when working with paths.";
        checkbox3.text = "Return focus to artboard";
        checkbox3.value =  this.main.settings.artBoardFocus;
        checkbox3.name="c3";
        checkbox3.preferredSize.width = 220;
        checkbox3.alignment = ["center","top"];
        checkbox3.onClick=function(){that.onChange(this)};

    var statictext3 = w.add("group");
        statictext3.orientation = "column";
        statictext3.alignChildren = ["left","center"];
        statictext3.spacing = 0;

        statictext3.add("statictext", undefined, "After running script focus will be ", {name: "statictext3"});
        statictext3.add("statictext", undefined, "returned to artboard. Usefull when ", {name: "statictext3"});
        statictext3.add("statictext", undefined, "working with paths. ", {name: "statictext3"});

    var divider3 = w.add("panel", undefined, undefined, {name: "divider3"});
        divider3.alignment = "fill";

    var checkbox4 = w.add("checkbox", undefined, undefined, {name: "checkbox4"});
        checkbox4.helpTip = "Color functionality  is .. wonky in CC, use at your own risk.";
        checkbox4.text = "Enable color labels";
        checkbox4.value =  this.main.settings.useColors;
        checkbox4.name="c4";
        checkbox4.preferredSize.width = 220;
        checkbox4.alignment = ["center","top"];
        checkbox4.onClick=function(){that.onChange(this)};

    var statictext4 = w.add("group");
        statictext4.orientation = "column";
        statictext4.alignChildren = ["left","center"];
        statictext4.spacing = 0;

        statictext4.add("statictext", undefined, "Color functionality is .. wonky in CC,", {name: "statictext4"});
        statictext4.add("statictext", undefined, "use at your own risk.", {name: "statictext4"});



    this.w.onClose = function() {
      that.close(true);
    };

    this.w.addEventListener("click", function(e) {
        that.onClick(e);
    });
  }

  SettingsW.prototype.onClick=function(e){}
  SettingsW.prototype.onChange=function(o){
    switch(parseInt(o.name.charAt(1))){
      //One click operation
      case 1: this.main.settings.oneClickOperation=o.value;
              break;
      //Focus on search bar upon start
      case 2: this.main.settings.searchBarFocus=o.value;
              break;
      //return focus to artboard
      case 3: this.main.settings.artBoardFocus=o.value
              break;
      //enable color dots
      case 4: this.main.settings.useColors=o.value;
              break;
    }
    this.main.updateSettings();
  }
  SettingsW.prototype.show = function(mainWBounds) {
    
    
    
    this.open=true;
    var xx = mainWBounds.left;
    var yy;
    //
    if(this.main.shortW.open&&Math.abs(this.main.shortW.w.bounds[1]-mainWBounds[1])<3)
       yy=this.main.shortW.w.bounds[3]
    else
      yy = mainWBounds[1];
      this.w.layout.resize();

      this.w.show();

    this.w.location = [xx - this.w.bounds.width, yy];
  }
  SettingsW.prototype.close = function(supress,supressSave) {
    this.open=false;
    if(!supressSave)
      this.main.saveSettings()
    if(!supress)
      this.w.close();
  }

  function ShortW(main) {
    var that = this;
    this.main=main;
    this.currentScript=null;
    this.currentDataItem=null;

    this.open=false;
    this.name="Add Shortcut";
    this.w = new Window("palette", this.name, undefined);this.w.preferredSize ={width:202,height:252};this.w.alignChildren = ["left", "top"];this.w.spacing = 10;this.w.margins = 11;this.w.closeButton=true;this.w.opacity = .96;

    //invisible edit box to capture keys
    var edit = this.w.add("edittext");edit.active = true;edit.visible = false;edit.characters = 0;edit.size = [0, 0];this.edit=edit;
    var panel1 = this.panel1=this.w.add("panel", undefined, "Press Key");panel1.orientation = "column";panel1.alignChildren = ["left", "top"];panel1.spacing = 10;panel1.margins = 20;
    this.removeShortcutsB =   this.w.add('button', undefined, 'Remove shortcuts'); this.removeShortcutsB.helpTip = "Remove shortcuts from selected items";
    this.removeShortcutsB.visible=false;
    this.shortcut="+";
    this.empty= "select script in main window";
    this.shortcutTF = panel1.add("statictext", undefined,this.empty);this.shortcutTF.preferredSize ={width:185,height:20}
    var panel2 = this.w.add("panel", undefined, "Color Tag");panel2.orientation = "row";panel2.alignChildren = ["left", "top"];panel2.spacing = 5;panel2.margins = 10;
    this.iconbuttons={};
    for(color in IMAGES.dots){
      var iconbutton1 = panel2.add("iconbutton", undefined, IMAGES.dots[color], {name: "iconbutton1", style: "toolbutton"});
      iconbutton1.preferredSize ={width:15,height:15};
      iconbutton1.text = "";
      this.iconbuttons[color]=iconbutton1;
    }
    this.helpTF=this.w.add("statictext", undefined,HALP.rightClickLaunchShort,{multiline:true});this.helpTF.preferredSize ={width:185,height:60}

    var gg=this.w.add("group");gg.alignChildren="right";
    addLink(gg,"open script file",function(){that.openFile()});
    addLink(gg,"open parent folder",function(){that.openFolder()})//.helpTip="Will open parent folder in Finder/File explorer";
    this.w.onClose = function() {
      that.close(true);
    }
    this.w.addEventListener("keydown", function(e) {
      that.oneKeyDown(e);
    });
    this.w.addEventListener("click", function(e) {
        that.onClick(e);
    });
    this.w.onDeactivate=function(){
      trace("short w on deactivate");
      that.shortcutTF.text=that.empty;
    }
  }
  ShortW.prototype.oneKeyDown=function(e){
    this.shortcut=this.shortcutTF.text=this.formShortcut();
    if (this.shortcut==""||(this.shortcut.length >= 1 && this.shortcut.slice(-1) != "+")) {
      var conflictingScript = this.main.scripts.shortcuts[this.shortcut]
      if (conflictingScript&&conflictingScript!=this.currentScript) {
        this.helpTF.text="Conflicts with:" +conflictingScript.fileName;
      }else{
        if(this.shortcut!="")
          this.helpTF.text=Math.random()>.5? HALP.removeShortcut:HALP.navigateAway;
        else
          this.helpTF.text=HALP.multiselect;
      }
    }

  }

  ShortW.prototype.openFile=function(){
    try{
    var ditem=this.main.tree.itemsData(this.main.tree.list.selection[0])
    // this.fileName=fileName;
    // this.folderName=folderName;
    // this.fullPath=fullPath;
    if(ditem){
      new File(ditem.script.fullPath).execute()      
    } 
    }catch(e){trace(e)} 

  }

  ShortW.prototype.openFolder=function(){
    try{

    var ditem=this.main.tree.itemsData(this.main.tree.list.selection[0])
    // this.fileName=fileName;
    // this.folderName=folderName;
    // this.fullPath=fullPath;
    if(ditem){
      new File(ditem.script.fullPath).parent.execute()
    }
  }catch(e){trace(e)}
  }

  ShortW.prototype.onClick=function(e){


    //rmeove shortcut button
    if((""+e.target.text).indexOf("Remove")>=0){
      for (var k in this.main.tree.list.selection){
        var ditem=this.main.tree.itemsData(this.main.tree.list.selection[k])
        if(ditem&&(!ditem._items)){
          trace(ditem.text)
          delete this.main.scripts.shortcuts[ditem.script.shortcut]
          trace(ditem.script.shortcut,"--")
          ditem.script.shortcut="";
          ditem.script.populate(ditem);
          this.main.tree.updateOneItem(ditem);
          this.main.w.active=true;
          this.main.tree.list.active=true;
          this.w.active=true;
        }
      }
      return;
    }

    e.target.active=true;
    if((""+e.target).indexOf("IconButton")>=0){
      this.helpTF.text=this.main.settings.useColors? HALP.colorUpdate :HALP.enableLabels;

      //hacky::: logic
      //...we have multiselection
      var c=this._getSelectedColor();
      if(!this.panel1.visible){
        this.redrawTreeOnClose=true;
        for (var k in this.main.tree.list.selection){
          var ditem=this.main.tree.itemsData(this.main.tree.list.selection[k])
          if(ditem&&(!ditem._items)){
            ditem.script.color=c;
            ditem.image= IMAGES.dots[c];
          }
        }
      }
    }
  }
  ShortW.prototype._getSelectedColor=function(){
    //get selected color
    var color = "";
    for (color in this.iconbuttons)
      if (this.iconbuttons[color].active) break;
    color = this.iconbuttons[color].active ? color : "";
    color = color == "cross" ? "" : color;
    return color;
  }

  ShortW.prototype.formShortcut=function(){
    
    ///::::::::::::::::::::::::::::::::::::
    
    
    //var meta = $.os.match('Windows') ? 'WIN' : 'Mac',
    var s= "";
    s+= ScriptUI.environment.keyboardState.metaKey ? "CMD+" : "";
    s+= ScriptUI.environment.keyboardState.ctrlKey ? "CTRL+" : "";
    s+= ScriptUI.environment.keyboardState.altKey ?  "ALT+" : "";
    s+= ScriptUI.environment.keyboardState.shiftKey ? "SHIFT+" : "";
    var keyName=ScriptUI.environment.keyboardState.keyName||"";
    return s+keyName;
  }
  ShortW.prototype.show = function(mainWBounds) {
    this.open=true;
    var xx = mainWBounds.left;

    var yy;
    //
    if(this.main.settingsW.open&&Math.abs(this.main.settingsW.w.bounds[1]-mainWBounds[1])<2)
       yy=this.main.settingsW.w.bounds[3]
    else
      yy = mainWBounds[1];

    this.w.layout.resize();
    this.w.show();
    trace("XX",xx,"preferd",this.w.preferredSize.width,"bounds:",this.w.bounds.width)
    this.w.location = [xx - this.w.bounds.width, yy];

    //this.onMainWindowSelectionChange(ScriptItem.prototype.lastActiveScript)
  }
  ShortW.prototype.close = function(supressClose,supressSave) {
    this.open=false;
    this.onTreeSelectionChange(null)
    if(!supressSave)
      this.main.saveSettings()
    if(this.redrawTreeOnClose){
      this.main.tree.draw();
      this.redrawTreeOnClose=false;
    }
    if(!supressClose)
      this.w.close();
  }

  ShortW.prototype.onTreeSelectionChange = function() {
    this.helpTF.text=HALP.rightClickLaunchShort;
    this.panel1.visible=true;
    this.removeShortcutsB.visible=false;
    //update  previously selected script
    if (this.currentScript) {
      trace("updating last selected, curscript", this.currentScript.fileName, "curitem", this.currentDataItem.text)
      if (this.currentScript.shortcut != this.shortcut) {
        //trace("this.currentScript.shortcut!=this.shortcut")
        //ignore shortcuts with + on the end(no letter pressed only CMD, etc)
        if (this.shortcut==""||(this.shortcut.length >= 1 && this.shortcut.slice(-1) != "+")) {
          //trace("is shortcut<", this.shortcut, ">")
          //check for shortcut conflicts
          var conflictingScript = this.main.scripts.shortcuts[this.shortcut]
          if (conflictingScript) {
            //trace("conflicts", conflictingScript.fileName)
            //remove existing...
            var dataItem = this.main.scripts.getDataItemBy(this.main.tree.data, conflictingScript);
            conflictingScript.shortcut = "";
            conflictingScript.populate(dataItem);
            this.main.tree.updateOneItem(dataItem);
          }
          if(this.shortcut!="")
            this.main.scripts.shortcuts[this.shortcut] = this.currentScript;
          if(this.currentScript.shortcut!="")
            delete this.main.scripts.shortcuts[this.currentScript.shortcut]
          this.currentScript.shortcut = this.shortcut;
          this.currentScript.populate(this.currentDataItem);
          this.main.tree.updateOneItem(this.currentDataItem);
        }
      }
      var color=this._getSelectedColor();
      if (color != this.currentScript.color) {
        trace("color change to", color, "from (this.currentScript.color): <", this.currentScript.color+">")
        this.currentScript.color = color;
        this.currentScript.populate(this.currentDataItem);
        //this.main.tree.draw();
        this.redrawTreeOnClose=true;
      }
    }//end previously selected script
    trace("--end prev sel script--")

    //update shortcut window from selected tree item
    var selection = this.main.tree.list.selection;
    if (selection && selection.length != 0) {
      //one item selected
      if(selection.length==1){
        var dataItem = this.main.tree.itemsData(selection[0]);

        if (dataItem && dataItem.script) {
          trace(">>setting data item AND script")
          var script = dataItem.script;
          this.currentDataItem = dataItem;
          this.currentScript = script;
          this.shortcutTF.text = script.shortcut || "";
          this.shortcut = script.shortcut || "+";
          for (var i in this.iconbuttons) this.iconbuttons[i].active = false;
          this.w.active = true;
          this.edit.active = true;
          if (script.color) {
            this.iconbuttons[script.color].active = true
          } else {
            this.iconbuttons["cross"].active = true
          }
        } else {
          this.currentScript = null
        }
          //multiple items selected
      }else{
        trace("multiple")
        this.panel1.visible=false;
        this.removeShortcutsB.visible=true;

        //check selected items colors,
        //if they have same color-mark as it, else - mark none
        var c="NONE";
        var sameColor=true;
        for (var k in this.main.tree.list.selection){
          var ditem=this.main.tree.itemsData(this.main.tree.list.selection[k])
          if(ditem.script){
            if(c=="NONE")
                c=ditem.script.color
            else {
              sameColor= sameColor &&(ditem.script.color==c);
              c=ditem.script.color
            }
          }
        }
        //trace(sameColor, c)
        c = (c=="")? "cross": c;
        if(sameColor)
          for (color in this.iconbuttons)
            if(color==c){
              this.iconbuttons[color].active=true
              this.w.active = true;
            }else
              this.iconbuttons[color].active=false
        else
          for (color in this.iconbuttons)
            this.iconbuttons[color].active=false

        this.currentDataItem = null
        this.currentScript = null;

        ////////////////////////////////////
        //multiple items  processing code is  under
        // shortw 'click' listener
        //////////////////////////////////

        //this.panel1.maximumSize.height=0;
        //this.w.layout.layout(true);

      }

    }
  }

  var PAUSE_ANIMATION=false;

  function ScriptLauncher() {
    
    var that = this;
    this.name = "ScriptLauncher"
    this.ver=VERSION;

    this.filteredData=[];
    this.dataCopy;

    this.settings=new Settings(this.name+".json");
    this.scripts=new Scripts(this.settings);
    this.shortW = new ShortW(this);
    
    this.settingsW=new SettingsW(this);

    this.w = new Window("palette", this.name, undefined, {
      closeButton: true,
      borderless: false,
      resizeable: true
    });
    this.w.preferredSize = {
      width: 300,
      height: 600
    }
    this.w.spacing = 2;
    this.w.margins = 0 //[, 0, 1, 1];
    this.w.location =this.settings.windowLocation || [600,200];
    this.w.opacity = .98
    this.w.alignChildren = ["fill", "top"];

    var butGroup = this.w.add("panel");
    var treeGroup = this.w.add('group');

    butGroup.preferredSize = [300, 10];
    butGroup.alignment = ["top", "left"];
    butGroup.orientation = "row";

    this.edit = butGroup.add("edittext");
    this.edit.characters = 20;
    this.edit.preferredSize = [260, 30]
    this.edit.alignment = ["top", "left"];

    this.edit.text=HALP.search;
    this.edit.onDeactivate=function(){that.onEditDeactivate()}
    this.edit.onActivate=function(){that.onEditActivate()}
    this.edit.onChanging=function(){that.onEditChanging()}

    var b0 = butGroup.add('button', undefined, 'R'); b0.helpTip = "Refresh script list";b0.name="b0";
    var b1 = butGroup.add('button', undefined, '+'); b1.helpTip = "Add shortcut to script item";b1.name="b1";
    var b2 = butGroup.add('button', undefined, '='); b2.helpTip = "Adjust Script Launcher's settings";b2.name="b2";

    b0.preferredSize =b1.preferredSize =b2.preferredSize = [20, 20];
    b0.onClick=b1.onClick=b2.onClick=function(){that.onButtonClick(this)};


    treeGroup.margins = 0;treeGroup.alignment = ["fill", "fill"];treeGroup.orientation = "column";
    this.tree=this.scripts.draw(treeGroup,this);
    this.dataCopy=this.tree.data;

    //this.tree.alignment = ["fill", "fill"];
    //this.tree.preferredSize = [200, 600];
    this.tree.onChange= function() {
      if(that.shortW.open){
        that.shortW.onTreeSelectionChange(this.list.selection);
      }else{
      }
    }
    this.tree.onDoubleClick=function(){
      if(that.shortW.open)return

      if(this.list.selection){
        if(this.list.selection[0]){
          var ditem=this.itemsData(this.list.selection[0])
          if(ditem&&ditem.script){
            that.executeScript(ditem.script)
          }
        }
      }
    }

    this.w.onResizing = this.w.onResize = function() {
      
    //  this.text = animateBar(.5)
      
      //added this to prevent size goubf akk over the place
      return;
      
      butGroup.size[1] = 50;


      b0.size =b1.size =b2.size = [20, 20];
      //???
      this.layout.resize();
      this.layout.resize();
      this.layout.resize();


      trace(">>resize!!>>>",butGroup.size )
      
    }
    this.w.onMoving=this.w.onMove=function(){
      trace("-----------------------------------------------------??")
      if(!PAUSE_ANIMATION)
        this.text = animateBar(2);
    }
    this.w.onClose = function() {
      that.close(true);
    }
    this.w.addEventListener("keydown", function(e) {
      that.onKeyDown(e);
    });
    this.w.addEventListener("click", function(e) {
      //right click, show shortcut
      if (e.button==2)
        that.onButtonClick(b1);

    });

    var animateBarIndex = 0;
    var animateBarString = "                   " + this.name+this.ver + HALP.title
    function animateBar(speed) {
      animateBarIndex+=speed
      animateBarIndex = animateBarIndex % animateBarString.length

      //::
      if(animateBarIndex%10==0)
        $.SCRIPT_LAUNCHER.saveSettings();


      return animateBarString.substring(animateBarIndex, animateBarString.length) + animateBarString.substring(0, animateBarIndex)


    };


    this.updateSettings();
  };

  ScriptLauncher.prototype.onKeyDown = function(e) {
    trace("ScriptLauncher.prototype.onKeyDown");
    var keyName=ScriptUI.environment.keyboardState.keyName||"";
    trace("this.editIsActive",this.editIsActive)
    if(this.editIsActive){
      if(keyName=="Down"){
         //this.tree.list.selection=0;
         this.tree.list.active=true;
         this.editIsActive=false;
         //edit deactivation redraws tree
         this.tree.list.selection=0;
         this.tree.list.active=true;
      }else if(keyName=="Enter"){
        //only one script with enclosing folder
        if(this.filteredData.length==1&&this.filteredData[0]._items.length==1){
            this.executeScript_returnFocusToEdit=true;
            this.executeScript(this.filteredData[0]._items[0].script)
        }else{

        }
      }

    }else{
      if(keyName=="Up"){
        //..we move with arrows to topn of the tree
        if(this.tree.list.selection&&this.tree.list.selection.length&&this.tree.list.selection[0].index==0){
          this.edit.active=true;
          this.editIsActive=true;

        }
      }
      var s=this.shortW.formShortcut();
      if(s.slice(-1)!="+"){
        if(this.scripts.shortcuts[s]){
          this.executeScript(this.scripts.shortcuts[s])
        }
      }
    }
  }
  ScriptLauncher.prototype.reloadFiles = function() {
    this.edit.text=HALP.search;
    this.scripts=new Scripts(this.settings);
    this.dataCopy=this.scripts.redraw(this.tree);
  }

  ScriptLauncher.prototype.onEditChanging = function() {
    trace("onEditChanging")
    //filters tree data by regexp
    function filterData(rr,data){
      var a=[];
      var l=data.length;
      for(var i=0; i<l; i++){
          var o=data[i];
          //has subnodes
          if(o._items){
            var ll=o._items.length;
            var aa=[]
            for(var j=0;j<ll;j++){
              var oo=o._items[j];
              if(oo.text.match(rr))
                aa.push(oo)
            }
            //:::::::::::::::::::: collect string, to cpmpare to previous if we need to optimise

            //if any of subnodes are matching, we include mother node, aka, folder
            if(aa.length!=0){
              //o._items=aa;
              a.push({text:o.text,_items:aa,_expanded:true})
            }
          }else
            // all the single items all the single items
            if(o.text.match(rr))
              a.push(o)
      }
      return a;
    }
    if (this.edit.text.length > 1) {
      this.filteredData = filterData(new RegExp(this.edit.text, 'ig'), this.dataCopy);
      this.tree.draw(this.filteredData,true);
    }else{
      this.filteredData =[];
      this.tree.draw(this.dataCopy,true);
    }
    //this.edit.active = true;

  }

  ScriptLauncher.prototype.onEditActivate = function() {
    trace("onEditActivate")
    this.editIsActive=true;
    if(this.edit.text.length<2||this.filteredData.length==0){
      this.edit.text="";
    }
  }
  ScriptLauncher.prototype.onEditDeactivate = function() {
    trace("onEditDeactivate")
    this.editIsActive=false;

    if(this.edit.text.length<2||this.filteredData.length==0){
      this.edit.text=HALP.search;
      this.tree.draw(this.dataCopy,true);
    }

    var keyName=ScriptUI.environment.keyboardState.keyName||"";
    if(keyName!="Tab")
      this.tree.list.active=true;

  }

  ScriptLauncher.prototype.onButtonClick = function(b) {
    switch(parseInt(b.name.charAt(1))){
      case 0:
        this.reloadFiles();
        break;
      case 1:
        this.shortW.show(this.w.bounds);
        this.shortW.onTreeSelectionChange();
        break;
      case 2:
        this.settingsW.show(this.w.bounds);
        break;
    }
  }

  ScriptLauncher.prototype.show = function() {
    this.w.show();
  }
  ScriptLauncher.prototype.saveSettings=function(){
    this.settings.save(this.scripts.collection,this.w.location);
  }
  ScriptLauncher.prototype.updateSettings=function(){
    this.settings.update(this);
  }
  ScriptLauncher.prototype.close = function(supressClose) {
    if (!supressClose)
      this.w.close();

    if(this.settingsW.open)
      this.settingsW.close(null,true);

    if(this.shortW.open)
      this.shortW.close(null,true);
    
    trace("closin",arguments.callee.name)
    // this.saveSettings()
  }
  ScriptLauncher.prototype.executeScript = function(s) {
    this._executeScriptTitle=this.w.text;
    this.w.text=s.fileName;

    s.execute();
  }
  ScriptLauncher.prototype.onScriptExecuted = function(a) {

    if(this.settings.oneClickOperation)
      this.tree.list.selection = null;

    this.w.text=this._executeScriptTitle;

    if(this.settings.artBoardFocus){
      //:::??::::app.executeMenuCommand("floatInWindow");
      app.executeMenuCommand("consolidateAllWindows");
    }else{
      if(this.executeScript_returnFocusToEdit)
        this.edit.active=true;
    }
    this.executeScript_returnFocusToEdit=false;
  }

  const IMAGES = {
    dots:{
    cross: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x005IDATx\u00DAb\u00FC\x0F\x04\f\f\f\u008C\f\u00A8\u00E0?\x13T\u00F0?\u00B2 H\u008C\x05\u00CA\x01I6!\u00B1\x19\u0098\x18p\x00\x16d\u00ED\u00C8l&4A\u0098Q\u00FF\x01\x02\f\x008\u0098\x0B\u0090y-\u00A0p\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    body:ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00GIDATx\u00DAb\u00FC\u00FF\u00FF?\u00C3\u00DFk'\n\u00FF\x7Fz\x17\u00CB\x00\x04\u008C|B\u008B\u0099\u00B5,\u00FA\x19\u00FF\\=\x0E\x17\u0084\x01\u0090$\u00E3\u00EF\u00E3[\u00CF1`\x01L\f8\x00\x13H\x1B\u00BA H\u008C\tl\x11\u0092$\u00CCr\u0080\x00\x03\x00\u00F5\x0B\x1AM\u00A1{<Q\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    green:ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAbl9,\u00C1\x00\x04\u0085@\x1C\u00CB\x00\x01\u008B\u0081\u00B8\u009F\x05M\u0090\x01\u00C6fB\x13\u0084K21\u00E0\x00LP3\u00D1\u00C1b\u0090D?\u009A$\u00D8r\u0080\x00\x03\x00\u00E71\b\u00FC\u0085F\x02\u00B9\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    white: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00=IDATx\u00DAb\u00F8\u00FF\u00FF?\u00C3\u00BF\u00AF\u00EF\n\u00FF}zy\x0E\u008C\u0081l\u0090\x18#\u0088\u00C1\u00F0\u00F7w,\x032`f]\u00CC\bR\u00C5\u0080\x0501\u00E0\x00L m\x18\u00A2 1\\\u0096\x03\x04\x18\x00=\u00AA3.\u00B7\x17\b\u00B6\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    yellow: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00=IDATx\u00DAb\u00F8\u00FF\u00FF?\u00C3\u00DF;\u00EE\u0085\x7F.p\u009D\x03a\x10\x1B$\u00C6\bf|9\x1C\u00CB\u0080\x04\x18yl\x173\u0082T1`\x01L\f8\x00\x13H\x1B\u00BA X\f\u0097\u00E5\x00\x01\x06\x00\u00F6\u00FD+\u00DES|\u00EA\x13\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    teal: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00KIDATx\u00DAb\u00FC\u00FF\u00FF?C\u00E7\u00B5[\u00857?}\u008Ee\x00\x02u>\u00DE\u00C5\u00E5Zj\u00FD\u00CC\u009CaQpA\x10x\u00FB\u00F3\u0097\u00FE\u008DO_\u00B8\u0098\u0090\x05a\x00$\u00C6\u00C4\u0080\x030\u0081\u00CCD\x17\x04\u00891\u0081,B\u0096\u0084Y\x0E\x10`\x00\x0B\u0084!\u009C\bb\u00CD\u00FC\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    red: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00>IDATx\u00DAb\u00F8\u00FF\u00FF?\u00C3\u00C7\u0090\u00A2\u00C272.\u00E7@\x18\u00C4\x06\u00891\u0082\x18\u00BFO\\\u008Ae@\x02\u00AC\x16z\u008B\x19A\u00AA\x18\u00B0\x00&\x06\x1C\u0080\t\u00A4\r]\x10,\u0086\u00CBr\u0080\x00\x03\x00vZ'a\u00BA\u0084\u00D0\u00B7\x00\x00\x00\x00IEND\u00AEB`\u0082"),
    purple: ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x00XIDATx\u00DAb\u00FE\u00FF\u00FF?\u00C3\u00DF\x1Ff\u0085\u00C2\u00FC\u00CE\u00D34U\u00FD\u00D3C\u0082\u00D2\u00B9\x0E\x1EYz\u0082\x19$x\u00F5\u00F2\u008BX\x06(x\u00FD\u00EA\u008B\u00FE\u0095\u00CB\u00CF\u00B9\u0098A*\x19\u00D0\x00H\u0092\u0089\x01\x07`\u00D2\u00D6\u0095X\u008C.\b\x12c\x06Y\x042\x13\u00A4\x1D&\u00D8\u00DC\u00E1\u00D5\x0F\x10`\x00u\u0080(]\u00CC\u0084~\u00FC\x00\x00\x00\x00IEND\u00AEB`\u0082")
    }
  }


  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  function addLink(parent, string, callBack){
    const myColorOn =  [.2,.6,.95, 1];
    const myColorOff = [.3,.6,.8, 1];
    var gUrl = parent.add('group');
    var st = gUrl.add('statictext', void 0, string);
    var ln = gUrl.add('group');
    gUrl.orientation = 'stack';
    st.alignment = ['center','top'];
    ln.alignment = ['center','bottom'];
    ln.preferredSize = {width:ln.graphics.measureString(string)[0], height:1};
    st.graphics.foregroundColor = st.graphics.newPen(0,myColorOn,1);
    st.graphics.disabledForegroundColor = st.graphics.newPen(0,myColorOff,1);
    st.enabled = false;
    ln.graphics.backgroundColor = ln.graphics.newBrush(0,myColorOn);
    ln.visible = false;
    var t = function(ev){
      var st = this.children[0];
      var ln = this.children[1];
      switch( ev.type ){
        case 'mouseover':
        case 'mousemove':
          st.enabled = true;
          ln.visible = true;
          break;
        case 'mouseout':
          st.enabled = false;
          ln.visible = false;
          break;
        case 'mousedown':
          if( 'target' != ev.eventPhase ) break;
          callBack();
          // Here use the browser launcher scheme, there are many examples on the forum!
          // Or use: github.com/indiscripts/IdExtenso/blob/master/etc/Web/$$.Browser.jsxinc
  
        default:;
      }
    };
    gUrl.addEventListener('mouseover',t);
    gUrl.addEventListener('mousemove',t);
    gUrl.addEventListener('mouseout',t);
    gUrl.addEventListener('mousedown',t);
    
    return gUrl
  }

    function trace() {
      return  

      var s = "";
      for (var i = 0; i < arguments.length; i++) {
        s += arguments[i] + " "
      }
      $.writeln(s);
    }
    function clearConsole() {
      if (app.name === "ExtendScript Toolkit") {
        app.clc();
      } else {
        var estApp = BridgeTalk.getSpecifier("estoolkit");
        if (estApp) {
          var bt = new BridgeTalk;
          bt.target = estApp;
          bt.body = "app.clc()";
          bt.send();
        }
      }
    }
    Function.prototype.bind = function(obj) {
      var method = this,
        temp = function() {
          return method.apply(obj, arguments);
        };

      return temp;
    }
    function multiplyString(num,ch){
      for (var r='';num--;r+=ch);
      return r;
    }
    function trimToChars(str, num){
      if(str.length > num)
        return str.substr(0, num) + "..";
      return str;
    };
    String.prototype.replaceAll = function(search, replacement) {
      var target = this;
      return target.replace(new RegExp(search, 'g'), replacement);
    };

    function escapeRegExp(str) {
      return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
    }

    function extractExtention(str) {
      return str.replace(/^.*\./, '');
    }



      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        // this is a tree component I wrote because Adobe's one kept crashing.
        // MIT license
        // aivaras gontis www.illustratorscripts.com
        //its not pretty, but well, it works.


        //posssible listeners:
        //onKeyDown, onDoubleClick, onChange, onRightClick

        function Tree(parent, data_, someSiblingToFocusOnHack_,o_) {

          this.T_RIGHT = "\u25B8";
          this.T_DOWN = "\u25BE";
          this.spaces = ["", " ", "  ", "   ", "   "];

          //::::use at risk, might be buggy in some AI versions!
          this.ONE_CLICK = false;
          //::::use at risk, might be buggy in some AI versions!
          this.USE_IMAGES = true;

          this.parent = parent;
          this.data = data_;
          //this is needed so in keyboard operation list can keep focus on expand
          //can be set later
          this.someSiblingToFocusOnHack = someSiblingToFocusOnHack_;

          //pass object with properties
          for(var k in o_){
            this[k]=o_[k];
          }

          this._addGroup();

          this.draw();
        }
        //this is one wonky workaround
        Tree.prototype._click = function(e) {
          if (e.button === 0) {
            this._onDoubleClick(null,e)

          } else if (e.button === 2) {
            this.onRightClick && this.onRightClick(this.list.selection)
          }
        }
        Tree.prototype._onChange = function(sel) {
          if(sel&&sel.length!=0){
            this.lastSelection=sel[0].index;
            if(this.ONE_CLICK){
              this._onDoubleClick(sel);
              //::::::::::::::::::::::::::::::::::::: should be uncommented when using tree separatelly
              //this.list.selection=null
            }
          }
          this.onChange && this.onChange(sel)
        }
        Tree.prototype._onDoubleClick = function(sel,e) {
          sel = sel ? sel : this.list.selection;
          if(!sel)return;
          sel=  sel ? sel : this.list.items[this.lastSelection];

          var sel1 = sel.length ? sel[0] : sel;
          var index=sel1.index;
          if (this.itemsData(sel1)._items)
            this.toggleExpand(sel1)

          //we update target, since target's list is destroyed
    //      e.target=this.list;

          this.onDoubleClick && this.onDoubleClick(this.list.selection)
        }
        Tree.prototype._onKeyDown = function(e) {
          trace("Tree.prototype._onKeyDown")
          if(this.ONE_CLICK)return

          var sel = this.list.selection
          if(!sel)return;
          var sel1 = sel.length ? sel[0] : sel;

          var s = ScriptUI.environment.keyboardState.keyName;
          if (s == "Right") {
            this.expand(sel1, true);
            e.preventDefault();
          } else if (s == "Left") {
            this.expand(sel1, false);
            e.preventDefault();
          } else if (s == "Enter") {
            this._onDoubleClick(sel);
          }
          this.onKeyDown && this.onKeyDown(e)


        }

        Tree.prototype._addGroup = function() {
          if (this.group) this.parent.remove(this.group);
          this.group = this.parent.add('group');
          this.group.preferredSize = [100, 100];
          this.group.margins = 0;
          this.group.alignment = ["fill", "fill"];
          this.group.orientation = "column";
        }
        Tree.prototype._addList = function(a) {
          var list;
          var that = this;
          list = this.group.add("listbox", undefined, a, {
            multiselect: true
          });
          list.alignment = ["fill", "fill"];
          list.preferredSize = [300, 600];

          return list
        }
        Tree.prototype._addListListeners = function(list) {
              var that = this;
          list.onChange = function(item) {
            if(!that._supressChange)
              that._onChange(this.selection)
          }
          list.onDoubleClick = function() {
          //  if(!that.ONE_CLICK)
              that._onDoubleClick(this.selection);
          }
          list.addEventListener("keydown", function(e) {
            that._onKeyDown(e)
          });
          list.addEventListener("click", function(e) {
            e.stopPropagation();
            that._click(e)
          });
          return list
        }
        // returns object from data structure.
        // mimics multidimentional array functionality,
        // so when indices are - accessData([2,1,3]) it works as: data[2][1][3], accessing:
        // that.data[indices[0]]._items[indices[1]]._items[indices[2]]
        Tree.prototype.accessData = function(indices) {
          var seeker = {
            _items: this.data
          };
          for (var i in indices)
            seeker = seeker._items[indices[i]]
          return seeker
        }
        //gets list items data
        Tree.prototype.itemsData = function(litem) {
          if(!litem){throw("wrong argument");return}
          var o=this.accessData(litem._indices);
          return o;
        }

        //gets item coresponding to data
        Tree.prototype.datasItem = function(dataItem){
          if(!dataItem){throw("wrong argument");return}
          return this.list.items[dataItem._lindex]
        }

        //updates text of one item
        Tree.prototype.updateOneItem = function(dataItem){

          var text;
          var litem=this.datasItem(dataItem);
          if(!litem)return false;
          var treeDepthSpaces = multiplyString( litem._indices.length-1,this.spaces[2]);
          if(dataItem._items){
              var nodesTriangle = (dataItem._expanded ? this.T_DOWN : this.T_RIGHT) + this.spaces[1];
              text=treeDepthSpaces + nodesTriangle + dataItem.text
          }else{
              var itemsSpaces = (this.USE_IMAGES&&dataItem.image)? this.spaces[0] : this.spaces[2];
              text=treeDepthSpaces + itemsSpaces + dataItem.text
          }

          litem.text=text;

          return true;
        }

        //draws list form data structure
        //every time list changes-  is expanded, contracted, item changed, its being redrawn
        //this is might be not the most effective way,
        //but for small to medium sized lists <1000 its ok.

        Tree.prototype.draw = function(d_, dontFocus_) {
          
          ///:::::::::

          if (this.list) {
            if (this.list.selection)
              var sel = this.list.selection[0].index;
            else
              var sel = -1;

            this.list.parent.remove(this.list);
          }
          if (d_) this.data = d_;
          var that = this
          var textA = [];
          //converts branch of data tree to linear array of string for use in list
          function branchToStringA(branchData, depth) {
            var l = branchData.length;
            for (var i = 0; i < l; i++) {
              var o = branchData[i];
              var treeDepthSpaces = multiplyString(depth,that.spaces[2]);
              //data element is NODE
              if (o._items) {
                var nodesTriangle = (o._expanded ? that.T_DOWN : that.T_RIGHT) + that.spaces[1]
                textA.push(treeDepthSpaces + nodesTriangle + o.text);
              //  trace(treeDepthSpaces + nodesTriangle + o.text)
                //if data element is expanded, we need to add its _items strings to arr
                if (o._expanded){
            //      trace(o._expanded,"brances num:",o._items.length)
                  branchToStringA(o._items, depth + 1)
                }
              } else {
                //just a regular item..image takes up 2 spaces, lets acocunt for that

                var itemsSpaces = (that.USE_IMAGES&&o.image)? that.spaces[0] : that.spaces[2];
                //data items store _lindex property to access list
                o._lindex=textA.length;
                textA.push(treeDepthSpaces + itemsSpaces + o.text)

              }
            }
          }

          //create new list with new arry of strings
          branchToStringA(this.data, 0);
          this.list = this._addList(textA);

          //iterates list, adds indices and images to its items
          var indices = [];
          var depth = 0;
          var l = this.list.items.length
          var branchIndex = 0;
          var branchLength = this.data.length;
          for (var i = 0; i < l; i++) {
            var litem = this.list.items[i];
            indices[depth] = branchIndex;
            var o = this.accessData(indices);
            // each item keeps copy of index in data structure
            //so [..items_:[{.._items:obj1,obj2}]]
            //obj0 [0,0] obj1[0,1]
            //its how it "knows" where it "lives" in a tree
            litem._indices = indices.slice(0);

            if (o.image && this.USE_IMAGES)
              litem.image = o.image

            if (o._expanded && o._items && o._items.length != 0) {
              //climb level deeper, reset index, update branch length
              depth++
              branchIndex = 0
              branchLength = o._items.length;
            } else {
              //reached end of the branch
              while (branchIndex >= branchLength - 1) {
                //we reach the end of expanded branch..
                //come one level up
                indices.pop();
                depth--
                //and return branch index to previous state
                branchIndex = indices[indices.length - 1];
                //we get one level up, retrieve node elemnt and check its _items
                branchLength = this.accessData(indices.slice(0, -1))._items.length;
              }
              //next elem in branch
              branchIndex++
            }
          }
          this._addListListeners(this.list);
          var p=this.list.window.location
          
          //this.list.window.layout.layout(true);
          this.list.window.layout.layout(true);
          PAUSE_ANIMATION=true;
          this.list.window.location=p;
          PAUSE_ANIMATION=false;
          if(this.ONE_CLICK) return;

          if (sel >= 0){
            that._supressChange=true;
            this.list.selection = sel;
            that._supressChange=false;
          }

           if (!dontFocus_)
             this.refocus();


          //   return textA
        };

        Tree.prototype.refocus = function() {
          if (this.someSiblingToFocusOnHack) this.someSiblingToFocusOnHack.active = true;
          this.list.active = true;
        }

        Tree.prototype.toggleExpand = function(litem) {
          var nodeData = this.itemsData(litem);
          if (!nodeData._items) return;
          this.expand(litem, !nodeData._expanded)
        };

        //this part could be optimised
        //ie, inserting items for short expands,
        // just removing items from list for contracting
        Tree.prototype.expand = function(litem, expand) {
          var nodeData = this.itemsData(litem);
          if (!nodeData._items) return;
          if (nodeData._expanded == expand) return;
          nodeData._expanded = expand;
          this.draw();
        };

        //
        // function multiplyString(num,s) {
        //   for (var r = ''; num--; r += s);
        //   return r;
        // }

        //small test:

        // var green = ScriptUI.newImage("\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00\x06\x00\x00\x00\x06\b\x06\x00\x00\x00\u00E0\u00CC\u00EFH\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x006IDATx\u00DAbl9,\u00C1\x00\x04\u0085@\x1C\u00CB\x00\x01\u008B\u0081\u00B8\u009F\x05M\u0090\x01\u00C6fB\x13\u0084K21\u00E0\x00LP3\u00D1\u00C1b\u0090D?\u009A$\u00D8r\u0080\x00\x03\x00\u00E71\b\u00FC\u0085F\x02\u00B9\x00\x00\x00\x00IEND\u00AEB`\u0082");
        // var w=new Window("dialog");
        // var b=w.add("button",undefined,"hi");
        // var data=[{text:"item1"},{text:"item2"},{text:"item3",image:green},{text:"node",_expanded:false,_items:[{text:"sub0"}]}];
        // var tree=new Tree(w,data,b);
        // w.show();




      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////JSON parser minified////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


      "object"!=typeof JSON&&(JSON={}),function(){"use strict";function f(t){return 10>t?"0"+t:t}function quote(t){
        return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var e=meta[t];
          return"string"==typeof e?e:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'}
        function str(t,e){var n,r,o,f,u,i=gap,p=e[t];switch(p&&"object"==typeof p&&"function"==typeof p.toJSON&&(p=p.toJSON(t)),
          "function"==typeof rep&&(p=rep.call(e,t,p)),typeof p){case"string":return quote(p);case"number":return isFinite(p)?String(p):"null";
        case"boolean":case"null":return String(p);case"object":if(!p)return"null";if(gap+=indent,u=[],"[object Array]"===Object.prototype.toString.apply(p)){
          for(f=p.length,n=0;f>n;n+=1)u[n]=str(n,p)||"null";return o=0===u.length?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+i+"]":"["+u.join(",")+"]",gap=i,o}
            if(rep&&"object"==typeof rep)for(f=rep.length,n=0;f>n;n+=1)"string"==typeof rep[n]&&(r=rep[n],o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));
          else for(r in p)Object.prototype.hasOwnProperty.call(p,r)&&(o=str(r,p),o&&u.push(quote(r)+(gap?": ":":")+o));return o=0===u.length?"{}":gap?"{\n"+gap+
          u.join(",\n"+gap)+"\n"+i+"}":"{"+u.join(",")+"}",gap=i,o}}"function"!=typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(){
            return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+
            f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(){
              return this.valueOf()});var cx,escapable,gap,indent,meta,rep;"function"!=typeof JSON.stringify&&
          (escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            meta={"\b":"\\b","  ":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},JSON.stringify=function(t,e,n){var r;
              if(gap="",indent="","number"==typeof n)for(r=0;n>r;r+=1)indent+=" ";else"string"==typeof n&&(indent=n);if(rep=e,
                e&&"function"!=typeof e&&("object"!=typeof e||"number"!=typeof e.length))throw new Error("JSON.stringify");return str("",{"":t})}),
          "function"!=typeof JSON.parse&&(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            JSON.parse=function(text,reviver){function walk(t,e){var n,r,o=t[e];if(o&&"object"==typeof o)for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&
            (r=walk(o,n),void 0!==r?o[n]=r:delete o[n]);return reviver.call(t,e,o)}var j;if(text=String(text),cx.lastIndex=0,cx.test(text)&&
              (text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),
              /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@")
                .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]")
                .replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;
            throw new SyntaxError("JSON.parse")})}();


            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



  ////!!!!!!!!!!!!!!!!!!!:::::::::::
  function clearConsole() {
    if (app.name === "ExtendScript Toolkit") {
      app.clc();
    } else {
      var estApp = BridgeTalk.getSpecifier("estoolkit");
      if (estApp) {
        var bt = new BridgeTalk;
        bt.target = estApp;
        bt.body = "app.clc()";
        bt.send();
      }
    }
  }
  
  clearConsole();
  
 if ($.SCRIPT_LAUNCHER) {
   trace("..closing existing")
   $.SCRIPT_LAUNCHER.close(false);
 }



trace("restart--------------------------------------------------------")



$.SCRIPT_LAUNCHER = new ScriptLauncher();
$.SCRIPT_LAUNCHER.show();

})();
