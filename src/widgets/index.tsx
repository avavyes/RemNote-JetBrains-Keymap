import { declareIndexPlugin, type ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../index.css';

const JETBRAINS_COMMANDS = {
  SEARCH_EVERYWHERE: 'jb-search-everywhere',
  FIND_ACTION: 'jb-find-action',
  GO_TO_CLASS: 'jb-go-to-class',
  GO_TO_FILE: 'jb-go-to-file',
  GO_TO_SYMBOL: 'jb-go-to-symbol',
  FIND_IN_PATH: 'jb-find-in-path',
  REPLACE_IN_PATH: 'jb-replace-in-path',
  FIND_USAGES: 'jb-find-usages',
  BACK: 'jb-back',
  FORWARD: 'jb-forward',
  NEXT_TAB: 'jb-next-tab',
  PREV_TAB: 'jb-prev-tab',
  CLOSE_TAB: 'jb-close-tab',
  REFORMAT_CODE: 'jb-reformat-code',
  OPTIMIZE_IMPORTS: 'jb-optimize-imports',
  GENERATE_CODE: 'jb-generate-code',
  SURROUND_WITH: 'jb-surround-with',
  COMMENT_LINE: 'jb-comment-line',
  DUPLICATE_LINE: 'jb-duplicate-line',
  DELETE_LINE: 'jb-delete-line',
  MOVE_LINE_UP: 'jb-move-line-up',
  MOVE_LINE_DOWN: 'jb-move-line-down',
  MOVE_STATEMENT_UP: 'jb-move-statement-up',
  MOVE_STATEMENT_DOWN: 'jb-move-statement-down',
  RENAME: 'jb-rename',
  EXTRACT_METHOD: 'jb-extract-method',
  QUICK_FIX: 'jb-quick-fix',
  NEXT_ERROR: 'jb-next-error',
  PREV_ERROR: 'jb-prev-error',
  TOGGLE_LINE_BREAKPOINT: 'jb-toggle-line-breakpoint',
  DEBUG: 'jb-debug',
  RUN: 'jb-run',
  STOP: 'jb-stop',
  STEP_OVER: 'jb-step-over',
  STEP_INTO: 'jb-step-into',
  RESUME: 'jb-resume',
  FILE_STRUCTURE: 'jb-file-structure',
  TYPE_HIERARCHY: 'jb-type-hierarchy',
  METHOD_HIERARCHY: 'jb-method-hierarchy',
  CALL_HIERARCHY: 'jb-call-hierarchy',
  COMMIT: 'jb-commit',
  UPDATE_PROJECT: 'jb-update-project',
  PUSH: 'jb-push',
  RECENT_FILES: 'jb-recent-files',
  RECENT_CHANGES: 'jb-recent-changes',
  SAVE_ALL: 'jb-save-all',
  CLOSE_PROJECT: 'jb-close-project',
  SETTINGS: 'jb-settings',
  PROJECT_STRUCTURE: 'jb-project-structure',
  FIND_WORD: 'jb-find-word',
  REPLACE_WORD: 'jb-replace-word',
  SELECT_ALL_OCCURRENCES: 'jb-select-all-occurrences',
  ADD_SELECTION: 'jb-add-selection',
  COLLAPSE_ALL: 'jb-collapse-all',
  EXPAND_ALL: 'jb-expand-all',
};

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.settings.registerBooleanSetting({
    id: 'enabled',
    title: 'Enable JetBrains Keymap',
    description: 'Enable or disable the JetBrains keymap commands',
    defaultValue: true,
  });

  await plugin.settings.registerStringSetting({
    id: 'info',
    title: 'JetBrains Keymap',
    description: 'This plugin provides JetBrains-style commands. Go to Settings > Keyboard Shortcuts to bind these commands to keyboard shortcuts. Recommended JetBrains shortcuts: Double Shift (Search Everywhere), Ctrl+Shift+A (Find Action), Ctrl+N (Go to Class), Ctrl+Shift+N (Go to File), Alt+F7 (Find Usages), Ctrl+Alt+Left/Right (Navigate Back/Forward)',
    defaultValue: '',
  });

  const registerJBCommand = async (
    id: string,
    name: string,
    description: string,
    actionDescription: string
  ) => {
    await plugin.app.registerCommand({
      id,
      name,
      description,
      action: async () => {
        const enabled = await plugin.settings.getSetting<boolean>('enabled');
        if (enabled) {
          await plugin.app.toast(actionDescription);
        }
      },
    });
  };

  registerJBCommand(JETBRAINS_COMMANDS.SEARCH_EVERYWHERE, 'Search Everywhere', 'Search everywhere (Double Shift in JetBrains)', 'Search Everywhere');
  registerJBCommand(JETBRAINS_COMMANDS.FIND_ACTION, 'Find Action', 'Find and execute actions (Ctrl+Shift+A in JetBrains)', 'Find Action');
  registerJBCommand(JETBRAINS_COMMANDS.GO_TO_CLASS, 'Go to Class', 'Navigate to a class (Ctrl+N in JetBrains)', 'Go to Class');
  registerJBCommand(JETBRAINS_COMMANDS.GO_TO_FILE, 'Go to File', 'Navigate to a file (Ctrl+Shift+N in JetBrains)', 'Go to File');
  registerJBCommand(JETBRAINS_COMMANDS.GO_TO_SYMBOL, 'Go to Symbol', 'Navigate to a symbol (Ctrl+Alt+Shift+N in JetBrains)', 'Go to Symbol');
  registerJBCommand(JETBRAINS_COMMANDS.FIND_IN_PATH, 'Find in Path', 'Find text in all files (Ctrl+Shift+F in JetBrains)', 'Find in Path');
  registerJBCommand(JETBRAINS_COMMANDS.REPLACE_IN_PATH, 'Replace in Path', 'Find and replace in all files (Ctrl+Shift+R in JetBrains)', 'Replace in Path');
  registerJBCommand(JETBRAINS_COMMANDS.FIND_USAGES, 'Find Usages', 'Find all usages of symbol (Alt+F7 in JetBrains)', 'Find Usages');
  registerJBCommand(JETBRAINS_COMMANDS.BACK, 'Navigate Back', 'Navigate to previous location (Ctrl+Alt+Left in JetBrains)', 'Navigate Back');
  registerJBCommand(JETBRAINS_COMMANDS.FORWARD, 'Navigate Forward', 'Navigate to next location (Ctrl+Alt+Right in JetBrains)', 'Navigate Forward');
  registerJBCommand(JETBRAINS_COMMANDS.NEXT_TAB, 'Next Tab', 'Switch to next editor tab (Alt+Right in JetBrains)', 'Next Tab');
  registerJBCommand(JETBRAINS_COMMANDS.PREV_TAB, 'Previous Tab', 'Switch to previous editor tab (Alt+Left in JetBrains)', 'Previous Tab');
  registerJBCommand(JETBRAINS_COMMANDS.CLOSE_TAB, 'Close Tab', 'Close current editor tab (Ctrl+F4 in JetBrains)', 'Close Tab');
  registerJBCommand(JETBRAINS_COMMANDS.REFORMAT_CODE, 'Reformat Code', 'Reformat code (Ctrl+Alt+L in JetBrains)', 'Reformat Code');
  registerJBCommand(JETBRAINS_COMMANDS.OPTIMIZE_IMPORTS, 'Optimize Imports', 'Optimize import statements (Ctrl+Alt+O in JetBrains)', 'Optimize Imports');
  registerJBCommand(JETBRAINS_COMMANDS.GENERATE_CODE, 'Generate Code', 'Generate code (Alt+Insert in JetBrains)', 'Generate Code');
  registerJBCommand(JETBRAINS_COMMANDS.SURROUND_WITH, 'Surround With', 'Surround with template (Ctrl+Alt+T in JetBrains)', 'Surround With');
  registerJBCommand(JETBRAINS_COMMANDS.COMMENT_LINE, 'Comment Line', 'Toggle line comment (Ctrl+/ in JetBrains)', 'Toggle Comment');
  registerJBCommand(JETBRAINS_COMMANDS.DUPLICATE_LINE, 'Duplicate Line', 'Duplicate current line (Ctrl+D in JetBrains)', 'Duplicate Line');
  registerJBCommand(JETBRAINS_COMMANDS.DELETE_LINE, 'Delete Line', 'Delete current line (Ctrl+Y in JetBrains)', 'Delete Line');
  registerJBCommand(JETBRAINS_COMMANDS.MOVE_LINE_UP, 'Move Line Up', 'Move line up (Ctrl+Shift+Up in JetBrains)', 'Move Line Up');
  registerJBCommand(JETBRAINS_COMMANDS.MOVE_LINE_DOWN, 'Move Line Down', 'Move line down (Ctrl+Shift+Down in JetBrains)', 'Move Line Down');
  registerJBCommand(JETBRAINS_COMMANDS.MOVE_STATEMENT_UP, 'Move Statement Up', 'Move statement up (Ctrl+Shift+Alt+Up in JetBrains)', 'Move Statement Up');
  registerJBCommand(JETBRAINS_COMMANDS.MOVE_STATEMENT_DOWN, 'Move Statement Down', 'Move statement down (Ctrl+Shift+Alt+Down in JetBrains)', 'Move Statement Down');
  registerJBCommand(JETBRAINS_COMMANDS.RENAME, 'Rename', 'Rename symbol (Shift+F6 in JetBrains)', 'Rename');
  registerJBCommand(JETBRAINS_COMMANDS.EXTRACT_METHOD, 'Extract Method', 'Extract method (Ctrl+Alt+M in JetBrains)', 'Extract Method');
  registerJBCommand(JETBRAINS_COMMANDS.QUICK_FIX, 'Quick Fix', 'Show quick fixes (Alt+Enter in JetBrains)', 'Quick Fix');
  registerJBCommand(JETBRAINS_COMMANDS.NEXT_ERROR, 'Next Error', 'Go to next error (F2 in JetBrains)', 'Next Error');
  registerJBCommand(JETBRAINS_COMMANDS.PREV_ERROR, 'Previous Error', 'Go to previous error (Shift+F2 in JetBrains)', 'Previous Error');
  registerJBCommand(JETBRAINS_COMMANDS.TOGGLE_LINE_BREAKPOINT, 'Toggle Line Breakpoint', 'Toggle breakpoint (Ctrl+F8 in JetBrains)', 'Toggle Breakpoint');
  registerJBCommand(JETBRAINS_COMMANDS.DEBUG, 'Debug', 'Start debugging (Shift+F9 in JetBrains)', 'Debug');
  registerJBCommand(JETBRAINS_COMMANDS.RUN, 'Run', 'Run (Shift+F10 in JetBrains)', 'Run');
  registerJBCommand(JETBRAINS_COMMANDS.STOP, 'Stop', 'Stop execution (Ctrl+F2 in JetBrains)', 'Stop');
  registerJBCommand(JETBRAINS_COMMANDS.STEP_OVER, 'Step Over', 'Step over (F8 in JetBrains)', 'Step Over');
  registerJBCommand(JETBRAINS_COMMANDS.STEP_INTO, 'Step Into', 'Step into (F7 in JetBrains)', 'Step Into');
  registerJBCommand(JETBRAINS_COMMANDS.RESUME, 'Resume', 'Resume execution (Alt+F9 in JetBrains)', 'Resume');
  registerJBCommand(JETBRAINS_COMMANDS.FILE_STRUCTURE, 'File Structure', 'Show file structure (Ctrl+F12 in JetBrains)', 'File Structure');
  registerJBCommand(JETBRAINS_COMMANDS.TYPE_HIERARCHY, 'Type Hierarchy', 'Show type hierarchy (Ctrl+H in JetBrains)', 'Type Hierarchy');
  registerJBCommand(JETBRAINS_COMMANDS.METHOD_HIERARCHY, 'Method Hierarchy', 'Show method hierarchy (Ctrl+Shift+H in JetBrains)', 'Method Hierarchy');
  registerJBCommand(JETBRAINS_COMMANDS.CALL_HIERARCHY, 'Call Hierarchy', 'Show call hierarchy (Ctrl+Alt+H in JetBrains)', 'Call Hierarchy');
  registerJBCommand(JETBRAINS_COMMANDS.COMMIT, 'Commit', 'Commit changes (Ctrl+K in JetBrains)', 'Commit');
  registerJBCommand(JETBRAINS_COMMANDS.UPDATE_PROJECT, 'Update Project', 'Update project from VCS (Ctrl+T in JetBrains)', 'Update Project');
  registerJBCommand(JETBRAINS_COMMANDS.PUSH, 'Push', 'Push changes (Ctrl+Shift+K in JetBrains)', 'Push');
  registerJBCommand(JETBRAINS_COMMANDS.RECENT_FILES, 'Recent Files', 'Show recent files (Ctrl+E in JetBrains)', 'Recent Files');
  registerJBCommand(JETBRAINS_COMMANDS.RECENT_CHANGES, 'Recent Changes', 'Show recent changes (Alt+Shift+C in JetBrains)', 'Recent Changes');
  registerJBCommand(JETBRAINS_COMMANDS.SAVE_ALL, 'Save All', 'Save all (Ctrl+S in JetBrains)', 'Save All');
  registerJBCommand(JETBRAINS_COMMANDS.CLOSE_PROJECT, 'Close Project', 'Close current project (Ctrl+Shift+F4 in JetBrains)', 'Close Project');
  registerJBCommand(JETBRAINS_COMMANDS.SETTINGS, 'Settings', 'Open settings (Ctrl+Alt+S in JetBrains)', 'Settings');
  registerJBCommand(JETBRAINS_COMMANDS.PROJECT_STRUCTURE, 'Project Structure', 'Open project structure (Ctrl+Alt+Shift+S in JetBrains)', 'Project Structure');
  registerJBCommand(JETBRAINS_COMMANDS.FIND_WORD, 'Find Word', 'Find word at cursor (F3 in JetBrains)', 'Find Word');
  registerJBCommand(JETBRAINS_COMMANDS.REPLACE_WORD, 'Replace Word', 'Replace (Ctrl+R in JetBrains)', 'Replace');
  registerJBCommand(JETBRAINS_COMMANDS.SELECT_ALL_OCCURRENCES, 'Select All Occurrences', 'Select all occurrences (Ctrl+Alt+Shift+J in JetBrains)', 'Select All Occurrences');
  registerJBCommand(JETBRAINS_COMMANDS.ADD_SELECTION, 'Add Selection', 'Add selection for next occurrence (Alt+J in JetBrains)', 'Add Selection');
  registerJBCommand(JETBRAINS_COMMANDS.COLLAPSE_ALL, 'Collapse All', 'Collapse all code blocks (Ctrl+Shift+- in JetBrains)', 'Collapse All');
  registerJBCommand(JETBRAINS_COMMANDS.EXPAND_ALL, 'Expand All', 'Expand all code blocks (Ctrl+Shift++ in JetBrains)', 'Expand All');

  await plugin.app.registerWidget('jb_keymap_widget', WidgetLocation.RightSidebar, {
    dimensions: { height: 'auto', width: '100%' },
  });

  await plugin.app.toast('JetBrains Keymap plugin activated! Go to Settings > Keyboard Shortcuts to bind shortcuts.');
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);