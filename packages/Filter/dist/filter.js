import * as React from "react";
import { Children, Component, Fragment, createContext, createElement, forwardRef, isValidElement, useCallback, useContext, useEffect, useId, useInsertionEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { BrushCleaning, ChevronDown, SquareMinus, SquarePlus } from "lucide-react";
import { Checkbox, ColorPicker, Input, Select, Slider } from "antd";
var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (t, o) => () => (t && (o = t(t = 0)), o), __export = (t) => {
	let o = {};
	for (var s in t) __defProp(o, s, {
		get: t[s],
		enumerable: !0
	});
	return o;
}, __copyProps = (t, o, s, c) => {
	if (o && typeof o == "object" || typeof o == "function") for (var l = __getOwnPropNames(o), u = 0, d = l.length, f; u < d; u++) f = l[u], !__hasOwnProp.call(t, f) && f !== s && __defProp(t, f, {
		get: ((t) => o[t]).bind(null, f),
		enumerable: !(c = __getOwnPropDesc(o, f)) || c.enumerable
	});
	return t;
}, __toCommonJS = (t) => __copyProps(__defProp({}, "__esModule", { value: !0 }), t), LayoutGroupContext = createContext({});
function useConstant(t) {
	let o = useRef(null);
	return o.current === null && (o.current = t()), o.current;
}
var isBrowser = typeof window < "u", useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect, PresenceContext = /* @__PURE__ */ createContext(null);
function addUniqueItem(t, o) {
	t.indexOf(o) === -1 && t.push(o);
}
function removeItem(t, o) {
	let s = t.indexOf(o);
	s > -1 && t.splice(s, 1);
}
var clamp = (t, o, s) => s > o ? o : s < t ? t : s;
function formatErrorMessage(t, o) {
	return o ? `${t}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${o}` : t;
}
var warning = () => {}, invariant = () => {};
process.env.NODE_ENV !== "production" && (warning = (t, o, s) => {
	!t && typeof console < "u" && console.warn(formatErrorMessage(o, s));
}, invariant = (t, o, s) => {
	if (!t) throw Error(formatErrorMessage(o, s));
});
var MotionGlobalConfig = {}, isNumericalString = (t) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(t);
function isObject(t) {
	return typeof t == "object" && !!t;
}
var isZeroValueString = (t) => /^0[^.\s]+$/u.test(t);
/* @__NO_SIDE_EFFECTS__ */
function memo(t) {
	let o;
	return () => (o === void 0 && (o = t()), o);
}
var noop = /* @__NO_SIDE_EFFECTS__ */ (t) => t, combineFunctions = (t, o) => (s) => o(t(s)), pipe = (...t) => t.reduce(combineFunctions), progress = /* @__NO_SIDE_EFFECTS__ */ (t, o, s) => {
	let c = o - t;
	return c === 0 ? 1 : (s - t) / c;
}, SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(t) {
		return addUniqueItem(this.subscriptions, t), () => removeItem(this.subscriptions, t);
	}
	notify(t, o, s) {
		let c = this.subscriptions.length;
		if (c) if (c === 1) this.subscriptions[0](t, o, s);
		else for (let l = 0; l < c; l++) {
			let c = this.subscriptions[l];
			c && c(t, o, s);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (t) => t * 1e3, millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (t) => t / 1e3;
function velocityPerSecond(t, o) {
	return o ? t * (1e3 / o) : 0;
}
var warned = /* @__PURE__ */ new Set();
function warnOnce(t, o, s) {
	t || warned.has(o) || (console.warn(formatErrorMessage(o, s)), warned.add(o));
}
var calcBezier = (t, o, s) => (((1 - 3 * s + 3 * o) * t + (3 * s - 6 * o)) * t + 3 * o) * t, subdivisionPrecision = 1e-7, subdivisionMaxIterations = 12;
function binarySubdivide(t, o, s, c, l) {
	let u, d, f = 0;
	do
		d = o + (s - o) / 2, u = calcBezier(d, c, l) - t, u > 0 ? s = d : o = d;
	while (Math.abs(u) > subdivisionPrecision && ++f < subdivisionMaxIterations);
	return d;
}
function cubicBezier(t, o, s, c) {
	if (t === o && s === c) return noop;
	let l = (o) => binarySubdivide(o, 0, 1, t, s);
	return (t) => t === 0 || t === 1 ? t : calcBezier(l(t), o, c);
}
var mirrorEasing = (t) => (o) => o <= .5 ? t(2 * o) / 2 : (2 - t(2 * (1 - o))) / 2, reverseEasing = (t) => (o) => 1 - t(1 - o), backOut = /* @__PURE__ */ cubicBezier(.33, 1.53, .69, .99), backIn = /* @__PURE__ */ reverseEasing(backOut), backInOut = /* @__PURE__ */ mirrorEasing(backIn), anticipate = (t) => (t *= 2) < 1 ? .5 * backIn(t) : .5 * (2 - 2 ** (-10 * (t - 1))), circIn = (t) => 1 - Math.sin(Math.acos(t)), circOut = reverseEasing(circIn), circInOut = mirrorEasing(circIn), easeIn = /* @__PURE__ */ cubicBezier(.42, 0, 1, 1), easeOut = /* @__PURE__ */ cubicBezier(0, 0, .58, 1), easeInOut = /* @__PURE__ */ cubicBezier(.42, 0, .58, 1), isEasingArray = (t) => Array.isArray(t) && typeof t[0] != "number", isBezierDefinition = (t) => Array.isArray(t) && typeof t[0] == "number", easingLookup = {
	linear: noop,
	easeIn,
	easeInOut,
	easeOut,
	circIn,
	circInOut,
	circOut,
	backIn,
	backInOut,
	backOut,
	anticipate
}, isValidEasing = (t) => typeof t == "string", easingDefinitionToFunction = (t) => {
	if (isBezierDefinition(t)) {
		invariant(t.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [o, s, c, l] = t;
		return cubicBezier(o, s, c, l);
	} else if (isValidEasing(t)) return invariant(easingLookup[t] !== void 0, `Invalid easing type '${t}'`, "invalid-easing-type"), easingLookup[t];
	return t;
}, stepsOrder = [
	"setup",
	"read",
	"resolveKeyframes",
	"preUpdate",
	"update",
	"preRender",
	"render",
	"postRender"
], statsBuffer = {
	value: null,
	addProjectionMetrics: null
};
function createRenderStep(t, o) {
	let s = /* @__PURE__ */ new Set(), c = /* @__PURE__ */ new Set(), l = !1, u = !1, d = /* @__PURE__ */ new WeakSet(), f = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, p = 0;
	function m(o) {
		d.has(o) && (h.schedule(o), t()), p++, o(f);
	}
	let h = {
		schedule: (t, o = !1, u = !1) => {
			let f = u && l ? s : c;
			return o && d.add(t), f.has(t) || f.add(t), t;
		},
		cancel: (t) => {
			c.delete(t), d.delete(t);
		},
		process: (t) => {
			if (f = t, l) {
				u = !0;
				return;
			}
			l = !0, [s, c] = [c, s], s.forEach(m), o && statsBuffer.value && statsBuffer.value.frameloop[o].push(p), p = 0, s.clear(), l = !1, u && (u = !1, h.process(t));
		}
	};
	return h;
}
var maxElapsed = 40;
function createRenderBatcher(t, o) {
	let s = !1, c = !0, l = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, u = () => s = !0, d = stepsOrder.reduce((t, s) => (t[s] = createRenderStep(u, o ? s : void 0), t), {}), { setup: f, read: p, resolveKeyframes: m, preUpdate: h, update: g, preRender: _, render: v, postRender: y } = d, b = () => {
		let u = MotionGlobalConfig.useManualTiming ? l.timestamp : performance.now();
		s = !1, MotionGlobalConfig.useManualTiming || (l.delta = c ? 1e3 / 60 : Math.max(Math.min(u - l.timestamp, maxElapsed), 1)), l.timestamp = u, l.isProcessing = !0, f.process(l), p.process(l), m.process(l), h.process(l), g.process(l), _.process(l), v.process(l), y.process(l), l.isProcessing = !1, s && o && (c = !1, t(b));
	}, x = () => {
		s = !0, c = !0, l.isProcessing || t(b);
	};
	return {
		schedule: stepsOrder.reduce((t, o) => {
			let c = d[o];
			return t[o] = (t, o = !1, l = !1) => (s || x(), c.schedule(t, o, l)), t;
		}, {}),
		cancel: (t) => {
			for (let o = 0; o < stepsOrder.length; o++) d[stepsOrder[o]].cancel(t);
		},
		state: l,
		steps: d
	};
}
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame < "u" ? requestAnimationFrame : noop, !0), now;
function clearTime() {
	now = void 0;
}
var time = {
	now: () => (now === void 0 && time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now()), now),
	set: (t) => {
		now = t, queueMicrotask(clearTime);
	}
}, activeAnimations = {
	layout: 0,
	mainThread: 0,
	waapi: 0
}, checkStringStartsWith = (t) => (o) => typeof o == "string" && o.startsWith(t), isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--"), startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--"), isCSSVariableToken = (t) => startsAsVariableToken(t) ? singleCssVariableRegex.test(t.split("/*")[0].trim()) : !1, singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, number = {
	test: (t) => typeof t == "number",
	parse: parseFloat,
	transform: (t) => t
}, alpha = {
	...number,
	transform: (t) => clamp(0, 1, t)
}, scale = {
	...number,
	default: 1
}, sanitize = (t) => Math.round(t * 1e5) / 1e5, floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(t) {
	return t == null;
}
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, isColorString = (t, o) => (s) => !!(typeof s == "string" && singleColorRegex.test(s) && s.startsWith(t) || o && !isNullish(s) && Object.prototype.hasOwnProperty.call(s, o)), splitColor = (t, o, s) => (c) => {
	if (typeof c != "string") return c;
	let [l, u, d, f] = c.match(floatRegex);
	return {
		[t]: parseFloat(l),
		[o]: parseFloat(u),
		[s]: parseFloat(d),
		alpha: f === void 0 ? 1 : parseFloat(f)
	};
}, clampRgbUnit = (t) => clamp(0, 255, t), rgbUnit = {
	...number,
	transform: (t) => Math.round(clampRgbUnit(t))
}, rgba = {
	test: /* @__PURE__ */ isColorString("rgb", "red"),
	parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
	transform: ({ red: t, green: o, blue: s, alpha: c = 1 }) => "rgba(" + rgbUnit.transform(t) + ", " + rgbUnit.transform(o) + ", " + rgbUnit.transform(s) + ", " + sanitize(alpha.transform(c)) + ")"
};
function parseHex(t) {
	let o = "", s = "", c = "", l = "";
	return t.length > 5 ? (o = t.substring(1, 3), s = t.substring(3, 5), c = t.substring(5, 7), l = t.substring(7, 9)) : (o = t.substring(1, 2), s = t.substring(2, 3), c = t.substring(3, 4), l = t.substring(4, 5), o += o, s += s, c += c, l += l), {
		red: parseInt(o, 16),
		green: parseInt(s, 16),
		blue: parseInt(c, 16),
		alpha: l ? parseInt(l, 16) / 255 : 1
	};
}
var hex = {
	test: /* @__PURE__ */ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
}, createUnitType = /* @__NO_SIDE_EFFECTS__ */ (t) => ({
	test: (o) => typeof o == "string" && o.endsWith(t) && o.split(" ").length === 1,
	parse: parseFloat,
	transform: (o) => `${o}${t}`
}), degrees = /* @__PURE__ */ createUnitType("deg"), percent = /* @__PURE__ */ createUnitType("%"), px = /* @__PURE__ */ createUnitType("px"), vh = /* @__PURE__ */ createUnitType("vh"), vw = /* @__PURE__ */ createUnitType("vw"), progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (t) => percent.parse(t) / 100,
	transform: (t) => percent.transform(t * 100)
}))(), hsla = {
	test: /* @__PURE__ */ isColorString("hsl", "hue"),
	parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue: t, saturation: o, lightness: s, alpha: c = 1 }) => "hsla(" + Math.round(t) + ", " + percent.transform(sanitize(o)) + ", " + percent.transform(sanitize(s)) + ", " + sanitize(alpha.transform(c)) + ")"
}, color = {
	test: (t) => rgba.test(t) || hex.test(t) || hsla.test(t),
	parse: (t) => rgba.test(t) ? rgba.parse(t) : hsla.test(t) ? hsla.parse(t) : hex.parse(t),
	transform: (t) => typeof t == "string" ? t : t.hasOwnProperty("red") ? rgba.transform(t) : hsla.transform(t),
	getAnimatableNone: (t) => {
		let o = color.parse(t);
		return o.alpha = 0, color.transform(o);
	}
}, colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(t) {
	return isNaN(t) && typeof t == "string" && (t.match(floatRegex)?.length || 0) + (t.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number", COLOR_TOKEN = "color", VAR_TOKEN = "var", VAR_FUNCTION_TOKEN = "var(", SPLIT_TOKEN = "${}", complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(t) {
	let o = t.toString(), s = [], c = {
		color: [],
		number: [],
		var: []
	}, l = [], u = 0;
	return {
		values: s,
		split: o.replace(complexRegex, (t) => (color.test(t) ? (c.color.push(u), l.push(COLOR_TOKEN), s.push(color.parse(t))) : t.startsWith(VAR_FUNCTION_TOKEN) ? (c.var.push(u), l.push(VAR_TOKEN), s.push(t)) : (c.number.push(u), l.push(NUMBER_TOKEN), s.push(parseFloat(t))), ++u, SPLIT_TOKEN)).split(SPLIT_TOKEN),
		indexes: c,
		types: l
	};
}
function parseComplexValue(t) {
	return analyseComplexValue(t).values;
}
function createTransformer(t) {
	let { split: o, types: s } = analyseComplexValue(t), c = o.length;
	return (t) => {
		let l = "";
		for (let u = 0; u < c; u++) if (l += o[u], t[u] !== void 0) {
			let o = s[u];
			o === NUMBER_TOKEN ? l += sanitize(t[u]) : o === COLOR_TOKEN ? l += color.transform(t[u]) : l += t[u];
		}
		return l;
	};
}
var convertNumbersToZero = (t) => typeof t == "number" ? 0 : color.test(t) ? color.getAnimatableNone(t) : t;
function getAnimatableNone$1(t) {
	let o = parseComplexValue(t);
	return createTransformer(t)(o.map(convertNumbersToZero));
}
var complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(t, o, s) {
	return s < 0 && (s += 1), s > 1 && --s, s < 1 / 6 ? t + (o - t) * 6 * s : s < 1 / 2 ? o : s < 2 / 3 ? t + (o - t) * (2 / 3 - s) * 6 : t;
}
function hslaToRgba({ hue: t, saturation: o, lightness: s, alpha: c }) {
	t /= 360, o /= 100, s /= 100;
	let l = 0, u = 0, d = 0;
	if (!o) l = u = d = s;
	else {
		let c = s < .5 ? s * (1 + o) : s + o - s * o, f = 2 * s - c;
		l = hueToRgb(f, c, t + 1 / 3), u = hueToRgb(f, c, t), d = hueToRgb(f, c, t - 1 / 3);
	}
	return {
		red: Math.round(l * 255),
		green: Math.round(u * 255),
		blue: Math.round(d * 255),
		alpha: c
	};
}
function mixImmediate(t, o) {
	return (s) => s > 0 ? o : t;
}
var mixNumber = (t, o, s) => t + (o - t) * s, mixLinearColor = (t, o, s) => {
	let c = t * t, l = s * (o * o - c) + c;
	return l < 0 ? 0 : Math.sqrt(l);
}, colorTypes = [
	hex,
	rgba,
	hsla
], getColorType = (t) => colorTypes.find((o) => o.test(t));
function asRGBA(t) {
	let o = getColorType(t);
	if (warning(!!o, `'${t}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !o) return !1;
	let s = o.parse(t);
	return o === hsla && (s = hslaToRgba(s)), s;
}
var mixColor = (t, o) => {
	let s = asRGBA(t), c = asRGBA(o);
	if (!s || !c) return mixImmediate(t, o);
	let l = { ...s };
	return (t) => (l.red = mixLinearColor(s.red, c.red, t), l.green = mixLinearColor(s.green, c.green, t), l.blue = mixLinearColor(s.blue, c.blue, t), l.alpha = mixNumber(s.alpha, c.alpha, t), rgba.transform(l));
}, invisibleValues = new Set(["none", "hidden"]);
function mixVisibility(t, o) {
	return invisibleValues.has(t) ? (s) => s <= 0 ? t : o : (s) => s >= 1 ? o : t;
}
function mixNumber$1(t, o) {
	return (s) => mixNumber(t, o, s);
}
function getMixer(t) {
	return typeof t == "number" ? mixNumber$1 : typeof t == "string" ? isCSSVariableToken(t) ? mixImmediate : color.test(t) ? mixColor : mixComplex : Array.isArray(t) ? mixArray : typeof t == "object" ? color.test(t) ? mixColor : mixObject : mixImmediate;
}
function mixArray(t, o) {
	let s = [...t], c = s.length, l = t.map((t, s) => getMixer(t)(t, o[s]));
	return (t) => {
		for (let o = 0; o < c; o++) s[o] = l[o](t);
		return s;
	};
}
function mixObject(t, o) {
	let s = {
		...t,
		...o
	}, c = {};
	for (let l in s) t[l] !== void 0 && o[l] !== void 0 && (c[l] = getMixer(t[l])(t[l], o[l]));
	return (t) => {
		for (let o in c) s[o] = c[o](t);
		return s;
	};
}
function matchOrder(t, o) {
	let s = [], c = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let l = 0; l < o.values.length; l++) {
		let u = o.types[l], d = t.indexes[u][c[u]];
		s[l] = t.values[d] ?? 0, c[u]++;
	}
	return s;
}
var mixComplex = (t, o) => {
	let s = complex.createTransformer(o), c = analyseComplexValue(t), l = analyseComplexValue(o);
	return c.indexes.var.length === l.indexes.var.length && c.indexes.color.length === l.indexes.color.length && c.indexes.number.length >= l.indexes.number.length ? invisibleValues.has(t) && !l.values.length || invisibleValues.has(o) && !c.values.length ? mixVisibility(t, o) : pipe(mixArray(matchOrder(c, l), l.values), s) : (warning(!0, `Complex values '${t}' and '${o}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), mixImmediate(t, o));
};
function mix(t, o, s) {
	return typeof t == "number" && typeof o == "number" && typeof s == "number" ? mixNumber(t, o, s) : getMixer(t)(t, o);
}
var frameloopDriver = (t) => {
	let o = ({ timestamp: o }) => t(o);
	return {
		start: (t = !0) => frame.update(o, t),
		stop: () => cancelFrame(o),
		now: () => frameData.isProcessing ? frameData.timestamp : time.now()
	};
}, generateLinearEasing = (t, o, s = 10) => {
	let c = "", l = Math.max(Math.round(o / s), 2);
	for (let o = 0; o < l; o++) c += Math.round(t(o / (l - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${c.substring(0, c.length - 2)})`;
}, maxGeneratorDuration = 2e4;
function calcGeneratorDuration(t) {
	let o = 0, s = t.next(o);
	for (; !s.done && o < 2e4;) o += 50, s = t.next(o);
	return o >= 2e4 ? Infinity : o;
}
function createGeneratorEasing(t, o = 100, s) {
	let c = s({
		...t,
		keyframes: [0, o]
	}), l = Math.min(calcGeneratorDuration(c), maxGeneratorDuration);
	return {
		type: "keyframes",
		ease: (t) => c.next(l * t).value / o,
		duration: /* @__PURE__ */ millisecondsToSeconds(l)
	};
}
var velocitySampleDuration = 5;
function calcGeneratorVelocity(t, o, s) {
	let c = Math.max(o - velocitySampleDuration, 0);
	return velocityPerSecond(s - t(c), o - c);
}
var springDefaults = {
	stiffness: 100,
	damping: 10,
	mass: 1,
	velocity: 0,
	duration: 800,
	bounce: .3,
	visualDuration: .3,
	restSpeed: {
		granular: .01,
		default: 2
	},
	restDelta: {
		granular: .005,
		default: .5
	},
	minDuration: .01,
	maxDuration: 10,
	minDamping: .05,
	maxDamping: 1
}, safeMin = .001;
function findSpring({ duration: t = springDefaults.duration, bounce: o = springDefaults.bounce, velocity: s = springDefaults.velocity, mass: c = springDefaults.mass }) {
	let l, u;
	warning(t <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let d = 1 - o;
	d = clamp(springDefaults.minDamping, springDefaults.maxDamping, d), t = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(t)), d < 1 ? (l = (o) => {
		let c = o * d, l = c * t, u = c - s, f = calcAngularFreq(o, d), p = Math.exp(-l);
		return safeMin - u / f * p;
	}, u = (o) => {
		let c = o * d * t, u = c * s + s, f = d ** 2 * o ** 2 * t, p = Math.exp(-c), m = calcAngularFreq(o ** 2, d);
		return (-l(o) + safeMin > 0 ? -1 : 1) * ((u - f) * p) / m;
	}) : (l = (o) => {
		let c = Math.exp(-o * t), l = (o - s) * t + 1;
		return -safeMin + c * l;
	}, u = (o) => Math.exp(-o * t) * ((s - o) * (t * t)));
	let f = 5 / t, p = approximateRoot(l, u, f);
	if (t = /* @__PURE__ */ secondsToMilliseconds(t), isNaN(p)) return {
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		duration: t
	};
	{
		let o = p ** 2 * c;
		return {
			stiffness: o,
			damping: d * 2 * Math.sqrt(c * o),
			duration: t
		};
	}
}
var rootIterations = 12;
function approximateRoot(t, o, s) {
	let c = s;
	for (let s = 1; s < rootIterations; s++) c -= t(c) / o(c);
	return c;
}
function calcAngularFreq(t, o) {
	return t * Math.sqrt(1 - o * o);
}
var durationKeys = ["duration", "bounce"], physicsKeys = [
	"stiffness",
	"damping",
	"mass"
];
function isSpringType(t, o) {
	return o.some((o) => t[o] !== void 0);
}
function getSpringOptions(t) {
	let o = {
		velocity: springDefaults.velocity,
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		mass: springDefaults.mass,
		isResolvedFromDuration: !1,
		...t
	};
	if (!isSpringType(t, physicsKeys) && isSpringType(t, durationKeys)) if (t.visualDuration) {
		let s = t.visualDuration, c = 2 * Math.PI / (s * 1.2), l = c * c, u = 2 * clamp(.05, 1, 1 - (t.bounce || 0)) * Math.sqrt(l);
		o = {
			...o,
			mass: springDefaults.mass,
			stiffness: l,
			damping: u
		};
	} else {
		let s = findSpring(t);
		o = {
			...o,
			...s,
			mass: springDefaults.mass
		}, o.isResolvedFromDuration = !0;
	}
	return o;
}
function spring(t = springDefaults.visualDuration, o = springDefaults.bounce) {
	let s = typeof t == "object" ? t : {
		visualDuration: t,
		keyframes: [0, 1],
		bounce: o
	}, { restSpeed: c, restDelta: l } = s, u = s.keyframes[0], d = s.keyframes[s.keyframes.length - 1], f = {
		done: !1,
		value: u
	}, { stiffness: p, damping: m, mass: h, duration: g, velocity: _, isResolvedFromDuration: v } = getSpringOptions({
		...s,
		velocity: -/* @__PURE__ */ millisecondsToSeconds(s.velocity || 0)
	}), y = _ || 0, b = m / (2 * Math.sqrt(p * h)), x = d - u, S = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(p / h)), C = Math.abs(x) < 5;
	c ||= C ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default, l ||= C ? springDefaults.restDelta.granular : springDefaults.restDelta.default;
	let w;
	if (b < 1) {
		let t = calcAngularFreq(S, b);
		w = (o) => d - Math.exp(-b * S * o) * ((y + b * S * x) / t * Math.sin(t * o) + x * Math.cos(t * o));
	} else if (b === 1) w = (t) => d - Math.exp(-S * t) * (x + (y + S * x) * t);
	else {
		let t = S * Math.sqrt(b * b - 1);
		w = (o) => {
			let s = Math.exp(-b * S * o), c = Math.min(t * o, 300);
			return d - s * ((y + b * S * x) * Math.sinh(c) + t * x * Math.cosh(c)) / t;
		};
	}
	let T = {
		calculatedDuration: v && g || null,
		next: (t) => {
			let o = w(t);
			if (v) f.done = t >= g;
			else {
				let s = t === 0 ? y : 0;
				b < 1 && (s = t === 0 ? /* @__PURE__ */ secondsToMilliseconds(y) : calcGeneratorVelocity(w, t, o));
				let u = Math.abs(s) <= c, p = Math.abs(d - o) <= l;
				f.done = u && p;
			}
			return f.value = f.done ? d : o, f;
		},
		toString: () => {
			let t = Math.min(calcGeneratorDuration(T), maxGeneratorDuration), o = generateLinearEasing((o) => T.next(t * o).value, t, 30);
			return t + "ms " + o;
		},
		toTransition: () => {}
	};
	return T;
}
spring.applyToOptions = (t) => {
	let o = createGeneratorEasing(t, 100, spring);
	return t.ease = o.ease, t.duration = /* @__PURE__ */ secondsToMilliseconds(o.duration), t.type = "keyframes", t;
};
function inertia({ keyframes: t, velocity: o = 0, power: s = .8, timeConstant: c = 325, bounceDamping: l = 10, bounceStiffness: u = 500, modifyTarget: d, min: f, max: p, restDelta: m = .5, restSpeed: h }) {
	let g = t[0], _ = {
		done: !1,
		value: g
	}, v = (t) => f !== void 0 && t < f || p !== void 0 && t > p, y = (t) => f === void 0 ? p : p === void 0 || Math.abs(f - t) < Math.abs(p - t) ? f : p, b = s * o, x = g + b, S = d === void 0 ? x : d(x);
	S !== x && (b = S - g);
	let C = (t) => -b * Math.exp(-t / c), w = (t) => S + C(t), T = (t) => {
		let o = C(t), s = w(t);
		_.done = Math.abs(o) <= m, _.value = _.done ? S : s;
	}, E, D, O = (t) => {
		v(_.value) && (E = t, D = spring({
			keyframes: [_.value, y(_.value)],
			velocity: calcGeneratorVelocity(w, t, _.value),
			damping: l,
			stiffness: u,
			restDelta: m,
			restSpeed: h
		}));
	};
	return O(0), {
		calculatedDuration: null,
		next: (t) => {
			let o = !1;
			return !D && E === void 0 && (o = !0, T(t), O(t)), E !== void 0 && t >= E ? D.next(t - E) : (!o && T(t), _);
		}
	};
}
function createMixers(t, o, s) {
	let c = [], l = s || MotionGlobalConfig.mix || mix, u = t.length - 1;
	for (let s = 0; s < u; s++) {
		let u = l(t[s], t[s + 1]);
		o && (u = pipe(Array.isArray(o) ? o[s] || noop : o, u)), c.push(u);
	}
	return c;
}
function interpolate(t, o, { clamp: s = !0, ease: c, mixer: l } = {}) {
	let u = t.length;
	if (invariant(u === o.length, "Both input and output ranges must be the same length", "range-length"), u === 1) return () => o[0];
	if (u === 2 && o[0] === o[1]) return () => o[1];
	let d = t[0] === t[1];
	t[0] > t[u - 1] && (t = [...t].reverse(), o = [...o].reverse());
	let f = createMixers(o, c, l), p = f.length, m = (s) => {
		if (d && s < t[0]) return o[0];
		let c = 0;
		if (p > 1) for (; c < t.length - 2 && !(s < t[c + 1]); c++);
		let l = /* @__PURE__ */ progress(t[c], t[c + 1], s);
		return f[c](l);
	};
	return s ? (o) => m(clamp(t[0], t[u - 1], o)) : m;
}
function fillOffset(t, o) {
	let s = t[t.length - 1];
	for (let c = 1; c <= o; c++) {
		let l = /* @__PURE__ */ progress(0, o, c);
		t.push(mixNumber(s, 1, l));
	}
}
function defaultOffset(t) {
	let o = [0];
	return fillOffset(o, t.length - 1), o;
}
function convertOffsetToTimes(t, o) {
	return t.map((t) => t * o);
}
function defaultEasing(t, o) {
	return t.map(() => o || easeInOut).splice(0, t.length - 1);
}
function keyframes({ duration: t = 300, keyframes: o, times: s, ease: c = "easeInOut" }) {
	let l = isEasingArray(c) ? c.map(easingDefinitionToFunction) : easingDefinitionToFunction(c), u = {
		done: !1,
		value: o[0]
	}, d = interpolate(convertOffsetToTimes(s && s.length === o.length ? s : defaultOffset(o), t), o, { ease: Array.isArray(l) ? l : defaultEasing(o, l) });
	return {
		calculatedDuration: t,
		next: (o) => (u.value = d(o), u.done = o >= t, u)
	};
}
var isNotNull$1 = (t) => t !== null;
function getFinalKeyframe$1(t, { repeat: o, repeatType: s = "loop" }, c, l = 1) {
	let u = t.filter(isNotNull$1), d = l < 0 || o && s !== "loop" && o % 2 == 1 ? 0 : u.length - 1;
	return !d || c === void 0 ? u[d] : c;
}
var transitionTypeMap = {
	decay: inertia,
	inertia,
	tween: keyframes,
	keyframes,
	spring
};
function replaceTransitionType(t) {
	typeof t.type == "string" && (t.type = transitionTypeMap[t.type]);
}
var WithPromise = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((t) => {
			this.resolve = t;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(t, o) {
		return this.finished.then(t, o);
	}
}, percentToProgress = (t) => t / 100, JSAnimation = class extends WithPromise {
	constructor(t) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
			let { motionValue: t } = this.options;
			t && t.updatedAt !== time.now() && this.tick(time.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, activeAnimations.mainThread++, this.options = t, this.initAnimation(), this.play(), t.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: t } = this;
		replaceTransitionType(t);
		let { type: o = keyframes, repeat: s = 0, repeatDelay: c = 0, repeatType: l, velocity: u = 0 } = t, { keyframes: d } = t, f = o || keyframes;
		process.env.NODE_ENV !== "production" && f !== keyframes && invariant(d.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${d}`, "spring-two-frames"), f !== keyframes && typeof d[0] != "number" && (this.mixKeyframes = pipe(percentToProgress, mix(d[0], d[1])), d = [0, 100]);
		let p = f({
			...t,
			keyframes: d
		});
		l === "mirror" && (this.mirroredGenerator = f({
			...t,
			keyframes: [...d].reverse(),
			velocity: -u
		})), p.calculatedDuration === null && (p.calculatedDuration = calcGeneratorDuration(p));
		let { calculatedDuration: m } = p;
		this.calculatedDuration = m, this.resolvedDuration = m + c, this.totalDuration = this.resolvedDuration * (s + 1) - c, this.generator = p;
	}
	updateTime(t) {
		let o = Math.round(t - this.startTime) * this.playbackSpeed;
		this.holdTime === null ? this.currentTime = o : this.currentTime = this.holdTime;
	}
	tick(t, o = !1) {
		let { generator: s, totalDuration: c, mixKeyframes: l, mirroredGenerator: u, resolvedDuration: d, calculatedDuration: f } = this;
		if (this.startTime === null) return s.next(0);
		let { delay: p = 0, keyframes: m, repeat: h, repeatType: g, repeatDelay: _, type: v, onUpdate: y, finalKeyframe: b } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, t) : this.speed < 0 && (this.startTime = Math.min(t - c / this.speed, this.startTime)), o ? this.currentTime = t : this.updateTime(t);
		let x = this.currentTime - p * (this.playbackSpeed >= 0 ? 1 : -1), S = this.playbackSpeed >= 0 ? x < 0 : x > c;
		this.currentTime = Math.max(x, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = c);
		let C = this.currentTime, w = s;
		if (h) {
			let t = Math.min(this.currentTime, c) / d, o = Math.floor(t), s = t % 1;
			!s && t >= 1 && (s = 1), s === 1 && o--, o = Math.min(o, h + 1), o % 2 && (g === "reverse" ? (s = 1 - s, _ && (s -= _ / d)) : g === "mirror" && (w = u)), C = clamp(0, 1, s) * d;
		}
		let T = S ? {
			done: !1,
			value: m[0]
		} : w.next(C);
		l && (T.value = l(T.value));
		let { done: E } = T;
		!S && f !== null && (E = this.playbackSpeed >= 0 ? this.currentTime >= c : this.currentTime <= 0);
		let D = this.holdTime === null && (this.state === "finished" || this.state === "running" && E);
		return D && v !== inertia && (T.value = getFinalKeyframe$1(m, this.options, b, this.speed)), y && y(T.value), D && this.finish(), T;
	}
	then(t, o) {
		return this.finished.then(t, o);
	}
	get duration() {
		return /* @__PURE__ */ millisecondsToSeconds(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: t = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(t);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	set time(t) {
		t = /* @__PURE__ */ secondsToMilliseconds(t), this.currentTime = t, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = t : this.driver && (this.startTime = this.driver.now() - t / this.playbackSpeed), this.driver?.start(!1);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(t) {
		this.updateTime(time.now());
		let o = this.playbackSpeed !== t;
		this.playbackSpeed = t, o && (this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: t = frameloopDriver, startTime: o } = this.options;
		this.driver ||= t((t) => this.tick(t)), this.options.onPlay?.();
		let s = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = s) : this.holdTime === null ? this.startTime ||= o ?? s : this.startTime = s - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
	}
	pause() {
		this.state = "paused", this.updateTime(time.now()), this.holdTime = this.currentTime;
	}
	complete() {
		this.state !== "running" && this.play(), this.state = "finished", this.holdTime = null;
	}
	finish() {
		this.notifyFinished(), this.teardown(), this.state = "finished", this.options.onComplete?.();
	}
	cancel() {
		this.holdTime = null, this.startTime = 0, this.tick(0), this.teardown(), this.options.onCancel?.();
	}
	teardown() {
		this.state = "idle", this.stopDriver(), this.startTime = this.holdTime = null, activeAnimations.mainThread--;
	}
	stopDriver() {
		this.driver &&= (this.driver.stop(), void 0);
	}
	sample(t) {
		return this.startTime = 0, this.tick(t, !0);
	}
	attachTimeline(t) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), t.observe(this);
	}
};
function fillWildcards(t) {
	for (let o = 1; o < t.length; o++) t[o] ?? (t[o] = t[o - 1]);
}
var radToDeg = (t) => t * 180 / Math.PI, rotate = (t) => rebaseAngle(radToDeg(Math.atan2(t[1], t[0]))), matrix2dParsers = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (t) => (Math.abs(t[0]) + Math.abs(t[3])) / 2,
	rotate,
	rotateZ: rotate,
	skewX: (t) => radToDeg(Math.atan(t[1])),
	skewY: (t) => radToDeg(Math.atan(t[2])),
	skew: (t) => (Math.abs(t[1]) + Math.abs(t[2])) / 2
}, rebaseAngle = (t) => (t %= 360, t < 0 && (t += 360), t), rotateZ = rotate, scaleX = (t) => Math.sqrt(t[0] * t[0] + t[1] * t[1]), scaleY = (t) => Math.sqrt(t[4] * t[4] + t[5] * t[5]), matrix3dParsers = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX,
	scaleY,
	scale: (t) => (scaleX(t) + scaleY(t)) / 2,
	rotateX: (t) => rebaseAngle(radToDeg(Math.atan2(t[6], t[5]))),
	rotateY: (t) => rebaseAngle(radToDeg(Math.atan2(-t[2], t[0]))),
	rotateZ,
	rotate: rotateZ,
	skewX: (t) => radToDeg(Math.atan(t[4])),
	skewY: (t) => radToDeg(Math.atan(t[1])),
	skew: (t) => (Math.abs(t[1]) + Math.abs(t[4])) / 2
};
function defaultTransformValue(t) {
	return t.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(t, o) {
	if (!t || t === "none") return defaultTransformValue(o);
	let s = t.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), c, l;
	if (s) c = matrix3dParsers, l = s;
	else {
		let o = t.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		c = matrix2dParsers, l = o;
	}
	if (!l) return defaultTransformValue(o);
	let u = c[o], d = l[1].split(",").map(convertTransformToNumber);
	return typeof u == "function" ? u(d) : d[u];
}
var readTransformValue = (t, o) => {
	let { transform: s = "none" } = getComputedStyle(t);
	return parseValueFromTransform(s, o);
};
function convertTransformToNumber(t) {
	return parseFloat(t.trim());
}
var transformPropOrder = [
	"transformPerspective",
	"x",
	"y",
	"z",
	"translateX",
	"translateY",
	"translateZ",
	"scale",
	"scaleX",
	"scaleY",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"skew",
	"skewX",
	"skewY"
], transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))(), isNumOrPxType = (t) => t === number || t === px, transformKeys = new Set([
	"x",
	"y",
	"z"
]), nonTranslationalTransformKeys = transformPropOrder.filter((t) => !transformKeys.has(t));
function removeNonTranslationalTransform(t) {
	let o = [];
	return nonTranslationalTransformKeys.forEach((s) => {
		let c = t.getValue(s);
		c !== void 0 && (o.push([s, c.get()]), c.set(s.startsWith("scale") ? 1 : 0));
	}), o;
}
var positionalValues = {
	width: ({ x: t }, { paddingLeft: o = "0", paddingRight: s = "0" }) => t.max - t.min - parseFloat(o) - parseFloat(s),
	height: ({ y: t }, { paddingTop: o = "0", paddingBottom: s = "0" }) => t.max - t.min - parseFloat(o) - parseFloat(s),
	top: (t, { top: o }) => parseFloat(o),
	left: (t, { left: o }) => parseFloat(o),
	bottom: ({ y: t }, { top: o }) => parseFloat(o) + (t.max - t.min),
	right: ({ x: t }, { left: o }) => parseFloat(o) + (t.max - t.min),
	x: (t, { transform: o }) => parseValueFromTransform(o, "x"),
	y: (t, { transform: o }) => parseValueFromTransform(o, "y")
};
positionalValues.translateX = positionalValues.x, positionalValues.translateY = positionalValues.y;
var toResolve = /* @__PURE__ */ new Set(), isScheduled = !1, anyNeedsMeasurement = !1, isForced = !1;
function measureAllKeyframes() {
	if (anyNeedsMeasurement) {
		let t = Array.from(toResolve).filter((t) => t.needsMeasurement), o = new Set(t.map((t) => t.element)), s = /* @__PURE__ */ new Map();
		o.forEach((t) => {
			let o = removeNonTranslationalTransform(t);
			o.length && (s.set(t, o), t.render());
		}), t.forEach((t) => t.measureInitialState()), o.forEach((t) => {
			t.render();
			let o = s.get(t);
			o && o.forEach(([o, s]) => {
				t.getValue(o)?.set(s);
			});
		}), t.forEach((t) => t.measureEndState()), t.forEach((t) => {
			t.suspendedScrollY !== void 0 && window.scrollTo(0, t.suspendedScrollY);
		});
	}
	anyNeedsMeasurement = !1, isScheduled = !1, toResolve.forEach((t) => t.complete(isForced)), toResolve.clear();
}
function readAllKeyframes() {
	toResolve.forEach((t) => {
		t.readKeyframes(), t.needsMeasurement && (anyNeedsMeasurement = !0);
	});
}
function flushKeyframeResolvers() {
	isForced = !0, readAllKeyframes(), measureAllKeyframes(), isForced = !1;
}
var KeyframeResolver = class {
	constructor(t, o, s, c, l, u = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...t], this.onComplete = o, this.name = s, this.motionValue = c, this.element = l, this.isAsync = u;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (toResolve.add(this), isScheduled || (isScheduled = !0, frame.read(readAllKeyframes), frame.resolveKeyframes(measureAllKeyframes))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: t, name: o, element: s, motionValue: c } = this;
		if (t[0] === null) {
			let l = c?.get(), u = t[t.length - 1];
			if (l !== void 0) t[0] = l;
			else if (s && o) {
				let c = s.readValue(o, u);
				c != null && (t[0] = c);
			}
			t[0] === void 0 && (t[0] = u), c && l === void 0 && c.set(t[0]);
		}
		fillWildcards(t);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(t = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, t), toResolve.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (toResolve.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, isCSSVar = (t) => t.startsWith("--");
function setStyle(t, o, s) {
	isCSSVar(o) ? t.style.setProperty(o, s) : t.style[o] = s;
}
var supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0), supportsFlags = {};
function memoSupports(t, o) {
	let s = /* @__PURE__ */ memo(t);
	return () => supportsFlags[o] ?? s();
}
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), cubicBezierAsString = ([t, o, s, c]) => `cubic-bezier(${t}, ${o}, ${s}, ${c})`, supportedWaapiEasing = {
	linear: "linear",
	ease: "ease",
	easeIn: "ease-in",
	easeOut: "ease-out",
	easeInOut: "ease-in-out",
	circIn: /* @__PURE__ */ cubicBezierAsString([
		0,
		.65,
		.55,
		1
	]),
	circOut: /* @__PURE__ */ cubicBezierAsString([
		.55,
		0,
		1,
		.45
	]),
	backIn: /* @__PURE__ */ cubicBezierAsString([
		.31,
		.01,
		.66,
		-.59
	]),
	backOut: /* @__PURE__ */ cubicBezierAsString([
		.33,
		1.53,
		.69,
		.99
	])
};
function mapEasingToNativeEasing(t, o) {
	if (t) return typeof t == "function" ? supportsLinearEasing() ? generateLinearEasing(t, o) : "ease-out" : isBezierDefinition(t) ? cubicBezierAsString(t) : Array.isArray(t) ? t.map((t) => mapEasingToNativeEasing(t, o) || supportedWaapiEasing.easeOut) : supportedWaapiEasing[t];
}
function startWaapiAnimation(t, o, s, { delay: c = 0, duration: l = 300, repeat: u = 0, repeatType: d = "loop", ease: f = "easeOut", times: p } = {}, m = void 0) {
	let h = { [o]: s };
	p && (h.offset = p);
	let g = mapEasingToNativeEasing(f, l);
	Array.isArray(g) && (h.easing = g), statsBuffer.value && activeAnimations.waapi++;
	let _ = {
		delay: c,
		duration: l,
		easing: Array.isArray(g) ? "linear" : g,
		fill: "both",
		iterations: u + 1,
		direction: d === "reverse" ? "alternate" : "normal"
	};
	m && (_.pseudoElement = m);
	let v = t.animate(h, _);
	return statsBuffer.value && v.finished.finally(() => {
		activeAnimations.waapi--;
	}), v;
}
function isGenerator(t) {
	return typeof t == "function" && "applyToOptions" in t;
}
function applyGeneratorOptions({ type: t, ...o }) {
	return isGenerator(t) && supportsLinearEasing() ? t.applyToOptions(o) : (o.duration ??= 300, o.ease ??= "easeOut", o);
}
var NativeAnimation = class extends WithPromise {
	constructor(t) {
		if (super(), this.finishedTime = null, this.isStopped = !1, !t) return;
		let { element: o, name: s, keyframes: c, pseudoElement: l, allowFlatten: u = !1, finalKeyframe: d, onComplete: f } = t;
		this.isPseudoElement = !!l, this.allowFlatten = u, this.options = t, invariant(typeof t.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let p = applyGeneratorOptions(t);
		this.animation = startWaapiAnimation(o, s, c, p, l), p.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !l) {
				let t = getFinalKeyframe$1(c, this.options, d, this.speed);
				this.updateMotionValue ? this.updateMotionValue(t) : setStyle(o, s, t), this.animation.cancel();
			}
			f?.(), this.notifyFinished();
		};
	}
	play() {
		this.isStopped || (this.animation.play(), this.state === "finished" && this.updateFinished());
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.finish?.();
	}
	cancel() {
		try {
			this.animation.cancel();
		} catch {}
	}
	stop() {
		if (this.isStopped) return;
		this.isStopped = !0;
		let { state: t } = this;
		t === "idle" || t === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		this.isPseudoElement || this.animation.commitStyles?.();
	}
	get duration() {
		let t = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ millisecondsToSeconds(Number(t));
	}
	get iterationDuration() {
		let { delay: t = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(t);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(Number(this.animation.currentTime) || 0);
	}
	set time(t) {
		this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(t);
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(t) {
		t < 0 && (this.finishedTime = null), this.animation.playbackRate = t;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return Number(this.animation.startTime);
	}
	set startTime(t) {
		this.animation.startTime = t;
	}
	attachTimeline({ timeline: t, observe: o }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, t && supportsScrollTimeline() ? (this.animation.timeline = t, noop) : o(this);
	}
}, unsupportedEasingFunctions = {
	anticipate,
	backInOut,
	circInOut
};
function isUnsupportedEase(t) {
	return t in unsupportedEasingFunctions;
}
function replaceStringEasing(t) {
	typeof t.ease == "string" && isUnsupportedEase(t.ease) && (t.ease = unsupportedEasingFunctions[t.ease]);
}
var sampleDelta = 10, NativeAnimationExtended = class extends NativeAnimation {
	constructor(t) {
		replaceStringEasing(t), replaceTransitionType(t), super(t), t.startTime && (this.startTime = t.startTime), this.options = t;
	}
	updateMotionValue(t) {
		let { motionValue: o, onUpdate: s, onComplete: c, element: l, ...u } = this.options;
		if (!o) return;
		if (t !== void 0) {
			o.set(t);
			return;
		}
		let d = new JSAnimation({
			...u,
			autoplay: !1
		}), f = /* @__PURE__ */ secondsToMilliseconds(this.finishedTime ?? this.time);
		o.setWithVelocity(d.sample(f - sampleDelta).value, d.sample(f).value, sampleDelta), d.stop();
	}
}, isAnimatable = (t, o) => o === "zIndex" ? !1 : !!(typeof t == "number" || Array.isArray(t) || typeof t == "string" && (complex.test(t) || t === "0") && !t.startsWith("url("));
function hasKeyframesChanged(t) {
	let o = t[0];
	if (t.length === 1) return !0;
	for (let s = 0; s < t.length; s++) if (t[s] !== o) return !0;
}
function canAnimate(t, o, s, c) {
	let l = t[0];
	if (l === null) return !1;
	if (o === "display" || o === "visibility") return !0;
	let u = t[t.length - 1], d = isAnimatable(l, o), f = isAnimatable(u, o);
	return warning(d === f, `You are trying to animate ${o} from "${l}" to "${u}". "${d ? u : l}" is not an animatable value.`, "value-not-animatable"), !d || !f ? !1 : hasKeyframesChanged(t) || (s === "spring" || isGenerator(s)) && c;
}
function makeAnimationInstant(t) {
	t.duration = 0, t.type = "keyframes";
}
var acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]), supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(t) {
	let { motionValue: o, name: s, repeatDelay: c, repeatType: l, damping: u, type: d } = t;
	if (!(o?.owner?.current instanceof HTMLElement)) return !1;
	let { onUpdate: f, transformTemplate: p } = o.owner.getProps();
	return supportsWaapi() && s && acceleratedValues.has(s) && (s !== "transform" || !p) && !f && !c && l !== "mirror" && u !== 0 && d !== "inertia";
}
var MAX_RESOLVE_DELAY = 40, AsyncMotionValueAnimation = class extends WithPromise {
	constructor({ autoplay: t = !0, delay: o = 0, type: s = "keyframes", repeat: c = 0, repeatDelay: l = 0, repeatType: u = "loop", keyframes: d, name: f, motionValue: p, element: m, ...h }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = time.now();
		let g = {
			autoplay: t,
			delay: o,
			type: s,
			repeat: c,
			repeatDelay: l,
			repeatType: u,
			name: f,
			motionValue: p,
			element: m,
			...h
		};
		this.keyframeResolver = new (m?.KeyframeResolver || KeyframeResolver)(d, (t, o, s) => this.onKeyframesResolved(t, o, g, !s), f, p, m), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(t, o, s, c) {
		this.keyframeResolver = void 0;
		let { name: l, type: u, velocity: d, delay: f, isHandoff: p, onUpdate: m } = s;
		this.resolvedAt = time.now(), canAnimate(t, l, u, d) || ((MotionGlobalConfig.instantAnimations || !f) && m?.(getFinalKeyframe$1(t, s, o)), t[0] = t[t.length - 1], makeAnimationInstant(s), s.repeat = 0);
		let h = {
			startTime: c ? this.resolvedAt && this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: o,
			...s,
			keyframes: t
		}, g = !p && supportsBrowserAnimation(h) ? new NativeAnimationExtended({
			...h,
			element: h.motionValue.owner.current
		}) : new JSAnimation(h);
		g.finished.then(() => this.notifyFinished()).catch(noop), this.pendingTimeline &&= (this.stopTimeline = g.attachTimeline(this.pendingTimeline), void 0), this._animation = g;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(t, o) {
		return this.finished.finally(t).then(() => {});
	}
	get animation() {
		return this._animation || (this.keyframeResolver?.resume(), flushKeyframeResolvers()), this._animation;
	}
	get duration() {
		return this.animation.duration;
	}
	get iterationDuration() {
		return this.animation.iterationDuration;
	}
	get time() {
		return this.animation.time;
	}
	set time(t) {
		this.animation.time = t;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(t) {
		this.animation.speed = t;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(t) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(t) : this.pendingTimeline = t, () => this.stop();
	}
	play() {
		this.animation.play();
	}
	pause() {
		this.animation.pause();
	}
	complete() {
		this.animation.complete();
	}
	cancel() {
		this._animation && this.animation.cancel(), this.keyframeResolver?.cancel();
	}
}, splitCSSVariableRegex = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;
function parseCSSVariable(t) {
	let o = splitCSSVariableRegex.exec(t);
	if (!o) return [,];
	let [, s, c, l] = o;
	return [`--${s ?? c}`, l];
}
var maxDepth = 4;
function getVariableValue(t, o, s = 1) {
	invariant(s <= maxDepth, `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [c, l] = parseCSSVariable(t);
	if (!c) return;
	let u = window.getComputedStyle(o).getPropertyValue(c);
	if (u) {
		let t = u.trim();
		return isNumericalString(t) ? parseFloat(t) : t;
	}
	return isCSSVariableToken(l) ? getVariableValue(l, o, s + 1) : l;
}
function getValueTransition(t, o) {
	return t?.[o] ?? t?.default ?? t;
}
var positionalKeys = new Set([
	"width",
	"height",
	"top",
	"left",
	"right",
	"bottom",
	...transformPropOrder
]), auto = {
	test: (t) => t === "auto",
	parse: (t) => t
}, testValueType = (t) => (o) => o.test(t), dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
], findDimensionValueType = (t) => dimensionValueTypes.find(testValueType(t));
function isNone(t) {
	return typeof t == "number" ? t === 0 : t === null ? !0 : t === "none" || t === "0" || isZeroValueString(t);
}
var maxDefaults = new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(t) {
	let [o, s] = t.slice(0, -1).split("(");
	if (o === "drop-shadow") return t;
	let [c] = s.match(floatRegex) || [];
	if (!c) return t;
	let l = s.replace(c, ""), u = maxDefaults.has(o) ? 1 : 0;
	return c !== s && (u *= 100), o + "(" + u + l + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu, filter = {
	...complex,
	getAnimatableNone: (t) => {
		let o = t.match(functionRegex);
		return o ? o.map(applyDefaultFilter).join(" ") : t;
	}
}, int = {
	...number,
	transform: Math.round
}, numberValueTypes = {
	borderWidth: px,
	borderTopWidth: px,
	borderRightWidth: px,
	borderBottomWidth: px,
	borderLeftWidth: px,
	borderRadius: px,
	radius: px,
	borderTopLeftRadius: px,
	borderTopRightRadius: px,
	borderBottomRightRadius: px,
	borderBottomLeftRadius: px,
	width: px,
	maxWidth: px,
	height: px,
	maxHeight: px,
	top: px,
	right: px,
	bottom: px,
	left: px,
	padding: px,
	paddingTop: px,
	paddingRight: px,
	paddingBottom: px,
	paddingLeft: px,
	margin: px,
	marginTop: px,
	marginRight: px,
	marginBottom: px,
	marginLeft: px,
	backgroundPositionX: px,
	backgroundPositionY: px,
	rotate: degrees,
	rotateX: degrees,
	rotateY: degrees,
	rotateZ: degrees,
	scale,
	scaleX: scale,
	scaleY: scale,
	scaleZ: scale,
	skew: degrees,
	skewX: degrees,
	skewY: degrees,
	distance: px,
	translateX: px,
	translateY: px,
	translateZ: px,
	x: px,
	y: px,
	z: px,
	perspective: px,
	transformPerspective: px,
	opacity: alpha,
	originX: progressPercentage,
	originY: progressPercentage,
	originZ: px,
	zIndex: int,
	fillOpacity: alpha,
	strokeOpacity: alpha,
	numOctaves: int
}, defaultValueTypes = {
	...numberValueTypes,
	color,
	backgroundColor: color,
	outlineColor: color,
	fill: color,
	stroke: color,
	borderColor: color,
	borderTopColor: color,
	borderRightColor: color,
	borderBottomColor: color,
	borderLeftColor: color,
	filter,
	WebkitFilter: filter
}, getDefaultValueType = (t) => defaultValueTypes[t];
function getAnimatableNone(t, o) {
	let s = getDefaultValueType(t);
	return s !== filter && (s = complex), s.getAnimatableNone ? s.getAnimatableNone(o) : void 0;
}
var invalidTemplates = new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(t, o, s) {
	let c = 0, l;
	for (; c < t.length && !l;) {
		let o = t[c];
		typeof o == "string" && !invalidTemplates.has(o) && analyseComplexValue(o).values.length && (l = t[c]), c++;
	}
	if (l && s) for (let c of o) t[c] = getAnimatableNone(s, l);
}
var DOMKeyframesResolver = class extends KeyframeResolver {
	constructor(t, o, s, c, l) {
		super(t, o, s, c, l, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: t, element: o, name: s } = this;
		if (!o || !o.current) return;
		super.readKeyframes();
		for (let s = 0; s < t.length; s++) {
			let c = t[s];
			if (typeof c == "string" && (c = c.trim(), isCSSVariableToken(c))) {
				let l = getVariableValue(c, o.current);
				l !== void 0 && (t[s] = l), s === t.length - 1 && (this.finalKeyframe = c);
			}
		}
		if (this.resolveNoneKeyframes(), !positionalKeys.has(s) || t.length !== 2) return;
		let [c, l] = t, u = findDimensionValueType(c), d = findDimensionValueType(l);
		if (u !== d) if (isNumOrPxType(u) && isNumOrPxType(d)) for (let o = 0; o < t.length; o++) {
			let s = t[o];
			typeof s == "string" && (t[o] = parseFloat(s));
		}
		else positionalValues[s] && (this.needsMeasurement = !0);
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: t, name: o } = this, s = [];
		for (let o = 0; o < t.length; o++) (t[o] === null || isNone(t[o])) && s.push(o);
		s.length && makeNoneKeyframesAnimatable(t, s, o);
	}
	measureInitialState() {
		let { element: t, unresolvedKeyframes: o, name: s } = this;
		if (!t || !t.current) return;
		s === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = positionalValues[s](t.measureViewportBox(), window.getComputedStyle(t.current)), o[0] = this.measuredOrigin;
		let c = o[o.length - 1];
		c !== void 0 && t.getValue(s, c).jump(c, !1);
	}
	measureEndState() {
		let { element: t, name: o, unresolvedKeyframes: s } = this;
		if (!t || !t.current) return;
		let c = t.getValue(o);
		c && c.jump(this.measuredOrigin, !1);
		let l = s.length - 1, u = s[l];
		s[l] = positionalValues[o](t.measureViewportBox(), window.getComputedStyle(t.current)), u !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = u), this.removedTransforms?.length && this.removedTransforms.forEach(([o, s]) => {
			t.getValue(o).set(s);
		}), this.resolveNoneKeyframes();
	}
};
function resolveElements(t, o, s) {
	if (t instanceof EventTarget) return [t];
	if (typeof t == "string") {
		let c = document;
		o && (c = o.current);
		let l = s?.[t] ?? c.querySelectorAll(t);
		return l ? Array.from(l) : [];
	}
	return Array.from(t);
}
var getValueAsType = (t, o) => o && typeof t == "number" ? o.transform(t) : t;
function isHTMLElement(t) {
	return isObject(t) && "offsetHeight" in t;
}
var MAX_VELOCITY_DELTA = 30, isFloat = (t) => !isNaN(parseFloat(t)), collectMotionValues = { current: void 0 }, MotionValue = class {
	constructor(t, o = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (t) => {
			let o = time.now();
			if (this.updatedAt !== o && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(t), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let t of this.dependents) t.dirty();
		}, this.hasAnimated = !1, this.setCurrent(t), this.owner = o.owner;
	}
	setCurrent(t) {
		this.current = t, this.updatedAt = time.now(), this.canTrackVelocity === null && t !== void 0 && (this.canTrackVelocity = isFloat(this.current));
	}
	setPrevFrameValue(t = this.current) {
		this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(t) {
		return process.env.NODE_ENV !== "production" && warnOnce(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", t);
	}
	on(t, o) {
		this.events[t] || (this.events[t] = new SubscriptionManager());
		let s = this.events[t].add(o);
		return t === "change" ? () => {
			s(), frame.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : s;
	}
	clearListeners() {
		for (let t in this.events) this.events[t].clear();
	}
	attach(t, o) {
		this.passiveEffect = t, this.stopPassiveEffect = o;
	}
	set(t) {
		this.passiveEffect ? this.passiveEffect(t, this.updateAndNotify) : this.updateAndNotify(t);
	}
	setWithVelocity(t, o, s) {
		this.set(o), this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - s;
	}
	jump(t, o = !0) {
		this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this.prevFrameValue = void 0, o && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(t) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(t);
	}
	removeDependent(t) {
		this.dependents && this.dependents.delete(t);
	}
	get() {
		return collectMotionValues.current && collectMotionValues.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let t = time.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || t - this.updatedAt > MAX_VELOCITY_DELTA) return 0;
		let o = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
		return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), o);
	}
	start(t) {
		return this.stop(), new Promise((o) => {
			this.hasAnimated = !0, this.animation = t(o), this.events.animationStart && this.events.animationStart.notify();
		}).then(() => {
			this.events.animationComplete && this.events.animationComplete.notify(), this.clearAnimation();
		});
	}
	stop() {
		this.animation && (this.animation.stop(), this.events.animationCancel && this.events.animationCancel.notify()), this.clearAnimation();
	}
	isAnimating() {
		return !!this.animation;
	}
	clearAnimation() {
		delete this.animation;
	}
	destroy() {
		this.dependents?.clear(), this.events.destroy?.notify(), this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
};
function motionValue(t, o) {
	return new MotionValue(t, o);
}
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, !1), isDragging = {
	x: !1,
	y: !1
};
function isDragActive() {
	return isDragging.x || isDragging.y;
}
function setDragLock(t) {
	return t === "x" || t === "y" ? isDragging[t] ? null : (isDragging[t] = !0, () => {
		isDragging[t] = !1;
	}) : isDragging.x || isDragging.y ? null : (isDragging.x = isDragging.y = !0, () => {
		isDragging.x = isDragging.y = !1;
	});
}
function setupGesture(t, o) {
	let s = resolveElements(t), c = new AbortController();
	return [
		s,
		{
			passive: !0,
			...o,
			signal: c.signal
		},
		() => c.abort()
	];
}
function isValidHover(t) {
	return !(t.pointerType === "touch" || isDragActive());
}
function hover(t, o, s = {}) {
	let [c, l, u] = setupGesture(t, s), d = (t) => {
		if (!isValidHover(t)) return;
		let { target: s } = t, c = o(s, t);
		if (typeof c != "function" || !s) return;
		let u = (t) => {
			isValidHover(t) && (c(t), s.removeEventListener("pointerleave", u));
		};
		s.addEventListener("pointerleave", u, l);
	};
	return c.forEach((t) => {
		t.addEventListener("pointerenter", d, l);
	}), u;
}
var isNodeOrChild = (t, o) => o ? t === o ? !0 : isNodeOrChild(t, o.parentElement) : !1, isPrimaryPointer = (t) => t.pointerType === "mouse" ? typeof t.button != "number" || t.button <= 0 : t.isPrimary !== !1, focusableElements = new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function isElementKeyboardAccessible(t) {
	return focusableElements.has(t.tagName) || t.tabIndex !== -1;
}
var isPressing = /* @__PURE__ */ new WeakSet();
function filterEvents(t) {
	return (o) => {
		o.key === "Enter" && t(o);
	};
}
function firePointerEvent(t, o) {
	t.dispatchEvent(new PointerEvent("pointer" + o, {
		isPrimary: !0,
		bubbles: !0
	}));
}
var enableKeyboardPress = (t, o) => {
	let s = t.currentTarget;
	if (!s) return;
	let c = filterEvents(() => {
		if (isPressing.has(s)) return;
		firePointerEvent(s, "down");
		let t = filterEvents(() => {
			firePointerEvent(s, "up");
		});
		s.addEventListener("keyup", t, o), s.addEventListener("blur", () => firePointerEvent(s, "cancel"), o);
	});
	s.addEventListener("keydown", c, o), s.addEventListener("blur", () => s.removeEventListener("keydown", c), o);
};
function isValidPressEvent(t) {
	return isPrimaryPointer(t) && !isDragActive();
}
function press(t, o, s = {}) {
	let [c, l, u] = setupGesture(t, s), d = (t) => {
		let c = t.currentTarget;
		if (!isValidPressEvent(t)) return;
		isPressing.add(c);
		let u = o(c, t), d = (t, o) => {
			window.removeEventListener("pointerup", f), window.removeEventListener("pointercancel", p), isPressing.has(c) && isPressing.delete(c), isValidPressEvent(t) && typeof u == "function" && u(t, { success: o });
		}, f = (t) => {
			d(t, c === window || c === document || s.useGlobalTarget || isNodeOrChild(c, t.target));
		}, p = (t) => {
			d(t, !1);
		};
		window.addEventListener("pointerup", f, l), window.addEventListener("pointercancel", p, l);
	};
	return c.forEach((t) => {
		(s.useGlobalTarget ? window : t).addEventListener("pointerdown", d, l), isHTMLElement(t) && (t.addEventListener("focus", (t) => enableKeyboardPress(t, l)), !isElementKeyboardAccessible(t) && !t.hasAttribute("tabindex") && (t.tabIndex = 0));
	}), u;
}
function isSVGElement(t) {
	return isObject(t) && "ownerSVGElement" in t;
}
function isSVGSVGElement(t) {
	return isSVGElement(t) && t.tagName === "svg";
}
var isMotionValue = (t) => !!(t && t.getVelocity), valueTypes = [
	...dimensionValueTypes,
	color,
	complex
], findValueType = (t) => valueTypes.find(testValueType(t)), MotionConfigContext = createContext({
	transformPagePoint: (t) => t,
	isStatic: !1,
	reducedMotion: "never"
});
function setRef(t, o) {
	if (typeof t == "function") return t(o);
	t != null && (t.current = o);
}
function composeRefs(...t) {
	return (o) => {
		let s = !1, c = t.map((t) => {
			let c = setRef(t, o);
			return !s && typeof c == "function" && (s = !0), c;
		});
		if (s) return () => {
			for (let o = 0; o < c.length; o++) {
				let s = c[o];
				typeof s == "function" ? s() : setRef(t[o], null);
			}
		};
	};
}
function useComposedRefs(...o) {
	return React.useCallback(composeRefs(...o), o);
}
var PopChildMeasure = class extends React.Component {
	getSnapshotBeforeUpdate(t) {
		let o = this.props.childRef.current;
		if (o && t.isPresent && !this.props.isPresent) {
			let t = o.offsetParent, s = isHTMLElement(t) && t.offsetWidth || 0, c = this.props.sizeRef.current;
			c.height = o.offsetHeight || 0, c.width = o.offsetWidth || 0, c.top = o.offsetTop, c.left = o.offsetLeft, c.right = s - c.width - c.left;
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children: o, isPresent: s, anchorX: c, root: l }) {
	let u = useId(), d = useRef(null), f = useRef({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0
	}), { nonce: p } = useContext(MotionConfigContext), h = useComposedRefs(d, o?.ref);
	return useInsertionEffect(() => {
		let { width: t, height: o, top: m, left: h, right: g } = f.current;
		if (s || !d.current || !t || !o) return;
		let _ = c === "left" ? `left: ${h}` : `right: ${g}`;
		d.current.dataset.motionPopId = u;
		let v = document.createElement("style");
		p && (v.nonce = p);
		let y = l ?? document.head;
		return y.appendChild(v), v.sheet && v.sheet.insertRule(`
          [data-motion-pop-id="${u}"] {
            position: absolute !important;
            width: ${t}px !important;
            height: ${o}px !important;
            ${_}px !important;
            top: ${m}px !important;
          }
        `), () => {
			y.contains(v) && y.removeChild(v);
		};
	}, [s]), jsx(PopChildMeasure, {
		isPresent: s,
		childRef: d,
		sizeRef: f,
		children: React.cloneElement(o, { ref: h })
	});
}
var PresenceChild = ({ children: o, initial: s, isPresent: c, onExitComplete: l, custom: u, presenceAffectsLayout: d, mode: f, anchorX: p, root: m }) => {
	let h = useConstant(newChildrenMap), _ = useId(), v = !0, b = useMemo(() => (v = !1, {
		id: _,
		initial: s,
		isPresent: c,
		custom: u,
		onExitComplete: (t) => {
			h.set(t, !0);
			for (let t of h.values()) if (!t) return;
			l && l();
		},
		register: (t) => (h.set(t, !1), () => h.delete(t))
	}), [
		c,
		h,
		l
	]);
	return d && v && (b = { ...b }), useMemo(() => {
		h.forEach((t, o) => h.set(o, !1));
	}, [c]), React.useEffect(() => {
		!c && !h.size && l && l();
	}, [c]), f === "popLayout" && (o = jsx(PopChild, {
		isPresent: c,
		anchorX: p,
		root: m,
		children: o
	})), jsx(PresenceContext.Provider, {
		value: b,
		children: o
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
function usePresence(t = !0) {
	let o = useContext(PresenceContext);
	if (o === null) return [!0, null];
	let { isPresent: s, onExitComplete: c, register: l } = o, u = useId();
	useEffect(() => {
		if (t) return l(u);
	}, [t]);
	let d = useCallback(() => t && c && c(u), [
		u,
		c,
		t
	]);
	return !s && c ? [!1, d] : [!0];
}
var getChildKey = (t) => t.key || "";
function onlyElements(t) {
	let s = [];
	return Children.forEach(t, (t) => {
		isValidElement(t) && s.push(t);
	}), s;
}
var AnimatePresence = ({ children: t, custom: o, initial: s = !0, onExitComplete: c, presenceAffectsLayout: l = !0, mode: u = "sync", propagate: d = !1, anchorX: f = "left", root: p }) => {
	let [h, g] = usePresence(d), _ = useMemo(() => onlyElements(t), [t]), v = d && !h ? [] : _.map(getChildKey), w = useRef(!0), T = useRef(_), E = useConstant(() => /* @__PURE__ */ new Map()), [D, O] = useState(_), [k, A] = useState(_);
	useIsomorphicLayoutEffect(() => {
		w.current = !1, T.current = _;
		for (let t = 0; t < k.length; t++) {
			let o = getChildKey(k[t]);
			v.includes(o) ? E.delete(o) : E.get(o) !== !0 && E.set(o, !1);
		}
	}, [
		k,
		v.length,
		v.join("-")
	]);
	let j = [];
	if (_ !== D) {
		let t = [..._];
		for (let o = 0; o < k.length; o++) {
			let s = k[o], c = getChildKey(s);
			v.includes(c) || (t.splice(o, 0, s), j.push(s));
		}
		return u === "wait" && j.length && (t = j), A(onlyElements(t)), O(_), null;
	}
	process.env.NODE_ENV !== "production" && u === "wait" && k.length > 1 && console.warn("You're attempting to animate multiple children within AnimatePresence, but its mode is set to \"wait\". This will lead to odd visual behaviour.");
	let { forceRender: M } = useContext(LayoutGroupContext);
	return jsx(Fragment$1, { children: k.map((t) => {
		let m = getChildKey(t), y = d && !h ? !1 : _ === k || v.includes(m);
		return jsx(PresenceChild, {
			isPresent: y,
			initial: !w.current || s ? void 0 : !1,
			custom: o,
			presenceAffectsLayout: l,
			mode: u,
			root: p,
			onExitComplete: y ? void 0 : () => {
				if (E.has(m)) E.set(m, !0);
				else return;
				let t = !0;
				E.forEach((o) => {
					o || (t = !1);
				}), t && (M?.(), A(T.current), d && g?.(), c && c());
			},
			anchorX: f,
			children: t
		}, m);
	}) });
}, LazyContext = createContext({ strict: !1 }), featureProps = {
	animation: [
		"animate",
		"variants",
		"whileHover",
		"whileTap",
		"exit",
		"whileInView",
		"whileFocus",
		"whileDrag"
	],
	exit: ["exit"],
	drag: ["drag", "dragControls"],
	focus: ["whileFocus"],
	hover: [
		"whileHover",
		"onHoverStart",
		"onHoverEnd"
	],
	tap: [
		"whileTap",
		"onTap",
		"onTapStart",
		"onTapCancel"
	],
	pan: [
		"onPan",
		"onPanStart",
		"onPanSessionStart",
		"onPanEnd"
	],
	inView: [
		"whileInView",
		"onViewportEnter",
		"onViewportLeave"
	],
	layout: ["layout", "layoutId"]
}, featureDefinitions = {};
for (let t in featureProps) featureDefinitions[t] = { isEnabled: (o) => featureProps[t].some((t) => !!o[t]) };
function loadFeatures(t) {
	for (let o in t) featureDefinitions[o] = {
		...featureDefinitions[o],
		...t[o]
	};
}
var validMotionProps = new Set(/* @__PURE__ */ "animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.ignoreStrict.viewport".split("."));
function isValidMotionProp(t) {
	return t.startsWith("while") || t.startsWith("drag") && t !== "draggable" || t.startsWith("layout") || t.startsWith("onTap") || t.startsWith("onPan") || t.startsWith("onLayout") || validMotionProps.has(t);
}
var is_prop_valid_framer_motion_exports = /* @__PURE__ */ __export({ default: () => is_prop_valid_framer_motion_default }), is_prop_valid_framer_motion_default, init_is_prop_valid_framer_motion = __esmMin((() => {
	throw is_prop_valid_framer_motion_default = {}, Error("Could not resolve \"@emotion/is-prop-valid\" imported by \"framer-motion\". Is it installed?");
})), shouldForward = (t) => !isValidMotionProp(t);
function loadExternalIsValidProp(t) {
	typeof t == "function" && (shouldForward = (o) => o.startsWith("on") ? !isValidMotionProp(o) : t(o));
}
try {
	loadExternalIsValidProp((init_is_prop_valid_framer_motion(), __toCommonJS(is_prop_valid_framer_motion_exports)).default);
} catch {}
function filterProps(t, o, s) {
	let c = {};
	for (let l in t) l === "values" && typeof t.values == "object" || (shouldForward(l) || s === !0 && isValidMotionProp(l) || !o && !isValidMotionProp(l) || t.draggable && l.startsWith("onDrag")) && (c[l] = t[l]);
	return c;
}
var MotionContext = /* @__PURE__ */ createContext({});
function isAnimationControls(t) {
	return typeof t == "object" && !!t && typeof t.start == "function";
}
function isVariantLabel(t) {
	return typeof t == "string" || Array.isArray(t);
}
var variantPriorityOrder = [
	"animate",
	"whileInView",
	"whileFocus",
	"whileHover",
	"whileTap",
	"whileDrag",
	"exit"
], variantProps = ["initial", ...variantPriorityOrder];
function isControllingVariants(t) {
	return isAnimationControls(t.animate) || variantProps.some((o) => isVariantLabel(t[o]));
}
function isVariantNode(t) {
	return !!(isControllingVariants(t) || t.variants);
}
function getCurrentTreeVariants(t, o) {
	if (isControllingVariants(t)) {
		let { initial: o, animate: s } = t;
		return {
			initial: o === !1 || isVariantLabel(o) ? o : void 0,
			animate: isVariantLabel(s) ? s : void 0
		};
	}
	return t.inherit === !1 ? {} : o;
}
function useCreateMotionContext(t) {
	let { initial: o, animate: s } = getCurrentTreeVariants(t, useContext(MotionContext));
	return useMemo(() => ({
		initial: o,
		animate: s
	}), [variantLabelsAsDependency(o), variantLabelsAsDependency(s)]);
}
function variantLabelsAsDependency(t) {
	return Array.isArray(t) ? t.join(" ") : t;
}
function pixelsToPercent(t, o) {
	return o.max === o.min ? 0 : t / (o.max - o.min) * 100;
}
var correctBorderRadius = { correct: (t, o) => {
	if (!o.target) return t;
	if (typeof t == "string") if (px.test(t)) t = parseFloat(t);
	else return t;
	return `${pixelsToPercent(t, o.target.x)}% ${pixelsToPercent(t, o.target.y)}%`;
} }, correctBoxShadow = { correct: (t, { treeScale: o, projectionDelta: s }) => {
	let c = t, l = complex.parse(t);
	if (l.length > 5) return c;
	let u = complex.createTransformer(t), d = typeof l[0] == "number" ? 0 : 1, f = s.x.scale * o.x, p = s.y.scale * o.y;
	l[0 + d] /= f, l[1 + d] /= p;
	let m = mixNumber(f, p, .5);
	return typeof l[2 + d] == "number" && (l[2 + d] /= m), typeof l[3 + d] == "number" && (l[3 + d] /= m), u(l);
} }, scaleCorrectors = {
	borderRadius: {
		...correctBorderRadius,
		applyTo: [
			"borderTopLeftRadius",
			"borderTopRightRadius",
			"borderBottomLeftRadius",
			"borderBottomRightRadius"
		]
	},
	borderTopLeftRadius: correctBorderRadius,
	borderTopRightRadius: correctBorderRadius,
	borderBottomLeftRadius: correctBorderRadius,
	borderBottomRightRadius: correctBorderRadius,
	boxShadow: correctBoxShadow
};
function isForcedMotionValue(t, { layout: o, layoutId: s }) {
	return transformProps.has(t) || t.startsWith("origin") || (o || s !== void 0) && (!!scaleCorrectors[t] || t === "opacity");
}
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, numTransforms = transformPropOrder.length;
function buildTransform(t, o, s) {
	let c = "", l = !0;
	for (let u = 0; u < numTransforms; u++) {
		let d = transformPropOrder[u], f = t[d];
		if (f === void 0) continue;
		let p = !0;
		if (p = typeof f == "number" ? f === (d.startsWith("scale") ? 1 : 0) : parseFloat(f) === 0, !p || s) {
			let t = getValueAsType(f, numberValueTypes[d]);
			if (!p) {
				l = !1;
				let o = translateAlias[d] || d;
				c += `${o}(${t}) `;
			}
			s && (o[d] = t);
		}
	}
	return c = c.trim(), s ? c = s(o, l ? "" : c) : l && (c = "none"), c;
}
function buildHTMLStyles(t, o, s) {
	let { style: c, vars: l, transformOrigin: u } = t, d = !1, f = !1;
	for (let t in o) {
		let s = o[t];
		if (transformProps.has(t)) {
			d = !0;
			continue;
		} else if (isCSSVariableName(t)) {
			l[t] = s;
			continue;
		} else {
			let o = getValueAsType(s, numberValueTypes[t]);
			t.startsWith("origin") ? (f = !0, u[t] = o) : c[t] = o;
		}
	}
	if (o.transform || (d || s ? c.transform = buildTransform(o, t.transform, s) : c.transform &&= "none"), f) {
		let { originX: t = "50%", originY: o = "50%", originZ: s = 0 } = u;
		c.transformOrigin = `${t} ${o} ${s}`;
	}
}
var createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
function copyRawValuesOnly(t, o, s) {
	for (let c in o) !isMotionValue(o[c]) && !isForcedMotionValue(c, s) && (t[c] = o[c]);
}
function useInitialMotionValues({ transformTemplate: t }, o) {
	return useMemo(() => {
		let s = createHtmlRenderState();
		return buildHTMLStyles(s, o, t), Object.assign({}, s.vars, s.style);
	}, [o]);
}
function useStyle(t, o) {
	let s = t.style || {}, c = {};
	return copyRawValuesOnly(c, s, t), Object.assign(c, useInitialMotionValues(t, o)), c;
}
function useHTMLProps(t, o) {
	let s = {}, c = useStyle(t, o);
	return t.drag && t.dragListener !== !1 && (s.draggable = !1, c.userSelect = c.WebkitUserSelect = c.WebkitTouchCallout = "none", c.touchAction = t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`), t.tabIndex === void 0 && (t.onTap || t.onTapStart || t.whileTap) && (s.tabIndex = 0), s.style = c, s;
}
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(t, o, s = 1, c = 0, l = !0) {
	t.pathLength = 1;
	let u = l ? dashKeys : camelKeys;
	t[u.offset] = px.transform(-c);
	let d = px.transform(o), f = px.transform(s);
	t[u.array] = `${d} ${f}`;
}
function buildSVGAttrs(t, { attrX: o, attrY: s, attrScale: c, pathLength: l, pathSpacing: u = 1, pathOffset: d = 0, ...f }, p, m, h) {
	if (buildHTMLStyles(t, f, m), p) {
		t.style.viewBox && (t.attrs.viewBox = t.style.viewBox);
		return;
	}
	t.attrs = t.style, t.style = {};
	let { attrs: g, style: _ } = t;
	g.transform && (_.transform = g.transform, delete g.transform), (_.transform || g.transformOrigin) && (_.transformOrigin = g.transformOrigin ?? "50% 50%", delete g.transformOrigin), _.transform && (_.transformBox = h?.transformBox ?? "fill-box", delete g.transformBox), o !== void 0 && (g.x = o), s !== void 0 && (g.y = s), c !== void 0 && (g.scale = c), l !== void 0 && buildSVGPath(g, l, u, d, !1);
}
var createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
}), isSVGTag = (t) => typeof t == "string" && t.toLowerCase() === "svg";
function useSVGProps(t, o, s, c) {
	let l = useMemo(() => {
		let s = createSvgRenderState();
		return buildSVGAttrs(s, o, isSVGTag(c), t.transformTemplate, t.style), {
			...s.attrs,
			style: { ...s.style }
		};
	}, [o]);
	if (t.style) {
		let o = {};
		copyRawValuesOnly(o, t.style, t), l.style = {
			...o,
			...l.style
		};
	}
	return l;
}
var lowercaseSVGElements = [
	"animate",
	"circle",
	"defs",
	"desc",
	"ellipse",
	"g",
	"image",
	"line",
	"filter",
	"marker",
	"mask",
	"metadata",
	"path",
	"pattern",
	"polygon",
	"polyline",
	"rect",
	"stop",
	"switch",
	"symbol",
	"svg",
	"text",
	"tspan",
	"use",
	"view"
];
function isSVGComponent(t) {
	return typeof t != "string" || t.includes("-") ? !1 : !!(lowercaseSVGElements.indexOf(t) > -1 || /[A-Z]/u.test(t));
}
function useRender(t, o, s, { latestValues: l }, d, f = !1) {
	let p = (isSVGComponent(t) ? useSVGProps : useHTMLProps)(o, l, d, t), m = filterProps(o, typeof t == "string", f), h = t === Fragment ? {} : {
		...m,
		...p,
		ref: s
	}, { children: g } = o, _ = useMemo(() => isMotionValue(g) ? g.get() : g, [g]);
	return createElement(t, {
		...h,
		children: _
	});
}
function getValueState(t) {
	let o = [{}, {}];
	return t?.values.forEach((t, s) => {
		o[0][s] = t.get(), o[1][s] = t.getVelocity();
	}), o;
}
function resolveVariantFromProps(t, o, s, c) {
	if (typeof o == "function") {
		let [l, u] = getValueState(c);
		o = o(s === void 0 ? t.custom : s, l, u);
	}
	if (typeof o == "string" && (o = t.variants && t.variants[o]), typeof o == "function") {
		let [l, u] = getValueState(c);
		o = o(s === void 0 ? t.custom : s, l, u);
	}
	return o;
}
function resolveMotionValue(t) {
	return isMotionValue(t) ? t.get() : t;
}
function makeState({ scrapeMotionValuesFromProps: t, createRenderState: o }, s, c, l) {
	return {
		latestValues: makeLatestValues(s, c, l, t),
		renderState: o()
	};
}
function makeLatestValues(t, o, s, c) {
	let l = {}, u = c(t, {});
	for (let t in u) l[t] = resolveMotionValue(u[t]);
	let { initial: d, animate: f } = t, p = isControllingVariants(t), m = isVariantNode(t);
	o && m && !p && t.inherit !== !1 && (d === void 0 && (d = o.initial), f === void 0 && (f = o.animate));
	let h = s ? s.initial === !1 : !1;
	h ||= d === !1;
	let g = h ? f : d;
	if (g && typeof g != "boolean" && !isAnimationControls(g)) {
		let o = Array.isArray(g) ? g : [g];
		for (let s = 0; s < o.length; s++) {
			let c = resolveVariantFromProps(t, o[s]);
			if (c) {
				let { transitionEnd: t, transition: o, ...s } = c;
				for (let t in s) {
					let o = s[t];
					if (Array.isArray(o)) {
						let t = h ? o.length - 1 : 0;
						o = o[t];
					}
					o !== null && (l[t] = o);
				}
				for (let o in t) l[o] = t[o];
			}
		}
	}
	return l;
}
var makeUseVisualState = (t) => (o, s) => {
	let c = useContext(MotionContext), l = useContext(PresenceContext), u = () => makeState(t, o, c, l);
	return s ? u() : useConstant(u);
};
function scrapeMotionValuesFromProps$1(t, o, s) {
	let { style: c } = t, l = {};
	for (let u in c) (isMotionValue(c[u]) || o.style && isMotionValue(o.style[u]) || isForcedMotionValue(u, t) || s?.getValue(u)?.liveStyle !== void 0) && (l[u] = c[u]);
	return l;
}
var useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
});
function scrapeMotionValuesFromProps(t, o, s) {
	let c = scrapeMotionValuesFromProps$1(t, o, s);
	for (let s in t) if (isMotionValue(t[s]) || isMotionValue(o[s])) {
		let o = transformPropOrder.indexOf(s) === -1 ? s : "attr" + s.charAt(0).toUpperCase() + s.substring(1);
		c[o] = t[s];
	}
	return c;
}
var useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
}), motionComponentSymbol = Symbol.for("motionComponentSymbol");
function isRefObject(t) {
	return t && typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current");
}
function useMotionRef(t, o, s) {
	return useCallback((c) => {
		c && t.onMount && t.onMount(c), o && (c ? o.mount(c) : o.unmount()), s && (typeof s == "function" ? s(c) : isRefObject(s) && (s.current = c));
	}, [o]);
}
var camelToDash = (t) => t.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId"), SwitchLayoutGroupContext = createContext({});
function useVisualElement(t, o, s, c, l) {
	let { visualElement: u } = useContext(MotionContext), d = useContext(LazyContext), f = useContext(PresenceContext), p = useContext(MotionConfigContext).reducedMotion, g = useRef(null);
	c ||= d.renderer, !g.current && c && (g.current = c(t, {
		visualState: o,
		parent: u,
		props: s,
		presenceContext: f,
		blockInitialAnimation: f ? f.initial === !1 : !1,
		reducedMotionConfig: p
	}));
	let v = g.current, y = useContext(SwitchLayoutGroupContext);
	v && !v.projection && l && (v.type === "html" || v.type === "svg") && createProjectionNode$1(g.current, s, l, y);
	let x = useRef(!1);
	useInsertionEffect(() => {
		v && x.current && v.update(s, f);
	});
	let S = s[optimizedAppearDataAttribute], C = useRef(!!S && !window.MotionHandoffIsComplete?.(S) && window.MotionHasOptimisedAnimation?.(S));
	return useIsomorphicLayoutEffect(() => {
		v && (x.current = !0, window.MotionIsMounted = !0, v.updateFeatures(), v.scheduleRenderMicrotask(), C.current && v.animationState && v.animationState.animateChanges());
	}), useEffect(() => {
		v && (!C.current && v.animationState && v.animationState.animateChanges(), C.current &&= (queueMicrotask(() => {
			window.MotionHandoffMarkAsComplete?.(S);
		}), !1), v.enteringChildren = void 0);
	}), v;
}
function createProjectionNode$1(t, o, s, c) {
	let { layoutId: l, layout: u, drag: d, dragConstraints: f, layoutScroll: p, layoutRoot: m, layoutCrossfade: h } = o;
	t.projection = new s(t.latestValues, o["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(t.parent)), t.projection.setOptions({
		layoutId: l,
		layout: u,
		alwaysMeasureLayout: !!d || f && isRefObject(f),
		visualElement: t,
		animationType: typeof u == "string" ? u : "both",
		initialPromotionConfig: c,
		crossfade: h,
		layoutScroll: p,
		layoutRoot: m
	});
}
function getClosestProjectingNode(t) {
	if (t) return t.options.allowProjection === !1 ? getClosestProjectingNode(t.parent) : t.projection;
}
function createMotionComponent(t, { forwardMotionProps: o = !1 } = {}, s, c) {
	s && loadFeatures(s);
	let l = isSVGComponent(t) ? useSVGVisualState : useHTMLVisualState;
	function u(u, d) {
		let f, p = {
			...useContext(MotionConfigContext),
			...u,
			layoutId: useLayoutId(u)
		}, { isStatic: h } = p, g = useCreateMotionContext(u), _ = l(u, h);
		if (!h && isBrowser) {
			useStrictMode(p, s);
			let o = getProjectionFunctionality(p);
			f = o.MeasureLayout, g.visualElement = useVisualElement(t, _, p, c, o.ProjectionNode);
		}
		return jsxs(MotionContext.Provider, {
			value: g,
			children: [f && g.visualElement ? jsx(f, {
				visualElement: g.visualElement,
				...p
			}) : null, useRender(t, u, useMotionRef(_, g.visualElement, d), _, h, o)]
		});
	}
	u.displayName = `motion.${typeof t == "string" ? t : `create(${t.displayName ?? t.name ?? ""})`}`;
	let f = forwardRef(u);
	return f[motionComponentSymbol] = t, f;
}
function useLayoutId({ layoutId: t }) {
	let o = useContext(LayoutGroupContext).id;
	return o && t !== void 0 ? o + "-" + t : t;
}
function useStrictMode(t, o) {
	let s = useContext(LazyContext).strict;
	if (process.env.NODE_ENV !== "production" && o && s) {
		let o = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
		t.ignoreStrict ? warning(!1, o, "lazy-strict-mode") : invariant(!1, o, "lazy-strict-mode");
	}
}
function getProjectionFunctionality(t) {
	let { drag: o, layout: s } = featureDefinitions;
	if (!o && !s) return {};
	let c = {
		...o,
		...s
	};
	return {
		MeasureLayout: o?.isEnabled(t) || s?.isEnabled(t) ? c.MeasureLayout : void 0,
		ProjectionNode: c.ProjectionNode
	};
}
function createMotionProxy(t, o) {
	if (typeof Proxy > "u") return createMotionComponent;
	let s = /* @__PURE__ */ new Map(), c = (s, c) => createMotionComponent(s, c, t, o);
	return new Proxy((t, o) => (process.env.NODE_ENV !== "production" && warnOnce(!1, "motion() is deprecated. Use motion.create() instead."), c(t, o)), { get: (l, u) => u === "create" ? c : (s.has(u) || s.set(u, createMotionComponent(u, void 0, t, o)), s.get(u)) });
}
function convertBoundingBoxToBox({ top: t, left: o, right: s, bottom: c }) {
	return {
		x: {
			min: o,
			max: s
		},
		y: {
			min: t,
			max: c
		}
	};
}
function convertBoxToBoundingBox({ x: t, y: o }) {
	return {
		top: o.min,
		right: t.max,
		bottom: o.max,
		left: t.min
	};
}
function transformBoxPoints(t, o) {
	if (!o) return t;
	let s = o({
		x: t.left,
		y: t.top
	}), c = o({
		x: t.right,
		y: t.bottom
	});
	return {
		top: s.y,
		left: s.x,
		bottom: c.y,
		right: c.x
	};
}
function isIdentityScale(t) {
	return t === void 0 || t === 1;
}
function hasScale({ scale: t, scaleX: o, scaleY: s }) {
	return !isIdentityScale(t) || !isIdentityScale(o) || !isIdentityScale(s);
}
function hasTransform(t) {
	return hasScale(t) || has2DTranslate(t) || t.z || t.rotate || t.rotateX || t.rotateY || t.skewX || t.skewY;
}
function has2DTranslate(t) {
	return is2DTranslate(t.x) || is2DTranslate(t.y);
}
function is2DTranslate(t) {
	return t && t !== "0%";
}
function scalePoint(t, o, s) {
	return s + o * (t - s);
}
function applyPointDelta(t, o, s, c, l) {
	return l !== void 0 && (t = scalePoint(t, l, c)), scalePoint(t, s, c) + o;
}
function applyAxisDelta(t, o = 0, s = 1, c, l) {
	t.min = applyPointDelta(t.min, o, s, c, l), t.max = applyPointDelta(t.max, o, s, c, l);
}
function applyBoxDelta(t, { x: o, y: s }) {
	applyAxisDelta(t.x, o.translate, o.scale, o.originPoint), applyAxisDelta(t.y, s.translate, s.scale, s.originPoint);
}
var TREE_SCALE_SNAP_MIN = .999999999999, TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(t, o, s, c = !1) {
	let l = s.length;
	if (!l) return;
	o.x = o.y = 1;
	let u, d;
	for (let f = 0; f < l; f++) {
		u = s[f], d = u.projectionDelta;
		let { visualElement: l } = u.options;
		l && l.props.style && l.props.style.display === "contents" || (c && u.options.layoutScroll && u.scroll && u !== u.root && transformBox(t, {
			x: -u.scroll.offset.x,
			y: -u.scroll.offset.y
		}), d && (o.x *= d.x.scale, o.y *= d.y.scale, applyBoxDelta(t, d)), c && hasTransform(u.latestValues) && transformBox(t, u.latestValues));
	}
	o.x < TREE_SCALE_SNAP_MAX && o.x > TREE_SCALE_SNAP_MIN && (o.x = 1), o.y < TREE_SCALE_SNAP_MAX && o.y > TREE_SCALE_SNAP_MIN && (o.y = 1);
}
function translateAxis(t, o) {
	t.min += o, t.max += o;
}
function transformAxis(t, o, s, c, l = .5) {
	applyAxisDelta(t, o, s, mixNumber(t.min, t.max, l), c);
}
function transformBox(t, o) {
	transformAxis(t.x, o.x, o.scaleX, o.scale, o.originX), transformAxis(t.y, o.y, o.scaleY, o.scale, o.originY);
}
function measureViewportBox(t, o) {
	return convertBoundingBoxToBox(transformBoxPoints(t.getBoundingClientRect(), o));
}
function measurePageBox(t, o, s) {
	let c = measureViewportBox(t, s), { scroll: l } = o;
	return l && (translateAxis(c.x, l.offset.x), translateAxis(c.y, l.offset.y)), c;
}
var createAxisDelta = () => ({
	translate: 0,
	scale: 1,
	origin: 0,
	originPoint: 0
}), createDelta = () => ({
	x: createAxisDelta(),
	y: createAxisDelta()
}), createAxis = () => ({
	min: 0,
	max: 0
}), createBox = () => ({
	x: createAxis(),
	y: createAxis()
}), prefersReducedMotion = { current: null }, hasReducedMotionListener = { current: !1 };
function initPrefersReducedMotion() {
	if (hasReducedMotionListener.current = !0, isBrowser) if (window.matchMedia) {
		let t = window.matchMedia("(prefers-reduced-motion)"), o = () => prefersReducedMotion.current = t.matches;
		t.addEventListener("change", o), o();
	} else prefersReducedMotion.current = !1;
}
var visualElementStore = /* @__PURE__ */ new WeakMap();
function updateMotionValuesFromProps(t, o, s) {
	for (let c in o) {
		let l = o[c], u = s[c];
		if (isMotionValue(l)) t.addValue(c, l);
		else if (isMotionValue(u)) t.addValue(c, motionValue(l, { owner: t }));
		else if (u !== l) if (t.hasValue(c)) {
			let o = t.getValue(c);
			o.liveStyle === !0 ? o.jump(l) : o.hasAnimated || o.set(l);
		} else {
			let o = t.getStaticValue(c);
			t.addValue(c, motionValue(o === void 0 ? l : o, { owner: t }));
		}
	}
	for (let c in s) o[c] === void 0 && t.removeValue(c);
	return o;
}
var propEventHandlers = [
	"AnimationStart",
	"AnimationComplete",
	"Update",
	"BeforeLayoutMeasure",
	"LayoutMeasure",
	"LayoutAnimationStart",
	"LayoutAnimationComplete"
], VisualElement = class {
	scrapeMotionValuesFromProps(t, o, s) {
		return {};
	}
	constructor({ parent: t, props: o, presenceContext: s, reducedMotionConfig: c, blockInitialAnimation: l, visualState: u }, d = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = KeyframeResolver, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let t = time.now();
			this.renderScheduledAt < t && (this.renderScheduledAt = t, frame.render(this.render, !1, !0));
		};
		let { latestValues: f, renderState: p } = u;
		this.latestValues = f, this.baseTarget = { ...f }, this.initialValues = o.initial ? { ...f } : {}, this.renderState = p, this.parent = t, this.props = o, this.presenceContext = s, this.depth = t ? t.depth + 1 : 0, this.reducedMotionConfig = c, this.options = d, this.blockInitialAnimation = !!l, this.isControllingVariants = isControllingVariants(o), this.isVariantNode = isVariantNode(o), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(t && t.current);
		let { willChange: m, ...h } = this.scrapeMotionValuesFromProps(o, {}, this);
		for (let t in h) {
			let o = h[t];
			f[t] !== void 0 && isMotionValue(o) && o.set(f[t]);
		}
	}
	mount(t) {
		this.current = t, visualElementStore.set(t, this), this.projection && !this.projection.instance && this.projection.mount(t), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((t, o) => this.bindToMotionValue(o, t)), hasReducedMotionListener.current || initPrefersReducedMotion(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : prefersReducedMotion.current, process.env.NODE_ENV !== "production" && warnOnce(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.parent?.addChild(this), this.update(this.props, this.presenceContext);
	}
	unmount() {
		for (let t in this.projection && this.projection.unmount(), cancelFrame(this.notifyUpdate), cancelFrame(this.render), this.valueSubscriptions.forEach((t) => t()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this), this.events) this.events[t].clear();
		for (let t in this.features) {
			let o = this.features[t];
			o && (o.unmount(), o.isMounted = !1);
		}
		this.current = null;
	}
	addChild(t) {
		this.children.add(t), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(t);
	}
	removeChild(t) {
		this.children.delete(t), this.enteringChildren && this.enteringChildren.delete(t);
	}
	bindToMotionValue(t, o) {
		this.valueSubscriptions.has(t) && this.valueSubscriptions.get(t)();
		let s = transformProps.has(t);
		s && this.onBindTransform && this.onBindTransform();
		let c = o.on("change", (o) => {
			this.latestValues[t] = o, this.props.onUpdate && frame.preRender(this.notifyUpdate), s && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), l;
		window.MotionCheckAppearSync && (l = window.MotionCheckAppearSync(this, t, o)), this.valueSubscriptions.set(t, () => {
			c(), l && l(), o.owner && o.stop();
		});
	}
	sortNodePosition(t) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== t.type ? 0 : this.sortInstanceNodePosition(this.current, t.current);
	}
	updateFeatures() {
		let t = "animation";
		for (t in featureDefinitions) {
			let o = featureDefinitions[t];
			if (!o) continue;
			let { isEnabled: s, Feature: c } = o;
			if (!this.features[t] && c && s(this.props) && (this.features[t] = new c(this)), this.features[t]) {
				let o = this.features[t];
				o.isMounted ? o.update() : (o.mount(), o.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
	}
	getStaticValue(t) {
		return this.latestValues[t];
	}
	setStaticValue(t, o) {
		this.latestValues[t] = o;
	}
	update(t, o) {
		(t.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = t, this.prevPresenceContext = this.presenceContext, this.presenceContext = o;
		for (let o = 0; o < propEventHandlers.length; o++) {
			let s = propEventHandlers[o];
			this.propEventSubscriptions[s] && (this.propEventSubscriptions[s](), delete this.propEventSubscriptions[s]);
			let c = t["on" + s];
			c && (this.propEventSubscriptions[s] = this.on(s, c));
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(t, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(t) {
		return this.props.variants ? this.props.variants[t] : void 0;
	}
	getDefaultTransition() {
		return this.props.transition;
	}
	getTransformPagePoint() {
		return this.props.transformPagePoint;
	}
	getClosestVariantNode() {
		return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
	}
	addVariantChild(t) {
		let o = this.getClosestVariantNode();
		if (o) return o.variantChildren && o.variantChildren.add(t), () => o.variantChildren.delete(t);
	}
	addValue(t, o) {
		let s = this.values.get(t);
		o !== s && (s && this.removeValue(t), this.bindToMotionValue(t, o), this.values.set(t, o), this.latestValues[t] = o.get());
	}
	removeValue(t) {
		this.values.delete(t);
		let o = this.valueSubscriptions.get(t);
		o && (o(), this.valueSubscriptions.delete(t)), delete this.latestValues[t], this.removeValueFromRenderState(t, this.renderState);
	}
	hasValue(t) {
		return this.values.has(t);
	}
	getValue(t, o) {
		if (this.props.values && this.props.values[t]) return this.props.values[t];
		let s = this.values.get(t);
		return s === void 0 && o !== void 0 && (s = motionValue(o === null ? void 0 : o, { owner: this }), this.addValue(t, s)), s;
	}
	readValue(t, o) {
		let s = this.latestValues[t] !== void 0 || !this.current ? this.latestValues[t] : this.getBaseTargetFromProps(this.props, t) ?? this.readValueFromInstance(this.current, t, this.options);
		return s != null && (typeof s == "string" && (isNumericalString(s) || isZeroValueString(s)) ? s = parseFloat(s) : !findValueType(s) && complex.test(o) && (s = getAnimatableNone(t, o)), this.setBaseTarget(t, isMotionValue(s) ? s.get() : s)), isMotionValue(s) ? s.get() : s;
	}
	setBaseTarget(t, o) {
		this.baseTarget[t] = o;
	}
	getBaseTarget(t) {
		let { initial: o } = this.props, s;
		if (typeof o == "string" || typeof o == "object") {
			let c = resolveVariantFromProps(this.props, o, this.presenceContext?.custom);
			c && (s = c[t]);
		}
		if (o && s !== void 0) return s;
		let c = this.getBaseTargetFromProps(this.props, t);
		return c !== void 0 && !isMotionValue(c) ? c : this.initialValues[t] !== void 0 && s === void 0 ? void 0 : this.baseTarget[t];
	}
	on(t, o) {
		return this.events[t] || (this.events[t] = new SubscriptionManager()), this.events[t].add(o);
	}
	notify(t, ...o) {
		this.events[t] && this.events[t].notify(...o);
	}
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
}, DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments), this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(t, o) {
		return t.compareDocumentPosition(o) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(t, o) {
		return t.style ? t.style[o] : void 0;
	}
	removeValueFromRenderState(t, { vars: o, style: s }) {
		delete o[t], delete s[t];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: t } = this.props;
		isMotionValue(t) && (this.childSubscription = t.on("change", (t) => {
			this.current && (this.current.textContent = `${t}`);
		}));
	}
};
function renderHTML(t, { style: o, vars: s }, c, l) {
	let u = t.style, d;
	for (d in o) u[d] = o[d];
	for (d in l?.applyProjectionStyles(u, c), s) u.setProperty(d, s[d]);
}
function getComputedStyle$1(t) {
	return window.getComputedStyle(t);
}
var HTMLVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = renderHTML;
	}
	readValueFromInstance(t, o) {
		if (transformProps.has(o)) return this.projection?.isProjecting ? defaultTransformValue(o) : readTransformValue(t, o);
		{
			let s = getComputedStyle$1(t), c = (isCSSVariableName(o) ? s.getPropertyValue(o) : s[o]) || 0;
			return typeof c == "string" ? c.trim() : c;
		}
	}
	measureInstanceViewportBox(t, { transformPagePoint: o }) {
		return measureViewportBox(t, o);
	}
	build(t, o, s) {
		buildHTMLStyles(t, o, s.transformTemplate);
	}
	scrapeMotionValuesFromProps(t, o, s) {
		return scrapeMotionValuesFromProps$1(t, o, s);
	}
}, camelCaseAttributes = new Set([
	"baseFrequency",
	"diffuseConstant",
	"kernelMatrix",
	"kernelUnitLength",
	"keySplines",
	"keyTimes",
	"limitingConeAngle",
	"markerHeight",
	"markerWidth",
	"numOctaves",
	"targetX",
	"targetY",
	"surfaceScale",
	"specularConstant",
	"specularExponent",
	"stdDeviation",
	"tableValues",
	"viewBox",
	"gradientTransform",
	"pathLength",
	"startOffset",
	"textLength",
	"lengthAdjust"
]);
function renderSVG(t, o, s, c) {
	for (let s in renderHTML(t, o, void 0, c), o.attrs) t.setAttribute(camelCaseAttributes.has(s) ? s : camelToDash(s), o.attrs[s]);
}
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = createBox;
	}
	getBaseTargetFromProps(t, o) {
		return t[o];
	}
	readValueFromInstance(t, o) {
		if (transformProps.has(o)) {
			let t = getDefaultValueType(o);
			return t && t.default || 0;
		}
		return o = camelCaseAttributes.has(o) ? o : camelToDash(o), t.getAttribute(o);
	}
	scrapeMotionValuesFromProps(t, o, s) {
		return scrapeMotionValuesFromProps(t, o, s);
	}
	build(t, o, s) {
		buildSVGAttrs(t, o, this.isSVGTag, s.transformTemplate, s.style);
	}
	renderInstance(t, o, s, c) {
		renderSVG(t, o, s, c);
	}
	mount(t) {
		this.isSVGTag = isSVGTag(t.tagName), super.mount(t);
	}
}, createDomVisualElement = (t, o) => isSVGComponent(t) ? new SVGVisualElement(o) : new HTMLVisualElement(o, { allowProjection: t !== Fragment });
function resolveVariant(t, o, s) {
	let c = t.getProps();
	return resolveVariantFromProps(c, o, s === void 0 ? c.custom : s, t);
}
var isKeyframesTarget = (t) => Array.isArray(t);
function setMotionValue(t, o, s) {
	t.hasValue(o) ? t.getValue(o).set(s) : t.addValue(o, motionValue(s));
}
function resolveFinalValueInKeyframes(t) {
	return isKeyframesTarget(t) ? t[t.length - 1] || 0 : t;
}
function setTarget(t, o) {
	let { transitionEnd: s = {}, transition: c = {}, ...l } = resolveVariant(t, o) || {};
	for (let o in l = {
		...l,
		...s
	}, l) setMotionValue(t, o, resolveFinalValueInKeyframes(l[o]));
}
function isWillChangeMotionValue(t) {
	return !!(isMotionValue(t) && t.add);
}
function addValueToWillChange(t, o) {
	let s = t.getValue("willChange");
	if (isWillChangeMotionValue(s)) return s.add(o);
	if (!s && MotionGlobalConfig.WillChange) {
		let s = new MotionGlobalConfig.WillChange("auto");
		t.addValue("willChange", s), s.add(o);
	}
}
function getOptimisedAppearId(t) {
	return t.props[optimizedAppearDataAttribute];
}
var isNotNull = (t) => t !== null;
function getFinalKeyframe(t, { repeat: o, repeatType: s = "loop" }, c) {
	let l = t.filter(isNotNull), u = o && s !== "loop" && o % 2 == 1 ? 0 : l.length - 1;
	return !u || c === void 0 ? l[u] : c;
}
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, criticallyDampedSpring = (t) => ({
	type: "spring",
	stiffness: 550,
	damping: t === 0 ? 2 * Math.sqrt(550) : 30,
	restSpeed: 10
}), keyframesTransition = {
	type: "keyframes",
	duration: .8
}, ease = {
	type: "keyframes",
	ease: [
		.25,
		.1,
		.35,
		1
	],
	duration: .3
}, getDefaultTransition = (t, { keyframes: o }) => o.length > 2 ? keyframesTransition : transformProps.has(t) ? t.startsWith("scale") ? criticallyDampedSpring(o[1]) : underDampedSpring : ease;
function isTransitionDefined({ when: t, delay: o, delayChildren: s, staggerChildren: c, staggerDirection: l, repeat: u, repeatType: d, repeatDelay: f, from: p, elapsed: m, ...h }) {
	return !!Object.keys(h).length;
}
var animateMotionValue = (t, o, s, c = {}, l, u) => (d) => {
	let f = getValueTransition(c, t) || {}, p = f.delay || c.delay || 0, { elapsed: m = 0 } = c;
	m -= /* @__PURE__ */ secondsToMilliseconds(p);
	let h = {
		keyframes: Array.isArray(s) ? s : [null, s],
		ease: "easeOut",
		velocity: o.getVelocity(),
		...f,
		delay: -m,
		onUpdate: (t) => {
			o.set(t), f.onUpdate && f.onUpdate(t);
		},
		onComplete: () => {
			d(), f.onComplete && f.onComplete();
		},
		name: t,
		motionValue: o,
		element: u ? void 0 : l
	};
	isTransitionDefined(f) || Object.assign(h, getDefaultTransition(t, h)), h.duration &&= /* @__PURE__ */ secondsToMilliseconds(h.duration), h.repeatDelay &&= /* @__PURE__ */ secondsToMilliseconds(h.repeatDelay), h.from !== void 0 && (h.keyframes[0] = h.from);
	let g = !1;
	if ((h.type === !1 || h.duration === 0 && !h.repeatDelay) && (makeAnimationInstant(h), h.delay === 0 && (g = !0)), (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) && (g = !0, makeAnimationInstant(h), h.delay = 0), h.allowFlatten = !f.type && !f.ease, g && !u && o.get() !== void 0) {
		let t = getFinalKeyframe(h.keyframes, f);
		if (t !== void 0) {
			frame.update(() => {
				h.onUpdate(t), h.onComplete();
			});
			return;
		}
	}
	return f.isSync ? new JSAnimation(h) : new AsyncMotionValueAnimation(h);
};
function shouldBlockAnimation({ protectedKeys: t, needsAnimating: o }, s) {
	let c = t.hasOwnProperty(s) && o[s] !== !0;
	return o[s] = !1, c;
}
function animateTarget(t, o, { delay: s = 0, transitionOverride: c, type: l } = {}) {
	let { transition: u = t.getDefaultTransition(), transitionEnd: d, ...f } = o;
	c && (u = c);
	let p = [], m = l && t.animationState && t.animationState.getState()[l];
	for (let o in f) {
		let c = t.getValue(o, t.latestValues[o] ?? null), l = f[o];
		if (l === void 0 || m && shouldBlockAnimation(m, o)) continue;
		let d = {
			delay: s,
			...getValueTransition(u || {}, o)
		}, h = c.get();
		if (h !== void 0 && !c.isAnimating && !Array.isArray(l) && l === h && !d.velocity) continue;
		let g = !1;
		if (window.MotionHandoffAnimation) {
			let s = getOptimisedAppearId(t);
			if (s) {
				let t = window.MotionHandoffAnimation(s, o, frame);
				t !== null && (d.startTime = t, g = !0);
			}
		}
		addValueToWillChange(t, o), c.start(animateMotionValue(o, c, l, t.shouldReduceMotion && positionalKeys.has(o) ? { type: !1 } : d, t, g));
		let _ = c.animation;
		_ && p.push(_);
	}
	return d && Promise.all(p).then(() => {
		frame.update(() => {
			d && setTarget(t, d);
		});
	}), p;
}
function calcChildStagger(t, o, s, c = 0, l = 1) {
	let u = Array.from(t).sort((t, o) => t.sortNodePosition(o)).indexOf(o), d = t.size, f = (d - 1) * c;
	return typeof s == "function" ? s(u, d) : l === 1 ? u * c : f - u * c;
}
function animateVariant(t, o, s = {}) {
	let c = resolveVariant(t, o, s.type === "exit" ? t.presenceContext?.custom : void 0), { transition: l = t.getDefaultTransition() || {} } = c || {};
	s.transitionOverride && (l = s.transitionOverride);
	let u = c ? () => Promise.all(animateTarget(t, c, s)) : () => Promise.resolve(), d = t.variantChildren && t.variantChildren.size ? (c = 0) => {
		let { delayChildren: u = 0, staggerChildren: d, staggerDirection: f } = l;
		return animateChildren(t, o, c, u, d, f, s);
	} : () => Promise.resolve(), { when: f } = l;
	if (f) {
		let [t, o] = f === "beforeChildren" ? [u, d] : [d, u];
		return t().then(() => o());
	} else return Promise.all([u(), d(s.delay)]);
}
function animateChildren(t, o, s = 0, c = 0, l = 0, u = 1, d) {
	let f = [];
	for (let p of t.variantChildren) p.notify("AnimationStart", o), f.push(animateVariant(p, o, {
		...d,
		delay: s + (typeof c == "function" ? 0 : c) + calcChildStagger(t.variantChildren, p, c, l, u)
	}).then(() => p.notify("AnimationComplete", o)));
	return Promise.all(f);
}
function animateVisualElement(t, o, s = {}) {
	t.notify("AnimationStart", o);
	let c;
	if (Array.isArray(o)) {
		let l = o.map((o) => animateVariant(t, o, s));
		c = Promise.all(l);
	} else if (typeof o == "string") c = animateVariant(t, o, s);
	else {
		let l = typeof o == "function" ? resolveVariant(t, o, s.custom) : o;
		c = Promise.all(animateTarget(t, l, s));
	}
	return c.then(() => {
		t.notify("AnimationComplete", o);
	});
}
function shallowCompare(t, o) {
	if (!Array.isArray(o)) return !1;
	let s = o.length;
	if (s !== t.length) return !1;
	for (let c = 0; c < s; c++) if (o[c] !== t[c]) return !1;
	return !0;
}
var numVariantProps = variantProps.length;
function getVariantContext(t) {
	if (!t) return;
	if (!t.isControllingVariants) {
		let o = t.parent && getVariantContext(t.parent) || {};
		return t.props.initial !== void 0 && (o.initial = t.props.initial), o;
	}
	let o = {};
	for (let s = 0; s < numVariantProps; s++) {
		let c = variantProps[s], l = t.props[c];
		(isVariantLabel(l) || l === !1) && (o[c] = l);
	}
	return o;
}
var reversePriorityOrder = [...variantPriorityOrder].reverse(), numAnimationTypes = variantPriorityOrder.length;
function animateList(t) {
	return (o) => Promise.all(o.map(({ animation: o, options: s }) => animateVisualElement(t, o, s)));
}
function createAnimationState(t) {
	let o = animateList(t), s = createState(), c = !0, l = (o) => (s, c) => {
		let l = resolveVariant(t, c, o === "exit" ? t.presenceContext?.custom : void 0);
		if (l) {
			let { transition: t, transitionEnd: o, ...c } = l;
			s = {
				...s,
				...c,
				...o
			};
		}
		return s;
	};
	function u(s) {
		o = s(t);
	}
	function d(u) {
		let { props: d } = t, f = getVariantContext(t.parent) || {}, p = [], m = /* @__PURE__ */ new Set(), h = {}, g = Infinity;
		for (let o = 0; o < numAnimationTypes; o++) {
			let _ = reversePriorityOrder[o], v = s[_], y = d[_] === void 0 ? f[_] : d[_], b = isVariantLabel(y), x = _ === u ? v.isActive : null;
			x === !1 && (g = o);
			let S = y === f[_] && y !== d[_] && b;
			if (S && c && t.manuallyAnimateOnMount && (S = !1), v.protectedKeys = { ...h }, !v.isActive && x === null || !y && !v.prevProp || isAnimationControls(y) || typeof y == "boolean") continue;
			let C = checkVariantsDidChange(v.prevProp, y), w = C || _ === u && v.isActive && !S && b || o > g && b, T = !1, E = Array.isArray(y) ? y : [y], D = E.reduce(l(_), {});
			x === !1 && (D = {});
			let { prevResolvedValues: O = {} } = v, k = {
				...O,
				...D
			}, A = (o) => {
				w = !0, m.has(o) && (T = !0, m.delete(o)), v.needsAnimating[o] = !0;
				let s = t.getValue(o);
				s && (s.liveStyle = !1);
			};
			for (let t in k) {
				let o = D[t], s = O[t];
				if (h.hasOwnProperty(t)) continue;
				let c = !1;
				c = isKeyframesTarget(o) && isKeyframesTarget(s) ? !shallowCompare(o, s) : o !== s, c ? o == null ? m.add(t) : A(t) : o !== void 0 && m.has(t) ? A(t) : v.protectedKeys[t] = !0;
			}
			v.prevProp = y, v.prevResolvedValues = D, v.isActive && (h = {
				...h,
				...D
			}), c && t.blockInitialAnimation && (w = !1);
			let j = S && C;
			w && (!j || T) && p.push(...E.map((o) => {
				let s = { type: _ };
				if (typeof o == "string" && c && !j && t.manuallyAnimateOnMount && t.parent) {
					let { parent: c } = t, l = resolveVariant(c, o);
					if (c.enteringChildren && l) {
						let { delayChildren: o } = l.transition || {};
						s.delay = calcChildStagger(c.enteringChildren, t, o);
					}
				}
				return {
					animation: o,
					options: s
				};
			}));
		}
		if (m.size) {
			let o = {};
			if (typeof d.initial != "boolean") {
				let s = resolveVariant(t, Array.isArray(d.initial) ? d.initial[0] : d.initial);
				s && s.transition && (o.transition = s.transition);
			}
			m.forEach((s) => {
				let c = t.getBaseTarget(s), l = t.getValue(s);
				l && (l.liveStyle = !0), o[s] = c ?? null;
			}), p.push({ animation: o });
		}
		let _ = !!p.length;
		return c && (d.initial === !1 || d.initial === d.animate) && !t.manuallyAnimateOnMount && (_ = !1), c = !1, _ ? o(p) : Promise.resolve();
	}
	function f(o, c) {
		if (s[o].isActive === c) return Promise.resolve();
		t.variantChildren?.forEach((t) => t.animationState?.setActive(o, c)), s[o].isActive = c;
		let l = d(o);
		for (let t in s) s[t].protectedKeys = {};
		return l;
	}
	return {
		animateChanges: d,
		setActive: f,
		setAnimateFunction: u,
		getState: () => s,
		reset: () => {
			s = createState();
		}
	};
}
function checkVariantsDidChange(t, o) {
	return typeof o == "string" ? o !== t : Array.isArray(o) ? !shallowCompare(o, t) : !1;
}
function createTypeState(t = !1) {
	return {
		isActive: t,
		protectedKeys: {},
		needsAnimating: {},
		prevResolvedValues: {}
	};
}
function createState() {
	return {
		animate: createTypeState(!0),
		whileInView: createTypeState(),
		whileHover: createTypeState(),
		whileTap: createTypeState(),
		whileDrag: createTypeState(),
		whileFocus: createTypeState(),
		exit: createTypeState()
	};
}
var Feature = class {
	constructor(t) {
		this.isMounted = !1, this.node = t;
	}
	update() {}
}, AnimationFeature = class extends Feature {
	constructor(t) {
		super(t), t.animationState ||= createAnimationState(t);
	}
	updateAnimationControlsSubscription() {
		let { animate: t } = this.node.getProps();
		isAnimationControls(t) && (this.unmountControls = t.subscribe(this.node));
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		let { animate: t } = this.node.getProps(), { animate: o } = this.node.prevProps || {};
		t !== o && this.updateAnimationControlsSubscription();
	}
	unmount() {
		this.node.animationState.reset(), this.unmountControls?.();
	}
}, id$1 = 0, animations = {
	animation: { Feature: AnimationFeature },
	exit: { Feature: class extends Feature {
		constructor() {
			super(...arguments), this.id = id$1++;
		}
		update() {
			if (!this.node.presenceContext) return;
			let { isPresent: t, onExitComplete: o } = this.node.presenceContext, { isPresent: s } = this.node.prevPresenceContext || {};
			if (!this.node.animationState || t === s) return;
			let c = this.node.animationState.setActive("exit", !t);
			o && !t && c.then(() => {
				o(this.id);
			});
		}
		mount() {
			let { register: t, onExitComplete: o } = this.node.presenceContext || {};
			o && o(this.id), t && (this.unmount = t(this.id));
		}
		unmount() {}
	} }
};
function addDomEvent(t, o, s, c = { passive: !0 }) {
	return t.addEventListener(o, s, c), () => t.removeEventListener(o, s);
}
function extractEventInfo(t) {
	return { point: {
		x: t.pageX,
		y: t.pageY
	} };
}
var addPointerInfo = (t) => (o) => isPrimaryPointer(o) && t(o, extractEventInfo(o));
function addPointerEvent(t, o, s, c) {
	return addDomEvent(t, o, addPointerInfo(s), c);
}
var SCALE_PRECISION = 1e-4, SCALE_MIN = 1 - SCALE_PRECISION, SCALE_MAX = 1 + SCALE_PRECISION, TRANSLATE_PRECISION = .01, TRANSLATE_MIN = 0 - TRANSLATE_PRECISION, TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(t) {
	return t.max - t.min;
}
function isNear(t, o, s) {
	return Math.abs(t - o) <= s;
}
function calcAxisDelta(t, o, s, c = .5) {
	t.origin = c, t.originPoint = mixNumber(o.min, o.max, t.origin), t.scale = calcLength(s) / calcLength(o), t.translate = mixNumber(s.min, s.max, t.origin) - t.originPoint, (t.scale >= SCALE_MIN && t.scale <= SCALE_MAX || isNaN(t.scale)) && (t.scale = 1), (t.translate >= TRANSLATE_MIN && t.translate <= TRANSLATE_MAX || isNaN(t.translate)) && (t.translate = 0);
}
function calcBoxDelta(t, o, s, c) {
	calcAxisDelta(t.x, o.x, s.x, c ? c.originX : void 0), calcAxisDelta(t.y, o.y, s.y, c ? c.originY : void 0);
}
function calcRelativeAxis(t, o, s) {
	t.min = s.min + o.min, t.max = t.min + calcLength(o);
}
function calcRelativeBox(t, o, s) {
	calcRelativeAxis(t.x, o.x, s.x), calcRelativeAxis(t.y, o.y, s.y);
}
function calcRelativeAxisPosition(t, o, s) {
	t.min = o.min - s.min, t.max = t.min + calcLength(o);
}
function calcRelativePosition(t, o, s) {
	calcRelativeAxisPosition(t.x, o.x, s.x), calcRelativeAxisPosition(t.y, o.y, s.y);
}
function eachAxis(t) {
	return [t("x"), t("y")];
}
var getContextWindow = ({ current: t }) => t ? t.ownerDocument.defaultView : null, distance = (t, o) => Math.abs(t - o);
function distance2D(t, o) {
	let s = distance(t.x, o.x), c = distance(t.y, o.y);
	return Math.sqrt(s ** 2 + c ** 2);
}
var PanSession = class {
	constructor(t, o, { transformPagePoint: s, contextWindow: c = window, dragSnapToOrigin: l = !1, distanceThreshold: u = 3 } = {}) {
		if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let t = getPanInfo(this.lastMoveEventInfo, this.history), o = this.startEvent !== null, s = distance2D(t.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!o && !s) return;
			let { point: c } = t, { timestamp: l } = frameData;
			this.history.push({
				...c,
				timestamp: l
			});
			let { onStart: u, onMove: d } = this.handlers;
			o || (u && u(this.lastMoveEvent, t), this.startEvent = this.lastMoveEvent), d && d(this.lastMoveEvent, t);
		}, this.handlePointerMove = (t, o) => {
			this.lastMoveEvent = t, this.lastMoveEventInfo = transformPoint(o, this.transformPagePoint), frame.update(this.updatePoint, !0);
		}, this.handlePointerUp = (t, o) => {
			this.end();
			let { onEnd: s, onSessionEnd: c, resumeAnimation: l } = this.handlers;
			if (this.dragSnapToOrigin && l && l(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let u = getPanInfo(t.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(o, this.transformPagePoint), this.history);
			this.startEvent && s && s(t, u), c && c(t, u);
		}, !isPrimaryPointer(t)) return;
		this.dragSnapToOrigin = l, this.handlers = o, this.transformPagePoint = s, this.distanceThreshold = u, this.contextWindow = c || window;
		let d = transformPoint(extractEventInfo(t), this.transformPagePoint), { point: f } = d, { timestamp: p } = frameData;
		this.history = [{
			...f,
			timestamp: p
		}];
		let { onSessionStart: m } = o;
		m && m(t, getPanInfo(d, this.history)), this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
	}
	updateHandlers(t) {
		this.handlers = t;
	}
	end() {
		this.removeListeners && this.removeListeners(), cancelFrame(this.updatePoint);
	}
};
function transformPoint(t, o) {
	return o ? { point: o(t.point) } : t;
}
function subtractPoint(t, o) {
	return {
		x: t.x - o.x,
		y: t.y - o.y
	};
}
function getPanInfo({ point: t }, o) {
	return {
		point: t,
		delta: subtractPoint(t, lastDevicePoint(o)),
		offset: subtractPoint(t, startDevicePoint(o)),
		velocity: getVelocity(o, .1)
	};
}
function startDevicePoint(t) {
	return t[0];
}
function lastDevicePoint(t) {
	return t[t.length - 1];
}
function getVelocity(t, o) {
	if (t.length < 2) return {
		x: 0,
		y: 0
	};
	let s = t.length - 1, c = null, l = lastDevicePoint(t);
	for (; s >= 0 && (c = t[s], !(l.timestamp - c.timestamp > /* @__PURE__ */ secondsToMilliseconds(o)));) s--;
	if (!c) return {
		x: 0,
		y: 0
	};
	let u = /* @__PURE__ */ millisecondsToSeconds(l.timestamp - c.timestamp);
	if (u === 0) return {
		x: 0,
		y: 0
	};
	let d = {
		x: (l.x - c.x) / u,
		y: (l.y - c.y) / u
	};
	return d.x === Infinity && (d.x = 0), d.y === Infinity && (d.y = 0), d;
}
function applyConstraints(t, { min: o, max: s }, c) {
	return o !== void 0 && t < o ? t = c ? mixNumber(o, t, c.min) : Math.max(t, o) : s !== void 0 && t > s && (t = c ? mixNumber(s, t, c.max) : Math.min(t, s)), t;
}
function calcRelativeAxisConstraints(t, o, s) {
	return {
		min: o === void 0 ? void 0 : t.min + o,
		max: s === void 0 ? void 0 : t.max + s - (t.max - t.min)
	};
}
function calcRelativeConstraints(t, { top: o, left: s, bottom: c, right: l }) {
	return {
		x: calcRelativeAxisConstraints(t.x, s, l),
		y: calcRelativeAxisConstraints(t.y, o, c)
	};
}
function calcViewportAxisConstraints(t, o) {
	let s = o.min - t.min, c = o.max - t.max;
	return o.max - o.min < t.max - t.min && ([s, c] = [c, s]), {
		min: s,
		max: c
	};
}
function calcViewportConstraints(t, o) {
	return {
		x: calcViewportAxisConstraints(t.x, o.x),
		y: calcViewportAxisConstraints(t.y, o.y)
	};
}
function calcOrigin(t, o) {
	let s = .5, c = calcLength(t), l = calcLength(o);
	return l > c ? s = /* @__PURE__ */ progress(o.min, o.max - c, t.min) : c > l && (s = /* @__PURE__ */ progress(t.min, t.max - l, o.min)), clamp(0, 1, s);
}
function rebaseAxisConstraints(t, o) {
	let s = {};
	return o.min !== void 0 && (s.min = o.min - t.min), o.max !== void 0 && (s.max = o.max - t.min), s;
}
var defaultElastic = .35;
function resolveDragElastic(t = defaultElastic) {
	return t === !1 ? t = 0 : t === !0 && (t = defaultElastic), {
		x: resolveAxisElastic(t, "left", "right"),
		y: resolveAxisElastic(t, "top", "bottom")
	};
}
function resolveAxisElastic(t, o, s) {
	return {
		min: resolvePointElastic(t, o),
		max: resolvePointElastic(t, s)
	};
}
function resolvePointElastic(t, o) {
	return typeof t == "number" ? t : t[o] || 0;
}
var elementDragControls = /* @__PURE__ */ new WeakMap(), VisualElementDragControls = class {
	constructor(t) {
		this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
			x: 0,
			y: 0
		}, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = createBox(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = t;
	}
	start(t, { snapToCursor: o = !1, distanceThreshold: s } = {}) {
		let { presenceContext: c } = this.visualElement;
		if (c && c.isPresent === !1) return;
		let l = (t) => {
			let { dragSnapToOrigin: s } = this.getProps();
			s ? this.pauseAnimation() : this.stopAnimation(), o && this.snapToCursor(extractEventInfo(t).point);
		}, u = (t, o) => {
			let { drag: s, dragPropagation: c, onDragStart: l } = this.getProps();
			if (s && !c && (this.openDragLock && this.openDragLock(), this.openDragLock = setDragLock(s), !this.openDragLock)) return;
			this.latestPointerEvent = t, this.latestPanInfo = o, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), eachAxis((t) => {
				let o = this.getAxisMotionValue(t).get() || 0;
				if (percent.test(o)) {
					let { projection: s } = this.visualElement;
					if (s && s.layout) {
						let c = s.layout.layoutBox[t];
						c && (o = calcLength(c) * (parseFloat(o) / 100));
					}
				}
				this.originPoint[t] = o;
			}), l && frame.postRender(() => l(t, o)), addValueToWillChange(this.visualElement, "transform");
			let { animationState: u } = this.visualElement;
			u && u.setActive("whileDrag", !0);
		}, d = (t, o) => {
			this.latestPointerEvent = t, this.latestPanInfo = o;
			let { dragPropagation: s, dragDirectionLock: c, onDirectionLock: l, onDrag: u } = this.getProps();
			if (!s && !this.openDragLock) return;
			let { offset: d } = o;
			if (c && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(d), this.currentDirection !== null && l && l(this.currentDirection);
				return;
			}
			this.updateAxis("x", o.point, d), this.updateAxis("y", o.point, d), this.visualElement.render(), u && u(t, o);
		}, f = (t, o) => {
			this.latestPointerEvent = t, this.latestPanInfo = o, this.stop(t, o), this.latestPointerEvent = null, this.latestPanInfo = null;
		}, p = () => eachAxis((t) => this.getAnimationState(t) === "paused" && this.getAxisMotionValue(t).animation?.play()), { dragSnapToOrigin: m } = this.getProps();
		this.panSession = new PanSession(t, {
			onSessionStart: l,
			onStart: u,
			onMove: d,
			onSessionEnd: f,
			resumeAnimation: p
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin: m,
			distanceThreshold: s,
			contextWindow: getContextWindow(this.visualElement)
		});
	}
	stop(t, o) {
		let s = t || this.latestPointerEvent, c = o || this.latestPanInfo, l = this.isDragging;
		if (this.cancel(), !l || !c || !s) return;
		let { velocity: u } = c;
		this.startAnimation(u);
		let { onDragEnd: d } = this.getProps();
		d && frame.postRender(() => d(s, c));
	}
	cancel() {
		this.isDragging = !1;
		let { projection: t, animationState: o } = this.visualElement;
		t && (t.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
		let { dragPropagation: s } = this.getProps();
		!s && this.openDragLock && (this.openDragLock(), this.openDragLock = null), o && o.setActive("whileDrag", !1);
	}
	updateAxis(t, o, s) {
		let { drag: c } = this.getProps();
		if (!s || !shouldDrag(t, c, this.currentDirection)) return;
		let l = this.getAxisMotionValue(t), u = this.originPoint[t] + s[t];
		this.constraints && this.constraints[t] && (u = applyConstraints(u, this.constraints[t], this.elastic[t])), l.set(u);
	}
	resolveConstraints() {
		let { dragConstraints: t, dragElastic: o } = this.getProps(), s = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, c = this.constraints;
		t && isRefObject(t) ? this.constraints ||= this.resolveRefConstraints() : t && s ? this.constraints = calcRelativeConstraints(s.layoutBox, t) : this.constraints = !1, this.elastic = resolveDragElastic(o), c !== this.constraints && s && this.constraints && !this.hasMutatedConstraints && eachAxis((t) => {
			this.constraints !== !1 && this.getAxisMotionValue(t) && (this.constraints[t] = rebaseAxisConstraints(s.layoutBox[t], this.constraints[t]));
		});
	}
	resolveRefConstraints() {
		let { dragConstraints: t, onMeasureDragConstraints: o } = this.getProps();
		if (!t || !isRefObject(t)) return !1;
		let s = t.current;
		invariant(s !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
		let { projection: c } = this.visualElement;
		if (!c || !c.layout) return !1;
		let l = measurePageBox(s, c.root, this.visualElement.getTransformPagePoint()), u = calcViewportConstraints(c.layout.layoutBox, l);
		if (o) {
			let t = o(convertBoxToBoundingBox(u));
			this.hasMutatedConstraints = !!t, t && (u = convertBoundingBoxToBox(t));
		}
		return u;
	}
	startAnimation(t) {
		let { drag: o, dragMomentum: s, dragElastic: c, dragTransition: l, dragSnapToOrigin: u, onDragTransitionEnd: d } = this.getProps(), f = this.constraints || {}, p = eachAxis((d) => {
			if (!shouldDrag(d, o, this.currentDirection)) return;
			let p = f && f[d] || {};
			u && (p = {
				min: 0,
				max: 0
			});
			let m = c ? 200 : 1e6, h = c ? 40 : 1e7, g = {
				type: "inertia",
				velocity: s ? t[d] : 0,
				bounceStiffness: m,
				bounceDamping: h,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...l,
				...p
			};
			return this.startAxisValueAnimation(d, g);
		});
		return Promise.all(p).then(d);
	}
	startAxisValueAnimation(t, o) {
		let s = this.getAxisMotionValue(t);
		return addValueToWillChange(this.visualElement, t), s.start(animateMotionValue(t, s, 0, o, this.visualElement, !1));
	}
	stopAnimation() {
		eachAxis((t) => this.getAxisMotionValue(t).stop());
	}
	pauseAnimation() {
		eachAxis((t) => this.getAxisMotionValue(t).animation?.pause());
	}
	getAnimationState(t) {
		return this.getAxisMotionValue(t).animation?.state;
	}
	getAxisMotionValue(t) {
		let o = `_drag${t.toUpperCase()}`, s = this.visualElement.getProps();
		return s[o] || this.visualElement.getValue(t, (s.initial ? s.initial[t] : void 0) || 0);
	}
	snapToCursor(t) {
		eachAxis((o) => {
			let { drag: s } = this.getProps();
			if (!shouldDrag(o, s, this.currentDirection)) return;
			let { projection: c } = this.visualElement, l = this.getAxisMotionValue(o);
			if (c && c.layout) {
				let { min: s, max: u } = c.layout.layoutBox[o];
				l.set(t[o] - mixNumber(s, u, .5));
			}
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		let { drag: t, dragConstraints: o } = this.getProps(), { projection: s } = this.visualElement;
		if (!isRefObject(o) || !s || !this.constraints) return;
		this.stopAnimation();
		let c = {
			x: 0,
			y: 0
		};
		eachAxis((t) => {
			let o = this.getAxisMotionValue(t);
			if (o && this.constraints !== !1) {
				let s = o.get();
				c[t] = calcOrigin({
					min: s,
					max: s
				}, this.constraints[t]);
			}
		});
		let { transformTemplate: l } = this.visualElement.getProps();
		this.visualElement.current.style.transform = l ? l({}, "") : "none", s.root && s.root.updateScroll(), s.updateLayout(), this.resolveConstraints(), eachAxis((o) => {
			if (!shouldDrag(o, t, null)) return;
			let s = this.getAxisMotionValue(o), { min: l, max: u } = this.constraints[o];
			s.set(mixNumber(l, u, c[o]));
		});
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		let t = this.visualElement.current, o = addPointerEvent(t, "pointerdown", (t) => {
			let { drag: o, dragListener: s = !0 } = this.getProps();
			o && s && this.start(t);
		}), s = () => {
			let { dragConstraints: t } = this.getProps();
			isRefObject(t) && t.current && (this.constraints = this.resolveRefConstraints());
		}, { projection: c } = this.visualElement, l = c.addEventListener("measure", s);
		c && !c.layout && (c.root && c.root.updateScroll(), c.updateLayout()), frame.read(s);
		let u = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints()), d = c.addEventListener("didUpdate", (({ delta: t, hasLayoutChanged: o }) => {
			this.isDragging && o && (eachAxis((o) => {
				let s = this.getAxisMotionValue(o);
				s && (this.originPoint[o] += t[o].translate, s.set(s.get() + t[o].translate));
			}), this.visualElement.render());
		}));
		return () => {
			u(), o(), l(), d && d();
		};
	}
	getProps() {
		let t = this.visualElement.getProps(), { drag: o = !1, dragDirectionLock: s = !1, dragPropagation: c = !1, dragConstraints: l = !1, dragElastic: u = defaultElastic, dragMomentum: d = !0 } = t;
		return {
			...t,
			drag: o,
			dragDirectionLock: s,
			dragPropagation: c,
			dragConstraints: l,
			dragElastic: u,
			dragMomentum: d
		};
	}
};
function shouldDrag(t, o, s) {
	return (o === !0 || o === t) && (s === null || s === t);
}
function getCurrentDirection(t, o = 10) {
	let s = null;
	return Math.abs(t.y) > o ? s = "y" : Math.abs(t.x) > o && (s = "x"), s;
}
var DragGesture = class extends Feature {
	constructor(t) {
		super(t), this.removeGroupControls = noop, this.removeListeners = noop, this.controls = new VisualElementDragControls(t);
	}
	mount() {
		let { dragControls: t } = this.node.getProps();
		t && (this.removeGroupControls = t.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls(), this.removeListeners();
	}
}, asyncHandler = (t) => (o, s) => {
	t && frame.postRender(() => t(o, s));
}, PanGesture = class extends Feature {
	constructor() {
		super(...arguments), this.removePointerDownListener = noop;
	}
	onPointerDown(t) {
		this.session = new PanSession(t, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: getContextWindow(this.node)
		});
	}
	createPanHandlers() {
		let { onPanSessionStart: t, onPanStart: o, onPan: s, onPanEnd: c } = this.node.getProps();
		return {
			onSessionStart: asyncHandler(t),
			onStart: asyncHandler(o),
			onMove: s,
			onEnd: (t, o) => {
				delete this.session, c && frame.postRender(() => c(t, o));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (t) => this.onPointerDown(t));
	}
	update() {
		this.session && this.session.updateHandlers(this.createPanHandlers());
	}
	unmount() {
		this.removePointerDownListener(), this.session && this.session.end();
	}
}, globalProjectionState = {
	hasAnimatedSinceResize: !0,
	hasEverUpdated: !1
}, hasTakenAnySnapshot = !1, MeasureLayoutWithContext = class extends Component {
	componentDidMount() {
		let { visualElement: t, layoutGroup: o, switchLayoutGroup: s, layoutId: c } = this.props, { projection: l } = t;
		l && (o.group && o.group.add(l), s && s.register && c && s.register(l), hasTakenAnySnapshot && l.root.didUpdate(), l.addEventListener("animationComplete", () => {
			this.safeToRemove();
		}), l.setOptions({
			...l.options,
			onExitComplete: () => this.safeToRemove()
		})), globalProjectionState.hasEverUpdated = !0;
	}
	getSnapshotBeforeUpdate(t) {
		let { layoutDependency: o, visualElement: s, drag: c, isPresent: l } = this.props, { projection: u } = s;
		return u ? (u.isPresent = l, hasTakenAnySnapshot = !0, c || t.layoutDependency !== o || o === void 0 || t.isPresent !== l ? u.willUpdate() : this.safeToRemove(), t.isPresent !== l && (l ? u.promote() : u.relegate() || frame.postRender(() => {
			let t = u.getStack();
			(!t || !t.members.length) && this.safeToRemove();
		})), null) : null;
	}
	componentDidUpdate() {
		let { projection: t } = this.props.visualElement;
		t && (t.root.didUpdate(), microtask.postRender(() => {
			!t.currentAnimation && t.isLead() && this.safeToRemove();
		}));
	}
	componentWillUnmount() {
		let { visualElement: t, layoutGroup: o, switchLayoutGroup: s } = this.props, { projection: c } = t;
		hasTakenAnySnapshot = !0, c && (c.scheduleCheckAfterUnmount(), o && o.group && o.group.remove(c), s && s.deregister && s.deregister(c));
	}
	safeToRemove() {
		let { safeToRemove: t } = this.props;
		t && t();
	}
	render() {
		return null;
	}
};
function MeasureLayout(t) {
	let [o, s] = usePresence(), c = useContext(LayoutGroupContext);
	return jsx(MeasureLayoutWithContext, {
		...t,
		layoutGroup: c,
		switchLayoutGroup: useContext(SwitchLayoutGroupContext),
		isPresent: o,
		safeToRemove: s
	});
}
function animateSingleValue(t, o, s) {
	let c = isMotionValue(t) ? t : motionValue(t);
	return c.start(animateMotionValue("", c, o, s)), c.animation;
}
var compareByDepth = (t, o) => t.depth - o.depth, FlatTree = class {
	constructor() {
		this.children = [], this.isDirty = !1;
	}
	add(t) {
		addUniqueItem(this.children, t), this.isDirty = !0;
	}
	remove(t) {
		removeItem(this.children, t), this.isDirty = !0;
	}
	forEach(t) {
		this.isDirty && this.children.sort(compareByDepth), this.isDirty = !1, this.children.forEach(t);
	}
};
function delay(t, o) {
	let s = time.now(), c = ({ timestamp: l }) => {
		let u = l - s;
		u >= o && (cancelFrame(c), t(u - o));
	};
	return frame.setup(c, !0), () => cancelFrame(c);
}
var borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
], numBorders = borders.length, asNumber = (t) => typeof t == "string" ? parseFloat(t) : t, isPx = (t) => typeof t == "number" || px.test(t);
function mixValues(t, o, s, c, l, u) {
	l ? (t.opacity = mixNumber(0, s.opacity ?? 1, easeCrossfadeIn(c)), t.opacityExit = mixNumber(o.opacity ?? 1, 0, easeCrossfadeOut(c))) : u && (t.opacity = mixNumber(o.opacity ?? 1, s.opacity ?? 1, c));
	for (let l = 0; l < numBorders; l++) {
		let u = `border${borders[l]}Radius`, d = getRadius(o, u), f = getRadius(s, u);
		d === void 0 && f === void 0 || (d ||= 0, f ||= 0, d === 0 || f === 0 || isPx(d) === isPx(f) ? (t[u] = Math.max(mixNumber(asNumber(d), asNumber(f), c), 0), (percent.test(f) || percent.test(d)) && (t[u] += "%")) : t[u] = f);
	}
	(o.rotate || s.rotate) && (t.rotate = mixNumber(o.rotate || 0, s.rotate || 0, c));
}
function getRadius(t, o) {
	return t[o] === void 0 ? t.borderRadius : t[o];
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, .5, circOut), easeCrossfadeOut = /* @__PURE__ */ compress(.5, .95, noop);
function compress(t, o, s) {
	return (c) => c < t ? 0 : c > o ? 1 : s(/* @__PURE__ */ progress(t, o, c));
}
function copyAxisInto(t, o) {
	t.min = o.min, t.max = o.max;
}
function copyBoxInto(t, o) {
	copyAxisInto(t.x, o.x), copyAxisInto(t.y, o.y);
}
function copyAxisDeltaInto(t, o) {
	t.translate = o.translate, t.scale = o.scale, t.originPoint = o.originPoint, t.origin = o.origin;
}
function removePointDelta(t, o, s, c, l) {
	return t -= o, t = scalePoint(t, 1 / s, c), l !== void 0 && (t = scalePoint(t, 1 / l, c)), t;
}
function removeAxisDelta(t, o = 0, s = 1, c = .5, l, u = t, d = t) {
	if (percent.test(o) && (o = parseFloat(o), o = mixNumber(d.min, d.max, o / 100) - d.min), typeof o != "number") return;
	let f = mixNumber(u.min, u.max, c);
	t === u && (f -= o), t.min = removePointDelta(t.min, o, s, f, l), t.max = removePointDelta(t.max, o, s, f, l);
}
function removeAxisTransforms(t, o, [s, c, l], u, d) {
	removeAxisDelta(t, o[s], o[c], o[l], o.scale, u, d);
}
var xKeys = [
	"x",
	"scaleX",
	"originX"
], yKeys = [
	"y",
	"scaleY",
	"originY"
];
function removeBoxTransforms(t, o, s, c) {
	removeAxisTransforms(t.x, o, xKeys, s ? s.x : void 0, c ? c.x : void 0), removeAxisTransforms(t.y, o, yKeys, s ? s.y : void 0, c ? c.y : void 0);
}
function isAxisDeltaZero(t) {
	return t.translate === 0 && t.scale === 1;
}
function isDeltaZero(t) {
	return isAxisDeltaZero(t.x) && isAxisDeltaZero(t.y);
}
function axisEquals(t, o) {
	return t.min === o.min && t.max === o.max;
}
function boxEquals(t, o) {
	return axisEquals(t.x, o.x) && axisEquals(t.y, o.y);
}
function axisEqualsRounded(t, o) {
	return Math.round(t.min) === Math.round(o.min) && Math.round(t.max) === Math.round(o.max);
}
function boxEqualsRounded(t, o) {
	return axisEqualsRounded(t.x, o.x) && axisEqualsRounded(t.y, o.y);
}
function aspectRatio(t) {
	return calcLength(t.x) / calcLength(t.y);
}
function axisDeltaEquals(t, o) {
	return t.translate === o.translate && t.scale === o.scale && t.originPoint === o.originPoint;
}
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(t) {
		addUniqueItem(this.members, t), t.scheduleRender();
	}
	remove(t) {
		if (removeItem(this.members, t), t === this.prevLead && (this.prevLead = void 0), t === this.lead) {
			let t = this.members[this.members.length - 1];
			t && this.promote(t);
		}
	}
	relegate(t) {
		let o = this.members.findIndex((o) => t === o);
		if (o === 0) return !1;
		let s;
		for (let t = o; t >= 0; t--) {
			let o = this.members[t];
			if (o.isPresent !== !1) {
				s = o;
				break;
			}
		}
		return s ? (this.promote(s), !0) : !1;
	}
	promote(t, o) {
		let s = this.lead;
		if (t !== s && (this.prevLead = s, this.lead = t, t.show(), s)) {
			s.instance && s.scheduleRender(), t.scheduleRender(), t.resumeFrom = s, o && (t.resumeFrom.preserveOpacity = !0), s.snapshot && (t.snapshot = s.snapshot, t.snapshot.latestValues = s.animationValues || s.latestValues), t.root && t.root.isUpdating && (t.isLayoutDirty = !0);
			let { crossfade: c } = t.options;
			c === !1 && s.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((t) => {
			let { options: o, resumingFrom: s } = t;
			o.onExitComplete && o.onExitComplete(), s && s.options.onExitComplete && s.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((t) => {
			t.instance && t.scheduleRender(!1);
		});
	}
	removeLeadSnapshot() {
		this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
	}
};
function buildProjectionTransform(t, o, s) {
	let c = "", l = t.x.translate / o.x, u = t.y.translate / o.y, d = s?.z || 0;
	if ((l || u || d) && (c = `translate3d(${l}px, ${u}px, ${d}px) `), (o.x !== 1 || o.y !== 1) && (c += `scale(${1 / o.x}, ${1 / o.y}) `), s) {
		let { transformPerspective: t, rotate: o, rotateX: l, rotateY: u, skewX: d, skewY: f } = s;
		t && (c = `perspective(${t}px) ${c}`), o && (c += `rotate(${o}deg) `), l && (c += `rotateX(${l}deg) `), u && (c += `rotateY(${u}deg) `), d && (c += `skewX(${d}deg) `), f && (c += `skewY(${f}deg) `);
	}
	let f = t.x.scale * o.x, p = t.y.scale * o.y;
	return (f !== 1 || p !== 1) && (c += `scale(${f}, ${p})`), c || "none";
}
var metrics = {
	nodes: 0,
	calculatedTargetDeltas: 0,
	calculatedProjections: 0
}, transformAxes = [
	"",
	"X",
	"Y",
	"Z"
], animationTarget = 1e3, id = 0;
function resetDistortingTransform(t, o, s, c) {
	let { latestValues: l } = o;
	l[t] && (s[t] = l[t], o.setStaticValue(t, 0), c && (c[t] = 0));
}
function cancelTreeOptimisedTransformAnimations(t) {
	if (t.hasCheckedOptimisedAppear = !0, t.root === t) return;
	let { visualElement: o } = t.options;
	if (!o) return;
	let s = getOptimisedAppearId(o);
	if (window.MotionHasOptimisedAnimation(s, "transform")) {
		let { layout: o, layoutId: c } = t.options;
		window.MotionCancelOptimisedAnimation(s, "transform", frame, !(o || c));
	}
	let { parent: c } = t;
	c && !c.hasCheckedOptimisedAppear && cancelTreeOptimisedTransformAnimations(c);
}
function createProjectionNode({ attachResizeListener: t, defaultParent: o, measureScroll: s, checkIsScrollRoot: c, resetTransform: l }) {
	return class {
		constructor(t = {}, s = o?.()) {
			this.id = id++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
				x: 1,
				y: 1
			}, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
				this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
			}, this.updateProjection = () => {
				this.projectionUpdateScheduled = !1, statsBuffer.value && (metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0), this.nodes.forEach(propagateDirtyNodes), this.nodes.forEach(resolveTargetDelta), this.nodes.forEach(calcProjection), this.nodes.forEach(cleanDirtyNodes), statsBuffer.addProjectionMetrics && statsBuffer.addProjectionMetrics(metrics);
			}, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = t, this.root = s ? s.root || s : this, this.path = s ? [...s.path, s] : [], this.parent = s, this.depth = s ? s.depth + 1 : 0;
			for (let t = 0; t < this.path.length; t++) this.path[t].shouldResetTransform = !0;
			this.root === this && (this.nodes = new FlatTree());
		}
		addEventListener(t, o) {
			return this.eventHandlers.has(t) || this.eventHandlers.set(t, new SubscriptionManager()), this.eventHandlers.get(t).add(o);
		}
		notifyListeners(t, ...o) {
			let s = this.eventHandlers.get(t);
			s && s.notify(...o);
		}
		hasListeners(t) {
			return this.eventHandlers.has(t);
		}
		mount(o) {
			if (this.instance) return;
			this.isSVG = isSVGElement(o) && !isSVGSVGElement(o), this.instance = o;
			let { layoutId: s, layout: c, visualElement: l } = this.options;
			if (l && !l.current && l.mount(o), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (c || s) && (this.isLayoutDirty = !0), t) {
				let s, c = 0, l = () => this.root.updateBlockedByResize = !1;
				frame.read(() => {
					c = window.innerWidth;
				}), t(o, () => {
					let t = window.innerWidth;
					t !== c && (c = t, this.root.updateBlockedByResize = !0, s && s(), s = delay(l, 250), globalProjectionState.hasAnimatedSinceResize && (globalProjectionState.hasAnimatedSinceResize = !1, this.nodes.forEach(finishAnimation)));
				});
			}
			s && this.root.registerSharedNode(s, this), this.options.animate !== !1 && l && (s || c) && this.addEventListener("didUpdate", ({ delta: t, hasLayoutChanged: o, hasRelativeLayoutChanged: s, layout: c }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0, this.relativeTarget = void 0;
					return;
				}
				let u = this.options.transition || l.getDefaultTransition() || defaultLayoutTransition, { onLayoutAnimationStart: d, onLayoutAnimationComplete: f } = l.getProps(), p = !this.targetLayout || !boxEqualsRounded(this.targetLayout, c), m = !o && s;
				if (this.options.layoutRoot || this.resumeFrom || m || o && (p || !this.currentAnimation)) {
					this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
					let o = {
						...getValueTransition(u, "layout"),
						onPlay: d,
						onComplete: f
					};
					(l.shouldReduceMotion || this.options.layoutRoot) && (o.delay = 0, o.type = !1), this.startAnimation(o), this.setAnimationOrigin(t, m);
				} else o || finishAnimation(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
				this.targetLayout = c;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
			let t = this.getStack();
			t && t.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), cancelFrame(this.updateProjection);
		}
		blockUpdate() {
			this.updateManuallyBlocked = !0;
		}
		unblockUpdate() {
			this.updateManuallyBlocked = !1;
		}
		isUpdateBlocked() {
			return this.updateManuallyBlocked || this.updateBlockedByResize;
		}
		isTreeAnimationBlocked() {
			return this.isAnimationBlocked || this.parent && this.parent.isTreeAnimationBlocked() || !1;
		}
		startUpdate() {
			this.isUpdateBlocked() || (this.isUpdating = !0, this.nodes && this.nodes.forEach(resetSkewAndRotation), this.animationId++);
		}
		getTransformTemplate() {
			let { visualElement: t } = this.options;
			return t && t.getProps().transformTemplate;
		}
		willUpdate(t = !0) {
			if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && cancelTreeOptimisedTransformAnimations(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
			this.isLayoutDirty = !0;
			for (let t = 0; t < this.path.length; t++) {
				let o = this.path[t];
				o.shouldResetTransform = !0, o.updateScroll("snapshot"), o.options.layoutRoot && o.willUpdate(!1);
			}
			let { layoutId: o, layout: s } = this.options;
			if (o === void 0 && !s) return;
			let c = this.getTransformTemplate();
			this.prevTransformTemplateValue = c ? c(this.latestValues, "") : void 0, this.updateSnapshot(), t && this.notifyListeners("willUpdate");
		}
		update() {
			if (this.updateScheduled = !1, this.isUpdateBlocked()) {
				this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(clearMeasurements);
				return;
			}
			if (this.animationId <= this.animationCommitId) {
				this.nodes.forEach(clearIsLayoutDirty);
				return;
			}
			this.animationCommitId = this.animationId, this.isUpdating ? (this.isUpdating = !1, this.nodes.forEach(resetTransformStyle), this.nodes.forEach(updateLayout), this.nodes.forEach(notifyLayoutUpdate)) : this.nodes.forEach(clearIsLayoutDirty), this.clearAllSnapshots();
			let t = time.now();
			frameData.delta = clamp(0, 1e3 / 60, t - frameData.timestamp), frameData.timestamp = t, frameData.isProcessing = !0, frameSteps.update.process(frameData), frameSteps.preRender.process(frameData), frameSteps.render.process(frameData), frameData.isProcessing = !1;
		}
		didUpdate() {
			this.updateScheduled || (this.updateScheduled = !0, microtask.read(this.scheduleUpdate));
		}
		clearAllSnapshots() {
			this.nodes.forEach(clearSnapshot), this.sharedNodes.forEach(removeLeadSnapshots);
		}
		scheduleUpdateProjection() {
			this.projectionUpdateScheduled || (this.projectionUpdateScheduled = !0, frame.preRender(this.updateProjection, !1, !0));
		}
		scheduleCheckAfterUnmount() {
			frame.postRender(() => {
				this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
			});
		}
		updateSnapshot() {
			this.snapshot || !this.instance || (this.snapshot = this.measure(), this.snapshot && !calcLength(this.snapshot.measuredBox.x) && !calcLength(this.snapshot.measuredBox.y) && (this.snapshot = void 0));
		}
		updateLayout() {
			if (!this.instance || (this.updateScroll(), !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)) return;
			if (this.resumeFrom && !this.resumeFrom.instance) for (let t = 0; t < this.path.length; t++) this.path[t].updateScroll();
			let t = this.layout;
			this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = createBox(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
			let { visualElement: o } = this.options;
			o && o.notify("LayoutMeasure", this.layout.layoutBox, t ? t.layoutBox : void 0);
		}
		updateScroll(t = "measure") {
			let o = !!(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === t && (o = !1), o && this.instance) {
				let o = c(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase: t,
					isRoot: o,
					offset: s(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : o
				};
			}
		}
		resetTransform() {
			if (!l) return;
			let t = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, o = this.projectionDelta && !isDeltaZero(this.projectionDelta), s = this.getTransformTemplate(), c = s ? s(this.latestValues, "") : void 0, u = c !== this.prevTransformTemplateValue;
			t && this.instance && (o || hasTransform(this.latestValues) || u) && (l(this.instance, c), this.shouldResetTransform = !1, this.scheduleRender());
		}
		measure(t = !0) {
			let o = this.measurePageBox(), s = this.removeElementScroll(o);
			return t && (s = this.removeTransform(s)), roundBox(s), {
				animationId: this.root.animationId,
				measuredBox: o,
				layoutBox: s,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			let { visualElement: t } = this.options;
			if (!t) return createBox();
			let o = t.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot))) {
				let { scroll: t } = this.root;
				t && (translateAxis(o.x, t.offset.x), translateAxis(o.y, t.offset.y));
			}
			return o;
		}
		removeElementScroll(t) {
			let o = createBox();
			if (copyBoxInto(o, t), this.scroll?.wasRoot) return o;
			for (let s = 0; s < this.path.length; s++) {
				let c = this.path[s], { scroll: l, options: u } = c;
				c !== this.root && l && u.layoutScroll && (l.wasRoot && copyBoxInto(o, t), translateAxis(o.x, l.offset.x), translateAxis(o.y, l.offset.y));
			}
			return o;
		}
		applyTransform(t, o = !1) {
			let s = createBox();
			copyBoxInto(s, t);
			for (let t = 0; t < this.path.length; t++) {
				let c = this.path[t];
				!o && c.options.layoutScroll && c.scroll && c !== c.root && transformBox(s, {
					x: -c.scroll.offset.x,
					y: -c.scroll.offset.y
				}), hasTransform(c.latestValues) && transformBox(s, c.latestValues);
			}
			return hasTransform(this.latestValues) && transformBox(s, this.latestValues), s;
		}
		removeTransform(t) {
			let o = createBox();
			copyBoxInto(o, t);
			for (let t = 0; t < this.path.length; t++) {
				let s = this.path[t];
				if (!s.instance || !hasTransform(s.latestValues)) continue;
				hasScale(s.latestValues) && s.updateSnapshot();
				let c = createBox();
				copyBoxInto(c, s.measurePageBox()), removeBoxTransforms(o, s.latestValues, s.snapshot ? s.snapshot.layoutBox : void 0, c);
			}
			return hasTransform(this.latestValues) && removeBoxTransforms(o, this.latestValues), o;
		}
		setTargetDelta(t) {
			this.targetDelta = t, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
		}
		setOptions(t) {
			this.options = {
				...this.options,
				...t,
				crossfade: t.crossfade === void 0 ? !0 : t.crossfade
			};
		}
		clearMeasurements() {
			this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp && this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(t = !1) {
			let o = this.getLead();
			this.isProjectionDirty ||= o.isProjectionDirty, this.isTransformDirty ||= o.isTransformDirty, this.isSharedProjectionDirty ||= o.isSharedProjectionDirty;
			let s = !!this.resumingFrom || this !== o;
			if (!(t || s && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			let { layout: c, layoutId: l } = this.options;
			if (!this.layout || !(c || l)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			let u = this.getClosestProjectingParent();
			u && this.linkedParentVersion !== u.layoutVersion && !u.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (u && u.layout ? this.createRelativeTarget(u, this.layout.layoutBox, u.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = createBox(), this.targetWithTransforms = createBox()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : copyBoxInto(this.target, this.layout.layoutBox), applyBoxDelta(this.target, this.targetDelta)) : copyBoxInto(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, u && !!u.resumingFrom == !!this.resumingFrom && !u.options.layoutScroll && u.target && this.animationProgress !== 1 ? this.createRelativeTarget(u, this.target, u.target) : this.relativeParent = this.relativeTarget = void 0), statsBuffer.value && metrics.calculatedTargetDeltas++);
		}
		getClosestProjectingParent() {
			if (!(!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(t, o, s) {
			this.relativeParent = t, this.linkedParentVersion = t.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = createBox(), this.relativeTargetOrigin = createBox(), calcRelativePosition(this.relativeTargetOrigin, o, s), copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			let t = this.getLead(), o = !!this.resumingFrom || this !== t, s = !0;
			if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (s = !1), o && (this.isSharedProjectionDirty || this.isTransformDirty) && (s = !1), this.resolvedRelativeTargetAt === frameData.timestamp && (s = !1), s) return;
			let { layout: c, layoutId: l } = this.options;
			if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(c || l)) return;
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			let u = this.treeScale.x, d = this.treeScale.y;
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, o), t.layout && !t.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (t.target = t.layout.layoutBox, t.targetWithTransforms = createBox());
			let { target: f } = t;
			if (!f) {
				this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
				return;
			}
			!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x), copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y)), calcBoxDelta(this.projectionDelta, this.layoutCorrected, f, this.latestValues), (this.treeScale.x !== u || this.treeScale.y !== d || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", f)), statsBuffer.value && metrics.calculatedProjections++;
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(t = !0) {
			if (this.options.visualElement?.scheduleRender(), t) {
				let t = this.getStack();
				t && t.scheduleRender();
			}
			this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = createDelta(), this.projectionDelta = createDelta(), this.projectionDeltaWithTransform = createDelta();
		}
		setAnimationOrigin(t, o = !1) {
			let s = this.snapshot, c = s ? s.latestValues : {}, l = { ...this.latestValues }, u = createDelta();
			(!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !o;
			let d = createBox(), f = (s ? s.source : void 0) !== (this.layout ? this.layout.source : void 0), p = this.getStack(), m = !p || p.members.length <= 1, h = !!(f && !m && this.options.crossfade === !0 && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let g;
			this.mixTargetDelta = (o) => {
				let s = o / 1e3;
				mixAxisDelta(u.x, t.x, s), mixAxisDelta(u.y, t.y, s), this.setTargetDelta(u), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (calcRelativePosition(d, this.layout.layoutBox, this.relativeParent.layout.layoutBox), mixBox(this.relativeTarget, this.relativeTargetOrigin, d, s), g && boxEquals(this.relativeTarget, g) && (this.isProjectionDirty = !1), g ||= createBox(), copyBoxInto(g, this.relativeTarget)), f && (this.animationValues = l, mixValues(l, c, this.latestValues, s, h, m)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = s;
			}, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(t) {
			this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation &&= (cancelFrame(this.pendingAnimation), void 0), this.pendingAnimation = frame.update(() => {
				globalProjectionState.hasAnimatedSinceResize = !0, activeAnimations.layout++, this.motionValue ||= motionValue(0), this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
					...t,
					velocity: 0,
					isSync: !0,
					onUpdate: (o) => {
						this.mixTargetDelta(o), t.onUpdate && t.onUpdate(o);
					},
					onStop: () => {
						activeAnimations.layout--;
					},
					onComplete: () => {
						activeAnimations.layout--, t.onComplete && t.onComplete(), this.completeAnimation();
					}
				}), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
			let t = this.getStack();
			t && t.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(animationTarget), this.currentAnimation.stop()), this.completeAnimation();
		}
		applyTransformsToTarget() {
			let t = this.getLead(), { targetWithTransforms: o, target: s, layout: c, latestValues: l } = t;
			if (!(!o || !s || !c)) {
				if (this !== t && this.layout && c && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, c.layoutBox)) {
					s = this.target || createBox();
					let o = calcLength(this.layout.layoutBox.x);
					s.x.min = t.target.x.min, s.x.max = s.x.min + o;
					let c = calcLength(this.layout.layoutBox.y);
					s.y.min = t.target.y.min, s.y.max = s.y.min + c;
				}
				copyBoxInto(o, s), transformBox(o, l), calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, o, l);
			}
		}
		registerSharedNode(t, o) {
			this.sharedNodes.has(t) || this.sharedNodes.set(t, new NodeStack()), this.sharedNodes.get(t).add(o);
			let s = o.options.initialPromotionConfig;
			o.promote({
				transition: s ? s.transition : void 0,
				preserveFollowOpacity: s && s.shouldPreserveFollowOpacity ? s.shouldPreserveFollowOpacity(o) : void 0
			});
		}
		isLead() {
			let t = this.getStack();
			return t ? t.lead === this : !0;
		}
		getLead() {
			let { layoutId: t } = this.options;
			return t && this.getStack()?.lead || this;
		}
		getPrevLead() {
			let { layoutId: t } = this.options;
			return t ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			let { layoutId: t } = this.options;
			if (t) return this.root.sharedNodes.get(t);
		}
		promote({ needsReset: t, transition: o, preserveFollowOpacity: s } = {}) {
			let c = this.getStack();
			c && c.promote(this, s), t && (this.projectionDelta = void 0, this.needsReset = !0), o && this.setOptions({ transition: o });
		}
		relegate() {
			let t = this.getStack();
			return t ? t.relegate(this) : !1;
		}
		resetSkewAndRotation() {
			let { visualElement: t } = this.options;
			if (!t) return;
			let o = !1, { latestValues: s } = t;
			if ((s.z || s.rotate || s.rotateX || s.rotateY || s.rotateZ || s.skewX || s.skewY) && (o = !0), !o) return;
			let c = {};
			s.z && resetDistortingTransform("z", t, c, this.animationValues);
			for (let o = 0; o < transformAxes.length; o++) resetDistortingTransform(`rotate${transformAxes[o]}`, t, c, this.animationValues), resetDistortingTransform(`skew${transformAxes[o]}`, t, c, this.animationValues);
			for (let o in t.render(), c) t.setStaticValue(o, c[o]), this.animationValues && (this.animationValues[o] = c[o]);
			t.scheduleRender();
		}
		applyProjectionStyles(t, o) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				t.visibility = "hidden";
				return;
			}
			let s = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = !1, t.visibility = "", t.opacity = "", t.pointerEvents = resolveMotionValue(o?.pointerEvents) || "", t.transform = s ? s(this.latestValues, "") : "none";
				return;
			}
			let c = this.getLead();
			if (!this.projectionDelta || !this.layout || !c.target) {
				this.options.layoutId && (t.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity, t.pointerEvents = resolveMotionValue(o?.pointerEvents) || ""), this.hasProjected && !hasTransform(this.latestValues) && (t.transform = s ? s({}, "") : "none", this.hasProjected = !1);
				return;
			}
			t.visibility = "";
			let l = c.animationValues || c.latestValues;
			this.applyTransformsToTarget();
			let u = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, l);
			s && (u = s(l, u)), t.transform = u;
			let { x: d, y: f } = this.projectionDelta;
			for (let o in t.transformOrigin = `${d.origin * 100}% ${f.origin * 100}% 0`, c.animationValues ? t.opacity = c === this ? l.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : l.opacityExit : t.opacity = c === this ? l.opacity === void 0 ? "" : l.opacity : l.opacityExit === void 0 ? 0 : l.opacityExit, scaleCorrectors) {
				if (l[o] === void 0) continue;
				let { correct: s, applyTo: d, isCSSVariable: f } = scaleCorrectors[o], p = u === "none" ? l[o] : s(l[o], c);
				if (d) {
					let o = d.length;
					for (let s = 0; s < o; s++) t[d[s]] = p;
				} else f ? this.options.visualElement.renderState.vars[o] = p : t[o] = p;
			}
			this.options.layoutId && (t.pointerEvents = c === this ? resolveMotionValue(o?.pointerEvents) || "" : "none");
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((t) => t.currentAnimation?.stop()), this.root.nodes.forEach(clearMeasurements), this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(t) {
	t.updateLayout();
}
function notifyLayoutUpdate(t) {
	let o = t.resumeFrom?.snapshot || t.snapshot;
	if (t.isLead() && t.layout && o && t.hasListeners("didUpdate")) {
		let { layoutBox: s, measuredBox: c } = t.layout, { animationType: l } = t.options, u = o.source !== t.layout.source;
		l === "size" ? eachAxis((t) => {
			let c = u ? o.measuredBox[t] : o.layoutBox[t], l = calcLength(c);
			c.min = s[t].min, c.max = c.min + l;
		}) : shouldAnimatePositionOnly(l, o.layoutBox, s) && eachAxis((c) => {
			let l = u ? o.measuredBox[c] : o.layoutBox[c], d = calcLength(s[c]);
			l.max = l.min + d, t.relativeTarget && !t.currentAnimation && (t.isProjectionDirty = !0, t.relativeTarget[c].max = t.relativeTarget[c].min + d);
		});
		let d = createDelta();
		calcBoxDelta(d, s, o.layoutBox);
		let f = createDelta();
		u ? calcBoxDelta(f, t.applyTransform(c, !0), o.measuredBox) : calcBoxDelta(f, s, o.layoutBox);
		let p = !isDeltaZero(d), m = !1;
		if (!t.resumeFrom) {
			let c = t.getClosestProjectingParent();
			if (c && !c.resumeFrom) {
				let { snapshot: l, layout: u } = c;
				if (l && u) {
					let d = createBox();
					calcRelativePosition(d, o.layoutBox, l.layoutBox);
					let f = createBox();
					calcRelativePosition(f, s, u.layoutBox), boxEqualsRounded(d, f) || (m = !0), c.options.layoutRoot && (t.relativeTarget = f, t.relativeTargetOrigin = d, t.relativeParent = c);
				}
			}
		}
		t.notifyListeners("didUpdate", {
			layout: s,
			snapshot: o,
			delta: f,
			layoutDelta: d,
			hasLayoutChanged: p,
			hasRelativeLayoutChanged: m
		});
	} else if (t.isLead()) {
		let { onExitComplete: o } = t.options;
		o && o();
	}
	t.options.transition = void 0;
}
function propagateDirtyNodes(t) {
	statsBuffer.value && metrics.nodes++, t.parent && (t.isProjecting() || (t.isProjectionDirty = t.parent.isProjectionDirty), t.isSharedProjectionDirty ||= !!(t.isProjectionDirty || t.parent.isProjectionDirty || t.parent.isSharedProjectionDirty), t.isTransformDirty ||= t.parent.isTransformDirty);
}
function cleanDirtyNodes(t) {
	t.isProjectionDirty = t.isSharedProjectionDirty = t.isTransformDirty = !1;
}
function clearSnapshot(t) {
	t.clearSnapshot();
}
function clearMeasurements(t) {
	t.clearMeasurements();
}
function clearIsLayoutDirty(t) {
	t.isLayoutDirty = !1;
}
function resetTransformStyle(t) {
	let { visualElement: o } = t.options;
	o && o.getProps().onBeforeLayoutMeasure && o.notify("BeforeLayoutMeasure"), t.resetTransform();
}
function finishAnimation(t) {
	t.finishAnimation(), t.targetDelta = t.relativeTarget = t.target = void 0, t.isProjectionDirty = !0;
}
function resolveTargetDelta(t) {
	t.resolveTargetDelta();
}
function calcProjection(t) {
	t.calcProjection();
}
function resetSkewAndRotation(t) {
	t.resetSkewAndRotation();
}
function removeLeadSnapshots(t) {
	t.removeLeadSnapshot();
}
function mixAxisDelta(t, o, s) {
	t.translate = mixNumber(o.translate, 0, s), t.scale = mixNumber(o.scale, 1, s), t.origin = o.origin, t.originPoint = o.originPoint;
}
function mixAxis(t, o, s, c) {
	t.min = mixNumber(o.min, s.min, c), t.max = mixNumber(o.max, s.max, c);
}
function mixBox(t, o, s, c) {
	mixAxis(t.x, o.x, s.x, c), mixAxis(t.y, o.y, s.y, c);
}
function hasOpacityCrossfade(t) {
	return t.animationValues && t.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
}, userAgentContains = (t) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(t), roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(t) {
	t.min = roundPoint(t.min), t.max = roundPoint(t.max);
}
function roundBox(t) {
	roundAxis(t.x), roundAxis(t.y);
}
function shouldAnimatePositionOnly(t, o, s) {
	return t === "position" || t === "preserve-aspect" && !isNear(aspectRatio(o), aspectRatio(s), .2);
}
function checkNodeWasScrollRoot(t) {
	return t !== t.root && t.scroll?.wasRoot;
}
var DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (t, o) => addDomEvent(t, "resize", o),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => !0
}), rootProjectionNode = { current: void 0 }, HTMLProjectionNode = createProjectionNode({
	measureScroll: (t) => ({
		x: t.scrollLeft,
		y: t.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			let t = new DocumentProjectionNode({});
			t.mount(window), t.setOptions({ layoutScroll: !0 }), rootProjectionNode.current = t;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (t, o) => {
		t.style.transform = o === void 0 ? "none" : o;
	},
	checkIsScrollRoot: (t) => window.getComputedStyle(t).position === "fixed"
}), drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
	}
};
function handleHoverEvent(t, o, s) {
	let { props: c } = t;
	t.animationState && c.whileHover && t.animationState.setActive("whileHover", s === "Start");
	let l = c["onHover" + s];
	l && frame.postRender(() => l(o, extractEventInfo(o)));
}
var HoverGesture = class extends Feature {
	mount() {
		let { current: t } = this.node;
		t && (this.unmount = hover(t, (t, o) => (handleHoverEvent(this.node, o, "Start"), (t) => handleHoverEvent(this.node, t, "End"))));
	}
	unmount() {}
}, FocusGesture = class extends Feature {
	constructor() {
		super(...arguments), this.isActive = !1;
	}
	onFocus() {
		let t = !1;
		try {
			t = this.node.current.matches(":focus-visible");
		} catch {
			t = !0;
		}
		!t || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
	}
	onBlur() {
		!this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
	}
	mount() {
		this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
function handlePressEvent(t, o, s) {
	let { props: c } = t;
	if (t.current instanceof HTMLButtonElement && t.current.disabled) return;
	t.animationState && c.whileTap && t.animationState.setActive("whileTap", s === "Start");
	let l = c["onTap" + (s === "End" ? "" : s)];
	l && frame.postRender(() => l(o, extractEventInfo(o)));
}
var PressGesture = class extends Feature {
	mount() {
		let { current: t } = this.node;
		t && (this.unmount = press(t, (t, o) => (handlePressEvent(this.node, o, "Start"), (t, { success: o }) => handlePressEvent(this.node, t, o ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
	}
	unmount() {}
}, observerCallbacks = /* @__PURE__ */ new WeakMap(), observers = /* @__PURE__ */ new WeakMap(), fireObserverCallback = (t) => {
	let o = observerCallbacks.get(t.target);
	o && o(t);
}, fireAllObserverCallbacks = (t) => {
	t.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root: t, ...o }) {
	let s = t || document;
	observers.has(s) || observers.set(s, {});
	let c = observers.get(s), l = JSON.stringify(o);
	return c[l] || (c[l] = new IntersectionObserver(fireAllObserverCallbacks, {
		root: t,
		...o
	})), c[l];
}
function observeIntersection(t, o, s) {
	let c = initIntersectionObserver(o);
	return observerCallbacks.set(t, s), c.observe(t), () => {
		observerCallbacks.delete(t), c.unobserve(t);
	};
}
var thresholdNames = {
	some: 0,
	all: 1
}, InViewFeature = class extends Feature {
	constructor() {
		super(...arguments), this.hasEnteredView = !1, this.isInView = !1;
	}
	startObserver() {
		this.unmount();
		let { viewport: t = {} } = this.node.getProps(), { root: o, margin: s, amount: c = "some", once: l } = t, u = {
			root: o ? o.current : void 0,
			rootMargin: s,
			threshold: typeof c == "number" ? c : thresholdNames[c]
		};
		return observeIntersection(this.node.current, u, (t) => {
			let { isIntersecting: o } = t;
			if (this.isInView === o || (this.isInView = o, l && !o && this.hasEnteredView)) return;
			o && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", o);
			let { onViewportEnter: s, onViewportLeave: c } = this.node.getProps(), u = o ? s : c;
			u && u(t);
		});
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver > "u") return;
		let { props: t, prevProps: o } = this.node;
		[
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(t, o)) && this.startObserver();
	}
	unmount() {}
};
function hasViewportOptionChanged({ viewport: t = {} }, { viewport: o = {} } = {}) {
	return (s) => t[s] !== o[s];
}
var gestureAnimations = {
	inView: { Feature: InViewFeature },
	tap: { Feature: PressGesture },
	focus: { Feature: FocusGesture },
	hover: { Feature: HoverGesture }
}, layout = { layout: {
	ProjectionNode: HTMLProjectionNode,
	MeasureLayout
} }, motion = /* @__PURE__ */ createMotionProxy({
	...animations,
	...gestureAnimations,
	...drag,
	...layout
}, createDomVisualElement), FilterCollapse_default = (t) => {
	let { defaultExpand: o, title: s, children: c, onClear: l } = t, [u, d] = useState(o ?? !1);
	return /* @__PURE__ */ jsxs("div", {
		className: "text-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center justify-between cursor-pointer",
			onClick: () => {
				d((t) => !t);
			},
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative size-4 children:absolute children:inset-0",
					children: [/* @__PURE__ */ jsx(motion.div, {
						initial: { opacity: 1 },
						animate: { opacity: u ? 0 : 1 },
						children: /* @__PURE__ */ jsx(SquarePlus, { className: "size-4" })
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: u ? 1 : 0 },
						children: /* @__PURE__ */ jsx(SquareMinus, { className: "size-4" })
					})]
				}), /* @__PURE__ */ jsx("span", { children: s })]
			}), /* @__PURE__ */ jsx(BrushCleaning, {
				className: "size-4",
				onClick: (t) => {
					t.stopPropagation(), l?.(t);
				}
			})]
		}), /* @__PURE__ */ jsx(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: u ? "auto" : 0,
				opacity: u ? 1 : 0
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ jsx("div", {
				className: "pt-4",
				children: c
			})
		})]
	});
};
function r(t) {
	var o, s, c = "";
	if (typeof t == "string" || typeof t == "number") c += t;
	else if (typeof t == "object") if (Array.isArray(t)) {
		var l = t.length;
		for (o = 0; o < l; o++) t[o] && (s = r(t[o])) && (c && (c += " "), c += s);
	} else for (s in t) t[s] && (c && (c += " "), c += s);
	return c;
}
function clsx() {
	for (var t, o, s = 0, c = "", l = arguments.length; s < l; s++) (t = arguments[s]) && (o = r(t)) && (c && (c += " "), c += o);
	return c;
}
var concatArrays = (t, o) => {
	let s = Array(t.length + o.length);
	for (let o = 0; o < t.length; o++) s[o] = t[o];
	for (let c = 0; c < o.length; c++) s[t.length + c] = o[c];
	return s;
}, createClassValidatorObject = (t, o) => ({
	classGroupId: t,
	validator: o
}), createClassPartObject = (t = /* @__PURE__ */ new Map(), o = null, s) => ({
	nextPart: t,
	validators: o,
	classGroupId: s
}), CLASS_PART_SEPARATOR = "-", EMPTY_CONFLICTS = [], ARBITRARY_PROPERTY_PREFIX = "arbitrary..", createClassGroupUtils = (t) => {
	let o = createClassMap(t), { conflictingClassGroups: s, conflictingClassGroupModifiers: c } = t;
	return {
		getClassGroupId: (t) => {
			if (t.startsWith("[") && t.endsWith("]")) return getGroupIdForArbitraryProperty(t);
			let s = t.split(CLASS_PART_SEPARATOR);
			return getGroupRecursive(s, s[0] === "" && s.length > 1 ? 1 : 0, o);
		},
		getConflictingClassGroupIds: (t, o) => {
			if (o) {
				let o = c[t], l = s[t];
				return o ? l ? concatArrays(l, o) : o : l || EMPTY_CONFLICTS;
			}
			return s[t] || EMPTY_CONFLICTS;
		}
	};
}, getGroupRecursive = (t, o, s) => {
	if (t.length - o === 0) return s.classGroupId;
	let c = t[o], l = s.nextPart.get(c);
	if (l) {
		let s = getGroupRecursive(t, o + 1, l);
		if (s) return s;
	}
	let u = s.validators;
	if (u === null) return;
	let d = o === 0 ? t.join(CLASS_PART_SEPARATOR) : t.slice(o).join(CLASS_PART_SEPARATOR), f = u.length;
	for (let t = 0; t < f; t++) {
		let o = u[t];
		if (o.validator(d)) return o.classGroupId;
	}
}, getGroupIdForArbitraryProperty = (t) => t.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
	let o = t.slice(1, -1), s = o.indexOf(":"), c = o.slice(0, s);
	return c ? ARBITRARY_PROPERTY_PREFIX + c : void 0;
})(), createClassMap = (t) => {
	let { theme: o, classGroups: s } = t;
	return processClassGroups(s, o);
}, processClassGroups = (t, o) => {
	let s = createClassPartObject();
	for (let c in t) {
		let l = t[c];
		processClassesRecursively(l, s, c, o);
	}
	return s;
}, processClassesRecursively = (t, o, s, c) => {
	let l = t.length;
	for (let u = 0; u < l; u++) {
		let l = t[u];
		processClassDefinition(l, o, s, c);
	}
}, processClassDefinition = (t, o, s, c) => {
	if (typeof t == "string") {
		processStringDefinition(t, o, s);
		return;
	}
	if (typeof t == "function") {
		processFunctionDefinition(t, o, s, c);
		return;
	}
	processObjectDefinition(t, o, s, c);
}, processStringDefinition = (t, o, s) => {
	let c = t === "" ? o : getPart(o, t);
	c.classGroupId = s;
}, processFunctionDefinition = (t, o, s, c) => {
	if (isThemeGetter(t)) {
		processClassesRecursively(t(c), o, s, c);
		return;
	}
	o.validators === null && (o.validators = []), o.validators.push(createClassValidatorObject(s, t));
}, processObjectDefinition = (t, o, s, c) => {
	let l = Object.entries(t), u = l.length;
	for (let t = 0; t < u; t++) {
		let [u, d] = l[t];
		processClassesRecursively(d, getPart(o, u), s, c);
	}
}, getPart = (t, o) => {
	let s = t, c = o.split(CLASS_PART_SEPARATOR), l = c.length;
	for (let t = 0; t < l; t++) {
		let o = c[t], l = s.nextPart.get(o);
		l || (l = createClassPartObject(), s.nextPart.set(o, l)), s = l;
	}
	return s;
}, isThemeGetter = (t) => "isThemeGetter" in t && t.isThemeGetter === !0, createLruCache = (t) => {
	if (t < 1) return {
		get: () => void 0,
		set: () => {}
	};
	let o = 0, s = Object.create(null), c = Object.create(null), l = (l, u) => {
		s[l] = u, o++, o > t && (o = 0, c = s, s = Object.create(null));
	};
	return {
		get(t) {
			let o = s[t];
			if (o !== void 0) return o;
			if ((o = c[t]) !== void 0) return l(t, o), o;
		},
		set(t, o) {
			t in s ? s[t] = o : l(t, o);
		}
	};
}, IMPORTANT_MODIFIER = "!", MODIFIER_SEPARATOR = ":", EMPTY_MODIFIERS = [], createResultObject = (t, o, s, c, l) => ({
	modifiers: t,
	hasImportantModifier: o,
	baseClassName: s,
	maybePostfixModifierPosition: c,
	isExternal: l
}), createParseClassName = (t) => {
	let { prefix: o, experimentalParseClassName: s } = t, c = (t) => {
		let o = [], s = 0, c = 0, l = 0, u, d = t.length;
		for (let f = 0; f < d; f++) {
			let d = t[f];
			if (s === 0 && c === 0) {
				if (d === MODIFIER_SEPARATOR) {
					o.push(t.slice(l, f)), l = f + 1;
					continue;
				}
				if (d === "/") {
					u = f;
					continue;
				}
			}
			d === "[" ? s++ : d === "]" ? s-- : d === "(" ? c++ : d === ")" && c--;
		}
		let f = o.length === 0 ? t : t.slice(l), p = f, m = !1;
		f.endsWith(IMPORTANT_MODIFIER) ? (p = f.slice(0, -1), m = !0) : f.startsWith(IMPORTANT_MODIFIER) && (p = f.slice(1), m = !0);
		let h = u && u > l ? u - l : void 0;
		return createResultObject(o, m, p, h);
	};
	if (o) {
		let t = o + MODIFIER_SEPARATOR, s = c;
		c = (o) => o.startsWith(t) ? s(o.slice(t.length)) : createResultObject(EMPTY_MODIFIERS, !1, o, void 0, !0);
	}
	if (s) {
		let t = c;
		c = (o) => s({
			className: o,
			parseClassName: t
		});
	}
	return c;
}, createSortModifiers = (t) => {
	let o = /* @__PURE__ */ new Map();
	return t.orderSensitiveModifiers.forEach((t, s) => {
		o.set(t, 1e6 + s);
	}), (t) => {
		let s = [], c = [];
		for (let l = 0; l < t.length; l++) {
			let u = t[l], d = u[0] === "[", f = o.has(u);
			d || f ? (c.length > 0 && (c.sort(), s.push(...c), c = []), s.push(u)) : c.push(u);
		}
		return c.length > 0 && (c.sort(), s.push(...c)), s;
	};
}, createConfigUtils = (t) => ({
	cache: createLruCache(t.cacheSize),
	parseClassName: createParseClassName(t),
	sortModifiers: createSortModifiers(t),
	...createClassGroupUtils(t)
}), SPLIT_CLASSES_REGEX = /\s+/, mergeClassList = (t, o) => {
	let { parseClassName: s, getClassGroupId: c, getConflictingClassGroupIds: l, sortModifiers: u } = o, d = [], f = t.trim().split(SPLIT_CLASSES_REGEX), p = "";
	for (let t = f.length - 1; t >= 0; --t) {
		let o = f[t], { isExternal: m, modifiers: h, hasImportantModifier: g, baseClassName: _, maybePostfixModifierPosition: v } = s(o);
		if (m) {
			p = o + (p.length > 0 ? " " + p : p);
			continue;
		}
		let y = !!v, b = c(y ? _.substring(0, v) : _);
		if (!b) {
			if (!y) {
				p = o + (p.length > 0 ? " " + p : p);
				continue;
			}
			if (b = c(_), !b) {
				p = o + (p.length > 0 ? " " + p : p);
				continue;
			}
			y = !1;
		}
		let x = h.length === 0 ? "" : h.length === 1 ? h[0] : u(h).join(":"), S = g ? x + IMPORTANT_MODIFIER : x, C = S + b;
		if (d.indexOf(C) > -1) continue;
		d.push(C);
		let w = l(b, y);
		for (let t = 0; t < w.length; ++t) {
			let o = w[t];
			d.push(S + o);
		}
		p = o + (p.length > 0 ? " " + p : p);
	}
	return p;
}, twJoin = (...t) => {
	let o = 0, s, c, l = "";
	for (; o < t.length;) (s = t[o++]) && (c = toValue(s)) && (l && (l += " "), l += c);
	return l;
}, toValue = (t) => {
	if (typeof t == "string") return t;
	let o, s = "";
	for (let c = 0; c < t.length; c++) t[c] && (o = toValue(t[c])) && (s && (s += " "), s += o);
	return s;
}, createTailwindMerge = (t, ...o) => {
	let s, c, l, u, d = (d) => (s = createConfigUtils(o.reduce((t, o) => o(t), t())), c = s.cache.get, l = s.cache.set, u = f, f(d)), f = (t) => {
		let o = c(t);
		if (o) return o;
		let u = mergeClassList(t, s);
		return l(t, u), u;
	};
	return u = d, (...t) => u(twJoin(...t));
}, fallbackThemeArr = [], fromTheme = (t) => {
	let o = (o) => o[t] || fallbackThemeArr;
	return o.isThemeGetter = !0, o;
}, arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i, fractionRegex = /^\d+\/\d+$/, tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, isFraction = (t) => fractionRegex.test(t), isNumber = (t) => !!t && !Number.isNaN(Number(t)), isInteger = (t) => !!t && Number.isInteger(Number(t)), isPercent = (t) => t.endsWith("%") && isNumber(t.slice(0, -1)), isTshirtSize = (t) => tshirtUnitRegex.test(t), isAny = () => !0, isLengthOnly = (t) => lengthUnitRegex.test(t) && !colorFunctionRegex.test(t), isNever = () => !1, isShadow = (t) => shadowRegex.test(t), isImage = (t) => imageRegex.test(t), isAnyNonArbitrary = (t) => !isArbitraryValue(t) && !isArbitraryVariable(t), isArbitrarySize = (t) => getIsArbitraryValue(t, isLabelSize, isNever), isArbitraryValue = (t) => arbitraryValueRegex.test(t), isArbitraryLength = (t) => getIsArbitraryValue(t, isLabelLength, isLengthOnly), isArbitraryNumber = (t) => getIsArbitraryValue(t, isLabelNumber, isNumber), isArbitraryPosition = (t) => getIsArbitraryValue(t, isLabelPosition, isNever), isArbitraryImage = (t) => getIsArbitraryValue(t, isLabelImage, isImage), isArbitraryShadow = (t) => getIsArbitraryValue(t, isLabelShadow, isShadow), isArbitraryVariable = (t) => arbitraryVariableRegex.test(t), isArbitraryVariableLength = (t) => getIsArbitraryVariable(t, isLabelLength), isArbitraryVariableFamilyName = (t) => getIsArbitraryVariable(t, isLabelFamilyName), isArbitraryVariablePosition = (t) => getIsArbitraryVariable(t, isLabelPosition), isArbitraryVariableSize = (t) => getIsArbitraryVariable(t, isLabelSize), isArbitraryVariableImage = (t) => getIsArbitraryVariable(t, isLabelImage), isArbitraryVariableShadow = (t) => getIsArbitraryVariable(t, isLabelShadow, !0), getIsArbitraryValue = (t, o, s) => {
	let c = arbitraryValueRegex.exec(t);
	return c ? c[1] ? o(c[1]) : s(c[2]) : !1;
}, getIsArbitraryVariable = (t, o, s = !1) => {
	let c = arbitraryVariableRegex.exec(t);
	return c ? c[1] ? o(c[1]) : s : !1;
}, isLabelPosition = (t) => t === "position" || t === "percentage", isLabelImage = (t) => t === "image" || t === "url", isLabelSize = (t) => t === "length" || t === "size" || t === "bg-size", isLabelLength = (t) => t === "length", isLabelNumber = (t) => t === "number", isLabelFamilyName = (t) => t === "family-name", isLabelShadow = (t) => t === "shadow", twMerge = /* @__PURE__ */ createTailwindMerge(() => {
	let t = fromTheme("color"), o = fromTheme("font"), s = fromTheme("text"), c = fromTheme("font-weight"), l = fromTheme("tracking"), u = fromTheme("leading"), d = fromTheme("breakpoint"), f = fromTheme("container"), p = fromTheme("spacing"), m = fromTheme("radius"), h = fromTheme("shadow"), g = fromTheme("inset-shadow"), _ = fromTheme("text-shadow"), v = fromTheme("drop-shadow"), y = fromTheme("blur"), b = fromTheme("perspective"), x = fromTheme("aspect"), S = fromTheme("ease"), C = fromTheme("animate"), w = () => [
		"auto",
		"avoid",
		"all",
		"avoid-page",
		"page",
		"left",
		"right",
		"column"
	], T = () => [
		"center",
		"top",
		"bottom",
		"left",
		"right",
		"top-left",
		"left-top",
		"top-right",
		"right-top",
		"bottom-right",
		"right-bottom",
		"bottom-left",
		"left-bottom"
	], E = () => [
		...T(),
		isArbitraryVariable,
		isArbitraryValue
	], D = () => [
		"auto",
		"hidden",
		"clip",
		"visible",
		"scroll"
	], O = () => [
		"auto",
		"contain",
		"none"
	], k = () => [
		isArbitraryVariable,
		isArbitraryValue,
		p
	], A = () => [
		isFraction,
		"full",
		"auto",
		...k()
	], j = () => [
		isInteger,
		"none",
		"subgrid",
		isArbitraryVariable,
		isArbitraryValue
	], M = () => [
		"auto",
		{ span: [
			"full",
			isInteger,
			isArbitraryVariable,
			isArbitraryValue
		] },
		isInteger,
		isArbitraryVariable,
		isArbitraryValue
	], N = () => [
		isInteger,
		"auto",
		isArbitraryVariable,
		isArbitraryValue
	], P = () => [
		"auto",
		"min",
		"max",
		"fr",
		isArbitraryVariable,
		isArbitraryValue
	], F = () => [
		"start",
		"end",
		"center",
		"between",
		"around",
		"evenly",
		"stretch",
		"baseline",
		"center-safe",
		"end-safe"
	], I = () => [
		"start",
		"end",
		"center",
		"stretch",
		"center-safe",
		"end-safe"
	], L = () => ["auto", ...k()], R = () => [
		isFraction,
		"auto",
		"full",
		"dvw",
		"dvh",
		"lvw",
		"lvh",
		"svw",
		"svh",
		"min",
		"max",
		"fit",
		...k()
	], z = () => [
		t,
		isArbitraryVariable,
		isArbitraryValue
	], B = () => [
		...T(),
		isArbitraryVariablePosition,
		isArbitraryPosition,
		{ position: [isArbitraryVariable, isArbitraryValue] }
	], V = () => ["no-repeat", { repeat: [
		"",
		"x",
		"y",
		"space",
		"round"
	] }], H = () => [
		"auto",
		"cover",
		"contain",
		isArbitraryVariableSize,
		isArbitrarySize,
		{ size: [isArbitraryVariable, isArbitraryValue] }
	], U = () => [
		isPercent,
		isArbitraryVariableLength,
		isArbitraryLength
	], W = () => [
		"",
		"none",
		"full",
		m,
		isArbitraryVariable,
		isArbitraryValue
	], G = () => [
		"",
		isNumber,
		isArbitraryVariableLength,
		isArbitraryLength
	], K = () => [
		"solid",
		"dashed",
		"dotted",
		"double"
	], q = () => [
		"normal",
		"multiply",
		"screen",
		"overlay",
		"darken",
		"lighten",
		"color-dodge",
		"color-burn",
		"hard-light",
		"soft-light",
		"difference",
		"exclusion",
		"hue",
		"saturation",
		"color",
		"luminosity"
	], J = () => [
		isNumber,
		isPercent,
		isArbitraryVariablePosition,
		isArbitraryPosition
	], Y = () => [
		"",
		"none",
		y,
		isArbitraryVariable,
		isArbitraryValue
	], X = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Z = () => [
		"none",
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], Q = () => [
		isNumber,
		isArbitraryVariable,
		isArbitraryValue
	], $ = () => [
		isFraction,
		"full",
		...k()
	];
	return {
		cacheSize: 500,
		theme: {
			animate: [
				"spin",
				"ping",
				"pulse",
				"bounce"
			],
			aspect: ["video"],
			blur: [isTshirtSize],
			breakpoint: [isTshirtSize],
			color: [isAny],
			container: [isTshirtSize],
			"drop-shadow": [isTshirtSize],
			ease: [
				"in",
				"out",
				"in-out"
			],
			font: [isAnyNonArbitrary],
			"font-weight": [
				"thin",
				"extralight",
				"light",
				"normal",
				"medium",
				"semibold",
				"bold",
				"extrabold",
				"black"
			],
			"inset-shadow": [isTshirtSize],
			leading: [
				"none",
				"tight",
				"snug",
				"normal",
				"relaxed",
				"loose"
			],
			perspective: [
				"dramatic",
				"near",
				"normal",
				"midrange",
				"distant",
				"none"
			],
			radius: [isTshirtSize],
			shadow: [isTshirtSize],
			spacing: ["px", isNumber],
			text: [isTshirtSize],
			"text-shadow": [isTshirtSize],
			tracking: [
				"tighter",
				"tight",
				"normal",
				"wide",
				"wider",
				"widest"
			]
		},
		classGroups: {
			aspect: [{ aspect: [
				"auto",
				"square",
				isFraction,
				isArbitraryValue,
				isArbitraryVariable,
				x
			] }],
			container: ["container"],
			columns: [{ columns: [
				isNumber,
				isArbitraryValue,
				isArbitraryVariable,
				f
			] }],
			"break-after": [{ "break-after": w() }],
			"break-before": [{ "break-before": w() }],
			"break-inside": [{ "break-inside": [
				"auto",
				"avoid",
				"avoid-page",
				"avoid-column"
			] }],
			"box-decoration": [{ "box-decoration": ["slice", "clone"] }],
			box: [{ box: ["border", "content"] }],
			display: [
				"block",
				"inline-block",
				"inline",
				"flex",
				"inline-flex",
				"table",
				"inline-table",
				"table-caption",
				"table-cell",
				"table-column",
				"table-column-group",
				"table-footer-group",
				"table-header-group",
				"table-row-group",
				"table-row",
				"flow-root",
				"grid",
				"inline-grid",
				"contents",
				"list-item",
				"hidden"
			],
			sr: ["sr-only", "not-sr-only"],
			float: [{ float: [
				"right",
				"left",
				"none",
				"start",
				"end"
			] }],
			clear: [{ clear: [
				"left",
				"right",
				"both",
				"none",
				"start",
				"end"
			] }],
			isolation: ["isolate", "isolation-auto"],
			"object-fit": [{ object: [
				"contain",
				"cover",
				"fill",
				"none",
				"scale-down"
			] }],
			"object-position": [{ object: E() }],
			overflow: [{ overflow: D() }],
			"overflow-x": [{ "overflow-x": D() }],
			"overflow-y": [{ "overflow-y": D() }],
			overscroll: [{ overscroll: O() }],
			"overscroll-x": [{ "overscroll-x": O() }],
			"overscroll-y": [{ "overscroll-y": O() }],
			position: [
				"static",
				"fixed",
				"absolute",
				"relative",
				"sticky"
			],
			inset: [{ inset: A() }],
			"inset-x": [{ "inset-x": A() }],
			"inset-y": [{ "inset-y": A() }],
			start: [{ start: A() }],
			end: [{ end: A() }],
			top: [{ top: A() }],
			right: [{ right: A() }],
			bottom: [{ bottom: A() }],
			left: [{ left: A() }],
			visibility: [
				"visible",
				"invisible",
				"collapse"
			],
			z: [{ z: [
				isInteger,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			basis: [{ basis: [
				isFraction,
				"full",
				"auto",
				f,
				...k()
			] }],
			"flex-direction": [{ flex: [
				"row",
				"row-reverse",
				"col",
				"col-reverse"
			] }],
			"flex-wrap": [{ flex: [
				"nowrap",
				"wrap",
				"wrap-reverse"
			] }],
			flex: [{ flex: [
				isNumber,
				isFraction,
				"auto",
				"initial",
				"none",
				isArbitraryValue
			] }],
			grow: [{ grow: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			shrink: [{ shrink: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			order: [{ order: [
				isInteger,
				"first",
				"last",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"grid-cols": [{ "grid-cols": j() }],
			"col-start-end": [{ col: M() }],
			"col-start": [{ "col-start": N() }],
			"col-end": [{ "col-end": N() }],
			"grid-rows": [{ "grid-rows": j() }],
			"row-start-end": [{ row: M() }],
			"row-start": [{ "row-start": N() }],
			"row-end": [{ "row-end": N() }],
			"grid-flow": [{ "grid-flow": [
				"row",
				"col",
				"dense",
				"row-dense",
				"col-dense"
			] }],
			"auto-cols": [{ "auto-cols": P() }],
			"auto-rows": [{ "auto-rows": P() }],
			gap: [{ gap: k() }],
			"gap-x": [{ "gap-x": k() }],
			"gap-y": [{ "gap-y": k() }],
			"justify-content": [{ justify: [...F(), "normal"] }],
			"justify-items": [{ "justify-items": [...I(), "normal"] }],
			"justify-self": [{ "justify-self": ["auto", ...I()] }],
			"align-content": [{ content: ["normal", ...F()] }],
			"align-items": [{ items: [...I(), { baseline: ["", "last"] }] }],
			"align-self": [{ self: [
				"auto",
				...I(),
				{ baseline: ["", "last"] }
			] }],
			"place-content": [{ "place-content": F() }],
			"place-items": [{ "place-items": [...I(), "baseline"] }],
			"place-self": [{ "place-self": ["auto", ...I()] }],
			p: [{ p: k() }],
			px: [{ px: k() }],
			py: [{ py: k() }],
			ps: [{ ps: k() }],
			pe: [{ pe: k() }],
			pt: [{ pt: k() }],
			pr: [{ pr: k() }],
			pb: [{ pb: k() }],
			pl: [{ pl: k() }],
			m: [{ m: L() }],
			mx: [{ mx: L() }],
			my: [{ my: L() }],
			ms: [{ ms: L() }],
			me: [{ me: L() }],
			mt: [{ mt: L() }],
			mr: [{ mr: L() }],
			mb: [{ mb: L() }],
			ml: [{ ml: L() }],
			"space-x": [{ "space-x": k() }],
			"space-x-reverse": ["space-x-reverse"],
			"space-y": [{ "space-y": k() }],
			"space-y-reverse": ["space-y-reverse"],
			size: [{ size: R() }],
			w: [{ w: [
				f,
				"screen",
				...R()
			] }],
			"min-w": [{ "min-w": [
				f,
				"screen",
				"none",
				...R()
			] }],
			"max-w": [{ "max-w": [
				f,
				"screen",
				"none",
				"prose",
				{ screen: [d] },
				...R()
			] }],
			h: [{ h: [
				"screen",
				"lh",
				...R()
			] }],
			"min-h": [{ "min-h": [
				"screen",
				"lh",
				"none",
				...R()
			] }],
			"max-h": [{ "max-h": [
				"screen",
				"lh",
				...R()
			] }],
			"font-size": [{ text: [
				"base",
				s,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"font-smoothing": ["antialiased", "subpixel-antialiased"],
			"font-style": ["italic", "not-italic"],
			"font-weight": [{ font: [
				c,
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			"font-stretch": [{ "font-stretch": [
				"ultra-condensed",
				"extra-condensed",
				"condensed",
				"semi-condensed",
				"normal",
				"semi-expanded",
				"expanded",
				"extra-expanded",
				"ultra-expanded",
				isPercent,
				isArbitraryValue
			] }],
			"font-family": [{ font: [
				isArbitraryVariableFamilyName,
				isArbitraryValue,
				o
			] }],
			"fvn-normal": ["normal-nums"],
			"fvn-ordinal": ["ordinal"],
			"fvn-slashed-zero": ["slashed-zero"],
			"fvn-figure": ["lining-nums", "oldstyle-nums"],
			"fvn-spacing": ["proportional-nums", "tabular-nums"],
			"fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
			tracking: [{ tracking: [
				l,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"line-clamp": [{ "line-clamp": [
				isNumber,
				"none",
				isArbitraryVariable,
				isArbitraryNumber
			] }],
			leading: [{ leading: [u, ...k()] }],
			"list-image": [{ "list-image": [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"list-style-position": [{ list: ["inside", "outside"] }],
			"list-style-type": [{ list: [
				"disc",
				"decimal",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-alignment": [{ text: [
				"left",
				"center",
				"right",
				"justify",
				"start",
				"end"
			] }],
			"placeholder-color": [{ placeholder: z() }],
			"text-color": [{ text: z() }],
			"text-decoration": [
				"underline",
				"overline",
				"line-through",
				"no-underline"
			],
			"text-decoration-style": [{ decoration: [...K(), "wavy"] }],
			"text-decoration-thickness": [{ decoration: [
				isNumber,
				"from-font",
				"auto",
				isArbitraryVariable,
				isArbitraryLength
			] }],
			"text-decoration-color": [{ decoration: z() }],
			"underline-offset": [{ "underline-offset": [
				isNumber,
				"auto",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"text-transform": [
				"uppercase",
				"lowercase",
				"capitalize",
				"normal-case"
			],
			"text-overflow": [
				"truncate",
				"text-ellipsis",
				"text-clip"
			],
			"text-wrap": [{ text: [
				"wrap",
				"nowrap",
				"balance",
				"pretty"
			] }],
			indent: [{ indent: k() }],
			"vertical-align": [{ align: [
				"baseline",
				"top",
				"middle",
				"bottom",
				"text-top",
				"text-bottom",
				"sub",
				"super",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			whitespace: [{ whitespace: [
				"normal",
				"nowrap",
				"pre",
				"pre-line",
				"pre-wrap",
				"break-spaces"
			] }],
			break: [{ break: [
				"normal",
				"words",
				"all",
				"keep"
			] }],
			wrap: [{ wrap: [
				"break-word",
				"anywhere",
				"normal"
			] }],
			hyphens: [{ hyphens: [
				"none",
				"manual",
				"auto"
			] }],
			content: [{ content: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"bg-attachment": [{ bg: [
				"fixed",
				"local",
				"scroll"
			] }],
			"bg-clip": [{ "bg-clip": [
				"border",
				"padding",
				"content",
				"text"
			] }],
			"bg-origin": [{ "bg-origin": [
				"border",
				"padding",
				"content"
			] }],
			"bg-position": [{ bg: B() }],
			"bg-repeat": [{ bg: V() }],
			"bg-size": [{ bg: H() }],
			"bg-image": [{ bg: [
				"none",
				{
					linear: [
						{ to: [
							"t",
							"tr",
							"r",
							"br",
							"b",
							"bl",
							"l",
							"tl"
						] },
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					],
					radial: [
						"",
						isArbitraryVariable,
						isArbitraryValue
					],
					conic: [
						isInteger,
						isArbitraryVariable,
						isArbitraryValue
					]
				},
				isArbitraryVariableImage,
				isArbitraryImage
			] }],
			"bg-color": [{ bg: z() }],
			"gradient-from-pos": [{ from: U() }],
			"gradient-via-pos": [{ via: U() }],
			"gradient-to-pos": [{ to: U() }],
			"gradient-from": [{ from: z() }],
			"gradient-via": [{ via: z() }],
			"gradient-to": [{ to: z() }],
			rounded: [{ rounded: W() }],
			"rounded-s": [{ "rounded-s": W() }],
			"rounded-e": [{ "rounded-e": W() }],
			"rounded-t": [{ "rounded-t": W() }],
			"rounded-r": [{ "rounded-r": W() }],
			"rounded-b": [{ "rounded-b": W() }],
			"rounded-l": [{ "rounded-l": W() }],
			"rounded-ss": [{ "rounded-ss": W() }],
			"rounded-se": [{ "rounded-se": W() }],
			"rounded-ee": [{ "rounded-ee": W() }],
			"rounded-es": [{ "rounded-es": W() }],
			"rounded-tl": [{ "rounded-tl": W() }],
			"rounded-tr": [{ "rounded-tr": W() }],
			"rounded-br": [{ "rounded-br": W() }],
			"rounded-bl": [{ "rounded-bl": W() }],
			"border-w": [{ border: G() }],
			"border-w-x": [{ "border-x": G() }],
			"border-w-y": [{ "border-y": G() }],
			"border-w-s": [{ "border-s": G() }],
			"border-w-e": [{ "border-e": G() }],
			"border-w-t": [{ "border-t": G() }],
			"border-w-r": [{ "border-r": G() }],
			"border-w-b": [{ "border-b": G() }],
			"border-w-l": [{ "border-l": G() }],
			"divide-x": [{ "divide-x": G() }],
			"divide-x-reverse": ["divide-x-reverse"],
			"divide-y": [{ "divide-y": G() }],
			"divide-y-reverse": ["divide-y-reverse"],
			"border-style": [{ border: [
				...K(),
				"hidden",
				"none"
			] }],
			"divide-style": [{ divide: [
				...K(),
				"hidden",
				"none"
			] }],
			"border-color": [{ border: z() }],
			"border-color-x": [{ "border-x": z() }],
			"border-color-y": [{ "border-y": z() }],
			"border-color-s": [{ "border-s": z() }],
			"border-color-e": [{ "border-e": z() }],
			"border-color-t": [{ "border-t": z() }],
			"border-color-r": [{ "border-r": z() }],
			"border-color-b": [{ "border-b": z() }],
			"border-color-l": [{ "border-l": z() }],
			"divide-color": [{ divide: z() }],
			"outline-style": [{ outline: [
				...K(),
				"none",
				"hidden"
			] }],
			"outline-offset": [{ "outline-offset": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"outline-w": [{ outline: [
				"",
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength
			] }],
			"outline-color": [{ outline: z() }],
			shadow: [{ shadow: [
				"",
				"none",
				h,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"shadow-color": [{ shadow: z() }],
			"inset-shadow": [{ "inset-shadow": [
				"none",
				g,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"inset-shadow-color": [{ "inset-shadow": z() }],
			"ring-w": [{ ring: G() }],
			"ring-w-inset": ["ring-inset"],
			"ring-color": [{ ring: z() }],
			"ring-offset-w": [{ "ring-offset": [isNumber, isArbitraryLength] }],
			"ring-offset-color": [{ "ring-offset": z() }],
			"inset-ring-w": [{ "inset-ring": G() }],
			"inset-ring-color": [{ "inset-ring": z() }],
			"text-shadow": [{ "text-shadow": [
				"none",
				_,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"text-shadow-color": [{ "text-shadow": z() }],
			opacity: [{ opacity: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"mix-blend": [{ "mix-blend": [
				...q(),
				"plus-darker",
				"plus-lighter"
			] }],
			"bg-blend": [{ "bg-blend": q() }],
			"mask-clip": [{ "mask-clip": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }, "mask-no-clip"],
			"mask-composite": [{ mask: [
				"add",
				"subtract",
				"intersect",
				"exclude"
			] }],
			"mask-image-linear-pos": [{ "mask-linear": [isNumber] }],
			"mask-image-linear-from-pos": [{ "mask-linear-from": J() }],
			"mask-image-linear-to-pos": [{ "mask-linear-to": J() }],
			"mask-image-linear-from-color": [{ "mask-linear-from": z() }],
			"mask-image-linear-to-color": [{ "mask-linear-to": z() }],
			"mask-image-t-from-pos": [{ "mask-t-from": J() }],
			"mask-image-t-to-pos": [{ "mask-t-to": J() }],
			"mask-image-t-from-color": [{ "mask-t-from": z() }],
			"mask-image-t-to-color": [{ "mask-t-to": z() }],
			"mask-image-r-from-pos": [{ "mask-r-from": J() }],
			"mask-image-r-to-pos": [{ "mask-r-to": J() }],
			"mask-image-r-from-color": [{ "mask-r-from": z() }],
			"mask-image-r-to-color": [{ "mask-r-to": z() }],
			"mask-image-b-from-pos": [{ "mask-b-from": J() }],
			"mask-image-b-to-pos": [{ "mask-b-to": J() }],
			"mask-image-b-from-color": [{ "mask-b-from": z() }],
			"mask-image-b-to-color": [{ "mask-b-to": z() }],
			"mask-image-l-from-pos": [{ "mask-l-from": J() }],
			"mask-image-l-to-pos": [{ "mask-l-to": J() }],
			"mask-image-l-from-color": [{ "mask-l-from": z() }],
			"mask-image-l-to-color": [{ "mask-l-to": z() }],
			"mask-image-x-from-pos": [{ "mask-x-from": J() }],
			"mask-image-x-to-pos": [{ "mask-x-to": J() }],
			"mask-image-x-from-color": [{ "mask-x-from": z() }],
			"mask-image-x-to-color": [{ "mask-x-to": z() }],
			"mask-image-y-from-pos": [{ "mask-y-from": J() }],
			"mask-image-y-to-pos": [{ "mask-y-to": J() }],
			"mask-image-y-from-color": [{ "mask-y-from": z() }],
			"mask-image-y-to-color": [{ "mask-y-to": z() }],
			"mask-image-radial": [{ "mask-radial": [isArbitraryVariable, isArbitraryValue] }],
			"mask-image-radial-from-pos": [{ "mask-radial-from": J() }],
			"mask-image-radial-to-pos": [{ "mask-radial-to": J() }],
			"mask-image-radial-from-color": [{ "mask-radial-from": z() }],
			"mask-image-radial-to-color": [{ "mask-radial-to": z() }],
			"mask-image-radial-shape": [{ "mask-radial": ["circle", "ellipse"] }],
			"mask-image-radial-size": [{ "mask-radial": [{
				closest: ["side", "corner"],
				farthest: ["side", "corner"]
			}] }],
			"mask-image-radial-pos": [{ "mask-radial-at": T() }],
			"mask-image-conic-pos": [{ "mask-conic": [isNumber] }],
			"mask-image-conic-from-pos": [{ "mask-conic-from": J() }],
			"mask-image-conic-to-pos": [{ "mask-conic-to": J() }],
			"mask-image-conic-from-color": [{ "mask-conic-from": z() }],
			"mask-image-conic-to-color": [{ "mask-conic-to": z() }],
			"mask-mode": [{ mask: [
				"alpha",
				"luminance",
				"match"
			] }],
			"mask-origin": [{ "mask-origin": [
				"border",
				"padding",
				"content",
				"fill",
				"stroke",
				"view"
			] }],
			"mask-position": [{ mask: B() }],
			"mask-repeat": [{ mask: V() }],
			"mask-size": [{ mask: H() }],
			"mask-type": [{ "mask-type": ["alpha", "luminance"] }],
			"mask-image": [{ mask: [
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			filter: [{ filter: [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			blur: [{ blur: Y() }],
			brightness: [{ brightness: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			contrast: [{ contrast: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"drop-shadow": [{ "drop-shadow": [
				"",
				"none",
				v,
				isArbitraryVariableShadow,
				isArbitraryShadow
			] }],
			"drop-shadow-color": [{ "drop-shadow": z() }],
			grayscale: [{ grayscale: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"hue-rotate": [{ "hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			invert: [{ invert: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			saturate: [{ saturate: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			sepia: [{ sepia: [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-filter": [{ "backdrop-filter": [
				"",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-blur": [{ "backdrop-blur": Y() }],
			"backdrop-brightness": [{ "backdrop-brightness": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-contrast": [{ "backdrop-contrast": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-grayscale": [{ "backdrop-grayscale": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-hue-rotate": [{ "backdrop-hue-rotate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-invert": [{ "backdrop-invert": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-opacity": [{ "backdrop-opacity": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-saturate": [{ "backdrop-saturate": [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"backdrop-sepia": [{ "backdrop-sepia": [
				"",
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"border-collapse": [{ border: ["collapse", "separate"] }],
			"border-spacing": [{ "border-spacing": k() }],
			"border-spacing-x": [{ "border-spacing-x": k() }],
			"border-spacing-y": [{ "border-spacing-y": k() }],
			"table-layout": [{ table: ["auto", "fixed"] }],
			caption: [{ caption: ["top", "bottom"] }],
			transition: [{ transition: [
				"",
				"all",
				"colors",
				"opacity",
				"shadow",
				"transform",
				"none",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"transition-behavior": [{ transition: ["normal", "discrete"] }],
			duration: [{ duration: [
				isNumber,
				"initial",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			ease: [{ ease: [
				"linear",
				"initial",
				S,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			delay: [{ delay: [
				isNumber,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			animate: [{ animate: [
				"none",
				C,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			backface: [{ backface: ["hidden", "visible"] }],
			perspective: [{ perspective: [
				b,
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"perspective-origin": [{ "perspective-origin": E() }],
			rotate: [{ rotate: X() }],
			"rotate-x": [{ "rotate-x": X() }],
			"rotate-y": [{ "rotate-y": X() }],
			"rotate-z": [{ "rotate-z": X() }],
			scale: [{ scale: Z() }],
			"scale-x": [{ "scale-x": Z() }],
			"scale-y": [{ "scale-y": Z() }],
			"scale-z": [{ "scale-z": Z() }],
			"scale-3d": ["scale-3d"],
			skew: [{ skew: Q() }],
			"skew-x": [{ "skew-x": Q() }],
			"skew-y": [{ "skew-y": Q() }],
			transform: [{ transform: [
				isArbitraryVariable,
				isArbitraryValue,
				"",
				"none",
				"gpu",
				"cpu"
			] }],
			"transform-origin": [{ origin: E() }],
			"transform-style": [{ transform: ["3d", "flat"] }],
			translate: [{ translate: $() }],
			"translate-x": [{ "translate-x": $() }],
			"translate-y": [{ "translate-y": $() }],
			"translate-z": [{ "translate-z": $() }],
			"translate-none": ["translate-none"],
			accent: [{ accent: z() }],
			appearance: [{ appearance: ["none", "auto"] }],
			"caret-color": [{ caret: z() }],
			"color-scheme": [{ scheme: [
				"normal",
				"dark",
				"light",
				"light-dark",
				"only-dark",
				"only-light"
			] }],
			cursor: [{ cursor: [
				"auto",
				"default",
				"pointer",
				"wait",
				"text",
				"move",
				"help",
				"not-allowed",
				"none",
				"context-menu",
				"progress",
				"cell",
				"crosshair",
				"vertical-text",
				"alias",
				"copy",
				"no-drop",
				"grab",
				"grabbing",
				"all-scroll",
				"col-resize",
				"row-resize",
				"n-resize",
				"e-resize",
				"s-resize",
				"w-resize",
				"ne-resize",
				"nw-resize",
				"se-resize",
				"sw-resize",
				"ew-resize",
				"ns-resize",
				"nesw-resize",
				"nwse-resize",
				"zoom-in",
				"zoom-out",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			"field-sizing": [{ "field-sizing": ["fixed", "content"] }],
			"pointer-events": [{ "pointer-events": ["auto", "none"] }],
			resize: [{ resize: [
				"none",
				"",
				"y",
				"x"
			] }],
			"scroll-behavior": [{ scroll: ["auto", "smooth"] }],
			"scroll-m": [{ "scroll-m": k() }],
			"scroll-mx": [{ "scroll-mx": k() }],
			"scroll-my": [{ "scroll-my": k() }],
			"scroll-ms": [{ "scroll-ms": k() }],
			"scroll-me": [{ "scroll-me": k() }],
			"scroll-mt": [{ "scroll-mt": k() }],
			"scroll-mr": [{ "scroll-mr": k() }],
			"scroll-mb": [{ "scroll-mb": k() }],
			"scroll-ml": [{ "scroll-ml": k() }],
			"scroll-p": [{ "scroll-p": k() }],
			"scroll-px": [{ "scroll-px": k() }],
			"scroll-py": [{ "scroll-py": k() }],
			"scroll-ps": [{ "scroll-ps": k() }],
			"scroll-pe": [{ "scroll-pe": k() }],
			"scroll-pt": [{ "scroll-pt": k() }],
			"scroll-pr": [{ "scroll-pr": k() }],
			"scroll-pb": [{ "scroll-pb": k() }],
			"scroll-pl": [{ "scroll-pl": k() }],
			"snap-align": [{ snap: [
				"start",
				"end",
				"center",
				"align-none"
			] }],
			"snap-stop": [{ snap: ["normal", "always"] }],
			"snap-type": [{ snap: [
				"none",
				"x",
				"y",
				"both"
			] }],
			"snap-strictness": [{ snap: ["mandatory", "proximity"] }],
			touch: [{ touch: [
				"auto",
				"none",
				"manipulation"
			] }],
			"touch-x": [{ "touch-pan": [
				"x",
				"left",
				"right"
			] }],
			"touch-y": [{ "touch-pan": [
				"y",
				"up",
				"down"
			] }],
			"touch-pz": ["touch-pinch-zoom"],
			select: [{ select: [
				"none",
				"text",
				"all",
				"auto"
			] }],
			"will-change": [{ "will-change": [
				"auto",
				"scroll",
				"contents",
				"transform",
				isArbitraryVariable,
				isArbitraryValue
			] }],
			fill: [{ fill: ["none", ...z()] }],
			"stroke-w": [{ stroke: [
				isNumber,
				isArbitraryVariableLength,
				isArbitraryLength,
				isArbitraryNumber
			] }],
			stroke: [{ stroke: ["none", ...z()] }],
			"forced-color-adjust": [{ "forced-color-adjust": ["auto", "none"] }]
		},
		conflictingClassGroups: {
			overflow: ["overflow-x", "overflow-y"],
			overscroll: ["overscroll-x", "overscroll-y"],
			inset: [
				"inset-x",
				"inset-y",
				"start",
				"end",
				"top",
				"right",
				"bottom",
				"left"
			],
			"inset-x": ["right", "left"],
			"inset-y": ["top", "bottom"],
			flex: [
				"basis",
				"grow",
				"shrink"
			],
			gap: ["gap-x", "gap-y"],
			p: [
				"px",
				"py",
				"ps",
				"pe",
				"pt",
				"pr",
				"pb",
				"pl"
			],
			px: ["pr", "pl"],
			py: ["pt", "pb"],
			m: [
				"mx",
				"my",
				"ms",
				"me",
				"mt",
				"mr",
				"mb",
				"ml"
			],
			mx: ["mr", "ml"],
			my: ["mt", "mb"],
			size: ["w", "h"],
			"font-size": ["leading"],
			"fvn-normal": [
				"fvn-ordinal",
				"fvn-slashed-zero",
				"fvn-figure",
				"fvn-spacing",
				"fvn-fraction"
			],
			"fvn-ordinal": ["fvn-normal"],
			"fvn-slashed-zero": ["fvn-normal"],
			"fvn-figure": ["fvn-normal"],
			"fvn-spacing": ["fvn-normal"],
			"fvn-fraction": ["fvn-normal"],
			"line-clamp": ["display", "overflow"],
			rounded: [
				"rounded-s",
				"rounded-e",
				"rounded-t",
				"rounded-r",
				"rounded-b",
				"rounded-l",
				"rounded-ss",
				"rounded-se",
				"rounded-ee",
				"rounded-es",
				"rounded-tl",
				"rounded-tr",
				"rounded-br",
				"rounded-bl"
			],
			"rounded-s": ["rounded-ss", "rounded-es"],
			"rounded-e": ["rounded-se", "rounded-ee"],
			"rounded-t": ["rounded-tl", "rounded-tr"],
			"rounded-r": ["rounded-tr", "rounded-br"],
			"rounded-b": ["rounded-br", "rounded-bl"],
			"rounded-l": ["rounded-tl", "rounded-bl"],
			"border-spacing": ["border-spacing-x", "border-spacing-y"],
			"border-w": [
				"border-w-x",
				"border-w-y",
				"border-w-s",
				"border-w-e",
				"border-w-t",
				"border-w-r",
				"border-w-b",
				"border-w-l"
			],
			"border-w-x": ["border-w-r", "border-w-l"],
			"border-w-y": ["border-w-t", "border-w-b"],
			"border-color": [
				"border-color-x",
				"border-color-y",
				"border-color-s",
				"border-color-e",
				"border-color-t",
				"border-color-r",
				"border-color-b",
				"border-color-l"
			],
			"border-color-x": ["border-color-r", "border-color-l"],
			"border-color-y": ["border-color-t", "border-color-b"],
			translate: [
				"translate-x",
				"translate-y",
				"translate-none"
			],
			"translate-none": [
				"translate",
				"translate-x",
				"translate-y",
				"translate-z"
			],
			"scroll-m": [
				"scroll-mx",
				"scroll-my",
				"scroll-ms",
				"scroll-me",
				"scroll-mt",
				"scroll-mr",
				"scroll-mb",
				"scroll-ml"
			],
			"scroll-mx": ["scroll-mr", "scroll-ml"],
			"scroll-my": ["scroll-mt", "scroll-mb"],
			"scroll-p": [
				"scroll-px",
				"scroll-py",
				"scroll-ps",
				"scroll-pe",
				"scroll-pt",
				"scroll-pr",
				"scroll-pb",
				"scroll-pl"
			],
			"scroll-px": ["scroll-pr", "scroll-pl"],
			"scroll-py": ["scroll-pt", "scroll-pb"],
			touch: [
				"touch-x",
				"touch-y",
				"touch-pz"
			],
			"touch-x": ["touch"],
			"touch-y": ["touch"],
			"touch-pz": ["touch"]
		},
		conflictingClassGroupModifiers: { "font-size": ["leading"] },
		orderSensitiveModifiers: [
			"*",
			"**",
			"after",
			"backdrop",
			"before",
			"details-content",
			"file",
			"first-letter",
			"first-line",
			"marker",
			"placeholder",
			"selection"
		]
	};
});
const cn = (...t) => twMerge(clsx(t));
var FilterTags_default = (t) => {
	let { value: o, options: s, onChange: c, ...l } = t, u = s.filter((t) => !t.icon), d = s.filter((t) => t.icon), f = (t) => {
		o.includes(t) ? c?.(o.filter((o) => o !== t)) : c?.([...o, t]);
	};
	return /* @__PURE__ */ jsxs(FilterCollapse_default, {
		...l,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2",
			children: u.map((t) => {
				let { label: s, value: c } = t;
				return /* @__PURE__ */ jsx("div", {
					className: cn("inline-flex items-center h-6 px-3 cursor-pointer b-default rounded-full hover:border-primary transition-colors", { "border-primary bg-primary-bg": o.includes(c) }),
					onClick: () => {
						f(c);
					},
					children: s
				}, c);
			})
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2 mt-2",
			children: d.map((t) => {
				let { label: s, value: c, icon: l } = t;
				return /* @__PURE__ */ jsx("div", {
					className: cn("size-12 rounded-full overflow-hidden cursor-pointer b-default b-2 border-transparent hover:border-primary transition-colors", { "border-primary": o.includes(c) }),
					onClick: () => {
						f(c);
					},
					children: /* @__PURE__ */ jsx("img", {
						src: l,
						alt: s,
						className: "size-full"
					})
				}, c);
			})
		})]
	});
}, FilterCheckboxGroup_default = (t) => {
	let { options: o, value: s, onChange: c, ...l } = t, [u, d] = useState(!1), f = (t) => /* @__PURE__ */ jsx("div", {
		className: "flex flex-col gap-4",
		children: t.map((t) => {
			let { label: o, value: l, icon: u, count: d } = t;
			return /* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ jsx(Checkbox, {
					checked: s.includes(l),
					onChange: (t) => {
						t.target.checked ? c?.([...s, l]) : c?.(s.filter((t) => t !== l));
					},
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ jsx("img", {
							src: u,
							alt: o,
							className: "size-4"
						}), /* @__PURE__ */ jsx("span", { children: o })]
					})
				}), /* @__PURE__ */ jsx("span", { children: d })]
			}, l);
		})
	}), p = () => {
		d((t) => !t);
	};
	return /* @__PURE__ */ jsxs(FilterCollapse_default, {
		...l,
		children: [
			f(o.slice(0, 5)),
			/* @__PURE__ */ jsx(AnimatePresence, { children: u && /* @__PURE__ */ jsx(motion.div, {
				initial: {
					height: 0,
					opacity: 0
				},
				animate: {
					height: "auto",
					opacity: 1
				},
				exit: {
					height: 0,
					opacity: 0
				},
				className: "overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "mt-4",
					children: f(o.slice(5))
				})
			}) }),
			o.length > 5 && /* @__PURE__ */ jsxs("div", {
				className: "inline-flex items-center mt-4 text-primary cursor-pointer",
				onClick: p,
				children: [/* @__PURE__ */ jsx("span", { children: "更多" }), /* @__PURE__ */ jsx(ChevronDown, { className: cn("size-4 transition", { "-scale-y-100": u }) })]
			})
		]
	});
}, FilterSelect_default = (t) => /* @__PURE__ */ jsx(FilterCollapse_default, {
	...t,
	children: /* @__PURE__ */ jsx("div", {
		className: "px-0.5 pb-0.5",
		children: /* @__PURE__ */ jsx(Select, {
			className: "w-full",
			...t
		})
	})
}), PRESET_COLORS = [
	"#FF0000",
	"#FFA500",
	"#FFFF00",
	"#00FF00",
	"#00FFFF",
	"#0000FF",
	"#8000FF",
	"#FF00FF",
	"#FFFFFF",
	"#808080",
	"#000000",
	"#964B00"
], FilterColorPicker_default = (t) => {
	let { presets: o, ...s } = t;
	return /* @__PURE__ */ jsx(FilterCollapse_default, {
		...t,
		children: /* @__PURE__ */ jsx(ColorPicker, {
			presets: [{
				label: "预设颜色",
				colors: PRESET_COLORS
			}, ...o ?? []],
			...s
		})
	});
}, FilterSlider_default = (t) => /* @__PURE__ */ jsx(FilterCollapse_default, {
	...t,
	children: /* @__PURE__ */ jsx("div", {
		className: "px-2",
		children: /* @__PURE__ */ jsx(Slider, { ...t })
	})
}), FilterInput_default = (t) => /* @__PURE__ */ jsx(FilterCollapse_default, {
	...t,
	children: /* @__PURE__ */ jsx("div", {
		className: "px-0.5 pb-0.5",
		children: /* @__PURE__ */ jsx(Input, { ...t })
	})
});
export { FilterCheckboxGroup_default as FilterCheckboxGroup, FilterCollapse_default as FilterCollapse, FilterColorPicker_default as FilterColorPicker, FilterInput_default as FilterInput, FilterSelect_default as FilterSelect, FilterSlider_default as FilterSlider, FilterTags_default as FilterTags };
