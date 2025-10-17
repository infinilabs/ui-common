import Ve, { useState as Le, useRef as dt } from "react";
import { Breadcrumb as gt, Tag as Me, Progress as _t, Button as yt, Popover as bt } from "antd";
import * as Rt from "lucide-react";
import { ExternalLink as xt, Tags as Et } from "lucide-react";
var Re = { exports: {} }, G = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $e;
function wt() {
  if ($e) return G;
  $e = 1;
  var t = Ve, v = Symbol.for("react.element"), h = Symbol.for("react.fragment"), y = Object.prototype.hasOwnProperty, l = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, b = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(T, f, S) {
    var R, P = {}, O = null, N = null;
    S !== void 0 && (O = "" + S), f.key !== void 0 && (O = "" + f.key), f.ref !== void 0 && (N = f.ref);
    for (R in f) y.call(f, R) && !b.hasOwnProperty(R) && (P[R] = f[R]);
    if (T && T.defaultProps) for (R in f = T.defaultProps, f) P[R] === void 0 && (P[R] = f[R]);
    return { $$typeof: v, type: T, key: O, ref: N, props: P, _owner: l.current };
  }
  return G.Fragment = h, G.jsx = g, G.jsxs = g, G;
}
var X = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Be;
function Ct() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ve, v = Symbol.for("react.element"), h = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), T = Symbol.for("react.context"), f = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), R = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), O = Symbol.for("react.lazy"), N = Symbol.for("react.offscreen"), Z = Symbol.iterator, le = "@@iterator";
    function ce(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Z && e[Z] || e[le];
      return typeof r == "function" ? r : null;
    }
    var A = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function x(e) {
      {
        for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          n[o - 1] = arguments[o];
        xe("error", e, n);
      }
    }
    function xe(e, r, n) {
      {
        var o = A.ReactDebugCurrentFrame, c = o.getStackAddendum();
        c !== "" && (r += "%s", n = n.concat([c]));
        var p = n.map(function(a) {
          return String(a);
        });
        p.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, p);
      }
    }
    var ue = !1, fe = !1, Q = !1, pe = !1, ve = !1, m;
    m = Symbol.for("react.module.reference");
    function $(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === y || e === b || ve || e === l || e === S || e === R || pe || e === N || ue || fe || Q || typeof e == "object" && e !== null && (e.$$typeof === O || e.$$typeof === P || e.$$typeof === g || e.$$typeof === T || e.$$typeof === f || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === m || e.getModuleId !== void 0));
    }
    function he(e, r, n) {
      var o = e.displayName;
      if (o)
        return o;
      var c = r.displayName || r.name || "";
      return c !== "" ? n + "(" + c + ")" : n;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function k(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && x("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case y:
          return "Fragment";
        case h:
          return "Portal";
        case b:
          return "Profiler";
        case l:
          return "StrictMode";
        case S:
          return "Suspense";
        case R:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case T:
            var r = e;
            return ee(r) + ".Consumer";
          case g:
            var n = e;
            return ee(n._context) + ".Provider";
          case f:
            return he(e, e.render, "ForwardRef");
          case P:
            var o = e.displayName || null;
            return o !== null ? o : k(e.type) || "Memo";
          case O: {
            var c = e, p = c._payload, a = c._init;
            try {
              return k(a(p));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var q = Object.assign, D = 0, te, M, Y, U, z, C, re;
    function ne() {
    }
    ne.__reactDisabledLog = !0;
    function oe() {
      {
        if (D === 0) {
          te = console.log, M = console.info, Y = console.warn, U = console.error, z = console.group, C = console.groupCollapsed, re = console.groupEnd;
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
        D++;
      }
    }
    function me() {
      {
        if (D--, D === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: q({}, e, {
              value: te
            }),
            info: q({}, e, {
              value: M
            }),
            warn: q({}, e, {
              value: Y
            }),
            error: q({}, e, {
              value: U
            }),
            group: q({}, e, {
              value: z
            }),
            groupCollapsed: q({}, e, {
              value: C
            }),
            groupEnd: q({}, e, {
              value: re
            })
          });
        }
        D < 0 && x("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var J = A.ReactCurrentDispatcher, K;
    function B(e, r, n) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (c) {
            var o = c.stack.trim().match(/\n( *(at )?)/);
            K = o && o[1] || "";
          }
        return `
` + K + e;
      }
    }
    var I = !1, F;
    {
      var ie = typeof WeakMap == "function" ? WeakMap : Map;
      F = new ie();
    }
    function Ee(e, r) {
      if (!e || I)
        return "";
      {
        var n = F.get(e);
        if (n !== void 0)
          return n;
      }
      var o;
      I = !0;
      var c = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var p;
      p = J.current, J.current = null, oe();
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
            } catch (w) {
              o = w;
            }
            Reflect.construct(e, [], a);
          } else {
            try {
              a.call();
            } catch (w) {
              o = w;
            }
            e.call(a.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (w) {
            o = w;
          }
          e();
        }
      } catch (w) {
        if (w && o && typeof w.stack == "string") {
          for (var s = w.stack.split(`
`), E = o.stack.split(`
`), d = s.length - 1, _ = E.length - 1; d >= 1 && _ >= 0 && s[d] !== E[_]; )
            _--;
          for (; d >= 1 && _ >= 0; d--, _--)
            if (s[d] !== E[_]) {
              if (d !== 1 || _ !== 1)
                do
                  if (d--, _--, _ < 0 || s[d] !== E[_]) {
                    var j = `
` + s[d].replace(" at new ", " at ");
                    return e.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", e.displayName)), typeof e == "function" && F.set(e, j), j;
                  }
                while (d >= 1 && _ >= 0);
              break;
            }
        }
      } finally {
        I = !1, J.current = p, me(), Error.prepareStackTrace = c;
      }
      var V = e ? e.displayName || e.name : "", L = V ? B(V) : "";
      return typeof e == "function" && F.set(e, L), L;
    }
    function ze(e, r, n) {
      return Ee(e, !1);
    }
    function Je(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function se(e, r, n) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ee(e, Je(e));
      if (typeof e == "string")
        return B(e);
      switch (e) {
        case S:
          return B("Suspense");
        case R:
          return B("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case f:
            return ze(e.render);
          case P:
            return se(e.type, r, n);
          case O: {
            var o = e, c = o._payload, p = o._init;
            try {
              return se(p(c), r, n);
            } catch {
            }
          }
        }
      return "";
    }
    var H = Object.prototype.hasOwnProperty, we = {}, Ce = A.ReactDebugCurrentFrame;
    function ae(e) {
      if (e) {
        var r = e._owner, n = se(e.type, e._source, r ? r.type : null);
        Ce.setExtraStackFrame(n);
      } else
        Ce.setExtraStackFrame(null);
    }
    function Ke(e, r, n, o, c) {
      {
        var p = Function.call.bind(H);
        for (var a in e)
          if (p(e, a)) {
            var s = void 0;
            try {
              if (typeof e[a] != "function") {
                var E = Error((o || "React class") + ": " + n + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw E.name = "Invariant Violation", E;
              }
              s = e[a](r, a, o, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (d) {
              s = d;
            }
            s && !(s instanceof Error) && (ae(c), x("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", n, a, typeof s), ae(null)), s instanceof Error && !(s.message in we) && (we[s.message] = !0, ae(c), x("Failed %s type: %s", n, s.message), ae(null));
          }
      }
    }
    var He = Array.isArray;
    function de(e) {
      return He(e);
    }
    function Ge(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, n = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return n;
      }
    }
    function Xe(e) {
      try {
        return Te(e), !1;
      } catch {
        return !0;
      }
    }
    function Te(e) {
      return "" + e;
    }
    function je(e) {
      if (Xe(e))
        return x("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ge(e)), Te(e);
    }
    var Se = A.ReactCurrentOwner, Ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Pe, Oe;
    function Qe(e) {
      if (H.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function et(e) {
      if (H.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function tt(e, r) {
      typeof e.ref == "string" && Se.current;
    }
    function rt(e, r) {
      {
        var n = function() {
          Pe || (Pe = !0, x("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: n,
          configurable: !0
        });
      }
    }
    function nt(e, r) {
      {
        var n = function() {
          Oe || (Oe = !0, x("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        n.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: n,
          configurable: !0
        });
      }
    }
    var ot = function(e, r, n, o, c, p, a) {
      var s = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: n,
        props: a,
        // Record the component responsible for creating this element.
        _owner: p
      };
      return s._store = {}, Object.defineProperty(s._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(s, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.defineProperty(s, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: c
      }), Object.freeze && (Object.freeze(s.props), Object.freeze(s)), s;
    };
    function it(e, r, n, o, c) {
      {
        var p, a = {}, s = null, E = null;
        n !== void 0 && (je(n), s = "" + n), et(r) && (je(r.key), s = "" + r.key), Qe(r) && (E = r.ref, tt(r, c));
        for (p in r)
          H.call(r, p) && !Ze.hasOwnProperty(p) && (a[p] = r[p]);
        if (e && e.defaultProps) {
          var d = e.defaultProps;
          for (p in d)
            a[p] === void 0 && (a[p] = d[p]);
        }
        if (s || E) {
          var _ = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          s && rt(a, _), E && nt(a, _);
        }
        return ot(e, s, E, c, o, Se.current, a);
      }
    }
    var ge = A.ReactCurrentOwner, ke = A.ReactDebugCurrentFrame;
    function W(e) {
      if (e) {
        var r = e._owner, n = se(e.type, e._source, r ? r.type : null);
        ke.setExtraStackFrame(n);
      } else
        ke.setExtraStackFrame(null);
    }
    var _e;
    _e = !1;
    function ye(e) {
      return typeof e == "object" && e !== null && e.$$typeof === v;
    }
    function Ae() {
      {
        if (ge.current) {
          var e = k(ge.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function st(e) {
      return "";
    }
    var qe = {};
    function at(e) {
      {
        var r = Ae();
        if (!r) {
          var n = typeof e == "string" ? e : e.displayName || e.name;
          n && (r = `

Check the top-level render call using <` + n + ">.");
        }
        return r;
      }
    }
    function Ie(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var n = at(r);
        if (qe[n])
          return;
        qe[n] = !0;
        var o = "";
        e && e._owner && e._owner !== ge.current && (o = " It was passed a child from " + k(e._owner.type) + "."), W(e), x('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', n, o), W(null);
      }
    }
    function Fe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (de(e))
          for (var n = 0; n < e.length; n++) {
            var o = e[n];
            ye(o) && Ie(o, r);
          }
        else if (ye(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var c = ce(e);
          if (typeof c == "function" && c !== e.entries)
            for (var p = c.call(e), a; !(a = p.next()).done; )
              ye(a.value) && Ie(a.value, r);
        }
      }
    }
    function lt(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var n;
        if (typeof r == "function")
          n = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === f || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === P))
          n = r.propTypes;
        else
          return;
        if (n) {
          var o = k(r);
          Ke(n, e.props, "prop", o, e);
        } else if (r.PropTypes !== void 0 && !_e) {
          _e = !0;
          var c = k(r);
          x("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", c || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && x("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ct(e) {
      {
        for (var r = Object.keys(e.props), n = 0; n < r.length; n++) {
          var o = r[n];
          if (o !== "children" && o !== "key") {
            W(e), x("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), W(null);
            break;
          }
        }
        e.ref !== null && (W(e), x("Invalid attribute `ref` supplied to `React.Fragment`."), W(null));
      }
    }
    var Ne = {};
    function De(e, r, n, o, c, p) {
      {
        var a = $(e);
        if (!a) {
          var s = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (s += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var E = st();
          E ? s += E : s += Ae();
          var d;
          e === null ? d = "null" : de(e) ? d = "array" : e !== void 0 && e.$$typeof === v ? (d = "<" + (k(e.type) || "Unknown") + " />", s = " Did you accidentally export a JSX literal instead of a component?") : d = typeof e, x("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", d, s);
        }
        var _ = it(e, r, n, c, p);
        if (_ == null)
          return _;
        if (a) {
          var j = r.children;
          if (j !== void 0)
            if (o)
              if (de(j)) {
                for (var V = 0; V < j.length; V++)
                  Fe(j[V], e);
                Object.freeze && Object.freeze(j);
              } else
                x("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Fe(j, e);
        }
        if (H.call(r, "key")) {
          var L = k(e), w = Object.keys(r).filter(function(mt) {
            return mt !== "key";
          }), be = w.length > 0 ? "{key: someKey, " + w.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ne[L + be]) {
            var ht = w.length > 0 ? "{" + w.join(": ..., ") + ": ...}" : "{}";
            x(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, be, L, ht, L), Ne[L + be] = !0;
          }
        }
        return e === y ? ct(_) : lt(_), _;
      }
    }
    function ut(e, r, n) {
      return De(e, r, n, !0);
    }
    function ft(e, r, n) {
      return De(e, r, n, !1);
    }
    var pt = ft, vt = ut;
    X.Fragment = y, X.jsx = pt, X.jsxs = vt;
  }()), X;
}
process.env.NODE_ENV === "production" ? Re.exports = wt() : Re.exports = Ct();
var i = Re.exports;
const Tt = "_entityCard_qqftp_1", jt = "_pcCover_qqftp_15", St = "_pcSection_qqftp_31", Pt = "_pcBreadcrumbSep_qqftp_38", Ot = "_pcBasic_qqftp_43", kt = "_pcBasicRow_qqftp_50", At = "_pcBasicRowLeft_qqftp_57", qt = "_pcLinkIconRight_qqftp_62", It = "_pcColorSwatch_qqftp_73", Ft = "_pcTitleText_qqftp_100", Nt = "_pcSubTitleText_qqftp_107", Dt = "_pcProperties_qqftp_120", Lt = "_pcProperty_qqftp_128", $t = "_pcTagsRow_qqftp_139", Bt = "_pcDetails_qqftp_152", Wt = "_pcRow_qqftp_158", Vt = "_pcCol_qqftp_73", Mt = "_pcColLabel_qqftp_180", Yt = "_pcColValue_qqftp_184", Ut = "_pcProgressText_qqftp_189", zt = "_entityLabel_qqftp_195", u = {
  entityCard: Tt,
  pcCover: jt,
  pcSection: St,
  pcBreadcrumbSep: Pt,
  pcBasic: Ot,
  pcBasicRow: kt,
  pcBasicRowLeft: At,
  pcLinkIconRight: qt,
  pcColorSwatch: It,
  pcTitleText: Ft,
  pcSubTitleText: Nt,
  pcProperties: Dt,
  pcProperty: Lt,
  pcTagsRow: $t,
  pcDetails: Bt,
  pcRow: Wt,
  pcCol: Vt,
  pcColLabel: Mt,
  pcColValue: Yt,
  pcProgressText: Ut,
  entityLabel: zt
}, We = (t) => {
  if (!t) return null;
  const v = t.trim(), l = {
    user: "User",
    email: "Mail",
    mail: "Mail",
    phone: "Phone",
    datetime: "Calendar",
    date: "Calendar",
    time: "Clock",
    tags: "Tag"
  }[v] ?? v.replace(/(^\w|-\w)/g, (g) => g.replace("-", "").toUpperCase());
  return Rt[l] || null;
}, Jt = (t, v) => {
  const h = typeof t == "number" ? t : typeof t == "string" ? parseFloat(t) : NaN, y = isFinite(h) ? h <= 1 ? Math.max(0, Math.min(1, h)) * 100 : Math.max(0, Math.min(100, h)) : 0;
  return /* @__PURE__ */ i.jsxs("div", { className: u.pcProgress, children: [
    /* @__PURE__ */ i.jsx(
      _t,
      {
        percent: y,
        showInfo: !1,
        strokeColor: "#027ffe",
        size: { height: 12 }
      }
    ),
    (v == null ? void 0 : v.text) && /* @__PURE__ */ i.jsx("div", { className: u.pcProgressText, children: v.text })
  ] });
}, Ye = (t) => !Array.isArray(t) || t.length === 0 ? null : /* @__PURE__ */ i.jsx("div", { className: u.pcTagsRow, children: t.map((v, h) => /* @__PURE__ */ i.jsx(
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
  `${v}-${h}`
)) }), Kt = (t) => {
  const { view: v, value: h, payload: y } = t;
  return v === "percent_bar" ? Jt(h, y) : v === "tags" ? Ye(Array.isArray(h) ? h : []) : /* @__PURE__ */ i.jsx("div", { className: u.pcColValue, children: String(h ?? "") });
}, Ue = ({
  data: t
}) => {
  var v, h, y;
  return /* @__PURE__ */ i.jsxs(i.Fragment, { children: [
    (t == null ? void 0 : t.cover) && /* @__PURE__ */ i.jsx(
      "div",
      {
        className: u.pcCover,
        style: { height: (v = t == null ? void 0 : t.style) == null ? void 0 : v.cover_max_height },
        children: /* @__PURE__ */ i.jsx("img", { src: t.cover, alt: "cover" })
      }
    ),
    Array.isArray(t == null ? void 0 : t.categories) && t.categories.length > 0 && /* @__PURE__ */ i.jsx("div", { className: u.pcSection, children: /* @__PURE__ */ i.jsx(
      gt,
      {
        items: t.categories.map((l, b) => ({
          key: `${l}-${b}`,
          title: l
        })),
        separator: /* @__PURE__ */ i.jsx("span", { className: u.pcBreadcrumbSep, children: "/" })
      }
    ) }),
    ((t == null ? void 0 : t.color) || (t == null ? void 0 : t.icon) || (t == null ? void 0 : t.title) || (t == null ? void 0 : t.subtitle) || (t == null ? void 0 : t.url)) && /* @__PURE__ */ i.jsx("div", { className: u.pcBasic, children: /* @__PURE__ */ i.jsxs("div", { className: u.pcBasicRow, children: [
      /* @__PURE__ */ i.jsxs("div", { className: u.pcBasicRowLeft, children: [
        (t == null ? void 0 : t.color) && /* @__PURE__ */ i.jsx(
          "span",
          {
            className: u.pcColorSwatch,
            style: { backgroundColor: t.color },
            "aria-label": `color ${t.color}`,
            title: `color: ${t.color}`
          }
        ),
        (() => {
          var g;
          const l = (g = t == null ? void 0 : t.icon) == null ? void 0 : g.trim();
          if (l && /^https?:\/\/+/i.test(l))
            return /* @__PURE__ */ i.jsx(
              "img",
              {
                src: l,
                alt: "icon",
                className: u.pcIcon,
                width: 18,
                height: 18,
                style: { objectFit: "contain" }
              }
            );
          const b = We(l);
          return b ? /* @__PURE__ */ i.jsx(b, { className: u.pcIcon, size: 18, strokeWidth: 2 }) : null;
        })(),
        (t == null ? void 0 : t.title) && /* @__PURE__ */ i.jsx("span", { className: u.pcTitleText, title: t.title, children: t.title }),
        (t == null ? void 0 : t.subtitle) && /* @__PURE__ */ i.jsxs("span", { className: u.pcSubTitleText, title: t.subtitle, children: [
          "｜ ",
          t.subtitle
        ] })
      ] }),
      (t == null ? void 0 : t.url) && /* @__PURE__ */ i.jsx(
        "a",
        {
          href: t.url,
          target: "_blank",
          rel: "noreferrer",
          "aria-label": "open link",
          title: t.url,
          className: u.pcLinkIconRight,
          children: /* @__PURE__ */ i.jsx(
            xt,
            {
              style: { width: 12, height: 12, color: "#027FFE" }
            }
          )
        }
      )
    ] }) }),
    Array.isArray(t == null ? void 0 : t.properties) && t.properties.length > 0 && /* @__PURE__ */ i.jsx("div", { className: u.pcSection, children: /* @__PURE__ */ i.jsx("div", { className: u.pcProperties, children: t.properties.map((l, b) => {
      const g = We(l.icon), T = () => {
        if (l.view === "tags")
          return Ye(Array.isArray(l.value) ? l.value : []);
        if (l.view === "datetime_with_time_zone") {
          const f = String(l.value ?? "");
          return /* @__PURE__ */ i.jsx("span", { className: u.pcPropertyValue, children: f });
        }
        return /* @__PURE__ */ i.jsx("span", { className: u.pcPropertyValue, children: String(l.value ?? "") });
      };
      return /* @__PURE__ */ i.jsxs("div", { className: u.pcProperty, children: [
        g && /* @__PURE__ */ i.jsx(
          g,
          {
            className: u.pcPropertyIcon,
            size: 16,
            strokeWidth: 2
          }
        ),
        T()
      ] }, b);
    }) }) }),
    Array.isArray((y = (h = t == null ? void 0 : t.details) == null ? void 0 : h.table) == null ? void 0 : y.rows) && t.details.table.rows.length > 0 && /* @__PURE__ */ i.jsx("div", { className: u.pcSection, children: /* @__PURE__ */ i.jsx("div", { className: u.pcDetails, children: t.details.table.rows.map((l, b) => {
      const g = Array.isArray(l.columns) ? l.columns.filter(
        (f) => f && (f.label !== void 0 || f.value !== void 0)
      ) : [], T = g.length;
      return /* @__PURE__ */ i.jsx(
        "div",
        {
          className: u.pcRow,
          style: {
            gridTemplateColumns: T <= 1 ? "1fr" : "repeat(2, minmax(0, 1fr))"
          },
          children: g.map((f, S) => /* @__PURE__ */ i.jsxs("div", { className: u.pcCol, children: [
            Kt(f),
            f.label && /* @__PURE__ */ i.jsx("div", { className: u.pcColLabel, children: f.label })
          ] }, S))
        },
        b
      );
    }) }) }),
    Array.isArray(t == null ? void 0 : t.tags) && t.tags.length > 0 && /* @__PURE__ */ i.jsx("div", { className: u.pcSection, children: t.tags.map((l, b) => /* @__PURE__ */ i.jsx(
      Me,
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: "#027FFE",
          border: "none"
        },
        icon: /* @__PURE__ */ i.jsx(Et, { style: { width: 12, height: 12 } }),
        color: "default",
        children: l
      },
      b
    )) })
  ] });
}, Zt = ({
  title: t,
  subtitle: v,
  description: h,
  imageUrl: y,
  actions: l = [],
  footer: b,
  triggerType: g = "hover",
  popupMode: T = "modal",
  trigger: f,
  open: S,
  onOpenChange: R,
  modalTitle: P,
  width: O,
  placement: N = "right",
  data: Z,
  hoverOpenDelay: le = 500,
  closeDelay: ce = 200,
  autoPlacement: A = !1,
  hoverAutoClose: x = !1,
  hoverAutoCloseDelay: xe = 2e3
}) => {
  var M, Y, U, z;
  const [ue, fe] = Le(!1), Q = typeof S == "boolean", pe = Q ? S : ue, ve = (C) => {
    Q ? R == null || R(C) : fe(C);
  }, m = Z, $ = dt(null), [he, ee] = Le(N), k = () => {
    if (!$.current) return;
    const C = $.current.getBoundingClientRect(), re = window.innerWidth, ne = window.innerHeight, oe = (() => {
      var ie;
      const F = (typeof O == "number" ? O : void 0) ?? ((ie = m == null ? void 0 : m.style) == null ? void 0 : ie.width);
      return F ? typeof F == "string" ? parseInt(F, 10) || 376 : F : 376;
    })(), me = 300, J = re - C.right, K = C.left, B = ne - C.bottom;
    C.top;
    let I = N;
    J >= oe ? I = "right" : K >= oe ? I = "left" : B >= me ? I = "bottom" : I = "top", ee(I);
  }, q = /* @__PURE__ */ i.jsx(yt, { type: "default", children: `打开：${(m == null ? void 0 : m.title) ?? t ?? "详情"}` }), D = /* @__PURE__ */ i.jsx("span", { ref: $, style: { display: "inline-block" }, children: f ?? q }), te = /* @__PURE__ */ i.jsx(
    bt,
    {
      content: /* @__PURE__ */ i.jsx(
        "div",
        {
          className: u.entityCard,
          style: {
            width: (M = m == null ? void 0 : m.style) == null ? void 0 : M.width,
            height: (Y = m == null ? void 0 : m.style) == null ? void 0 : Y.height,
            maxWidth: (U = m == null ? void 0 : m.style) == null ? void 0 : U.max_width,
            maxHeight: (z = m == null ? void 0 : m.style) == null ? void 0 : z.max_height
          },
          children: /* @__PURE__ */ i.jsx(Ue, { data: m })
        }
      ),
      open: pe,
      onOpenChange: (C) => {
        C && A && k(), ve(!!C);
      },
      trigger: g,
      placement: A ? he : N,
      mouseEnterDelay: g === "hover" ? le / 1e3 : 0,
      mouseLeaveDelay: g === "hover" ? ce / 1e3 : 0,
      autoAdjustOverflow: !0,
      getPopupContainer: () => $.current || document.body,
      overlayInnerStyle: { padding: 0 },
      children: D
    }
  );
  return /* @__PURE__ */ i.jsx(i.Fragment, { children: te });
}, Qt = ({ data: t }) => {
  var v, h, y, l;
  return /* @__PURE__ */ i.jsx(
    "div",
    {
      className: u.entityLabel,
      style: {
        width: (v = t == null ? void 0 : t.style) == null ? void 0 : v.width,
        height: (h = t == null ? void 0 : t.style) == null ? void 0 : h.height,
        maxWidth: (y = t == null ? void 0 : t.style) == null ? void 0 : y.max_width,
        maxHeight: (l = t == null ? void 0 : t.style) == null ? void 0 : l.max_height
      },
      children: /* @__PURE__ */ i.jsx(Ue, { data: t })
    }
  );
};
export {
  Zt as EntityCard,
  Qt as EntityLabel
};
