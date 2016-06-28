const moment = require('moment')
    , downloadCounts = require('./')

    , package_name    = 'levelup'
    , start  = moment().subtract(3, 'days').toDate() // start date for lookup
    , end    = new Date()                              // end date for lookup

downloadCounts({
    package_name,
    time_period: {
        start,
        end,
    },
})
.then(count => {
    console.log('%s was downloaded ~%d times in the last 3 days', package_name, count)
});

downloadCounts({
    package_name,
    time_period: 'last-month',
})
.then(count => {
    console.log('%s was downloaded ~%d times in the last month', package_name, count)
});
