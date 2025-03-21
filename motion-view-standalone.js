function addUniqueItem(n, t) {-1 === n.indexOf(t) && n.push(t) }

function removeItem(n, t) {
  const s = n.indexOf(t);
  s > -1 && n.splice(s, 1)
}

function moveItem([...n], t, s) {
  const i = t < 0 ? n.length + t : t;
  if (i >= 0 && i < n
    .length) {
    const i = s < 0 ? n.length + s : s,
      [o] = n.splice(t, 1);
    n.splice(i, 0, o)
  }
  return n
}

function invariant(n, t) { if (!n) throw new Error(t) }

function warning(n, t) { n || console.warn(t) }
const MotionGlobalConfig = { skipAnimations: !1, useManualTiming: !1 };

function memo(n) { let t; return () => (void 0 === t && (t = n()), t) }
const noop = n => n;
const progress = (n, t, s) => { const i = t - n; return 0 === i ? 1 : (s - n) / i };
class SubscriptionManager {
  constructor() { this.subscriptions = [] } add(s) {
    return addUniqueItem(
      this.subscriptions, s), () => removeItem(this.subscriptions, s)
  }
  notify(n, t, s) {
    const
      i = this.subscriptions.length;
    if (i)
      if (1 === i) this.subscriptions[0](n, t, s);
      else
        for (let o = 0; o < i; o++) {
          const i = this.subscriptions[o];
          i && i(n, t, s)
        }
  }
  getSize() { return this.subscriptions.length } clear() {
    this
      .subscriptions.length = 0
  }
}
const secondsToMilliseconds = n => 1e3 * n;
const millisecondsToSeconds = n => n / 1e3;

function velocityPerSecond(n, t) { return t ? n * (1e3 / t) : 0 }
const hasWarnedSet = new Set;

function hasWarned(n) { return hasWarnedSet.has(n) }

function warnOnce(n, t, s) {
  n || hasWarnedSet.has(t) || (console.warn(t), s && console.warn(s),
    hasWarnedSet.add(t))
}

class c {
  constructor(t) {
    this.stop = () => this.runAll("stop"), this.animations = t.filter(
      Boolean)
  }
  get finished() {
    return Promise.all(this.animations.map((t => "finished" in t ? t
      .finished : t)))
  }
  getAll(t) { return this.animations[0][t] } setAll(t, e) {
    for (let n =
        0; n < this.animations.length; n++) this.animations[n][t] = e
  }
  attachTimeline(t, e) {
    const
      n = this.animations.map((n => u() && n.attachTimeline ? n.attachTimeline(t) : "function" ==
        typeof e ? e(n) : void 0));
    return () => {
      n.forEach(((t, e) => {
        t && t(), this
          .animations[e].stop()
      }))
    }
  }
  get time() { return this.getAll("time") } set time(
    t) { this.setAll("time", t) } get speed() { return this.getAll("speed") } set speed(t) {
    this
      .setAll("speed", t)
  }
  get startTime() {
    return this.getAll(
      "startTime")
  }
  get duration() {
    let t = 0;
    for (let e = 0; e < this.animations.length; e++) t =
      Math.max(t, this.animations[e].duration);
    return t
  }
  runAll(t) {
    this.animations.forEach((
      e => e[t]()))
  }
  flatten() { this.runAll("flatten") } play() {
    this.runAll(
      "play")
  }
  pause() { this.runAll("pause") } cancel() { this.runAll("cancel") } complete() {
    this
      .runAll("complete")
  }
}
class l extends c {
  then(t, e) {
    return Promise.all(this.animations)
      .then(t).catch(e)
  }
}

function d(t, e) { return t ? t[e] || t.default || t : void 0 }
const h = 2e4;

function m(t) {
  let e = 0;
  let n = t.next(e);
  for (; !n.done && e < h;) e += 50, n = t.next(
    e);
  return e >= h ? 1 / 0 : e
}

function p(t, n = 100, i) {
  const a = i({ ...t, keyframes: [0, n] }),
    r = Math.min(m(a), h);
  return {
    type: "keyframes",
    ease: t => a.next(r * t).value / n,
    duration: e(r)
  }
}

function f(t) { return "function" == typeof t }

function v(t, e) { t.timeline = e, t.onfinish = null } class y {
  constructor(t) {
    this.animation =
      t
  }
  get duration() {
    var t, n, i;
    const a = (null === (n = null === (t = this.animation) ||
          void 0 === t ? void 0 : t.effect) || void 0 === n ? void 0 : n.getComputedTiming()
        .duration) || (null === (i = this.options) || void 0 === i ? void 0 : i.duration) ||
      300;
    return e(Number(a))
  }
  get time() {
    var t;
    return this.animation ? e((null === (t = this
      .animation) || void 0 === t ? void 0 : t.currentTime) || 0) : 0
  }
  set time(t) {
    this
      .animation && (this.animation.currentTime = n(t))
  }
  get speed() {
    return this.animation ?
      this.animation.playbackRate : 1
  }
  set speed(t) {
    this.animation && (this.animation
      .playbackRate = t)
  }
  get state() {
    return this.animation ? this.animation.playState :
      "finished"
  }
  get startTime() {
    return this.animation ? this.animation.startTime :
      null
  }
  get finished() {
    return this.animation ? this.animation.finished : Promise
      .resolve()
  }
  play() { this.animation && this.animation.play() } pause() {
    this.animation && this
      .animation.pause()
  }
  stop() {
    this.animation && "idle" !== this.state && "finished" !== this
      .state && (this.animation.commitStyles && this.animation.commitStyles(), this
        .cancel())
  }
  flatten() {
    var t, e;
    this.animation && (null === (t = this.options) || void 0 === t ? void 0 : t.allowFlatten) && (
      null === (e = this.animation.effect) || void 0 === e || e
      .updateTiming({ easing: "linear" }))
  }
  attachTimeline(t) {
    return this.animation && v(this
      .animation, t), i
  }
  complete() {
    this.animation && this.animation
      .finish()
  }
  cancel() { try { this.animation && this.animation.cancel() } catch (t) {} }
}
const g = t => Array.isArray(t) && "number" == typeof t[0],
  w = { linearEasing: void 0 };

function T(e, n) {
  const i = t(e);
  return () => {
    var t;
    return null !== (t = w[n]) && void 0 !==
      t ? t : i()
  }
}
const E = T((() => {
      try {
        document.createElement("div")
          .animate({ opacity: 0 }, { easing: "linear(0, 1)" })
      } catch (t) { return !1 }
      return !0
    }),
    "linearEasing"),
  A = (t, e, n = 10) => {
    let i = "";
    const r = Math.max(Math.round(e / n), 2);
    for (let e = 0; e <
      r; e++) i += t(a(0, r - 1, e)) + ", ";
    return `linear(${i.substring(0,i.length-2)})`
  };

function P(t) {
  return Boolean("function" == typeof t && E() || !t || "string" == typeof t && (t in
    b || E()) || g(t) || Array.isArray(t) && t.every(P))
}
const x = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`,
  b = {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    circIn: x([0, .65, .55, 1]),
    circOut: x([.55, 0, 1, .45]),
    backIn: x([
      .31, .01, .66, -.59
    ]),
    backOut: x([.33, 1.53, .69, .99])
  };

function k(t, e) {
  return t ? "function" == typeof t && E() ? A(t, e) : g(t) ? x(t) : Array.isArray(
    t) ? t.map((t => k(t, e) || b.easeOut)) : b[t] : void 0
}
const M = ["read", "resolveKeyframes", "update", "preRender", "render", "postRender"],
  R = { value: null, addProjectionMetrics: null };

function L(t, e) {
  let n = !1,
    i = !0;
  const a = { delta: 0, timestamp: 0, isProcessing: !1 },
    s = () => n = !0,
    o = M.reduce(((t, n) => (t[n] = function (t, e) {
      let n = new Set,
        i = new Set,
        a = !1,
        r = !1;
      const s = new WeakSet;
      let o = { delta: 0, timestamp: 0, isProcessing: !1 },
        u = 0;

      function c(e) { s.has(e) && (l.schedule(e), t()), u++, e(o) }
      const l = {
        schedule: (t,
          e = !1, r = !1) => {
          const o = r && a ? n : i;
          return e && s.add(t), o.has(t) ||
            o.add(t), t
        },
        cancel: t => { i.delete(t), s.delete(t) },
        process: t => {
          o = t,
            a ? r = !0 : (a = !0, [n, i] = [i, n], n.forEach(c), e && R.value && R.value
              .frameloop[e].push(u), u = 0, n.clear(), a = !1, r && (r = !1, l.process(t))
            )
        }
      };
      return l
    }(s, e ? n : void 0), t)), {}),
    { read: u, resolveKeyframes: c, update: l, preRender: d, render: h, postRender: m } = o,
    p = () => {
      const s = r.useManualTiming ? a.timestamp : performance.now();
      n = !1, r.useManualTiming || (a.delta = i ? 1e3 / 60 : Math.max(Math.min(s - a.timestamp, 40),
          1)), a.timestamp = s, a.isProcessing = !0, u.process(a), c.process(a), l.process(a), d
        .process(a), h.process(a), m.process(a), a.isProcessing = !1, n && e && (i = !1, t(
          p))
    };
  return {
    schedule: M.reduce(((e, r) => {
      const s = o[r];
      return e[r] = (e, r = !1,
          o = !1) => (n || (n = !0, i = !0, a.isProcessing || t(p)), s.schedule(e, r, o)),
        e
    }), {}),
    cancel: t => { for (let e = 0; e < M.length; e++) o[M[e]].cancel(t) },
    state: a,
    steps: o
  }
}
const { schedule: j, cancel: S, state: C, steps: V } = L("undefined" !=
  typeof requestAnimationFrame ? requestAnimationFrame : i, !0), { schedule: F, cancel: $ } = L(
  queueMicrotask, !1);
let N;

function O() { N = void 0 }
const I = {
    now: () => (void 0 === N && I.set(C.isProcessing || r.useManualTiming ? C.timestamp :
      performance.now()), N),
    set: t => { N = t, queueMicrotask(O) }
  },
  q = { x: !1, y: !1 };

function K() { return q.x || q.y }

function U(t) {
  return "x" === t || "y" === t ? q[t] ? null : (q[t] = !0, () => { q[t] = !1 }) : q
    .x || q.y ? null : (q.x = q.y = !0, () => { q.x = q.y = !1 })
}

function B(t, e, n) {
  var i;
  if (t instanceof EventTarget) return [t];
  if ("string" ==
    typeof t) {
    let a = document;
    e && (a = e.current);
    const r = null !== (i = null == n ? void 0 : n[t]) && void 0 !== i ? i : a
      .querySelectorAll(t);
    return r ? Array.from(r) : []
  }
  return Array.from(t)
}

function D(t, e) {
  const n = B(t),
    i = new AbortController;
  return [n, { passive: !0, ...e, signal: i.signal }, () => i.abort()]
}

function W(t) { return !("touch" === t.pointerType || K()) }

function X(t, e, n = {}) {
  const [i, a, r] = D(t, n), s = t => {
    if (!W(t))
      return;
    const { target: n } = t, i = e(n, t);
    if ("function" != typeof i || !n) return;
    const
      r = t => { W(t) && (i(t), n.removeEventListener("pointerleave", r)) };
    n.addEventListener("pointerleave", r, a)
  };
  return i.forEach((t => {
    t.addEventListener(
      "pointerenter", s, a)
  })), r
}

function z(t, e) {
  const n = `${e}PointerCapture`;
  if (t.target instanceof Element && n in t
    .target && void 0 !== t.pointerId) try { t.target[n](t.pointerId) } catch (t) {}
}
const H = (t, e) => !!e && (t === e || H(t, e.parentElement)),
  Y = t => "mouse" === t.pointerType ? "number" != typeof t.button || t.button <= 0 : !1 !== t
  .isPrimary,
  G = new Set(["BUTTON", "INPUT", "SELECT", "TEXTAREA", "A"]);
const J = new WeakSet;

function Q(t) { return e => { "Enter" === e.key && t(e) } }

function Z(t, e) {
  t.dispatchEvent(new PointerEvent("pointer" + e, {
    isPrimary: !0,
    bubbles: !
      0
  }))
}

function _(t) { return Y(t) && !K() }

function tt(t, e, n = {}) {
  const [i, a, r] = D(t, n), s = t => {
    const n = t.currentTarget;
    if (!
      n || !_(t) || J.has(n)) return;
    J.add(n), z(t, "set");
    const i = e(n, t),
      r = (t, e) => {
        n.removeEventListener("pointerup", s), n.removeEventListener(
          "pointercancel", o), z(t, "release"), _(t) && J.has(n) && (J.delete(n), "function" ==
          typeof i && i(t, { success: e }))
      },
      s = t => {
        const e = !!t.isTrusted && (i = t, a = n instanceof Element ? n
          .getBoundingClientRect() : {
            left: 0,
            top: 0,
            right: window.innerWidth,
            bottom: window
              .innerHeight
          }, i.clientX < a.left || i.clientX > a.right || i.clientY < a.top ||
          i.clientY > a.bottom);
        var i, a;
        r(t, !e && (!(n instanceof Element) || H(n, t.target)))
      },
      o = t => { r(t, !1) };
    n.addEventListener("pointerup", s, a), n.addEventListener("pointercancel", o, a), n
      .addEventListener("lostpointercapture", o, a)
  };
  return i.forEach((t => {
    let e = !1;
    var i;
    (t = n.useGlobalTarget ? window : t) instanceof HTMLElement && (e = !0, i = t, G.has(i
      .tagName) || -1 !== i.tabIndex || null !== t.getAttribute("tabindex") || (t
      .tabIndex = 0)), t.addEventListener("pointerdown", s, a), e && t.addEventListener(
      "focus", (t => ((t, e) => {
        const n = t.currentTarget;
        if (!n) return;
        const i = Q((
          () => {
            if (J.has(n)) return;
            Z(n, "down");
            const t = Q((() => { Z(n, "up") }));
            n.addEventListener("keyup", t, e), n.addEventListener("blur", (() => Z(
              n, "cancel")), e)
          }));
        n.addEventListener("keydown", i, e), n.addEventListener("blur", (() => n
          .removeEventListener("keydown", i)), e)
      })(t, a)), a)
  })), r
}
const et = { layout: 0, mainThread: 0, waapi: 0 };

function nt() {
  const { value: t } = R;
  null !== t ? (t.frameloop.rate.push(C.delta), t.animations.mainThread.push(et.mainThread), t
    .animations.waapi.push(et.waapi), t.animations.layout.push(et.layout)) : S(nt)
}

function it(t) { return t.reduce(((t, e) => t + e), 0) / t.length }

function at(t, e = it) {
  return 0 === t.length ? { min: 0, max: 0, avg: 0 } : {
    min: Math.min(...t),
    max: Math.max(...t),
    avg: e(t)
  }
}
const rt = t => Math.round(1e3 / t);

function st() { R.value = null, R.addProjectionMetrics = null }

function ot() {
  const { value: t } = R;
  if (!t) throw new Error("Stats are not being measured");
  st(), S(nt);
  const e = {
      frameloop: {
        rate: at(t.frameloop.rate),
        read: at(t.frameloop.read),
        resolveKeyframes: at(t.frameloop.resolveKeyframes),
        update: at(t.frameloop.update),
        preRender: at(t.frameloop.preRender),
        render: at(t.frameloop.render),
        postRender: at(t
          .frameloop.postRender)
      },
      animations: {
        mainThread: at(t.animations.mainThread),
        waapi: at(t.animations.waapi),
        layout: at(t.animations.layout)
      },
      layoutProjection: {
        nodes: at(t.layoutProjection.nodes),
        calculatedTargetDeltas: at(t
          .layoutProjection.calculatedTargetDeltas),
        calculatedProjections: at(t.layoutProjection
          .calculatedProjections)
      }
    },
    { rate: n } = e.frameloop;
  return n.min = rt(n.min), n.max = rt(n.max), n.avg = rt(n.avg), [n
    .min, n.max
  ] = [n.max, n.min], e
}

function ut() {
  if (R.value) throw st(), new Error("Stats are already being measured");
  const t =
    R;
  return t.value = {
      frameloop: {
        rate: [],
        read: [],
        resolveKeyframes: [],
        update: [],
        preRender: [],
        render: [],
        postRender: []
      },
      animations: {
        mainThread: [],
        waapi: [],
        layout: []
      },
      layoutProjection: {
        nodes: [],
        calculatedTargetDeltas: [],
        calculatedProjections: []
      }
    }, t.addProjectionMetrics =
    e => {
      const { layoutProjection: n } = t.value;
      n.nodes.push(e.nodes), n.calculatedTargetDeltas.push(e.calculatedTargetDeltas), n
        .calculatedProjections.push(e.calculatedProjections)
    }, j.postRender(nt, !0), ot
}
const ct = { current: void 0 };
class lt {
  constructor(t, e = {}) {
    this.version = "12.5.0", this.canTrackVelocity = null, this
      .events = {}, this.updateAndNotify = (t, e = !0) => {
        const n = I.now();
        this.updatedAt !== n && this.setPrevFrameValue(), this.prev = this.current, this
          .setCurrent(t), this.current !== this.prev && this.events.change && this.events.change
          .notify(this.current), e && this.events.renderRequest && this.events.renderRequest
          .notify(this.current)
      }, this.hasAnimated = !1, this.setCurrent(t), this.owner = e
      .owner
  }
  setCurrent(t) {
    var e;
    this.current = t, this.updatedAt = I.now(), null === this.canTrackVelocity && void 0 !== t &&
      (this.canTrackVelocity = (e = this.current, !isNaN(parseFloat(e))))
  }
  setPrevFrameValue(t =
    this.current) { this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt } onChange(
    t) { return this.on("change", t) } on(t, e) {
    this.events[t] || (this.events[t] = new s);
    const
      n = this.events[t].add(e);
    return "change" === t ? () => {
      n(), j.read((() => {
        this.events
          .change.getSize() || this.stop()
      }))
    } : n
  }
  clearListeners() {
    for (const t in this
        .events) this.events[t].clear()
  }
  attach(t, e) {
    this.passiveEffect = t, this
      .stopPassiveEffect = e
  }
  set(t, e = !0) {
    e && this.passiveEffect ? this.passiveEffect(t,
      this.updateAndNotify) : this.updateAndNotify(t, e)
  }
  setWithVelocity(t, e, n) {
    this.set(e),
      this.prev = void 0, this.prevFrameValue = t, this.prevUpdatedAt = this.updatedAt - n
  }
  jump(
    t, e = !0) {
    this.updateAndNotify(t), this.prev = t, this.prevUpdatedAt = this
      .prevFrameValue = void 0, e && this.stop(), this.stopPassiveEffect && this
      .stopPassiveEffect()
  }
  get() {
    return ct.current && ct.current.push(this), this
      .current
  }
  getPrevious() { return this.prev } getVelocity() {
    const t = I.now();
    if (!this
      .canTrackVelocity || void 0 === this.prevFrameValue || t - this.updatedAt > 30)
      return 0;
    const e = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
    return o(parseFloat(this
      .current) - parseFloat(this.prevFrameValue), e)
  }
  start(t) {
    return this.stop(),
      new Promise((e => {
        this.hasAnimated = !0, this.animation = t(e), this.events
          .animationStart && this.events.animationStart.notify()
      })).then((() => {
        this.events
          .animationComplete && this.events.animationComplete.notify(), this
          .clearAnimation()
      }))
  }
  stop() {
    this.animation && (this.animation.stop(), this.events
        .animationCancel && this.events.animationCancel.notify()), this
      .clearAnimation()
  }
  isAnimating() { return !!this.animation } clearAnimation() {
    delete this
      .animation
  }
  destroy() {
    this.clearListeners(), this.stop(), this.stopPassiveEffect && this
      .stopPassiveEffect()
  }
}

function dt(t, e) { return new lt(t, e) }
const ht = "easeOut";

function mt(t) {
  var e;
  if (f(t.type)) {
    const e = p(t, 100, t.type);
    t.ease = E() ? e.ease : ht, t.duration = n(e.duration), t.type = "keyframes"
  } else t.duration =
    n(null !== (e = t.duration) && void 0 !== e ? e : .3), t.ease = t.ease ||
    ht
}
class pt extends y {
  constructor(t, e, i, a, r) {
    const s = function (t, e, i) {
      var
        a;
      const r = {},
        s = { fill: "both", easing: "linear", composite: "replace" };
      s.delay = n(null !== (a = i.delay) && void 0 !== a ? a : 0), mt(i), s.duration = i
        .duration;
      const { ease: o, times: u } = i;
      u && (r.offset = u), r[t] = e;
      const c = k(o, i.duration);
      return Array.isArray(c) ? r
        .easing = c : s.easing = c, { keyframes: r, options: s }
    }(i, a, r);
    super(t.animate(s.keyframes, { pseudoElement: e, ...s.options }))
  }
}

function ft(t) {
  return "layout" === t ? "group" : "enter" === t || "new" === t ? "new" : "exit" ===
    t || "old" === t ? "old" : "group"
}
let vt = {},
  yt = null;
const gt = (t, e) => { vt[t] = e },
  wt = () => {
    yt || (yt = document.createElement("style"), yt.id = "motion-view");
    let t =
      "";
    for (const e in vt) {
      const n = vt[e];
      t += `${e} {\n`;
      for (const [e, i] of Object.entries(n)) t += `  ${e}: ${i};\n`;
      t += "}\n"
    }
    yt.textContent = t, document.head.appendChild(yt), vt = {}
  },
  Tt = () => { yt && yt.parentElement && yt.parentElement.removeChild(yt) };

function Et(t) {
  const e = t.match(
    /::view-transition-(old|new|group|image-pair)\((.*?)\)/);
  return e ? { layer: e[2], type: e[1] } :
    null
}

function At(t) {
  var e;
  const { effect: n } = t;
  return !!n && (n.target === document
    .documentElement && (null === (e = n.pseudoElement) || void 0 === e ? void 0 : e.startsWith(
      "::view-transition")))
}
const Pt = ["layout", "enter", "exit", "new", "old"];

function xt(t, e, i) {
  if (!document.startViewTransition) return new Promise((async e => {
    await t
      (), e(new c([]))
  }));
  (function (t, e) { return e.has(t) && Object.keys(e.get(t)).length > 0 })("root", i) || gt(
    ":root", { "view-transition-name": "none" }), gt(
    "::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*)", { "animation-timing-function": "linear !important" }
  ), wt();
  const a = document.startViewTransition((async () => { await t() }));
  return a.finished
    .finally((() => { Tt() })), new Promise((t => {
      a.ready.then((() => {
        var a;
        const r = document
          .getAnimations().filter(At),
          s = [];
        i.forEach(((t, n) => {
          for (const i of Pt) {
            if (!t[i])
              continue;
            const { keyframes: a, options: r } = t[i];
            for (let [t,
                o
              ] of Object.entries(a)) {
              if (!o) continue;
              const a = {
                  ...d(e, t),
                  ...d(r, t)
                },
                u = ft(i);
              if ("opacity" === t && !Array.isArray(o)) {
                o = [
                  "new" === u ? 0 : 1, o
                ]
              }
              "function" == typeof a.delay && (a.delay = a.delay(0, 1));
              const
                c = new pt(document.documentElement, `::view-transition-${u}(${n})`,
                  t, o, a);
              s.push(c)
            }
          }
        }));
        for (const t of r) {
          if ("finished" === t.playState)
            continue;
          const { effect: r } = t;
          if (!(r && r instanceof KeyframeEffect))
            continue;
          const { pseudoElement: o } = r;
          if (!o) continue;
          const u = Et(
            o);
          if (!u) continue;
          const c = i.get(u.layer);
          if (c) bt(c, "enter") && bt(c,
              "exit") && r.getKeyframes().some((t => t.mixBlendMode)) ? s.push(new y(t)) :
            t.cancel();
          else {
            const i = "group" === u.type ? "layout" : "",
              o = { ...d(e, i) };
            mt(o);
            const c = k(o.ease, o.duration);
            r.updateTiming({
              delay: n(null !== (a = o.delay) && void 0 !== a ? a : 0),
              duration: o.duration,
              easing: c
            }), s.push(new y(t))
          }
        }
        t(new c(s))
      }))
    }))
}

function bt(t, e) {
  var n;
  return null === (n = null == t ? void 0 : t[e]) || void 0 === n ?
    void 0 : n.keyframes.opacity
}
class ViewTransitionBuilder {
  constructor(t, e = {}) {
    this.currentTarget = "root",
      this.targets = new Map, this.notifyReady = i, this.readyPromise = new Promise((t => {
        this
          .notifyReady = t
      })), queueMicrotask((() => {
        xt(t, e, this.targets).then((t => this
          .notifyReady(t)))
      }))
  }
  get(t) { return this.currentTarget = t, this } layout(t,
    e) { return this.updateTarget("layout", t, e), this } new(t, e) {
    return this.updateTarget(
      "new", t, e), this
  }
  old(t, e) { return this.updateTarget("old", t, e), this } enter(t,
    e) { return this.updateTarget("enter", t, e), this } exit(t, e) {
    return this.updateTarget(
      "exit", t, e), this
  }
  crossfade(t) {
    return this.updateTarget("enter", { opacity: 1 }, t),
      this.updateTarget("exit", { opacity: 0 }, t), this
  }
  updateTarget(t, e,
    n = {}) {
    const { currentTarget: i, targets: a } = this;
    a.has(i) || a.set(i, {});
    a.get(i)[t] = { keyframes: e, options: n }
  }
  then(t, e) {
    return this.readyPromise.then(t,
      e)
  }
}

function view(t, e = {}) { return new ViewTransitionBuilder(t, e) }
