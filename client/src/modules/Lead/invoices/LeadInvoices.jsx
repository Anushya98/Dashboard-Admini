import React, { useState } from 'react';

function LeadInvoices() {
  const [products, setProducts] = useState([{ id: 'id_101', name: 'Product 1', quantity: 1, unitPrice: 2000, discount: 300 }]);
  const [billProducts, setBillProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isTDSApplicable, setIsTDSApplicable] = useState(false);
  const [isTCSApplicable, setIsTCSApplicable] = useState(true);
  const [customerName, setCustomerName] = useState('');

  const handleAddProduct = (product) => {
    setBillProducts([...billProducts, product]);
  };

  const handleProductChange = (index, key, value) => {
    const newProducts = [...products];
    newProducts[index][key] = value;
    setProducts(newProducts);
  };

  const handleRemoveProduct = (index) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const subTotal = products.reduce((acc, product) => acc + (product.unitPrice * product.quantity) - product.discount, 0);
  const discountAmount = (subTotal * discount) / 100;
  const tdsAmount = isTDSApplicable ? 300 : 0;
  const tcsAmount = isTCSApplicable ? 300 : 0;
  const totalAmount = subTotal - discountAmount - tdsAmount - tcsAmount;

  return (
    <div className="App p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="bg-blue-400 text-white p-2 rounded-md text-sm mb-4">Customer Details</h2>
        <div className="grid grid-cols-5 gap-4 mb-4">
  <div className="flex flex-col">
    <label className="mb-1 text-xs">Customer Name</label>
    <input
      type="text"
      placeholder="Customer Name"
      value={customerName}
      onChange={e => setCustomerName(e.target.value)}
      className="p-1 border rounded text-xs"
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 text-xs">Invoice</label>
    <input
      type="text"
      placeholder="Invoice"
      className="p-1 border rounded text-xs"
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 text-xs">Order Number</label>
    <input
      type="text"
      placeholder="Order Number"
      className="p-1 border rounded text-xs"
    />
  </div>
  <div className="flex flex-col"> 
    <label className="mb-1 text-xs">Invoice Date</label>
    <input
      type="date"
      placeholder="Invoice Date"
      className="p-1 border rounded text-xs"
    />
  </div>
  <div className="flex flex-col">
    <label className="mb-1 text-xs">Due Date</label>
    <input
      type="date"
      placeholder="Due Date"
      className="p-1 border rounded text-xs"
    />
  </div>
</div>

        <h2 className="bg-blue-400 text-white p-2 rounded-md text-sm mb-4">Product Details</h2>
        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={product.name}
              readOnly
              className="p-1 border rounded text-xs w-1/4"
            />
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
              className="p-1 border rounded w-16 text-xs"
            />
            <button onClick={() => handleAddProduct(product)} className="bg-blue-500 text-white p-1 rounded text-xs">+ Add to Bill</button>
          </div>
        ))}
        <table className="w-full mb-4 text-xs">
          <thead>
            <tr className="bg-blue-300 text-white">
              <th className="p-2">Name</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit Price</th>
              <th className="p-2">Discount</th>
              <th className="p-2">Net Amount</th>
            </tr>
          </thead>
          <tbody>
            {billProducts.map((product, index) => (
              <tr key={index} className="text-center">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.unitPrice}</td>
                <td className="p-2">{product.discount}</td>
                <td className="p-2">{product.unitPrice * product.quantity - product.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
       
        <div className="flex mb-4">
          <div className="flex-1 pr-4">
            <div className="mb-4">

            <div className="mb-4">
          <label className="block font-bold mb-2 text-xs">Apply Discount (%) to all items</label>
          <select
            className="w-full p-2 border border-gray-300 rounded text-xs"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
          >
            <option value={0}>0%</option>
            <option value={5}>5%</option>
            <option value={10}>10%</option>
            <option value={15}>15%</option>
            <option value={20}>20%</option>
          </select>
        </div>
        <div className="mb-4">
            <label className="block font-bold mb-2">Select Products</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Write here"
            />
          </div>


              <label className="block font-bold mb-2 text-xs">Terms & Conditions</label>
              <ul className="list-disc pl-5 text-xs">
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
                <li>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 pl-4 bg-blue-50 p-4 rounded text-xs">
            <div className="mb-4">
              <label className="block font-bold mb-2 text-xs">Sub Total</label>
              <span>Rs.{subTotal.toLocaleString()}</span>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2 text-xs">Discount (in %)</label>
              <span>{discount}%</span>
              <span className="block">Rs.{discountAmount.toLocaleString()}(-)</span>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2 text-xs">TDS Applicable?</label>
              <input
                type="checkbox"
                checked={isTDSApplicable}
                onChange={() => setIsTDSApplicable(!isTDSApplicable)}
                className="mr-2"
              />
              <span>Rs.{tdsAmount.toLocaleString()}(-)</span>
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2 text-xs">TCS Applicable?</label>
              <input
                type="checkbox"
                checked={isTCSApplicable}
                onChange={() => setIsTCSApplicable(!isTCSApplicable)}
                className="mr-2"
              />
              <span>Rs.{tcsAmount.toLocaleString()}(-)</span>
            </div>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={e => setCustomerName(e.target.value)}
              className="p-1 border rounded text-xs"
            />
            <div className="mb-4">
              <label className="block font-bold mb-2 text-xs">Total Amount</label>
              <span>Rs.{totalAmount.toLocaleString()}</span>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-500 text-white px-4 py-1 rounded text-xs">Save</button>
              <button className="bg-blue-700 text-white px-4 py-1 rounded text-xs">Save & Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeadInvoices;
