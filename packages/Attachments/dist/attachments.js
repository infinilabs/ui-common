(function(){"use strict";try{if(typeof document<"u"){var n=document.createElement("style");n.appendChild(document.createTextNode("*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.absolute{position:absolute}.relative{position:relative}.right-2\\.5{right:.625rem}.top-2\\.5{top:.625rem}.-m-1\\.5{margin:-.375rem}.box-border{box-sizing:border-box}.size-10{width:2.5rem;height:2.5rem}.min-w-10{min-width:2.5rem}.w-1\\/3{width:33.3333333333%}.flex{display:flex}.inline-flex{display:inline-flex}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.cursor-pointer{cursor:pointer}.items-center{align-items:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.overflow-hidden{overflow:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-xl{border-radius:.75rem}.bg-black\\/4{background-color:#0000000a}.dark .dark\\:bg-white\\/8{background-color:#ffffff14}.p-1\\.5{padding:.375rem}.p-3{padding:.75rem}.py{padding-top:1rem;padding-bottom:1rem}.pl-2{padding-left:.5rem}.pr{padding-right:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.opacity-0{opacity:0}.group:hover .group-hover\\:opacity-100{opacity:1}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}")),document.head.appendChild(n)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { jsx as h, jsxs as x, Fragment as U } from "react/jsx-runtime";
import * as m from "react";
import A, { createContext as fe, useContext as he, useEffect as G, useMemo as de } from "react";
import { Typography as ge, Tooltip as me } from "antd";
const pe = (t) => {
  const { extname: e, ...n } = t;
  return /* @__PURE__ */ h("svg", { ...n, children: /* @__PURE__ */ h("use", { xlinkHref: `#${(() => {
    switch (e) {
      case "ts":
        return "font_file_typescript";
      case "js":
        return "font_file_javascript";
      case "rs":
        return "font_file_rustscript1";
      case "xml":
        return "font_file_xml";
      case "yaml":
      case "yml":
        return "font_file_yaml";
      case "go":
        return "font_file_golang";
      case "php":
        return "font_file_php";
      case "css":
        return "font_file_css";
      case "jsx":
      case "tsx":
        return "font_file_react";
      case "svg":
        return "font_file_svg";
      case "rb":
        return "font_file_ruby";
      case "html":
      case "htm":
        return "font_file_html";
      case "epub":
        return "font_file_epub";
      case "java":
        return "font_file_java";
      case "sql":
        return "font_file_sql";
      case "vue":
        return "font_file_vue";
      case "json":
        return "font_file_json";
      case "py":
        return "font_file_python";
      case "sass":
      case "scss":
        return "font_file_sass";
      case "toml":
        return "font_file_toml";
      case "c":
      case "cpp":
      case "cc":
      case "cxx":
      case "h":
      case "hpp":
        return "font_file_csource";
      case "md":
        return "font_file_markdown";
      case "txt":
        return "font_file_txt";
      case "xlsx":
      case "xls":
        return "font_file_spreadsheet_excel";
      case "csv":
        return "font_file_csv";
      case "pptx":
      case "ppt":
        return "font_file_presentation_powerpoint";
      case "mp4":
      case "avi":
      case "mov":
      case "wmv":
      case "flv":
      case "webm":
      case "mkv":
        return "font_file_video";
      case "png":
      case "jpg":
      case "jpeg":
      case "gif":
      case "bmp":
      case "webp":
      case "ico":
        return "font_file_image";
      case "zip":
      case "rar":
      case "7z":
      case "tar":
      case "gz":
        return "font_file_zip";
      case "pdf":
        return "font_file_document_pdf";
      case "docx":
      case "doc":
        return "font_file_document_word";
      case "mp3":
      case "wav":
      case "flac":
      case "aac":
      case "ogg":
      case "wma":
        return "font_file_audio";
      case "ai":
        return "font_file_adobe_ai";
      case "xd":
        return "font_file_adobe_xd";
      case "fl":
        return "font_file_adobe_fl";
      case "pr":
      case "pre":
        return "font_file_adobe_pr";
      case "lr":
        return "font_file_adobe_lr";
      case "ae":
        return "font_file_adobe_ae";
      case "id":
      case "indd":
        return "font_file_adobe_id";
      case "dmg":
        return "font_file_dmg";
      case "au":
        return "font_file_adobe_au";
      case "psd":
        return "font_file_adobe_psd";
      case "sketch":
        return "font_file_sketch";
      case "sh":
      case "bash":
      case "zsh":
      case "fish":
        return "font_file_erminalsettings1";
      default:
        return "font_file_unknown";
    }
  })()}` }) });
}, Y = /* @__PURE__ */ fe({});
function K(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (n = K(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function J() {
  for (var t, e, n = 0, r = "", s = arguments.length; n < s; n++) (t = arguments[n]) && (e = K(t)) && (r && (r += " "), r += e);
  return r;
}
const be = {
  aliceblue: "9ehhb",
  antiquewhite: "9sgk7",
  aqua: "1ekf",
  aquamarine: "4zsno",
  azure: "9eiv3",
  beige: "9lhp8",
  bisque: "9zg04",
  black: "0",
  blanchedalmond: "9zhe5",
  blue: "73",
  blueviolet: "5e31e",
  brown: "6g016",
  burlywood: "8ouiv",
  cadetblue: "3qba8",
  chartreuse: "4zshs",
  chocolate: "87k0u",
  coral: "9yvyo",
  cornflowerblue: "3xael",
  cornsilk: "9zjz0",
  crimson: "8l4xo",
  cyan: "1ekf",
  darkblue: "3v",
  darkcyan: "rkb",
  darkgoldenrod: "776yz",
  darkgray: "6mbhl",
  darkgreen: "jr4",
  darkgrey: "6mbhl",
  darkkhaki: "7ehkb",
  darkmagenta: "5f91n",
  darkolivegreen: "3bzfz",
  darkorange: "9yygw",
  darkorchid: "5z6x8",
  darkred: "5f8xs",
  darksalmon: "9441m",
  darkseagreen: "5lwgf",
  darkslateblue: "2th1n",
  darkslategray: "1ugcv",
  darkslategrey: "1ugcv",
  darkturquoise: "14up",
  darkviolet: "5rw7n",
  deeppink: "9yavn",
  deepskyblue: "11xb",
  dimgray: "442g9",
  dimgrey: "442g9",
  dodgerblue: "16xof",
  firebrick: "6y7tu",
  floralwhite: "9zkds",
  forestgreen: "1cisi",
  fuchsia: "9y70f",
  gainsboro: "8m8kc",
  ghostwhite: "9pq0v",
  goldenrod: "8j4f4",
  gold: "9zda8",
  gray: "50i2o",
  green: "pa8",
  greenyellow: "6senj",
  grey: "50i2o",
  honeydew: "9eiuo",
  hotpink: "9yrp0",
  indianred: "80gnw",
  indigo: "2xcoy",
  ivory: "9zldc",
  khaki: "9edu4",
  lavenderblush: "9ziet",
  lavender: "90c8q",
  lawngreen: "4vk74",
  lemonchiffon: "9zkct",
  lightblue: "6s73a",
  lightcoral: "9dtog",
  lightcyan: "8s1rz",
  lightgoldenrodyellow: "9sjiq",
  lightgray: "89jo3",
  lightgreen: "5nkwg",
  lightgrey: "89jo3",
  lightpink: "9z6wx",
  lightsalmon: "9z2ii",
  lightseagreen: "19xgq",
  lightskyblue: "5arju",
  lightslategray: "4nwk9",
  lightslategrey: "4nwk9",
  lightsteelblue: "6wau6",
  lightyellow: "9zlcw",
  lime: "1edc",
  limegreen: "1zcxe",
  linen: "9shk6",
  magenta: "9y70f",
  maroon: "4zsow",
  mediumaquamarine: "40eju",
  mediumblue: "5p",
  mediumorchid: "79qkz",
  mediumpurple: "5r3rv",
  mediumseagreen: "2d9ip",
  mediumslateblue: "4tcku",
  mediumspringgreen: "1di2",
  mediumturquoise: "2uabw",
  mediumvioletred: "7rn9h",
  midnightblue: "z980",
  mintcream: "9ljp6",
  mistyrose: "9zg0x",
  moccasin: "9zfzp",
  navajowhite: "9zest",
  navy: "3k",
  oldlace: "9wq92",
  olive: "50hz4",
  olivedrab: "472ub",
  orange: "9z3eo",
  orangered: "9ykg0",
  orchid: "8iu3a",
  palegoldenrod: "9bl4a",
  palegreen: "5yw0o",
  paleturquoise: "6v4ku",
  palevioletred: "8k8lv",
  papayawhip: "9zi6t",
  peachpuff: "9ze0p",
  peru: "80oqn",
  pink: "9z8wb",
  plum: "8nba5",
  powderblue: "6wgdi",
  purple: "4zssg",
  rebeccapurple: "3zk49",
  red: "9y6tc",
  rosybrown: "7cv4f",
  royalblue: "2jvtt",
  saddlebrown: "5fmkz",
  salmon: "9rvci",
  sandybrown: "9jn1c",
  seagreen: "1tdnb",
  seashell: "9zje6",
  sienna: "6973h",
  silver: "7ir40",
  skyblue: "5arjf",
  slateblue: "45e4t",
  slategray: "4e100",
  slategrey: "4e100",
  snow: "9zke2",
  springgreen: "1egv",
  steelblue: "2r1kk",
  tan: "87yx8",
  teal: "pds",
  thistle: "8ggk8",
  tomato: "9yqfb",
  turquoise: "2j4r4",
  violet: "9b10u",
  wheat: "9ld4j",
  white: "9zldr",
  whitesmoke: "9lhpx",
  yellow: "9zl6o",
  yellowgreen: "61fzm"
}, f = Math.round;
function S(t, e) {
  const n = t.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = n.map((s) => parseFloat(s));
  for (let s = 0; s < 3; s += 1)
    r[s] = e(r[s] || 0, n[s] || "", s);
  return n[3] ? r[3] = n[3].includes("%") ? r[3] / 100 : r[3] : r[3] = 1, r;
}
const I = (t, e, n) => n === 0 ? t : t / 100;
function _(t, e) {
  const n = e || 255;
  return t > n ? n : t < 0 ? 0 : t;
}
class p {
  /**
   * All FastColor objects are valid. So isValid is always true. This property is kept to be compatible with TinyColor.
   */
  isValid = !0;
  /**
   * Red, R in RGB
   */
  r = 0;
  /**
   * Green, G in RGB
   */
  g = 0;
  /**
   * Blue, B in RGB
   */
  b = 0;
  /**
   * Alpha/Opacity, A in RGBA/HSLA
   */
  a = 1;
  // HSV privates
  _h;
  _s;
  _l;
  _v;
  // intermediate variables to calculate HSL/HSV
  _max;
  _min;
  _brightness;
  constructor(e) {
    function n(r) {
      return r[0] in e && r[1] in e && r[2] in e;
    }
    if (e) if (typeof e == "string") {
      let s = function(i) {
        return r.startsWith(i);
      };
      const r = e.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(r))
        this.fromHexString(r);
      else if (s("rgb"))
        this.fromRgbString(r);
      else if (s("hsl"))
        this.fromHslString(r);
      else if (s("hsv") || s("hsb"))
        this.fromHsvString(r);
      else {
        const i = be[r.toLowerCase()];
        i && this.fromHexString(
          // Convert 36 hex to 16 hex
          parseInt(i, 36).toString(16).padStart(6, "0")
        );
      }
    } else if (e instanceof p)
      this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a, this._h = e._h, this._s = e._s, this._l = e._l, this._v = e._v;
    else if (n("rgb"))
      this.r = _(e.r), this.g = _(e.g), this.b = _(e.b), this.a = typeof e.a == "number" ? _(e.a, 1) : 1;
    else if (n("hsl"))
      this.fromHsl(e);
    else if (n("hsv"))
      this.fromHsv(e);
    else
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(e));
  }
  // ======================= Setter =======================
  setR(e) {
    return this._sc("r", e);
  }
  setG(e) {
    return this._sc("g", e);
  }
  setB(e) {
    return this._sc("b", e);
  }
  setA(e) {
    return this._sc("a", e, 1);
  }
  setHue(e) {
    const n = this.toHsv();
    return n.h = e, this._c(n);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function e(i) {
      const o = i / 255;
      return o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4);
    }
    const n = e(this.r), r = e(this.g), s = e(this.b);
    return 0.2126 * n + 0.7152 * r + 0.0722 * s;
  }
  getHue() {
    if (typeof this._h > "u") {
      const e = this.getMax() - this.getMin();
      e === 0 ? this._h = 0 : this._h = f(60 * (this.r === this.getMax() ? (this.g - this.b) / e + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / e + 2 : (this.r - this.g) / e + 4));
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s > "u") {
      const e = this.getMax() - this.getMin();
      e === 0 ? this._s = 0 : this._s = e / this.getMax();
    }
    return this._s;
  }
  getLightness() {
    return typeof this._l > "u" && (this._l = (this.getMax() + this.getMin()) / 510), this._l;
  }
  getValue() {
    return typeof this._v > "u" && (this._v = this.getMax() / 255), this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    return typeof this._brightness > "u" && (this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3), this._brightness;
  }
  // ======================== Func ========================
  darken(e = 10) {
    const n = this.getHue(), r = this.getSaturation();
    let s = this.getLightness() - e / 100;
    return s < 0 && (s = 0), this._c({
      h: n,
      s: r,
      l: s,
      a: this.a
    });
  }
  lighten(e = 10) {
    const n = this.getHue(), r = this.getSaturation();
    let s = this.getLightness() + e / 100;
    return s > 1 && (s = 1), this._c({
      h: n,
      s: r,
      l: s,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(e, n = 50) {
    const r = this._c(e), s = n / 100, i = (a) => (r[a] - this[a]) * s + this[a], o = {
      r: f(i("r")),
      g: f(i("g")),
      b: f(i("b")),
      a: f(i("a") * 100) / 100
    };
    return this._c(o);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(e = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, e);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(e = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, e);
  }
  onBackground(e) {
    const n = this._c(e), r = this.a + n.a * (1 - this.a), s = (i) => f((this[i] * this.a + n[i] * n.a * (1 - this.a)) / r);
    return this._c({
      r: s("r"),
      g: s("g"),
      b: s("b"),
      a: r
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(e) {
    return this.r === e.r && this.g === e.g && this.b === e.b && this.a === e.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let e = "#";
    const n = (this.r || 0).toString(16);
    e += n.length === 2 ? n : "0" + n;
    const r = (this.g || 0).toString(16);
    e += r.length === 2 ? r : "0" + r;
    const s = (this.b || 0).toString(16);
    if (e += s.length === 2 ? s : "0" + s, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const i = f(this.a * 255).toString(16);
      e += i.length === 2 ? i : "0" + i;
    }
    return e;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const e = this.getHue(), n = f(this.getSaturation() * 100), r = f(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${e},${n}%,${r}%,${this.a})` : `hsl(${e},${n}%,${r}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(e, n, r) {
    const s = this.clone();
    return s[e] = _(n, r), s;
  }
  _c(e) {
    return new this.constructor(e);
  }
  getMax() {
    return typeof this._max > "u" && (this._max = Math.max(this.r, this.g, this.b)), this._max;
  }
  getMin() {
    return typeof this._min > "u" && (this._min = Math.min(this.r, this.g, this.b)), this._min;
  }
  fromHexString(e) {
    const n = e.replace("#", "");
    function r(s, i) {
      return parseInt(n[s] + n[i || s], 16);
    }
    n.length < 6 ? (this.r = r(0), this.g = r(1), this.b = r(2), this.a = n[3] ? r(3) / 255 : 1) : (this.r = r(0, 1), this.g = r(2, 3), this.b = r(4, 5), this.a = n[6] ? r(6, 7) / 255 : 1);
  }
  fromHsl({
    h: e,
    s: n,
    l: r,
    a: s
  }) {
    if (this._h = e % 360, this._s = n, this._l = r, this.a = typeof s == "number" ? s : 1, n <= 0) {
      const g = f(r * 255);
      this.r = g, this.g = g, this.b = g;
    }
    let i = 0, o = 0, a = 0;
    const c = e / 60, u = (1 - Math.abs(2 * r - 1)) * n, l = u * (1 - Math.abs(c % 2 - 1));
    c >= 0 && c < 1 ? (i = u, o = l) : c >= 1 && c < 2 ? (i = l, o = u) : c >= 2 && c < 3 ? (o = u, a = l) : c >= 3 && c < 4 ? (o = l, a = u) : c >= 4 && c < 5 ? (i = l, a = u) : c >= 5 && c < 6 && (i = u, a = l);
    const d = r - u / 2;
    this.r = f((i + d) * 255), this.g = f((o + d) * 255), this.b = f((a + d) * 255);
  }
  fromHsv({
    h: e,
    s: n,
    v: r,
    a: s
  }) {
    this._h = e % 360, this._s = n, this._v = r, this.a = typeof s == "number" ? s : 1;
    const i = f(r * 255);
    if (this.r = i, this.g = i, this.b = i, n <= 0)
      return;
    const o = e / 60, a = Math.floor(o), c = o - a, u = f(r * (1 - n) * 255), l = f(r * (1 - n * c) * 255), d = f(r * (1 - n * (1 - c)) * 255);
    switch (a) {
      case 0:
        this.g = d, this.b = u;
        break;
      case 1:
        this.r = l, this.b = u;
        break;
      case 2:
        this.r = u, this.b = d;
        break;
      case 3:
        this.r = u, this.g = l;
        break;
      case 4:
        this.r = d, this.g = u;
        break;
      default:
        this.g = u, this.b = l;
        break;
    }
  }
  fromHsvString(e) {
    const n = S(e, I);
    this.fromHsv({
      h: n[0],
      s: n[1],
      v: n[2],
      a: n[3]
    });
  }
  fromHslString(e) {
    const n = S(e, I);
    this.fromHsl({
      h: n[0],
      s: n[1],
      l: n[2],
      a: n[3]
    });
  }
  fromRgbString(e) {
    const n = S(e, (r, s) => (
      // Convert percentage to number. e.g. 50% -> 128
      s.includes("%") ? f(r / 100 * 255) : r
    ));
    this.r = n[0], this.g = n[1], this.b = n[2], this.a = n[3];
  }
}
const w = 2, O = 0.16, _e = 0.05, ye = 0.05, xe = 0.15, X = 5, Z = 4, we = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function L(t, e, n) {
  let r;
  return Math.round(t.h) >= 60 && Math.round(t.h) <= 240 ? r = n ? Math.round(t.h) - w * e : Math.round(t.h) + w * e : r = n ? Math.round(t.h) + w * e : Math.round(t.h) - w * e, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function P(t, e, n) {
  if (t.h === 0 && t.s === 0)
    return t.s;
  let r;
  return n ? r = t.s - O * e : e === Z ? r = t.s + O : r = t.s + _e * e, r > 1 && (r = 1), n && e === X && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Math.round(r * 100) / 100;
}
function F(t, e, n) {
  let r;
  return n ? r = t.v + ye * e : r = t.v - xe * e, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function ve(t, e = {}) {
  const n = [], r = new p(t), s = r.toHsv();
  for (let i = X; i > 0; i -= 1) {
    const o = new p({
      h: L(s, i, !0),
      s: P(s, i, !0),
      v: F(s, i, !0)
    });
    n.push(o);
  }
  n.push(r);
  for (let i = 1; i <= Z; i += 1) {
    const o = new p({
      h: L(s, i),
      s: P(s, i),
      v: F(s, i)
    });
    n.push(o);
  }
  return e.theme === "dark" ? we.map(({
    index: i,
    amount: o
  }) => new p(e.backgroundColor || "#141414").mix(n[i], o).toHexString()) : n.map((i) => i.toHexString());
}
const M = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
M.primary = M[5];
function ke() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Ce(t, e) {
  if (!t)
    return !1;
  if (t.contains)
    return t.contains(e);
  let n = e;
  for (; n; ) {
    if (n === t)
      return !0;
    n = n.parentNode;
  }
  return !1;
}
const B = "data-rc-order", D = "data-rc-priority", Se = "rc-util-key", N = /* @__PURE__ */ new Map();
function ee({
  mark: t
} = {}) {
  return t ? t.startsWith("data-") ? t : `data-${t}` : Se;
}
function R(t) {
  return t.attachTo ? t.attachTo : document.querySelector("head") || document.body;
}
function ze(t) {
  return t === "queue" ? "prependQueue" : t ? "prepend" : "append";
}
function E(t) {
  return Array.from((N.get(t) || t).children).filter((e) => e.tagName === "STYLE");
}
function te(t, e = {}) {
  if (!ke())
    return null;
  const {
    csp: n,
    prepend: r,
    priority: s = 0
  } = e, i = ze(r), o = i === "prependQueue", a = document.createElement("style");
  a.setAttribute(B, i), o && s && a.setAttribute(D, `${s}`), n?.nonce && (a.nonce = n?.nonce), a.innerHTML = t;
  const c = R(e), {
    firstChild: u
  } = c;
  if (r) {
    if (o) {
      const l = (e.styles || E(c)).filter((d) => {
        if (!["prepend", "prependQueue"].includes(d.getAttribute(B)))
          return !1;
        const g = Number(d.getAttribute(D) || 0);
        return s >= g;
      });
      if (l.length)
        return c.insertBefore(a, l[l.length - 1].nextSibling), a;
    }
    c.insertBefore(a, u);
  } else
    c.appendChild(a);
  return a;
}
function Me(t, e = {}) {
  let {
    styles: n
  } = e;
  return n ||= E(R(e)), n.find((r) => r.getAttribute(ee(e)) === t);
}
function Ne(t, e) {
  const n = N.get(t);
  if (!n || !Ce(document, n)) {
    const r = te("", e), {
      parentNode: s
    } = r;
    N.set(t, s), t.removeChild(r);
  }
}
function $e(t, e, n = {}) {
  const r = R(n), s = E(r), i = {
    ...n,
    styles: s
  };
  Ne(r, i);
  const o = Me(e, i);
  if (o)
    return i.csp?.nonce && o.nonce !== i.csp?.nonce && (o.nonce = i.csp?.nonce), o.innerHTML !== t && (o.innerHTML = t), o;
  const a = te(t, i);
  return a.setAttribute(ee(i), e), a;
}
function ne(t) {
  return t?.getRootNode?.();
}
function je(t) {
  return ne(t) instanceof ShadowRoot;
}
function He(t) {
  return je(t) ? ne(t) : null;
}
let $ = {};
const q = [], Te = (t) => {
  q.push(t);
};
function Re(t, e) {
  if (process.env.NODE_ENV !== "production" && !t && console !== void 0) {
    const n = q.reduce((r, s) => s(r ?? "", "warning"), e);
    n && console.error(`Warning: ${n}`);
  }
}
function Ee(t, e) {
  if (process.env.NODE_ENV !== "production" && !t && console !== void 0) {
    const n = q.reduce((r, s) => s(r ?? "", "note"), e);
    n && console.warn(`Note: ${n}`);
  }
}
function qe() {
  $ = {};
}
function re(t, e, n) {
  !e && !$[n] && (t(!1, n), $[n] = !0);
}
function v(t, e) {
  re(Re, t, e);
}
function Ae(t, e) {
  re(Ee, t, e);
}
v.preMessage = Te;
v.resetWarned = qe;
v.noteOnce = Ae;
function Ie(t) {
  return t.replace(/-(.)/g, (e, n) => n.toUpperCase());
}
function Oe(t, e) {
  v(t, `[@ant-design/icons] ${e}`);
}
function V(t) {
  return typeof t == "object" && typeof t.name == "string" && typeof t.theme == "string" && (typeof t.icon == "object" || typeof t.icon == "function");
}
function W(t = {}) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return n === "class" ? (e.className = r, delete e.class) : (delete e[n], e[Ie(n)] = r), e;
  }, {});
}
function j(t, e, n) {
  return n ? /* @__PURE__ */ A.createElement(t.tag, {
    key: e,
    ...W(t.attrs),
    ...n
  }, (t.children || []).map((r, s) => j(r, `${e}-${t.tag}-${s}`))) : /* @__PURE__ */ A.createElement(t.tag, {
    key: e,
    ...W(t.attrs)
  }, (t.children || []).map((r, s) => j(r, `${e}-${t.tag}-${s}`)));
}
function se(t) {
  return ve(t)[0];
}
function ie(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
const Le = `
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
  vertical-align: inherit;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, Pe = (t) => {
  const {
    csp: e,
    prefixCls: n,
    layer: r
  } = he(Y);
  let s = Le;
  n && (s = s.replace(/anticon/g, n)), r && (s = `@layer ${r} {
${s}
}`), G(() => {
    const i = t.current, o = He(i);
    $e(s, "@ant-design-icons", {
      prepend: !r,
      csp: e,
      attachTo: o
    });
  }, []);
}, y = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function Fe({
  primaryColor: t,
  secondaryColor: e
}) {
  y.primaryColor = t, y.secondaryColor = e || se(t), y.calculated = !!e;
}
function Be() {
  return {
    ...y
  };
}
const b = (t) => {
  const {
    icon: e,
    className: n,
    onClick: r,
    style: s,
    primaryColor: i,
    secondaryColor: o,
    ...a
  } = t, c = m.useRef(null);
  let u = y;
  if (i && (u = {
    primaryColor: i,
    secondaryColor: o || se(i)
  }), Pe(c), Oe(V(e), `icon should be icon definiton, but got ${e}`), !V(e))
    return null;
  let l = e;
  return l && typeof l.icon == "function" && (l = {
    ...l,
    icon: l.icon(u.primaryColor, u.secondaryColor)
  }), j(l.icon, `svg-${l.name}`, {
    className: n,
    onClick: r,
    style: s,
    "data-icon": l.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...a,
    ref: c
  });
};
b.displayName = "IconReact";
b.getTwoToneColors = Be;
b.setTwoToneColors = Fe;
function oe(t) {
  const [e, n] = ie(t);
  return b.setTwoToneColors({
    primaryColor: e,
    secondaryColor: n
  });
}
function De() {
  const t = b.getTwoToneColors();
  return t.calculated ? [t.primaryColor, t.secondaryColor] : t.primaryColor;
}
function H() {
  return H = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, H.apply(this, arguments);
}
oe(M.primary);
const k = /* @__PURE__ */ m.forwardRef((t, e) => {
  const {
    // affect outter <i>...</i>
    className: n,
    // affect inner <svg>...</svg>
    icon: r,
    spin: s,
    rotate: i,
    tabIndex: o,
    onClick: a,
    // other
    twoToneColor: c,
    ...u
  } = t, {
    prefixCls: l = "anticon",
    rootClassName: d
  } = m.useContext(Y), g = J(d, l, {
    [`${l}-${r.name}`]: !!r.name,
    [`${l}-spin`]: !!s || r.name === "loading"
  }, n);
  let C = o;
  C === void 0 && a && (C = -1);
  const ce = i ? {
    msTransform: `rotate(${i}deg)`,
    transform: `rotate(${i}deg)`
  } : void 0, [le, ue] = ie(c);
  return /* @__PURE__ */ m.createElement("span", H({
    role: "img",
    "aria-label": r.name
  }, u, {
    ref: e,
    tabIndex: C,
    onClick: a,
    className: g
  }), /* @__PURE__ */ m.createElement(b, {
    icon: r,
    primaryColor: le,
    secondaryColor: ue,
    style: ce
  }));
});
k.getTwoToneColor = De;
k.setTwoToneColor = oe;
process.env.NODE_ENV !== "production" && (k.displayName = "AntdIcon");
var Ve = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" };
function T() {
  return T = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, T.apply(this, arguments);
}
const We = (t, e) => /* @__PURE__ */ m.createElement(k, T({}, t, {
  ref: e,
  icon: Ve
})), ae = /* @__PURE__ */ m.forwardRef(We);
process.env.NODE_ENV !== "production" && (ae.displayName = "CloseCircleFilled");
const { Text: z } = ge, Qe = (t) => {
  const {
    status: e = "uploaded",
    filename: n,
    extname: r,
    size: s,
    i18n: i,
    failedMessage: o,
    onItemPress: a,
    onItemRemove: c
  } = t, u = de(() => (e === "uploaded" || e === "failed") && c, [e, c]);
  return /* @__PURE__ */ x(
    "div",
    {
      className: "group relative w-1/3 p-1.5 box-border",
      onClick: () => {
        a?.(t);
      },
      children: [
        u && /* @__PURE__ */ h(
          z,
          {
            type: "danger",
            className: "absolute top-2.5 right-2.5 inline-flex items-center cursor-pointer opacity-0 transition group-hover:opacity-100",
            onClick: () => {
              c?.(t);
            },
            children: /* @__PURE__ */ h(ae, {})
          }
        ),
        /* @__PURE__ */ x("div", { className: "flex items-center gap-2 p-3 bg-black/4 dark:bg-white/8 rounded-xl", children: [
          /* @__PURE__ */ h(pe, { className: "min-w-10 size-10", extname: r }),
          /* @__PURE__ */ x("div", { className: "flex flex-col gap-1 overflow-hidden", children: [
            /* @__PURE__ */ h("span", { className: "text-sm truncate", children: n }),
            /* @__PURE__ */ h(z, { type: "secondary", className: "text-xs", children: e === "uploading" ? i?.labels?.uploading || "Uploading..." : e === "analyzing" ? i?.labels?.analyzing || "Analyzing..." : e === "failed" ? /* @__PURE__ */ h(me, { title: o, children: /* @__PURE__ */ h(z, { type: "danger", className: "text-xs", children: i?.labels?.failed || "Upload failed" }) }) : /* @__PURE__ */ x(U, { children: [
              /* @__PURE__ */ h("span", { children: r }),
              /* @__PURE__ */ h("span", { className: "pl-2", children: s })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}, Q = "https://at.alicdn.com/t/c/font_4934333_0u00aavw7iob.js", Ke = (t) => {
  const { data: e, i18n: n, className: r, onItemPress: s, onItemRemove: i, ...o } = t;
  return G(() => {
    if (typeof document > "u" || document.querySelector(`script[src="${Q}"]`)) return;
    const a = document.createElement("script");
    a.src = Q, a.async = !0, document.head.appendChild(a);
  }, []), /* @__PURE__ */ h(U, { children: /* @__PURE__ */ h("div", { className: J("flex flex-wrap -m-1.5", r), ...o, children: e.map((a) => /* @__PURE__ */ h(
    Qe,
    {
      ...a,
      i18n: n,
      onItemPress: s,
      onItemRemove: i
    },
    a.id
  )) }) });
};
export {
  Qe as Attachment,
  pe as AttachmentIcon,
  Ke as Attachments
};
