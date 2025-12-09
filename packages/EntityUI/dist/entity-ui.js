(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode("._entityCard_1xtgw_1{width:400px;padding:16px;overflow:auto;border-radius:5px;background-color:#fff;color:#101010;font-size:14px;text-align:center;box-shadow:0 0 10px #0000004d;font-family:-regular}._pcCover_1xtgw_15{display:flex;align-items:center;justify-content:center;margin-bottom:25px;overflow:hidden;border-radius:3px;background-color:#bbbbbbb0}._pcCover_1xtgw_15 img{width:100%;height:auto;display:block}._pcSection_1xtgw_31{width:100%;padding-bottom:16px;display:flex;align-items:center}._pcBreadcrumbSep_1xtgw_38{font-size:12px;color:#999}._pcBasic_1xtgw_43{display:flex;gap:8px;flex-wrap:wrap}._pcBasicRow_1xtgw_49{width:100%;display:flex;align-items:center;justify-content:space-between}._pcBasicRowLeft_1xtgw_56{display:flex;align-items:center;gap:8px}._pcLinkIconRight_1xtgw_61{display:flex;align-items:center;justify-content:center;width:30px;height:20px;text-decoration:none;background-color:#fafafa;border-radius:4px}._pcColorSwatch_1xtgw_72{width:7px;height:16px}._pcIconDot_1xtgw_77{width:18px;height:18px}._pcTitleLink_1xtgw_82{display:inline-flex;align-items:center;gap:8px;padding:2px 8px;border:2px solid #027ffe;border-radius:4px;color:#027ffe;font-weight:500;text-decoration:none;line-height:1.6}._pcTitleLink_1xtgw_82:hover{background:#1677ff0f}._pcTitleText_1xtgw_99{display:inline-flex;align-items:center;color:#027ffe;font-size:16px}._pcSubTitleText_1xtgw_106{display:inline-flex;align-items:center;color:#999;font-size:16px}._pcExternalIcon_1xtgw_113{font-size:12px;color:#027ffe;margin-left:2px}._pcProperties_1xtgw_119{width:100%;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:8px;row-gap:12px;align-items:start}._pcProperty_1xtgw_127{display:flex;align-items:center;gap:4px;min-height:24px;min-width:0;box-sizing:border-box;font-size:12px;color:#999}._pcTagsRow_1xtgw_138{display:inline-flex;flex-wrap:wrap;gap:4px}._pcTag_1xtgw_138{padding:2px 6px;border-radius:4px;background:#f2f3f5;color:#555;font-size:12px}._pcDetails_1xtgw_151{width:100%;display:flex;flex-direction:column;gap:12px}._pcRow_1xtgw_157{display:grid;column-gap:8px;row-gap:12px;width:100%}._pcCol_1xtgw_72{width:100%;padding:10px 8px;box-sizing:border-box;display:flex;flex-direction:column;gap:4px;min-width:0;text-align:left;border-radius:5px;background-color:#fafafa;color:#101010;font-size:14px;font-family:-regular;border:1px solid rgba(245,245,245,1)}._pcColLabel_1xtgw_179{color:#999;font-size:12px}._pcColValue_1xtgw_183{font-size:16px;color:#027ffe}._pcProgressText_1xtgw_188{font-size:10px;color:#027ffe}._entityLabel_1xtgw_194{width:100%;overflow:hidden}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import Be, { useState as xr, useRef as dr } from "react";
import { Breadcrumb as _r, Tag as Me, Progress as br, Button as wr, Popover as Rr, Skeleton as jr, Avatar as Ne } from "antd";
import * as Ue from "lucide-react";
import { ExternalLink as Er, Tags as Cr } from "lucide-react";
var ye = { exports: {} }, K = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var De;
function Tr() {
  if (De) return K;
  De = 1;
  var r = Be, v = Symbol.for("react.element"), f = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, s = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(w, u, R) {
    var _, T = {}, S = null, k = null;
    R !== void 0 && (S = "" + R), u.key !== void 0 && (S = "" + u.key), u.ref !== void 0 && (k = u.ref);
    for (_ in u) c.call(u, _) && !g.hasOwnProperty(_) && (T[_] = u[_]);
    if (w && w.defaultProps) for (_ in u = w.defaultProps, u) T[_] === void 0 && (T[_] = u[_]);
    return { $$typeof: v, type: w, key: S, ref: k, props: T, _owner: s.current };
  }
  return K.Fragment = f, K.jsx = m, K.jsxs = m, K;
}
var H = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Le;
function Sr() {
  return Le || (Le = 1, process.env.NODE_ENV !== "production" && function() {
    var r = Be, v = Symbol.for("react.element"), f = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), w = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), S = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), $ = Symbol.iterator, re = "@@iterator";
    function te(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = $ && e[$] || e[re];
      return typeof t == "function" ? t : null;
    }
    var A = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          i[o - 1] = arguments[o];
        xe("error", e, i);
      }
    }
    function xe(e, t, i) {
      {
        var o = A.ReactDebugCurrentFrame, p = o.getStackAddendum();
        p !== "" && (t += "%s", i = i.concat([p]));
        var y = i.map(function(a) {
          return String(a);
        });
        y.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var ne = !1, M = !1, ie = !1, oe = !1, se = !1, U;
    U = Symbol.for("react.module.reference");
    function le(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === g || se || e === s || e === R || e === _ || oe || e === k || ne || M || ie || typeof e == "object" && e !== null && (e.$$typeof === S || e.$$typeof === T || e.$$typeof === m || e.$$typeof === w || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === U || e.getModuleId !== void 0));
    }
    function ae(e, t, i) {
      var o = e.displayName;
      if (o)
        return o;
      var p = t.displayName || t.name || "";
      return p !== "" ? i + "(" + p + ")" : i;
    }
    function x(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && j("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case R:
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
            return ae(e, e.render, "ForwardRef");
          case T:
            var o = e.displayName || null;
            return o !== null ? o : O(e.type) || "Memo";
          case S: {
            var p = e, y = p._payload, a = p._init;
            try {
              return O(a(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var I = Object.assign, N = 0, G, V, Y, z, J, F, D;
    function de() {
    }
    de.__reactDisabledLog = !0;
    function ze() {
      {
        if (N === 0) {
          G = console.log, V = console.info, Y = console.warn, z = console.error, J = console.group, F = console.groupCollapsed, D = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: de,
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
        N++;
      }
    }
    function Je() {
      {
        if (N--, N === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: I({}, e, {
              value: G
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
              value: F
            }),
            groupEnd: I({}, e, {
              value: D
            })
          });
        }
        N < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ce = A.ReactCurrentDispatcher, ue;
    function X(e, t, i) {
      {
        if (ue === void 0)
          try {
            throw Error();
          } catch (p) {
            var o = p.stack.trim().match(/\n( *(at )?)/);
            ue = o && o[1] || "";
          }
        return `
` + ue + e;
      }
    }
    var fe = !1, Z;
    {
      var qe = typeof WeakMap == "function" ? WeakMap : Map;
      Z = new qe();
    }
    function _e(e, t) {
      if (!e || fe)
        return "";
      {
        var i = Z.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      fe = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = ce.current, ce.current = null, ze();
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
                    var P = `
` + l[d].replace(" at new ", " at ");
                    return e.displayName && P.includes("<anonymous>") && (P = P.replace("<anonymous>", e.displayName)), typeof e == "function" && Z.set(e, P), P;
                  }
                while (d >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        fe = !1, ce.current = y, Je(), Error.prepareStackTrace = p;
      }
      var B = e ? e.displayName || e.name : "", L = B ? X(B) : "";
      return typeof e == "function" && Z.set(e, L), L;
    }
    function Ke(e, t, i) {
      return _e(e, !1);
    }
    function He(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Q(e, t, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return _e(e, He(e));
      if (typeof e == "string")
        return X(e);
      switch (e) {
        case R:
          return X("Suspense");
        case _:
          return X("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return Ke(e.render);
          case T:
            return Q(e.type, t, i);
          case S: {
            var o = e, p = o._payload, y = o._init;
            try {
              return Q(y(p), t, i);
            } catch {
            }
          }
        }
      return "";
    }
    var q = Object.prototype.hasOwnProperty, be = {}, we = A.ReactDebugCurrentFrame;
    function ee(e) {
      if (e) {
        var t = e._owner, i = Q(e.type, e._source, t ? t.type : null);
        we.setExtraStackFrame(i);
      } else
        we.setExtraStackFrame(null);
    }
    function Ge(e, t, i, o, p) {
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
            l && !(l instanceof Error) && (ee(p), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, a, typeof l), ee(null)), l instanceof Error && !(l.message in be) && (be[l.message] = !0, ee(p), j("Failed %s type: %s", i, l.message), ee(null));
          }
      }
    }
    var Xe = Array.isArray;
    function pe(e) {
      return Xe(e);
    }
    function Ze(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, i = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function Qe(e) {
      try {
        return Re(e), !1;
      } catch {
        return !0;
      }
    }
    function Re(e) {
      return "" + e;
    }
    function je(e) {
      if (Qe(e))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ze(e)), Re(e);
    }
    var Ee = A.ReactCurrentOwner, er = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Ce, Te;
    function rr(e) {
      if (q.call(e, "ref")) {
        var t = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function tr(e) {
      if (q.call(e, "key")) {
        var t = Object.getOwnPropertyDescriptor(e, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function nr(e, t) {
      typeof e.ref == "string" && Ee.current;
    }
    function ir(e, t) {
      {
        var i = function() {
          Ce || (Ce = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function or(e, t) {
      {
        var i = function() {
          Te || (Te = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var sr = function(e, t, i, o, p, y, a) {
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
    function lr(e, t, i, o, p) {
      {
        var y, a = {}, l = null, E = null;
        i !== void 0 && (je(i), l = "" + i), tr(t) && (je(t.key), l = "" + t.key), rr(t) && (E = t.ref, nr(t, p));
        for (y in t)
          q.call(t, y) && !er.hasOwnProperty(y) && (a[y] = t[y]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (y in d)
            a[y] === void 0 && (a[y] = d[y]);
        }
        if (l || E) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && ir(a, b), E && or(a, b);
        }
        return sr(e, l, E, p, o, Ee.current, a);
      }
    }
    var he = A.ReactCurrentOwner, Se = A.ReactDebugCurrentFrame;
    function W(e) {
      if (e) {
        var t = e._owner, i = Q(e.type, e._source, t ? t.type : null);
        Se.setExtraStackFrame(i);
      } else
        Se.setExtraStackFrame(null);
    }
    var ve;
    ve = !1;
    function ge(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function Pe() {
      {
        if (he.current) {
          var e = O(he.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ar(e) {
      return "";
    }
    var ke = {};
    function cr(e) {
      {
        var t = Pe();
        if (!t) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (t = `

Check the top-level render call using <` + i + ">.");
        }
        return t;
      }
    }
    function Oe(e, t) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = cr(t);
        if (ke[i])
          return;
        ke[i] = !0;
        var o = "";
        e && e._owner && e._owner !== he.current && (o = " It was passed a child from " + O(e._owner.type) + "."), W(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, o), W(null);
      }
    }
    function Ie(e, t) {
      {
        if (typeof e != "object")
          return;
        if (pe(e))
          for (var i = 0; i < e.length; i++) {
            var o = e[i];
            ge(o) && Oe(o, t);
          }
        else if (ge(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = te(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), a; !(a = y.next()).done; )
              ge(a.value) && Oe(a.value, t);
        }
      }
    }
    function ur(e) {
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
          var o = O(t);
          Ge(i, e.props, "prop", o, e);
        } else if (t.PropTypes !== void 0 && !ve) {
          ve = !0;
          var p = O(t);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fr(e) {
      {
        for (var t = Object.keys(e.props), i = 0; i < t.length; i++) {
          var o = t[i];
          if (o !== "children" && o !== "key") {
            W(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), W(null);
            break;
          }
        }
        e.ref !== null && (W(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    var Fe = {};
    function Ae(e, t, i, o, p, y) {
      {
        var a = le(e);
        if (!a) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = ar();
          E ? l += E : l += Pe();
          var d;
          e === null ? d = "null" : pe(e) ? d = "array" : e !== void 0 && e.$$typeof === v ? (d = "<" + (O(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, l);
        }
        var b = lr(e, t, i, p, y);
        if (b == null)
          return b;
        if (a) {
          var P = t.children;
          if (P !== void 0)
            if (o)
              if (pe(P)) {
                for (var B = 0; B < P.length; B++)
                  Ie(P[B], e);
                Object.freeze && Object.freeze(P);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ie(P, e);
        }
        if (q.call(t, "key")) {
          var L = O(e), C = Object.keys(t).filter(function(yr) {
            return yr !== "key";
          }), me = C.length > 0 ? "{key: someKey, " + C.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fe[L + me]) {
            var mr = C.length > 0 ? "{" + C.join(": ..., ") + ": ...}" : "{}";
            j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, me, L, mr, L), Fe[L + me] = !0;
          }
        }
        return e === c ? fr(b) : ur(b), b;
      }
    }
    function pr(e, t, i) {
      return Ae(e, t, i, !0);
    }
    function hr(e, t, i) {
      return Ae(e, t, i, !1);
    }
    var vr = hr, gr = pr;
    H.Fragment = c, H.jsx = vr, H.jsxs = gr;
  }()), H;
}
process.env.NODE_ENV === "production" ? ye.exports = Tr() : ye.exports = Sr();
var n = ye.exports;
const Pr = "_entityCard_1xtgw_1", kr = "_pcCover_1xtgw_15", Or = "_pcSection_1xtgw_31", Ir = "_pcBreadcrumbSep_1xtgw_38", Fr = "_pcBasic_1xtgw_43", Ar = "_pcBasicRow_1xtgw_49", Nr = "_pcBasicRowLeft_1xtgw_56", Dr = "_pcLinkIconRight_1xtgw_61", Lr = "_pcColorSwatch_1xtgw_72", $r = "_pcTitleText_1xtgw_99", Wr = "_pcSubTitleText_1xtgw_106", Br = "_pcProperties_1xtgw_119", Mr = "_pcProperty_1xtgw_127", Ur = "_pcTagsRow_1xtgw_138", Vr = "_pcDetails_1xtgw_151", Yr = "_pcRow_1xtgw_157", zr = "_pcCol_1xtgw_72", Jr = "_pcColLabel_1xtgw_179", qr = "_pcColValue_1xtgw_183", Kr = "_pcProgressText_1xtgw_188", Hr = "_entityLabel_1xtgw_194", h = {
  entityCard: Pr,
  pcCover: kr,
  pcSection: Or,
  pcBreadcrumbSep: Ir,
  pcBasic: Fr,
  pcBasicRow: Ar,
  pcBasicRowLeft: Nr,
  pcLinkIconRight: Dr,
  pcColorSwatch: Lr,
  pcTitleText: $r,
  pcSubTitleText: Wr,
  pcProperties: Br,
  pcProperty: Mr,
  pcTagsRow: Ur,
  pcDetails: Vr,
  pcRow: Yr,
  pcCol: zr,
  pcColLabel: Jr,
  pcColValue: qr,
  pcProgressText: Kr,
  entityLabel: Hr
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
  return Ue[s] || null;
}, Gr = (r, v) => {
  const f = typeof r == "number" ? r : typeof r == "string" ? parseFloat(r) : NaN, c = isFinite(f) ? f <= 1 ? Math.max(0, Math.min(1, f)) * 100 : Math.max(0, Math.min(100, f)) : 0;
  return /* @__PURE__ */ n.jsxs("div", { className: h.pcProgress, children: [
    /* @__PURE__ */ n.jsx(
      br,
      {
        percent: c,
        showInfo: !1,
        strokeColor: "#027ffe",
        size: { height: 12 }
      }
    ),
    (v == null ? void 0 : v.text) && /* @__PURE__ */ n.jsx("div", { className: h.pcProgressText, children: v.text })
  ] });
}, Ve = (r) => !Array.isArray(r) || r.length === 0 ? null : /* @__PURE__ */ n.jsx("div", { className: h.pcTagsRow, children: r.map((v, f) => /* @__PURE__ */ n.jsx(
  Me,
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
)) }), Xr = (r) => {
  const { view: v, value: f, payload: c } = r;
  return v === "percent_bar" ? Gr(f, c) : v === "tags" ? Ve(Array.isArray(f) ? f : []) : /* @__PURE__ */ n.jsx("div", { className: h.pcColValue, children: String(f ?? "") });
}, Ye = ({
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
      _r,
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
            Er,
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
          return Ve(Array.isArray(s.value) ? s.value : []);
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
          children: m.map((u, R) => /* @__PURE__ */ n.jsxs("div", { className: h.pcCol, children: [
            Xr(u),
            u.label && /* @__PURE__ */ n.jsx("div", { className: h.pcColLabel, children: u.label })
          ] }, R))
        },
        g
      );
    }) }) }),
    Array.isArray(r == null ? void 0 : r.tags) && r.tags.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: r.tags.map((s, g) => /* @__PURE__ */ n.jsx(
      Me,
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#027FFE",
          border: "none"
        },
        icon: /* @__PURE__ */ n.jsx(Cr, { style: { width: 12, height: 12 } }),
        color: "default",
        children: s
      },
      g
    )) })
  ] });
}, it = ({
  title: r,
  subtitle: v,
  description: f,
  imageUrl: c,
  actions: s = [],
  footer: g,
  triggerType: m = "hover",
  popupMode: w = "modal",
  trigger: u,
  open: R,
  onOpenChange: _,
  modalTitle: T,
  width: S,
  placement: k = "right",
  data: $,
  hoverOpenDelay: re = 500,
  closeDelay: te = 200,
  autoPlacement: A = !1,
  hoverAutoClose: j = !1,
  hoverAutoCloseDelay: xe = 2e3,
  getPopupContainer: ne,
  viewportPadding: M = 16,
  zIndex: ie
}) => {
  var V, Y, z, J;
  const [oe, se] = xr(!1), U = typeof R == "boolean", le = U ? R : oe, ae = (F) => {
    U ? _ == null || _(F) : se(F);
  }, x = $, O = dr(null), I = /* @__PURE__ */ n.jsx(wr, { type: "default", children: `打开：${(x == null ? void 0 : x.title) ?? r ?? "详情"}` }), N = /* @__PURE__ */ n.jsx("span", { ref: O, style: { display: "inline-block" }, children: u ?? I }), G = /* @__PURE__ */ n.jsx(
    Rr,
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
          children: x != null && x.id ? /* @__PURE__ */ n.jsx(Ye, { data: x }) : /* @__PURE__ */ n.jsx(
            jr,
            {
              active: !0,
              title: !1,
              avatar: { shape: "circle", size: 24 },
              paragraph: { rows: 3 }
            }
          )
        }
      ),
      open: le,
      onOpenChange: (F) => {
        ae(!!F);
      },
      trigger: m,
      placement: k,
      align: function() {
        const F = k, D = M;
        switch (F) {
          case "top":
            return { offset: [0, D] };
          case "bottom":
            return { offset: [0, -D] };
          case "left":
            return { offset: [D, 0] };
          case "right":
            return { offset: [-D, 0] };
          default:
            return;
        }
      }(),
      mouseEnterDelay: m === "hover" ? re / 1e3 : 0,
      mouseLeaveDelay: m === "hover" ? te / 1e3 : 0,
      autoAdjustOverflow: !0,
      zIndex: ie,
      getPopupContainer: ne ?? (() => document.body),
      overlayStyle: {
        maxHeight: `calc(100vh - 24px - ${M * 2}px)`,
        overflowY: "auto",
        margin: M
      },
      overlayInnerStyle: { padding: 0 },
      children: N
    }
  );
  return /* @__PURE__ */ n.jsx(n.Fragment, { children: G });
}, Zr = (r) => {
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
  return Ue[c] || null;
}, Qr = (r) => {
  if (r) {
    if (/^mailto:/i.test(r))
      try {
        return decodeURIComponent(r.slice(7));
      } catch {
        return r.slice(7);
      }
    return r;
  }
}, We = () => /* @__PURE__ */ n.jsxs(
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
), et = ({ data: r }) => {
  var _, T;
  if (!r || !r.title && !r.icon && !r.subtitle && !r.color && !r.url) return /* @__PURE__ */ n.jsx(We, {});
  const f = (_ = r == null ? void 0 : r.icon) == null ? void 0 : _.trim(), c = (T = r == null ? void 0 : r.title) == null ? void 0 : T.trim(), s = Qr(r == null ? void 0 : r.url), g = !!f, m = !!c, w = !!s, u = !!(r != null && r.color) || !!(r != null && r.subtitle), R = (S = 20) => {
    if (f && /^https?:\/\//i.test(f))
      return /* @__PURE__ */ n.jsx(Ne, { size: S, src: f });
    const k = Zr(f || "user"), $ = Math.max(8, S - 4);
    return /* @__PURE__ */ n.jsx(Ne, { size: S, icon: k ? /* @__PURE__ */ n.jsx(k, { size: $ }) : void 0 });
  };
  return g && m && !w && !u ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    R(),
    /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500, lineHeight: "20px" }, title: c, children: c })
  ] }) : g && !m && !w && !u ? /* @__PURE__ */ n.jsx("span", { style: { display: "inline-flex" }, children: R() }) : !g && m && !w && !u ? /* @__PURE__ */ n.jsx(
    "span",
    {
      style: { display: "inline-block", color: "#027FFE", fontWeight: 500 },
      title: c,
      children: c
    }
  ) : g && m && w ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    R(40),
    /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", flexDirection: "column", justifyContent: "space-between" }, children: [
      /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }),
      /* @__PURE__ */ n.jsx("span", { style: { color: "#888", fontSize: 12 }, title: s, children: s })
    ] })
  ] }) : g && m && u ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    R(40),
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
  ] }) : m ? /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }) : /* @__PURE__ */ n.jsx(We, {});
};
function ot({ data: r }) {
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
      children: r != null && r.id ? v ? /* @__PURE__ */ n.jsx(et, { data: r }) : /* @__PURE__ */ n.jsx(Ye, { data: r }) : /* @__PURE__ */ n.jsxs(
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
  it as EntityCard,
  ot as EntityLabel,
  et as EntityUser
};
