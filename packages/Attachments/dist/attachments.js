(function(){"use strict";try{if(typeof document<"u"){var n=document.createElement("style");n.appendChild(document.createTextNode("*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.absolute{position:absolute}.relative{position:relative}.right-2\\.5{right:.625rem}.top-2\\.5{top:.625rem}.-m-1\\.5{margin:-.375rem}.box-border{box-sizing:border-box}.size-10{width:2.5rem;height:2.5rem}.min-w-10{min-width:2.5rem}.w-1\\/3{width:33.3333333333%}.flex{display:flex}.inline-flex{display:inline-flex}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.cursor-pointer{cursor:pointer}.items-center{align-items:center}.gap-1{gap:.25rem}.gap-2{gap:.5rem}.overflow-hidden{overflow:hidden}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.rounded-xl{border-radius:.75rem}.bg-black\\/4{background-color:#0000000a}.dark .dark\\:bg-white\\/8{background-color:#ffffff14}.p-1\\.5{padding:.375rem}.p-3{padding:.75rem}.py{padding-top:1rem;padding-bottom:1rem}.pl-2{padding-left:.5rem}.pr{padding-right:1rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xs{font-size:.75rem;line-height:1rem}.opacity-0{opacity:0}.group:hover .group-hover\\:opacity-100{opacity:1}.transition{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}")),document.head.appendChild(n)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { jsx as q, jsxs as ae, Fragment as Ct } from "react/jsx-runtime";
import * as Q from "react";
import V, { createContext as Wt, useContext as Vt, useEffect as Gt, useMemo as Xt } from "react";
import { Typography as Qt, Tooltip as Jt } from "antd";
function me(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var de = { exports: {} }, pe = { exports: {} }, R = {};
var et;
function Zt() {
  if (et) return R;
  et = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? /* @__PURE__ */ Symbol.for("react.element") : 60103, n = t ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = t ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, i = t ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, o = t ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, c = t ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, a = t ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = t ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, u = t ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, f = t ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, d = t ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, m = t ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, y = t ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, A = t ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, T = t ? /* @__PURE__ */ Symbol.for("react.block") : 60121, C = t ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, k = t ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, H = t ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
  function L(p) {
    if (typeof p == "object" && p !== null) {
      var G = p.$$typeof;
      switch (G) {
        case e:
          switch (p = p.type, p) {
            case s:
            case u:
            case r:
            case o:
            case i:
            case d:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case a:
                case f:
                case A:
                case y:
                case c:
                  return p;
                default:
                  return G;
              }
          }
        case n:
          return G;
      }
    }
  }
  function j(p) {
    return L(p) === u;
  }
  return R.AsyncMode = s, R.ConcurrentMode = u, R.ContextConsumer = a, R.ContextProvider = c, R.Element = e, R.ForwardRef = f, R.Fragment = r, R.Lazy = A, R.Memo = y, R.Portal = n, R.Profiler = o, R.StrictMode = i, R.Suspense = d, R.isAsyncMode = function(p) {
    return j(p) || L(p) === s;
  }, R.isConcurrentMode = j, R.isContextConsumer = function(p) {
    return L(p) === a;
  }, R.isContextProvider = function(p) {
    return L(p) === c;
  }, R.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === e;
  }, R.isForwardRef = function(p) {
    return L(p) === f;
  }, R.isFragment = function(p) {
    return L(p) === r;
  }, R.isLazy = function(p) {
    return L(p) === A;
  }, R.isMemo = function(p) {
    return L(p) === y;
  }, R.isPortal = function(p) {
    return L(p) === n;
  }, R.isProfiler = function(p) {
    return L(p) === o;
  }, R.isStrictMode = function(p) {
    return L(p) === i;
  }, R.isSuspense = function(p) {
    return L(p) === d;
  }, R.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === u || p === o || p === i || p === d || p === m || typeof p == "object" && p !== null && (p.$$typeof === A || p.$$typeof === y || p.$$typeof === c || p.$$typeof === a || p.$$typeof === f || p.$$typeof === C || p.$$typeof === k || p.$$typeof === H || p.$$typeof === T);
  }, R.typeOf = L, R;
}
var M = {};
var tt;
function Kt() {
  return tt || (tt = 1, process.env.NODE_ENV !== "production" && (function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? /* @__PURE__ */ Symbol.for("react.element") : 60103, n = t ? /* @__PURE__ */ Symbol.for("react.portal") : 60106, r = t ? /* @__PURE__ */ Symbol.for("react.fragment") : 60107, i = t ? /* @__PURE__ */ Symbol.for("react.strict_mode") : 60108, o = t ? /* @__PURE__ */ Symbol.for("react.profiler") : 60114, c = t ? /* @__PURE__ */ Symbol.for("react.provider") : 60109, a = t ? /* @__PURE__ */ Symbol.for("react.context") : 60110, s = t ? /* @__PURE__ */ Symbol.for("react.async_mode") : 60111, u = t ? /* @__PURE__ */ Symbol.for("react.concurrent_mode") : 60111, f = t ? /* @__PURE__ */ Symbol.for("react.forward_ref") : 60112, d = t ? /* @__PURE__ */ Symbol.for("react.suspense") : 60113, m = t ? /* @__PURE__ */ Symbol.for("react.suspense_list") : 60120, y = t ? /* @__PURE__ */ Symbol.for("react.memo") : 60115, A = t ? /* @__PURE__ */ Symbol.for("react.lazy") : 60116, T = t ? /* @__PURE__ */ Symbol.for("react.block") : 60121, C = t ? /* @__PURE__ */ Symbol.for("react.fundamental") : 60117, k = t ? /* @__PURE__ */ Symbol.for("react.responder") : 60118, H = t ? /* @__PURE__ */ Symbol.for("react.scope") : 60119;
    function L(h) {
      return typeof h == "string" || typeof h == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      h === r || h === u || h === o || h === i || h === d || h === m || typeof h == "object" && h !== null && (h.$$typeof === A || h.$$typeof === y || h.$$typeof === c || h.$$typeof === a || h.$$typeof === f || h.$$typeof === C || h.$$typeof === k || h.$$typeof === H || h.$$typeof === T);
    }
    function j(h) {
      if (typeof h == "object" && h !== null) {
        var B = h.$$typeof;
        switch (B) {
          case e:
            var le = h.type;
            switch (le) {
              case s:
              case u:
              case r:
              case o:
              case i:
              case d:
                return le;
              default:
                var Ke = le && le.$$typeof;
                switch (Ke) {
                  case a:
                  case f:
                  case A:
                  case y:
                  case c:
                    return Ke;
                  default:
                    return B;
                }
            }
          case n:
            return B;
        }
      }
    }
    var p = s, G = u, be = a, Te = c, _e = e, Ee = f, ue = r, we = A, Se = y, Z = n, Ce = o, U = i, X = d, fe = !1;
    function Ae(h) {
      return fe || (fe = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), l(h) || j(h) === s;
    }
    function l(h) {
      return j(h) === u;
    }
    function g(h) {
      return j(h) === a;
    }
    function S(h) {
      return j(h) === c;
    }
    function E(h) {
      return typeof h == "object" && h !== null && h.$$typeof === e;
    }
    function b(h) {
      return j(h) === f;
    }
    function x(h) {
      return j(h) === r;
    }
    function _(h) {
      return j(h) === A;
    }
    function w(h) {
      return j(h) === y;
    }
    function O(h) {
      return j(h) === n;
    }
    function I(h) {
      return j(h) === o;
    }
    function P(h) {
      return j(h) === i;
    }
    function D(h) {
      return j(h) === d;
    }
    M.AsyncMode = p, M.ConcurrentMode = G, M.ContextConsumer = be, M.ContextProvider = Te, M.Element = _e, M.ForwardRef = Ee, M.Fragment = ue, M.Lazy = we, M.Memo = Se, M.Portal = Z, M.Profiler = Ce, M.StrictMode = U, M.Suspense = X, M.isAsyncMode = Ae, M.isConcurrentMode = l, M.isContextConsumer = g, M.isContextProvider = S, M.isElement = E, M.isForwardRef = b, M.isFragment = x, M.isLazy = _, M.isMemo = w, M.isPortal = O, M.isProfiler = I, M.isStrictMode = P, M.isSuspense = D, M.isValidElementType = L, M.typeOf = j;
  })()), M;
}
var rt;
function At() {
  return rt || (rt = 1, process.env.NODE_ENV === "production" ? pe.exports = Zt() : pe.exports = Kt()), pe.exports;
}
var xe, nt;
function xt() {
  if (nt) return xe;
  nt = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(o) {
    if (o == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(o);
  }
  function i() {
    try {
      if (!Object.assign)
        return !1;
      var o = new String("abc");
      if (o[5] = "de", Object.getOwnPropertyNames(o)[0] === "5")
        return !1;
      for (var c = {}, a = 0; a < 10; a++)
        c["_" + String.fromCharCode(a)] = a;
      var s = Object.getOwnPropertyNames(c).map(function(f) {
        return c[f];
      });
      if (s.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        u[f] = f;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return xe = i() ? Object.assign : function(o, c) {
    for (var a, s = r(o), u, f = 1; f < arguments.length; f++) {
      a = Object(arguments[f]);
      for (var d in a)
        e.call(a, d) && (s[d] = a[d]);
      if (t) {
        u = t(a);
        for (var m = 0; m < u.length; m++)
          n.call(a, u[m]) && (s[u[m]] = a[u[m]]);
      }
    }
    return s;
  }, xe;
}
var Oe, ot;
function Xe() {
  if (ot) return Oe;
  ot = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Oe = t, Oe;
}
var Pe, it;
function Ot() {
  return it || (it = 1, Pe = Function.call.bind(Object.prototype.hasOwnProperty)), Pe;
}
var Re, at;
function er() {
  if (at) return Re;
  at = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = /* @__PURE__ */ Xe(), n = {}, r = /* @__PURE__ */ Ot();
    t = function(o) {
      var c = "Warning: " + o;
      typeof console < "u" && console.error(c);
      try {
        throw new Error(c);
      } catch {
      }
    };
  }
  function i(o, c, a, s, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in o)
        if (r(o, f)) {
          var d;
          try {
            if (typeof o[f] != "function") {
              var m = Error(
                (s || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof o[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw m.name = "Invariant Violation", m;
            }
            d = o[f](c, f, s, a, null, e);
          } catch (A) {
            d = A;
          }
          if (d && !(d instanceof Error) && t(
            (s || "React class") + ": type specification of " + a + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof d + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), d instanceof Error && !(d.message in n)) {
            n[d.message] = !0;
            var y = u ? u() : "";
            t(
              "Failed " + a + " type: " + d.message + (y ?? "")
            );
          }
        }
    }
  }
  return i.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Re = i, Re;
}
var Me, st;
function tr() {
  if (st) return Me;
  st = 1;
  var t = At(), e = xt(), n = /* @__PURE__ */ Xe(), r = /* @__PURE__ */ Ot(), i = /* @__PURE__ */ er(), o = function() {
  };
  process.env.NODE_ENV !== "production" && (o = function(a) {
    var s = "Warning: " + a;
    typeof console < "u" && console.error(s);
    try {
      throw new Error(s);
    } catch {
    }
  });
  function c() {
    return null;
  }
  return Me = function(a, s) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function d(l) {
      var g = l && (u && l[u] || l[f]);
      if (typeof g == "function")
        return g;
    }
    var m = "<<anonymous>>", y = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: H(),
      arrayOf: L,
      element: j(),
      elementType: p(),
      instanceOf: G,
      node: Ee(),
      objectOf: Te,
      oneOf: be,
      oneOfType: _e,
      shape: we,
      exact: Se
    };
    function A(l, g) {
      return l === g ? l !== 0 || 1 / l === 1 / g : l !== l && g !== g;
    }
    function T(l, g) {
      this.message = l, this.data = g && typeof g == "object" ? g : {}, this.stack = "";
    }
    T.prototype = Error.prototype;
    function C(l) {
      if (process.env.NODE_ENV !== "production")
        var g = {}, S = 0;
      function E(x, _, w, O, I, P, D) {
        if (O = O || m, P = P || w, D !== n) {
          if (s) {
            var h = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw h.name = "Invariant Violation", h;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var B = O + ":" + w;
            !g[B] && // Avoid spamming the console because they are often not actionable except for lib authors
            S < 3 && (o(
              "You are manually calling a React.PropTypes validation function for the `" + P + "` prop on `" + O + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), g[B] = !0, S++);
          }
        }
        return _[w] == null ? x ? _[w] === null ? new T("The " + I + " `" + P + "` is marked as required " + ("in `" + O + "`, but its value is `null`.")) : new T("The " + I + " `" + P + "` is marked as required in " + ("`" + O + "`, but its value is `undefined`.")) : null : l(_, w, O, I, P);
      }
      var b = E.bind(null, !1);
      return b.isRequired = E.bind(null, !0), b;
    }
    function k(l) {
      function g(S, E, b, x, _, w) {
        var O = S[E], I = U(O);
        if (I !== l) {
          var P = X(O);
          return new T(
            "Invalid " + x + " `" + _ + "` of type " + ("`" + P + "` supplied to `" + b + "`, expected ") + ("`" + l + "`."),
            { expectedType: l }
          );
        }
        return null;
      }
      return C(g);
    }
    function H() {
      return C(c);
    }
    function L(l) {
      function g(S, E, b, x, _) {
        if (typeof l != "function")
          return new T("Property `" + _ + "` of component `" + b + "` has invalid PropType notation inside arrayOf.");
        var w = S[E];
        if (!Array.isArray(w)) {
          var O = U(w);
          return new T("Invalid " + x + " `" + _ + "` of type " + ("`" + O + "` supplied to `" + b + "`, expected an array."));
        }
        for (var I = 0; I < w.length; I++) {
          var P = l(w, I, b, x, _ + "[" + I + "]", n);
          if (P instanceof Error)
            return P;
        }
        return null;
      }
      return C(g);
    }
    function j() {
      function l(g, S, E, b, x) {
        var _ = g[S];
        if (!a(_)) {
          var w = U(_);
          return new T("Invalid " + b + " `" + x + "` of type " + ("`" + w + "` supplied to `" + E + "`, expected a single ReactElement."));
        }
        return null;
      }
      return C(l);
    }
    function p() {
      function l(g, S, E, b, x) {
        var _ = g[S];
        if (!t.isValidElementType(_)) {
          var w = U(_);
          return new T("Invalid " + b + " `" + x + "` of type " + ("`" + w + "` supplied to `" + E + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return C(l);
    }
    function G(l) {
      function g(S, E, b, x, _) {
        if (!(S[E] instanceof l)) {
          var w = l.name || m, O = Ae(S[E]);
          return new T("Invalid " + x + " `" + _ + "` of type " + ("`" + O + "` supplied to `" + b + "`, expected ") + ("instance of `" + w + "`."));
        }
        return null;
      }
      return C(g);
    }
    function be(l) {
      if (!Array.isArray(l))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? o(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : o("Invalid argument supplied to oneOf, expected an array.")), c;
      function g(S, E, b, x, _) {
        for (var w = S[E], O = 0; O < l.length; O++)
          if (A(w, l[O]))
            return null;
        var I = JSON.stringify(l, function(D, h) {
          var B = X(h);
          return B === "symbol" ? String(h) : h;
        });
        return new T("Invalid " + x + " `" + _ + "` of value `" + String(w) + "` " + ("supplied to `" + b + "`, expected one of " + I + "."));
      }
      return C(g);
    }
    function Te(l) {
      function g(S, E, b, x, _) {
        if (typeof l != "function")
          return new T("Property `" + _ + "` of component `" + b + "` has invalid PropType notation inside objectOf.");
        var w = S[E], O = U(w);
        if (O !== "object")
          return new T("Invalid " + x + " `" + _ + "` of type " + ("`" + O + "` supplied to `" + b + "`, expected an object."));
        for (var I in w)
          if (r(w, I)) {
            var P = l(w, I, b, x, _ + "." + I, n);
            if (P instanceof Error)
              return P;
          }
        return null;
      }
      return C(g);
    }
    function _e(l) {
      if (!Array.isArray(l))
        return process.env.NODE_ENV !== "production" && o("Invalid argument supplied to oneOfType, expected an instance of array."), c;
      for (var g = 0; g < l.length; g++) {
        var S = l[g];
        if (typeof S != "function")
          return o(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + fe(S) + " at index " + g + "."
          ), c;
      }
      function E(b, x, _, w, O) {
        for (var I = [], P = 0; P < l.length; P++) {
          var D = l[P], h = D(b, x, _, w, O, n);
          if (h == null)
            return null;
          h.data && r(h.data, "expectedType") && I.push(h.data.expectedType);
        }
        var B = I.length > 0 ? ", expected one of type [" + I.join(", ") + "]" : "";
        return new T("Invalid " + w + " `" + O + "` supplied to " + ("`" + _ + "`" + B + "."));
      }
      return C(E);
    }
    function Ee() {
      function l(g, S, E, b, x) {
        return Z(g[S]) ? null : new T("Invalid " + b + " `" + x + "` supplied to " + ("`" + E + "`, expected a ReactNode."));
      }
      return C(l);
    }
    function ue(l, g, S, E, b) {
      return new T(
        (l || "React class") + ": " + g + " type `" + S + "." + E + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + b + "`."
      );
    }
    function we(l) {
      function g(S, E, b, x, _) {
        var w = S[E], O = U(w);
        if (O !== "object")
          return new T("Invalid " + x + " `" + _ + "` of type `" + O + "` " + ("supplied to `" + b + "`, expected `object`."));
        for (var I in l) {
          var P = l[I];
          if (typeof P != "function")
            return ue(b, x, _, I, X(P));
          var D = P(w, I, b, x, _ + "." + I, n);
          if (D)
            return D;
        }
        return null;
      }
      return C(g);
    }
    function Se(l) {
      function g(S, E, b, x, _) {
        var w = S[E], O = U(w);
        if (O !== "object")
          return new T("Invalid " + x + " `" + _ + "` of type `" + O + "` " + ("supplied to `" + b + "`, expected `object`."));
        var I = e({}, S[E], l);
        for (var P in I) {
          var D = l[P];
          if (r(l, P) && typeof D != "function")
            return ue(b, x, _, P, X(D));
          if (!D)
            return new T(
              "Invalid " + x + " `" + _ + "` key `" + P + "` supplied to `" + b + "`.\nBad object: " + JSON.stringify(S[E], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(l), null, "  ")
            );
          var h = D(w, P, b, x, _ + "." + P, n);
          if (h)
            return h;
        }
        return null;
      }
      return C(g);
    }
    function Z(l) {
      switch (typeof l) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !l;
        case "object":
          if (Array.isArray(l))
            return l.every(Z);
          if (l === null || a(l))
            return !0;
          var g = d(l);
          if (g) {
            var S = g.call(l), E;
            if (g !== l.entries) {
              for (; !(E = S.next()).done; )
                if (!Z(E.value))
                  return !1;
            } else
              for (; !(E = S.next()).done; ) {
                var b = E.value;
                if (b && !Z(b[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function Ce(l, g) {
      return l === "symbol" ? !0 : g ? g["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && g instanceof Symbol : !1;
    }
    function U(l) {
      var g = typeof l;
      return Array.isArray(l) ? "array" : l instanceof RegExp ? "object" : Ce(g, l) ? "symbol" : g;
    }
    function X(l) {
      if (typeof l > "u" || l === null)
        return "" + l;
      var g = U(l);
      if (g === "object") {
        if (l instanceof Date)
          return "date";
        if (l instanceof RegExp)
          return "regexp";
      }
      return g;
    }
    function fe(l) {
      var g = X(l);
      switch (g) {
        case "array":
        case "object":
          return "an " + g;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + g;
        default:
          return g;
      }
    }
    function Ae(l) {
      return !l.constructor || !l.constructor.name ? m : l.constructor.name;
    }
    return y.checkPropTypes = i, y.resetWarningCache = i.resetWarningCache, y.PropTypes = y, y;
  }, Me;
}
var Ie, ct;
function rr() {
  if (ct) return Ie;
  ct = 1;
  var t = /* @__PURE__ */ Xe();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Ie = function() {
    function r(c, a, s, u, f, d) {
      if (d !== t) {
        var m = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw m.name = "Invariant Violation", m;
      }
    }
    r.isRequired = r;
    function i() {
      return r;
    }
    var o = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: i,
      element: r,
      elementType: r,
      instanceOf: i,
      node: r,
      objectOf: i,
      oneOf: i,
      oneOfType: i,
      shape: i,
      exact: i,
      checkPropTypes: n,
      resetWarningCache: e
    };
    return o.PropTypes = o, o;
  }, Ie;
}
var ut;
function nr() {
  if (ut) return de.exports;
  if (ut = 1, process.env.NODE_ENV !== "production") {
    var t = At(), e = !0;
    de.exports = /* @__PURE__ */ tr()(t.isElement, e);
  } else
    de.exports = /* @__PURE__ */ rr()();
  return de.exports;
}
var or = /* @__PURE__ */ nr();
const N = /* @__PURE__ */ me(or);
var ke, ft;
function ir() {
  if (ft) return ke;
  ft = 1;
  function t(a) {
    return a && typeof a == "object" && "default" in a ? a.default : a;
  }
  var e = V, n = t(e);
  function r(a, s, u) {
    return s in a ? Object.defineProperty(a, s, {
      value: u,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : a[s] = u, a;
  }
  function i(a, s) {
    a.prototype = Object.create(s.prototype), a.prototype.constructor = a, a.__proto__ = s;
  }
  var o = !!(typeof window < "u" && window.document && window.document.createElement);
  function c(a, s, u) {
    if (typeof a != "function")
      throw new Error("Expected reducePropsToState to be a function.");
    if (typeof s != "function")
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    if (typeof u < "u" && typeof u != "function")
      throw new Error("Expected mapStateOnServer to either be undefined or a function.");
    function f(d) {
      return d.displayName || d.name || "Component";
    }
    return function(m) {
      if (typeof m != "function")
        throw new Error("Expected WrappedComponent to be a React component.");
      var y = [], A;
      function T() {
        A = a(y.map(function(k) {
          return k.props;
        })), C.canUseDOM ? s(A) : u && (A = u(A));
      }
      var C = /* @__PURE__ */ (function(k) {
        i(H, k);
        function H() {
          return k.apply(this, arguments) || this;
        }
        H.peek = function() {
          return A;
        }, H.rewind = function() {
          if (H.canUseDOM)
            throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");
          var p = A;
          return A = void 0, y = [], p;
        };
        var L = H.prototype;
        return L.UNSAFE_componentWillMount = function() {
          y.push(this), T();
        }, L.componentDidUpdate = function() {
          T();
        }, L.componentWillUnmount = function() {
          var p = y.indexOf(this);
          y.splice(p, 1), T();
        }, L.render = function() {
          return n.createElement(m, this.props);
        }, H;
      })(e.PureComponent);
      return r(C, "displayName", "SideEffect(" + f(m) + ")"), r(C, "canUseDOM", o), C;
    };
  }
  return ke = c, ke;
}
var ar = ir();
const sr = /* @__PURE__ */ me(ar);
var je, lt;
function cr() {
  if (lt) return je;
  lt = 1;
  var t = typeof Element < "u", e = typeof Map == "function", n = typeof Set == "function", r = typeof ArrayBuffer == "function" && !!ArrayBuffer.isView;
  function i(o, c) {
    if (o === c) return !0;
    if (o && c && typeof o == "object" && typeof c == "object") {
      if (o.constructor !== c.constructor) return !1;
      var a, s, u;
      if (Array.isArray(o)) {
        if (a = o.length, a != c.length) return !1;
        for (s = a; s-- !== 0; )
          if (!i(o[s], c[s])) return !1;
        return !0;
      }
      var f;
      if (e && o instanceof Map && c instanceof Map) {
        if (o.size !== c.size) return !1;
        for (f = o.entries(); !(s = f.next()).done; )
          if (!c.has(s.value[0])) return !1;
        for (f = o.entries(); !(s = f.next()).done; )
          if (!i(s.value[1], c.get(s.value[0]))) return !1;
        return !0;
      }
      if (n && o instanceof Set && c instanceof Set) {
        if (o.size !== c.size) return !1;
        for (f = o.entries(); !(s = f.next()).done; )
          if (!c.has(s.value[0])) return !1;
        return !0;
      }
      if (r && ArrayBuffer.isView(o) && ArrayBuffer.isView(c)) {
        if (a = o.length, a != c.length) return !1;
        for (s = a; s-- !== 0; )
          if (o[s] !== c[s]) return !1;
        return !0;
      }
      if (o.constructor === RegExp) return o.source === c.source && o.flags === c.flags;
      if (o.valueOf !== Object.prototype.valueOf && typeof o.valueOf == "function" && typeof c.valueOf == "function") return o.valueOf() === c.valueOf();
      if (o.toString !== Object.prototype.toString && typeof o.toString == "function" && typeof c.toString == "function") return o.toString() === c.toString();
      if (u = Object.keys(o), a = u.length, a !== Object.keys(c).length) return !1;
      for (s = a; s-- !== 0; )
        if (!Object.prototype.hasOwnProperty.call(c, u[s])) return !1;
      if (t && o instanceof Element) return !1;
      for (s = a; s-- !== 0; )
        if (!((u[s] === "_owner" || u[s] === "__v" || u[s] === "__o") && o.$$typeof) && !i(o[u[s]], c[u[s]]))
          return !1;
      return !0;
    }
    return o !== o && c !== c;
  }
  return je = function(c, a) {
    try {
      return i(c, a);
    } catch (s) {
      if ((s.message || "").match(/stack|recursion/i))
        return console.warn("react-fast-compare cannot handle circular refs"), !1;
      throw s;
    }
  }, je;
}
var ur = cr();
const fr = /* @__PURE__ */ me(ur);
var lr = xt();
const dr = /* @__PURE__ */ me(lr);
var J = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
}, v = {
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
}, dt = Object.keys(v).map(function(t) {
  return v[t];
}), $ = {
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
}, ge = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
}, ce = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
}, pr = Object.keys(ge).reduce(function(t, e) {
  return t[ge[e]] = e, t;
}, {}), hr = [v.NOSCRIPT, v.SCRIPT, v.STYLE], Y = "data-react-helmet", gr = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
  return typeof t;
} : function(t) {
  return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, mr = function(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}, yr = /* @__PURE__ */ (function() {
  function t(e, n) {
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
    }
  }
  return function(e, n, r) {
    return n && t(e.prototype, n), r && t(e, r), e;
  };
})(), F = Object.assign || function(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e];
    for (var r in n)
      Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
  }
  return t;
}, vr = function(t, e) {
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
}, pt = function(t, e) {
  var n = {};
  for (var r in t)
    e.indexOf(r) >= 0 || Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
  return n;
}, br = function(t, e) {
  if (!t)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e && (typeof e == "object" || typeof e == "function") ? e : t;
}, He = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !0;
  return n === !1 ? String(e) : String(e).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}, Tr = function(e) {
  var n = te(e, v.TITLE), r = te(e, ce.TITLE_TEMPLATE);
  if (r && n)
    return r.replace(/%s/g, function() {
      return Array.isArray(n) ? n.join("") : n;
    });
  var i = te(e, ce.DEFAULT_TITLE);
  return n || i || void 0;
}, _r = function(e) {
  return te(e, ce.ON_CHANGE_CLIENT_STATE) || function() {
  };
}, Le = function(e, n) {
  return n.filter(function(r) {
    return typeof r[e] < "u";
  }).map(function(r) {
    return r[e];
  }).reduce(function(r, i) {
    return F({}, r, i);
  }, {});
}, Er = function(e, n) {
  return n.filter(function(r) {
    return typeof r[v.BASE] < "u";
  }).map(function(r) {
    return r[v.BASE];
  }).reverse().reduce(function(r, i) {
    if (!r.length)
      for (var o = Object.keys(i), c = 0; c < o.length; c++) {
        var a = o[c], s = a.toLowerCase();
        if (e.indexOf(s) !== -1 && i[s])
          return r.concat(i);
      }
    return r;
  }, []);
}, ne = function(e, n, r) {
  var i = {};
  return r.filter(function(o) {
    return Array.isArray(o[e]) ? !0 : (typeof o[e] < "u" && qe("Helmet: " + e + ' should be of type "Array". Instead found type "' + gr(o[e]) + '"'), !1);
  }).map(function(o) {
    return o[e];
  }).reverse().reduce(function(o, c) {
    var a = {};
    c.filter(function(m) {
      for (var y = void 0, A = Object.keys(m), T = 0; T < A.length; T++) {
        var C = A[T], k = C.toLowerCase();
        n.indexOf(k) !== -1 && !(y === $.REL && m[y].toLowerCase() === "canonical") && !(k === $.REL && m[k].toLowerCase() === "stylesheet") && (y = k), n.indexOf(C) !== -1 && (C === $.INNER_HTML || C === $.CSS_TEXT || C === $.ITEM_PROP) && (y = C);
      }
      if (!y || !m[y])
        return !1;
      var H = m[y].toLowerCase();
      return i[y] || (i[y] = {}), a[y] || (a[y] = {}), i[y][H] ? !1 : (a[y][H] = !0, !0);
    }).reverse().forEach(function(m) {
      return o.push(m);
    });
    for (var s = Object.keys(a), u = 0; u < s.length; u++) {
      var f = s[u], d = dr({}, i[f], a[f]);
      i[f] = d;
    }
    return o;
  }, []).reverse();
}, te = function(e, n) {
  for (var r = e.length - 1; r >= 0; r--) {
    var i = e[r];
    if (i.hasOwnProperty(n))
      return i[n];
  }
  return null;
}, wr = function(e) {
  return {
    baseTag: Er([$.HREF, $.TARGET], e),
    bodyAttributes: Le(J.BODY, e),
    defer: te(e, ce.DEFER),
    encode: te(e, ce.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: Le(J.HTML, e),
    linkTags: ne(v.LINK, [$.REL, $.HREF], e),
    metaTags: ne(v.META, [$.NAME, $.CHARSET, $.HTTPEQUIV, $.PROPERTY, $.ITEM_PROP], e),
    noscriptTags: ne(v.NOSCRIPT, [$.INNER_HTML], e),
    onChangeClientState: _r(e),
    scriptTags: ne(v.SCRIPT, [$.SRC, $.INNER_HTML], e),
    styleTags: ne(v.STYLE, [$.CSS_TEXT], e),
    title: Tr(e),
    titleAttributes: Le(J.TITLE, e)
  };
}, ze = (function() {
  var t = Date.now();
  return function(e) {
    var n = Date.now();
    n - t > 16 ? (t = n, e(n)) : setTimeout(function() {
      ze(e);
    }, 0);
  };
})(), ht = function(e) {
  return clearTimeout(e);
}, Sr = typeof window < "u" ? window.requestAnimationFrame && window.requestAnimationFrame.bind(window) || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || ze : global.requestAnimationFrame || ze, Cr = typeof window < "u" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || ht : global.cancelAnimationFrame || ht, qe = function(e) {
  return console && typeof console.warn == "function" && console.warn(e);
}, oe = null, Ar = function(e) {
  oe && Cr(oe), e.defer ? oe = Sr(function() {
    gt(e, function() {
      oe = null;
    });
  }) : (gt(e), oe = null);
}, gt = function(e, n) {
  var r = e.baseTag, i = e.bodyAttributes, o = e.htmlAttributes, c = e.linkTags, a = e.metaTags, s = e.noscriptTags, u = e.onChangeClientState, f = e.scriptTags, d = e.styleTags, m = e.title, y = e.titleAttributes;
  De(v.BODY, i), De(v.HTML, o), xr(m, y);
  var A = {
    baseTag: K(v.BASE, r),
    linkTags: K(v.LINK, c),
    metaTags: K(v.META, a),
    noscriptTags: K(v.NOSCRIPT, s),
    scriptTags: K(v.SCRIPT, f),
    styleTags: K(v.STYLE, d)
  }, T = {}, C = {};
  Object.keys(A).forEach(function(k) {
    var H = A[k], L = H.newTags, j = H.oldTags;
    L.length && (T[k] = L), j.length && (C[k] = A[k].oldTags);
  }), n && n(), u(e, T, C);
}, Pt = function(e) {
  return Array.isArray(e) ? e.join("") : e;
}, xr = function(e, n) {
  typeof e < "u" && document.title !== e && (document.title = Pt(e)), De(v.TITLE, n);
}, De = function(e, n) {
  var r = document.getElementsByTagName(e)[0];
  if (r) {
    for (var i = r.getAttribute(Y), o = i ? i.split(",") : [], c = [].concat(o), a = Object.keys(n), s = 0; s < a.length; s++) {
      var u = a[s], f = n[u] || "";
      r.getAttribute(u) !== f && r.setAttribute(u, f), o.indexOf(u) === -1 && o.push(u);
      var d = c.indexOf(u);
      d !== -1 && c.splice(d, 1);
    }
    for (var m = c.length - 1; m >= 0; m--)
      r.removeAttribute(c[m]);
    o.length === c.length ? r.removeAttribute(Y) : r.getAttribute(Y) !== a.join(",") && r.setAttribute(Y, a.join(","));
  }
}, K = function(e, n) {
  var r = document.head || document.querySelector(v.HEAD), i = r.querySelectorAll(e + "[" + Y + "]"), o = Array.prototype.slice.call(i), c = [], a = void 0;
  return n && n.length && n.forEach(function(s) {
    var u = document.createElement(e);
    for (var f in s)
      if (s.hasOwnProperty(f))
        if (f === $.INNER_HTML)
          u.innerHTML = s.innerHTML;
        else if (f === $.CSS_TEXT)
          u.styleSheet ? u.styleSheet.cssText = s.cssText : u.appendChild(document.createTextNode(s.cssText));
        else {
          var d = typeof s[f] > "u" ? "" : s[f];
          u.setAttribute(f, d);
        }
    u.setAttribute(Y, "true"), o.some(function(m, y) {
      return a = y, u.isEqualNode(m);
    }) ? o.splice(a, 1) : c.push(u);
  }), o.forEach(function(s) {
    return s.parentNode.removeChild(s);
  }), c.forEach(function(s) {
    return r.appendChild(s);
  }), {
    oldTags: o,
    newTags: c
  };
}, Rt = function(e) {
  return Object.keys(e).reduce(function(n, r) {
    var i = typeof e[r] < "u" ? r + '="' + e[r] + '"' : "" + r;
    return n ? n + " " + i : i;
  }, "");
}, Or = function(e, n, r, i) {
  var o = Rt(r), c = Pt(n);
  return o ? "<" + e + " " + Y + '="true" ' + o + ">" + He(c, i) + "</" + e + ">" : "<" + e + " " + Y + '="true">' + He(c, i) + "</" + e + ">";
}, Pr = function(e, n, r) {
  return n.reduce(function(i, o) {
    var c = Object.keys(o).filter(function(u) {
      return !(u === $.INNER_HTML || u === $.CSS_TEXT);
    }).reduce(function(u, f) {
      var d = typeof o[f] > "u" ? f : f + '="' + He(o[f], r) + '"';
      return u ? u + " " + d : d;
    }, ""), a = o.innerHTML || o.cssText || "", s = hr.indexOf(e) === -1;
    return i + "<" + e + " " + Y + '="true" ' + c + (s ? "/>" : ">" + a + "</" + e + ">");
  }, "");
}, Mt = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(e).reduce(function(r, i) {
    return r[ge[i] || i] = e[i], r;
  }, n);
}, Rr = function(e) {
  var n = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return Object.keys(e).reduce(function(r, i) {
    return r[pr[i] || i] = e[i], r;
  }, n);
}, Mr = function(e, n, r) {
  var i, o = (i = {
    key: n
  }, i[Y] = !0, i), c = Mt(r, o);
  return [V.createElement(v.TITLE, c, n)];
}, Ir = function(e, n) {
  return n.map(function(r, i) {
    var o, c = (o = {
      key: i
    }, o[Y] = !0, o);
    return Object.keys(r).forEach(function(a) {
      var s = ge[a] || a;
      if (s === $.INNER_HTML || s === $.CSS_TEXT) {
        var u = r.innerHTML || r.cssText;
        c.dangerouslySetInnerHTML = { __html: u };
      } else
        c[s] = r[a];
    }), V.createElement(e, c);
  });
}, W = function(e, n, r) {
  switch (e) {
    case v.TITLE:
      return {
        toComponent: function() {
          return Mr(e, n.title, n.titleAttributes);
        },
        toString: function() {
          return Or(e, n.title, n.titleAttributes, r);
        }
      };
    case J.BODY:
    case J.HTML:
      return {
        toComponent: function() {
          return Mt(n);
        },
        toString: function() {
          return Rt(n);
        }
      };
    default:
      return {
        toComponent: function() {
          return Ir(e, n);
        },
        toString: function() {
          return Pr(e, n, r);
        }
      };
  }
}, It = function(e) {
  var n = e.baseTag, r = e.bodyAttributes, i = e.encode, o = e.htmlAttributes, c = e.linkTags, a = e.metaTags, s = e.noscriptTags, u = e.scriptTags, f = e.styleTags, d = e.title, m = d === void 0 ? "" : d, y = e.titleAttributes;
  return {
    base: W(v.BASE, n, i),
    bodyAttributes: W(J.BODY, r, i),
    htmlAttributes: W(J.HTML, o, i),
    link: W(v.LINK, c, i),
    meta: W(v.META, a, i),
    noscript: W(v.NOSCRIPT, s, i),
    script: W(v.SCRIPT, u, i),
    style: W(v.STYLE, f, i),
    title: W(v.TITLE, { title: m, titleAttributes: y }, i)
  };
}, kr = function(e) {
  var n, r;
  return r = n = (function(i) {
    vr(o, i);
    function o() {
      return mr(this, o), br(this, i.apply(this, arguments));
    }
    return o.prototype.shouldComponentUpdate = function(a) {
      return !fr(this.props, a);
    }, o.prototype.mapNestedChildrenToProps = function(a, s) {
      if (!s)
        return null;
      switch (a.type) {
        case v.SCRIPT:
        case v.NOSCRIPT:
          return {
            innerHTML: s
          };
        case v.STYLE:
          return {
            cssText: s
          };
      }
      throw new Error("<" + a.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    }, o.prototype.flattenArrayTypeChildren = function(a) {
      var s, u = a.child, f = a.arrayTypeChildren, d = a.newChildProps, m = a.nestedChildren;
      return F({}, f, (s = {}, s[u.type] = [].concat(f[u.type] || [], [F({}, d, this.mapNestedChildrenToProps(u, m))]), s));
    }, o.prototype.mapObjectTypeChildren = function(a) {
      var s, u, f = a.child, d = a.newProps, m = a.newChildProps, y = a.nestedChildren;
      switch (f.type) {
        case v.TITLE:
          return F({}, d, (s = {}, s[f.type] = y, s.titleAttributes = F({}, m), s));
        case v.BODY:
          return F({}, d, {
            bodyAttributes: F({}, m)
          });
        case v.HTML:
          return F({}, d, {
            htmlAttributes: F({}, m)
          });
      }
      return F({}, d, (u = {}, u[f.type] = F({}, m), u));
    }, o.prototype.mapArrayTypeChildrenToProps = function(a, s) {
      var u = F({}, s);
      return Object.keys(a).forEach(function(f) {
        var d;
        u = F({}, u, (d = {}, d[f] = a[f], d));
      }), u;
    }, o.prototype.warnOnInvalidChildren = function(a, s) {
      if (process.env.NODE_ENV !== "production") {
        if (!dt.some(function(u) {
          return a.type === u;
        }))
          return typeof a.type == "function" ? qe("You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.") : qe("Only elements types " + dt.join(", ") + " are allowed. Helmet does not support rendering <" + a.type + "> elements. Refer to our API for more information.");
        if (s && typeof s != "string" && (!Array.isArray(s) || s.some(function(u) {
          return typeof u != "string";
        })))
          throw new Error("Helmet expects a string as a child of <" + a.type + ">. Did you forget to wrap your children in braces? ( <" + a.type + ">{``}</" + a.type + "> ) Refer to our API for more information.");
      }
      return !0;
    }, o.prototype.mapChildrenToProps = function(a, s) {
      var u = this, f = {};
      return V.Children.forEach(a, function(d) {
        if (!(!d || !d.props)) {
          var m = d.props, y = m.children, A = pt(m, ["children"]), T = Rr(A);
          switch (u.warnOnInvalidChildren(d, y), d.type) {
            case v.LINK:
            case v.META:
            case v.NOSCRIPT:
            case v.SCRIPT:
            case v.STYLE:
              f = u.flattenArrayTypeChildren({
                child: d,
                arrayTypeChildren: f,
                newChildProps: T,
                nestedChildren: y
              });
              break;
            default:
              s = u.mapObjectTypeChildren({
                child: d,
                newProps: s,
                newChildProps: T,
                nestedChildren: y
              });
              break;
          }
        }
      }), s = this.mapArrayTypeChildrenToProps(f, s), s;
    }, o.prototype.render = function() {
      var a = this.props, s = a.children, u = pt(a, ["children"]), f = F({}, u);
      return s && (f = this.mapChildrenToProps(s, f)), V.createElement(e, f);
    }, yr(o, null, [{
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
      set: function(a) {
        e.canUseDOM = a;
      }
    }]), o;
  })(V.Component), n.propTypes = {
    base: N.object,
    bodyAttributes: N.object,
    children: N.oneOfType([N.arrayOf(N.node), N.node]),
    defaultTitle: N.string,
    defer: N.bool,
    encodeSpecialCharacters: N.bool,
    htmlAttributes: N.object,
    link: N.arrayOf(N.object),
    meta: N.arrayOf(N.object),
    noscript: N.arrayOf(N.object),
    onChangeClientState: N.func,
    script: N.arrayOf(N.object),
    style: N.arrayOf(N.object),
    title: N.string,
    titleAttributes: N.object,
    titleTemplate: N.string
  }, n.defaultProps = {
    defer: !0,
    encodeSpecialCharacters: !0
  }, n.peek = e.peek, n.rewind = function() {
    var i = e.rewind();
    return i || (i = It({
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
    })), i;
  }, r;
}, jr = function() {
  return null;
}, Lr = sr(wr, Ar, It)(jr), Fe = kr(Lr);
Fe.renderStatic = Fe.rewind;
const Nr = (t) => {
  const { extname: e, ...n } = t;
  return /* @__PURE__ */ q("svg", { ...n, children: /* @__PURE__ */ q("use", { xlinkHref: `#${(() => {
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
}, kt = /* @__PURE__ */ Wt({});
function jt(t) {
  var e, n, r = "";
  if (typeof t == "string" || typeof t == "number") r += t;
  else if (typeof t == "object") if (Array.isArray(t)) {
    var i = t.length;
    for (e = 0; e < i; e++) t[e] && (n = jt(t[e])) && (r && (r += " "), r += n);
  } else for (n in t) t[n] && (r && (r += " "), r += n);
  return r;
}
function Lt() {
  for (var t, e, n = 0, r = "", i = arguments.length; n < i; n++) (t = arguments[n]) && (e = jt(t)) && (r && (r += " "), r += e);
  return r;
}
const $r = {
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
}, z = Math.round;
function Ne(t, e) {
  const n = t.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [], r = n.map((i) => parseFloat(i));
  for (let i = 0; i < 3; i += 1)
    r[i] = e(r[i] || 0, n[i] || "", i);
  return n[3] ? r[3] = n[3].includes("%") ? r[3] / 100 : r[3] : r[3] = 1, r;
}
const mt = (t, e, n) => n === 0 ? t : t / 100;
function ie(t, e) {
  const n = e || 255;
  return t > n ? n : t < 0 ? 0 : t;
}
class ee {
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
      let i = function(o) {
        return r.startsWith(o);
      };
      const r = e.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(r))
        this.fromHexString(r);
      else if (i("rgb"))
        this.fromRgbString(r);
      else if (i("hsl"))
        this.fromHslString(r);
      else if (i("hsv") || i("hsb"))
        this.fromHsvString(r);
      else {
        const o = $r[r.toLowerCase()];
        o && this.fromHexString(
          // Convert 36 hex to 16 hex
          parseInt(o, 36).toString(16).padStart(6, "0")
        );
      }
    } else if (e instanceof ee)
      this.r = e.r, this.g = e.g, this.b = e.b, this.a = e.a, this._h = e._h, this._s = e._s, this._l = e._l, this._v = e._v;
    else if (n("rgb"))
      this.r = ie(e.r), this.g = ie(e.g), this.b = ie(e.b), this.a = typeof e.a == "number" ? ie(e.a, 1) : 1;
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
    function e(o) {
      const c = o / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    }
    const n = e(this.r), r = e(this.g), i = e(this.b);
    return 0.2126 * n + 0.7152 * r + 0.0722 * i;
  }
  getHue() {
    if (typeof this._h > "u") {
      const e = this.getMax() - this.getMin();
      e === 0 ? this._h = 0 : this._h = z(60 * (this.r === this.getMax() ? (this.g - this.b) / e + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / e + 2 : (this.r - this.g) / e + 4));
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
    let i = this.getLightness() - e / 100;
    return i < 0 && (i = 0), this._c({
      h: n,
      s: r,
      l: i,
      a: this.a
    });
  }
  lighten(e = 10) {
    const n = this.getHue(), r = this.getSaturation();
    let i = this.getLightness() + e / 100;
    return i > 1 && (i = 1), this._c({
      h: n,
      s: r,
      l: i,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(e, n = 50) {
    const r = this._c(e), i = n / 100, o = (a) => (r[a] - this[a]) * i + this[a], c = {
      r: z(o("r")),
      g: z(o("g")),
      b: z(o("b")),
      a: z(o("a") * 100) / 100
    };
    return this._c(c);
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
    const n = this._c(e), r = this.a + n.a * (1 - this.a), i = (o) => z((this[o] * this.a + n[o] * n.a * (1 - this.a)) / r);
    return this._c({
      r: i("r"),
      g: i("g"),
      b: i("b"),
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
    const i = (this.b || 0).toString(16);
    if (e += i.length === 2 ? i : "0" + i, typeof this.a == "number" && this.a >= 0 && this.a < 1) {
      const o = z(this.a * 255).toString(16);
      e += o.length === 2 ? o : "0" + o;
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
    const e = this.getHue(), n = z(this.getSaturation() * 100), r = z(this.getLightness() * 100);
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
    const i = this.clone();
    return i[e] = ie(n, r), i;
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
    function r(i, o) {
      return parseInt(n[i] + n[o || i], 16);
    }
    n.length < 6 ? (this.r = r(0), this.g = r(1), this.b = r(2), this.a = n[3] ? r(3) / 255 : 1) : (this.r = r(0, 1), this.g = r(2, 3), this.b = r(4, 5), this.a = n[6] ? r(6, 7) / 255 : 1);
  }
  fromHsl({
    h: e,
    s: n,
    l: r,
    a: i
  }) {
    if (this._h = e % 360, this._s = n, this._l = r, this.a = typeof i == "number" ? i : 1, n <= 0) {
      const m = z(r * 255);
      this.r = m, this.g = m, this.b = m;
    }
    let o = 0, c = 0, a = 0;
    const s = e / 60, u = (1 - Math.abs(2 * r - 1)) * n, f = u * (1 - Math.abs(s % 2 - 1));
    s >= 0 && s < 1 ? (o = u, c = f) : s >= 1 && s < 2 ? (o = f, c = u) : s >= 2 && s < 3 ? (c = u, a = f) : s >= 3 && s < 4 ? (c = f, a = u) : s >= 4 && s < 5 ? (o = f, a = u) : s >= 5 && s < 6 && (o = u, a = f);
    const d = r - u / 2;
    this.r = z((o + d) * 255), this.g = z((c + d) * 255), this.b = z((a + d) * 255);
  }
  fromHsv({
    h: e,
    s: n,
    v: r,
    a: i
  }) {
    this._h = e % 360, this._s = n, this._v = r, this.a = typeof i == "number" ? i : 1;
    const o = z(r * 255);
    if (this.r = o, this.g = o, this.b = o, n <= 0)
      return;
    const c = e / 60, a = Math.floor(c), s = c - a, u = z(r * (1 - n) * 255), f = z(r * (1 - n * s) * 255), d = z(r * (1 - n * (1 - s)) * 255);
    switch (a) {
      case 0:
        this.g = d, this.b = u;
        break;
      case 1:
        this.r = f, this.b = u;
        break;
      case 2:
        this.r = u, this.b = d;
        break;
      case 3:
        this.r = u, this.g = f;
        break;
      case 4:
        this.r = d, this.g = u;
        break;
      default:
        this.g = u, this.b = f;
        break;
    }
  }
  fromHsvString(e) {
    const n = Ne(e, mt);
    this.fromHsv({
      h: n[0],
      s: n[1],
      v: n[2],
      a: n[3]
    });
  }
  fromHslString(e) {
    const n = Ne(e, mt);
    this.fromHsl({
      h: n[0],
      s: n[1],
      l: n[2],
      a: n[3]
    });
  }
  fromRgbString(e) {
    const n = Ne(e, (r, i) => (
      // Convert percentage to number. e.g. 50% -> 128
      i.includes("%") ? z(r / 100 * 255) : r
    ));
    this.r = n[0], this.g = n[1], this.b = n[2], this.a = n[3];
  }
}
const he = 2, yt = 0.16, Hr = 0.05, zr = 0.05, qr = 0.15, Nt = 5, $t = 4, Dr = [{
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
function vt(t, e, n) {
  let r;
  return Math.round(t.h) >= 60 && Math.round(t.h) <= 240 ? r = n ? Math.round(t.h) - he * e : Math.round(t.h) + he * e : r = n ? Math.round(t.h) + he * e : Math.round(t.h) - he * e, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function bt(t, e, n) {
  if (t.h === 0 && t.s === 0)
    return t.s;
  let r;
  return n ? r = t.s - yt * e : e === $t ? r = t.s + yt : r = t.s + Hr * e, r > 1 && (r = 1), n && e === Nt && r > 0.1 && (r = 0.1), r < 0.06 && (r = 0.06), Math.round(r * 100) / 100;
}
function Tt(t, e, n) {
  let r;
  return n ? r = t.v + zr * e : r = t.v - qr * e, r = Math.max(0, Math.min(1, r)), Math.round(r * 100) / 100;
}
function Fr(t, e = {}) {
  const n = [], r = new ee(t), i = r.toHsv();
  for (let o = Nt; o > 0; o -= 1) {
    const c = new ee({
      h: vt(i, o, !0),
      s: bt(i, o, !0),
      v: Tt(i, o, !0)
    });
    n.push(c);
  }
  n.push(r);
  for (let o = 1; o <= $t; o += 1) {
    const c = new ee({
      h: vt(i, o),
      s: bt(i, o),
      v: Tt(i, o)
    });
    n.push(c);
  }
  return e.theme === "dark" ? Dr.map(({
    index: o,
    amount: c
  }) => new ee(e.backgroundColor || "#141414").mix(n[o], c).toHexString()) : n.map((o) => o.toHexString());
}
const Ye = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
Ye.primary = Ye[5];
function Yr() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}
function Ur(t, e) {
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
const _t = "data-rc-order", Et = "data-rc-priority", Br = "rc-util-key", Ue = /* @__PURE__ */ new Map();
function Ht({
  mark: t
} = {}) {
  return t ? t.startsWith("data-") ? t : `data-${t}` : Br;
}
function Qe(t) {
  return t.attachTo ? t.attachTo : document.querySelector("head") || document.body;
}
function Wr(t) {
  return t === "queue" ? "prependQueue" : t ? "prepend" : "append";
}
function Je(t) {
  return Array.from((Ue.get(t) || t).children).filter((e) => e.tagName === "STYLE");
}
function zt(t, e = {}) {
  if (!Yr())
    return null;
  const {
    csp: n,
    prepend: r,
    priority: i = 0
  } = e, o = Wr(r), c = o === "prependQueue", a = document.createElement("style");
  a.setAttribute(_t, o), c && i && a.setAttribute(Et, `${i}`), n?.nonce && (a.nonce = n?.nonce), a.innerHTML = t;
  const s = Qe(e), {
    firstChild: u
  } = s;
  if (r) {
    if (c) {
      const f = (e.styles || Je(s)).filter((d) => {
        if (!["prepend", "prependQueue"].includes(d.getAttribute(_t)))
          return !1;
        const m = Number(d.getAttribute(Et) || 0);
        return i >= m;
      });
      if (f.length)
        return s.insertBefore(a, f[f.length - 1].nextSibling), a;
    }
    s.insertBefore(a, u);
  } else
    s.appendChild(a);
  return a;
}
function Vr(t, e = {}) {
  let {
    styles: n
  } = e;
  return n ||= Je(Qe(e)), n.find((r) => r.getAttribute(Ht(e)) === t);
}
function Gr(t, e) {
  const n = Ue.get(t);
  if (!n || !Ur(document, n)) {
    const r = zt("", e), {
      parentNode: i
    } = r;
    Ue.set(t, i), t.removeChild(r);
  }
}
function Xr(t, e, n = {}) {
  const r = Qe(n), i = Je(r), o = {
    ...n,
    styles: i
  };
  Gr(r, o);
  const c = Vr(e, o);
  if (c)
    return o.csp?.nonce && c.nonce !== o.csp?.nonce && (c.nonce = o.csp?.nonce), c.innerHTML !== t && (c.innerHTML = t), c;
  const a = zt(t, o);
  return a.setAttribute(Ht(o), e), a;
}
function qt(t) {
  return t?.getRootNode?.();
}
function Qr(t) {
  return qt(t) instanceof ShadowRoot;
}
function Jr(t) {
  return Qr(t) ? qt(t) : null;
}
let Be = {};
const Ze = [], Zr = (t) => {
  Ze.push(t);
};
function Kr(t, e) {
  if (process.env.NODE_ENV !== "production" && !t && console !== void 0) {
    const n = Ze.reduce((r, i) => i(r ?? "", "warning"), e);
    n && console.error(`Warning: ${n}`);
  }
}
function en(t, e) {
  if (process.env.NODE_ENV !== "production" && !t && console !== void 0) {
    const n = Ze.reduce((r, i) => i(r ?? "", "note"), e);
    n && console.warn(`Note: ${n}`);
  }
}
function tn() {
  Be = {};
}
function Dt(t, e, n) {
  !e && !Be[n] && (t(!1, n), Be[n] = !0);
}
function ye(t, e) {
  Dt(Kr, t, e);
}
function rn(t, e) {
  Dt(en, t, e);
}
ye.preMessage = Zr;
ye.resetWarned = tn;
ye.noteOnce = rn;
function nn(t) {
  return t.replace(/-(.)/g, (e, n) => n.toUpperCase());
}
function on(t, e) {
  ye(t, `[@ant-design/icons] ${e}`);
}
function wt(t) {
  return typeof t == "object" && typeof t.name == "string" && typeof t.theme == "string" && (typeof t.icon == "object" || typeof t.icon == "function");
}
function St(t = {}) {
  return Object.keys(t).reduce((e, n) => {
    const r = t[n];
    return n === "class" ? (e.className = r, delete e.class) : (delete e[n], e[nn(n)] = r), e;
  }, {});
}
function We(t, e, n) {
  return n ? /* @__PURE__ */ V.createElement(t.tag, {
    key: e,
    ...St(t.attrs),
    ...n
  }, (t.children || []).map((r, i) => We(r, `${e}-${t.tag}-${i}`))) : /* @__PURE__ */ V.createElement(t.tag, {
    key: e,
    ...St(t.attrs)
  }, (t.children || []).map((r, i) => We(r, `${e}-${t.tag}-${i}`)));
}
function Ft(t) {
  return Fr(t)[0];
}
function Yt(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
const an = `
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
`, sn = (t) => {
  const {
    csp: e,
    prefixCls: n,
    layer: r
  } = Vt(kt);
  let i = an;
  n && (i = i.replace(/anticon/g, n)), r && (i = `@layer ${r} {
${i}
}`), Gt(() => {
    const o = t.current, c = Jr(o);
    Xr(i, "@ant-design-icons", {
      prepend: !r,
      csp: e,
      attachTo: c
    });
  }, []);
}, se = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function cn({
  primaryColor: t,
  secondaryColor: e
}) {
  se.primaryColor = t, se.secondaryColor = e || Ft(t), se.calculated = !!e;
}
function un() {
  return {
    ...se
  };
}
const re = (t) => {
  const {
    icon: e,
    className: n,
    onClick: r,
    style: i,
    primaryColor: o,
    secondaryColor: c,
    ...a
  } = t, s = Q.useRef(null);
  let u = se;
  if (o && (u = {
    primaryColor: o,
    secondaryColor: c || Ft(o)
  }), sn(s), on(wt(e), `icon should be icon definiton, but got ${e}`), !wt(e))
    return null;
  let f = e;
  return f && typeof f.icon == "function" && (f = {
    ...f,
    icon: f.icon(u.primaryColor, u.secondaryColor)
  }), We(f.icon, `svg-${f.name}`, {
    className: n,
    onClick: r,
    style: i,
    "data-icon": f.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true",
    ...a,
    ref: s
  });
};
re.displayName = "IconReact";
re.getTwoToneColors = un;
re.setTwoToneColors = cn;
function Ut(t) {
  const [e, n] = Yt(t);
  return re.setTwoToneColors({
    primaryColor: e,
    secondaryColor: n
  });
}
function fn() {
  const t = re.getTwoToneColors();
  return t.calculated ? [t.primaryColor, t.secondaryColor] : t.primaryColor;
}
function Ve() {
  return Ve = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ve.apply(this, arguments);
}
Ut(Ye.primary);
const ve = /* @__PURE__ */ Q.forwardRef((t, e) => {
  const {
    // affect outter <i>...</i>
    className: n,
    // affect inner <svg>...</svg>
    icon: r,
    spin: i,
    rotate: o,
    tabIndex: c,
    onClick: a,
    // other
    twoToneColor: s,
    ...u
  } = t, {
    prefixCls: f = "anticon",
    rootClassName: d
  } = Q.useContext(kt), m = Lt(d, f, {
    [`${f}-${r.name}`]: !!r.name,
    [`${f}-spin`]: !!i || r.name === "loading"
  }, n);
  let y = c;
  y === void 0 && a && (y = -1);
  const A = o ? {
    msTransform: `rotate(${o}deg)`,
    transform: `rotate(${o}deg)`
  } : void 0, [T, C] = Yt(s);
  return /* @__PURE__ */ Q.createElement("span", Ve({
    role: "img",
    "aria-label": r.name
  }, u, {
    ref: e,
    tabIndex: y,
    onClick: a,
    className: m
  }), /* @__PURE__ */ Q.createElement(re, {
    icon: r,
    primaryColor: T,
    secondaryColor: C,
    style: A
  }));
});
ve.getTwoToneColor = fn;
ve.setTwoToneColor = Ut;
process.env.NODE_ENV !== "production" && (ve.displayName = "AntdIcon");
var ln = { icon: { tag: "svg", attrs: { "fill-rule": "evenodd", viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm127.98 274.82h-.04l-.08.06L512 466.75 384.14 338.88c-.04-.05-.06-.06-.08-.06a.12.12 0 00-.07 0c-.03 0-.05.01-.09.05l-45.02 45.02a.2.2 0 00-.05.09.12.12 0 000 .07v.02a.27.27 0 00.06.06L466.75 512 338.88 639.86c-.05.04-.06.06-.06.08a.12.12 0 000 .07c0 .03.01.05.05.09l45.02 45.02a.2.2 0 00.09.05.12.12 0 00.07 0c.02 0 .04-.01.08-.05L512 557.25l127.86 127.87c.04.04.06.05.08.05a.12.12 0 00.07 0c.03 0 .05-.01.09-.05l45.02-45.02a.2.2 0 00.05-.09.12.12 0 000-.07v-.02a.27.27 0 00-.05-.06L557.25 512l127.87-127.86c.04-.04.05-.06.05-.08a.12.12 0 000-.07c0-.03-.01-.05-.05-.09l-45.02-45.02a.2.2 0 00-.09-.05.12.12 0 00-.07 0z" } }] }, name: "close-circle", theme: "filled" };
function Ge() {
  return Ge = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, Ge.apply(this, arguments);
}
const dn = (t, e) => /* @__PURE__ */ Q.createElement(ve, Ge({}, t, {
  ref: e,
  icon: ln
})), Bt = /* @__PURE__ */ Q.forwardRef(dn);
process.env.NODE_ENV !== "production" && (Bt.displayName = "CloseCircleFilled");
const { Text: $e } = Qt, pn = (t) => {
  const {
    status: e = "uploaded",
    filename: n,
    extname: r,
    size: i,
    i18n: o,
    failedMessage: c,
    onItemPress: a,
    onItemRemove: s
  } = t, u = Xt(() => (e === "uploaded" || e === "failed") && s, [e, s]);
  return /* @__PURE__ */ ae(
    "div",
    {
      className: "group relative w-1/3 p-1.5 box-border",
      onClick: () => {
        a?.(t);
      },
      children: [
        u && /* @__PURE__ */ q(
          $e,
          {
            type: "danger",
            className: "absolute top-2.5 right-2.5 inline-flex items-center cursor-pointer opacity-0 transition group-hover:opacity-100",
            onClick: () => {
              s?.(t);
            },
            children: /* @__PURE__ */ q(Bt, {})
          }
        ),
        /* @__PURE__ */ ae("div", { className: "flex items-center gap-2 p-3 bg-black/4 dark:bg-white/8 rounded-xl", children: [
          /* @__PURE__ */ q(Nr, { className: "min-w-10 size-10", extname: r }),
          /* @__PURE__ */ ae("div", { className: "flex flex-col gap-1 overflow-hidden", children: [
            /* @__PURE__ */ q("span", { className: "text-sm truncate", children: n }),
            /* @__PURE__ */ q($e, { type: "secondary", className: "text-xs", children: e === "uploading" ? o?.labels?.uploading || "Uploading..." : e === "analyzing" ? o?.labels?.analyzing || "Analyzing..." : e === "failed" ? /* @__PURE__ */ q(Jt, { title: c, children: /* @__PURE__ */ q($e, { type: "danger", className: "text-xs", children: o?.labels?.failed || "Upload failed" }) }) : /* @__PURE__ */ ae(Ct, { children: [
              /* @__PURE__ */ q("span", { children: r }),
              /* @__PURE__ */ q("span", { className: "pl-2", children: i })
            ] }) })
          ] })
        ] })
      ]
    }
  );
}, yn = (t) => {
  const { data: e, i18n: n, className: r, onItemPress: i, onItemRemove: o, ...c } = t;
  return /* @__PURE__ */ ae(Ct, { children: [
    /* @__PURE__ */ q(Fe, { children: /* @__PURE__ */ q("script", { src: "https://at.alicdn.com/t/c/font_4934333_0u00aavw7iob.js" }) }),
    /* @__PURE__ */ q("div", { className: Lt("flex flex-wrap -m-1.5", r), ...c, children: e.map((a) => /* @__PURE__ */ q(
      pn,
      {
        ...a,
        i18n: n,
        onItemPress: i,
        onItemRemove: o
      },
      a.id
    )) })
  ] });
};
export {
  pn as Attachment,
  Nr as AttachmentIcon,
  yn as Attachments
};
