// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"d8XZh":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "d113fd8ce37f48ea";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets, assetsToDispose, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets); // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                } // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle, id) {
    // Execute the module.
    bundle(id); // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            }); // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"aenu9":[function(require,module,exports) {
(async ()=>{
    /**
   * --------------------------------------------------------------------------------------
   * VARIABLES
   *
   */ window.fsAttributes = window.fsAttributes || [];
    const urlParams = new URLSearchParams(window.location.search);
    let baseUrlGTilebit = "https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO";
    let baseUrlGOutseta = "https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy";
    let baseUrlGPaddle = "https://xju6-kpzy-l8vj.n7.xano.io/api:9U9Y_l4P";
    let platformData = "";
    let contentType = "";
    let platformSnippetAttribute = "[bmg-arco-button]";
    let isSnippetCopy = false;
    let xtoken = null;
    let xUserId = null;
    let xUser = null;
    let member = null;
    let memberJson = {};
    let paddleSubscription = null;
    // const paddleFreelanceMonthlyId = 52522; sandbox
    const paddleFreelanceMonthlyId = 818898;
    // const paddleFreelanceYearlyId = 52668; sandox
    const paddleFreelanceYearlyId = 833839;
    let accessToken = urlParams.get("access_token") ? urlParams.get("access_token") : localStorage.getItem("Outseta.nocode.accessToken");
    /**
   * --------------------------------------------------------------------------------------
   * END VARIABLES
   *
   */ /**
   * --------------------------------------------------------------------------------------
   * MODELS
   *
   */ // function scrollToTop() {
    //   // Smooth scroll animation
    //   const element = document.getElementById('filters-section');
    //   const elementPosition = element.getBoundingClientRect().top;
    //   const offsetPosition =
    //     window.pageYOffset || document.documentElement.scrollTop;
    //   const scrollDistance = elementPosition + offsetPosition;
    //   // Scroll smoothly to the element
    //   window.scrollTo({
    //     top: scrollDistance,
    //     behavior: 'smooth',
    //   });
    // }
    function copyComponent(element, platform, componentId) {
        const endpoint = `components/${componentId}/platform/${platform}`;
        let platformwrapper = element.find("[tb-pl-butt-wrapper]").clone();
        debugger;
        async function displayMessage(message) {
            setTimeout(function() {
                element.text(message);
                setTimeout(function() {
                    element.empty();
                    element.append(platformwrapper);
                    element.css({
                        "pointer-events": "auto"
                    });
                }, 1500);
            }, 1500);
        }
        element.css({
            "pointer-events": "none"
        });
        element.empty();
        element.text("Copying...");
        callXApi(baseUrlGTilebit, endpoint, "GET").then((responseData)=>{
            platformData = responseData[platform];
            contentType = platformData.charAt(0) === "{" ? "application/json" : "text/html";
            isSnippetCopy = true;
            document.execCommand("copy");
            displayMessage("Copied!");
        }).catch((error)=>{
            displayMessage(error);
        });
    }
    const setListener = ()=>{
        if (isPaidSubscritionActive() || !member) $(".lock").hide();
        setTippyHover();
        // showLockPaidElm()
        $(".actions-button-wrapper, [action-button]").off("click").click(function(event) {
            event.stopPropagation();
            return true;
        });
        $(platformSnippetAttribute).off("click").click(function(event) {
            //not logged in show modal
            if (!member) {
                $("[lock-modal-button]")[0].click();
                return;
            }
            const isFree = $(this).parent().siblings().find(".lock").hasClass("w-condition-invisible");
            //not paid member redirect to pricing
            if (!isFree && !isPaidSubscritionActive()) {
                window.location.href = "/pricing";
                return;
            }
            const platform = $(this).attr("bmg-arco-button");
            const id = $(this).closest("[tb-item-id]").attr("tb-item-id");
            copyComponent($(this), platform, id);
        });
        new ClipboardJS("[data-clipboard-text]").on("success", function(el) {
            const tippyInstance = el.trigger._tippy;
            tippyInstance.setContent("Copied");
            tippyInstance.show();
        });
        tippy("[data-tippy-content]", {
            trigger: "manual",
            duration: 100,
            onShow (instance) {
                setTimeout(()=>{
                    instance.hide();
                }, 1000);
            }
        });
        $("[comp-card-save-btn]").off("click").click(async function(event) {
            debugger;
            if (!member) {
                $("[lock-modal-button]")[0].click();
                return;
            }
            const tippyInstance = this._tippy;
            const itemId = $(this).closest("[tb-item-id]").attr("tb-item-id");
            const isInspo = $(this).closest("[comp-card]").attr("comp-card") === "inspiration";
            if (isInspo) {
                memberJson.savedInspo = memberJson.savedInspo || [];
                if (memberJson.savedInspo.indexOf(itemId) === -1) {
                    memberJson.savedInspo.push(itemId);
                    const num = memberJson.savedInspo.length || 0;
                    memberJson.savedInspoNum = num;
                    await member.update({
                        SavedInspirations: JSON.stringify(memberJson.savedInspo)
                    });
                    tippyInstance.setContent("Saved");
                    tippyInstance.show();
                    return;
                }
            } else {
                memberJson.savedComp = memberJson.savedComp || [];
                if (memberJson.savedComp.indexOf(itemId) === -1) {
                    memberJson.savedComp.push(itemId);
                    const num = memberJson.savedComp.length || 0;
                    memberJson.savedCompNum = num;
                    await member.update({
                        SavedComponents: JSON.stringify(memberJson.savedComp)
                    });
                    tippyInstance.setContent("Saved");
                    tippyInstance.show();
                    return;
                }
            }
            tippyInstance.setContent("Already saved");
            tippyInstance.show();
        });
        // todo da cambiare
        $(document).on("click", ".hack32-like-item .del", function() {
            const name = $.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());
            if (metadata.fileNames.indexOf(name) !== -1) {
                metadata.fileNames.splice(metadata.fileNames.indexOf(name), 1);
                metadata.itemsNum = metadata.fileNames.length;
                $(".hack32-like-count").text(metadata.itemsNum);
                member.updateMetaData(metadata);
            }
            $(this).closest(".hack32-like-item").remove();
        });
    };
    // Funzione per effettuare la chiamata all'API
    async function callXApi(baseUrlGroup, endpoint, method, data) {
        const url = `${baseUrlGroup}/${endpoint}`;
        // Imposta l'intestazione Authorization con il token di autenticazione
        const headers = {
            Authorization: `Bearer ${xtoken}`,
            "Content-Type": "application/json"
        };
        // Configurazione della richiesta
        const options = {
            method,
            headers,
            body: JSON.stringify(data)
        };
        try {
            // Effettua la chiamata all'API utilizzando fetch() e attendi la risposta
            const response = await fetch(url, options);
            const result = await response.json();
            if (!response.ok) throw result.message;
            return result;
        // Gestisci la risposta dell'API
        } catch (error) {
            debugger;
            // Gestisci gli errori
            throw new Error(error);
        }
    }
    function isPaidSubscritionActive() {
        if (!paddleSubscription) return false;
        const Todaytimestamp = new Date().getTime();
        if (paddleSubscription.status == "active" || paddleSubscription.status == "trialing" || paddleSubscription.status == "past_due" || paddleSubscription.status == "deleted" && Todaytimestamp < paddleSubscription.end_date) return true;
        return false;
    }
    function openFreelanceMonthlyCheckout() {
        const referral = window.Rewardful && window.Rewardful.referral;
        Paddle.Checkout.open({
            product: paddleFreelanceMonthlyId,
            email: member.Email,
            passthrough: JSON.stringify({
                x_user_id: xUserId,
                rewardful: {
                    referral: referral
                }
            }),
            success: "/success"
        });
    }
    function openFreelanceYearlyCheckout() {
        const referral = window.Rewardful && window.Rewardful.referral;
        Paddle.Checkout.open({
            product: paddleFreelanceYearlyId,
            email: member.Email,
            passthrough: JSON.stringify({
                x_user_id: xUserId,
                rewardful: {
                    referral: referral
                }
            }),
            success: "/success"
        });
    }
    function openUpdatePaddle() {
        Paddle.Checkout.open({
            override: paddleSubscription.update_url,
            passthrough: JSON.stringify({
                x_user_id: xUserId
            }),
            success: "/subscription-updated"
        });
    }
    function openCancelPaddle() {
        Paddle.Checkout.open({
            override: paddleSubscription.cancel_url,
            passthrough: JSON.stringify({
                x_user_id: xUserId
            }),
            success: "/subscription-deleted"
        });
    }
    function showLockPaidElm() {
        $(".lock").css({
            display: "block",
            opacity: "0"
        });
    }
    function setPricingButtons() {
        paddleInfo = paddleSubscription;
        //get donwgrade and upgrade buttons
        const downgradeBtn = $('[tb-el="downgrade-monthly-btn"]')[0];
        const upgradeBtn = $('[tb-el="upgrade-yearly-btn"]')[0];
        // if sub is not status active hide those buttons and retunr
        if (paddleInfo.status != "active") {
            $('[tb-el="downgrade-modal-btn"]').hide();
            $('[tb-el="upgrade-modal-btn"]').hide();
            return;
        }
        // set click button to change the subscription
        $(upgradeBtn).click(()=>changePlan($(upgradeBtn), "freelance-yearly", paddleInfo.subscription_id));
        $(downgradeBtn).click(()=>changePlan($(downgradeBtn), "freelance-monthly", paddleInfo.subscription_id));
    }
    function changePlan(element, newPlan, subId) {
        const endpoint = `user/change-plan`;
        let divEl = element.find("div:first")[0];
        const btnText = divEl.textContent;
        async function displayMessage(message) {
            setTimeout(function() {
                divEl.textContent = message;
                // divEl.text(message);
                setTimeout(function() {
                    // divEl.text(btnText);
                    divEl.textContent = btnText;
                    element.css({
                        "pointer-events": "auto"
                    });
                }, 1500);
            }, 1500);
        }
        element.css({
            "pointer-events": "none"
        });
        divEl.textContent = "Loading...";
        callXApi(baseUrlGPaddle, endpoint, "POST", {
            new_plan: newPlan,
            subscription_id: subId
        }).then((responseData)=>{
            debugger;
            //go to success page
            if (!responseData.success) throw new Error(responseData.error.message);
            if (newPlan == "freelance-yearly") {
                window.location.href = "/updated-plan";
                return;
            }
            window.location.href = "/downgraded-plan";
        }).catch((error)=>{
            displayMessage(error);
        });
    }
    function showPaddleSubscriptionData() {
        //check subscription if is null show free plan
        paddleInfo = paddleSubscription;
        //elements
        const pricingSectionElm = $('[tb-el="member-pricing"]')[0];
        //const subFreelanceYElm = $('[tb-el="sub-freelance-y-block"]')[0];
        // const subFreelanceMElm = $('[tb-el="sub-freelance-m-block"]')[0];
        const subTrialTextElm = $('[tb-el="sub-trial-text"]');
        const subStatusElm = $('[tb-el="sub-status"]')[0];
        const profileSectionElm = $('[tb-el="profile-section"]')[0];
        const deletedBlockElm = $('[tb-el="deleted-info-block"]')[0];
        const nextPaymentElm = $('[tb-el="next-payment-block"]')[0];
        const renewDateElm = $('[tb-el="sub-renew-date"]')[0];
        const endDateElm = $('[tb-el="sub-end-date"]')[0];
        const updateBtn = $('[paddle-action-btn="update"]')[0];
        //set text
        $(subStatusElm).text(paddleInfo.status);
        $(renewDateElm).text(getDateFromTimestamp(paddleInfo.renewal_date));
        if (paddleInfo.refunded) $(endDateElm).text("Refunded");
        else $(endDateElm).text(getDateFromTimestamp(paddleInfo.end_date));
        //if subsciprion is not set
        if (!paddleInfo.status) {
            $(profileSectionElm).hide();
            return;
        }
        //if sub is really active
        if (isPaidSubscritionActive() && paddleInfo.status !== "deleted") $(deletedBlockElm).hide();
        if (paddleInfo.status == "deleted") {
            $(nextPaymentElm).hide();
            $(updateBtn).hide();
        }
        if (paddleInfo.status !== "trialing") $(subTrialTextElm).hide();
    }
    async function getTokensAndSync() {
        try {
            const res = await callXApi(baseUrlGOutseta, "outseta/auth", "POST", {
                token: accessToken
            });
            if (res?.authToken) {
                xtoken = res.authToken;
                xUserId = res.user.id;
                xUser = res.user;
                Outseta.setAccessToken(res.os_access_token);
                accessToken = res.os_access_token;
                paddleSubscription = res.user.paddle;
            }
        } catch (error) {
            console.error("erore nel recupero xano token");
        }
    }
    function getDateFromTimestamp(timestamp) {
        const date = new Date();
        date.setTime(timestamp);
        const day = date.getDate();
        const month = date.getMonth(); // Months are zero-indexed, so October is 9
        const year = date.getFullYear();
        return `${day} ${getMonthName(month)} ${year}`;
    }
    // Function to get the month name
    function getMonthName(month) {
        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        return monthNames[month];
    }
    /**
   * --------------------------------------------------------------------------------------
   * END MODELS
   *
   */ /**
   * --------------------------------------------------------------------------------------
   * CONTROLLERS
   *
   */ //if accesstoken is preset the user is loggedin
    if (accessToken) {
        //fire only if user is loggedin
        Outseta.getUser().then((user)=>{
            member = user;
            amplitude.setUserId(member.Uid);
            const memberJsonData = {};
            memberJsonData.savedComp = JSON.parse(member.SavedComponents || "[]");
            memberJsonData.savedInspo = JSON.parse(member.SavedInspirations || "[]");
            memberJson = memberJsonData;
        }).catch((err)=>{
            debugger;
        });
        // Generate xtoken if accessToken is present
        await getTokensAndSync();
        /**
     * i fetch the paddle info directly from the xuser object
     */ // try {
        //   //fetch user paddle sub
        //   const paddleRes = await callXApi(
        //     baseUrlGPaddle,
        //     'user/subscription',
        //     'GET'
        //   );
        //   paddleSubscription = paddleRes;
        //   //debugger;
        //   // if (!isPaidSubscritionActive()) {
        //   //   //show lock
        //   //   showLockPaidElm()
        //   // }
        // } catch (error) {
        //   console.error('erore nel recupero subscription');
        // }
        //get user subscription attribute and if exist means we are in the member page
        //so show informations
        const memberpage = $('[tb-el="profile-section"]');
        const pricingComp = $('[tb-el="pricing-component"]');
        if (memberpage.length > 0) showPaddleSubscriptionData();
        if (pricingComp.length > 0) setPricingButtons();
    }
    window.fsAttributes.push([
        "cmsload",
        (listInstances)=>{
            console.log("cmsload Successfully loaded!");
            const [listInstance] = listInstances;
            if (!listInstance) return;
            /**
       * to manually activate the nest for all-compoennts inspirations with nest-collectin using slugs
       * beasue inspiration collection has more than 100 items
       */ // if(window.fsAttributes.cmsnest){
            //     window.fsAttributes.cmsnest.init();
            // }
            listInstance.on("renderitems", (renderedItems)=>{
                console.log("page changed");
                setListener();
            });
        }
    ]);
    setListener();
    document.addEventListener("copy", (event)=>{
        if (isSnippetCopy) {
            // recupra i dati salvati prima per il clipboard
            event.clipboardData.setData(contentType, platformData);
            event.preventDefault();
            isSnippetCopy = false;
        }
    });
    $(document).on("click", '[paddle-action-btn="freelance-monthly"]', openFreelanceMonthlyCheckout);
    $(document).on("click", '[paddle-action-btn="freelance-yearly"]', openFreelanceYearlyCheckout);
    $(document).on("click", '[paddle-action-btn="update"]', openUpdatePaddle);
    $(document).on("click", '[paddle-action-btn="cancel"]', openCancelPaddle);
/**
   * --------------------------------------------------------------------------------------
   * END CONTROLLERS
   *
   */ })().catch((err)=>{
    console.error(err);
});

},{}]},["d8XZh","aenu9"], "aenu9", "parcelRequireb588")

//# sourceMappingURL=index.e37f48ea.js.map
