// context/OrderContext.tsx
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface BillingAddressType {
  id: number;
  name: string;
  address_type: string;
  address_1: string;
  address_2: string;
  pincode: string;
  city: string;
  country: string;
  state: string;
  mobile: string;
}

const CheckoutContext = createContext<
  | {
      promoCode: string;
      updatePromoCode: (code: string) => void;

      deliveryAddress: string;
      updateDeliveryAddress: (address: string) => void;

      emailAddress: string;
      updateEmailAddress: (email: string) => void;

      fulfillmentMethod: string;
      updateFullfillmentMethod: (method: string) => void;

      billingAddress: BillingAddressType;
      updateBillingAddress: (address: BillingAddressType) => void;

      paymentMethod: string;
      updatePaymentMethod: (method: string) => void;
    }
  | undefined
>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [promoCode, setPromoCode] = useState<any>({
    id: 0,
    code: "",
    maximum_discount: 0,
    discount: 0,
    discount_type: "",
    success: false,
    message: "",
  });
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>(
    session?.user?.email || ""
  );
  const [billingAddress, setBillingAddress] = useState<BillingAddressType>({
    id: 0,
    name: "",
    address_type: "new",
    address_1: "",
    address_2: "",
    pincode: "",
    city: "",
    country: "",
    state: "",
    mobile: "",
  });
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<string>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const updatePromoCode = async (code: any) => {
    setPromoCode(code);
  };
  const updateDeliveryAddress = (address: string) => {
    setDeliveryAddress(address);
  };

  const updateEmailAddress = (email: string) => {
    setEmailAddress(email);
  };

  const updateFullfillmentMethod = (method: string) => {
    setFulfillmentMethod(method);
  };

  const updateBillingAddress = (billingAddress: BillingAddressType) => {
    setBillingAddress(billingAddress);
  };

  const updatePaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };

  const value = {
    promoCode,
    updatePromoCode,
    deliveryAddress,
    updateDeliveryAddress,

    emailAddress,
    updateEmailAddress,

    fulfillmentMethod,
    updateFullfillmentMethod,

    billingAddress,
    updateBillingAddress,

    paymentMethod,
    updatePaymentMethod,
  };

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = (): {
  promoCode: any;
  updatePromoCode: (code: string) => void;

  updateDeliveryAddress: (address: string) => void;
  deliveryAddress: string;

  emailAddress: string;
  updateEmailAddress: (email: string) => void;

  fulfillmentMethod: string;
  updateFullfillmentMethod: (method: string) => void;

  paymentMethod: string;
  updatePaymentMethod: (method: string) => void;
} => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within an CheckoutProvider");
  }
  return context;
};
