window.onload = async () => {
  const urlAPI = 'https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO/components/';
  // contiene il json o testo della risposta, l'elemento da salvare in clipboard
  let o = '';
  //contiene il tipo application/json o text/html e fail controllo con la primo carattere se è { da capire se puo rompere il flusso
  let s = '';
  let t = '[bmg-arco-button]';
  let isSnippetCopy = false;
  const memberstack = window.$memberstackDom
  // Get current member's JSON
let memberJsonData = await memberstack.getMemberJSON();
memberJson = memberJsonData.data || {savedComp:[]};

window.fsAttributes = window.fsAttributes || [];

window.fsAttributes.push([
    'cmsload',
    listInstances => {
      console.log('cmsload Successfully loaded!');

      // The callback passes a `listInstances` array with all the `CMSList` instances on the page.
      const [listInstance] = listInstances;

      // The `renderitems` event runs whenever the list renders items after switching pages.
      listInstance.on('renderitems', renderedItems => {
        console.log('page changed');

        setListener();


      });
         
    const pageName = location.href.split("/").slice(-1)[0]
    // if there are file names saved in the metadata
    if(memberJson.savedComp &&  pageName == 'saved'){
      // for each liked item
      // get it's name
      $('[comp-card] [comp-card-title]').each((i,item)=>{
        // if the liked item's name also exists in the metadata's file names
        if(memberJson.savedComp.indexOf($.trim($(item).text())) !== -1){
          // clone & append the liked item to the .user-files div
          // (the reason for .clone() is to avoid removing it from its original .hack32-like-row)
          $(item).closest('[comp-item]')
          .removeClass('hide');
          
        }		
      });

      //Webflow.require('ix2').init()
    }  
    },
  ]);

  //recupera lo snippet e modifica lo stato del bottone
  function c(t, e, n) {
    let logoPlatform = t.find('img').clone();
    function i(e) {
      setTimeout(function () {
        t.text(e),
          setTimeout(function () {
            t.empty(),
              t.append(logoPlatform),
              t.css({ 'pointer-events': 'auto' });
          }, 1500);
      }, 1500);
    }
    let c = new XMLHttpRequest();
    t.css({ 'pointer-events': 'none' }),
      t.empty(),
      t.text('Copying...'),
      c.open('GET', urlAPI + n, !0),
      (c.onload = function () {
        let t = JSON.parse(this.response);
        // qui imposta o e s che stanno sopra
        c.status >= 200 && c.status < 400
          ? ((o = t[e]),
            (s = '{' == t[e].charAt(0) ? 'application/json' : 'text/html'),
            (isSnippetCopy = true),
            document.execCommand('copy'),
            i('Copied!'))
          : i(`Error: ${c.status}`);
      }),
      c.send();
  }

  document.addEventListener('copy', t => {
    if (isSnippetCopy) {
      // recupra i dati salvati prima per il clipboard
      t.clipboardData.setData(s, o), t.preventDefault();
      isSnippetCopy = false;
    }
  });

  const setListener = () => {
    //1 evento al click del platform button recuepro i dati necessari
    //per la chiamata, l'id viene messo da wized come attributo
    $(t).click(function (event) {
      //event.stopPropagation();
      //console.log($(this))
      const platform = $(this).attr('bmg-arco-button');
      const id = $(this).attr('comp-id');

      c($(this), platform, id);
    });

    new ClipboardJS('[data-clipboard-text]');

    tippy('[data-tippy-content]', {
      trigger: 'click',
      duration: 300,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 3000);
      },
    });

      // when the like button button is clicked
    // save the file's name to metadata
    $('[comp-card-save-btn]').click(async function(){	  
      // get the name of the liked item
      const name = $.trim($(this).closest('[comp-card]').find('[comp-card-title]').text());
      // if the name does not already exist in the metadata fileNames
      memberJson.savedComp = memberJson.savedComp || [];
      if(memberJson.savedComp.indexOf(name) === -1){   
        // push the name to the metadata.fileNames array
        memberJson.savedComp.push(name);
        // get the number of fileNames in the metadata
        // or set the number as 0 if there are no existing filenames
        const num = memberJson.savedComp.length || 0;
        // set the metadata itemsNum as the number of filenames in the metadata
        memberJson.savedCompNum = num;
        // update memberstack with the new metadata object
      await memberstack.updateMemberJSON({json: memberJson});
      }		
    });


        // when the delete button is clicked if in saved page
    $(document).on('click', '.hack32-like-item .del', function(){
      // get the name of the liked item
      const name = $.trim($(this).closest('.hack32-like-item').find('.hack32-title').text());
      // if the name exists in the metadata fileNames
      if(metadata.fileNames.indexOf(name) !== -1){  
        // remove the name from metadata fileNames
        metadata.fileNames.splice(metadata.fileNames.indexOf(name), 1);
        // update the number of items
        metadata.itemsNum = metadata.fileNames.length;
        // display the updated number of items
        $('.hack32-like-count').text(metadata.itemsNum);
        // update memberstack with the new metadata object
        member.updateMetaData(metadata);
      }
      
      // remove item from the saved items div
      $(this).closest('.hack32-like-item').remove();
    });
  };


  setListener();


    

   
  
  


  
};
