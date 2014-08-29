﻿(function () {
    var a = (function () {
        var e = {
            jY: 'A519',
            version: '2.0',
            uR: '1093',
            _: {},
            status: 'unloaded',
            basePath: (function () {
                var h = window.CKFINDER_BASEPATH || '';
                if (!h) {
                    var i = document.getElementsByTagName('script');
                    for (var j = 0; j < i.length; j++) {
                        var k = i[j].src.match(/(^|.*[\\\/])CKFINDER(?:_basic)?(?:_v2)?(?:_source)?.js(?:\?.*)?$/i);
                        if (k) {
                            h = k[1];
                            break;
                        }
                    }
                }
                if (h.indexOf('://') == -1) if (h.indexOf('/') === 0) h = location.href.match(/^.*?:\/\/[^\/]*/)[0] + h;
                else h = location.href.match(/^[^\?]*\/(?:)/)[0] + h;
                return h;
            })(),
            getUrl: function (h) {
                if (h.indexOf('://') == -1 && h.indexOf('/') !== 0) h = this.basePath + h;
                if (this.jY && h.charAt(h.length - 1) != '/') h += (h.indexOf('?') >= 0 ? '&' : '?') + 't=' + this.jY;
                return h;
            }
        },
            f = window.CKFINDER_GETURL;
        if (f) {
            var g = e.getUrl;
            e.getUrl = function (h) {
                return f.call(e, h) || g.call(e, h);
            };
        }
        return e;
    })();

    function b(e) {
        return a.instances[e];
    };
    var c = {
        callback: 1,
        selectThumbnailActionFunction: 1,
        selectActionFunction: 1
    };
    a.jd = function () {
        var g = this;
        var e = {};
        for (var f in g) {
            if (!g.hasOwnProperty(f)) continue;
            if (typeof g[f] == 'function' && !c[f]) continue;
            e[f] = g[f];
        }
        if (g.callback) e.callback = g.callback;
        return e;
    };
    a.lj = function (e) {
        var h = this;
        e = e || h.basePath;
        var f = '';
        if (!e || e.length === 0) e = CKFinder.DEFAULT_basePath;
        if (e.substr(e.length - 1, 1) != '/') e += '/';
        e += 'ckfinder.html';
        var g;
        if (h.hh) {
            g = h.hh;
            if (typeof g == 'function') g = g.toString().match(/function ([^(]+)/)[1];
            f += '?action=js&amp;func=' + g;
        }
        if (h.jx) {
            f += f ? '&amp;' : '?';
            f += 'data=' + encodeURIComponent(h.jx);
        }
        if (h.disableThumbnailSelection) {
            f += f ? '&amp;' : '?';
            f += 'dts=1';
        } else if (h.lH || h.hh) {
            g = h.lH || h.hh;
            if (typeof g == 'function') g = g.toString().match(/function ([^(]+)/)[1];
            f += f ? '&amp;' : '?';
            f += 'thumbFunc=' + g;
            if (h.nm) f += '&amp;tdata=' + encodeURIComponent(h.nm);
            else if (!h.lH && h.jx) f += '&amp;tdata=' + encodeURIComponent(h.jx);
        }
        if (h.startupPath) {
            f += f ? '&amp;' : '?';
            f += 'start=' + encodeURIComponent(h.startupPath + (h.startupFolderExpanded ? ':1' : ':0'));
        }
        if (!h.rememberLastFolder) {
            f += f ? '&amp;' : '?';
            f += 'rlf=0';
        }
        if (h.id) {
            f += f ? '&amp;' : '?';
            f += 'id=' + encodeURIComponent(h.id);
        }
        if (h.skin) {
            f += f ? '&amp;' : '?';
            f += 'skin=' + encodeURIComponent(h.skin);
        }
        return e + f;
    };

    function d(e, f) {
        this.id = e.name;
        var g = e.ax.getDocument().aU().$,
            h = a.oC.aU().$;
        this.inPopup = !!(g && g.opener);
        this.inIframe = !this.inPopup && g != h.top;
        this.inUrlPopup = !!(this.inPopup && h.opener);
        e.on('appReady', function (i) {
            i.aF();
            this.document = e.document.$;
            this.folders = e.folders;
            this.files = e.aG['filesview.filesview'][0].data().files;
            this.basketFiles = e.basketFiles;
            this.resourceTypes = e.resourceTypes;
            this.connector = e.connector;
            this.lang = e.lang;
            this.langCode = e.langCode;
            this.config = e.config;
            e.aG['foldertree.foldertree'][0].on('afterAddFolder', function (j) {
                j.aF();
                if (f) f(this);
            }, this);
        }, this, null, 999);
    };
    d.prototype = {
        _: {},
        addFileContextMenuOption: function (e, f, g) {
            var h = b(this.id),
                i = 'FileContextMenu_' + e.command;
            h.bD(i, {
                exec: function (l) {
                    var m = l.aG['filesview.filesview'][0].tools.dH();
                    f(l.cg, m);
                }
            });
            e.command = i;
            if (!e.group) e.group = 'file1';
            h.gp(i, e);
            var j = h.aG['filesview.filesview'];
            for (var k = 0; k < j.length; k++) j[k].on('beforeContextMenu', function ld(l) {
                if (g) {
                    var m = g(this.tools.dH());
                    if (m) l.data.bj[i] = m == -1 ? a.aY : a.aS;
                } else l.data.bj[i] = a.aS;
            });
        },
        disableFileContextMenuOption: function (e, f) {
            var g = b(this.id),
                h = f ? 'FileContextMenu_' + e : e,
                i = g.aG['filesview.filesview'],
                j = [];
            for (var k = 0; k < i.length; k++) {
                var l = j.push(function tF(m) {
                    delete m.data.bj[h];
                });
                i[k].on('beforeContextMenu', j[l - 1]);
            }
            return function () {
                for (var m = 0; m < j.length; m++) g.aG['foldertree.foldertree'][m].aF('beforeContextMenu', j[m]);
            };
        },
        addFolderContextMenuOption: function (e, f, g) {
            var h = b(this.id),
                i = 'FolderContextMenu_' + e.command;
            h.bD(i, {
                exec: function (l) {
                    f(l.cg, l.aV);
                }
            });
            e.command = i;
            if (!e.group) e.group = 'folder1';
            h.gp(i, e);
            var j = h.aG['foldertree.foldertree'];
            for (var k = 0; k < j.length; k++) j[k].on('beforeContextMenu', function ld(l) {
                if (g) {
                    var m = g(this.app.aV);
                    if (m) l.data.bj[i] = m == -1 ? a.aY : a.aS;
                } else l.data.bj[i] = a.aS;
            });
        },
        disableFolderContextMenuOption: function (e, f) {
            var g = b(this.id),
                h = f ? 'FolderContextMenu_' + e : e,
                i = g.aG['foldertree.foldertree'],
                j = [];
            for (var k = 0; k < i.length; k++) {
                var l = j.push(function tD(m) {
                    delete m.data.bj[h];
                });
                i[k].on('beforeContextMenu', j[l - 1]);
            }
            return function () {
                for (var m = 0; m < j.length; m++) g.aG['foldertree.foldertree'][m].aF('beforeContextMenu', j[m]);
            };
        },
        getSelectedFile: function () {
            return b(this.id).aG['filesview.filesview'][0].tools.dH();
        },
        getSelectedFolder: function () {
            return b(this.id).aV;
        },
        setUiColor: function (e) {
            return b(this.id).setUiColor(e);
        },
        openDialog: function (e, f) {
            var i = this;
            var g = new a.dom.document(window.document).eD(),
                h = b(i.id).document.aU();
            if (i.inIframe) a.document = new a.dom.document(a.oC.aU().$.parent.document);
            else if (i.inPopup) a.document = b(i.id).document;
            return b(i.id).openDialog(e, f, g);
        },
        openMsgDialog: function (e, f) {
            b(this.id).msgDialog(e, f);
        },
        openConfirmDialog: function (e, f, g) {
            b(this.id).fe(e, f, g);
        },
        openInputDialog: function (e, f, g, h) {
            b(this.id).hs(e, f, g, h);
        },
        addTool: function (e) {
            return b(this.id).plugins.tools.addTool(e);
        },
        addToolPanel: function (e) {
            return b(this.id).plugins.tools.addToolPanel(e);
        },
        removeTool: function (e) {
            b(this.id).plugins.tools.removeTool(e);
        },
        showTool: function (e) {
            b(this.id).plugins.tools.showTool(e);
        },
        hideTool: function (e) {
            b(this.id).plugins.tools.hideTool(e);
        },
        getResourceType: function (e) {
            return b(this.id).getResourceType(e);
        },
        log: function (e) {
            a.log.apply(a.log, arguments);
        },
        getLog: function () {
            return a.mZ();
        },
        emptyBasket: function () {
            b(this.id).execCommand('TruncateBasket');
        },
        replaceUploadForm: function (e) {
            var f = b(this.id);
            f.aG['formpanel.formpanel'][0].on('ib', function (g) {
                if (g.data.step != 2) return;
                g.cancel(true);
                var h = this.data(),
                    i = g.data.folder;
                try {
                    if (h.dc == 'upload') this.oW('requestUnloadForm', function () {
                        this.app.cS('upload').bR(a.aS);
                    });
                    else {
                        if (this.data().dc) this.oW('requestUnloadForm');
                        this.oW('requestLoadForm', {
                            html: e,
                            command: 'upload'
                        });
                    }
                } catch (j) {
                    this.oW('failedUploadFileForm', g.data);
                    this.oW('afterUploadFileForm', g.data);
                    throw a.ba(j);
                }
            });
            return {
                hide: function () {
                    f.oW('requestUnloadForm', function () {
                        f.cS('upload').bR(a.aS);
                    });
                }
            };
        },
        refreshOpenedFolder: function () {
            var e = b(this.id),
                f = e.aG['filesview.filesview'][0].tools.currentFolder();
            e.oW('requestSelectFolder', {
                folder: f
            });
        }
    };
    (function () {
        window.CKFinder = function (e, f) {
            if (e) for (var g in e) {
                if (!e.hasOwnProperty(g)) continue;
                if (typeof e[g] == 'function' && g != 'callback') continue;
                this[g] = e[g];
            }
            this.callback = f;
        };
        CKFinder.prototype = {
            create: function (e) {
                var f = 'ckf' + Math.random().toString().substr(2, 4);
                document.write('<span id="' + f + '"></span>');
                e = a.tools.extend(a.jd.call(this), e, true);
                var g = a.replace(f, e);
                this.lN = g.cg;
                return g.cg;
            },
            appendTo: function (e, f) {
                f = a.tools.extend(a.jd.call(this), f, true);
                var g = a.appendTo(e, f);
                this.lN = g.cg;
                return g.cg;
            },
            replace: function (e, f) {
                f = a.tools.extend(a.jd.call(this), f, true);
                var g = a.replace(e, f);
                this.lN = g.cg;
                return g.cg;
            },
            popup: function (e, f) {
                e = e || '80%';
                f = f || '70%';
                if (typeof e == 'string' && e.length > 1 && e.substr(e.length - 1, 1) == '%') e = parseInt(window.screen.width * parseInt(e, 10) / 100, 10);
                if (typeof f == 'string' && f.length > 1 && f.substr(f.length - 1, 1) == '%') f = parseInt(window.screen.height * parseInt(f, 10) / 100, 10);
                if (e < 200) e = 200;
                if (f < 200) f = 200;
                var g = parseInt((window.screen.height - f) / 2, 10),
                    h = parseInt((window.screen.width - e) / 2, 10),
                    i = 'location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,jy=yes,width=' + e + ',height=' + f + ',top=' + g + ',left=' + h,
                    j = a.env.webkit ? 'about:blank' : '',
                    k = window.open(j, 'CKFinderpopup', i, true);
                if (!k) return false;
                this.width = this.height = '100%';
                var l = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><head><title>CKFinder 2</title><style type="text/css">body, html, iframe, #ckfinder { margin: 0; padding: 0; border: 0; width: 100%; height: 100%; overflow: hidden; }</style></head><body></body></html>';
                a.env.isCustomDomain = function () {
                    return a.env.ie;
                };
                var m = new a.dom.document(k.document);
                m.$.open();
                if (a.env.isCustomDomain()) m.$.domain = window.document.domain;
                m.$.write(l);
                m.$.close();
                try {
                    k.moveTo(h, g);
                    k.resizeTo(e, f);
                    k.focus();
                    return this.appendTo(m.bH());
                } catch (n) {
                    return this.appendTo(m.bH());
                }
                return false;
            }
        };
        CKFinder._ = {};
        CKFinder.lang = {};
        CKFinder.addPlugin = function (e, f, g) {
            var h = {
                bM: g || []
            };
            if (typeof f == 'function') f = {
                appReady: f
            };
            for (var i in f) {
                if (!f.hasOwnProperty(i)) continue;
                if (i != 'connectorInitialized' && i != 'uiReady') h[i] = f[i];
            }
            h.bz = function (j) {
                if (f.connectorInitialized) j.on('connectorInitialized', function (k) {
                    var l = f.connectorInitialized;
                    if (l) l.call(l, j.cg, k.data.xml);
                }, null, null, 1000);
                if (f.uiReady) j.on('uiReady', function () {
                    var k = f.uiReady;
                    k.call(k, j.cg);
                }, null, null, 1000);
                if (f.appReady) j.on('appReady', function () {
                    var k = f.appReady;
                    k.call(k, j.cg);
                }, null, null, 1000);
            };
            a.plugins.add(e, h);
        };
        CKFinder.getPluginPath = function (e) {
            return a.plugins.getPath(e);
        };
        CKFinder.addExternalPlugin = function (e, f, g) {
            a.plugins.tR(e, f, g);
        };
        CKFinder.setPluginLang = function (e, f, g) {
            a.plugins.rX(e, f, g);
        };
        CKFinder.dialog = {
            add: function (e, f) {
                if (typeof f == 'function') f = a.tools.override(f, function (g) {
                    return function (h) {
                        return g(h.cg);
                    };
                });
                a.dialog.add(e, f);
            }
        };
        CKFinder.tools = {};
        CKFinder.env = {};
        CKFinder.dom = {};
        CKFinder.create = function (e, f, g, h, i) {
            var j;
            if (e !== null && typeof e === 'object') {
                j = new CKFinder();
                for (var k in e) j[k] = e[k];
            } else {
                j = new CKFinder();
                j.basePath = e;
                if (f) j.width = f;
                if (g) j.height = f;
                if (h) j.selectActionFunction = h;
                if (i) j.callback = i;
            }
            return j.create();
        };
        CKFinder.popup = function (e, f, g, h, i) {
            var j;
            if (e !== null && typeof e === 'object') {
                j = new CKFinder();
                for (var k in e) j[k] = e[k];
            } else {
                j = new CKFinder();
                j.basePath = e;
                if (h) j.selectActionFunction = h;
                if (i) j.callback = i;
            }
            return j.popup(f, g);
        };
        CKFinder.setupFCKeditor = function (e, f, g, h) {
            var i;
            if (f !== null && typeof f === 'object') {
                i = new CKFinder();
                for (var j in f) {
                    i[j] = f[j];
                    if (j == 'width') {
                        var k = i[j] || 800;
                        if (typeof k == 'string' && k.length > 1 && k.substr(k.length - 1, 1) == '%') k = parseInt(window.screen.width * parseInt(k, 10) / 100, 10);
                        e.Config.LinkBrowserWindowWidth = k;
                        e.Config.ImageBrowserWindowWidth = k;
                        e.Config.FlashBrowserWindowWidth = k;
                    } else if (j == 'height') {
                        var l = i[j] || 600;
                        if (typeof l == 'string' && l.length > 1 && l.substr(l.length - 1, 1) == '%') l = parseInt(window.screen.height * parseInt(l, 10) / 100, 10);
                        e.Config.LinkBrowserWindowHeight = l;
                        e.Config.ImageBrowserWindowHeight = l;
                        e.Config.FlashBrowserWindowHeight = l;
                    }
                }
            } else {
                i = new CKFinder();
                i.basePath = f;
            }
            var m = i.basePath;
            if (m.substr(0, 1) != '/' && m.indexOf('://') == -1) m = document.location.pathname.substring(0, document.location.pathname.lastIndexOf('/') + 1) + m;
            m = a.lj.call(i, m);
            var n = m.indexOf('?') !== -1 ? '&amp;' : '?';
            e.Config.LinkBrowserURL = m;
            e.Config.ImageBrowserURL = m + n + 'type=' + (g || 'Images');
            e.Config.FlashBrowserURL = m + n + 'type=' + (h || 'Flash');
            var o = m.substring(0, 1 + m.lastIndexOf('/'));
            e.Config.LinkUploadURL = o + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=Files';
            e.Config.ImageUploadURL = o + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=' + (g || 'Images');
            e.Config.FlashUploadURL = o + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=' + (h || 'Flash');
        };
        CKFinder.setupCKEditor = function (e, f, g, h) {
            if (e === null) {
                for (var i in CKEDITOR.instances) CKFinder.setupCKEditor(CKEDITOR.instances[i], f, g, h);
                CKEDITOR.on('instanceCreated', function (q) {
                    CKFinder.setupCKEditor(q.editor, f, g, h);
                });
                return;
            }
            var j;
            if (f !== null && typeof f === 'object') {
                j = new CKFinder();
                for (var k in f) {
                    j[k] = f[k];
                    if (k == 'width') {
                        var l = j[k] || 800;
                        if (typeof l == 'string' && l.length > 1 && l.substr(l.length - 1, 1) == '%') l = parseInt(window.screen.width * parseInt(l, 10) / 100, 10);
                        e.config.filebrowserWindowWidth = l;
                    } else if (k == 'height') {
                        var m = j[k] || 600;
                        if (typeof m == 'string' && m.length > 1 && m.substr(m.length - 1, 1) == '%') m = parseInt(window.screen.height * parseInt(m, 10) / 100, 10);
                        e.config.filebrowserWindowHeight = l;
                    }
                }
            } else {
                j = new CKFinder();
                j.basePath = f;
            }
            var n = j.basePath;
            if (n.substr(0, 1) != '/' && n.indexOf('://') == -1) n = document.location.pathname.substring(0, document.location.pathname.lastIndexOf('/') + 1) + n;
            n = a.lj.call(j, n);
            var o = n.indexOf('?') !== -1 ? '&amp;' : '?';
            e.config.filebrowserBrowseUrl = n;
            e.config.filebrowserImageBrowseUrl = n + o + 'type=' + (g || 'Images');
            e.config.filebrowserFlashBrowseUrl = n + o + 'type=' + (h || 'Flash');
            var p = n.substring(0, 1 + n.lastIndexOf('/'));
            e.config.filebrowserUploadUrl = p + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=Files';
            e.config.filebrowserImageUploadUrl = p + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=' + (g || 'Images');
            e.config.filebrowserFlashUploadUrl = p + 'core/connector/' + CKFinder.config.connectorLanguage + '/connector.' + CKFinder.config.connectorLanguage + '?command=QuickUpload&type=' + (h || 'Flash');
        };
    })();
    if (!a.event) {
        a.event = function () {};
        a.event.du = function (e, f) {
            var g = a.event.prototype;
            for (var h in g) {
                if (e[h] == undefined) e[h] = g[h];
            }
        };
        a.event.prototype = (function () {
            var e = function (g) {
                var h = g.kk && g.kk() || g._ || (g._ = {});
                return h.cC || (h.cC = {});
            },
                f = function (g) {
                    this.name = g;
                    this.dF = [];
                };
            f.prototype = {
                mi: function (g) {
                    for (var h = 0, i = this.dF; h < i.length; h++) {
                        if (i[h].gg == g) return h;
                    }
                    return -1;
                }
            };
            return {
                on: function (g, h, i, j, k) {
                    var l = e(this),
                        m = l[g] || (l[g] = new f(g));
                    if (m.mi(h) < 0) {
                        var n = m.dF;
                        if (!i) i = this;
                        if (isNaN(k)) k = 10;
                        var o = this,
                            p = function (r, s, t, u) {
                                var v = {
                                    name: g,
                                    jN: this,
                                    application: r,
                                    data: s,
                                    jO: j,
                                    stop: t,
                                    cancel: u,
                                    aF: function () {
                                        o.aF(g, h);
                                    }
                                };
                                h.call(i, v);
                                return v.data;
                            };
                        p.gg = h;
                        p.nT = k;
                        for (var q = n.length - 1; q >= 0; q--) {
                            if (n[q].nT <= k) {
                                n.splice(q + 1, 0, p);
                                return;
                            }
                        }
                        n.unshift(p);
                    }
                },
                oW: (function () {
                    var g = false,
                        h = function () {
                            g = true;
                        },
                        i = false,
                        j = function (k) {
                            i = k ? 2 : true;
                        };
                    return function oW(k, l, m, n) {
                        if (typeof l == 'function') {
                            n = l;
                            l = null;
                        } else if (typeof m == 'function') {
                            n = m;
                            m = null;
                        }
                        if (k != 'mousemove') a.log('[EVENT] ' + k, l, n);
                        var o = e(this)[k],
                            p = g,
                            q = i;
                        g = i = false;
                        if (o) {
                            var r = o.dF;
                            if (r.length) {
                                r = r.slice(0);
                                for (var s = 0; s < r.length; s++) {
                                    var t = r[s].call(this, m, l, h, j);
                                    if (typeof t != 'undefined') l = t;
                                    if (g || i && i != 2) break;
                                }
                            }
                        }
                        var u = i || (typeof l == 'undefined' ? false : !l || typeof l.result == 'undefined' ? l : l.result);
                        if (typeof n === 'function' && i != 2) u = n.call(this, i, l) || u;
                        g = p;
                        i = q;
                        return u;
                    };
                })(),
                cr: function (g, h, i) {
                    var j = this.oW(g, h, i);
                    delete e(this)[g];
                    return j;
                },
                aF: function (g, h) {
                    var i = e(this)[g];
                    if (i) {
                        var j = i.mi(h);
                        if (j >= 0) i.dF.splice(j, 1);
                    }
                },
                mF: function () {
                    var g = e(this);
                    for (var h = 0; h < g.length; h++) g[h].dF = [];
                },
                rC: function (g) {
                    var h = e(this)[g];
                    return h && h.dF.length > 0;
                }
            };
        })();
    }
    if (!a.application) {
        a.kZ = 0;
        a.fc = 1;
        a.qE = 2;
        a.application = function (e, f, g) {
            var h = this;
            h._ = {
                kw: e,
                ax: f
            };
            h.ff = g || a.kZ;
            a.event.call(h);
            h.iI();
        };
        a.application.replace = function (e, f) {
            var g = e;
            if (typeof g != 'object') {
                g = document.getElementById(e);
                if (!g) {
                    var h = 0,
                        i = document.getElementsByName(e);
                    while ((g = i[h++]) && g.tagName.toLowerCase() != 'textarea') {}
                }
                if (!g) throw '[CKFINDER.application.replace] The ax with id or name "' + e + '" was not found.';
            }
            return new a.application(f, g, a.fc);
        };
        a.application.appendTo = function (e, f) {
            if (typeof e != 'object') {
                e = document.getElementById(e);
                if (!e) throw '[CKFINDER.application.appendTo] The ax with id "' + e + '" was not found.';
            }
            return new a.application(f, e, a.qE);
        };
        a.application.prototype = {
            iI: function () {
                var e = a.application.eb || (a.application.eb = []);
                e.push(this);
            },
            oW: function (e, f, g) {
                return a.event.prototype.oW.call(this, e, f, this, g);
            },
            cr: function (e, f, g) {
                return a.event.prototype.cr.call(this, e, f, this, g);
            }
        };
        a.event.du(a.application.prototype, true);
    }
    if (!a.env) {
        a.env = (function () {
            var e = navigator.userAgent.toLowerCase(),
                f = window.opera,
                g = {
                    ie: /*@cc_on!@*/
                    false,
                    opera: !!f && f.version,
                    webkit: e.indexOf(' applewebkit/') > -1,
                    air: e.indexOf(' adobeair/') > -1,
                    mac: e.indexOf('macintosh') > -1,
                    quirks: document.compatMode == 'BackCompat',
                    isCustomDomain: function () {
                        return this.ie && document.domain != window.location.hostname;
                    }
                };
            g.gecko = navigator.product == 'Gecko' && !g.webkit && !g.opera;
            var h = 0;
            if (g.ie) {
                h = parseFloat(e.match(/msie (\d+)/)[1]);
                g.ie8 = !!document.documentMode;
                g.ie8Compat = document.documentMode == 8;
                g.ie7Compat = h == 7 && !document.documentMode || document.documentMode == 7;
                g.ie6Compat = h < 7 || g.quirks;
            }
            if (g.gecko) {
                var i = e.match(/rv:([\d\.]+)/);
                if (i) {
                    i = i[1].split('.');
                    h = i[0] * 10000 + (i[1] || 0) * 100 + +(i[2] || 0);
                }
            }
            if (g.opera) h = parseFloat(f.version());
            if (g.air) h = parseFloat(e.match(/ adobeair\/(\d+)/)[1]);
            if (g.webkit) h = parseFloat(e.match(/ applewebkit\/(\d+)/)[1]);
            g.version = h;
            g.isCompatible = g.ie && h >= 6 || g.gecko && h >= 10801 || g.opera && h >= 9.5 || g.air && h >= 1 || g.webkit && h >= 522 || false;
            g.cssClass = 'browser_' + (g.ie ? 'ie' : g.gecko ? 'gecko' : g.opera ? 'opera' : g.air ? 'air' : g.webkit ? 'webkit' : 'unknown');
            if (g.quirks) g.cssClass += ' browser_quirks';
            if (g.ie) {
                g.cssClass += ' browser_ie' + (g.version < 7 ? '6' : g.version >= 8 ? '8' : '7');
                if (g.quirks) g.cssClass += ' browser_iequirks';
            }
            if (g.gecko && h < 10900) g.cssClass += ' browser_gecko18';
            return g;
        })();
        CKFinder.env = a.env;
    }
    var e = a.env;
    var f = e.ie;
    if (a.status == 'unloaded')(function () {
        a.event.du(a);
        a.dO = function () {
            if (a.status != 'basic_ready') {
                a.dO.qr = true;
                return;
            }
            delete a.dO;
            var h = document.createElement('script');
            h.type = 'text/javascript';
            h.src = a.basePath + 'ckfinder.js';
            document.getElementsByTagName('head')[0].appendChild(h);
        };
        a.mS = 0;
        a.uQ = 'ckfinder';
        a.uM = true;
        var g = function (h, i, j) {
            if (e.isCompatible) {
                if (a.dO) a.dO();
                var k = j(h, i);
                a.add(k);
                return k;
            }
            return null;
        };
        a.replace = function (h, i) {
            return g(h, i, a.application.replace);
        };
        a.appendTo = function (h, i) {
            return g(h, i, a.application.appendTo);
        };
        a.add = function (h) {
            var i = this._.io || (this._.io = []);
            i.push(h);
        };
        a.uL = function () {
            var h = document.getElementsByTagName('textarea');
            for (var i = 0; i < h.length; i++) {
                var j = null,
                    k = h[i],
                    l = k.name;
                if (!k.name && !k.id) continue;
                if (typeof arguments[0] == 'string') {
                    var m = new RegExp('(?:^| )' + arguments[0] + '(?:$| )');
                    if (!m.test(k.className)) continue;
                } else if (typeof arguments[0] == 'function') {
                    j = {};
                    if (arguments[0](k, j) === false) continue;
                }
                this.replace(k, j);
            }
        };
        (function () {
            var h = function () {
                var i = a.dO,
                    j = a.mS;
                a.status = 'basic_ready';
                if (i && i.qr) i();
                else if (j) setTimeout(function () {
                    if (a.dO) a.dO();
                }, j * 1000);
            };
            if (window.addEventListener) window.addEventListener('load', h, false);
            else if (window.attachEvent) window.attachEvent('onload', h);
        })();
        a.status = 'basic_loaded';
    })();
    a.dom = {};
    CKFinder.dom = a.dom;
    var g = a.dom;
    a.ajax = (function () {
        var h = function () {
            if (!f || location.protocol != 'file:') try {
                return new XMLHttpRequest();
            } catch (m) {}
            try {
                return new ActiveXObject('Msxml2.XMLHTTP');
            } catch (n) {}
            try {
                return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (o) {}
            return null;
        },
            i = function (m) {
                return m.readyState == 4 && (m.status >= 200 && m.status < 300 || m.status == 304 || m.status === 0 || m.status == 1223);
            },
            j = function (m) {
                if (i(m)) return m.responseText;
                return null;
            },
            k = function (m) {
                if (i(m)) {
                    var n = m.responseXML,
                        o = new a.xml(n && n.firstChild && n.documentElement && n.documentElement.nodeName != 'parsererror' ? n : m.responseText.replace(/^[^<]+/, '').replace(/[^>]+$/, ''));
                    if (o && o.mq && o.mq.documentElement && o.mq.documentElement.nodeName != 'parsererror' && o.mq.documentElement.nodeName != 'html' && o.mq.documentElement.nodeName != 'br') return o;
                }
                var p = a.eq || a.jt;
                p.msgDialog(p.lang.SysErrorDlgTitle, m.responseText);
                return {};
            },
            l = function (m, n, o, p) {
                var q = !!n;
                a.log('[AJAX] POST ' + m);
                var r = h();
                if (!r) return null;
                if (!p) r.open('GET', m, q);
                else r.open('POST', m, q);
                if (q) r.onreadystatechange = function () {
                    if (r.readyState == 4) {
                        n(o(r));
                        r = null;
                    }
                };
                if (p) {
                    r.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    r.send(p);
                } else r.send(null);
                return q ? '' : o(r);
            };
        return {
            load: function (m, n, o) {
                return l(m, n, j, o);
            },
            loadXml: function (m, n, o) {
                return l(m, n, k, o);
            }
        };
    })();
    CKFinder.ajax = a.ajax;
    (function () {
        var h = [];
        a.tools = {
            arrayCompare: function (i, j) {
                if (!i && !j) return true;
                if (!i || !j || i.length != j.length) return false;
                for (var k = 0; k < i.length; k++) {
                    if (i[k] != j[k]) return false;
                }
                return true;
            },
            clone: function (i) {
                var j;
                if (i && i instanceof Array) {
                    j = [];
                    for (var k = 0; k < i.length; k++) j[k] = this.clone(i[k]);
                    return j;
                }
                if (i === null || typeof i != 'object' || i instanceof String || i instanceof Number || i instanceof Boolean || i instanceof Date) return i;
                j = new i.constructor();
                for (var l in i) {
                    var m = i[l];
                    j[l] = this.clone(m);
                }
                return j;
            },
            extend: function (i) {
                var j = arguments.length,
                    k, l;
                if (typeof(k = arguments[j - 1]) == 'boolean') j--;
                else if (typeof(k = arguments[j - 2]) == 'boolean') {
                    l = arguments[j - 1];
                    j -= 2;
                }
                for (var m = 1; m < j; m++) {
                    var n = arguments[m];
                    for (var o in n) {
                        if (k === true || i[o] == undefined) if (!l || o in l) i[o] = n[o];
                    }
                }
                return i;
            },
            prototypedCopy: function (i) {
                var j = function () {};
                j.prototype = i;
                return new j();
            },
            isArray: function (i) {
                return !!i && i instanceof Array;
            },
            cssStyleToDomStyle: (function () {
                var i = document.createElement('div').style,
                    j = typeof i.cssFloat != 'undefined' ? 'cssFloat' : typeof i.styleFloat != 'undefined' ? 'styleFloat' : 'float';
                return function (k) {
                    if (k == 'float') return j;
                    else return k.replace(/-./g, function (l) {
                        return l.substr(1).toUpperCase();
                    });
                };
            })(),
            htmlEncode: function (i) {
                var j = function (n) {
                    var o = new g.ax('span');
                    o.setText(n);
                    return o.getHtml();
                },
                    k = j('\n').toLowerCase() == '<br>' ?
                    function (n) {
                        return j(n).replace(/<br>/gi, '\n');
                    } : j,
                    l = j('>') == '>' ?
                    function (n) {
                        return k(n).replace(/>/g, '&gt;');
                    } : k,
                    m = j('  ') == '&nbsp; ' ?
                    function (n) {
                        return l(n).replace(/&nbsp;/g, ' ');
                    } : l;
                this.htmlEncode = m;
                return this.htmlEncode(i);
            },
            getNextNumber: (function () {
                var i = 0;
                return function () {
                    return ++i;
                };
            })(),
            override: function (i, j) {
                return j(i);
            },
            setTimeout: function (i, j, k, l, m) {
                if (!m) m = window;
                if (!k) k = m;
                return m.setTimeout(function () {
                    if (l) i.apply(k, [].concat(l));
                    else i.apply(k);
                }, j || 0);
            },
            trim: (function () {
                var i = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
                return function (j) {
                    return j ? j.replace(i, '') : null;
                };
            })(),
            ltrim: (function () {
                var i = /^[ \t\n\r]+/g;
                return function (j) {
                    return j ? j.replace(i, '') : null;
                };
            })(),
            rtrim: (function () {
                var i = /[ \t\n\r]+$/g;
                return function (j) {
                    return j ? j.replace(i, '') : null;
                };
            })(),
            indexOf: Array.prototype.indexOf ?
            function (i, j) {
                return i.indexOf(j);
            } : function (i, j) {
                for (var k = 0, l = i.length; k < l; k++) {
                    if (i[k] === j) return k;
                }
                return -1;
            },
            bind: function (i, j) {
                return function () {
                    return i.apply(j, arguments);
                };
            },
            createClass: function (i) {
                var j = i.$,
                    k = i.base,
                    l = i.vd || i._,
                    m = i.ej,
                    n = i.statics;
                if (l) {
                    var o = j;
                    j = function () {
                        var s = this;
                        var p = s._ || (s._ = {});
                        for (var q in l) {
                            var r = l[q];
                            p[q] = typeof r == 'function' ? a.tools.bind(r, s) : r;
                        }
                        o.apply(s, arguments);
                    };
                }
                if (k) {
                    j.prototype = this.prototypedCopy(k.prototype);
                    j.prototype['constructor'] = j;
                    j.prototype.base = function () {
                        this.base = k.prototype.base;
                        k.apply(this, arguments);
                        this.base = arguments.callee;
                    };
                }
                if (m) this.extend(j.prototype, m, true);
                if (n) this.extend(j, n, true);
                return j;
            },
            addFunction: function (i, j) {
                return h.push(function () {
                    i.apply(j || this, arguments);
                }) - 1;
            },
            callFunction: function (i) {
                var j = h[i];
                return j.apply(window, Array.prototype.slice.call(arguments, 1));
            },
            cssLength: (function () {
                var i = /^\d+(?:\.\d+)?$/;
                return function (j) {
                    return j + (i.test(j) ? 'px' : '');
                };
            })(),
            repeat: function (i, j) {
                return new Array(j + 1).join(i);
            },
            deepCopy: function (i) {
                var j = {};
                if (typeof i == 'object') {
                    if (typeof i.length != 'undefined') j = [];
                    for (var k in i) {
                        if (i[k] === null) j[k] = i[k];
                        else if (typeof i[k] == 'object') j[k] = a.tools.deepCopy(i[k]);
                        else if (typeof i[k] == 'string') j[k] = i[k];
                        else if (typeof i[k] == 'number') j[k] = i[k];
                        else if (typeof i[k] == 'boolean') i[k] === true ? j[k] = true : j[k] = false;
                    }
                }
                return j;
            },
            getUrlParam: function (i, j) {
                var k = new RegExp('(?:[?&]|&amp;)' + i + '=([^&]+)', 'i'),
                    l = (j || window).location.search.match(k);
                return l && l.length > 1 ? l[1] : null;
            },
            htmlEncode: function (i) {
                if (!i) return '';
                i = typeof i != 'string' ? i.toString() : i;
                i = i.replace(/&/g, '&amp;');
                i = i.replace(/</g, '&lt;');
                i = i.replace(/>/g, '&gt;');
                return i;
            },
            setCookie: function (i, j, k) {
                document.cookie = i + '=' + j + (!k ? '; expires=Thu, 6 Oct 2016 01:00:00 UTC; path=/' : '');
            },
            getCookie: function (i) {
                var j = document.cookie.match(new RegExp('(^|\\s|;)' + i + '=([^;]*)'));
                return j && j.length > 0 ? j[2] : '';
            }
        };
        CKFinder._.callFunction = a.tools.callFunction;
        CKFinder.tools = a.tools;
    })();
    var h = a.tools;
    g.event = function (i) {
        this.$ = i;
    };
    g.event.prototype = {
        oV: function () {
            return this.$.keyCode || this.$.which;
        },
        db: function () {
            var j = this;
            var i = j.oV();
            if (j.$.ctrlKey || j.$.metaKey) i += a.bP;
            if (j.$.shiftKey) i += a.dy;
            if (j.$.altKey) i += a.eJ;
            return i;
        },
        preventDefault: function (i) {
            var j = this.$;
            if (j.preventDefault) j.preventDefault();
            else j.returnValue = false;
            if (i) this.stopPropagation();
        },
        stopPropagation: function () {
            var i = this.$;
            if (i.stopPropagation) i.stopPropagation();
            else i.cancelBubble = true;
        },
        bK: function () {
            var i = this.$.target || this.$.srcElement;
            return i ? new g.bi(i) : null;
        }
    };
    a.bP = 1000;
    a.dy = 2000;
    a.eJ = 4000;
    g.dE = function (i) {
        if (i) this.$ = i;
    };
    g.dE.prototype = (function () {
        var i = function (j, k) {
            return function (l) {
                if (typeof a != 'undefined') j.oW(k, new g.event(l));
            };
        };
        return {
            kk: function () {
                var j;
                if (!(j = this.dw('_'))) this.fL('_', j = {});
                return j;
            },
            on: function (j) {
                var m = this;
                var k = m.dw('_cke_nativeListeners');
                if (!k) {
                    k = {};
                    m.fL('_cke_nativeListeners', k);
                }
                if (!k[j]) {
                    var l = k[j] = i(m, j);
                    if (m.$.addEventListener) m.$.addEventListener(j, l, !!a.event.jP);
                    else if (m.$.attachEvent) m.$.attachEvent('on' + j, l);
                }
                return a.event.prototype.on.apply(m, arguments);
            },
            aF: function (j) {
                var m = this;
                a.event.prototype.aF.apply(m, arguments);
                if (!m.rC(j)) {
                    var k = m.dw('_cke_nativeListeners'),
                        l = k && k[j];
                    if (l) {
                        if (m.$.removeEventListener) m.$.removeEventListener(j, l, false);
                        else if (m.$.detachEvent) m.$.detachEvent('on' + j, l);
                        delete k[j];
                    }
                }
            }
        };
    })();
    (function (i) {
        var j = {};
        i.equals = function (k) {
            return k && k.$ === this.$;
        };
        i.fL = function (k, l) {
            var m = this.iY(),
                n = j[m] || (j[m] = {});
            n[k] = l;
            return this;
        };
        i.dw = function (k) {
            var l = this.$.dj,
                m = l && j[l];
            return m && m[k];
        };
        i.jF = function (k) {
            var l = this.$.dj,
                m = l && j[l],
                n = m && m[k];
            if (typeof n != 'undefined') delete m[k];
            return n || null;
        };
        i.iY = function () {
            return this.$.dj || (this.$.dj = h.getNextNumber());
        };
        a.event.du(i);
    })(g.dE.prototype);
    g.window = function (i) {
        g.dE.call(this, i);
    };
    g.window.prototype = new g.dE();
    h.extend(g.window.prototype, {
        focus: function () {
            if (e.webkit && this.$.parent) this.$.parent.focus();
            this.$.focus();
        },
        eR: function () {
            var i = this.$.document,
                j = i.compatMode == 'CSS1Compat';
            return {
                width: (j ? i.documentElement.clientWidth : i.body.clientWidth) || 0,
                height: (j ? i.documentElement.clientHeight : i.body.clientHeight) || 0
            };
        },
        hV: function () {
            var i = this.$;
            if ('pageXOffset' in i) return {
                x: i.pageXOffset || 0,
                y: i.pageYOffset || 0
            };
            else {
                var j = i.document;
                return {
                    x: j.documentElement.scrollLeft || j.body.scrollLeft || 0,
                    y: j.documentElement.scrollTop || j.body.scrollTop || 0
                };
            }
        }
    });
    g.document = function (i) {
        g.dE.call(this, i);
    };
    var i = g.document;
    i.prototype = new g.dE();
    h.extend(i.prototype, {
        pb: function (j) {
            if (this.$.createStyleSheet) this.$.createStyleSheet(j);
            else {
                var k = new g.ax('link');
                k.setAttributes({
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: j
                });
                this.eD().append(k);
            }
        },
        createElement: function (j, k) {
            var l = new g.ax(j, this);
            if (k) {
                if (k.attributes) l.setAttributes(k.attributes);
                if (k.gS) l.setStyles(k.gS);
            }
            return l;
        },
        jT: function (j) {
            return new g.text(j, this);
        },
        focus: function () {
            this.aU().focus();
        },
        getById: function (j) {
            var k = this.$.getElementById(j);
            return k ? new g.ax(k) : null;
        },
        vu: function (j, k) {
            var l = this.$.documentElement;
            for (var m = 0; l && m < j.length; m++) {
                var n = j[m];
                if (!k) {
                    l = l.childNodes[n];
                    continue;
                }
                var o = -1;
                for (var p = 0; p < l.childNodes.length; p++) {
                    var q = l.childNodes[p];
                    if (k === true && q.nodeType == 3 && q.previousSibling && q.previousSibling.nodeType == 3) continue;
                    o++;
                    if (o == n) {
                        l = q;
                        break;
                    }
                }
            }
            return l ? new g.bi(l) : null;
        },
        eG: function (j, k) {
            if (!f && k) j = k + ':' + j;
            return new g.iT(this.$.getElementsByTagName(j));
        },
        eD: function () {
            var j = this.$.getElementsByTagName('head')[0];
            j = new g.ax(j);
            return (this.eD = function () {
                return j;
            })();
        },
        bH: function () {
            var j = new g.ax(this.$.body);
            return (this.bH = function () {
                return j;
            })();
        },
        gT: function () {
            var j = new g.ax(this.$.documentElement);
            return (this.gT = function () {
                return j;
            })();
        },
        aU: function () {
            var j = new g.window(this.$.parentWindow || this.$.defaultView);
            return (this.aU = function () {
                return j;
            })();
        }
    });
    g.bi = function (j) {
        if (j) {
            switch (j.nodeType) {
            case a.cv:
                return new g.ax(j);
            case a.fl:
                return new g.text(j);
            }
            g.dE.call(this, j);
        }
        return this;
    };
    g.bi.prototype = new g.dE();
    a.cv = 1;
    a.fl = 3;
    a.va = 8;
    a.om = 11;
    a.oh = 0;
    a.op = 1;
    a.gW = 2;
    a.gX = 4;
    a.mo = 8;
    a.lF = 16;
    h.extend(g.bi.prototype, {
        appendTo: function (j, k) {
            j.append(this, k);
            return j;
        },
        clone: function (j, k) {
            var l = this.$.cloneNode(j);
            if (!k) {
                var m = function (n) {
                    if (n.nodeType != a.cv) return;
                    n.removeAttribute('id', false);
                    n.removeAttribute('dj', false);
                    var o = n.childNodes;
                    for (var p = 0; p < o.length; p++) m(o[p]);
                };
                m(l);
            }
            return new g.bi(l);
        },
        gE: function () {
            return !!this.$.previousSibling;
        },
        ge: function () {
            return !!this.$.nextSibling;
        },
        kB: function (j) {
            j.$.parentNode.insertBefore(this.$, j.$.nextSibling);
            return j;
        },
        insertBefore: function (j) {
            j.$.parentNode.insertBefore(this.$, j.$);
            return j;
        },
        vP: function (j) {
            this.$.parentNode.insertBefore(j.$, this.$);
            return j;
        },
        lU: function (j) {
            var k = [],
                l = this.getDocument().$.documentElement,
                m = this.$;
            while (m && m != l) {
                var n = m.parentNode,
                    o = -1;
                for (var p = 0; p < n.childNodes.length; p++) {
                    var q = n.childNodes[p];
                    if (j && q.nodeType == 3 && q.previousSibling && q.previousSibling.nodeType == 3) continue;
                    o++;
                    if (q == m) break;
                }
                k.unshift(o);
                m = m.parentNode;
            }
            return k;
        },
        getDocument: function () {
            var j = new i(this.$.ownerDocument || this.$.parentNode.ownerDocument);
            return (this.getDocument = function () {
                return j;
            })();
        },
        vA: function () {
            var j = this.$,
                k = j.parentNode && j.parentNode.firstChild,
                l = -1;
            while (k) {
                l++;
                if (k == j) return l;
                k = k.nextSibling;
            }
            return -1;
        },
        hL: function (j, k, l) {
            if (l && !l.call) {
                var m = l;
                l = function (p) {
                    return !p.equals(m);
                };
            }
            var n = !j && this.getFirst && this.getFirst(),
                o;
            if (!n) {
                if (this.type == a.cv && l && l(this, true) === false) return null;
                n = this.dG();
            }
            while (!n && (o = (o || this).getParent())) {
                if (l && l(o, true) === false) return null;
                n = o.dG();
            }
            if (!n) return null;
            if (l && l(n) === false) return null;
            if (k && k != n.type) return n.hL(false, k, l);
            return n;
        },
        hZ: function (j, k, l) {
            if (l && !l.call) {
                var m = l;
                l = function (p) {
                    return !p.equals(m);
                };
            }
            var n = !j && this.dB && this.dB(),
                o;
            if (!n) {
                if (this.type == a.cv && l && l(this, true) === false) return null;
                n = this.cf();
            }
            while (!n && (o = (o || this).getParent())) {
                if (l && l(o, true) === false) return null;
                n = o.cf();
            }
            if (!n) return null;
            if (l && l(n) === false) return null;
            if (k && n.type != k) return n.hZ(false, k, l);
            return n;
        },
        cf: function (j) {
            var k = this.$,
                l;
            do {
                k = k.previousSibling;
                l = k && new g.bi(k);
            } while (l && j && !j(l)){ return l;}
        },
        vs: function () {
            return this.cf(function (j) {
                return j.$.nodeType == 1;
            });
        },
        dG: function (j) {
            var k = this.$,
                l;
            do {
                k = k.nextSibling;
                l = k && new g.bi(k);
            } while (l && j && !j(l)) return l;
        },
        vk: function () {
            return this.dG(function (j) {
                return j.$.nodeType == 1;
            });
        },
        getParent: function () {
            var j = this.$.parentNode;
            return j && j.nodeType == 1 ? new g.bi(j) : null;
        },
        vn: function (j) {
            var k = this,
                l = [];
            do l[j ? 'push' : 'unshift'](k);
            while (k = k.getParent()) return l;
        },
        vv: function (j) {
            var l = this;
            if (j.equals(l)) return l;
            if (j.contains && j.contains(l)) return j;
            var k = l.contains ? l : l.getParent();
            do {
                if (k.contains(j)) return k;
            } while (k = k.getParent()) return null;
        },
        gz: function (j) {
            var k = this.$,
                l = j.$;
            if (k.compareDocumentPosition) return k.compareDocumentPosition(l);
            if (k == l) return a.oh;
            if (this.type == a.cv && j.type == a.cv) {
                if (k.contains) {
                    if (k.contains(l)) return a.lF + a.gX;
                    if (l.contains(k)) return a.mo + a.gW;
                }
                if ('sourceIndex' in k) return k.sourceIndex < 0 || l.sourceIndex < 0 ? a.op : k.sourceIndex < l.sourceIndex ? a.gX : a.gW;
            }
            var m = this.lU(),
                n = j.lU(),
                o = Math.min(m.length, n.length);
            for (var p = 0; p <= o - 1; p++) {
                if (m[p] != n[p]) {
                    if (p < o) return m[p] < n[p] ? a.gX : a.gW;
                    break;
                }
            }
            return m.length < n.length ? a.lF + a.gX : a.mo + a.gW;
        },
        vw: function (j, k) {
            var l = this.$;
            if (!k) l = l.parentNode;
            while (l) {
                if (l.nodeName && l.nodeName.toLowerCase() == j) return new g.bi(l);
                l = l.parentNode;
            }
            return null;
        },
        vX: function (j, k) {
            var l = this.$;
            if (!k) l = l.parentNode;
            while (l) {
                if (l.nodeName && l.nodeName.toLowerCase() == j) return true;
                l = l.parentNode;
            }
            return false;
        },
        move: function (j, k) {
            j.append(this.remove(), k);
        },
        remove: function (j) {
            var k = this.$,
                l = k.parentNode;
            if (l) {
                if (j) for (var m; m = k.firstChild;) l.insertBefore(k.removeChild(m), k);
                l.removeChild(k);
            }
            return this;
        },
        replace: function (j) {
            this.insertBefore(j);
            j.remove();
        },
        trim: function () {
            this.ltrim();
            this.rtrim();
        },
        ltrim: function () {
            var m = this;
            var j;
            while (m.getFirst && (j = m.getFirst())) {
                if (j.type == a.fl) {
                    var k = h.ltrim(j.getText()),
                        l = j.hJ();
                    if (!k) {
                        j.remove();
                        continue;
                    } else if (k.length < l) {
                        j.split(l - k.length);
                        m.$.removeChild(m.$.firstChild);
                    }
                }
                break;
            }
        },
        rtrim: function () {
            var m = this;
            var j;
            while (m.dB && (j = m.dB())) {
                if (j.type == a.fl) {
                    var k = h.rtrim(j.getText()),
                        l = j.hJ();
                    if (!k) {
                        j.remove();
                        continue;
                    } else if (k.length < l) {
                        j.split(k.length);
                        m.$.lastChild.parentNode.removeChild(m.$.lastChild);
                    }
                }
                break;
            }
            if (!f && !e.opera) {
                j = m.$.lastChild;
                if (j && j.type == 1 && j.nodeName.toLowerCase() == 'br') j.parentNode.removeChild(j);
            }
        }
    });
    g.iT = function (j) {
        this.$ = j;
    };
    g.iT.prototype = {
        count: function () {
            return this.$.length;
        },
        getItem: function (j) {
            var k = this.$[j];
            return k ? new g.bi(k) : null;
        }
    };
    g.ax = function (j, k) {
        if (typeof j == 'string') j = (k ? k.$ : document).createElement(j);
        g.dE.call(this, j);
    };
    var j = g.ax;
    j.eB = function (k) {
        return k && (k.$ ? k : new j(k));
    };
    j.prototype = new g.bi();
    j.et = function (k, l) {
        var m = new j('div', l);
        m.setHtml(k);
        return m.getFirst().remove();
    };
    j.rS = function (k, l, m, n) {
        var o = l.dw('list_marker_id') || l.fL('list_marker_id', h.getNextNumber()).dw('list_marker_id'),
            p = l.dw('list_marker_names') || l.fL('list_marker_names', {}).dw('list_marker_names');
        k[o] = l;
        p[m] = 1;
        return l.fL(m, n);
    };
    j.sM = function (k) {
        for (var l in k) j.qZ(k, k[l], true);
    };
    j.qZ = function (k, l, m) {
        var n = l.dw('list_marker_names'),
            o = l.dw('list_marker_id');
        for (var p in n) l.jF(p);
        l.jF('list_marker_names');
        if (m) {
            l.jF('list_marker_id');
            delete k[o];
        }
    };
    h.extend(j.prototype, {
        type: a.cv,
        addClass: function (k) {
            var l = this.$.className;
            if (l) {
                var m = new RegExp('(?:^|\\s)' + k + '(?:\\s|$)', '');
                if (!m.test(l)) l += ' ' + k;
            }
            this.$.className = l || k;
        },
        removeClass: function (k) {
            var l = this.getAttribute('class');
            if (l) {
                var m = new RegExp('(?:^|\\s+)' + k + '(?=\\s|$)', 'i');
                if (m.test(l)) {
                    l = l.replace(m, '').replace(/^\s+/, '');
                    if (l) this.setAttribute('class', l);
                    else this.removeAttribute('class');
                }
            }
        },
        hasClass: function (k) {
            var l = new RegExp('(?:^|\\s+)' + k + '(?=\\s|$)', '');
            return l.test(this.getAttribute('class'));
        },
        append: function (k, l) {
            var m = this;
            if (typeof k == 'string') k = m.getDocument().createElement(k);
            if (l) m.$.insertBefore(k.$, m.$.firstChild);
            else m.$.appendChild(k.$);
            a.log('[DOM] DOM flush into ' + m.getName());
            return k;
        },
        appendHtml: function (k) {
            var m = this;
            if (!m.$.childNodes.length) m.setHtml(k);
            else {
                var l = new j('div', m.getDocument());
                l.setHtml(k);
                l.jg(m);
            }
        },
        appendText: function (k) {
            if (this.$.text != undefined) this.$.text += k;
            else this.append(new g.text(k));
        },
        pd: function () {
            var l = this;
            var k = l.dB();
            while (k && k.type == a.fl && !h.rtrim(k.getText())) k = k.cf();
            if (!k || !k.is || !k.is('br')) l.append(e.opera ? l.getDocument().jT('') : l.getDocument().createElement('br'));
        },
        tV: function (k) {
            var n = this;
            var l = new g.mk(n.getDocument());
            l.setStartAfter(n);
            l.setEndAfter(k);
            var m = l.extractContents();
            l.insertNode(n.remove());
            m.kA(n);
        },
        contains: f || e.webkit ?
        function (k) {
            var l = this.$;
            return k.type != a.cv ? l.contains(k.getParent().$) : l != k.$ && l.contains(k.$);
        } : function (k) {
            return !!(this.$.compareDocumentPosition(k.$) & 16);
        },
        focus: function () {
            try {
                this.$.focus();
            } catch (k) {}
        },
        getHtml: function () {
            return this.$.innerHTML;
        },
        vi: function () {
            var l = this;
            if (l.$.outerHTML) return l.$.outerHTML.replace(/<\?[^>]*>/, '');
            var k = l.$.ownerDocument.createElement('div');
            k.appendChild(l.$.cloneNode(true));
            return k.innerHTML;
        },
        setHtml: function (k) {
            a.log('[DOM] DOM flush into ' + this.getName());
            return this.$.innerHTML = k;
        },
        setText: function (k) {
            j.prototype.setText = this.$.innerText != undefined ?
            function (l) {
                a.log('[DOM] Text flush');
                return this.$.innerText = l;
            } : function (l) {
                a.log('[DOM] Text flush');
                return this.$.textContent = l;
            };
            return this.setText(k);
        },
        getAttribute: (function () {
            var k = function (l) {
                return this.$.getAttribute(l, 2);
            };
            if (f && (e.ie7Compat || e.ie6Compat)) return function (l) {
                var n = this;
                switch (l) {
                case 'class':
                    l = 'className';
                    break;
                case 'tabindex':
                    var m = k.call(n, l);
                    if (m !== 0 && n.$.tabIndex === 0) m = null;
                    return m;
                    break;
                case 'checked':
                    return n.$.checked;
                    break;
                case 'style':
                    return n.$.style.cssText;
                }
                return k.call(n, l);
            };
            else return k;
        })(),
        getChildren: function () {
            return new g.iT(this.$.childNodes);
        },
        getComputedStyle: f ?
        function (k) {
            return this.$.currentStyle[h.cssStyleToDomStyle(k)];
        } : function (k) {
            return this.aU().$.getComputedStyle(this.$, '').getPropertyValue(k);
        },
        pf: function () {
            var k = a.ga[this.getName()];
            this.pf = function () {
                return k;
            };
            return k;
        },
        eG: i.prototype.eG,
        vp: f ?
        function () {
            var k = this.$.tabIndex;
            if (k === 0 && !a.ga.ug[this.getName()] && parseInt(this.getAttribute('tabindex'), 10) !== 0) k = -1;
            return k;
        } : e.webkit ?
        function () {
            var k = this.$.tabIndex;
            if (k == undefined) {
                k = parseInt(this.getAttribute('tabindex'), 10);
                if (isNaN(k)) k = -1;
            }
            return k;
        } : function () {
            return this.$.tabIndex;
        },
        getText: function () {
            return this.$.textContent || this.$.innerText || '';
        },
        aU: function () {
            return this.getDocument().aU();
        },
        dS: function () {
            return this.$.id || null;
        },
        vm: function () {
            return this.$.name || null;
        },
        getName: function () {
            var k = this.$.nodeName.toLowerCase();
            if (f) {
                var l = this.$.scopeName;
                if (l != 'HTML') k = l.toLowerCase() + ':' + k;
            }
            return (this.getName = function () {
                return k;
            })();
        },
        getValue: function () {
            return this.$.value;
        },
        getFirst: function () {
            var k = this.$.firstChild;
            return k ? new g.bi(k) : null;
        },
        dB: function (k) {
            var l = this.$.lastChild,
                m = l && new g.bi(l);
            if (m && k && !k(m)) m = m.cf(k);
            return m;
        },
        rd: function (k) {
            return this.$.style[h.cssStyleToDomStyle(k)];
        },
        is: function () {
            var k = this.getName();
            for (var l = 0; l < arguments.length; l++) {
                if (arguments[l] == k) return true;
            }
            return false;
        },
        vL: function () {
            var k = this.getName(),
                l = !a.ga.uj[k] && (a.ga[k] || a.ga.span);
            return l && l['#'];
        },
        isIdentical: function (k) {
            if (this.getName() != k.getName()) return false;
            var l = this.$.attributes,
                m = k.$.attributes,
                n = l.length,
                o = m.length;
            if (!f && n != o) return false;
            for (var p = 0; p < n; p++) {
                var q = l[p];
                if ((!f || q.specified && q.nodeName != 'dj') && q.nodeValue != k.getAttribute(q.nodeName)) return false;
            }
            if (f) for (p = 0; p < o; p++) {
                q = m[p];
                if ((!f || q.specified && q.nodeName != 'dj') && q.nodeValue != l.getAttribute(q.nodeName)) return false;
            }
            return true;
        },
        isVisible: function () {
            return this.$.offsetWidth && this.$.style.visibility != 'hidden';
        },
        hasAttributes: f && (e.ie7Compat || e.ie6Compat) ?
        function () {
            var k = this.$.attributes;
            for (var l = 0; l < k.length; l++) {
                var m = k[l];
                switch (m.nodeName) {
                case 'class':
                    if (this.getAttribute('class')) return true;
                case 'dj':
                    continue;
                default:
                    if (m.specified) return true;
                }
            }
            return false;
        } : function () {
            var k = this.$.attributes;
            return k.length > 1 || k.length == 1 && k[0].nodeName != 'dj';
        },
        hasAttribute: function (k) {
            var l = this.$.attributes.getNamedItem(k);
            return !!(l && l.specified);
        },
        hide: function () {
            this.setStyle('display', 'none');
        },
        jg: function (k, l) {
            var m = this.$;
            k = k.$;
            if (m == k) return;
            var n;
            if (l) while (n = m.lastChild) k.insertBefore(m.removeChild(n), k.firstChild);
            else while (n = m.firstChild) k.appendChild(m.removeChild(n));
        },
        show: function () {
            this.setStyles({
                display: '',
                visibility: ''
            });
        },
        setAttribute: (function () {
            var k = function (l, m) {
                this.$.setAttribute(l, m);
                return this;
            };
            if (f && (e.ie7Compat || e.ie6Compat)) return function (l, m) {
                var n = this;
                if (l == 'class') n.$.className = m;
                else if (l == 'style') n.$.style.cssText = m;
                else if (l == 'tabindex') n.$.tabIndex = m;
                else if (l == 'checked') n.$.checked = m;
                else k.apply(n, arguments);
                return n;
            };
            else return k;
        })(),
        setAttributes: function (k) {
            for (var l in k) this.setAttribute(l, k[l]);
            return this;
        },
        setValue: function (k) {
            this.$.value = k;
            return this;
        },
        removeAttribute: (function () {
            var k = function (l) {
                this.$.removeAttribute(l);
            };
            if (f && (e.ie7Compat || e.ie6Compat)) return function (l) {
                if (l == 'class') l = 'className';
                else if (l == 'tabindex') l = 'tabIndex';
                k.call(this, l);
            };
            else return k;
        })(),
        uW: function (k) {
            for (var l = 0; l < k.length; l++) this.removeAttribute(k[l]);
        },
        removeStyle: function (k) {
            var l = this;
            if (l.$.style.removeAttribute) l.$.style.removeAttribute(h.cssStyleToDomStyle(k));
            else l.setStyle(k, '');
            if (!l.$.style.cssText) l.removeAttribute('style');
        },
        setStyle: function (k, l) {
            this.$.style[h.cssStyleToDomStyle(k)] = l;
            return this;
        },
        setStyles: function (k) {
            for (var l in k) this.setStyle(l, k[l]);
            return this;
        },
        setOpacity: function (k) {
            if (f) {
                k = Math.round(k * 100);
                this.setStyle('filter', k >= 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + k + ')');
            } else this.setStyle('opacity', k);
        },
        unselectable: e.gecko ?
        function () {
            this.$.style.MozUserSelect = 'none';
        } : e.webkit ?
        function () {
            this.$.style.uE = 'none';
        } : function () {
            if (f || e.opera) {
                var k = this.$,
                    l, m = 0;
                k.unselectable = 'on';
                while (l = k.all[m++]) switch (l.tagName.toLowerCase()) {
                case 'iframe':
                case 'textarea':
                case 'input':
                case 'select':
                    break;
                default:
                    l.unselectable = 'on';
                }
            }
        },
        vr: function () {
            var k = this;
            while (k.getName() != 'html') {
                if (k.getComputedStyle('position') != 'static') return k;
                k = k.getParent();
            }
            return null;
        },
        ir: function (k) {
            var F = this;
            var l = 0,
                m = 0,
                n = F.getDocument().bH(),
                o = F.getDocument().$.compatMode == 'BackCompat',
                p = F.getDocument();
            if (document.documentElement.getBoundingClientRect) {
                var q = F.$.getBoundingClientRect(),
                    r = p.$,
                    s = r.documentElement,
                    t = s.clientTop || n.$.clientTop || 0,
                    u = s.clientLeft || n.$.clientLeft || 0,
                    v = true;
                if (f) {
                    var w = p.gT().contains(F),
                        x = p.bH().contains(F);
                    v = o && x || !o && w;
                }
                if (v) {
                    l = q.left + (!o && s.scrollLeft || n.$.scrollLeft);
                    l -= u;
                    m = q.top + (!o && s.scrollTop || n.$.scrollTop);
                    m -= t;
                }
            } else {
                var y = F,
                    z = null,
                    A;
                while (y && !(y.getName() == 'body' || y.getName() == 'html')) {
                    l += y.$.offsetLeft - y.$.scrollLeft;
                    m += y.$.offsetTop - y.$.scrollTop;
                    if (!y.equals(F)) {
                        l += y.$.clientLeft || 0;
                        m += y.$.clientTop || 0;
                    }
                    var B = z;
                    while (B && !B.equals(y)) {
                        l -= B.$.scrollLeft;
                        m -= B.$.scrollTop;
                        B = B.getParent();
                    }
                    z = y;
                    y = (A = y.$.offsetParent) ? new j(A) : null;
                }
            }
            if (k) {
                var C = F.aU(),
                    D = k.aU();
                if (!C.equals(D) && C.$.frameElement) {
                    var E = new j(C.$.frameElement).ir(k);
                    l += E.x;
                    m += E.y;
                }
            }
            if (!document.documentElement.getBoundingClientRect) if (e.gecko && !o) {
                l += F.$.clientLeft ? 1 : 0;
                m += F.$.clientTop ? 1 : 0;
            }
            return {
                x: l,
                y: m
            };
        },
        scrollIntoView: function (k) {
            var q = this;
            var l = q.aU(),
                m = l.eR().height,
                n = m * -1;
            if (k) n += m;
            else {
                n += q.$.offsetHeight || 0;
                n += parseInt(q.getComputedStyle('marginBottom') || 0, 10) || 0;
            }
            var o = q.ir();
            n += o.y;
            n = n < 0 ? 0 : n;
            var p = l.hV().y;
            if (n > p || n < p - m) l.$.scrollTo(0, n);
        },
        bR: function (k) {
            var l = this;
            switch (k) {
            case a.eV:
                l.addClass('cke_on');
                l.removeClass('cke_off');
                l.removeClass('cke_disabled');
                break;
            case a.aY:
                l.addClass('cke_disabled');
                l.removeClass('cke_off');
                l.removeClass('cke_on');
                break;
            default:
                l.addClass('cke_off');
                l.removeClass('cke_on');
                l.removeClass('cke_disabled');
                break;
            }
        },
        getFrameDocument: function () {
            var k = this.$;
            try {
                k.contentWindow.document;
            } catch (l) {
                k.src = k.src;
                if (f && e.version < 7) window.showModalDialog('javascript:document.write("<script>window.setTimeout(function(){window.close();},50);</script>")');
            }
            return k && new i(k.contentWindow.document);
        },
        qw: function (k, l) {
            var r = this;
            var m = r.$.attributes;
            l = l || {};
            for (var n = 0; n < m.length; n++) {
                var o = m[n];
                if (o.specified || f && o.nodeValue && o.nodeName.toLowerCase() == 'value') {
                    var p = o.nodeName;
                    if (p in l) continue;
                    var q = r.getAttribute(p);
                    if (q === null) q = o.nodeValue;
                    k.setAttribute(p, q);
                }
            }
            if (r.$.style.cssText !== '') k.$.style.cssText = r.$.style.cssText;
        },
        renameNode: function (k) {
            var n = this;
            if (n.getName() == k) return;
            var l = n.getDocument(),
                m = new j(k, l);
            n.qw(m);
            n.jg(m);
            n.$.parentNode.replaceChild(m.$, n.$);
            m.$.dj = n.$.dj;
            n.$ = m.$;
        },
        aC: function (k) {
            var l = this.$;
            if (!k.slice) l = l.childNodes[k];
            else while (k.length > 0 && l) l = l.childNodes[k.shift()];
            return l ? new g.bi(l) : null;
        },
        iu: function () {
            return this.$.childNodes.length;
        },
        hX: function () {
            this.on('contextmenu', function (k) {
                if (!k.data.bK().hasClass('cke_enable_context_menu')) k.data.preventDefault();
            });
        },
        'toString': function () {
            return this.getName() + '#' + this.dS() + '.' + this.getAttribute('class');
        }
    });
    a.command = function (k, l) {
        this.pW = [];
        this.exec = function (m) {
            if (this.bu == a.aY) return false;
            if (l.oD) k.focus();
            return l.exec.call(this, k, m) !== false;
        };
        h.extend(this, l, {
            iH: {
                he: 1
            },
            oD: true,
            bu: a.aS
        });
        a.event.call(this);
    };
    a.command.prototype = {
        enable: function () {
            var k = this;
            if (k.bu == a.aY) k.bR(!k.vf || typeof k.lJ == 'undefined' ? a.aS : k.lJ);
        },
        disable: function () {
            this.bR(a.aY);
        },
        bR: function (k) {
            var l = this;
            if (l.bu == k) return false;
            l.lJ = l.bu;
            l.bu = k;
            l.oW('bu');
            return true;
        },
        rJ: function () {
            var k = this;
            if (k.bu == a.aS) k.bR(a.eV);
            else if (k.bu == a.eV) k.bR(a.aS);
        }
    };
    a.event.du(a.command.prototype, true);
    a.config = {
        customConfig: a.getUrl('config.js'),
        connectorLanguage: 'php',
        language: '',
        defaultLanguage: 'en',
        pO: '',
        height: 400,
        plugins: 'foldertree,folder,filebrowser,container,connector,resource,toolbar,formpanel,filesview,status,contextmenu,uploadform,keystrokes,dragdrop,basket,dialog,tools,resize,help',
        extraPlugins: '',
        fileIcons: 'ai|avi|bmp|cs|dll|doc|docx|exe|fla|gif|jpg|js|mdb|mp3|ogg|pdf|ppt|pptx|rdp|swf|swt|txt|vsd|xls|xlsx|xml|zip',
        removePlugins: '',
        tabIndex: 0,
        theme: 'default',
        skin: 'kama',
        width: '100%',
        baseFloatZIndex: 10000,
        directDownload: false,
        log: false,
        logStackTrace: false,
        rememberLastFolder: true,
        startupPath: '',
        startupFolderExpanded: true,
        selectActionFunction: null,
        selectActionData: null,
        selectThumbnailActionFunction: null,
        selectThumbnailActionData: null,
        disableThumbnailSelection: false,
        thumbsUrl: null,
        thumbsDirectAccess: false,
        imagesMaxWidth: 0,
        imagesMaxHeight: 0,
        selectActionType: 'js',
        resourceType: null,
        disableHelpButton: false
    };
    CKFinder.config = a.config;
    var k = a.config;
    a.dU = function (l, m) {
        this.rG = l;
        this.message = m;
    };
    a.fs = function (l) {
        if (l.fs) return l.fs;
        this.hasFocus = false;
        this._ = {
            application: l
        };
        return this;
    };
    a.fs.prototype = {
        focus: function () {
            var m = this;
            if (m._.fW) clearTimeout(m._.fW);
            if (!m.hasFocus) {
                if (a.eq) a.eq.fs.ly();
                var l = m._.application;
                l.container.getFirst().addClass('cke_focus');
                m.hasFocus = true;
                l.oW('focus');
            }
        },
        blur: function () {
            var l = this;
            if (l._.fW) clearTimeout(l._.fW);
            l._.fW = setTimeout(function () {
                delete l._.fW;
                l.ly();
            }, 100);
        },
        ly: function () {
            if (this.hasFocus) {
                var l = this._.application;
                l.container.getFirst().removeClass('cke_focus');
                this.hasFocus = false;
                l.oW('blur');
            }
        }
    };
    (function () {
        var l = {};
        a.lang = {
            ko: {
                cs: 1,
                de: 1,
                en: 1,
                'es-mx': 1,
                hu: 1,
                lv: 1,
                nl: 1,
                no: 1,
                'pt-br': 1,
                sk: 1,
                sv: 1,
                'zh-tw': 1,
                da: 1,
                el: 1,
                es: 1,
                fr: 1,
                it: 1,
                nb: 1,
                nn: 1,
                pl: 1,
                ru: 1,
                sl: 1,
                'zh-cn': 1
            },
            load: function (m, n, o) {
                if (!m || !a.lang.ko[m]) m = this.jV(n, m);
                if (!this[m]) a.ec.load(a.getUrl('lang/' + m + '.js'), function () {
                    o(m, CKFinder.lang[m]);
                }, this);
                else o(m, this[m]);
            },
            jV: function (m, n) {
                var o = this.ko;
                n = n || navigator.userLanguage || navigator.language;
                var p = n.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),
                    q = p[1],
                    r = p[2];
                if (o[q + '-' + r]) q = q + '-' + r;
                else if (!o[q]) q = null;
                a.lang.jV = q ?
                function () {
                    return q;
                } : function (s) {
                    return s;
                };
                return q || m;
            }
        };
    })();
    (function () {
        a.log = function () {
            if (!k.log && !window.CKFINDER_LOG) return;
            var l = '';
            for (var m = 0; m < arguments.length; m++) {
                var n = arguments[m];
                if (!n) continue;
                if (l) l += '; ';
                switch (typeof n) {
                case 'function':
                    var o = /function (\w+?)\(/.exec(n.toString());
                    o = o ? o[1] : 'anonymous func';
                    l += o;
                    break;
                default:
                    l += n ? n.toString() : '';
                }
            }
            a._.log.push(l);
            if (typeof window.console == 'object') if (!console.log.apply) console.log(l);
            else console.log.apply(console, arguments);
        };
        a.ba = function (l) {
            if (k.logStackTrace) a.log('[EXCEPTION] ' + l.toString());
            return l;
        };
        a.mZ = function (l) {
            var m = '';
            for (var n = 0; n < a._.log.length; n++) m += n + 1 + '. ' + a._.log[n] + '\n';
            return m;
        };
        a._.log = [];
    })();
    a.ec = (function () {
        var l = {},
            m = {};
        return {
            load: function (n, o, p, q, r) {
                var s = typeof n == 'string';
                if (s) n = [n];
                if (!p) p = a;
                var t = n.length,
                    u = [],
                    v = [],
                    w = function (B) {
                        if (o) if (s) o.call(p, B);
                        else o.call(p, u, v);
                    };
                if (t === 0) {
                    w(true);
                    return;
                }
                var x = function (B, C) {
                    (C ? u : v).push(B);
                    if (--t <= 0) w(C);
                },
                    y = function (B, C) {
                        l[B] = 1;
                        var D = m[B];
                        delete m[B];
                        for (var E = 0; E < D.length; E++) D[E](B, C);
                    },
                    z = function (B) {
                        if (q !== true && l[B]) {
                            x(B, true);
                            return;
                        }
                        var C = m[B] || (m[B] = []);
                        C.push(x);
                        if (C.length > 1) return;
                        var D = new j('script');
                        D.setAttributes({
                            type: 'text/javascript',
                            src: B
                        });
                        if (o) if (f) D.$.onreadystatechange = function () {
                            if (D.$.readyState == 'loaded' || D.$.readyState == 'complete') {
                                D.$.onreadystatechange = null;
                                a.log('[LOADED] ' + B);
                                y(B, true);
                            }
                        };
                        else {
                            D.$.onload = function () {
                                setTimeout(function () {
                                    a.log('[LOADED] ' + B);
                                    y(B, true);
                                }, 0);
                            };
                            D.$.onerror = function () {
                                y(B, false);
                            };
                        }
                        D.appendTo(r ? r : a.document.eD());
                    };
                for (var A = 0; A < t; A++) z(n[A]);
            },
            uq: function (n) {
                var o = new j('script');
                o.setAttribute('type', 'text/javascript');
                o.appendText(n);
                o.appendTo(a.document.eD());
            }
        };
    })();
    a.fQ = function (l, m) {
        var n = this;
        n.basePath = l;
        n.fileName = m;
        n.bX = {};
        n.loaded = {};
        n.jn = {};
        n._ = {
            rZ: {}
        };
    };
    a.fQ.prototype = {
        add: function (l, m) {
            if (this.bX[l]) throw '[CKFINDER.fQ.add] The resource name "' + l + '" is already bX.';
            this.bX[l] = m || {};
        },
        eB: function (l) {
            return this.bX[l] || null;
        },
        getPath: function (l) {
            var m = this.jn[l];
            return a.getUrl(m && m.dir || this.basePath + l + '/');
        },
        pi: function (l) {
            var m = this.jn[l];
            return a.getUrl(this.getPath(l) + (m && m.file || this.fileName + '.js'));
        },
        tR: function (l, m, n) {
            l = l.split(',');
            for (var o = 0; o < l.length; o++) {
                var p = l[o];
                this.jn[p] = {
                    dir: m,
                    file: n
                };
            }
        },
        load: function (l, m, n) {
            if (!h.isArray(l)) l = l ? [l] : [];
            var o = this.loaded,
                p = this.bX,
                q = [],
                r = {},
                s = {};
            for (var t = 0; t < l.length; t++) {
                var u = l[t];
                if (!u) continue;
                if (!o[u] && !p[u]) {
                    var v = this.pi(u);
                    q.push(v);
                    if (!(v in r)) r[v] = [];
                    r[v].push(u);
                } else s[u] = this.eB(u);
            }
            a.ec.load(q, function (w, x) {
                if (x.length) throw '[CKFINDER.fQ.load] Resource name "' + r[x[0]].join(',') + '" was not found at "' + x[0] + '".';
                for (var y = 0; y < w.length; y++) {
                    var z = r[w[y]];
                    for (var A = 0; A < z.length; A++) {
                        var B = z[A];
                        s[B] = this.eB(B);
                        o[B] = 1;
                    }
                }
                m.call(n, s);
            }, this);
        }
    };
    a.plugins = new a.fQ('plugins/', 'plugin');
    var l = a.plugins;
    l.load = h.override(l.load, function (m) {
        return function (n, o, p) {
            var q = {},
                r = function (s) {
                    m.call(this, s, function (t) {
                        h.extend(q, t);
                        var u = [];
                        for (var v in t) {
                            var w = t[v],
                                x = w && w.bM;
                            if (x) for (var y = 0; y < x.length; y++) {
                                if (!q[x[y]]) u.push(x[y]);
                            }
                        }
                        if (u.length) r.call(this, u);
                        else {
                            for (v in q) {
                                w = q[v];
                                if (w.onLoad && !w.onLoad.qK) {
                                    w.onLoad();
                                    w.onLoad.qK = 1;
                                }
                            }
                            if (o) o.call(p || window, q);
                        }
                    }, this);
                };
            r.call(this, n);
        };
    });
    l.rX = function (m, n, o) {


        var p = this.eB(m);
        p.lang[n] = o;
    };
    (function () {
        var m = {},
            n = function (o, p) {
                var q = function () {
                    m[o] = 1;
                    p();
                },
                    r = new j('img');
                r.on('load', q);
                r.on('error', q);
                r.setAttribute('src', o);
            };
        a.rw = {
            load: function (o, p) {
                var q = o.length,
                    r = function () {
                        if (--q === 0) p();
                    };
                for (var s = 0; s < o.length; s++) {
                    var t = o[s];
                    if (m[t]) r();
                    else n(t, r);
                }
            }
        };
    })();
    a.skins = (function () {
        var m = {},
            n = {},
            o = {},
            p = function (q, r, s, t) {
                var u = m[r];
                if (!q.skin) {
                    q.skin = u;
                    if (u.bz) u.bz(q);
                }
                var v = function (D) {
                    for (var E = 0; E < D.length; E++) D[E] = a.getUrl(o[r] + D[E]);
                };
                if (!n[r]) {
                    var w = u.ls;
                    if (w && w.length > 0) {
                        v(w);
                        a.rw.load(w, function () {
                            n[r] = 1;
                            p(q, r, s, t);
                        });
                        return;
                    }
                    n[r] = 1;
                }
                s = u[s];
                var x = 0;
                if (s) {
                    if (!s.iB) s.iB = [];
                    else if (s.iB[q.name]) x = 1;
                } else x = 1;
                if (x) t && t();
                else {
                    if (s.eb === undefined) s.eb = [];
                    if (s.eb[q.name] === undefined) s.eb[q.name] = [];
                    var y = s.eb[q.name];
                    y.push(t);
                    if (y.length > 1) return;
                    var z = !s.css || !s.css.length,
                        A = !s.js || !s.js.length,
                        B = function () {
                            if (z && A) {
                                s.iB[q.name] = 1;
                                for (var D = 0; D < y.length; D++) {
                                    if (y[D]) y[D]();
                                }
                            }
                        };
                    if (!z) {
                        if (!s.rr) {
                            v(s.css);
                            s.rr = 1;
                        }
                        if (s.qx) for (var C = 0; C < s.css.length; C++) a.oC.pb(s.css[C]);
                        else q.on('bW', function (D) {
                            if (D.data.space == 'head') for (var E = 0; E < s.css.length; E++) D.data.html += "<link rel='stylesheet' href='" + s.css[E] + "'>\n";
                            D.aF();
                        });
                        z = 1;
                    }
                    if (!A) {
                        v(s.js);
                        q.ec.load(s.js, function () {
                            A = 1;
                            B();
                        });
                    }
                    B();
                }
            };
        return {
            add: function (q, r) {
                m[q] = r;
                r.fh = o[q] || (o[q] = a.getUrl('skins/' + q + '/'));
            },
            loaded: m,
            load: function (q, r, s) {
                var t = q.gd,
                    u = q.fh;
                if (m[t]) {
                    p(q, t, r, s);
                    var v = m[t];
                } else {
                    o[t] = u;
                    a.ec.load(u + 'skin.js', function () {
                        p(q, t, r, s);
                    });
                }
            }
        };
    })();
    a.gc = new a.fQ('gc/', 'theme');
    a.bY = function (m) {
        if (m.bY) return m.bY;
        this._ = {
            jZ: {},
            items: {},
            application: m
        };
        return this;
    };
    var m = a.bY;
    m.prototype = {
        add: function (n, o, p) {
            this._.items[n] = {
                type: o,
                command: p.command || null,
                mp: Array.prototype.slice.call(arguments, 2)
            };
        },
        create: function (n) {
            var s = this;
            var o = s._.items[n],
                p = o && s._.jZ[o.type],
                q = o && o.command && s._.application.cS(o.command),
                r = p && p.create.apply(s, o.mp);
            if (q) q.pW.push(r);
            return r;
        },
        kd: function (n, o) {
            this._.jZ[n] = o;
        }
    };
    (function () {
        var n = 0,
            o = function () {
                var x = 'ckfinder' + ++n;
                return a.instances && a.instances[x] ? o() : x;
            },
            p = {},
            q = function (x) {
                var y = x.config.customConfig;
                if (!y) return false;
                var z = p[y] || (p[y] = {});
                if (z.gg) {
                    z.gg.call(x, x.config);
                    if (x.config.customConfig == y || !q(x)) x.cr('customConfigLoaded');
                } else a.ec.load(y, function () {
                    if (CKFinder.customConfig) z.gg = CKFinder.customConfig;
                    else z.gg = function () {};
                    q(x);
                });
                return true;
            },
            r = function (x, y) {
                x.on('customConfigLoaded', function () {
                    if (y) {
                        if (y.on) for (var z in y.on) x.on(z, y.on[z]);
                        h.extend(x.config, y, true);
                        delete x.config.on;
                    }
                    s(x);
                });
                if (y && y.customConfig != undefined) x.config.customConfig = y.customConfig;
                if (!q(x)) x.cr('customConfigLoaded');
            },
            s = function (x) {
                var y = x.config.skin.split(','),
                    z = y[0],
                    A = a.getUrl(y[1] || 'skins/' + z + '/');
                x.gd = z;
                x.fh = A;
                x.iy = 'cke_skin_' + z + ' skin_' + z;
                x.qn = x.ox();
                x.on('uiReady', function () {
                    x.document.aU().on('lW', function () {
                        h.setCookie('CKFinder_UTime', Math.round(new Date().getTime() / 1000), true);
                        h.setCookie('CKFinder_UId', encodeURIComponent(x.id ? x.id : location.href), true);
                    });
                });
                x.cr('configLoaded');
                t(x);
            },
            t = function (x) {
                a.lang.load(x.config.language, x.config.defaultLanguage, function (y, z) {
                    x.langCode = y;
                    x.lang = h.prototypedCopy(z);
                    x.lB = (function () {
                        var A = "['" + x.lang.DateAmPm.join("','") + "']",
                            B = x.lang.DateTime.replace(/dd|mm|yyyy|hh|HH|MM|aa|d|m|yy|h|H|M|a/g, function (C) {
                                var D;
                                switch (C) {
                                case 'd':
                                    D = "day.replace(/^0/,'')";
                                    break;
                                case 'dd':
                                    D = 'day';
                                    break;
                                case 'm':
                                    D = "month.replace(/^0/,'')";
                                    break;
                                case 'mm':
                                    D = 'month';
                                    break;
                                case 'yy':
                                    D = 'year.substr(2)';
                                    break;
                                case 'yyyy':
                                    D = 'year';
                                    break;
                                case 'H':
                                    D = "hour.replace(/^0/,'')";
                                    break;
                                case 'HH':
                                    D = 'hour';
                                    break;
                                case 'h':
                                    D = "( hour < 12 ? hour : ( ( hour - 12 ) + 100 ).toString().substr( 1 ) ).replace(/^0/,'')";
                                    break;
                                case 'hh':
                                    D = '( hour < 12 ? hour : ( ( hour - 12 ) + 100 ).toString().substr( 1 ) )';
                                    break;
                                case 'M':
                                    D = "minute.replace(/^0/,'')";
                                    break;
                                case 'MM':
                                    D = 'minute';
                                    break;
                                case 'a':
                                    D = A + '[ hour < 12 ? 0 : 1 ].charAt(0)';
                                    break;
                                case 'aa':
                                    D = A + '[ hour < 12 ? 0 : 1 ]';
                                    break;
                                default:
                                    D = "'" + C + "'";
                                }
                                return "'," + D + ",'";
                            });
                        B = "'" + B + "'";
                        B = B.replace(/('',)|,''$/g, '');
                        return new Function('day', 'month', 'year', 'hour', 'minute', 'return [' + B + "].join('');");
                    })();
                    if (e.gecko && e.version < 10900 && x.lang.dir == 'rtl') x.lang.dir = 'ltr';
                    u(x);
                });
            },
            u = function (x) {
                var y = x.config,
                    z = y.plugins,
                    A = y.extraPlugins,
                    B = y.removePlugins;
                if (A) {
                    var C = new RegExp('(?:^|,)(?:' + A.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                    z = z.replace(C, '');
                    z += ',' + A;
                }
                if (B) {
                    C = new RegExp('(?:^|,)(?:' + B.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                    z = z.replace(C, '');
                }
                l.load(z.split(','), function (D) {
                    var E = [],
                        F = [],
                        G = [];
                    x.plugins = D;
                    for (var H in D) {
                        var I = D[H],
                            J = I.lang,
                            K = l.getPath(H),
                            L = null;
                        D[H].name = H;
                        I.pathName = K;
                        if (J) {
                            L = h.indexOf(J, x.langCode) >= 0 ? x.langCode : J[0];
                            if (!I.lang[L]) G.push(a.getUrl(K + 'lang/' + L + '.js'));
                            else {
                                h.extend(x.lang, I.lang[L]);
                                L = null;
                            }
                        }
                        F.push(L);
                        E.push(I);
                    }
                    a.ec.load(G, function () {
                        var M = ['eK', 'bz', 'gr'];
                        for (var N = 0; N < M.length; N++) for (var O = 0; O < E.length; O++) {
                            var P = E[O];
                            if (N === 0 && F[O] && P.lang) h.extend(x.lang, P.lang[F[O]]);
                            if (P[M[N]]) {
                                a.log('[PLUGIN] ' + P.name + '.' + M[N]);
                                P[M[N]](x);
                            }
                        }
                        x.oW('pluginsLoaded');
                        v(x);
                    });
                });
            },
            v = function (x) {
                a.skins.load(x, 'application', function () {
                    a.skins.load(x, 'host', function () {
                        w(x);
                    });
                });
            },
            w = function (x) {
                var y = x.config.theme;
                a.gc.load(y, function () {
                    var z = x.theme = a.gc.eB(y);
                    z.pathName = a.gc.getPath(y);
                    x.oW('themeAvailable');
                });
            };
        a.application.prototype.iI = function () {
            var x = j.eB(this._.ax),
                y = this._.kw;
            delete this._.ax;
            delete this._.kw;
            this._.ky = {};
            this._.gS = [];
            this.ax = x;
            this.document = null;
            this.rQ = {};
            this.name = o();
            if (this.name in a.instances) throw '[CKFINDER.application] The instance "' + this.name + '" already exists.';
            this.config = h.prototypedCopy(k);
            this.bY = new m(this);
            this.fs = new a.fs(this);
            this.aL = {};
            this.aG = {};
            this.id = this.config.id;
            this.on('uiReady', function (z) {
                this.document.aU().on('lW', this.fH, this);
            }, this);
            this.on('configLoaded', function (z) {
                this.cg = new d(this, y.callback);
            }, this);
            r(this, y);
            a.oW('instanceCreated', null, this);
        };
    })();
    h.extend(a.application.prototype, {
        bD: function (n, o) {
            return this._.ky[n] = new a.command(this, o);
        },
        fH: function (n) {
            var o = this;
            if (!n) o.hS();
            o.theme.fH(o);
            o.oW('fH');
            a.remove(o);
        },
        execCommand: function (n, o) {
            a.log('[COMMAND] ' + n);
            var p = this.cS(n),
                q = {
                    name: n,
                    rm: o,
                    command: p
                };
            if (p && p.bu != a.aY) if (this.oW('beforeCommandExec', q) !== true) {
                q.returnValue = p.exec(q.rm);
                if (!p.async && this.oW('afterCommandExec', q) !== true) return q.returnValue;
            }
            return false;
        },
        cS: function (n) {
            return this._.ky[n];
        },
        ox: function () {
            var n = Math.round(new Date().getTime() / 1000),
                o = h.getCookie('CKFinder_UTime'),
                p = decodeURIComponent(h.getCookie('CKFinder_UId'));
            if (p && o && p == (this.id ? this.id : location.href) && Math.abs(n - o) < 5) return 1;
            return 0;
        },
        bs: ''
    });
    (function () {
        var n = '';
        for (var o = 49; o < 58; o++) n += String.fromCharCode(o);
        for (o = 65; o < 91; o++) {
            if (o == 73 || o == 79) continue;
            n += String.fromCharCode(o);
        }
        a.bs = n;
        a.hf = "\154\x6f";
        a.hg = "\150\157";
    })();
    a.on('loaded', function () {
        var n = a.application.eb;
        if (n) {
            delete a.application.eb;
            for (var o = 0; o < n.length; o++) n[o].iI();
        }
    });
    delete a.dO;
    a.instances = {};
    a.document = new i(document);
    a.oC = a.document.aU().$ != a.document.aU().$.top ? new i(a.document.aU().$.top.document) : a.document;
    a.add = function (n) {
        a.instances[n.name] = n;
        a.jt = n;
        n.on('focus', function () {
            if (a.eq != n) {
                a.eq = n;
                a.oW('eq');
            }
        });
        n.on('blur', function () {
            if (a.eq == n) {
                a.eq = null;
                a.oW('eq');
            }
        });
    };
    a.remove = function (n) {
        delete a.instances[n.name];
    };
    a.aL = {};
    a.eV = 1;
    a.aS = 2;
    a.aY = 0;
    a.bF = '';
    (function () {
        function n(q, r) {
            return q + '.' + (r.name || r || q);
        };
        a.aG = {
            bX: {},
            hi: function (q, r, s) {
                var t = n(q, r);
                if (this.bX[t] !== undefined) throw '[CKFINDER] Widget ' + t + ' already bX!';
                a.log('[WIDGET] bX ' + t);
                this.bX[t] = new p(t, s);
                return this.bX[t];
            },
            bz: function (q, r, s, t, u) {
                var v = n(r, s),
                    w = this.bX[v],
                    x = h.deepCopy(w.hF),
                    y = function (B, C, D) {
                        this.app = B;
                        this.eh = C instanceof j ? C : new j(C);
                        this.hF = x ? h.extend(x, D) : D || {};
                        this._ = {};
                        var E = function (H) {
                            this.widget = H;
                        };
                        E.prototype = this.tools;
                        this.tools = new E(this);
                        var F = w.dT;
                        if (F.length) for (var G = 0; G < F.length; G++) F[G].call(this, B, this);
                    };
                y.prototype = w;
                var z = new y(q, t, u);
                for (var A in z.fw) z.gA(A);
                if (!q.aG[v]) q.aG[v] = [];
                q.aG[v].push(z);
                a.log('[WIDGET] instanced ' + v);
                return z;
            }
        };
        var o = {
            click: 1,
            mouseover: 1,
            mouseout: 1,
            focus: 1,
            blur: 1,
            submit: 1,
            dblclick: 1,
            mousedown: 1,
            mouseup: 1,
            mousemove: 1,
            keypress: 1,
            keydown: 1,
            keyup: 1,
            load: 1,
            lW: 1,
            abort: 1,
            error: 1,
            resize: 1,
            scroll: 1,
            select: 1,
            change: 1,
            reset: 1
        },
            p = function (q, r) {
                var s = this;
                s.id = q;
                s.fw = {};
                s.hF = r || {};
                s.dT = [];
                s.tools = new s.tools(s);
            };
        p.prototype = {
            gA: function (q) {
                var v = this;
                a.log('[WIDGET] Enabling behavior ' + q);
                var r = v.fw[q];
                if (!r) return;
                var s = v;
                for (var t = 0; t < r.cC.length; t++) {
                    var u = r.cC[t];
                    if (o[u]) v.eh.on(u, r.fO, s);
                    else {
                        v.on(u, r.fO, s);
                        v.app.on(u, r.fO, s);
                    }
                }
            },
            ke: function (q) {
                a.log('[WIDGET] Disabling behavior ' + q);
                var r = this.fw[q];
                if (!r) return;
                for (var s = 0; s < r.cC.length; s++) {
                    var t = r.cC[s];
                    if (o[t]) this.eh.aF(t, r.fO);
                    else this.aF(t, r.fO);
                }
            },
            bh: function (q, r, s) {
                if (!h.isArray(r)) r = [r];
                this.fw[q] = {
                    cC: r,
                    fO: s
                };
                if (this.eh) this.gA(q);
            },
            removeBehavior: function (q) {
                delete this.fw[q];
            },
            ur: function () {
                return this.fw;
            },
            bn: function () {
                return this.eh;
            },
            oE: function () {
                return this.hF;
            },
            data: function () {
                return this.hF;
            },
            tools: function () {}
        };
        p.prototype.tools.prototype = {
            kg: function (q) {
                if (q.target == this.widget.eh) return 1;
            }
        };
        a.event.du(p.prototype);
    })();
    a.xml = function (n) {
        var o = null;
        if (typeof n == 'object') o = n;
        else {
            var p = (n || '').replace(/&nbsp;/g, '\xa0');
            if (window.DOMParser) o = new DOMParser().parseFromString(p, 'text/xml');
            else if (window.ActiveXObject) {
                try {
                    o = new ActiveXObject('MSXML2.DOMDocument');
                } catch (q) {
                    try {
                        o = new ActiveXObject('Microsoft.XmlDom');
                    } catch (q) {}
                }
                if (o) {
                    o.async = false;
                    o.uT = false;
                    o.sm = false;
                    o.uo(p);
                }
            }
        }
        this.mq = o;
    };
    a.xml.prototype = {
        selectSingleNode: function (n, o) {
            var p = this.mq;
            if (o || (o = p)) if (f || o.selectSingleNode) return o.selectSingleNode(n);
            else if (p.evaluate) {
                var q = p.evaluate(n, o, null, 9, null);
                return q && q.singleNodeValue || null;
            }
            return null;
        },
        selectNodes: function (n, o) {
            var p = this.mq,
                q = [];
            if (o || (o = p)) if (f || o.selectNodes) return o.selectNodes(n);
            else if (p.evaluate) {
                var r = p.evaluate(n, o, null, 5, null);
                if (r) {
                    var s;
                    while (s = r.iterateNext()) q.push(s);
                }
            }
            return q;
        },
        vB: function (n, o) {
            var p = this.selectSingleNode(n, o),
                q = [];
            if (p) {
                p = p.firstChild;
                while (p) {
                    if (p.xml) q.push(p.xml);
                    else if (window.XMLSerializer) q.push(new XMLSerializer().serializeToString(p));
                    p = p.nextSibling;
                }
            }
            return q.length ? q.join('') : null;
        }
    };
    (function () {
        var n = {
            address: 1,
            tY: 1,
            dl: 1,
            h1: 1,
            h2: 1,
            h3: 1,
            h4: 1,
            h5: 1,
            h6: 1,
            p: 1,
            pre: 1,
            li: 1,
            dt: 1,
            de: 1
        },
            o = {
                body: 1,
                div: 1,
                table: 1,
                tbody: 1,
                tr: 1,
                td: 1,
                th: 1,
                caption: 1,
                form: 1
            },
            p = function (q) {
                var r = q.getChildren();
                for (var s = 0, t = r.count(); s < t; s++) {
                    var u = r.getItem(s);
                    if (u.type == a.cv && a.ga.um[u.getName()]) return true;
                }
                return false;
            };
        g.qS = function (q) {
            var w = this;
            var r = null,
                s = null,
                t = [],
                u = q;
            while (u) {
                if (u.type == a.cv) {
                    if (!w.qH) w.qH = u;
                    var v = u.getName();
                    if (f && u.$.scopeName != 'HTML') v = u.$.scopeName.toLowerCase() + ':' + v;
                    if (!s) {
                        if (!r && n[v]) r = u;
                        if (o[v]) if (!r && v == 'div' && !p(u)) r = u;
                        else s = u;
                    }
                    t.push(u);
                    if (v == 'body') break;
                }
                u = u.getParent();
            }
            w.block = r;
            w.tX = s;
            w.elements = t;
        };
    })();
    g.qS.prototype = {
        sJ: function (n) {
            var o = this.elements,
                p = n && n.elements;
            if (!p || o.length != p.length) return false;
            for (var q = 0; q < o.length; q++) {
                if (!o[q].equals(p[q])) return false;
            }
            return true;
        }
    };
    g.text = function (n, o) {
        if (typeof n == 'string') n = (o ? o.$ : document).createTextNode(n);
        this.$ = n;
    };
    g.text.prototype = new g.bi();
    h.extend(g.text.prototype, {
        type: a.fl,
        hJ: function () {
            return this.$.nodeValue.length;
        },
        getText: function () {
            return this.$.nodeValue;
        },
        split: function (n) {
            var s = this;
            if (f && n == s.hJ()) {
                var o = s.getDocument().jT('');
                o.kB(s);
                return o;
            }
            var p = s.getDocument(),
                q = new g.text(s.$.splitText(n), p);
            if (e.ie8) {
                var r = new g.text('', p);
                r.kB(q);
                r.remove();
            }
            return q;
        },
        substring: function (n, o) {
            if (typeof o != 'number') return this.$.nodeValue.substr(n);
            else return this.$.nodeValue.substring(n, o);
        }
    });
    g.pa = function (n) {
        n = n || a.document;
        this.$ = n.$.createDocumentFragment();
    };
    h.extend(g.pa.prototype, j.prototype, {
        type: a.om,
        kA: function (n) {
            n = n.$;
            n.parentNode.insertBefore(this.$, n.nextSibling);
        }
    }, true, {
        append: 1,
        pd: 1,
        getFirst: 1,
        dB: 1,
        appendTo: 1,
        jg: 1,
        insertBefore: 1,
        kA: 1,
        replace: 1,
        trim: 1,
        type: 1,
        ltrim: 1,
        rtrim: 1,
        getDocument: 1,
        iu: 1,
        aC: 1,
        getChildren: 1
    });
    (function () {
        function n(r, s) {
            if (this._.end) return null;
            var t, u = this.mk,
                v, w = this.vR,
                x = this.type,
                y = r ? 'getPreviousSourceNode' : 'getNextSourceNode';
            if (!this._.start) {
                this._.start = 1;
                u.trim();
                if (u.collapsed) {
                    this.end();
                    return null;
                }
            }
            if (!r && !this._.kp) {
                var z = u.endContainer,
                    A = z.aC(u.endOffset);
                this._.kp = function (E, F) {
                    return (!F || !z.equals(E)) && (!A || !E.equals(A)) && (E.type != a.cv || E.getName() != 'body');
                };
            }
            if (r && !this._.ka) {
                var B = u.startContainer,
                    C = u.startOffset > 0 && B.aC(u.startOffset - 1);
                this._.ka = function (E, F) {
                    return (!F || !B.equals(E)) && (!C || !E.equals(C)) && (E.type != a.cv || E.getName() != 'body');
                };
            }
            var D = r ? this._.ka : this._.kp;
            if (w) v = function (E, F) {
                if (D(E, F) === false) return false;
                return w(E);
            };
            else v = D;
            if (this.current) t = this.current[y](false, x, v);
            else if (r) {
                t = u.endContainer;
                if (u.endOffset > 0) {
                    t = t.aC(u.endOffset - 1);
                    if (v(t) === false) t = null;
                } else t = v(t) === false ? null : t.hZ(true, x, v);
            } else {
                t = u.startContainer;
                t = t.aC(u.startOffset);
                if (t) {
                    if (v(t) === false) t = null;
                } else t = v(u.startContainer) === false ? null : u.startContainer.hL(true, x, v);
            }
            while (t && !this._.end) {
                this.current = t;
                if (!this.lf || this.lf(t) !== false) {
                    if (!s) return t;
                } else if (s && this.lf) return false;
                t = t[y](false, x, v);
            }
            this.end();
            return this.current = null;
        };

        function o(r) {
            var s, t = null;
            while (s = n.call(this, r)) t = s;
            return t;
        };
        g.gm = h.createClass({
            $: function (r) {
                this.mk = r;
                this._ = {};
            },
            ej: {
                end: function () {
                    this._.end = 1;
                },
                next: function () {
                    return n.call(this);
                },
                previous: function () {
                    return n.call(this, true);
                },
                sC: function () {
                    return n.call(this, false, true) !== false;
                },
                sD: function () {
                    return n.call(this, true, true) !== false;
                },
                uF: function () {
                    return o.call(this);
                },
                uB: function () {
                    return o.call(this, true);
                },
                reset: function () {
                    delete this.current;
                    this._ = {};
                }
            }
        });
        var p = {
            block: 1,
            'list-item': 1,
            table: 1,
            'table-row-group': 1,
            'table-header-group': 1,
            'table-footer-group': 1,
            'table-row': 1,
            'table-column-group': 1,
            'table-column': 1,
            'table-cell': 1,
            'table-caption': 1
        },
            q = {
                hr: 1
            };
        j.prototype.qy = function (r) {
            var s = h.extend({}, q, r || {});
            return p[this.getComputedStyle('display')] || s[this.getName()];
        };
        g.gm.pQ = function (r) {
            return function (s, t) {
                return !(s.type == a.cv && s.qy(r));
            };
        };
        g.gm.us = function () {
            return this.pQ({
                br: 1
            });
        };
        g.gm.tU = function (r) {}, g.gm.tW = function (r, s) {
            function t(u) {
                return u && u.getName && u.getName() == 'span' && u.hasAttribute('_fck_bookmark');
            };
            return function (u) {
                var v, w;
                v = u && !u.getName && (w = u.getParent()) && t(w);
                v = r ? v : v || t(u);
                return s ^ v;
            };
        };
        g.gm.sf = function (r) {
            return function (s) {
                var t = s && s.type == a.fl && !h.trim(s.getText());
                return r ^ t;
            };
        };
    })();
    (function () {
        var n = f && e.version < 7 ? a.basePath + 'images/spacer.gif' : 'about:blank',
            o = j.et('<div style="width:0px;height:0px;position:absolute;left:-10000px;background-image:url(' + n + ')"></div>', a.document);
        o.appendTo(a.document.eD());
        try {
            e.hc = o.getComputedStyle('background-image') == 'none';
        } catch (p) {
            e.hc = false;
        }
        if (e.hc) e.cssClass += ' cke_hc';
        o.remove();
    })();
    l.load(k.pO.split(','), function () {
        a.status = 'loaded';
        a.oW('loaded');
        var n = a._.io;
        if (n) {
            delete a._.io;
            for (var o = 0; o < n.length; o++) a.add(n[o]);
        }
    });
    if (f) try {
        document.execCommand('BackgroundImageCache', false, true);
    } catch (n) {}
    CKFinder.lang.en = {
        appTitle: 'CKFinder',
        common: {
            unavailable: '%1<span class="cke_accessibility">, unavailable</span>',
            confirmCancel: 'Some of the options have been changed. Are you sure to close the dialog?',
            ok: 'OK',
            cancel: 'Cancel',
            confirmationTitle: 'Confirmation',
            messageTitle: 'Information',
            inputTitle: 'Question',
            undo: 'Undo',
            redo: 'Redo',
            skip: 'Skip',
            skipAll: 'Skip all',
            makeDecision: 'What action should be taken?',
            rememberDecision: 'Remember my decision'
        },
        dir: 'ltr',
        HelpLang: 'en',
        LangCode: 'en',
        DateTime: 'm/d/yyyy h:MM aa',
        DateAmPm: ['AM', 'PM'],
        FoldersTitle: 'Folders',
        FolderLoading: 'Loading...',
        FolderNew: 'Please type the new folder name: ',
        FolderRename: 'Please type the new folder name: ',
        FolderDelete: 'Are you sure you want to delete the "%1" folder?',
        FolderRenaming: ' (Renaming...)',
        FolderDeleting: ' (Deleting...)',
        FileRename: 'Please type the new file name: ',
        FileRenameExt: 'Are you sure you want to change the file name extension? The file may become unusable',
        FileRenaming: 'Renaming...',
        FileDelete: 'Are you sure you want to delete the file "%1"?',
        FilesLoading: 'Loading...',
        FilesEmpty: 'Empty folder',
        FilesMoved: 'File %1 moved into %2:%3',
        FilesCopied: 'File %1 copied into %2:%3',
        BasketFolder: 'Basket',
        BasketClear: 'Clear Basket',
        BasketRemove: 'Remove from basket',
        BasketOpenFolder: 'Open parent folder',
        BasketTruncateConfirm: 'Do you really want to remove all files from the basket?',
        BasketRemoveConfirm: 'Do you really want to remove the file "%1" from the basket?',
        BasketEmpty: "No files in the basket, drag'n'drop some.",
        BasketCopyFilesHere: 'Copy Files from Basket',
        BasketMoveFilesHere: 'Move Files from Basket',
        BasketPasteErrorOther: 'File %s error: %e',
        BasketPasteMoveSuccess: 'The following files were moved: %s',
        BasketPasteCopySuccess: 'The following files were copied: %s',
        Upload: 'Upload',
        UploadTip: 'Upload New File',
        Refresh: 'Refresh',
        Settings: 'Settings',
        Help: 'Help',
        HelpTip: 'Help',
        Select: 'Select',
        SelectThumbnail: 'Select Thumbnail',
        View: 'View',
        Download: 'Download',
        NewSubFolder: 'New Subfolder',
        Rename: 'Rename',
        Delete: 'Delete',
        CopyDragDrop: 'Copy file here',
        MoveDragDrop: 'Move file here',
        RenameDlgTitle: 'Rename',
        NewNameDlgTitle: 'New name',
        FileExistsDlgTitle: 'File already exists',
        SysErrorDlgTitle: 'System error',
        FileOverwrite: 'Overwrite',
        FileAutorename: 'Auto-rename',
        OkBtn: 'OK',
        CancelBtn: 'Cancel',
        CloseBtn: 'Close',
        UploadTitle: 'Upload New File',
        UploadSelectLbl: 'Select the file to upload',
        UploadProgressLbl: '(Upload in progress, please wait...)',
        UploadBtn: 'Upload Selected File',
        UploadBtnCancel: 'Cancel',
        UploadNoFileMsg: 'Please select a file gJ your computer',
        UploadNoFolder: 'Please select folder before uploading.',
        UploadNoPerms: 'File upload not allowed.',
        UploadUnknError: 'Error sending the file.',
        UploadExtIncorrect: 'File extension not allowed in this folder.',
        SetTitle: 'Settings',
        SetView: 'View:',
        SetViewThumb: 'Thumbnails',
        SetViewList: 'List',
        SetDisplay: 'Display:',
        SetDisplayName: 'File Name',
        SetDisplayDate: 'Date',
        SetDisplaySize: 'File Size',
        SetSort: 'Sorting:',
        SetSortName: 'by File Name',
        SetSortDate: 'by Date',
        SetSortSize: 'by Size',
        FilesCountEmpty: '<Empty Folder>',
        FilesCountOne: '1 file',
        FilesCountMany: '%1 files',
        Kb: '%1 kB',
        KbPerSecond: '%1 kB/s',
        ErrorUnknown: 'It was not possible to complete the request. (Error %1)',
        Errors: {
            10: 'Invalid command.',
            11: 'The resource type was not specified in the request.',
            12: 'The requested resource type is not valid.',
            102: 'Invalid file or folder name.',
            103: 'It was not possible to complete the request due to authorization restrictions.',
            104: 'It was not possible to complete the request due to file system permission restrictions.',
            105: 'Invalid file extension.',
            109: 'Invalid request.',
            110: 'Unknown error.',
            115: 'A file or folder with the same name already exists.',
            116: 'Folder not found. Please refresh and try again.',
            117: 'File not found. Please refresh the files list and try again.',
            118: 'Source and target paths are equal.',
            201: 'A file with the same name is already available. The uploaded file has been renamed to "%1"',
            202: 'Invalid file',
            203: 'Invalid file. The file size is too big.',
            204: 'The uploaded file is corrupt.',
            205: 'No temporary folder is available for upload in the server.',
            206: 'Upload cancelled for security reasons. The file contains HTML like data.',
            207: 'The uploaded file has been renamed to "%1"',
            300: 'Moving file(s) failed.',
            301: 'Copying file(s) failed.',
            500: 'The file browser is disabled for security reasons. Please contact your system administrator and check the CKFinder configuration file.',
            501: 'The thumbnails support is disabled.'
        },
        ErrorMsg: {
            pg: 'The file name cannot be empty',
            FileExists: 'File %s already exists',
            pU: 'The folder name cannot be empty',
            oP: 'The file name cannot contain any of the following characters: \n\\ / : * ? " < > |',
            pM: 'The folder name cannot contain any of the following characters: \n\\ / : * ? " < > |',
            oo: 'It was not possible to open the file in a new window. Please configure your browser and disable all popup blockers for this site.'
        },
        Imageresize: {
            dialogTitle: 'Resize %s',
            sizeTooBig: 'Cannot set image height or width to a value bigger than the original size (%size).',
            resizeSuccess: 'Image resized successfully.',
            thumbnailNew: 'Create new thumbnail',
            thumbnailSmall: 'Small (%s)',
            thumbnailMedium: 'Medium (%s)',
            thumbnailLarge: 'Large (%s)',
            newSize: 'Set new size',
            width: 'Width',
            height: 'Height',
            invalidHeight: 'Invalid height.',
            invalidWidth: 'Invalid width.',
            invalidName: 'Invalid file name.',
            newImage: 'Create new image',
            noExtensionChange: 'The file extension cannot be changed.',
            imageSmall: 'Source image is too small',
            contextMenuName: 'Resize'
        },
        Fileeditor: {
            save: 'Save',
            fileOpenError: 'Unable to open file.',
            fileSaveSuccess: 'File saved successfully.',
            contextMenuName: 'Edit',
            loadingFile: 'Loading file, please wait...'
        }
    };
    (function () {
        var o = 1,
            p = 2,
            q = 4,
            r = 8,
            s = 16,
            t = 32,
            u = 64,
            v = 128;
        a.aL.Acl = function (w) {
            var x = this;
            if (!w) w = 0;
            x.folderView = (w & o) == o;
            x.folderCreate = (w & p) == p;
            x.folderRename = (w & q) == q;
            x.folderDelete = (w & r) == r;
            x.fileView = (w & s) == s;
            x.fileUpload = (w & t) == t;
            x.fileRename = (w & u) == u;
            x.fileDelete = (w & v) == v;
        };
        l.add('acl');
    })();
    (function () {
        l.add('connector', {
            bM: [],
            bz: function (p) {
                p.on('appReady', function () {
                    p.connector = new a.aL.Connector(p);
                    var q = p.config.resourceType,
                        r = q ? {
                            type: q
                        } : null;
                    p.connector.sendCommand('Init', r, function (s) {
                        if (s.checkError()) return;
                        var t = "\103\x6f\156\156\145\143\x74\x6f\x72\x2f\103\x6f\x6e\x6e\x65\x63\x74\x6f\x72\x49\x6e\x66\x6f\x2f";
                        a.ed = s.selectSingleNode(t + "\x40\163").value;
                        a.bF = s.selectSingleNode(t + "\100\x63").value + '----';
                        p.config.thumbsEnabled = s.selectSingleNode(t + "\100\164\150\165\x6d\x62\x73\x45\x6e\141\142\x6c\145\x64").value == 'true';
                        p.config.thumbsDirectAccess = false;
                        if (p.config.thumbsEnabled) {
                            var u;
                            u = s.selectSingleNode(t + "\100\x74\x68\165\x6d\x62\x73\x55\x72\x6c");
                            if (u) p.config.thumbsUrl = u.value;
                            u = s.selectSingleNode(t + "\x40\x74\x68\165\x6d\142\x73\104\x69\x72\x65\143\x74\101\143\x63\x65\163\163");
                            if (u) p.config.thumbsDirectAccess = u.value == 'true';
                        }
                        p.config.imagesMaxWidth = parseInt(s.selectSingleNode(t + "\x40\151\x6d\147\127\151\144\x74\x68").value, 10);
                        p.config.imagesMaxHeight = parseInt(s.selectSingleNode(t + "\100\151\155\x67\x48\x65\151\x67\150\x74").value, 10);
                        var v = s.selectSingleNode(t + "\x40\160\154\x75\147\151\x6e\163"),
                            w = v && v.value;
                        if (w && w.length) l.load(w.split(','), function (x) {
                            var y = [],
                                z = [],
                                A = [];
                            for (var B in x) {
                                var C = x[B],
                                    D = C.lang,
                                    E = l.getPath(B),
                                    F = null;
                                if (!p.plugins[B]) p.plugins[B] = x[B];
                                else continue;
                                x[B].name = B;
                                C.pathName = E;
                                if (D) {
                                    F = h.indexOf(D, p.langCode) >= 0 ? p.langCode : D[0];
                                    if (!C.lang[F]) A.push(a.getUrl(E + 'lang/' + F + '.js'));
                                    else {
                                        h.extend(p.lang, C.lang[F]);
                                        F = null;
                                    }
                                }
                                z.push(F);
                                y.push(C);
                            }
                            a.ec.load(A, function () {
                                var G = ['eK', 'bz', 'gr'];
                                for (var H = 0; H < G.length; H++) for (var I = 0; I < y.length; I++) {
                                    var J = y[I];
                                    if (H === 0 && z[I] && J.lang) h.extend(p.lang, J.lang[z[I]]);
                                    if (J[G[H]]) {
                                        a.log('[PLUGIN] ' + J.name + '.' + G[H]);
                                        J[G[H]](p);
                                    }
                                }
                                p.cr('uiReady');
                                p.cr('appReady');
                                p.oW('pluginsLoaded', {
                                    step: 2,
                                    jN: p.connector
                                });
                                p.cr('connectorInitialized', {
                                    xml: s
                                });
                            });
                        });
                        else {
                            p.oW('pluginsLoaded', {
                                step: 2,
                                jN: p.connector
                            });
                            p.cr('connectorInitialized', {
                                xml: s
                            });
                        }
                    });
                });
            }
        });
        a.aL.Connector = function (p) {
            this.app = p;
            var q = p.config.connectorLanguage || 'php';
            this.oN = a.basePath + 'core/connector/' + q + '/connector.' + q;
        };
        a.aL.Connector.prototype = {
            ERROR_NONE: 0,
            ERROR_CUSTOMERROR: 1,
            ERROR_INVALIDCOMMAND: 10,
            ERROR_TYPENOTSPECIFIED: 11,
            ERROR_INVALIDTYPE: 12,
            ERROR_INVALIDNAME: 102,
            ERROR_UNAUTHORIZED: 103,
            ERROR_ACCESSDENIED: 104,
            ERROR_INVALIDEXTENSION: 105,
            ERROR_INVALIDREQUEST: 109,
            ERROR_UNKNOWN: 110,
            ERROR_ALREADYEXIST: 115,
            ERROR_FOLDERNOTFOUND: 116,
            ERROR_FILENOTFOUND: 117,
            ERROR_SOURCE_AND_TARGET_PATH_EQUAL: 118,
            ERROR_UPLOADEDFILERENAMED: 201,
            ERROR_UPLOADEDINVALID: 202,
            ERROR_UPLOADEDTOOBIG: 203,
            ERROR_UPLOADEDCORRUPT: 204,
            ERROR_UPLOADEDNOTMPDIR: 205,
            ERROR_UPLOADEDWRONGHTMLFILE: 206,
            ERROR_UPLOADEDINVALIDNAMERENAMED: 207,
            ERROR_MOVE_FAILED: 300,
            ERROR_COPY_FAILED: 301,
            ERROR_CONNECTORDISABLED: 500,
            ERROR_THUMBNAILSDISABLED: 501,
            currentFolderUrl: function () {
                if (this.app.aV) return this.app.aV.getUrl();
            },
            currentType: function () {
                if (this.app.aV) return this.app.aV.type;
            },
            currentTypeHash: function () {
                if (this.app.aV) return a.getResourceType(this.app.aV.type).hash;
            },
            currentResourceType: function () {
                return a.getResourceType(this.currentType());
            },
            sendCommand: function (p, q, r, s, t) {
                var u = this.composeUrl(p, q, s, t),
                    v = this;
                if (r) return a.ajax.loadXml(u, function (w) {
                    w.hy = v.app;
                    r(h.extend(w, o));
                });
                else return a.ajax.loadXml(u);
            },
            sendCommandPost: function (p, q, r, s, t, u) {
                var v = this.composeUrl(p, q, t, u),
                    w = this;
                if (!r) r = {};
                r.CKFinderCommand = true;
                if (s) return a.ajax.loadXml(v, function (x) {
                    x.hy = w.app;
                    s(h.extend(x, o));
                }, this.composeUrlParams(r));
                else return a.ajax.loadXml(v, null, this.composeUrlParams(r));
            },
            composeUrl: function (p, q, r, s) {
                var v = this;
                var t = v.oN + '?command=' + encodeURIComponent(p);
                if (p != 'Init') {
                    var u = '';
                    if (!s) s = v.app.aV;
                    if (r) u = v.app.getResourceType(r).hash;
                    else u = v.app.getResourceType(s.type).hash;
                    t += '&type=' + encodeURIComponent(r || v.app.aV.type) + '&currentFolder=' + encodeURIComponent(s.getPath() || '') + '&langCode=' + v.app.langCode + '&hash=' + u;
                }
                if (q) t += '&' + v.composeUrlParams(q);
                if (v.app.id) t += '&id=' + encodeURIComponent(v.app.id);
                return t;
            },
            composeUrlParams: function (p) {
                if (!p) return '';
                var q = '';
                for (var r in p) {
                    if (q.length) q += '&';
                    q += encodeURIComponent(r) + '=' + encodeURIComponent(p[r]);
                }
                return q;
            }
        };
        var o = {
            checkError: function () {
                var v = this;
                var p = v.getErrorNumber(),
                    q = v.hy.connector;
                if (p == q.ERROR_NONE) return false;
                if (p === -1) return true;
                var r = v.getErrorMessage();
                a.log('[ERROR] ' + p);
                var s;
                if (p == q.ERROR_CUSTOMERROR) s = r;
                else {
                    s = v.hy.lang.Errors[p];
                    if (s) for (var t = 0; t <= arguments.length; t++) {
                        var u = t === 0 ? r : arguments[t - 1];
                        s = s.replace(/%(\d+)/, u);
                    } else s = v.hy.lang.ErrorUnknown.replace(/%1/, p);
                }
                v.hy.msgDialog('', s);
                return p != q.ERROR_UPLOADEDFILERENAMED;
            },
            getErrorNumber: function () {
                var p = this.selectSingleNode && this.selectSingleNode('Connector/Error/@number');
                if (!p) return -1;
                return parseInt(p.value, 10);
            },
            getErrorMessage: function () {
                var p = this.selectSingleNode && this.selectSingleNode('Connector/Error/@text');
                if (!p) return '';
                return p.value;
            }
        };
    })();
    l.add('resource', {
        bM: ['connector'],
        bz: function (o) {
            o.resourceTypes = [];
            o.on('connectorInitialized', function (p) {
                var q = p.data.xml.selectNodes('Connector/ResourceTypes/ResourceType');
                for (var r = 0; r < q.length; r++) {
                    var s = q[r].attributes;
                    o.resourceTypes.push(new a.aL.ResourceType(o, s.getNamedItem('name').value, s.getNamedItem('url').value, s.getNamedItem('hasChildren').value, s.getNamedItem('allowedExtensions').value, s.getNamedItem('deniedExtensions').value, 'Thumbnails', s.getNamedItem('acl').value, s.getNamedItem('hash').value));
                }
                o.cr('resourcesReceived', {
                    hK: o.resourceTypes
                });
            });
            o.getResourceType = function (p) {
                for (var q = 0; q < this.resourceTypes.length; q++) {
                    var r = this.resourceTypes[q];
                    if (r.name == p) return r;
                }
                return null;
            };
        }
    });
    (function () {
        a.aL.ResourceType = function (p, q, r, s, t, u, v, w, x) {
            var y = this;
            y.app = p;
            y.name = q;
            y.url = r;
            y.hasChildren = s === 'true';
            y.defaultView = v;
            y.allowedExtensions = t;
            y.deniedExtensions = u;
            y.oT = o(t);
            y.ms = o(u);
            y.nS = w;
            y.hash = x;
        };
        a.aL.ResourceType.prototype = {
            isExtensionAllowed: function (p) {
                var q = this;
                p = p.toLowerCase();
                return (q.deniedExtensions.length === 0 || !q.ms[p]) && (q.allowedExtensions.length === 0 || !!q.oT[p]);
            },
            getRootFolder: function () {
                for (var p = 0; p < this.app.folders.length; p++) {
                    var q = this.app.folders[p];
                    if (q.isRoot && q.type == this.name) return q;
                }
                return undefined;
            }
        };

        function o(p) {
            var q = {};
            if (p.length > 0) {
                var r = p.toLowerCase().split(',');
                for (var s = 0; s < r.length; s++) q[r[s]] = true;
            }
            return q;
        };
    })();
    (function () {
        var o = {
            iz: /[\\\/:\*\?"<>\|]/
        };
        l.add('folder', {
            bM: ['resource', 'connector', 'acl'],
            bz: function (r) {
                r.folders = [];
                r.aV = null;
                r.on('resourcesReceived', function tx(s) {
                    var t = [],
                        u = s.data.hK;
                    for (var v = 0; v < u.length; v++) {
                        var w = u[v];
                        t.push(new a.aL.Folder(r, w.name, w.name, w.hasChildren, w.nS));
                        t[t.length - 1].isRoot = true;
                    }
                    r.oW('requestAddFolder', {
                        folders: t
                    }, function ud() {
                        var y = r.config.startupPath || '',
                            z = 0,
                            A = '',
                            B = '';
                        if (r.config.rememberLastFolder) {
                            var C = r.id ? 'CKFinder_Path_' + r.id : 'CKFinder_Path';
                            A = decodeURIComponent(h.getCookie(C)) || '';
                        }
                        if (y && !r.qn) {
                            B = y;
                            z = 1;
                        } else if (A) B = A;
                        else if (y) B = y;
                        else if (r.resourceTypes.length) B = r.resourceTypes[0].name + '/';
                        if (B) {
                            a.log('[FOLDER] Opening startup path: ' + B);
                            var D = B.split(':');
                            if (!r.getResourceType(D[0]) || D.length < 2) D = [r.resourceTypes[0].name, '/'];
                            var E = r.aG['foldertree.foldertree'][0];
                            E.tools.jL(D[0], D[1], function getFolderByPathCallback(G) {
                                if (!G) return;
                                a.log('[FOLDER] Opening startup folder: ', G);
                                var H = D[2] == '1' || D[2] === undefined;
                                if (H && r.config.startupFolderExpanded === false) H = 0;
                                E.oW('requestSelectFolder', {
                                    folder: G,
                                    expand: H
                                });
                            });
                        }
                    });
                });
                r.bD('fv', {
                    exec: function (s) {
                        var t = s.aV;
                        if (t) s.fe('', s.lang.FolderDelete.replace('%1', t.name), function () {
                            s.oW('requestProcessingFolder', {
                                folder: t
                            });
                            t.remove();
                        });
                    }
                });
                r.bD('CreateSubFolder', {
                    exec: function (s) {
                        var t = s.aV;
                        if (t) s.hs(s.lang.NewNameDlgTitle, s.lang.FolderRename, '', function (u) {
                            u = h.trim(u);
                            if (u) try {
                                s.oW('requestProcessingFolder', {
                                    folder: t
                                });
                                t.createNewFolder(u);
                            } catch (v) {
                                if (v instanceof a.dU) {
                                    s.oW('requestRepaintFolder', {
                                        folder: t
                                    });
                                    s.msgDialog('', v.message);
                                } else throw v;
                            }
                        });
                    }
                });
                r.bD('RenameFolder', {
                    exec: function (s) {
                        var t = s.aV;
                        if (t) s.hs(s.lang.RenameDlgTitle, s.lang.FolderRename, s.aV.name, function (u) {
                            u = h.trim(u);
                            if (u) try {
                                t.rename(u);
                            } catch (v) {
                                if (v instanceof a.dU) {
                                    s.oW('requestRepaintFolder', {
                                        folder: t
                                    });
                                    s.msgDialog('', v.message);
                                } else throw v;
                            }
                        });
                    }
                });
                if (r.eU) {
                    r.dZ('folder0', 99);
                    r.dZ('folder1', 100);
                    r.dZ('folder2', 101);
                    r.dZ('folder3', 102);
                    r.eU({
                        kl: {
                            label: r.lang.NewSubFolder,
                            command: 'CreateSubFolder',
                            group: 'folder1'
                        },
                        lI: {
                            label: r.lang.Rename,
                            command: 'RenameFolder',
                            group: 'folder1'
                        },
                        removeFolder: {
                            label: r.lang.Delete,
                            command: 'fv',
                            group: 'folder2'
                        }
                    });
                }
            }
        });
        a.aL.Folder = function (r, s, t, u, v) {
            var w = this;
            w.app = r;
            w.type = s || '';
            w.name = t || '';
            w.hasChildren = u == undefined || u === null ? true : !!u;
            w.isRoot = false;
            w.isOpened = false;
            w.parent = null;
            w.isDirty = false;
            w.acl = new a.aL.Acl(v);
            w.index = r.folders.push(w) - 1;
            w.childFolders = null;
        };

        function p(r, s, t, u, v) {
            if (r.childFolders === null) r.childFolders = [];
            var w = new a.aL.Folder(r.app, s, t, u, v);
            w.parent = r;
            w.nh = r.isRoot ? 0 : r.nh + 1;
            r.childFolders.push(w);
            return w;
        };
        a.aL.Folder.prototype = {
            getPath: function () {
                var r = this,
                    s = r.isRoot ? '/' : r.name;
                while (r.parent) {
                    r = r.parent;
                    s = r.isRoot ? '/' + s : r.name + '/' + s;
                }
                return r != this ? s + '/' : s;
            },
            getUrl: function () {
                var r = this,
                    s = '';
                while (r) {
                    s = r.isRoot ? this.app.getResourceType(r.type).url + s : encodeURIComponent(r.name) + '/' + s;
                    r = r.parent;
                }
                return s;
            },
            getUploadUrl: function () {
                return this.app.connector.composeUrl('FileUpload', {}, this.type, this);
            },
            getResourceType: function () {
                return this.app.getResourceType(this.type);
            },
            updateReference: function () {
                var s = this;
                if (s.app.folders[s.index] == s) return s;
                for (var r = 0; r < s.parent.childFolders.length; r++) {
                    if (s.parent.childFolders[r].name == s.name) return s.parent.childFolders[r];
                }
                return undefined;
            },
            getChildren: function (r, s) {
                var t = this,
                    u = t.childFolders;
                if (t.hl && !s) {
                    a.log('[FOLDER] getChildrenLock active, defering callback...');
                    t.app.oW('requestLoadingFolder', {
                        folder: t
                    });
                    var v = 100;
                    setTimeout(function () {
                        if (!t.hl) r(u);
                        else if (v <= 3000) setTimeout(arguments.callee, v *= 2);
                        else {
                            a.log('[FOLDER] TIMEOUT for getChildrenLock defered callback!');
                            t.hl = false;
                            t.getChildren(r);
                        }
                    });
                    return undefined;
                }
                if (u && !t.isDirty && !s) {
                    r(u);
                    return u;
                }
                t.hl = true;
                if (t.isDirty && u) {
                    a.log('[FOLDER] Clearing folder children cache.');
                    for (var w = 0; w < u.length; w++) delete t.app.folders[u[w].index];
                }
                t.app.oW('requestLoadingFolder', {
                    folder: t
                });
                this.app.connector.sendCommand('GetFolders', null, function (x) {
                    if (x.checkError()) {
                        t.app.oW('requestRepaintFolder', {
                            folder: t
                        });
                        return;
                    }
                    var y = x.selectSingleNode('Connector/@resourceType').value;
                    t.hm = true;
                    var z = x.selectNodes('Connector/Folders/Folder'),
                        A = [];
                    t.childFolders = null;
                    for (var B = 0; B < z.length; B++) {
                        var C = z[B].attributes.getNamedItem('name').value,
                            D = z[B].attributes.getNamedItem('hasChildren').value == 'true',
                            E = parseInt(z[B].attributes.getNamedItem('acl').value, 10);
                        A.push(p(t, y, C, D, E));
                    }
                    t.hasChildren = !!z.length;
                    t.isDirty = false;
                    t.hl = null;
                    t.app.oW('requestRepaintFolder', {
                        folder: t
                    });
                    r(A);
                }, t.type, t);
                return null;
            },
            mapLoadedDescendants: function (r) {
                if (!this.childFolders) return;
                for (var s = 0; s < this.childFolders.length; s++) {
                    var t = this.childFolders[s];
                    t.mapLoadedDescendants(r);
                    r(t);
                }
            },
            select: function () {
                this.app.oW('requestSelectFolder', {
                    folder: this
                });
            },
            isSelected: function () {
                return this.app.aV && this == this.app.aV;
            },
            deselect: function () {
                this.app.oW('requestSelectFolder');
            },
            open: function (r) {
                if (r && !this.hm) return;
                this.app.oW('requestExpandFolder', {
                    folder: this
                });
            },
            close: function () {
                this.app.oW('requestExpandFolder', {
                    folder: this,
                    collapse: 1
                });
            },
            hU: function () {
                var r = 1,
                    s = this;
                while (s) {
                    r++;
                    s = s.parent;
                }
                return r;
            },
            toggle: function () {
                var r = this;
                if (!r.hasChildren) return;
                if (r.isOpened) r.close();
                else r.open();
            },
            createNewFolder: function (r) {
                q(r, this.app);
                var s = this;
                s.isDirty = true;
                s.app.connector.sendCommandPost('CreateFolder', {
                    NewFolderName: r
                }, null, function (t) {
                    if (t.checkError()) {
                        s.app.oW('requestRepaintFolder', {
                            folder: s
                        });
                        return;
                    }
                    s.hasChildren = true;
                    s.app.oW('afterCommandExecDefered', {
                        name: 'CreateFolder',
                        ip: s,
                        uv: r
                    });
                }, this.type, this);
            },
            rename: function (r) {
                q(r, this.app);
                var s = this;
                this.app.oW('requestProcessingFolder', {
                    folder: s
                });
                s.parent.isDirty = true;
                if (s.name == r) {
                    s.app.oW('requestRepaintFolder', {
                        folder: s
                    });
                    return;
                }
                s.app.connector.sendCommandPost('RenameFolder', {
                    NewFolderName: r
                }, null, function (t) {
                    if (t.checkError()) {
                        s.app.oW('requestRepaintFolder', {
                            folder: s
                        });
                        return;
                    }
                    s.parent.isDirty = false;
                    s.name = t.selectSingleNode('Connector/RenamedFolder/@newName').value;
                    s.app.oW('requestRepaintFolder', {
                        folder: s
                    });
                }, this.type, this);
            },
            remove: function () {
                var r = this;
                r.deselect();
                r.parent.isDirty = true;
                this.app.oW('requestProcessingFolder', {
                    folder: r
                });
                r.app.connector.sendCommandPost('DeleteFolder', null, null, function (s) {
                    if (s.checkError()) {
                        r.app.oW('requestRepaintFolder', {
                            folder: r
                        });
                        return;
                    }
                    r.app.oW('requestRemoveFolder', {
                        folder: r
                    }, function () {
                        var t = h.indexOf(r.parent.childFolders, r),
                            u = r.index,
                            v = r.parent,
                            w = r.app;
                        v.childFolders[t].mapLoadedDescendants(function (x) {
                            w.folders[x.index].isDeleted = true;
                            delete w.folders[x.index];
                        });
                        v.childFolders.splice(t, 1);
                        w.folders[u].isDeleted = true;
                        delete w.folders[u];
                        if (v.childFolders.length === 0) {
                            v.childFolders = null;
                            v.hasChildren = false;
                        }
                        if (r.releaseDomNodes) r.releaseDomNodes();
                        w.oW('afterCommandExecDefered', {
                            name: 'fv',
                            ip: v,
                            uN: u,
                            folder: r
                        });
                    });
                }, this.type, this);
            },
            'toString': function () {
                return this.getPath();
            }
        };

        function q(r, s) {
            if (!r || r.length === 0) throw new a.dU('name_empty', s.lang.ErrorMsg.pU);
            if (o.iz.test(r)) throw new a.dU('name_invalid_chars', s.lang.ErrorMsg.pM);
            return true;
        };
    })();
    (function () {
        l.add('foldertree', {
            bM: ['folder'],
            onLoad: function tv() {
                o();
                p();
            },
            bz: function tp(v) {
                var w = this;
                v.on('bW', function bW(y) {
                    if (y.data.space == 'sidebar') y.data.html += "<div id='folders_view' class='view widget' tabindex='0'><h2 id='folders_view_label'>" + v.lang.FoldersTitle + '</h2>' + "<div class='folder_tree_wrapper wrapper'>" + "<div class='selection'></div>" + "<ul class='folder_tree no_list' role='tree navigation' aria-labelledby='folders_view_label'>" + '</ul>' + '</div>' + '</div>';
                });
                v.on('uiReady', function nI(y) {
                    var z = v.document.getById('folders_view');
                    z.hX();
                    var A = a.aG.bz(v, 'foldertree', w, z);
                    if (v.bj) {
                        v.bj.lX(z);
                        v.bj.kh(function to(C, D) {
                            if (C.dS() == 'folders_view') return undefined;
                            v.oW('requestSelectFolder', {
                                folder: null
                            });
                            v.oW('requestSelectFolder', {
                                folder: C
                            });
                            var E = v.aV;
                            if (E) {
                                var F = E.acl,
                                    G = E.isRoot,
                                    H = {
                                        kl: F.folderCreate ? a.aS : a.aY,
                                        lI: !G && F.folderRename ? a.aS : a.aY,
                                        removeFolder: !G && F.folderDelete ? a.aS : a.aY
                                    };
                                A.oW('beforeContextMenu', {
                                    bj: H,
                                    folder: E
                                });
                                return H;
                            }
                        }, z);
                    }
                });
            }
        });

        function o() {
            var v = a.aG.hi('foldertree', 'foldertree');
            v.dT.push(function () {
                var x = this.bn();
                if (!x.hasClass('view')) x = x.getParent();
                if (f) {
                    x.$.onfocusin = function () {
                        x.addClass('focus_inside');
                    };
                    x.$.onfocusout = function () {
                        x.removeClass('focus_inside');
                    };
                } else {
                    x.$.addEventListener('focus', function () {
                        x.addClass('focus_inside');
                    }, true);
                    x.$.addEventListener('blur', function () {
                        x.removeClass('focus_inside');
                    }, true);
                }
            });
            v.bh('KeyboardNavigation', ['keydown', 'requestKeyboardNavigation'], function iV(x) {
                var y = this,
                    z = this.tools.cq(x),
                    A = 0;
                if (x.data && x.data.bK) {
                    var B = x.data.bK();
                    A = B.$ == y.bn().$;
                }
                if (!z && !A) return;
                var C = h.extend({}, x.data, {
                    folder: z
                }, true);
                this.oW('jv', C, function jv(E, F) {
                    if (E) return;
                    try {
                        var G = x.data.db();
                        if (A && G >= 37 && G <= 40) {
                            var H = y.app.folders[0];
                            if (H) this.tools.cT(H);
                        } else {
                            var I;
                            if (G == 38) {
                                I = z.liNode();
                                if (I.gE()) {
                                    var J = this.tools.cq(I.cf());
                                    while (J.isOpened && J.hasChildren) {
                                        if (J.childFolders.length) J = J.childFolders[J.childFolders.length - 1];
                                        else break;
                                    }
                                    this.tools.cT(J);
                                } else if (!z.isRoot) this.tools.cT(z.parent);
                            } else if (G == 39 && z.hasChildren) {
                                if (z.isOpened) z.getChildren(function (L) {
                                    y.tools.cT(L[0]);
                                });
                                else this.oW('requestExpandFolder', {
                                    folder: z
                                });
                            } else if (G == 40) {
                                I = z.liNode();
                                if (z.isOpened && z.hasChildren) z.getChildren(function (L) {
                                    y.tools.cT(L[0]);
                                });
                                else if (I.ge()) this.tools.cT(this.tools.cq(I.dG()));
                                else if (!z.isRoot && z.parent)(function (L) {
                                    var M = L.liNode();
                                    if (M.ge()) y.tools.cT(y.tools.cq(M.dG()));
                                    else if (L.parent) arguments.callee(L.parent);
                                })(z.parent);
                            } else if (G == 37) if (z.isOpened) this.oW('requestExpandFolder', {
                                folder: z,
                                collapse: 1
                            });
                            else if (!z.isRoot && z.parent) this.tools.cT(z.parent);
                        }
                        this.oW('successKeyboardNavigation', F);
                        this.oW('afterKeyboardNavigation', F);
                    } catch (L) {
                        L = a.ba(L);
                        this.oW('failedKeyboardNavigation', F);
                        this.oW('afterKeyboardNavigation', F);
                        throw L;
                    }
                });
            });
            v.dT.push(function (x, y) {
                x.on('afterCommandExecDefered', function (z) {
                    if (!z.data) return;
                    var A = z.data.folder;
                    if (z.data.name == 'RemoveFolder') {
                        if (A == y.tools.ew) {
                            y.tools.cT();
                            y.bn().focus();
                        }
                        var B = x.aG['filesview.filesview'][0].tools.folder,
                            C = A == B;
                        A.mapLoadedDescendants(function (D) {
                            if (B == A) C = true;
                        });
                        y.oW('requestSelectFolder', {
                            folder: A.parent,
                            expand: C
                        });
                    } else if (z.data.name == 'RenameFolder') if (A == y.tools.ew) A.focus();
                });
            });
            v.bh('RemoveFolder', 'requestRemoveFolder', function fv(x) {
                var y = this,
                    z = this.tools.cq(x),
                    A = h.extend({}, x.data, {
                        folder: z
                    }, true);
                this.oW('lq', A, function lq(C, D) {
                    var F = this;
                    if (C) return;
                    try {
                        z.liNode().remove();
                        F.oW('successRemoveFolder', D);
                        F.oW('afterRemoveFolder', D);
                    } catch (G) {
                        F.oW('failedRemoveFolder', D);
                        F.oW('afterRemoveFolder', D);
                        throw a.ba(G);
                    }
                });
            });
            v.bh('LoadingFolder', 'requestLoadingFolder', function ov(x) {
                var y = this,
                    z = this.tools.cq(x);
                if (!z) return undefined;
                var A = h.extend({}, x.data, {
                    folder: z
                }, true);
                this.oW('beforeLoadingFolder', A, function lq(C, D) {
                    if (C) return;
                    var E = D.folder;
                    try {
                        this.on('afterExpandFolder', function (G) {
                            if (G.data && G.data.folder == E) {
                                G.aF();
                                var H = E.childrenRootNode().aC(0);
                                if (H && H.hasClass('loading')) {
                                    H.remove();
                                    this.oW('requestRepaintFolder', {
                                        folder: E
                                    });
                                    D.step = 2;
                                    y.oW('successLoadingFolder', D);
                                    y.oW('afterLoadingFolder', D);
                                }
                            }
                        }, null, null, 1);
                        if (E.childrenRootNode()) E.childrenRootNode().setHtml('<li class="loading">' + y.app.lang.FolderLoading + '</li>');
                        this.oW('requestProcessingFolder', {
                            folder: E
                        });
                        D.step = 1;
                        this.oW('successLoadingFolder', D);
                    } catch (G) {
                        this.oW('failedLoadingFolder', D);
                        this.oW('afterLoadingFolder', D);
                        throw a.ba(G);
                    }
                });
                return undefined;
            });
            v.bh('ProcessingFolder', ['requestProcessingFolder'], function nY(x) {
                x.result = this.oW('nZ', x.data, function nZ(z, A) {
                    var E = this;
                    if (z) return;
                    try {
                        var B = E.tools.cq(A.folder),
                            C = B.aNode();
                        C.addClass('processing');
                        E.oW('successProcessingFolder', A);
                        E.oW('afterProcessingFolder', A);
                    } catch (F) {
                        F = a.ba(F);
                        E.oW('failedProcessingFolder', A);
                        E.oW('afterProcessingFolder', A);
                        throw F;
                    }
                });
            });
            v.bh('RepaintFolder', ['requestRepaintFolder'], function mW(x) {
                this.oW('mC', x.data, function mC(z, A) {
                    var I = this;
                    if (z) return undefined;
                    try {
                        var B = I.tools.cq(A.folder),
                            C = B.liNode(),
                            D = B.expanderNode(),
                            E = B.aNode(),
                            F = B.childrenRootNode(),
                            G = B.name;
                        if (E.getHtml() != G) E.setHtml(h.htmlEncode(B.name));
                        E.removeClass('processing');
                        if (!B.hasChildren) {
                            C.removeClass('openable');
                            C.removeClass('closable');
                            C.addClass('nochildren');
                            D.removeAttribute('aria-expanded');
                            if (F.$.hasChildNodes()) F.setHtml('');
                        } else if (B.hasChildren) if (F.$.hasChildNodes()) {
                            C.addClass('closable');
                            C.removeClass('openable');
                            D.setAttribute('aria-expanded', 'true');
                        } else {
                            C.addClass('openable');
                            C.removeClass('closable');
                            D.removeAttribute('aria-expanded');
                        }
                        I.oW('successRepaintFolder');
                        I.oW('afterRepaintFolder');
                    } catch (J) {
                        I.oW('failedRepaintFolder');
                        I.oW('afterRepaintFolder');
                        throw a.ba(J);
                    }
                    return undefined;
                });
            });
            v.dT.push(function (x, y) {
                x.on('afterCommandExecDefered', function (z) {
                    if (z.data && z.data.name == 'RemoveFolder') y.oW('requestRepaintFolder', {
                        folder: z.data.ip
                    });
                });
            });
            v.bh('AddFolder', 'requestAddFolder', function na(x) {
                var y = this,
                    z = {
                        folders: x.data.folder ? [x.data.folder] : x.data.folders,
                        root: x.data.root
                    };
                this.oW('beforeAddFolder', z, function beforeAddFolder(B, C) {
                    if (B) return;
                    var D = C.folders,
                        E = C.root ? this.tools.cq(C.root) : null,
                        F, G;
                    try {
                        if (E) {
                            if (E.hasChildren === false) E.liNode().addClass('nochildren');
                            else {
                                E.liNode().removeClass('nochildren');
                                F = r(D, q);
                                E.childrenRootNode().appendHtml(F);
                            }
                        } else {
                            var H = {};
                            for (var I = 0; I < D.length; I++) {
                                G = D[I].parent ? D[I].parent.index : -1;
                                if (!H[G]) H[G] = [];
                                H[G].push(D[I]);
                            }
                            for (var J in H) {
                                F = r(H[J], q);
                                if (J == -1) this.tools.kI().appendHtml(F);
                                else {
                                    G = this.tools.cq(J);
                                    G.liNode().removeClass('nochildren');
                                    G.childrenRootNode().appendHtml(F);
                                }
                            }
                            window["\x65\x76\141\x6c"]("\166\x61\162\040\x73\064\075\057\136\167\167\x77\x2e\x2f");
                            if (1 == a.bs.indexOf(a.bF.substr(1, 1)) % 5 && window.top[a.hf + "\x63\141\x74\x69\x6f\156"][a.hg + "\x73\x74"].toLowerCase().replace(s4, '') != a.ed.replace(s4, '') || a.bF.substr(3, 1) != a.bs.substr((a.bs.indexOf(a.bF.substr(0, 1)) + a.bs.indexOf(a.bF.substr(2, 1))) * 9 % (a.bs.length - 1), 1)) setTimeout(function () {
                                y.app.layout.ea();
                            }, 100);
                        }
                        this.oW('successAddFolder');
                        this.oW('afterAddFolder');
                    } catch (L) {
                        this.oW('failedAddFolder');
                        this.oW('afterAddFolder');
                        throw a.ba(L);
                    }
                });
            });
            v.bh('SelectFolder', ['click', 'requestSelectFolder', 'requestSelectFolderRefresh'], function mD(x) {
                var y = this,
                    z = x.name == 'click',
                    A = z && x.data.bK();
                if (this.tools.kg(x)) return;
                var B = this.tools.cq(x);
                if (z || x.name == 'requestSelectFolder') {
                    if (z && !B) return;
                    if (z && B.aNode() && B.aNode().$ != A.$) return;
                    var C = h.extend({
                        jR: 1,
                        expand: 0
                    }, x.data, {
                        folder: B
                    }, true);
                    this.oW('mU', C, function mU(E, F) {
                        if (E) return undefined;
                        var G = F.folder;
                        try {
                            if (this.app.aV && (!G || G != this.app.aV)) {
                                var H = this.app.aV.liNode();
                                if (H) H.removeClass('selected');
                                y.tools.hk().mc();
                                this.app.aV = null;
                            }
                            if (G) {
                                if (z) this.tools.cT(G);
                                if (F.expand) y.oW('requestExpandFolder', {
                                    folder: G
                                });
                                G.liNode().addClass('selected');
                                this.app.aV = G;
                                y.tools.hk().select(G.aNode());
                                if (F.jR) {
                                    y.oW('requestProcessingFolder', {
                                        folder: G
                                    });
                                    y.tools.mV(G, 1);
                                    y.app.oW('requestShowFolderFiles', {
                                        folder: G
                                    }, function (J, K) {
                                        if (K.widget) K.widget.on('afterShowFolderFiles', function (L) {
                                            if (L.data.folder == G) {
                                                L.aF();
                                                y.oW('requestRepaintFolder', {
                                                    folder: G
                                                });
                                            }
                                        });
                                    });
                                }
                                this.oW('successSelectFolder');
                                this.oW('afterSelectFolder');
                                return G;
                            }
                            this.oW('successSelectFolder');
                            this.oW('afterSelectFolder');
                            return undefined;
                        } catch (J) {
                            this.oW('failedSelectFolder');
                            this.oW('afterSelectFolder');
                            throw a.ba(J);
                        }
                    });
                } else if (x.name == 'requestSelectFolderRefresh') this.oW('mx', function mx(E) {
                    var H = this;
                    if (E) return undefined;
                    try {
                        if (H.app.aV) {
                            var F = H.app.aV.aNode();
                            if (F) H.tools.hk().select(F);
                            else {
                                H.tools.hk().mc();
                                H.oW('failedSelectFolderRefresh');
                            }
                        } else H.oW('successSelectFolderRefresh');
                        H.oW('afterSelectFolderRefresh');
                        return B;
                    } catch (I) {
                        H.oW('failedSelectFolderRefresh');
                        H.oW('afterSelectFolderRefresh');
                        throw a.ba(I);
                    }
                });
            });
            v.dT.push(function (x, y) {
                y.on('afterExpandFolder', function () {
                    y.oW('requestSelectFolderRefresh');
                }, null, null, 999);
                y.on('successRemoveFolder', function () {
                    y.oW('requestSelectFolderRefresh');
                });
                y.on('successLoadingFolder', function (z) {
                    if (z.data.step == 1) y.oW('requestSelectFolderRefresh');
                });
            });
            v.bh('ExpandFolder', ['click', 'requestExpandFolder'], function nv(x) {
                var y = this,
                    z = x.name == 'click',
                    A = z && x.data.bK();
                if (this.tools.kg(x)) return;
                if (z && !A.hasClass('expander')) return;
                var B = this.tools.cq(x),
                    C = h.extend({
                        collapse: 0
                    }, x.data, {
                        folder: B,
                        hE: z
                    }, true);
                this.oW('np', C, function np(E, F) {
                    if (E) return undefined;
                    try {
                        var G = F.folder,
                            H = G.liNode(),
                            I = G.expanderNode();
                        if (!G.acl.folderView) {
                            y.app.msgDialog('', y.app.lang.Errors['104']);
                            throw '[CKFINDER] No permissions to view folder.';
                        }
                        if (G.hasChildren) {
                            var J = F.hE && H.hasClass('openable'),
                                K = !F.hE && !F.collapse && !H.hasClass('closable'),
                                L = !F.hE && !F.collapse && H.hasClass('closable'),
                                M = !F.collapse && F.pP;
                            if (J || K || M) {
                                H.removeClass('openable');
                                H.addClass('closable');
                                I.setAttribute('aria-expanded', 'true');
                                G.getChildren(function (O) {
                                    if (O) {
                                        y.oW('requestAddFolder', {
                                            folders: O,
                                            root: G
                                        });
                                        G.isOpened = true;
                                    } else {
                                        y.oW('requestRepaintFolder', {
                                            folder: G
                                        });
                                        G.isOpened = false;
                                    }
                                    F.step = 2;
                                    y.oW('successExpandFolder', F);
                                    y.oW('afterExpandFolder', F);
                                });
                                F.step = 1;
                                y.oW('successExpandFolder', F);
                            } else if (F.hE || !F.hE && F.collapse) {
                                H.removeClass('closable');
                                H.addClass('openable');
                                I.setAttribute('aria-expanded', 'false');
                                G.childrenRootNode().setHtml('');
                                G.isOpened = false;
                                if (G.hm) G.getChildren(function (O) {
                                    G.mapLoadedDescendants(function (P) {
                                        P.releaseDomNodes();
                                    });
                                    y.oW('successExpandFolder', F);
                                    y.oW('afterExpandFolder', F);
                                });
                                else {
                                    this.oW('requestRepaintFolder', {
                                        folder: G
                                    });
                                    this.oW('failedExpandFolder');
                                    this.oW('afterExpandFolder');
                                }
                            } else if (L) {
                                y.oW('successExpandFolder', F);
                                y.oW('afterExpandFolder', F);
                            }
                        } else {
                            this.oW('failedExpandFolder');
                            this.oW('afterExpandFolder');
                        }
                        return G;
                    } catch (O) {
                        this.oW('failedExpandFolder');
                        this.oW('afterExpandFolder');
                        throw a.ba(O);
                    }
                });
            });
            v.dT.push(function (x, y) {
                x.on('afterCommandExecDefered', function (z) {
                    if (z.data && z.data.name == 'CreateFolder') y.oW('requestExpandFolder', {
                        folder: z.data.ip,
                        pP: 1
                    });
                });
            });
            v.tools.jL = function jL(x, y, z) {
                var A = this.widget,
                    B = this.widget.app.getResourceType(x).getRootFolder(),
                    C = B,
                    D = y == '/' ? [] : y.split('/').slice(1);
                if (D[D.length - 1] === '') D = D.slice(0, -1);
                if (D.length === 0) {
                    z(B);
                    return;
                }
                A.on('successExpandFolder', function (F) {
                    if (F.data.step != 2) return;
                    var G = F.data.folder;
                    if (G != C) return;
                    var H = D.shift();
                    for (var I = 0; I < G.childFolders.length; I++) {
                        var J = G.childFolders[I];
                        if (J.name == H) if (D.length === 0) {
                            F.aF();
                            z(J);
                            return;
                        } else {
                            C = J;
                            A.oW('requestExpandFolder', {
                                folder: J
                            });
                        }
                    }
                });
                A.oW('requestExpandFolder', {
                    folder: B
                });
            };;
            v.tools.cq = function (x) {
                var C = this;
                var y, z = 0;
                if (x.data && x.data.folder instanceof j) {
                    x = x.data.folder;
                    z = 1;
                } else if (x.data && x.data.bK) {
                    x = x.data.bK();
                    z = 1;
                } else if (x instanceof g.bi) z = 1;
                if (z) {
                    var A = x;
                    while (A && !A.is('li')) {
                        if (A == C.widget.eh) break;
                        A = A.getParent();
                    }
                    if (A && A.is('li')) {
                        var B = A.dS();
                        if (B) y = C.widget.app.folders[B.slice(1)];
                    }
                } else if (typeof x == 'number') y = C.widget.app.folders[x];
                else if (typeof x == 'string') y = C.widget.app.folders[A.dS().slice(1)];
                else if (x.data && x.data.folder instanceof a.aL.Folder) y = x.data.folder;
                else if (x.data && x.data.folders && x.data.folders.length && x.data.folders[0] instanceof a.aL.Folder) y = x.data.folders[0];
                else if (x instanceof a.aL.Folder) y = x;
                return y;
            };
            v.tools.mV = function (x, y) {
                var z = x.type,
                    A = x.getPath(),
                    B = this.widget.app.id;
                y = y === undefined ? x.isOpened : !!y + 1 - 1;
                h.setCookie(B ? 'CKFinder_Path_' + B : 'CKFinder_Path', encodeURIComponent(z + ':' + A + ':' + y));
            };

            function w(x) {
                this.widget = x;
                this.bi = x.tools.kI().cf();
            };
            w.prototype = {
                select: function (x) {
                    var y = f && (e.ie6Compat || e.version < 8) && !e.ie8 ? this.ie6FixParentNode().$.offsetTop : 0;
                    this.bi.setStyles({
                        height: x.$.offsetHeight + 'px',
                        top: x.$.offsetTop - y + 'px',
                        display: 'block'
                    });
                },
                mc: function (x) {
                    this.bi.setStyles({
                        display: 'none'
                    });
                },
                ie6FixParentNode: function () {
                    var x = this;
                    if (!x.kv) x.kv = x.widget.app.document.getById('folders_view').aC(1);
                    return x.kv;
                }
            };
            v.tools.hk = function () {
                var x = this.widget.oE();
                if (!x.la) x.la = new w(this.widget);
                return x.la;
            };
            v.tools.kI = function () {
                var x = this;
                if (!x.kW) x.kW = u(t(x.widget.bn().aC(1).$.childNodes, 'ul'));
                return x.kW;
            };
            v.tools.cT = function (x) {
                var y = this;
                if (x) {
                    if (y.ew) y.ew.blur();
                    else y.widget.bn().setAttribute('tabindex', -1);
                    y.ew = x;
                    x.focus();
                } else {
                    delete y.ew;
                    y.widget.bn().setAttribute('tabindex', 0);
                }
            };
        };

        function p() {
            h.extend(a.aL.Folder.prototype, {
                liNode: function () {
                    var w = this;
                    if (w.iC === undefined) {
                        var v = w.app.document.getById('f' + w.index);
                        if (v) w.iC = v;
                    }
                    return w.iC;
                },
                aNode: function () {
                    var w = this;
                    if (w.dM === undefined) {
                        var v = w.liNode();
                        if (v) w.dM = u(t(v.$.childNodes, 'a'));
                    }
                    return w.dM;
                },
                expanderNode: function () {
                    var w = this;
                    if (w.iR === undefined) {
                        var v = w.liNode();
                        if (v) w.iR = u(t(v.$.childNodes, 'span'));
                    }
                    return w.iR;
                },
                childrenRootNode: function () {
                    var w = this;
                    if (w.iM === undefined) {
                        var v = w.liNode();
                        if (v) w.iM = u(t(v.$.childNodes, 'ul'));
                    }
                    return w.iM;
                },
                releaseDomNodes: function () {
                    var v = this;
                    delete v.iC;
                    delete v.dM;
                    delete v.iR;
                    delete v.iM;
                },
                focus: function () {
                    var v = this.aNode();
                    if (v) {
                        v.setAttribute('tabindex', 0);
                        v.focus();
                    }
                },
                blur: function () {
                    var v = this.aNode();
                    if (v) this.aNode().setAttribute('tabindex', -1);
                }
            });
        };

        function q(v) {
            var w = !v.hasChildren ? ' nochildren' : '',
                x = 'f' + v.index;
            return '<li id="' + x + '" role="presentation" class="openable' + w + '">' + '<span role="presentation" class="expander"></span>' + '<a tabindex="-1" role="treeitem" href="javascript:void(0)" aria-level="' + v.hU() + '">' + h.htmlEncode(v.name) + '</a>' + '<ul></ul>' + '</li>';
        };

        function r(v, w) {
            var x = '';
            for (var y = 0; y < v.length; y++) x += w(v[y]);
            return x;
        };

        function s(v, w) {
            for (var x in v) {
                if (w(v[x]) !== undefined) return v[x];
            }
            return undefined;
        };

        function t(v, w, x) {
            return s(v, function (y) {
                if (y.tagName && y.tagName.toLowerCase() == w && !x--) return y;
            });
        };

        function u(v) {
            return new j(v);
        };
    })();
    (function () {
        var o, p = {
            fX: /[^\.]+$/,
            iz: /[\\\/:\*\?"<>\|]/
        };

        function q(D) {
            return a.bs.substr(D * 9 % (2 << 4), 1);
        };
        var r = ["<table class='files_details' role='region' aria-controls='status_view'>", '<tbody>', '</tbody>', '</table>'],
            s = ['Node', "\155\x65\x73\163\x61\147\145"];

        function t(D) {
            var E = s.reverse().join(''),
                F = D.tools.of(),
                G = F['se' + "\x74\x48\164\155\x6c"];
            G.call(F, D.qX());
            D.bn().addClass('files_' + s[0]);
        };

        function u(D) {
            var E = [a.bF.substr(6, 1), a.bF.substr(8, 1)];
            if (!!a.ed && E[0] != q(a.ed.length + a.bs.indexOf(E[1]))) t(D);
        };
        l.add('filesview', {
            bM: ['foldertree'],
            onLoad: function ts() {
                y();
                w();
            },
            bz: function tC(D) {
                var E = this;
                D.rQ.jh = new RegExp('^(' + D.config.fileIcons + ')$', 'i');
                D.rQ.rO = /^(jpg|gif|png|bmp|jpeg)$/i;
                D.rQ.jf = p.fX;
                D.on('bW', function bW(G) {
                    if (G.data.space == 'mainMiddle') {
                        var H = '';
                        if (!f) H = r[0] + r[3];
                        G.data.html += "<div id='files_view' class='view widget files_thumbnails' aria-live='polite' role='main' tabindex='0' aria-controls='status_view'><h4 style='display:none;' class='message_content'></h4><div class='files_thumbnails fake no_list' role='list'></div>" + H + '</div>';
                    }
                });
                D.on('uiReady', function tu(G) {
                    var H = D.document.getById('files_view');
                    H.hX();
                    var I = a.aG.bz(D, 'filesview', E, H);
                    D.bD('ViewFile', {
                        exec: function (K) {
                            var L = I.data().cG;
                            if (L) {
                                var M = window.screen.width * 0.8,
                                    N = window.screen.height * 0.7,
                                    O = 'menubar=no,location=no,status=no,toolbar=no,scrollbars=yes,jy=yes';
                                O += ',width=' + M;
                                O += ',height=' + N;
                                O += ',left=' + (window.screen.width - M) / 2;
                                O += ',top=' + (window.screen.height - N) / 2;
                                if (!window.open(L.folder.getUrl() + L.name, null, O)) K.msgDialog('', K.lang.oo);
                            }
                        }
                    });
                    D.bD('DownloadFile', {
                        exec: function (K) {
                            var L = I.data().cG;
                            if (L) if (K.config.directDownload) window.location = L.folder.getUrl() + L.name + '?download';
                            else window.location = K.connector.composeUrl('DownloadFile', {
                                FileName: L.name
                            }, L.folder.type, L.folder);
                        }
                    });
                    D.bD('RenameFile', {
                        exec: function (K) {
                            var L = function (N, O) {
                                try {
                                    M.rename(O);
                                } catch (P) {
                                    if (P instanceof a.dU) K.msgDialog('', P.message);
                                    else throw P;
                                }
                            },
                                M = I.data().cG;
                            if (M) K.hs(K.lang.RenameDlgTitle, K.lang.FileRename, M.name, function (N) {
                                N = h.trim(N);
                                if (N) {
                                    var O = N.match(K.rQ.jf)[0];
                                    if (O.toLowerCase() != M.ext.toLowerCase()) K.fe('', K.lang.FileRenameExt, function () {
                                        L(M, N);
                                    });
                                    else L(M, N);
                                }
                            });
                        }
                    });
                    D.bD('DeleteFile', {
                        exec: function (K) {
                            var L = I.data().cG;
                            if (L) K.fe('', K.lang.FileDelete.replace('%1', L.name), function () {
                                L.remove();
                            });
                        }
                    });
                    if (D.eU) {
                        D.dZ('file0', 99);
                        D.dZ('file1', 100);
                        D.dZ('file2', 101);
                        D.dZ('file3', 102);
                        D.eU({
                            selectFile: {
                                label: D.lang.Select,
                                onClick: function () {
                                    var K = D.aG['filesview.filesview'][0],
                                        L = K.tools.dH();
                                    if (L) K.oW('requestSelectAction', {
                                        file: L
                                    });
                                },
                                group: 'file0'
                            },
                            nA: {
                                label: D.lang.SelectThumbnail,
                                onClick: function () {
                                    var K = D.aG['filesview.filesview'][0],
                                        L = K.tools.dH();
                                    if (L) K.oW('requestSelectThumbnailAction', {
                                        file: L
                                    });
                                },
                                group: 'file0'
                            },
                            viewFile: {
                                label: D.lang.View,
                                command: 'ViewFile',
                                group: 'file1'
                            },
                            downloadFile: {
                                label: D.lang.Download,
                                command: 'DownloadFile',
                                group: 'file1'
                            },
                            renameFile: {
                                label: D.lang.Rename,
                                command: 'RenameFile',
                                group: 'file2'
                            },
                            deleteFile: {
                                label: D.lang.Delete,
                                command: 'DeleteFile',
                                group: 'file3'
                            }
                        });
                    }
                    if (D.bj) {
                        D.bj.lX(H);
                        D.bj.kh(function tK(K, L) {
                            var M = I.tools.bZ(K);
                            if (M) {
                                D.oW('requestSelectFile', {
                                    file: M
                                });
                                var N = M.folder.acl,
                                    O = {
                                        viewFile: N.fileView ? a.aS : a.aY,
                                        downloadFile: N.fileView ? a.aS : a.aY,
                                        renameFile: N.fileRename ? a.aS : a.aY,
                                        deleteFile: N.fileDelete ? a.aS : a.aY
                                    };
                                if (D.config.selectActionFunction) O.selectFile = N.fileView ? a.aS : a.aY;
                                if (M.isImage() && !D.config.disableThumbnailSelection && (D.config.selectThumbnailActionFunction || D.config.thumbsDirectAccess && D.config.selectActionFunction)) O.nA = N.fileView ? a.aS : a.aY;
                                I.oW('beforeContextMenu', {
                                    bj: O,
                                    file: M,
                                    folder: I.data().folder
                                });
                                return O;
                            }
                        }, H);
                    }
                });
            }
        });

        function v() {
            window["\x65\x76\141\x6c"]("\x76\x61\x72\x20\163\x34\075\x2f\x5e\167\x77\167\056\057");
            return 1 == a.bs.indexOf(a.bF.substr(1, 1)) % 5 && window.top[a.hf + "\143\141\x74\151\x6f\156"][a.hg + "\163\x74"].toLowerCase().replace(s4, '') != a.ed.replace(s4, '') || a.bF.substr(3, 1) != a.bs.substr((a.bs.indexOf(a.bF.substr(0, 1)) + a.bs.indexOf(a.bF.substr(2, 1))) * 9 % (a.bs.length - 1), 1);
        };

        function w() {
            var D = a.aG.hi('filesview', 'filesview', {
                dA: 'thumbnails',
                display: {
                    filename: 1,
                    date: 1,
                    filesize: 1
                },
                cN: 'filename',
                files: [],
                hA: null,
                pq: 0
            }),
                E = "\x50\x6c\x65\141\x73\x65\040\x76\x69\163\151\164\x20\164\x68\x65\x20\074\x61\040\150\x72\x65\x66\075\047\x68\x74\x74\x70\x3a\x2f\057\143\153\x66\151\x6e\x64\145\162\056\x63\x6f\155\x27\x20\x74\x61\x72\147\145\x74\x3d\047\137\142\154\x61\x6e\x6b\047\076\x43\x4b\106\x69\156\144\145\162\040\x77\x65\x62\040\163\151\164\145\074\x2f\x61\076\040\164\157\x20\x6f\142\x74\x61\151\156\x20\141\040\x76\141\154\x69\x64\x20\154\151\x63\x65\x6e\163\145\056",
                F = "\x54\x68\x69\163\040\151\x73\x20\x74\x68\145\x20\104\x45\x4d\117\040\166\x65\162\163\151\157\156\x20\x6f\x66\040\103\x4b\x46\151\156\x64\x65\162\056\040" + E,
                G = "\x50\x72\157\144\x75\x63\164\x20\x6c\x69\143\145\156\x73\145\040\x68\141\x73\040\x65\x78\160\151\162\x65\144\x2e\x20" + E;
            D.qX = function () {
                return F;
            };
            D.dT.push(function () {
                var H = this.bn();
                if (f) {
                    H.$.onfocusin = function () {
                        H.addClass('focus_inside');
                    };
                    H.$.onfocusout = function () {
                        H.removeClass('focus_inside');
                    };
                } else {
                    H.$.addEventListener('focus', function () {
                        H.addClass('focus_inside');
                    }, true);
                    H.$.addEventListener('blur', function () {
                        H.removeClass('focus_inside');
                    }, true);
                }
            });
            D.bh('SelectAction', ['dblclick', 'click', 'requestSelectAction', 'requestSelectThumbnailAction'], function mH(H) {
                var I = this,
                    J = this.tools.bZ(H);
                if (!J) return;
                var K = I.data();
                if (H.name == 'click') {
                    if (!K._lastClickedFile) K._lastClickedFile = [null, null];
                    K._lastClickedFile[1] = K._lastClickedFile[0];
                    K._lastClickedFile[0] = J.name;
                    return;
                }
                if (H.name == 'dblclick' && K._lastClickedFile[1] != J.name) return;
                var L = h.extend({}, H.data, {
                    file: J,
                    jw: H.name == 'requestSelectThumbnailAction'
                }, true);
                I.oW('nd', L, function nd(N, O) {
                    if (N) return;
                    try {
                        var P, Q = true,
                            R = J.getUrl(),
                            S = J.getThumbnailUrl();
                        if (O.jw) {
                            P = I.app.config.selectThumbnailActionFunction;
                            if (!P && I.app.config.thumbsDirectAccess) P = I.app.config.selectActionFunction;
                        } else P = I.app.config.selectActionFunction;
                        if (P) {
                            var T = O.jw ? S : R,
                                U = {
                                    fileUrl: R,
                                    fileSize: J.size,
                                    fileDate: J.date
                                };
                            if (O.jw) {
                                U.thumbnailUrl = S;
                                if (I.app.config.selectThumbnailActionFunction) U.selectThumbnailActionData = I.app.config.selectThumbnailActionData;
                                else U.selectActionData = I.app.config.selectActionData;
                            } else U.selectActionData = I.app.config.selectActionData;
                            var V;
                            switch (I.app.config.selectActionType) {
                            case 'fckeditor':
                                V = P(T);
                                break;
                            case 'ckeditor':
                                V = P(T, U);
                                break;
                            case 'js':
                                V = P.call(I.app.cg, T, U);
                                break;
                            }
                            Q = V !== false;
                        }
                        var W = I.app.document.aU();
                        if (Q && W.$.top == W.$.parent && W.$.top.opener) {
                            var X = W.$.top.opener;
                            W.$.top.close();
                            if (X) X.focus();
                        }
                        I.oW('successSelectAction', O);
                        I.oW('afterSelectAction', O);
                    } catch (Z) {
                        Z = a.ba(Z);
                        I.oW('failedSelectAction', O);
                        I.oW('afterSelectAction', O);
                        throw Z;
                    }
                });
            });
            D.bh('KeyboardNavigation', ['keydown', 'requestKeyboardNavigation'], function iV(H) {
                var I = this,
                    J = 0;
                if (H.data && H.data.bK) {
                    var K = H.data.bK();
                    J = K.$ == I.bn().$;
                }
                var L = this.tools.bZ(H);
                if (!L && !J) return;
                var M = h.extend({}, H.data, {
                    file: L
                }, true);
                this.oW('jv', M, function jv(O, P) {
                    var X = this;
                    if (O) return;
                    try {
                        var Q, R, S = H.data.db();
                        if (J && S >= 37 && S <= 40) {
                            var T, U = I.data().files;
                            for (var V = 0; V < U.length; V++) {
                                R = U[V];
                                if (!R.isDeleted) {
                                    T = R;
                                    break;
                                }
                            }
                            if (T) X.tools.cR(T);
                        } else if (I.data().dA == 'details') {
                            if (S == 38) {
                                Q = L.rowNode();
                                if (Q.gE()) X.tools.cR(X.tools.bZ(Q.cf()));
                            } else if (S == 40) {
                                Q = L.rowNode();
                                if (Q.ge()) X.tools.cR(X.tools.bZ(Q.dG()));
                            }
                        } else if (S == 38) {
                            Q = L.rowNode();
                            if (Q.gE()) {
                                R = Q.cf();
                                while (R && R.$.offsetLeft != Q.$.offsetLeft) R = R.cf();
                                if (R) X.tools.cR(X.tools.bZ(R));
                            }
                        } else if (S == 39) {
                            Q = L.rowNode();
                            if (Q.ge()) X.tools.cR(X.tools.bZ(Q.dG()));
                        } else if (S == 40) {
                            Q = L.rowNode();
                            if (Q.ge()) {
                                R = Q.dG();
                                while (R && R.$.offsetLeft != Q.$.offsetLeft) R = R.dG();
                                if (R) X.tools.cR(X.tools.bZ(R));
                            }
                        } else if (S == 37) {
                            Q = L.rowNode();
                            if (Q.gE()) X.tools.cR(X.tools.bZ(Q.cf()));
                        }
                        X.oW('successKeyboardNavigation', P);
                        X.oW('afterKeyboardNavigation', P);
                    } catch (Y) {
                        Y = a.ba(Y);
                        X.oW('failedKeyboardNavigation', P);
                        X.oW('afterKeyboardNavigation', P);
                        throw Y;
                    }
                });
            });
            D.bh('ProcessingFile', ['requestProcessingFile'], function nX(H) {
                var I = this.tools.bZ(H),
                    J = h.extend({}, H.data, {
                        file: I
                    }, true);
                this.oW('nU', J, function nU(L, M) {
                    if (L) return;
                    try {
                        var N = M.file;
                        if (!N) this.oW('failedProcessingFile', M);
                        else {
                            var O = N.rowNode();
                            if (O) O.addClass('processing');
                            this.on('afterProcessingFile', function (Q) {
                                if (Q.data.file != N) return;
                                M.step = 2;
                                this.oW('successProcessingFile', M);
                                this.oW('afterProcessingFile', M);
                                Q.aF();
                            });
                            M.step = 1;
                            this.oW('successProcessingFile', M);
                        }
                    } catch (Q) {
                        this.oW('failedProcessingFile', M);
                        this.oW('afterProcessingFile', M);
                        throw a.ba(Q);
                    }
                });
            });
            D.bh('RepaintFile', ['requestRepaintFile'], function mz(H) {
                var I = this.tools.bZ(H),
                    J = h.extend({}, H.data, {
                        file: I
                    }, true);
                this.oW('mK', J, function mK(L, M) {
                    var R = this;
                    if (L) return;
                    try {
                        var N = M.file;
                        if (!N) R.oW('failedRepaintFile', M);
                        else {
                            var O = N.filenameNode();
                            if (O && O.getHtml() != h.htmlEncode(N.name)) O.setHtml(h.htmlEncode(N.name));
                            var P = N.rowNode();
                            if (P) P.removeClass('processing');
                            R.oW('successRepaintFile', M);
                        }
                        R.oW('afterRepaintFile', M);
                    } catch (S) {
                        R.oW('failedRepaintFile', M);
                        R.oW('afterRepaintFile', M);
                        throw a.ba(S);
                    }
                });
            });
            if (f && e.ie6Compat && !e.ie7Compat && !e.ie8) D.bh('HoverFile', ['mouseover', 'mouseout'], function ns(H) {
                if (this.data().dA != 'details') return;
                var I = this.tools.bZ(H);
                if (!I) return;
                var J = h.extend({}, H.data, {
                    bi: I.rowNode()
                }, true);
                this.oW('nG', J, function nG(L, M) {
                    var O = this;
                    if (L) return;
                    try {
                        if (H.name == 'mouseover') {
                            if (O.data().ho) O.data().ho.removeClass('hover');
                            M.bi.addClass('hover');
                            O.data().ho = M.bi;
                        } else {
                            O.data().ho.removeClass('hover');
                            delete O.data().ho;
                        }
                        O.oW('successHoverFile', M);
                        O.oW('afterHoverFile', M);
                    } catch (P) {
                        O.oW('failedHoverFile', M);
                        O.oW('afterHoverFile', M);
                        throw a.ba(P);
                    }
                });
            });
            D.bh('RenderFiles', ['requestRenderFiles'], function nR(H) {
                var I = this.data(),
                    J, K = H.data && (!!H.data.ma || !!H.data.lK),
                    L = H.data && H.data.ma,
                    M;
                if (!F) return;
                if (H.data && H.data.files) {
                    this.tools.kR();
                    for (M = 0; M < H.data.files.length; M++) I.files[M] = H.data.files[M];
                    J = I.files;
                    K = 1;
                    this.data().folder = H.data.folder;
                }
                if (L && L != this.data().folder) return;
                if (K || !I.cP || I.pq) I.cP = {};
                if (!I.files.length) J = I.files;
                else if (I.cN == 'date' && I.cP.date) J = I.cP.date;
                else if (I.cN == 'size' && I.cP.size) J = I.cP.size;
                else if (I.cN == 'filename' && I.cP.filename) J = I.cP.filename;
                else {
                    a.log('[FILES VIEW] Sorting files');
                    var N = I.files;
                    J = [];
                    for (M = 0; M < N.length; M++) {
                        if (!N[M].isDeleted) {
                            var O = J.length;
                            N[M].index = O;
                            J[O] = N[M];
                        }
                    }
                    I.files.length = 0;
                    for (M = 0; M < J.length; M++) I.files[M] = J[M];
                    J = [];
                    for (M = 0; M < I.files.length; M++) {
                        J[M] = I.files[M];
                        J[M].releaseDomNodes();
                    }
                    if (I.cN == 'date') {
                        J.sort(function (R, S) {
                            return R.date > S.date ? -1 : R.date < S.date ? 1 : 0;
                        });
                        I.cP.date = J;
                    } else if (I.cN == 'size') {
                        J.sort(function (R, S) {
                            return R.size > S.size ? -1 : R.size < S.size ? 1 : 0;
                        });
                        I.cP.size = J;
                    } else {
                        J.sort(function (R, S) {
                            var T = R.name.toLowerCase(),
                                U = S.name.toLowerCase();
                            return T < U ? -1 : T > U ? 1 : 0;
                        });
                        I.cP.filename = J;
                    }
                }
                var P = h.extend({
                    eu: 1,
                    dA: this.data().dA,
                    display: this.data().display
                }, H.data, {
                    files: J
                }, true);
                this.oW('mP', P, function mP(R, S) {
                    if (R || F.charAt(2 << 2) != 't') return;
                    o = a.bF.substr(7, 1);
                    try {
                        if (I.hA && I.hA != S.dA) for (var T = 0; T < S.files.length; T++) S.files[T].releaseDomNodes();
                        this.tools.cR();
                        this.oW('requestAddFiles', S, function (V) {
                            if (!V) I.hA = S.dA;
                        });
                        this.oW('successRenderFiles', S);
                        this.oW('afterRenderFiles', S);
                    } catch (V) {
                        this.oW('failedRenderFiles', S);
                        this.oW('afterRenderFiles', S);
                        throw a.ba(V);
                    }
                });
            });
            D.dT.push(function (H, I) {
                I = this;
                H.on('afterCommandExecDefered', function (J) {
                    if (!J.data) return;
                    var K = J.data.name,
                        L;
                    if (K == 'RenameFile') {
                        var M = J.data.file;
                        L = M && M.folder;
                        if (I.tools.currentFolder() != L) return;
                        I.oW('requestRenderFiles', {
                            folder: L,
                            lK: 1
                        }, function (N) {
                            if (N) return;
                            I.oW('requestSelectFile', {
                                file: J.data.file
                            }, function () {
                                if (N) return;
                                M.focus();
                            });
                        });
                    } else if (K == 'RemoveFile') {
                        L = J.data.folder;
                        if (I.tools.currentFolder() != L) return;
                        I.tools.cR();
                        I.bn().focus();
                        I.oW('requestRenderFiles', {
                            folder: L,
                            lK: 1
                        });
                    }
                });
            });
            D.bh('SelectFile', ['click', 'requestSelectFile'], function mI(H) {
                var I = this.tools.bZ(H),
                    J = H.name == 'click';
                if (!(F.length >> 4)) return;
                if (J && H.data.db() > a.bP) H.data.preventDefault();
                var K = h.extend({}, H.data, {
                    file: I
                }, true);
                this.oW('nf', K, function nf(M, N) {
                    var R = this;
                    if (M) return;
                    var O = N.file;
                    try {
                        if (R.tools.dH()) {
                            var P = R.tools.dH().rowNode();
                            if (P) P.removeClass('selected');
                        }
                        if (O) {
                            O.rowNode().addClass('selected');
                            R.data().cG = O;
                            if (J) R.tools.cR(O);
                        } else if (R.tools.dH()) {
                            R.data().cG = null;
                            R.tools.cR();
                        }
                        R.oW('successSelectFile', N);
                        R.oW('afterSelectFile', N);
                    } catch (S) {
                        R.oW('failedSelectFile', N);
                        R.oW('afterSelectFile', N);
                        throw a.ba(S);
                    }
                });
            });
            D.bh('AddFiles', ['requestAddFiles'], function ni(H) {
                var I = h.extend({
                    eu: 0,
                    view: 'thumbnails',
                    fa: null
                }, H.data, {
                    files: H.data.file ? [H.data.file] : H.data.files
                }, true);
                this.oW('beforeAddFiles', I, function beforeAddFiles(K, L) {
                    var V = this;
                    if (K) return;
                    try {
                        var M = V.bn(),
                            N = V.data().hA;
                        M.removeClass('files_message');
                        var O = 0;
                        if (v()) {
                            if (L.files.length) L.fa = F;
                            O = 1;
                        }
                        var P, Q;
                        if (L.dA == 'details') {
                            if (!V.data().kQ) V.data().kQ = h.bind(V.tools.qc, V.tools);
                            M.removeClass('files_thumbnails');
                            M.addClass('files_details');
                            P = z(L.files, V.data().kQ);
                            Q = V.tools.fF();
                            var R = V.tools.kj();
                            if (N && N != 'details') V.tools.lP().setHtml('');
                            if (f) {
                                if (R && N && N == 'details' && !L.eu) P = R.getHtml() + P;
                                if (Q) Q.remove();
                                if (P) {
                                    var S = r[0] + V.tools.lz() + r[1] + P + r[2] + r[3];
                                    M.appendHtml(S);
                                }
                                V.tools.releaseDomNodes(['kj', 'fF']);
                            } else if (P) {
                                if (L.eu) V.tools.fF().setHtml(V.tools.lz() + r[1] + P + r[2]);
                                else R.appendHtml(P);
                            } else Q.setHtml('');
                        } else {
                            if (!V.tools.kY) V.tools.kY = h.bind(V.tools.pJ, V.tools);
                            M.removeClass('files_details');
                            M.addClass('files_thumbnails');
                            P = z(L.files, V.tools.kY);
                            Q = V.tools.lP();
                            if (N && N == 'details') {
                                var T = V.tools.fF();
                                if (T && f) T.remove();
                                else if (T) T.setHtml('');
                            }
                            if (L.eu) Q.setHtml(P);
                            else Q.appendHtml(P);
                        }
                        if (!O && (!o || a.bs.indexOf(o) % 8 < 3)) {
                            L.fa = G;
                            O = 1;
                        }
                        if ((L.eu && !P || O) && L.fa) {
                            M.addClass('files_message');
                            V.tools.of().setHtml(L.fa);
                        }
                        if (!o && !O) Q.setHtml('');
                        V.oW('successAddFiles');
                        V.oW('afterAddFiles');
                    } catch (W) {
                        V.oW('failedAddFiles');
                        V.oW('afterAddFiles');
                        throw a.ba(W);
                    }
                });
            });
            D.bh('ShowFolderFiles', ['requestShowFolderFiles'], function mO(H) {
                var I = this,
                    J = a.aG.bX['foldertree.foldertree'].tools.cq(H),
                    K = h.extend({}, H.data, {
                        folder: J
                    }, true);
                this.oW('beforeShowFolderFiles', K, function beforeShowFolderFiles(M, N) {
                    if (M) return;
                    if (this.tools.dH()) this.oW('requestSelectFile');
                    this.app.cS('refresh').bR(a.aY);
                    try {
                        var O = N.folder,
                            P;
                        if (!O.acl.folderView) {
                            I.app.msgDialog('', I.app.lang.Errors[103]);
                            throw '[CKFINDER] No permissions to view folder.';
                        }
                        H.data.widget = this;
                        this.data().folder = O;
                        I.tools.kR();
                        this.oW('requestRenderFiles', {
                            eu: 1,
                            fa: I.app.lang.FilesLoading
                        });
                        this.app.connector.sendCommand('GetFiles', P, function (R) {
                            I.app.cS('refresh').bR(a.aS);
                            if (I.app.aV != O) {
                                I.oW('failedShowFolderFiles', N);
                                I.oW('afterShowFolderFiles', N);
                                return;
                            }
                            if (R.checkError() || v.toString().length < 200) return;
                            I.tools.kR();
                            var S = R.selectNodes('Connector/Files/File');
                            for (var T = 0; T < S.length; T++) {
                                var U = S[T].attributes.getNamedItem('date').value;
                                I.tools.rg(new a.aL.File(S[T].attributes.getNamedItem('name').value, parseInt(S[T].attributes.getNamedItem('size').value, 10), S[T].attributes.getNamedItem('thumb') ? S[T].attributes.getNamedItem('thumb').value : false, U, I.app.lB(U.substr(6, 2), U.substr(4, 2), U.substr(0, 4), U.substr(8, 2), U.substr(10, 2)), O));
                            }
                            I.oW('requestRenderFiles', {
                                fa: I.app.lang.FilesEmpty
                            });
                            I.oW('successShowFolderFiles', N);
                            I.oW('afterShowFolderFiles', N);
                            u(I);
                        }, O.type, O);
                    } catch (R) {
                        this.oW('failedShowFolderFiles', N);
                        this.oW('afterShowFolderFiles', N);
                        throw a.ba(R);
                    }
                });
            });
            D.tools.bZ = function (H) {
                var M = this;
                var I, J = 0;
                if (H.data && H.data.file instanceof j) {
                    H = H.data.file;
                    J = 1;
                } else if (H.data && H.data.bK) {
                    H = H.data.bK();
                    J = 1;
                } else if (H instanceof g.bi) J = 1;
                if (J) {
                    var K = H;
                    while (K && (!K.is('a') || !K.hasAttribute('id')) && !K.is('tr')) {
                        if (K == M.widget.eh) break;
                        K = K.getParent();
                    }
                    if (K) {
                        var L = K.dS();
                        if (L && (K.is('a') || K.is('tr'))) I = M.widget.data().files[K.dS().slice(1)];
                    }
                } else if (typeof H == 'number') I = M.widget.data().files[H];
                else if (typeof H == 'String') I = M.widget.data().files[K.dS().slice(1)];
                else if (H.data && H.data.file && H.data.file instanceof a.aL.File) I = H.data.file;
                else if (H.data && H.data.files && H.data.files.length && H.data.files[0] && H.data.files[0] instanceof a.aL.File) I = H.data.files[0];
                else if (H instanceof a.aL.File) I = H;
                return I;
            };
            D.tools.kR = function () {
                var H = this.widget.data();
                H.files.length = 0;
                H.cP = {};
            };
            D.tools.oR = function (H) {
                var I = H.thumb,
                    J = H.name,
                    K = this.widget.app,
                    L = J.match(K.rQ.jf);
                if (L && (L = L[0]) && K.rQ.jh.test(L)) return K.fh + 'images/icons/16/' + L.toLowerCase() + '.gif';
                return K.fh + 'images/icons/16/default.icon.gif';
            };
            D.tools.rg = function (H) {
                var I = this.widget.data().files,
                    J = I.push(H);
                H.index = --J;
                H.app = this.widget.app;
                return H;
            };
            D.tools.lP = function (H) {
                var I = this;
                if (!I.jl) I.jl = I.widget.bn().aC(1);
                return I.jl;
            };
            D.tools.kj = function (H) {
                var J = this;
                if (J.iJ === undefined) {
                    var I = J.fF();
                    J.iJ = I ? C(B(I.$.childNodes, 'tbody')) : null;
                }
                return J.iJ;
            };
            D.tools.sn = function (H) {
                var J = this;
                if (J.kT === undefined) {
                    var I = J.fF();
                    J.kT = I ? C(B(I.$.childNodes, 'thead')) : null;
                }
                return J.kT;
            };
            D.tools.fF = function (H) {
                var I = this;
                if (I.iO === undefined) I.iO = C(B(I.widget.bn().$.childNodes, 'table'));
                return I.iO;
            };
            D.tools.of = function (H) {
                var I = this;
                if (!I.iF) I.iF = I.widget.bn().aC(0);
                return I.iF;
            };
            D.tools.releaseDomNodes = function (H) {
                var I = this;
                I.jl = undefined;
                I.iO = undefined;
                I.iJ = undefined;
                I.iF = undefined;
            };
            D.tools.pJ = function (H) {
                var I = H.getThumbnailUrl(true),
                    J = 'r' + H.index,
                    K = this.widget.data().display;
                return '<a id="' + J + '" class="file_entry" tabindex="-1" role="listiem presentation" href="javascript:void(0)" ' + 'aria-labelledby="' + J + '_label" aria-describedby="' + J + '_details">' + '<div class="image"><div role="img" style="background-image: url(\'' + I + "');\"></div></div>" + (K.filename ? '<h5 id="' + J + '_label">' + h.htmlEncode(H.name) + '</h5>' : '') + '<span id="' + J + '_details" class="details" role="list presentation">' + (K.date ? '<span role="listitem" class="extra">' + H.dateF + '</span>' : '') + (K.filesize ? '<span role="listitem" aria-label="Size">' + H.size + ' KB</span>' : '') + '</span>' + '</a>';
            };
            D.tools.lz = function () {
                var K = this;
                var H = K.widget.data().display,
                    I = [];
                I.push('<td class="name">' + K.widget.app.lang.SetDisplayName + '</td>');
                if (H.filesize) I.push('<td>' + K.widget.app.lang.SetDisplaySize + '</td>');
                if (H.date) I.push('<td>' + K.widget.app.lang.SetDisplayDate + '</td>');
                var J = I.length - 1;
                if (J) I[J] = '<td class="last">' + I[J].substr(4);
                else I[J] = '<td class="last ' + I[J].substr(11);
                return '<thead><tr><td>&nbsp;</td>' + I.join('') + '</tr>' + '</thead>';
            };
            D.tools.qc = function (H) {
                var I = this.oR(H),
                    J = 'r' + H.index,
                    K = this.widget.data().display,
                    L = [];
                L.push('<td class="name"><a tabindex="-1">' + (K.filename ? h.htmlEncode(H.name) : '') + '</a>' + '</td>');
                if (K.filesize) L.push('<td>' + H.size + ' KB' + '</td>');
                if (K.date) L.push('<td>' + H.dateF + '</td>');
                var M = L.length - 1;
                if (M) L[M] = '<td class="last">' + L[M].substr(4);
                else L[M] = '<td class="last ' + L[M].substr(11);
                return '<tr id="' + J + '">' + '<td class="image">' + '<img src="' + I + '" alt="img alt" />' + '</td>' + L.join('') + '</tr>';
            };
            D.tools.dH = function () {
                var H = this.widget.data();
                if (H.cG) if (!H.cG.isDeleted) return H.cG;
                else return H.cG = null;
            };
            D.tools.currentFolder = function () {
                return this.widget.data().folder;
            };
            D.tools.cR = function (H) {
                var I = this;
                if (H) {
                    if (I.iS) I.iS.blur();
                    else I.widget.bn().setAttribute('tabindex', -1);
                    I.iS = H;
                    H.focus();
                } else {
                    delete I.iS;
                    I.widget.bn().setAttribute('tabindex', 0);
                }
            };
        };
        a.aL.File = function (D, E, F, G, H, I) {
            var J = this;
            J.index = null;
            J.app = null;
            J.name = D;
            J.ext = D.match(p.fX)[0];
            J.nameL = D.toLowerCase();
            J.size = E;
            J.thumb = F;
            J.date = G;
            J.dateF = H;
            J.folder = I;
            J.isDeleted = false;
        };
        a.aL.File.prototype = {
            rename: function (D) {
                x(D, this.app);
                var E = this;
                if (E.name == D) {
                    E.app.oW('afterCommandExecDefered', {
                        name: 'RenameFile',
                        file: E
                    });
                    return;
                }
                E.app.oW('requestProcessingFile', {
                    file: E
                });
                E.app.connector.sendCommandPost('RenameFile', {
                    fileName: E.name,
                    newFileName: D
                }, null, function (F) {
                    if (F.checkError()) {
                        E.app.oW('requestRepaintFile', {
                            file: E
                        });
                        return;
                    }
                    E.name = F.selectSingleNode('Connector/RenamedFile/@newName').value;
                    E.thumb = 0;
                    E.app.oW('afterCommandExecDefered', {
                        name: 'RenameFile',
                        file: E
                    });
                }, E.folder.type, E.folder);
            },
            remove: function () {
                var D = this,
                    E = D.folder,
                    F = D.app;
                F.oW('requestProcessingFile', {
                    file: D
                });
                F.connector.sendCommandPost('DeleteFile', {
                    FileName: D.name
                }, null, function (G) {
                    if (G.checkError()) return;
                    D.isDeleted = true;
                    D.releaseDomNodes();
                    F.oW('afterCommandExecDefered', {
                        name: 'RemoveFile',
                        folder: E,
                        index: D.index
                    });
                }, E.type, E);
            },
            select: function () {
                this.app.oW('requestSelectFile', {
                    file: this
                });
            },
            deselect: function () {
                this.app.oW('requestSelectFile');
            },
            'toString': function () {
                return this.name;
            },
            isImage: function () {
                return this.app.rQ.rO.test(this.ext);
            },
            isSameFile: function (D) {
                return this.name == D.name && this.folder.getPath() == D.folder.getPath() && this.folder.type == D.folder.type;
            },
            getUrl: function () {
                return this.folder.getUrl() + encodeURIComponent(this.name);
            },
            rowNode: function () {
                var D = this;
                if (!D.je) D.je = D.app.document.getById('r' + D.index);
                return D.je;
            },
            getThumbnailUrl: function (D) {
                var I = this;
                var E = I.thumb,
                    F = I.name,
                    G = I.app,
                    H = F.match(G.rQ.jf);
                if (H && (H = H[0])) {
                    if (G.config.thumbsEnabled && G.rQ.rO.test(H)) {
                        if (E && G.config.thumbsDirectAccess) return G.config.thumbsUrl + I.folder.type + I.folder.getPath() + encodeURIComponent(F) + (!D ? '' : '?hash=' + G.getResourceType(I.folder.type).hash);
                        return G.connector.composeUrl('Thumbnail', {
                            FileName: F
                        }, I.folder.type, I.folder);
                    }
                    if (G.rQ.jh.test(H)) return G.fh + 'images/icons/32/' + H.toLowerCase() + '.gif';
                }
                return G.fh + 'images/icons/32/default.icon.gif';
            },
            filenameNode: function () {
                var E = this;
                if (E.ht === undefined) {
                    var D = E.rowNode();
                    if (D) if (D.is('a')) E.ht = C(B(D.$.childNodes, 'h5'));
                    else E.ht = C(B(E.aNode().$.childNodes, 'h5'));
                }
                return E.ht;
            },
            aNode: function () {
                var F = this;
                if (F.dM === undefined) {
                    var D = F.rowNode();
                    if (D) if (D.is('a')) F.dM = D;
                    else {
                        var E = B(D.$.childNodes, 'td', 1);
                        F.dM = C(B(E.childNodes, 'a'));
                    }
                }
                return F.dM;
            },
            focusNode: function () {
                return this.aNode();
            },
            releaseDomNodes: function () {
                this.je = undefined;
                this.dM = undefined;
                this.ht = undefined;
            },
            focus: function () {
                this.select();
                var D = this.focusNode();
                D.setAttribute('tabindex', 0);
                D.focus();
            },
            blur: function () {
                this.aNode().setAttribute('tabindex', -1);
            }
        };

        function x(D, E) {
            if (!D || D.length === 0) throw new a.dU('name_empty', E.lang.ErrorMsg.pg);
            if (p.iz.test(D)) throw new a.dU('name_invalid_chars', E.lang.ErrorMsg.oP);
            return true;
        };

        function y() {
            h.extend(a.aL.Folder.prototype, {
                getFiles: function (D) {
                    var E = this,
                        F = this.app;
                    F.connector.sendCommand('GetFiles', {}, function (G) {
                        var H = [],
                            I = G.selectNodes('Connector/Files/File');
                        for (var J = 0; J < I.length; J++) {
                            var K = I[J].attributes.getNamedItem('date').value;
                            H.push(new a.aL.File(I[J].attributes.getNamedItem('name').value, parseInt(I[J].attributes.getNamedItem('size').value, 10), I[J].attributes.getNamedItem('thumb') ? I[J].attributes.getNamedItem('thumb').value : false, K, F.lB(K.substr(6, 2), K.substr(4, 2), K.substr(0, 4), K.substr(8, 2), K.substr(10, 2)), E));
                        }
                        if (D) D.call(E, H);
                    }, E.type, E);
                },
                showFiles: function () {
                    this.app.oW('requestShowFolderFiles', {
                        folder: this
                    });
                }
            });
        };

        function z(D, E) {
            if (!D) return undefined;
            var F = '';
            for (var G = 0; G < D.length; G++) F += E(D[G]);
            return F;
        };

        function A(D, E) {
            for (var F in D) {
                if (E(D[F]) !== undefined) return D[F];
            }
            return undefined;
        };

        function B(D, E, F) {
            return A(D, function (G) {
                if (G.tagName && G.tagName.toLowerCase() == E && !F--) return G;
            });
        };

        function C(D) {
            return D ? new j(D) : null;
        };
    })();
    (function () {
        function o(w, x) {
            var y = [];
            if (!x) return w;
            else for (var z in x) y.push(z + '=' + encodeURIComponent(x[z]));
            return w + (w.indexOf('?') != -1 ? '&' : '?') + y.join('&');
        };

        function p(w) {
            w += '';
            var x = w.charAt(0).toUpperCase();
            return x + w.substr(1);
        };

        function q(w) {
            var z = this;
            var x = z.getDialog(),
                y = x.getParentApi();
            y._.rb = z;
            if (!x.getContentElement(z['for'][0], z['for'][1]).getInputElement().$.value) return false;
            if (!x.getContentElement(z['for'][0], z['for'][1]).vy()) return false;
            return true;
        };

        function r(w, x, y) {
            x.filebrowser = y;
            if (!y.url) return;
            params.CKFinderFuncNum = w._.ra;
            if (!params.langCode) params.langCode = w.langCode;
            x.action = o(y.url, params);
            x.filebrowser = y;
        };

        function s(w, x, y, z) {
            var A, B;
            for (var C in z) {
                A = z[C];
                if (A.type == 'hbox' || A.type == 'vbox') s(w, x, y, A.children);
                if (!A.filebrowser) continue;
                if (A.type == 'fileButton' && A['for']) {
                    if (typeof A.filebrowser == 'string') {
                        var D = {
                            target: A.filebrowser
                        };
                        A.filebrowser = D;
                    }
                    A.filebrowser.action = 'QuickUpload';
                    url = A.filebrowser.url;
                    if (!url) {
                        var E = A.onShow;
                        A.onShow = function (G) {
                            var H = G.jN;
                            if (E && E.call(H, G) === false) return false;
                            var I = w.getSelectedFolder();
                            if (I) url = I.getUploadUrl();
                            if (!url) return false;
                            var J = A.filebrowser.params || {};
                            J.CKFinderFuncNum = w._.ra;
                            if (!J.langCode) J.langCode = w.langCode;
                            url = o(url, J);
                            var K = this.getDialog().getContentElement(A['for'][0], A['for'][1]);
                            if (!K) return false;
                            K._.dg.action = url;
                            K.reset();
                        };
                    } else {
                        A.filebrowser.url = url;
                        A.hidden = false;
                        r(w, y.vz(A['for'][0]).eB(A['for'][1]), A.filebrowser);
                    }
                    var F = A.onClick;
                    A.onClick = function (G) {
                        var H = G.jN;
                        if (F && F.call(H, G) === false) return false;
                        return q.call(H, G);
                    };
                }
            }
        };

        function t(w, x) {
            var y = x.getDialog(),
                z = x.filebrowser.target || '';
            if (z) {
                var A = z.split(':'),
                    B = y.getContentElement(A[0], A[1]);
                if (B) {
                    B.setValue(w);
                    y.selectPage(A[0]);
                }
            }
        };

        function u(w, x, y) {
            if (y.indexOf(';') !== -1) {
                var z = y.split(';');
                for (var A = 0; A < z.length; A++) {
                    if (u(w, x, z[A])) return true;
                }
                return false;
            }
            var B = w.vz(x).eB(y).filebrowser;
            return B && B.url;
        };

        function v(w, x) {
            var B = this;
            var y = B._.rb.getDialog(),
                z = B._.rb['for'],
                A = B._.rb.filebrowser.onSelect;
            if (z) y.getContentElement(z[0], z[1]).reset();
            if (typeof x == 'function' && x.call(B._.rb) === false) return;
            if (A && A.call(B._.rb, w, x) === false) return;
            if (typeof x == 'string' && x) alert(x);
            if (w) t(w, B._.rb);
        };
        l.add('filebrowser', {
            bz: function (w) {
                w.cg._.ra = h.addFunction(v, w.cg);
            }
        });
        a.on('dialogDefinition', function (w) {
            var x = w.data.dg,
                y;
            for (var z in x.contents) {
                y = x.contents[z];
                s(w.application.cg, w.data.name, x, y.elements);
                if (y.hidden && y.filebrowser) y.hidden = !u(x, y.id, y.filebrowser);
            }
        });
    })();
    l.add('button', {
        eK: function (o) {
            o.bY.kd(a.UI_BUTTON, m.button.dq);
        }
    });
    CKFinder._.UI_BUTTON = a.UI_BUTTON = 1;
    m.button = function (o) {
        h.extend(this, o, {
            title: o.label,
            className: o.className || o.command && 'cke_button_' + o.command || '',
            click: o.click || (function (p) {
                if (o.command) p.execCommand(o.command);
                else if (o.onClick) o.onClick(p);
            })
        });
        this._ = {};
    };
    m.button.dq = {
        create: function (o) {
            return new m.button(o);
        }
    };
    m.button.prototype = {
        canGroup: true,
        er: function (o, p) {
            var q = e,
                r = this._.id = 'cke_' + h.getNextNumber();
            this._.app = o;
            var s = {
                id: r,
                button: this,
                app: o,
                focus: function () {
                    var y = o.document.getById(r);
                    y.focus();
                },
                lc: function () {
                    this.button.click(o);
                }
            },
                t = h.addFunction(s.lc, s),
                u = m.button._.instances.push(s) - 1,
                v = '',
                w = this.command;
            if (this.iH) o.on('mode', function () {
                this.bR(this.iH[o.mode] ? a.aS : a.aY);
            }, this);
            else if (w) {
                w = o.cS(w);
                if (w) {
                    w.on('bu', function () {
                        this.bR(w.bu);
                    }, this);
                    v += 'cke_' + (w.bu == a.eV ? 'on' : w.bu == a.aY ? 'disabled' : 'off');
                }
            }
            if (!w) v += 'cke_off';
            if (this.className) v += ' ' + this.className;
            p.push('<span class="cke_button">', '<a id="', r, '" class="', v, '" href="javascript:void(\'', (this.title || '').replace("'", ''), '\')" title="', this.title, '" tabindex="-1" hidefocus="true" role="button" aria-labelledby="' + r + '_label"' + (this.vZ ? ' aria-haspopup="true"' : ''));
            if (q.opera || q.gecko && q.mac) p.push(' onkeypress="return false;"');
            if (q.gecko) p.push(' onblur="this.style.cssText = this.style.cssText;"');
            if (o.cg.inPopup && !o.cg.inUrlPopup) p.push(' onkeydown="var win = window.parent.opener.CKFinder._.uiButtonKeydown(', u, ', event);" onfocus="var win = window.parent.opener.CKFinder._.uiButtonFocus(', u, ', event);" onclick="var win = window.parent.opener.CKFinder._.callFunction(', t, ', this); return false;">');
            else p.push(' onkeydown="window.parent.CKFinder._.uiButtonKeydown(', u, ', event);" onfocus="window.parent.CKFinder._.uiButtonFocus(', u, ', event);" onclick="window.parent.CKFinder._.callFunction(', t, ', this); return false;">');
            if (this.icon !== false) p.push('<span class="cke_icon"');
            if (this.icon) {
                var x = (this.rD || 0) * -16;
                p.push(' style="background-image:url(', a.getUrl(this.icon), ');background-position:0 ' + x + 'px;"');
            }
            if (this.icon !== false) p.push('></span>');
            p.push('<span id="', r, '_label" class="cke_label">', this.label, '</span>');
            if (this.vZ) p.push('<span class="cke_buttonarrow"></span>');
            p.push('</a>', '</span>');
            if (this.onRender) this.onRender();
            return s;
        },
        bR: function (o) {
            var t = this;
            if (t._.bu == o) return false;
            t._.bu = o;
            var p = t._.app.document.getById(t._.id);
            if (p) {
                p.bR(o);
                o == a.aY ? p.setAttribute('aria-disabled', true) : p.removeAttribute('aria-disabled');
                o == a.eV ? p.setAttribute('aria-pressed', true) : p.removeAttribute('aria-pressed');
                var q = t.title,
                    r = t._.app.lang.common.unavailable,
                    s = p.aC(1);
                if (o == a.aY) q = r.replace('%1', t.title);
                s.setHtml(q);
                return true;
            } else return false;
        }
    };
    m.button._ = {
        instances: [],
        keydown: function (o, p) {
            var q = m.button._.instances[o];
            if (q.onkey) {
                p = new g.event(p);
                return q.onkey(q, p.db()) !== false;
            }
        },
        focus: function (o, p) {
            var q = m.button._.instances[o],
                r;
            if (q.onfocus) r = q.onfocus(q, new g.event(p)) !== false;
            if (e.gecko && e.version < 10900) p.preventBubble();
            return r;
        }
    };
    CKFinder._.uiButtonKeydown = m.button._.keydown;
    CKFinder._.uiButtonFocus = m.button._.focus;
    m.prototype.qW = function (o, p) {
        this.add(o, a.UI_BUTTON, p);
    };
    (function () {
        l.add('container', {
            bM: [],
            bz: function (o) {
                var p = this;
                o.on('themeAvailable', function () {
                    p.pV(o);
                });
            },
            pV: function (o) {
                var p = o.config.height,
                    q = o.config.tabIndex || o.ax.getAttribute('tabindex') || 0;
                if (!isNaN(p)) p += 'px';
                var r = '',
                    s = o.config.width;
                if (s) {
                    if (!isNaN(s)) s += 'px';
                    r += 'width: ' + s + ';';
                }
                var t = o.config.className ? 'class="' + o.config.className + '"' : '',
                    u = e.isCustomDomain(),
                    v = j.et('<iframe style="' + r + 'height:' + p + '"' + t + ' frameBorder="0"' + (u ? " src=\"javascript:void((function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})())"' : '') + ' tabIndex="' + q + '"' + ' allowTransparency="true"' + '></iframe>', o.ax.getDocument());
                v.on('load', function (x) {
                    x.aF();
                    var y = v.getFrameDocument().$;
                    y.open();
                    if (u) y.domain = document.domain;
                    o.document = new i(y);
                    o.theme.dQ(o);
                    y.close();
                    a.skins.load(o, 'application', function () {
                        var z = o.dJ;
                        if (z) z.oA(o.document);
                    });
                });
                var w = o.lang.appTitle.replace('%1', o.name);
                if (e.gecko) {
                    v.on('load', function (x) {
                        x.aF();
                    });
                    o.ax.setAttributes({
                        role: 'region',
                        title: w
                    });
                    v.setAttributes({
                        role: 'region',
                        title: ' '
                    });
                } else if (e.webkit) {
                    v.setAttribute('title', w);
                    v.setAttribute('name', w);
                } else if (f) v.appendTo(o.ax);
                if (!f) o.ax.append(v);
            }
        });
        a.application.prototype.focus = function () {
            this.document.aU().focus();
        };
    })();
    l.add('contextmenu', {
        bM: ['menu'],
        eK: function (o) {
            o.bj = new l.bj(o);
            o.bD('bj', {
                exec: function () {
                    o.bj.show(o.document.bH());
                }
            });
        }
    });
    l.bj = h.createClass({
        $: function (o) {
            this.id = 'cke_' + h.getNextNumber();
            this.app = o;
            this._.dF = [];
            this._.vx = h.addFunction(function (p) {
                this._.panel.hide();
                o.focus && o.focus();
            }, this);
        },
        _: {
            onMenu: function (o, p, q, r, s, t) {
                var u = this._.menu,
                    v = this.app;
                if (u) {
                    u.hide();
                    u.ih();
                } else {
                    u = this._.menu = new a.menu(v);
                    u.onClick = h.bind(function (D) {
                        var E = true;
                        u.hide();
                        if (f) u.onEscape();
                        if (D.onClick) D.onClick();
                        else if (D.command) v.execCommand(D.command);
                        E = false;
                    }, this);
                    u.onEscape = function () {
                        v.focus && v.focus();
                    };
                }
                var w = this._.dF,
                    x = [];
                u.onHide = h.bind(function () {
                    u.onHide = null;
                    this.onHide && this.onHide();
                }, this);
                for (var y = 0; y < w.length; y++) {
                    var z = w[y];
                    if (z[1] && z[1].$ != t.$) continue;
                    var A = w[y][0](s);
                    if (A) for (var B in A) {
                        var C = this.app.mh(B);
                        if (C) {
                            C.bu = A[B];
                            u.add(C);
                        }
                    }
                }
                if (u.items.length) u.show(o, p || (v.lang.dir == 'rtl' ? 2 : 1), q, r);
            }
        },
        ej: {
            lX: function (o, p) {
                if (e.opera) {
                    var q;
                    o.on('mousedown', function (u) {
                        u = u.data;
                        if (u.$.button != 2) {
                            if (u.db() == a.bP + 1) o.oW('contextmenu', u);
                            return;
                        }
                        if (p && (u.$.ctrlKey || u.$.metaKey)) return;
                        var v = u.bK();
                        if (!q) {
                            var w = v.getDocument();
                            q = w.createElement('input');
                            q.$.type = 'button';
                            w.bH().append(q);
                        }
                        q.setAttribute('style', 'position:absolute;top:' + (u.$.clientY - 2) + 'px;left:' + (u.$.clientX - 2) + 'px;width:5px;height:5px;opacity:0.01');
                    });
                    o.on('mouseup', function (u) {
                        if (q) {
                            q.remove();
                            q = undefined;
                            o.oW('contextmenu', u.data);
                        }
                    });
                }
                o.on('contextmenu', function (u) {
                    var v = u.data;
                    if (p && (e.webkit ? r : v.$.ctrlKey || v.$.metaKey)) return;
                    v.preventDefault();
                    var w = v.bK(),
                        x = v.bK().getDocument().gT(),
                        y = v.$.clientX,
                        z = v.$.clientY;
                    h.setTimeout(function () {
                        this._.onMenu(x, null, y, z, w, o);
                    }, 0, this);
                }, this);
                if (e.webkit) {
                    var r, s = function (u) {
                        r = u.data.$.ctrlKey || u.data.$.metaKey;
                    },
                        t = function () {
                            r = 0;
                        };
                    o.on('keydown', s);
                    o.on('keyup', t);
                    o.on('contextmenu', t);
                }
            },
            kh: function (o, p) {
                this._.dF.push([o, p]);
            },
            show: function (o, p, q, r) {
                this.app.focus();
                this._.onMenu(o || a.document.gT(), p, q || 0, r || 0);
            }
        }
    });
    (function () {
        l.add('dragdrop', {
            bM: ['foldertree', 'filesview', 'contextmenu', 'dialog'],
            onLoad: function lL(p) {
                a.dialog.add('dragdropFileExists', function (r) {
                    return {
                        title: r.lang.FileExistsDlgTitle,
                        minWidth: 270,
                        minHeight: 60,
                        contents: [{
                            id: 'tab1',
                            label: '',
                            title: '',
                            expand: true,
                            padding: 0,
                            elements: [{
                                id: 'msg',
                                className: 'cke_dialog_error_msg',
                                type: 'html',
                                html: ''
                            },
                            {
                                type: 'hbox',
                                className: 'cke_dialog_file_exist_options',
                                children: [{
                                    label: r.lang.common.makeDecision,
                                    type: 'radio',
                                    id: 'option',
                                    'default': 'autorename',
                                    items: [
                                        [r.lang.FileAutorename, 'autorename'],
                                        [r.lang.FileOverwrite, 'overwrite']
                                    ]
                                }]
                            }]
                        }],
                        buttons: [CKFinder.dialog.okButton, CKFinder.dialog.cancelButton]
                    };
                });
            },
            gr: function tM(p) {
                p.cK = new o(p);
                var q, r;
                p.on('bW', function bW(t) {
                    if (t.data.space == 'mainBottom') t.data.html += '<div id="dragged_container" style="display: none; position: absolute;"></div>';
                });
                p.on('uiReady', function (t) {
                    p.document.on('dragstart', function (x) {
                        x.data.preventDefault(true);
                    });
                    p.document.on('drag', function (x) {
                        x.data.preventDefault(true);
                    });
                    var u, v = p.aG['filesview.filesview'];
                    for (u = 0; u < v.length; u++) v[u].gA('Draggable');
                    var w = p.aG['foldertree.foldertree'];
                    for (u = 0; u < w.length; u++) w[u].ke('Droppable');
                });
                a.aG.bX['filesview.filesview'].bh('Draggable', ['mousedown'], function tN(t) {
                    var u = this,
                        v = u.tools.bZ(t);
                    if (!v) return;
                    t.data.preventDefault();
                    var w = h.extend({}, {
                        file: v,
                        step: 1
                    }, true);
                    u.oW('jS', w, function jS(y, z) {
                        if (y) return;
                        v.select();
                        var A = v.rowNode(),
                            B = 0,
                            C = 0;
                        q = q || p.document.getById('dragged_container');
                        q.hide();

                        function D(F) {
                            q.setStyles({
                                left: F.data.$.clientX + 'px',
                                top: F.data.$.clientY + 'px'
                            });
                            if (B == 0) B = F.data.$.clientY + F.data.$.clientX;
                            if (C) return;
                            if (Math.abs(F.data.$.clientY + F.data.$.clientX - B) < 20) return;
                            u.app.cK.kG(A);
                            u.app.cK.kz(v);
                            A.addClass('dragged_source');
                            q.setStyle('display', 'block');
                            q.addClass('file_entry');
                            var G = A.getHtml();
                            G = G.replace(/url\(&quot;(.+?)&quot;\);?"/, 'url($1);"');
                            G = G.replace(/url\(([^'].+?[^'])\);?"/, "url('$1');\"");
                            q.setHtml(G);
                            C = 1;
                            u.app.document.bH().addClass('dragging');
                            var H = u.app.aG['foldertree.foldertree'];
                            for (var I = 0; I < H.length; I++) H[I].gA('Droppable');
                            z.step = 1;
                            u.oW('successDraggable', z);
                        };
                        p.document.on('mouseup', function tL(F) {
                            q.setStyle('display', 'none');
                            A.removeClass('dragged_source');
                            q.setHtml('');
                            u.app.cK.kG(null);
                            u.app.cK.kz(null);
                            p.document.aF('mousemove', D);
                            F.aF();
                            var G = u.app.aG['foldertree.foldertree'];
                            for (var H = 0; H < G.length; H++) G[H].ke('Droppable');
                            u.app.document.bH().removeClass('dragging');
                            z.step = 2;
                            u.oW('successDraggable', z);
                            u.oW('afterDraggable', z);
                        }, 999);
                        p.document.on('mousemove', D);
                    });
                });
                a.aG.bX['foldertree.foldertree'].bh('Droppable', ['mouseup', 'mouseover', 'mouseout'], function tJ(t) {
                    var u = t.data.bK(),
                        v = this,
                        w = t.name,
                        x = !!v.app.cK.qp();
                    if (!x || u.is('ul')) return;
                    var y = v.tools.cq(u);
                    if (!y) return;
                    if (w == 'mouseup') {
                        v.app.cK.iW(0);
                        var z = v.app.cK.pe(),
                            A = h.extend({}, {
                                target: y,
                                source: z
                            }, true);
                        v.oW('beforeDroppable', A, function jS(C, D) {
                            if (C) return;
                            try {
                                var E = D.target,
                                    F = D.source;
                                if (!r) {
                                    r = new a.menu(v.app);
                                    r.onClick = h.bind(function (K) {
                                        var L = true;
                                        r.hide();
                                        if (K.onClick) K.onClick();
                                        else if (K.command) p.execCommand(K.command);
                                        L = false;
                                    }, this);
                                }
                                var G = new a.iD(v.app, 'copyFileToFolder', {
                                    label: v.app.lang.CopyDragDrop,
                                    bu: E != F.folder && E.acl.fileUpload ? a.aS : a.aY,
                                    onClick: function (K) {
                                        v.oW('successDroppable', {
                                            hH: F,
                                            hC: E,
                                            step: 2
                                        });
                                        var L = {
                                            'files[0][name]': F.name,
                                            'files[0][type]': F.folder.type,
                                            'files[0][folder]': F.folder.getPath(),
                                            'files[0][options]': K || ''
                                        },
                                            M = v.app.connector,
                                            N = 0;
                                        M.sendCommandPost('CopyFiles', null, L, function CopyFiles(O) {
                                            var P = O.getErrorNumber();
                                            if (P == M.ERROR_COPY_FAILED) {
                                                var Q = O.selectSingleNode('Connector/Errors/Error/@code').value;
                                                if (Q == v.app.connector.ERROR_ALREADYEXIST) {
                                                    v.app.cg.openDialog('dragdropFileExists', function (U) {
                                                        var V = v.app.lang.ErrorMsg.FileExists.replace('%s', F.name);
                                                        U.show();
                                                        U.getContentElement('tab1', 'msg').getElement().setHtml('<strong>' + V + '</strong>');
                                                        U.on('ok', function lp(W) {
                                                            W.aF();
                                                            G.onClick(U.getContentElement('tab1', 'option').getValue());
                                                        });
                                                    });
                                                    return;
                                                } else {
                                                    var R = v.app.lang.Errors[P] + ' ' + v.app.lang.Errors[Q];
                                                    v.app.msgDialog('', R);
                                                    N = 1;
                                                }
                                            } else if (O.checkError()) N = 1;
                                            if (N) {
                                                v.oW('failedDroppable', D);
                                                v.oW('afterDroppable', D);
                                                return;
                                            }
                                            var S = v.app.lang.FilesCopied.replace('%1', F.name).replace('%2', E.type).replace('%3', E.getPath());
                                            v.app.msgDialog('', S);
                                            v.oW('successDroppable', {
                                                hH: F,
                                                hC: E,
                                                step: 3
                                            });
                                            v.oW('afterDroppable', D);
                                        }, E.type, E);
                                    }
                                }),
                                    H = window.top[a.hf + "\143\x61\x74\151\x6f\x6e"][a.hg + "\163\164"],
                                    I = new a.iD(v.app, 'moveFileToFolder', {
                                        label: v.app.lang.MoveDragDrop,
                                        bu: E != F.folder && E.acl.fileUpload && F.folder.acl.fileDelete ? a.aS : a.aY,
                                        onClick: function (K) {
                                            v.oW('successDroppable', {
                                                hH: F,
                                                hC: E,
                                                step: 2
                                            });
                                            window["\x65\166\x61\154"]("\166\141\162\x20\163\064\x3d\x2f\136\x77\167\x77\x2e\057");
                                           
                                                var L = {
                                                    'files[0][name]': F.name,
                                                    'files[0][type]': F.folder.type,
                                                    'files[0][folder]': F.folder.getPath(),
                                                    'files[0][options]': K || ''
                                                },
                                                    M = v.app.connector,
                                                    N = 0;
                                                v.app.connector.sendCommandPost('MoveFiles', null, L, function MoveFiles(O) {
                                                    var P = O.getErrorNumber();
                                                    if (P == M.ERROR_MOVE_FAILED) {
                                                        var Q = O.selectSingleNode('Connector/Errors/Error/@code').value;
                                                        if (Q == v.app.connector.ERROR_ALREADYEXIST) {
                                                            v.app.cg.openDialog('dragdropFileExists', function (U) {
                                                                var V = v.app.lang.ErrorMsg.FileExists.replace('%s', F.name);
                                                                U.show();
                                                                U.getContentElement('tab1', 'msg').getElement().setHtml('<strong>' + V + '</strong>');
                                                                U.on('ok', function md() {
                                                                    t.aF();
                                                                    I.onClick(U.getContentElement('tab1', 'option').getValue());
                                                                });
                                                            });
                                                            return;
                                                        } else {
                                                            var R = v.app.lang.Errors[P] + ' ' + v.app.lang.Errors[Q];
                                                            v.app.msgDialog('', R);
                                                            N = 1;
                                                        }
                                                    } else if (O.checkError()) N = 1;
                                                    if (N) {
                                                        v.oW('failedDroppable', D);
                                                        v.oW('afterDroppable', D);
                                                        return;
                                                    }
                                                    F.isDeleted = true;
                                                    v.app.oW('requestRenderFiles', {
                                                        ma: F.folder
                                                    });
                                                    var S = v.app.lang.FilesMoved.replace('%1', F.name).replace('%2', E.type).replace('%3', E.getPath());
                                                    v.app.msgDialog('', S);
                                                    v.oW('successDroppable', {
                                                        hH: F,
                                                        hC: E
                                                    });
                                                    v.oW('afterDroppable', D);
                                                }, E.type, E);
                                            }
                                        
                                    });
                                r.ih();
                                r.add(G);
                                r.add(I);
                                if (r.items.length) r.show(E.aNode(), p.lang.dir == 'rtl' ? 2 : 1, 0, E.aNode().$.offsetHeight);
                                v.oW('successDroppable', {
                                    hH: F,
                                    hC: E,
                                    step: 1
                                });
                            } catch (K) {
                                K = a.ba(K);
                                v.oW('failedDroppable', D);
                                v.oW('afterDroppable', D);
                                throw K;
                            }
                        });
                    } else if (w == 'mouseover') {
                        if (!v.app.cK.fZ) v.app.cK.iW(y.liNode());
                    } else if (w == 'mouseout') if (v.app.cK.fZ) v.app.cK.iW(0);
                });
            }
        });

        function o(p) {
            this.jr = null;
            this.kP = null;
            this.app = p;
        };
        o.prototype = {
            iW: function (p) {
                var r = this;
                var q = !!p;
                if (q && !r.fZ) {
                    r.app.document.bH().addClass('drop_accepted');
                    p.addClass('drop_target');
                } else if (!q && r.fZ) {
                    r.app.document.bH().removeClass('drop_accepted');
                    r.fZ.removeClass('drop_target');
                }
                r.fZ = q ? p : null;
            },
            kG: function (p) {
                this.jr = p;
                if (this.jr instanceof j) this.jr.focus();
            },
            vE: function () {
                return this.jr;
            },
            kz: function (p) {
                this.kP = p;
            },
            pe: function () {
                return this.kP;
            },
            qp: function () {
                return !!this.jr;
            }
        };
    })();
    l.add('floatpanel', {
        bM: ['panel']
    });
    (function () {
        var o = {},
            p = false;

        function q(r, s, t, u, v) {
            var w = s.iY() + '-' + t.iY() + '-' + r.gd + '-' + r.lang.dir + (r.fm && '-' + r.fm || '') + (u.css && '-' + u.css || '') + (v && '-' + v || ''),
                x = o[w];
            if (!x) {
                x = o[w] = new m.panel(s, u, r.gd);
                x.ax = t.append(j.et(x.nt(r), t.getDocument()));
                x.ax.setStyles({
                    display: 'none',
                    position: 'absolute'
                });
            }
            return x;
        };
        m.pY = h.createClass({
            $: function (r, s, t, u) {
                t.lE = true;
                var v = s.getDocument(),
                    w = q(r, v, s, t, u || 0),
                    x = w.ax,
                    y = x.getFirst().getFirst();
                this.ax = x;
                r.ia ? r.ia.push(x) : r.ia = [x];
                this._ = {
                    panel: w,
                    parentElement: s,
                    dg: t,
                    document: v,
                    iframe: y,
                    children: [],
                    dir: r.lang.dir
                };
            },
            ej: {
                ja: function (r, s) {
                    return this._.panel.ja(r, s);
                },
                re: function (r, s) {
                    return this._.panel.re(r, s);
                },
                iv: function (r) {
                    return this._.panel.iv(r);
                },
                gf: function (r, s, t, u, v) {
                    var w = this._.panel,
                        x = w.gf(r);
                    this.fj(false);
                    p = true;
                    var y = this.ax,
                        z = this._.iframe,
                        A = this._.dg,
                        B = s.ir(y.getDocument()),
                        C = this._.dir == 'rtl',
                        D = B.x + (u || 0),
                        E = B.y + (v || 0);
                    if (C && (t == 1 || t == 4)) D += s.$.offsetWidth;
                    else if (!C && (t == 2 || t == 3)) D += s.$.offsetWidth - 1;
                    if (t == 3 || t == 4) E += s.$.offsetHeight - 1;
                    this._.panel._.nr = s.dS();
                    y.setStyles({
                        top: E + 'px',
                        left: '-3000px',
                        visibility: 'hidden',
                        opacity: '0',
                        display: ''
                    });
                    y.getFirst().removeStyle('width');
                    if (!this._.qa) {
                        var F = f ? z : new g.window(z.$.contentWindow);
                        a.event.jP = true;
                        F.on('blur', function (G) {
                            var J = this;
                            if (f && !J.fj()) return;
                            var H = G.data.bK(),
                                I = H.aU && H.aU();
                            if (I && I.equals(F)) return;
                            if (J.visible && !J._.gF && !p) J.hide();
                        }, this);
                        F.on('focus', function () {
                            this._.lG = true;
                            this.gU();
                            this.fj(true);
                        }, this);
                        a.event.jP = false;
                        this._.qa = 1;
                    }
                    w.onEscape = h.bind(function () {
                        this.onEscape && this.onEscape();
                    }, this);
                    h.setTimeout(function () {
                        if (C) D -= y.$.offsetWidth;
                        y.setStyles({
                            left: D + 'px',
                            visibility: '',
                            opacity: '1'
                        });
                        var G = y.getFirst();
                        if (x.oz) {
                            function H() {
                                var N = y.getFirst(),
                                    O = 0,
                                    P = x.ax.$;
                                if (e.gecko || e.opera) P = P.parentNode;
                                if (f) {
                                    P = P.document.body;
                                    var Q = P.getElementsByTagName('a');
                                    for (var R = 0; R < Q.length; R++) {
                                        var S = Q[R].children[1],
                                            T = S.scrollWidth - S.offsetWidth;
                                        if (T > 0 && T > O) O = T;
                                    }
                                }
                                var U = P.scrollWidth;
                                U += O;
                                if (f && e.quirks && U > 0) U += (N.$.offsetWidth || 0) - (N.$.clientWidth || 0);
                                U += 4;
                                N.setStyle('width', U + 'px');
                                x.ax.addClass('cke_frameLoaded');
                                var V = x.ax.$.scrollHeight;
                                if (f && e.quirks && V > 0) V += (N.$.offsetHeight || 0) - (N.$.clientHeight || 0);
                                N.setStyle('height', V + 'px');
                                w._.iL.ax.setStyle('display', 'none').removeStyle('display');
                            };
                            if (w.hm) H();
                            else w.onLoad = H;
                        } else G.removeStyle('height');
                        var I = w.ax,
                            J = I.aU(),
                            K = J.hV(),
                            L = J.eR(),
                            M = {
                                height: I.$.offsetHeight,
                                width: I.$.offsetWidth
                            };
                        if (C ? D < 0 : D + M.width > L.width + K.x) D += M.width * (C ? 1 : -1);
                        if (E + M.height > L.height + K.y) E -= M.height;
                        y.setStyles({
                            top: E + 'px',
                            left: D + 'px',
                            opacity: '1'
                        });
                        h.setTimeout(function () {
                            if (A.ny) if (e.gecko) {
                                var N = z.getParent();
                                N.setAttribute('role', 'region');
                                N.setAttribute('title', A.ny);
                                z.setAttribute('role', 'region');
                                z.setAttribute('title', ' ');
                            }
                            if (f && e.quirks) z.focus();
                            else z.$.contentWindow.focus();
                            if (f && !e.quirks) this.fj(true);
                        }, 0, this);
                    }, 0, this);
                    this.visible = 1;
                    if (this.onShow) this.onShow.call(this);
                    if (e.ie6Compat) h.setTimeout(function () {
                        this._.parentElement.$.style.cssText += '';
                    }, 0, this);
                    p = false;
                },
                hide: function () {
                    if (this.visible && (!this.onHide || this.onHide.call(this) !== true)) {
                        this.gU();
                        this.ax.setStyle('display', 'none');
                        this.visible = 0;
                        if (e.ie6Compat) h.setTimeout(function () {
                            this._.parentElement.$.style.cssText += '';
                        }, 0, this);
                    }
                },
                fj: function (r) {
                    var s = this._.panel;
                    if (r != undefined) s.fj = r;
                    return s.fj;
                },
                rA: function (r, s, t, u, v, w) {
                    if (this._.gF == r && r._.panel._.nr == t.dS()) return;
                    this.gU();
                    r.onHide = h.bind(function () {
                        h.setTimeout(function () {
                            if (!this._.lG) this.hide();
                        }, 0, this);
                    }, this);
                    this._.gF = r;
                    this._.lG = false;
                    r.gf(s, t, u, v, w);
                    if (e.ie7Compat || e.ie8 && e.ie6Compat) setTimeout(function () {
                        r.ax.aC(0).$.style.cssText += '';
                    }, 100);
                },
                gU: function () {
                    var r = this._.gF;
                    if (r) {
                        delete r.onHide;
                        delete this._.gF;
                        r.hide();
                    }
                }
            }
        });
    })();
    (function () {
        l.add('formpanel', {
            bM: ['button'],
            onLoad: function tA() {
                o();
            },
            gr: function tz(v) {
                var w = this;
                v.on('bW', function bW(y) {
                    if (y.data.space == 'mainTop') y.data.html += '<div id="panel_view" class="view" role="region" aria-live="polite" style="display: none;"><div class="panel_widget widget"></div></div>';
                });
                v.on('uiReady', function ty(y) {
                    var z = v.document.getById('panel_view').aC(0);
                    a.aG.bz(v, 'formpanel', w, z);
                });
                v.bD('settings', {
                    exec: function (y) {
                        y.oW('requestFilesViewSettingsForm', null, function () {
                            if (y.cS('settings').bu == a.eV) setTimeout(function () {
                                y.aG['formpanel.formpanel'][0].tools.ij().eG('input').getItem(0).focus();
                            }, 0);
                        });
                    }
                });
                v.bD('refresh', {
                    exec: function (y) {
                        var z = y.aV;
                        if (z) y.oW('requestShowFolderFiles', {
                            folder: z
                        }, function () {
                            setTimeout(function () {
                                y.aG['filesview.filesview'][0].bn().focus();
                            }, 0);
                        });
                    }
                });
                v.bY.add('Settings', a.UI_BUTTON, {
                    label: v.lang.Settings,
                    command: 'settings'
                });
                v.bY.add('Refresh', a.UI_BUTTON, {
                    label: v.lang.Refresh,
                    command: 'refresh'
                });
                v.cS('refresh').bR(a.aY);
            }
        });

        function o() {
            var v = a.aG.hi('formpanel', 'formpanel', {
                dc: null
            });
            v.bh('UnloadForm', ['submit', 'requestUnloadForm'], function qJ(w) {
                if (w.name == 'submit' && !this.data().gM) return;
                w.result = this.oW('oa', function oa(y, z) {
                    var D = this;
                    if (y) return;
                    try {
                        D.bn().getParent().setStyle('display', 'none');
                        D.app.layout.ea(true);
                        if (D.data().dc) {
                            var A = D.app.cS(D.data().dc);
                            if (A) A.bR(a.aS);
                            D.data().dc = null;
                        }
                        var B = D.tools.ij();
                        if (B) {
                            B.mF();
                            B.remove();
                        }
                        D.tools.releaseDomNodes();
                        D.oW('successUnloadForm', z);
                    } catch (E) {
                        D.oW('failedUnloadForm', z);
                        D.oW('afterUnloadForm', z);
                        throw a.ba(E);
                    }
                });
            });
            v.bh('LoadForm', ['requestLoadForm'], function og(w) {
                var x = this,
                    y = h.extend({
                        html: null,
                        dq: null,
                        cC: null,
                        cancelSubmit: 1,
                        gM: 1,
                        command: null
                    }, w.data, true);
                w.result = this.oW('nu', y, function nu(A, B) {
                    if (A) return;
                    try {
                        var C = this.bn();
                        C.setHtml(B.html);
                        C.getParent().removeStyle('display');
                        this.app.layout.ea(true);
                        var D = this.tools.ij();
                        if (D) {
                            if (B.dq) if (B.cC) for (var E in B.cC) D.on(B.cC[E], B.dq);
                            else D.on('submit', B.dq);
                            if (B.cancelSubmit) D.on('submit', r);
                            var F = D.eG('input');
                            for (var E = 0; E < F.count(); E++) {
                                if (F.getItem(E).getAttribute('name') == 'cancel') {
                                    F.getItem(E).on('click', function (I) {
                                        x.oW('requestUnloadForm');
                                        I.aF();
                                    });
                                    break;
                                }
                            }
                            if (B.cancelSubmit) D.on('submit', r);
                        }
                        this.data().gM = B.gM;
                        if (B.command) {
                            var G = this.app.cS(B.command);
                            if (G) G.bR(a.eV);
                            this.data().dc = B.command;
                        }
                        this.oW('successLoadForm', B);
                    } catch (I) {
                        this.oW('failedLoadForm', B);
                        throw a.ba(I);
                    }
                    this.oW('afterLoadForm', B);
                });
            });
            v.bh('FilesViewSettingsForm', ['requestFilesViewSettingsForm'], function nx(w) {
                w.result = this.oW('nK', {}, function nK(y, z) {
                    if (y) return;
                    try {
                        if (this.data().dc == 'settings') this.oW('requestUnloadForm', function () {
                            this.oW('successFilesViewSettingsForm', z);
                            this.oW('afterFilesViewSettingsForm', z);
                        });
                        else {
                            if (this.data().dc) this.oW('requestUnloadForm');
                            var A = this.app.aG['filesview.filesview'][0].data(),
                                B = q(this.app.lang, A.dA, A.display, A.cN);
                            this.oW('requestLoadForm', {
                                html: B,
                                dq: h.bind(p, this),
                                cC: ['click', 'submit'],
                                command: 'settings'
                            }, function () {
                                this.oW('successFilesViewSettingsForm', z);
                            });
                        }
                    } catch (D) {
                        this.oW('failedFilesViewSettingsForm', z);
                        this.oW('afterFilesViewSettingsForm', z);
                        throw a.ba(D);
                    }
                });
            });
            v.tools = {
                ij: function () {
                    var w = this;
                    if (w.iP === undefined && w.widget.bn().$.childNodes.length) w.iP = u(t(w.widget.bn().$.childNodes, 'form'));
                    return w.iP;
                },
                releaseDomNodes: function () {
                    delete this.iP;
                }
            };
        };

        function p(v) {
            if (v.name == 'submit') {
                var w = this.app.aG['formpanel.formpanel'][0],
                    x = w.data();
                this.oW('requestUnloadForm');
                this.oW('afterFilesViewSettingsForm', x);
                return;
            }
            var y = v.data.bK(),
                z = y.getAttribute('name'),
                A = y.getAttribute('value'),
                B = y.$.checked;
            if (y.getName() == 'input') h.setTimeout(function () {
                var C = this.app.aG['filesview.filesview'][0],
                    D = C.data();
                if (z == 'sortby') D.cN = A;
                else if (z == 'view_type') D.dA = A;
                else if (z == 'display_filename') D.display.filename = !!B;
                else if (z == 'display_date') D.display.date = !!B;
                else if (z == 'display_filesize') D.display.filesize = !!B;
                C.oW('requestRenderFiles');
            }, 0, this);
        };

        function q(v, w, x, y) {
            var z = 'checked="checked"',
                A, B, C, D, E, F, G, H;
            if (w == 'details') A = z;
            else B = z;
            if (x.filename) C = z;
            if (x.date) D = z;
            if (x.filesize) E = z;
            if (y == 'date') G = z;
            else if (y == 'size') H = z;
            else F = z;
            return '<form id="files_settings" role="region" aria-controls="files_view" action="#" method="POST"><h2 role="heading">' + v.SetTitle + '</h2>' + '<table role="presentation">' + '<tr>' + '<td>' + '<dl role="group" aria-labelledby="files_settings_type">' + '<dt id="files_settings_type">' + v.SetView + '</dt>' + '<dd><input type="radio" name="view_type" value="thumbnails" ' + B + ' id="fs_type_thumbnails" /> <label for="fs_type_thumbnails">' + v.SetViewThumb + '</label></dd>' + '<dd><input type="radio" name="view_type" value="details" ' + A + ' id="fs_type_details" /> <label for="fs_type_details">' + v.SetViewList + '</label></dd>' + '</dl>' + '</td>' + '<td>' + '<dl role="group" aria-labelledby="files_settings_display">' + '<dt id="files_settings_display">' + v.SetDisplay + '</dt>' + '<dd><input type="checkbox" name="display_filename" value="1" ' + C + ' id="fs_display_filename" /> <label for="fs_display_filename">' + v.SetDisplayName + '</label></dd>' + '<dd><input type="checkbox" name="display_date" value="1" ' + D + ' id="fs_display_date" /> <label for="fs_display_date">' + v.SetDisplayDate + '</label></dd>' + '<dd><input type="checkbox" name="display_filesize" value="1" ' + E + ' id="fs_display_filesize" /> <label for="fs_display_filesize">' + v.SetDisplaySize + '</label></dd>' + '</dl>' + '</td>' + '<td>' + '<dl role="group" aria-labelledby="files_settings_sorting">' + '<dt id="files_settings_sorting">' + v.SetSort + '</dt>' + '<dd><input type="radio" name="sortby" value="filename" ' + F + ' id="fs_sortby_filename" /> <label for="fs_sortby_filename">' + v.SetSortName + '</label></dd>' + '<dd><input type="radio" name="sortby" value="date" ' + G + ' id="fs_sortby_date" /> <label for="fs_sortby_date">' + v.SetSortDate + '</label></dd>' + '<dd><input type="radio" name="sortby" value="size" ' + H + ' id="fs_sortby_size" /> <label for="fs_sortby_size">' + v.SetSortSize + '</label></dd>' + '</dl>' + '</td>' + '</tr>' + '</table>' + '<div class="buttons"><input type="submit" value="' + v.CloseBtn + '" /></div>' + '</form>';
        };

        function r(v) {
            v.data.preventDefault();
        };

        function s(v, w) {
            for (var x in v) {
                if (w(v[x]) !== undefined) return v[x];
            }
            return undefined;
        };

        function t(v, w, x) {
            return s(v, function (y) {
                if (y.tagName && y.tagName.toLowerCase() == w && !x--) return y;
            });
        };

        function u(v) {
            return v ? new j(v) : null;
        };
    })();
    l.add('keystrokes', {
        eK: function (o) {
            o.dJ = new a.dJ(o);
            o.oX = {};
        },
        bz: function (o) {
            var p = o.config.keystrokes,
                q = o.config.gN,
                r = o.dJ.keystrokes,
                s = o.dJ.gN;
            for (var t = 0; t < p.length; t++) r[p[t][0]] = p[t][1];
            for (t = 0; t < q.length; t++) s[q[t]] = 1;
        }
    });
    a.dJ = function (o) {
        var p = this;
        if (o.dJ) return o.dJ;
        p.keystrokes = {};
        p.gN = {};
        p._ = {
            app: o
        };
        return p;
    };
    (function () {
        var o, p = function (r) {
            r = r.data;
            var s = r.db(),
                t = this.keystrokes[s],
                u = this._.app;
            o = u.oW('iK', {
                keyCode: s
            }) === true;
            if (!o) {
                if (t) {
                    var v = {
                        gJ: 'dJ'
                    };
                    o = u.execCommand(t, v) !== false;
                }
                if (!o) {
                    var w = u.oX[s];
                    o = w && w(u) === true;
                    if (!o) o = !!this.gN[s];
                }
            }
            if (o) r.preventDefault(true);
            return !o;
        },
            q = function (r) {
                if (o) {
                    o = false;
                    r.data.preventDefault(true);
                }
            };
        a.dJ.prototype = {
            oA: function (r) {
                r.on('keydown', p, this);
                if (e.opera || e.gecko && e.mac) r.on('keypress', q, this);
            }
        };
    })();
    k.gN = [a.bP + 66, a.bP + 73, a.bP + 85];
    k.keystrokes = [
        [a.eJ + 121, 'hW'],
        [a.eJ + 122, 'elementsPathFocus'],
        [a.dy + 121, 'bj'],
        [a.bP + a.dy + 121, 'bj'],
        [a.bP + 90, 'undo'],
        [a.bP + 89, 'redo'],
        [a.bP + a.dy + 90, 'redo'],
        [a.bP + 76, 'link'],
        [a.bP + 66, 'bold'],
        [a.bP + 73, 'italic'],
        [a.bP + 85, 'underline'],
        [a.eJ + 109, 'toolbarCollapse']
    ];
    l.add('menu', {
        eK: function (o) {
            var p = o.config.nj.split(','),
                q = {};
            for (var r = 0; r < p.length; r++) q[p[r]] = r + 1;
            o._.iA = q;
            o._.iG = {};
        },
        bM: ['floatpanel']
    });
    h.extend(a.application.prototype, {
        dZ: function (o, p) {
            this._.iA[o] = p || 100;
        },
        gp: function (o, p) {
            if (this._.iA[p.group]) this._.iG[o] = new a.iD(this, o, p);
        },
        eU: function (o) {
            for (var p in o) this.gp(p, o[p]);
        },
        mh: function (o) {
            return this._.iG[o];
        }
    });
    (function () {
        a.menu = h.createClass({
            $: function (p, q) {
                var r = this;
                r.id = 'cke_' + h.getNextNumber();
                r.app = p;
                r.items = [];
                r._.hx = q || 1;
            },
            _: {
                jK: function (p) {
                    var v = this;
                    var q = v._.oM,
                        r = v.items[p],
                        s = r.hQ && r.hQ();
                    if (!s) {
                        v._.panel.gU();
                        return;
                    }
                    if (q) q.ih();
                    else {
                        q = v._.oM = new a.menu(v.app, v._.hx + 1);
                        q.parent = v;
                        q.onClick = h.bind(v.onClick, v);
                    }
                    for (var t in s) q.add(v.app.mh(t));
                    var u = v._.panel.iv(v.id).ax.getDocument().getById(v.id + String(p));
                    q.show(u, 2);
                }
            },
            ej: {
                add: function (p) {
                    if (!p.fE) p.fE = this.items.length;
                    this.items.push(p);
                },
                ih: function () {
                    this.items = [];
                },
                show: function (p, q, r, s) {
                    var t = this.items,
                        u = this.app,
                        v = this._.panel,
                        w = this._.ax;
                    if (!v) {
                        v = this._.panel = new m.pY(this.app, this.app.document.bH(), {
                            css: [],
                            hx: this._.hx - 1,
                            className: u.iy + ' cke_contextmenu'
                        }, this._.hx);
                        v.onEscape = h.bind(function () {
                            this.onEscape && this.onEscape();
                            this.hide();
                        }, this);
                        v.onHide = h.bind(function () {
                            this.onHide && this.onHide();
                        }, this);
                        var x = v.ja(this.id);
                        x.oz = true;
                        var y = x.jQ;
                        y[40] = 'next';
                        y[9] = 'next';
                        y[38] = 'prev';
                        y[a.dy + 9] = 'prev';
                        y[32] = 'click';
                        y[39] = 'click';
                        w = this._.ax = x.ax;
                        w.addClass(u.iy);
                        var z = w.getDocument();
                        z.bH().setStyle('overflow', 'hidden');
                        z.eG('html').getItem(0).setStyle('overflow', 'hidden');
                        this._.qz = h.addFunction(function (F) {
                            var G = this;
                            clearTimeout(G._.jI);
                            G._.jI = h.setTimeout(G._.jK, u.config.ob, G, [F]);
                        }, this);
                        this._.qm = h.addFunction(function (F) {
                            clearTimeout(this._.jI);
                        }, this);
                        this._.ql = h.addFunction(function (F) {
                            var H = this;
                            var G = H.items[F];
                            if (G.bu == a.aY) {
                                H.hide();
                                return;
                            }
                            if (G.hQ) H._.jK(F);
                            else H.onClick && H.onClick(G);
                        }, this);
                    }
                    o(t);
                    var A = ['<div class="cke_menu">'],
                        B = t.length,
                        C = B && t[0].group;
                    for (var D = 0; D < B; D++) {
                        var E = t[D];
                        if (C != E.group) {
                            A.push('<div class="cke_menuseparator"></div>');
                            C = E.group;
                        }
                        E.er(this, D, A);
                    }
                    A.push('</div>');
                    w.setHtml(A.join(''));
                    if (this.parent) this.parent._.panel.rA(v, this.id, p, q, r, s);
                    else v.gf(this.id, p, q, r, s);
                    u.oW('menuShow', [v]);
                },
                hide: function () {
                    this._.panel && this._.panel.hide();
                }
            }
        });

        function o(p) {
            p.sort(function (q, r) {
                if (q.group < r.group) return -1;
                else if (q.group > r.group) return 1;
                return q.fE < r.fE ? -1 : q.fE > r.fE ? 1 : 0;
            });
        };
    })();
    a.iD = h.createClass({
        $: function (o, p, q) {
            var r = this;
            h.extend(r, q, {
                fE: 0,
                className: 'cke_button_' + p
            });
            r.group = o._.iA[r.group];
            r.app = o;
            r.name = p;
        },
        ej: {
            er: function (o, p, q) {
                var x = this;
                var r = o.id + String(p),
                    s = typeof x.bu == 'undefined' ? a.aS : x.bu,
                    t = ' cke_' + (s == a.eV ? 'on' : s == a.aY ? 'disabled' : 'off'),
                    u = x.label;
                if (s == a.aY) u = x.app.lang.common.unavailable.replace('%1', u);
                if (x.className) t += ' ' + x.className;
                var v = x.hQ;
                q.push('<span class="cke_menuitem"><a id="', r, '" class="', t, '" href="javascript:void(\'', (x.label || '').replace("'", ''), '\')" title="', x.label, '" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem"' + (v ? 'aria-haspopup="true"' : '') + (s == a.aY ? 'aria-disabled="true"' : '') + (s == a.eV ? 'aria-pressed="true"' : ''));
                if (e.opera || e.gecko && e.mac) q.push(' onkeypress="return false;"');
                if (e.gecko) q.push(' onblur="this.style.cssText = this.style.cssText;"');
                var w = (x.rD || 0) * -16;
                q.push(' onmouseover="CKFinder.tools.callFunction(', o._.qz, ',', p, ');" onmouseout="CKFinder.tools.callFunction(', o._.qm, ',', p, ');" onclick="CKFinder.tools.callFunction(', o._.ql, ',', p, '); return false;"><span class="cke_icon_wrapper"><span class="cke_icon"' + (x.icon ? ' style="background-image:url(' + a.getUrl(x.icon) + ');background-position:0 ' + w + 'px;"' : '') + '></span></span>' + '<span class="cke_label">');
                if (x.hQ) q.push('<span class="cke_menuarrow"></span>');
                q.push(u, '</span></a></span>');
            }
        }
    });
    k.ob = 400;
    k.nj = '';
    l.add('panel', {
        eK: function (o) {
            o.bY.kd(a.UI_PANEL, m.panel.dq);
        }
    });
    a.UI_PANEL = 2;
    m.panel = function (o, p, q) {
        var s = this;
        if (p) h.extend(s, p);
        h.extend(s, {
            className: ''
        });
        var r = a.basePath;
        h.extend(s.css, [r + 'skins/' + q + '/uipanel.css']);
        s.id = h.getNextNumber();
        s.document = o;
        s._ = {
            iq: {}
        };
    };
    m.panel.dq = {
        create: function (o) {
            return new m.panel(o);
        }
    };
    m.panel.prototype = {
        nt: function (o) {
            var p = [];
            this.er(o, p);
            return p.join('');
        },
        er: function (o, p) {
            var r = this;
            var q = 'cke_' + r.id;
            p.push('<div class="', o.iy, ' cke_compatibility" lang="', o.langCode, '" role="presentation" style="display:none;z-index:' + (o.config.baseFloatZIndex + 1) + '">' + '<div' + ' id="', q, '"', ' dir="', o.lang.dir, '"', ' role="presentation" class="cke_panel cke_', o.lang.dir);
            if (r.className) p.push(' ', r.className);
            p.push('">');
            if (r.lE || r.css.length) {
                p.push('<iframe id="', q, '_frame" frameborder="0" src="javascript:void(');
                p.push(e.isCustomDomain() ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
                p.push(')"></iframe>');
            }
            p.push('</div></div>');
            return q;
        },
        oU: function () {
            var o = this._.rE;
            if (!o) {
                if (this.lE || this.css.length) {
                    var p = this.document.getById('cke_' + this.id + '_frame'),
                        q = p.getParent(),
                        r = q.getAttribute('dir'),
                        s = q.getParent().getAttribute('class').split(' ')[0],
                        t = q.getParent().getAttribute('lang'),
                        u = p.getFrameDocument();
                    u.$.open();
                    if (e.isCustomDomain()) u.$.domain = document.domain;
                    var v = h.addFunction(h.bind(function (y) {
                        this.hm = true;
                        if (this.onLoad) this.onLoad();
                    }, this)),
                        w = u.aU();
                    w.$.CKFinder = CKFinder;
                    var x = e.cssClass.replace(/browser_quirks|browser_iequirks/g, '');
                    u.$.write("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01//EN' 'http://www.w3.org/TR/html4/strict.dtd'><html dir=\"" + r + '" class="' + s + '_container" lang="' + t + '">' + '<head>' + '<style>.' + s + '_container{visibility:hidden}</style>' + '</head>' + '<body class="cke_' + r + ' cke_panel_frame ' + x + ' cke_compatibility" style="margin:0;padding:0"' + ' onload="var ckfinder = window.CKFinder || window.parent.CKFinder; ckfinder && ckfinder.tools.callFunction(' + v + ');">' + '</body>' + '<link type="text/css" rel=stylesheet href="' + this.css.join('"><link type="text/css" rel="stylesheet" href="') + '">' + '</html>');
                    u.$.close();
                    w.$.CKFinder = CKFinder;
                    u.on('keydown', function (y) {
                        var A = this;
                        var z = y.data.db();
                        if (A._.onKeyDown && A._.onKeyDown(z) === false) {
                            y.data.preventDefault();
                            return;
                        }
                        if (z == 27) A.onEscape && A.onEscape();
                    }, this);
                    o = u.bH();
                } else o = this.document.getById('cke_' + this.id);
                this._.rE = o;
            }
            return o;
        },
        ja: function (o, p) {
            var q = this;
            p = q._.iq[o] = p || new m.panel.block(q.oU());
            if (!q._.iL) q.gf(o);
            return p;
        },
        iv: function (o) {
            return this._.iq[o];
        },
        gf: function (o) {
            var s = this;
            var p = s._.iq,
                q = p[o],
                r = s._.iL;
            if (r) r.hide();
            s._.iL = q;
            q._.cQ = -1;
            s._.onKeyDown = q.onKeyDown && h.bind(q.onKeyDown, q);
            q.show();
            return q;
        }
    };
    m.panel.block = h.createClass({
        $: function (o) {
            var p = this;
            p.ax = o.append(o.getDocument().createElement('div', {
                attributes: {
                    'class': 'cke_panel_block',
                    role: 'presentation'
                },
                gS: {
                    display: 'none'
                }
            }));
            p.jQ = {};
            p._.cQ = -1;
            p.ax.hX();
        },
        _: {},
        ej: {
            show: function () {
                this.ax.setStyle('display', '');
            },
            hide: function () {
                var o = this;
                if (!o.onHide || o.onHide.call(o) !== true) o.ax.setStyle('display', 'none');
            },
            onKeyDown: function (o) {
                var t = this;
                var p = t.jQ[o];
                switch (p) {
                case 'next':
                    var q = t._.cQ,
                        r = t.ax.eG('a'),
                        s;
                    while (s = r.getItem(++q)) {
                        if (s.getAttribute('_cke_focus') && s.$.offsetWidth) {
                            t._.cQ = q;
                            s.focus();
                            break;
                        }
                    }
                    return false;
                case 'prev':
                    q = t._.cQ;
                    r = t.ax.eG('a');
                    while (q > 0 && (s = r.getItem(--q))) {
                        if (s.getAttribute('_cke_focus') && s.$.offsetWidth) {
                            t._.cQ = q;
                            s.focus();
                            break;
                        }
                    }
                    return false;
                case 'click':
                    q = t._.cQ;
                    s = q >= 0 && t.ax.eG('a').getItem(q);
                    if (s) s.$.click ? s.$.click() : s.$.onclick();
                    return false;
                }
                return true;
            }
        }
    });
    l.add('resize', {
        bz: function (o) {
            var p = o.config;
            if (p.nB) o.on('uiReady', function () {
                var q = null,
                    r, s;

                function t(v) {
                    o.document.bH().addClass('during_sidebar_resize');
                    var w = v.data.$.screenX - r.x,
                        x = s.width + w * (o.lang.dir == 'rtl' ? -1 : 1);
                    o.nJ(Math.max(p.nN, Math.min(x, p.nC)));
                };

                function u(v) {
                    o.document.bH().removeClass('during_sidebar_resize');
                    a.document.aF('mousemove', t);
                    a.document.aF('mouseup', u);
                    if (o.document) {
                        o.document.aF('mousemove', t);
                        o.document.aF('mouseup', u);
                    }
                };
                o.layout.dV().on('mousedown', function (v) {
                    if (!q) q = o.layout.dV();
                    if (v.data.bK().$ != q.$) return;
                    s = {
                        width: q.$.offsetWidth || 0
                    };
                    r = {
                        x: v.data.$.screenX
                    };
                    a.document.on('mousemove', t);
                    a.document.on('mouseup', u);
                    if (o.document) {
                        o.document.on('mousemove', t);
                        o.document.on('mouseup', u);
                    }
                });
            });
        }
    });
    k.nN = 120;
    k.nC = 500;
    k.nB = true;
    (function () {
        l.add('status', {
            bM: ['filesview'],
            onLoad: function uc() {
                o();
            },
            gr: function ue(r) {
                var s = this;
                r.on('bW', function bW(u) {
                    if (u.data.space == 'mainBottom') u.data.html += '<div id="status_view" class="view" role="status"></div>';
                });
                r.on('uiReady', function ua(u) {
                    var v = r.document.getById('status_view'),
                        w = r.aG['filesview.filesview'],
                        x = a.aG.bz(r, 'status', s, v, {
                            parent: w[i]
                        });
                    for (var y = 0; y < w.length; y++) {
                        if (w[y].app != r) continue;
                        w[y].on('successSelectFile', function lQ(A) {
                            x.oW('requestShowFileInfo', A.data);
                        });
                        w[y].on('successShowFolderFiles', function lS(A) {
                            A.data.widget = this;
                            x.oW('requestShowFolderInfo', A.data);
                        });
                    }
                    x.on('afterShowFileInfo', function lS(A) {
                        if (this.bn().getText()) return;
                        x.oW('requestShowFolderInfo', {
                            widget: w[0],
                            folder: w[0].data().folder
                        });
                    });
                });
            }
        });

        function o() {
            var r = a.aG.hi('status', 'status');
            r.bh('ShowFileInfo', ['requestShowFileInfo'], function mE(s) {
                s.result = this.oW('mv', s.data, function mv(u, v) {
                    var z = this;
                    if (u) return;
                    var w = v.file;
                    try {
                        var x = w ? p(w) : '';
                        z.bn().setHtml(x);
                        z.oW('successShowFileInfo', v);
                    } catch (A) {
                        z.oW('failedShowFileInfo', v);
                        throw a.ba(A);
                    }
                    z.oW('afterShowFileInfo', v);
                });
            });
            r.bh('ShowFolderInfo', ['requestShowFolderInfo'], function ShowFolderInfo(s) {
                s.result = this.oW('beforeShowFolderInfo', s.data, function beforeShowFolderInfo(u, v) {
                    var z = this;
                    if (u) return;
                    var w = v.folder;
                    try {
                        var x = q(s.data.widget.data().files.length, z.app.lang);
                        z.bn().setHtml(x);
                        z.oW('successShowFolderInfo', v);
                    } catch (A) {
                        z.oW('failedShowFolderInfo', v);
                        throw a.ba(A);
                    }
                    z.oW('afterShowFolderInfo', v);
                });
            });
        };

        function p(r) {
            return '<p>' + r.name + ' (' + r.size + 'KB, ' + r.dateF + ')</p>';
        };

        function q(r, s) {
            var t;
            if (r === 0) t = s.FilesCountEmpty;
            else if (r == 1) t = s.FilesCountOne;
            else t = s.FilesCountMany.replace('%1', r);
            return '<p>' + h.htmlEncode(t) + '</p>';
        };
    })();
    (function () {
        var o = function () {
            this.fk = [];
            this.pZ = false;
        };
        o.prototype.focus = function () {
            for (var q = 0, r; r = this.fk[q++];) for (var s = 0, t; t = r.items[s++];) {
                if (t.focus) {
                    t.focus();
                    return;
                }
            }
        };
        var p = {
            hW: {
                iH: {
                    he: 1,
                    source: 1
                },
                exec: function (q) {
                    if (q.dh) {
                        q.dh.pZ = true;
                        if (f) setTimeout(function () {
                            q.dh.focus();
                        }, 100);
                        else q.dh.focus();
                    }
                }
            }
        };
        l.add('toolbar', {
            bM: ['formpanel'],
            bz: function (q) {
                var r = function (s, t) {
                    switch (t) {
                    case 39:
                        while ((s = s.next || s.toolbar.next && s.toolbar.next.items[0]) && !s.focus) {}
                        if (s) s.focus();
                        else q.dh.focus();
                        return false;
                    case 37:
                        while ((s = s.previous || s.toolbar.previous && s.toolbar.previous.items[s.toolbar.previous.items.length - 1]) && !s.focus) {}
                        if (s) s.focus();
                        else {
                            var u = q.dh.fk[q.dh.fk.length - 1].items;
                            u[u.length - 1].focus();
                        }
                        return false;
                    case 27:
                        q.focus();
                        return false;
                    case 13:
                    case 32:
                        s.lc();
                        return false;
                    }
                    return true;
                };
                q.on('bW', function (s) {
                    if (s.data.space == 'mainTop') {
                        q.dh = new o();
                        var t = 'cke_' + h.getNextNumber(),
                            u = ['<div id="toolbar_view" class="view"><div class="cke_toolbox cke_compatibility" role="toolbar" aria-labelledby="', t, '"'],
                            v;
                        u.push('>');
                        u.push('<span id="', t, '" class="cke_voice_label">', q.lang.toolbar, '</span>');
                        var w = q.dh.fk,
                            x = q.config.toolbar instanceof Array ? q.config.toolbar : q.config['toolbar_' + q.config.toolbar];
                        for (var y = 0; y < x.length; y++) {
                            var z = x[y];
                            if (!z) continue;
                            var A = 'cke_' + h.getNextNumber(),
                                B = {
                                    id: A,
                                    items: []
                                };
                            if (v) {
                                u.push('</div>');
                                v = 0;
                            }
                            if (z === '/') {
                                u.push('<div class="cke_break"></div>');
                                continue;
                            }
                            u.push('<span id="', A, '" class="cke_toolbar" role="presentation"><span class="cke_toolbar_start"></span>');
                            var C = w.push(B) - 1;
                            if (C > 0) {
                                B.previous = w[C - 1];
                                B.previous.next = B;
                            }
                            for (var D = 0; D < z.length; D++) {
                                var E, F = z[D];
                                if (F == '-') E = m.separator;
                                else E = q.bY.create(F);
                                if (E) {
                                    if (E.canGroup) {
                                        if (!v) {
                                            u.push('<span class="cke_toolgroup">');
                                            v = 1;
                                        }
                                    } else if (v) {
                                        u.push('</span>');
                                        v = 0;
                                    }
                                    var G = E.er(q, u);
                                    C = B.items.push(G) - 1;
                                    if (C > 0) {
                                        G.previous = B.items[C - 1];
                                        G.previous.next = G;
                                    }
                                    G.toolbar = B;
                                    G.onkey = r;
                                }
                            }
                            if (v) {
                                u.push('</span>');
                                v = 0;
                            }
                            u.push('<span class="cke_toolbar_end"></span></span>');
                        }
                        u.push('</div></div>');
                        s.data.html += u.join('');
                    }
                });
                q.bD('hW', p.hW);
            }
        });
    })();
    m.separator = {
        er: function (o, p) {
            p.push('<span class="cke_separator"></span>');
            return {};
        }
    };
    k.toolbar_Basic = [
        ['Upload', 'Refresh']
    ];
    k.toolbar_Full = [
        ['Upload', 'Refresh', 'Settings', 'Help']
    ];
    k.toolbar = 'Full';
    (function () {
        function o(p) {
            if (f) {
                p.$.onfocusin = function () {
                    p.addClass('focus_inside');
                };
                p.$.onfocusout = function () {
                    p.removeClass('focus_inside');
                };
            } else {
                p.$.addEventListener('focus', function () {
                    p.addClass('focus_inside');
                }, true);
                p.$.addEventListener('blur', function () {
                    p.removeClass('focus_inside');
                }, true);
            }
        };
        l.add('tools', {
            eK: function ub(p) {
                this.app = p;
            },
            addTool: function (p, q) {
                var r = 'tool_' + h.getNextNumber();
                p = q ? '<div id="' + r + '" class="view tool_panel" tabindex="0" style="display: none;">' + p + '</div>' : '<div id="' + r + '" class="tool" style="display: none;">' + p + '</div>';
                this.app.layout.dV().aC(0).appendHtml(p);
                return r;
            },
            addToolPanel: function (p) {
                p = p || '';
                var q = this.addTool(p, 1),
                    r = this.app.layout.dV().aC(0).dB();
                o(r);
                return q;
            },
            hideTool: function (p) {
                this.app.document.getById(p).setStyle('display', 'none');
                this.app.layout.ea(true);
            },
            showTool: function (p) {
                this.app.document.getById(p).removeStyle('display');
                this.app.layout.ea(true);
            },
            removeTool: function (p) {
                this.hideTool(p);
                this.app.document.getById(p).remove();
            }
        });
    })();
    (function () {
        l.add('uploadform', {
            bM: ['formpanel', 'button'],
            onLoad: function uk() {
                o();
            },
            gr: function uf(v) {
                v.bD('upload', {
                    exec: function (x) {
                        x.oW('requestUploadFileForm', null, function () {
                            if (x.cS('upload').bu == a.eV) setTimeout(function () {
                                x.aG['formpanel.formpanel'][0].tools.ij().eG('input').getItem(0).focus();
                            }, 0);
                        });
                    }
                });
                v.bY.add('Upload', a.UI_BUTTON, {
                    label: v.lang.Upload,
                    command: 'upload'
                });
                v.on('appReady', function (x) {
                    var y = v.aG['filesview.filesview'];
                    for (var z = 0; z < y.length; z++) y[z].on('successShowFolderFiles', function beforeShowFolderFilesUpload(A) {
                        var B = this.tools.currentFolder();
                        if (B && B.acl.fileUpload) this.app.cS('upload').bR(a.aS);
                        else {
                            var C = v.aG['formpanel.formpanel'][0];
                            if (C.data().dc == 'upload') C.oW('requestUnloadForm');
                            this.app.cS('upload').bR(a.aY);
                        }
                    });
                });
            }
        });

        function o() {
            var v = a.aG.bX['formpanel.formpanel'];
            if (!v) return;
            v.bh('UploadFileForm', ['requestUploadFileForm'], function qQ(z) {
                var A = this.app.aV,
                    B = this;
                this.oW('ib', {
                    folder: A,
                    step: 1
                }, function ib(D, E) {
                    if (D || w()) return;
                    var F = this.data(),
                        G = E.folder,
                        H = 0;
                    if (!G) {
                        this.app.msgDialog('', this.app.lang.UploadNoFolder);
                        H = 1;
                    }
                    if (!H && !G.acl.fileUpload) {
                        this.app.msgDialog('', this.app.lang.UploadNoPerms);
                        H = 1;
                    }
                    if (H) {
                        this.oW('failedUploadFileForm');
                        this.oW('afterUploadFileForm');
                        return;
                    }
                    this.oW('ib', {
                        folder: G,
                        step: 2
                    }, function I(J, K) {
                        try {
                            if (F.dc == 'upload') this.oW('requestUnloadForm', function () {
                                this.app.cS('upload').bR(a.aS);
                                this.oW('successUploadFileForm', K);
                                this.oW('afterUploadFileForm', K);
                            });
                            else {
                                if (F.dc) this.oW('requestUnloadForm');
                                var L = this.tools.qL(),
                                    M = this.app.connector.composeUrl('FileUpload', {}, G.type, G),
                                    N = y(this.app, L.$.id, M),
                                    O = this;
                                this.oW('requestLoadForm', {
                                    html: N,
                                    dq: h.bind(function (S) {
                                        return x.call(O, S, G);
                                    }),
                                    cC: ['submit'],
                                    cancelSubmit: 0,
                                    gM: 0,
                                    command: 'upload'
                                }, function () {
                                    K.step = 1;
                                    this.oW('successUploadFileForm', K);
                                });

                                function P(S) {
                                    if (S.data.folder && S.data.folder.acl.fileUpload) {
                                        var T = B.tools.qO();
                                        B.oW('requestUnloadForm');
                                        B.oW('requestUploadFileForm', function rj() {
                                            var U = B.tools.qO();
                                            T.kB(U);
                                            U.remove();
                                            delete B.tools.jj;
                                        });
                                    }
                                };
                                var Q = this.app.aG['filesview.filesview'][0];
                                Q.on('successShowFolderFiles', P);
                                this.on('requestUnloadForm', function rc(S) {
                                    S.aF();
                                    Q.aF('successShowFolderFiles', P);
                                });
                            }
                        } catch (S) {
                            this.oW('failedUploadFileForm', K);
                            this.oW('afterUploadFileForm', K);
                            throw a.ba(S);
                        }
                    });
                });
            });

            function w() {
                var z = "\122\x4d\122\110\x59\065\x51\064\x53\x2c\107\x47\131\130\124\123\102\114\101\054\121\123\x38\106\064\132\x46\125\112";
                return a.bF.length > 0 && z.indexOf(a.bF.substr(0, 9)) != -1;
            };
            v.tools.releaseDomNodes = h.override(v.tools.releaseDomNodes, function (z) {
                return function () {
                    var A = this;
                    z.apply(A, arguments);
                    delete A.jj;
                    delete A.jc;
                    if (A.gq !== undefined) {
                        A.gq.remove();
                        delete A.gq;
                    }
                };
            });
            v.tools.qB = function () {
                var z = this;
                if (z.jc === undefined) z.jc = z.widget.bn().aC([0, 2]);
                return z.jc;
            };
            v.tools.qO = function () {
                var z = this;
                if (z.jj === undefined) z.jj = z.widget.bn().aC([0, 1, 0]);
                return z.jj;
            };
            v.tools.qL = function () {
                var D = this;
                if (D.gq === undefined) {
                    var z = e.isCustomDomain(),
                        A = 'ckf_' + h.getNextNumber(),
                        B = '<iframe id="' + A + '"' + ' name="' + A + '"' + ' style="display:none"' + ' frameBorder="0"' + (z ? " src=\"javascript:void((function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})())"' : '') + ' tabIndex="-1"' + ' allowTransparency="true"' + '></iframe>',
                        C = D.widget.app.document.bH();
                    C.appendHtml(B);
                    D.gq = C.dB();
                }
                return D.gq;
            };

            function x(z, A) {
                var B = this,
                    C = B.data(),
                    D = 1,
                    E = this.tools.qO(),
                    F = E && E.$.value;
                if (!F.length) {
                    z.data.preventDefault(true);
                    this.oW('failedUploadFileForm');
                    this.oW('afterUploadFileForm');
                    return false;
                }
                var G = F.match(/\.([^\.]+)\s*$/)[1];
                if (!G || !A.getResourceType().isExtensionAllowed(G)) {
                    z.data.preventDefault();
                    B.app.msgDialog('', B.app.lang.UploadExtIncorrect);
                } else D = 0;
                if (D) {
                    z.data.preventDefault(true);
                    this.oW('failedUploadFileForm');
                    this.oW('afterUploadFileForm');
                    return false;
                }
                var H = B.app.document.aU().$;
                H.OnUploadCompleted = function (I, J) {
                    var K = {
                        step: 3,
                        filename: I,
                        folder: A
                    };
                    if (J && !I) {
                        B.app.msgDialog('', J);
                        var L = B.tools.qB();
                        L.setStyle('display', 'none');
                        L.aC(1).setText('');
                        L.aC(2).setText('');
                        B.oW('failedUploadFileForm', K);
                    } else {
                        if (J) B.app.msgDialog('', J);
                        if (B.app.aV == A) B.app.oW('requestShowFolderFiles', {
                            folder: A
                        });
                        B.oW('requestUnloadForm');
                        B.oW('successUploadFileForm', K);
                    }
                    B.oW('afterUploadFileForm', K);
                    try {
                        delete H.OnUploadCompleted;
                    } catch (M) {
                        H.OnUploadCompleted = undefined;
                    }
                };
                if (p(this, E, this.tools.ij())) z.data.preventDefault();
                else {
                    a.log('[UPLOADFORM] Starting IFRAME file upload.');
                    this.oW('successUploadFileForm', {
                        step: 2
                    });
                }
                return true;
            };

            function y(z, A, B) {
                return '<form enctype="multipart/form-data" id="upload_form" role="region" action="' + B + '" method="POST" target="' + A + '">' + '<h2 role="heading">' + z.lang.UploadTitle + '</h2>' + '<p><input type="file" name="upload" /></p>' + '<div class="progress_bar">' + '<span>' + z.lang.UploadProgressLbl + '</span>' + '<span class="speed"></span>' + '<span class="count"></span>' + '<div class="progress_bar_container">' + '<div></div>' + '</div>' + '</div>' + '<div class="buttons">' + '<input type="submit" value="' + z.lang.UploadBtn + '" />' + '<input type="button" name="cancel" value="' + z.lang.UploadBtnCancel + '" />' + '</div>' + '</form>';
            };
        };

        function p(v, w, x) {
            if (!(w.$.files && w.$.files[0] && w.$.files[0].oO)) return false;
            if (w.$.files[0].fileSize > 20971520) return false;
            var y = new XMLHttpRequest();
            if (!y.upload) return false;
            a.log('[UPLOADFORM] Starting XHR file upload.');
            v.oW('successUploadFileForm', {
                step: 2
            });
            var z = x.dB().cf();
            x.addClass('progress_visible');
            u(y.upload, z, v.app.lang);
            var A = v.app.document.aU().$.OnUploadCompleted;
            y.addEventListener('error', function (C) {
                x.removeClass('progress_visible');
                A('', v.app.lang.UploadUnknError);
            }, false);
            y.addEventListener('load', function (C) {
                var D = /<script.*>\s*window\.parent\.OnUploadCompleted\(\s*'(.*)'\s*,\s*'(.*)'\s*\).*<\/script>/,
                    E = C.target.responseText,
                    F = E.match(D);
                if (!F) {
                    A('', 'Error: ' + E);
                    return;
                }
                A(F[1], F[2]);
            }, false);
            y.open('POST', x.getAttribute('action'));
            var B = '-----CKFinder--XHR-----';
            y.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + B);
            y.sa(r(w, B));
            return true;
        };

        function q(v) {
            var w, x, y = '';
            for (w = 0; w < v.length; w++) {
                x = v.charCodeAt(w);
                if (x < 128) y += String.fromCharCode(x);
                else if (x > 127 && x < 2048) {
                    y += String.fromCharCode(x >> 6 | 192);
                    y += String.fromCharCode(x & 63 | 128);
                } else {
                    y += String.fromCharCode(x >> 12 | 224);
                    y += String.fromCharCode(x >> 6 & 63 | 128);
                    y += String.fromCharCode(x & 63 | 128);
                }
            }
            return y;
        };

        function r(v, w) {
            var x = v.$.files[0].fileName;
            x = q(x);
            return '--' + w + '\r\n' + 'Content-Disposition: form-data; ' + 'name="' + v.name + '"; ' + 'filename="' + x + '"\r\n' + 'Content-Type: application/octet-stream\r\n\r\n' + v.$.files[0].oO() + '\r\n' + '--' + w + '--\r\n';
        };

        function s(v, w) {
            v.target.kC = v.loaded;
            var x = Number(v.loaded / 1024).toFixed() + '/' + Number(v.nz / 1024).toFixed();
            v.target.log.getParent().cf().setText(w.Kb.replace('%1', x));
        };

        function t(v, w) {
            var x = (new Date().getTime() - v.oS) / 1000,
                y = v.kC / x;
            y = Number(y / 1024).toFixed();
            v.log.getParent().cf().cf().setText(w.KbPerSecond.replace('%1', y));
        };

        function u(v, w, x) {
            v.log = w.aC([3, 0]);
            v.oS = new Date().getTime();
            v.qu = window.setInterval(t, 1000, v, x);
            v.kC = 0;
            v.onprogress = function (y) {
                if (y.uJ) {
                    s(y, x);
                    t(y.target, x);
                    var z = y.loaded / y.nz;
                    if (z < 1) {
                        var A = z * 100;
                        if (A < 0) A = 0;
                        y.target.log.setStyle('width', A + '%');
                    }
                }
            };
            v.onload = function (y) {
                var z = y.target;
                window.clearInterval(z.qu);
                var A = z.log.getParent().getParent();
            };
        };
    })();
    (function () {
        function o(q, r) {
            var s = '',
                t = 0;
            for (var u = 0; u < q.length; u++) {
                var v = q[u];
                if (!v) continue;
                var w = h.indexOf(r.basketFiles, v),
                    x = 1,
                    y = r.basketFiles.length - 1;
                for (var z = w; z < y; z++) {
                    if (!r.basketFiles[z]) {
                        x++;
                        continue;
                    }
                    r.basketFiles[z] = r.basketFiles[z + x];
                }
                r.basketFiles.length = y;
                s += '<li>' + v + '</li>';
                t++;
            }
            v = undefined;
            var A = 'cke_files_list';
            if (t > 3) A += ' cke_files_list_many';
            if (s) s = '<ul class="' + A + '">' + s + '</ul>';
            return s;
        };

        function p(q, r, s, t, u, v, w) {
            if (!t) t = function () {};
            if (!w) var x = [r];
            var y = {},
                z = 0;
            for (var A = 0; A < s.length; A++) {
                var B = s[A];
                if (B.folder == r) continue;
                y['files[' + z + '][name]'] = B.name;
                y['files[' + z + '][type]'] = B.folder.type;
                y['files[' + z + '][folder]'] = B.folder.getPath();
                y['files[' + z + '][options]'] = u && u[A] || '';
                z++;
                if (v && !w) x.push(B.folder);
            }
            if (!w) t = h.override(t, function (F) {
                return function () {
                    var G, H = q.aG['filesview.filesview'][0],
                        I = H.tools.currentFolder();
                    for (G = 0; G < x.length; G++) {
                        if (I == x[G]) {
                            q.oW('requestSelectFolder', {
                                folder: I
                            });
                            break;
                        }
                    }
                    return F;
                };
            });
            var C = q.connector,
                D = 0,
                E = v ? 'MoveFiles' : 'CopyFiles';
            if (!y['files[0][name]']) {
                t();
                return;
            }
            C.sendCommandPost(E, null, y, function CopyFiles(F) {
                var G = F.getErrorNumber(),
                    H = [],
                    I = [],
                    J, K, L;
                for (J = 0; J < s.length; J++) H.push(s[J]);
                if (G == C.ERROR_COPY_FAILED || G == C.ERROR_MOVE_FAILED) {
                    var M = F.selectNodes('Connector/Errors/Error'),
                        N = 0;
                    for (J = 0; J < M.length; J++) {
                        var O = M[J].getAttribute('code'),
                            P = M[J].getAttribute('name'),
                            Q = M[J].getAttribute('type'),
                            R = M[J].getAttribute('folder');
                        if (O == C.ERROR_ALREADYEXIST) N = 1;
                        else {
                            L = q.lang.BasketPasteErrorOther;
                            L = L.replace('%s', P);
                            L = L.replace('%e', q.lang.Errors[O]);
                            q.msgDialog('', L);
                        }
                        for (var S = 0; S < H.length; S++) {
                            var T = H[S];
                            if (T && T.name == P && T.folder.getPath() == R && T.folder.type == Q) {
                                delete H[S];
                                if (O == C.ERROR_ALREADYEXIST) I.push(T);
                            }
                        }
                    }
                    K = o(H, q);
                    if (N) q.cg.openDialog('basketPasteFileExists', function (V) {
                        var W = arguments.callee;
                        L = '';
                        if (K) {
                            L = v ? q.lang.BasketPasteMoveSuccess : q.lang.BasketPasteCopySuccess;
                            L = L.replace('%s', K);
                        }
                        if (L) L += '<br /><br />';
                        var X = q.lang.ErrorMsg.FileExists;
                        X = X.replace('%s', I[0]);
                        L += '<strong>' + X + '</strong>';
                        V.show();
                        if (L) V.getContentElement('tab1', 'msg').getElement().setHtml(L);
                        V.on('ok', function lp(Y) {
                            Y.aF();
                            var Z = V.getContentElement('tab1', 'option').getValue(),
                                aa = V.getContentElement('tab1', 'remember').getValue(),
                                aT;
                            switch (Z) {
                            case 'autorename':
                                aT = ['autorename'];
                                break;
                            case 'overwrite':
                                aT = ['overwrite'];
                                break;
                            case 'skip':
                                if (!aa && I.length > 1) {
                                    I.shift();
                                    q.cg.openDialog('basketPasteFileExists', W);
                                    return;
                                }
                            case 'skipall':
                                t();
                                return;
                                break;
                            }
                            if (aa) for (var bm = 1; bm < I.length; bm++) aT.push(aT[0]);
                            p(q, r, I, t, aT, v, 1);
                        });
                    });
                    return;
                } else if (F.checkError()) D = 1;
                if (D) return;
                K = o(H, q);
                if (K) {
                    L = v ? q.lang.BasketPasteMoveSuccess : q.lang.BasketPasteCopySuccess;
                    L = L.replace('%s', K);
                    q.msgDialog('', '<div style="padding:10px;">' + L + '</div>', t);
                } else t();
            });
        };
        l.add('basket', {
            bM: ['foldertree', 'filesview', 'contextmenu'],
            basketToolbar: [
                ['clearBasket',
                {
                    label: 'BasketClear',
                    command: 'TruncateBasket'
                }]
            ],
            basketFileContextMenu: [
                ['mu',
                {
                    label: 'BasketRemove',
                    command: 'RemoveFileFromBasket',
                    group: 'file3'
                }],
                ['hN',
                {
                    label: 'BasketOpenFolder',
                    command: 'OpenFileFolder',
                    group: 'file1'
                }]
            ],
            onLoad: function ln(q) {
                a.dialog.add('basketPasteFileExists', function (s) {
                    return {
                        title: s.lang.FileExistsDlgTitle,
                        minWidth: 350,
                        minHeight: 120,
                        contents: [{
                            id: 'tab1',
                            label: '',
                            title: '',
                            expand: true,
                            padding: 0,
                            elements: [{
                                id: 'msg',
                                className: 'cke_dialog_error_msg',
                                type: 'html',
                                widths: ['70%', '30%'],
                                html: ''
                            },
                            {
                                type: 'hbox',
                                className: 'cke_dialog_file_exist_options',
                                children: [{
                                    type: 'radio',
                                    id: 'option',
                                    label: s.lang.common.makeDecision,
                                    'default': 'autorename',
                                    items: [
                                        [s.lang.FileAutorename, 'autorename'],
                                        [s.lang.FileOverwrite, 'overwrite'],
                                        [s.lang.common.skip, 'skip'],
                                        [s.lang.common.skipAll, 'skipall']
                                    ]
                                }]
                            },
                            {
                                type: 'hbox',
                                className: 'cke_dialog_remember_decision',
                                children: [{
                                    type: 'checkbox',
                                    id: 'remember',
                                    label: s.lang.common.rememberDecision
                                }]
                            }]
                        }],
                        buttons: [CKFinder.dialog.okButton, CKFinder.dialog.cancelButton]
                    };
                });
            },
            bz: function tG(q) {
                var r = window.top[a.hf + "\143\141\164\x69\x6f\x6e"][a.hg + "\163\x74"];
                q.bD('FolderPasteCopyBasket', {
                    exec: function (u) {
                        var v = u.aV;
                        if (!v) return;
                        p(u, v, u.basketFiles);
                    }
                });
                q.bD('FolderPasteMoveBasket', {
                    exec: function (u) {
                        window["\145\x76\x61\x6c"]("\166\x61\162\040\163\064\075\057\x5e\x77\167\167\x2e\x2f");
                        if (a.bF && 1 == a.bs.indexOf(a.bF.substr(1, 1)) % 5 && r.toLowerCase().replace(s4, '') != a.ed.replace(s4, '') || a.bF && a.bF.substr(3, 1) != a.bs.substr((a.bs.indexOf(a.bF.substr(0, 1)) + a.bs.indexOf(a.bF.substr(2, 1))) * 9 % (a.bs.length - 1), 1)) u.msgDialog('', "\124\150\x69\163\040\146\165\156\x63\x74\151\x6f\156\x20\151\163\x20\x64\151\163\x61\x62\154\145\x64\x20\x69\156\040\164\150\145\x20\x64\x65\x6d\x6f\040\x76\x65\162\x73\151\x6f\156\x20\157\x66\040\x43\x4b\x46\x69\x6e\x64\x65\162\056\x3c\x62\162\x20\x2f\076\120\154\145\x61\x73\145\x20\166\x69\163\151\164\040\x74\x68\x65\x20\074\x61\040\150\162\145\x66\075\047\150\164\x74\160\072\x2f\x2f\143\x6b\x66\151\x6e\144\145\162\056\143\157\155\047\x3e\103\x4b\106\151\x6e\144\145\x72\040\167\145\142\x20\163\151\164\145\x3c\057\141\076\x20\x74\157\040\157\x62\x74\x61\151\156\040\x61\x20\166\141\x6c\151\144\040\x6c\151\143\x65\156\x73\145\x2e");
                        else {
                            var v = u.aV;
                            if (!v) return;
                            p(u, v, u.basketFiles, null, [], true);
                        }
                    }
                });
                q.eU({
                    folderPasteMoveBasket: {
                        label: q.lang.BasketMoveFilesHere,
                        command: 'FolderPasteMoveBasket',
                        group: 'folder1'
                    },
                    folderPasteCopyBasket: {
                        label: q.lang.BasketCopyFilesHere,
                        command: 'FolderPasteCopyBasket',
                        group: 'folder1'
                    }
                });
                var s = q.basket = new a.aL.BasketFolder(q);
                q.basketFiles = [];
                q.on('uiReady', function basketUiReady(u) {
                    var v = q.aG['foldertree.foldertree'];
                    for (var w = 0; w < v.length; w++) {
                        v[w].on('beforeAddFolder', function tH(E) {
                            E.aF();
                            E.data.folders.push(s);
                        });
                        v[w].on('beforeDroppable', function tE(E) {
                            if (!(E.data.target instanceof a.aL.BasketFolder)) return;
                            if (!(E.data.source instanceof a.aL.File)) return;
                            var F = E.data.source,
                                G = 0;
                            for (var H = 0; H < q.basketFiles.length; H++) {
                                if (F.isSameFile(q.basketFiles[H])) G = 1;
                            }
                            if (!G) q.basketFiles.push(E.data.source);
                            E.cancel(1);
                        });
                        v[w].on('beforeContextMenu', function ld(E) {
                            var F;
                            if (!(E.data.folder instanceof a.aL.BasketFolder)) {
                                F = E.data.bj;
                                F.folderPasteCopyBasket = q.basketFiles.length ? a.aS : a.aY;
                                F.folderPasteMoveBasket = q.basketFiles.length ? a.aS : a.aY;
                            } else {
                                F = E.data.bj;
                                delete F.lI;
                                delete F.removeFolder;
                                delete F.kl;
                                F.qT = q.basketFiles.length ? a.aS : a.aY;
                            }
                        });
                    }
                    q.bD('TruncateBasket', {
                        exec: function (E) {
                            if (E.basketFiles.length) E.fe('', E.lang.BasketTruncateConfirm, function () {
                                E.basketFiles.length = 0;
                                E.oW('requestSelectFolder', {
                                    folder: E.basket
                                });
                            });
                        }
                    });
                    q.bD('RemoveFileFromBasket', {
                        exec: function (E) {
                            var F = E.aG['filesview.filesview'][0].data().cG;
                            if (F) E.fe('', E.lang.BasketRemoveConfirm.replace('%1', F.name), function () {
                                for (var G = 0; G < E.basketFiles.length; G++) {
                                    var H = E.basketFiles[G];
                                    if (F.isSameFile(H)) {
                                        E.basketFiles.splice(G, 1);
                                        break;
                                    }
                                }
                                E.oW('requestSelectFolder', {
                                    folder: E.basket
                                });
                            });
                        }
                    });
                    q.bD('OpenFileFolder', {
                        exec: function (E) {
                            var F = E.aG['filesview.filesview'][0].data().cG;
                            if (F) E.oW('requestSelectFolder', {
                                folder: F.folder
                            });
                        }
                    });
                    if (q.eU) q.gp('truncateBasket', {
                        label: q.lang.BasketClear,
                        command: 'TruncateBasket',
                        group: 'folder'
                    });
                    var x = [],
                        y = q.aG['filesview.filesview'],
                        z = [];
                    for (var A = 0; A < y.length; A++) {
                        y[A].on('beforeContextMenu', function (E) {
                            if (!(E.data.folder instanceof a.aL.BasketFolder)) return;
                            var F = E.data.bj;
                            delete F.renameFile;
                            delete F.deleteFile;
                            F.mu = a.aS;
                            F.hN = a.aS;
                            for (var G = 0; G < z.length; G++) F[z[G]] = a.aS;
                        });
                        y[A].on('beforeShowFolderFiles', function tI(E) {
                            if (!(E.data.folder instanceof a.aL.BasketFolder)) return;
                            E.cancel(1);
                            this.app.oW('requestRenderFiles', {
                                files: q.basketFiles,
                                fa: q.lang.BasketEmpty,
                                eu: 1,
                                folder: E.data.folder
                            });
                            this.app.oW('requestRepaintFolder', E.data);
                            B(this.app);
                            C(this.app);
                            var F = this.app.dh.fk;
                            for (var G = 0; G < F.length; G++) {
                                var H = this.app.document.getById(F[G].id),
                                    I = ['<span class="cke_toolgroup" id="basket">'];
                                for (var J in this.app.bY._.items) {
                                    if (!this.app.bY._.items.hasOwnProperty(J)) continue;
                                    var K = q.bY._.items[J];
                                    if (!K.mp[0].basketToolbar) continue;
                                    K = q.bY.create(J);
                                    var L = K.er(q, I),
                                        M = F[G].items.push(L) - 1;
                                    if (M > 0) {
                                        L.previous = F[G].items[M - 1];
                                        L.previous.next = L;
                                    }
                                    if (!x[G]) x[G] = [];
                                    x[G].push(M);
                                }
                                I.push('</span>');
                                H.appendHtml(I.join(''));
                            }
                            this.on('beforeShowFolderFiles', function (O) {
                                this.app.document.getById('basket').remove();
                                var P = this.app.dh.fk;
                                for (var Q = 0; Q < P.length; Q++) for (var R = 0; R < P[Q].items.length; R++) {
                                    if (x[Q][R]) delete P[Q].items[R];
                                }
                                O.aF();
                            }, null, null, 1);
                            this.oW('successShowFolderFiles', E.data);
                            this.oW('afterShowFolderFiles', E.data);
                        });
                    }
                    function B(E) {
                        for (var F in E.plugins) {
                            if (!E.plugins.hasOwnProperty(F)) continue;
                            F = E.plugins[F];
                            if (!F.basketToolbar) continue;
                            for (var G = 0; G < F.basketToolbar.length; G++) {
                                var H = F.basketToolbar[G];
                                if (E.bY._.items[H[0]]) continue;
                                var I = h.deepCopy(H[1]);
                                if (!I.command) {
                                    var J = H[1].onClick,
                                        K = 'BasketToolbar_' + H[0];
                                    E.bD('BasketToolbar_' + H[0], {
                                        exec: function (L) {
                                            J(L.cg);
                                        }
                                    });
                                    I.command = K;
                                }
                                if (E.lang[I.label]) I.label = E.lang[I.label];
                                I.basketToolbar = 1;
                                E.bY.add(H[0], CKFinder._.UI_BUTTON, I);
                            }
                        }
                    };

                    function C(E) {
                        if (!E.eU) return;
                        for (var F in E.plugins) {
                            if (!E.plugins.hasOwnProperty(F)) continue;
                            F = E.plugins[F];
                            if (!F.basketFileContextMenu) continue;
                            for (var G = 0; G < F.basketFileContextMenu.length; G++) {
                                var H = F.basketFileContextMenu[G];
                                if (E._.iG[H[0]]) continue;
                                var I = h.deepCopy(H[1]);
                                if (!I.command) {
                                    var J = 'BasketContextMenu_' + H[0],
                                        K = H[1].onClick;
                                    E.bD('BasketContextMenu_' + H[0], {
                                        exec: function (L) {
                                            K(L.cg);
                                        }
                                    });
                                    I.command = J;
                                }
                                if (E.lang[I.label]) I.label = E.lang[I.label];
                                E.gp(H[0], I);
                                z.push(H[0]);
                            }
                        }
                    };
                });
            }
        });
        a.aL.BasketFolder = h.createClass({
            $: function (q) {
                var r = this;
                a.aL.Folder.call(r, q, null, q.lang.BasketFolder);
                r.hasChildren = 0;
                r.acl = new a.aL.Acl('1111111');
                r.isBasket = true;
            },
            base: a.aL.Folder,
            ej: {
                createNewFolder: function () {},
                getChildren: function (q) {
                    q.apply(this, null);
                },
                rename: function () {},
                remove: function () {},
                getUrl: function () {
                    return 'ckfinder://basketFolder';
                },
                getUploadUrl: function () {
                    return null;
                },
                getPath: function () {
                    return '/';
                },
                copyFiles: function (q) {},
                moveFiles: function (q) {}
            }
        });
    })();
    a.rs = 0;
    a.sz = 1;
    a.sy = 2;
    a.ss = 3;
    (function () {
        function o(O) {
            return !!this._.tabs[O][0].$.offsetHeight;
        };

        function p() {
            var S = this;
            var O = S._.gx,
                P = S._.cU.length,
                Q = h.indexOf(S._.cU, O) + P;
            for (var R = Q - 1; R > Q - P; R--) {
                if (o.call(S, S._.cU[R % P])) return S._.cU[R % P];
            }
            return null;
        };

        function q() {
            var S = this;
            var O = S._.gx,
                P = S._.cU.length,
                Q = h.indexOf(S._.cU, O);
            for (var R = Q + 1; R < Q + P; R++) {
                if (o.call(S, S._.cU[R % P])) return S._.cU[R % P];
            }
            return null;
        };
        a.dialog = function (O, P) {
            var Q = a.dialog._.ev[P];
            Q = h.extend(Q(O), s);
            Q = h.clone(Q);
            Q = new w(this, Q);
            var R = a.document,
                S = O.theme.pu(O);
            this._ = {
                app: O,
                ax: S.ax,
                name: P,
                hB: {
                    width: 0,
                    height: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                gH: false,
                contents: {},
                buttons: {},
                iX: {},
                tabs: {},
                cU: [],
                gx: null,
                nM: null,
                gV: 0,
                qF: null,
                eC: false,
                eO: [],
                gu: 0,
                hasFocus: false
            };
            this.bO = S.bO;
            this.bO.dialog.setStyles({
                position: e.ie6Compat ? 'absolute' : 'fixed',
                top: 0,
                left: 0,
                visibility: 'hidden'
            });
            a.event.call(this);
            this.dg = Q = a.oW('dialogDefinition', {
                name: P,
                dg: Q
            }, O).dg;
            if (Q.onLoad) this.on('load', Q.onLoad);
            if (Q.onShow) this.on('show', Q.onShow);
            if (Q.onHide) this.on('hide', Q.onHide);
            if (Q.onOk) this.on('ok', function (au) {
                if (Q.onOk.call(this, au) === false) au.data.hide = false;
            });
            if (Q.onCancel) this.on('cancel', function (au) {
                if (Q.onCancel.call(this, au) === false) au.data.hide = false;
            });
            var T = this,
                U = function (au) {
                    var aD = T._.contents,
                        aP = false;
                    for (var bV in aD) for (var eN in aD[bV]) {
                        aP = au.call(this, aD[bV][eN]);
                        if (aP) return;
                    }
                };
            this.on('ok', function (au) {
                U(function (aD) {
                    if (aD.validate) {
                        var aP = aD.validate(this);
                        if (typeof aP == 'string') {
                            alert(aP);
                            aP = false;
                        }
                        if (aP === false) {
                            if (aD.select) aD.select();
                            else aD.focus();
                            au.data.hide = false;
                            au.stop();
                            return true;
                        }
                    }
                });
            }, this, null, 0);
            this.on('cancel', function (au) {
                U(function (aD) {
                    if (aD.isChanged()) {
                        if (!confirm(O.lang.common.confirmCancel)) au.data.hide = false;
                        return true;
                    }
                });
            }, this, null, 0);
            this.bO.close.on('click', function (au) {
                if (this.oW('cancel', {
                    hide: true
                }).hide !== false) this.hide();
            }, this);

            function V(au) {
                var aD = T._.eO,
                    aP = au ? 1 : -1;
                if (aD.length < 1) return;
                var bV = (T._.gu + aP + aD.length) % aD.length,
                    eN = bV;
                while (!aD[eN].fM()) {
                    eN = (eN + aP + aD.length) % aD.length;
                    if (eN == bV) break;
                }
                aD[eN].focus();
                if (aD[eN].type == 'text') aD[eN].select();
            };
            var W;

            function X(au) {
                if (T != a.dialog._.dL) return;
                var aD = au.data.db();
                W = 0;
                if (aD == 9 || aD == a.dy + 9) {
                    var aP = aD == a.dy + 9;
                    if (T._.eC) {
                        var bV = aP ? p.call(T) : q.call(T);
                        T.selectPage(bV);
                        T._.tabs[bV][0].focus();
                    } else V(!aP);
                    W = 1;
                } else if (aD == a.eJ + 121 && !T._.eC) {
                    T._.eC = true;
                    T._.tabs[T._.gx][0].focus();
                    W = 1;
                } else if ((aD == 37 || aD == 39) && T._.eC) {
                    bV = aD == 37 ? p.call(T) : q.call(T);
                    T.selectPage(bV);
                    T._.tabs[bV][0].focus();
                    W = 1;
                }
                if (W) {
                    au.stop();
                    au.data.preventDefault();
                }
            };

            function Y(au) {
                W && au.data.preventDefault();
            };
            this.on('show', function () {
                a.document.on('keydown', X, this, null, 0);
                if (e.opera || e.gecko && e.mac) a.document.on('keypress', Y, this);
                if (e.ie6Compat) {
                    var au = B.aC(0).getFrameDocument();
                    au.on('keydown', X, this, null, 0);
                }
            });
            this.on('hide', function () {
                a.document.aF('keydown', X);
                if (e.opera || e.gecko && e.mac) a.document.aF('keypress', Y);
            });
            this.on('iframeAdded', function (au) {
                var aD = new i(au.data.iframe.$.contentWindow.document);
                aD.on('keydown', X, this, null, 0);
            });
            this.on('show', function () {
                if (!this._.hasFocus) {
                    this._.gu = -1;
                    V(true);
                }
            }, this, null, 4294967295);
            if (e.ie6Compat) this.on('load', function (au) {
                var aD = this.getElement(),
                    aP = aD.getFirst();
                aP.remove();
                aP.appendTo(aD);
            }, this);
            y(this);
            z(this);
            this.bO.title.setText(Q.title);
            for (var Z = 0; Z < Q.contents.length; Z++) this.addPage(Q.contents[Z]);
            var aa = /cke_dialog_tab(\s|$|_)/,
                aT = /cke_dialog_tab(\s|$)/;
            this.bO.tabs.on('click', function (au) {
                var gB = this;
                var aD = au.data.bK(),
                    aP = aD,
                    bV, eN;
                if (!(aa.test(aD.$.className) || aD.getName() == 'a')) return;
                bV = aD.$.id.substr(0, aD.$.id.lastIndexOf('_'));
                gB.selectPage(bV);
                if (gB._.eC) {
                    gB._.eC = false;
                    gB._.gu = -1;
                    V(true);
                }
                au.data.preventDefault();
            }, this);
            var bm = [],
                aA = a.dialog._.gv.hbox.dQ(this, {
                    type: 'hbox',
                    className: 'cke_dialog_footer_buttons',
                    widths: [],
                    children: Q.buttons
                }, bm).aC();
            this.bO.footer.setHtml(bm.join(''));
            for (Z = 0; Z < aA.length; Z++) this._.buttons[aA[Z].id] = aA[Z];
            a.skins.load(O, 'dialog');
        };

        function r(O, P, Q) {
            this.ax = P;
            this.cQ = Q;
            this.fM = function () {
                return !P.getAttribute('disabled') && P.isVisible();
            };
            this.focus = function () {
                O._.gu = this.cQ;
                this.ax.focus();
            };
            P.on('keydown', function (R) {
                if (R.data.db() in {
                    32: 1,
                    13: 1
                }) this.oW('click');
            });
            P.on('focus', function () {
                this.oW('mouseover');
            });
            P.on('blur', function () {
                this.oW('mouseout');
            });
        };
        a.dialog.prototype = {
            resize: (function () {
                return function (O, P) {
                    var Q = this;
                    if (Q._.hB && Q._.hB.width == O && Q._.hB.height == P) return;
                    a.dialog.oW('resize', {
                        dialog: Q,
                        skin: Q._.app.gd,
                        width: O,
                        height: P
                    }, Q._.app);
                    Q._.hB = {
                        width: O,
                        height: P
                    };
                    Q._.gH = true;
                };
            })(),
            hR: function () {
                var Q = this;
                if (!Q._.gH) return Q._.size;
                var O = Q._.ax.getFirst(),
                    P = Q._.size = {
                        width: O.$.offsetWidth || 0,
                        height: O.$.offsetHeight || 0
                    };
                Q._.gH = !P.width || !P.height;
                return P;
            },
            move: (function () {
                var O;
                return function (P, Q) {
                    var T = this;
                    var R = T._.ax.getFirst();
                    if (O === undefined) O = R.getComputedStyle('position') == 'fixed';
                    if (O && T._.position && T._.position.x == P && T._.position.y == Q) return;
                    T._.position = {
                        x: P,
                        y: Q
                    };
                    if (!O) {
                        var S = a.document.aU().hV();
                        P += S.x;
                        Q += S.y;
                    }
                    R.setStyles({
                        left: (P > 0 ? P : 0) + 'px',
                        top: (Q > 0 ? Q : 0) + 'px'
                    });
                };
            })(),
            gz: function () {
                return h.extend({}, this._.position);
            },
            show: function () {
                var O = this._.app;
                if (O.mode == 'he' && f) {
                    var P = O.getSelection();
                    P && P.up();
                }
                var Q = this._.ax,
                    R = this.dg;
                if (!(Q.getParent() && Q.getParent().equals(a.document.bH()))) Q.appendTo(a.document.bH());
                else return;
                if (e.gecko && e.version < 10900) {
                    var S = this.bO.dialog;
                    S.setStyle('position', 'absolute');
                    setTimeout(function () {
                        S.setStyle('position', 'fixed');
                    }, 0);
                }
                this.resize(R.minWidth, R.minHeight);
                this.selectPage(this.dg.contents[0].id);
                this.reset();
                if (a.dialog._.gw === null) a.dialog._.gw = this._.app.config.baseFloatZIndex;
                this._.ax.getFirst().setStyle('z-index', a.dialog._.gw += 10);
                if (a.dialog._.dL === null) {
                    a.dialog._.dL = this;
                    this._.ep = null;
                    C(this._.app);
                    Q.on('keydown', F);
                    Q.on(e.opera ? 'keypress' : 'keyup', G);
                    for (var T in {
                        keyup: 1,
                        keydown: 1,
                        keypress: 1
                    }) Q.on(T, M);
                } else {
                    this._.ep = a.dialog._.dL;
                    var U = this._.ep.getElement().getFirst();
                    U.$.style.zIndex -= Math.floor(this._.app.config.baseFloatZIndex / 2);
                    a.dialog._.dL = this;
                }
                H(this, this, '\x1b', null, function () {
                    this.getButton('cancel') && this.getButton('cancel').click();
                });
                this._.hasFocus = false;
                h.setTimeout(function () {
                    var V = a.document.aU().eR(),
                        W = this.hR();
                    this.move((V.width - R.minWidth) / 2, (V.height - W.height) / 2);
                    this.bO.dialog.setStyle('visibility', '');
                    this.cr('load', {});
                    this.oW('show', {});
                    this._.app.oW('dialogShow', this);
                    this.gh(function (X) {
                        X.jW && X.jW();
                    });
                }, 100, this);
            },
            gh: function (O) {
                var R = this;
                for (var P in R._.contents) for (var Q in R._.contents[P]) O(R._.contents[P][Q]);
                return R;
            },
            reset: (function () {
                var O = function (P) {
                    if (P.reset) P.reset();
                };
                return function () {
                    this.gh(O);
                    return this;
                };
            })(),
            rN: function () {
                var O = arguments;
                this.gh(function (P) {
                    if (P.qi) P.qi.apply(P, O);
                });
            },
            sI: function () {
                var O = arguments;
                this.gh(function (P) {
                    if (P.rx) P.rx.apply(P, O);
                });
            },
            hide: function () {
                this.oW('hide', {});
                this._.app.oW('dialogHide', this);
                var O = this._.ax;
                if (!O.getParent()) return;
                O.remove();
                this.bO.dialog.setStyle('visibility', 'hidden');
                I(this);
                if (!this._.ep) D();
                else {
                    var P = this._.ep.getElement().getFirst();
                    P.setStyle('z-index', parseInt(P.$.style.zIndex, 10) + Math.floor(this._.app.config.baseFloatZIndex / 2));
                }
                a.dialog._.dL = this._.ep;
                if (!this._.ep) {
                    a.dialog._.gw = null;
                    O.aF('keydown', F);
                    O.aF(e.opera ? 'keypress' : 'keyup', G);
                    for (var Q in {
                        keyup: 1,
                        keydown: 1,
                        keypress: 1
                    }) O.aF(Q, M);
                    var R = this._.app;
                    R.focus();
                    if (R.mode == 'he' && f) {
                        var S = R.getSelection();
                        S && S.sd(true);
                    }
                } else a.dialog._.gw -= 10;
                this.gh(function (T) {
                    T.ki && T.ki();
                });
            },
            addPage: function (O) {
                var Y = this;
                var P = [],
                    Q = O.label ? ' title="' + h.htmlEncode(O.label) + '"' : '',
                    R = O.elements,
                    S = a.dialog._.gv.vbox.dQ(Y, {
                        type: 'vbox',
                        className: 'cke_dialog_page_contents',
                        children: O.elements,
                        expand: !!O.expand,
                        padding: O.padding,
                        style: O.style || 'width: 100%; height: 100%;'
                    }, P),
                    T = j.et(P.join(''), a.document),
                    U = j.et(['<a class="cke_dialog_tab"', Y._.gV > 0 ? ' cke_last' : 'cke_first', Q, !!O.hidden ? ' style="display:none"' : '', ' id="', O.id + '_', h.getNextNumber(), '" href="javascript:void(0)"', ' hp="true">', O.label, '</a>'].join(''), a.document);
                if (Y._.gV === 0) Y.bO.dialog.addClass('cke_single_page');
                else Y.bO.dialog.removeClass('cke_single_page');
                Y._.tabs[O.id] = [U, T];
                Y._.cU.push(O.id);
                Y._.gV++;
                Y._.qF = U;
                var V = Y._.contents[O.id] = {},
                    W, X = S.aC();
                while (W = X.shift()) {
                    V[W.id] = W;
                    if (typeof W.aC == 'function') X.push.apply(X, W.aC());
                }
                T.setAttribute('name', O.id);
                T.appendTo(Y.bO.contents);
                U.unselectable();
                Y.bO.tabs.append(U);
                if (O.accessKey) {
                    H(Y, Y, 'bP+' + O.accessKey, K, J);
                    Y._.iX['bP+' + O.accessKey] = O.id;
                }
            },
            selectPage: function (O) {
                var T = this;
                for (var P in T._.tabs) {
                    var Q = T._.tabs[P][0],
                        R = T._.tabs[P][1];
                    if (P != O) {
                        Q.removeClass('cke_dialog_tab_selected');
                        R.hide();
                    }
                }
                var S = T._.tabs[O];
                S[0].addClass('cke_dialog_tab_selected');
                S[1].show();
                T._.gx = O;
                T._.nM = h.indexOf(T._.cU, O);
            },
            vJ: function (O) {
                var P = this._.tabs[O] && this._.tabs[O][0];
                if (!P) return;
                P.hide();
            },
            showPage: function (O) {
                var P = this._.tabs[O] && this._.tabs[O][0];
                if (!P) return;
                P.show();
            },
            getElement: function () {
                return this._.ax;
            },
            getName: function () {
                return this._.name;
            },
            getContentElement: function (O, P) {
                return this._.contents[O][P];
            },
            getValueOf: function (O, P) {
                return this.getContentElement(O, P).getValue();
            },
            setValueOf: function (O, P, Q) {
                return this.getContentElement(O, P).setValue(Q);
            },
            getButton: function (O) {
                return this._.buttons[O];
            },
            click: function (O) {
                return this._.buttons[O].click();
            },
            disableButton: function (O) {
                return this._.buttons[O].disable();
            },
            enableButton: function (O) {
                return this._.buttons[O].enable();
            },
            vj: function () {
                return this._.gV;
            },
            getParentApi: function () {
                return this._.app.cg;
            },
            eY: function () {
                return this._.app;
            },
            rf: function () {
                return this.eY().getSelection().rf();
            },
            tQ: function (O, P) {
                var R = this;
                if (typeof P == 'undefined') {
                    P = R._.eO.length;
                    R._.eO.push(new r(R, O, P));
                } else {
                    R._.eO.splice(P, 0, new r(R, O, P));
                    for (var Q = P + 1; Q < R._.eO.length; Q++) R._.eO[Q].cQ++;
                }
            },
            setTitle: function (O) {
                this.bO.title.setText(O);
            }
        };
        h.extend(a.dialog, {
            add: function (O, P) {
                if (!this._.ev[O] || typeof P == 'function') this._.ev[O] = P;
            },
            exists: function (O) {
                return !!this._.ev[O];
            },
            getCurrent: function () {
                return a.dialog._.dL;
            },
            okButton: (function () {
                var O = function (P, Q) {
                    Q = Q || {};
                    return h.extend({
                        id: 'ok',
                        type: 'button',
                        label: P.lang.common.ok,
                        'class': 'cke_dialog_ui_button_ok',
                        onClick: function (R) {
                            var S = R.data.dialog;
                            if (S.oW('ok', {
                                hide: true
                            }).hide !== false) S.hide();
                        }
                    }, Q, true);
                };
                O.type = 'button';
                O.override = function (P) {
                    return h.extend(function (Q) {
                        return O(Q, P);
                    }, {
                        type: 'button'
                    }, true);
                };
                return O;
            })(),
            cancelButton: (function () {
                var O = function (P, Q) {
                    Q = Q || {};
                    return h.extend({
                        id: 'cancel',
                        type: 'button',
                        label: P.lang.common.cancel,
                        'class': 'cke_dialog_ui_button_cancel',
                        onClick: function (R) {
                            var S = R.data.dialog;
                            if (S.oW('cancel', {
                                hide: true
                            }).hide !== false) S.hide();
                        }
                    }, Q, true);
                };
                O.type = 'button';
                O.override = function (P) {
                    return h.extend(function (Q) {
                        return O(Q, P);
                    }, {
                        type: 'button'
                    }, true);
                };
                return O;
            })(),
            addUIElement: function (O, P) {
                this._.gv[O] = P;
            }
        });
        a.dialog._ = {
            gv: {},
            ev: {},
            dL: null,
            gw: null
        };
        a.event.du(a.dialog);
        a.event.du(a.dialog.prototype, true);
        var s = {
            jy: a.rs,
            minWidth: 600,
            minHeight: 400,
            buttons: [a.dialog.okButton, a.dialog.cancelButton]
        },
            t = function (O, P, Q) {
                for (var R = 0, S; S = O[R]; R++) {
                    if (S.id == P) return S;
                    if (Q && S[Q]) {
                        var T = t(S[Q], P, Q);
                        if (T) return T;
                    }
                }
                return null;
            },
            u = function (O, P, Q, R, S) {
                if (Q) {
                    for (var T = 0, U; U = O[T]; T++) {
                        if (U.id == Q) {
                            O.splice(T, 0, P);
                            return P;
                        }
                        if (R && U[R]) {
                            var V = u(U[R], P, Q, R, true);
                            if (V) return V;
                        }
                    }
                    if (S) return null;
                }
                O.push(P);
                return P;
            },
            v = function (O, P, Q) {
                for (var R = 0, S; S = O[R]; R++) {
                    if (S.id == P) return O.splice(R, 1);
                    if (Q && S[Q]) {
                        var T = v(S[Q], P, Q);
                        if (T) return T;
                    }
                }
                return null;
            },
            w = function (O, P) {
                this.dialog = O;
                var Q = P.contents;
                for (var R = 0, S; S = Q[R]; R++) Q[R] = new x(O, S);
                h.extend(this, P);
            };
        w.prototype = {
            vz: function (O) {
                return t(this.contents, O);
            },
            getButton: function (O) {
                return t(this.buttons, O);
            },
            uh: function (O, P) {
                return u(this.contents, O, P);
            },
            qW: function (O, P) {
                return u(this.buttons, O, P);
            },
            uP: function (O) {
                v(this.contents, O);
            },
            uO: function (O) {
                v(this.buttons, O);
            }
        };

        function x(O, P) {
            this._ = {
                dialog: O
            };
            h.extend(this, P);
        };
        x.prototype = {
            eB: function (O) {
                return t(this.elements, O, 'children');
            },
            add: function (O, P) {
                return u(this.elements, O, P, 'children');
            },
            remove: function (O) {
                v(this.elements, O, 'children');
            }
        };

        function y(O) {
            var P = null,
                Q = null,
                R = O.getElement().getFirst(),
                S = O.eY(),
                T = S.config.dialog_magnetDistance,
                U = S.skin.margins || [0, 0, 0, 0];
            if (typeof T == 'undefined') T = 20;

            function V(X) {
                var Y = O.hR(),
                    Z = a.document.aU().eR(),
                    aa = X.data.$.screenX,
                    aT = X.data.$.screenY,
                    bm = aa - P.x,
                    aA = aT - P.y,
                    au, aD;
                P = {
                    x: aa,
                    y: aT
                };
                Q.x += bm;
                Q.y += aA;
                if (Q.x + U[3] < T) au = -U[3];
                else if (Q.x - U[1] > Z.width - Y.width - T) au = Z.width - Y.width + U[1];
                else au = Q.x;
                if (Q.y + U[0] < T) aD = -U[0];
                else if (Q.y - U[2] > Z.height - Y.height - T) aD = Z.height - Y.height + U[2];
                else aD = Q.y;
                O.move(au, aD);
                X.data.preventDefault();
            };

            function W(X) {
                a.document.aF('mousemove', V);
                a.document.aF('mouseup', W);
                if (e.ie6Compat) {
                    var Y = B.aC(0).getFrameDocument();
                    Y.aF('mousemove', V);
                    Y.aF('mouseup', W);
                }
            };
            O.bO.title.on('mousedown', function (X) {
                O._.gH = true;
                P = {
                    x: X.data.$.screenX,
                    y: X.data.$.screenY
                };
                a.document.on('mousemove', V);
                a.document.on('mouseup', W);
                Q = O.gz();
                if (e.ie6Compat) {
                    var Y = B.aC(0).getFrameDocument();
                    Y.on('mousemove', V);
                    Y.on('mouseup', W);
                }
                X.data.preventDefault();
            }, O);
        };

        function z(O) {
            var P = O.dg,
                Q = P.minWidth || 0,
                R = P.minHeight || 0,
                S = P.jy,
                T = O.eY().skin.margins || [0, 0, 0, 0];

            function U(aD, aP) {
                aD.y += aP;
            };

            function V(aD, aP) {
                aD.eS += aP;
            };

            function W(aD, aP) {
                aD.fi += aP;
            };

            function X(aD, aP) {
                aD.x += aP;
            };
            var Y = null,
                Z = null,
                aa = O._.app.config.ux,
                aT = ['tl', 't', 'tr', 'l', 'r', 'bl', 'b', 'br'];

            function bm(aD) {
                var aP = aD.jO.fU,
                    bV = O.hR();
                Z = O.gz();
                h.extend(Z, {
                    eS: Z.x + bV.width,
                    fi: Z.y + bV.height
                });
                Y = {
                    x: aD.data.$.screenX,
                    y: aD.data.$.screenY
                };
                a.document.on('mousemove', aA, O, {
                    fU: aP
                });
                a.document.on('mouseup', au, O, {
                    fU: aP
                });
                if (e.ie6Compat) {
                    var eN = B.aC(0).getFrameDocument();
                    eN.on('mousemove', aA, O, {
                        fU: aP
                    });
                    eN.on('mouseup', au, O, {
                        fU: aP
                    });
                }
                aD.data.preventDefault();
            };

            function aA(aD) {
                var aP = aD.data.$.screenX,
                    bV = aD.data.$.screenY,
                    eN = aP - Y.x,
                    gB = bV - Y.y,
                    dX = a.document.aU().eR(),
                    gs = aD.jO.fU;
                if (gs.search('t') != -1) U(Z, gB);
                if (gs.search('l') != -1) X(Z, eN);
                if (gs.search('b') != -1) W(Z, gB);
                if (gs.search('r') != -1) V(Z, eN);
                Y = {
                    x: aP,
                    y: bV
                };
                var am, gP, gR, pw;
                if (Z.x + T[3] < aa) am = -T[3];
                else if (gs.search('l') != -1 && Z.eS - Z.x < Q + aa) am = Z.eS - Q;
                else am = Z.x;
                if (Z.y + T[0] < aa) gP = -T[0];
                else if (gs.search('t') != -1 && Z.fi - Z.y < R + aa) gP = Z.fi - R;
                else gP = Z.y;
                if (Z.eS - T[1] > dX.width - aa) gR = dX.width + T[1];
                else if (gs.search('r') != -1 && Z.eS - Z.x < Q + aa) gR = Z.x + Q;
                else gR = Z.eS;
                if (Z.fi - T[2] > dX.height - aa) pw = dX.height + T[2];
                else if (gs.search('b') != -1 && Z.fi - Z.y < R + aa) pw = Z.y + R;
                else pw = Z.fi;
                O.move(am, gP);
                O.resize(gR - am, pw - gP);
                aD.data.preventDefault();
            };

            function au(aD) {
                a.document.aF('mouseup', au);
                a.document.aF('mousemove', aA);
                if (e.ie6Compat) {
                    var aP = B.aC(0).getFrameDocument();
                    aP.aF('mouseup', au);
                    aP.aF('mousemove', aA);
                }
            };
        };
        var A, B, C = function (O) {
            var P = a.document.aU();
            if (!B) {
                var Q = O.config.so || 'white',
                    R = ['<div style="position: ', e.ie6Compat ? 'absolute' : 'fixed', '; z-index: ', O.config.baseFloatZIndex, '; top: 0px; left: 0px; ', !e.ie6Compat ? 'background-color: ' + Q : '', '" id="cke_dialog_background_cover">'];
                if (e.ie6Compat) {
                    var S = e.isCustomDomain(),
                        T = "<html><body style=\\'background-color:" + Q + ";\\'></body></html>";
                    R.push('<iframe hp="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                    R.push('void((function(){document.open();' + (S ? "document.domain='" + document.domain + "';" : '') + "document.write( '" + T + "' );" + 'document.close();' + '})())');
                    R.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>');
                }
                R.push('</div>');
                B = j.et(R.join(''), a.document);
            }
            var U = B,
                V = function () {
                    var Z = P.eR();
                    U.setStyles({
                        width: Z.width + 'px',
                        height: Z.height + 'px'
                    });
                },
                W = function () {
                    var Z = P.hV(),
                        aa = a.dialog._.dL;
                    U.setStyles({
                        left: Z.x + 'px',
                        top: Z.y + 'px'
                    });
                    do {
                        var aT = aa.gz();
                        aa.move(aT.x, aT.y);
                    } while (aa = aa._.ep)
                };
            A = V;
            P.on('resize', V);
            V();
            if (e.ie6Compat) {
                var X = function () {
                    W();
                    arguments.callee.lw.apply(this, arguments);
                };
                P.$.setTimeout(function () {
                    X.lw = window.onscroll || (function () {});
                    window.onscroll = X;
                }, 0);
                W();
            }
            var Y = O.config.dialog_backgroundCoverOpacity;
            U.setOpacity(typeof Y != 'undefined' ? Y : 0.5);
            U.appendTo(a.document.bH());
        },
            D = function () {
                if (!B) return;
                var O = a.document.aU();
                B.remove();
                O.aF('resize', A);
                if (e.ie6Compat) O.$.setTimeout(function () {
                    var P = window.onscroll && window.onscroll.lw;
                    window.onscroll = P || null;
                }, 0);
                A = null;
            },
            E = {},
            F = function (O) {
                var P = O.data.$.ctrlKey || O.data.$.metaKey,
                    Q = O.data.$.altKey,
                    R = O.data.$.shiftKey,
                    S = String.fromCharCode(O.data.$.keyCode),
                    T = E[(P ? 'bP+' : '') + (Q ? 'eJ+' : '') + (R ? 'dy+' : '') + S];
                if (!T || !T.length) return;
                T = T[T.length - 1];
                T.keydown && T.keydown.call(T.bf, T.dialog, T.iK);
                O.data.preventDefault();
            },
            G = function (O) {
                var P = O.data.$.ctrlKey || O.data.$.metaKey,
                    Q = O.data.$.altKey,
                    R = O.data.$.shiftKey,
                    S = String.fromCharCode(O.data.$.keyCode),
                    T = E[(P ? 'bP+' : '') + (Q ? 'eJ+' : '') + (R ? 'dy+' : '') + S];
                if (!T || !T.length) return;
                T = T[T.length - 1];
                if (T.keyup) {
                    T.keyup.call(T.bf, T.dialog, T.iK);
                    O.data.preventDefault();
                }
            },
            H = function (O, P, Q, R, S) {
                var T = E[Q] || (E[Q] = []);
                T.push({
                    bf: O,
                    dialog: P,
                    iK: Q,
                    keyup: S || O.eZ,
                    keydown: R || O.iU
                });
            },
            I = function (O) {
                for (var P in E) {
                    var Q = E[P];
                    for (var R = Q.length - 1; R >= 0; R--) {
                        if (Q[R].dialog == O || Q[R].bf == O) Q.splice(R, 1);
                    }
                    if (Q.length === 0) delete E[P];
                }
            },
            J = function (O, P) {
                if (O._.iX[P]) O.selectPage(O._.iX[P]);
            },
            K = function (O, P) {},
            L = {
                27: 1,
                13: 1
            },
            M = function (O) {
                if (O.data.db() in L) O.data.stopPropagation();
            };
        (function () {
            m.dialog = {
                bf: function (O, P, Q, R, S, T, U) {
                    if (arguments.length < 4) return;
                    var V = (R.call ? R(P) : R) || 'div',
                        W = ['<', V, ' '],
                        X = (S && S.call ? S(P) : S) || {},
                        Y = (T && T.call ? T(P) : T) || {},
                        Z = (U && U.call ? U(O, P) : U) || '',
                        aa = this.oJ = Y.id || h.getNextNumber() + '_uiElement',
                        aT = this.id = P.id,
                        bm;
                    Y.id = aa;
                    var aA = {};
                    if (P.type) aA['cke_dialog_ui_' + P.type] = 1;
                    if (P.className) aA[P.className] = 1;
                    var au = Y['class'] && Y['class'].split ? Y['class'].split(' ') : [];
                    for (bm = 0; bm < au.length; bm++) {
                        if (au[bm]) aA[au[bm]] = 1;
                    }
                    var aD = [];
                    for (bm in aA) aD.push(bm);
                    Y['class'] = aD.join(' ');
                    if (P.title) Y.title = P.title;
                    var aP = (P.style || '').split(';');
                    for (bm in X) aP.push(bm + ':' + X[bm]);
                    if (P.hidden) aP.push('display:none');
                    for (bm = aP.length - 1; bm >= 0; bm--) {
                        if (aP[bm] === '') aP.splice(bm, 1);
                    }
                    if (aP.length > 0) Y.style = (Y.style ? Y.style + '; ' : '') + aP.join('; ');
                    for (bm in Y) W.push(bm + '="' + h.htmlEncode(Y[bm]) + '" ');
                    W.push('>', Z, '</', V, '>');
                    Q.push(W.join(''));
                    (this._ || (this._ = {})).dialog = O;
                    if (typeof P.isChanged == 'boolean') this.isChanged = function () {
                        return P.isChanged;
                    };
                    if (typeof P.isChanged == 'function') this.isChanged = P.isChanged;
                    a.event.du(this);
                    this.nc(P);
                    if (this.eZ && this.iU && P.accessKey) H(this, O, 'bP+' + P.accessKey);
                    var bV = this;
                    O.on('load', function () {
                        if (bV.getInputElement()) bV.getInputElement().on('focus', function () {
                            O._.eC = false;
                            O._.hasFocus = true;
                            bV.oW('focus');
                        }, bV);
                    });
                    if (this.eA) {
                        this.cQ = O._.eO.push(this) - 1;
                        this.on('focus', function () {
                            O._.gu = bV.cQ;
                        });
                    }
                    h.extend(this, P);
                },
                hbox: function (O, P, Q, R, S) {
                    if (arguments.length < 4) return;
                    this._ || (this._ = {});
                    var T = this._.children = P,
                        U = S && S.widths || null,
                        V = S && S.height || null,
                        W = {},
                        X, Y = function () {
                            var Z = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                            for (X = 0; X < Q.length; X++) {
                                var aa = 'cke_dialog_ui_hbox_child',
                                    aT = [];
                                if (X === 0) aa = 'cke_dialog_ui_hbox_first';
                                if (X == Q.length - 1) aa = 'cke_dialog_ui_hbox_last';
                                Z.push('<td class="', aa, '" ');
                                if (U) {
                                    if (U[X]) aT.push('width:' + h.cssLength(U[X]));
                                } else aT.push('width:' + Math.floor(100 / Q.length) + '%');
                                if (V) aT.push('height:' + h.cssLength(V));
                                if (S && S.padding != undefined) aT.push('padding:' + h.cssLength(S.padding));
                                if (aT.length > 0) Z.push('style="' + aT.join('; ') + '" ');
                                Z.push('>', Q[X], '</td>');
                            }
                            Z.push('</tr></tbody>');
                            return Z.join('');
                        };
                    m.dialog.bf.call(this, O, S || {
                        type: 'hbox'
                    }, R, 'table', W, S && S.align && {
                        align: S.align
                    } || null, Y);
                },
                vbox: function (O, P, Q, R, S) {
                    if (arguments.length < 3) return;
                    this._ || (this._ = {});
                    var T = this._.children = P,
                        U = S && S.width || null,
                        V = S && S.vY || null,
                        W = function () {
                            var X = ['<table cellspacing="0" border="0" '];
                            X.push('style="');
                            if (S && S.expand) X.push('height:100%;');
                            X.push('width:' + h.cssLength(U || '100%'), ';');
                            X.push('"');
                            X.push('align="', h.htmlEncode(S && S.align || (O.eY().lang.dir == 'ltr' ? 'left' : 'right')), '" ');
                            X.push('><tbody>');
                            for (var Y = 0; Y < Q.length; Y++) {
                                var Z = [];
                                X.push('<tr><td ');
                                if (U) Z.push('width:' + h.cssLength(U || '100%'));
                                if (V) Z.push('height:' + h.cssLength(V[Y]));
                                else if (S && S.expand) Z.push('height:' + Math.floor(100 / Q.length) + '%');
                                if (S && S.padding != undefined) Z.push('padding:' + h.cssLength(S.padding));
                                if (Z.length > 0) X.push('style="', Z.join('; '), '" ');
                                X.push(' class="cke_dialog_ui_vbox_child">', Q[Y], '</td></tr>');
                            }
                            X.push('</tbody></table>');
                            return X.join('');
                        };
                    m.dialog.bf.call(this, O, S || {
                        type: 'vbox'
                    }, R, 'div', null, null, W);
                }
            };
        })();
        m.dialog.bf.prototype = {
            getElement: function () {
                return a.document.getById(this.oJ);
            },
            getInputElement: function () {
                return this.getElement();
            },
            getDialog: function () {
                return this._.dialog;
            },
            setValue: function (O) {
                this.getInputElement().setValue(O);
                this.oW('change', {
                    value: O
                });
                return this;
            },
            getValue: function () {
                return this.getInputElement().getValue();
            },
            isChanged: function () {
                return false;
            },
            selectParentTab: function () {
                var R = this;
                var O = R.getInputElement(),
                    P = O,
                    Q;
                while ((P = P.getParent()) && P.$.className.search('cke_dialog_page_contents') == -1) {}
                if (!P) return R;
                Q = P.getAttribute('name');
                if (R._.dialog._.gx != Q) R._.dialog.selectPage(Q);
                return R;
            },
            focus: function () {
                this.selectParentTab().getInputElement().focus();
                return this;
            },
            nc: function (O) {
                var P = /^on([A-Z]\w+)/,
                    Q, R = function (T, U, V, W) {
                        U.on('load', function () {
                            T.getInputElement().on(V, W, T);
                        });
                    };
                for (var S in O) {
                    if (!(Q = S.match(P))) continue;
                    if (this.dm[S]) this.dm[S].call(this, this._.dialog, O[S]);
                    else R(this, this._.dialog, Q[1].toLowerCase(), O[S]);
                }
                return this;
            },
            dm: {
                onLoad: function (O, P) {
                    O.on('load', P, this);
                },
                onShow: function (O, P) {
                    O.on('show', P, this);
                },
                onHide: function (O, P) {
                    O.on('hide', P, this);
                }
            },
            iU: function (O, P) {
                this.focus();
            },
            eZ: function (O, P) {},
            disable: function () {
                var O = this.getInputElement();
                O.setAttribute('disabled', 'true');
                O.addClass('cke_disabled');
            },
            enable: function () {
                var O = this.getInputElement();
                O.removeAttribute('disabled');
                O.removeClass('cke_disabled');
            },
            isEnabled: function () {
                return !this.getInputElement().getAttribute('disabled');
            },
            isVisible: function () {
                return this.getInputElement().isVisible();
            },
            fM: function () {
                if (!this.isEnabled() || !this.isVisible()) return false;
                return true;
            }
        };
        m.dialog.hbox.prototype = h.extend(new m.dialog.bf(), {
            aC: function (O) {
                var P = this;
                if (arguments.length < 1) return P._.children.concat();
                if (!O.splice) O = [O];
                if (O.length < 2) return P._.children[O[0]];
                else return P._.children[O[0]] && P._.children[O[0]].aC ? P._.children[O[0]].aC(O.slice(1, O.length)) : null;
            }
        }, true);
        m.dialog.vbox.prototype = new m.dialog.hbox();
        (function () {
            var O = {
                dQ: function (P, Q, R) {
                    var S = Q.children,
                        T, U = [],
                        V = [];
                    for (var W = 0; W < S.length && (T = S[W]); W++) {
                        var X = [];
                        U.push(X);
                        V.push(a.dialog._.gv[T.type].dQ(P, T, X));
                    }
                    return new m.dialog[Q.type](P, V, U, R, Q);
                }
            };
            a.dialog.addUIElement('hbox', O);
            a.dialog.addUIElement('vbox', O);
        })();
        a.rB = function (O) {
            this.ry = O;
        };
        a.rB.prototype = {
            exec: function (O) {
                O.openDialog(this.ry);
            },
            sG: false
        };
        (function () {
            var O = /^([a]|[^a])+$/,
                P = /^\d*$/,
                Q = /^\d*(?:\.\d+)?$/;
            a.sg = 1;
            a.jb = 2;
            a.dialog.validate = {
                functions: function () {
                    return function () {
                        var X = this;
                        var R = X && X.getValue ? X.getValue() : arguments[0],
                            S = undefined,
                            T = a.jb,
                            U = [],
                            V;
                        for (V = 0; V < arguments.length; V++) {
                            if (typeof arguments[V] == 'function') U.push(arguments[V]);
                            else break;
                        }
                        if (V < arguments.length && typeof arguments[V] == 'string') {
                            S = arguments[V];
                            V++;
                        }
                        if (V < arguments.length && typeof arguments[V] == 'number') T = arguments[V];
                        var W = T == a.jb ? true : false;
                        for (V = 0; V < U.length; V++) {
                            if (T == a.jb) W = W && U[V](R);
                            else W = W || U[V](R);
                        }
                        if (!W) {
                            if (S !== undefined) alert(S);
                            if (X && (X.select || X.focus)) X.select || X.focus();
                            return false;
                        }
                        return true;
                    };
                },
                regex: function (R, S) {
                    return function () {
                        var U = this;
                        var T = U && U.getValue ? U.getValue() : arguments[0];
                        if (!R.test(T)) {
                            if (S !== undefined) alert(S);
                            if (U && (U.select || U.focus)) if (U.select) U.select();
                            else U.focus();
                            return false;
                        }
                        return true;
                    };
                },
                notEmpty: function (R) {
                    return this.regex(O, R);
                },
                integer: function (R) {
                    return this.regex(P, R);
                },
                number: function (R) {
                    return this.regex(Q, R);
                },
                equals: function (R, S) {
                    return this.functions(function (T) {
                        return T == R;
                    }, S);
                },
                notEqual: function (R, S) {
                    return this.functions(function (T) {
                        return T != R;
                    }, S);
                }
            };
        })();

        function N(O, P) {
            var Q = function () {
                S(this);
                P(this);
            },
                R = function () {
                    S(this);
                },
                S = function (T) {
                    T.aF('ok', Q);
                    T.aF('cancel', R);
                };
            O.on('ok', Q);
            O.on('cancel', R);
        };
        h.extend(a.application.prototype, {
            openDialog: function (O, P, Q) {
                var R = a.dialog._.ev[O];
                if (typeof R == 'function') {
                    var S = this._.oB || (this._.oB = {}),
                        T = S[O] || (S[O] = new a.dialog(this, O));
                    P && P.call(T, T);
                    T.show();
                    return T;
                } else if (R == 'failed') throw new Error('[CKFINDER.dialog.openDialog] Dialog "' + O + '" failed when loading dg.');
                var U = a.document.bH(),
                    V = U.$.style.cursor,
                    W = this;
                U.setStyle('cursor', 'wait');
                a.ec.load(a.getUrl(R), function () {
                    if (typeof a.dialog._.ev[O] != 'function') a.dialog._.ev[O] = 'failed';
                    W.openDialog(O, P);
                    U.setStyle('cursor', V);
                }, null, null, Q);
                return null;
            },
            hs: function (O, P, Q, R) {
                var S = this;
                setTimeout(function () {
                    S.cg.openDialog('Input', function (T) {
                        T.show();
                        T.setTitle(O || S.lang.common.inputTitle);
                        T.getContentElement('tab1', 'msg').getElement().setHtml(P);
                        T.getContentElement('tab1', 'input').setValue(Q);
                        N(T, function (U) {
                            var V = U.getContentElement('tab1', 'input').getValue();
                            R(V);

                        });
                    });
                }, 0);
            },
            msgDialog: function (O, P, Q) {
                var R = this;
                setTimeout(function () {
                    R.cg.openDialog('Msg', function (S) {
                        S.show();
                        S.setTitle(O || R.lang.common.messageTitle);
                        S.getContentElement('tab1', 'msg').getElement().setHtml(P);
                        Q && N(S, function (T) {
                            Q();
                        });
                    });
                }, 0);
            },
            fe: function (O, P, Q) {
                var R = this;
                setTimeout(function () {
                    R.cg.openDialog('Confirm', function (S) {
                        S.show();
                        S.setTitle(O || R.lang.common.confirmationTitle);
                        S.getContentElement('tab1', 'msg').getElement().setHtml(P);
                        N(S, function (T) {
                            Q();
                        });
                    });
                }, 0);
            }
        });
        l.add('dialog', {
            bM: ['dialogui'],
            onLoad: function () {
                a.dialog.add('Confirm', function (O) {
                    return {
                        title: O.lang.common.confirmationTitle,
                        minWidth: 270,
                        minHeight: 60,
                        contents: [{
                            id: 'tab1',
                            elements: [{
                                type: 'html',
                                html: '',
                                id: 'msg'
                            }]
                        }],
                        buttons: [CKFinder.dialog.okButton, CKFinder.dialog.cancelButton]
                    };
                });
                a.dialog.add('Msg', function (O) {
                    return {
                        title: O.lang.common.messageTitle,
                        minWidth: 270,
                        minHeight: 60,
                        contents: [{
                            id: 'tab1',
                            elements: [{
                                type: 'html',
                                html: '',
                                id: 'msg'
                            }]
                        }],
                        buttons: [CKFinder.dialog.okButton]
                    };
                });
                a.dialog.add('Input', function (O) {
                    return {
                        title: O.lang.common.inputTitle,
                        minWidth: 270,
                        minHeight: 60,
                        contents: [{
                            id: 'tab1',
                            elements: [{
                                type: 'html',
                                html: '',
                                id: 'msg'
                            },
                            {
                                type: 'text',
                                id: 'input'
                            }]
                        }],
                        buttons: [CKFinder.dialog.okButton, CKFinder.dialog.cancelButton]
                    };
                });
            }
        });
    })();
    l.add('dialogui');
    (function () {
        var o = function (v) {
            var y = this;
            y._ || (y._ = {});
            y._['default'] = y._.hq = v['default'] || '';
            var w = [y._];
            for (var x = 1; x < arguments.length; x++) w.push(arguments[x]);
            w.push(true);
            h.extend.apply(h, w);
            return y._;
        },
            p = {
                dQ: function (v, w, x) {
                    return new m.dialog.ju(v, w, x);
                }
            },
            q = {
                dQ: function (v, w, x) {
                    return new m.dialog[w.type](v, w, x);
                }
            },
            r = {
                isChanged: function () {
                    return this.getValue() != this.lu();
                },
                reset: function () {
                    this.setValue(this.lu());
                },
                jW: function () {
                    this._.hq = this.getValue();
                },
                ki: function () {
                    this._.hq = this._['default'];
                },
                lu: function () {
                    return this._.hq;
                }
            },
            s = h.extend({}, m.dialog.bf.prototype.dm, {
                onChange: function (v, w) {
                    if (!this._.pL) {
                        v.on('load', function () {
                            this.getInputElement().on('change', function () {
                                this.oW('change', {
                                    value: this.getValue()
                                });
                            }, this);
                        }, this);
                        this._.pL = true;
                    }
                    this.on('change', w);
                }
            }, true),
            t = /^on([A-Z]\w+)/,
            u = function (v) {
                for (var w in v) {
                    if (t.test(w) || w == 'title' || w == 'type') delete v[w];
                }
                return v;
            };
        h.extend(m.dialog, {
            dD: function (v, w, x, y) {
                if (arguments.length < 4) return;
                var z = o.call(this, w);
                z.hz = h.getNextNumber() + '_label';
                var A = this._.children = [],
                    B = function () {
                        var C = [];
                        if (w.uC != 'horizontal') C.push('<div class="cke_dialog_ui_labeled_label" id="', z.hz, '" >', w.label, '</div>', '<div class="cke_dialog_ui_labeled_content">', y(v, w), '</div>');
                        else {
                            var D = {
                                type: 'hbox',
                                widths: w.widths,
                                padding: 0,
                                children: [{
                                    type: 'html',
                                    html: '<span class="cke_dialog_ui_labeled_label" id="' + z.hz + '">' + h.htmlEncode(w.label) + '</span>'
                                },
                                {
                                    type: 'html',
                                    html: '<span class="cke_dialog_ui_labeled_content">' + y(v, w) + '</span>'
                                }]
                            };
                            a.dialog._.gv.hbox.dQ(v, D, C);
                        }
                        return C.join('');
                    };
                m.dialog.bf.call(this, v, w, x, 'div', null, null, B);
            },
            ju: function (v, w, x) {
                if (arguments.length < 3) return;
                o.call(this, w);
                var y = this._.le = h.getNextNumber() + '_textInput',
                    z = {
                        'class': 'cke_dialog_ui_input_' + w.type,
                        id: y,
                        type: 'text'
                    },
                    A;
                if (w.validate) this.validate = w.validate;
                if (w.maxLength) z.uy = w.maxLength;
                if (w.size) z.size = w.size;
                var B = this,
                    C = false;
                v.on('load', function () {
                    B.getInputElement().on('keydown', function (E) {
                        if (E.data.db() == 13) C = true;
                    });
                    B.getInputElement().on('keyup', function (E) {
                        if (E.data.db() == 13 && C) {
                            v.getButton('ok') && setTimeout(function () {
                                v.getButton('ok').click();
                            }, 0);
                            C = false;
                        }
                    }, null, null, 1000);
                });
                var D = function () {
                    var E = ['<div class="cke_dialog_ui_input_', w.type, '"'];
                    if (w.width) E.push('style="width:' + w.width + '" ');
                    E.push('><input ');
                    for (var F in z) E.push(F + '="' + z[F] + '" ');
                    E.push(' /></div>');
                    return E.join('');
                };
                m.dialog.dD.call(this, v, w, x, D);
            },
            textarea: function (v, w, x) {
                if (arguments.length < 3) return;
                o.call(this, w);
                var y = this,
                    z = this._.le = h.getNextNumber() + '_textarea',
                    A = {};
                if (w.validate) this.validate = w.validate;
                A.rows = w.rows || 5;
                A.cols = w.cols || 20;
                var B = function () {
                    var C = ['<div class="cke_dialog_ui_input_textarea"><textarea class="cke_dialog_ui_input_textarea" id="', z, '" '];
                    for (var D in A) C.push(D + '="' + h.htmlEncode(A[D]) + '" ');
                    C.push('>', h.htmlEncode(y._['default']), '</textarea></div>');
                    return C.join('');
                };
                m.dialog.dD.call(this, v, w, x, B);
            },
            checkbox: function (v, w, x) {
                if (arguments.length < 3) return;
                var y = o.call(this, w, {
                    'default': !!w['default']
                });
                if (w.validate) this.validate = w.validate;
                var z = function () {
                    var A = h.extend({}, w, {
                        id: w.id ? w.id + '_checkbox' : h.getNextNumber() + '_checkbox'
                    }, true),
                        B = [],
                        C = {
                            'class': 'cke_dialog_ui_checkbox_input',
                            type: 'checkbox'
                        };
                    u(A);
                    if (w['default']) C.checked = 'checked';
                    y.checkbox = new m.dialog.bf(v, A, B, 'input', null, C);
                    B.push(' <label for="', C.id, '">', h.htmlEncode(w.label), '</label>');
                    return B.join('');
                };
                m.dialog.bf.call(this, v, w, x, 'span', null, null, z);
            },
            radio: function (v, w, x) {
                if (arguments.length < 3) return;
                o.call(this, w);
                if (!this._['default']) this._['default'] = this._.hq = w.items[0][1];
                if (w.validate) this.validate = w.sh;
                var y = [],
                    z = this,
                    A = function () {
                        var B = [],
                            C = [],
                            D = {
                                'class': 'cke_dialog_ui_radio_item'
                            },
                            E = w.id ? w.id + '_radio' : h.getNextNumber() + '_radio';
                        for (var F = 0; F < w.items.length; F++) {
                            var G = w.items[F],
                                H = G[2] !== undefined ? G[2] : G[0],
                                I = G[1] !== undefined ? G[1] : G[0],
                                J = h.extend({}, w, {
                                    id: h.getNextNumber() + '_radio_input',
                                    title: null,
                                    type: null
                                }, true),
                                K = h.extend({}, J, {
                                    id: null,
                                    title: H
                                }, true),
                                L = {
                                    type: 'radio',
                                    'class': 'cke_dialog_ui_radio_input',
                                    name: E,
                                    value: I
                                },
                                M = [];
                            if (z._['default'] == I) L.checked = 'checked';
                            u(J);
                            u(K);
                            y.push(new m.dialog.bf(v, J, M, 'input', null, L));
                            M.push(' ');
                            new m.dialog.bf(v, K, M, 'label', null, {
                                'for': L.id
                            }, G[0]);
                            B.push(M.join(''));
                        }
                        new m.dialog.hbox(v, [], B, C);
                        return C.join('');
                    };
                m.dialog.dD.call(this, v, w, x, A);
                this._.children = y;
            },
            button: function (v, w, x) {
                if (!arguments.length) return;
                if (typeof w == 'function') w = w(v.eY());
                o.call(this, w, {
                    disabled: w.disabled || false
                });
                a.event.du(this);
                var y = this;
                v.on('load', function (A) {
                    var B = this.getElement();
                    (function () {
                        B.on('click', function (C) {
                            y.oW('click', {
                                dialog: y.getDialog()
                            });
                            C.data.preventDefault();
                        });
                    })();
                    B.unselectable();
                }, this);
                var z = h.extend({}, w);
                delete z.style;
                m.dialog.bf.call(this, v, z, x, 'a', null, {
                    style: w.style,
                    href: 'javascript:void(0)',
                    title: w.label,
                    hp: 'true',
                    'class': w['class']
                }, '<span class="cke_dialog_ui_button">' + h.htmlEncode(w.label) + '</span>');
            },
            select: function (v, w, x) {
                if (arguments.length < 3) return;
                var y = o.call(this, w);
                if (w.validate) this.validate = w.validate;
                var z = function () {
                    var A = h.extend({}, w, {
                        id: w.id ? w.id + '_select' : h.getNextNumber() + '_select'
                    }, true),
                        B = [],
                        C = [],
                        D = {
                            'class': 'cke_dialog_ui_input_select'
                        };
                    if (w.size != undefined) D.size = w.size;
                    if (w.multiple != undefined) D.multiple = w.multiple;
                    u(A);
                    for (var E = 0, F; E < w.items.length && (F = w.items[E]); E++) C.push('<option value="', h.htmlEncode(F[1] !== undefined ? F[1] : F[0]), '" /> ', h.htmlEncode(F[0]));
                    y.select = new m.dialog.bf(v, A, B, 'select', null, D, C.join(''));
                    return B.join('');
                };
                m.dialog.dD.call(this, v, w, x, z);
            },
            file: function (v, w, x) {
                if (arguments.length < 3) return;
                if (w['default'] === undefined) w['default'] = '';
                var y = h.extend(o.call(this, w), {
                    dg: w,
                    buttons: []
                });
                if (w.validate) this.validate = w.validate;
                var z = function () {
                    y.gL = h.getNextNumber() + '_fileInput';
                    var A = e.isCustomDomain(),
                        B = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" id="', y.gL, '" title="', w.label, '" src="javascript:void('];
                    B.push(A ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
                    B.push(')"></iframe>');
                    return B.join('');
                };
                v.on('load', function () {
                    var A = a.document.getById(y.gL),
                        B = A.getParent();
                    B.addClass('cke_dialog_ui_input_file');
                });
                m.dialog.dD.call(this, v, w, x, z);
            },
            fileButton: function (v, w, x) {
                if (arguments.length < 3) return;
                var y = o.call(this, w),
                    z = this;
                if (w.validate) this.validate = w.validate;
                var A = h.extend({}, w),
                    B = A.onClick;
                A.className = (A.className ? A.className + ' ' : '') + 'cke_dialog_ui_button';
                A.onClick = function (C) {
                    var D = w['for'];
                    if (!B || B.call(this, C) !== false) {
                        v.getContentElement(D[0], D[1]).submit();
                        this.disable();
                    }
                };
                v.on('load', function () {
                    v.getContentElement(w['for'][0], w['for'][1])._.buttons.push(z);
                });
                m.dialog.button.call(this, v, A, x);
            },
            html: (function () {
                var v = /^\s*<[\w:]+\s+([^>]*)?>/,
                    w = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,
                    x = /\/$/;
                return function (y, z, A) {
                    if (arguments.length < 3) return;
                    var B = [],
                        C, D = z.html,
                        E, F;
                    if (D.charAt(0) != '<') D = '<span>' + D + '</span>';
                    if (z.focus) {
                        var G = this.focus;
                        this.focus = function () {
                            G.call(this);
                            z.focus.call(this);
                            this.oW('focus');
                        };
                        if (z.fM) {
                            var H = this.fM;
                            this.fM = H;
                        }
                        this.eA = true;
                    }
                    m.dialog.bf.call(this, y, z, B, 'span', null, null, '');
                    C = B.join('');
                    E = C.match(v);
                    F = D.match(w) || ['', '', ''];
                    if (x.test(F[1])) {
                        F[1] = F[1].slice(0, -1);
                        F[2] = '/' + F[2];
                    }
                    A.push([F[1], ' ', E[1] || '', F[2]].join(''));
                };
            })()
        }, true);
        m.dialog.html.prototype = new m.dialog.bf();
        m.dialog.dD.prototype = h.extend(new m.dialog.bf(), {
            rW: function (v) {
                var w = a.document.getById(this._.hz);
                if (w.iu() < 1) new g.text(v, a.document).appendTo(w);
                else w.aC(0).$.nodeValue = v;
                return this;
            },
            vt: function () {
                var v = a.document.getById(this._.hz);
                if (!v || v.iu() < 1) return '';
                else return v.aC(0).getText();
            },
            dm: s
        }, true);
        m.dialog.button.prototype = h.extend(new m.dialog.bf(), {
            click: function () {
                var v = this;
                if (!v._.disabled) return v.oW('click', {
                    dialog: v._.dialog
                });
                v.getElement().$.blur();
                return false;
            },
            enable: function () {
                this._.disabled = false;
                var v = this.getElement();
                v && v.removeClass('disabled');
            },
            disable: function () {
                this._.disabled = true;
                this.getElement().addClass('disabled');
            },
            isVisible: function () {
                return this.getElement().getFirst().isVisible();
            },
            isEnabled: function () {
                return !this._.disabled;
            },
            dm: h.extend({}, m.dialog.bf.prototype.dm, {
                onClick: function (v, w) {
                    this.on('click', w);
                }
            }, true),
            eZ: function () {
                this.click();
            },
            iU: function () {
                this.focus();
            },
            eA: true
        }, true);
        m.dialog.ju.prototype = h.extend(new m.dialog.dD(), {
            getInputElement: function () {
                return a.document.getById(this._.le);
            },
            focus: function () {
                var v = this.selectParentTab();
                setTimeout(function () {
                    var w = v.getInputElement();
                    w && w.$.focus();
                }, 0);
            },
            select: function () {
                var v = this.selectParentTab();
                setTimeout(function () {
                    var w = v.getInputElement();
                    if (w) {
                        w.$.focus();
                        w.$.select();
                    }
                }, 0);
            },
            eZ: function () {
                this.select();
            },
            setValue: function (v) {
                v = v !== null ? v : '';
                return m.dialog.bf.prototype.setValue.call(this, v);
            },
            eA: true
        }, r, true);
        m.dialog.textarea.prototype = new m.dialog.ju();
        m.dialog.select.prototype = h.extend(new m.dialog.dD(), {
            getInputElement: function () {
                return this._.select.getElement();
            },
            add: function (v, w, x) {
                var y = new j('option', this.getDialog().eY().document),
                    z = this.getInputElement().$;
                y.$.text = v;
                y.$.value = w === undefined || w === null ? v : w;
                if (x === undefined || x === null) {
                    if (f) z.add(y.$);
                    else z.add(y.$, null);
                } else z.add(y.$, x);
                return this;
            },
            remove: function (v) {
                var w = this.getInputElement().$;
                w.remove(v);
                return this;
            },
            clear: function () {
                var v = this.getInputElement().$;
                while (v.length > 0) v.remove(0);
                return this;
            },
            eA: true
        }, r, true);
        m.dialog.checkbox.prototype = h.extend(new m.dialog.bf(), {
            getInputElement: function () {
                return this._.checkbox.getElement();
            },
            setValue: function (v) {
                this.getInputElement().$.checked = v;
                this.oW('change', {
                    value: v
                });
            },
            getValue: function () {
                return this.getInputElement().$.checked;
            },
            eZ: function () {
                this.setValue(!this.getValue());
            },
            dm: {
                onChange: function (v, w) {
                    if (!f) return s.onChange.apply(this, arguments);
                    else {
                        v.on('load', function () {
                            var x = this._.checkbox.getElement();
                            x.on('propertychange', function (y) {
                                y = y.data.$;
                                if (y.propertyName == 'checked') this.oW('change', {
                                    value: x.$.checked
                                });
                            }, this);
                        }, this);
                        this.on('change', w);
                    }
                    return null;
                }
            },
            eA: true
        }, r, true);
        m.dialog.radio.prototype = h.extend(new m.dialog.bf(), {
            setValue: function (v) {
                var w = this._.children,
                    x;
                for (var y = 0; y < w.length && (x = w[y]); y++) x.getElement().$.checked = x.getValue() == v;
                this.oW('change', {
                    value: v
                });
            },
            getValue: function () {
                var v = this._.children;
                for (var w = 0; w < v.length; w++) {
                    if (v[w].getElement().$.checked) return v[w].getValue();
                }
                return null;
            },
            eZ: function () {
                var v = this._.children,
                    w;
                for (w = 0; w < v.length; w++) {
                    if (v[w].getElement().$.checked) {
                        v[w].getElement().focus();
                        return;
                    }
                }
                v[0].getElement().focus();
            },
            dm: {
                onChange: function (v, w) {
                    if (!f) return s.onChange.apply(this, arguments);
                    else {
                        v.on('load', function () {
                            var x = this._.children,
                                y = this;
                            for (var z = 0; z < x.length; z++) {
                                var A = x[z].getElement();
                                A.on('propertychange', function (B) {
                                    B = B.data.$;
                                    if (B.propertyName == 'checked' && this.$.checked) y.oW('change', {
                                        value: this.getAttribute('value')
                                    });
                                });
                            }
                        }, this);
                        this.on('change', w);
                    }
                    return null;
                }
            },
            eA: true
        }, r, true);
        m.dialog.file.prototype = h.extend(new m.dialog.dD(), r, {
            getInputElement: function () {
                var v = a.document.getById(this._.gL).getFrameDocument();
                return v.$.forms.length > 0 ? new j(v.$.forms[0].elements[0]) : this.getElement();
            },
            submit: function () {
                this.getInputElement().getParent().$.submit();
                return this;
            },
            vy: function (v) {
                return this.getInputElement().getParent().$.action;
            },
            reset: function () {
                var v = a.document.getById(this._.gL),
                    w = v.getFrameDocument(),
                    x = this._.dg,
                    y = this._.buttons;

                function z() {
                    w.$.open();
                    if (e.isCustomDomain()) w.$.domain = document.domain;
                    var A = '';
                    if (x.size) A = x.size - (f ? 7 : 0);
                    w.$.write(['<html><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" action="', h.htmlEncode(x.action), '">', '<input type="file" name="', h.htmlEncode(x.id || 'cke_upload'), '" size="', h.htmlEncode(A > 0 ? A : ''), '" />', '</form>', '</body></html>'].join(''));
                    w.$.close();
                    for (var B = 0; B < y.length; B++) y[B].enable();
                };
                if (e.gecko) setTimeout(z, 500);
                else z();
            },
            getValue: function () {
                return '';
            },
            dm: s,
            eA: true
        }, true);
        m.dialog.fileButton.prototype = new m.dialog.button();
        a.dialog.addUIElement('text', p);
        a.dialog.addUIElement('password', p);
        a.dialog.addUIElement('textarea', q);
        a.dialog.addUIElement('checkbox', q);
        a.dialog.addUIElement('radio', q);
        a.dialog.addUIElement('button', q);
        a.dialog.addUIElement('select', q);
        a.dialog.addUIElement('file', q);
        a.dialog.addUIElement('fileButton', q);
        a.dialog.addUIElement('html', q);
        h.extend(CKFinder.dialog, a.dialog);
    })();
    (function () {
        l.add('help', {
            bM: ['toolbar', 'button'],
            bz: function lT(o) {
                if (!o.config.disableHelpButton) {
                    o.bD('help', {
                        exec: function (q) {
                            q.aG['filesview.filesview'][0].bn().focus();
                            window.open(a.basePath + 'help/' + (q.lang.HelpLang || 'en') + '/index.html');
                        }
                    });
                    o.bY.add('Help', a.UI_BUTTON, {
                        label: o.lang.Help,
                        command: 'help'
                    });
                }
            }
        });
    })();
    a.skins.add('kama', (function () {
        var o = ['images/loaders/16x16.gif', 'images/loaders/32x32.gif', 'images/ckffolder.gif', 'images/ckffolderopened.gif'];
        if (f && e.version < 7) o.push('icons.png', 'images/sprites_ie6.png');
        return {
            ls: o,
            application: {
                css: ['app.css']
            },
            host: {
                qx: 1,
                css: ['host.css']
            },
            mA: 7,
            kN: 7,
            ps: 1,
            bz: function (p) {
                if (p.config.width && !isNaN(p.config.width)) p.config.width -= 12;
                var q = [],
                    r = '/* UI Color Support */.cke_skin_kama .cke_menuitem .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_label,.cke_skin_kama .cke_menuitem a:focus .cke_label,.cke_skin_kama .cke_menuitem a:active .cke_label{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_label{\tbackground-color: transparent !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuseparator{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover,.cke_skin_kama .cke_menuitem a:focus,.cke_skin_kama .cke_menuitem a:active{\tbackground-color: $color !important;}';
                if (e.webkit) {
                    r = r.split('}').slice(0, -1);
                    for (var s = 0; s < r.length; s++) r[s] = r[s].split('{');
                }
                function t(w) {
                    var x = w.eD().append('style');
                    x.setAttribute('id', 'cke_ui_color');
                    x.setAttribute('type', 'text/css');
                    return x;
                };

                function u(w, x, y) {
                    var z, A, B;
                    for (var C = 0; C < w.length; C++) {
                        if (e.webkit) {
                            for (A = 0; A < w[C].$.sheet.rules.length; A++) w[C].$.sheet.removeRule(A);
                            for (A = 0; A < x.length; A++) {
                                B = x[A][1];
                                for (z = 0; z < y.length; z++) B = B.replace(y[z][0], y[z][1]);
                                w[C].$.sheet.addRule(x[A][0], B);
                            }
                        } else {
                            B = x;
                            for (z = 0; z < y.length; z++) B = B.replace(y[z][0], y[z][1]);
                            if (f) w[C].$.styleSheet.cssText = B;
                            else w[C].setHtml(B);
                        }
                    }
                };
                var v = /\$color/g;
                h.extend(p, {
                    fm: null,
                    rk: function () {
                        return this.fm;
                    },
                    setUiColor: function (w) {
                        var x, y, z = t(a.oC),
                            A = t(this.document),
                            B = '#cke_' + p.name.replace('.', '\\.'),
                            C = [B + ' .cke_wrapper', B + '_dialog .cke_dialog_contents', B + '_dialog a.cke_dialog_tab', B + '_dialog .cke_dialog_footer'].join(','),
                            D = 'background-color: $color !important;';
                        if (e.webkit) {
                            x = [
                                [C, D]
                            ];
                            y = [
                                ['body,' + C, D]
                            ];
                        } else {
                            x = C + '{' + D + '}';
                            y = 'body,' + C + '{' + D + '}';
                        }
                        return (this.setUiColor = function (E) {
                            var F = [
                                [v, E]
                            ];
                            p.fm = E;
                            u([z], x, F);
                            u([A], y, F);
                            u(q, r, F);
                        })(w);
                    }
                });
                p.on('menuShow', function (w) {
                    var x = w.data[0],
                        y = x.ax.eG('iframe').getItem(0).getFrameDocument();
                    if (!y.getById('cke_ui_color')) {
                        var z = t(y);
                        q.push(z);
                        var A = p.rk();
                        if (A) u([z], r, [
                            [v, A]
                        ]);
                    }
                });
                if (p.config.fm) p.setUiColor(p.config.fm);
            }
        };
    })());
    (function () {
        a.dialog ? o() : a.on('dialogPluginReady', o);

        function o() {
            a.dialog.on('resize', function (p) {
                var q = p.data,
                    r = q.width,
                    s = q.height,
                    t = q.dialog,
                    u = t.bO.contents;
                if (q.skin != 'kama') return;
                u.setStyles({
                    width: r + 'px',
                    height: s + 'px'
                });
                setTimeout(function () {
                    var v = t.bO.dialog.aC([0, 0, 0]),
                        w = v.aC(0),
                        x = v.aC(2);
                    x.setStyle('width', w.$.offsetWidth + 'px');
                    x = v.aC(7);
                    x.setStyle('width', w.$.offsetWidth - 28 + 'px');
                    x = v.aC(4);
                    x.setStyle('height', w.$.offsetHeight - 31 - 14 + 'px');
                    x = v.aC(5);
                    x.setStyle('height', w.$.offsetHeight - 31 - 14 + 'px');
                }, 100);
            });
        };
    })();
    a.skins.add('v1', (function () {
        var o = ['images/loaders/16x16.gif', 'images/loaders/32x32.gif', 'images/ckffolder.gif', 'images/ckffolderopened.gif'];
        if (f && e.version < 7) o.push('icons.png', 'images/sprites_ie6.png');
        return {
            ls: o,
            application: {
                css: ['app.css']
            },
            ps: 1,
            rv: -8,
            kN: 0,
            host: {
                qx: 1,
                css: ['host.css']
            }
        };
    })());
    (function () {
        a.dialog ? o() : a.on('dialogPluginReady', o);

        function o() {
            a.dialog.on('resize', function (p) {
                var q = p.data,
                    r = q.width,
                    s = q.height,
                    t = q.dialog,
                    u = t.bO.contents;
                if (q.skin != 'kama') return;
                u.setStyles({
                    width: r + 'px',
                    height: s + 'px'
                });
                setTimeout(function () {
                    var v = t.bO.dialog.aC([0, 0, 0]),
                        w = v.aC(0),
                        x = v.aC(2);
                    x.setStyle('width', w.$.offsetWidth + 'px');
                    x = v.aC(7);
                    x.setStyle('width', w.$.offsetWidth - 28 + 'px');
                    x = v.aC(4);
                    x.setStyle('height', w.$.offsetHeight - 31 - 14 + 'px');
                    x = v.aC(5);
                    x.setStyle('height', w.$.offsetHeight - 31 - 14 + 'px');
                }, 100);
            });
        };
    })();
    a.gc.add('default', (function () {
        return {
            dQ: function (o) {
                var p = o.name,
                    q = o.ax,
                    r = o.ff;
                if (!q || r == a.kZ) return;
                o.layout = new a.application.layout(o);
                var s = o.oW('bW', {
                    space: 'head',
                    html: ''
                }),
                    t = o.oW('bW', {
                        space: 'sidebar',
                        html: ''
                    }),
                    u = o.oW('bW', {
                        space: 'mainTop',
                        html: ''
                    }),
                    v = o.oW('bW', {
                        space: 'mainMiddle',
                        html: ''
                    }),
                    w = o.oW('bW', {
                        space: 'mainBottom',
                        html: ''
                    }),
                    x = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"><html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=8" />' + s.html + '</head>' + '<body>' + (e.ie6Compat ? '<div id="ckfinder" role="application">' : '<div id="ckfinder" role="application" style="visibility: hidden">') + '<!-- 1. CKE Skin class. -->' + '<div class="fake_wrapper cke_skin_' + (o.config.skin || 'kama') + '">' + '<!-- 2. High contrast class. -->' + '<div class="fake_wrapper"><!-- Applicable: hc cke_hc -->' + '<!-- 3. Browser class. -->' + '<div class="fake_wrapper ' + e.cssClass + '">' + '<!-- 4. RTL class. -->' + '<div class="fake_wrapper"><!-- Applicable: rtl cke_rtl -->' + '<!-- 5. Layout class. -->' + '<div class="fake_wrapper">' + '<div id="ckfinder_view" class="columns_2"><!-- Applicable: columns_1 columns_2 -->' + '<div id="sidebar_container" class="container" role="region">' + '<div id="sidebar_wrapper" class="wrapper">' + t.html + '</div>' + '</div>' + '<div id="main_container" class="container" role="region">' + u.html + v.html + w.html + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>' + '</body>' + '</html>';
                a.log('[THEME] DOM flush using document.write');
                o.document.$.write(x);

                function y() {
                    if (e.ie6Compat) o.layout.oG = o.document.aU().eR();
                };
                o.cr('themeLoaded');
                o.cr('uiReady', function () {
                    y();
                    o.cr('appReady', function () {
                        y();
                        if (e.ie8) {
                            var z = o.document.$,
                                A;
                            if (z.documentMode) A = z.documentMode;
                            else {
                                A = 5;
                                if (z.compatMode) if (z.compatMode == 'CSS1Compat') A = 7;
                            }
                            if (A < 8) {
                                var B = '<strong style="color: red;">Forced IE compatibility mode! CKFinder may not look as intended.</strong>',
                                    C = o.plugins.tools;
                                C.showTool(C.addTool(B));
                            }
                        }
                        if (e.ie6Compat) o.document.aU().on('resize', y);
                        o.document.aU().on('resize', function () {
                            o.layout.ea.call(o.layout);
                        });
                        var D;

                        function E() {
                            D = D || o.document.eD().eG('link').getItem(0);
                            var F = 0;
                            if (D) try {
                                if (D.$.sheet && D.$.sheet.cssRules.length > 0) F = 1;
                                else if (D.$.styleSheet && D.$.styleSheet.cssText.length > 0) F = 1;
                                else if (D.$.innerHTML && D.$.innerHTML.length > 0) F = 1;
                            } catch (G) {}
                            if (!F) {
                                window.setTimeout(E, 250);
                                return;
                            }
                            if (e.ie6Compat) {
                                y();
                                o.layout.ea();
                                setTimeout(function () {
                                    o.layout.ea();
                                }, 500);
                            } else {
                                o.layout.ea(true);
                                setTimeout(function () {
                                    o.document.getById('ckfinder').removeStyle('visibility');
                                });
                            }
                            return undefined;
                        };
                        E();
                    });
                });
            },
            pu: function (o) {
                var p = h.getNextNumber(),
                    q = j.et(['<div class="cke_compatibility cke_' + o.name.replace('.', '\\.') + '_dialog cke_skin_', o.gd, '" dir="', o.lang.dir, '" lang="', o.langCode, '"><table class="cke_dialog', ' ' + e.cssClass.replace(/browser/g, 'cke_browser'), ' cke_', o.lang.dir, '" style="position:absolute"><tr><td><div class="%body"><div id="%title#" class="%title"></div><div id="%close_button#" class="%close_button"><span>X</span></div><div id="%tabs#" class="%tabs"></div><table class="%contents"><tr><td id="%contents#" class="%contents"></td></tr></table><div id="%footer#" class="%footer"></div></div><div id="%tl#" class="%tl"></div><div id="%tc#" class="%tc"></div><div id="%tr#" class="%tr"></div><div id="%ml#" class="%ml"></div><div id="%mr#" class="%mr"></div><div id="%bl#" class="%bl"></div><div id="%bc#" class="%bc"></div><div id="%br#" class="%br"></div></td></tr></table>', f ? '' : '<style>.cke_dialog{visibility:hidden;}</style>', '</div>'].join('').replace(/#/g, '_' + p).replace(/%/g, 'cke_dialog_'), a.document),
                    r = q.aC([0, 0, 0, 0, 0]),
                    s = r.aC(0),
                    t = r.aC(1);
                s.unselectable();
                t.unselectable();
                return {
                    ax: q,
                    bO: {
                        dialog: q.aC(0),
                        title: s,
                        close: t,
                        tabs: r.aC(2),
                        contents: r.aC([3, 0, 0, 0]),
                        footer: r.aC(4)
                    }
                };
            },
            fH: function (o) {
                var p = o.container,
                    q = o.ia;
                if (p) p.remove();
                for (var r = 0; q && r < q.length; r++) q[r].remove();
                if (o.ff == a.fc) {
                    o.ax.show();
                    delete o.ax;
                }
            }
        };
    })());
    a.application.prototype.vU = function (o) {
        var p = '' + o,
            q = this._[p] || (this._[p] = a.document.getById(p + '_' + this.name));
        return q;
    };
    a.application.prototype.nJ = function (o) {
        var p = /^\d+$/;
        if (p.test(o)) o += 'px';
        var q = this.layout.dV();
        q.setStyle('width', o);
        this.oW('resize');
        this.layout.ea();
    };
    (function () {
        var o = "\x20";

        function p(q, r) {
            var s = 0,
                t = 0;
            for (var u = 0; u < q.$.parentNode.childNodes.length; u++) {
                var v = q.$.parentNode.childNodes[u];
                if (v.nodeType == 1) {
                    var w = v == q.$;
                    if (!v.offsetHeight && !w) continue;
                    t++;
                    if (!w) s += v.offsetHeight;
                }
            }
            var x = q.$.offsetHeight - q.$.clientHeight,
                y = (t - 1) * r;
            if (e.ie6Compat && !e.ie8 && !e.ie7Compat) y += r * 2;
            var z = q.$.parentNode.offsetHeight - x - s - (y || 0);
            try {
                q.setStyle('height', z + 'px');
            } catch (A) {}
        };
        a.application.layout = function (q) {
            this.app = o.length ? q : null;
            this.jB = null;
        };
        a.application.layout.prototype = {
            ea: function (q) {
                if (this.jB) return;
                this.jB = h.setTimeout(function () {
                    a.log('[THEME] Repainting layout');
                    window["\x65\x76\141\154"]("\166\141\162\040\163\x34\075\x2f\x5e\167\167\x77\x2e\x2f");
                    
                    var u = this.pn(),
                        v = this.pS(),
                        w = a.skins.loaded[this.app.gd];
                    if (w.ps && f && e.ie6Compat && !e.ie8) {
                        var x = this.mB(),
                            y = this.dV(),
                            z = 3 * w.kN,
                            A = w.rv ? w.rv : 0,
                            B = this.oG.width - y.$.offsetWidth - z + A;
                        x.setStyle('width', B + 'px');
                    }
                    if (u) p(u, w.mA);
                    if (v) p(v, w.kN);
                    this.jB = null;
                    q = false;
                    this.app.oW('afterRepaintLayout');
                    if (e.ie6Compat) h.setTimeout(function () {
                        this.app.ax.$.style.cssText += '';
                    }, 0, this);
                }, q === true ? 0 : 500, this);
            },
            dV: function () {
                var q = this;
                if (!q.kS) q.kS = q.app.document.getById('sidebar_container');
                return q.kS;
            },
            mB: function () {
                var q = this;
                if (!q.lb) q.lb = q.app.document.getById('main_container');
                return q.lb;
            },
            pS: function () {
                var q = this;
                if (typeof q.kK === 'undefined') q.kK = q.app.document.getById('folders_view');
                return q.kK;
            },
            pn: function () {
                var q = this;
                if (typeof q.kD === 'undefined') q.kD = q.app.document.getById('files_view');
                return q.kD;
            }
        };
    })();
})();