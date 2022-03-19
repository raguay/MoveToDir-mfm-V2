var moveToDir = {
  extMan: null,
  init: function(extManager) {
    //
    // This function adds all the commands for working with alfred and 
    // setting up references to variables that are used.
    //
    moveToDir.extMan = extManager;
    moveToDir.extMan.getCommands().addCommand('Move Selected to Cursor Directory', 'moveToDir.moveToCursor', 'Move the currently selected files to the directory pointed to by the current cursor.', moveToDir.moveToCursor);
  },
  installKeyMaps: function() {
    moveToDir.extMan.getExtCommand('addKeyboardShort').command('normal', false, true, false, 'M', moveToDir.moveToCursor);
  },
  moveToCursor: async function() {
    //
    // This command will take the list of selected files and move
    // them to the current cursor if it is a directory. Otherwise, it
    // does nothing.
    //
    var cursor = moveToDir.extMan.getExtCommand('getCursor').command();
    var selects = moveToDir.extMan.getExtCommand('getSelectedFiles').command();
    if ((cursor.entry.type === 1) && (selects.length > 0)) {
      //
      // It is a proper setup with files selected and the cursor is
      // a directory. Let's move em!
      //
      var mdir = { ...cursor.entry };
      mdir.dir = await cursor.entry.fileSystem.appendPath(cursor.entry.dir, cursor.entry.name);
      mdir.name = '';
      selects.forEach(async element => {
        await element.fileSystem.moveEntries(element, mdir);
      });
    }
  }
};

return (moveToDir);
