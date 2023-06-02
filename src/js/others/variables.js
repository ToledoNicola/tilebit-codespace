  window.fsAttributes = window.fsAttributes || [];
  const urlParams = new URLSearchParams(window.location.search);
  let baseUrlGTilebit = 'https://xju6-kpzy-l8vj.n7.xano.io/api:4lTavcfO';
  let baseUrlGOutseta = 'https://xju6-kpzy-l8vj.n7.xano.io/api:8p4wLdYy';
  let baseUrlGPaddle = 'https://xju6-kpzy-l8vj.n7.xano.io/api:9U9Y_l4P';
  let platformData = '';
  let contentType = '';
  let targetButton = '[bmg-arco-button]';
  let isSnippetCopy = false;
  let xtoken = null;
  let xUserId = null;
  let member = null;
  let memberJson = {};
  let paddleSubscription = null;
  let accessToken = urlParams.get('access_token')
    ? urlParams.get('access_token')
    : localStorage.getItem('Outseta.nocode.accessToken');
