(function(){"use strict";try{if(typeof document<"u"){var n=document.createElement("style");n.appendChild(document.createTextNode("*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.-m-1\\.5{margin:-.375rem}.box-border{box-sizing:border-box}.size-10{width:2.5rem;height:2.5rem}.min-w-10{min-width:2.5rem}.w-1\\/3{width:33.3333333333%}.flex{display:flex}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.overflow-hidden{overflow:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-xl{border-radius:.75rem}.bg-black\\/4{background-color:#0000000a}.dark .dark\\:bg-white\\/8{background-color:#ffffff14}.p-1\\.5{padding:.375rem}.p-3{padding:.75rem}.py{padding-top:1rem;padding-bottom:1rem}.pl-2{padding-left:.5rem}.pr{padding-right:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.text-\\[\\#999\\]{--un-text-opacity:1;color:rgb(153 153 153 / var(--un-text-opacity))}.text-\\[\\#ff4d4f\\]{--un-text-opacity:1;color:rgb(255 77 79 / var(--un-text-opacity))}")),document.head.appendChild(n)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { jsx as q, jsxs as se, Fragment as Qe } from "react/jsx-runtime";
import Q, { useState as he, useEffect as st } from "react";
function ue(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var ae = { exports: {} }, ie = { exports: {} }, x = {};
var Ne;
function ct() {
  if (Ne) return x;
  Ne = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? /* @__PURE__ */ Symbol.for("react.element") : 60103, i = t ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = t ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, s = t ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, n = t ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, c = t ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, o = t ? /* @__PURE__ */ Symbol.for("react.context") : 60110, a = t ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, u = t ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = t ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, v = t ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, m = t ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, T = t ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, R = t ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, b = t ? /* @__PURE__ */ Symbol.for("react.block") : 60121, w = t ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, j = t ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, $ = t ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function N(p) {
    if (typeof p == "object" && p !== null) {
      var W = p.$$typeof;
      switch (W) {
        case e:
          switch (p = p.type, p) {
            case a:
            case u:
            case r:
            case n:
            case s:
            case v:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case o:
                case l:
                case R:
                case T:
                case c:
                  return p;
                default:
                  return W;
              }
          }
        case i:
          return W;
      }
    }
  }
  function L(p) {
    return N(p) === u;
  }
  return x.AsyncMode = a, x.ConcurrentMode = u, x.ContextConsumer = o, x.ContextProvider = c, x.Element = e, x.ForwardRef = l, x.Fragment = r, x.Lazy = R, x.Memo = T, x.Portal = i, x.Profiler = n, x.StrictMode = s, x.Suspense = v, x.isAsyncMode = function(p) {
    return L(p) || N(p) === a;
  }, x.isConcurrentMode = L, x.isContextConsumer = function(p) {
    return N(p) === o;
  }, x.isContextProvider = function(p) {
    return N(p) === c;
  }, x.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, x.isForwardRef = function(p) {
    return N(p) === l;
  }, x.isFragment = function(p) {
    return N(p) === r;
  }, x.isLazy = function(p) {
    return N(p) === R;
  }, x.isMemo = function(p) {
    return N(p) === T;
  }, x.isPortal = function(p) {
    return N(p) === i;
  }, x.isProfiler = function(p) {
    return N(p) === n;
  }, x.isStrictMode = function(p) {
    return N(p) === s;
  }, x.isSuspense = function(p) {
    return N(p) === v;
  }, x.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === u || p === n || p === s || p === v || p === m || typeof p == "object" && p !== null && (p.$$typeof === R || p.$$typeof === T || p.$$typeof === c || p.$$typeof === o || p.$$typeof === l || p.$$typeof === w || p.$$typeof === j || p.$$typeof === $ || p.$$typeof === b);
  }, x.typeOf = N, x;
}
var I = {};
var He;
function ut() {
  return He || (He = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? /* @__PURE__ */ Symbol.for("react.element") : 60103, i = t ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = t ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, s = t ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, n = t ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, c = t ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, o = t ? /* @__PURE__ */ Symbol.for("react.context") : 60110, a = t ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, u = t ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, l = t ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, v = t ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, m = t ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, T = t ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, R = t ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, b = t ? /* @__PURE__ */ Symbol.for("react.block") : 60121, w = t ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, j = t ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, $ = t ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function N(d) {
      return typeof d == "string" || typeof d == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      d === r || d === u || d === n || d === s || d === v || d === m || typeof d == "object" && d !== null && (d.$$typeof === R || d.$$typeof === T || d.$$typeof === c || d.$$typeof === o || d.$$typeof === l || d.$$typeof === w || d.$$typeof === j || d.$$typeof === $ || d.$$typeof === b);
    }
    function L(d) {
      if (typeof d == "object" && d !== null) {
        var z = d.$$typeof;
        switch (z) {
          case e:
            var oe = d.type;
            switch (oe) {
              case a:
              case u:
              case r:
              case n:
              case s:
              case v:
                return oe;
              default:
                var Le = oe && oe.$$typeof;
                switch (Le) {
                  case o:
                  case l:
                  case R:
                  case T:
                  case c:
                    return Le;
                  default:
                    return z;
                }
            }
          case i:
            return z;
        }
      }
    }
    var p = a, W = u, fe = o, le = c, pe = e, de = l, re = r, ve = R, ye = T, X = i, me = n, U = s, G = v, ne = !1;
    function Te(d) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), f(d) || L(d) === a;
    }
    function f(d) {
      return L(d) === u;
    }
    function y(d) {
      return L(d) === o;
    }
    function S(d) {
      return L(d) === c;
    }
    function _(d) {
      return typeof d == "object" && d !== null && d.$$typeof === e;
    }
    function g(d) {
      return L(d) === l;
    }
    function O(d) {
      return L(d) === r;
    }
    function E(d) {
      return L(d) === R;
    }
    function A(d) {
      return L(d) === T;
    }
    function P(d) {
      return L(d) === i;
    }
    function M(d) {
      return L(d) === n;
    }
    function C(d) {
      return L(d) === s;
    }
    function k(d) {
      return L(d) === v;
    }
    I.AsyncMode = p, I.ConcurrentMode = W, I.ContextConsumer = fe, I.ContextProvider = le, I.Element = pe, I.ForwardRef = de, I.Fragment = re, I.Lazy = ve, I.Memo = ye, I.Portal = X, I.Profiler = me, I.StrictMode = U, I.Suspense = G, I.isAsyncMode = Te, I.isConcurrentMode = f, I.isContextConsumer = y, I.isContextProvider = S, I.isElement = _, I.isForwardRef = g, I.isFragment = O, I.isLazy = E, I.isMemo = A, I.isPortal = P, I.isProfiler = M, I.isStrictMode = C, I.isSuspense = k, I.isValidElementType = N, I.typeOf = L;
  })()), I;
}
var De;
function Ze() {
  return De || (De = 1, process.env.NODE_ENV === "production" ? ie.exports = ct() : ie.exports = ut()), ie.exports;
}
var ge, $e;
function Ke() {
  if ($e) return ge;
  $e = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, i = Object.prototype.propertyIsEnumerable;
  function r(n) {
    if (n == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(n);
  }
  function s() {
    try {
      if (!Object.assign)
        return !1;
      var n = new String("abc");
      if (n[5] = "de", Object.getOwnPropertyNames(n)[0] === "5")
        return !1;
      for (var c = {}, o = 0; o < 10; o++)
        c["_" + String.fromCharCode(o)] = o;
      var a = Object.getOwnPropertyNames(c).map(function(l) {
        return c[l];
      });
      if (a.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(l) {
        u[l] = l;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return ge = s() ? Object.assign : function(n, c) {
    for (var o, a = r(n), u, l = 1; l < arguments.length; l++) {
      o = Object(arguments[l]);
      for (var v in o)
        e.call(o, v) && (a[v] = o[v]);
      if (t) {
        u = t(o);
        for (var m = 0; m < u.length; m++)
          i.call(o, u[m]) && (a[u[m]] = o[u[m]]);
      }
    }
    return a;
  }, ge;
}
var Ee, ke;
function je() {
  if (ke) return Ee;
  ke = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Ee = t, Ee;
}
var be, Fe;
function et() {
  return Fe || (Fe = 1, be = Function.call.bind(Object.prototype.hasOwnProperty)), be;
}
var _e, qe;
function ft() {
  if (qe) return _e;
  qe = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ je(), i = {}, r = /* @__PURE__ */ et();
    t = function(n) {
      var c = "Warning: " + n;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {
      }
    };
  }
  function s(n, c, o, a, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var l in n)
        if (r(n, l)) {
          var v;
          try {
            if (typeof n[l] != "function") {
              var m = Error(
                (a || "React class") + ": " + o + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof n[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw m.name = "Invariant Violation", m;
            }
            v = n[l](c, l, a, o, null, e);
          } catch (R) {
            v = R;
          }
          if (v && !(v instanceof Error) && t(
            (a || "React class") + ": type specification of " + o + " `" + l + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in i)) {
            i[v.message] = !0;
            var T = u ? u() : "";
            t(
              "Failed " + o + " type: " + v.message + (T ?? "")
            );
          }
        }
    }
  }
  return s.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (i = {});
  }, _e = s, _e;
}
var Ae, Ye;
function lt() {
  if (Ye) return Ae;
  Ye = 1;
  var t = Ze(), e = Ke(), i = /* @__PURE__ */ je(), r = /* @__PURE__ */ et(), s = /* @__PURE__ */ ft(), n = function() {
  };
  process.env.NODE_ENV !== "production" && (n = function(o) {
    var a = "Warning: " + o;
    typeof console < "u" && console.error(a);
    try {
      throw new Error(a);
    } catch {
    }
  });
  function c() {
    return null;
  }
  return Ae = function(o, a) {
    var u = typeof Symbol == "function" && Symbol.iterator, l = "@@iterator";
    function v(f) {
      var y = f && (u && f[u] || f[l]);
      if (typeof y == "function")
        return y;
    }
    var m = "<<anonymous>>", T = {
      array: j("array"),
      bigint: j("bigint"),
      bool: j("boolean"),
      func: j("function"),
      number: j("number"),
      object: j("object"),
      string: j("string"),
      symbol: j("symbol"),
      any: $(),
      arrayOf: N,
      element: L(),
      elementType: p(),
      instanceOf: W,
      node: de(),
      objectOf: le,
      oneOf: fe,
      oneOfType: pe,
      shape: ve,
      exact: ye
    };
    function R(f, y) {
      return f === y ? f !== 0 || 1 / f === 1 / y : f !== f && y !== y;
    }
    function b(f, y) {
      this.message = f, this.data = y && typeof y == "object" ? y : {}, this.stack = "";
    }
    b.prototype = Error.prototype;
    function w(f) {
      if (process.env.NODE_ENV !== "production")
        var y = {}, S = 0;
      function _(O, E, A, P, M, C, k) {
        if (P = P || m, C = C || A, k !== i) {
          if (a) {
            var d = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw d.name = "Invariant Violation", d;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var z = P + ":" + A;
            !y[z] && // Avoid spamming the console because they are often not actionable except for lib authors
            S < 3 && (n(
              "You are manually calling a React.PropTypes validation function for the `" + C + "` prop on `" + P + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), y[z] = !0, S++);
          }
        }
        return E[A] == null ? O ? E[A] === null ? new b("The " + M + " `" + C + "` is marked as required " + ("in `" + P + "`, but its value is `null`.")) : new b("The " + M + " `" + C + "` is marked as required in " + ("`" + P + "`, but its value is `undefined`.")) : null : f(E, A, P, M, C);
      }
      var g = _.bind(null, !1);
      return g.isRequired = _.bind(null, !0), g;
    }
    function j(f) {
      function y(S, _, g, O, E, A) {
        var P = S[_], M = U(P);
        if (M !== f) {
          var C = G(P);
          return new b(
            "Invalid " + O + " `" + E + "` of type " + ("`" + C + "` supplied to `" + g + "`, expected ") + ("`" + f + "`."),
            { expectedType: f }
          );
        }
        return null;
      }
      return w(y);
    }
    function $() {
      return w(c);
    }
    function N(f) {
      function y(S, _, g, O, E) {
        if (typeof f != "function")
          return new b("Property `" + E + "` of component `" + g + "` has invalid PropType notation inside arrayOf.");
        var A = S[_];
        if (!Array.isArray(A)) {
          var P = U(A);
          return new b("Invalid " + O + " `" + E + "` of type " + ("`" + P + "` supplied to `" + g + "`, expected an array."));
        }
        for (var M = 0; M < A.length; M++) {
          var C = f(A, M, g, O, E + "[" + M + "]", i);
          if (C instanceof Error)
            return C;
        }
        return null;
      }
      return w(y);
    }
    function L() {
      function f(y, S, _, g, O) {
        var E = y[S];
        if (!o(E)) {
          var A = U(E);
          return new b("Invalid " + g + " `" + O + "` of type " + ("`" + A + "` supplied to `" + _ + "`, expected a single ReactElement."));
        }
        return null;
      }
      return w(f);
    }
    function p() {
      function f(y, S, _, g, O) {
        var E = y[S];
        if (!t.isValidElementType(E)) {
          var A = U(E);
          return new b("Invalid " + g + " `" + O + "` of type " + ("`" + A + "` supplied to `" + _ + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return w(f);
    }
    function W(f) {
      function y(S, _, g, O, E) {
        if (!(S[_] instanceof f)) {
          var A = f.name || m, P = Te(S[_]);
          return new b("Invalid " + O + " `" + E + "` of type " + ("`" + P + "` supplied to `" + g + "`, expected ") + ("instance of `" + A + "`."));
        }
        return null;
      }
      return w(y);
    }
    function fe(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? n(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : n("Invalid argument supplied to oneOf, expected an array.")), c;
      function y(S, _, g, O, E) {
        for (var A = S[_], P = 0; P < f.length; P++)
          if (R(A, f[P]))
            return null;
        var M = JSON.stringify(f, function(k, d) {
          var z = G(d);
          return z === "symbol" ? String(d) : d;
        });
        return new b("Invalid " + O + " `" + E + "` of value `" + String(A) + "` " + ("supplied to `" + g + "`, expected one of " + M + "."));
      }
      return w(y);
    }
    function le(f) {
      function y(S, _, g, O, E) {
        if (typeof f != "function")
          return new b("Property `" + E + "` of component `" + g + "` has invalid PropType notation inside objectOf.");
        var A = S[_], P = U(A);
        if (P !== "object")
          return new b("Invalid " + O + " `" + E + "` of type " + ("`" + P + "` supplied to `" + g + "`, expected an object."));
        for (var M in A)
          if (r(A, M)) {
            var C = f(A, M, g, O, E + "." + M, i);
            if (C instanceof Error)
              return C;
          }
        return null;
      }
      return w(y);
    }
    function pe(f) {
      if (!Array.isArray(f))
        return process.env.NODE_ENV !== "production" && n("Invalid argument supplied to oneOfType, expected an instance of array."), c;
      for (var y = 0; y < f.length; y++) {
        var S = f[y];
        if (typeof S != "function")
          return n(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ne(S) + " at index " + y + "."
          ), c;
      }
      function _(g, O, E, A, P) {
        for (var M = [], C = 0; C < f.length; C++) {
          var k = f[C], d = k(g, O, E, A, P, i);
          if (d == null)
            return null;
          d.data && r(d.data, "expectedType") && M.push(d.data.expectedType);
        }
        var z = M.length > 0 ? ", expected one of type [" + M.join(", ") + "]" : "";
        return new b("Invalid " + A + " `" + P + "` supplied to " + ("`" + E + "`" + z + "."));
      }
      return w(_);
    }
    function de() {
      function f(y, S, _, g, O) {
        return X(y[S]) ? null : new b("Invalid " + g + " `" + O + "` supplied to " + ("`" + _ + "`, expected a ReactNode."));
      }
      return w(f);
    }
    function re(f, y, S, _, g) {
      return new b(
        (f || "React class") + ": " + y + " type `" + S + "." + _ + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + g + "`."
      );
    }
    function ve(f) {
      function y(S, _, g, O, E) {
        var A = S[_], P = U(A);
        if (P !== "object")
          return new b("Invalid " + O + " `" + E + "` of type `" + P + "` " + ("supplied to `" + g + "`, expected `object`."));
        for (var M in f) {
          var C = f[M];
          if (typeof C != "function")
            return re(g, O, E, M, G(C));
          var k = C(A, M, g, O, E + "." + M, i);
          if (k)
            return k;
        }
        return null;
      }
      return w(y);
    }
    function ye(f) {
      function y(S, _, g, O, E) {
        var A = S[_], P = U(A);
        if (P !== "object")
          return new b("Invalid " + O + " `" + E + "` of type `" + P + "` " + ("supplied to `" + g + "`, expected `object`."));
        var M = e({}, S[_], f);
        for (var C in M) {
          var k = f[C];
          if (r(f, C) && typeof k != "function")
            return re(g, O, E, C, G(k));
          if (!k)
            return new b(
              "Invalid " + O + " `" + E + "` key `" + C + "` supplied to `" + g + "`.\nBad object: " + JSON.stringify(S[_], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(f), null, "  ")
            );
          var d = k(A, C, g, O, E + "." + C, i);
          if (d)
            return d;
        }
        return null;
      }
      return w(y);
    }
    function X(f) {
      switch (typeof f) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !f;
        case "object":
          if (Array.isArray(f))
            return f.every(X);
          if (f === null || o(f))
            return !0;
          var y = v(f);
          if (y) {
            var S = y.call(f), _;
            if (y !== f.entries) {
              for (; !(_ = S.next()).done; )
                if (!X(_.value))
                  return !1;
            } else
              for (; !(_ = S.next()).done; ) {
                var g = _.value;
                if (g && !X(g[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function me(f, y) {
      return f === "symbol" ? !0 : y ? y["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && y instanceof Symbol : !1;
    }
    function U(f) {
      var y = typeof f;
      return Array.isArray(f) ? "array" : f instanceof RegExp ? "object" : me(y, f) ? "symbol" : y;
    }
    function G(f) {
      if (typeof f > "u" || f === null)
        return "" + f;
      var y = U(f);
      if (y === "object") {
        if (f instanceof Date)
          return "date";
        if (f instanceof RegExp)
          return "regexp";
      }
      return y;
    }
    function ne(f) {
      var y = G(f);
      switch (y) {
        case "array":
        case "object":
          return "an " + y;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + y;
        default:
          return y;
      }
    }
    function Te(f) {
      return !f.constructor || !f.constructor.name ? m : f.constructor.name;
    }
    return T.checkPropTypes = s, T.resetWarningCache = s.resetWarningCache, T.PropTypes = T, T;
  }, Ae;
}
var Se, Ue;
function pt() {
  if (Ue) return Se;
  Ue = 1;
  var t = /* @__PURE__ */ je();
  function e() {
  }
  function i() {
  }
  return i.resetWarningCache = e, Se = function() {
    function r(c, o, a, u, l, v) {
      if (v !== t) {
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
      }
    }
    r.isRequired = r;
    function s() {
      return r;
    }
    var n = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: s,
      element: r,
      elementType: r,
      instanceOf: s,
      node: r,
      objectOf: s,
      oneOf: s,
      oneOfType: s,
      shape: s,
      exact: s,
      checkPropTypes: i,
      resetWarningCache: e
    };
    return n.PropTypes = n, n;
  }, Se;
}
var ze;
function dt() {
  if (ze) return ae.exports;
  if (ze = 1, process.env.NODE_ENV !== "production") {
    var t = Ze(), e = !0;
    ae.exports = /* @__PURE__ */ lt()(t.isElement, e);
  } else
    ae.exports = /* @__PURE__ */ pt()();
  return ae.exports;
}
var vt = /* @__PURE__ */ dt();
const H = /* @__PURE__ */ ue(vt);
var Oe, Be;
function yt() {
  if (Be) return Oe;
  Be = 1;
  function t(o) {
    return o && typeof o == "object" && "default" in o ? o.default : o;
  }
  var e = Q, i = t(e);
  function r(o, a, u) {
    return a in o ? Object.defineProperty(o, a, {
      value: u,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : o[a] = u, o;
  }
  function s(o, a) {
    o.prototype = Object.create(a.prototype), o.prototype.constructor = o, o.__proto__ = a;
  }
  var n = !!(typeof window < "u" && window.document && window.document.createElement);
  function c(o, a, u) {
    if (typeof o != "function")
      throw new Error("Expected reducePropsToState to be a function.");
    if (typeof a != "function")
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    if (typeof u < "u" && typeof u != "function")
      throw new Error("Expected mapStateOnServer to either be undefined or a function.");
    function l(v) {
      return v.displayName || v.name || "Component";
    }
    return function(m) {
      if (typeof m != "function")
        throw new Error("Expected WrappedComponent to be a React component.");
      var T = [], R;
      function b() {
        R = o(T.map(function(j) {
          return j.props;
        })), w.canUseDOM ? a(R) : u && (R = u(R));
      }
      var w = /* @__PURE__ */ (function(j) {
        s($, j);
        function $() {
          return j.apply(this, arguments) || this;
        }
        $.peek = function() {
          return R;
        }, $.rewind = function() {
          if ($.canUseDOM)
            throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
          var p = R;
          return R = void 0, T = [], p;
        };
        var N = $.prototype;
        return N.UNSAFE_componentWillMount = function() {
          T.push(this), b();
        }, N.componentDidUpdate = function() {
          b();
        }, N.componentWillUnmount = function() {
          var p = T.indexOf(this);
          T.splice(p, 1), b();
        }, N.render = function() {
          return i.createElement(m, this.props);
        }, $;
      })(e.PureComponent);
      return r(w, "displayName", "SideEffect(" + l(m) + ")"), r(w, "canUseDOM", n), w;
    };
  }
  return Oe = c, Oe;
}
var mt = yt();
const Tt = /* @__PURE__ */ ue(mt);
var Pe, We;
function ht() {
  if (We) return Pe;
  We = 1;
  var t = typeof Element < "u", e = typeof Map == "function", i = typeof Set == "function", r = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function s(n, c) {
    if (n === c) return !0;
    if (n && c && typeof n == "object" && typeof c == "object") {
      if (n.constructor !== c.constructor) return !1;
      var o, a, u;
      if (Array.isArray(n)) {
        if (o = n.length, o != c.length) return !1;
        for (a = o; a-- !== 0; )
          if (!s(n[a], c[a])) return !1;
        return !0;
      }
      var l;
      if (e && n instanceof Map && c instanceof Map) {
        if (n.size !== c.size) return !1;
        for (l = n.entries(); !(a = l.next()).done; )
          if (!c.has(a.value[0])) return !1;
        for (l = n.entries(); !(a = l.next()).done; )
          if (!s(a.value[1], c.get(a.value[0]))) return !1;
        return !0;
      }
      if (i && n instanceof Set && c instanceof Set) {
        if (n.size !== c.size) return !1;
        for (l = n.entries(); !(a = l.next()).done; )
          if (!c.has(a.value[0])) return !1;
        return !0;
      }
      if (r && ArrayBuffer.isView(n) && ArrayBuffer.isView(c)) {
        if (o = n.length, o != c.length) return !1;
        for (a = o; a-- !== 0; )
          if (n[a] !== c[a]) return !1;
        return !0;
      }
      if (n.constructor === RegExp) return n.source === c.source && n.flags === c.flags;
      if (n.valueOf !== Object.prototype.valueOf && typeof n.valueOf == "function" && typeof c.valueOf == "function") return n.valueOf() === c.valueOf();
      if (n.toString !== Object.prototype.toString && typeof n.toString == "function" && typeof c.toString == "function") return n.toString() === c.toString();
      if (u = Object.keys(n), o = u.length, o !== Object.keys(c).length) return !1;
      for (a = o; a-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(c, u[a])) return !1;
      if (t && n instanceof Element) return !1;
      for (a = o; a-- !== 0; )
        if (!((u[a] === "_owner" || u[a] === "__v" || u[a] === "__o") && n.$$typeof) && !s(n[u[a]], c[u[a]]))
          return !1;
      return !0;
    }
    return n !== n && c !== c;
  }
  return Pe = function(c, o) {
    try {
      return s(c, o);
    } catch (a) {
      if ((a.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw a;
    }
  }, Pe;
}
var gt = ht();
const Et = /* @__PURE__ */ ue(gt);
var bt = Ke();
const _t = /* @__PURE__ */ ue(bt);
var V = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
}, h = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
}, Ge = Object.keys(h).map(function(t) {
  return h[t];
}), D = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src",
  TARGET: "target"
}, ce = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
}, te = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
}, At = Object.keys(ce).reduce(function(t, e) {
  return t[ce[e]] = e, t;
}, {}), St = [h.NOSCRIPT, h.SCRIPT, h.STYLE], Y = "data-react-helmet", Ot = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
  return typeof t;
} : function(t) {
  return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, Pt = function(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}, Ct = /* @__PURE__ */ (function() {
  function t(e, i) {
    for (var r = 0; r < i.length; r++) {
      var s = i[r];
      s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
    }
  }
  return function(e, i, r) {
    return i && t(e.prototype, i), r && t(e, r), e;
  };
})(), F = Object.assign || function(t) {
  for (var e = 1; e < arguments.length; e++) {
    var i = arguments[e];
    for (var r in i)
      Object.prototype.hasOwnProperty.call(i, r) && (t[r] = i[r]);
  }
  return t;
}, wt = function(t, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Super expression must either be null or a function, not " + typeof e);
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
}, Ve = function(t, e) {
  var i = {};
  for (var r in t)
    e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
  return i;
}, Rt = function(t, e) {
  if (!t)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e && (typeof e == "object" || typeof e == "function") ? e : t;
}, we = function(e) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return i === !1 ? String(e) : String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}, xt = function(e) {
  var i = Z(e, h.TITLE), r = Z(e, te.TITLE_TEMPLATE);
  if (r && i)
    return r.replace(/%s/g, function() {
      return Array.isArray(i) ? i.join("") : i;
    });
  var s = Z(e, te.DEFAULT_TITLE);
  return i || s || void 0;
}, It = function(e) {
  return Z(e, te.ON_CHANGE_CLIENT_STATE) || function() {
  };
}, Ce = function(e, i) {
  return i.filter(function(r) {
    return typeof r[e] < "u";
  }).map(function(r) {
    return r[e];
  }).reduce(function(r, s) {
    return F({}, r, s);
  }, {});
}, Mt = function(e, i) {
  return i.filter(function(r) {
    return typeof r[h.BASE] < "u";
  }).map(function(r) {
    return r[h.BASE];
  }).reverse().reduce(function(r, s) {
    if (!r.length)
      for (var n = Object.keys(s), c = 0; c < n.length; c++) {
        var o = n[c], a = o.toLowerCase();
        if (e.indexOf(a) !== -1 && s[a])
          return r.concat(s);
      }
    return r;
  }, []);
}, K = function(e, i, r) {
  var s = {};
  return r.filter(function(n) {
    return Array.isArray(n[e]) ? !0 : (typeof n[e] < "u" && xe("Helmet: " + e + ' should be of type "Array". Instead found type "' + Ot(n[e]) + '"'), !1);
  }).map(function(n) {
    return n[e];
  }).reverse().reduce(function(n, c) {
    var o = {};
    c.filter(function(m) {
      for (var T = void 0, R = Object.keys(m), b = 0; b < R.length; b++) {
        var w = R[b], j = w.toLowerCase();
        i.indexOf(j) !== -1 && !(T === D.REL && m[T].toLowerCase() === "canonical") && !(j === D.REL && m[j].toLowerCase() === "stylesheet") && (T = j), i.indexOf(w) !== -1 && (w === D.INNER_HTML || w === D.CSS_TEXT || w === D.ITEM_PROP) && (T = w);
      }
      if (!T || !m[T])
        return !1;
      var $ = m[T].toLowerCase();
      return s[T] || (s[T] = {}), o[T] || (o[T] = {}), s[T][$] ? !1 : (o[T][$] = !0, !0);
    }).reverse().forEach(function(m) {
      return n.push(m);
    });
    for (var a = Object.keys(o), u = 0; u < a.length; u++) {
      var l = a[u], v = _t({}, s[l], o[l]);
      s[l] = v;
    }
    return n;
  }, []).reverse();
}, Z = function(e, i) {
  for (var r = e.length - 1; r >= 0; r--) {
    var s = e[r];
    if (s.hasOwnProperty(i))
      return s[i];
  }
  return null;
}, jt = function(e) {
  return {
    baseTag: Mt([D.HREF, D.TARGET], e),
    bodyAttributes: Ce(V.BODY, e),
    defer: Z(e, te.DEFER),
    encode: Z(e, te.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: Ce(V.HTML, e),
    linkTags: K(h.LINK, [D.REL, D.HREF], e),
    metaTags: K(h.META, [D.NAME, D.CHARSET, D.HTTPEQUIV, D.PROPERTY, D.ITEM_PROP], e),
    noscriptTags: K(h.NOSCRIPT, [D.INNER_HTML], e),
    onChangeClientState: It(e),
    scriptTags: K(h.SCRIPT, [D.SRC, D.INNER_HTML], e),
    styleTags: K(h.STYLE, [D.CSS_TEXT], e),
    title: xt(e),
    titleAttributes: Ce(V.TITLE, e)
  };
}, Re = (function() {
  var t = Date.now();
  return function(e) {
    var i = Date.now();
    i - t > 16 ? (t = i, e(i)) : setTimeout(function() {
      Re(e);
    }, 0);
  };
})(), Xe = function(e) {
  return clearTimeout(e);
}, Lt = typeof window < "u" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || Re : global.requestAnimationFrame || Re, Nt = typeof window < "u" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || Xe : global.cancelAnimationFrame || Xe, xe = function(e) {
  return console && typeof console.warn == "function" && console.warn(e);
}, ee = null, Ht = function(e) {
  ee && Nt(ee), e.defer ? ee = Lt(function() {
    Je(e, function() {
      ee = null;
    });
  }) : (Je(e), ee = null);
}, Je = function(e, i) {
  var r = e.baseTag, s = e.bodyAttributes, n = e.htmlAttributes, c = e.linkTags, o = e.metaTags, a = e.noscriptTags, u = e.onChangeClientState, l = e.scriptTags, v = e.styleTags, m = e.title, T = e.titleAttributes;
  Ie(h.BODY, s), Ie(h.HTML, n), Dt(m, T);
  var R = {
    baseTag: J(h.BASE, r),
    linkTags: J(h.LINK, c),
    metaTags: J(h.META, o),
    noscriptTags: J(h.NOSCRIPT, a),
    scriptTags: J(h.SCRIPT, l),
    styleTags: J(h.STYLE, v)
  }, b = {}, w = {};
  Object.keys(R).forEach(function(j) {
    var $ = R[j], N = $.newTags, L = $.oldTags;
    N.length && (b[j] = N), L.length && (w[j] = R[j].oldTags);
  }), i && i(), u(e, b, w);
}, tt = function(e) {
  return Array.isArray(e) ? e.join("") : e;
}, Dt = function(e, i) {
  typeof e < "u" && document.title !== e && (document.title = tt(e)), Ie(h.TITLE, i);
}, Ie = function(e, i) {
  var r = document.getElementsByTagName(e)[0];
  if (r) {
    for (var s = r.getAttribute(Y), n = s ? s.split(",") : [], c = [].concat(n), o = Object.keys(i), a = 0; a < o.length; a++) {
      var u = o[a], l = i[u] || "";
      r.getAttribute(u) !== l && r.setAttribute(u, l), n.indexOf(u) === -1 && n.push(u);
      var v = c.indexOf(u);
      v !== -1 && c.splice(v, 1);
    }
    for (var m = c.length - 1; m >= 0; m--)
      r.removeAttribute(c[m]);
    n.length === c.length ? r.removeAttribute(Y) : r.getAttribute(Y) !== o.join(",") && r.setAttribute(Y, o.join(","));
  }
}, J = function(e, i) {
  var r = document.head || document.querySelector(h.HEAD), s = r.querySelectorAll(e + "[" + Y + "]"), n = Array.prototype.slice.call(s), c = [], o = void 0;
  return i && i.length && i.forEach(function(a) {
    var u = document.createElement(e);
    for (var l in a)
      if (a.hasOwnProperty(l))
        if (l === D.INNER_HTML)
          u.innerHTML = a.innerHTML;
        else if (l === D.CSS_TEXT)
          u.styleSheet ? u.styleSheet.cssText = a.cssText : u.appendChild(document.createTextNode(a.cssText));
        else {
          var v = typeof a[l] > "u" ? "" : a[l];
          u.setAttribute(l, v);
        }
    u.setAttribute(Y, "true"), n.some(function(m, T) {
      return o = T, u.isEqualNode(m);
    }) ? n.splice(o, 1) : c.push(u);
  }), n.forEach(function(a) {
    return a.parentNode.removeChild(a);
  }), c.forEach(function(a) {
    return r.appendChild(a);
  }), {
    oldTags: n,
    newTags: c
  };
}, rt = function(e) {
  return Object.keys(e).reduce(function(i, r) {
    var s = typeof e[r] < "u" ? r + '="' + e[r] + '"' : "" + r;
    return i ? i + " " + s : s;
  }, "");
}, $t = function(e, i, r, s) {
  var n = rt(r), c = tt(i);
  return n ? "<" + e + " " + Y + '="true" ' + n + ">" + we(c, s) + "</" + e + ">" : "<" + e + " " + Y + '="true">' + we(c, s) + "</" + e + ">";
}, kt = function(e, i, r) {
  return i.reduce(function(s, n) {
    var c = Object.keys(n).filter(function(u) {
      return !(u === D.INNER_HTML || u === D.CSS_TEXT);
    }).reduce(function(u, l) {
      var v = typeof n[l] > "u" ? l : l + '="' + we(n[l], r) + '"';
      return u ? u + " " + v : v;
    }, ""), o = n.innerHTML || n.cssText || "", a = St.indexOf(e) === -1;
    return s + "<" + e + " " + Y + '="true" ' + c + (a ? "/>" : ">" + o + "</" + e + ">");
  }, "");
}, nt = function(e) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(e).reduce(function(r, s) {
    return r[ce[s] || s] = e[s], r;
  }, i);
}, Ft = function(e) {
  var i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(e).reduce(function(r, s) {
    return r[At[s] || s] = e[s], r;
  }, i);
}, qt = function(e, i, r) {
  var s, n = (s = {
    key: i
  }, s[Y] = !0, s), c = nt(r, n);
  return [Q.createElement(h.TITLE, c, i)];
}, Yt = function(e, i) {
  return i.map(function(r, s) {
    var n, c = (n = {
      key: s
    }, n[Y] = !0, n);
    return Object.keys(r).forEach(function(o) {
      var a = ce[o] || o;
      if (a === D.INNER_HTML || a === D.CSS_TEXT) {
        var u = r.innerHTML || r.cssText;
        c.dangerouslySetInnerHTML = { __html: u };
      } else
        c[a] = r[o];
    }), Q.createElement(e, c);
  });
}, B = function(e, i, r) {
  switch (e) {
    case h.TITLE:
      return {
        toComponent: function() {
          return qt(e, i.title, i.titleAttributes);
        },
        toString: function() {
          return $t(e, i.title, i.titleAttributes, r);
        }
      };
    case V.BODY:
    case V.HTML:
      return {
        toComponent: function() {
          return nt(i);
        },
        toString: function() {
          return rt(i);
        }
      };
    default:
      return {
        toComponent: function() {
          return Yt(e, i);
        },
        toString: function() {
          return kt(e, i, r);
        }
      };
  }
}, ot = function(e) {
  var i = e.baseTag, r = e.bodyAttributes, s = e.encode, n = e.htmlAttributes, c = e.linkTags, o = e.metaTags, a = e.noscriptTags, u = e.scriptTags, l = e.styleTags, v = e.title, m = v === void 0 ? "" : v, T = e.titleAttributes;
  return {
    base: B(h.BASE, i, s),
    bodyAttributes: B(V.BODY, r, s),
    htmlAttributes: B(V.HTML, n, s),
    link: B(h.LINK, c, s),
    meta: B(h.META, o, s),
    noscript: B(h.NOSCRIPT, a, s),
    script: B(h.SCRIPT, u, s),
    style: B(h.STYLE, l, s),
    title: B(h.TITLE, { title: m, titleAttributes: T }, s)
  };
}, Ut = function(e) {
  var i, r;
  return r = i = (function(s) {
    wt(n, s);
    function n() {
      return Pt(this, n), Rt(this, s.apply(this, arguments));
    }
    return n.prototype.shouldComponentUpdate = function(o) {
      return !Et(this.props, o);
    }, n.prototype.mapNestedChildrenToProps = function(o, a) {
      if (!a)
        return null;
      switch (o.type) {
        case h.SCRIPT:
        case h.NOSCRIPT:
          return {
            innerHTML: a
          };
        case h.STYLE:
          return {
            cssText: a
          };
      }
      throw new Error("<" + o.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    }, n.prototype.flattenArrayTypeChildren = function(o) {
      var a, u = o.child, l = o.arrayTypeChildren, v = o.newChildProps, m = o.nestedChildren;
      return F({}, l, (a = {}, a[u.type] = [].concat(l[u.type] || [], [F({}, v, this.mapNestedChildrenToProps(u, m))]), a));
    }, n.prototype.mapObjectTypeChildren = function(o) {
      var a, u, l = o.child, v = o.newProps, m = o.newChildProps, T = o.nestedChildren;
      switch (l.type) {
        case h.TITLE:
          return F({}, v, (a = {}, a[l.type] = T, a.titleAttributes = F({}, m), a));
        case h.BODY:
          return F({}, v, {
            bodyAttributes: F({}, m)
          });
        case h.HTML:
          return F({}, v, {
            htmlAttributes: F({}, m)
          });
      }
      return F({}, v, (u = {}, u[l.type] = F({}, m), u));
    }, n.prototype.mapArrayTypeChildrenToProps = function(o, a) {
      var u = F({}, a);
      return Object.keys(o).forEach(function(l) {
        var v;
        u = F({}, u, (v = {}, v[l] = o[l], v));
      }), u;
    }, n.prototype.warnOnInvalidChildren = function(o, a) {
      if (process.env.NODE_ENV !== "production") {
        if (!Ge.some(function(u) {
          return o.type === u;
        }))
          return typeof o.type == "function" ? xe("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.") : xe("Only elements types " + Ge.join(", ") + " are allowed. Helmet does not support rendering <" + o.type + "> elements. Refer to our API for more information.");
        if (a && typeof a != "string" && (!Array.isArray(a) || a.some(function(u) {
          return typeof u != "string";
        })))
          throw new Error("Helmet expects a string as a child of <" + o.type + ">. Did you forget to wrap your children in braces? ( <" + o.type + ">{``}</" + o.type + "> ) Refer to our API for more information.");
      }
      return !0;
    }, n.prototype.mapChildrenToProps = function(o, a) {
      var u = this, l = {};
      return Q.Children.forEach(o, function(v) {
        if (!(!v || !v.props)) {
          var m = v.props, T = m.children, R = Ve(m, ["children"]), b = Ft(R);
          switch (u.warnOnInvalidChildren(v, T), v.type) {
            case h.LINK:
            case h.META:
            case h.NOSCRIPT:
            case h.SCRIPT:
            case h.STYLE:
              l = u.flattenArrayTypeChildren({
                child: v,
                arrayTypeChildren: l,
                newChildProps: b,
                nestedChildren: T
              });
              break;
            default:
              a = u.mapObjectTypeChildren({
                child: v,
                newProps: a,
                newChildProps: b,
                nestedChildren: T
              });
              break;
          }
        }
      }), a = this.mapArrayTypeChildrenToProps(l, a), a;
    }, n.prototype.render = function() {
      var o = this.props, a = o.children, u = Ve(o, ["children"]), l = F({}, u);
      return a && (l = this.mapChildrenToProps(a, l)), Q.createElement(e, l);
    }, Ct(n, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.
      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function(o) {
        e.canUseDOM = o;
      }
    }]), n;
  })(Q.Component), i.propTypes = {
    base: H.object,
    bodyAttributes: H.object,
    children: H.oneOfType([H.arrayOf(H.node), H.node]),
    defaultTitle: H.string,
    defer: H.bool,
    encodeSpecialCharacters: H.bool,
    htmlAttributes: H.object,
    link: H.arrayOf(H.object),
    meta: H.arrayOf(H.object),
    noscript: H.arrayOf(H.object),
    onChangeClientState: H.func,
    script: H.arrayOf(H.object),
    style: H.arrayOf(H.object),
    title: H.string,
    titleAttributes: H.object,
    titleTemplate: H.string
  }, i.defaultProps = {
    defer: !0,
    encodeSpecialCharacters: !0
  }, i.peek = e.peek, i.rewind = function() {
    var s = e.rewind();
    return s || (s = ot({
      baseTag: [],
      bodyAttributes: {},
      htmlAttributes: {},
      linkTags: [],
      metaTags: [],
      noscriptTags: [],
      scriptTags: [],
      styleTags: [],
      title: "",
      titleAttributes: {}
    })), s;
  }, r;
}, zt = function() {
  return null;
}, Bt = Tt(jt, Ht, ot)(zt), Me = Ut(Bt);
Me.renderStatic = Me.rewind;
const Wt = (t) => {
  const { extname: e, ...i } = t;
  return /* @__PURE__ */ q("svg", { ...i, children: /* @__PURE__ */ q("use", { xlinkHref: `#${(() => {
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
};
function at(t) {
  var e, i, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var s = t.length;
    for (e = 0; e < s; e++) t[e] && (i = at(t[e])) && (r && (r += " "), r += i);
  } else for (i in t) t[i] && (r && (r += " "), r += i);
  return r;
}
function it() {
  for (var t, e, i = 0, r = "", s = arguments.length; i < s; i++) (t = arguments[i]) && (e = at(t)) && (r && (r += " "), r += e);
  return r;
}
const Gt = (t) => {
  const { name: e, extname: i, size: r, attachmentId: s, i18n: n } = t, [c, o] = he(!s), [a, u] = he(!1), [l, v] = he(!0);
  st(() => {
    if (!c) return;
    const T = () => 1e3 + Math.floor(Math.random() * 2e3);
    setTimeout(() => {
      o(!1), u(!0), setTimeout(() => {
        u(!1), v(Math.random() > 0.7);
      }, T());
    }, T());
  }, [c]);
  const m = () => c ? n?.labels?.uploading || "Uploading..." : a ? n?.labels?.analyzing || "Analyzing..." : l ? n?.labels?.failed || "Upload failed" : /* @__PURE__ */ se(Qe, { children: [
    /* @__PURE__ */ q("span", { children: i }),
    /* @__PURE__ */ q("span", { className: "pl-2", children: r })
  ] });
  return /* @__PURE__ */ q("div", { className: "w-1/3 p-1.5 box-border", children: /* @__PURE__ */ se("div", { className: "flex items-center gap-2 p-3 bg-black/4 dark:bg-white/8 rounded-xl", children: [
    /* @__PURE__ */ q(Wt, { className: "min-w-10 size-10", extname: i }),
    /* @__PURE__ */ se("div", { className: "flex flex-col gap-1 overflow-hidden", children: [
      /* @__PURE__ */ q("span", { className: "text-sm truncate", children: e }),
      /* @__PURE__ */ q(
        "span",
        {
          className: it("text-xs", [
            l ? "text-[#ff4d4f]" : "text-[#999]"
          ]),
          children: m()
        }
      )
    ] })
  ] }) });
}, Jt = (t) => {
  const { data: e, i18n: i, className: r, ...s } = t;
  return /* @__PURE__ */ se(Qe, { children: [
    /* @__PURE__ */ q(Me, { children: /* @__PURE__ */ q("script", { src: "https://at.alicdn.com/t/c/font_4934333_0u00aavw7iob.js" }) }),
    /* @__PURE__ */ q("div", { className: it("flex flex-wrap -m-1.5", r), ...s, children: e.map((n) => /* @__PURE__ */ q(Gt, { ...n, i18n: i }, n.id)) })
  ] });
};
export {
  Gt as Attachment,
  Wt as AttachmentIcon,
  Jt as Attachments
};
