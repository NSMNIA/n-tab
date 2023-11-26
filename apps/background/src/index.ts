// import { dimColor } from './color';
// import { Color } from './types';

// let adaptive_themes = {
//   dark: {
//     colors: {
//       // Tabbar & tab
//       frame: 'rgb(28, 27, 34)',
//       frame_inactive: 'rgb(28, 27, 34)',
//       tab_selected: 'rgba(255, 255, 255, 0.15)',
//       ntp_background: 'rgb(28, 27, 34)',
//       // Toolbar
//       toolbar: 'rgba(0, 0, 0, 0)',
//       toolbar_top_separator: 'rgba(0, 0, 0, 0)',
//       toolbar_bottom_separator: 'rgba(255, 255, 255, 0)',
//       // URL bar
//       toolbar_field: 'rgb(39, 38, 45)',
//       toolbar_field_border: 'rgba(0, 0, 0, 0)',
//       toolbar_field_focus: 'rgb(39, 38, 45)',
//       toolbar_field_border_focus: 'rgb(70, 118, 160)',
//       // Sidebar
//       sidebar: 'rgb(28, 27, 34)',
//       sidebar_border: 'rgba(0, 0, 0, 0)',
//       // Popup
//       popup: 'rgb(28, 27, 34)',
//       popup_border: 'rgba(0, 0, 0, 0)',
//       // Static
//       tab_background_text: 'rgb(225, 225, 225)',
//       tab_loading: 'rgba(0, 0, 0, 0)',
//       tab_line: 'rgba(0, 0, 0, 0)',
//       ntp_text: 'rgb(255, 255, 255)',
//       toolbar_text: 'rgb(255, 255, 255)',
//       toolbar_field_text: 'rgb(255, 255, 255)',
//       popup_text: 'rgb(225, 225, 225)',
//       sidebar_text: 'rgb(225, 225, 225)',
//       button_background_active: 'rgba(255, 255, 255, 0.15)',
//       button_background_hover: 'rgba(255, 255, 255, 0.10)',
//       icons: 'rgb(225, 225, 225)',
//     },
//     properties: {
//       color_scheme: 'dark',
//       content_color_scheme: 'auto',
//     },
//   },
// };

init();

browser.tabs.onUpdated.addListener(update); // When new tab is opened / reloaded
browser.tabs.onActivated.addListener(update); // When switch tabs
browser.tabs.onAttached.addListener(update); // When a tab is attatched to a window
browser.windows.onFocusChanged.addListener(update); // When a new window is opened

function init() {
  update();
}

function update() {
  browser.tabs.query({ active: true, status: 'complete' }).then((tabs) => {
    tabs.forEach(updateEachWindow);
  });
}

function updateEachWindow(tab: browser.tabs.Tab) {
  let windowId = tab.windowId;
  browser.windows.get(windowId!).then((window) => {
    console.log({ window });
  });
}

// function applyTheme(windowId: number, theme: browser._manifest.ThemeType) {
//   browser.theme.update(windowId, theme);
// }
