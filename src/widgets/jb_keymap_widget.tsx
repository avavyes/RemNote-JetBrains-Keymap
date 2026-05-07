import { usePlugin, renderWidget } from '@remnote/plugin-sdk';

interface ShortcutGroup {
  name: string;
  shortcuts: { name: string; jbShortcut: string; remnoteAction: string }[];
}

const SHORTCUT_GROUPS: ShortcutGroup[] = [
  {
    name: 'Search & Navigation',
    shortcuts: [
      { name: 'Search Everywhere', jbShortcut: 'Double Shift', remnoteAction: 'Quick Capture' },
      { name: 'Find Action', jbShortcut: 'Ctrl+Shift+A', remnoteAction: 'Quick Capture' },
      { name: 'Go to Class', jbShortcut: 'Ctrl+N', remnoteAction: 'Quick Capture' },
      { name: 'Go to File', jbShortcut: 'Ctrl+Shift+N', remnoteAction: 'Quick Capture' },
      { name: 'Go to Symbol', jbShortcut: 'Ctrl+Alt+Shift+N', remnoteAction: 'Quick Capture' },
      { name: 'Find in Path', jbShortcut: 'Ctrl+Shift+F', remnoteAction: 'Quick Capture' },
      { name: 'Find Usages', jbShortcut: 'Alt+F7', remnoteAction: 'Quick Capture' },
      { name: 'Recent Files', jbShortcut: 'Ctrl+E', remnoteAction: 'Quick Capture' },
      { name: 'Navigate Back', jbShortcut: 'Ctrl+Alt+Left', remnoteAction: 'Navigate Back' },
      { name: 'Navigate Forward', jbShortcut: 'Ctrl+Alt+Right', remnoteAction: 'Navigate Forward' },
    ],
  },
  {
    name: 'Editor Basic',
    shortcuts: [
      { name: 'Duplicate Line', jbShortcut: 'Ctrl+D', remnoteAction: 'Duplicate Rem' },
      { name: 'Delete Line', jbShortcut: 'Ctrl+Y', remnoteAction: 'Delete Rem' },
      { name: 'Move Line Up', jbShortcut: 'Ctrl+Shift+Up', remnoteAction: 'Move Rem Up' },
      { name: 'Move Line Down', jbShortcut: 'Ctrl+Shift+Down', remnoteAction: 'Move Rem Down' },
      { name: 'Comment Line', jbShortcut: 'Ctrl+/', remnoteAction: 'Quick Capture' },
      { name: 'Reformat Code', jbShortcut: 'Ctrl+Alt+L', remnoteAction: 'Quick Capture' },
      { name: 'Optimize Imports', jbShortcut: 'Ctrl+Alt+O', remnoteAction: 'Quick Capture' },
    ],
  },
  {
    name: 'Refactoring',
    shortcuts: [
      { name: 'Rename', jbShortcut: 'Shift+F6', remnoteAction: 'Quick Capture' },
      { name: 'Extract Method', jbShortcut: 'Ctrl+Alt+M', remnoteAction: 'Quick Capture' },
      { name: 'Quick Fix', jbShortcut: 'Alt+Enter', remnoteAction: 'Quick Capture' },
      { name: 'Surround With', jbShortcut: 'Ctrl+Alt+T', remnoteAction: 'Quick Capture' },
    ],
  },
  {
    name: 'View & Window',
    shortcuts: [
      { name: 'Next Tab', jbShortcut: 'Alt+Right', remnoteAction: 'Focus Next Pane' },
      { name: 'Previous Tab', jbShortcut: 'Alt+Left', remnoteAction: 'Focus Previous Pane' },
      { name: 'Close Tab', jbShortcut: 'Ctrl+F4', remnoteAction: 'Close Tab' },
      { name: 'File Structure', jbShortcut: 'Ctrl+F12', remnoteAction: 'Quick Capture' },
      { name: 'Settings', jbShortcut: 'Ctrl+Alt+S', remnoteAction: 'Open Settings' },
      { name: 'Collapse All', jbShortcut: 'Ctrl+Shift+-', remnoteAction: 'Quick Capture' },
      { name: 'Expand All', jbShortcut: 'Ctrl+Shift++', remnoteAction: 'Quick Capture' },
    ],
  },
  {
    name: 'VCS & Debug',
    shortcuts: [
      { name: 'Commit', jbShortcut: 'Ctrl+K', remnoteAction: 'Quick Capture' },
      { name: 'Update Project', jbShortcut: 'Ctrl+T', remnoteAction: 'Quick Capture' },
      { name: 'Push', jbShortcut: 'Ctrl+Shift+K', remnoteAction: 'Quick Capture' },
      { name: 'Recent Changes', jbShortcut: 'Alt+Shift+C', remnoteAction: 'Quick Capture' },
      { name: 'Toggle Breakpoint', jbShortcut: 'Ctrl+F8', remnoteAction: 'Quick Capture' },
      { name: 'Run', jbShortcut: 'Shift+F10', remnoteAction: 'Quick Capture' },
      { name: 'Debug', jbShortcut: 'Shift+F9', remnoteAction: 'Quick Capture' },
    ],
  },
];

function JBKeymapWidget() {
  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-screen overflow-y-auto">
      <h2 className="text-lg font-bold mb-3 text-gray-800 dark:text-white">
        JetBrains Keymap
      </h2>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Configure shortcuts in Settings → Keyboard Shortcuts
      </p>

      {SHORTCUT_GROUPS.map((group) => (
        <div key={group.name} className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
            {group.name}
          </h3>
          <div className="space-y-1">
            {group.shortcuts.map((shortcut) => (
              <div
                key={shortcut.name}
                className="flex justify-between items-center text-xs py-1 px-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-300">{shortcut.name}</span>
                <span className="font-mono bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-gray-800 dark:text-gray-200">
                  {shortcut.jbShortcut}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900 rounded text-xs text-blue-700 dark:text-blue-300">
        <p className="font-semibold mb-1">Tip:</p>
        <p>Go to Settings → Keyboard Shortcuts to bind these commands to your preferred JetBrains-style shortcuts.</p>
      </div>
    </div>
  );
}

renderWidget(JBKeymapWidget);