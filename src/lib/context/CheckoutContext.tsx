// context/OrderContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

const CheckoutContext = createContext<
  | {
      promoCode: string;
      discount: number;
      verifyAndApplyPromoCode: (code: string) => void;
    }
  | undefined
>(undefined);

export const CheckoutProvider = ({ children }: { children: ReactNode }) => {
  const [promoCode, setPromoCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);

  const verifyAndApplyPromoCode = async (code: string) => {
    // Example async call to verify the promo code
    // On success, update the state with the received promo code and discount
    setPromoCode(code);
    // Assume we receive a discount from the API
    // setDiscount(receivedDiscount);
  };

  const value = { promoCode, discount, verifyAndApplyPromoCode };

  return (
    <CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
  );
};

export const useCheckout = (): {
  promoCode: string;
  discount: number;
  verifyAndApplyPromoCode: (code: string) => void;
} => {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};
