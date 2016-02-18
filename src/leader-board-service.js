module.exports = (baseUrl, ajax) => {
    if(baseUrl===undefined) baseUrl = 'http://fcctop100.herokuapp.com';
    if(ajax===undefined) ajax = require('./ajax.js');

    const url = (path) => { return baseUrl + path; },
          flatten = (data) => {
              return data
                  .reduce((flat, item) => {
                      return flat.concat(item);
                  }, []);
          },

          parallel = (...promises) => {
              let data = [],
                  count = 0;
              
              return new Promise((resolve, reject) => {
                  promises.forEach((p, i)=>{
                      p.then((result)=>{
                          data[i]=result;
                          count++;
                          if(count===promises.length) {
                              resolve(data);
                          }
                      });
                  });
              });
          },

          compareUser = (u1, u2) => {
              if( u1.username < u2.username ) return -1;
              if( u1.username > u2.username ) return 1;
              if( u1.lastUpdate < u2.lastUpdate ) return -1;
              if( u1.lastUpdate > u2.lastUpdate ) return 1;
              return 0;
          },

          unique = data => {
              let counts = {};
              return data.reduce((uniques, u)=>{
                  if(counts[u.username]) return uniques;

                  counts[u.username]=true;
                  uniques.push(u);
                  return uniques;
              }, []);
          },

          castData = data => {
              return data.map(user=>{
                  user.recent = parseInt(user.recent, 10);
                  user.alltime = parseInt(user.alltime, 10);
                  return user;
              });
          }
    ;

    return {
        top30() {
            return ajax.getJSON(url('/api/fccusers/top/recent')).then(castData);
        },

        alltime() {
            return ajax.getJSON(url('/api/fccusers/top/alltime')).then(castData);
        },

        all() {
            return parallel(this.top30(), this.alltime())
                .then((data)=>{
                    data = flatten(data);
                    return unique(data.sort(compareUser));
                });
        }
    };
};
