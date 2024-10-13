import { r as p, R as xo, b as ci, j as F, F as ns } from "./index.171f553a.js";
const tt = p.exports.createContext({
    transformPagePoint: (t) => t,
    isStatic: !1,
    reducedMotion: "never",
  }),
  we = p.exports.createContext({});
function bo() {
  return p.exports.useContext(we).visualElement;
}
const At = p.exports.createContext(null),
  vt = typeof document < "u",
  mt = vt ? p.exports.useLayoutEffect : p.exports.useEffect,
  gn = p.exports.createContext({ strict: !1 });
function li(t, e, n, s) {
  const o = bo(),
    i = p.exports.useContext(gn),
    r = p.exports.useContext(At),
    a = p.exports.useContext(tt).reducedMotion,
    c = p.exports.useRef(void 0);
  (s = s || i.renderer),
    !c.current &&
      s &&
      (c.current = s(t, {
        visualState: e,
        parent: o,
        props: n,
        presenceId: r ? r.id : void 0,
        blockInitialAnimation: r ? r.initial === !1 : !1,
        reducedMotionConfig: a,
      }));
  const l = c.current;
  return (
    mt(() => {
      l && l.syncRender();
    }),
    p.exports.useEffect(() => {
      l && l.animationState && l.animationState.animateChanges();
    }),
    mt(() => () => l && l.notifyUnmount(), []),
    l
  );
}
function wt(t) {
  return (
    typeof t == "object" && Object.prototype.hasOwnProperty.call(t, "current")
  );
}
function ui(t, e, n) {
  return p.exports.useCallback(
    (s) => {
      s && t.mount && t.mount(s),
        e && (s ? e.mount(s) : e.unmount()),
        n && (typeof n == "function" ? n(s) : wt(n) && (n.current = s));
    },
    [e]
  );
}
function Nt(t) {
  return typeof t == "string" || Array.isArray(t);
}
function Te(t) {
  return typeof t == "object" && typeof t.start == "function";
}
const fi = [
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileDrag",
  "whileTap",
  "whileFocus",
  "whileInView",
];
function Pe(t) {
  return Te(t.animate) || fi.some((e) => Nt(t[e]));
}
function So(t) {
  return Boolean(Pe(t) || t.variants);
}
function di(t, e) {
  if (Pe(t)) {
    const { initial: n, animate: s } = t;
    return {
      initial: n === !1 || Nt(n) ? n : void 0,
      animate: Nt(s) ? s : void 0,
    };
  }
  return t.inherit !== !1 ? e : {};
}
function hi(t) {
  const { initial: e, animate: n } = di(t, p.exports.useContext(we));
  return p.exports.useMemo(() => ({ initial: e, animate: n }), [ss(e), ss(n)]);
}
function ss(t) {
  return Array.isArray(t) ? t.join(" ") : t;
}
const Q = (t) => ({ isEnabled: (e) => t.some((n) => !!e[n]) }),
  zt = {
    measureLayout: Q(["layout", "layoutId", "drag"]),
    animation: Q([
      "animate",
      "exit",
      "variants",
      "whileHover",
      "whileTap",
      "whileFocus",
      "whileDrag",
      "whileInView",
    ]),
    exit: Q(["exit"]),
    drag: Q(["drag", "dragControls"]),
    focus: Q(["whileFocus"]),
    hover: Q(["whileHover", "onHoverStart", "onHoverEnd"]),
    tap: Q(["whileTap", "onTap", "onTapStart", "onTapCancel"]),
    pan: Q(["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"]),
    inView: Q(["whileInView", "onViewportEnter", "onViewportLeave"]),
  };
function Ye(t) {
  for (const e in t)
    e === "projectionNodeConstructor"
      ? (zt.projectionNodeConstructor = t[e])
      : (zt[e].Component = t[e]);
}
function _(t) {
  const e = p.exports.useRef(null);
  return e.current === null && (e.current = t()), e.current;
}
const Dt = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
let pi = 1;
function mi() {
  return _(() => {
    if (Dt.hasEverUpdated) return pi++;
  });
}
const $t = p.exports.createContext({});
class gi extends xo.Component {
  getSnapshotBeforeUpdate() {
    const { visualElement: e, props: n } = this.props;
    return e && e.setProps(n), null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
const Vo = p.exports.createContext({}),
  yn = Symbol.for("motionComponentSymbol");
function wo({
  preloadedFeatures: t,
  createVisualElement: e,
  projectionNodeConstructor: n,
  useRender: s,
  useVisualState: o,
  Component: i,
}) {
  t && Ye(t);
  function r(c, l) {
    const u = { ...p.exports.useContext(tt), ...c, layoutId: yi(c) },
      { isStatic: f } = u;
    let d = null;
    const h = hi(c),
      m = f ? void 0 : mi(),
      x = o(c, f);
    if (!f && vt) {
      h.visualElement = li(i, x, u, e);
      const S = p.exports.useContext(gn).strict,
        V = p.exports.useContext(Vo);
      h.visualElement &&
        (d = h.visualElement.loadFeatures(
          u,
          S,
          t,
          m,
          n || zt.projectionNodeConstructor,
          V
        ));
    }
    return ci(gi, {
      visualElement: h.visualElement,
      props: u,
      children: [
        d,
        F(we.Provider, {
          value: h,
          children: s(
            i,
            c,
            m,
            ui(x, h.visualElement, l),
            x,
            f,
            h.visualElement
          ),
        }),
      ],
    });
  }
  const a = p.exports.forwardRef(r);
  return (a[yn] = i), a;
}
function yi({ layoutId: t }) {
  const e = p.exports.useContext($t).id;
  return e && t !== void 0 ? e + "-" + t : t;
}
function To(t) {
  function e(s, o = {}) {
    return wo(t(s, o));
  }
  if (typeof Proxy > "u") return e;
  const n = new Map();
  return new Proxy(e, {
    get: (s, o) => (n.has(o) || n.set(o, e(o)), n.get(o)),
  });
}
const vi = [
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
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view",
];
function vn(t) {
  return typeof t != "string" || t.includes("-")
    ? !1
    : !!(vi.indexOf(t) > -1 || /[A-Z]/.test(t));
}
const le = {};
function xi(t) {
  Object.assign(le, t);
}
const ue = [
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
    "skewY",
  ],
  gt = new Set(ue);
function Po(t, { layout: e, layoutId: n }) {
  return (
    gt.has(t) ||
    t.startsWith("origin") ||
    ((e || n !== void 0) && (!!le[t] || t === "opacity"))
  );
}
const U = (t) => !!(t != null && t.getVelocity),
  bi = {
    x: "translateX",
    y: "translateY",
    z: "translateZ",
    transformPerspective: "perspective",
  },
  Si = (t, e) => ue.indexOf(t) - ue.indexOf(e);
function Vi(
  { transform: t, transformKeys: e },
  { enableHardwareAcceleration: n = !0, allowTransformNone: s = !0 },
  o,
  i
) {
  let r = "";
  e.sort(Si);
  for (const a of e) r += `${bi[a] || a}(${t[a]}) `;
  return (
    n && !t.z && (r += "translateZ(0)"),
    (r = r.trim()),
    i ? (r = i(t, o ? "" : r)) : s && o && (r = "none"),
    r
  );
}
function xn(t) {
  return t.startsWith("--");
}
const wi = (t, e) => (e && typeof t == "number" ? e.transform(t) : t),
  Co = (t, e) => (n) => Math.max(Math.min(n, e), t),
  It = (t) => (t % 1 ? Number(t.toFixed(5)) : t),
  Ht = /(-)?([\d]*\.?[\d])+/g,
  Ke =
    /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
  Ti =
    /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function Xt(t) {
  return typeof t == "string";
}
const xt = {
    test: (t) => typeof t == "number",
    parse: parseFloat,
    transform: (t) => t,
  },
  Ft = Object.assign(Object.assign({}, xt), { transform: Co(0, 1) }),
  Jt = Object.assign(Object.assign({}, xt), { default: 1 }),
  qt = (t) => ({
    test: (e) => Xt(e) && e.endsWith(t) && e.split(" ").length === 1,
    parse: parseFloat,
    transform: (e) => `${e}${t}`,
  }),
  ot = qt("deg"),
  X = qt("%"),
  T = qt("px"),
  Pi = qt("vh"),
  Ci = qt("vw"),
  os = Object.assign(Object.assign({}, X), {
    parse: (t) => X.parse(t) / 100,
    transform: (t) => X.transform(t * 100),
  }),
  bn = (t, e) => (n) =>
    Boolean(
      (Xt(n) && Ti.test(n) && n.startsWith(t)) ||
        (e && Object.prototype.hasOwnProperty.call(n, e))
    ),
  Ao = (t, e, n) => (s) => {
    if (!Xt(s)) return s;
    const [o, i, r, a] = s.match(Ht);
    return {
      [t]: parseFloat(o),
      [e]: parseFloat(i),
      [n]: parseFloat(r),
      alpha: a !== void 0 ? parseFloat(a) : 1,
    };
  },
  ht = {
    test: bn("hsl", "hue"),
    parse: Ao("hue", "saturation", "lightness"),
    transform: ({ hue: t, saturation: e, lightness: n, alpha: s = 1 }) =>
      "hsla(" +
      Math.round(t) +
      ", " +
      X.transform(It(e)) +
      ", " +
      X.transform(It(n)) +
      ", " +
      It(Ft.transform(s)) +
      ")",
  },
  Ai = Co(0, 255),
  Fe = Object.assign(Object.assign({}, xt), {
    transform: (t) => Math.round(Ai(t)),
  }),
  at = {
    test: bn("rgb", "red"),
    parse: Ao("red", "green", "blue"),
    transform: ({ red: t, green: e, blue: n, alpha: s = 1 }) =>
      "rgba(" +
      Fe.transform(t) +
      ", " +
      Fe.transform(e) +
      ", " +
      Fe.transform(n) +
      ", " +
      It(Ft.transform(s)) +
      ")",
  };
function Ri(t) {
  let e = "",
    n = "",
    s = "",
    o = "";
  return (
    t.length > 5
      ? ((e = t.substr(1, 2)),
        (n = t.substr(3, 2)),
        (s = t.substr(5, 2)),
        (o = t.substr(7, 2)))
      : ((e = t.substr(1, 1)),
        (n = t.substr(2, 1)),
        (s = t.substr(3, 1)),
        (o = t.substr(4, 1)),
        (e += e),
        (n += n),
        (s += s),
        (o += o)),
    {
      red: parseInt(e, 16),
      green: parseInt(n, 16),
      blue: parseInt(s, 16),
      alpha: o ? parseInt(o, 16) / 255 : 1,
    }
  );
}
const Xe = { test: bn("#"), parse: Ri, transform: at.transform },
  B = {
    test: (t) => at.test(t) || Xe.test(t) || ht.test(t),
    parse: (t) =>
      at.test(t) ? at.parse(t) : ht.test(t) ? ht.parse(t) : Xe.parse(t),
    transform: (t) =>
      Xt(t) ? t : t.hasOwnProperty("red") ? at.transform(t) : ht.transform(t),
  },
  Ro = "${c}",
  Mo = "${n}";
function Mi(t) {
  var e, n, s, o;
  return (
    isNaN(t) &&
    Xt(t) &&
    ((n = (e = t.match(Ht)) === null || e === void 0 ? void 0 : e.length) !==
      null && n !== void 0
      ? n
      : 0) +
      ((o = (s = t.match(Ke)) === null || s === void 0 ? void 0 : s.length) !==
        null && o !== void 0
        ? o
        : 0) >
      0
  );
}
function Lo(t) {
  typeof t == "number" && (t = `${t}`);
  const e = [];
  let n = 0;
  const s = t.match(Ke);
  s && ((n = s.length), (t = t.replace(Ke, Ro)), e.push(...s.map(B.parse)));
  const o = t.match(Ht);
  return (
    o && ((t = t.replace(Ht, Mo)), e.push(...o.map(xt.parse))),
    { values: e, numColors: n, tokenised: t }
  );
}
function Eo(t) {
  return Lo(t).values;
}
function Oo(t) {
  const { values: e, numColors: n, tokenised: s } = Lo(t),
    o = e.length;
  return (i) => {
    let r = s;
    for (let a = 0; a < o; a++)
      r = r.replace(a < n ? Ro : Mo, a < n ? B.transform(i[a]) : It(i[a]));
    return r;
  };
}
const Li = (t) => (typeof t == "number" ? 0 : t);
function Ei(t) {
  const e = Eo(t);
  return Oo(t)(e.map(Li));
}
const et = {
    test: Mi,
    parse: Eo,
    createTransformer: Oo,
    getAnimatableNone: Ei,
  },
  Oi = new Set(["brightness", "contrast", "saturate", "opacity"]);
function Di(t) {
  let [e, n] = t.slice(0, -1).split("(");
  if (e === "drop-shadow") return t;
  const [s] = n.match(Ht) || [];
  if (!s) return t;
  const o = n.replace(s, "");
  let i = Oi.has(e) ? 1 : 0;
  return s !== n && (i *= 100), e + "(" + i + o + ")";
}
const Ii = /([a-z-]*)\(.*?\)/g,
  qe = Object.assign(Object.assign({}, et), {
    getAnimatableNone: (t) => {
      const e = t.match(Ii);
      return e ? e.map(Di).join(" ") : t;
    },
  }),
  rs = { ...xt, transform: Math.round },
  Do = {
    borderWidth: T,
    borderTopWidth: T,
    borderRightWidth: T,
    borderBottomWidth: T,
    borderLeftWidth: T,
    borderRadius: T,
    radius: T,
    borderTopLeftRadius: T,
    borderTopRightRadius: T,
    borderBottomRightRadius: T,
    borderBottomLeftRadius: T,
    width: T,
    maxWidth: T,
    height: T,
    maxHeight: T,
    size: T,
    top: T,
    right: T,
    bottom: T,
    left: T,
    padding: T,
    paddingTop: T,
    paddingRight: T,
    paddingBottom: T,
    paddingLeft: T,
    margin: T,
    marginTop: T,
    marginRight: T,
    marginBottom: T,
    marginLeft: T,
    rotate: ot,
    rotateX: ot,
    rotateY: ot,
    rotateZ: ot,
    scale: Jt,
    scaleX: Jt,
    scaleY: Jt,
    scaleZ: Jt,
    skew: ot,
    skewX: ot,
    skewY: ot,
    distance: T,
    translateX: T,
    translateY: T,
    translateZ: T,
    x: T,
    y: T,
    z: T,
    perspective: T,
    transformPerspective: T,
    opacity: Ft,
    originX: os,
    originY: os,
    originZ: T,
    zIndex: rs,
    fillOpacity: Ft,
    strokeOpacity: Ft,
    numOctaves: rs,
  };
function Sn(t, e, n, s) {
  const {
    style: o,
    vars: i,
    transform: r,
    transformKeys: a,
    transformOrigin: c,
  } = t;
  a.length = 0;
  let l = !1,
    u = !1,
    f = !0;
  for (const d in e) {
    const h = e[d];
    if (xn(d)) {
      i[d] = h;
      continue;
    }
    const m = Do[d],
      x = wi(h, m);
    if (gt.has(d)) {
      if (((l = !0), (r[d] = x), a.push(d), !f)) continue;
      h !== (m.default || 0) && (f = !1);
    } else d.startsWith("origin") ? ((u = !0), (c[d] = x)) : (o[d] = x);
  }
  if (
    (e.transform ||
      (l || s
        ? (o.transform = Vi(t, n, f, s))
        : o.transform && (o.transform = "none")),
    u)
  ) {
    const { originX: d = "50%", originY: h = "50%", originZ: m = 0 } = c;
    o.transformOrigin = `${d} ${h} ${m}`;
  }
}
const Vn = () => ({
  style: {},
  transform: {},
  transformKeys: [],
  transformOrigin: {},
  vars: {},
});
function Io(t, e, n) {
  for (const s in e) !U(e[s]) && !Po(s, n) && (t[s] = e[s]);
}
function Fi({ transformTemplate: t }, e, n) {
  return p.exports.useMemo(() => {
    const s = Vn();
    return (
      Sn(s, e, { enableHardwareAcceleration: !n }, t),
      Object.assign({}, s.vars, s.style)
    );
  }, [e]);
}
function ki(t, e, n) {
  const s = t.style || {},
    o = {};
  return (
    Io(o, s, t),
    Object.assign(o, Fi(t, e, n)),
    t.transformValues ? t.transformValues(o) : o
  );
}
function ji(t, e, n) {
  const s = {},
    o = ki(t, e, n);
  return (
    t.drag &&
      t.dragListener !== !1 &&
      ((s.draggable = !1),
      (o.userSelect = o.WebkitUserSelect = o.WebkitTouchCallout = "none"),
      (o.touchAction =
        t.drag === !0 ? "none" : `pan-${t.drag === "x" ? "y" : "x"}`)),
    (s.style = o),
    s
  );
}
const _i = [
    "animate",
    "exit",
    "variants",
    "whileHover",
    "whileTap",
    "whileFocus",
    "whileDrag",
    "whileInView",
  ],
  Bi = ["whileTap", "onTap", "onTapStart", "onTapCancel"],
  Ui = ["onPan", "onPanStart", "onPanSessionStart", "onPanEnd"],
  Ni = ["whileInView", "onViewportEnter", "onViewportLeave", "viewport"],
  zi = new Set([
    "initial",
    "style",
    "values",
    "variants",
    "transition",
    "transformTemplate",
    "transformValues",
    "custom",
    "inherit",
    "layout",
    "layoutId",
    "layoutDependency",
    "onLayoutAnimationStart",
    "onLayoutAnimationComplete",
    "onLayoutMeasure",
    "onBeforeLayoutMeasure",
    "onAnimationStart",
    "onAnimationComplete",
    "onUpdate",
    "onDragStart",
    "onDrag",
    "onDragEnd",
    "onMeasureDragConstraints",
    "onDirectionLock",
    "onDragTransitionEnd",
    "drag",
    "dragControls",
    "dragListener",
    "dragConstraints",
    "dragDirectionLock",
    "dragSnapToOrigin",
    "_dragX",
    "_dragY",
    "dragElastic",
    "dragMomentum",
    "dragPropagation",
    "dragTransition",
    "onHoverStart",
    "onHoverEnd",
    "layoutScroll",
    ...Ni,
    ...Bi,
    ..._i,
    ...Ui,
  ]);
function fe(t) {
  return zi.has(t);
}
let Fo = (t) => !fe(t);
function ko(t) {
  !t || (Fo = (e) => (e.startsWith("on") ? !fe(e) : t(e)));
}
try {
  ko(require("@emotion/is-prop-valid").default);
} catch {}
function $i(t, e, n) {
  const s = {};
  for (const o in t)
    (Fo(o) ||
      (n === !0 && fe(o)) ||
      (!e && !fe(o)) ||
      (t.draggable && o.startsWith("onDrag"))) &&
      (s[o] = t[o]);
  return s;
}
function is(t, e, n) {
  return typeof t == "string" ? t : T.transform(e + n * t);
}
function Hi(t, e, n) {
  const s = is(e, t.x, t.width),
    o = is(n, t.y, t.height);
  return `${s} ${o}`;
}
const Wi = { offset: "stroke-dashoffset", array: "stroke-dasharray" },
  Gi = { offset: "strokeDashoffset", array: "strokeDasharray" };
function Yi(t, e, n = 1, s = 0, o = !0) {
  t.pathLength = 1;
  const i = o ? Wi : Gi;
  t[i.offset] = T.transform(-s);
  const r = T.transform(e),
    a = T.transform(n);
  t[i.array] = `${r} ${a}`;
}
function wn(
  t,
  {
    attrX: e,
    attrY: n,
    originX: s,
    originY: o,
    pathLength: i,
    pathSpacing: r = 1,
    pathOffset: a = 0,
    ...c
  },
  l,
  u
) {
  Sn(t, c, l, u), (t.attrs = t.style), (t.style = {});
  const { attrs: f, style: d, dimensions: h } = t;
  f.transform && (h && (d.transform = f.transform), delete f.transform),
    h &&
      (s !== void 0 || o !== void 0 || d.transform) &&
      (d.transformOrigin = Hi(
        h,
        s !== void 0 ? s : 0.5,
        o !== void 0 ? o : 0.5
      )),
    e !== void 0 && (f.x = e),
    n !== void 0 && (f.y = n),
    i !== void 0 && Yi(f, i, r, a, !1);
}
const jo = () => ({ ...Vn(), attrs: {} });
function Ki(t, e) {
  const n = p.exports.useMemo(() => {
    const s = jo();
    return (
      wn(s, e, { enableHardwareAcceleration: !1 }, t.transformTemplate),
      { ...s.attrs, style: { ...s.style } }
    );
  }, [e]);
  if (t.style) {
    const s = {};
    Io(s, t.style, t), (n.style = { ...s, ...n.style });
  }
  return n;
}
function Xi(t = !1) {
  return (n, s, o, i, { latestValues: r }, a) => {
    const l = (vn(n) ? Ki : ji)(s, r, a),
      f = { ...$i(s, typeof n == "string", t), ...l, ref: i };
    return o && (f["data-projection-id"] = o), p.exports.createElement(n, f);
  };
}
const de = (t) => t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
function _o(t, { style: e, vars: n }, s, o) {
  Object.assign(t.style, e, o && o.getProjectionStyles(s));
  for (const i in n) t.style.setProperty(i, n[i]);
}
const Bo = new Set([
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
]);
function Uo(t, e, n, s) {
  _o(t, e, void 0, s);
  for (const o in e.attrs) t.setAttribute(Bo.has(o) ? o : de(o), e.attrs[o]);
}
function Tn(t) {
  const { style: e } = t,
    n = {};
  for (const s in e) (U(e[s]) || Po(s, t)) && (n[s] = e[s]);
  return n;
}
function No(t) {
  const e = Tn(t);
  for (const n in t)
    if (U(t[n])) {
      const s = n === "x" || n === "y" ? "attr" + n.toUpperCase() : n;
      e[s] = t[n];
    }
  return e;
}
function Pn(t, e, n, s = {}, o = {}) {
  return (
    typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, o)),
    typeof e == "string" && (e = t.variants && t.variants[e]),
    typeof e == "function" && (e = e(n !== void 0 ? n : t.custom, s, o)),
    e
  );
}
const Wt = (t) => Array.isArray(t),
  qi = (t) => Boolean(t && typeof t == "object" && t.mix && t.toValue),
  zo = (t) => (Wt(t) ? t[t.length - 1] || 0 : t);
function oe(t) {
  const e = U(t) ? t.get() : t;
  return qi(e) ? e.toValue() : e;
}
function Zi(
  { scrapeMotionValuesFromProps: t, createRenderState: e, onMount: n },
  s,
  o,
  i
) {
  const r = { latestValues: Ji(s, o, i, t), renderState: e() };
  return n && (r.mount = (a) => n(s, a, r)), r;
}
const Cn = (t) => (e, n) => {
  const s = p.exports.useContext(we),
    o = p.exports.useContext(At),
    i = () => Zi(t, e, s, o);
  return n ? i() : _(i);
};
function Ji(t, e, n, s) {
  const o = {},
    i = s(t);
  for (const d in i) o[d] = oe(i[d]);
  let { initial: r, animate: a } = t;
  const c = Pe(t),
    l = So(t);
  e &&
    l &&
    !c &&
    t.inherit !== !1 &&
    (r === void 0 && (r = e.initial), a === void 0 && (a = e.animate));
  let u = n ? n.initial === !1 : !1;
  u = u || r === !1;
  const f = u ? a : r;
  return (
    f &&
      typeof f != "boolean" &&
      !Te(f) &&
      (Array.isArray(f) ? f : [f]).forEach((h) => {
        const m = Pn(t, h);
        if (!m) return;
        const { transitionEnd: x, transition: S, ...V } = m;
        for (const b in V) {
          let g = V[b];
          if (Array.isArray(g)) {
            const v = u ? g.length - 1 : 0;
            g = g[v];
          }
          g !== null && (o[b] = g);
        }
        for (const b in x) o[b] = x[b];
      }),
    o
  );
}
const Qi = {
    useVisualState: Cn({
      scrapeMotionValuesFromProps: No,
      createRenderState: jo,
      onMount: (t, e, { renderState: n, latestValues: s }) => {
        try {
          n.dimensions =
            typeof e.getBBox == "function"
              ? e.getBBox()
              : e.getBoundingClientRect();
        } catch {
          n.dimensions = { x: 0, y: 0, width: 0, height: 0 };
        }
        wn(n, s, { enableHardwareAcceleration: !1 }, t.transformTemplate),
          Uo(e, n);
      },
    }),
  },
  ta = {
    useVisualState: Cn({
      scrapeMotionValuesFromProps: Tn,
      createRenderState: Vn,
    }),
  };
function An(t, { forwardMotionProps: e = !1 }, n, s, o) {
  return {
    ...(vn(t) ? Qi : ta),
    preloadedFeatures: n,
    useRender: Xi(e),
    createVisualElement: s,
    projectionNodeConstructor: o,
    Component: t,
  };
}
var M;
(function (t) {
  (t.Animate = "animate"),
    (t.Hover = "whileHover"),
    (t.Tap = "whileTap"),
    (t.Drag = "whileDrag"),
    (t.Focus = "whileFocus"),
    (t.InView = "whileInView"),
    (t.Exit = "exit");
})(M || (M = {}));
function Ce(t, e, n, s = { passive: !0 }) {
  return t.addEventListener(e, n, s), () => t.removeEventListener(e, n);
}
function Ze(t, e, n, s) {
  p.exports.useEffect(() => {
    const o = t.current;
    if (n && o) return Ce(o, e, n, s);
  }, [t, e, n, s]);
}
function ea({ whileFocus: t, visualElement: e }) {
  const { animationState: n } = e,
    s = () => {
      n && n.setActive(M.Focus, !0);
    },
    o = () => {
      n && n.setActive(M.Focus, !1);
    };
  Ze(e, "focus", t ? s : void 0), Ze(e, "blur", t ? o : void 0);
}
function $o(t) {
  return typeof PointerEvent < "u" && t instanceof PointerEvent
    ? t.pointerType === "mouse"
    : t instanceof MouseEvent;
}
function Ho(t) {
  return !!t.touches;
}
function na(t) {
  return (e) => {
    const n = e instanceof MouseEvent;
    (!n || (n && e.button === 0)) && t(e);
  };
}
const sa = { pageX: 0, pageY: 0 };
function oa(t, e = "page") {
  const s = t.touches[0] || t.changedTouches[0] || sa;
  return { x: s[e + "X"], y: s[e + "Y"] };
}
function ra(t, e = "page") {
  return { x: t[e + "X"], y: t[e + "Y"] };
}
function Rn(t, e = "page") {
  return { point: Ho(t) ? oa(t, e) : ra(t, e) };
}
const Wo = (t, e = !1) => {
    const n = (s) => t(s, Rn(s));
    return e ? na(n) : n;
  },
  ia = () => vt && window.onpointerdown === null,
  aa = () => vt && window.ontouchstart === null,
  ca = () => vt && window.onmousedown === null,
  la = {
    pointerdown: "mousedown",
    pointermove: "mousemove",
    pointerup: "mouseup",
    pointercancel: "mousecancel",
    pointerover: "mouseover",
    pointerout: "mouseout",
    pointerenter: "mouseenter",
    pointerleave: "mouseleave",
  },
  ua = {
    pointerdown: "touchstart",
    pointermove: "touchmove",
    pointerup: "touchend",
    pointercancel: "touchcancel",
  };
function Go(t) {
  return ia() ? t : aa() ? ua[t] : ca() ? la[t] : t;
}
function Pt(t, e, n, s) {
  return Ce(t, Go(e), Wo(n, e === "pointerdown"), s);
}
function he(t, e, n, s) {
  return Ze(t, Go(e), n && Wo(n, e === "pointerdown"), s);
}
function Yo(t) {
  let e = null;
  return () => {
    const n = () => {
      e = null;
    };
    return e === null ? ((e = t), n) : !1;
  };
}
const as = Yo("dragHorizontal"),
  cs = Yo("dragVertical");
function Ko(t) {
  let e = !1;
  if (t === "y") e = cs();
  else if (t === "x") e = as();
  else {
    const n = as(),
      s = cs();
    n && s
      ? (e = () => {
          n(), s();
        })
      : (n && n(), s && s());
  }
  return e;
}
function Xo() {
  const t = Ko(!0);
  return t ? (t(), !1) : !0;
}
function ls(t, e, n) {
  return (s, o) => {
    !$o(s) ||
      Xo() ||
      (t.animationState && t.animationState.setActive(M.Hover, e),
      n && n(s, o));
  };
}
function fa({
  onHoverStart: t,
  onHoverEnd: e,
  whileHover: n,
  visualElement: s,
}) {
  he(s, "pointerenter", t || n ? ls(s, !0, t) : void 0, { passive: !t }),
    he(s, "pointerleave", e || n ? ls(s, !1, e) : void 0, { passive: !e });
}
const qo = (t, e) => (e ? (t === e ? !0 : qo(t, e.parentElement)) : !1);
function Mn(t) {
  return p.exports.useEffect(() => () => t(), []);
}
function Zo(t, e) {
  var n = {};
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      e.indexOf(s) < 0 &&
      (n[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(t); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, s[o]) &&
        (n[s[o]] = t[s[o]]);
  return n;
}
var da = function () {},
  pe = function () {};
const me = (t, e, n) => Math.min(Math.max(n, t), e),
  ke = 0.001,
  ha = 0.01,
  us = 10,
  pa = 0.05,
  ma = 1;
function ga({
  duration: t = 800,
  bounce: e = 0.25,
  velocity: n = 0,
  mass: s = 1,
}) {
  let o, i;
  da(t <= us * 1e3);
  let r = 1 - e;
  (r = me(pa, ma, r)),
    (t = me(ha, us, t / 1e3)),
    r < 1
      ? ((o = (l) => {
          const u = l * r,
            f = u * t,
            d = u - n,
            h = Je(l, r),
            m = Math.exp(-f);
          return ke - (d / h) * m;
        }),
        (i = (l) => {
          const f = l * r * t,
            d = f * n + n,
            h = Math.pow(r, 2) * Math.pow(l, 2) * t,
            m = Math.exp(-f),
            x = Je(Math.pow(l, 2), r);
          return ((-o(l) + ke > 0 ? -1 : 1) * ((d - h) * m)) / x;
        }))
      : ((o = (l) => {
          const u = Math.exp(-l * t),
            f = (l - n) * t + 1;
          return -ke + u * f;
        }),
        (i = (l) => {
          const u = Math.exp(-l * t),
            f = (n - l) * (t * t);
          return u * f;
        }));
  const a = 5 / t,
    c = va(o, i, a);
  if (((t = t * 1e3), isNaN(c)))
    return { stiffness: 100, damping: 10, duration: t };
  {
    const l = Math.pow(c, 2) * s;
    return { stiffness: l, damping: r * 2 * Math.sqrt(s * l), duration: t };
  }
}
const ya = 12;
function va(t, e, n) {
  let s = n;
  for (let o = 1; o < ya; o++) s = s - t(s) / e(s);
  return s;
}
function Je(t, e) {
  return t * Math.sqrt(1 - e * e);
}
const xa = ["duration", "bounce"],
  ba = ["stiffness", "damping", "mass"];
function fs(t, e) {
  return e.some((n) => t[n] !== void 0);
}
function Sa(t) {
  let e = Object.assign(
    {
      velocity: 0,
      stiffness: 100,
      damping: 10,
      mass: 1,
      isResolvedFromDuration: !1,
    },
    t
  );
  if (!fs(t, ba) && fs(t, xa)) {
    const n = ga(t);
    (e = Object.assign(Object.assign(Object.assign({}, e), n), {
      velocity: 0,
      mass: 1,
    })),
      (e.isResolvedFromDuration = !0);
  }
  return e;
}
function Ln(t) {
  var { from: e = 0, to: n = 1, restSpeed: s = 2, restDelta: o } = t,
    i = Zo(t, ["from", "to", "restSpeed", "restDelta"]);
  const r = { done: !1, value: e };
  let {
      stiffness: a,
      damping: c,
      mass: l,
      velocity: u,
      duration: f,
      isResolvedFromDuration: d,
    } = Sa(i),
    h = ds,
    m = ds;
  function x() {
    const S = u ? -(u / 1e3) : 0,
      V = n - e,
      b = c / (2 * Math.sqrt(a * l)),
      g = Math.sqrt(a / l) / 1e3;
    if ((o === void 0 && (o = Math.min(Math.abs(n - e) / 100, 0.4)), b < 1)) {
      const v = Je(g, b);
      (h = (w) => {
        const A = Math.exp(-b * g * w);
        return (
          n -
          A * (((S + b * g * V) / v) * Math.sin(v * w) + V * Math.cos(v * w))
        );
      }),
        (m = (w) => {
          const A = Math.exp(-b * g * w);
          return (
            b *
              g *
              A *
              ((Math.sin(v * w) * (S + b * g * V)) / v + V * Math.cos(v * w)) -
            A * (Math.cos(v * w) * (S + b * g * V) - v * V * Math.sin(v * w))
          );
        });
    } else if (b === 1) h = (v) => n - Math.exp(-g * v) * (V + (S + g * V) * v);
    else {
      const v = g * Math.sqrt(b * b - 1);
      h = (w) => {
        const A = Math.exp(-b * g * w),
          E = Math.min(v * w, 300);
        return (
          n - (A * ((S + b * g * V) * Math.sinh(E) + v * V * Math.cosh(E))) / v
        );
      };
    }
  }
  return (
    x(),
    {
      next: (S) => {
        const V = h(S);
        if (d) r.done = S >= f;
        else {
          const b = m(S) * 1e3,
            g = Math.abs(b) <= s,
            v = Math.abs(n - V) <= o;
          r.done = g && v;
        }
        return (r.value = r.done ? n : V), r;
      },
      flipTarget: () => {
        (u = -u), ([e, n] = [n, e]), x();
      },
    }
  );
}
Ln.needsInterpolation = (t, e) => typeof t == "string" || typeof e == "string";
const ds = (t) => 0,
  Gt = (t, e, n) => {
    const s = e - t;
    return s === 0 ? 1 : (n - t) / s;
  },
  L = (t, e, n) => -n * t + n * e + t;
function je(t, e, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? t + (e - t) * 6 * n
      : n < 1 / 2
      ? e
      : n < 2 / 3
      ? t + (e - t) * (2 / 3 - n) * 6
      : t
  );
}
function hs({ hue: t, saturation: e, lightness: n, alpha: s }) {
  (t /= 360), (e /= 100), (n /= 100);
  let o = 0,
    i = 0,
    r = 0;
  if (!e) o = i = r = n;
  else {
    const a = n < 0.5 ? n * (1 + e) : n + e - n * e,
      c = 2 * n - a;
    (o = je(c, a, t + 1 / 3)), (i = je(c, a, t)), (r = je(c, a, t - 1 / 3));
  }
  return {
    red: Math.round(o * 255),
    green: Math.round(i * 255),
    blue: Math.round(r * 255),
    alpha: s,
  };
}
const Va = (t, e, n) => {
    const s = t * t,
      o = e * e;
    return Math.sqrt(Math.max(0, n * (o - s) + s));
  },
  wa = [Xe, at, ht],
  ps = (t) => wa.find((e) => e.test(t)),
  Jo = (t, e) => {
    let n = ps(t),
      s = ps(e),
      o = n.parse(t),
      i = s.parse(e);
    n === ht && ((o = hs(o)), (n = at)), s === ht && ((i = hs(i)), (s = at));
    const r = Object.assign({}, o);
    return (a) => {
      for (const c in r) c !== "alpha" && (r[c] = Va(o[c], i[c], a));
      return (r.alpha = L(o.alpha, i.alpha, a)), n.transform(r);
    };
  },
  Qe = (t) => typeof t == "number",
  Ta = (t, e) => (n) => e(t(n)),
  Ae = (...t) => t.reduce(Ta);
function Qo(t, e) {
  return Qe(t) ? (n) => L(t, e, n) : B.test(t) ? Jo(t, e) : er(t, e);
}
const tr = (t, e) => {
    const n = [...t],
      s = n.length,
      o = t.map((i, r) => Qo(i, e[r]));
    return (i) => {
      for (let r = 0; r < s; r++) n[r] = o[r](i);
      return n;
    };
  },
  Pa = (t, e) => {
    const n = Object.assign(Object.assign({}, t), e),
      s = {};
    for (const o in n)
      t[o] !== void 0 && e[o] !== void 0 && (s[o] = Qo(t[o], e[o]));
    return (o) => {
      for (const i in s) n[i] = s[i](o);
      return n;
    };
  };
function ms(t) {
  const e = et.parse(t),
    n = e.length;
  let s = 0,
    o = 0,
    i = 0;
  for (let r = 0; r < n; r++)
    s || typeof e[r] == "number" ? s++ : e[r].hue !== void 0 ? i++ : o++;
  return { parsed: e, numNumbers: s, numRGB: o, numHSL: i };
}
const er = (t, e) => {
    const n = et.createTransformer(e),
      s = ms(t),
      o = ms(e);
    return s.numHSL === o.numHSL &&
      s.numRGB === o.numRGB &&
      s.numNumbers >= o.numNumbers
      ? Ae(tr(s.parsed, o.parsed), n)
      : (r) => `${r > 0 ? e : t}`;
  },
  Ca = (t, e) => (n) => L(t, e, n);
function Aa(t) {
  if (typeof t == "number") return Ca;
  if (typeof t == "string") return B.test(t) ? Jo : er;
  if (Array.isArray(t)) return tr;
  if (typeof t == "object") return Pa;
}
function Ra(t, e, n) {
  const s = [],
    o = n || Aa(t[0]),
    i = t.length - 1;
  for (let r = 0; r < i; r++) {
    let a = o(t[r], t[r + 1]);
    if (e) {
      const c = Array.isArray(e) ? e[r] : e;
      a = Ae(c, a);
    }
    s.push(a);
  }
  return s;
}
function Ma([t, e], [n]) {
  return (s) => n(Gt(t, e, s));
}
function La(t, e) {
  const n = t.length,
    s = n - 1;
  return (o) => {
    let i = 0,
      r = !1;
    if ((o <= t[0] ? (r = !0) : o >= t[s] && ((i = s - 1), (r = !0)), !r)) {
      let c = 1;
      for (; c < n && !(t[c] > o || c === s); c++);
      i = c - 1;
    }
    const a = Gt(t[i], t[i + 1], o);
    return e[i](a);
  };
}
function En(t, e, { clamp: n = !0, ease: s, mixer: o } = {}) {
  const i = t.length;
  pe(i === e.length),
    pe(!s || !Array.isArray(s) || s.length === i - 1),
    t[0] > t[i - 1] &&
      ((t = [].concat(t)), (e = [].concat(e)), t.reverse(), e.reverse());
  const r = Ra(e, s, o),
    a = i === 2 ? Ma(t, r) : La(t, r);
  return n ? (c) => a(me(t[0], t[i - 1], c)) : a;
}
const Re = (t) => (e) => 1 - t(1 - e),
  On = (t) => (e) => e <= 0.5 ? t(2 * e) / 2 : (2 - t(2 * (1 - e))) / 2,
  Ea = (t) => (e) => Math.pow(e, t),
  nr = (t) => (e) => e * e * ((t + 1) * e - t),
  Oa = (t) => {
    const e = nr(t);
    return (n) =>
      (n *= 2) < 1 ? 0.5 * e(n) : 0.5 * (2 - Math.pow(2, -10 * (n - 1)));
  },
  sr = 1.525,
  Da = 4 / 11,
  Ia = 8 / 11,
  Fa = 9 / 10,
  Dn = (t) => t,
  In = Ea(2),
  ka = Re(In),
  or = On(In),
  rr = (t) => 1 - Math.sin(Math.acos(t)),
  Fn = Re(rr),
  ja = On(Fn),
  kn = nr(sr),
  _a = Re(kn),
  Ba = On(kn),
  Ua = Oa(sr),
  Na = 4356 / 361,
  za = 35442 / 1805,
  $a = 16063 / 1805,
  ge = (t) => {
    if (t === 1 || t === 0) return t;
    const e = t * t;
    return t < Da
      ? 7.5625 * e
      : t < Ia
      ? 9.075 * e - 9.9 * t + 3.4
      : t < Fa
      ? Na * e - za * t + $a
      : 10.8 * t * t - 20.52 * t + 10.72;
  },
  Ha = Re(ge),
  Wa = (t) => (t < 0.5 ? 0.5 * (1 - ge(1 - t * 2)) : 0.5 * ge(t * 2 - 1) + 0.5);
function Ga(t, e) {
  return t.map(() => e || or).splice(0, t.length - 1);
}
function Ya(t) {
  const e = t.length;
  return t.map((n, s) => (s !== 0 ? s / (e - 1) : 0));
}
function Ka(t, e) {
  return t.map((n) => n * e);
}
function re({ from: t = 0, to: e = 1, ease: n, offset: s, duration: o = 300 }) {
  const i = { done: !1, value: t },
    r = Array.isArray(e) ? e : [t, e],
    a = Ka(s && s.length === r.length ? s : Ya(r), o);
  function c() {
    return En(a, r, { ease: Array.isArray(n) ? n : Ga(r, n) });
  }
  let l = c();
  return {
    next: (u) => ((i.value = l(u)), (i.done = u >= o), i),
    flipTarget: () => {
      r.reverse(), (l = c());
    },
  };
}
function Xa({
  velocity: t = 0,
  from: e = 0,
  power: n = 0.8,
  timeConstant: s = 350,
  restDelta: o = 0.5,
  modifyTarget: i,
}) {
  const r = { done: !1, value: e };
  let a = n * t;
  const c = e + a,
    l = i === void 0 ? c : i(c);
  return (
    l !== c && (a = l - e),
    {
      next: (u) => {
        const f = -a * Math.exp(-u / s);
        return (r.done = !(f > o || f < -o)), (r.value = r.done ? l : l + f), r;
      },
      flipTarget: () => {},
    }
  );
}
const gs = { keyframes: re, spring: Ln, decay: Xa };
function qa(t) {
  if (Array.isArray(t.to)) return re;
  if (gs[t.type]) return gs[t.type];
  const e = new Set(Object.keys(t));
  return e.has("ease") || (e.has("duration") && !e.has("dampingRatio"))
    ? re
    : e.has("dampingRatio") ||
      e.has("stiffness") ||
      e.has("mass") ||
      e.has("damping") ||
      e.has("restSpeed") ||
      e.has("restDelta")
    ? Ln
    : re;
}
const ir = (1 / 60) * 1e3,
  Za = typeof performance < "u" ? () => performance.now() : () => Date.now(),
  ar =
    typeof window < "u"
      ? (t) => window.requestAnimationFrame(t)
      : (t) => setTimeout(() => t(Za()), ir);
function Ja(t) {
  let e = [],
    n = [],
    s = 0,
    o = !1,
    i = !1;
  const r = new WeakSet(),
    a = {
      schedule: (c, l = !1, u = !1) => {
        const f = u && o,
          d = f ? e : n;
        return (
          l && r.add(c),
          d.indexOf(c) === -1 && (d.push(c), f && o && (s = e.length)),
          c
        );
      },
      cancel: (c) => {
        const l = n.indexOf(c);
        l !== -1 && n.splice(l, 1), r.delete(c);
      },
      process: (c) => {
        if (o) {
          i = !0;
          return;
        }
        if (((o = !0), ([e, n] = [n, e]), (n.length = 0), (s = e.length), s))
          for (let l = 0; l < s; l++) {
            const u = e[l];
            u(c), r.has(u) && (a.schedule(u), t());
          }
        (o = !1), i && ((i = !1), a.process(c));
      },
    };
  return a;
}
const Qa = 40;
let tn = !0,
  Yt = !1,
  en = !1;
const Ct = { delta: 0, timestamp: 0 },
  Zt = ["read", "update", "preRender", "render", "postRender"],
  Me = Zt.reduce((t, e) => ((t[e] = Ja(() => (Yt = !0))), t), {}),
  j = Zt.reduce((t, e) => {
    const n = Me[e];
    return (t[e] = (s, o = !1, i = !1) => (Yt || ec(), n.schedule(s, o, i))), t;
  }, {}),
  q = Zt.reduce((t, e) => ((t[e] = Me[e].cancel), t), {}),
  _e = Zt.reduce((t, e) => ((t[e] = () => Me[e].process(Ct)), t), {}),
  tc = (t) => Me[t].process(Ct),
  cr = (t) => {
    (Yt = !1),
      (Ct.delta = tn ? ir : Math.max(Math.min(t - Ct.timestamp, Qa), 1)),
      (Ct.timestamp = t),
      (en = !0),
      Zt.forEach(tc),
      (en = !1),
      Yt && ((tn = !1), ar(cr));
  },
  ec = () => {
    (Yt = !0), (tn = !0), en || ar(cr);
  },
  ye = () => Ct;
function lr(t, e, n = 0) {
  return t - e - n;
}
function nc(t, e, n = 0, s = !0) {
  return s ? lr(e + -t, e, n) : e - (t - e) + n;
}
function sc(t, e, n, s) {
  return s ? t >= e + n : t <= -n;
}
const oc = (t) => {
  const e = ({ delta: n }) => t(n);
  return { start: () => j.update(e, !0), stop: () => q.update(e) };
};
function jn(t) {
  var e,
    n,
    {
      from: s,
      autoplay: o = !0,
      driver: i = oc,
      elapsed: r = 0,
      repeat: a = 0,
      repeatType: c = "loop",
      repeatDelay: l = 0,
      onPlay: u,
      onStop: f,
      onComplete: d,
      onRepeat: h,
      onUpdate: m,
    } = t,
    x = Zo(t, [
      "from",
      "autoplay",
      "driver",
      "elapsed",
      "repeat",
      "repeatType",
      "repeatDelay",
      "onPlay",
      "onStop",
      "onComplete",
      "onRepeat",
      "onUpdate",
    ]);
  let { to: S } = x,
    V,
    b = 0,
    g = x.duration,
    v,
    w = !1,
    A = !0,
    E;
  const k = qa(x);
  !((n = (e = k).needsInterpolation) === null || n === void 0) &&
    n.call(e, s, S) &&
    ((E = En([0, 100], [s, S], { clamp: !1 })), (s = 0), (S = 100));
  const I = k(Object.assign(Object.assign({}, x), { from: s, to: S }));
  function $() {
    b++,
      c === "reverse"
        ? ((A = b % 2 === 0), (r = nc(r, g, l, A)))
        : ((r = lr(r, g, l)), c === "mirror" && I.flipTarget()),
      (w = !1),
      h && h();
  }
  function Z() {
    V.stop(), d && d();
  }
  function H(nt) {
    if ((A || (nt = -nt), (r += nt), !w)) {
      const J = I.next(Math.max(0, r));
      (v = J.value), E && (v = E(v)), (w = A ? J.done : r <= 0);
    }
    m == null || m(v),
      w &&
        (b === 0 && (g != null || (g = r)),
        b < a ? sc(r, g, l, A) && $() : Z());
  }
  function lt() {
    u == null || u(), (V = i(H)), V.start();
  }
  return (
    o && lt(),
    {
      stop: () => {
        f == null || f(), V.stop();
      },
    }
  );
}
function ur(t, e) {
  return e ? t * (1e3 / e) : 0;
}
function rc({
  from: t = 0,
  velocity: e = 0,
  min: n,
  max: s,
  power: o = 0.8,
  timeConstant: i = 750,
  bounceStiffness: r = 500,
  bounceDamping: a = 10,
  restDelta: c = 1,
  modifyTarget: l,
  driver: u,
  onUpdate: f,
  onComplete: d,
  onStop: h,
}) {
  let m;
  function x(g) {
    return (n !== void 0 && g < n) || (s !== void 0 && g > s);
  }
  function S(g) {
    return n === void 0
      ? s
      : s === void 0 || Math.abs(n - g) < Math.abs(s - g)
      ? n
      : s;
  }
  function V(g) {
    m == null || m.stop(),
      (m = jn(
        Object.assign(Object.assign({}, g), {
          driver: u,
          onUpdate: (v) => {
            var w;
            f == null || f(v),
              (w = g.onUpdate) === null || w === void 0 || w.call(g, v);
          },
          onComplete: d,
          onStop: h,
        })
      ));
  }
  function b(g) {
    V(
      Object.assign(
        { type: "spring", stiffness: r, damping: a, restDelta: c },
        g
      )
    );
  }
  if (x(t)) b({ from: t, velocity: e, to: S(t) });
  else {
    let g = o * e + t;
    typeof l < "u" && (g = l(g));
    const v = S(g),
      w = v === n ? -1 : 1;
    let A, E;
    const k = (I) => {
      (A = E),
        (E = I),
        (e = ur(I - A, ye().delta)),
        ((w === 1 && I > v) || (w === -1 && I < v)) &&
          b({ from: I, to: v, velocity: e });
    };
    V({
      type: "decay",
      from: t,
      velocity: e,
      timeConstant: i,
      power: o,
      restDelta: c,
      modifyTarget: l,
      onUpdate: x(g) ? k : void 0,
    });
  }
  return { stop: () => (m == null ? void 0 : m.stop()) };
}
const nn = (t) => t.hasOwnProperty("x") && t.hasOwnProperty("y"),
  ys = (t) => nn(t) && t.hasOwnProperty("z"),
  Qt = (t, e) => Math.abs(t - e);
function _n(t, e) {
  if (Qe(t) && Qe(e)) return Qt(t, e);
  if (nn(t) && nn(e)) {
    const n = Qt(t.x, e.x),
      s = Qt(t.y, e.y),
      o = ys(t) && ys(e) ? Qt(t.z, e.z) : 0;
    return Math.sqrt(Math.pow(n, 2) + Math.pow(s, 2) + Math.pow(o, 2));
  }
}
const ic = (t, e, n) => {
    const s = e - t;
    return ((((n - t) % s) + s) % s) + t;
  },
  fr = (t, e) => 1 - 3 * e + 3 * t,
  dr = (t, e) => 3 * e - 6 * t,
  hr = (t) => 3 * t,
  ve = (t, e, n) => ((fr(e, n) * t + dr(e, n)) * t + hr(e)) * t,
  pr = (t, e, n) => 3 * fr(e, n) * t * t + 2 * dr(e, n) * t + hr(e),
  ac = 1e-7,
  cc = 10;
function lc(t, e, n, s, o) {
  let i,
    r,
    a = 0;
  do (r = e + (n - e) / 2), (i = ve(r, s, o) - t), i > 0 ? (n = r) : (e = r);
  while (Math.abs(i) > ac && ++a < cc);
  return r;
}
const uc = 8,
  fc = 0.001;
function dc(t, e, n, s) {
  for (let o = 0; o < uc; ++o) {
    const i = pr(e, n, s);
    if (i === 0) return e;
    const r = ve(e, n, s) - t;
    e -= r / i;
  }
  return e;
}
const ie = 11,
  te = 1 / (ie - 1);
function hc(t, e, n, s) {
  if (t === e && n === s) return Dn;
  const o = new Float32Array(ie);
  for (let r = 0; r < ie; ++r) o[r] = ve(r * te, t, n);
  function i(r) {
    let a = 0,
      c = 1;
    const l = ie - 1;
    for (; c !== l && o[c] <= r; ++c) a += te;
    --c;
    const u = (r - o[c]) / (o[c + 1] - o[c]),
      f = a + u * te,
      d = pr(f, t, n);
    return d >= fc ? dc(r, f, t, n) : d === 0 ? f : lc(r, a, a + te, t, n);
  }
  return (r) => (r === 0 || r === 1 ? r : ve(i(r), e, s));
}
function pc({
  onTap: t,
  onTapStart: e,
  onTapCancel: n,
  whileTap: s,
  visualElement: o,
}) {
  const i = t || e || n || s,
    r = p.exports.useRef(!1),
    a = p.exports.useRef(null),
    c = { passive: !(e || t || n || h) };
  function l() {
    a.current && a.current(), (a.current = null);
  }
  function u() {
    return (
      l(),
      (r.current = !1),
      o.animationState && o.animationState.setActive(M.Tap, !1),
      !Xo()
    );
  }
  function f(m, x) {
    !u() || (qo(o.getInstance(), m.target) ? t && t(m, x) : n && n(m, x));
  }
  function d(m, x) {
    !u() || (n && n(m, x));
  }
  function h(m, x) {
    l(),
      !r.current &&
        ((r.current = !0),
        (a.current = Ae(
          Pt(window, "pointerup", f, c),
          Pt(window, "pointercancel", d, c)
        )),
        o.animationState && o.animationState.setActive(M.Tap, !0),
        e && e(m, x));
  }
  he(o, "pointerdown", i ? h : void 0, c), Mn(l);
}
const mc = "production",
  Bn = typeof process > "u" || process.env === void 0 ? mc : "production",
  vs = new Set();
function Le(t, e, n) {
  t || vs.has(e) || (console.warn(e), n && console.warn(n), vs.add(e));
}
const sn = new WeakMap(),
  Be = new WeakMap(),
  gc = (t) => {
    const e = sn.get(t.target);
    e && e(t);
  },
  yc = (t) => {
    t.forEach(gc);
  };
function vc({ root: t, ...e }) {
  const n = t || document;
  Be.has(n) || Be.set(n, {});
  const s = Be.get(n),
    o = JSON.stringify(e);
  return s[o] || (s[o] = new IntersectionObserver(yc, { root: t, ...e })), s[o];
}
function xc(t, e, n) {
  const s = vc(e);
  return (
    sn.set(t, n),
    s.observe(t),
    () => {
      sn.delete(t), s.unobserve(t);
    }
  );
}
function bc({
  visualElement: t,
  whileInView: e,
  onViewportEnter: n,
  onViewportLeave: s,
  viewport: o = {},
}) {
  const i = p.exports.useRef({ hasEnteredView: !1, isInView: !1 });
  let r = Boolean(e || n || s);
  o.once && i.current.hasEnteredView && (r = !1),
    (typeof IntersectionObserver > "u" ? wc : Vc)(r, i.current, t, o);
}
const Sc = { some: 0, all: 1 };
function Vc(t, e, n, { root: s, margin: o, amount: i = "some", once: r }) {
  p.exports.useEffect(() => {
    if (!t) return;
    const a = {
        root: s == null ? void 0 : s.current,
        rootMargin: o,
        threshold: typeof i == "number" ? i : Sc[i],
      },
      c = (l) => {
        const { isIntersecting: u } = l;
        if (e.isInView === u || ((e.isInView = u), r && !u && e.hasEnteredView))
          return;
        u && (e.hasEnteredView = !0),
          n.animationState && n.animationState.setActive(M.InView, u);
        const f = n.getProps(),
          d = u ? f.onViewportEnter : f.onViewportLeave;
        d && d(l);
      };
    return xc(n.getInstance(), a, c);
  }, [t, s, o, i]);
}
function wc(t, e, n, { fallback: s = !0 }) {
  p.exports.useEffect(() => {
    !t ||
      !s ||
      (Bn !== "production" &&
        Le(
          !1,
          "IntersectionObserver not available on this device. whileInView animations will trigger on mount."
        ),
      requestAnimationFrame(() => {
        e.hasEnteredView = !0;
        const { onViewportEnter: o } = n.getProps();
        o && o(null),
          n.animationState && n.animationState.setActive(M.InView, !0);
      }));
  }, [t]);
}
const ct = (t) => (e) => (t(e), null),
  mr = { inView: ct(bc), tap: ct(pc), focus: ct(ea), hover: ct(fa) };
function gr() {
  const t = p.exports.useContext(At);
  if (t === null) return [!0, null];
  const { isPresent: e, onExitComplete: n, register: s } = t,
    o = p.exports.useId();
  return (
    p.exports.useEffect(() => s(o), []), !e && n ? [!1, () => n && n(o)] : [!0]
  );
}
function If() {
  return Tc(p.exports.useContext(At));
}
function Tc(t) {
  return t === null ? !0 : t.isPresent;
}
function yr(t, e) {
  if (!Array.isArray(e)) return !1;
  const n = e.length;
  if (n !== t.length) return !1;
  for (let s = 0; s < n; s++) if (e[s] !== t[s]) return !1;
  return !0;
}
const xe = (t) => t * 1e3,
  Pc = {
    linear: Dn,
    easeIn: In,
    easeInOut: or,
    easeOut: ka,
    circIn: rr,
    circInOut: ja,
    circOut: Fn,
    backIn: kn,
    backInOut: Ba,
    backOut: _a,
    anticipate: Ua,
    bounceIn: Ha,
    bounceInOut: Wa,
    bounceOut: ge,
  },
  xs = (t) => {
    if (Array.isArray(t)) {
      pe(t.length === 4);
      const [e, n, s, o] = t;
      return hc(e, n, s, o);
    } else if (typeof t == "string") return Pc[t];
    return t;
  },
  Cc = (t) => Array.isArray(t) && typeof t[0] != "number",
  bs = (t, e) =>
    t === "zIndex"
      ? !1
      : !!(
          typeof e == "number" ||
          Array.isArray(e) ||
          (typeof e == "string" && et.test(e) && !e.startsWith("url("))
        ),
  ut = () => ({ type: "spring", stiffness: 500, damping: 25, restSpeed: 10 }),
  ee = (t) => ({
    type: "spring",
    stiffness: 550,
    damping: t === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  Ue = () => ({ type: "keyframes", ease: "linear", duration: 0.3 }),
  Ac = (t) => ({ type: "keyframes", duration: 0.8, values: t }),
  Ss = {
    x: ut,
    y: ut,
    z: ut,
    rotate: ut,
    rotateX: ut,
    rotateY: ut,
    rotateZ: ut,
    scaleX: ee,
    scaleY: ee,
    scale: ee,
    opacity: Ue,
    backgroundColor: Ue,
    color: Ue,
    default: ee,
  },
  Rc = (t, e) => {
    let n;
    return Wt(e) ? (n = Ac) : (n = Ss[t] || Ss.default), { to: e, ...n(e) };
  },
  Mc = {
    ...Do,
    color: B,
    backgroundColor: B,
    outlineColor: B,
    fill: B,
    stroke: B,
    borderColor: B,
    borderTopColor: B,
    borderRightColor: B,
    borderBottomColor: B,
    borderLeftColor: B,
    filter: qe,
    WebkitFilter: qe,
  },
  Un = (t) => Mc[t];
function Nn(t, e) {
  var n;
  let s = Un(t);
  return (
    s !== qe && (s = et),
    (n = s.getAnimatableNone) === null || n === void 0 ? void 0 : n.call(s, e)
  );
}
const on = { current: !1 };
function vr(t, e) {
  const n = performance.now(),
    s = ({ timestamp: o }) => {
      const i = o - n;
      i >= e && (q.read(s), t(i - e));
    };
  return j.read(s, !0), () => q.read(s);
}
function Lc({
  when: t,
  delay: e,
  delayChildren: n,
  staggerChildren: s,
  staggerDirection: o,
  repeat: i,
  repeatType: r,
  repeatDelay: a,
  from: c,
  ...l
}) {
  return !!Object.keys(l).length;
}
function Ec({ ease: t, times: e, yoyo: n, flip: s, loop: o, ...i }) {
  const r = { ...i };
  return (
    e && (r.offset = e),
    i.duration && (r.duration = xe(i.duration)),
    i.repeatDelay && (r.repeatDelay = xe(i.repeatDelay)),
    t && (r.ease = Cc(t) ? t.map(xs) : xs(t)),
    i.type === "tween" && (r.type = "keyframes"),
    (n || o || s) &&
      (n
        ? (r.repeatType = "reverse")
        : o
        ? (r.repeatType = "loop")
        : s && (r.repeatType = "mirror"),
      (r.repeat = o || n || s || i.repeat)),
    i.type !== "spring" && (r.type = "keyframes"),
    r
  );
}
function Oc(t, e) {
  var n, s;
  return (s =
    (n = (zn(t, e) || {}).delay) !== null && n !== void 0 ? n : t.delay) !==
    null && s !== void 0
    ? s
    : 0;
}
function Dc(t) {
  return (
    Array.isArray(t.to) &&
      t.to[0] === null &&
      ((t.to = [...t.to]), (t.to[0] = t.from)),
    t
  );
}
function Ic(t, e, n) {
  return (
    Array.isArray(e.to) && t.duration === void 0 && (t.duration = 0.8),
    Dc(e),
    Lc(t) || (t = { ...t, ...Rc(n, e.to) }),
    { ...e, ...Ec(t) }
  );
}
function Fc(t, e, n, s, o) {
  const i = zn(s, t) || {};
  let r = i.from !== void 0 ? i.from : e.get();
  const a = bs(t, n);
  r === "none" && a && typeof n == "string"
    ? (r = Nn(t, n))
    : Vs(r) && typeof n == "string"
    ? (r = ws(n))
    : !Array.isArray(n) && Vs(n) && typeof r == "string" && (n = ws(r));
  const c = bs(t, r);
  function l() {
    const f = {
      from: r,
      to: n,
      velocity: e.getVelocity(),
      onComplete: o,
      onUpdate: (d) => e.set(d),
    };
    return i.type === "inertia" || i.type === "decay"
      ? rc({ ...f, ...i })
      : jn({
          ...Ic(i, f, t),
          onUpdate: (d) => {
            f.onUpdate(d), i.onUpdate && i.onUpdate(d);
          },
          onComplete: () => {
            f.onComplete(), i.onComplete && i.onComplete();
          },
        });
  }
  function u() {
    const f = zo(n);
    return (
      e.set(f),
      o(),
      i.onUpdate && i.onUpdate(f),
      i.onComplete && i.onComplete(),
      { stop: () => {} }
    );
  }
  return !c || !a || i.type === !1 ? u : l;
}
function Vs(t) {
  return (
    t === 0 ||
    (typeof t == "string" && parseFloat(t) === 0 && t.indexOf(" ") === -1)
  );
}
function ws(t) {
  return typeof t == "number" ? 0 : Nn("", t);
}
function zn(t, e) {
  return t[e] || t.default || t;
}
function $n(t, e, n, s = {}) {
  return (
    on.current && (s = { type: !1 }),
    e.start((o) => {
      let i;
      const r = Fc(t, e, n, s, o),
        a = Oc(s, t),
        c = () => (i = r());
      let l;
      return (
        a ? (l = vr(c, xe(a))) : c(),
        () => {
          l && l(), i && i.stop();
        }
      );
    })
  );
}
const kc = (t) => /^\-?\d*\.?\d+$/.test(t),
  jc = (t) => /^0[^.\s]+$/.test(t);
function Ee(t, e) {
  t.indexOf(e) === -1 && t.push(e);
}
function Kt(t, e) {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}
function _c([...t], e, n) {
  const s = e < 0 ? t.length + e : e;
  if (s >= 0 && s < t.length) {
    const o = n < 0 ? t.length + n : n,
      [i] = t.splice(e, 1);
    t.splice(o, 0, i);
  }
  return t;
}
class kt {
  constructor() {
    this.subscriptions = [];
  }
  add(e) {
    return Ee(this.subscriptions, e), () => Kt(this.subscriptions, e);
  }
  notify(e, n, s) {
    const o = this.subscriptions.length;
    if (!!o)
      if (o === 1) this.subscriptions[0](e, n, s);
      else
        for (let i = 0; i < o; i++) {
          const r = this.subscriptions[i];
          r && r(e, n, s);
        }
  }
  getSize() {
    return this.subscriptions.length;
  }
  clear() {
    this.subscriptions.length = 0;
  }
}
const Bc = (t) => !isNaN(parseFloat(t));
class xr {
  constructor(e) {
    (this.version = "7.6.4"),
      (this.timeDelta = 0),
      (this.lastUpdated = 0),
      (this.updateSubscribers = new kt()),
      (this.velocityUpdateSubscribers = new kt()),
      (this.renderSubscribers = new kt()),
      (this.canTrackVelocity = !1),
      (this.updateAndNotify = (n, s = !0) => {
        (this.prev = this.current), (this.current = n);
        const { delta: o, timestamp: i } = ye();
        this.lastUpdated !== i &&
          ((this.timeDelta = o),
          (this.lastUpdated = i),
          j.postRender(this.scheduleVelocityCheck)),
          this.prev !== this.current &&
            this.updateSubscribers.notify(this.current),
          this.velocityUpdateSubscribers.getSize() &&
            this.velocityUpdateSubscribers.notify(this.getVelocity()),
          s && this.renderSubscribers.notify(this.current);
      }),
      (this.scheduleVelocityCheck = () => j.postRender(this.velocityCheck)),
      (this.velocityCheck = ({ timestamp: n }) => {
        n !== this.lastUpdated &&
          ((this.prev = this.current),
          this.velocityUpdateSubscribers.notify(this.getVelocity()));
      }),
      (this.hasAnimated = !1),
      (this.prev = this.current = e),
      (this.canTrackVelocity = Bc(this.current));
  }
  onChange(e) {
    return this.updateSubscribers.add(e);
  }
  clearListeners() {
    this.updateSubscribers.clear();
  }
  onRenderRequest(e) {
    return e(this.get()), this.renderSubscribers.add(e);
  }
  attach(e) {
    this.passiveEffect = e;
  }
  set(e, n = !0) {
    !n || !this.passiveEffect
      ? this.updateAndNotify(e, n)
      : this.passiveEffect(e, this.updateAndNotify);
  }
  get() {
    return this.current;
  }
  getPrevious() {
    return this.prev;
  }
  getVelocity() {
    return this.canTrackVelocity
      ? ur(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
      : 0;
  }
  start(e) {
    return (
      this.stop(),
      new Promise((n) => {
        (this.hasAnimated = !0), (this.stopAnimation = e(n));
      }).then(() => this.clearAnimation())
    );
  }
  stop() {
    this.stopAnimation && this.stopAnimation(), this.clearAnimation();
  }
  isAnimating() {
    return !!this.stopAnimation;
  }
  clearAnimation() {
    this.stopAnimation = null;
  }
  destroy() {
    this.updateSubscribers.clear(), this.renderSubscribers.clear(), this.stop();
  }
}
function G(t) {
  return new xr(t);
}
const br = (t) => (e) => e.test(t),
  Uc = { test: (t) => t === "auto", parse: (t) => t },
  Sr = [xt, T, X, ot, Ci, Pi, Uc],
  Lt = (t) => Sr.find(br(t)),
  Nc = [...Sr, B, et],
  zc = (t) => Nc.find(br(t));
function $c(t) {
  const e = {};
  return t.forEachValue((n, s) => (e[s] = n.get())), e;
}
function Hc(t) {
  const e = {};
  return t.forEachValue((n, s) => (e[s] = n.getVelocity())), e;
}
function Oe(t, e, n) {
  const s = t.getProps();
  return Pn(s, e, n !== void 0 ? n : s.custom, $c(t), Hc(t));
}
function Wc(t, e, n) {
  t.hasValue(e) ? t.getValue(e).set(n) : t.addValue(e, G(n));
}
function Hn(t, e) {
  const n = Oe(t, e);
  let {
    transitionEnd: s = {},
    transition: o = {},
    ...i
  } = n ? t.makeTargetAnimatable(n, !1) : {};
  i = { ...i, ...s };
  for (const r in i) {
    const a = zo(i[r]);
    Wc(t, r, a);
  }
}
function rn(t, e) {
  [...e].reverse().forEach((s) => {
    var o;
    const i = t.getVariant(s);
    i && Hn(t, i),
      (o = t.variantChildren) === null ||
        o === void 0 ||
        o.forEach((r) => {
          rn(r, e);
        });
  });
}
function Gc(t, e) {
  if (Array.isArray(e)) return rn(t, e);
  if (typeof e == "string") return rn(t, [e]);
  Hn(t, e);
}
function Vr(t, e, n) {
  var s, o;
  const i = Object.keys(e).filter((a) => !t.hasValue(a)),
    r = i.length;
  if (!!r)
    for (let a = 0; a < r; a++) {
      const c = i[a],
        l = e[c];
      let u = null;
      Array.isArray(l) && (u = l[0]),
        u === null &&
          (u =
            (o = (s = n[c]) !== null && s !== void 0 ? s : t.readValue(c)) !==
              null && o !== void 0
              ? o
              : e[c]),
        u != null &&
          (typeof u == "string" && (kc(u) || jc(u))
            ? (u = parseFloat(u))
            : !zc(u) && et.test(l) && (u = Nn(c, l)),
          t.addValue(c, G(u)),
          n[c] === void 0 && (n[c] = u),
          t.setBaseTarget(c, u));
    }
}
function Yc(t, e) {
  return e ? (e[t] || e.default || e).from : void 0;
}
function wr(t, e, n) {
  var s;
  const o = {};
  for (const i in t) {
    const r = Yc(i, e);
    o[i] =
      r !== void 0
        ? r
        : (s = n.getValue(i)) === null || s === void 0
        ? void 0
        : s.get();
  }
  return o;
}
function be(t) {
  return Boolean(U(t) && t.add);
}
function Wn(t, e, n = {}) {
  t.notifyAnimationStart(e);
  let s;
  if (Array.isArray(e)) {
    const o = e.map((i) => an(t, i, n));
    s = Promise.all(o);
  } else if (typeof e == "string") s = an(t, e, n);
  else {
    const o = typeof e == "function" ? Oe(t, e, n.custom) : e;
    s = Tr(t, o, n);
  }
  return s.then(() => t.notifyAnimationComplete(e));
}
function an(t, e, n = {}) {
  var s;
  const o = Oe(t, e, n.custom);
  let { transition: i = t.getDefaultTransition() || {} } = o || {};
  n.transitionOverride && (i = n.transitionOverride);
  const r = o ? () => Tr(t, o, n) : () => Promise.resolve(),
    a =
      !((s = t.variantChildren) === null || s === void 0) && s.size
        ? (l = 0) => {
            const {
              delayChildren: u = 0,
              staggerChildren: f,
              staggerDirection: d,
            } = i;
            return Kc(t, e, u + l, f, d, n);
          }
        : () => Promise.resolve(),
    { when: c } = i;
  if (c) {
    const [l, u] = c === "beforeChildren" ? [r, a] : [a, r];
    return l().then(u);
  } else return Promise.all([r(), a(n.delay)]);
}
function Tr(t, e, { delay: n = 0, transitionOverride: s, type: o } = {}) {
  var i;
  let {
    transition: r = t.getDefaultTransition(),
    transitionEnd: a,
    ...c
  } = t.makeTargetAnimatable(e);
  const l = t.getValue("willChange");
  s && (r = s);
  const u = [],
    f =
      o &&
      ((i = t.animationState) === null || i === void 0
        ? void 0
        : i.getState()[o]);
  for (const d in c) {
    const h = t.getValue(d),
      m = c[d];
    if (!h || m === void 0 || (f && Zc(f, d))) continue;
    let x = { delay: n, ...r };
    t.shouldReduceMotion && gt.has(d) && (x = { ...x, type: !1, delay: 0 });
    let S = $n(d, h, m, x);
    be(l) && (l.add(d), (S = S.then(() => l.remove(d)))), u.push(S);
  }
  return Promise.all(u).then(() => {
    a && Hn(t, a);
  });
}
function Kc(t, e, n = 0, s = 0, o = 1, i) {
  const r = [],
    a = (t.variantChildren.size - 1) * s,
    c = o === 1 ? (l = 0) => l * s : (l = 0) => a - l * s;
  return (
    Array.from(t.variantChildren)
      .sort(qc)
      .forEach((l, u) => {
        r.push(
          an(l, e, { ...i, delay: n + c(u) }).then(() =>
            l.notifyAnimationComplete(e)
          )
        );
      }),
    Promise.all(r)
  );
}
function Xc(t) {
  t.forEachValue((e) => e.stop());
}
function qc(t, e) {
  return t.sortNodePosition(e);
}
function Zc({ protectedKeys: t, needsAnimating: e }, n) {
  const s = t.hasOwnProperty(n) && e[n] !== !0;
  return (e[n] = !1), s;
}
const Gn = [M.Animate, M.InView, M.Focus, M.Hover, M.Tap, M.Drag, M.Exit],
  Jc = [...Gn].reverse(),
  Qc = Gn.length;
function tl(t) {
  return (e) =>
    Promise.all(e.map(({ animation: n, options: s }) => Wn(t, n, s)));
}
function el(t) {
  let e = tl(t);
  const n = sl();
  let s = !0;
  const o = (c, l) => {
    const u = Oe(t, l);
    if (u) {
      const { transition: f, transitionEnd: d, ...h } = u;
      c = { ...c, ...h, ...d };
    }
    return c;
  };
  function i(c) {
    e = c(t);
  }
  function r(c, l) {
    var u;
    const f = t.getProps(),
      d = t.getVariantContext(!0) || {},
      h = [],
      m = new Set();
    let x = {},
      S = 1 / 0;
    for (let b = 0; b < Qc; b++) {
      const g = Jc[b],
        v = n[g],
        w = (u = f[g]) !== null && u !== void 0 ? u : d[g],
        A = Nt(w),
        E = g === l ? v.isActive : null;
      E === !1 && (S = b);
      let k = w === d[g] && w !== f[g] && A;
      if (
        (k && s && t.manuallyAnimateOnMount && (k = !1),
        (v.protectedKeys = { ...x }),
        (!v.isActive && E === null) ||
          (!w && !v.prevProp) ||
          Te(w) ||
          typeof w == "boolean")
      )
        continue;
      const I = nl(v.prevProp, w);
      let $ = I || (g === l && v.isActive && !k && A) || (b > S && A);
      const Z = Array.isArray(w) ? w : [w];
      let H = Z.reduce(o, {});
      E === !1 && (H = {});
      const { prevResolvedValues: lt = {} } = v,
        nt = { ...lt, ...H },
        J = (O) => {
          ($ = !0), m.delete(O), (v.needsAnimating[O] = !0);
        };
      for (const O in nt) {
        const st = H[O],
          bt = lt[O];
        x.hasOwnProperty(O) ||
          (st !== bt
            ? Wt(st) && Wt(bt)
              ? !yr(st, bt) || I
                ? J(O)
                : (v.protectedKeys[O] = !0)
              : st !== void 0
              ? J(O)
              : m.add(O)
            : st !== void 0 && m.has(O)
            ? J(O)
            : (v.protectedKeys[O] = !0));
      }
      (v.prevProp = w),
        (v.prevResolvedValues = H),
        v.isActive && (x = { ...x, ...H }),
        s && t.blockInitialAnimation && ($ = !1),
        $ &&
          !k &&
          h.push(
            ...Z.map((O) => ({ animation: O, options: { type: g, ...c } }))
          );
    }
    if (m.size) {
      const b = {};
      m.forEach((g) => {
        const v = t.getBaseTarget(g);
        v !== void 0 && (b[g] = v);
      }),
        h.push({ animation: b });
    }
    let V = Boolean(h.length);
    return (
      s && f.initial === !1 && !t.manuallyAnimateOnMount && (V = !1),
      (s = !1),
      V ? e(h) : Promise.resolve()
    );
  }
  function a(c, l, u) {
    var f;
    if (n[c].isActive === l) return Promise.resolve();
    (f = t.variantChildren) === null ||
      f === void 0 ||
      f.forEach((h) => {
        var m;
        return (m = h.animationState) === null || m === void 0
          ? void 0
          : m.setActive(c, l);
      }),
      (n[c].isActive = l);
    const d = r(u, c);
    for (const h in n) n[h].protectedKeys = {};
    return d;
  }
  return {
    animateChanges: r,
    setActive: a,
    setAnimateFunction: i,
    getState: () => n,
  };
}
function nl(t, e) {
  return typeof e == "string" ? e !== t : Array.isArray(e) ? !yr(e, t) : !1;
}
function ft(t = !1) {
  return {
    isActive: t,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function sl() {
  return {
    [M.Animate]: ft(!0),
    [M.InView]: ft(),
    [M.Hover]: ft(),
    [M.Tap]: ft(),
    [M.Drag]: ft(),
    [M.Focus]: ft(),
    [M.Exit]: ft(),
  };
}
const Pr = {
  animation: ct(({ visualElement: t, animate: e }) => {
    t.animationState || (t.animationState = el(t)),
      Te(e) && p.exports.useEffect(() => e.subscribe(t), [e]);
  }),
  exit: ct((t) => {
    const { custom: e, visualElement: n } = t,
      [s, o] = gr(),
      i = p.exports.useContext(At);
    p.exports.useEffect(() => {
      n.isPresent = s;
      const r =
        n.animationState &&
        n.animationState.setActive(M.Exit, !s, {
          custom: (i && i.custom) || e,
        });
      r && !s && r.then(o);
    }, [s]);
  }),
};
class Cr {
  constructor(e, n, { transformPagePoint: s } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        const l = ze(this.lastMoveEventInfo, this.history),
          u = this.startEvent !== null,
          f = _n(l.offset, { x: 0, y: 0 }) >= 3;
        if (!u && !f) return;
        const { point: d } = l,
          { timestamp: h } = ye();
        this.history.push({ ...d, timestamp: h });
        const { onStart: m, onMove: x } = this.handlers;
        u ||
          (m && m(this.lastMoveEvent, l),
          (this.startEvent = this.lastMoveEvent)),
          x && x(this.lastMoveEvent, l);
      }),
      (this.handlePointerMove = (l, u) => {
        if (
          ((this.lastMoveEvent = l),
          (this.lastMoveEventInfo = Ne(u, this.transformPagePoint)),
          $o(l) && l.buttons === 0)
        ) {
          this.handlePointerUp(l, u);
          return;
        }
        j.update(this.updatePoint, !0);
      }),
      (this.handlePointerUp = (l, u) => {
        this.end();
        const { onEnd: f, onSessionEnd: d } = this.handlers,
          h = ze(Ne(u, this.transformPagePoint), this.history);
        this.startEvent && f && f(l, h), d && d(l, h);
      }),
      Ho(e) && e.touches.length > 1)
    )
      return;
    (this.handlers = n), (this.transformPagePoint = s);
    const o = Rn(e),
      i = Ne(o, this.transformPagePoint),
      { point: r } = i,
      { timestamp: a } = ye();
    this.history = [{ ...r, timestamp: a }];
    const { onSessionStart: c } = n;
    c && c(e, ze(i, this.history)),
      (this.removeListeners = Ae(
        Pt(window, "pointermove", this.handlePointerMove),
        Pt(window, "pointerup", this.handlePointerUp),
        Pt(window, "pointercancel", this.handlePointerUp)
      ));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    this.removeListeners && this.removeListeners(), q.update(this.updatePoint);
  }
}
function Ne(t, e) {
  return e ? { point: e(t.point) } : t;
}
function Ts(t, e) {
  return { x: t.x - e.x, y: t.y - e.y };
}
function ze({ point: t }, e) {
  return {
    point: t,
    delta: Ts(t, Ar(e)),
    offset: Ts(t, ol(e)),
    velocity: rl(e, 0.1),
  };
}
function ol(t) {
  return t[0];
}
function Ar(t) {
  return t[t.length - 1];
}
function rl(t, e) {
  if (t.length < 2) return { x: 0, y: 0 };
  let n = t.length - 1,
    s = null;
  const o = Ar(t);
  for (; n >= 0 && ((s = t[n]), !(o.timestamp - s.timestamp > xe(e))); ) n--;
  if (!s) return { x: 0, y: 0 };
  const i = (o.timestamp - s.timestamp) / 1e3;
  if (i === 0) return { x: 0, y: 0 };
  const r = { x: (o.x - s.x) / i, y: (o.y - s.y) / i };
  return r.x === 1 / 0 && (r.x = 0), r.y === 1 / 0 && (r.y = 0), r;
}
function N(t) {
  return t.max - t.min;
}
function Ps(t, e = 0, n = 0.01) {
  return _n(t, e) < n;
}
function Cs(t, e, n, s = 0.5) {
  (t.origin = s),
    (t.originPoint = L(e.min, e.max, t.origin)),
    (t.scale = N(n) / N(e)),
    (Ps(t.scale, 1, 1e-4) || isNaN(t.scale)) && (t.scale = 1),
    (t.translate = L(n.min, n.max, t.origin) - t.originPoint),
    (Ps(t.translate) || isNaN(t.translate)) && (t.translate = 0);
}
function jt(t, e, n, s) {
  Cs(t.x, e.x, n.x, s == null ? void 0 : s.originX),
    Cs(t.y, e.y, n.y, s == null ? void 0 : s.originY);
}
function As(t, e, n) {
  (t.min = n.min + e.min), (t.max = t.min + N(e));
}
function il(t, e, n) {
  As(t.x, e.x, n.x), As(t.y, e.y, n.y);
}
function Rs(t, e, n) {
  (t.min = e.min - n.min), (t.max = t.min + N(e));
}
function _t(t, e, n) {
  Rs(t.x, e.x, n.x), Rs(t.y, e.y, n.y);
}
function al(t, { min: e, max: n }, s) {
  return (
    e !== void 0 && t < e
      ? (t = s ? L(e, t, s.min) : Math.max(t, e))
      : n !== void 0 && t > n && (t = s ? L(n, t, s.max) : Math.min(t, n)),
    t
  );
}
function Ms(t, e, n) {
  return {
    min: e !== void 0 ? t.min + e : void 0,
    max: n !== void 0 ? t.max + n - (t.max - t.min) : void 0,
  };
}
function cl(t, { top: e, left: n, bottom: s, right: o }) {
  return { x: Ms(t.x, n, o), y: Ms(t.y, e, s) };
}
function Ls(t, e) {
  let n = e.min - t.min,
    s = e.max - t.max;
  return e.max - e.min < t.max - t.min && ([n, s] = [s, n]), { min: n, max: s };
}
function ll(t, e) {
  return { x: Ls(t.x, e.x), y: Ls(t.y, e.y) };
}
function ul(t, e) {
  let n = 0.5;
  const s = N(t),
    o = N(e);
  return (
    o > s
      ? (n = Gt(e.min, e.max - s, t.min))
      : s > o && (n = Gt(t.min, t.max - o, e.min)),
    me(0, 1, n)
  );
}
function fl(t, e) {
  const n = {};
  return (
    e.min !== void 0 && (n.min = e.min - t.min),
    e.max !== void 0 && (n.max = e.max - t.min),
    n
  );
}
const cn = 0.35;
function dl(t = cn) {
  return (
    t === !1 ? (t = 0) : t === !0 && (t = cn),
    { x: Es(t, "left", "right"), y: Es(t, "top", "bottom") }
  );
}
function Es(t, e, n) {
  return { min: Os(t, e), max: Os(t, n) };
}
function Os(t, e) {
  var n;
  return typeof t == "number" ? t : (n = t[e]) !== null && n !== void 0 ? n : 0;
}
const Ds = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
  Bt = () => ({ x: Ds(), y: Ds() }),
  Is = () => ({ min: 0, max: 0 }),
  D = () => ({ x: Is(), y: Is() });
function K(t) {
  return [t("x"), t("y")];
}
function Rr({ top: t, left: e, right: n, bottom: s }) {
  return { x: { min: e, max: n }, y: { min: t, max: s } };
}
function hl({ x: t, y: e }) {
  return { top: e.min, right: t.max, bottom: e.max, left: t.min };
}
function pl(t, e) {
  if (!e) return t;
  const n = e({ x: t.left, y: t.top }),
    s = e({ x: t.right, y: t.bottom });
  return { top: n.y, left: n.x, bottom: s.y, right: s.x };
}
function $e(t) {
  return t === void 0 || t === 1;
}
function ln({ scale: t, scaleX: e, scaleY: n }) {
  return !$e(t) || !$e(e) || !$e(n);
}
function dt(t) {
  return ln(t) || Mr(t) || t.z || t.rotate || t.rotateX || t.rotateY;
}
function Mr(t) {
  return Fs(t.x) || Fs(t.y);
}
function Fs(t) {
  return t && t !== "0%";
}
function Se(t, e, n) {
  const s = t - n,
    o = e * s;
  return n + o;
}
function ks(t, e, n, s, o) {
  return o !== void 0 && (t = Se(t, o, s)), Se(t, n, s) + e;
}
function un(t, e = 0, n = 1, s, o) {
  (t.min = ks(t.min, e, n, s, o)), (t.max = ks(t.max, e, n, s, o));
}
function Lr(t, { x: e, y: n }) {
  un(t.x, e.translate, e.scale, e.originPoint),
    un(t.y, n.translate, n.scale, n.originPoint);
}
function ml(t, e, n, s = !1) {
  var o, i;
  const r = n.length;
  if (!r) return;
  e.x = e.y = 1;
  let a, c;
  for (let l = 0; l < r; l++)
    (a = n[l]),
      (c = a.projectionDelta),
      ((i = (o = a.instance) === null || o === void 0 ? void 0 : o.style) ===
        null || i === void 0
        ? void 0
        : i.display) !== "contents" &&
        (s &&
          a.options.layoutScroll &&
          a.scroll &&
          a !== a.root &&
          Tt(t, { x: -a.scroll.x, y: -a.scroll.y }),
        c && ((e.x *= c.x.scale), (e.y *= c.y.scale), Lr(t, c)),
        s && dt(a.latestValues) && Tt(t, a.latestValues));
}
function it(t, e) {
  (t.min = t.min + e), (t.max = t.max + e);
}
function js(t, e, [n, s, o]) {
  const i = e[o] !== void 0 ? e[o] : 0.5,
    r = L(t.min, t.max, i);
  un(t, e[n], e[s], r, e.scale);
}
const gl = ["x", "scaleX", "originX"],
  yl = ["y", "scaleY", "originY"];
function Tt(t, e) {
  js(t.x, e, gl), js(t.y, e, yl);
}
function Er(t, e) {
  return Rr(pl(t.getBoundingClientRect(), e));
}
function vl(t, e, n) {
  const s = Er(t, n),
    { scroll: o } = e;
  return o && (it(s.x, o.x), it(s.y, o.y)), s;
}
const xl = new WeakMap();
class bl {
  constructor(e) {
    (this.openGlobalLock = null),
      (this.isDragging = !1),
      (this.currentDirection = null),
      (this.originPoint = { x: 0, y: 0 }),
      (this.constraints = !1),
      (this.hasMutatedConstraints = !1),
      (this.elastic = D()),
      (this.visualElement = e);
  }
  start(e, { snapToCursor: n = !1 } = {}) {
    if (this.visualElement.isPresent === !1) return;
    const s = (a) => {
        this.stopAnimation(), n && this.snapToCursor(Rn(a, "page").point);
      },
      o = (a, c) => {
        var l;
        const { drag: u, dragPropagation: f, onDragStart: d } = this.getProps();
        (u &&
          !f &&
          (this.openGlobalLock && this.openGlobalLock(),
          (this.openGlobalLock = Ko(u)),
          !this.openGlobalLock)) ||
          ((this.isDragging = !0),
          (this.currentDirection = null),
          this.resolveConstraints(),
          this.visualElement.projection &&
            ((this.visualElement.projection.isAnimationBlocked = !0),
            (this.visualElement.projection.target = void 0)),
          K((h) => {
            var m, x;
            let S = this.getAxisMotionValue(h).get() || 0;
            if (X.test(S)) {
              const V =
                (x =
                  (m = this.visualElement.projection) === null || m === void 0
                    ? void 0
                    : m.layout) === null || x === void 0
                  ? void 0
                  : x.actual[h];
              V && (S = N(V) * (parseFloat(S) / 100));
            }
            this.originPoint[h] = S;
          }),
          d == null || d(a, c),
          (l = this.visualElement.animationState) === null ||
            l === void 0 ||
            l.setActive(M.Drag, !0));
      },
      i = (a, c) => {
        const {
          dragPropagation: l,
          dragDirectionLock: u,
          onDirectionLock: f,
          onDrag: d,
        } = this.getProps();
        if (!l && !this.openGlobalLock) return;
        const { offset: h } = c;
        if (u && this.currentDirection === null) {
          (this.currentDirection = Sl(h)),
            this.currentDirection !== null &&
              (f == null || f(this.currentDirection));
          return;
        }
        this.updateAxis("x", c.point, h),
          this.updateAxis("y", c.point, h),
          this.visualElement.syncRender(),
          d == null || d(a, c);
      },
      r = (a, c) => this.stop(a, c);
    this.panSession = new Cr(
      e,
      { onSessionStart: s, onStart: o, onMove: i, onSessionEnd: r },
      { transformPagePoint: this.visualElement.getTransformPagePoint() }
    );
  }
  stop(e, n) {
    const s = this.isDragging;
    if ((this.cancel(), !s)) return;
    const { velocity: o } = n;
    this.startAnimation(o);
    const { onDragEnd: i } = this.getProps();
    i == null || i(e, n);
  }
  cancel() {
    var e, n;
    (this.isDragging = !1),
      this.visualElement.projection &&
        (this.visualElement.projection.isAnimationBlocked = !1),
      (e = this.panSession) === null || e === void 0 || e.end(),
      (this.panSession = void 0);
    const { dragPropagation: s } = this.getProps();
    !s &&
      this.openGlobalLock &&
      (this.openGlobalLock(), (this.openGlobalLock = null)),
      (n = this.visualElement.animationState) === null ||
        n === void 0 ||
        n.setActive(M.Drag, !1);
  }
  updateAxis(e, n, s) {
    const { drag: o } = this.getProps();
    if (!s || !ne(e, o, this.currentDirection)) return;
    const i = this.getAxisMotionValue(e);
    let r = this.originPoint[e] + s[e];
    this.constraints &&
      this.constraints[e] &&
      (r = al(r, this.constraints[e], this.elastic[e])),
      i.set(r);
  }
  resolveConstraints() {
    const { dragConstraints: e, dragElastic: n } = this.getProps(),
      { layout: s } = this.visualElement.projection || {},
      o = this.constraints;
    e && wt(e)
      ? this.constraints || (this.constraints = this.resolveRefConstraints())
      : e && s
      ? (this.constraints = cl(s.actual, e))
      : (this.constraints = !1),
      (this.elastic = dl(n)),
      o !== this.constraints &&
        s &&
        this.constraints &&
        !this.hasMutatedConstraints &&
        K((i) => {
          this.getAxisMotionValue(i) &&
            (this.constraints[i] = fl(s.actual[i], this.constraints[i]));
        });
  }
  resolveRefConstraints() {
    const { dragConstraints: e, onMeasureDragConstraints: n } = this.getProps();
    if (!e || !wt(e)) return !1;
    const s = e.current,
      { projection: o } = this.visualElement;
    if (!o || !o.layout) return !1;
    const i = vl(s, o.root, this.visualElement.getTransformPagePoint());
    let r = ll(o.layout.actual, i);
    if (n) {
      const a = n(hl(r));
      (this.hasMutatedConstraints = !!a), a && (r = Rr(a));
    }
    return r;
  }
  startAnimation(e) {
    const {
        drag: n,
        dragMomentum: s,
        dragElastic: o,
        dragTransition: i,
        dragSnapToOrigin: r,
        onDragTransitionEnd: a,
      } = this.getProps(),
      c = this.constraints || {},
      l = K((u) => {
        var f;
        if (!ne(u, n, this.currentDirection)) return;
        let d =
          (f = c == null ? void 0 : c[u]) !== null && f !== void 0 ? f : {};
        r && (d = { min: 0, max: 0 });
        const h = o ? 200 : 1e6,
          m = o ? 40 : 1e7,
          x = {
            type: "inertia",
            velocity: s ? e[u] : 0,
            bounceStiffness: h,
            bounceDamping: m,
            timeConstant: 750,
            restDelta: 1,
            restSpeed: 10,
            ...i,
            ...d,
          };
        return this.startAxisValueAnimation(u, x);
      });
    return Promise.all(l).then(a);
  }
  startAxisValueAnimation(e, n) {
    const s = this.getAxisMotionValue(e);
    return $n(e, s, 0, n);
  }
  stopAnimation() {
    K((e) => this.getAxisMotionValue(e).stop());
  }
  getAxisMotionValue(e) {
    var n, s;
    const o = "_drag" + e.toUpperCase(),
      i = this.visualElement.getProps()[o];
    return (
      i ||
      this.visualElement.getValue(
        e,
        (s =
          (n = this.visualElement.getProps().initial) === null || n === void 0
            ? void 0
            : n[e]) !== null && s !== void 0
          ? s
          : 0
      )
    );
  }
  snapToCursor(e) {
    K((n) => {
      const { drag: s } = this.getProps();
      if (!ne(n, s, this.currentDirection)) return;
      const { projection: o } = this.visualElement,
        i = this.getAxisMotionValue(n);
      if (o && o.layout) {
        const { min: r, max: a } = o.layout.actual[n];
        i.set(e[n] - L(r, a, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    var e;
    const { drag: n, dragConstraints: s } = this.getProps(),
      { projection: o } = this.visualElement;
    if (!wt(s) || !o || !this.constraints) return;
    this.stopAnimation();
    const i = { x: 0, y: 0 };
    K((a) => {
      const c = this.getAxisMotionValue(a);
      if (c) {
        const l = c.get();
        i[a] = ul({ min: l, max: l }, this.constraints[a]);
      }
    });
    const { transformTemplate: r } = this.visualElement.getProps();
    (this.visualElement.getInstance().style.transform = r ? r({}, "") : "none"),
      (e = o.root) === null || e === void 0 || e.updateScroll(),
      o.updateLayout(),
      this.resolveConstraints(),
      K((a) => {
        if (!ne(a, n, null)) return;
        const c = this.getAxisMotionValue(a),
          { min: l, max: u } = this.constraints[a];
        c.set(L(l, u, i[a]));
      });
  }
  addListeners() {
    var e;
    xl.set(this.visualElement, this);
    const n = this.visualElement.getInstance(),
      s = Pt(n, "pointerdown", (l) => {
        const { drag: u, dragListener: f = !0 } = this.getProps();
        u && f && this.start(l);
      }),
      o = () => {
        const { dragConstraints: l } = this.getProps();
        wt(l) && (this.constraints = this.resolveRefConstraints());
      },
      { projection: i } = this.visualElement,
      r = i.addEventListener("measure", o);
    i &&
      !i.layout &&
      ((e = i.root) === null || e === void 0 || e.updateScroll(),
      i.updateLayout()),
      o();
    const a = Ce(window, "resize", () => this.scalePositionWithinConstraints()),
      c = i.addEventListener(
        "didUpdate",
        ({ delta: l, hasLayoutChanged: u }) => {
          this.isDragging &&
            u &&
            (K((f) => {
              const d = this.getAxisMotionValue(f);
              !d ||
                ((this.originPoint[f] += l[f].translate),
                d.set(d.get() + l[f].translate));
            }),
            this.visualElement.syncRender());
        }
      );
    return () => {
      a(), s(), r(), c == null || c();
    };
  }
  getProps() {
    const e = this.visualElement.getProps(),
      {
        drag: n = !1,
        dragDirectionLock: s = !1,
        dragPropagation: o = !1,
        dragConstraints: i = !1,
        dragElastic: r = cn,
        dragMomentum: a = !0,
      } = e;
    return {
      ...e,
      drag: n,
      dragDirectionLock: s,
      dragPropagation: o,
      dragConstraints: i,
      dragElastic: r,
      dragMomentum: a,
    };
  }
}
function ne(t, e, n) {
  return (e === !0 || e === t) && (n === null || n === t);
}
function Sl(t, e = 10) {
  let n = null;
  return Math.abs(t.y) > e ? (n = "y") : Math.abs(t.x) > e && (n = "x"), n;
}
function Vl(t) {
  const { dragControls: e, visualElement: n } = t,
    s = _(() => new bl(n));
  p.exports.useEffect(() => e && e.subscribe(s), [s, e]),
    p.exports.useEffect(() => s.addListeners(), [s]);
}
function wl({
  onPan: t,
  onPanStart: e,
  onPanEnd: n,
  onPanSessionStart: s,
  visualElement: o,
}) {
  const i = t || e || n || s,
    r = p.exports.useRef(null),
    { transformPagePoint: a } = p.exports.useContext(tt),
    c = {
      onSessionStart: s,
      onStart: e,
      onMove: t,
      onEnd: (u, f) => {
        (r.current = null), n && n(u, f);
      },
    };
  p.exports.useEffect(() => {
    r.current !== null && r.current.updateHandlers(c);
  });
  function l(u) {
    r.current = new Cr(u, c, { transformPagePoint: a });
  }
  he(o, "pointerdown", i && l), Mn(() => r.current && r.current.end());
}
const Or = { pan: ct(wl), drag: ct(Vl) },
  Ve = { current: null },
  Yn = { current: !1 };
function Dr() {
  if (((Yn.current = !0), !!vt))
    if (window.matchMedia) {
      const t = window.matchMedia("(prefers-reduced-motion)"),
        e = () => (Ve.current = t.matches);
      t.addListener(e), e();
    } else Ve.current = !1;
}
const se = [
  "LayoutMeasure",
  "BeforeLayoutMeasure",
  "LayoutUpdate",
  "ViewportBoxUpdate",
  "Update",
  "Render",
  "AnimationComplete",
  "LayoutAnimationComplete",
  "AnimationStart",
  "LayoutAnimationStart",
  "SetAxisTarget",
  "Unmount",
];
function Tl() {
  const t = se.map(() => new kt()),
    e = {},
    n = {
      clearAllListeners: () => t.forEach((s) => s.clear()),
      updatePropListeners: (s) => {
        se.forEach((o) => {
          var i;
          const r = "on" + o,
            a = s[r];
          (i = e[o]) === null || i === void 0 || i.call(e),
            a && (e[o] = n[r](a));
        });
      },
    };
  return (
    t.forEach((s, o) => {
      (n["on" + se[o]] = (i) => s.add(i)),
        (n["notify" + se[o]] = (...i) => s.notify(...i));
    }),
    n
  );
}
function Pl(t, e, n) {
  const { willChange: s } = e;
  for (const o in e) {
    const i = e[o],
      r = n[o];
    if (U(i)) t.addValue(o, i), be(s) && s.add(o);
    else if (U(r)) t.addValue(o, G(i)), be(s) && s.remove(o);
    else if (r !== i)
      if (t.hasValue(o)) {
        const a = t.getValue(o);
        !a.hasAnimated && a.set(i);
      } else {
        const a = t.getStaticValue(o);
        t.addValue(o, G(a !== void 0 ? a : i));
      }
  }
  for (const o in n) e[o] === void 0 && t.removeValue(o);
  return e;
}
const Ir = Object.keys(zt),
  Cl = Ir.length,
  Kn =
    ({
      treeType: t = "",
      build: e,
      getBaseTarget: n,
      makeTargetAnimatable: s,
      measureViewportBox: o,
      render: i,
      readValueFromInstance: r,
      removeValueFromRenderState: a,
      sortNodePosition: c,
      scrapeMotionValuesFromProps: l,
    }) =>
    (
      {
        parent: u,
        props: f,
        presenceId: d,
        blockInitialAnimation: h,
        visualState: m,
        reducedMotionConfig: x,
      },
      S = {}
    ) => {
      let V = !1;
      const { latestValues: b, renderState: g } = m;
      let v;
      const w = Tl(),
        A = new Map(),
        E = new Map();
      let k = {};
      const I = { ...b },
        $ = f.initial ? { ...b } : {};
      let Z;
      function H() {
        !v || !V || (lt(), i(v, g, f.style, C.projection));
      }
      function lt() {
        e(C, g, b, S, f);
      }
      function nt() {
        w.notifyUpdate(b);
      }
      function J(y, P) {
        const R = P.onChange((z) => {
            (b[y] = z), f.onUpdate && j.update(nt, !1, !0);
          }),
          Y = P.onRenderRequest(C.scheduleRender);
        E.set(y, () => {
          R(), Y();
        });
      }
      const { willChange: O, ...st } = l(f);
      for (const y in st) {
        const P = st[y];
        b[y] !== void 0 && U(P) && (P.set(b[y], !1), be(O) && O.add(y));
      }
      if (f.values)
        for (const y in f.values) {
          const P = f.values[y];
          b[y] !== void 0 && U(P) && P.set(b[y]);
        }
      const bt = Pe(f),
        De = So(f),
        C = {
          treeType: t,
          current: null,
          depth: u ? u.depth + 1 : 0,
          parent: u,
          children: new Set(),
          presenceId: d,
          shouldReduceMotion: null,
          variantChildren: De ? new Set() : void 0,
          isVisible: void 0,
          manuallyAnimateOnMount: Boolean(u == null ? void 0 : u.isMounted()),
          blockInitialAnimation: h,
          isMounted: () => Boolean(v),
          mount(y) {
            (V = !0),
              (v = C.current = y),
              C.projection && C.projection.mount(y),
              De && u && !bt && (Z = u == null ? void 0 : u.addVariantChild(C)),
              A.forEach((P, R) => J(R, P)),
              Yn.current || Dr(),
              (C.shouldReduceMotion =
                x === "never" ? !1 : x === "always" ? !0 : Ve.current),
              u == null || u.children.add(C),
              C.setProps(f);
          },
          unmount() {
            var y;
            (y = C.projection) === null || y === void 0 || y.unmount(),
              q.update(nt),
              q.render(H),
              E.forEach((P) => P()),
              Z == null || Z(),
              u == null || u.children.delete(C),
              w.clearAllListeners(),
              (v = void 0),
              (V = !1);
          },
          loadFeatures(y, P, R, Y, z, ii) {
            const es = [];
            for (let Rt = 0; Rt < Cl; Rt++) {
              const St = Ir[Rt],
                { isEnabled: Ie, Component: Mt } = zt[St];
              Ie(y) &&
                Mt &&
                es.push(
                  p.exports.createElement(Mt, {
                    key: St,
                    ...y,
                    visualElement: C,
                  })
                );
            }
            if (!C.projection && z) {
              C.projection = new z(Y, C.getLatestValues(), u && u.projection);
              const {
                layoutId: Rt,
                layout: St,
                drag: Ie,
                dragConstraints: Mt,
                layoutScroll: ai,
              } = y;
              C.projection.setOptions({
                layoutId: Rt,
                layout: St,
                alwaysMeasureLayout: Boolean(Ie) || (Mt && wt(Mt)),
                visualElement: C,
                scheduleRender: () => C.scheduleRender(),
                animationType: typeof St == "string" ? St : "both",
                initialPromotionConfig: ii,
                layoutScroll: ai,
              });
            }
            return es;
          },
          addVariantChild(y) {
            var P;
            const R = C.getClosestVariantNode();
            if (R)
              return (
                (P = R.variantChildren) === null || P === void 0 || P.add(y),
                () => R.variantChildren.delete(y)
              );
          },
          sortNodePosition(y) {
            return !c || t !== y.treeType
              ? 0
              : c(C.getInstance(), y.getInstance());
          },
          getClosestVariantNode: () =>
            De ? C : u == null ? void 0 : u.getClosestVariantNode(),
          getLayoutId: () => f.layoutId,
          getInstance: () => v,
          getStaticValue: (y) => b[y],
          setStaticValue: (y, P) => (b[y] = P),
          getLatestValues: () => b,
          setVisibility(y) {
            C.isVisible !== y && ((C.isVisible = y), C.scheduleRender());
          },
          makeTargetAnimatable(y, P = !0) {
            return s(C, y, f, P);
          },
          measureViewportBox() {
            return o(v, f);
          },
          addValue(y, P) {
            C.hasValue(y) && C.removeValue(y),
              A.set(y, P),
              (b[y] = P.get()),
              J(y, P);
          },
          removeValue(y) {
            var P;
            A.delete(y),
              (P = E.get(y)) === null || P === void 0 || P(),
              E.delete(y),
              delete b[y],
              a(y, g);
          },
          hasValue: (y) => A.has(y),
          getValue(y, P) {
            if (f.values && f.values[y]) return f.values[y];
            let R = A.get(y);
            return (
              R === void 0 && P !== void 0 && ((R = G(P)), C.addValue(y, R)), R
            );
          },
          forEachValue: (y) => A.forEach(y),
          readValue: (y) => (b[y] !== void 0 ? b[y] : r(v, y, S)),
          setBaseTarget(y, P) {
            I[y] = P;
          },
          getBaseTarget(y) {
            var P;
            const { initial: R } = f,
              Y =
                typeof R == "string" || typeof R == "object"
                  ? (P = Pn(f, R)) === null || P === void 0
                    ? void 0
                    : P[y]
                  : void 0;
            if (R && Y !== void 0) return Y;
            if (n) {
              const z = n(f, y);
              if (z !== void 0 && !U(z)) return z;
            }
            return $[y] !== void 0 && Y === void 0 ? void 0 : I[y];
          },
          ...w,
          build() {
            return lt(), g;
          },
          scheduleRender() {
            j.render(H, !1, !0);
          },
          syncRender: H,
          setProps(y) {
            (y.transformTemplate || f.transformTemplate) && C.scheduleRender(),
              (f = y),
              w.updatePropListeners(y),
              (k = Pl(C, l(f), k));
          },
          getProps: () => f,
          getVariant: (y) => {
            var P;
            return (P = f.variants) === null || P === void 0 ? void 0 : P[y];
          },
          getDefaultTransition: () => f.transition,
          getTransformPagePoint: () => f.transformPagePoint,
          getVariantContext(y = !1) {
            if (y) return u == null ? void 0 : u.getVariantContext();
            if (!bt) {
              const R = (u == null ? void 0 : u.getVariantContext()) || {};
              return f.initial !== void 0 && (R.initial = f.initial), R;
            }
            const P = {};
            for (let R = 0; R < Al; R++) {
              const Y = Fr[R],
                z = f[Y];
              (Nt(z) || z === !1) && (P[Y] = z);
            }
            return P;
          },
        };
      return C;
    },
  Fr = ["initial", ...Gn],
  Al = Fr.length;
function fn(t) {
  return typeof t == "string" && t.startsWith("var(--");
}
const kr = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function Rl(t) {
  const e = kr.exec(t);
  if (!e) return [,];
  const [, n, s] = e;
  return [n, s];
}
function dn(t, e, n = 1) {
  const [s, o] = Rl(t);
  if (!s) return;
  const i = window.getComputedStyle(e).getPropertyValue(s);
  return i ? i.trim() : fn(o) ? dn(o, e, n + 1) : o;
}
function Ml(t, { ...e }, n) {
  const s = t.getInstance();
  if (!(s instanceof Element)) return { target: e, transitionEnd: n };
  n && (n = { ...n }),
    t.forEachValue((o) => {
      const i = o.get();
      if (!fn(i)) return;
      const r = dn(i, s);
      r && o.set(r);
    });
  for (const o in e) {
    const i = e[o];
    if (!fn(i)) continue;
    const r = dn(i, s);
    !r || ((e[o] = r), n && n[o] === void 0 && (n[o] = i));
  }
  return { target: e, transitionEnd: n };
}
const Ll = new Set([
    "width",
    "height",
    "top",
    "left",
    "right",
    "bottom",
    "x",
    "y",
  ]),
  jr = (t) => Ll.has(t),
  El = (t) => Object.keys(t).some(jr),
  _r = (t, e) => {
    t.set(e, !1), t.set(e);
  },
  _s = (t) => t === xt || t === T;
var Bs;
(function (t) {
  (t.width = "width"),
    (t.height = "height"),
    (t.left = "left"),
    (t.right = "right"),
    (t.top = "top"),
    (t.bottom = "bottom");
})(Bs || (Bs = {}));
const Us = (t, e) => parseFloat(t.split(", ")[e]),
  Ns =
    (t, e) =>
    (n, { transform: s }) => {
      if (s === "none" || !s) return 0;
      const o = s.match(/^matrix3d\((.+)\)$/);
      if (o) return Us(o[1], e);
      {
        const i = s.match(/^matrix\((.+)\)$/);
        return i ? Us(i[1], t) : 0;
      }
    },
  Ol = new Set(["x", "y", "z"]),
  Dl = ue.filter((t) => !Ol.has(t));
function Il(t) {
  const e = [];
  return (
    Dl.forEach((n) => {
      const s = t.getValue(n);
      s !== void 0 &&
        (e.push([n, s.get()]), s.set(n.startsWith("scale") ? 1 : 0));
    }),
    e.length && t.syncRender(),
    e
  );
}
const zs = {
    width: ({ x: t }, { paddingLeft: e = "0", paddingRight: n = "0" }) =>
      t.max - t.min - parseFloat(e) - parseFloat(n),
    height: ({ y: t }, { paddingTop: e = "0", paddingBottom: n = "0" }) =>
      t.max - t.min - parseFloat(e) - parseFloat(n),
    top: (t, { top: e }) => parseFloat(e),
    left: (t, { left: e }) => parseFloat(e),
    bottom: ({ y: t }, { top: e }) => parseFloat(e) + (t.max - t.min),
    right: ({ x: t }, { left: e }) => parseFloat(e) + (t.max - t.min),
    x: Ns(4, 13),
    y: Ns(5, 14),
  },
  Fl = (t, e, n) => {
    const s = e.measureViewportBox(),
      o = e.getInstance(),
      i = getComputedStyle(o),
      { display: r } = i,
      a = {};
    r === "none" && e.setStaticValue("display", t.display || "block"),
      n.forEach((l) => {
        a[l] = zs[l](s, i);
      }),
      e.syncRender();
    const c = e.measureViewportBox();
    return (
      n.forEach((l) => {
        const u = e.getValue(l);
        _r(u, a[l]), (t[l] = zs[l](c, i));
      }),
      t
    );
  },
  kl = (t, e, n = {}, s = {}) => {
    (e = { ...e }), (s = { ...s });
    const o = Object.keys(e).filter(jr);
    let i = [],
      r = !1;
    const a = [];
    if (
      (o.forEach((c) => {
        const l = t.getValue(c);
        if (!t.hasValue(c)) return;
        let u = n[c],
          f = Lt(u);
        const d = e[c];
        let h;
        if (Wt(d)) {
          const m = d.length,
            x = d[0] === null ? 1 : 0;
          (u = d[x]), (f = Lt(u));
          for (let S = x; S < m; S++) h ? pe(Lt(d[S]) === h) : (h = Lt(d[S]));
        } else h = Lt(d);
        if (f !== h)
          if (_s(f) && _s(h)) {
            const m = l.get();
            typeof m == "string" && l.set(parseFloat(m)),
              typeof d == "string"
                ? (e[c] = parseFloat(d))
                : Array.isArray(d) && h === T && (e[c] = d.map(parseFloat));
          } else
            (f == null ? void 0 : f.transform) &&
            (h == null ? void 0 : h.transform) &&
            (u === 0 || d === 0)
              ? u === 0
                ? l.set(h.transform(u))
                : (e[c] = f.transform(d))
              : (r || ((i = Il(t)), (r = !0)),
                a.push(c),
                (s[c] = s[c] !== void 0 ? s[c] : e[c]),
                _r(l, d));
      }),
      a.length)
    ) {
      const c = a.indexOf("height") >= 0 ? window.pageYOffset : null,
        l = Fl(e, t, a);
      return (
        i.length &&
          i.forEach(([u, f]) => {
            t.getValue(u).set(f);
          }),
        t.syncRender(),
        vt && c !== null && window.scrollTo({ top: c }),
        { target: l, transitionEnd: s }
      );
    } else return { target: e, transitionEnd: s };
  };
function jl(t, e, n, s) {
  return El(e) ? kl(t, e, n, s) : { target: e, transitionEnd: s };
}
const _l = (t, e, n, s) => {
  const o = Ml(t, e, s);
  return (e = o.target), (s = o.transitionEnd), jl(t, e, n, s);
};
function Bl(t) {
  return window.getComputedStyle(t);
}
const Br = {
    treeType: "dom",
    readValueFromInstance(t, e) {
      if (gt.has(e)) {
        const n = Un(e);
        return (n && n.default) || 0;
      } else {
        const n = Bl(t),
          s = (xn(e) ? n.getPropertyValue(e) : n[e]) || 0;
        return typeof s == "string" ? s.trim() : s;
      }
    },
    sortNodePosition(t, e) {
      return t.compareDocumentPosition(e) & 2 ? 1 : -1;
    },
    getBaseTarget(t, e) {
      var n;
      return (n = t.style) === null || n === void 0 ? void 0 : n[e];
    },
    measureViewportBox(t, { transformPagePoint: e }) {
      return Er(t, e);
    },
    resetTransform(t, e, n) {
      const { transformTemplate: s } = n;
      (e.style.transform = s ? s({}, "") : "none"), t.scheduleRender();
    },
    restoreTransform(t, e) {
      t.style.transform = e.style.transform;
    },
    removeValueFromRenderState(t, { vars: e, style: n }) {
      delete e[t], delete n[t];
    },
    makeTargetAnimatable(
      t,
      { transition: e, transitionEnd: n, ...s },
      { transformValues: o },
      i = !0
    ) {
      let r = wr(s, e || {}, t);
      if ((o && (n && (n = o(n)), s && (s = o(s)), r && (r = o(r))), i)) {
        Vr(t, s, r);
        const a = _l(t, s, r, n);
        (n = a.transitionEnd), (s = a.target);
      }
      return { transition: e, transitionEnd: n, ...s };
    },
    scrapeMotionValuesFromProps: Tn,
    build(t, e, n, s, o) {
      t.isVisible !== void 0 &&
        (e.style.visibility = t.isVisible ? "visible" : "hidden"),
        Sn(e, n, s, o.transformTemplate);
    },
    render: _o,
  },
  Ul = Kn(Br),
  Nl = Kn({
    ...Br,
    getBaseTarget(t, e) {
      return t[e];
    },
    readValueFromInstance(t, e) {
      var n;
      return gt.has(e)
        ? ((n = Un(e)) === null || n === void 0 ? void 0 : n.default) || 0
        : ((e = Bo.has(e) ? e : de(e)), t.getAttribute(e));
    },
    scrapeMotionValuesFromProps: No,
    build(t, e, n, s, o) {
      wn(e, n, s, o.transformTemplate);
    },
    render: Uo,
  }),
  Xn = (t, e) =>
    vn(t)
      ? Nl(e, { enableHardwareAcceleration: !1 })
      : Ul(e, { enableHardwareAcceleration: !0 });
function $s(t, e) {
  return e.max === e.min ? 0 : (t / (e.max - e.min)) * 100;
}
const Et = {
    correct: (t, e) => {
      if (!e.target) return t;
      if (typeof t == "string")
        if (T.test(t)) t = parseFloat(t);
        else return t;
      const n = $s(t, e.target.x),
        s = $s(t, e.target.y);
      return `${n}% ${s}%`;
    },
  },
  Hs = "_$css",
  zl = {
    correct: (t, { treeScale: e, projectionDelta: n }) => {
      const s = t,
        o = t.includes("var("),
        i = [];
      o && (t = t.replace(kr, (h) => (i.push(h), Hs)));
      const r = et.parse(t);
      if (r.length > 5) return s;
      const a = et.createTransformer(t),
        c = typeof r[0] != "number" ? 1 : 0,
        l = n.x.scale * e.x,
        u = n.y.scale * e.y;
      (r[0 + c] /= l), (r[1 + c] /= u);
      const f = L(l, u, 0.5);
      typeof r[2 + c] == "number" && (r[2 + c] /= f),
        typeof r[3 + c] == "number" && (r[3 + c] /= f);
      let d = a(r);
      if (o) {
        let h = 0;
        d = d.replace(Hs, () => {
          const m = i[h];
          return h++, m;
        });
      }
      return d;
    },
  };
class $l extends xo.Component {
  componentDidMount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
        layoutId: o,
      } = this.props,
      { projection: i } = e;
    xi(Wl),
      i &&
        (n.group && n.group.add(i),
        s && s.register && o && s.register(i),
        i.root.didUpdate(),
        i.addEventListener("animationComplete", () => {
          this.safeToRemove();
        }),
        i.setOptions({
          ...i.options,
          onExitComplete: () => this.safeToRemove(),
        })),
      (Dt.hasEverUpdated = !0);
  }
  getSnapshotBeforeUpdate(e) {
    const {
        layoutDependency: n,
        visualElement: s,
        drag: o,
        isPresent: i,
      } = this.props,
      r = s.projection;
    return (
      r &&
        ((r.isPresent = i),
        o || e.layoutDependency !== n || n === void 0
          ? r.willUpdate()
          : this.safeToRemove(),
        e.isPresent !== i &&
          (i
            ? r.promote()
            : r.relegate() ||
              j.postRender(() => {
                var a;
                (!((a = r.getStack()) === null || a === void 0) &&
                  a.members.length) ||
                  this.safeToRemove();
              }))),
      null
    );
  }
  componentDidUpdate() {
    const { projection: e } = this.props.visualElement;
    e &&
      (e.root.didUpdate(),
      !e.currentAnimation && e.isLead() && this.safeToRemove());
  }
  componentWillUnmount() {
    const {
        visualElement: e,
        layoutGroup: n,
        switchLayoutGroup: s,
      } = this.props,
      { projection: o } = e;
    o &&
      (o.scheduleCheckAfterUnmount(),
      n != null && n.group && n.group.remove(o),
      s != null && s.deregister && s.deregister(o));
  }
  safeToRemove() {
    const { safeToRemove: e } = this.props;
    e == null || e();
  }
  render() {
    return null;
  }
}
function Hl(t) {
  const [e, n] = gr(),
    s = p.exports.useContext($t);
  return F($l, {
    ...t,
    layoutGroup: s,
    switchLayoutGroup: p.exports.useContext(Vo),
    isPresent: e,
    safeToRemove: n,
  });
}
const Wl = {
    borderRadius: {
      ...Et,
      applyTo: [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ],
    },
    borderTopLeftRadius: Et,
    borderTopRightRadius: Et,
    borderBottomLeftRadius: Et,
    borderBottomRightRadius: Et,
    boxShadow: zl,
  },
  Ur = { measureLayout: Hl };
function Gl(t, e, n = {}) {
  const s = U(t) ? t : G(t);
  return (
    $n("", s, e, n),
    { stop: () => s.stop(), isAnimating: () => s.isAnimating() }
  );
}
const Nr = ["TopLeft", "TopRight", "BottomLeft", "BottomRight"],
  Yl = Nr.length,
  Ws = (t) => (typeof t == "string" ? parseFloat(t) : t),
  Gs = (t) => typeof t == "number" || T.test(t);
function Kl(t, e, n, s, o, i) {
  var r, a, c, l;
  o
    ? ((t.opacity = L(
        0,
        (r = n.opacity) !== null && r !== void 0 ? r : 1,
        Xl(s)
      )),
      (t.opacityExit = L(
        (a = e.opacity) !== null && a !== void 0 ? a : 1,
        0,
        ql(s)
      )))
    : i &&
      (t.opacity = L(
        (c = e.opacity) !== null && c !== void 0 ? c : 1,
        (l = n.opacity) !== null && l !== void 0 ? l : 1,
        s
      ));
  for (let u = 0; u < Yl; u++) {
    const f = `border${Nr[u]}Radius`;
    let d = Ys(e, f),
      h = Ys(n, f);
    if (d === void 0 && h === void 0) continue;
    d || (d = 0),
      h || (h = 0),
      d === 0 || h === 0 || Gs(d) === Gs(h)
        ? ((t[f] = Math.max(L(Ws(d), Ws(h), s), 0)),
          (X.test(h) || X.test(d)) && (t[f] += "%"))
        : (t[f] = h);
  }
  (e.rotate || n.rotate) && (t.rotate = L(e.rotate || 0, n.rotate || 0, s));
}
function Ys(t, e) {
  var n;
  return (n = t[e]) !== null && n !== void 0 ? n : t.borderRadius;
}
const Xl = zr(0, 0.5, Fn),
  ql = zr(0.5, 0.95, Dn);
function zr(t, e, n) {
  return (s) => (s < t ? 0 : s > e ? 1 : n(Gt(t, e, s)));
}
function Ks(t, e) {
  (t.min = e.min), (t.max = e.max);
}
function W(t, e) {
  Ks(t.x, e.x), Ks(t.y, e.y);
}
function Xs(t, e, n, s, o) {
  return (
    (t -= e), (t = Se(t, 1 / n, s)), o !== void 0 && (t = Se(t, 1 / o, s)), t
  );
}
function Zl(t, e = 0, n = 1, s = 0.5, o, i = t, r = t) {
  if (
    (X.test(e) && ((e = parseFloat(e)), (e = L(r.min, r.max, e / 100) - r.min)),
    typeof e != "number")
  )
    return;
  let a = L(i.min, i.max, s);
  t === i && (a -= e),
    (t.min = Xs(t.min, e, n, a, o)),
    (t.max = Xs(t.max, e, n, a, o));
}
function qs(t, e, [n, s, o], i, r) {
  Zl(t, e[n], e[s], e[o], e.scale, i, r);
}
const Jl = ["x", "scaleX", "originX"],
  Ql = ["y", "scaleY", "originY"];
function Zs(t, e, n, s) {
  qs(t.x, e, Jl, n == null ? void 0 : n.x, s == null ? void 0 : s.x),
    qs(t.y, e, Ql, n == null ? void 0 : n.y, s == null ? void 0 : s.y);
}
function Js(t) {
  return t.translate === 0 && t.scale === 1;
}
function $r(t) {
  return Js(t.x) && Js(t.y);
}
function Hr(t, e) {
  return (
    t.x.min === e.x.min &&
    t.x.max === e.x.max &&
    t.y.min === e.y.min &&
    t.y.max === e.y.max
  );
}
function Qs(t) {
  return N(t.x) / N(t.y);
}
function tu(t, e, n = 0.1) {
  return _n(t, e) <= n;
}
class eu {
  constructor() {
    this.members = [];
  }
  add(e) {
    Ee(this.members, e), e.scheduleRender();
  }
  remove(e) {
    if (
      (Kt(this.members, e),
      e === this.prevLead && (this.prevLead = void 0),
      e === this.lead)
    ) {
      const n = this.members[this.members.length - 1];
      n && this.promote(n);
    }
  }
  relegate(e) {
    const n = this.members.findIndex((o) => e === o);
    if (n === 0) return !1;
    let s;
    for (let o = n; o >= 0; o--) {
      const i = this.members[o];
      if (i.isPresent !== !1) {
        s = i;
        break;
      }
    }
    return s ? (this.promote(s), !0) : !1;
  }
  promote(e, n) {
    var s;
    const o = this.lead;
    if (e !== o && ((this.prevLead = o), (this.lead = e), e.show(), o)) {
      o.instance && o.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = o),
        n && (e.resumeFrom.preserveOpacity = !0),
        o.snapshot &&
          ((e.snapshot = o.snapshot),
          (e.snapshot.latestValues = o.animationValues || o.latestValues),
          (e.snapshot.isShared = !0)),
        !((s = e.root) === null || s === void 0) &&
          s.isUpdating &&
          (e.isLayoutDirty = !0);
      const { crossfade: i } = e.options;
      i === !1 && o.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      var n, s, o, i, r;
      (s = (n = e.options).onExitComplete) === null ||
        s === void 0 ||
        s.call(n),
        (r =
          (o = e.resumingFrom) === null || o === void 0
            ? void 0
            : (i = o.options).onExitComplete) === null ||
          r === void 0 ||
          r.call(i);
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
}
const nu = "translate3d(0px, 0px, 0) scale(1, 1) scale(1, 1)";
function to(t, e, n) {
  const s = t.x.translate / e.x,
    o = t.y.translate / e.y;
  let i = `translate3d(${s}px, ${o}px, 0) `;
  if (((i += `scale(${1 / e.x}, ${1 / e.y}) `), n)) {
    const { rotate: c, rotateX: l, rotateY: u } = n;
    c && (i += `rotate(${c}deg) `),
      l && (i += `rotateX(${l}deg) `),
      u && (i += `rotateY(${u}deg) `);
  }
  const r = t.x.scale * e.x,
    a = t.y.scale * e.y;
  return (i += `scale(${r}, ${a})`), i === nu ? "none" : i;
}
const su = (t, e) => t.depth - e.depth;
class ou {
  constructor() {
    (this.children = []), (this.isDirty = !1);
  }
  add(e) {
    Ee(this.children, e), (this.isDirty = !0);
  }
  remove(e) {
    Kt(this.children, e), (this.isDirty = !0);
  }
  forEach(e) {
    this.isDirty && this.children.sort(su),
      (this.isDirty = !1),
      this.children.forEach(e);
  }
}
const eo = ["", "X", "Y", "Z"],
  no = 1e3;
function Wr({
  attachResizeListener: t,
  defaultParent: e,
  measureScroll: n,
  checkIsScrollRoot: s,
  resetTransform: o,
}) {
  return class {
    constructor(r, a = {}, c = e == null ? void 0 : e()) {
      (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = { x: 1, y: 1 }),
        (this.eventHandlers = new Map()),
        (this.potentialNodes = new Map()),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          this.nodes.forEach(lu), this.nodes.forEach(uu);
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.id = r),
        (this.latestValues = a),
        (this.root = c ? c.root || c : this),
        (this.path = c ? [...c.path, c] : []),
        (this.parent = c),
        (this.depth = c ? c.depth + 1 : 0),
        r && this.root.registerPotentialNode(r, this);
      for (let l = 0; l < this.path.length; l++)
        this.path[l].shouldResetTransform = !0;
      this.root === this && (this.nodes = new ou());
    }
    addEventListener(r, a) {
      return (
        this.eventHandlers.has(r) || this.eventHandlers.set(r, new kt()),
        this.eventHandlers.get(r).add(a)
      );
    }
    notifyListeners(r, ...a) {
      const c = this.eventHandlers.get(r);
      c == null || c.notify(...a);
    }
    hasListeners(r) {
      return this.eventHandlers.has(r);
    }
    registerPotentialNode(r, a) {
      this.potentialNodes.set(r, a);
    }
    mount(r, a = !1) {
      var c;
      if (this.instance) return;
      (this.isSVG = r instanceof SVGElement && r.tagName !== "svg"),
        (this.instance = r);
      const { layoutId: l, layout: u, visualElement: f } = this.options;
      if (
        (f && !f.getInstance() && f.mount(r),
        this.root.nodes.add(this),
        (c = this.parent) === null || c === void 0 || c.children.add(this),
        this.id && this.root.potentialNodes.delete(this.id),
        a && (u || l) && (this.isLayoutDirty = !0),
        t)
      ) {
        let d;
        const h = () => (this.root.updateBlockedByResize = !1);
        t(r, () => {
          (this.root.updateBlockedByResize = !0),
            d && d(),
            (d = vr(h, 250)),
            Dt.hasAnimatedSinceResize &&
              ((Dt.hasAnimatedSinceResize = !1), this.nodes.forEach(oo));
        });
      }
      l && this.root.registerSharedNode(l, this),
        this.options.animate !== !1 &&
          f &&
          (l || u) &&
          this.addEventListener(
            "didUpdate",
            ({
              delta: d,
              hasLayoutChanged: h,
              hasRelativeTargetChanged: m,
              layout: x,
            }) => {
              var S, V, b, g, v;
              if (this.isTreeAnimationBlocked()) {
                (this.target = void 0), (this.relativeTarget = void 0);
                return;
              }
              const w =
                  (V =
                    (S = this.options.transition) !== null && S !== void 0
                      ? S
                      : f.getDefaultTransition()) !== null && V !== void 0
                    ? V
                    : mu,
                { onLayoutAnimationStart: A, onLayoutAnimationComplete: E } =
                  f.getProps(),
                k = !this.targetLayout || !Hr(this.targetLayout, x) || m,
                I = !h && m;
              if (
                ((b = this.resumeFrom) === null || b === void 0
                  ? void 0
                  : b.instance) ||
                I ||
                (h && (k || !this.currentAnimation))
              ) {
                this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(d, I);
                const $ = { ...zn(w, "layout"), onPlay: A, onComplete: E };
                f.shouldReduceMotion && (($.delay = 0), ($.type = !1)),
                  this.startAnimation($);
              } else
                !h && this.animationProgress === 0 && oo(this),
                  this.isLead() &&
                    ((v = (g = this.options).onExitComplete) === null ||
                      v === void 0 ||
                      v.call(g));
              this.targetLayout = x;
            }
          );
    }
    unmount() {
      var r, a;
      this.options.layoutId && this.willUpdate(),
        this.root.nodes.remove(this),
        (r = this.getStack()) === null || r === void 0 || r.remove(this),
        (a = this.parent) === null || a === void 0 || a.children.delete(this),
        (this.instance = void 0),
        q.preRender(this.updateProjection);
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
      var r;
      return (
        this.isAnimationBlocked ||
        ((r = this.parent) === null || r === void 0
          ? void 0
          : r.isTreeAnimationBlocked()) ||
        !1
      );
    }
    startUpdate() {
      var r;
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0),
        (r = this.nodes) === null || r === void 0 || r.forEach(fu));
    }
    willUpdate(r = !0) {
      var a, c, l;
      if (this.root.isUpdateBlocked()) {
        (c = (a = this.options).onExitComplete) === null ||
          c === void 0 ||
          c.call(a);
        return;
      }
      if (
        (!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)
      )
        return;
      this.isLayoutDirty = !0;
      for (let h = 0; h < this.path.length; h++) {
        const m = this.path[h];
        (m.shouldResetTransform = !0), m.updateScroll();
      }
      const { layoutId: u, layout: f } = this.options;
      if (u === void 0 && !f) return;
      const d =
        (l = this.options.visualElement) === null || l === void 0
          ? void 0
          : l.getProps().transformTemplate;
      (this.prevTransformTemplateValue =
        d == null ? void 0 : d(this.latestValues, "")),
        this.updateSnapshot(),
        r && this.notifyListeners("willUpdate");
    }
    didUpdate() {
      if (this.isUpdateBlocked()) {
        this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(so);
        return;
      }
      !this.isUpdating ||
        ((this.isUpdating = !1),
        this.potentialNodes.size &&
          (this.potentialNodes.forEach(gu), this.potentialNodes.clear()),
        this.nodes.forEach(cu),
        this.nodes.forEach(ru),
        this.nodes.forEach(iu),
        this.clearAllSnapshots(),
        _e.update(),
        _e.preRender(),
        _e.render());
    }
    clearAllSnapshots() {
      this.nodes.forEach(au), this.sharedNodes.forEach(du);
    }
    scheduleUpdateProjection() {
      j.preRender(this.updateProjection, !1, !0);
    }
    scheduleCheckAfterUnmount() {
      j.postRender(() => {
        this.isLayoutDirty
          ? this.root.didUpdate()
          : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      if (this.snapshot || !this.instance) return;
      const r = this.measure(),
        a = this.removeTransform(this.removeElementScroll(r));
      co(a), (this.snapshot = { measured: r, layout: a, latestValues: {} });
    }
    updateLayout() {
      var r;
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) &&
          !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let l = 0; l < this.path.length; l++) this.path[l].updateScroll();
      const a = this.measure();
      co(a);
      const c = this.layout;
      (this.layout = { measured: a, actual: this.removeElementScroll(a) }),
        (this.layoutCorrected = D()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners("measure", this.layout.actual),
        (r = this.options.visualElement) === null ||
          r === void 0 ||
          r.notifyLayoutMeasure(
            this.layout.actual,
            c == null ? void 0 : c.actual
          );
    }
    updateScroll() {
      this.options.layoutScroll &&
        this.instance &&
        ((this.isScrollRoot = s(this.instance)),
        (this.scroll = n(this.instance)));
    }
    resetTransform() {
      var r;
      if (!o) return;
      const a = this.isLayoutDirty || this.shouldResetTransform,
        c = this.projectionDelta && !$r(this.projectionDelta),
        l =
          (r = this.options.visualElement) === null || r === void 0
            ? void 0
            : r.getProps().transformTemplate,
        u = l == null ? void 0 : l(this.latestValues, ""),
        f = u !== this.prevTransformTemplateValue;
      a &&
        (c || dt(this.latestValues) || f) &&
        (o(this.instance, u),
        (this.shouldResetTransform = !1),
        this.scheduleRender());
    }
    measure() {
      const { visualElement: r } = this.options;
      if (!r) return D();
      const a = r.measureViewportBox(),
        { scroll: c } = this.root;
      return c && (it(a.x, c.x), it(a.y, c.y)), a;
    }
    removeElementScroll(r) {
      const a = D();
      W(a, r);
      for (let c = 0; c < this.path.length; c++) {
        const l = this.path[c],
          { scroll: u, options: f, isScrollRoot: d } = l;
        if (l !== this.root && u && f.layoutScroll) {
          if (d) {
            W(a, r);
            const { scroll: h } = this.root;
            h && (it(a.x, -h.x), it(a.y, -h.y));
          }
          it(a.x, u.x), it(a.y, u.y);
        }
      }
      return a;
    }
    applyTransform(r, a = !1) {
      const c = D();
      W(c, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        !a &&
          u.options.layoutScroll &&
          u.scroll &&
          u !== u.root &&
          Tt(c, { x: -u.scroll.x, y: -u.scroll.y }),
          dt(u.latestValues) && Tt(c, u.latestValues);
      }
      return dt(this.latestValues) && Tt(c, this.latestValues), c;
    }
    removeTransform(r) {
      var a;
      const c = D();
      W(c, r);
      for (let l = 0; l < this.path.length; l++) {
        const u = this.path[l];
        if (!u.instance || !dt(u.latestValues)) continue;
        ln(u.latestValues) && u.updateSnapshot();
        const f = D(),
          d = u.measure();
        W(f, d),
          Zs(
            c,
            u.latestValues,
            (a = u.snapshot) === null || a === void 0 ? void 0 : a.layout,
            f
          );
      }
      return dt(this.latestValues) && Zs(c, this.latestValues), c;
    }
    setTargetDelta(r) {
      (this.targetDelta = r), this.root.scheduleUpdateProjection();
    }
    setOptions(r) {
      this.options = {
        ...this.options,
        ...r,
        crossfade: r.crossfade !== void 0 ? r.crossfade : !0,
      };
    }
    clearMeasurements() {
      (this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1);
    }
    resolveTargetDelta() {
      var r;
      const { layout: a, layoutId: c } = this.options;
      !this.layout ||
        !(a || c) ||
        (!this.targetDelta &&
          !this.relativeTarget &&
          ((this.relativeParent = this.getClosestProjectingParent()),
          this.relativeParent &&
            this.relativeParent.layout &&
            ((this.relativeTarget = D()),
            (this.relativeTargetOrigin = D()),
            _t(
              this.relativeTargetOrigin,
              this.layout.actual,
              this.relativeParent.layout.actual
            ),
            W(this.relativeTarget, this.relativeTargetOrigin))),
        !(!this.relativeTarget && !this.targetDelta) &&
          (this.target ||
            ((this.target = D()), (this.targetWithTransforms = D())),
          this.relativeTarget &&
          this.relativeTargetOrigin &&
          ((r = this.relativeParent) === null || r === void 0
            ? void 0
            : r.target)
            ? il(this.target, this.relativeTarget, this.relativeParent.target)
            : this.targetDelta
            ? (Boolean(this.resumingFrom)
                ? (this.target = this.applyTransform(this.layout.actual))
                : W(this.target, this.layout.actual),
              Lr(this.target, this.targetDelta))
            : W(this.target, this.layout.actual),
          this.attemptToResolveRelativeTarget &&
            ((this.attemptToResolveRelativeTarget = !1),
            (this.relativeParent = this.getClosestProjectingParent()),
            this.relativeParent &&
              Boolean(this.relativeParent.resumingFrom) ===
                Boolean(this.resumingFrom) &&
              !this.relativeParent.options.layoutScroll &&
              this.relativeParent.target &&
              ((this.relativeTarget = D()),
              (this.relativeTargetOrigin = D()),
              _t(
                this.relativeTargetOrigin,
                this.target,
                this.relativeParent.target
              ),
              W(this.relativeTarget, this.relativeTargetOrigin)))));
    }
    getClosestProjectingParent() {
      if (
        !(
          !this.parent ||
          ln(this.parent.latestValues) ||
          Mr(this.parent.latestValues)
        )
      )
        return (this.parent.relativeTarget || this.parent.targetDelta) &&
          this.parent.layout
          ? this.parent
          : this.parent.getClosestProjectingParent();
    }
    calcProjection() {
      var r;
      const { layout: a, layoutId: c } = this.options;
      if (
        ((this.isTreeAnimating = Boolean(
          ((r = this.parent) === null || r === void 0
            ? void 0
            : r.isTreeAnimating) ||
            this.currentAnimation ||
            this.pendingAnimation
        )),
        this.isTreeAnimating ||
          (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(a || c))
      )
        return;
      const l = this.getLead();
      W(this.layoutCorrected, this.layout.actual),
        ml(
          this.layoutCorrected,
          this.treeScale,
          this.path,
          Boolean(this.resumingFrom) || this !== l
        );
      const { target: u } = l;
      if (!u) return;
      this.projectionDelta ||
        ((this.projectionDelta = Bt()),
        (this.projectionDeltaWithTransform = Bt()));
      const f = this.treeScale.x,
        d = this.treeScale.y,
        h = this.projectionTransform;
      jt(this.projectionDelta, this.layoutCorrected, u, this.latestValues),
        (this.projectionTransform = to(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== h ||
          this.treeScale.x !== f ||
          this.treeScale.y !== d) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners("projectionUpdate", u));
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(r = !0) {
      var a, c, l;
      (c = (a = this.options).scheduleRender) === null ||
        c === void 0 ||
        c.call(a),
        r &&
          ((l = this.getStack()) === null ||
            l === void 0 ||
            l.scheduleRender()),
        this.resumingFrom &&
          !this.resumingFrom.instance &&
          (this.resumingFrom = void 0);
    }
    setAnimationOrigin(r, a = !1) {
      var c;
      const l = this.snapshot,
        u = (l == null ? void 0 : l.latestValues) || {},
        f = { ...this.latestValues },
        d = Bt();
      (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !a);
      const h = D(),
        m = l == null ? void 0 : l.isShared,
        x =
          (((c = this.getStack()) === null || c === void 0
            ? void 0
            : c.members.length) || 0) <= 1,
        S = Boolean(
          m && !x && this.options.crossfade === !0 && !this.path.some(pu)
        );
      (this.animationProgress = 0),
        (this.mixTargetDelta = (V) => {
          var b;
          const g = V / 1e3;
          ro(d.x, r.x, g),
            ro(d.y, r.y, g),
            this.setTargetDelta(d),
            this.relativeTarget &&
              this.relativeTargetOrigin &&
              this.layout &&
              ((b = this.relativeParent) === null || b === void 0
                ? void 0
                : b.layout) &&
              (_t(h, this.layout.actual, this.relativeParent.layout.actual),
              hu(this.relativeTarget, this.relativeTargetOrigin, h, g)),
            m &&
              ((this.animationValues = f),
              Kl(f, u, this.latestValues, g, S, x)),
            this.root.scheduleUpdateProjection(),
            this.scheduleRender(),
            (this.animationProgress = g);
        }),
        this.mixTargetDelta(0);
    }
    startAnimation(r) {
      var a, c;
      this.notifyListeners("animationStart"),
        (a = this.currentAnimation) === null || a === void 0 || a.stop(),
        this.resumingFrom &&
          ((c = this.resumingFrom.currentAnimation) === null ||
            c === void 0 ||
            c.stop()),
        this.pendingAnimation &&
          (q.update(this.pendingAnimation), (this.pendingAnimation = void 0)),
        (this.pendingAnimation = j.update(() => {
          (Dt.hasAnimatedSinceResize = !0),
            (this.currentAnimation = Gl(0, no, {
              ...r,
              onUpdate: (l) => {
                var u;
                this.mixTargetDelta(l),
                  (u = r.onUpdate) === null || u === void 0 || u.call(r, l);
              },
              onComplete: () => {
                var l;
                (l = r.onComplete) === null || l === void 0 || l.call(r),
                  this.completeAnimation();
              },
            })),
            this.resumingFrom &&
              (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0);
        }));
    }
    completeAnimation() {
      var r;
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0)),
        (r = this.getStack()) === null ||
          r === void 0 ||
          r.exitAnimationComplete(),
        (this.resumingFrom =
          this.currentAnimation =
          this.animationValues =
            void 0),
        this.notifyListeners("animationComplete");
    }
    finishAnimation() {
      var r;
      this.currentAnimation &&
        ((r = this.mixTargetDelta) === null || r === void 0 || r.call(this, no),
        this.currentAnimation.stop()),
        this.completeAnimation();
    }
    applyTransformsToTarget() {
      const r = this.getLead();
      let {
        targetWithTransforms: a,
        target: c,
        layout: l,
        latestValues: u,
      } = r;
      if (!(!a || !c || !l)) {
        if (
          this !== r &&
          this.layout &&
          l &&
          Gr(this.options.animationType, this.layout.actual, l.actual)
        ) {
          c = this.target || D();
          const f = N(this.layout.actual.x);
          (c.x.min = r.target.x.min), (c.x.max = c.x.min + f);
          const d = N(this.layout.actual.y);
          (c.y.min = r.target.y.min), (c.y.max = c.y.min + d);
        }
        W(a, c),
          Tt(a, u),
          jt(this.projectionDeltaWithTransform, this.layoutCorrected, a, u);
      }
    }
    registerSharedNode(r, a) {
      var c, l, u;
      this.sharedNodes.has(r) || this.sharedNodes.set(r, new eu()),
        this.sharedNodes.get(r).add(a),
        a.promote({
          transition:
            (c = a.options.initialPromotionConfig) === null || c === void 0
              ? void 0
              : c.transition,
          preserveFollowOpacity:
            (u =
              (l = a.options.initialPromotionConfig) === null || l === void 0
                ? void 0
                : l.shouldPreserveFollowOpacity) === null || u === void 0
              ? void 0
              : u.call(l, a),
        });
    }
    isLead() {
      const r = this.getStack();
      return r ? r.lead === this : !0;
    }
    getLead() {
      var r;
      const { layoutId: a } = this.options;
      return a
        ? ((r = this.getStack()) === null || r === void 0 ? void 0 : r.lead) ||
            this
        : this;
    }
    getPrevLead() {
      var r;
      const { layoutId: a } = this.options;
      return a
        ? (r = this.getStack()) === null || r === void 0
          ? void 0
          : r.prevLead
        : void 0;
    }
    getStack() {
      const { layoutId: r } = this.options;
      if (r) return this.root.sharedNodes.get(r);
    }
    promote({ needsReset: r, transition: a, preserveFollowOpacity: c } = {}) {
      const l = this.getStack();
      l && l.promote(this, c),
        r && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        a && this.setOptions({ transition: a });
    }
    relegate() {
      const r = this.getStack();
      return r ? r.relegate(this) : !1;
    }
    resetRotation() {
      const { visualElement: r } = this.options;
      if (!r) return;
      let a = !1;
      const c = {};
      for (let l = 0; l < eo.length; l++) {
        const f = "rotate" + eo[l];
        !r.getStaticValue(f) ||
          ((a = !0), (c[f] = r.getStaticValue(f)), r.setStaticValue(f, 0));
      }
      if (!!a) {
        r == null || r.syncRender();
        for (const l in c) r.setStaticValue(l, c[l]);
        r.scheduleRender();
      }
    }
    getProjectionStyles(r = {}) {
      var a, c, l;
      const u = {};
      if (!this.instance || this.isSVG) return u;
      if (this.isVisible) u.visibility = "";
      else return { visibility: "hidden" };
      const f =
        (a = this.options.visualElement) === null || a === void 0
          ? void 0
          : a.getProps().transformTemplate;
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (u.opacity = ""),
          (u.pointerEvents = oe(r.pointerEvents) || ""),
          (u.transform = f ? f(this.latestValues, "") : "none"),
          u
        );
      const d = this.getLead();
      if (!this.projectionDelta || !this.layout || !d.target) {
        const S = {};
        return (
          this.options.layoutId &&
            ((S.opacity =
              this.latestValues.opacity !== void 0
                ? this.latestValues.opacity
                : 1),
            (S.pointerEvents = oe(r.pointerEvents) || "")),
          this.hasProjected &&
            !dt(this.latestValues) &&
            ((S.transform = f ? f({}, "") : "none"), (this.hasProjected = !1)),
          S
        );
      }
      const h = d.animationValues || d.latestValues;
      this.applyTransformsToTarget(),
        (u.transform = to(
          this.projectionDeltaWithTransform,
          this.treeScale,
          h
        )),
        f && (u.transform = f(h, u.transform));
      const { x: m, y: x } = this.projectionDelta;
      (u.transformOrigin = `${m.origin * 100}% ${x.origin * 100}% 0`),
        d.animationValues
          ? (u.opacity =
              d === this
                ? (l =
                    (c = h.opacity) !== null && c !== void 0
                      ? c
                      : this.latestValues.opacity) !== null && l !== void 0
                  ? l
                  : 1
                : this.preserveOpacity
                ? this.latestValues.opacity
                : h.opacityExit)
          : (u.opacity =
              d === this
                ? h.opacity !== void 0
                  ? h.opacity
                  : ""
                : h.opacityExit !== void 0
                ? h.opacityExit
                : 0);
      for (const S in le) {
        if (h[S] === void 0) continue;
        const { correct: V, applyTo: b } = le[S],
          g = V(h[S], d);
        if (b) {
          const v = b.length;
          for (let w = 0; w < v; w++) u[b[w]] = g;
        } else u[S] = g;
      }
      return (
        this.options.layoutId &&
          (u.pointerEvents = d === this ? oe(r.pointerEvents) || "" : "none"),
        u
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      this.root.nodes.forEach((r) => {
        var a;
        return (a = r.currentAnimation) === null || a === void 0
          ? void 0
          : a.stop();
      }),
        this.root.nodes.forEach(so),
        this.root.sharedNodes.clear();
    }
  };
}
function ru(t) {
  t.updateLayout();
}
function iu(t) {
  var e, n, s;
  const o =
    ((e = t.resumeFrom) === null || e === void 0 ? void 0 : e.snapshot) ||
    t.snapshot;
  if (t.isLead() && t.layout && o && t.hasListeners("didUpdate")) {
    const { actual: i, measured: r } = t.layout,
      { animationType: a } = t.options;
    a === "size"
      ? K((d) => {
          const h = o.isShared ? o.measured[d] : o.layout[d],
            m = N(h);
          (h.min = i[d].min), (h.max = h.min + m);
        })
      : Gr(a, o.layout, i) &&
        K((d) => {
          const h = o.isShared ? o.measured[d] : o.layout[d],
            m = N(i[d]);
          h.max = h.min + m;
        });
    const c = Bt();
    jt(c, i, o.layout);
    const l = Bt();
    o.isShared
      ? jt(l, t.applyTransform(r, !0), o.measured)
      : jt(l, i, o.layout);
    const u = !$r(c);
    let f = !1;
    if (
      !t.resumeFrom &&
      ((t.relativeParent = t.getClosestProjectingParent()),
      t.relativeParent && !t.relativeParent.resumeFrom)
    ) {
      const { snapshot: d, layout: h } = t.relativeParent;
      if (d && h) {
        const m = D();
        _t(m, o.layout, d.layout);
        const x = D();
        _t(x, i, h.actual), Hr(m, x) || (f = !0);
      }
    }
    t.notifyListeners("didUpdate", {
      layout: i,
      snapshot: o,
      delta: l,
      layoutDelta: c,
      hasLayoutChanged: u,
      hasRelativeTargetChanged: f,
    });
  } else
    t.isLead() &&
      ((s = (n = t.options).onExitComplete) === null ||
        s === void 0 ||
        s.call(n));
  t.options.transition = void 0;
}
function au(t) {
  t.clearSnapshot();
}
function so(t) {
  t.clearMeasurements();
}
function cu(t) {
  const { visualElement: e } = t.options;
  e != null &&
    e.getProps().onBeforeLayoutMeasure &&
    e.notifyBeforeLayoutMeasure(),
    t.resetTransform();
}
function oo(t) {
  t.finishAnimation(), (t.targetDelta = t.relativeTarget = t.target = void 0);
}
function lu(t) {
  t.resolveTargetDelta();
}
function uu(t) {
  t.calcProjection();
}
function fu(t) {
  t.resetRotation();
}
function du(t) {
  t.removeLeadSnapshot();
}
function ro(t, e, n) {
  (t.translate = L(e.translate, 0, n)),
    (t.scale = L(e.scale, 1, n)),
    (t.origin = e.origin),
    (t.originPoint = e.originPoint);
}
function io(t, e, n, s) {
  (t.min = L(e.min, n.min, s)), (t.max = L(e.max, n.max, s));
}
function hu(t, e, n, s) {
  io(t.x, e.x, n.x, s), io(t.y, e.y, n.y, s);
}
function pu(t) {
  return t.animationValues && t.animationValues.opacityExit !== void 0;
}
const mu = { duration: 0.45, ease: [0.4, 0, 0.1, 1] };
function gu(t, e) {
  let n = t.root;
  for (let i = t.path.length - 1; i >= 0; i--)
    if (Boolean(t.path[i].instance)) {
      n = t.path[i];
      break;
    }
  const o = (n && n !== t.root ? n.instance : document).querySelector(
    `[data-projection-id="${e}"]`
  );
  o && t.mount(o, !0);
}
function ao(t) {
  (t.min = Math.round(t.min)), (t.max = Math.round(t.max));
}
function co(t) {
  ao(t.x), ao(t.y);
}
function Gr(t, e, n) {
  return (
    t === "position" || (t === "preserve-aspect" && !tu(Qs(e), Qs(n), 0.2))
  );
}
const yu = Wr({
    attachResizeListener: (t, e) => Ce(t, "resize", e),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  pt = { current: void 0 },
  qn = Wr({
    measureScroll: (t) => ({ x: t.scrollLeft, y: t.scrollTop }),
    defaultParent: () => {
      if (!pt.current) {
        const t = new yu(0, {});
        t.mount(window), t.setOptions({ layoutScroll: !0 }), (pt.current = t);
      }
      return pt.current;
    },
    resetTransform: (t, e) => {
      t.style.transform = e !== void 0 ? e : "none";
    },
    checkIsScrollRoot: (t) =>
      Boolean(window.getComputedStyle(t).position === "fixed"),
  }),
  Yr = { ...Pr, ...mr, ...Or, ...Ur },
  Kr = To((t, e) => An(t, e, Yr, Xn, qn));
function kf(t) {
  return wo(An(t, { forwardMotionProps: !1 }, Yr, Xn, qn));
}
const jf = To(An);
function Xr() {
  const t = p.exports.useRef(!1);
  return (
    mt(
      () => (
        (t.current = !0),
        () => {
          t.current = !1;
        }
      ),
      []
    ),
    t
  );
}
function Zn() {
  const t = Xr(),
    [e, n] = p.exports.useState(0),
    s = p.exports.useCallback(() => {
      t.current && n(e + 1);
    }, [e]);
  return [p.exports.useCallback(() => j.postRender(s), [s]), e];
}
class vu extends p.exports.Component {
  getSnapshotBeforeUpdate(e) {
    const n = this.props.childRef.current;
    if (n && e.isPresent && !this.props.isPresent) {
      const s = this.props.sizeRef.current;
      (s.height = n.offsetHeight || 0),
        (s.width = n.offsetWidth || 0),
        (s.top = n.offsetTop),
        (s.left = n.offsetLeft);
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function xu({ children: t, isPresent: e }) {
  const n = p.exports.useId(),
    s = p.exports.useRef(null),
    o = p.exports.useRef({ width: 0, height: 0, top: 0, left: 0 });
  return (
    p.exports.useInsertionEffect(() => {
      const { width: i, height: r, top: a, left: c } = o.current;
      if (e || !s.current || !i || !r) return;
      s.current.dataset.motionPopId = n;
      const l = document.createElement("style");
      return (
        document.head.appendChild(l),
        l.sheet &&
          l.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${i}px !important;
            height: ${r}px !important;
            top: ${a}px !important;
            left: ${c}px !important;
          }
        `),
        () => {
          document.head.removeChild(l);
        }
      );
    }, [e]),
    F(vu, {
      isPresent: e,
      childRef: s,
      sizeRef: o,
      children: p.exports.cloneElement(t, { ref: s }),
    })
  );
}
const He = ({
  children: t,
  initial: e,
  isPresent: n,
  onExitComplete: s,
  custom: o,
  presenceAffectsLayout: i,
  mode: r,
}) => {
  const a = _(bu),
    c = p.exports.useId(),
    l = p.exports.useMemo(
      () => ({
        id: c,
        initial: e,
        isPresent: n,
        custom: o,
        onExitComplete: (u) => {
          a.set(u, !0);
          for (const f of a.values()) if (!f) return;
          s && s();
        },
        register: (u) => (a.set(u, !1), () => a.delete(u)),
      }),
      i ? void 0 : [n]
    );
  return (
    p.exports.useMemo(() => {
      a.forEach((u, f) => a.set(f, !1));
    }, [n]),
    p.exports.useEffect(() => {
      !n && !a.size && s && s();
    }, [n]),
    r === "popLayout" && (t = F(xu, { isPresent: n, children: t })),
    F(At.Provider, { value: l, children: t })
  );
};
function bu() {
  return new Map();
}
const Vt = (t) => t.key || "";
function Su(t, e) {
  t.forEach((n) => {
    const s = Vt(n);
    e.set(s, n);
  });
}
function Vu(t) {
  const e = [];
  return (
    p.exports.Children.forEach(t, (n) => {
      p.exports.isValidElement(n) && e.push(n);
    }),
    e
  );
}
const _f = ({
    children: t,
    custom: e,
    initial: n = !0,
    onExitComplete: s,
    exitBeforeEnter: o,
    presenceAffectsLayout: i = !0,
    mode: r = "sync",
  }) => {
    o && ((r = "wait"), Le(!1, "Replace exitBeforeEnter with mode='wait'"));
    let [a] = Zn();
    const c = p.exports.useContext($t).forceRender;
    c && (a = c);
    const l = Xr(),
      u = Vu(t);
    let f = u;
    const d = new Set(),
      h = p.exports.useRef(f),
      m = p.exports.useRef(new Map()).current,
      x = p.exports.useRef(!0);
    if (
      (mt(() => {
        (x.current = !1), Su(u, m), (h.current = f);
      }),
      Mn(() => {
        (x.current = !0), m.clear(), d.clear();
      }),
      x.current)
    )
      return F(ns, {
        children: f.map((g) =>
          F(
            He,
            {
              isPresent: !0,
              initial: n ? void 0 : !1,
              presenceAffectsLayout: i,
              mode: r,
              children: g,
            },
            Vt(g)
          )
        ),
      });
    f = [...f];
    const S = h.current.map(Vt),
      V = u.map(Vt),
      b = S.length;
    for (let g = 0; g < b; g++) {
      const v = S[g];
      V.indexOf(v) === -1 && d.add(v);
    }
    return (
      r === "wait" && d.size && (f = []),
      d.forEach((g) => {
        if (V.indexOf(g) !== -1) return;
        const v = m.get(g);
        if (!v) return;
        const w = S.indexOf(g),
          A = () => {
            m.delete(g), d.delete(g);
            const E = h.current.findIndex((k) => k.key === g);
            if ((h.current.splice(E, 1), !d.size)) {
              if (((h.current = u), l.current === !1)) return;
              a(), s && s();
            }
          };
        f.splice(
          w,
          0,
          F(
            He,
            {
              isPresent: !1,
              onExitComplete: A,
              custom: e,
              presenceAffectsLayout: i,
              mode: r,
              children: v,
            },
            Vt(v)
          )
        );
      }),
      (f = f.map((g) => {
        const v = g.key;
        return d.has(v)
          ? g
          : F(
              He,
              { isPresent: !0, presenceAffectsLayout: i, mode: r, children: g },
              Vt(g)
            );
      })),
      Bn !== "production" &&
        r === "wait" &&
        f.length > 1 &&
        console.warn(
          `You're attempting to animate multiple children within AnimatePresence, but its mode is set to "wait". This will lead to odd visual behaviour.`
        ),
      F(ns, { children: d.size ? f : f.map((g) => p.exports.cloneElement(g)) })
    );
  },
  wu = p.exports.createContext(null),
  Tu = (t) => !t.isLayoutDirty && t.willUpdate(!1);
function lo() {
  const t = new Set(),
    e = new WeakMap(),
    n = () => t.forEach(Tu);
  return {
    add: (s) => {
      t.add(s), e.set(s, s.addEventListener("willUpdate", n));
    },
    remove: (s) => {
      var o;
      t.delete(s),
        (o = e.get(s)) === null || o === void 0 || o(),
        e.delete(s),
        n();
    },
    dirty: n,
  };
}
const qr = (t) => t === !0,
  Pu = (t) => qr(t === !0) || t === "id",
  Cu = ({ children: t, id: e, inheritId: n, inherit: s = !0 }) => {
    n !== void 0 && (s = n);
    const o = p.exports.useContext($t),
      i = p.exports.useContext(wu),
      [r, a] = Zn(),
      c = p.exports.useRef(null),
      l = o.id || i;
    c.current === null &&
      (Pu(s) && l && (e = e ? l + "-" + e : l),
      (c.current = { id: e, group: (qr(s) && o.group) || lo() }));
    const u = p.exports.useMemo(() => ({ ...c.current, forceRender: r }), [a]);
    return F($t.Provider, { value: u, children: t });
  };
let Au = 0;
const Bf = ({ children: t }) => (
  p.exports.useEffect(() => {}, []),
  F(Cu, { id: _(() => `asl-${Au++}`), children: t })
);
function Uf({ children: t, isValidProp: e, ...n }) {
  e && ko(e),
    (n = { ...p.exports.useContext(tt), ...n }),
    (n.isStatic = _(() => n.isStatic));
  const s = p.exports.useMemo(
    () => n,
    [JSON.stringify(n.transition), n.transformPagePoint, n.reducedMotion]
  );
  return F(tt.Provider, { value: s, children: t });
}
function Nf({ children: t, features: e, strict: n = !1 }) {
  const [, s] = p.exports.useState(!We(e)),
    o = p.exports.useRef(void 0);
  if (!We(e)) {
    const { renderer: i, ...r } = e;
    (o.current = i), Ye(r);
  }
  return (
    p.exports.useEffect(() => {
      We(e) &&
        e().then(({ renderer: i, ...r }) => {
          Ye(r), (o.current = i), s(!0);
        });
    }, []),
    F(gn.Provider, { value: { renderer: o.current, strict: n }, children: t })
  );
}
function We(t) {
  return typeof t == "function";
}
const Zr = p.exports.createContext(null);
function Ru(t, e, n, s) {
  if (!s) return t;
  const o = t.findIndex((u) => u.value === e);
  if (o === -1) return t;
  const i = s > 0 ? 1 : -1,
    r = t[o + i];
  if (!r) return t;
  const a = t[o],
    c = r.layout,
    l = L(c.min, c.max, 0.5);
  return (i === 1 && a.layout.max + n > l) || (i === -1 && a.layout.min + n < l)
    ? _c(t, o, o + i)
    : t;
}
function Mu(
  { children: t, as: e = "ul", axis: n = "y", onReorder: s, values: o, ...i },
  r
) {
  const a = _(() => Kr(e)),
    c = [],
    l = p.exports.useRef(!1),
    u = {
      axis: n,
      registerItem: (f, d) => {
        d &&
          c.findIndex((h) => f === h.value) === -1 &&
          (c.push({ value: f, layout: d[n] }), c.sort(Ou));
      },
      updateOrder: (f, d, h) => {
        if (l.current) return;
        const m = Ru(c, f, d, h);
        c !== m &&
          ((l.current = !0), s(m.map(Eu).filter((x) => o.indexOf(x) !== -1)));
      },
    };
  return (
    p.exports.useEffect(() => {
      l.current = !1;
    }),
    F(a, { ...i, ref: r, children: F(Zr.Provider, { value: u, children: t }) })
  );
}
const Lu = p.exports.forwardRef(Mu);
function Eu(t) {
  return t.value;
}
function Ou(t, e) {
  return t.layout.min - e.layout.min;
}
function yt(t) {
  const e = _(() => G(t)),
    { isStatic: n } = p.exports.useContext(tt);
  if (n) {
    const [, s] = p.exports.useState(t);
    p.exports.useEffect(() => e.onChange(s), []);
  }
  return e;
}
const Du = (t) => typeof t == "object" && t.mix,
  Iu = (t) => (Du(t) ? t.mix : void 0);
function Fu(...t) {
  const e = !Array.isArray(t[0]),
    n = e ? 0 : -1,
    s = t[0 + n],
    o = t[1 + n],
    i = t[2 + n],
    r = t[3 + n],
    a = En(o, i, { mixer: Iu(i[0]), ...r });
  return e ? a(s) : a;
}
function ku(t, e) {
  mt(() => {
    if (U(t)) return t.onChange(e);
  }, [e]);
}
function ju(t, e, n) {
  mt(() => {
    const s = t.map((o) => o.onChange(e));
    return () => {
      s.forEach((o) => o()), n();
    };
  });
}
function Jr(t, e) {
  const n = yt(e()),
    s = () => n.set(e());
  return (
    s(),
    ju(
      t,
      () => j.update(s, !1, !0),
      () => q.update(s)
    ),
    n
  );
}
function hn(t, e, n, s) {
  const o = typeof e == "function" ? e : Fu(e, n, s);
  return Array.isArray(t) ? uo(t, o) : uo([t], ([i]) => o(i));
}
function uo(t, e) {
  const n = _(() => []);
  return Jr(t, () => {
    n.length = 0;
    const s = t.length;
    for (let o = 0; o < s; o++) n[o] = t[o].get();
    return e(n);
  });
}
function fo(t, e = 0) {
  return U(t) ? t : yt(e);
}
function _u(
  {
    children: t,
    style: e = {},
    value: n,
    as: s = "li",
    onDrag: o,
    layout: i = !0,
    ...r
  },
  a
) {
  const c = _(() => Kr(s)),
    l = p.exports.useContext(Zr),
    u = { x: fo(e.x), y: fo(e.y) },
    f = hn([u.x, u.y], ([S, V]) => (S || V ? 1 : "unset")),
    d = p.exports.useRef(null),
    { axis: h, registerItem: m, updateOrder: x } = l;
  return (
    p.exports.useEffect(() => {
      m(n, d.current);
    }, [l]),
    F(c, {
      drag: h,
      ...r,
      dragSnapToOrigin: !0,
      style: { ...e, x: u.x, y: u.y, zIndex: f },
      layout: i,
      onDrag: (S, V) => {
        const { velocity: b } = V;
        b[h] && x(n, u[h].get(), b[h]), o && o(S, V);
      },
      onLayoutMeasure: (S) => {
        d.current = S;
      },
      ref: a,
      children: t,
    })
  );
}
const Bu = p.exports.forwardRef(_u),
  zf = { Group: Lu, Item: Bu },
  Uu = { renderer: Xn, ...Pr, ...mr },
  $f = { ...Uu, ...Or, ...Ur, projectionNodeConstructor: qn };
function Hf(t, ...e) {
  const n = t.length;
  function s() {
    let o = "";
    for (let i = 0; i < n; i++) (o += t[i]), e[i] && (o += e[i].get());
    return o;
  }
  return Jr(e, s);
}
function Wf(t, e = {}) {
  const { isStatic: n } = p.exports.useContext(tt),
    s = p.exports.useRef(null),
    o = yt(U(t) ? t.get() : t);
  return (
    p.exports.useMemo(
      () =>
        o.attach((i, r) =>
          n
            ? r(i)
            : (s.current && s.current.stop(),
              (s.current = jn({
                from: o.get(),
                to: i,
                velocity: o.getVelocity(),
                ...e,
                onUpdate: r,
              })),
              o.get())
        ),
      [JSON.stringify(e)]
    ),
    ku(t, (i) => o.set(parseFloat(i))),
    o
  );
}
function Gf(t) {
  const e = yt(t.getVelocity());
  return (
    p.exports.useEffect(
      () =>
        t.velocityUpdateSubscribers.add((n) => {
          e.set(n);
        }),
      [t]
    ),
    e
  );
}
const Nu = (t, e, n) => Math.min(Math.max(n, t), e),
  Jn = (t) => typeof t == "number",
  zu = (t) => Array.isArray(t) && !Jn(t[0]),
  $u = (t, e, n) => {
    const s = e - t;
    return ((((n - t) % s) + s) % s) + t;
  };
function Hu(t, e) {
  return zu(t) ? t[$u(0, t.length, e)] : t;
}
const Qr = (t, e, n) => -n * t + n * e + t,
  ti = (t) => t,
  Qn = (t, e, n) => (e - t === 0 ? 1 : (n - t) / (e - t));
function ei(t, e) {
  const n = t[t.length - 1];
  for (let s = 1; s <= e; s++) {
    const o = Qn(0, e, s);
    t.push(Qr(n, 1, o));
  }
}
function ni(t) {
  const e = [0];
  return ei(e, t - 1), e;
}
function Wu(t, e = ni(t.length), n = ti) {
  const s = t.length,
    o = s - e.length;
  return (
    o > 0 && ei(e, o),
    (i) => {
      let r = 0;
      for (; r < s - 2 && !(i < e[r + 1]); r++);
      let a = Nu(0, 1, Qn(e[r], e[r + 1], i));
      return (a = Hu(n, r)(a)), Qr(t[r], t[r + 1], a);
    }
  );
}
const ts = (t) => typeof t == "function",
  si = (t) => typeof t == "string";
function Gu(t, e) {
  return e ? t * (1e3 / e) : 0;
}
function oi(t, e) {
  var n;
  return (
    typeof t == "string"
      ? e
        ? (((n = e[t]) !== null && n !== void 0) ||
            (e[t] = document.querySelectorAll(t)),
          (t = e[t]))
        : (t = document.querySelectorAll(t))
      : t instanceof Element && (t = [t]),
    Array.from(t || [])
  );
}
function Yu(t, e) {
  var n = {};
  for (var s in t)
    Object.prototype.hasOwnProperty.call(t, s) &&
      e.indexOf(s) < 0 &&
      (n[s] = t[s]);
  if (t != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, s = Object.getOwnPropertySymbols(t); o < s.length; o++)
      e.indexOf(s[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(t, s[o]) &&
        (n[s[o]] = t[s[o]]);
  return n;
}
const Ku = { any: 0, all: 1 };
function Xu(t, e, { root: n, margin: s, amount: o = "any" } = {}) {
  if (typeof IntersectionObserver > "u") return () => {};
  const i = oi(t),
    r = new WeakMap(),
    a = (l) => {
      l.forEach((u) => {
        const f = r.get(u.target);
        if (u.isIntersecting !== Boolean(f))
          if (u.isIntersecting) {
            const d = e(u);
            ts(d) ? r.set(u.target, d) : c.unobserve(u.target);
          } else f && (f(u), r.delete(u.target));
      });
    },
    c = new IntersectionObserver(a, {
      root: n,
      rootMargin: s,
      threshold: typeof o == "number" ? o : Ku[o],
    });
  return i.forEach((l) => c.observe(l)), () => c.disconnect();
}
const ae = new WeakMap();
let rt;
function qu(t, e) {
  if (e) {
    const { inlineSize: n, blockSize: s } = e[0];
    return { width: n, height: s };
  } else
    return t instanceof SVGElement && "getBBox" in t
      ? t.getBBox()
      : { width: t.offsetWidth, height: t.offsetHeight };
}
function Zu({ target: t, contentRect: e, borderBoxSize: n }) {
  var s;
  (s = ae.get(t)) === null ||
    s === void 0 ||
    s.forEach((o) => {
      o({
        target: t,
        contentSize: e,
        get size() {
          return qu(t, n);
        },
      });
    });
}
function Ju(t) {
  t.forEach(Zu);
}
function Qu() {
  typeof ResizeObserver > "u" || (rt = new ResizeObserver(Ju));
}
function tf(t, e) {
  rt || Qu();
  const n = oi(t);
  return (
    n.forEach((s) => {
      let o = ae.get(s);
      o || ((o = new Set()), ae.set(s, o)),
        o.add(e),
        rt == null || rt.observe(s);
    }),
    () => {
      n.forEach((s) => {
        const o = ae.get(s);
        o == null || o.delete(e),
          (o != null && o.size) || rt == null || rt.unobserve(s);
      });
    }
  );
}
const ce = new Set();
let Ut;
function ef() {
  (Ut = () => {
    const t = { width: window.innerWidth, height: window.innerHeight },
      e = { target: window, size: t, contentSize: t };
    ce.forEach((n) => n(e));
  }),
    window.addEventListener("resize", Ut);
}
function nf(t) {
  return (
    ce.add(t),
    Ut || ef(),
    () => {
      ce.delete(t), !ce.size && Ut && (Ut = void 0);
    }
  );
}
function sf(t, e) {
  return ts(t) ? nf(t) : tf(t, e);
}
const of = 50,
  ho = () => ({
    current: 0,
    offset: [],
    progress: 0,
    scrollLength: 0,
    targetOffset: 0,
    targetLength: 0,
    containerLength: 0,
    velocity: 0,
  }),
  rf = () => ({ time: 0, x: ho(), y: ho() }),
  af = {
    x: { length: "Width", position: "Left" },
    y: { length: "Height", position: "Top" },
  };
function po(t, e, n, s) {
  const o = n[e],
    { length: i, position: r } = af[e],
    a = o.current,
    c = n.time;
  (o.current = t["scroll" + r]),
    (o.scrollLength = t["scroll" + i] - t["client" + i]),
    (o.offset.length = 0),
    (o.offset[0] = 0),
    (o.offset[1] = o.scrollLength),
    (o.progress = Qn(0, o.scrollLength, o.current));
  const l = s - c;
  o.velocity = l > of ? 0 : Gu(o.current - a, l);
}
function cf(t, e, n) {
  po(t, "x", e, n), po(t, "y", e, n), (e.time = n);
}
function lf(t, e) {
  let n = { x: 0, y: 0 },
    s = t;
  for (; s && s !== e; )
    if (s instanceof HTMLElement)
      (n.x += s.offsetLeft), (n.y += s.offsetTop), (s = s.offsetParent);
    else if (s instanceof SVGGraphicsElement && "getBBox" in s) {
      const { top: o, left: i } = s.getBBox();
      for (n.x += i, n.y += o; s && s.tagName !== "svg"; ) s = s.parentNode;
    }
  return n;
}
const uf = {
    Enter: [
      [0, 1],
      [1, 1],
    ],
    Exit: [
      [0, 0],
      [1, 0],
    ],
    Any: [
      [1, 0],
      [0, 1],
    ],
    All: [
      [0, 0],
      [1, 1],
    ],
  },
  pn = { start: 0, center: 0.5, end: 1 };
function mo(t, e, n = 0) {
  let s = 0;
  if ((pn[t] !== void 0 && (t = pn[t]), si(t))) {
    const o = parseFloat(t);
    t.endsWith("px")
      ? (s = o)
      : t.endsWith("%")
      ? (t = o / 100)
      : t.endsWith("vw")
      ? (s = (o / 100) * document.documentElement.clientWidth)
      : t.endsWith("vh")
      ? (s = (o / 100) * document.documentElement.clientHeight)
      : (t = o);
  }
  return Jn(t) && (s = e * t), n + s;
}
const ff = [0, 0];
function df(t, e, n, s) {
  let o = Array.isArray(t) ? t : ff,
    i = 0,
    r = 0;
  return (
    Jn(t)
      ? (o = [t, t])
      : si(t) &&
        ((t = t.trim()),
        t.includes(" ") ? (o = t.split(" ")) : (o = [t, pn[t] ? t : "0"])),
    (i = mo(o[0], n, s)),
    (r = mo(o[1], e)),
    i - r
  );
}
const hf = { x: 0, y: 0 };
function pf(t, e, n) {
  let { offset: s = uf.All } = n;
  const { target: o = t, axis: i = "y" } = n,
    r = i === "y" ? "height" : "width",
    a = o !== t ? lf(o, t) : hf,
    c =
      o === t
        ? { width: t.scrollWidth, height: t.scrollHeight }
        : { width: o.clientWidth, height: o.clientHeight },
    l = { width: t.clientWidth, height: t.clientHeight };
  e[i].offset.length = 0;
  let u = !e[i].interpolate;
  const f = s.length;
  for (let d = 0; d < f; d++) {
    const h = df(s[d], l[r], c[r], a[i]);
    !u && h !== e[i].interpolatorOffsets[d] && (u = !0), (e[i].offset[d] = h);
  }
  u &&
    ((e[i].interpolate = Wu(ni(f), e[i].offset)),
    (e[i].interpolatorOffsets = [...e[i].offset])),
    (e[i].progress = e[i].interpolate(e[i].current));
}
function mf(t, e = t, n) {
  if (((n.x.targetOffset = 0), (n.y.targetOffset = 0), e !== t)) {
    let s = e;
    for (; s && s != t; )
      (n.x.targetOffset += s.offsetLeft),
        (n.y.targetOffset += s.offsetTop),
        (s = s.offsetParent);
  }
  (n.x.targetLength = e === t ? e.scrollWidth : e.clientWidth),
    (n.y.targetLength = e === t ? e.scrollHeight : e.clientHeight),
    (n.x.containerLength = t.clientWidth),
    (n.y.containerLength = t.clientHeight);
}
function gf(t, e, n, s = {}) {
  const o = s.axis || "y";
  return {
    measure: () => mf(t, s.target, n),
    update: (i) => {
      cf(t, n, i), (s.offset || s.target) && pf(t, n, s);
    },
    notify: ts(e) ? () => e(n) : yf(e, n[o]),
  };
}
function yf(t, e) {
  return (
    t.pause(),
    t.forEachNative((n, { easing: s }) => {
      var o, i;
      if (n.updateDuration) s || (n.easing = ti), n.updateDuration(1);
      else {
        const r = { duration: 1e3 };
        s || (r.easing = "linear"),
          (i =
            (o = n.effect) === null || o === void 0
              ? void 0
              : o.updateTiming) === null ||
            i === void 0 ||
            i.call(o, r);
      }
    }),
    () => {
      t.currentTime = e.progress;
    }
  );
}
const Ot = new WeakMap(),
  go = new WeakMap(),
  Ge = new WeakMap(),
  yo = (t) => (t === document.documentElement ? window : t);
function vf(t, e = {}) {
  var { container: n = document.documentElement } = e,
    s = Yu(e, ["container"]);
  let o = Ge.get(n);
  o || ((o = new Set()), Ge.set(n, o));
  const i = rf(),
    r = gf(n, t, i, s);
  if ((o.add(r), !Ot.has(n))) {
    const l = () => {
      const f = performance.now();
      for (const d of o) d.measure();
      for (const d of o) d.update(f);
      for (const d of o) d.notify();
    };
    Ot.set(n, l);
    const u = yo(n);
    window.addEventListener("resize", l, { passive: !0 }),
      n !== document.documentElement && go.set(n, sf(n, l)),
      u.addEventListener("scroll", l, { passive: !0 });
  }
  const a = Ot.get(n),
    c = requestAnimationFrame(a);
  return () => {
    var l;
    typeof t != "function" && t.stop(), cancelAnimationFrame(c);
    const u = Ge.get(n);
    if (!u || (u.delete(r), u.size)) return;
    const f = Ot.get(n);
    Ot.delete(n),
      f &&
        (yo(n).removeEventListener("scroll", f),
        (l = go.get(n)) === null || l === void 0 || l(),
        window.removeEventListener("resize", f));
  };
}
const xf = () => ({
  scrollX: G(0),
  scrollY: G(0),
  scrollXProgress: G(0),
  scrollYProgress: G(0),
});
function ri({ container: t, target: e, layoutEffect: n = !0, ...s } = {}) {
  const o = _(xf);
  return (
    (n ? mt : p.exports.useEffect)(
      () =>
        vf(
          ({ x: r, y: a }) => {
            o.scrollX.set(r.current),
              o.scrollXProgress.set(r.progress),
              o.scrollY.set(a.current),
              o.scrollYProgress.set(a.progress);
          },
          {
            ...s,
            container: (t == null ? void 0 : t.current) || void 0,
            target: (e == null ? void 0 : e.current) || void 0,
          }
        ),
      []
    ),
    o
  );
}
function Yf(t) {
  return (
    Le(
      !1,
      "useElementScroll is deprecated. Convert to useScroll({ container: ref })."
    ),
    ri({ container: t })
  );
}
function Kf() {
  return (
    Le(!1, "useViewportScroll is deprecated. Convert to useScroll()."), ri()
  );
}
function bf(t) {
  const e = p.exports.useRef(0),
    { isStatic: n } = p.exports.useContext(tt);
  p.exports.useEffect(() => {
    if (n) return;
    const s = ({ timestamp: o, delta: i }) => {
      e.current || (e.current = o), t(o - e.current, i);
    };
    return j.update(s, !0), () => q.update(s);
  }, [t]);
}
function Xf() {
  const t = yt(0);
  return bf((e) => t.set(e)), t;
}
class Sf extends xr {
  constructor() {
    super(...arguments), (this.members = []), (this.transforms = new Set());
  }
  add(e) {
    let n;
    gt.has(e)
      ? (this.transforms.add(e), (n = "transform"))
      : !e.startsWith("origin") && !xn(e) && e !== "willChange" && (n = de(e)),
      n && (Ee(this.members, n), this.update());
  }
  remove(e) {
    gt.has(e)
      ? (this.transforms.delete(e),
        this.transforms.size || Kt(this.members, "transform"))
      : Kt(this.members, de(e)),
      this.update();
  }
  update() {
    this.set(this.members.length ? this.members.join(", ") : "auto");
  }
}
function qf() {
  return _(() => new Sf("auto"));
}
function Vf() {
  !Yn.current && Dr();
  const [t] = p.exports.useState(Ve.current);
  return t;
}
function Zf() {
  const t = Vf(),
    { reducedMotion: e } = p.exports.useContext(tt);
  return e === "never" ? !1 : e === "always" ? !0 : t;
}
function wf() {
  let t = !1;
  const e = [],
    n = new Set(),
    s = {
      subscribe(o) {
        return n.add(o), () => void n.delete(o);
      },
      start(o, i) {
        if (t) {
          const r = [];
          return (
            n.forEach((a) => {
              r.push(Wn(a, o, { transitionOverride: i }));
            }),
            Promise.all(r)
          );
        } else
          return new Promise((r) => {
            e.push({ animation: [o, i], resolve: r });
          });
      },
      set(o) {
        return n.forEach((i) => {
          Gc(i, o);
        });
      },
      stop() {
        n.forEach((o) => {
          Xc(o);
        });
      },
      mount() {
        return (
          (t = !0),
          e.forEach(({ animation: o, resolve: i }) => {
            s.start(...o).then(i);
          }),
          () => {
            (t = !1), s.stop();
          }
        );
      },
    };
  return s;
}
function Tf() {
  const t = _(wf);
  return p.exports.useEffect(t.mount, []), t;
}
const Jf = Tf;
function Qf(...t) {
  const e = p.exports.useRef(0),
    [n, s] = p.exports.useState(t[e.current]),
    o = p.exports.useCallback(
      (i) => {
        (e.current = typeof i != "number" ? ic(0, t.length, e.current + 1) : i),
          s(t[e.current]);
      },
      [t.length, ...t]
    );
  return [n, o];
}
function td(t, { root: e, margin: n, amount: s, once: o = !1 } = {}) {
  const [i, r] = p.exports.useState(!1);
  return (
    p.exports.useEffect(() => {
      if (!t.current || (o && i)) return;
      const a = () => (r(!0), o ? void 0 : () => r(!1)),
        c = {
          root: (e && e.current) || void 0,
          margin: n,
          amount: s === "some" ? "any" : s,
        };
      return Xu(t.current, a, c);
    }, [e, t, n, o]),
    i
  );
}
class Pf {
  constructor() {
    this.componentControls = new Set();
  }
  subscribe(e) {
    return (
      this.componentControls.add(e), () => this.componentControls.delete(e)
    );
  }
  start(e, n) {
    this.componentControls.forEach((s) => {
      s.start(e.nativeEvent || e, n);
    });
  }
}
const Cf = () => new Pf();
function ed() {
  return _(Cf);
}
function Af(t) {
  return t !== null && typeof t == "object" && yn in t;
}
function nd(t) {
  if (Af(t)) return t[yn];
}
function Rf() {
  return Mf;
}
function Mf(t) {
  !pt.current ||
    ((pt.current.isUpdating = !1), pt.current.blockUpdate(), t && t());
}
function sd() {
  const [t, e] = Zn(),
    n = Rf();
  return (
    p.exports.useEffect(() => {
      j.postRender(() => j.postRender(() => (on.current = !1)));
    }, [e]),
    (s) => {
      n(() => {
        (on.current = !0), t(), s();
      });
    }
  );
}
function od() {
  return p.exports.useCallback(() => {
    const e = pt.current;
    !e || e.resetTree();
  }, []);
}
const mn = () => ({}),
  Lf = Kn({
    build() {},
    measureViewportBox: D,
    resetTransform() {},
    restoreTransform() {},
    removeValueFromRenderState() {},
    render() {},
    scrapeMotionValuesFromProps: mn,
    readValueFromInstance(t, e, n) {
      return n.initialState[e] || 0;
    },
    makeTargetAnimatable(t, { transition: e, transitionEnd: n, ...s }) {
      const o = wr(s, e || {}, t);
      return Vr(t, s, o), { transition: e, transitionEnd: n, ...s };
    },
  }),
  Ef = Cn({ scrapeMotionValuesFromProps: mn, createRenderState: mn });
function rd(t) {
  const [e, n] = p.exports.useState(t),
    s = Ef({}, !1),
    o = _(() => Lf({ props: {}, visualState: s }, { initialState: t }));
  p.exports.useEffect(() => (o.mount({}), o.unmount), [o]),
    p.exports.useEffect(() => {
      o.setProps({
        onUpdate: (r) => {
          n({ ...r });
        },
      });
    }, [n, o]);
  const i = _(() => (r) => Wn(o, r));
  return [e, i];
}
const Of = 1e5,
  vo = (t) => (t > 0.001 ? 1 / t : Of);
function id(t) {
  let e = yt(1),
    n = yt(1);
  const s = bo();
  t
    ? ((e = t.scaleX || e), (n = t.scaleY || n))
    : s && ((e = s.getValue("scaleX", 1)), (n = s.getValue("scaleY", 1)));
  const o = hn(e, vo),
    i = hn(n, vo);
  return { scaleX: o, scaleY: i };
}
export {
  _f as AnimatePresence,
  Bf as AnimateSharedLayout,
  M as AnimationType,
  wu as DeprecatedLayoutGroupContext,
  Pf as DragControls,
  ou as FlatTree,
  Cu as LayoutGroup,
  $t as LayoutGroupContext,
  Nf as LazyMotion,
  Uf as MotionConfig,
  tt as MotionConfigContext,
  we as MotionContext,
  xr as MotionValue,
  At as PresenceContext,
  zf as Reorder,
  Vo as SwitchLayoutGroupContext,
  Pt as addPointerEvent,
  xi as addScaleCorrector,
  Gl as animate,
  Wn as animateVisualElement,
  wf as animationControls,
  Pr as animations,
  Vi as buildTransform,
  N as calcLength,
  Vr as checkTargetForNewValues,
  D as createBox,
  kf as createDomMotionComponent,
  wo as createMotionComponent,
  vr as delay,
  Uu as domAnimation,
  $f as domMax,
  $i as filterProps,
  vt as isBrowser,
  Xo as isDragActive,
  Af as isMotionComponent,
  U as isMotionValue,
  fe as isValidMotionProp,
  jf as m,
  Cn as makeUseVisualState,
  Kr as motion,
  G as motionValue,
  oe as resolveMotionValue,
  Fu as transform,
  nd as unwrapMotionComponent,
  Jf as useAnimation,
  Tf as useAnimationControls,
  bf as useAnimationFrame,
  Qf as useCycle,
  rd as useDeprecatedAnimatedState,
  id as useDeprecatedInvertedScale,
  Ze as useDomEvent,
  ed as useDragControls,
  Yf as useElementScroll,
  Zn as useForceUpdate,
  td as useInView,
  Rf as useInstantLayoutTransition,
  sd as useInstantTransition,
  If as useIsPresent,
  mt as useIsomorphicLayoutEffect,
  Hf as useMotionTemplate,
  yt as useMotionValue,
  gr as usePresence,
  Vf as useReducedMotion,
  Zf as useReducedMotionConfig,
  od as useResetProjection,
  ri as useScroll,
  Wf as useSpring,
  Xf as useTime,
  hn as useTransform,
  Mn as useUnmountEffect,
  Gf as useVelocity,
  Kf as useViewportScroll,
  bo as useVisualElementContext,
  qf as useWillChange,
  Kn as visualElement,
  Wo as wrapHandler,
};
