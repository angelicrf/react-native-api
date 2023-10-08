const stripe = require('stripe')(
  'sk_test_51NyH49AzV5DeXcuGuTqjwouetIeS8rqLwV0Xcw7pQJl6gX6ZMNfKp1HrCsF8TsL6qdI6PPBF1ZlCsl8G7Lnln1Cl003WDqAC2D'
  //'pk_test_51NyH49AzV5DeXcuGJJfHYEcgn62149D3DGqRls4MyLoqMVU5xS8G8fQhhlDMDEWVApe0N33aNEeKeVXMD8yfMxkt00748l6UM0'
)

const postStripeData = async (req, res) => {
  const { amount, currency } = req.body
  if (amount !== null && currency !== null) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    })
    if (paymentIntent !== null) {
      const clientSecret = paymentIntent.client_secret
      const paymentIntent = await stripe.paymentIntents.confirm(`${clientSecret}`, {
        payment_method: 'pm_card_visa',
      })
      if (paymentIntent !== null) {
        res.status(200).json({ paymentIntent })
      } else {
        res.status(400).json({ msg: 'error from payment confirmation' })
      }
    } else {
      req.status(400).json({ msg: 'error null payment Intent' })
    }
  } else {
    res.status(400).json({ msg: 'error body params is null' })
  }
}
module.exports = { postStripeData }
