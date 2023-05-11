window.onload = async () => {
  const urlAPI = "https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO/components/";
    // contiene il json o testo della risposta, l'elemento da salvare in clipboard
    let o = "";
    //contiene il tipo application/json o text/html e fail controllo con la primo carattere se è { da capire se puo rompere il flusso
    let s = "";
let t = "[bmg-arco-button]";
let isSnippetCopy = false


//recupera lo snippet e modifica lo stato del bottone
  function c(t, e, n) {
    let logoPlatform = t.find("img").clone();
    function i(e) {
      setTimeout(function () {
        t.text(e),
          setTimeout(function () {
            t.empty(), t.append(logoPlatform), t.css({ "pointer-events": "auto" });
          }, 1500);
      }, 1500);
    }
      let c = new XMLHttpRequest();
      t.css({ "pointer-events": "none" }),
        t.empty(),
        t.text("Copying..."),
        c.open("GET", urlAPI + n, !0),
        (c.onload = function () {
          let t = JSON.parse(this.response);
          // qui imposta o e s che stanno sopra
          c.status >= 200 && c.status < 400
            ? ((o = t[e]),
              (s = "{" == t[e].charAt(0) ? "application/json" : "text/html"),
              isSnippetCopy = true,
              document.execCommand("copy"),
              i("Copied!"))
            : i(`Error: ${c.status}`);
        }),
        c.send();
   
  }
 

  document.addEventListener("copy", (t) => {
  
  if(isSnippetCopy){
    // recupra i dati salvati prima per il clipboard
    t.clipboardData.setData(s, o), 
    t.preventDefault();
    isSnippetCopy = false
    }
    
  });
  
  const setListener = ()=>{
  
  //1 evento al click del platform button recuepro i dati necessari
  //per la chiamata, l'id viene messo da wized come attributo
  $(t).click(function (event) {
  //event.stopPropagation();
       //console.log($(this))
       const platform = $(this).attr('bmg-arco-button')
       const id = $(this).attr('comp-id')

     c($(this), platform, id) 
     
    })
    
    new ClipboardJS('[data-clipboard-text]');

    
    tippy('[data-tippy-content]', {
  trigger: 'click',
  duration: 300,
    onShow(instance) {
    setTimeout(() => {
      instance.hide();
    }, 3000);
  }
});
}
  setListener()
  
  
  window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsload',
  (listInstances) => {
    console.log('cmsload Successfully loaded!');

    // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
    const [listInstance] = listInstances;

    // The `renderitems` event runs whenever the list renders items after switching pages.
    listInstance.on('renderitems', (renderedItems) => {
        console.log('page changed');

     setListener()
    });
  },
]);
 
  
}

 



