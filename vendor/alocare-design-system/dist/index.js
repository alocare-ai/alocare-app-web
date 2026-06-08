import { jsx as t, jsxs as r, Fragment as S2 } from "react/jsx-runtime";
import * as C from "react";
import q0, { createContext as e1, useState as _, useMemo as t1, useContext as a1, forwardRef as d2, createElement as Z2, useRef as l1, useCallback as s1 } from "react";
import "react-dom";
const G2 = {
  navy: "#001450",
  primary: "#1078E0",
  primaryDark: "#003CDC",
  white: "#FFFFFF"
}, Is = "/alocare-ai.svg", Ts = "/alocare-ai.png", K0 = 1434 / 405, Rs = {
  primary: {
    600: G2.primary,
    700: G2.primaryDark
  },
  brand: G2,
  medical: {
    teal: "#14B8A6",
    green: "#22C55E"
  },
  alert: {
    warning: "#F59E0B",
    danger: "#EF4444",
    info: "#0EA5E9"
  },
  neutral: {
    50: "#F8FAFC",
    100: "#F1F5F9",
    200: "#E2E8F0",
    300: "#CBD5E1",
    400: "#94A3B8",
    500: "#64748B",
    600: "#475569",
    700: "#334155",
    800: "#1E293B",
    900: "#0F172A"
  },
  white: "#FFFFFF"
}, js = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
  24: "6rem"
}, Ds = {
  fontFamily: {
    sans: '"Inter", ui-sans-serif, system-ui, sans-serif',
    heading: '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif'
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }],
    sm: ["0.875rem", { lineHeight: "1.25rem" }],
    base: ["1rem", { lineHeight: "1.5rem" }],
    lg: ["1.125rem", { lineHeight: "1.75rem" }],
    xl: ["1.25rem", { lineHeight: "1.75rem" }],
    "2xl": ["1.5rem", { lineHeight: "2rem" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
    "5xl": ["3rem", { lineHeight: "1.1" }]
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700"
  }
}, Os = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px"
}, $s = {
  card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
  floating: "0 10px 40px -12px rgb(15 23 42 / 0.18), 0 4px 16px -4px rgb(15 23 42 / 0.08)",
  modal: "0 25px 50px -12px rgb(15 23 42 / 0.25)",
  focus: "0 0 0 3px rgb(37 99 235 / 0.35)"
}, Bs = {
  base: 0,
  dropdown: 1e3,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500
}, Vs = {
  duration: {
    fast: 150,
    normal: 250,
    slow: 400
  },
  easing: {
    default: "cubic-bezier(0.4, 0, 0.2, 1)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  }
};
function b(e, a = "en") {
  return typeof e == "string" ? e : e[a];
}
function d(e, a) {
  return { en: e, id: a };
}
const J0 = e1(null);
function i1({
  children: e,
  defaultLocale: a = "en"
}) {
  const [l, s] = _(a), i = t1(
    () => ({
      locale: l,
      setLocale: s,
      t: (n) => b(n, l)
    }),
    [l]
  );
  return /* @__PURE__ */ t(J0.Provider, { value: i, children: e });
}
function Gs() {
  const e = a1(J0);
  return e || {
    locale: "en",
    setLocale: () => {
    },
    t: (a) => b(a, "en")
  };
}
function Fs({
  children: e,
  defaultLocale: a = "en"
}) {
  return /* @__PURE__ */ t(i1, { defaultLocale: a, children: e });
}
function Z0(e) {
  var a, l, s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (a = 0; a < i; a++) e[a] && (l = Z0(e[a])) && (s && (s += " "), s += l);
  } else for (l in e) e[l] && (s && (s += " "), s += l);
  return s;
}
function Y0() {
  for (var e, a, l = 0, s = "", i = arguments.length; l < i; l++) (e = arguments[l]) && (a = Z0(e)) && (s && (s += " "), s += a);
  return s;
}
const r1 = (e, a) => {
  const l = new Array(e.length + a.length);
  for (let s = 0; s < e.length; s++)
    l[s] = e[s];
  for (let s = 0; s < a.length; s++)
    l[e.length + s] = a[s];
  return l;
}, n1 = (e, a) => ({
  classGroupId: e,
  validator: a
}), Q0 = (e = /* @__PURE__ */ new Map(), a = null, l) => ({
  nextPart: e,
  validators: a,
  classGroupId: l
}), P2 = "-", z0 = [], o1 = "arbitrary..", c1 = (e) => {
  const a = m1(e), {
    conflictingClassGroups: l,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (c) => {
      if (c.startsWith("[") && c.endsWith("]"))
        return d1(c);
      const o = c.split(P2), m = o[0] === "" && o.length > 1 ? 1 : 0;
      return X0(o, m, a);
    },
    getConflictingClassGroupIds: (c, o) => {
      if (o) {
        const m = s[c], h = l[c];
        return m ? h ? r1(h, m) : m : h || z0;
      }
      return l[c] || z0;
    }
  };
}, X0 = (e, a, l) => {
  if (e.length - a === 0)
    return l.classGroupId;
  const i = e[a], n = l.nextPart.get(i);
  if (n) {
    const h = X0(e, a + 1, n);
    if (h) return h;
  }
  const c = l.validators;
  if (c === null)
    return;
  const o = a === 0 ? e.join(P2) : e.slice(a).join(P2), m = c.length;
  for (let h = 0; h < m; h++) {
    const f = c[h];
    if (f.validator(o))
      return f.classGroupId;
  }
}, d1 = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const a = e.slice(1, -1), l = a.indexOf(":"), s = a.slice(0, l);
  return s ? o1 + s : void 0;
})(), m1 = (e) => {
  const {
    theme: a,
    classGroups: l
  } = e;
  return h1(l, a);
}, h1 = (e, a) => {
  const l = Q0();
  for (const s in e) {
    const i = e[s];
    e0(i, l, s, a);
  }
  return l;
}, e0 = (e, a, l, s) => {
  const i = e.length;
  for (let n = 0; n < i; n++) {
    const c = e[n];
    u1(c, a, l, s);
  }
}, u1 = (e, a, l, s) => {
  if (typeof e == "string") {
    p1(e, a, l);
    return;
  }
  if (typeof e == "function") {
    f1(e, a, l, s);
    return;
  }
  b1(e, a, l, s);
}, p1 = (e, a, l) => {
  const s = e === "" ? a : ee(a, e);
  s.classGroupId = l;
}, f1 = (e, a, l, s) => {
  if (x1(e)) {
    e0(e(s), a, l, s);
    return;
  }
  a.validators === null && (a.validators = []), a.validators.push(n1(l, e));
}, b1 = (e, a, l, s) => {
  const i = Object.entries(e), n = i.length;
  for (let c = 0; c < n; c++) {
    const [o, m] = i[c];
    e0(m, ee(a, o), l, s);
  }
}, ee = (e, a) => {
  let l = e;
  const s = a.split(P2), i = s.length;
  for (let n = 0; n < i; n++) {
    const c = s[n];
    let o = l.nextPart.get(c);
    o || (o = Q0(), l.nextPart.set(c, o)), l = o;
  }
  return l;
}, x1 = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, g1 = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, l = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const i = (n, c) => {
    l[n] = c, a++, a > e && (a = 0, s = l, l = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(n) {
      let c = l[n];
      if (c !== void 0)
        return c;
      if ((c = s[n]) !== void 0)
        return i(n, c), c;
    },
    set(n, c) {
      n in l ? l[n] = c : i(n, c);
    }
  };
}, Y2 = "!", E0 = ":", v1 = [], C0 = (e, a, l, s, i) => ({
  modifiers: e,
  hasImportantModifier: a,
  baseClassName: l,
  maybePostfixModifierPosition: s,
  isExternal: i
}), y1 = (e) => {
  const {
    prefix: a,
    experimentalParseClassName: l
  } = e;
  let s = (i) => {
    const n = [];
    let c = 0, o = 0, m = 0, h;
    const f = i.length;
    for (let z = 0; z < f; z++) {
      const S = i[z];
      if (c === 0 && o === 0) {
        if (S === E0) {
          n.push(i.slice(m, z)), m = z + 1;
          continue;
        }
        if (S === "/") {
          h = z;
          continue;
        }
      }
      S === "[" ? c++ : S === "]" ? c-- : S === "(" ? o++ : S === ")" && o--;
    }
    const p = n.length === 0 ? i : i.slice(m);
    let y = p, w = !1;
    p.endsWith(Y2) ? (y = p.slice(0, -1), w = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Y2) && (y = p.slice(1), w = !0)
    );
    const M = h && h > m ? h - m : void 0;
    return C0(n, w, y, M);
  };
  if (a) {
    const i = a + E0, n = s;
    s = (c) => c.startsWith(i) ? n(c.slice(i.length)) : C0(v1, !1, c, void 0, !0);
  }
  if (l) {
    const i = s;
    s = (n) => l({
      className: n,
      parseClassName: i
    });
  }
  return s;
}, w1 = (e) => {
  const a = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((l, s) => {
    a.set(l, 1e6 + s);
  }), (l) => {
    const s = [];
    let i = [];
    for (let n = 0; n < l.length; n++) {
      const c = l[n], o = c[0] === "[", m = a.has(c);
      o || m ? (i.length > 0 && (i.sort(), s.push(...i), i = []), s.push(c)) : i.push(c);
    }
    return i.length > 0 && (i.sort(), s.push(...i)), s;
  };
}, k1 = (e) => ({
  cache: g1(e.cacheSize),
  parseClassName: y1(e),
  sortModifiers: w1(e),
  postfixLookupClassGroupIds: N1(e),
  ...c1(e)
}), N1 = (e) => {
  const a = /* @__PURE__ */ Object.create(null), l = e.postfixLookupClassGroups;
  if (l)
    for (let s = 0; s < l.length; s++)
      a[l[s]] = !0;
  return a;
}, M1 = /\s+/, z1 = (e, a) => {
  const {
    parseClassName: l,
    getClassGroupId: s,
    getConflictingClassGroupIds: i,
    sortModifiers: n,
    postfixLookupClassGroupIds: c
  } = a, o = [], m = e.trim().split(M1);
  let h = "";
  for (let f = m.length - 1; f >= 0; f -= 1) {
    const p = m[f], {
      isExternal: y,
      modifiers: w,
      hasImportantModifier: M,
      baseClassName: z,
      maybePostfixModifierPosition: S
    } = l(p);
    if (y) {
      h = p + (h.length > 0 ? " " + h : h);
      continue;
    }
    let A = !!S, L;
    if (A) {
      const H = z.substring(0, S);
      L = s(H);
      const g = L && c[L] ? s(z) : void 0;
      g && g !== L && (L = g, A = !1);
    } else
      L = s(z);
    if (!L) {
      if (!A) {
        h = p + (h.length > 0 ? " " + h : h);
        continue;
      }
      if (L = s(z), !L) {
        h = p + (h.length > 0 ? " " + h : h);
        continue;
      }
      A = !1;
    }
    const G = w.length === 0 ? "" : w.length === 1 ? w[0] : n(w).join(":"), U = M ? G + Y2 : G, q = U + L;
    if (o.indexOf(q) > -1)
      continue;
    o.push(q);
    const Q = i(L, A);
    for (let H = 0; H < Q.length; ++H) {
      const g = Q[H];
      o.push(U + g);
    }
    h = p + (h.length > 0 ? " " + h : h);
  }
  return h;
}, E1 = (...e) => {
  let a = 0, l, s, i = "";
  for (; a < e.length; )
    (l = e[a++]) && (s = te(l)) && (i && (i += " "), i += s);
  return i;
}, te = (e) => {
  if (typeof e == "string")
    return e;
  let a, l = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (a = te(e[s])) && (l && (l += " "), l += a);
  return l;
}, C1 = (e, ...a) => {
  let l, s, i, n;
  const c = (m) => {
    const h = a.reduce((f, p) => p(f), e());
    return l = k1(h), s = l.cache.get, i = l.cache.set, n = o, o(m);
  }, o = (m) => {
    const h = s(m);
    if (h)
      return h;
    const f = z1(m, l);
    return i(m, f), f;
  };
  return n = c, (...m) => n(E1(...m));
}, A1 = [], T = (e) => {
  const a = (l) => l[e] || A1;
  return a.isThemeGetter = !0, a;
}, ae = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, le = /^\((?:(\w[\w-]*):)?(.+)\)$/i, S1 = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, P1 = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, _1 = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, L1 = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, I1 = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, T1 = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, X = (e) => S1.test(e), E = (e) => !!e && !Number.isNaN(Number(e)), K = (e) => !!e && Number.isInteger(Number(e)), F2 = (e) => e.endsWith("%") && E(e.slice(0, -1)), J = (e) => P1.test(e), se = () => !0, R1 = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  _1.test(e) && !L1.test(e)
), t0 = () => !1, j1 = (e) => I1.test(e), D1 = (e) => T1.test(e), O1 = (e) => !x(e) && !v(e), $1 = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), B1 = (e) => a2(e, ne, t0), x = (e) => ae.test(e), r2 = (e) => a2(e, oe, R1), A0 = (e) => a2(e, K1, E), V1 = (e) => a2(e, de, se), G1 = (e) => a2(e, ce, t0), S0 = (e) => a2(e, ie, t0), F1 = (e) => a2(e, re, D1), M2 = (e) => a2(e, me, j1), v = (e) => le.test(e), p2 = (e) => o2(e, oe), H1 = (e) => o2(e, ce), P0 = (e) => o2(e, ie), W1 = (e) => o2(e, ne), U1 = (e) => o2(e, re), z2 = (e) => o2(e, me, !0), q1 = (e) => o2(e, de, !0), a2 = (e, a, l) => {
  const s = ae.exec(e);
  return s ? s[1] ? a(s[1]) : l(s[2]) : !1;
}, o2 = (e, a, l = !1) => {
  const s = le.exec(e);
  return s ? s[1] ? a(s[1]) : l : !1;
}, ie = (e) => e === "position" || e === "percentage", re = (e) => e === "image" || e === "url", ne = (e) => e === "length" || e === "size" || e === "bg-size", oe = (e) => e === "length", K1 = (e) => e === "number", ce = (e) => e === "family-name", de = (e) => e === "number" || e === "weight", me = (e) => e === "shadow", J1 = () => {
  const e = T("color"), a = T("font"), l = T("text"), s = T("font-weight"), i = T("tracking"), n = T("leading"), c = T("breakpoint"), o = T("container"), m = T("spacing"), h = T("radius"), f = T("shadow"), p = T("inset-shadow"), y = T("text-shadow"), w = T("drop-shadow"), M = T("blur"), z = T("perspective"), S = T("aspect"), A = T("ease"), L = T("animate"), G = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], U = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], q = () => [...U(), v, x], Q = () => ["auto", "hidden", "clip", "visible", "scroll"], H = () => ["auto", "contain", "none"], g = () => [v, x, m], F = () => [X, "full", "auto", ...g()], x0 = () => [K, "none", "subgrid", v, x], g0 = () => ["auto", {
    span: ["full", K, v, x]
  }, K, v, x], v2 = () => [K, "auto", v, x], v0 = () => ["auto", "min", "max", "fr", v, x], D2 = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], c2 = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...g()], i2 = () => [X, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], O2 = () => [X, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...g()], $2 = () => [X, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...g()], k = () => [e, v, x], y0 = () => [...U(), P0, S0, {
    position: [v, x]
  }], w0 = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], k0 = () => ["auto", "cover", "contain", W1, B1, {
    size: [v, x]
  }], B2 = () => [F2, p2, r2], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    h,
    v,
    x
  ], V = () => ["", E, p2, r2], y2 = () => ["solid", "dashed", "dotted", "double"], N0 = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], R = () => [E, F2, P0, S0], M0 = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    M,
    v,
    x
  ], w2 = () => ["none", E, v, x], k2 = () => ["none", E, v, x], V2 = () => [E, v, x], N2 = () => [X, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [J],
      breakpoint: [J],
      color: [se],
      container: [J],
      "drop-shadow": [J],
      ease: ["in", "out", "in-out"],
      font: [O1],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [J],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [J],
      shadow: [J],
      spacing: ["px", E],
      text: [J],
      "text-shadow": [J],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", X, x, v, S]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Container Type
       * @see https://tailwindcss.com/docs/responsive-design#container-queries
       */
      "container-type": [{
        "@container": ["", "normal", "size", v, x]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [$1],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [E, x, v, o]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": G()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": G()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: q()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Q()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Q()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Q()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: H()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": H()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": H()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Inset
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: F()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": F()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": F()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": F(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: F()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": F(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: F()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": F()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": F()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: F()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: F()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: F()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: F()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [K, "auto", v, x]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [X, "full", "auto", o, ...g()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [E, X, "auto", "initial", "none", x]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", E, v, x]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", E, v, x]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [K, "first", "last", "none", v, x]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": x0()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: g0()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": v2()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": v2()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": x0()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: g0()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": v2()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": v2()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": v0()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": v0()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: g()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": g()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": g()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...D2(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...c2(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...c2()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...D2()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...c2(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...c2(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": D2()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...c2(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...c2()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: g()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: g()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: g()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: g()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: g()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: g()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: g()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: g()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: g()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: g()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: g()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: W()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: W()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: W()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: W()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: W()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: W()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: W()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: W()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: W()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: W()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: W()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": g()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": g()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: i2()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...O2()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...O2()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...O2()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...$2()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...$2()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...$2()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [o, "screen", ...i2()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          o,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...i2()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          o,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [c]
          },
          ...i2()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...i2()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...i2()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...i2()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", l, p2, r2]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [s, q1, V1]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", F2, x]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [H1, G1, a]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [x]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [i, v, x]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [E, "none", v, A0]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          n,
          ...g()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", v, x]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", v, x]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: k()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: k()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...y2(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [E, "from-font", "auto", v, r2]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: k()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [E, "auto", v, x]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: g()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [K, v, x]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", v, x]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", v, x]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: y0()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: w0()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: k0()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, K, v, x],
          radial: ["", v, x],
          conic: [K, v, x]
        }, U1, F1]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: k()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: B2()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: B2()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: B2()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: k()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: k()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: k()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: B()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": B()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": B()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": B()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": B()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": B()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": B()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": B()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": B()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": B()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": B()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": B()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": B()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": B()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": B()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: V()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": V()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": V()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": V()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": V()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": V()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": V()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": V()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": V()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": V()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": V()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": V()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": V()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...y2(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...y2(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: k()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": k()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": k()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": k()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": k()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": k()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": k()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": k()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": k()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": k()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": k()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: k()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...y2(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [E, v, x]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", E, p2, r2]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: k()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          z2,
          M2
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: k()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", p, z2, M2]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": k()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: V()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: k()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [E, r2]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": k()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": V()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": k()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", y, z2, M2]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": k()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [E, v, x]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...N0(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": N0()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [E]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": R()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": R()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": k()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": k()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": R()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": R()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": k()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": k()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": R()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": R()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": k()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": k()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": R()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": R()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": k()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": k()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": R()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": R()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": k()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": k()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": R()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": R()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": k()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": k()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": R()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": R()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": k()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": k()
      }],
      "mask-image-radial": [{
        "mask-radial": [v, x]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": R()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": R()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": k()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": k()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": U()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [E]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": R()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": R()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": k()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": k()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: y0()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: w0()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: k0()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", v, x]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          v,
          x
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: M0()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [E, v, x]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [E, v, x]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          w,
          z2,
          M2
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": k()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", E, v, x]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [E, v, x]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", E, v, x]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [E, v, x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", E, v, x]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          v,
          x
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": M0()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [E, v, x]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [E, v, x]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", E, v, x]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [E, v, x]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", E, v, x]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [E, v, x]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [E, v, x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", E, v, x]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": g()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": g()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": g()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", v, x]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [E, "initial", v, x]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", A, v, x]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [E, v, x]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", L, v, x]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [z, v, x]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": q()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: w2()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": w2()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": w2()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": w2()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: k2()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": k2()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": k2()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": k2()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: V2()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": V2()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": V2()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [v, x, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: q()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: N2()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": N2()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": N2()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": N2()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      /**
       * Zoom
       * @see https://tailwindcss.com/docs/zoom
       */
      zoom: [{
        zoom: [K, v, x]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: k()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: k()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", v, x]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scrollbar Thumb Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-thumb-color": [{
        "scrollbar-thumb": k()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": k()
      }],
      /**
       * Scrollbar Gutter
       * @see https://tailwindcss.com/docs/scrollbar-gutter
       */
      "scrollbar-gutter": [{
        "scrollbar-gutter": ["auto", "stable", "both"]
      }],
      /**
       * Scrollbar Width
       * @see https://tailwindcss.com/docs/scrollbar-width
       */
      "scrollbar-w": [{
        scrollbar: ["auto", "thin", "none"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": g()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": g()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": g()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": g()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": g()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": g()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": g()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": g()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": g()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": g()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": g()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": g()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": g()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": g()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": g()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": g()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": g()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": g()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": g()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": g()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": g()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": g()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", v, x]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...k()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [E, p2, r2, A0]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...k()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      "container-named": ["container-type"],
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    postfixLookupClassGroups: ["container-type"],
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Z1 = /* @__PURE__ */ C1(J1);
function u(...e) {
  return Z1(Y0(e));
}
function j({
  label: e,
  secondaryLabel: a,
  lang: l = "en",
  className: s,
  secondaryClassName: i,
  as: n = "span"
}) {
  const c = b(e, l), o = a ? b(a, l === "en" ? "id" : "en") : null;
  return /* @__PURE__ */ r("span", { className: u("block", s), children: [
    /* @__PURE__ */ t(n, { className: "font-semibold text-slate-900", children: c }),
    o ? /* @__PURE__ */ t(
      "span",
      {
        className: u(
          "mt-0.5 block text-sm font-medium text-blue-600",
          i
        ),
        children: o
      }
    ) : null
  ] });
}
const _0 = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, L0 = Y0, he = (e, a) => (l) => {
  var s;
  if ((a == null ? void 0 : a.variants) == null) return L0(e, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
  const { variants: i, defaultVariants: n } = a, c = Object.keys(i).map((h) => {
    const f = l == null ? void 0 : l[h], p = n == null ? void 0 : n[h];
    if (f === null) return null;
    const y = _0(f) || _0(p);
    return i[h][y];
  }), o = l && Object.entries(l).reduce((h, f) => {
    let [p, y] = f;
    return y === void 0 || (h[p] = y), h;
  }, {}), m = a == null || (s = a.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((h, f) => {
    let { class: p, className: y, ...w } = f;
    return Object.entries(w).every((M) => {
      let [z, S] = M;
      return Array.isArray(S) ? S.includes({
        ...n,
        ...o
      }[z]) : {
        ...n,
        ...o
      }[z] === S;
    }) ? [
      ...h,
      p,
      y
    ] : h;
  }, []);
  return L0(e, c, m, l == null ? void 0 : l.class, l == null ? void 0 : l.className);
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Y1 = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Q1 = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (a, l, s) => s ? s.toUpperCase() : l.toLowerCase()
), I0 = (e) => {
  const a = Q1(e);
  return a.charAt(0).toUpperCase() + a.slice(1);
}, ue = (...e) => e.filter((a, l, s) => !!a && a.trim() !== "" && s.indexOf(a) === l).join(" ").trim(), X1 = (e) => {
  for (const a in e)
    if (a.startsWith("aria-") || a === "role" || a === "title")
      return !0;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var et = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tt = d2(
  ({
    color: e = "currentColor",
    size: a = 24,
    strokeWidth: l = 2,
    absoluteStrokeWidth: s,
    className: i = "",
    children: n,
    iconNode: c,
    ...o
  }, m) => Z2(
    "svg",
    {
      ref: m,
      ...et,
      width: a,
      height: a,
      stroke: e,
      strokeWidth: s ? Number(l) * 24 / Number(a) : l,
      className: ue("lucide", i),
      ...!n && !X1(o) && { "aria-hidden": "true" },
      ...o
    },
    [
      ...c.map(([h, f]) => Z2(h, f)),
      ...Array.isArray(n) ? n : [n]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const N = (e, a) => {
  const l = d2(
    ({ className: s, ...i }, n) => Z2(tt, {
      ref: n,
      iconNode: a,
      className: ue(
        `lucide-${Y1(I0(e))}`,
        `lucide-${e}`,
        s
      ),
      ...i
    })
  );
  return l.displayName = I0(e), l;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const at = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], pe = N("activity", at);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lt = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], fe = N("bell", lt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const st = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
], it = N("brain", st);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rt = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
], nt = N("building-2", rt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ot = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], be = N("calendar", ot);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ct = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
], dt = N("camera", ct);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mt = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], a0 = N("check", mt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ht = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], ut = N("circle-alert", ht);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pt = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ft = N("circle-check", pt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bt = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
], xe = N("clipboard-list", bt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xt = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], gt = N("clock", xt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vt = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193", key: "yfwify" }],
  [
    "path",
    { d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07", key: "jlfiyv" }
  ]
], yt = N("cloud-off", vt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wt = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], kt = N("eye-off", wt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nt = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Mt = N("eye", Nt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zt = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], m2 = N("file-text", zt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Et = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
], Ct = N("file-up", Et);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const At = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], ge = N("flask-conical", At);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const St = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
], Pt = N("heart", St);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _t = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], Lt = N("history", _t);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const It = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Tt = N("image", It);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], jt = N("layout-dashboard", Rt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Dt = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], ve = N("loader-circle", Dt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ot = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], ye = N("lock", Ot);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $t = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], we = N("log-out", $t);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bt = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], ke = N("message-circle", Bt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vt = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
], R2 = N("mic", Vt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gt = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
], Ne = N("pen-line", Gt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ft = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["path", { d: "m9 20 3-6 3 6", key: "se2kox" }],
  ["path", { d: "m6 8 6 2 6-2", key: "4o3us4" }],
  ["path", { d: "M12 10v4", key: "1kjpxc" }]
], Ht = N("person-standing", Ft);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wt = [
  [
    "path",
    {
      d: "M10.1 13.9a14 14 0 0 0 3.732 2.668 1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2 18 18 0 0 1-12.728-5.272",
      key: "1wngk7"
    }
  ],
  ["path", { d: "M22 2 2 22", key: "y4kqgn" }],
  [
    "path",
    {
      d: "M4.76 13.582A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 .244.473",
      key: "10hv5p"
    }
  ]
], Ut = N("phone-off", Wt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qt = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
], Me = N("pill", qt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kt = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ze = N("plus", Kt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Jt = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Zt = N("refresh-cw", Jt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yt = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], Qt = N("scan-line", Yt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xt = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], ea = N("search", Xt);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ta = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], aa = N("send", ta);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const la = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], sa = N("settings", la);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ia = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ra = N("shield-check", ia);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const na = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], l0 = N("shield", na);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
], Ee = N("sparkles", oa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ca = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], da = N("square", ca);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ma = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
], s0 = N("stethoscope", ma);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ha = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], ua = N("trending-up", ha);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pa = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Q2 = N("triangle-alert", pa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fa = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], i0 = N("upload", fa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ba = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], _2 = N("users", ba);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xa = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], ga = N("video-off", xa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const va = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], Ce = N("video", va);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ya = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], wa = N("wifi", ya);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ka = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Na = N("x", ka), Ma = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };
function r0({ size: e = "md", className: a, label: l = "Loading" }) {
  return /* @__PURE__ */ t(
    ve,
    {
      className: u("animate-spin text-blue-600", Ma[e], a),
      "aria-label": l,
      role: "status"
    }
  );
}
const za = he(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50",
        ghost: "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
        danger: "bg-red-500 text-white hover:bg-red-600",
        success: "bg-teal-500 text-white hover:bg-teal-600"
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-4 text-sm",
        lg: "h-11 px-6 text-sm",
        xl: "h-12 px-8 text-base"
      },
      fullWidth: {
        true: "w-full"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
), l2 = d2(
  ({
    className: e,
    variant: a,
    size: l,
    fullWidth: s,
    loading: i,
    leftIcon: n,
    rightIcon: c,
    children: o,
    disabled: m,
    ...h
  }, f) => /* @__PURE__ */ r(
    "button",
    {
      ref: f,
      className: u(za({ variant: a, size: l, fullWidth: s }), e),
      disabled: m || i,
      ...h,
      children: [
        i ? /* @__PURE__ */ t(r0, { size: "sm", className: "text-current" }) : n,
        o,
        !i && c
      ]
    }
  )
);
l2.displayName = "Button";
const Ea = he(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-slate-100 text-slate-700",
        normal: "bg-emerald-50 text-emerald-700",
        low: "bg-amber-50 text-amber-800",
        high: "bg-orange-50 text-orange-800",
        critical: "bg-red-50 text-red-700",
        info: "bg-sky-50 text-sky-700",
        ai: "bg-blue-50 text-blue-700"
      }
    },
    defaultVariants: { variant: "default" }
  }
);
function Y({ className: e, variant: a, ...l }) {
  return /* @__PURE__ */ t("span", { className: u(Ea({ variant: a }), e), ...l });
}
function D({
  className: e,
  children: a,
  ...l
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: u(
        "rounded-xl border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        e
      ),
      ...l,
      children: a
    }
  );
}
function h2({
  className: e,
  children: a,
  ...l
}) {
  return /* @__PURE__ */ t("div", { className: u("flex items-start gap-3 border-b border-slate-100 px-5 py-4", e), ...l, children: a });
}
function Hs({
  className: e,
  children: a,
  ...l
}) {
  return /* @__PURE__ */ t(
    "h3",
    {
      className: u("font-heading text-base font-semibold text-slate-900", e),
      ...l,
      children: a
    }
  );
}
function $({
  className: e,
  children: a,
  ...l
}) {
  return /* @__PURE__ */ t("div", { className: u("px-5 py-4", e), ...l, children: a });
}
function Ws({
  className: e,
  children: a,
  ...l
}) {
  return /* @__PURE__ */ t("div", { className: u("border-t border-slate-100 px-5 py-4", e), ...l, children: a });
}
const e2 = d2(
  ({ className: e, label: a, helperText: l, errorText: s, lang: i = "en", labelClassName: n, id: c, ...o }, m) => {
    const h = c ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), f = !!s;
    return /* @__PURE__ */ r("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t(
        "label",
        {
          htmlFor: h,
          className: u("text-sm font-medium text-slate-700", n),
          children: b(a, i)
        }
      ) : null,
      /* @__PURE__ */ t(
        "input",
        {
          ref: m,
          id: h,
          className: u(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            f ? "border-red-300 focus-visible:ring-red-500" : "border-slate-200",
            e
          ),
          "aria-invalid": f,
          "aria-describedby": l || s ? `${h}-desc` : void 0,
          ...o
        }
      ),
      (l || s) && /* @__PURE__ */ t(
        "p",
        {
          id: `${h}-desc`,
          className: u(
            "text-xs",
            f ? "text-red-600" : "text-slate-500"
          ),
          children: b(s ?? l ?? "", i)
        }
      )
    ] });
  }
);
e2.displayName = "Input";
const t2 = d2(
  ({ className: e, label: a, helperText: l, errorText: s, lang: i = "en", id: n, rows: c = 4, ...o }, m) => {
    const h = n ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), f = !!s;
    return /* @__PURE__ */ r("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t("label", { htmlFor: h, className: "text-sm font-medium text-slate-700", children: b(a, i) }) : null,
      /* @__PURE__ */ t(
        "textarea",
        {
          ref: m,
          id: h,
          rows: c,
          className: u(
            "w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            f ? "border-red-300" : "border-slate-200",
            e
          ),
          "aria-invalid": f,
          ...o
        }
      ),
      (l || s) && /* @__PURE__ */ t("p", { className: u("text-xs", f ? "text-red-600" : "text-slate-500"), children: b(s ?? l ?? "", i) })
    ] });
  }
);
t2.displayName = "Textarea";
function Ae(e, a = []) {
  let l = [];
  function s(n, c) {
    const o = C.createContext(c);
    o.displayName = n + "Context";
    const m = l.length;
    l = [...l, c];
    const h = (p) => {
      var A;
      const { scope: y, children: w, ...M } = p, z = ((A = y == null ? void 0 : y[e]) == null ? void 0 : A[m]) || o, S = C.useMemo(() => M, Object.values(M));
      return /* @__PURE__ */ t(z.Provider, { value: S, children: w });
    };
    h.displayName = n + "Provider";
    function f(p, y) {
      var z;
      const w = ((z = y == null ? void 0 : y[e]) == null ? void 0 : z[m]) || o, M = C.useContext(w);
      if (M) return M;
      if (c !== void 0) return c;
      throw new Error(`\`${p}\` must be used within \`${n}\``);
    }
    return [h, f];
  }
  const i = () => {
    const n = l.map((c) => C.createContext(c));
    return function(o) {
      const m = (o == null ? void 0 : o[e]) || n;
      return C.useMemo(
        () => ({ [`__scope${e}`]: { ...o, [e]: m } }),
        [o, m]
      );
    };
  };
  return i.scopeName = e, [s, Ca(i, ...a)];
}
function Ca(...e) {
  const a = e[0];
  if (e.length === 1) return a;
  const l = () => {
    const s = e.map((i) => ({
      useScope: i(),
      scopeName: i.scopeName
    }));
    return function(n) {
      const c = s.reduce((o, { useScope: m, scopeName: h }) => {
        const p = m(n)[`__scope${h}`];
        return { ...o, ...p };
      }, {});
      return C.useMemo(() => ({ [`__scope${a.scopeName}`]: c }), [c]);
    };
  };
  return l.scopeName = a.scopeName, l;
}
function T0(e, a) {
  if (typeof e == "function")
    return e(a);
  e != null && (e.current = a);
}
function Aa(...e) {
  return (a) => {
    let l = !1;
    const s = e.map((i) => {
      const n = T0(i, a);
      return !l && typeof n == "function" && (l = !0), n;
    });
    if (l)
      return () => {
        for (let i = 0; i < s.length; i++) {
          const n = s[i];
          typeof n == "function" ? n() : T0(e[i], null);
        }
      };
  };
}
var Sa = Symbol.for("react.lazy"), L2 = C[" use ".trim().toString()];
function Pa(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Se(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Sa && "_payload" in e && Pa(e._payload);
}
// @__NO_SIDE_EFFECTS__
function _a(e) {
  const a = /* @__PURE__ */ La(e), l = C.forwardRef((s, i) => {
    let { children: n, ...c } = s;
    Se(n) && typeof L2 == "function" && (n = L2(n._payload));
    const o = C.Children.toArray(n), m = o.find(Ta);
    if (m) {
      const h = m.props.children, f = o.map((p) => p === m ? C.Children.count(h) > 1 ? C.Children.only(null) : C.isValidElement(h) ? h.props.children : null : p);
      return /* @__PURE__ */ t(a, { ...c, ref: i, children: C.isValidElement(h) ? C.cloneElement(h, void 0, f) : null });
    }
    return /* @__PURE__ */ t(a, { ...c, ref: i, children: n });
  });
  return l.displayName = `${e}.Slot`, l;
}
// @__NO_SIDE_EFFECTS__
function La(e) {
  const a = C.forwardRef((l, s) => {
    let { children: i, ...n } = l;
    if (Se(i) && typeof L2 == "function" && (i = L2(i._payload)), C.isValidElement(i)) {
      const c = ja(i), o = Ra(n, i.props);
      return i.type !== C.Fragment && (o.ref = s ? Aa(s, c) : c), C.cloneElement(i, o);
    }
    return C.Children.count(i) > 1 ? C.Children.only(null) : null;
  });
  return a.displayName = `${e}.SlotClone`, a;
}
var Ia = Symbol("radix.slottable");
function Ta(e) {
  return C.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ia;
}
function Ra(e, a) {
  const l = { ...a };
  for (const s in a) {
    const i = e[s], n = a[s];
    /^on[A-Z]/.test(s) ? i && n ? l[s] = (...o) => {
      const m = n(...o);
      return i(...o), m;
    } : i && (l[s] = i) : s === "style" ? l[s] = { ...i, ...n } : s === "className" && (l[s] = [i, n].filter(Boolean).join(" "));
  }
  return { ...e, ...l };
}
function ja(e) {
  var s, i;
  let a = (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : s.get, l = a && "isReactWarning" in a && a.isReactWarning;
  return l ? e.ref : (a = (i = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : i.get, l = a && "isReactWarning" in a && a.isReactWarning, l ? e.props.ref : e.props.ref || e.ref);
}
var Da = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], b2 = Da.reduce((e, a) => {
  const l = /* @__PURE__ */ _a(`Primitive.${a}`), s = C.forwardRef((i, n) => {
    const { asChild: c, ...o } = i, m = c ? l : a;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(m, { ...o, ref: n });
  });
  return s.displayName = `Primitive.${a}`, { ...e, [a]: s };
}, {}), n0 = "Progress", o0 = 100, [Oa] = Ae(n0), [$a, Ba] = Oa(n0), Pe = C.forwardRef(
  (e, a) => {
    const {
      __scopeProgress: l,
      value: s = null,
      max: i,
      getValueLabel: n = Va,
      ...c
    } = e;
    (i || i === 0) && !R0(i) && console.error(Ga(`${i}`, "Progress"));
    const o = R0(i) ? i : o0;
    s !== null && !j0(s, o) && console.error(Fa(`${s}`, "Progress"));
    const m = j0(s, o) ? s : null, h = I2(m) ? n(m, o) : void 0;
    return /* @__PURE__ */ t($a, { scope: l, value: m, max: o, children: /* @__PURE__ */ t(
      b2.div,
      {
        "aria-valuemax": o,
        "aria-valuemin": 0,
        "aria-valuenow": I2(m) ? m : void 0,
        "aria-valuetext": h,
        role: "progressbar",
        "data-state": Ie(m, o),
        "data-value": m ?? void 0,
        "data-max": o,
        ...c,
        ref: a
      }
    ) });
  }
);
Pe.displayName = n0;
var _e = "ProgressIndicator", Le = C.forwardRef(
  (e, a) => {
    const { __scopeProgress: l, ...s } = e, i = Ba(_e, l);
    return /* @__PURE__ */ t(
      b2.div,
      {
        "data-state": Ie(i.value, i.max),
        "data-value": i.value ?? void 0,
        "data-max": i.max,
        ...s,
        ref: a
      }
    );
  }
);
Le.displayName = _e;
function Va(e, a) {
  return `${Math.round(e / a * 100)}%`;
}
function Ie(e, a) {
  return e == null ? "indeterminate" : e === a ? "complete" : "loading";
}
function I2(e) {
  return typeof e == "number";
}
function R0(e) {
  return I2(e) && !isNaN(e) && e > 0;
}
function j0(e, a) {
  return I2(e) && !isNaN(e) && e <= a && e >= 0;
}
function Ga(e, a) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${o0}\`.`;
}
function Fa(e, a) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${o0} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Ha = Pe, Wa = Le;
function Te({
  value: e,
  max: a = 100,
  className: l,
  label: s = "Progress",
  showLabel: i = !1
}) {
  const n = Math.min(100, Math.max(0, e / a * 100));
  return /* @__PURE__ */ r("div", { className: u("w-full", l), children: [
    /* @__PURE__ */ t(
      Ha,
      {
        className: "relative h-2 w-full overflow-hidden rounded-full bg-slate-100",
        value: n,
        "aria-label": s,
        children: /* @__PURE__ */ t(
          Wa,
          {
            className: "h-full rounded-full bg-blue-600 transition-all duration-300",
            style: { width: `${n}%` }
          }
        )
      }
    ),
    i ? /* @__PURE__ */ r("p", { className: "mt-1 text-right text-xs text-slate-500", children: [
      Math.round(n),
      "%"
    ] }) : null
  ] });
}
function Ua(e) {
  const a = C.useRef(e);
  return C.useEffect(() => {
    a.current = e;
  }), C.useMemo(() => (...l) => {
    var s;
    return (s = a.current) == null ? void 0 : s.call(a, ...l);
  }, []);
}
var X2 = globalThis != null && globalThis.document ? C.useLayoutEffect : () => {
}, E2 = { exports: {} }, H2 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D0;
function qa() {
  if (D0) return H2;
  D0 = 1;
  var e = q0;
  function a(p, y) {
    return p === y && (p !== 0 || 1 / p === 1 / y) || p !== p && y !== y;
  }
  var l = typeof Object.is == "function" ? Object.is : a, s = e.useState, i = e.useEffect, n = e.useLayoutEffect, c = e.useDebugValue;
  function o(p, y) {
    var w = y(), M = s({ inst: { value: w, getSnapshot: y } }), z = M[0].inst, S = M[1];
    return n(
      function() {
        z.value = w, z.getSnapshot = y, m(z) && S({ inst: z });
      },
      [p, w, y]
    ), i(
      function() {
        return m(z) && S({ inst: z }), p(function() {
          m(z) && S({ inst: z });
        });
      },
      [p]
    ), c(w), w;
  }
  function m(p) {
    var y = p.getSnapshot;
    p = p.value;
    try {
      var w = y();
      return !l(p, w);
    } catch {
      return !0;
    }
  }
  function h(p, y) {
    return y();
  }
  var f = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? h : o;
  return H2.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : f, H2;
}
var W2 = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var O0;
function Ka() {
  return O0 || (O0 = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(w, M) {
      return w === M && (w !== 0 || 1 / w === 1 / M) || w !== w && M !== M;
    }
    function a(w, M) {
      f || i.startTransition === void 0 || (f = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var z = M();
      if (!p) {
        var S = M();
        n(z, S) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
      }
      S = c({
        inst: { value: z, getSnapshot: M }
      });
      var A = S[0].inst, L = S[1];
      return m(
        function() {
          A.value = z, A.getSnapshot = M, l(A) && L({ inst: A });
        },
        [w, z, M]
      ), o(
        function() {
          return l(A) && L({ inst: A }), w(function() {
            l(A) && L({ inst: A });
          });
        },
        [w]
      ), h(z), z;
    }
    function l(w) {
      var M = w.getSnapshot;
      w = w.value;
      try {
        var z = M();
        return !n(w, z);
      } catch {
        return !0;
      }
    }
    function s(w, M) {
      return M();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var i = q0, n = typeof Object.is == "function" ? Object.is : e, c = i.useState, o = i.useEffect, m = i.useLayoutEffect, h = i.useDebugValue, f = !1, p = !1, y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? s : a;
    W2.useSyncExternalStore = i.useSyncExternalStore !== void 0 ? i.useSyncExternalStore : y, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), W2;
}
var $0;
function Ja() {
  return $0 || ($0 = 1, process.env.NODE_ENV === "production" ? E2.exports = qa() : E2.exports = Ka()), E2.exports;
}
var Za = Ja();
function Ya() {
  return Za.useSyncExternalStore(
    Qa,
    () => !0,
    () => !1
  );
}
function Qa() {
  return () => {
  };
}
var c0 = "Avatar", [Xa] = Ae(c0), [el, Re] = Xa(c0), je = C.forwardRef(
  (e, a) => {
    const { __scopeAvatar: l, ...s } = e, [i, n] = C.useState("idle");
    return /* @__PURE__ */ t(
      el,
      {
        scope: l,
        imageLoadingStatus: i,
        onImageLoadingStatusChange: n,
        children: /* @__PURE__ */ t(b2.span, { ...s, ref: a })
      }
    );
  }
);
je.displayName = c0;
var De = "AvatarImage", Oe = C.forwardRef(
  (e, a) => {
    const { __scopeAvatar: l, src: s, onLoadingStatusChange: i = () => {
    }, ...n } = e, c = Re(De, l), o = tl(s, n), m = Ua((h) => {
      i(h), c.onImageLoadingStatusChange(h);
    });
    return X2(() => {
      o !== "idle" && m(o);
    }, [o, m]), o === "loaded" ? /* @__PURE__ */ t(b2.img, { ...n, ref: a, src: s }) : null;
  }
);
Oe.displayName = De;
var $e = "AvatarFallback", Be = C.forwardRef(
  (e, a) => {
    const { __scopeAvatar: l, delayMs: s, ...i } = e, n = Re($e, l), [c, o] = C.useState(s === void 0);
    return C.useEffect(() => {
      if (s !== void 0) {
        const m = window.setTimeout(() => o(!0), s);
        return () => window.clearTimeout(m);
      }
    }, [s]), c && n.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ t(b2.span, { ...i, ref: a }) : null;
  }
);
Be.displayName = $e;
function B0(e, a) {
  return e ? a ? (e.src !== a && (e.src = a), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function tl(e, { referrerPolicy: a, crossOrigin: l }) {
  const s = Ya(), i = C.useRef(null), n = s ? (i.current || (i.current = new window.Image()), i.current) : null, [c, o] = C.useState(
    () => B0(n, e)
  );
  return X2(() => {
    o(B0(n, e));
  }, [n, e]), X2(() => {
    const m = (p) => () => {
      o(p);
    };
    if (!n) return;
    const h = m("loaded"), f = m("error");
    return n.addEventListener("load", h), n.addEventListener("error", f), a && (n.referrerPolicy = a), typeof l == "string" && (n.crossOrigin = l), () => {
      n.removeEventListener("load", h), n.removeEventListener("error", f);
    };
  }, [n, l, a]), c;
}
var al = je, ll = Oe, sl = Be;
const il = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base"
};
function Ve({ src: e, alt: a, fallback: l, size: s = "md", className: i }) {
  return /* @__PURE__ */ r(
    al,
    {
      className: u(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100",
        il[s],
        i
      ),
      children: [
        /* @__PURE__ */ t(ll, { src: e, alt: a, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ t(sl, { className: "font-medium text-slate-600", delayMs: 0, children: l ?? "?" })
      ]
    }
  );
}
const rl = {
  en: "EN",
  id: "ID"
};
function u2({
  locale: e,
  onChange: a,
  variant: l = "default",
  className: s
}) {
  const i = l === "marketing";
  return /* @__PURE__ */ t(
    "div",
    {
      className: u(
        "inline-flex items-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700",
        i ? "p-1" : "p-0.5 shadow-sm",
        s
      ),
      role: "group",
      "aria-label": "Language",
      children: ["en", "id"].map((n) => {
        const c = e === n;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => a(n),
            "aria-pressed": c,
            className: u(
              "rounded-full px-3 py-1.5 transition-colors",
              c ? i ? "bg-slate-950 text-white" : "bg-slate-900 text-white" : i ? "text-slate-700 hover:bg-slate-100" : "text-slate-600 hover:text-slate-900"
            ),
            children: rl[n]
          },
          n
        );
      })
    }
  );
}
function nl({
  logo: e,
  title: a = "alocare.ai",
  subtitle: l = "AI-Powered Health Intelligence",
  navItems: s = [],
  locale: i = "en",
  onLocaleChange: n,
  actions: c,
  className: o
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: u(
        "sticky top-0 z-[1100] border-b border-slate-200/70 bg-white/80 backdrop-blur",
        o
      ),
      children: /* @__PURE__ */ r("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        /* @__PURE__ */ r("div", { className: "flex min-w-0 items-center gap-3", children: [
          e ?? /* @__PURE__ */ t("span", { className: "leading-tight", children: /* @__PURE__ */ r("span", { className: "block text-xl font-semibold tracking-tight text-[#001450]", children: [
            "alocare",
            /* @__PURE__ */ t("span", { className: "text-[#1078E0]", children: " AI" })
          ] }) }),
          l || !e ? /* @__PURE__ */ t("span", { className: "hidden text-xs font-medium text-slate-600 sm:block", children: l || a }) : null
        ] }),
        s.length > 0 ? /* @__PURE__ */ t("nav", { className: "hidden items-center gap-6 md:flex", "aria-label": "Main", children: s.map((m) => /* @__PURE__ */ t(
          "a",
          {
            href: m.href,
            className: u(
              "text-sm transition-colors",
              m.active ? "font-semibold text-slate-950" : "text-slate-700 hover:text-slate-950"
            ),
            children: m.label
          },
          m.href
        )) }) : null,
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          n ? /* @__PURE__ */ t(u2, { locale: i, onChange: n }) : null,
          c
        ] })
      ] })
    }
  );
}
const Z = {
  title: d("Upload report", "Unggah Laporan"),
  subtitle: d(
    "Upload one or more PDFs or images for a combined analysis.",
    "Unggah satu atau beberapa PDF/gambar untuk analisis gabungan."
  ),
  drag: d("Drag & drop your files here", "Seret & lepas file di sini"),
  formats: d(
    "PDF, JPG, or PNG — upload one or more files",
    "PDF, JPG, atau PNG — unggah satu atau beberapa file"
  ),
  choose: d("Choose files", "Pilih file"),
  pickerHint: d(
    "You can select multiple files at once",
    "Bisa memilih beberapa file sekaligus"
  ),
  success: d("Upload complete", "Unggah selesai"),
  error: d("Upload failed. Try again.", "Unggah gagal. Coba lagi.")
};
function Ge({
  lang: e = "en",
  state: a = "empty",
  accept: l = ".pdf,.jpg,.jpeg,.png",
  multiple: s = !1,
  onFilesSelected: i,
  className: n,
  hideHeader: c = !1
}) {
  const [o, m] = _(!1), h = l1(null), f = s1(
    (p) => {
      p != null && p.length && (i == null || i(p));
    },
    [i]
  );
  return /* @__PURE__ */ r("div", { className: u("max-w-md", n), children: [
    c ? null : /* @__PURE__ */ r(S2, { children: [
      /* @__PURE__ */ t("h2", { className: "mb-1 font-heading text-2xl font-bold text-slate-900", children: b(Z.title, e) }),
      /* @__PURE__ */ t("p", { className: "mb-4 text-sm text-slate-600", children: b(Z.subtitle, e) })
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": b(Z.drag, e),
        onKeyDown: (p) => {
          var y;
          (p.key === "Enter" || p.key === " ") && (p.preventDefault(), (y = h.current) == null || y.click());
        },
        onDragOver: (p) => {
          p.preventDefault(), m(!0);
        },
        onDragLeave: () => m(!1),
        onDrop: (p) => {
          p.preventDefault(), m(!1), f(p.dataTransfer.files);
        },
        className: u(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-12 text-center transition-colors",
          a === "error" ? "border-red-300 bg-red-50/50" : "border-blue-300 bg-blue-50/40",
          o && "border-blue-500 bg-blue-50"
        ),
        children: [
          /* @__PURE__ */ t("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm", children: a === "uploading" ? /* @__PURE__ */ t(r0, { size: "lg" }) : /* @__PURE__ */ t(Ct, { className: "h-8 w-8 text-blue-600", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: b(Z.drag, e) }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs text-slate-500", children: b(Z.formats, e) }),
          a === "success" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-emerald-600", children: b(Z.success, e) }) : a === "error" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-red-600", children: b(Z.error, e) }) : /* @__PURE__ */ r(S2, { children: [
            /* @__PURE__ */ t(
              "input",
              {
                ref: h,
                type: "file",
                className: "sr-only",
                accept: l,
                multiple: s,
                "aria-hidden": !0,
                tabIndex: -1,
                onChange: (p) => f(p.target.files)
              }
            ),
            /* @__PURE__ */ t(
              l2,
              {
                type: "button",
                className: "mt-5 cursor-pointer",
                leftIcon: /* @__PURE__ */ t(i0, { className: "h-4 w-4", "aria-hidden": !0 }),
                onClick: () => {
                  var p;
                  return (p = h.current) == null ? void 0 : p.click();
                },
                children: b(Z.choose, e)
              }
            ),
            s ? /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-500", children: b(Z.pickerHint, e) }) : null
          ] })
        ]
      }
    )
  ] });
}
function Fe({
  fileName: e,
  fileSize: a = "2.4 MB",
  lang: l = "en",
  uploaded: s = !0,
  className: i
}) {
  return /* @__PURE__ */ t(D, { className: u("", i), children: /* @__PURE__ */ r($, { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ t("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50", children: /* @__PURE__ */ t(m2, { className: "h-5 w-5 text-red-600", "aria-hidden": !0 }) }),
    /* @__PURE__ */ r("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold text-slate-900", children: e }),
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: a })
    ] }),
    s ? /* @__PURE__ */ t(
      a0,
      {
        className: "h-5 w-5 shrink-0 text-emerald-600",
        "aria-label": b(d("Uploaded", "Berhasil diunggah"), l)
      }
    ) : null
  ] }) });
}
const ol = {
  pending: d("Ready to scan", "Siap dipindai"),
  processing: d("Scanning document…", "Memindai dokumen…"),
  complete: d("Uploaded", "Berhasil diunggah"),
  error: d("Scan failed", "Pemindaian gagal")
};
function cl({
  lang: e = "en",
  status: a = "complete",
  progress: l = 100,
  className: s
}) {
  const i = a === "processing" ? ve : a === "complete" ? ft : Qt;
  return /* @__PURE__ */ t(
    D,
    {
      className: u(
        "border-emerald-200 bg-emerald-50/60",
        a === "error" && "border-red-200 bg-red-50/60",
        s
      ),
      children: /* @__PURE__ */ r($, { className: "flex items-center gap-3 py-3", children: [
        /* @__PURE__ */ t(
          i,
          {
            className: u(
              "h-5 w-5 shrink-0",
              a === "complete" && "text-emerald-600",
              a === "processing" && "animate-spin text-blue-600",
              a === "error" && "text-red-600",
              a === "pending" && "text-slate-500"
            ),
            "aria-hidden": !0
          }
        ),
        /* @__PURE__ */ r("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: b(ol[a], e) }),
          a === "processing" ? /* @__PURE__ */ t(Te, { value: l, className: "mt-2", showLabel: !0 }) : null
        ] })
      ] })
    }
  );
}
const dl = {
  idle: d("AI Ready", "AI Siap"),
  processing: d("AI Processing", "AI Memproses"),
  complete: d("AI Complete", "AI Selesai"),
  review: d("Needs Review", "Perlu Ditinjau")
};
function Us({
  status: e = "processing",
  lang: a = "en",
  className: l
}) {
  return /* @__PURE__ */ r(
    Y,
    {
      variant: "ai",
      className: u("gap-1.5", l),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ t(Ee, { className: "h-3 w-3", "aria-hidden": !0 }),
        b(dl[e], a)
      ]
    }
  );
}
const U2 = d("Confidence Score", "Skor Kepercayaan"), ml = d(
  "High confidence in extracted insights",
  "Kepercayaan tinggi pada insight yang diekstrak"
);
function d0({
  score: e,
  lang: a = "en",
  description: l,
  dualLanguageTitle: s = !1,
  className: i
}) {
  const n = Math.min(100, Math.max(0, e)), c = 2 * Math.PI * 36, o = c - n / 100 * c;
  return /* @__PURE__ */ r(D, { className: u("", i), children: [
    /* @__PURE__ */ r(h2, { className: "border-0 pb-0", children: [
      /* @__PURE__ */ t("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50", children: /* @__PURE__ */ t(ra, { className: "h-5 w-5 text-blue-600", "aria-hidden": !0 }) }),
      /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
        j,
        {
          label: U2,
          secondaryLabel: s ? a === "en" ? U2.id : U2.en : void 0,
          lang: a,
          as: "h3"
        }
      ) })
    ] }),
    /* @__PURE__ */ r($, { className: "flex items-center justify-between gap-4 pt-2", children: [
      /* @__PURE__ */ t("p", { className: "max-w-[12rem] text-sm text-slate-600", children: l ?? b(ml, a) }),
      /* @__PURE__ */ r(
        "div",
        {
          className: "relative h-20 w-20 shrink-0",
          role: "img",
          "aria-label": `${n}% confidence`,
          children: [
            /* @__PURE__ */ r("svg", { className: "h-20 w-20 -rotate-90", viewBox: "0 0 80 80", children: [
              /* @__PURE__ */ t(
                "circle",
                {
                  cx: "40",
                  cy: "40",
                  r: "36",
                  fill: "none",
                  stroke: "#e2e8f0",
                  strokeWidth: "6"
                }
              ),
              /* @__PURE__ */ t(
                "circle",
                {
                  cx: "40",
                  cy: "40",
                  r: "36",
                  fill: "none",
                  stroke: "#1078E0",
                  strokeWidth: "6",
                  strokeLinecap: "round",
                  strokeDasharray: c,
                  strokeDashoffset: o
                }
              )
            ] }),
            /* @__PURE__ */ r("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-600", children: [
              n,
              "%"
            ] })
          ]
        }
      )
    ] })
  ] });
}
const q2 = d("Key Findings", "Temuan Utama"), hl = {
  normal: { en: "Normal", id: "Normal" },
  low: { en: "Low", id: "Rendah" },
  high: { en: "High", id: "Tinggi" },
  critical: { en: "Critical", id: "Kritis" }
}, ul = {
  normal: "normal",
  low: "low",
  high: "high",
  critical: "critical"
};
function m0({
  findings: e,
  lang: a = "en",
  dualLanguageTitle: l = !1,
  className: s
}) {
  return /* @__PURE__ */ r(D, { className: u("", s), children: [
    /* @__PURE__ */ t(h2, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      j,
      {
        label: q2,
        secondaryLabel: l ? a === "en" ? q2.id : q2.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t($, { className: "pt-0", children: /* @__PURE__ */ t("ul", { className: "divide-y divide-slate-100", role: "list", children: e.map((i) => /* @__PURE__ */ r(
      "li",
      {
        className: "flex items-center justify-between gap-4 py-3 first:pt-0",
        children: [
          /* @__PURE__ */ r("div", { className: "min-w-0", children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-medium text-slate-900", children: i.label }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: i.value })
          ] }),
          /* @__PURE__ */ t(Y, { variant: ul[i.status], children: (i.statusLabel ?? hl[i.status])[a] })
        ]
      },
      i.label
    )) }) })
  ] });
}
const K2 = d("Clinical Summary", "Ringkasan Klinis");
function x2({
  summary: e,
  lang: a = "en",
  loading: l = !1,
  riskLevel: s = "normal",
  dualLanguageTitle: i = !1,
  className: n
}) {
  const c = {
    normal: "border-slate-200",
    elevated: "border-amber-200",
    high: "border-red-200"
  }[s];
  return /* @__PURE__ */ r(D, { className: u(c, n), children: [
    /* @__PURE__ */ t(h2, { className: "border-0 pb-2", children: /* @__PURE__ */ r("div", { className: "flex w-full items-start justify-between gap-3", children: [
      /* @__PURE__ */ t(
        j,
        {
          label: K2,
          secondaryLabel: i ? a === "en" ? K2.id : K2.en : void 0,
          lang: a,
          as: "h3"
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50",
          "aria-hidden": !0,
          children: /* @__PURE__ */ t(pe, { className: "h-5 w-5 text-violet-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ t($, { className: "pt-0", children: l ? /* @__PURE__ */ r("div", { className: "flex items-center gap-2 py-4", children: [
      /* @__PURE__ */ t(r0, {}),
      /* @__PURE__ */ t("span", { className: "text-sm text-slate-500", children: a === "id" ? "Menghasilkan ringkasan…" : "Generating summary…" })
    ] }) : /* @__PURE__ */ t("p", { className: "text-sm leading-relaxed text-slate-700", children: b(e, a) }) })
  ] });
}
const pl = {
  heart: Pt,
  exercise: Ht,
  calendar: be,
  default: xe
}, J2 = d("Suggested Next Actions", "Rekomendasi Tindak Lanjut");
function He({
  items: e,
  lang: a = "en",
  dualLanguageTitle: l = !1,
  className: s
}) {
  return /* @__PURE__ */ r(D, { className: u("", s), children: [
    /* @__PURE__ */ t(h2, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      j,
      {
        label: J2,
        secondaryLabel: l ? a === "en" ? J2.id : J2.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t($, { className: "space-y-4 pt-0", children: e.map((i) => {
      const n = pl[i.icon ?? "default"];
      return /* @__PURE__ */ r("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50", children: /* @__PURE__ */ t(n, { className: "h-4 w-4 text-emerald-600", "aria-hidden": !0 }) }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: b(i.title, a) }),
          i.description ? /* @__PURE__ */ t("p", { className: "mt-0.5 text-xs text-slate-600", children: b(i.description, a) }) : null
        ] })
      ] }, i.id);
    }) })
  ] });
}
const fl = {
  low: d("Low Risk", "Risiko Rendah"),
  medium: d("Medium Risk", "Risiko Sedang"),
  high: d("High Risk", "Risiko Tinggi")
}, bl = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500"
};
function xl({
  level: e,
  percentage: a,
  lang: l = "en",
  className: s
}) {
  return /* @__PURE__ */ r("div", { className: u("flex items-center gap-2", s), role: "status", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: u("h-2.5 w-2.5 rounded-full", bl[e]),
        "aria-hidden": !0
      }
    ),
    /* @__PURE__ */ r("span", { className: "text-sm font-medium text-slate-700", children: [
      b(fl[e], l),
      a !== void 0 ? ` (${a}%)` : ""
    ] })
  ] });
}
const gl = d("Review & Validate", "Tinjau & Validasi"), V0 = d("Assessment", "Penilaian"), vl = [
  { value: "agree", label: d("Agree with AI findings", "Setuju dengan temuan AI") },
  { value: "partial", label: d("Partially agree", "Sebagian setuju") },
  { value: "disagree", label: d("Disagree", "Tidak setuju") }
], yl = d("Comments", "Komentar"), wl = d(
  "Add clinical notes or corrections…",
  "Tambahkan catatan klinis atau koreksi…"
), kl = d("Save & Continue", "Simpan & Lanjutkan");
function qs({
  lang: e = "en",
  onSubmit: a,
  className: l
}) {
  const [s, i] = _("agree"), [n, c] = _(""), [o, m] = _(!1);
  return /* @__PURE__ */ r("div", { className: u("max-w-sm space-y-4", l), children: [
    /* @__PURE__ */ t(j, { label: gl, lang: e, as: "h2" }),
    /* @__PURE__ */ r(D, { children: [
      /* @__PURE__ */ t(h2, { className: "border-0 pb-2", children: /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: b(V0, e) }) }),
      /* @__PURE__ */ r($, { className: "space-y-4 pt-0", children: [
        /* @__PURE__ */ r("fieldset", { className: "space-y-2", children: [
          /* @__PURE__ */ t("legend", { className: "sr-only", children: b(V0, e) }),
          vl.map((h) => /* @__PURE__ */ r(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700",
              children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "radio",
                    name: "assessment",
                    value: h.value,
                    checked: s === h.value,
                    onChange: () => i(h.value),
                    className: "h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-600"
                  }
                ),
                b(h.label, e)
              ]
            },
            h.value
          ))
        ] }),
        /* @__PURE__ */ t(
          t2,
          {
            label: yl,
            lang: e,
            placeholder: b(wl, e),
            value: n,
            onChange: (h) => c(h.target.value)
          }
        ),
        /* @__PURE__ */ r("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: o,
              onChange: (h) => m(h.target.checked),
              className: "h-4 w-4 rounded border-slate-300 text-blue-600"
            }
          ),
          e === "id" ? "Beritahu pasien" : "Notify patient"
        ] }),
        /* @__PURE__ */ t(
          l2,
          {
            fullWidth: !0,
            size: "lg",
            rightIcon: /* @__PURE__ */ t(a0, { className: "h-4 w-4", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a({
              assessment: s,
              comments: n,
              nextAction: "follow-up-3mo",
              notifyPatient: o
            }),
            children: b(kl, e)
          }
        )
      ] })
    ] })
  ] });
}
function We({ role: e, content: a, timestamp: l, className: s }) {
  const i = e === "user";
  return /* @__PURE__ */ t(
    "div",
    {
      className: u(
        "flex",
        i ? "justify-end" : "justify-start",
        s
      ),
      children: /* @__PURE__ */ r(
        "div",
        {
          className: u(
            "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
            i ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-800 shadow-sm",
            e === "system" && "bg-slate-50 text-slate-600 italic"
          ),
          role: e === "assistant" ? "article" : void 0,
          "aria-label": e === "assistant" ? "AI response" : void 0,
          children: [
            /* @__PURE__ */ t("p", { children: a }),
            l ? /* @__PURE__ */ t("time", { className: "mt-1 block text-xs opacity-70", children: l }) : null
          ]
        }
      )
    }
  );
}
const G0 = d(
  "Ask about this report…",
  "Tanyakan tentang laporan ini…"
);
function Nl({
  lang: e = "en",
  onSend: a,
  disabled: l,
  className: s
}) {
  const [i, n] = _(""), c = () => {
    const o = i.trim();
    o && (a == null || a(o), n(""));
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: u(
        "flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm",
        s
      ),
      children: [
        /* @__PURE__ */ t(
          "textarea",
          {
            rows: 1,
            value: i,
            onChange: (o) => n(o.target.value),
            onKeyDown: (o) => {
              o.key === "Enter" && !o.shiftKey && (o.preventDefault(), c());
            },
            placeholder: b(G0, e),
            disabled: l,
            className: "min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none",
            "aria-label": b(G0, e)
          }
        ),
        /* @__PURE__ */ t(
          l2,
          {
            size: "sm",
            disabled: l || !i.trim(),
            onClick: c,
            "aria-label": e === "id" ? "Kirim" : "Send",
            children: /* @__PURE__ */ t(aa, { className: "h-4 w-4", "aria-hidden": !0 })
          }
        )
      ]
    }
  );
}
function Ks({
  totalEmployees: e,
  trend: a = "+8.5% vs last month",
  trendUp: l = !0,
  className: s
}) {
  return /* @__PURE__ */ t(D, { className: u("", s), children: /* @__PURE__ */ t($, { children: /* @__PURE__ */ r("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500", children: "Total Employees" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-4xl font-bold text-slate-900", children: e.toLocaleString() }),
      /* @__PURE__ */ r(
        "p",
        {
          className: u(
            "mt-2 flex items-center gap-1 text-sm font-medium",
            l ? "text-emerald-600" : "text-red-600"
          ),
          children: [
            /* @__PURE__ */ t(ua, { className: "h-4 w-4", "aria-hidden": !0 }),
            a
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50", children: /* @__PURE__ */ t(_2, { className: "h-6 w-6 text-emerald-600", "aria-hidden": !0 }) })
  ] }) }) });
}
const Ml = {
  privacy: {
    icon: l0,
    text: "Data is secure, private and confidential. We comply with data privacy regulations."
  },
  encryption: {
    icon: ye,
    text: "Encrypted & Protected. Enterprise-grade security."
  }
};
function F0({
  variant: e = "privacy",
  className: a
}) {
  const { icon: l, text: s } = Ml[e];
  return /* @__PURE__ */ r(
    "div",
    {
      className: u(
        "flex items-center gap-3 rounded-xl bg-blue-50/80 px-4 py-3 text-sm text-slate-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(l, { className: "h-5 w-5 shrink-0 text-blue-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: s })
      ]
    }
  );
}
const Ue = {
  login: "POST /auth/login",
  google: "POST /auth/google",
  logout: "POST /auth/logout",
  refresh: "POST /auth/refresh",
  profile: "GET /users/me"
}, O = {
  email: d("Email", "Email"),
  username: d("Username / Employee ID", "Username / ID Karyawan"),
  password: d("Password", "Kata sandi"),
  signIn: d("Sign in", "Masuk"),
  login: d("Login", "Masuk"),
  forgotPassword: d("Forgot password?", "Lupa kata sandi?"),
  rememberMe: d("Remember me", "Ingat saya"),
  invalidCredentials: d(
    "Invalid email or password",
    "Email atau kata sandi tidak valid"
  ),
  invalidUsername: d(
    "Invalid username or password",
    "Username atau kata sandi tidak valid"
  ),
  portalTitle: d("Sign in to Portal", "Masuk ke Portal"),
  portalSubtitle: d(
    "Secure access for clinicians and patients",
    "Akses aman untuk tenaga medis dan pasien"
  ),
  adminTitle: d("Admin Console", "Konsol Admin"),
  adminSubtitle: d(
    "Tenant and platform management",
    "Manajemen tenant dan platform"
  ),
  hrTitle: d("Enterprise Health Portal", "Portal Kesehatan Perusahaan"),
  hrSubtitle: d(
    "Workforce wellness and occupational health",
    "Kesehatan kerja dan wellness karyawan"
  ),
  brandTagline: d(
    "Medical AI Report Analysis",
    "Analisis Laporan Medis AI"
  ),
  continueWithGoogle: d("Continue with Google", "Lanjutkan dengan Google"),
  orDivider: d("or", "atau"),
  secureSession: d("JWT-secured session", "Sesi aman JWT")
}, zl = {
  blue: "from-slate-50 via-white to-blue-50",
  teal: "from-slate-50 via-white to-teal-50",
  emerald: "from-slate-50 via-white to-emerald-50",
  slate: "from-slate-100 via-slate-50 to-white"
}, El = {
  blue: "bg-gradient-to-br from-[#1078E0] to-[#001450]",
  teal: "bg-gradient-to-br from-teal-600 to-teal-800",
  emerald: "bg-gradient-to-br from-emerald-600 to-emerald-800",
  slate: "bg-gradient-to-br from-slate-700 to-slate-900"
};
function h0({
  children: e,
  variant: a = "plain",
  accent: l = "blue",
  sidePanel: s,
  className: i
}) {
  return a === "split" && s ? /* @__PURE__ */ r("div", { className: u("flex min-h-screen", i), children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: u(
          "hidden w-[42%] flex-col justify-between p-10 text-white lg:flex",
          El[l]
        ),
        children: s
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex flex-1 items-center justify-center bg-slate-50 px-4 py-10", children: e })
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: u(
        "flex min-h-screen flex-col items-center justify-center px-4 py-10",
        a === "gradient" ? u("bg-gradient-to-br", zl[l]) : "bg-slate-50",
        i
      ),
      children: e
    }
  );
}
const H0 = {
  /** Hero / login card outer glow */
  elevated: "shadow-[0_40px_120px_-80px_rgba(15,23,42,0.55)]",
  /** Inner panels (feature cards on marketing site) */
  panel: "shadow-[0_22px_70px_-35px_rgba(15,23,42,0.5)]",
  /** Subtle chips & controls */
  sm: "shadow-sm"
}, I = {
  card: {
    md: "w-full max-w-md",
    lg: "w-full max-w-lg"
  },
  header: {
    md: "border-b border-slate-100 px-5 pt-5 pb-4",
    lg: "border-b border-slate-100 px-6 pt-6 pb-5"
  },
  content: {
    md: "px-5 py-5",
    lg: "px-6 py-6"
  },
  logoPx: {
    md: 48,
    lg: 56
  },
  title: {
    md: "font-heading text-xl font-semibold text-slate-900",
    lg: "font-heading text-2xl font-semibold text-slate-900"
  },
  subtitle: {
    md: "mt-1 text-sm text-slate-600",
    lg: "mt-2 text-base text-slate-600"
  },
  form: {
    md: "space-y-4",
    lg: "space-y-5"
  },
  input: {
    md: "h-10 text-sm",
    lg: "h-12 text-base px-4"
  },
  label: {
    md: "text-sm font-medium text-slate-700",
    lg: "text-base font-medium text-slate-700"
  },
  button: {
    md: "lg",
    lg: "xl"
  },
  passwordToggleTop: {
    md: "top-[2.125rem]",
    lg: "top-[2.625rem]"
  },
  /** Centered portal brand block — logo → title → subtitle */
  brandBlock: {
    md: "mx-auto flex w-full max-w-xs flex-col items-center text-center",
    lg: "mx-auto flex w-full max-w-sm flex-col items-center text-center"
  },
  brandLogoToTitle: {
    md: "mt-6",
    lg: "mt-8"
  },
  titleToSubtitle: {
    md: "mt-2",
    lg: "mt-2.5"
  },
  subtitleMax: {
    md: "max-w-[260px]",
    lg: "max-w-[300px]"
  }
};
function u0({
  children: e,
  loginSize: a = "lg",
  elevated: l = !0,
  className: s
}) {
  return /* @__PURE__ */ t(
    D,
    {
      className: u(
        I.card[a],
        "overflow-hidden rounded-3xl border-slate-200 bg-white",
        l ? H0.elevated : H0.sm,
        s
      ),
      children: e
    }
  );
}
function Js({
  children: e,
  loginSize: a = "lg",
  className: l
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: u(
        I.header[a],
        "border-slate-100",
        l
      ),
      children: e
    }
  );
}
function qe({
  children: e,
  loginSize: a = "lg",
  className: l
}) {
  return /* @__PURE__ */ t("div", { className: u(I.content[a], l), children: e });
}
const Ke = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20103248.000000%2029160.000000'%20width='1434'%20height='405'%20role='img'%20aria-label='Alocare%20AI'%3e%3cg%20transform='translate(0.000000,29160.000000)%20scale(7.200000,-7.200000)'%3e%3cpath%20fill='%23001450'%20d='M6085%202627%20c-3%20-7%20-4%20-337%20-3%20-732%20l3%20-720%2023%20-50%20c48%20-104%20131%20-155%20256%20-158%2039%20-1%2092%202%20119%206%20l47%208%200%20120%200%20119%20-58%200%20c-48%200%20-62%204%20-80%2023%20l-22%2023%20-2%20685%20-3%20684%20-138%203%20c-106%202%20-139%200%20-142%20-11z'/%3e%3cpath%20fill='%23001450'%20d='M5198%202154%20c-79%20-19%20-171%20-67%20-218%20-114%20-43%20-43%20-100%20-135%20-100%20-162%200%20-13%2027%20-26%20110%20-52%2060%20-20%20116%20-36%20124%20-36%207%200%2019%2013%2026%2030%2035%2084%20147%20133%20254%20110%20101%20-21%20154%20-74%20163%20-162%20l6%20-55%20-34%20-12%20c-18%20-6%20-90%20-16%20-159%20-22%20-280%20-23%20-382%20-56%20-468%20-155%20-57%20-64%20-75%20-125%20-70%20-233%205%20-102%2030%20-163%2091%20-222%20147%20-144%20446%20-139%20593%209%2043%2044%2056%2051%2053%2030%20-1%20-7%20-1%20-37%200%20-65%20l1%20-53%20135%200%20135%200%200%20394%20c0%20219%20-4%20416%20-10%20446%20-32%20171%20-150%20288%20-329%20326%20-83%2017%20-228%2017%20-303%20-2z%20m359%20-723%20c-13%20-160%20-116%20-248%20-281%20-239%20-87%204%20-120%2022%20-150%2082%20-37%2074%2011%20159%20106%20185%2039%2011%20234%2037%20302%2040%20l29%201%20-6%20-69z'/%3e%3cpath%20fill='%23001450'%20d='M7070%202147%20c-163%20-50%20-279%20-146%20-349%20-290%20-53%20-107%20-71%20-181%20-71%20-291%200%20-179%2052%20-311%20169%20-426%20125%20-124%20246%20-173%20426%20-174%20277%200%20489%20148%20573%20401%2021%2066%2025%2097%2026%20198%200%20106%20-3%20130%20-28%20202%20-61%20182%20-183%20309%20-358%20371%20-107%2037%20-282%2042%20-388%209z%20m305%20-266%20c193%20-85%20244%20-385%2094%20-556%20-56%20-63%20-111%20-88%20-206%20-93%20-78%20-4%20-88%20-2%20-148%2027%20-118%2058%20-169%20152%20-169%20311%200%20100%2015%20151%2064%20220%2076%20107%20238%20147%20365%2091z'/%3e%3cpath%20fill='%23001450'%20d='M8436%202154%20c-250%20-61%20-418%20-275%20-433%20-554%20-20%20-362%20231%20-632%20587%20-634%20162%200%20285%2044%20388%20139%2054%2050%20122%20154%20122%20186%200%2012%20-96%2055%20-232%20104%20-12%205%20-22%20-4%20-37%20-33%20-47%20-92%20-137%20-137%20-260%20-130%20-122%207%20-194%2058%20-250%20178%20-22%2048%20-25%2069%20-25%20155%200%2089%203%20107%2028%20162%2065%20142%20201%20209%20342%20168%2073%20-21%20118%20-54%20157%20-116%20l29%20-48%2062%2024%20c155%2059%20178%2069%20183%2081%208%2023%20-50%20116%20-112%20180%20-68%2069%20-152%20116%20-247%20139%20-78%2018%20-224%2018%20-302%20-1z'/%3e%3cpath%20fill='%23001450'%20d='M9608%202154%20c-148%20-35%20-285%20-152%20-313%20-266%20-7%20-26%20-5%20-27%20104%20-62%2061%20-20%20117%20-36%20125%20-36%207%200%2019%2014%2026%2030%2034%2083%20150%20133%20258%20111%20109%20-22%20162%20-76%20162%20-167%200%20-50%20-1%20-53%20-32%20-63%20-18%20-6%20-101%20-17%20-184%20-25%20-306%20-30%20-415%20-80%20-486%20-226%20-18%20-36%20-22%20-63%20-23%20-140%200%20-84%203%20-101%2028%20-152%2068%20-139%20237%20-215%20420%20-189%20100%2014%20172%2046%20237%20107%20l50%2047%200%20-67%200%20-66%20134%200%20c113%200%20135%202%20140%2016%2010%2027%206%20735%20-5%20804%20-29%20179%20-147%20301%20-331%20345%20-78%2018%20-234%2018%20-310%20-1z%20m362%20-710%20c0%20-115%20-42%20-184%20-137%20-229%20-67%20-32%20-165%20-37%20-225%20-12%20-86%2036%20-104%20150%20-35%20213%2019%2018%2054%2038%2077%2044%2034%209%20229%2034%20303%2039%2014%201%2017%20-8%2017%20-55z'/%3e%3cpath%20fill='%23001450'%20d='M11720%202154%20c-104%20-27%20-192%20-78%20-261%20-152%20-114%20-121%20-160%20-244%20-162%20-432%20-2%20-185%2049%20-318%20167%20-436%20119%20-119%20241%20-168%20421%20-168%20163%200%20276%2036%20376%20119%2050%2042%20119%20130%20119%20151%200%209%20-43%2035%20-106%2064%20-106%2050%20-134%2058%20-134%2040%200%20-21%20-68%20-85%20-115%20-106%20-68%20-32%20-198%20-33%20-265%20-3%20-90%2040%20-170%20151%20-170%20234%20l0%2025%20415%200%20415%200%200%20103%20c0%20288%20-155%20504%20-402%20562%20-79%2019%20-226%2018%20-298%20-1z%20m234%20-231%20c98%20-27%20186%20-130%20186%20-217%200%20-14%20-27%20-16%20-275%20-16%20-311%200%20-293%20-6%20-254%2080%2044%2097%20146%20165%20253%20169%2016%201%2057%20-7%2090%20-16z'/%3e%3cpath%20fill='%23001450'%20d='M11047%202149%20c-85%20-20%20-170%20-81%20-219%20-158%20l-28%20-45%200%2097%200%2097%20-140%200%20-140%200%200%20-575%200%20-575%20145%200%20145%200%200%20317%20c0%20377%205%20409%2080%20484%2061%2061%20121%2081%20232%2078%20l83%20-2%203%20138%20c2%20104%20-1%20140%20-10%20147%20-17%2010%20-102%209%20-151%20-3z'/%3e%3cpath%20fill='%23001450'%20d='M1430%201350%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%23001450'%20d='M1298%201289%20c-43%20-21%20-78%20-42%20-78%20-44%200%20-3%2024%206%2053%2020%2042%2021%2047%2022%2027%206%20-23%20-19%20-23%20-21%20-5%20-20%2024%200%2061%2026%2052%2036%20-4%203%205%2015%2020%2025%2047%2030%2012%2019%20-69%20-23z'/%3e%3cpath%20fill='%23001450'%20d='M1144%201201%20c-55%20-37%20-136%20-111%20-122%20-111%204%200%2030%2023%2059%2050%2050%2048%2087%2069%2058%2033%20-8%20-9%20-9%20-15%20-4%20-12%2053%2026%2065%2034%2065%2041%200%205%20-9%204%20-21%20-2%20-11%20-7%20-23%20-9%20-26%20-7%20-3%203%209%2013%2026%2022%2017%208%2031%2018%2031%2020%200%209%20-8%205%20-66%20-34z'/%3e%3cpath%20fill='%23001450'%20d='M1085%201120%20c-23%20-24%20-25%20-30%20-12%20-30%209%200%2017%207%2017%2015%200%207%208%2018%2017%2024%2010%205%2015%2012%2012%2015%20-3%203%20-18%20-8%20-34%20-24z'/%3e%3cpath%20fill='%23001450'%20d='M1246%201031%20c5%20-55%203%20-60%20-13%20-54%20-33%2013%20-51%2035%20-45%2056%205%2020%206%2020%2013%201%206%20-16%208%20-15%208%209%201%2022%20-3%2027%20-23%2027%20-31%200%20-43%20-18%20-20%20-27%2016%20-6%2016%20-7%20-2%20-14%20-10%20-4%20-31%20-4%20-46%20-2%20-24%205%20-28%202%20-28%20-16%200%20-26%20-18%20-59%20-44%20-81%20-19%20-16%20-19%20-17%204%20-33%2020%20-14%2021%20-17%207%20-23%20-9%20-3%20-17%20-12%20-17%20-18%200%20-7%20-11%20-19%20-25%20-26%20-14%20-7%20-25%20-20%20-25%20-27%200%20-7%20-7%20-16%20-15%20-19%20-8%20-4%20-15%20-12%20-15%20-20%200%20-7%20-6%20-17%20-12%20-21%20-7%20-4%20-18%20-17%20-24%20-28%20-6%20-11%20-23%20-26%20-37%20-33%20-28%20-14%20-34%20-27%20-17%20-37%206%20-3%2010%20-14%2010%20-25%200%20-15%20-5%20-17%20-35%20-10%20-19%204%20-35%204%20-35%200%200%20-5%20-3%20-16%20-7%20-26%20-5%20-13%20-3%20-15%207%20-9%2010%206%2011%202%205%20-21%20-4%20-16%20-7%20-44%20-7%20-62%201%20-28%20-5%20-35%20-38%20-52%20-22%20-11%20-46%20-20%20-55%20-20%20-8%200%20-36%20-16%20-62%20-36%20-59%20-45%20-64%20-50%20-35%20-35%2029%2016%2034%2012%2017%20-13%20-10%20-14%20-22%20-17%20-47%20-13%20-18%202%20-44%200%20-58%20-5%20-14%20-6%20-50%20-13%20-80%20-17%20l-55%20-7%2070%20-9%20c51%20-6%2095%20-3%20165%208%2084%2015%20116%2027%20278%20108%20100%2050%20180%2094%20178%2098%20-3%204%203%207%2012%208%209%200%20103%2041%20207%2091%20105%2050%20234%20106%20288%20124%20l97%2034%20-54%201%20c-66%202%20-91%2014%20-91%2045%20-1%2013%20-6%2022%20-13%2021%20-6%20-2%20-9%204%20-6%2012%205%2012%20-5%2014%20-63%2010%20-50%20-4%20-63%20-2%20-50%205%209%206%2017%2018%2017%2026%200%2011%208%2014%2028%2011%2015%20-2%2021%20-2%2015%200%20-7%203%20-13%209%20-13%2013%200%205%20-18%207%20-40%204%20-34%20-5%20-43%20-2%20-66%2023%20-17%2017%20-25%2021%20-21%2011%204%20-12%201%20-18%20-8%20-18%20-9%200%20-15%2010%20-15%2024%200%2020%20-4%2023%20-21%2019%20-21%20-6%20-22%20-3%20-17%2040%204%2037%201%2052%20-13%2068%20-19%2021%20-19%2021%20-13%20-40z%20m-118%20-40%20c3%20-8%20-1%20-12%20-9%20-9%20-7%202%20-15%2010%20-17%2017%20-3%208%201%2012%209%209%207%20-2%2015%20-10%2017%20-17z%20m348%20-285%20c12%20-12%209%20-16%20-17%20-25%20-21%20-7%20-28%20-7%20-23%200%204%207%20-1%209%20-15%204%20-35%20-11%20-47%206%20-15%2021%2039%2017%2053%2017%2070%200z%20m-556%20-102%20c0%20-2%20-7%20-4%20-15%20-4%20-8%200%20-15%204%20-15%2010%200%205%207%207%2015%204%208%20-4%2015%20-8%2015%20-10z%20m333%2010%20c-7%20-3%20-9%20-13%20-6%20-22%204%20-15%203%20-15%20-6%20-2%20-15%2022%20-14%2030%207%2029%209%200%2012%20-3%205%20-5z%20m-216%20-110%20c-3%20-3%20-12%20-4%20-19%20-1%20-8%203%20-5%206%206%206%2011%201%2017%20-2%2013%20-5z'/%3e%3cpath%20fill='%23001450'%20d='M1221%201014%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%23001450'%20d='M1440%20870%20c0%20-5%205%20-10%2011%20-10%205%200%207%205%204%2010%20-3%206%20-8%2010%20-11%2010%20-2%200%20-4%20-4%20-4%20-10z'/%3e%3cpath%20fill='%23001450'%20d='M1734%20805%20c-9%20-18%20-9%20-25%200%20-29%206%20-2%200%20-5%20-13%20-5%20-13%20-1%20-22%20-3%20-20%20-6%203%20-2%2048%202%20100%209%2052%208%2079%2014%2061%2015%20-18%201%20-43%207%20-55%2015%20-43%2027%20-61%2027%20-73%201z'/%3e%3cpath%20fill='%231078E0'%20d='M1886%203808%20c-11%20-6%20-39%20-8%20-68%20-5%20-27%204%20-46%203%20-44%20-2%203%20-4%20-18%20-16%20-45%20-25%20-67%20-24%20-158%20-93%20-210%20-158%20-25%20-32%20-48%20-52%20-58%20-50%20-13%202%20-13%201%20-2%20-6%2010%20-7%2011%20-14%203%20-28%20-6%20-11%20-14%20-19%20-19%20-19%20-4%200%20-8%20-7%20-8%20-16%200%20-8%20-11%20-39%20-24%20-67%20-18%20-38%20-27%20-49%20-34%20-40%20-6%209%20-7%207%20-3%20-5%204%20-12%20-65%20-158%20-203%20-430%20-114%20-227%20-248%20-490%20-295%20-585%20-54%20-107%20-91%20-170%20-98%20-166%20-7%204%20-8%202%20-4%20-4%2010%20-17%20-76%20-185%20-87%20-169%20-6%208%20-7%206%20-3%20-6%207%20-22%20-221%20-480%20-234%20-472%20-6%203%20-8%200%20-5%20-7%203%20-7%20-40%20-101%20-94%20-208%20-80%20-156%20-103%20-194%20-118%20-192%20-14%203%20-15%201%20-6%20-8%2014%20-15%20-4%20-63%20-20%20-53%20-6%203%20-7%201%20-3%20-5%2011%20-18%20-14%20-61%20-33%20-55%20-12%204%20-13%203%20-3%20-4%2010%20-8%2011%20-15%201%20-36%20-7%20-15%20-16%20-24%20-22%20-20%20-6%203%20-7%201%20-3%20-5%209%20-14%20-14%20-63%20-27%20-55%20-6%203%20-7%201%20-3%20-5%203%20-6%201%20-22%20-6%20-37%20-8%20-18%20-14%20-22%20-19%20-13%20-4%207%20-12%209%20-16%204%20-4%20-5%20-2%20-11%205%20-13%206%20-3%2012%20-11%2012%20-18%200%20-7%2064%20111%20141%20263%2078%20153%20172%20336%20209%20407%2093%20180%20865%201701%20886%201748%2013%2027%2020%2034%2027%2025%206%20-9%207%20-7%203%205%20-9%2029%20149%20321%20206%20379%2031%2032%2052%2046%2062%2042%2013%20-5%2010%20-14%20-19%20-54%20-37%20-50%20-65%20-139%20-65%20-205%200%20-76%2029%20-141%20141%20-316%20159%20-247%20244%20-406%20229%20-424%20-10%20-12%20-9%20-15%208%20-15%2011%200%2023%20-7%2026%20-16%203%20-8%2010%20-12%2016%20-9%206%204%207%20-1%203%20-11%20-4%20-10%20-2%20-15%204%20-11%205%203%209%20-2%209%20-11%20-1%20-26%20173%20-364%20184%20-357%206%204%207%20-1%203%20-11%20-5%20-13%20-3%20-15%207%20-9%208%205%2011%204%206%20-3%20-3%20-6%2074%20-173%20173%20-371%20150%20-299%20177%20-360%20163%20-364%20-14%20-4%20-13%20-5%203%20-6%2015%20-1%2029%20-17%2048%20-56%2015%20-30%2022%20-55%2017%20-55%20-18%200%20-10%20-19%2010%20-25%2023%20-7%2027%20-25%206%20-25%20-8%200%20-16%20-5%20-18%20-11%20-3%20-9%20-10%20-9%20-23%20-1%20-11%205%20-65%2025%20-120%2043%20-55%2018%20-103%2037%20-107%2043%20-4%206%20-23%209%20-42%208%20-20%20-2%20-36%201%20-36%205%200%204%20-26%209%20-58%2010%20-54%201%20-51%200%2048%20-23%20115%20-26%20266%20-74%20349%20-110%2029%20-13%2056%20-24%2060%20-24%204%200%20-71%20154%20-166%20343%20-112%20223%20-170%20349%20-167%20362%204%2014%203%2016%20-4%207%20-14%20-21%20-24%2015%20-11%2040%2012%2023%209%2028%20-19%2031%20-14%201%20-30%2022%20-56%2074%20-20%2040%20-34%2073%20-31%2073%203%200%2018%20-27%2035%20-60%2017%20-33%2034%20-60%2040%20-60%2018%200%2021%2021%207%2048%20-7%2016%20-13%2040%20-13%2054%201%2014%20-3%2024%20-9%2022%20-6%20-3%20-11%205%20-12%2016%20-1%2012%204%2020%2013%2020%208%200%2013%20-4%2010%20-9%20-3%20-4%206%20-6%2021%20-3%20l26%205%20-24%2011%20c-27%2012%20-33%2045%20-13%2064%2012%2011%2014%208%2014%20-13%200%20-14%204%20-25%209%20-25%204%200%206%2011%204%2024%20-4%2019%201%2025%2025%2034%2025%209%2033%207%2058%20-15%2023%20-19%2030%20-22%2032%20-10%202%2012%2010%2013%2033%207%2027%20-8%2029%20-7%2029%2018%200%2023%204%2027%2030%2028%2016%201%2027%20-3%2024%20-7%20-8%20-14%205%20-11%2037%208%2015%209%2030%2024%2032%2032%204%2013%205%2013%206%20-1%201%20-14%2010%20-17%2059%20-14%2031%201%2063%20-2%2071%20-8%2012%20-9%2013%20-8%208%206%20-7%2019%2017%2043%2032%2033%206%20-3%2020%20-1%2031%205%2016%209%2018%2015%2010%2030%20-5%2010%20-10%2022%20-10%2027%201%204%2010%20-9%2021%20-30%2015%20-28%2017%20-42%2010%20-51%20-6%20-7%20-8%20-16%20-4%20-20%204%20-3%20-3%20-13%20-15%20-22%20-22%20-15%20-21%20-39%201%20-31%207%202%2017%20-2%2022%20-9%206%20-6%2020%20-15%2032%20-19%2019%20-5%2022%20-3%2017%2012%20-5%2017%20-5%2017%206%200%209%20-14%209%20-22%20-2%20-35%20-12%20-15%20-11%20-16%204%20-4%2015%2012%2027%20-6%20124%20-200%2058%20-117%20175%20-346%20259%20-508%20382%20-740%20375%20-726%20390%20-831%207%20-54%20-15%20-159%20-45%20-220%20-68%20-132%20-216%20-219%20-373%20-219%20-71%200%20-192%2033%20-243%2066%20-13%209%20-27%2014%20-31%2011%20-3%20-4%206%20-12%2020%20-18%2015%20-7%2024%20-16%2020%20-22%20-3%20-6%20-2%20-7%204%20-4%205%203%2044%20-5%2087%20-19%2042%20-13%2087%20-24%2099%20-25%2021%200%2021%20-1%202%20-9%20-14%20-6%20-4%20-9%2038%20-9%2033%20-1%2056%203%2053%208%20-4%205%2013%2012%2036%2016%2091%2016%20205%2086%20258%20160%2014%2019%2031%2035%2038%2035%207%200%2010%205%207%2010%20-4%206%204%2036%2016%2068%2028%2073%2030%20184%205%20262%20-17%2051%20-101%20220%20-342%20685%20-51%2099%20-194%20380%20-318%20625%20-124%20245%20-230%20445%20-237%20445%20-7%200%20-14%207%20-16%2015%20-4%2013%20-3%2013%207%200%2033%20-45%20-16%2059%20-244%20506%20-189%20370%20-261%20503%20-298%20547%20-27%2031%20-46%2057%20-42%2057%2024%200%20-151%2080%20-198%2091%20-32%208%20-58%2017%20-58%2021%200%2011%20-11%2010%20-34%20-4z%20m-49%20-24%20c-3%20-3%20-12%20-4%20-19%20-1%20-8%203%20-5%206%206%206%2011%201%2017%20-2%2013%20-5z%20m227%20-1310%20c3%20-8%202%20-12%20-4%20-9%20-6%203%20-10%2010%20-10%2016%200%2014%207%2011%2014%20-7z%20m800%20-90%20c3%20-8%202%20-12%20-4%20-9%20-6%203%20-10%2010%20-10%2016%200%2014%207%2011%2014%20-7z%20m-601%20-66%20c-6%20-7%20-13%20-20%20-16%20-28%20-3%20-9%20-6%20-3%20-6%2013%20-1%2019%204%2027%2015%2027%2012%200%2014%20-4%207%20-12z%20m27%20-293%20c0%20-5%20-5%20-3%20-10%205%20-5%208%20-10%2020%20-10%2025%200%206%205%203%2010%20-5%205%20-8%2010%20-19%2010%20-25z%20m337%20-722%20c-11%20-10%20-26%208%20-20%2023%205%2015%207%2014%2015%20-1%206%20-9%207%20-19%205%20-22z'/%3e%3cpath%20fill='%231078E0'%20d='M1533%203606%20c-22%20-27%20-23%20-46%20-2%20-46%205%200%209%206%209%2014%200%208%205%2016%2011%2018%206%202%2010%2012%208%2023%20-4%2017%20-6%2016%20-26%20-9z'/%3e%3cpath%20fill='%231078E0'%20d='M3677%203218%20c-9%20-7%20-26%20-45%20-37%20-85%20-30%20-110%20-49%20-153%20-66%20-146%20-8%203%20-14%200%20-14%20-7%200%20-6%205%20-8%2010%20-5%2016%2010%2012%20-7%20-10%20-43%20-11%20-18%20-18%20-37%20-15%20-41%202%20-5%20-4%20-20%20-15%20-34%20-23%20-29%20-109%20-99%20-96%20-78%206%209%205%2012%20-5%209%20-8%20-3%20-13%20-11%20-11%20-17%201%20-7%20-2%20-10%20-7%20-6%20-6%203%20-33%20-6%20-62%20-20%20-32%20-17%20-60%20-24%20-74%20-21%20-16%204%20-25%201%20-29%20-10%20-5%20-12%20-14%20-14%20-34%20-10%20-20%205%20-23%204%20-12%20-4%2013%20-8%2013%20-10%20-2%20-10%20-24%200%20-51%20-44%20-43%20-69%204%20-15%2026%20-26%2078%20-42%2040%20-12%2093%20-32%20119%20-45%2026%20-13%2051%20-24%2055%20-24%204%201%20-21%2016%20-57%2035%20-67%2035%20-75%2046%20-15%2021%2038%20-16%2041%202%202%2019%20-16%208%20-21%2017%20-19%2037%202%2024%20-2%2028%20-33%2034%20-19%203%20-35%2010%20-35%2015%200%205%20-8%209%20-17%2010%20-10%200%200%207%2022%2015%2029%2011%2046%2012%2065%205%2030%20-12%2088%20-12%20112%200%2010%206%2019%205%2023%20-1%203%20-5%2018%20-10%2033%20-10%2015%200%2034%20-4%2042%20-10%2011%20-7%209%20-11%20-13%20-19%20-15%20-6%20-27%20-16%20-27%20-22%200%20-8%20-4%20-8%20-15%201%20-15%2013%20-70%205%20-81%20-11%20-3%20-5%208%20-21%2025%20-35%2017%20-14%2031%20-32%2031%20-39%200%20-12%20-6%20-13%20-45%20-5%20-23%205%20-27%20-1%20-9%20-14%2021%20-16%2025%20-37%209%20-49%20-6%20-5%20-1%20-7%2010%20-4%2011%202%2019%209%2017%2016%20-2%209%203%208%2019%20-3%2016%20-11%2024%20-12%2034%20-3%209%208%2010%2016%203%2024%20-13%2016%2036%2010%2059%20-8%2010%20-7%2015%20-10%2011%20-5%20-9%2011%2011%2031%2039%2038%2018%205%2028%20-1%2045%20-24%20l21%20-31%20-26%2018%20c-24%2016%20-27%2016%20-33%201%20-3%20-9%20-15%20-16%20-25%20-16%20-11%200%20-19%20-7%20-19%20-16%200%20-13%20-6%20-15%20-32%20-10%20-70%2015%20-77%2016%20-81%209%20-3%20-5%2012%20-16%2032%20-27%20l36%20-18%20-20%2023%20c-20%2024%20-20%2024%208%200%2027%20-24%2036%20-38%2017%20-26%20-16%2010%20-12%20-4%2012%20-35%2011%20-16%2024%20-27%2027%20-25%204%202%2017%20-5%2030%20-14%2016%20-13%2024%20-30%2026%20-56%20l2%20-39%20-26%2050%20c-14%2027%20-32%2050%20-39%2052%20-8%201%20-12%20-3%20-9%20-10%202%20-7%2010%20-12%2016%20-10%209%202%209%20-3%201%20-17%20-11%20-21%201%20-37%2019%20-26%2011%206%2043%20-77%2062%20-158%2023%20-106%2090%20-113%20117%20-13%207%2026%2017%2045%2024%2044%207%20-2%2014%207%2016%2020%202%2012%20-1%2022%20-7%2022%20-10%200%200%2031%2034%20114%205%2012%205%2017%20-1%2013%20-5%20-3%20-10%203%20-10%2013%200%2010%203%2018%206%2018%203%200%208%201%2013%202%204%201%2010%203%2015%204%2010%202%2090%2090%2088%2098%200%203%203%2010%208%2015%205%205%206%203%202%20-4%20-11%20-20%20-3%20-16%2054%2022%2028%2019%2093%2048%20143%2064%2051%2016%2096%2036%20101%2044%205%207%206%2025%202%2040%20-5%2022%20-19%2030%20-101%2057%20-52%2017%20-95%2036%20-95%2042%200%2011%20-30%2037%20-43%2038%20-5%200%20-5%20-5%20-1%20-11%2013%20-21%20-56%2025%20-89%2059%20-25%2025%20-27%2032%20-12%2027%2020%20-6%2020%20-6%200%206%20-47%2030%20-108%20120%20-87%20127%2017%205%2015%2022%20-2%2022%20-15%200%20-35%2046%20-56%20125%20-11%2044%20-39%2085%20-59%2085%20-4%200%20-15%20-6%20-24%20-12z%20m58%20-433%20c14%20-25%2030%20-43%2034%20-41%2010%206%2053%20-38%2046%20-46%20-4%20-3%2010%20-16%2029%20-28%2041%20-25%2043%20-52%205%20-76%20l-24%20-16%2024%2021%20c13%2012%2019%2021%2014%2021%20-13%200%20-48%20-27%20-48%20-37%200%20-5%20-17%20-29%20-39%20-53%20-24%20-28%20-34%20-36%20-27%20-20%20l12%2025%20-20%20-25%20c-11%20-14%20-23%20-33%20-27%20-42%20-9%20-29%20-19%20-21%20-49%2035%20-28%2050%20-51%2076%20-69%2077%20-5%200%20-3%20-7%204%20-15%2020%20-24%205%20-18%20-16%207%20-12%2013%20-13%2018%20-4%2013%2013%20-8%2013%20-7%201%209%20-8%209%20-20%2015%20-27%2012%20-8%20-3%20-13%20-1%20-11%204%201%205%20-7%2016%20-18%2024%20-18%2014%20-18%2016%20-2%2017%209%201%2021%202%2026%203%2015%202%2051%2053%2043%2061%20-4%205%20-2%205%204%202%2011%20-7%2047%2029%2087%2087%2010%2014%2020%2026%2022%2026%201%200%2015%20-20%2030%20-45z%20m290%20-43%20c-3%20-3%20-11%200%20-18%207%20-9%2010%20-8%2011%206%205%2010%20-3%2015%20-9%2012%20-12z%20m-850%20-94%20c-7%20-19%206%20-33%2045%20-46%20l35%20-11%20-35%205%20c-42%207%20-65%2027%20-57%2048%204%209%209%2016%2011%2016%203%200%203%20-6%201%20-12z%20m527%20-228%20c4%200%208%204%208%208%200%205%207%209%2015%209%2019%200%2019%20-21%200%20-37%20-11%20-9%20-13%20-16%20-5%20-24%2016%20-16%2012%20-44%20-7%20-42%20-11%200%20-17%20-6%20-17%20-16%202%20-21%20-5%20-22%20-28%20-4%20-22%2016%20-23%2046%20-2%2046%208%200%2013%204%2010%209%20-4%205%200%2012%206%2014%207%203%20-4%203%20-24%200%20-44%20-7%20-48%201%20-13%2029%2014%2011%2025%2027%2026%2036%200%2013%203%2011%2011%20-5%206%20-13%2015%20-23%2020%20-23z%20m-76%20-77%20c-10%20-10%20-19%205%20-10%2018%206%2011%208%2011%2012%200%202%20-7%201%20-15%20-2%20-18z%20m117%20-88%20c19%20-18%2027%20-22%2027%20-11%200%208%204%2017%209%2020%205%203%20-2%20-28%20-14%20-69%20-31%20-100%20-33%20-105%20-29%20-74%201%2014%20-2%2031%20-9%2038%20-6%206%20-7%2011%20-2%2011%2016%200%20-30%2029%20-47%2030%20-25%200%20-28%20-11%20-16%20-57%207%20-31%2018%20-46%2042%20-57%20l31%20-16%20-34%202%20c-33%203%20-34%205%20-52%2073%20-21%2081%20-23%2097%20-8%2071%209%20-15%2013%20-16%2020%20-5%205%208%206%2022%203%2031%20-13%2044%2036%2052%2079%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M3692%202775%20c-7%20-8%20-9%20-15%20-4%20-15%205%200%2015%207%2022%2015%2016%2019%20-1%2019%20-18%200z'/%3e%3cpath%20fill='%231078E0'%20d='M3764%202726%20c-8%20-22%20-1%20-28%2026%20-24%20l22%203%20-21%2019%20c-19%2017%20-21%2017%20-27%202z'/%3e%3cpath%20fill='%231078E0'%20d='M3775%202560%20c-27%20-30%20-12%20-34%2015%20-5%2013%2014%2019%2025%2013%2025%20-5%200%20-18%20-9%20-28%20-20z'/%3e%3cpath%20fill='%231078E0'%20d='M3698%202363%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M3610%203150%20c0%20-5%205%20-10%2010%20-10%206%200%2010%205%2010%2010%200%206%20-4%2010%20-10%2010%20-5%200%20-10%20-4%20-10%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M3515%202870%20c-10%20-11%20-28%20-20%20-39%20-21%20-12%200%20-15%20-3%20-8%20-6%2010%20-4%208%20-12%20-10%20-31%20-19%20-21%20-19%20-24%20-3%20-12%2036%2025%2067%2055%2076%2073%2013%2023%206%2022%20-16%20-3z'/%3e%3cpath%20fill='%231078E0'%20d='M1845%202789%20c-6%20-17%20-9%20-19%20-17%20-8%20-8%2011%20-8%2010%20-4%20-5%207%20-22%20-43%20-118%20-57%20-109%20-6%203%20-7%201%20-4%20-5%209%20-14%20-3%20-43%20-14%20-36%20-5%203%20-6%20-3%20-2%20-12%205%20-13%203%20-15%20-7%20-9%20-8%205%20-11%204%20-6%20-3%209%20-14%20-14%20-63%20-27%20-55%20-6%203%20-7%201%20-3%20-5%204%20-6%200%20-24%20-9%20-39%20-15%20-27%20-16%20-27%20-10%20-3%205%2019%204%2022%20-4%2010%20-6%20-8%20-8%20-22%20-6%20-30%205%20-16%20-9%20-45%20-22%20-45%20-4%200%20-19%20-12%20-32%20-27%20-18%20-22%20-21%20-32%20-12%20-42%2014%20-17%20-6%20-69%20-22%20-59%20-6%203%20-7%201%20-3%20-5%209%20-14%20-14%20-63%20-27%20-55%20-6%203%20-7%201%20-3%20-5%209%20-14%20-14%20-63%20-27%20-55%20-6%203%20-7%201%20-3%20-5%209%20-14%20-12%20-65%20-24%20-57%20-5%203%20-7%200%20-4%20-8%203%20-8%20-43%20-111%20-102%20-228%20-132%20-264%20-359%20-737%20-369%20-769%20-6%20-20%204%20-14%2050%2029%2033%2029%2083%2066%20112%2083%2061%2035%2071%2048%2014%2019%20-21%20-11%20-42%20-17%20-46%20-13%20-5%204%20-4%201%200%20-7%206%20-11%204%20-13%20-8%20-8%20-10%204%20-28%202%20-42%20-3%20-29%20-11%20-29%20-10%20-13%2025%208%2018%2014%2022%2019%2013%204%20-7%2011%20-9%2016%20-5%204%205%202%2012%20-5%2016%20-16%2010%20-8%2027%20399%20850%20187%20376%20337%20686%20335%20688%20-2%203%20-7%20-5%20-11%20-18z%20m-204%20-396%20c-11%20-21%20-20%20-35%20-21%20-31%200%2012%2033%2078%2038%2074%202%20-2%20-6%20-21%20-17%20-43z%20m-501%20-1177%20c0%20-2%20-7%20-9%20-15%20-16%20-13%20-11%20-14%20-10%20-9%204%205%2014%2024%2023%2024%2012z%20m-66%20-58%20c-15%20-15%20-29%20-28%20-30%20-28%20-1%200%205%2018%2013%2040%2013%2032%2019%2038%2030%2028%2011%20-9%209%20-16%20-13%20-40z'/%3e%3cpath%20fill='%231078E0'%20d='M1870%202739%20c0%20-5%205%20-7%2010%20-4%206%203%2010%208%2010%2011%200%202%20-4%204%20-10%204%20-5%200%20-10%20-5%20-10%20-11z'/%3e%3cpath%20fill='%231078E0'%20d='M3255%202680%20c4%20-6%2011%20-8%2016%20-5%2014%209%2011%2015%20-7%2015%20-8%200%20-12%20-5%20-9%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6165%202643%20c96%20-7%20203%20-7%20198%200%20-2%204%20-57%206%20-121%205%20-64%20-1%20-99%20-3%20-77%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M6075%202628%20c-3%20-7%20-4%20-328%20-3%20-713%20l3%20-700%205%20713%20c3%20391%204%20712%202%20712%20-1%200%20-5%20-6%20-7%20-12z'/%3e%3cpath%20fill='%231078E0'%20d='M3837%202363%20c-11%20-11%20-8%20-20%207%20-20%208%200%2012%206%209%2014%20-6%2015%20-7%2015%20-16%206z'/%3e%3cpath%20fill='%231078E0'%20d='M13345%202361%20l70%20-6%2048%20-125%20c68%20-179%20135%20-352%20172%20-450%2086%20-223%20125%20-324%20125%20-327%200%20-2%20-41%20-2%20-92%20-1%20l-91%203%20-27%2081%20c-47%20138%20-22%20125%20-237%20122%20l-186%20-3%20-38%20-100%20-38%20-100%20-85%20-3%20c-47%20-1%20-86%200%20-86%204%200%2027%20333%20879%20348%20892%2014%2011%2014%2012%200%2012%20-9%200%20-19%20-9%20-23%20-19%20-4%20-14%20-11%20-18%20-23%20-14%20-14%206%20-15%204%20-4%20-9%2017%20-21%20-24%20-139%20-51%20-146%20-13%20-3%20-15%20-7%20-7%20-12%207%20-5%209%20-16%205%20-29%20-3%20-12%20-10%20-19%20-15%20-16%20-4%203%20-14%20-2%20-21%20-11%20-10%20-13%20-10%20-17%200%20-24%2021%20-12%20-35%20-151%20-58%20-142%20-13%205%20-14%203%20-3%20-10%2011%20-13%208%20-27%20-14%20-82%20-14%20-36%20-30%20-63%20-35%20-60%20-6%203%20-7%20-5%20-3%20-22%205%20-19%204%20-25%20-4%20-20%20-8%205%20-10%201%20-5%20-10%204%20-11%202%20-15%20-4%20-11%20-17%2011%20-38%20-20%20-24%20-36%208%20-10%204%20-32%20-17%20-86%20-15%20-39%20-31%20-68%20-35%20-64%20-5%204%20-5%20-1%20-1%20-11%205%20-14%204%20-17%20-5%20-11%20-10%206%20-11%202%20-6%20-15%204%20-14%203%20-20%20-3%20-16%20-5%203%20-15%20-1%20-22%20-9%20-11%20-14%20-7%20-19%2013%20-16%204%200%207%20-4%207%20-9%200%20-6%207%20-10%2016%20-10%208%200%2012%20-4%209%20-10%20-4%20-6%2022%20-9%2072%20-9%2065%202%2071%203%2038%209%20l-40%207%2046%202%2047%201%2022%2063%20c13%2034%2034%2070%2046%2080%2023%2018%2035%2055%2014%2042%20-5%20-3%20-10%201%20-10%209%200%2014%2024%2016%20184%2016%20l185%200%2021%20-57%20c14%20-37%2020%20-70%2016%20-91%20-4%20-26%20-2%20-33%209%20-28%208%203%2017%20-3%2020%20-15%206%20-17%2016%20-19%20106%20-19%2057%200%2099%204%2099%2010%200%205%20-9%2033%20-21%2062%20-17%2043%20-18%2057%20-9%2072%2011%2017%209%2023%20-13%2040%20-14%2012%20-40%2054%20-57%2095%20-32%2078%20-36%20101%20-20%20101%206%200%2010%205%2010%2010%200%206%20-8%2010%20-17%208%20-14%20-2%20-28%2025%20-70%20136%20-29%2076%20-51%20148%20-50%20160%201%2011%20-3%2020%20-10%2019%20-6%20-1%20-24%2032%20-39%2075%20-15%2042%20-33%2092%20-40%20110%20l-13%2032%20-73%20-2%20-73%20-2%2070%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M13897%202363%20c-4%20-3%20-7%20-202%20-7%20-442%200%20-285%20-4%20-431%20-10%20-421%20-6%209%20-10%2010%20-10%203%200%20-6%20-3%20-18%20-6%20-27%20-4%20-10%203%20-19%2020%20-27%2014%20-7%2023%20-16%2020%20-20%20-3%20-5%2034%20-8%2083%20-7%2073%201%2080%202%2043%208%20l-45%207%2053%201%2052%202%200%20459%20c0%20293%20-4%20462%20-10%20466%20-5%203%20-18%201%20-27%20-5%20-16%20-9%20-15%20-10%205%20-5%20l22%206%200%20-455%200%20-456%20-90%200%20-90%200%202%20453%203%20452%2055%206%2055%206%20-56%201%20c-31%201%20-59%20-1%20-62%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M13872%202255%20c0%20-16%202%20-22%205%20-12%202%209%202%2023%200%2030%20-3%206%20-5%20-1%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M5228%202183%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5310%202180%20c-52%20-6%20-51%20-7%2030%20-8%2047%20-1%20103%20-4%20125%20-7%20l40%20-5%20-35%209%20c-60%2015%20-103%2018%20-160%2011z'/%3e%3cpath%20fill='%231078E0'%20d='M8468%202183%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M7265%202171%20c115%20-8%20164%20-18%20243%20-52%2026%20-11%2042%20-15%2036%20-9%20-6%206%20-44%2023%20-85%2037%20-61%2021%20-95%2027%20-189%2029%20l-115%202%20110%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M8505%202175%20c6%20-2%2060%20-5%20120%20-7%2061%20-3%2099%20-1%2085%203%20-24%207%20-225%2011%20-205%204z'/%3e%3cpath%20fill='%231078E0'%20d='M9635%202171%20c-16%20-3%2040%20-6%20124%20-6%2083%200%20142%203%20129%207%20-29%208%20-214%208%20-253%20-1z'/%3e%3cpath%20fill='%231078E0'%20d='M11890%202170%20c63%20-4%20130%20-13%20149%20-19%2019%20-6%2037%20-9%2039%20-7%2012%2012%20-87%2028%20-188%2031%20l-115%203%20115%20-8z'/%3e%3cpath%20fill='%231078E0'%20d='M5157%202158%20c2%20-5%20-1%20-8%20-8%20-8%20-7%200%20-10%20-2%20-8%20-5%203%20-2%2027%202%2054%209%20l50%2014%20-46%20-2%20c-26%200%20-45%20-4%20-42%20-8z'/%3e%3cpath%20fill='%231078E0'%20d='M7108%202163%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M8458%202163%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8760%202160%20c-21%20-7%20-22%20-8%20-5%20-9%2011%20-1%2054%20-17%2094%20-36%2089%20-43%20183%20-134%20226%20-218%2029%20-57%2030%20-58%2011%20-73%20-21%20-15%20-10%20-20%2013%20-5%209%206%2011%2018%207%2034%20-4%2016%20-1%2028%207%2031%207%204%207%205%20-3%203%20-8%20-2%20-29%2019%20-50%2052%20-49%2075%20-131%20147%20-212%20186%20-37%2018%20-64%2035%20-61%2039%207%207%207%207%20-27%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M11060%202160%20c-15%20-5%20-1%20-6%2037%20-3%2033%203%2073%203%2087%20-1%20l26%20-6%202%20-148%20c1%20-81%203%20-122%205%20-92%203%2038%207%2050%2013%2040%207%20-11%2010%20-7%2010%2015%200%2023%20-3%2027%20-10%2015%20-7%20-10%20-10%2015%20-10%2081%200%2092%20-1%2097%20-22%20103%20-31%208%20-107%206%20-138%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M11738%202163%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M13305%202153%20c-4%20-10%20-29%20-79%20-55%20-153%20-27%20-74%20-53%20-147%20-59%20-162%20-10%20-25%20-8%20-28%2012%20-28%2031%200%2051%2015%2042%2030%20-6%2010%20-11%209%20-21%20-5%20-8%20-10%20-16%20-16%20-19%20-13%20-8%208%2026%2098%2035%2093%205%20-3%2014%204%2020%2015%207%2013%207%2020%200%2020%20-15%200%20-12%2017%2024%20114%20l32%2088%2021%20-55%20c21%20-57%2020%20-107%20-1%20-107%20-6%200%20-4%20-4%204%20-10%209%20-5%2019%20-5%2026%201%209%207%2019%20-10%2037%20-66%2025%20-72%2025%20-75%206%20-75%20-10%200%20-19%20-4%20-19%20-9%200%20-5%20-8%20-12%20-17%20-14%20-10%20-3%204%20-5%2031%20-6%2035%20-1%2047%202%2043%2012%20-2%206%20-30%2084%20-62%20172%20-32%2088%20-61%20164%20-65%20168%20-4%205%20-11%200%20-15%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M730%202150%20c0%20-5%205%20-10%2011%20-10%205%200%207%205%204%2010%20-3%206%20-8%2010%20-11%2010%20-2%200%20-4%20-4%20-4%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M5518%202153%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M7035%202145%20c-39%20-17%20-21%20-18%2025%200%2019%207%2028%2014%2020%2014%20-8%200%20-28%20-6%20-45%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M8390%202150%20c-11%20-8%20-7%20-9%2015%20-4%2037%208%2045%2014%2019%2014%20-10%200%20-26%20-5%20-34%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M9513%202130%20c-35%20-16%20-63%20-32%20-63%20-35%200%20-3%2019%204%2042%2016%2023%2012%2058%2027%2077%2034%2020%208%2029%2014%2021%2014%20-8%201%20-43%20-12%20-77%20-29z'/%3e%3cpath%20fill='%231078E0'%20d='M9921%202156%20c2%20-2%2018%20-6%2034%20-10%2022%20-5%2026%20-4%2015%204%20-14%209%20-59%2015%20-49%206z'/%3e%3cpath%20fill='%231078E0'%20d='M11698%202153%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M10510%201565%20l0%20-585%20153%202%20152%202%20-148%203%20-147%204%202%20579%20c2%20319%200%20580%20-4%20580%20-5%200%20-8%20-263%20-8%20-585z'/%3e%3cpath%20fill='%231078E0'%20d='M10623%202143%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M10768%202143%20l32%20-4%200%20-90%20c0%20-50%203%20-88%208%20-86%204%203%205%2045%202%2094%20l-5%2088%20-35%201%20-35%202%2033%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11650%202140%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M5090%202125%20c-14%20-8%20-20%20-14%20-15%20-14%206%200%2021%206%2035%2014%2014%208%2021%2014%2015%2014%20-5%200%20-21%20-6%20-35%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M5630%202109%20c30%20-16%2075%20-49%20100%20-72%20l45%20-42%20-40%2043%20c-37%2041%20-128%20102%20-150%20102%20-5%200%2015%20-14%2045%20-31z'/%3e%3cpath%20fill='%231078E0'%20d='M8323%202125%20c-18%20-8%20-33%20-16%20-33%20-19%200%20-5%2071%2022%2079%2030%209%208%20-15%203%20-46%20-11z'/%3e%3cpath%20fill='%231078E0'%20d='M10035%202113%20c28%20-14%2068%20-39%2090%20-55%20l40%20-30%20-35%2032%20c-33%2030%20-120%2081%20-137%2080%20-4%20-1%2015%20-13%2042%20-27z'/%3e%3cpath%20fill='%231078E0'%20d='M10958%202124%20c-39%20-21%20-35%20-28%205%20-8%2037%2019%2044%2024%2031%2024%20-5%20-1%20-21%20-8%20-36%20-16z'/%3e%3cpath%20fill='%231078E0'%20d='M12140%202110%20c31%20-15%2080%20-50%20110%20-76%2030%20-27%2045%20-37%2032%20-23%20-12%2014%20-20%2029%20-17%2032%203%204%202%205%20-1%202%20-4%20-2%20-23%208%20-43%2024%20-37%2029%20-114%2071%20-128%2071%20-4%20-1%2017%20-14%2047%20-30z'/%3e%3cpath%20fill='%231078E0'%20d='M3610%202120%20c0%20-5%205%20-10%2010%20-10%206%200%2010%205%2010%2010%200%206%20-4%2010%20-10%2010%20-5%200%20-10%20-4%20-10%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6958%202114%20c-39%20-21%20-35%20-28%205%20-8%2037%2019%2044%2024%2031%2024%20-5%20-1%20-21%20-8%20-36%20-16z'/%3e%3cpath%20fill='%231078E0'%20d='M10820%202120%20c0%20-5%205%20-10%2010%20-10%206%200%2010%205%2010%2010%200%206%20-4%2010%20-10%2010%20-5%200%20-10%20-4%20-10%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M11586%202121%20c2%20-2%20-4%20-10%20-14%20-18%20-11%20-9%20-5%20-8%2018%203%2045%2021%2046%2022%2016%2020%20-13%200%20-23%20-3%20-20%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M5023%202084%20l-28%20-25%2033%2022%20c17%2013%2032%2024%2032%2026%200%208%20-11%201%20-37%20-23z'/%3e%3cpath%20fill='%231078E0'%20d='M7560%202098%20c3%20-3%2028%20-23%2055%20-43%2029%20-22%2041%20-28%2028%20-14%20-12%2013%20-37%2033%20-55%2043%20-18%2011%20-31%2017%20-28%2014z'/%3e%3cpath%20fill='%231078E0'%20d='M8249%202079%20l-24%20-20%2028%2017%20c15%209%2027%2018%2027%2020%200%208%20-8%204%20-31%20-17z'/%3e%3cpath%20fill='%231078E0'%20d='M10875%202058%20l-40%20-43%2043%2040%20c39%2036%2047%2045%2039%2045%20-2%200%20-21%20-19%20-42%20-42z'/%3e%3cpath%20fill='%231078E0'%20d='M9409%202063%20l-24%20-28%2028%2024%20c15%2014%2027%2026%2027%2028%200%208%20-8%201%20-31%20-24z'/%3e%3cpath%20fill='%231078E0'%20d='M10827%202077%20c-11%20-29%20-9%20-53%204%20-40%206%206%209%2021%207%2034%20-3%2021%20-4%2022%20-11%206z'/%3e%3cpath%20fill='%231078E0'%20d='M13315%202080%20c-4%20-7%201%20-21%2014%20-33%2024%20-24%2027%20-14%207%2022%20-9%2017%20-15%2020%20-21%2011z'/%3e%3cpath%20fill='%231078E0'%20d='M13550%202070%20c0%20-5%205%20-10%2011%20-10%205%200%207%205%204%2010%20-3%206%20-8%2010%20-11%2010%20-2%200%20-4%20-4%20-4%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M4973%202063%20c4%20-3%20-1%20-16%20-10%20-27%20-18%20-21%20-18%20-21%204%20-2%2020%2016%2023%2036%206%2036%20-4%200%20-3%20-3%200%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M6839%202029%20l-44%20-41%2048%2038%20c26%2021%2047%2040%2047%2041%200%208%20-11%200%20-51%20-38z'/%3e%3cpath%20fill='%231078E0'%20d='M11453%202008%20c-33%20-35%20-65%20-74%20-72%20-88%20l-12%20-25%2018%2025%20c10%2014%2044%2053%2077%2088%2033%2034%2057%2062%2054%2062%20-3%200%20-32%20-28%20-65%20-62z'/%3e%3cpath%20fill='%231078E0'%20d='M8169%202013%20c-39%20-42%20-90%20-105%20-63%20-78%2030%2029%20116%20125%20113%20125%20-3%200%20-25%20-21%20-50%20-47z'/%3e%3cpath%20fill='%231078E0'%20d='M7685%202000%20c5%20-8%2017%20-24%2026%20-35%2010%20-11%2034%20-47%2053%20-79%2020%20-33%2036%20-55%2036%20-50%200%206%20-14%2032%20-31%2059%20-17%2027%20-32%2056%20-34%2065%20-1%208%20-7%2015%20-12%2015%20-6%200%20-19%209%20-29%2020%20-11%2012%20-15%2014%20-9%205z'/%3e%3cpath%20fill='%231078E0'%20d='M9337%201988%20c-33%20-44%20-50%20-78%20-43%20-86%203%20-3%206%20-1%206%205%200%206%2015%2034%2034%2062%2039%2057%2040%2069%203%2019z'/%3e%3cpath%20fill='%231078E0'%20d='M10160%202016%20c0%20-2%208%20-10%2018%20-17%2015%20-13%2016%20-12%203%204%20-13%2016%20-21%2021%20-21%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M4917%202002%20c16%20-10%20-37%20-100%20-57%20-95%20-10%203%20-11%202%20-4%20-4%207%20-4%2013%20-17%2015%20-27%202%20-11%209%20-20%2014%20-21%206%20-1%207%200%203%203%20-16%208%20-7%2040%2025%2093%2031%2052%2032%2055%2013%2057%20-12%200%20-16%20-2%20-9%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5792%201945%20c12%20-24%2023%20-43%2026%20-41%204%205%20-36%2086%20-43%2086%20-3%200%205%20-20%2017%20-45z'/%3e%3cpath%20fill='%231078E0'%20d='M6766%201949%20c-15%20-17%20-33%20-45%20-42%20-63%20-8%20-17%20-9%20-22%20-2%20-12%207%2010%2028%2038%2045%2062%2038%2051%2037%2058%20-1%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M10207%201945%20c9%20-19%2018%20-33%2021%20-31%204%205%20-26%2066%20-33%2066%20-3%200%203%20-16%2012%20-35z'/%3e%3cpath%20fill='%231078E0'%20d='M12317%201955%20c34%20-50%2062%20-110%2083%20-182%2011%20-38%2018%20-51%2014%20-30%20-3%2021%20-8%2046%20-11%2054%20-5%2012%20-3%2014%207%208%208%20-5%2011%20-3%209%204%20-2%206%20-7%2010%20-11%209%20-4%20-2%20-23%2029%20-43%2068%20-19%2040%20-43%2078%20-52%2085%20-13%2010%20-12%206%204%20-16z'/%3e%3cpath%20fill='%231078E0'%20d='M9743%201933%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11853%201933%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M5251%201921%20c-11%20-7%20-9%20-10%208%20-16%2013%20-4%2025%20-4%2028%20-1%204%203%20-2%206%20-13%207%20-15%201%20-13%203%206%209%2021%207%2021%208%205%209%20-11%200%20-26%20-3%20-34%20-8z'/%3e%3cpath%20fill='%231078E0'%20d='M5405%201920%20c12%20-5%2014%20-9%206%20-9%20-8%20-1%20-12%20-3%20-10%20-6%203%20-2%2016%20-1%2029%202%2022%206%2023%207%204%2014%20-27%2011%20-54%2010%20-29%20-1z'/%3e%3cpath%20fill='%231078E0'%20d='M9660%201920%20c-11%20-8%20-7%20-9%2015%20-4%2037%208%2045%2014%2019%2014%20-10%200%20-26%20-5%20-34%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M9808%201923%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11798%201923%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M11928%201923%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8080%201900%20c-6%20-11%20-8%20-20%20-6%20-20%203%200%2010%209%2016%2020%206%2011%208%2020%206%2020%20-3%200%20-10%20-9%20-16%20-20z'/%3e%3cpath%20fill='%231078E0'%20d='M9835%201909%20c-16%20-8%20-15%20-8%208%20-4%2016%203%2026%202%2024%20-2%20-3%20-5%203%20-9%2014%20-9%2019%200%2019%201%203%2013%20-20%2015%20-22%2015%20-49%202z'/%3e%3cpath%20fill='%231078E0'%20d='M5179%201873%20l-34%20-38%2040%2035%20c22%2019%2042%2036%2044%2038%202%201%200%202%20-5%202%20-6%200%20-26%20-17%20-45%20-37z'/%3e%3cpath%20fill='%231078E0'%20d='M7228%201903%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M8531%201901%20c-13%20-3%2014%20-6%2059%20-6%2045%200%2072%203%2059%206%20-13%204%20-40%207%20-59%207%20-19%200%20-46%20-3%20-59%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M9597%201880%20c-19%20-16%20-40%20-43%20-47%20-59%20-6%20-17%20-19%20-32%20-28%20-34%20-15%20-4%20-15%20-5%200%20-6%2011%20-1%2025%2014%2038%2038%2010%2022%2034%2051%2052%2065%2018%2014%2030%2026%2026%2026%20-4%200%20-23%20-13%20-41%20-30z'/%3e%3cpath%20fill='%231078E0'%20d='M11928%201903%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M11993%201895%20c0%20-14%2024%20-28%2039%20-22%204%201%2022%20-11%2040%20-28%20l33%20-30%20-30%2033%20c-38%2043%20-82%2067%20-82%2047z'/%3e%3cpath%20fill='%231078E0'%20d='M5506%201869%20c16%20-20%2031%20-34%2033%20-32%203%202%20-10%2018%20-29%2036%20l-34%2032%2030%20-36z'/%3e%3cpath%20fill='%231078E0'%20d='M7112%201874%20c-28%20-14%20-65%20-42%20-83%20-62%20-36%20-41%20-79%20-127%20-78%20-157%200%20-11%207%201%2015%2026%2010%2033%2020%2048%2036%2053%2018%205%2020%208%209%2015%20-11%207%20-10%2014%208%2040%2030%2041%20108%2096%2085%2059%20-4%20-7%20-3%20-8%205%20-4%206%204%209%2011%206%2016%20-3%205%2016%2016%2042%2024%2026%208%2039%2015%2027%2015%20-11%201%20-43%20-11%20-72%20-25z'/%3e%3cpath%20fill='%231078E0'%20d='M7308%201893%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M10236%201875%20c8%20-37%2014%20-45%2014%20-19%200%2010%20-5%2026%20-10%2034%20-8%2011%20-9%207%20-4%20-15z'/%3e%3cpath%20fill='%231078E0'%20d='M11679%201863%20c-39%20-35%20-79%20-99%20-79%20-125%200%20-7%2011%2011%2025%2040%2016%2035%2029%2051%2036%2046%207%20-4%209%20-3%205%204%20-3%206%2011%2024%2031%2041%2021%2017%2034%2031%2030%2031%20-4%200%20-25%20-17%20-48%20-37z'/%3e%3cpath%20fill='%231078E0'%20d='M5821%201874%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M7238%201883%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M7369%201874%20c19%20-8%2041%20-19%2048%20-26%207%20-6%2013%20-8%2013%20-4%200%2010%20-63%2046%20-80%2046%20-8%20-1%200%20-7%2019%20-16z'/%3e%3cpath%20fill='%231078E0'%20d='M8588%201883%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M9280%201876%20c0%20-8%204%20-17%209%20-20%205%20-4%207%203%204%2014%20-6%2023%20-13%2026%20-13%206z'/%3e%3cpath%20fill='%231078E0'%20d='M9928%201866%20c26%20-33%2028%20-48%207%20-40%20-8%204%20-15%202%20-15%20-4%200%20-15%2030%20-24%2031%20-9%201%207%205%201%209%20-13%206%20-18%208%20-20%209%20-7%201%2023%20-23%2070%20-46%2088%20-12%2010%20-11%205%205%20-15z'/%3e%3cpath%20fill='%231078E0'%20d='M11350%201869%20c-7%20-11%20-10%20-23%20-7%20-25%202%20-2%209%207%2015%2021%2014%2030%207%2033%20-8%204z'/%3e%3cpath%20fill='%231078E0'%20d='M8406%201839%20c-25%20-23%20-51%20-51%20-57%20-63%20-6%20-11%202%20-6%2017%2013%2015%2018%2045%2046%2067%2062%2022%2016%2035%2029%2030%2029%20-6%200%20-31%20-18%20-57%20-41z'/%3e%3cpath%20fill='%231078E0'%20d='M8734%201862%20c3%20-6%203%20-12%20-1%20-15%20-5%20-2%20-2%20-2%205%200%2022%205%2036%20-8%2021%20-19%20-11%20-8%20-10%20-9%203%20-5%2024%208%2047%20-21%2027%20-35%20-11%20-8%20-11%20-9%203%20-5%2012%204%2023%20-5%2037%20-28%2019%20-32%2022%20-34%2051%20-24%2017%206%2029%2013%2027%2015%20-2%203%20-16%200%20-31%20-5%20-23%20-9%20-27%20-7%20-41%2018%20-20%2039%20-63%2089%20-87%20102%20-13%207%20-18%207%20-14%201z'/%3e%3cpath%20fill='%231078E0'%20d='M11005%201861%20c-11%20-4%2018%20-6%2065%20-4%20116%206%20131%2011%2035%2011%20-44%200%20-89%20-3%20-100%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M5832%201825%20c0%20-16%202%20-22%205%20-12%202%209%202%2023%200%2030%20-3%206%20-5%20-1%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M6689%201816%20c-8%20-23%20-16%20-31%20-20%20-24%20-5%207%20-11%209%20-16%205%20-4%20-5%20-2%20-12%205%20-16%208%20-5%2011%20-18%207%20-37%20-3%20-16%205%200%2019%2036%2014%2035%2023%2066%2021%2068%20-2%202%20-9%20-13%20-16%20-32z'/%3e%3cpath%20fill='%231078E0'%20d='M8031%201795%20c-12%20-31%20-21%20-63%20-21%20-73%200%20-9%2011%2015%2024%2053%2029%2084%2027%2099%20-3%2020z'/%3e%3cpath%20fill='%231078E0'%20d='M10919%201818%20c-23%20-18%20-49%20-44%20-58%20-58%20-9%20-14%203%20-5%2026%2018%2026%2028%2046%2041%2054%2036%208%20-4%2010%20-3%205%205%20-5%208%20-1%2011%2016%208%2012%20-2%2017%20-2%209%200%20-12%204%20-12%206%200%2014%209%205%2010%209%202%209%20-6%200%20-30%20-15%20-54%20-32z'/%3e%3cpath%20fill='%231078E0'%20d='M11038%201843%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M11148%201843%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M4953%201828%20c15%20-5%2025%20-13%2023%20-17%20-2%20-3%2014%20-7%2037%20-7%20l42%20-1%20-55%2018%20c-57%2019%20-96%2025%20-47%207z'/%3e%3cpath%20fill='%231078E0'%20d='M7460%201810%20c11%20-16%2026%20-33%2032%20-36%207%20-4%20-1%209%20-16%2029%20-34%2044%20-46%2050%20-16%207z'/%3e%3cpath%20fill='%231078E0'%20d='M10252%201800%20c0%20-19%202%20-27%205%20-17%202%209%202%2025%200%2035%20-3%209%20-5%201%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M11326%201815%20c-3%20-9%20-6%20-22%20-5%20-28%200%20-7%205%20-1%2010%2012%205%2013%208%2026%205%2028%20-2%202%20-6%20-3%20-10%20-12z'/%3e%3cpath%20fill='%231078E0'%20d='M5547%201770%20c3%20-30%207%20-57%209%20-59%208%20-9%202%2075%20-6%2094%20-5%2012%20-6%20-1%20-3%20-35z'/%3e%3cpath%20fill='%231078E0'%20d='M7800%201815%20c0%20-5%205%20-17%2010%20-25%205%20-8%2010%20-10%2010%20-5%200%206%20-5%2017%20-10%2025%20-5%208%20-10%2011%20-10%205z'/%3e%3cpath%20fill='%231078E0'%20d='M9408%201813%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5130%201802%20c0%20-7%20-10%20-13%20-22%20-13%20-19%20-1%20-20%20-2%20-4%20-6%2020%20-5%2044%2012%2033%2024%20-4%203%20-7%201%20-7%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M12106%201797%20c3%20-10%209%20-15%2012%20-12%203%203%200%2011%20-7%2018%20-10%209%20-11%208%20-5%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M13273%201803%20c15%20-2%2037%20-2%2050%200%2012%202%200%204%20-28%204%20-27%200%20-38%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M9478%201793%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8982%201781%20c-11%20-7%20-10%20-9%203%20-14%209%20-4%2014%20-3%2010%202%20-3%205%201%2012%207%2014%207%203%209%206%203%206%20-5%200%20-16%20-3%20-23%20-8z'/%3e%3cpath%20fill='%231078E0'%20d='M5867%201773%20c-4%20-3%20-7%20-148%20-7%20-321%201%20-173%204%20-312%207%20-309%204%205%2013%20637%208%20637%20-1%200%20-5%20-3%20-8%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M5842%201384%20l-2%20-392%20-117%20-4%20c-155%20-5%20-153%20-6%20-155%2051%20-1%2046%20-1%2046%20-5%207%20-3%20-22%20-2%20-50%201%20-63%206%20-23%208%20-23%20134%20-21%20l127%202%20-95%206%20-95%206%20103%202%20c71%201%20104%206%20107%2015%203%206%204%20185%202%20397%20l-2%20385%20-3%20-391z'/%3e%3cpath%20fill='%231078E0'%20d='M7821%201760%20c0%20-8%204%20-24%208%20-34%207%20-19%208%20-18%2014%204%203%2013%204%2026%202%2029%20-3%202%20-5%20-2%20-6%20-10%200%20-8%20-4%20-6%20-9%206%20-5%2013%20-9%2014%20-9%205z'/%3e%3cpath%20fill='%231078E0'%20d='M8930%201760%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M10280%201437%20c0%20-252%20-3%20-343%20-12%20-358%20-10%20-17%20-10%20-23%200%20-26%206%20-3%2012%20-16%2012%20-29%200%20-13%204%20-24%209%20-24%2011%200%2011%20744%200%20762%20-5%207%20-9%20-139%20-9%20-325z'/%3e%3cpath%20fill='%231078E0'%20d='M11300%201716%20c-6%20-31%20-9%20-68%20-7%20-83%203%20-25%204%20-24%206%207%201%2019%206%2055%2012%2079%205%2024%208%2046%205%2048%20-2%203%20-9%20-20%20-16%20-51z'/%3e%3cpath%20fill='%231078E0'%20d='M12126%201738%20l6%20-38%20-265%200%20c-203%200%20-267%203%20-270%2013%20-3%207%20-6%205%20-6%20-5%20-1%20-17%2018%20-18%20274%20-18%20l275%200%20-1%2023%20c0%2012%20-4%2031%20-9%2042%20-7%2014%20-8%209%20-4%20-17z'/%3e%3cpath%20fill='%231078E0'%20d='M7511%201740%20c14%20-31%2019%20-36%2019%20-24%200%206%20-7%2019%20-16%2030%20-14%2018%20-14%2018%20-3%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M9961%201724%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M5504%201715%20c4%20-11%20-2%20-15%20-21%20-15%20-14%200%20-24%20-3%20-20%20-6%203%20-4%2022%20-3%2042%200%2031%206%2034%209%2021%2021%20-19%2019%20-30%2019%20-22%200z'/%3e%3cpath%20fill='%231078E0'%20d='M8311%201699%20c-6%20-18%20-11%20-39%20-10%20-48%200%20-9%207%204%2014%2029%2016%2051%2013%2067%20-4%2019z'/%3e%3cpath%20fill='%231078E0'%20d='M9928%201723%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5408%201703%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M9895%201700%20c-27%20-7%20-28%20-8%20-5%20-8%2014%200%2034%203%2045%208%2025%2011%202%2011%20-40%200z'/%3e%3cpath%20fill='%231078E0'%20d='M6651%201684%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M7843%201665%20c0%20-22%202%20-30%204%20-17%202%2012%202%2030%200%2040%20-3%209%20-5%20-1%20-4%20-23z'/%3e%3cpath%20fill='%231078E0'%20d='M8002%201675%20c0%20-16%202%20-22%205%20-12%202%209%202%2023%200%2030%20-3%206%20-5%20-1%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M12451%201684%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M5199%201682%20c9%20-7%200%20-11%20-34%20-16%20-26%20-4%20-45%20-9%20-43%20-12%203%20-2%2026%20-1%2052%202%2044%206%2057%2023%2025%2032%20-11%203%20-12%202%200%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5383%201683%20c15%20-2%2037%20-2%2050%200%2012%202%200%204%20-28%204%20-27%200%20-38%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M8327%201684%20c-4%20-4%20-7%20-14%20-7%20-23%200%20-11%203%20-12%2011%20-4%206%206%2010%2016%207%2023%20-2%206%20-7%208%20-11%204z'/%3e%3cpath%20fill='%231078E0'%20d='M9793%201683%20c15%20-2%2037%20-2%2050%200%2012%202%200%204%20-28%204%20-27%200%20-38%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M12420%201590%20l0%20-100%20-415%200%20-415%200%201%20-32%20c2%20-31%202%20-31%206%20-5%20l4%2027%20415%200%20414%200%200%20105%20c0%2058%20-2%20105%20-5%20105%20-3%200%20-5%20-45%20-5%20-100z'/%3e%3cpath%20fill='%231078E0'%20d='M5258%201673%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M9678%201673%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M10821%201664%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M13700%201670%20c0%20-5%205%20-10%2010%20-10%206%200%2010%205%2010%2010%200%206%20-4%2010%20-10%2010%20-5%200%20-10%20-4%20-10%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6621%201654%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M7542%201645%20c0%20-16%202%20-22%205%20-12%202%209%202%2023%200%2030%20-3%206%20-5%20-1%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M9603%201663%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M13871%201654%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M9538%201653%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M12441%201644%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M5065%201640%20c-13%20-5%20-14%20-9%20-5%20-9%208%200%2024%204%2035%209%2013%205%2014%209%205%209%20-8%200%20-24%20-4%20-35%20-9z'/%3e%3cpath%20fill='%231078E0'%20d='M6644%201560%20c0%20-52%201%20-74%203%20-47%202%2026%202%2068%200%2095%20-2%2026%20-3%204%20-3%20-48z'/%3e%3cpath%20fill='%231078E0'%20d='M10812%201610%20c0%20-19%202%20-27%205%20-17%202%209%202%2025%200%2035%20-3%209%20-5%201%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M13450%201630%20c0%20-5%207%20-10%2015%20-10%208%200%2015%205%2015%2010%200%206%20-7%2010%20-15%2010%20-8%200%20-15%20-4%20-15%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M4998%201614%20c-39%20-21%20-35%20-28%205%20-8%2037%2019%2044%2024%2031%2024%20-5%20-1%20-21%20-8%20-36%20-16z'/%3e%3cpath%20fill='%231078E0'%20d='M9430%201620%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6941%201569%20c1%20-30%205%20-67%209%20-84%204%20-17%205%205%202%2050%20-6%2093%20-13%20114%20-11%2034z'/%3e%3cpath%20fill='%231078E0'%20d='M7853%201565%20c0%20-33%202%20-45%204%20-27%202%2018%202%2045%200%2060%20-2%2015%20-4%200%20-4%20-33z'/%3e%3cpath%20fill='%231078E0'%20d='M7993%201550%20c0%20-41%202%20-58%204%20-37%202%2020%202%2054%200%2075%20-2%2020%20-4%203%20-4%20-38z'/%3e%3cpath%20fill='%231078E0'%20d='M8293%201565%20c0%20-33%202%20-45%204%20-27%202%2018%202%2045%200%2060%20-2%2015%20-4%200%20-4%20-33z'/%3e%3cpath%20fill='%231078E0'%20d='M7533%201570%20c0%20-25%202%20-35%204%20-22%202%2012%202%2032%200%2045%20-2%2012%20-4%202%20-4%20-23z'/%3e%3cpath%20fill='%231078E0'%20d='M7552%201580%20c-1%20-19%20-4%20-53%20-7%20-75%20l-5%20-40%2011%2040%20c5%2022%208%2056%206%2075%20l-4%2035%20-1%20-35z'/%3e%3cpath%20fill='%231078E0'%20d='M9363%201581%20c-37%20-27%20-70%20-65%20-87%20-101%20-4%20-8%201%20-4%2011%2010%2023%2033%2072%2081%20103%20102%2014%209%2022%2017%2019%2017%20-3%201%20-24%20-12%20-46%20-28z'/%3e%3cpath%20fill='%231078E0'%20d='M4901%201534%20c-28%20-30%20-51%20-60%20-51%20-65%200%20-6%20-3%20-8%20-7%20-6%20-5%203%20-9%20-11%20-9%20-32%20l-2%20-36%2015%2043%20c8%2023%2037%2067%2065%2097%2027%2030%2048%2055%2045%2055%20-3%200%20-28%20-25%20-56%20-56z'/%3e%3cpath%20fill='%231078E0'%20d='M12442%201515%20c0%20-16%202%20-22%205%20-12%202%209%202%2023%200%2030%20-3%206%20-5%20-1%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M11292%201480%20c0%20-19%202%20-27%205%20-17%202%209%202%2025%200%2035%20-3%209%20-5%201%20-5%20-18z'/%3e%3cpath%20fill='%231078E0'%20d='M5527%201493%20c18%20-4%2023%20-12%2026%20-51%20l3%20-47%202%2053%20c2%2051%201%2052%20-25%2051%20-23%20-1%20-24%20-2%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M7840%201471%20c0%20-16%20-9%20-58%20-20%20-92%20-10%20-35%20-17%20-65%20-15%20-68%203%20-2%205%201%205%208%200%207%205%209%2012%205%207%20-4%208%20-3%204%204%20-4%206%20-4%2023%200%2037%204%2018%209%2023%2014%2015%205%20-9%209%20-9%2014%20-1%204%206%202%2011%20-3%2011%20-8%200%20-9%2019%20-5%2055%204%2030%204%2055%200%2055%20-3%200%20-6%20-13%20-6%20-29z'/%3e%3cpath%20fill='%231078E0'%20d='M9885%201490%20c-47%20-7%20-46%20-7%2015%20-5%2063%203%2064%203%2035%20-11%20-29%20-14%20-29%20-14%20-3%20-9%2016%203%2028%200%2031%20-8%203%20-6%206%200%206%2016%201%2029%203%2029%20-84%2017z'/%3e%3cpath%20fill='%231078E0'%20d='M5428%201483%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M6970%201476%20c0%20-9%205%20-16%2010%20-16%206%200%2010%204%2010%209%200%206%20-4%2013%20-10%2016%20-5%203%20-10%20-1%20-10%20-9z'/%3e%3cpath%20fill='%231078E0'%20d='M7861%201474%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M8301%201480%20c0%20-19%2017%20-59%2018%20-42%201%207%206%2010%2011%207%206%20-3%2010%201%2010%209%200%2018%20-20%2032%20-21%2014%200%20-7%20-4%20-4%20-9%207%20-5%2013%20-9%2014%20-9%205z'/%3e%3cpath%20fill='%231078E0'%20d='M1868%201475%20c-4%20-4%20-31%20-10%20-60%20-15%20-43%20-6%20-33%20-7%2052%20-6%2058%200%20143%20-3%20190%20-7%2047%20-5%2083%20-7%2080%20-4%20-3%203%20-52%2010%20-110%2016%20-58%206%20-114%2013%20-125%2016%20-11%204%20-23%203%20-27%200z'/%3e%3cpath%20fill='%231078E0'%20d='M5328%201471%20c12%20-7%2062%20-4%2062%205%200%202%20-17%204%20-37%204%20-24%200%20-33%20-3%20-25%20-9z'/%3e%3cpath%20fill='%231078E0'%20d='M9758%201473%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M5235%201460%20c-14%20-7%20-8%20-8%2020%20-3%2022%203%2042%207%2044%209%209%208%20-45%202%20-64%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5428%201463%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M5495%201460%20c4%20-6%2011%20-8%2016%20-5%2014%209%2011%2015%20-7%2015%20-8%200%20-12%20-5%20-9%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M7976%201453%20c-6%20-14%20-5%20-15%205%20-6%207%207%2010%2015%207%2018%20-3%203%20-9%20-2%20-12%20-12z'/%3e%3cpath%20fill='%231078E0'%20d='M8002%201450%20c0%20-14%202%20-19%205%20-12%202%206%202%2018%200%2025%20-3%206%20-5%201%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M9688%201463%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11823%201463%20c108%20-2%20286%20-2%20395%200%20108%201%2019%202%20-198%202%20-217%200%20-306%20-1%20-197%20-2z'/%3e%3cpath%20fill='%231078E0'%20d='M6652%201440%20c0%20-14%202%20-19%205%20-12%202%206%202%2018%200%2025%20-3%206%20-5%201%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M7513%201409%20c-12%20-27%20-20%20-49%20-18%20-49%208%200%2046%2081%2043%2090%20-2%204%20-13%20-14%20-25%20-41z'/%3e%3cpath%20fill='%231078E0'%20d='M9256%201445%20c-9%20-26%20-7%20-32%205%20-12%206%2010%209%2021%206%2023%20-2%203%20-7%20-2%20-11%20-11z'/%3e%3cpath%20fill='%231078E0'%20d='M9646%201449%20c4%20-7%200%20-9%20-14%20-5%20-15%205%20-31%20-2%20-56%20-25%20-20%20-17%20-36%20-35%20-36%20-39%200%20-4%2015%207%2034%2026%2031%2031%2065%2047%2051%2024%20-3%20-5%20-2%20-10%204%20-10%205%200%2013%205%2016%2010%203%206%2018%2010%2033%2011%2024%200%2025%201%207%209%20-29%2012%20-47%2012%20-39%20-1z'/%3e%3cpath%20fill='%231078E0'%20d='M1708%201443%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M5185%201440%20c-3%20-6%201%20-7%209%20-4%2018%207%2021%2014%207%2014%20-6%200%20-13%20-4%20-16%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M1567%201414%20c-44%20-14%20-77%20-27%20-74%20-30%202%20-3%2017%200%2033%207%2016%206%2061%2019%2099%2029%2039%2011%2059%2019%2045%2019%20-14%200%20-60%20-11%20-103%20-25z'/%3e%3cpath%20fill='%231078E0'%20d='M11300%201426%20c0%20-9%20-4%20-14%20-10%20-11%20-5%203%20-10%20-1%20-10%20-9%200%20-8%204%20-18%2010%20-21%2011%20-6%2026%2042%2016%2052%20-3%204%20-6%20-1%20-6%20-11z'/%3e%3cpath%20fill='%231078E0'%20d='M5149%201413%20c-13%20-16%20-12%20-17%204%20-4%2016%2013%2021%2021%2013%2021%20-2%200%20-10%20-8%20-17%20-17z'/%3e%3cpath%20fill='%231078E0'%20d='M13628%201423%20c23%20-2%2061%20-2%2085%200%2023%202%204%204%20-43%204%20-47%200%20-66%20-2%20-42%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M6970%201414%20c0%20-11%2038%20-74%2045%20-74%202%200%20-5%2017%20-17%2038%20-27%2046%20-28%2048%20-28%2036z'/%3e%3cpath%20fill='%231078E0'%20d='M8011%201404%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M8320%201414%20c0%20-15%2054%20-96%2076%20-115%2010%20-8%2032%20-16%2049%20-17%2029%20-2%2029%20-2%208%2013%20-12%208%20-28%2013%20-35%2010%20-17%20-7%20-38%2015%20-72%2075%20-14%2025%20-26%2040%20-26%2034z'/%3e%3cpath%20fill='%231078E0'%20d='M6661%201394%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M8836%201393%20c-10%20-24%20-7%20-28%207%20-9%2012%2016%2021%2014%20135%20-31%2072%20-28%20122%20-54%20122%20-62%200%20-28%20-63%20-130%20-108%20-174%20-26%20-25%20-73%20-61%20-105%20-80%20-43%20-26%20-51%20-35%20-33%20-33%2013%200%2022%203%2020%205%20-2%202%2017%2019%2044%2036%2064%2044%20135%20122%20166%20183%2033%2066%2033%2081%20-4%2093%20-17%206%20-27%2016%20-23%2022%203%206%201%207%20-6%203%20-12%20-8%20-153%2043%20-147%2053%202%203%20-11%207%20-29%208%20-22%201%20-35%20-4%20-39%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M9241%201394%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M9962%201390%20c0%20-14%202%20-19%205%20-12%202%206%202%2018%200%2025%20-3%206%20-5%201%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M11635%201390%20c-3%20-5%20-1%20-10%204%20-10%206%200%2011%205%2011%2010%200%206%20-2%2010%20-4%2010%20-3%200%20-8%20-4%20-11%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M5123%201375%20c-3%20-9%20-3%20-18%20-1%20-21%203%20-3%208%204%2011%2016%206%2023%20-1%2027%20-10%205z'/%3e%3cpath%20fill='%231078E0'%20d='M5541%201374%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M11311%201380%20c0%20-8%206%20-28%2014%20-45%2017%20-39%2018%20-21%200%2025%20-7%2019%20-14%2028%20-14%2020z'/%3e%3cpath%20fill='%231078E0'%20d='M11610%201387%20c0%20-18%2031%20-64%2067%20-99%2043%20-42%20115%20-78%20153%20-77%2018%201%2015%203%20-13%2010%20-70%2016%20-164%2079%20-151%20101%203%204%20-2%2011%20-11%2014%20-8%204%20-22%2018%20-30%2033%20-8%2014%20-14%2022%20-15%2018z'/%3e%3cpath%20fill='%231078E0'%20d='M1450%201370%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M4821%201310%20c0%20-41%204%20-84%208%20-95%204%20-11%206%2018%204%2065%20-6%20110%20-11%20125%20-12%2030z'/%3e%3cpath%20fill='%231078E0'%20d='M5520%201380%20c-1%20-3%20-3%20-23%20-4%20-44%20-1%20-32%20-9%20-46%20-46%20-79%20-25%20-22%20-36%20-35%20-25%20-29%2054%2028%2099%2099%2086%20134%20-6%2013%20-10%2021%20-11%2018z'/%3e%3cpath%20fill='%231078E0'%20d='M8014%201355%20c-9%20-19%20-9%20-27%202%20-36%208%20-6%2014%20-8%2014%20-3%201%205%2012%20-12%2026%20-38%2013%20-27%2027%20-48%2029%20-48%203%200%20-4%2019%20-16%2042%20-12%2023%20-26%2057%20-33%2074%20l-11%2033%20-11%20-24z%20m13%20-27%20c-3%20-8%20-6%20-5%20-6%206%20-1%2011%202%2017%205%2013%203%20-3%204%20-12%201%20-19z'/%3e%3cpath%20fill='%231078E0'%20d='M1398%201361%20c10%20-6%205%20-12%20-18%20-21%20-17%20-7%20-29%20-15%20-27%20-17%203%20-2%2021%204%2041%2013%2025%2012%2032%2020%2024%2026%20-7%204%20-17%208%20-23%208%20-5%200%20-4%20-4%203%20-9z'/%3e%3cpath%20fill='%231078E0'%20d='M5140%201360%20c0%20-5%205%20-10%2010%20-10%206%200%2010%205%2010%2010%200%206%20-4%2010%20-10%2010%20-5%200%20-10%20-4%20-10%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6662%201350%20c-6%20-10%20-8%20-21%20-3%20-24%205%20-3%2011%204%2014%2016%208%2029%204%2032%20-11%208z'/%3e%3cpath%20fill='%231078E0'%20d='M9211%201333%20c2%20-36%202%20-36%208%20-8%204%2027%206%2024%2012%20-20%20l6%20-50%20-1%2054%20c-1%2034%20-6%2056%20-13%2059%20-9%202%20-13%20-8%20-12%20-35z'/%3e%3cpath%20fill='%231078E0'%20d='M9560%201359%20c0%20-5%205%20-7%2010%20-4%206%203%2010%208%2010%2011%200%202%20-4%204%20-10%204%20-5%200%20-10%20-5%20-10%20-11z'/%3e%3cpath%20fill='%231078E0'%20d='M9931%201354%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M8801%201330%20c-12%20-17%20-26%20-28%20-30%20-26%20-4%203%20-8%20-2%20-8%20-10%200%20-16%2042%2018%2058%2049%2015%2026%205%2020%20-20%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M9531%201325%20c-1%20-36%2028%20-105%2044%20-105%203%200%20-2%2012%20-12%2027%20-10%2014%20-20%2047%20-24%2072%20l-6%2046%20-2%20-40z'/%3e%3cpath%20fill='%231078E0'%20d='M12126%201331%20c-9%20-16%20-29%20-40%20-46%20-55%20-32%20-27%20-57%20-35%20-44%20-14%204%207%203%208%20-5%204%20-6%20-4%20-8%20-12%20-5%20-18%204%20-6%20-1%20-8%20-15%20-3%20-14%204%20-23%201%20-27%20-9%20-3%20-9%20-18%20-17%20-33%20-17%20-22%20-2%20-23%20-2%20-4%20-6%2034%20-7%20119%2036%20158%2078%2019%2022%2035%2043%2035%2048%200%205%208%2012%2018%2014%2016%204%2016%205%200%206%20-10%200%20-24%20-12%20-32%20-28z'/%3e%3cpath%20fill='%231078E0'%20d='M4803%201305%20c0%20-27%202%20-38%204%20-22%202%2015%202%2037%200%2050%20-2%2012%20-4%200%20-4%20-28z'/%3e%3cpath%20fill='%231078E0'%20d='M7471%201336%20c-7%20-8%20-21%20-12%20-31%20-9%20-21%206%20-28%20-13%20-8%20-19%207%20-3%20-8%20-16%20-32%20-31%20-25%20-15%20-40%20-27%20-34%20-27%2014%200%2083%2050%20108%2079%2011%2011%2017%2021%2014%2021%20-3%200%20-11%20-6%20-17%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M12223%201324%20c27%20-14%2051%20-23%2054%20-21%205%205%20-83%2047%20-96%2047%20-3%20-1%2016%20-12%2042%20-26z'/%3e%3cpath%20fill='%231078E0'%20d='M5115%201310%20c11%20-73%2075%20-121%20155%20-118%20l45%202%20-48%203%20c-26%202%20-45%208%20-42%2013%203%204%20-2%2011%20-11%2014%20-8%203%20-12%202%20-9%20-4%2011%20-17%20-11%20-11%20-39%2011%20-14%2011%20-33%2041%20-41%2067%20-13%2039%20-14%2041%20-10%2012z'/%3e%3cpath%20fill='%231078E0'%20d='M7020%201326%20c0%20-2%208%20-10%2018%20-17%2015%20-13%2016%20-12%203%204%20-13%2016%20-21%2021%20-21%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M1295%201308%20c-5%20-5%20-19%20-16%20-30%20-24%20-15%20-11%20-11%20-11%2015%202%2043%2020%2043%2021%2033%2027%20-4%202%20-12%200%20-18%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M6685%201290%20c-4%20-12%20-4%20-24%20-1%20-27%203%20-4%206%202%206%2012%200%2018%201%2018%2016%20-1%2014%20-18%2014%20-18%203%206%20-16%2034%20-16%2034%20-24%2010z'/%3e%3cpath%20fill='%231078E0'%20d='M9896%201268%20c-37%20-39%20-33%20-44%207%20-9%2016%2014%2043%2053%2035%2050%20-2%200%20-21%20-19%20-42%20-41z'/%3e%3cpath%20fill='%231078E0'%20d='M5145%201290%20c-3%20-5%20-1%20-10%204%20-10%206%200%2011%205%2011%2010%200%206%20-2%2010%20-4%2010%20-3%200%20-8%20-4%20-11%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M7064%201291%20c13%20-21%20108%20-61%20141%20-60%2026%202%2027%202%205%206%20-49%207%20-110%2035%20-104%2045%204%207%202%208%20-5%204%20-6%20-4%20-19%20-2%20-28%206%20-14%2011%20-16%2011%20-9%20-1z'/%3e%3cpath%20fill='%231078E0'%20d='M7781%201273%20c-10%20-26%20-10%20-27%204%20-9%208%2011%2015%2023%2015%2028%200%2015%20-7%208%20-19%20-19z'/%3e%3cpath%20fill='%231078E0'%20d='M9552%201289%20c3%20-8%208%20-13%2011%20-11%209%203%207%2011%20-5%2018%20-6%204%20-8%200%20-6%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M11340%201297%20c0%20-5%205%20-17%2010%20-28%208%20-14%207%20-19%20-1%20-19%20-8%200%20-8%20-4%201%20-15%207%20-9%2015%20-13%2018%20-11%202%203%2012%20-3%2021%20-12%209%20-10%2013%20-13%209%20-7%20-3%205%20-18%2030%20-32%2055%20-14%2025%20-26%2041%20-26%2037z'/%3e%3cpath%20fill='%231078E0'%20d='M6370%201279%20c0%20-19%2041%20-59%2061%20-59%208%200%203%206%20-11%2013%20-13%207%20-30%2024%20-37%2037%20-8%2015%20-13%2019%20-13%209z'/%3e%3cpath%20fill='%231078E0'%20d='M8728%201283%20c6%20-2%209%20-10%206%20-15%20-4%20-7%20-2%20-8%205%20-4%2013%209%205%2026%20-12%2025%20-9%200%20-8%20-2%201%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8444%201266%20c11%20-9%2024%20-16%2030%20-16%2012%200%207%205%20-24%2019%20-24%2011%20-24%2011%20-6%20-3z'/%3e%3cpath%20fill='%231078E0'%20d='M9201%201264%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M12353%201264%20c21%20-11%2027%20-21%2024%20-35%20-3%20-10%20-1%20-17%204%20-13%2018%2011%208%2041%20-16%2052%20-37%2017%20-45%2014%20-12%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M8690%201250%20c-8%20-5%20-10%20-10%20-5%20-10%206%200%2017%205%2025%2010%208%205%2011%2010%205%2010%20-5%200%20-17%20-5%20-25%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M7280%201240%20l-45%20-7%2040%20-1%20c22%200%2049%203%2060%208%2023%2010%209%2010%20-55%200z'/%3e%3cpath%20fill='%231078E0'%20d='M8558%201233%20c23%20-2%2059%20-2%2080%200%2020%202%201%204%20-43%204%20-44%200%20-61%20-2%20-37%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M9241%201224%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M5390%201220%20c12%20-8%2012%20-10%201%20-10%20-8%200%20-12%20-2%20-9%20-5%203%20-3%2013%20-2%2022%201%2014%205%2015%209%204%2015%20-7%205%20-17%209%20-23%209%20-5%200%20-3%20-5%205%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M6051%201220%20c0%20-8%204%20-22%209%20-30%2012%20-18%2012%20-2%200%2025%20-6%2013%20-9%2015%20-9%205z'/%3e%3cpath%20fill='%231078E0'%20d='M6508%201223%20c21%20-4%2022%20-8%2022%20-123%200%20-86%20-3%20-120%20-12%20-123%20-8%20-2%20-7%20-3%202%20-3%2012%201%2015%2024%2018%20129%20l3%20127%20-28%20-1%20c-24%20-2%20-25%20-2%20-5%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M9830%201220%20c-9%20-6%20-10%20-10%20-3%20-10%206%200%2015%205%2018%2010%208%2012%204%2012%20-15%200z'/%3e%3cpath%20fill='%231078E0'%20d='M9597%201209%20c7%20-7%2015%20-10%2018%20-7%203%203%20-2%209%20-12%2012%20-14%206%20-15%205%20-6%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M6550%201140%20c0%20-40%202%20-71%204%20-69%207%207%2010%20129%203%20136%20-4%203%20-7%20-27%20-7%20-67z'/%3e%3cpath%20fill='%231078E0'%20d='M7680%201141%20c-36%20-37%20-76%20-75%20-90%20-85%20-24%20-17%20-24%20-17%205%200%2017%209%2043%2028%2058%2043%2016%2014%2030%2025%2033%2024%202%20-2%204%200%205%205%200%204%208%2016%2018%2027%2065%2076%2050%2068%20-29%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M9688%201203%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5333%201193%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M6081%201184%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M9638%201193%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M9748%201193%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M12340%201168%20c-15%20-21%20-17%20-28%20-6%20-19%2016%2013%2041%2051%2033%2051%20-2%200%20-14%20-15%20-27%20-32z'/%3e%3cpath%20fill='%231078E0'%20d='M6810%201136%20c30%20-31%2070%20-66%2088%20-77%2017%20-12%2030%20-25%2027%20-30%20-4%20-5%202%20-6%2011%20-2%2012%204%2015%203%2010%20-5%20-5%20-8%20-1%20-10%2010%20-5%2010%203%2015%202%2012%20-3%20-4%20-5%206%20-10%2020%20-11%2019%20-1%2011%207%20-33%2030%20-33%2018%20-91%2061%20-130%2097%20l-70%2064%2055%20-58z'/%3e%3cpath%20fill='%231078E0'%20d='M8125%201170%20c10%20-11%2020%20-20%2023%20-20%203%200%20-3%209%20-13%2020%20-10%2011%20-20%2020%20-23%2020%20-3%200%203%20-9%2013%20-20z'/%3e%3cpath%20fill='%231078E0'%20d='M11429%201156%20c17%20-18%2019%20-25%209%20-30%20-9%20-4%20-8%20-5%202%20-2%208%202%2031%20-10%2050%20-28%2019%20-17%2010%20-5%20-20%2027%20-30%2031%20-56%2057%20-59%2057%20-2%200%206%20-11%2018%20-24z'/%3e%3cpath%20fill='%231078E0'%20d='M6095%201138%20c3%20-17%201%20-28%20-5%20-28%20-6%200%20-8%20-5%20-4%20-11%2012%20-21%2025%2017%2014%2043%20-10%2022%20-10%2022%20-5%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M8150%201136%20c0%20-2%208%20-10%2018%20-17%2015%20-13%2016%20-12%203%204%20-13%2016%20-21%2021%20-21%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M9284%201122%20c4%20-7%202%20-12%20-5%20-12%20-8%200%20-8%20-4%201%20-15%207%20-8%2016%20-13%2020%20-10%208%205%2028%20-14%2029%20-27%201%20-5%202%20-7%204%20-5%202%201%2016%20-6%2032%20-16%2019%20-12%2013%20-4%20-15%2021%20-25%2022%20-49%2037%20-54%2034%20-5%20-3%20-7%202%20-3%2011%203%209%201%2019%20-5%2023%20-7%204%20-8%203%20-4%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M12265%201089%20c-52%20-43%20-103%20-72%20-164%20-94%20-20%20-8%20-29%20-14%20-20%20-14%2027%20-1%20151%2067%20199%20109%2059%2051%2049%2051%20-15%20-1z'/%3e%3cpath%20fill='%231078E0'%20d='M4870%201116%20c0%20-2%208%20-10%2018%20-17%2015%20-13%2016%20-12%203%204%20-13%2016%20-21%2021%20-21%2013z'/%3e%3cpath%20fill='%231078E0'%20d='M5515%201076%20c-22%20-23%20-36%20-38%20-31%20-34%205%203%2015%204%2023%201%207%20-3%2013%20-1%2011%203%20-5%2014%2038%2064%2047%2056%205%20-4%205%20-1%201%206%20-9%2015%20-3%2018%20-51%20-32z'/%3e%3cpath%20fill='%231078E0'%20d='M9935%201078%20l-40%20-43%2038%2034%2037%2035%200%20-58%20c0%20-50%203%20-59%2021%20-63%2016%20-4%2017%20-8%207%20-14%20-7%20-5%2043%20-8%20117%20-7%20l130%202%20-110%206%20-110%206%20118%202%20c64%201%20117%205%20117%2010%200%204%20-63%206%20-140%204%20l-139%20-3%20-3%2066%20-3%2066%20-40%20-43z'/%3e%3cpath%20fill='%231078E0'%20d='M8209%201088%20c24%20-27%20149%20-98%20172%20-98%207%200%20-18%2015%20-56%2033%20-39%2019%20-86%2047%20-105%2062%20-34%2028%20-34%2028%20-11%203z'/%3e%3cpath%20fill='%231078E0'%20d='M5860%201052%20c0%20-29%204%20-52%209%20-52%208%200%203%2090%20-5%2099%20-2%202%20-4%20-19%20-4%20-47z'/%3e%3cpath%20fill='%231078E0'%20d='M6118%201085%20c6%20-11%2025%20-33%2044%20-50%20l33%20-30%20-35%2040%20c-19%2022%20-39%2045%20-44%2050%20-5%206%20-4%201%202%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M4907%201069%20c7%20-9%209%20-20%205%20-24%20-4%20-5%20-1%20-5%206%20-1%207%205%2021%202%2030%20-6%2020%20-18%2042%20-31%2042%20-25%200%202%20-21%2019%20-47%2037%20-27%2019%20-42%2027%20-36%2019z'/%3e%3cpath%20fill='%231078E0'%20d='M11563%201042%20c4%20-4%2024%20-17%2046%20-27%2022%20-10%2039%20-21%2037%20-24%20-2%20-3%2012%20-7%2033%20-8%20l36%20-1%20-36%2013%20c-19%207%20-54%2022%20-78%2035%20-24%2012%20-41%2017%20-38%2012z'/%3e%3cpath%20fill='%231078E0'%20d='M9873%201029%20c-5%20-5%20-37%20-21%20-69%20-35%20-32%20-14%20-45%20-22%20-29%20-18%2017%204%2038%207%2047%208%209%200%2015%203%2012%207%20-2%204%204%2010%2015%2014%2011%203%2025%2012%2031%2020%2014%2017%209%2020%20-7%204z'/%3e%3cpath%20fill='%231078E0'%20d='M5410%201005%20c-25%20-13%20-41%20-24%20-37%20-25%2011%200%2087%2039%2087%2045%200%207%200%207%20-50%20-20z'/%3e%3cpath%20fill='%231078E0'%20d='M7520%201020%20c-9%20-6%20-10%20-10%20-3%20-10%206%200%2015%205%2018%2010%208%2012%204%2012%20-15%200z'/%3e%3cpath%20fill='%231078E0'%20d='M9412%201007%20c10%20-8%2015%20-17%2011%20-21%20-4%20-4%201%20-4%2010%200%2020%207%2020%207%20-13%2023%20-22%2011%20-23%2010%20-8%20-2z'/%3e%3cpath%20fill='%231078E0'%20d='M6214%20996%20c11%20-9%2024%20-16%2030%20-16%2012%200%207%205%20-24%2019%20-24%2011%20-24%2011%20-6%20-3z'/%3e%3cpath%20fill='%231078E0'%20d='M7450%20995%20c-19%20-7%20-28%20-14%20-20%20-14%208%200%2029%206%2045%2014%2039%2017%2021%2018%20-25%200z'/%3e%3cpath%20fill='%231078E0'%20d='M5030%20990%20c8%20-5%2020%20-10%2025%20-10%206%200%203%205%20-5%2010%20-8%205%20-19%2010%20-25%2010%20-5%200%20-3%20-5%205%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M9470%20980%20c8%20-5%2022%20-9%2030%20-9%2010%200%208%203%20-5%209%20-27%2012%20-43%2012%20-25%200z'/%3e%3cpath%20fill='%231078E0'%20d='M5085%20970%20c19%20-8%2073%20-14%2064%20-6%20-2%202%20-22%206%20-44%209%20-28%205%20-34%204%20-20%20-3z'/%3e%3cpath%20fill='%231078E0'%20d='M5300%20970%20c-34%20-7%20-34%20-7%20-5%20-8%2017%200%2039%203%2050%208%2024%2010%204%2010%20-45%200z'/%3e%3cpath%20fill='%231078E0'%20d='M6271%20969%20c13%20-8%2088%20-14%2078%20-5%20-2%202%20-24%206%20-48%209%20-29%204%20-40%202%20-30%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M7088%20973%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M7388%20973%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8438%20973%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8738%20973%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M11728%20973%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M11995%20970%20c-27%20-7%20-27%20-8%20-5%20-8%2014%200%2036%204%2050%208%2020%206%2021%208%205%208%20-11%200%20-33%20-4%20-50%20-8z'/%3e%3cpath%20fill='%231078E0'%20d='M6433%20963%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M7143%20963%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M7323%20963%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M8493%20963%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M8673%20963%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M9533%20963%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M9693%20963%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M10582%20963%20c37%20-2%20100%20-2%20140%200%2040%201%2010%203%20-67%203%20-77%200%20-110%20-1%20-73%20-3z'/%3e%3cpath%20fill='%231078E0'%20d='M11773%20963%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M5198%20953%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M7223%20953%20c15%20-2%2037%20-2%2050%200%2012%202%200%204%20-28%204%20-27%200%20-38%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M8568%20953%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M9593%20953%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11805%20950%20c-17%20-4%205%20-5%2050%20-2%2044%202%2082%206%2084%208%208%207%20-104%202%20-134%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5138%20943%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M5278%20943%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M6318%20943%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M6428%20943%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M7313%20943%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M8508%20943%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M8658%20943%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M9548%20943%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M9688%20943%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M11968%20943%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M82%20780%20c0%20-14%202%20-19%205%20-12%202%206%202%2018%200%2025%20-3%206%20-5%201%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M1800%20770%20c-44%20-7%20-44%20-7%20-9%20-8%2020%20-1%2052%20-4%2070%20-7%2026%20-4%2029%20-3%2014%204%20-15%207%20-6%2010%2040%2013%20l60%204%20-65%201%20c-36%200%20-85%20-3%20-110%20-7z'/%3e%3cpath%20fill='%231078E0'%20d='M1993%20763%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M54%20746%20c-3%20-8%20-4%20-23%20-1%20-33%203%20-12%206%20-8%208%2012%201%2019%205%207%209%20-30%20l7%20-60%201%2057%20c2%2055%20-12%2086%20-24%2054z'/%3e%3cpath%20fill='%231078E0'%20d='M1718%20753%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M2135%20737%20c136%20-38%20239%20-78%20223%20-89%20-9%20-7%20-7%20-8%208%20-3%2026%207%2052%20-4%20307%20-128%20117%20-57%20202%20-104%20196%20-108%20-11%20-7%2016%20-20%2051%20-24%208%20-2%2024%20-6%2035%20-10%20119%20-43%20-438%20233%20-595%20295%20-124%2048%20-261%2091%20-290%2089%20-8%200%2021%20-10%2065%20-22z%20m770%20-337%20c3%20-6%20-1%20-7%20-9%20-4%20-18%207%20-21%2014%20-7%2014%206%200%2013%20-4%2016%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M1678%20743%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M1768%20743%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M2008%20743%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M3708%20730%20c-14%20-54%20-17%20-90%20-7%20-90%2015%200%2021%2023%2017%2071%20-3%2036%20-5%2039%20-10%2019z'/%3e%3cpath%20fill='%231078E0'%20d='M1590%20710%20c8%20-5%2020%20-10%2025%20-10%206%200%203%205%20-5%2010%20-8%205%20-19%2010%20-25%2010%20-5%200%20-3%20-5%205%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M1525%20695%20c-25%20-12%20-26%20-14%20-5%20-9%2028%207%2060%2023%2045%2023%20-5%200%20-23%20-6%20-40%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M1385%20635%20c-102%20-50%20-108%20-60%20-9%20-15%2037%2016%2071%2027%2078%2023%206%20-3%207%20-2%203%202%20-4%205%203%2015%2015%2022%2052%2029%20-3%208%20-87%20-32z'/%3e%3cpath%20fill='%231078E0'%20d='M41%20644%20c0%20-11%203%20-14%206%20-6%203%207%202%2016%20-1%2019%20-3%204%20-6%20-2%20-5%20-13z'/%3e%3cpath%20fill='%231078E0'%20d='M85%20588%20c3%20-21%201%20-39%20-5%20-43%20-8%20-5%20-8%20-11%201%20-21%206%20-7%2015%20-12%2019%20-9%205%203%2012%20-4%2015%20-15%204%20-12%2034%20-50%2067%20-86%2033%20-35%2056%20-64%2052%20-64%20-5%200%20-1%20-7%209%20-15%2011%20-7%2026%20-11%2035%20-8%208%204%2013%202%209%20-3%20-3%20-5%202%20-10%2011%20-10%209%20-1%2026%20-4%2037%20-8%2011%20-4%20-5%206%20-35%2024%20-102%2057%20-167%20135%20-202%20238%20-14%2043%20-17%2048%20-13%2020z%20m180%20-248%20c3%20-6%20-1%20-7%20-9%20-4%20-18%207%20-21%2014%20-7%2014%206%200%2013%20-4%2016%20-10z'/%3e%3cpath%20fill='%231078E0'%20d='M1251%20571%20c-27%20-14%20-30%20-19%20-17%20-24%2010%20-4%2015%20-3%2011%203%20-3%206%20-2%2010%202%2010%205%200%2018%207%2029%2015%2026%2019%2016%2018%20-25%20-4z'/%3e%3cpath%20fill='%231078E0'%20d='M1170%20530%20c-19%20-11%20-31%20-19%20-27%20-20%2011%200%2067%2029%2067%2035%200%207%20-1%207%20-40%20-15z'/%3e%3cpath%20fill='%231078E0'%20d='M958%20424%20c-71%20-35%20-128%20-66%20-128%20-69%200%20-3%2032%2011%2070%2030%2039%2020%2076%2033%2082%2029%207%20-5%208%20-2%203%206%20-6%2010%20-4%2012%209%207%209%20-4%2015%20-3%2012%202%20-3%204%2013%2016%2035%2026%2022%2010%2042%2022%2045%2027%207%2011%2012%2013%20-128%20-58z'/%3e%3cpath%20fill='%231078E0'%20d='M786%20335%20c-18%20-13%20-18%20-14%202%20-12%2011%200%2019%204%2016%208%20-2%204%202%2010%208%2012%207%203%209%206%203%206%20-5%200%20-18%20-6%20-29%20-14z'/%3e%3cpath%20fill='%231078E0'%20d='M368%20293%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%231078E0'%20d='M661%20296%20c2%20-2%2018%20-6%2034%20-10%2022%20-5%2026%20-4%2015%204%20-14%209%20-59%2015%20-49%206z'/%3e%3cpath%20fill='%231078E0'%20d='M408%20283%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M603%20283%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z'/%3e%3cpath%20fill='%231078E0'%20d='M450%20271%20c-19%20-4%2014%20-6%2074%20-6%2061%200%2097%203%2080%206%20-37%208%20-109%208%20-154%200z'/%3e%3cpath%20fill='%23003CDC'%20d='M1818%203783%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%23003CDC'%20d='M1562%203652%20c-57%20-58%20-215%20-350%20-206%20-379%204%20-13%203%20-15%20-4%20-5%20-7%2011%20-11%2010%20-16%20-5%20-8%20-21%20-801%20-1584%20-966%20-1903%20-61%20-118%20-150%20-293%20-198%20-389%20l-87%20-174%200%20-101%20c1%20-129%2024%20-192%20100%20-275%2051%20-54%20165%20-128%20178%20-115%203%203%2011%202%2018%20-2%2018%20-11%2094%20-5%20138%2010%2020%208%2051%2011%2069%208%2025%20-3%2037%200%2047%2014%2017%2025%2012%2029%20-17%2013%20-29%20-15%20-24%20-10%2035%2035%2026%2020%2054%2036%2062%2036%209%200%2033%209%2055%2020%2033%2017%2039%2024%2038%2052%200%2018%203%2046%207%2062%206%2023%205%2027%20-5%2021%20-10%20-6%20-12%20-4%20-7%209%204%2010%207%2021%207%2026%200%204%2016%204%2035%200%2030%20-7%2035%20-5%2035%2010%200%2011%20-4%2022%20-10%2025%20-17%2010%20-11%2023%2017%2037%2014%207%2031%2022%2037%2033%206%2011%2017%2024%2024%2028%206%204%2012%2014%2012%2021%200%208%207%2016%2015%2020%208%203%2015%2012%2015%2019%200%207%2011%2020%2025%2027%2014%207%2025%2019%2025%2026%200%206%207%2015%2016%2018%2014%205%2013%209%20-7%2024%20-22%2018%20-22%2019%20-3%2033%2025%2019%2044%2053%2044%2080%200%2018%204%2021%2028%2016%2015%20-2%2036%20-2%2046%202%2018%207%2018%208%202%2014%20-23%209%20-11%2027%2020%2027%2020%200%2024%20-5%2023%20-27%200%20-24%20-2%20-25%20-8%20-9%20-7%2019%20-8%2019%20-13%20-1%20-6%20-21%2012%20-43%2045%20-56%2016%20-6%2018%20-1%2013%2054%20-6%2061%20-6%2061%2013%2040%2014%20-16%2017%20-31%2013%20-68%20-5%20-43%20-4%20-46%2017%20-40%2017%204%2021%201%2021%20-19%200%20-14%206%20-24%2015%20-24%209%200%2012%206%208%2018%20-4%2010%204%206%2021%20-11%2023%20-25%2032%20-28%2066%20-23%2022%203%2040%201%2040%20-4%200%20-4%206%20-10%2013%20-13%206%20-2%200%20-2%20-15%200%20-20%203%20-28%200%20-28%20-11%200%20-8%20-8%20-20%20-17%20-26%20-13%20-7%200%20-9%2050%20-5%2058%204%2068%202%2063%20-10%20-3%20-8%200%20-14%207%20-12%207%201%2011%20-8%2011%20-21%20-2%20-25%2011%20-33%2083%20-49%2028%20-7%2040%20-7%2036%200%20-4%206%204%207%2021%203%2020%20-5%2026%20-4%2020%205%20-5%209%202%2011%2027%206%2029%20-5%2031%20-4%2012%205%20-19%209%20-20%2013%20-10%2032%207%2011%2013%2023%2014%2025%201%202%2021%20-6%2045%20-17%2026%20-12%2095%20-27%20172%20-37%20235%20-31%20388%20-87%20825%20-305%20163%20-82%20320%20-155%20350%20-164%20153%20-45%20327%204%20433%20122%2098%20108%20126%20250%2081%20397%20-15%2049%20-58%20135%20-368%20735%20-84%20162%20-198%20386%20-253%20497%20-94%20187%20-152%20293%20-138%20250%205%20-15%202%20-17%20-17%20-12%20-12%204%20-26%2013%20-32%2019%20-5%207%20-15%2011%20-22%209%20-21%20-7%20-23%2016%20-3%2030%2012%208%2020%2018%2019%2023%20-4%2023%202%2026%2016%208%209%20-10%203%207%20-12%2038%20-15%2032%20-29%2056%20-31%2054%20-2%20-3%201%20-13%207%20-25%209%20-17%208%20-22%20-9%20-31%20-11%20-6%20-25%20-8%20-31%20-5%20-15%2010%20-39%20-14%20-32%20-33%205%20-14%204%20-15%20-8%20-6%20-8%206%20-40%209%20-71%208%20-46%20-3%20-58%200%20-61%2014%20-4%2013%20-5%2014%20-6%202%200%20-9%20-14%20-23%20-30%20-33%20-32%20-19%20-45%20-22%20-37%20-8%203%204%20-8%208%20-24%207%20-26%20-1%20-30%20-5%20-30%20-28%200%20-25%20-2%20-26%20-29%20-18%20-23%206%20-31%205%20-33%20-7%20-2%20-12%20-9%20-9%20-32%2010%20-25%2022%20-33%2024%20-58%2015%20-24%20-9%20-29%20-15%20-25%20-34%202%20-13%200%20-24%20-4%20-24%20-5%200%20-9%2011%20-9%2025%200%2021%20-2%2024%20-14%2013%20-20%20-19%20-14%20-52%2013%20-64%20l24%20-11%20-26%20-5%20c-15%20-3%20-24%20-1%20-21%203%203%205%20-2%209%20-10%209%20-9%200%20-14%20-8%20-13%20-20%201%20-11%206%20-19%2012%20-16%206%202%2010%20-8%209%20-22%200%20-14%206%20-38%2013%20-54%2014%20-27%2011%20-48%20-7%20-48%20-6%200%20-23%2027%20-40%2060%20-17%2033%20-32%2060%20-35%2060%20-3%200%2021%20-52%2052%20-115%2038%20-76%2060%20-110%2066%20-102%205%208%206%205%203%20-8%20-3%20-13%2055%20-139%20167%20-362%2095%20-189%20169%20-343%20164%20-343%20-4%200%20-21%206%20-36%2014%20-55%2029%20-262%2095%20-373%20120%20-136%2030%20-321%2049%20-397%2041%20-101%20-10%20-202%20-28%20-207%20-36%20-2%20-4%20-11%20-6%20-19%20-2%20-8%203%20-15%200%20-15%20-7%200%20-7%20-7%20-10%20-15%20-6%20-8%203%20-15%202%20-15%20-3%200%20-5%20-12%20-8%20-27%20-8%20-15%200%20-29%20-5%20-31%20-11%20-2%20-6%20-10%20-8%20-18%20-5%20-8%203%20-14%200%20-14%20-7%200%20-6%20-4%20-8%20-10%20-5%20-5%203%20-10%201%20-10%20-5%200%20-7%20-7%20-9%20-16%20-6%20-10%204%20-13%202%20-8%20-6%205%20-8%202%20-9%20-9%20-5%20-10%203%20-17%202%20-17%20-4%200%20-6%20-4%20-7%20-10%20-4%20-5%203%20-10%202%20-10%20-3%200%20-5%20-11%20-15%20-25%20-22%20-13%20-7%20-22%20-17%20-19%20-22%208%20-13%20-26%20-37%20-51%20-37%20-19%20-1%20-18%201%204%2018%2018%2014%2021%2020%2011%2026%20-9%206%20-11%204%20-5%20-5%206%20-10%204%20-12%20-9%20-7%20-11%205%20-15%203%20-10%20-5%205%20-8%202%20-9%20-10%20-5%20-11%205%20-15%203%20-10%20-5%205%20-8%202%20-9%20-10%20-5%20-10%204%20-15%203%20-11%20-3%203%20-6%201%20-10%20-4%20-10%20-20%200%20-26%20-3%20-37%20-18%20-7%20-9%20-16%20-12%20-24%20-7%20-9%205%20-11%204%20-6%20-3%207%20-11%20-6%20-17%20-27%20-13%20-5%201%20-6%20-3%20-3%20-8%206%20-9%20-22%20-26%20-37%20-23%20-4%201%20-6%20-1%20-5%20-5%202%20-9%20-67%20-83%20-77%20-83%20-4%200%20-4%2011%20-1%2024%207%2029%20222%20478%20370%20775%2059%20117%20105%20220%20102%20228%20-3%208%20-1%2011%204%208%2012%20-8%2033%2043%2024%2057%20-4%206%20-3%208%203%205%2013%20-8%2036%2041%2027%2055%20-4%206%20-3%208%203%205%2013%20-8%2036%2041%2027%2055%20-4%206%20-3%208%202%205%2013%20-7%20127%20221%20118%20235%20-4%206%20-3%208%203%205%2013%20-8%2036%2041%2027%2055%20-5%207%20-2%208%206%203%2010%20-6%2012%20-4%207%209%20-4%209%20-3%2015%202%2012%2011%20-7%2023%2022%2014%2036%20-3%206%20-2%208%204%205%2014%20-9%2064%2087%2057%20109%20-4%2013%20-3%2015%203%206%207%20-9%2012%20-6%2021%2013%2015%2033%205%2053%20-154%20304%20-125%20195%20-154%20259%20-154%20336%200%2066%2028%20155%2065%20205%2029%2040%2032%2049%2019%2054%20-10%204%20-31%20-10%20-62%20-42z%20m-11%20-60%20c-6%20-2%20-11%20-10%20-11%20-18%200%20-8%20-4%20-14%20-9%20-14%20-21%200%20-20%2019%202%2046%2020%2025%2022%2026%2026%209%202%20-11%20-2%20-21%20-8%20-23z%20m130%20-1099%20c-12%20-20%20-14%20-14%20-5%2012%204%209%209%2014%2011%2011%203%20-2%200%20-13%20-6%20-23z%20m-43%20-88%20c-13%20-27%20-26%20-41%20-31%20-36%20-6%206%202%2023%2019%2045%2016%2020%2030%2036%2031%2036%202%200%20-7%20-20%20-19%20-45z%20m672%20-354%20c0%20-3%20-4%20-12%20-8%20-19%20-6%20-9%20-12%20-6%20-20%2012%20-9%2021%20-8%2023%209%2019%2010%20-3%2019%20-8%2019%20-12z%20m-1126%20-865%20c-19%20-15%20-54%20-27%20-54%20-20%200%202%2014%2013%2032%2024%2035%2021%2053%2018%2022%20-4z%20m-77%20-57%20c-9%20-6%20-17%20-17%20-17%20-24%200%20-8%20-8%20-15%20-17%20-15%20-13%200%20-11%206%2012%2030%2016%2016%2031%2027%2034%2024%203%20-3%20-2%20-10%20-12%20-15z%20m120%20-121%20c-3%20-8%20-6%20-5%20-6%206%20-1%2011%202%2017%205%2013%203%20-3%204%20-12%201%20-19z%20m228%20-138%20c3%20-5%201%20-10%20-4%20-10%20-6%200%20-11%205%20-11%2010%200%206%202%2010%204%2010%203%200%208%20-4%2011%20-10z'/%3e%3cpath%20fill='%23003CDC'%20d='M3485%202826%20c-56%20-57%20-48%20-55%2018%204%2023%2020%2056%2064%2045%2059%20-2%20-1%20-30%20-29%20-63%20-63z'/%3e%3cpath%20fill='%23003CDC'%20d='M4007%202749%20c7%20-7%2015%20-10%2018%20-7%203%203%20-2%209%20-12%2012%20-14%206%20-15%205%20-6%20-5z'/%3e%3cpath%20fill='%23003CDC'%20d='M3790%202725%20c13%20-14%2026%20-25%2028%20-25%203%200%20-5%2011%20-18%2025%20-13%2014%20-26%2025%20-28%2025%20-3%200%205%20-11%2018%20-25z'/%3e%3cpath%20fill='%23003CDC'%20d='M3265%202700%20c-27%20-10%20-42%20-19%20-32%20-19%209%20-1%2017%20-5%2017%20-10%200%20-5%2016%20-12%2035%20-15%2031%20-6%2035%20-10%2033%20-34%20-2%20-20%203%20-29%2019%20-37%2040%20-17%2036%20-35%20-4%20-19%20-62%2026%20-45%209%2025%20-24%2048%20-23%2060%20-27%2043%20-12%20-22%2019%20-20%2025%204%2020%2039%20-8%2045%20-7%2045%205%200%207%20-14%2025%20-31%2039%20-17%2014%20-28%2030%20-25%2035%2011%2016%2066%2024%2081%2011%2011%20-9%2015%20-9%2015%20-1%200%206%2012%2016%2027%2022%2022%208%2024%2012%2013%2019%20-8%206%20-27%2010%20-42%2010%20-15%200%20-30%205%20-33%2010%20-4%206%20-13%207%20-23%201%20-20%20-10%20-79%20-13%20-106%20-5%20-15%205%20-16%208%20-5%2015%2022%2014%20-1%209%20-56%20-11z%20m15%20-14%20c0%20-11%20-19%20-15%20-25%20-6%20-3%205%201%2010%209%2010%209%200%2016%20-2%2016%20-4z'/%3e%3cpath%20fill='%23003CDC'%20d='M3163%202644%20c-8%20-21%2015%20-41%2057%20-48%20l35%20-5%20-35%2011%20c-39%2013%20-52%2027%20-45%2046%202%206%202%2012%20-1%2012%20-2%200%20-7%20-7%20-11%20-16z'/%3e%3cpath%20fill='%23003CDC'%20d='M3849%202599%20l-24%20-20%2028%2017%20c15%209%2027%2018%2027%2020%200%208%20-8%204%20-31%20-17z'/%3e%3cpath%20fill='%23003CDC'%20d='M2750%202591%20c0%20-6%204%20-13%2010%20-16%206%20-3%207%201%204%209%20-7%2018%20-14%2021%20-14%207z'/%3e%3cpath%20fill='%23003CDC'%20d='M3589%202568%20c21%20-24%2022%20-28%207%20-28%20-22%200%20-48%20-25%20-38%20-36%204%20-5%20-1%20-2%20-11%205%20-23%2018%20-72%2024%20-59%208%207%20-8%206%20-16%20-3%20-24%20-10%20-9%20-18%20-8%20-36%204%20-29%2020%20-18%208%2041%20-43%2029%20-25%2036%20-29%2020%20-10%20l-25%2028%2038%20-7%20c30%20-6%2037%20-4%2037%209%200%209%208%2016%2019%2016%2010%200%2022%207%2025%2016%206%2015%209%2015%2033%20-1%20l26%20-18%20-20%2029%20c-12%2016%20-34%2040%20-50%2054%20l-28%2025%2024%20-27z'/%3e%3cpath%20fill='%23003CDC'%20d='M3776%202540%20c-20%20-22%20-36%20-43%20-36%20-47%200%20-4%203%20-3%208%203%204%205%2023%2026%2041%2047%2019%2020%2032%2037%2029%2037%20-3%200%20-22%20-18%20-42%20-40z'/%3e%3cpath%20fill='%23003CDC'%20d='M2050%202481%20c0%20-6%204%20-13%2010%20-16%206%20-3%207%201%204%209%20-7%2018%20-14%2021%20-14%207z'/%3e%3cpath%20fill='%23003CDC'%20d='M3671%202448%20c-1%20-9%20-12%20-25%20-26%20-36%20-35%20-28%20-31%20-36%2013%20-29%2020%203%2031%203%2024%200%20-6%20-2%20-10%20-9%20-6%20-14%203%20-5%20-2%20-9%20-10%20-9%20-21%200%20-20%20-30%202%20-46%2023%20-18%2030%20-17%2028%204%200%2010%206%2016%2017%2016%2019%20-2%2023%2026%207%2042%20-8%208%20-6%2015%205%2024%2019%2016%2019%2037%200%2037%20-8%200%20-15%20-4%20-15%20-9%200%20-16%20-17%20-7%20-28%2015%20-8%2016%20-11%2018%20-11%205z%20m46%20-84%20c-3%20-3%20-12%20-4%20-19%20-1%20-8%203%20-5%206%206%206%2011%201%2017%20-2%2013%20-5z'/%3e%3cpath%20fill='%23003CDC'%20d='M3835%202370%20c-4%20-6%20-10%20-8%20-14%20-6%20-3%203%20-7%20-4%20-7%20-15%200%20-24%200%20-24%2020%206%209%2014%2014%2025%2012%2025%20-3%200%20-8%20-5%20-11%20-10z'/%3e%3cpath%20fill='%23003CDC'%20d='M3585%202319%20c15%20-30%2028%20-55%2030%20-57%201%20-1%201%2014%200%2035%20-2%2027%20-10%2042%20-30%2056%20l-27%2020%2027%20-54z'/%3e%3cpath%20fill='%23003CDC'%20d='M3616%202361%20c-4%20-7%20-5%20-15%20-2%20-18%209%20-9%2019%204%2014%2018%20-4%2011%20-6%2011%20-12%200z'/%3e%3cpath%20fill='%23003CDC'%20d='M13227%202346%20c-14%20-11%20-347%20-865%20-347%20-890%200%20-4%2039%20-5%2086%20-4%20l85%203%2038%20100%2038%20100%20186%203%20c215%203%20190%2016%20237%20-122%20l27%20-81%2091%20-3%20c51%20-1%2092%20-1%2092%201%200%203%20-39%20104%20-125%20327%20-31%2082%20-73%20191%20-172%20450%20l-48%20125%20-87%201%20c-53%201%20-93%20-3%20-101%20-10z%20m158%20-351%20c32%20-88%2060%20-165%2062%20-171%205%20-14%20-164%20-26%20-223%20-16%20l-41%207%2049%20135%20c73%20205%2080%20222%2088%20213%204%20-4%2033%20-80%2065%20-168z'/%3e%3cpath%20fill='%23003CDC'%20d='M13907%202354%20c-4%20-4%20-7%20-209%20-7%20-456%20l0%20-448%2090%200%2090%200%200%20453%200%20453%20-83%203%20c-45%201%20-86%20-1%20-90%20-5z'/%3e%3cpath%20fill='%23003CDC'%20d='M2241%202303%20c0%20-16%203%20-22%206%20-13%203%208%2010%2021%2016%2028%207%208%205%2012%20-7%2012%20-11%200%20-16%20-8%20-15%20-27z'/%3e%3cpath%20fill='%23003CDC'%20d='M3665%202270%20c-3%20-6%20-4%20-18%20-1%20-28%203%20-9%202%20-23%20-3%20-31%20-7%20-11%20-11%20-10%20-20%205%20-15%2026%20-13%2010%208%20-71%2018%20-68%2019%20-70%2052%20-73%20l34%20-2%20-31%2016%20c-24%2011%20-35%2026%20-42%2057%20-12%2046%20-9%2057%2016%2057%2017%20-1%2063%20-30%2047%20-30%20-5%200%20-4%20-5%202%20-11%207%20-7%2010%20-24%209%20-38%20-4%20-31%20-2%20-26%2029%2074%2012%2041%2019%2072%2014%2069%20-5%20-3%20-9%20-12%20-9%20-20%200%20-11%20-8%20-7%20-27%2011%20-28%2025%20-67%2033%20-78%2015z'/%3e%3cpath%20fill='%23003CDC'%20d='M10548%202143%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%23003CDC'%20d='M10678%202143%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z'/%3e%3cpath%20fill='%23003CDC'%20d='M9698%201183%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%23003CDC'%20d='M1102%20999%20c2%20-7%2010%20-15%2017%20-17%208%20-3%2012%201%209%209%20-2%207%20-10%2015%20-17%2017%20-8%203%20-12%20-1%20-9%20-9z'/%3e%3cpath%20fill='%23003CDC'%20d='M5608%20983%20c6%20-2%2018%20-2%2025%200%206%203%201%205%20-13%205%20-14%200%20-19%20-2%20-12%20-5z'/%3e%3cpath%20fill='%23003CDC'%20d='M1818%20773%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3cpath%20fill='%23003CDC'%20d='M1405%20705%20c-34%20-16%20-30%20-18%2042%20-19%2050%20-2%2051%20-1%2033%2016%20-22%2021%20-34%2021%20-75%203z'/%3e%3cpath%20fill='%23003CDC'%20d='M890%20610%20c0%20-6%207%20-10%2015%20-10%208%200%2015%202%2015%204%200%202%20-7%206%20-15%2010%20-8%203%20-15%201%20-15%20-4z'/%3e%3cpath%20fill='%23003CDC'%20d='M1230%20612%20c0%20-5%207%20-17%2016%20-28%2015%20-18%2015%20-18%205%203%20-8%2016%20-8%2023%202%2026%207%203%205%206%20-5%206%20-10%201%20-18%20-3%20-18%20-7z'/%3e%3cpath%20fill='%23003CDC'%20d='M1018%20503%20c7%20-3%2016%20-2%2019%201%204%203%20-2%206%20-13%205%20-11%200%20-14%20-3%20-6%20-6z'/%3e%3c/g%3e%3c/svg%3e";
function T2({
  lang: e = "en",
  logoSrc: a,
  layout: l = "horizontal",
  showTagline: s = !0,
  logoSize: i,
  loginSize: n = "md",
  className: c,
  imageClassName: o
}) {
  const m = a ?? Ke, h = i ?? I.logoPx[n], f = Math.round(h * K0), p = {
    md: "text-xs",
    lg: "text-sm"
  }[n], y = /* @__PURE__ */ t(
    "img",
    {
      src: m,
      alt: "Alocare AI",
      width: f,
      height: h,
      className: u("shrink-0 object-contain object-left", o),
      style: { width: f, height: h }
    }
  ), w = s ? /* @__PURE__ */ t("span", { className: u("font-medium text-slate-600", p), children: b(O.brandTagline, e) }) : null;
  return l === "mark" ? /* @__PURE__ */ t("div", { className: u("inline-flex", c), children: y }) : l === "stacked" ? /* @__PURE__ */ r("div", { className: u("flex flex-col items-center gap-2 text-center", c), children: [
    y,
    w
  ] }) : /* @__PURE__ */ r("div", { className: u("flex flex-col gap-1", c), children: [
    y,
    w
  ] });
}
function Zs({
  lang: e = "en",
  onLocaleChange: a,
  logoSrc: l,
  showBrand: s = !0,
  className: i
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: u(
        "sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur",
        i
      ),
      children: /* @__PURE__ */ r("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        s ? /* @__PURE__ */ t(T2, { lang: e, logoSrc: l, layout: "horizontal", loginSize: "md" }) : /* @__PURE__ */ t("span", { className: "flex-1", "aria-hidden": !0 }),
        a ? /* @__PURE__ */ t(
          u2,
          {
            locale: e,
            onChange: a,
            variant: "marketing"
          }
        ) : null
      ] })
    }
  );
}
const Cl = {
  alocare: {
    title: { en: "Sign in to Portal", id: "Masuk ke Portal" },
    subtitle: {
      en: "Secure access for clinicians and patients",
      id: "Akses aman untuk tenaga medis dan pasien"
    }
  },
  emr: {
    title: { en: "MediConsult AI", id: "MediConsult AI" },
    subtitle: {
      en: "Electronic Medical Record",
      id: "Rekam Medis Elektronik"
    }
  },
  admin: {
    title: { en: "Admin Console", id: "Konsol Admin" },
    subtitle: {
      en: "Tenant and platform management",
      id: "Manajemen tenant dan platform"
    }
  },
  hr: {
    title: { en: "Enterprise Health Portal", id: "Portal Kesehatan Perusahaan" },
    subtitle: {
      en: "Workforce wellness and occupational health",
      id: "Kesehatan kerja dan wellness karyawan"
    }
  }
};
function p0({
  variant: e = "alocare",
  layout: a = "portal",
  lang: l = "en",
  loginSize: s = "lg",
  title: i,
  subtitle: n,
  logoSrc: c,
  className: o
}) {
  const m = Cl[e], h = i ?? b(m.title, l), f = n ?? b(m.subtitle, l);
  return e === "alocare" && a === "portal" ? /* @__PURE__ */ r("div", { className: u(I.brandBlock[s], o), children: [
    /* @__PURE__ */ t(
      T2,
      {
        lang: l,
        logoSrc: c,
        layout: "mark",
        loginSize: s,
        className: "mx-auto"
      }
    ),
    /* @__PURE__ */ r("div", { className: u("w-full", I.brandLogoToTitle[s]), children: [
      /* @__PURE__ */ t("h1", { className: I.title[s], children: h }),
      /* @__PURE__ */ t(
        "p",
        {
          className: u(
            I.subtitle[s],
            I.titleToSubtitle[s],
            I.subtitleMax[s],
            "mx-auto text-balance"
          ),
          children: f
        }
      )
    ] })
  ] }) : /* @__PURE__ */ r("div", { className: u("mb-6", o), children: [
    e === "alocare" ? /* @__PURE__ */ t("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ t(T2, { lang: l, logoSrc: c, layout: "horizontal", loginSize: s }) }) : /* @__PURE__ */ t(
      "div",
      {
        className: u(
          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white",
          e === "emr" && "bg-teal-600",
          e === "admin" && "bg-blue-600",
          e === "hr" && "bg-emerald-600"
        ),
        "aria-hidden": !0,
        children: e === "emr" ? "EMR" : e === "admin" ? /* @__PURE__ */ t(l0, { className: "h-7 w-7" }) : /* @__PURE__ */ t(nt, { className: "h-7 w-7" })
      }
    ),
    /* @__PURE__ */ r("div", { className: "text-center", children: [
      /* @__PURE__ */ t("h1", { className: I.title[s], children: h }),
      /* @__PURE__ */ t("p", { className: I.subtitle[s], children: f })
    ] })
  ] });
}
function Al({
  lang: e = "en",
  logoSrc: a,
  className: l
}) {
  return /* @__PURE__ */ t("div", { className: u("space-y-6", l), children: /* @__PURE__ */ r("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ t(
      "img",
      {
        src: a ?? Ke,
        alt: "Alocare AI",
        width: Math.round(48 * K0),
        height: 48,
        className: "h-12 w-auto shrink-0 object-contain object-left"
      }
    ),
    /* @__PURE__ */ t("p", { className: "max-w-sm text-lg text-blue-100", children: b(
      {
        en: "Healthcare AI platform for hospitals, clinics, and enterprises.",
        id: "Platform AI kesehatan untuk rumah sakit, klinik, dan perusahaan."
      },
      e
    ) })
  ] }) });
}
function Sl({ className: e }) {
  return /* @__PURE__ */ r("svg", { className: e, viewBox: "0 0 24 24", "aria-hidden": !0, children: [
    /* @__PURE__ */ t(
      "path",
      {
        fill: "#4285F4",
        d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      }
    ),
    /* @__PURE__ */ t(
      "path",
      {
        fill: "#34A853",
        d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      }
    ),
    /* @__PURE__ */ t(
      "path",
      {
        fill: "#FBBC05",
        d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      }
    ),
    /* @__PURE__ */ t(
      "path",
      {
        fill: "#EA4335",
        d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      }
    )
  ] });
}
function Pl({
  lang: e = "en",
  loginSize: a = "lg",
  onClick: l,
  loading: s,
  disabled: i,
  className: n
}) {
  return /* @__PURE__ */ t(
    l2,
    {
      type: "button",
      variant: "secondary",
      fullWidth: !0,
      size: I.button[a],
      loading: s,
      disabled: i || !l,
      onClick: l,
      className: u("border-slate-200 bg-white", n),
      leftIcon: /* @__PURE__ */ t(Sl, { className: "h-5 w-5" }),
      children: b(O.continueWithGoogle, e)
    }
  );
}
function _l({ lang: e = "en", className: a }) {
  return /* @__PURE__ */ r("div", { className: u("relative my-6", a), children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center", "aria-hidden": !0, children: /* @__PURE__ */ t("div", { className: "w-full border-t border-slate-200" }) }),
    /* @__PURE__ */ t("div", { className: "relative flex justify-center text-xs font-medium uppercase tracking-wide", children: /* @__PURE__ */ t("span", { className: "bg-white px-3 text-slate-500", children: b(O.orDivider, e) }) })
  ] });
}
function Ll({ message: e, className: a }) {
  return e ? /* @__PURE__ */ r(
    "div",
    {
      role: "alert",
      className: u(
        "flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(ut, { className: "mt-0.5 h-4 w-4 shrink-0", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: e })
      ]
    }
  ) : null;
}
function Il({
  lang: e = "en",
  loginSize: a = "lg",
  label: l = d("Password", "Kata sandi"),
  className: s,
  labelClassName: i,
  ...n
}) {
  const [c, o] = _(!1);
  return /* @__PURE__ */ r("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      e2,
      {
        lang: e,
        label: l,
        labelClassName: i ?? I.label[a],
        type: c ? "text" : "password",
        autoComplete: "current-password",
        className: u(I.input[a], "pr-12", s),
        ...n
      }
    ),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => o((m) => !m),
        className: u(
          "absolute right-3 rounded p-1 text-slate-500 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
          I.passwordToggleTop[a]
        ),
        "aria-label": b(c ? d("Hide password", "Sembunyikan kata sandi") : d("Show password", "Tampilkan kata sandi"), e),
        children: c ? /* @__PURE__ */ t(kt, { className: "h-5 w-5", "aria-hidden": !0 }) : /* @__PURE__ */ t(Mt, { className: "h-5 w-5", "aria-hidden": !0 })
      }
    )
  ] });
}
function f0({
  lang: e = "en",
  onLocaleChange: a,
  onForgotPassword: l,
  showForgotPassword: s = !0,
  showLanguageSwitcher: i = !0,
  languageVariant: n = "marketing",
  showApiHint: c = !1,
  className: o
}) {
  const m = i && a;
  return /* @__PURE__ */ r("div", { className: u("mt-6 space-y-4", o), children: [
    (m || s) && /* @__PURE__ */ r("div", { className: "flex items-center justify-between border-t border-slate-100 pt-4", children: [
      m && a ? /* @__PURE__ */ t(
        u2,
        {
          locale: e,
          onChange: a,
          variant: n
        }
      ) : /* @__PURE__ */ t("span", {}),
      s ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: l,
          className: "text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
          children: b(O.forgotPassword, e)
        }
      ) : null
    ] }),
    c ? /* @__PURE__ */ t("p", { className: "text-center text-xs text-slate-400", children: Ue.login }) : null
  ] });
}
const P = d2(
  ({ className: e, size: a, ...l }, s) => /* @__PURE__ */ t(
    l2,
    {
      ref: s,
      size: a ?? "lg",
      className: u("min-h-12 min-w-12 touch-manipulation px-5", e),
      ...l
    }
  )
);
P.displayName = "TouchButton";
function b0({
  lang: e = "en",
  loginSize: a = "lg",
  identifierMode: l = "email",
  onSubmit: s,
  error: i,
  loading: n,
  touchOptimized: c = !1,
  showRememberMe: o = !1,
  submitLabel: m,
  showPasswordToggle: h = !1,
  className: f
}) {
  const [p, y] = _(""), [w, M] = _(""), [z, S] = _(!1), A = c ? P : l2, L = m ?? b(l === "email" ? O.signIn : O.login, e), G = l === "email" ? O.email : O.username, U = c ? void 0 : I.input[a], q = c ? void 0 : I.label[a], Q = c ? "space-y-4" : I.form[a], H = c ? "xl" : I.button[a];
  return /* @__PURE__ */ r(
    "form",
    {
      className: u(Q, f),
      onSubmit: (g) => {
        g.preventDefault(), s == null || s({ identifier: p, password: w });
      },
      children: [
        /* @__PURE__ */ t(
          e2,
          {
            lang: e,
            type: l === "email" ? "email" : "text",
            label: G,
            labelClassName: q,
            value: p,
            onChange: (g) => y(g.target.value),
            autoComplete: l === "email" ? "email" : "username",
            className: U,
            required: !0
          }
        ),
        h ? /* @__PURE__ */ t(
          Il,
          {
            lang: e,
            loginSize: a,
            value: w,
            onChange: (g) => M(g.target.value),
            labelClassName: q,
            className: U,
            required: !0
          }
        ) : /* @__PURE__ */ t(
          e2,
          {
            lang: e,
            type: "password",
            label: O.password,
            labelClassName: q,
            value: w,
            onChange: (g) => M(g.target.value),
            autoComplete: "current-password",
            className: U,
            required: !0
          }
        ),
        o ? /* @__PURE__ */ r(
          "label",
          {
            className: u(
              "flex items-center gap-2 text-slate-600",
              a === "lg" ? "text-base" : "text-sm"
            ),
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: z,
                  onChange: (g) => S(g.target.checked),
                  className: "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                }
              ),
              b(O.rememberMe, e)
            ]
          }
        ) : null,
        i ? /* @__PURE__ */ t(Ll, { message: i }) : null,
        /* @__PURE__ */ t(
          A,
          {
            type: "submit",
            variant: c ? "success" : "primary",
            fullWidth: !0,
            size: H,
            loading: n,
            className: c ? "min-h-14" : void 0,
            children: L
          }
        )
      ]
    }
  );
}
function Tl({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: l,
  onForgotPassword: s,
  googleAuthUrl: i,
  error: n,
  loading: c = !1,
  logoSrc: o,
  className: m
}) {
  const [h, f] = _(""), [p, y] = _(""), w = (M) => {
    M.preventDefault(), l == null || l({ identifier: h, password: p });
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: u(
        "flex min-h-screen items-center justify-center bg-slate-50 px-4",
        m
      ),
      children: /* @__PURE__ */ r(D, { className: "w-full max-w-md shadow-lg", children: [
        /* @__PURE__ */ r(h2, { className: "flex flex-col items-stretch gap-0 border-b border-slate-100 px-5 py-4", children: [
          a ? /* @__PURE__ */ t("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ t(u2, { locale: e, onChange: a }) }) : null,
          /* @__PURE__ */ r("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t(
              T2,
              {
                lang: e,
                logoSrc: o,
                layout: "mark",
                logoSize: 48,
                className: "mx-auto"
              }
            ),
            /* @__PURE__ */ t("h1", { className: "mt-4 font-heading text-xl font-semibold text-slate-900", children: b(O.portalTitle, e) }),
            /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: b(O.portalSubtitle, e) })
          ] })
        ] }),
        /* @__PURE__ */ r($, { children: [
          i ? /* @__PURE__ */ r(S2, { children: [
            /* @__PURE__ */ t(
              Pl,
              {
                lang: e,
                loginSize: "lg",
                className: "w-full",
                onClick: () => {
                  window.location.href = i;
                }
              }
            ),
            /* @__PURE__ */ t(_l, { lang: e })
          ] }) : null,
          /* @__PURE__ */ r("form", { onSubmit: w, className: "space-y-4", children: [
            /* @__PURE__ */ t(
              e2,
              {
                type: "email",
                label: O.email,
                lang: e,
                value: h,
                onChange: (M) => f(M.target.value),
                required: !0,
                autoComplete: "email"
              }
            ),
            /* @__PURE__ */ t(
              e2,
              {
                type: "password",
                label: O.password,
                lang: e,
                value: p,
                onChange: (M) => y(M.target.value),
                required: !0,
                autoComplete: "current-password"
              }
            ),
            n ? /* @__PURE__ */ t("p", { className: "text-sm text-red-600", role: "alert", children: n }) : null,
            /* @__PURE__ */ t(l2, { type: "submit", fullWidth: !0, loading: c, size: "lg", children: b(O.signIn, e) })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-4 text-center", children: /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: s,
              className: "text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
              children: b(O.forgotPassword, e)
            }
          ) })
        ] })
      ] })
    }
  );
}
function Rl({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: l,
  error: s,
  loading: i,
  logoSrc: n = "/alocare-ai.svg",
  className: c
}) {
  return /* @__PURE__ */ t(
    h0,
    {
      variant: "split",
      accent: "blue",
      className: c,
      sidePanel: /* @__PURE__ */ t(Al, { lang: e, logoSrc: n }),
      children: /* @__PURE__ */ t(u0, { className: "shadow-xl", children: /* @__PURE__ */ r(qe, { children: [
        /* @__PURE__ */ t(p0, { variant: "admin", lang: e }),
        /* @__PURE__ */ t(
          b0,
          {
            lang: e,
            identifierMode: "email",
            showPasswordToggle: !0,
            onSubmit: l,
            error: s,
            loading: i
          }
        ),
        /* @__PURE__ */ t(
          f0,
          {
            lang: e,
            onLocaleChange: a,
            showForgotPassword: !0,
            showApiHint: !1
          }
        )
      ] }) })
    }
  );
}
function jl({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: l,
  error: s,
  loading: i,
  className: n
}) {
  return /* @__PURE__ */ t(h0, { variant: "gradient", accent: "emerald", className: n, children: /* @__PURE__ */ r(u0, { children: [
    /* @__PURE__ */ t(p0, { variant: "hr", lang: e }),
    /* @__PURE__ */ t(
      b0,
      {
        lang: e,
        identifierMode: "email",
        showPasswordToggle: !0,
        onSubmit: l,
        error: s,
        loading: i
      }
    ),
    /* @__PURE__ */ t(f0, { lang: e, onLocaleChange: a, showForgotPassword: !0 })
  ] }) });
}
function Je({
  lang: e = "en",
  onLogin: a,
  error: l,
  loading: s,
  className: i
}) {
  const n = (c) => {
    a == null || a({ username: c.identifier, password: c.password });
  };
  return /* @__PURE__ */ t(h0, { variant: "gradient", accent: "teal", className: i, children: /* @__PURE__ */ r(u0, { loginSize: "md", className: u("p-8"), children: [
    /* @__PURE__ */ t(p0, { variant: "emr", layout: "inline", lang: e, loginSize: "md" }),
    /* @__PURE__ */ r(qe, { loginSize: "md", className: "px-0 pb-0 pt-4", children: [
      /* @__PURE__ */ t(
        b0,
        {
          lang: e,
          loginSize: "md",
          identifierMode: "username",
          touchOptimized: !0,
          onSubmit: n,
          error: l,
          loading: s
        }
      ),
      /* @__PURE__ */ t(f0, { lang: e, showForgotPassword: !1, showApiHint: !0 })
    ] })
  ] }) });
}
function Ys({
  variant: e = "portal",
  lang: a = "en"
}) {
  const [l, s] = _(a);
  switch (e) {
    case "admin":
      return /* @__PURE__ */ t(Rl, { lang: l, onLocaleChange: s });
    case "hr":
      return /* @__PURE__ */ t(jl, { lang: l, onLocaleChange: s });
    case "emr":
      return /* @__PURE__ */ t(Je, { lang: l });
    default:
      return /* @__PURE__ */ t(Tl, { lang: l, onLocaleChange: s });
  }
}
const n2 = {
  auth: Ue,
  worklist: {
    list: "GET /worklist",
    updateStatus: "PATCH /worklist/{item_id}/status"
  },
  patients: {
    list: "GET /patients",
    detail: "GET /patients/{patient_id}",
    consultations: "GET /patients/{patient_id}/consultations"
  },
  consultations: {
    create: "POST /consultations",
    detail: "GET /consultations/{consultation_id}",
    updateSoap: "PUT /consultations/{consultation_id}/soap",
    submit: "POST /consultations/{consultation_id}/submit"
  },
  reports: {
    create: "POST /reports",
    detail: "GET /reports/{report_id}",
    result: "GET /reports/{report_id}/result",
    validate: "POST /reports/{report_id}/validate"
  },
  ai: {
    session: "POST /ai/sessions",
    analyze: "POST /ai/analyze",
    chat: "POST /ai/chat"
  },
  pharmacy: {
    search: "GET /pharmacy/search",
    order: "POST /pharmacy/orders"
  },
  lab: {
    search: "GET /lab/tests/search",
    order: "POST /lab/orders"
  },
  icd10: {
    search: "GET /icd10/search"
  },
  telemedicine: {
    session: "POST /telemedicine/sessions",
    end: "POST /telemedicine/{session_id}/end"
  }
}, Dl = [
  { id: "dashboard", icon: "layout-dashboard", label: d("Dashboard", "Dasbor") },
  { id: "upload", icon: "upload", label: d("Upload Report", "Unggah Laporan") },
  { id: "queue", icon: "users", label: d("Patient Queue", "Antrian Pasien") },
  { id: "analysis", icon: "brain", label: d("AI Analysis", "Analisis AI") },
  { id: "review", icon: "stethoscope", label: d("Doctor Review", "Tinjauan Dokter") },
  { id: "chat", icon: "message-circle", label: d("Chat Assistant", "Asisten Chat") },
  { id: "history", icon: "history", label: d("History", "Riwayat") },
  { id: "settings", icon: "settings", label: d("Settings", "Pengaturan") }
], Ol = {
  uploaded: d("Uploaded", "Berhasil diunggah"),
  ocr: d("Processing OCR", "Memproses OCR"),
  analyzing: d("AI analyzing", "AI menganalisis"),
  completed: d("Completed", "Selesai")
}, f2 = {
  syncing: d("Syncing…", "Menyinkronkan…"),
  offline: d("Offline", "Luring"),
  retry: d("Retry upload", "Unggah ulang"),
  pending: d("Pending uploads in queue", "Unggahan tertunda dalam antrian")
};
function Ze({
  status: e,
  lang: a = "en",
  pendingCount: l = 0,
  onRetry: s,
  className: i
}) {
  if (e === "online") return null;
  const n = e === "syncing" ? Zt : e === "offline" ? yt : wa;
  return /* @__PURE__ */ r(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: u(
        "flex min-h-12 items-center justify-between gap-4 rounded-xl px-4 py-3",
        e === "offline" && "bg-amber-50 text-amber-900",
        e === "syncing" && "bg-blue-50 text-blue-900",
        e === "retry" && "bg-red-50 text-red-900",
        i
      ),
      children: [
        /* @__PURE__ */ r("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(
            n,
            {
              className: u("h-5 w-5 shrink-0", e === "syncing" && "animate-spin"),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-semibold", children: b(
              e === "syncing" ? f2.syncing : e === "offline" ? f2.offline : f2.retry,
              a
            ) }),
            l > 0 ? /* @__PURE__ */ r("p", { className: "text-xs opacity-80", children: [
              l,
              " ",
              b(f2.pending, a)
            ] }) : null
          ] })
        ] }),
        e === "retry" && s ? /* @__PURE__ */ t(P, { variant: "secondary", size: "md", onClick: s, children: b(f2.retry, a) }) : null
      ]
    }
  );
}
function Ye({
  lang: e = "en",
  role: a = "Clinical Doctor",
  autoLockMinutes: l = 5,
  masked: s = !0,
  className: i
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: u(
        "flex min-h-10 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600",
        i
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(l0, { className: "h-3.5 w-3.5 text-blue-600", "aria-hidden": !0 }),
          a
        ] }),
        /* @__PURE__ */ r("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(ye, { className: "h-3.5 w-3.5", "aria-hidden": !0 }),
          e === "id" ? `Kunci otomatis ${l} mnt` : `Auto-lock ${l} min`
        ] }),
        s ? /* @__PURE__ */ t("span", { children: e === "id" ? "Data sensitif disamarkan" : "Sensitive data masked" }) : null
      ]
    }
  );
}
const $l = [
  { id: "worklist", label: d("Worklist", "Antrian") },
  { id: "consultation", label: d("Consultation", "Konsultasi") },
  { id: "medications", label: d("Medications", "Obat") },
  { id: "labrad", label: d("Lab / Rad", "Lab / Rad") },
  { id: "ai-voice", label: d("AI Voice", "Suara AI") },
  { id: "reports", label: d("Reports", "Laporan") }
], Bl = {
  pending: d("Waiting", "Menunggu"),
  in_progress: d("In Consultation", "Sedang Konsultasi"),
  completed: d("Finished", "Selesai"),
  cancelled: d("Cancelled", "Dibatalkan")
}, C2 = {
  s: d("Subjective", "Subjektif"),
  o: d("Objective", "Objektif"),
  a: d("Assessment", "Asesmen"),
  p: d("Planning", "Perencanaan")
}, Vl = {
  worklist: xe,
  consultation: s0,
  medications: Me,
  labrad: ge,
  "ai-voice": R2,
  reports: m2
};
function g2({
  children: e,
  lang: a = "en",
  activeNav: l = "worklist",
  onNavChange: s,
  doctorName: i = "Dr. Ananya Putri",
  specialty: n,
  unitLabel: c = "Ward B · Outpatient",
  dateLabel: o,
  onLocaleChange: m,
  onLogout: h,
  offlineStatus: f = "online",
  orientation: p = "landscape",
  appTitle: y,
  className: w
}) {
  const M = y ?? "EMR MediConsult AI", z = n ?? (a === "id" ? "Penyakit Dalam" : "Internal Medicine"), S = o ?? (/* @__PURE__ */ new Date()).toLocaleDateString(a === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ r("div", { className: u("flex min-h-screen flex-col bg-slate-100", w), children: [
    /* @__PURE__ */ t("header", { className: "sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 md:px-6", children: /* @__PURE__ */ r("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: M }),
        /* @__PURE__ */ r("p", { className: "text-sm text-slate-600", children: [
          i,
          " | ",
          z,
          " | ",
          S
        ] }),
        /* @__PURE__ */ t("p", { className: "text-xs font-medium text-blue-600", children: c })
      ] }),
      /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(Ve, { fallback: "AP", size: "md" }),
        m ? /* @__PURE__ */ t(u2, { locale: a, onChange: m }) : null,
        /* @__PURE__ */ t(P, { variant: "ghost", size: "md", className: "relative min-w-12", "aria-label": "Notifications", children: /* @__PURE__ */ t(fe, { className: "h-5 w-5", "aria-hidden": !0 }) }),
        /* @__PURE__ */ t(P, { variant: "ghost", size: "md", onClick: h, "aria-label": "Logout", children: /* @__PURE__ */ t(we, { className: "h-5 w-5", "aria-hidden": !0 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ r(
        "nav",
        {
          className: u(
            "shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
            p === "landscape" ? "w-52" : "w-20"
          ),
          "aria-label": "EMR navigation",
          children: [
            /* @__PURE__ */ t("ul", { className: "space-y-1", children: $l.map((A) => {
              const L = Vl[A.id], G = l === A.id;
              return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  onClick: () => s == null ? void 0 : s(A.id),
                  className: u(
                    "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors",
                    G ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"
                  ),
                  "aria-current": G ? "page" : void 0,
                  children: [
                    /* @__PURE__ */ t(L, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                    p === "landscape" ? b(A.label, a) : null,
                    p === "portrait" ? /* @__PURE__ */ t("span", { className: "sr-only", children: b(A.label, a) }) : null
                  ]
                }
              ) }, A.id);
            }) }),
            /* @__PURE__ */ t("p", { className: "mt-4 hidden px-2 text-[10px] text-slate-400 lg:block", children: "API: api.alocare.net" })
          ]
        }
      ),
      /* @__PURE__ */ r("main", { className: "min-w-0 flex-1 overflow-auto p-4 md:p-6", children: [
        /* @__PURE__ */ t(
          Ye,
          {
            lang: a,
            role: a === "id" ? "Dokter · JWT" : "Doctor · JWT",
            className: "mb-4"
          }
        ),
        f !== "online" ? /* @__PURE__ */ t(Ze, { status: f, lang: a, className: "mb-4" }) : null,
        e
      ] })
    ] })
  ] });
}
const Gl = [
  {
    id: "1",
    patientId: "p1",
    fullName: "Budi Santoso",
    admissionNo: "ADM-001",
    mrn: "RM-2024-A",
    insurance: "BPJS",
    status: "pending"
  },
  {
    id: "2",
    patientId: "p2",
    fullName: "Siti Rahayu",
    admissionNo: "ADM-002",
    mrn: "RM-2024-B",
    insurance: "Private",
    status: "in_progress"
  },
  {
    id: "3",
    patientId: "p3",
    fullName: "Ahmad Fauzi",
    admissionNo: "ADM-003",
    mrn: "RM-2024-C",
    insurance: "BPJS",
    status: "completed"
  }
], Fl = {
  pending: "info",
  in_progress: "ai",
  completed: "normal",
  cancelled: "critical"
};
function Hl({
  lang: e = "en",
  patients: a = Gl,
  onCallPatient: l,
  ...s
}) {
  return /* @__PURE__ */ r(g2, { lang: e, activeNav: "worklist", ...s, children: [
    /* @__PURE__ */ r("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ r("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ t(
          ea,
          {
            className: "pointer-events-none absolute left-3 top-10 h-5 w-5 text-slate-400",
            "aria-hidden": !0
          }
        ),
        /* @__PURE__ */ t(
          e2,
          {
            lang: e,
            label: d("Search patient", "Cari pasien"),
            placeholder: e === "id" ? "Nama atau no. rekam medis" : "Name or record number",
            className: "pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ r(P, { variant: "secondary", className: "min-h-12 shrink-0 gap-2", children: [
        /* @__PURE__ */ t(be, { className: "h-5 w-5", "aria-hidden": !0 }),
        b(d("Filter date", "Filter tanggal"), e)
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", role: "list", children: a.map((i) => /* @__PURE__ */ r(
      "li",
      {
        className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        children: [
          /* @__PURE__ */ r("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ r("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: i.fullName }),
              /* @__PURE__ */ r("p", { className: "text-sm text-slate-600", children: [
                i.admissionNo,
                " · ",
                i.mrn,
                " · ",
                i.insurance
              ] })
            ] }),
            /* @__PURE__ */ t(Y, { variant: Fl[i.status], children: b(Bl[i.status], e) })
          ] }),
          /* @__PURE__ */ t(
            P,
            {
              className: "mt-4 min-h-12",
              fullWidth: !0,
              disabled: i.status === "completed",
              onClick: () => l == null ? void 0 : l(i),
              children: b(d("Call →", "Panggil →"), e)
            }
          )
        ]
      },
      i.id
    )) }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: n2.worklist.list })
  ] });
}
function j2({
  lang: e = "en",
  name: a,
  admissionNo: l,
  mrn: s,
  insurance: i,
  allergies: n,
  className: c
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: u(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        n && "border-amber-200",
        c
      ),
      children: [
        /* @__PURE__ */ r("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
            /* @__PURE__ */ r("p", { className: "mt-1 text-sm text-slate-600", children: [
              l,
              " · ",
              s
            ] })
          ] }),
          /* @__PURE__ */ t(Y, { variant: "info", children: i })
        ] }),
        n ? /* @__PURE__ */ r("p", { className: "mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900", children: [
          /* @__PURE__ */ t(Q2, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
          e === "id" ? "ALERGI" : "ALLERGIES",
          ": ",
          n
        ] }) : null
      ]
    }
  );
}
const W0 = {
  subjective: {
    letter: "S",
    hint: {
      en: "Chief complaint, history, symptoms",
      id: "Keluhan utama, riwayat, gejala"
    }
  },
  objective: {
    letter: "O",
    hint: { en: "Vitals, physical exam, measurable data", id: "Vital, pemeriksaan fisik" }
  },
  assessment: {
    letter: "A",
    hint: { en: "Diagnosis, ICD-10", id: "Diagnosis, ICD-10" }
  },
  plan: {
    letter: "P",
    hint: { en: "Treatment, referrals, follow-up", id: "Terapi, rujukan, kontrol" }
  }
};
function Wl({
  lang: e = "en",
  soap: a,
  onSaveSoap: l,
  onSubmit: s,
  ...i
}) {
  const [n, c] = _("subjective"), [o, m] = _({
    subjective: (a == null ? void 0 : a.subjective) ?? "",
    objective: (a == null ? void 0 : a.objective) ?? "",
    assessment: (a == null ? void 0 : a.assessment) ?? "",
    plan: (a == null ? void 0 : a.plan) ?? "",
    icd10Code: (a == null ? void 0 : a.icd10Code) ?? "R79.89"
  });
  return /* @__PURE__ */ r(g2, { lang: e, activeNav: "consultation", ...i, children: [
    /* @__PURE__ */ t(
      j2,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        allergies: "Penicillin, Ibuprofen",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ t("div", { className: "mb-4 grid grid-cols-4 gap-2", children: ["subjective", "objective", "assessment", "plan"].map((f) => /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => c(f),
        className: u(
          "min-h-14 touch-manipulation rounded-xl border-2 px-2 py-3 text-center transition-colors",
          n === f ? "border-teal-600 bg-teal-50" : "border-slate-200 bg-white hover:bg-slate-50"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-xl font-bold text-teal-700", children: W0[f].letter }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs font-semibold text-slate-800", children: b(
            {
              subjective: C2.s,
              objective: C2.o,
              assessment: C2.a,
              plan: C2.p
            }[f],
            e
          ) })
        ]
      },
      f
    )) }),
    /* @__PURE__ */ r("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
      /* @__PURE__ */ t("p", { className: "mb-2 text-xs text-slate-500", children: b(W0[n].hint, e) }),
      /* @__PURE__ */ t(
        t2,
        {
          lang: e,
          rows: 10,
          value: o[n] ?? "",
          onChange: (f) => {
            const p = { ...o, [n]: f.target.value };
            m(p), l == null || l(p);
          },
          className: "text-base"
        }
      ),
      n === "assessment" ? /* @__PURE__ */ r("div", { className: "mt-3", children: [
        /* @__PURE__ */ t("label", { className: "text-sm font-medium text-slate-700", children: "ICD-10" }),
        /* @__PURE__ */ t(
          "input",
          {
            className: "mt-1 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm",
            value: o.icd10Code ?? "",
            onChange: (f) => m({ ...o, icd10Code: f.target.value }),
            placeholder: n2.icd10.search
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ r("div", { className: "mt-4 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ t(P, { variant: "secondary", className: "min-h-12", children: b(d("AI Voice fill", "Isi suara AI"), e) }),
      /* @__PURE__ */ t(P, { className: "min-h-12 flex-1", onClick: s, children: b(d("Submit record", "Simpan rekam medis"), e) })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: n2.consultations.updateSoap })
  ] });
}
const Ul = [
  { id: "1", name: "Amoxicillin 500mg", dose: "3×1 / day oral", availability: "available" },
  { id: "2", name: "Metformin 500mg", dose: "2×1 / day oral", availability: "available" },
  { id: "3", name: "Lansoprazole 30mg", dose: "1×1 / day oral", availability: "limited" }
], ql = {
  available: "normal",
  limited: "low",
  unavailable: "critical"
};
function Kl({
  lang: e = "en",
  medications: a = Ul,
  ...l
}) {
  return /* @__PURE__ */ r(g2, { lang: e, activeNav: "medications", ...l, children: [
    /* @__PURE__ */ t(
      j2,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        allergies: "Penicillin, Ibuprofen",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ r("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(Me, { className: "h-6 w-6 text-teal-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: b(d("Medication Orders", "Order Obat"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((s) => /* @__PURE__ */ r(
      "li",
      {
        className: "flex min-h-14 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3",
        children: [
          /* @__PURE__ */ r("div", { children: [
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: s.name }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: s.dose })
          ] }),
          /* @__PURE__ */ t(Y, { variant: ql[s.availability], children: s.availability === "available" ? e === "id" ? "Tersedia" : "Available" : s.availability === "limited" ? e === "id" ? "Terbatas" : "Limited" : e === "id" ? "Habis" : "Unavailable" })
        ]
      },
      s.id
    )) }),
    /* @__PURE__ */ r(P, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(ze, { className: "h-5 w-5", "aria-hidden": !0 }),
      b(d("Add medication", "Tambah obat"), e)
    ] }),
    /* @__PURE__ */ r("ul", { className: "mt-6 space-y-2 text-sm text-slate-600", children: [
      /* @__PURE__ */ r("li", { children: [
        "• ",
        e === "id" ? "Terhubung Pharmacy API" : "Connects to Pharmacy API"
      ] }),
      /* @__PURE__ */ r("li", { children: [
        "• ",
        e === "id" ? "Filter formulary asuransi" : "Insurance formulary filter"
      ] }),
      /* @__PURE__ */ r("li", { children: [
        "• ",
        e === "id" ? "Peringatan alergi otomatis" : "Auto allergy warnings"
      ] })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: n2.pharmacy.search })
  ] });
}
const Jl = [
  { id: "1", name: "Complete Blood Count", category: "LAB", note: "Fasting sample required" },
  { id: "2", name: "HbA1c", category: "LAB", note: "3-month glucose average" },
  { id: "3", name: "Chest X-Ray PA", category: "RAD", note: "PA projection" }
];
function Zl({
  lang: e = "en",
  orders: a = Jl,
  ...l
}) {
  return /* @__PURE__ */ r(g2, { lang: e, activeNav: "labrad", ...l, children: [
    /* @__PURE__ */ t(
      j2,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ r("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(ge, { className: "h-6 w-6 text-violet-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: b(d("Lab / Radiology Orders", "Order Lab / Radiologi"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((s) => /* @__PURE__ */ t(
      "li",
      {
        className: "rounded-xl border border-slate-200 bg-white px-4 py-4",
        children: /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ r("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(Y, { variant: s.category === "LAB" ? "info" : "ai", children: s.category }),
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: s.name })
          ] }),
          s.note ? /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: s.note }) : null
        ] }) })
      },
      s.id
    )) }),
    /* @__PURE__ */ r(P, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(ze, { className: "h-5 w-5", "aria-hidden": !0 }),
      b(d("Add lab / radiology", "Tambah lab / radiologi"), e)
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: n2.lab.search })
  ] });
}
const Yl = [
  { key: "start", en: "Start consultation", id: "Mulai konsultasi" },
  { key: "stt", en: "Live STT transcript", id: "Transkrip langsung" },
  { key: "stop", en: "Stop / keyword", id: "Berhenti / kata kunci" },
  { key: "ai", en: "AI → SOAP + ICD-10 + Rx", id: "AI → SOAP + ICD-10 + Rx" },
  { key: "review", en: "Doctor review & submit", id: "Tinjau & simpan" }
];
function Ql({
  lang: e = "en",
  orientation: a = "landscape",
  ...l
}) {
  const [s, i] = _("review"), n = e === "id" ? "Pasien mengeluh batuk kering dua hari. Tidak sesak. Demam subfebril." : "Patient reports dry cough for two days. No shortness of breath. Low-grade fever.";
  return /* @__PURE__ */ r(g2, { lang: e, activeNav: "ai-voice", orientation: a, ...l, children: [
    /* @__PURE__ */ t(
      j2,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        allergies: "Penicillin",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-2" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ r("div", { className: "space-y-4", children: [
            /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ r(
                P,
                {
                  variant: "success",
                  className: "min-h-14 min-w-32",
                  onClick: () => i("listening"),
                  disabled: s === "listening",
                  children: [
                    /* @__PURE__ */ t(R2, { className: "h-5 w-5", "aria-hidden": !0 }),
                    b(d("Start AI", "Mulai AI"), e)
                  ]
                }
              ),
              /* @__PURE__ */ r(
                P,
                {
                  variant: "danger",
                  className: "min-h-14",
                  onClick: () => i("processing"),
                  children: [
                    /* @__PURE__ */ t(da, { className: "h-5 w-5", "aria-hidden": !0 }),
                    b(d("Stop", "Berhenti"), e)
                  ]
                }
              )
            ] }),
            s === "listening" ? /* @__PURE__ */ r("div", { className: "flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3", children: [
              /* @__PURE__ */ r("span", { className: "relative flex h-3 w-3", children: [
                /* @__PURE__ */ t("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" }),
                /* @__PURE__ */ t("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-red-600" })
              ] }),
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-red-800", children: e === "id" ? "Mendengarkan…" : "Listening…" })
            ] }) : null,
            /* @__PURE__ */ t(
              t2,
              {
                lang: e,
                label: d("Live transcript", "Transkrip langsung"),
                value: n,
                rows: 8,
                readOnly: !0
              }
            ),
            /* @__PURE__ */ t("ol", { className: "space-y-2 text-sm text-slate-600", children: Yl.map((c, o) => /* @__PURE__ */ r("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ r("span", { className: "font-bold text-teal-600", children: [
                o + 1,
                "."
              ] }),
              e === "id" ? c.id : c.en
            ] }, c.key)) })
          ] }),
          /* @__PURE__ */ r("div", { className: "rounded-2xl border border-violet-200 bg-violet-50/50 p-4", children: [
            /* @__PURE__ */ r("div", { className: "mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ t(Ee, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
              /* @__PURE__ */ t("h3", { className: "font-bold text-slate-900", children: b(d("AI-generated SOAP", "SOAP dari AI"), e) })
            ] }),
            /* @__PURE__ */ t(
              t2,
              {
                lang: e,
                rows: 12,
                value: e === "id" ? `S: Batuk kering 2 hari
O: TD 120/80, suhu 37.8°C
A: ISPA (J06.9)
P: Simptomatik, kontrol 3 hari` : `S: Dry cough 2 days
O: BP 120/80, temp 37.8°C
A: URTI (J06.9)
P: Symptomatic care, review 3 days`,
                readOnly: s !== "review"
              }
            ),
            /* @__PURE__ */ t(P, { fullWidth: !0, className: "mt-4 min-h-14", children: b(d("Approve & submit", "Setujui & simpan"), e) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ r("p", { className: "mt-4 text-xs text-slate-400", children: [
      n2.ai.analyze,
      " · ",
      n2.consultations.submit
    ] })
  ] });
}
const Xl = {
  "layout-dashboard": jt,
  upload: i0,
  users: _2,
  brain: it,
  stethoscope: s0,
  "message-circle": ke,
  history: Lt,
  settings: sa
};
function s2({
  children: e,
  lang: a = "en",
  activeNav: l = "dashboard",
  onNavChange: s,
  doctorName: i = "Dr. Sarah Chen",
  role: n,
  locale: c,
  onLocaleChange: o,
  onLogout: m,
  notificationCount: h = 2,
  offlineStatus: f = "online",
  pendingUploads: p = 0,
  orientation: y = "landscape",
  showSecurityBar: w = !0,
  className: M
}) {
  const z = c ?? a, S = n ?? (a === "id" ? "Dokter Klinis" : "Clinical Doctor");
  return /* @__PURE__ */ r(
    "div",
    {
      className: u(
        "flex min-h-screen flex-col bg-slate-100",
        y === "portrait" && "min-h-[1280px]",
        M
      ),
      children: [
        /* @__PURE__ */ r("header", { className: "sticky top-0 z-20 flex min-h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2 md:px-6", children: [
          /* @__PURE__ */ t("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ t(
            "img",
            {
              src: "/alocare-ai.svg",
              alt: "Alocare AI",
              width: 120,
              height: 34,
              className: "h-8 w-auto object-contain"
            }
          ) }),
          /* @__PURE__ */ r("div", { className: "flex flex-1 items-center justify-end gap-3", children: [
            /* @__PURE__ */ r("div", { className: "hidden items-center gap-2 md:flex", children: [
              /* @__PURE__ */ t(Ve, { fallback: "SC", size: "md" }),
              /* @__PURE__ */ r("div", { className: "text-right", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: i }),
                /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: S })
              ] })
            ] }),
            o ? /* @__PURE__ */ t(u2, { locale: z, onChange: o }) : null,
            /* @__PURE__ */ r(
              P,
              {
                variant: "ghost",
                size: "md",
                className: "relative min-w-12",
                "aria-label": a === "id" ? "Notifikasi" : "Notifications",
                children: [
                  /* @__PURE__ */ t(fe, { className: "h-5 w-5", "aria-hidden": !0 }),
                  h > 0 ? /* @__PURE__ */ t("span", { className: "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white", children: h }) : null
                ]
              }
            ),
            /* @__PURE__ */ t(
              P,
              {
                variant: "ghost",
                size: "md",
                onClick: m,
                "aria-label": a === "id" ? "Keluar" : "Logout",
                children: /* @__PURE__ */ t(we, { className: "h-5 w-5", "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ r("div", { className: "flex flex-1 overflow-hidden", children: [
          /* @__PURE__ */ t(
            "nav",
            {
              className: u(
                "sticky top-14 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
                y === "landscape" ? "w-56" : "w-20"
              ),
              "aria-label": a === "id" ? "Menu utama" : "Main menu",
              children: /* @__PURE__ */ t("ul", { className: "space-y-1", children: Dl.map((A) => {
                const L = Xl[A.icon], G = l === A.id;
                return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ r(
                  "button",
                  {
                    type: "button",
                    onClick: () => s == null ? void 0 : s(A.id),
                    className: u(
                      "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      G ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                    ),
                    "aria-current": G ? "page" : void 0,
                    children: [
                      /* @__PURE__ */ t(L, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                      y === "landscape" ? /* @__PURE__ */ t("span", { className: "text-sm font-semibold", children: b(A.label, a) }) : /* @__PURE__ */ t("span", { className: "sr-only", children: b(A.label, a) })
                    ]
                  }
                ) }, A.id);
              }) })
            }
          ),
          /* @__PURE__ */ r("main", { className: "flex min-w-0 flex-1 flex-col overflow-auto p-4 md:p-6", children: [
            w ? /* @__PURE__ */ t(Ye, { lang: a, role: S, className: "mb-4" }) : null,
            f !== "online" ? /* @__PURE__ */ t(
              Ze,
              {
                status: f,
                lang: a,
                pendingCount: p,
                className: "mb-4"
              }
            ) : null,
            e
          ] })
        ] })
      ]
    }
  );
}
const Qs = s2, es = d(
  "Overall stable. Platelet count slightly below reference. LDL mildly elevated.",
  "Secara umum stabil. Trombosit sedikit di bawah referensi. LDL sedikit meningkat."
), ts = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "Glucose", value: "118 mg/dL", status: "high" }
], as = [
  {
    id: "1",
    title: d("Repeat CBC", "Ulang CBC"),
    description: d("In 3 months", "Dalam 3 bulan"),
    icon: "calendar"
  },
  {
    id: "2",
    title: d("Monitor platelets", "Pantau trombosit"),
    icon: "heart"
  }
];
function Qe({
  lang: e = "en",
  orientation: a = "landscape",
  ...l
}) {
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "analysis", orientation: a, ...l, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("AI Analysis", "Analisis AI"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-3" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ r(
            "section",
            {
              className: "space-y-3",
              "aria-label": e === "id" ? "Pratinjau laporan" : "Report preview",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Laporan" : "Report" }),
                /* @__PURE__ */ r("div", { className: "flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", children: [
                  /* @__PURE__ */ t(m2, { className: "h-20 w-20 text-red-400", "aria-hidden": !0 }),
                  /* @__PURE__ */ t("p", { className: "mt-4 text-center text-sm font-semibold text-slate-900", children: "Blood Test Report.pdf" }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: "2.4 MB · PDF" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ r(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Analisis AI" : "AI analysis",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Hasil AI" : "AI Results" }),
                /* @__PURE__ */ t(x2, { summary: es, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(m0, { findings: ts, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ r("div", { className: "flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4", children: [
                  /* @__PURE__ */ t(xl, { level: "medium", lang: e }),
                  /* @__PURE__ */ t("p", { className: "text-lg font-bold text-blue-600", children: "96%" })
                ] }),
                /* @__PURE__ */ t(d0, { score: 96, lang: e, dualLanguageTitle: !0 })
              ]
            }
          ),
          /* @__PURE__ */ r(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Tindakan dokter" : "Doctor actions",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Tindakan" : "Actions" }),
                /* @__PURE__ */ t(He, { items: as, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(
                  t2,
                  {
                    lang: e,
                    label: d("Doctor notes", "Catatan dokter"),
                    placeholder: e === "id" ? "Tambahkan catatan klinis…" : "Add clinical notes…",
                    rows: 4
                  }
                ),
                /* @__PURE__ */ r("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ t(P, { variant: "success", fullWidth: !0, children: e === "id" ? "Setujui" : "Approve" }),
                  /* @__PURE__ */ t(P, { variant: "secondary", fullWidth: !0, children: e === "id" ? "Validasi" : "Validate" })
                ] }),
                /* @__PURE__ */ t(P, { fullWidth: !0, children: e === "id" ? "Tindak lanjut" : "Follow-up" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function ls({ lang: e = "en", orientation: a = "landscape" }) {
  return /* @__PURE__ */ t(Qe, { lang: e, orientation: a });
}
function Xs({
  lang: e = "en",
  orientation: a = "landscape",
  startScreen: l = "worklist"
}) {
  const [s, i] = _(l !== "login"), [n, c] = _("worklist");
  if (!s)
    return /* @__PURE__ */ t(
      Je,
      {
        lang: e,
        onLogin: () => i(!0)
      }
    );
  const o = { lang: e, orientation: a, onNavChange: c, activeNav: n };
  switch (n) {
    case "consultation":
      return /* @__PURE__ */ t(Wl, { ...o, activeNav: "consultation" });
    case "medications":
      return /* @__PURE__ */ t(Kl, { ...o, activeNav: "medications" });
    case "labrad":
      return /* @__PURE__ */ t(Zl, { ...o, activeNav: "labrad" });
    case "ai-voice":
      return /* @__PURE__ */ t(Ql, { ...o, activeNav: "ai-voice" });
    case "reports":
      return /* @__PURE__ */ t(ls, { lang: e, orientation: a });
    default:
      return /* @__PURE__ */ t(
        Hl,
        {
          ...o,
          activeNav: "worklist",
          onCallPatient: () => c("consultation")
        }
      );
  }
}
const A2 = {
  today: d("Today's Patients", "Pasien Hari Ini"),
  uploads: d("Recent Uploads", "Unggahan Terbaru"),
  alerts: d("AI Alerts", "Peringatan AI"),
  quick: d("Quick Actions", "Aksi Cepat")
}, ss = [
  { id: "upload", icon: i0, label: d("Upload Report", "Unggah Laporan") },
  { id: "consult", icon: Ce, label: d("Start Consultation", "Mulai Konsultasi") },
  { id: "ai", icon: ke, label: d("Ask AI", "Tanya AI") },
  { id: "history", icon: gt, label: d("View History", "Lihat Riwayat") }
], is = [
  { id: "1", message: d("Low platelet", "Trombosit rendah"), severity: "warning" },
  { id: "2", message: d("High glucose", "Glukosa tinggi"), severity: "warning" },
  { id: "3", message: d("Follow-up needed", "Perlu tindak lanjut"), severity: "info" }
];
function rs({
  lang: e = "en",
  todayPatients: a = 8,
  pendingReview: l = 2,
  urgent: s = 1,
  recentUploads: i = 5,
  aiAlerts: n = is,
  ...c
}) {
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "dashboard", ...c, children: [
    /* @__PURE__ */ r("div", { className: "mb-6", children: [
      /* @__PURE__ */ t(
        j,
        {
          label: d("Good morning", "Selamat pagi"),
          secondaryLabel: e === "en" ? "Selamat pagi" : "Good morning",
          lang: e,
          as: "h1",
          className: "text-2xl"
        }
      ),
      /* @__PURE__ */ t("p", { className: "mt-1 text-slate-600", children: e === "id" ? "Ringkasan klinik hari ini" : "Your clinic summary for today" })
    ] }),
    /* @__PURE__ */ r("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ t(D, { children: /* @__PURE__ */ t($, { className: "py-5", children: /* @__PURE__ */ r("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ t(j, { label: A2.today, lang: e, as: "h2" }),
          /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: a }),
          /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "pasien hari ini" : "patients today" }),
          /* @__PURE__ */ r("ul", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ r("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t(_2, { className: "h-4 w-4 text-blue-600", "aria-hidden": !0 }),
              l,
              " ",
              e === "id" ? "menunggu tinjauan" : "pending review"
            ] }),
            /* @__PURE__ */ r("li", { className: "flex items-center gap-2 text-amber-700", children: [
              /* @__PURE__ */ t(Q2, { className: "h-4 w-4", "aria-hidden": !0 }),
              s,
              " ",
              e === "id" ? "mendesak" : "urgent"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50", children: /* @__PURE__ */ t(_2, { className: "h-6 w-6 text-blue-600", "aria-hidden": !0 }) })
      ] }) }) }),
      /* @__PURE__ */ t(D, { children: /* @__PURE__ */ r($, { className: "py-5", children: [
        /* @__PURE__ */ t(j, { label: A2.uploads, lang: e, as: "h2" }),
        /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: i }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "laporan terbaru" : "recent reports" })
      ] }) }),
      /* @__PURE__ */ t(D, { className: "md:col-span-2", children: /* @__PURE__ */ r($, { className: "py-5", children: [
        /* @__PURE__ */ t(j, { label: A2.alerts, lang: e, as: "h2" }),
        /* @__PURE__ */ t("ul", { className: "mt-4 space-y-3", children: n.map((o) => /* @__PURE__ */ r(
          "li",
          {
            className: u(
              "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3",
              o.severity === "warning" ? "bg-amber-50" : "bg-sky-50"
            ),
            children: [
              /* @__PURE__ */ t(
                Q2,
                {
                  className: u(
                    "h-5 w-5 shrink-0",
                    o.severity === "warning" ? "text-amber-600" : "text-sky-600"
                  ),
                  "aria-hidden": !0
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-sm font-medium text-slate-900", children: b(o.message, e) })
            ]
          },
          o.id
        )) })
      ] }) }),
      /* @__PURE__ */ t(D, { className: "md:col-span-2", children: /* @__PURE__ */ r($, { className: "py-5", children: [
        /* @__PURE__ */ t(j, { label: A2.quick, lang: e, as: "h2" }),
        /* @__PURE__ */ t("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: ss.map((o) => {
          const m = o.icon;
          return /* @__PURE__ */ r(
            P,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-14 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t(m, { className: "h-6 w-6", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs", children: b(o.label, e) })
              ]
            },
            o.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
const ns = [
  { id: "camera", icon: dt, label: d("Camera", "Kamera"), emoji: "📷" },
  { id: "pdf", icon: m2, label: d("PDF", "PDF"), emoji: "📄" },
  { id: "gallery", icon: Tt, label: d("Gallery", "Galeri"), emoji: "🖼" },
  { id: "voice", icon: R2, label: d("Voice", "Suara"), emoji: "🎤" }
], U0 = ["uploaded", "ocr", "analyzing", "completed"];
function os({
  lang: e = "en",
  pipelineStatus: a = "analyzing",
  progress: l = 65,
  fileName: s = "Blood Test Report.pdf",
  ...i
}) {
  const [n, c] = _(
    a !== "idle" ? "success" : "empty"
  );
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "upload", ...i, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("Upload Report", "Unggah Laporan"),
        lang: e,
        as: "h1",
        className: "mb-2 text-2xl"
      }
    ),
    /* @__PURE__ */ t("p", { className: "mb-6 text-slate-600", children: e === "id" ? "Unggah PDF, gambar, atau rekam suara — dioptimalkan untuk sentuhan." : "Upload PDF, image, or voice — optimized for touch." }),
    /* @__PURE__ */ r("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(
          Ge,
          {
            lang: e,
            state: n,
            className: "max-w-none",
            onFilesSelected: () => c("success")
          }
        ),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: ns.map((o) => {
          const m = o.icon;
          return /* @__PURE__ */ r(
            P,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-20 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: o.emoji }),
                /* @__PURE__ */ t(m, { className: "h-5 w-5 sm:hidden", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: b(o.label, e) })
              ]
            },
            o.id
          );
        }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: a !== "idle" ? /* @__PURE__ */ r(S2, { children: [
        /* @__PURE__ */ t(Fe, { fileName: s, lang: e, uploaded: !0 }),
        /* @__PURE__ */ r("div", { className: "overflow-hidden rounded-xl border border-slate-200 bg-white p-4", children: [
          /* @__PURE__ */ t("div", { className: "mb-3 flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100", children: /* @__PURE__ */ t(m2, { className: "h-16 w-16 text-red-400", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold", children: s }),
          a === "ocr" || a === "analyzing" ? /* @__PURE__ */ t(Te, { value: l, className: "mt-3", showLabel: !0 }) : null
        ] }),
        /* @__PURE__ */ t("ol", { className: "space-y-2", children: U0.map((o, m) => {
          const h = Math.max(0, U0.indexOf(a)), f = m < h || a === "completed", p = a === o;
          return /* @__PURE__ */ r(
            "li",
            {
              className: u(
                "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                f && "bg-emerald-50 text-emerald-800",
                p && "bg-blue-50 text-blue-800",
                !f && !p && "bg-slate-50 text-slate-500"
              ),
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: u(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      f && "bg-emerald-600 text-white",
                      p && "bg-blue-600 text-white",
                      !f && !p && "bg-slate-200 text-slate-600"
                    ),
                    children: m + 1
                  }
                ),
                b(Ol[o], e)
              ]
            },
            o
          );
        }) })
      ] }) : null })
    ] })
  ] });
}
const cs = [
  { date: "May 15, 2024", event: d("Lab report uploaded", "Laporan lab diunggah") },
  { date: "May 14, 2024", event: d("AI analysis completed", "Analisis AI selesai") },
  { date: "May 10, 2024", event: d("Follow-up scheduled", "Kontrol dijadwalkan") }
], ds = [
  { label: "BP", value: "120/80" },
  { label: "HR", value: "72 bpm" },
  { label: "Temp", value: "36.8 °C" }
];
function ms({
  lang: e = "en",
  name: a,
  mrn: l,
  age: s = 45,
  gender: i,
  embedded: n = !1,
  className: c
}) {
  const o = i ?? (e === "id" ? "Laki-laki" : "Male"), m = d(
    "Stable overall. Mild thrombocytopenia noted on latest labs.",
    "Secara umum stabil. Trombositopenia ringan pada lab terbaru."
  ), h = /* @__PURE__ */ r("div", { className: u("space-y-4", c), children: [
    /* @__PURE__ */ r("div", { children: [
      /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
      /* @__PURE__ */ r("p", { className: "text-sm text-slate-500", children: [
        l,
        " · ",
        s,
        " · ",
        o
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-2", children: ds.map((f) => /* @__PURE__ */ t(D, { children: /* @__PURE__ */ r($, { className: "py-3 text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: f.label }),
      /* @__PURE__ */ t("p", { className: "text-sm font-bold", children: f.value })
    ] }) }, f.label)) }),
    /* @__PURE__ */ t(x2, { summary: m, lang: e }),
    /* @__PURE__ */ t(D, { children: /* @__PURE__ */ r($, { children: [
      /* @__PURE__ */ r("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(s0, { className: "h-5 w-5 text-teal-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          j,
          {
            label: d("Doctor Notes", "Catatan Dokter"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("p", { className: "text-sm text-slate-700", children: e === "id" ? "Pantau trombosit. Kontrol ulang dalam 3 bulan." : "Monitor platelets. Repeat CBC in 3 months." })
    ] }) }),
    /* @__PURE__ */ t(D, { children: /* @__PURE__ */ r($, { children: [
      /* @__PURE__ */ r("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(pe, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          j,
          {
            label: d("Medical Timeline", "Linimasa Medis"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("ul", { className: "space-y-3", children: cs.map((f) => /* @__PURE__ */ r("li", { className: "flex gap-3 text-sm", children: [
        /* @__PURE__ */ t(m2, { className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400", "aria-hidden": !0 }),
        /* @__PURE__ */ r("div", { children: [
          /* @__PURE__ */ t("p", { className: "font-medium text-slate-900", children: b(f.event, e) }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: f.date })
        ] })
      ] }, f.date)) })
    ] }) }),
    /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ t(Y, { variant: "low", children: e === "id" ? "Trombosit rendah" : "Low platelet" }),
      /* @__PURE__ */ t(Y, { variant: "normal", children: e === "id" ? "Stabil" : "Stable" })
    ] })
  ] });
  return n ? h : /* @__PURE__ */ t("div", { className: "max-w-2xl p-4", children: h });
}
const hs = [
  {
    id: "1",
    name: "John Doe",
    mrn: "MRN-10234",
    status: "waiting",
    statusLabel: { en: "Waiting", id: "Menunggu" }
  },
  {
    id: "2",
    name: "Sarah Lee",
    mrn: "MRN-10235",
    status: "in-review",
    statusLabel: { en: "In Review", id: "Ditinjau" }
  },
  {
    id: "3",
    name: "Budi Santoso",
    mrn: "MRN-10236",
    status: "follow-up",
    statusLabel: { en: "Follow-up", id: "Tindak lanjut" }
  }
], us = {
  waiting: "info",
  "in-review": "ai",
  "follow-up": "low"
};
function ps({
  lang: e = "en",
  patients: a = hs,
  orientation: l = "landscape",
  ...s
}) {
  var o;
  const [i, n] = _((o = a[0]) == null ? void 0 : o.id), c = a.find((m) => m.id === i);
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "queue", orientation: l, ...s, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("Patient Queue", "Antrian Pasien"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ t(
      e2,
      {
        lang: e,
        label: d("Search", "Cari"),
        placeholder: e === "id" ? "Nama pasien, MRN, atau telepon" : "Patient name, MRN, or phone",
        className: "mb-4 max-w-xl"
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "flex min-h-[480px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          l === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ t(
            "ul",
            {
              className: u(
                "divide-y divide-slate-100 overflow-y-auto",
                l === "landscape" ? "w-80 shrink-0 border-r" : "max-h-64"
              ),
              role: "listbox",
              "aria-label": e === "id" ? "Daftar pasien" : "Patient list",
              children: a.map((m) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ r(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": i === m.id,
                  onClick: () => n(m.id),
                  className: u(
                    "flex w-full min-h-14 touch-manipulation items-center justify-between gap-3 px-4 py-4 text-left transition-colors",
                    i === m.id ? "bg-blue-50" : "hover:bg-slate-50"
                  ),
                  children: [
                    /* @__PURE__ */ r("div", { children: [
                      /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: m.name }),
                      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: m.mrn })
                    ] }),
                    /* @__PURE__ */ t(Y, { variant: us[m.status], children: b(m.statusLabel, e) })
                  ]
                }
              ) }, m.id))
            }
          ),
          /* @__PURE__ */ t("div", { className: "min-w-0 flex-1 overflow-y-auto p-4", children: c ? /* @__PURE__ */ t(
            ms,
            {
              lang: e,
              name: c.name,
              mrn: c.mrn,
              embedded: !0
            }
          ) : null })
        ]
      }
    )
  ] });
}
const fs = d(
  "Platelet mildly low. Otherwise stable. Recommend repeat CBC in 3 months.",
  "Trombosit sedikit rendah. Selain itu stabil. Disarankan ulang CBC dalam 3 bulan."
), bs = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" }
], xs = [
  { value: "approve", label: d("Approve", "Setujui"), icon: a0, variant: "success" },
  { value: "partial", label: d("Partial approve", "Setujui sebagian"), icon: Ne, variant: "secondary" },
  { value: "reject", label: d("Reject", "Tolak"), icon: Na, variant: "danger" }
];
function Xe({
  lang: e = "en",
  onSubmit: a,
  ...l
}) {
  const [s, i] = _("approve"), [n, c] = _(""), [o, m] = _(
    e === "id" ? `Ulang CBC
Pantau 3 bulan` : `Repeat CBC
Monitor 3 months`
  );
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "review", ...l, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("Doctor Review", "Tinjauan Dokter"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ r("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ r("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(x2, { summary: fs, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(m0, { findings: bs, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(d0, { score: 96, lang: e, dualLanguageTitle: !0 })
      ] }),
      /* @__PURE__ */ r("div", { className: "space-y-4 rounded-2xl border border-slate-200 bg-white p-6", children: [
        /* @__PURE__ */ t(
          t2,
          {
            lang: e,
            label: d("Editable doctor notes", "Catatan dokter"),
            value: n,
            onChange: (h) => c(h.target.value),
            placeholder: e === "id" ? "Tambahkan atau koreksi temuan AI…" : "Add or correct AI findings…",
            rows: 5
          }
        ),
        /* @__PURE__ */ t(
          t2,
          {
            lang: e,
            label: d("Add recommendation", "Tambah rekomendasi"),
            value: o,
            onChange: (h) => m(h.target.value),
            rows: 3
          }
        ),
        /* @__PURE__ */ r("fieldset", { children: [
          /* @__PURE__ */ t("legend", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Keputusan" : "Decision" }),
          /* @__PURE__ */ t("div", { className: "grid gap-3 sm:grid-cols-3", children: xs.map((h) => {
            const f = h.icon;
            return /* @__PURE__ */ r(
              P,
              {
                variant: s === h.value ? h.variant : "secondary",
                fullWidth: !0,
                className: "min-h-14",
                onClick: () => i(h.value),
                "aria-pressed": s === h.value,
                children: [
                  /* @__PURE__ */ t(f, { className: "h-5 w-5", "aria-hidden": !0 }),
                  b(h.label, e)
                ]
              },
              h.value
            );
          }) })
        ] }),
        /* @__PURE__ */ t(
          P,
          {
            fullWidth: !0,
            size: "xl",
            className: "min-h-14",
            leftIcon: /* @__PURE__ */ t(Ne, { className: "h-5 w-5", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a(s, n),
            children: e === "id" ? "Tanda tangan & kirim" : "Sign & submit"
          }
        )
      ] })
    ] })
  ] });
}
const gs = [
  d("Is this platelet concerning?", "Apakah trombosit ini mengkhawatirkan?"),
  d("Summarize in Bahasa Indonesia", "Ringkas dalam Bahasa Indonesia"),
  d("Generate patient explanation", "Buat penjelasan untuk pasien")
], vs = [
  d("Explain to patient", "Jelaskan ke pasien"),
  d("Doctor summary", "Ringkasan dokter"),
  d("Compare previous result", "Bandingkan hasil sebelumnya")
], ys = [
  { id: "1", title: "Platelet review", time: "10:32" },
  { id: "2", title: "Lab summary ID", time: "09:15" },
  { id: "3", title: "Glucose context", time: "Yesterday" }
], ws = [
  {
    role: "user",
    content: "Is this platelet count concerning for this patient?"
  },
  {
    role: "assistant",
    content: "142,000 /µL is mildly below the typical reference range. Consider clinical context, symptoms, and trend vs prior labs. Follow-up CBC in 3 months is reasonable if stable."
  }
];
function ks({
  lang: e = "en",
  orientation: a = "landscape",
  ...l
}) {
  const [s, i] = _(ws), [n, c] = _("1");
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "chat", orientation: a, ...l, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("Chat Assistant", "Asisten Chat"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "flex min-h-[520px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          a === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ r(
            "aside",
            {
              className: u(
                "shrink-0 overflow-y-auto border-slate-200 bg-slate-50 p-3",
                a === "landscape" ? "w-56 border-r" : "max-h-40 border-b"
              ),
              children: [
                /* @__PURE__ */ t("p", { className: "mb-2 px-2 text-xs font-semibold uppercase text-slate-500", children: e === "id" ? "Riwayat" : "History" }),
                /* @__PURE__ */ t("ul", { className: "space-y-1", children: ys.map((o) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ r(
                  "button",
                  {
                    type: "button",
                    onClick: () => c(o.id),
                    className: u(
                      "flex w-full min-h-12 touch-manipulation flex-col rounded-xl px-3 py-3 text-left text-sm",
                      n === o.id ? "bg-blue-100 font-semibold text-blue-800" : "hover:bg-white"
                    ),
                    children: [
                      /* @__PURE__ */ t("span", { children: o.title }),
                      /* @__PURE__ */ t("span", { className: "text-xs text-slate-500", children: o.time })
                    ]
                  }
                ) }, o.id)) })
              ]
            }
          ),
          /* @__PURE__ */ r("div", { className: "flex min-w-0 flex-1 flex-col", children: [
            /* @__PURE__ */ t("div", { className: "flex-1 space-y-4 overflow-y-auto p-4", children: s.map((o, m) => /* @__PURE__ */ t(We, { role: o.role, content: o.content }, m)) }),
            /* @__PURE__ */ r("div", { className: "border-t border-slate-100 p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-2 text-xs font-semibold text-slate-500", children: e === "id" ? "Saran pertanyaan" : "Suggested prompts" }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: gs.map((o, m) => /* @__PURE__ */ t(
                P,
                {
                  variant: "secondary",
                  size: "md",
                  className: "h-auto min-h-12 whitespace-normal py-2 text-left text-xs",
                  onClick: () => i((h) => [
                    ...h,
                    { role: "user", content: b(o, e) }
                  ]),
                  children: b(o, e)
                },
                m
              )) }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: vs.map((o, m) => /* @__PURE__ */ t(P, { variant: "ghost", size: "md", children: b(o, e) }, m)) }),
              /* @__PURE__ */ t(
                Nl,
                {
                  lang: e,
                  onSend: (o) => i((m) => [...m, { role: "user", content: o }])
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
const Ns = d(
  "Patient reports mild cough and low-grade fever. Vitals stable on video assessment.",
  "Pasien melaporkan batuk ringan dan demam rendah. Tanda vital stabil pada penilaian video."
), Ms = [
  { role: "assistant", content: "Patient: I have had a cough for two days." },
  { role: "user", content: "Doctor: Any difficulty breathing?" },
  { role: "assistant", content: "Patient: No, just a mild dry cough." }
];
function zs({
  lang: e = "en",
  orientation: a = "landscape",
  ...l
}) {
  return /* @__PURE__ */ r(s2, { lang: e, activeNav: "dashboard", ...l, children: [
    /* @__PURE__ */ t(
      j,
      {
        label: d("Telemedicine", "Telemedicine"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ r(
      "div",
      {
        className: u(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-[1fr_280px]" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ r("div", { className: "space-y-4", children: [
            /* @__PURE__ */ r("div", { className: "relative aspect-video overflow-hidden rounded-2xl bg-slate-900", children: [
              /* @__PURE__ */ r("div", { className: "absolute inset-0 flex items-center justify-center text-white/60", children: [
                /* @__PURE__ */ t(Ce, { className: "h-16 w-16", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "sr-only", children: e === "id" ? "Video pasien" : "Patient video" })
              ] }),
              /* @__PURE__ */ t("div", { className: "absolute bottom-4 left-4 h-24 w-32 overflow-hidden rounded-lg border-2 border-white/30 bg-slate-800", children: /* @__PURE__ */ t("div", { className: "flex h-full items-center justify-center text-xs text-white/50", children: e === "id" ? "Dokter" : "Doctor" }) }),
              /* @__PURE__ */ r("div", { className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-slate-900/80 px-4 py-3", children: [
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Bisukan" : "Mute",
                    children: /* @__PURE__ */ t(R2, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Kamera" : "Camera",
                    children: /* @__PURE__ */ t(ga, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "danger",
                    className: "min-h-12 min-w-12 rounded-full",
                    "aria-label": e === "id" ? "Akhiri panggilan" : "End call",
                    children: /* @__PURE__ */ t(Ut, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ r("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Transkrip langsung" : "Live transcript" }),
              /* @__PURE__ */ t("div", { className: "max-h-40 space-y-2 overflow-y-auto", children: Ms.map((s, i) => /* @__PURE__ */ t(We, { role: s.role, content: s.content }, i)) })
            ] })
          ] }),
          /* @__PURE__ */ r("aside", { className: "space-y-4", children: [
            /* @__PURE__ */ t(x2, { summary: Ns, lang: e }),
            /* @__PURE__ */ t(P, { fullWidth: !0, variant: "success", className: "min-h-14", children: e === "id" ? "Simpan ringkasan" : "Save summary" })
          ] })
        ]
      }
    )
  ] });
}
const ei = {
  tabletLandscape: {
    name: "Android Tablet Landscape",
    styles: { width: "1280px", height: "800px" },
    type: "desktop"
  },
  tabletPortrait: {
    name: "Android Tablet Portrait",
    styles: { width: "800px", height: "1280px" },
    type: "desktop"
  }
}, Es = d(
  "Overall health status appears stable. Mildly elevated LDL cholesterol noted; platelet count is slightly below reference range. Recommend follow-up in 3 months.",
  "Status kesehatan secara umum stabil. Kolesterol LDL sedikit meningkat; trombosit sedikit di bawah rentang referensi. Disarankan kontrol dalam 3 bulan."
), Cs = [
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "WBC", value: "8,100 /µL", status: "normal" },
  { label: "Platelet", value: "142,000 /µL", status: "low" }
], As = [
  {
    id: "1",
    title: d("Maintain healthy lifestyle", "Pertahankan gaya hidup sehat"),
    description: d("Balanced diet and regular exercise", "Diet seimbang dan olahraga teratur"),
    icon: "heart"
  },
  {
    id: "2",
    title: d("Follow up in 3 months", "Kontrol dalam 3 bulan"),
    description: d("Repeat CBC and lipid panel", "Ulang CBC dan panel lipid"),
    icon: "calendar"
  }
], Ss = [
  { en: "Upload Report", id: "Unggah Laporan", color: "bg-blue-600" },
  { en: "AI Analysis", id: "Analisis AI", color: "bg-teal-500" },
  { en: "Doctor Summary", id: "Ringkasan Dokter", color: "bg-blue-600" }
];
function ti({
  lang: e = "en",
  step: a = 2
}) {
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-slate-50 p-6", children: /* @__PURE__ */ r("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ r("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ r("div", { children: [
        /* @__PURE__ */ t("h1", { className: "font-heading text-2xl font-bold text-slate-900", children: e === "id" ? "Analisis Laporan Medis" : "Medical Report Analysis" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: e === "id" ? "Alur kerja AI untuk laporan medis" : "AI-powered medical report workflow" })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-blue-600", children: "alocare.ai" })
    ] }),
    /* @__PURE__ */ r("div", { className: "relative mb-10 flex justify-between px-4", children: [
      /* @__PURE__ */ t("div", { className: "absolute left-8 right-8 top-4 h-0.5 bg-slate-200", "aria-hidden": !0 }),
      Ss.map((l, s) => /* @__PURE__ */ r("div", { className: "relative z-10 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: `flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${s + 1 <= a ? l.color : "bg-slate-300"}`,
            children: s + 1
          }
        ),
        /* @__PURE__ */ t("span", { className: "text-center text-xs font-semibold text-slate-900", children: e === "id" ? l.id : l.en }),
        /* @__PURE__ */ t("span", { className: "text-center text-xs text-blue-600", children: e === "id" ? l.en : l.id })
      ] }, l.en))
    ] }),
    /* @__PURE__ */ r("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ r("section", { className: "space-y-4", "aria-label": e === "id" ? "Unggah" : "Upload", children: [
        /* @__PURE__ */ t(Ge, { lang: e, state: a >= 1 ? "success" : "empty" }),
        /* @__PURE__ */ t(
          Fe,
          {
            fileName: "Blood Test Report.pdf",
            lang: e,
            uploaded: a >= 1
          }
        ),
        /* @__PURE__ */ t(cl, { lang: e, status: a >= 1 ? "complete" : "pending" })
      ] }),
      /* @__PURE__ */ r("section", { className: "space-y-4", "aria-label": e === "id" ? "Analisis AI" : "AI Analysis", children: [
        /* @__PURE__ */ t(x2, { summary: Es, lang: e, loading: a < 2 }),
        /* @__PURE__ */ t(m0, { findings: Cs, lang: e }),
        /* @__PURE__ */ t(d0, { score: 96, lang: e })
      ] }),
      /* @__PURE__ */ t("section", { className: "space-y-4", "aria-label": e === "id" ? "Dokter" : "Doctor", children: /* @__PURE__ */ t(He, { items: As, lang: e }) })
    ] })
  ] }) });
}
function ai({
  children: e,
  sidebar: a,
  locale: l = "en",
  onLocaleChange: s,
  className: i
}) {
  return /* @__PURE__ */ r("div", { className: u("min-h-screen bg-slate-50", i), children: [
    /* @__PURE__ */ t(nl, { locale: l, onLocaleChange: s }),
    /* @__PURE__ */ r("div", { className: "mx-auto flex max-w-7xl gap-6 px-6 py-6", children: [
      a ? /* @__PURE__ */ t("aside", { className: "hidden w-56 shrink-0 lg:block", "aria-label": "Sidebar", children: a }) : null,
      /* @__PURE__ */ t("main", { className: "min-w-0 flex-1", children: e })
    ] }),
    /* @__PURE__ */ t("footer", { className: "mx-auto max-w-7xl px-6 pb-8", children: /* @__PURE__ */ r("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ t(F0, { variant: "privacy" }),
      /* @__PURE__ */ t(F0, { variant: "encryption" })
    ] }) })
  ] });
}
function li({
  lang: e = "en",
  orientation: a = "landscape",
  initialNav: l = "dashboard"
}) {
  const [s, i] = _(l), n = {
    lang: e,
    orientation: a,
    activeNav: s,
    onNavChange: i
  };
  switch (s) {
    case "upload":
      return /* @__PURE__ */ t(os, { ...n, activeNav: "upload" });
    case "queue":
      return /* @__PURE__ */ t(ps, { ...n, activeNav: "queue" });
    case "analysis":
      return /* @__PURE__ */ t(Qe, { ...n, activeNav: "analysis" });
    case "review":
      return /* @__PURE__ */ t(Xe, { ...n, activeNav: "review" });
    case "chat":
      return /* @__PURE__ */ t(ks, { ...n, activeNav: "chat" });
    default:
      return /* @__PURE__ */ t(rs, { ...n, activeNav: "dashboard" });
  }
}
function si({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(Xe, { lang: e, orientation: a, activeNav: "review" });
}
function ii({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(zs, { lang: e, orientation: a });
}
export {
  Us as AIStatusBadge,
  Ue as AUTH_API,
  Rl as AdminLogin,
  T2 as AlocareLogo,
  Fs as AlocareThemeProvider,
  Ys as AuthLoginShowcase,
  Ve as Avatar,
  K0 as BRAND_LOGO_ASPECT,
  Is as BRAND_LOGO_PATH,
  Ts as BRAND_LOGO_PNG_PATH,
  Y as Badge,
  j as BilingualLabel,
  l2 as Button,
  D as Card,
  $ as CardContent,
  Ws as CardFooter,
  h2 as CardHeader,
  Hs as CardTitle,
  Nl as ChatInput,
  We as ChatMessage,
  li as ClinicWorkflowTablet,
  x2 as ClinicalSummaryCard,
  d0 as ConfidenceScore,
  ii as ConsultationTablet,
  ai as DashboardLayout,
  qs as DoctorReviewPanel,
  si as DoctorReviewTablet,
  Ql as EMRAIVoiceConsultation,
  Wl as EMRConsultationSOAP,
  Zl as EMRLabRadOrders,
  Je as EMRLogin,
  Kl as EMRMedicationOrders,
  j2 as EMRPatientBanner,
  ls as EMRReports,
  g2 as EMRTabletShell,
  Xs as EMRWorkflowTablet,
  Hl as EMRWorklist,
  n2 as EMR_API,
  Ks as EmployeeHealthCard,
  jl as HRPortalLogin,
  nl as Header,
  e2 as Input,
  m0 as KeyFindingCard,
  u2 as LanguageSwitcher,
  i1 as LocaleProvider,
  p0 as LoginBrand,
  Al as LoginBrandPanel,
  u0 as LoginCard,
  qe as LoginCardContent,
  Js as LoginCardHeader,
  _l as LoginDivider,
  Ll as LoginErrorAlert,
  f0 as LoginFooter,
  b0 as LoginForm,
  Pl as LoginGoogleButton,
  h0 as LoginLayout,
  Zs as LoginMenuBar,
  Il as LoginPasswordField,
  ti as MedicalReportAnalysis,
  cl as OCRStatusCard,
  Tl as PortalLogin,
  Te as Progress,
  He as RecommendationList,
  xl as RiskIndicator,
  r0 as Spinner,
  F0 as SystemHealthBadge,
  Qe as TabletAnalysisView,
  ks as TabletChat,
  rs as TabletDashboard,
  Xe as TabletDoctorReview,
  Qs as TabletNav,
  ms as TabletPatientDetail,
  ps as TabletPatientQueue,
  s2 as TabletShell,
  zs as TabletTelemedicine,
  os as TabletUploadFlow,
  t2 as Textarea,
  P as TouchButton,
  Ge as UploadDropzone,
  Fe as UploadPreview,
  O as authCopy,
  d as bilingual,
  G2 as brandColors,
  u as cn,
  Rs as colors,
  H0 as loginShadows,
  I as loginSizing,
  Vs as motion,
  Os as radius,
  $s as shadows,
  js as spacing,
  b as t,
  ei as tabletViewports,
  Ds as typography,
  Gs as useLocale,
  Bs as zIndex
};
