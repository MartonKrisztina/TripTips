import UniqueId from '../../utils/UniqueId';
import { Payee, PosKey, RedirectUrl, barionAPI } from '../data/constants';

export default async function handlePayment({ total, reservations, id }) {
  const boughtedItems = reservations.map((item) => ({
    Name: item.name,
    Description: item.description || 'Nincs leírás',
    Quantity: item.amount,
    Unit: 'db',
    UnitPrice: item.price,
    ItemTotal: item.total,
  }));

  const requestData = {
    PosKey,
    FundingSources: ['All'],
    PaymentType: 'Immediate',
    Currency: 'HUF',
    Transactions: [
      {
        POSTransactionId: UniqueId(),
        Payee,
        Total: total,
        Items: [...boughtedItems],
      },
    ],
    RedirectUrl: `${RedirectUrl}`,
  };

  try {
    const response = await fetch(barionAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.GatewayUrl) {
      window.open(data.GatewayUrl, '_blank');
      localStorage.setItem('id', JSON.stringify(id));
    }
  } catch (error) {
    console.error('Error during payment:', error);
  }
}
