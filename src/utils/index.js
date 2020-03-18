
//export const NODE_APPLICATION_URL = 'http://localhost:5000';
export const NODE_APPLICATION_URL = 'https://teleplan.herokuapp.com';

export function nl2br(str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br/>' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export function rxAjax(action) {
  const errors = [];
  const settings = {};
  let { method } = action;

  if (!method) {
    method = 'GET';
  }

  if (!action.endpoint) {
    errors.push('endpoint');
  }

  if (!action.payload && method !== 'GET' && method !== 'DELETE') {
    errors.push('payload');
  }

  if (errors.length) {
    throw new Error(`Error! You must pass \`${errors.join('`, `')}\``);
  }

  settings.url = action.endpoint;
  settings.method = method;
  settings.crossDomain = true;
  settings.headers = {
    'Content-Type': 'application/json'
  };
  if (action.responseType) settings.responseType = action.responseType;

  if (method !== 'GET') {
    settings.body = action.payload;
  }

  return fetch(settings.url, {
    method: settings.method,
    crossDomain: true,
    headers: settings.headers,
    body: JSON.stringify(settings.body)
  }).then((res) => {
    return res.json();
  }).then(data => {
    return data;
  }).catch(err => {
    return err;
  })
}
