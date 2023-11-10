;(function () {
  const t = document.createElement("link").relList
  if (t && t.supports && t.supports("modulepreload")) return
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i)
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const l of r.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && s(l)
  }).observe(document, { childList: !0, subtree: !0 })
  function n(i) {
    const r = {}
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    )
  }
  function s(i) {
    if (i.ep) return
    i.ep = !0
    const r = n(i)
    fetch(i.href, r)
  }
})()
function Hr(e, t) {
  const n = Object.create(null),
    s = e.split(",")
  for (let i = 0; i < s.length; i++) n[s[i]] = !0
  return t ? (i) => !!n[i.toLowerCase()] : (i) => !!n[i]
}
const we = {},
  cn = [],
  at = () => {},
  Qa = () => !1,
  Za = /^on[^a-z]/,
  Ps = (e) => Za.test(e),
  Vr = (e) => e.startsWith("onUpdate:"),
  He = Object.assign,
  Ur = (e, t) => {
    const n = e.indexOf(t)
    n > -1 && e.splice(n, 1)
  },
  ec = Object.prototype.hasOwnProperty,
  fe = (e, t) => ec.call(e, t),
  ee = Array.isArray,
  un = (e) => Ls(e) === "[object Map]",
  ro = (e) => Ls(e) === "[object Set]",
  ne = (e) => typeof e == "function",
  Ae = (e) => typeof e == "string",
  Cs = (e) => typeof e == "symbol",
  Te = (e) => e !== null && typeof e == "object",
  io = (e) => (Te(e) || ne(e)) && ne(e.then) && ne(e.catch),
  lo = Object.prototype.toString,
  Ls = (e) => lo.call(e),
  tc = (e) => Ls(e).slice(8, -1),
  oo = (e) => Ls(e) === "[object Object]",
  Gr = (e) =>
    Ae(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  ds = Hr(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  Os = (e) => {
    const t = Object.create(null)
    return (n) => t[n] || (t[n] = e(n))
  },
  nc = /-(\w)/g,
  vt = Os((e) => e.replace(nc, (t, n) => (n ? n.toUpperCase() : ""))),
  sc = /\B([A-Z])/g,
  nn = Os((e) => e.replace(sc, "-$1").toLowerCase()),
  xs = Os((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  js = Os((e) => (e ? `on${xs(e)}` : "")),
  en = (e, t) => !Object.is(e, t),
  ps = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t)
  },
  gs = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n })
  },
  fr = (e) => {
    const t = parseFloat(e)
    return isNaN(t) ? e : t
  }
let Ei
const dr = () =>
  Ei ||
  (Ei =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {})
function Ve(e) {
  if (ee(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        i = Ae(s) ? oc(s) : Ve(s)
      if (i) for (const r in i) t[r] = i[r]
    }
    return t
  } else if (Ae(e) || Te(e)) return e
}
const rc = /;(?![^(]*\))/g,
  ic = /:([^]+)/,
  lc = /\/\*[^]*?\*\//g
function oc(e) {
  const t = {}
  return (
    e
      .replace(lc, "")
      .split(rc)
      .forEach((n) => {
        if (n) {
          const s = n.split(ic)
          s.length > 1 && (t[s[0].trim()] = s[1].trim())
        }
      }),
    t
  )
}
function qn(e) {
  let t = ""
  if (Ae(e)) t = e
  else if (ee(e))
    for (let n = 0; n < e.length; n++) {
      const s = qn(e[n])
      s && (t += s + " ")
    }
  else if (Te(e)) for (const n in e) e[n] && (t += n + " ")
  return t.trim()
}
const ac =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  cc = Hr(ac)
function ao(e) {
  return !!e || e === ""
}
const re = (e) =>
    Ae(e)
      ? e
      : e == null
      ? ""
      : ee(e) || (Te(e) && (e.toString === lo || !ne(e.toString)))
      ? JSON.stringify(e, co, 2)
      : String(e),
  co = (e, t) =>
    t && t.__v_isRef
      ? co(e, t.value)
      : un(t)
      ? {
          [`Map(${t.size})`]: [...t.entries()].reduce(
            (n, [s, i]) => ((n[`${s} =>`] = i), n),
            {}
          ),
        }
      : ro(t)
      ? { [`Set(${t.size})`]: [...t.values()] }
      : Te(t) && !ee(t) && !oo(t)
      ? String(t)
      : t
let it
class uo {
  constructor(t = !1) {
    ;(this.detached = t),
      (this._active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = it),
      !t && it && (this.index = (it.scopes || (it.scopes = [])).push(this) - 1)
  }
  get active() {
    return this._active
  }
  run(t) {
    if (this._active) {
      const n = it
      try {
        return (it = this), t()
      } finally {
        it = n
      }
    }
  }
  on() {
    it = this
  }
  off() {
    it = this.parent
  }
  stop(t) {
    if (this._active) {
      let n, s
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop()
      for (n = 0, s = this.cleanups.length; n < s; n++) this.cleanups[n]()
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0)
      if (!this.detached && this.parent && !t) {
        const i = this.parent.scopes.pop()
        i &&
          i !== this &&
          ((this.parent.scopes[this.index] = i), (i.index = this.index))
      }
      ;(this.parent = void 0), (this._active = !1)
    }
  }
}
function uc(e) {
  return new uo(e)
}
function fc(e, t = it) {
  t && t.active && t.effects.push(e)
}
function dc() {
  return it
}
const jr = (e) => {
    const t = new Set(e)
    return (t.w = 0), (t.n = 0), t
  },
  fo = (e) => (e.w & Ht) > 0,
  po = (e) => (e.n & Ht) > 0,
  pc = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Ht
  },
  hc = (e) => {
    const { deps: t } = e
    if (t.length) {
      let n = 0
      for (let s = 0; s < t.length; s++) {
        const i = t[s]
        fo(i) && !po(i) ? i.delete(e) : (t[n++] = i), (i.w &= ~Ht), (i.n &= ~Ht)
      }
      t.length = n
    }
  },
  pr = new WeakMap()
let An = 0,
  Ht = 1
const hr = 30
let lt
const Qt = Symbol(""),
  mr = Symbol("")
class zr {
  constructor(t, n = null, s) {
    ;(this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      fc(this, s)
  }
  run() {
    if (!this.active) return this.fn()
    let t = lt,
      n = $t
    for (; t; ) {
      if (t === this) return
      t = t.parent
    }
    try {
      return (
        (this.parent = lt),
        (lt = this),
        ($t = !0),
        (Ht = 1 << ++An),
        An <= hr ? pc(this) : wi(this),
        this.fn()
      )
    } finally {
      An <= hr && hc(this),
        (Ht = 1 << --An),
        (lt = this.parent),
        ($t = n),
        (this.parent = void 0),
        this.deferStop && this.stop()
    }
  }
  stop() {
    lt === this
      ? (this.deferStop = !0)
      : this.active &&
        (wi(this), this.onStop && this.onStop(), (this.active = !1))
  }
}
function wi(e) {
  const { deps: t } = e
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e)
    t.length = 0
  }
}
let $t = !0
const ho = []
function Sn() {
  ho.push($t), ($t = !1)
}
function Tn() {
  const e = ho.pop()
  $t = e === void 0 ? !0 : e
}
function Je(e, t, n) {
  if ($t && lt) {
    let s = pr.get(e)
    s || pr.set(e, (s = new Map()))
    let i = s.get(n)
    i || s.set(n, (i = jr())), mo(i)
  }
}
function mo(e, t) {
  let n = !1
  An <= hr ? po(e) || ((e.n |= Ht), (n = !fo(e))) : (n = !e.has(lt)),
    n && (e.add(lt), lt.deps.push(e))
}
function It(e, t, n, s, i, r) {
  const l = pr.get(e)
  if (!l) return
  let a = []
  if (t === "clear") a = [...l.values()]
  else if (n === "length" && ee(e)) {
    const o = Number(s)
    l.forEach((u, c) => {
      ;(c === "length" || (!Cs(c) && c >= o)) && a.push(u)
    })
  } else
    switch ((n !== void 0 && a.push(l.get(n)), t)) {
      case "add":
        ee(e)
          ? Gr(n) && a.push(l.get("length"))
          : (a.push(l.get(Qt)), un(e) && a.push(l.get(mr)))
        break
      case "delete":
        ee(e) || (a.push(l.get(Qt)), un(e) && a.push(l.get(mr)))
        break
      case "set":
        un(e) && a.push(l.get(Qt))
        break
    }
  if (a.length === 1) a[0] && gr(a[0])
  else {
    const o = []
    for (const u of a) u && o.push(...u)
    gr(jr(o))
  }
}
function gr(e, t) {
  const n = ee(e) ? e : [...e]
  for (const s of n) s.computed && Si(s)
  for (const s of n) s.computed || Si(s)
}
function Si(e, t) {
  ;(e !== lt || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run())
}
const mc = Hr("__proto__,__v_isRef,__isVue"),
  go = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Cs)
  ),
  Ti = gc()
function gc() {
  const e = {}
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const s = he(this)
        for (let r = 0, l = this.length; r < l; r++) Je(s, "get", r + "")
        const i = s[t](...n)
        return i === -1 || i === !1 ? s[t](...n.map(he)) : i
      }
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        Sn()
        const s = he(this)[t].apply(this, n)
        return Tn(), s
      }
    }),
    e
  )
}
function _c(e) {
  const t = he(this)
  return Je(t, "has", e), t.hasOwnProperty(e)
}
class _o {
  constructor(t = !1, n = !1) {
    ;(this._isReadonly = t), (this._shallow = n)
  }
  get(t, n, s) {
    const i = this._isReadonly,
      r = this._shallow
    if (n === "__v_isReactive") return !i
    if (n === "__v_isReadonly") return i
    if (n === "__v_isShallow") return r
    if (n === "__v_raw" && s === (i ? (r ? xc : Eo) : r ? yo : bo).get(t))
      return t
    const l = ee(t)
    if (!i) {
      if (l && fe(Ti, n)) return Reflect.get(Ti, n, s)
      if (n === "hasOwnProperty") return _c
    }
    const a = Reflect.get(t, n, s)
    return (Cs(n) ? go.has(n) : mc(n)) || (i || Je(t, "get", n), r)
      ? a
      : $e(a)
      ? l && Gr(n)
        ? a
        : a.value
      : Te(a)
      ? i
        ? So(a)
        : As(a)
      : a
  }
}
class vo extends _o {
  constructor(t = !1) {
    super(!1, t)
  }
  set(t, n, s, i) {
    let r = t[n]
    if (mn(r) && $e(r) && !$e(s)) return !1
    if (
      !this._shallow &&
      (!_s(s) && !mn(s) && ((r = he(r)), (s = he(s))),
      !ee(t) && $e(r) && !$e(s))
    )
      return (r.value = s), !0
    const l = ee(t) && Gr(n) ? Number(n) < t.length : fe(t, n),
      a = Reflect.set(t, n, s, i)
    return (
      t === he(i) && (l ? en(s, r) && It(t, "set", n, s) : It(t, "add", n, s)),
      a
    )
  }
  deleteProperty(t, n) {
    const s = fe(t, n)
    t[n]
    const i = Reflect.deleteProperty(t, n)
    return i && s && It(t, "delete", n, void 0), i
  }
  has(t, n) {
    const s = Reflect.has(t, n)
    return (!Cs(n) || !go.has(n)) && Je(t, "has", n), s
  }
  ownKeys(t) {
    return Je(t, "iterate", ee(t) ? "length" : Qt), Reflect.ownKeys(t)
  }
}
class vc extends _o {
  constructor(t = !1) {
    super(!0, t)
  }
  set(t, n) {
    return !0
  }
  deleteProperty(t, n) {
    return !0
  }
}
const bc = new vo(),
  yc = new vc(),
  Ec = new vo(!0),
  Yr = (e) => e,
  Ns = (e) => Reflect.getPrototypeOf(e)
function ns(e, t, n = !1, s = !1) {
  e = e.__v_raw
  const i = he(e),
    r = he(t)
  n || (en(t, r) && Je(i, "get", t), Je(i, "get", r))
  const { has: l } = Ns(i),
    a = s ? Yr : n ? qr : Wn
  if (l.call(i, t)) return a(e.get(t))
  if (l.call(i, r)) return a(e.get(r))
  e !== i && e.get(t)
}
function ss(e, t = !1) {
  const n = this.__v_raw,
    s = he(n),
    i = he(e)
  return (
    t || (en(e, i) && Je(s, "has", e), Je(s, "has", i)),
    e === i ? n.has(e) : n.has(e) || n.has(i)
  )
}
function rs(e, t = !1) {
  return (
    (e = e.__v_raw), !t && Je(he(e), "iterate", Qt), Reflect.get(e, "size", e)
  )
}
function Ii(e) {
  e = he(e)
  const t = he(this)
  return Ns(t).has.call(t, e) || (t.add(e), It(t, "add", e, e)), this
}
function Pi(e, t) {
  t = he(t)
  const n = he(this),
    { has: s, get: i } = Ns(n)
  let r = s.call(n, e)
  r || ((e = he(e)), (r = s.call(n, e)))
  const l = i.call(n, e)
  return (
    n.set(e, t), r ? en(t, l) && It(n, "set", e, t) : It(n, "add", e, t), this
  )
}
function Ci(e) {
  const t = he(this),
    { has: n, get: s } = Ns(t)
  let i = n.call(t, e)
  i || ((e = he(e)), (i = n.call(t, e))), s && s.call(t, e)
  const r = t.delete(e)
  return i && It(t, "delete", e, void 0), r
}
function Li() {
  const e = he(this),
    t = e.size !== 0,
    n = e.clear()
  return t && It(e, "clear", void 0, void 0), n
}
function is(e, t) {
  return function (s, i) {
    const r = this,
      l = r.__v_raw,
      a = he(l),
      o = t ? Yr : e ? qr : Wn
    return (
      !e && Je(a, "iterate", Qt), l.forEach((u, c) => s.call(i, o(u), o(c), r))
    )
  }
}
function ls(e, t, n) {
  return function (...s) {
    const i = this.__v_raw,
      r = he(i),
      l = un(r),
      a = e === "entries" || (e === Symbol.iterator && l),
      o = e === "keys" && l,
      u = i[e](...s),
      c = n ? Yr : t ? qr : Wn
    return (
      !t && Je(r, "iterate", o ? mr : Qt),
      {
        next() {
          const { value: p, done: h } = u.next()
          return h
            ? { value: p, done: h }
            : { value: a ? [c(p[0]), c(p[1])] : c(p), done: h }
        },
        [Symbol.iterator]() {
          return this
        },
      }
    )
  }
}
function Ot(e) {
  return function (...t) {
    return e === "delete" ? !1 : this
  }
}
function wc() {
  const e = {
      get(r) {
        return ns(this, r)
      },
      get size() {
        return rs(this)
      },
      has: ss,
      add: Ii,
      set: Pi,
      delete: Ci,
      clear: Li,
      forEach: is(!1, !1),
    },
    t = {
      get(r) {
        return ns(this, r, !1, !0)
      },
      get size() {
        return rs(this)
      },
      has: ss,
      add: Ii,
      set: Pi,
      delete: Ci,
      clear: Li,
      forEach: is(!1, !0),
    },
    n = {
      get(r) {
        return ns(this, r, !0)
      },
      get size() {
        return rs(this, !0)
      },
      has(r) {
        return ss.call(this, r, !0)
      },
      add: Ot("add"),
      set: Ot("set"),
      delete: Ot("delete"),
      clear: Ot("clear"),
      forEach: is(!0, !1),
    },
    s = {
      get(r) {
        return ns(this, r, !0, !0)
      },
      get size() {
        return rs(this, !0)
      },
      has(r) {
        return ss.call(this, r, !0)
      },
      add: Ot("add"),
      set: Ot("set"),
      delete: Ot("delete"),
      clear: Ot("clear"),
      forEach: is(!0, !0),
    }
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      ;(e[r] = ls(r, !1, !1)),
        (n[r] = ls(r, !0, !1)),
        (t[r] = ls(r, !1, !0)),
        (s[r] = ls(r, !0, !0))
    }),
    [e, n, t, s]
  )
}
const [Sc, Tc, Ic, Pc] = wc()
function Kr(e, t) {
  const n = t ? (e ? Pc : Ic) : e ? Tc : Sc
  return (s, i, r) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? s
      : Reflect.get(fe(n, i) && i in s ? n : s, i, r)
}
const Cc = { get: Kr(!1, !1) },
  Lc = { get: Kr(!1, !0) },
  Oc = { get: Kr(!0, !1) },
  bo = new WeakMap(),
  yo = new WeakMap(),
  Eo = new WeakMap(),
  xc = new WeakMap()
function Nc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2
    default:
      return 0
  }
}
function Ac(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Nc(tc(e))
}
function As(e) {
  return mn(e) ? e : Xr(e, !1, bc, Cc, bo)
}
function wo(e) {
  return Xr(e, !1, Ec, Lc, yo)
}
function So(e) {
  return Xr(e, !0, yc, Oc, Eo)
}
function Xr(e, t, n, s, i) {
  if (!Te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e
  const r = i.get(e)
  if (r) return r
  const l = Ac(e)
  if (l === 0) return e
  const a = new Proxy(e, l === 2 ? s : n)
  return i.set(e, a), a
}
function fn(e) {
  return mn(e) ? fn(e.__v_raw) : !!(e && e.__v_isReactive)
}
function mn(e) {
  return !!(e && e.__v_isReadonly)
}
function _s(e) {
  return !!(e && e.__v_isShallow)
}
function To(e) {
  return fn(e) || mn(e)
}
function he(e) {
  const t = e && e.__v_raw
  return t ? he(t) : e
}
function Io(e) {
  return gs(e, "__v_skip", !0), e
}
const Wn = (e) => (Te(e) ? As(e) : e),
  qr = (e) => (Te(e) ? So(e) : e)
function Po(e) {
  $t && lt && ((e = he(e)), mo(e.dep || (e.dep = jr())))
}
function Co(e, t) {
  e = he(e)
  const n = e.dep
  n && gr(n)
}
function $e(e) {
  return !!(e && e.__v_isRef === !0)
}
function _e(e) {
  return Oo(e, !1)
}
function Lo(e) {
  return Oo(e, !0)
}
function Oo(e, t) {
  return $e(e) ? e : new Mc(e, t)
}
class Mc {
  constructor(t, n) {
    ;(this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : he(t)),
      (this._value = n ? t : Wn(t))
  }
  get value() {
    return Po(this), this._value
  }
  set value(t) {
    const n = this.__v_isShallow || _s(t) || mn(t)
    ;(t = n ? t : he(t)),
      en(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Wn(t)), Co(this))
  }
}
function tt(e) {
  return $e(e) ? e.value : e
}
const Rc = {
  get: (e, t, n) => tt(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const i = e[t]
    return $e(i) && !$e(n) ? ((i.value = n), !0) : Reflect.set(e, t, n, s)
  },
}
function xo(e) {
  return fn(e) ? e : new Proxy(e, Rc)
}
class Dc {
  constructor(t, n, s, i) {
    ;(this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !1),
      (this._dirty = !0),
      (this.effect = new zr(t, () => {
        this._dirty || ((this._dirty = !0), Co(this))
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !i),
      (this.__v_isReadonly = s)
  }
  get value() {
    const t = he(this)
    return (
      Po(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    )
  }
  set value(t) {
    this._setter(t)
  }
}
function kc(e, t, n = !1) {
  let s, i
  const r = ne(e)
  return (
    r ? ((s = e), (i = at)) : ((s = e.get), (i = e.set)),
    new Dc(s, i, r || !i, n)
  )
}
function Bt(e, t, n, s) {
  let i
  try {
    i = s ? e(...s) : e()
  } catch (r) {
    Ms(r, t, n)
  }
  return i
}
function ct(e, t, n, s) {
  if (ne(e)) {
    const r = Bt(e, t, n, s)
    return (
      r &&
        io(r) &&
        r.catch((l) => {
          Ms(l, t, n)
        }),
      r
    )
  }
  const i = []
  for (let r = 0; r < e.length; r++) i.push(ct(e[r], t, n, s))
  return i
}
function Ms(e, t, n, s = !0) {
  const i = t ? t.vnode : null
  if (t) {
    let r = t.parent
    const l = t.proxy,
      a = n
    for (; r; ) {
      const u = r.ec
      if (u) {
        for (let c = 0; c < u.length; c++) if (u[c](e, l, a) === !1) return
      }
      r = r.parent
    }
    const o = t.appContext.config.errorHandler
    if (o) {
      Bt(o, null, 10, [e, l, a])
      return
    }
  }
  Fc(e, n, i, s)
}
function Fc(e, t, n, s = !0) {
  console.error(e)
}
let Hn = !1,
  _r = !1
const Ue = []
let mt = 0
const dn = []
let St = null,
  Kt = 0
const No = Promise.resolve()
let Jr = null
function Qr(e) {
  const t = Jr || No
  return e ? t.then(this ? e.bind(this) : e) : t
}
function $c(e) {
  let t = mt + 1,
    n = Ue.length
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      i = Ue[s],
      r = Vn(i)
    r < e || (r === e && i.pre) ? (t = s + 1) : (n = s)
  }
  return t
}
function Zr(e) {
  ;(!Ue.length || !Ue.includes(e, Hn && e.allowRecurse ? mt + 1 : mt)) &&
    (e.id == null ? Ue.push(e) : Ue.splice($c(e.id), 0, e), Ao())
}
function Ao() {
  !Hn && !_r && ((_r = !0), (Jr = No.then(Ro)))
}
function Bc(e) {
  const t = Ue.indexOf(e)
  t > mt && Ue.splice(t, 1)
}
function Wc(e) {
  ee(e)
    ? dn.push(...e)
    : (!St || !St.includes(e, e.allowRecurse ? Kt + 1 : Kt)) && dn.push(e),
    Ao()
}
function Oi(e, t = Hn ? mt + 1 : 0) {
  for (; t < Ue.length; t++) {
    const n = Ue[t]
    n && n.pre && (Ue.splice(t, 1), t--, n())
  }
}
function Mo(e) {
  if (dn.length) {
    const t = [...new Set(dn)]
    if (((dn.length = 0), St)) {
      St.push(...t)
      return
    }
    for (St = t, St.sort((n, s) => Vn(n) - Vn(s)), Kt = 0; Kt < St.length; Kt++)
      St[Kt]()
    ;(St = null), (Kt = 0)
  }
}
const Vn = (e) => (e.id == null ? 1 / 0 : e.id),
  Hc = (e, t) => {
    const n = Vn(e) - Vn(t)
    if (n === 0) {
      if (e.pre && !t.pre) return -1
      if (t.pre && !e.pre) return 1
    }
    return n
  }
function Ro(e) {
  ;(_r = !1), (Hn = !0), Ue.sort(Hc)
  const t = at
  try {
    for (mt = 0; mt < Ue.length; mt++) {
      const n = Ue[mt]
      n && n.active !== !1 && Bt(n, null, 14)
    }
  } finally {
    ;(mt = 0),
      (Ue.length = 0),
      Mo(),
      (Hn = !1),
      (Jr = null),
      (Ue.length || dn.length) && Ro()
  }
}
function Vc(e, t, ...n) {
  if (e.isUnmounted) return
  const s = e.vnode.props || we
  let i = n
  const r = t.startsWith("update:"),
    l = r && t.slice(7)
  if (l && l in s) {
    const c = `${l === "modelValue" ? "model" : l}Modifiers`,
      { number: p, trim: h } = s[c] || we
    h && (i = n.map((g) => (Ae(g) ? g.trim() : g))), p && (i = n.map(fr))
  }
  let a,
    o = s[(a = js(t))] || s[(a = js(vt(t)))]
  !o && r && (o = s[(a = js(nn(t)))]), o && ct(o, e, 6, i)
  const u = s[a + "Once"]
  if (u) {
    if (!e.emitted) e.emitted = {}
    else if (e.emitted[a]) return
    ;(e.emitted[a] = !0), ct(u, e, 6, i)
  }
}
function Do(e, t, n = !1) {
  const s = t.emitsCache,
    i = s.get(e)
  if (i !== void 0) return i
  const r = e.emits
  let l = {},
    a = !1
  if (!ne(e)) {
    const o = (u) => {
      const c = Do(u, t, !0)
      c && ((a = !0), He(l, c))
    }
    !n && t.mixins.length && t.mixins.forEach(o),
      e.extends && o(e.extends),
      e.mixins && e.mixins.forEach(o)
  }
  return !r && !a
    ? (Te(e) && s.set(e, null), null)
    : (ee(r) ? r.forEach((o) => (l[o] = null)) : He(l, r),
      Te(e) && s.set(e, l),
      l)
}
function Rs(e, t) {
  return !e || !Ps(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      fe(e, t[0].toLowerCase() + t.slice(1)) || fe(e, nn(t)) || fe(e, t))
}
let Be = null,
  Ds = null
function vs(e) {
  const t = Be
  return (Be = e), (Ds = (e && e.type.__scopeId) || null), t
}
function Jn(e) {
  Ds = e
}
function Qn() {
  Ds = null
}
function Mt(e, t = Be, n) {
  if (!t || e._n) return e
  const s = (...i) => {
    s._d && Hi(-1)
    const r = vs(t)
    let l
    try {
      l = e(...i)
    } finally {
      vs(r), s._d && Hi(1)
    }
    return l
  }
  return (s._n = !0), (s._c = !0), (s._d = !0), s
}
function zs(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: i,
    props: r,
    propsOptions: [l],
    slots: a,
    attrs: o,
    emit: u,
    render: c,
    renderCache: p,
    data: h,
    setupState: g,
    ctx: w,
    inheritAttrs: E,
  } = e
  let T, m
  const y = vs(e)
  try {
    if (n.shapeFlag & 4) {
      const b = i || s
      ;(T = ht(c.call(b, b, p, r, g, h, w))), (m = o)
    } else {
      const b = t
      ;(T = ht(
        b.length > 1 ? b(r, { attrs: o, slots: a, emit: u }) : b(r, null)
      )),
        (m = t.props ? o : Uc(o))
    }
  } catch (b) {
    ;(kn.length = 0), Ms(b, e, 1), (T = be(Vt))
  }
  let S = T
  if (m && E !== !1) {
    const b = Object.keys(m),
      { shapeFlag: x } = S
    b.length && x & 7 && (l && b.some(Vr) && (m = Gc(m, l)), (S = gn(S, m)))
  }
  return (
    n.dirs && ((S = gn(S)), (S.dirs = S.dirs ? S.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (S.transition = n.transition),
    (T = S),
    vs(y),
    T
  )
}
const Uc = (e) => {
    let t
    for (const n in e)
      (n === "class" || n === "style" || Ps(n)) && ((t || (t = {}))[n] = e[n])
    return t
  },
  Gc = (e, t) => {
    const n = {}
    for (const s in e) (!Vr(s) || !(s.slice(9) in t)) && (n[s] = e[s])
    return n
  }
function jc(e, t, n) {
  const { props: s, children: i, component: r } = e,
    { props: l, children: a, patchFlag: o } = t,
    u = r.emitsOptions
  if (t.dirs || t.transition) return !0
  if (n && o >= 0) {
    if (o & 1024) return !0
    if (o & 16) return s ? xi(s, l, u) : !!l
    if (o & 8) {
      const c = t.dynamicProps
      for (let p = 0; p < c.length; p++) {
        const h = c[p]
        if (l[h] !== s[h] && !Rs(u, h)) return !0
      }
    }
  } else
    return (i || a) && (!a || !a.$stable)
      ? !0
      : s === l
      ? !1
      : s
      ? l
        ? xi(s, l, u)
        : !0
      : !!l
  return !1
}
function xi(e, t, n) {
  const s = Object.keys(t)
  if (s.length !== Object.keys(e).length) return !0
  for (let i = 0; i < s.length; i++) {
    const r = s[i]
    if (t[r] !== e[r] && !Rs(n, r)) return !0
  }
  return !1
}
function zc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent)
}
const Yc = (e) => e.__isSuspense
function Kc(e, t) {
  t && t.pendingBranch
    ? ee(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : Wc(e)
}
const os = {}
function Wt(e, t, n) {
  return ko(e, t, n)
}
function ko(
  e,
  t,
  { immediate: n, deep: s, flush: i, onTrack: r, onTrigger: l } = we
) {
  var a
  const o = dc() === ((a = Fe) == null ? void 0 : a.scope) ? Fe : null
  let u,
    c = !1,
    p = !1
  if (
    ($e(e)
      ? ((u = () => e.value), (c = _s(e)))
      : fn(e)
      ? ((u = () => e), (s = !0))
      : ee(e)
      ? ((p = !0),
        (c = e.some((b) => fn(b) || _s(b))),
        (u = () =>
          e.map((b) => {
            if ($e(b)) return b.value
            if (fn(b)) return qt(b)
            if (ne(b)) return Bt(b, o, 2)
          })))
      : ne(e)
      ? t
        ? (u = () => Bt(e, o, 2))
        : (u = () => {
            if (!(o && o.isUnmounted)) return h && h(), ct(e, o, 3, [g])
          })
      : (u = at),
    t && s)
  ) {
    const b = u
    u = () => qt(b())
  }
  let h,
    g = (b) => {
      h = y.onStop = () => {
        Bt(b, o, 4)
      }
    },
    w
  if (jn)
    if (
      ((g = at),
      t ? n && ct(t, o, 3, [u(), p ? [] : void 0, g]) : u(),
      i === "sync")
    ) {
      const b = Wu()
      w = b.__watcherHandles || (b.__watcherHandles = [])
    } else return at
  let E = p ? new Array(e.length).fill(os) : os
  const T = () => {
    if (y.active)
      if (t) {
        const b = y.run()
        ;(s || c || (p ? b.some((x, A) => en(x, E[A])) : en(b, E))) &&
          (h && h(),
          ct(t, o, 3, [b, E === os ? void 0 : p && E[0] === os ? [] : E, g]),
          (E = b))
      } else y.run()
  }
  T.allowRecurse = !!t
  let m
  i === "sync"
    ? (m = T)
    : i === "post"
    ? (m = () => Xe(T, o && o.suspense))
    : ((T.pre = !0), o && (T.id = o.uid), (m = () => Zr(T)))
  const y = new zr(u, m)
  t
    ? n
      ? T()
      : (E = y.run())
    : i === "post"
    ? Xe(y.run.bind(y), o && o.suspense)
    : y.run()
  const S = () => {
    y.stop(), o && o.scope && Ur(o.scope.effects, y)
  }
  return w && w.push(S), S
}
function Xc(e, t, n) {
  const s = this.proxy,
    i = Ae(e) ? (e.includes(".") ? Fo(s, e) : () => s[e]) : e.bind(s, s)
  let r
  ne(t) ? (r = t) : ((r = t.handler), (n = t))
  const l = Fe
  _n(this)
  const a = ko(i, r.bind(s), n)
  return l ? _n(l) : Zt(), a
}
function Fo(e, t) {
  const n = t.split(".")
  return () => {
    let s = e
    for (let i = 0; i < n.length && s; i++) s = s[n[i]]
    return s
  }
}
function qt(e, t) {
  if (!Te(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e
  if ((t.add(e), $e(e))) qt(e.value, t)
  else if (ee(e)) for (let n = 0; n < e.length; n++) qt(e[n], t)
  else if (ro(e) || un(e))
    e.forEach((n) => {
      qt(n, t)
    })
  else if (oo(e)) for (const n in e) qt(e[n], t)
  return e
}
function qc(e, t) {
  const n = Be
  if (n === null) return e
  const s = Bs(n) || n.proxy,
    i = e.dirs || (e.dirs = [])
  for (let r = 0; r < t.length; r++) {
    let [l, a, o, u = we] = t[r]
    l &&
      (ne(l) && (l = { mounted: l, updated: l }),
      l.deep && qt(a),
      i.push({
        dir: l,
        instance: s,
        value: a,
        oldValue: void 0,
        arg: o,
        modifiers: u,
      }))
  }
  return e
}
function zt(e, t, n, s) {
  const i = e.dirs,
    r = t && t.dirs
  for (let l = 0; l < i.length; l++) {
    const a = i[l]
    r && (a.oldValue = r[l].value)
    let o = a.dir[s]
    o && (Sn(), ct(o, n, 8, [e.el, a, e, t]), Tn())
  }
}
/*! #__NO_SIDE_EFFECTS__ */ function Zn(e, t) {
  return ne(e) ? (() => He({ name: e.name }, t, { setup: e }))() : e
}
const Rn = (e) => !!e.type.__asyncLoader,
  $o = (e) => e.type.__isKeepAlive
function Jc(e, t) {
  Bo(e, "a", t)
}
function Qc(e, t) {
  Bo(e, "da", t)
}
function Bo(e, t, n = Fe) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let i = n
      for (; i; ) {
        if (i.isDeactivated) return
        i = i.parent
      }
      return e()
    })
  if ((ks(t, s, n), n)) {
    let i = n.parent
    for (; i && i.parent; ) $o(i.parent.vnode) && Zc(s, t, n, i), (i = i.parent)
  }
}
function Zc(e, t, n, s) {
  const i = ks(t, e, s, !0)
  ni(() => {
    Ur(s[t], i)
  }, n)
}
function ks(e, t, n = Fe, s = !1) {
  if (n) {
    const i = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...l) => {
          if (n.isUnmounted) return
          Sn(), _n(n)
          const a = ct(t, n, e, l)
          return Zt(), Tn(), a
        })
    return s ? i.unshift(r) : i.push(r), r
  }
}
const Pt =
    (e) =>
    (t, n = Fe) =>
      (!jn || e === "sp") && ks(e, (...s) => t(...s), n),
  Wo = Pt("bm"),
  Fs = Pt("m"),
  Ho = Pt("bu"),
  ei = Pt("u"),
  ti = Pt("bum"),
  ni = Pt("um"),
  eu = Pt("sp"),
  tu = Pt("rtg"),
  nu = Pt("rtc")
function su(e, t = Fe) {
  ks("ec", e, t)
}
const Vo = "components"
function Ni(e, t) {
  return iu(Vo, e, !0, t) || e
}
const ru = Symbol.for("v-ndc")
function iu(e, t, n = !0, s = !1) {
  const i = Be || Fe
  if (i) {
    const r = i.type
    if (e === Vo) {
      const a = Fu(r, !1)
      if (a && (a === t || a === vt(t) || a === xs(vt(t)))) return r
    }
    const l = Ai(i[e] || r[e], t) || Ai(i.appContext[e], t)
    return !l && s ? r : l
  }
}
function Ai(e, t) {
  return e && (e[t] || e[vt(t)] || e[xs(vt(t))])
}
function Uo(e, t, n, s) {
  let i
  const r = n && n[s]
  if (ee(e) || Ae(e)) {
    i = new Array(e.length)
    for (let l = 0, a = e.length; l < a; l++)
      i[l] = t(e[l], l, void 0, r && r[l])
  } else if (typeof e == "number") {
    i = new Array(e)
    for (let l = 0; l < e; l++) i[l] = t(l + 1, l, void 0, r && r[l])
  } else if (Te(e))
    if (e[Symbol.iterator])
      i = Array.from(e, (l, a) => t(l, a, void 0, r && r[a]))
    else {
      const l = Object.keys(e)
      i = new Array(l.length)
      for (let a = 0, o = l.length; a < o; a++) {
        const u = l[a]
        i[a] = t(e[u], u, a, r && r[a])
      }
    }
  else i = []
  return n && (n[s] = i), i
}
function lu(e, t, n = {}, s, i) {
  if (Be.isCE || (Be.parent && Rn(Be.parent) && Be.parent.isCE))
    return t !== "default" && (n.name = t), be("slot", n, s && s())
  let r = e[t]
  r && r._c && (r._d = !1), Ge()
  const l = r && Go(r(n)),
    a = ea(
      ke,
      { key: n.key || (l && l.key) || `_${t}` },
      l || (s ? s() : []),
      l && e._ === 1 ? 64 : -2
    )
  return (
    !i && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]),
    r && r._c && (r._d = !0),
    a
  )
}
function Go(e) {
  return e.some((t) =>
    Es(t) ? !(t.type === Vt || (t.type === ke && !Go(t.children))) : !0
  )
    ? e
    : null
}
const vr = (e) => (e ? (na(e) ? Bs(e) || e.proxy : vr(e.parent)) : null),
  Dn = He(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => vr(e.parent),
    $root: (e) => vr(e.root),
    $emit: (e) => e.emit,
    $options: (e) => si(e),
    $forceUpdate: (e) => e.f || (e.f = () => Zr(e.update)),
    $nextTick: (e) => e.n || (e.n = Qr.bind(e.proxy)),
    $watch: (e) => Xc.bind(e),
  }),
  Ys = (e, t) => e !== we && !e.__isScriptSetup && fe(e, t),
  ou = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: s,
        data: i,
        props: r,
        accessCache: l,
        type: a,
        appContext: o,
      } = e
      let u
      if (t[0] !== "$") {
        const g = l[t]
        if (g !== void 0)
          switch (g) {
            case 1:
              return s[t]
            case 2:
              return i[t]
            case 4:
              return n[t]
            case 3:
              return r[t]
          }
        else {
          if (Ys(s, t)) return (l[t] = 1), s[t]
          if (i !== we && fe(i, t)) return (l[t] = 2), i[t]
          if ((u = e.propsOptions[0]) && fe(u, t)) return (l[t] = 3), r[t]
          if (n !== we && fe(n, t)) return (l[t] = 4), n[t]
          br && (l[t] = 0)
        }
      }
      const c = Dn[t]
      let p, h
      if (c) return t === "$attrs" && Je(e, "get", t), c(e)
      if ((p = a.__cssModules) && (p = p[t])) return p
      if (n !== we && fe(n, t)) return (l[t] = 4), n[t]
      if (((h = o.config.globalProperties), fe(h, t))) return h[t]
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: i, ctx: r } = e
      return Ys(i, t)
        ? ((i[t] = n), !0)
        : s !== we && fe(s, t)
        ? ((s[t] = n), !0)
        : fe(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0)
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: i,
          propsOptions: r,
        },
      },
      l
    ) {
      let a
      return (
        !!n[l] ||
        (e !== we && fe(e, l)) ||
        Ys(t, l) ||
        ((a = r[0]) && fe(a, l)) ||
        fe(s, l) ||
        fe(Dn, l) ||
        fe(i.config.globalProperties, l)
      )
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : fe(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      )
    },
  }
function Mi(e) {
  return ee(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e
}
let br = !0
function au(e) {
  const t = si(e),
    n = e.proxy,
    s = e.ctx
  ;(br = !1), t.beforeCreate && Ri(t.beforeCreate, e, "bc")
  const {
    data: i,
    computed: r,
    methods: l,
    watch: a,
    provide: o,
    inject: u,
    created: c,
    beforeMount: p,
    mounted: h,
    beforeUpdate: g,
    updated: w,
    activated: E,
    deactivated: T,
    beforeDestroy: m,
    beforeUnmount: y,
    destroyed: S,
    unmounted: b,
    render: x,
    renderTracked: A,
    renderTriggered: M,
    errorCaptured: V,
    serverPrefetch: D,
    expose: F,
    inheritAttrs: j,
    components: X,
    directives: z,
    filters: pe,
  } = t
  if ((u && cu(u, s, null), l))
    for (const ae in l) {
      const se = l[ae]
      ne(se) && (s[ae] = se.bind(n))
    }
  if (i) {
    const ae = i.call(n, n)
    Te(ae) && (e.data = As(ae))
  }
  if (((br = !0), r))
    for (const ae in r) {
      const se = r[ae],
        ye = ne(se) ? se.bind(n, n) : ne(se.get) ? se.get.bind(n, n) : at,
        Me = !ne(se) && ne(se.set) ? se.set.bind(n) : at,
        Re = Le({ get: ye, set: Me })
      Object.defineProperty(s, ae, {
        enumerable: !0,
        configurable: !0,
        get: () => Re.value,
        set: (Pe) => (Re.value = Pe),
      })
    }
  if (a) for (const ae in a) jo(a[ae], s, n, ae)
  if (o) {
    const ae = ne(o) ? o.call(n) : o
    Reflect.ownKeys(ae).forEach((se) => {
      pn(se, ae[se])
    })
  }
  c && Ri(c, e, "c")
  function ie(ae, se) {
    ee(se) ? se.forEach((ye) => ae(ye.bind(n))) : se && ae(se.bind(n))
  }
  if (
    (ie(Wo, p),
    ie(Fs, h),
    ie(Ho, g),
    ie(ei, w),
    ie(Jc, E),
    ie(Qc, T),
    ie(su, V),
    ie(nu, A),
    ie(tu, M),
    ie(ti, y),
    ie(ni, b),
    ie(eu, D),
    ee(F))
  )
    if (F.length) {
      const ae = e.exposed || (e.exposed = {})
      F.forEach((se) => {
        Object.defineProperty(ae, se, {
          get: () => n[se],
          set: (ye) => (n[se] = ye),
        })
      })
    } else e.exposed || (e.exposed = {})
  x && e.render === at && (e.render = x),
    j != null && (e.inheritAttrs = j),
    X && (e.components = X),
    z && (e.directives = z)
}
function cu(e, t, n = at) {
  ee(e) && (e = yr(e))
  for (const s in e) {
    const i = e[s]
    let r
    Te(i)
      ? "default" in i
        ? (r = _t(i.from || s, i.default, !0))
        : (r = _t(i.from || s))
      : (r = _t(i)),
      $e(r)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => r.value,
            set: (l) => (r.value = l),
          })
        : (t[s] = r)
  }
}
function Ri(e, t, n) {
  ct(ee(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n)
}
function jo(e, t, n, s) {
  const i = s.includes(".") ? Fo(n, s) : () => n[s]
  if (Ae(e)) {
    const r = t[e]
    ne(r) && Wt(i, r)
  } else if (ne(e)) Wt(i, e.bind(n))
  else if (Te(e))
    if (ee(e)) e.forEach((r) => jo(r, t, n, s))
    else {
      const r = ne(e.handler) ? e.handler.bind(n) : t[e.handler]
      ne(r) && Wt(i, r, e)
    }
}
function si(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: i,
      optionsCache: r,
      config: { optionMergeStrategies: l },
    } = e.appContext,
    a = r.get(t)
  let o
  return (
    a
      ? (o = a)
      : !i.length && !n && !s
      ? (o = t)
      : ((o = {}), i.length && i.forEach((u) => bs(o, u, l, !0)), bs(o, t, l)),
    Te(t) && r.set(t, o),
    o
  )
}
function bs(e, t, n, s = !1) {
  const { mixins: i, extends: r } = t
  r && bs(e, r, n, !0), i && i.forEach((l) => bs(e, l, n, !0))
  for (const l in t)
    if (!(s && l === "expose")) {
      const a = uu[l] || (n && n[l])
      e[l] = a ? a(e[l], t[l]) : t[l]
    }
  return e
}
const uu = {
  data: Di,
  props: ki,
  emits: ki,
  methods: Mn,
  computed: Mn,
  beforeCreate: je,
  created: je,
  beforeMount: je,
  mounted: je,
  beforeUpdate: je,
  updated: je,
  beforeDestroy: je,
  beforeUnmount: je,
  destroyed: je,
  unmounted: je,
  activated: je,
  deactivated: je,
  errorCaptured: je,
  serverPrefetch: je,
  components: Mn,
  directives: Mn,
  watch: du,
  provide: Di,
  inject: fu,
}
function Di(e, t) {
  return t
    ? e
      ? function () {
          return He(
            ne(e) ? e.call(this, this) : e,
            ne(t) ? t.call(this, this) : t
          )
        }
      : t
    : e
}
function fu(e, t) {
  return Mn(yr(e), yr(t))
}
function yr(e) {
  if (ee(e)) {
    const t = {}
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n]
    return t
  }
  return e
}
function je(e, t) {
  return e ? [...new Set([].concat(e, t))] : t
}
function Mn(e, t) {
  return e ? He(Object.create(null), e, t) : t
}
function ki(e, t) {
  return e
    ? ee(e) && ee(t)
      ? [...new Set([...e, ...t])]
      : He(Object.create(null), Mi(e), Mi(t ?? {}))
    : t
}
function du(e, t) {
  if (!e) return t
  if (!t) return e
  const n = He(Object.create(null), e)
  for (const s in t) n[s] = je(e[s], t[s])
  return n
}
function zo() {
  return {
    app: null,
    config: {
      isNativeTag: Qa,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  }
}
let pu = 0
function hu(e, t) {
  return function (s, i = null) {
    ne(s) || (s = He({}, s)), i != null && !Te(i) && (i = null)
    const r = zo(),
      l = new WeakSet()
    let a = !1
    const o = (r.app = {
      _uid: pu++,
      _component: s,
      _props: i,
      _container: null,
      _context: r,
      _instance: null,
      version: Hu,
      get config() {
        return r.config
      },
      set config(u) {},
      use(u, ...c) {
        return (
          l.has(u) ||
            (u && ne(u.install)
              ? (l.add(u), u.install(o, ...c))
              : ne(u) && (l.add(u), u(o, ...c))),
          o
        )
      },
      mixin(u) {
        return r.mixins.includes(u) || r.mixins.push(u), o
      },
      component(u, c) {
        return c ? ((r.components[u] = c), o) : r.components[u]
      },
      directive(u, c) {
        return c ? ((r.directives[u] = c), o) : r.directives[u]
      },
      mount(u, c, p) {
        if (!a) {
          const h = be(s, i)
          return (
            (h.appContext = r),
            c && t ? t(h, u) : e(h, u, p),
            (a = !0),
            (o._container = u),
            (u.__vue_app__ = o),
            Bs(h.component) || h.component.proxy
          )
        }
      },
      unmount() {
        a && (e(null, o._container), delete o._container.__vue_app__)
      },
      provide(u, c) {
        return (r.provides[u] = c), o
      },
      runWithContext(u) {
        ys = o
        try {
          return u()
        } finally {
          ys = null
        }
      },
    })
    return o
  }
}
let ys = null
function pn(e, t) {
  if (Fe) {
    let n = Fe.provides
    const s = Fe.parent && Fe.parent.provides
    s === n && (n = Fe.provides = Object.create(s)), (n[e] = t)
  }
}
function _t(e, t, n = !1) {
  const s = Fe || Be
  if (s || ys) {
    const i = s
      ? s.parent == null
        ? s.vnode.appContext && s.vnode.appContext.provides
        : s.parent.provides
      : ys._context.provides
    if (i && e in i) return i[e]
    if (arguments.length > 1) return n && ne(t) ? t.call(s && s.proxy) : t
  }
}
function mu(e, t, n, s = !1) {
  const i = {},
    r = {}
  gs(r, $s, 1), (e.propsDefaults = Object.create(null)), Yo(e, t, i, r)
  for (const l in e.propsOptions[0]) l in i || (i[l] = void 0)
  n ? (e.props = s ? i : wo(i)) : e.type.props ? (e.props = i) : (e.props = r),
    (e.attrs = r)
}
function gu(e, t, n, s) {
  const {
      props: i,
      attrs: r,
      vnode: { patchFlag: l },
    } = e,
    a = he(i),
    [o] = e.propsOptions
  let u = !1
  if ((s || l > 0) && !(l & 16)) {
    if (l & 8) {
      const c = e.vnode.dynamicProps
      for (let p = 0; p < c.length; p++) {
        let h = c[p]
        if (Rs(e.emitsOptions, h)) continue
        const g = t[h]
        if (o)
          if (fe(r, h)) g !== r[h] && ((r[h] = g), (u = !0))
          else {
            const w = vt(h)
            i[w] = Er(o, a, w, g, e, !1)
          }
        else g !== r[h] && ((r[h] = g), (u = !0))
      }
    }
  } else {
    Yo(e, t, i, r) && (u = !0)
    let c
    for (const p in a)
      (!t || (!fe(t, p) && ((c = nn(p)) === p || !fe(t, c)))) &&
        (o
          ? n &&
            (n[p] !== void 0 || n[c] !== void 0) &&
            (i[p] = Er(o, a, p, void 0, e, !0))
          : delete i[p])
    if (r !== a) for (const p in r) (!t || !fe(t, p)) && (delete r[p], (u = !0))
  }
  u && It(e, "set", "$attrs")
}
function Yo(e, t, n, s) {
  const [i, r] = e.propsOptions
  let l = !1,
    a
  if (t)
    for (let o in t) {
      if (ds(o)) continue
      const u = t[o]
      let c
      i && fe(i, (c = vt(o)))
        ? !r || !r.includes(c)
          ? (n[c] = u)
          : ((a || (a = {}))[c] = u)
        : Rs(e.emitsOptions, o) ||
          ((!(o in s) || u !== s[o]) && ((s[o] = u), (l = !0)))
    }
  if (r) {
    const o = he(n),
      u = a || we
    for (let c = 0; c < r.length; c++) {
      const p = r[c]
      n[p] = Er(i, o, p, u[p], e, !fe(u, p))
    }
  }
  return l
}
function Er(e, t, n, s, i, r) {
  const l = e[n]
  if (l != null) {
    const a = fe(l, "default")
    if (a && s === void 0) {
      const o = l.default
      if (l.type !== Function && !l.skipFactory && ne(o)) {
        const { propsDefaults: u } = i
        n in u ? (s = u[n]) : (_n(i), (s = u[n] = o.call(null, t)), Zt())
      } else s = o
    }
    l[0] && (r && !a ? (s = !1) : l[1] && (s === "" || s === nn(n)) && (s = !0))
  }
  return s
}
function Ko(e, t, n = !1) {
  const s = t.propsCache,
    i = s.get(e)
  if (i) return i
  const r = e.props,
    l = {},
    a = []
  let o = !1
  if (!ne(e)) {
    const c = (p) => {
      o = !0
      const [h, g] = Ko(p, t, !0)
      He(l, h), g && a.push(...g)
    }
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c)
  }
  if (!r && !o) return Te(e) && s.set(e, cn), cn
  if (ee(r))
    for (let c = 0; c < r.length; c++) {
      const p = vt(r[c])
      Fi(p) && (l[p] = we)
    }
  else if (r)
    for (const c in r) {
      const p = vt(c)
      if (Fi(p)) {
        const h = r[c],
          g = (l[p] = ee(h) || ne(h) ? { type: h } : He({}, h))
        if (g) {
          const w = Wi(Boolean, g.type),
            E = Wi(String, g.type)
          ;(g[0] = w > -1),
            (g[1] = E < 0 || w < E),
            (w > -1 || fe(g, "default")) && a.push(p)
        }
      }
    }
  const u = [l, a]
  return Te(e) && s.set(e, u), u
}
function Fi(e) {
  return e[0] !== "$"
}
function $i(e) {
  const t = e && e.toString().match(/^\s*(function|class) (\w+)/)
  return t ? t[2] : e === null ? "null" : ""
}
function Bi(e, t) {
  return $i(e) === $i(t)
}
function Wi(e, t) {
  return ee(t) ? t.findIndex((n) => Bi(n, e)) : ne(t) && Bi(t, e) ? 0 : -1
}
const Xo = (e) => e[0] === "_" || e === "$stable",
  ri = (e) => (ee(e) ? e.map(ht) : [ht(e)]),
  _u = (e, t, n) => {
    if (t._n) return t
    const s = Mt((...i) => ri(t(...i)), n)
    return (s._c = !1), s
  },
  qo = (e, t, n) => {
    const s = e._ctx
    for (const i in e) {
      if (Xo(i)) continue
      const r = e[i]
      if (ne(r)) t[i] = _u(i, r, s)
      else if (r != null) {
        const l = ri(r)
        t[i] = () => l
      }
    }
  },
  Jo = (e, t) => {
    const n = ri(t)
    e.slots.default = () => n
  },
  vu = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._
      n ? ((e.slots = he(t)), gs(t, "_", n)) : qo(t, (e.slots = {}))
    } else (e.slots = {}), t && Jo(e, t)
    gs(e.slots, $s, 1)
  },
  bu = (e, t, n) => {
    const { vnode: s, slots: i } = e
    let r = !0,
      l = we
    if (s.shapeFlag & 32) {
      const a = t._
      a
        ? n && a === 1
          ? (r = !1)
          : (He(i, t), !n && a === 1 && delete i._)
        : ((r = !t.$stable), qo(t, i)),
        (l = t)
    } else t && (Jo(e, t), (l = { default: 1 }))
    if (r) for (const a in i) !Xo(a) && l[a] == null && delete i[a]
  }
function wr(e, t, n, s, i = !1) {
  if (ee(e)) {
    e.forEach((h, g) => wr(h, t && (ee(t) ? t[g] : t), n, s, i))
    return
  }
  if (Rn(s) && !i) return
  const r = s.shapeFlag & 4 ? Bs(s.component) || s.component.proxy : s.el,
    l = i ? null : r,
    { i: a, r: o } = e,
    u = t && t.r,
    c = a.refs === we ? (a.refs = {}) : a.refs,
    p = a.setupState
  if (
    (u != null &&
      u !== o &&
      (Ae(u)
        ? ((c[u] = null), fe(p, u) && (p[u] = null))
        : $e(u) && (u.value = null)),
    ne(o))
  )
    Bt(o, a, 12, [l, c])
  else {
    const h = Ae(o),
      g = $e(o)
    if (h || g) {
      const w = () => {
        if (e.f) {
          const E = h ? (fe(p, o) ? p[o] : c[o]) : o.value
          i
            ? ee(E) && Ur(E, r)
            : ee(E)
            ? E.includes(r) || E.push(r)
            : h
            ? ((c[o] = [r]), fe(p, o) && (p[o] = c[o]))
            : ((o.value = [r]), e.k && (c[e.k] = o.value))
        } else
          h
            ? ((c[o] = l), fe(p, o) && (p[o] = l))
            : g && ((o.value = l), e.k && (c[e.k] = l))
      }
      l ? ((w.id = -1), Xe(w, n)) : w()
    }
  }
}
const Xe = Kc
function yu(e) {
  return Eu(e)
}
function Eu(e, t) {
  const n = dr()
  n.__VUE__ = !0
  const {
      insert: s,
      remove: i,
      patchProp: r,
      createElement: l,
      createText: a,
      createComment: o,
      setText: u,
      setElementText: c,
      parentNode: p,
      nextSibling: h,
      setScopeId: g = at,
      insertStaticContent: w,
    } = e,
    E = (
      v,
      f,
      d,
      _ = null,
      I = null,
      L = null,
      R = !1,
      $ = null,
      B = !!f.dynamicChildren
    ) => {
      if (v === f) return
      v && !Ln(v, f) && ((_ = N(v)), Pe(v, I, L, !0), (v = null)),
        f.patchFlag === -2 && ((B = !1), (f.dynamicChildren = null))
      const { type: k, ref: q, shapeFlag: H } = f
      switch (k) {
        case es:
          T(v, f, d, _)
          break
        case Vt:
          m(v, f, d, _)
          break
        case Ks:
          v == null && y(f, d, _, R)
          break
        case ke:
          X(v, f, d, _, I, L, R, $, B)
          break
        default:
          H & 1
            ? x(v, f, d, _, I, L, R, $, B)
            : H & 6
            ? z(v, f, d, _, I, L, R, $, B)
            : (H & 64 || H & 128) && k.process(v, f, d, _, I, L, R, $, B, W)
      }
      q != null && I && wr(q, v && v.ref, L, f || v, !f)
    },
    T = (v, f, d, _) => {
      if (v == null) s((f.el = a(f.children)), d, _)
      else {
        const I = (f.el = v.el)
        f.children !== v.children && u(I, f.children)
      }
    },
    m = (v, f, d, _) => {
      v == null ? s((f.el = o(f.children || "")), d, _) : (f.el = v.el)
    },
    y = (v, f, d, _) => {
      ;[v.el, v.anchor] = w(v.children, f, d, _, v.el, v.anchor)
    },
    S = ({ el: v, anchor: f }, d, _) => {
      let I
      for (; v && v !== f; ) (I = h(v)), s(v, d, _), (v = I)
      s(f, d, _)
    },
    b = ({ el: v, anchor: f }) => {
      let d
      for (; v && v !== f; ) (d = h(v)), i(v), (v = d)
      i(f)
    },
    x = (v, f, d, _, I, L, R, $, B) => {
      ;(R = R || f.type === "svg"),
        v == null ? A(f, d, _, I, L, R, $, B) : D(v, f, I, L, R, $, B)
    },
    A = (v, f, d, _, I, L, R, $) => {
      let B, k
      const { type: q, props: H, shapeFlag: P, transition: O, dirs: K } = v
      if (
        ((B = v.el = l(v.type, L, H && H.is, H)),
        P & 8
          ? c(B, v.children)
          : P & 16 &&
            V(v.children, B, null, _, I, L && q !== "foreignObject", R, $),
        K && zt(v, null, _, "created"),
        M(B, v, v.scopeId, R, _),
        H)
      ) {
        for (const ce in H)
          ce !== "value" &&
            !ds(ce) &&
            r(B, ce, null, H[ce], L, v.children, _, I, Ce)
        "value" in H && r(B, "value", null, H.value),
          (k = H.onVnodeBeforeMount) && dt(k, _, v)
      }
      K && zt(v, null, _, "beforeMount")
      const Z = wu(I, O)
      Z && O.beforeEnter(B),
        s(B, f, d),
        ((k = H && H.onVnodeMounted) || Z || K) &&
          Xe(() => {
            k && dt(k, _, v), Z && O.enter(B), K && zt(v, null, _, "mounted")
          }, I)
    },
    M = (v, f, d, _, I) => {
      if ((d && g(v, d), _)) for (let L = 0; L < _.length; L++) g(v, _[L])
      if (I) {
        let L = I.subTree
        if (f === L) {
          const R = I.vnode
          M(v, R, R.scopeId, R.slotScopeIds, I.parent)
        }
      }
    },
    V = (v, f, d, _, I, L, R, $, B = 0) => {
      for (let k = B; k < v.length; k++) {
        const q = (v[k] = $ ? Rt(v[k]) : ht(v[k]))
        E(null, q, f, d, _, I, L, R, $)
      }
    },
    D = (v, f, d, _, I, L, R) => {
      const $ = (f.el = v.el)
      let { patchFlag: B, dynamicChildren: k, dirs: q } = f
      B |= v.patchFlag & 16
      const H = v.props || we,
        P = f.props || we
      let O
      d && Yt(d, !1),
        (O = P.onVnodeBeforeUpdate) && dt(O, d, f, v),
        q && zt(f, v, d, "beforeUpdate"),
        d && Yt(d, !0)
      const K = I && f.type !== "foreignObject"
      if (
        (k
          ? F(v.dynamicChildren, k, $, d, _, K, L)
          : R || se(v, f, $, null, d, _, K, L, !1),
        B > 0)
      ) {
        if (B & 16) j($, f, H, P, d, _, I)
        else if (
          (B & 2 && H.class !== P.class && r($, "class", null, P.class, I),
          B & 4 && r($, "style", H.style, P.style, I),
          B & 8)
        ) {
          const Z = f.dynamicProps
          for (let ce = 0; ce < Z.length; ce++) {
            const Ee = Z[ce],
              De = H[Ee],
              Lt = P[Ee]
            ;(Lt !== De || Ee === "value") &&
              r($, Ee, De, Lt, I, v.children, d, _, Ce)
          }
        }
        B & 1 && v.children !== f.children && c($, f.children)
      } else !R && k == null && j($, f, H, P, d, _, I)
      ;((O = P.onVnodeUpdated) || q) &&
        Xe(() => {
          O && dt(O, d, f, v), q && zt(f, v, d, "updated")
        }, _)
    },
    F = (v, f, d, _, I, L, R) => {
      for (let $ = 0; $ < f.length; $++) {
        const B = v[$],
          k = f[$],
          q =
            B.el && (B.type === ke || !Ln(B, k) || B.shapeFlag & 70)
              ? p(B.el)
              : d
        E(B, k, q, null, _, I, L, R, !0)
      }
    },
    j = (v, f, d, _, I, L, R) => {
      if (d !== _) {
        if (d !== we)
          for (const $ in d)
            !ds($) && !($ in _) && r(v, $, d[$], null, R, f.children, I, L, Ce)
        for (const $ in _) {
          if (ds($)) continue
          const B = _[$],
            k = d[$]
          B !== k && $ !== "value" && r(v, $, k, B, R, f.children, I, L, Ce)
        }
        "value" in _ && r(v, "value", d.value, _.value)
      }
    },
    X = (v, f, d, _, I, L, R, $, B) => {
      const k = (f.el = v ? v.el : a("")),
        q = (f.anchor = v ? v.anchor : a(""))
      let { patchFlag: H, dynamicChildren: P, slotScopeIds: O } = f
      O && ($ = $ ? $.concat(O) : O),
        v == null
          ? (s(k, d, _), s(q, d, _), V(f.children, d, q, I, L, R, $, B))
          : H > 0 && H & 64 && P && v.dynamicChildren
          ? (F(v.dynamicChildren, P, d, I, L, R, $),
            (f.key != null || (I && f === I.subTree)) && Qo(v, f, !0))
          : se(v, f, d, q, I, L, R, $, B)
    },
    z = (v, f, d, _, I, L, R, $, B) => {
      ;(f.slotScopeIds = $),
        v == null
          ? f.shapeFlag & 512
            ? I.ctx.activate(f, d, _, R, B)
            : pe(f, d, _, I, L, R, B)
          : ve(v, f, B)
    },
    pe = (v, f, d, _, I, L, R) => {
      const $ = (v.component = Au(v, _, I))
      if (($o(v) && ($.ctx.renderer = W), Mu($), $.asyncDep)) {
        if ((I && I.registerDep($, ie), !v.el)) {
          const B = ($.subTree = be(Vt))
          m(null, B, f, d)
        }
        return
      }
      ie($, v, f, d, I, L, R)
    },
    ve = (v, f, d) => {
      const _ = (f.component = v.component)
      if (jc(v, f, d))
        if (_.asyncDep && !_.asyncResolved) {
          ae(_, f, d)
          return
        } else (_.next = f), Bc(_.update), _.update()
      else (f.el = v.el), (_.vnode = f)
    },
    ie = (v, f, d, _, I, L, R) => {
      const $ = () => {
          if (v.isMounted) {
            let { next: q, bu: H, u: P, parent: O, vnode: K } = v,
              Z = q,
              ce
            Yt(v, !1),
              q ? ((q.el = K.el), ae(v, q, R)) : (q = K),
              H && ps(H),
              (ce = q.props && q.props.onVnodeBeforeUpdate) && dt(ce, O, q, K),
              Yt(v, !0)
            const Ee = zs(v),
              De = v.subTree
            ;(v.subTree = Ee),
              E(De, Ee, p(De.el), N(De), v, I, L),
              (q.el = Ee.el),
              Z === null && zc(v, Ee.el),
              P && Xe(P, I),
              (ce = q.props && q.props.onVnodeUpdated) &&
                Xe(() => dt(ce, O, q, K), I)
          } else {
            let q
            const { el: H, props: P } = f,
              { bm: O, m: K, parent: Z } = v,
              ce = Rn(f)
            if (
              (Yt(v, !1),
              O && ps(O),
              !ce && (q = P && P.onVnodeBeforeMount) && dt(q, Z, f),
              Yt(v, !0),
              H && le)
            ) {
              const Ee = () => {
                ;(v.subTree = zs(v)), le(H, v.subTree, v, I, null)
              }
              ce
                ? f.type.__asyncLoader().then(() => !v.isUnmounted && Ee())
                : Ee()
            } else {
              const Ee = (v.subTree = zs(v))
              E(null, Ee, d, _, v, I, L), (f.el = Ee.el)
            }
            if ((K && Xe(K, I), !ce && (q = P && P.onVnodeMounted))) {
              const Ee = f
              Xe(() => dt(q, Z, Ee), I)
            }
            ;(f.shapeFlag & 256 ||
              (Z && Rn(Z.vnode) && Z.vnode.shapeFlag & 256)) &&
              v.a &&
              Xe(v.a, I),
              (v.isMounted = !0),
              (f = d = _ = null)
          }
        },
        B = (v.effect = new zr($, () => Zr(k), v.scope)),
        k = (v.update = () => B.run())
      ;(k.id = v.uid), Yt(v, !0), k()
    },
    ae = (v, f, d) => {
      f.component = v
      const _ = v.vnode.props
      ;(v.vnode = f),
        (v.next = null),
        gu(v, f.props, _, d),
        bu(v, f.children, d),
        Sn(),
        Oi(),
        Tn()
    },
    se = (v, f, d, _, I, L, R, $, B = !1) => {
      const k = v && v.children,
        q = v ? v.shapeFlag : 0,
        H = f.children,
        { patchFlag: P, shapeFlag: O } = f
      if (P > 0) {
        if (P & 128) {
          Me(k, H, d, _, I, L, R, $, B)
          return
        } else if (P & 256) {
          ye(k, H, d, _, I, L, R, $, B)
          return
        }
      }
      O & 8
        ? (q & 16 && Ce(k, I, L), H !== k && c(d, H))
        : q & 16
        ? O & 16
          ? Me(k, H, d, _, I, L, R, $, B)
          : Ce(k, I, L, !0)
        : (q & 8 && c(d, ""), O & 16 && V(H, d, _, I, L, R, $, B))
    },
    ye = (v, f, d, _, I, L, R, $, B) => {
      ;(v = v || cn), (f = f || cn)
      const k = v.length,
        q = f.length,
        H = Math.min(k, q)
      let P
      for (P = 0; P < H; P++) {
        const O = (f[P] = B ? Rt(f[P]) : ht(f[P]))
        E(v[P], O, d, null, I, L, R, $, B)
      }
      k > q ? Ce(v, I, L, !0, !1, H) : V(f, d, _, I, L, R, $, B, H)
    },
    Me = (v, f, d, _, I, L, R, $, B) => {
      let k = 0
      const q = f.length
      let H = v.length - 1,
        P = q - 1
      for (; k <= H && k <= P; ) {
        const O = v[k],
          K = (f[k] = B ? Rt(f[k]) : ht(f[k]))
        if (Ln(O, K)) E(O, K, d, null, I, L, R, $, B)
        else break
        k++
      }
      for (; k <= H && k <= P; ) {
        const O = v[H],
          K = (f[P] = B ? Rt(f[P]) : ht(f[P]))
        if (Ln(O, K)) E(O, K, d, null, I, L, R, $, B)
        else break
        H--, P--
      }
      if (k > H) {
        if (k <= P) {
          const O = P + 1,
            K = O < q ? f[O].el : _
          for (; k <= P; )
            E(null, (f[k] = B ? Rt(f[k]) : ht(f[k])), d, K, I, L, R, $, B), k++
        }
      } else if (k > P) for (; k <= H; ) Pe(v[k], I, L, !0), k++
      else {
        const O = k,
          K = k,
          Z = new Map()
        for (k = K; k <= P; k++) {
          const Ze = (f[k] = B ? Rt(f[k]) : ht(f[k]))
          Ze.key != null && Z.set(Ze.key, k)
        }
        let ce,
          Ee = 0
        const De = P - K + 1
        let Lt = !1,
          Gs = 0
        const Cn = new Array(De)
        for (k = 0; k < De; k++) Cn[k] = 0
        for (k = O; k <= H; k++) {
          const Ze = v[k]
          if (Ee >= De) {
            Pe(Ze, I, L, !0)
            continue
          }
          let ft
          if (Ze.key != null) ft = Z.get(Ze.key)
          else
            for (ce = K; ce <= P; ce++)
              if (Cn[ce - K] === 0 && Ln(Ze, f[ce])) {
                ft = ce
                break
              }
          ft === void 0
            ? Pe(Ze, I, L, !0)
            : ((Cn[ft - K] = k + 1),
              ft >= Gs ? (Gs = ft) : (Lt = !0),
              E(Ze, f[ft], d, null, I, L, R, $, B),
              Ee++)
        }
        const bi = Lt ? Su(Cn) : cn
        for (ce = bi.length - 1, k = De - 1; k >= 0; k--) {
          const Ze = K + k,
            ft = f[Ze],
            yi = Ze + 1 < q ? f[Ze + 1].el : _
          Cn[k] === 0
            ? E(null, ft, d, yi, I, L, R, $, B)
            : Lt && (ce < 0 || k !== bi[ce] ? Re(ft, d, yi, 2) : ce--)
        }
      }
    },
    Re = (v, f, d, _, I = null) => {
      const { el: L, type: R, transition: $, children: B, shapeFlag: k } = v
      if (k & 6) {
        Re(v.component.subTree, f, d, _)
        return
      }
      if (k & 128) {
        v.suspense.move(f, d, _)
        return
      }
      if (k & 64) {
        R.move(v, f, d, W)
        return
      }
      if (R === ke) {
        s(L, f, d)
        for (let H = 0; H < B.length; H++) Re(B[H], f, d, _)
        s(v.anchor, f, d)
        return
      }
      if (R === Ks) {
        S(v, f, d)
        return
      }
      if (_ !== 2 && k & 1 && $)
        if (_ === 0) $.beforeEnter(L), s(L, f, d), Xe(() => $.enter(L), I)
        else {
          const { leave: H, delayLeave: P, afterLeave: O } = $,
            K = () => s(L, f, d),
            Z = () => {
              H(L, () => {
                K(), O && O()
              })
            }
          P ? P(L, K, Z) : Z()
        }
      else s(L, f, d)
    },
    Pe = (v, f, d, _ = !1, I = !1) => {
      const {
        type: L,
        props: R,
        ref: $,
        children: B,
        dynamicChildren: k,
        shapeFlag: q,
        patchFlag: H,
        dirs: P,
      } = v
      if (($ != null && wr($, null, d, v, !0), q & 256)) {
        f.ctx.deactivate(v)
        return
      }
      const O = q & 1 && P,
        K = !Rn(v)
      let Z
      if ((K && (Z = R && R.onVnodeBeforeUnmount) && dt(Z, f, v), q & 6))
        bt(v.component, d, _)
      else {
        if (q & 128) {
          v.suspense.unmount(d, _)
          return
        }
        O && zt(v, null, f, "beforeUnmount"),
          q & 64
            ? v.type.remove(v, f, d, I, W, _)
            : k && (L !== ke || (H > 0 && H & 64))
            ? Ce(k, f, d, !1, !0)
            : ((L === ke && H & 384) || (!I && q & 16)) && Ce(B, f, d),
          _ && st(v)
      }
      ;((K && (Z = R && R.onVnodeUnmounted)) || O) &&
        Xe(() => {
          Z && dt(Z, f, v), O && zt(v, null, f, "unmounted")
        }, d)
    },
    st = (v) => {
      const { type: f, el: d, anchor: _, transition: I } = v
      if (f === ke) {
        Qe(d, _)
        return
      }
      if (f === Ks) {
        b(v)
        return
      }
      const L = () => {
        i(d), I && !I.persisted && I.afterLeave && I.afterLeave()
      }
      if (v.shapeFlag & 1 && I && !I.persisted) {
        const { leave: R, delayLeave: $ } = I,
          B = () => R(d, L)
        $ ? $(v.el, L, B) : B()
      } else L()
    },
    Qe = (v, f) => {
      let d
      for (; v !== f; ) (d = h(v)), i(v), (v = d)
      i(f)
    },
    bt = (v, f, d) => {
      const { bum: _, scope: I, update: L, subTree: R, um: $ } = v
      _ && ps(_),
        I.stop(),
        L && ((L.active = !1), Pe(R, v, f, d)),
        $ && Xe($, f),
        Xe(() => {
          v.isUnmounted = !0
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          v.asyncDep &&
          !v.asyncResolved &&
          v.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve())
    },
    Ce = (v, f, d, _ = !1, I = !1, L = 0) => {
      for (let R = L; R < v.length; R++) Pe(v[R], f, d, _, I)
    },
    N = (v) =>
      v.shapeFlag & 6
        ? N(v.component.subTree)
        : v.shapeFlag & 128
        ? v.suspense.next()
        : h(v.anchor || v.el),
    U = (v, f, d) => {
      v == null
        ? f._vnode && Pe(f._vnode, null, null, !0)
        : E(f._vnode || null, v, f, null, null, null, d),
        Oi(),
        Mo(),
        (f._vnode = v)
    },
    W = {
      p: E,
      um: Pe,
      m: Re,
      r: st,
      mt: pe,
      mc: V,
      pc: se,
      pbc: F,
      n: N,
      o: e,
    }
  let Y, le
  return t && ([Y, le] = t(W)), { render: U, hydrate: Y, createApp: hu(U, Y) }
}
function Yt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n
}
function wu(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted
}
function Qo(e, t, n = !1) {
  const s = e.children,
    i = t.children
  if (ee(s) && ee(i))
    for (let r = 0; r < s.length; r++) {
      const l = s[r]
      let a = i[r]
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = i[r] = Rt(i[r])), (a.el = l.el)),
        n || Qo(l, a)),
        a.type === es && (a.el = l.el)
    }
}
function Su(e) {
  const t = e.slice(),
    n = [0]
  let s, i, r, l, a
  const o = e.length
  for (s = 0; s < o; s++) {
    const u = e[s]
    if (u !== 0) {
      if (((i = n[n.length - 1]), e[i] < u)) {
        ;(t[s] = i), n.push(s)
        continue
      }
      for (r = 0, l = n.length - 1; r < l; )
        (a = (r + l) >> 1), e[n[a]] < u ? (r = a + 1) : (l = a)
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), (n[r] = s))
    }
  }
  for (r = n.length, l = n[r - 1]; r-- > 0; ) (n[r] = l), (l = t[l])
  return n
}
const Tu = (e) => e.__isTeleport,
  ke = Symbol.for("v-fgt"),
  es = Symbol.for("v-txt"),
  Vt = Symbol.for("v-cmt"),
  Ks = Symbol.for("v-stc"),
  kn = []
let ot = null
function Ge(e = !1) {
  kn.push((ot = e ? null : []))
}
function Iu() {
  kn.pop(), (ot = kn[kn.length - 1] || null)
}
let Un = 1
function Hi(e) {
  Un += e
}
function Zo(e) {
  return (
    (e.dynamicChildren = Un > 0 ? ot || cn : null),
    Iu(),
    Un > 0 && ot && ot.push(e),
    e
  )
}
function qe(e, t, n, s, i, r) {
  return Zo(C(e, t, n, s, i, r, !0))
}
function ea(e, t, n, s, i) {
  return Zo(be(e, t, n, s, i, !0))
}
function Es(e) {
  return e ? e.__v_isVNode === !0 : !1
}
function Ln(e, t) {
  return e.type === t.type && e.key === t.key
}
const $s = "__vInternal",
  ta = ({ key: e }) => e ?? null,
  hs = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? Ae(e) || $e(e) || ne(e)
        ? { i: Be, r: e, k: t, f: !!n }
        : e
      : null
  )
function C(
  e,
  t = null,
  n = null,
  s = 0,
  i = null,
  r = e === ke ? 0 : 1,
  l = !1,
  a = !1
) {
  const o = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ta(t),
    ref: t && hs(t),
    scopeId: Ds,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: i,
    dynamicChildren: null,
    appContext: null,
    ctx: Be,
  }
  return (
    a
      ? (ii(o, n), r & 128 && e.normalize(o))
      : n && (o.shapeFlag |= Ae(n) ? 8 : 16),
    Un > 0 &&
      !l &&
      ot &&
      (o.patchFlag > 0 || r & 6) &&
      o.patchFlag !== 32 &&
      ot.push(o),
    o
  )
}
const be = Pu
function Pu(e, t = null, n = null, s = 0, i = null, r = !1) {
  if (((!e || e === ru) && (e = Vt), Es(e))) {
    const a = gn(e, t, !0)
    return (
      n && ii(a, n),
      Un > 0 &&
        !r &&
        ot &&
        (a.shapeFlag & 6 ? (ot[ot.indexOf(e)] = a) : ot.push(a)),
      (a.patchFlag |= -2),
      a
    )
  }
  if (($u(e) && (e = e.__vccOpts), t)) {
    t = Cu(t)
    let { class: a, style: o } = t
    a && !Ae(a) && (t.class = qn(a)),
      Te(o) && (To(o) && !ee(o) && (o = He({}, o)), (t.style = Ve(o)))
  }
  const l = Ae(e) ? 1 : Yc(e) ? 128 : Tu(e) ? 64 : Te(e) ? 4 : ne(e) ? 2 : 0
  return C(e, t, n, s, i, l, r, !0)
}
function Cu(e) {
  return e ? (To(e) || $s in e ? He({}, e) : e) : null
}
function gn(e, t, n = !1) {
  const { props: s, ref: i, patchFlag: r, children: l } = e,
    a = t ? Ou(s || {}, t) : s
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && ta(a),
    ref:
      t && t.ref
        ? n && i
          ? ee(i)
            ? i.concat(hs(t))
            : [i, hs(t)]
          : hs(t)
        : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== ke ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && gn(e.ssContent),
    ssFallback: e.ssFallback && gn(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce,
  }
}
function J(e = " ", t = 0) {
  return be(es, null, e, t)
}
function Lu(e = "", t = !1) {
  return t ? (Ge(), ea(Vt, null, e)) : be(Vt, null, e)
}
function ht(e) {
  return e == null || typeof e == "boolean"
    ? be(Vt)
    : ee(e)
    ? be(ke, null, e.slice())
    : typeof e == "object"
    ? Rt(e)
    : be(es, null, String(e))
}
function Rt(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : gn(e)
}
function ii(e, t) {
  let n = 0
  const { shapeFlag: s } = e
  if (t == null) t = null
  else if (ee(t)) n = 16
  else if (typeof t == "object")
    if (s & 65) {
      const i = t.default
      i && (i._c && (i._d = !1), ii(e, i()), i._c && (i._d = !0))
      return
    } else {
      n = 32
      const i = t._
      !i && !($s in t)
        ? (t._ctx = Be)
        : i === 3 &&
          Be &&
          (Be.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)))
    }
  else
    ne(t)
      ? ((t = { default: t, _ctx: Be }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [J(t)])) : (n = 8))
  ;(e.children = t), (e.shapeFlag |= n)
}
function Ou(...e) {
  const t = {}
  for (let n = 0; n < e.length; n++) {
    const s = e[n]
    for (const i in s)
      if (i === "class")
        t.class !== s.class && (t.class = qn([t.class, s.class]))
      else if (i === "style") t.style = Ve([t.style, s.style])
      else if (Ps(i)) {
        const r = t[i],
          l = s[i]
        l &&
          r !== l &&
          !(ee(r) && r.includes(l)) &&
          (t[i] = r ? [].concat(r, l) : l)
      } else i !== "" && (t[i] = s[i])
  }
  return t
}
function dt(e, t, n, s = null) {
  ct(e, t, 7, [n, s])
}
const xu = zo()
let Nu = 0
function Au(e, t, n) {
  const s = e.type,
    i = (t ? t.appContext : e.appContext) || xu,
    r = {
      uid: Nu++,
      vnode: e,
      type: s,
      parent: t,
      appContext: i,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new uo(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(i.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ko(s, i),
      emitsOptions: Do(s, i),
      emit: null,
      emitted: null,
      propsDefaults: we,
      inheritAttrs: s.inheritAttrs,
      ctx: we,
      data: we,
      props: we,
      attrs: we,
      slots: we,
      refs: we,
      setupState: we,
      setupContext: null,
      attrsProxy: null,
      slotsProxy: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    }
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = Vc.bind(null, r)),
    e.ce && e.ce(r),
    r
  )
}
let Fe = null
const Gn = () => Fe || Be
let li,
  sn,
  Vi = "__VUE_INSTANCE_SETTERS__"
;(sn = dr()[Vi]) || (sn = dr()[Vi] = []),
  sn.push((e) => (Fe = e)),
  (li = (e) => {
    sn.length > 1 ? sn.forEach((t) => t(e)) : sn[0](e)
  })
const _n = (e) => {
    li(e), e.scope.on()
  },
  Zt = () => {
    Fe && Fe.scope.off(), li(null)
  }
function na(e) {
  return e.vnode.shapeFlag & 4
}
let jn = !1
function Mu(e, t = !1) {
  jn = t
  const { props: n, children: s } = e.vnode,
    i = na(e)
  mu(e, n, i, t), vu(e, s)
  const r = i ? Ru(e, t) : void 0
  return (jn = !1), r
}
function Ru(e, t) {
  const n = e.type
  ;(e.accessCache = Object.create(null)), (e.proxy = Io(new Proxy(e.ctx, ou)))
  const { setup: s } = n
  if (s) {
    const i = (e.setupContext = s.length > 1 ? ku(e) : null)
    _n(e), Sn()
    const r = Bt(s, e, 0, [e.props, i])
    if ((Tn(), Zt(), io(r))) {
      if ((r.then(Zt, Zt), t))
        return r
          .then((l) => {
            Ui(e, l, t)
          })
          .catch((l) => {
            Ms(l, e, 0)
          })
      e.asyncDep = r
    } else Ui(e, r, t)
  } else sa(e, t)
}
function Ui(e, t, n) {
  ne(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : Te(t) && (e.setupState = xo(t)),
    sa(e, n)
}
let Gi
function sa(e, t, n) {
  const s = e.type
  if (!e.render) {
    if (!t && Gi && !s.render) {
      const i = s.template || si(e).template
      if (i) {
        const { isCustomElement: r, compilerOptions: l } = e.appContext.config,
          { delimiters: a, compilerOptions: o } = s,
          u = He(He({ isCustomElement: r, delimiters: a }, l), o)
        s.render = Gi(i, u)
      }
    }
    e.render = s.render || at
  }
  {
    _n(e), Sn()
    try {
      au(e)
    } finally {
      Tn(), Zt()
    }
  }
}
function Du(e) {
  return (
    e.attrsProxy ||
    (e.attrsProxy = new Proxy(e.attrs, {
      get(t, n) {
        return Je(e, "get", "$attrs"), t[n]
      },
    }))
  )
}
function ku(e) {
  const t = (n) => {
    e.exposed = n || {}
  }
  return {
    get attrs() {
      return Du(e)
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  }
}
function Bs(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(xo(Io(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n]
          if (n in Dn) return Dn[n](e)
        },
        has(t, n) {
          return n in t || n in Dn
        },
      }))
    )
}
function Fu(e, t = !0) {
  return ne(e) ? e.displayName || e.name : e.name || (t && e.__name)
}
function $u(e) {
  return ne(e) && "__vccOpts" in e
}
const Le = (e, t) => kc(e, t, jn)
function Ye(e, t, n) {
  const s = arguments.length
  return s === 2
    ? Te(t) && !ee(t)
      ? Es(t)
        ? be(e, null, [t])
        : be(e, t)
      : be(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && Es(n) && (n = [n]),
      be(e, t, n))
}
const Bu = Symbol.for("v-scx"),
  Wu = () => _t(Bu),
  Hu = "3.3.7",
  Vu = "http://www.w3.org/2000/svg",
  Xt = typeof document < "u" ? document : null,
  ji = Xt && Xt.createElement("template"),
  Uu = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null)
    },
    remove: (e) => {
      const t = e.parentNode
      t && t.removeChild(e)
    },
    createElement: (e, t, n, s) => {
      const i = t
        ? Xt.createElementNS(Vu, e)
        : Xt.createElement(e, n ? { is: n } : void 0)
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          i.setAttribute("multiple", s.multiple),
        i
      )
    },
    createText: (e) => Xt.createTextNode(e),
    createComment: (e) => Xt.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t
    },
    setElementText: (e, t) => {
      e.textContent = t
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Xt.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "")
    },
    insertStaticContent(e, t, n, s, i, r) {
      const l = n ? n.previousSibling : t.lastChild
      if (i && (i === r || i.nextSibling))
        for (
          ;
          t.insertBefore(i.cloneNode(!0), n),
            !(i === r || !(i = i.nextSibling));

        );
      else {
        ji.innerHTML = s ? `<svg>${e}</svg>` : e
        const a = ji.content
        if (s) {
          const o = a.firstChild
          for (; o.firstChild; ) a.appendChild(o.firstChild)
          a.removeChild(o)
        }
        t.insertBefore(a, n)
      }
      return [
        l ? l.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ]
    },
  },
  Gu = Symbol("_vtc")
function ju(e, t, n) {
  const s = e[Gu]
  s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t)
}
const zu = Symbol("_vod")
function Yu(e, t, n) {
  const s = e.style,
    i = Ae(n)
  if (n && !i) {
    if (t && !Ae(t)) for (const r in t) n[r] == null && Sr(s, r, "")
    for (const r in n) Sr(s, r, n[r])
  } else {
    const r = s.display
    i ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"),
      zu in e && (s.display = r)
  }
}
const zi = /\s*!important$/
function Sr(e, t, n) {
  if (ee(n)) n.forEach((s) => Sr(e, t, s))
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n)
  else {
    const s = Ku(e, t)
    zi.test(n)
      ? e.setProperty(nn(s), n.replace(zi, ""), "important")
      : (e[s] = n)
  }
}
const Yi = ["Webkit", "Moz", "ms"],
  Xs = {}
function Ku(e, t) {
  const n = Xs[t]
  if (n) return n
  let s = vt(t)
  if (s !== "filter" && s in e) return (Xs[t] = s)
  s = xs(s)
  for (let i = 0; i < Yi.length; i++) {
    const r = Yi[i] + s
    if (r in e) return (Xs[t] = r)
  }
  return t
}
const Ki = "http://www.w3.org/1999/xlink"
function Xu(e, t, n, s, i) {
  if (s && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Ki, t.slice(6, t.length))
      : e.setAttributeNS(Ki, t, n)
  else {
    const r = cc(t)
    n == null || (r && !ao(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n)
  }
}
function qu(e, t, n, s, i, r, l) {
  if (t === "innerHTML" || t === "textContent") {
    s && l(s, i, r), (e[t] = n ?? "")
    return
  }
  const a = e.tagName
  if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
    e._value = n
    const u = a === "OPTION" ? e.getAttribute("value") : e.value,
      c = n ?? ""
    u !== c && (e.value = c), n == null && e.removeAttribute(t)
    return
  }
  let o = !1
  if (n === "" || n == null) {
    const u = typeof e[t]
    u === "boolean"
      ? (n = ao(n))
      : n == null && u === "string"
      ? ((n = ""), (o = !0))
      : u === "number" && ((n = 0), (o = !0))
  }
  try {
    e[t] = n
  } catch {}
  o && e.removeAttribute(t)
}
function rn(e, t, n, s) {
  e.addEventListener(t, n, s)
}
function Ju(e, t, n, s) {
  e.removeEventListener(t, n, s)
}
const Xi = Symbol("_vei")
function Qu(e, t, n, s, i = null) {
  const r = e[Xi] || (e[Xi] = {}),
    l = r[t]
  if (s && l) l.value = s
  else {
    const [a, o] = Zu(t)
    if (s) {
      const u = (r[t] = nf(s, i))
      rn(e, a, u, o)
    } else l && (Ju(e, a, l, o), (r[t] = void 0))
  }
}
const qi = /(?:Once|Passive|Capture)$/
function Zu(e) {
  let t
  if (qi.test(e)) {
    t = {}
    let s
    for (; (s = e.match(qi)); )
      (e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0)
  }
  return [e[2] === ":" ? e.slice(3) : nn(e.slice(2)), t]
}
let qs = 0
const ef = Promise.resolve(),
  tf = () => qs || (ef.then(() => (qs = 0)), (qs = Date.now()))
function nf(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now()
    else if (s._vts <= n.attached) return
    ct(sf(s, n.value), t, 5, [s])
  }
  return (n.value = e), (n.attached = tf()), n
}
function sf(e, t) {
  if (ee(t)) {
    const n = e.stopImmediatePropagation
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0)
      }),
      t.map((s) => (i) => !i._stopped && s && s(i))
    )
  } else return t
}
const Ji = /^on[a-z]/,
  rf = (e, t, n, s, i = !1, r, l, a, o) => {
    t === "class"
      ? ju(e, s, i)
      : t === "style"
      ? Yu(e, n, s)
      : Ps(t)
      ? Vr(t) || Qu(e, t, n, s, l)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : lf(e, t, s, i)
        )
      ? qu(e, t, s, r, l, a, o)
      : (t === "true-value"
          ? (e._trueValue = s)
          : t === "false-value" && (e._falseValue = s),
        Xu(e, t, s, i))
  }
function lf(e, t, n, s) {
  return s
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ji.test(t) && ne(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ji.test(t) && Ae(n))
    ? !1
    : t in e
}
const Qi = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1
  return ee(t) ? (n) => ps(t, n) : t
}
function of(e) {
  e.target.composing = !0
}
function Zi(e) {
  const t = e.target
  t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")))
}
const Js = Symbol("_assign"),
  af = {
    created(e, { modifiers: { lazy: t, trim: n, number: s } }, i) {
      e[Js] = Qi(i)
      const r = s || (i.props && i.props.type === "number")
      rn(e, t ? "change" : "input", (l) => {
        if (l.target.composing) return
        let a = e.value
        n && (a = a.trim()), r && (a = fr(a)), e[Js](a)
      }),
        n &&
          rn(e, "change", () => {
            e.value = e.value.trim()
          }),
        t ||
          (rn(e, "compositionstart", of),
          rn(e, "compositionend", Zi),
          rn(e, "change", Zi))
    },
    mounted(e, { value: t }) {
      e.value = t ?? ""
    },
    beforeUpdate(
      e,
      { value: t, modifiers: { lazy: n, trim: s, number: i } },
      r
    ) {
      if (
        ((e[Js] = Qi(r)),
        e.composing ||
          (document.activeElement === e &&
            e.type !== "range" &&
            (n ||
              (s && e.value.trim() === t) ||
              ((i || e.type === "number") && fr(e.value) === t))))
      )
        return
      const l = t ?? ""
      e.value !== l && (e.value = l)
    },
  },
  cf = ["ctrl", "shift", "alt", "meta"],
  uf = {
    stop: (e) => e.stopPropagation(),
    prevent: (e) => e.preventDefault(),
    self: (e) => e.target !== e.currentTarget,
    ctrl: (e) => !e.ctrlKey,
    shift: (e) => !e.shiftKey,
    alt: (e) => !e.altKey,
    meta: (e) => !e.metaKey,
    left: (e) => "button" in e && e.button !== 0,
    middle: (e) => "button" in e && e.button !== 1,
    right: (e) => "button" in e && e.button !== 2,
    exact: (e, t) => cf.some((n) => e[`${n}Key`] && !t.includes(n)),
  },
  ff =
    (e, t) =>
    (n, ...s) => {
      for (let i = 0; i < t.length; i++) {
        const r = uf[t[i]]
        if (r && r(n, t)) return
      }
      return e(n, ...s)
    },
  df = {
    esc: "escape",
    space: " ",
    up: "arrow-up",
    left: "arrow-left",
    right: "arrow-right",
    down: "arrow-down",
    delete: "backspace",
  },
  pf = (e, t) => (n) => {
    if (!("key" in n)) return
    const s = nn(n.key)
    if (t.some((i) => i === s || df[i] === s)) return e(n)
  },
  hf = He({ patchProp: rf }, Uu)
let el
function mf() {
  return el || (el = yu(hf))
}
const gf = (...e) => {
  const t = mf().createApp(...e),
    { mount: n } = t
  return (
    (t.mount = (s) => {
      const i = _f(s)
      if (!i) return
      const r = t._component
      !ne(r) && !r.render && !r.template && (r.template = i.innerHTML),
        (i.innerHTML = "")
      const l = n(i, !1, i instanceof SVGElement)
      return (
        i instanceof Element &&
          (i.removeAttribute("v-cloak"), i.setAttribute("data-v-app", "")),
        l
      )
    }),
    t
  )
}
function _f(e) {
  return Ae(e) ? document.querySelector(e) : e
}
/*!
 * vue-router v4.2.5
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */ const ln = typeof window < "u"
function vf(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module"
}
const me = Object.assign
function Qs(e, t) {
  const n = {}
  for (const s in t) {
    const i = t[s]
    n[s] = ut(i) ? i.map(e) : e(i)
  }
  return n
}
const Fn = () => {},
  ut = Array.isArray,
  bf = /\/$/,
  yf = (e) => e.replace(bf, "")
function Zs(e, t, n = "/") {
  let s,
    i = {},
    r = "",
    l = ""
  const a = t.indexOf("#")
  let o = t.indexOf("?")
  return (
    a < o && a >= 0 && (o = -1),
    o > -1 &&
      ((s = t.slice(0, o)),
      (r = t.slice(o + 1, a > -1 ? a : t.length)),
      (i = e(r))),
    a > -1 && ((s = s || t.slice(0, a)), (l = t.slice(a, t.length))),
    (s = Tf(s ?? t, n)),
    { fullPath: s + (r && "?") + r + l, path: s, query: i, hash: l }
  )
}
function Ef(e, t) {
  const n = t.query ? e(t.query) : ""
  return t.path + (n && "?") + n + (t.hash || "")
}
function tl(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/"
}
function wf(e, t, n) {
  const s = t.matched.length - 1,
    i = n.matched.length - 1
  return (
    s > -1 &&
    s === i &&
    vn(t.matched[s], n.matched[i]) &&
    ra(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  )
}
function vn(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t)
}
function ra(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1
  for (const n in e) if (!Sf(e[n], t[n])) return !1
  return !0
}
function Sf(e, t) {
  return ut(e) ? nl(e, t) : ut(t) ? nl(t, e) : e === t
}
function nl(e, t) {
  return ut(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t
}
function Tf(e, t) {
  if (e.startsWith("/")) return e
  if (!e) return t
  const n = t.split("/"),
    s = e.split("/"),
    i = s[s.length - 1]
  ;(i === ".." || i === ".") && s.push("")
  let r = n.length - 1,
    l,
    a
  for (l = 0; l < s.length; l++)
    if (((a = s[l]), a !== "."))
      if (a === "..") r > 1 && r--
      else break
  return (
    n.slice(0, r).join("/") +
    "/" +
    s.slice(l - (l === s.length ? 1 : 0)).join("/")
  )
}
var zn
;(function (e) {
  ;(e.pop = "pop"), (e.push = "push")
})(zn || (zn = {}))
var $n
;(function (e) {
  ;(e.back = "back"), (e.forward = "forward"), (e.unknown = "")
})($n || ($n = {}))
function If(e) {
  if (!e)
    if (ln) {
      const t = document.querySelector("base")
      ;(e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, ""))
    } else e = "/"
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), yf(e)
}
const Pf = /^[^#]+#/
function Cf(e, t) {
  return e.replace(Pf, "#") + t
}
function Lf(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect()
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  }
}
const Ws = () => ({ left: window.pageXOffset, top: window.pageYOffset })
function Of(e) {
  let t
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      i =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n
    if (!i) return
    t = Lf(i, e)
  } else t = e
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.pageXOffset,
        t.top != null ? t.top : window.pageYOffset
      )
}
function sl(e, t) {
  return (history.state ? history.state.position - t : -1) + e
}
const Tr = new Map()
function xf(e, t) {
  Tr.set(e, t)
}
function Nf(e) {
  const t = Tr.get(e)
  return Tr.delete(e), t
}
let Af = () => location.protocol + "//" + location.host
function ia(e, t) {
  const { pathname: n, search: s, hash: i } = t,
    r = e.indexOf("#")
  if (r > -1) {
    let a = i.includes(e.slice(r)) ? e.slice(r).length : 1,
      o = i.slice(a)
    return o[0] !== "/" && (o = "/" + o), tl(o, "")
  }
  return tl(n, e) + s + i
}
function Mf(e, t, n, s) {
  let i = [],
    r = [],
    l = null
  const a = ({ state: h }) => {
    const g = ia(e, location),
      w = n.value,
      E = t.value
    let T = 0
    if (h) {
      if (((n.value = g), (t.value = h), l && l === w)) {
        l = null
        return
      }
      T = E ? h.position - E.position : 0
    } else s(g)
    i.forEach((m) => {
      m(n.value, w, {
        delta: T,
        type: zn.pop,
        direction: T ? (T > 0 ? $n.forward : $n.back) : $n.unknown,
      })
    })
  }
  function o() {
    l = n.value
  }
  function u(h) {
    i.push(h)
    const g = () => {
      const w = i.indexOf(h)
      w > -1 && i.splice(w, 1)
    }
    return r.push(g), g
  }
  function c() {
    const { history: h } = window
    h.state && h.replaceState(me({}, h.state, { scroll: Ws() }), "")
  }
  function p() {
    for (const h of r) h()
    ;(r = []),
      window.removeEventListener("popstate", a),
      window.removeEventListener("beforeunload", c)
  }
  return (
    window.addEventListener("popstate", a),
    window.addEventListener("beforeunload", c, { passive: !0 }),
    { pauseListeners: o, listen: u, destroy: p }
  )
}
function rl(e, t, n, s = !1, i = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: i ? Ws() : null,
  }
}
function Rf(e) {
  const { history: t, location: n } = window,
    s = { value: ia(e, n) },
    i = { value: t.state }
  i.value ||
    r(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0
    )
  function r(o, u, c) {
    const p = e.indexOf("#"),
      h =
        p > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(p)) + o
          : Af() + e + o
    try {
      t[c ? "replaceState" : "pushState"](u, "", h), (i.value = u)
    } catch (g) {
      console.error(g), n[c ? "replace" : "assign"](h)
    }
  }
  function l(o, u) {
    const c = me({}, t.state, rl(i.value.back, o, i.value.forward, !0), u, {
      position: i.value.position,
    })
    r(o, c, !0), (s.value = o)
  }
  function a(o, u) {
    const c = me({}, i.value, t.state, { forward: o, scroll: Ws() })
    r(c.current, c, !0)
    const p = me({}, rl(s.value, o, null), { position: c.position + 1 }, u)
    r(o, p, !1), (s.value = o)
  }
  return { location: s, state: i, push: a, replace: l }
}
function Df(e) {
  e = If(e)
  const t = Rf(e),
    n = Mf(e, t.state, t.location, t.replace)
  function s(r, l = !0) {
    l || n.pauseListeners(), history.go(r)
  }
  const i = me(
    { location: "", base: e, go: s, createHref: Cf.bind(null, e) },
    t,
    n
  )
  return (
    Object.defineProperty(i, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(i, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    i
  )
}
function kf(e) {
  return typeof e == "string" || (e && typeof e == "object")
}
function la(e) {
  return typeof e == "string" || typeof e == "symbol"
}
const xt = {
    path: "/",
    name: void 0,
    params: {},
    query: {},
    hash: "",
    fullPath: "/",
    matched: [],
    meta: {},
    redirectedFrom: void 0,
  },
  oa = Symbol("")
var il
;(function (e) {
  ;(e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated")
})(il || (il = {}))
function bn(e, t) {
  return me(new Error(), { type: e, [oa]: !0 }, t)
}
function yt(e, t) {
  return e instanceof Error && oa in e && (t == null || !!(e.type & t))
}
const ll = "[^/]+?",
  Ff = { sensitive: !1, strict: !1, start: !0, end: !0 },
  $f = /[.+*?^${}()[\]/\\]/g
function Bf(e, t) {
  const n = me({}, Ff, t),
    s = []
  let i = n.start ? "^" : ""
  const r = []
  for (const u of e) {
    const c = u.length ? [] : [90]
    n.strict && !u.length && (i += "/")
    for (let p = 0; p < u.length; p++) {
      const h = u[p]
      let g = 40 + (n.sensitive ? 0.25 : 0)
      if (h.type === 0)
        p || (i += "/"), (i += h.value.replace($f, "\\$&")), (g += 40)
      else if (h.type === 1) {
        const { value: w, repeatable: E, optional: T, regexp: m } = h
        r.push({ name: w, repeatable: E, optional: T })
        const y = m || ll
        if (y !== ll) {
          g += 10
          try {
            new RegExp(`(${y})`)
          } catch (b) {
            throw new Error(
              `Invalid custom RegExp for param "${w}" (${y}): ` + b.message
            )
          }
        }
        let S = E ? `((?:${y})(?:/(?:${y}))*)` : `(${y})`
        p || (S = T && u.length < 2 ? `(?:/${S})` : "/" + S),
          T && (S += "?"),
          (i += S),
          (g += 20),
          T && (g += -8),
          E && (g += -20),
          y === ".*" && (g += -50)
      }
      c.push(g)
    }
    s.push(c)
  }
  if (n.strict && n.end) {
    const u = s.length - 1
    s[u][s[u].length - 1] += 0.7000000000000001
  }
  n.strict || (i += "/?"), n.end ? (i += "$") : n.strict && (i += "(?:/|$)")
  const l = new RegExp(i, n.sensitive ? "" : "i")
  function a(u) {
    const c = u.match(l),
      p = {}
    if (!c) return null
    for (let h = 1; h < c.length; h++) {
      const g = c[h] || "",
        w = r[h - 1]
      p[w.name] = g && w.repeatable ? g.split("/") : g
    }
    return p
  }
  function o(u) {
    let c = "",
      p = !1
    for (const h of e) {
      ;(!p || !c.endsWith("/")) && (c += "/"), (p = !1)
      for (const g of h)
        if (g.type === 0) c += g.value
        else if (g.type === 1) {
          const { value: w, repeatable: E, optional: T } = g,
            m = w in u ? u[w] : ""
          if (ut(m) && !E)
            throw new Error(
              `Provided param "${w}" is an array but it is not repeatable (* or + modifiers)`
            )
          const y = ut(m) ? m.join("/") : m
          if (!y)
            if (T)
              h.length < 2 &&
                (c.endsWith("/") ? (c = c.slice(0, -1)) : (p = !0))
            else throw new Error(`Missing required param "${w}"`)
          c += y
        }
    }
    return c || "/"
  }
  return { re: l, score: s, keys: r, parse: a, stringify: o }
}
function Wf(e, t) {
  let n = 0
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n]
    if (s) return s
    n++
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 40 + 40
      ? -1
      : 1
    : e.length > t.length
    ? t.length === 1 && t[0] === 40 + 40
      ? 1
      : -1
    : 0
}
function Hf(e, t) {
  let n = 0
  const s = e.score,
    i = t.score
  for (; n < s.length && n < i.length; ) {
    const r = Wf(s[n], i[n])
    if (r) return r
    n++
  }
  if (Math.abs(i.length - s.length) === 1) {
    if (ol(s)) return 1
    if (ol(i)) return -1
  }
  return i.length - s.length
}
function ol(e) {
  const t = e[e.length - 1]
  return e.length > 0 && t[t.length - 1] < 0
}
const Vf = { type: 0, value: "" },
  Uf = /[a-zA-Z0-9_]/
function Gf(e) {
  if (!e) return [[]]
  if (e === "/") return [[Vf]]
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`)
  function t(g) {
    throw new Error(`ERR (${n})/"${u}": ${g}`)
  }
  let n = 0,
    s = n
  const i = []
  let r
  function l() {
    r && i.push(r), (r = [])
  }
  let a = 0,
    o,
    u = "",
    c = ""
  function p() {
    u &&
      (n === 0
        ? r.push({ type: 0, value: u })
        : n === 1 || n === 2 || n === 3
        ? (r.length > 1 &&
            (o === "*" || o === "+") &&
            t(
              `A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`
            ),
          r.push({
            type: 1,
            value: u,
            regexp: c,
            repeatable: o === "*" || o === "+",
            optional: o === "*" || o === "?",
          }))
        : t("Invalid state to consume buffer"),
      (u = ""))
  }
  function h() {
    u += o
  }
  for (; a < e.length; ) {
    if (((o = e[a++]), o === "\\" && n !== 2)) {
      ;(s = n), (n = 4)
      continue
    }
    switch (n) {
      case 0:
        o === "/" ? (u && p(), l()) : o === ":" ? (p(), (n = 1)) : h()
        break
      case 4:
        h(), (n = s)
        break
      case 1:
        o === "("
          ? (n = 2)
          : Uf.test(o)
          ? h()
          : (p(), (n = 0), o !== "*" && o !== "?" && o !== "+" && a--)
        break
      case 2:
        o === ")"
          ? c[c.length - 1] == "\\"
            ? (c = c.slice(0, -1) + o)
            : (n = 3)
          : (c += o)
        break
      case 3:
        p(), (n = 0), o !== "*" && o !== "?" && o !== "+" && a--, (c = "")
        break
      default:
        t("Unknown state")
        break
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), p(), l(), i
}
function jf(e, t, n) {
  const s = Bf(Gf(e.path), n),
    i = me(s, { record: e, parent: t, children: [], alias: [] })
  return t && !i.record.aliasOf == !t.record.aliasOf && t.children.push(i), i
}
function zf(e, t) {
  const n = [],
    s = new Map()
  t = ul({ strict: !1, end: !0, sensitive: !1 }, t)
  function i(c) {
    return s.get(c)
  }
  function r(c, p, h) {
    const g = !h,
      w = Yf(c)
    w.aliasOf = h && h.record
    const E = ul(t, c),
      T = [w]
    if ("alias" in c) {
      const S = typeof c.alias == "string" ? [c.alias] : c.alias
      for (const b of S)
        T.push(
          me({}, w, {
            components: h ? h.record.components : w.components,
            path: b,
            aliasOf: h ? h.record : w,
          })
        )
    }
    let m, y
    for (const S of T) {
      const { path: b } = S
      if (p && b[0] !== "/") {
        const x = p.record.path,
          A = x[x.length - 1] === "/" ? "" : "/"
        S.path = p.record.path + (b && A + b)
      }
      if (
        ((m = jf(S, p, E)),
        h
          ? h.alias.push(m)
          : ((y = y || m),
            y !== m && y.alias.push(m),
            g && c.name && !cl(m) && l(c.name)),
        w.children)
      ) {
        const x = w.children
        for (let A = 0; A < x.length; A++) r(x[A], m, h && h.children[A])
      }
      ;(h = h || m),
        ((m.record.components && Object.keys(m.record.components).length) ||
          m.record.name ||
          m.record.redirect) &&
          o(m)
    }
    return y
      ? () => {
          l(y)
        }
      : Fn
  }
  function l(c) {
    if (la(c)) {
      const p = s.get(c)
      p &&
        (s.delete(c),
        n.splice(n.indexOf(p), 1),
        p.children.forEach(l),
        p.alias.forEach(l))
    } else {
      const p = n.indexOf(c)
      p > -1 &&
        (n.splice(p, 1),
        c.record.name && s.delete(c.record.name),
        c.children.forEach(l),
        c.alias.forEach(l))
    }
  }
  function a() {
    return n
  }
  function o(c) {
    let p = 0
    for (
      ;
      p < n.length &&
      Hf(c, n[p]) >= 0 &&
      (c.record.path !== n[p].record.path || !aa(c, n[p]));

    )
      p++
    n.splice(p, 0, c), c.record.name && !cl(c) && s.set(c.record.name, c)
  }
  function u(c, p) {
    let h,
      g = {},
      w,
      E
    if ("name" in c && c.name) {
      if (((h = s.get(c.name)), !h)) throw bn(1, { location: c })
      ;(E = h.record.name),
        (g = me(
          al(
            p.params,
            h.keys.filter((y) => !y.optional).map((y) => y.name)
          ),
          c.params &&
            al(
              c.params,
              h.keys.map((y) => y.name)
            )
        )),
        (w = h.stringify(g))
    } else if ("path" in c)
      (w = c.path),
        (h = n.find((y) => y.re.test(w))),
        h && ((g = h.parse(w)), (E = h.record.name))
    else {
      if (((h = p.name ? s.get(p.name) : n.find((y) => y.re.test(p.path))), !h))
        throw bn(1, { location: c, currentLocation: p })
      ;(E = h.record.name),
        (g = me({}, p.params, c.params)),
        (w = h.stringify(g))
    }
    const T = []
    let m = h
    for (; m; ) T.unshift(m.record), (m = m.parent)
    return { name: E, path: w, params: g, matched: T, meta: Xf(T) }
  }
  return (
    e.forEach((c) => r(c)),
    {
      addRoute: r,
      resolve: u,
      removeRoute: l,
      getRoutes: a,
      getRecordMatcher: i,
    }
  )
}
function al(e, t) {
  const n = {}
  for (const s of t) s in e && (n[s] = e[s])
  return n
}
function Yf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Kf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  }
}
function Kf(e) {
  const t = {},
    n = e.props || !1
  if ("component" in e) t.default = n
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n
  return t
}
function cl(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0
    e = e.parent
  }
  return !1
}
function Xf(e) {
  return e.reduce((t, n) => me(t, n.meta), {})
}
function ul(e, t) {
  const n = {}
  for (const s in e) n[s] = s in t ? t[s] : e[s]
  return n
}
function aa(e, t) {
  return t.children.some((n) => n === e || aa(e, n))
}
const ca = /#/g,
  qf = /&/g,
  Jf = /\//g,
  Qf = /=/g,
  Zf = /\?/g,
  ua = /\+/g,
  ed = /%5B/g,
  td = /%5D/g,
  fa = /%5E/g,
  nd = /%60/g,
  da = /%7B/g,
  sd = /%7C/g,
  pa = /%7D/g,
  rd = /%20/g
function oi(e) {
  return encodeURI("" + e)
    .replace(sd, "|")
    .replace(ed, "[")
    .replace(td, "]")
}
function id(e) {
  return oi(e).replace(da, "{").replace(pa, "}").replace(fa, "^")
}
function Ir(e) {
  return oi(e)
    .replace(ua, "%2B")
    .replace(rd, "+")
    .replace(ca, "%23")
    .replace(qf, "%26")
    .replace(nd, "`")
    .replace(da, "{")
    .replace(pa, "}")
    .replace(fa, "^")
}
function ld(e) {
  return Ir(e).replace(Qf, "%3D")
}
function od(e) {
  return oi(e).replace(ca, "%23").replace(Zf, "%3F")
}
function ad(e) {
  return e == null ? "" : od(e).replace(Jf, "%2F")
}
function ws(e) {
  try {
    return decodeURIComponent("" + e)
  } catch {}
  return "" + e
}
function cd(e) {
  const t = {}
  if (e === "" || e === "?") return t
  const s = (e[0] === "?" ? e.slice(1) : e).split("&")
  for (let i = 0; i < s.length; ++i) {
    const r = s[i].replace(ua, " "),
      l = r.indexOf("="),
      a = ws(l < 0 ? r : r.slice(0, l)),
      o = l < 0 ? null : ws(r.slice(l + 1))
    if (a in t) {
      let u = t[a]
      ut(u) || (u = t[a] = [u]), u.push(o)
    } else t[a] = o
  }
  return t
}
function fl(e) {
  let t = ""
  for (let n in e) {
    const s = e[n]
    if (((n = ld(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n)
      continue
    }
    ;(ut(s) ? s.map((r) => r && Ir(r)) : [s && Ir(s)]).forEach((r) => {
      r !== void 0 &&
        ((t += (t.length ? "&" : "") + n), r != null && (t += "=" + r))
    })
  }
  return t
}
function ud(e) {
  const t = {}
  for (const n in e) {
    const s = e[n]
    s !== void 0 &&
      (t[n] = ut(s)
        ? s.map((i) => (i == null ? null : "" + i))
        : s == null
        ? s
        : "" + s)
  }
  return t
}
const fd = Symbol(""),
  dl = Symbol(""),
  ai = Symbol(""),
  ha = Symbol(""),
  Pr = Symbol("")
function On() {
  let e = []
  function t(s) {
    return (
      e.push(s),
      () => {
        const i = e.indexOf(s)
        i > -1 && e.splice(i, 1)
      }
    )
  }
  function n() {
    e = []
  }
  return { add: t, list: () => e.slice(), reset: n }
}
function Dt(e, t, n, s, i) {
  const r = s && (s.enterCallbacks[i] = s.enterCallbacks[i] || [])
  return () =>
    new Promise((l, a) => {
      const o = (p) => {
          p === !1
            ? a(bn(4, { from: n, to: t }))
            : p instanceof Error
            ? a(p)
            : kf(p)
            ? a(bn(2, { from: t, to: p }))
            : (r &&
                s.enterCallbacks[i] === r &&
                typeof p == "function" &&
                r.push(p),
              l())
        },
        u = e.call(s && s.instances[i], t, n, o)
      let c = Promise.resolve(u)
      e.length < 3 && (c = c.then(o)), c.catch((p) => a(p))
    })
}
function er(e, t, n, s) {
  const i = []
  for (const r of e)
    for (const l in r.components) {
      let a = r.components[l]
      if (!(t !== "beforeRouteEnter" && !r.instances[l]))
        if (dd(a)) {
          const u = (a.__vccOpts || a)[t]
          u && i.push(Dt(u, n, s, r, l))
        } else {
          let o = a()
          i.push(() =>
            o.then((u) => {
              if (!u)
                return Promise.reject(
                  new Error(`Couldn't resolve component "${l}" at "${r.path}"`)
                )
              const c = vf(u) ? u.default : u
              r.components[l] = c
              const h = (c.__vccOpts || c)[t]
              return h && Dt(h, n, s, r, l)()
            })
          )
        }
    }
  return i
}
function dd(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  )
}
function pl(e) {
  const t = _t(ai),
    n = _t(ha),
    s = Le(() => t.resolve(tt(e.to))),
    i = Le(() => {
      const { matched: o } = s.value,
        { length: u } = o,
        c = o[u - 1],
        p = n.matched
      if (!c || !p.length) return -1
      const h = p.findIndex(vn.bind(null, c))
      if (h > -1) return h
      const g = hl(o[u - 2])
      return u > 1 && hl(c) === g && p[p.length - 1].path !== g
        ? p.findIndex(vn.bind(null, o[u - 2]))
        : h
    }),
    r = Le(() => i.value > -1 && gd(n.params, s.value.params)),
    l = Le(
      () =>
        i.value > -1 &&
        i.value === n.matched.length - 1 &&
        ra(n.params, s.value.params)
    )
  function a(o = {}) {
    return md(o)
      ? t[tt(e.replace) ? "replace" : "push"](tt(e.to)).catch(Fn)
      : Promise.resolve()
  }
  return {
    route: s,
    href: Le(() => s.value.href),
    isActive: r,
    isExactActive: l,
    navigate: a,
  }
}
const pd = Zn({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
    },
    useLink: pl,
    setup(e, { slots: t }) {
      const n = As(pl(e)),
        { options: s } = _t(ai),
        i = Le(() => ({
          [ml(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [ml(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active"
          )]: n.isExactActive,
        }))
      return () => {
        const r = t.default && t.default(n)
        return e.custom
          ? r
          : Ye(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: i.value,
              },
              r
            )
      }
    },
  }),
  hd = pd
function md(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target")
      if (/\b_blank\b/i.test(t)) return
    }
    return e.preventDefault && e.preventDefault(), !0
  }
}
function gd(e, t) {
  for (const n in t) {
    const s = t[n],
      i = e[n]
    if (typeof s == "string") {
      if (s !== i) return !1
    } else if (!ut(i) || i.length !== s.length || s.some((r, l) => r !== i[l]))
      return !1
  }
  return !0
}
function hl(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : ""
}
const ml = (e, t, n) => e ?? t ?? n,
  _d = Zn({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = _t(Pr),
        i = Le(() => e.route || s.value),
        r = _t(dl, 0),
        l = Le(() => {
          let u = tt(r)
          const { matched: c } = i.value
          let p
          for (; (p = c[u]) && !p.components; ) u++
          return u
        }),
        a = Le(() => i.value.matched[l.value])
      pn(
        dl,
        Le(() => l.value + 1)
      ),
        pn(fd, a),
        pn(Pr, i)
      const o = _e()
      return (
        Wt(
          () => [o.value, a.value, e.name],
          ([u, c, p], [h, g, w]) => {
            c &&
              ((c.instances[p] = u),
              g &&
                g !== c &&
                u &&
                u === h &&
                (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards),
                c.updateGuards.size || (c.updateGuards = g.updateGuards))),
              u &&
                c &&
                (!g || !vn(c, g) || !h) &&
                (c.enterCallbacks[p] || []).forEach((E) => E(u))
          },
          { flush: "post" }
        ),
        () => {
          const u = i.value,
            c = e.name,
            p = a.value,
            h = p && p.components[c]
          if (!h) return gl(n.default, { Component: h, route: u })
          const g = p.props[c],
            w = g
              ? g === !0
                ? u.params
                : typeof g == "function"
                ? g(u)
                : g
              : null,
            T = Ye(
              h,
              me({}, w, t, {
                onVnodeUnmounted: (m) => {
                  m.component.isUnmounted && (p.instances[c] = null)
                },
                ref: o,
              })
            )
          return gl(n.default, { Component: T, route: u }) || T
        }
      )
    },
  })
function gl(e, t) {
  if (!e) return null
  const n = e(t)
  return n.length === 1 ? n[0] : n
}
const ma = _d
function vd(e) {
  const t = zf(e.routes, e),
    n = e.parseQuery || cd,
    s = e.stringifyQuery || fl,
    i = e.history,
    r = On(),
    l = On(),
    a = On(),
    o = Lo(xt)
  let u = xt
  ln &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual")
  const c = Qs.bind(null, (N) => "" + N),
    p = Qs.bind(null, ad),
    h = Qs.bind(null, ws)
  function g(N, U) {
    let W, Y
    return (
      la(N) ? ((W = t.getRecordMatcher(N)), (Y = U)) : (Y = N), t.addRoute(Y, W)
    )
  }
  function w(N) {
    const U = t.getRecordMatcher(N)
    U && t.removeRoute(U)
  }
  function E() {
    return t.getRoutes().map((N) => N.record)
  }
  function T(N) {
    return !!t.getRecordMatcher(N)
  }
  function m(N, U) {
    if (((U = me({}, U || o.value)), typeof N == "string")) {
      const d = Zs(n, N, U.path),
        _ = t.resolve({ path: d.path }, U),
        I = i.createHref(d.fullPath)
      return me(d, _, {
        params: h(_.params),
        hash: ws(d.hash),
        redirectedFrom: void 0,
        href: I,
      })
    }
    let W
    if ("path" in N) W = me({}, N, { path: Zs(n, N.path, U.path).path })
    else {
      const d = me({}, N.params)
      for (const _ in d) d[_] == null && delete d[_]
      ;(W = me({}, N, { params: p(d) })), (U.params = p(U.params))
    }
    const Y = t.resolve(W, U),
      le = N.hash || ""
    Y.params = c(h(Y.params))
    const v = Ef(s, me({}, N, { hash: id(le), path: Y.path })),
      f = i.createHref(v)
    return me(
      { fullPath: v, hash: le, query: s === fl ? ud(N.query) : N.query || {} },
      Y,
      { redirectedFrom: void 0, href: f }
    )
  }
  function y(N) {
    return typeof N == "string" ? Zs(n, N, o.value.path) : me({}, N)
  }
  function S(N, U) {
    if (u !== N) return bn(8, { from: U, to: N })
  }
  function b(N) {
    return M(N)
  }
  function x(N) {
    return b(me(y(N), { replace: !0 }))
  }
  function A(N) {
    const U = N.matched[N.matched.length - 1]
    if (U && U.redirect) {
      const { redirect: W } = U
      let Y = typeof W == "function" ? W(N) : W
      return (
        typeof Y == "string" &&
          ((Y = Y.includes("?") || Y.includes("#") ? (Y = y(Y)) : { path: Y }),
          (Y.params = {})),
        me(
          { query: N.query, hash: N.hash, params: "path" in Y ? {} : N.params },
          Y
        )
      )
    }
  }
  function M(N, U) {
    const W = (u = m(N)),
      Y = o.value,
      le = N.state,
      v = N.force,
      f = N.replace === !0,
      d = A(W)
    if (d)
      return M(
        me(y(d), {
          state: typeof d == "object" ? me({}, le, d.state) : le,
          force: v,
          replace: f,
        }),
        U || W
      )
    const _ = W
    _.redirectedFrom = U
    let I
    return (
      !v && wf(s, Y, W) && ((I = bn(16, { to: _, from: Y })), Re(Y, Y, !0, !1)),
      (I ? Promise.resolve(I) : F(_, Y))
        .catch((L) => (yt(L) ? (yt(L, 2) ? L : Me(L)) : se(L, _, Y)))
        .then((L) => {
          if (L) {
            if (yt(L, 2))
              return M(
                me({ replace: f }, y(L.to), {
                  state: typeof L.to == "object" ? me({}, le, L.to.state) : le,
                  force: v,
                }),
                U || _
              )
          } else L = X(_, Y, !0, f, le)
          return j(_, Y, L), L
        })
    )
  }
  function V(N, U) {
    const W = S(N, U)
    return W ? Promise.reject(W) : Promise.resolve()
  }
  function D(N) {
    const U = Qe.values().next().value
    return U && typeof U.runWithContext == "function"
      ? U.runWithContext(N)
      : N()
  }
  function F(N, U) {
    let W
    const [Y, le, v] = bd(N, U)
    W = er(Y.reverse(), "beforeRouteLeave", N, U)
    for (const d of Y)
      d.leaveGuards.forEach((_) => {
        W.push(Dt(_, N, U))
      })
    const f = V.bind(null, N, U)
    return (
      W.push(f),
      Ce(W)
        .then(() => {
          W = []
          for (const d of r.list()) W.push(Dt(d, N, U))
          return W.push(f), Ce(W)
        })
        .then(() => {
          W = er(le, "beforeRouteUpdate", N, U)
          for (const d of le)
            d.updateGuards.forEach((_) => {
              W.push(Dt(_, N, U))
            })
          return W.push(f), Ce(W)
        })
        .then(() => {
          W = []
          for (const d of v)
            if (d.beforeEnter)
              if (ut(d.beforeEnter))
                for (const _ of d.beforeEnter) W.push(Dt(_, N, U))
              else W.push(Dt(d.beforeEnter, N, U))
          return W.push(f), Ce(W)
        })
        .then(
          () => (
            N.matched.forEach((d) => (d.enterCallbacks = {})),
            (W = er(v, "beforeRouteEnter", N, U)),
            W.push(f),
            Ce(W)
          )
        )
        .then(() => {
          W = []
          for (const d of l.list()) W.push(Dt(d, N, U))
          return W.push(f), Ce(W)
        })
        .catch((d) => (yt(d, 8) ? d : Promise.reject(d)))
    )
  }
  function j(N, U, W) {
    a.list().forEach((Y) => D(() => Y(N, U, W)))
  }
  function X(N, U, W, Y, le) {
    const v = S(N, U)
    if (v) return v
    const f = U === xt,
      d = ln ? history.state : {}
    W &&
      (Y || f
        ? i.replace(N.fullPath, me({ scroll: f && d && d.scroll }, le))
        : i.push(N.fullPath, le)),
      (o.value = N),
      Re(N, U, W, f),
      Me()
  }
  let z
  function pe() {
    z ||
      (z = i.listen((N, U, W) => {
        if (!bt.listening) return
        const Y = m(N),
          le = A(Y)
        if (le) {
          M(me(le, { replace: !0 }), Y).catch(Fn)
          return
        }
        u = Y
        const v = o.value
        ln && xf(sl(v.fullPath, W.delta), Ws()),
          F(Y, v)
            .catch((f) =>
              yt(f, 12)
                ? f
                : yt(f, 2)
                ? (M(f.to, Y)
                    .then((d) => {
                      yt(d, 20) && !W.delta && W.type === zn.pop && i.go(-1, !1)
                    })
                    .catch(Fn),
                  Promise.reject())
                : (W.delta && i.go(-W.delta, !1), se(f, Y, v))
            )
            .then((f) => {
              ;(f = f || X(Y, v, !1)),
                f &&
                  (W.delta && !yt(f, 8)
                    ? i.go(-W.delta, !1)
                    : W.type === zn.pop && yt(f, 20) && i.go(-1, !1)),
                j(Y, v, f)
            })
            .catch(Fn)
      }))
  }
  let ve = On(),
    ie = On(),
    ae
  function se(N, U, W) {
    Me(N)
    const Y = ie.list()
    return (
      Y.length ? Y.forEach((le) => le(N, U, W)) : console.error(N),
      Promise.reject(N)
    )
  }
  function ye() {
    return ae && o.value !== xt
      ? Promise.resolve()
      : new Promise((N, U) => {
          ve.add([N, U])
        })
  }
  function Me(N) {
    return (
      ae ||
        ((ae = !N),
        pe(),
        ve.list().forEach(([U, W]) => (N ? W(N) : U())),
        ve.reset()),
      N
    )
  }
  function Re(N, U, W, Y) {
    const { scrollBehavior: le } = e
    if (!ln || !le) return Promise.resolve()
    const v =
      (!W && Nf(sl(N.fullPath, 0))) ||
      ((Y || !W) && history.state && history.state.scroll) ||
      null
    return Qr()
      .then(() => le(N, U, v))
      .then((f) => f && Of(f))
      .catch((f) => se(f, N, U))
  }
  const Pe = (N) => i.go(N)
  let st
  const Qe = new Set(),
    bt = {
      currentRoute: o,
      listening: !0,
      addRoute: g,
      removeRoute: w,
      hasRoute: T,
      getRoutes: E,
      resolve: m,
      options: e,
      push: b,
      replace: x,
      go: Pe,
      back: () => Pe(-1),
      forward: () => Pe(1),
      beforeEach: r.add,
      beforeResolve: l.add,
      afterEach: a.add,
      onError: ie.add,
      isReady: ye,
      install(N) {
        const U = this
        N.component("RouterLink", hd),
          N.component("RouterView", ma),
          (N.config.globalProperties.$router = U),
          Object.defineProperty(N.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => tt(o),
          }),
          ln &&
            !st &&
            o.value === xt &&
            ((st = !0), b(i.location).catch((le) => {}))
        const W = {}
        for (const le in xt)
          Object.defineProperty(W, le, {
            get: () => o.value[le],
            enumerable: !0,
          })
        N.provide(ai, U), N.provide(ha, wo(W)), N.provide(Pr, o)
        const Y = N.unmount
        Qe.add(N),
          (N.unmount = function () {
            Qe.delete(N),
              Qe.size < 1 &&
                ((u = xt),
                z && z(),
                (z = null),
                (o.value = xt),
                (st = !1),
                (ae = !1)),
              Y()
          })
      },
    }
  function Ce(N) {
    return N.reduce((U, W) => U.then(() => D(W)), Promise.resolve())
  }
  return bt
}
function bd(e, t) {
  const n = [],
    s = [],
    i = [],
    r = Math.max(t.matched.length, e.matched.length)
  for (let l = 0; l < r; l++) {
    const a = t.matched[l]
    a && (e.matched.find((u) => vn(u, a)) ? s.push(a) : n.push(a))
    const o = e.matched[l]
    o && (t.matched.find((u) => vn(u, o)) || i.push(o))
  }
  return [n, s, i]
}
const yd = "./assets/logo-no-background-ecf2fed8.png"
const Ct = (e, t) => {
    const n = e.__vccOpts || e
    for (const [s, i] of t) n[s] = i
    return n
  },
  Ed = {
    data() {
      return {
        listItemDisplay: "",
        bg: "rgba(0, 0, 0, 0)",
        isScreenSmall: window.innerWidth <= 750,
      }
    },
    computed: {
      textStyle() {
        return this.$i18n.locale === "en" ? "" : "font-family: Ink Free;"
      },
      langRu() {
        return this.$i18n.locale === "en" ? "" : "text-decoration:underline"
      },
      langEn() {
        return this.$i18n.locale === "en" ? "text-decoration:underline" : ""
      },
    },
    mounted() {
      window.addEventListener("resize", this.handleResize)
    },
    methods: {
      toggleLanguage() {
        this.$i18n.locale = this.$i18n.locale === "en" ? "ru" : "en"
      },
      toggleListItems() {
        this.listItemDisplay === "block" && window.innerWidth <= 750
          ? ((this.listItemDisplay = "none"), (this.bg = "rgba(0, 0, 0, 0)"))
          : ((this.listItemDisplay = "block"), (this.bg = "rgba(0, 0, 0, 0)"))
      },
      handleResize() {
        this.isScreenSmall = window.innerWidth <= 750
      },
    },
    beforeDestroy() {
      window.removeEventListener("resize", this.handleResize)
    },
  },
  ga = (e) => (Jn("data-v-2e42bcfd"), (e = e()), Qn(), e),
  wd = { class: "eldest" },
  Sd = ga(() =>
    C(
      "li",
      { class: "logoInLi" },
      [
        C(
          "a",
          {
            href: "https://www.youtube.com/shorts/Y0sPsL8eShE",
            target: "_blank",
          },
          [C("img", { src: yd, alt: "logo" }), C("div", { class: "shine" })]
        ),
      ],
      -1
    )
  ),
  Td = ga(() => C("div", null, null, -1))
function Id(e, t, n, s, i, r) {
  return (
    Ge(),
    qe(
      ke,
      null,
      [
        C("header", null, [
          C("div", wd, [
            C(
              "ul",
              {
                class: "ulinHeader",
                onClick:
                  t[5] ||
                  (t[5] = (...l) =>
                    r.toggleListItems && r.toggleListItems(...l)),
                style: Ve({ backgroundColor: i.bg }),
              },
              [
                Sd,
                C(
                  "li",
                  { style: Ve({ display: i.listItemDisplay }) },
                  [
                    C(
                      "button",
                      {
                        style: Ve(r.textStyle),
                        onClick:
                          t[0] || (t[0] = (l) => e.$router.push("/main")),
                      },
                      re(e.$t("home")),
                      5
                    ),
                  ],
                  4
                ),
                C(
                  "li",
                  { style: Ve({ display: i.listItemDisplay }) },
                  [
                    C(
                      "button",
                      {
                        style: Ve(r.textStyle),
                        onClick:
                          t[1] || (t[1] = (l) => e.$router.push("/contacts")),
                      },
                      re(e.$t("cont")),
                      5
                    ),
                  ],
                  4
                ),
                C(
                  "li",
                  { style: Ve({ display: i.listItemDisplay }) },
                  [
                    C(
                      "button",
                      {
                        style: Ve(r.textStyle),
                        onClick:
                          t[2] || (t[2] = (l) => e.$router.push("/pins")),
                      },
                      re(e.$t("pins")),
                      5
                    ),
                  ],
                  4
                ),
                C(
                  "li",
                  { style: Ve({ display: i.listItemDisplay }) },
                  [
                    C(
                      "button",
                      {
                        style: Ve(r.textStyle),
                        onClick:
                          t[3] || (t[3] = (l) => e.$router.push("/song")),
                      },
                      re(e.$t("song")),
                      5
                    ),
                  ],
                  4
                ),
                C(
                  "li",
                  { style: Ve({ display: i.listItemDisplay }) },
                  [
                    C(
                      "button",
                      {
                        onClick:
                          t[4] ||
                          (t[4] = (...l) =>
                            r.toggleLanguage && r.toggleLanguage(...l)),
                        style: Ve(r.textStyle),
                      },
                      [
                        C("span", { style: Ve(r.langRu) }, "Ru", 4),
                        J("/"),
                        C("span", { style: Ve(r.langEn) }, "En", 4),
                      ],
                      4
                    ),
                  ],
                  4
                ),
              ],
              4
            ),
          ]),
        ]),
        Td,
      ],
      64
    )
  )
}
const Pd = Ct(Ed, [
  ["render", Id],
  ["__scopeId", "data-v-2e42bcfd"],
])
const Cd = {},
  Ld = { class: "quote" },
  Od = { class: "text" }
function xd(e, t) {
  return (
    Ge(),
    qe("div", Ld, [
      C("div", null, re(e.$t("footer")), 1),
      C("div", Od, re(e.$t("footerau")), 1),
    ])
  )
}
const Nd = Ct(Cd, [
    ["render", xd],
    ["__scopeId", "data-v-a0b2ec12"],
  ]),
  Ad = { class: "wrapper" },
  Md = {
    __name: "App",
    setup(e) {
      return (t, n) => (Ge(), qe("div", Ad, [be(Pd), be(tt(ma)), be(Nd)]))
    },
  },
  Rd = "./assets/agent-955dd902.mp3"
const Dd = {
    setup() {
      const e = _e(""),
        t = _e([])
      return {
        newTask: e,
        tasks: t,
        addTask: () => {
          e.value.trim() !== "" && (t.value.push(e.value), (e.value = ""))
        },
        removeTask: (i) => {
          t.value.splice(i, 1)
        },
      }
    },
  },
  kd = { class: "wrapper" },
  Fd = { class: "slides toDo" },
  $d = { class: "instruction" },
  Bd = { class: "elininst" },
  Wd = { class: "getNote" },
  Hd = { class: "imageList" },
  Vd = {
    style: { "background-color": "rgba(226, 165, 73, 0.685)", padding: "3px" },
  },
  Ud = ["onClick"]
function Gd(e, t, n, s, i, r) {
  return (
    Ge(),
    qe("div", kd, [
      C("div", Fd, [
        C("div", $d, [
          J(re(e.$t("todo")) + " ", 1),
          C("div", Bd, [
            C("div", Wd, [
              qc(
                C(
                  "input",
                  {
                    type: "text",
                    "onUpdate:modelValue":
                      t[0] || (t[0] = (l) => (s.newTask = l)),
                    onKeyup:
                      t[1] ||
                      (t[1] = pf(
                        (...l) => s.addTask && s.addTask(...l),
                        ["enter"]
                      )),
                  },
                  null,
                  544
                ),
                [[af, s.newTask]]
              ),
            ]),
            C(
              "button",
              {
                style: { color: "#a22121" },
                onClick:
                  t[2] || (t[2] = (...l) => s.addTask && s.addTask(...l)),
              },
              re(e.$t("create")),
              1
            ),
          ]),
        ]),
        C("div", Hd, [
          C("h1", Vd, re(e.$t("tasks")), 1),
          C("ul", null, [
            (Ge(!0),
            qe(
              ke,
              null,
              Uo(
                s.tasks,
                (l, a) => (
                  Ge(),
                  qe("li", { key: a }, [
                    C("div", null, re(a + 1 + ") " + l), 1),
                    C(
                      "button",
                      { class: "delete", onClick: (o) => s.removeTask(a) },
                      re(e.$t("delete")),
                      9,
                      Ud
                    ),
                  ])
                )
              ),
              128
            )),
          ]),
        ]),
      ]),
    ])
  )
}
const jd = Ct(Dd, [
  ["render", Gd],
  ["__scopeId", "data-v-140f63b8"],
])
function _l(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  )
}
function ci(e, t) {
  e === void 0 && (e = {}),
    t === void 0 && (t = {}),
    Object.keys(t).forEach((n) => {
      typeof e[n] > "u"
        ? (e[n] = t[n])
        : _l(t[n]) && _l(e[n]) && Object.keys(t[n]).length > 0 && ci(e[n], t[n])
    })
}
const _a = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null
  },
  querySelectorAll() {
    return []
  },
  getElementById() {
    return null
  },
  createEvent() {
    return { initEvent() {} }
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return []
      },
    }
  },
  createElementNS() {
    return {}
  },
  importNode() {
    return null
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
}
function In() {
  const e = typeof document < "u" ? document : {}
  return ci(e, _a), e
}
const zd = {
  document: _a,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return ""
      },
    }
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {}
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0)
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e)
  },
}
function nt() {
  const e = typeof window < "u" ? window : {}
  return ci(e, zd), e
}
function Yd(e) {
  return (
    e === void 0 && (e = ""),
    e
      .trim()
      .split(" ")
      .filter((t) => !!t.trim())
  )
}
function Kd(e) {
  const t = e
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null
    } catch {}
    try {
      delete t[n]
    } catch {}
  })
}
function Cr(e, t) {
  return t === void 0 && (t = 0), setTimeout(e, t)
}
function Ss() {
  return Date.now()
}
function Xd(e) {
  const t = nt()
  let n
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  )
}
function qd(e, t) {
  t === void 0 && (t = "x")
  const n = nt()
  let s, i, r
  const l = Xd(e)
  return (
    n.WebKitCSSMatrix
      ? ((i = l.transform || l.webkitTransform),
        i.split(",").length > 6 &&
          (i = i
            .split(", ")
            .map((a) => a.replace(",", "."))
            .join(", ")),
        (r = new n.WebKitCSSMatrix(i === "none" ? "" : i)))
      : ((r =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (s = r.toString().split(","))),
    t === "x" &&
      (n.WebKitCSSMatrix
        ? (i = r.m41)
        : s.length === 16
        ? (i = parseFloat(s[12]))
        : (i = parseFloat(s[4]))),
    t === "y" &&
      (n.WebKitCSSMatrix
        ? (i = r.m42)
        : s.length === 16
        ? (i = parseFloat(s[13]))
        : (i = parseFloat(s[5]))),
    i || 0
  )
}
function as(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  )
}
function Jd(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11)
}
function et() {
  const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
    t = ["__proto__", "constructor", "prototype"]
  for (let n = 1; n < arguments.length; n += 1) {
    const s = n < 0 || arguments.length <= n ? void 0 : arguments[n]
    if (s != null && !Jd(s)) {
      const i = Object.keys(Object(s)).filter((r) => t.indexOf(r) < 0)
      for (let r = 0, l = i.length; r < l; r += 1) {
        const a = i[r],
          o = Object.getOwnPropertyDescriptor(s, a)
        o !== void 0 &&
          o.enumerable &&
          (as(e[a]) && as(s[a])
            ? s[a].__swiper__
              ? (e[a] = s[a])
              : et(e[a], s[a])
            : !as(e[a]) && as(s[a])
            ? ((e[a] = {}), s[a].__swiper__ ? (e[a] = s[a]) : et(e[a], s[a]))
            : (e[a] = s[a]))
      }
    }
  }
  return e
}
function cs(e, t, n) {
  e.style.setProperty(t, n)
}
function va(e) {
  let { swiper: t, targetPosition: n, side: s } = e
  const i = nt(),
    r = -t.translate
  let l = null,
    a
  const o = t.params.speed
  ;(t.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(t.cssModeFrameID)
  const u = n > r ? "next" : "prev",
    c = (h, g) => (u === "next" && h >= g) || (u === "prev" && h <= g),
    p = () => {
      ;(a = new Date().getTime()), l === null && (l = a)
      const h = Math.max(Math.min((a - l) / o, 1), 0),
        g = 0.5 - Math.cos(h * Math.PI) / 2
      let w = r + g * (n - r)
      if ((c(w, n) && (w = n), t.wrapperEl.scrollTo({ [s]: w }), c(w, n))) {
        ;(t.wrapperEl.style.overflow = "hidden"),
          (t.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            ;(t.wrapperEl.style.overflow = ""), t.wrapperEl.scrollTo({ [s]: w })
          }),
          i.cancelAnimationFrame(t.cssModeFrameID)
        return
      }
      t.cssModeFrameID = i.requestAnimationFrame(p)
    }
  p()
}
function gt(e, t) {
  return t === void 0 && (t = ""), [...e.children].filter((n) => n.matches(t))
}
function Ts(e) {
  try {
    console.warn(e)
    return
  } catch {}
}
function Is(e, t) {
  t === void 0 && (t = [])
  const n = document.createElement(e)
  return n.classList.add(...(Array.isArray(t) ? t : Yd(t))), n
}
function Qd(e, t) {
  const n = []
  for (; e.previousElementSibling; ) {
    const s = e.previousElementSibling
    t ? s.matches(t) && n.push(s) : n.push(s), (e = s)
  }
  return n
}
function Zd(e, t) {
  const n = []
  for (; e.nextElementSibling; ) {
    const s = e.nextElementSibling
    t ? s.matches(t) && n.push(s) : n.push(s), (e = s)
  }
  return n
}
function kt(e, t) {
  return nt().getComputedStyle(e, null).getPropertyValue(t)
}
function vl(e) {
  let t = e,
    n
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; ) t.nodeType === 1 && (n += 1)
    return n
  }
}
function ep(e, t) {
  const n = []
  let s = e.parentElement
  for (; s; ) t ? s.matches(t) && n.push(s) : n.push(s), (s = s.parentElement)
  return n
}
function bl(e, t, n) {
  const s = nt()
  return n
    ? e[t === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          s
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")
        )
    : e.offsetWidth
}
let tr
function tp() {
  const e = nt(),
    t = In()
  return {
    smoothScroll:
      t.documentElement &&
      t.documentElement.style &&
      "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  }
}
function ba() {
  return tr || (tr = tp()), tr
}
let nr
function np(e) {
  let { userAgent: t } = e === void 0 ? {} : e
  const n = ba(),
    s = nt(),
    i = s.navigator.platform,
    r = t || s.navigator.userAgent,
    l = { ios: !1, android: !1 },
    a = s.screen.width,
    o = s.screen.height,
    u = r.match(/(Android);?[\s\/]+([\d.]+)?/)
  let c = r.match(/(iPad).*OS\s([\d_]+)/)
  const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
    h = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    g = i === "Win32"
  let w = i === "MacIntel"
  const E = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ]
  return (
    !c &&
      w &&
      n.touch &&
      E.indexOf(`${a}x${o}`) >= 0 &&
      ((c = r.match(/(Version)\/([\d.]+)/)),
      c || (c = [0, 1, "13_0_0"]),
      (w = !1)),
    u && !g && ((l.os = "android"), (l.android = !0)),
    (c || h || p) && ((l.os = "ios"), (l.ios = !0)),
    l
  )
}
function sp(e) {
  return e === void 0 && (e = {}), nr || (nr = np(e)), nr
}
let sr
function rp() {
  const e = nt()
  let t = !1
  function n() {
    const s = e.navigator.userAgent.toLowerCase()
    return (
      s.indexOf("safari") >= 0 &&
      s.indexOf("chrome") < 0 &&
      s.indexOf("android") < 0
    )
  }
  if (n()) {
    const s = String(e.navigator.userAgent)
    if (s.includes("Version/")) {
      const [i, r] = s
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((l) => Number(l))
      t = i < 16 || (i === 16 && r < 2)
    }
  }
  return {
    isSafari: t || n(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  }
}
function ip() {
  return sr || (sr = rp()), sr
}
function lp(e) {
  let { swiper: t, on: n, emit: s } = e
  const i = nt()
  let r = null,
    l = null
  const a = () => {
      !t || t.destroyed || !t.initialized || (s("beforeResize"), s("resize"))
    },
    o = () => {
      !t ||
        t.destroyed ||
        !t.initialized ||
        ((r = new ResizeObserver((p) => {
          l = i.requestAnimationFrame(() => {
            const { width: h, height: g } = t
            let w = h,
              E = g
            p.forEach((T) => {
              let { contentBoxSize: m, contentRect: y, target: S } = T
              ;(S && S !== t.el) ||
                ((w = y ? y.width : (m[0] || m).inlineSize),
                (E = y ? y.height : (m[0] || m).blockSize))
            }),
              (w !== h || E !== g) && a()
          })
        })),
        r.observe(t.el))
    },
    u = () => {
      l && i.cancelAnimationFrame(l),
        r && r.unobserve && t.el && (r.unobserve(t.el), (r = null))
    },
    c = () => {
      !t || t.destroyed || !t.initialized || s("orientationchange")
    }
  n("init", () => {
    if (t.params.resizeObserver && typeof i.ResizeObserver < "u") {
      o()
      return
    }
    i.addEventListener("resize", a), i.addEventListener("orientationchange", c)
  }),
    n("destroy", () => {
      u(),
        i.removeEventListener("resize", a),
        i.removeEventListener("orientationchange", c)
    })
}
function op(e) {
  let { swiper: t, extendParams: n, on: s, emit: i } = e
  const r = [],
    l = nt(),
    a = function (c, p) {
      p === void 0 && (p = {})
      const h = l.MutationObserver || l.WebkitMutationObserver,
        g = new h((w) => {
          if (t.__preventObserver__) return
          if (w.length === 1) {
            i("observerUpdate", w[0])
            return
          }
          const E = function () {
            i("observerUpdate", w[0])
          }
          l.requestAnimationFrame
            ? l.requestAnimationFrame(E)
            : l.setTimeout(E, 0)
        })
      g.observe(c, {
        attributes: typeof p.attributes > "u" ? !0 : p.attributes,
        childList: typeof p.childList > "u" ? !0 : p.childList,
        characterData: typeof p.characterData > "u" ? !0 : p.characterData,
      }),
        r.push(g)
    },
    o = () => {
      if (t.params.observer) {
        if (t.params.observeParents) {
          const c = ep(t.hostEl)
          for (let p = 0; p < c.length; p += 1) a(c[p])
        }
        a(t.hostEl, { childList: t.params.observeSlideChildren }),
          a(t.wrapperEl, { attributes: !1 })
      }
    },
    u = () => {
      r.forEach((c) => {
        c.disconnect()
      }),
        r.splice(0, r.length)
    }
  n({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    s("init", o),
    s("destroy", u)
}
var ap = {
  on(e, t, n) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != "function") return s
    const i = n ? "unshift" : "push"
    return (
      e.split(" ").forEach((r) => {
        s.eventsListeners[r] || (s.eventsListeners[r] = []),
          s.eventsListeners[r][i](t)
      }),
      s
    )
  },
  once(e, t, n) {
    const s = this
    if (!s.eventsListeners || s.destroyed || typeof t != "function") return s
    function i() {
      s.off(e, i), i.__emitterProxy && delete i.__emitterProxy
      for (var r = arguments.length, l = new Array(r), a = 0; a < r; a++)
        l[a] = arguments[a]
      t.apply(s, l)
    }
    return (i.__emitterProxy = t), s.on(e, i, n)
  },
  onAny(e, t) {
    const n = this
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n
    const s = t ? "unshift" : "push"
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[s](e), n
  },
  offAny(e) {
    const t = this
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t
    const n = t.eventsAnyListeners.indexOf(e)
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t
  },
  off(e, t) {
    const n = this
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(" ").forEach((s) => {
          typeof t > "u"
            ? (n.eventsListeners[s] = [])
            : n.eventsListeners[s] &&
              n.eventsListeners[s].forEach((i, r) => {
                ;(i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                  n.eventsListeners[s].splice(r, 1)
              })
        }),
      n
    )
  },
  emit() {
    const e = this
    if (!e.eventsListeners || e.destroyed || !e.eventsListeners) return e
    let t, n, s
    for (var i = arguments.length, r = new Array(i), l = 0; l < i; l++)
      r[l] = arguments[l]
    return (
      typeof r[0] == "string" || Array.isArray(r[0])
        ? ((t = r[0]), (n = r.slice(1, r.length)), (s = e))
        : ((t = r[0].events), (n = r[0].data), (s = r[0].context || e)),
      n.unshift(s),
      (Array.isArray(t) ? t : t.split(" ")).forEach((o) => {
        e.eventsAnyListeners &&
          e.eventsAnyListeners.length &&
          e.eventsAnyListeners.forEach((u) => {
            u.apply(s, [o, ...n])
          }),
          e.eventsListeners &&
            e.eventsListeners[o] &&
            e.eventsListeners[o].forEach((u) => {
              u.apply(s, n)
            })
      }),
      e
    )
  },
}
function cp() {
  const e = this
  let t, n
  const s = e.el
  typeof e.params.width < "u" && e.params.width !== null
    ? (t = e.params.width)
    : (t = s.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (n = e.params.height)
      : (n = s.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(kt(s, "padding-left") || 0, 10) -
        parseInt(kt(s, "padding-right") || 0, 10)),
      (n =
        n -
        parseInt(kt(s, "padding-top") || 0, 10) -
        parseInt(kt(s, "padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, { width: t, height: n, size: e.isHorizontal() ? t : n }))
}
function up() {
  const e = this
  function t(F, j) {
    return parseFloat(F.getPropertyValue(e.getDirectionLabel(j)) || 0)
  }
  const n = e.params,
    { wrapperEl: s, slidesEl: i, size: r, rtlTranslate: l, wrongRTL: a } = e,
    o = e.virtual && n.virtual.enabled,
    u = o ? e.virtual.slides.length : e.slides.length,
    c = gt(i, `.${e.params.slideClass}, swiper-slide`),
    p = o ? e.virtual.slides.length : c.length
  let h = []
  const g = [],
    w = []
  let E = n.slidesOffsetBefore
  typeof E == "function" && (E = n.slidesOffsetBefore.call(e))
  let T = n.slidesOffsetAfter
  typeof T == "function" && (T = n.slidesOffsetAfter.call(e))
  const m = e.snapGrid.length,
    y = e.slidesGrid.length
  let S = n.spaceBetween,
    b = -E,
    x = 0,
    A = 0
  if (typeof r > "u") return
  typeof S == "string" && S.indexOf("%") >= 0
    ? (S = (parseFloat(S.replace("%", "")) / 100) * r)
    : typeof S == "string" && (S = parseFloat(S)),
    (e.virtualSize = -S),
    c.forEach((F) => {
      l ? (F.style.marginLeft = "") : (F.style.marginRight = ""),
        (F.style.marginBottom = ""),
        (F.style.marginTop = "")
    }),
    n.centeredSlides &&
      n.cssMode &&
      (cs(s, "--swiper-centered-offset-before", ""),
      cs(s, "--swiper-centered-offset-after", ""))
  const M = n.grid && n.grid.rows > 1 && e.grid
  M ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides()
  let V
  const D =
    n.slidesPerView === "auto" &&
    n.breakpoints &&
    Object.keys(n.breakpoints).filter(
      (F) => typeof n.breakpoints[F].slidesPerView < "u"
    ).length > 0
  for (let F = 0; F < p; F += 1) {
    V = 0
    let j
    if (
      (c[F] && (j = c[F]),
      M && e.grid.updateSlide(F, j, c),
      !(c[F] && kt(j, "display") === "none"))
    ) {
      if (n.slidesPerView === "auto") {
        D && (c[F].style[e.getDirectionLabel("width")] = "")
        const X = getComputedStyle(j),
          z = j.style.transform,
          pe = j.style.webkitTransform
        if (
          (z && (j.style.transform = "none"),
          pe && (j.style.webkitTransform = "none"),
          n.roundLengths)
        )
          V = e.isHorizontal() ? bl(j, "width", !0) : bl(j, "height", !0)
        else {
          const ve = t(X, "width"),
            ie = t(X, "padding-left"),
            ae = t(X, "padding-right"),
            se = t(X, "margin-left"),
            ye = t(X, "margin-right"),
            Me = X.getPropertyValue("box-sizing")
          if (Me && Me === "border-box") V = ve + se + ye
          else {
            const { clientWidth: Re, offsetWidth: Pe } = j
            V = ve + ie + ae + se + ye + (Pe - Re)
          }
        }
        z && (j.style.transform = z),
          pe && (j.style.webkitTransform = pe),
          n.roundLengths && (V = Math.floor(V))
      } else
        (V = (r - (n.slidesPerView - 1) * S) / n.slidesPerView),
          n.roundLengths && (V = Math.floor(V)),
          c[F] && (c[F].style[e.getDirectionLabel("width")] = `${V}px`)
      c[F] && (c[F].swiperSlideSize = V),
        w.push(V),
        n.centeredSlides
          ? ((b = b + V / 2 + x / 2 + S),
            x === 0 && F !== 0 && (b = b - r / 2 - S),
            F === 0 && (b = b - r / 2 - S),
            Math.abs(b) < 1 / 1e3 && (b = 0),
            n.roundLengths && (b = Math.floor(b)),
            A % n.slidesPerGroup === 0 && h.push(b),
            g.push(b))
          : (n.roundLengths && (b = Math.floor(b)),
            (A - Math.min(e.params.slidesPerGroupSkip, A)) %
              e.params.slidesPerGroup ===
              0 && h.push(b),
            g.push(b),
            (b = b + V + S)),
        (e.virtualSize += V + S),
        (x = V),
        (A += 1)
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, r) + T),
    l &&
      a &&
      (n.effect === "slide" || n.effect === "coverflow") &&
      (s.style.width = `${e.virtualSize + S}px`),
    n.setWrapperSize &&
      (s.style[e.getDirectionLabel("width")] = `${e.virtualSize + S}px`),
    M && e.grid.updateWrapperSize(V, h),
    !n.centeredSlides)
  ) {
    const F = []
    for (let j = 0; j < h.length; j += 1) {
      let X = h[j]
      n.roundLengths && (X = Math.floor(X)),
        h[j] <= e.virtualSize - r && F.push(X)
    }
    ;(h = F),
      Math.floor(e.virtualSize - r) - Math.floor(h[h.length - 1]) > 1 &&
        h.push(e.virtualSize - r)
  }
  if (o && n.loop) {
    const F = w[0] + S
    if (n.slidesPerGroup > 1) {
      const j = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / n.slidesPerGroup
        ),
        X = F * n.slidesPerGroup
      for (let z = 0; z < j; z += 1) h.push(h[h.length - 1] + X)
    }
    for (let j = 0; j < e.virtual.slidesBefore + e.virtual.slidesAfter; j += 1)
      n.slidesPerGroup === 1 && h.push(h[h.length - 1] + F),
        g.push(g[g.length - 1] + F),
        (e.virtualSize += F)
  }
  if ((h.length === 0 && (h = [0]), S !== 0)) {
    const F =
      e.isHorizontal() && l ? "marginLeft" : e.getDirectionLabel("marginRight")
    c.filter((j, X) =>
      !n.cssMode || n.loop ? !0 : X !== c.length - 1
    ).forEach((j) => {
      j.style[F] = `${S}px`
    })
  }
  if (n.centeredSlides && n.centeredSlidesBounds) {
    let F = 0
    w.forEach((X) => {
      F += X + (S || 0)
    }),
      (F -= S)
    const j = F - r
    h = h.map((X) => (X <= 0 ? -E : X > j ? j + T : X))
  }
  if (n.centerInsufficientSlides) {
    let F = 0
    if (
      (w.forEach((j) => {
        F += j + (S || 0)
      }),
      (F -= S),
      F < r)
    ) {
      const j = (r - F) / 2
      h.forEach((X, z) => {
        h[z] = X - j
      }),
        g.forEach((X, z) => {
          g[z] = X + j
        })
    }
  }
  if (
    (Object.assign(e, {
      slides: c,
      snapGrid: h,
      slidesGrid: g,
      slidesSizesGrid: w,
    }),
    n.centeredSlides && n.cssMode && !n.centeredSlidesBounds)
  ) {
    cs(s, "--swiper-centered-offset-before", `${-h[0]}px`),
      cs(
        s,
        "--swiper-centered-offset-after",
        `${e.size / 2 - w[w.length - 1] / 2}px`
      )
    const F = -e.snapGrid[0],
      j = -e.slidesGrid[0]
    ;(e.snapGrid = e.snapGrid.map((X) => X + F)),
      (e.slidesGrid = e.slidesGrid.map((X) => X + j))
  }
  if (
    (p !== u && e.emit("slidesLengthChange"),
    h.length !== m &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    g.length !== y && e.emit("slidesGridLengthChange"),
    n.watchSlidesProgress && e.updateSlidesOffset(),
    !o && !n.cssMode && (n.effect === "slide" || n.effect === "fade"))
  ) {
    const F = `${n.containerModifierClass}backface-hidden`,
      j = e.el.classList.contains(F)
    p <= n.maxBackfaceHiddenSlides
      ? j || e.el.classList.add(F)
      : j && e.el.classList.remove(F)
  }
}
function fp(e) {
  const t = this,
    n = [],
    s = t.virtual && t.params.virtual.enabled
  let i = 0,
    r
  typeof e == "number"
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed)
  const l = (a) => (s ? t.slides[t.getSlideIndexByData(a)] : t.slides[a])
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        n.push(a)
      })
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const a = t.activeIndex + r
        if (a > t.slides.length && !s) break
        n.push(l(a))
      }
  else n.push(l(t.activeIndex))
  for (r = 0; r < n.length; r += 1)
    if (typeof n[r] < "u") {
      const a = n[r].offsetHeight
      i = a > i ? a : i
    }
  ;(i || i === 0) && (t.wrapperEl.style.height = `${i}px`)
}
function dp() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0
  for (let s = 0; s < t.length; s += 1)
    t[s].swiperSlideOffset =
      (e.isHorizontal() ? t[s].offsetLeft : t[s].offsetTop) -
      n -
      e.cssOverflowAdjustment()
}
function pp(e) {
  e === void 0 && (e = (this && this.translate) || 0)
  const t = this,
    n = t.params,
    { slides: s, rtlTranslate: i, snapGrid: r } = t
  if (s.length === 0) return
  typeof s[0].swiperSlideOffset > "u" && t.updateSlidesOffset()
  let l = -e
  i && (l = e),
    s.forEach((o) => {
      o.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass)
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = [])
  let a = n.spaceBetween
  typeof a == "string" && a.indexOf("%") >= 0
    ? (a = (parseFloat(a.replace("%", "")) / 100) * t.size)
    : typeof a == "string" && (a = parseFloat(a))
  for (let o = 0; o < s.length; o += 1) {
    const u = s[o]
    let c = u.swiperSlideOffset
    n.cssMode && n.centeredSlides && (c -= s[0].swiperSlideOffset)
    const p =
        (l + (n.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      h =
        (l - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - c) /
        (u.swiperSlideSize + a),
      g = -(l - c),
      w = g + t.slidesSizesGrid[o],
      E = g >= 0 && g <= t.size - t.slidesSizesGrid[o]
    ;((g >= 0 && g < t.size - 1) ||
      (w > 1 && w <= t.size) ||
      (g <= 0 && w >= t.size)) &&
      (t.visibleSlides.push(u),
      t.visibleSlidesIndexes.push(o),
      s[o].classList.add(n.slideVisibleClass)),
      E && s[o].classList.add(n.slideFullyVisibleClass),
      (u.progress = i ? -p : p),
      (u.originalProgress = i ? -h : h)
  }
}
function hp(e) {
  const t = this
  if (typeof e > "u") {
    const c = t.rtlTranslate ? -1 : 1
    e = (t && t.translate && t.translate * c) || 0
  }
  const n = t.params,
    s = t.maxTranslate() - t.minTranslate()
  let { progress: i, isBeginning: r, isEnd: l, progressLoop: a } = t
  const o = r,
    u = l
  if (s === 0) (i = 0), (r = !0), (l = !0)
  else {
    i = (e - t.minTranslate()) / s
    const c = Math.abs(e - t.minTranslate()) < 1,
      p = Math.abs(e - t.maxTranslate()) < 1
    ;(r = c || i <= 0), (l = p || i >= 1), c && (i = 0), p && (i = 1)
  }
  if (n.loop) {
    const c = t.getSlideIndexByData(0),
      p = t.getSlideIndexByData(t.slides.length - 1),
      h = t.slidesGrid[c],
      g = t.slidesGrid[p],
      w = t.slidesGrid[t.slidesGrid.length - 1],
      E = Math.abs(e)
    E >= h ? (a = (E - h) / w) : (a = (E + w - g) / w), a > 1 && (a -= 1)
  }
  Object.assign(t, { progress: i, progressLoop: a, isBeginning: r, isEnd: l }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    r && !o && t.emit("reachBeginning toEdge"),
    l && !u && t.emit("reachEnd toEdge"),
    ((o && !r) || (u && !l)) && t.emit("fromEdge"),
    t.emit("progress", i)
}
function mp() {
  const e = this,
    { slides: t, params: n, slidesEl: s, activeIndex: i } = e,
    r = e.virtual && n.virtual.enabled,
    l = e.grid && n.grid && n.grid.rows > 1,
    a = (p) => gt(s, `.${n.slideClass}${p}, swiper-slide${p}`)[0]
  t.forEach((p) => {
    p.classList.remove(n.slideActiveClass, n.slideNextClass, n.slidePrevClass)
  })
  let o, u, c
  if (r)
    if (n.loop) {
      let p = i - e.virtual.slidesBefore
      p < 0 && (p = e.virtual.slides.length + p),
        p >= e.virtual.slides.length && (p -= e.virtual.slides.length),
        (o = a(`[data-swiper-slide-index="${p}"]`))
    } else o = a(`[data-swiper-slide-index="${i}"]`)
  else
    l
      ? ((o = t.filter((p) => p.column === i)[0]),
        (c = t.filter((p) => p.column === i + 1)[0]),
        (u = t.filter((p) => p.column === i - 1)[0]))
      : (o = t[i])
  o &&
    (o.classList.add(n.slideActiveClass),
    l
      ? (c && c.classList.add(n.slideNextClass),
        u && u.classList.add(n.slidePrevClass))
      : ((c = Zd(o, `.${n.slideClass}, swiper-slide`)[0]),
        n.loop && !c && (c = t[0]),
        c && c.classList.add(n.slideNextClass),
        (u = Qd(o, `.${n.slideClass}, swiper-slide`)[0]),
        n.loop && !u === 0 && (u = t[t.length - 1]),
        u && u.classList.add(n.slidePrevClass))),
    e.emitSlidesClasses()
}
const ms = (e, t) => {
    if (!e || e.destroyed || !e.params) return
    const n = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
      s = t.closest(n())
    if (s) {
      let i = s.querySelector(`.${e.params.lazyPreloaderClass}`)
      !i &&
        e.isElement &&
        (s.shadowRoot
          ? (i = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`))
          : requestAnimationFrame(() => {
              s.shadowRoot &&
                ((i = s.shadowRoot.querySelector(
                  `.${e.params.lazyPreloaderClass}`
                )),
                i && i.remove())
            })),
        i && i.remove()
    }
  },
  rr = (e, t) => {
    if (!e.slides[t]) return
    const n = e.slides[t].querySelector('[loading="lazy"]')
    n && n.removeAttribute("loading")
  },
  Lr = (e) => {
    if (!e || e.destroyed || !e.params) return
    let t = e.params.lazyPreloadPrevNext
    const n = e.slides.length
    if (!n || !t || t < 0) return
    t = Math.min(t, n)
    const s =
        e.params.slidesPerView === "auto"
          ? e.slidesPerViewDynamic()
          : Math.ceil(e.params.slidesPerView),
      i = e.activeIndex
    if (e.params.grid && e.params.grid.rows > 1) {
      const l = i,
        a = [l - t]
      a.push(...Array.from({ length: t }).map((o, u) => l + s + u)),
        e.slides.forEach((o, u) => {
          a.includes(o.column) && rr(e, u)
        })
      return
    }
    const r = i + s - 1
    if (e.params.rewind || e.params.loop)
      for (let l = i - t; l <= r + t; l += 1) {
        const a = ((l % n) + n) % n
        ;(a < i || a > r) && rr(e, a)
      }
    else
      for (let l = Math.max(i - t, 0); l <= Math.min(r + t, n - 1); l += 1)
        l !== i && (l > r || l < i) && rr(e, l)
  }
function gp(e) {
  const { slidesGrid: t, params: n } = e,
    s = e.rtlTranslate ? e.translate : -e.translate
  let i
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < "u"
      ? s >= t[r] && s < t[r + 1] - (t[r + 1] - t[r]) / 2
        ? (i = r)
        : s >= t[r] && s < t[r + 1] && (i = r + 1)
      : s >= t[r] && (i = r)
  return n.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i
}
function _p(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: s, params: i, activeIndex: r, realIndex: l, snapIndex: a } = t
  let o = e,
    u
  const c = (g) => {
    let w = g - t.virtual.slidesBefore
    return (
      w < 0 && (w = t.virtual.slides.length + w),
      w >= t.virtual.slides.length && (w -= t.virtual.slides.length),
      w
    )
  }
  if ((typeof o > "u" && (o = gp(t)), s.indexOf(n) >= 0)) u = s.indexOf(n)
  else {
    const g = Math.min(i.slidesPerGroupSkip, o)
    u = g + Math.floor((o - g) / i.slidesPerGroup)
  }
  if ((u >= s.length && (u = s.length - 1), o === r && !t.params.loop)) {
    u !== a && ((t.snapIndex = u), t.emit("snapIndexChange"))
    return
  }
  if (o === r && t.params.loop && t.virtual && t.params.virtual.enabled) {
    t.realIndex = c(o)
    return
  }
  const p = t.grid && i.grid && i.grid.rows > 1
  let h
  if (t.virtual && i.virtual.enabled && i.loop) h = c(o)
  else if (p) {
    const g = t.slides.filter((E) => E.column === o)[0]
    let w = parseInt(g.getAttribute("data-swiper-slide-index"), 10)
    Number.isNaN(w) && (w = Math.max(t.slides.indexOf(g), 0)),
      (h = Math.floor(w / i.grid.rows))
  } else if (t.slides[o]) {
    const g = t.slides[o].getAttribute("data-swiper-slide-index")
    g ? (h = parseInt(g, 10)) : (h = o)
  } else h = o
  Object.assign(t, {
    previousSnapIndex: a,
    snapIndex: u,
    previousRealIndex: l,
    realIndex: h,
    previousIndex: r,
    activeIndex: o,
  }),
    t.initialized && Lr(t),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) &&
      (l !== h && t.emit("realIndexChange"), t.emit("slideChange"))
}
function vp(e, t) {
  const n = this,
    s = n.params
  let i = e.closest(`.${s.slideClass}, swiper-slide`)
  !i &&
    n.isElement &&
    t &&
    t.length > 1 &&
    t.includes(e) &&
    [...t.slice(t.indexOf(e) + 1, t.length)].forEach((a) => {
      !i && a.matches && a.matches(`.${s.slideClass}, swiper-slide`) && (i = a)
    })
  let r = !1,
    l
  if (i) {
    for (let a = 0; a < n.slides.length; a += 1)
      if (n.slides[a] === i) {
        ;(r = !0), (l = a)
        break
      }
  }
  if (i && r)
    (n.clickedSlide = i),
      n.virtual && n.params.virtual.enabled
        ? (n.clickedIndex = parseInt(
            i.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (n.clickedIndex = l)
  else {
    ;(n.clickedSlide = void 0), (n.clickedIndex = void 0)
    return
  }
  s.slideToClickedSlide &&
    n.clickedIndex !== void 0 &&
    n.clickedIndex !== n.activeIndex &&
    n.slideToClickedSlide()
}
var bp = {
  updateSize: cp,
  updateSlides: up,
  updateAutoHeight: fp,
  updateSlidesOffset: dp,
  updateSlidesProgress: pp,
  updateProgress: hp,
  updateSlidesClasses: mp,
  updateActiveIndex: _p,
  updateClickedSlide: vp,
}
function yp(e) {
  e === void 0 && (e = this.isHorizontal() ? "x" : "y")
  const t = this,
    { params: n, rtlTranslate: s, translate: i, wrapperEl: r } = t
  if (n.virtualTranslate) return s ? -i : i
  if (n.cssMode) return i
  let l = qd(r, e)
  return (l += t.cssOverflowAdjustment()), s && (l = -l), l || 0
}
function Ep(e, t) {
  const n = this,
    { rtlTranslate: s, params: i, wrapperEl: r, progress: l } = n
  let a = 0,
    o = 0
  const u = 0
  n.isHorizontal() ? (a = s ? -e : e) : (o = e),
    i.roundLengths && ((a = Math.floor(a)), (o = Math.floor(o))),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? a : o),
    i.cssMode
      ? (r[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
          ? -a
          : -o)
      : i.virtualTranslate ||
        (n.isHorizontal()
          ? (a -= n.cssOverflowAdjustment())
          : (o -= n.cssOverflowAdjustment()),
        (r.style.transform = `translate3d(${a}px, ${o}px, ${u}px)`))
  let c
  const p = n.maxTranslate() - n.minTranslate()
  p === 0 ? (c = 0) : (c = (e - n.minTranslate()) / p),
    c !== l && n.updateProgress(e),
    n.emit("setTranslate", n.translate, t)
}
function wp() {
  return -this.snapGrid[0]
}
function Sp() {
  return -this.snapGrid[this.snapGrid.length - 1]
}
function Tp(e, t, n, s, i) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    s === void 0 && (s = !0)
  const r = this,
    { params: l, wrapperEl: a } = r
  if (r.animating && l.preventInteractionOnTransition) return !1
  const o = r.minTranslate(),
    u = r.maxTranslate()
  let c
  if (
    (s && e > o ? (c = o) : s && e < u ? (c = u) : (c = e),
    r.updateProgress(c),
    l.cssMode)
  ) {
    const p = r.isHorizontal()
    if (t === 0) a[p ? "scrollLeft" : "scrollTop"] = -c
    else {
      if (!r.support.smoothScroll)
        return (
          va({ swiper: r, targetPosition: -c, side: p ? "left" : "top" }), !0
        )
      a.scrollTo({ [p ? "left" : "top"]: -c, behavior: "smooth" })
    }
    return !0
  }
  return (
    t === 0
      ? (r.setTransition(0),
        r.setTranslate(c),
        n && (r.emit("beforeTransitionStart", t, i), r.emit("transitionEnd")))
      : (r.setTransition(t),
        r.setTranslate(c),
        n && (r.emit("beforeTransitionStart", t, i), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (h) {
              !r ||
                r.destroyed ||
                (h.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  n && r.emit("transitionEnd")))
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  )
}
var Ip = {
  getTranslate: yp,
  setTranslate: Ep,
  minTranslate: wp,
  maxTranslate: Sp,
  translateTo: Tp,
}
function Pp(e, t) {
  const n = this
  n.params.cssMode ||
    ((n.wrapperEl.style.transitionDuration = `${e}ms`),
    (n.wrapperEl.style.transitionDelay = e === 0 ? "0ms" : "")),
    n.emit("setTransition", e, t)
}
function ya(e) {
  let { swiper: t, runCallbacks: n, direction: s, step: i } = e
  const { activeIndex: r, previousIndex: l } = t
  let a = s
  if (
    (a || (r > l ? (a = "next") : r < l ? (a = "prev") : (a = "reset")),
    t.emit(`transition${i}`),
    n && r !== l)
  ) {
    if (a === "reset") {
      t.emit(`slideResetTransition${i}`)
      return
    }
    t.emit(`slideChangeTransition${i}`),
      a === "next"
        ? t.emit(`slideNextTransition${i}`)
        : t.emit(`slidePrevTransition${i}`)
  }
}
function Cp(e, t) {
  e === void 0 && (e = !0)
  const n = this,
    { params: s } = n
  s.cssMode ||
    (s.autoHeight && n.updateAutoHeight(),
    ya({ swiper: n, runCallbacks: e, direction: t, step: "Start" }))
}
function Lp(e, t) {
  e === void 0 && (e = !0)
  const n = this,
    { params: s } = n
  ;(n.animating = !1),
    !s.cssMode &&
      (n.setTransition(0),
      ya({ swiper: n, runCallbacks: e, direction: t, step: "End" }))
}
var Op = { setTransition: Pp, transitionStart: Cp, transitionEnd: Lp }
function xp(e, t, n, s, i) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    typeof e == "string" && (e = parseInt(e, 10))
  const r = this
  let l = e
  l < 0 && (l = 0)
  const {
    params: a,
    snapGrid: o,
    slidesGrid: u,
    previousIndex: c,
    activeIndex: p,
    rtlTranslate: h,
    wrapperEl: g,
    enabled: w,
  } = r
  if ((r.animating && a.preventInteractionOnTransition) || (!w && !s && !i))
    return !1
  const E = Math.min(r.params.slidesPerGroupSkip, l)
  let T = E + Math.floor((l - E) / r.params.slidesPerGroup)
  T >= o.length && (T = o.length - 1)
  const m = -o[T]
  if (a.normalizeSlideIndex)
    for (let S = 0; S < u.length; S += 1) {
      const b = -Math.floor(m * 100),
        x = Math.floor(u[S] * 100),
        A = Math.floor(u[S + 1] * 100)
      typeof u[S + 1] < "u"
        ? b >= x && b < A - (A - x) / 2
          ? (l = S)
          : b >= x && b < A && (l = S + 1)
        : b >= x && (l = S)
    }
  if (
    r.initialized &&
    l !== p &&
    ((!r.allowSlideNext &&
      (h
        ? m > r.translate && m > r.minTranslate()
        : m < r.translate && m < r.minTranslate())) ||
      (!r.allowSlidePrev &&
        m > r.translate &&
        m > r.maxTranslate() &&
        (p || 0) !== l))
  )
    return !1
  l !== (c || 0) && n && r.emit("beforeSlideChangeStart"), r.updateProgress(m)
  let y
  if (
    (l > p ? (y = "next") : l < p ? (y = "prev") : (y = "reset"),
    (h && -m === r.translate) || (!h && m === r.translate))
  )
    return (
      r.updateActiveIndex(l),
      a.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      a.effect !== "slide" && r.setTranslate(m),
      y !== "reset" && (r.transitionStart(n, y), r.transitionEnd(n, y)),
      !1
    )
  if (a.cssMode) {
    const S = r.isHorizontal(),
      b = h ? m : -m
    if (t === 0) {
      const x = r.virtual && r.params.virtual.enabled
      x &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        x && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              g[S ? "scrollLeft" : "scrollTop"] = b
            }))
          : (g[S ? "scrollLeft" : "scrollTop"] = b),
        x &&
          requestAnimationFrame(() => {
            ;(r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1)
          })
    } else {
      if (!r.support.smoothScroll)
        return (
          va({ swiper: r, targetPosition: b, side: S ? "left" : "top" }), !0
        )
      g.scrollTo({ [S ? "left" : "top"]: b, behavior: "smooth" })
    }
    return !0
  }
  return (
    r.setTransition(t),
    r.setTranslate(m),
    r.updateActiveIndex(l),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", t, s),
    r.transitionStart(n, y),
    t === 0
      ? r.transitionEnd(n, y)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (b) {
            !r ||
              r.destroyed ||
              (b.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(n, y)))
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  )
}
function Np(e, t, n, s) {
  e === void 0 && (e = 0),
    t === void 0 && (t = this.params.speed),
    n === void 0 && (n = !0),
    typeof e == "string" && (e = parseInt(e, 10))
  const i = this,
    r = i.grid && i.params.grid && i.params.grid.rows > 1
  let l = e
  if (i.params.loop)
    if (i.virtual && i.params.virtual.enabled) l = l + i.virtual.slidesBefore
    else {
      let a
      if (r) {
        const h = l * i.params.grid.rows
        a = i.slides.filter(
          (g) => g.getAttribute("data-swiper-slide-index") * 1 === h
        )[0].column
      } else a = i.getSlideIndexByData(l)
      const o = r
          ? Math.ceil(i.slides.length / i.params.grid.rows)
          : i.slides.length,
        { centeredSlides: u } = i.params
      let c = i.params.slidesPerView
      c === "auto"
        ? (c = i.slidesPerViewDynamic())
        : ((c = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
          u && c % 2 === 0 && (c = c + 1))
      let p = o - a < c
      if ((u && (p = p || a < Math.ceil(c / 2)), p)) {
        const h = u
          ? a < i.activeIndex
            ? "prev"
            : "next"
          : a - i.activeIndex - 1 < i.params.slidesPerView
          ? "next"
          : "prev"
        i.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? a + 1 : a - o + 1,
          slideRealIndex: h === "next" ? i.realIndex : void 0,
        })
      }
      if (r) {
        const h = l * i.params.grid.rows
        l = i.slides.filter(
          (g) => g.getAttribute("data-swiper-slide-index") * 1 === h
        )[0].column
      } else l = i.getSlideIndexByData(l)
    }
  return (
    requestAnimationFrame(() => {
      i.slideTo(l, t, n, s)
    }),
    i
  )
}
function Ap(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this,
    { enabled: i, params: r, animating: l } = s
  if (!i) return s
  let a = r.slidesPerGroup
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (a = Math.max(s.slidesPerViewDynamic("current", !0), 1))
  const o = s.activeIndex < r.slidesPerGroupSkip ? 1 : a,
    u = s.virtual && r.virtual.enabled
  if (r.loop) {
    if (l && !u && r.loopPreventsSliding) return !1
    if (
      (s.loopFix({ direction: "next" }),
      (s._clientLeft = s.wrapperEl.clientLeft),
      s.activeIndex === s.slides.length - 1 && r.cssMode)
    )
      return (
        requestAnimationFrame(() => {
          s.slideTo(s.activeIndex + o, e, t, n)
        }),
        !0
      )
  }
  return r.rewind && s.isEnd
    ? s.slideTo(0, e, t, n)
    : s.slideTo(s.activeIndex + o, e, t, n)
}
function Mp(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this,
    {
      params: i,
      snapGrid: r,
      slidesGrid: l,
      rtlTranslate: a,
      enabled: o,
      animating: u,
    } = s
  if (!o) return s
  const c = s.virtual && i.virtual.enabled
  if (i.loop) {
    if (u && !c && i.loopPreventsSliding) return !1
    s.loopFix({ direction: "prev" }), (s._clientLeft = s.wrapperEl.clientLeft)
  }
  const p = a ? s.translate : -s.translate
  function h(m) {
    return m < 0 ? -Math.floor(Math.abs(m)) : Math.floor(m)
  }
  const g = h(p),
    w = r.map((m) => h(m))
  let E = r[w.indexOf(g) - 1]
  if (typeof E > "u" && i.cssMode) {
    let m
    r.forEach((y, S) => {
      g >= y && (m = S)
    }),
      typeof m < "u" && (E = r[m > 0 ? m - 1 : m])
  }
  let T = 0
  if (
    (typeof E < "u" &&
      ((T = l.indexOf(E)),
      T < 0 && (T = s.activeIndex - 1),
      i.slidesPerView === "auto" &&
        i.slidesPerGroup === 1 &&
        i.slidesPerGroupAuto &&
        ((T = T - s.slidesPerViewDynamic("previous", !0) + 1),
        (T = Math.max(T, 0)))),
    i.rewind && s.isBeginning)
  ) {
    const m =
      s.params.virtual && s.params.virtual.enabled && s.virtual
        ? s.virtual.slides.length - 1
        : s.slides.length - 1
    return s.slideTo(m, e, t, n)
  } else if (i.loop && s.activeIndex === 0 && i.cssMode)
    return (
      requestAnimationFrame(() => {
        s.slideTo(T, e, t, n)
      }),
      !0
    )
  return s.slideTo(T, e, t, n)
}
function Rp(e, t, n) {
  e === void 0 && (e = this.params.speed), t === void 0 && (t = !0)
  const s = this
  return s.slideTo(s.activeIndex, e, t, n)
}
function Dp(e, t, n, s) {
  e === void 0 && (e = this.params.speed),
    t === void 0 && (t = !0),
    s === void 0 && (s = 0.5)
  const i = this
  let r = i.activeIndex
  const l = Math.min(i.params.slidesPerGroupSkip, r),
    a = l + Math.floor((r - l) / i.params.slidesPerGroup),
    o = i.rtlTranslate ? i.translate : -i.translate
  if (o >= i.snapGrid[a]) {
    const u = i.snapGrid[a],
      c = i.snapGrid[a + 1]
    o - u > (c - u) * s && (r += i.params.slidesPerGroup)
  } else {
    const u = i.snapGrid[a - 1],
      c = i.snapGrid[a]
    o - u <= (c - u) * s && (r -= i.params.slidesPerGroup)
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, i.slidesGrid.length - 1)),
    i.slideTo(r, e, t, n)
  )
}
function kp() {
  const e = this,
    { params: t, slidesEl: n } = e,
    s = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView
  let i = e.clickedIndex,
    r
  const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`
  if (t.loop) {
    if (e.animating) return
    ;(r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? i < e.loopedSlides - s / 2 ||
          i > e.slides.length - e.loopedSlides + s / 2
          ? (e.loopFix(),
            (i = e.getSlideIndex(
              gt(n, `${l}[data-swiper-slide-index="${r}"]`)[0]
            )),
            Cr(() => {
              e.slideTo(i)
            }))
          : e.slideTo(i)
        : i > e.slides.length - s
        ? (e.loopFix(),
          (i = e.getSlideIndex(
            gt(n, `${l}[data-swiper-slide-index="${r}"]`)[0]
          )),
          Cr(() => {
            e.slideTo(i)
          }))
        : e.slideTo(i)
  } else e.slideTo(i)
}
var Fp = {
  slideTo: xp,
  slideToLoop: Np,
  slideNext: Ap,
  slidePrev: Mp,
  slideReset: Rp,
  slideToClosest: Dp,
  slideToClickedSlide: kp,
}
function $p(e) {
  const t = this,
    { params: n, slidesEl: s } = t
  if (!n.loop || (t.virtual && t.params.virtual.enabled)) return
  const i = () => {
      gt(s, `.${n.slideClass}, swiper-slide`).forEach((p, h) => {
        p.setAttribute("data-swiper-slide-index", h)
      })
    },
    r = t.grid && n.grid && n.grid.rows > 1,
    l = n.slidesPerGroup * (r ? n.grid.rows : 1),
    a = t.slides.length % l !== 0,
    o = r && t.slides.length % n.grid.rows !== 0,
    u = (c) => {
      for (let p = 0; p < c; p += 1) {
        const h = t.isElement
          ? Is("swiper-slide", [n.slideBlankClass])
          : Is("div", [n.slideClass, n.slideBlankClass])
        t.slidesEl.append(h)
      }
    }
  if (a) {
    if (n.loopAddBlankSlides) {
      const c = l - (t.slides.length % l)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Ts(
        "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      )
    i()
  } else if (o) {
    if (n.loopAddBlankSlides) {
      const c = n.grid.rows - (t.slides.length % n.grid.rows)
      u(c), t.recalcSlides(), t.updateSlides()
    } else
      Ts(
        "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
      )
    i()
  } else i()
  t.loopFix({
    slideRealIndex: e,
    direction: n.centeredSlides ? void 0 : "next",
  })
}
function Bp(e) {
  let {
    slideRealIndex: t,
    slideTo: n = !0,
    direction: s,
    setTranslate: i,
    activeSlideIndex: r,
    byController: l,
    byMousewheel: a,
  } = e === void 0 ? {} : e
  const o = this
  if (!o.params.loop) return
  o.emit("beforeLoopFix")
  const {
      slides: u,
      allowSlidePrev: c,
      allowSlideNext: p,
      slidesEl: h,
      params: g,
    } = o,
    { centeredSlides: w } = g
  if (
    ((o.allowSlidePrev = !0),
    (o.allowSlideNext = !0),
    o.virtual && g.virtual.enabled)
  ) {
    n &&
      (!g.centeredSlides && o.snapIndex === 0
        ? o.slideTo(o.virtual.slides.length, 0, !1, !0)
        : g.centeredSlides && o.snapIndex < g.slidesPerView
        ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
        : o.snapIndex === o.snapGrid.length - 1 &&
          o.slideTo(o.virtual.slidesBefore, 0, !1, !0)),
      (o.allowSlidePrev = c),
      (o.allowSlideNext = p),
      o.emit("loopFix")
    return
  }
  let E = g.slidesPerView
  E === "auto"
    ? (E = o.slidesPerViewDynamic())
    : ((E = Math.ceil(parseFloat(g.slidesPerView, 10))),
      w && E % 2 === 0 && (E = E + 1))
  const T = g.slidesPerGroupAuto ? E : g.slidesPerGroup
  let m = T
  m % T !== 0 && (m += T - (m % T)),
    (m += g.loopAdditionalSlides),
    (o.loopedSlides = m)
  const y = o.grid && g.grid && g.grid.rows > 1
  u.length < E + m
    ? Ts(
        "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
      )
    : y &&
      g.grid.fill === "row" &&
      Ts(
        "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
      )
  const S = [],
    b = []
  let x = o.activeIndex
  typeof r > "u"
    ? (r = o.getSlideIndex(
        u.filter((z) => z.classList.contains(g.slideActiveClass))[0]
      ))
    : (x = r)
  const A = s === "next" || !s,
    M = s === "prev" || !s
  let V = 0,
    D = 0
  const F = y ? Math.ceil(u.length / g.grid.rows) : u.length,
    X = (y ? u[r].column : r) + (w && typeof i > "u" ? -E / 2 + 0.5 : 0)
  if (X < m) {
    V = Math.max(m - X, T)
    for (let z = 0; z < m - X; z += 1) {
      const pe = z - Math.floor(z / F) * F
      if (y) {
        const ve = F - pe - 1
        for (let ie = u.length - 1; ie >= 0; ie -= 1)
          u[ie].column === ve && S.push(ie)
      } else S.push(F - pe - 1)
    }
  } else if (X + E > F - m) {
    D = Math.max(X - (F - m * 2), T)
    for (let z = 0; z < D; z += 1) {
      const pe = z - Math.floor(z / F) * F
      y
        ? u.forEach((ve, ie) => {
            ve.column === pe && b.push(ie)
          })
        : b.push(pe)
    }
  }
  if (
    ((o.__preventObserver__ = !0),
    requestAnimationFrame(() => {
      o.__preventObserver__ = !1
    }),
    M &&
      S.forEach((z) => {
        ;(u[z].swiperLoopMoveDOM = !0),
          h.prepend(u[z]),
          (u[z].swiperLoopMoveDOM = !1)
      }),
    A &&
      b.forEach((z) => {
        ;(u[z].swiperLoopMoveDOM = !0),
          h.append(u[z]),
          (u[z].swiperLoopMoveDOM = !1)
      }),
    o.recalcSlides(),
    g.slidesPerView === "auto"
      ? o.updateSlides()
      : y &&
        ((S.length > 0 && M) || (b.length > 0 && A)) &&
        o.slides.forEach((z, pe) => {
          o.grid.updateSlide(pe, z, o.slides)
        }),
    g.watchSlidesProgress && o.updateSlidesOffset(),
    n)
  ) {
    if (S.length > 0 && M) {
      if (typeof t > "u") {
        const z = o.slidesGrid[x],
          ve = o.slidesGrid[x + V] - z
        a
          ? o.setTranslate(o.translate - ve)
          : (o.slideTo(x + V, 0, !1, !0),
            i &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - ve),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - ve)))
      } else if (i) {
        const z = y ? S.length / g.grid.rows : S.length
        o.slideTo(o.activeIndex + z, 0, !1, !0),
          (o.touchEventsData.currentTranslate = o.translate)
      }
    } else if (b.length > 0 && A)
      if (typeof t > "u") {
        const z = o.slidesGrid[x],
          ve = o.slidesGrid[x - D] - z
        a
          ? o.setTranslate(o.translate - ve)
          : (o.slideTo(x - D, 0, !1, !0),
            i &&
              ((o.touchEventsData.startTranslate =
                o.touchEventsData.startTranslate - ve),
              (o.touchEventsData.currentTranslate =
                o.touchEventsData.currentTranslate - ve)))
      } else {
        const z = y ? b.length / g.grid.rows : b.length
        o.slideTo(o.activeIndex - z, 0, !1, !0)
      }
  }
  if (
    ((o.allowSlidePrev = c),
    (o.allowSlideNext = p),
    o.controller && o.controller.control && !l)
  ) {
    const z = {
      slideRealIndex: t,
      direction: s,
      setTranslate: i,
      activeSlideIndex: r,
      byController: !0,
    }
    Array.isArray(o.controller.control)
      ? o.controller.control.forEach((pe) => {
          !pe.destroyed &&
            pe.params.loop &&
            pe.loopFix({
              ...z,
              slideTo: pe.params.slidesPerView === g.slidesPerView ? n : !1,
            })
        })
      : o.controller.control instanceof o.constructor &&
        o.controller.control.params.loop &&
        o.controller.control.loopFix({
          ...z,
          slideTo:
            o.controller.control.params.slidesPerView === g.slidesPerView
              ? n
              : !1,
        })
  }
  o.emit("loopFix")
}
function Wp() {
  const e = this,
    { params: t, slidesEl: n } = e
  if (!t.loop || (e.virtual && e.params.virtual.enabled)) return
  e.recalcSlides()
  const s = []
  e.slides.forEach((i) => {
    const r =
      typeof i.swiperSlideIndex > "u"
        ? i.getAttribute("data-swiper-slide-index") * 1
        : i.swiperSlideIndex
    s[r] = i
  }),
    e.slides.forEach((i) => {
      i.removeAttribute("data-swiper-slide-index")
    }),
    s.forEach((i) => {
      n.append(i)
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0)
}
var Hp = { loopCreate: $p, loopFix: Bp, loopDestroy: Wp }
function Vp(e) {
  const t = this
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return
  const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl
  t.isElement && (t.__preventObserver__ = !0),
    (n.style.cursor = "move"),
    (n.style.cursor = e ? "grabbing" : "grab"),
    t.isElement &&
      requestAnimationFrame(() => {
        t.__preventObserver__ = !1
      })
}
function Up() {
  const e = this
  ;(e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e.isElement && (e.__preventObserver__ = !0),
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = ""),
    e.isElement &&
      requestAnimationFrame(() => {
        e.__preventObserver__ = !1
      }))
}
var Gp = { setGrabCursor: Vp, unsetGrabCursor: Up }
function jp(e, t) {
  t === void 0 && (t = this)
  function n(s) {
    if (!s || s === In() || s === nt()) return null
    s.assignedSlot && (s = s.assignedSlot)
    const i = s.closest(e)
    return !i && !s.getRootNode ? null : i || n(s.getRootNode().host)
  }
  return n(t)
}
function yl(e, t, n) {
  const s = nt(),
    { params: i } = e,
    r = i.edgeSwipeDetection,
    l = i.edgeSwipeThreshold
  return r && (n <= l || n >= s.innerWidth - l)
    ? r === "prevent"
      ? (t.preventDefault(), !0)
      : !1
    : !0
}
function zp(e) {
  const t = this,
    n = In()
  let s = e
  s.originalEvent && (s = s.originalEvent)
  const i = t.touchEventsData
  if (s.type === "pointerdown") {
    if (i.pointerId !== null && i.pointerId !== s.pointerId) return
    i.pointerId = s.pointerId
  } else
    s.type === "touchstart" &&
      s.targetTouches.length === 1 &&
      (i.touchId = s.targetTouches[0].identifier)
  if (s.type === "touchstart") {
    yl(t, s, s.targetTouches[0].pageX)
    return
  }
  const { params: r, touches: l, enabled: a } = t
  if (
    !a ||
    (!r.simulateTouch && s.pointerType === "mouse") ||
    (t.animating && r.preventInteractionOnTransition)
  )
    return
  !t.animating && r.cssMode && r.loop && t.loopFix()
  let o = s.target
  if (
    (r.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(o)) ||
    ("which" in s && s.which === 3) ||
    ("button" in s && s.button > 0) ||
    (i.isTouched && i.isMoved)
  )
    return
  const u = !!r.noSwipingClass && r.noSwipingClass !== "",
    c = s.composedPath ? s.composedPath() : s.path
  u && s.target && s.target.shadowRoot && c && (o = c[0])
  const p = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    h = !!(s.target && s.target.shadowRoot)
  if (r.noSwiping && (h ? jp(p, o) : o.closest(p))) {
    t.allowClick = !0
    return
  }
  if (r.swipeHandler && !o.closest(r.swipeHandler)) return
  ;(l.currentX = s.pageX), (l.currentY = s.pageY)
  const g = l.currentX,
    w = l.currentY
  if (!yl(t, s, g)) return
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (l.startX = g),
    (l.startY = w),
    (i.touchStartTime = Ss()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (i.allowThresholdMove = !1)
  let E = !0
  o.matches(i.focusableElements) &&
    ((E = !1), o.nodeName === "SELECT" && (i.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(i.focusableElements) &&
      n.activeElement !== o &&
      n.activeElement.blur()
  const T = E && t.allowTouchMove && r.touchStartPreventDefault
  ;(r.touchStartForcePreventDefault || T) &&
    !o.isContentEditable &&
    s.preventDefault(),
    r.freeMode &&
      r.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !r.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", s)
}
function Yp(e) {
  const t = In(),
    n = this,
    s = n.touchEventsData,
    { params: i, touches: r, rtlTranslate: l, enabled: a } = n
  if (!a || (!i.simulateTouch && e.pointerType === "mouse")) return
  let o = e
  if (
    (o.originalEvent && (o = o.originalEvent),
    o.type === "pointermove" &&
      (s.touchId !== null || o.pointerId !== s.pointerId))
  )
    return
  let u
  if (o.type === "touchmove") {
    if (
      ((u = [...o.changedTouches].filter((A) => A.identifier === s.touchId)[0]),
      !u || u.identifier !== s.touchId)
    )
      return
  } else u = o
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && n.emit("touchMoveOpposite", o)
    return
  }
  const c = u.pageX,
    p = u.pageY
  if (o.preventedByNestedSwiper) {
    ;(r.startX = c), (r.startY = p)
    return
  }
  if (!n.allowTouchMove) {
    o.target.matches(s.focusableElements) || (n.allowClick = !1),
      s.isTouched &&
        (Object.assign(r, { startX: c, startY: p, currentX: c, currentY: p }),
        (s.touchStartTime = Ss()))
    return
  }
  if (i.touchReleaseOnEdges && !i.loop) {
    if (n.isVertical()) {
      if (
        (p < r.startY && n.translate <= n.maxTranslate()) ||
        (p > r.startY && n.translate >= n.minTranslate())
      ) {
        ;(s.isTouched = !1), (s.isMoved = !1)
        return
      }
    } else if (
      (c < r.startX && n.translate <= n.maxTranslate()) ||
      (c > r.startX && n.translate >= n.minTranslate())
    )
      return
  }
  if (
    t.activeElement &&
    o.target === t.activeElement &&
    o.target.matches(s.focusableElements)
  ) {
    ;(s.isMoved = !0), (n.allowClick = !1)
    return
  }
  s.allowTouchCallbacks && n.emit("touchMove", o),
    (r.previousX = r.currentX),
    (r.previousY = r.currentY),
    (r.currentX = c),
    (r.currentY = p)
  const h = r.currentX - r.startX,
    g = r.currentY - r.startY
  if (n.params.threshold && Math.sqrt(h ** 2 + g ** 2) < n.params.threshold)
    return
  if (typeof s.isScrolling > "u") {
    let A
    ;(n.isHorizontal() && r.currentY === r.startY) ||
    (n.isVertical() && r.currentX === r.startX)
      ? (s.isScrolling = !1)
      : h * h + g * g >= 25 &&
        ((A = (Math.atan2(Math.abs(g), Math.abs(h)) * 180) / Math.PI),
        (s.isScrolling = n.isHorizontal()
          ? A > i.touchAngle
          : 90 - A > i.touchAngle))
  }
  if (
    (s.isScrolling && n.emit("touchMoveOpposite", o),
    typeof s.startMoving > "u" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (s.startMoving = !0),
    s.isScrolling)
  ) {
    s.isTouched = !1
    return
  }
  if (!s.startMoving) return
  ;(n.allowClick = !1),
    !i.cssMode && o.cancelable && o.preventDefault(),
    i.touchMoveStopPropagation && !i.nested && o.stopPropagation()
  let w = n.isHorizontal() ? h : g,
    E = n.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY
  i.oneWayMovement &&
    ((w = Math.abs(w) * (l ? 1 : -1)), (E = Math.abs(E) * (l ? 1 : -1))),
    (r.diff = w),
    (w *= i.touchRatio),
    l && ((w = -w), (E = -E))
  const T = n.touchesDirection
  ;(n.swipeDirection = w > 0 ? "prev" : "next"),
    (n.touchesDirection = E > 0 ? "prev" : "next")
  const m = n.params.loop && !i.cssMode,
    y =
      (n.touchesDirection === "next" && n.allowSlideNext) ||
      (n.touchesDirection === "prev" && n.allowSlidePrev)
  if (!s.isMoved) {
    if (
      (m && y && n.loopFix({ direction: n.swipeDirection }),
      (s.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const A = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      })
      n.wrapperEl.dispatchEvent(A)
    }
    ;(s.allowMomentumBounce = !1),
      i.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit("sliderFirstMove", o)
  }
  let S
  if (
    (new Date().getTime(),
    s.isMoved &&
      s.allowThresholdMove &&
      T !== n.touchesDirection &&
      m &&
      y &&
      Math.abs(w) >= 1)
  ) {
    Object.assign(r, {
      startX: c,
      startY: p,
      currentX: c,
      currentY: p,
      startTranslate: s.currentTranslate,
    }),
      (s.loopSwapReset = !0),
      (s.startTranslate = s.currentTranslate)
    return
  }
  n.emit("sliderMove", o),
    (s.isMoved = !0),
    (s.currentTranslate = w + s.startTranslate)
  let b = !0,
    x = i.resistanceRatio
  if (
    (i.touchReleaseOnEdges && (x = 0),
    w > 0
      ? (m &&
          y &&
          !S &&
          s.allowThresholdMove &&
          s.currentTranslate >
            (i.centeredSlides
              ? n.minTranslate() - n.slidesSizesGrid[n.activeIndex + 1]
              : n.minTranslate()) &&
          n.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        s.currentTranslate > n.minTranslate() &&
          ((b = !1),
          i.resistance &&
            (s.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + s.startTranslate + w) ** x)))
      : w < 0 &&
        (m &&
          y &&
          !S &&
          s.allowThresholdMove &&
          s.currentTranslate <
            (i.centeredSlides
              ? n.maxTranslate() +
                n.slidesSizesGrid[n.slidesSizesGrid.length - 1]
              : n.maxTranslate()) &&
          n.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (i.slidesPerView === "auto"
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(i.slidesPerView, 10))),
          }),
        s.currentTranslate < n.maxTranslate() &&
          ((b = !1),
          i.resistance &&
            (s.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - s.startTranslate - w) ** x))),
    b && (o.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === "next" &&
      s.currentTranslate < s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === "prev" &&
      s.currentTranslate > s.startTranslate &&
      (s.currentTranslate = s.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (s.currentTranslate = s.startTranslate),
    i.threshold > 0)
  )
    if (Math.abs(w) > i.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        ;(s.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (s.currentTranslate = s.startTranslate),
          (r.diff = n.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY)
        return
      }
    } else {
      s.currentTranslate = s.startTranslate
      return
    }
  !i.followFinger ||
    i.cssMode ||
    (((i.freeMode && i.freeMode.enabled && n.freeMode) ||
      i.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    i.freeMode && i.freeMode.enabled && n.freeMode && n.freeMode.onTouchMove(),
    n.updateProgress(s.currentTranslate),
    n.setTranslate(s.currentTranslate))
}
function Kp(e) {
  const t = this,
    n = t.touchEventsData
  let s = e
  s.originalEvent && (s = s.originalEvent)
  let i
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (
      ((i = [...s.changedTouches].filter((b) => b.identifier === n.touchId)[0]),
      !i || i.identifier !== n.touchId)
    )
      return
  } else {
    if (n.touchId !== null || s.pointerId !== n.pointerId) return
    i = s
  }
  if (
    ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
      s.type
    ) &&
    !(
      ["pointercancel", "contextmenu"].includes(s.type) &&
      (t.browser.isSafari || t.browser.isWebView)
    )
  )
    return
  ;(n.pointerId = null), (n.touchId = null)
  const {
    params: l,
    touches: a,
    rtlTranslate: o,
    slidesGrid: u,
    enabled: c,
  } = t
  if (!c || (!l.simulateTouch && s.pointerType === "mouse")) return
  if (
    (n.allowTouchCallbacks && t.emit("touchEnd", s),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    n.isMoved && l.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1)
    return
  }
  l.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1)
  const p = Ss(),
    h = p - n.touchStartTime
  if (t.allowClick) {
    const b = s.path || (s.composedPath && s.composedPath())
    t.updateClickedSlide((b && b[0]) || s.target, b),
      t.emit("tap click", s),
      h < 300 && p - n.lastClickTime < 300 && t.emit("doubleTap doubleClick", s)
  }
  if (
    ((n.lastClickTime = Ss()),
    Cr(() => {
      t.destroyed || (t.allowClick = !0)
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      (a.diff === 0 && !n.loopSwapReset) ||
      (n.currentTranslate === n.startTranslate && !n.loopSwapReset))
  ) {
    ;(n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1)
    return
  }
  ;(n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1)
  let g
  if (
    (l.followFinger
      ? (g = o ? t.translate : -t.translate)
      : (g = -n.currentTranslate),
    l.cssMode)
  )
    return
  if (l.freeMode && l.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: g })
    return
  }
  let w = 0,
    E = t.slidesSizesGrid[0]
  for (
    let b = 0;
    b < u.length;
    b += b < l.slidesPerGroupSkip ? 1 : l.slidesPerGroup
  ) {
    const x = b < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup
    typeof u[b + x] < "u"
      ? g >= u[b] && g < u[b + x] && ((w = b), (E = u[b + x] - u[b]))
      : g >= u[b] && ((w = b), (E = u[u.length - 1] - u[u.length - 2]))
  }
  let T = null,
    m = null
  l.rewind &&
    (t.isBeginning
      ? (m =
          l.virtual && l.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (T = 0))
  const y = (g - u[w]) / E,
    S = w < l.slidesPerGroupSkip - 1 ? 1 : l.slidesPerGroup
  if (h > l.longSwipesMs) {
    if (!l.longSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.swipeDirection === "next" &&
      (y >= l.longSwipesRatio
        ? t.slideTo(l.rewind && t.isEnd ? T : w + S)
        : t.slideTo(w)),
      t.swipeDirection === "prev" &&
        (y > 1 - l.longSwipesRatio
          ? t.slideTo(w + S)
          : m !== null && y < 0 && Math.abs(y) > l.longSwipesRatio
          ? t.slideTo(m)
          : t.slideTo(w))
  } else {
    if (!l.shortSwipes) {
      t.slideTo(t.activeIndex)
      return
    }
    t.navigation &&
    (s.target === t.navigation.nextEl || s.target === t.navigation.prevEl)
      ? s.target === t.navigation.nextEl
        ? t.slideTo(w + S)
        : t.slideTo(w)
      : (t.swipeDirection === "next" && t.slideTo(T !== null ? T : w + S),
        t.swipeDirection === "prev" && t.slideTo(m !== null ? m : w))
  }
}
function El() {
  const e = this,
    { params: t, el: n } = e
  if (n && n.offsetWidth === 0) return
  t.breakpoints && e.setBreakpoint()
  const { allowSlideNext: s, allowSlidePrev: i, snapGrid: r } = e,
    l = e.virtual && e.params.virtual.enabled
  ;(e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses()
  const a = l && t.loop
  ;(t.slidesPerView === "auto" || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !a
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !l
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(e.autoplay.resizeTimeout),
      (e.autoplay.resizeTimeout = setTimeout(() => {
        e.autoplay &&
          e.autoplay.running &&
          e.autoplay.paused &&
          e.autoplay.resume()
      }, 500))),
    (e.allowSlidePrev = i),
    (e.allowSlideNext = s),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
}
function Xp(e) {
  const t = this
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())))
}
function qp() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: s } = e
  if (!s) return
  ;(e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses()
  let i
  const r = e.maxTranslate() - e.minTranslate()
  r === 0 ? (i = 0) : (i = (e.translate - e.minTranslate()) / r),
    i !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1)
}
function Jp(e) {
  const t = this
  ms(t, e.target),
    !(
      t.params.cssMode ||
      (t.params.slidesPerView !== "auto" && !t.params.autoHeight)
    ) && t.update()
}
function Qp() {
  const e = this
  e.documentTouchHandlerProceeded ||
    ((e.documentTouchHandlerProceeded = !0),
    e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
}
const Ea = (e, t) => {
  const n = In(),
    { params: s, el: i, wrapperEl: r, device: l } = e,
    a = !!s.nested,
    o = t === "on" ? "addEventListener" : "removeEventListener",
    u = t
  n[o]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: a }),
    i[o]("touchstart", e.onTouchStart, { passive: !1 }),
    i[o]("pointerdown", e.onTouchStart, { passive: !1 }),
    n[o]("touchmove", e.onTouchMove, { passive: !1, capture: a }),
    n[o]("pointermove", e.onTouchMove, { passive: !1, capture: a }),
    n[o]("touchend", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerup", e.onTouchEnd, { passive: !0 }),
    n[o]("pointercancel", e.onTouchEnd, { passive: !0 }),
    n[o]("touchcancel", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerout", e.onTouchEnd, { passive: !0 }),
    n[o]("pointerleave", e.onTouchEnd, { passive: !0 }),
    n[o]("contextmenu", e.onTouchEnd, { passive: !0 }),
    (s.preventClicks || s.preventClicksPropagation) &&
      i[o]("click", e.onClick, !0),
    s.cssMode && r[o]("scroll", e.onScroll),
    s.updateOnWindowResize
      ? e[u](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          El,
          !0
        )
      : e[u]("observerUpdate", El, !0),
    i[o]("load", e.onLoad, { capture: !0 })
}
function Zp() {
  const e = this,
    { params: t } = e
  ;(e.onTouchStart = zp.bind(e)),
    (e.onTouchMove = Yp.bind(e)),
    (e.onTouchEnd = Kp.bind(e)),
    (e.onDocumentTouchStart = Qp.bind(e)),
    t.cssMode && (e.onScroll = qp.bind(e)),
    (e.onClick = Xp.bind(e)),
    (e.onLoad = Jp.bind(e)),
    Ea(e, "on")
}
function eh() {
  Ea(this, "off")
}
var th = { attachEvents: Zp, detachEvents: eh }
const wl = (e, t) => e.grid && t.grid && t.grid.rows > 1
function nh() {
  const e = this,
    { realIndex: t, initialized: n, params: s, el: i } = e,
    r = s.breakpoints
  if (!r || (r && Object.keys(r).length === 0)) return
  const l = e.getBreakpoint(r, e.params.breakpointsBase, e.el)
  if (!l || e.currentBreakpoint === l) return
  const o = (l in r ? r[l] : void 0) || e.originalParams,
    u = wl(e, s),
    c = wl(e, o),
    p = s.enabled
  u && !c
    ? (i.classList.remove(
        `${s.containerModifierClass}grid`,
        `${s.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !u &&
      c &&
      (i.classList.add(`${s.containerModifierClass}grid`),
      ((o.grid.fill && o.grid.fill === "column") ||
        (!o.grid.fill && s.grid.fill === "column")) &&
        i.classList.add(`${s.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((m) => {
      if (typeof o[m] > "u") return
      const y = s[m] && s[m].enabled,
        S = o[m] && o[m].enabled
      y && !S && e[m].disable(), !y && S && e[m].enable()
    })
  const h = o.direction && o.direction !== s.direction,
    g = s.loop && (o.slidesPerView !== s.slidesPerView || h),
    w = s.loop
  h && n && e.changeDirection(), et(e.params, o)
  const E = e.params.enabled,
    T = e.params.loop
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    p && !E ? e.disable() : !p && E && e.enable(),
    (e.currentBreakpoint = l),
    e.emit("_beforeBreakpoint", o),
    n &&
      (g
        ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
        : !w && T
        ? (e.loopCreate(t), e.updateSlides())
        : w && !T && e.loopDestroy()),
    e.emit("breakpoint", o)
}
function sh(e, t, n) {
  if ((t === void 0 && (t = "window"), !e || (t === "container" && !n))) return
  let s = !1
  const i = nt(),
    r = t === "window" ? i.innerHeight : n.clientHeight,
    l = Object.keys(e).map((a) => {
      if (typeof a == "string" && a.indexOf("@") === 0) {
        const o = parseFloat(a.substr(1))
        return { value: r * o, point: a }
      }
      return { value: a, point: a }
    })
  l.sort((a, o) => parseInt(a.value, 10) - parseInt(o.value, 10))
  for (let a = 0; a < l.length; a += 1) {
    const { point: o, value: u } = l[a]
    t === "window"
      ? i.matchMedia(`(min-width: ${u}px)`).matches && (s = o)
      : u <= n.clientWidth && (s = o)
  }
  return s || "max"
}
var rh = { setBreakpoint: nh, getBreakpoint: sh }
function ih(e, t) {
  const n = []
  return (
    e.forEach((s) => {
      typeof s == "object"
        ? Object.keys(s).forEach((i) => {
            s[i] && n.push(t + i)
          })
        : typeof s == "string" && n.push(t + s)
    }),
    n
  )
}
function lh() {
  const e = this,
    { classNames: t, params: n, rtl: s, el: i, device: r } = e,
    l = ih(
      [
        "initialized",
        n.direction,
        { "free-mode": e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: s },
        { grid: n.grid && n.grid.rows > 1 },
        {
          "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column",
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { "watch-progress": n.watchSlidesProgress },
      ],
      n.containerModifierClass
    )
  t.push(...l), i.classList.add(...t), e.emitContainerClasses()
}
function oh() {
  const e = this,
    { el: t, classNames: n } = e
  t.classList.remove(...n), e.emitContainerClasses()
}
var ah = { addClasses: lh, removeClasses: oh }
function ch() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: s } = n
  if (s) {
    const i = e.slides.length - 1,
      r = e.slidesGrid[i] + e.slidesSizesGrid[i] + s * 2
    e.isLocked = e.size > r
  } else e.isLocked = e.snapGrid.length === 1
  n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
}
var uh = { checkOverflow: ch },
  Or = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    eventsPrefix: "swiper",
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopAddBlankSlides: !0,
    loopAdditionalSlides: 0,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  }
function fh(e, t) {
  return function (s) {
    s === void 0 && (s = {})
    const i = Object.keys(s)[0],
      r = s[i]
    if (typeof r != "object" || r === null) {
      et(t, s)
      return
    }
    if (
      (e[i] === !0 && (e[i] = { enabled: !0 }),
      i === "navigation" &&
        e[i] &&
        e[i].enabled &&
        !e[i].prevEl &&
        !e[i].nextEl &&
        (e[i].auto = !0),
      ["pagination", "scrollbar"].indexOf(i) >= 0 &&
        e[i] &&
        e[i].enabled &&
        !e[i].el &&
        (e[i].auto = !0),
      !(i in e && "enabled" in r))
    ) {
      et(t, s)
      return
    }
    typeof e[i] == "object" && !("enabled" in e[i]) && (e[i].enabled = !0),
      e[i] || (e[i] = { enabled: !1 }),
      et(t, s)
  }
}
const ir = {
    eventsEmitter: ap,
    update: bp,
    translate: Ip,
    transition: Op,
    slide: Fp,
    loop: Hp,
    grabCursor: Gp,
    events: th,
    breakpoints: rh,
    checkOverflow: uh,
    classes: ah,
  },
  lr = {}
let ui = class wt {
  constructor() {
    let t, n
    for (var s = arguments.length, i = new Array(s), r = 0; r < s; r++)
      i[r] = arguments[r]
    i.length === 1 &&
    i[0].constructor &&
    Object.prototype.toString.call(i[0]).slice(8, -1) === "Object"
      ? (n = i[0])
      : ([t, n] = i),
      n || (n = {}),
      (n = et({}, n)),
      t && !n.el && (n.el = t)
    const l = In()
    if (
      n.el &&
      typeof n.el == "string" &&
      l.querySelectorAll(n.el).length > 1
    ) {
      const c = []
      return (
        l.querySelectorAll(n.el).forEach((p) => {
          const h = et({}, n, { el: p })
          c.push(new wt(h))
        }),
        c
      )
    }
    const a = this
    ;(a.__swiper__ = !0),
      (a.support = ba()),
      (a.device = sp({ userAgent: n.userAgent })),
      (a.browser = ip()),
      (a.eventsListeners = {}),
      (a.eventsAnyListeners = []),
      (a.modules = [...a.__modules__]),
      n.modules && Array.isArray(n.modules) && a.modules.push(...n.modules)
    const o = {}
    a.modules.forEach((c) => {
      c({
        params: n,
        swiper: a,
        extendParams: fh(n, o),
        on: a.on.bind(a),
        once: a.once.bind(a),
        off: a.off.bind(a),
        emit: a.emit.bind(a),
      })
    })
    const u = et({}, Or, o)
    return (
      (a.params = et({}, u, lr, n)),
      (a.originalParams = et({}, a.params)),
      (a.passedParams = et({}, n)),
      a.params &&
        a.params.on &&
        Object.keys(a.params.on).forEach((c) => {
          a.on(c, a.params.on[c])
        }),
      a.params && a.params.onAny && a.onAny(a.params.onAny),
      Object.assign(a, {
        enabled: a.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return a.params.direction === "horizontal"
        },
        isVertical() {
          return a.params.direction === "vertical"
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
        },
        allowSlideNext: a.params.allowSlideNext,
        allowSlidePrev: a.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: a.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null,
        },
        allowClick: !0,
        allowTouchMove: a.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      a.emit("_swiper"),
      a.params.init && a.init(),
      a
    )
  }
  getDirectionLabel(t) {
    return this.isHorizontal()
      ? t
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[t]
  }
  getSlideIndex(t) {
    const { slidesEl: n, params: s } = this,
      i = gt(n, `.${s.slideClass}, swiper-slide`),
      r = vl(i[0])
    return vl(t) - r
  }
  getSlideIndexByData(t) {
    return this.getSlideIndex(
      this.slides.filter(
        (n) => n.getAttribute("data-swiper-slide-index") * 1 === t
      )[0]
    )
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: s } = t
    t.slides = gt(n, `.${s.slideClass}, swiper-slide`)
  }
  enable() {
    const t = this
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit("enable"))
  }
  disable() {
    const t = this
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit("disable"))
  }
  setProgress(t, n) {
    const s = this
    t = Math.min(Math.max(t, 0), 1)
    const i = s.minTranslate(),
      l = (s.maxTranslate() - i) * t + i
    s.translateTo(l, typeof n > "u" ? 0 : n),
      s.updateActiveIndex(),
      s.updateSlidesClasses()
  }
  emitContainerClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const n = t.el.className
      .split(" ")
      .filter(
        (s) =>
          s.indexOf("swiper") === 0 ||
          s.indexOf(t.params.containerModifierClass) === 0
      )
    t.emit("_containerClasses", n.join(" "))
  }
  getSlideClasses(t) {
    const n = this
    return n.destroyed
      ? ""
      : t.className
          .split(" ")
          .filter(
            (s) =>
              s.indexOf("swiper-slide") === 0 ||
              s.indexOf(n.params.slideClass) === 0
          )
          .join(" ")
  }
  emitSlidesClasses() {
    const t = this
    if (!t.params._emitClasses || !t.el) return
    const n = []
    t.slides.forEach((s) => {
      const i = t.getSlideClasses(s)
      n.push({ slideEl: s, classNames: i }), t.emit("_slideClass", s, i)
    }),
      t.emit("_slideClasses", n)
  }
  slidesPerViewDynamic(t, n) {
    t === void 0 && (t = "current"), n === void 0 && (n = !1)
    const s = this,
      {
        params: i,
        slides: r,
        slidesGrid: l,
        slidesSizesGrid: a,
        size: o,
        activeIndex: u,
      } = s
    let c = 1
    if (typeof i.slidesPerView == "number") return i.slidesPerView
    if (i.centeredSlides) {
      let p = r[u] ? r[u].swiperSlideSize : 0,
        h
      for (let g = u + 1; g < r.length; g += 1)
        r[g] && !h && ((p += r[g].swiperSlideSize), (c += 1), p > o && (h = !0))
      for (let g = u - 1; g >= 0; g -= 1)
        r[g] && !h && ((p += r[g].swiperSlideSize), (c += 1), p > o && (h = !0))
    } else if (t === "current")
      for (let p = u + 1; p < r.length; p += 1)
        (n ? l[p] + a[p] - l[u] < o : l[p] - l[u] < o) && (c += 1)
    else for (let p = u - 1; p >= 0; p -= 1) l[u] - l[p] < o && (c += 1)
    return c
  }
  update() {
    const t = this
    if (!t || t.destroyed) return
    const { snapGrid: n, params: s } = t
    s.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((l) => {
        l.complete && ms(t, l)
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses()
    function i() {
      const l = t.rtlTranslate ? t.translate * -1 : t.translate,
        a = Math.min(Math.max(l, t.maxTranslate()), t.minTranslate())
      t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses()
    }
    let r
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      i(), s.autoHeight && t.updateAutoHeight()
    else {
      if (
        (s.slidesPerView === "auto" || s.slidesPerView > 1) &&
        t.isEnd &&
        !s.centeredSlides
      ) {
        const l = t.virtual && s.virtual.enabled ? t.virtual.slides : t.slides
        r = t.slideTo(l.length - 1, 0, !1, !0)
      } else r = t.slideTo(t.activeIndex, 0, !1, !0)
      r || i()
    }
    s.watchOverflow && n !== t.snapGrid && t.checkOverflow(), t.emit("update")
  }
  changeDirection(t, n) {
    n === void 0 && (n = !0)
    const s = this,
      i = s.params.direction
    return (
      t || (t = i === "horizontal" ? "vertical" : "horizontal"),
      t === i ||
        (t !== "horizontal" && t !== "vertical") ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
        s.el.classList.add(`${s.params.containerModifierClass}${t}`),
        s.emitContainerClasses(),
        (s.params.direction = t),
        s.slides.forEach((r) => {
          t === "vertical" ? (r.style.width = "") : (r.style.height = "")
        }),
        s.emit("changeDirection"),
        n && s.update()),
      s
    )
  }
  changeLanguageDirection(t) {
    const n = this
    ;(n.rtl && t === "rtl") ||
      (!n.rtl && t === "ltr") ||
      ((n.rtl = t === "rtl"),
      (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "rtl"))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "ltr")),
      n.update())
  }
  mount(t) {
    const n = this
    if (n.mounted) return !0
    let s = t || n.params.el
    if ((typeof s == "string" && (s = document.querySelector(s)), !s)) return !1
    ;(s.swiper = n),
      s.parentNode &&
        s.parentNode.host &&
        s.parentNode.host.nodeName === "SWIPER-CONTAINER" &&
        (n.isElement = !0)
    const i = () =>
      `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`
    let l = (() =>
      s && s.shadowRoot && s.shadowRoot.querySelector
        ? s.shadowRoot.querySelector(i())
        : gt(s, i())[0])()
    return (
      !l &&
        n.params.createElements &&
        ((l = Is("div", n.params.wrapperClass)),
        s.append(l),
        gt(s, `.${n.params.slideClass}`).forEach((a) => {
          l.append(a)
        })),
      Object.assign(n, {
        el: s,
        wrapperEl: l,
        slidesEl:
          n.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : l,
        hostEl: n.isElement ? s.parentNode.host : s,
        mounted: !0,
        rtl: s.dir.toLowerCase() === "rtl" || kt(s, "direction") === "rtl",
        rtlTranslate:
          n.params.direction === "horizontal" &&
          (s.dir.toLowerCase() === "rtl" || kt(s, "direction") === "rtl"),
        wrongRTL: kt(l, "display") === "-webkit-box",
      }),
      !0
    )
  }
  init(t) {
    const n = this
    if (n.initialized || n.mount(t) === !1) return n
    n.emit("beforeInit"),
      n.params.breakpoints && n.setBreakpoint(),
      n.addClasses(),
      n.updateSize(),
      n.updateSlides(),
      n.params.watchOverflow && n.checkOverflow(),
      n.params.grabCursor && n.enabled && n.setGrabCursor(),
      n.params.loop && n.virtual && n.params.virtual.enabled
        ? n.slideTo(
            n.params.initialSlide + n.virtual.slidesBefore,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0
          )
        : n.slideTo(
            n.params.initialSlide,
            0,
            n.params.runCallbacksOnInit,
            !1,
            !0
          ),
      n.params.loop && n.loopCreate(),
      n.attachEvents()
    const i = [...n.el.querySelectorAll('[loading="lazy"]')]
    return (
      n.isElement && i.push(...n.hostEl.querySelectorAll('[loading="lazy"]')),
      i.forEach((r) => {
        r.complete
          ? ms(n, r)
          : r.addEventListener("load", (l) => {
              ms(n, l.target)
            })
      }),
      Lr(n),
      (n.initialized = !0),
      Lr(n),
      n.emit("init"),
      n.emit("afterInit"),
      n
    )
  }
  destroy(t, n) {
    t === void 0 && (t = !0), n === void 0 && (n = !0)
    const s = this,
      { params: i, el: r, wrapperEl: l, slides: a } = s
    return (
      typeof s.params > "u" ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        n &&
          (s.removeClasses(),
          r.removeAttribute("style"),
          l.removeAttribute("style"),
          a &&
            a.length &&
            a.forEach((o) => {
              o.classList.remove(
                i.slideVisibleClass,
                i.slideFullyVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass
              ),
                o.removeAttribute("style"),
                o.removeAttribute("data-swiper-slide-index")
            })),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((o) => {
          s.off(o)
        }),
        t !== !1 && ((s.el.swiper = null), Kd(s)),
        (s.destroyed = !0)),
      null
    )
  }
  static extendDefaults(t) {
    et(lr, t)
  }
  static get extendedDefaults() {
    return lr
  }
  static get defaults() {
    return Or
  }
  static installModule(t) {
    wt.prototype.__modules__ || (wt.prototype.__modules__ = [])
    const n = wt.prototype.__modules__
    typeof t == "function" && n.indexOf(t) < 0 && n.push(t)
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => wt.installModule(n)), wt)
      : (wt.installModule(t), wt)
  }
}
Object.keys(ir).forEach((e) => {
  Object.keys(ir[e]).forEach((t) => {
    ui.prototype[t] = ir[e][t]
  })
})
ui.use([lp, op])
const wa = [
  "eventsPrefix",
  "injectStyles",
  "injectStylesUrls",
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "breakpointsBase",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopAdditionalSlides",
  "loopAddBlankSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideFullyVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "slideBlankClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "lazyPreloadPrevNext",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
]
function tn(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object" &&
    !e.__swiper__
  )
}
function hn(e, t) {
  const n = ["__proto__", "constructor", "prototype"]
  Object.keys(t)
    .filter((s) => n.indexOf(s) < 0)
    .forEach((s) => {
      typeof e[s] > "u"
        ? (e[s] = t[s])
        : tn(t[s]) && tn(e[s]) && Object.keys(t[s]).length > 0
        ? t[s].__swiper__
          ? (e[s] = t[s])
          : hn(e[s], t[s])
        : (e[s] = t[s])
    })
}
function Sa(e) {
  return (
    e === void 0 && (e = {}),
    e.navigation &&
      typeof e.navigation.nextEl > "u" &&
      typeof e.navigation.prevEl > "u"
  )
}
function Ta(e) {
  return e === void 0 && (e = {}), e.pagination && typeof e.pagination.el > "u"
}
function Ia(e) {
  return e === void 0 && (e = {}), e.scrollbar && typeof e.scrollbar.el > "u"
}
function Pa(e) {
  e === void 0 && (e = "")
  const t = e
      .split(" ")
      .map((s) => s.trim())
      .filter((s) => !!s),
    n = []
  return (
    t.forEach((s) => {
      n.indexOf(s) < 0 && n.push(s)
    }),
    n.join(" ")
  )
}
function dh(e) {
  return (
    e === void 0 && (e = ""),
    e
      ? e.includes("swiper-wrapper")
        ? e
        : `swiper-wrapper ${e}`
      : "swiper-wrapper"
  )
}
function ph(e) {
  let {
    swiper: t,
    slides: n,
    passedParams: s,
    changedParams: i,
    nextEl: r,
    prevEl: l,
    scrollbarEl: a,
    paginationEl: o,
  } = e
  const u = i.filter(
      (D) => D !== "children" && D !== "direction" && D !== "wrapperClass"
    ),
    {
      params: c,
      pagination: p,
      navigation: h,
      scrollbar: g,
      virtual: w,
      thumbs: E,
    } = t
  let T, m, y, S, b, x, A, M
  i.includes("thumbs") &&
    s.thumbs &&
    s.thumbs.swiper &&
    c.thumbs &&
    !c.thumbs.swiper &&
    (T = !0),
    i.includes("controller") &&
      s.controller &&
      s.controller.control &&
      c.controller &&
      !c.controller.control &&
      (m = !0),
    i.includes("pagination") &&
      s.pagination &&
      (s.pagination.el || o) &&
      (c.pagination || c.pagination === !1) &&
      p &&
      !p.el &&
      (y = !0),
    i.includes("scrollbar") &&
      s.scrollbar &&
      (s.scrollbar.el || a) &&
      (c.scrollbar || c.scrollbar === !1) &&
      g &&
      !g.el &&
      (S = !0),
    i.includes("navigation") &&
      s.navigation &&
      (s.navigation.prevEl || l) &&
      (s.navigation.nextEl || r) &&
      (c.navigation || c.navigation === !1) &&
      h &&
      !h.prevEl &&
      !h.nextEl &&
      (b = !0)
  const V = (D) => {
    t[D] &&
      (t[D].destroy(),
      D === "navigation"
        ? (t.isElement && (t[D].prevEl.remove(), t[D].nextEl.remove()),
          (c[D].prevEl = void 0),
          (c[D].nextEl = void 0),
          (t[D].prevEl = void 0),
          (t[D].nextEl = void 0))
        : (t.isElement && t[D].el.remove(),
          (c[D].el = void 0),
          (t[D].el = void 0)))
  }
  i.includes("loop") &&
    t.isElement &&
    (c.loop && !s.loop ? (x = !0) : !c.loop && s.loop ? (A = !0) : (M = !0)),
    u.forEach((D) => {
      if (tn(c[D]) && tn(s[D]))
        Object.assign(c[D], s[D]),
          (D === "navigation" || D === "pagination" || D === "scrollbar") &&
            "enabled" in s[D] &&
            !s[D].enabled &&
            V(D)
      else {
        const F = s[D]
        ;(F === !0 || F === !1) &&
        (D === "navigation" || D === "pagination" || D === "scrollbar")
          ? F === !1 && V(D)
          : (c[D] = s[D])
      }
    }),
    u.includes("controller") &&
      !m &&
      t.controller &&
      t.controller.control &&
      c.controller &&
      c.controller.control &&
      (t.controller.control = c.controller.control),
    i.includes("children") && n && w && c.virtual.enabled
      ? ((w.slides = n), w.update(!0))
      : i.includes("virtual") &&
        w &&
        c.virtual.enabled &&
        (n && (w.slides = n), w.update(!0)),
    i.includes("children") && n && c.loop && (M = !0),
    T && E.init() && E.update(!0),
    m && (t.controller.control = c.controller.control),
    y &&
      (t.isElement &&
        (!o || typeof o == "string") &&
        ((o = document.createElement("div")),
        o.classList.add("swiper-pagination"),
        o.part.add("pagination"),
        t.el.appendChild(o)),
      o && (c.pagination.el = o),
      p.init(),
      p.render(),
      p.update()),
    S &&
      (t.isElement &&
        (!a || typeof a == "string") &&
        ((a = document.createElement("div")),
        a.classList.add("swiper-scrollbar"),
        a.part.add("scrollbar"),
        t.el.appendChild(a)),
      a && (c.scrollbar.el = a),
      g.init(),
      g.updateSize(),
      g.setTranslate()),
    b &&
      (t.isElement &&
        ((!r || typeof r == "string") &&
          ((r = document.createElement("div")),
          r.classList.add("swiper-button-next"),
          (r.innerHTML = t.hostEl.constructor.nextButtonSvg),
          r.part.add("button-next"),
          t.el.appendChild(r)),
        (!l || typeof l == "string") &&
          ((l = document.createElement("div")),
          l.classList.add("swiper-button-prev"),
          (l.innerHTML = t.hostEl.constructor.prevButtonSvg),
          l.part.add("button-prev"),
          t.el.appendChild(l))),
      r && (c.navigation.nextEl = r),
      l && (c.navigation.prevEl = l),
      h.init(),
      h.update()),
    i.includes("allowSlideNext") && (t.allowSlideNext = s.allowSlideNext),
    i.includes("allowSlidePrev") && (t.allowSlidePrev = s.allowSlidePrev),
    i.includes("direction") && t.changeDirection(s.direction, !1),
    (x || M) && t.loopDestroy(),
    (A || M) && t.loopCreate(),
    t.update()
}
function Sl(e, t) {
  e === void 0 && (e = {}), t === void 0 && (t = !0)
  const n = { on: {} },
    s = {},
    i = {}
  hn(n, Or), (n._emitClasses = !0), (n.init = !1)
  const r = {},
    l = wa.map((o) => o.replace(/_/, "")),
    a = Object.assign({}, e)
  return (
    Object.keys(a).forEach((o) => {
      typeof e[o] > "u" ||
        (l.indexOf(o) >= 0
          ? tn(e[o])
            ? ((n[o] = {}), (i[o] = {}), hn(n[o], e[o]), hn(i[o], e[o]))
            : ((n[o] = e[o]), (i[o] = e[o]))
          : o.search(/on[A-Z]/) === 0 && typeof e[o] == "function"
          ? t
            ? (s[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
            : (n.on[`${o[2].toLowerCase()}${o.substr(3)}`] = e[o])
          : (r[o] = e[o]))
    }),
    ["navigation", "pagination", "scrollbar"].forEach((o) => {
      n[o] === !0 && (n[o] = {}), n[o] === !1 && delete n[o]
    }),
    { params: n, passedParams: i, rest: r, events: s }
  )
}
function hh(e, t) {
  let {
    el: n,
    nextEl: s,
    prevEl: i,
    paginationEl: r,
    scrollbarEl: l,
    swiper: a,
  } = e
  Sa(t) &&
    s &&
    i &&
    ((a.params.navigation.nextEl = s),
    (a.originalParams.navigation.nextEl = s),
    (a.params.navigation.prevEl = i),
    (a.originalParams.navigation.prevEl = i)),
    Ta(t) &&
      r &&
      ((a.params.pagination.el = r), (a.originalParams.pagination.el = r)),
    Ia(t) &&
      l &&
      ((a.params.scrollbar.el = l), (a.originalParams.scrollbar.el = l)),
    a.init(n)
}
function mh(e, t, n, s, i) {
  const r = []
  if (!t) return r
  const l = (o) => {
    r.indexOf(o) < 0 && r.push(o)
  }
  if (n && s) {
    const o = s.map(i),
      u = n.map(i)
    o.join("") !== u.join("") && l("children"),
      s.length !== n.length && l("children")
  }
  return (
    wa
      .filter((o) => o[0] === "_")
      .map((o) => o.replace(/_/, ""))
      .forEach((o) => {
        if (o in e && o in t)
          if (tn(e[o]) && tn(t[o])) {
            const u = Object.keys(e[o]),
              c = Object.keys(t[o])
            u.length !== c.length
              ? l(o)
              : (u.forEach((p) => {
                  e[o][p] !== t[o][p] && l(o)
                }),
                c.forEach((p) => {
                  e[o][p] !== t[o][p] && l(o)
                }))
          } else e[o] !== t[o] && l(o)
      }),
    r
  )
}
const gh = (e) => {
  !e ||
    e.destroyed ||
    !e.params.virtual ||
    (e.params.virtual && !e.params.virtual.enabled) ||
    (e.updateSlides(),
    e.updateProgress(),
    e.updateSlidesClasses(),
    e.parallax &&
      e.params.parallax &&
      e.params.parallax.enabled &&
      e.parallax.setTranslate())
}
function or(e, t, n) {
  e === void 0 && (e = {})
  const s = [],
    i = {
      "container-start": [],
      "container-end": [],
      "wrapper-start": [],
      "wrapper-end": [],
    },
    r = (l, a) => {
      Array.isArray(l) &&
        l.forEach((o) => {
          const u = typeof o.type == "symbol"
          a === "default" && (a = "container-end"),
            u && o.children
              ? r(o.children, a)
              : o.type &&
                (o.type.name === "SwiperSlide" ||
                  o.type.name === "AsyncComponentWrapper")
              ? s.push(o)
              : i[a] && i[a].push(o)
        })
    }
  return (
    Object.keys(e).forEach((l) => {
      if (typeof e[l] != "function") return
      const a = e[l]()
      r(a, l)
    }),
    (n.value = t.value),
    (t.value = s),
    { slides: s, slots: i }
  )
}
function _h(e, t, n) {
  if (!n) return null
  const s = (c) => {
      let p = c
      return c < 0 ? (p = t.length + c) : p >= t.length && (p = p - t.length), p
    },
    i = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: r, to: l } = n,
    a = e.value.params.loop ? -t.length : 0,
    o = e.value.params.loop ? t.length * 2 : t.length,
    u = []
  for (let c = a; c < o; c += 1) c >= r && c <= l && u.push(t[s(c)])
  return u.map(
    (c) => (
      c.props || (c.props = {}),
      c.props.style || (c.props.style = {}),
      (c.props.swiperRef = e),
      (c.props.style = i),
      Ye(c.type, { ...c.props }, c.children)
    )
  )
}
const vh = {
    name: "Swiper",
    props: {
      tag: { type: String, default: "div" },
      wrapperTag: { type: String, default: "div" },
      modules: { type: Array, default: void 0 },
      init: { type: Boolean, default: void 0 },
      direction: { type: String, default: void 0 },
      oneWayMovement: { type: Boolean, default: void 0 },
      touchEventsTarget: { type: String, default: void 0 },
      initialSlide: { type: Number, default: void 0 },
      speed: { type: Number, default: void 0 },
      cssMode: { type: Boolean, default: void 0 },
      updateOnWindowResize: { type: Boolean, default: void 0 },
      resizeObserver: { type: Boolean, default: void 0 },
      nested: { type: Boolean, default: void 0 },
      focusableElements: { type: String, default: void 0 },
      width: { type: Number, default: void 0 },
      height: { type: Number, default: void 0 },
      preventInteractionOnTransition: { type: Boolean, default: void 0 },
      userAgent: { type: String, default: void 0 },
      url: { type: String, default: void 0 },
      edgeSwipeDetection: { type: [Boolean, String], default: void 0 },
      edgeSwipeThreshold: { type: Number, default: void 0 },
      autoHeight: { type: Boolean, default: void 0 },
      setWrapperSize: { type: Boolean, default: void 0 },
      virtualTranslate: { type: Boolean, default: void 0 },
      effect: { type: String, default: void 0 },
      breakpoints: { type: Object, default: void 0 },
      spaceBetween: { type: [Number, String], default: void 0 },
      slidesPerView: { type: [Number, String], default: void 0 },
      maxBackfaceHiddenSlides: { type: Number, default: void 0 },
      slidesPerGroup: { type: Number, default: void 0 },
      slidesPerGroupSkip: { type: Number, default: void 0 },
      slidesPerGroupAuto: { type: Boolean, default: void 0 },
      centeredSlides: { type: Boolean, default: void 0 },
      centeredSlidesBounds: { type: Boolean, default: void 0 },
      slidesOffsetBefore: { type: Number, default: void 0 },
      slidesOffsetAfter: { type: Number, default: void 0 },
      normalizeSlideIndex: { type: Boolean, default: void 0 },
      centerInsufficientSlides: { type: Boolean, default: void 0 },
      watchOverflow: { type: Boolean, default: void 0 },
      roundLengths: { type: Boolean, default: void 0 },
      touchRatio: { type: Number, default: void 0 },
      touchAngle: { type: Number, default: void 0 },
      simulateTouch: { type: Boolean, default: void 0 },
      shortSwipes: { type: Boolean, default: void 0 },
      longSwipes: { type: Boolean, default: void 0 },
      longSwipesRatio: { type: Number, default: void 0 },
      longSwipesMs: { type: Number, default: void 0 },
      followFinger: { type: Boolean, default: void 0 },
      allowTouchMove: { type: Boolean, default: void 0 },
      threshold: { type: Number, default: void 0 },
      touchMoveStopPropagation: { type: Boolean, default: void 0 },
      touchStartPreventDefault: { type: Boolean, default: void 0 },
      touchStartForcePreventDefault: { type: Boolean, default: void 0 },
      touchReleaseOnEdges: { type: Boolean, default: void 0 },
      uniqueNavElements: { type: Boolean, default: void 0 },
      resistance: { type: Boolean, default: void 0 },
      resistanceRatio: { type: Number, default: void 0 },
      watchSlidesProgress: { type: Boolean, default: void 0 },
      grabCursor: { type: Boolean, default: void 0 },
      preventClicks: { type: Boolean, default: void 0 },
      preventClicksPropagation: { type: Boolean, default: void 0 },
      slideToClickedSlide: { type: Boolean, default: void 0 },
      loop: { type: Boolean, default: void 0 },
      loopedSlides: { type: Number, default: void 0 },
      loopPreventsSliding: { type: Boolean, default: void 0 },
      rewind: { type: Boolean, default: void 0 },
      allowSlidePrev: { type: Boolean, default: void 0 },
      allowSlideNext: { type: Boolean, default: void 0 },
      swipeHandler: { type: Boolean, default: void 0 },
      noSwiping: { type: Boolean, default: void 0 },
      noSwipingClass: { type: String, default: void 0 },
      noSwipingSelector: { type: String, default: void 0 },
      passiveListeners: { type: Boolean, default: void 0 },
      containerModifierClass: { type: String, default: void 0 },
      slideClass: { type: String, default: void 0 },
      slideActiveClass: { type: String, default: void 0 },
      slideVisibleClass: { type: String, default: void 0 },
      slideFullyVisibleClass: { type: String, default: void 0 },
      slideBlankClass: { type: String, default: void 0 },
      slideNextClass: { type: String, default: void 0 },
      slidePrevClass: { type: String, default: void 0 },
      wrapperClass: { type: String, default: void 0 },
      lazyPreloaderClass: { type: String, default: void 0 },
      lazyPreloadPrevNext: { type: Number, default: void 0 },
      runCallbacksOnInit: { type: Boolean, default: void 0 },
      observer: { type: Boolean, default: void 0 },
      observeParents: { type: Boolean, default: void 0 },
      observeSlideChildren: { type: Boolean, default: void 0 },
      a11y: { type: [Boolean, Object], default: void 0 },
      autoplay: { type: [Boolean, Object], default: void 0 },
      controller: { type: Object, default: void 0 },
      coverflowEffect: { type: Object, default: void 0 },
      cubeEffect: { type: Object, default: void 0 },
      fadeEffect: { type: Object, default: void 0 },
      flipEffect: { type: Object, default: void 0 },
      creativeEffect: { type: Object, default: void 0 },
      cardsEffect: { type: Object, default: void 0 },
      hashNavigation: { type: [Boolean, Object], default: void 0 },
      history: { type: [Boolean, Object], default: void 0 },
      keyboard: { type: [Boolean, Object], default: void 0 },
      mousewheel: { type: [Boolean, Object], default: void 0 },
      navigation: { type: [Boolean, Object], default: void 0 },
      pagination: { type: [Boolean, Object], default: void 0 },
      parallax: { type: [Boolean, Object], default: void 0 },
      scrollbar: { type: [Boolean, Object], default: void 0 },
      thumbs: { type: Object, default: void 0 },
      virtual: { type: [Boolean, Object], default: void 0 },
      zoom: { type: [Boolean, Object], default: void 0 },
      grid: { type: [Object], default: void 0 },
      freeMode: { type: [Boolean, Object], default: void 0 },
      enabled: { type: Boolean, default: void 0 },
    },
    emits: [
      "_beforeBreakpoint",
      "_containerClasses",
      "_slideClass",
      "_slideClasses",
      "_swiper",
      "_freeModeNoMomentumRelease",
      "activeIndexChange",
      "afterInit",
      "autoplay",
      "autoplayStart",
      "autoplayStop",
      "autoplayPause",
      "autoplayResume",
      "autoplayTimeLeft",
      "beforeDestroy",
      "beforeInit",
      "beforeLoopFix",
      "beforeResize",
      "beforeSlideChangeStart",
      "beforeTransitionStart",
      "breakpoint",
      "breakpointsBase",
      "changeDirection",
      "click",
      "disable",
      "doubleTap",
      "doubleClick",
      "destroy",
      "enable",
      "fromEdge",
      "hashChange",
      "hashSet",
      "init",
      "keyPress",
      "lock",
      "loopFix",
      "momentumBounce",
      "navigationHide",
      "navigationShow",
      "navigationPrev",
      "navigationNext",
      "observerUpdate",
      "orientationchange",
      "paginationHide",
      "paginationRender",
      "paginationShow",
      "paginationUpdate",
      "progress",
      "reachBeginning",
      "reachEnd",
      "realIndexChange",
      "resize",
      "scroll",
      "scrollbarDragEnd",
      "scrollbarDragMove",
      "scrollbarDragStart",
      "setTransition",
      "setTranslate",
      "slideChange",
      "slideChangeTransitionEnd",
      "slideChangeTransitionStart",
      "slideNextTransitionEnd",
      "slideNextTransitionStart",
      "slidePrevTransitionEnd",
      "slidePrevTransitionStart",
      "slideResetTransitionStart",
      "slideResetTransitionEnd",
      "sliderMove",
      "sliderFirstMove",
      "slidesLengthChange",
      "slidesGridLengthChange",
      "snapGridLengthChange",
      "snapIndexChange",
      "swiper",
      "tap",
      "toEdge",
      "touchEnd",
      "touchMove",
      "touchMoveOpposite",
      "touchStart",
      "transitionEnd",
      "transitionStart",
      "unlock",
      "update",
      "virtualUpdate",
      "zoomChange",
    ],
    setup(e, t) {
      let { slots: n, emit: s } = t
      const { tag: i, wrapperTag: r } = e,
        l = _e("swiper"),
        a = _e(null),
        o = _e(!1),
        u = _e(!1),
        c = _e(null),
        p = _e(null),
        h = _e(null),
        g = { value: [] },
        w = { value: [] },
        E = _e(null),
        T = _e(null),
        m = _e(null),
        y = _e(null),
        { params: S, passedParams: b } = Sl(e, !1)
      or(n, g, w), (h.value = b), (w.value = g.value)
      const x = () => {
        or(n, g, w), (o.value = !0)
      }
      ;(S.onAny = function (V) {
        for (
          var D = arguments.length, F = new Array(D > 1 ? D - 1 : 0), j = 1;
          j < D;
          j++
        )
          F[j - 1] = arguments[j]
        s(V, ...F)
      }),
        Object.assign(S.on, {
          _beforeBreakpoint: x,
          _containerClasses(V, D) {
            l.value = D
          },
        })
      const A = { ...S }
      if (
        (delete A.wrapperClass,
        (p.value = new ui(A)),
        p.value.virtual && p.value.params.virtual.enabled)
      ) {
        p.value.virtual.slides = g.value
        const V = {
          cache: !1,
          slides: g.value,
          renderExternal: (D) => {
            a.value = D
          },
          renderExternalUpdate: !1,
        }
        hn(p.value.params.virtual, V), hn(p.value.originalParams.virtual, V)
      }
      ei(() => {
        !u.value && p.value && (p.value.emitSlidesClasses(), (u.value = !0))
        const { passedParams: V } = Sl(e, !1),
          D = mh(V, h.value, g.value, w.value, (F) => F.props && F.props.key)
        ;(h.value = V),
          (D.length || o.value) &&
            p.value &&
            !p.value.destroyed &&
            ph({
              swiper: p.value,
              slides: g.value,
              passedParams: V,
              changedParams: D,
              nextEl: E.value,
              prevEl: T.value,
              scrollbarEl: y.value,
              paginationEl: m.value,
            }),
          (o.value = !1)
      }),
        pn("swiper", p),
        Wt(a, () => {
          Qr(() => {
            gh(p.value)
          })
        }),
        Fs(() => {
          c.value &&
            (hh(
              {
                el: c.value,
                nextEl: E.value,
                prevEl: T.value,
                paginationEl: m.value,
                scrollbarEl: y.value,
                swiper: p.value,
              },
              S
            ),
            s("swiper", p.value))
        }),
        ti(() => {
          p.value && !p.value.destroyed && p.value.destroy(!0, !1)
        })
      function M(V) {
        return S.virtual
          ? _h(p, V, a.value)
          : (V.forEach((D, F) => {
              D.props || (D.props = {}),
                (D.props.swiperRef = p),
                (D.props.swiperSlideIndex = F)
            }),
            V)
      }
      return () => {
        const { slides: V, slots: D } = or(n, g, w)
        return Ye(i, { ref: c, class: Pa(l.value) }, [
          D["container-start"],
          Ye(r, { class: dh(S.wrapperClass) }, [
            D["wrapper-start"],
            M(V),
            D["wrapper-end"],
          ]),
          Sa(e) && [
            Ye("div", { ref: T, class: "swiper-button-prev" }),
            Ye("div", { ref: E, class: "swiper-button-next" }),
          ],
          Ia(e) && Ye("div", { ref: y, class: "swiper-scrollbar" }),
          Ta(e) && Ye("div", { ref: m, class: "swiper-pagination" }),
          D["container-end"],
        ])
      }
    },
  },
  xn = {
    name: "SwiperSlide",
    props: {
      tag: { type: String, default: "div" },
      swiperRef: { type: Object, required: !1 },
      swiperSlideIndex: { type: Number, default: void 0, required: !1 },
      zoom: { type: Boolean, default: void 0, required: !1 },
      lazy: { type: Boolean, default: !1, required: !1 },
      virtualIndex: { type: [String, Number], default: void 0 },
    },
    setup(e, t) {
      let { slots: n } = t,
        s = !1
      const { swiperRef: i } = e,
        r = _e(null),
        l = _e("swiper-slide"),
        a = _e(!1)
      function o(p, h, g) {
        h === r.value && (l.value = g)
      }
      Fs(() => {
        !i || !i.value || (i.value.on("_slideClass", o), (s = !0))
      }),
        Ho(() => {
          s || !i || !i.value || (i.value.on("_slideClass", o), (s = !0))
        }),
        ei(() => {
          !r.value ||
            !i ||
            !i.value ||
            (typeof e.swiperSlideIndex < "u" &&
              (r.value.swiperSlideIndex = e.swiperSlideIndex),
            i.value.destroyed &&
              l.value !== "swiper-slide" &&
              (l.value = "swiper-slide"))
        }),
        ti(() => {
          !i || !i.value || i.value.off("_slideClass", o)
        })
      const u = Le(() => ({
        isActive: l.value.indexOf("swiper-slide-active") >= 0,
        isVisible: l.value.indexOf("swiper-slide-visible") >= 0,
        isPrev: l.value.indexOf("swiper-slide-prev") >= 0,
        isNext: l.value.indexOf("swiper-slide-next") >= 0,
      }))
      pn("swiperSlide", u)
      const c = () => {
        a.value = !0
      }
      return () =>
        Ye(
          e.tag,
          {
            class: Pa(`${l.value}`),
            ref: r,
            "data-swiper-slide-index":
              typeof e.virtualIndex > "u" && i && i.value && i.value.params.loop
                ? e.swiperSlideIndex
                : e.virtualIndex,
            onLoadCapture: c,
          },
          e.zoom
            ? Ye(
                "div",
                {
                  class: "swiper-zoom-container",
                  "data-swiper-zoom":
                    typeof e.zoom == "number" ? e.zoom : void 0,
                },
                [
                  n.default && n.default(u.value),
                  e.lazy &&
                    !a.value &&
                    Ye("div", { class: "swiper-lazy-preloader" }),
                ]
              )
            : [
                n.default && n.default(u.value),
                e.lazy &&
                  !a.value &&
                  Ye("div", { class: "swiper-lazy-preloader" }),
              ]
        )
    },
  }
function bh(e, t, n, s) {
  return (
    e.params.createElements &&
      Object.keys(s).forEach((i) => {
        if (!n[i] && n.auto === !0) {
          let r = gt(e.el, `.${s[i]}`)[0]
          r || ((r = Is("div", s[i])), (r.className = s[i]), e.el.append(r)),
            (n[i] = r),
            (t[i] = r)
        }
      }),
    n
  )
}
function yh(e) {
  let { swiper: t, extendParams: n, on: s, emit: i } = e
  n({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (t.navigation = { nextEl: null, prevEl: null })
  const r = (E) => (Array.isArray(E) ? E : [E]).filter((T) => !!T)
  function l(E) {
    let T
    return E &&
      typeof E == "string" &&
      t.isElement &&
      ((T = t.el.querySelector(E)), T)
      ? T
      : (E &&
          (typeof E == "string" && (T = [...document.querySelectorAll(E)]),
          t.params.uniqueNavElements &&
            typeof E == "string" &&
            T.length > 1 &&
            t.el.querySelectorAll(E).length === 1 &&
            (T = t.el.querySelector(E))),
        E && !T ? E : T)
  }
  function a(E, T) {
    const m = t.params.navigation
    ;(E = r(E)),
      E.forEach((y) => {
        y &&
          (y.classList[T ? "add" : "remove"](...m.disabledClass.split(" ")),
          y.tagName === "BUTTON" && (y.disabled = T),
          t.params.watchOverflow &&
            t.enabled &&
            y.classList[t.isLocked ? "add" : "remove"](m.lockClass))
      })
  }
  function o() {
    const { nextEl: E, prevEl: T } = t.navigation
    if (t.params.loop) {
      a(T, !1), a(E, !1)
      return
    }
    a(T, t.isBeginning && !t.params.rewind), a(E, t.isEnd && !t.params.rewind)
  }
  function u(E) {
    E.preventDefault(),
      !(t.isBeginning && !t.params.loop && !t.params.rewind) &&
        (t.slidePrev(), i("navigationPrev"))
  }
  function c(E) {
    E.preventDefault(),
      !(t.isEnd && !t.params.loop && !t.params.rewind) &&
        (t.slideNext(), i("navigationNext"))
  }
  function p() {
    const E = t.params.navigation
    if (
      ((t.params.navigation = bh(
        t,
        t.originalParams.navigation,
        t.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !(E.nextEl || E.prevEl))
    )
      return
    let T = l(E.nextEl),
      m = l(E.prevEl)
    Object.assign(t.navigation, { nextEl: T, prevEl: m }),
      (T = r(T)),
      (m = r(m))
    const y = (S, b) => {
      S && S.addEventListener("click", b === "next" ? c : u),
        !t.enabled && S && S.classList.add(...E.lockClass.split(" "))
    }
    T.forEach((S) => y(S, "next")), m.forEach((S) => y(S, "prev"))
  }
  function h() {
    let { nextEl: E, prevEl: T } = t.navigation
    ;(E = r(E)), (T = r(T))
    const m = (y, S) => {
      y.removeEventListener("click", S === "next" ? c : u),
        y.classList.remove(...t.params.navigation.disabledClass.split(" "))
    }
    E.forEach((y) => m(y, "next")), T.forEach((y) => m(y, "prev"))
  }
  s("init", () => {
    t.params.navigation.enabled === !1 ? w() : (p(), o())
  }),
    s("toEdge fromEdge lock unlock", () => {
      o()
    }),
    s("destroy", () => {
      h()
    }),
    s("enable disable", () => {
      let { nextEl: E, prevEl: T } = t.navigation
      if (((E = r(E)), (T = r(T)), t.enabled)) {
        o()
        return
      }
      ;[...E, ...T]
        .filter((m) => !!m)
        .forEach((m) => m.classList.add(t.params.navigation.lockClass))
    }),
    s("click", (E, T) => {
      let { nextEl: m, prevEl: y } = t.navigation
      ;(m = r(m)), (y = r(y))
      const S = T.target
      if (t.params.navigation.hideOnClick && !y.includes(S) && !m.includes(S)) {
        if (
          t.pagination &&
          t.params.pagination &&
          t.params.pagination.clickable &&
          (t.pagination.el === S || t.pagination.el.contains(S))
        )
          return
        let b
        m.length
          ? (b = m[0].classList.contains(t.params.navigation.hiddenClass))
          : y.length &&
            (b = y[0].classList.contains(t.params.navigation.hiddenClass)),
          i(b === !0 ? "navigationShow" : "navigationHide"),
          [...m, ...y]
            .filter((x) => !!x)
            .forEach((x) => x.classList.toggle(t.params.navigation.hiddenClass))
      }
    })
  const g = () => {
      t.el.classList.remove(
        ...t.params.navigation.navigationDisabledClass.split(" ")
      ),
        p(),
        o()
    },
    w = () => {
      t.el.classList.add(
        ...t.params.navigation.navigationDisabledClass.split(" ")
      ),
        h()
    }
  Object.assign(t.navigation, {
    enable: g,
    disable: w,
    update: o,
    init: p,
    destroy: h,
  })
}
const ue = (e) => (Jn("data-v-126b77c7"), (e = e()), Qn(), e),
  Eh = { class: "wrapper" },
  wh = { class: "wrapperSlide" },
  Sh = ue(() => C("audio", { id: "zzz" }, [C("source", { src: Rd })], -1)),
  Th = ue(() =>
    C("button", { class: "pause", onclick: "zzz.pause()" }, "stop music", -1)
  ),
  Ih = { class: "slideschen slide1" },
  Ph = ue(() => C("div", { class: "arrow" }, null, -1)),
  Ch = { class: "descriptionSlide1 des" },
  Lh = ue(() => C("span", null, " SPA.", -1)),
  Oh = ue(() => C("br", null, null, -1)),
  xh = ue(() => C("br", null, null, -1)),
  Nh = ue(() => C("span", { style: { "font-family": "Hero" } }, "=з", -1)),
  Ah = ue(() =>
    C(
      "div",
      { class: "chen1" },
      [C("div", { onclick: "zzz.play()", class: "elinmain1" })],
      -1
    )
  ),
  Mh = ue(() => C("div", { class: "arrow" }, null, -1)),
  Rh = { class: "slides slide2" },
  Dh = ue(() => C("div", { class: "arrow" }, null, -1)),
  kh = { class: "descriptionSlide2 des" },
  Fh = ue(() => C("span", { style: { color: "rgb(35 116 185)" } }, "MPA", -1)),
  $h = ue(() =>
    C("span", { style: { color: "rgb(200 43 43)" } }, "contacts", -1)
  ),
  Bh = ue(() => C("span", { style: { color: "rgb(35 116 185)" } }, "home", -1)),
  Wh = ue(() =>
    C("span", { style: { color: "rgb(35 116 185)" } }, "contacts", -1)
  ),
  Hh = ue(() => C("span", { style: { color: "rgb(35 116 185)" } }, "MPA", -1)),
  Vh = ue(() => C("div", { class: "elinmain2" }, null, -1)),
  Uh = ue(() =>
    C(
      "div",
      { class: "chen2" },
      [
        C(
          "a",
          {
            href: "https://rezka.ag/animation/fiction/41055-agent-vremeni-2021.html",
            target: "_blank",
          },
          [C("div", { class: "elinmain3" })]
        ),
      ],
      -1
    )
  ),
  Gh = ue(() => C("div", { class: "arrow" }, null, -1)),
  jh = { class: "slides slide3" },
  zh = ue(() => C("div", { class: "arrow" }, null, -1)),
  Yh = { class: "group" },
  Kh = { class: "descriptionSlide3 des" },
  Xh = ue(() => C("span", { style: { color: "rgb(200, 43, 43)" } }, "SPA", -1)),
  qh = { style: { color: "rgb(35, 116, 185)" } },
  Jh = { style: { color: "rgb(35, 116, 185)" } },
  Qh = ue(() => C("div", { class: "elinmain4" }, null, -1)),
  Zh = ue(() =>
    C("div", { class: "chen3 chen" }, [C("div", { class: "elinmain5" })], -1)
  ),
  em = ue(() => C("div", { class: "arrow" }, null, -1)),
  tm = { class: "slides slide4" },
  nm = ue(() => C("div", { class: "arrow" }, null, -1)),
  sm = { class: "group" },
  rm = { class: "descriptionSlide4 des" },
  im = ue(() => C("span", { style: { color: "#a03a3a" } }, "SPA", -1)),
  lm = ue(() => C("span", { style: { color: "#a03a3a" } }, "SPA", -1)),
  om = ue(() => C("span", { style: { color: "#2c7d30" } }, "SEO", -1)),
  am = ue(() => C("span", { style: { color: "#2c587d" } }, "MPA", -1)),
  cm = ue(() => C("span", { style: { color: "#2c587d" } }, "MPA", -1)),
  um = ue(() => C("span", { style: { color: "#2c587d" } }, "MPA", -1)),
  fm = ue(() => C("span", { style: { color: "#a03a3a" } }, "SPA", -1)),
  dm = ue(() =>
    C("div", { class: "chen3 chen" }, [C("div", { class: "elinmain6" })], -1)
  ),
  pm = ue(() => C("div", { class: "arrow" }, null, -1)),
  hm = { class: "slides slide5" },
  mm = ue(() => C("div", { class: "arrow" }, null, -1)),
  gm = { class: "group" },
  _m = { class: "descriptionSlide5 des" },
  vm = ue(() => C("div", { class: "arrow" }, null, -1)),
  bm = {
    __name: "MainPage",
    setup(e) {
      const t = [yh]
      return (n, s) => (
        Ge(),
        qe("div", Eh, [
          C("div", wh, [
            be(
              tt(vh),
              { navigation: !0, modules: t, class: "mySwiper" },
              {
                default: Mt(() => [
                  be(tt(xn), null, {
                    default: Mt(() => [
                      Sh,
                      Th,
                      C("div", Ih, [
                        Ph,
                        C("div", Ch, [
                          C("span", null, re(n.$t("heyo")), 1),
                          J(" " + re(n.$t("chen")), 1),
                          Lh,
                          Oh,
                          J(" " + re(n.$t("shortDis")) + " ", 1),
                          C("ul", null, [
                            C("li", null, re(n.$t("ai1")), 1),
                            C("li", null, re(n.$t("ai2")), 1),
                            C("li", null, re(n.$t("ai3")), 1),
                            C("li", null, re(n.$t("handmade")), 1),
                          ]),
                          xh,
                          C("span", null, [J(re(n.$t("letsgo")) + " ", 1), Nh]),
                        ]),
                        Ah,
                        Mh,
                      ]),
                    ]),
                    _: 1,
                  }),
                  be(tt(xn), null, {
                    default: Mt(() => [
                      C("div", Rh, [
                        Dh,
                        C("div", kh, [
                          J(re(n.$t("sl2intro")) + " ", 1),
                          Fh,
                          J(
                            "(multiply page application) " +
                              re(n.$t("sl2dis")) +
                              " “",
                            1
                          ),
                          $h,
                          J("” " + re(n.$t("sl2dis2")) + " “", 1),
                          Bh,
                          J("” " + re(n.$t("or")) + " “", 1),
                          Wh,
                          J("” " + re(n.$t("sl2dis3")) + " ", 1),
                          Hh,
                          J(" " + re(n.$t("sl2dis4")) + " ", 1),
                          Vh,
                        ]),
                        Uh,
                        Gh,
                      ]),
                    ]),
                    _: 1,
                  }),
                  be(tt(xn), null, {
                    default: Mt(() => [
                      C("div", jh, [
                        zh,
                        C("div", Yh, [
                          C("div", Kh, [
                            Xh,
                            J(" " + re(n.$t("sl3dis")) + " “", 1),
                            C("span", qh, re(n.$t("cont")), 1),
                            J("” " + re(n.$t("or")) + " “", 1),
                            C("span", Jh, re(n.$t("abtus")), 1),
                            J("”. " + re(n.$t("sl3dis2")) + " ", 1),
                            Qh,
                          ]),
                          Zh,
                        ]),
                        em,
                      ]),
                    ]),
                    _: 1,
                  }),
                  be(tt(xn), null, {
                    default: Mt(() => [
                      C("div", tm, [
                        nm,
                        C("div", sm, [
                          C("div", rm, [
                            J(re(n.$t("sl4dis")) + " ", 1),
                            im,
                            J(" " + re(n.$t("sl4dis2")) + " ", 1),
                            lm,
                            J(" " + re(n.$t("sl4dis3")) + " ", 1),
                            om,
                            J(" " + re(n.$t("sl4dis4")) + " ", 1),
                            am,
                            J(" " + re(n.$t("sl4dis5")) + " ", 1),
                            cm,
                            J(" " + re(n.$t("sl4dis6")) + " ", 1),
                            um,
                            J(" " + re(n.$t("and")) + " ", 1),
                            fm,
                            J(" " + re(n.$t("sl4dis7")), 1),
                          ]),
                          dm,
                        ]),
                        pm,
                      ]),
                    ]),
                    _: 1,
                  }),
                  be(tt(xn), null, {
                    default: Mt(() => [
                      C("div", hm, [
                        mm,
                        C("div", gm, [C("div", _m, re(n.$t("sl5dis")), 1)]),
                        vm,
                      ]),
                    ]),
                    _: 1,
                  }),
                ]),
                _: 1,
              }
            ),
          ]),
          C("div", null, [be(jd)]),
        ])
      )
    },
  },
  ar = Ct(bm, [["__scopeId", "data-v-126b77c7"]])
const ym = {
    dialPhoneNumber() {
      const e = "tel:+7-700-524-03-01"
      window.location.href = e
    },
  },
  ts = (e) => (Jn("data-v-eaf43cfb"), (e = e()), Qn(), e),
  Em = { class: "contacts" },
  wm = { class: "contEl" },
  Sm = ts(() =>
    C("div", { class: "elimg" }, [C("div", { class: "elincont1" })], -1)
  ),
  Tm = { class: "eldata" },
  Im = ts(() => C("p", null, "Yorick Pilgrim", -1)),
  Pm = ts(() =>
    C(
      "a",
      {
        target: "_blank",
        href: "https://wa.clck.bar/7700524031?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5!%20%D0%9C%D1%8B%20%D1%83%D0%B2%D0%B8%D0%B4%D0%B5%D0%BB%D0%B8%20%D0%B2%D0%B0%D1%88%D0%B5%20%D0%BF%D0%BE%D1%80%D1%82%D1%84%D0%BE%D0%BB%D0%B8%D0%BE,%20%D0%B8%20%D1%80%D0%B5%D1%88%D0%B8%D0%BB%D0%B8%20%D0%B2%D0%B7%D1%8F%D1%82%D1%8C%20%D0%B2%D0%B0%D1%81%20%D0%BD%D0%B0%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%83!!",
      },
      " * WhatsApp: +7-700-524-03-01 ",
      -1
    )
  ),
  Cm = ts(() =>
    C(
      "a",
      { target: "_blank", href: "https://www.instagram.com/yorick_pilgrim/" },
      "* instagram: yorick_pilgrim",
      -1
    )
  ),
  Lm = ts(() =>
    C("div", { class: "ellogo" }, [C("div", { class: "elincont2" })], -1)
  )
function Om(e, t, n, s, i, r) {
  return (
    Ge(),
    qe("div", Em, [
      C("div", wm, [
        Sm,
        C("div", Tm, [
          Im,
          C(
            "p",
            {
              href: "tel:700-524-03-01",
              onClick:
                t[0] ||
                (t[0] = ff(
                  (...l) => e.dialPhoneNumber && e.dialPhoneNumber(...l),
                  ["prevent"]
                )),
            },
            " * Phone number: +7-700-524-03-01 "
          ),
          Pm,
          Cm,
        ]),
        Lm,
      ]),
    ])
  )
}
const xm = Ct(ym, [
  ["render", Om],
  ["__scopeId", "data-v-eaf43cfb"],
])
const Nm = {
    props: ["isOpen"],
    methods: {
      closePopup() {
        this.$emit("close")
      },
    },
  },
  Am = { key: 0, class: "popup-window" },
  Mm = { class: "popup-content" }
function Rm(e, t, n, s, i, r) {
  return n.isOpen
    ? (Ge(),
      qe("div", Am, [
        C("div", Mm, [
          lu(e.$slots, "default", {}, void 0, !0),
          C(
            "button",
            {
              class: "closeAl",
              onClick:
                t[0] || (t[0] = (...l) => r.closePopup && r.closePopup(...l)),
            },
            "Закрыть альбом"
          ),
        ]),
      ]))
    : Lu("", !0)
}
const Dm = Ct(Nm, [
  ["render", Rm],
  ["__scopeId", "data-v-fd2e0476"],
])
const km = "photo1",
  Fm = "photo2",
  $m = "photo3",
  Bm = "photo4",
  Wm = "photo5",
  Hm = "photo6",
  Vm = "photo7",
  Um = "photo8",
  Gm = "photo9",
  jm = "photo10",
  zm = "photo11",
  Ym = "photo12",
  Km = {
    data() {
      return { photos: [km, Fm, $m, Bm, Wm, Hm, Vm, Um, Gm, jm, zm, Ym] }
    },
    methods: {
      addPhoto(e) {
        const t = e.target.files[0]
        if (t) {
          const n = new FileReader()
          ;(n.onload = () => {
            this.photos.push(n.result)
          }),
            n.readAsDataURL(t)
        }
      },
      removePhoto(e) {
        this.photos.splice(e, 1)
      },
    },
  },
  Xm = { class: "photo-gallery" }
function qm(e, t, n, s, i, r) {
  return (
    Ge(),
    qe("div", Xm, [
      (Ge(!0),
      qe(
        ke,
        null,
        Uo(
          i.photos,
          (l, a) => (
            Ge(),
            qe("div", { key: a, class: "photo" }, [
              C("div", { class: qn([l, "photoGen"]) }, null, 2),
            ])
          )
        ),
        128
      )),
    ])
  )
}
const Jm = Ct(Km, [
  ["render", qm],
  ["__scopeId", "data-v-274a7a4a"],
])
const Qm = {
    components: { PopupWindow: Dm, PhotoGallery: Jm },
    setup() {
      const e = _e(!1)
      return {
        isPopupOpen: e,
        openPopup: () => {
          e.value = !0
        },
        closePopup: () => {
          e.value = !1
        },
      }
    },
  },
  Zm = (e) => (Jn("data-v-2e8ffbc4"), (e = e()), Qn(), e),
  eg = { class: "pinWrap" },
  tg = { class: "pins" },
  ng = Zm(() =>
    C("div", { class: "pinLogo" }, [C("div", { class: "elinpin2" })], -1)
  )
function sg(e, t, n, s, i, r) {
  const l = Ni("PhotoGallery"),
    a = Ni("PopupWindow")
  return (
    Ge(),
    qe(
      ke,
      null,
      [
        C("div", null, [
          be(
            a,
            { "is-open": s.isPopupOpen, onClose: s.closePopup },
            { default: Mt(() => [C("div", null, [be(l)])]), _: 1 },
            8,
            ["is-open", "onClose"]
          ),
        ]),
        C("div", eg, [
          C("div", tg, [
            C("div", {
              onClick:
                t[0] || (t[0] = (...o) => s.openPopup && s.openPopup(...o)),
              class: "elinpin1",
            }),
          ]),
          ng,
        ]),
      ],
      64
    )
  )
}
const rg = Ct(Qm, [
  ["render", sg],
  ["__scopeId", "data-v-2e8ffbc4"],
])
const ig = {
    data() {
      return { isAnimating: !1 }
    },
    methods: {
      toggleAnimation() {
        this.isAnimating = !this.isAnimating
      },
    },
  },
  de = (e) => (Jn("data-v-d0fe945e"), (e = e()), Qn(), e),
  lg = de(() =>
    C(
      "iframe",
      {
        class: "vidos",
        width: "560",
        height: "315",
        src: "https://www.youtube.com/embed/DHEOF_rcND8?si=r6DYek1NN_Sgj_lo",
        title: "YouTube video player",
        frameborder: "0",
        allow:
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        allowfullscreen: "",
      },
      null,
      -1
    )
  ),
  og = { class: "listWrap" },
  ag = de(() => C("p", { style: { padding: "150px 0" } }, null, -1)),
  cg = de(() => C("br", null, null, -1)),
  ug = de(() => C("br", null, null, -1)),
  fg = de(() => C("br", null, null, -1)),
  dg = de(() => C("br", null, null, -1)),
  pg = de(() => C("br", null, null, -1)),
  hg = de(() => C("br", null, null, -1)),
  mg = de(() => C("br", null, null, -1)),
  gg = de(() => C("br", null, null, -1)),
  _g = de(() => C("br", null, null, -1)),
  vg = de(() => C("br", null, null, -1)),
  bg = de(() => C("br", null, null, -1)),
  yg = de(() => C("br", null, null, -1)),
  Eg = de(() => C("br", null, null, -1)),
  wg = de(() => C("br", null, null, -1)),
  Sg = de(() => C("br", null, null, -1)),
  Tg = de(() => C("br", null, null, -1)),
  Ig = de(() => C("br", null, null, -1)),
  Pg = de(() => C("br", null, null, -1)),
  Cg = de(() => C("br", null, null, -1)),
  Lg = de(() => C("br", null, null, -1)),
  Og = de(() => C("br", null, null, -1)),
  xg = de(() => C("br", null, null, -1)),
  Ng = de(() => C("br", null, null, -1)),
  Ag = de(() => C("br", null, null, -1)),
  Mg = de(() => C("br", null, null, -1)),
  Rg = de(() => C("br", null, null, -1)),
  Dg = de(() => C("br", null, null, -1)),
  kg = de(() => C("br", null, null, -1)),
  Fg = de(() => C("br", null, null, -1)),
  $g = de(() => C("br", null, null, -1)),
  Bg = { style: { "align-self": "flex-end" } }
function Wg(e, t, n, s, i, r) {
  return (
    Ge(),
    qe(
      ke,
      null,
      [
        C(
          "div",
          {
            class: "songWrap",
            onClick:
              t[0] ||
              (t[0] = (...l) => r.toggleAnimation && r.toggleAnimation(...l)),
          },
          [
            lg,
            C("div", og, [
              C(
                "div",
                { class: qn(["lyrist", { animated: i.isAnimating }]) },
                [
                  ag,
                  J(" Alabama, Arkansas, I do love my Ma' and Pa' "),
                  cg,
                  J(" Not the way that I do love you"),
                  ug,
                  J(" Well, holy moly, me oh my, you're the apple of my eye"),
                  fg,
                  J(" Girl, I've never loved one like you"),
                  dg,
                  J(
                    " Man, oh, man, you're my best friend, I scream it to the nothingness"
                  ),
                  pg,
                  J(" There ain't nothing that I need"),
                  hg,
                  J(
                    " Well, hot and heavy pumpkin pie, chocolate candy, Jesus Christ"
                  ),
                  mg,
                  J(" Ain't nothing please me more than you"),
                  gg,
                  J(" Oh, home, let me come home"),
                  _g,
                  J(" Home is wherever I'm with you"),
                  vg,
                  J(" Oh, home, let me come home"),
                  bg,
                  J(" Home is wherever I'm with you"),
                  yg,
                  J(" La-la-la-la, take me home"),
                  Eg,
                  J(" Mother, I'm coming home"),
                  wg,
                  J(
                    " I'll follow you into the park, through the jungle, through the dark"
                  ),
                  Sg,
                  J(" Girl, I never loved one like you"),
                  Tg,
                  J(
                    " Moats and boats and waterfalls, alleyways and pay phone calls"
                  ),
                  Ig,
                  J(" I been everywhere with you"),
                  Pg,
                  J(
                    " We laugh until we think we'll die, barefoot on a summer night"
                  ),
                  Cg,
                  J(" Nothing new is sweeter than with you"),
                  Lg,
                  J(
                    " And in the streets, we run afree, like it's only you and me"
                  ),
                  Og,
                  J(" Geez, you're something to see"),
                  xg,
                  J(" Oh, home, let me come home"),
                  Ng,
                  J(" Home is whenever I'm with you"),
                  Ag,
                  J(" Oh, home, let me come home"),
                  Mg,
                  J(" Home is wherever I'm with you"),
                  Rg,
                  J(" Home, let me come home"),
                  Dg,
                  J(" Home is whenever I'm with you"),
                  kg,
                  J(" Oh, home, let me come home"),
                  Fg,
                  J(" Home is wherever I'm with you"),
                  $g,
                ],
                2
              ),
            ]),
          ]
        ),
        C("div", Bg, [
          C(
            "button",
            {
              class: "listBtn",
              onClick:
                t[1] ||
                (t[1] = (...l) => r.toggleAnimation && r.toggleAnimation(...l)),
            },
            "stop/play"
          ),
        ]),
      ],
      64
    )
  )
}
const Hg = Ct(ig, [
    ["render", Wg],
    ["__scopeId", "data-v-d0fe945e"],
  ]),
  Vg = vd({
    history: Df(),
    routes: [
      { path: "/main", component: ar, alias: "/" },
      { path: "/portfolio-1", component: ar },
      { path: "/portfolio-1", component: ar },
      { path: "/contacts", component: xm },
      { path: "/pins", component: rg },
      { path: "/song", component: Hg },
    ],
  })
/*!
 * shared v9.6.5
 * (c) 2023 kazuya kawaguchi
 * Released under the MIT License.
 */ const xr = typeof window < "u",
  Gt = (e, t = !1) => (t ? Symbol.for(e) : Symbol(e)),
  Ug = (e, t, n) => Gg({ l: e, k: t, s: n }),
  Gg = (e) =>
    JSON.stringify(e)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029")
      .replace(/\u0027/g, "\\u0027"),
  xe = (e) => typeof e == "number" && isFinite(e),
  jg = (e) => La(e) === "[object Date]",
  Ut = (e) => La(e) === "[object RegExp]",
  Hs = (e) => te(e) && Object.keys(e).length === 0,
  We = Object.assign
let Tl
const Tt = () =>
  Tl ||
  (Tl =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {})
function Il(e) {
  return e
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
const zg = Object.prototype.hasOwnProperty
function Yn(e, t) {
  return zg.call(e, t)
}
const Se = Array.isArray,
  Ie = (e) => typeof e == "function",
  G = (e) => typeof e == "string",
  oe = (e) => typeof e == "boolean",
  ge = (e) => e !== null && typeof e == "object",
  Ca = Object.prototype.toString,
  La = (e) => Ca.call(e),
  te = (e) => {
    if (!ge(e)) return !1
    const t = Object.getPrototypeOf(e)
    return t === null || t.constructor === Object
  },
  Yg = (e) =>
    e == null
      ? ""
      : Se(e) || (te(e) && e.toString === Ca)
      ? JSON.stringify(e, null, 2)
      : String(e)
function Kg(e, t = "") {
  return e.reduce((n, s, i) => (i === 0 ? n + s : n + t + s), "")
}
function fi(e) {
  let t = e
  return () => ++t
}
function Xg(e, t) {
  typeof console < "u" &&
    (console.warn("[intlify] " + e), t && console.warn(t.stack))
}
/*!
 * message-compiler v9.6.5
 * (c) 2023 kazuya kawaguchi
 * Released under the MIT License.
 */ function qg(e, t, n) {
  return { line: e, column: t, offset: n }
}
function Nr(e, t, n) {
  const s = { start: e, end: t }
  return n != null && (s.source = n), s
}
const Jg = /\{([0-9a-zA-Z]+)\}/g
function Qg(e, ...t) {
  return (
    t.length === 1 && Zg(t[0]) && (t = t[0]),
    (!t || !t.hasOwnProperty) && (t = {}),
    e.replace(Jg, (n, s) => (t.hasOwnProperty(s) ? t[s] : ""))
  )
}
const Oa = Object.assign,
  Pl = (e) => typeof e == "string",
  Zg = (e) => e !== null && typeof e == "object"
function xa(e, t = "") {
  return e.reduce((n, s, i) => (i === 0 ? n + s : n + t + s), "")
}
const Q = {
    EXPECTED_TOKEN: 1,
    INVALID_TOKEN_IN_PLACEHOLDER: 2,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
    UNKNOWN_ESCAPE_SEQUENCE: 4,
    INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
    UNBALANCED_CLOSING_BRACE: 6,
    UNTERMINATED_CLOSING_BRACE: 7,
    EMPTY_PLACEHOLDER: 8,
    NOT_ALLOW_NEST_PLACEHOLDER: 9,
    INVALID_LINKED_FORMAT: 10,
    MUST_HAVE_MESSAGES_IN_PLURAL: 11,
    UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
    UNEXPECTED_EMPTY_LINKED_KEY: 13,
    UNEXPECTED_LEXICAL_ANALYSIS: 14,
    UNHANDLED_CODEGEN_NODE_TYPE: 15,
    UNHANDLED_MINIFIER_NODE_TYPE: 16,
    __EXTEND_POINT__: 17,
  },
  e_ = {
    [Q.EXPECTED_TOKEN]: "Expected token: '{0}'",
    [Q.INVALID_TOKEN_IN_PLACEHOLDER]: "Invalid token in placeholder: '{0}'",
    [Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER]:
      "Unterminated single quote in placeholder",
    [Q.UNKNOWN_ESCAPE_SEQUENCE]: "Unknown escape sequence: \\{0}",
    [Q.INVALID_UNICODE_ESCAPE_SEQUENCE]: "Invalid unicode escape sequence: {0}",
    [Q.UNBALANCED_CLOSING_BRACE]: "Unbalanced closing brace",
    [Q.UNTERMINATED_CLOSING_BRACE]: "Unterminated closing brace",
    [Q.EMPTY_PLACEHOLDER]: "Empty placeholder",
    [Q.NOT_ALLOW_NEST_PLACEHOLDER]: "Not allowed nest placeholder",
    [Q.INVALID_LINKED_FORMAT]: "Invalid linked format",
    [Q.MUST_HAVE_MESSAGES_IN_PLURAL]: "Plural must have messages",
    [Q.UNEXPECTED_EMPTY_LINKED_MODIFIER]: "Unexpected empty linked modifier",
    [Q.UNEXPECTED_EMPTY_LINKED_KEY]: "Unexpected empty linked key",
    [Q.UNEXPECTED_LEXICAL_ANALYSIS]:
      "Unexpected lexical analysis in token: '{0}'",
    [Q.UNHANDLED_CODEGEN_NODE_TYPE]: "unhandled codegen node type: '{0}'",
    [Q.UNHANDLED_MINIFIER_NODE_TYPE]: "unhandled mimifier node type: '{0}'",
  }
function Pn(e, t, n = {}) {
  const { domain: s, messages: i, args: r } = n,
    l = Qg((i || e_)[e] || "", ...(r || [])),
    a = new SyntaxError(String(l))
  return (a.code = e), t && (a.location = t), (a.domain = s), a
}
function t_(e) {
  throw e
}
const Et = " ",
  n_ = "\r",
  ze = `
`,
  s_ = String.fromCharCode(8232),
  r_ = String.fromCharCode(8233)
function i_(e) {
  const t = e
  let n = 0,
    s = 1,
    i = 1,
    r = 0
  const l = (M) => t[M] === n_ && t[M + 1] === ze,
    a = (M) => t[M] === ze,
    o = (M) => t[M] === r_,
    u = (M) => t[M] === s_,
    c = (M) => l(M) || a(M) || o(M) || u(M),
    p = () => n,
    h = () => s,
    g = () => i,
    w = () => r,
    E = (M) => (l(M) || o(M) || u(M) ? ze : t[M]),
    T = () => E(n),
    m = () => E(n + r)
  function y() {
    return (r = 0), c(n) && (s++, (i = 0)), l(n) && n++, n++, i++, t[n]
  }
  function S() {
    return l(n + r) && r++, r++, t[n + r]
  }
  function b() {
    ;(n = 0), (s = 1), (i = 1), (r = 0)
  }
  function x(M = 0) {
    r = M
  }
  function A() {
    const M = n + r
    for (; M !== n; ) y()
    r = 0
  }
  return {
    index: p,
    line: h,
    column: g,
    peekOffset: w,
    charAt: E,
    currentChar: T,
    currentPeek: m,
    next: y,
    peek: S,
    reset: b,
    resetPeek: x,
    skipToPeek: A,
  }
}
const Nt = void 0,
  l_ = ".",
  Cl = "'",
  o_ = "tokenizer"
function a_(e, t = {}) {
  const n = t.location !== !1,
    s = i_(e),
    i = () => s.index(),
    r = () => qg(s.line(), s.column(), s.index()),
    l = r(),
    a = i(),
    o = {
      currentType: 14,
      offset: a,
      startLoc: l,
      endLoc: l,
      lastType: 14,
      lastOffset: a,
      lastStartLoc: l,
      lastEndLoc: l,
      braceNest: 0,
      inLinked: !1,
      text: "",
    },
    u = () => o,
    { onError: c } = t
  function p(f, d, _, ...I) {
    const L = u()
    if (((d.column += _), (d.offset += _), c)) {
      const R = n ? Nr(L.startLoc, d) : null,
        $ = Pn(f, R, { domain: o_, args: I })
      c($)
    }
  }
  function h(f, d, _) {
    ;(f.endLoc = r()), (f.currentType = d)
    const I = { type: d }
    return (
      n && (I.loc = Nr(f.startLoc, f.endLoc)), _ != null && (I.value = _), I
    )
  }
  const g = (f) => h(f, 14)
  function w(f, d) {
    return f.currentChar() === d
      ? (f.next(), d)
      : (p(Q.EXPECTED_TOKEN, r(), 0, d), "")
  }
  function E(f) {
    let d = ""
    for (; f.currentPeek() === Et || f.currentPeek() === ze; )
      (d += f.currentPeek()), f.peek()
    return d
  }
  function T(f) {
    const d = E(f)
    return f.skipToPeek(), d
  }
  function m(f) {
    if (f === Nt) return !1
    const d = f.charCodeAt(0)
    return (d >= 97 && d <= 122) || (d >= 65 && d <= 90) || d === 95
  }
  function y(f) {
    if (f === Nt) return !1
    const d = f.charCodeAt(0)
    return d >= 48 && d <= 57
  }
  function S(f, d) {
    const { currentType: _ } = d
    if (_ !== 2) return !1
    E(f)
    const I = m(f.currentPeek())
    return f.resetPeek(), I
  }
  function b(f, d) {
    const { currentType: _ } = d
    if (_ !== 2) return !1
    E(f)
    const I = f.currentPeek() === "-" ? f.peek() : f.currentPeek(),
      L = y(I)
    return f.resetPeek(), L
  }
  function x(f, d) {
    const { currentType: _ } = d
    if (_ !== 2) return !1
    E(f)
    const I = f.currentPeek() === Cl
    return f.resetPeek(), I
  }
  function A(f, d) {
    const { currentType: _ } = d
    if (_ !== 8) return !1
    E(f)
    const I = f.currentPeek() === "."
    return f.resetPeek(), I
  }
  function M(f, d) {
    const { currentType: _ } = d
    if (_ !== 9) return !1
    E(f)
    const I = m(f.currentPeek())
    return f.resetPeek(), I
  }
  function V(f, d) {
    const { currentType: _ } = d
    if (!(_ === 8 || _ === 12)) return !1
    E(f)
    const I = f.currentPeek() === ":"
    return f.resetPeek(), I
  }
  function D(f, d) {
    const { currentType: _ } = d
    if (_ !== 10) return !1
    const I = () => {
        const R = f.currentPeek()
        return R === "{"
          ? m(f.peek())
          : R === "@" ||
            R === "%" ||
            R === "|" ||
            R === ":" ||
            R === "." ||
            R === Et ||
            !R
          ? !1
          : R === ze
          ? (f.peek(), I())
          : m(R)
      },
      L = I()
    return f.resetPeek(), L
  }
  function F(f) {
    E(f)
    const d = f.currentPeek() === "|"
    return f.resetPeek(), d
  }
  function j(f) {
    const d = E(f),
      _ = f.currentPeek() === "%" && f.peek() === "{"
    return f.resetPeek(), { isModulo: _, hasSpace: d.length > 0 }
  }
  function X(f, d = !0) {
    const _ = (L = !1, R = "", $ = !1) => {
        const B = f.currentPeek()
        return B === "{"
          ? R === "%"
            ? !1
            : L
          : B === "@" || !B
          ? R === "%"
            ? !0
            : L
          : B === "%"
          ? (f.peek(), _(L, "%", !0))
          : B === "|"
          ? R === "%" || $
            ? !0
            : !(R === Et || R === ze)
          : B === Et
          ? (f.peek(), _(!0, Et, $))
          : B === ze
          ? (f.peek(), _(!0, ze, $))
          : !0
      },
      I = _()
    return d && f.resetPeek(), I
  }
  function z(f, d) {
    const _ = f.currentChar()
    return _ === Nt ? Nt : d(_) ? (f.next(), _) : null
  }
  function pe(f) {
    return z(f, (_) => {
      const I = _.charCodeAt(0)
      return (
        (I >= 97 && I <= 122) ||
        (I >= 65 && I <= 90) ||
        (I >= 48 && I <= 57) ||
        I === 95 ||
        I === 36
      )
    })
  }
  function ve(f) {
    return z(f, (_) => {
      const I = _.charCodeAt(0)
      return I >= 48 && I <= 57
    })
  }
  function ie(f) {
    return z(f, (_) => {
      const I = _.charCodeAt(0)
      return (
        (I >= 48 && I <= 57) || (I >= 65 && I <= 70) || (I >= 97 && I <= 102)
      )
    })
  }
  function ae(f) {
    let d = "",
      _ = ""
    for (; (d = ve(f)); ) _ += d
    return _
  }
  function se(f) {
    T(f)
    const d = f.currentChar()
    return d !== "%" && p(Q.EXPECTED_TOKEN, r(), 0, d), f.next(), "%"
  }
  function ye(f) {
    let d = ""
    for (;;) {
      const _ = f.currentChar()
      if (_ === "{" || _ === "}" || _ === "@" || _ === "|" || !_) break
      if (_ === "%")
        if (X(f)) (d += _), f.next()
        else break
      else if (_ === Et || _ === ze)
        if (X(f)) (d += _), f.next()
        else {
          if (F(f)) break
          ;(d += _), f.next()
        }
      else (d += _), f.next()
    }
    return d
  }
  function Me(f) {
    T(f)
    let d = "",
      _ = ""
    for (; (d = pe(f)); ) _ += d
    return f.currentChar() === Nt && p(Q.UNTERMINATED_CLOSING_BRACE, r(), 0), _
  }
  function Re(f) {
    T(f)
    let d = ""
    return (
      f.currentChar() === "-" ? (f.next(), (d += `-${ae(f)}`)) : (d += ae(f)),
      f.currentChar() === Nt && p(Q.UNTERMINATED_CLOSING_BRACE, r(), 0),
      d
    )
  }
  function Pe(f) {
    T(f), w(f, "'")
    let d = "",
      _ = ""
    const I = (R) => R !== Cl && R !== ze
    for (; (d = z(f, I)); ) d === "\\" ? (_ += st(f)) : (_ += d)
    const L = f.currentChar()
    return L === ze || L === Nt
      ? (p(Q.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, r(), 0),
        L === ze && (f.next(), w(f, "'")),
        _)
      : (w(f, "'"), _)
  }
  function st(f) {
    const d = f.currentChar()
    switch (d) {
      case "\\":
      case "'":
        return f.next(), `\\${d}`
      case "u":
        return Qe(f, d, 4)
      case "U":
        return Qe(f, d, 6)
      default:
        return p(Q.UNKNOWN_ESCAPE_SEQUENCE, r(), 0, d), ""
    }
  }
  function Qe(f, d, _) {
    w(f, d)
    let I = ""
    for (let L = 0; L < _; L++) {
      const R = ie(f)
      if (!R) {
        p(
          Q.INVALID_UNICODE_ESCAPE_SEQUENCE,
          r(),
          0,
          `\\${d}${I}${f.currentChar()}`
        )
        break
      }
      I += R
    }
    return `\\${d}${I}`
  }
  function bt(f) {
    T(f)
    let d = "",
      _ = ""
    const I = (L) => L !== "{" && L !== "}" && L !== Et && L !== ze
    for (; (d = z(f, I)); ) _ += d
    return _
  }
  function Ce(f) {
    let d = "",
      _ = ""
    for (; (d = pe(f)); ) _ += d
    return _
  }
  function N(f) {
    const d = (_ = !1, I) => {
      const L = f.currentChar()
      return L === "{" ||
        L === "%" ||
        L === "@" ||
        L === "|" ||
        L === "(" ||
        L === ")" ||
        !L ||
        L === Et
        ? I
        : L === ze || L === l_
        ? ((I += L), f.next(), d(_, I))
        : ((I += L), f.next(), d(!0, I))
    }
    return d(!1, "")
  }
  function U(f) {
    T(f)
    const d = w(f, "|")
    return T(f), d
  }
  function W(f, d) {
    let _ = null
    switch (f.currentChar()) {
      case "{":
        return (
          d.braceNest >= 1 && p(Q.NOT_ALLOW_NEST_PLACEHOLDER, r(), 0),
          f.next(),
          (_ = h(d, 2, "{")),
          T(f),
          d.braceNest++,
          _
        )
      case "}":
        return (
          d.braceNest > 0 &&
            d.currentType === 2 &&
            p(Q.EMPTY_PLACEHOLDER, r(), 0),
          f.next(),
          (_ = h(d, 3, "}")),
          d.braceNest--,
          d.braceNest > 0 && T(f),
          d.inLinked && d.braceNest === 0 && (d.inLinked = !1),
          _
        )
      case "@":
        return (
          d.braceNest > 0 && p(Q.UNTERMINATED_CLOSING_BRACE, r(), 0),
          (_ = Y(f, d) || g(d)),
          (d.braceNest = 0),
          _
        )
      default:
        let L = !0,
          R = !0,
          $ = !0
        if (F(f))
          return (
            d.braceNest > 0 && p(Q.UNTERMINATED_CLOSING_BRACE, r(), 0),
            (_ = h(d, 1, U(f))),
            (d.braceNest = 0),
            (d.inLinked = !1),
            _
          )
        if (
          d.braceNest > 0 &&
          (d.currentType === 5 || d.currentType === 6 || d.currentType === 7)
        )
          return (
            p(Q.UNTERMINATED_CLOSING_BRACE, r(), 0), (d.braceNest = 0), le(f, d)
          )
        if ((L = S(f, d))) return (_ = h(d, 5, Me(f))), T(f), _
        if ((R = b(f, d))) return (_ = h(d, 6, Re(f))), T(f), _
        if (($ = x(f, d))) return (_ = h(d, 7, Pe(f))), T(f), _
        if (!L && !R && !$)
          return (
            (_ = h(d, 13, bt(f))),
            p(Q.INVALID_TOKEN_IN_PLACEHOLDER, r(), 0, _.value),
            T(f),
            _
          )
        break
    }
    return _
  }
  function Y(f, d) {
    const { currentType: _ } = d
    let I = null
    const L = f.currentChar()
    switch (
      ((_ === 8 || _ === 9 || _ === 12 || _ === 10) &&
        (L === ze || L === Et) &&
        p(Q.INVALID_LINKED_FORMAT, r(), 0),
      L)
    ) {
      case "@":
        return f.next(), (I = h(d, 8, "@")), (d.inLinked = !0), I
      case ".":
        return T(f), f.next(), h(d, 9, ".")
      case ":":
        return T(f), f.next(), h(d, 10, ":")
      default:
        return F(f)
          ? ((I = h(d, 1, U(f))), (d.braceNest = 0), (d.inLinked = !1), I)
          : A(f, d) || V(f, d)
          ? (T(f), Y(f, d))
          : M(f, d)
          ? (T(f), h(d, 12, Ce(f)))
          : D(f, d)
          ? (T(f), L === "{" ? W(f, d) || I : h(d, 11, N(f)))
          : (_ === 8 && p(Q.INVALID_LINKED_FORMAT, r(), 0),
            (d.braceNest = 0),
            (d.inLinked = !1),
            le(f, d))
    }
  }
  function le(f, d) {
    let _ = { type: 14 }
    if (d.braceNest > 0) return W(f, d) || g(d)
    if (d.inLinked) return Y(f, d) || g(d)
    switch (f.currentChar()) {
      case "{":
        return W(f, d) || g(d)
      case "}":
        return p(Q.UNBALANCED_CLOSING_BRACE, r(), 0), f.next(), h(d, 3, "}")
      case "@":
        return Y(f, d) || g(d)
      default:
        if (F(f))
          return (_ = h(d, 1, U(f))), (d.braceNest = 0), (d.inLinked = !1), _
        const { isModulo: L, hasSpace: R } = j(f)
        if (L) return R ? h(d, 0, ye(f)) : h(d, 4, se(f))
        if (X(f)) return h(d, 0, ye(f))
        break
    }
    return _
  }
  function v() {
    const { currentType: f, offset: d, startLoc: _, endLoc: I } = o
    return (
      (o.lastType = f),
      (o.lastOffset = d),
      (o.lastStartLoc = _),
      (o.lastEndLoc = I),
      (o.offset = i()),
      (o.startLoc = r()),
      s.currentChar() === Nt ? h(o, 14) : le(s, o)
    )
  }
  return { nextToken: v, currentOffset: i, currentPosition: r, context: u }
}
const c_ = "parser",
  u_ = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g
function f_(e, t, n) {
  switch (e) {
    case "\\\\":
      return "\\"
    case "\\'":
      return "'"
    default: {
      const s = parseInt(t || n, 16)
      return s <= 55295 || s >= 57344 ? String.fromCodePoint(s) : "�"
    }
  }
}
function d_(e = {}) {
  const t = e.location !== !1,
    { onError: n } = e
  function s(m, y, S, b, ...x) {
    const A = m.currentPosition()
    if (((A.offset += b), (A.column += b), n)) {
      const M = t ? Nr(S, A) : null,
        V = Pn(y, M, { domain: c_, args: x })
      n(V)
    }
  }
  function i(m, y, S) {
    const b = { type: m }
    return t && ((b.start = y), (b.end = y), (b.loc = { start: S, end: S })), b
  }
  function r(m, y, S, b) {
    b && (m.type = b), t && ((m.end = y), m.loc && (m.loc.end = S))
  }
  function l(m, y) {
    const S = m.context(),
      b = i(3, S.offset, S.startLoc)
    return (b.value = y), r(b, m.currentOffset(), m.currentPosition()), b
  }
  function a(m, y) {
    const S = m.context(),
      { lastOffset: b, lastStartLoc: x } = S,
      A = i(5, b, x)
    return (
      (A.index = parseInt(y, 10)),
      m.nextToken(),
      r(A, m.currentOffset(), m.currentPosition()),
      A
    )
  }
  function o(m, y) {
    const S = m.context(),
      { lastOffset: b, lastStartLoc: x } = S,
      A = i(4, b, x)
    return (
      (A.key = y),
      m.nextToken(),
      r(A, m.currentOffset(), m.currentPosition()),
      A
    )
  }
  function u(m, y) {
    const S = m.context(),
      { lastOffset: b, lastStartLoc: x } = S,
      A = i(9, b, x)
    return (
      (A.value = y.replace(u_, f_)),
      m.nextToken(),
      r(A, m.currentOffset(), m.currentPosition()),
      A
    )
  }
  function c(m) {
    const y = m.nextToken(),
      S = m.context(),
      { lastOffset: b, lastStartLoc: x } = S,
      A = i(8, b, x)
    return y.type !== 12
      ? (s(m, Q.UNEXPECTED_EMPTY_LINKED_MODIFIER, S.lastStartLoc, 0),
        (A.value = ""),
        r(A, b, x),
        { nextConsumeToken: y, node: A })
      : (y.value == null &&
          s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, S.lastStartLoc, 0, pt(y)),
        (A.value = y.value || ""),
        r(A, m.currentOffset(), m.currentPosition()),
        { node: A })
  }
  function p(m, y) {
    const S = m.context(),
      b = i(7, S.offset, S.startLoc)
    return (b.value = y), r(b, m.currentOffset(), m.currentPosition()), b
  }
  function h(m) {
    const y = m.context(),
      S = i(6, y.offset, y.startLoc)
    let b = m.nextToken()
    if (b.type === 9) {
      const x = c(m)
      ;(S.modifier = x.node), (b = x.nextConsumeToken || m.nextToken())
    }
    switch (
      (b.type !== 10 &&
        s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(b)),
      (b = m.nextToken()),
      b.type === 2 && (b = m.nextToken()),
      b.type)
    ) {
      case 11:
        b.value == null &&
          s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(b)),
          (S.key = p(m, b.value || ""))
        break
      case 5:
        b.value == null &&
          s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(b)),
          (S.key = o(m, b.value || ""))
        break
      case 6:
        b.value == null &&
          s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(b)),
          (S.key = a(m, b.value || ""))
        break
      case 7:
        b.value == null &&
          s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(b)),
          (S.key = u(m, b.value || ""))
        break
      default:
        s(m, Q.UNEXPECTED_EMPTY_LINKED_KEY, y.lastStartLoc, 0)
        const x = m.context(),
          A = i(7, x.offset, x.startLoc)
        return (
          (A.value = ""),
          r(A, x.offset, x.startLoc),
          (S.key = A),
          r(S, x.offset, x.startLoc),
          { nextConsumeToken: b, node: S }
        )
    }
    return r(S, m.currentOffset(), m.currentPosition()), { node: S }
  }
  function g(m) {
    const y = m.context(),
      S = y.currentType === 1 ? m.currentOffset() : y.offset,
      b = y.currentType === 1 ? y.endLoc : y.startLoc,
      x = i(2, S, b)
    x.items = []
    let A = null
    do {
      const D = A || m.nextToken()
      switch (((A = null), D.type)) {
        case 0:
          D.value == null &&
            s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(D)),
            x.items.push(l(m, D.value || ""))
          break
        case 6:
          D.value == null &&
            s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(D)),
            x.items.push(a(m, D.value || ""))
          break
        case 5:
          D.value == null &&
            s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(D)),
            x.items.push(o(m, D.value || ""))
          break
        case 7:
          D.value == null &&
            s(m, Q.UNEXPECTED_LEXICAL_ANALYSIS, y.lastStartLoc, 0, pt(D)),
            x.items.push(u(m, D.value || ""))
          break
        case 8:
          const F = h(m)
          x.items.push(F.node), (A = F.nextConsumeToken || null)
          break
      }
    } while (y.currentType !== 14 && y.currentType !== 1)
    const M = y.currentType === 1 ? y.lastOffset : m.currentOffset(),
      V = y.currentType === 1 ? y.lastEndLoc : m.currentPosition()
    return r(x, M, V), x
  }
  function w(m, y, S, b) {
    const x = m.context()
    let A = b.items.length === 0
    const M = i(1, y, S)
    ;(M.cases = []), M.cases.push(b)
    do {
      const V = g(m)
      A || (A = V.items.length === 0), M.cases.push(V)
    } while (x.currentType !== 14)
    return (
      A && s(m, Q.MUST_HAVE_MESSAGES_IN_PLURAL, S, 0),
      r(M, m.currentOffset(), m.currentPosition()),
      M
    )
  }
  function E(m) {
    const y = m.context(),
      { offset: S, startLoc: b } = y,
      x = g(m)
    return y.currentType === 14 ? x : w(m, S, b, x)
  }
  function T(m) {
    const y = a_(m, Oa({}, e)),
      S = y.context(),
      b = i(0, S.offset, S.startLoc)
    return (
      t && b.loc && (b.loc.source = m),
      (b.body = E(y)),
      e.onCacheKey && (b.cacheKey = e.onCacheKey(m)),
      S.currentType !== 14 &&
        s(
          y,
          Q.UNEXPECTED_LEXICAL_ANALYSIS,
          S.lastStartLoc,
          0,
          m[S.offset] || ""
        ),
      r(b, y.currentOffset(), y.currentPosition()),
      b
    )
  }
  return { parse: T }
}
function pt(e) {
  if (e.type === 14) return "EOF"
  const t = (e.value || "").replace(/\r?\n/gu, "\\n")
  return t.length > 10 ? t.slice(0, 9) + "…" : t
}
function p_(e, t = {}) {
  const n = { ast: e, helpers: new Set() }
  return { context: () => n, helper: (r) => (n.helpers.add(r), r) }
}
function Ll(e, t) {
  for (let n = 0; n < e.length; n++) di(e[n], t)
}
function di(e, t) {
  switch (e.type) {
    case 1:
      Ll(e.cases, t), t.helper("plural")
      break
    case 2:
      Ll(e.items, t)
      break
    case 6:
      di(e.key, t), t.helper("linked"), t.helper("type")
      break
    case 5:
      t.helper("interpolate"), t.helper("list")
      break
    case 4:
      t.helper("interpolate"), t.helper("named")
      break
  }
}
function h_(e, t = {}) {
  const n = p_(e)
  n.helper("normalize"), e.body && di(e.body, n)
  const s = n.context()
  e.helpers = Array.from(s.helpers)
}
function m_(e) {
  const t = e.body
  return t.type === 2 ? Ol(t) : t.cases.forEach((n) => Ol(n)), e
}
function Ol(e) {
  if (e.items.length === 1) {
    const t = e.items[0]
    ;(t.type === 3 || t.type === 9) && ((e.static = t.value), delete t.value)
  } else {
    const t = []
    for (let n = 0; n < e.items.length; n++) {
      const s = e.items[n]
      if (!(s.type === 3 || s.type === 9) || s.value == null) break
      t.push(s.value)
    }
    if (t.length === e.items.length) {
      e.static = xa(t)
      for (let n = 0; n < e.items.length; n++) {
        const s = e.items[n]
        ;(s.type === 3 || s.type === 9) && delete s.value
      }
    }
  }
}
const g_ = "minifier"
function on(e) {
  switch (((e.t = e.type), e.type)) {
    case 0:
      const t = e
      on(t.body), (t.b = t.body), delete t.body
      break
    case 1:
      const n = e,
        s = n.cases
      for (let c = 0; c < s.length; c++) on(s[c])
      ;(n.c = s), delete n.cases
      break
    case 2:
      const i = e,
        r = i.items
      for (let c = 0; c < r.length; c++) on(r[c])
      ;(i.i = r),
        delete i.items,
        i.static && ((i.s = i.static), delete i.static)
      break
    case 3:
    case 9:
    case 8:
    case 7:
      const l = e
      l.value && ((l.v = l.value), delete l.value)
      break
    case 6:
      const a = e
      on(a.key),
        (a.k = a.key),
        delete a.key,
        a.modifier && (on(a.modifier), (a.m = a.modifier), delete a.modifier)
      break
    case 5:
      const o = e
      ;(o.i = o.index), delete o.index
      break
    case 4:
      const u = e
      ;(u.k = u.key), delete u.key
      break
    default:
      throw Pn(Q.UNHANDLED_MINIFIER_NODE_TYPE, null, {
        domain: g_,
        args: [e.type],
      })
  }
  delete e.type
}
const __ = "parser"
function v_(e, t) {
  const { sourceMap: n, filename: s, breakLineCode: i, needIndent: r } = t,
    l = t.location !== !1,
    a = {
      filename: s,
      code: "",
      column: 1,
      line: 1,
      offset: 0,
      map: void 0,
      breakLineCode: i,
      needIndent: r,
      indentLevel: 0,
    }
  l && e.loc && (a.source = e.loc.source)
  const o = () => a
  function u(T, m) {
    a.code += T
  }
  function c(T, m = !0) {
    const y = m ? i : ""
    u(r ? y + "  ".repeat(T) : y)
  }
  function p(T = !0) {
    const m = ++a.indentLevel
    T && c(m)
  }
  function h(T = !0) {
    const m = --a.indentLevel
    T && c(m)
  }
  function g() {
    c(a.indentLevel)
  }
  return {
    context: o,
    push: u,
    indent: p,
    deindent: h,
    newline: g,
    helper: (T) => `_${T}`,
    needIndent: () => a.needIndent,
  }
}
function b_(e, t) {
  const { helper: n } = e
  e.push(`${n("linked")}(`),
    yn(e, t.key),
    t.modifier
      ? (e.push(", "), yn(e, t.modifier), e.push(", _type"))
      : e.push(", undefined, _type"),
    e.push(")")
}
function y_(e, t) {
  const { helper: n, needIndent: s } = e
  e.push(`${n("normalize")}([`), e.indent(s())
  const i = t.items.length
  for (let r = 0; r < i && (yn(e, t.items[r]), r !== i - 1); r++) e.push(", ")
  e.deindent(s()), e.push("])")
}
function E_(e, t) {
  const { helper: n, needIndent: s } = e
  if (t.cases.length > 1) {
    e.push(`${n("plural")}([`), e.indent(s())
    const i = t.cases.length
    for (let r = 0; r < i && (yn(e, t.cases[r]), r !== i - 1); r++) e.push(", ")
    e.deindent(s()), e.push("])")
  }
}
function w_(e, t) {
  t.body ? yn(e, t.body) : e.push("null")
}
function yn(e, t) {
  const { helper: n } = e
  switch (t.type) {
    case 0:
      w_(e, t)
      break
    case 1:
      E_(e, t)
      break
    case 2:
      y_(e, t)
      break
    case 6:
      b_(e, t)
      break
    case 8:
      e.push(JSON.stringify(t.value), t)
      break
    case 7:
      e.push(JSON.stringify(t.value), t)
      break
    case 5:
      e.push(`${n("interpolate")}(${n("list")}(${t.index}))`, t)
      break
    case 4:
      e.push(`${n("interpolate")}(${n("named")}(${JSON.stringify(t.key)}))`, t)
      break
    case 9:
      e.push(JSON.stringify(t.value), t)
      break
    case 3:
      e.push(JSON.stringify(t.value), t)
      break
    default:
      throw Pn(Q.UNHANDLED_CODEGEN_NODE_TYPE, null, {
        domain: __,
        args: [t.type],
      })
  }
}
const S_ = (e, t = {}) => {
  const n = Pl(t.mode) ? t.mode : "normal",
    s = Pl(t.filename) ? t.filename : "message.intl",
    i = !!t.sourceMap,
    r =
      t.breakLineCode != null
        ? t.breakLineCode
        : n === "arrow"
        ? ";"
        : `
`,
    l = t.needIndent ? t.needIndent : n !== "arrow",
    a = e.helpers || [],
    o = v_(e, {
      mode: n,
      filename: s,
      sourceMap: i,
      breakLineCode: r,
      needIndent: l,
    })
  o.push(n === "normal" ? "function __msg__ (ctx) {" : "(ctx) => {"),
    o.indent(l),
    a.length > 0 &&
      (o.push(
        `const { ${xa(
          a.map((p) => `${p}: _${p}`),
          ", "
        )} } = ctx`
      ),
      o.newline()),
    o.push("return "),
    yn(o, e),
    o.deindent(l),
    o.push("}"),
    delete e.helpers
  const { code: u, map: c } = o.context()
  return { ast: e, code: u, map: c ? c.toJSON() : void 0 }
}
function T_(e, t = {}) {
  const n = Oa({}, t),
    s = !!n.jit,
    i = !!n.minify,
    r = n.optimize == null ? !0 : n.optimize,
    a = d_(n).parse(e)
  return s
    ? (r && m_(a), i && on(a), { ast: a, code: "" })
    : (h_(a, n), S_(a, n))
}
/*!
 * core-base v9.6.5
 * (c) 2023 kazuya kawaguchi
 * Released under the MIT License.
 */ function I_() {
  typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
    (Tt().__INTLIFY_PROD_DEVTOOLS__ = !1),
    typeof __INTLIFY_JIT_COMPILATION__ != "boolean" &&
      (Tt().__INTLIFY_JIT_COMPILATION__ = !1),
    typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" &&
      (Tt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1)
}
const jt = []
jt[0] = { w: [0], i: [3, 0], "[": [4], o: [7] }
jt[1] = { w: [1], ".": [2], "[": [4], o: [7] }
jt[2] = { w: [2], i: [3, 0], 0: [3, 0] }
jt[3] = { i: [3, 0], 0: [3, 0], w: [1, 1], ".": [2, 1], "[": [4, 1], o: [7, 1] }
jt[4] = { "'": [5, 0], '"': [6, 0], "[": [4, 2], "]": [1, 3], o: 8, l: [4, 0] }
jt[5] = { "'": [4, 0], o: 8, l: [5, 0] }
jt[6] = { '"': [4, 0], o: 8, l: [6, 0] }
const P_ = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/
function C_(e) {
  return P_.test(e)
}
function L_(e) {
  const t = e.charCodeAt(0),
    n = e.charCodeAt(e.length - 1)
  return t === n && (t === 34 || t === 39) ? e.slice(1, -1) : e
}
function O_(e) {
  if (e == null) return "o"
  switch (e.charCodeAt(0)) {
    case 91:
    case 93:
    case 46:
    case 34:
    case 39:
      return e
    case 95:
    case 36:
    case 45:
      return "i"
    case 9:
    case 10:
    case 13:
    case 160:
    case 65279:
    case 8232:
    case 8233:
      return "w"
  }
  return "i"
}
function x_(e) {
  const t = e.trim()
  return e.charAt(0) === "0" && isNaN(parseInt(e))
    ? !1
    : C_(t)
    ? L_(t)
    : "*" + t
}
function N_(e) {
  const t = []
  let n = -1,
    s = 0,
    i = 0,
    r,
    l,
    a,
    o,
    u,
    c,
    p
  const h = []
  ;(h[0] = () => {
    l === void 0 ? (l = a) : (l += a)
  }),
    (h[1] = () => {
      l !== void 0 && (t.push(l), (l = void 0))
    }),
    (h[2] = () => {
      h[0](), i++
    }),
    (h[3] = () => {
      if (i > 0) i--, (s = 4), h[0]()
      else {
        if (((i = 0), l === void 0 || ((l = x_(l)), l === !1))) return !1
        h[1]()
      }
    })
  function g() {
    const w = e[n + 1]
    if ((s === 5 && w === "'") || (s === 6 && w === '"'))
      return n++, (a = "\\" + w), h[0](), !0
  }
  for (; s !== null; )
    if ((n++, (r = e[n]), !(r === "\\" && g()))) {
      if (
        ((o = O_(r)),
        (p = jt[s]),
        (u = p[o] || p.l || 8),
        u === 8 ||
          ((s = u[0]),
          u[1] !== void 0 && ((c = h[u[1]]), c && ((a = r), c() === !1))))
      )
        return
      if (s === 7) return t
    }
}
const xl = new Map()
function A_(e, t) {
  return ge(e) ? e[t] : null
}
function M_(e, t) {
  if (!ge(e)) return null
  let n = xl.get(t)
  if ((n || ((n = N_(t)), n && xl.set(t, n)), !n)) return null
  const s = n.length
  let i = e,
    r = 0
  for (; r < s; ) {
    const l = i[n[r]]
    if (l === void 0 || Ie(i)) return null
    ;(i = l), r++
  }
  return i
}
const R_ = (e) => e,
  D_ = (e) => "",
  k_ = "text",
  F_ = (e) => (e.length === 0 ? "" : Kg(e)),
  $_ = Yg
function Nl(e, t) {
  return (
    (e = Math.abs(e)),
    t === 2 ? (e ? (e > 1 ? 1 : 0) : 1) : e ? Math.min(e, 2) : 0
  )
}
function B_(e) {
  const t = xe(e.pluralIndex) ? e.pluralIndex : -1
  return e.named && (xe(e.named.count) || xe(e.named.n))
    ? xe(e.named.count)
      ? e.named.count
      : xe(e.named.n)
      ? e.named.n
      : t
    : t
}
function W_(e, t) {
  t.count || (t.count = e), t.n || (t.n = e)
}
function H_(e = {}) {
  const t = e.locale,
    n = B_(e),
    s =
      ge(e.pluralRules) && G(t) && Ie(e.pluralRules[t]) ? e.pluralRules[t] : Nl,
    i = ge(e.pluralRules) && G(t) && Ie(e.pluralRules[t]) ? Nl : void 0,
    r = (m) => m[s(n, m.length, i)],
    l = e.list || [],
    a = (m) => l[m],
    o = e.named || {}
  xe(e.pluralIndex) && W_(n, o)
  const u = (m) => o[m]
  function c(m) {
    const y = Ie(e.messages)
      ? e.messages(m)
      : ge(e.messages)
      ? e.messages[m]
      : !1
    return y || (e.parent ? e.parent.message(m) : D_)
  }
  const p = (m) => (e.modifiers ? e.modifiers[m] : R_),
    h =
      te(e.processor) && Ie(e.processor.normalize) ? e.processor.normalize : F_,
    g =
      te(e.processor) && Ie(e.processor.interpolate)
        ? e.processor.interpolate
        : $_,
    w = te(e.processor) && G(e.processor.type) ? e.processor.type : k_,
    T = {
      list: a,
      named: u,
      plural: r,
      linked: (m, ...y) => {
        const [S, b] = y
        let x = "text",
          A = ""
        y.length === 1
          ? ge(S)
            ? ((A = S.modifier || A), (x = S.type || x))
            : G(S) && (A = S || A)
          : y.length === 2 && (G(S) && (A = S || A), G(b) && (x = b || x))
        const M = c(m)(T),
          V = x === "vnode" && Se(M) && A ? M[0] : M
        return A ? p(A)(V, x) : V
      },
      message: c,
      type: w,
      interpolate: g,
      normalize: h,
      values: We({}, l, o),
    }
  return T
}
let Kn = null
function V_(e) {
  Kn = e
}
function U_(e, t, n) {
  Kn &&
    Kn.emit("i18n:init", {
      timestamp: Date.now(),
      i18n: e,
      version: t,
      meta: n,
    })
}
const G_ = j_("function:translate")
function j_(e) {
  return (t) => Kn && Kn.emit(e, t)
}
const z_ = {
  NOT_FOUND_KEY: 1,
  FALLBACK_TO_TRANSLATE: 2,
  CANNOT_FORMAT_NUMBER: 3,
  FALLBACK_TO_NUMBER_FORMAT: 4,
  CANNOT_FORMAT_DATE: 5,
  FALLBACK_TO_DATE_FORMAT: 6,
  EXPERIMENTAL_CUSTOM_MESSAGE_COMPILER: 7,
  __EXTEND_POINT__: 8,
}
function pi(e, t) {
  return t.locale != null ? Al(t.locale) : Al(e.locale)
}
let cr
function Al(e) {
  return G(e) ? e : cr != null && e.resolvedOnce ? cr : (cr = e())
}
function Y_(e, t, n) {
  return [
    ...new Set([n, ...(Se(t) ? t : ge(t) ? Object.keys(t) : G(t) ? [t] : [n])]),
  ]
}
function Na(e, t, n) {
  const s = G(n) ? n : En,
    i = e
  i.__localeChainCache || (i.__localeChainCache = new Map())
  let r = i.__localeChainCache.get(s)
  if (!r) {
    r = []
    let l = [n]
    for (; Se(l); ) l = Ml(r, l, t)
    const a = Se(t) || !te(t) ? t : t.default ? t.default : null
    ;(l = G(a) ? [a] : a), Se(l) && Ml(r, l, !1), i.__localeChainCache.set(s, r)
  }
  return r
}
function Ml(e, t, n) {
  let s = !0
  for (let i = 0; i < t.length && oe(s); i++) {
    const r = t[i]
    G(r) && (s = K_(e, t[i], n))
  }
  return s
}
function K_(e, t, n) {
  let s
  const i = t.split("-")
  do {
    const r = i.join("-")
    ;(s = X_(e, r, n)), i.splice(-1, 1)
  } while (i.length && s === !0)
  return s
}
function X_(e, t, n) {
  let s = !1
  if (!e.includes(t) && ((s = !0), t)) {
    s = t[t.length - 1] !== "!"
    const i = t.replace(/!/g, "")
    e.push(i), (Se(n) || te(n)) && n[i] && (s = n[i])
  }
  return s
}
const q_ = "9.6.5",
  Vs = -1,
  En = "en-US",
  Rl = "",
  Dl = (e) => `${e.charAt(0).toLocaleUpperCase()}${e.substr(1)}`
function J_() {
  return {
    upper: (e, t) =>
      t === "text" && G(e)
        ? e.toUpperCase()
        : t === "vnode" && ge(e) && "__v_isVNode" in e
        ? e.children.toUpperCase()
        : e,
    lower: (e, t) =>
      t === "text" && G(e)
        ? e.toLowerCase()
        : t === "vnode" && ge(e) && "__v_isVNode" in e
        ? e.children.toLowerCase()
        : e,
    capitalize: (e, t) =>
      t === "text" && G(e)
        ? Dl(e)
        : t === "vnode" && ge(e) && "__v_isVNode" in e
        ? Dl(e.children)
        : e,
  }
}
let Aa
function kl(e) {
  Aa = e
}
let Ma
function Q_(e) {
  Ma = e
}
let Ra
function Z_(e) {
  Ra = e
}
let Da = null
const ev = (e) => {
    Da = e
  },
  tv = () => Da
let ka = null
const Fl = (e) => {
    ka = e
  },
  nv = () => ka
let $l = 0
function sv(e = {}) {
  const t = Ie(e.onWarn) ? e.onWarn : Xg,
    n = G(e.version) ? e.version : q_,
    s = G(e.locale) || Ie(e.locale) ? e.locale : En,
    i = Ie(s) ? En : s,
    r =
      Se(e.fallbackLocale) ||
      te(e.fallbackLocale) ||
      G(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : i,
    l = te(e.messages) ? e.messages : { [i]: {} },
    a = te(e.datetimeFormats) ? e.datetimeFormats : { [i]: {} },
    o = te(e.numberFormats) ? e.numberFormats : { [i]: {} },
    u = We({}, e.modifiers || {}, J_()),
    c = e.pluralRules || {},
    p = Ie(e.missing) ? e.missing : null,
    h = oe(e.missingWarn) || Ut(e.missingWarn) ? e.missingWarn : !0,
    g = oe(e.fallbackWarn) || Ut(e.fallbackWarn) ? e.fallbackWarn : !0,
    w = !!e.fallbackFormat,
    E = !!e.unresolving,
    T = Ie(e.postTranslation) ? e.postTranslation : null,
    m = te(e.processor) ? e.processor : null,
    y = oe(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    S = !!e.escapeParameter,
    b = Ie(e.messageCompiler) ? e.messageCompiler : Aa,
    x = Ie(e.messageResolver) ? e.messageResolver : Ma || A_,
    A = Ie(e.localeFallbacker) ? e.localeFallbacker : Ra || Y_,
    M = ge(e.fallbackContext) ? e.fallbackContext : void 0,
    V = e,
    D = ge(V.__datetimeFormatters) ? V.__datetimeFormatters : new Map(),
    F = ge(V.__numberFormatters) ? V.__numberFormatters : new Map(),
    j = ge(V.__meta) ? V.__meta : {}
  $l++
  const X = {
    version: n,
    cid: $l,
    locale: s,
    fallbackLocale: r,
    messages: l,
    modifiers: u,
    pluralRules: c,
    missing: p,
    missingWarn: h,
    fallbackWarn: g,
    fallbackFormat: w,
    unresolving: E,
    postTranslation: T,
    processor: m,
    warnHtmlMessage: y,
    escapeParameter: S,
    messageCompiler: b,
    messageResolver: x,
    localeFallbacker: A,
    fallbackContext: M,
    onWarn: t,
    __meta: j,
  }
  return (
    (X.datetimeFormats = a),
    (X.numberFormats = o),
    (X.__datetimeFormatters = D),
    (X.__numberFormatters = F),
    __INTLIFY_PROD_DEVTOOLS__ && U_(X, n, j),
    X
  )
}
function hi(e, t, n, s, i) {
  const { missing: r, onWarn: l } = e
  if (r !== null) {
    const a = r(e, n, t, i)
    return G(a) ? a : t
  } else return t
}
function Nn(e, t, n) {
  const s = e
  ;(s.__localeChainCache = new Map()), e.localeFallbacker(e, n, t)
}
function ur(e) {
  return (n) => rv(n, e)
}
function rv(e, t) {
  const n = t.b || t.body
  if ((n.t || n.type) === 1) {
    const s = n,
      i = s.c || s.cases
    return e.plural(i.reduce((r, l) => [...r, Bl(e, l)], []))
  } else return Bl(e, n)
}
function Bl(e, t) {
  const n = t.s || t.static
  if (n) return e.type === "text" ? n : e.normalize([n])
  {
    const s = (t.i || t.items).reduce((i, r) => [...i, Ar(e, r)], [])
    return e.normalize(s)
  }
}
function Ar(e, t) {
  const n = t.t || t.type
  switch (n) {
    case 3:
      const s = t
      return s.v || s.value
    case 9:
      const i = t
      return i.v || i.value
    case 4:
      const r = t
      return e.interpolate(e.named(r.k || r.key))
    case 5:
      const l = t
      return e.interpolate(e.list(l.i != null ? l.i : l.index))
    case 6:
      const a = t,
        o = a.m || a.modifier
      return e.linked(Ar(e, a.k || a.key), o ? Ar(e, o) : void 0, e.type)
    case 7:
      const u = t
      return u.v || u.value
    case 8:
      const c = t
      return c.v || c.value
    default:
      throw new Error(`unhandled node type on format message part: ${n}`)
  }
}
const Fa = Q.__EXTEND_POINT__,
  us = fi(Fa),
  Ft = {
    INVALID_ARGUMENT: Fa,
    INVALID_DATE_ARGUMENT: us(),
    INVALID_ISO_DATE_ARGUMENT: us(),
    NOT_SUPPORT_NON_STRING_MESSAGE: us(),
    __EXTEND_POINT__: us(),
  }
function Jt(e) {
  return Pn(e, null, void 0)
}
const $a = (e) => e
let an = Object.create(null)
const wn = (e) =>
  ge(e) && (e.t === 0 || e.type === 0) && ("b" in e || "body" in e)
function Ba(e, t = {}) {
  let n = !1
  const s = t.onError || t_
  return (
    (t.onError = (i) => {
      ;(n = !0), s(i)
    }),
    { ...T_(e, t), detectError: n }
  )
}
const iv = (e, t) => {
  if (!G(e)) throw Jt(Ft.NOT_SUPPORT_NON_STRING_MESSAGE)
  {
    oe(t.warnHtmlMessage) && t.warnHtmlMessage
    const s = (t.onCacheKey || $a)(e),
      i = an[s]
    if (i) return i
    const { code: r, detectError: l } = Ba(e, t),
      a = new Function(`return ${r}`)()
    return l ? a : (an[s] = a)
  }
}
function lv(e, t) {
  if (
    __INTLIFY_JIT_COMPILATION__ &&
    !__INTLIFY_DROP_MESSAGE_COMPILER__ &&
    G(e)
  ) {
    oe(t.warnHtmlMessage) && t.warnHtmlMessage
    const s = (t.onCacheKey || $a)(e),
      i = an[s]
    if (i) return i
    const { ast: r, detectError: l } = Ba(e, { ...t, location: !1, jit: !0 }),
      a = ur(r)
    return l ? a : (an[s] = a)
  } else {
    const n = e.cacheKey
    if (n) {
      const s = an[n]
      return s || (an[n] = ur(e))
    } else return ur(e)
  }
}
const Wl = () => "",
  rt = (e) => Ie(e)
function Hl(e, ...t) {
  const {
      fallbackFormat: n,
      postTranslation: s,
      unresolving: i,
      messageCompiler: r,
      fallbackLocale: l,
      messages: a,
    } = e,
    [o, u] = Mr(...t),
    c = oe(u.missingWarn) ? u.missingWarn : e.missingWarn,
    p = oe(u.fallbackWarn) ? u.fallbackWarn : e.fallbackWarn,
    h = oe(u.escapeParameter) ? u.escapeParameter : e.escapeParameter,
    g = !!u.resolvedMessage,
    w =
      G(u.default) || oe(u.default)
        ? oe(u.default)
          ? r
            ? o
            : () => o
          : u.default
        : n
        ? r
          ? o
          : () => o
        : "",
    E = n || w !== "",
    T = pi(e, u)
  h && ov(u)
  let [m, y, S] = g ? [o, T, a[T] || {}] : Wa(e, o, T, l, p, c),
    b = m,
    x = o
  if (
    (!g && !(G(b) || wn(b) || rt(b)) && E && ((b = w), (x = b)),
    !g && (!(G(b) || wn(b) || rt(b)) || !G(y)))
  )
    return i ? Vs : o
  let A = !1
  const M = () => {
      A = !0
    },
    V = rt(b) ? b : Ha(e, o, y, b, x, M)
  if (A) return b
  const D = uv(e, y, S, u),
    F = H_(D),
    j = av(e, V, F),
    X = s ? s(j, o) : j
  if (__INTLIFY_PROD_DEVTOOLS__) {
    const z = {
      timestamp: Date.now(),
      key: G(o) ? o : rt(b) ? b.key : "",
      locale: y || (rt(b) ? b.locale : ""),
      format: G(b) ? b : rt(b) ? b.source : "",
      message: X,
    }
    ;(z.meta = We({}, e.__meta, tv() || {})), G_(z)
  }
  return X
}
function ov(e) {
  Se(e.list)
    ? (e.list = e.list.map((t) => (G(t) ? Il(t) : t)))
    : ge(e.named) &&
      Object.keys(e.named).forEach((t) => {
        G(e.named[t]) && (e.named[t] = Il(e.named[t]))
      })
}
function Wa(e, t, n, s, i, r) {
  const { messages: l, onWarn: a, messageResolver: o, localeFallbacker: u } = e,
    c = u(e, s, n)
  let p = {},
    h,
    g = null
  const w = "translate"
  for (
    let E = 0;
    E < c.length &&
    ((h = c[E]),
    (p = l[h] || {}),
    (g = o(p, t)) === null && (g = p[t]),
    !(G(g) || wn(g) || rt(g)));
    E++
  ) {
    const T = hi(e, t, h, r, w)
    T !== t && (g = T)
  }
  return [g, h, p]
}
function Ha(e, t, n, s, i, r) {
  const { messageCompiler: l, warnHtmlMessage: a } = e
  if (rt(s)) {
    const u = s
    return (u.locale = u.locale || n), (u.key = u.key || t), u
  }
  if (l == null) {
    const u = () => s
    return (u.locale = n), (u.key = t), u
  }
  const o = l(s, cv(e, n, i, s, a, r))
  return (o.locale = n), (o.key = t), (o.source = s), o
}
function av(e, t, n) {
  return t(n)
}
function Mr(...e) {
  const [t, n, s] = e,
    i = {}
  if (!G(t) && !xe(t) && !rt(t) && !wn(t)) throw Jt(Ft.INVALID_ARGUMENT)
  const r = xe(t) ? String(t) : (rt(t), t)
  return (
    xe(n)
      ? (i.plural = n)
      : G(n)
      ? (i.default = n)
      : te(n) && !Hs(n)
      ? (i.named = n)
      : Se(n) && (i.list = n),
    xe(s) ? (i.plural = s) : G(s) ? (i.default = s) : te(s) && We(i, s),
    [r, i]
  )
}
function cv(e, t, n, s, i, r) {
  return {
    locale: t,
    key: n,
    warnHtmlMessage: i,
    onError: (l) => {
      throw (r && r(l), l)
    },
    onCacheKey: (l) => Ug(t, n, l),
  }
}
function uv(e, t, n, s) {
  const {
      modifiers: i,
      pluralRules: r,
      messageResolver: l,
      fallbackLocale: a,
      fallbackWarn: o,
      missingWarn: u,
      fallbackContext: c,
    } = e,
    h = {
      locale: t,
      modifiers: i,
      pluralRules: r,
      messages: (g) => {
        let w = l(n, g)
        if (w == null && c) {
          const [, , E] = Wa(c, g, t, a, o, u)
          w = l(E, g)
        }
        if (G(w) || wn(w)) {
          let E = !1
          const m = Ha(e, g, t, w, g, () => {
            E = !0
          })
          return E ? Wl : m
        } else return rt(w) ? w : Wl
      },
    }
  return (
    e.processor && (h.processor = e.processor),
    s.list && (h.list = s.list),
    s.named && (h.named = s.named),
    xe(s.plural) && (h.pluralIndex = s.plural),
    h
  )
}
function Vl(e, ...t) {
  const {
      datetimeFormats: n,
      unresolving: s,
      fallbackLocale: i,
      onWarn: r,
      localeFallbacker: l,
    } = e,
    { __datetimeFormatters: a } = e,
    [o, u, c, p] = Rr(...t),
    h = oe(c.missingWarn) ? c.missingWarn : e.missingWarn
  oe(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn
  const g = !!c.part,
    w = pi(e, c),
    E = l(e, i, w)
  if (!G(o) || o === "") return new Intl.DateTimeFormat(w, p).format(u)
  let T = {},
    m,
    y = null
  const S = "datetime format"
  for (
    let A = 0;
    A < E.length && ((m = E[A]), (T = n[m] || {}), (y = T[o]), !te(y));
    A++
  )
    hi(e, o, m, h, S)
  if (!te(y) || !G(m)) return s ? Vs : o
  let b = `${m}__${o}`
  Hs(p) || (b = `${b}__${JSON.stringify(p)}`)
  let x = a.get(b)
  return (
    x || ((x = new Intl.DateTimeFormat(m, We({}, y, p))), a.set(b, x)),
    g ? x.formatToParts(u) : x.format(u)
  )
}
const Va = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits",
]
function Rr(...e) {
  const [t, n, s, i] = e,
    r = {}
  let l = {},
    a
  if (G(t)) {
    const o = t.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/)
    if (!o) throw Jt(Ft.INVALID_ISO_DATE_ARGUMENT)
    const u = o[3]
      ? o[3].trim().startsWith("T")
        ? `${o[1].trim()}${o[3].trim()}`
        : `${o[1].trim()}T${o[3].trim()}`
      : o[1].trim()
    a = new Date(u)
    try {
      a.toISOString()
    } catch {
      throw Jt(Ft.INVALID_ISO_DATE_ARGUMENT)
    }
  } else if (jg(t)) {
    if (isNaN(t.getTime())) throw Jt(Ft.INVALID_DATE_ARGUMENT)
    a = t
  } else if (xe(t)) a = t
  else throw Jt(Ft.INVALID_ARGUMENT)
  return (
    G(n)
      ? (r.key = n)
      : te(n) &&
        Object.keys(n).forEach((o) => {
          Va.includes(o) ? (l[o] = n[o]) : (r[o] = n[o])
        }),
    G(s) ? (r.locale = s) : te(s) && (l = s),
    te(i) && (l = i),
    [r.key || "", a, r, l]
  )
}
function Ul(e, t, n) {
  const s = e
  for (const i in n) {
    const r = `${t}__${i}`
    s.__datetimeFormatters.has(r) && s.__datetimeFormatters.delete(r)
  }
}
function Gl(e, ...t) {
  const {
      numberFormats: n,
      unresolving: s,
      fallbackLocale: i,
      onWarn: r,
      localeFallbacker: l,
    } = e,
    { __numberFormatters: a } = e,
    [o, u, c, p] = Dr(...t),
    h = oe(c.missingWarn) ? c.missingWarn : e.missingWarn
  oe(c.fallbackWarn) ? c.fallbackWarn : e.fallbackWarn
  const g = !!c.part,
    w = pi(e, c),
    E = l(e, i, w)
  if (!G(o) || o === "") return new Intl.NumberFormat(w, p).format(u)
  let T = {},
    m,
    y = null
  const S = "number format"
  for (
    let A = 0;
    A < E.length && ((m = E[A]), (T = n[m] || {}), (y = T[o]), !te(y));
    A++
  )
    hi(e, o, m, h, S)
  if (!te(y) || !G(m)) return s ? Vs : o
  let b = `${m}__${o}`
  Hs(p) || (b = `${b}__${JSON.stringify(p)}`)
  let x = a.get(b)
  return (
    x || ((x = new Intl.NumberFormat(m, We({}, y, p))), a.set(b, x)),
    g ? x.formatToParts(u) : x.format(u)
  )
}
const Ua = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay",
]
function Dr(...e) {
  const [t, n, s, i] = e,
    r = {}
  let l = {}
  if (!xe(t)) throw Jt(Ft.INVALID_ARGUMENT)
  const a = t
  return (
    G(n)
      ? (r.key = n)
      : te(n) &&
        Object.keys(n).forEach((o) => {
          Ua.includes(o) ? (l[o] = n[o]) : (r[o] = n[o])
        }),
    G(s) ? (r.locale = s) : te(s) && (l = s),
    te(i) && (l = i),
    [r.key || "", a, r, l]
  )
}
function jl(e, t, n) {
  const s = e
  for (const i in n) {
    const r = `${t}__${i}`
    s.__numberFormatters.has(r) && s.__numberFormatters.delete(r)
  }
}
I_()
/*!
 * vue-i18n v9.6.5
 * (c) 2023 kazuya kawaguchi
 * Released under the MIT License.
 */ const fv = "9.6.5"
function dv() {
  typeof __VUE_I18N_FULL_INSTALL__ != "boolean" &&
    (Tt().__VUE_I18N_FULL_INSTALL__ = !0),
    typeof __VUE_I18N_LEGACY_API__ != "boolean" &&
      (Tt().__VUE_I18N_LEGACY_API__ = !0),
    typeof __INTLIFY_JIT_COMPILATION__ != "boolean" &&
      (Tt().__INTLIFY_JIT_COMPILATION__ = !1),
    typeof __INTLIFY_DROP_MESSAGE_COMPILER__ != "boolean" &&
      (Tt().__INTLIFY_DROP_MESSAGE_COMPILER__ = !1),
    typeof __INTLIFY_PROD_DEVTOOLS__ != "boolean" &&
      (Tt().__INTLIFY_PROD_DEVTOOLS__ = !1)
}
const Ga = z_.__EXTEND_POINT__,
  At = fi(Ga)
At(), At(), At(), At(), At(), At(), At(), At()
const ja = Ft.__EXTEND_POINT__,
  Ke = fi(ja),
  Oe = {
    UNEXPECTED_RETURN_TYPE: ja,
    INVALID_ARGUMENT: Ke(),
    MUST_BE_CALL_SETUP_TOP: Ke(),
    NOT_INSTALLED: Ke(),
    NOT_AVAILABLE_IN_LEGACY_MODE: Ke(),
    REQUIRED_VALUE: Ke(),
    INVALID_VALUE: Ke(),
    CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN: Ke(),
    NOT_INSTALLED_WITH_PROVIDE: Ke(),
    UNEXPECTED_ERROR: Ke(),
    NOT_COMPATIBLE_LEGACY_VUE_I18N: Ke(),
    BRIDGE_SUPPORT_VUE_2_ONLY: Ke(),
    MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION: Ke(),
    NOT_AVAILABLE_COMPOSITION_IN_LEGACY: Ke(),
    __EXTEND_POINT__: Ke(),
  }
function Ne(e, ...t) {
  return Pn(e, null, void 0)
}
const kr = Gt("__translateVNode"),
  Fr = Gt("__datetimeParts"),
  $r = Gt("__numberParts"),
  za = Gt("__setPluralRules"),
  Ya = Gt("__injectWithOption"),
  Br = Gt("__dispose")
function Xn(e) {
  if (!ge(e)) return e
  for (const t in e)
    if (Yn(e, t))
      if (!t.includes(".")) ge(e[t]) && Xn(e[t])
      else {
        const n = t.split("."),
          s = n.length - 1
        let i = e,
          r = !1
        for (let l = 0; l < s; l++) {
          if ((n[l] in i || (i[n[l]] = {}), !ge(i[n[l]]))) {
            r = !0
            break
          }
          i = i[n[l]]
        }
        r || ((i[n[s]] = e[t]), delete e[t]), ge(i[n[s]]) && Xn(i[n[s]])
      }
  return e
}
function Us(e, t) {
  const { messages: n, __i18n: s, messageResolver: i, flatJson: r } = t,
    l = te(n) ? n : Se(s) ? {} : { [e]: {} }
  if (
    (Se(s) &&
      s.forEach((a) => {
        if ("locale" in a && "resource" in a) {
          const { locale: o, resource: u } = a
          o ? ((l[o] = l[o] || {}), Bn(u, l[o])) : Bn(u, l)
        } else G(a) && Bn(JSON.parse(a), l)
      }),
    i == null && r)
  )
    for (const a in l) Yn(l, a) && Xn(l[a])
  return l
}
const fs = (e) => !ge(e) || Se(e)
function Bn(e, t) {
  if (fs(e) || fs(t)) throw Ne(Oe.INVALID_VALUE)
  for (const n in e)
    Yn(e, n) && (fs(e[n]) || fs(t[n]) ? (t[n] = e[n]) : Bn(e[n], t[n]))
}
function Ka(e) {
  return e.type
}
function Xa(e, t, n) {
  let s = ge(t.messages) ? t.messages : {}
  "__i18nGlobal" in n &&
    (s = Us(e.locale.value, { messages: s, __i18n: n.__i18nGlobal }))
  const i = Object.keys(s)
  i.length &&
    i.forEach((r) => {
      e.mergeLocaleMessage(r, s[r])
    })
  {
    if (ge(t.datetimeFormats)) {
      const r = Object.keys(t.datetimeFormats)
      r.length &&
        r.forEach((l) => {
          e.mergeDateTimeFormat(l, t.datetimeFormats[l])
        })
    }
    if (ge(t.numberFormats)) {
      const r = Object.keys(t.numberFormats)
      r.length &&
        r.forEach((l) => {
          e.mergeNumberFormat(l, t.numberFormats[l])
        })
    }
  }
}
function zl(e) {
  return be(es, null, e, 0)
}
const Yl = "__INTLIFY_META__",
  Kl = () => [],
  pv = () => !1
let Xl = 0
function ql(e) {
  return (t, n, s, i) => e(n, s, Gn() || void 0, i)
}
const hv = () => {
  const e = Gn()
  let t = null
  return e && (t = Ka(e)[Yl]) ? { [Yl]: t } : null
}
function mi(e = {}, t) {
  const { __root: n, __injectWithOption: s } = e,
    i = n === void 0,
    r = e.flatJson
  let l = oe(e.inheritLocale) ? e.inheritLocale : !0
  const a = _e(n && l ? n.locale.value : G(e.locale) ? e.locale : En),
    o = _e(
      n && l
        ? n.fallbackLocale.value
        : G(e.fallbackLocale) ||
          Se(e.fallbackLocale) ||
          te(e.fallbackLocale) ||
          e.fallbackLocale === !1
        ? e.fallbackLocale
        : a.value
    ),
    u = _e(Us(a.value, e)),
    c = _e(te(e.datetimeFormats) ? e.datetimeFormats : { [a.value]: {} }),
    p = _e(te(e.numberFormats) ? e.numberFormats : { [a.value]: {} })
  let h = n
      ? n.missingWarn
      : oe(e.missingWarn) || Ut(e.missingWarn)
      ? e.missingWarn
      : !0,
    g = n
      ? n.fallbackWarn
      : oe(e.fallbackWarn) || Ut(e.fallbackWarn)
      ? e.fallbackWarn
      : !0,
    w = n ? n.fallbackRoot : oe(e.fallbackRoot) ? e.fallbackRoot : !0,
    E = !!e.fallbackFormat,
    T = Ie(e.missing) ? e.missing : null,
    m = Ie(e.missing) ? ql(e.missing) : null,
    y = Ie(e.postTranslation) ? e.postTranslation : null,
    S = n ? n.warnHtmlMessage : oe(e.warnHtmlMessage) ? e.warnHtmlMessage : !0,
    b = !!e.escapeParameter
  const x = n ? n.modifiers : te(e.modifiers) ? e.modifiers : {}
  let A = e.pluralRules || (n && n.pluralRules),
    M
  ;(M = (() => {
    i && Fl(null)
    const P = {
      version: fv,
      locale: a.value,
      fallbackLocale: o.value,
      messages: u.value,
      modifiers: x,
      pluralRules: A,
      missing: m === null ? void 0 : m,
      missingWarn: h,
      fallbackWarn: g,
      fallbackFormat: E,
      unresolving: !0,
      postTranslation: y === null ? void 0 : y,
      warnHtmlMessage: S,
      escapeParameter: b,
      messageResolver: e.messageResolver,
      messageCompiler: e.messageCompiler,
      __meta: { framework: "vue" },
    }
    ;(P.datetimeFormats = c.value),
      (P.numberFormats = p.value),
      (P.__datetimeFormatters = te(M) ? M.__datetimeFormatters : void 0),
      (P.__numberFormatters = te(M) ? M.__numberFormatters : void 0)
    const O = sv(P)
    return i && Fl(O), O
  })()),
    Nn(M, a.value, o.value)
  function D() {
    return [a.value, o.value, u.value, c.value, p.value]
  }
  const F = Le({
      get: () => a.value,
      set: (P) => {
        ;(a.value = P), (M.locale = a.value)
      },
    }),
    j = Le({
      get: () => o.value,
      set: (P) => {
        ;(o.value = P), (M.fallbackLocale = o.value), Nn(M, a.value, P)
      },
    }),
    X = Le(() => u.value),
    z = Le(() => c.value),
    pe = Le(() => p.value)
  function ve() {
    return Ie(y) ? y : null
  }
  function ie(P) {
    ;(y = P), (M.postTranslation = P)
  }
  function ae() {
    return T
  }
  function se(P) {
    P !== null && (m = ql(P)), (T = P), (M.missing = m)
  }
  const ye = (P, O, K, Z, ce, Ee) => {
    D()
    let De
    try {
      __INTLIFY_PROD_DEVTOOLS__,
        i || (M.fallbackContext = n ? nv() : void 0),
        (De = P(M))
    } finally {
      __INTLIFY_PROD_DEVTOOLS__, i || (M.fallbackContext = void 0)
    }
    if (
      (K !== "translate exists" && xe(De) && De === Vs) ||
      (K === "translate exists" && !De)
    ) {
      const [Lt, Gs] = O()
      return n && w ? Z(n) : ce(Lt)
    } else {
      if (Ee(De)) return De
      throw Ne(Oe.UNEXPECTED_RETURN_TYPE)
    }
  }
  function Me(...P) {
    return ye(
      (O) => Reflect.apply(Hl, null, [O, ...P]),
      () => Mr(...P),
      "translate",
      (O) => Reflect.apply(O.t, O, [...P]),
      (O) => O,
      (O) => G(O)
    )
  }
  function Re(...P) {
    const [O, K, Z] = P
    if (Z && !ge(Z)) throw Ne(Oe.INVALID_ARGUMENT)
    return Me(O, K, We({ resolvedMessage: !0 }, Z || {}))
  }
  function Pe(...P) {
    return ye(
      (O) => Reflect.apply(Vl, null, [O, ...P]),
      () => Rr(...P),
      "datetime format",
      (O) => Reflect.apply(O.d, O, [...P]),
      () => Rl,
      (O) => G(O)
    )
  }
  function st(...P) {
    return ye(
      (O) => Reflect.apply(Gl, null, [O, ...P]),
      () => Dr(...P),
      "number format",
      (O) => Reflect.apply(O.n, O, [...P]),
      () => Rl,
      (O) => G(O)
    )
  }
  function Qe(P) {
    return P.map((O) => (G(O) || xe(O) || oe(O) ? zl(String(O)) : O))
  }
  const Ce = { normalize: Qe, interpolate: (P) => P, type: "vnode" }
  function N(...P) {
    return ye(
      (O) => {
        let K
        const Z = O
        try {
          ;(Z.processor = Ce), (K = Reflect.apply(Hl, null, [Z, ...P]))
        } finally {
          Z.processor = null
        }
        return K
      },
      () => Mr(...P),
      "translate",
      (O) => O[kr](...P),
      (O) => [zl(O)],
      (O) => Se(O)
    )
  }
  function U(...P) {
    return ye(
      (O) => Reflect.apply(Gl, null, [O, ...P]),
      () => Dr(...P),
      "number format",
      (O) => O[$r](...P),
      Kl,
      (O) => G(O) || Se(O)
    )
  }
  function W(...P) {
    return ye(
      (O) => Reflect.apply(Vl, null, [O, ...P]),
      () => Rr(...P),
      "datetime format",
      (O) => O[Fr](...P),
      Kl,
      (O) => G(O) || Se(O)
    )
  }
  function Y(P) {
    ;(A = P), (M.pluralRules = A)
  }
  function le(P, O) {
    return ye(
      () => {
        if (!P) return !1
        const K = G(O) ? O : a.value,
          Z = d(K),
          ce = M.messageResolver(Z, P)
        return wn(ce) || rt(ce) || G(ce)
      },
      () => [P],
      "translate exists",
      (K) => Reflect.apply(K.te, K, [P, O]),
      pv,
      (K) => oe(K)
    )
  }
  function v(P) {
    let O = null
    const K = Na(M, o.value, a.value)
    for (let Z = 0; Z < K.length; Z++) {
      const ce = u.value[K[Z]] || {},
        Ee = M.messageResolver(ce, P)
      if (Ee != null) {
        O = Ee
        break
      }
    }
    return O
  }
  function f(P) {
    const O = v(P)
    return O ?? (n ? n.tm(P) || {} : {})
  }
  function d(P) {
    return u.value[P] || {}
  }
  function _(P, O) {
    if (r) {
      const K = { [P]: O }
      for (const Z in K) Yn(K, Z) && Xn(K[Z])
      O = K[P]
    }
    ;(u.value[P] = O), (M.messages = u.value)
  }
  function I(P, O) {
    u.value[P] = u.value[P] || {}
    const K = { [P]: O }
    for (const Z in K) Yn(K, Z) && Xn(K[Z])
    ;(O = K[P]), Bn(O, u.value[P]), (M.messages = u.value)
  }
  function L(P) {
    return c.value[P] || {}
  }
  function R(P, O) {
    ;(c.value[P] = O), (M.datetimeFormats = c.value), Ul(M, P, O)
  }
  function $(P, O) {
    ;(c.value[P] = We(c.value[P] || {}, O)),
      (M.datetimeFormats = c.value),
      Ul(M, P, O)
  }
  function B(P) {
    return p.value[P] || {}
  }
  function k(P, O) {
    ;(p.value[P] = O), (M.numberFormats = p.value), jl(M, P, O)
  }
  function q(P, O) {
    ;(p.value[P] = We(p.value[P] || {}, O)),
      (M.numberFormats = p.value),
      jl(M, P, O)
  }
  Xl++,
    n &&
      xr &&
      (Wt(n.locale, (P) => {
        l && ((a.value = P), (M.locale = P), Nn(M, a.value, o.value))
      }),
      Wt(n.fallbackLocale, (P) => {
        l && ((o.value = P), (M.fallbackLocale = P), Nn(M, a.value, o.value))
      }))
  const H = {
    id: Xl,
    locale: F,
    fallbackLocale: j,
    get inheritLocale() {
      return l
    },
    set inheritLocale(P) {
      ;(l = P),
        P &&
          n &&
          ((a.value = n.locale.value),
          (o.value = n.fallbackLocale.value),
          Nn(M, a.value, o.value))
    },
    get availableLocales() {
      return Object.keys(u.value).sort()
    },
    messages: X,
    get modifiers() {
      return x
    },
    get pluralRules() {
      return A || {}
    },
    get isGlobal() {
      return i
    },
    get missingWarn() {
      return h
    },
    set missingWarn(P) {
      ;(h = P), (M.missingWarn = h)
    },
    get fallbackWarn() {
      return g
    },
    set fallbackWarn(P) {
      ;(g = P), (M.fallbackWarn = g)
    },
    get fallbackRoot() {
      return w
    },
    set fallbackRoot(P) {
      w = P
    },
    get fallbackFormat() {
      return E
    },
    set fallbackFormat(P) {
      ;(E = P), (M.fallbackFormat = E)
    },
    get warnHtmlMessage() {
      return S
    },
    set warnHtmlMessage(P) {
      ;(S = P), (M.warnHtmlMessage = P)
    },
    get escapeParameter() {
      return b
    },
    set escapeParameter(P) {
      ;(b = P), (M.escapeParameter = P)
    },
    t: Me,
    getLocaleMessage: d,
    setLocaleMessage: _,
    mergeLocaleMessage: I,
    getPostTranslationHandler: ve,
    setPostTranslationHandler: ie,
    getMissingHandler: ae,
    setMissingHandler: se,
    [za]: Y,
  }
  return (
    (H.datetimeFormats = z),
    (H.numberFormats = pe),
    (H.rt = Re),
    (H.te = le),
    (H.tm = f),
    (H.d = Pe),
    (H.n = st),
    (H.getDateTimeFormat = L),
    (H.setDateTimeFormat = R),
    (H.mergeDateTimeFormat = $),
    (H.getNumberFormat = B),
    (H.setNumberFormat = k),
    (H.mergeNumberFormat = q),
    (H[Ya] = s),
    (H[kr] = N),
    (H[Fr] = W),
    (H[$r] = U),
    H
  )
}
function mv(e) {
  const t = G(e.locale) ? e.locale : En,
    n =
      G(e.fallbackLocale) ||
      Se(e.fallbackLocale) ||
      te(e.fallbackLocale) ||
      e.fallbackLocale === !1
        ? e.fallbackLocale
        : t,
    s = Ie(e.missing) ? e.missing : void 0,
    i =
      oe(e.silentTranslationWarn) || Ut(e.silentTranslationWarn)
        ? !e.silentTranslationWarn
        : !0,
    r =
      oe(e.silentFallbackWarn) || Ut(e.silentFallbackWarn)
        ? !e.silentFallbackWarn
        : !0,
    l = oe(e.fallbackRoot) ? e.fallbackRoot : !0,
    a = !!e.formatFallbackMessages,
    o = te(e.modifiers) ? e.modifiers : {},
    u = e.pluralizationRules,
    c = Ie(e.postTranslation) ? e.postTranslation : void 0,
    p = G(e.warnHtmlInMessage) ? e.warnHtmlInMessage !== "off" : !0,
    h = !!e.escapeParameterHtml,
    g = oe(e.sync) ? e.sync : !0
  let w = e.messages
  if (te(e.sharedMessages)) {
    const x = e.sharedMessages
    w = Object.keys(x).reduce((M, V) => {
      const D = M[V] || (M[V] = {})
      return We(D, x[V]), M
    }, w || {})
  }
  const { __i18n: E, __root: T, __injectWithOption: m } = e,
    y = e.datetimeFormats,
    S = e.numberFormats,
    b = e.flatJson
  return {
    locale: t,
    fallbackLocale: n,
    messages: w,
    flatJson: b,
    datetimeFormats: y,
    numberFormats: S,
    missing: s,
    missingWarn: i,
    fallbackWarn: r,
    fallbackRoot: l,
    fallbackFormat: a,
    modifiers: o,
    pluralRules: u,
    postTranslation: c,
    warnHtmlMessage: p,
    escapeParameter: h,
    messageResolver: e.messageResolver,
    inheritLocale: g,
    __i18n: E,
    __root: T,
    __injectWithOption: m,
  }
}
function Wr(e = {}, t) {
  {
    const n = mi(mv(e)),
      { __extender: s } = e,
      i = {
        id: n.id,
        get locale() {
          return n.locale.value
        },
        set locale(r) {
          n.locale.value = r
        },
        get fallbackLocale() {
          return n.fallbackLocale.value
        },
        set fallbackLocale(r) {
          n.fallbackLocale.value = r
        },
        get messages() {
          return n.messages.value
        },
        get datetimeFormats() {
          return n.datetimeFormats.value
        },
        get numberFormats() {
          return n.numberFormats.value
        },
        get availableLocales() {
          return n.availableLocales
        },
        get formatter() {
          return {
            interpolate() {
              return []
            },
          }
        },
        set formatter(r) {},
        get missing() {
          return n.getMissingHandler()
        },
        set missing(r) {
          n.setMissingHandler(r)
        },
        get silentTranslationWarn() {
          return oe(n.missingWarn) ? !n.missingWarn : n.missingWarn
        },
        set silentTranslationWarn(r) {
          n.missingWarn = oe(r) ? !r : r
        },
        get silentFallbackWarn() {
          return oe(n.fallbackWarn) ? !n.fallbackWarn : n.fallbackWarn
        },
        set silentFallbackWarn(r) {
          n.fallbackWarn = oe(r) ? !r : r
        },
        get modifiers() {
          return n.modifiers
        },
        get formatFallbackMessages() {
          return n.fallbackFormat
        },
        set formatFallbackMessages(r) {
          n.fallbackFormat = r
        },
        get postTranslation() {
          return n.getPostTranslationHandler()
        },
        set postTranslation(r) {
          n.setPostTranslationHandler(r)
        },
        get sync() {
          return n.inheritLocale
        },
        set sync(r) {
          n.inheritLocale = r
        },
        get warnHtmlInMessage() {
          return n.warnHtmlMessage ? "warn" : "off"
        },
        set warnHtmlInMessage(r) {
          n.warnHtmlMessage = r !== "off"
        },
        get escapeParameterHtml() {
          return n.escapeParameter
        },
        set escapeParameterHtml(r) {
          n.escapeParameter = r
        },
        get preserveDirectiveContent() {
          return !0
        },
        set preserveDirectiveContent(r) {},
        get pluralizationRules() {
          return n.pluralRules || {}
        },
        __composer: n,
        t(...r) {
          const [l, a, o] = r,
            u = {}
          let c = null,
            p = null
          if (!G(l)) throw Ne(Oe.INVALID_ARGUMENT)
          const h = l
          return (
            G(a) ? (u.locale = a) : Se(a) ? (c = a) : te(a) && (p = a),
            Se(o) ? (c = o) : te(o) && (p = o),
            Reflect.apply(n.t, n, [h, c || p || {}, u])
          )
        },
        rt(...r) {
          return Reflect.apply(n.rt, n, [...r])
        },
        tc(...r) {
          const [l, a, o] = r,
            u = { plural: 1 }
          let c = null,
            p = null
          if (!G(l)) throw Ne(Oe.INVALID_ARGUMENT)
          const h = l
          return (
            G(a)
              ? (u.locale = a)
              : xe(a)
              ? (u.plural = a)
              : Se(a)
              ? (c = a)
              : te(a) && (p = a),
            G(o) ? (u.locale = o) : Se(o) ? (c = o) : te(o) && (p = o),
            Reflect.apply(n.t, n, [h, c || p || {}, u])
          )
        },
        te(r, l) {
          return n.te(r, l)
        },
        tm(r) {
          return n.tm(r)
        },
        getLocaleMessage(r) {
          return n.getLocaleMessage(r)
        },
        setLocaleMessage(r, l) {
          n.setLocaleMessage(r, l)
        },
        mergeLocaleMessage(r, l) {
          n.mergeLocaleMessage(r, l)
        },
        d(...r) {
          return Reflect.apply(n.d, n, [...r])
        },
        getDateTimeFormat(r) {
          return n.getDateTimeFormat(r)
        },
        setDateTimeFormat(r, l) {
          n.setDateTimeFormat(r, l)
        },
        mergeDateTimeFormat(r, l) {
          n.mergeDateTimeFormat(r, l)
        },
        n(...r) {
          return Reflect.apply(n.n, n, [...r])
        },
        getNumberFormat(r) {
          return n.getNumberFormat(r)
        },
        setNumberFormat(r, l) {
          n.setNumberFormat(r, l)
        },
        mergeNumberFormat(r, l) {
          n.mergeNumberFormat(r, l)
        },
        getChoiceIndex(r, l) {
          return -1
        },
      }
    return (i.__extender = s), i
  }
}
const gi = {
  tag: { type: [String, Object] },
  locale: { type: String },
  scope: {
    type: String,
    validator: (e) => e === "parent" || e === "global",
    default: "parent",
  },
  i18n: { type: Object },
}
function gv({ slots: e }, t) {
  return t.length === 1 && t[0] === "default"
    ? (e.default ? e.default() : []).reduce(
        (s, i) => [...s, ...(i.type === ke ? i.children : [i])],
        []
      )
    : t.reduce((n, s) => {
        const i = e[s]
        return i && (n[s] = i()), n
      }, {})
}
function qa(e) {
  return ke
}
const _v = Zn({
    name: "i18n-t",
    props: We(
      {
        keypath: { type: String, required: !0 },
        plural: {
          type: [Number, String],
          validator: (e) => xe(e) || !isNaN(e),
        },
      },
      gi
    ),
    setup(e, t) {
      const { slots: n, attrs: s } = t,
        i = e.i18n || _i({ useScope: e.scope, __useComponent: !0 })
      return () => {
        const r = Object.keys(n).filter((p) => p !== "_"),
          l = {}
        e.locale && (l.locale = e.locale),
          e.plural !== void 0 && (l.plural = G(e.plural) ? +e.plural : e.plural)
        const a = gv(t, r),
          o = i[kr](e.keypath, a, l),
          u = We({}, s),
          c = G(e.tag) || ge(e.tag) ? e.tag : qa()
        return Ye(c, u, o)
      }
    },
  }),
  Jl = _v
function vv(e) {
  return Se(e) && !G(e[0])
}
function Ja(e, t, n, s) {
  const { slots: i, attrs: r } = t
  return () => {
    const l = { part: !0 }
    let a = {}
    e.locale && (l.locale = e.locale),
      G(e.format)
        ? (l.key = e.format)
        : ge(e.format) &&
          (G(e.format.key) && (l.key = e.format.key),
          (a = Object.keys(e.format).reduce(
            (h, g) => (n.includes(g) ? We({}, h, { [g]: e.format[g] }) : h),
            {}
          )))
    const o = s(e.value, l, a)
    let u = [l.key]
    Se(o)
      ? (u = o.map((h, g) => {
          const w = i[h.type],
            E = w ? w({ [h.type]: h.value, index: g, parts: o }) : [h.value]
          return vv(E) && (E[0].key = `${h.type}-${g}`), E
        }))
      : G(o) && (u = [o])
    const c = We({}, r),
      p = G(e.tag) || ge(e.tag) ? e.tag : qa()
    return Ye(p, c, u)
  }
}
const bv = Zn({
    name: "i18n-n",
    props: We(
      {
        value: { type: Number, required: !0 },
        format: { type: [String, Object] },
      },
      gi
    ),
    setup(e, t) {
      const n = e.i18n || _i({ useScope: "parent", __useComponent: !0 })
      return Ja(e, t, Ua, (...s) => n[$r](...s))
    },
  }),
  Ql = bv,
  yv = Zn({
    name: "i18n-d",
    props: We(
      {
        value: { type: [Number, Date], required: !0 },
        format: { type: [String, Object] },
      },
      gi
    ),
    setup(e, t) {
      const n = e.i18n || _i({ useScope: "parent", __useComponent: !0 })
      return Ja(e, t, Va, (...s) => n[Fr](...s))
    },
  }),
  Zl = yv
function Ev(e, t) {
  const n = e
  if (e.mode === "composition") return n.__getInstance(t) || e.global
  {
    const s = n.__getInstance(t)
    return s != null ? s.__composer : e.global.__composer
  }
}
function wv(e) {
  const t = (l) => {
    const { instance: a, modifiers: o, value: u } = l
    if (!a || !a.$) throw Ne(Oe.UNEXPECTED_ERROR)
    const c = Ev(e, a.$),
      p = eo(u)
    return [Reflect.apply(c.t, c, [...to(p)]), c]
  }
  return {
    created: (l, a) => {
      const [o, u] = t(a)
      xr &&
        e.global === u &&
        (l.__i18nWatcher = Wt(u.locale, () => {
          a.instance && a.instance.$forceUpdate()
        })),
        (l.__composer = u),
        (l.textContent = o)
    },
    unmounted: (l) => {
      xr &&
        l.__i18nWatcher &&
        (l.__i18nWatcher(), (l.__i18nWatcher = void 0), delete l.__i18nWatcher),
        l.__composer && ((l.__composer = void 0), delete l.__composer)
    },
    beforeUpdate: (l, { value: a }) => {
      if (l.__composer) {
        const o = l.__composer,
          u = eo(a)
        l.textContent = Reflect.apply(o.t, o, [...to(u)])
      }
    },
    getSSRProps: (l) => {
      const [a] = t(l)
      return { textContent: a }
    },
  }
}
function eo(e) {
  if (G(e)) return { path: e }
  if (te(e)) {
    if (!("path" in e)) throw Ne(Oe.REQUIRED_VALUE, "path")
    return e
  } else throw Ne(Oe.INVALID_VALUE)
}
function to(e) {
  const { path: t, locale: n, args: s, choice: i, plural: r } = e,
    l = {},
    a = s || {}
  return (
    G(n) && (l.locale = n),
    xe(i) && (l.plural = i),
    xe(r) && (l.plural = r),
    [t, a, l]
  )
}
function Sv(e, t, ...n) {
  const s = te(n[0]) ? n[0] : {},
    i = !!s.useI18nComponentName
  ;(oe(s.globalInstall) ? s.globalInstall : !0) &&
    ([i ? "i18n" : Jl.name, "I18nT"].forEach((l) => e.component(l, Jl)),
    [Ql.name, "I18nN"].forEach((l) => e.component(l, Ql)),
    [Zl.name, "I18nD"].forEach((l) => e.component(l, Zl))),
    e.directive("t", wv(t))
}
function Tv(e, t, n) {
  return {
    beforeCreate() {
      const s = Gn()
      if (!s) throw Ne(Oe.UNEXPECTED_ERROR)
      const i = this.$options
      if (i.i18n) {
        const r = i.i18n
        if (
          (i.__i18n && (r.__i18n = i.__i18n),
          (r.__root = t),
          this === this.$root)
        )
          this.$i18n = no(e, r)
        else {
          ;(r.__injectWithOption = !0),
            (r.__extender = n.__vueI18nExtend),
            (this.$i18n = Wr(r))
          const l = this.$i18n
          l.__extender && (l.__disposer = l.__extender(this.$i18n))
        }
      } else if (i.__i18n)
        if (this === this.$root) this.$i18n = no(e, i)
        else {
          this.$i18n = Wr({
            __i18n: i.__i18n,
            __injectWithOption: !0,
            __extender: n.__vueI18nExtend,
            __root: t,
          })
          const r = this.$i18n
          r.__extender && (r.__disposer = r.__extender(this.$i18n))
        }
      else this.$i18n = e
      i.__i18nGlobal && Xa(t, i, i),
        (this.$t = (...r) => this.$i18n.t(...r)),
        (this.$rt = (...r) => this.$i18n.rt(...r)),
        (this.$tc = (...r) => this.$i18n.tc(...r)),
        (this.$te = (r, l) => this.$i18n.te(r, l)),
        (this.$d = (...r) => this.$i18n.d(...r)),
        (this.$n = (...r) => this.$i18n.n(...r)),
        (this.$tm = (r) => this.$i18n.tm(r)),
        n.__setInstance(s, this.$i18n)
    },
    mounted() {},
    unmounted() {
      const s = Gn()
      if (!s) throw Ne(Oe.UNEXPECTED_ERROR)
      const i = this.$i18n
      delete this.$t,
        delete this.$rt,
        delete this.$tc,
        delete this.$te,
        delete this.$d,
        delete this.$n,
        delete this.$tm,
        i.__disposer &&
          (i.__disposer(), delete i.__disposer, delete i.__extender),
        n.__deleteInstance(s),
        delete this.$i18n
    },
  }
}
function no(e, t) {
  ;(e.locale = t.locale || e.locale),
    (e.fallbackLocale = t.fallbackLocale || e.fallbackLocale),
    (e.missing = t.missing || e.missing),
    (e.silentTranslationWarn = t.silentTranslationWarn || e.silentFallbackWarn),
    (e.silentFallbackWarn = t.silentFallbackWarn || e.silentFallbackWarn),
    (e.formatFallbackMessages =
      t.formatFallbackMessages || e.formatFallbackMessages),
    (e.postTranslation = t.postTranslation || e.postTranslation),
    (e.warnHtmlInMessage = t.warnHtmlInMessage || e.warnHtmlInMessage),
    (e.escapeParameterHtml = t.escapeParameterHtml || e.escapeParameterHtml),
    (e.sync = t.sync || e.sync),
    e.__composer[za](t.pluralizationRules || e.pluralizationRules)
  const n = Us(e.locale, { messages: t.messages, __i18n: t.__i18n })
  return (
    Object.keys(n).forEach((s) => e.mergeLocaleMessage(s, n[s])),
    t.datetimeFormats &&
      Object.keys(t.datetimeFormats).forEach((s) =>
        e.mergeDateTimeFormat(s, t.datetimeFormats[s])
      ),
    t.numberFormats &&
      Object.keys(t.numberFormats).forEach((s) =>
        e.mergeNumberFormat(s, t.numberFormats[s])
      ),
    e
  )
}
const Iv = Gt("global-vue-i18n")
function Pv(e = {}, t) {
  const n =
      __VUE_I18N_LEGACY_API__ && oe(e.legacy)
        ? e.legacy
        : __VUE_I18N_LEGACY_API__,
    s = oe(e.globalInjection) ? e.globalInjection : !0,
    i = __VUE_I18N_LEGACY_API__ && n ? !!e.allowComposition : !0,
    r = new Map(),
    [l, a] = Cv(e, n),
    o = Gt("")
  function u(h) {
    return r.get(h) || null
  }
  function c(h, g) {
    r.set(h, g)
  }
  function p(h) {
    r.delete(h)
  }
  {
    const h = {
      get mode() {
        return __VUE_I18N_LEGACY_API__ && n ? "legacy" : "composition"
      },
      get allowComposition() {
        return i
      },
      async install(g, ...w) {
        if (
          ((g.__VUE_I18N_SYMBOL__ = o),
          g.provide(g.__VUE_I18N_SYMBOL__, h),
          te(w[0]))
        ) {
          const m = w[0]
          ;(h.__composerExtend = m.__composerExtend),
            (h.__vueI18nExtend = m.__vueI18nExtend)
        }
        let E = null
        !n && s && (E = kv(g, h.global)),
          __VUE_I18N_FULL_INSTALL__ && Sv(g, h, ...w),
          __VUE_I18N_LEGACY_API__ && n && g.mixin(Tv(a, a.__composer, h))
        const T = g.unmount
        g.unmount = () => {
          E && E(), h.dispose(), T()
        }
      },
      get global() {
        return a
      },
      dispose() {
        l.stop()
      },
      __instances: r,
      __getInstance: u,
      __setInstance: c,
      __deleteInstance: p,
    }
    return h
  }
}
function _i(e = {}) {
  const t = Gn()
  if (t == null) throw Ne(Oe.MUST_BE_CALL_SETUP_TOP)
  if (
    !t.isCE &&
    t.appContext.app != null &&
    !t.appContext.app.__VUE_I18N_SYMBOL__
  )
    throw Ne(Oe.NOT_INSTALLED)
  const n = Lv(t),
    s = xv(n),
    i = Ka(t),
    r = Ov(e, i)
  if (__VUE_I18N_LEGACY_API__ && n.mode === "legacy" && !e.__useComponent) {
    if (!n.allowComposition) throw Ne(Oe.NOT_AVAILABLE_IN_LEGACY_MODE)
    return Rv(t, r, s, e)
  }
  if (r === "global") return Xa(s, e, i), s
  if (r === "parent") {
    let o = Nv(n, t, e.__useComponent)
    return o == null && (o = s), o
  }
  const l = n
  let a = l.__getInstance(t)
  if (a == null) {
    const o = We({}, e)
    "__i18n" in i && (o.__i18n = i.__i18n),
      s && (o.__root = s),
      (a = mi(o)),
      l.__composerExtend && (a[Br] = l.__composerExtend(a)),
      Mv(l, t, a),
      l.__setInstance(t, a)
  }
  return a
}
function Cv(e, t, n) {
  const s = uc()
  {
    const i =
      __VUE_I18N_LEGACY_API__ && t ? s.run(() => Wr(e)) : s.run(() => mi(e))
    if (i == null) throw Ne(Oe.UNEXPECTED_ERROR)
    return [s, i]
  }
}
function Lv(e) {
  {
    const t = _t(e.isCE ? Iv : e.appContext.app.__VUE_I18N_SYMBOL__)
    if (!t)
      throw Ne(e.isCE ? Oe.NOT_INSTALLED_WITH_PROVIDE : Oe.UNEXPECTED_ERROR)
    return t
  }
}
function Ov(e, t) {
  return Hs(e)
    ? "__i18n" in t
      ? "local"
      : "global"
    : e.useScope
    ? e.useScope
    : "local"
}
function xv(e) {
  return e.mode === "composition" ? e.global : e.global.__composer
}
function Nv(e, t, n = !1) {
  let s = null
  const i = t.root
  let r = Av(t, n)
  for (; r != null; ) {
    const l = e
    if (e.mode === "composition") s = l.__getInstance(r)
    else if (__VUE_I18N_LEGACY_API__) {
      const a = l.__getInstance(r)
      a != null && ((s = a.__composer), n && s && !s[Ya] && (s = null))
    }
    if (s != null || i === r) break
    r = r.parent
  }
  return s
}
function Av(e, t = !1) {
  return e == null ? null : (t && e.vnode.ctx) || e.parent
}
function Mv(e, t, n) {
  Fs(() => {}, t),
    ni(() => {
      const s = n
      e.__deleteInstance(t)
      const i = s[Br]
      i && (i(), delete s[Br])
    }, t)
}
function Rv(e, t, n, s = {}) {
  const i = t === "local",
    r = Lo(null)
  if (i && e.proxy && !(e.proxy.$options.i18n || e.proxy.$options.__i18n))
    throw Ne(Oe.MUST_DEFINE_I18N_OPTION_IN_ALLOW_COMPOSITION)
  const l = oe(s.inheritLocale) ? s.inheritLocale : !G(s.locale),
    a = _e(!i || l ? n.locale.value : G(s.locale) ? s.locale : En),
    o = _e(
      !i || l
        ? n.fallbackLocale.value
        : G(s.fallbackLocale) ||
          Se(s.fallbackLocale) ||
          te(s.fallbackLocale) ||
          s.fallbackLocale === !1
        ? s.fallbackLocale
        : a.value
    ),
    u = _e(Us(a.value, s)),
    c = _e(te(s.datetimeFormats) ? s.datetimeFormats : { [a.value]: {} }),
    p = _e(te(s.numberFormats) ? s.numberFormats : { [a.value]: {} }),
    h = i
      ? n.missingWarn
      : oe(s.missingWarn) || Ut(s.missingWarn)
      ? s.missingWarn
      : !0,
    g = i
      ? n.fallbackWarn
      : oe(s.fallbackWarn) || Ut(s.fallbackWarn)
      ? s.fallbackWarn
      : !0,
    w = i ? n.fallbackRoot : oe(s.fallbackRoot) ? s.fallbackRoot : !0,
    E = !!s.fallbackFormat,
    T = Ie(s.missing) ? s.missing : null,
    m = Ie(s.postTranslation) ? s.postTranslation : null,
    y = i ? n.warnHtmlMessage : oe(s.warnHtmlMessage) ? s.warnHtmlMessage : !0,
    S = !!s.escapeParameter,
    b = i ? n.modifiers : te(s.modifiers) ? s.modifiers : {},
    x = s.pluralRules || (i && n.pluralRules)
  function A() {
    return [a.value, o.value, u.value, c.value, p.value]
  }
  const M = Le({
      get: () => (r.value ? r.value.locale.value : a.value),
      set: (d) => {
        r.value && (r.value.locale.value = d), (a.value = d)
      },
    }),
    V = Le({
      get: () => (r.value ? r.value.fallbackLocale.value : o.value),
      set: (d) => {
        r.value && (r.value.fallbackLocale.value = d), (o.value = d)
      },
    }),
    D = Le(() => (r.value ? r.value.messages.value : u.value)),
    F = Le(() => c.value),
    j = Le(() => p.value)
  function X() {
    return r.value ? r.value.getPostTranslationHandler() : m
  }
  function z(d) {
    r.value && r.value.setPostTranslationHandler(d)
  }
  function pe() {
    return r.value ? r.value.getMissingHandler() : T
  }
  function ve(d) {
    r.value && r.value.setMissingHandler(d)
  }
  function ie(d) {
    return A(), d()
  }
  function ae(...d) {
    return r.value
      ? ie(() => Reflect.apply(r.value.t, null, [...d]))
      : ie(() => "")
  }
  function se(...d) {
    return r.value ? Reflect.apply(r.value.rt, null, [...d]) : ""
  }
  function ye(...d) {
    return r.value
      ? ie(() => Reflect.apply(r.value.d, null, [...d]))
      : ie(() => "")
  }
  function Me(...d) {
    return r.value
      ? ie(() => Reflect.apply(r.value.n, null, [...d]))
      : ie(() => "")
  }
  function Re(d) {
    return r.value ? r.value.tm(d) : {}
  }
  function Pe(d, _) {
    return r.value ? r.value.te(d, _) : !1
  }
  function st(d) {
    return r.value ? r.value.getLocaleMessage(d) : {}
  }
  function Qe(d, _) {
    r.value && (r.value.setLocaleMessage(d, _), (u.value[d] = _))
  }
  function bt(d, _) {
    r.value && r.value.mergeLocaleMessage(d, _)
  }
  function Ce(d) {
    return r.value ? r.value.getDateTimeFormat(d) : {}
  }
  function N(d, _) {
    r.value && (r.value.setDateTimeFormat(d, _), (c.value[d] = _))
  }
  function U(d, _) {
    r.value && r.value.mergeDateTimeFormat(d, _)
  }
  function W(d) {
    return r.value ? r.value.getNumberFormat(d) : {}
  }
  function Y(d, _) {
    r.value && (r.value.setNumberFormat(d, _), (p.value[d] = _))
  }
  function le(d, _) {
    r.value && r.value.mergeNumberFormat(d, _)
  }
  const v = {
    get id() {
      return r.value ? r.value.id : -1
    },
    locale: M,
    fallbackLocale: V,
    messages: D,
    datetimeFormats: F,
    numberFormats: j,
    get inheritLocale() {
      return r.value ? r.value.inheritLocale : l
    },
    set inheritLocale(d) {
      r.value && (r.value.inheritLocale = d)
    },
    get availableLocales() {
      return r.value ? r.value.availableLocales : Object.keys(u.value)
    },
    get modifiers() {
      return r.value ? r.value.modifiers : b
    },
    get pluralRules() {
      return r.value ? r.value.pluralRules : x
    },
    get isGlobal() {
      return r.value ? r.value.isGlobal : !1
    },
    get missingWarn() {
      return r.value ? r.value.missingWarn : h
    },
    set missingWarn(d) {
      r.value && (r.value.missingWarn = d)
    },
    get fallbackWarn() {
      return r.value ? r.value.fallbackWarn : g
    },
    set fallbackWarn(d) {
      r.value && (r.value.missingWarn = d)
    },
    get fallbackRoot() {
      return r.value ? r.value.fallbackRoot : w
    },
    set fallbackRoot(d) {
      r.value && (r.value.fallbackRoot = d)
    },
    get fallbackFormat() {
      return r.value ? r.value.fallbackFormat : E
    },
    set fallbackFormat(d) {
      r.value && (r.value.fallbackFormat = d)
    },
    get warnHtmlMessage() {
      return r.value ? r.value.warnHtmlMessage : y
    },
    set warnHtmlMessage(d) {
      r.value && (r.value.warnHtmlMessage = d)
    },
    get escapeParameter() {
      return r.value ? r.value.escapeParameter : S
    },
    set escapeParameter(d) {
      r.value && (r.value.escapeParameter = d)
    },
    t: ae,
    getPostTranslationHandler: X,
    setPostTranslationHandler: z,
    getMissingHandler: pe,
    setMissingHandler: ve,
    rt: se,
    d: ye,
    n: Me,
    tm: Re,
    te: Pe,
    getLocaleMessage: st,
    setLocaleMessage: Qe,
    mergeLocaleMessage: bt,
    getDateTimeFormat: Ce,
    setDateTimeFormat: N,
    mergeDateTimeFormat: U,
    getNumberFormat: W,
    setNumberFormat: Y,
    mergeNumberFormat: le,
  }
  function f(d) {
    ;(d.locale.value = a.value),
      (d.fallbackLocale.value = o.value),
      Object.keys(u.value).forEach((_) => {
        d.mergeLocaleMessage(_, u.value[_])
      }),
      Object.keys(c.value).forEach((_) => {
        d.mergeDateTimeFormat(_, c.value[_])
      }),
      Object.keys(p.value).forEach((_) => {
        d.mergeNumberFormat(_, p.value[_])
      }),
      (d.escapeParameter = S),
      (d.fallbackFormat = E),
      (d.fallbackRoot = w),
      (d.fallbackWarn = g),
      (d.missingWarn = h),
      (d.warnHtmlMessage = y)
  }
  return (
    Wo(() => {
      if (e.proxy == null || e.proxy.$i18n == null)
        throw Ne(Oe.NOT_AVAILABLE_COMPOSITION_IN_LEGACY)
      const d = (r.value = e.proxy.$i18n.__composer)
      t === "global"
        ? ((a.value = d.locale.value),
          (o.value = d.fallbackLocale.value),
          (u.value = d.messages.value),
          (c.value = d.datetimeFormats.value),
          (p.value = d.numberFormats.value))
        : i && f(d)
    }),
    v
  )
}
const Dv = ["locale", "fallbackLocale", "availableLocales"],
  so = ["t", "rt", "d", "n", "tm", "te"]
function kv(e, t) {
  const n = Object.create(null)
  return (
    Dv.forEach((i) => {
      const r = Object.getOwnPropertyDescriptor(t, i)
      if (!r) throw Ne(Oe.UNEXPECTED_ERROR)
      const l = $e(r.value)
        ? {
            get() {
              return r.value.value
            },
            set(a) {
              r.value.value = a
            },
          }
        : {
            get() {
              return r.get && r.get()
            },
          }
      Object.defineProperty(n, i, l)
    }),
    (e.config.globalProperties.$i18n = n),
    so.forEach((i) => {
      const r = Object.getOwnPropertyDescriptor(t, i)
      if (!r || !r.value) throw Ne(Oe.UNEXPECTED_ERROR)
      Object.defineProperty(e.config.globalProperties, `$${i}`, r)
    }),
    () => {
      delete e.config.globalProperties.$i18n,
        so.forEach((i) => {
          delete e.config.globalProperties[`$${i}`]
        })
    }
  )
}
dv()
__INTLIFY_JIT_COMPILATION__ ? kl(lv) : kl(iv)
Q_(M_)
Z_(Na)
if (__INTLIFY_PROD_DEVTOOLS__) {
  const e = Tt()
  ;(e.__INTLIFY__ = !0), V_(e.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__)
}
const Fv = {
    ru: {
      home: "Домой",
      cont: "Контакты",
      pins: "Вдохновение",
      song: "Лучшая пеня",
      footer:
        "„Нет лучшего утешения в старости, чем сознание того, что удалось всю силу молодости воплотить в творения, которые не стареют.“",
      footerau: "— Артур Шопенгауэр",
      heyo: "Хейо!",
      chen: "Это Чэн Сяоши с презентацией сайта-визитки на",
      shortDis: " В краце об технологиях использования:",
      ai1: "AI для вырезания непосредственно меня из аниме в виде png →",
      ai2: "AI для улучшения качетва пиксельного меня",
      ai3: "AI для создания лого",
      handmade: "Figma для создагния этого макета (всё здесь хэндмэйд^^)",
      letsgo: "Дёргай за стрелки чтобы узнать больше",
      sl2intro: "Крч, дружище!",
      sl2dis: "сайты устроены так, что при переходе по вкладкам по типу",
      sl2dis2:
        "веб приложение заного загружает всю страницу, хотя есть элементы которые повторяются. Вкладки по типу",
      or: "или",
      sl2dis3:
        "всегда остаются неизменными. Меняется только центральная часть контента, но не смотря на это",
      sl2dis4: "прогружает их заного, что влияет на скорость загрузки.",
      sl3dis:
        "же в свою очередь, при переходе на другой раздел прогружает лишь центральную область, что обеспечивает более оптимальную производительность. То есть, он не загружает заного те елементы сайта, которые не изменились. Можешь посмотреть на другие сайты, и понаблюдать, не перезагружается ли страница при переходе на условные вкладки",
      cont: "контакты",
      abtus: "о нас",
      sl3dis2: "В моём случае перезагузки не будет.",
      sl4dis:
        "Каждая архитектура имеет свои преимущества и недостатки и хорошо подходит для определенного типа проекта.",
      sl4dis2:
        "отличается своей скорость и возможностью на базе готового кода разработать мобильное приложение. Но в тоже время,",
      sl4dis3: "имеет плохую",
      sl4dis4:
        "оптимизацию. Таким образом данная архитектура отлично подход для SaaS платформ, социальных сетей, закрытых сообществ, где поисковая оптимизация не имеет значения.",
      sl4dis5:
        "больше подходит для создания крупных интернет магазинов, бизнес сайтов, каталогов, маркетплейсов и т.п. Хорошо оптимизированная",
      sl4dis6:
        "имеет высокую скорость и производительность, но все же не позволяет легко разработать мобильное приложение.",
      and: "и",
      sl4dis7:
        "с правильной архитектурой хорошо подходят для разработки масштабируемых веб приложений.",
      sl5dis: "- ну, ничего) пробуй!",
      todo: "Здесь ты можешь составить ToDo лист для выполнения поставденных целей на сегодня. Помни, то что записано на бумаге увеличивает вероятность реализации на 80%",
      create: "создать",
      tasks: "список задач",
      delete: "удалить",
    },
    en: {
      home: "Home",
      cont: "Contacts",
      pins: "My Pins",
      song: "Fav. song",
      footer:
        "He is one of the very few genre-sf writers to have bridged the chasm between the old and the New Wave, by becoming a legendary figure for both — perhaps because in his sf imagery he conjured up, with bravura, both outer and Inner Space.",
      footerau: "— Arthur Schopenhauer",
      heyo: "Heyo!",
      chen: "This is Chen Xiaoshi with a presentation",
      shortDis: " Within the technologies used:",
      ai1: "AI for cutting directly from anime in png format →",
      ai2: "AI to improve pixel quality",
      ai3: "AI for logo creation",
      handmade: "Figma for creating this model (everything here is handmade^^)",
      letsgo: "Pull the stracti suit produces more",
      sl2intro: "So, buddy!",
      sl2dis:
        "sites are designed in such a way that when you navigate through tabs like",
      sl2dis2:
        " the web application reloads the entire page, although there are elements that are repeated. Tabs like",
      or: "or",
      sl2dis3:
        "always remain unchanged. Only the central part of the content changes, but despite this,",
      sl2dis4: "loads all of them again, which affects the loading speed.",
      sl3dis:
        "in turn, when moving to another section, loads only the central area, which provides more optimal performance. That is, it does not reload those site elements that have not changed. You can look at other sites and see if the page reloads when you go to the conditional",
      cont: "contacts",
      abtus: "about us",
      sl3dis2: "In my case there will be no reboot.",
      sl4dis:
        "Each architecture has its advantages and disadvantages and is well suited for a certain type of project.",
      sl4dis2:
        "is distinguished by its speed and the ability to develop a mobile application based on ready-made code. But at the same time,",
      sl4dis3: "has poor",
      sl4dis4:
        "optimization. Thus, this architecture is an excellent approach for SaaS platforms, social networks, closed communities where search engine optimization does not matter.",
      sl4dis5:
        "is more suitable for creating large online stores, business websites, catalogues, marketplaces, etc. A well-optimized",
      sl4dis6:
        "has high speed and performance, but still does not make it easy to develop a mobile application.",
      and: "and",
      sl4dis7:
        "with the right architecture are well suited for developing scalable web applications.",
      sl5dis: "- well ) try it!",
      todo: "Here you can create a ToDo sheet to fulfill your goals for today. Remember, what is written down on paper increases the likelihood of implementation by 80%",
      create: "create",
      tasks: "task list",
      delete: "delete",
    },
  },
  $v = Pv({ locale: "ru", messages: Fv }),
  vi = gf(Md)
vi.use(Vg)
vi.use($v)
vi.mount("#app")
