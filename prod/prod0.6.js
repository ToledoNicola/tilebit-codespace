(async()=>{let t="https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO",e="",o="",a=!1,n=null,s=null;Outseta.getAccessToken()&&(s=await Outseta.getUser());const i=s;let c={};if(i){const t={};t.savedComp=JSON.parse(i.SavedComponents||"[]"),t.savedInspo=JSON.parse(i.SavedInspirations||"[]"),c=t}const d=new URLSearchParams(window.location.search);let r=d.get("access_token")?d.get("access_token"):localStorage.getItem("Outseta.nocode.accessToken");if(r)try{const t=await l("https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy","outseta/auth","POST",{token:r});t?.authToken&&(n=t.authToken)}catch(t){console.error("erore nel recupero xano token")}window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsload",t=>{console.log("cmsload Successfully loaded!");const[e]=t;e.on("renderitems",(t=>{console.log("page changed"),p()}));const o=location.href.split("/").slice(-1)[0];c.savedComp&&"saved"===o&&$("[comp-card]").each(((t,e)=>{const o=$(e).closest("[tb-item-id]").attr("tb-item-id");-1===c.savedComp.indexOf(o)&&-1===c.savedInspo.indexOf(o)||$(e).closest("[comp-item]").removeClass("hide")}))}]),document.addEventListener("copy",(t=>{a&&(t.clipboardData.setData(o,e),t.preventDefault(),a=!1)}));const p=()=>{$(".actions-button-wrapper, [action-button]").click((function(t){return t.stopPropagation(),!0})),$("[bmg-arco-button]").click((function(n){if(!i)return void $("[lock-modal-button]")[0].click();const s=$(this).attr("bmg-arco-button"),c=$(this).closest("[tb-item-id]").attr("tb-item-id");!function(n,s,i){const c=`components/${i}/platform/${s}`;let d=n.find("[tb-pl-butt-wrapper]").clone();async function r(t){setTimeout((function(){n.text(t),setTimeout((function(){n.empty(),n.append(d),n.css({"pointer-events":"auto"})}),1500)}),1500)}n.css({"pointer-events":"none"}),n.empty(),n.text("Copying..."),l(t,c,"GET").then((t=>{e=t[s],o="{"===e.charAt(0)?"application/json":"text/html",a=!0,document.execCommand("copy"),r("Copied!")})).catch((t=>{r(`Error: ${t.message}`)}))}($(this),s,c)})),new ClipboardJS("[data-clipboard-text]").on("success",(function(t){const e=t.trigger._tippy;e.setContent("Copied"),e.show()})),tippy("[data-tippy-content]",{trigger:"manual",duration:100,onShow(t){setTimeout((()=>{t.hide()}),1e3)}}),$("[comp-card-save-btn]").click((async function(t){if(!i)return void $("[lock-modal-button]")[0].click();const e=this._tippy,o=$(this).closest("[tb-item-id]").attr("tb-item-id");if("inspiration"===$(this).closest("[comp-card]").attr("comp-card")){if(c.savedInspo=c.savedInspo||[],-1===c.savedInspo.indexOf(o)){c.savedInspo.push(o);const t=c.savedInspo.length||0;return c.savedInspoNum=t,await i.update({SavedInspirations:JSON.stringify(c.savedInspo)}),e.setContent("Saved"),void e.show()}}else if(c.savedComp=c.savedComp||[],-1===c.savedComp.indexOf(o)){c.savedComp.push(o);const t=c.savedComp.length||0;return c.savedCompNum=t,await i.update({SavedComponents:JSON.stringify(c.savedComp)}),e.setContent("Saved"),void e.show()}e.setContent("Already saved"),e.show()})),$(document).on("click",".hack32-like-item .del",(function(){const t=$.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());-1!==metadata.fileNames.indexOf(t)&&(metadata.fileNames.splice(metadata.fileNames.indexOf(t),1),metadata.itemsNum=metadata.fileNames.length,$(".hack32-like-count").text(metadata.itemsNum),i.updateMetaData(metadata)),$(this).closest(".hack32-like-item").remove()}))};async function l(t,e,o,a){const s=`${t}/${e}`,i={method:o,headers:{Authorization:`Bearer ${n}`,"Content-Type":"application/json"},body:JSON.stringify(a)};try{const t=await fetch(s,i);return await t.json()}catch(t){throw new Error(`Error: ${t}`)}}p()})().catch((t=>{console.error(t)}));