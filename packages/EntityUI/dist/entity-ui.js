import Ye, { useState as We, useRef as xt } from "react";
import { Breadcrumb as _t, Tag as ze, Progress as bt, Button as wt, Popover as Rt, Skeleton as jt, Avatar as $e } from "antd";
import * as Je from "lucide-react";
import { ExternalLink as Et, Tags as Ct } from "lucide-react";
var be = { exports: {} }, X = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Tt() {
  if (Be) return X;
  Be = 1;
  var t = Ye, v = Symbol.for("react.element"), f = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(w, u, R) {
    var _, S = {}, C = null, O = null;
    R !== void 0 && (C = "" + R), u.key !== void 0 && (C = "" + u.key), u.ref !== void 0 && (O = u.ref);
    for (_ in u) c.call(u, _) && !g.hasOwnProperty(_) && (S[_] = u[_]);
    if (w && w.defaultProps) for (_ in u = w.defaultProps, u) S[_] === void 0 && (S[_] = u[_]);
    return { $$typeof: v, type: w, key: C, ref: O, props: S, _owner: s.current };
  }
  return X.Fragment = f, X.jsx = m, X.jsxs = m, X;
}
var Z = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Me;
function St() {
  return Me || (Me = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ye, v = Symbol.for("react.element"), f = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), w = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), R = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), $ = Symbol.iterator, ae = "@@iterator";
    function ce(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = $ && e[$] || e[ae];
      return typeof r == "function" ? r : null;
    }
    var A = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function j(e) {
      {
        for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          i[o - 1] = arguments[o];
        we("error", e, i);
      }
    }
    function we(e, r, i) {
      {
        var o = A.ReactDebugCurrentFrame, p = o.getStackAddendum();
        p !== "" && (r += "%s", i = i.concat([p]));
        var y = i.map(function(a) {
          return String(a);
        });
        y.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, y);
      }
    }
    var ue = !1, fe = !1, Q = !1, pe = !1, he = !1, d;
    d = Symbol.for("react.module.reference");
    function B(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === g || he || e === s || e === R || e === _ || pe || e === O || ue || fe || Q || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === S || e.$$typeof === m || e.$$typeof === w || e.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === d || e.getModuleId !== void 0));
    }
    function ve(e, r, i) {
      var o = e.displayName;
      if (o)
        return o;
      var p = r.displayName || r.name || "";
      return p !== "" ? i + "(" + p + ")" : i;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function I(e) {
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
            var r = e;
            return ee(r) + ".Consumer";
          case m:
            var i = e;
            return ee(i._context) + ".Provider";
          case u:
            return ve(e, e.render, "ForwardRef");
          case S:
            var o = e.displayName || null;
            return o !== null ? o : I(e.type) || "Memo";
          case C: {
            var p = e, y = p._payload, a = p._init;
            try {
              return I(a(y));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var F = Object.assign, L = 0, te, Y, z, J, q, P, re;
    function ne() {
    }
    ne.__reactDisabledLog = !0;
    function ie() {
      {
        if (L === 0) {
          te = console.log, Y = console.info, z = console.warn, J = console.error, q = console.group, P = console.groupCollapsed, re = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: ne,
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
        L++;
      }
    }
    function ge() {
      {
        if (L--, L === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: F({}, e, {
              value: te
            }),
            info: F({}, e, {
              value: Y
            }),
            warn: F({}, e, {
              value: z
            }),
            error: F({}, e, {
              value: J
            }),
            group: F({}, e, {
              value: q
            }),
            groupCollapsed: F({}, e, {
              value: P
            }),
            groupEnd: F({}, e, {
              value: re
            })
          });
        }
        L < 0 && j("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var H = A.ReactCurrentDispatcher, K;
    function M(e, r, i) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (p) {
            var o = p.stack.trim().match(/\n( *(at )?)/);
            K = o && o[1] || "";
          }
        return `
` + K + e;
      }
    }
    var N = !1, D;
    {
      var oe = typeof WeakMap == "function" ? WeakMap : Map;
      D = new oe();
    }
    function Re(e, r) {
      if (!e || N)
        return "";
      {
        var i = D.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      N = !0;
      var p = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var y;
      y = H.current, H.current = null, ie();
      try {
        if (r) {
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
            } catch (T) {
              o = T;
            }
            Reflect.construct(e, [], a);
          } else {
            try {
              a.call();
            } catch (T) {
              o = T;
            }
            e.call(a.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (T) {
            o = T;
          }
          e();
        }
      } catch (T) {
        if (T && o && typeof T.stack == "string") {
          for (var l = T.stack.split(`
`), E = o.stack.split(`
`), x = l.length - 1, b = E.length - 1; x >= 1 && b >= 0 && l[x] !== E[b]; )
            b--;
          for (; x >= 1 && b >= 0; x--, b--)
            if (l[x] !== E[b]) {
              if (x !== 1 || b !== 1)
                do
                  if (x--, b--, b < 0 || l[x] !== E[b]) {
                    var k = `
` + l[x].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && D.set(e, k), k;
                  }
                while (x >= 1 && b >= 0);
              break;
            }
        }
      } finally {
        N = !1, H.current = y, ge(), Error.prepareStackTrace = p;
      }
      var V = e ? e.displayName || e.name : "", W = V ? M(V) : "";
      return typeof e == "function" && D.set(e, W), W;
    }
    function Ke(e, r, i) {
      return Re(e, !1);
    }
    function Ge(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function se(e, r, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Re(e, Ge(e));
      if (typeof e == "string")
        return M(e);
      switch (e) {
        case R:
          return M("Suspense");
        case _:
          return M("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case u:
            return Ke(e.render);
          case S:
            return se(e.type, r, i);
          case C: {
            var o = e, p = o._payload, y = o._init;
            try {
              return se(y(p), r, i);
            } catch {
            }
          }
        }
      return "";
    }
    var G = Object.prototype.hasOwnProperty, je = {}, Ee = A.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var r = e._owner, i = se(e.type, e._source, r ? r.type : null);
        Ee.setExtraStackFrame(i);
      } else
        Ee.setExtraStackFrame(null);
    }
    function Xe(e, r, i, o, p) {
      {
        var y = Function.call.bind(G);
        for (var a in e)
          if (y(e, a)) {
            var l = void 0;
            try {
              if (typeof e[a] != "function") {
                var E = Error((o || "React class") + ": " + i + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              l = e[a](r, a, o, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              l = x;
            }
            l && !(l instanceof Error) && (le(p), j("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, a, typeof l), le(null)), l instanceof Error && !(l.message in je) && (je[l.message] = !0, le(p), j("Failed %s type: %s", i, l.message), le(null));
          }
      }
    }
    var Ze = Array.isArray;
    function me(e) {
      return Ze(e);
    }
    function Qe(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, i = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return i;
      }
    }
    function et(e) {
      try {
        return Ce(e), !1;
      } catch {
        return !0;
      }
    }
    function Ce(e) {
      return "" + e;
    }
    function Te(e) {
      if (et(e))
        return j("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Ce(e);
    }
    var Se = A.ReactCurrentOwner, tt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Pe, ke;
    function rt(e) {
      if (G.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function nt(e) {
      if (G.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function it(e, r) {
      typeof e.ref == "string" && Se.current;
    }
    function ot(e, r) {
      {
        var i = function() {
          Pe || (Pe = !0, j("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: i,
          configurable: !0
        });
      }
    }
    function st(e, r) {
      {
        var i = function() {
          ke || (ke = !0, j("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        i.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: i,
          configurable: !0
        });
      }
    }
    var lt = function(e, r, i, o, p, y, a) {
      var l = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: e,
        key: r,
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
    function at(e, r, i, o, p) {
      {
        var y, a = {}, l = null, E = null;
        i !== void 0 && (Te(i), l = "" + i), nt(r) && (Te(r.key), l = "" + r.key), rt(r) && (E = r.ref, it(r, p));
        for (y in r)
          G.call(r, y) && !tt.hasOwnProperty(y) && (a[y] = r[y]);
        if (e && e.defaultProps) {
          var x = e.defaultProps;
          for (y in x)
            a[y] === void 0 && (a[y] = x[y]);
        }
        if (l || E) {
          var b = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && ot(a, b), E && st(a, b);
        }
        return lt(e, l, E, p, o, Se.current, a);
      }
    }
    var ye = A.ReactCurrentOwner, Oe = A.ReactDebugCurrentFrame;
    function U(e) {
      if (e) {
        var r = e._owner, i = se(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(i);
      } else
        Oe.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function xe(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function Ie() {
      {
        if (ye.current) {
          var e = I(ye.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function ct(e) {
      return "";
    }
    var Ae = {};
    function ut(e) {
      {
        var r = Ie();
        if (!r) {
          var i = typeof e == "string" ? e : e.displayName || e.name;
          i && (r = `

Check the top-level render call using <` + i + ">.");
        }
        return r;
      }
    }
    function Fe(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var i = ut(r);
        if (Ae[i])
          return;
        Ae[i] = !0;
        var o = "";
        e && e._owner && e._owner !== ye.current && (o = " It was passed a child from " + I(e._owner.type) + "."), U(e), j('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, o), U(null);
      }
    }
    function Ne(e, r) {
      {
        if (typeof e != "object")
          return;
        if (me(e))
          for (var i = 0; i < e.length; i++) {
            var o = e[i];
            xe(o) && Fe(o, r);
          }
        else if (xe(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = ce(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), a; !(a = y.next()).done; )
              xe(a.value) && Fe(a.value, r);
        }
      }
    }
    function ft(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var i;
        if (typeof r == "function")
          i = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === S))
          i = r.propTypes;
        else
          return;
        if (i) {
          var o = I(r);
          Xe(i, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !de) {
          de = !0;
          var p = I(r);
          j("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && j("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pt(e) {
      {
        for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
          var o = r[i];
          if (o !== "children" && o !== "key") {
            U(e), j("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), U(null);
            break;
          }
        }
        e.ref !== null && (U(e), j("Invalid attribute `ref` supplied to `React.Fragment`."), U(null));
      }
    }
    var De = {};
    function Le(e, r, i, o, p, y) {
      {
        var a = B(e);
        if (!a) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = ct();
          E ? l += E : l += Ie();
          var x;
          e === null ? x = "null" : me(e) ? x = "array" : e !== void 0 && e.$$typeof === v ? (x = "<" + (I(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : x = typeof e, j("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", x, l);
        }
        var b = at(e, r, i, p, y);
        if (b == null)
          return b;
        if (a) {
          var k = r.children;
          if (k !== void 0)
            if (o)
              if (me(k)) {
                for (var V = 0; V < k.length; V++)
                  Ne(k[V], e);
                Object.freeze && Object.freeze(k);
              } else
                j("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Ne(k, e);
        }
        if (G.call(r, "key")) {
          var W = I(e), T = Object.keys(r).filter(function(dt) {
            return dt !== "key";
          }), _e = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!De[W + _e]) {
            var yt = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            j(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, _e, W, yt, W), De[W + _e] = !0;
          }
        }
        return e === c ? pt(b) : ft(b), b;
      }
    }
    function ht(e, r, i) {
      return Le(e, r, i, !0);
    }
    function vt(e, r, i) {
      return Le(e, r, i, !1);
    }
    var gt = vt, mt = ht;
    Z.Fragment = c, Z.jsx = gt, Z.jsxs = mt;
  }()), Z;
}
process.env.NODE_ENV === "production" ? be.exports = Tt() : be.exports = St();
var n = be.exports;
const Pt = "_entityCard_1xtgw_1", kt = "_pcCover_1xtgw_15", Ot = "_pcSection_1xtgw_31", It = "_pcBreadcrumbSep_1xtgw_38", At = "_pcBasic_1xtgw_43", Ft = "_pcBasicRow_1xtgw_49", Nt = "_pcBasicRowLeft_1xtgw_56", Dt = "_pcLinkIconRight_1xtgw_61", Lt = "_pcColorSwatch_1xtgw_72", Wt = "_pcTitleText_1xtgw_99", $t = "_pcSubTitleText_1xtgw_106", Bt = "_pcProperties_1xtgw_119", Mt = "_pcProperty_1xtgw_127", Ut = "_pcTagsRow_1xtgw_138", Vt = "_pcDetails_1xtgw_151", Yt = "_pcRow_1xtgw_157", zt = "_pcCol_1xtgw_72", Jt = "_pcColLabel_1xtgw_179", qt = "_pcColValue_1xtgw_183", Ht = "_pcProgressText_1xtgw_188", Kt = "_entityLabel_1xtgw_194", h = {
  entityCard: Pt,
  pcCover: kt,
  pcSection: Ot,
  pcBreadcrumbSep: It,
  pcBasic: At,
  pcBasicRow: Ft,
  pcBasicRowLeft: Nt,
  pcLinkIconRight: Dt,
  pcColorSwatch: Lt,
  pcTitleText: Wt,
  pcSubTitleText: $t,
  pcProperties: Bt,
  pcProperty: Mt,
  pcTagsRow: Ut,
  pcDetails: Vt,
  pcRow: Yt,
  pcCol: zt,
  pcColLabel: Jt,
  pcColValue: qt,
  pcProgressText: Ht,
  entityLabel: Kt
}, Ue = (t) => {
  if (!t) return null;
  const v = t.trim(), s = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag"
  }[v] ?? v.replace(/(^\w|-\w)/g, (m) => m.replace("-", "").toUpperCase());
  return Je[s] || null;
}, Gt = (t, v) => {
  const f = typeof t == "number" ? t : typeof t == "string" ? parseFloat(t) : NaN, c = isFinite(f) ? f <= 1 ? Math.max(0, Math.min(1, f)) * 100 : Math.max(0, Math.min(100, f)) : 0;
  return /* @__PURE__ */ n.jsxs("div", { className: h.pcProgress, children: [
    /* @__PURE__ */ n.jsx(
      bt,
      {
        percent: c,
        showInfo: !1,
        strokeColor: "#027ffe",
        size: { height: 12 }
      }
    ),
    (v == null ? void 0 : v.text) && /* @__PURE__ */ n.jsx("div", { className: h.pcProgressText, children: v.text })
  ] });
}, qe = (t) => !Array.isArray(t) || t.length === 0 ? null : /* @__PURE__ */ n.jsx("div", { className: h.pcTagsRow, children: t.map((v, f) => /* @__PURE__ */ n.jsx(
  ze,
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
)) }), Xt = (t) => {
  const { view: v, value: f, payload: c } = t;
  return v === "percent_bar" ? Gt(f, c) : v === "tags" ? qe(Array.isArray(f) ? f : []) : /* @__PURE__ */ n.jsx("div", { className: h.pcColValue, children: String(f ?? "") });
}, He = ({
  data: t
}) => {
  var v, f, c;
  return /* @__PURE__ */ n.jsxs(n.Fragment, { children: [
    (t == null ? void 0 : t.cover) && /* @__PURE__ */ n.jsx(
      "div",
      {
        className: h.pcCover,
        style: { height: (v = t == null ? void 0 : t.style) == null ? void 0 : v.cover_max_height },
        children: /* @__PURE__ */ n.jsx("img", { src: t.cover, alt: "cover" })
      }
    ),
    Array.isArray(t == null ? void 0 : t.categories) && t.categories.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx(
      _t,
      {
        items: t.categories.map((s, g) => ({
          key: `${s}-${g}`,
          title: s
        })),
        separator: /* @__PURE__ */ n.jsx("span", { className: h.pcBreadcrumbSep, children: "/" })
      }
    ) }),
    ((t == null ? void 0 : t.color) || (t == null ? void 0 : t.icon) || (t == null ? void 0 : t.title) || (t == null ? void 0 : t.subtitle) || (t == null ? void 0 : t.url)) && /* @__PURE__ */ n.jsx("div", { className: h.pcBasic, children: /* @__PURE__ */ n.jsxs("div", { className: h.pcBasicRow, children: [
      /* @__PURE__ */ n.jsxs("div", { className: h.pcBasicRowLeft, children: [
        (t == null ? void 0 : t.color) && /* @__PURE__ */ n.jsx(
          "span",
          {
            className: h.pcColorSwatch,
            style: { backgroundColor: t.color },
            "aria-label": `color ${t.color}`,
            title: `color: ${t.color}`
          }
        ),
        (() => {
          var m;
          const s = (m = t == null ? void 0 : t.icon) == null ? void 0 : m.trim();
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
          const g = Ue(s);
          return g ? /* @__PURE__ */ n.jsx(g, { className: h.pcIcon, size: 18, strokeWidth: 2 }) : null;
        })(),
        (t == null ? void 0 : t.title) && /* @__PURE__ */ n.jsx("span", { className: h.pcTitleText, title: t.title, children: t.title }),
        (t == null ? void 0 : t.subtitle) && /* @__PURE__ */ n.jsxs("span", { className: h.pcSubTitleText, title: t.subtitle, children: [
          "｜ ",
          t.subtitle
        ] })
      ] }),
      (t == null ? void 0 : t.url) && /* @__PURE__ */ n.jsx(
        "a",
        {
          href: t.url,
          target: "_blank",
          rel: "noreferrer",
          "aria-label": "open link",
          title: t.url,
          className: h.pcLinkIconRight,
          children: /* @__PURE__ */ n.jsx(
            Et,
            {
              style: { width: 12, height: 12, color: "#027FFE" }
            }
          )
        }
      )
    ] }) }),
    Array.isArray(t == null ? void 0 : t.properties) && t.properties.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, style: { paddingTop: 25 }, children: /* @__PURE__ */ n.jsx("div", { className: h.pcProperties, children: t.properties.map((s, g) => {
      const m = Ue(s.icon), w = () => {
        if (s.view === "tags")
          return qe(Array.isArray(s.value) ? s.value : []);
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
    Array.isArray((c = (f = t == null ? void 0 : t.details) == null ? void 0 : f.table) == null ? void 0 : c.rows) && t.details.table.rows.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx("div", { className: h.pcDetails, children: t.details.table.rows.map((s, g) => {
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
            Xt(u),
            u.label && /* @__PURE__ */ n.jsx("div", { className: h.pcColLabel, children: u.label })
          ] }, R))
        },
        g
      );
    }) }) }),
    Array.isArray(t == null ? void 0 : t.tags) && t.tags.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: t.tags.map((s, g) => /* @__PURE__ */ n.jsx(
      ze,
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#027FFE",
          border: "none"
        },
        icon: /* @__PURE__ */ n.jsx(Ct, { style: { width: 12, height: 12 } }),
        color: "default",
        children: s
      },
      g
    )) })
  ] });
}, ir = ({
  title: t,
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
  modalTitle: S,
  width: C,
  placement: O = "right",
  data: $,
  hoverOpenDelay: ae = 500,
  closeDelay: ce = 200,
  autoPlacement: A = !1,
  hoverAutoClose: j = !1,
  hoverAutoCloseDelay: we = 2e3
}) => {
  var Y, z, J, q;
  const [ue, fe] = We(!1), Q = typeof R == "boolean", pe = Q ? R : ue, he = (P) => {
    Q ? _ == null || _(P) : fe(P);
  }, d = $, B = xt(null), [ve, ee] = We(O), I = () => {
    if (!B.current) return;
    const P = B.current.getBoundingClientRect(), re = window.innerWidth, ne = window.innerHeight, ie = (() => {
      var oe;
      const D = (typeof C == "number" ? C : void 0) ?? ((oe = d == null ? void 0 : d.style) == null ? void 0 : oe.width);
      return D ? typeof D == "string" ? parseInt(D, 10) || 376 : D : 376;
    })(), ge = 300, H = re - P.right, K = P.left, M = ne - P.bottom;
    P.top;
    let N = O;
    H >= ie ? N = "right" : K >= ie ? N = "left" : M >= ge ? N = "bottom" : N = "top", ee(N);
  }, F = /* @__PURE__ */ n.jsx(wt, { type: "default", children: `打开：${(d == null ? void 0 : d.title) ?? t ?? "详情"}` }), L = /* @__PURE__ */ n.jsx("span", { ref: B, style: { display: "inline-block" }, children: u ?? F }), te = /* @__PURE__ */ n.jsx(
    Rt,
    {
      content: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: h.entityCard,
          style: {
            width: (Y = d == null ? void 0 : d.style) == null ? void 0 : Y.width,
            height: (z = d == null ? void 0 : d.style) == null ? void 0 : z.height,
            maxWidth: (J = d == null ? void 0 : d.style) == null ? void 0 : J.max_width,
            maxHeight: (q = d == null ? void 0 : d.style) == null ? void 0 : q.max_height
          },
          children: d != null && d.id ? /* @__PURE__ */ n.jsx(He, { data: d }) : /* @__PURE__ */ n.jsx(
            jt,
            {
              active: !0,
              title: !1,
              avatar: { shape: "circle", size: 24 },
              paragraph: { rows: 3 }
            }
          )
        }
      ),
      open: pe,
      onOpenChange: (P) => {
        P && A && I(), he(!!P);
      },
      trigger: m,
      placement: A ? ve : O,
      mouseEnterDelay: m === "hover" ? ae / 1e3 : 0,
      mouseLeaveDelay: m === "hover" ? ce / 1e3 : 0,
      autoAdjustOverflow: !0,
      getPopupContainer: () => B.current || document.body,
      overlayInnerStyle: { padding: 0 },
      children: L
    }
  );
  return /* @__PURE__ */ n.jsx(n.Fragment, { children: te });
}, Zt = (t) => {
  const v = t.trim(), c = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag"
  }[v] ?? v.replace(/(^\w|-\w)/g, (g) => g.replace("-", "").toUpperCase());
  return Je[c] || null;
}, Qt = (t) => {
  if (t) {
    if (/^mailto:/i.test(t))
      try {
        return decodeURIComponent(t.slice(7));
      } catch {
        return t.slice(7);
      }
    return t;
  }
}, Ve = () => /* @__PURE__ */ n.jsxs(
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
), er = ({ data: t }) => {
  var _, S;
  if (!t || !t.title && !t.icon && !t.subtitle && !t.color && !t.url) return /* @__PURE__ */ n.jsx(Ve, {});
  const f = (_ = t == null ? void 0 : t.icon) == null ? void 0 : _.trim(), c = (S = t == null ? void 0 : t.title) == null ? void 0 : S.trim(), s = Qt(t == null ? void 0 : t.url), g = !!f, m = !!c, w = !!s, u = !!(t != null && t.color) || !!(t != null && t.subtitle), R = (C = 20) => {
    if (f && /^https?:\/\//i.test(f))
      return /* @__PURE__ */ n.jsx($e, { size: C, src: f });
    const O = Zt(f || "user"), $ = Math.max(8, C - 4);
    return /* @__PURE__ */ n.jsx($e, { size: C, icon: O ? /* @__PURE__ */ n.jsx(O, { size: $ }) : void 0 });
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
          title: t == null ? void 0 : t.subtitle,
          children: [
            (t == null ? void 0 : t.color) && /* @__PURE__ */ n.jsx(
              "span",
              {
                style: {
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: t.color
                }
              }
            ),
            t == null ? void 0 : t.subtitle
          ]
        }
      )
    ] })
  ] }) : m ? /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }) : /* @__PURE__ */ n.jsx(Ve, {});
};
function or({ data: t }) {
  var f, c, s, g;
  const v = ((t == null ? void 0 : t.type) ?? "").toLowerCase() === "user";
  return /* @__PURE__ */ n.jsx(
    "div",
    {
      className: h.entityLabel,
      style: {
        width: (f = t == null ? void 0 : t.style) == null ? void 0 : f.width,
        height: (c = t == null ? void 0 : t.style) == null ? void 0 : c.height,
        maxWidth: (s = t == null ? void 0 : t.style) == null ? void 0 : s.max_width,
        maxHeight: (g = t == null ? void 0 : t.style) == null ? void 0 : g.max_height
      },
      children: t != null && t.id ? v ? /* @__PURE__ */ n.jsx(er, { data: t }) : /* @__PURE__ */ n.jsx(He, { data: t }) : /* @__PURE__ */ n.jsxs(
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
  ir as EntityCard,
  or as EntityLabel,
  er as EntityUser
};
