import { rgba } from '../../shared/color';

let RESPONSE_COLOUR = rgba([0, 0, 0, 0]);

function findAndSendColour() {
  if (!document.fullscreenElement) {
    RESPONSE_COLOUR = rgba([0, 0, 0, 0]);
    if (document.visibilityState == 'visible')
      browser.runtime.sendMessage({ reason: 'COLOUR_UPDATE', colour: RESPONSE_COLOUR });
  }
}

let onThemeColourChange = new MutationObserver(findAndSendColour);
if (document.querySelector('meta[name=theme-color]') !== null)
  onThemeColourChange.observe(document.querySelector('meta[name=theme-color]')!, {
    attributes: true,
  });

console.log(onThemeColourChange);
