import { jsx as t, jsxs as l, Fragment as K0 } from "react/jsx-runtime";
import * as z from "react";
import U2, { createContext as et, useState as _, useMemo as tt, useContext as at, forwardRef as d0, createElement as J0, useRef as st, useCallback as rt } from "react";
import "react-dom";
const Dn = {
  primary: {
    600: "#2563EB",
    700: "#1D4ED8"
  },
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
}, On = {
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
}, $n = {
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
}, Bn = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px"
}, Vn = {
  card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
  floating: "0 10px 40px -12px rgb(15 23 42 / 0.18), 0 4px 16px -4px rgb(15 23 42 / 0.08)",
  modal: "0 25px 50px -12px rgb(15 23 42 / 0.25)",
  focus: "0 0 0 3px rgb(37 99 235 / 0.35)"
}, Gn = {
  base: 0,
  dropdown: 1e3,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500
}, Hn = {
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
function f(e, a = "en") {
  return typeof e == "string" ? e : e[a];
}
function d(e, a) {
  return { en: e, id: a };
}
const q2 = et(null);
function nt({
  children: e,
  defaultLocale: a = "en"
}) {
  const [s, r] = _(a), n = tt(
    () => ({
      locale: s,
      setLocale: r,
      t: (i) => f(i, s)
    }),
    [s]
  );
  return /* @__PURE__ */ t(q2.Provider, { value: n, children: e });
}
function Fn() {
  const e = at(q2);
  return e || {
    locale: "en",
    setLocale: () => {
    },
    t: (a) => f(a, "en")
  };
}
function Wn({
  children: e,
  defaultLocale: a = "en"
}) {
  return /* @__PURE__ */ t(nt, { defaultLocale: a, children: e });
}
function K2(e) {
  var a, s, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var n = e.length;
    for (a = 0; a < n; a++) e[a] && (s = K2(e[a])) && (r && (r += " "), r += s);
  } else for (s in e) e[s] && (r && (r += " "), r += s);
  return r;
}
function J2() {
  for (var e, a, s = 0, r = "", n = arguments.length; s < n; s++) (e = arguments[s]) && (a = K2(e)) && (r && (r += " "), r += a);
  return r;
}
const lt = (e, a) => {
  const s = new Array(e.length + a.length);
  for (let r = 0; r < e.length; r++)
    s[r] = e[r];
  for (let r = 0; r < a.length; r++)
    s[e.length + r] = a[r];
  return s;
}, it = (e, a) => ({
  classGroupId: e,
  validator: a
}), Z2 = (e = /* @__PURE__ */ new Map(), a = null, s) => ({
  nextPart: e,
  validators: a,
  classGroupId: s
}), L0 = "-", M2 = [], ot = "arbitrary..", ct = (e) => {
  const a = mt(e), {
    conflictingClassGroups: s,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (c) => {
      if (c.startsWith("[") && c.endsWith("]"))
        return dt(c);
      const o = c.split(L0), u = o[0] === "" && o.length > 1 ? 1 : 0;
      return Y2(o, u, a);
    },
    getConflictingClassGroupIds: (c, o) => {
      if (o) {
        const u = r[c], m = s[c];
        return u ? m ? lt(m, u) : u : m || M2;
      }
      return s[c] || M2;
    }
  };
}, Y2 = (e, a, s) => {
  if (e.length - a === 0)
    return s.classGroupId;
  const n = e[a], i = s.nextPart.get(n);
  if (i) {
    const m = Y2(e, a + 1, i);
    if (m) return m;
  }
  const c = s.validators;
  if (c === null)
    return;
  const o = a === 0 ? e.join(L0) : e.slice(a).join(L0), u = c.length;
  for (let m = 0; m < u; m++) {
    const b = c[m];
    if (b.validator(o))
      return b.classGroupId;
  }
}, dt = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const a = e.slice(1, -1), s = a.indexOf(":"), r = a.slice(0, s);
  return r ? ot + r : void 0;
})(), mt = (e) => {
  const {
    theme: a,
    classGroups: s
  } = e;
  return ut(s, a);
}, ut = (e, a) => {
  const s = Z2();
  for (const r in e) {
    const n = e[r];
    X0(n, s, r, a);
  }
  return s;
}, X0 = (e, a, s, r) => {
  const n = e.length;
  for (let i = 0; i < n; i++) {
    const c = e[i];
    ht(c, a, s, r);
  }
}, ht = (e, a, s, r) => {
  if (typeof e == "string") {
    pt(e, a, s);
    return;
  }
  if (typeof e == "function") {
    bt(e, a, s, r);
    return;
  }
  ft(e, a, s, r);
}, pt = (e, a, s) => {
  const r = e === "" ? a : Q2(a, e);
  r.classGroupId = s;
}, bt = (e, a, s, r) => {
  if (xt(e)) {
    X0(e(r), a, s, r);
    return;
  }
  a.validators === null && (a.validators = []), a.validators.push(it(s, e));
}, ft = (e, a, s, r) => {
  const n = Object.entries(e), i = n.length;
  for (let c = 0; c < i; c++) {
    const [o, u] = n[c];
    X0(u, Q2(a, o), s, r);
  }
}, Q2 = (e, a) => {
  let s = e;
  const r = a.split(L0), n = r.length;
  for (let i = 0; i < n; i++) {
    const c = r[i];
    let o = s.nextPart.get(c);
    o || (o = Z2(), s.nextPart.set(c, o)), s = o;
  }
  return s;
}, xt = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, gt = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, s = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null);
  const n = (i, c) => {
    s[i] = c, a++, a > e && (a = 0, r = s, s = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(i) {
      let c = s[i];
      if (c !== void 0)
        return c;
      if ((c = r[i]) !== void 0)
        return n(i, c), c;
    },
    set(i, c) {
      i in s ? s[i] = c : n(i, c);
    }
  };
}, Z0 = "!", A2 = ":", vt = [], C2 = (e, a, s, r, n) => ({
  modifiers: e,
  hasImportantModifier: a,
  baseClassName: s,
  maybePostfixModifierPosition: r,
  isExternal: n
}), yt = (e) => {
  const {
    prefix: a,
    experimentalParseClassName: s
  } = e;
  let r = (n) => {
    const i = [];
    let c = 0, o = 0, u = 0, m;
    const b = n.length;
    for (let M = 0; M < b; M++) {
      const C = n[M];
      if (c === 0 && o === 0) {
        if (C === A2) {
          i.push(n.slice(u, M)), u = M + 1;
          continue;
        }
        if (C === "/") {
          m = M;
          continue;
        }
      }
      C === "[" ? c++ : C === "]" ? c-- : C === "(" ? o++ : C === ")" && o--;
    }
    const p = i.length === 0 ? n : n.slice(u);
    let w = p, y = !1;
    p.endsWith(Z0) ? (w = p.slice(0, -1), y = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      p.startsWith(Z0) && (w = p.slice(1), y = !0)
    );
    const A = m && m > u ? m - u : void 0;
    return C2(i, y, w, A);
  };
  if (a) {
    const n = a + A2, i = r;
    r = (c) => c.startsWith(n) ? i(c.slice(n.length)) : C2(vt, !1, c, void 0, !0);
  }
  if (s) {
    const n = r;
    r = (i) => s({
      className: i,
      parseClassName: n
    });
  }
  return r;
}, wt = (e) => {
  const a = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((s, r) => {
    a.set(s, 1e6 + r);
  }), (s) => {
    const r = [];
    let n = [];
    for (let i = 0; i < s.length; i++) {
      const c = s[i], o = c[0] === "[", u = a.has(c);
      o || u ? (n.length > 0 && (n.sort(), r.push(...n), n = []), r.push(c)) : n.push(c);
    }
    return n.length > 0 && (n.sort(), r.push(...n)), r;
  };
}, Nt = (e) => ({
  cache: gt(e.cacheSize),
  parseClassName: yt(e),
  sortModifiers: wt(e),
  postfixLookupClassGroupIds: kt(e),
  ...ct(e)
}), kt = (e) => {
  const a = /* @__PURE__ */ Object.create(null), s = e.postfixLookupClassGroups;
  if (s)
    for (let r = 0; r < s.length; r++)
      a[s[r]] = !0;
  return a;
}, Mt = /\s+/, At = (e, a) => {
  const {
    parseClassName: s,
    getClassGroupId: r,
    getConflictingClassGroupIds: n,
    sortModifiers: i,
    postfixLookupClassGroupIds: c
  } = a, o = [], u = e.trim().split(Mt);
  let m = "";
  for (let b = u.length - 1; b >= 0; b -= 1) {
    const p = u[b], {
      isExternal: w,
      modifiers: y,
      hasImportantModifier: A,
      baseClassName: M,
      maybePostfixModifierPosition: C
    } = s(p);
    if (w) {
      m = p + (m.length > 0 ? " " + m : m);
      continue;
    }
    let L = !!C, T;
    if (L) {
      const F = M.substring(0, C);
      T = r(F);
      const g = T && c[T] ? r(M) : void 0;
      g && g !== T && (T = g, L = !1);
    } else
      T = r(M);
    if (!T) {
      if (!L) {
        m = p + (m.length > 0 ? " " + m : m);
        continue;
      }
      if (T = r(M), !T) {
        m = p + (m.length > 0 ? " " + m : m);
        continue;
      }
      L = !1;
    }
    const G = y.length === 0 ? "" : y.length === 1 ? y[0] : i(y).join(":"), U = A ? G + Z0 : G, q = U + T;
    if (o.indexOf(q) > -1)
      continue;
    o.push(q);
    const Q = n(T, L);
    for (let F = 0; F < Q.length; ++F) {
      const g = Q[F];
      o.push(U + g);
    }
    m = p + (m.length > 0 ? " " + m : m);
  }
  return m;
}, Ct = (...e) => {
  let a = 0, s, r, n = "";
  for (; a < e.length; )
    (s = e[a++]) && (r = X2(s)) && (n && (n += " "), n += r);
  return n;
}, X2 = (e) => {
  if (typeof e == "string")
    return e;
  let a, s = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (a = X2(e[r])) && (s && (s += " "), s += a);
  return s;
}, St = (e, ...a) => {
  let s, r, n, i;
  const c = (u) => {
    const m = a.reduce((b, p) => p(b), e());
    return s = Nt(m), r = s.cache.get, n = s.cache.set, i = o, o(u);
  }, o = (u) => {
    const m = r(u);
    if (m)
      return m;
    const b = At(u, s);
    return n(u, b), b;
  };
  return i = c, (...u) => i(Ct(...u));
}, zt = [], E = (e) => {
  const a = (s) => s[e] || zt;
  return a.isThemeGetter = !0, a;
}, ee = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, te = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Lt = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Pt = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, _t = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, It = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, Tt = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Rt = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, X = (e) => Lt.test(e), S = (e) => !!e && !Number.isNaN(Number(e)), K = (e) => !!e && Number.isInteger(Number(e)), V0 = (e) => e.endsWith("%") && S(e.slice(0, -1)), J = (e) => Pt.test(e), ae = () => !0, Et = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  _t.test(e) && !It.test(e)
), e2 = () => !1, jt = (e) => Tt.test(e), Dt = (e) => Rt.test(e), Ot = (e) => !x(e) && !v(e), $t = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Bt = (e) => a0(e, ne, e2), x = (e) => ee.test(e), l0 = (e) => a0(e, le, Et), S2 = (e) => a0(e, Kt, S), Vt = (e) => a0(e, oe, ae), Gt = (e) => a0(e, ie, e2), z2 = (e) => a0(e, se, e2), Ht = (e) => a0(e, re, Dt), M0 = (e) => a0(e, ce, jt), v = (e) => te.test(e), p0 = (e) => o0(e, le), Ft = (e) => o0(e, ie), L2 = (e) => o0(e, se), Wt = (e) => o0(e, ne), Ut = (e) => o0(e, re), A0 = (e) => o0(e, ce, !0), qt = (e) => o0(e, oe, !0), a0 = (e, a, s) => {
  const r = ee.exec(e);
  return r ? r[1] ? a(r[1]) : s(r[2]) : !1;
}, o0 = (e, a, s = !1) => {
  const r = te.exec(e);
  return r ? r[1] ? a(r[1]) : s : !1;
}, se = (e) => e === "position" || e === "percentage", re = (e) => e === "image" || e === "url", ne = (e) => e === "length" || e === "size" || e === "bg-size", le = (e) => e === "length", Kt = (e) => e === "number", ie = (e) => e === "family-name", oe = (e) => e === "number" || e === "weight", ce = (e) => e === "shadow", Jt = () => {
  const e = E("color"), a = E("font"), s = E("text"), r = E("font-weight"), n = E("tracking"), i = E("leading"), c = E("breakpoint"), o = E("container"), u = E("spacing"), m = E("radius"), b = E("shadow"), p = E("inset-shadow"), w = E("text-shadow"), y = E("drop-shadow"), A = E("blur"), M = E("perspective"), C = E("aspect"), L = E("ease"), T = E("animate"), G = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], U = () => [
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
  ], q = () => [...U(), v, x], Q = () => ["auto", "hidden", "clip", "visible", "scroll"], F = () => ["auto", "contain", "none"], g = () => [v, x, u], H = () => [X, "full", "auto", ...g()], f2 = () => [K, "none", "subgrid", v, x], x2 = () => ["auto", {
    span: ["full", K, v, x]
  }, K, v, x], v0 = () => [K, "auto", v, x], g2 = () => ["auto", "min", "max", "fr", v, x], j0 = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], c0 = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], W = () => ["auto", ...g()], n0 = () => [X, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...g()], D0 = () => [X, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...g()], O0 = () => [X, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...g()], N = () => [e, v, x], v2 = () => [...U(), L2, z2, {
    position: [v, x]
  }], y2 = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], w2 = () => ["auto", "cover", "contain", Wt, Bt, {
    size: [v, x]
  }], $0 = () => [V0, p0, l0], B = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    m,
    v,
    x
  ], V = () => ["", S, p0, l0], y0 = () => ["solid", "dashed", "dotted", "double"], N2 = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], j = () => [S, V0, L2, z2], k2 = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    A,
    v,
    x
  ], w0 = () => ["none", S, v, x], N0 = () => ["none", S, v, x], B0 = () => [S, v, x], k0 = () => [X, "full", ...g()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [J],
      breakpoint: [J],
      color: [ae],
      container: [J],
      "drop-shadow": [J],
      ease: ["in", "out", "in-out"],
      font: [Ot],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [J],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [J],
      shadow: [J],
      spacing: ["px", S],
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
        aspect: ["auto", "square", X, x, v, C]
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
      "container-named": [$t],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [S, x, v, o]
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
        overscroll: F()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": F()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": F()
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
        inset: H()
      }],
      /**
       * Inset Inline
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": H()
      }],
      /**
       * Inset Block
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": H()
      }],
      /**
       * Inset Inline Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-s` in next major release
       */
      start: [{
        "inset-s": H(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-s-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        start: H()
      }],
      /**
       * Inset Inline End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       * @todo class group will be renamed to `inset-e` in next major release
       */
      end: [{
        "inset-e": H(),
        /**
         * @deprecated since Tailwind CSS v4.2.0 in favor of `inset-e-*` utilities.
         * @see https://github.com/tailwindlabs/tailwindcss/pull/19613
         */
        end: H()
      }],
      /**
       * Inset Block Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-bs": [{
        "inset-bs": H()
      }],
      /**
       * Inset Block End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-be": [{
        "inset-be": H()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: H()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: H()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: H()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: H()
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
        flex: [S, X, "auto", "initial", "none", x]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", S, v, x]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", S, v, x]
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
        "grid-cols": f2()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: x2()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": v0()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": v0()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": f2()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: x2()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": v0()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": v0()
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
        "auto-cols": g2()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": g2()
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
        justify: [...j0(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...c0(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...c0()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...j0()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...c0(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...c0(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": j0()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...c0(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...c0()]
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
        size: n0()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...D0()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...D0()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...D0()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...O0()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...O0()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...O0()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [o, "screen", ...n0()]
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
          ...n0()
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
          ...n0()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...n0()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...n0()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...n0()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", s, p0, l0]
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
        font: [r, qt, Vt]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", V0, x]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Ft, Gt, a]
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
        tracking: [n, v, x]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [S, "none", v, S2]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          i,
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
        placeholder: N()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: N()
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
        decoration: [...y0(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [S, "from-font", "auto", v, l0]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: N()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [S, "auto", v, x]
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
        bg: v2()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: y2()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: w2()
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
        }, Ut, Ht]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: N()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: $0()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: $0()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: $0()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: N()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: N()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: N()
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
        border: [...y0(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...y0(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: N()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": N()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": N()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": N()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": N()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": N()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": N()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": N()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": N()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": N()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": N()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: N()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...y0(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [S, v, x]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", S, p0, l0]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: N()
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
          b,
          A0,
          M0
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: N()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", p, A0, M0]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": N()
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
        ring: N()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [S, l0]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": N()
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
        "inset-ring": N()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", w, A0, M0]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": N()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [S, v, x]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...N2(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": N2()
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
        "mask-linear": [S]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": j()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": j()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": N()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": j()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": j()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": N()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": j()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": j()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": N()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": j()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": j()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": N()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": j()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": j()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": N()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": j()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": j()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": N()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": j()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": j()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": N()
      }],
      "mask-image-radial": [{
        "mask-radial": [v, x]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": j()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": j()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": N()
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
        "mask-conic": [S]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": j()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": j()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": N()
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
        mask: v2()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: y2()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: w2()
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
        blur: k2()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [S, v, x]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [S, v, x]
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
          y,
          A0,
          M0
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": N()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", S, v, x]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [S, v, x]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", S, v, x]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [S, v, x]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", S, v, x]
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
        "backdrop-blur": k2()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [S, v, x]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [S, v, x]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", S, v, x]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [S, v, x]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", S, v, x]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [S, v, x]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [S, v, x]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", S, v, x]
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
        duration: [S, "initial", v, x]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", L, v, x]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [S, v, x]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", T, v, x]
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
        perspective: [M, v, x]
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
        rotate: w0()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": w0()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": w0()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": w0()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: N0()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": N0()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": N0()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": N0()
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
        skew: B0()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": B0()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": B0()
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
        translate: k0()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": k0()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": k0()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": k0()
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
        accent: N()
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
        caret: N()
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
        "scrollbar-thumb": N()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": N()
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
        fill: ["none", ...N()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [S, p0, l0, S2]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...N()]
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
}, Zt = /* @__PURE__ */ St(Jt);
function h(...e) {
  return Zt(J2(e));
}
function D({
  label: e,
  secondaryLabel: a,
  lang: s = "en",
  className: r,
  secondaryClassName: n,
  as: i = "span"
}) {
  const c = f(e, s), o = a ? f(a, s === "en" ? "id" : "en") : null;
  return /* @__PURE__ */ l("span", { className: h("block", r), children: [
    /* @__PURE__ */ t(i, { className: "font-semibold text-slate-900", children: c }),
    o ? /* @__PURE__ */ t(
      "span",
      {
        className: h(
          "mt-0.5 block text-sm font-medium text-blue-600",
          n
        ),
        children: o
      }
    ) : null
  ] });
}
const P2 = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, _2 = J2, de = (e, a) => (s) => {
  var r;
  if ((a == null ? void 0 : a.variants) == null) return _2(e, s == null ? void 0 : s.class, s == null ? void 0 : s.className);
  const { variants: n, defaultVariants: i } = a, c = Object.keys(n).map((m) => {
    const b = s == null ? void 0 : s[m], p = i == null ? void 0 : i[m];
    if (b === null) return null;
    const w = P2(b) || P2(p);
    return n[m][w];
  }), o = s && Object.entries(s).reduce((m, b) => {
    let [p, w] = b;
    return w === void 0 || (m[p] = w), m;
  }, {}), u = a == null || (r = a.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((m, b) => {
    let { class: p, className: w, ...y } = b;
    return Object.entries(y).every((A) => {
      let [M, C] = A;
      return Array.isArray(C) ? C.includes({
        ...i,
        ...o
      }[M]) : {
        ...i,
        ...o
      }[M] === C;
    }) ? [
      ...m,
      p,
      w
    ] : m;
  }, []);
  return _2(e, c, u, s == null ? void 0 : s.class, s == null ? void 0 : s.className);
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yt = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Qt = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (a, s, r) => r ? r.toUpperCase() : s.toLowerCase()
), I2 = (e) => {
  const a = Qt(e);
  return a.charAt(0).toUpperCase() + a.slice(1);
}, me = (...e) => e.filter((a, s, r) => !!a && a.trim() !== "" && r.indexOf(a) === s).join(" ").trim(), Xt = (e) => {
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
var ea = {
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
const ta = d0(
  ({
    color: e = "currentColor",
    size: a = 24,
    strokeWidth: s = 2,
    absoluteStrokeWidth: r,
    className: n = "",
    children: i,
    iconNode: c,
    ...o
  }, u) => J0(
    "svg",
    {
      ref: u,
      ...ea,
      width: a,
      height: a,
      stroke: e,
      strokeWidth: r ? Number(s) * 24 / Number(a) : s,
      className: me("lucide", n),
      ...!i && !Xt(o) && { "aria-hidden": "true" },
      ...o
    },
    [
      ...c.map(([m, b]) => J0(m, b)),
      ...Array.isArray(i) ? i : [i]
    ]
  )
);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const k = (e, a) => {
  const s = d0(
    ({ className: r, ...n }, i) => J0(ta, {
      ref: i,
      iconNode: a,
      className: me(
        `lucide-${Yt(I2(e))}`,
        `lucide-${e}`,
        r
      ),
      ...n
    })
  );
  return s.displayName = I2(e), s;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const aa = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], ue = k("activity", aa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sa = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], he = k("bell", sa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ra = [
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
], na = k("brain", ra);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const la = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
], ia = k("building-2", la);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const oa = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], pe = k("calendar", oa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ca = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
], da = k("camera", ca);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ma = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], t2 = k("check", ma);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ua = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], ha = k("circle-alert", ua);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pa = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ba = k("circle-check", pa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fa = [
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
], be = k("clipboard-list", fa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xa = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], ga = k("clock", xa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const va = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193", key: "yfwify" }],
  [
    "path",
    { d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07", key: "jlfiyv" }
  ]
], ya = k("cloud-off", va);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wa = [
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
], Na = k("eye-off", wa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ka = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Ma = k("eye", ka);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Aa = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], m0 = k("file-text", Aa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
], Sa = k("file-up", Ca);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const za = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], fe = k("flask-conical", za);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const La = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
], Pa = k("heart", La);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _a = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], Ia = k("history", _a);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ta = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Ra = k("image", Ta);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ea = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], ja = k("info", Ea);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Da = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Oa = k("layout-dashboard", Da);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $a = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], xe = k("loader-circle", $a);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ba = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], ge = k("lock", Ba);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Va = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], ve = k("log-out", Va);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ga = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], ye = k("message-circle", Ga);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ha = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
], R0 = k("mic", Ha);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fa = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
], we = k("pen-line", Fa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Wa = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["path", { d: "m9 20 3-6 3 6", key: "se2kox" }],
  ["path", { d: "m6 8 6 2 6-2", key: "4o3us4" }],
  ["path", { d: "M12 10v4", key: "1kjpxc" }]
], Ua = k("person-standing", Wa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qa = [
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
], Ka = k("phone-off", qa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ja = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
], Ne = k("pill", Ja);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Za = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], ke = k("plus", Za);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ya = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], Qa = k("refresh-cw", Ya);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xa = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], es = k("scan-line", Xa);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ts = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], as = k("search", ts);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ss = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], rs = k("send", ss);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ns = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], ls = k("settings", ns);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], os = k("shield-check", is);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cs = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], a2 = k("shield", cs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ds = [
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
], Me = k("sparkles", ds);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ms = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], us = k("square", ms);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hs = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
], s2 = k("stethoscope", hs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ps = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], bs = k("trending-up", ps);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fs = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Y0 = k("triangle-alert", fs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xs = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], r2 = k("upload", xs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gs = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], P0 = k("users", gs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vs = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], ys = k("video-off", vs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ws = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], Ae = k("video", ws);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ns = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], ks = k("wifi", Ns);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ms = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], As = k("x", Ms), Cs = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };
function n2({ size: e = "md", className: a, label: s = "Loading" }) {
  return /* @__PURE__ */ t(
    xe,
    {
      className: h("animate-spin text-blue-600", Cs[e], a),
      "aria-label": s,
      role: "status"
    }
  );
}
const Ss = de(
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
), s0 = d0(
  ({
    className: e,
    variant: a,
    size: s,
    fullWidth: r,
    loading: n,
    leftIcon: i,
    rightIcon: c,
    children: o,
    disabled: u,
    ...m
  }, b) => /* @__PURE__ */ l(
    "button",
    {
      ref: b,
      className: h(Ss({ variant: a, size: s, fullWidth: r }), e),
      disabled: u || n,
      ...m,
      children: [
        n ? /* @__PURE__ */ t(n2, { size: "sm", className: "text-current" }) : i,
        o,
        !n && c
      ]
    }
  )
);
s0.displayName = "Button";
const zs = de(
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
function Y({ className: e, variant: a, ...s }) {
  return /* @__PURE__ */ t("span", { className: h(zs({ variant: a }), e), ...s });
}
function O({
  className: e,
  children: a,
  ...s
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "rounded-xl border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        e
      ),
      ...s,
      children: a
    }
  );
}
function u0({
  className: e,
  children: a,
  ...s
}) {
  return /* @__PURE__ */ t("div", { className: h("flex items-start gap-3 border-b border-slate-100 px-5 py-4", e), ...s, children: a });
}
function Un({
  className: e,
  children: a,
  ...s
}) {
  return /* @__PURE__ */ t(
    "h3",
    {
      className: h("font-heading text-base font-semibold text-slate-900", e),
      ...s,
      children: a
    }
  );
}
function $({
  className: e,
  children: a,
  ...s
}) {
  return /* @__PURE__ */ t("div", { className: h("px-5 py-4", e), ...s, children: a });
}
function qn({
  className: e,
  children: a,
  ...s
}) {
  return /* @__PURE__ */ t("div", { className: h("border-t border-slate-100 px-5 py-4", e), ...s, children: a });
}
const e0 = d0(
  ({ className: e, label: a, helperText: s, errorText: r, lang: n = "en", labelClassName: i, id: c, ...o }, u) => {
    const m = c ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), b = !!r;
    return /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t(
        "label",
        {
          htmlFor: m,
          className: h("text-sm font-medium text-slate-700", i),
          children: f(a, n)
        }
      ) : null,
      /* @__PURE__ */ t(
        "input",
        {
          ref: u,
          id: m,
          className: h(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            b ? "border-red-300 focus-visible:ring-red-500" : "border-slate-200",
            e
          ),
          "aria-invalid": b,
          "aria-describedby": s || r ? `${m}-desc` : void 0,
          ...o
        }
      ),
      (s || r) && /* @__PURE__ */ t(
        "p",
        {
          id: `${m}-desc`,
          className: h(
            "text-xs",
            b ? "text-red-600" : "text-slate-500"
          ),
          children: f(r ?? s ?? "", n)
        }
      )
    ] });
  }
);
e0.displayName = "Input";
const t0 = d0(
  ({ className: e, label: a, helperText: s, errorText: r, lang: n = "en", id: i, rows: c = 4, ...o }, u) => {
    const m = i ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), b = !!r;
    return /* @__PURE__ */ l("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t("label", { htmlFor: m, className: "text-sm font-medium text-slate-700", children: f(a, n) }) : null,
      /* @__PURE__ */ t(
        "textarea",
        {
          ref: u,
          id: m,
          rows: c,
          className: h(
            "w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            b ? "border-red-300" : "border-slate-200",
            e
          ),
          "aria-invalid": b,
          ...o
        }
      ),
      (s || r) && /* @__PURE__ */ t("p", { className: h("text-xs", b ? "text-red-600" : "text-slate-500"), children: f(r ?? s ?? "", n) })
    ] });
  }
);
t0.displayName = "Textarea";
function Ce(e, a = []) {
  let s = [];
  function r(i, c) {
    const o = z.createContext(c);
    o.displayName = i + "Context";
    const u = s.length;
    s = [...s, c];
    const m = (p) => {
      var L;
      const { scope: w, children: y, ...A } = p, M = ((L = w == null ? void 0 : w[e]) == null ? void 0 : L[u]) || o, C = z.useMemo(() => A, Object.values(A));
      return /* @__PURE__ */ t(M.Provider, { value: C, children: y });
    };
    m.displayName = i + "Provider";
    function b(p, w) {
      var M;
      const y = ((M = w == null ? void 0 : w[e]) == null ? void 0 : M[u]) || o, A = z.useContext(y);
      if (A) return A;
      if (c !== void 0) return c;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [m, b];
  }
  const n = () => {
    const i = s.map((c) => z.createContext(c));
    return function(o) {
      const u = (o == null ? void 0 : o[e]) || i;
      return z.useMemo(
        () => ({ [`__scope${e}`]: { ...o, [e]: u } }),
        [o, u]
      );
    };
  };
  return n.scopeName = e, [r, Ls(n, ...a)];
}
function Ls(...e) {
  const a = e[0];
  if (e.length === 1) return a;
  const s = () => {
    const r = e.map((n) => ({
      useScope: n(),
      scopeName: n.scopeName
    }));
    return function(i) {
      const c = r.reduce((o, { useScope: u, scopeName: m }) => {
        const p = u(i)[`__scope${m}`];
        return { ...o, ...p };
      }, {});
      return z.useMemo(() => ({ [`__scope${a.scopeName}`]: c }), [c]);
    };
  };
  return s.scopeName = a.scopeName, s;
}
function T2(e, a) {
  if (typeof e == "function")
    return e(a);
  e != null && (e.current = a);
}
function Ps(...e) {
  return (a) => {
    let s = !1;
    const r = e.map((n) => {
      const i = T2(n, a);
      return !s && typeof i == "function" && (s = !0), i;
    });
    if (s)
      return () => {
        for (let n = 0; n < r.length; n++) {
          const i = r[n];
          typeof i == "function" ? i() : T2(e[n], null);
        }
      };
  };
}
var _s = Symbol.for("react.lazy"), _0 = z[" use ".trim().toString()];
function Is(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Se(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === _s && "_payload" in e && Is(e._payload);
}
// @__NO_SIDE_EFFECTS__
function Ts(e) {
  const a = /* @__PURE__ */ Rs(e), s = z.forwardRef((r, n) => {
    let { children: i, ...c } = r;
    Se(i) && typeof _0 == "function" && (i = _0(i._payload));
    const o = z.Children.toArray(i), u = o.find(js);
    if (u) {
      const m = u.props.children, b = o.map((p) => p === u ? z.Children.count(m) > 1 ? z.Children.only(null) : z.isValidElement(m) ? m.props.children : null : p);
      return /* @__PURE__ */ t(a, { ...c, ref: n, children: z.isValidElement(m) ? z.cloneElement(m, void 0, b) : null });
    }
    return /* @__PURE__ */ t(a, { ...c, ref: n, children: i });
  });
  return s.displayName = `${e}.Slot`, s;
}
// @__NO_SIDE_EFFECTS__
function Rs(e) {
  const a = z.forwardRef((s, r) => {
    let { children: n, ...i } = s;
    if (Se(n) && typeof _0 == "function" && (n = _0(n._payload)), z.isValidElement(n)) {
      const c = Os(n), o = Ds(i, n.props);
      return n.type !== z.Fragment && (o.ref = r ? Ps(r, c) : c), z.cloneElement(n, o);
    }
    return z.Children.count(n) > 1 ? z.Children.only(null) : null;
  });
  return a.displayName = `${e}.SlotClone`, a;
}
var Es = Symbol("radix.slottable");
function js(e) {
  return z.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Es;
}
function Ds(e, a) {
  const s = { ...a };
  for (const r in a) {
    const n = e[r], i = a[r];
    /^on[A-Z]/.test(r) ? n && i ? s[r] = (...o) => {
      const u = i(...o);
      return n(...o), u;
    } : n && (s[r] = n) : r === "style" ? s[r] = { ...n, ...i } : r === "className" && (s[r] = [n, i].filter(Boolean).join(" "));
  }
  return { ...e, ...s };
}
function Os(e) {
  var r, n;
  let a = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, s = a && "isReactWarning" in a && a.isReactWarning;
  return s ? e.ref : (a = (n = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : n.get, s = a && "isReactWarning" in a && a.isReactWarning, s ? e.props.ref : e.props.ref || e.ref);
}
var $s = [
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
], f0 = $s.reduce((e, a) => {
  const s = /* @__PURE__ */ Ts(`Primitive.${a}`), r = z.forwardRef((n, i) => {
    const { asChild: c, ...o } = n, u = c ? s : a;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(u, { ...o, ref: i });
  });
  return r.displayName = `Primitive.${a}`, { ...e, [a]: r };
}, {}), l2 = "Progress", i2 = 100, [Bs] = Ce(l2), [Vs, Gs] = Bs(l2), ze = z.forwardRef(
  (e, a) => {
    const {
      __scopeProgress: s,
      value: r = null,
      max: n,
      getValueLabel: i = Hs,
      ...c
    } = e;
    (n || n === 0) && !R2(n) && console.error(Fs(`${n}`, "Progress"));
    const o = R2(n) ? n : i2;
    r !== null && !E2(r, o) && console.error(Ws(`${r}`, "Progress"));
    const u = E2(r, o) ? r : null, m = I0(u) ? i(u, o) : void 0;
    return /* @__PURE__ */ t(Vs, { scope: s, value: u, max: o, children: /* @__PURE__ */ t(
      f0.div,
      {
        "aria-valuemax": o,
        "aria-valuemin": 0,
        "aria-valuenow": I0(u) ? u : void 0,
        "aria-valuetext": m,
        role: "progressbar",
        "data-state": _e(u, o),
        "data-value": u ?? void 0,
        "data-max": o,
        ...c,
        ref: a
      }
    ) });
  }
);
ze.displayName = l2;
var Le = "ProgressIndicator", Pe = z.forwardRef(
  (e, a) => {
    const { __scopeProgress: s, ...r } = e, n = Gs(Le, s);
    return /* @__PURE__ */ t(
      f0.div,
      {
        "data-state": _e(n.value, n.max),
        "data-value": n.value ?? void 0,
        "data-max": n.max,
        ...r,
        ref: a
      }
    );
  }
);
Pe.displayName = Le;
function Hs(e, a) {
  return `${Math.round(e / a * 100)}%`;
}
function _e(e, a) {
  return e == null ? "indeterminate" : e === a ? "complete" : "loading";
}
function I0(e) {
  return typeof e == "number";
}
function R2(e) {
  return I0(e) && !isNaN(e) && e > 0;
}
function E2(e, a) {
  return I0(e) && !isNaN(e) && e <= a && e >= 0;
}
function Fs(e, a) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${i2}\`.`;
}
function Ws(e, a) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${i2} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Us = ze, qs = Pe;
function Ie({
  value: e,
  max: a = 100,
  className: s,
  label: r = "Progress",
  showLabel: n = !1
}) {
  const i = Math.min(100, Math.max(0, e / a * 100));
  return /* @__PURE__ */ l("div", { className: h("w-full", s), children: [
    /* @__PURE__ */ t(
      Us,
      {
        className: "relative h-2 w-full overflow-hidden rounded-full bg-slate-100",
        value: i,
        "aria-label": r,
        children: /* @__PURE__ */ t(
          qs,
          {
            className: "h-full rounded-full bg-blue-600 transition-all duration-300",
            style: { width: `${i}%` }
          }
        )
      }
    ),
    n ? /* @__PURE__ */ l("p", { className: "mt-1 text-right text-xs text-slate-500", children: [
      Math.round(i),
      "%"
    ] }) : null
  ] });
}
function Ks(e) {
  const a = z.useRef(e);
  return z.useEffect(() => {
    a.current = e;
  }), z.useMemo(() => (...s) => {
    var r;
    return (r = a.current) == null ? void 0 : r.call(a, ...s);
  }, []);
}
var Q0 = globalThis != null && globalThis.document ? z.useLayoutEffect : () => {
}, C0 = { exports: {} }, G0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var j2;
function Js() {
  if (j2) return G0;
  j2 = 1;
  var e = U2;
  function a(p, w) {
    return p === w && (p !== 0 || 1 / p === 1 / w) || p !== p && w !== w;
  }
  var s = typeof Object.is == "function" ? Object.is : a, r = e.useState, n = e.useEffect, i = e.useLayoutEffect, c = e.useDebugValue;
  function o(p, w) {
    var y = w(), A = r({ inst: { value: y, getSnapshot: w } }), M = A[0].inst, C = A[1];
    return i(
      function() {
        M.value = y, M.getSnapshot = w, u(M) && C({ inst: M });
      },
      [p, y, w]
    ), n(
      function() {
        return u(M) && C({ inst: M }), p(function() {
          u(M) && C({ inst: M });
        });
      },
      [p]
    ), c(y), y;
  }
  function u(p) {
    var w = p.getSnapshot;
    p = p.value;
    try {
      var y = w();
      return !s(p, y);
    } catch {
      return !0;
    }
  }
  function m(p, w) {
    return w();
  }
  var b = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? m : o;
  return G0.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : b, G0;
}
var H0 = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D2;
function Zs() {
  return D2 || (D2 = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(y, A) {
      return y === A && (y !== 0 || 1 / y === 1 / A) || y !== y && A !== A;
    }
    function a(y, A) {
      b || n.startTransition === void 0 || (b = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var M = A();
      if (!p) {
        var C = A();
        i(M, C) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
      }
      C = c({
        inst: { value: M, getSnapshot: A }
      });
      var L = C[0].inst, T = C[1];
      return u(
        function() {
          L.value = M, L.getSnapshot = A, s(L) && T({ inst: L });
        },
        [y, M, A]
      ), o(
        function() {
          return s(L) && T({ inst: L }), y(function() {
            s(L) && T({ inst: L });
          });
        },
        [y]
      ), m(M), M;
    }
    function s(y) {
      var A = y.getSnapshot;
      y = y.value;
      try {
        var M = A();
        return !i(y, M);
      } catch {
        return !0;
      }
    }
    function r(y, A) {
      return A();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var n = U2, i = typeof Object.is == "function" ? Object.is : e, c = n.useState, o = n.useEffect, u = n.useLayoutEffect, m = n.useDebugValue, b = !1, p = !1, w = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? r : a;
    H0.useSyncExternalStore = n.useSyncExternalStore !== void 0 ? n.useSyncExternalStore : w, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), H0;
}
var O2;
function Ys() {
  return O2 || (O2 = 1, process.env.NODE_ENV === "production" ? C0.exports = Js() : C0.exports = Zs()), C0.exports;
}
var Qs = Ys();
function Xs() {
  return Qs.useSyncExternalStore(
    er,
    () => !0,
    () => !1
  );
}
function er() {
  return () => {
  };
}
var o2 = "Avatar", [tr] = Ce(o2), [ar, Te] = tr(o2), Re = z.forwardRef(
  (e, a) => {
    const { __scopeAvatar: s, ...r } = e, [n, i] = z.useState("idle");
    return /* @__PURE__ */ t(
      ar,
      {
        scope: s,
        imageLoadingStatus: n,
        onImageLoadingStatusChange: i,
        children: /* @__PURE__ */ t(f0.span, { ...r, ref: a })
      }
    );
  }
);
Re.displayName = o2;
var Ee = "AvatarImage", je = z.forwardRef(
  (e, a) => {
    const { __scopeAvatar: s, src: r, onLoadingStatusChange: n = () => {
    }, ...i } = e, c = Te(Ee, s), o = sr(r, i), u = Ks((m) => {
      n(m), c.onImageLoadingStatusChange(m);
    });
    return Q0(() => {
      o !== "idle" && u(o);
    }, [o, u]), o === "loaded" ? /* @__PURE__ */ t(f0.img, { ...i, ref: a, src: r }) : null;
  }
);
je.displayName = Ee;
var De = "AvatarFallback", Oe = z.forwardRef(
  (e, a) => {
    const { __scopeAvatar: s, delayMs: r, ...n } = e, i = Te(De, s), [c, o] = z.useState(r === void 0);
    return z.useEffect(() => {
      if (r !== void 0) {
        const u = window.setTimeout(() => o(!0), r);
        return () => window.clearTimeout(u);
      }
    }, [r]), c && i.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ t(f0.span, { ...n, ref: a }) : null;
  }
);
Oe.displayName = De;
function $2(e, a) {
  return e ? a ? (e.src !== a && (e.src = a), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function sr(e, { referrerPolicy: a, crossOrigin: s }) {
  const r = Xs(), n = z.useRef(null), i = r ? (n.current || (n.current = new window.Image()), n.current) : null, [c, o] = z.useState(
    () => $2(i, e)
  );
  return Q0(() => {
    o($2(i, e));
  }, [i, e]), Q0(() => {
    const u = (p) => () => {
      o(p);
    };
    if (!i) return;
    const m = u("loaded"), b = u("error");
    return i.addEventListener("load", m), i.addEventListener("error", b), a && (i.referrerPolicy = a), typeof s == "string" && (i.crossOrigin = s), () => {
      i.removeEventListener("load", m), i.removeEventListener("error", b);
    };
  }, [i, s, a]), c;
}
var rr = Re, nr = je, lr = Oe;
const ir = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base"
};
function $e({ src: e, alt: a, fallback: s, size: r = "md", className: n }) {
  return /* @__PURE__ */ l(
    rr,
    {
      className: h(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100",
        ir[r],
        n
      ),
      children: [
        /* @__PURE__ */ t(nr, { src: e, alt: a, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ t(lr, { className: "font-medium text-slate-600", delayMs: 0, children: s ?? "?" })
      ]
    }
  );
}
const or = {
  en: "EN",
  id: "ID"
};
function h0({
  locale: e,
  onChange: a,
  variant: s = "default",
  className: r
}) {
  const n = s === "marketing";
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "inline-flex items-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700",
        n ? "p-1" : "p-0.5 shadow-sm",
        r
      ),
      role: "group",
      "aria-label": "Language",
      children: ["en", "id"].map((i) => {
        const c = e === i;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => a(i),
            "aria-pressed": c,
            className: h(
              "rounded-full px-3 py-1.5 transition-colors",
              c ? n ? "bg-slate-950 text-white" : "bg-slate-900 text-white" : n ? "text-slate-700 hover:bg-slate-100" : "text-slate-600 hover:text-slate-900"
            ),
            children: or[i]
          },
          i
        );
      })
    }
  );
}
function cr({
  logo: e,
  title: a = "alocare.ai",
  subtitle: s = "AI-Powered Health Intelligence",
  navItems: r = [],
  locale: n = "en",
  onLocaleChange: i,
  actions: c,
  className: o
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: h(
        "sticky top-0 z-[1100] border-b border-slate-200/70 bg-white/80 backdrop-blur",
        o
      ),
      children: /* @__PURE__ */ l("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
          e,
          /* @__PURE__ */ l("span", { className: "leading-tight", children: [
            /* @__PURE__ */ l("span", { className: "block text-xl font-semibold tracking-tight text-slate-950", children: [
              "alocare",
              /* @__PURE__ */ t("span", { className: "text-slate-950", children: "." }),
              /* @__PURE__ */ t("span", { className: "text-emerald-600", children: "ai" })
            ] }),
            /* @__PURE__ */ t("span", { className: "block text-xs font-medium text-slate-600", children: s || a })
          ] })
        ] }),
        r.length > 0 ? /* @__PURE__ */ t("nav", { className: "hidden items-center gap-6 md:flex", "aria-label": "Main", children: r.map((u) => /* @__PURE__ */ t(
          "a",
          {
            href: u.href,
            className: h(
              "text-sm transition-colors",
              u.active ? "font-semibold text-slate-950" : "text-slate-700 hover:text-slate-950"
            ),
            children: u.label
          },
          u.href
        )) }) : null,
        /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
          i ? /* @__PURE__ */ t(h0, { locale: n, onChange: i }) : null,
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
function Be({
  lang: e = "en",
  state: a = "empty",
  accept: s = ".pdf,.jpg,.jpeg,.png",
  multiple: r = !1,
  onFilesSelected: n,
  className: i,
  hideHeader: c = !1
}) {
  const [o, u] = _(!1), m = st(null), b = rt(
    (p) => {
      p != null && p.length && (n == null || n(p));
    },
    [n]
  );
  return /* @__PURE__ */ l("div", { className: h("max-w-md", i), children: [
    c ? null : /* @__PURE__ */ l(K0, { children: [
      /* @__PURE__ */ t("h2", { className: "mb-1 font-heading text-2xl font-bold text-slate-900", children: f(Z.title, e) }),
      /* @__PURE__ */ t("p", { className: "mb-4 text-sm text-slate-600", children: f(Z.subtitle, e) })
    ] }),
    /* @__PURE__ */ l(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": f(Z.drag, e),
        onKeyDown: (p) => {
          var w;
          (p.key === "Enter" || p.key === " ") && (p.preventDefault(), (w = m.current) == null || w.click());
        },
        onDragOver: (p) => {
          p.preventDefault(), u(!0);
        },
        onDragLeave: () => u(!1),
        onDrop: (p) => {
          p.preventDefault(), u(!1), b(p.dataTransfer.files);
        },
        className: h(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-12 text-center transition-colors",
          a === "error" ? "border-red-300 bg-red-50/50" : "border-blue-300 bg-blue-50/40",
          o && "border-blue-500 bg-blue-50"
        ),
        children: [
          /* @__PURE__ */ t("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm", children: a === "uploading" ? /* @__PURE__ */ t(n2, { size: "lg" }) : /* @__PURE__ */ t(Sa, { className: "h-8 w-8 text-blue-600", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(Z.drag, e) }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs text-slate-500", children: f(Z.formats, e) }),
          a === "success" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-emerald-600", children: f(Z.success, e) }) : a === "error" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-red-600", children: f(Z.error, e) }) : /* @__PURE__ */ l(K0, { children: [
            /* @__PURE__ */ t(
              "input",
              {
                ref: m,
                type: "file",
                className: "sr-only",
                accept: s,
                multiple: r,
                "aria-hidden": !0,
                tabIndex: -1,
                onChange: (p) => b(p.target.files)
              }
            ),
            /* @__PURE__ */ t(
              s0,
              {
                type: "button",
                className: "mt-5 cursor-pointer",
                leftIcon: /* @__PURE__ */ t(r2, { className: "h-4 w-4", "aria-hidden": !0 }),
                onClick: () => {
                  var p;
                  return (p = m.current) == null ? void 0 : p.click();
                },
                children: f(Z.choose, e)
              }
            ),
            r ? /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-500", children: f(Z.pickerHint, e) }) : null
          ] })
        ]
      }
    )
  ] });
}
function Ve({
  fileName: e,
  fileSize: a = "2.4 MB",
  lang: s = "en",
  uploaded: r = !0,
  className: n
}) {
  return /* @__PURE__ */ t(O, { className: h("", n), children: /* @__PURE__ */ l($, { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ t("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50", children: /* @__PURE__ */ t(m0, { className: "h-5 w-5 text-red-600", "aria-hidden": !0 }) }),
    /* @__PURE__ */ l("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold text-slate-900", children: e }),
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: a })
    ] }),
    r ? /* @__PURE__ */ t(
      t2,
      {
        className: "h-5 w-5 shrink-0 text-emerald-600",
        "aria-label": f(d("Uploaded", "Berhasil diunggah"), s)
      }
    ) : null
  ] }) });
}
const dr = {
  pending: d("Ready to scan", "Siap dipindai"),
  processing: d("Scanning document…", "Memindai dokumen…"),
  complete: d("Uploaded", "Berhasil diunggah"),
  error: d("Scan failed", "Pemindaian gagal")
};
function mr({
  lang: e = "en",
  status: a = "complete",
  progress: s = 100,
  className: r
}) {
  const n = a === "processing" ? xe : a === "complete" ? ba : es;
  return /* @__PURE__ */ t(
    O,
    {
      className: h(
        "border-emerald-200 bg-emerald-50/60",
        a === "error" && "border-red-200 bg-red-50/60",
        r
      ),
      children: /* @__PURE__ */ l($, { className: "flex items-center gap-3 py-3", children: [
        /* @__PURE__ */ t(
          n,
          {
            className: h(
              "h-5 w-5 shrink-0",
              a === "complete" && "text-emerald-600",
              a === "processing" && "animate-spin text-blue-600",
              a === "error" && "text-red-600",
              a === "pending" && "text-slate-500"
            ),
            "aria-hidden": !0
          }
        ),
        /* @__PURE__ */ l("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(dr[a], e) }),
          a === "processing" ? /* @__PURE__ */ t(Ie, { value: s, className: "mt-2", showLabel: !0 }) : null
        ] })
      ] })
    }
  );
}
const ur = {
  idle: d("AI Ready", "AI Siap"),
  processing: d("AI Processing", "AI Memproses"),
  complete: d("AI Complete", "AI Selesai"),
  review: d("Needs Review", "Perlu Ditinjau")
};
function Kn({
  status: e = "processing",
  lang: a = "en",
  className: s
}) {
  return /* @__PURE__ */ l(
    Y,
    {
      variant: "ai",
      className: h("gap-1.5", s),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ t(Me, { className: "h-3 w-3", "aria-hidden": !0 }),
        f(ur[e], a)
      ]
    }
  );
}
const F0 = d("Confidence Score", "Skor Kepercayaan"), hr = d(
  "High confidence in extracted insights",
  "Kepercayaan tinggi pada insight yang diekstrak"
);
function c2({
  score: e,
  lang: a = "en",
  description: s,
  dualLanguageTitle: r = !1,
  className: n
}) {
  const i = Math.min(100, Math.max(0, e)), c = 2 * Math.PI * 36, o = c - i / 100 * c;
  return /* @__PURE__ */ l(O, { className: h("", n), children: [
    /* @__PURE__ */ l(u0, { className: "border-0 pb-0", children: [
      /* @__PURE__ */ t("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50", children: /* @__PURE__ */ t(os, { className: "h-5 w-5 text-blue-600", "aria-hidden": !0 }) }),
      /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
        D,
        {
          label: F0,
          secondaryLabel: r ? a === "en" ? F0.id : F0.en : void 0,
          lang: a,
          as: "h3"
        }
      ) })
    ] }),
    /* @__PURE__ */ l($, { className: "flex items-center justify-between gap-4 pt-2", children: [
      /* @__PURE__ */ t("p", { className: "max-w-[12rem] text-sm text-slate-600", children: s ?? f(hr, a) }),
      /* @__PURE__ */ l(
        "div",
        {
          className: "relative h-20 w-20 shrink-0",
          role: "img",
          "aria-label": `${i}% confidence`,
          children: [
            /* @__PURE__ */ l("svg", { className: "h-20 w-20 -rotate-90", viewBox: "0 0 80 80", children: [
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
                  stroke: "#2563eb",
                  strokeWidth: "6",
                  strokeLinecap: "round",
                  strokeDasharray: c,
                  strokeDashoffset: o
                }
              )
            ] }),
            /* @__PURE__ */ l("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-600", children: [
              i,
              "%"
            ] })
          ]
        }
      )
    ] })
  ] });
}
const W0 = d("Key Findings", "Temuan Utama"), pr = {
  normal: { en: "Normal", id: "Normal" },
  low: { en: "Low", id: "Rendah" },
  high: { en: "High", id: "Tinggi" },
  critical: { en: "Critical", id: "Kritis" }
}, br = {
  normal: "normal",
  low: "low",
  high: "high",
  critical: "critical"
};
function d2({
  findings: e,
  lang: a = "en",
  dualLanguageTitle: s = !1,
  className: r
}) {
  return /* @__PURE__ */ l(O, { className: h("", r), children: [
    /* @__PURE__ */ t(u0, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      D,
      {
        label: W0,
        secondaryLabel: s ? a === "en" ? W0.id : W0.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t($, { className: "pt-0", children: /* @__PURE__ */ t("ul", { className: "divide-y divide-slate-100", role: "list", children: e.map((n) => /* @__PURE__ */ l(
      "li",
      {
        className: "flex items-center justify-between gap-4 py-3 first:pt-0",
        children: [
          /* @__PURE__ */ l("div", { className: "min-w-0", children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-medium text-slate-900", children: n.label }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: n.value })
          ] }),
          /* @__PURE__ */ t(Y, { variant: br[n.status], children: (n.statusLabel ?? pr[n.status])[a] })
        ]
      },
      n.label
    )) }) })
  ] });
}
const U0 = d("Clinical Summary", "Ringkasan Klinis");
function x0({
  summary: e,
  lang: a = "en",
  loading: s = !1,
  riskLevel: r = "normal",
  dualLanguageTitle: n = !1,
  className: i
}) {
  const c = {
    normal: "border-slate-200",
    elevated: "border-amber-200",
    high: "border-red-200"
  }[r];
  return /* @__PURE__ */ l(O, { className: h(c, i), children: [
    /* @__PURE__ */ t(u0, { className: "border-0 pb-2", children: /* @__PURE__ */ l("div", { className: "flex w-full items-start justify-between gap-3", children: [
      /* @__PURE__ */ t(
        D,
        {
          label: U0,
          secondaryLabel: n ? a === "en" ? U0.id : U0.en : void 0,
          lang: a,
          as: "h3"
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50",
          "aria-hidden": !0,
          children: /* @__PURE__ */ t(ue, { className: "h-5 w-5 text-violet-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ t($, { className: "pt-0", children: s ? /* @__PURE__ */ l("div", { className: "flex items-center gap-2 py-4", children: [
      /* @__PURE__ */ t(n2, {}),
      /* @__PURE__ */ t("span", { className: "text-sm text-slate-500", children: a === "id" ? "Menghasilkan ringkasan…" : "Generating summary…" })
    ] }) : /* @__PURE__ */ t("p", { className: "text-sm leading-relaxed text-slate-700", children: f(e, a) }) })
  ] });
}
const fr = {
  heart: Pa,
  exercise: Ua,
  calendar: pe,
  default: be
}, q0 = d("Suggested Next Actions", "Rekomendasi Tindak Lanjut");
function Ge({
  items: e,
  lang: a = "en",
  dualLanguageTitle: s = !1,
  className: r
}) {
  return /* @__PURE__ */ l(O, { className: h("", r), children: [
    /* @__PURE__ */ t(u0, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      D,
      {
        label: q0,
        secondaryLabel: s ? a === "en" ? q0.id : q0.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t($, { className: "space-y-4 pt-0", children: e.map((n) => {
      const i = fr[n.icon ?? "default"];
      return /* @__PURE__ */ l("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50", children: /* @__PURE__ */ t(i, { className: "h-4 w-4 text-emerald-600", "aria-hidden": !0 }) }),
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(n.title, a) }),
          n.description ? /* @__PURE__ */ t("p", { className: "mt-0.5 text-xs text-slate-600", children: f(n.description, a) }) : null
        ] })
      ] }, n.id);
    }) })
  ] });
}
const xr = {
  low: d("Low Risk", "Risiko Rendah"),
  medium: d("Medium Risk", "Risiko Sedang"),
  high: d("High Risk", "Risiko Tinggi")
}, gr = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500"
};
function vr({
  level: e,
  percentage: a,
  lang: s = "en",
  className: r
}) {
  return /* @__PURE__ */ l("div", { className: h("flex items-center gap-2", r), role: "status", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: h("h-2.5 w-2.5 rounded-full", gr[e]),
        "aria-hidden": !0
      }
    ),
    /* @__PURE__ */ l("span", { className: "text-sm font-medium text-slate-700", children: [
      f(xr[e], s),
      a !== void 0 ? ` (${a}%)` : ""
    ] })
  ] });
}
const yr = d("Review & Validate", "Tinjau & Validasi"), B2 = d("Assessment", "Penilaian"), wr = [
  { value: "agree", label: d("Agree with AI findings", "Setuju dengan temuan AI") },
  { value: "partial", label: d("Partially agree", "Sebagian setuju") },
  { value: "disagree", label: d("Disagree", "Tidak setuju") }
], Nr = d("Comments", "Komentar"), kr = d(
  "Add clinical notes or corrections…",
  "Tambahkan catatan klinis atau koreksi…"
), Mr = d("Save & Continue", "Simpan & Lanjutkan");
function Jn({
  lang: e = "en",
  onSubmit: a,
  className: s
}) {
  const [r, n] = _("agree"), [i, c] = _(""), [o, u] = _(!1);
  return /* @__PURE__ */ l("div", { className: h("max-w-sm space-y-4", s), children: [
    /* @__PURE__ */ t(D, { label: yr, lang: e, as: "h2" }),
    /* @__PURE__ */ l(O, { children: [
      /* @__PURE__ */ t(u0, { className: "border-0 pb-2", children: /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(B2, e) }) }),
      /* @__PURE__ */ l($, { className: "space-y-4 pt-0", children: [
        /* @__PURE__ */ l("fieldset", { className: "space-y-2", children: [
          /* @__PURE__ */ t("legend", { className: "sr-only", children: f(B2, e) }),
          wr.map((m) => /* @__PURE__ */ l(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700",
              children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "radio",
                    name: "assessment",
                    value: m.value,
                    checked: r === m.value,
                    onChange: () => n(m.value),
                    className: "h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-600"
                  }
                ),
                f(m.label, e)
              ]
            },
            m.value
          ))
        ] }),
        /* @__PURE__ */ t(
          t0,
          {
            label: Nr,
            lang: e,
            placeholder: f(kr, e),
            value: i,
            onChange: (m) => c(m.target.value)
          }
        ),
        /* @__PURE__ */ l("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: o,
              onChange: (m) => u(m.target.checked),
              className: "h-4 w-4 rounded border-slate-300 text-blue-600"
            }
          ),
          e === "id" ? "Beritahu pasien" : "Notify patient"
        ] }),
        /* @__PURE__ */ t(
          s0,
          {
            fullWidth: !0,
            size: "lg",
            rightIcon: /* @__PURE__ */ t(t2, { className: "h-4 w-4", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a({
              assessment: r,
              comments: i,
              nextAction: "follow-up-3mo",
              notifyPatient: o
            }),
            children: f(Mr, e)
          }
        )
      ] })
    ] })
  ] });
}
function He({ role: e, content: a, timestamp: s, className: r }) {
  const n = e === "user";
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex",
        n ? "justify-end" : "justify-start",
        r
      ),
      children: /* @__PURE__ */ l(
        "div",
        {
          className: h(
            "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
            n ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-800 shadow-sm",
            e === "system" && "bg-slate-50 text-slate-600 italic"
          ),
          role: e === "assistant" ? "article" : void 0,
          "aria-label": e === "assistant" ? "AI response" : void 0,
          children: [
            /* @__PURE__ */ t("p", { children: a }),
            s ? /* @__PURE__ */ t("time", { className: "mt-1 block text-xs opacity-70", children: s }) : null
          ]
        }
      )
    }
  );
}
const V2 = d(
  "Ask about this report…",
  "Tanyakan tentang laporan ini…"
);
function Ar({
  lang: e = "en",
  onSend: a,
  disabled: s,
  className: r
}) {
  const [n, i] = _(""), c = () => {
    const o = n.trim();
    o && (a == null || a(o), i(""));
  };
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm",
        r
      ),
      children: [
        /* @__PURE__ */ t(
          "textarea",
          {
            rows: 1,
            value: n,
            onChange: (o) => i(o.target.value),
            onKeyDown: (o) => {
              o.key === "Enter" && !o.shiftKey && (o.preventDefault(), c());
            },
            placeholder: f(V2, e),
            disabled: s,
            className: "min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none",
            "aria-label": f(V2, e)
          }
        ),
        /* @__PURE__ */ t(
          s0,
          {
            size: "sm",
            disabled: s || !n.trim(),
            onClick: c,
            "aria-label": e === "id" ? "Kirim" : "Send",
            children: /* @__PURE__ */ t(rs, { className: "h-4 w-4", "aria-hidden": !0 })
          }
        )
      ]
    }
  );
}
function Zn({
  totalEmployees: e,
  trend: a = "+8.5% vs last month",
  trendUp: s = !0,
  className: r
}) {
  return /* @__PURE__ */ t(O, { className: h("", r), children: /* @__PURE__ */ t($, { children: /* @__PURE__ */ l("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500", children: "Total Employees" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-4xl font-bold text-slate-900", children: e.toLocaleString() }),
      /* @__PURE__ */ l(
        "p",
        {
          className: h(
            "mt-2 flex items-center gap-1 text-sm font-medium",
            s ? "text-emerald-600" : "text-red-600"
          ),
          children: [
            /* @__PURE__ */ t(bs, { className: "h-4 w-4", "aria-hidden": !0 }),
            a
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50", children: /* @__PURE__ */ t(P0, { className: "h-6 w-6 text-emerald-600", "aria-hidden": !0 }) })
  ] }) }) });
}
const Cr = {
  privacy: {
    icon: a2,
    text: "Data is secure, private and confidential. We comply with data privacy regulations."
  },
  encryption: {
    icon: ge,
    text: "Encrypted & Protected. Enterprise-grade security."
  }
};
function G2({
  variant: e = "privacy",
  className: a
}) {
  const { icon: s, text: r } = Cr[e];
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "flex items-center gap-3 rounded-xl bg-blue-50/80 px-4 py-3 text-sm text-slate-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(s, { className: "h-5 w-5 shrink-0 text-blue-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: r })
      ]
    }
  );
}
const Fe = {
  login: "POST /auth/login",
  logout: "POST /auth/logout",
  refresh: "POST /auth/refresh",
  profile: "GET /users/me"
}, I = {
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
  demoHint: d(
    "Demo: doctor@alocare.net / doctor123",
    "Demo: doctor@alocare.net / doctor123"
  ),
  demoAccountTitle: d("Demo account", "Akun demo"),
  demoNotesTitle: d("Demo credentials", "Kredensial demo"),
  demoEmailLabel: d("Email", "Email"),
  demoPasswordLabel: d("Password", "Kata sandi"),
  demoAdditionalNote: d(
    "Use these credentials for the private pilot demo environment.",
    "Gunakan kredensial ini untuk lingkungan demo pilot privat."
  ),
  secureSession: d("JWT-secured session", "Sesi aman JWT")
}, Sr = {
  blue: "from-slate-50 via-white to-blue-50",
  teal: "from-slate-50 via-white to-teal-50",
  emerald: "from-slate-50 via-white to-emerald-50",
  slate: "from-slate-100 via-slate-50 to-white"
}, zr = {
  blue: "bg-gradient-to-br from-blue-700 to-blue-900",
  teal: "bg-gradient-to-br from-teal-600 to-teal-800",
  emerald: "bg-gradient-to-br from-emerald-600 to-emerald-800",
  slate: "bg-gradient-to-br from-slate-700 to-slate-900"
};
function m2({
  children: e,
  variant: a = "plain",
  accent: s = "blue",
  sidePanel: r,
  className: n
}) {
  return a === "split" && r ? /* @__PURE__ */ l("div", { className: h("flex min-h-screen", n), children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: h(
          "hidden w-[42%] flex-col justify-between p-10 text-white lg:flex",
          zr[s]
        ),
        children: r
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex flex-1 items-center justify-center bg-slate-50 px-4 py-10", children: e })
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex min-h-screen flex-col items-center justify-center px-4 py-10",
        a === "gradient" ? h("bg-gradient-to-br", Sr[s]) : "bg-slate-50",
        n
      ),
      children: e
    }
  );
}
const H2 = {
  /** Hero / login card outer glow */
  elevated: "shadow-[0_40px_120px_-80px_rgba(15,23,42,0.55)]",
  /** Inner panels (feature cards on marketing site) */
  panel: "shadow-[0_22px_70px_-35px_rgba(15,23,42,0.5)]",
  /** Subtle chips & controls */
  sm: "shadow-sm"
}, R = {
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
function u2({
  children: e,
  loginSize: a = "lg",
  elevated: s = !0,
  className: r
}) {
  return /* @__PURE__ */ t(
    O,
    {
      className: h(
        R.card[a],
        "overflow-hidden rounded-3xl border-slate-200 bg-white",
        s ? H2.elevated : H2.sm,
        r
      ),
      children: e
    }
  );
}
function Yn({
  children: e,
  loginSize: a = "lg",
  className: s
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        R.header[a],
        "border-slate-100",
        s
      ),
      children: e
    }
  );
}
function We({
  children: e,
  loginSize: a = "lg",
  className: s
}) {
  return /* @__PURE__ */ t("div", { className: h(R.content[a], s), children: e });
}
const Ue = "data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='UTF-8'?%3e%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%201020.0%20983.0'%20role='img'%20aria-label='Alocare%20AI'%3e%3cg%20transform='translate(0.000000,983.000000)%20scale(0.100000,-0.100000)'%20fill='%23000828'%20stroke='none'%3e%3cpath%20d='M3778%209613%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z%20M2939%209273%20l-24%20-28%2028%2024%20c25%2023%2032%2031%2024%2031%20-2%200%20-14%20-12%20-28%20-27z%20M2789%209123%20l-24%20-28%2028%2024%20c25%2023%2032%2031%2024%2031%20-2%200%20-14%20-12%20-28%20-27z%20M6638%208013%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z%20M7435%207860%20c21%20-22%2041%20-40%2044%20-40%203%200%20-13%2018%20-34%2040%20-21%2022%20-41%2040%20-44%2040%20-3%200%2013%20-18%2034%20-40z%20M3835%207750%20c17%20-9%2015%20-10%20-12%20-7%20-19%202%20-29%20-1%20-26%20-6%204%20-6%20-3%20-8%20-15%20-5%20-14%204%20-20%202%20-15%20-5%204%20-6%200%20-8%20-10%20-4%20-10%204%20-17%201%20-17%20-5%200%20-6%20-3%20-8%20-7%20-5%20-3%204%20-12%20-1%20-20%20-11%20-8%20-9%20-12%20-12%20-10%20-7%203%206%20-79%20-73%20-181%20-175%20l-187%20-186%20170%20176%20170%20175%20-177%20-174%20c-97%20-96%20-175%20-178%20-173%20-182%203%20-3%20-4%20-14%20-15%20-24%20-11%20-10%20-20%20-14%20-20%20-9%200%204%20-27%20-18%20-60%20-51%20-32%20-32%20-57%20-62%20-55%20-65%202%20-4%20-7%20-18%20-20%20-30%20-14%20-13%20-25%20-19%20-25%20-15%200%205%20-29%20-19%20-65%20-55%20-35%20-35%20-62%20-66%20-60%20-70%202%20-4%20-74%20-84%20-170%20-179%20-96%20-94%20-169%20-169%20-162%20-166%207%204%204%200%20-5%20-8%20-10%20-8%20-15%20-17%20-11%20-20%203%20-4%201%20-7%20-6%20-7%20-7%200%20-9%20-4%20-6%20-10%203%20-5%202%20-10%20-3%20-10%20-5%200%20-7%20-12%20-5%20-27%203%20-17%201%20-23%20-4%20-16%20-4%206%20-8%20-501%20-8%20-1128%20l0%20-1139%20497%200%20497%200%2055%2051%20c31%2028%2054%2055%2051%2059%20-3%205%207%2017%2022%2028%2016%2011%2071%2068%20123%20126%20102%20114%20143%20141%20193%20132%2018%20-3%2035%20-5%2039%20-3%203%201%2017%20-11%2029%20-28%2013%20-16%2026%20-32%2029%20-35%203%20-3%206%20-10%207%20-16%203%20-16%20104%20-178%20117%20-186%206%20-4%207%20-8%203%20-8%20-4%200%20-3%20-9%203%20-20%206%20-11%2015%20-18%2019%20-16%204%203%2013%20-6%2020%20-20%209%20-20%209%20-24%20-1%20-19%20-7%204%20-6%201%202%20-7%208%20-7%2016%20-18%2017%20-25%204%20-17%2075%20-127%2085%20-131%204%20-2%206%20-8%203%20-12%20-3%20-5%204%20-14%2015%20-20%2013%20-7%2019%20-18%2016%20-26%20-3%20-8%203%20-23%2014%20-34%2011%20-11%2019%20-22%2018%20-25%20-2%20-2%205%20-13%2014%20-25%2010%20-11%2015%20-20%2012%20-20%20-4%200%20-1%20-7%207%20-16%2014%20-17%20435%201087%20422%201110%20-3%206%20-2%208%202%204%209%20-9%20117%20271%20109%20284%20-3%204%200%208%206%208%207%200%2010%206%207%2014%20-3%208%20-3%2016%201%2018%2012%205%2052%20109%2046%20119%20-3%205%200%209%206%209%207%200%2010%207%206%2015%20-3%208%20-1%2015%205%2015%206%200%207%205%204%2010%20-3%206%20-2%2010%202%2010%205%200%2013%2010%2018%2023%2036%2082%20144%2062%20182%20-33%2011%20-30%2026%20-60%2031%20-66%206%20-7%209%20-14%207%20-16%20-3%20-2%2029%20-94%2071%20-204%2041%20-109%2093%20-246%20114%20-304%2021%20-58%2057%20-152%2079%20-210%2022%20-58%2097%20-258%20166%20-445%2070%20-187%20130%20-346%20134%20-353%205%20-9%2022%204%2057%2045%2027%2032%2040%2051%2029%2043%20-11%20-8%201%206%2026%2030%2025%2025%2063%2067%2084%2093%2065%2082%2026%2077%20647%2077%20l553%200%20-2%201632%20c-2%201222%20-5%201633%20-14%201639%20-6%204%20-8%2012%20-4%2019%206%209%204%2011%20-5%205%20-10%20-6%20-12%20-4%20-7%209%204%2011%203%2015%20-4%2011%20-6%20-4%20-9%201%20-7%2011%202%2011%20-2%2018%20-10%2016%20-7%20-1%20-22%2014%20-33%2033%20-12%2019%20-23%2035%20-26%2035%20-2%200%20-1%20-6%203%20-12%204%20-7%20-5%200%20-19%2015%20-20%2021%20-33%2027%20-48%2022%20-14%20-5%20-19%20-3%20-15%204%205%207%20-464%2010%20-1596%2011%20-882%200%20-1634%203%20-1673%205%20-52%204%20-65%203%20-50%20-5z%20m-545%20-463%20c0%20-1%20-26%20-27%20-57%20-57%20l-58%20-55%2055%2058%20c50%2053%2060%2062%2060%2054z%20m-160%20-160%20c0%20-1%20-28%20-29%20-62%20-62%20l-63%20-60%2060%2063%20c55%2058%2065%2067%2065%2059z%20m3473%20-201%20c-3%20-5%200%20-7%207%20-4%2023%207%2070%20-47%2070%20-82%200%20-18%20-4%20-29%20-10%20-25%20-5%203%20-10%200%20-10%20-8%200%20-55%2072%20-52%20-1299%20-57%20l-1256%20-5%20-27%2027%20c-14%2015%20-28%2025%20-30%2023%20-1%20-2%20-2%2020%20-2%2048%201%2037%206%2052%2015%2052%208%200%2014%207%2014%2015%200%209%208%2014%2019%2012%2010%20-2%2016%200%2013%205%20-3%204%20559%208%201248%208%20719%200%201251%20-4%201248%20-9z%20m-2566%20-103%20c-3%20-10%20-5%20-2%20-5%2017%200%2019%202%2027%205%2018%202%20-10%202%20-26%200%20-35z%20m2560%20-616%20c-7%20-5%20-2%20-7%2011%20-4%2013%203%2022%203%2019%200%20-7%20-7%2026%20-41%2035%20-36%204%202%205%20-4%201%20-13%20-4%20-12%20-3%20-15%205%20-10%208%205%2012%20-3%2012%20-24%200%20-20%20-4%20-29%20-11%20-24%20-6%204%20-9%20-1%20-7%20-12%201%20-11%20-2%20-20%20-7%20-22%20-6%20-2%20-17%20-10%20-26%20-18%20-17%20-16%20-3285%20-22%20-3275%20-6%202%204%20-2%2016%20-10%2027%20-8%2010%20-14%2015%20-14%209%200%20-5%20-5%20-2%20-10%206%20-5%208%20-9%2026%20-9%2040%201%2023%202%2023%209%20-5%20l8%20-30%20-1%2035%20c-2%2036%2033%2080%2064%2080%2010%200%2011%202%202%208%20-6%204%20715%207%201602%207%20887%200%201608%20-4%201602%20-8z%20m-854%20-194%20c-430%20-2%20-1136%20-2%20-1570%200%20-433%201%20-81%202%20782%202%20864%200%201218%20-1%20788%20-2z%20m-2360%20-523%20c-35%20-14%20-27%20-20%2011%20-9%2033%209%201170%207%201211%20-2%2033%20-8%2045%20-19%2038%20-36%20-4%20-9%20-2%20-14%203%20-10%206%203%2010%20-10%209%20-33%200%20-21%20-4%20-36%20-9%20-33%20-5%203%20-6%200%20-4%20-8%207%20-20%20-21%20-49%20-40%20-42%20-8%204%20-13%202%20-10%20-3%209%20-14%20-1233%20-7%20-1246%207%20-8%209%20-7%2010%204%204%208%20-5%203%203%20-12%2018%20-19%2017%20-28%2035%20-27%2054%20l1%2028%208%20-30%208%20-30%201%2036%20c0%2020%208%2042%2016%2049%209%207%2013%2015%2010%2018%20-8%209%2016%2032%2034%2031%2011%200%209%20-3%20-6%20-9z%20m3241%20-11%20c-3%20-6%202%20-9%2012%20-7%2011%202%2019%20-3%2020%20-12%203%20-36%205%20-41%2014%20-35%2025%2015%203%20-53%20-26%20-82%20-17%20-17%20-30%20-33%20-29%20-35%202%20-2%20-160%20-3%20-360%20-3%20-200%200%20-361%204%20-358%208%203%205%20-3%207%20-13%205%20-11%20-2%20-19%203%20-19%2012%20-1%208%20-6%2014%20-13%2013%20-7%20-2%20-9%204%20-5%2014%204%209%202%2014%20-3%2011%20-19%20-12%20-9%2070%2012%2089%2011%2010%2013%2014%204%208%20-13%20-9%20-13%20-8%20-2%207%2012%2015%2047%2017%20387%2015%20220%20-1%20371%202%20367%207%20-3%205%200%206%207%202%206%20-4%209%20-12%205%20-17z%20m-3161%20-186%20c-13%20-2%20-33%20-2%20-45%200%20-13%202%20-3%204%2022%204%2025%200%2035%20-2%2023%20-4z%20m135%200%20c-21%20-2%20-55%20-2%20-75%200%20-21%202%20-4%204%2037%204%2041%200%2058%20-2%2038%20-4z%20m280%200%20c-10%20-2%20-28%20-2%20-40%200%20-13%202%20-5%204%2017%204%2022%201%2032%20-1%2023%20-4z%20m270%200%20c-27%20-2%20-69%20-2%20-95%200%20-27%202%20-5%203%2047%203%2052%200%2074%20-1%2048%20-3z%20m314%200%20c-40%20-2%20-103%20-2%20-140%200%20-37%202%20-4%203%2073%203%2077%200%20107%20-2%2067%20-3z%20m1565%200%20c-20%20-2%20-52%20-2%20-70%200%20-17%202%200%204%2038%204%2039%200%2053%20-2%2032%20-4z%20m551%200%20c-10%20-2%20-28%20-2%20-40%200%20-13%202%20-5%204%2017%204%2022%201%2032%20-1%2023%20-4z%20M7605%207140%20c0%20-212%201%20-298%202%20-192%202%20105%202%20279%200%20385%20-1%20105%20-2%2019%20-2%20-193z%20M9530%207497%20c0%20-2%2015%20-16%2033%20-33%20l32%20-29%20-29%2033%20c-28%2030%20-36%2037%20-36%2029z%20M9713%207095%20c0%20-38%202%20-53%204%20-32%202%2020%202%2052%200%2070%20-2%2017%20-4%201%20-4%20-38z%20M8764%206828%20c-4%20-7%20-4%20-10%201%20-6%204%204%2016%20-3%2027%20-15%20l19%20-22%20-17%2028%20c-19%2031%20-20%2032%20-30%2015z%20M8855%206730%20c21%20-22%2041%20-40%2044%20-40%203%200%20-13%2018%20-34%2040%20-21%2022%20-41%2040%20-44%2040%20-3%200%2013%20-18%2034%20-40z%20M9564%206738%20l-29%20-33%2033%2029%20c30%2028%2037%2036%2029%2036%20-2%200%20-16%20-15%20-33%20-32z%20M7603%206635%20c0%20-27%202%20-38%204%20-22%202%2015%202%2037%200%2050%20-2%2012%20-4%200%20-4%20-28z%20M9198%206583%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z%20M7693%206573%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z%20M1023%206553%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z%20M8060%206343%20l-95%20-98%2098%2095%20c90%2088%20102%20100%2094%20100%20-1%200%20-45%20-44%20-97%20-97z%20M385%206139%20c-9%20-17%20-15%20-33%20-13%20-35%203%20-2%2012%2012%2021%2031%2021%2043%2013%2047%20-8%204z%20M7600%206110%20c0%20-35%202%20-61%204%20-59%208%207%2010%20108%203%20115%20-4%204%20-7%20-21%20-7%20-56z%20M7603%205880%20c0%20-47%202%20-66%204%20-42%202%2023%202%2061%200%2085%20-2%2023%20-4%204%20-4%20-43z%20M9423%205863%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z%20M9513%205863%20c9%20-2%2025%20-2%2035%200%209%203%201%205%20-18%205%20-19%200%20-27%20-2%20-17%20-5z%20M9125%205718%20l-40%20-43%2043%2040%20c39%2036%2047%2045%2039%2045%20-2%200%20-21%20-19%20-42%20-42z%20M9840%205715%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M7603%205675%20c0%20-38%202%20-53%204%20-32%202%2020%202%2052%200%2070%20-2%2017%20-4%201%20-4%20-38z%20M7603%205515%20c0%20-27%202%20-38%204%20-22%202%2015%202%2037%200%2050%20-2%2012%20-4%200%20-4%20-28z%20M295%204425%20c0%20-583%201%20-823%202%20-533%202%20289%202%20766%200%201060%20-1%20293%20-2%2056%20-2%20-527z%20M8180%205283%20l-175%20-178%20178%20175%20c97%2096%20177%20176%20177%20177%200%208%20-18%20-10%20-180%20-174z%20M7604%205240%20c0%20-102%202%20-143%203%20-92%202%2050%202%20134%200%20185%20-1%2050%20-3%209%20-3%20-93z%20M9993%205345%20c0%20-33%202%20-45%204%20-27%202%2018%202%2045%200%2060%20-2%2015%20-4%200%20-4%20-33z%20M7890%204993%20l-55%20-58%2058%2055%20c53%2050%2062%2060%2054%2060%20-1%200%20-27%20-26%20-57%20-57z%20M7603%204965%20c0%20-33%202%20-45%204%20-27%202%2018%202%2045%200%2060%20-2%2015%20-4%200%20-4%20-33z%20M9115%204980%20c21%20-22%2041%20-40%2044%20-40%203%200%20-13%2018%20-34%2040%20-21%2022%20-41%2040%20-44%2040%20-3%200%2013%20-18%2034%20-40z%20M5215%204858%20c-17%20-46%20-29%20-89%20-29%20-95%201%20-7%20-3%20-13%20-8%20-13%20-6%200%20-8%20-7%20-4%20-15%203%20-8%201%20-15%20-3%20-15%20-11%200%20-41%20-86%20-33%20-94%203%20-3%200%20-6%20-7%20-6%20-8%200%20-10%20-7%20-6%20-21%205%20-14%204%20-19%20-4%20-15%20-7%205%20-9%201%20-5%20-8%203%20-9%201%20-16%20-6%20-16%20-6%200%20-8%20-4%20-5%20-10%203%20-5%201%20-10%20-5%20-10%20-7%200%20-10%20-7%20-6%20-15%203%20-8%202%20-15%20-2%20-15%20-9%200%20-45%20-95%20-45%20-117%200%20-7%20-5%20-13%20-10%20-13%20-5%200%20-7%20-7%20-3%20-15%203%20-8%201%20-15%20-4%20-15%20-5%200%20-6%20-7%20-3%20-17%205%20-12%203%20-14%20-7%20-8%20-10%206%20-12%204%20-7%20-8%203%20-10%203%20-17%20-1%20-17%20-9%200%20-48%20-110%20-44%20-122%201%20-5%20-3%20-8%20-9%20-8%20-6%200%20-9%20-7%20-5%20-15%203%20-8%201%20-15%20-5%20-15%20-6%200%20-9%20-7%20-5%20-15%203%20-8%201%20-15%20-4%20-15%20-5%200%20-6%20-7%20-3%20-17%205%20-12%203%20-14%20-7%20-8%20-10%206%20-12%204%20-7%20-8%204%20-10%202%20-17%20-4%20-17%20-6%200%20-9%20-7%20-5%20-15%203%20-8%201%20-15%20-5%20-15%20-6%200%20-7%20-4%20-4%20-10%203%20-5%201%20-10%20-5%20-10%20-7%200%20-10%20-6%20-8%20-12%203%20-7%20-2%20-19%20-9%20-27%20-8%20-7%20-12%20-19%20-9%20-27%203%20-7%200%20-14%20-6%20-16%20-6%20-2%20-10%20-16%20-10%20-31%200%20-15%20-4%20-25%20-8%20-22%20-6%204%20-34%20-66%20-35%20-90%200%20-5%20-4%20-13%20-8%20-16%20-4%20-3%20-9%20-16%20-10%20-27%20-1%20-12%20-5%20-22%20-10%20-22%20-5%200%20-7%20-7%20-3%20-15%203%20-8%201%20-15%20-4%20-15%20-5%200%20-6%20-7%20-3%20-17%205%20-12%203%20-14%20-7%20-8%20-10%206%20-12%204%20-7%20-8%204%20-10%202%20-17%20-4%20-17%20-6%200%20-9%20-7%20-5%20-15%203%20-8%201%20-15%20-5%20-15%20-6%200%20-7%20-4%20-4%20-10%203%20-5%201%20-10%20-5%20-10%20-7%200%20-10%20-7%20-6%20-15%203%20-8%201%20-15%20-4%20-15%20-5%200%20-7%20-7%20-4%20-15%204%20-8%201%20-15%20-6%20-15%20-6%200%20-8%20-4%20-5%20-10%203%20-5%201%20-10%20-5%20-10%20-7%200%20-10%20-7%20-6%20-15%203%20-8%201%20-15%20-5%20-15%20-6%200%20-9%20-7%20-5%20-15%203%20-8%201%20-15%20-5%20-15%20-6%200%20-7%20-4%20-4%20-10%203%20-5%201%20-10%20-5%20-10%20-7%200%20-10%20-5%20-8%20-12%205%20-13%20-43%20-58%20-61%20-58%20-6%200%20-11%20-4%20-11%20-8%200%20-14%20-42%20-11%20-57%204%20-8%208%20-18%2012%20-22%209%20-5%20-2%20-20%2018%20-35%2045%20-15%2028%20-31%2050%20-35%2050%20-4%200%20-8%206%20-8%2013%200%2020%20-100%20187%20-107%20180%20-4%20-4%20-4%200%20-1%209%204%2011%20-1%2020%20-14%2027%20-11%206%20-18%2017%20-15%2024%202%207%20-6%2024%20-18%2037%20-13%2014%20-22%2026%20-20%2027%207%208%201%2023%20-8%2018%20-6%20-3%20-7%201%20-4%209%204%209%20-1%2018%20-10%2022%20-9%203%20-13%2010%20-10%2015%203%205%201%209%20-4%209%20-5%200%20-9%206%20-9%2013%20-1%2022%20-49%2097%20-58%2090%20-4%20-5%20-5%20-2%200%206%205%209%200%2020%20-16%2033%20-13%2011%20-18%2017%20-11%2013%2011%20-6%2012%20-3%203%2014%20-7%2011%20-17%2021%20-23%2021%20-6%200%20-9%203%20-5%206%208%209%20-21%2064%20-34%2064%20-6%200%20-7%205%20-4%2010%203%206%202%2010%20-4%2010%20-6%200%20-15%2010%20-22%2021%20-8%2016%20-8%2020%201%2014%209%20-6%209%20-2%201%2014%20-7%2011%20-16%2021%20-22%2021%20-6%200%20-7%205%20-4%2010%203%206%201%2010%20-5%2010%20-6%200%20-8%206%20-4%2013%204%206%20-9%20-4%20-29%20-22%20-41%20-39%20-50%20-56%20-14%20-25%2013%2010%20-3%20-5%20-35%20-34%20-32%20-30%20-56%20-57%20-53%20-62%203%20-4%20-3%20-14%20-13%20-21%20-16%20-13%20-16%20-12%20-2%206%2015%2020%2014%2020%20-8%201%20-12%20-11%20-20%20-21%20-18%20-24%206%20-5%20-52%20-55%20-81%20-71%20-16%20-8%20-180%20-11%20-580%20-11%20l-558%200%200%20-1134%20c0%20-624%204%20-1129%208%20-1123%205%207%207%201%204%20-15%20-2%20-17%200%20-25%206%20-21%206%204%208%200%204%20-10%20-3%20-10%20-2%20-17%204%20-17%206%200%207%20-5%204%20-10%20-3%20-6%20-1%20-10%205%20-10%206%200%209%20-4%206%20-8%20-7%20-12%2065%20-78%2082%20-74%208%202%2012%200%209%20-5%20-3%20-4%205%20-9%2016%20-10%2068%20-4%20112%20-17%2087%20-24%20-14%20-4%20805%20-6%201820%20-6%20l1845%202%20-1805%205%20-1805%205%201842%200%20c1013%200%201835%203%201825%207%20-9%205%203%206%2028%203%2029%20-3%2038%20-2%2025%203%20-16%208%20-14%2010%2015%2015%2018%204%2035%205%2038%202%203%20-3%20-3%20-5%20-13%20-5%20-10%200%20-16%20-3%20-12%20-6%2010%20-11%20108%2027%20100%2039%20-4%206%200%208%2010%204%2020%20-7%2049%202%2042%2013%20-7%2011%2024%2022%2037%2013%207%20-4%208%20-1%203%207%20-6%2010%20-4%2012%209%207%2011%20-5%2015%20-3%2010%205%20-5%208%20-2%209%2010%205%2010%20-4%2015%20-3%2011%203%20-7%2011%2032%2033%2045%2025%205%20-3%2012%200%2016%206%205%208%203%209%20-6%204%20-9%20-6%20-11%20-4%20-6%204%205%207%2014%2010%2022%207%207%20-3%2016%200%2020%206%204%207%203%208%20-4%204%20-25%20-15%20-11%201%2021%2024%2026%2020%2030%2020%2018%204%20-15%20-21%2012%207%2078%2081%2024%2028%2038%2041%2030%2030%20-13%20-18%20-13%20-19%203%20-6%2010%207%2015%2017%2012%2023%20-3%205%2012%2025%2033%2045%2021%2020%2031%2033%2023%2029%20-9%20-5%20-9%20-2%202%207%2010%208%2015%2017%2011%2020%20-3%204%20-1%207%206%207%207%200%209%205%206%2010%20-3%206%20-1%2010%205%2010%206%200%208%205%205%2010%20-3%205%20-1%2010%205%2010%206%200%208%205%205%2010%20-3%206%20-1%2010%205%2010%206%200%208%204%205%2010%20-3%205%20-1%2010%205%2010%206%200%209%204%206%209%20-9%2014%205%2042%2016%2035%206%20-4%207%202%203%2016%20-5%2014%20-3%2020%203%2016%206%20-4%208%202%204%2016%20-4%2016%20-2%2019%208%2013%2010%20-6%2012%20-4%207%209%20-9%2022%202%2068%2013%2061%205%20-3%206%2012%204%2032%20-4%2027%20-3%2034%204%2024%208%20-11%209%20-2%206%2030%20-3%2024%20-2%2039%203%2032%204%20-6%208%20362%208%20818%20l0%20829%20-490%200%20-491%200%20-39%20-41%20c-22%20-23%20-33%20-38%20-25%20-34%208%205%20-10%20-15%20-40%20-44%20-30%20-29%20-48%20-49%20-40%20-45%208%204%20-12%20-19%20-45%20-50%20-33%20-32%20-53%20-54%20-45%20-50%208%204%20-10%20-16%20-40%20-45%20-30%20-29%20-48%20-49%20-40%20-45%208%204%20-8%20-14%20-36%20-42%20-28%20-27%20-39%20-40%20-25%20-29%20l26%2020%20-20%20-24%20c-53%20-62%20-153%20-77%20-205%20-31%20-9%208%20-15%2018%20-13%2023%202%204%200%207%20-6%207%20-6%200%20-7%207%20-4%2017%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%203%2010%202%2017%20-3%2017%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-5%2015%20-6%200%20-8%207%20-4%2017%205%2011%203%2014%20-6%208%20-10%20-6%20-11%20-2%20-6%2015%205%2015%203%2020%20-3%2016%20-12%20-7%20-26%2029%20-17%2044%203%205%202%2010%20-4%2010%20-6%200%20-7%207%20-4%2017%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%203%2010%202%2017%20-3%2017%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-5%2015%20-6%200%20-8%207%20-4%2017%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%203%2010%202%2017%20-3%2017%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-5%2015%20-6%200%20-8%207%20-4%2017%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%204%2010%202%2017%20-4%2017%20-6%200%20-9%207%20-5%2015%203%208%201%2015%20-4%2015%20-5%200%20-6%207%20-3%2017%205%2011%203%2014%20-6%208%20-10%20-6%20-11%20-2%20-6%2015%205%2017%204%2021%20-6%2015%20-9%20-6%20-11%20-3%20-6%208%203%2010%202%2017%20-3%2017%20-5%200%20-6%207%20-3%2017%205%2011%203%2014%20-6%208%20-10%20-6%20-11%20-2%20-6%2015%205%2017%204%2021%20-6%2015%20-9%20-6%20-11%20-3%20-6%208%204%2010%202%2017%20-4%2017%20-6%200%20-9%207%20-5%2015%203%208%201%2015%20-4%2015%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-6%2015%20-6%200%20-8%205%20-5%2010%203%206%202%2010%20-4%2010%20-6%200%20-8%207%20-5%2015%204%208%201%2015%20-6%2015%20-6%200%20-8%205%20-5%2010%203%206%201%2010%20-5%2010%20-7%200%20-10%207%20-6%2015%203%208%201%2015%20-4%2015%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-5%2015%20-6%200%20-8%207%20-4%2017%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%204%2010%202%2017%20-4%2017%20-6%200%20-8%207%20-5%2016%204%209%202%2013%20-5%208%20-8%20-4%20-9%201%20-4%2016%205%2017%204%2021%20-6%2015%20-9%20-6%20-11%20-3%20-6%208%204%2010%202%2017%20-4%2017%20-6%200%20-8%207%20-5%2016%204%2010%202%2013%20-6%208%20-8%20-5%20-9%20-2%20-5%209%204%2010%202%2017%20-4%2017%20-6%200%20-9%207%20-5%2015%203%208%201%2015%20-4%2015%20-5%200%20-7%207%20-4%2015%204%208%201%2015%20-5%2015%20-6%200%20-8%207%20-5%2015%204%208%201%2015%20-6%2015%20-6%200%20-8%205%20-5%2010%203%206%201%2010%20-5%2010%20-7%200%20-10%207%20-6%2015%203%208%201%2015%20-4%2015%20-5%200%20-6%207%20-3%2017%205%2011%203%2014%20-6%208%20-10%20-6%20-11%20-2%20-6%2015%205%2017%204%2021%20-6%2015%20-9%20-6%20-11%20-3%20-6%208%203%2010%202%2017%20-3%2017%20-5%200%20-6%207%20-3%2017%204%2010%202%2014%20-4%2010%20-14%20-9%20-34%2048%20-26%2070%205%2012%203%2014%20-7%208%20-10%20-6%20-12%20-4%20-7%208%203%2010%202%2017%20-4%2017%20-6%200%20-8%204%20-5%209%205%208%20-20%2081%20-27%2081%20-1%200%20-16%20-37%20-32%20-82z%20m-1767%20-1855%20c-10%20-2%20-28%20-2%20-40%200%20-13%202%20-5%204%2017%204%2022%201%2032%20-1%2023%20-4z%20m420%200%20c-60%20-2%20-156%20-2%20-215%200%20-60%201%20-11%203%20107%203%20118%200%20167%20-2%20108%20-3z%20m275%200%20c-29%20-2%20-77%20-2%20-105%200%20-29%202%20-6%203%2052%203%2058%200%2081%20-1%2053%20-3z%20m500%200%20c-40%20-2%20-107%20-2%20-150%200%20-43%201%20-10%203%2072%203%2083%200%20118%20-2%2078%20-3z%20m160%200%20c-7%20-2%20-21%20-2%20-30%200%20-10%203%20-4%205%2012%205%2017%200%2024%20-2%2018%20-5z%20m740%200%20c-122%20-2%20-324%20-2%20-450%200%20-125%201%20-25%202%20222%202%20248%200%20350%20-1%20228%20-2z%20m510%200%20c-13%20-2%20-33%20-2%20-45%200%20-13%202%20-3%204%2022%204%2025%200%2035%20-2%2023%20-4z%20m190%200%20c-24%20-2%20-62%20-2%20-85%200%20-24%202%20-5%204%2042%204%2047%200%2066%20-2%2043%20-4z%20m371%20-14%20c-4%20-7%2022%20-21%2041%20-23%206%20-1%209%20-12%207%20-26%20-2%20-20%20-1%20-22%207%20-10%208%2011%2011%205%2011%20-25%200%20-26%20-3%20-35%20-9%20-27%20-6%2010%20-10%209%20-14%20-7%20-3%20-14%20-1%20-19%206%20-15%207%203%203%20-2%20-7%20-10%20-11%20-9%20-24%20-16%20-29%20-16%20-4%200%20-6%20-4%20-3%20-9%204%20-5%20-3%20-7%20-14%20-4%20-11%203%20-20%200%20-20%20-6%200%20-8%20-430%20-11%20-1607%20-11%20-1146%200%20-1604%203%20-1593%2011%2012%209%2011%2010%20-8%206%20-12%20-3%20-20%20-1%20-16%204%203%205%201%209%20-5%209%20-6%200%20-18%2012%20-26%2028%20-9%2015%20-14%2019%20-11%209%203%20-10%202%20-15%20-4%20-12%20-5%203%20-8%2023%20-7%2045%201%2021%203%2038%205%2036%204%20-5%2059%2048%2056%2054%20-1%203%20728%205%201621%205%20893%200%201621%20-3%201619%20-6z%20m-816%20-696%20c-438%20-2%20-1158%20-2%20-1600%200%20-442%201%20-83%202%20797%202%20880%200%201241%20-1%20803%20-2z%20m815%20-15%20c-2%20-5%201%20-9%206%20-9%206%20-1%2015%20-2%2020%20-3%205%200%2013%20-5%2018%20-10%205%20-5%202%20-6%20-7%20-2%20-12%206%20-12%205%201%20-6%209%20-7%2014%20-19%2011%20-27%20-3%20-8%200%20-11%207%20-7%207%205%2011%20-3%2011%20-24%200%20-21%20-4%20-29%20-11%20-24%20-7%204%20-10%201%20-7%20-7%203%20-8%20-2%20-20%20-11%20-27%20-13%20-11%20-13%20-12%20-1%20-6%208%204%2011%203%207%20-1%20-4%20-5%20-15%20-11%20-25%20-14%20-41%20-13%20-3282%20-11%20-3279%202%201%206%20-4%2011%20-10%2010%20-7%20-2%20-12%200%20-12%205%203%2018%20-2%2033%20-10%2028%20-5%20-3%20-8%2012%20-7%2033%200%2022%205%2037%2010%2034%205%20-4%207%201%203%209%20-7%2019%2022%2047%2042%2040%208%20-2%2011%20-1%208%204%20-3%205%20686%209%201618%209%20893%200%201621%20-3%201618%20-7z%20m-3170%20-195%20c-7%20-2%20-21%20-2%20-30%200%20-10%203%20-4%205%2012%205%2017%200%2024%20-2%2018%20-5z%20M7606%204562%20c-4%20-8%20275%20-4%20283%204%202%202%20-59%204%20-137%204%20-77%200%20-143%20-4%20-146%20-8z%20M7604%204350%20l1%20-45%2070%20-3%20c38%20-2%2067%200%2063%203%20-3%204%20-33%207%20-67%207%20l-60%201%20-4%2041%20c-4%2041%20-4%2040%20-3%20-4z%20M9468%204243%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z%20M8069%204207%20c26%20-28%2031%20-32%2031%20-19%200%204%20-13%2016%20-28%2026%20l-27%2019%2024%20-26z%20M9125%204088%20l-40%20-43%2043%2040%20c23%2021%2042%2040%2042%2042%200%208%20-9%200%20-45%20-39z%20M9850%204085%20c13%20-14%2026%20-25%2028%20-25%203%200%20-5%2011%20-18%2025%20-13%2014%20-26%2025%20-28%2025%20-3%200%205%20-11%2018%20-25z%20M8222%204075%20c15%20-16%2029%20-27%2031%20-24%203%202%20-10%2015%20-27%2028%20l-31%2024%2027%20-28z%20M8300%204005%20c13%20-14%2026%20-25%2028%20-25%203%200%20-5%2011%20-18%2025%20-13%2014%20-26%2025%20-28%2025%20-3%200%205%20-11%2018%20-25z%20M9030%203959%20c-7%20-11%20-10%20-23%20-7%20-25%202%20-2%209%207%2015%2021%2014%2030%207%2033%20-8%204z%20M7607%203963%20c-3%20-5%2049%20-7%20115%20-5%20104%203%20123%201%20142%20-15%20l21%20-18%20-19%2023%20c-19%2022%20-246%2036%20-259%2015z%20M7605%203545%20c0%20-220%201%20-309%202%20-197%202%20112%202%20292%200%20400%20-1%20108%20-2%2017%20-2%20-203z%20M7896%203911%20c-3%20-4%203%20-16%2014%20-26%2011%20-10%2020%20-15%2020%20-10%200%204%208%201%2018%20-6%209%20-7%204%201%20-12%2019%20-33%2036%20-33%2035%20-40%2023z%20M8454%203871%20c20%20-22%2026%20-25%2026%20-13%200%204%20-10%2013%20-22%2021%20-23%2014%20-23%2014%20-4%20-8z%20M7991%203833%20c6%20-10%2026%20-29%2043%20-42%2026%20-21%2025%20-18%20-9%2017%20-42%2045%20-52%2052%20-34%2025z%20M9993%203730%20c0%20-47%202%20-66%204%20-42%202%2023%202%2061%200%2085%20-2%2023%20-4%204%20-4%20-43z%20M8070%203767%20c0%20-2%2015%20-16%2033%20-33%20l32%20-29%20-29%2033%20c-28%2030%20-36%2037%20-36%2029z%20M8170%203675%20c7%20-8%209%20-15%204%20-15%20-14%200%2015%20-24%2032%20-26%2012%20-2%208%206%20-12%2027%20-29%2030%20-46%2040%20-24%2014z%20M8262%203590%20c7%20-11%2019%20-22%2028%20-25%208%20-4%204%205%20-9%2019%20-29%2031%20-36%2033%20-19%206z%20M8563%203503%20c86%20-2%20228%20-2%20315%200%2086%201%2015%203%20-158%203%20-173%200%20-244%20-2%20-157%20-3z%20M9839%203363%20l-34%20-38%2038%2034%20c20%2019%2037%2036%2037%2038%200%208%20-8%200%20-41%20-34z%20M321%203250%20c0%20-8%204%20-22%209%20-30%2012%20-18%2012%20-2%200%2025%20-6%2013%20-9%2015%20-9%205z%20M9463%203213%20c15%20-2%2037%20-2%2050%200%2012%202%200%204%20-28%204%20-27%200%20-38%20-2%20-22%20-4z%20M370%203124%20c0%20-6%207%20-19%2016%20-30%2014%20-18%2014%20-18%203%206%20-14%2031%20-19%2036%20-19%2024z%20M7990%202788%20c24%20-27%2045%20-48%2047%20-48%208%200%200%209%20-44%2050%20l-48%2045%2045%20-47z%20M1702%202673%20l658%20-3%203%20-183%202%20-182%203%20188%202%20187%20-662%20-2%20-663%20-3%20657%20-2z%20M8140%202645%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M7603%202490%20c0%20-104%201%20-108%206%20-40%204%2041%203%2093%200%20115%20-4%2023%20-6%20-8%20-6%20-75z%20M7760%202535%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M8270%202525%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M7905%202400%20c27%20-27%2051%20-50%2054%20-50%203%200%20-17%2023%20-44%2050%20-27%2028%20-51%2050%20-54%2050%20-3%200%2017%20-22%2044%20-50z%20M9555%202400%20c21%20-22%2041%20-40%2044%20-40%203%200%20-13%2018%20-34%2040%20-21%2022%20-41%2040%20-44%2040%20-3%200%2013%20-18%2034%20-40z%20M8380%202427%20c0%20-2%2015%20-16%2033%20-33%20l32%20-29%20-29%2033%20c-28%2030%20-36%2037%20-36%2029z%20M8839%202383%20l-24%20-28%2028%2024%20c25%2023%2032%2031%2024%2031%20-2%200%20-14%20-12%20-28%20-27z%20M8035%202280%20c27%20-27%2051%20-50%2054%20-50%203%200%20-17%2023%20-44%2050%20-27%2028%20-51%2050%20-54%2050%20-3%200%2017%20-22%2044%20-50z%20M8500%202317%20c0%20-2%2015%20-16%2033%20-33%20l32%20-29%20-29%2033%20c-28%2030%20-36%2037%20-36%2029z%20M8770%202289%20c-7%20-11%20-10%20-23%20-7%20-25%202%20-2%209%207%2015%2021%2014%2030%207%2033%20-8%204z%20M2363%202235%20c0%20-38%202%20-53%204%20-32%202%2020%202%2052%200%2070%20-2%2017%20-4%201%20-4%20-38z%20M8658%202273%20c12%20-2%2032%20-2%2045%200%2012%202%202%204%20-23%204%20-25%200%20-35%20-2%20-22%20-4z%20M8170%202158%20c24%20-27%2045%20-48%2047%20-48%208%200%200%209%20-44%2050%20l-48%2045%2045%20-47z%20M2363%202040%20c0%20-47%202%20-66%204%20-42%202%2023%202%2061%200%2085%20-2%2023%20-4%204%20-4%20-43z%20M9713%202045%20c0%20-44%202%20-61%204%20-37%202%2023%202%2059%200%2080%20-2%2020%20-4%201%20-4%20-43z%20M8290%202045%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M8595%201913%20c79%20-3%20122%20-8%20128%20-16%206%20-9%207%20-8%204%203%20-3%2012%20-26%2015%20-128%2016%20l-124%200%20120%20-3z%20M2363%201820%20c0%20-47%202%20-66%204%20-42%202%2023%202%2061%200%2085%20-2%2023%20-4%204%20-4%20-43z%20M8855%201670%20c21%20-22%2041%20-40%2044%20-40%203%200%20-13%2018%20-34%2040%20-21%2022%20-41%2040%20-44%2040%20-3%200%2013%20-18%2034%20-40z%20M7240%201585%20c-24%20-25%20-42%20-45%20-39%20-45%203%200%2025%2020%2049%2045%2024%2025%2042%2045%2039%2045%20-3%200%20-25%20-20%20-49%20-45z%20M2780%201520%20c8%20-5%2022%20-9%2030%20-9%2010%200%208%203%20-5%209%20-27%2012%20-43%2012%20-25%200z%20M9198%201523%20c12%20-2%2030%20-2%2040%200%209%203%20-1%205%20-23%204%20-22%200%20-30%20-2%20-17%20-4z%20M2510%201405%20c19%20-19%2036%20-35%2039%20-35%203%200%20-10%2016%20-29%2035%20-19%2019%20-36%2035%20-39%2035%20-3%200%2010%20-16%2029%20-35z%20M6120%20615%20c-24%20-25%20-42%20-45%20-39%20-45%203%200%2025%2020%2049%2045%2024%2025%2042%2045%2039%2045%20-3%200%20-25%20-20%20-49%20-45z%20M2910%20315%20c13%20-14%2026%20-25%2028%20-25%203%200%20-5%2011%20-18%2025%20-13%2014%20-26%2025%20-28%2025%20-3%200%205%20-11%2018%20-25z%20M5283%20223%20c9%20-2%2023%20-2%2030%200%206%203%20-1%205%20-18%205%20-16%200%20-22%20-2%20-12%20-5z'/%3e%3c/g%3e%3cg%20transform='translate(0.000000,983.000000)%20scale(0.100000,-0.100000)'%20fill='%231078E0'%20stroke='none'%3e%3cpath%20d='M3739%209609%20c-550%20-46%20-1028%20-426%20-1214%20-964%20-71%20-205%20-69%20-176%20-72%20-1050%20l-3%20-790%20-29%20-60%20c-16%20-33%20-35%20-88%20-41%20-122%20l-13%20-63%20-636%200%20c-367%200%20-674%20-4%20-725%20-10%20-329%20-38%20-601%20-275%20-688%20-599%20-20%20-75%20-20%20-92%20-18%20-1341%20l2%20-1264%2025%20-86%20c64%20-223%20214%20-402%20418%20-500%20160%20-77%20117%20-74%20913%20-77%20l712%20-4%200%20-492%20c0%20-394%203%20-503%2015%20-546%2049%20-187%20202%20-335%20385%20-373%20l59%20-12%203%20-400%203%20-401%2028%20-57%20c32%20-65%2089%20-121%20156%20-152%20l46%20-21%201135%200%20c1247%200%201194%20-2%201387%2061%20394%20130%20723%20454%20873%20858%20l42%20113%2084%2012%20c597%2084%201014%20576%201014%201197%20l0%20134%2049%200%2049%200%20351%20-325%20c416%20-385%20363%20-349%20535%20-355%20l138%20-5%2021%20-55%20c128%20-350%20575%20-443%20829%20-174%20304%20323%2079%20853%20-363%20854%20-172%200%20-360%20-109%20-427%20-248%20l-16%20-32%20-105%201%20-106%200%20-355%20330%20c-389%20361%20-371%20349%20-506%20349%20l-81%200%20-7%20168%20c-3%2092%20-6%20318%20-6%20502%200%20184%200%20341%200%20348%200%209%20-32%2012%20-125%2012%20l-124%200%20-3%20-852%20c-3%20-849%20-3%20-853%20-26%20-933%20-92%20-331%20-334%20-570%20-665%20-658%20l-82%20-22%20-1885%200%20-1885%200%20-40%2022%20c-53%2028%20-99%2078%20-124%20133%20-20%2044%20-21%2060%20-21%201178%20l0%201132%20-1054%200%20-1054%200%20-7%2063%20c-3%2034%20-4%2091%20-1%20127%202%2036%204%2082%205%20103%20l1%2037%201055%200%201055%200%200%201138%200%201137%2024%2050%20c40%2084%201020%201065%201101%201102%20l60%2028%201655%203%20c1858%202%201707%209%201799%20-74%20100%20-90%2091%2079%2091%20-1769%20l0%20-1615%20128%200%20127%200%201%20133%200%20132%20165%205%20c204%206%20160%20-21%20484%20301%20l270%20269%20170%201%20c94%201%20204%201%20246%200%20l75%20-1%2021%20-44%20c143%20-294%20565%20-356%20803%20-117%20344%20347%2054%20948%20-425%20880%20-181%20-25%20-377%20-188%20-410%20-340%20l-7%20-29%20-281%200%20c-356%200%20-295%2029%20-632%20-309%20l-270%20-271%20-107%200%20-107%200%202%20653%202%20652%20155%205%20c195%206%20153%20-21%20510%20328%20l298%20292%20105%200%20105%200%2021%20-33%20c102%20-166%20350%20-258%20542%20-201%20519%20154%20480%20900%20-53%20995%20-244%2044%20-523%20-145%20-563%20-380%20l-7%20-41%20-124%200%20c-175%200%20-154%2014%20-494%20-325%20l-295%20-295%20-101%200%20-101%200%20-2%20498%20c-2%20531%20-4%20546%20-55%20651%20-114%20237%20-243%20294%20-678%20299%20l-318%203%20-2%20738%20-3%20737%20-28%2042%20c-15%2023%20-46%2052%20-70%2064%20l-42%2023%20-1285%201%20c-707%201%20-1328%20-2%20-1381%20-7z%20M4081%206904%20c-42%20-35%20-44%20-93%20-5%20-129%20l27%20-25%201253%200%201253%200%2028%2024%20c36%2031%2039%2095%205%20128%20l-23%2023%20-1253%203%20-1254%202%20-31%20-26z%20M3390%206203%20c-62%20-23%20-81%20-103%20-35%20-148%20l24%20-25%201619%200%201619%200%2021%2023%20c47%2050%2032%20125%20-29%20146%20-33%2011%20-3188%2015%20-3219%204z%20M3395%205483%20c-65%20-16%20-88%20-101%20-40%20-148%20l24%20-25%20606%200%20607%200%2029%2029%20c46%2046%2037%20106%20-21%20136%20-28%2015%20-1146%2022%20-1205%208z%20M5894%205480%20c-58%20-23%20-70%20-95%20-25%20-141%20l29%20-29%20357%200%20357%200%2029%2029%20c44%2044%2033%20108%20-22%20137%20-32%2016%20-686%2020%20-725%204z%20M3349%202961%20c-46%20-47%20-30%20-118%2032%20-140%2053%20-18%203189%20-15%203233%203%2061%2026%2070%20111%2014%20150%20-20%2015%20-173%2016%20-1636%2016%20l-1614%200%20-29%20-29z%20M3349%202251%20c-36%20-37%20-38%20-79%20-5%20-118%20l24%20-28%201626%200%201625%200%2023%2023%20c34%2033%2031%2097%20-5%20128%20l-28%2024%20-1615%200%20-1616%200%20-29%20-29z'/%3e%3c/g%3e%3cg%20transform='translate(0.000000,983.000000)%20scale(0.100000,-0.100000)'%20fill='%2398D030'%20stroke='none'%3e%3cpath%20d='M5215%205686%20c-44%20-19%20-45%20-21%20-138%20-271%20-48%20-126%20-187%20-500%20-310%20-829%20l-224%20-600%20-25%2040%20c-14%2021%20-103%20170%20-198%20329%20-257%20432%20-251%20430%20-500%20154%20-80%20-89%20-158%20-172%20-173%20-185%20l-29%20-24%20-1554%200%20-1554%200%20-1%20-37%20c-1%20-21%20-3%20-67%20-5%20-103%20-3%20-36%20-2%20-93%201%20-127%20l7%20-63%201614%200%20c1377%200%201619%202%201642%2014%2015%208%2076%2069%20136%20135%2060%2067%20110%20120%20111%20119%202%20-3%20133%20-233%20283%20-498%20228%20-402%20225%20-399%20297%20-386%2061%2012%2043%20-33%20523%201246%20l130%20344%2017%20-39%20c9%20-22%2046%20-119%2082%20-215%2035%20-96%20141%20-380%20234%20-630%2094%20-250%20177%20-475%20186%20-499%2026%20-69%20102%20-101%20159%20-68%2011%207%20114%20117%20228%20245%20l208%20232%20741%200%20742%20-1%20245%20-217%20c304%20-269%20235%20-242%20619%20-242%20l317%200%2022%20-38%20c194%20-346%20714%20-330%20889%2028%20217%20443%20-243%20905%20-682%20683%20-103%20-52%20-255%20-243%20-255%20-319%200%20-12%20-45%20-14%20-260%20-14%20l-260%200%20-243%20211%20c-133%20116%20-255%20218%20-272%20227%20-38%2019%20-1708%2019%20-1752%20-1%20-14%20-6%20-77%20-73%20-140%20-150%20-81%20-96%20-118%20-135%20-124%20-125%20-4%207%20-57%20146%20-117%20308%20-359%20961%20-489%201305%20-502%201331%20-7%2011%20-27%2027%20-45%2035%20-40%2016%20-33%2016%20-70%200z'/%3e%3c/g%3e%3c/svg%3e";
function T0({
  lang: e = "en",
  logoSrc: a,
  layout: s = "horizontal",
  showTagline: r = !0,
  logoSize: n,
  loginSize: i = "md",
  className: c,
  imageClassName: o
}) {
  const u = a ?? Ue, m = n ?? R.logoPx[i], b = {
    md: "text-xl",
    lg: "text-2xl"
  }[i], p = {
    md: "text-xs",
    lg: "text-sm"
  }[i], w = /* @__PURE__ */ l("span", { className: "leading-tight", children: [
    /* @__PURE__ */ l(
      "span",
      {
        className: h(
          "block font-semibold tracking-tight text-slate-950",
          b
        ),
        children: [
          "alocare",
          /* @__PURE__ */ t("span", { className: "text-slate-950", children: "." }),
          /* @__PURE__ */ t("span", { className: "text-emerald-600", children: "ai" })
        ]
      }
    ),
    r ? /* @__PURE__ */ t("span", { className: h("block font-medium text-slate-600", p), children: f(I.brandTagline, e) }) : null
  ] }), y = /* @__PURE__ */ t(
    "img",
    {
      src: u,
      alt: "Alocare AI",
      width: m,
      height: m,
      className: h("shrink-0 object-contain", o),
      style: { width: m, height: m }
    }
  );
  return s === "mark" ? /* @__PURE__ */ t("div", { className: h("inline-flex", c), children: y }) : s === "stacked" ? /* @__PURE__ */ l("div", { className: h("flex flex-col items-center gap-3 text-center", c), children: [
    y,
    w
  ] }) : /* @__PURE__ */ l("div", { className: h("flex items-center gap-3", c), children: [
    y,
    w
  ] });
}
function Qn({
  lang: e = "en",
  onLocaleChange: a,
  logoSrc: s,
  showBrand: r = !0,
  className: n
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: h(
        "sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur",
        n
      ),
      children: /* @__PURE__ */ l("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        r ? /* @__PURE__ */ t(T0, { lang: e, logoSrc: s, layout: "horizontal", loginSize: "md" }) : /* @__PURE__ */ t("span", { className: "flex-1", "aria-hidden": !0 }),
        a ? /* @__PURE__ */ t(
          h0,
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
const Lr = {
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
function h2({
  variant: e = "alocare",
  layout: a = "portal",
  lang: s = "en",
  loginSize: r = "lg",
  title: n,
  subtitle: i,
  logoSrc: c,
  className: o
}) {
  const u = Lr[e], m = n ?? f(u.title, s), b = i ?? f(u.subtitle, s);
  return e === "alocare" && a === "portal" ? /* @__PURE__ */ l("div", { className: h(R.brandBlock[r], o), children: [
    /* @__PURE__ */ t(
      T0,
      {
        lang: s,
        logoSrc: c,
        layout: "mark",
        loginSize: r,
        className: "mx-auto"
      }
    ),
    /* @__PURE__ */ l("div", { className: h("w-full", R.brandLogoToTitle[r]), children: [
      /* @__PURE__ */ t("h1", { className: R.title[r], children: m }),
      /* @__PURE__ */ t(
        "p",
        {
          className: h(
            R.subtitle[r],
            R.titleToSubtitle[r],
            R.subtitleMax[r],
            "mx-auto text-balance"
          ),
          children: b
        }
      )
    ] })
  ] }) : /* @__PURE__ */ l("div", { className: h("mb-6", o), children: [
    e === "alocare" ? /* @__PURE__ */ t("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ t(T0, { lang: s, logoSrc: c, layout: "horizontal", loginSize: r }) }) : /* @__PURE__ */ t(
      "div",
      {
        className: h(
          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white",
          e === "emr" && "bg-teal-600",
          e === "admin" && "bg-blue-600",
          e === "hr" && "bg-emerald-600"
        ),
        "aria-hidden": !0,
        children: e === "emr" ? "EMR" : e === "admin" ? /* @__PURE__ */ t(a2, { className: "h-7 w-7" }) : /* @__PURE__ */ t(ia, { className: "h-7 w-7" })
      }
    ),
    /* @__PURE__ */ l("div", { className: "text-center", children: [
      /* @__PURE__ */ t("h1", { className: R.title[r], children: m }),
      /* @__PURE__ */ t("p", { className: R.subtitle[r], children: b })
    ] })
  ] });
}
function Pr({
  lang: e = "en",
  logoSrc: a,
  className: s
}) {
  return /* @__PURE__ */ l("div", { className: h("space-y-6", s), children: [
    /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ t(
        "img",
        {
          src: a ?? Ue,
          alt: "Alocare AI",
          width: 48,
          height: 48,
          className: "h-12 w-12 shrink-0 object-contain"
        }
      ),
      /* @__PURE__ */ l("span", { className: "leading-tight text-white", children: [
        /* @__PURE__ */ l("span", { className: "block text-2xl font-semibold tracking-tight", children: [
          "alocare",
          /* @__PURE__ */ t("span", { className: "text-emerald-300", children: ".ai" })
        ] }),
        /* @__PURE__ */ t("span", { className: "block text-sm font-medium text-blue-100", children: f(I.brandTagline, e) })
      ] })
    ] }),
    /* @__PURE__ */ t("p", { className: "max-w-sm text-lg text-blue-100", children: f(
      {
        en: "Healthcare AI platform for hospitals, clinics, and enterprises.",
        id: "Platform AI kesehatan untuk rumah sakit, klinik, dan perusahaan."
      },
      e
    ) })
  ] });
}
function _r({ className: e }) {
  return /* @__PURE__ */ l("svg", { className: e, viewBox: "0 0 24 24", "aria-hidden": !0, children: [
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
function Xn({
  lang: e = "en",
  loginSize: a = "lg",
  onClick: s,
  loading: r,
  disabled: n,
  className: i
}) {
  return /* @__PURE__ */ t(
    s0,
    {
      type: "button",
      variant: "secondary",
      fullWidth: !0,
      size: R.button[a],
      loading: r,
      disabled: n || !s,
      onClick: s,
      className: h("border-slate-200 bg-white", i),
      leftIcon: /* @__PURE__ */ t(_r, { className: "h-5 w-5" }),
      children: f(I.continueWithGoogle, e)
    }
  );
}
function el({ lang: e = "en", className: a }) {
  return /* @__PURE__ */ l("div", { className: h("relative my-6", a), children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center", "aria-hidden": !0, children: /* @__PURE__ */ t("div", { className: "w-full border-t border-slate-200" }) }),
    /* @__PURE__ */ t("div", { className: "relative flex justify-center text-xs font-medium uppercase tracking-wide", children: /* @__PURE__ */ t("span", { className: "bg-white px-3 text-slate-500", children: f(I.orDivider, e) }) })
  ] });
}
const qe = "doctor@alocare.net", Ke = "doctor123";
function Ir({
  lang: e = "en",
  loginSize: a = "lg",
  variant: s = "compact",
  email: r = qe,
  password: n = Ke,
  additionalNote: i,
  className: c
}) {
  const o = a === "lg" ? "text-base" : "text-sm", u = a === "lg" ? "text-base" : "text-sm";
  if (s === "compact")
    return /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left text-blue-900",
          o,
          c
        ),
        role: "note",
        children: [
          /* @__PURE__ */ t("p", { className: h("font-semibold", u), children: f(I.demoAccountTitle, e) }),
          /* @__PURE__ */ l("p", { className: "mt-1 text-blue-800", children: [
            r,
            " / ",
            n
          ] })
        ]
      }
    );
  const m = i === void 0 ? f(I.demoAdditionalNote, e) : typeof i == "string" ? i : f(i, e);
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left",
        o,
        c
      ),
      role: "note",
      children: [
        /* @__PURE__ */ l("div", { className: "mb-2 flex items-center gap-2 font-semibold text-blue-900", children: [
          /* @__PURE__ */ t(ja, { className: "h-4 w-4 shrink-0", "aria-hidden": !0 }),
          f(I.demoNotesTitle, e)
        ] }),
        /* @__PURE__ */ l("dl", { className: "space-y-1 text-slate-700", children: [
          /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-x-2", children: [
            /* @__PURE__ */ l("dt", { className: "font-medium text-slate-600", children: [
              f(I.demoEmailLabel, e),
              ":"
            ] }),
            /* @__PURE__ */ t("dd", { className: "font-mono text-slate-900", children: r })
          ] }),
          /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-x-2", children: [
            /* @__PURE__ */ l("dt", { className: "font-medium text-slate-600", children: [
              f(I.demoPasswordLabel, e),
              ":"
            ] }),
            /* @__PURE__ */ t("dd", { className: "font-mono text-slate-900", children: n })
          ] })
        ] }),
        m ? /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-600", children: m }) : null
      ]
    }
  );
}
function Tr({ message: e, className: a }) {
  return e ? /* @__PURE__ */ l(
    "div",
    {
      role: "alert",
      className: h(
        "flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(ha, { className: "mt-0.5 h-4 w-4 shrink-0", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: e })
      ]
    }
  ) : null;
}
function Rr({
  lang: e = "en",
  loginSize: a = "lg",
  label: s = d("Password", "Kata sandi"),
  className: r,
  labelClassName: n,
  ...i
}) {
  const [c, o] = _(!1);
  return /* @__PURE__ */ l("div", { className: "relative", children: [
    /* @__PURE__ */ t(
      e0,
      {
        lang: e,
        label: s,
        labelClassName: n ?? R.label[a],
        type: c ? "text" : "password",
        autoComplete: "current-password",
        className: h(R.input[a], "pr-12", r),
        ...i
      }
    ),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => o((u) => !u),
        className: h(
          "absolute right-3 rounded p-1 text-slate-500 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
          R.passwordToggleTop[a]
        ),
        "aria-label": f(c ? d("Hide password", "Sembunyikan kata sandi") : d("Show password", "Tampilkan kata sandi"), e),
        children: c ? /* @__PURE__ */ t(Na, { className: "h-5 w-5", "aria-hidden": !0 }) : /* @__PURE__ */ t(Ma, { className: "h-5 w-5", "aria-hidden": !0 })
      }
    )
  ] });
}
function p2({
  lang: e = "en",
  onLocaleChange: a,
  onForgotPassword: s,
  showForgotPassword: r = !0,
  showLanguageSwitcher: n = !0,
  languageVariant: i = "marketing",
  showDemoHint: c = !1,
  showApiHint: o = !1,
  className: u
}) {
  const m = n && a;
  return /* @__PURE__ */ l("div", { className: h("mt-6 space-y-4", u), children: [
    (m || r) && /* @__PURE__ */ l("div", { className: "flex items-center justify-between border-t border-slate-100 pt-4", children: [
      m && a ? /* @__PURE__ */ t(
        h0,
        {
          locale: e,
          onChange: a,
          variant: i
        }
      ) : /* @__PURE__ */ t("span", {}),
      r ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: s,
          className: "text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
          children: f(I.forgotPassword, e)
        }
      ) : null
    ] }),
    c ? /* @__PURE__ */ t("p", { className: "text-center text-xs text-slate-500", children: f(I.demoHint, e) }) : null,
    o ? /* @__PURE__ */ t("p", { className: "text-center text-xs text-slate-400", children: Fe.login }) : null
  ] });
}
const P = d0(
  ({ className: e, size: a, ...s }, r) => /* @__PURE__ */ t(
    s0,
    {
      ref: r,
      size: a ?? "lg",
      className: h("min-h-12 min-w-12 touch-manipulation px-5", e),
      ...s
    }
  )
);
P.displayName = "TouchButton";
function b2({
  lang: e = "en",
  loginSize: a = "lg",
  identifierMode: s = "email",
  onSubmit: r,
  error: n,
  loading: i,
  touchOptimized: c = !1,
  showRememberMe: o = !1,
  submitLabel: u,
  showPasswordToggle: m = !1,
  className: b
}) {
  const [p, w] = _(""), [y, A] = _(""), [M, C] = _(!1), L = c ? P : s0, T = u ?? f(s === "email" ? I.signIn : I.login, e), G = s === "email" ? I.email : I.username, U = c ? void 0 : R.input[a], q = c ? void 0 : R.label[a], Q = c ? "space-y-4" : R.form[a], F = c ? "xl" : R.button[a];
  return /* @__PURE__ */ l(
    "form",
    {
      className: h(Q, b),
      onSubmit: (g) => {
        g.preventDefault(), r == null || r({ identifier: p, password: y });
      },
      children: [
        /* @__PURE__ */ t(
          e0,
          {
            lang: e,
            type: s === "email" ? "email" : "text",
            label: G,
            labelClassName: q,
            value: p,
            onChange: (g) => w(g.target.value),
            autoComplete: s === "email" ? "email" : "username",
            className: U,
            required: !0
          }
        ),
        m ? /* @__PURE__ */ t(
          Rr,
          {
            lang: e,
            loginSize: a,
            value: y,
            onChange: (g) => A(g.target.value),
            labelClassName: q,
            className: U,
            required: !0
          }
        ) : /* @__PURE__ */ t(
          e0,
          {
            lang: e,
            type: "password",
            label: I.password,
            labelClassName: q,
            value: y,
            onChange: (g) => A(g.target.value),
            autoComplete: "current-password",
            className: U,
            required: !0
          }
        ),
        o ? /* @__PURE__ */ l(
          "label",
          {
            className: h(
              "flex items-center gap-2 text-slate-600",
              a === "lg" ? "text-base" : "text-sm"
            ),
            children: [
              /* @__PURE__ */ t(
                "input",
                {
                  type: "checkbox",
                  checked: M,
                  onChange: (g) => C(g.target.checked),
                  className: "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                }
              ),
              f(I.rememberMe, e)
            ]
          }
        ) : null,
        n ? /* @__PURE__ */ t(Tr, { message: n }) : null,
        /* @__PURE__ */ t(
          L,
          {
            type: "submit",
            variant: c ? "success" : "primary",
            fullWidth: !0,
            size: F,
            loading: i,
            className: c ? "min-h-14" : void 0,
            children: T
          }
        )
      ]
    }
  );
}
function Er({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: s,
  onForgotPassword: r,
  error: n,
  loading: i = !1,
  showDemoNotes: c = !0,
  demoEmail: o = qe,
  demoPassword: u = Ke,
  logoSrc: m,
  className: b
}) {
  const [p, w] = _(""), [y, A] = _(""), M = (C) => {
    C.preventDefault(), s == null || s({ identifier: p, password: y });
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex min-h-screen items-center justify-center bg-slate-50 px-4",
        b
      ),
      children: /* @__PURE__ */ l(O, { className: "w-full max-w-md shadow-lg", children: [
        /* @__PURE__ */ l(u0, { className: "flex flex-col items-stretch gap-0 border-b border-slate-100 px-5 py-4", children: [
          a ? /* @__PURE__ */ t("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ t(h0, { locale: e, onChange: a }) }) : null,
          /* @__PURE__ */ l("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t(
              T0,
              {
                lang: e,
                logoSrc: m,
                layout: "mark",
                logoSize: 48,
                className: "mx-auto"
              }
            ),
            /* @__PURE__ */ t("h1", { className: "mt-4 font-heading text-xl font-semibold text-slate-900", children: f(I.portalTitle, e) }),
            /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: f(I.portalSubtitle, e) })
          ] })
        ] }),
        /* @__PURE__ */ l($, { children: [
          /* @__PURE__ */ l("form", { onSubmit: M, className: "space-y-4", children: [
            /* @__PURE__ */ t(
              e0,
              {
                type: "email",
                label: I.email,
                lang: e,
                value: p,
                onChange: (C) => w(C.target.value),
                required: !0,
                autoComplete: "email"
              }
            ),
            /* @__PURE__ */ t(
              e0,
              {
                type: "password",
                label: I.password,
                lang: e,
                value: y,
                onChange: (C) => A(C.target.value),
                required: !0,
                autoComplete: "current-password"
              }
            ),
            n ? /* @__PURE__ */ t("p", { className: "text-sm text-red-600", role: "alert", children: n }) : null,
            /* @__PURE__ */ t(s0, { type: "submit", fullWidth: !0, loading: i, size: "lg", children: f(I.signIn, e) })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-4 text-center", children: /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: r,
              className: "text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
              children: f(I.forgotPassword, e)
            }
          ) }),
          c ? /* @__PURE__ */ l(
            "div",
            {
              className: "mt-4 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left text-sm text-blue-900",
              role: "note",
              children: [
                /* @__PURE__ */ t("p", { className: "font-semibold", children: f(I.demoAccountTitle, e) }),
                /* @__PURE__ */ l("p", { className: "mt-1 text-blue-800", children: [
                  o,
                  " / ",
                  u
                ] })
              ]
            }
          ) : null
        ] })
      ] })
    }
  );
}
const jr = "admin@alocare.net", Dr = "admin123";
function Or({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: s,
  error: r,
  loading: n,
  logoSrc: i = "/logo-alocare.svg",
  className: c
}) {
  return /* @__PURE__ */ t(
    m2,
    {
      variant: "split",
      accent: "blue",
      className: c,
      sidePanel: /* @__PURE__ */ t(Pr, { lang: e, logoSrc: i }),
      children: /* @__PURE__ */ t(u2, { className: "shadow-xl", children: /* @__PURE__ */ l(We, { children: [
        /* @__PURE__ */ t(h2, { variant: "admin", lang: e }),
        /* @__PURE__ */ t(
          b2,
          {
            lang: e,
            identifierMode: "email",
            showPasswordToggle: !0,
            onSubmit: s,
            error: r,
            loading: n
          }
        ),
        /* @__PURE__ */ t(
          p2,
          {
            lang: e,
            onLocaleChange: a,
            showForgotPassword: !0,
            showApiHint: !1
          }
        ),
        /* @__PURE__ */ t(
          Ir,
          {
            lang: e,
            className: "mt-4",
            email: jr,
            password: Dr
          }
        )
      ] }) })
    }
  );
}
function $r({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: s,
  error: r,
  loading: n,
  className: i
}) {
  return /* @__PURE__ */ t(m2, { variant: "gradient", accent: "emerald", className: i, children: /* @__PURE__ */ l(u2, { children: [
    /* @__PURE__ */ t(h2, { variant: "hr", lang: e }),
    /* @__PURE__ */ t(
      b2,
      {
        lang: e,
        identifierMode: "email",
        showPasswordToggle: !0,
        onSubmit: s,
        error: r,
        loading: n
      }
    ),
    /* @__PURE__ */ t(p2, { lang: e, onLocaleChange: a, showForgotPassword: !0 })
  ] }) });
}
function Je({
  lang: e = "en",
  onLogin: a,
  error: s,
  loading: r,
  className: n
}) {
  const i = (c) => {
    a == null || a({ username: c.identifier, password: c.password });
  };
  return /* @__PURE__ */ t(m2, { variant: "gradient", accent: "teal", className: n, children: /* @__PURE__ */ l(u2, { loginSize: "md", className: h("p-8"), children: [
    /* @__PURE__ */ t(h2, { variant: "emr", layout: "inline", lang: e, loginSize: "md" }),
    /* @__PURE__ */ l(We, { loginSize: "md", className: "px-0 pb-0 pt-4", children: [
      /* @__PURE__ */ t(
        b2,
        {
          lang: e,
          loginSize: "md",
          identifierMode: "username",
          touchOptimized: !0,
          onSubmit: i,
          error: s,
          loading: r
        }
      ),
      /* @__PURE__ */ t(p2, { lang: e, showForgotPassword: !1, showApiHint: !0 })
    ] })
  ] }) });
}
function tl({
  variant: e = "portal",
  lang: a = "en"
}) {
  const [s, r] = _(a);
  switch (e) {
    case "admin":
      return /* @__PURE__ */ t(Or, { lang: s, onLocaleChange: r });
    case "hr":
      return /* @__PURE__ */ t($r, { lang: s, onLocaleChange: r });
    case "emr":
      return /* @__PURE__ */ t(Je, { lang: s });
    default:
      return /* @__PURE__ */ t(Er, { lang: s, onLocaleChange: r });
  }
}
const i0 = {
  auth: Fe,
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
}, Br = [
  { id: "dashboard", icon: "layout-dashboard", label: d("Dashboard", "Dasbor") },
  { id: "upload", icon: "upload", label: d("Upload Report", "Unggah Laporan") },
  { id: "queue", icon: "users", label: d("Patient Queue", "Antrian Pasien") },
  { id: "analysis", icon: "brain", label: d("AI Analysis", "Analisis AI") },
  { id: "review", icon: "stethoscope", label: d("Doctor Review", "Tinjauan Dokter") },
  { id: "chat", icon: "message-circle", label: d("Chat Assistant", "Asisten Chat") },
  { id: "history", icon: "history", label: d("History", "Riwayat") },
  { id: "settings", icon: "settings", label: d("Settings", "Pengaturan") }
], Vr = {
  uploaded: d("Uploaded", "Berhasil diunggah"),
  ocr: d("Processing OCR", "Memproses OCR"),
  analyzing: d("AI analyzing", "AI menganalisis"),
  completed: d("Completed", "Selesai")
}, b0 = {
  syncing: d("Syncing…", "Menyinkronkan…"),
  offline: d("Offline", "Luring"),
  retry: d("Retry upload", "Unggah ulang"),
  pending: d("Pending uploads in queue", "Unggahan tertunda dalam antrian")
};
function Ze({
  status: e,
  lang: a = "en",
  pendingCount: s = 0,
  onRetry: r,
  className: n
}) {
  if (e === "online") return null;
  const i = e === "syncing" ? Qa : e === "offline" ? ya : ks;
  return /* @__PURE__ */ l(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: h(
        "flex min-h-12 items-center justify-between gap-4 rounded-xl px-4 py-3",
        e === "offline" && "bg-amber-50 text-amber-900",
        e === "syncing" && "bg-blue-50 text-blue-900",
        e === "retry" && "bg-red-50 text-red-900",
        n
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(
            i,
            {
              className: h("h-5 w-5 shrink-0", e === "syncing" && "animate-spin"),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-semibold", children: f(
              e === "syncing" ? b0.syncing : e === "offline" ? b0.offline : b0.retry,
              a
            ) }),
            s > 0 ? /* @__PURE__ */ l("p", { className: "text-xs opacity-80", children: [
              s,
              " ",
              f(b0.pending, a)
            ] }) : null
          ] })
        ] }),
        e === "retry" && r ? /* @__PURE__ */ t(P, { variant: "secondary", size: "md", onClick: r, children: f(b0.retry, a) }) : null
      ]
    }
  );
}
function Ye({
  lang: e = "en",
  role: a = "Clinical Doctor",
  autoLockMinutes: s = 5,
  masked: r = !0,
  className: n
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "flex min-h-10 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600",
        n
      ),
      children: [
        /* @__PURE__ */ l("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(a2, { className: "h-3.5 w-3.5 text-blue-600", "aria-hidden": !0 }),
          a
        ] }),
        /* @__PURE__ */ l("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(ge, { className: "h-3.5 w-3.5", "aria-hidden": !0 }),
          e === "id" ? `Kunci otomatis ${s} mnt` : `Auto-lock ${s} min`
        ] }),
        r ? /* @__PURE__ */ t("span", { children: e === "id" ? "Data sensitif disamarkan" : "Sensitive data masked" }) : null
      ]
    }
  );
}
const Gr = [
  { id: "worklist", label: d("Worklist", "Antrian") },
  { id: "consultation", label: d("Consultation", "Konsultasi") },
  { id: "medications", label: d("Medications", "Obat") },
  { id: "labrad", label: d("Lab / Rad", "Lab / Rad") },
  { id: "ai-voice", label: d("AI Voice", "Suara AI") },
  { id: "reports", label: d("Reports", "Laporan") }
], Hr = {
  pending: d("Waiting", "Menunggu"),
  in_progress: d("In Consultation", "Sedang Konsultasi"),
  completed: d("Finished", "Selesai"),
  cancelled: d("Cancelled", "Dibatalkan")
}, S0 = {
  s: d("Subjective", "Subjektif"),
  o: d("Objective", "Objektif"),
  a: d("Assessment", "Asesmen"),
  p: d("Planning", "Perencanaan")
}, Fr = {
  worklist: be,
  consultation: s2,
  medications: Ne,
  labrad: fe,
  "ai-voice": R0,
  reports: m0
};
function g0({
  children: e,
  lang: a = "en",
  activeNav: s = "worklist",
  onNavChange: r,
  doctorName: n = "Dr. Ananya Putri",
  specialty: i,
  unitLabel: c = "Ward B · Outpatient",
  dateLabel: o,
  onLocaleChange: u,
  onLogout: m,
  offlineStatus: b = "online",
  orientation: p = "landscape",
  appTitle: w,
  className: y
}) {
  const A = w ?? "EMR MediConsult AI", M = i ?? (a === "id" ? "Penyakit Dalam" : "Internal Medicine"), C = o ?? (/* @__PURE__ */ new Date()).toLocaleDateString(a === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ l("div", { className: h("flex min-h-screen flex-col bg-slate-100", y), children: [
    /* @__PURE__ */ t("header", { className: "sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 md:px-6", children: /* @__PURE__ */ l("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: A }),
        /* @__PURE__ */ l("p", { className: "text-sm text-slate-600", children: [
          n,
          " | ",
          M,
          " | ",
          C
        ] }),
        /* @__PURE__ */ t("p", { className: "text-xs font-medium text-blue-600", children: c })
      ] }),
      /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t($e, { fallback: "AP", size: "md" }),
        u ? /* @__PURE__ */ t(h0, { locale: a, onChange: u }) : null,
        /* @__PURE__ */ t(P, { variant: "ghost", size: "md", className: "relative min-w-12", "aria-label": "Notifications", children: /* @__PURE__ */ t(he, { className: "h-5 w-5", "aria-hidden": !0 }) }),
        /* @__PURE__ */ t(P, { variant: "ghost", size: "md", onClick: m, "aria-label": "Logout", children: /* @__PURE__ */ t(ve, { className: "h-5 w-5", "aria-hidden": !0 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ l("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ l(
        "nav",
        {
          className: h(
            "shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
            p === "landscape" ? "w-52" : "w-20"
          ),
          "aria-label": "EMR navigation",
          children: [
            /* @__PURE__ */ t("ul", { className: "space-y-1", children: Gr.map((L) => {
              const T = Fr[L.id], G = s === L.id;
              return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  onClick: () => r == null ? void 0 : r(L.id),
                  className: h(
                    "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors",
                    G ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"
                  ),
                  "aria-current": G ? "page" : void 0,
                  children: [
                    /* @__PURE__ */ t(T, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                    p === "landscape" ? f(L.label, a) : null,
                    p === "portrait" ? /* @__PURE__ */ t("span", { className: "sr-only", children: f(L.label, a) }) : null
                  ]
                }
              ) }, L.id);
            }) }),
            /* @__PURE__ */ t("p", { className: "mt-4 hidden px-2 text-[10px] text-slate-400 lg:block", children: "API: api.alocare.net" })
          ]
        }
      ),
      /* @__PURE__ */ l("main", { className: "min-w-0 flex-1 overflow-auto p-4 md:p-6", children: [
        /* @__PURE__ */ t(
          Ye,
          {
            lang: a,
            role: a === "id" ? "Dokter · JWT" : "Doctor · JWT",
            className: "mb-4"
          }
        ),
        b !== "online" ? /* @__PURE__ */ t(Ze, { status: b, lang: a, className: "mb-4" }) : null,
        e
      ] })
    ] })
  ] });
}
const Wr = [
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
], Ur = {
  pending: "info",
  in_progress: "ai",
  completed: "normal",
  cancelled: "critical"
};
function qr({
  lang: e = "en",
  patients: a = Wr,
  onCallPatient: s,
  ...r
}) {
  return /* @__PURE__ */ l(g0, { lang: e, activeNav: "worklist", ...r, children: [
    /* @__PURE__ */ l("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ l("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ t(
          as,
          {
            className: "pointer-events-none absolute left-3 top-10 h-5 w-5 text-slate-400",
            "aria-hidden": !0
          }
        ),
        /* @__PURE__ */ t(
          e0,
          {
            lang: e,
            label: d("Search patient", "Cari pasien"),
            placeholder: e === "id" ? "Nama atau no. rekam medis" : "Name or record number",
            className: "pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ l(P, { variant: "secondary", className: "min-h-12 shrink-0 gap-2", children: [
        /* @__PURE__ */ t(pe, { className: "h-5 w-5", "aria-hidden": !0 }),
        f(d("Filter date", "Filter tanggal"), e)
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", role: "list", children: a.map((n) => /* @__PURE__ */ l(
      "li",
      {
        className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        children: [
          /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ l("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: n.fullName }),
              /* @__PURE__ */ l("p", { className: "text-sm text-slate-600", children: [
                n.admissionNo,
                " · ",
                n.mrn,
                " · ",
                n.insurance
              ] })
            ] }),
            /* @__PURE__ */ t(Y, { variant: Ur[n.status], children: f(Hr[n.status], e) })
          ] }),
          /* @__PURE__ */ t(
            P,
            {
              className: "mt-4 min-h-12",
              fullWidth: !0,
              disabled: n.status === "completed",
              onClick: () => s == null ? void 0 : s(n),
              children: f(d("Call →", "Panggil →"), e)
            }
          )
        ]
      },
      n.id
    )) }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: i0.worklist.list })
  ] });
}
function E0({
  lang: e = "en",
  name: a,
  admissionNo: s,
  mrn: r,
  insurance: n,
  allergies: i,
  className: c
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        i && "border-amber-200",
        c
      ),
      children: [
        /* @__PURE__ */ l("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
            /* @__PURE__ */ l("p", { className: "mt-1 text-sm text-slate-600", children: [
              s,
              " · ",
              r
            ] })
          ] }),
          /* @__PURE__ */ t(Y, { variant: "info", children: n })
        ] }),
        i ? /* @__PURE__ */ l("p", { className: "mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900", children: [
          /* @__PURE__ */ t(Y0, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
          e === "id" ? "ALERGI" : "ALLERGIES",
          ": ",
          i
        ] }) : null
      ]
    }
  );
}
const F2 = {
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
function Kr({
  lang: e = "en",
  soap: a,
  onSaveSoap: s,
  onSubmit: r,
  ...n
}) {
  const [i, c] = _("subjective"), [o, u] = _({
    subjective: (a == null ? void 0 : a.subjective) ?? "",
    objective: (a == null ? void 0 : a.objective) ?? "",
    assessment: (a == null ? void 0 : a.assessment) ?? "",
    plan: (a == null ? void 0 : a.plan) ?? "",
    icd10Code: (a == null ? void 0 : a.icd10Code) ?? "R79.89"
  });
  return /* @__PURE__ */ l(g0, { lang: e, activeNav: "consultation", ...n, children: [
    /* @__PURE__ */ t(
      E0,
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
    /* @__PURE__ */ t("div", { className: "mb-4 grid grid-cols-4 gap-2", children: ["subjective", "objective", "assessment", "plan"].map((b) => /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => c(b),
        className: h(
          "min-h-14 touch-manipulation rounded-xl border-2 px-2 py-3 text-center transition-colors",
          i === b ? "border-teal-600 bg-teal-50" : "border-slate-200 bg-white hover:bg-slate-50"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-xl font-bold text-teal-700", children: F2[b].letter }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs font-semibold text-slate-800", children: f(
            {
              subjective: S0.s,
              objective: S0.o,
              assessment: S0.a,
              plan: S0.p
            }[b],
            e
          ) })
        ]
      },
      b
    )) }),
    /* @__PURE__ */ l("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
      /* @__PURE__ */ t("p", { className: "mb-2 text-xs text-slate-500", children: f(F2[i].hint, e) }),
      /* @__PURE__ */ t(
        t0,
        {
          lang: e,
          rows: 10,
          value: o[i] ?? "",
          onChange: (b) => {
            const p = { ...o, [i]: b.target.value };
            u(p), s == null || s(p);
          },
          className: "text-base"
        }
      ),
      i === "assessment" ? /* @__PURE__ */ l("div", { className: "mt-3", children: [
        /* @__PURE__ */ t("label", { className: "text-sm font-medium text-slate-700", children: "ICD-10" }),
        /* @__PURE__ */ t(
          "input",
          {
            className: "mt-1 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm",
            value: o.icd10Code ?? "",
            onChange: (b) => u({ ...o, icd10Code: b.target.value }),
            placeholder: i0.icd10.search
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ l("div", { className: "mt-4 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ t(P, { variant: "secondary", className: "min-h-12", children: f(d("AI Voice fill", "Isi suara AI"), e) }),
      /* @__PURE__ */ t(P, { className: "min-h-12 flex-1", onClick: r, children: f(d("Submit record", "Simpan rekam medis"), e) })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: i0.consultations.updateSoap })
  ] });
}
const Jr = [
  { id: "1", name: "Amoxicillin 500mg", dose: "3×1 / day oral", availability: "available" },
  { id: "2", name: "Metformin 500mg", dose: "2×1 / day oral", availability: "available" },
  { id: "3", name: "Lansoprazole 30mg", dose: "1×1 / day oral", availability: "limited" }
], Zr = {
  available: "normal",
  limited: "low",
  unavailable: "critical"
};
function Yr({
  lang: e = "en",
  medications: a = Jr,
  ...s
}) {
  return /* @__PURE__ */ l(g0, { lang: e, activeNav: "medications", ...s, children: [
    /* @__PURE__ */ t(
      E0,
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
    /* @__PURE__ */ l("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(Ne, { className: "h-6 w-6 text-teal-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: f(d("Medication Orders", "Order Obat"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((r) => /* @__PURE__ */ l(
      "li",
      {
        className: "flex min-h-14 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3",
        children: [
          /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: r.name }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: r.dose })
          ] }),
          /* @__PURE__ */ t(Y, { variant: Zr[r.availability], children: r.availability === "available" ? e === "id" ? "Tersedia" : "Available" : r.availability === "limited" ? e === "id" ? "Terbatas" : "Limited" : e === "id" ? "Habis" : "Unavailable" })
        ]
      },
      r.id
    )) }),
    /* @__PURE__ */ l(P, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(ke, { className: "h-5 w-5", "aria-hidden": !0 }),
      f(d("Add medication", "Tambah obat"), e)
    ] }),
    /* @__PURE__ */ l("ul", { className: "mt-6 space-y-2 text-sm text-slate-600", children: [
      /* @__PURE__ */ l("li", { children: [
        "• ",
        e === "id" ? "Terhubung Pharmacy API" : "Connects to Pharmacy API"
      ] }),
      /* @__PURE__ */ l("li", { children: [
        "• ",
        e === "id" ? "Filter formulary asuransi" : "Insurance formulary filter"
      ] }),
      /* @__PURE__ */ l("li", { children: [
        "• ",
        e === "id" ? "Peringatan alergi otomatis" : "Auto allergy warnings"
      ] })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: i0.pharmacy.search })
  ] });
}
const Qr = [
  { id: "1", name: "Complete Blood Count", category: "LAB", note: "Fasting sample required" },
  { id: "2", name: "HbA1c", category: "LAB", note: "3-month glucose average" },
  { id: "3", name: "Chest X-Ray PA", category: "RAD", note: "PA projection" }
];
function Xr({
  lang: e = "en",
  orders: a = Qr,
  ...s
}) {
  return /* @__PURE__ */ l(g0, { lang: e, activeNav: "labrad", ...s, children: [
    /* @__PURE__ */ t(
      E0,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ l("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(fe, { className: "h-6 w-6 text-violet-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: f(d("Lab / Radiology Orders", "Order Lab / Radiologi"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((r) => /* @__PURE__ */ t(
      "li",
      {
        className: "rounded-xl border border-slate-200 bg-white px-4 py-4",
        children: /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ l("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(Y, { variant: r.category === "LAB" ? "info" : "ai", children: r.category }),
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: r.name })
          ] }),
          r.note ? /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: r.note }) : null
        ] }) })
      },
      r.id
    )) }),
    /* @__PURE__ */ l(P, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(ke, { className: "h-5 w-5", "aria-hidden": !0 }),
      f(d("Add lab / radiology", "Tambah lab / radiologi"), e)
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: i0.lab.search })
  ] });
}
const en = [
  { key: "start", en: "Start consultation", id: "Mulai konsultasi" },
  { key: "stt", en: "Live STT transcript", id: "Transkrip langsung" },
  { key: "stop", en: "Stop / keyword", id: "Berhenti / kata kunci" },
  { key: "ai", en: "AI → SOAP + ICD-10 + Rx", id: "AI → SOAP + ICD-10 + Rx" },
  { key: "review", en: "Doctor review & submit", id: "Tinjau & simpan" }
];
function tn({
  lang: e = "en",
  orientation: a = "landscape",
  ...s
}) {
  const [r, n] = _("review"), i = e === "id" ? "Pasien mengeluh batuk kering dua hari. Tidak sesak. Demam subfebril." : "Patient reports dry cough for two days. No shortness of breath. Low-grade fever.";
  return /* @__PURE__ */ l(g0, { lang: e, activeNav: "ai-voice", orientation: a, ...s, children: [
    /* @__PURE__ */ t(
      E0,
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
    /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-2" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ l("div", { className: "space-y-4", children: [
            /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ l(
                P,
                {
                  variant: "success",
                  className: "min-h-14 min-w-32",
                  onClick: () => n("listening"),
                  disabled: r === "listening",
                  children: [
                    /* @__PURE__ */ t(R0, { className: "h-5 w-5", "aria-hidden": !0 }),
                    f(d("Start AI", "Mulai AI"), e)
                  ]
                }
              ),
              /* @__PURE__ */ l(
                P,
                {
                  variant: "danger",
                  className: "min-h-14",
                  onClick: () => n("processing"),
                  children: [
                    /* @__PURE__ */ t(us, { className: "h-5 w-5", "aria-hidden": !0 }),
                    f(d("Stop", "Berhenti"), e)
                  ]
                }
              )
            ] }),
            r === "listening" ? /* @__PURE__ */ l("div", { className: "flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3", children: [
              /* @__PURE__ */ l("span", { className: "relative flex h-3 w-3", children: [
                /* @__PURE__ */ t("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" }),
                /* @__PURE__ */ t("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-red-600" })
              ] }),
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-red-800", children: e === "id" ? "Mendengarkan…" : "Listening…" })
            ] }) : null,
            /* @__PURE__ */ t(
              t0,
              {
                lang: e,
                label: d("Live transcript", "Transkrip langsung"),
                value: i,
                rows: 8,
                readOnly: !0
              }
            ),
            /* @__PURE__ */ t("ol", { className: "space-y-2 text-sm text-slate-600", children: en.map((c, o) => /* @__PURE__ */ l("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ l("span", { className: "font-bold text-teal-600", children: [
                o + 1,
                "."
              ] }),
              e === "id" ? c.id : c.en
            ] }, c.key)) })
          ] }),
          /* @__PURE__ */ l("div", { className: "rounded-2xl border border-violet-200 bg-violet-50/50 p-4", children: [
            /* @__PURE__ */ l("div", { className: "mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ t(Me, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
              /* @__PURE__ */ t("h3", { className: "font-bold text-slate-900", children: f(d("AI-generated SOAP", "SOAP dari AI"), e) })
            ] }),
            /* @__PURE__ */ t(
              t0,
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
                readOnly: r !== "review"
              }
            ),
            /* @__PURE__ */ t(P, { fullWidth: !0, className: "mt-4 min-h-14", children: f(d("Approve & submit", "Setujui & simpan"), e) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ l("p", { className: "mt-4 text-xs text-slate-400", children: [
      i0.ai.analyze,
      " · ",
      i0.consultations.submit
    ] })
  ] });
}
const an = {
  "layout-dashboard": Oa,
  upload: r2,
  users: P0,
  brain: na,
  stethoscope: s2,
  "message-circle": ye,
  history: Ia,
  settings: ls
};
function r0({
  children: e,
  lang: a = "en",
  activeNav: s = "dashboard",
  onNavChange: r,
  doctorName: n = "Dr. Sarah Chen",
  role: i,
  locale: c,
  onLocaleChange: o,
  onLogout: u,
  notificationCount: m = 2,
  offlineStatus: b = "online",
  pendingUploads: p = 0,
  orientation: w = "landscape",
  showSecurityBar: y = !0,
  className: A
}) {
  const M = c ?? a, C = i ?? (a === "id" ? "Dokter Klinis" : "Clinical Doctor");
  return /* @__PURE__ */ l(
    "div",
    {
      className: h(
        "flex min-h-screen flex-col bg-slate-100",
        w === "portrait" && "min-h-[1280px]",
        A
      ),
      children: [
        /* @__PURE__ */ l("header", { className: "sticky top-0 z-20 flex min-h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2 md:px-6", children: [
          /* @__PURE__ */ l("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white",
                "aria-hidden": !0,
                children: "A"
              }
            ),
            /* @__PURE__ */ t("div", { className: "hidden sm:block leading-tight", children: /* @__PURE__ */ l("span", { className: "text-lg font-bold text-slate-900", children: [
              "alocare",
              /* @__PURE__ */ t("span", { className: "text-emerald-600", children: ".ai" })
            ] }) })
          ] }),
          /* @__PURE__ */ l("div", { className: "flex flex-1 items-center justify-end gap-3", children: [
            /* @__PURE__ */ l("div", { className: "hidden items-center gap-2 md:flex", children: [
              /* @__PURE__ */ t($e, { fallback: "SC", size: "md" }),
              /* @__PURE__ */ l("div", { className: "text-right", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: n }),
                /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: C })
              ] })
            ] }),
            o ? /* @__PURE__ */ t(h0, { locale: M, onChange: o }) : null,
            /* @__PURE__ */ l(
              P,
              {
                variant: "ghost",
                size: "md",
                className: "relative min-w-12",
                "aria-label": a === "id" ? "Notifikasi" : "Notifications",
                children: [
                  /* @__PURE__ */ t(he, { className: "h-5 w-5", "aria-hidden": !0 }),
                  m > 0 ? /* @__PURE__ */ t("span", { className: "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white", children: m }) : null
                ]
              }
            ),
            /* @__PURE__ */ t(
              P,
              {
                variant: "ghost",
                size: "md",
                onClick: u,
                "aria-label": a === "id" ? "Keluar" : "Logout",
                children: /* @__PURE__ */ t(ve, { className: "h-5 w-5", "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ l("div", { className: "flex flex-1 overflow-hidden", children: [
          /* @__PURE__ */ t(
            "nav",
            {
              className: h(
                "sticky top-14 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
                w === "landscape" ? "w-56" : "w-20"
              ),
              "aria-label": a === "id" ? "Menu utama" : "Main menu",
              children: /* @__PURE__ */ t("ul", { className: "space-y-1", children: Br.map((L) => {
                const T = an[L.icon], G = s === L.id;
                return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    onClick: () => r == null ? void 0 : r(L.id),
                    className: h(
                      "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      G ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                    ),
                    "aria-current": G ? "page" : void 0,
                    children: [
                      /* @__PURE__ */ t(T, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                      w === "landscape" ? /* @__PURE__ */ t("span", { className: "text-sm font-semibold", children: f(L.label, a) }) : /* @__PURE__ */ t("span", { className: "sr-only", children: f(L.label, a) })
                    ]
                  }
                ) }, L.id);
              }) })
            }
          ),
          /* @__PURE__ */ l("main", { className: "flex min-w-0 flex-1 flex-col overflow-auto p-4 md:p-6", children: [
            y ? /* @__PURE__ */ t(Ye, { lang: a, role: C, className: "mb-4" }) : null,
            b !== "online" ? /* @__PURE__ */ t(
              Ze,
              {
                status: b,
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
const al = r0, sn = d(
  "Overall stable. Platelet count slightly below reference. LDL mildly elevated.",
  "Secara umum stabil. Trombosit sedikit di bawah referensi. LDL sedikit meningkat."
), rn = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "Glucose", value: "118 mg/dL", status: "high" }
], nn = [
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
  ...s
}) {
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "analysis", orientation: a, ...s, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("AI Analysis", "Analisis AI"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-3" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ l(
            "section",
            {
              className: "space-y-3",
              "aria-label": e === "id" ? "Pratinjau laporan" : "Report preview",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Laporan" : "Report" }),
                /* @__PURE__ */ l("div", { className: "flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", children: [
                  /* @__PURE__ */ t(m0, { className: "h-20 w-20 text-red-400", "aria-hidden": !0 }),
                  /* @__PURE__ */ t("p", { className: "mt-4 text-center text-sm font-semibold text-slate-900", children: "Blood Test Report.pdf" }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: "2.4 MB · PDF" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ l(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Analisis AI" : "AI analysis",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Hasil AI" : "AI Results" }),
                /* @__PURE__ */ t(x0, { summary: sn, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(d2, { findings: rn, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ l("div", { className: "flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4", children: [
                  /* @__PURE__ */ t(vr, { level: "medium", lang: e }),
                  /* @__PURE__ */ t("p", { className: "text-lg font-bold text-blue-600", children: "96%" })
                ] }),
                /* @__PURE__ */ t(c2, { score: 96, lang: e, dualLanguageTitle: !0 })
              ]
            }
          ),
          /* @__PURE__ */ l(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Tindakan dokter" : "Doctor actions",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Tindakan" : "Actions" }),
                /* @__PURE__ */ t(Ge, { items: nn, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(
                  t0,
                  {
                    lang: e,
                    label: d("Doctor notes", "Catatan dokter"),
                    placeholder: e === "id" ? "Tambahkan catatan klinis…" : "Add clinical notes…",
                    rows: 4
                  }
                ),
                /* @__PURE__ */ l("div", { className: "grid grid-cols-2 gap-3", children: [
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
function ln({ lang: e = "en", orientation: a = "landscape" }) {
  return /* @__PURE__ */ t(Qe, { lang: e, orientation: a });
}
function sl({
  lang: e = "en",
  orientation: a = "landscape",
  startScreen: s = "worklist"
}) {
  const [r, n] = _(s !== "login"), [i, c] = _("worklist");
  if (!r)
    return /* @__PURE__ */ t(
      Je,
      {
        lang: e,
        onLogin: () => n(!0)
      }
    );
  const o = { lang: e, orientation: a, onNavChange: c, activeNav: i };
  switch (i) {
    case "consultation":
      return /* @__PURE__ */ t(Kr, { ...o, activeNav: "consultation" });
    case "medications":
      return /* @__PURE__ */ t(Yr, { ...o, activeNav: "medications" });
    case "labrad":
      return /* @__PURE__ */ t(Xr, { ...o, activeNav: "labrad" });
    case "ai-voice":
      return /* @__PURE__ */ t(tn, { ...o, activeNav: "ai-voice" });
    case "reports":
      return /* @__PURE__ */ t(ln, { lang: e, orientation: a });
    default:
      return /* @__PURE__ */ t(
        qr,
        {
          ...o,
          activeNav: "worklist",
          onCallPatient: () => c("consultation")
        }
      );
  }
}
const z0 = {
  today: d("Today's Patients", "Pasien Hari Ini"),
  uploads: d("Recent Uploads", "Unggahan Terbaru"),
  alerts: d("AI Alerts", "Peringatan AI"),
  quick: d("Quick Actions", "Aksi Cepat")
}, on = [
  { id: "upload", icon: r2, label: d("Upload Report", "Unggah Laporan") },
  { id: "consult", icon: Ae, label: d("Start Consultation", "Mulai Konsultasi") },
  { id: "ai", icon: ye, label: d("Ask AI", "Tanya AI") },
  { id: "history", icon: ga, label: d("View History", "Lihat Riwayat") }
], cn = [
  { id: "1", message: d("Low platelet", "Trombosit rendah"), severity: "warning" },
  { id: "2", message: d("High glucose", "Glukosa tinggi"), severity: "warning" },
  { id: "3", message: d("Follow-up needed", "Perlu tindak lanjut"), severity: "info" }
];
function dn({
  lang: e = "en",
  todayPatients: a = 8,
  pendingReview: s = 2,
  urgent: r = 1,
  recentUploads: n = 5,
  aiAlerts: i = cn,
  ...c
}) {
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "dashboard", ...c, children: [
    /* @__PURE__ */ l("div", { className: "mb-6", children: [
      /* @__PURE__ */ t(
        D,
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
    /* @__PURE__ */ l("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ t(O, { children: /* @__PURE__ */ t($, { className: "py-5", children: /* @__PURE__ */ l("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ t(D, { label: z0.today, lang: e, as: "h2" }),
          /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: a }),
          /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "pasien hari ini" : "patients today" }),
          /* @__PURE__ */ l("ul", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ l("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t(P0, { className: "h-4 w-4 text-blue-600", "aria-hidden": !0 }),
              s,
              " ",
              e === "id" ? "menunggu tinjauan" : "pending review"
            ] }),
            /* @__PURE__ */ l("li", { className: "flex items-center gap-2 text-amber-700", children: [
              /* @__PURE__ */ t(Y0, { className: "h-4 w-4", "aria-hidden": !0 }),
              r,
              " ",
              e === "id" ? "mendesak" : "urgent"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50", children: /* @__PURE__ */ t(P0, { className: "h-6 w-6 text-blue-600", "aria-hidden": !0 }) })
      ] }) }) }),
      /* @__PURE__ */ t(O, { children: /* @__PURE__ */ l($, { className: "py-5", children: [
        /* @__PURE__ */ t(D, { label: z0.uploads, lang: e, as: "h2" }),
        /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: n }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "laporan terbaru" : "recent reports" })
      ] }) }),
      /* @__PURE__ */ t(O, { className: "md:col-span-2", children: /* @__PURE__ */ l($, { className: "py-5", children: [
        /* @__PURE__ */ t(D, { label: z0.alerts, lang: e, as: "h2" }),
        /* @__PURE__ */ t("ul", { className: "mt-4 space-y-3", children: i.map((o) => /* @__PURE__ */ l(
          "li",
          {
            className: h(
              "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3",
              o.severity === "warning" ? "bg-amber-50" : "bg-sky-50"
            ),
            children: [
              /* @__PURE__ */ t(
                Y0,
                {
                  className: h(
                    "h-5 w-5 shrink-0",
                    o.severity === "warning" ? "text-amber-600" : "text-sky-600"
                  ),
                  "aria-hidden": !0
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-sm font-medium text-slate-900", children: f(o.message, e) })
            ]
          },
          o.id
        )) })
      ] }) }),
      /* @__PURE__ */ t(O, { className: "md:col-span-2", children: /* @__PURE__ */ l($, { className: "py-5", children: [
        /* @__PURE__ */ t(D, { label: z0.quick, lang: e, as: "h2" }),
        /* @__PURE__ */ t("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: on.map((o) => {
          const u = o.icon;
          return /* @__PURE__ */ l(
            P,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-14 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t(u, { className: "h-6 w-6", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs", children: f(o.label, e) })
              ]
            },
            o.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
const mn = [
  { id: "camera", icon: da, label: d("Camera", "Kamera"), emoji: "📷" },
  { id: "pdf", icon: m0, label: d("PDF", "PDF"), emoji: "📄" },
  { id: "gallery", icon: Ra, label: d("Gallery", "Galeri"), emoji: "🖼" },
  { id: "voice", icon: R0, label: d("Voice", "Suara"), emoji: "🎤" }
], W2 = ["uploaded", "ocr", "analyzing", "completed"];
function un({
  lang: e = "en",
  pipelineStatus: a = "analyzing",
  progress: s = 65,
  fileName: r = "Blood Test Report.pdf",
  ...n
}) {
  const [i, c] = _(
    a !== "idle" ? "success" : "empty"
  );
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "upload", ...n, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("Upload Report", "Unggah Laporan"),
        lang: e,
        as: "h1",
        className: "mb-2 text-2xl"
      }
    ),
    /* @__PURE__ */ t("p", { className: "mb-6 text-slate-600", children: e === "id" ? "Unggah PDF, gambar, atau rekam suara — dioptimalkan untuk sentuhan." : "Upload PDF, image, or voice — optimized for touch." }),
    /* @__PURE__ */ l("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ l("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(
          Be,
          {
            lang: e,
            state: i,
            className: "max-w-none",
            onFilesSelected: () => c("success")
          }
        ),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: mn.map((o) => {
          const u = o.icon;
          return /* @__PURE__ */ l(
            P,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-20 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: o.emoji }),
                /* @__PURE__ */ t(u, { className: "h-5 w-5 sm:hidden", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: f(o.label, e) })
              ]
            },
            o.id
          );
        }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: a !== "idle" ? /* @__PURE__ */ l(K0, { children: [
        /* @__PURE__ */ t(Ve, { fileName: r, lang: e, uploaded: !0 }),
        /* @__PURE__ */ l("div", { className: "overflow-hidden rounded-xl border border-slate-200 bg-white p-4", children: [
          /* @__PURE__ */ t("div", { className: "mb-3 flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100", children: /* @__PURE__ */ t(m0, { className: "h-16 w-16 text-red-400", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold", children: r }),
          a === "ocr" || a === "analyzing" ? /* @__PURE__ */ t(Ie, { value: s, className: "mt-3", showLabel: !0 }) : null
        ] }),
        /* @__PURE__ */ t("ol", { className: "space-y-2", children: W2.map((o, u) => {
          const m = Math.max(0, W2.indexOf(a)), b = u < m || a === "completed", p = a === o;
          return /* @__PURE__ */ l(
            "li",
            {
              className: h(
                "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                b && "bg-emerald-50 text-emerald-800",
                p && "bg-blue-50 text-blue-800",
                !b && !p && "bg-slate-50 text-slate-500"
              ),
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: h(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      b && "bg-emerald-600 text-white",
                      p && "bg-blue-600 text-white",
                      !b && !p && "bg-slate-200 text-slate-600"
                    ),
                    children: u + 1
                  }
                ),
                f(Vr[o], e)
              ]
            },
            o
          );
        }) })
      ] }) : null })
    ] })
  ] });
}
const hn = [
  { date: "May 15, 2024", event: d("Lab report uploaded", "Laporan lab diunggah") },
  { date: "May 14, 2024", event: d("AI analysis completed", "Analisis AI selesai") },
  { date: "May 10, 2024", event: d("Follow-up scheduled", "Kontrol dijadwalkan") }
], pn = [
  { label: "BP", value: "120/80" },
  { label: "HR", value: "72 bpm" },
  { label: "Temp", value: "36.8 °C" }
];
function bn({
  lang: e = "en",
  name: a,
  mrn: s,
  age: r = 45,
  gender: n,
  embedded: i = !1,
  className: c
}) {
  const o = n ?? (e === "id" ? "Laki-laki" : "Male"), u = d(
    "Stable overall. Mild thrombocytopenia noted on latest labs.",
    "Secara umum stabil. Trombositopenia ringan pada lab terbaru."
  ), m = /* @__PURE__ */ l("div", { className: h("space-y-4", c), children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
      /* @__PURE__ */ l("p", { className: "text-sm text-slate-500", children: [
        s,
        " · ",
        r,
        " · ",
        o
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-2", children: pn.map((b) => /* @__PURE__ */ t(O, { children: /* @__PURE__ */ l($, { className: "py-3 text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: b.label }),
      /* @__PURE__ */ t("p", { className: "text-sm font-bold", children: b.value })
    ] }) }, b.label)) }),
    /* @__PURE__ */ t(x0, { summary: u, lang: e }),
    /* @__PURE__ */ t(O, { children: /* @__PURE__ */ l($, { children: [
      /* @__PURE__ */ l("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(s2, { className: "h-5 w-5 text-teal-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          D,
          {
            label: d("Doctor Notes", "Catatan Dokter"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("p", { className: "text-sm text-slate-700", children: e === "id" ? "Pantau trombosit. Kontrol ulang dalam 3 bulan." : "Monitor platelets. Repeat CBC in 3 months." })
    ] }) }),
    /* @__PURE__ */ t(O, { children: /* @__PURE__ */ l($, { children: [
      /* @__PURE__ */ l("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(ue, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          D,
          {
            label: d("Medical Timeline", "Linimasa Medis"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("ul", { className: "space-y-3", children: hn.map((b) => /* @__PURE__ */ l("li", { className: "flex gap-3 text-sm", children: [
        /* @__PURE__ */ t(m0, { className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400", "aria-hidden": !0 }),
        /* @__PURE__ */ l("div", { children: [
          /* @__PURE__ */ t("p", { className: "font-medium text-slate-900", children: f(b.event, e) }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: b.date })
        ] })
      ] }, b.date)) })
    ] }) }),
    /* @__PURE__ */ l("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ t(Y, { variant: "low", children: e === "id" ? "Trombosit rendah" : "Low platelet" }),
      /* @__PURE__ */ t(Y, { variant: "normal", children: e === "id" ? "Stabil" : "Stable" })
    ] })
  ] });
  return i ? m : /* @__PURE__ */ t("div", { className: "max-w-2xl p-4", children: m });
}
const fn = [
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
], xn = {
  waiting: "info",
  "in-review": "ai",
  "follow-up": "low"
};
function gn({
  lang: e = "en",
  patients: a = fn,
  orientation: s = "landscape",
  ...r
}) {
  var o;
  const [n, i] = _((o = a[0]) == null ? void 0 : o.id), c = a.find((u) => u.id === n);
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "queue", orientation: s, ...r, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("Patient Queue", "Antrian Pasien"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ t(
      e0,
      {
        lang: e,
        label: d("Search", "Cari"),
        placeholder: e === "id" ? "Nama pasien, MRN, atau telepon" : "Patient name, MRN, or phone",
        className: "mb-4 max-w-xl"
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "flex min-h-[480px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          s === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ t(
            "ul",
            {
              className: h(
                "divide-y divide-slate-100 overflow-y-auto",
                s === "landscape" ? "w-80 shrink-0 border-r" : "max-h-64"
              ),
              role: "listbox",
              "aria-label": e === "id" ? "Daftar pasien" : "Patient list",
              children: a.map((u) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ l(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": n === u.id,
                  onClick: () => i(u.id),
                  className: h(
                    "flex w-full min-h-14 touch-manipulation items-center justify-between gap-3 px-4 py-4 text-left transition-colors",
                    n === u.id ? "bg-blue-50" : "hover:bg-slate-50"
                  ),
                  children: [
                    /* @__PURE__ */ l("div", { children: [
                      /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: u.name }),
                      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: u.mrn })
                    ] }),
                    /* @__PURE__ */ t(Y, { variant: xn[u.status], children: f(u.statusLabel, e) })
                  ]
                }
              ) }, u.id))
            }
          ),
          /* @__PURE__ */ t("div", { className: "min-w-0 flex-1 overflow-y-auto p-4", children: c ? /* @__PURE__ */ t(
            bn,
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
const vn = d(
  "Platelet mildly low. Otherwise stable. Recommend repeat CBC in 3 months.",
  "Trombosit sedikit rendah. Selain itu stabil. Disarankan ulang CBC dalam 3 bulan."
), yn = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" }
], wn = [
  { value: "approve", label: d("Approve", "Setujui"), icon: t2, variant: "success" },
  { value: "partial", label: d("Partial approve", "Setujui sebagian"), icon: we, variant: "secondary" },
  { value: "reject", label: d("Reject", "Tolak"), icon: As, variant: "danger" }
];
function Xe({
  lang: e = "en",
  onSubmit: a,
  ...s
}) {
  const [r, n] = _("approve"), [i, c] = _(""), [o, u] = _(
    e === "id" ? `Ulang CBC
Pantau 3 bulan` : `Repeat CBC
Monitor 3 months`
  );
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "review", ...s, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("Doctor Review", "Tinjauan Dokter"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ l("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ l("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(x0, { summary: vn, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(d2, { findings: yn, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(c2, { score: 96, lang: e, dualLanguageTitle: !0 })
      ] }),
      /* @__PURE__ */ l("div", { className: "space-y-4 rounded-2xl border border-slate-200 bg-white p-6", children: [
        /* @__PURE__ */ t(
          t0,
          {
            lang: e,
            label: d("Editable doctor notes", "Catatan dokter"),
            value: i,
            onChange: (m) => c(m.target.value),
            placeholder: e === "id" ? "Tambahkan atau koreksi temuan AI…" : "Add or correct AI findings…",
            rows: 5
          }
        ),
        /* @__PURE__ */ t(
          t0,
          {
            lang: e,
            label: d("Add recommendation", "Tambah rekomendasi"),
            value: o,
            onChange: (m) => u(m.target.value),
            rows: 3
          }
        ),
        /* @__PURE__ */ l("fieldset", { children: [
          /* @__PURE__ */ t("legend", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Keputusan" : "Decision" }),
          /* @__PURE__ */ t("div", { className: "grid gap-3 sm:grid-cols-3", children: wn.map((m) => {
            const b = m.icon;
            return /* @__PURE__ */ l(
              P,
              {
                variant: r === m.value ? m.variant : "secondary",
                fullWidth: !0,
                className: "min-h-14",
                onClick: () => n(m.value),
                "aria-pressed": r === m.value,
                children: [
                  /* @__PURE__ */ t(b, { className: "h-5 w-5", "aria-hidden": !0 }),
                  f(m.label, e)
                ]
              },
              m.value
            );
          }) })
        ] }),
        /* @__PURE__ */ t(
          P,
          {
            fullWidth: !0,
            size: "xl",
            className: "min-h-14",
            leftIcon: /* @__PURE__ */ t(we, { className: "h-5 w-5", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a(r, i),
            children: e === "id" ? "Tanda tangan & kirim" : "Sign & submit"
          }
        )
      ] })
    ] })
  ] });
}
const Nn = [
  d("Is this platelet concerning?", "Apakah trombosit ini mengkhawatirkan?"),
  d("Summarize in Bahasa Indonesia", "Ringkas dalam Bahasa Indonesia"),
  d("Generate patient explanation", "Buat penjelasan untuk pasien")
], kn = [
  d("Explain to patient", "Jelaskan ke pasien"),
  d("Doctor summary", "Ringkasan dokter"),
  d("Compare previous result", "Bandingkan hasil sebelumnya")
], Mn = [
  { id: "1", title: "Platelet review", time: "10:32" },
  { id: "2", title: "Lab summary ID", time: "09:15" },
  { id: "3", title: "Glucose context", time: "Yesterday" }
], An = [
  {
    role: "user",
    content: "Is this platelet count concerning for this patient?"
  },
  {
    role: "assistant",
    content: "142,000 /µL is mildly below the typical reference range. Consider clinical context, symptoms, and trend vs prior labs. Follow-up CBC in 3 months is reasonable if stable."
  }
];
function Cn({
  lang: e = "en",
  orientation: a = "landscape",
  ...s
}) {
  const [r, n] = _(An), [i, c] = _("1");
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "chat", orientation: a, ...s, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("Chat Assistant", "Asisten Chat"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "flex min-h-[520px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          a === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ l(
            "aside",
            {
              className: h(
                "shrink-0 overflow-y-auto border-slate-200 bg-slate-50 p-3",
                a === "landscape" ? "w-56 border-r" : "max-h-40 border-b"
              ),
              children: [
                /* @__PURE__ */ t("p", { className: "mb-2 px-2 text-xs font-semibold uppercase text-slate-500", children: e === "id" ? "Riwayat" : "History" }),
                /* @__PURE__ */ t("ul", { className: "space-y-1", children: Mn.map((o) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ l(
                  "button",
                  {
                    type: "button",
                    onClick: () => c(o.id),
                    className: h(
                      "flex w-full min-h-12 touch-manipulation flex-col rounded-xl px-3 py-3 text-left text-sm",
                      i === o.id ? "bg-blue-100 font-semibold text-blue-800" : "hover:bg-white"
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
          /* @__PURE__ */ l("div", { className: "flex min-w-0 flex-1 flex-col", children: [
            /* @__PURE__ */ t("div", { className: "flex-1 space-y-4 overflow-y-auto p-4", children: r.map((o, u) => /* @__PURE__ */ t(He, { role: o.role, content: o.content }, u)) }),
            /* @__PURE__ */ l("div", { className: "border-t border-slate-100 p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-2 text-xs font-semibold text-slate-500", children: e === "id" ? "Saran pertanyaan" : "Suggested prompts" }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: Nn.map((o, u) => /* @__PURE__ */ t(
                P,
                {
                  variant: "secondary",
                  size: "md",
                  className: "h-auto min-h-12 whitespace-normal py-2 text-left text-xs",
                  onClick: () => n((m) => [
                    ...m,
                    { role: "user", content: f(o, e) }
                  ]),
                  children: f(o, e)
                },
                u
              )) }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: kn.map((o, u) => /* @__PURE__ */ t(P, { variant: "ghost", size: "md", children: f(o, e) }, u)) }),
              /* @__PURE__ */ t(
                Ar,
                {
                  lang: e,
                  onSend: (o) => n((u) => [...u, { role: "user", content: o }])
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
const Sn = d(
  "Patient reports mild cough and low-grade fever. Vitals stable on video assessment.",
  "Pasien melaporkan batuk ringan dan demam rendah. Tanda vital stabil pada penilaian video."
), zn = [
  { role: "assistant", content: "Patient: I have had a cough for two days." },
  { role: "user", content: "Doctor: Any difficulty breathing?" },
  { role: "assistant", content: "Patient: No, just a mild dry cough." }
];
function Ln({
  lang: e = "en",
  orientation: a = "landscape",
  ...s
}) {
  return /* @__PURE__ */ l(r0, { lang: e, activeNav: "dashboard", ...s, children: [
    /* @__PURE__ */ t(
      D,
      {
        label: d("Telemedicine", "Telemedicine"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ l(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-[1fr_280px]" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ l("div", { className: "space-y-4", children: [
            /* @__PURE__ */ l("div", { className: "relative aspect-video overflow-hidden rounded-2xl bg-slate-900", children: [
              /* @__PURE__ */ l("div", { className: "absolute inset-0 flex items-center justify-center text-white/60", children: [
                /* @__PURE__ */ t(Ae, { className: "h-16 w-16", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "sr-only", children: e === "id" ? "Video pasien" : "Patient video" })
              ] }),
              /* @__PURE__ */ t("div", { className: "absolute bottom-4 left-4 h-24 w-32 overflow-hidden rounded-lg border-2 border-white/30 bg-slate-800", children: /* @__PURE__ */ t("div", { className: "flex h-full items-center justify-center text-xs text-white/50", children: e === "id" ? "Dokter" : "Doctor" }) }),
              /* @__PURE__ */ l("div", { className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-slate-900/80 px-4 py-3", children: [
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Bisukan" : "Mute",
                    children: /* @__PURE__ */ t(R0, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Kamera" : "Camera",
                    children: /* @__PURE__ */ t(ys, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  P,
                  {
                    variant: "danger",
                    className: "min-h-12 min-w-12 rounded-full",
                    "aria-label": e === "id" ? "Akhiri panggilan" : "End call",
                    children: /* @__PURE__ */ t(Ka, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ l("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Transkrip langsung" : "Live transcript" }),
              /* @__PURE__ */ t("div", { className: "max-h-40 space-y-2 overflow-y-auto", children: zn.map((r, n) => /* @__PURE__ */ t(He, { role: r.role, content: r.content }, n)) })
            ] })
          ] }),
          /* @__PURE__ */ l("aside", { className: "space-y-4", children: [
            /* @__PURE__ */ t(x0, { summary: Sn, lang: e }),
            /* @__PURE__ */ t(P, { fullWidth: !0, variant: "success", className: "min-h-14", children: e === "id" ? "Simpan ringkasan" : "Save summary" })
          ] })
        ]
      }
    )
  ] });
}
const rl = {
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
}, Pn = d(
  "Overall health status appears stable. Mildly elevated LDL cholesterol noted; platelet count is slightly below reference range. Recommend follow-up in 3 months.",
  "Status kesehatan secara umum stabil. Kolesterol LDL sedikit meningkat; trombosit sedikit di bawah rentang referensi. Disarankan kontrol dalam 3 bulan."
), _n = [
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "WBC", value: "8,100 /µL", status: "normal" },
  { label: "Platelet", value: "142,000 /µL", status: "low" }
], In = [
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
], Tn = [
  { en: "Upload Report", id: "Unggah Laporan", color: "bg-blue-600" },
  { en: "AI Analysis", id: "Analisis AI", color: "bg-teal-500" },
  { en: "Doctor Summary", id: "Ringkasan Dokter", color: "bg-blue-600" }
];
function nl({
  lang: e = "en",
  step: a = 2
}) {
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-slate-50 p-6", children: /* @__PURE__ */ l("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ l("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ l("div", { children: [
        /* @__PURE__ */ t("h1", { className: "font-heading text-2xl font-bold text-slate-900", children: e === "id" ? "Analisis Laporan Medis" : "Medical Report Analysis" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: e === "id" ? "Alur kerja AI untuk laporan medis" : "AI-powered medical report workflow" })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-blue-600", children: "alocare.ai" })
    ] }),
    /* @__PURE__ */ l("div", { className: "relative mb-10 flex justify-between px-4", children: [
      /* @__PURE__ */ t("div", { className: "absolute left-8 right-8 top-4 h-0.5 bg-slate-200", "aria-hidden": !0 }),
      Tn.map((s, r) => /* @__PURE__ */ l("div", { className: "relative z-10 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: `flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${r + 1 <= a ? s.color : "bg-slate-300"}`,
            children: r + 1
          }
        ),
        /* @__PURE__ */ t("span", { className: "text-center text-xs font-semibold text-slate-900", children: e === "id" ? s.id : s.en }),
        /* @__PURE__ */ t("span", { className: "text-center text-xs text-blue-600", children: e === "id" ? s.en : s.id })
      ] }, s.en))
    ] }),
    /* @__PURE__ */ l("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ l("section", { className: "space-y-4", "aria-label": e === "id" ? "Unggah" : "Upload", children: [
        /* @__PURE__ */ t(Be, { lang: e, state: a >= 1 ? "success" : "empty" }),
        /* @__PURE__ */ t(
          Ve,
          {
            fileName: "Blood Test Report.pdf",
            lang: e,
            uploaded: a >= 1
          }
        ),
        /* @__PURE__ */ t(mr, { lang: e, status: a >= 1 ? "complete" : "pending" })
      ] }),
      /* @__PURE__ */ l("section", { className: "space-y-4", "aria-label": e === "id" ? "Analisis AI" : "AI Analysis", children: [
        /* @__PURE__ */ t(x0, { summary: Pn, lang: e, loading: a < 2 }),
        /* @__PURE__ */ t(d2, { findings: _n, lang: e }),
        /* @__PURE__ */ t(c2, { score: 96, lang: e })
      ] }),
      /* @__PURE__ */ t("section", { className: "space-y-4", "aria-label": e === "id" ? "Dokter" : "Doctor", children: /* @__PURE__ */ t(Ge, { items: In, lang: e }) })
    ] })
  ] }) });
}
function ll({
  children: e,
  sidebar: a,
  locale: s = "en",
  onLocaleChange: r,
  className: n
}) {
  return /* @__PURE__ */ l("div", { className: h("min-h-screen bg-slate-50", n), children: [
    /* @__PURE__ */ t(cr, { locale: s, onLocaleChange: r }),
    /* @__PURE__ */ l("div", { className: "mx-auto flex max-w-7xl gap-6 px-6 py-6", children: [
      a ? /* @__PURE__ */ t("aside", { className: "hidden w-56 shrink-0 lg:block", "aria-label": "Sidebar", children: a }) : null,
      /* @__PURE__ */ t("main", { className: "min-w-0 flex-1", children: e })
    ] }),
    /* @__PURE__ */ t("footer", { className: "mx-auto max-w-7xl px-6 pb-8", children: /* @__PURE__ */ l("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ t(G2, { variant: "privacy" }),
      /* @__PURE__ */ t(G2, { variant: "encryption" })
    ] }) })
  ] });
}
function il({
  lang: e = "en",
  orientation: a = "landscape",
  initialNav: s = "dashboard"
}) {
  const [r, n] = _(s), i = {
    lang: e,
    orientation: a,
    activeNav: r,
    onNavChange: n
  };
  switch (r) {
    case "upload":
      return /* @__PURE__ */ t(un, { ...i, activeNav: "upload" });
    case "queue":
      return /* @__PURE__ */ t(gn, { ...i, activeNav: "queue" });
    case "analysis":
      return /* @__PURE__ */ t(Qe, { ...i, activeNav: "analysis" });
    case "review":
      return /* @__PURE__ */ t(Xe, { ...i, activeNav: "review" });
    case "chat":
      return /* @__PURE__ */ t(Cn, { ...i, activeNav: "chat" });
    default:
      return /* @__PURE__ */ t(dn, { ...i, activeNav: "dashboard" });
  }
}
function ol({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(Xe, { lang: e, orientation: a, activeNav: "review" });
}
function cl({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(Ln, { lang: e, orientation: a });
}
export {
  Kn as AIStatusBadge,
  Fe as AUTH_API,
  Or as AdminLogin,
  T0 as AlocareLogo,
  Wn as AlocareThemeProvider,
  tl as AuthLoginShowcase,
  $e as Avatar,
  Y as Badge,
  D as BilingualLabel,
  s0 as Button,
  O as Card,
  $ as CardContent,
  qn as CardFooter,
  u0 as CardHeader,
  Un as CardTitle,
  Ar as ChatInput,
  He as ChatMessage,
  il as ClinicWorkflowTablet,
  x0 as ClinicalSummaryCard,
  c2 as ConfidenceScore,
  cl as ConsultationTablet,
  qe as DEFAULT_DEMO_EMAIL,
  Ke as DEFAULT_DEMO_PASSWORD,
  ll as DashboardLayout,
  Jn as DoctorReviewPanel,
  ol as DoctorReviewTablet,
  tn as EMRAIVoiceConsultation,
  Kr as EMRConsultationSOAP,
  Xr as EMRLabRadOrders,
  Je as EMRLogin,
  Yr as EMRMedicationOrders,
  E0 as EMRPatientBanner,
  ln as EMRReports,
  g0 as EMRTabletShell,
  sl as EMRWorkflowTablet,
  qr as EMRWorklist,
  i0 as EMR_API,
  Zn as EmployeeHealthCard,
  $r as HRPortalLogin,
  cr as Header,
  e0 as Input,
  d2 as KeyFindingCard,
  h0 as LanguageSwitcher,
  nt as LocaleProvider,
  h2 as LoginBrand,
  Pr as LoginBrandPanel,
  u2 as LoginCard,
  We as LoginCardContent,
  Yn as LoginCardHeader,
  Ir as LoginDemoNotes,
  el as LoginDivider,
  Tr as LoginErrorAlert,
  p2 as LoginFooter,
  b2 as LoginForm,
  Xn as LoginGoogleButton,
  m2 as LoginLayout,
  Qn as LoginMenuBar,
  Rr as LoginPasswordField,
  nl as MedicalReportAnalysis,
  mr as OCRStatusCard,
  Er as PortalLogin,
  Ie as Progress,
  Ge as RecommendationList,
  vr as RiskIndicator,
  n2 as Spinner,
  G2 as SystemHealthBadge,
  Qe as TabletAnalysisView,
  Cn as TabletChat,
  dn as TabletDashboard,
  Xe as TabletDoctorReview,
  al as TabletNav,
  bn as TabletPatientDetail,
  gn as TabletPatientQueue,
  r0 as TabletShell,
  Ln as TabletTelemedicine,
  un as TabletUploadFlow,
  t0 as Textarea,
  P as TouchButton,
  Be as UploadDropzone,
  Ve as UploadPreview,
  I as authCopy,
  d as bilingual,
  h as cn,
  Dn as colors,
  H2 as loginShadows,
  R as loginSizing,
  Hn as motion,
  Bn as radius,
  Vn as shadows,
  On as spacing,
  f as t,
  rl as tabletViewports,
  $n as typography,
  Fn as useLocale,
  Gn as zIndex
};
