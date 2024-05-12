"use client";

import { Spinner, TrashIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { FragmentType, graphql, useFragment } from "@/gql";
import { ProductSize } from "@/gql/graphql";
import { createSlug } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { Field, Form, Formik, useField } from "formik";
import { useParams } from "next/navigation";
import { useState } from "react";

const SELLER_DASHBOARD__GET_PRODUCT_DETAILS_SIZES_FRAGMENT = graphql(`
  fragment SellerDashboard_GetProductDetails_SizesFragment on ProductSize {
    id
    size
  }
`);

const SELLER_DASHBOARD__GET_PRODUCT_DETAILS_PRODUCT_FRAGMENT = graphql(`
  fragment SellerDashboard_GetProductDetails_ProductFragment on Product {
    id
    product_title
    slug
    product_sku
    category_id
    brand_id
    product_description
    lowest_offer
    consignment
    product_sizes {
      id
      size
      ...SellerDashboard_GetProductDetails_SizesFragment
    }
  }
`);

const SELLER_DASHBOARD__GET_PRODUCT_DETAILS = graphql(`
  query SellerDashboard_ProductDetailsQuery($slug: String!) {
    SellerDashboard_GetProductDetails(slug: $slug) {
      id
      slug
      product_title
      product_sku
      category_id
      brand_id
      product_description
      lowest_offer
      consignment
      product_sizes {
        id
        size
        ...SellerDashboard_GetProductDetails_SizesFragment
      }
    }
  }
`);

const SELLER_DASHBOARD__GET_BRANDS_AND_CATEGORIES = graphql(`
  query SellerDashboard_GetBrandsAndCategories {
    SellerDashboard_BrandsAndCategories {
      brands {
        id
        brand_name
      }
      categories {
        id
        cat_name
      }
    }
  }
`);

export default function SellerDashboard_ProductInformationPage() {
  const { slug }: { slug: string } = useParams();
  const [editSizeMode, setEditSizeMode] = useState(false);
  const [changeSize, setChangeSize] = useState({
    remove: [],
    add: [],
  });
  const { data: productDetailsData, loading: isGettingProductDetails } =
    useQuery(SELLER_DASHBOARD__GET_PRODUCT_DETAILS, {
      variables: {
        slug,
      },
    });

  const product = productDetailsData?.SellerDashboard_GetProductDetails;

  const { data: brandsAndCategoriesData } = useQuery(
    SELLER_DASHBOARD__GET_BRANDS_AND_CATEGORIES,
    {
      skip: !product,
    }
  );

  const brands =
    brandsAndCategoriesData?.SellerDashboard_BrandsAndCategories?.brands || [];
  const categories =
    brandsAndCategoriesData?.SellerDashboard_BrandsAndCategories?.categories ||
    [];

  return (
    <>
      {isGettingProductDetails ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Spinner />
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <Formik
            initialValues={{
              product_title: product?.product_title,
              slug: product?.slug,
              sku: product?.product_sku,
              category_id: `${product?.category_id}`,
              brand_id: `${product?.brand_id}`,
              product_description: product?.product_description,
              lowest_offer: product?.lowest_offer,
            }}
            onSubmit={(data) => {
              console.log(data);
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => {
              const slug = createSlug(values.product_title || "");
              return (
                <Form>
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Details</CardTitle>
                      <CardDescription></CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="product_title">Product Title</Label>
                          <Field name="product_title" as={Input} />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="product_slug">Product Slug</Label>
                          <p className="select-none">{slug}</p>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="product_sku">Product SKU</Label>
                          <Field name="sku" as={Input} />
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="category">Category</Label>
                          {!!categories ? (
                            <Select
                              value={values.category_id}
                              onValueChange={(value) =>
                                setFieldValue("category", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category?.id}
                                    value={`${category?.id || 0}`}
                                  >
                                    {category?.cat_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Spinner />
                          )}
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="brand">Brand</Label>
                          {!!brands ? (
                            <Select
                              value={values.brand_id}
                              onValueChange={(value) =>
                                setFieldValue("category", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                              </SelectTrigger>
                              <SelectContent>
                                {brands.map((brand) => (
                                  <SelectItem
                                    key={brand?.id}
                                    value={`${brand?.id || 0}`}
                                  >
                                    {brand?.brand_name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <Spinner />
                          )}
                        </div>
                        <div className="grid grid-cols-1 items-center gap-2">
                          <Label htmlFor="product_description">
                            Description
                          </Label>
                          <Textarea
                            value={values.product_description || ""}
                            onChange={(e) => {
                              setFieldValue(
                                "product_description",
                                e.target.value
                              );
                            }}
                          />
                        </div>
                        {product?.consignment === 1 && (
                          <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="price">Price</Label>
                            <div className="flex items-center">
                              <span>RM </span>
                              <Field
                                className="max-w-[200px] ml-2"
                                name="lowest_offer"
                                as={Input}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit">Save Changes</Button>
                    </CardFooter>
                  </Card>
                </Form>
              );
            }}
          </Formik>
          <Card>
            <CardHeader>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <CardTitle>Sizes</CardTitle>
                  <div className="flex gap-2">
                    {editSizeMode ? (
                      <>
                        <Button
                          className="w-auto"
                          onClick={() => setEditSizeMode(false)}
                        >
                          Save
                        </Button>
                        <Button
                          className="w-auto"
                          onClick={() => {
                            setChangeSize({
                              remove: [],
                              add: [],
                            });
                            setEditSizeMode(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="w-auto"
                        onClick={() => setEditSizeMode(true)}
                      >
                        Edit
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex gap-4 flex-col">
              <div className="flex flex-wrap gap-2">
                {product?.product_sizes && (
                  <>
                    {product?.product_sizes
                      ?.filter((ps) => {
                        return !changeSize.remove.some(
                          (item: any) => item.id === ps?.id
                        );
                      })
                      .map((ps) => (
                        <SizeCard
                          key={ps?.id}
                          ps={ps}
                          editSizeMode={editSizeMode}
                          changeSize={changeSize}
                          setChangeSize={setChangeSize}
                        />
                      ))}
                  </>
                )}
              </div>
              {changeSize?.remove.length > 0 && (
                <div>
                  <h3>Removed Sizes</h3>
                  <div className="flex gap-2 flex-wrap">
                    {changeSize?.remove.map((ps: any) => (
                      <div
                        key={ps.id}
                        className="px-2 rounded-sm border flex items-center gap-2"
                      >
                        <span>{ps?.size}</span>
                        <Button
                          variant="ghost"
                          className="p-0 h-auto"
                          onClick={() => {
                            setChangeSize({
                              remove: changeSize.remove.filter(
                                (item: any) => item.id !== ps.id
                              ),
                              add: changeSize.add,
                            });
                          }}
                        >
                          {editSizeMode && <PlusIcon className="p-0 h-full" />}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {editSizeMode && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3>Added Size</h3>
                    <Button>Add new size</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
}

function SizeCard({
  ps,
  editSizeMode,
  changeSize,
  setChangeSize,
}: {
  ps: FragmentType<
    typeof SELLER_DASHBOARD__GET_PRODUCT_DETAILS_SIZES_FRAGMENT
  > | null;
  editSizeMode: boolean;
  changeSize: any;
  setChangeSize: (changeSize: any) => void;
}) {
  const productSize = useFragment(
    SELLER_DASHBOARD__GET_PRODUCT_DETAILS_SIZES_FRAGMENT,
    ps
  );
  return (
    <div className="px-2 rounded-sm border flex items-center gap-2">
      <span>{productSize?.size}</span>
      <Button variant="ghost" className="p-0 h-auto">
        {editSizeMode && (
          <MinusIcon
            className="p-0 h-full"
            onClick={() => {
              setChangeSize({
                remove: [...changeSize.remove, productSize],
                add: changeSize.add,
              });
            }}
          />
        )}
      </Button>
    </div>
  );
}
