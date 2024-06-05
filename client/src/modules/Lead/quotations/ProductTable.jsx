import DeleteIcon from "@/assets/icons/delete.svg";
import React from "react";

const ProductTable = ({ productDetails, onDelete }) => {
  return (
    <section className="mt-4">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-customBlue text-darkBlue">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Product Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Quantity</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Unit Price (Rupees)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Discount (Total Amount)</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Net Amount</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-darkBlue uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {productDetails.map((product, index) => {
            const totalAmount = product.quantity * product.unitPrice;
            const totalDiscount = product.quantity * product.discount;
            const netAmount = totalAmount - totalDiscount;

            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{product.productName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.unitPrice}</td>
                <td className="px-6 py-4 whitespace-nowrap">{totalDiscount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{netAmount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <button onClick={() => onDelete(index)}>
                    <img src={DeleteIcon} alt="cancel" className="w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default ProductTable;
