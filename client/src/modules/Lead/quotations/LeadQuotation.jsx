import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormComponent as Form } from "@/components/form";
import { FormControl, FormItem, FormField, FormLabel } from "@/components/ui/form";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { hyphenDate } from "@/lib/date-format";
import { CalendarComponent, FormLabelComponent, SelectBloodGroups } from "@/modules/hr/LeaveFile/components.jsx";
import ProductTable from "./ProductTable";
import { ToggleSwitch } from "./component";

export default function LeadQuotation() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [isTCSApplicable, setIsTCSApplicable] = useState(false); // State for TCS applicability
  const [isTDSApplicable, setIsTDSApplicable] = useState(false); // State for TDS applicability

  const [dummyProducts] = useState([
    { name: "Product A", unitPrice: 100, discount: 10 },
    { name: "Product B", unitPrice: 150, discount: 15 },
    { name: "Product C", unitPrice: 200, discount: 20 },
  ]);

  const defaultValues = {
    customer_name: "",
    invoice_number: "",
    order_number: "",
    invoice_date: "",
    due_date: "",
    product: "", // Removed placeholder value from here
    quantity: "",
  };

  const form = useForm({ defaultValues, mode: "onChange" });

  useEffect(() => {
    // Calculate subtotal whenever products change
    const subtotalAmount = products.reduce((total, product) => {
      return total + (product.netAmount || 0);
    }, 0) / 2; // Divide by 2 here to get half of the sum
    setSubtotal(subtotalAmount);
  }, [products]);


  const handleSubmit = (data) => {
    const selectedProduct = dummyProducts.find((product) => product.name === data.product);
    if (selectedProduct) {
      const netAmount = (parseInt(data.quantity) * selectedProduct.unitPrice) - selectedProduct.discount;
      const productData = {
        productName: selectedProduct.name,
        quantity: parseInt(data.quantity),
        unitPrice: selectedProduct.unitPrice,
        discount: selectedProduct.discount,
        netAmount,
      };
      setProducts([...products, productData]);
      form.reset(defaultValues);
    }
  };

  const handleDeleteProduct = (index) => {
    // Remove product from the list
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const handleDiscountChange = (index, value) => {
    const updatedProducts = [...products];
    updatedProducts[index].discount = value;
    updatedProducts[index].netAmount = (updatedProducts[index].quantity * updatedProducts[index].unitPrice) - value;
    setProducts(updatedProducts);
  };


  return (
    <section className="border bg-white rounded-2xl m-4">
      <div className="flex items-center justify-between py-3 px-8 bg-darkBlue rounded-2xl rounded-b-none">
        <p className="text-white font-medium">Customer Details</p>
      </div>
      <Form onSubmit={handleSubmit} form={form} className="flex flex-col gap-4 p-8">
        <div className="flex justify-between gap-8">
          <FormField
            control={form.control}
            name="customer_name"
            rules={{ required: { value: true, message: "This is required*" } }}
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-col items-center gap-2">
                  <FormLabel className="min-w-[10rem]">Customer Name</FormLabel>
                  <Input {...field} placeholder="Enter customer name here" />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="invoice_number"
            rules={{ required: { value: true, message: "This is required*" } }}
            render={({ field }) => (
              <div className="flex flex-col items-center gap-2">
                <FormLabel className="min-w-[10rem]">Invoice Number</FormLabel>
                <Input {...field} placeholder="Enter invoice number here" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="order_number"
            rules={{ required: { value: true, message: "This is required*" } }}
            render={({ field }) => (
              <div className="flex flex-col items-center gap-2">
                <FormLabel className="min-w-[10rem]">Order Number</FormLabel>
                <Input {...field} placeholder="Enter order number here" />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="invoice_date"
            rules={{ required: { value: true, message: "This is required*" } }}
            render={({ field, isDateDisabled }) => (
              <div className="flex flex-col gap-2 items-center">
                <FormLabel className="min-w-[10rem]">Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal min-w-[10rem]", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={isDateDisabled} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="due_date"
            rules={{ required: { value: true, message: "This is required*" } }}
            render={({ field, isDateDisabled }) => (
              <div className="flex flex-col gap-2 items-center">
                <FormLabel className="min-w-[10rem]">Invoice Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("justify-start text-left font-normal min-w-[10rem]", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={isDateDisabled} />
                  </PopoverContent>
                </Popover>
              </div>
            )}
          />
        </div>
      </Form>

      <section>
        <div className="flex items-center justify-between py-3 px-8 bg-darkBlue">
          <p className="text-white font-medium">Product Details</p>
        </div>
        <Form onSubmit={handleSubmit} form={form} className="flex flex-col gap-4 p-8">
          <div className="flex justify-start gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Product</label>
              <div className="relative border border-gray-300 rounded">
                <select {...form.register("product")} className="form-select mt-1 block w-full border-none focus:outline-none pl-3 pr-10 py-2">
                  <option value="" disabled selected hidden>
                    Select Product Here
                  </option>
                  {dummyProducts.map((product, index) => (
                    <option key={index} value={product.name}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12a1 1 0 0 1-1-1V7a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1zM7 15a1 1 0 1 1 0-2h6a1 1 0 1 1 0 2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <Input {...form.register("quantity")} type="number" placeholder="Enter quantity here" />
            </div>
            <Button type="submit" className="self-end bg-darkBlue rounded rounded-3xl text-white">
              + Add To Bill
            </Button>
          </div>
        </Form>
        <ProductTable productDetails={products} onDelete={handleDeleteProduct} />
      </section>
      <section className="flex justify-between p-8 gap-4">
        <div className="w-1/2 flex flex-col gap-4 ">
          <div className="flex gap-4">
            <label className="w-max text-sm font-medium text-gray-700">Apply Discount to All Items</label>
            <Input className="w-max" type="number" placeholder="Enter discount percentage" />
          </div>
          <div className="flex flex-col gap-4">
            <label className="block text-sm font-medium text-gray-700">Selected Products</label>
            <textarea rows="3" className="border rounded p-2" placeholder="Write here..."></textarea>
          </div>
          <div className="border p-4 rounded">
            <h3 className="text-lg font-semibold">Terms and Conditions</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          </div>
        </div>

        <div className="w-1/2 bg-blue-200 p-4 rounded">
          <div className="flex justify-between">
            <h3 className="text-sm font-semibold mb-2">Subtotal</h3>
            <p className="text-sm font-semibold">RS. {subtotal.toFixed(2)}</p>
          </div>
          {products.map((product, index) => (
            <div key={index} className="flex justify-between gap-4">
              <div className="flex gap-4 items-center">
                <label className="w-max text-sm font-medium text-gray-700">{product.productName} Discount (%)</label>
                <Input
                  className="w-max"
                  type="number"
                  placeholder="Enter discount percentage"
                  value={product.discount}
                  onChange={(e) => handleDiscountChange(index, parseInt(e.target.value))}
                />
              </div>
              <p className="text-xl font-semibold">Rs {product.netAmount.toFixed(2)}</p>
            </div>
          ))}
          <div className="flex flex-col justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <ToggleSwitch value={isTDSApplicable} onChange={() => setIsTDSApplicable(!isTDSApplicable)} />
              <p className="text-sm font-medium">TDS Applicable?</p>
            </div>
            <div className="flex items-center gap-4">
              <ToggleSwitch value={isTCSApplicable} onChange={() => setIsTCSApplicable(!isTCSApplicable)} />
              <p className="text-sm font-medium">TCS Applicable?</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <label className="w-max text-sm font-medium text-gray-700">Customer Name</label>
            <Input className="w-max" type="text" placeholder="Search customer here" />
          </div>
          <div className="mt-4 flex justify-between">
            <h3 className="text-sm font-semibold mb-2">Total Amount</h3>
            <p className="text-sm font-semibold">RS. {subtotal.toFixed(2)}</p>
          </div>
        </div>

      </section>
    </section>
  );
}
