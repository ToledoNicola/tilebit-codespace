(async()=>{window.fsAttributes=window.fsAttributes||[];const t=new URLSearchParams(window.location.search);let e="https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO",o="",n="",a=!1,s=null,i=null,c=null,r={},d=null;const p=52522,l=52668;let u=t.get("access_token")?t.get("access_token"):localStorage.getItem("Outseta.nocode.accessToken");const m=()=>{setTippyHover(),v(),$(".actions-button-wrapper, [action-button]").click((function(t){return t.stopPropagation(),!0})),$("[bmg-arco-button]").click((function(t){if(!c)return void $("[lock-modal-button]")[0].click();if(!f())return void(window.location.href="/pricing");const s=$(this).attr("bmg-arco-button"),i=$(this).closest("[tb-item-id]").attr("tb-item-id");!function(t,s,i){const c=`components/${i}/platform/${s}`;let r=t.find("[tb-pl-butt-wrapper]").clone();async function d(e){setTimeout((function(){t.text(e),setTimeout((function(){t.empty(),t.append(r),t.css({"pointer-events":"auto"})}),1500)}),1500)}t.css({"pointer-events":"none"}),t.empty(),t.text("Copying..."),h(e,c,"GET").then((t=>{o=t[s],n="{"===o.charAt(0)?"application/json":"text/html",a=!0,document.execCommand("copy"),d("Copied!")})).catch((t=>{d(`Error: ${t.message}`)}))}($(this),s,i)})),new ClipboardJS("[data-clipboard-text]").on("success",(function(t){const e=t.trigger._tippy;e.setContent("Copied"),e.show()})),tippy("[data-tippy-content]",{trigger:"manual",duration:100,onShow(t){setTimeout((()=>{t.hide()}),1e3)}}),$("[comp-card-save-btn]").click((async function(t){if(!c)return void $("[lock-modal-button]")[0].click();const e=this._tippy,o=$(this).closest("[tb-item-id]").attr("tb-item-id");if("inspiration"===$(this).closest("[comp-card]").attr("comp-card")){if(r.savedInspo=r.savedInspo||[],-1===r.savedInspo.indexOf(o)){r.savedInspo.push(o);const t=r.savedInspo.length||0;return r.savedInspoNum=t,await c.update({SavedInspirations:JSON.stringify(r.savedInspo)}),e.setContent("Saved"),void e.show()}}else if(r.savedComp=r.savedComp||[],-1===r.savedComp.indexOf(o)){r.savedComp.push(o);const t=r.savedComp.length||0;return r.savedCompNum=t,await c.update({SavedComponents:JSON.stringify(r.savedComp)}),e.setContent("Saved"),void e.show()}e.setContent("Already saved"),e.show()})),$(document).on("click",".hack32-like-item .del",(function(){const t=$.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());-1!==metadata.fileNames.indexOf(t)&&(metadata.fileNames.splice(metadata.fileNames.indexOf(t),1),metadata.itemsNum=metadata.fileNames.length,$(".hack32-like-count").text(metadata.itemsNum),c.updateMetaData(metadata)),$(this).closest(".hack32-like-item").remove()}))};async function h(t,e,o,n){const a=`${t}/${e}`,i={method:o,headers:{Authorization:`Bearer ${s}`,"Content-Type":"application/json"},body:JSON.stringify(n)};try{const t=await fetch(a,i);return await t.json()}catch(t){throw new Error(`Error: ${t}`)}}function f(){return!!d&&("active"==d.state||"trialing"==d.state||"past_due"==d.state||"paused"!=d.state&&"deleted"!=d.state&&void 0)}function v(){$(".lock").css({display:"block",opacity:"1"})}if(u){Outseta.getUser().then((t=>{c=t,amplitude.setUserId(c.Uid);const e={};e.savedComp=JSON.parse(c.SavedComponents||"[]"),e.savedInspo=JSON.parse(c.SavedInspirations||"[]"),r=e})).catch((t=>{}));try{const t=await h("https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy","outseta/auth","POST",{token:u});t?.authToken&&(s=t.authToken,i=t.user_id)}catch(t){console.error("erore nel recupero xano token")}try{const t=await h("https://xju6-kpzy-l8vj.n7.xano.io/api:9U9Y_l4P","user/subscription","GET");d=t,f()||v()}catch(t){console.error("erore nel recupero subscription")}}window.fsAttributes.push(["cmsload",t=>{console.log("cmsload Successfully loaded!");const[e]=t;e&&(window.fsAttributes.cmsnest&&window.fsAttributes.cmsnest.init(),e.on("renderitems",(t=>{console.log("page changed"),window.scrollTo({top:0,behavior:"smooth"}),m()})))}]),m(),$(document).on("click",'[paddle-action-btn="freelance-monthly"]',(function(){Paddle.Checkout.open({product:p,email:c.Email,passthrough:`{"x_user_id": "${i}"}`})})),$(document).on("click",'[paddle-action-btn="freelance-yearly"]',(function(){Paddle.Checkout.open({product:l,email:c.Email,passthrough:`{"x_user_id": "${i}"}`})})),$(document).on("click",'[paddle-action-btn="update"]',(function(){Paddle.Checkout.open({override:d.update_url,passthrough:`{"x_user_id": "${i}"}`})})),$(document).on("click",'[paddle-action-btn="cancel"]',(function(){Paddle.Checkout.open({override:d.cancel_url,passthrough:`{"x_user_id": "${i}"}`})}))})().catch((t=>{console.error(t)}));