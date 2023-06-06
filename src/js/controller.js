(async () => {
  /**
   * --------------------------------------------------------------------------------------
   * VARIABLES
   *
   */

  window.fsAttributes = window.fsAttributes || [];
  const urlParams = new URLSearchParams(window.location.search);
  let baseUrlGTilebit = 'https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO';
  let baseUrlGOutseta = 'https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy';
  let baseUrlGPaddle = 'https://xju6-kpzy-l8vj.n7.xano.io/api:9U9Y_l4P';
  let platformData = '';
  let contentType = '';
  let platformSnippetAttribute = '[bmg-arco-button]';
  let isSnippetCopy = false;
  let xtoken = null;
  let xUserId = null;
  let member = null;
  let memberJson = {};
  let paddleSubscription = null;
  const paddleFreelanceMonthlyId = 52522;
  const paddleFreelanceYearlyId = 52668;
  let accessToken = urlParams.get('access_token')
    ? urlParams.get('access_token')
    : localStorage.getItem('Outseta.nocode.accessToken');

  /**
   * --------------------------------------------------------------------------------------
   * END VARIABLES
   *
   */

  /**
   * --------------------------------------------------------------------------------------
   * MODELS
   *
   */

  function scrollToTop() {
    // Smooth scroll animation
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

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
        debugger;
        displayMessage(`Error: ${error.message}`);
      });
  }

  const setListener = () => {
    setTippyHover();

    showLockPaidElm()

    $('.actions-button-wrapper, [action-button]').click(function (event) {
      event.stopPropagation();
      return true;
    });

    $(platformSnippetAttribute).click(function (event) {
      //not logged in show modal
      if (!member) {
        $('[lock-modal-button]')[0].click();
        return;
      }
      //not paid member redirect to pricing
      if (!isPaidSubscritionActive()) {
        window.location.href = '/pricing';
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

  function isPaidSubscritionActive() {
    if (!paddleSubscription) {
      return false;
    }

    if (
      paddleSubscription.state == 'active' ||
      paddleSubscription.state == 'trialing'||
      paddleSubscription.state == 'past_due' 

    ) {
      return true;
    }
    if (
      paddleSubscription.state == 'paused' ||
      paddleSubscription.state == 'deleted'
    ) {
      return false;
    }
  }

  function openFreelanceMonthlyCheckout() {
    debugger;
    Paddle.Checkout.open({
      product: paddleFreelanceMonthlyId,
      email: member.Email,
      passthrough: `{"x_user_id": "${xUserId}"}`,
    });
  }
  function openFreelanceYearlyCheckout() {
    debugger;
    Paddle.Checkout.open({
      product: paddleFreelanceYearlyId,
      email: member.Email,
      passthrough: `{"x_user_id": "${xUserId}"}`,
    });
  }

  function openUpdatePaddle() {
    debugger;
    Paddle.Checkout.open({
      override: paddleSubscription.update_url,
      passthrough: `{"x_user_id": "${xUserId}"}`,
    });
  }

  function openCancelPaddle() {
    debugger;
    Paddle.Checkout.open({
      override: paddleSubscription.cancel_url,
      passthrough: `{"x_user_id": "${xUserId}"}`,
    });
  }

  function showLockPaidElm() {
    $('.lock').css({ display: 'block', opacity: '1' });
  }

  /**
   * --------------------------------------------------------------------------------------
   * END MODELS
   *
   */

  /**
   * --------------------------------------------------------------------------------------
   * CONTROLLERS
   *
   */

  //if accesstoken is preset the user is loggedin
  if (accessToken) {
    //fire only if user is loggedin
    Outseta.getUser()
      .then(user => {
        member = user;
        amplitude.setUserId(member.Uid);

        const memberJsonData = {};
        memberJsonData.savedComp = JSON.parse(member.SavedComponents || '[]');
        memberJsonData.savedInspo = JSON.parse(
          member.SavedInspirations || '[]'
        );
        memberJson = memberJsonData;
      })
      .catch(err => {
        debugger;
      });

    // Generate xtoken if accessToken is present
    try {
      const res = await callXApi(baseUrlGOutseta, 'outseta/auth', 'POST', {
        token: accessToken,
      });
      if (res?.authToken) {
        xtoken = res.authToken;
        xUserId = res.user_id;
      }
    } catch (error) {
      console.error('erore nel recupero xano token');
    }

    try {
      //fetch user paddle sub
      const paddleRes = await callXApi(
        baseUrlGPaddle,
        'user/subscription',
        'GET'
      );
      paddleSubscription = paddleRes;
      //debugger;

      if (!isPaidSubscritionActive()) {
        //show lock
        showLockPaidElm()
      }
    } catch (error) {
      console.error('erore nel recupero subscription');
    }
  }

  window.fsAttributes.push([
    'cmsload',
    listInstances => {
      console.log('cmsload Successfully loaded!');

      const [listInstance] = listInstances;
      
      if (!listInstance) {
        return;
      }

      if(window.fsAttributes.cmsnest){
          window.fsAttributes.cmsnest.init();
      }

      listInstance.on('renderitems', renderedItems => {
        console.log('page changed');
        scrollToTop();
        setListener();
      });
    },
  ]);

  setListener();

  $(document).on(
    'click',
    '[paddle-action-btn="freelance-monthly"]',
    openFreelanceMonthlyCheckout
  );

  $(document).on(
    'click',
    '[paddle-action-btn="freelance-yearly"]',
    openFreelanceYearlyCheckout
  );

  $(document).on('click', '[paddle-action-btn="update"]', openUpdatePaddle);

  $(document).on('click', '[paddle-action-btn="cancel"]', openCancelPaddle);

  /**
   * --------------------------------------------------------------------------------------
   * END CONTROLLERS
   *
   */
})().catch(err => {
  console.error(err);
});
