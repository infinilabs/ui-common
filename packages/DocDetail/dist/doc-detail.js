(function(){"use strict";try{if(typeof document<"u"){var n=document.createElement("style");n.appendChild(document.createTextNode("*,:before,:after{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }::backdrop{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 rgb(0 0 0 / 0);--un-ring-shadow:0 0 rgb(0 0 0 / 0);--un-shadow-inset: ;--un-shadow:0 0 rgb(0 0 0 / 0);--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgb(147 197 253 / .5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.float-left{float:left}.my-3{margin-top:.75rem;margin-bottom:.75rem}.mr-3{margin-right:.75rem}.block{display:block}.size-4{width:1rem;height:1rem}.size-6{width:1.5rem;height:1.5rem}.w-1\\/2{width:50%}.w-24{width:6rem}.w-full{width:100%}.flex{display:flex}.inline-flex{display:inline-flex}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-center{align-items:center}.gap-2{gap:.5rem}.gap-6{gap:1.5rem}.gap-row-2{row-gap:.5rem}.bg-transparent{background-color:transparent}.text-3{font-size:.75rem}.text-4\\.5\\/6{font-size:1.125rem;line-height:1.5rem}@media(max-width:639.9px){.\\<sm\\:w-full{width:100%}}")),document.head.appendChild(n)}}catch(r){console.error("vite-plugin-css-injected-by-js",r)}})();
import { jsx as e, jsxs as r, Fragment as m } from "react/jsx-runtime";
import { Collapse as i, Typography as u, theme as y, Button as h, Card as b } from "antd";
import { SquareArrowOutUpRight as v } from "lucide-react";
const f = (t) => {
  const { data: a, i18n: l } = t;
  return a.type === "image" ? /* @__PURE__ */ e("img", { src: a.url, className: "w-full" }) : /* @__PURE__ */ e(
    i,
    {
      size: "small",
      defaultActiveKey: ["preview"],
      classNames: {
        root: "bg-transparent"
      },
      items: [
        {
          key: "preview",
          label: l?.labels?.preview ?? "Preview",
          children: /* @__PURE__ */ e("p", { children: "Preview content" })
        }
      ]
    }
  );
}, w = (t) => {
  const { data: a, i18n: l } = t;
  return /* @__PURE__ */ e(
    i,
    {
      size: "small",
      classNames: {
        root: "bg-transparent"
      },
      items: [
        {
          key: "ai-interpretation",
          label: l?.labels?.aiInterpretation ?? "AI Interpretation",
          children: /* @__PURE__ */ e("p", { children: a?.content })
        }
      ]
    }
  );
}, { Text: s } = u, z = (t) => {
  const { data: a, i18n: l } = t, { token: n } = y.useToken(), c = [
    {
      label: l?.labels?.updatedAt ?? "Updated At",
      value: a?.last_updated_by?.timestamp
    },
    {
      label: l?.labels?.type ?? "Type",
      value: a?.type
    },
    {
      label: l?.labels?.createdBy ?? "Created By",
      value: a?.owner?.username
    },
    {
      label: l?.labels?.size ?? "Size",
      value: a?.size
    },
    {
      label: l?.labels?.updatedBy ?? "Updated By",
      value: a?.last_updated_by?.user.username
    }
  ];
  return /* @__PURE__ */ r(m, { children: [
    /* @__PURE__ */ e("img", { src: a?.icon, className: "size-6 mr-3 float-left" }),
    /* @__PURE__ */ e("div", { className: "text-4.5/6", style: { color: n.colorPrimary }, children: a?.title }),
    /* @__PURE__ */ r(s, { type: "secondary", className: "block my-3 text-3", children: [
      /* @__PURE__ */ e("span", { children: a?.source?.name }),
      /* @__PURE__ */ e("span", { children: " > " }),
      /* @__PURE__ */ e("span", { children: a?.category }),
      /* @__PURE__ */ e("span", { children: " | " }),
      /* @__PURE__ */ e("span", { children: a?.owner?.username }),
      /* @__PURE__ */ e("span", { children: " · " }),
      /* @__PURE__ */ e("span", { children: a?.last_updated_by?.timestamp })
    ] }),
    /* @__PURE__ */ r("div", { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ e("div", { className: "flex gap-2", children: /* @__PURE__ */ e(
        h,
        {
          color: "primary",
          variant: "filled",
          shape: "round",
          icon: /* @__PURE__ */ e(v, { className: "size-4" }),
          onClick: () => {
            window.open(a.url);
          },
          children: l?.buttons?.openSource ?? "Open Source"
        }
      ) }),
      /* @__PURE__ */ e(f, { ...t }),
      /* @__PURE__ */ e(w, { ...t }),
      /* @__PURE__ */ e(
        b,
        {
          size: "small",
          classNames: {
            body: "flex flex-wrap gap-row-2"
          },
          children: c.map((o) => {
            const { label: d, value: p } = o;
            return /* @__PURE__ */ r("div", { className: "w-1/2 inline-flex items-center <sm:w-full", children: [
              /* @__PURE__ */ e(s, { type: "secondary", className: "w-24", children: d }),
              /* @__PURE__ */ e("span", { children: p ?? "-" })
            ] });
          })
        }
      )
    ] })
  ] });
};
export {
  z as DocDetail
};
