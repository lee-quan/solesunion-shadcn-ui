"use client";

import { PackageIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, encrypt, price } from "@/lib/utils";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

interface ProductSizeType {
  id: number;
  size: string;
  offer?: {
    id: number;
    offer_price: number;
    ready_stock: number;
  };
  online_offer?: {
    id: number;
    offer_price: number;
    ready_stock: number;
  };
  in_store_offer?: {
    id: number;
    offer_price: number;
    ready_stock: number;
  };
}

export default function ProductDetailPageConsignment({
  product,
}: {
  product: any;
}) {
  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState<ProductSizeType>({
    id: 0,
    size: "",
    offer: {
      id: 0,
      offer_price: 0,
      ready_stock: 0,
    },
    online_offer: {
      id: 0,
      offer_price: 0,
      ready_stock: 0,
    },
    in_store_offer: {
      id: 0,
      offer_price: 0,
      ready_stock: 0,
    },
  });

  const isConsignment = product.consignment == 1;

  function createSizePanel() {
    return (
      <SizePanel
        productSizes={product.product_sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        setQuantity={setQuantity}
      />
    );
  }

  function createButton() {
    function InstantDeliveryButton({
      offer,
    }: {
      offer: { id: number; offer_price: number; ready_stock: number };
    }) {
      return (
        <Button className="flex-1 flex-col h-20 p-0 w-full" variant="outline">
          <Link
            className="w-full"
            href={`/checkout?q=${encrypt(
              JSON.stringify({
                cartItem: { offer_id: offer.id, quantity },
              })
            )}`}
          >
            <p className="uppercase text-xs font-bold">Instant Delivery</p>
            <p className="text-lg font-bold">RM {price(offer.offer_price)}</p>
            <span className="flex items-center text-xs justify-center">
              <PackageIcon className="h-4 w-4 mr-2" />{" "}
              <p className="font-light">1-2 days delivery</p>
            </span>
          </Link>
        </Button>
      );
    }

    if (selectedSize.offer) {
      return <InstantDeliveryButton offer={selectedSize.offer} />;
    }

    return null;
  }

  return (
    <div className="grid gap-4 md:gap-10 items-start">
      <div className="grid gap-4">
        {!isConsignment && (
          <Link href="/verification">
            <div className="relative flex h-[50px] w-full bg-green-600">
              <div
                className="bg-green-800 w-2/5 flex items-center justify-center"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 90% 100%, 0% 100%)",
                }}
              >
                <img
                  src="/image/solesunion-removebg-preview.png"
                  className="h-10 w-auto"
                />
              </div>
              <div className="relative w-3/5 flex items-center justify-between font-normal text-white uppercase text-sm pl-4">
                100% Authentic
                <img src="/image/silhouette1.svg" className="hidden lg:flex" />
                <img src="/image/silhouette2.svg" />
              </div>
            </div>
          </Link>
        )}
        <ScrollArea className="min-h-[60px] max-h-[320px] w-full hidden md:block">
          {createSizePanel()}
        </ScrollArea>
        <div className="flex items-center gap-4">
          <SizeDrawer>
            {createSizePanel()}
            {createButton()}
          </SizeDrawer>

          {/* <div className="text-4xl font-bold ml-auto">$150</div> */}
        </div>
        {selectedSize.size != "" && !!selectedSize.offer && (
          <div className="hidden md:block sticky bottom-0 bg-white p-4 space-y-3">
            <div className="grid gap-2">
              <Label className="text-base" htmlFor="quantity">
                Quantity
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  <MinusIcon className="w-4 h-4" />
                </Button>
                <span className="w-4 text-center">{quantity}</span>
                <Button
                  size="icon"
                  variant="outline"
                  disabled={quantity >= selectedSize.offer?.ready_stock}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
            {createButton()}
          </div>
        )}
      </div>
    </div>
  );
}

function SizeDrawer({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="md:hidden">
          Select Size
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-1">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

function SizePanel({
  productSizes,
  selectedSize,
  setSelectedSize,
  setQuantity,
}: {
  productSizes: ProductSizeType[];
  selectedSize: ProductSizeType;
  setSelectedSize: (productSize: ProductSizeType) => void;
  setQuantity: (quantity: number) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 my-1">
      {productSizes?.map((productSize: ProductSizeType, index: number) => (
        <Button
          key={index}
          className={cn(
            "text-sm flex-col h-14",
            selectedSize.size === productSize.size &&
              "font-bold border-black border-2"
          )}
          disabled={
            productSize.offer
              ? productSize.offer.ready_stock < 1
                ? true
                : false
              : true
          }
          variant="outline"
          onClick={() => {
            setSelectedSize(productSize);
            setQuantity(1);
          }}
        >
          <p>{productSize.size}</p>
          <p className="text-xs bold">({productSize.offer?.ready_stock})</p>
        </Button>
      ))}
    </div>
  );
}
