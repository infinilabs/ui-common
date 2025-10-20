import Ve, { useState as Le, useRef as _t } from "react";
import { Breadcrumb as bt, Tag as Ye, Progress as xt, Button as Rt, Popover as jt, Skeleton as Et, Avatar as We } from "antd";
import * as ze from "lucide-react";
import { ExternalLink as wt, Tags as Ct } from "lucide-react";
var xe = { exports: {} }, X = {};
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
function Tt() {
  if ($e) return X;
  $e = 1;
  var t = Ve, v = Symbol.for("react.element"), f = Symbol.for("react.fragment"), c = Object.prototype.hasOwnProperty, s = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function m(R, u, j) {
    var b, S = {}, C = null, O = null;
    j !== void 0 && (C = "" + j), u.key !== void 0 && (C = "" + u.key), u.ref !== void 0 && (O = u.ref);
    for (b in u) c.call(u, b) && !g.hasOwnProperty(b) && (S[b] = u[b]);
    if (R && R.defaultProps) for (b in u = R.defaultProps, u) S[b] === void 0 && (S[b] = u[b]);
    return { $$typeof: v, type: R, key: C, ref: O, props: S, _owner: s.current };
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
var Be;
function St() {
  return Be || (Be = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Ve, v = Symbol.for("react.element"), f = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), s = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), m = Symbol.for("react.provider"), R = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), b = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), C = Symbol.for("react.lazy"), O = Symbol.for("react.offscreen"), W = Symbol.iterator, ae = "@@iterator";
    function ce(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = W && e[W] || e[ae];
      return typeof r == "function" ? r : null;
    }
    var A = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function E(e) {
      {
        for (var r = arguments.length, i = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
          i[o - 1] = arguments[o];
        Re("error", e, i);
      }
    }
    function Re(e, r, i) {
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
    function $(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === c || e === g || he || e === s || e === j || e === b || pe || e === O || ue || fe || Q || typeof e == "object" && e !== null && (e.$$typeof === C || e.$$typeof === S || e.$$typeof === m || e.$$typeof === R || e.$$typeof === u || // This needs to include all possible module reference object
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
      if (typeof e.tag == "number" && E("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
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
        case b:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
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
    var F = Object.assign, D = 0, te, V, Y, z, J, P, re;
    function ne() {
    }
    ne.__reactDisabledLog = !0;
    function ie() {
      {
        if (D === 0) {
          te = console.log, V = console.info, Y = console.warn, z = console.error, J = console.group, P = console.groupCollapsed, re = console.groupEnd;
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
    function ge() {
      {
        if (D--, D === 0) {
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
              value: V
            }),
            warn: F({}, e, {
              value: Y
            }),
            error: F({}, e, {
              value: z
            }),
            group: F({}, e, {
              value: J
            }),
            groupCollapsed: F({}, e, {
              value: P
            }),
            groupEnd: F({}, e, {
              value: re
            })
          });
        }
        D < 0 && E("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var H = A.ReactCurrentDispatcher, K;
    function B(e, r, i) {
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
    var q = !1, N;
    {
      var oe = typeof WeakMap == "function" ? WeakMap : Map;
      N = new oe();
    }
    function je(e, r) {
      if (!e || q)
        return "";
      {
        var i = N.get(e);
        if (i !== void 0)
          return i;
      }
      var o;
      q = !0;
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
`), w = o.stack.split(`
`), _ = l.length - 1, x = w.length - 1; _ >= 1 && x >= 0 && l[_] !== w[x]; )
            x--;
          for (; _ >= 1 && x >= 0; _--, x--)
            if (l[_] !== w[x]) {
              if (_ !== 1 || x !== 1)
                do
                  if (_--, x--, x < 0 || l[_] !== w[x]) {
                    var k = `
` + l[_].replace(" at new ", " at ");
                    return e.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", e.displayName)), typeof e == "function" && N.set(e, k), k;
                  }
                while (_ >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        q = !1, H.current = y, ge(), Error.prepareStackTrace = p;
      }
      var U = e ? e.displayName || e.name : "", L = U ? B(U) : "";
      return typeof e == "function" && N.set(e, L), L;
    }
    function Ke(e, r, i) {
      return je(e, !1);
    }
    function Ge(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function se(e, r, i) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return je(e, Ge(e));
      if (typeof e == "string")
        return B(e);
      switch (e) {
        case j:
          return B("Suspense");
        case b:
          return B("SuspenseList");
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
    var G = Object.prototype.hasOwnProperty, Ee = {}, we = A.ReactDebugCurrentFrame;
    function le(e) {
      if (e) {
        var r = e._owner, i = se(e.type, e._source, r ? r.type : null);
        we.setExtraStackFrame(i);
      } else
        we.setExtraStackFrame(null);
    }
    function Xe(e, r, i, o, p) {
      {
        var y = Function.call.bind(G);
        for (var a in e)
          if (y(e, a)) {
            var l = void 0;
            try {
              if (typeof e[a] != "function") {
                var w = Error((o || "React class") + ": " + i + " type `" + a + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[a] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw w.name = "Invariant Violation", w;
              }
              l = e[a](r, a, o, i, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (_) {
              l = _;
            }
            l && !(l instanceof Error) && (le(p), E("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", i, a, typeof l), le(null)), l instanceof Error && !(l.message in Ee) && (Ee[l.message] = !0, le(p), E("Failed %s type: %s", i, l.message), le(null));
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
        return E("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Qe(e)), Ce(e);
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
          Pe || (Pe = !0, E("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
          ke || (ke = !0, E("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
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
        var y, a = {}, l = null, w = null;
        i !== void 0 && (Te(i), l = "" + i), nt(r) && (Te(r.key), l = "" + r.key), rt(r) && (w = r.ref, it(r, p));
        for (y in r)
          G.call(r, y) && !tt.hasOwnProperty(y) && (a[y] = r[y]);
        if (e && e.defaultProps) {
          var _ = e.defaultProps;
          for (y in _)
            a[y] === void 0 && (a[y] = _[y]);
        }
        if (l || w) {
          var x = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          l && ot(a, x), w && st(a, x);
        }
        return lt(e, l, w, p, o, Se.current, a);
      }
    }
    var ye = A.ReactCurrentOwner, Oe = A.ReactDebugCurrentFrame;
    function M(e) {
      if (e) {
        var r = e._owner, i = se(e.type, e._source, r ? r.type : null);
        Oe.setExtraStackFrame(i);
      } else
        Oe.setExtraStackFrame(null);
    }
    var de;
    de = !1;
    function _e(e) {
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
        e && e._owner && e._owner !== ye.current && (o = " It was passed a child from " + I(e._owner.type) + "."), M(e), E('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', i, o), M(null);
      }
    }
    function qe(e, r) {
      {
        if (typeof e != "object")
          return;
        if (me(e))
          for (var i = 0; i < e.length; i++) {
            var o = e[i];
            _e(o) && Fe(o, r);
          }
        else if (_e(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var p = ce(e);
          if (typeof p == "function" && p !== e.entries)
            for (var y = p.call(e), a; !(a = y.next()).done; )
              _e(a.value) && Fe(a.value, r);
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
          E("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", p || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && E("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function pt(e) {
      {
        for (var r = Object.keys(e.props), i = 0; i < r.length; i++) {
          var o = r[i];
          if (o !== "children" && o !== "key") {
            M(e), E("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", o), M(null);
            break;
          }
        }
        e.ref !== null && (M(e), E("Invalid attribute `ref` supplied to `React.Fragment`."), M(null));
      }
    }
    var Ne = {};
    function De(e, r, i, o, p, y) {
      {
        var a = $(e);
        if (!a) {
          var l = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (l += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var w = ct();
          w ? l += w : l += Ie();
          var _;
          e === null ? _ = "null" : me(e) ? _ = "array" : e !== void 0 && e.$$typeof === v ? (_ = "<" + (I(e.type) || "Unknown") + " />", l = " Did you accidentally export a JSX literal instead of a component?") : _ = typeof e, E("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", _, l);
        }
        var x = at(e, r, i, p, y);
        if (x == null)
          return x;
        if (a) {
          var k = r.children;
          if (k !== void 0)
            if (o)
              if (me(k)) {
                for (var U = 0; U < k.length; U++)
                  qe(k[U], e);
                Object.freeze && Object.freeze(k);
              } else
                E("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              qe(k, e);
        }
        if (G.call(r, "key")) {
          var L = I(e), T = Object.keys(r).filter(function(dt) {
            return dt !== "key";
          }), be = T.length > 0 ? "{key: someKey, " + T.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ne[L + be]) {
            var yt = T.length > 0 ? "{" + T.join(": ..., ") + ": ...}" : "{}";
            E(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, be, L, yt, L), Ne[L + be] = !0;
          }
        }
        return e === c ? pt(x) : ft(x), x;
      }
    }
    function ht(e, r, i) {
      return De(e, r, i, !0);
    }
    function vt(e, r, i) {
      return De(e, r, i, !1);
    }
    var gt = vt, mt = ht;
    Z.Fragment = c, Z.jsx = gt, Z.jsxs = mt;
  }()), Z;
}
process.env.NODE_ENV === "production" ? xe.exports = Tt() : xe.exports = St();
var n = xe.exports;
const Pt = "_entityCard_qqftp_1", kt = "_pcCover_qqftp_15", Ot = "_pcSection_qqftp_31", It = "_pcBreadcrumbSep_qqftp_38", At = "_pcBasic_qqftp_43", Ft = "_pcBasicRow_qqftp_50", qt = "_pcBasicRowLeft_qqftp_57", Nt = "_pcLinkIconRight_qqftp_62", Dt = "_pcColorSwatch_qqftp_73", Lt = "_pcTitleText_qqftp_100", Wt = "_pcSubTitleText_qqftp_107", $t = "_pcProperties_qqftp_120", Bt = "_pcProperty_qqftp_128", Mt = "_pcTagsRow_qqftp_139", Ut = "_pcDetails_qqftp_152", Vt = "_pcRow_qqftp_158", Yt = "_pcCol_qqftp_73", zt = "_pcColLabel_qqftp_180", Jt = "_pcColValue_qqftp_184", Ht = "_pcProgressText_qqftp_189", Kt = "_entityLabel_qqftp_195", h = {
  entityCard: Pt,
  pcCover: kt,
  pcSection: Ot,
  pcBreadcrumbSep: It,
  pcBasic: At,
  pcBasicRow: Ft,
  pcBasicRowLeft: qt,
  pcLinkIconRight: Nt,
  pcColorSwatch: Dt,
  pcTitleText: Lt,
  pcSubTitleText: Wt,
  pcProperties: $t,
  pcProperty: Bt,
  pcTagsRow: Mt,
  pcDetails: Ut,
  pcRow: Vt,
  pcCol: Yt,
  pcColLabel: zt,
  pcColValue: Jt,
  pcProgressText: Ht,
  entityLabel: Kt
}, Me = (t) => {
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
  return ze[s] || null;
}, Gt = (t, v) => {
  const f = typeof t == "number" ? t : typeof t == "string" ? parseFloat(t) : NaN, c = isFinite(f) ? f <= 1 ? Math.max(0, Math.min(1, f)) * 100 : Math.max(0, Math.min(100, f)) : 0;
  return /* @__PURE__ */ n.jsxs("div", { className: h.pcProgress, children: [
    /* @__PURE__ */ n.jsx(
      xt,
      {
        percent: c,
        showInfo: !1,
        strokeColor: "#027ffe",
        size: { height: 12 }
      }
    ),
    (v == null ? void 0 : v.text) && /* @__PURE__ */ n.jsx("div", { className: h.pcProgressText, children: v.text })
  ] });
}, Je = (t) => !Array.isArray(t) || t.length === 0 ? null : /* @__PURE__ */ n.jsx("div", { className: h.pcTagsRow, children: t.map((v, f) => /* @__PURE__ */ n.jsx(
  Ye,
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
  return v === "percent_bar" ? Gt(f, c) : v === "tags" ? Je(Array.isArray(f) ? f : []) : /* @__PURE__ */ n.jsx("div", { className: h.pcColValue, children: String(f ?? "") });
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
      bt,
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
          const g = Me(s);
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
            wt,
            {
              style: { width: 12, height: 12, color: "#027FFE" }
            }
          )
        }
      )
    ] }) }),
    Array.isArray(t == null ? void 0 : t.properties) && t.properties.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx("div", { className: h.pcProperties, children: t.properties.map((s, g) => {
      const m = Me(s.icon), R = () => {
        if (s.view === "tags")
          return Je(Array.isArray(s.value) ? s.value : []);
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
        R()
      ] }, g);
    }) }) }),
    Array.isArray((c = (f = t == null ? void 0 : t.details) == null ? void 0 : f.table) == null ? void 0 : c.rows) && t.details.table.rows.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: /* @__PURE__ */ n.jsx("div", { className: h.pcDetails, children: t.details.table.rows.map((s, g) => {
      const m = Array.isArray(s.columns) ? s.columns.filter(
        (u) => u && (u.label !== void 0 || u.value !== void 0)
      ) : [], R = m.length;
      return /* @__PURE__ */ n.jsx(
        "div",
        {
          className: h.pcRow,
          style: {
            gridTemplateColumns: R <= 1 ? "1fr" : "repeat(2, minmax(0, 1fr))"
          },
          children: m.map((u, j) => /* @__PURE__ */ n.jsxs("div", { className: h.pcCol, children: [
            Xt(u),
            u.label && /* @__PURE__ */ n.jsx("div", { className: h.pcColLabel, children: u.label })
          ] }, j))
        },
        g
      );
    }) }) }),
    Array.isArray(t == null ? void 0 : t.tags) && t.tags.length > 0 && /* @__PURE__ */ n.jsx("div", { className: h.pcSection, children: t.tags.map((s, g) => /* @__PURE__ */ n.jsx(
      Ye,
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
  popupMode: R = "modal",
  trigger: u,
  open: j,
  onOpenChange: b,
  modalTitle: S,
  width: C,
  placement: O = "right",
  data: W,
  hoverOpenDelay: ae = 500,
  closeDelay: ce = 200,
  autoPlacement: A = !1,
  hoverAutoClose: E = !1,
  hoverAutoCloseDelay: Re = 2e3
}) => {
  var V, Y, z, J;
  const [ue, fe] = Le(!1), Q = typeof j == "boolean", pe = Q ? j : ue, he = (P) => {
    Q ? b == null || b(P) : fe(P);
  }, d = W, $ = _t(null), [ve, ee] = Le(O), I = () => {
    if (!$.current) return;
    const P = $.current.getBoundingClientRect(), re = window.innerWidth, ne = window.innerHeight, ie = (() => {
      var oe;
      const N = (typeof C == "number" ? C : void 0) ?? ((oe = d == null ? void 0 : d.style) == null ? void 0 : oe.width);
      return N ? typeof N == "string" ? parseInt(N, 10) || 376 : N : 376;
    })(), ge = 300, H = re - P.right, K = P.left, B = ne - P.bottom;
    P.top;
    let q = O;
    H >= ie ? q = "right" : K >= ie ? q = "left" : B >= ge ? q = "bottom" : q = "top", ee(q);
  }, F = /* @__PURE__ */ n.jsx(Rt, { type: "default", children: `打开：${(d == null ? void 0 : d.title) ?? t ?? "详情"}` }), D = /* @__PURE__ */ n.jsx("span", { ref: $, style: { display: "inline-block" }, children: u ?? F }), te = /* @__PURE__ */ n.jsx(
    jt,
    {
      content: /* @__PURE__ */ n.jsx(
        "div",
        {
          className: h.entityCard,
          style: {
            width: (V = d == null ? void 0 : d.style) == null ? void 0 : V.width,
            height: (Y = d == null ? void 0 : d.style) == null ? void 0 : Y.height,
            maxWidth: (z = d == null ? void 0 : d.style) == null ? void 0 : z.max_width,
            maxHeight: (J = d == null ? void 0 : d.style) == null ? void 0 : J.max_height
          },
          children: d != null && d.id ? /* @__PURE__ */ n.jsx(He, { data: d }) : /* @__PURE__ */ n.jsx(
            Et,
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
      getPopupContainer: () => $.current || document.body,
      overlayInnerStyle: { padding: 0 },
      children: D
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
  return ze[c] || null;
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
}, Ue = () => /* @__PURE__ */ n.jsxs(
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
  var b, S;
  if (!t || !t.title && !t.icon && !t.subtitle && !t.color && !t.url) return /* @__PURE__ */ n.jsx(Ue, {});
  const f = (b = t == null ? void 0 : t.icon) == null ? void 0 : b.trim(), c = (S = t == null ? void 0 : t.title) == null ? void 0 : S.trim(), s = Qt(t == null ? void 0 : t.url), g = !!f, m = !!c, R = !!s, u = !!(t != null && t.color) || !!(t != null && t.subtitle), j = (C = 20) => {
    if (f && /^https?:\/\//i.test(f))
      return /* @__PURE__ */ n.jsx(We, { size: C, src: f });
    const O = Zt(f || "user"), W = Math.max(8, C - 4);
    return /* @__PURE__ */ n.jsx(We, { size: C, icon: O ? /* @__PURE__ */ n.jsx(O, { size: W }) : void 0 });
  };
  return g && m && !R && !u ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
    j(),
    /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500, lineHeight: "20px" }, title: c, children: c })
  ] }) : g && !m && !R && !u ? /* @__PURE__ */ n.jsx("span", { style: { display: "inline-flex" }, children: j() }) : !g && m && !R && !u ? /* @__PURE__ */ n.jsx(
    "span",
    {
      style: { display: "inline-block", color: "#027FFE", fontWeight: 500 },
      title: c,
      children: c
    }
  ) : g && m && R ? /* @__PURE__ */ n.jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8 }, children: [
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
  ] }) : m ? /* @__PURE__ */ n.jsx("span", { style: { color: "#027FFE", fontWeight: 500 }, title: c, children: c }) : /* @__PURE__ */ n.jsx(Ue, {});
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
