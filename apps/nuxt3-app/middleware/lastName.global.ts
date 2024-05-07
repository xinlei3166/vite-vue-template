export default defineNuxtRouteMiddleware(async (to, from) => {
  if (from) {
    to.meta.lastName = from.name
  }
})
