import * as React from "react";
import { Children, Component, Fragment, createContext, createElement, forwardRef, isValidElement, useCallback, useContext, useEffect, useId, useInsertionEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { BrushCleaning, ChevronDown, SquareMinus, SquarePlus } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Checkbox, ColorPicker, Input, Select, Slider } from "antd";
var __defProp = Object.defineProperty, __getOwnPropDesc = Object.getOwnPropertyDescriptor, __getOwnPropNames = Object.getOwnPropertyNames, __hasOwnProp = Object.prototype.hasOwnProperty, __esmMin = (e, _) => () => (e && (_ = e(e = 0)), _), __commonJSMin = (e, _) => () => (_ || e((_ = { exports: {} }).exports, _), _.exports), __export = (e) => {
	let _ = {};
	for (var v in e) __defProp(_, v, {
		get: e[v],
		enumerable: !0
	});
	return _;
}, __copyProps = (e, _, v, y) => {
	if (_ && typeof _ == "object" || typeof _ == "function") for (var b = __getOwnPropNames(_), x = 0, S = b.length, C; x < S; x++) C = b[x], !__hasOwnProp.call(e, C) && C !== v && __defProp(e, C, {
		get: ((e) => _[e]).bind(null, C),
		enumerable: !(y = __getOwnPropDesc(_, C)) || y.enumerable
	});
	return e;
}, __toCommonJS = (e) => __copyProps(__defProp({}, "__esModule", { value: !0 }), e), __require = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, _) => (typeof require < "u" ? require : e)[_] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function.");
}), require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((e) => {
	var _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.fragment");
	function y(e, v, y) {
		var b = null;
		if (y !== void 0 && (b = "" + y), v.key !== void 0 && (b = "" + v.key), "key" in v) for (var x in y = {}, v) x !== "key" && (y[x] = v[x]);
		else y = v;
		return v = y.ref, {
			$$typeof: _,
			type: e,
			key: b,
			ref: v === void 0 ? null : v,
			props: y
		};
	}
	e.Fragment = v, e.jsx = y, e.jsxs = y;
})), require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function _(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === W ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case N: return "Fragment";
				case F: return "Profiler";
				case P: return "StrictMode";
				case z: return "Suspense";
				case B: return "SuspenseList";
				case U: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case M: return "Portal";
				case L: return e.displayName || "Context";
				case I: return (e._context.displayName || "Context") + ".Consumer";
				case R:
					var v = e.render;
					return e = e.displayName, e ||= (e = v.displayName || v.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case V: return v = e.displayName || null, v === null ? _(e.type) || "Memo" : v;
				case H:
					v = e._payload, e = e._init;
					try {
						return _(e(v));
					} catch {}
			}
			return null;
		}
		function v(e) {
			return "" + e;
		}
		function y(e) {
			try {
				v(e);
				var _ = !1;
			} catch {
				_ = !0;
			}
			if (_) {
				_ = console;
				var y = _.error, b = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return y.call(_, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", b), v(e);
			}
		}
		function b(e) {
			if (e === N) return "<>";
			if (typeof e == "object" && e && e.$$typeof === H) return "<...>";
			try {
				var v = _(e);
				return v ? "<" + v + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function x() {
			var e = G.A;
			return e === null ? null : e.getOwner();
		}
		function S() {
			return Error("react-stack-top-frame");
		}
		function C(e) {
			if (K.call(e, "key")) {
				var _ = Object.getOwnPropertyDescriptor(e, "key").get;
				if (_ && _.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function w(e, _) {
			function v() {
				Y || (Y = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", _));
			}
			v.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: v,
				configurable: !0
			});
		}
		function T() {
			var e = _(this.type);
			return X[e] || (X[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function E(e, _, v, y, b, x) {
			var S = v.ref;
			return e = {
				$$typeof: j,
				type: e,
				key: _,
				props: v,
				_owner: y
			}, (S === void 0 ? null : S) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: T
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: b
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: x
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function D(e, v, b, S, T, D) {
			var k = v.children;
			if (k !== void 0) if (S) if (q(k)) {
				for (S = 0; S < k.length; S++) O(k[S]);
				Object.freeze && Object.freeze(k);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else O(k);
			if (K.call(v, "key")) {
				k = _(e);
				var A = Object.keys(v).filter(function(e) {
					return e !== "key";
				});
				S = 0 < A.length ? "{key: someKey, " + A.join(": ..., ") + ": ...}" : "{key: someKey}", $[k + S] || (A = 0 < A.length ? "{" + A.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", S, k, A, k), $[k + S] = !0);
			}
			if (k = null, b !== void 0 && (y(b), k = "" + b), C(v) && (y(v.key), k = "" + v.key), "key" in v) for (var j in b = {}, v) j !== "key" && (b[j] = v[j]);
			else b = v;
			return k && w(b, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), E(e, k, b, x(), T, D);
		}
		function O(e) {
			k(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === H && (e._payload.status === "fulfilled" ? k(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function k(e) {
			return typeof e == "object" && !!e && e.$$typeof === j;
		}
		var A = __require("react"), j = Symbol.for("react.transitional.element"), M = Symbol.for("react.portal"), N = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), F = Symbol.for("react.profiler"), I = Symbol.for("react.consumer"), L = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), z = Symbol.for("react.suspense"), B = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), H = Symbol.for("react.lazy"), U = Symbol.for("react.activity"), W = Symbol.for("react.client.reference"), G = A.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, K = Object.prototype.hasOwnProperty, q = Array.isArray, J = console.createTask ? console.createTask : function() {
			return null;
		};
		A = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var Y, X = {}, Z = A.react_stack_bottom_frame.bind(A, S)(), Q = J(b(S)), $ = {};
		e.Fragment = N, e.jsx = function(e, _, v) {
			var y = 1e4 > G.recentlyCreatedOwnerStacks++;
			return D(e, _, v, !1, y ? Error("react-stack-top-frame") : Z, y ? J(b(e)) : Q);
		}, e.jsxs = function(e, _, v) {
			var y = 1e4 > G.recentlyCreatedOwnerStacks++;
			return D(e, _, v, !0, y ? Error("react-stack-top-frame") : Z, y ? J(b(e)) : Q);
		};
	})();
})), require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((e, _) => {
	process.env.NODE_ENV === "production" ? _.exports = require_react_jsx_runtime_production() : _.exports = require_react_jsx_runtime_development();
})), LayoutGroupContext = createContext({});
function useConstant(e) {
	let _ = useRef(null);
	return _.current === null && (_.current = e()), _.current;
}
var isBrowser = typeof window < "u", useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect, PresenceContext = /* @__PURE__ */ createContext(null);
function addUniqueItem(e, _) {
	e.indexOf(_) === -1 && e.push(_);
}
function removeItem(e, _) {
	let v = e.indexOf(_);
	v > -1 && e.splice(v, 1);
}
var clamp = (e, _, v) => v > _ ? _ : v < e ? e : v;
function formatErrorMessage(e, _) {
	return _ ? `${e}. For more information and steps for solving, visit https://motion.dev/troubleshooting/${_}` : e;
}
var warning = () => {}, invariant = () => {};
process.env.NODE_ENV !== "production" && (warning = (e, _, v) => {
	!e && typeof console < "u" && console.warn(formatErrorMessage(_, v));
}, invariant = (e, _, v) => {
	if (!e) throw Error(formatErrorMessage(_, v));
});
var MotionGlobalConfig = {}, isNumericalString = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);
function isObject(e) {
	return typeof e == "object" && !!e;
}
var isZeroValueString = (e) => /^0[^.\s]+$/u.test(e);
/* @__NO_SIDE_EFFECTS__ */
function memo(e) {
	let _;
	return () => (_ === void 0 && (_ = e()), _);
}
var noop = /* @__NO_SIDE_EFFECTS__ */ (e) => e, combineFunctions = (e, _) => (v) => _(e(v)), pipe = (...e) => e.reduce(combineFunctions), progress = /* @__NO_SIDE_EFFECTS__ */ (e, _, v) => {
	let y = _ - e;
	return y === 0 ? 1 : (v - e) / y;
}, SubscriptionManager = class {
	constructor() {
		this.subscriptions = [];
	}
	add(e) {
		return addUniqueItem(this.subscriptions, e), () => removeItem(this.subscriptions, e);
	}
	notify(e, _, v) {
		let y = this.subscriptions.length;
		if (y) if (y === 1) this.subscriptions[0](e, _, v);
		else for (let b = 0; b < y; b++) {
			let y = this.subscriptions[b];
			y && y(e, _, v);
		}
	}
	getSize() {
		return this.subscriptions.length;
	}
	clear() {
		this.subscriptions.length = 0;
	}
}, secondsToMilliseconds = /* @__NO_SIDE_EFFECTS__ */ (e) => e * 1e3, millisecondsToSeconds = /* @__NO_SIDE_EFFECTS__ */ (e) => e / 1e3;
function velocityPerSecond(e, _) {
	return _ ? e * (1e3 / _) : 0;
}
var warned = /* @__PURE__ */ new Set();
function warnOnce(e, _, v) {
	e || warned.has(_) || (console.warn(formatErrorMessage(_, v)), warned.add(_));
}
var calcBezier = (e, _, v) => (((1 - 3 * v + 3 * _) * e + (3 * v - 6 * _)) * e + 3 * _) * e, subdivisionPrecision = 1e-7, subdivisionMaxIterations = 12;
function binarySubdivide(e, _, v, y, b) {
	let x, S, C = 0;
	do
		S = _ + (v - _) / 2, x = calcBezier(S, y, b) - e, x > 0 ? v = S : _ = S;
	while (Math.abs(x) > subdivisionPrecision && ++C < subdivisionMaxIterations);
	return S;
}
function cubicBezier(e, _, v, y) {
	if (e === _ && v === y) return noop;
	let b = (_) => binarySubdivide(_, 0, 1, e, v);
	return (e) => e === 0 || e === 1 ? e : calcBezier(b(e), _, y);
}
var mirrorEasing = (e) => (_) => _ <= .5 ? e(2 * _) / 2 : (2 - e(2 * (1 - _))) / 2, reverseEasing = (e) => (_) => 1 - e(1 - _), backOut = /* @__PURE__ */ cubicBezier(.33, 1.53, .69, .99), backIn = /* @__PURE__ */ reverseEasing(backOut), backInOut = /* @__PURE__ */ mirrorEasing(backIn), anticipate = (e) => (e *= 2) < 1 ? .5 * backIn(e) : .5 * (2 - 2 ** (-10 * (e - 1))), circIn = (e) => 1 - Math.sin(Math.acos(e)), circOut = reverseEasing(circIn), circInOut = mirrorEasing(circIn), easeIn = /* @__PURE__ */ cubicBezier(.42, 0, 1, 1), easeOut = /* @__PURE__ */ cubicBezier(0, 0, .58, 1), easeInOut = /* @__PURE__ */ cubicBezier(.42, 0, .58, 1), isEasingArray = (e) => Array.isArray(e) && typeof e[0] != "number", isBezierDefinition = (e) => Array.isArray(e) && typeof e[0] == "number", easingLookup = {
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
}, isValidEasing = (e) => typeof e == "string", easingDefinitionToFunction = (e) => {
	if (isBezierDefinition(e)) {
		invariant(e.length === 4, "Cubic bezier arrays must contain four numerical values.", "cubic-bezier-length");
		let [_, v, y, b] = e;
		return cubicBezier(_, v, y, b);
	} else if (isValidEasing(e)) return invariant(easingLookup[e] !== void 0, `Invalid easing type '${e}'`, "invalid-easing-type"), easingLookup[e];
	return e;
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
function createRenderStep(e, _) {
	let v = /* @__PURE__ */ new Set(), y = /* @__PURE__ */ new Set(), b = !1, x = !1, S = /* @__PURE__ */ new WeakSet(), C = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, w = 0;
	function T(_) {
		S.has(_) && (E.schedule(_), e()), w++, _(C);
	}
	let E = {
		schedule: (e, _ = !1, x = !1) => {
			let C = x && b ? v : y;
			return _ && S.add(e), C.has(e) || C.add(e), e;
		},
		cancel: (e) => {
			y.delete(e), S.delete(e);
		},
		process: (e) => {
			if (C = e, b) {
				x = !0;
				return;
			}
			b = !0, [v, y] = [y, v], v.forEach(T), _ && statsBuffer.value && statsBuffer.value.frameloop[_].push(w), w = 0, v.clear(), b = !1, x && (x = !1, E.process(e));
		}
	};
	return E;
}
var maxElapsed = 40;
function createRenderBatcher(e, _) {
	let v = !1, y = !0, b = {
		delta: 0,
		timestamp: 0,
		isProcessing: !1
	}, x = () => v = !0, S = stepsOrder.reduce((e, v) => (e[v] = createRenderStep(x, _ ? v : void 0), e), {}), { setup: C, read: w, resolveKeyframes: T, preUpdate: E, update: D, preRender: O, render: k, postRender: A } = S, j = () => {
		let x = MotionGlobalConfig.useManualTiming ? b.timestamp : performance.now();
		v = !1, MotionGlobalConfig.useManualTiming || (b.delta = y ? 1e3 / 60 : Math.max(Math.min(x - b.timestamp, maxElapsed), 1)), b.timestamp = x, b.isProcessing = !0, C.process(b), w.process(b), T.process(b), E.process(b), D.process(b), O.process(b), k.process(b), A.process(b), b.isProcessing = !1, v && _ && (y = !1, e(j));
	}, M = () => {
		v = !0, y = !0, b.isProcessing || e(j);
	};
	return {
		schedule: stepsOrder.reduce((e, _) => {
			let y = S[_];
			return e[_] = (e, _ = !1, b = !1) => (v || M(), y.schedule(e, _, b)), e;
		}, {}),
		cancel: (e) => {
			for (let _ = 0; _ < stepsOrder.length; _++) S[stepsOrder[_]].cancel(e);
		},
		state: b,
		steps: S
	};
}
var { schedule: frame, cancel: cancelFrame, state: frameData, steps: frameSteps } = /* @__PURE__ */ createRenderBatcher(typeof requestAnimationFrame < "u" ? requestAnimationFrame : noop, !0), now;
function clearTime() {
	now = void 0;
}
var time = {
	now: () => (now === void 0 && time.set(frameData.isProcessing || MotionGlobalConfig.useManualTiming ? frameData.timestamp : performance.now()), now),
	set: (e) => {
		now = e, queueMicrotask(clearTime);
	}
}, activeAnimations = {
	layout: 0,
	mainThread: 0,
	waapi: 0
}, checkStringStartsWith = (e) => (_) => typeof _ == "string" && _.startsWith(e), isCSSVariableName = /* @__PURE__ */ checkStringStartsWith("--"), startsAsVariableToken = /* @__PURE__ */ checkStringStartsWith("var(--"), isCSSVariableToken = (e) => startsAsVariableToken(e) ? singleCssVariableRegex.test(e.split("/*")[0].trim()) : !1, singleCssVariableRegex = /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu, number = {
	test: (e) => typeof e == "number",
	parse: parseFloat,
	transform: (e) => e
}, alpha = {
	...number,
	transform: (e) => clamp(0, 1, e)
}, scale = {
	...number,
	default: 1
}, sanitize = (e) => Math.round(e * 1e5) / 1e5, floatRegex = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu;
function isNullish(e) {
	return e == null;
}
var singleColorRegex = /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu, isColorString = (e, _) => (v) => !!(typeof v == "string" && singleColorRegex.test(v) && v.startsWith(e) || _ && !isNullish(v) && Object.prototype.hasOwnProperty.call(v, _)), splitColor = (e, _, v) => (y) => {
	if (typeof y != "string") return y;
	let [b, x, S, C] = y.match(floatRegex);
	return {
		[e]: parseFloat(b),
		[_]: parseFloat(x),
		[v]: parseFloat(S),
		alpha: C === void 0 ? 1 : parseFloat(C)
	};
}, clampRgbUnit = (e) => clamp(0, 255, e), rgbUnit = {
	...number,
	transform: (e) => Math.round(clampRgbUnit(e))
}, rgba = {
	test: /* @__PURE__ */ isColorString("rgb", "red"),
	parse: /* @__PURE__ */ splitColor("red", "green", "blue"),
	transform: ({ red: e, green: _, blue: v, alpha: y = 1 }) => "rgba(" + rgbUnit.transform(e) + ", " + rgbUnit.transform(_) + ", " + rgbUnit.transform(v) + ", " + sanitize(alpha.transform(y)) + ")"
};
function parseHex(e) {
	let _ = "", v = "", y = "", b = "";
	return e.length > 5 ? (_ = e.substring(1, 3), v = e.substring(3, 5), y = e.substring(5, 7), b = e.substring(7, 9)) : (_ = e.substring(1, 2), v = e.substring(2, 3), y = e.substring(3, 4), b = e.substring(4, 5), _ += _, v += v, y += y, b += b), {
		red: parseInt(_, 16),
		green: parseInt(v, 16),
		blue: parseInt(y, 16),
		alpha: b ? parseInt(b, 16) / 255 : 1
	};
}
var hex = {
	test: /* @__PURE__ */ isColorString("#"),
	parse: parseHex,
	transform: rgba.transform
}, createUnitType = /* @__NO_SIDE_EFFECTS__ */ (e) => ({
	test: (_) => typeof _ == "string" && _.endsWith(e) && _.split(" ").length === 1,
	parse: parseFloat,
	transform: (_) => `${_}${e}`
}), degrees = /* @__PURE__ */ createUnitType("deg"), percent = /* @__PURE__ */ createUnitType("%"), px = /* @__PURE__ */ createUnitType("px"), vh = /* @__PURE__ */ createUnitType("vh"), vw = /* @__PURE__ */ createUnitType("vw"), progressPercentage = /* @__PURE__ */ (() => ({
	...percent,
	parse: (e) => percent.parse(e) / 100,
	transform: (e) => percent.transform(e * 100)
}))(), hsla = {
	test: /* @__PURE__ */ isColorString("hsl", "hue"),
	parse: /* @__PURE__ */ splitColor("hue", "saturation", "lightness"),
	transform: ({ hue: e, saturation: _, lightness: v, alpha: y = 1 }) => "hsla(" + Math.round(e) + ", " + percent.transform(sanitize(_)) + ", " + percent.transform(sanitize(v)) + ", " + sanitize(alpha.transform(y)) + ")"
}, color = {
	test: (e) => rgba.test(e) || hex.test(e) || hsla.test(e),
	parse: (e) => rgba.test(e) ? rgba.parse(e) : hsla.test(e) ? hsla.parse(e) : hex.parse(e),
	transform: (e) => typeof e == "string" ? e : e.hasOwnProperty("red") ? rgba.transform(e) : hsla.transform(e),
	getAnimatableNone: (e) => {
		let _ = color.parse(e);
		return _.alpha = 0, color.transform(_);
	}
}, colorRegex = /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;
function test(e) {
	return isNaN(e) && typeof e == "string" && (e.match(floatRegex)?.length || 0) + (e.match(colorRegex)?.length || 0) > 0;
}
var NUMBER_TOKEN = "number", COLOR_TOKEN = "color", VAR_TOKEN = "var", VAR_FUNCTION_TOKEN = "var(", SPLIT_TOKEN = "${}", complexRegex = /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
function analyseComplexValue(e) {
	let _ = e.toString(), v = [], y = {
		color: [],
		number: [],
		var: []
	}, b = [], x = 0;
	return {
		values: v,
		split: _.replace(complexRegex, (e) => (color.test(e) ? (y.color.push(x), b.push(COLOR_TOKEN), v.push(color.parse(e))) : e.startsWith(VAR_FUNCTION_TOKEN) ? (y.var.push(x), b.push(VAR_TOKEN), v.push(e)) : (y.number.push(x), b.push(NUMBER_TOKEN), v.push(parseFloat(e))), ++x, SPLIT_TOKEN)).split(SPLIT_TOKEN),
		indexes: y,
		types: b
	};
}
function parseComplexValue(e) {
	return analyseComplexValue(e).values;
}
function createTransformer(e) {
	let { split: _, types: v } = analyseComplexValue(e), y = _.length;
	return (e) => {
		let b = "";
		for (let x = 0; x < y; x++) if (b += _[x], e[x] !== void 0) {
			let _ = v[x];
			_ === NUMBER_TOKEN ? b += sanitize(e[x]) : _ === COLOR_TOKEN ? b += color.transform(e[x]) : b += e[x];
		}
		return b;
	};
}
var convertNumbersToZero = (e) => typeof e == "number" ? 0 : color.test(e) ? color.getAnimatableNone(e) : e;
function getAnimatableNone$1(e) {
	let _ = parseComplexValue(e);
	return createTransformer(e)(_.map(convertNumbersToZero));
}
var complex = {
	test,
	parse: parseComplexValue,
	createTransformer,
	getAnimatableNone: getAnimatableNone$1
};
function hueToRgb(e, _, v) {
	return v < 0 && (v += 1), v > 1 && --v, v < 1 / 6 ? e + (_ - e) * 6 * v : v < 1 / 2 ? _ : v < 2 / 3 ? e + (_ - e) * (2 / 3 - v) * 6 : e;
}
function hslaToRgba({ hue: e, saturation: _, lightness: v, alpha: y }) {
	e /= 360, _ /= 100, v /= 100;
	let b = 0, x = 0, S = 0;
	if (!_) b = x = S = v;
	else {
		let y = v < .5 ? v * (1 + _) : v + _ - v * _, C = 2 * v - y;
		b = hueToRgb(C, y, e + 1 / 3), x = hueToRgb(C, y, e), S = hueToRgb(C, y, e - 1 / 3);
	}
	return {
		red: Math.round(b * 255),
		green: Math.round(x * 255),
		blue: Math.round(S * 255),
		alpha: y
	};
}
function mixImmediate(e, _) {
	return (v) => v > 0 ? _ : e;
}
var mixNumber = (e, _, v) => e + (_ - e) * v, mixLinearColor = (e, _, v) => {
	let y = e * e, b = v * (_ * _ - y) + y;
	return b < 0 ? 0 : Math.sqrt(b);
}, colorTypes = [
	hex,
	rgba,
	hsla
], getColorType = (e) => colorTypes.find((_) => _.test(e));
function asRGBA(e) {
	let _ = getColorType(e);
	if (warning(!!_, `'${e}' is not an animatable color. Use the equivalent color code instead.`, "color-not-animatable"), !_) return !1;
	let v = _.parse(e);
	return _ === hsla && (v = hslaToRgba(v)), v;
}
var mixColor = (e, _) => {
	let v = asRGBA(e), y = asRGBA(_);
	if (!v || !y) return mixImmediate(e, _);
	let b = { ...v };
	return (e) => (b.red = mixLinearColor(v.red, y.red, e), b.green = mixLinearColor(v.green, y.green, e), b.blue = mixLinearColor(v.blue, y.blue, e), b.alpha = mixNumber(v.alpha, y.alpha, e), rgba.transform(b));
}, invisibleValues = new Set(["none", "hidden"]);
function mixVisibility(e, _) {
	return invisibleValues.has(e) ? (v) => v <= 0 ? e : _ : (v) => v >= 1 ? _ : e;
}
function mixNumber$1(e, _) {
	return (v) => mixNumber(e, _, v);
}
function getMixer(e) {
	return typeof e == "number" ? mixNumber$1 : typeof e == "string" ? isCSSVariableToken(e) ? mixImmediate : color.test(e) ? mixColor : mixComplex : Array.isArray(e) ? mixArray : typeof e == "object" ? color.test(e) ? mixColor : mixObject : mixImmediate;
}
function mixArray(e, _) {
	let v = [...e], y = v.length, b = e.map((e, v) => getMixer(e)(e, _[v]));
	return (e) => {
		for (let _ = 0; _ < y; _++) v[_] = b[_](e);
		return v;
	};
}
function mixObject(e, _) {
	let v = {
		...e,
		..._
	}, y = {};
	for (let b in v) e[b] !== void 0 && _[b] !== void 0 && (y[b] = getMixer(e[b])(e[b], _[b]));
	return (e) => {
		for (let _ in y) v[_] = y[_](e);
		return v;
	};
}
function matchOrder(e, _) {
	let v = [], y = {
		color: 0,
		var: 0,
		number: 0
	};
	for (let b = 0; b < _.values.length; b++) {
		let x = _.types[b], S = e.indexes[x][y[x]];
		v[b] = e.values[S] ?? 0, y[x]++;
	}
	return v;
}
var mixComplex = (e, _) => {
	let v = complex.createTransformer(_), y = analyseComplexValue(e), b = analyseComplexValue(_);
	return y.indexes.var.length === b.indexes.var.length && y.indexes.color.length === b.indexes.color.length && y.indexes.number.length >= b.indexes.number.length ? invisibleValues.has(e) && !b.values.length || invisibleValues.has(_) && !y.values.length ? mixVisibility(e, _) : pipe(mixArray(matchOrder(y, b), b.values), v) : (warning(!0, `Complex values '${e}' and '${_}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`, "complex-values-different"), mixImmediate(e, _));
};
function mix(e, _, v) {
	return typeof e == "number" && typeof _ == "number" && typeof v == "number" ? mixNumber(e, _, v) : getMixer(e)(e, _);
}
var frameloopDriver = (e) => {
	let _ = ({ timestamp: _ }) => e(_);
	return {
		start: (e = !0) => frame.update(_, e),
		stop: () => cancelFrame(_),
		now: () => frameData.isProcessing ? frameData.timestamp : time.now()
	};
}, generateLinearEasing = (e, _, v = 10) => {
	let y = "", b = Math.max(Math.round(_ / v), 2);
	for (let _ = 0; _ < b; _++) y += Math.round(e(_ / (b - 1)) * 1e4) / 1e4 + ", ";
	return `linear(${y.substring(0, y.length - 2)})`;
}, maxGeneratorDuration = 2e4;
function calcGeneratorDuration(e) {
	let _ = 0, v = e.next(_);
	for (; !v.done && _ < 2e4;) _ += 50, v = e.next(_);
	return _ >= 2e4 ? Infinity : _;
}
function createGeneratorEasing(e, _ = 100, v) {
	let y = v({
		...e,
		keyframes: [0, _]
	}), b = Math.min(calcGeneratorDuration(y), maxGeneratorDuration);
	return {
		type: "keyframes",
		ease: (e) => y.next(b * e).value / _,
		duration: /* @__PURE__ */ millisecondsToSeconds(b)
	};
}
var velocitySampleDuration = 5;
function calcGeneratorVelocity(e, _, v) {
	let y = Math.max(_ - velocitySampleDuration, 0);
	return velocityPerSecond(v - e(y), _ - y);
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
function findSpring({ duration: e = springDefaults.duration, bounce: _ = springDefaults.bounce, velocity: v = springDefaults.velocity, mass: y = springDefaults.mass }) {
	let b, x;
	warning(e <= /* @__PURE__ */ secondsToMilliseconds(springDefaults.maxDuration), "Spring duration must be 10 seconds or less", "spring-duration-limit");
	let S = 1 - _;
	S = clamp(springDefaults.minDamping, springDefaults.maxDamping, S), e = clamp(springDefaults.minDuration, springDefaults.maxDuration, /* @__PURE__ */ millisecondsToSeconds(e)), S < 1 ? (b = (_) => {
		let y = _ * S, b = y * e, x = y - v, C = calcAngularFreq(_, S), w = Math.exp(-b);
		return safeMin - x / C * w;
	}, x = (_) => {
		let y = _ * S * e, x = y * v + v, C = S ** 2 * _ ** 2 * e, w = Math.exp(-y), T = calcAngularFreq(_ ** 2, S);
		return (-b(_) + safeMin > 0 ? -1 : 1) * ((x - C) * w) / T;
	}) : (b = (_) => {
		let y = Math.exp(-_ * e), b = (_ - v) * e + 1;
		return -safeMin + y * b;
	}, x = (_) => Math.exp(-_ * e) * ((v - _) * (e * e)));
	let C = 5 / e, w = approximateRoot(b, x, C);
	if (e = /* @__PURE__ */ secondsToMilliseconds(e), isNaN(w)) return {
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		duration: e
	};
	{
		let _ = w ** 2 * y;
		return {
			stiffness: _,
			damping: S * 2 * Math.sqrt(y * _),
			duration: e
		};
	}
}
var rootIterations = 12;
function approximateRoot(e, _, v) {
	let y = v;
	for (let v = 1; v < rootIterations; v++) y -= e(y) / _(y);
	return y;
}
function calcAngularFreq(e, _) {
	return e * Math.sqrt(1 - _ * _);
}
var durationKeys = ["duration", "bounce"], physicsKeys = [
	"stiffness",
	"damping",
	"mass"
];
function isSpringType(e, _) {
	return _.some((_) => e[_] !== void 0);
}
function getSpringOptions(e) {
	let _ = {
		velocity: springDefaults.velocity,
		stiffness: springDefaults.stiffness,
		damping: springDefaults.damping,
		mass: springDefaults.mass,
		isResolvedFromDuration: !1,
		...e
	};
	if (!isSpringType(e, physicsKeys) && isSpringType(e, durationKeys)) if (e.visualDuration) {
		let v = e.visualDuration, y = 2 * Math.PI / (v * 1.2), b = y * y, x = 2 * clamp(.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(b);
		_ = {
			..._,
			mass: springDefaults.mass,
			stiffness: b,
			damping: x
		};
	} else {
		let v = findSpring(e);
		_ = {
			..._,
			...v,
			mass: springDefaults.mass
		}, _.isResolvedFromDuration = !0;
	}
	return _;
}
function spring(e = springDefaults.visualDuration, _ = springDefaults.bounce) {
	let v = typeof e == "object" ? e : {
		visualDuration: e,
		keyframes: [0, 1],
		bounce: _
	}, { restSpeed: y, restDelta: b } = v, x = v.keyframes[0], S = v.keyframes[v.keyframes.length - 1], C = {
		done: !1,
		value: x
	}, { stiffness: w, damping: T, mass: E, duration: D, velocity: O, isResolvedFromDuration: k } = getSpringOptions({
		...v,
		velocity: -/* @__PURE__ */ millisecondsToSeconds(v.velocity || 0)
	}), A = O || 0, j = T / (2 * Math.sqrt(w * E)), M = S - x, N = /* @__PURE__ */ millisecondsToSeconds(Math.sqrt(w / E)), P = Math.abs(M) < 5;
	y ||= P ? springDefaults.restSpeed.granular : springDefaults.restSpeed.default, b ||= P ? springDefaults.restDelta.granular : springDefaults.restDelta.default;
	let F;
	if (j < 1) {
		let e = calcAngularFreq(N, j);
		F = (_) => S - Math.exp(-j * N * _) * ((A + j * N * M) / e * Math.sin(e * _) + M * Math.cos(e * _));
	} else if (j === 1) F = (e) => S - Math.exp(-N * e) * (M + (A + N * M) * e);
	else {
		let e = N * Math.sqrt(j * j - 1);
		F = (_) => {
			let v = Math.exp(-j * N * _), y = Math.min(e * _, 300);
			return S - v * ((A + j * N * M) * Math.sinh(y) + e * M * Math.cosh(y)) / e;
		};
	}
	let I = {
		calculatedDuration: k && D || null,
		next: (e) => {
			let _ = F(e);
			if (k) C.done = e >= D;
			else {
				let v = e === 0 ? A : 0;
				j < 1 && (v = e === 0 ? /* @__PURE__ */ secondsToMilliseconds(A) : calcGeneratorVelocity(F, e, _));
				let x = Math.abs(v) <= y, w = Math.abs(S - _) <= b;
				C.done = x && w;
			}
			return C.value = C.done ? S : _, C;
		},
		toString: () => {
			let e = Math.min(calcGeneratorDuration(I), maxGeneratorDuration), _ = generateLinearEasing((_) => I.next(e * _).value, e, 30);
			return e + "ms " + _;
		},
		toTransition: () => {}
	};
	return I;
}
spring.applyToOptions = (e) => {
	let _ = createGeneratorEasing(e, 100, spring);
	return e.ease = _.ease, e.duration = /* @__PURE__ */ secondsToMilliseconds(_.duration), e.type = "keyframes", e;
};
function inertia({ keyframes: e, velocity: _ = 0, power: v = .8, timeConstant: y = 325, bounceDamping: b = 10, bounceStiffness: x = 500, modifyTarget: S, min: C, max: w, restDelta: T = .5, restSpeed: E }) {
	let D = e[0], O = {
		done: !1,
		value: D
	}, k = (e) => C !== void 0 && e < C || w !== void 0 && e > w, A = (e) => C === void 0 ? w : w === void 0 || Math.abs(C - e) < Math.abs(w - e) ? C : w, j = v * _, M = D + j, N = S === void 0 ? M : S(M);
	N !== M && (j = N - D);
	let P = (e) => -j * Math.exp(-e / y), F = (e) => N + P(e), I = (e) => {
		let _ = P(e), v = F(e);
		O.done = Math.abs(_) <= T, O.value = O.done ? N : v;
	}, L, R, z = (e) => {
		k(O.value) && (L = e, R = spring({
			keyframes: [O.value, A(O.value)],
			velocity: calcGeneratorVelocity(F, e, O.value),
			damping: b,
			stiffness: x,
			restDelta: T,
			restSpeed: E
		}));
	};
	return z(0), {
		calculatedDuration: null,
		next: (e) => {
			let _ = !1;
			return !R && L === void 0 && (_ = !0, I(e), z(e)), L !== void 0 && e >= L ? R.next(e - L) : (!_ && I(e), O);
		}
	};
}
function createMixers(e, _, v) {
	let y = [], b = v || MotionGlobalConfig.mix || mix, x = e.length - 1;
	for (let v = 0; v < x; v++) {
		let x = b(e[v], e[v + 1]);
		_ && (x = pipe(Array.isArray(_) ? _[v] || noop : _, x)), y.push(x);
	}
	return y;
}
function interpolate(e, _, { clamp: v = !0, ease: y, mixer: b } = {}) {
	let x = e.length;
	if (invariant(x === _.length, "Both input and output ranges must be the same length", "range-length"), x === 1) return () => _[0];
	if (x === 2 && _[0] === _[1]) return () => _[1];
	let S = e[0] === e[1];
	e[0] > e[x - 1] && (e = [...e].reverse(), _ = [..._].reverse());
	let C = createMixers(_, y, b), w = C.length, T = (v) => {
		if (S && v < e[0]) return _[0];
		let y = 0;
		if (w > 1) for (; y < e.length - 2 && !(v < e[y + 1]); y++);
		let b = /* @__PURE__ */ progress(e[y], e[y + 1], v);
		return C[y](b);
	};
	return v ? (_) => T(clamp(e[0], e[x - 1], _)) : T;
}
function fillOffset(e, _) {
	let v = e[e.length - 1];
	for (let y = 1; y <= _; y++) {
		let b = /* @__PURE__ */ progress(0, _, y);
		e.push(mixNumber(v, 1, b));
	}
}
function defaultOffset(e) {
	let _ = [0];
	return fillOffset(_, e.length - 1), _;
}
function convertOffsetToTimes(e, _) {
	return e.map((e) => e * _);
}
function defaultEasing(e, _) {
	return e.map(() => _ || easeInOut).splice(0, e.length - 1);
}
function keyframes({ duration: e = 300, keyframes: _, times: v, ease: y = "easeInOut" }) {
	let b = isEasingArray(y) ? y.map(easingDefinitionToFunction) : easingDefinitionToFunction(y), x = {
		done: !1,
		value: _[0]
	}, S = interpolate(convertOffsetToTimes(v && v.length === _.length ? v : defaultOffset(_), e), _, { ease: Array.isArray(b) ? b : defaultEasing(_, b) });
	return {
		calculatedDuration: e,
		next: (_) => (x.value = S(_), x.done = _ >= e, x)
	};
}
var isNotNull$1 = (e) => e !== null;
function getFinalKeyframe$1(e, { repeat: _, repeatType: v = "loop" }, y, b = 1) {
	let x = e.filter(isNotNull$1), S = b < 0 || _ && v !== "loop" && _ % 2 == 1 ? 0 : x.length - 1;
	return !S || y === void 0 ? x[S] : y;
}
var transitionTypeMap = {
	decay: inertia,
	inertia,
	tween: keyframes,
	keyframes,
	spring
};
function replaceTransitionType(e) {
	typeof e.type == "string" && (e.type = transitionTypeMap[e.type]);
}
var WithPromise = class {
	constructor() {
		this.updateFinished();
	}
	get finished() {
		return this._finished;
	}
	updateFinished() {
		this._finished = new Promise((e) => {
			this.resolve = e;
		});
	}
	notifyFinished() {
		this.resolve();
	}
	then(e, _) {
		return this.finished.then(e, _);
	}
}, percentToProgress = (e) => e / 100, JSAnimation = class extends WithPromise {
	constructor(e) {
		super(), this.state = "idle", this.startTime = null, this.isStopped = !1, this.currentTime = 0, this.holdTime = null, this.playbackSpeed = 1, this.stop = () => {
			let { motionValue: e } = this.options;
			e && e.updatedAt !== time.now() && this.tick(time.now()), this.isStopped = !0, this.state !== "idle" && (this.teardown(), this.options.onStop?.());
		}, activeAnimations.mainThread++, this.options = e, this.initAnimation(), this.play(), e.autoplay === !1 && this.pause();
	}
	initAnimation() {
		let { options: e } = this;
		replaceTransitionType(e);
		let { type: _ = keyframes, repeat: v = 0, repeatDelay: y = 0, repeatType: b, velocity: x = 0 } = e, { keyframes: S } = e, C = _ || keyframes;
		process.env.NODE_ENV !== "production" && C !== keyframes && invariant(S.length <= 2, `Only two keyframes currently supported with spring and inertia animations. Trying to animate ${S}`, "spring-two-frames"), C !== keyframes && typeof S[0] != "number" && (this.mixKeyframes = pipe(percentToProgress, mix(S[0], S[1])), S = [0, 100]);
		let w = C({
			...e,
			keyframes: S
		});
		b === "mirror" && (this.mirroredGenerator = C({
			...e,
			keyframes: [...S].reverse(),
			velocity: -x
		})), w.calculatedDuration === null && (w.calculatedDuration = calcGeneratorDuration(w));
		let { calculatedDuration: T } = w;
		this.calculatedDuration = T, this.resolvedDuration = T + y, this.totalDuration = this.resolvedDuration * (v + 1) - y, this.generator = w;
	}
	updateTime(e) {
		let _ = Math.round(e - this.startTime) * this.playbackSpeed;
		this.holdTime === null ? this.currentTime = _ : this.currentTime = this.holdTime;
	}
	tick(e, _ = !1) {
		let { generator: v, totalDuration: y, mixKeyframes: b, mirroredGenerator: x, resolvedDuration: S, calculatedDuration: C } = this;
		if (this.startTime === null) return v.next(0);
		let { delay: w = 0, keyframes: T, repeat: E, repeatType: D, repeatDelay: O, type: k, onUpdate: A, finalKeyframe: j } = this.options;
		this.speed > 0 ? this.startTime = Math.min(this.startTime, e) : this.speed < 0 && (this.startTime = Math.min(e - y / this.speed, this.startTime)), _ ? this.currentTime = e : this.updateTime(e);
		let M = this.currentTime - w * (this.playbackSpeed >= 0 ? 1 : -1), N = this.playbackSpeed >= 0 ? M < 0 : M > y;
		this.currentTime = Math.max(M, 0), this.state === "finished" && this.holdTime === null && (this.currentTime = y);
		let P = this.currentTime, F = v;
		if (E) {
			let e = Math.min(this.currentTime, y) / S, _ = Math.floor(e), v = e % 1;
			!v && e >= 1 && (v = 1), v === 1 && _--, _ = Math.min(_, E + 1), _ % 2 && (D === "reverse" ? (v = 1 - v, O && (v -= O / S)) : D === "mirror" && (F = x)), P = clamp(0, 1, v) * S;
		}
		let I = N ? {
			done: !1,
			value: T[0]
		} : F.next(P);
		b && (I.value = b(I.value));
		let { done: L } = I;
		!N && C !== null && (L = this.playbackSpeed >= 0 ? this.currentTime >= y : this.currentTime <= 0);
		let R = this.holdTime === null && (this.state === "finished" || this.state === "running" && L);
		return R && k !== inertia && (I.value = getFinalKeyframe$1(T, this.options, j, this.speed)), A && A(I.value), R && this.finish(), I;
	}
	then(e, _) {
		return this.finished.then(e, _);
	}
	get duration() {
		return /* @__PURE__ */ millisecondsToSeconds(this.calculatedDuration);
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(e);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(this.currentTime);
	}
	set time(e) {
		e = /* @__PURE__ */ secondsToMilliseconds(e), this.currentTime = e, this.startTime === null || this.holdTime !== null || this.playbackSpeed === 0 ? this.holdTime = e : this.driver && (this.startTime = this.driver.now() - e / this.playbackSpeed), this.driver?.start(!1);
	}
	get speed() {
		return this.playbackSpeed;
	}
	set speed(e) {
		this.updateTime(time.now());
		let _ = this.playbackSpeed !== e;
		this.playbackSpeed = e, _ && (this.time = /* @__PURE__ */ millisecondsToSeconds(this.currentTime));
	}
	play() {
		if (this.isStopped) return;
		let { driver: e = frameloopDriver, startTime: _ } = this.options;
		this.driver ||= e((e) => this.tick(e)), this.options.onPlay?.();
		let v = this.driver.now();
		this.state === "finished" ? (this.updateFinished(), this.startTime = v) : this.holdTime === null ? this.startTime ||= _ ?? v : this.startTime = v - this.holdTime, this.state === "finished" && this.speed < 0 && (this.startTime += this.calculatedDuration), this.holdTime = null, this.state = "running", this.driver.start();
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
	sample(e) {
		return this.startTime = 0, this.tick(e, !0);
	}
	attachTimeline(e) {
		return this.options.allowFlatten && (this.options.type = "keyframes", this.options.ease = "linear", this.initAnimation()), this.driver?.stop(), e.observe(this);
	}
};
function fillWildcards(e) {
	for (let _ = 1; _ < e.length; _++) e[_] ?? (e[_] = e[_ - 1]);
}
var radToDeg = (e) => e * 180 / Math.PI, rotate = (e) => rebaseAngle(radToDeg(Math.atan2(e[1], e[0]))), matrix2dParsers = {
	x: 4,
	y: 5,
	translateX: 4,
	translateY: 5,
	scaleX: 0,
	scaleY: 3,
	scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
	rotate,
	rotateZ: rotate,
	skewX: (e) => radToDeg(Math.atan(e[1])),
	skewY: (e) => radToDeg(Math.atan(e[2])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2
}, rebaseAngle = (e) => (e %= 360, e < 0 && (e += 360), e), rotateZ = rotate, scaleX = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]), scaleY = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]), matrix3dParsers = {
	x: 12,
	y: 13,
	z: 14,
	translateX: 12,
	translateY: 13,
	translateZ: 14,
	scaleX,
	scaleY,
	scale: (e) => (scaleX(e) + scaleY(e)) / 2,
	rotateX: (e) => rebaseAngle(radToDeg(Math.atan2(e[6], e[5]))),
	rotateY: (e) => rebaseAngle(radToDeg(Math.atan2(-e[2], e[0]))),
	rotateZ,
	rotate: rotateZ,
	skewX: (e) => radToDeg(Math.atan(e[4])),
	skewY: (e) => radToDeg(Math.atan(e[1])),
	skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2
};
function defaultTransformValue(e) {
	return e.includes("scale") ? 1 : 0;
}
function parseValueFromTransform(e, _) {
	if (!e || e === "none") return defaultTransformValue(_);
	let v = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u), y, b;
	if (v) y = matrix3dParsers, b = v;
	else {
		let _ = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
		y = matrix2dParsers, b = _;
	}
	if (!b) return defaultTransformValue(_);
	let x = y[_], S = b[1].split(",").map(convertTransformToNumber);
	return typeof x == "function" ? x(S) : S[x];
}
var readTransformValue = (e, _) => {
	let { transform: v = "none" } = getComputedStyle(e);
	return parseValueFromTransform(v, _);
};
function convertTransformToNumber(e) {
	return parseFloat(e.trim());
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
], transformProps = /* @__PURE__ */ (() => new Set(transformPropOrder))(), isNumOrPxType = (e) => e === number || e === px, transformKeys = new Set([
	"x",
	"y",
	"z"
]), nonTranslationalTransformKeys = transformPropOrder.filter((e) => !transformKeys.has(e));
function removeNonTranslationalTransform(e) {
	let _ = [];
	return nonTranslationalTransformKeys.forEach((v) => {
		let y = e.getValue(v);
		y !== void 0 && (_.push([v, y.get()]), y.set(v.startsWith("scale") ? 1 : 0));
	}), _;
}
var positionalValues = {
	width: ({ x: e }, { paddingLeft: _ = "0", paddingRight: v = "0" }) => e.max - e.min - parseFloat(_) - parseFloat(v),
	height: ({ y: e }, { paddingTop: _ = "0", paddingBottom: v = "0" }) => e.max - e.min - parseFloat(_) - parseFloat(v),
	top: (e, { top: _ }) => parseFloat(_),
	left: (e, { left: _ }) => parseFloat(_),
	bottom: ({ y: e }, { top: _ }) => parseFloat(_) + (e.max - e.min),
	right: ({ x: e }, { left: _ }) => parseFloat(_) + (e.max - e.min),
	x: (e, { transform: _ }) => parseValueFromTransform(_, "x"),
	y: (e, { transform: _ }) => parseValueFromTransform(_, "y")
};
positionalValues.translateX = positionalValues.x, positionalValues.translateY = positionalValues.y;
var toResolve = /* @__PURE__ */ new Set(), isScheduled = !1, anyNeedsMeasurement = !1, isForced = !1;
function measureAllKeyframes() {
	if (anyNeedsMeasurement) {
		let e = Array.from(toResolve).filter((e) => e.needsMeasurement), _ = new Set(e.map((e) => e.element)), v = /* @__PURE__ */ new Map();
		_.forEach((e) => {
			let _ = removeNonTranslationalTransform(e);
			_.length && (v.set(e, _), e.render());
		}), e.forEach((e) => e.measureInitialState()), _.forEach((e) => {
			e.render();
			let _ = v.get(e);
			_ && _.forEach(([_, v]) => {
				e.getValue(_)?.set(v);
			});
		}), e.forEach((e) => e.measureEndState()), e.forEach((e) => {
			e.suspendedScrollY !== void 0 && window.scrollTo(0, e.suspendedScrollY);
		});
	}
	anyNeedsMeasurement = !1, isScheduled = !1, toResolve.forEach((e) => e.complete(isForced)), toResolve.clear();
}
function readAllKeyframes() {
	toResolve.forEach((e) => {
		e.readKeyframes(), e.needsMeasurement && (anyNeedsMeasurement = !0);
	});
}
function flushKeyframeResolvers() {
	isForced = !0, readAllKeyframes(), measureAllKeyframes(), isForced = !1;
}
var KeyframeResolver = class {
	constructor(e, _, v, y, b, x = !1) {
		this.state = "pending", this.isAsync = !1, this.needsMeasurement = !1, this.unresolvedKeyframes = [...e], this.onComplete = _, this.name = v, this.motionValue = y, this.element = b, this.isAsync = x;
	}
	scheduleResolve() {
		this.state = "scheduled", this.isAsync ? (toResolve.add(this), isScheduled || (isScheduled = !0, frame.read(readAllKeyframes), frame.resolveKeyframes(measureAllKeyframes))) : (this.readKeyframes(), this.complete());
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, name: _, element: v, motionValue: y } = this;
		if (e[0] === null) {
			let b = y?.get(), x = e[e.length - 1];
			if (b !== void 0) e[0] = b;
			else if (v && _) {
				let y = v.readValue(_, x);
				y != null && (e[0] = y);
			}
			e[0] === void 0 && (e[0] = x), y && b === void 0 && y.set(e[0]);
		}
		fillWildcards(e);
	}
	setFinalKeyframe() {}
	measureInitialState() {}
	renderEndStyles() {}
	measureEndState() {}
	complete(e = !1) {
		this.state = "complete", this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e), toResolve.delete(this);
	}
	cancel() {
		this.state === "scheduled" && (toResolve.delete(this), this.state = "pending");
	}
	resume() {
		this.state === "pending" && this.scheduleResolve();
	}
}, isCSSVar = (e) => e.startsWith("--");
function setStyle(e, _, v) {
	isCSSVar(_) ? e.style.setProperty(_, v) : e.style[_] = v;
}
var supportsScrollTimeline = /* @__PURE__ */ memo(() => window.ScrollTimeline !== void 0), supportsFlags = {};
function memoSupports(e, _) {
	let v = /* @__PURE__ */ memo(e);
	return () => supportsFlags[_] ?? v();
}
var supportsLinearEasing = /* @__PURE__ */ memoSupports(() => {
	try {
		document.createElement("div").animate({ opacity: 0 }, { easing: "linear(0, 1)" });
	} catch {
		return !1;
	}
	return !0;
}, "linearEasing"), cubicBezierAsString = ([e, _, v, y]) => `cubic-bezier(${e}, ${_}, ${v}, ${y})`, supportedWaapiEasing = {
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
function mapEasingToNativeEasing(e, _) {
	if (e) return typeof e == "function" ? supportsLinearEasing() ? generateLinearEasing(e, _) : "ease-out" : isBezierDefinition(e) ? cubicBezierAsString(e) : Array.isArray(e) ? e.map((e) => mapEasingToNativeEasing(e, _) || supportedWaapiEasing.easeOut) : supportedWaapiEasing[e];
}
function startWaapiAnimation(e, _, v, { delay: y = 0, duration: b = 300, repeat: x = 0, repeatType: S = "loop", ease: C = "easeOut", times: w } = {}, T = void 0) {
	let E = { [_]: v };
	w && (E.offset = w);
	let D = mapEasingToNativeEasing(C, b);
	Array.isArray(D) && (E.easing = D), statsBuffer.value && activeAnimations.waapi++;
	let O = {
		delay: y,
		duration: b,
		easing: Array.isArray(D) ? "linear" : D,
		fill: "both",
		iterations: x + 1,
		direction: S === "reverse" ? "alternate" : "normal"
	};
	T && (O.pseudoElement = T);
	let k = e.animate(E, O);
	return statsBuffer.value && k.finished.finally(() => {
		activeAnimations.waapi--;
	}), k;
}
function isGenerator(e) {
	return typeof e == "function" && "applyToOptions" in e;
}
function applyGeneratorOptions({ type: e, ..._ }) {
	return isGenerator(e) && supportsLinearEasing() ? e.applyToOptions(_) : (_.duration ??= 300, _.ease ??= "easeOut", _);
}
var NativeAnimation = class extends WithPromise {
	constructor(e) {
		if (super(), this.finishedTime = null, this.isStopped = !1, !e) return;
		let { element: _, name: v, keyframes: y, pseudoElement: b, allowFlatten: x = !1, finalKeyframe: S, onComplete: C } = e;
		this.isPseudoElement = !!b, this.allowFlatten = x, this.options = e, invariant(typeof e.type != "string", "Mini animate() doesn't support \"type\" as a string.", "mini-spring");
		let w = applyGeneratorOptions(e);
		this.animation = startWaapiAnimation(_, v, y, w, b), w.autoplay === !1 && this.animation.pause(), this.animation.onfinish = () => {
			if (this.finishedTime = this.time, !b) {
				let e = getFinalKeyframe$1(y, this.options, S, this.speed);
				this.updateMotionValue ? this.updateMotionValue(e) : setStyle(_, v, e), this.animation.cancel();
			}
			C?.(), this.notifyFinished();
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
		let { state: e } = this;
		e === "idle" || e === "finished" || (this.updateMotionValue ? this.updateMotionValue() : this.commitStyles(), this.isPseudoElement || this.cancel());
	}
	commitStyles() {
		this.isPseudoElement || this.animation.commitStyles?.();
	}
	get duration() {
		let e = this.animation.effect?.getComputedTiming?.().duration || 0;
		return /* @__PURE__ */ millisecondsToSeconds(Number(e));
	}
	get iterationDuration() {
		let { delay: e = 0 } = this.options || {};
		return this.duration + /* @__PURE__ */ millisecondsToSeconds(e);
	}
	get time() {
		return /* @__PURE__ */ millisecondsToSeconds(Number(this.animation.currentTime) || 0);
	}
	set time(e) {
		this.finishedTime = null, this.animation.currentTime = /* @__PURE__ */ secondsToMilliseconds(e);
	}
	get speed() {
		return this.animation.playbackRate;
	}
	set speed(e) {
		e < 0 && (this.finishedTime = null), this.animation.playbackRate = e;
	}
	get state() {
		return this.finishedTime === null ? this.animation.playState : "finished";
	}
	get startTime() {
		return Number(this.animation.startTime);
	}
	set startTime(e) {
		this.animation.startTime = e;
	}
	attachTimeline({ timeline: e, observe: _ }) {
		return this.allowFlatten && this.animation.effect?.updateTiming({ easing: "linear" }), this.animation.onfinish = null, e && supportsScrollTimeline() ? (this.animation.timeline = e, noop) : _(this);
	}
}, unsupportedEasingFunctions = {
	anticipate,
	backInOut,
	circInOut
};
function isUnsupportedEase(e) {
	return e in unsupportedEasingFunctions;
}
function replaceStringEasing(e) {
	typeof e.ease == "string" && isUnsupportedEase(e.ease) && (e.ease = unsupportedEasingFunctions[e.ease]);
}
var sampleDelta = 10, NativeAnimationExtended = class extends NativeAnimation {
	constructor(e) {
		replaceStringEasing(e), replaceTransitionType(e), super(e), e.startTime && (this.startTime = e.startTime), this.options = e;
	}
	updateMotionValue(e) {
		let { motionValue: _, onUpdate: v, onComplete: y, element: b, ...x } = this.options;
		if (!_) return;
		if (e !== void 0) {
			_.set(e);
			return;
		}
		let S = new JSAnimation({
			...x,
			autoplay: !1
		}), C = /* @__PURE__ */ secondsToMilliseconds(this.finishedTime ?? this.time);
		_.setWithVelocity(S.sample(C - sampleDelta).value, S.sample(C).value, sampleDelta), S.stop();
	}
}, isAnimatable = (e, _) => _ === "zIndex" ? !1 : !!(typeof e == "number" || Array.isArray(e) || typeof e == "string" && (complex.test(e) || e === "0") && !e.startsWith("url("));
function hasKeyframesChanged(e) {
	let _ = e[0];
	if (e.length === 1) return !0;
	for (let v = 0; v < e.length; v++) if (e[v] !== _) return !0;
}
function canAnimate(e, _, v, y) {
	let b = e[0];
	if (b === null) return !1;
	if (_ === "display" || _ === "visibility") return !0;
	let x = e[e.length - 1], S = isAnimatable(b, _), C = isAnimatable(x, _);
	return warning(S === C, `You are trying to animate ${_} from "${b}" to "${x}". "${S ? x : b}" is not an animatable value.`, "value-not-animatable"), !S || !C ? !1 : hasKeyframesChanged(e) || (v === "spring" || isGenerator(v)) && y;
}
function makeAnimationInstant(e) {
	e.duration = 0, e.type = "keyframes";
}
var acceleratedValues = new Set([
	"opacity",
	"clipPath",
	"filter",
	"transform"
]), supportsWaapi = /* @__PURE__ */ memo(() => Object.hasOwnProperty.call(Element.prototype, "animate"));
function supportsBrowserAnimation(e) {
	let { motionValue: _, name: v, repeatDelay: y, repeatType: b, damping: x, type: S } = e;
	if (!(_?.owner?.current instanceof HTMLElement)) return !1;
	let { onUpdate: C, transformTemplate: w } = _.owner.getProps();
	return supportsWaapi() && v && acceleratedValues.has(v) && (v !== "transform" || !w) && !C && !y && b !== "mirror" && x !== 0 && S !== "inertia";
}
var MAX_RESOLVE_DELAY = 40, AsyncMotionValueAnimation = class extends WithPromise {
	constructor({ autoplay: e = !0, delay: _ = 0, type: v = "keyframes", repeat: y = 0, repeatDelay: b = 0, repeatType: x = "loop", keyframes: S, name: C, motionValue: w, element: T, ...E }) {
		super(), this.stop = () => {
			this._animation && (this._animation.stop(), this.stopTimeline?.()), this.keyframeResolver?.cancel();
		}, this.createdAt = time.now();
		let D = {
			autoplay: e,
			delay: _,
			type: v,
			repeat: y,
			repeatDelay: b,
			repeatType: x,
			name: C,
			motionValue: w,
			element: T,
			...E
		};
		this.keyframeResolver = new (T?.KeyframeResolver || KeyframeResolver)(S, (e, _, v) => this.onKeyframesResolved(e, _, D, !v), C, w, T), this.keyframeResolver?.scheduleResolve();
	}
	onKeyframesResolved(e, _, v, y) {
		this.keyframeResolver = void 0;
		let { name: b, type: x, velocity: S, delay: C, isHandoff: w, onUpdate: T } = v;
		this.resolvedAt = time.now(), canAnimate(e, b, x, S) || ((MotionGlobalConfig.instantAnimations || !C) && T?.(getFinalKeyframe$1(e, v, _)), e[0] = e[e.length - 1], makeAnimationInstant(v), v.repeat = 0);
		let E = {
			startTime: y ? this.resolvedAt && this.resolvedAt - this.createdAt > MAX_RESOLVE_DELAY ? this.resolvedAt : this.createdAt : void 0,
			finalKeyframe: _,
			...v,
			keyframes: e
		}, D = !w && supportsBrowserAnimation(E) ? new NativeAnimationExtended({
			...E,
			element: E.motionValue.owner.current
		}) : new JSAnimation(E);
		D.finished.then(() => this.notifyFinished()).catch(noop), this.pendingTimeline &&= (this.stopTimeline = D.attachTimeline(this.pendingTimeline), void 0), this._animation = D;
	}
	get finished() {
		return this._animation ? this.animation.finished : this._finished;
	}
	then(e, _) {
		return this.finished.finally(e).then(() => {});
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
	set time(e) {
		this.animation.time = e;
	}
	get speed() {
		return this.animation.speed;
	}
	get state() {
		return this.animation.state;
	}
	set speed(e) {
		this.animation.speed = e;
	}
	get startTime() {
		return this.animation.startTime;
	}
	attachTimeline(e) {
		return this._animation ? this.stopTimeline = this.animation.attachTimeline(e) : this.pendingTimeline = e, () => this.stop();
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
function parseCSSVariable(e) {
	let _ = splitCSSVariableRegex.exec(e);
	if (!_) return [,];
	let [, v, y, b] = _;
	return [`--${v ?? y}`, b];
}
var maxDepth = 4;
function getVariableValue(e, _, v = 1) {
	invariant(v <= maxDepth, `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`, "max-css-var-depth");
	let [y, b] = parseCSSVariable(e);
	if (!y) return;
	let x = window.getComputedStyle(_).getPropertyValue(y);
	if (x) {
		let e = x.trim();
		return isNumericalString(e) ? parseFloat(e) : e;
	}
	return isCSSVariableToken(b) ? getVariableValue(b, _, v + 1) : b;
}
function getValueTransition(e, _) {
	return e?.[_] ?? e?.default ?? e;
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
	test: (e) => e === "auto",
	parse: (e) => e
}, testValueType = (e) => (_) => _.test(e), dimensionValueTypes = [
	number,
	px,
	percent,
	degrees,
	vw,
	vh,
	auto
], findDimensionValueType = (e) => dimensionValueTypes.find(testValueType(e));
function isNone(e) {
	return typeof e == "number" ? e === 0 : e === null ? !0 : e === "none" || e === "0" || isZeroValueString(e);
}
var maxDefaults = new Set([
	"brightness",
	"contrast",
	"saturate",
	"opacity"
]);
function applyDefaultFilter(e) {
	let [_, v] = e.slice(0, -1).split("(");
	if (_ === "drop-shadow") return e;
	let [y] = v.match(floatRegex) || [];
	if (!y) return e;
	let b = v.replace(y, ""), x = maxDefaults.has(_) ? 1 : 0;
	return y !== v && (x *= 100), _ + "(" + x + b + ")";
}
var functionRegex = /\b([a-z-]*)\(.*?\)/gu, filter = {
	...complex,
	getAnimatableNone: (e) => {
		let _ = e.match(functionRegex);
		return _ ? _.map(applyDefaultFilter).join(" ") : e;
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
}, getDefaultValueType = (e) => defaultValueTypes[e];
function getAnimatableNone(e, _) {
	let v = getDefaultValueType(e);
	return v !== filter && (v = complex), v.getAnimatableNone ? v.getAnimatableNone(_) : void 0;
}
var invalidTemplates = new Set([
	"auto",
	"none",
	"0"
]);
function makeNoneKeyframesAnimatable(e, _, v) {
	let y = 0, b;
	for (; y < e.length && !b;) {
		let _ = e[y];
		typeof _ == "string" && !invalidTemplates.has(_) && analyseComplexValue(_).values.length && (b = e[y]), y++;
	}
	if (b && v) for (let y of _) e[y] = getAnimatableNone(v, b);
}
var DOMKeyframesResolver = class extends KeyframeResolver {
	constructor(e, _, v, y, b) {
		super(e, _, v, y, b, !0);
	}
	readKeyframes() {
		let { unresolvedKeyframes: e, element: _, name: v } = this;
		if (!_ || !_.current) return;
		super.readKeyframes();
		for (let v = 0; v < e.length; v++) {
			let y = e[v];
			if (typeof y == "string" && (y = y.trim(), isCSSVariableToken(y))) {
				let b = getVariableValue(y, _.current);
				b !== void 0 && (e[v] = b), v === e.length - 1 && (this.finalKeyframe = y);
			}
		}
		if (this.resolveNoneKeyframes(), !positionalKeys.has(v) || e.length !== 2) return;
		let [y, b] = e, x = findDimensionValueType(y), S = findDimensionValueType(b);
		if (x !== S) if (isNumOrPxType(x) && isNumOrPxType(S)) for (let _ = 0; _ < e.length; _++) {
			let v = e[_];
			typeof v == "string" && (e[_] = parseFloat(v));
		}
		else positionalValues[v] && (this.needsMeasurement = !0);
	}
	resolveNoneKeyframes() {
		let { unresolvedKeyframes: e, name: _ } = this, v = [];
		for (let _ = 0; _ < e.length; _++) (e[_] === null || isNone(e[_])) && v.push(_);
		v.length && makeNoneKeyframesAnimatable(e, v, _);
	}
	measureInitialState() {
		let { element: e, unresolvedKeyframes: _, name: v } = this;
		if (!e || !e.current) return;
		v === "height" && (this.suspendedScrollY = window.pageYOffset), this.measuredOrigin = positionalValues[v](e.measureViewportBox(), window.getComputedStyle(e.current)), _[0] = this.measuredOrigin;
		let y = _[_.length - 1];
		y !== void 0 && e.getValue(v, y).jump(y, !1);
	}
	measureEndState() {
		let { element: e, name: _, unresolvedKeyframes: v } = this;
		if (!e || !e.current) return;
		let y = e.getValue(_);
		y && y.jump(this.measuredOrigin, !1);
		let b = v.length - 1, x = v[b];
		v[b] = positionalValues[_](e.measureViewportBox(), window.getComputedStyle(e.current)), x !== null && this.finalKeyframe === void 0 && (this.finalKeyframe = x), this.removedTransforms?.length && this.removedTransforms.forEach(([_, v]) => {
			e.getValue(_).set(v);
		}), this.resolveNoneKeyframes();
	}
};
function resolveElements(e, _, v) {
	if (e instanceof EventTarget) return [e];
	if (typeof e == "string") {
		let y = document;
		_ && (y = _.current);
		let b = v?.[e] ?? y.querySelectorAll(e);
		return b ? Array.from(b) : [];
	}
	return Array.from(e);
}
var getValueAsType = (e, _) => _ && typeof e == "number" ? _.transform(e) : e;
function isHTMLElement(e) {
	return isObject(e) && "offsetHeight" in e;
}
var MAX_VELOCITY_DELTA = 30, isFloat = (e) => !isNaN(parseFloat(e)), collectMotionValues = { current: void 0 }, MotionValue = class {
	constructor(e, _ = {}) {
		this.canTrackVelocity = null, this.events = {}, this.updateAndNotify = (e) => {
			let _ = time.now();
			if (this.updatedAt !== _ && this.setPrevFrameValue(), this.prev = this.current, this.setCurrent(e), this.current !== this.prev && (this.events.change?.notify(this.current), this.dependents)) for (let e of this.dependents) e.dirty();
		}, this.hasAnimated = !1, this.setCurrent(e), this.owner = _.owner;
	}
	setCurrent(e) {
		this.current = e, this.updatedAt = time.now(), this.canTrackVelocity === null && e !== void 0 && (this.canTrackVelocity = isFloat(this.current));
	}
	setPrevFrameValue(e = this.current) {
		this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt;
	}
	onChange(e) {
		return process.env.NODE_ENV !== "production" && warnOnce(!1, "value.onChange(callback) is deprecated. Switch to value.on(\"change\", callback)."), this.on("change", e);
	}
	on(e, _) {
		this.events[e] || (this.events[e] = new SubscriptionManager());
		let v = this.events[e].add(_);
		return e === "change" ? () => {
			v(), frame.read(() => {
				this.events.change.getSize() || this.stop();
			});
		} : v;
	}
	clearListeners() {
		for (let e in this.events) this.events[e].clear();
	}
	attach(e, _) {
		this.passiveEffect = e, this.stopPassiveEffect = _;
	}
	set(e) {
		this.passiveEffect ? this.passiveEffect(e, this.updateAndNotify) : this.updateAndNotify(e);
	}
	setWithVelocity(e, _, v) {
		this.set(_), this.prev = void 0, this.prevFrameValue = e, this.prevUpdatedAt = this.updatedAt - v;
	}
	jump(e, _ = !0) {
		this.updateAndNotify(e), this.prev = e, this.prevUpdatedAt = this.prevFrameValue = void 0, _ && this.stop(), this.stopPassiveEffect && this.stopPassiveEffect();
	}
	dirty() {
		this.events.change?.notify(this.current);
	}
	addDependent(e) {
		this.dependents ||= /* @__PURE__ */ new Set(), this.dependents.add(e);
	}
	removeDependent(e) {
		this.dependents && this.dependents.delete(e);
	}
	get() {
		return collectMotionValues.current && collectMotionValues.current.push(this), this.current;
	}
	getPrevious() {
		return this.prev;
	}
	getVelocity() {
		let e = time.now();
		if (!this.canTrackVelocity || this.prevFrameValue === void 0 || e - this.updatedAt > MAX_VELOCITY_DELTA) return 0;
		let _ = Math.min(this.updatedAt - this.prevUpdatedAt, MAX_VELOCITY_DELTA);
		return velocityPerSecond(parseFloat(this.current) - parseFloat(this.prevFrameValue), _);
	}
	start(e) {
		return this.stop(), new Promise((_) => {
			this.hasAnimated = !0, this.animation = e(_), this.events.animationStart && this.events.animationStart.notify();
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
function motionValue(e, _) {
	return new MotionValue(e, _);
}
var { schedule: microtask, cancel: cancelMicrotask } = /* @__PURE__ */ createRenderBatcher(queueMicrotask, !1), isDragging = {
	x: !1,
	y: !1
};
function isDragActive() {
	return isDragging.x || isDragging.y;
}
function setDragLock(e) {
	return e === "x" || e === "y" ? isDragging[e] ? null : (isDragging[e] = !0, () => {
		isDragging[e] = !1;
	}) : isDragging.x || isDragging.y ? null : (isDragging.x = isDragging.y = !0, () => {
		isDragging.x = isDragging.y = !1;
	});
}
function setupGesture(e, _) {
	let v = resolveElements(e), y = new AbortController();
	return [
		v,
		{
			passive: !0,
			..._,
			signal: y.signal
		},
		() => y.abort()
	];
}
function isValidHover(e) {
	return !(e.pointerType === "touch" || isDragActive());
}
function hover(e, _, v = {}) {
	let [y, b, x] = setupGesture(e, v), S = (e) => {
		if (!isValidHover(e)) return;
		let { target: v } = e, y = _(v, e);
		if (typeof y != "function" || !v) return;
		let x = (e) => {
			isValidHover(e) && (y(e), v.removeEventListener("pointerleave", x));
		};
		v.addEventListener("pointerleave", x, b);
	};
	return y.forEach((e) => {
		e.addEventListener("pointerenter", S, b);
	}), x;
}
var isNodeOrChild = (e, _) => _ ? e === _ ? !0 : isNodeOrChild(e, _.parentElement) : !1, isPrimaryPointer = (e) => e.pointerType === "mouse" ? typeof e.button != "number" || e.button <= 0 : e.isPrimary !== !1, focusableElements = new Set([
	"BUTTON",
	"INPUT",
	"SELECT",
	"TEXTAREA",
	"A"
]);
function isElementKeyboardAccessible(e) {
	return focusableElements.has(e.tagName) || e.tabIndex !== -1;
}
var isPressing = /* @__PURE__ */ new WeakSet();
function filterEvents(e) {
	return (_) => {
		_.key === "Enter" && e(_);
	};
}
function firePointerEvent(e, _) {
	e.dispatchEvent(new PointerEvent("pointer" + _, {
		isPrimary: !0,
		bubbles: !0
	}));
}
var enableKeyboardPress = (e, _) => {
	let v = e.currentTarget;
	if (!v) return;
	let y = filterEvents(() => {
		if (isPressing.has(v)) return;
		firePointerEvent(v, "down");
		let e = filterEvents(() => {
			firePointerEvent(v, "up");
		});
		v.addEventListener("keyup", e, _), v.addEventListener("blur", () => firePointerEvent(v, "cancel"), _);
	});
	v.addEventListener("keydown", y, _), v.addEventListener("blur", () => v.removeEventListener("keydown", y), _);
};
function isValidPressEvent(e) {
	return isPrimaryPointer(e) && !isDragActive();
}
function press(e, _, v = {}) {
	let [y, b, x] = setupGesture(e, v), S = (e) => {
		let y = e.currentTarget;
		if (!isValidPressEvent(e)) return;
		isPressing.add(y);
		let x = _(y, e), S = (e, _) => {
			window.removeEventListener("pointerup", C), window.removeEventListener("pointercancel", w), isPressing.has(y) && isPressing.delete(y), isValidPressEvent(e) && typeof x == "function" && x(e, { success: _ });
		}, C = (e) => {
			S(e, y === window || y === document || v.useGlobalTarget || isNodeOrChild(y, e.target));
		}, w = (e) => {
			S(e, !1);
		};
		window.addEventListener("pointerup", C, b), window.addEventListener("pointercancel", w, b);
	};
	return y.forEach((e) => {
		(v.useGlobalTarget ? window : e).addEventListener("pointerdown", S, b), isHTMLElement(e) && (e.addEventListener("focus", (e) => enableKeyboardPress(e, b)), !isElementKeyboardAccessible(e) && !e.hasAttribute("tabindex") && (e.tabIndex = 0));
	}), x;
}
function isSVGElement(e) {
	return isObject(e) && "ownerSVGElement" in e;
}
function isSVGSVGElement(e) {
	return isSVGElement(e) && e.tagName === "svg";
}
var isMotionValue = (e) => !!(e && e.getVelocity), valueTypes = [
	...dimensionValueTypes,
	color,
	complex
], findValueType = (e) => valueTypes.find(testValueType(e)), MotionConfigContext = createContext({
	transformPagePoint: (e) => e,
	isStatic: !1,
	reducedMotion: "never"
});
function setRef(e, _) {
	if (typeof e == "function") return e(_);
	e != null && (e.current = _);
}
function composeRefs(...e) {
	return (_) => {
		let v = !1, y = e.map((e) => {
			let y = setRef(e, _);
			return !v && typeof y == "function" && (v = !0), y;
		});
		if (v) return () => {
			for (let _ = 0; _ < y.length; _++) {
				let v = y[_];
				typeof v == "function" ? v() : setRef(e[_], null);
			}
		};
	};
}
function useComposedRefs(..._) {
	return React.useCallback(composeRefs(..._), _);
}
var import_jsx_runtime = require_jsx_runtime(), PopChildMeasure = class extends React.Component {
	getSnapshotBeforeUpdate(e) {
		let _ = this.props.childRef.current;
		if (_ && e.isPresent && !this.props.isPresent) {
			let e = _.offsetParent, v = isHTMLElement(e) && e.offsetWidth || 0, y = this.props.sizeRef.current;
			y.height = _.offsetHeight || 0, y.width = _.offsetWidth || 0, y.top = _.offsetTop, y.left = _.offsetLeft, y.right = v - y.width - y.left;
		}
		return null;
	}
	componentDidUpdate() {}
	render() {
		return this.props.children;
	}
};
function PopChild({ children: _, isPresent: v, anchorX: y, root: b }) {
	let x = useId(), S = useRef(null), C = useRef({
		width: 0,
		height: 0,
		top: 0,
		left: 0,
		right: 0
	}), { nonce: w } = useContext(MotionConfigContext), E = useComposedRefs(S, _?.ref);
	return useInsertionEffect(() => {
		let { width: e, height: _, top: T, left: E, right: D } = C.current;
		if (v || !S.current || !e || !_) return;
		let O = y === "left" ? `left: ${E}` : `right: ${D}`;
		S.current.dataset.motionPopId = x;
		let k = document.createElement("style");
		w && (k.nonce = w);
		let A = b ?? document.head;
		return A.appendChild(k), k.sheet && k.sheet.insertRule(`
          [data-motion-pop-id="${x}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${_}px !important;
            ${O}px !important;
            top: ${T}px !important;
          }
        `), () => {
			A.contains(k) && A.removeChild(k);
		};
	}, [v]), (0, import_jsx_runtime.jsx)(PopChildMeasure, {
		isPresent: v,
		childRef: S,
		sizeRef: C,
		children: React.cloneElement(_, { ref: E })
	});
}
var PresenceChild = ({ children: _, initial: v, isPresent: y, onExitComplete: b, custom: x, presenceAffectsLayout: S, mode: C, anchorX: w, root: T }) => {
	let E = useConstant(newChildrenMap), O = useId(), k = !0, j = useMemo(() => (k = !1, {
		id: O,
		initial: v,
		isPresent: y,
		custom: x,
		onExitComplete: (e) => {
			E.set(e, !0);
			for (let e of E.values()) if (!e) return;
			b && b();
		},
		register: (e) => (E.set(e, !1), () => E.delete(e))
	}), [
		y,
		E,
		b
	]);
	return S && k && (j = { ...j }), useMemo(() => {
		E.forEach((e, _) => E.set(_, !1));
	}, [y]), React.useEffect(() => {
		!y && !E.size && b && b();
	}, [y]), C === "popLayout" && (_ = (0, import_jsx_runtime.jsx)(PopChild, {
		isPresent: y,
		anchorX: w,
		root: T,
		children: _
	})), (0, import_jsx_runtime.jsx)(PresenceContext.Provider, {
		value: j,
		children: _
	});
};
function newChildrenMap() {
	return /* @__PURE__ */ new Map();
}
function usePresence(e = !0) {
	let _ = useContext(PresenceContext);
	if (_ === null) return [!0, null];
	let { isPresent: v, onExitComplete: y, register: b } = _, x = useId();
	useEffect(() => {
		if (e) return b(x);
	}, [e]);
	let S = useCallback(() => e && y && y(x), [
		x,
		y,
		e
	]);
	return !v && y ? [!1, S] : [!0];
}
var getChildKey = (e) => e.key || "";
function onlyElements(e) {
	let v = [];
	return Children.forEach(e, (e) => {
		isValidElement(e) && v.push(e);
	}), v;
}
var AnimatePresence = ({ children: e, custom: _, initial: v = !0, onExitComplete: y, presenceAffectsLayout: b = !0, mode: x = "sync", propagate: S = !1, anchorX: C = "left", root: w }) => {
	let [E, D] = usePresence(S), O = useMemo(() => onlyElements(e), [e]), k = S && !E ? [] : O.map(getChildKey), N = useRef(!0), P = useRef(O), F = useConstant(() => /* @__PURE__ */ new Map()), [I, L] = useState(O), [R, z] = useState(O);
	useIsomorphicLayoutEffect(() => {
		N.current = !1, P.current = O;
		for (let e = 0; e < R.length; e++) {
			let _ = getChildKey(R[e]);
			k.includes(_) ? F.delete(_) : F.get(_) !== !0 && F.set(_, !1);
		}
	}, [
		R,
		k.length,
		k.join("-")
	]);
	let B = [];
	if (O !== I) {
		let e = [...O];
		for (let _ = 0; _ < R.length; _++) {
			let v = R[_], y = getChildKey(v);
			k.includes(y) || (e.splice(_, 0, v), B.push(v));
		}
		return x === "wait" && B.length && (e = B), z(onlyElements(e)), L(O), null;
	}
	process.env.NODE_ENV !== "production" && x === "wait" && R.length > 1 && console.warn("You're attempting to animate multiple children within AnimatePresence, but its mode is set to \"wait\". This will lead to odd visual behaviour.");
	let { forceRender: V } = useContext(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: R.map((e) => {
		let T = getChildKey(e), A = S && !E ? !1 : O === R || k.includes(T);
		return (0, import_jsx_runtime.jsx)(PresenceChild, {
			isPresent: A,
			initial: !N.current || v ? void 0 : !1,
			custom: _,
			presenceAffectsLayout: b,
			mode: x,
			root: w,
			onExitComplete: A ? void 0 : () => {
				if (F.has(T)) F.set(T, !0);
				else return;
				let e = !0;
				F.forEach((_) => {
					_ || (e = !1);
				}), e && (V?.(), z(P.current), S && D?.(), y && y());
			},
			anchorX: C,
			children: e
		}, T);
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
for (let e in featureProps) featureDefinitions[e] = { isEnabled: (_) => featureProps[e].some((e) => !!_[e]) };
function loadFeatures(e) {
	for (let _ in e) featureDefinitions[_] = {
		...featureDefinitions[_],
		...e[_]
	};
}
var validMotionProps = new Set(/* @__PURE__ */ "animate.exit.variants.initial.style.values.variants.transition.transformTemplate.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.ignoreStrict.viewport".split("."));
function isValidMotionProp(e) {
	return e.startsWith("while") || e.startsWith("drag") && e !== "draggable" || e.startsWith("layout") || e.startsWith("onTap") || e.startsWith("onPan") || e.startsWith("onLayout") || validMotionProps.has(e);
}
var is_prop_valid_framer_motion_exports = /* @__PURE__ */ __export({ default: () => is_prop_valid_framer_motion_default }), is_prop_valid_framer_motion_default, init_is_prop_valid_framer_motion = __esmMin((() => {
	throw is_prop_valid_framer_motion_default = {}, Error("Could not resolve \"@emotion/is-prop-valid\" imported by \"framer-motion\". Is it installed?");
})), shouldForward = (e) => !isValidMotionProp(e);
function loadExternalIsValidProp(e) {
	typeof e == "function" && (shouldForward = (_) => _.startsWith("on") ? !isValidMotionProp(_) : e(_));
}
try {
	loadExternalIsValidProp((init_is_prop_valid_framer_motion(), __toCommonJS(is_prop_valid_framer_motion_exports)).default);
} catch {}
function filterProps(e, _, v) {
	let y = {};
	for (let b in e) b === "values" && typeof e.values == "object" || (shouldForward(b) || v === !0 && isValidMotionProp(b) || !_ && !isValidMotionProp(b) || e.draggable && b.startsWith("onDrag")) && (y[b] = e[b]);
	return y;
}
var MotionContext = /* @__PURE__ */ createContext({});
function isAnimationControls(e) {
	return typeof e == "object" && !!e && typeof e.start == "function";
}
function isVariantLabel(e) {
	return typeof e == "string" || Array.isArray(e);
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
function isControllingVariants(e) {
	return isAnimationControls(e.animate) || variantProps.some((_) => isVariantLabel(e[_]));
}
function isVariantNode(e) {
	return !!(isControllingVariants(e) || e.variants);
}
function getCurrentTreeVariants(e, _) {
	if (isControllingVariants(e)) {
		let { initial: _, animate: v } = e;
		return {
			initial: _ === !1 || isVariantLabel(_) ? _ : void 0,
			animate: isVariantLabel(v) ? v : void 0
		};
	}
	return e.inherit === !1 ? {} : _;
}
function useCreateMotionContext(e) {
	let { initial: _, animate: v } = getCurrentTreeVariants(e, useContext(MotionContext));
	return useMemo(() => ({
		initial: _,
		animate: v
	}), [variantLabelsAsDependency(_), variantLabelsAsDependency(v)]);
}
function variantLabelsAsDependency(e) {
	return Array.isArray(e) ? e.join(" ") : e;
}
function pixelsToPercent(e, _) {
	return _.max === _.min ? 0 : e / (_.max - _.min) * 100;
}
var correctBorderRadius = { correct: (e, _) => {
	if (!_.target) return e;
	if (typeof e == "string") if (px.test(e)) e = parseFloat(e);
	else return e;
	return `${pixelsToPercent(e, _.target.x)}% ${pixelsToPercent(e, _.target.y)}%`;
} }, correctBoxShadow = { correct: (e, { treeScale: _, projectionDelta: v }) => {
	let y = e, b = complex.parse(e);
	if (b.length > 5) return y;
	let x = complex.createTransformer(e), S = typeof b[0] == "number" ? 0 : 1, C = v.x.scale * _.x, w = v.y.scale * _.y;
	b[0 + S] /= C, b[1 + S] /= w;
	let T = mixNumber(C, w, .5);
	return typeof b[2 + S] == "number" && (b[2 + S] /= T), typeof b[3 + S] == "number" && (b[3 + S] /= T), x(b);
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
function isForcedMotionValue(e, { layout: _, layoutId: v }) {
	return transformProps.has(e) || e.startsWith("origin") || (_ || v !== void 0) && (!!scaleCorrectors[e] || e === "opacity");
}
var translateAlias = {
	x: "translateX",
	y: "translateY",
	z: "translateZ",
	transformPerspective: "perspective"
}, numTransforms = transformPropOrder.length;
function buildTransform(e, _, v) {
	let y = "", b = !0;
	for (let x = 0; x < numTransforms; x++) {
		let S = transformPropOrder[x], C = e[S];
		if (C === void 0) continue;
		let w = !0;
		if (w = typeof C == "number" ? C === (S.startsWith("scale") ? 1 : 0) : parseFloat(C) === 0, !w || v) {
			let e = getValueAsType(C, numberValueTypes[S]);
			if (!w) {
				b = !1;
				let _ = translateAlias[S] || S;
				y += `${_}(${e}) `;
			}
			v && (_[S] = e);
		}
	}
	return y = y.trim(), v ? y = v(_, b ? "" : y) : b && (y = "none"), y;
}
function buildHTMLStyles(e, _, v) {
	let { style: y, vars: b, transformOrigin: x } = e, S = !1, C = !1;
	for (let e in _) {
		let v = _[e];
		if (transformProps.has(e)) {
			S = !0;
			continue;
		} else if (isCSSVariableName(e)) {
			b[e] = v;
			continue;
		} else {
			let _ = getValueAsType(v, numberValueTypes[e]);
			e.startsWith("origin") ? (C = !0, x[e] = _) : y[e] = _;
		}
	}
	if (_.transform || (S || v ? y.transform = buildTransform(_, e.transform, v) : y.transform &&= "none"), C) {
		let { originX: e = "50%", originY: _ = "50%", originZ: v = 0 } = x;
		y.transformOrigin = `${e} ${_} ${v}`;
	}
}
var createHtmlRenderState = () => ({
	style: {},
	transform: {},
	transformOrigin: {},
	vars: {}
});
function copyRawValuesOnly(e, _, v) {
	for (let y in _) !isMotionValue(_[y]) && !isForcedMotionValue(y, v) && (e[y] = _[y]);
}
function useInitialMotionValues({ transformTemplate: e }, _) {
	return useMemo(() => {
		let v = createHtmlRenderState();
		return buildHTMLStyles(v, _, e), Object.assign({}, v.vars, v.style);
	}, [_]);
}
function useStyle(e, _) {
	let v = e.style || {}, y = {};
	return copyRawValuesOnly(y, v, e), Object.assign(y, useInitialMotionValues(e, _)), y;
}
function useHTMLProps(e, _) {
	let v = {}, y = useStyle(e, _);
	return e.drag && e.dragListener !== !1 && (v.draggable = !1, y.userSelect = y.WebkitUserSelect = y.WebkitTouchCallout = "none", y.touchAction = e.drag === !0 ? "none" : `pan-${e.drag === "x" ? "y" : "x"}`), e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (v.tabIndex = 0), v.style = y, v;
}
var dashKeys = {
	offset: "stroke-dashoffset",
	array: "stroke-dasharray"
}, camelKeys = {
	offset: "strokeDashoffset",
	array: "strokeDasharray"
};
function buildSVGPath(e, _, v = 1, y = 0, b = !0) {
	e.pathLength = 1;
	let x = b ? dashKeys : camelKeys;
	e[x.offset] = px.transform(-y);
	let S = px.transform(_), C = px.transform(v);
	e[x.array] = `${S} ${C}`;
}
function buildSVGAttrs(e, { attrX: _, attrY: v, attrScale: y, pathLength: b, pathSpacing: x = 1, pathOffset: S = 0, ...C }, w, T, E) {
	if (buildHTMLStyles(e, C, T), w) {
		e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
		return;
	}
	e.attrs = e.style, e.style = {};
	let { attrs: D, style: O } = e;
	D.transform && (O.transform = D.transform, delete D.transform), (O.transform || D.transformOrigin) && (O.transformOrigin = D.transformOrigin ?? "50% 50%", delete D.transformOrigin), O.transform && (O.transformBox = E?.transformBox ?? "fill-box", delete D.transformBox), _ !== void 0 && (D.x = _), v !== void 0 && (D.y = v), y !== void 0 && (D.scale = y), b !== void 0 && buildSVGPath(D, b, x, S, !1);
}
var createSvgRenderState = () => ({
	...createHtmlRenderState(),
	attrs: {}
}), isSVGTag = (e) => typeof e == "string" && e.toLowerCase() === "svg";
function useSVGProps(e, _, v, y) {
	let b = useMemo(() => {
		let v = createSvgRenderState();
		return buildSVGAttrs(v, _, isSVGTag(y), e.transformTemplate, e.style), {
			...v.attrs,
			style: { ...v.style }
		};
	}, [_]);
	if (e.style) {
		let _ = {};
		copyRawValuesOnly(_, e.style, e), b.style = {
			..._,
			...b.style
		};
	}
	return b;
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
function isSVGComponent(e) {
	return typeof e != "string" || e.includes("-") ? !1 : !!(lowercaseSVGElements.indexOf(e) > -1 || /[A-Z]/u.test(e));
}
function useRender(e, _, v, { latestValues: b }, S, C = !1) {
	let w = (isSVGComponent(e) ? useSVGProps : useHTMLProps)(_, b, S, e), T = filterProps(_, typeof e == "string", C), E = e === Fragment ? {} : {
		...T,
		...w,
		ref: v
	}, { children: D } = _, O = useMemo(() => isMotionValue(D) ? D.get() : D, [D]);
	return createElement(e, {
		...E,
		children: O
	});
}
function getValueState(e) {
	let _ = [{}, {}];
	return e?.values.forEach((e, v) => {
		_[0][v] = e.get(), _[1][v] = e.getVelocity();
	}), _;
}
function resolveVariantFromProps(e, _, v, y) {
	if (typeof _ == "function") {
		let [b, x] = getValueState(y);
		_ = _(v === void 0 ? e.custom : v, b, x);
	}
	if (typeof _ == "string" && (_ = e.variants && e.variants[_]), typeof _ == "function") {
		let [b, x] = getValueState(y);
		_ = _(v === void 0 ? e.custom : v, b, x);
	}
	return _;
}
function resolveMotionValue(e) {
	return isMotionValue(e) ? e.get() : e;
}
function makeState({ scrapeMotionValuesFromProps: e, createRenderState: _ }, v, y, b) {
	return {
		latestValues: makeLatestValues(v, y, b, e),
		renderState: _()
	};
}
function makeLatestValues(e, _, v, y) {
	let b = {}, x = y(e, {});
	for (let e in x) b[e] = resolveMotionValue(x[e]);
	let { initial: S, animate: C } = e, w = isControllingVariants(e), T = isVariantNode(e);
	_ && T && !w && e.inherit !== !1 && (S === void 0 && (S = _.initial), C === void 0 && (C = _.animate));
	let E = v ? v.initial === !1 : !1;
	E ||= S === !1;
	let D = E ? C : S;
	if (D && typeof D != "boolean" && !isAnimationControls(D)) {
		let _ = Array.isArray(D) ? D : [D];
		for (let v = 0; v < _.length; v++) {
			let y = resolveVariantFromProps(e, _[v]);
			if (y) {
				let { transitionEnd: e, transition: _, ...v } = y;
				for (let e in v) {
					let _ = v[e];
					if (Array.isArray(_)) {
						let e = E ? _.length - 1 : 0;
						_ = _[e];
					}
					_ !== null && (b[e] = _);
				}
				for (let _ in e) b[_] = e[_];
			}
		}
	}
	return b;
}
var makeUseVisualState = (e) => (_, v) => {
	let y = useContext(MotionContext), b = useContext(PresenceContext), x = () => makeState(e, _, y, b);
	return v ? x() : useConstant(x);
};
function scrapeMotionValuesFromProps$1(e, _, v) {
	let { style: y } = e, b = {};
	for (let x in y) (isMotionValue(y[x]) || _.style && isMotionValue(_.style[x]) || isForcedMotionValue(x, e) || v?.getValue(x)?.liveStyle !== void 0) && (b[x] = y[x]);
	return b;
}
var useHTMLVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps: scrapeMotionValuesFromProps$1,
	createRenderState: createHtmlRenderState
});
function scrapeMotionValuesFromProps(e, _, v) {
	let y = scrapeMotionValuesFromProps$1(e, _, v);
	for (let v in e) if (isMotionValue(e[v]) || isMotionValue(_[v])) {
		let _ = transformPropOrder.indexOf(v) === -1 ? v : "attr" + v.charAt(0).toUpperCase() + v.substring(1);
		y[_] = e[v];
	}
	return y;
}
var useSVGVisualState = /* @__PURE__ */ makeUseVisualState({
	scrapeMotionValuesFromProps,
	createRenderState: createSvgRenderState
}), motionComponentSymbol = Symbol.for("motionComponentSymbol");
function isRefObject(e) {
	return e && typeof e == "object" && Object.prototype.hasOwnProperty.call(e, "current");
}
function useMotionRef(e, _, v) {
	return useCallback((y) => {
		y && e.onMount && e.onMount(y), _ && (y ? _.mount(y) : _.unmount()), v && (typeof v == "function" ? v(y) : isRefObject(v) && (v.current = y));
	}, [_]);
}
var camelToDash = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase(), optimizedAppearDataAttribute = "data-" + camelToDash("framerAppearId"), SwitchLayoutGroupContext = createContext({});
function useVisualElement(e, _, v, y, b) {
	let { visualElement: x } = useContext(MotionContext), S = useContext(LazyContext), C = useContext(PresenceContext), w = useContext(MotionConfigContext).reducedMotion, D = useRef(null);
	y ||= S.renderer, !D.current && y && (D.current = y(e, {
		visualState: _,
		parent: x,
		props: v,
		presenceContext: C,
		blockInitialAnimation: C ? C.initial === !1 : !1,
		reducedMotionConfig: w
	}));
	let k = D.current, A = useContext(SwitchLayoutGroupContext);
	k && !k.projection && b && (k.type === "html" || k.type === "svg") && createProjectionNode$1(D.current, v, b, A);
	let M = useRef(!1);
	useInsertionEffect(() => {
		k && M.current && k.update(v, C);
	});
	let N = v[optimizedAppearDataAttribute], P = useRef(!!N && !window.MotionHandoffIsComplete?.(N) && window.MotionHasOptimisedAnimation?.(N));
	return useIsomorphicLayoutEffect(() => {
		k && (M.current = !0, window.MotionIsMounted = !0, k.updateFeatures(), k.scheduleRenderMicrotask(), P.current && k.animationState && k.animationState.animateChanges());
	}), useEffect(() => {
		k && (!P.current && k.animationState && k.animationState.animateChanges(), P.current &&= (queueMicrotask(() => {
			window.MotionHandoffMarkAsComplete?.(N);
		}), !1), k.enteringChildren = void 0);
	}), k;
}
function createProjectionNode$1(e, _, v, y) {
	let { layoutId: b, layout: x, drag: S, dragConstraints: C, layoutScroll: w, layoutRoot: T, layoutCrossfade: E } = _;
	e.projection = new v(e.latestValues, _["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(e.parent)), e.projection.setOptions({
		layoutId: b,
		layout: x,
		alwaysMeasureLayout: !!S || C && isRefObject(C),
		visualElement: e,
		animationType: typeof x == "string" ? x : "both",
		initialPromotionConfig: y,
		crossfade: E,
		layoutScroll: w,
		layoutRoot: T
	});
}
function getClosestProjectingNode(e) {
	if (e) return e.options.allowProjection === !1 ? getClosestProjectingNode(e.parent) : e.projection;
}
function createMotionComponent(e, { forwardMotionProps: _ = !1 } = {}, v, y) {
	v && loadFeatures(v);
	let b = isSVGComponent(e) ? useSVGVisualState : useHTMLVisualState;
	function x(x, S) {
		let C, w = {
			...useContext(MotionConfigContext),
			...x,
			layoutId: useLayoutId(x)
		}, { isStatic: E } = w, D = useCreateMotionContext(x), O = b(x, E);
		if (!E && isBrowser) {
			useStrictMode(w, v);
			let _ = getProjectionFunctionality(w);
			C = _.MeasureLayout, D.visualElement = useVisualElement(e, O, w, y, _.ProjectionNode);
		}
		return (0, import_jsx_runtime.jsxs)(MotionContext.Provider, {
			value: D,
			children: [C && D.visualElement ? (0, import_jsx_runtime.jsx)(C, {
				visualElement: D.visualElement,
				...w
			}) : null, useRender(e, x, useMotionRef(O, D.visualElement, S), O, E, _)]
		});
	}
	x.displayName = `motion.${typeof e == "string" ? e : `create(${e.displayName ?? e.name ?? ""})`}`;
	let C = forwardRef(x);
	return C[motionComponentSymbol] = e, C;
}
function useLayoutId({ layoutId: e }) {
	let _ = useContext(LayoutGroupContext).id;
	return _ && e !== void 0 ? _ + "-" + e : e;
}
function useStrictMode(e, _) {
	let v = useContext(LazyContext).strict;
	if (process.env.NODE_ENV !== "production" && _ && v) {
		let _ = "You have rendered a `motion` component within a `LazyMotion` component. This will break tree shaking. Import and render a `m` component instead.";
		e.ignoreStrict ? warning(!1, _, "lazy-strict-mode") : invariant(!1, _, "lazy-strict-mode");
	}
}
function getProjectionFunctionality(e) {
	let { drag: _, layout: v } = featureDefinitions;
	if (!_ && !v) return {};
	let y = {
		..._,
		...v
	};
	return {
		MeasureLayout: _?.isEnabled(e) || v?.isEnabled(e) ? y.MeasureLayout : void 0,
		ProjectionNode: y.ProjectionNode
	};
}
function createMotionProxy(e, _) {
	if (typeof Proxy > "u") return createMotionComponent;
	let v = /* @__PURE__ */ new Map(), y = (v, y) => createMotionComponent(v, y, e, _);
	return new Proxy((e, _) => (process.env.NODE_ENV !== "production" && warnOnce(!1, "motion() is deprecated. Use motion.create() instead."), y(e, _)), { get: (b, x) => x === "create" ? y : (v.has(x) || v.set(x, createMotionComponent(x, void 0, e, _)), v.get(x)) });
}
function convertBoundingBoxToBox({ top: e, left: _, right: v, bottom: y }) {
	return {
		x: {
			min: _,
			max: v
		},
		y: {
			min: e,
			max: y
		}
	};
}
function convertBoxToBoundingBox({ x: e, y: _ }) {
	return {
		top: _.min,
		right: e.max,
		bottom: _.max,
		left: e.min
	};
}
function transformBoxPoints(e, _) {
	if (!_) return e;
	let v = _({
		x: e.left,
		y: e.top
	}), y = _({
		x: e.right,
		y: e.bottom
	});
	return {
		top: v.y,
		left: v.x,
		bottom: y.y,
		right: y.x
	};
}
function isIdentityScale(e) {
	return e === void 0 || e === 1;
}
function hasScale({ scale: e, scaleX: _, scaleY: v }) {
	return !isIdentityScale(e) || !isIdentityScale(_) || !isIdentityScale(v);
}
function hasTransform(e) {
	return hasScale(e) || has2DTranslate(e) || e.z || e.rotate || e.rotateX || e.rotateY || e.skewX || e.skewY;
}
function has2DTranslate(e) {
	return is2DTranslate(e.x) || is2DTranslate(e.y);
}
function is2DTranslate(e) {
	return e && e !== "0%";
}
function scalePoint(e, _, v) {
	return v + _ * (e - v);
}
function applyPointDelta(e, _, v, y, b) {
	return b !== void 0 && (e = scalePoint(e, b, y)), scalePoint(e, v, y) + _;
}
function applyAxisDelta(e, _ = 0, v = 1, y, b) {
	e.min = applyPointDelta(e.min, _, v, y, b), e.max = applyPointDelta(e.max, _, v, y, b);
}
function applyBoxDelta(e, { x: _, y: v }) {
	applyAxisDelta(e.x, _.translate, _.scale, _.originPoint), applyAxisDelta(e.y, v.translate, v.scale, v.originPoint);
}
var TREE_SCALE_SNAP_MIN = .999999999999, TREE_SCALE_SNAP_MAX = 1.0000000000001;
function applyTreeDeltas(e, _, v, y = !1) {
	let b = v.length;
	if (!b) return;
	_.x = _.y = 1;
	let x, S;
	for (let C = 0; C < b; C++) {
		x = v[C], S = x.projectionDelta;
		let { visualElement: b } = x.options;
		b && b.props.style && b.props.style.display === "contents" || (y && x.options.layoutScroll && x.scroll && x !== x.root && transformBox(e, {
			x: -x.scroll.offset.x,
			y: -x.scroll.offset.y
		}), S && (_.x *= S.x.scale, _.y *= S.y.scale, applyBoxDelta(e, S)), y && hasTransform(x.latestValues) && transformBox(e, x.latestValues));
	}
	_.x < TREE_SCALE_SNAP_MAX && _.x > TREE_SCALE_SNAP_MIN && (_.x = 1), _.y < TREE_SCALE_SNAP_MAX && _.y > TREE_SCALE_SNAP_MIN && (_.y = 1);
}
function translateAxis(e, _) {
	e.min += _, e.max += _;
}
function transformAxis(e, _, v, y, b = .5) {
	applyAxisDelta(e, _, v, mixNumber(e.min, e.max, b), y);
}
function transformBox(e, _) {
	transformAxis(e.x, _.x, _.scaleX, _.scale, _.originX), transformAxis(e.y, _.y, _.scaleY, _.scale, _.originY);
}
function measureViewportBox(e, _) {
	return convertBoundingBoxToBox(transformBoxPoints(e.getBoundingClientRect(), _));
}
function measurePageBox(e, _, v) {
	let y = measureViewportBox(e, v), { scroll: b } = _;
	return b && (translateAxis(y.x, b.offset.x), translateAxis(y.y, b.offset.y)), y;
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
		let e = window.matchMedia("(prefers-reduced-motion)"), _ = () => prefersReducedMotion.current = e.matches;
		e.addEventListener("change", _), _();
	} else prefersReducedMotion.current = !1;
}
var visualElementStore = /* @__PURE__ */ new WeakMap();
function updateMotionValuesFromProps(e, _, v) {
	for (let y in _) {
		let b = _[y], x = v[y];
		if (isMotionValue(b)) e.addValue(y, b);
		else if (isMotionValue(x)) e.addValue(y, motionValue(b, { owner: e }));
		else if (x !== b) if (e.hasValue(y)) {
			let _ = e.getValue(y);
			_.liveStyle === !0 ? _.jump(b) : _.hasAnimated || _.set(b);
		} else {
			let _ = e.getStaticValue(y);
			e.addValue(y, motionValue(_ === void 0 ? b : _, { owner: e }));
		}
	}
	for (let y in v) _[y] === void 0 && e.removeValue(y);
	return _;
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
	scrapeMotionValuesFromProps(e, _, v) {
		return {};
	}
	constructor({ parent: e, props: _, presenceContext: v, reducedMotionConfig: y, blockInitialAnimation: b, visualState: x }, S = {}) {
		this.current = null, this.children = /* @__PURE__ */ new Set(), this.isVariantNode = !1, this.isControllingVariants = !1, this.shouldReduceMotion = null, this.values = /* @__PURE__ */ new Map(), this.KeyframeResolver = KeyframeResolver, this.features = {}, this.valueSubscriptions = /* @__PURE__ */ new Map(), this.prevMotionValues = {}, this.events = {}, this.propEventSubscriptions = {}, this.notifyUpdate = () => this.notify("Update", this.latestValues), this.render = () => {
			this.current && (this.triggerBuild(), this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
		}, this.renderScheduledAt = 0, this.scheduleRender = () => {
			let e = time.now();
			this.renderScheduledAt < e && (this.renderScheduledAt = e, frame.render(this.render, !1, !0));
		};
		let { latestValues: C, renderState: w } = x;
		this.latestValues = C, this.baseTarget = { ...C }, this.initialValues = _.initial ? { ...C } : {}, this.renderState = w, this.parent = e, this.props = _, this.presenceContext = v, this.depth = e ? e.depth + 1 : 0, this.reducedMotionConfig = y, this.options = S, this.blockInitialAnimation = !!b, this.isControllingVariants = isControllingVariants(_), this.isVariantNode = isVariantNode(_), this.isVariantNode && (this.variantChildren = /* @__PURE__ */ new Set()), this.manuallyAnimateOnMount = !!(e && e.current);
		let { willChange: T, ...E } = this.scrapeMotionValuesFromProps(_, {}, this);
		for (let e in E) {
			let _ = E[e];
			C[e] !== void 0 && isMotionValue(_) && _.set(C[e]);
		}
	}
	mount(e) {
		this.current = e, visualElementStore.set(e, this), this.projection && !this.projection.instance && this.projection.mount(e), this.parent && this.isVariantNode && !this.isControllingVariants && (this.removeFromVariantTree = this.parent.addVariantChild(this)), this.values.forEach((e, _) => this.bindToMotionValue(_, e)), hasReducedMotionListener.current || initPrefersReducedMotion(), this.shouldReduceMotion = this.reducedMotionConfig === "never" ? !1 : this.reducedMotionConfig === "always" ? !0 : prefersReducedMotion.current, process.env.NODE_ENV !== "production" && warnOnce(this.shouldReduceMotion !== !0, "You have Reduced Motion enabled on your device. Animations may not appear as expected.", "reduced-motion-disabled"), this.parent?.addChild(this), this.update(this.props, this.presenceContext);
	}
	unmount() {
		for (let e in this.projection && this.projection.unmount(), cancelFrame(this.notifyUpdate), cancelFrame(this.render), this.valueSubscriptions.forEach((e) => e()), this.valueSubscriptions.clear(), this.removeFromVariantTree && this.removeFromVariantTree(), this.parent?.removeChild(this), this.events) this.events[e].clear();
		for (let e in this.features) {
			let _ = this.features[e];
			_ && (_.unmount(), _.isMounted = !1);
		}
		this.current = null;
	}
	addChild(e) {
		this.children.add(e), this.enteringChildren ??= /* @__PURE__ */ new Set(), this.enteringChildren.add(e);
	}
	removeChild(e) {
		this.children.delete(e), this.enteringChildren && this.enteringChildren.delete(e);
	}
	bindToMotionValue(e, _) {
		this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
		let v = transformProps.has(e);
		v && this.onBindTransform && this.onBindTransform();
		let y = _.on("change", (_) => {
			this.latestValues[e] = _, this.props.onUpdate && frame.preRender(this.notifyUpdate), v && this.projection && (this.projection.isTransformDirty = !0), this.scheduleRender();
		}), b;
		window.MotionCheckAppearSync && (b = window.MotionCheckAppearSync(this, e, _)), this.valueSubscriptions.set(e, () => {
			y(), b && b(), _.owner && _.stop();
		});
	}
	sortNodePosition(e) {
		return !this.current || !this.sortInstanceNodePosition || this.type !== e.type ? 0 : this.sortInstanceNodePosition(this.current, e.current);
	}
	updateFeatures() {
		let e = "animation";
		for (e in featureDefinitions) {
			let _ = featureDefinitions[e];
			if (!_) continue;
			let { isEnabled: v, Feature: y } = _;
			if (!this.features[e] && y && v(this.props) && (this.features[e] = new y(this)), this.features[e]) {
				let _ = this.features[e];
				_.isMounted ? _.update() : (_.mount(), _.isMounted = !0);
			}
		}
	}
	triggerBuild() {
		this.build(this.renderState, this.latestValues, this.props);
	}
	measureViewportBox() {
		return this.current ? this.measureInstanceViewportBox(this.current, this.props) : createBox();
	}
	getStaticValue(e) {
		return this.latestValues[e];
	}
	setStaticValue(e, _) {
		this.latestValues[e] = _;
	}
	update(e, _) {
		(e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(), this.prevProps = this.props, this.props = e, this.prevPresenceContext = this.presenceContext, this.presenceContext = _;
		for (let _ = 0; _ < propEventHandlers.length; _++) {
			let v = propEventHandlers[_];
			this.propEventSubscriptions[v] && (this.propEventSubscriptions[v](), delete this.propEventSubscriptions[v]);
			let y = e["on" + v];
			y && (this.propEventSubscriptions[v] = this.on(v, y));
		}
		this.prevMotionValues = updateMotionValuesFromProps(this, this.scrapeMotionValuesFromProps(e, this.prevProps, this), this.prevMotionValues), this.handleChildMotionValue && this.handleChildMotionValue();
	}
	getProps() {
		return this.props;
	}
	getVariant(e) {
		return this.props.variants ? this.props.variants[e] : void 0;
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
	addVariantChild(e) {
		let _ = this.getClosestVariantNode();
		if (_) return _.variantChildren && _.variantChildren.add(e), () => _.variantChildren.delete(e);
	}
	addValue(e, _) {
		let v = this.values.get(e);
		_ !== v && (v && this.removeValue(e), this.bindToMotionValue(e, _), this.values.set(e, _), this.latestValues[e] = _.get());
	}
	removeValue(e) {
		this.values.delete(e);
		let _ = this.valueSubscriptions.get(e);
		_ && (_(), this.valueSubscriptions.delete(e)), delete this.latestValues[e], this.removeValueFromRenderState(e, this.renderState);
	}
	hasValue(e) {
		return this.values.has(e);
	}
	getValue(e, _) {
		if (this.props.values && this.props.values[e]) return this.props.values[e];
		let v = this.values.get(e);
		return v === void 0 && _ !== void 0 && (v = motionValue(_ === null ? void 0 : _, { owner: this }), this.addValue(e, v)), v;
	}
	readValue(e, _) {
		let v = this.latestValues[e] !== void 0 || !this.current ? this.latestValues[e] : this.getBaseTargetFromProps(this.props, e) ?? this.readValueFromInstance(this.current, e, this.options);
		return v != null && (typeof v == "string" && (isNumericalString(v) || isZeroValueString(v)) ? v = parseFloat(v) : !findValueType(v) && complex.test(_) && (v = getAnimatableNone(e, _)), this.setBaseTarget(e, isMotionValue(v) ? v.get() : v)), isMotionValue(v) ? v.get() : v;
	}
	setBaseTarget(e, _) {
		this.baseTarget[e] = _;
	}
	getBaseTarget(e) {
		let { initial: _ } = this.props, v;
		if (typeof _ == "string" || typeof _ == "object") {
			let y = resolveVariantFromProps(this.props, _, this.presenceContext?.custom);
			y && (v = y[e]);
		}
		if (_ && v !== void 0) return v;
		let y = this.getBaseTargetFromProps(this.props, e);
		return y !== void 0 && !isMotionValue(y) ? y : this.initialValues[e] !== void 0 && v === void 0 ? void 0 : this.baseTarget[e];
	}
	on(e, _) {
		return this.events[e] || (this.events[e] = new SubscriptionManager()), this.events[e].add(_);
	}
	notify(e, ..._) {
		this.events[e] && this.events[e].notify(..._);
	}
	scheduleRenderMicrotask() {
		microtask.render(this.render);
	}
}, DOMVisualElement = class extends VisualElement {
	constructor() {
		super(...arguments), this.KeyframeResolver = DOMKeyframesResolver;
	}
	sortInstanceNodePosition(e, _) {
		return e.compareDocumentPosition(_) & 2 ? 1 : -1;
	}
	getBaseTargetFromProps(e, _) {
		return e.style ? e.style[_] : void 0;
	}
	removeValueFromRenderState(e, { vars: _, style: v }) {
		delete _[e], delete v[e];
	}
	handleChildMotionValue() {
		this.childSubscription && (this.childSubscription(), delete this.childSubscription);
		let { children: e } = this.props;
		isMotionValue(e) && (this.childSubscription = e.on("change", (e) => {
			this.current && (this.current.textContent = `${e}`);
		}));
	}
};
function renderHTML(e, { style: _, vars: v }, y, b) {
	let x = e.style, S;
	for (S in _) x[S] = _[S];
	for (S in b?.applyProjectionStyles(x, y), v) x.setProperty(S, v[S]);
}
function getComputedStyle$1(e) {
	return window.getComputedStyle(e);
}
var HTMLVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments), this.type = "html", this.renderInstance = renderHTML;
	}
	readValueFromInstance(e, _) {
		if (transformProps.has(_)) return this.projection?.isProjecting ? defaultTransformValue(_) : readTransformValue(e, _);
		{
			let v = getComputedStyle$1(e), y = (isCSSVariableName(_) ? v.getPropertyValue(_) : v[_]) || 0;
			return typeof y == "string" ? y.trim() : y;
		}
	}
	measureInstanceViewportBox(e, { transformPagePoint: _ }) {
		return measureViewportBox(e, _);
	}
	build(e, _, v) {
		buildHTMLStyles(e, _, v.transformTemplate);
	}
	scrapeMotionValuesFromProps(e, _, v) {
		return scrapeMotionValuesFromProps$1(e, _, v);
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
function renderSVG(e, _, v, y) {
	for (let v in renderHTML(e, _, void 0, y), _.attrs) e.setAttribute(camelCaseAttributes.has(v) ? v : camelToDash(v), _.attrs[v]);
}
var SVGVisualElement = class extends DOMVisualElement {
	constructor() {
		super(...arguments), this.type = "svg", this.isSVGTag = !1, this.measureInstanceViewportBox = createBox;
	}
	getBaseTargetFromProps(e, _) {
		return e[_];
	}
	readValueFromInstance(e, _) {
		if (transformProps.has(_)) {
			let e = getDefaultValueType(_);
			return e && e.default || 0;
		}
		return _ = camelCaseAttributes.has(_) ? _ : camelToDash(_), e.getAttribute(_);
	}
	scrapeMotionValuesFromProps(e, _, v) {
		return scrapeMotionValuesFromProps(e, _, v);
	}
	build(e, _, v) {
		buildSVGAttrs(e, _, this.isSVGTag, v.transformTemplate, v.style);
	}
	renderInstance(e, _, v, y) {
		renderSVG(e, _, v, y);
	}
	mount(e) {
		this.isSVGTag = isSVGTag(e.tagName), super.mount(e);
	}
}, createDomVisualElement = (e, _) => isSVGComponent(e) ? new SVGVisualElement(_) : new HTMLVisualElement(_, { allowProjection: e !== Fragment });
function resolveVariant(e, _, v) {
	let y = e.getProps();
	return resolveVariantFromProps(y, _, v === void 0 ? y.custom : v, e);
}
var isKeyframesTarget = (e) => Array.isArray(e);
function setMotionValue(e, _, v) {
	e.hasValue(_) ? e.getValue(_).set(v) : e.addValue(_, motionValue(v));
}
function resolveFinalValueInKeyframes(e) {
	return isKeyframesTarget(e) ? e[e.length - 1] || 0 : e;
}
function setTarget(e, _) {
	let { transitionEnd: v = {}, transition: y = {}, ...b } = resolveVariant(e, _) || {};
	for (let _ in b = {
		...b,
		...v
	}, b) setMotionValue(e, _, resolveFinalValueInKeyframes(b[_]));
}
function isWillChangeMotionValue(e) {
	return !!(isMotionValue(e) && e.add);
}
function addValueToWillChange(e, _) {
	let v = e.getValue("willChange");
	if (isWillChangeMotionValue(v)) return v.add(_);
	if (!v && MotionGlobalConfig.WillChange) {
		let v = new MotionGlobalConfig.WillChange("auto");
		e.addValue("willChange", v), v.add(_);
	}
}
function getOptimisedAppearId(e) {
	return e.props[optimizedAppearDataAttribute];
}
var isNotNull = (e) => e !== null;
function getFinalKeyframe(e, { repeat: _, repeatType: v = "loop" }, y) {
	let b = e.filter(isNotNull), x = _ && v !== "loop" && _ % 2 == 1 ? 0 : b.length - 1;
	return !x || y === void 0 ? b[x] : y;
}
var underDampedSpring = {
	type: "spring",
	stiffness: 500,
	damping: 25,
	restSpeed: 10
}, criticallyDampedSpring = (e) => ({
	type: "spring",
	stiffness: 550,
	damping: e === 0 ? 2 * Math.sqrt(550) : 30,
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
}, getDefaultTransition = (e, { keyframes: _ }) => _.length > 2 ? keyframesTransition : transformProps.has(e) ? e.startsWith("scale") ? criticallyDampedSpring(_[1]) : underDampedSpring : ease;
function isTransitionDefined({ when: e, delay: _, delayChildren: v, staggerChildren: y, staggerDirection: b, repeat: x, repeatType: S, repeatDelay: C, from: w, elapsed: T, ...E }) {
	return !!Object.keys(E).length;
}
var animateMotionValue = (e, _, v, y = {}, b, x) => (S) => {
	let C = getValueTransition(y, e) || {}, w = C.delay || y.delay || 0, { elapsed: T = 0 } = y;
	T -= /* @__PURE__ */ secondsToMilliseconds(w);
	let E = {
		keyframes: Array.isArray(v) ? v : [null, v],
		ease: "easeOut",
		velocity: _.getVelocity(),
		...C,
		delay: -T,
		onUpdate: (e) => {
			_.set(e), C.onUpdate && C.onUpdate(e);
		},
		onComplete: () => {
			S(), C.onComplete && C.onComplete();
		},
		name: e,
		motionValue: _,
		element: x ? void 0 : b
	};
	isTransitionDefined(C) || Object.assign(E, getDefaultTransition(e, E)), E.duration &&= /* @__PURE__ */ secondsToMilliseconds(E.duration), E.repeatDelay &&= /* @__PURE__ */ secondsToMilliseconds(E.repeatDelay), E.from !== void 0 && (E.keyframes[0] = E.from);
	let D = !1;
	if ((E.type === !1 || E.duration === 0 && !E.repeatDelay) && (makeAnimationInstant(E), E.delay === 0 && (D = !0)), (MotionGlobalConfig.instantAnimations || MotionGlobalConfig.skipAnimations) && (D = !0, makeAnimationInstant(E), E.delay = 0), E.allowFlatten = !C.type && !C.ease, D && !x && _.get() !== void 0) {
		let e = getFinalKeyframe(E.keyframes, C);
		if (e !== void 0) {
			frame.update(() => {
				E.onUpdate(e), E.onComplete();
			});
			return;
		}
	}
	return C.isSync ? new JSAnimation(E) : new AsyncMotionValueAnimation(E);
};
function shouldBlockAnimation({ protectedKeys: e, needsAnimating: _ }, v) {
	let y = e.hasOwnProperty(v) && _[v] !== !0;
	return _[v] = !1, y;
}
function animateTarget(e, _, { delay: v = 0, transitionOverride: y, type: b } = {}) {
	let { transition: x = e.getDefaultTransition(), transitionEnd: S, ...C } = _;
	y && (x = y);
	let w = [], T = b && e.animationState && e.animationState.getState()[b];
	for (let _ in C) {
		let y = e.getValue(_, e.latestValues[_] ?? null), b = C[_];
		if (b === void 0 || T && shouldBlockAnimation(T, _)) continue;
		let S = {
			delay: v,
			...getValueTransition(x || {}, _)
		}, E = y.get();
		if (E !== void 0 && !y.isAnimating && !Array.isArray(b) && b === E && !S.velocity) continue;
		let D = !1;
		if (window.MotionHandoffAnimation) {
			let v = getOptimisedAppearId(e);
			if (v) {
				let e = window.MotionHandoffAnimation(v, _, frame);
				e !== null && (S.startTime = e, D = !0);
			}
		}
		addValueToWillChange(e, _), y.start(animateMotionValue(_, y, b, e.shouldReduceMotion && positionalKeys.has(_) ? { type: !1 } : S, e, D));
		let O = y.animation;
		O && w.push(O);
	}
	return S && Promise.all(w).then(() => {
		frame.update(() => {
			S && setTarget(e, S);
		});
	}), w;
}
function calcChildStagger(e, _, v, y = 0, b = 1) {
	let x = Array.from(e).sort((e, _) => e.sortNodePosition(_)).indexOf(_), S = e.size, C = (S - 1) * y;
	return typeof v == "function" ? v(x, S) : b === 1 ? x * y : C - x * y;
}
function animateVariant(e, _, v = {}) {
	let y = resolveVariant(e, _, v.type === "exit" ? e.presenceContext?.custom : void 0), { transition: b = e.getDefaultTransition() || {} } = y || {};
	v.transitionOverride && (b = v.transitionOverride);
	let x = y ? () => Promise.all(animateTarget(e, y, v)) : () => Promise.resolve(), S = e.variantChildren && e.variantChildren.size ? (y = 0) => {
		let { delayChildren: x = 0, staggerChildren: S, staggerDirection: C } = b;
		return animateChildren(e, _, y, x, S, C, v);
	} : () => Promise.resolve(), { when: C } = b;
	if (C) {
		let [e, _] = C === "beforeChildren" ? [x, S] : [S, x];
		return e().then(() => _());
	} else return Promise.all([x(), S(v.delay)]);
}
function animateChildren(e, _, v = 0, y = 0, b = 0, x = 1, S) {
	let C = [];
	for (let w of e.variantChildren) w.notify("AnimationStart", _), C.push(animateVariant(w, _, {
		...S,
		delay: v + (typeof y == "function" ? 0 : y) + calcChildStagger(e.variantChildren, w, y, b, x)
	}).then(() => w.notify("AnimationComplete", _)));
	return Promise.all(C);
}
function animateVisualElement(e, _, v = {}) {
	e.notify("AnimationStart", _);
	let y;
	if (Array.isArray(_)) {
		let b = _.map((_) => animateVariant(e, _, v));
		y = Promise.all(b);
	} else if (typeof _ == "string") y = animateVariant(e, _, v);
	else {
		let b = typeof _ == "function" ? resolveVariant(e, _, v.custom) : _;
		y = Promise.all(animateTarget(e, b, v));
	}
	return y.then(() => {
		e.notify("AnimationComplete", _);
	});
}
function shallowCompare(e, _) {
	if (!Array.isArray(_)) return !1;
	let v = _.length;
	if (v !== e.length) return !1;
	for (let y = 0; y < v; y++) if (_[y] !== e[y]) return !1;
	return !0;
}
var numVariantProps = variantProps.length;
function getVariantContext(e) {
	if (!e) return;
	if (!e.isControllingVariants) {
		let _ = e.parent && getVariantContext(e.parent) || {};
		return e.props.initial !== void 0 && (_.initial = e.props.initial), _;
	}
	let _ = {};
	for (let v = 0; v < numVariantProps; v++) {
		let y = variantProps[v], b = e.props[y];
		(isVariantLabel(b) || b === !1) && (_[y] = b);
	}
	return _;
}
var reversePriorityOrder = [...variantPriorityOrder].reverse(), numAnimationTypes = variantPriorityOrder.length;
function animateList(e) {
	return (_) => Promise.all(_.map(({ animation: _, options: v }) => animateVisualElement(e, _, v)));
}
function createAnimationState(e) {
	let _ = animateList(e), v = createState(), y = !0, b = (_) => (v, y) => {
		let b = resolveVariant(e, y, _ === "exit" ? e.presenceContext?.custom : void 0);
		if (b) {
			let { transition: e, transitionEnd: _, ...y } = b;
			v = {
				...v,
				...y,
				..._
			};
		}
		return v;
	};
	function x(v) {
		_ = v(e);
	}
	function S(x) {
		let { props: S } = e, C = getVariantContext(e.parent) || {}, w = [], T = /* @__PURE__ */ new Set(), E = {}, D = Infinity;
		for (let _ = 0; _ < numAnimationTypes; _++) {
			let O = reversePriorityOrder[_], k = v[O], A = S[O] === void 0 ? C[O] : S[O], j = isVariantLabel(A), M = O === x ? k.isActive : null;
			M === !1 && (D = _);
			let N = A === C[O] && A !== S[O] && j;
			if (N && y && e.manuallyAnimateOnMount && (N = !1), k.protectedKeys = { ...E }, !k.isActive && M === null || !A && !k.prevProp || isAnimationControls(A) || typeof A == "boolean") continue;
			let P = checkVariantsDidChange(k.prevProp, A), F = P || O === x && k.isActive && !N && j || _ > D && j, I = !1, L = Array.isArray(A) ? A : [A], R = L.reduce(b(O), {});
			M === !1 && (R = {});
			let { prevResolvedValues: z = {} } = k, B = {
				...z,
				...R
			}, V = (_) => {
				F = !0, T.has(_) && (I = !0, T.delete(_)), k.needsAnimating[_] = !0;
				let v = e.getValue(_);
				v && (v.liveStyle = !1);
			};
			for (let e in B) {
				let _ = R[e], v = z[e];
				if (E.hasOwnProperty(e)) continue;
				let y = !1;
				y = isKeyframesTarget(_) && isKeyframesTarget(v) ? !shallowCompare(_, v) : _ !== v, y ? _ == null ? T.add(e) : V(e) : _ !== void 0 && T.has(e) ? V(e) : k.protectedKeys[e] = !0;
			}
			k.prevProp = A, k.prevResolvedValues = R, k.isActive && (E = {
				...E,
				...R
			}), y && e.blockInitialAnimation && (F = !1);
			let H = N && P;
			F && (!H || I) && w.push(...L.map((_) => {
				let v = { type: O };
				if (typeof _ == "string" && y && !H && e.manuallyAnimateOnMount && e.parent) {
					let { parent: y } = e, b = resolveVariant(y, _);
					if (y.enteringChildren && b) {
						let { delayChildren: _ } = b.transition || {};
						v.delay = calcChildStagger(y.enteringChildren, e, _);
					}
				}
				return {
					animation: _,
					options: v
				};
			}));
		}
		if (T.size) {
			let _ = {};
			if (typeof S.initial != "boolean") {
				let v = resolveVariant(e, Array.isArray(S.initial) ? S.initial[0] : S.initial);
				v && v.transition && (_.transition = v.transition);
			}
			T.forEach((v) => {
				let y = e.getBaseTarget(v), b = e.getValue(v);
				b && (b.liveStyle = !0), _[v] = y ?? null;
			}), w.push({ animation: _ });
		}
		let O = !!w.length;
		return y && (S.initial === !1 || S.initial === S.animate) && !e.manuallyAnimateOnMount && (O = !1), y = !1, O ? _(w) : Promise.resolve();
	}
	function C(_, y) {
		if (v[_].isActive === y) return Promise.resolve();
		e.variantChildren?.forEach((e) => e.animationState?.setActive(_, y)), v[_].isActive = y;
		let b = S(_);
		for (let e in v) v[e].protectedKeys = {};
		return b;
	}
	return {
		animateChanges: S,
		setActive: C,
		setAnimateFunction: x,
		getState: () => v,
		reset: () => {
			v = createState();
		}
	};
}
function checkVariantsDidChange(e, _) {
	return typeof _ == "string" ? _ !== e : Array.isArray(_) ? !shallowCompare(_, e) : !1;
}
function createTypeState(e = !1) {
	return {
		isActive: e,
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
	constructor(e) {
		this.isMounted = !1, this.node = e;
	}
	update() {}
}, AnimationFeature = class extends Feature {
	constructor(e) {
		super(e), e.animationState ||= createAnimationState(e);
	}
	updateAnimationControlsSubscription() {
		let { animate: e } = this.node.getProps();
		isAnimationControls(e) && (this.unmountControls = e.subscribe(this.node));
	}
	mount() {
		this.updateAnimationControlsSubscription();
	}
	update() {
		let { animate: e } = this.node.getProps(), { animate: _ } = this.node.prevProps || {};
		e !== _ && this.updateAnimationControlsSubscription();
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
			let { isPresent: e, onExitComplete: _ } = this.node.presenceContext, { isPresent: v } = this.node.prevPresenceContext || {};
			if (!this.node.animationState || e === v) return;
			let y = this.node.animationState.setActive("exit", !e);
			_ && !e && y.then(() => {
				_(this.id);
			});
		}
		mount() {
			let { register: e, onExitComplete: _ } = this.node.presenceContext || {};
			_ && _(this.id), e && (this.unmount = e(this.id));
		}
		unmount() {}
	} }
};
function addDomEvent(e, _, v, y = { passive: !0 }) {
	return e.addEventListener(_, v, y), () => e.removeEventListener(_, v);
}
function extractEventInfo(e) {
	return { point: {
		x: e.pageX,
		y: e.pageY
	} };
}
var addPointerInfo = (e) => (_) => isPrimaryPointer(_) && e(_, extractEventInfo(_));
function addPointerEvent(e, _, v, y) {
	return addDomEvent(e, _, addPointerInfo(v), y);
}
var SCALE_PRECISION = 1e-4, SCALE_MIN = 1 - SCALE_PRECISION, SCALE_MAX = 1 + SCALE_PRECISION, TRANSLATE_PRECISION = .01, TRANSLATE_MIN = 0 - TRANSLATE_PRECISION, TRANSLATE_MAX = 0 + TRANSLATE_PRECISION;
function calcLength(e) {
	return e.max - e.min;
}
function isNear(e, _, v) {
	return Math.abs(e - _) <= v;
}
function calcAxisDelta(e, _, v, y = .5) {
	e.origin = y, e.originPoint = mixNumber(_.min, _.max, e.origin), e.scale = calcLength(v) / calcLength(_), e.translate = mixNumber(v.min, v.max, e.origin) - e.originPoint, (e.scale >= SCALE_MIN && e.scale <= SCALE_MAX || isNaN(e.scale)) && (e.scale = 1), (e.translate >= TRANSLATE_MIN && e.translate <= TRANSLATE_MAX || isNaN(e.translate)) && (e.translate = 0);
}
function calcBoxDelta(e, _, v, y) {
	calcAxisDelta(e.x, _.x, v.x, y ? y.originX : void 0), calcAxisDelta(e.y, _.y, v.y, y ? y.originY : void 0);
}
function calcRelativeAxis(e, _, v) {
	e.min = v.min + _.min, e.max = e.min + calcLength(_);
}
function calcRelativeBox(e, _, v) {
	calcRelativeAxis(e.x, _.x, v.x), calcRelativeAxis(e.y, _.y, v.y);
}
function calcRelativeAxisPosition(e, _, v) {
	e.min = _.min - v.min, e.max = e.min + calcLength(_);
}
function calcRelativePosition(e, _, v) {
	calcRelativeAxisPosition(e.x, _.x, v.x), calcRelativeAxisPosition(e.y, _.y, v.y);
}
function eachAxis(e) {
	return [e("x"), e("y")];
}
var getContextWindow = ({ current: e }) => e ? e.ownerDocument.defaultView : null, distance = (e, _) => Math.abs(e - _);
function distance2D(e, _) {
	let v = distance(e.x, _.x), y = distance(e.y, _.y);
	return Math.sqrt(v ** 2 + y ** 2);
}
var PanSession = class {
	constructor(e, _, { transformPagePoint: v, contextWindow: y = window, dragSnapToOrigin: b = !1, distanceThreshold: x = 3 } = {}) {
		if (this.startEvent = null, this.lastMoveEvent = null, this.lastMoveEventInfo = null, this.handlers = {}, this.contextWindow = window, this.updatePoint = () => {
			if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let e = getPanInfo(this.lastMoveEventInfo, this.history), _ = this.startEvent !== null, v = distance2D(e.offset, {
				x: 0,
				y: 0
			}) >= this.distanceThreshold;
			if (!_ && !v) return;
			let { point: y } = e, { timestamp: b } = frameData;
			this.history.push({
				...y,
				timestamp: b
			});
			let { onStart: x, onMove: S } = this.handlers;
			_ || (x && x(this.lastMoveEvent, e), this.startEvent = this.lastMoveEvent), S && S(this.lastMoveEvent, e);
		}, this.handlePointerMove = (e, _) => {
			this.lastMoveEvent = e, this.lastMoveEventInfo = transformPoint(_, this.transformPagePoint), frame.update(this.updatePoint, !0);
		}, this.handlePointerUp = (e, _) => {
			this.end();
			let { onEnd: v, onSessionEnd: y, resumeAnimation: b } = this.handlers;
			if (this.dragSnapToOrigin && b && b(), !(this.lastMoveEvent && this.lastMoveEventInfo)) return;
			let x = getPanInfo(e.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(_, this.transformPagePoint), this.history);
			this.startEvent && v && v(e, x), y && y(e, x);
		}, !isPrimaryPointer(e)) return;
		this.dragSnapToOrigin = b, this.handlers = _, this.transformPagePoint = v, this.distanceThreshold = x, this.contextWindow = y || window;
		let S = transformPoint(extractEventInfo(e), this.transformPagePoint), { point: C } = S, { timestamp: w } = frameData;
		this.history = [{
			...C,
			timestamp: w
		}];
		let { onSessionStart: T } = _;
		T && T(e, getPanInfo(S, this.history)), this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
	}
	updateHandlers(e) {
		this.handlers = e;
	}
	end() {
		this.removeListeners && this.removeListeners(), cancelFrame(this.updatePoint);
	}
};
function transformPoint(e, _) {
	return _ ? { point: _(e.point) } : e;
}
function subtractPoint(e, _) {
	return {
		x: e.x - _.x,
		y: e.y - _.y
	};
}
function getPanInfo({ point: e }, _) {
	return {
		point: e,
		delta: subtractPoint(e, lastDevicePoint(_)),
		offset: subtractPoint(e, startDevicePoint(_)),
		velocity: getVelocity(_, .1)
	};
}
function startDevicePoint(e) {
	return e[0];
}
function lastDevicePoint(e) {
	return e[e.length - 1];
}
function getVelocity(e, _) {
	if (e.length < 2) return {
		x: 0,
		y: 0
	};
	let v = e.length - 1, y = null, b = lastDevicePoint(e);
	for (; v >= 0 && (y = e[v], !(b.timestamp - y.timestamp > /* @__PURE__ */ secondsToMilliseconds(_)));) v--;
	if (!y) return {
		x: 0,
		y: 0
	};
	let x = /* @__PURE__ */ millisecondsToSeconds(b.timestamp - y.timestamp);
	if (x === 0) return {
		x: 0,
		y: 0
	};
	let S = {
		x: (b.x - y.x) / x,
		y: (b.y - y.y) / x
	};
	return S.x === Infinity && (S.x = 0), S.y === Infinity && (S.y = 0), S;
}
function applyConstraints(e, { min: _, max: v }, y) {
	return _ !== void 0 && e < _ ? e = y ? mixNumber(_, e, y.min) : Math.max(e, _) : v !== void 0 && e > v && (e = y ? mixNumber(v, e, y.max) : Math.min(e, v)), e;
}
function calcRelativeAxisConstraints(e, _, v) {
	return {
		min: _ === void 0 ? void 0 : e.min + _,
		max: v === void 0 ? void 0 : e.max + v - (e.max - e.min)
	};
}
function calcRelativeConstraints(e, { top: _, left: v, bottom: y, right: b }) {
	return {
		x: calcRelativeAxisConstraints(e.x, v, b),
		y: calcRelativeAxisConstraints(e.y, _, y)
	};
}
function calcViewportAxisConstraints(e, _) {
	let v = _.min - e.min, y = _.max - e.max;
	return _.max - _.min < e.max - e.min && ([v, y] = [y, v]), {
		min: v,
		max: y
	};
}
function calcViewportConstraints(e, _) {
	return {
		x: calcViewportAxisConstraints(e.x, _.x),
		y: calcViewportAxisConstraints(e.y, _.y)
	};
}
function calcOrigin(e, _) {
	let v = .5, y = calcLength(e), b = calcLength(_);
	return b > y ? v = /* @__PURE__ */ progress(_.min, _.max - y, e.min) : y > b && (v = /* @__PURE__ */ progress(e.min, e.max - b, _.min)), clamp(0, 1, v);
}
function rebaseAxisConstraints(e, _) {
	let v = {};
	return _.min !== void 0 && (v.min = _.min - e.min), _.max !== void 0 && (v.max = _.max - e.min), v;
}
var defaultElastic = .35;
function resolveDragElastic(e = defaultElastic) {
	return e === !1 ? e = 0 : e === !0 && (e = defaultElastic), {
		x: resolveAxisElastic(e, "left", "right"),
		y: resolveAxisElastic(e, "top", "bottom")
	};
}
function resolveAxisElastic(e, _, v) {
	return {
		min: resolvePointElastic(e, _),
		max: resolvePointElastic(e, v)
	};
}
function resolvePointElastic(e, _) {
	return typeof e == "number" ? e : e[_] || 0;
}
var elementDragControls = /* @__PURE__ */ new WeakMap(), VisualElementDragControls = class {
	constructor(e) {
		this.openDragLock = null, this.isDragging = !1, this.currentDirection = null, this.originPoint = {
			x: 0,
			y: 0
		}, this.constraints = !1, this.hasMutatedConstraints = !1, this.elastic = createBox(), this.latestPointerEvent = null, this.latestPanInfo = null, this.visualElement = e;
	}
	start(e, { snapToCursor: _ = !1, distanceThreshold: v } = {}) {
		let { presenceContext: y } = this.visualElement;
		if (y && y.isPresent === !1) return;
		let b = (e) => {
			let { dragSnapToOrigin: v } = this.getProps();
			v ? this.pauseAnimation() : this.stopAnimation(), _ && this.snapToCursor(extractEventInfo(e).point);
		}, x = (e, _) => {
			let { drag: v, dragPropagation: y, onDragStart: b } = this.getProps();
			if (v && !y && (this.openDragLock && this.openDragLock(), this.openDragLock = setDragLock(v), !this.openDragLock)) return;
			this.latestPointerEvent = e, this.latestPanInfo = _, this.isDragging = !0, this.currentDirection = null, this.resolveConstraints(), this.visualElement.projection && (this.visualElement.projection.isAnimationBlocked = !0, this.visualElement.projection.target = void 0), eachAxis((e) => {
				let _ = this.getAxisMotionValue(e).get() || 0;
				if (percent.test(_)) {
					let { projection: v } = this.visualElement;
					if (v && v.layout) {
						let y = v.layout.layoutBox[e];
						y && (_ = calcLength(y) * (parseFloat(_) / 100));
					}
				}
				this.originPoint[e] = _;
			}), b && frame.postRender(() => b(e, _)), addValueToWillChange(this.visualElement, "transform");
			let { animationState: x } = this.visualElement;
			x && x.setActive("whileDrag", !0);
		}, S = (e, _) => {
			this.latestPointerEvent = e, this.latestPanInfo = _;
			let { dragPropagation: v, dragDirectionLock: y, onDirectionLock: b, onDrag: x } = this.getProps();
			if (!v && !this.openDragLock) return;
			let { offset: S } = _;
			if (y && this.currentDirection === null) {
				this.currentDirection = getCurrentDirection(S), this.currentDirection !== null && b && b(this.currentDirection);
				return;
			}
			this.updateAxis("x", _.point, S), this.updateAxis("y", _.point, S), this.visualElement.render(), x && x(e, _);
		}, C = (e, _) => {
			this.latestPointerEvent = e, this.latestPanInfo = _, this.stop(e, _), this.latestPointerEvent = null, this.latestPanInfo = null;
		}, w = () => eachAxis((e) => this.getAnimationState(e) === "paused" && this.getAxisMotionValue(e).animation?.play()), { dragSnapToOrigin: T } = this.getProps();
		this.panSession = new PanSession(e, {
			onSessionStart: b,
			onStart: x,
			onMove: S,
			onSessionEnd: C,
			resumeAnimation: w
		}, {
			transformPagePoint: this.visualElement.getTransformPagePoint(),
			dragSnapToOrigin: T,
			distanceThreshold: v,
			contextWindow: getContextWindow(this.visualElement)
		});
	}
	stop(e, _) {
		let v = e || this.latestPointerEvent, y = _ || this.latestPanInfo, b = this.isDragging;
		if (this.cancel(), !b || !y || !v) return;
		let { velocity: x } = y;
		this.startAnimation(x);
		let { onDragEnd: S } = this.getProps();
		S && frame.postRender(() => S(v, y));
	}
	cancel() {
		this.isDragging = !1;
		let { projection: e, animationState: _ } = this.visualElement;
		e && (e.isAnimationBlocked = !1), this.panSession && this.panSession.end(), this.panSession = void 0;
		let { dragPropagation: v } = this.getProps();
		!v && this.openDragLock && (this.openDragLock(), this.openDragLock = null), _ && _.setActive("whileDrag", !1);
	}
	updateAxis(e, _, v) {
		let { drag: y } = this.getProps();
		if (!v || !shouldDrag(e, y, this.currentDirection)) return;
		let b = this.getAxisMotionValue(e), x = this.originPoint[e] + v[e];
		this.constraints && this.constraints[e] && (x = applyConstraints(x, this.constraints[e], this.elastic[e])), b.set(x);
	}
	resolveConstraints() {
		let { dragConstraints: e, dragElastic: _ } = this.getProps(), v = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(!1) : this.visualElement.projection?.layout, y = this.constraints;
		e && isRefObject(e) ? this.constraints ||= this.resolveRefConstraints() : e && v ? this.constraints = calcRelativeConstraints(v.layoutBox, e) : this.constraints = !1, this.elastic = resolveDragElastic(_), y !== this.constraints && v && this.constraints && !this.hasMutatedConstraints && eachAxis((e) => {
			this.constraints !== !1 && this.getAxisMotionValue(e) && (this.constraints[e] = rebaseAxisConstraints(v.layoutBox[e], this.constraints[e]));
		});
	}
	resolveRefConstraints() {
		let { dragConstraints: e, onMeasureDragConstraints: _ } = this.getProps();
		if (!e || !isRefObject(e)) return !1;
		let v = e.current;
		invariant(v !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.", "drag-constraints-ref");
		let { projection: y } = this.visualElement;
		if (!y || !y.layout) return !1;
		let b = measurePageBox(v, y.root, this.visualElement.getTransformPagePoint()), x = calcViewportConstraints(y.layout.layoutBox, b);
		if (_) {
			let e = _(convertBoxToBoundingBox(x));
			this.hasMutatedConstraints = !!e, e && (x = convertBoundingBoxToBox(e));
		}
		return x;
	}
	startAnimation(e) {
		let { drag: _, dragMomentum: v, dragElastic: y, dragTransition: b, dragSnapToOrigin: x, onDragTransitionEnd: S } = this.getProps(), C = this.constraints || {}, w = eachAxis((S) => {
			if (!shouldDrag(S, _, this.currentDirection)) return;
			let w = C && C[S] || {};
			x && (w = {
				min: 0,
				max: 0
			});
			let T = y ? 200 : 1e6, E = y ? 40 : 1e7, D = {
				type: "inertia",
				velocity: v ? e[S] : 0,
				bounceStiffness: T,
				bounceDamping: E,
				timeConstant: 750,
				restDelta: 1,
				restSpeed: 10,
				...b,
				...w
			};
			return this.startAxisValueAnimation(S, D);
		});
		return Promise.all(w).then(S);
	}
	startAxisValueAnimation(e, _) {
		let v = this.getAxisMotionValue(e);
		return addValueToWillChange(this.visualElement, e), v.start(animateMotionValue(e, v, 0, _, this.visualElement, !1));
	}
	stopAnimation() {
		eachAxis((e) => this.getAxisMotionValue(e).stop());
	}
	pauseAnimation() {
		eachAxis((e) => this.getAxisMotionValue(e).animation?.pause());
	}
	getAnimationState(e) {
		return this.getAxisMotionValue(e).animation?.state;
	}
	getAxisMotionValue(e) {
		let _ = `_drag${e.toUpperCase()}`, v = this.visualElement.getProps();
		return v[_] || this.visualElement.getValue(e, (v.initial ? v.initial[e] : void 0) || 0);
	}
	snapToCursor(e) {
		eachAxis((_) => {
			let { drag: v } = this.getProps();
			if (!shouldDrag(_, v, this.currentDirection)) return;
			let { projection: y } = this.visualElement, b = this.getAxisMotionValue(_);
			if (y && y.layout) {
				let { min: v, max: x } = y.layout.layoutBox[_];
				b.set(e[_] - mixNumber(v, x, .5));
			}
		});
	}
	scalePositionWithinConstraints() {
		if (!this.visualElement.current) return;
		let { drag: e, dragConstraints: _ } = this.getProps(), { projection: v } = this.visualElement;
		if (!isRefObject(_) || !v || !this.constraints) return;
		this.stopAnimation();
		let y = {
			x: 0,
			y: 0
		};
		eachAxis((e) => {
			let _ = this.getAxisMotionValue(e);
			if (_ && this.constraints !== !1) {
				let v = _.get();
				y[e] = calcOrigin({
					min: v,
					max: v
				}, this.constraints[e]);
			}
		});
		let { transformTemplate: b } = this.visualElement.getProps();
		this.visualElement.current.style.transform = b ? b({}, "") : "none", v.root && v.root.updateScroll(), v.updateLayout(), this.resolveConstraints(), eachAxis((_) => {
			if (!shouldDrag(_, e, null)) return;
			let v = this.getAxisMotionValue(_), { min: b, max: x } = this.constraints[_];
			v.set(mixNumber(b, x, y[_]));
		});
	}
	addListeners() {
		if (!this.visualElement.current) return;
		elementDragControls.set(this.visualElement, this);
		let e = this.visualElement.current, _ = addPointerEvent(e, "pointerdown", (e) => {
			let { drag: _, dragListener: v = !0 } = this.getProps();
			_ && v && this.start(e);
		}), v = () => {
			let { dragConstraints: e } = this.getProps();
			isRefObject(e) && e.current && (this.constraints = this.resolveRefConstraints());
		}, { projection: y } = this.visualElement, b = y.addEventListener("measure", v);
		y && !y.layout && (y.root && y.root.updateScroll(), y.updateLayout()), frame.read(v);
		let x = addDomEvent(window, "resize", () => this.scalePositionWithinConstraints()), S = y.addEventListener("didUpdate", (({ delta: e, hasLayoutChanged: _ }) => {
			this.isDragging && _ && (eachAxis((_) => {
				let v = this.getAxisMotionValue(_);
				v && (this.originPoint[_] += e[_].translate, v.set(v.get() + e[_].translate));
			}), this.visualElement.render());
		}));
		return () => {
			x(), _(), b(), S && S();
		};
	}
	getProps() {
		let e = this.visualElement.getProps(), { drag: _ = !1, dragDirectionLock: v = !1, dragPropagation: y = !1, dragConstraints: b = !1, dragElastic: x = defaultElastic, dragMomentum: S = !0 } = e;
		return {
			...e,
			drag: _,
			dragDirectionLock: v,
			dragPropagation: y,
			dragConstraints: b,
			dragElastic: x,
			dragMomentum: S
		};
	}
};
function shouldDrag(e, _, v) {
	return (_ === !0 || _ === e) && (v === null || v === e);
}
function getCurrentDirection(e, _ = 10) {
	let v = null;
	return Math.abs(e.y) > _ ? v = "y" : Math.abs(e.x) > _ && (v = "x"), v;
}
var DragGesture = class extends Feature {
	constructor(e) {
		super(e), this.removeGroupControls = noop, this.removeListeners = noop, this.controls = new VisualElementDragControls(e);
	}
	mount() {
		let { dragControls: e } = this.node.getProps();
		e && (this.removeGroupControls = e.subscribe(this.controls)), this.removeListeners = this.controls.addListeners() || noop;
	}
	unmount() {
		this.removeGroupControls(), this.removeListeners();
	}
}, asyncHandler = (e) => (_, v) => {
	e && frame.postRender(() => e(_, v));
}, PanGesture = class extends Feature {
	constructor() {
		super(...arguments), this.removePointerDownListener = noop;
	}
	onPointerDown(e) {
		this.session = new PanSession(e, this.createPanHandlers(), {
			transformPagePoint: this.node.getTransformPagePoint(),
			contextWindow: getContextWindow(this.node)
		});
	}
	createPanHandlers() {
		let { onPanSessionStart: e, onPanStart: _, onPan: v, onPanEnd: y } = this.node.getProps();
		return {
			onSessionStart: asyncHandler(e),
			onStart: asyncHandler(_),
			onMove: v,
			onEnd: (e, _) => {
				delete this.session, y && frame.postRender(() => y(e, _));
			}
		};
	}
	mount() {
		this.removePointerDownListener = addPointerEvent(this.node.current, "pointerdown", (e) => this.onPointerDown(e));
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
		let { visualElement: e, layoutGroup: _, switchLayoutGroup: v, layoutId: y } = this.props, { projection: b } = e;
		b && (_.group && _.group.add(b), v && v.register && y && v.register(b), hasTakenAnySnapshot && b.root.didUpdate(), b.addEventListener("animationComplete", () => {
			this.safeToRemove();
		}), b.setOptions({
			...b.options,
			onExitComplete: () => this.safeToRemove()
		})), globalProjectionState.hasEverUpdated = !0;
	}
	getSnapshotBeforeUpdate(e) {
		let { layoutDependency: _, visualElement: v, drag: y, isPresent: b } = this.props, { projection: x } = v;
		return x ? (x.isPresent = b, hasTakenAnySnapshot = !0, y || e.layoutDependency !== _ || _ === void 0 || e.isPresent !== b ? x.willUpdate() : this.safeToRemove(), e.isPresent !== b && (b ? x.promote() : x.relegate() || frame.postRender(() => {
			let e = x.getStack();
			(!e || !e.members.length) && this.safeToRemove();
		})), null) : null;
	}
	componentDidUpdate() {
		let { projection: e } = this.props.visualElement;
		e && (e.root.didUpdate(), microtask.postRender(() => {
			!e.currentAnimation && e.isLead() && this.safeToRemove();
		}));
	}
	componentWillUnmount() {
		let { visualElement: e, layoutGroup: _, switchLayoutGroup: v } = this.props, { projection: y } = e;
		hasTakenAnySnapshot = !0, y && (y.scheduleCheckAfterUnmount(), _ && _.group && _.group.remove(y), v && v.deregister && v.deregister(y));
	}
	safeToRemove() {
		let { safeToRemove: e } = this.props;
		e && e();
	}
	render() {
		return null;
	}
};
function MeasureLayout(e) {
	let [_, v] = usePresence(), y = useContext(LayoutGroupContext);
	return (0, import_jsx_runtime.jsx)(MeasureLayoutWithContext, {
		...e,
		layoutGroup: y,
		switchLayoutGroup: useContext(SwitchLayoutGroupContext),
		isPresent: _,
		safeToRemove: v
	});
}
function animateSingleValue(e, _, v) {
	let y = isMotionValue(e) ? e : motionValue(e);
	return y.start(animateMotionValue("", y, _, v)), y.animation;
}
var compareByDepth = (e, _) => e.depth - _.depth, FlatTree = class {
	constructor() {
		this.children = [], this.isDirty = !1;
	}
	add(e) {
		addUniqueItem(this.children, e), this.isDirty = !0;
	}
	remove(e) {
		removeItem(this.children, e), this.isDirty = !0;
	}
	forEach(e) {
		this.isDirty && this.children.sort(compareByDepth), this.isDirty = !1, this.children.forEach(e);
	}
};
function delay(e, _) {
	let v = time.now(), y = ({ timestamp: b }) => {
		let x = b - v;
		x >= _ && (cancelFrame(y), e(x - _));
	};
	return frame.setup(y, !0), () => cancelFrame(y);
}
var borders = [
	"TopLeft",
	"TopRight",
	"BottomLeft",
	"BottomRight"
], numBorders = borders.length, asNumber = (e) => typeof e == "string" ? parseFloat(e) : e, isPx = (e) => typeof e == "number" || px.test(e);
function mixValues(e, _, v, y, b, x) {
	b ? (e.opacity = mixNumber(0, v.opacity ?? 1, easeCrossfadeIn(y)), e.opacityExit = mixNumber(_.opacity ?? 1, 0, easeCrossfadeOut(y))) : x && (e.opacity = mixNumber(_.opacity ?? 1, v.opacity ?? 1, y));
	for (let b = 0; b < numBorders; b++) {
		let x = `border${borders[b]}Radius`, S = getRadius(_, x), C = getRadius(v, x);
		S === void 0 && C === void 0 || (S ||= 0, C ||= 0, S === 0 || C === 0 || isPx(S) === isPx(C) ? (e[x] = Math.max(mixNumber(asNumber(S), asNumber(C), y), 0), (percent.test(C) || percent.test(S)) && (e[x] += "%")) : e[x] = C);
	}
	(_.rotate || v.rotate) && (e.rotate = mixNumber(_.rotate || 0, v.rotate || 0, y));
}
function getRadius(e, _) {
	return e[_] === void 0 ? e.borderRadius : e[_];
}
var easeCrossfadeIn = /* @__PURE__ */ compress(0, .5, circOut), easeCrossfadeOut = /* @__PURE__ */ compress(.5, .95, noop);
function compress(e, _, v) {
	return (y) => y < e ? 0 : y > _ ? 1 : v(/* @__PURE__ */ progress(e, _, y));
}
function copyAxisInto(e, _) {
	e.min = _.min, e.max = _.max;
}
function copyBoxInto(e, _) {
	copyAxisInto(e.x, _.x), copyAxisInto(e.y, _.y);
}
function copyAxisDeltaInto(e, _) {
	e.translate = _.translate, e.scale = _.scale, e.originPoint = _.originPoint, e.origin = _.origin;
}
function removePointDelta(e, _, v, y, b) {
	return e -= _, e = scalePoint(e, 1 / v, y), b !== void 0 && (e = scalePoint(e, 1 / b, y)), e;
}
function removeAxisDelta(e, _ = 0, v = 1, y = .5, b, x = e, S = e) {
	if (percent.test(_) && (_ = parseFloat(_), _ = mixNumber(S.min, S.max, _ / 100) - S.min), typeof _ != "number") return;
	let C = mixNumber(x.min, x.max, y);
	e === x && (C -= _), e.min = removePointDelta(e.min, _, v, C, b), e.max = removePointDelta(e.max, _, v, C, b);
}
function removeAxisTransforms(e, _, [v, y, b], x, S) {
	removeAxisDelta(e, _[v], _[y], _[b], _.scale, x, S);
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
function removeBoxTransforms(e, _, v, y) {
	removeAxisTransforms(e.x, _, xKeys, v ? v.x : void 0, y ? y.x : void 0), removeAxisTransforms(e.y, _, yKeys, v ? v.y : void 0, y ? y.y : void 0);
}
function isAxisDeltaZero(e) {
	return e.translate === 0 && e.scale === 1;
}
function isDeltaZero(e) {
	return isAxisDeltaZero(e.x) && isAxisDeltaZero(e.y);
}
function axisEquals(e, _) {
	return e.min === _.min && e.max === _.max;
}
function boxEquals(e, _) {
	return axisEquals(e.x, _.x) && axisEquals(e.y, _.y);
}
function axisEqualsRounded(e, _) {
	return Math.round(e.min) === Math.round(_.min) && Math.round(e.max) === Math.round(_.max);
}
function boxEqualsRounded(e, _) {
	return axisEqualsRounded(e.x, _.x) && axisEqualsRounded(e.y, _.y);
}
function aspectRatio(e) {
	return calcLength(e.x) / calcLength(e.y);
}
function axisDeltaEquals(e, _) {
	return e.translate === _.translate && e.scale === _.scale && e.originPoint === _.originPoint;
}
var NodeStack = class {
	constructor() {
		this.members = [];
	}
	add(e) {
		addUniqueItem(this.members, e), e.scheduleRender();
	}
	remove(e) {
		if (removeItem(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead) {
			let e = this.members[this.members.length - 1];
			e && this.promote(e);
		}
	}
	relegate(e) {
		let _ = this.members.findIndex((_) => e === _);
		if (_ === 0) return !1;
		let v;
		for (let e = _; e >= 0; e--) {
			let _ = this.members[e];
			if (_.isPresent !== !1) {
				v = _;
				break;
			}
		}
		return v ? (this.promote(v), !0) : !1;
	}
	promote(e, _) {
		let v = this.lead;
		if (e !== v && (this.prevLead = v, this.lead = e, e.show(), v)) {
			v.instance && v.scheduleRender(), e.scheduleRender(), e.resumeFrom = v, _ && (e.resumeFrom.preserveOpacity = !0), v.snapshot && (e.snapshot = v.snapshot, e.snapshot.latestValues = v.animationValues || v.latestValues), e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
			let { crossfade: y } = e.options;
			y === !1 && v.hide();
		}
	}
	exitAnimationComplete() {
		this.members.forEach((e) => {
			let { options: _, resumingFrom: v } = e;
			_.onExitComplete && _.onExitComplete(), v && v.options.onExitComplete && v.options.onExitComplete();
		});
	}
	scheduleRender() {
		this.members.forEach((e) => {
			e.instance && e.scheduleRender(!1);
		});
	}
	removeLeadSnapshot() {
		this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
	}
};
function buildProjectionTransform(e, _, v) {
	let y = "", b = e.x.translate / _.x, x = e.y.translate / _.y, S = v?.z || 0;
	if ((b || x || S) && (y = `translate3d(${b}px, ${x}px, ${S}px) `), (_.x !== 1 || _.y !== 1) && (y += `scale(${1 / _.x}, ${1 / _.y}) `), v) {
		let { transformPerspective: e, rotate: _, rotateX: b, rotateY: x, skewX: S, skewY: C } = v;
		e && (y = `perspective(${e}px) ${y}`), _ && (y += `rotate(${_}deg) `), b && (y += `rotateX(${b}deg) `), x && (y += `rotateY(${x}deg) `), S && (y += `skewX(${S}deg) `), C && (y += `skewY(${C}deg) `);
	}
	let C = e.x.scale * _.x, w = e.y.scale * _.y;
	return (C !== 1 || w !== 1) && (y += `scale(${C}, ${w})`), y || "none";
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
function resetDistortingTransform(e, _, v, y) {
	let { latestValues: b } = _;
	b[e] && (v[e] = b[e], _.setStaticValue(e, 0), y && (y[e] = 0));
}
function cancelTreeOptimisedTransformAnimations(e) {
	if (e.hasCheckedOptimisedAppear = !0, e.root === e) return;
	let { visualElement: _ } = e.options;
	if (!_) return;
	let v = getOptimisedAppearId(_);
	if (window.MotionHasOptimisedAnimation(v, "transform")) {
		let { layout: _, layoutId: y } = e.options;
		window.MotionCancelOptimisedAnimation(v, "transform", frame, !(_ || y));
	}
	let { parent: y } = e;
	y && !y.hasCheckedOptimisedAppear && cancelTreeOptimisedTransformAnimations(y);
}
function createProjectionNode({ attachResizeListener: e, defaultParent: _, measureScroll: v, checkIsScrollRoot: y, resetTransform: b }) {
	return class {
		constructor(e = {}, v = _?.()) {
			this.id = id++, this.animationId = 0, this.animationCommitId = 0, this.children = /* @__PURE__ */ new Set(), this.options = {}, this.isTreeAnimating = !1, this.isAnimationBlocked = !1, this.isLayoutDirty = !1, this.isProjectionDirty = !1, this.isSharedProjectionDirty = !1, this.isTransformDirty = !1, this.updateManuallyBlocked = !1, this.updateBlockedByResize = !1, this.isUpdating = !1, this.isSVG = !1, this.needsReset = !1, this.shouldResetTransform = !1, this.hasCheckedOptimisedAppear = !1, this.treeScale = {
				x: 1,
				y: 1
			}, this.eventHandlers = /* @__PURE__ */ new Map(), this.hasTreeAnimated = !1, this.layoutVersion = 0, this.updateScheduled = !1, this.scheduleUpdate = () => this.update(), this.projectionUpdateScheduled = !1, this.checkUpdateFailed = () => {
				this.isUpdating && (this.isUpdating = !1, this.clearAllSnapshots());
			}, this.updateProjection = () => {
				this.projectionUpdateScheduled = !1, statsBuffer.value && (metrics.nodes = metrics.calculatedTargetDeltas = metrics.calculatedProjections = 0), this.nodes.forEach(propagateDirtyNodes), this.nodes.forEach(resolveTargetDelta), this.nodes.forEach(calcProjection), this.nodes.forEach(cleanDirtyNodes), statsBuffer.addProjectionMetrics && statsBuffer.addProjectionMetrics(metrics);
			}, this.resolvedRelativeTargetAt = 0, this.linkedParentVersion = 0, this.hasProjected = !1, this.isVisible = !0, this.animationProgress = 0, this.sharedNodes = /* @__PURE__ */ new Map(), this.latestValues = e, this.root = v ? v.root || v : this, this.path = v ? [...v.path, v] : [], this.parent = v, this.depth = v ? v.depth + 1 : 0;
			for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
			this.root === this && (this.nodes = new FlatTree());
		}
		addEventListener(e, _) {
			return this.eventHandlers.has(e) || this.eventHandlers.set(e, new SubscriptionManager()), this.eventHandlers.get(e).add(_);
		}
		notifyListeners(e, ..._) {
			let v = this.eventHandlers.get(e);
			v && v.notify(..._);
		}
		hasListeners(e) {
			return this.eventHandlers.has(e);
		}
		mount(_) {
			if (this.instance) return;
			this.isSVG = isSVGElement(_) && !isSVGSVGElement(_), this.instance = _;
			let { layoutId: v, layout: y, visualElement: b } = this.options;
			if (b && !b.current && b.mount(_), this.root.nodes.add(this), this.parent && this.parent.children.add(this), this.root.hasTreeAnimated && (y || v) && (this.isLayoutDirty = !0), e) {
				let v, y = 0, b = () => this.root.updateBlockedByResize = !1;
				frame.read(() => {
					y = window.innerWidth;
				}), e(_, () => {
					let e = window.innerWidth;
					e !== y && (y = e, this.root.updateBlockedByResize = !0, v && v(), v = delay(b, 250), globalProjectionState.hasAnimatedSinceResize && (globalProjectionState.hasAnimatedSinceResize = !1, this.nodes.forEach(finishAnimation)));
				});
			}
			v && this.root.registerSharedNode(v, this), this.options.animate !== !1 && b && (v || y) && this.addEventListener("didUpdate", ({ delta: e, hasLayoutChanged: _, hasRelativeLayoutChanged: v, layout: y }) => {
				if (this.isTreeAnimationBlocked()) {
					this.target = void 0, this.relativeTarget = void 0;
					return;
				}
				let x = this.options.transition || b.getDefaultTransition() || defaultLayoutTransition, { onLayoutAnimationStart: S, onLayoutAnimationComplete: C } = b.getProps(), w = !this.targetLayout || !boxEqualsRounded(this.targetLayout, y), T = !_ && v;
				if (this.options.layoutRoot || this.resumeFrom || T || _ && (w || !this.currentAnimation)) {
					this.resumeFrom && (this.resumingFrom = this.resumeFrom, this.resumingFrom.resumingFrom = void 0);
					let _ = {
						...getValueTransition(x, "layout"),
						onPlay: S,
						onComplete: C
					};
					(b.shouldReduceMotion || this.options.layoutRoot) && (_.delay = 0, _.type = !1), this.startAnimation(_), this.setAnimationOrigin(e, T);
				} else _ || finishAnimation(this), this.isLead() && this.options.onExitComplete && this.options.onExitComplete();
				this.targetLayout = y;
			});
		}
		unmount() {
			this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this);
			let e = this.getStack();
			e && e.remove(this), this.parent && this.parent.children.delete(this), this.instance = void 0, this.eventHandlers.clear(), cancelFrame(this.updateProjection);
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
			let { visualElement: e } = this.options;
			return e && e.getProps().transformTemplate;
		}
		willUpdate(e = !0) {
			if (this.root.hasTreeAnimated = !0, this.root.isUpdateBlocked()) {
				this.options.onExitComplete && this.options.onExitComplete();
				return;
			}
			if (window.MotionCancelOptimisedAnimation && !this.hasCheckedOptimisedAppear && cancelTreeOptimisedTransformAnimations(this), !this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty) return;
			this.isLayoutDirty = !0;
			for (let e = 0; e < this.path.length; e++) {
				let _ = this.path[e];
				_.shouldResetTransform = !0, _.updateScroll("snapshot"), _.options.layoutRoot && _.willUpdate(!1);
			}
			let { layoutId: _, layout: v } = this.options;
			if (_ === void 0 && !v) return;
			let y = this.getTransformTemplate();
			this.prevTransformTemplateValue = y ? y(this.latestValues, "") : void 0, this.updateSnapshot(), e && this.notifyListeners("willUpdate");
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
			let e = time.now();
			frameData.delta = clamp(0, 1e3 / 60, e - frameData.timestamp), frameData.timestamp = e, frameData.isProcessing = !0, frameSteps.update.process(frameData), frameSteps.preRender.process(frameData), frameSteps.render.process(frameData), frameData.isProcessing = !1;
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
			if (this.resumeFrom && !this.resumeFrom.instance) for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
			let e = this.layout;
			this.layout = this.measure(!1), this.layoutVersion++, this.layoutCorrected = createBox(), this.isLayoutDirty = !1, this.projectionDelta = void 0, this.notifyListeners("measure", this.layout.layoutBox);
			let { visualElement: _ } = this.options;
			_ && _.notify("LayoutMeasure", this.layout.layoutBox, e ? e.layoutBox : void 0);
		}
		updateScroll(e = "measure") {
			let _ = !!(this.options.layoutScroll && this.instance);
			if (this.scroll && this.scroll.animationId === this.root.animationId && this.scroll.phase === e && (_ = !1), _ && this.instance) {
				let _ = y(this.instance);
				this.scroll = {
					animationId: this.root.animationId,
					phase: e,
					isRoot: _,
					offset: v(this.instance),
					wasRoot: this.scroll ? this.scroll.isRoot : _
				};
			}
		}
		resetTransform() {
			if (!b) return;
			let e = this.isLayoutDirty || this.shouldResetTransform || this.options.alwaysMeasureLayout, _ = this.projectionDelta && !isDeltaZero(this.projectionDelta), v = this.getTransformTemplate(), y = v ? v(this.latestValues, "") : void 0, x = y !== this.prevTransformTemplateValue;
			e && this.instance && (_ || hasTransform(this.latestValues) || x) && (b(this.instance, y), this.shouldResetTransform = !1, this.scheduleRender());
		}
		measure(e = !0) {
			let _ = this.measurePageBox(), v = this.removeElementScroll(_);
			return e && (v = this.removeTransform(v)), roundBox(v), {
				animationId: this.root.animationId,
				measuredBox: _,
				layoutBox: v,
				latestValues: {},
				source: this.id
			};
		}
		measurePageBox() {
			let { visualElement: e } = this.options;
			if (!e) return createBox();
			let _ = e.measureViewportBox();
			if (!(this.scroll?.wasRoot || this.path.some(checkNodeWasScrollRoot))) {
				let { scroll: e } = this.root;
				e && (translateAxis(_.x, e.offset.x), translateAxis(_.y, e.offset.y));
			}
			return _;
		}
		removeElementScroll(e) {
			let _ = createBox();
			if (copyBoxInto(_, e), this.scroll?.wasRoot) return _;
			for (let v = 0; v < this.path.length; v++) {
				let y = this.path[v], { scroll: b, options: x } = y;
				y !== this.root && b && x.layoutScroll && (b.wasRoot && copyBoxInto(_, e), translateAxis(_.x, b.offset.x), translateAxis(_.y, b.offset.y));
			}
			return _;
		}
		applyTransform(e, _ = !1) {
			let v = createBox();
			copyBoxInto(v, e);
			for (let e = 0; e < this.path.length; e++) {
				let y = this.path[e];
				!_ && y.options.layoutScroll && y.scroll && y !== y.root && transformBox(v, {
					x: -y.scroll.offset.x,
					y: -y.scroll.offset.y
				}), hasTransform(y.latestValues) && transformBox(v, y.latestValues);
			}
			return hasTransform(this.latestValues) && transformBox(v, this.latestValues), v;
		}
		removeTransform(e) {
			let _ = createBox();
			copyBoxInto(_, e);
			for (let e = 0; e < this.path.length; e++) {
				let v = this.path[e];
				if (!v.instance || !hasTransform(v.latestValues)) continue;
				hasScale(v.latestValues) && v.updateSnapshot();
				let y = createBox();
				copyBoxInto(y, v.measurePageBox()), removeBoxTransforms(_, v.latestValues, v.snapshot ? v.snapshot.layoutBox : void 0, y);
			}
			return hasTransform(this.latestValues) && removeBoxTransforms(_, this.latestValues), _;
		}
		setTargetDelta(e) {
			this.targetDelta = e, this.root.scheduleUpdateProjection(), this.isProjectionDirty = !0;
		}
		setOptions(e) {
			this.options = {
				...this.options,
				...e,
				crossfade: e.crossfade === void 0 ? !0 : e.crossfade
			};
		}
		clearMeasurements() {
			this.scroll = void 0, this.layout = void 0, this.snapshot = void 0, this.prevTransformTemplateValue = void 0, this.targetDelta = void 0, this.target = void 0, this.isLayoutDirty = !1;
		}
		forceRelativeParentToResolveTarget() {
			this.relativeParent && this.relativeParent.resolvedRelativeTargetAt !== frameData.timestamp && this.relativeParent.resolveTargetDelta(!0);
		}
		resolveTargetDelta(e = !1) {
			let _ = this.getLead();
			this.isProjectionDirty ||= _.isProjectionDirty, this.isTransformDirty ||= _.isTransformDirty, this.isSharedProjectionDirty ||= _.isSharedProjectionDirty;
			let v = !!this.resumingFrom || this !== _;
			if (!(e || v && this.isSharedProjectionDirty || this.isProjectionDirty || this.parent?.isProjectionDirty || this.attemptToResolveRelativeTarget || this.root.updateBlockedByResize)) return;
			let { layout: y, layoutId: b } = this.options;
			if (!this.layout || !(y || b)) return;
			this.resolvedRelativeTargetAt = frameData.timestamp;
			let x = this.getClosestProjectingParent();
			x && this.linkedParentVersion !== x.layoutVersion && !x.options.layoutRoot && this.removeRelativeTarget(), !this.targetDelta && !this.relativeTarget && (x && x.layout ? this.createRelativeTarget(x, this.layout.layoutBox, x.layout.layoutBox) : this.removeRelativeTarget()), !(!this.relativeTarget && !this.targetDelta) && (this.target || (this.target = createBox(), this.targetWithTransforms = createBox()), this.relativeTarget && this.relativeTargetOrigin && this.relativeParent && this.relativeParent.target ? (this.forceRelativeParentToResolveTarget(), calcRelativeBox(this.target, this.relativeTarget, this.relativeParent.target)) : this.targetDelta ? (this.resumingFrom ? this.target = this.applyTransform(this.layout.layoutBox) : copyBoxInto(this.target, this.layout.layoutBox), applyBoxDelta(this.target, this.targetDelta)) : copyBoxInto(this.target, this.layout.layoutBox), this.attemptToResolveRelativeTarget && (this.attemptToResolveRelativeTarget = !1, x && !!x.resumingFrom == !!this.resumingFrom && !x.options.layoutScroll && x.target && this.animationProgress !== 1 ? this.createRelativeTarget(x, this.target, x.target) : this.relativeParent = this.relativeTarget = void 0), statsBuffer.value && metrics.calculatedTargetDeltas++);
		}
		getClosestProjectingParent() {
			if (!(!this.parent || hasScale(this.parent.latestValues) || has2DTranslate(this.parent.latestValues))) return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
		}
		isProjecting() {
			return !!((this.relativeTarget || this.targetDelta || this.options.layoutRoot) && this.layout);
		}
		createRelativeTarget(e, _, v) {
			this.relativeParent = e, this.linkedParentVersion = e.layoutVersion, this.forceRelativeParentToResolveTarget(), this.relativeTarget = createBox(), this.relativeTargetOrigin = createBox(), calcRelativePosition(this.relativeTargetOrigin, _, v), copyBoxInto(this.relativeTarget, this.relativeTargetOrigin);
		}
		removeRelativeTarget() {
			this.relativeParent = this.relativeTarget = void 0;
		}
		calcProjection() {
			let e = this.getLead(), _ = !!this.resumingFrom || this !== e, v = !0;
			if ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (v = !1), _ && (this.isSharedProjectionDirty || this.isTransformDirty) && (v = !1), this.resolvedRelativeTargetAt === frameData.timestamp && (v = !1), v) return;
			let { layout: y, layoutId: b } = this.options;
			if (this.isTreeAnimating = !!(this.parent && this.parent.isTreeAnimating || this.currentAnimation || this.pendingAnimation), this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0), !this.layout || !(y || b)) return;
			copyBoxInto(this.layoutCorrected, this.layout.layoutBox);
			let x = this.treeScale.x, S = this.treeScale.y;
			applyTreeDeltas(this.layoutCorrected, this.treeScale, this.path, _), e.layout && !e.target && (this.treeScale.x !== 1 || this.treeScale.y !== 1) && (e.target = e.layout.layoutBox, e.targetWithTransforms = createBox());
			let { target: C } = e;
			if (!C) {
				this.prevProjectionDelta && (this.createProjectionDeltas(), this.scheduleRender());
				return;
			}
			!this.projectionDelta || !this.prevProjectionDelta ? this.createProjectionDeltas() : (copyAxisDeltaInto(this.prevProjectionDelta.x, this.projectionDelta.x), copyAxisDeltaInto(this.prevProjectionDelta.y, this.projectionDelta.y)), calcBoxDelta(this.projectionDelta, this.layoutCorrected, C, this.latestValues), (this.treeScale.x !== x || this.treeScale.y !== S || !axisDeltaEquals(this.projectionDelta.x, this.prevProjectionDelta.x) || !axisDeltaEquals(this.projectionDelta.y, this.prevProjectionDelta.y)) && (this.hasProjected = !0, this.scheduleRender(), this.notifyListeners("projectionUpdate", C)), statsBuffer.value && metrics.calculatedProjections++;
		}
		hide() {
			this.isVisible = !1;
		}
		show() {
			this.isVisible = !0;
		}
		scheduleRender(e = !0) {
			if (this.options.visualElement?.scheduleRender(), e) {
				let e = this.getStack();
				e && e.scheduleRender();
			}
			this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
		}
		createProjectionDeltas() {
			this.prevProjectionDelta = createDelta(), this.projectionDelta = createDelta(), this.projectionDeltaWithTransform = createDelta();
		}
		setAnimationOrigin(e, _ = !1) {
			let v = this.snapshot, y = v ? v.latestValues : {}, b = { ...this.latestValues }, x = createDelta();
			(!this.relativeParent || !this.relativeParent.options.layoutRoot) && (this.relativeTarget = this.relativeTargetOrigin = void 0), this.attemptToResolveRelativeTarget = !_;
			let S = createBox(), C = (v ? v.source : void 0) !== (this.layout ? this.layout.source : void 0), w = this.getStack(), T = !w || w.members.length <= 1, E = !!(C && !T && this.options.crossfade === !0 && !this.path.some(hasOpacityCrossfade));
			this.animationProgress = 0;
			let D;
			this.mixTargetDelta = (_) => {
				let v = _ / 1e3;
				mixAxisDelta(x.x, e.x, v), mixAxisDelta(x.y, e.y, v), this.setTargetDelta(x), this.relativeTarget && this.relativeTargetOrigin && this.layout && this.relativeParent && this.relativeParent.layout && (calcRelativePosition(S, this.layout.layoutBox, this.relativeParent.layout.layoutBox), mixBox(this.relativeTarget, this.relativeTargetOrigin, S, v), D && boxEquals(this.relativeTarget, D) && (this.isProjectionDirty = !1), D ||= createBox(), copyBoxInto(D, this.relativeTarget)), C && (this.animationValues = b, mixValues(b, y, this.latestValues, v, E, T)), this.root.scheduleUpdateProjection(), this.scheduleRender(), this.animationProgress = v;
			}, this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0);
		}
		startAnimation(e) {
			this.notifyListeners("animationStart"), this.currentAnimation?.stop(), this.resumingFrom?.currentAnimation?.stop(), this.pendingAnimation &&= (cancelFrame(this.pendingAnimation), void 0), this.pendingAnimation = frame.update(() => {
				globalProjectionState.hasAnimatedSinceResize = !0, activeAnimations.layout++, this.motionValue ||= motionValue(0), this.currentAnimation = animateSingleValue(this.motionValue, [0, 1e3], {
					...e,
					velocity: 0,
					isSync: !0,
					onUpdate: (_) => {
						this.mixTargetDelta(_), e.onUpdate && e.onUpdate(_);
					},
					onStop: () => {
						activeAnimations.layout--;
					},
					onComplete: () => {
						activeAnimations.layout--, e.onComplete && e.onComplete(), this.completeAnimation();
					}
				}), this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation), this.pendingAnimation = void 0;
			});
		}
		completeAnimation() {
			this.resumingFrom && (this.resumingFrom.currentAnimation = void 0, this.resumingFrom.preserveOpacity = void 0);
			let e = this.getStack();
			e && e.exitAnimationComplete(), this.resumingFrom = this.currentAnimation = this.animationValues = void 0, this.notifyListeners("animationComplete");
		}
		finishAnimation() {
			this.currentAnimation && (this.mixTargetDelta && this.mixTargetDelta(animationTarget), this.currentAnimation.stop()), this.completeAnimation();
		}
		applyTransformsToTarget() {
			let e = this.getLead(), { targetWithTransforms: _, target: v, layout: y, latestValues: b } = e;
			if (!(!_ || !v || !y)) {
				if (this !== e && this.layout && y && shouldAnimatePositionOnly(this.options.animationType, this.layout.layoutBox, y.layoutBox)) {
					v = this.target || createBox();
					let _ = calcLength(this.layout.layoutBox.x);
					v.x.min = e.target.x.min, v.x.max = v.x.min + _;
					let y = calcLength(this.layout.layoutBox.y);
					v.y.min = e.target.y.min, v.y.max = v.y.min + y;
				}
				copyBoxInto(_, v), transformBox(_, b), calcBoxDelta(this.projectionDeltaWithTransform, this.layoutCorrected, _, b);
			}
		}
		registerSharedNode(e, _) {
			this.sharedNodes.has(e) || this.sharedNodes.set(e, new NodeStack()), this.sharedNodes.get(e).add(_);
			let v = _.options.initialPromotionConfig;
			_.promote({
				transition: v ? v.transition : void 0,
				preserveFollowOpacity: v && v.shouldPreserveFollowOpacity ? v.shouldPreserveFollowOpacity(_) : void 0
			});
		}
		isLead() {
			let e = this.getStack();
			return e ? e.lead === this : !0;
		}
		getLead() {
			let { layoutId: e } = this.options;
			return e && this.getStack()?.lead || this;
		}
		getPrevLead() {
			let { layoutId: e } = this.options;
			return e ? this.getStack()?.prevLead : void 0;
		}
		getStack() {
			let { layoutId: e } = this.options;
			if (e) return this.root.sharedNodes.get(e);
		}
		promote({ needsReset: e, transition: _, preserveFollowOpacity: v } = {}) {
			let y = this.getStack();
			y && y.promote(this, v), e && (this.projectionDelta = void 0, this.needsReset = !0), _ && this.setOptions({ transition: _ });
		}
		relegate() {
			let e = this.getStack();
			return e ? e.relegate(this) : !1;
		}
		resetSkewAndRotation() {
			let { visualElement: e } = this.options;
			if (!e) return;
			let _ = !1, { latestValues: v } = e;
			if ((v.z || v.rotate || v.rotateX || v.rotateY || v.rotateZ || v.skewX || v.skewY) && (_ = !0), !_) return;
			let y = {};
			v.z && resetDistortingTransform("z", e, y, this.animationValues);
			for (let _ = 0; _ < transformAxes.length; _++) resetDistortingTransform(`rotate${transformAxes[_]}`, e, y, this.animationValues), resetDistortingTransform(`skew${transformAxes[_]}`, e, y, this.animationValues);
			for (let _ in e.render(), y) e.setStaticValue(_, y[_]), this.animationValues && (this.animationValues[_] = y[_]);
			e.scheduleRender();
		}
		applyProjectionStyles(e, _) {
			if (!this.instance || this.isSVG) return;
			if (!this.isVisible) {
				e.visibility = "hidden";
				return;
			}
			let v = this.getTransformTemplate();
			if (this.needsReset) {
				this.needsReset = !1, e.visibility = "", e.opacity = "", e.pointerEvents = resolveMotionValue(_?.pointerEvents) || "", e.transform = v ? v(this.latestValues, "") : "none";
				return;
			}
			let y = this.getLead();
			if (!this.projectionDelta || !this.layout || !y.target) {
				this.options.layoutId && (e.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity, e.pointerEvents = resolveMotionValue(_?.pointerEvents) || ""), this.hasProjected && !hasTransform(this.latestValues) && (e.transform = v ? v({}, "") : "none", this.hasProjected = !1);
				return;
			}
			e.visibility = "";
			let b = y.animationValues || y.latestValues;
			this.applyTransformsToTarget();
			let x = buildProjectionTransform(this.projectionDeltaWithTransform, this.treeScale, b);
			v && (x = v(b, x)), e.transform = x;
			let { x: S, y: C } = this.projectionDelta;
			for (let _ in e.transformOrigin = `${S.origin * 100}% ${C.origin * 100}% 0`, y.animationValues ? e.opacity = y === this ? b.opacity ?? this.latestValues.opacity ?? 1 : this.preserveOpacity ? this.latestValues.opacity : b.opacityExit : e.opacity = y === this ? b.opacity === void 0 ? "" : b.opacity : b.opacityExit === void 0 ? 0 : b.opacityExit, scaleCorrectors) {
				if (b[_] === void 0) continue;
				let { correct: v, applyTo: S, isCSSVariable: C } = scaleCorrectors[_], w = x === "none" ? b[_] : v(b[_], y);
				if (S) {
					let _ = S.length;
					for (let v = 0; v < _; v++) e[S[v]] = w;
				} else C ? this.options.visualElement.renderState.vars[_] = w : e[_] = w;
			}
			this.options.layoutId && (e.pointerEvents = y === this ? resolveMotionValue(_?.pointerEvents) || "" : "none");
		}
		clearSnapshot() {
			this.resumeFrom = this.snapshot = void 0;
		}
		resetTree() {
			this.root.nodes.forEach((e) => e.currentAnimation?.stop()), this.root.nodes.forEach(clearMeasurements), this.root.sharedNodes.clear();
		}
	};
}
function updateLayout(e) {
	e.updateLayout();
}
function notifyLayoutUpdate(e) {
	let _ = e.resumeFrom?.snapshot || e.snapshot;
	if (e.isLead() && e.layout && _ && e.hasListeners("didUpdate")) {
		let { layoutBox: v, measuredBox: y } = e.layout, { animationType: b } = e.options, x = _.source !== e.layout.source;
		b === "size" ? eachAxis((e) => {
			let y = x ? _.measuredBox[e] : _.layoutBox[e], b = calcLength(y);
			y.min = v[e].min, y.max = y.min + b;
		}) : shouldAnimatePositionOnly(b, _.layoutBox, v) && eachAxis((y) => {
			let b = x ? _.measuredBox[y] : _.layoutBox[y], S = calcLength(v[y]);
			b.max = b.min + S, e.relativeTarget && !e.currentAnimation && (e.isProjectionDirty = !0, e.relativeTarget[y].max = e.relativeTarget[y].min + S);
		});
		let S = createDelta();
		calcBoxDelta(S, v, _.layoutBox);
		let C = createDelta();
		x ? calcBoxDelta(C, e.applyTransform(y, !0), _.measuredBox) : calcBoxDelta(C, v, _.layoutBox);
		let w = !isDeltaZero(S), T = !1;
		if (!e.resumeFrom) {
			let y = e.getClosestProjectingParent();
			if (y && !y.resumeFrom) {
				let { snapshot: b, layout: x } = y;
				if (b && x) {
					let S = createBox();
					calcRelativePosition(S, _.layoutBox, b.layoutBox);
					let C = createBox();
					calcRelativePosition(C, v, x.layoutBox), boxEqualsRounded(S, C) || (T = !0), y.options.layoutRoot && (e.relativeTarget = C, e.relativeTargetOrigin = S, e.relativeParent = y);
				}
			}
		}
		e.notifyListeners("didUpdate", {
			layout: v,
			snapshot: _,
			delta: C,
			layoutDelta: S,
			hasLayoutChanged: w,
			hasRelativeLayoutChanged: T
		});
	} else if (e.isLead()) {
		let { onExitComplete: _ } = e.options;
		_ && _();
	}
	e.options.transition = void 0;
}
function propagateDirtyNodes(e) {
	statsBuffer.value && metrics.nodes++, e.parent && (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty), e.isSharedProjectionDirty ||= !!(e.isProjectionDirty || e.parent.isProjectionDirty || e.parent.isSharedProjectionDirty), e.isTransformDirty ||= e.parent.isTransformDirty);
}
function cleanDirtyNodes(e) {
	e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function clearSnapshot(e) {
	e.clearSnapshot();
}
function clearMeasurements(e) {
	e.clearMeasurements();
}
function clearIsLayoutDirty(e) {
	e.isLayoutDirty = !1;
}
function resetTransformStyle(e) {
	let { visualElement: _ } = e.options;
	_ && _.getProps().onBeforeLayoutMeasure && _.notify("BeforeLayoutMeasure"), e.resetTransform();
}
function finishAnimation(e) {
	e.finishAnimation(), e.targetDelta = e.relativeTarget = e.target = void 0, e.isProjectionDirty = !0;
}
function resolveTargetDelta(e) {
	e.resolveTargetDelta();
}
function calcProjection(e) {
	e.calcProjection();
}
function resetSkewAndRotation(e) {
	e.resetSkewAndRotation();
}
function removeLeadSnapshots(e) {
	e.removeLeadSnapshot();
}
function mixAxisDelta(e, _, v) {
	e.translate = mixNumber(_.translate, 0, v), e.scale = mixNumber(_.scale, 1, v), e.origin = _.origin, e.originPoint = _.originPoint;
}
function mixAxis(e, _, v, y) {
	e.min = mixNumber(_.min, v.min, y), e.max = mixNumber(_.max, v.max, y);
}
function mixBox(e, _, v, y) {
	mixAxis(e.x, _.x, v.x, y), mixAxis(e.y, _.y, v.y, y);
}
function hasOpacityCrossfade(e) {
	return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var defaultLayoutTransition = {
	duration: .45,
	ease: [
		.4,
		0,
		.1,
		1
	]
}, userAgentContains = (e) => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(e), roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(e) {
	e.min = roundPoint(e.min), e.max = roundPoint(e.max);
}
function roundBox(e) {
	roundAxis(e.x), roundAxis(e.y);
}
function shouldAnimatePositionOnly(e, _, v) {
	return e === "position" || e === "preserve-aspect" && !isNear(aspectRatio(_), aspectRatio(v), .2);
}
function checkNodeWasScrollRoot(e) {
	return e !== e.root && e.scroll?.wasRoot;
}
var DocumentProjectionNode = createProjectionNode({
	attachResizeListener: (e, _) => addDomEvent(e, "resize", _),
	measureScroll: () => ({
		x: document.documentElement.scrollLeft || document.body.scrollLeft,
		y: document.documentElement.scrollTop || document.body.scrollTop
	}),
	checkIsScrollRoot: () => !0
}), rootProjectionNode = { current: void 0 }, HTMLProjectionNode = createProjectionNode({
	measureScroll: (e) => ({
		x: e.scrollLeft,
		y: e.scrollTop
	}),
	defaultParent: () => {
		if (!rootProjectionNode.current) {
			let e = new DocumentProjectionNode({});
			e.mount(window), e.setOptions({ layoutScroll: !0 }), rootProjectionNode.current = e;
		}
		return rootProjectionNode.current;
	},
	resetTransform: (e, _) => {
		e.style.transform = _ === void 0 ? "none" : _;
	},
	checkIsScrollRoot: (e) => window.getComputedStyle(e).position === "fixed"
}), drag = {
	pan: { Feature: PanGesture },
	drag: {
		Feature: DragGesture,
		ProjectionNode: HTMLProjectionNode,
		MeasureLayout
	}
};
function handleHoverEvent(e, _, v) {
	let { props: y } = e;
	e.animationState && y.whileHover && e.animationState.setActive("whileHover", v === "Start");
	let b = y["onHover" + v];
	b && frame.postRender(() => b(_, extractEventInfo(_)));
}
var HoverGesture = class extends Feature {
	mount() {
		let { current: e } = this.node;
		e && (this.unmount = hover(e, (e, _) => (handleHoverEvent(this.node, _, "Start"), (e) => handleHoverEvent(this.node, e, "End"))));
	}
	unmount() {}
}, FocusGesture = class extends Feature {
	constructor() {
		super(...arguments), this.isActive = !1;
	}
	onFocus() {
		let e = !1;
		try {
			e = this.node.current.matches(":focus-visible");
		} catch {
			e = !0;
		}
		!e || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !0), this.isActive = !0);
	}
	onBlur() {
		!this.isActive || !this.node.animationState || (this.node.animationState.setActive("whileFocus", !1), this.isActive = !1);
	}
	mount() {
		this.unmount = pipe(addDomEvent(this.node.current, "focus", () => this.onFocus()), addDomEvent(this.node.current, "blur", () => this.onBlur()));
	}
	unmount() {}
};
function handlePressEvent(e, _, v) {
	let { props: y } = e;
	if (e.current instanceof HTMLButtonElement && e.current.disabled) return;
	e.animationState && y.whileTap && e.animationState.setActive("whileTap", v === "Start");
	let b = y["onTap" + (v === "End" ? "" : v)];
	b && frame.postRender(() => b(_, extractEventInfo(_)));
}
var PressGesture = class extends Feature {
	mount() {
		let { current: e } = this.node;
		e && (this.unmount = press(e, (e, _) => (handlePressEvent(this.node, _, "Start"), (e, { success: _ }) => handlePressEvent(this.node, e, _ ? "End" : "Cancel")), { useGlobalTarget: this.node.props.globalTapTarget }));
	}
	unmount() {}
}, observerCallbacks = /* @__PURE__ */ new WeakMap(), observers = /* @__PURE__ */ new WeakMap(), fireObserverCallback = (e) => {
	let _ = observerCallbacks.get(e.target);
	_ && _(e);
}, fireAllObserverCallbacks = (e) => {
	e.forEach(fireObserverCallback);
};
function initIntersectionObserver({ root: e, ..._ }) {
	let v = e || document;
	observers.has(v) || observers.set(v, {});
	let y = observers.get(v), b = JSON.stringify(_);
	return y[b] || (y[b] = new IntersectionObserver(fireAllObserverCallbacks, {
		root: e,
		..._
	})), y[b];
}
function observeIntersection(e, _, v) {
	let y = initIntersectionObserver(_);
	return observerCallbacks.set(e, v), y.observe(e), () => {
		observerCallbacks.delete(e), y.unobserve(e);
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
		let { viewport: e = {} } = this.node.getProps(), { root: _, margin: v, amount: y = "some", once: b } = e, x = {
			root: _ ? _.current : void 0,
			rootMargin: v,
			threshold: typeof y == "number" ? y : thresholdNames[y]
		};
		return observeIntersection(this.node.current, x, (e) => {
			let { isIntersecting: _ } = e;
			if (this.isInView === _ || (this.isInView = _, b && !_ && this.hasEnteredView)) return;
			_ && (this.hasEnteredView = !0), this.node.animationState && this.node.animationState.setActive("whileInView", _);
			let { onViewportEnter: v, onViewportLeave: y } = this.node.getProps(), x = _ ? v : y;
			x && x(e);
		});
	}
	mount() {
		this.startObserver();
	}
	update() {
		if (typeof IntersectionObserver > "u") return;
		let { props: e, prevProps: _ } = this.node;
		[
			"amount",
			"margin",
			"root"
		].some(hasViewportOptionChanged(e, _)) && this.startObserver();
	}
	unmount() {}
};
function hasViewportOptionChanged({ viewport: e = {} }, { viewport: _ = {} } = {}) {
	return (v) => e[v] !== _[v];
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
}, createDomVisualElement), Collapse_default = (e) => {
	let { defaultExpand: _, title: v, children: y, onClear: b } = e, [x, S] = useState(_ ?? !1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between cursor-pointer",
			onClick: () => {
				S((e) => !e);
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative size-4 children:absolute children:inset-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 1 },
						animate: { opacity: x ? 0 : 1 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePlus, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: x ? 1 : 0 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareMinus, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrushCleaning, {
				className: "size-4",
				onClick: (e) => {
					e.stopPropagation(), b?.(e);
				}
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				height: 0,
				opacity: 0
			},
			animate: {
				height: x ? "auto" : 0,
				opacity: x ? 1 : 0
			},
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pt-4",
				children: y
			})
		})]
	});
};
const cn = (...e) => twMerge(clsx(e));
var Tags_default = (e) => {
	let { value: _, options: v, onChange: y, ...b } = e, x = v.filter((e) => !e.icon), S = v.filter((e) => e.icon), C = (e) => {
		_.includes(e) ? y?.(_.filter((_) => _ !== e)) : y?.([..._, e]);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapse_default, {
		...b,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: x.map((e) => {
				let { label: v, value: y } = e;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("inline-flex items-center h-6 px-3 cursor-pointer b-default rounded-full hover:border-primary transition-colors", { "border-primary bg-primary-bg": _.includes(y) }),
					onClick: () => {
						C(y);
					},
					children: v
				}, y);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2 mt-2",
			children: S.map((e) => {
				let { label: v, value: y, icon: b } = e;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("size-12 rounded-full overflow-hidden cursor-pointer b-default b-2 border-transparent hover:border-primary transition-colors", { "border-primary": _.includes(y) }),
					onClick: () => {
						C(y);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: b,
						alt: v,
						className: "size-full"
					})
				}, y);
			})
		})]
	});
}, CheckboxGroup_default = (e) => {
	let { options: _, value: v, onChange: y, ...b } = e, [x, S] = useState(!1), C = (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-4",
		children: e.map((e) => {
			let { label: _, value: b, icon: x, count: S } = e;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: v.includes(b),
					onChange: (e) => {
						e.target.checked ? y?.([...v, b]) : y?.(v.filter((e) => e !== b));
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: x,
							alt: _,
							className: "size-4"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: _ })]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: S })]
			}, b);
		})
	}), w = () => {
		S((e) => !e);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Collapse_default, {
		...b,
		children: [
			C(_.slice(0, 5)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: x && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
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
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: C(_.slice(5))
				})
			}) }),
			_.length > 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "inline-flex items-center mt-4 text-primary cursor-pointer",
				onClick: w,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "更多" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 transition", { "-scale-y-100": x }) })]
			})
		]
	});
}, Select_default = (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse_default, {
	...e,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-0.5 pb-0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
			className: "w-full",
			...e
		})
	})
}), ColorPicker_default = (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse_default, {
	...e,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorPicker, { ...e })
}), Slider_default = (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse_default, {
	...e,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, { ...e })
	})
}), Input_default = (e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Collapse_default, {
	...e,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-0.5 pb-0.5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { ...e })
	})
});
export { CheckboxGroup_default as FilterCheckboxGroup, Collapse_default as FilterCollapse, ColorPicker_default as FilterColorPicker, Input_default as FilterInput, Select_default as FilterSelect, Slider_default as FilterSlider, Tags_default as FilterTags };
