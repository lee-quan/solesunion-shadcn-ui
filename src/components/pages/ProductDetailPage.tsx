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

export default function ProductPage({ product }: { product: any }) {
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
        <Button className="flex-1 flex-col h-20">
          <Link
            href={`/checkout?q=${encrypt(
              JSON.stringify({
                id: offer.id,
              })
            )}`}
          >
            <p className="uppercase text-xs font-bold">Instant Delivery</p>
            <p className="text-lg font-bold">RM {price(offer.offer_price)}</p>
            <span className="flex items-center text-xs">
              <PackageIcon className="h-4 w-4 mr-2" />{" "}
              <p className="font-light">2-3 days delivery</p>
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
        <Button className="flex-1 flex-col h-20" variant="outline">
          <Link
            href={`/checkout?q=${encrypt(
              JSON.stringify({
                id: offer.id,
              })
            )}`}
          >
            <p className="uppercase text-xs font-bold">Buy Now</p>
            <p className="text-lg font-bold">RM {price(offer.offer_price)}</p>
            <span className="flex items-center text-xs">
              <PackageIcon className="h-4 w-4 mr-2" />{" "}
              <p className="font-light">5-9 days delivery</p>
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
            <Button size="lg">Add to cart</Button>
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
                  src="/images/solesunion-removebg-preview.png"
                  className="h-10 w-auto"
                />
              </div>
              <div className="relative w-3/5 flex items-center justify-between font-normal text-white uppercase text-sm pl-4">
                100% Authentic
                <img src="/images/silhouette1.svg" className="hidden lg:flex" />
                <img src="/images/silhouette2.svg" />
              </div>
            </div>
          </Link>
        )}
        <ScrollArea className="min-h-[60px] max-h-[320px] w-full hidden md:block">
          {createSizePanel()}
        </ScrollArea>
        <div>
          <p>
            Experience the comfort and style of Nike's latest sneaker model, the
            Air Max 270. With a sleek design and Nike's signature air
            cushioning, you'll be walking on air.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <SizeDrawer>
            {createSizePanel()}
            {createButton()}
          </SizeDrawer>

          {/* <div className="text-4xl font-bold ml-auto">$150</div> */}
        </div>
        {selectedSize.size != "" && (
          <div className="hidden md:block sticky bottom-0 bg-white p-4">
            {createButton()}
          </div>
        )}
      </div>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="quantity">
          Quantity
        </Label>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline">
            <MinusIcon className="w-4 h-4" />
          </Button>
          <Input
            className="w-16 text-center"
            defaultValue="1"
            id="quantity"
            min="1"
            type="number"
          />
          <Button size="icon" variant="outline">
            <PlusIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <form className="grid gap-4 md:gap-10">
        <div className="grid gap-2"></div>
        <div className="grid gap-2"></div>
      </form>
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
