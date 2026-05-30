import { jsx as t, jsxs as o, Fragment as Ue } from "react/jsx-runtime";
import * as I from "react";
import Yt, { createContext as $a, useState as D, useMemo as en, useContext as tn, forwardRef as de, createElement as qe, useRef as an, useCallback as nn } from "react";
import "react-dom";
const Ql = {
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
}, Sl = {
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
}, Fl = {
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
}, Rl = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  full: "9999px"
}, Ol = {
  card: "0 1px 3px 0 rgb(15 23 42 / 0.06), 0 1px 2px -1px rgb(15 23 42 / 0.06)",
  floating: "0 10px 40px -12px rgb(15 23 42 / 0.18), 0 4px 16px -4px rgb(15 23 42 / 0.08)",
  modal: "0 25px 50px -12px rgb(15 23 42 / 0.25)",
  focus: "0 0 0 3px rgb(37 99 235 / 0.35)"
}, Kl = {
  base: 0,
  dropdown: 1e3,
  sticky: 1100,
  overlay: 1200,
  modal: 1300,
  popover: 1400,
  tooltip: 1500
}, zl = {
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
const Ut = $a(null);
function sn({
  children: e,
  defaultLocale: a = "en"
}) {
  const [n, s] = D(a), r = en(
    () => ({
      locale: n,
      setLocale: s,
      t: (l) => f(l, n)
    }),
    [n]
  );
  return /* @__PURE__ */ t(Ut.Provider, { value: r, children: e });
}
function Tl() {
  const e = tn(Ut);
  return e || {
    locale: "en",
    setLocale: () => {
    },
    t: (a) => f(a, "en")
  };
}
function Hl({
  children: e,
  defaultLocale: a = "en"
}) {
  return /* @__PURE__ */ t(sn, { defaultLocale: a, children: e });
}
function qt(e) {
  var a, n, s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (a = 0; a < r; a++) e[a] && (n = qt(e[a])) && (s && (s += " "), s += n);
  } else for (n in e) e[n] && (s && (s += " "), s += n);
  return s;
}
function Jt() {
  for (var e, a, n = 0, s = "", r = arguments.length; n < r; n++) (e = arguments[n]) && (a = qt(e)) && (s && (s += " "), s += a);
  return s;
}
const rn = (e, a) => {
  const n = new Array(e.length + a.length);
  for (let s = 0; s < e.length; s++)
    n[s] = e[s];
  for (let s = 0; s < a.length; s++)
    n[e.length + s] = a[s];
  return n;
}, on = (e, a) => ({
  classGroupId: e,
  validator: a
}), Zt = (e = /* @__PURE__ */ new Map(), a = null, n) => ({
  nextPart: e,
  validators: a,
  classGroupId: n
}), Pe = "-", Ct = [], ln = "arbitrary..", cn = (e) => {
  const a = mn(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (c) => {
      if (c.startsWith("[") && c.endsWith("]"))
        return dn(c);
      const i = c.split(Pe), m = i[0] === "" && i.length > 1 ? 1 : 0;
      return _t(i, m, a);
    },
    getConflictingClassGroupIds: (c, i) => {
      if (i) {
        const m = s[c], u = n[c];
        return m ? u ? rn(u, m) : m : u || Ct;
      }
      return n[c] || Ct;
    }
  };
}, _t = (e, a, n) => {
  if (e.length - a === 0)
    return n.classGroupId;
  const r = e[a], l = n.nextPart.get(r);
  if (l) {
    const u = _t(e, a + 1, l);
    if (u) return u;
  }
  const c = n.validators;
  if (c === null)
    return;
  const i = a === 0 ? e.join(Pe) : e.slice(a).join(Pe), m = c.length;
  for (let u = 0; u < m; u++) {
    const p = c[u];
    if (p.validator(i))
      return p.classGroupId;
  }
}, dn = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const a = e.slice(1, -1), n = a.indexOf(":"), s = a.slice(0, n);
  return s ? ln + s : void 0;
})(), mn = (e) => {
  const {
    theme: a,
    classGroups: n
  } = e;
  return un(n, a);
}, un = (e, a) => {
  const n = Zt();
  for (const s in e) {
    const r = e[s];
    $e(r, n, s, a);
  }
  return n;
}, $e = (e, a, n, s) => {
  const r = e.length;
  for (let l = 0; l < r; l++) {
    const c = e[l];
    hn(c, a, n, s);
  }
}, hn = (e, a, n, s) => {
  if (typeof e == "string") {
    pn(e, a, n);
    return;
  }
  if (typeof e == "function") {
    gn(e, a, n, s);
    return;
  }
  fn(e, a, n, s);
}, pn = (e, a, n) => {
  const s = e === "" ? a : $t(a, e);
  s.classGroupId = n;
}, gn = (e, a, n, s) => {
  if (An(e)) {
    $e(e(s), a, n, s);
    return;
  }
  a.validators === null && (a.validators = []), a.validators.push(on(n, e));
}, fn = (e, a, n, s) => {
  const r = Object.entries(e), l = r.length;
  for (let c = 0; c < l; c++) {
    const [i, m] = r[c];
    $e(m, $t(a, i), n, s);
  }
}, $t = (e, a) => {
  let n = e;
  const s = a.split(Pe), r = s.length;
  for (let l = 0; l < r; l++) {
    const c = s[l];
    let i = n.nextPart.get(c);
    i || (i = Zt(), n.nextPart.set(c, i)), n = i;
  }
  return n;
}, An = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, bn = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let a = 0, n = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const r = (l, c) => {
    n[l] = c, a++, a > e && (a = 0, s = n, n = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(l) {
      let c = n[l];
      if (c !== void 0)
        return c;
      if ((c = s[l]) !== void 0)
        return r(l, c), c;
    },
    set(l, c) {
      l in n ? n[l] = c : r(l, c);
    }
  };
}, Je = "!", Bt = ":", xn = [], Et = (e, a, n, s, r) => ({
  modifiers: e,
  hasImportantModifier: a,
  baseClassName: n,
  maybePostfixModifierPosition: s,
  isExternal: r
}), vn = (e) => {
  const {
    prefix: a,
    experimentalParseClassName: n
  } = e;
  let s = (r) => {
    const l = [];
    let c = 0, i = 0, m = 0, u;
    const p = r.length;
    for (let N = 0; N < p; N++) {
      const B = r[N];
      if (c === 0 && i === 0) {
        if (B === Bt) {
          l.push(r.slice(m, N)), m = N + 1;
          continue;
        }
        if (B === "/") {
          u = N;
          continue;
        }
      }
      B === "[" ? c++ : B === "]" ? c-- : B === "(" ? i++ : B === ")" && i--;
    }
    const g = l.length === 0 ? r : r.slice(m);
    let y = g, v = !1;
    g.endsWith(Je) ? (y = g.slice(0, -1), v = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      g.startsWith(Je) && (y = g.slice(1), v = !0)
    );
    const C = u && u > m ? u - m : void 0;
    return Et(l, v, y, C);
  };
  if (a) {
    const r = a + Bt, l = s;
    s = (c) => c.startsWith(r) ? l(c.slice(r.length)) : Et(xn, !1, c, void 0, !0);
  }
  if (n) {
    const r = s;
    s = (l) => n({
      className: l,
      parseClassName: r
    });
  }
  return s;
}, yn = (e) => {
  const a = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((n, s) => {
    a.set(n, 1e6 + s);
  }), (n) => {
    const s = [];
    let r = [];
    for (let l = 0; l < n.length; l++) {
      const c = n[l], i = c[0] === "[", m = a.has(c);
      i || m ? (r.length > 0 && (r.sort(), s.push(...r), r = []), s.push(c)) : r.push(c);
    }
    return r.length > 0 && (r.sort(), s.push(...r)), s;
  };
}, wn = (e) => ({
  cache: bn(e.cacheSize),
  parseClassName: vn(e),
  sortModifiers: yn(e),
  postfixLookupClassGroupIds: kn(e),
  ...cn(e)
}), kn = (e) => {
  const a = /* @__PURE__ */ Object.create(null), n = e.postfixLookupClassGroups;
  if (n)
    for (let s = 0; s < n.length; s++)
      a[n[s]] = !0;
  return a;
}, Nn = /\s+/, Cn = (e, a) => {
  const {
    parseClassName: n,
    getClassGroupId: s,
    getConflictingClassGroupIds: r,
    sortModifiers: l,
    postfixLookupClassGroupIds: c
  } = a, i = [], m = e.trim().split(Nn);
  let u = "";
  for (let p = m.length - 1; p >= 0; p -= 1) {
    const g = m[p], {
      isExternal: y,
      modifiers: v,
      hasImportantModifier: C,
      baseClassName: N,
      maybePostfixModifierPosition: B
    } = n(g);
    if (y) {
      u = g + (u.length > 0 ? " " + u : u);
      continue;
    }
    let P = !!B, j;
    if (P) {
      const V = N.substring(0, B);
      j = s(V);
      const b = j && c[j] ? s(N) : void 0;
      b && b !== j && (j = b, P = !1);
    } else
      j = s(N);
    if (!j) {
      if (!P) {
        u = g + (u.length > 0 ? " " + u : u);
        continue;
      }
      if (j = s(N), !j) {
        u = g + (u.length > 0 ? " " + u : u);
        continue;
      }
      P = !1;
    }
    const T = v.length === 0 ? "" : v.length === 1 ? v[0] : l(v).join(":"), W = C ? T + Je : T, Y = W + j;
    if (i.indexOf(Y) > -1)
      continue;
    i.push(Y);
    const Z = r(j, P);
    for (let V = 0; V < Z.length; ++V) {
      const b = Z[V];
      i.push(W + b);
    }
    u = g + (u.length > 0 ? " " + u : u);
  }
  return u;
}, Bn = (...e) => {
  let a = 0, n, s, r = "";
  for (; a < e.length; )
    (n = e[a++]) && (s = ea(n)) && (r && (r += " "), r += s);
  return r;
}, ea = (e) => {
  if (typeof e == "string")
    return e;
  let a, n = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (a = ea(e[s])) && (n && (n += " "), n += a);
  return n;
}, En = (e, ...a) => {
  let n, s, r, l;
  const c = (m) => {
    const u = a.reduce((p, g) => g(p), e());
    return n = wn(u), s = n.cache.get, r = n.cache.set, l = i, i(m);
  }, i = (m) => {
    const u = s(m);
    if (u)
      return u;
    const p = Cn(m, n);
    return r(m, p), p;
  };
  return l = c, (...m) => l(Bn(...m));
}, In = [], Q = (e) => {
  const a = (n) => n[e] || In;
  return a.isThemeGetter = !0, a;
}, ta = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, aa = /^\((?:(\w[\w-]*):)?(.+)\)$/i, Pn = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/, Mn = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Dn = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, Gn = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, jn = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ln = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, _ = (e) => Pn.test(e), E = (e) => !!e && !Number.isNaN(Number(e)), U = (e) => !!e && Number.isInteger(Number(e)), ze = (e) => e.endsWith("%") && E(e.slice(0, -1)), q = (e) => Mn.test(e), na = () => !0, Qn = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Dn.test(e) && !Gn.test(e)
), et = () => !1, Sn = (e) => jn.test(e), Fn = (e) => Ln.test(e), Rn = (e) => !A(e) && !x(e), On = (e) => e.startsWith("@container") && (e[10] === "/" && e[11] !== void 0 || e[11] === "s" && e[16] !== void 0 && e.startsWith("-size/", 10) || e[11] === "n" && e[18] !== void 0 && e.startsWith("-normal/", 10)), Kn = (e) => ae(e, oa, et), A = (e) => ta.test(e), oe = (e) => ae(e, la, Qn), It = (e) => ae(e, Un, E), zn = (e) => ae(e, ca, na), Tn = (e) => ae(e, ia, et), Pt = (e) => ae(e, sa, et), Hn = (e) => ae(e, ra, Fn), Ne = (e) => ae(e, da, Sn), x = (e) => aa.test(e), pe = (e) => ie(e, la), Vn = (e) => ie(e, ia), Mt = (e) => ie(e, sa), Xn = (e) => ie(e, oa), Wn = (e) => ie(e, ra), Ce = (e) => ie(e, da, !0), Yn = (e) => ie(e, ca, !0), ae = (e, a, n) => {
  const s = ta.exec(e);
  return s ? s[1] ? a(s[1]) : n(s[2]) : !1;
}, ie = (e, a, n = !1) => {
  const s = aa.exec(e);
  return s ? s[1] ? a(s[1]) : n : !1;
}, sa = (e) => e === "position" || e === "percentage", ra = (e) => e === "image" || e === "url", oa = (e) => e === "length" || e === "size" || e === "bg-size", la = (e) => e === "length", Un = (e) => e === "number", ia = (e) => e === "family-name", ca = (e) => e === "number" || e === "weight", da = (e) => e === "shadow", qn = () => {
  const e = Q("color"), a = Q("font"), n = Q("text"), s = Q("font-weight"), r = Q("tracking"), l = Q("leading"), c = Q("breakpoint"), i = Q("container"), m = Q("spacing"), u = Q("radius"), p = Q("shadow"), g = Q("inset-shadow"), y = Q("text-shadow"), v = Q("drop-shadow"), C = Q("blur"), N = Q("perspective"), B = Q("aspect"), P = Q("ease"), j = Q("animate"), T = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], W = () => [
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
  ], Y = () => [...W(), x, A], Z = () => ["auto", "hidden", "clip", "visible", "scroll"], V = () => ["auto", "contain", "none"], b = () => [x, A, m], H = () => [_, "full", "auto", ...b()], At = () => [U, "none", "subgrid", x, A], bt = () => ["auto", {
    span: ["full", U, x, A]
  }, U, x, A], xe = () => [U, "auto", x, A], xt = () => ["auto", "min", "max", "fr", x, A], Se = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], ce = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], X = () => ["auto", ...b()], re = () => [_, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...b()], Fe = () => [_, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...b()], Re = () => [_, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...b()], w = () => [e, x, A], vt = () => [...W(), Mt, Pt, {
    position: [x, A]
  }], yt = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], wt = () => ["auto", "cover", "contain", Xn, Kn, {
    size: [x, A]
  }], Oe = () => [ze, pe, oe], K = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    x,
    A
  ], z = () => ["", E, pe, oe], ve = () => ["solid", "dashed", "dotted", "double"], kt = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], S = () => [E, ze, Mt, Pt], Nt = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    C,
    x,
    A
  ], ye = () => ["none", E, x, A], we = () => ["none", E, x, A], Ke = () => [E, x, A], ke = () => [_, "full", ...b()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [q],
      breakpoint: [q],
      color: [na],
      container: [q],
      "drop-shadow": [q],
      ease: ["in", "out", "in-out"],
      font: [Rn],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [q],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [q],
      shadow: [q],
      spacing: ["px", E],
      text: [q],
      "text-shadow": [q],
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
        aspect: ["auto", "square", _, A, x, B]
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
        "@container": ["", "normal", "size", x, A]
      }],
      /**
       * Container Name
       * @see https://tailwindcss.com/docs/responsive-design#named-containers
       */
      "container-named": [On],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [E, A, x, i]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": T()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": T()
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
        object: Y()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: Z()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": Z()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": Z()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: V()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": V()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": V()
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
        z: [U, "auto", x, A]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [_, "full", "auto", i, ...b()]
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
        flex: [E, _, "auto", "initial", "none", A]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", E, x, A]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", E, x, A]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [U, "first", "last", "none", x, A]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": At()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: bt()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": xe()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": xe()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": At()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: bt()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": xe()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": xe()
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
        "auto-cols": xt()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": xt()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: b()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": b()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": b()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...Se(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...ce(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...ce()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...Se()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...ce(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...ce(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": Se()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...ce(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...ce()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: b()
      }],
      /**
       * Padding Inline
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: b()
      }],
      /**
       * Padding Block
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: b()
      }],
      /**
       * Padding Inline Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: b()
      }],
      /**
       * Padding Inline End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: b()
      }],
      /**
       * Padding Block Start
       * @see https://tailwindcss.com/docs/padding
       */
      pbs: [{
        pbs: b()
      }],
      /**
       * Padding Block End
       * @see https://tailwindcss.com/docs/padding
       */
      pbe: [{
        pbe: b()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: b()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: b()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: b()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: b()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: X()
      }],
      /**
       * Margin Inline
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: X()
      }],
      /**
       * Margin Block
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: X()
      }],
      /**
       * Margin Inline Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: X()
      }],
      /**
       * Margin Inline End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: X()
      }],
      /**
       * Margin Block Start
       * @see https://tailwindcss.com/docs/margin
       */
      mbs: [{
        mbs: X()
      }],
      /**
       * Margin Block End
       * @see https://tailwindcss.com/docs/margin
       */
      mbe: [{
        mbe: X()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: X()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: X()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: X()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: X()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": b()
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
        "space-y": b()
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
        size: re()
      }],
      /**
       * Inline Size
       * @see https://tailwindcss.com/docs/width
       */
      "inline-size": [{
        inline: ["auto", ...Fe()]
      }],
      /**
       * Min-Inline Size
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-inline-size": [{
        "min-inline": ["auto", ...Fe()]
      }],
      /**
       * Max-Inline Size
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-inline-size": [{
        "max-inline": ["none", ...Fe()]
      }],
      /**
       * Block Size
       * @see https://tailwindcss.com/docs/height
       */
      "block-size": [{
        block: ["auto", ...Re()]
      }],
      /**
       * Min-Block Size
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-block-size": [{
        "min-block": ["auto", ...Re()]
      }],
      /**
       * Max-Block Size
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-block-size": [{
        "max-block": ["none", ...Re()]
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [i, "screen", ...re()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          i,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...re()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          i,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [c]
          },
          ...re()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...re()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...re()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...re()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", n, pe, oe]
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
        font: [s, Yn, zn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", ze, A]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Vn, Tn, a]
      }],
      /**
       * Font Feature Settings
       * @see https://tailwindcss.com/docs/font-feature-settings
       */
      "font-features": [{
        "font-features": [A]
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
        tracking: [r, x, A]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [E, "none", x, It]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          l,
          ...b()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", x, A]
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
        list: ["disc", "decimal", "none", x, A]
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
        placeholder: w()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: w()
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
        decoration: [...ve(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [E, "from-font", "auto", x, oe]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: w()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [E, "auto", x, A]
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
        indent: b()
      }],
      /**
       * Tab Size
       * @see https://tailwindcss.com/docs/tab-size
       */
      "tab-size": [{
        tab: [U, x, A]
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", x, A]
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
        content: ["none", x, A]
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
        bg: vt()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: yt()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: wt()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, U, x, A],
          radial: ["", x, A],
          conic: [U, x, A]
        }, Wn, Hn]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: w()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: Oe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: Oe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: Oe()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: w()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: w()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: w()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: K()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": K()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": K()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": K()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": K()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": K()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": K()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": K()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": K()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": K()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": K()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": K()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": K()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": K()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": K()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: z()
      }],
      /**
       * Border Width Inline
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": z()
      }],
      /**
       * Border Width Block
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": z()
      }],
      /**
       * Border Width Inline Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": z()
      }],
      /**
       * Border Width Inline End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": z()
      }],
      /**
       * Border Width Block Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-bs": [{
        "border-bs": z()
      }],
      /**
       * Border Width Block End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-be": [{
        "border-be": z()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": z()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": z()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": z()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": z()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": z()
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
        "divide-y": z()
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
        border: [...ve(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...ve(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: w()
      }],
      /**
       * Border Color Inline
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": w()
      }],
      /**
       * Border Color Block
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": w()
      }],
      /**
       * Border Color Inline Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": w()
      }],
      /**
       * Border Color Inline End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": w()
      }],
      /**
       * Border Color Block Start
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-bs": [{
        "border-bs": w()
      }],
      /**
       * Border Color Block End
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-be": [{
        "border-be": w()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": w()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": w()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": w()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": w()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: w()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...ve(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [E, x, A]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", E, pe, oe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: w()
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
          p,
          Ce,
          Ne
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: w()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", g, Ce, Ne]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": w()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: z()
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
        ring: w()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [E, oe]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": w()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": z()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": w()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", y, Ce, Ne]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": w()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [E, x, A]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...kt(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": kt()
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
        "mask-linear-from": S()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": S()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": w()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": w()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": S()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": S()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": w()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": w()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": S()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": S()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": w()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": w()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": S()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": S()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": w()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": w()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": S()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": S()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": w()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": w()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": S()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": S()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": w()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": w()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": S()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": S()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": w()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": w()
      }],
      "mask-image-radial": [{
        "mask-radial": [x, A]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": S()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": S()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": w()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": w()
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
        "mask-radial-at": W()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [E]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": S()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": S()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": w()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": w()
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
        mask: vt()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: yt()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: wt()
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
        mask: ["none", x, A]
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
          x,
          A
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: Nt()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [E, x, A]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [E, x, A]
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
          v,
          Ce,
          Ne
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": w()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", E, x, A]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [E, x, A]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", E, x, A]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [E, x, A]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", E, x, A]
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
          x,
          A
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": Nt()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [E, x, A]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [E, x, A]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", E, x, A]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [E, x, A]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", E, x, A]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [E, x, A]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [E, x, A]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", E, x, A]
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
        "border-spacing": b()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": b()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": b()
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", x, A]
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
        duration: [E, "initial", x, A]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", P, x, A]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [E, x, A]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", j, x, A]
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
        perspective: [N, x, A]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": Y()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: ye()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": ye()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": ye()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": ye()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: we()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": we()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": we()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": we()
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
        skew: Ke()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": Ke()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": Ke()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [x, A, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: Y()
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
        translate: ke()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": ke()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": ke()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": ke()
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
        zoom: [U, x, A]
      }],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: w()
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
        caret: w()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", x, A]
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
        "scrollbar-thumb": w()
      }],
      /**
       * Scrollbar Track Color
       * @see https://tailwindcss.com/docs/scrollbar-color
       */
      "scrollbar-track-color": [{
        "scrollbar-track": w()
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
        "scroll-m": b()
      }],
      /**
       * Scroll Margin Inline
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": b()
      }],
      /**
       * Scroll Margin Block
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": b()
      }],
      /**
       * Scroll Margin Inline Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": b()
      }],
      /**
       * Scroll Margin Inline End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": b()
      }],
      /**
       * Scroll Margin Block Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbs": [{
        "scroll-mbs": b()
      }],
      /**
       * Scroll Margin Block End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mbe": [{
        "scroll-mbe": b()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": b()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": b()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": b()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": b()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": b()
      }],
      /**
       * Scroll Padding Inline
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": b()
      }],
      /**
       * Scroll Padding Block
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": b()
      }],
      /**
       * Scroll Padding Inline Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": b()
      }],
      /**
       * Scroll Padding Inline End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": b()
      }],
      /**
       * Scroll Padding Block Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbs": [{
        "scroll-pbs": b()
      }],
      /**
       * Scroll Padding Block End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pbe": [{
        "scroll-pbe": b()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": b()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": b()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": b()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": b()
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
        "will-change": ["auto", "scroll", "contents", "transform", x, A]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...w()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [E, pe, oe, It]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...w()]
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
}, Jn = /* @__PURE__ */ En(qn);
function h(...e) {
  return Jn(Jt(e));
}
function F({
  label: e,
  secondaryLabel: a,
  lang: n = "en",
  className: s,
  secondaryClassName: r,
  as: l = "span"
}) {
  const c = f(e, n), i = a ? f(a, n === "en" ? "id" : "en") : null;
  return /* @__PURE__ */ o("span", { className: h("block", s), children: [
    /* @__PURE__ */ t(l, { className: "font-semibold text-slate-900", children: c }),
    i ? /* @__PURE__ */ t(
      "span",
      {
        className: h(
          "mt-0.5 block text-sm font-medium text-blue-600",
          r
        ),
        children: i
      }
    ) : null
  ] });
}
const Dt = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, Gt = Jt, ma = (e, a) => (n) => {
  var s;
  if ((a == null ? void 0 : a.variants) == null) return Gt(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: r, defaultVariants: l } = a, c = Object.keys(r).map((u) => {
    const p = n == null ? void 0 : n[u], g = l == null ? void 0 : l[u];
    if (p === null) return null;
    const y = Dt(p) || Dt(g);
    return r[u][y];
  }), i = n && Object.entries(n).reduce((u, p) => {
    let [g, y] = p;
    return y === void 0 || (u[g] = y), u;
  }, {}), m = a == null || (s = a.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((u, p) => {
    let { class: g, className: y, ...v } = p;
    return Object.entries(v).every((C) => {
      let [N, B] = C;
      return Array.isArray(B) ? B.includes({
        ...l,
        ...i
      }[N]) : {
        ...l,
        ...i
      }[N] === B;
    }) ? [
      ...u,
      g,
      y
    ] : u;
  }, []);
  return Gt(e, c, m, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zn = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), _n = (e) => e.replace(
  /^([A-Z])|[\s-_]+(\w)/g,
  (a, n, s) => s ? s.toUpperCase() : n.toLowerCase()
), jt = (e) => {
  const a = _n(e);
  return a.charAt(0).toUpperCase() + a.slice(1);
}, ua = (...e) => e.filter((a, n, s) => !!a && a.trim() !== "" && s.indexOf(a) === n).join(" ").trim(), $n = (e) => {
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
var es = {
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
const ts = de(
  ({
    color: e = "currentColor",
    size: a = 24,
    strokeWidth: n = 2,
    absoluteStrokeWidth: s,
    className: r = "",
    children: l,
    iconNode: c,
    ...i
  }, m) => qe(
    "svg",
    {
      ref: m,
      ...es,
      width: a,
      height: a,
      stroke: e,
      strokeWidth: s ? Number(n) * 24 / Number(a) : n,
      className: ua("lucide", r),
      ...!l && !$n(i) && { "aria-hidden": "true" },
      ...i
    },
    [
      ...c.map(([u, p]) => qe(u, p)),
      ...Array.isArray(l) ? l : [l]
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
  const n = de(
    ({ className: s, ...r }, l) => qe(ts, {
      ref: l,
      iconNode: a,
      className: ua(
        `lucide-${Zn(jt(e))}`,
        `lucide-${e}`,
        s
      ),
      ...r
    })
  );
  return n.displayName = jt(e), n;
};
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const as = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
], ha = k("activity", as);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ns = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ]
], pa = k("bell", ns);
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
], rs = k("brain", ss);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const os = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
], ls = k("building-2", os);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const is = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
], ga = k("calendar", is);
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
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
], ds = k("camera", cs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ms = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], tt = k("check", ms);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const us = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
], hs = k("circle-alert", us);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ps = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], gs = k("circle-check", ps);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fs = [
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
], fa = k("clipboard-list", fs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const As = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
], bs = k("clock", As);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xs = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193", key: "yfwify" }],
  [
    "path",
    { d: "M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07", key: "jlfiyv" }
  ]
], vs = k("cloud-off", xs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ys = [
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
], ws = k("eye-off", ys);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ks = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], Ns = k("eye", ks);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cs = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M10 9H8", key: "b1mrlr" }],
  ["path", { d: "M16 13H8", key: "t4e002" }],
  ["path", { d: "M16 17H8", key: "z1uh3a" }]
], me = k("file-text", Cs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bs = [
  ["path", { d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z", key: "1rqfz7" }],
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }],
  ["path", { d: "m15 15-3-3-3 3", key: "15xj92" }]
], Es = k("file-up", Bs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Is = [
  [
    "path",
    {
      d: "M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2",
      key: "18mbvz"
    }
  ],
  ["path", { d: "M6.453 15h11.094", key: "3shlmq" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }]
], Aa = k("flask-conical", Is);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ps = [
  [
    "path",
    {
      d: "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",
      key: "c3ymky"
    }
  ]
], Ms = k("heart", Ps);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ds = [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M12 7v5l4 2", key: "1fdv2h" }]
], Gs = k("history", Ds);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const js = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
], Ls = k("image", js);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Qs = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 16v-4", key: "1dtifu" }],
  ["path", { d: "M12 8h.01", key: "e9boi3" }]
], Ss = k("info", Qs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fs = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
], Rs = k("layout-dashboard", Fs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Os = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], ba = k("loader-circle", Os);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ks = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
], xa = k("lock", Ks);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zs = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
], va = k("log-out", zs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ts = [
  ["path", { d: "M7.9 20A9 9 0 1 0 4 16.1L2 22Z", key: "vv11sd" }]
], ya = k("message-circle", Ts);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hs = [
  ["path", { d: "M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z", key: "131961" }],
  ["path", { d: "M19 10v2a7 7 0 0 1-14 0v-2", key: "1vc78b" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }]
], Le = k("mic", Hs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vs = [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
], wa = k("pen-line", Vs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xs = [
  ["circle", { cx: "12", cy: "5", r: "1", key: "gxeob9" }],
  ["path", { d: "m9 20 3-6 3 6", key: "se2kox" }],
  ["path", { d: "m6 8 6 2 6-2", key: "4o3us4" }],
  ["path", { d: "M12 10v4", key: "1kjpxc" }]
], Ws = k("person-standing", Xs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ys = [
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
], Us = k("phone-off", Ys);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const qs = [
  [
    "path",
    { d: "m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z", key: "wa1lgi" }
  ],
  ["path", { d: "m8.5 8.5 7 7", key: "rvfmvr" }]
], ka = k("pill", qs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Js = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
], Na = k("plus", Js);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zs = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
], _s = k("refresh-cw", Zs);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $s = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M7 12h10", key: "b7w52i" }]
], er = k("scan-line", $s);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const tr = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
], ar = k("search", tr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nr = [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
], sr = k("send", nr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const rr = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
], or = k("settings", rr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const lr = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
], ir = k("shield-check", lr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cr = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
], at = k("shield", cr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dr = [
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
], Ca = k("sparkles", dr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mr = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
], ur = k("square", mr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = [
  ["path", { d: "M11 2v2", key: "1539x4" }],
  ["path", { d: "M5 2v2", key: "1yf1q8" }],
  ["path", { d: "M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1", key: "rb5t3r" }],
  ["path", { d: "M8 15a6 6 0 0 0 12 0v-3", key: "x18d4x" }],
  ["circle", { cx: "20", cy: "10", r: "2", key: "ts1r5v" }]
], nt = k("stethoscope", hr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
], gr = k("trending-up", pr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
], Ze = k("triangle-alert", fr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ar = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
], st = k("upload", Ar);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const br = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
], Me = k("users", br);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xr = [
  [
    "path",
    { d: "M10.66 6H14a2 2 0 0 1 2 2v2.5l5.248-3.062A.5.5 0 0 1 22 7.87v8.196", key: "w8jjjt" }
  ],
  ["path", { d: "M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2", key: "1xawa7" }],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
], vr = k("video-off", xr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yr = [
  [
    "path",
    {
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
], Ba = k("video", yr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wr = [
  ["path", { d: "M12 20h.01", key: "zekei9" }],
  ["path", { d: "M2 8.82a15 15 0 0 1 20 0", key: "dnpr2z" }],
  ["path", { d: "M5 12.859a10 10 0 0 1 14 0", key: "1x1e6c" }],
  ["path", { d: "M8.5 16.429a5 5 0 0 1 7 0", key: "1bycff" }]
], kr = k("wifi", wr);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nr = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Cr = k("x", Nr), Br = { sm: "h-4 w-4", md: "h-6 w-6", lg: "h-8 w-8" };
function rt({ size: e = "md", className: a, label: n = "Loading" }) {
  return /* @__PURE__ */ t(
    ba,
    {
      className: h("animate-spin text-blue-600", Br[e], a),
      "aria-label": n,
      role: "status"
    }
  );
}
const Er = ma(
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
), ne = de(
  ({
    className: e,
    variant: a,
    size: n,
    fullWidth: s,
    loading: r,
    leftIcon: l,
    rightIcon: c,
    children: i,
    disabled: m,
    ...u
  }, p) => /* @__PURE__ */ o(
    "button",
    {
      ref: p,
      className: h(Er({ variant: a, size: n, fullWidth: s }), e),
      disabled: m || r,
      ...u,
      children: [
        r ? /* @__PURE__ */ t(rt, { size: "sm", className: "text-current" }) : l,
        i,
        !r && c
      ]
    }
  )
);
ne.displayName = "Button";
const Ir = ma(
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
function J({ className: e, variant: a, ...n }) {
  return /* @__PURE__ */ t("span", { className: h(Ir({ variant: a }), e), ...n });
}
function R({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "rounded-xl border border-slate-200 bg-white shadow-[var(--shadow-card)]",
        e
      ),
      ...n,
      children: a
    }
  );
}
function ue({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ t("div", { className: h("flex items-start gap-3 border-b border-slate-100 px-5 py-4", e), ...n, children: a });
}
function Vl({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ t(
    "h3",
    {
      className: h("font-heading text-base font-semibold text-slate-900", e),
      ...n,
      children: a
    }
  );
}
function O({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ t("div", { className: h("px-5 py-4", e), ...n, children: a });
}
function Xl({
  className: e,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ t("div", { className: h("border-t border-slate-100 px-5 py-4", e), ...n, children: a });
}
const ee = de(
  ({ className: e, label: a, helperText: n, errorText: s, lang: r = "en", labelClassName: l, id: c, ...i }, m) => {
    const u = c ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), p = !!s;
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t(
        "label",
        {
          htmlFor: u,
          className: h("text-sm font-medium text-slate-700", l),
          children: f(a, r)
        }
      ) : null,
      /* @__PURE__ */ t(
        "input",
        {
          ref: m,
          id: u,
          className: h(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            p ? "border-red-300 focus-visible:ring-red-500" : "border-slate-200",
            e
          ),
          "aria-invalid": p,
          "aria-describedby": n || s ? `${u}-desc` : void 0,
          ...i
        }
      ),
      (n || s) && /* @__PURE__ */ t(
        "p",
        {
          id: `${u}-desc`,
          className: h(
            "text-xs",
            p ? "text-red-600" : "text-slate-500"
          ),
          children: f(s ?? n ?? "", r)
        }
      )
    ] });
  }
);
ee.displayName = "Input";
const te = de(
  ({ className: e, label: a, helperText: n, errorText: s, lang: r = "en", id: l, rows: c = 4, ...i }, m) => {
    const u = l ?? (typeof a == "string" ? a : a == null ? void 0 : a.en), p = !!s;
    return /* @__PURE__ */ o("div", { className: "flex flex-col gap-1.5", children: [
      a ? /* @__PURE__ */ t("label", { htmlFor: u, className: "text-sm font-medium text-slate-700", children: f(a, r) }) : null,
      /* @__PURE__ */ t(
        "textarea",
        {
          ref: m,
          id: u,
          rows: c,
          className: h(
            "w-full resize-y rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-1",
            p ? "border-red-300" : "border-slate-200",
            e
          ),
          "aria-invalid": p,
          ...i
        }
      ),
      (n || s) && /* @__PURE__ */ t("p", { className: h("text-xs", p ? "text-red-600" : "text-slate-500"), children: f(s ?? n ?? "", r) })
    ] });
  }
);
te.displayName = "Textarea";
function Ea(e, a = []) {
  let n = [];
  function s(l, c) {
    const i = I.createContext(c);
    i.displayName = l + "Context";
    const m = n.length;
    n = [...n, c];
    const u = (g) => {
      var P;
      const { scope: y, children: v, ...C } = g, N = ((P = y == null ? void 0 : y[e]) == null ? void 0 : P[m]) || i, B = I.useMemo(() => C, Object.values(C));
      return /* @__PURE__ */ t(N.Provider, { value: B, children: v });
    };
    u.displayName = l + "Provider";
    function p(g, y) {
      var N;
      const v = ((N = y == null ? void 0 : y[e]) == null ? void 0 : N[m]) || i, C = I.useContext(v);
      if (C) return C;
      if (c !== void 0) return c;
      throw new Error(`\`${g}\` must be used within \`${l}\``);
    }
    return [u, p];
  }
  const r = () => {
    const l = n.map((c) => I.createContext(c));
    return function(i) {
      const m = (i == null ? void 0 : i[e]) || l;
      return I.useMemo(
        () => ({ [`__scope${e}`]: { ...i, [e]: m } }),
        [i, m]
      );
    };
  };
  return r.scopeName = e, [s, Pr(r, ...a)];
}
function Pr(...e) {
  const a = e[0];
  if (e.length === 1) return a;
  const n = () => {
    const s = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(l) {
      const c = s.reduce((i, { useScope: m, scopeName: u }) => {
        const g = m(l)[`__scope${u}`];
        return { ...i, ...g };
      }, {});
      return I.useMemo(() => ({ [`__scope${a.scopeName}`]: c }), [c]);
    };
  };
  return n.scopeName = a.scopeName, n;
}
function Lt(e, a) {
  if (typeof e == "function")
    return e(a);
  e != null && (e.current = a);
}
function Mr(...e) {
  return (a) => {
    let n = !1;
    const s = e.map((r) => {
      const l = Lt(r, a);
      return !n && typeof l == "function" && (n = !0), l;
    });
    if (n)
      return () => {
        for (let r = 0; r < s.length; r++) {
          const l = s[r];
          typeof l == "function" ? l() : Lt(e[r], null);
        }
      };
  };
}
var Dr = Symbol.for("react.lazy"), De = I[" use ".trim().toString()];
function Gr(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function Ia(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Dr && "_payload" in e && Gr(e._payload);
}
// @__NO_SIDE_EFFECTS__
function jr(e) {
  const a = /* @__PURE__ */ Lr(e), n = I.forwardRef((s, r) => {
    let { children: l, ...c } = s;
    Ia(l) && typeof De == "function" && (l = De(l._payload));
    const i = I.Children.toArray(l), m = i.find(Sr);
    if (m) {
      const u = m.props.children, p = i.map((g) => g === m ? I.Children.count(u) > 1 ? I.Children.only(null) : I.isValidElement(u) ? u.props.children : null : g);
      return /* @__PURE__ */ t(a, { ...c, ref: r, children: I.isValidElement(u) ? I.cloneElement(u, void 0, p) : null });
    }
    return /* @__PURE__ */ t(a, { ...c, ref: r, children: l });
  });
  return n.displayName = `${e}.Slot`, n;
}
// @__NO_SIDE_EFFECTS__
function Lr(e) {
  const a = I.forwardRef((n, s) => {
    let { children: r, ...l } = n;
    if (Ia(r) && typeof De == "function" && (r = De(r._payload)), I.isValidElement(r)) {
      const c = Rr(r), i = Fr(l, r.props);
      return r.type !== I.Fragment && (i.ref = s ? Mr(s, c) : c), I.cloneElement(r, i);
    }
    return I.Children.count(r) > 1 ? I.Children.only(null) : null;
  });
  return a.displayName = `${e}.SlotClone`, a;
}
var Qr = Symbol("radix.slottable");
function Sr(e) {
  return I.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Qr;
}
function Fr(e, a) {
  const n = { ...a };
  for (const s in a) {
    const r = e[s], l = a[s];
    /^on[A-Z]/.test(s) ? r && l ? n[s] = (...i) => {
      const m = l(...i);
      return r(...i), m;
    } : r && (n[s] = r) : s === "style" ? n[s] = { ...r, ...l } : s === "className" && (n[s] = [r, l].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function Rr(e) {
  var s, r;
  let a = (s = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : s.get, n = a && "isReactWarning" in a && a.isReactWarning;
  return n ? e.ref : (a = (r = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : r.get, n = a && "isReactWarning" in a && a.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var Or = [
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
], fe = Or.reduce((e, a) => {
  const n = /* @__PURE__ */ jr(`Primitive.${a}`), s = I.forwardRef((r, l) => {
    const { asChild: c, ...i } = r, m = c ? n : a;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ t(m, { ...i, ref: l });
  });
  return s.displayName = `Primitive.${a}`, { ...e, [a]: s };
}, {}), ot = "Progress", lt = 100, [Kr] = Ea(ot), [zr, Tr] = Kr(ot), Pa = I.forwardRef(
  (e, a) => {
    const {
      __scopeProgress: n,
      value: s = null,
      max: r,
      getValueLabel: l = Hr,
      ...c
    } = e;
    (r || r === 0) && !Qt(r) && console.error(Vr(`${r}`, "Progress"));
    const i = Qt(r) ? r : lt;
    s !== null && !St(s, i) && console.error(Xr(`${s}`, "Progress"));
    const m = St(s, i) ? s : null, u = Ge(m) ? l(m, i) : void 0;
    return /* @__PURE__ */ t(zr, { scope: n, value: m, max: i, children: /* @__PURE__ */ t(
      fe.div,
      {
        "aria-valuemax": i,
        "aria-valuemin": 0,
        "aria-valuenow": Ge(m) ? m : void 0,
        "aria-valuetext": u,
        role: "progressbar",
        "data-state": Ga(m, i),
        "data-value": m ?? void 0,
        "data-max": i,
        ...c,
        ref: a
      }
    ) });
  }
);
Pa.displayName = ot;
var Ma = "ProgressIndicator", Da = I.forwardRef(
  (e, a) => {
    const { __scopeProgress: n, ...s } = e, r = Tr(Ma, n);
    return /* @__PURE__ */ t(
      fe.div,
      {
        "data-state": Ga(r.value, r.max),
        "data-value": r.value ?? void 0,
        "data-max": r.max,
        ...s,
        ref: a
      }
    );
  }
);
Da.displayName = Ma;
function Hr(e, a) {
  return `${Math.round(e / a * 100)}%`;
}
function Ga(e, a) {
  return e == null ? "indeterminate" : e === a ? "complete" : "loading";
}
function Ge(e) {
  return typeof e == "number";
}
function Qt(e) {
  return Ge(e) && !isNaN(e) && e > 0;
}
function St(e, a) {
  return Ge(e) && !isNaN(e) && e <= a && e >= 0;
}
function Vr(e, a) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${a}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${lt}\`.`;
}
function Xr(e, a) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${a}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${lt} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Wr = Pa, Yr = Da;
function ja({
  value: e,
  max: a = 100,
  className: n,
  label: s = "Progress",
  showLabel: r = !1
}) {
  const l = Math.min(100, Math.max(0, e / a * 100));
  return /* @__PURE__ */ o("div", { className: h("w-full", n), children: [
    /* @__PURE__ */ t(
      Wr,
      {
        className: "relative h-2 w-full overflow-hidden rounded-full bg-slate-100",
        value: l,
        "aria-label": s,
        children: /* @__PURE__ */ t(
          Yr,
          {
            className: "h-full rounded-full bg-blue-600 transition-all duration-300",
            style: { width: `${l}%` }
          }
        )
      }
    ),
    r ? /* @__PURE__ */ o("p", { className: "mt-1 text-right text-xs text-slate-500", children: [
      Math.round(l),
      "%"
    ] }) : null
  ] });
}
function Ur(e) {
  const a = I.useRef(e);
  return I.useEffect(() => {
    a.current = e;
  }), I.useMemo(() => (...n) => {
    var s;
    return (s = a.current) == null ? void 0 : s.call(a, ...n);
  }, []);
}
var _e = globalThis != null && globalThis.document ? I.useLayoutEffect : () => {
}, Be = { exports: {} }, Te = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ft;
function qr() {
  if (Ft) return Te;
  Ft = 1;
  var e = Yt;
  function a(g, y) {
    return g === y && (g !== 0 || 1 / g === 1 / y) || g !== g && y !== y;
  }
  var n = typeof Object.is == "function" ? Object.is : a, s = e.useState, r = e.useEffect, l = e.useLayoutEffect, c = e.useDebugValue;
  function i(g, y) {
    var v = y(), C = s({ inst: { value: v, getSnapshot: y } }), N = C[0].inst, B = C[1];
    return l(
      function() {
        N.value = v, N.getSnapshot = y, m(N) && B({ inst: N });
      },
      [g, v, y]
    ), r(
      function() {
        return m(N) && B({ inst: N }), g(function() {
          m(N) && B({ inst: N });
        });
      },
      [g]
    ), c(v), v;
  }
  function m(g) {
    var y = g.getSnapshot;
    g = g.value;
    try {
      var v = y();
      return !n(g, v);
    } catch {
      return !0;
    }
  }
  function u(g, y) {
    return y();
  }
  var p = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? u : i;
  return Te.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : p, Te;
}
var He = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Rt;
function Jr() {
  return Rt || (Rt = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(v, C) {
      return v === C && (v !== 0 || 1 / v === 1 / C) || v !== v && C !== C;
    }
    function a(v, C) {
      p || r.startTransition === void 0 || (p = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var N = C();
      if (!g) {
        var B = C();
        l(N, B) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), g = !0);
      }
      B = c({
        inst: { value: N, getSnapshot: C }
      });
      var P = B[0].inst, j = B[1];
      return m(
        function() {
          P.value = N, P.getSnapshot = C, n(P) && j({ inst: P });
        },
        [v, N, C]
      ), i(
        function() {
          return n(P) && j({ inst: P }), v(function() {
            n(P) && j({ inst: P });
          });
        },
        [v]
      ), u(N), N;
    }
    function n(v) {
      var C = v.getSnapshot;
      v = v.value;
      try {
        var N = C();
        return !l(v, N);
      } catch {
        return !0;
      }
    }
    function s(v, C) {
      return C();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var r = Yt, l = typeof Object.is == "function" ? Object.is : e, c = r.useState, i = r.useEffect, m = r.useLayoutEffect, u = r.useDebugValue, p = !1, g = !1, y = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? s : a;
    He.useSyncExternalStore = r.useSyncExternalStore !== void 0 ? r.useSyncExternalStore : y, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), He;
}
var Ot;
function Zr() {
  return Ot || (Ot = 1, process.env.NODE_ENV === "production" ? Be.exports = qr() : Be.exports = Jr()), Be.exports;
}
var _r = Zr();
function $r() {
  return _r.useSyncExternalStore(
    eo,
    () => !0,
    () => !1
  );
}
function eo() {
  return () => {
  };
}
var it = "Avatar", [to] = Ea(it), [ao, La] = to(it), Qa = I.forwardRef(
  (e, a) => {
    const { __scopeAvatar: n, ...s } = e, [r, l] = I.useState("idle");
    return /* @__PURE__ */ t(
      ao,
      {
        scope: n,
        imageLoadingStatus: r,
        onImageLoadingStatusChange: l,
        children: /* @__PURE__ */ t(fe.span, { ...s, ref: a })
      }
    );
  }
);
Qa.displayName = it;
var Sa = "AvatarImage", Fa = I.forwardRef(
  (e, a) => {
    const { __scopeAvatar: n, src: s, onLoadingStatusChange: r = () => {
    }, ...l } = e, c = La(Sa, n), i = no(s, l), m = Ur((u) => {
      r(u), c.onImageLoadingStatusChange(u);
    });
    return _e(() => {
      i !== "idle" && m(i);
    }, [i, m]), i === "loaded" ? /* @__PURE__ */ t(fe.img, { ...l, ref: a, src: s }) : null;
  }
);
Fa.displayName = Sa;
var Ra = "AvatarFallback", Oa = I.forwardRef(
  (e, a) => {
    const { __scopeAvatar: n, delayMs: s, ...r } = e, l = La(Ra, n), [c, i] = I.useState(s === void 0);
    return I.useEffect(() => {
      if (s !== void 0) {
        const m = window.setTimeout(() => i(!0), s);
        return () => window.clearTimeout(m);
      }
    }, [s]), c && l.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ t(fe.span, { ...r, ref: a }) : null;
  }
);
Oa.displayName = Ra;
function Kt(e, a) {
  return e ? a ? (e.src !== a && (e.src = a), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function no(e, { referrerPolicy: a, crossOrigin: n }) {
  const s = $r(), r = I.useRef(null), l = s ? (r.current || (r.current = new window.Image()), r.current) : null, [c, i] = I.useState(
    () => Kt(l, e)
  );
  return _e(() => {
    i(Kt(l, e));
  }, [l, e]), _e(() => {
    const m = (g) => () => {
      i(g);
    };
    if (!l) return;
    const u = m("loaded"), p = m("error");
    return l.addEventListener("load", u), l.addEventListener("error", p), a && (l.referrerPolicy = a), typeof n == "string" && (l.crossOrigin = n), () => {
      l.removeEventListener("load", u), l.removeEventListener("error", p);
    };
  }, [l, n, a]), c;
}
var so = Qa, ro = Fa, oo = Oa;
const lo = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base"
};
function Ka({ src: e, alt: a, fallback: n, size: s = "md", className: r }) {
  return /* @__PURE__ */ o(
    so,
    {
      className: h(
        "inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-slate-100",
        lo[s],
        r
      ),
      children: [
        /* @__PURE__ */ t(ro, { src: e, alt: a, className: "h-full w-full object-cover" }),
        /* @__PURE__ */ t(oo, { className: "font-medium text-slate-600", delayMs: 0, children: n ?? "?" })
      ]
    }
  );
}
const io = {
  en: "EN",
  id: "ID"
};
function he({
  locale: e,
  onChange: a,
  variant: n = "default",
  className: s
}) {
  const r = n === "marketing";
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "inline-flex items-center rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700",
        r ? "p-1" : "p-0.5 shadow-sm",
        s
      ),
      role: "group",
      "aria-label": "Language",
      children: ["en", "id"].map((l) => {
        const c = e === l;
        return /* @__PURE__ */ t(
          "button",
          {
            type: "button",
            onClick: () => a(l),
            "aria-pressed": c,
            className: h(
              "rounded-full px-3 py-1.5 transition-colors",
              c ? r ? "bg-slate-950 text-white" : "bg-slate-900 text-white" : r ? "text-slate-700 hover:bg-slate-100" : "text-slate-600 hover:text-slate-900"
            ),
            children: io[l]
          },
          l
        );
      })
    }
  );
}
function co({
  logo: e,
  title: a = "alocare.ai",
  subtitle: n = "AI-Powered Health Intelligence",
  navItems: s = [],
  locale: r = "en",
  onLocaleChange: l,
  actions: c,
  className: i
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: h(
        "sticky top-0 z-[1100] border-b border-slate-200/70 bg-white/80 backdrop-blur",
        i
      ),
      children: /* @__PURE__ */ o("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          e,
          /* @__PURE__ */ o("span", { className: "leading-tight", children: [
            /* @__PURE__ */ o("span", { className: "block text-xl font-semibold tracking-tight text-slate-950", children: [
              "alocare",
              /* @__PURE__ */ t("span", { className: "text-slate-950", children: "." }),
              /* @__PURE__ */ t("span", { className: "text-emerald-600", children: "ai" })
            ] }),
            /* @__PURE__ */ t("span", { className: "block text-xs font-medium text-slate-600", children: n || a })
          ] })
        ] }),
        s.length > 0 ? /* @__PURE__ */ t("nav", { className: "hidden items-center gap-6 md:flex", "aria-label": "Main", children: s.map((m) => /* @__PURE__ */ t(
          "a",
          {
            href: m.href,
            className: h(
              "text-sm transition-colors",
              m.active ? "font-semibold text-slate-950" : "text-slate-700 hover:text-slate-950"
            ),
            children: m.label
          },
          m.href
        )) }) : null,
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          l ? /* @__PURE__ */ t(he, { locale: r, onChange: l }) : null,
          c
        ] })
      ] })
    }
  );
}
const $ = {
  title: d("Upload report", "Unggah Laporan"),
  subtitle: d(
    "Upload PDFs or images of medical reports.",
    "Unggah PDF atau gambar laporan medis."
  ),
  drag: d("Drag & drop your file here", "Seret & lepas file di sini"),
  formats: d("PDF, JPG, PNG", "PDF, JPG, PNG"),
  choose: d("Choose file", "Pilih file"),
  success: d("Upload complete", "Unggah selesai"),
  error: d("Upload failed. Try again.", "Unggah gagal. Coba lagi.")
};
function za({
  lang: e = "en",
  state: a = "empty",
  accept: n = ".pdf,.jpg,.jpeg,.png",
  multiple: s = !1,
  onFilesSelected: r,
  className: l,
  hideHeader: c = !1
}) {
  const [i, m] = D(!1), u = an(null), p = nn(
    (g) => {
      g != null && g.length && (r == null || r(g));
    },
    [r]
  );
  return /* @__PURE__ */ o("div", { className: h("max-w-md", l), children: [
    c ? null : /* @__PURE__ */ o(Ue, { children: [
      /* @__PURE__ */ t("h2", { className: "mb-1 font-heading text-2xl font-bold text-slate-900", children: f($.title, e) }),
      /* @__PURE__ */ t("p", { className: "mb-4 text-sm text-slate-600", children: f($.subtitle, e) })
    ] }),
    /* @__PURE__ */ o(
      "div",
      {
        role: "button",
        tabIndex: 0,
        "aria-label": f($.drag, e),
        onDragOver: (g) => {
          g.preventDefault(), m(!0);
        },
        onDragLeave: () => m(!1),
        onDrop: (g) => {
          g.preventDefault(), m(!1), p(g.dataTransfer.files);
        },
        className: h(
          "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-8 py-12 text-center transition-colors",
          a === "error" ? "border-red-300 bg-red-50/50" : "border-blue-300 bg-blue-50/40",
          i && "border-blue-500 bg-blue-50"
        ),
        children: [
          /* @__PURE__ */ t("div", { className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm", children: a === "uploading" ? /* @__PURE__ */ t(rt, { size: "lg" }) : /* @__PURE__ */ t(Es, { className: "h-8 w-8 text-blue-600", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f($.drag, e) }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs text-slate-500", children: f($.formats, e) }),
          a === "success" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-emerald-600", children: f($.success, e) }) : a === "error" ? /* @__PURE__ */ t("p", { className: "mt-3 text-sm font-medium text-red-600", children: f($.error, e) }) : /* @__PURE__ */ o(Ue, { children: [
            /* @__PURE__ */ t(
              "input",
              {
                ref: u,
                type: "file",
                className: "sr-only",
                accept: n,
                multiple: s,
                onChange: (g) => p(g.target.files)
              }
            ),
            /* @__PURE__ */ t(
              ne,
              {
                type: "button",
                className: "mt-5 cursor-pointer",
                leftIcon: /* @__PURE__ */ t(st, { className: "h-4 w-4", "aria-hidden": !0 }),
                onClick: () => {
                  var g;
                  return (g = u.current) == null ? void 0 : g.click();
                },
                children: f($.choose, e)
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Ta({
  fileName: e,
  fileSize: a = "2.4 MB",
  lang: n = "en",
  uploaded: s = !0,
  className: r
}) {
  return /* @__PURE__ */ t(R, { className: h("", r), children: /* @__PURE__ */ o(O, { className: "flex items-center gap-3 py-3", children: [
    /* @__PURE__ */ t("div", { className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50", children: /* @__PURE__ */ t(me, { className: "h-5 w-5 text-red-600", "aria-hidden": !0 }) }),
    /* @__PURE__ */ o("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold text-slate-900", children: e }),
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: a })
    ] }),
    s ? /* @__PURE__ */ t(
      tt,
      {
        className: "h-5 w-5 shrink-0 text-emerald-600",
        "aria-label": f(d("Uploaded", "Berhasil diunggah"), n)
      }
    ) : null
  ] }) });
}
const mo = {
  pending: d("Ready to scan", "Siap dipindai"),
  processing: d("Scanning document…", "Memindai dokumen…"),
  complete: d("Uploaded", "Berhasil diunggah"),
  error: d("Scan failed", "Pemindaian gagal")
};
function uo({
  lang: e = "en",
  status: a = "complete",
  progress: n = 100,
  className: s
}) {
  const r = a === "processing" ? ba : a === "complete" ? gs : er;
  return /* @__PURE__ */ t(
    R,
    {
      className: h(
        "border-emerald-200 bg-emerald-50/60",
        a === "error" && "border-red-200 bg-red-50/60",
        s
      ),
      children: /* @__PURE__ */ o(O, { className: "flex items-center gap-3 py-3", children: [
        /* @__PURE__ */ t(
          r,
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
        /* @__PURE__ */ o("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(mo[a], e) }),
          a === "processing" ? /* @__PURE__ */ t(ja, { value: n, className: "mt-2", showLabel: !0 }) : null
        ] })
      ] })
    }
  );
}
const ho = {
  idle: d("AI Ready", "AI Siap"),
  processing: d("AI Processing", "AI Memproses"),
  complete: d("AI Complete", "AI Selesai"),
  review: d("Needs Review", "Perlu Ditinjau")
};
function Wl({
  status: e = "processing",
  lang: a = "en",
  className: n
}) {
  return /* @__PURE__ */ o(
    J,
    {
      variant: "ai",
      className: h("gap-1.5", n),
      role: "status",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ t(Ca, { className: "h-3 w-3", "aria-hidden": !0 }),
        f(ho[e], a)
      ]
    }
  );
}
const Ve = d("Confidence Score", "Skor Kepercayaan"), po = d(
  "High confidence in extracted insights",
  "Kepercayaan tinggi pada insight yang diekstrak"
);
function ct({
  score: e,
  lang: a = "en",
  description: n,
  dualLanguageTitle: s = !1,
  className: r
}) {
  const l = Math.min(100, Math.max(0, e)), c = 2 * Math.PI * 36, i = c - l / 100 * c;
  return /* @__PURE__ */ o(R, { className: h("", r), children: [
    /* @__PURE__ */ o(ue, { className: "border-0 pb-0", children: [
      /* @__PURE__ */ t("div", { className: "flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50", children: /* @__PURE__ */ t(ir, { className: "h-5 w-5 text-blue-600", "aria-hidden": !0 }) }),
      /* @__PURE__ */ t("div", { children: /* @__PURE__ */ t(
        F,
        {
          label: Ve,
          secondaryLabel: s ? a === "en" ? Ve.id : Ve.en : void 0,
          lang: a,
          as: "h3"
        }
      ) })
    ] }),
    /* @__PURE__ */ o(O, { className: "flex items-center justify-between gap-4 pt-2", children: [
      /* @__PURE__ */ t("p", { className: "max-w-[12rem] text-sm text-slate-600", children: n ?? f(po, a) }),
      /* @__PURE__ */ o(
        "div",
        {
          className: "relative h-20 w-20 shrink-0",
          role: "img",
          "aria-label": `${l}% confidence`,
          children: [
            /* @__PURE__ */ o("svg", { className: "h-20 w-20 -rotate-90", viewBox: "0 0 80 80", children: [
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
                  strokeDashoffset: i
                }
              )
            ] }),
            /* @__PURE__ */ o("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-bold text-blue-600", children: [
              l,
              "%"
            ] })
          ]
        }
      )
    ] })
  ] });
}
const Xe = d("Key Findings", "Temuan Utama"), go = {
  normal: { en: "Normal", id: "Normal" },
  low: { en: "Low", id: "Rendah" },
  high: { en: "High", id: "Tinggi" },
  critical: { en: "Critical", id: "Kritis" }
}, fo = {
  normal: "normal",
  low: "low",
  high: "high",
  critical: "critical"
};
function dt({
  findings: e,
  lang: a = "en",
  dualLanguageTitle: n = !1,
  className: s
}) {
  return /* @__PURE__ */ o(R, { className: h("", s), children: [
    /* @__PURE__ */ t(ue, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      F,
      {
        label: Xe,
        secondaryLabel: n ? a === "en" ? Xe.id : Xe.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t(O, { className: "pt-0", children: /* @__PURE__ */ t("ul", { className: "divide-y divide-slate-100", role: "list", children: e.map((r) => /* @__PURE__ */ o(
      "li",
      {
        className: "flex items-center justify-between gap-4 py-3 first:pt-0",
        children: [
          /* @__PURE__ */ o("div", { className: "min-w-0", children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-medium text-slate-900", children: r.label }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: r.value })
          ] }),
          /* @__PURE__ */ t(J, { variant: fo[r.status], children: (r.statusLabel ?? go[r.status])[a] })
        ]
      },
      r.label
    )) }) })
  ] });
}
const We = d("Clinical Summary", "Ringkasan Klinis");
function Ae({
  summary: e,
  lang: a = "en",
  loading: n = !1,
  riskLevel: s = "normal",
  dualLanguageTitle: r = !1,
  className: l
}) {
  const c = {
    normal: "border-slate-200",
    elevated: "border-amber-200",
    high: "border-red-200"
  }[s];
  return /* @__PURE__ */ o(R, { className: h(c, l), children: [
    /* @__PURE__ */ t(ue, { className: "border-0 pb-2", children: /* @__PURE__ */ o("div", { className: "flex w-full items-start justify-between gap-3", children: [
      /* @__PURE__ */ t(
        F,
        {
          label: We,
          secondaryLabel: r ? a === "en" ? We.id : We.en : void 0,
          lang: a,
          as: "h3"
        }
      ),
      /* @__PURE__ */ t(
        "div",
        {
          className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50",
          "aria-hidden": !0,
          children: /* @__PURE__ */ t(ha, { className: "h-5 w-5 text-violet-600" })
        }
      )
    ] }) }),
    /* @__PURE__ */ t(O, { className: "pt-0", children: n ? /* @__PURE__ */ o("div", { className: "flex items-center gap-2 py-4", children: [
      /* @__PURE__ */ t(rt, {}),
      /* @__PURE__ */ t("span", { className: "text-sm text-slate-500", children: a === "id" ? "Menghasilkan ringkasan…" : "Generating summary…" })
    ] }) : /* @__PURE__ */ t("p", { className: "text-sm leading-relaxed text-slate-700", children: f(e, a) }) })
  ] });
}
const Ao = {
  heart: Ms,
  exercise: Ws,
  calendar: ga,
  default: fa
}, Ye = d("Suggested Next Actions", "Rekomendasi Tindak Lanjut");
function Ha({
  items: e,
  lang: a = "en",
  dualLanguageTitle: n = !1,
  className: s
}) {
  return /* @__PURE__ */ o(R, { className: h("", s), children: [
    /* @__PURE__ */ t(ue, { className: "border-0 pb-2", children: /* @__PURE__ */ t(
      F,
      {
        label: Ye,
        secondaryLabel: n ? a === "en" ? Ye.id : Ye.en : void 0,
        lang: a,
        as: "h3"
      }
    ) }),
    /* @__PURE__ */ t(O, { className: "space-y-4 pt-0", children: e.map((r) => {
      const l = Ao[r.icon ?? "default"];
      return /* @__PURE__ */ o("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ t("div", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50", children: /* @__PURE__ */ t(l, { className: "h-4 w-4 text-emerald-600", "aria-hidden": !0 }) }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(r.title, a) }),
          r.description ? /* @__PURE__ */ t("p", { className: "mt-0.5 text-xs text-slate-600", children: f(r.description, a) }) : null
        ] })
      ] }, r.id);
    }) })
  ] });
}
const bo = {
  low: d("Low Risk", "Risiko Rendah"),
  medium: d("Medium Risk", "Risiko Sedang"),
  high: d("High Risk", "Risiko Tinggi")
}, xo = {
  low: "bg-emerald-500",
  medium: "bg-amber-500",
  high: "bg-red-500"
};
function vo({
  level: e,
  percentage: a,
  lang: n = "en",
  className: s
}) {
  return /* @__PURE__ */ o("div", { className: h("flex items-center gap-2", s), role: "status", children: [
    /* @__PURE__ */ t(
      "span",
      {
        className: h("h-2.5 w-2.5 rounded-full", xo[e]),
        "aria-hidden": !0
      }
    ),
    /* @__PURE__ */ o("span", { className: "text-sm font-medium text-slate-700", children: [
      f(bo[e], n),
      a !== void 0 ? ` (${a}%)` : ""
    ] })
  ] });
}
const yo = d("Review & Validate", "Tinjau & Validasi"), zt = d("Assessment", "Penilaian"), wo = [
  { value: "agree", label: d("Agree with AI findings", "Setuju dengan temuan AI") },
  { value: "partial", label: d("Partially agree", "Sebagian setuju") },
  { value: "disagree", label: d("Disagree", "Tidak setuju") }
], ko = d("Comments", "Komentar"), No = d(
  "Add clinical notes or corrections…",
  "Tambahkan catatan klinis atau koreksi…"
), Co = d("Save & Continue", "Simpan & Lanjutkan");
function Yl({
  lang: e = "en",
  onSubmit: a,
  className: n
}) {
  const [s, r] = D("agree"), [l, c] = D(""), [i, m] = D(!1);
  return /* @__PURE__ */ o("div", { className: h("max-w-sm space-y-4", n), children: [
    /* @__PURE__ */ t(F, { label: yo, lang: e, as: "h2" }),
    /* @__PURE__ */ o(R, { children: [
      /* @__PURE__ */ t(ue, { className: "border-0 pb-2", children: /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: f(zt, e) }) }),
      /* @__PURE__ */ o(O, { className: "space-y-4 pt-0", children: [
        /* @__PURE__ */ o("fieldset", { className: "space-y-2", children: [
          /* @__PURE__ */ t("legend", { className: "sr-only", children: f(zt, e) }),
          wo.map((u) => /* @__PURE__ */ o(
            "label",
            {
              className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700",
              children: [
                /* @__PURE__ */ t(
                  "input",
                  {
                    type: "radio",
                    name: "assessment",
                    value: u.value,
                    checked: s === u.value,
                    onChange: () => r(u.value),
                    className: "h-4 w-4 border-slate-300 text-blue-600 focus:ring-blue-600"
                  }
                ),
                f(u.label, e)
              ]
            },
            u.value
          ))
        ] }),
        /* @__PURE__ */ t(
          te,
          {
            label: ko,
            lang: e,
            placeholder: f(No, e),
            value: l,
            onChange: (u) => c(u.target.value)
          }
        ),
        /* @__PURE__ */ o("label", { className: "flex cursor-pointer items-center gap-2 text-sm text-slate-700", children: [
          /* @__PURE__ */ t(
            "input",
            {
              type: "checkbox",
              checked: i,
              onChange: (u) => m(u.target.checked),
              className: "h-4 w-4 rounded border-slate-300 text-blue-600"
            }
          ),
          e === "id" ? "Beritahu pasien" : "Notify patient"
        ] }),
        /* @__PURE__ */ t(
          ne,
          {
            fullWidth: !0,
            size: "lg",
            rightIcon: /* @__PURE__ */ t(tt, { className: "h-4 w-4", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a({
              assessment: s,
              comments: l,
              nextAction: "follow-up-3mo",
              notifyPatient: i
            }),
            children: f(Co, e)
          }
        )
      ] })
    ] })
  ] });
}
function Va({ role: e, content: a, timestamp: n, className: s }) {
  const r = e === "user";
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex",
        r ? "justify-end" : "justify-start",
        s
      ),
      children: /* @__PURE__ */ o(
        "div",
        {
          className: h(
            "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
            r ? "bg-blue-600 text-white" : "border border-slate-200 bg-white text-slate-800 shadow-sm",
            e === "system" && "bg-slate-50 text-slate-600 italic"
          ),
          role: e === "assistant" ? "article" : void 0,
          "aria-label": e === "assistant" ? "AI response" : void 0,
          children: [
            /* @__PURE__ */ t("p", { children: a }),
            n ? /* @__PURE__ */ t("time", { className: "mt-1 block text-xs opacity-70", children: n }) : null
          ]
        }
      )
    }
  );
}
const Tt = d(
  "Ask about this report…",
  "Tanyakan tentang laporan ini…"
);
function Bo({
  lang: e = "en",
  onSend: a,
  disabled: n,
  className: s
}) {
  const [r, l] = D(""), c = () => {
    const i = r.trim();
    i && (a == null || a(i), l(""));
  };
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm",
        s
      ),
      children: [
        /* @__PURE__ */ t(
          "textarea",
          {
            rows: 1,
            value: r,
            onChange: (i) => l(i.target.value),
            onKeyDown: (i) => {
              i.key === "Enter" && !i.shiftKey && (i.preventDefault(), c());
            },
            placeholder: f(Tt, e),
            disabled: n,
            className: "min-h-[2.5rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none",
            "aria-label": f(Tt, e)
          }
        ),
        /* @__PURE__ */ t(
          ne,
          {
            size: "sm",
            disabled: n || !r.trim(),
            onClick: c,
            "aria-label": e === "id" ? "Kirim" : "Send",
            children: /* @__PURE__ */ t(sr, { className: "h-4 w-4", "aria-hidden": !0 })
          }
        )
      ]
    }
  );
}
function Ul({
  totalEmployees: e,
  trend: a = "+8.5% vs last month",
  trendUp: n = !0,
  className: s
}) {
  return /* @__PURE__ */ t(R, { className: h("", s), children: /* @__PURE__ */ t(O, { children: /* @__PURE__ */ o("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("p", { className: "text-xs font-semibold uppercase tracking-wide text-slate-500", children: "Total Employees" }),
      /* @__PURE__ */ t("p", { className: "mt-2 text-4xl font-bold text-slate-900", children: e.toLocaleString() }),
      /* @__PURE__ */ o(
        "p",
        {
          className: h(
            "mt-2 flex items-center gap-1 text-sm font-medium",
            n ? "text-emerald-600" : "text-red-600"
          ),
          children: [
            /* @__PURE__ */ t(gr, { className: "h-4 w-4", "aria-hidden": !0 }),
            a
          ]
        }
      )
    ] }),
    /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50", children: /* @__PURE__ */ t(Me, { className: "h-6 w-6 text-emerald-600", "aria-hidden": !0 }) })
  ] }) }) });
}
const Eo = {
  privacy: {
    icon: at,
    text: "Data is secure, private and confidential. We comply with data privacy regulations."
  },
  encryption: {
    icon: xa,
    text: "Encrypted & Protected. Enterprise-grade security."
  }
};
function Ht({
  variant: e = "privacy",
  className: a
}) {
  const { icon: n, text: s } = Eo[e];
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "flex items-center gap-3 rounded-xl bg-blue-50/80 px-4 py-3 text-sm text-slate-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(n, { className: "h-5 w-5 shrink-0 text-blue-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: s })
      ]
    }
  );
}
const mt = {
  login: "POST /auth/login",
  logout: "POST /auth/logout",
  refresh: "POST /auth/refresh",
  profile: "GET /users/me"
}, G = {
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
}, Io = {
  blue: "from-slate-50 via-white to-blue-50",
  teal: "from-slate-50 via-white to-teal-50",
  emerald: "from-slate-50 via-white to-emerald-50",
  slate: "from-slate-100 via-slate-50 to-white"
}, Po = {
  blue: "bg-gradient-to-br from-blue-700 to-blue-900",
  teal: "bg-gradient-to-br from-teal-600 to-teal-800",
  emerald: "bg-gradient-to-br from-emerald-600 to-emerald-800",
  slate: "bg-gradient-to-br from-slate-700 to-slate-900"
};
function ut({
  children: e,
  variant: a = "plain",
  accent: n = "blue",
  sidePanel: s,
  className: r
}) {
  return a === "split" && s ? /* @__PURE__ */ o("div", { className: h("flex min-h-screen", r), children: [
    /* @__PURE__ */ t(
      "aside",
      {
        className: h(
          "hidden w-[42%] flex-col justify-between p-10 text-white lg:flex",
          Po[n]
        ),
        children: s
      }
    ),
    /* @__PURE__ */ t("main", { className: "flex flex-1 items-center justify-center bg-slate-50 px-4 py-10", children: e })
  ] }) : /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex min-h-screen flex-col items-center justify-center px-4 py-10",
        a === "gradient" ? h("bg-gradient-to-br", Io[n]) : "bg-slate-50",
        r
      ),
      children: e
    }
  );
}
const Vt = {
  /** Hero / login card outer glow */
  elevated: "shadow-[0_40px_120px_-80px_rgba(15,23,42,0.55)]",
  /** Inner panels (feature cards on marketing site) */
  panel: "shadow-[0_22px_70px_-35px_rgba(15,23,42,0.5)]",
  /** Subtle chips & controls */
  sm: "shadow-sm"
}, L = {
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
function ht({
  children: e,
  loginSize: a = "lg",
  elevated: n = !0,
  className: s
}) {
  return /* @__PURE__ */ t(
    R,
    {
      className: h(
        L.card[a],
        "overflow-hidden rounded-3xl border-slate-200 bg-white",
        n ? Vt.elevated : Vt.sm,
        s
      ),
      children: e
    }
  );
}
function ql({
  children: e,
  loginSize: a = "lg",
  className: n
}) {
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        L.header[a],
        "border-slate-100",
        n
      ),
      children: e
    }
  );
}
function Mo({
  children: e,
  loginSize: a = "lg",
  className: n
}) {
  return /* @__PURE__ */ t("div", { className: h(L.content[a], n), children: e });
}
const Xa = "data:image/png;base64,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";
function je({
  lang: e = "en",
  logoSrc: a,
  layout: n = "horizontal",
  showTagline: s = !0,
  logoSize: r,
  loginSize: l = "md",
  className: c,
  imageClassName: i
}) {
  const m = a ?? Xa, u = r ?? L.logoPx[l], p = {
    md: "text-xl",
    lg: "text-2xl"
  }[l], g = {
    md: "text-xs",
    lg: "text-sm"
  }[l], y = /* @__PURE__ */ o("span", { className: "leading-tight", children: [
    /* @__PURE__ */ o(
      "span",
      {
        className: h(
          "block font-semibold tracking-tight text-slate-950",
          p
        ),
        children: [
          "alocare",
          /* @__PURE__ */ t("span", { className: "text-slate-950", children: "." }),
          /* @__PURE__ */ t("span", { className: "text-emerald-600", children: "ai" })
        ]
      }
    ),
    s ? /* @__PURE__ */ t("span", { className: h("block font-medium text-slate-600", g), children: f(G.brandTagline, e) }) : null
  ] }), v = /* @__PURE__ */ t(
    "img",
    {
      src: m,
      alt: "Alocare AI",
      width: u,
      height: u,
      className: h("shrink-0 object-contain", i),
      style: { width: u, height: u }
    }
  );
  return n === "mark" ? /* @__PURE__ */ t("div", { className: h("inline-flex", c), children: v }) : n === "stacked" ? /* @__PURE__ */ o("div", { className: h("flex flex-col items-center gap-3 text-center", c), children: [
    v,
    y
  ] }) : /* @__PURE__ */ o("div", { className: h("flex items-center gap-3", c), children: [
    v,
    y
  ] });
}
function Jl({
  lang: e = "en",
  onLocaleChange: a,
  logoSrc: n,
  showBrand: s = !0,
  className: r
}) {
  return /* @__PURE__ */ t(
    "header",
    {
      className: h(
        "sticky top-0 z-20 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur",
        r
      ),
      children: /* @__PURE__ */ o("div", { className: "mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4", children: [
        s ? /* @__PURE__ */ t(je, { lang: e, logoSrc: n, layout: "horizontal", loginSize: "md" }) : /* @__PURE__ */ t("span", { className: "flex-1", "aria-hidden": !0 }),
        a ? /* @__PURE__ */ t(
          he,
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
const Do = {
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
function pt({
  variant: e = "alocare",
  layout: a = "portal",
  lang: n = "en",
  loginSize: s = "lg",
  title: r,
  subtitle: l,
  logoSrc: c,
  className: i
}) {
  const m = Do[e], u = r ?? f(m.title, n), p = l ?? f(m.subtitle, n);
  return e === "alocare" && a === "portal" ? /* @__PURE__ */ o("div", { className: h(L.brandBlock[s], i), children: [
    /* @__PURE__ */ t(
      je,
      {
        lang: n,
        logoSrc: c,
        layout: "mark",
        loginSize: s,
        className: "mx-auto"
      }
    ),
    /* @__PURE__ */ o("div", { className: h("w-full", L.brandLogoToTitle[s]), children: [
      /* @__PURE__ */ t("h1", { className: L.title[s], children: u }),
      /* @__PURE__ */ t(
        "p",
        {
          className: h(
            L.subtitle[s],
            L.titleToSubtitle[s],
            L.subtitleMax[s],
            "mx-auto text-balance"
          ),
          children: p
        }
      )
    ] })
  ] }) : /* @__PURE__ */ o("div", { className: h("mb-6", i), children: [
    e === "alocare" ? /* @__PURE__ */ t("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ t(je, { lang: n, logoSrc: c, layout: "horizontal", loginSize: s }) }) : /* @__PURE__ */ t(
      "div",
      {
        className: h(
          "mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-xl font-bold text-white",
          e === "emr" && "bg-teal-600",
          e === "admin" && "bg-blue-600",
          e === "hr" && "bg-emerald-600"
        ),
        "aria-hidden": !0,
        children: e === "emr" ? "EMR" : e === "admin" ? /* @__PURE__ */ t(at, { className: "h-7 w-7" }) : /* @__PURE__ */ t(ls, { className: "h-7 w-7" })
      }
    ),
    /* @__PURE__ */ o("div", { className: "text-center", children: [
      /* @__PURE__ */ t("h1", { className: L.title[s], children: u }),
      /* @__PURE__ */ t("p", { className: L.subtitle[s], children: p })
    ] })
  ] });
}
function Go({
  lang: e = "en",
  logoSrc: a,
  className: n
}) {
  return /* @__PURE__ */ o("div", { className: h("space-y-6", n), children: [
    /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ t(
        "img",
        {
          src: a ?? Xa,
          alt: "Alocare AI",
          width: 48,
          height: 48,
          className: "h-12 w-12 shrink-0 object-contain"
        }
      ),
      /* @__PURE__ */ o("span", { className: "leading-tight text-white", children: [
        /* @__PURE__ */ o("span", { className: "block text-2xl font-semibold tracking-tight", children: [
          "alocare",
          /* @__PURE__ */ t("span", { className: "text-emerald-300", children: ".ai" })
        ] }),
        /* @__PURE__ */ t("span", { className: "block text-sm font-medium text-blue-100", children: f(G.brandTagline, e) })
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
function jo({ className: e }) {
  return /* @__PURE__ */ o("svg", { className: e, viewBox: "0 0 24 24", "aria-hidden": !0, children: [
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
function Zl({
  lang: e = "en",
  loginSize: a = "lg",
  onClick: n,
  loading: s,
  disabled: r,
  className: l
}) {
  return /* @__PURE__ */ t(
    ne,
    {
      type: "button",
      variant: "secondary",
      fullWidth: !0,
      size: L.button[a],
      loading: s,
      disabled: r || !n,
      onClick: n,
      className: h("border-slate-200 bg-white", l),
      leftIcon: /* @__PURE__ */ t(jo, { className: "h-5 w-5" }),
      children: f(G.continueWithGoogle, e)
    }
  );
}
function _l({ lang: e = "en", className: a }) {
  return /* @__PURE__ */ o("div", { className: h("relative my-6", a), children: [
    /* @__PURE__ */ t("div", { className: "absolute inset-0 flex items-center", "aria-hidden": !0, children: /* @__PURE__ */ t("div", { className: "w-full border-t border-slate-200" }) }),
    /* @__PURE__ */ t("div", { className: "relative flex justify-center text-xs font-medium uppercase tracking-wide", children: /* @__PURE__ */ t("span", { className: "bg-white px-3 text-slate-500", children: f(G.orDivider, e) }) })
  ] });
}
const Wa = "doctor@alocare.net", Ya = "doctor123";
function $l({
  lang: e = "en",
  loginSize: a = "lg",
  variant: n = "compact",
  email: s = Wa,
  password: r = Ya,
  additionalNote: l,
  className: c
}) {
  const i = a === "lg" ? "text-base" : "text-sm", m = a === "lg" ? "text-base" : "text-sm";
  if (n === "compact")
    return /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left text-blue-900",
          i,
          c
        ),
        role: "note",
        children: [
          /* @__PURE__ */ t("p", { className: h("font-semibold", m), children: f(G.demoAccountTitle, e) }),
          /* @__PURE__ */ o("p", { className: "mt-1 text-blue-800", children: [
            s,
            " / ",
            r
          ] })
        ]
      }
    );
  const u = l === void 0 ? f(G.demoAdditionalNote, e) : typeof l == "string" ? l : f(l, e);
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left",
        i,
        c
      ),
      role: "note",
      children: [
        /* @__PURE__ */ o("div", { className: "mb-2 flex items-center gap-2 font-semibold text-blue-900", children: [
          /* @__PURE__ */ t(Ss, { className: "h-4 w-4 shrink-0", "aria-hidden": !0 }),
          f(G.demoNotesTitle, e)
        ] }),
        /* @__PURE__ */ o("dl", { className: "space-y-1 text-slate-700", children: [
          /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-x-2", children: [
            /* @__PURE__ */ o("dt", { className: "font-medium text-slate-600", children: [
              f(G.demoEmailLabel, e),
              ":"
            ] }),
            /* @__PURE__ */ t("dd", { className: "font-mono text-slate-900", children: s })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-x-2", children: [
            /* @__PURE__ */ o("dt", { className: "font-medium text-slate-600", children: [
              f(G.demoPasswordLabel, e),
              ":"
            ] }),
            /* @__PURE__ */ t("dd", { className: "font-mono text-slate-900", children: r })
          ] })
        ] }),
        u ? /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-600", children: u }) : null
      ]
    }
  );
}
function Lo({ message: e, className: a }) {
  return e ? /* @__PURE__ */ o(
    "div",
    {
      role: "alert",
      className: h(
        "flex items-start gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700",
        a
      ),
      children: [
        /* @__PURE__ */ t(hs, { className: "mt-0.5 h-4 w-4 shrink-0", "aria-hidden": !0 }),
        /* @__PURE__ */ t("p", { children: e })
      ]
    }
  ) : null;
}
function Qo({
  lang: e = "en",
  loginSize: a = "lg",
  label: n = d("Password", "Kata sandi"),
  className: s,
  labelClassName: r,
  ...l
}) {
  const [c, i] = D(!1);
  return /* @__PURE__ */ o("div", { className: h("relative", s), children: [
    /* @__PURE__ */ t(
      ee,
      {
        lang: e,
        label: n,
        labelClassName: r ?? L.label[a],
        type: c ? "text" : "password",
        autoComplete: "current-password",
        className: h(L.input[a], "pr-12"),
        ...l
      }
    ),
    /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        onClick: () => i((m) => !m),
        className: h(
          "absolute right-3 rounded p-1 text-slate-500 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600",
          L.passwordToggleTop[a]
        ),
        "aria-label": f(c ? d("Hide password", "Sembunyikan kata sandi") : d("Show password", "Tampilkan kata sandi"), e),
        children: c ? /* @__PURE__ */ t(ws, { className: "h-5 w-5", "aria-hidden": !0 }) : /* @__PURE__ */ t(Ns, { className: "h-5 w-5", "aria-hidden": !0 })
      }
    )
  ] });
}
function gt({
  lang: e = "en",
  onLocaleChange: a,
  onForgotPassword: n,
  showForgotPassword: s = !0,
  showLanguageSwitcher: r = !0,
  languageVariant: l = "marketing",
  showDemoHint: c = !1,
  showApiHint: i = !1,
  className: m
}) {
  const u = r && a;
  return /* @__PURE__ */ o("div", { className: h("mt-6 space-y-4", m), children: [
    (u || s) && /* @__PURE__ */ o("div", { className: "flex items-center justify-between border-t border-slate-100 pt-4", children: [
      u && a ? /* @__PURE__ */ t(
        he,
        {
          locale: e,
          onChange: a,
          variant: l
        }
      ) : /* @__PURE__ */ t("span", {}),
      s ? /* @__PURE__ */ t(
        "button",
        {
          type: "button",
          onClick: n,
          className: "text-sm font-medium text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
          children: f(G.forgotPassword, e)
        }
      ) : null
    ] }),
    c ? /* @__PURE__ */ t("p", { className: "text-center text-xs text-slate-500", children: f(G.demoHint, e) }) : null,
    i ? /* @__PURE__ */ t("p", { className: "text-center text-xs text-slate-400", children: mt.login }) : null
  ] });
}
const M = de(
  ({ className: e, size: a, ...n }, s) => /* @__PURE__ */ t(
    ne,
    {
      ref: s,
      size: a ?? "lg",
      className: h("min-h-12 min-w-12 touch-manipulation px-5", e),
      ...n
    }
  )
);
M.displayName = "TouchButton";
function ft({
  lang: e = "en",
  loginSize: a = "lg",
  identifierMode: n = "email",
  onSubmit: s,
  error: r,
  loading: l,
  touchOptimized: c = !1,
  showRememberMe: i = !1,
  submitLabel: m,
  showPasswordToggle: u = !1,
  className: p
}) {
  const [g, y] = D(""), [v, C] = D(""), [N, B] = D(!1), P = c ? M : ne, j = m ?? f(n === "email" ? G.signIn : G.login, e), T = n === "email" ? G.email : G.username, W = c ? void 0 : L.input[a], Y = c ? void 0 : L.label[a], Z = c ? "space-y-4" : L.form[a], V = c ? "xl" : L.button[a];
  return /* @__PURE__ */ o(
    "form",
    {
      className: h(Z, p),
      onSubmit: (b) => {
        b.preventDefault(), s == null || s({ identifier: g, password: v });
      },
      children: [
        /* @__PURE__ */ t(
          ee,
          {
            lang: e,
            type: n === "email" ? "email" : "text",
            label: T,
            labelClassName: Y,
            value: g,
            onChange: (b) => y(b.target.value),
            autoComplete: n === "email" ? "email" : "username",
            className: W,
            required: !0
          }
        ),
        u ? /* @__PURE__ */ t(
          Qo,
          {
            lang: e,
            loginSize: a,
            value: v,
            onChange: (b) => C(b.target.value),
            labelClassName: Y,
            className: W,
            required: !0
          }
        ) : /* @__PURE__ */ t(
          ee,
          {
            lang: e,
            type: "password",
            label: G.password,
            labelClassName: Y,
            value: v,
            onChange: (b) => C(b.target.value),
            autoComplete: "current-password",
            className: W,
            required: !0
          }
        ),
        i ? /* @__PURE__ */ o(
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
                  checked: N,
                  onChange: (b) => B(b.target.checked),
                  className: "h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                }
              ),
              f(G.rememberMe, e)
            ]
          }
        ) : null,
        r ? /* @__PURE__ */ t(Lo, { message: r }) : null,
        /* @__PURE__ */ t(
          P,
          {
            type: "submit",
            variant: c ? "success" : "primary",
            fullWidth: !0,
            size: V,
            loading: l,
            className: c ? "min-h-14" : void 0,
            children: j
          }
        )
      ]
    }
  );
}
function So({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: n,
  onForgotPassword: s,
  error: r,
  loading: l = !1,
  showDemoNotes: c = !0,
  demoEmail: i = Wa,
  demoPassword: m = Ya,
  logoSrc: u,
  className: p
}) {
  const [g, y] = D(""), [v, C] = D(""), N = (B) => {
    B.preventDefault(), n == null || n({ identifier: g, password: v });
  };
  return /* @__PURE__ */ t(
    "div",
    {
      className: h(
        "flex min-h-screen items-center justify-center bg-slate-50 px-4",
        p
      ),
      children: /* @__PURE__ */ o(R, { className: "w-full max-w-md shadow-lg", children: [
        /* @__PURE__ */ o(ue, { className: "flex flex-col items-stretch gap-0 border-b border-slate-100 px-5 py-4", children: [
          a ? /* @__PURE__ */ t("div", { className: "mb-4 flex justify-end", children: /* @__PURE__ */ t(he, { locale: e, onChange: a }) }) : null,
          /* @__PURE__ */ o("div", { className: "flex flex-col items-center text-center", children: [
            /* @__PURE__ */ t(
              je,
              {
                lang: e,
                logoSrc: u,
                layout: "mark",
                logoSize: 48,
                className: "mx-auto"
              }
            ),
            /* @__PURE__ */ t("h1", { className: "mt-4 font-heading text-xl font-semibold text-slate-900", children: f(G.portalTitle, e) }),
            /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: f(G.portalSubtitle, e) })
          ] })
        ] }),
        /* @__PURE__ */ o(O, { children: [
          /* @__PURE__ */ o("form", { onSubmit: N, className: "space-y-4", children: [
            /* @__PURE__ */ t(
              ee,
              {
                type: "email",
                label: G.email,
                lang: e,
                value: g,
                onChange: (B) => y(B.target.value),
                required: !0,
                autoComplete: "email"
              }
            ),
            /* @__PURE__ */ t(
              ee,
              {
                type: "password",
                label: G.password,
                lang: e,
                value: v,
                onChange: (B) => C(B.target.value),
                required: !0,
                autoComplete: "current-password"
              }
            ),
            r ? /* @__PURE__ */ t("p", { className: "text-sm text-red-600", role: "alert", children: r }) : null,
            /* @__PURE__ */ t(ne, { type: "submit", fullWidth: !0, loading: l, size: "lg", children: f(G.signIn, e) })
          ] }),
          /* @__PURE__ */ t("div", { className: "mt-4 text-center", children: /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              onClick: s,
              className: "text-sm text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded",
              children: f(G.forgotPassword, e)
            }
          ) }),
          c ? /* @__PURE__ */ o(
            "div",
            {
              className: "mt-4 rounded-xl border border-blue-100 bg-blue-50/80 px-4 py-3 text-left text-sm text-blue-900",
              role: "note",
              children: [
                /* @__PURE__ */ t("p", { className: "font-semibold", children: f(G.demoAccountTitle, e) }),
                /* @__PURE__ */ o("p", { className: "mt-1 text-blue-800", children: [
                  i,
                  " / ",
                  m
                ] })
              ]
            }
          ) : null
        ] })
      ] })
    }
  );
}
function Fo({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: n,
  error: s,
  loading: r,
  className: l
}) {
  return /* @__PURE__ */ t(
    ut,
    {
      variant: "split",
      accent: "blue",
      className: l,
      sidePanel: /* @__PURE__ */ t(Go, { lang: e }),
      children: /* @__PURE__ */ o(ht, { className: "shadow-xl", children: [
        /* @__PURE__ */ t(pt, { variant: "admin", lang: e }),
        /* @__PURE__ */ t(
          ft,
          {
            lang: e,
            identifierMode: "email",
            showPasswordToggle: !0,
            showRememberMe: !0,
            onSubmit: n,
            error: s,
            loading: r
          }
        ),
        /* @__PURE__ */ t(
          gt,
          {
            lang: e,
            onLocaleChange: a,
            showForgotPassword: !0,
            showApiHint: !0
          }
        ),
        /* @__PURE__ */ t("p", { className: "mt-2 text-center text-[10px] text-slate-400", children: mt.profile })
      ] })
    }
  );
}
function Ro({
  lang: e = "en",
  onLocaleChange: a,
  onLogin: n,
  error: s,
  loading: r,
  className: l
}) {
  return /* @__PURE__ */ t(ut, { variant: "gradient", accent: "emerald", className: l, children: /* @__PURE__ */ o(ht, { children: [
    /* @__PURE__ */ t(pt, { variant: "hr", lang: e }),
    /* @__PURE__ */ t(
      ft,
      {
        lang: e,
        identifierMode: "email",
        showPasswordToggle: !0,
        onSubmit: n,
        error: s,
        loading: r
      }
    ),
    /* @__PURE__ */ t(gt, { lang: e, onLocaleChange: a, showForgotPassword: !0 })
  ] }) });
}
function Ua({
  lang: e = "en",
  onLogin: a,
  error: n,
  loading: s,
  className: r
}) {
  const l = (c) => {
    a == null || a({ username: c.identifier, password: c.password });
  };
  return /* @__PURE__ */ t(ut, { variant: "gradient", accent: "teal", className: r, children: /* @__PURE__ */ o(ht, { loginSize: "md", className: h("p-8"), children: [
    /* @__PURE__ */ t(pt, { variant: "emr", layout: "inline", lang: e, loginSize: "md" }),
    /* @__PURE__ */ o(Mo, { loginSize: "md", className: "px-0 pb-0 pt-4", children: [
      /* @__PURE__ */ t(
        ft,
        {
          lang: e,
          loginSize: "md",
          identifierMode: "username",
          touchOptimized: !0,
          onSubmit: l,
          error: n,
          loading: s
        }
      ),
      /* @__PURE__ */ t(gt, { lang: e, showForgotPassword: !1, showApiHint: !0 })
    ] })
  ] }) });
}
function ei({
  variant: e = "portal",
  lang: a = "en"
}) {
  const [n, s] = D(a);
  switch (e) {
    case "admin":
      return /* @__PURE__ */ t(Fo, { lang: n, onLocaleChange: s });
    case "hr":
      return /* @__PURE__ */ t(Ro, { lang: n, onLocaleChange: s });
    case "emr":
      return /* @__PURE__ */ t(Ua, { lang: n });
    default:
      return /* @__PURE__ */ t(So, { lang: n, onLocaleChange: s });
  }
}
const le = {
  auth: mt,
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
}, Oo = [
  { id: "dashboard", icon: "layout-dashboard", label: d("Dashboard", "Dasbor") },
  { id: "upload", icon: "upload", label: d("Upload Report", "Unggah Laporan") },
  { id: "queue", icon: "users", label: d("Patient Queue", "Antrian Pasien") },
  { id: "analysis", icon: "brain", label: d("AI Analysis", "Analisis AI") },
  { id: "review", icon: "stethoscope", label: d("Doctor Review", "Tinjauan Dokter") },
  { id: "chat", icon: "message-circle", label: d("Chat Assistant", "Asisten Chat") },
  { id: "history", icon: "history", label: d("History", "Riwayat") },
  { id: "settings", icon: "settings", label: d("Settings", "Pengaturan") }
], Ko = {
  uploaded: d("Uploaded", "Berhasil diunggah"),
  ocr: d("Processing OCR", "Memproses OCR"),
  analyzing: d("AI analyzing", "AI menganalisis"),
  completed: d("Completed", "Selesai")
}, ge = {
  syncing: d("Syncing…", "Menyinkronkan…"),
  offline: d("Offline", "Luring"),
  retry: d("Retry upload", "Unggah ulang"),
  pending: d("Pending uploads in queue", "Unggahan tertunda dalam antrian")
};
function qa({
  status: e,
  lang: a = "en",
  pendingCount: n = 0,
  onRetry: s,
  className: r
}) {
  if (e === "online") return null;
  const l = e === "syncing" ? _s : e === "offline" ? vs : kr;
  return /* @__PURE__ */ o(
    "div",
    {
      role: "status",
      "aria-live": "polite",
      className: h(
        "flex min-h-12 items-center justify-between gap-4 rounded-xl px-4 py-3",
        e === "offline" && "bg-amber-50 text-amber-900",
        e === "syncing" && "bg-blue-50 text-blue-900",
        e === "retry" && "bg-red-50 text-red-900",
        r
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ t(
            l,
            {
              className: h("h-5 w-5 shrink-0", e === "syncing" && "animate-spin"),
              "aria-hidden": !0
            }
          ),
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("p", { className: "text-sm font-semibold", children: f(
              e === "syncing" ? ge.syncing : e === "offline" ? ge.offline : ge.retry,
              a
            ) }),
            n > 0 ? /* @__PURE__ */ o("p", { className: "text-xs opacity-80", children: [
              n,
              " ",
              f(ge.pending, a)
            ] }) : null
          ] })
        ] }),
        e === "retry" && s ? /* @__PURE__ */ t(M, { variant: "secondary", size: "md", onClick: s, children: f(ge.retry, a) }) : null
      ]
    }
  );
}
function Ja({
  lang: e = "en",
  role: a = "Clinical Doctor",
  autoLockMinutes: n = 5,
  masked: s = !0,
  className: r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "flex min-h-10 flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-600",
        r
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(at, { className: "h-3.5 w-3.5 text-blue-600", "aria-hidden": !0 }),
          a
        ] }),
        /* @__PURE__ */ o("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ t(xa, { className: "h-3.5 w-3.5", "aria-hidden": !0 }),
          e === "id" ? `Kunci otomatis ${n} mnt` : `Auto-lock ${n} min`
        ] }),
        s ? /* @__PURE__ */ t("span", { children: e === "id" ? "Data sensitif disamarkan" : "Sensitive data masked" }) : null
      ]
    }
  );
}
const zo = [
  { id: "worklist", label: d("Worklist", "Antrian") },
  { id: "consultation", label: d("Consultation", "Konsultasi") },
  { id: "medications", label: d("Medications", "Obat") },
  { id: "labrad", label: d("Lab / Rad", "Lab / Rad") },
  { id: "ai-voice", label: d("AI Voice", "Suara AI") },
  { id: "reports", label: d("Reports", "Laporan") }
], To = {
  pending: d("Waiting", "Menunggu"),
  in_progress: d("In Consultation", "Sedang Konsultasi"),
  completed: d("Finished", "Selesai"),
  cancelled: d("Cancelled", "Dibatalkan")
}, Ee = {
  s: d("Subjective", "Subjektif"),
  o: d("Objective", "Objektif"),
  a: d("Assessment", "Asesmen"),
  p: d("Planning", "Perencanaan")
}, Ho = {
  worklist: fa,
  consultation: nt,
  medications: ka,
  labrad: Aa,
  "ai-voice": Le,
  reports: me
};
function be({
  children: e,
  lang: a = "en",
  activeNav: n = "worklist",
  onNavChange: s,
  doctorName: r = "Dr. Ananya Putri",
  specialty: l,
  unitLabel: c = "Ward B · Outpatient",
  dateLabel: i,
  onLocaleChange: m,
  onLogout: u,
  offlineStatus: p = "online",
  orientation: g = "landscape",
  appTitle: y,
  className: v
}) {
  const C = y ?? "EMR MediConsult AI", N = l ?? (a === "id" ? "Penyakit Dalam" : "Internal Medicine"), B = i ?? (/* @__PURE__ */ new Date()).toLocaleDateString(a === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
  return /* @__PURE__ */ o("div", { className: h("flex min-h-screen flex-col bg-slate-100", v), children: [
    /* @__PURE__ */ t("header", { className: "sticky top-0 z-20 border-b border-slate-200 bg-white px-4 py-3 md:px-6", children: /* @__PURE__ */ o("div", { className: "flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: C }),
        /* @__PURE__ */ o("p", { className: "text-sm text-slate-600", children: [
          r,
          " | ",
          N,
          " | ",
          B
        ] }),
        /* @__PURE__ */ t("p", { className: "text-xs font-medium text-blue-600", children: c })
      ] }),
      /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ t(Ka, { fallback: "AP", size: "md" }),
        m ? /* @__PURE__ */ t(he, { locale: a, onChange: m }) : null,
        /* @__PURE__ */ t(M, { variant: "ghost", size: "md", className: "relative min-w-12", "aria-label": "Notifications", children: /* @__PURE__ */ t(pa, { className: "h-5 w-5", "aria-hidden": !0 }) }),
        /* @__PURE__ */ t(M, { variant: "ghost", size: "md", onClick: u, "aria-label": "Logout", children: /* @__PURE__ */ t(va, { className: "h-5 w-5", "aria-hidden": !0 }) })
      ] })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex flex-1 overflow-hidden", children: [
      /* @__PURE__ */ o(
        "nav",
        {
          className: h(
            "shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
            g === "landscape" ? "w-52" : "w-20"
          ),
          "aria-label": "EMR navigation",
          children: [
            /* @__PURE__ */ t("ul", { className: "space-y-1", children: zo.map((P) => {
              const j = Ho[P.id], T = n === P.id;
              return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  onClick: () => s == null ? void 0 : s(P.id),
                  className: h(
                    "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition-colors",
                    T ? "bg-teal-50 text-teal-800" : "text-slate-700 hover:bg-slate-50"
                  ),
                  "aria-current": T ? "page" : void 0,
                  children: [
                    /* @__PURE__ */ t(j, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                    g === "landscape" ? f(P.label, a) : null,
                    g === "portrait" ? /* @__PURE__ */ t("span", { className: "sr-only", children: f(P.label, a) }) : null
                  ]
                }
              ) }, P.id);
            }) }),
            /* @__PURE__ */ t("p", { className: "mt-4 hidden px-2 text-[10px] text-slate-400 lg:block", children: "API: api.alocare.net" })
          ]
        }
      ),
      /* @__PURE__ */ o("main", { className: "min-w-0 flex-1 overflow-auto p-4 md:p-6", children: [
        /* @__PURE__ */ t(
          Ja,
          {
            lang: a,
            role: a === "id" ? "Dokter · JWT" : "Doctor · JWT",
            className: "mb-4"
          }
        ),
        p !== "online" ? /* @__PURE__ */ t(qa, { status: p, lang: a, className: "mb-4" }) : null,
        e
      ] })
    ] })
  ] });
}
const Vo = [
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
], Xo = {
  pending: "info",
  in_progress: "ai",
  completed: "normal",
  cancelled: "critical"
};
function Wo({
  lang: e = "en",
  patients: a = Vo,
  onCallPatient: n,
  ...s
}) {
  return /* @__PURE__ */ o(be, { lang: e, activeNav: "worklist", ...s, children: [
    /* @__PURE__ */ o("div", { className: "mb-4 flex flex-col gap-3 sm:flex-row sm:items-end", children: [
      /* @__PURE__ */ o("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ t(
          ar,
          {
            className: "pointer-events-none absolute left-3 top-10 h-5 w-5 text-slate-400",
            "aria-hidden": !0
          }
        ),
        /* @__PURE__ */ t(
          ee,
          {
            lang: e,
            label: d("Search patient", "Cari pasien"),
            placeholder: e === "id" ? "Nama atau no. rekam medis" : "Name or record number",
            className: "pl-10"
          }
        )
      ] }),
      /* @__PURE__ */ o(M, { variant: "secondary", className: "min-h-12 shrink-0 gap-2", children: [
        /* @__PURE__ */ t(ga, { className: "h-5 w-5", "aria-hidden": !0 }),
        f(d("Filter date", "Filter tanggal"), e)
      ] })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", role: "list", children: a.map((r) => /* @__PURE__ */ o(
      "li",
      {
        className: "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm",
        children: [
          /* @__PURE__ */ o("div", { className: "flex flex-wrap items-center justify-between gap-4", children: [
            /* @__PURE__ */ o("div", { children: [
              /* @__PURE__ */ t("p", { className: "text-lg font-bold text-slate-900", children: r.fullName }),
              /* @__PURE__ */ o("p", { className: "text-sm text-slate-600", children: [
                r.admissionNo,
                " · ",
                r.mrn,
                " · ",
                r.insurance
              ] })
            ] }),
            /* @__PURE__ */ t(J, { variant: Xo[r.status], children: f(To[r.status], e) })
          ] }),
          /* @__PURE__ */ t(
            M,
            {
              className: "mt-4 min-h-12",
              fullWidth: !0,
              disabled: r.status === "completed",
              onClick: () => n == null ? void 0 : n(r),
              children: f(d("Call →", "Panggil →"), e)
            }
          )
        ]
      },
      r.id
    )) }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: le.worklist.list })
  ] });
}
function Qe({
  lang: e = "en",
  name: a,
  admissionNo: n,
  mrn: s,
  insurance: r,
  allergies: l,
  className: c
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "rounded-xl border border-slate-200 bg-white p-4 shadow-sm",
        l && "border-amber-200",
        c
      ),
      children: [
        /* @__PURE__ */ o("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
            /* @__PURE__ */ o("p", { className: "mt-1 text-sm text-slate-600", children: [
              n,
              " · ",
              s
            ] })
          ] }),
          /* @__PURE__ */ t(J, { variant: "info", children: r })
        ] }),
        l ? /* @__PURE__ */ o("p", { className: "mt-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900", children: [
          /* @__PURE__ */ t(Ze, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
          e === "id" ? "ALERGI" : "ALLERGIES",
          ": ",
          l
        ] }) : null
      ]
    }
  );
}
const Xt = {
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
function Yo({
  lang: e = "en",
  soap: a,
  onSaveSoap: n,
  onSubmit: s,
  ...r
}) {
  const [l, c] = D("subjective"), [i, m] = D({
    subjective: (a == null ? void 0 : a.subjective) ?? "",
    objective: (a == null ? void 0 : a.objective) ?? "",
    assessment: (a == null ? void 0 : a.assessment) ?? "",
    plan: (a == null ? void 0 : a.plan) ?? "",
    icd10Code: (a == null ? void 0 : a.icd10Code) ?? "R79.89"
  });
  return /* @__PURE__ */ o(be, { lang: e, activeNav: "consultation", ...r, children: [
    /* @__PURE__ */ t(
      Qe,
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
    /* @__PURE__ */ t("div", { className: "mb-4 grid grid-cols-4 gap-2", children: ["subjective", "objective", "assessment", "plan"].map((p) => /* @__PURE__ */ o(
      "button",
      {
        type: "button",
        onClick: () => c(p),
        className: h(
          "min-h-14 touch-manipulation rounded-xl border-2 px-2 py-3 text-center transition-colors",
          l === p ? "border-teal-600 bg-teal-50" : "border-slate-200 bg-white hover:bg-slate-50"
        ),
        children: [
          /* @__PURE__ */ t("span", { className: "text-xl font-bold text-teal-700", children: Xt[p].letter }),
          /* @__PURE__ */ t("p", { className: "mt-1 text-xs font-semibold text-slate-800", children: f(
            {
              subjective: Ee.s,
              objective: Ee.o,
              assessment: Ee.a,
              plan: Ee.p
            }[p],
            e
          ) })
        ]
      },
      p
    )) }),
    /* @__PURE__ */ o("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
      /* @__PURE__ */ t("p", { className: "mb-2 text-xs text-slate-500", children: f(Xt[l].hint, e) }),
      /* @__PURE__ */ t(
        te,
        {
          lang: e,
          rows: 10,
          value: i[l] ?? "",
          onChange: (p) => {
            const g = { ...i, [l]: p.target.value };
            m(g), n == null || n(g);
          },
          className: "text-base"
        }
      ),
      l === "assessment" ? /* @__PURE__ */ o("div", { className: "mt-3", children: [
        /* @__PURE__ */ t("label", { className: "text-sm font-medium text-slate-700", children: "ICD-10" }),
        /* @__PURE__ */ t(
          "input",
          {
            className: "mt-1 h-12 w-full rounded-lg border border-slate-200 px-3 text-sm",
            value: i.icd10Code ?? "",
            onChange: (p) => m({ ...i, icd10Code: p.target.value }),
            placeholder: le.icd10.search
          }
        )
      ] }) : null
    ] }),
    /* @__PURE__ */ o("div", { className: "mt-4 flex flex-wrap gap-3", children: [
      /* @__PURE__ */ t(M, { variant: "secondary", className: "min-h-12", children: f(d("AI Voice fill", "Isi suara AI"), e) }),
      /* @__PURE__ */ t(M, { className: "min-h-12 flex-1", onClick: s, children: f(d("Submit record", "Simpan rekam medis"), e) })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: le.consultations.updateSoap })
  ] });
}
const Uo = [
  { id: "1", name: "Amoxicillin 500mg", dose: "3×1 / day oral", availability: "available" },
  { id: "2", name: "Metformin 500mg", dose: "2×1 / day oral", availability: "available" },
  { id: "3", name: "Lansoprazole 30mg", dose: "1×1 / day oral", availability: "limited" }
], qo = {
  available: "normal",
  limited: "low",
  unavailable: "critical"
};
function Jo({
  lang: e = "en",
  medications: a = Uo,
  ...n
}) {
  return /* @__PURE__ */ o(be, { lang: e, activeNav: "medications", ...n, children: [
    /* @__PURE__ */ t(
      Qe,
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
    /* @__PURE__ */ o("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(ka, { className: "h-6 w-6 text-teal-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: f(d("Medication Orders", "Order Obat"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((s) => /* @__PURE__ */ o(
      "li",
      {
        className: "flex min-h-14 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3",
        children: [
          /* @__PURE__ */ o("div", { children: [
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: s.name }),
            /* @__PURE__ */ t("p", { className: "text-sm text-slate-600", children: s.dose })
          ] }),
          /* @__PURE__ */ t(J, { variant: qo[s.availability], children: s.availability === "available" ? e === "id" ? "Tersedia" : "Available" : s.availability === "limited" ? e === "id" ? "Terbatas" : "Limited" : e === "id" ? "Habis" : "Unavailable" })
        ]
      },
      s.id
    )) }),
    /* @__PURE__ */ o(M, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(Na, { className: "h-5 w-5", "aria-hidden": !0 }),
      f(d("Add medication", "Tambah obat"), e)
    ] }),
    /* @__PURE__ */ o("ul", { className: "mt-6 space-y-2 text-sm text-slate-600", children: [
      /* @__PURE__ */ o("li", { children: [
        "• ",
        e === "id" ? "Terhubung Pharmacy API" : "Connects to Pharmacy API"
      ] }),
      /* @__PURE__ */ o("li", { children: [
        "• ",
        e === "id" ? "Filter formulary asuransi" : "Insurance formulary filter"
      ] }),
      /* @__PURE__ */ o("li", { children: [
        "• ",
        e === "id" ? "Peringatan alergi otomatis" : "Auto allergy warnings"
      ] })
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-2 text-xs text-slate-400", children: le.pharmacy.search })
  ] });
}
const Zo = [
  { id: "1", name: "Complete Blood Count", category: "LAB", note: "Fasting sample required" },
  { id: "2", name: "HbA1c", category: "LAB", note: "3-month glucose average" },
  { id: "3", name: "Chest X-Ray PA", category: "RAD", note: "PA projection" }
];
function _o({
  lang: e = "en",
  orders: a = Zo,
  ...n
}) {
  return /* @__PURE__ */ o(be, { lang: e, activeNav: "labrad", ...n, children: [
    /* @__PURE__ */ t(
      Qe,
      {
        lang: e,
        name: "Budi Santoso",
        admissionNo: "ADM-001",
        mrn: "RM-2024-A",
        insurance: "BPJS",
        className: "mb-4"
      }
    ),
    /* @__PURE__ */ o("div", { className: "mb-4 flex items-center gap-2", children: [
      /* @__PURE__ */ t(Aa, { className: "h-6 w-6 text-violet-600", "aria-hidden": !0 }),
      /* @__PURE__ */ t("h2", { className: "text-lg font-bold text-slate-900", children: f(d("Lab / Radiology Orders", "Order Lab / Radiologi"), e) })
    ] }),
    /* @__PURE__ */ t("ul", { className: "space-y-3", children: a.map((s) => /* @__PURE__ */ t(
      "li",
      {
        className: "rounded-xl border border-slate-200 bg-white px-4 py-4",
        children: /* @__PURE__ */ t("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ t(J, { variant: s.category === "LAB" ? "info" : "ai", children: s.category }),
            /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: s.name })
          ] }),
          s.note ? /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: s.note }) : null
        ] }) })
      },
      s.id
    )) }),
    /* @__PURE__ */ o(M, { variant: "secondary", fullWidth: !0, className: "mt-4 min-h-12 gap-2", children: [
      /* @__PURE__ */ t(Na, { className: "h-5 w-5", "aria-hidden": !0 }),
      f(d("Add lab / radiology", "Tambah lab / radiologi"), e)
    ] }),
    /* @__PURE__ */ t("p", { className: "mt-4 text-xs text-slate-400", children: le.lab.search })
  ] });
}
const $o = [
  { key: "start", en: "Start consultation", id: "Mulai konsultasi" },
  { key: "stt", en: "Live STT transcript", id: "Transkrip langsung" },
  { key: "stop", en: "Stop / keyword", id: "Berhenti / kata kunci" },
  { key: "ai", en: "AI → SOAP + ICD-10 + Rx", id: "AI → SOAP + ICD-10 + Rx" },
  { key: "review", en: "Doctor review & submit", id: "Tinjau & simpan" }
];
function el({
  lang: e = "en",
  orientation: a = "landscape",
  ...n
}) {
  const [s, r] = D("review"), l = e === "id" ? "Pasien mengeluh batuk kering dua hari. Tidak sesak. Demam subfebril." : "Patient reports dry cough for two days. No shortness of breath. Low-grade fever.";
  return /* @__PURE__ */ o(be, { lang: e, activeNav: "ai-voice", orientation: a, ...n, children: [
    /* @__PURE__ */ t(
      Qe,
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
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-2" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ o("div", { className: "space-y-4", children: [
            /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-3", children: [
              /* @__PURE__ */ o(
                M,
                {
                  variant: "success",
                  className: "min-h-14 min-w-32",
                  onClick: () => r("listening"),
                  disabled: s === "listening",
                  children: [
                    /* @__PURE__ */ t(Le, { className: "h-5 w-5", "aria-hidden": !0 }),
                    f(d("Start AI", "Mulai AI"), e)
                  ]
                }
              ),
              /* @__PURE__ */ o(
                M,
                {
                  variant: "danger",
                  className: "min-h-14",
                  onClick: () => r("processing"),
                  children: [
                    /* @__PURE__ */ t(ur, { className: "h-5 w-5", "aria-hidden": !0 }),
                    f(d("Stop", "Berhenti"), e)
                  ]
                }
              )
            ] }),
            s === "listening" ? /* @__PURE__ */ o("div", { className: "flex items-center gap-3 rounded-xl bg-red-50 px-4 py-3", children: [
              /* @__PURE__ */ o("span", { className: "relative flex h-3 w-3", children: [
                /* @__PURE__ */ t("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" }),
                /* @__PURE__ */ t("span", { className: "relative inline-flex h-3 w-3 rounded-full bg-red-600" })
              ] }),
              /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-red-800", children: e === "id" ? "Mendengarkan…" : "Listening…" })
            ] }) : null,
            /* @__PURE__ */ t(
              te,
              {
                lang: e,
                label: d("Live transcript", "Transkrip langsung"),
                value: l,
                rows: 8,
                readOnly: !0
              }
            ),
            /* @__PURE__ */ t("ol", { className: "space-y-2 text-sm text-slate-600", children: $o.map((c, i) => /* @__PURE__ */ o("li", { className: "flex gap-2", children: [
              /* @__PURE__ */ o("span", { className: "font-bold text-teal-600", children: [
                i + 1,
                "."
              ] }),
              e === "id" ? c.id : c.en
            ] }, c.key)) })
          ] }),
          /* @__PURE__ */ o("div", { className: "rounded-2xl border border-violet-200 bg-violet-50/50 p-4", children: [
            /* @__PURE__ */ o("div", { className: "mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ t(Ca, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
              /* @__PURE__ */ t("h3", { className: "font-bold text-slate-900", children: f(d("AI-generated SOAP", "SOAP dari AI"), e) })
            ] }),
            /* @__PURE__ */ t(
              te,
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
            /* @__PURE__ */ t(M, { fullWidth: !0, className: "mt-4 min-h-14", children: f(d("Approve & submit", "Setujui & simpan"), e) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ o("p", { className: "mt-4 text-xs text-slate-400", children: [
      le.ai.analyze,
      " · ",
      le.consultations.submit
    ] })
  ] });
}
const tl = {
  "layout-dashboard": Rs,
  upload: st,
  users: Me,
  brain: rs,
  stethoscope: nt,
  "message-circle": ya,
  history: Gs,
  settings: or
};
function se({
  children: e,
  lang: a = "en",
  activeNav: n = "dashboard",
  onNavChange: s,
  doctorName: r = "Dr. Sarah Chen",
  role: l,
  locale: c,
  onLocaleChange: i,
  onLogout: m,
  notificationCount: u = 2,
  offlineStatus: p = "online",
  pendingUploads: g = 0,
  orientation: y = "landscape",
  showSecurityBar: v = !0,
  className: C
}) {
  const N = c ?? a, B = l ?? (a === "id" ? "Dokter Klinis" : "Clinical Doctor");
  return /* @__PURE__ */ o(
    "div",
    {
      className: h(
        "flex min-h-screen flex-col bg-slate-100",
        y === "portrait" && "min-h-[1280px]",
        C
      ),
      children: [
        /* @__PURE__ */ o("header", { className: "sticky top-0 z-20 flex min-h-14 shrink-0 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-2 md:px-6", children: [
          /* @__PURE__ */ o("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ t(
              "div",
              {
                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white",
                "aria-hidden": !0,
                children: "A"
              }
            ),
            /* @__PURE__ */ t("div", { className: "hidden sm:block leading-tight", children: /* @__PURE__ */ o("span", { className: "text-lg font-bold text-slate-900", children: [
              "alocare",
              /* @__PURE__ */ t("span", { className: "text-emerald-600", children: ".ai" })
            ] }) })
          ] }),
          /* @__PURE__ */ o("div", { className: "flex flex-1 items-center justify-end gap-3", children: [
            /* @__PURE__ */ o("div", { className: "hidden items-center gap-2 md:flex", children: [
              /* @__PURE__ */ t(Ka, { fallback: "SC", size: "md" }),
              /* @__PURE__ */ o("div", { className: "text-right", children: [
                /* @__PURE__ */ t("p", { className: "text-sm font-semibold text-slate-900", children: r }),
                /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: B })
              ] })
            ] }),
            i ? /* @__PURE__ */ t(he, { locale: N, onChange: i }) : null,
            /* @__PURE__ */ o(
              M,
              {
                variant: "ghost",
                size: "md",
                className: "relative min-w-12",
                "aria-label": a === "id" ? "Notifikasi" : "Notifications",
                children: [
                  /* @__PURE__ */ t(pa, { className: "h-5 w-5", "aria-hidden": !0 }),
                  u > 0 ? /* @__PURE__ */ t("span", { className: "absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white", children: u }) : null
                ]
              }
            ),
            /* @__PURE__ */ t(
              M,
              {
                variant: "ghost",
                size: "md",
                onClick: m,
                "aria-label": a === "id" ? "Keluar" : "Logout",
                children: /* @__PURE__ */ t(va, { className: "h-5 w-5", "aria-hidden": !0 })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ o("div", { className: "flex flex-1 overflow-hidden", children: [
          /* @__PURE__ */ t(
            "nav",
            {
              className: h(
                "sticky top-14 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-2",
                y === "landscape" ? "w-56" : "w-20"
              ),
              "aria-label": a === "id" ? "Menu utama" : "Main menu",
              children: /* @__PURE__ */ t("ul", { className: "space-y-1", children: Oo.map((P) => {
                const j = tl[P.icon], T = n === P.id;
                return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    onClick: () => s == null ? void 0 : s(P.id),
                    className: h(
                      "flex w-full min-h-12 touch-manipulation items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                      T ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                    ),
                    "aria-current": T ? "page" : void 0,
                    children: [
                      /* @__PURE__ */ t(j, { className: "h-5 w-5 shrink-0", "aria-hidden": !0 }),
                      y === "landscape" ? /* @__PURE__ */ t("span", { className: "text-sm font-semibold", children: f(P.label, a) }) : /* @__PURE__ */ t("span", { className: "sr-only", children: f(P.label, a) })
                    ]
                  }
                ) }, P.id);
              }) })
            }
          ),
          /* @__PURE__ */ o("main", { className: "flex min-w-0 flex-1 flex-col overflow-auto p-4 md:p-6", children: [
            v ? /* @__PURE__ */ t(Ja, { lang: a, role: B, className: "mb-4" }) : null,
            p !== "online" ? /* @__PURE__ */ t(
              qa,
              {
                status: p,
                lang: a,
                pendingCount: g,
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
const ti = se, al = d(
  "Overall stable. Platelet count slightly below reference. LDL mildly elevated.",
  "Secara umum stabil. Trombosit sedikit di bawah referensi. LDL sedikit meningkat."
), nl = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "Glucose", value: "118 mg/dL", status: "high" }
], sl = [
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
function Za({
  lang: e = "en",
  orientation: a = "landscape",
  ...n
}) {
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "analysis", orientation: a, ...n, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("AI Analysis", "Analisis AI"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-3" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ o(
            "section",
            {
              className: "space-y-3",
              "aria-label": e === "id" ? "Pratinjau laporan" : "Report preview",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Laporan" : "Report" }),
                /* @__PURE__ */ o("div", { className: "flex aspect-[3/4] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm", children: [
                  /* @__PURE__ */ t(me, { className: "h-20 w-20 text-red-400", "aria-hidden": !0 }),
                  /* @__PURE__ */ t("p", { className: "mt-4 text-center text-sm font-semibold text-slate-900", children: "Blood Test Report.pdf" }),
                  /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: "2.4 MB · PDF" })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Analisis AI" : "AI analysis",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Hasil AI" : "AI Results" }),
                /* @__PURE__ */ t(Ae, { summary: al, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(dt, { findings: nl, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ o("div", { className: "flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4", children: [
                  /* @__PURE__ */ t(vo, { level: "medium", lang: e }),
                  /* @__PURE__ */ t("p", { className: "text-lg font-bold text-blue-600", children: "96%" })
                ] }),
                /* @__PURE__ */ t(ct, { score: 96, lang: e, dualLanguageTitle: !0 })
              ]
            }
          ),
          /* @__PURE__ */ o(
            "section",
            {
              className: "space-y-4",
              "aria-label": e === "id" ? "Tindakan dokter" : "Doctor actions",
              children: [
                /* @__PURE__ */ t("h2", { className: "text-sm font-semibold uppercase tracking-wide text-slate-500", children: e === "id" ? "Tindakan" : "Actions" }),
                /* @__PURE__ */ t(Ha, { items: sl, lang: e, dualLanguageTitle: !0 }),
                /* @__PURE__ */ t(
                  te,
                  {
                    lang: e,
                    label: d("Doctor notes", "Catatan dokter"),
                    placeholder: e === "id" ? "Tambahkan catatan klinis…" : "Add clinical notes…",
                    rows: 4
                  }
                ),
                /* @__PURE__ */ o("div", { className: "grid grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ t(M, { variant: "success", fullWidth: !0, children: e === "id" ? "Setujui" : "Approve" }),
                  /* @__PURE__ */ t(M, { variant: "secondary", fullWidth: !0, children: e === "id" ? "Validasi" : "Validate" })
                ] }),
                /* @__PURE__ */ t(M, { fullWidth: !0, children: e === "id" ? "Tindak lanjut" : "Follow-up" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function rl({ lang: e = "en", orientation: a = "landscape" }) {
  return /* @__PURE__ */ t(Za, { lang: e, orientation: a });
}
function ai({
  lang: e = "en",
  orientation: a = "landscape",
  startScreen: n = "worklist"
}) {
  const [s, r] = D(n !== "login"), [l, c] = D("worklist");
  if (!s)
    return /* @__PURE__ */ t(
      Ua,
      {
        lang: e,
        onLogin: () => r(!0)
      }
    );
  const i = { lang: e, orientation: a, onNavChange: c, activeNav: l };
  switch (l) {
    case "consultation":
      return /* @__PURE__ */ t(Yo, { ...i, activeNav: "consultation" });
    case "medications":
      return /* @__PURE__ */ t(Jo, { ...i, activeNav: "medications" });
    case "labrad":
      return /* @__PURE__ */ t(_o, { ...i, activeNav: "labrad" });
    case "ai-voice":
      return /* @__PURE__ */ t(el, { ...i, activeNav: "ai-voice" });
    case "reports":
      return /* @__PURE__ */ t(rl, { lang: e, orientation: a });
    default:
      return /* @__PURE__ */ t(
        Wo,
        {
          ...i,
          activeNav: "worklist",
          onCallPatient: () => c("consultation")
        }
      );
  }
}
const Ie = {
  today: d("Today's Patients", "Pasien Hari Ini"),
  uploads: d("Recent Uploads", "Unggahan Terbaru"),
  alerts: d("AI Alerts", "Peringatan AI"),
  quick: d("Quick Actions", "Aksi Cepat")
}, ol = [
  { id: "upload", icon: st, label: d("Upload Report", "Unggah Laporan") },
  { id: "consult", icon: Ba, label: d("Start Consultation", "Mulai Konsultasi") },
  { id: "ai", icon: ya, label: d("Ask AI", "Tanya AI") },
  { id: "history", icon: bs, label: d("View History", "Lihat Riwayat") }
], ll = [
  { id: "1", message: d("Low platelet", "Trombosit rendah"), severity: "warning" },
  { id: "2", message: d("High glucose", "Glukosa tinggi"), severity: "warning" },
  { id: "3", message: d("Follow-up needed", "Perlu tindak lanjut"), severity: "info" }
];
function il({
  lang: e = "en",
  todayPatients: a = 8,
  pendingReview: n = 2,
  urgent: s = 1,
  recentUploads: r = 5,
  aiAlerts: l = ll,
  ...c
}) {
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "dashboard", ...c, children: [
    /* @__PURE__ */ o("div", { className: "mb-6", children: [
      /* @__PURE__ */ t(
        F,
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
    /* @__PURE__ */ o("div", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ t(R, { children: /* @__PURE__ */ t(O, { className: "py-5", children: /* @__PURE__ */ o("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t(F, { label: Ie.today, lang: e, as: "h2" }),
          /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: a }),
          /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "pasien hari ini" : "patients today" }),
          /* @__PURE__ */ o("ul", { className: "mt-4 space-y-2 text-sm", children: [
            /* @__PURE__ */ o("li", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ t(Me, { className: "h-4 w-4 text-blue-600", "aria-hidden": !0 }),
              n,
              " ",
              e === "id" ? "menunggu tinjauan" : "pending review"
            ] }),
            /* @__PURE__ */ o("li", { className: "flex items-center gap-2 text-amber-700", children: [
              /* @__PURE__ */ t(Ze, { className: "h-4 w-4", "aria-hidden": !0 }),
              s,
              " ",
              e === "id" ? "mendesak" : "urgent"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ t("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50", children: /* @__PURE__ */ t(Me, { className: "h-6 w-6 text-blue-600", "aria-hidden": !0 }) })
      ] }) }) }),
      /* @__PURE__ */ t(R, { children: /* @__PURE__ */ o(O, { className: "py-5", children: [
        /* @__PURE__ */ t(F, { label: Ie.uploads, lang: e, as: "h2" }),
        /* @__PURE__ */ t("p", { className: "mt-3 text-4xl font-bold text-slate-900", children: r }),
        /* @__PURE__ */ t("p", { className: "mt-2 text-sm text-slate-600", children: e === "id" ? "laporan terbaru" : "recent reports" })
      ] }) }),
      /* @__PURE__ */ t(R, { className: "md:col-span-2", children: /* @__PURE__ */ o(O, { className: "py-5", children: [
        /* @__PURE__ */ t(F, { label: Ie.alerts, lang: e, as: "h2" }),
        /* @__PURE__ */ t("ul", { className: "mt-4 space-y-3", children: l.map((i) => /* @__PURE__ */ o(
          "li",
          {
            className: h(
              "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3",
              i.severity === "warning" ? "bg-amber-50" : "bg-sky-50"
            ),
            children: [
              /* @__PURE__ */ t(
                Ze,
                {
                  className: h(
                    "h-5 w-5 shrink-0",
                    i.severity === "warning" ? "text-amber-600" : "text-sky-600"
                  ),
                  "aria-hidden": !0
                }
              ),
              /* @__PURE__ */ t("span", { className: "text-sm font-medium text-slate-900", children: f(i.message, e) })
            ]
          },
          i.id
        )) })
      ] }) }),
      /* @__PURE__ */ t(R, { className: "md:col-span-2", children: /* @__PURE__ */ o(O, { className: "py-5", children: [
        /* @__PURE__ */ t(F, { label: Ie.quick, lang: e, as: "h2" }),
        /* @__PURE__ */ t("div", { className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4", children: ol.map((i) => {
          const m = i.icon;
          return /* @__PURE__ */ o(
            M,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-14 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t(m, { className: "h-6 w-6", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs", children: f(i.label, e) })
              ]
            },
            i.id
          );
        }) })
      ] }) })
    ] })
  ] });
}
const cl = [
  { id: "camera", icon: ds, label: d("Camera", "Kamera"), emoji: "📷" },
  { id: "pdf", icon: me, label: d("PDF", "PDF"), emoji: "📄" },
  { id: "gallery", icon: Ls, label: d("Gallery", "Galeri"), emoji: "🖼" },
  { id: "voice", icon: Le, label: d("Voice", "Suara"), emoji: "🎤" }
], Wt = ["uploaded", "ocr", "analyzing", "completed"];
function dl({
  lang: e = "en",
  pipelineStatus: a = "analyzing",
  progress: n = 65,
  fileName: s = "Blood Test Report.pdf",
  ...r
}) {
  const [l, c] = D(
    a !== "idle" ? "success" : "empty"
  );
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "upload", ...r, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("Upload Report", "Unggah Laporan"),
        lang: e,
        as: "h1",
        className: "mb-2 text-2xl"
      }
    ),
    /* @__PURE__ */ t("p", { className: "mb-6 text-slate-600", children: e === "id" ? "Unggah PDF, gambar, atau rekam suara — dioptimalkan untuk sentuhan." : "Upload PDF, image, or voice — optimized for touch." }),
    /* @__PURE__ */ o("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ o("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(
          za,
          {
            lang: e,
            state: l,
            className: "max-w-none",
            onFilesSelected: () => c("success")
          }
        ),
        /* @__PURE__ */ t("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: cl.map((i) => {
          const m = i.icon;
          return /* @__PURE__ */ o(
            M,
            {
              variant: "secondary",
              fullWidth: !0,
              className: "h-auto min-h-20 flex-col gap-2 py-4",
              children: [
                /* @__PURE__ */ t("span", { className: "text-2xl", "aria-hidden": !0, children: i.emoji }),
                /* @__PURE__ */ t(m, { className: "h-5 w-5 sm:hidden", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "text-xs font-semibold", children: f(i.label, e) })
              ]
            },
            i.id
          );
        }) })
      ] }),
      /* @__PURE__ */ t("div", { className: "space-y-4", children: a !== "idle" ? /* @__PURE__ */ o(Ue, { children: [
        /* @__PURE__ */ t(Ta, { fileName: s, lang: e, uploaded: !0 }),
        /* @__PURE__ */ o("div", { className: "overflow-hidden rounded-xl border border-slate-200 bg-white p-4", children: [
          /* @__PURE__ */ t("div", { className: "mb-3 flex aspect-[4/3] items-center justify-center rounded-lg bg-slate-100", children: /* @__PURE__ */ t(me, { className: "h-16 w-16 text-red-400", "aria-hidden": !0 }) }),
          /* @__PURE__ */ t("p", { className: "truncate text-sm font-semibold", children: s }),
          a === "ocr" || a === "analyzing" ? /* @__PURE__ */ t(ja, { value: n, className: "mt-3", showLabel: !0 }) : null
        ] }),
        /* @__PURE__ */ t("ol", { className: "space-y-2", children: Wt.map((i, m) => {
          const u = Math.max(0, Wt.indexOf(a)), p = m < u || a === "completed", g = a === i;
          return /* @__PURE__ */ o(
            "li",
            {
              className: h(
                "flex min-h-12 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                p && "bg-emerald-50 text-emerald-800",
                g && "bg-blue-50 text-blue-800",
                !p && !g && "bg-slate-50 text-slate-500"
              ),
              children: [
                /* @__PURE__ */ t(
                  "span",
                  {
                    className: h(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                      p && "bg-emerald-600 text-white",
                      g && "bg-blue-600 text-white",
                      !p && !g && "bg-slate-200 text-slate-600"
                    ),
                    children: m + 1
                  }
                ),
                f(Ko[i], e)
              ]
            },
            i
          );
        }) })
      ] }) : null })
    ] })
  ] });
}
const ml = [
  { date: "May 15, 2024", event: d("Lab report uploaded", "Laporan lab diunggah") },
  { date: "May 14, 2024", event: d("AI analysis completed", "Analisis AI selesai") },
  { date: "May 10, 2024", event: d("Follow-up scheduled", "Kontrol dijadwalkan") }
], ul = [
  { label: "BP", value: "120/80" },
  { label: "HR", value: "72 bpm" },
  { label: "Temp", value: "36.8 °C" }
];
function hl({
  lang: e = "en",
  name: a,
  mrn: n,
  age: s = 45,
  gender: r,
  embedded: l = !1,
  className: c
}) {
  const i = r ?? (e === "id" ? "Laki-laki" : "Male"), m = d(
    "Stable overall. Mild thrombocytopenia noted on latest labs.",
    "Secara umum stabil. Trombositopenia ringan pada lab terbaru."
  ), u = /* @__PURE__ */ o("div", { className: h("space-y-4", c), children: [
    /* @__PURE__ */ o("div", { children: [
      /* @__PURE__ */ t("h2", { className: "text-xl font-bold text-slate-900", children: a }),
      /* @__PURE__ */ o("p", { className: "text-sm text-slate-500", children: [
        n,
        " · ",
        s,
        " · ",
        i
      ] })
    ] }),
    /* @__PURE__ */ t("div", { className: "grid grid-cols-3 gap-2", children: ul.map((p) => /* @__PURE__ */ t(R, { children: /* @__PURE__ */ o(O, { className: "py-3 text-center", children: [
      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: p.label }),
      /* @__PURE__ */ t("p", { className: "text-sm font-bold", children: p.value })
    ] }) }, p.label)) }),
    /* @__PURE__ */ t(Ae, { summary: m, lang: e }),
    /* @__PURE__ */ t(R, { children: /* @__PURE__ */ o(O, { children: [
      /* @__PURE__ */ o("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(nt, { className: "h-5 w-5 text-teal-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          F,
          {
            label: d("Doctor Notes", "Catatan Dokter"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("p", { className: "text-sm text-slate-700", children: e === "id" ? "Pantau trombosit. Kontrol ulang dalam 3 bulan." : "Monitor platelets. Repeat CBC in 3 months." })
    ] }) }),
    /* @__PURE__ */ t(R, { children: /* @__PURE__ */ o(O, { children: [
      /* @__PURE__ */ o("div", { className: "mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ t(ha, { className: "h-5 w-5 text-violet-600", "aria-hidden": !0 }),
        /* @__PURE__ */ t(
          F,
          {
            label: d("Medical Timeline", "Linimasa Medis"),
            lang: e,
            as: "h3"
          }
        )
      ] }),
      /* @__PURE__ */ t("ul", { className: "space-y-3", children: ml.map((p) => /* @__PURE__ */ o("li", { className: "flex gap-3 text-sm", children: [
        /* @__PURE__ */ t(me, { className: "mt-0.5 h-4 w-4 shrink-0 text-slate-400", "aria-hidden": !0 }),
        /* @__PURE__ */ o("div", { children: [
          /* @__PURE__ */ t("p", { className: "font-medium text-slate-900", children: f(p.event, e) }),
          /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: p.date })
        ] })
      ] }, p.date)) })
    ] }) }),
    /* @__PURE__ */ o("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ t(J, { variant: "low", children: e === "id" ? "Trombosit rendah" : "Low platelet" }),
      /* @__PURE__ */ t(J, { variant: "normal", children: e === "id" ? "Stabil" : "Stable" })
    ] })
  ] });
  return l ? u : /* @__PURE__ */ t("div", { className: "max-w-2xl p-4", children: u });
}
const pl = [
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
], gl = {
  waiting: "info",
  "in-review": "ai",
  "follow-up": "low"
};
function fl({
  lang: e = "en",
  patients: a = pl,
  orientation: n = "landscape",
  ...s
}) {
  var i;
  const [r, l] = D((i = a[0]) == null ? void 0 : i.id), c = a.find((m) => m.id === r);
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "queue", orientation: n, ...s, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("Patient Queue", "Antrian Pasien"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ t(
      ee,
      {
        lang: e,
        label: d("Search", "Cari"),
        placeholder: e === "id" ? "Nama pasien, MRN, atau telepon" : "Patient name, MRN, or phone",
        className: "mb-4 max-w-xl"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "flex min-h-[480px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          n === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ t(
            "ul",
            {
              className: h(
                "divide-y divide-slate-100 overflow-y-auto",
                n === "landscape" ? "w-80 shrink-0 border-r" : "max-h-64"
              ),
              role: "listbox",
              "aria-label": e === "id" ? "Daftar pasien" : "Patient list",
              children: a.map((m) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
                "button",
                {
                  type: "button",
                  role: "option",
                  "aria-selected": r === m.id,
                  onClick: () => l(m.id),
                  className: h(
                    "flex w-full min-h-14 touch-manipulation items-center justify-between gap-3 px-4 py-4 text-left transition-colors",
                    r === m.id ? "bg-blue-50" : "hover:bg-slate-50"
                  ),
                  children: [
                    /* @__PURE__ */ o("div", { children: [
                      /* @__PURE__ */ t("p", { className: "font-semibold text-slate-900", children: m.name }),
                      /* @__PURE__ */ t("p", { className: "text-xs text-slate-500", children: m.mrn })
                    ] }),
                    /* @__PURE__ */ t(J, { variant: gl[m.status], children: f(m.statusLabel, e) })
                  ]
                }
              ) }, m.id))
            }
          ),
          /* @__PURE__ */ t("div", { className: "min-w-0 flex-1 overflow-y-auto p-4", children: c ? /* @__PURE__ */ t(
            hl,
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
const Al = d(
  "Platelet mildly low. Otherwise stable. Recommend repeat CBC in 3 months.",
  "Trombosit sedikit rendah. Selain itu stabil. Disarankan ulang CBC dalam 3 bulan."
), bl = [
  { label: "Platelet", value: "142,000 /µL", status: "low" },
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" }
], xl = [
  { value: "approve", label: d("Approve", "Setujui"), icon: tt, variant: "success" },
  { value: "partial", label: d("Partial approve", "Setujui sebagian"), icon: wa, variant: "secondary" },
  { value: "reject", label: d("Reject", "Tolak"), icon: Cr, variant: "danger" }
];
function _a({
  lang: e = "en",
  onSubmit: a,
  ...n
}) {
  const [s, r] = D("approve"), [l, c] = D(""), [i, m] = D(
    e === "id" ? `Ulang CBC
Pantau 3 bulan` : `Repeat CBC
Monitor 3 months`
  );
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "review", ...n, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("Doctor Review", "Tinjauan Dokter"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ o("div", { className: "grid gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ o("div", { className: "space-y-4", children: [
        /* @__PURE__ */ t(Ae, { summary: Al, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(dt, { findings: bl, lang: e, dualLanguageTitle: !0 }),
        /* @__PURE__ */ t(ct, { score: 96, lang: e, dualLanguageTitle: !0 })
      ] }),
      /* @__PURE__ */ o("div", { className: "space-y-4 rounded-2xl border border-slate-200 bg-white p-6", children: [
        /* @__PURE__ */ t(
          te,
          {
            lang: e,
            label: d("Editable doctor notes", "Catatan dokter"),
            value: l,
            onChange: (u) => c(u.target.value),
            placeholder: e === "id" ? "Tambahkan atau koreksi temuan AI…" : "Add or correct AI findings…",
            rows: 5
          }
        ),
        /* @__PURE__ */ t(
          te,
          {
            lang: e,
            label: d("Add recommendation", "Tambah rekomendasi"),
            value: i,
            onChange: (u) => m(u.target.value),
            rows: 3
          }
        ),
        /* @__PURE__ */ o("fieldset", { children: [
          /* @__PURE__ */ t("legend", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Keputusan" : "Decision" }),
          /* @__PURE__ */ t("div", { className: "grid gap-3 sm:grid-cols-3", children: xl.map((u) => {
            const p = u.icon;
            return /* @__PURE__ */ o(
              M,
              {
                variant: s === u.value ? u.variant : "secondary",
                fullWidth: !0,
                className: "min-h-14",
                onClick: () => r(u.value),
                "aria-pressed": s === u.value,
                children: [
                  /* @__PURE__ */ t(p, { className: "h-5 w-5", "aria-hidden": !0 }),
                  f(u.label, e)
                ]
              },
              u.value
            );
          }) })
        ] }),
        /* @__PURE__ */ t(
          M,
          {
            fullWidth: !0,
            size: "xl",
            className: "min-h-14",
            leftIcon: /* @__PURE__ */ t(wa, { className: "h-5 w-5", "aria-hidden": !0 }),
            onClick: () => a == null ? void 0 : a(s, l),
            children: e === "id" ? "Tanda tangan & kirim" : "Sign & submit"
          }
        )
      ] })
    ] })
  ] });
}
const vl = [
  d("Is this platelet concerning?", "Apakah trombosit ini mengkhawatirkan?"),
  d("Summarize in Bahasa Indonesia", "Ringkas dalam Bahasa Indonesia"),
  d("Generate patient explanation", "Buat penjelasan untuk pasien")
], yl = [
  d("Explain to patient", "Jelaskan ke pasien"),
  d("Doctor summary", "Ringkasan dokter"),
  d("Compare previous result", "Bandingkan hasil sebelumnya")
], wl = [
  { id: "1", title: "Platelet review", time: "10:32" },
  { id: "2", title: "Lab summary ID", time: "09:15" },
  { id: "3", title: "Glucose context", time: "Yesterday" }
], kl = [
  {
    role: "user",
    content: "Is this platelet count concerning for this patient?"
  },
  {
    role: "assistant",
    content: "142,000 /µL is mildly below the typical reference range. Consider clinical context, symptoms, and trend vs prior labs. Follow-up CBC in 3 months is reasonable if stable."
  }
];
function Nl({
  lang: e = "en",
  orientation: a = "landscape",
  ...n
}) {
  const [s, r] = D(kl), [l, c] = D("1");
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "chat", orientation: a, ...n, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("Chat Assistant", "Asisten Chat"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "flex min-h-[520px] gap-4 overflow-hidden rounded-2xl border border-slate-200 bg-white",
          a === "portrait" ? "flex-col" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ o(
            "aside",
            {
              className: h(
                "shrink-0 overflow-y-auto border-slate-200 bg-slate-50 p-3",
                a === "landscape" ? "w-56 border-r" : "max-h-40 border-b"
              ),
              children: [
                /* @__PURE__ */ t("p", { className: "mb-2 px-2 text-xs font-semibold uppercase text-slate-500", children: e === "id" ? "Riwayat" : "History" }),
                /* @__PURE__ */ t("ul", { className: "space-y-1", children: wl.map((i) => /* @__PURE__ */ t("li", { children: /* @__PURE__ */ o(
                  "button",
                  {
                    type: "button",
                    onClick: () => c(i.id),
                    className: h(
                      "flex w-full min-h-12 touch-manipulation flex-col rounded-xl px-3 py-3 text-left text-sm",
                      l === i.id ? "bg-blue-100 font-semibold text-blue-800" : "hover:bg-white"
                    ),
                    children: [
                      /* @__PURE__ */ t("span", { children: i.title }),
                      /* @__PURE__ */ t("span", { className: "text-xs text-slate-500", children: i.time })
                    ]
                  }
                ) }, i.id)) })
              ]
            }
          ),
          /* @__PURE__ */ o("div", { className: "flex min-w-0 flex-1 flex-col", children: [
            /* @__PURE__ */ t("div", { className: "flex-1 space-y-4 overflow-y-auto p-4", children: s.map((i, m) => /* @__PURE__ */ t(Va, { role: i.role, content: i.content }, m)) }),
            /* @__PURE__ */ o("div", { className: "border-t border-slate-100 p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-2 text-xs font-semibold text-slate-500", children: e === "id" ? "Saran pertanyaan" : "Suggested prompts" }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: vl.map((i, m) => /* @__PURE__ */ t(
                M,
                {
                  variant: "secondary",
                  size: "md",
                  className: "h-auto min-h-12 whitespace-normal py-2 text-left text-xs",
                  onClick: () => r((u) => [
                    ...u,
                    { role: "user", content: f(i, e) }
                  ]),
                  children: f(i, e)
                },
                m
              )) }),
              /* @__PURE__ */ t("div", { className: "mb-3 flex flex-wrap gap-2", children: yl.map((i, m) => /* @__PURE__ */ t(M, { variant: "ghost", size: "md", children: f(i, e) }, m)) }),
              /* @__PURE__ */ t(
                Bo,
                {
                  lang: e,
                  onSend: (i) => r((m) => [...m, { role: "user", content: i }])
                }
              )
            ] })
          ] })
        ]
      }
    )
  ] });
}
const Cl = d(
  "Patient reports mild cough and low-grade fever. Vitals stable on video assessment.",
  "Pasien melaporkan batuk ringan dan demam rendah. Tanda vital stabil pada penilaian video."
), Bl = [
  { role: "assistant", content: "Patient: I have had a cough for two days." },
  { role: "user", content: "Doctor: Any difficulty breathing?" },
  { role: "assistant", content: "Patient: No, just a mild dry cough." }
];
function El({
  lang: e = "en",
  orientation: a = "landscape",
  ...n
}) {
  return /* @__PURE__ */ o(se, { lang: e, activeNav: "dashboard", ...n, children: [
    /* @__PURE__ */ t(
      F,
      {
        label: d("Telemedicine", "Telemedicine"),
        lang: e,
        as: "h1",
        className: "mb-4 text-2xl"
      }
    ),
    /* @__PURE__ */ o(
      "div",
      {
        className: h(
          "grid gap-4",
          a === "landscape" ? "lg:grid-cols-[1fr_280px]" : "grid-cols-1"
        ),
        children: [
          /* @__PURE__ */ o("div", { className: "space-y-4", children: [
            /* @__PURE__ */ o("div", { className: "relative aspect-video overflow-hidden rounded-2xl bg-slate-900", children: [
              /* @__PURE__ */ o("div", { className: "absolute inset-0 flex items-center justify-center text-white/60", children: [
                /* @__PURE__ */ t(Ba, { className: "h-16 w-16", "aria-hidden": !0 }),
                /* @__PURE__ */ t("span", { className: "sr-only", children: e === "id" ? "Video pasien" : "Patient video" })
              ] }),
              /* @__PURE__ */ t("div", { className: "absolute bottom-4 left-4 h-24 w-32 overflow-hidden rounded-lg border-2 border-white/30 bg-slate-800", children: /* @__PURE__ */ t("div", { className: "flex h-full items-center justify-center text-xs text-white/50", children: e === "id" ? "Dokter" : "Doctor" }) }),
              /* @__PURE__ */ o("div", { className: "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3 rounded-full bg-slate-900/80 px-4 py-3", children: [
                /* @__PURE__ */ t(
                  M,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Bisukan" : "Mute",
                    children: /* @__PURE__ */ t(Le, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  M,
                  {
                    variant: "ghost",
                    className: "min-h-12 min-w-12 rounded-full bg-white/10 text-white hover:bg-white/20",
                    "aria-label": e === "id" ? "Kamera" : "Camera",
                    children: /* @__PURE__ */ t(vr, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                ),
                /* @__PURE__ */ t(
                  M,
                  {
                    variant: "danger",
                    className: "min-h-12 min-w-12 rounded-full",
                    "aria-label": e === "id" ? "Akhiri panggilan" : "End call",
                    children: /* @__PURE__ */ t(Us, { className: "h-5 w-5", "aria-hidden": !0 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ o("div", { className: "rounded-2xl border border-slate-200 bg-white p-4", children: [
              /* @__PURE__ */ t("p", { className: "mb-3 text-sm font-semibold text-slate-900", children: e === "id" ? "Transkrip langsung" : "Live transcript" }),
              /* @__PURE__ */ t("div", { className: "max-h-40 space-y-2 overflow-y-auto", children: Bl.map((s, r) => /* @__PURE__ */ t(Va, { role: s.role, content: s.content }, r)) })
            ] })
          ] }),
          /* @__PURE__ */ o("aside", { className: "space-y-4", children: [
            /* @__PURE__ */ t(Ae, { summary: Cl, lang: e }),
            /* @__PURE__ */ t(M, { fullWidth: !0, variant: "success", className: "min-h-14", children: e === "id" ? "Simpan ringkasan" : "Save summary" })
          ] })
        ]
      }
    )
  ] });
}
const ni = {
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
}, Il = d(
  "Overall health status appears stable. Mildly elevated LDL cholesterol noted; platelet count is slightly below reference range. Recommend follow-up in 3 months.",
  "Status kesehatan secara umum stabil. Kolesterol LDL sedikit meningkat; trombosit sedikit di bawah rentang referensi. Disarankan kontrol dalam 3 bulan."
), Pl = [
  { label: "Hemoglobin", value: "13.2 g/dL", status: "normal" },
  { label: "WBC", value: "8,100 /µL", status: "normal" },
  { label: "Platelet", value: "142,000 /µL", status: "low" }
], Ml = [
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
], Dl = [
  { en: "Upload Report", id: "Unggah Laporan", color: "bg-blue-600" },
  { en: "AI Analysis", id: "Analisis AI", color: "bg-teal-500" },
  { en: "Doctor Summary", id: "Ringkasan Dokter", color: "bg-blue-600" }
];
function si({
  lang: e = "en",
  step: a = 2
}) {
  return /* @__PURE__ */ t("div", { className: "min-h-screen bg-slate-50 p-6", children: /* @__PURE__ */ o("div", { className: "mx-auto max-w-6xl", children: [
    /* @__PURE__ */ o("div", { className: "mb-8 flex items-center justify-between", children: [
      /* @__PURE__ */ o("div", { children: [
        /* @__PURE__ */ t("h1", { className: "font-heading text-2xl font-bold text-slate-900", children: e === "id" ? "Analisis Laporan Medis" : "Medical Report Analysis" }),
        /* @__PURE__ */ t("p", { className: "mt-1 text-sm text-slate-600", children: e === "id" ? "Alur kerja AI untuk laporan medis" : "AI-powered medical report workflow" })
      ] }),
      /* @__PURE__ */ t("span", { className: "text-sm font-semibold text-blue-600", children: "alocare.ai" })
    ] }),
    /* @__PURE__ */ o("div", { className: "relative mb-10 flex justify-between px-4", children: [
      /* @__PURE__ */ t("div", { className: "absolute left-8 right-8 top-4 h-0.5 bg-slate-200", "aria-hidden": !0 }),
      Dl.map((n, s) => /* @__PURE__ */ o("div", { className: "relative z-10 flex flex-col items-center gap-2", children: [
        /* @__PURE__ */ t(
          "div",
          {
            className: `flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${s + 1 <= a ? n.color : "bg-slate-300"}`,
            children: s + 1
          }
        ),
        /* @__PURE__ */ t("span", { className: "text-center text-xs font-semibold text-slate-900", children: e === "id" ? n.id : n.en }),
        /* @__PURE__ */ t("span", { className: "text-center text-xs text-blue-600", children: e === "id" ? n.en : n.id })
      ] }, n.en))
    ] }),
    /* @__PURE__ */ o("div", { className: "grid gap-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ o("section", { className: "space-y-4", "aria-label": e === "id" ? "Unggah" : "Upload", children: [
        /* @__PURE__ */ t(za, { lang: e, state: a >= 1 ? "success" : "empty" }),
        /* @__PURE__ */ t(
          Ta,
          {
            fileName: "Blood Test Report.pdf",
            lang: e,
            uploaded: a >= 1
          }
        ),
        /* @__PURE__ */ t(uo, { lang: e, status: a >= 1 ? "complete" : "pending" })
      ] }),
      /* @__PURE__ */ o("section", { className: "space-y-4", "aria-label": e === "id" ? "Analisis AI" : "AI Analysis", children: [
        /* @__PURE__ */ t(Ae, { summary: Il, lang: e, loading: a < 2 }),
        /* @__PURE__ */ t(dt, { findings: Pl, lang: e }),
        /* @__PURE__ */ t(ct, { score: 96, lang: e })
      ] }),
      /* @__PURE__ */ t("section", { className: "space-y-4", "aria-label": e === "id" ? "Dokter" : "Doctor", children: /* @__PURE__ */ t(Ha, { items: Ml, lang: e }) })
    ] })
  ] }) });
}
function ri({
  children: e,
  sidebar: a,
  locale: n = "en",
  onLocaleChange: s,
  className: r
}) {
  return /* @__PURE__ */ o("div", { className: h("min-h-screen bg-slate-50", r), children: [
    /* @__PURE__ */ t(co, { locale: n, onLocaleChange: s }),
    /* @__PURE__ */ o("div", { className: "mx-auto flex max-w-7xl gap-6 px-6 py-6", children: [
      a ? /* @__PURE__ */ t("aside", { className: "hidden w-56 shrink-0 lg:block", "aria-label": "Sidebar", children: a }) : null,
      /* @__PURE__ */ t("main", { className: "min-w-0 flex-1", children: e })
    ] }),
    /* @__PURE__ */ t("footer", { className: "mx-auto max-w-7xl px-6 pb-8", children: /* @__PURE__ */ o("div", { className: "grid gap-3 sm:grid-cols-2", children: [
      /* @__PURE__ */ t(Ht, { variant: "privacy" }),
      /* @__PURE__ */ t(Ht, { variant: "encryption" })
    ] }) })
  ] });
}
function oi({
  lang: e = "en",
  orientation: a = "landscape",
  initialNav: n = "dashboard"
}) {
  const [s, r] = D(n), l = {
    lang: e,
    orientation: a,
    activeNav: s,
    onNavChange: r
  };
  switch (s) {
    case "upload":
      return /* @__PURE__ */ t(dl, { ...l, activeNav: "upload" });
    case "queue":
      return /* @__PURE__ */ t(fl, { ...l, activeNav: "queue" });
    case "analysis":
      return /* @__PURE__ */ t(Za, { ...l, activeNav: "analysis" });
    case "review":
      return /* @__PURE__ */ t(_a, { ...l, activeNav: "review" });
    case "chat":
      return /* @__PURE__ */ t(Nl, { ...l, activeNav: "chat" });
    default:
      return /* @__PURE__ */ t(il, { ...l, activeNav: "dashboard" });
  }
}
function li({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(_a, { lang: e, orientation: a, activeNav: "review" });
}
function ii({
  lang: e = "en",
  orientation: a = "landscape"
}) {
  return /* @__PURE__ */ t(El, { lang: e, orientation: a });
}
export {
  Wl as AIStatusBadge,
  mt as AUTH_API,
  Fo as AdminLogin,
  je as AlocareLogo,
  Hl as AlocareThemeProvider,
  ei as AuthLoginShowcase,
  Ka as Avatar,
  J as Badge,
  F as BilingualLabel,
  ne as Button,
  R as Card,
  O as CardContent,
  Xl as CardFooter,
  ue as CardHeader,
  Vl as CardTitle,
  Bo as ChatInput,
  Va as ChatMessage,
  oi as ClinicWorkflowTablet,
  Ae as ClinicalSummaryCard,
  ct as ConfidenceScore,
  ii as ConsultationTablet,
  Wa as DEFAULT_DEMO_EMAIL,
  Ya as DEFAULT_DEMO_PASSWORD,
  ri as DashboardLayout,
  Yl as DoctorReviewPanel,
  li as DoctorReviewTablet,
  el as EMRAIVoiceConsultation,
  Yo as EMRConsultationSOAP,
  _o as EMRLabRadOrders,
  Ua as EMRLogin,
  Jo as EMRMedicationOrders,
  Qe as EMRPatientBanner,
  rl as EMRReports,
  be as EMRTabletShell,
  ai as EMRWorkflowTablet,
  Wo as EMRWorklist,
  le as EMR_API,
  Ul as EmployeeHealthCard,
  Ro as HRPortalLogin,
  co as Header,
  ee as Input,
  dt as KeyFindingCard,
  he as LanguageSwitcher,
  sn as LocaleProvider,
  pt as LoginBrand,
  Go as LoginBrandPanel,
  ht as LoginCard,
  Mo as LoginCardContent,
  ql as LoginCardHeader,
  $l as LoginDemoNotes,
  _l as LoginDivider,
  Lo as LoginErrorAlert,
  gt as LoginFooter,
  ft as LoginForm,
  Zl as LoginGoogleButton,
  ut as LoginLayout,
  Jl as LoginMenuBar,
  Qo as LoginPasswordField,
  si as MedicalReportAnalysis,
  uo as OCRStatusCard,
  So as PortalLogin,
  ja as Progress,
  Ha as RecommendationList,
  vo as RiskIndicator,
  rt as Spinner,
  Ht as SystemHealthBadge,
  Za as TabletAnalysisView,
  Nl as TabletChat,
  il as TabletDashboard,
  _a as TabletDoctorReview,
  ti as TabletNav,
  hl as TabletPatientDetail,
  fl as TabletPatientQueue,
  se as TabletShell,
  El as TabletTelemedicine,
  dl as TabletUploadFlow,
  te as Textarea,
  M as TouchButton,
  za as UploadDropzone,
  Ta as UploadPreview,
  G as authCopy,
  d as bilingual,
  h as cn,
  Ql as colors,
  Vt as loginShadows,
  L as loginSizing,
  zl as motion,
  Rl as radius,
  Ol as shadows,
  Sl as spacing,
  f as t,
  ni as tabletViewports,
  Fl as typography,
  Tl as useLocale,
  Kl as zIndex
};
