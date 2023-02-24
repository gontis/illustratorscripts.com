# ScriptLauncher.jsx 

_Script palette window to launch scripts in Adobe Illustrator_

![Script palette window to launch scripts in Adobe Illustrator](.crap/fullClean.png?raw=true "ScriptLauncher.jsx")

Placing a script in the Illustrator script folder, relaunching the application, and finding the script through File > Scripts can be a tedious task. Enter ScriptLauncher, a tool that provides a simple interface for quickly launching other scripts within Illustrator. This script is a must-have for any professional who runs Adobe Illustrator scripts on a daily basis.

### Key Features:

* Quickly add shortcuts to any script. 
* Filter the script list by entering the name pattern in the search box. 
* Label scripts with color. 



### Additional Features:

* Ability to operate with single click, aka button mode.
* Refresh the script list to reflect file changes.
* Add or remove multiple folders easily by editing the folders.txt file.
* Open the script file for editing and the script folder easily.



### Notes:

ScriptLauncher will create a ScriptLauncher.json file in the <User>/Documents/ folder to save shortcuts and settings.

ScriptLauncher will read the folders.txt file from the parent folder. In the folders.txt file, users can place folder URLs from where scripts will be read and added to the ScriptLauncher script list. For example, if user keeps some scripts on network drive or on Desktop, he can add 

~/Desktop/NEW_SCRIPTS 
\\192.168.1.11\scripts

and ScriptLauncher will load scripts from desktop and from remote machine.

Writting .. will tell ScriptLauncher to access scripts in parent folder.


## Installing

depending on your OS, place script in:

Applications > Adobe Illustrator _VERSION_ > Presets > _LANGUAGE_ > Scripts
My Computer > Program Files > Adobe > Adobe Illustrator _VERSION_  > Presets > _LANGUAGE_> Scripts

Restart Illustrator
Launch by navigating to File>Scripts


Also, you can add shortcut to launch ScriptLancher by editing Actions. [You can read more about it here.](https://www.illustratorscripts.com/resources/how-to-add-shortcut-to-any-script/) 

## Usage

* Just double-click on script in the list to launch script. If **One click operation** is set in settings, that will be single click.
* Pressing (=) will open settings.
* Pressing (R) will reload script list from disk.
* Pressing (+) will open shortcut window, alternatively you can
* Right-click on any script to add a shortcut to it.

## Shortcuts

* When script is selecten in main window, and **shortcut window is open** press any key to assign a shortcut to it.
* Press any **2 letter keys simultaneously** (ie, A, S, Q, W) to remove shortcut. 
* You can also SHIFT or CMD(CTRL) select main window to remove shortcuts from multiple scripts or color label multiple scripts
* To add color label to script select color circle.
* Click *open script file* to use registered program to open/edit script file, click *open parent folder* to open selected script's parent folder


**IMPORTANT**
For shortcuts to work ScriptLauncher palette has to have focus. Recommended usage is adding Illustrator shortcut to ScriptLauncher (for example, **F2**) and then using
combo shortcuts. So if you have assigned **F2** shortcut to Script Launcher and  **R** shortcut to, let's say, [remove anchors.jsx](https://www.illustratorscripts.com/scripts/remove-anchors-points/),
by pressing **F2** and **R** in short scuccession, you will be able to remove anchors.
For this approach to work, don't forget to remove _Focus on search bar upon start_ checkbox in ScriptLauncher settings

## Settings

* _Focus on search bar upon start_ checkbox. When you start ScriptLauncher you can start typing and filtering scripts. This is checked by default and **should be unchecked if you prefer using shortcuts.**
* _One Click Operation_ When checked you will launch scripts with one click instead of 2
* _Return focus to artboard_ If you are running multiple consecutive scripts using shortcuts its best to leave unchecked, so focus will remain on ScriptLauncher  palette. If you are editing paths on artboard and occasionally use a shortcut to launch script, it is best to tick this.
* _Enable color labels_ Does what it says. The reason this checkbox exists is because images implementation is buggy in Adobe Illustrator

## Folders.txt

if you create a plain text file named folders.txt in same directory as ScriptLauncher.jsx, ScriptLauncher will read that file looking for absolute file system folder URL's to load scripts from. Each folder URL should be on a new line.
write .. to include parent folder. 
_The reason this functionality is included is because ExtendScript in Adobe Illustrator Alias (shortcut) implementation is buggy._



Happy usage!






–––––––––––––––––
<a href="http://www.illustratorscripts.com">www.illustratorscripts.com</a>
–––––––––––––––––