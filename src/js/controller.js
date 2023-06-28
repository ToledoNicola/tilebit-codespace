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
  let xUser = null;
  let member = null;
  let memberJson = {};
  let paddleSubscription = null;
  // const paddleFreelanceMonthlyId = 52522; sandbox
  const paddleFreelanceMonthlyId = 818898;
  // const paddleFreelanceYearlyId = 52668; sandox
  const paddleFreelanceYearlyId = 833839;
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

  // function scrollToTop() {
  //   // Smooth scroll animation
  //   const element = document.getElementById('filters-section');
  //   const elementPosition = element.getBoundingClientRect().top;
  //   const offsetPosition =
  //     window.pageYOffset || document.documentElement.scrollTop;
  //   const scrollDistance = elementPosition + offsetPosition;

  //   // Scroll smoothly to the element
  //   window.scrollTo({
  //     top: scrollDistance,
  //     behavior: 'smooth',
  //   });
  // }

  function copyComponent(element, platform, componentId) {
    const endpoint = `components/${componentId}/platform/${platform}`;
    let platformwrapper = element.find('[tb-pl-butt-wrapper]').clone();
debugger
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
        displayMessage(error);
      });
  }

  const setListener = () => {
    if (isPaidSubscritionActive() || !member) {
      $('.lock').hide();
    }

    setTippyHover();

    // showLockPaidElm()

    $('.actions-button-wrapper, [action-button]').off('click').click(function (event) {
      event.stopPropagation();
      return true;
    });

    $(platformSnippetAttribute).off('click').click(function (event) {
      
      //not logged in show modal
      if (!member) {
        $('[lock-modal-button]')[0].click();
        return;
      }
      const isFree = $(this)
        .parent()
        .siblings()
        .find('.lock')
        .hasClass('w-condition-invisible');

      //not paid member redirect to pricing
      if (!isFree && !isPaidSubscritionActive()) {
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

    $('[comp-card-save-btn]').off('click').click(async function (event) {
      debugger
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
    }).click(function (event) {
      event.stopPropagation();
      return true;
    });;

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

      if (!response.ok) {
        throw result.message;
      }
      return result;
      // Gestisci la risposta dell'API
    } catch (error) {
      debugger;
      // Gestisci gli errori
      throw new Error(error);
    }
  }

  function isPaidSubscritionActive() {
    if (!paddleSubscription) {
      return false;
    }
    const Todaytimestamp = new Date().getTime();
    if (
      paddleSubscription.status == 'active' ||
      paddleSubscription.status == 'trialing' ||
      paddleSubscription.status == 'past_due' ||
      (paddleSubscription.status == 'deleted' &&
        Todaytimestamp < paddleSubscription.end_date)
    ) {
      return true;
    }

    return false;
  }

  function openFreelanceMonthlyCheckout() {
    const referral = window.Rewardful && window.Rewardful.referral

    Paddle.Checkout.open({
      product: paddleFreelanceMonthlyId,
      email: member.Email,
      passthrough: JSON.stringify({
        x_user_id: xUserId,
        rewardful: { referral: referral },
      }),
      success: '/success',
    });
  }
  function openFreelanceYearlyCheckout() {
    const referral = window.Rewardful && window.Rewardful.referral

    Paddle.Checkout.open({
      product: paddleFreelanceYearlyId,
      email: member.Email,
      passthrough: JSON.stringify({
        x_user_id: xUserId,
        rewardful: { referral: referral },
      }),
      success: '/success',
    });
  }

  function openUpdatePaddle() {

    Paddle.Checkout.open({
      override: paddleSubscription.update_url,
      passthrough: JSON.stringify({
        x_user_id: xUserId,
      }),
      success: '/subscription-updated',
    });
  }

  function openCancelPaddle() {
    Paddle.Checkout.open({
      override: paddleSubscription.cancel_url,
      passthrough: JSON.stringify({
        x_user_id: xUserId,
      }),
      success: '/subscription-deleted',
    });
  }

  function showLockPaidElm() {
    $('.lock').css({ display: 'block', opacity: '0' });
  }

  function setPricingButtons() {
    paddleInfo = paddleSubscription;

    //get donwgrade and upgrade buttons
    const downgradeBtn = $('[tb-el="downgrade-monthly-btn"]')[0];
    const upgradeBtn = $('[tb-el="upgrade-yearly-btn"]')[0];

    // if sub is not status active hide those buttons and retunr
    if (paddleInfo.status != 'active') {
      $('[tb-el="downgrade-modal-btn"]').hide();
      $('[tb-el="upgrade-modal-btn"]').hide();

      return;
    }

    // set click button to change the subscription
    $(upgradeBtn).click(() =>
      changePlan($(upgradeBtn), 'freelance-yearly', paddleInfo.subscription_id)
    );
    $(downgradeBtn).click(() =>
      changePlan(
        $(downgradeBtn),
        'freelance-monthly',
        paddleInfo.subscription_id
      )
    );
  }

  function changePlan(element, newPlan, subId) {
    const endpoint = `user/change-plan`;
    let divEl = element.find('div:first')[0];
    const btnText = divEl.textContent;

    async function displayMessage(message) {
      setTimeout(function () {
        divEl.textContent = message;

        // divEl.text(message);
        setTimeout(function () {
          // divEl.text(btnText);
          divEl.textContent = btnText;

          element.css({ 'pointer-events': 'auto' });
        }, 1500);
      }, 1500);
    }

    element.css({ 'pointer-events': 'none' });
    divEl.textContent = 'Loading...';

    callXApi(baseUrlGPaddle, endpoint, 'POST', {
      new_plan: newPlan,
      subscription_id: subId,
    })
      .then(responseData => {
        debugger;
        //go to success page
        if (!responseData.success) {
          throw new Error(responseData.error.message);
        }

        if (newPlan == 'freelance-yearly') {
          window.location.href = '/updated-plan';
          return;
        }

        window.location.href = '/downgraded-plan';
      })
      .catch(error => {
        displayMessage(error);
      });
  }

  function showPaddleSubscriptionData() {
    //check subscription if is null show free plan
    paddleInfo = paddleSubscription;

    //elements
    const pricingSectionElm = $('[tb-el="member-pricing"]')[0];
    //const subFreelanceYElm = $('[tb-el="sub-freelance-y-block"]')[0];
    // const subFreelanceMElm = $('[tb-el="sub-freelance-m-block"]')[0];
    const subTrialTextElm = $('[tb-el="sub-trial-text"]');
    const subStatusElm = $('[tb-el="sub-status"]')[0];
    const profileSectionElm = $('[tb-el="profile-section"]')[0];
    const deletedBlockElm = $('[tb-el="deleted-info-block"]')[0];
    const nextPaymentElm = $('[tb-el="next-payment-block"]')[0];
    const renewDateElm = $('[tb-el="sub-renew-date"]')[0];
    const endDateElm = $('[tb-el="sub-end-date"]')[0];
    const updateBtn = $('[paddle-action-btn="update"]')[0];

    //set text
    $(subStatusElm).text(paddleInfo.status);
    $(renewDateElm).text(getDateFromTimestamp(paddleInfo.renewal_date));
    if (paddleInfo.refunded) {
      $(endDateElm).text('Refunded');
    } else {
      $(endDateElm).text(getDateFromTimestamp(paddleInfo.end_date));
    }

    //if subsciprion is not set
    if (!paddleInfo.status) {
      $(profileSectionElm).hide();
      return;
    }

    //if sub is really active
    if (isPaidSubscritionActive() && paddleInfo.status !== 'deleted') {
      $(deletedBlockElm).hide();
    }
    if (paddleInfo.status == 'deleted') {
      $(nextPaymentElm).hide();
      $(updateBtn).hide();
    }
    if (paddleInfo.status !== 'trialing') {
      $(subTrialTextElm).hide();
    }
  }

  async function getTokensAndSync() {
    try {
      const res = await callXApi(baseUrlGOutseta, 'outseta/auth', 'POST', {
        token: accessToken,
      });
      if (res?.authToken) {
        xtoken = res.authToken;
        xUserId = res.user.id;
        xUser = res.user;
        Outseta.setAccessToken(res.os_access_token);
        accessToken = res.os_access_token;
        paddleSubscription = res.user.paddle;
      }
    } catch (error) {
      console.error('erore nel recupero xano token');
    }
  }

  function getDateFromTimestamp(timestamp) {
    const date = new Date();
    date.setTime(timestamp);

    const day = date.getDate();
    const month = date.getMonth(); // Months are zero-indexed, so October is 9
    const year = date.getFullYear();

    return `${day} ${getMonthName(month)} ${year}`;
  }

  // Function to get the month name
  function getMonthName(month) {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return monthNames[month];
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
    await getTokensAndSync();

    /**
     * i fetch the paddle info directly from the xuser object
     */
    // try {
    //   //fetch user paddle sub
    //   const paddleRes = await callXApi(
    //     baseUrlGPaddle,
    //     'user/subscription',
    //     'GET'
    //   );
    //   paddleSubscription = paddleRes;
    //   //debugger;

    //   // if (!isPaidSubscritionActive()) {
    //   //   //show lock
    //   //   showLockPaidElm()
    //   // }
    // } catch (error) {
    //   console.error('erore nel recupero subscription');
    // }

    //get user subscription attribute and if exist means we are in the member page
    //so show informations

    const memberpage = $('[tb-el="profile-section"]');
    const pricingComp = $('[tb-el="pricing-component"]');
    if (memberpage.length > 0) {
      showPaddleSubscriptionData();
    }
    if (pricingComp.length > 0) {
      setPricingButtons();
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

      /**
       * to manually activate the nest for all-compoennts inspirations with nest-collectin using slugs
       * beasue inspiration collection has more than 100 items
       */
      // if(window.fsAttributes.cmsnest){
      //     window.fsAttributes.cmsnest.init();
      // }

      listInstance.on('renderitems', renderedItems => {
        console.log('page changed');
        setListener();
      });
    },
  ]);

  setListener();

  document.addEventListener('copy', event => {
    if (isSnippetCopy) {
      // recupra i dati salvati prima per il clipboard
      event.clipboardData.setData(contentType, platformData);
      event.preventDefault();
      isSnippetCopy = false;
    }
  });

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
