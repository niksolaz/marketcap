
import { defineEventHandler, sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  debugger
  const country = event.node.req.headers['x-country-code'] || ''

  if (country !== 'IT') {
    return // sendRedirect(event, '/not-allowed', 302)
  }
})
