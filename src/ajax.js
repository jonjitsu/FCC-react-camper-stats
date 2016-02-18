
const STATE = { UNSENT:0, OPENED:1, HEADERS_RECEIVED:2, LOADING:3, DONE:4 },
      STATUS = { OK:200 },

      get = function getUrl(url) {
          return new Promise((resolve, reject) => {
              let req = new XMLHttpRequest();

              req.onreadystatechange = () => {
                  if( req.readyState===STATE.DONE) {
                      if( req.status===STATUS.OK ) {
                          resolve(req.responseText);
                      } else {
                          reject(req);
                      }
                  }
              };
              req.open("GET", url, true);
              req.send();
          });
      },

      getJSON = (url) => {
          return get(url).then((data)=>{ return JSON.parse(data); });
      },

      api = { get, getJSON  };

export default api;
export { get, getJSON };
