(async()=>{window.fsAttributes=window.fsAttributes||[];const e=new URLSearchParams(window.location.search);let t="https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO",n="https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy",o="https://xju6-kpzy-l8vj.n7.xano.io/api:9U9Y_l4P",a="",s="",i=!1,c=null,d=null,r=null,l=null,u={},p=null;const f=818898,m=833839;let h=e.get("access_token")?e.get("access_token"):localStorage.getItem("Outseta.nocode.accessToken");const b=()=>{!g()&&l||$(".lock").hide(),setTippyHover(),$(".actions-button-wrapper, [action-button]").off("click").click((function(e){return e.stopPropagation(),!0})),$("[bmg-arco-button]").off("click").click((function(e){if(!l)return void $("[lock-modal-button]")[0].click();if(!$(this).parent().siblings().find(".lock").hasClass("w-condition-invisible")&&!g())return void(window.location.href="/pricing");const n=$(this).attr("bmg-arco-button"),o=$(this).closest("[tb-item-id]").attr("tb-item-id");!function(e,n,o){const c=`components/${o}/platform/${n}`;let d=e.find("[tb-pl-butt-wrapper]").clone();async function r(t){setTimeout((function(){e.text(t),setTimeout((function(){e.empty(),e.append(d),e.css({"pointer-events":"auto"})}),1500)}),1500)}e.css({"pointer-events":"none"}),e.empty(),e.text("Copying..."),w(t,c,"GET").then((e=>{a=e[n],s="{"===a.charAt(0)?"application/json":"text/html",i=!0,document.execCommand("copy"),r("Copied!")})).catch((e=>{r(e)}))}($(this),n,o)})),new ClipboardJS("[data-clipboard-text]").on("success",(function(e){const t=e.trigger._tippy;t.setContent("Copied"),t.show()})),tippy("[data-tippy-content]",{trigger:"manual",duration:100,onShow(e){setTimeout((()=>{e.hide()}),1e3)}}),$("[comp-card-save-btn]").off("click").click((async function(e){if(!l)return void $("[lock-modal-button]")[0].click();const t=this._tippy,n=$(this).closest("[tb-item-id]").attr("tb-item-id");if("inspiration"===$(this).closest("[comp-card]").attr("comp-card")){if(u.savedInspo=u.savedInspo||[],-1===u.savedInspo.indexOf(n)){u.savedInspo.push(n);const e=u.savedInspo.length||0;return u.savedInspoNum=e,await l.update({SavedInspirations:JSON.stringify(u.savedInspo)}),t.setContent("Saved"),void t.show()}}else if(u.savedComp=u.savedComp||[],-1===u.savedComp.indexOf(n)){u.savedComp.push(n);const e=u.savedComp.length||0;return u.savedCompNum=e,await l.update({SavedComponents:JSON.stringify(u.savedComp)}),t.setContent("Saved"),void t.show()}t.setContent("Already saved"),t.show()})).click((function(e){return e.stopPropagation(),!0})),$(document).on("click",".hack32-like-item .del",(function(){const e=$.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());-1!==metadata.fileNames.indexOf(e)&&(metadata.fileNames.splice(metadata.fileNames.indexOf(e),1),metadata.itemsNum=metadata.fileNames.length,$(".hack32-like-count").text(metadata.itemsNum),l.updateMetaData(metadata)),$(this).closest(".hack32-like-item").remove()}))};async function w(e,t,n,o){const a=`${e}/${t}`,s={method:n,headers:{Authorization:`Bearer ${c}`,"Content-Type":"application/json"},body:JSON.stringify(o)};try{const e=await fetch(a,s),t=await e.json();if(!e.ok)throw t.message;return t}catch(e){throw new Error(e)}}function g(){if(!p)return!1;const e=(new Date).getTime();return"active"==p.status||"trialing"==p.status||"past_due"==p.status||"deleted"==p.status&&e<p.end_date}function k(e,t,n){let a=e.find("div:first")[0];const s=a.textContent;e.css({"pointer-events":"none"}),a.textContent="Loading...",w(o,"user/change-plan","POST",{new_plan:t,subscription_id:n}).then((e=>{if(!e.success)throw new Error(e.error.message);window.location.href="freelance-yearly"!=t?"/downgraded-plan":"/updated-plan"})).catch((t=>{!async function(t){setTimeout((function(){a.textContent=t,setTimeout((function(){a.textContent=s,e.css({"pointer-events":"auto"})}),1500)}),1500)}(t)}))}function v(e){const t=new Date;t.setTime(e);const n=t.getDate(),o=t.getMonth(),a=t.getFullYear();return`${n} ${function(e){return["January","February","March","April","May","June","July","August","September","October","November","December"][e]}(o)} ${a}`}if(h){Outseta.getUser().then((e=>{l=e,amplitude.setUserId(l.Uid);const t={};t.savedComp=JSON.parse(l.SavedComponents||"[]"),t.savedInspo=JSON.parse(l.SavedInspirations||"[]"),u=t})).catch((e=>{})),await async function(){try{const e=await w(n,"outseta/auth","POST",{token:h});e?.authToken&&(c=e.authToken,d=e.user.id,r=e.user,Outseta.setAccessToken(e.os_access_token),h=e.os_access_token,p=e.user.paddle)}catch(e){console.error("erore nel recupero xano token")}}();const e=$('[tb-el="profile-section"]'),t=$('[tb-el="pricing-component"]');e.length>0&&function(){paddleInfo=p,$('[tb-el="member-pricing"]')[0];const e=$('[tb-el="sub-trial-text"]'),t=$('[tb-el="sub-status"]')[0],n=$('[tb-el="profile-section"]')[0],o=$('[tb-el="deleted-info-block"]')[0],a=$('[tb-el="next-payment-block"]')[0],s=$('[tb-el="sub-renew-date"]')[0],i=$('[tb-el="sub-end-date"]')[0],c=$('[paddle-action-btn="update"]')[0];$(t).text(paddleInfo.status),$(s).text(v(paddleInfo.renewal_date)),paddleInfo.refunded?$(i).text("Refunded"):$(i).text(v(paddleInfo.end_date)),paddleInfo.status?(g()&&"deleted"!==paddleInfo.status&&$(o).hide(),"deleted"==paddleInfo.status&&($(a).hide(),$(c).hide()),"trialing"!==paddleInfo.status&&$(e).hide()):$(n).hide()}(),t.length>0&&function(){paddleInfo=p;const e=$('[tb-el="downgrade-monthly-btn"]')[0],t=$('[tb-el="upgrade-yearly-btn"]')[0];if("active"!=paddleInfo.status)return $('[tb-el="downgrade-modal-btn"]').hide(),void $('[tb-el="upgrade-modal-btn"]').hide();$(t).click((()=>k($(t),"freelance-yearly",paddleInfo.subscription_id))),$(e).click((()=>k($(e),"freelance-monthly",paddleInfo.subscription_id)))}()}window.fsAttributes.push(["cmsload",e=>{console.log("cmsload Successfully loaded!");const[t]=e;t&&t.on("renderitems",(e=>{console.log("page changed"),b()}))}]),b(),document.addEventListener("copy",(e=>{i&&(e.clipboardData.setData(s,a),e.preventDefault(),i=!1)})),$(document).on("click",'[paddle-action-btn="freelance-monthly"]',(function(){const e=window.Rewardful&&window.Rewardful.referral;Paddle.Checkout.open({product:f,email:l.Email,passthrough:JSON.stringify({x_user_id:d,rewardful:{referral:e}}),success:"/success"})})),$(document).on("click",'[paddle-action-btn="freelance-yearly"]',(function(){const e=window.Rewardful&&window.Rewardful.referral;Paddle.Checkout.open({product:m,email:l.Email,passthrough:JSON.stringify({x_user_id:d,rewardful:{referral:e}}),success:"/success"})})),$(document).on("click",'[paddle-action-btn="update"]',(function(){Paddle.Checkout.open({override:p.update_url,passthrough:JSON.stringify({x_user_id:d}),success:"/subscription-updated"})})),$(document).on("click",'[paddle-action-btn="cancel"]',(function(){Paddle.Checkout.open({override:p.cancel_url,passthrough:JSON.stringify({x_user_id:d}),success:"/subscription-deleted"})}))})().catch((e=>{console.error(e)}));