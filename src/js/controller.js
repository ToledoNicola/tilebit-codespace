(async () => {
  let baseUrlGTilebit = 'https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO';
  let baseUrlGOutseta = 'https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy';
  let platformData = '';
  let contentType = '';
  let targetButton = '[bmg-arco-button]';
  let isSnippetCopy = false;
  let xtoken = null;
  let memberData = null;

  const ostoken = Outseta.getAccessToken();
  if (ostoken) {
    memberData = await Outseta.getUser();
  }

  const member = memberData;
  let memberJson = {};

  if (member) {
    const memberJsonData = {};
    memberJsonData.savedComp = JSON.parse(member.SavedComponents || '[]');
    memberJsonData.savedInspo = JSON.parse(member.SavedInspirations || '[]');
    memberJson = memberJsonData;
  }

  const urlParams = new URLSearchParams(window.location.search);
  let accessToken = urlParams.get('access_token')
    ? urlParams.get('access_token')
    : localStorage.getItem('Outseta.nocode.accessToken');
  if (accessToken) {
    // Generate xtoken if accessToken is present
    try {
      const res = await callXApi(baseUrlGOutseta, 'outseta/auth', 'POST', {token:accessToken});
      if (res?.authToken) {
        xtoken = res.authToken;
      }
    } catch (error) {
      console.error('erore nel recupero xano token');
    }
  }

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    listInstances => {
      console.log('cmsload Successfully loaded!');

      const [listInstance] = listInstances;

      listInstance.on('renderitems', renderedItems => {
        console.log('page changed');
        setListener();
      });

      const pageName = location.href.split('/').slice(-1)[0];
      if (memberJson.savedComp && pageName === 'saved') {
        $('[comp-card]').each((i, item) => {
          const itemId = $(item).closest('[tb-item-id]').attr('tb-item-id');
          if (
            memberJson.savedComp.indexOf(itemId) !== -1 ||
            memberJson.savedInspo.indexOf(itemId) !== -1
          ) {
            $(item).closest('[comp-item]').removeClass('hide');
          }
        });
      }
    },
  ]);

  function copyComponent(element, platform, componentId) {
    const endpoint = `components/${componentId}/platform/${platform}`;
    let platformwrapper = element.find('[tb-pl-butt-wrapper]').clone();

    async function displayMessage(message) {
      setTimeout(function () {
        element.text(message);
        setTimeout(function () {
          element.empty();
          element.append(platformwrapper);
          element.css({ 'pointer-events': 'auto' });
        }, 1500);
      }, 1500);
    }

    element.css({ 'pointer-events': 'none' });
    element.empty();
    element.text('Copying...');

    callXApi(baseUrlGTilebit, endpoint, 'GET')
      .then(responseData => {
        platformData = responseData[platform];
        contentType =
          platformData.charAt(0) === '{' ? 'application/json' : 'text/html';
        isSnippetCopy = true;
        document.execCommand('copy');
        displayMessage('Copied!');
      })
      .catch(error => {
        debugger
        displayMessage(`Error: ${error.message}`);
      });
  }

  document.addEventListener('copy', event => {
    if (isSnippetCopy) {
      event.clipboardData.setData(contentType, platformData);
      event.preventDefault();
      isSnippetCopy = false;
    }
  });

  const setListener = () => {
    $('.actions-button-wrapper, [action-button]').click(function (event) {
      event.stopPropagation();
      return true;
    });

    $(targetButton).click(function (event) {
      if (!member) {
        $('[lock-modal-button]')[0].click();
        return;
      }

      const platform = $(this).attr('bmg-arco-button');
      const id = $(this).closest('[tb-item-id]').attr('tb-item-id');
      copyComponent($(this), platform, id);
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

    $('[comp-card-save-btn]').click(async function (event) {
      if (!member) {
        $('[lock-modal-button]')[0].click();
        return;
      }

      const tippyInstance = this._tippy;
      const itemId = $(this).closest('[tb-item-id]').attr('tb-item-id');
      const isInspo =
        $(this).closest('[comp-card]').attr('comp-card') === 'inspiration';

      if (isInspo) {
        memberJson.savedInspo = memberJson.savedInspo || [];
        if (memberJson.savedInspo.indexOf(itemId) === -1) {
          memberJson.savedInspo.push(itemId);
          const num = memberJson.savedInspo.length || 0;
          memberJson.savedInspoNum = num;
          await member.update({
            SavedInspirations: JSON.stringify(memberJson.savedInspo),
          });

          tippyInstance.setContent('Saved');
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
            SavedComponents: JSON.stringify(memberJson.savedComp),
          });

          tippyInstance.setContent('Saved');
          tippyInstance.show();
          return;
        }
      }

      tippyInstance.setContent('Already saved');
      tippyInstance.show();
    });

    // todo da cambiare
    $(document).on('click', '.hack32-like-item .del', function () {
      const name = $.trim(
        $(this).closest('.hack32-like-item').find('.hack32-title').text()
      );
      if (metadata.fileNames.indexOf(name) !== -1) {
        metadata.fileNames.splice(metadata.fileNames.indexOf(name), 1);
        metadata.itemsNum = metadata.fileNames.length;
        $('.hack32-like-count').text(metadata.itemsNum);
        member.updateMetaData(metadata);
      }

      $(this).closest('.hack32-like-item').remove();
    });
  };

  // Funzione per effettuare la chiamata all'API
  async function callXApi(baseUrlGroup, endpoint, method, data) {
    const url = `${baseUrlGroup}/${endpoint}`;

    // Imposta l'intestazione Authorization con il token di autenticazione
    const headers = {
      Authorization: `Bearer ${xtoken}`,
      'Content-Type': 'application/json',
    };

    // Configurazione della richiesta
    const options = {
      method,
      headers,
      body: JSON.stringify(data),
    };

    try {
      // Effettua la chiamata all'API utilizzando fetch() e attendi la risposta
      const response = await fetch(url, options);
      const result = await response.json();

      return result;
      // Gestisci la risposta dell'API
    } catch (error) {
      // Gestisci gli errori
      throw new Error(`Error: ${error}`);
    }
  }

  setListener();
})().catch(err => {
  console.error(err);
});
