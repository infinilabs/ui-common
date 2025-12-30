(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-leading:initial;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-sky-400:oklch(74.6% .16 232.661);--color-sky-600:oklch(58.8% .158 241.966);--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-400:oklch(70.4% .04 256.788);--color-slate-600:oklch(44.6% .043 257.281);--color-slate-700:oklch(37.2% .044 257.287);--color-slate-800:oklch(27.9% .041 260.031);--color-slate-900:oklch(20.8% .042 265.755);--color-slate-950:oklch(12.9% .042 264.695);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-3xl:48rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--font-weight-medium:500;--font-weight-semibold:600;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--aspect-video:16/9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::-moz-placeholder{opacity:1}::placeholder{opacity:1}@supports (not (-webkit-appearance:-apple-pay-button)) or (contain-intrinsic-size:1px){::-moz-placeholder{color:currentColor}::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::-moz-placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.inset-0{inset:calc(var(--spacing)*0)}.mx-1{margin-inline:calc(var(--spacing)*1)}.mx-auto{margin-inline:auto}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-3{margin-top:calc(var(--spacing)*3)}.mb-0{margin-bottom:calc(var(--spacing)*0)}.mb-1{margin-bottom:calc(var(--spacing)*1)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.flex{display:flex}.grid{display:grid}.inline-flex{display:inline-flex}.aspect-4\\/3{aspect-ratio:4/3}.aspect-video{aspect-ratio:var(--aspect-video)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-9{height:calc(var(--spacing)*9)}.h-10{height:calc(var(--spacing)*10)}.h-\\[90px\\]{height:90px}.h-full{height:100%}.h-px{height:1px}.min-h-screen{min-height:100vh}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-10{width:calc(var(--spacing)*10)}.w-\\[160px\\]{width:160px}.w-full{width:100%}.w-px{width:1px}.max-w-3xl{max-width:var(--container-3xl)}.min-w-0{min-width:calc(var(--spacing)*0)}.flex-1{flex:1}.flex-none{flex:none}.translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x)var(--tw-translate-y)}.cursor-pointer{cursor:pointer}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.justify-end{justify-content:flex-end}.gap-2{gap:calc(var(--spacing)*2)}.gap-3{gap:calc(var(--spacing)*3)}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*6)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*6)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-10>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*10)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*10)*calc(1 - var(--tw-space-y-reverse)))}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-sm{border-radius:var(--radius-sm)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-slate-200{border-color:var(--color-slate-200)}.border-slate-700{border-color:var(--color-slate-700)}.border-transparent{border-color:#0000}.bg-\\[\\#027FFE\\]{background-color:#027ffe}.bg-\\[\\#E02E2E\\]{background-color:#e02e2e}.bg-black\\/55{background-color:#0000008c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/55{background-color:color-mix(in oklab,var(--color-black)55%,transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-slate-200{background-color:var(--color-slate-200)}.bg-slate-300{background-color:var(--color-slate-300)}.bg-slate-900{background-color:var(--color-slate-900)}.bg-slate-950{background-color:var(--color-slate-950)}.bg-white{background-color:var(--color-white)}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-2{padding:calc(var(--spacing)*2)}.p-6{padding:calc(var(--spacing)*6)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-12{padding-inline:calc(var(--spacing)*12)}.py-1{padding-block:calc(var(--spacing)*1)}.py-1\\.5{padding-block:calc(var(--spacing)*1.5)}.py-2{padding-block:calc(var(--spacing)*2)}.text-left{text-align:left}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.leading-6{--tw-leading:calc(var(--spacing)*6);line-height:calc(var(--spacing)*6)}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-\\[\\#1A0CAB\\]{color:#1a0cab}.text-\\[\\#333\\]{color:#333}.text-\\[\\#666\\]{color:#666}.text-sky-600{color:var(--color-sky-600)}.text-slate-100{color:var(--color-slate-100)}.text-slate-200{color:var(--color-slate-200)}.text-slate-600{color:var(--color-slate-600)}.text-slate-700{color:var(--color-slate-700)}.text-slate-900{color:var(--color-slate-900)}.text-white{color:var(--color-white)}.no-underline{text-decoration-line:none}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-slate-200{--tw-ring-color:var(--color-slate-200)}.ring-white\\/30{--tw-ring-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.ring-white\\/30{--tw-ring-color:color-mix(in oklab,var(--color-white)30%,transparent)}}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.transition-colors{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media(hover:hover){.group-hover\\:underline:is(:where(.group):hover *){text-decoration-line:underline}.group-hover\\:underline-offset-2:is(:where(.group):hover *){text-underline-offset:2px}.hover\\:border-slate-200:hover{border-color:var(--color-slate-200)}.hover\\:border-slate-300:hover{border-color:var(--color-slate-300)}.hover\\:bg-slate-50:hover{background-color:var(--color-slate-50)}.hover\\:bg-slate-100\\/70:hover{background-color:#f1f5f9b3}@supports (color:color-mix(in lab,red,red)){.hover\\:bg-slate-100\\/70:hover{background-color:color-mix(in oklab,var(--color-slate-100)70%,transparent)}}.hover\\:bg-slate-800:hover{background-color:var(--color-slate-800)}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:underline-offset-2:hover{text-underline-offset:2px}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-slate-300:focus-visible{--tw-ring-color:var(--color-slate-300)}.focus-visible\\:ring-slate-600:focus-visible{--tw-ring-color:var(--color-slate-600)}.dark\\:border-slate-700:where(.dark,.dark *){border-color:var(--color-slate-700)}.dark\\:bg-slate-700:where(.dark,.dark *){background-color:var(--color-slate-700)}.dark\\:bg-slate-800:where(.dark,.dark *){background-color:var(--color-slate-800)}.dark\\:bg-slate-900:where(.dark,.dark *){background-color:var(--color-slate-900)}.dark\\:text-\\[\\#8AB4F8\\]:where(.dark,.dark *){color:#8ab4f8}.dark\\:text-sky-400:where(.dark,.dark *){color:var(--color-sky-400)}.dark\\:text-slate-100:where(.dark,.dark *){color:var(--color-slate-100)}.dark\\:text-slate-200:where(.dark,.dark *){color:var(--color-slate-200)}.dark\\:text-slate-300:where(.dark,.dark *){color:var(--color-slate-300)}.dark\\:text-slate-400:where(.dark,.dark *){color:var(--color-slate-400)}.dark\\:ring-slate-700:where(.dark,.dark *){--tw-ring-color:var(--color-slate-700)}@media(hover:hover){.dark\\:hover\\:border-slate-600:where(.dark,.dark *):hover{border-color:var(--color-slate-600)}.dark\\:hover\\:border-slate-700:where(.dark,.dark *):hover{border-color:var(--color-slate-700)}.dark\\:hover\\:bg-slate-800:where(.dark,.dark *):hover{background-color:var(--color-slate-800)}.dark\\:hover\\:bg-slate-800\\/60:where(.dark,.dark *):hover{background-color:#1d293d99}@supports (color:color-mix(in lab,red,red)){.dark\\:hover\\:bg-slate-800\\/60:where(.dark,.dark *):hover{background-color:color-mix(in oklab,var(--color-slate-800)60%,transparent)}}}.dark\\:focus-visible\\:ring-slate-600:where(.dark,.dark *):focus-visible{--tw-ring-color:var(--color-slate-600)}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-leading{syntax:"*";inherits:false}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { jsx as a, jsxs as o } from "react/jsx-runtime";
import c from "clsx";
import { File as B, FileText as G, Presentation as T, FileSpreadsheet as F, ExternalLink as L, Play as S, Image as N, Video as U } from "lucide-react";
function b({ breadcrumbs: e }) {
  return e?.length ? /* @__PURE__ */ a("div", { className: "min-w-0 truncate text-xs", children: e.map((t, r) => /* @__PURE__ */ o("span", { children: [
    r > 0 ? /* @__PURE__ */ a("span", { className: "mx-1", children: ">" }) : null,
    /* @__PURE__ */ a("span", { className: "", children: t })
  ] }, `${t}-${r}`)) }) : null;
}
function A(e, t) {
  const r = t === "_blank" ? "noreferrer noopener" : "";
  return e ? r ? [...new Set([...e.split(" "), ...r.split(" ")].filter(Boolean))].join(" ") : e : r || void 0;
}
function v({
  href: e,
  target: t,
  rel: r,
  onClick: l,
  className: i,
  children: s
}) {
  const n = i ? `${i} cursor-pointer` : "cursor-pointer";
  return e ? /* @__PURE__ */ a(
    "a",
    {
      href: e,
      target: t,
      rel: A(r, t),
      className: n,
      onClick: () => l?.(),
      children: s
    }
  ) : /* @__PURE__ */ a("button", { type: "button", className: n, onClick: l, children: s });
}
function _({
  item: e,
  onItemClick: t
}) {
  const r = e.onClick ? void 0 : e.href, l = e.breadcrumbs ?? [];
  return /* @__PURE__ */ o(
    v,
    {
      href: r,
      target: e.target,
      rel: e.rel,
      onClick: () => {
        e.onClick?.(), t?.(e);
      },
      className: c(
        "group block w-full rounded-xl border border-transparent p-2 text-left no-underline transition-colors",
        "hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:focus-visible:ring-slate-600"
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200 dark:ring-slate-700", children: /* @__PURE__ */ a("div", { className: "relative aspect-video bg-slate-100 dark:bg-slate-800", children: /* @__PURE__ */ a(
          "img",
          {
            src: e.imageUrl,
            alt: e.imageAlt ?? e.title,
            className: "absolute inset-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ) }) }),
        /* @__PURE__ */ o("div", { className: "mt-2", children: [
          /* @__PURE__ */ a("div", { className: "truncate text-sm font-semibold text-slate-900 dark:text-slate-100", children: e.title }),
          e.subtitle ? /* @__PURE__ */ a("div", { className: "mt-1 truncate text-sm text-slate-600 dark:text-slate-300", children: e.subtitle }) : null,
          l.length ? /* @__PURE__ */ a("div", { className: "mt-2 text-slate-600 dark:text-slate-300", children: /* @__PURE__ */ a(b, { breadcrumbs: l }) }) : null
        ] })
      ]
    }
  );
}
function $({ author: e, date: t }) {
  return !e && !t ? null : /* @__PURE__ */ o("div", { className: "flex-none truncate text-xs", children: [
    e ? /* @__PURE__ */ a("span", { className: "", children: e }) : null,
    e && t ? /* @__PURE__ */ a("span", { className: "mx-1", children: "·" }) : null,
    t ? /* @__PURE__ */ a("span", { className: "", children: t }) : null
  ] });
}
function z({ meta: e }) {
  return e?.length ? /* @__PURE__ */ a("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-200", children: e.map((t, r) => /* @__PURE__ */ a(
    "span",
    {
      className: "inline-flex items-center rounded border border-slate-200 bg-white px-3 py-1 dark:border-slate-700 dark:bg-slate-900",
      children: t
    },
    `${t}-${r}`
  )) }) : null;
}
function E(e) {
  const t = e.trim().toLowerCase();
  return t ? t === "google" ? "G" : e.trim().slice(0, 1).toUpperCase() : "";
}
function g({
  title: e,
  titleIcon: t,
  titleIconBgColor: r,
  source: l,
  className: i,
  titleClassName: s
}) {
  return !e && !t && !l ? null : /* @__PURE__ */ o("div", { className: c("mb-2 flex min-w-0 items-center gap-2", i), children: [
    t ? /* @__PURE__ */ a(
      "span",
      {
        className: c(
          "inline-flex h-6 w-6 flex-none items-center justify-center",
          r && "rounded-md text-white"
        ),
        style: r ? { backgroundColor: r } : void 0,
        children: t
      }
    ) : null,
    e ? /* @__PURE__ */ a(
      "div",
      {
        className: c(
          "min-w-0 cursor-pointer text-xl font-semibold leading-6 hover:underline hover:underline-offset-2 group-hover:underline group-hover:underline-offset-2",
          s
        ),
        children: e
      }
    ) : null,
    l ? /* @__PURE__ */ a(
      "span",
      {
        className: "inline-flex h-6 w-6 flex-none items-center justify-center rounded-md bg-slate-100 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200",
        title: l,
        children: E(l)
      }
    ) : null
  ] });
}
function M(e) {
  switch (e) {
    case "doc":
    case "word":
      return "bg-[#027FFE] text-white";
    case "pdf":
      return "bg-[#E02E2E] text-white";
    default:
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";
  }
}
function H(e) {
  switch (e) {
    case "xls":
      return /* @__PURE__ */ a(F, { className: "h-5 w-5" });
    case "ppt":
      return /* @__PURE__ */ a(T, { className: "h-5 w-5" });
    case "pdf":
    case "doc":
    case "word":
    case "text":
      return /* @__PURE__ */ a(G, { className: "h-5 w-5" });
    default:
      return /* @__PURE__ */ a(B, { className: "h-5 w-5" });
  }
}
function k({
  fileType: e,
  typeIcon: t
}) {
  return t ? /* @__PURE__ */ a("span", { className: "inline-flex h-6 w-6 items-center justify-center", children: t }) : e ? /* @__PURE__ */ a(
    "span",
    {
      className: c(
        "inline-flex h-6 w-6 items-center justify-center rounded-md",
        M(e)
      ),
      children: H(e)
    }
  ) : null;
}
function D({
  item: e,
  onItemClick: t
}) {
  const r = e.typeIcon ? /* @__PURE__ */ a(k, { typeIcon: e.typeIcon }) : e.fileType ? /* @__PURE__ */ a(k, { fileType: e.fileType }) : null, l = e.onClick || t ? () => {
    e.onClick?.(), t?.(e);
  } : void 0, i = e.onClick ? void 0 : e.href, s = /* @__PURE__ */ o("div", { className: "w-full py-2", children: [
    /* @__PURE__ */ a("div", { className: "flex min-w-0 items-center gap-2", children: /* @__PURE__ */ a(
      g,
      {
        className: "mb-0 w-full",
        title: e.title,
        titleIcon: r,
        source: e.source,
        titleClassName: "truncate text-[#1A0CAB] dark:text-[#8AB4F8]"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "mt-2 flex gap-3", children: [
      e.thumbnailUrl ? /* @__PURE__ */ a(
        "img",
        {
          src: e.thumbnailUrl,
          alt: e.thumbnailAlt ?? e.title,
          className: "h-[90px] w-[160px] flex-none rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700",
          loading: "lazy"
        }
      ) : null,
      /* @__PURE__ */ o("div", { className: "min-w-0 flex-1 flex flex-col justify-between", children: [
        e.description ? /* @__PURE__ */ a("div", { className: "line-clamp-2 text-sm text-slate-600 dark:text-slate-400", children: e.description }) : null,
        e.breadcrumbs?.length || e.author || e.date ? /* @__PURE__ */ o("div", { className: "mt-2 flex min-w-0 items-center gap-3 text-[#666] dark:text-slate-400", children: [
          /* @__PURE__ */ a(b, { breadcrumbs: e.breadcrumbs }),
          /* @__PURE__ */ a("span", { className: "h-3 w-px flex-none bg-slate-300 dark:bg-slate-700", "aria-hidden": "true" }),
          /* @__PURE__ */ o("div", { className: "flex flex-none items-center gap-2", children: [
            /* @__PURE__ */ a($, { author: e.author, date: e.date }),
            e.href ? /* @__PURE__ */ a("span", { className: "flex-none text-sky-600 dark:text-sky-400", children: /* @__PURE__ */ a(L, { className: "h-3 w-3" }) }) : null
          ] })
        ] }) : /* @__PURE__ */ a(z, { meta: e.meta })
      ] })
    ] })
  ] });
  return !i && !l ? s : /* @__PURE__ */ a(
    v,
    {
      href: i,
      target: e.target,
      rel: e.rel,
      onClick: l,
      className: c(
        "group block w-full rounded-xl border border-transparent px-3 py-2 text-left no-underline transition-colors",
        "hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:focus-visible:ring-slate-600"
      ),
      children: s
    }
  );
}
function V({
  item: e,
  onItemClick: t
}) {
  const r = e.breadcrumbs ?? [e.sourceLabel, e.categoryLabel].filter(Boolean), l = e.onClick ? void 0 : e.href;
  return /* @__PURE__ */ o(
    v,
    {
      href: l,
      target: e.target,
      rel: e.rel,
      onClick: () => {
        e.onClick?.(), t?.(e);
      },
      className: c(
        "group block w-full rounded-xl border border-transparent p-2 text-left no-underline transition-colors",
        "hover:border-slate-200 hover:bg-slate-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
        "dark:hover:border-slate-700 dark:hover:bg-slate-800/60 dark:focus-visible:ring-slate-600"
      ),
      children: [
        /* @__PURE__ */ a("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200 dark:ring-slate-700", children: /* @__PURE__ */ o("div", { className: "relative aspect-4/3 bg-slate-100 dark:bg-slate-800", children: [
          /* @__PURE__ */ a(
            "img",
            {
              src: e.thumbnailUrl,
              alt: e.thumbnailAlt ?? e.title,
              className: "absolute inset-0 h-full w-full object-cover",
              loading: "lazy"
            }
          ),
          e.mediaType === "video" ? /* @__PURE__ */ a("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ a("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30", children: /* @__PURE__ */ a(S, { className: "h-5 w-5 translate-x-px" }) }) }) : null
        ] }) }),
        /* @__PURE__ */ o("div", { className: "mt-2", children: [
          /* @__PURE__ */ a("div", { className: "mb-1 truncate text-sm font-medium text-[#333] dark:text-slate-100", children: e.title }),
          e.matchCountText ? /* @__PURE__ */ a("div", { className: "mb-1 truncate text-xs text-[#666] dark:text-slate-400", children: e.matchCountText }) : null,
          r.length ? /* @__PURE__ */ o("div", { className: "text-[#666] dark:text-slate-400", children: [
            /* @__PURE__ */ a(b, { breadcrumbs: r }),
            " "
          ] }) : null
        ] })
      ]
    }
  );
}
function P({
  action: e,
  className: t
}) {
  const r = c(
    "flex-none inline-flex items-center justify-center rounded-full border border-slate-200 bg-white",
    "h-9 px-12 text-sm font-medium text-slate-700 no-underline transition",
    "cursor-pointer hover:border-slate-300 hover:bg-slate-50 hover:no-underline",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:focus-visible:ring-slate-600",
    t
  );
  return e.href ? /* @__PURE__ */ a(
    "a",
    {
      className: r,
      href: e.href,
      target: e.target,
      rel: A(e.rel, e.target),
      onClick: () => e.onClick?.(),
      children: e.label
    }
  ) : /* @__PURE__ */ a("button", { className: r, type: "button", onClick: e.onClick, children: e.label });
}
function h({ action: e }) {
  return e ? /* @__PURE__ */ o("div", { className: "mt-3 flex w-full items-center", children: [
    /* @__PURE__ */ a("span", { className: "h-px flex-1 bg-slate-200 dark:bg-slate-700", "aria-hidden": "true" }),
    /* @__PURE__ */ a(
      P,
      {
        action: e,
        className: c("px-4")
      }
    ),
    /* @__PURE__ */ a("span", { className: "h-px flex-1 bg-slate-200 dark:bg-slate-700", "aria-hidden": "true" })
  ] }) : null;
}
function O(e, t) {
  if (e.layout === "list")
    return /* @__PURE__ */ o("div", { className: c("space-y-6", e.className), children: [
      /* @__PURE__ */ a(
        g,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      e.items.map((i) => /* @__PURE__ */ a(D, { item: i, onItemClick: t }, i.id)),
      /* @__PURE__ */ a(h, { action: e.footerAction })
    ] });
  if (e.layout === "mediaGrid") {
    const i = e.columns ?? 3, s = i === 2 ? "grid-cols-2" : i === 4 ? "grid-cols-4" : "grid-cols-3";
    return /* @__PURE__ */ o("div", { className: c(e.className), children: [
      /* @__PURE__ */ a(
        g,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      /* @__PURE__ */ a("div", { className: c("grid gap-3", s), children: e.items.map((n) => /* @__PURE__ */ a(V, { item: n, onItemClick: t }, n.id)) }),
      /* @__PURE__ */ a(h, { action: e.footerAction })
    ] });
  }
  const r = e.columns ?? 3, l = r === 2 ? "grid-cols-2" : r === 4 ? "grid-cols-4" : "grid-cols-3";
  return /* @__PURE__ */ o("div", { className: c(e.className), children: [
    /* @__PURE__ */ a(
      g,
      {
        title: e.title,
        titleIcon: e.titleIcon,
        titleIconBgColor: e.titleIconBgColor,
        titleClassName: e.titleClassName
      }
    ),
    /* @__PURE__ */ a("div", { className: c("grid gap-3", l), children: e.items.map((i) => /* @__PURE__ */ a(_, { item: i, onItemClick: t }, i.id)) }),
    /* @__PURE__ */ a(h, { action: e.footerAction })
  ] });
}
function q(e) {
  if (!e) return;
  const t = new Date(e);
  return Number.isNaN(t.getTime()) ? e : t.toISOString().slice(0, 10);
}
function J(e) {
  const t = e?.trim().toLowerCase();
  if (t)
    return t === "pdf" ? "pdf" : t === "doc" || t === "docx" || t === "word" ? "doc" : t === "ppt" || t === "pptx" ? "ppt" : t === "xls" || t === "xlsx" || t === "excel" ? "xls" : t === "link" || t === "url" || t === "html" ? "link" : t === "txt" || t === "text" ? "text" : "unknown";
}
function x(e, t, r) {
  const l = e.thumbnail ?? e.cover ?? e.metadata?.thumbnail_link, i = e.summary ?? e.content, s = J(e.metadata?.file_extension ?? e.type), n = e.source?.name, u = e.category ?? e.categories?.join(" / ") ?? "Categories", d = [n, u].filter(Boolean), m = e.last_updated_by?.user?.username ?? e.owner?.username, p = q(e.last_updated_by?.timestamp ?? e.metadata?.last_reviewed), f = e.metadata?.icon_link ?? e.icon, y = f ? /* @__PURE__ */ a("img", { src: f, alt: "", className: "h-5 w-5 rounded-sm object-contain" }) : void 0;
  return {
    type: "result",
    id: `${e.source?.id ?? e.url ?? e.title}-${t}`,
    title: e.title,
    href: e.url,
    description: i,
    thumbnailUrl: l,
    fileType: s,
    typeIcon: y,
    breadcrumbs: d.length ? d : void 0,
    author: m,
    date: p,
    onClick: r
  };
}
function C({
  section: e,
  className: t,
  theme: r,
  footerAction: l,
  onRecordClick: i,
  onItemClick: s
}) {
  const n = Q(I(e, i), l), u = K(r);
  return /* @__PURE__ */ a("div", { className: c(u === "dark" && "dark", t), children: O(n, s) });
}
function K(e) {
  if (e)
    return e === "light" ? "light" : e === "dark" || typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function Q(e, t) {
  return !t || e.footerAction ? e : e.layout === "list" ? { ...e, footerAction: t } : e.layout === "mediaGrid" ? { ...e, footerAction: t } : { ...e, footerAction: t };
}
function te(e) {
  return /* @__PURE__ */ a(C, { ...e });
}
function re(e) {
  return /* @__PURE__ */ a(C, { ...e });
}
function I(e, t) {
  if (Array.isArray(e)) return W(e, t);
  if (Y(e)) return e;
  const r = e;
  if (r.type === "imageGroup" && Array.isArray(r.items)) {
    const i = r;
    return i.items[0]?.type === "media" ? {
      type: "section",
      title: i.title,
      layout: "mediaGrid",
      items: i.items.filter(
        (n) => typeof n == "object" && !!n && n.type === "media"
      ),
      columns: i.columns,
      footerAction: i.footerAction,
      className: i.className
    } : {
      type: "section",
      title: i.title,
      layout: "imageGrid",
      items: i.items.filter(
        (n) => typeof n == "object" && !!n && n.type === "image"
      ),
      columns: i.columns,
      footerAction: i.footerAction,
      className: i.className
    };
  }
  if (r.type === "videoGroup" && Array.isArray(r.items)) {
    const i = r;
    return {
      type: "section",
      title: i.title,
      layout: "mediaGrid",
      items: i.items,
      columns: i.columns,
      footerAction: i.footerAction,
      className: i.className
    };
  }
  if (r.type === "result")
    return {
      type: "section",
      layout: "list",
      items: [e]
    };
  if (r.type === "media")
    return {
      type: "section",
      layout: "mediaGrid",
      items: [e]
    };
  if (r.type === "image" && typeof r.imageUrl == "string")
    return {
      type: "section",
      layout: "imageGrid",
      items: [e]
    };
  const l = typeof r.type == "string" ? r.type.trim().toLowerCase() : void 0;
  if (l === "image" || l === "video") {
    const i = typeof r.id == "string" ? r.id : void 0, s = typeof r.thumbnail == "string" ? r.thumbnail : typeof r.cover == "string" ? r.cover : typeof r.metadata == "object" && r.metadata && typeof r.metadata.thumbnail_link == "string" ? r.metadata.thumbnail_link : void 0;
    if (s) {
      const n = typeof r.category == "string" ? r.category : Array.isArray(r.categories) ? r.categories.filter((f) => typeof f == "string").join(" / ") : void 0, u = typeof r.title == "string" ? r.title : "Untitled", d = typeof r.url == "string" ? r.url : void 0, m = typeof r.source == "object" && r.source && typeof r.source.name == "string" ? r.source.name : void 0;
      return {
        type: "section",
        layout: "mediaGrid",
        items: [{
          type: "media",
          id: i ?? `${d ?? u}-0`,
          mediaType: l === "video" ? "video" : "image",
          title: u,
          href: t ? void 0 : d,
          thumbnailUrl: s,
          sourceLabel: m,
          categoryLabel: n,
          breadcrumbs: [m, n].filter(Boolean),
          ...t ? { onClick: () => t(e, 0) } : {}
        }]
      };
    }
  }
  return {
    type: "section",
    layout: "list",
    items: [
      x(
        e,
        0,
        t ? () => t(e, 0) : void 0
      )
    ]
  };
}
function W(e, t) {
  if (!e.length)
    return { type: "section", layout: "list", items: [] };
  if (e.every(j)) {
    if (e.every((s) => s.type === "result"))
      return { type: "section", layout: "list", items: e };
    if (e.every((s) => s.type === "media"))
      return { type: "section", layout: "mediaGrid", items: e };
    if (e.every((s) => s.type === "image" && "imageUrl" in s))
      return { type: "section", layout: "imageGrid", items: e };
    if (e.length === 1) return I(e[0], t);
  }
  const r = [], l = [];
  for (const [s, n] of e.entries()) {
    const u = X(n, s, t);
    u ? r.push(u) : l.push(
      x(
        n,
        s,
        t ? () => t(n, s) : void 0
      )
    );
  }
  return r.length && !l.length ? { type: "section", title: w(e, (n) => n.category ?? n.source?.name), layout: "mediaGrid", items: r } : { type: "section", title: w(e, (s) => s.category ?? s.source?.name), layout: "list", items: l };
}
function j(e) {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return t.type === "result" || t.type === "media" || t.type === "imageGroup" || t.type === "videoGroup" || t.type === "image" && typeof e.imageUrl == "string";
}
function X(e, t, r) {
  const l = e, i = typeof l.type == "string" ? l.type.trim().toLowerCase() : void 0;
  if (i !== "image" && i !== "video") return;
  const s = typeof l.id == "string" ? l.id : void 0, n = typeof l.thumbnail == "string" ? l.thumbnail : typeof l.cover == "string" ? l.cover : typeof l.metadata == "object" && l.metadata && typeof l.metadata.thumbnail_link == "string" ? l.metadata.thumbnail_link : void 0;
  if (!n) return;
  const u = typeof l.category == "string" ? l.category : Array.isArray(l.categories) ? l.categories.filter((y) => typeof y == "string").join(" / ") : void 0, d = typeof l.title == "string" ? l.title : "Untitled", m = typeof l.url == "string" ? l.url : void 0, p = typeof l.source == "object" && l.source && typeof l.source.name == "string" ? l.source.name : void 0, f = !!r && !j(e);
  return {
    type: "media",
    id: s ?? `${m ?? d}-0`,
    mediaType: i === "video" ? "video" : "image",
    title: d,
    href: f ? void 0 : m,
    thumbnailUrl: n,
    sourceLabel: p,
    categoryLabel: u,
    breadcrumbs: [p, u].filter(Boolean),
    ...f ? { onClick: () => r(e, t) } : {}
  };
}
function w(e, t) {
  const r = e[0], l = t(r);
  if (l) {
    for (const i of e)
      if (t(i) !== l) return;
    return l;
  }
}
function Y(e) {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return t.type === "section" && (t.layout === "list" || t.layout === "imageGrid" || t.layout === "mediaGrid") && Array.isArray(t.items);
}
function le(e, t) {
  const r = [];
  for (const l of e) {
    const i = r.length ? r[r.length - 1] : void 0;
    if (l.type === "imageGroup") {
      l.items[0]?.type === "media" ? r.push({
        type: "section",
        title: l.title,
        titleIcon: /* @__PURE__ */ a(N, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB] dark:text-[#8AB4F8]",
        layout: "mediaGrid",
        items: l.items.filter((n) => n.type === "media"),
        columns: l.columns ?? t,
        footerAction: l.footerAction,
        className: l.className
      }) : r.push({
        type: "section",
        title: l.title,
        titleIcon: /* @__PURE__ */ a(N, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB] dark:text-[#8AB4F8]",
        layout: "imageGrid",
        items: l.items.filter((n) => n.type === "image"),
        columns: l.columns ?? t,
        footerAction: l.footerAction,
        className: l.className
      });
      continue;
    }
    if (l.type === "videoGroup") {
      r.push({
        type: "section",
        title: l.title,
        titleIcon: /* @__PURE__ */ a(U, { className: "h-4 w-4" }),
        titleIconBgColor: "#1784FC",
        titleClassName: "text-[#1A0CAB] dark:text-[#8AB4F8]",
        layout: "mediaGrid",
        items: l.items,
        columns: l.columns ?? t,
        footerAction: l.footerAction,
        className: l.className
      });
      continue;
    }
    if (l.type === "result") {
      if (i?.layout === "list") {
        i.items.push(l);
        continue;
      }
      r.push({
        type: "section",
        layout: "list",
        items: [l]
      });
      continue;
    }
    if (l.type === "media") {
      if (i?.layout === "mediaGrid") {
        i.items.push(l);
        continue;
      }
      r.push({
        type: "section",
        layout: "mediaGrid",
        ...t ? { columns: t } : {},
        items: [l]
      });
      continue;
    }
    if (i?.layout === "imageGrid") {
      i.items.push(l);
      continue;
    }
    r.push({
      type: "section",
      layout: "imageGrid",
      ...t ? { columns: t } : {},
      items: [l]
    });
  }
  return r;
}
function ae(e) {
  return e.map((t, r) => x(t, r));
}
export {
  te as SearchResultsImageGroup,
  re as SearchResultsVideoGroup,
  C as default,
  le as itemsToSections,
  ae as recordsToItems
};
