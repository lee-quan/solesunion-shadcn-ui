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

export default function ProductDetailPageDirectListing({
  product,
}: {
  product: any;
}) {
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

  console.log(product);
  const isConsignment = product.consignment == 1;
  function createSizePanel() {
    return (
      <SizePanel
        productSizes={product.product_sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />
    );
  }

  function createConditionalButton() {
    function InstantDeliveryButton({
      offer,
    }: {
      offer: { id: number; offer_price: number; ready_stock: number };
    }) {
      return (
        <Button className="flex-1 flex-col h-20 p-0" variant="outline">
          <Link
            className="w-full"
            href={`/checkout?q=${encrypt(
              JSON.stringify({
                cartItem: { offer_id: offer.id, quantity: 1 },
              })
            )}`}
          >
            <p className="uppercase text-xs font-bold">Instant Delivery</p>
            <p className="text-lg font-bold">RM {price(offer.offer_price)}</p>
            <span className="flex items-center justify-center text-xs">
              <PackageIcon className="h-4 w-4 mr-2" />{" "}
              <p className="font-light">1-2 days delivery</p>
            </span>
          </Link>
        </Button>
      );
    }

    function BuyNowButton({
      offer,
    }: {
      offer: { id: number; offer_price: number; ready_stock: number };
    }) {
      return (
        <Button className="flex-1 flex-col h-20 p-0" variant="outline">
          <Link
            className="w-full"
            href={`/checkout?q=${encrypt(
              JSON.stringify({
                cartItem: { offer_id: offer.id, quantity: 1 },
              })
            )}`}
          >
            <p className="uppercase text-xs font-bold">Buy Now</p>
            <p className="text-lg font-bold">RM {price(offer.offer_price)}</p>
            <span className="flex items-center justify-center text-xs">
              <PackageIcon className="h-4 w-4 mr-2" />{" "}
              <p className="font-light">3-5 days delivery</p>
            </span>
          </Link>
        </Button>
      );
    }
    if (
      selectedSize.online_offer &&
      selectedSize.in_store_offer &&
      selectedSize.online_offer.id &&
      selectedSize.in_store_offer.id
    ) {
      return (
        <div className="flex gap-2">
          <InstantDeliveryButton offer={selectedSize.online_offer} />
          <BuyNowButton offer={selectedSize.in_store_offer} />
        </div>
      );
    } else if (selectedSize.online_offer) {
      return <BuyNowButton offer={selectedSize.online_offer} />;
    } else if (selectedSize.in_store_offer) {
      return <InstantDeliveryButton offer={selectedSize.in_store_offer} />;
    } else {
      return null;
    }
  }

  function createButton() {
    return (
      <div className="grid gap-2">
        {createConditionalButton() ? (
          <>
            {createConditionalButton()}
            {/* <Button size="lg">Add to cart</Button> */}
            <Link
              href={`/${product.slug}/list?q=${encrypt(
                JSON.stringify({
                  id: selectedSize.id,
                  size: selectedSize.size,
                })
              )}`}
              className="text-xs underline text-center"
            >
              Have this product? List now.
            </Link>
          </>
        ) : (
          <Button size="lg" asChild>
            <Link
              className="w-full"
              href={`/${product.slug}/list?q=${encrypt(
                JSON.stringify({
                  id: selectedSize.id,
                  size: selectedSize.size,
                })
              )}`}
            >
              Have this product? List now.
            </Link>
          </Button>
        )}
      </div>
    );
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
                100% Authentic & Brand New
                <img src="/image/silhouette2.svg" />
              </div>
            </div>
          </Link>
        )}
        <ScrollArea className="min-h-[60px] max-h-[320px] w-full">
          {createSizePanel()}
        </ScrollArea>
        
        {selectedSize.size != "" && (
          <div className="sticky bottom-0 bg-white p-4">
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
}: {
  productSizes: ProductSizeType[];
  selectedSize: ProductSizeType;
  setSelectedSize: (productSize: ProductSizeType) => void;
}) {
  return (
    <div className="grid grid-cols-4 gap-2 my-1">
      {productSizes?.map((productSize: ProductSizeType, index: number) => (
        <Button
          key={index}
          className={cn(
            "text-sm flex-col h-14 font-normal",
            selectedSize.size === productSize.size &&
              "font-bold border-black border-2"
          )}
          variant="outline"
          onClick={() => {
            setSelectedSize(productSize);
          }}
        >
          <p>{productSize.size}</p>
          <p>RM {price(productSize.offer?.offer_price) || "--"}</p>
        </Button>
      ))}
    </div>
  );
}
