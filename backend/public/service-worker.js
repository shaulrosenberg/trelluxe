/*! For license information please see service-worker.js.LICENSE.txt */
!(function () {
  'use strict'
  var e = {
      923: function () {
        try {
          self['workbox:core:6.5.3'] && _()
        } catch (e) {}
      },
      190: function () {
        try {
          self['workbox:expiration:6.5.3'] && _()
        } catch (e) {}
      },
      437: function () {
        try {
          self['workbox:precaching:6.5.3'] && _()
        } catch (e) {}
      },
      185: function () {
        try {
          self['workbox:routing:6.5.3'] && _()
        } catch (e) {}
      },
      833: function () {
        try {
          self['workbox:strategies:6.5.3'] && _()
        } catch (e) {}
      },
    },
    t = {}
  function r(n) {
    var a = t[n]
    if (void 0 !== a) return a.exports
    var i = (t[n] = { exports: {} })
    return e[n](i, i.exports, r), i.exports
  }
  !(function () {
    r(923)
    var e = null
    function t(e) {
      return (
        (t =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e
              }),
        t(e)
      )
    }
    function n(e) {
      var r = (function (e, r) {
        if ('object' !== t(e) || null === e) return e
        var n = e[Symbol.toPrimitive]
        if (void 0 !== n) {
          var a = n.call(e, r || 'default')
          if ('object' !== t(a)) return a
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return ('string' === r ? String : Number)(e)
      })(e, 'string')
      return 'symbol' === t(r) ? r : String(r)
    }
    function a(e, t) {
      for (var r = 0; r < t.length; r++) {
        var a = t[r]
        ;(a.enumerable = a.enumerable || !1),
          (a.configurable = !0),
          'value' in a && (a.writable = !0),
          Object.defineProperty(e, n(a.key), a)
      }
    }
    function i(e, t, r) {
      return (
        t && a(e.prototype, t),
        r && a(e, r),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        e
      )
    }
    function s(e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
    }
    function c(e, t) {
      return (
        (c = Object.setPrototypeOf
          ? Object.setPrototypeOf.bind()
          : function (e, t) {
              return (e.__proto__ = t), e
            }),
        c(e, t)
      )
    }
    function o(e, t) {
      if ('function' !== typeof t && null !== t)
        throw new TypeError(
          'Super expression must either be null or a function'
        )
      ;(e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        Object.defineProperty(e, 'prototype', { writable: !1 }),
        t && c(e, t)
    }
    function u(e) {
      return (
        (u = Object.setPrototypeOf
          ? Object.getPrototypeOf.bind()
          : function (e) {
              return e.__proto__ || Object.getPrototypeOf(e)
            }),
        u(e)
      )
    }
    function h() {
      if ('undefined' === typeof Reflect || !Reflect.construct) return !1
      if (Reflect.construct.sham) return !1
      if ('function' === typeof Proxy) return !0
      try {
        return (
          Boolean.prototype.valueOf.call(
            Reflect.construct(Boolean, [], function () {})
          ),
          !0
        )
      } catch (e) {
        return !1
      }
    }
    function f(e, r) {
      if (r && ('object' === t(r) || 'function' === typeof r)) return r
      if (void 0 !== r)
        throw new TypeError(
          'Derived constructors may only return object or undefined'
        )
      return (function (e) {
        if (void 0 === e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          )
        return e
      })(e)
    }
    function l(e) {
      var t = h()
      return function () {
        var r,
          n = u(e)
        if (t) {
          var a = u(this).constructor
          r = Reflect.construct(n, arguments, a)
        } else r = n.apply(this, arguments)
        return f(this, r)
      }
    }
    function p(e, t, r) {
      return (
        (p = h()
          ? Reflect.construct.bind()
          : function (e, t, r) {
              var n = [null]
              n.push.apply(n, t)
              var a = new (Function.bind.apply(e, n))()
              return r && c(a, r.prototype), a
            }),
        p.apply(null, arguments)
      )
    }
    function v(e) {
      var t = 'function' === typeof Map ? new Map() : void 0
      return (
        (v = function (e) {
          if (
            null === e ||
            ((r = e), -1 === Function.toString.call(r).indexOf('[native code]'))
          )
            return e
          var r
          if ('function' !== typeof e)
            throw new TypeError(
              'Super expression must either be null or a function'
            )
          if ('undefined' !== typeof t) {
            if (t.has(e)) return t.get(e)
            t.set(e, n)
          }
          function n() {
            return p(e, arguments, u(this).constructor)
          }
          return (
            (n.prototype = Object.create(e.prototype, {
              constructor: {
                value: n,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
            c(n, e)
          )
        }),
        v(e)
      )
    }
    var d = function (e) {
        for (
          var t = e,
            r = arguments.length,
            n = new Array(r > 1 ? r - 1 : 0),
            a = 1;
          a < r;
          a++
        )
          n[a - 1] = arguments[a]
        return n.length > 0 && (t += ' :: '.concat(JSON.stringify(n))), t
      },
      y = (function (e) {
        o(r, e)
        var t = l(r)
        function r(e, n) {
          var a
          s(this, r)
          var i = d(e, n)
          return ((a = t.call(this, i)).name = e), (a.details = n), a
        }
        return i(r)
      })(v(Error)),
      b = new Set()
    function g(e) {
      b.add(e)
    }
    var m,
      x = {
        googleAnalytics: 'googleAnalytics',
        precache: 'precache-v2',
        prefix: 'workbox',
        runtime: 'runtime',
        suffix: 'undefined' !== typeof registration ? registration.scope : '',
      },
      w = function (e) {
        return [x.prefix, e, x.suffix]
          .filter(function (e) {
            return e && e.length > 0
          })
          .join('-')
      },
      k = function (e) {
        return e || w(x.precache)
      },
      _ = function (e) {
        return e || w(x.runtime)
      }
    function R() {
      R = function () {
        return e
      }
      var e = {},
        r = Object.prototype,
        n = r.hasOwnProperty,
        a =
          Object.defineProperty ||
          function (e, t, r) {
            e[t] = r.value
          },
        i = 'function' == typeof Symbol ? Symbol : {},
        s = i.iterator || '@@iterator',
        c = i.asyncIterator || '@@asyncIterator',
        o = i.toStringTag || '@@toStringTag'
      function u(e, t, r) {
        return (
          Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          }),
          e[t]
        )
      }
      try {
        u({}, '')
      } catch (j) {
        u = function (e, t, r) {
          return (e[t] = r)
        }
      }
      function h(e, t, r, n) {
        var i = t && t.prototype instanceof p ? t : p,
          s = Object.create(i.prototype),
          c = new C(n || [])
        return a(s, '_invoke', { value: k(e, r, c) }), s
      }
      function f(e, t, r) {
        try {
          return { type: 'normal', arg: e.call(t, r) }
        } catch (j) {
          return { type: 'throw', arg: j }
        }
      }
      e.wrap = h
      var l = {}
      function p() {}
      function v() {}
      function d() {}
      var y = {}
      u(y, s, function () {
        return this
      })
      var b = Object.getPrototypeOf,
        g = b && b(b(O([])))
      g && g !== r && n.call(g, s) && (y = g)
      var m = (d.prototype = p.prototype = Object.create(y))
      function x(e) {
        ;['next', 'throw', 'return'].forEach(function (t) {
          u(e, t, function (e) {
            return this._invoke(t, e)
          })
        })
      }
      function w(e, r) {
        function i(a, s, c, o) {
          var u = f(e[a], e, s)
          if ('throw' !== u.type) {
            var h = u.arg,
              l = h.value
            return l && 'object' == t(l) && n.call(l, '__await')
              ? r.resolve(l.__await).then(
                  function (e) {
                    i('next', e, c, o)
                  },
                  function (e) {
                    i('throw', e, c, o)
                  }
                )
              : r.resolve(l).then(
                  function (e) {
                    ;(h.value = e), c(h)
                  },
                  function (e) {
                    return i('throw', e, c, o)
                  }
                )
          }
          o(u.arg)
        }
        var s
        a(this, '_invoke', {
          value: function (e, t) {
            function n() {
              return new r(function (r, n) {
                i(e, t, r, n)
              })
            }
            return (s = s ? s.then(n, n) : n())
          },
        })
      }
      function k(e, t, r) {
        var n = 'suspendedStart'
        return function (a, i) {
          if ('executing' === n) throw new Error('Generator is already running')
          if ('completed' === n) {
            if ('throw' === a) throw i
            return S()
          }
          for (r.method = a, r.arg = i; ; ) {
            var s = r.delegate
            if (s) {
              var c = _(s, r)
              if (c) {
                if (c === l) continue
                return c
              }
            }
            if ('next' === r.method) r.sent = r._sent = r.arg
            else if ('throw' === r.method) {
              if ('suspendedStart' === n) throw ((n = 'completed'), r.arg)
              r.dispatchException(r.arg)
            } else 'return' === r.method && r.abrupt('return', r.arg)
            n = 'executing'
            var o = f(e, t, r)
            if ('normal' === o.type) {
              if (((n = r.done ? 'completed' : 'suspendedYield'), o.arg === l))
                continue
              return { value: o.arg, done: r.done }
            }
            'throw' === o.type &&
              ((n = 'completed'), (r.method = 'throw'), (r.arg = o.arg))
          }
        }
      }
      function _(e, t) {
        var r = t.method,
          n = e.iterator[r]
        if (void 0 === n)
          return (
            (t.delegate = null),
            ('throw' === r &&
              e.iterator.return &&
              ((t.method = 'return'),
              (t.arg = void 0),
              _(e, t),
              'throw' === t.method)) ||
              ('return' !== r &&
                ((t.method = 'throw'),
                (t.arg = new TypeError(
                  "The iterator does not provide a '" + r + "' method"
                )))),
            l
          )
        var a = f(n, e.iterator, t.arg)
        if ('throw' === a.type)
          return (t.method = 'throw'), (t.arg = a.arg), (t.delegate = null), l
        var i = a.arg
        return i
          ? i.done
            ? ((t[e.resultName] = i.value),
              (t.next = e.nextLoc),
              'return' !== t.method && ((t.method = 'next'), (t.arg = void 0)),
              (t.delegate = null),
              l)
            : i
          : ((t.method = 'throw'),
            (t.arg = new TypeError('iterator result is not an object')),
            (t.delegate = null),
            l)
      }
      function E(e) {
        var t = { tryLoc: e[0] }
        1 in e && (t.catchLoc = e[1]),
          2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
          this.tryEntries.push(t)
      }
      function L(e) {
        var t = e.completion || {}
        ;(t.type = 'normal'), delete t.arg, (e.completion = t)
      }
      function C(e) {
        ;(this.tryEntries = [{ tryLoc: 'root' }]),
          e.forEach(E, this),
          this.reset(!0)
      }
      function O(e) {
        if (e) {
          var t = e[s]
          if (t) return t.call(e)
          if ('function' == typeof e.next) return e
          if (!isNaN(e.length)) {
            var r = -1,
              a = function t() {
                for (; ++r < e.length; )
                  if (n.call(e, r)) return (t.value = e[r]), (t.done = !1), t
                return (t.value = void 0), (t.done = !0), t
              }
            return (a.next = a)
          }
        }
        return { next: S }
      }
      function S() {
        return { value: void 0, done: !0 }
      }
      return (
        (v.prototype = d),
        a(m, 'constructor', { value: d, configurable: !0 }),
        a(d, 'constructor', { value: v, configurable: !0 }),
        (v.displayName = u(d, o, 'GeneratorFunction')),
        (e.isGeneratorFunction = function (e) {
          var t = 'function' == typeof e && e.constructor
          return (
            !!t &&
            (t === v || 'GeneratorFunction' === (t.displayName || t.name))
          )
        }),
        (e.mark = function (e) {
          return (
            Object.setPrototypeOf
              ? Object.setPrototypeOf(e, d)
              : ((e.__proto__ = d), u(e, o, 'GeneratorFunction')),
            (e.prototype = Object.create(m)),
            e
          )
        }),
        (e.awrap = function (e) {
          return { __await: e }
        }),
        x(w.prototype),
        u(w.prototype, c, function () {
          return this
        }),
        (e.AsyncIterator = w),
        (e.async = function (t, r, n, a, i) {
          void 0 === i && (i = Promise)
          var s = new w(h(t, r, n, a), i)
          return e.isGeneratorFunction(r)
            ? s
            : s.next().then(function (e) {
                return e.done ? e.value : s.next()
              })
        }),
        x(m),
        u(m, o, 'Generator'),
        u(m, s, function () {
          return this
        }),
        u(m, 'toString', function () {
          return '[object Generator]'
        }),
        (e.keys = function (e) {
          var t = Object(e),
            r = []
          for (var n in t) r.push(n)
          return (
            r.reverse(),
            function e() {
              for (; r.length; ) {
                var n = r.pop()
                if (n in t) return (e.value = n), (e.done = !1), e
              }
              return (e.done = !0), e
            }
          )
        }),
        (e.values = O),
        (C.prototype = {
          constructor: C,
          reset: function (e) {
            if (
              ((this.prev = 0),
              (this.next = 0),
              (this.sent = this._sent = void 0),
              (this.done = !1),
              (this.delegate = null),
              (this.method = 'next'),
              (this.arg = void 0),
              this.tryEntries.forEach(L),
              !e)
            )
              for (var t in this)
                't' === t.charAt(0) &&
                  n.call(this, t) &&
                  !isNaN(+t.slice(1)) &&
                  (this[t] = void 0)
          },
          stop: function () {
            this.done = !0
            var e = this.tryEntries[0].completion
            if ('throw' === e.type) throw e.arg
            return this.rval
          },
          dispatchException: function (e) {
            if (this.done) throw e
            var t = this
            function r(r, n) {
              return (
                (s.type = 'throw'),
                (s.arg = e),
                (t.next = r),
                n && ((t.method = 'next'), (t.arg = void 0)),
                !!n
              )
            }
            for (var a = this.tryEntries.length - 1; a >= 0; --a) {
              var i = this.tryEntries[a],
                s = i.completion
              if ('root' === i.tryLoc) return r('end')
              if (i.tryLoc <= this.prev) {
                var c = n.call(i, 'catchLoc'),
                  o = n.call(i, 'finallyLoc')
                if (c && o) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                } else if (c) {
                  if (this.prev < i.catchLoc) return r(i.catchLoc, !0)
                } else {
                  if (!o)
                    throw new Error('try statement without catch or finally')
                  if (this.prev < i.finallyLoc) return r(i.finallyLoc)
                }
              }
            }
          },
          abrupt: function (e, t) {
            for (var r = this.tryEntries.length - 1; r >= 0; --r) {
              var a = this.tryEntries[r]
              if (
                a.tryLoc <= this.prev &&
                n.call(a, 'finallyLoc') &&
                this.prev < a.finallyLoc
              ) {
                var i = a
                break
              }
            }
            i &&
              ('break' === e || 'continue' === e) &&
              i.tryLoc <= t &&
              t <= i.finallyLoc &&
              (i = null)
            var s = i ? i.completion : {}
            return (
              (s.type = e),
              (s.arg = t),
              i
                ? ((this.method = 'next'), (this.next = i.finallyLoc), l)
                : this.complete(s)
            )
          },
          complete: function (e, t) {
            if ('throw' === e.type) throw e.arg
            return (
              'break' === e.type || 'continue' === e.type
                ? (this.next = e.arg)
                : 'return' === e.type
                ? ((this.rval = this.arg = e.arg),
                  (this.method = 'return'),
                  (this.next = 'end'))
                : 'normal' === e.type && t && (this.next = t),
              l
            )
          },
          finish: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t]
              if (r.finallyLoc === e)
                return this.complete(r.completion, r.afterLoc), L(r), l
            }
          },
          catch: function (e) {
            for (var t = this.tryEntries.length - 1; t >= 0; --t) {
              var r = this.tryEntries[t]
              if (r.tryLoc === e) {
                var n = r.completion
                if ('throw' === n.type) {
                  var a = n.arg
                  L(r)
                }
                return a
              }
            }
            throw new Error('illegal catch attempt')
          },
          delegateYield: function (e, t, r) {
            return (
              (this.delegate = { iterator: O(e), resultName: t, nextLoc: r }),
              'next' === this.method && (this.arg = void 0),
              l
            )
          },
        }),
        e
      )
    }
    function E(e, t, r, n, a, i, s) {
      try {
        var c = e[i](s),
          o = c.value
      } catch (u) {
        return void r(u)
      }
      c.done ? t(o) : Promise.resolve(o).then(n, a)
    }
    function L(e) {
      return function () {
        var t = this,
          r = arguments
        return new Promise(function (n, a) {
          var i = e.apply(t, r)
          function s(e) {
            E(i, n, a, s, c, 'next', e)
          }
          function c(e) {
            E(i, n, a, s, c, 'throw', e)
          }
          s(void 0)
        })
      }
    }
    function C(e, t) {
      ;(null == t || t > e.length) && (t = e.length)
      for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r]
      return n
    }
    function O(e, t) {
      if (e) {
        if ('string' === typeof e) return C(e, t)
        var r = Object.prototype.toString.call(e).slice(8, -1)
        return (
          'Object' === r && e.constructor && (r = e.constructor.name),
          'Map' === r || 'Set' === r
            ? Array.from(e)
            : 'Arguments' === r ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
            ? C(e, t)
            : void 0
        )
      }
    }
    function S(e, t) {
      var r =
        ('undefined' !== typeof Symbol && e[Symbol.iterator]) || e['@@iterator']
      if (!r) {
        if (
          Array.isArray(e) ||
          (r = O(e)) ||
          (t && e && 'number' === typeof e.length)
        ) {
          r && (e = r)
          var n = 0,
            a = function () {}
          return {
            s: a,
            n: function () {
              return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] }
            },
            e: function (e) {
              throw e
            },
            f: a,
          }
        }
        throw new TypeError(
          'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        )
      }
      var i,
        s = !0,
        c = !1
      return {
        s: function () {
          r = r.call(e)
        },
        n: function () {
          var e = r.next()
          return (s = e.done), e
        },
        e: function (e) {
          ;(c = !0), (i = e)
        },
        f: function () {
          try {
            s || null == r.return || r.return()
          } finally {
            if (c) throw i
          }
        },
      }
    }
    function j(e, t) {
      var r,
        n = new URL(e),
        a = S(t)
      try {
        for (a.s(); !(r = a.n()).done; ) {
          var i = r.value
          n.searchParams.delete(i)
        }
      } catch (s) {
        a.e(s)
      } finally {
        a.f()
      }
      return n.href
    }
    function P(e, t, r, n) {
      return T.apply(this, arguments)
    }
    function T() {
      return (T = L(
        R().mark(function e(t, r, n, a) {
          var i, s, c, o, u, h, f
          return R().wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if (((i = j(r.url, n)), r.url !== i)) {
                      e.next = 3
                      break
                    }
                    return e.abrupt('return', t.match(r, a))
                  case 3:
                    return (
                      (s = Object.assign(Object.assign({}, a), {
                        ignoreSearch: !0,
                      })),
                      (e.next = 6),
                      t.keys(r, s)
                    )
                  case 6:
                    ;(c = e.sent), (o = S(c)), (e.prev = 8), o.s()
                  case 10:
                    if ((u = o.n()).done) {
                      e.next = 17
                      break
                    }
                    if (((h = u.value), (f = j(h.url, n)), i !== f)) {
                      e.next = 15
                      break
                    }
                    return e.abrupt('return', t.match(h, a))
                  case 15:
                    e.next = 10
                    break
                  case 17:
                    e.next = 22
                    break
                  case 19:
                    ;(e.prev = 19), (e.t0 = e.catch(8)), o.e(e.t0)
                  case 22:
                    return (e.prev = 22), o.f(), e.finish(22)
                  case 25:
                    return e.abrupt('return')
                  case 26:
                  case 'end':
                    return e.stop()
                }
            },
            e,
            null,
            [[8, 19, 22, 25]]
          )
        })
      )).apply(this, arguments)
    }
    function D() {
      if (void 0 === m) {
        var e = new Response('')
        if ('body' in e)
          try {
            new Response(e.body), (m = !0)
          } catch (t) {
            m = !1
          }
        m = !1
      }
      return m
    }
    function q(e) {
      e.then(function () {})
    }
    var N = i(function e() {
      var t = this
      s(this, e),
        (this.promise = new Promise(function (e, r) {
          ;(t.resolve = e), (t.reject = r)
        }))
    })
    function U() {
      return I.apply(this, arguments)
    }
    function I() {
      return (I = L(
        R().mark(function e() {
          var t, r, n
          return R().wrap(
            function (e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    0, (t = S(b)), (e.prev = 2), t.s()
                  case 4:
                    if ((r = t.n()).done) {
                      e.next = 11
                      break
                    }
                    return (n = r.value), (e.next = 8), n()
                  case 8:
                    0
                  case 9:
                    e.next = 4
                    break
                  case 11:
                    e.next = 16
                    break
                  case 13:
                    ;(e.prev = 13), (e.t0 = e.catch(2)), t.e(e.t0)
                  case 16:
                    return (e.prev = 16), t.f(), e.finish(16)
                  case 19:
                    0
                  case 20:
                  case 'end':
                    return e.stop()
                }
            },
            e,
            null,
            [[2, 13, 16, 19]]
          )
        })
      )).apply(this, arguments)
    }
    var A = function (e) {
      return new URL(String(e), location.href).href.replace(
        new RegExp('^'.concat(location.origin)),
        ''
      )
    }
    function K(e) {
      return new Promise(function (t) {
        return setTimeout(t, e)
      })
    }
    function M(e, t) {
      var r = t()
      return e.waitUntil(r), r
    }
    function W(e, t) {
      return B.apply(this, arguments)
    }
    function B() {
      return (B = L(
        R().mark(function e(t, r) {
          var n, a, i, s, c, o
          return R().wrap(function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (
                    ((n = null),
                    t.url && ((a = new URL(t.url)), (n = a.origin)),
                    n === self.location.origin)
                  ) {
                    e.next = 4
                    break
                  }
                  throw new y('cross-origin-copy-response', { origin: n })
                case 4:
                  if (
                    ((i = t.clone()),
                    (s = {
                      headers: new Headers(i.headers),
                      status: i.status,
                      statusText: i.statusText,
                    }),
                    (c = r ? r(s) : s),
                    !D())
                  ) {
                    e.next = 11
                    break
                  }
                  ;(e.t0 = i.body), (e.next = 14)
                  break
                case 11:
                  return (e.next = 13), i.blob()
                case 13:
                  e.t0 = e.sent
                case 14:
                  return (o = e.t0), e.abrupt('return', new Response(o, c))
                case 16:
                case 'end':
                  return e.stop()
              }
          }, e)
        })
      )).apply(this, arguments)
    }
    function F(e, t, r) {
      return (
        (t = n(t)) in e
          ? Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = r),
        e
      )
    }
    function H(e, t) {
      var r = Object.keys(e)
      if (Object.getOwnPropertySymbols) {
        var n = Object.getOwnPropertySymbols(e)
        t &&
          (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable
          })),
          r.push.apply(r, n)
      }
      return r
    }
    function V(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = null != arguments[t] ? arguments[t] : {}
        t % 2
          ? H(Object(r), !0).forEach(function (t) {
              F(e, t, r[t])
            })
          : Object.getOwnPropertyDescriptors
          ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
          : H(Object(r)).forEach(function (t) {
              Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t))
            })
      }
      return e
    }
    var G, $
    var Y = new WeakMap(),
      Q = new WeakMap(),
      J = new WeakMap(),
      z = new WeakMap(),
      X = new WeakMap()
    var Z = {
      get: function (e, t, r) {
        if (e instanceof IDBTransaction) {
          if ('done' === t) return Q.get(e)
          if ('objectStoreNames' === t) return e.objectStoreNames || J.get(e)
          if ('store' === t)
            return r.objectStoreNames[1]
              ? void 0
              : r.objectStore(r.objectStoreNames[0])
        }
        return re(e[t])
      },
      set: function (e, t, r) {
        return (e[t] = r), !0
      },
      has: function (e, t) {
        return (
          (e instanceof IDBTransaction && ('done' === t || 'store' === t)) ||
          t in e
        )
      },
    }
    function ee(e) {
      return e !== IDBDatabase.prototype.transaction ||
        'objectStoreNames' in IDBTransaction.prototype
        ? (
            $ ||
            ($ = [
              IDBCursor.prototype.advance,
              IDBCursor.prototype.continue,
              IDBCursor.prototype.continuePrimaryKey,
            ])
          ).includes(e)
          ? function () {
              for (
                var t = arguments.length, r = new Array(t), n = 0;
                n < t;
                n++
              )
                r[n] = arguments[n]
              return e.apply(ne(this), r), re(Y.get(this))
            }
          : function () {
              for (
                var t = arguments.length, r = new Array(t), n = 0;
                n < t;
                n++
              )
                r[n] = arguments[n]
              return re(e.apply(ne(this), r))
            }
        : function (t) {
            for (
              var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1;
              a < r;
              a++
            )
              n[a - 1] = arguments[a]
            var i = e.call.apply(e, [ne(this), t].concat(n))
            return J.set(i, t.sort ? t.sort() : [t]), re(i)
          }
    }
    function te(e) {
      return 'function' === typeof e
        ? ee(e)
        : (e instanceof IDBTransaction &&
            (function (e) {
              if (!Q.has(e)) {
                var t = new Promise(function (t, r) {
                  var n = function () {
                      e.removeEventListener('complete', a),
                        e.removeEventListener('error', i),
                        e.removeEventListener('abort', i)
                    },
                    a = function () {
                      t(), n()
                    },
                    i = function () {
                      r(
                        e.error || new DOMException('AbortError', 'AbortError')
                      ),
                        n()
                    }
                  e.addEventListener('complete', a),
                    e.addEventListener('error', i),
                    e.addEventListener('abort', i)
                })
                Q.set(e, t)
              }
            })(e),
          (t = e),
          (
            G ||
            (G = [
              IDBDatabase,
              IDBObjectStore,
              IDBIndex,
              IDBCursor,
              IDBTransaction,
            ])
          ).some(function (e) {
            return t instanceof e
          })
            ? new Proxy(e, Z)
            : e)
      var t
    }
    function re(e) {
      if (e instanceof IDBRequest)
        return (function (e) {
          var t = new Promise(function (t, r) {
            var n = function () {
                e.removeEventListener('success', a),
                  e.removeEventListener('error', i)
              },
              a = function () {
                t(re(e.result)), n()
              },
              i = function () {
                r(e.error), n()
              }
            e.addEventListener('success', a), e.addEventListener('error', i)
          })
          return (
            t
              .then(function (t) {
                t instanceof IDBCursor && Y.set(t, e)
              })
              .catch(function () {}),
            X.set(t, e),
            t
          )
        })(e)
      if (z.has(e)) return z.get(e)
      var t = te(e)
      return t !== e && (z.set(e, t), X.set(t, e)), t
    }
    var ne = function (e) {
      return X.get(e)
    }
    function ae(e, t) {
      var r =
          arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
        n = r.blocked,
        a = r.upgrade,
        i = r.blocking,
        s = r.terminated,
        c = indexedDB.open(e, t),
        o = re(c)
      return (
        a &&
          c.addEventListener('upgradeneeded', function (e) {
            a(re(c.result), e.oldVersion, e.newVersion, re(c.transaction), e)
          }),
        n &&
          c.addEventListener('blocked', function (e) {
            return n(e.oldVersion, e.newVersion, e)
          }),
        o
          .then(function (e) {
            s &&
              e.addEventListener('close', function () {
                return s()
              }),
              i &&
                e.addEventListener('versionchange', function (e) {
                  return i(e.oldVersion, e.newVersion, e)
                })
          })
          .catch(function () {}),
        o
      )
    }
    var ie = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'],
      se = ['put', 'add', 'delete', 'clear'],
      ce = new Map()
    function oe(e, t) {
      if (e instanceof IDBDatabase && !(t in e) && 'string' === typeof t) {
        if (ce.get(t)) return ce.get(t)
        var r = t.replace(/FromIndex$/, ''),
          n = t !== r,
          a = se.includes(r)
        if (
          r in (n ? IDBIndex : IDBObjectStore).prototype &&
          (a || ie.includes(r))
        ) {
          var i = (function () {
            var e = L(
              R().mark(function e(t) {
                var i,
                  s,
                  c,
                  o,
                  u,
                  h,
                  f = arguments
                return R().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          for (
                            s = this.transaction(
                              t,
                              a ? 'readwrite' : 'readonly'
                            ),
                              c = s.store,
                              o = f.length,
                              u = new Array(o > 1 ? o - 1 : 0),
                              h = 1;
                            h < o;
                            h++
                          )
                            u[h - 1] = f[h]
                          return (
                            n && (c = c.index(u.shift())),
                            (e.next = 6),
                            Promise.all([(i = c)[r].apply(i, u), a && s.done])
                          )
                        case 6:
                          return e.abrupt('return', e.sent[0])
                        case 7:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()
          return ce.set(t, i), i
        }
      }
    }
    Z = (function (e) {
      return V(
        V({}, e),
        {},
        {
          get: function (t, r, n) {
            return oe(t, r) || e.get(t, r, n)
          },
          has: function (t, r) {
            return !!oe(t, r) || e.has(t, r)
          },
        }
      )
    })(Z)
    r(190)
    var ue = 'cache-entries',
      he = function (e) {
        var t = new URL(e, location.href)
        return (t.hash = ''), t.href
      },
      fe = (function () {
        function e(t) {
          s(this, e), (this._db = null), (this._cacheName = t)
        }
        return (
          i(e, [
            {
              key: '_upgradeDb',
              value: function (e) {
                var t = e.createObjectStore(ue, { keyPath: 'id' })
                t.createIndex('cacheName', 'cacheName', { unique: !1 }),
                  t.createIndex('timestamp', 'timestamp', { unique: !1 })
              },
            },
            {
              key: '_upgradeDbAndDeleteOldDbs',
              value: function (e) {
                this._upgradeDb(e),
                  this._cacheName &&
                    (function (e) {
                      var t =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {},
                        r = t.blocked,
                        n = indexedDB.deleteDatabase(e)
                      r &&
                        n.addEventListener('blocked', function (e) {
                          return r(e.oldVersion, e)
                        }),
                        re(n).then(function () {})
                    })(this._cacheName)
              },
            },
            {
              key: 'setTimestamp',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n, a, i
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t = he(t)),
                                (n = {
                                  url: t,
                                  timestamp: r,
                                  cacheName: this._cacheName,
                                  id: this._getId(t),
                                }),
                                (e.next = 4),
                                this.getDb()
                              )
                            case 4:
                              return (
                                (a = e.sent),
                                (i = a.transaction(ue, 'readwrite', {
                                  durability: 'relaxed',
                                })),
                                (e.next = 8),
                                i.store.put(n)
                              )
                            case 8:
                              return (e.next = 10), i.done
                            case 10:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'getTimestamp',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.getDb()
                            case 2:
                              return (
                                (r = e.sent),
                                (e.next = 5),
                                r.get(ue, this._getId(t))
                              )
                            case 5:
                              return (
                                (n = e.sent),
                                e.abrupt(
                                  'return',
                                  null === n || void 0 === n
                                    ? void 0
                                    : n.timestamp
                                )
                              )
                            case 7:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'expireEntries',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n, a, i, s, c, o, u, h, f
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.getDb()
                            case 2:
                              return (
                                (n = e.sent),
                                (e.next = 5),
                                n
                                  .transaction(ue)
                                  .store.index('timestamp')
                                  .openCursor(null, 'prev')
                              )
                            case 5:
                              ;(a = e.sent), (i = []), (s = 0)
                            case 8:
                              if (!a) {
                                e.next = 16
                                break
                              }
                              return (
                                (c = a.value).cacheName === this._cacheName &&
                                  ((t && c.timestamp < t) || (r && s >= r)
                                    ? i.push(a.value)
                                    : s++),
                                (e.next = 13),
                                a.continue()
                              )
                            case 13:
                              ;(a = e.sent), (e.next = 8)
                              break
                            case 16:
                              ;(o = []), (u = 0), (h = i)
                            case 18:
                              if (!(u < h.length)) {
                                e.next = 26
                                break
                              }
                              return (
                                (f = h[u]), (e.next = 22), n.delete(ue, f.id)
                              )
                            case 22:
                              o.push(f.url)
                            case 23:
                              u++, (e.next = 18)
                              break
                            case 26:
                              return e.abrupt('return', o)
                            case 27:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_getId',
              value: function (e) {
                return this._cacheName + '|' + he(e)
              },
            },
            {
              key: 'getDb',
              value: (function () {
                var e = L(
                  R().mark(function e() {
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (this._db) {
                                e.next = 4
                                break
                              }
                              return (
                                (e.next = 3),
                                ae('workbox-expiration', 1, {
                                  upgrade:
                                    this._upgradeDbAndDeleteOldDbs.bind(this),
                                })
                              )
                            case 3:
                              this._db = e.sent
                            case 4:
                              return e.abrupt('return', this._db)
                            case 5:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function () {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          e
        )
      })(),
      le = (function () {
        function e(t) {
          var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}
          s(this, e),
            (this._isRunning = !1),
            (this._rerunRequested = !1),
            (this._maxEntries = r.maxEntries),
            (this._maxAgeSeconds = r.maxAgeSeconds),
            (this._matchOptions = r.matchOptions),
            (this._cacheName = t),
            (this._timestampModel = new fe(t))
        }
        return (
          i(e, [
            {
              key: 'expireEntries',
              value: (function () {
                var e = L(
                  R().mark(function e() {
                    var t, r, n, a, i, s
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!this._isRunning) {
                                e.next = 3
                                break
                              }
                              return (
                                (this._rerunRequested = !0), e.abrupt('return')
                              )
                            case 3:
                              return (
                                (this._isRunning = !0),
                                (t = this._maxAgeSeconds
                                  ? Date.now() - 1e3 * this._maxAgeSeconds
                                  : 0),
                                (e.next = 7),
                                this._timestampModel.expireEntries(
                                  t,
                                  this._maxEntries
                                )
                              )
                            case 7:
                              return (
                                (r = e.sent),
                                (e.next = 10),
                                self.caches.open(this._cacheName)
                              )
                            case 10:
                              ;(n = e.sent), (a = S(r)), (e.prev = 12), a.s()
                            case 14:
                              if ((i = a.n()).done) {
                                e.next = 20
                                break
                              }
                              return (
                                (s = i.value),
                                (e.next = 18),
                                n.delete(s, this._matchOptions)
                              )
                            case 18:
                              e.next = 14
                              break
                            case 20:
                              e.next = 25
                              break
                            case 22:
                              ;(e.prev = 22), (e.t0 = e.catch(12)), a.e(e.t0)
                            case 25:
                              return (e.prev = 25), a.f(), e.finish(25)
                            case 28:
                              0,
                                (this._isRunning = !1),
                                this._rerunRequested &&
                                  ((this._rerunRequested = !1),
                                  q(this.expireEntries()))
                            case 31:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[12, 22, 25, 28]]
                    )
                  })
                )
                return function () {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'updateTimestamp',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 3),
                                this._timestampModel.setTimestamp(t, Date.now())
                              )
                            case 3:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'isURLExpired',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (this._maxAgeSeconds) {
                                e.next = 6
                                break
                              }
                              e.next = 3
                              break
                            case 3:
                              return e.abrupt('return', !1)
                            case 6:
                              return (
                                (e.next = 8),
                                this._timestampModel.getTimestamp(t)
                              )
                            case 8:
                              return (
                                (r = e.sent),
                                (n = Date.now() - 1e3 * this._maxAgeSeconds),
                                e.abrupt('return', void 0 === r || r < n)
                              )
                            case 11:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'delete',
              value: (function () {
                var e = L(
                  R().mark(function e() {
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (this._rerunRequested = !1),
                                (e.next = 3),
                                this._timestampModel.expireEntries(1 / 0)
                              )
                            case 3:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function () {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          e
        )
      })()
    function pe(e, t) {
      return (
        (function (e) {
          if (Array.isArray(e)) return e
        })(e) ||
        (function (e, t) {
          var r =
            null == e
              ? null
              : ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
                e['@@iterator']
          if (null != r) {
            var n,
              a,
              i,
              s,
              c = [],
              o = !0,
              u = !1
            try {
              if (((i = (r = r.call(e)).next), 0 === t)) {
                if (Object(r) !== r) return
                o = !1
              } else
                for (
                  ;
                  !(o = (n = i.call(r)).done) &&
                  (c.push(n.value), c.length !== t);
                  o = !0
                );
            } catch (h) {
              ;(u = !0), (a = h)
            } finally {
              try {
                if (
                  !o &&
                  null != r.return &&
                  ((s = r.return()), Object(s) !== s)
                )
                  return
              } finally {
                if (u) throw a
              }
            }
            return c
          }
        })(e, t) ||
        O(e, t) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    var ve = (function () {
      function e() {
        var t = this,
          r =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        s(this, e),
          (this.cachedResponseWillBeUsed = (function () {
            var e = L(
              R().mark(function e(r) {
                var n, a, i, s, c, o, u
                return R().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        if (
                          ((n = r.event),
                          (a = r.request),
                          (i = r.cacheName),
                          (s = r.cachedResponse))
                        ) {
                          e.next = 3
                          break
                        }
                        return e.abrupt('return', null)
                      case 3:
                        if (
                          ((c = t._isResponseDateFresh(s)),
                          q((o = t._getCacheExpiration(i)).expireEntries()),
                          (u = o.updateTimestamp(a.url)),
                          n)
                        )
                          try {
                            n.waitUntil(u)
                          } catch (h) {
                            0
                          }
                        return e.abrupt('return', c ? s : null)
                      case 9:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this.cacheDidUpdate = (function () {
            var e = L(
              R().mark(function e(r) {
                var n, a, i
                return R().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = r.cacheName),
                          (a = r.request),
                          (i = t._getCacheExpiration(n)),
                          (e.next = 5),
                          i.updateTimestamp(a.url)
                        )
                      case 5:
                        return (e.next = 7), i.expireEntries()
                      case 7:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this._config = r),
          (this._maxAgeSeconds = r.maxAgeSeconds),
          (this._cacheExpirations = new Map()),
          r.purgeOnQuotaError &&
            g(function () {
              return t.deleteCacheAndMetadata()
            })
      }
      return (
        i(e, [
          {
            key: '_getCacheExpiration',
            value: function (e) {
              if (e === _()) throw new y('expire-custom-caches-only')
              var t = this._cacheExpirations.get(e)
              return (
                t ||
                  ((t = new le(e, this._config)),
                  this._cacheExpirations.set(e, t)),
                t
              )
            },
          },
          {
            key: '_isResponseDateFresh',
            value: function (e) {
              if (!this._maxAgeSeconds) return !0
              var t = this._getDateHeaderTimestamp(e)
              return null === t || t >= Date.now() - 1e3 * this._maxAgeSeconds
            },
          },
          {
            key: '_getDateHeaderTimestamp',
            value: function (e) {
              if (!e.headers.has('date')) return null
              var t = e.headers.get('date'),
                r = new Date(t).getTime()
              return isNaN(r) ? null : r
            },
          },
          {
            key: 'deleteCacheAndMetadata',
            value: (function () {
              var e = L(
                R().mark(function e() {
                  var t, r, n, a, i
                  return R().wrap(
                    function (e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            ;(t = S(this._cacheExpirations)),
                              (e.prev = 1),
                              t.s()
                          case 3:
                            if ((r = t.n()).done) {
                              e.next = 11
                              break
                            }
                            return (
                              (n = pe(r.value, 2)),
                              (a = n[0]),
                              (i = n[1]),
                              (e.next = 7),
                              self.caches.delete(a)
                            )
                          case 7:
                            return (e.next = 9), i.delete()
                          case 9:
                            e.next = 3
                            break
                          case 11:
                            e.next = 16
                            break
                          case 13:
                            ;(e.prev = 13), (e.t0 = e.catch(1)), t.e(e.t0)
                          case 16:
                            return (e.prev = 16), t.f(), e.finish(16)
                          case 19:
                            this._cacheExpirations = new Map()
                          case 20:
                          case 'end':
                            return e.stop()
                        }
                    },
                    e,
                    this,
                    [[1, 13, 16, 19]]
                  )
                })
              )
              return function () {
                return e.apply(this, arguments)
              }
            })(),
          },
        ]),
        e
      )
    })()
    function de(e) {
      return (
        (function (e) {
          if (Array.isArray(e)) return C(e)
        })(e) ||
        (function (e) {
          if (
            ('undefined' !== typeof Symbol && null != e[Symbol.iterator]) ||
            null != e['@@iterator']
          )
            return Array.from(e)
        })(e) ||
        O(e) ||
        (function () {
          throw new TypeError(
            'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
          )
        })()
      )
    }
    r(437)
    function ye(e) {
      if (!e) throw new y('add-to-cache-list-unexpected-type', { entry: e })
      if ('string' === typeof e) {
        var t = new URL(e, location.href)
        return { cacheKey: t.href, url: t.href }
      }
      var r = e.revision,
        n = e.url
      if (!n) throw new y('add-to-cache-list-unexpected-type', { entry: e })
      if (!r) {
        var a = new URL(n, location.href)
        return { cacheKey: a.href, url: a.href }
      }
      var i = new URL(n, location.href),
        s = new URL(n, location.href)
      return (
        i.searchParams.set('__WB_REVISION__', r),
        { cacheKey: i.href, url: s.href }
      )
    }
    var be = i(function e() {
        var t = this
        s(this, e),
          (this.updatedURLs = []),
          (this.notUpdatedURLs = []),
          (this.handlerWillStart = (function () {
            var e = L(
              R().mark(function e(t) {
                var r, n
                return R().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        ;(r = t.request),
                          (n = t.state) && (n.originalRequest = r)
                      case 2:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this.cachedResponseWillBeUsed = (function () {
            var e = L(
              R().mark(function e(r) {
                var n, a, i, s
                return R().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = r.event),
                          (a = r.state),
                          (i = r.cachedResponse),
                          'install' === n.type &&
                            a &&
                            a.originalRequest &&
                            a.originalRequest instanceof Request &&
                            ((s = a.originalRequest.url),
                            i
                              ? t.notUpdatedURLs.push(s)
                              : t.updatedURLs.push(s)),
                          e.abrupt('return', i)
                        )
                      case 3:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })())
      }),
      ge = i(function e(t) {
        var r = this,
          n = t.precacheController
        s(this, e),
          (this.cacheKeyWillBeUsed = (function () {
            var e = L(
              R().mark(function e(t) {
                var n, a, i
                return R().wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (n = t.request),
                          (a = t.params),
                          (i =
                            (null === a || void 0 === a
                              ? void 0
                              : a.cacheKey) ||
                            r._precacheController.getCacheKeyForURL(n.url)),
                          e.abrupt(
                            'return',
                            i ? new Request(i, { headers: n.headers }) : n
                          )
                        )
                      case 3:
                      case 'end':
                        return e.stop()
                    }
                }, e)
              })
            )
            return function (t) {
              return e.apply(this, arguments)
            }
          })()),
          (this._precacheController = n)
      })
    r(833)
    function me(e) {
      return 'string' === typeof e ? new Request(e) : e
    }
    var xe = (function () {
        function t(e, r) {
          s(this, t),
            (this._cacheKeys = {}),
            Object.assign(this, r),
            (this.event = r.event),
            (this._strategy = e),
            (this._handlerDeferred = new N()),
            (this._extendLifetimePromises = []),
            (this._plugins = de(e.plugins)),
            (this._pluginStateMap = new Map())
          var n,
            a = S(this._plugins)
          try {
            for (a.s(); !(n = a.n()).done; ) {
              var i = n.value
              this._pluginStateMap.set(i, {})
            }
          } catch (c) {
            a.e(c)
          } finally {
            a.f()
          }
          this.event.waitUntil(this._handlerDeferred.promise)
        }
        return (
          i(t, [
            {
              key: 'fetch',
              value: (function (e) {
                function t(t) {
                  return e.apply(this, arguments)
                }
                return (
                  (t.toString = function () {
                    return e.toString()
                  }),
                  t
                )
              })(
                (function () {
                  var e = L(
                    R().mark(function e(t) {
                      var r, n, a, i, s, c, o, u, h, f, l, p
                      return R().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  ((r = this.event),
                                  !(
                                    'navigate' === (n = me(t)).mode &&
                                    r instanceof FetchEvent &&
                                    r.preloadResponse
                                  ))
                                ) {
                                  e.next = 9
                                  break
                                }
                                return (e.next = 5), r.preloadResponse
                              case 5:
                                if (!(a = e.sent)) {
                                  e.next = 9
                                  break
                                }
                                return e.abrupt('return', a)
                              case 9:
                                ;(i = this.hasCallback('fetchDidFail')
                                  ? n.clone()
                                  : null),
                                  (e.prev = 10),
                                  (s = S(
                                    this.iterateCallbacks('requestWillFetch')
                                  )),
                                  (e.prev = 12),
                                  s.s()
                              case 14:
                                if ((c = s.n()).done) {
                                  e.next = 21
                                  break
                                }
                                return (
                                  (o = c.value),
                                  (e.next = 18),
                                  o({ request: n.clone(), event: r })
                                )
                              case 18:
                                n = e.sent
                              case 19:
                                e.next = 14
                                break
                              case 21:
                                e.next = 26
                                break
                              case 23:
                                ;(e.prev = 23), (e.t0 = e.catch(12)), s.e(e.t0)
                              case 26:
                                return (e.prev = 26), s.f(), e.finish(26)
                              case 29:
                                e.next = 35
                                break
                              case 31:
                                if (
                                  ((e.prev = 31),
                                  (e.t1 = e.catch(10)),
                                  !(e.t1 instanceof Error))
                                ) {
                                  e.next = 35
                                  break
                                }
                                throw new y('plugin-error-request-will-fetch', {
                                  thrownErrorMessage: e.t1.message,
                                })
                              case 35:
                                return (
                                  (u = n.clone()),
                                  (e.prev = 36),
                                  (e.next = 39),
                                  fetch(
                                    n,
                                    'navigate' === n.mode
                                      ? void 0
                                      : this._strategy.fetchOptions
                                  )
                                )
                              case 39:
                                ;(h = e.sent),
                                  (f = S(
                                    this.iterateCallbacks('fetchDidSucceed')
                                  )),
                                  (e.prev = 42),
                                  f.s()
                              case 44:
                                if ((l = f.n()).done) {
                                  e.next = 51
                                  break
                                }
                                return (
                                  (p = l.value),
                                  (e.next = 48),
                                  p({ event: r, request: u, response: h })
                                )
                              case 48:
                                h = e.sent
                              case 49:
                                e.next = 44
                                break
                              case 51:
                                e.next = 56
                                break
                              case 53:
                                ;(e.prev = 53), (e.t2 = e.catch(42)), f.e(e.t2)
                              case 56:
                                return (e.prev = 56), f.f(), e.finish(56)
                              case 59:
                                return e.abrupt('return', h)
                              case 62:
                                if (((e.prev = 62), (e.t3 = e.catch(36)), !i)) {
                                  e.next = 68
                                  break
                                }
                                return (
                                  (e.next = 68),
                                  this.runCallbacks('fetchDidFail', {
                                    error: e.t3,
                                    event: r,
                                    originalRequest: i.clone(),
                                    request: u.clone(),
                                  })
                                )
                              case 68:
                                throw e.t3
                              case 69:
                              case 'end':
                                return e.stop()
                            }
                        },
                        e,
                        this,
                        [
                          [10, 31],
                          [12, 23, 26, 29],
                          [36, 62],
                          [42, 53, 56, 59],
                        ]
                      )
                    })
                  )
                  return function (t) {
                    return e.apply(this, arguments)
                  }
                })()
              ),
            },
            {
              key: 'fetchAndCachePut',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), this.fetch(t)
                            case 2:
                              return (
                                (r = e.sent),
                                (n = r.clone()),
                                this.waitUntil(this.cachePut(t, n)),
                                e.abrupt('return', r)
                              )
                            case 6:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'cacheMatch',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n, a, i, s, c, o, u, h, f
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (r = me(t)),
                                (a = this._strategy),
                                (i = a.cacheName),
                                (s = a.matchOptions),
                                (e.next = 4),
                                this.getCacheKey(r, 'read')
                              )
                            case 4:
                              return (
                                (c = e.sent),
                                (o = Object.assign(Object.assign({}, s), {
                                  cacheName: i,
                                })),
                                (e.next = 8),
                                caches.match(c, o)
                              )
                            case 8:
                              ;(n = e.sent),
                                (u = S(
                                  this.iterateCallbacks(
                                    'cachedResponseWillBeUsed'
                                  )
                                )),
                                (e.prev = 11),
                                u.s()
                            case 13:
                              if ((h = u.n()).done) {
                                e.next = 23
                                break
                              }
                              return (
                                (f = h.value),
                                (e.next = 17),
                                f({
                                  cacheName: i,
                                  matchOptions: s,
                                  cachedResponse: n,
                                  request: c,
                                  event: this.event,
                                })
                              )
                            case 17:
                              if (((e.t0 = e.sent), e.t0)) {
                                e.next = 20
                                break
                              }
                              e.t0 = void 0
                            case 20:
                              n = e.t0
                            case 21:
                              e.next = 13
                              break
                            case 23:
                              e.next = 28
                              break
                            case 25:
                              ;(e.prev = 25), (e.t1 = e.catch(11)), u.e(e.t1)
                            case 28:
                              return (e.prev = 28), u.f(), e.finish(28)
                            case 31:
                              return e.abrupt('return', n)
                            case 32:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[11, 25, 28, 31]]
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'cachePut',
              value: (function () {
                var t = L(
                  R().mark(function t(r, n) {
                    var a, i, s, c, o, u, h, f, l, p, v, d, b
                    return R().wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (a = me(r)), (t.next = 3), K(0)
                            case 3:
                              return (t.next = 5), this.getCacheKey(a, 'write')
                            case 5:
                              ;(i = t.sent), (t.next = 11)
                              break
                            case 9:
                              ;(s = n.headers.get('Vary')) &&
                                e.debug(
                                  'The response for '.concat(A(i.url), ' ') +
                                    "has a 'Vary: ".concat(s, "' header. ") +
                                    'Consider setting the {ignoreVary: true} option on your strategy to ensure cache matching and deletion works as expected.'
                                )
                            case 11:
                              if (n) {
                                t.next = 14
                                break
                              }
                              throw new y('cache-put-with-no-response', {
                                url: A(i.url),
                              })
                            case 14:
                              return (
                                (t.next = 16),
                                this._ensureResponseSafeToCache(n)
                              )
                            case 16:
                              if ((c = t.sent)) {
                                t.next = 20
                                break
                              }
                              return t.abrupt('return', !1)
                            case 20:
                              return (
                                (o = this._strategy),
                                (u = o.cacheName),
                                (h = o.matchOptions),
                                (t.next = 23),
                                self.caches.open(u)
                              )
                            case 23:
                              if (
                                ((f = t.sent),
                                !(l = this.hasCallback('cacheDidUpdate')))
                              ) {
                                t.next = 31
                                break
                              }
                              return (
                                (t.next = 28),
                                P(f, i.clone(), ['__WB_REVISION__'], h)
                              )
                            case 28:
                              ;(t.t0 = t.sent), (t.next = 32)
                              break
                            case 31:
                              t.t0 = null
                            case 32:
                              return (
                                (p = t.t0),
                                (t.prev = 34),
                                (t.next = 37),
                                f.put(i, l ? c.clone() : c)
                              )
                            case 37:
                              t.next = 46
                              break
                            case 39:
                              if (
                                ((t.prev = 39),
                                (t.t1 = t.catch(34)),
                                !(t.t1 instanceof Error))
                              ) {
                                t.next = 46
                                break
                              }
                              if ('QuotaExceededError' !== t.t1.name) {
                                t.next = 45
                                break
                              }
                              return (t.next = 45), U()
                            case 45:
                              throw t.t1
                            case 46:
                              ;(v = S(this.iterateCallbacks('cacheDidUpdate'))),
                                (t.prev = 47),
                                v.s()
                            case 49:
                              if ((d = v.n()).done) {
                                t.next = 55
                                break
                              }
                              return (
                                (b = d.value),
                                (t.next = 53),
                                b({
                                  cacheName: u,
                                  oldResponse: p,
                                  newResponse: c.clone(),
                                  request: i,
                                  event: this.event,
                                })
                              )
                            case 53:
                              t.next = 49
                              break
                            case 55:
                              t.next = 60
                              break
                            case 57:
                              ;(t.prev = 57), (t.t2 = t.catch(47)), v.e(t.t2)
                            case 60:
                              return (t.prev = 60), v.f(), t.finish(60)
                            case 63:
                              return t.abrupt('return', !0)
                            case 64:
                            case 'end':
                              return t.stop()
                          }
                      },
                      t,
                      this,
                      [
                        [34, 39],
                        [47, 57, 60, 63],
                      ]
                    )
                  })
                )
                return function (e, r) {
                  return t.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'getCacheKey',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n, a, i, s, c
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((n = ''.concat(t.url, ' | ').concat(r)),
                                this._cacheKeys[n])
                              ) {
                                e.next = 24
                                break
                              }
                              ;(a = t),
                                (i = S(
                                  this.iterateCallbacks('cacheKeyWillBeUsed')
                                )),
                                (e.prev = 4),
                                i.s()
                            case 6:
                              if ((s = i.n()).done) {
                                e.next = 15
                                break
                              }
                              return (
                                (c = s.value),
                                (e.t0 = me),
                                (e.next = 11),
                                c({
                                  mode: r,
                                  request: a,
                                  event: this.event,
                                  params: this.params,
                                })
                              )
                            case 11:
                              ;(e.t1 = e.sent), (a = (0, e.t0)(e.t1))
                            case 13:
                              e.next = 6
                              break
                            case 15:
                              e.next = 20
                              break
                            case 17:
                              ;(e.prev = 17), (e.t2 = e.catch(4)), i.e(e.t2)
                            case 20:
                              return (e.prev = 20), i.f(), e.finish(20)
                            case 23:
                              this._cacheKeys[n] = a
                            case 24:
                              return e.abrupt('return', this._cacheKeys[n])
                            case 25:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[4, 17, 20, 23]]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'hasCallback',
              value: function (e) {
                var t,
                  r = S(this._strategy.plugins)
                try {
                  for (r.s(); !(t = r.n()).done; ) {
                    if (e in t.value) return !0
                  }
                } catch (n) {
                  r.e(n)
                } finally {
                  r.f()
                }
                return !1
              },
            },
            {
              key: 'runCallbacks',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n, a, i
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              ;(n = S(this.iterateCallbacks(t))),
                                (e.prev = 1),
                                n.s()
                            case 3:
                              if ((a = n.n()).done) {
                                e.next = 9
                                break
                              }
                              return (i = a.value), (e.next = 7), i(r)
                            case 7:
                              e.next = 3
                              break
                            case 9:
                              e.next = 14
                              break
                            case 11:
                              ;(e.prev = 11), (e.t0 = e.catch(1)), n.e(e.t0)
                            case 14:
                              return (e.prev = 14), n.f(), e.finish(14)
                            case 17:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[1, 11, 14, 17]]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'iterateCallbacks',
              value: R().mark(function e(t) {
                var r,
                  n,
                  a,
                  i = this
                return R().wrap(
                  function (e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          ;(r = S(this._strategy.plugins)),
                            (e.prev = 1),
                            (a = R().mark(function e() {
                              var r, a, s
                              return R().wrap(function (e) {
                                for (;;)
                                  switch ((e.prev = e.next)) {
                                    case 0:
                                      if (
                                        'function' !== typeof (r = n.value)[t]
                                      ) {
                                        e.next = 6
                                        break
                                      }
                                      return (
                                        (a = i._pluginStateMap.get(r)),
                                        (s = function (e) {
                                          var n = Object.assign(
                                            Object.assign({}, e),
                                            { state: a }
                                          )
                                          return r[t](n)
                                        }),
                                        (e.next = 6),
                                        s
                                      )
                                    case 6:
                                    case 'end':
                                      return e.stop()
                                  }
                              }, e)
                            })),
                            r.s()
                        case 4:
                          if ((n = r.n()).done) {
                            e.next = 8
                            break
                          }
                          return e.delegateYield(a(), 't0', 6)
                        case 6:
                          e.next = 4
                          break
                        case 8:
                          e.next = 13
                          break
                        case 10:
                          ;(e.prev = 10), (e.t1 = e.catch(1)), r.e(e.t1)
                        case 13:
                          return (e.prev = 13), r.f(), e.finish(13)
                        case 16:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this,
                  [[1, 10, 13, 16]]
                )
              }),
            },
            {
              key: 'waitUntil',
              value: function (e) {
                return this._extendLifetimePromises.push(e), e
              },
            },
            {
              key: 'doneWaiting',
              value: (function () {
                var e = L(
                  R().mark(function e() {
                    var t
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (!(t = this._extendLifetimePromises.shift())) {
                                e.next = 5
                                break
                              }
                              return (e.next = 3), t
                            case 3:
                              e.next = 0
                              break
                            case 5:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function () {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'destroy',
              value: function () {
                this._handlerDeferred.resolve(null)
              },
            },
            {
              key: '_ensureResponseSafeToCache',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n, a, i, s
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              ;(r = t),
                                (n = !1),
                                (a = S(
                                  this.iterateCallbacks('cacheWillUpdate')
                                )),
                                (e.prev = 3),
                                a.s()
                            case 5:
                              if ((i = a.n()).done) {
                                e.next = 18
                                break
                              }
                              return (
                                (s = i.value),
                                (e.next = 9),
                                s({
                                  request: this.request,
                                  response: r,
                                  event: this.event,
                                })
                              )
                            case 9:
                              if (((e.t0 = e.sent), e.t0)) {
                                e.next = 12
                                break
                              }
                              e.t0 = void 0
                            case 12:
                              if (((r = e.t0), (n = !0), r)) {
                                e.next = 16
                                break
                              }
                              return e.abrupt('break', 18)
                            case 16:
                              e.next = 5
                              break
                            case 18:
                              e.next = 23
                              break
                            case 20:
                              ;(e.prev = 20), (e.t1 = e.catch(3)), a.e(e.t1)
                            case 23:
                              return (e.prev = 23), a.f(), e.finish(23)
                            case 26:
                              return (
                                n || (r && 200 !== r.status && (r = void 0)),
                                e.abrupt('return', r)
                              )
                            case 28:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[3, 20, 23, 26]]
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          t
        )
      })(),
      we = (function () {
        function e() {
          var t =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
          s(this, e),
            (this.cacheName = _(t.cacheName)),
            (this.plugins = t.plugins || []),
            (this.fetchOptions = t.fetchOptions),
            (this.matchOptions = t.matchOptions)
        }
        return (
          i(e, [
            {
              key: 'handle',
              value: function (e) {
                return pe(this.handleAll(e), 1)[0]
              },
            },
            {
              key: 'handleAll',
              value: function (e) {
                e instanceof FetchEvent &&
                  (e = { event: e, request: e.request })
                var t = e.event,
                  r =
                    'string' === typeof e.request
                      ? new Request(e.request)
                      : e.request,
                  n = 'params' in e ? e.params : void 0,
                  a = new xe(this, { event: t, request: r, params: n }),
                  i = this._getResponse(a, r, t)
                return [i, this._awaitComplete(i, a, r, t)]
              },
            },
            {
              key: '_getResponse',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r, n) {
                    var a, i, s, c, o, u, h
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (e.next = 2),
                                t.runCallbacks('handlerWillStart', {
                                  event: n,
                                  request: r,
                                })
                              )
                            case 2:
                              return (
                                (a = void 0),
                                (e.prev = 3),
                                (e.next = 6),
                                this._handle(r, t)
                              )
                            case 6:
                              if ((a = e.sent) && 'error' !== a.type) {
                                e.next = 9
                                break
                              }
                              throw new y('no-response', { url: r.url })
                            case 9:
                              e.next = 39
                              break
                            case 11:
                              if (
                                ((e.prev = 11),
                                (e.t0 = e.catch(3)),
                                !(e.t0 instanceof Error))
                              ) {
                                e.next = 34
                                break
                              }
                              ;(i = S(t.iterateCallbacks('handlerDidError'))),
                                (e.prev = 15),
                                i.s()
                            case 17:
                              if ((s = i.n()).done) {
                                e.next = 26
                                break
                              }
                              return (
                                (c = s.value),
                                (e.next = 21),
                                c({ error: e.t0, event: n, request: r })
                              )
                            case 21:
                              if (!(a = e.sent)) {
                                e.next = 24
                                break
                              }
                              return e.abrupt('break', 26)
                            case 24:
                              e.next = 17
                              break
                            case 26:
                              e.next = 31
                              break
                            case 28:
                              ;(e.prev = 28), (e.t1 = e.catch(15)), i.e(e.t1)
                            case 31:
                              return (e.prev = 31), i.f(), e.finish(31)
                            case 34:
                              if (a) {
                                e.next = 38
                                break
                              }
                              throw e.t0
                            case 38:
                              0
                            case 39:
                              ;(o = S(
                                t.iterateCallbacks('handlerWillRespond')
                              )),
                                (e.prev = 40),
                                o.s()
                            case 42:
                              if ((u = o.n()).done) {
                                e.next = 49
                                break
                              }
                              return (
                                (h = u.value),
                                (e.next = 46),
                                h({ event: n, request: r, response: a })
                              )
                            case 46:
                              a = e.sent
                            case 47:
                              e.next = 42
                              break
                            case 49:
                              e.next = 54
                              break
                            case 51:
                              ;(e.prev = 51), (e.t2 = e.catch(40)), o.e(e.t2)
                            case 54:
                              return (e.prev = 54), o.f(), e.finish(54)
                            case 57:
                              return e.abrupt('return', a)
                            case 58:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [
                        [3, 11],
                        [15, 28, 31, 34],
                        [40, 51, 54, 57],
                      ]
                    )
                  })
                )
                return function (t, r, n) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_awaitComplete',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r, n, a) {
                    var i, s
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.prev = 0), (e.next = 3), t
                            case 3:
                              ;(i = e.sent), (e.next = 8)
                              break
                            case 6:
                              ;(e.prev = 6), (e.t0 = e.catch(0))
                            case 8:
                              return (
                                (e.prev = 8),
                                (e.next = 11),
                                r.runCallbacks('handlerDidRespond', {
                                  event: a,
                                  request: n,
                                  response: i,
                                })
                              )
                            case 11:
                              return (e.next = 13), r.doneWaiting()
                            case 13:
                              e.next = 18
                              break
                            case 15:
                              ;(e.prev = 15),
                                (e.t1 = e.catch(8)),
                                e.t1 instanceof Error && (s = e.t1)
                            case 18:
                              return (
                                (e.next = 20),
                                r.runCallbacks('handlerDidComplete', {
                                  event: a,
                                  request: n,
                                  response: i,
                                  error: s,
                                })
                              )
                            case 20:
                              if ((r.destroy(), !s)) {
                                e.next = 23
                                break
                              }
                              throw s
                            case 23:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      null,
                      [
                        [0, 6],
                        [8, 15],
                      ]
                    )
                  })
                )
                return function (t, r, n, a) {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          e
        )
      })(),
      ke = (function (t) {
        o(n, t)
        var r = l(n)
        function n() {
          var e,
            t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
          return (
            s(this, n),
            (t.cacheName = k(t.cacheName)),
            ((e = r.call(this, t))._fallbackToNetwork =
              !1 !== t.fallbackToNetwork),
            e.plugins.push(n.copyRedirectedCacheableResponsesPlugin),
            e
          )
        }
        return (
          i(n, [
            {
              key: '_handle',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (e.next = 2), r.cacheMatch(t)
                            case 2:
                              if (!(n = e.sent)) {
                                e.next = 5
                                break
                              }
                              return e.abrupt('return', n)
                            case 5:
                              if (!r.event || 'install' !== r.event.type) {
                                e.next = 9
                                break
                              }
                              return (e.next = 8), this._handleInstall(t, r)
                            case 8:
                            case 11:
                              return e.abrupt('return', e.sent)
                            case 9:
                              return (e.next = 11), this._handleFetch(t, r)
                            case 12:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_handleFetch',
              value: (function () {
                var t = L(
                  R().mark(function t(r, n) {
                    var a, i, s, c, o, u
                    return R().wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              if (
                                ((i = n.params || {}), !this._fallbackToNetwork)
                              ) {
                                t.next = 17
                                break
                              }
                              return (
                                (s = i.integrity),
                                (c = r.integrity),
                                (o = !c || c === s),
                                (t.next = 8),
                                n.fetch(
                                  new Request(r, {
                                    integrity:
                                      'no-cors' !== r.mode ? c || s : void 0,
                                  })
                                )
                              )
                            case 8:
                              if (
                                ((a = t.sent), !s || !o || 'no-cors' === r.mode)
                              ) {
                                t.next = 15
                                break
                              }
                              return (
                                this._useDefaultCacheabilityPluginIfNeeded(),
                                (t.next = 13),
                                n.cachePut(r, a.clone())
                              )
                            case 13:
                              t.sent
                            case 15:
                              t.next = 18
                              break
                            case 17:
                              throw new y('missing-precache-entry', {
                                cacheName: this.cacheName,
                                url: r.url,
                              })
                            case 18:
                              t.next = 34
                              break
                            case 23:
                              t.t0 = t.sent
                            case 24:
                              ;(u = t.t0),
                                e.groupCollapsed(
                                  'Precaching is responding to: ' + A(r.url)
                                ),
                                e.log(
                                  'Serving the precached url: '.concat(
                                    A(u instanceof Request ? u.url : u)
                                  )
                                ),
                                e.groupCollapsed('View request details here.'),
                                e.log(r),
                                e.groupEnd(),
                                e.groupCollapsed('View response details here.'),
                                e.log(a),
                                e.groupEnd(),
                                e.groupEnd()
                            case 34:
                              return t.abrupt('return', a)
                            case 35:
                            case 'end':
                              return t.stop()
                          }
                      },
                      t,
                      this
                    )
                  })
                )
                return function (e, r) {
                  return t.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_handleInstall',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                this._useDefaultCacheabilityPluginIfNeeded(),
                                (e.next = 3),
                                r.fetch(t)
                              )
                            case 3:
                              return (
                                (n = e.sent),
                                (e.next = 6),
                                r.cachePut(t, n.clone())
                              )
                            case 6:
                              if (e.sent) {
                                e.next = 9
                                break
                              }
                              throw new y('bad-precaching-response', {
                                url: t.url,
                                status: n.status,
                              })
                            case 9:
                              return e.abrupt('return', n)
                            case 10:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: '_useDefaultCacheabilityPluginIfNeeded',
              value: function () {
                var e,
                  t = null,
                  r = 0,
                  a = S(this.plugins.entries())
                try {
                  for (a.s(); !(e = a.n()).done; ) {
                    var i = pe(e.value, 2),
                      s = i[0],
                      c = i[1]
                    c !== n.copyRedirectedCacheableResponsesPlugin &&
                      (c === n.defaultPrecacheCacheabilityPlugin && (t = s),
                      c.cacheWillUpdate && r++)
                  }
                } catch (o) {
                  a.e(o)
                } finally {
                  a.f()
                }
                0 === r
                  ? this.plugins.push(n.defaultPrecacheCacheabilityPlugin)
                  : r > 1 && null !== t && this.plugins.splice(t, 1)
              },
            },
          ]),
          n
        )
      })(we)
    ;(ke.defaultPrecacheCacheabilityPlugin = {
      cacheWillUpdate: function (e) {
        return L(
          R().mark(function t() {
            var r
            return R().wrap(function (t) {
              for (;;)
                switch ((t.prev = t.next)) {
                  case 0:
                    if ((r = e.response) && !(r.status >= 400)) {
                      t.next = 3
                      break
                    }
                    return t.abrupt('return', null)
                  case 3:
                    return t.abrupt('return', r)
                  case 4:
                  case 'end':
                    return t.stop()
                }
            }, t)
          })
        )()
      },
    }),
      (ke.copyRedirectedCacheableResponsesPlugin = {
        cacheWillUpdate: function (e) {
          return L(
            R().mark(function t() {
              var r
              return R().wrap(function (t) {
                for (;;)
                  switch ((t.prev = t.next)) {
                    case 0:
                      if (!(r = e.response).redirected) {
                        t.next = 7
                        break
                      }
                      return (t.next = 4), W(r)
                    case 4:
                      ;(t.t0 = t.sent), (t.next = 8)
                      break
                    case 7:
                      t.t0 = r
                    case 8:
                      return t.abrupt('return', t.t0)
                    case 9:
                    case 'end':
                      return t.stop()
                  }
              }, t)
            })
          )()
        },
      })
    var _e,
      Re = (function () {
        function e() {
          var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {},
            r = t.cacheName,
            n = t.plugins,
            a = void 0 === n ? [] : n,
            i = t.fallbackToNetwork,
            c = void 0 === i || i
          s(this, e),
            (this._urlsToCacheKeys = new Map()),
            (this._urlsToCacheModes = new Map()),
            (this._cacheKeysToIntegrities = new Map()),
            (this._strategy = new ke({
              cacheName: k(r),
              plugins: [].concat(de(a), [new ge({ precacheController: this })]),
              fallbackToNetwork: c,
            })),
            (this.install = this.install.bind(this)),
            (this.activate = this.activate.bind(this))
        }
        return (
          i(e, [
            {
              key: 'strategy',
              get: function () {
                return this._strategy
              },
            },
            {
              key: 'precache',
              value: function (e) {
                this.addToCacheList(e),
                  this._installAndActiveListenersAdded ||
                    (self.addEventListener('install', this.install),
                    self.addEventListener('activate', this.activate),
                    (this._installAndActiveListenersAdded = !0))
              },
            },
            {
              key: 'addToCacheList',
              value: function (e) {
                var t,
                  r = [],
                  n = S(e)
                try {
                  for (n.s(); !(t = n.n()).done; ) {
                    var a = t.value
                    'string' === typeof a
                      ? r.push(a)
                      : a && void 0 === a.revision && r.push(a.url)
                    var i = ye(a),
                      s = i.cacheKey,
                      c = i.url,
                      o =
                        'string' !== typeof a && a.revision
                          ? 'reload'
                          : 'default'
                    if (
                      this._urlsToCacheKeys.has(c) &&
                      this._urlsToCacheKeys.get(c) !== s
                    )
                      throw new y('add-to-cache-list-conflicting-entries', {
                        firstEntry: this._urlsToCacheKeys.get(c),
                        secondEntry: s,
                      })
                    if ('string' !== typeof a && a.integrity) {
                      if (
                        this._cacheKeysToIntegrities.has(s) &&
                        this._cacheKeysToIntegrities.get(s) !== a.integrity
                      )
                        throw new y(
                          'add-to-cache-list-conflicting-integrities',
                          { url: c }
                        )
                      this._cacheKeysToIntegrities.set(s, a.integrity)
                    }
                    if (
                      (this._urlsToCacheKeys.set(c, s),
                      this._urlsToCacheModes.set(c, o),
                      r.length > 0)
                    ) {
                      var u =
                        'Workbox is precaching URLs without revision ' +
                        'info: '.concat(
                          r.join(', '),
                          '\nThis is generally NOT safe. '
                        ) +
                        'Learn more at https://bit.ly/wb-precache'
                      console.warn(u)
                    }
                  }
                } catch (h) {
                  n.e(h)
                } finally {
                  n.f()
                }
              },
            },
            {
              key: 'install',
              value: function (e) {
                var t = this
                return M(
                  e,
                  L(
                    R().mark(function r() {
                      var n, a, i, s, c, o, u, h, f, l, p
                      return R().wrap(
                        function (r) {
                          for (;;)
                            switch ((r.prev = r.next)) {
                              case 0:
                                ;(n = new be()),
                                  t.strategy.plugins.push(n),
                                  (a = S(t._urlsToCacheKeys)),
                                  (r.prev = 3),
                                  a.s()
                              case 5:
                                if ((i = a.n()).done) {
                                  r.next = 14
                                  break
                                }
                                return (
                                  (s = pe(i.value, 2)),
                                  (c = s[0]),
                                  (o = s[1]),
                                  (u = t._cacheKeysToIntegrities.get(o)),
                                  (h = t._urlsToCacheModes.get(c)),
                                  (f = new Request(c, {
                                    integrity: u,
                                    cache: h,
                                    credentials: 'same-origin',
                                  })),
                                  (r.next = 12),
                                  Promise.all(
                                    t.strategy.handleAll({
                                      params: { cacheKey: o },
                                      request: f,
                                      event: e,
                                    })
                                  )
                                )
                              case 12:
                                r.next = 5
                                break
                              case 14:
                                r.next = 19
                                break
                              case 16:
                                ;(r.prev = 16), (r.t0 = r.catch(3)), a.e(r.t0)
                              case 19:
                                return (r.prev = 19), a.f(), r.finish(19)
                              case 22:
                                return (
                                  (l = n.updatedURLs),
                                  (p = n.notUpdatedURLs),
                                  r.abrupt('return', {
                                    updatedURLs: l,
                                    notUpdatedURLs: p,
                                  })
                                )
                              case 25:
                              case 'end':
                                return r.stop()
                            }
                        },
                        r,
                        null,
                        [[3, 16, 19, 22]]
                      )
                    })
                  )
                )
              },
            },
            {
              key: 'activate',
              value: function (e) {
                var t = this
                return M(
                  e,
                  L(
                    R().mark(function e() {
                      var r, n, a, i, s, c, o
                      return R().wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.next = 2),
                                  self.caches.open(t.strategy.cacheName)
                                )
                              case 2:
                                return (r = e.sent), (e.next = 5), r.keys()
                              case 5:
                                ;(n = e.sent),
                                  (a = new Set(t._urlsToCacheKeys.values())),
                                  (i = []),
                                  (s = S(n)),
                                  (e.prev = 9),
                                  s.s()
                              case 11:
                                if ((c = s.n()).done) {
                                  e.next = 19
                                  break
                                }
                                if (((o = c.value), a.has(o.url))) {
                                  e.next = 17
                                  break
                                }
                                return (e.next = 16), r.delete(o)
                              case 16:
                                i.push(o.url)
                              case 17:
                                e.next = 11
                                break
                              case 19:
                                e.next = 24
                                break
                              case 21:
                                ;(e.prev = 21), (e.t0 = e.catch(9)), s.e(e.t0)
                              case 24:
                                return (e.prev = 24), s.f(), e.finish(24)
                              case 27:
                                return e.abrupt('return', { deletedURLs: i })
                              case 29:
                              case 'end':
                                return e.stop()
                            }
                        },
                        e,
                        null,
                        [[9, 21, 24, 27]]
                      )
                    })
                  )
                )
              },
            },
            {
              key: 'getURLsToCacheKeys',
              value: function () {
                return this._urlsToCacheKeys
              },
            },
            {
              key: 'getCachedURLs',
              value: function () {
                return de(this._urlsToCacheKeys.keys())
              },
            },
            {
              key: 'getCacheKeyForURL',
              value: function (e) {
                var t = new URL(e, location.href)
                return this._urlsToCacheKeys.get(t.href)
              },
            },
            {
              key: 'getIntegrityForCacheKey',
              value: function (e) {
                return this._cacheKeysToIntegrities.get(e)
              },
            },
            {
              key: 'matchPrecache',
              value: (function () {
                var e = L(
                  R().mark(function e(t) {
                    var r, n, a
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((r = t instanceof Request ? t.url : t),
                                !(n = this.getCacheKeyForURL(r)))
                              ) {
                                e.next = 7
                                break
                              }
                              return (
                                (e.next = 5),
                                self.caches.open(this.strategy.cacheName)
                              )
                            case 5:
                              return (
                                (a = e.sent), e.abrupt('return', a.match(n))
                              )
                            case 7:
                              return e.abrupt('return', void 0)
                            case 8:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this
                    )
                  })
                )
                return function (t) {
                  return e.apply(this, arguments)
                }
              })(),
            },
            {
              key: 'createHandlerBoundToURL',
              value: function (e) {
                var t = this,
                  r = this.getCacheKeyForURL(e)
                if (!r) throw new y('non-precached-url', { url: e })
                return function (n) {
                  return (
                    (n.request = new Request(e)),
                    (n.params = Object.assign({ cacheKey: r }, n.params)),
                    t.strategy.handle(n)
                  )
                }
              },
            },
          ]),
          e
        )
      })(),
      Ee = function () {
        return _e || (_e = new Re()), _e
      }
    r(185)
    var Le,
      Ce = 'GET',
      Oe = function (e) {
        return e && 'object' === typeof e ? e : { handle: e }
      },
      Se = (function () {
        function e(t, r) {
          var n =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : Ce
          s(this, e),
            (this.handler = Oe(r)),
            (this.match = t),
            (this.method = n)
        }
        return (
          i(e, [
            {
              key: 'setCatchHandler',
              value: function (e) {
                this.catchHandler = Oe(e)
              },
            },
          ]),
          e
        )
      })(),
      je = (function (e) {
        o(r, e)
        var t = l(r)
        function r(e, n, a) {
          s(this, r)
          return t.call(
            this,
            function (t) {
              var r = t.url,
                n = e.exec(r.href)
              if (n && (r.origin === location.origin || 0 === n.index))
                return n.slice(1)
            },
            n,
            a
          )
        }
        return i(r)
      })(Se),
      Pe = (function () {
        function e() {
          s(this, e),
            (this._routes = new Map()),
            (this._defaultHandlerMap = new Map())
        }
        return (
          i(e, [
            {
              key: 'routes',
              get: function () {
                return this._routes
              },
            },
            {
              key: 'addFetchListener',
              value: function () {
                var e = this
                self.addEventListener('fetch', function (t) {
                  var r = t.request,
                    n = e.handleRequest({ request: r, event: t })
                  n && t.respondWith(n)
                })
              },
            },
            {
              key: 'addCacheListener',
              value: function () {
                var e = this
                self.addEventListener('message', function (t) {
                  if (t.data && 'CACHE_URLS' === t.data.type) {
                    var r = t.data.payload
                    0
                    var n = Promise.all(
                      r.urlsToCache.map(function (r) {
                        'string' === typeof r && (r = [r])
                        var n = p(Request, de(r))
                        return e.handleRequest({ request: n, event: t })
                      })
                    )
                    t.waitUntil(n),
                      t.ports &&
                        t.ports[0] &&
                        n.then(function () {
                          return t.ports[0].postMessage(!0)
                        })
                  }
                })
              },
            },
            {
              key: 'handleRequest',
              value: function (e) {
                var t = this,
                  r = e.request,
                  n = e.event
                var a = new URL(r.url, location.href)
                if (a.protocol.startsWith('http')) {
                  var i = a.origin === location.origin,
                    s = this.findMatchingRoute({
                      event: n,
                      request: r,
                      sameOrigin: i,
                      url: a,
                    }),
                    c = s.params,
                    o = s.route,
                    u = o && o.handler
                  0
                  var h = r.method
                  if (
                    (!u &&
                      this._defaultHandlerMap.has(h) &&
                      (u = this._defaultHandlerMap.get(h)),
                    u)
                  ) {
                    var f
                    0
                    try {
                      f = u.handle({ url: a, request: r, event: n, params: c })
                    } catch (p) {
                      f = Promise.reject(p)
                    }
                    var l = o && o.catchHandler
                    return (
                      f instanceof Promise &&
                        (this._catchHandler || l) &&
                        (f = f.catch(
                          (function () {
                            var e = L(
                              R().mark(function e(i) {
                                return R().wrap(
                                  function (e) {
                                    for (;;)
                                      switch ((e.prev = e.next)) {
                                        case 0:
                                          if (!l) {
                                            e.next = 11
                                            break
                                          }
                                          return (
                                            (e.prev = 2),
                                            (e.next = 5),
                                            l.handle({
                                              url: a,
                                              request: r,
                                              event: n,
                                              params: c,
                                            })
                                          )
                                        case 5:
                                          return e.abrupt('return', e.sent)
                                        case 8:
                                          ;(e.prev = 8),
                                            (e.t0 = e.catch(2)),
                                            e.t0 instanceof Error && (i = e.t0)
                                        case 11:
                                          if (!t._catchHandler) {
                                            e.next = 14
                                            break
                                          }
                                          return e.abrupt(
                                            'return',
                                            t._catchHandler.handle({
                                              url: a,
                                              request: r,
                                              event: n,
                                            })
                                          )
                                        case 14:
                                          throw i
                                        case 15:
                                        case 'end':
                                          return e.stop()
                                      }
                                  },
                                  e,
                                  null,
                                  [[2, 8]]
                                )
                              })
                            )
                            return function (t) {
                              return e.apply(this, arguments)
                            }
                          })()
                        )),
                      f
                    )
                  }
                }
              },
            },
            {
              key: 'findMatchingRoute',
              value: function (e) {
                var t,
                  r = e.url,
                  n = e.sameOrigin,
                  a = e.request,
                  i = e.event,
                  s = S(this._routes.get(a.method) || [])
                try {
                  for (s.s(); !(t = s.n()).done; ) {
                    var c = t.value,
                      o = void 0,
                      u = c.match({
                        url: r,
                        sameOrigin: n,
                        request: a,
                        event: i,
                      })
                    if (u)
                      return (
                        (o = u),
                        ((Array.isArray(o) && 0 === o.length) ||
                          (u.constructor === Object &&
                            0 === Object.keys(u).length) ||
                          'boolean' === typeof u) &&
                          (o = void 0),
                        { route: c, params: o }
                      )
                  }
                } catch (h) {
                  s.e(h)
                } finally {
                  s.f()
                }
                return {}
              },
            },
            {
              key: 'setDefaultHandler',
              value: function (e) {
                var t =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : Ce
                this._defaultHandlerMap.set(t, Oe(e))
              },
            },
            {
              key: 'setCatchHandler',
              value: function (e) {
                this._catchHandler = Oe(e)
              },
            },
            {
              key: 'registerRoute',
              value: function (e) {
                this._routes.has(e.method) || this._routes.set(e.method, []),
                  this._routes.get(e.method).push(e)
              },
            },
            {
              key: 'unregisterRoute',
              value: function (e) {
                if (!this._routes.has(e.method))
                  throw new y('unregister-route-but-not-found-with-method', {
                    method: e.method,
                  })
                var t = this._routes.get(e.method).indexOf(e)
                if (!(t > -1))
                  throw new y('unregister-route-route-not-registered')
                this._routes.get(e.method).splice(t, 1)
              },
            },
          ]),
          e
        )
      })(),
      Te = function () {
        return (
          Le || ((Le = new Pe()).addFetchListener(), Le.addCacheListener()), Le
        )
      }
    function De(e, t, r) {
      var n
      if ('string' === typeof e) {
        var a = new URL(e, location.href)
        n = new Se(
          function (e) {
            return e.url.href === a.href
          },
          t,
          r
        )
      } else if (e instanceof RegExp) n = new je(e, t, r)
      else if ('function' === typeof e) n = new Se(e, t, r)
      else {
        if (!(e instanceof Se))
          throw new y('unsupported-route-type', {
            moduleName: 'workbox-routing',
            funcName: 'registerRoute',
            paramName: 'capture',
          })
        n = e
      }
      return Te().registerRoute(n), n
    }
    function qe(e) {
      for (
        var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          r = function () {
            var r = a[n]
            t.some(function (e) {
              return e.test(r)
            }) && e.searchParams.delete(r)
          },
          n = 0,
          a = de(e.searchParams.keys());
        n < a.length;
        n++
      )
        r()
      return e
    }
    var Ne = (function (e) {
      o(r, e)
      var t = l(r)
      function r(e, n) {
        s(this, r)
        return t.call(
          this,
          function (t) {
            var r,
              a = t.request,
              i = e.getURLsToCacheKeys(),
              s = S(
                (function (e) {
                  var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {},
                    r = t.ignoreURLParametersMatching,
                    n = void 0 === r ? [/^utm_/, /^fbclid$/] : r,
                    a = t.directoryIndex,
                    i = void 0 === a ? 'index.html' : a,
                    s = t.cleanURLs,
                    c = void 0 === s || s,
                    o = t.urlManipulation
                  return R().mark(function t() {
                    var r, a, s, u, h, f, l, p
                    return R().wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                ((r = new URL(e, location.href)).hash = ''),
                                (t.next = 4),
                                r.href
                              )
                            case 4:
                              return (a = qe(r, n)), (t.next = 7), a.href
                            case 7:
                              if (!i || !a.pathname.endsWith('/')) {
                                t.next = 12
                                break
                              }
                              return (
                                ((s = new URL(a.href)).pathname += i),
                                (t.next = 12),
                                s.href
                              )
                            case 12:
                              if (!c) {
                                t.next = 17
                                break
                              }
                              return (
                                ((u = new URL(a.href)).pathname += '.html'),
                                (t.next = 17),
                                u.href
                              )
                            case 17:
                              if (!o) {
                                t.next = 36
                                break
                              }
                              ;(h = o({ url: r })),
                                (f = S(h)),
                                (t.prev = 20),
                                f.s()
                            case 22:
                              if ((l = f.n()).done) {
                                t.next = 28
                                break
                              }
                              return (p = l.value), (t.next = 26), p.href
                            case 26:
                              t.next = 22
                              break
                            case 28:
                              t.next = 33
                              break
                            case 30:
                              ;(t.prev = 30), (t.t0 = t.catch(20)), f.e(t.t0)
                            case 33:
                              return (t.prev = 33), f.f(), t.finish(33)
                            case 36:
                            case 'end':
                              return t.stop()
                          }
                      },
                      t,
                      null,
                      [[20, 30, 33, 36]]
                    )
                  })()
                })(a.url, n)
              )
            try {
              for (s.s(); !(r = s.n()).done; ) {
                var c = r.value,
                  o = i.get(c)
                if (o)
                  return {
                    cacheKey: o,
                    integrity: e.getIntegrityForCacheKey(o),
                  }
              }
            } catch (u) {
              s.e(u)
            } finally {
              s.f()
            }
          },
          e.strategy
        )
      }
      return i(r)
    })(Se)
    var Ue,
      Ie = {
        cacheWillUpdate: (function () {
          var e = L(
            R().mark(function e(t) {
              var r
              return R().wrap(function (e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      if (200 !== (r = t.response).status && 0 !== r.status) {
                        e.next = 3
                        break
                      }
                      return e.abrupt('return', r)
                    case 3:
                      return e.abrupt('return', null)
                    case 4:
                    case 'end':
                      return e.stop()
                  }
              }, e)
            })
          )
          return function (t) {
            return e.apply(this, arguments)
          }
        })(),
      },
      Ae = (function (e) {
        o(r, e)
        var t = l(r)
        function r() {
          var e,
            n =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {}
          return (
            s(this, r),
            (e = t.call(this, n)).plugins.some(function (e) {
              return 'cacheWillUpdate' in e
            }) || e.plugins.unshift(Ie),
            e
          )
        }
        return (
          i(r, [
            {
              key: '_handle',
              value: (function () {
                var e = L(
                  R().mark(function e(t, r) {
                    var n, a, i
                    return R().wrap(
                      function (e) {
                        for (;;)
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                [],
                                (n = r
                                  .fetchAndCachePut(t)
                                  .catch(function () {})),
                                r.waitUntil(n),
                                (e.next = 6),
                                r.cacheMatch(t)
                              )
                            case 6:
                              if (!(a = e.sent)) {
                                e.next = 11
                                break
                              }
                              0, (e.next = 21)
                              break
                            case 11:
                              return (e.prev = 12), (e.next = 15), n
                            case 15:
                              ;(a = e.sent), (e.next = 21)
                              break
                            case 18:
                              ;(e.prev = 18),
                                (e.t0 = e.catch(12)),
                                e.t0 instanceof Error && (i = e.t0)
                            case 21:
                              if (a) {
                                e.next = 24
                                break
                              }
                              throw new y('no-response', {
                                url: t.url,
                                error: i,
                              })
                            case 24:
                              return e.abrupt('return', a)
                            case 25:
                            case 'end':
                              return e.stop()
                          }
                      },
                      e,
                      this,
                      [[12, 18]]
                    )
                  })
                )
                return function (t, r) {
                  return e.apply(this, arguments)
                }
              })(),
            },
          ]),
          r
        )
      })(we)
    self.addEventListener('activate', function () {
      return self.clients.claim()
    }),
      (function (e) {
        Ee().precache(e)
      })([
        { revision: '908f1d6cf5c66f4b28174b6845c284e9', url: '/index.html' },
        { revision: null, url: '/static/css/main.65183fd5.css' },
        { revision: null, url: '/static/js/main.29126cce.js' },
        {
          revision: '6196795bfd0358456eceaf56845a45e7',
          url: '/static/media/board-preview.25c287ae7ad9fc2da090aeeddd284374.svg',
        },
        {
          revision: 'ada78a24dee37749d1b7576aa32e8517',
          url: '/static/media/checklistIcon.8f6811c21b64628b3144e38fed3b5d2a.svg',
        },
        {
          revision: '43d48e174526ed4ca3a1f42e6834119e',
          url: '/static/media/edit-pencil.77842f61cccac45fec91d05b8f708441.svg',
        },
        {
          revision: null,
          url: '/static/media/google-login-icon-24-removebg-preview.c2b0ed7e4148fd5fddeb.png',
        },
        {
          revision: null,
          url: '/static/media/hero-trello.f9b4fcddcc2fe4d8f0d9.png',
        },
        { revision: null, url: '/static/media/img-3.710e4ee6d0e1effb24dc.png' },
        {
          revision: 'a8268d4893f6b156b2ad5384128f2cb9',
          url: '/static/media/left-hero.47238298680cf64177bdb1faa64d3804.svg',
        },
        {
          revision: '516fef1b496e6e5be0703f5fc6b869b4',
          url: '/static/media/loader.4ce56a5f125d91cf6f2023fde70ca3d0.svg',
        },
        {
          revision: '61fa668ea9906db25e8a008897201cd7',
          url: '/static/media/right-hero.3a2e83cef20d6bab2dbaf88d4a44819f.svg',
        },
      ]),
      (function (e) {
        var t = Ee()
        De(new Ne(t, e))
      })(Ue)
    var Ke,
      Me = new RegExp('/[^/?]+\\.[^/]+$')
    De(function (e) {
      var t = e.request,
        r = e.url
      return (
        'navigate' === t.mode &&
        !r.pathname.startsWith('/_') &&
        !r.pathname.match(Me)
      )
    }, ((Ke = '/index.html'), Ee().createHandlerBoundToURL(Ke))),
      De(function (e) {
        var t = e.url
        return t.origin === self.location.origin && t.pathname.endsWith('.png')
      }, new Ae({
        cacheName: 'images',
        plugins: [new ve({ maxEntries: 50 })],
      })),
      self.addEventListener('message', function (e) {
        e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting()
      })
  })()
})()
//# sourceMappingURL=service-worker.js.map
