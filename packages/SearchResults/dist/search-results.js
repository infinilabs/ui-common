(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-700:oklch(37.2% .044 257.287);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-3xl:48rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--font-weight-medium:500;--font-weight-semibold:600;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--aspect-video:16/9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::-moz-placeholder{opacity:1}::placeholder{opacity:1}@supports (not (-webkit-appearance:-apple-pay-button)) or (contain-intrinsic-size:1px){::-moz-placeholder{color:currentColor}::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::-moz-placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.static{position:static}.inset-0{inset:calc(var(--spacing)*0)}.mx-1{margin-inline:calc(var(--spacing)*1)}.mx-auto{margin-inline:auto}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-3{margin-top:calc(var(--spacing)*3)}.mb-0{margin-bottom:calc(var(--spacing)*0)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.flex{display:flex}.grid{display:grid}.inline-flex{display:inline-flex}.table{display:table}.aspect-4\\/3{aspect-ratio:4/3}.aspect-video{aspect-ratio:var(--aspect-video)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-9{height:calc(var(--spacing)*9)}.h-10{height:calc(var(--spacing)*10)}.h-\\[90px\\]{height:90px}.h-full{height:100%}.h-px{height:1px}.min-h-screen{min-height:100vh}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-10{width:calc(var(--spacing)*10)}.w-\\[160px\\]{width:160px}.w-full{width:100%}.w-px{width:1px}.max-w-3xl{max-width:var(--container-3xl)}.min-w-0{min-width:calc(var(--spacing)*0)}.flex-1{flex:1}.flex-none{flex:none}.translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x)var(--tw-translate-y)}.transform{transform:var(--tw-rotate-x,)var(--tw-rotate-y,)var(--tw-rotate-z,)var(--tw-skew-x,)var(--tw-skew-y,)}.cursor-pointer{cursor:pointer}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-2{gap:calc(var(--spacing)*2)}.gap-3{gap:calc(var(--spacing)*3)}:where(.space-y-5>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*5)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*5)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*6)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*6)*calc(1 - var(--tw-space-y-reverse)))}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-sm{border-radius:var(--radius-sm)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#E8E8E8\\]{border-color:#e8e8e8}.border-slate-200{border-color:var(--color-slate-200)}.bg-\\[\\#027FFE\\]{background-color:#027ffe}.bg-\\[\\#666\\]{background-color:#666}.bg-\\[\\#E02E2E\\]{background-color:#e02e2e}.bg-\\[\\#E8E8E8\\]{background-color:#e8e8e8}.bg-black{background-color:var(--color-black)}.bg-black\\/55{background-color:#0000008c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/55{background-color:color-mix(in oklab,var(--color-black)55%,transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-white{background-color:var(--color-white)}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-6{padding:calc(var(--spacing)*6)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-12{padding-inline:calc(var(--spacing)*12)}.py-1{padding-block:calc(var(--spacing)*1)}.py-2{padding-block:calc(var(--spacing)*2)}.text-left{text-align:left}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-\\[\\#1A0CAB\\]{color:#1a0cab}.text-\\[\\#007EFF\\]{color:#007eff}.text-\\[\\#333\\]{color:#333}.text-\\[\\#666\\]{color:#666}.text-slate-700{color:var(--color-slate-700)}.text-white{color:var(--color-white)}.no-underline{text-decoration-line:none}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-slate-200{--tw-ring-color:var(--color-slate-200)}.ring-white{--tw-ring-color:var(--color-white)}.ring-white\\/30{--tw-ring-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.ring-white\\/30{--tw-ring-color:color-mix(in oklab,var(--color-white)30%,transparent)}}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media(hover:hover){.group-hover\\:underline:is(:where(.group):hover *){text-decoration-line:underline}.group-hover\\:underline-offset-2:is(:where(.group):hover *){text-underline-offset:2px}.hover\\:border-\\[\\#E8E8E8\\]:hover{border-color:#e8e8e8}.hover\\:border-slate-300:hover{border-color:var(--color-slate-300)}.hover\\:bg-\\[\\#F5F5F5\\]:hover{background-color:#f5f5f5}.hover\\:bg-slate-50:hover{background-color:var(--color-slate-50)}.hover\\:text-\\[\\#007EFF\\]:hover{color:#007eff}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:underline-offset-2:hover{text-underline-offset:2px}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-slate-300:focus-visible{--tw-ring-color:var(--color-slate-300)}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import q from "react";
import m from "clsx";
import { Image as M, Video as oe, File as ce, FileText as ue, Presentation as fe, FileSpreadsheet as de, ExternalLink as me, Play as xe } from "lucide-react";
var E = { exports: {} }, j = {};
var z;
function pe() {
  if (z) return j;
  z = 1;
  var e = /* @__PURE__ */ Symbol.for("react.transitional.element"), n = /* @__PURE__ */ Symbol.for("react.fragment");
  function l(s, a, o) {
    var d = null;
    if (o !== void 0 && (d = "" + o), a.key !== void 0 && (d = "" + a.key), "key" in a) {
      o = {};
      for (var x in a)
        x !== "key" && (o[x] = a[x]);
    } else o = a;
    return a = o.ref, {
      $$typeof: e,
      type: s,
      key: d,
      ref: a !== void 0 ? a : null,
      props: o
    };
  }
  return j.Fragment = n, j.jsx = l, j.jsxs = l, j;
}
var v = {};
var G;
function he() {
  return G || (G = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(t) {
      if (t == null) return null;
      if (typeof t == "function")
        return t.$$typeof === le ? null : t.displayName || t.name || null;
      if (typeof t == "string") return t;
      switch (t) {
        case R:
          return "Fragment";
        case Z:
          return "Profiler";
        case H:
          return "StrictMode";
        case te:
          return "Suspense";
        case re:
          return "SuspenseList";
        case se:
          return "Activity";
      }
      if (typeof t == "object")
        switch (typeof t.tag == "number" && console.error(
          "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
        ), t.$$typeof) {
          case X:
            return "Portal";
          case K:
            return t.displayName || "Context";
          case Q:
            return (t._context.displayName || "Context") + ".Consumer";
          case ee:
            var i = t.render;
            return t = t.displayName, t || (t = i.displayName || i.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
          case ne:
            return i = t.displayName || null, i !== null ? i : e(t.type) || "Memo";
          case A:
            i = t._payload, t = t._init;
            try {
              return e(t(i));
            } catch {
            }
        }
      return null;
    }
    function n(t) {
      return "" + t;
    }
    function l(t) {
      try {
        n(t);
        var i = !1;
      } catch {
        i = !0;
      }
      if (i) {
        i = console;
        var c = i.error, u = typeof Symbol == "function" && Symbol.toStringTag && t[Symbol.toStringTag] || t.constructor.name || "Object";
        return c.call(
          i,
          "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
          u
        ), n(t);
      }
    }
    function s(t) {
      if (t === R) return "<>";
      if (typeof t == "object" && t !== null && t.$$typeof === A)
        return "<...>";
      try {
        var i = e(t);
        return i ? "<" + i + ">" : "<...>";
      } catch {
        return "<...>";
      }
    }
    function a() {
      var t = k.A;
      return t === null ? null : t.getOwner();
    }
    function o() {
      return Error("react-stack-top-frame");
    }
    function d(t) {
      if ($.call(t, "key")) {
        var i = Object.getOwnPropertyDescriptor(t, "key").get;
        if (i && i.isReactWarning) return !1;
      }
      return t.key !== void 0;
    }
    function x(t, i) {
      function c() {
        B || (B = !0, console.error(
          "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
          i
        ));
      }
      c.isReactWarning = !0, Object.defineProperty(t, "key", {
        get: c,
        configurable: !0
      });
    }
    function p() {
      var t = e(this.type);
      return L[t] || (L[t] = !0, console.error(
        "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
      )), t = this.props.ref, t !== void 0 ? t : null;
    }
    function g(t, i, c, u, w, S) {
      var f = c.ref;
      return t = {
        $$typeof: F,
        type: t,
        key: i,
        props: c,
        _owner: u
      }, (f !== void 0 ? f : null) !== null ? Object.defineProperty(t, "ref", {
        enumerable: !1,
        get: p
      }) : Object.defineProperty(t, "ref", { enumerable: !1, value: null }), t._store = {}, Object.defineProperty(t._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: 0
      }), Object.defineProperty(t, "_debugInfo", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: null
      }), Object.defineProperty(t, "_debugStack", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: w
      }), Object.defineProperty(t, "_debugTask", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: S
      }), Object.freeze && (Object.freeze(t.props), Object.freeze(t)), t;
    }
    function b(t, i, c, u, w, S) {
      var f = i.children;
      if (f !== void 0)
        if (u)
          if (ae(f)) {
            for (u = 0; u < f.length; u++)
              N(f[u]);
            Object.freeze && Object.freeze(f);
          } else
            console.error(
              "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
            );
        else N(f);
      if ($.call(i, "key")) {
        f = e(t);
        var h = Object.keys(i).filter(function(ie) {
          return ie !== "key";
        });
        u = 0 < h.length ? "{key: someKey, " + h.join(": ..., ") + ": ...}" : "{key: someKey}", D[f + u] || (h = 0 < h.length ? "{" + h.join(": ..., ") + ": ...}" : "{}", console.error(
          `A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`,
          u,
          f,
          h,
          f
        ), D[f + u] = !0);
      }
      if (f = null, c !== void 0 && (l(c), f = "" + c), d(i) && (l(i.key), f = "" + i.key), "key" in i) {
        c = {};
        for (var I in i)
          I !== "key" && (c[I] = i[I]);
      } else c = i;
      return f && x(
        c,
        typeof t == "function" ? t.displayName || t.name || "Unknown" : t
      ), g(
        t,
        f,
        c,
        a(),
        w,
        S
      );
    }
    function N(t) {
      P(t) ? t._store && (t._store.validated = 1) : typeof t == "object" && t !== null && t.$$typeof === A && (t._payload.status === "fulfilled" ? P(t._payload.value) && t._payload.value._store && (t._payload.value._store.validated = 1) : t._store && (t._store.validated = 1));
    }
    function P(t) {
      return typeof t == "object" && t !== null && t.$$typeof === F;
    }
    var y = q, F = /* @__PURE__ */ Symbol.for("react.transitional.element"), X = /* @__PURE__ */ Symbol.for("react.portal"), R = /* @__PURE__ */ Symbol.for("react.fragment"), H = /* @__PURE__ */ Symbol.for("react.strict_mode"), Z = /* @__PURE__ */ Symbol.for("react.profiler"), Q = /* @__PURE__ */ Symbol.for("react.consumer"), K = /* @__PURE__ */ Symbol.for("react.context"), ee = /* @__PURE__ */ Symbol.for("react.forward_ref"), te = /* @__PURE__ */ Symbol.for("react.suspense"), re = /* @__PURE__ */ Symbol.for("react.suspense_list"), ne = /* @__PURE__ */ Symbol.for("react.memo"), A = /* @__PURE__ */ Symbol.for("react.lazy"), se = /* @__PURE__ */ Symbol.for("react.activity"), le = /* @__PURE__ */ Symbol.for("react.client.reference"), k = y.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, $ = Object.prototype.hasOwnProperty, ae = Array.isArray, C = console.createTask ? console.createTask : function() {
      return null;
    };
    y = {
      react_stack_bottom_frame: function(t) {
        return t();
      }
    };
    var B, L = {}, Y = y.react_stack_bottom_frame.bind(
      y,
      o
    )(), U = C(s(o)), D = {};
    v.Fragment = R, v.jsx = function(t, i, c) {
      var u = 1e4 > k.recentlyCreatedOwnerStacks++;
      return b(
        t,
        i,
        c,
        !1,
        u ? Error("react-stack-top-frame") : Y,
        u ? C(s(t)) : U
      );
    }, v.jsxs = function(t, i, c) {
      var u = 1e4 > k.recentlyCreatedOwnerStacks++;
      return b(
        t,
        i,
        c,
        !0,
        u ? Error("react-stack-top-frame") : Y,
        u ? C(s(t)) : U
      );
    };
  })()), v;
}
var W;
function ge() {
  return W || (W = 1, process.env.NODE_ENV === "production" ? E.exports = pe() : E.exports = he()), E.exports;
}
var r = ge();
function be(e, n) {
  const l = [];
  for (const s of e) {
    const a = l.length ? l[l.length - 1] : void 0;
    if (s.type === "imageGroup") {
      s.items[0]?.type === "media" ? l.push({
        type: "section",
        title: s.title,
        titleIcon: /* @__PURE__ */ r.jsx(M, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB]",
        layout: "mediaGrid",
        items: s.items.filter((d) => d.type === "media"),
        columns: s.columns ?? n,
        footerAction: s.footerAction,
        className: s.className
      }) : l.push({
        type: "section",
        title: s.title,
        titleIcon: /* @__PURE__ */ r.jsx(M, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB]",
        layout: "imageGrid",
        items: s.items.filter((d) => d.type === "image"),
        columns: s.columns ?? n,
        footerAction: s.footerAction,
        className: s.className
      });
      continue;
    }
    if (s.type === "videoGroup") {
      l.push({
        type: "section",
        title: s.title,
        titleIcon: /* @__PURE__ */ r.jsx(oe, { className: "h-4 w-4" }),
        titleIconBgColor: "#1784FC",
        titleClassName: "text-[#1A0CAB]",
        layout: "mediaGrid",
        items: s.items,
        columns: s.columns ?? n,
        footerAction: s.footerAction,
        className: s.className
      });
      continue;
    }
    if (s.type === "result") {
      if (a?.layout === "list") {
        a.items.push(s);
        continue;
      }
      l.push({
        type: "section",
        layout: "list",
        items: [s]
      });
      continue;
    }
    if (s.type === "media") {
      if (a?.layout === "mediaGrid") {
        a.items.push(s);
        continue;
      }
      l.push({
        type: "section",
        layout: "mediaGrid",
        ...n ? { columns: n } : {},
        items: [s]
      });
      continue;
    }
    if (a?.layout === "imageGrid") {
      a.items.push(s);
      continue;
    }
    l.push({
      type: "section",
      layout: "imageGrid",
      ...n ? { columns: n } : {},
      items: [s]
    });
  }
  return l;
}
function je(e) {
  if (!e) return;
  const n = new Date(e);
  return Number.isNaN(n.getTime()) ? e : n.toISOString().slice(0, 10);
}
function ve(e) {
  const n = e?.trim().toLowerCase();
  if (n)
    return n === "pdf" ? "pdf" : n === "doc" || n === "docx" || n === "word" ? "doc" : n === "ppt" || n === "pptx" ? "ppt" : n === "xls" || n === "xlsx" || n === "excel" ? "xls" : n === "link" || n === "url" || n === "html" ? "link" : n === "txt" || n === "text" ? "text" : "unknown";
}
function Ne(e, n) {
  const l = e.thumbnail ?? e.cover ?? e.metadata?.thumbnail_link, s = e.summary ?? e.content, a = ve(e.metadata?.file_extension ?? e.type), o = e.source?.name, d = e.category ?? e.categories?.join(" / ") ?? "Categories", x = [o, d].filter(Boolean), p = e.last_updated_by?.user?.username ?? e.owner?.username, g = je(e.last_updated_by?.timestamp ?? e.metadata?.last_reviewed), b = e.metadata?.icon_link ?? e.icon, N = b ? /* @__PURE__ */ r.jsx("img", { src: b, alt: "", className: "h-5 w-5 rounded-sm object-contain" }) : void 0;
  return {
    type: "result",
    id: `${e.source?.id ?? e.url ?? e.title}-${n}`,
    title: e.title,
    href: e.url,
    description: s,
    thumbnailUrl: l,
    fileType: a,
    typeIcon: N,
    breadcrumbs: x.length ? x : void 0,
    author: p,
    date: g
  };
}
function ye(e) {
  return e.map((n, l) => Ne(n, l));
}
function T(e, n) {
  const l = n === "_blank" ? "noreferrer noopener" : "";
  return e ? l ? [...new Set([...e.split(" "), ...l.split(" ")].filter(Boolean))].join(" ") : e : l || void 0;
}
function J({
  href: e,
  target: n,
  rel: l,
  onClick: s,
  className: a,
  children: o
}) {
  return e ? /* @__PURE__ */ r.jsx(
    "a",
    {
      href: e,
      target: n,
      rel: T(l, n),
      className: a,
      onClick: () => s?.(),
      children: o
    }
  ) : /* @__PURE__ */ r.jsx("button", { type: "button", className: a, onClick: s, children: o });
}
function we({
  item: e,
  onItemClick: n
}) {
  return /* @__PURE__ */ r.jsxs(
    J,
    {
      href: e.href,
      target: e.target,
      rel: e.rel,
      onClick: () => {
        e.onClick?.(), n?.(e);
      },
      className: m(
        "group w-full rounded-xl bg-white text-left transition",
        "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      ),
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200", children: /* @__PURE__ */ r.jsx("div", { className: "relative aspect-video bg-slate-100", children: /* @__PURE__ */ r.jsx(
          "img",
          {
            src: e.imageUrl,
            alt: e.imageAlt ?? e.title,
            className: "absolute inset-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ) }) }),
        /* @__PURE__ */ r.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ r.jsx("div", { className: "truncate text-sm font-semibold text-[#333]", children: e.title }),
          e.subtitle ? /* @__PURE__ */ r.jsx("div", { className: "mt-1 truncate text-sm text-[#666]", children: e.subtitle }) : null
        ] })
      ]
    }
  );
}
function Ee({ author: e, date: n }) {
  return !e && !n ? null : /* @__PURE__ */ r.jsxs("div", { className: "flex-none truncate text-xs", children: [
    e ? /* @__PURE__ */ r.jsx("span", { className: "", children: e }) : null,
    e && n ? /* @__PURE__ */ r.jsx("span", { className: "mx-1", children: "·" }) : null,
    n ? /* @__PURE__ */ r.jsx("span", { className: "", children: n }) : null
  ] });
}
function _e({ breadcrumbs: e }) {
  return e?.length ? /* @__PURE__ */ r.jsx("div", { className: "min-w-0 truncate text-xs", children: e.map((n, l) => /* @__PURE__ */ r.jsxs("span", { children: [
    l > 0 ? /* @__PURE__ */ r.jsx("span", { className: "mx-1", children: ">" }) : null,
    /* @__PURE__ */ r.jsx("span", { className: "", children: n })
  ] }, `${n}-${l}`)) }) : null;
}
function Te({ meta: e }) {
  return e?.length ? /* @__PURE__ */ r.jsx("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-[#333]", children: e.map((n, l) => /* @__PURE__ */ r.jsx(
    "span",
    {
      className: "inline-flex items-center rounded border border-slate-200 bg-white px-3 py-1",
      children: n
    },
    `${n}-${l}`
  )) }) : null;
}
function Re(e) {
  const n = e.trim().toLowerCase();
  return n ? n === "google" ? "G" : e.trim().slice(0, 1).toUpperCase() : "";
}
function _({
  title: e,
  titleIcon: n,
  titleIconBgColor: l,
  source: s,
  className: a,
  titleClassName: o
}) {
  return !e && !n && !s ? null : /* @__PURE__ */ r.jsxs("div", { className: m("mb-2 flex min-w-0 items-center gap-2", a), children: [
    n ? l ? /* @__PURE__ */ r.jsx(
      "span",
      {
        className: "inline-flex h-6 w-6 flex-none items-center justify-center rounded-md text-white",
        style: { backgroundColor: l },
        children: n
      }
    ) : /* @__PURE__ */ r.jsx("span", { className: "flex-none", children: n }) : null,
    e ? /* @__PURE__ */ r.jsx(
      "div",
      {
        className: m(
          "min-w-0 text-xl font-semibold cursor-pointer hover:underline hover:underline-offset-2 group-hover:underline group-hover:underline-offset-2",
          o
        ),
        children: e
      }
    ) : null,
    s ? /* @__PURE__ */ r.jsx(
      "span",
      {
        className: "inline-flex h-6 w-6 flex-none items-center justify-center rounded-md",
        title: s,
        children: Re(s)
      }
    ) : null
  ] });
}
function Ae({
  href: e,
  target: n,
  rel: l,
  onClick: s,
  children: a
}) {
  return e ? /* @__PURE__ */ r.jsx(
    "a",
    {
      href: e,
      target: n,
      rel: T(l, n),
      onClick: () => s?.(),
      className: "group flex w-full min-w-0 items-center gap-2",
      children: a
    }
  ) : s ? /* @__PURE__ */ r.jsx(
    "button",
    {
      type: "button",
      onClick: s,
      className: "group flex w-full min-w-0 items-center gap-2 text-left",
      children: a
    }
  ) : /* @__PURE__ */ r.jsx("div", { className: "flex w-full min-w-0 items-center gap-2", children: a });
}
function ke(e) {
  switch (e) {
    case "doc":
    case "word":
      return "bg-[#027FFE] text-white";
    case "pdf":
      return "bg-[#E02E2E] text-white";
    default:
      return "bg-slate-100 text-slate-700";
  }
}
function Ce(e) {
  switch (e) {
    case "xls":
      return /* @__PURE__ */ r.jsx(de, { className: "h-5 w-5" });
    case "ppt":
      return /* @__PURE__ */ r.jsx(fe, { className: "h-5 w-5" });
    case "pdf":
    case "doc":
    case "word":
    case "text":
      return /* @__PURE__ */ r.jsx(ue, { className: "h-5 w-5" });
    default:
      return /* @__PURE__ */ r.jsx(ce, { className: "h-5 w-5" });
  }
}
function V({
  fileType: e,
  typeIcon: n
}) {
  return n ? /* @__PURE__ */ r.jsx("span", { className: "inline-flex h-6 w-6 items-center justify-center", children: n }) : e ? /* @__PURE__ */ r.jsx(
    "span",
    {
      className: m(
        "inline-flex h-6 w-6 items-center justify-center rounded-md",
        ke(e)
      ),
      children: Ce(e)
    }
  ) : null;
}
function Se({
  item: e,
  onItemClick: n
}) {
  const l = e.typeIcon ? /* @__PURE__ */ r.jsx(V, { typeIcon: e.typeIcon }) : e.fileType ? /* @__PURE__ */ r.jsx(V, { fileType: e.fileType }) : null;
  return /* @__PURE__ */ r.jsxs("div", { className: "w-full py-2", children: [
    /* @__PURE__ */ r.jsx("div", { className: "flex min-w-0 items-center gap-2", children: /* @__PURE__ */ r.jsx(
      Ae,
      {
        href: e.href,
        target: e.target,
        rel: e.rel,
        onClick: () => {
          e.onClick?.(), n?.(e);
        },
        children: /* @__PURE__ */ r.jsx(
          _,
          {
            className: "mb-0 w-full",
            title: e.title,
            titleIcon: l,
            source: e.source,
            titleClassName: "truncate text-[#1A0CAB]"
          }
        )
      }
    ) }),
    /* @__PURE__ */ r.jsxs("div", { className: "mt-2 flex gap-3", children: [
      e.thumbnailUrl ? /* @__PURE__ */ r.jsx(
        "img",
        {
          src: e.thumbnailUrl,
          alt: e.thumbnailAlt ?? e.title,
          className: "h-[90px] w-[160px] flex-none rounded-lg object-cover ring-1 ring-slate-200",
          loading: "lazy"
        }
      ) : /* @__PURE__ */ r.jsx("div", { className: "h-[90px] w-[160px] flex-none rounded-lg bg-slate-100 ring-1 ring-slate-200" }),
      /* @__PURE__ */ r.jsxs("div", { className: "min-w-0 flex-1 flex flex-col justify-between", children: [
        e.description ? /* @__PURE__ */ r.jsx("div", { className: "line-clamp-2 text-sm text-[#666]", children: e.description }) : null,
        e.breadcrumbs?.length || e.author || e.date ? /* @__PURE__ */ r.jsxs("div", { className: "mt-2 flex min-w-0 items-center gap-3 text-[#666]", children: [
          /* @__PURE__ */ r.jsx(_e, { breadcrumbs: e.breadcrumbs }),
          /* @__PURE__ */ r.jsx("span", { className: "h-3 w-px flex-none bg-[#666]", "aria-hidden": "true" }),
          /* @__PURE__ */ r.jsxs("div", { className: "flex flex-none items-center gap-2", children: [
            /* @__PURE__ */ r.jsx(Ee, { author: e.author, date: e.date }),
            e.href ? /* @__PURE__ */ r.jsx(
              "a",
              {
                href: e.href,
                target: e.target,
                rel: T(e.rel, e.target),
                className: "flex-none text-[#007EFF] hover:text-[#007EFF]",
                children: /* @__PURE__ */ r.jsx(me, { className: "h-3 w-3" })
              }
            ) : null
          ] })
        ] }) : /* @__PURE__ */ r.jsx(Te, { meta: e.meta })
      ] })
    ] })
  ] });
}
function Ie({ text: e }) {
  return /* @__PURE__ */ r.jsx("span", { className: "inline-flex items-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-700", children: e });
}
function Oe({
  item: e,
  onItemClick: n
}) {
  const l = [e.sourceLabel, e.categoryLabel].filter(Boolean);
  return /* @__PURE__ */ r.jsxs(
    J,
    {
      href: e.href,
      target: e.target,
      rel: e.rel,
      onClick: () => {
        e.onClick?.(), n?.(e);
      },
      className: m(
        "group w-full rounded-xl bg-white text-left transition",
        "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      ),
      children: [
        /* @__PURE__ */ r.jsx("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200", children: /* @__PURE__ */ r.jsxs("div", { className: "relative aspect-4/3 bg-slate-100", children: [
          /* @__PURE__ */ r.jsx(
            "img",
            {
              src: e.thumbnailUrl,
              alt: e.thumbnailAlt ?? e.title,
              className: "absolute inset-0 h-full w-full object-cover",
              loading: "lazy"
            }
          ),
          e.mediaType === "video" ? /* @__PURE__ */ r.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ r.jsx("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30", children: /* @__PURE__ */ r.jsx(xe, { className: "h-5 w-5 translate-x-px" }) }) }) : null
        ] }) }),
        /* @__PURE__ */ r.jsxs("div", { className: "mt-2", children: [
          /* @__PURE__ */ r.jsx("div", { className: "truncate text-sm font-medium", children: e.title }),
          e.matchCountText ? /* @__PURE__ */ r.jsx("div", { className: "mt-1 truncate text-xs text-[#666]", children: e.matchCountText }) : null,
          l.length ? /* @__PURE__ */ r.jsx("div", { className: "mt-2 flex flex-wrap gap-2", children: l.map((s) => /* @__PURE__ */ r.jsx(Ie, { text: s }, s)) }) : null
        ] })
      ]
    }
  );
}
function Pe({
  action: e,
  className: n
}) {
  const l = m(
    "flex-none inline-flex items-center justify-center rounded-full border border-slate-200 bg-white",
    "h-9 px-12 text-sm font-medium text-slate-700 no-underline transition",
    "hover:border-slate-300 hover:bg-slate-50 hover:no-underline",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    n
  );
  return e.href ? /* @__PURE__ */ r.jsx(
    "a",
    {
      className: l,
      href: e.href,
      target: e.target,
      rel: T(e.rel, e.target),
      onClick: () => e.onClick?.(),
      children: e.label
    }
  ) : /* @__PURE__ */ r.jsx("button", { className: l, type: "button", onClick: e.onClick, children: e.label });
}
function O({ action: e }) {
  return e ? /* @__PURE__ */ r.jsxs("div", { className: "mt-3 flex w-full items-center", children: [
    /* @__PURE__ */ r.jsx("span", { className: "h-px flex-1 bg-[#E8E8E8]", "aria-hidden": "true" }),
    /* @__PURE__ */ r.jsx(
      Pe,
      {
        action: e,
        className: m(
          "rounded-full border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#333] transition",
          "hover:border-[#E8E8E8] hover:bg-[#F5F5F5]"
        )
      }
    ),
    /* @__PURE__ */ r.jsx("span", { className: "h-px flex-1 bg-[#E8E8E8]", "aria-hidden": "true" })
  ] }) : null;
}
function Fe(e, n) {
  if (e.layout === "list")
    return /* @__PURE__ */ r.jsxs("div", { className: m("space-y-6", e.className), children: [
      /* @__PURE__ */ r.jsx(
        _,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      e.items.map((a) => /* @__PURE__ */ r.jsx(Se, { item: a, onItemClick: n }, a.id)),
      /* @__PURE__ */ r.jsx(O, { action: e.footerAction })
    ] });
  if (e.layout === "mediaGrid") {
    const a = e.columns ?? 3, o = a === 2 ? "grid-cols-2" : a === 4 ? "grid-cols-4" : "grid-cols-3";
    return /* @__PURE__ */ r.jsxs("div", { className: m(e.className), children: [
      /* @__PURE__ */ r.jsx(
        _,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      /* @__PURE__ */ r.jsx("div", { className: m("grid gap-3", o), children: e.items.map((d) => /* @__PURE__ */ r.jsx(Oe, { item: d, onItemClick: n }, d.id)) }),
      /* @__PURE__ */ r.jsx(O, { action: e.footerAction })
    ] });
  }
  const l = e.columns ?? 3, s = l === 2 ? "grid-cols-2" : l === 4 ? "grid-cols-4" : "grid-cols-3";
  return /* @__PURE__ */ r.jsxs("div", { className: m(e.className), children: [
    /* @__PURE__ */ r.jsx(
      _,
      {
        title: e.title,
        titleIcon: e.titleIcon,
        titleIconBgColor: e.titleIconBgColor,
        titleClassName: e.titleClassName
      }
    ),
    /* @__PURE__ */ r.jsx("div", { className: m("grid gap-3", s), children: e.items.map((a) => /* @__PURE__ */ r.jsx(we, { item: a, onItemClick: n }, a.id)) }),
    /* @__PURE__ */ r.jsx(O, { action: e.footerAction })
  ] });
}
function Ye({
  sections: e,
  items: n,
  records: l,
  imageGridColumns: s,
  className: a,
  onItemClick: o
}) {
  const d = n ?? (l?.length ? ye(l) : void 0), x = e ?? (d?.length ? be(d, s) : []);
  return /* @__PURE__ */ r.jsx("div", { className: m("space-y-5", a), children: x.map((p, g) => /* @__PURE__ */ r.jsx(q.Fragment, { children: Fe(p, o) }, `${p.type}-${g}`)) });
}
export {
  Ye as default
};
