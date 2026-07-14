/* @ds-bundle: {"format":3,"namespace":"StoryBlocksJournalDesignSystem_239fa7","components":[{"name":"Character","sourcePath":"components/brand/Character.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Sticker","sourcePath":"components/brand/Sticker.jsx"},{"name":"WordPrompt","sourcePath":"components/brand/WordPrompt.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Chip","sourcePath":"components/core/Chip.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"StreakTracker","sourcePath":"components/feedback/StreakTracker.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/brand/Character.jsx":"a8688f1edb1f","components/brand/Logo.jsx":"c137bc4d7acc","components/brand/Sticker.jsx":"d30c42cc9d68","components/brand/WordPrompt.jsx":"38020cc56309","components/core/Badge.jsx":"b717f49c1de2","components/core/Button.jsx":"ceafe552b6de","components/core/Card.jsx":"c2df9a18dcef","components/core/Chip.jsx":"aa73d9d1e6dd","components/core/IconButton.jsx":"fe0ac8f90e95","components/feedback/ProgressBar.jsx":"5d52eb70dc19","components/feedback/StreakTracker.jsx":"e2ed3026992a","components/feedback/Toast.jsx":"5d2781f11dc2","components/forms/Checkbox.jsx":"c4dba38d0f53","components/forms/Input.jsx":"27a42c6cb52c","components/forms/Radio.jsx":"7a0f909b6e5e","components/forms/Select.jsx":"cc8b8733a168","components/forms/Switch.jsx":"ea001d6dd184","components/forms/Textarea.jsx":"5cfe718a8d0f","components/navigation/Tabs.jsx":"c9e206297cc8","ui_kits/app/AppFrame.jsx":"8e53fc38ae34","ui_kits/app/MeScreen.jsx":"32d088d3e0cb","ui_kits/app/PromptScreen.jsx":"ea4eb3d6a423","ui_kits/app/RewardScreen.jsx":"c0fca14af0f5","ui_kits/app/StickerBookScreen.jsx":"8d54253807b5","ui_kits/app/WriteScreen.jsx":"d0cf80f4595e"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.StoryBlocksJournalDesignSystem_239fa7 = window.StoryBlocksJournalDesignSystem_239fa7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Character.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Character
 * Renders one of the block "friends" (the hand-drawn square characters).
 * Point `base` at wherever the /assets/characters folder lives relative to your page.
 *
 * There are ~77 poses named SB01…SB80. Pass a specific `id`, or leave it out
 * and pass `seed` to get a stable pick from the set.
 */
const IDS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '67', '68', '69', '70', '71', '72', '73', '74', '76', '77', '78', '79', '80'];
function Character({
  id,
  seed,
  size = 160,
  base = 'assets/characters',
  flip = false,
  style = {},
  alt = 'Story Blocks character',
  ...rest
}) {
  let pick = id;
  if (!pick) {
    const n = typeof seed === 'number' ? seed : seed ? String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0) : 0;
    pick = IDS[n % IDS.length];
  }
  pick = String(pick).padStart(2, '0');
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${base}/SB${pick}.png`,
    alt: alt,
    style: {
      display: 'block',
      width: size,
      height: 'auto',
      transform: flip ? 'scaleX(-1)' : undefined,
      ...style
    }
  }, rest));
}
Character.IDS = IDS;
Object.assign(__ds_scope, { Character });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Character.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Logo
 * The walking-book mascot logo. `variant`:
 *   "mascot"  → the full illustrated walking book (uses logo.png)
 *   "wordmark" → text-set "STORY BLOCKS / JOURNAL" in the display font (no image)
 */
function Logo({
  variant = 'mascot',
  height = 96,
  base = 'assets',
  style = {},
  ...rest
}) {
  if (variant === 'wordmark') {
    return /*#__PURE__*/React.createElement("span", _extends({
      style: {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        lineHeight: 0.82,
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        color: 'var(--sb-ink)',
        letterSpacing: '-0.01em',
        ...style
      }
    }, rest), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: height * 0.5
      }
    }, "STORY"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: height * 0.5
      }
    }, "BLOCKS"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: height * 0.18,
        letterSpacing: '0.22em',
        marginTop: height * 0.04
      }
    }, "JOURNAL"));
  }
  return /*#__PURE__*/React.createElement("img", _extends({
    src: `${base}/logo.png`,
    alt: "Story Blocks Journal",
    style: {
      display: 'block',
      height,
      width: 'auto',
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Sticker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Sticker
 * The reward-sticker frame: a tinted rounded tile with a thick WHITE die-cut border,
 * a soft drop shadow, and a jaunty tilt. Optionally pops a marker-font label underneath.
 */
function Sticker({
  children,
  tint = 'green',
  label,
  size = 120,
  tilt = -6,
  style = {},
  ...rest
}) {
  const tints = {
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)',
    yellow: 'var(--sb-yellow)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: tints[tint] || tints.green,
      border: '6px solid #fff',
      borderRadius: '22%',
      boxShadow: 'var(--shadow-soft), 0 0 0 2px rgba(35,31,32,0.12)',
      transform: `rotate(${tilt}deg)`,
      fontSize: size * 0.4,
      color: 'var(--sb-ink)',
      overflow: 'hidden'
    }
  }, children), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-marker)',
      fontSize: '1.15rem',
      color: 'var(--sb-ink)',
      textAlign: 'center',
      lineHeight: 1.1
    }
  }, label));
}
Object.assign(__ds_scope, { Sticker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Sticker.jsx", error: String((e && e.message) || e) }); }

// components/brand/WordPrompt.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — WordPrompt
 * The daily story-starter hero: a marker-font kicker over the three prompt words,
 * on a soft wash. This is the core product moment.
 */
function WordPrompt({
  kicker = 'Include these words in a story…',
  words = ['Whisper', 'Door', 'Secret'],
  tint = 'green',
  align = 'center',
  style = {},
  ...rest
}) {
  const washes = {
    green: 'var(--sb-wash-green)',
    sky: 'var(--sb-wash-sky)',
    pink: 'var(--sb-wash-pink)',
    peach: 'var(--sb-wash-peach)',
    purple: 'var(--sb-wash-purple)',
    lemon: 'var(--sb-wash-lemon)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: washes[tint] || washes.green,
      padding: 'var(--sp-6) var(--sp-5)',
      textAlign: align,
      fontFamily: 'var(--font-body)',
      color: 'var(--sb-ink)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-marker)',
      fontSize: '1.35rem',
      letterSpacing: '0.01em',
      color: 'var(--sb-ink)',
      marginBottom: 10
    }
  }, kicker), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
      lineHeight: 1.05,
      letterSpacing: '-0.01em'
    }
  }, words.join(', ')));
}
Object.assign(__ds_scope, { WordPrompt });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WordPrompt.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Badge
 * A little sticker-label, like the "New sticker!" tag. Tilts slightly for a hand-placed feel.
 */
function Badge({
  children,
  variant = 'ink',
  tilt = true,
  style = {},
  ...rest
}) {
  const fills = {
    ink: {
      bg: 'var(--sb-ink)',
      fg: '#fff',
      bd: 'var(--sb-ink)'
    },
    yellow: {
      bg: 'var(--sb-yellow)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    green: {
      bg: 'var(--sb-green)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    sky: {
      bg: 'var(--sb-sky)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    pink: {
      bg: 'var(--sb-pink)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    peach: {
      bg: 'var(--sb-peach)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    purple: {
      bg: 'var(--sb-purple)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    },
    paper: {
      bg: 'var(--sb-paper)',
      fg: 'var(--sb-ink)',
      bd: 'var(--sb-ink)'
    }
  };
  const f = fills[variant] || fills.ink;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: '0.8rem',
      letterSpacing: '0.01em',
      color: f.fg,
      background: f.bg,
      padding: '5px 12px',
      border: `2.5px solid ${f.bd}`,
      borderRadius: 'var(--radius-pill)',
      transform: tilt ? 'rotate(-3deg)' : 'none',
      boxShadow: 'var(--shadow-pop-sm)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Button
 * The signature chunky "sticker" button: thick ink outline, hard offset shadow,
 * generous rounding, and a satisfying press that nudges it into its own shadow.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  block = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  as = 'button',
  style = {},
  ...rest
}) {
  const fills = {
    primary: {
      bg: 'var(--sb-yellow)',
      fg: 'var(--sb-ink)'
    },
    green: {
      bg: 'var(--sb-green)',
      fg: 'var(--sb-ink)'
    },
    sky: {
      bg: 'var(--sb-sky)',
      fg: 'var(--sb-ink)'
    },
    pink: {
      bg: 'var(--sb-pink)',
      fg: 'var(--sb-ink)'
    },
    peach: {
      bg: 'var(--sb-peach)',
      fg: 'var(--sb-ink)'
    },
    purple: {
      bg: 'var(--sb-purple)',
      fg: 'var(--sb-ink)'
    },
    blue: {
      bg: 'var(--sb-blue)',
      fg: '#fff'
    },
    white: {
      bg: 'var(--sb-paper)',
      fg: 'var(--sb-ink)'
    },
    ghost: {
      bg: 'transparent',
      fg: 'var(--sb-ink)'
    }
  };
  const sizes = {
    sm: {
      pad: '8px 16px',
      fs: '0.95rem',
      gap: 6,
      radius: 'var(--radius-md)'
    },
    md: {
      pad: '12px 22px',
      fs: '1.05rem',
      gap: 8,
      radius: 'var(--radius-md)'
    },
    lg: {
      pad: '16px 30px',
      fs: '1.25rem',
      gap: 10,
      radius: 'var(--radius-lg)'
    }
  };
  const f = fills[variant] || fills.primary;
  const s = sizes[size] || sizes.md;
  const isGhost = variant === 'ghost';
  const base = {
    display: block ? 'flex' : 'inline-flex',
    width: block ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    fontFamily: 'var(--font-body)',
    fontWeight: 800,
    fontSize: s.fs,
    lineHeight: 1,
    letterSpacing: '0.01em',
    color: f.fg,
    background: f.bg,
    padding: s.pad,
    border: isGhost ? '3px solid transparent' : '3px solid var(--sb-ink)',
    borderRadius: s.radius,
    boxShadow: isGhost ? 'none' : 'var(--shadow-pop)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out), background var(--dur-fast)',
    WebkitTapHighlightColor: 'transparent',
    userSelect: 'none',
    ...style
  };
  const onDown = e => {
    if (disabled || isGhost) return;
    e.currentTarget.style.transform = 'translate(3px, 3px)';
    e.currentTarget.style.boxShadow = '1px 1px 0 0 var(--sb-ink)';
  };
  const reset = e => {
    if (disabled || isGhost) return;
    e.currentTarget.style.transform = '';
    e.currentTarget.style.boxShadow = 'var(--shadow-pop)';
  };
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: base,
    disabled: as === 'button' ? disabled : undefined,
    "aria-disabled": disabled || undefined,
    onMouseDown: onDown,
    onMouseUp: reset,
    onMouseLeave: reset,
    onTouchStart: onDown,
    onTouchEnd: reset
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      fontSize: '1.15em'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Card
 * Outlined panel with the signature hard pop-shadow. Tintable surface, optional tilt.
 */
function Card({
  children,
  tint = 'paper',
  pop = true,
  tilt = 0,
  padding = 'var(--sp-5)',
  style = {},
  ...rest
}) {
  const tints = {
    paper: 'var(--sb-paper)',
    cream: 'var(--sb-cream)',
    lemon: 'var(--sb-wash-lemon)',
    green: 'var(--sb-wash-green)',
    sky: 'var(--sb-wash-sky)',
    pink: 'var(--sb-wash-pink)',
    peach: 'var(--sb-wash-peach)',
    purple: 'var(--sb-wash-purple)',
    yellow: 'var(--sb-yellow)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: tints[tint] || tints.paper,
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: pop ? 'var(--shadow-pop)' : 'none',
      padding,
      transform: tilt ? `rotate(${tilt}deg)` : undefined,
      color: 'var(--sb-ink)',
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Chip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Chip
 * A rounded word-token, like the story-starter words ("Whisper", "Door", "Secret").
 * `selected` fills it in; otherwise it's a hollow ink outline.
 */
function Chip({
  children,
  color = 'yellow',
  selected = false,
  onClick,
  style = {},
  ...rest
}) {
  const colors = {
    yellow: 'var(--sb-yellow)',
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)'
  };
  const fill = colors[color] || colors.yellow;
  const clickable = typeof onClick === 'function';
  return /*#__PURE__*/React.createElement("span", _extends({
    role: clickable ? 'button' : undefined,
    tabIndex: clickable ? 0 : undefined,
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: '1rem',
      color: 'var(--sb-ink)',
      background: selected ? fill : 'var(--sb-paper)',
      padding: '8px 18px',
      border: '2.5px solid var(--sb-ink)',
      borderRadius: 'var(--radius-pill)',
      boxShadow: selected ? 'var(--shadow-pop-sm)' : 'none',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'background var(--dur-fast), box-shadow var(--dur-fast)',
      WebkitTapHighlightColor: 'transparent',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Chip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Chip.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — IconButton
 * A round or squircle icon-only button with the sticker outline + pop shadow.
 * Feed it an emoji, unicode glyph, or an <img> of a Lucide icon.
 */
function IconButton({
  children,
  variant = 'white',
  shape = 'round',
  size = 44,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const fills = {
    primary: 'var(--sb-yellow)',
    white: 'var(--sb-paper)',
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)'
  };
  const onDown = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translate(2px,2px)';
    e.currentTarget.style.boxShadow = '1px 1px 0 0 var(--sb-ink)';
  };
  const reset = e => {
    if (disabled) return;
    e.currentTarget.style.transform = '';
    e.currentTarget.style.boxShadow = 'var(--shadow-pop-sm)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    disabled: disabled,
    onMouseDown: onDown,
    onMouseUp: reset,
    onMouseLeave: reset,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      fontSize: size * 0.44,
      lineHeight: 1,
      color: 'var(--sb-ink)',
      background: fills[variant] || fills.white,
      border: '3px solid var(--sb-ink)',
      borderRadius: shape === 'round' ? '999px' : 'var(--radius-md)',
      boxShadow: 'var(--shadow-pop-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast)',
      WebkitTapHighlightColor: 'transparent',
      padding: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — ProgressBar
 * A chunky outlined track with a rounded brand-colour fill. Optional caption.
 */
function ProgressBar({
  value = 0,
  max = 100,
  color = 'green',
  label,
  height = 22,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fills = {
    yellow: 'var(--sb-yellow)',
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 700,
      fontSize: '0.9rem',
      color: 'var(--sb-ink)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, label), /*#__PURE__*/React.createElement("span", null, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height,
      background: 'var(--sb-paper)',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      right: 'auto',
      width: `${pct}%`,
      background: fills[color] || fills.green,
      borderRadius: 'var(--radius-pill)',
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/StreakTracker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — StreakTracker
 * A row of day-dots for reading/writing streaks. Completed days fill + pop;
 * today gets an ink ring; future days are hollow.
 */
function StreakTracker({
  total = 7,
  done = 0,
  today = null,
  color = 'yellow',
  labels = null,
  style = {},
  ...rest
}) {
  const fills = {
    yellow: 'var(--sb-yellow)',
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)'
  };
  const todayIdx = today == null ? done : today;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), Array.from({
    length: total
  }).map((_, i) => {
    const complete = i < done;
    const isToday = i === todayIdx;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 38,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: complete ? fills[color] || fills.yellow : 'var(--sb-paper)',
        border: isToday ? '4px solid var(--sb-ink)' : '3px solid var(--sb-ink)',
        borderRadius: '50%',
        boxShadow: complete ? 'var(--shadow-pop-sm)' : 'none',
        fontWeight: 900,
        fontSize: 16,
        color: 'var(--sb-ink)'
      }
    }, complete ? '★' : ''), labels && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '0.72rem',
        fontWeight: 700,
        color: 'var(--sb-muted)'
      }
    }, labels[i]));
  }));
}
Object.assign(__ds_scope, { StreakTracker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/StreakTracker.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Toast
 * A little sticker-style notification. Tinted, outlined, popped, with an optional glyph.
 */
function Toast({
  children,
  tint = 'green',
  icon = null,
  onClose,
  style = {},
  ...rest
}) {
  const tints = {
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)',
    yellow: 'var(--sb-yellow)',
    paper: 'var(--sb-paper)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      background: tints[tint] || tints.green,
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-pop)',
      padding: '12px 16px',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      color: 'var(--sb-ink)',
      ...style
    }
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '1.4rem',
      lineHeight: 1
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, children), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontWeight: 900,
      fontSize: 18,
      color: 'var(--sb-ink)',
      lineHeight: 1,
      padding: 2
    }
  }, "\u2715"));
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Story Blocks Journal — Checkbox
 * A chunky ticked box that fills with a brand colour when checked.
 */
function Checkbox({
  label,
  checked,
  defaultChecked,
  color = 'green',
  onChange,
  disabled = false,
  style = {},
  ...rest
}) {
  const [on, setOn] = React.useState(defaultChecked || false);
  const controlled = checked !== undefined;
  const isOn = controlled ? checked : on;
  const fills = {
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)',
    yellow: 'var(--sb-yellow)'
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      color: 'var(--sb-ink)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    onClick: () => {
      if (disabled) return;
      const next = !isOn;
      if (!controlled) setOn(next);
      onChange && onChange({
        target: {
          checked: next
        }
      });
    },
    style: {
      width: 28,
      height: 28,
      flex: '0 0 auto',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: isOn ? fills[color] || fills.green : 'var(--sb-paper)',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-sm)',
      boxShadow: isOn ? 'var(--shadow-pop-sm)' : 'none',
      transition: 'background var(--dur-fast), box-shadow var(--dur-fast)',
      fontSize: 18,
      fontWeight: 900,
      lineHeight: 1
    },
    role: "checkbox",
    "aria-checked": isOn,
    tabIndex: 0
  }, isOn ? '✓' : ''), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Input
 * Chunky outlined text field. Focus lifts it into a pop shadow.
 */
function Input({
  label,
  hint,
  error,
  id,
  style = {},
  ...rest
}) {
  const inputId = id || `sb-input-${Math.random().toString(36).slice(2, 8)}`;
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontWeight: 700,
      fontSize: '0.95rem',
      color: 'var(--sb-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--sb-ink)',
      background: 'var(--sb-paper)',
      padding: '12px 16px',
      border: `3px solid ${error ? 'var(--danger)' : 'var(--sb-ink)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? 'var(--shadow-pop-sm)' : 'none',
      outline: 'none',
      transition: 'box-shadow var(--dur-fast)'
    }
  }, rest)), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '0.85rem',
      color: error ? 'var(--danger)' : 'var(--sb-muted)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Radio group
 * A set of chunky radio pills. The chosen one fills with the group colour.
 */
function Radio({
  options = [],
  value,
  defaultValue,
  name,
  color = 'purple',
  onChange,
  style = {},
  ...rest
}) {
  const [val, setVal] = React.useState(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : val;
  const fills = {
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)',
    yellow: 'var(--sb-yellow)'
  };
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const groupName = name || `sb-radio-${Math.random().toString(36).slice(2, 8)}`;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "radiogroup",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, rest), norm.map(o => {
    const on = current === o.value;
    return /*#__PURE__*/React.createElement("label", {
      key: o.value,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'pointer',
        fontWeight: 600,
        color: 'var(--sb-ink)'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: groupName,
      checked: on,
      onChange: () => {
        if (!controlled) setVal(o.value);
        onChange && onChange(o.value);
      },
      style: {
        position: 'absolute',
        opacity: 0,
        width: 0,
        height: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 26,
        height: 26,
        flex: '0 0 auto',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--sb-paper)',
        border: '3px solid var(--sb-ink)',
        borderRadius: '50%',
        boxShadow: on ? 'var(--shadow-pop-sm)' : 'none',
        transition: 'box-shadow var(--dur-fast)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: on ? fills[color] || fills.purple : 'transparent',
        transition: 'background var(--dur-fast)'
      }
    })), o.label);
  }));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Select
 * A chunky outlined dropdown with a custom ink chevron.
 */
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const selId = id || `sb-select-${Math.random().toString(36).slice(2, 8)}`;
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontWeight: 700,
      fontSize: '0.95rem',
      color: 'var(--sb-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    defaultValue: defaultValue,
    onChange: onChange,
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      width: '100%',
      fontFamily: 'var(--font-body)',
      fontSize: '1rem',
      fontWeight: 600,
      color: 'var(--sb-ink)',
      background: 'var(--sb-paper)',
      padding: '12px 44px 12px 16px',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      outline: 'none'
    }
  }, rest), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 16,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      fontWeight: 900,
      fontSize: 14
    }
  }, "\u25BE")));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Switch
 * A chunky outlined toggle. The knob is an ink circle that slides across a brand fill.
 */
function Switch({
  checked,
  defaultChecked,
  onChange,
  color = 'green',
  label,
  disabled = false,
  style = {},
  ...rest
}) {
  const [on, setOn] = React.useState(defaultChecked || false);
  const controlled = checked !== undefined;
  const isOn = controlled ? checked : on;
  const fills = {
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)',
    yellow: 'var(--sb-yellow)'
  };
  const toggle = () => {
    if (disabled) return;
    const next = !isOn;
    if (!controlled) setOn(next);
    onChange && onChange(next);
  };
  return /*#__PURE__*/React.createElement("label", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      color: 'var(--sb-ink)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    onClick: toggle,
    role: "switch",
    "aria-checked": isOn,
    tabIndex: 0,
    style: {
      position: 'relative',
      width: 58,
      height: 32,
      flex: '0 0 auto',
      background: isOn ? fills[color] || fills.green : 'var(--sb-paper)',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-pill)',
      transition: 'background var(--dur)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: isOn ? 28 : 2,
      width: 22,
      height: 22,
      background: 'var(--sb-ink)',
      borderRadius: '50%',
      transition: 'left var(--dur) var(--ease-bounce)'
    }
  })), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Textarea
 * The story-writing box. Big, friendly, with an optional live word count.
 */
function Textarea({
  label,
  hint,
  rows = 6,
  showCount = false,
  value,
  defaultValue,
  style = {},
  onChange,
  ...rest
}) {
  const [val, setVal] = React.useState(defaultValue || '');
  const controlled = value !== undefined;
  const text = controlled ? value : val;
  const words = String(text).trim() ? String(text).trim().split(/\s+/).length : 0;
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-body)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontWeight: 700,
      fontSize: '0.95rem',
      color: 'var(--sb-ink)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    value: text,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    onChange: e => {
      if (!controlled) setVal(e.target.value);
      onChange && onChange(e);
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: '1.05rem',
      lineHeight: 1.55,
      fontWeight: 500,
      color: 'var(--sb-ink)',
      background: 'var(--sb-paper)',
      padding: '14px 16px',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: focus ? 'var(--shadow-pop-sm)' : 'none',
      outline: 'none',
      resize: 'vertical',
      transition: 'box-shadow var(--dur-fast)'
    }
  }, rest)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.85rem',
      color: 'var(--sb-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, hint), showCount && /*#__PURE__*/React.createElement("span", null, words, " word", words === 1 ? '' : 's')));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Story Blocks Journal — Tabs
 * Segmented sticker tabs (like "Writing Tips / Challenges"). The active tab
 * fills with a brand colour and pops; the track has the ink outline.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  color = 'yellow',
  style = {},
  ...rest
}) {
  const norm = tabs.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  const [val, setVal] = React.useState(defaultValue || norm[0] && norm[0].value);
  const controlled = value !== undefined;
  const current = controlled ? value : val;
  const fills = {
    yellow: 'var(--sb-yellow)',
    green: 'var(--sb-green)',
    sky: 'var(--sb-sky)',
    pink: 'var(--sb-pink)',
    peach: 'var(--sb-peach)',
    purple: 'var(--sb-purple)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: 'inline-flex',
      gap: 6,
      padding: 6,
      background: 'var(--sb-paper)',
      border: '3px solid var(--sb-ink)',
      borderRadius: 'var(--radius-pill)',
      ...style
    }
  }, rest), norm.map(t => {
    const on = current === t.value;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => {
        if (!controlled) setVal(t.value);
        onChange && onChange(t.value);
      },
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: '1rem',
        color: 'var(--sb-ink)',
        background: on ? fills[color] || fills.yellow : 'transparent',
        padding: '9px 20px',
        border: on ? '2.5px solid var(--sb-ink)' : '2.5px solid transparent',
        borderRadius: 'var(--radius-pill)',
        boxShadow: on ? 'var(--shadow-pop-sm)' : 'none',
        cursor: 'pointer',
        transition: 'background var(--dur-fast), box-shadow var(--dur-fast)',
        WebkitTapHighlightColor: 'transparent'
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppFrame.jsx
try { (() => {
// Story Blocks Journal — App UI kit: phone frame + status bar + bottom tab bar
const {
  useState
} = React;
function StatusBar({
  dark = true
}) {
  const c = dark ? 'var(--sb-ink)' : '#fff';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 26px 6px',
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      color: c,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", null, "14:36"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 7,
      alignItems: 'center',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("span", null, "\u25AE\u25AE\u25AE\u25AF"), /*#__PURE__*/React.createElement("span", null, "\u2726"), /*#__PURE__*/React.createElement("span", {
    style: {
      border: `2px solid ${c}`,
      borderRadius: 4,
      padding: '1px 3px',
      fontSize: 9
    }
  }, "\u25AE\u25AE")));
}
function TabBar({
  tab,
  onTab
}) {
  const items = [{
    id: 'today',
    label: 'Today',
    glyph: '✎'
  }, {
    id: 'write',
    label: 'Write',
    glyph: '✏︎'
  }, {
    id: 'stickers',
    label: 'Stickers',
    glyph: '★'
  }, {
    id: 'me',
    label: 'Me',
    glyph: '☺'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      borderTop: '3px solid var(--sb-ink)',
      background: 'var(--sb-paper)'
    }
  }, items.map(it => {
    const on = tab === it.id;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      onClick: () => onTab(it.id),
      style: {
        flex: 1,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: '10px 0 22px',
        fontFamily: 'var(--font-body)',
        fontWeight: 800,
        fontSize: 11,
        color: on ? 'var(--sb-ink)' : 'var(--sb-faint)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        lineHeight: 1,
        width: 40,
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: on ? 'var(--sb-yellow)' : 'transparent',
        border: on ? '2.5px solid var(--sb-ink)' : '2.5px solid transparent',
        borderRadius: 999,
        boxShadow: on ? 'var(--shadow-pop-sm)' : 'none'
      }
    }, it.glyph), it.label);
  }));
}
function AppFrame({
  children,
  tab,
  onTab,
  statusDark = true
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 810,
      position: 'relative',
      background: '#0f1116',
      borderRadius: 56,
      padding: 7,
      boxShadow: '0 30px 70px rgba(35,31,32,0.35)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 3,
      borderRadius: 53,
      border: '3px solid #3b6ea8',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: 49,
      overflow: 'hidden',
      background: 'var(--sb-cream)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 12,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 118,
      height: 30,
      background: 'var(--sb-ink)',
      borderRadius: 20,
      zIndex: 20
    }
  }), /*#__PURE__*/React.createElement(StatusBar, {
    dark: statusDark
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden'
    }
  }, children), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: onTab
  })));
}
Object.assign(window, {
  AppFrame,
  StatusBar,
  TabBar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppFrame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/MeScreen.jsx
try { (() => {
// Story Blocks Journal — App UI kit: Me / profile screen
const {
  Character,
  Card,
  Switch,
  Button,
  ProgressBar
} = window.StoryBlocksJournalDesignSystem_239fa7;
const MCH = '../../assets/characters';
function MeScreen() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 78,
      height: 78,
      borderRadius: '50%',
      background: 'var(--sb-wash-purple)',
      border: '3px solid var(--sb-ink)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-pop-sm)'
    }
  }, /*#__PURE__*/React.createElement(Character, {
    id: "40",
    size: 64,
    base: MCH
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1
    }
  }, "Maya"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sb-muted)',
      fontWeight: 700,
      marginTop: 4
    }
  }, "Level 3 Storyteller"))), /*#__PURE__*/React.createElement(Card, {
    tint: "green",
    style: {
      padding: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: 800,
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, "Stories written"), /*#__PURE__*/React.createElement("span", null, "27")), /*#__PURE__*/React.createElement(ProgressBar, {
    value: 27,
    max: 30,
    color: "yellow",
    label: "Next badge at 30"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-marker)',
      letterSpacing: '.01em',
      fontSize: '1.05rem',
      color: 'var(--sb-muted)',
      marginBottom: 10
    }
  }, "Settings"), /*#__PURE__*/React.createElement(Card, {
    tint: "paper",
    style: {
      padding: 6
    }
  }, [['Daily reminder', 'sky', true], ['Sound effects', 'peach', true], ['Grown-up controls', 'purple', false]].map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 12px',
      borderBottom: i < 2 ? '2px solid var(--sb-wash-purple)' : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, r[0]), /*#__PURE__*/React.createElement(Switch, {
    color: r[1],
    defaultChecked: r[2]
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "white",
    size: "md",
    block: true
  }, "Log out")));
}
Object.assign(window, {
  MeScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/MeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/PromptScreen.jsx
try { (() => {
// Story Blocks Journal — App UI kit: Daily prompt screen
const {
  Character,
  WordPrompt,
  Tabs,
  Button,
  Card,
  StreakTracker
} = window.StoryBlocksJournalDesignSystem_239fa7;
const CH = '../../assets/characters';
function PromptScreen({
  onStart
}) {
  const [focus, setFocus] = React.useState('Writing Tips');
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sb-wash-green)',
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: -6
    }
  }, /*#__PURE__*/React.createElement(Character, {
    id: "10",
    size: 150,
    base: CH
  })), /*#__PURE__*/React.createElement(WordPrompt, {
    kicker: "Include these words in a story\u2026",
    words: ['Whisper', 'Door', 'Secret'],
    tint: "green",
    style: {
      paddingTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 18px 26px'
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tint: "paper",
    style: {
      padding: 16,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontWeight: 800,
      marginBottom: 10
    }
  }, "Focus On"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    tabs: ['Writing Tips', 'Challenges'],
    color: "yellow",
    value: focus,
    onChange: setFocus
  }))), focus === 'Writing Tips' ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      color: 'var(--sb-ink)'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 800,
      margin: '0 0 4px'
    }
  }, "How do the three words fit together?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      lineHeight: 1.55
    }
  }, "Think about how these words connect. What kind of secret is hidden behind the door? Is it a good secret, a mystery, or something a little spooky? Who is whispering, and why?"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: '1.05rem',
      fontWeight: 800,
      margin: '0 0 4px'
    }
  }, "What is the secret?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      lineHeight: 1.55
    }
  }, "Is it something your character discovers, or something someone else is trying to keep hidden? What happens if it gets out?")) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    tint: "sky",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Mini challenge"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, "Write the whole story using only whispers \u2014 no shouting allowed!")), /*#__PURE__*/React.createElement(Card, {
    tint: "peach",
    style: {
      padding: 14
    }
  }, /*#__PURE__*/React.createElement("b", null, "Bonus"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, "End on a cliffhanger. Leave us wanting to know what's behind the door."))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    iconRight: "\u2192",
    onClick: onStart
  }, "Start writing")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 16,
      color: 'var(--sb-faint)',
      fontSize: 12,
      fontWeight: 700
    }
  }, "blockspublishingltd.com")));
}
Object.assign(window, {
  PromptScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/PromptScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/RewardScreen.jsx
try { (() => {
// Story Blocks Journal — App UI kit: Reward / streak-milestone screen (the "10 days" sunburst)
const {
  Character,
  Button,
  Logo
} = window.StoryBlocksJournalDesignSystem_239fa7;
const RCH = '../../assets/characters';
function RewardScreen({
  onDone
}) {
  const rays = Array.from({
    length: 24
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      minHeight: '100%',
      background: 'var(--sb-yellow)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '8px 20px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '34%',
      left: '50%',
      width: 900,
      height: 900,
      transform: 'translate(-50%,-50%)',
      pointerEvents: 'none'
    }
  }, rays.map((_, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 22,
      height: 460,
      background: i % 2 ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)',
      transformOrigin: 'top center',
      transform: `translate(-50%,0) rotate(${i * 15}deg)`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: '#fff',
      border: '2.5px solid var(--sb-ink)',
      borderRadius: 8,
      padding: '4px 12px',
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      transform: 'rotate(-4deg)',
      boxShadow: 'var(--shadow-pop-sm)'
    }
  }, "New sticker!"), /*#__PURE__*/React.createElement(Logo, {
    variant: "wordmark",
    height: 52
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      marginTop: 40,
      marginBottom: 8,
      filter: 'drop-shadow(0 10px 18px rgba(35,31,32,0.2))'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--sb-green)',
      border: '7px solid #fff',
      borderRadius: '24%',
      width: 150,
      height: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transform: 'rotate(-8deg)',
      boxShadow: '0 0 0 2px rgba(35,31,32,0.12)'
    }
  }, /*#__PURE__*/React.createElement(Character, {
    id: "60",
    size: 110,
    base: RCH
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '3rem',
      lineHeight: 1,
      marginTop: 18
    }
  }, "10 days"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: '1.1rem',
      marginTop: 12
    }
  }, "Share the good news!"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2,
      marginTop: 18,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "white",
    size: "lg",
    iconLeft: "\u2934"
  }, "Save Image"), /*#__PURE__*/React.createElement(Button, {
    variant: "blue",
    size: "lg",
    onClick: onDone
  }, "Done")));
}
Object.assign(window, {
  RewardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/RewardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/StickerBookScreen.jsx
try { (() => {
// Story Blocks Journal — App UI kit: Sticker book / streak screen
const {
  Character,
  Sticker,
  StreakTracker,
  Card
} = window.StoryBlocksJournalDesignSystem_239fa7;
const SCH = '../../assets/characters';
function StickerBookScreen() {
  const collected = [{
    id: '60',
    tint: 'green',
    label: 'Story Master'
  }, {
    id: '80',
    tint: 'pink',
    label: 'Rockstar'
  }, {
    id: '10',
    tint: 'sky',
    label: 'You did it!'
  }, {
    id: '01',
    tint: 'green',
    label: 'Cool'
  }];
  const locked = [{
    tint: 'peach'
  }, {
    tint: 'purple'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 18px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.6rem',
      marginBottom: 4
    }
  }, "My sticker book"), /*#__PURE__*/React.createElement("div", {
    style: {
      color: 'var(--sb-muted)',
      fontWeight: 700,
      marginBottom: 16
    }
  }, "4 collected \xB7 keep writing to unlock more!"), /*#__PURE__*/React.createElement(Card, {
    tint: "lemon",
    style: {
      padding: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-marker)',
      letterSpacing: '.01em',
      fontSize: '1.05rem',
      color: 'var(--sb-muted)',
      marginBottom: 10
    }
  }, "This week's streak"), /*#__PURE__*/React.createElement(StreakTracker, {
    total: 7,
    done: 5,
    color: "yellow",
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 18,
      justifyItems: 'center'
    }
  }, collected.map((s, i) => /*#__PURE__*/React.createElement(Sticker, {
    key: i,
    tint: s.tint,
    label: s.label,
    size: 92,
    tilt: i % 2 ? 5 : -6
  }, /*#__PURE__*/React.createElement(Character, {
    id: s.id,
    size: 64,
    base: SCH
  }))), locked.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: 'l' + i,
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 92,
      height: 92,
      borderRadius: '22%',
      border: '3px dashed var(--sb-faint)',
      background: 'var(--sb-paper)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 30,
      color: 'var(--sb-faint)'
    }
  }, "?"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-marker)',
      color: 'var(--sb-faint)'
    }
  }, "Locked")))));
}
Object.assign(window, {
  StickerBookScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/StickerBookScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/WriteScreen.jsx
try { (() => {
// Story Blocks Journal — App UI kit: Write screen
const {
  Chip,
  Textarea,
  Button,
  Badge
} = window.StoryBlocksJournalDesignSystem_239fa7;
function WriteScreen({
  onSave,
  onBack
}) {
  const [text, setText] = React.useState('Behind the old blue door, Maya heard a tiny whisper. "Come closer," it said. She held her breath — nobody was supposed to know the secret…');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 18px 26px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Back",
    style: {
      width: 40,
      height: 40,
      border: '3px solid var(--sb-ink)',
      background: 'var(--sb-paper)',
      borderRadius: 999,
      boxShadow: 'var(--shadow-pop-sm)',
      fontWeight: 900,
      fontSize: 18,
      cursor: 'pointer'
    }
  }, "\u2190"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: '1.3rem'
    }
  }, "Your story"), /*#__PURE__*/React.createElement(Badge, {
    variant: "yellow",
    tilt: false,
    style: {
      marginLeft: 'auto'
    }
  }, "Day 10")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-marker)',
      letterSpacing: '.01em',
      color: 'var(--sb-muted)',
      fontSize: '1.05rem',
      marginBottom: 8
    }
  }, "Use these words"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Chip, {
    color: "pink",
    selected: true
  }, "Whisper \u2713"), /*#__PURE__*/React.createElement(Chip, {
    color: "sky",
    selected: true
  }, "Door \u2713"), /*#__PURE__*/React.createElement(Chip, {
    color: "green"
  }, "Secret")), /*#__PURE__*/React.createElement(Textarea, {
    rows: 9,
    value: text,
    onChange: e => setText(e.target.value),
    showCount: true,
    hint: "Have fun with it!"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "white",
    size: "lg",
    style: {
      flex: '0 0 auto'
    }
  }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    block: true,
    iconRight: "\u2605",
    onClick: onSave,
    disabled: words < 3
  }, "Finish story")));
}
Object.assign(window, {
  WriteScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/WriteScreen.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Character = __ds_scope.Character;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Sticker = __ds_scope.Sticker;

__ds_ns.WordPrompt = __ds_scope.WordPrompt;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Chip = __ds_scope.Chip;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StreakTracker = __ds_scope.StreakTracker;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
