(async()=>{window.fsAttributes=window.fsAttributes||[];const t=new URLSearchParams(window.location.search);let e="https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO",n="https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy",o="",a="",s=!1,i=null,c=null,d=null,l=null,r={},u=null;const p=52522,m=52668;let h=t.get("access_token")?t.get("access_token"):localStorage.getItem("Outseta.nocode.accessToken");const f=()=>{v()&&$(".lock").hide(),setTippyHover(),$(".actions-button-wrapper, [action-button]").click((function(t){return t.stopPropagation(),!0})),$("[bmg-arco-button]").click((function(t){if(!l)return void $("[lock-modal-button]")[0].click();if(!$(this).parent().siblings().find(".lock").hasClass("w-condition-invisible")&&!v())return void(window.location.href="/pricing");const n=$(this).attr("bmg-arco-button"),i=$(this).closest("[tb-item-id]").attr("tb-item-id");!function(t,n,i){const c=`components/${i}/platform/${n}`;let d=t.find("[tb-pl-butt-wrapper]").clone();async function l(e){setTimeout((function(){t.text(e),setTimeout((function(){t.empty(),t.append(d),t.css({"pointer-events":"auto"})}),1500)}),1500)}t.css({"pointer-events":"none"}),t.empty(),t.text("Copying..."),b(e,c,"GET").then((t=>{o=t[n],a="{"===o.charAt(0)?"application/json":"text/html",s=!0,document.execCommand("copy"),l("Copied!")})).catch((t=>{l(t)}))}($(this),n,i)})),new ClipboardJS("[data-clipboard-text]").on("success",(function(t){const e=t.trigger._tippy;e.setContent("Copied"),e.show()})),tippy("[data-tippy-content]",{trigger:"manual",duration:100,onShow(t){setTimeout((()=>{t.hide()}),1e3)}}),$("[comp-card-save-btn]").click((async function(t){if(!l)return void $("[lock-modal-button]")[0].click();const e=this._tippy,n=$(this).closest("[tb-item-id]").attr("tb-item-id");if("inspiration"===$(this).closest("[comp-card]").attr("comp-card")){if(r.savedInspo=r.savedInspo||[],-1===r.savedInspo.indexOf(n)){r.savedInspo.push(n);const t=r.savedInspo.length||0;return r.savedInspoNum=t,await l.update({SavedInspirations:JSON.stringify(r.savedInspo)}),e.setContent("Saved"),void e.show()}}else if(r.savedComp=r.savedComp||[],-1===r.savedComp.indexOf(n)){r.savedComp.push(n);const t=r.savedComp.length||0;return r.savedCompNum=t,await l.update({SavedComponents:JSON.stringify(r.savedComp)}),e.setContent("Saved"),void e.show()}e.setContent("Already saved"),e.show()})),$(document).on("click",".hack32-like-item .del",(function(){const t=$.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());-1!==metadata.fileNames.indexOf(t)&&(metadata.fileNames.splice(metadata.fileNames.indexOf(t),1),metadata.itemsNum=metadata.fileNames.length,$(".hack32-like-count").text(metadata.itemsNum),l.updateMetaData(metadata)),$(this).closest(".hack32-like-item").remove()}))};async function b(t,e,n,o){const a=`${t}/${e}`,s={method:n,headers:{Authorization:`Bearer ${i}`,"Content-Type":"application/json"},body:JSON.stringify(o)};try{const t=await fetch(a,s),e=await t.json();if(!t.ok)throw e.message;return e}catch(t){throw new Error(t)}}function v(){const t=(new Date).getTime();return"active"==u.status||"trialing"==u.status||"past_due"==u.status||"deleted"==u.status&&t<u.end_date}function k(t){const e=new Date;e.setTime(t);const n=e.getDate(),o=e.getMonth(),a=e.getFullYear();return`${n} ${function(t){return["January","February","March","April","May","June","July","August","September","October","November","December"][t]}(o)} ${a}`}if(h){Outseta.getUser().then((t=>{l=t,amplitude.setUserId(l.Uid);const e={};e.savedComp=JSON.parse(l.SavedComponents||"[]"),e.savedInspo=JSON.parse(l.SavedInspirations||"[]"),r=e})).catch((t=>{})),await async function(){try{const t=await b(n,"outseta/auth","POST",{token:h});t?.authToken&&(i=t.authToken,c=t.user.id,d=t.user,Outseta.setAccessToken(t.os_access_token),h=t.os_access_token,u=t.user.paddle)}catch(t){console.error("erore nel recupero xano token")}}();$('[tb-el="member-pricing"]').length>0&&function(){paddleInfo=u,$('[tb-el="member-pricing"]')[0];const t=$('[tb-el="sub-trial-text"]'),e=$('[tb-el="sub-status"]')[0],n=$('[tb-el="profile-section"]')[0],o=$('[tb-el="deleted-info-block"]')[0],a=$('[tb-el="next-payment-block"]')[0],s=$('[tb-el="sub-renew-date"]')[0],i=$('[tb-el="sub-end-date"]')[0],c=$('[paddle-action-btn="update"]')[0];$(e).text(paddleInfo.status),$(s).text(k(paddleInfo.renewal_date)),$(i).text(k(paddleInfo.end_date)),paddleInfo.status?(v()&&"deleted"!==paddleInfo.status&&$(o).hide(),"deleted"==paddleInfo.status&&($(a).hide(),$(c).hide()),"trialing"!==paddleInfo.status&&$(t).hide()):$(n).hide()}()}window.fsAttributes.push(["cmsload",t=>{console.log("cmsload Successfully loaded!");const[e]=t;e&&e.on("renderitems",(t=>{console.log("page changed"),f()}))}]),f(),document.addEventListener("copy",(t=>{s&&(t.clipboardData.setData(a,o),t.preventDefault(),s=!1)})),$(document).on("click",'[paddle-action-btn="freelance-monthly"]',(function(){Paddle.Checkout.open({product:p,email:l.Email,passthrough:`{"x_user_id": "${c}"}`,success:"/success"})})),$(document).on("click",'[paddle-action-btn="freelance-yearly"]',(function(){Paddle.Checkout.open({product:m,email:l.Email,passthrough:`{"x_user_id": "${c}"}`,success:"/success"})})),$(document).on("click",'[paddle-action-btn="update"]',(function(){Paddle.Checkout.open({override:u.update_url,passthrough:`{"x_user_id": "${c}"}`,success:"/subscription-updated"})})),$(document).on("click",'[paddle-action-btn="cancel"]',(function(){Paddle.Checkout.open({override:u.cancel_url,passthrough:`{"x_user_id": "${c}"}`,success:"/subscription-deleted"})}))})().catch((t=>{console.error(t)}));
//# sourceMappingURL=index.d485eb8a.js.map
