(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode('@layer properties{@supports ((-webkit-hyphens:none) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-translate-x:0;--tw-translate-y:0;--tw-translate-z:0;--tw-space-y-reverse:0;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000}}}@layer theme{:root,:host{--font-sans:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";--font-mono:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;--color-slate-50:oklch(98.4% .003 247.858);--color-slate-100:oklch(96.8% .007 247.896);--color-slate-200:oklch(92.9% .013 255.508);--color-slate-300:oklch(86.9% .022 252.894);--color-slate-700:oklch(37.2% .044 257.287);--color-black:#000;--color-white:#fff;--spacing:.25rem;--container-3xl:48rem;--text-xs:.75rem;--text-xs--line-height:calc(1/.75);--text-sm:.875rem;--text-sm--line-height:calc(1.25/.875);--text-xl:1.25rem;--text-xl--line-height:calc(1.75/1.25);--font-weight-medium:500;--font-weight-semibold:600;--radius-sm:.25rem;--radius-md:.375rem;--radius-lg:.5rem;--radius-xl:.75rem;--aspect-video:16/9;--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4,0,.2,1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:var(--default-mono-font-family,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::-moz-placeholder{opacity:1}::placeholder{opacity:1}@supports (not (-webkit-appearance:-apple-pay-button)) or (contain-intrinsic-size:1px){::-moz-placeholder{color:currentColor}::placeholder{color:currentColor}@supports (color:color-mix(in lab,red,red)){::-moz-placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}::placeholder{color:color-mix(in oklab,currentcolor 50%,transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){-webkit-appearance:button;-moz-appearance:button;appearance:button}::file-selector-button{-webkit-appearance:button;-moz-appearance:button;appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}}@layer components;@layer utilities{.absolute{position:absolute}.relative{position:relative}.inset-0{inset:calc(var(--spacing)*0)}.mx-1{margin-inline:calc(var(--spacing)*1)}.mx-auto{margin-inline:auto}.mt-1{margin-top:calc(var(--spacing)*1)}.mt-2{margin-top:calc(var(--spacing)*2)}.mt-3{margin-top:calc(var(--spacing)*3)}.mb-0{margin-bottom:calc(var(--spacing)*0)}.mb-2{margin-bottom:calc(var(--spacing)*2)}.line-clamp-2{-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden}.block{display:block}.flex{display:flex}.grid{display:grid}.inline-flex{display:inline-flex}.aspect-4\\/3{aspect-ratio:4/3}.aspect-video{aspect-ratio:var(--aspect-video)}.h-3{height:calc(var(--spacing)*3)}.h-4{height:calc(var(--spacing)*4)}.h-5{height:calc(var(--spacing)*5)}.h-6{height:calc(var(--spacing)*6)}.h-9{height:calc(var(--spacing)*9)}.h-10{height:calc(var(--spacing)*10)}.h-\\[90px\\]{height:90px}.h-full{height:100%}.h-px{height:1px}.min-h-screen{min-height:100vh}.w-3{width:calc(var(--spacing)*3)}.w-4{width:calc(var(--spacing)*4)}.w-5{width:calc(var(--spacing)*5)}.w-6{width:calc(var(--spacing)*6)}.w-10{width:calc(var(--spacing)*10)}.w-\\[160px\\]{width:160px}.w-full{width:100%}.w-px{width:1px}.max-w-3xl{max-width:var(--container-3xl)}.min-w-0{min-width:calc(var(--spacing)*0)}.flex-1{flex:1}.flex-none{flex:none}.translate-x-px{--tw-translate-x:1px;translate:var(--tw-translate-x)var(--tw-translate-y)}.cursor-pointer{cursor:pointer}.grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-cols-3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid-cols-4{grid-template-columns:repeat(4,minmax(0,1fr))}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.justify-between{justify-content:space-between}.justify-center{justify-content:center}.gap-2{gap:calc(var(--spacing)*2)}.gap-3{gap:calc(var(--spacing)*3)}:where(.space-y-6>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*6)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*6)*calc(1 - var(--tw-space-y-reverse)))}:where(.space-y-10>:not(:last-child)){--tw-space-y-reverse:0;margin-block-start:calc(calc(var(--spacing)*10)*var(--tw-space-y-reverse));margin-block-end:calc(calc(var(--spacing)*10)*calc(1 - var(--tw-space-y-reverse)))}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-hidden{overflow:hidden}.rounded{border-radius:.25rem}.rounded-full{border-radius:3.40282e38px}.rounded-lg{border-radius:var(--radius-lg)}.rounded-md{border-radius:var(--radius-md)}.rounded-sm{border-radius:var(--radius-sm)}.rounded-xl{border-radius:var(--radius-xl)}.border{border-style:var(--tw-border-style);border-width:1px}.border-\\[\\#E8E8E8\\]{border-color:#e8e8e8}.border-slate-200{border-color:var(--color-slate-200)}.bg-\\[\\#027FFE\\]{background-color:#027ffe}.bg-\\[\\#666\\]{background-color:#666}.bg-\\[\\#E02E2E\\]{background-color:#e02e2e}.bg-\\[\\#E8E8E8\\]{background-color:#e8e8e8}.bg-black\\/55{background-color:#0000008c}@supports (color:color-mix(in lab,red,red)){.bg-black\\/55{background-color:color-mix(in oklab,var(--color-black)55%,transparent)}}.bg-slate-50{background-color:var(--color-slate-50)}.bg-slate-100{background-color:var(--color-slate-100)}.bg-white{background-color:var(--color-white)}.object-contain{-o-object-fit:contain;object-fit:contain}.object-cover{-o-object-fit:cover;object-fit:cover}.p-6{padding:calc(var(--spacing)*6)}.px-2{padding-inline:calc(var(--spacing)*2)}.px-3{padding-inline:calc(var(--spacing)*3)}.px-4{padding-inline:calc(var(--spacing)*4)}.px-12{padding-inline:calc(var(--spacing)*12)}.py-1{padding-block:calc(var(--spacing)*1)}.py-2{padding-block:calc(var(--spacing)*2)}.text-left{text-align:left}.text-sm{font-size:var(--text-sm);line-height:var(--tw-leading,var(--text-sm--line-height))}.text-xl{font-size:var(--text-xl);line-height:var(--tw-leading,var(--text-xl--line-height))}.text-xs{font-size:var(--text-xs);line-height:var(--tw-leading,var(--text-xs--line-height))}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.font-semibold{--tw-font-weight:var(--font-weight-semibold);font-weight:var(--font-weight-semibold)}.text-\\[\\#1A0CAB\\]{color:#1a0cab}.text-\\[\\#007EFF\\]{color:#007eff}.text-\\[\\#333\\]{color:#333}.text-\\[\\#666\\]{color:#666}.text-slate-700{color:var(--color-slate-700)}.text-white{color:var(--color-white)}.no-underline{text-decoration-line:none}.ring-1{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(1px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.ring-slate-200{--tw-ring-color:var(--color-slate-200)}.ring-white\\/30{--tw-ring-color:#ffffff4d}@supports (color:color-mix(in lab,red,red)){.ring-white\\/30{--tw-ring-color:color-mix(in oklab,var(--color-white)30%,transparent)}}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}@media(hover:hover){.group-hover\\:underline:is(:where(.group):hover *){text-decoration-line:underline}.group-hover\\:underline-offset-2:is(:where(.group):hover *){text-underline-offset:2px}.hover\\:border-\\[\\#E8E8E8\\]:hover{border-color:#e8e8e8}.hover\\:border-slate-300:hover{border-color:var(--color-slate-300)}.hover\\:bg-\\[\\#F5F5F5\\]:hover{background-color:#f5f5f5}.hover\\:bg-slate-50:hover{background-color:var(--color-slate-50)}.hover\\:no-underline:hover{text-decoration-line:none}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:underline-offset-2:hover{text-underline-offset:2px}}.focus\\:outline-none:focus{--tw-outline-style:none;outline-style:none}.focus-visible\\:ring-2:focus-visible{--tw-ring-shadow:var(--tw-ring-inset,)0 0 0 calc(2px + var(--tw-ring-offset-width))var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow),var(--tw-inset-ring-shadow),var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow)}.focus-visible\\:ring-slate-300:focus-visible{--tw-ring-color:var(--color-slate-300)}}@property --tw-translate-x{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-y{syntax:"*";inherits:false;initial-value:0}@property --tw-translate-z{syntax:"*";inherits:false;initial-value:0}@property --tw-space-y-reverse{syntax:"*";inherits:false;initial-value:0}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}')),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
import { jsx as n, jsxs as o } from "react/jsx-runtime";
import c from "clsx";
import { File as F, FileText as k, Presentation as B, FileSpreadsheet as T, ExternalLink as E, Play as L, Image as x, Video as S } from "lucide-react";
function A(e, t) {
  const i = t === "_blank" ? "noreferrer noopener" : "";
  return e ? i ? [...new Set([...e.split(" "), ...i.split(" ")].filter(Boolean))].join(" ") : e : i || void 0;
}
function v({
  href: e,
  target: t,
  rel: i,
  onClick: r,
  className: l,
  children: s
}) {
  const a = l ? `${l} cursor-pointer` : "cursor-pointer";
  return e ? /* @__PURE__ */ n(
    "a",
    {
      href: e,
      target: t,
      rel: A(i, t),
      className: a,
      onClick: () => r?.(),
      children: s
    }
  ) : /* @__PURE__ */ n("button", { type: "button", className: a, onClick: r, children: s });
}
function U({
  item: e,
  onItemClick: t
}) {
  const i = e.onClick ? void 0 : e.href;
  return /* @__PURE__ */ o(
    v,
    {
      href: i,
      target: e.target,
      rel: e.rel,
      onClick: () => {
        e.onClick?.(), t?.(e);
      },
      className: c(
        "group w-full rounded-xl text-left transition",
        "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      ),
      children: [
        /* @__PURE__ */ n("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200", children: /* @__PURE__ */ n("div", { className: "relative aspect-video bg-slate-100", children: /* @__PURE__ */ n(
          "img",
          {
            src: e.imageUrl,
            alt: e.imageAlt ?? e.title,
            className: "absolute inset-0 h-full w-full object-cover",
            loading: "lazy"
          }
        ) }) }),
        /* @__PURE__ */ o("div", { className: "mt-2", children: [
          /* @__PURE__ */ n("div", { className: "truncate text-sm font-semibold text-[#333]", children: e.title }),
          e.subtitle ? /* @__PURE__ */ n("div", { className: "mt-1 truncate text-sm text-[#666]", children: e.subtitle }) : null
        ] })
      ]
    }
  );
}
function _({ author: e, date: t }) {
  return !e && !t ? null : /* @__PURE__ */ o("div", { className: "flex-none truncate text-xs", children: [
    e ? /* @__PURE__ */ n("span", { className: "", children: e }) : null,
    e && t ? /* @__PURE__ */ n("span", { className: "mx-1", children: "·" }) : null,
    t ? /* @__PURE__ */ n("span", { className: "", children: t }) : null
  ] });
}
function C({ breadcrumbs: e }) {
  return e?.length ? /* @__PURE__ */ n("div", { className: "min-w-0 truncate text-xs", children: e.map((t, i) => /* @__PURE__ */ o("span", { children: [
    i > 0 ? /* @__PURE__ */ n("span", { className: "mx-1", children: ">" }) : null,
    /* @__PURE__ */ n("span", { className: "", children: t })
  ] }, `${t}-${i}`)) }) : null;
}
function $({ meta: e }) {
  return e?.length ? /* @__PURE__ */ n("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-[#333]", children: e.map((t, i) => /* @__PURE__ */ n(
    "span",
    {
      className: "inline-flex items-center rounded border border-slate-200 bg-white px-3 py-1",
      children: t
    },
    `${t}-${i}`
  )) }) : null;
}
function z(e) {
  const t = e.trim().toLowerCase();
  return t ? t === "google" ? "G" : e.trim().slice(0, 1).toUpperCase() : "";
}
function y({
  title: e,
  titleIcon: t,
  titleIconBgColor: i,
  source: r,
  className: l,
  titleClassName: s
}) {
  return !e && !t && !r ? null : /* @__PURE__ */ o("div", { className: c("mb-2 flex min-w-0 items-center gap-2", l), children: [
    t ? i ? /* @__PURE__ */ n(
      "span",
      {
        className: "inline-flex h-6 w-6 flex-none items-center justify-center rounded-md text-white",
        style: { backgroundColor: i },
        children: t
      }
    ) : /* @__PURE__ */ n("span", { className: "flex-none", children: t }) : null,
    e ? /* @__PURE__ */ n(
      "div",
      {
        className: c(
          "min-w-0 text-xl font-semibold cursor-pointer hover:underline hover:underline-offset-2 group-hover:underline group-hover:underline-offset-2",
          s
        ),
        children: e
      }
    ) : null,
    r ? /* @__PURE__ */ n(
      "span",
      {
        className: "inline-flex h-6 w-6 flex-none items-center justify-center rounded-md",
        title: r,
        children: z(r)
      }
    ) : null
  ] });
}
function H(e) {
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
function D(e) {
  switch (e) {
    case "xls":
      return /* @__PURE__ */ n(T, { className: "h-5 w-5" });
    case "ppt":
      return /* @__PURE__ */ n(B, { className: "h-5 w-5" });
    case "pdf":
    case "doc":
    case "word":
    case "text":
      return /* @__PURE__ */ n(k, { className: "h-5 w-5" });
    default:
      return /* @__PURE__ */ n(F, { className: "h-5 w-5" });
  }
}
function N({
  fileType: e,
  typeIcon: t
}) {
  return t ? /* @__PURE__ */ n("span", { className: "inline-flex h-6 w-6 items-center justify-center", children: t }) : e ? /* @__PURE__ */ n(
    "span",
    {
      className: c(
        "inline-flex h-6 w-6 items-center justify-center rounded-md",
        H(e)
      ),
      children: D(e)
    }
  ) : null;
}
function M({
  item: e,
  onItemClick: t
}) {
  const i = e.typeIcon ? /* @__PURE__ */ n(N, { typeIcon: e.typeIcon }) : e.fileType ? /* @__PURE__ */ n(N, { fileType: e.fileType }) : null, r = e.onClick || t ? () => {
    e.onClick?.(), t?.(e);
  } : void 0, l = e.onClick ? void 0 : e.href, s = /* @__PURE__ */ o("div", { className: "w-full py-2", children: [
    /* @__PURE__ */ n("div", { className: "flex min-w-0 items-center gap-2", children: /* @__PURE__ */ n(
      y,
      {
        className: "mb-0 w-full",
        title: e.title,
        titleIcon: i,
        source: e.source,
        titleClassName: "truncate text-[#1A0CAB]"
      }
    ) }),
    /* @__PURE__ */ o("div", { className: "mt-2 flex gap-3", children: [
      e.thumbnailUrl ? /* @__PURE__ */ n(
        "img",
        {
          src: e.thumbnailUrl,
          alt: e.thumbnailAlt ?? e.title,
          className: "h-[90px] w-[160px] flex-none rounded-lg object-cover ring-1 ring-slate-200",
          loading: "lazy"
        }
      ) : /* @__PURE__ */ n("div", { className: "h-[90px] w-[160px] flex-none rounded-lg bg-slate-100 ring-1 ring-slate-200" }),
      /* @__PURE__ */ o("div", { className: "min-w-0 flex-1 flex flex-col justify-between", children: [
        e.description ? /* @__PURE__ */ n("div", { className: "line-clamp-2 text-sm text-[#666]", children: e.description }) : null,
        e.breadcrumbs?.length || e.author || e.date ? /* @__PURE__ */ o("div", { className: "mt-2 flex min-w-0 items-center gap-3 text-[#666]", children: [
          /* @__PURE__ */ n(C, { breadcrumbs: e.breadcrumbs }),
          /* @__PURE__ */ n("span", { className: "h-3 w-px flex-none bg-[#666]", "aria-hidden": "true" }),
          /* @__PURE__ */ o("div", { className: "flex flex-none items-center gap-2", children: [
            /* @__PURE__ */ n(_, { author: e.author, date: e.date }),
            e.href ? /* @__PURE__ */ n("span", { className: "flex-none text-[#007EFF]", children: /* @__PURE__ */ n(E, { className: "h-3 w-3" }) }) : null
          ] })
        ] }) : /* @__PURE__ */ n($, { meta: e.meta })
      ] })
    ] })
  ] });
  return !l && !r ? s : /* @__PURE__ */ n(
    v,
    {
      href: l,
      target: e.target,
      rel: e.rel,
      onClick: r,
      className: "group block w-full rounded-xl px-3 text-left no-underline transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
      children: s
    }
  );
}
function V({
  item: e,
  onItemClick: t
}) {
  const i = e.breadcrumbs ?? [e.sourceLabel, e.categoryLabel].filter(Boolean), r = e.onClick ? void 0 : e.href;
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
        "group w-full rounded-xl text-left transition",
        "hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
      ),
      children: [
        /* @__PURE__ */ n("div", { className: "overflow-hidden rounded-lg ring-1 ring-slate-200", children: /* @__PURE__ */ o("div", { className: "relative aspect-4/3 bg-slate-100", children: [
          /* @__PURE__ */ n(
            "img",
            {
              src: e.thumbnailUrl,
              alt: e.thumbnailAlt ?? e.title,
              className: "absolute inset-0 h-full w-full object-cover",
              loading: "lazy"
            }
          ),
          e.mediaType === "video" ? /* @__PURE__ */ n("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ n("span", { className: "inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/30", children: /* @__PURE__ */ n(L, { className: "h-5 w-5 translate-x-px" }) }) }) : null
        ] }) }),
        /* @__PURE__ */ o("div", { className: "mt-2", children: [
          /* @__PURE__ */ n("div", { className: "truncate text-sm font-medium", children: e.title }),
          e.matchCountText ? /* @__PURE__ */ n("div", { className: "mt-1 truncate text-xs text-[#666]", children: e.matchCountText }) : null,
          i.length ? /* @__PURE__ */ n("div", { className: "mt-2 text-[#666]", children: /* @__PURE__ */ n(C, { breadcrumbs: i }) }) : null
        ] })
      ]
    }
  );
}
function P({
  action: e,
  className: t
}) {
  const i = c(
    "flex-none inline-flex items-center justify-center rounded-full border border-slate-200 bg-white",
    "h-9 px-12 text-sm font-medium text-slate-700 no-underline transition",
    "cursor-pointer hover:border-slate-300 hover:bg-slate-50 hover:no-underline",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
    t
  );
  return e.href ? /* @__PURE__ */ n(
    "a",
    {
      className: i,
      href: e.href,
      target: e.target,
      rel: A(e.rel, e.target),
      onClick: () => e.onClick?.(),
      children: e.label
    }
  ) : /* @__PURE__ */ n("button", { className: i, type: "button", onClick: e.onClick, children: e.label });
}
function h({ action: e }) {
  return e ? /* @__PURE__ */ o("div", { className: "mt-3 flex w-full items-center", children: [
    /* @__PURE__ */ n("span", { className: "h-px flex-1 bg-[#E8E8E8]", "aria-hidden": "true" }),
    /* @__PURE__ */ n(
      P,
      {
        action: e,
        className: c(
          "rounded-full border border-[#E8E8E8] bg-white px-4 py-2 text-sm font-medium text-[#333] transition",
          "hover:border-[#E8E8E8] hover:bg-[#F5F5F5]"
        )
      }
    ),
    /* @__PURE__ */ n("span", { className: "h-px flex-1 bg-[#E8E8E8]", "aria-hidden": "true" })
  ] }) : null;
}
function O(e, t) {
  if (e.layout === "list")
    return /* @__PURE__ */ o("div", { className: c("space-y-6", e.className), children: [
      /* @__PURE__ */ n(
        y,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      e.items.map((l) => /* @__PURE__ */ n(M, { item: l, onItemClick: t }, l.id)),
      /* @__PURE__ */ n(h, { action: e.footerAction })
    ] });
  if (e.layout === "mediaGrid") {
    const l = e.columns ?? 3, s = l === 2 ? "grid-cols-2" : l === 4 ? "grid-cols-4" : "grid-cols-3";
    return /* @__PURE__ */ o("div", { className: c(e.className), children: [
      /* @__PURE__ */ n(
        y,
        {
          title: e.title,
          titleIcon: e.titleIcon,
          titleIconBgColor: e.titleIconBgColor,
          titleClassName: e.titleClassName
        }
      ),
      /* @__PURE__ */ n("div", { className: c("grid gap-3", s), children: e.items.map((a) => /* @__PURE__ */ n(V, { item: a, onItemClick: t }, a.id)) }),
      /* @__PURE__ */ n(h, { action: e.footerAction })
    ] });
  }
  const i = e.columns ?? 3, r = i === 2 ? "grid-cols-2" : i === 4 ? "grid-cols-4" : "grid-cols-3";
  return /* @__PURE__ */ o("div", { className: c(e.className), children: [
    /* @__PURE__ */ n(
      y,
      {
        title: e.title,
        titleIcon: e.titleIcon,
        titleIconBgColor: e.titleIconBgColor,
        titleClassName: e.titleClassName
      }
    ),
    /* @__PURE__ */ n("div", { className: c("grid gap-3", r), children: e.items.map((l) => /* @__PURE__ */ n(U, { item: l, onItemClick: t }, l.id)) }),
    /* @__PURE__ */ n(h, { action: e.footerAction })
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
function b(e, t, i) {
  const r = e.thumbnail ?? e.cover ?? e.metadata?.thumbnail_link, l = e.summary ?? e.content, s = J(e.metadata?.file_extension ?? e.type), a = e.source?.name, u = e.category ?? e.categories?.join(" / ") ?? "Categories", d = [a, u].filter(Boolean), m = e.last_updated_by?.user?.username ?? e.owner?.username, p = q(e.last_updated_by?.timestamp ?? e.metadata?.last_reviewed), f = e.metadata?.icon_link ?? e.icon, g = f ? /* @__PURE__ */ n("img", { src: f, alt: "", className: "h-5 w-5 rounded-sm object-contain" }) : void 0;
  return {
    type: "result",
    id: `${e.source?.id ?? e.url ?? e.title}-${t}`,
    title: e.title,
    href: e.url,
    description: l,
    thumbnailUrl: r,
    fileType: s,
    typeIcon: g,
    breadcrumbs: d.length ? d : void 0,
    author: m,
    date: p,
    onClick: i
  };
}
function I({
  section: e,
  className: t,
  footerAction: i,
  onRecordClick: r,
  onItemClick: l
}) {
  const s = K(j(e, r), i);
  return /* @__PURE__ */ n("div", { className: c(t), children: O(s, l) });
}
function K(e, t) {
  return !t || e.footerAction ? e : e.layout === "list" ? { ...e, footerAction: t } : e.layout === "mediaGrid" ? { ...e, footerAction: t } : { ...e, footerAction: t };
}
function ee(e) {
  return /* @__PURE__ */ n(I, { ...e });
}
function te(e) {
  return /* @__PURE__ */ n(I, { ...e });
}
function j(e, t) {
  if (Array.isArray(e)) return Q(e, t);
  if (X(e)) return e;
  const i = e;
  if (i.type === "imageGroup" && Array.isArray(i.items)) {
    const l = i;
    return l.items[0]?.type === "media" ? {
      type: "section",
      title: l.title,
      layout: "mediaGrid",
      items: l.items.filter(
        (a) => typeof a == "object" && !!a && a.type === "media"
      ),
      columns: l.columns,
      footerAction: l.footerAction,
      className: l.className
    } : {
      type: "section",
      title: l.title,
      layout: "imageGrid",
      items: l.items.filter(
        (a) => typeof a == "object" && !!a && a.type === "image"
      ),
      columns: l.columns,
      footerAction: l.footerAction,
      className: l.className
    };
  }
  if (i.type === "videoGroup" && Array.isArray(i.items)) {
    const l = i;
    return {
      type: "section",
      title: l.title,
      layout: "mediaGrid",
      items: l.items,
      columns: l.columns,
      footerAction: l.footerAction,
      className: l.className
    };
  }
  if (i.type === "result")
    return {
      type: "section",
      layout: "list",
      items: [e]
    };
  if (i.type === "media")
    return {
      type: "section",
      layout: "mediaGrid",
      items: [e]
    };
  if (i.type === "image" && typeof i.imageUrl == "string")
    return {
      type: "section",
      layout: "imageGrid",
      items: [e]
    };
  const r = typeof i.type == "string" ? i.type.trim().toLowerCase() : void 0;
  if (r === "image" || r === "video") {
    const l = typeof i.id == "string" ? i.id : void 0, s = typeof i.thumbnail == "string" ? i.thumbnail : typeof i.cover == "string" ? i.cover : typeof i.metadata == "object" && i.metadata && typeof i.metadata.thumbnail_link == "string" ? i.metadata.thumbnail_link : void 0;
    if (s) {
      const a = typeof i.category == "string" ? i.category : Array.isArray(i.categories) ? i.categories.filter((f) => typeof f == "string").join(" / ") : void 0, u = typeof i.title == "string" ? i.title : "Untitled", d = typeof i.url == "string" ? i.url : void 0, m = typeof i.source == "object" && i.source && typeof i.source.name == "string" ? i.source.name : void 0;
      return {
        type: "section",
        layout: "mediaGrid",
        items: [{
          type: "media",
          id: l ?? `${d ?? u}-0`,
          mediaType: r === "video" ? "video" : "image",
          title: u,
          href: t ? void 0 : d,
          thumbnailUrl: s,
          sourceLabel: m,
          categoryLabel: a,
          breadcrumbs: [m, a].filter(Boolean),
          ...t ? { onClick: () => t(e, 0) } : {}
        }]
      };
    }
  }
  return {
    type: "section",
    layout: "list",
    items: [
      b(
        e,
        0,
        t ? () => t(e, 0) : void 0
      )
    ]
  };
}
function Q(e, t) {
  if (!e.length)
    return { type: "section", layout: "list", items: [] };
  if (e.every(G)) {
    if (e.every((s) => s.type === "result"))
      return { type: "section", layout: "list", items: e };
    if (e.every((s) => s.type === "media"))
      return { type: "section", layout: "mediaGrid", items: e };
    if (e.every((s) => s.type === "image" && "imageUrl" in s))
      return { type: "section", layout: "imageGrid", items: e };
    if (e.length === 1) return j(e[0], t);
  }
  const i = [], r = [];
  for (const [s, a] of e.entries()) {
    const u = W(a, s, t);
    u ? i.push(u) : r.push(
      b(
        a,
        s,
        t ? () => t(a, s) : void 0
      )
    );
  }
  return i.length && !r.length ? { type: "section", title: w(e, (a) => a.category ?? a.source?.name), layout: "mediaGrid", items: i } : { type: "section", title: w(e, (s) => s.category ?? s.source?.name), layout: "list", items: r };
}
function G(e) {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return t.type === "result" || t.type === "media" || t.type === "imageGroup" || t.type === "videoGroup" || t.type === "image" && typeof e.imageUrl == "string";
}
function W(e, t, i) {
  const r = e, l = typeof r.type == "string" ? r.type.trim().toLowerCase() : void 0;
  if (l !== "image" && l !== "video") return;
  const s = typeof r.id == "string" ? r.id : void 0, a = typeof r.thumbnail == "string" ? r.thumbnail : typeof r.cover == "string" ? r.cover : typeof r.metadata == "object" && r.metadata && typeof r.metadata.thumbnail_link == "string" ? r.metadata.thumbnail_link : void 0;
  if (!a) return;
  const u = typeof r.category == "string" ? r.category : Array.isArray(r.categories) ? r.categories.filter((g) => typeof g == "string").join(" / ") : void 0, d = typeof r.title == "string" ? r.title : "Untitled", m = typeof r.url == "string" ? r.url : void 0, p = typeof r.source == "object" && r.source && typeof r.source.name == "string" ? r.source.name : void 0, f = !!i && !G(e);
  return {
    type: "media",
    id: s ?? `${m ?? d}-0`,
    mediaType: l === "video" ? "video" : "image",
    title: d,
    href: f ? void 0 : m,
    thumbnailUrl: a,
    sourceLabel: p,
    categoryLabel: u,
    breadcrumbs: [p, u].filter(Boolean),
    ...f ? { onClick: () => i(e, t) } : {}
  };
}
function w(e, t) {
  const i = e[0], r = t(i);
  if (r) {
    for (const l of e)
      if (t(l) !== r) return;
    return r;
  }
}
function X(e) {
  if (!e || typeof e != "object") return !1;
  const t = e;
  return t.type === "section" && (t.layout === "list" || t.layout === "imageGrid" || t.layout === "mediaGrid") && Array.isArray(t.items);
}
function ie(e, t) {
  const i = [];
  for (const r of e) {
    const l = i.length ? i[i.length - 1] : void 0;
    if (r.type === "imageGroup") {
      r.items[0]?.type === "media" ? i.push({
        type: "section",
        title: r.title,
        titleIcon: /* @__PURE__ */ n(x, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB]",
        layout: "mediaGrid",
        items: r.items.filter((a) => a.type === "media"),
        columns: r.columns ?? t,
        footerAction: r.footerAction,
        className: r.className
      }) : i.push({
        type: "section",
        title: r.title,
        titleIcon: /* @__PURE__ */ n(x, { className: "h-4 w-4" }),
        titleIconBgColor: "#FFAF36",
        titleClassName: "text-[#1A0CAB]",
        layout: "imageGrid",
        items: r.items.filter((a) => a.type === "image"),
        columns: r.columns ?? t,
        footerAction: r.footerAction,
        className: r.className
      });
      continue;
    }
    if (r.type === "videoGroup") {
      i.push({
        type: "section",
        title: r.title,
        titleIcon: /* @__PURE__ */ n(S, { className: "h-4 w-4" }),
        titleIconBgColor: "#1784FC",
        titleClassName: "text-[#1A0CAB]",
        layout: "mediaGrid",
        items: r.items,
        columns: r.columns ?? t,
        footerAction: r.footerAction,
        className: r.className
      });
      continue;
    }
    if (r.type === "result") {
      if (l?.layout === "list") {
        l.items.push(r);
        continue;
      }
      i.push({
        type: "section",
        layout: "list",
        items: [r]
      });
      continue;
    }
    if (r.type === "media") {
      if (l?.layout === "mediaGrid") {
        l.items.push(r);
        continue;
      }
      i.push({
        type: "section",
        layout: "mediaGrid",
        ...t ? { columns: t } : {},
        items: [r]
      });
      continue;
    }
    if (l?.layout === "imageGrid") {
      l.items.push(r);
      continue;
    }
    i.push({
      type: "section",
      layout: "imageGrid",
      ...t ? { columns: t } : {},
      items: [r]
    });
  }
  return i;
}
function re(e) {
  return e.map((t, i) => b(t, i));
}
export {
  ee as SearchResultsImageGroup,
  te as SearchResultsVideoGroup,
  I as default,
  ie as itemsToSections,
  re as recordsToItems
};
