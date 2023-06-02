


  function scrollToTop() {
    // Smooth scroll animation
    window.scrollTo({
      top: 0,
      behavior: "smooth"
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
    $('.actions-button-wrapper, [action-button]').click(function (event) {
      event.stopPropagation();
      return true;
    });

    $(targetButton).click(function (event) {
      if (!member) {
        $('[lock-modal-button]')[0].click();
        return;
      }
      if (!isPaidSubscritionActive()) {
        window.location.href = '/pricing';
        return
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
      return false
    }
 
    if (paddleSubscription.state == 'active') {
      return true
    }
    if (paddleSubscription.state == 'paused') {
      return false
    }
  }

  function openFreelanceMonthlyCheckout() {
    debugger;
    Paddle.Checkout.open({
      product: 52522,
      email: member.Email,
      passthrough: `{"x_user_id": "${xUserId}"}`,
    });
  }
  function openFreelanceYearlyCheckout() {
    debugger;
    Paddle.Checkout.open({
      product: 52668,
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


