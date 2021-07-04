const Router = require('@koa/router')

const router = new Router()

exports.createRouter = function ({ donateHandler }) {
    router.post('/donate', async (ctx) => {
        try {
            await donateHandler.handle({ ...ctx.request.body})
            ctx.body = { ok: true }
        } catch (error) {
            ctx.throw(400, error.message)
        }
    })

    return router
}
