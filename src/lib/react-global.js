// The Story Blocks design-system bundle (public/_ds/.../_ds_bundle.js) is a
// classic global script that references `React` (createElement + hooks) lazily,
// at component-render time. Expose the npm React on window so those components
// resolve the same instance this app uses.
import React from 'react';

if (typeof window !== 'undefined') {
  window.React = React;
}

export default React;
