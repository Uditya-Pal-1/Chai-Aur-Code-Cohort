const LEGAL_CONTENT = {
  privacy: {
    title: 'Privacy Notice',
    body: 'When enabled, consultation, newsletter, and unpaid order requests are sent to the shop server and stored in its MongoDB database so the shop can respond. Checkout does not collect or process payment details. This notice is a draft: the business must publish verified information about its data controller, purpose, retention period, contact method, and customer rights before enabling submissions.',
  },
  terms: {
    title: 'Terms & Conditions',
    body: 'Product names, descriptions, and prices shown here have not yet been checked against the business records. Order requests remain disabled until the business verifies the catalog and publishes payment, delivery, cancellation, made-to-order, and consumer-protection terms.',
  },
  delivery: {
    title: 'Delivery & Returns',
    body: 'The collection is presented as made to order with white-glove delivery. Delivery areas, lead times, charges, installation, and return or cancellation terms should be confirmed with the showroom for each order; made-to-order goods may have different return rules depending on local law.',
  },
  refunds: {
    title: 'Refund Policy',
    body: 'Refund eligibility depends on the item, its production and delivery status, and applicable consumer law. For an approved refund, the showroom will confirm the amount, payment method, and expected processing time. Contact the showroom with your order details before returning an item; do not send it back without return instructions. The live business should publish its verified refund terms before accepting orders.',
  },
  cancellations: {
    title: 'Cancellation Policy',
    body: 'Contact the showroom as soon as possible if you need to cancel or change an order. Because pieces may be made to order, cancellation availability can depend on whether production or delivery has begun and on applicable consumer law. The showroom will confirm any applicable charges or refund in writing. The live business should publish its confirmed cancellation terms before accepting orders.',
  },
  care: {
    title: 'Care & Warranty',
    body: 'Follow the care instructions supplied with each piece and contact the showroom for material-specific guidance. The site mentions a 10-year guarantee; ask the showroom for the written warranty, including what it covers and any exclusions.',
  },
}

export default LEGAL_CONTENT
