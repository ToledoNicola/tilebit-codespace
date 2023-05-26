(async () => {
  // contiene il json o testo della risposta, l'elemento da salvare in clipboard
  let o = '';
  //contiene il tipo application/json o text/html e fa il controllo con la primo carattere se è { da capire se puo rompere il flusso
  let s = '';
  let t = '[bmg-arco-button]';
  let isSnippetCopy = false;

  const memberstack = window.$memberstackDom;
  const memberData = await memberstack.getCurrentMember();
  const member = memberData.data;
  let memberJson = {};

  if (member) {
    // Get current member's JSON
    const memberJsonData = await memberstack.getMemberJSON();
    memberJson = memberJsonData.data || { savedComp: [] };
  }

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

      const pageName = location.href.split('/').slice(-1)[0];
      // if there are file names saved in the metadata
      if (memberJson.savedComp && pageName == 'saved') {
        // for each liked item
        // get it's name
        $('[comp-card]').each((i, item) => {
          const itemId = $(this).closest('[tb-item-id]').attr('tb-item-id')

          // if the liked item's name also exists in the metadata's file names
          if (
            memberJson.savedComp.indexOf(itemId) !== -1 ||
            memberJson.savedInspo.indexOf(itemId) !== -1
          ) {
            // show the card
            $(item).closest('[comp-item]').removeClass('hide');
          }
        });

        //Webflow.require('ix2').init()
      }
    },
  ]);

  //recupera lo snippet e modifica lo stato del bottone
  function c(element, platform, id) {    
    const urlAPI = `https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO/components/${id}/platform/${platform}`;

    let logoPlatform = element.find('img').clone();
    function i(platform) {
      setTimeout(function () {
        element.text(platform),
          setTimeout(function () {
            element.empty(),
              element.append(logoPlatform),
              element.css({ 'pointer-events': 'auto' });
          }, 1500);
      }, 1500);
    }
    let c = new XMLHttpRequest();
    element.css({ 'pointer-events': 'none' }),
      element.empty(),
      element.text('Copying...'),
      c.open('GET', urlAPI, !0),
      (c.onload = function () {
        let ris = JSON.parse(this.response);
        // qui imposta o e s che stanno sopra
        c.status >= 200 && c.status < 400
          ? ((o = ris[platform]),
            (s = '{' == ris[platform].charAt(0) ? 'application/json' : 'text/html'),
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

    $('[comp-card-save-btn]').hide()



    //1 evento al click del platform button recuepro i dati necessari
    //per la chiamata, l'id viene messo da wized come attributo

    $('.actions-button-wrapper,[action-button]').click(function (event) {
      event.stopPropagation();
      return true;
    });

    $(t).click(function (event) {
      if (!member) {
        // $(event.target)
        //   .closest('[comp-card]')
        //   .find('[w-el="compLock"]')
        //   .css('display', 'flex');

          $('[lock-modal-button]')[0]
          .click();

        return;
      }

      //event.stopPropagation();
      //console.log($(this))
      const platform = $(this).attr('bmg-arco-button');
      const id = $(this).closest('[tb-item-id]').attr('tb-item-id');
debugger
      c($(this), platform, id);
    });

    new ClipboardJS('[data-clipboard-text]').on('success', function (el) {
      const tippyInstance = el.trigger._tippy;
      tippyInstance.setContent('Copied');
      tippyInstance.show();
    });

    tippy('[data-tippy-content]', {
      trigger: 'manual',
      duration: 100,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 1000);
      },
    });

    // when the like button button is clicked
    // save the file's name to metadata
    $('[comp-card-save-btn]').click(async function (event) {
      if (!member) {
        // $(event.target)
        //   .closest('[comp-card]')
        //   .find('[w-el="compLock"]')
        //   .css('display', 'flex');

          $('[lock-modal-button]')[0]
          .click();

        return;
      }
      const tippyInstance = this._tippy;

      // get the name of the liked item
      // const name = $.trim(
      //   $(this).closest('[comp-card]').find('[comp-card-title]').text()
      // );
      const itemId = $(this).closest('[tb-item-id]').attr('tb-item-id')
      // if the name does not already exist in the metadata fileNames
      const isInspo = $(this).closest('[comp-card]').attr('comp-card') == 'inspiration';

      if (isInspo) {
        memberJson.savedInspo = memberJson.savedInspo || [];
        if (memberJson.savedInspo.indexOf(itemId) === -1) {
          memberJson.savedInspo.push(itemId);

          const num = memberJson.savedInspo.length || 0;

          memberJson.savedInspoNum = num;
          await memberstack.updateMemberJSON({ json: memberJson });

          tippyInstance.setContent('Saved');
          tippyInstance.show();
          return;
        }
      } else {
        memberJson.savedComp = memberJson.savedComp || [];
        if (memberJson.savedComp.indexOf(itemId) === -1) {
          // push the name to the metadata.fileNames array
          memberJson.savedComp.push(itemId);
          // get the number of fileNames in the metadata
          // or set the number as 0 if there are no existing filenames
          const num = memberJson.savedComp.length || 0;
          // set the metadata itemsNum as the number of filenames in the metadata
          memberJson.savedCompNum = num;
          // update memberstack with the new metadata object
          await memberstack.updateMemberJSON({ json: memberJson });

          tippyInstance.setContent('Saved');
          tippyInstance.show();
          return;
        }
      }

      tippyInstance.setContent('Already saved');
      tippyInstance.show();
    });

    // when the delete button is clicked if in saved page
    $(document).on('click', '.hack32-like-item .del', function () {
      // get the name of the liked item
      const name = $.trim(
        $(this).closest('.hack32-like-item').find('.hack32-title').text()
      );
      // if the name exists in the metadata fileNames
      if (metadata.fileNames.indexOf(name) !== -1) {
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
})().catch(err => {
  console.error(err);
});
