(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._entityCard_1xtgw_1{width:400px;padding:16px;overflow:auto;border-radius:5px;background-color:#fff;color:#101010;font-size:14px;text-align:center;box-shadow:0 0 10px #0000004d;font-family:-regular}._pcCover_1xtgw_15{display:flex;align-items:center;justify-content:center;margin-bottom:25px;overflow:hidden;border-radius:3px;background-color:#bbbbbbb0}._pcCover_1xtgw_15 img{width:100%;height:auto;display:block}._pcSection_1xtgw_31{width:100%;padding-bottom:16px;display:flex;align-items:center}._pcBreadcrumbSep_1xtgw_38{font-size:12px;color:#999}._pcBasic_1xtgw_43{display:flex;gap:8px;flex-wrap:wrap}._pcBasicRow_1xtgw_49{width:100%;display:flex;align-items:center;justify-content:space-between}._pcBasicRowLeft_1xtgw_56{display:flex;align-items:center;gap:8px}._pcLinkIconRight_1xtgw_61{display:flex;align-items:center;justify-content:center;width:30px;height:20px;text-decoration:none;background-color:#fafafa;border-radius:4px}._pcColorSwatch_1xtgw_72{width:7px;height:16px}._pcIconDot_1xtgw_77{width:18px;height:18px}._pcTitleLink_1xtgw_82{display:inline-flex;align-items:center;gap:8px;padding:2px 8px;border:2px solid #027ffe;border-radius:4px;color:#027ffe;font-weight:500;text-decoration:none;line-height:1.6}._pcTitleLink_1xtgw_82:hover{background:#1677ff0f}._pcTitleText_1xtgw_99{display:inline-flex;align-items:center;color:#027ffe;font-size:16px}._pcSubTitleText_1xtgw_106{display:inline-flex;align-items:center;color:#999;font-size:16px}._pcExternalIcon_1xtgw_113{font-size:12px;color:#027ffe;margin-left:2px}._pcProperties_1xtgw_119{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:8px;row-gap:12px;align-items:start}._pcProperty_1xtgw_127{display:flex;align-items:center;gap:4px;min-height:24px;min-width:0;box-sizing:border-box;font-size:12px;color:#999}._pcTagsRow_1xtgw_138{display:inline-flex;flex-wrap:wrap;gap:4px}._pcTag_1xtgw_138{padding:2px 6px;border-radius:4px;background:#f2f3f5;color:#555;font-size:12px}._pcDetails_1xtgw_151{width:100%;display:flex;flex-direction:column;gap:12px}._pcRow_1xtgw_157{display:grid;column-gap:8px;row-gap:12px;width:100%}._pcCol_1xtgw_72{width:100%;padding:10px 8px;box-sizing:border-box;display:flex;flex-direction:column;gap:4px;min-width:0;text-align:left;border-radius:5px;background-color:#fafafa;color:#101010;font-size:14px;font-family:-regular;border:1px solid rgba(245,245,245,1)}._pcColLabel_1xtgw_179{color:#999;font-size:12px}._pcColValue_1xtgw_183{font-size:16px;color:#027ffe}._pcProgressText_1xtgw_188{font-size:10px;color:#027ffe}._entityLabel_1xtgw_194{width:100%;overflow:hidden}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import Me, { useState as dr, useRef as _r } from "react";
import { Breadcrumb as br, Tag as Ue, Progress as wr, Button as Rr, Popover as jr, Skeleton as Er, Avatar as Ne } from "antd";
import * as Ve from "lucide-react";
import { ExternalLink as Cr, Tags as Tr } from "lucide-react";
var de = { exports: {} }, H = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Le;
function Sr() {
  if (Le) return H;
  Le = 1;
  var r = Me, v = Symbol.for("react.element"), f = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, s = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(w, u, j) {
    var _, T = {}, S = null, O = null;
    j !== void 0 && (S = "" + j), u.key !== void 0 && (S = "" + u.key), u.ref !== void 0 && (O = u.ref);
    for (_ in u) c.call(u, _) && !g.hasOwnProperty(_) && (T[_] = u[_]);
    if (w && w.defaultProps) for (_ in u = w.defaultProps, u) T[_] === void 0 && (T[_] = u[_]);
    return { $$typeof: v, type: w, key: S, ref: O, props: T, _owner: s.current };
  }
  return H.Fragment = f, H.jsx = m, H.jsxs = m, H;
}
var G = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var We;
function Pr() {
  return We || (We = 1, process.env.NODE_ENV !== "production" && function() {
    var r = Me, v = Symbol.for("react.element"), f = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), w = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), W = Symbol.iterator, te = "@@iterator";
    function ne(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = W && e[W] || e[te];
      return typeof t == "function" ? t : null;
    }
    var F = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function R(e) {
      {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        _e("error", e, i);
      }
    }
    function _e(e, t, i) {
      {
        var o = F.ReactDebugCurrentFrame, p = o.getStackAddendum();
        p !== "" && (t += "%s", i = i.concat([p]));
        var y = i.map(function(a) {
          return String(a);
        });
        y.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var ie = !1, M = !1, oe = !1, se = !1, le = !1, U;
    U = Symbol.for("react.module.reference");
    function ae(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === g || le || e === s || e === j || e === _ || se || e === O || ie || M || oe || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === T || e.$$typeof === m || e.$$typeof === w || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === U || e.getModuleId !== void 0));
    }
    function ce(e, t, i) {
      var o = e.displayName;
      if (o)
        return o;
      var p = t.displayName || t.name || "";
      return p !== "" ? i + "(" + p + ")" : i;
    }
    function x(e) {
      return e.displayName || "Context";
    }
    function P(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && R("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case c:
          return "Fragment";
        case f:
          return "Portal";
        case g:
          return "Profiler";
        case s:
          return "StrictMode";
        case j:
          return "Suspense";
        case _:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case w:
            var t = e;
            return x(t) + ".Consumer";
          case m:
            var i = e;
            return x(i._context) + ".Provider";
          case u:
            return ce(e, e.render, "ForwardRef");
          case T:
            var o = e.displayName || null;
            return o !== null ? o : P(e.type) || "Memo";
          case S: {
            var p = e, y = p._payload, a = p._init;
            try {
              return P(a(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, D = 0, X, V, Y, z, J, A, N;
    function be() {
    }
    be.__reactDisabledLog = !0;
    function Je() {
      {
        if (D === 0) {
          X = console.log, V = console.info, Y = console.warn, z = console.error, J = console.group, A = console.groupCollapsed, N = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: be,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        D++;
      }
    }
    function qe() {
      {
        if (D--, D === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: X
            }),
            info: I({}, e, {
              value: V
            }),
            warn: I({}, e, {
              value: Y
            }),
            error: I({}, e, {
              value: z
            }),
            group: I({}, e, {
              value: J
            }),
            groupCollapsed: I({}, e, {
              value: A
            }),
            groupEnd: I({}, e, {
              value: N
            })
          });
        }
        D < 0 && R("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ue = F.ReactCurrentDispatcher, fe;
    function Z(e, t, i) {
      {
        if (fe === void 0)
          try {
            throw Error();
          } catch (p) {
            var o = p.stack.trim().match(/\n( *(at )?)/);
            fe = o && o[1] || "";
          }
        return `
` + fe + e;
      }
    }
    var pe = !1, Q;
    {
      var Ke = typeof WeakMap == "function" ? WeakMap : Map;
      Q = new Ke();
    }
    function we(e, t) {
      if (!e || pe)
        return "";
      {
        var i = Q.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      pe = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = ue.current, ue.current = null, Je();
      try {
        if (t) {
          var a = function() {
            throw Error();
          };
          if (Object.defineProperty(a.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(a, []);
            } catch (C) {
              o = C;
            }
            Reflect.construct(e, [], a);
          } else {
            try {
              a.call();
            } catch (C) {
              o = C;
            }
            e.call(a.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (C) {
            o = C;
          }
          e();
        }
      } catch (C) {
        if (C && o && typeof C.stack == "string") {
          for (var l = C.stack.split(`
`), E = o.stack.split(`
`), d = l.length - 1, b = E.length - 1; d >= 1 && b >= 0 && l[d] !== E[b]; )
            b--;
          for (; d >= 1 && b >= 0; d--, b--)
            if (l[d] !== E[b]) {
              if (d !== 1 || b !== 1)
                do
                  if (d--, b--, b < 0 || l[d] !== E[b]) {
                    var k = `
` + l[d].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && Q.set(e, k), k;
                  }
                while (d >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        pe = !1, ue.current = y, qe(), Error.prepareStackTrace = p;
      }
      var B = e ? e.displayName || e.name : "", L = B ? Z(B) : "";
      return typeof e == "function" && Q.set(e, L), L;
    }
    function He(e, t, i) {
      return we(e, !1);
    }
    function Ge(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ee(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return we(e, Ge(e));
      if (typeof e == "string")
        return Z(e);
      switch (e) {
        case j:
          return Z("Suspense");
        case _:
          return Z("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return He(e.render);
          case T:
            return ee(e.type, t, i);
          case S: {
            var o = e, p = o._payload, y = o._init;
            try {
              return ee(y(p), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, Re = {}, je = F.ReactDebugCurrentFrame;
    function re(e) {
      if (e) {
        var t = e._owner, i = ee(e.type, e._source, t ? t.type : null);
        je.setExtraStackFrame(i);
      } else
        je.setExtraStackFrame(null);
    }
    function Xe(e, t, i, o, p) {
      {
        var y = Function.call.bind(q);
        for (var a in e)
          if (y(e, a)) {
            var l = void 0;
            try {
              if (typeof e[a] != "function") {
                var E = Error((o || "React class") + ": " + i + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              l = e[a](t, a, o, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              l = d;
            }
            l && !(l instanceof Error) && (re(p), R("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, a, typeof l), re(null)), l instanceof Error && !(l.message in Re) && (Re[l.message] = !0, re(p), R("Failed %s type: %s", i, l.message), re(null));
          }
      }
    }
    var Ze = Array.isArray;
    function he(e) {
      return Ze(e);
    }
    function Qe(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function er(e) {
      try {
        return Ee(e), !1;
      } catch {
        return !0;
      }
    }
    function Ee(e) {
      return "" + e;
    }
    function Ce(e) {
      if (er(e))
        return R("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Ee(e);
    }
    var K = F.ReactCurrentOwner, rr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Te, Se, ve;
    ve = {};
    function tr(e) {
      if (q.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nr(e) {
      if (q.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function ir(e, t) {
      if (typeof e.ref == "string" && K.current && t && K.current.stateNode !== t) {
        var i = P(K.current.type);
        ve[i] || (R('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', P(K.current.type), e.ref), ve[i] = !0);
      }
    }
    function or(e, t) {
      {
        var i = function() {
          Te || (Te = !0, R("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function sr(e, t) {
      {
        var i = function() {
          Se || (Se = !0, R("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var lr = function(e, t, i, o, p, y, a) {
      var l = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: e,
        key: t,
        ref: i,
        props: a,
        // Record the component responsible for creating this element.
        _owner: y
      };
      return l._store = {}, Object.defineProperty(l._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(l, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(l, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: p
      }), Object.freeze && (Object.freeze(l.props), Object.freeze(l)), l;
    };
    function ar(e, t, i, o, p) {
      {
        var y, a = {}, l = null, E = null;
        i !== void 0 && (Ce(i), l = "" + i), nr(t) && (Ce(t.key), l = "" + t.key), tr(t) && (E = t.ref, ir(t, p));
        for (y in t)
          q.call(t, y) && !rr.hasOwnProperty(y) && (a[y] = t[y]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (y in d)
            a[y] === void 0 && (a[y] = d[y]);
        }
        if (l || E) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && or(a, b), E && sr(a, b);
        }
        return lr(e, l, E, p, o, K.current, a);
      }
    }
    var ge = F.ReactCurrentOwner, Pe = F.ReactDebugCurrentFrame;
    function $(e) {
      if (e) {
        var t = e._owner, i = ee(e.type, e._source, t ? t.type : null);
        Pe.setExtraStackFrame(i);
      } else
        Pe.setExtraStackFrame(null);
    }
    var me;
    me = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function ke() {
      {
        if (ge.current) {
          var e = P(ge.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function cr(e) {
      return "";
    }
    var Oe = {};
    function ur(e) {
      {
        var t = ke();
        if (!t) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (t = `

Check the top-level render call using <` + i + ">.");
        }
        return t;
      }
    }
    function Ie(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = ur(t);
        if (Oe[i])
          return;
        Oe[i] = !0;
        var o = "";
        e && e._owner && e._owner !== ge.current && (o = " It was passed a child from " + P(e._owner.type) + "."), $(e), R('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, o), $(null);
      }
    }
    function Ae(e, t) {
      {
        if (typeof e != "object")
          return;
        if (he(e))
          for (var i = 0; i < e.length; i++) {
            var o = e[i];
            ye(o) && Ie(o, t);
          }
        else if (ye(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = ne(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), a; !(a = y.next()).done; )
              ye(a.value) && Ie(a.value, t);
        }
      }
    }
    function fr(e) {
      {
        var t = e.type;
        if (t == null || typeof t == "string")
          return;
        var i;
        if (typeof t == "function")
          i = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === T))
          i = t.propTypes;
        else
          return;
        if (i) {
          var o = P(t);
          Xe(i, e.props, "prop", o, e);
        } else if (t.PropTypes !== void 0 && !me) {
          me = !0;
          var p = P(t);
          R("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && R("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pr(e) {
      {
        for (var t = Object.keys(e.props), i = 0; i < t.length; i++) {
          var o = t[i];
          if (o !== "children" && o !== "key") {
            $(e), R("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), $(null);
            break;
          }
        }
        e.ref !== null && ($(e), R("Invalid attribute `ref` supplied to `React.Fragment`."), $(null));
      }
    }
    var Fe = {};
    function De(e, t, i, o, p, y) {
      {
        var a = ae(e);
        if (!a) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = cr();
          E ? l += E : l += ke();
          var d;
          e === null ? d = "null" : he(e) ? d = "array" : e !== void 0 && e.$$typeof === v ? (d = "<" + (P(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, R("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, l);
        }
        var b = ar(e, t, i, p, y);
        if (b == null)
          return b;
        if (a) {
          var k = t.children;
          if (k !== void 0)
            if (o)
              if (he(k)) {
                for (var B = 0; B < k.length; B++)
                  Ae(k[B], e);
                Object.freeze && Object.freeze(k);
              } else
                R("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ae(k, e);
        }
        if (q.call(t, "key")) {
          var L = P(e), C = Object.keys(t).filter(function(xr) {
            return xr !== "key";
          }), xe = C.length > 0 ? "{key: someKey, " + C.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[L + xe]) {
            var yr = C.length > 0 ? "{" + C.join(": ..., ") + ": ...}" : "{}";
            R(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, xe, L, yr, L), Fe[L + xe] = !0;
          }
        }
        return e === c ? pr(b) : fr(b), b;
      }
    }
    function hr(e, t, i) {
      return De(e, t, i, !0);
    }
    function vr(e, t, i) {
      return De(e, t, i, !1);
    }
    var gr = vr, mr = hr;
    G.Fragment = c, G.jsx = gr, G.jsxs = mr;
  }()), G;
}
process.env.NODE_ENV === "production" ? de.exports = Sr() : de.exports = Pr();
var n = de.exports;
const kr = "_entityCard_1xtgw_1", Or = "_pcCover_1xtgw_15", Ir = "_pcSection_1xtgw_31", Ar = "_pcBreadcrumbSep_1xtgw_38", Fr = "_pcBasic_1xtgw_43", Dr = "_pcBasicRow_1xtgw_49", Nr = "_pcBasicRowLeft_1xtgw_56", Lr = "_pcLinkIconRight_1xtgw_61", Wr = "_pcColorSwatch_1xtgw_72", $r = "_pcIconDot_1xtgw_77", Br = "_pcTitleLink_1xtgw_82", Mr = "_pcTitleText_1xtgw_99", Ur = "_pcSubTitleText_1xtgw_106", Vr = "_pcExternalIcon_1xtgw_113", Yr = "_pcProperties_1xtgw_119", zr = "_pcProperty_1xtgw_127", Jr = "_pcTagsRow_1xtgw_138", qr = "_pcTag_1xtgw_138", Kr = "_pcDetails_1xtgw_151", Hr = "_pcRow_1xtgw_157", Gr = "_pcCol_1xtgw_72", Xr = "_pcColLabel_1xtgw_179", Zr = "_pcColValue_1xtgw_183", Qr = "_pcProgressText_1xtgw_188", et = "_entityLabel_1xtgw_194", h = {
  entityCard: kr,
  pcCover: Or,
  pcSection: Ir,
  pcBreadcrumbSep: Ar,
  pcBasic: Fr,
  pcBasicRow: Dr,
  pcBasicRowLeft: Nr,
  pcLinkIconRight: Lr,
  pcColorSwatch: Wr,
  pcIconDot: $r,
  pcTitleLink: Br,
  pcTitleText: Mr,
  pcSubTitleText: Ur,
  pcExternalIcon: Vr,
  pcProperties: Yr,
  pcProperty: zr,
  pcTagsRow: Jr,
  pcTag: qr,
  pcDetails: Kr,
  pcRow: Hr,
  pcCol: Gr,
  pcColLabel: Xr,
  pcColValue: Zr,
  pcProgressText: Qr,
  entityLabel: et
}, $e = (r) => {
  if (!r) return null;
  const v = r.trim(), s = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag"
  }[v] ?? v.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
  return Ve[s] || null;
}, rt = (r, v) => {
  const f = typeof r == "number" ? r : typeof r == "string" ? parseFloat(r) : NaN, c = isFinite(f) ? f <= 1 ? Math.max(0, Math.min(1, f)) * 100 : Math.max(0, Math.min(100, f)) : 0;
  return /* @__PURE__ */ n.jsxs("div", { className: h.pcProgress, children: [
    /* @__PURE__ */ n.jsx(
      wr,
      {
        percent: c,
        showInfo: !1,
        strokeColor: "#027ffe",
        size: { height: 12 }
      }
    ),
    (v == null ? void 0 : v.text) && /* @__PURE__ */ n.jsx("div", { className: h.pcProgressText, children: v.text })
  ] });
}, Ye = (r) => !Array.isArray(r) || r.length === 0 ? null : /* @__PURE__ */ n.jsx("div", { className: h.pcTagsRow, children: r.map((v, f) => /* @__PURE__ */ n.jsx(
  Ue,
  {
    color: "default",
    style: {
      display: "inline-flex",
      alignItems: "center",
      border: "none",
      backgroundColor: "#E8E8E8",
      color: "#027FFE"
    },
    children: String(v)
  },
  `${v}-${f}`
)) }), tt = (r) => {
  const { view: v, value: f, payload: c } = r;
  return v === "percent_bar" ? rt(f, c) : v === "tags" ? Ye(Array.isArray(f) ? f : []) : /* @__PURE__ */ n.jsx("div", { className: h.pcColValue, children: String(f ?? "") });
}, ze = ({
  data: r
}) => {
  var v, f, c;
  return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    (r == null ? void 0 : r.cover) && /* @__PURE__ */ n.jsx(
      "div",
      {
        className: h.pcCover,
        style: { height: (v = r == null ? void 0 : r.style) == null ? void 0 : v.cover_max_height },
        children: /* @__PURE__ */ n.jsx("img", { src: r.cover, alt: "cover" })
      }
    ),
    Array.isArray(r == null ? void 0 : r.categories) && r.categories.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx(
      br,
      {
        items: r.categories.map((s, g) => ({
          key: `${s}-${g}`,
          title: s
        })),
        separator: /* @__PURE__ */ n.jsx("span", { className: h.pcBreadcrumbSep, children: "/" })
      }
    ) }),
    ((r == null ? void 0 : r.color) || (r == null ? void 0 : r.icon) || (r == null ? void 0 : r.title) || (r == null ? void 0 : r.subtitle) || (r == null ? void 0 : r.url)) && /* @__PURE__ */ n.jsx("div", { className: h.pcBasic, children: /* @__PURE__ */ n.jsxs("div", { className: h.pcBasicRow, children: [
      /* @__PURE__ */ n.jsxs("div", { className: h.pcBasicRowLeft, children: [
        (r == null ? void 0 : r.color) && /* @__PURE__ */ n.jsx(
          "span",
          {
            className: h.pcColorSwatch,
            style: { backgroundColor: r.color },
            "aria-label": `color ${r.color}`,
            title: `color: ${r.color}`
          }
        ),
        (() => {
          var m;
          const s = (m = r == null ? void 0 : r.icon) == null ? void 0 : m.trim();
          if (s && /^https?:\/\/+/i.test(s))
            return /* @__PURE__ */ n.jsx(
              "img",
              {
                src: s,
                alt: "icon",
                className: h.pcIcon,
                width: 18,
                height: 18,
                style: { objectFit: "contain" }
              }
            );
          const g = $e(s);
          return g ? /* @__PURE__ */ n.jsx(g, { className: h.pcIcon, size: 18, strokeWidth: 2 }) : null;
        })(),
        (r == null ? void 0 : r.title) && /* @__PURE__ */ n.jsx("span", { className: h.pcTitleText, title: r.title, children: r.title }),
        (r == null ? void 0 : r.subtitle) && /* @__PURE__ */ n.jsxs("span", { className: h.pcSubTitleText, title: r.subtitle, children: [
          "｜ ",
          r.subtitle
        ] })
      ] }),
      (r == null ? void 0 : r.url) && /* @__PURE__ */ n.jsx(
        "a",
        {
          href: r.url,
          target: "_blank",
          rel: "noreferrer",
          "aria-label": "open link",
          title: r.url,
          className: h.pcLinkIconRight,
          children: /* @__PURE__ */ n.jsx(
            Cr,
            {
              style: { width: 12, height: 12, color: "#027FFE" }
            }
          )
        }
      )
    ] }) }),
    Array.isArray(r == null ? void 0 : r.properties) && r.properties.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, style: { paddingTop: 25 }, children: /* @__PURE__ */ n.jsx("div", { className: h.pcProperties, children: r.properties.map((s, g) => {
      const m = $e(s.icon), w = () => {
        if (s.view === "tags")
          return Ye(Array.isArray(s.value) ? s.value : []);
        if (s.view === "datetime_with_time_zone") {
          const u = String(s.value ?? "");
          return /* @__PURE__ */ n.jsx("span", { className: h.pcPropertyValue, children: u });
        }
        return /* @__PURE__ */ n.jsx("span", { className: h.pcPropertyValue, children: String(s.value ?? "") });
      };
      return /* @__PURE__ */ n.jsxs("div", { className: h.pcProperty, children: [
        m && /* @__PURE__ */ n.jsx(
          m,
          {
            className: h.pcPropertyIcon,
            size: 16,
            strokeWidth: 2
          }
        ),
        w()
      ] }, g);
    }) }) }),
    Array.isArray((c = (f = r == null ? void 0 : r.details) == null ? void 0 : f.table) == null ? void 0 : c.rows) && r.details.table.rows.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx("div", { className: h.pcDetails, children: r.details.table.rows.map((s, g) => {
      const m = Array.isArray(s.columns) ? s.columns.filter(
        (u) => u && (u.label !== void 0 || u.value !== void 0)
      ) : [], w = m.length;
      return /* @__PURE__ */ n.jsx(
        "div",
        {
          className: h.pcRow,
          style: {
            gridTemplateColumns: w <= 1 ? "1fr" : "repeat(2, minmax(0, 1fr))"
          },
          children: m.map((u, j) => /* @__PURE__ */ n.jsxs("div", { className: h.pcCol, children: [
            tt(u),
            u.label && /* @__PURE__ */ n.jsx("div", { className: h.pcColLabel, children: u.label })
          ] }, j))
        },
        g
      );
    }) }) }),
    Array.isArray(r == null ? void 0 : r.tags) && r.tags.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: r.tags.map((s, g) => /* @__PURE__ */ n.jsx(
      Ue,
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#027FFE",
          border: "none"
        },
        icon: /* @__PURE__ */ n.jsx(Tr, { style: { width: 12, height: 12 } }),
        color: "default",
        children: s
      },
      g
    )) })
  ] });
}, ct = ({
  title: r,
  subtitle: v,
  description: f,
  imageUrl: c,
  actions: s = [],
  footer: g,
  triggerType: m = "hover",
  popupMode: w = "modal",
  trigger: u,
  open: j,
  onOpenChange: _,
  modalTitle: T,
  width: S,
  placement: O = "right",
  data: W,
  hoverOpenDelay: te = 500,
  closeDelay: ne = 200,
  autoPlacement: F = !1,
  hoverAutoClose: R = !1,
  hoverAutoCloseDelay: _e = 2e3,
  getPopupContainer: ie,
  viewportPadding: M = 16,
  zIndex: oe
}) => {
  var V, Y, z, J;
  const [se, le] = dr(!1), U = typeof j == "boolean", ae = U ? j : se, ce = (A) => {
    U ? _ == null || _(A) : le(A);
  }, x = W, P = _r(null), I = /* @__PURE__ */ n.jsx(Rr, { type: "default", children: `打开：${(x == null ? void 0 : x.title) ?? r ?? "详情"}` }), D = /* @__PURE__ */ n.jsx("span", { ref: P, style: { display: "inline-block" }, children: u ?? I }), X = /* @__PURE__ */ n.jsx(
    jr,
    {
      content: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: h.entityCard,
          style: {
            width: (V = x == null ? void 0 : x.style) == null ? void 0 : V.width,
            height: (Y = x == null ? void 0 : x.style) == null ? void 0 : Y.height,
            maxWidth: (z = x == null ? void 0 : x.style) == null ? void 0 : z.max_width,
            maxHeight: (J = x == null ? void 0 : x.style) == null ? void 0 : J.max_height
          },
          children: x != null && x.id ? /* @__PURE__ */ n.jsx(ze, { data: x }) : /* @__PURE__ */ n.jsx(
            Er,
            {
              active: !0,
              title: !1,
              avatar: { shape: "circle", size: 24 },
              paragraph: { rows: 3 }
            }
          )
        }
      ),
      open: ae,
      onOpenChange: (A) => {
        ce(!!A);
      },
      trigger: m,
      placement: O,
      align: function() {
        const A = O, N = M;
        switch (A) {
          case "top":
            return { offset: [0, N] };
          case "bottom":
            return { offset: [0, -N] };
          case "left":
            return { offset: [N, 0] };
          case "right":
            return { offset: [-N, 0] };
          default:
            return;
        }
      }(),
      mouseEnterDelay: m === "hover" ? te / 1e3 : 0,
      mouseLeaveDelay: m === "hover" ? ne / 1e3 : 0,
      autoAdjustOverflow: !0,
      zIndex: oe,
      getPopupContainer: ie ?? (() => document.body),
      overlayStyle: {
        maxHeight: `calc(100vh - 24px - ${M * 2}px)`,
        overflowY: "auto",
        margin: M
      },
      overlayInnerStyle: { padding: 0 },
      children: D
    }
  );
  return /* @__PURE__ */ n.jsx(n.Fragment, { children: X });
}, nt = (r) => {
  if (!r) return null;
  const v = r.trim(), c = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag"
  }[v] ?? v.replace(/(^\w|-\w)/g, (g) => g.replace("-", "").toUpperCase());
  return Ve[c] || null;
}, it = (r) => {
  if (r) {
    if (/^mailto:/i.test(r))
      try {
        return decodeURIComponent(r.slice(7));
      } catch {
        return r.slice(7);
      }
    return r;
  }
}, Be = () => /* @__PURE__ */ n.jsxs(
  "span",
  {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      verticalAlign: "middle"
    },
    "aria-label": "entity user skeleton",
    children: [
      /* @__PURE__ */ n.jsx(
        "span",
        {
          style: {
            width: 20,
            height: 20,
            borderRadius: "50%",
            backgroundColor: "#e9e9e9",
            flex: "0 0 auto"
          }
        }
      ),
      /* @__PURE__ */ n.jsx(
        "span",
        {
          style: {
            width: 160,
            height: 20,
            borderRadius: 6,
            backgroundColor: "#e9e9e9",
            flex: "0 0 auto"
          }
        }
      )
    ]
  }
), ot = ({ data: r }) => {
  var _, T;
  if (!r || !r.title && !r.icon && !r.subtitle && !r.color && !r.url) return /* @__PURE__ */ n.jsx(Be, {});
  const f = (_ = r == null ? void 0 : r.icon) == null ? void 0 : _.trim(), c = (T = r == null ? void 0 : r.title) == null ? void 0 : T.trim(), s = it(r == null ? void 0 : r.url), g = !!f, m = !!c, w = !!s, u = !!(r != null && r.color) || !!(r != null && r.subtitle), j = (S = 20) => {
    if (f && /^https?:\/\//i.test(f))
      return /* @__PURE__ */ n.jsx(Ne, { size: S, src: f });
    const O = nt(f || "user"), W = Math.max(8, S - 4);
    return /* @__PURE__ */ n.jsx(Ne, { size: S, icon: O ? /* @__PURE__ */ n.jsx(O, { size: W }) : void 0 });
  };
  return g && m && !w && !u ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    j(),
    /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500, lineHeight: "20px" }, title: c, children: c })
  ] }) : g && !m && !w && !u ? /* @__PURE__ */ n.jsx("span", { style: { display: "inline-flex" }, children: j() }) : !g && m && !w && !u ? /* @__PURE__ */ n.jsx(
    "span",
    {
      style: { display: "inline-block", color: "#027FFE", fontWeight: 500 },
      title: c,
      children: c
    }
  ) : g && m && w ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    j(40),
    /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", flexDirection: "column", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }),
      /* @__PURE__ */ n.jsx("span", { style: { color: "#888", fontSize: 12 }, title: s, children: s })
    ] })
  ] }) : g && m && u ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    j(40),
    /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", flexDirection: "column", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }),
      /* @__PURE__ */ n.jsxs(
        "span",
        {
          style: {
            marginTop: 4,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 12,
            color: "#666"
          },
          title: r == null ? void 0 : r.subtitle,
          children: [
            (r == null ? void 0 : r.color) && /* @__PURE__ */ n.jsx(
              "span",
              {
                style: {
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: r.color
                }
              }
            ),
            r == null ? void 0 : r.subtitle
          ]
        }
      )
    ] })
  ] }) : m ? /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }) : /* @__PURE__ */ n.jsx(Be, {});
};
function ut({ data: r }) {
  var f, c, s, g;
  const v = ((r == null ? void 0 : r.type) ?? "").toLowerCase() === "user";
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      className: h.entityLabel,
      style: {
        width: (f = r == null ? void 0 : r.style) == null ? void 0 : f.width,
        height: (c = r == null ? void 0 : r.style) == null ? void 0 : c.height,
        maxWidth: (s = r == null ? void 0 : r.style) == null ? void 0 : s.max_width,
        maxHeight: (g = r == null ? void 0 : r.style) == null ? void 0 : g.max_height
      },
      children: r != null && r.id ? v ? /* @__PURE__ */ n.jsx(ot, { data: r }) : /* @__PURE__ */ n.jsx(ze, { data: r }) : /* @__PURE__ */ n.jsxs(
        "span",
        {
          style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            verticalAlign: "middle"
          },
          "aria-label": "entity label skeleton",
          children: [
            /* @__PURE__ */ n.jsx(
              "span",
              {
                style: {
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: "#e9e9e9",
                  flex: "0 0 auto"
                }
              }
            ),
            /* @__PURE__ */ n.jsx(
              "span",
              {
                style: {
                  width: 160,
                  height: 20,
                  borderRadius: 6,
                  backgroundColor: "#e9e9e9",
                  flex: "0 0 auto"
                }
              }
            )
          ]
        }
      )
    }
  );
}
export {
  ct as EntityCard,
  ut as EntityLabel,
  ot as EntityUser
};
