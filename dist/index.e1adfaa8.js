(async()=>{const t="https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO/components/";let e="",o="",a=!1;const s=window.$memberstackDom,i=(await s.getCurrentMember()).data;let n={};if(i){const t=await s.getMemberJSON();n=t.data||{savedComp:[]}}window.fsAttributes=window.fsAttributes||[],window.fsAttributes.push(["cmsload",t=>{console.log("cmsload Successfully loaded!");const[e]=t;e.on("renderitems",(t=>{console.log("page changed"),c()}));const o=location.href.split("/").slice(-1)[0];n.savedComp&&"saved"==o&&$("[comp-card] [comp-card-title]").each(((t,e)=>{-1!==n.savedComp.indexOf($.trim($(e).text()))&&$(e).closest("[comp-item]").removeClass("hide")}))}]),document.addEventListener("copy",(t=>{a&&(t.clipboardData.setData(o,e),t.preventDefault(),a=!1)}));const c=()=>{$("[bmg-arco-button]").click((function(s){if(!i)return void Toastify({text:"Login first",destination:"https://www.tilebit.io/sign-in",duration:3e3,gravity:"top",position:"center",stopOnFocus:!0,style:{background:"black","border-radius":"0.5rem"}}).showToast();const n=$(this).attr("bmg-arco-button"),c=$(this).attr("comp-id");!function(s,i,n){let c=s.find("img").clone();function d(t){setTimeout((function(){s.text(t),setTimeout((function(){s.empty(),s.append(c),s.css({"pointer-events":"auto"})}),1500)}),1500)}let m=new XMLHttpRequest;s.css({"pointer-events":"none"}),s.empty(),s.text("Copying..."),m.open("GET",t+n,!0),m.onload=function(){let t=JSON.parse(this.response);m.status>=200&&m.status<400?(e=t[i],o="{"==t[i].charAt(0)?"application/json":"text/html",a=!0,document.execCommand("copy"),d("Copied!")):d(`Error: ${m.status}`)},m.send()}($(this),n,c)})),new ClipboardJS("[data-clipboard-text]"),tippy("[data-tippy-content]",{trigger:"click",duration:300,onShow(t){setTimeout((()=>{t.hide()}),3e3)}}),$("[comp-card-save-btn]").click((async function(){const t=$.trim($(this).closest("[comp-card]").find("[comp-card-title]").text());if(n.savedComp=n.savedComp||[],-1===n.savedComp.indexOf(t)){n.savedComp.push(t);const e=n.savedComp.length||0;n.savedCompNum=e,await s.updateMemberJSON({json:n})}})),$(document).on("click",".hack32-like-item .del",(function(){const t=$.trim($(this).closest(".hack32-like-item").find(".hack32-title").text());-1!==metadata.fileNames.indexOf(t)&&(metadata.fileNames.splice(metadata.fileNames.indexOf(t),1),metadata.itemsNum=metadata.fileNames.length,$(".hack32-like-count").text(metadata.itemsNum),i.updateMetaData(metadata)),$(this).closest(".hack32-like-item").remove()}))};c()})().catch((t=>{console.error(t)}));
//# sourceMappingURL=index.e1adfaa8.js.map
