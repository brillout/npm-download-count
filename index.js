const got = require('got');
const assert = require('assert');
const Promise = require('bluebird');
Promise.longStackTraces();


module.exports = ({package_name, time_period}) => {

    const time_period_str = (() => {
        if( time_period.constructor === String ) return time_period;
        return get_day(time_period.start) + ':' + get_day(time_period.end);
    })();

    const url = 'https://api.npmjs.org/downloads/point/' + time_period_str + '/' + package_name;

    return (
        Promise.resolve()
        .then(() =>
            got(url, {json: true})
        )
        .catch(error => {
            assert(error.response);
            assert(error.response.error);

            const err = error.response.error;

            assert( err.includes('0002') === err.includes('no stats for this package for this period') );
            if( err.includes('0002') ) {
                return {body: {downloads: 0}};
            }

            throw error;
        })
        .then(({body}) => {
            assert(body);
            assert(body.downloads >= 0);

            return body.downloads;
        })
    );

};


function get_day (s) {
  if (!(s instanceof Date)) {
    if (!Date.parse(s))
      return null
    s = new Date(s)
  }
  return s.toISOString().substr(0, 10)
}
