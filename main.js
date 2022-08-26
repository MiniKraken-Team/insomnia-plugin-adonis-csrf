module.exports.requestHooks = [
    async (context) => {
        if(await context.store.hasItem('XSRF-TOKEN')) {
            context.request.addHeader('X-XSRF-TOKEN', await context.store.getItem('XSRF-TOKEN'))
        }
    },
];

module.exports.responseHooks = [
    async (context) => {
        console.debug()
        const cookie = context.response.getHeaders().filter(cookie => cookie.name === 'set-cookie' && cookie.value.includes('XSRF-TOKEN'))[0]
        /*for(cookie in cookies) {
            if(cookie.value.includes('XSRF-TOKEN')) {
                console.log('found')
            }
        }*/

        if (cookie) {
            console.debug(context.store.setItem('XSRF-TOKEN', cookie.value.split(';')[0].split('=')[1]))
        } else {
            context.store.removeItem('XSRF-TOKEN')
        }
    },
]
