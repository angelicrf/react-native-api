const stripe = require('stripe')(
  'sk_test_51NyH49AzV5DeXcuGuTqjwouetIeS8rqLwV0Xcw7pQJl6gX6ZMNfKp1HrCsF8TsL6qdI6PPBF1ZlCsl8G7Lnln1Cl003WDqAC2D'
  //'pk_test_51NyH49AzV5DeXcuGJJfHYEcgn62149D3DGqRls4MyLoqMVU5xS8G8fQhhlDMDEWVApe0N33aNEeKeVXMD8yfMxkt00748l6UM0'
)

const postStripeData = async (req, res) => {
  const { amount, currency } = req.body
  console.log(amount, currency)
  if (amount !== undefined && currency !== undefined) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      })
      if (paymentIntent !== undefined) {
        console.log('insidepayment', paymentIntent.client_secret)
        res.status(200).json({ paymentIntent })
      }
    } catch (error) {
      res.status(400).json({ msg: `error from client secret: ${error}` })
    }
  } else {
    res.status(400).json({ msg: 'error from post stripe data' })
  }
}
module.exports = { postStripeData }
