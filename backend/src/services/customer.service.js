const Customer = require('../models/customer.model');

exports.generateCustomerId = async () => {
  try {
    const lastCustomer = await Customer.findOne({
      order: [['createdAt', 'DESC']],
      attributes: ['customer_id']
    });
    
    if (!lastCustomer) {
      return 'CL000001'; // Primer cliente
    }
    
    const lastId = lastCustomer.customer_id;
    const nextNumber = parseInt(lastId.replace('CL', '')) + 1;
    return `CL${nextNumber.toString().padStart(6, '0')}`;
  } catch (error) {
    console.error('Error generando ID:', error);
    throw new Error('Error al generar ID de cliente');
  }
};


