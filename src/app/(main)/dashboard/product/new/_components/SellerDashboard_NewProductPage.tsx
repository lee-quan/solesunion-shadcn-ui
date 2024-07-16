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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
import { FragmentType, graphql, useFragment } from "@/gql";
import useMutation from "@/hooks/useMutation";
import { createSlug } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import { Field, Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";

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

const SELLER_DASHBOARD__ADMIN_GET_VENDOR_ACCOUNTS = graphql(`
  query SellerDashboard_AdminGetVendorAccounts {
    SellerDashboard_AdminGetVendorAccounts {
      id
      name
    }
  }
`);

const SELLER_DASHBOARD__ADMIN_CREATE_PRODUCT = graphql(`
  mutation SellerDashboard_AdminCreateProductMutation(
    $product_title: String!
    $category_id: Int!
    $brand_id: Int!
    $product_sku: String!
    $product_description: String
    $lowest_offer: Int!
    $featured: Int!
    $consignment: Int!
    $user_id: Int!
    $images: String
    $sizes: String
    $new_category: String
    $new_brand: String
  ) {
    SellerDashboard_AdminCreateProduct(
      product_title: $product_title
      category_id: $category_id
      brand_id: $brand_id
      product_sku: $product_sku
      product_description: $product_description
      lowest_offer: $lowest_offer
      featured: $featured
      consignment: $consignment
      user_id: $user_id
      images: $images
      sizes: $sizes
      new_category: $new_category
      new_brand: $new_brand
    ) {
      success
      message
    }
  }
`);

export default function SellerDashboard_NewProductPage() {
  const router = useRouter();
  const [isAddingNewCategory, setIsAddingNewCategory] = useState(false);
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false);
  const [isAddingNewSize, setIsAddingNewSize] = useState(false);
  const {
    data: brandsAndCategoriesData,
    loading: isGettingBrandsAndCategories,
  } = useQuery(SELLER_DASHBOARD__GET_BRANDS_AND_CATEGORIES);
  const { data: vendorAccountsData, loading: isGettingVendorAccounts } =
    useQuery(SELLER_DASHBOARD__ADMIN_GET_VENDOR_ACCOUNTS);

  const vendors =
    vendorAccountsData?.SellerDashboard_AdminGetVendorAccounts || [];
  console.log(vendors);
  const brands =
    brandsAndCategoriesData?.SellerDashboard_BrandsAndCategories?.brands || [];
  const categories =
    brandsAndCategoriesData?.SellerDashboard_BrandsAndCategories?.categories ||
    [];

  const [createNewProduct, { loading: isCreatingNewProduct }] = useMutation(
    SELLER_DASHBOARD__ADMIN_CREATE_PRODUCT,
    {
      onSuccess: (data) => {
        router.push(`/${data?.SellerDashboard_AdminCreateProduct?.message}`);
      },
    }
  );

  return (
    <>
      <Formik
        initialValues={{
          product_title: "",
          sku: "",
          category_id: "",
          brand_id: "",
          product_description: "",
          lowest_offer: 0,
          new_category: "",
          new_brand: "",
          consignment: 1,
          user_id: 1,
          sizeString: "",
          sizes: [],
          images: "",
        }}
        onSubmit={async (data, { setSubmitting, setFieldValue }) => {
          const variables = {
            product_title: data.product_title,
            category_id: parseInt(data.category_id),
            new_category: data.new_category,
            new_brand: data.new_brand,
            brand_id: parseInt(data.brand_id),
            product_sku: data.sku,
            product_description: data.product_description || "",
            lowest_offer: data.lowest_offer,
            featured: 0,
            consignment: data.consignment,
            user_id: data.user_id,
            images: data.images,
            sizes: JSON.stringify(
              data.consignment === 1
                ? data.sizes.map((size: any) => size?.join(","))
                : data.sizeString
                    .split(",")
                    .map((size) => [size.trim(), 0, 0].join(","))
            ),
          };
          await createNewProduct({
            variables,
          });
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => {
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
                      <Label htmlFor="product_sku">Product SKU</Label>
                      <Field name="sku" as={Input} />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="category">Category</Label>
                      {!isGettingBrandsAndCategories ? (
                        <Select
                          value={values.category_id}
                          onValueChange={(value) => {
                            setFieldValue("category_id", value);
                            setIsAddingNewCategory(value === "-1");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            <>
                              <SelectItem value={"-1"}>
                                Add new category
                              </SelectItem>
                              {categories.map((category) => (
                                <SelectItem
                                  key={category?.id}
                                  value={category?.id.toString() || ""}
                                >
                                  {category?.cat_name}
                                </SelectItem>
                              ))}
                            </>
                          </SelectContent>
                        </Select>
                      ) : (
                        <Spinner />
                      )}
                      {isAddingNewCategory && (
                        <Field
                          name="new_category"
                          as={Input}
                          placeholder="New category name"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="brand">Brand</Label>
                      {!isGettingBrandsAndCategories ? (
                        <Select
                          value={values.brand_id}
                          onValueChange={(value) => {
                            setFieldValue("brand_id", value);
                            setIsAddingNewBrand(value === "-1");
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a brand" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={"-1"}>Add new brand</SelectItem>
                            {brands.map((brand) => (
                              <SelectItem
                                key={brand?.id}
                                value={brand?.id.toString() || ""}
                              >
                                {brand?.brand_name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Spinner />
                      )}
                      {isAddingNewBrand && (
                        <Field
                          name="new_brand"
                          as={Input}
                          placeholder="New brand name"
                        />
                      )}
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="product_description">Description</Label>
                      <Textarea
                        value={values.product_description || ""}
                        onChange={(e) => {
                          setFieldValue("product_description", e.target.value);
                        }}
                      />
                    </div>
                    {/* {product?.consignment === 1 && (
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
                    )} */}
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="brand">Product Listing Type</Label>
                      <RadioGroup
                        defaultValue="Online"
                        value={
                          values.consignment === 1 ? "Consignment" : "Online"
                        }
                        onValueChange={(value) => {
                          setFieldValue(
                            "consignment",
                            value === "Consignment" ? 1 : 0
                          );
                        }}
                      >
                        <div className="flex flex-col space-y-2">
                          <Label className="flex items-center gap-2">
                            <RadioGroupItem value="Online" />
                            Online Listing
                          </Label>
                          <Label className="flex items-center gap-2">
                            <RadioGroupItem value="Consignment" />
                            Consignment
                          </Label>
                        </div>
                      </RadioGroup>
                      <div className="grid grid-cols-1 items-center gap-2">
                        <div className="flex items-center">
                          <span>RM </span>
                          <Field
                            className="max-w-[200px] ml-2"
                            name="lowest_offer"
                            type="number"
                            as={Input}
                          />
                        </div>
                      </div>
                    </div>
                    {values.consignment == 1 && (
                      <div className="grid grid-cols-1 items-center gap-2">
                        <Label htmlFor="brand">Vendor</Label>
                        {!isGettingVendorAccounts ? (
                          <Select
                            value={`${values.user_id}`}
                            onValueChange={(value) => {
                              setFieldValue("user_id", parseInt(value));
                              setIsAddingNewCategory(value === "-1");
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <>
                                <SelectItem value={"0"}>
                                  No user selected
                                </SelectItem>
                                {vendors.map((vendors: any) => (
                                  <SelectItem
                                    key={vendors?.id}
                                    value={vendors?.id.toString() || ""}
                                  >
                                    {vendors?.name}
                                  </SelectItem>
                                ))}
                              </>
                            </SelectContent>
                          </Select>
                        ) : (
                          <Spinner />
                        )}
                      </div>
                    )}
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="product_title">
                        Sizes (separated by ,)
                      </Label>
                      <Field
                        name="sizeString"
                        as={Input}
                        disabled={isAddingNewSize}
                      />
                      {values.consignment == 1 && (
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsAddingNewSize(!isAddingNewSize);
                            setFieldValue(
                              "sizes",
                              values.sizeString
                                .split(",")
                                .map((size) => [
                                  size.trim(),
                                  0,
                                  values.lowest_offer,
                                ])
                            );
                          }}
                          className="w-[110.09px]"
                        >
                          {isAddingNewSize ? "Modify Size" : "Add Size"}
                        </Button>
                      )}
                    </div>

                    {isAddingNewSize && values.consignment == 1 && (
                      <div className="grid grid-cols-1 items-center gap-2">
                        <Label htmlFor="product_title">Stock</Label>

                        {values.sizes.map((size, index) => {
                          console.log(size);
                          return (
                            <div
                              className="grid grid-cols-12 items-center gap-2"
                              key={index}
                            >
                              <Label className="col-span-1 text-center">
                                {size[0]}
                              </Label>
                              <Label className="col-span-2 text-right">
                                Stock
                              </Label>
                              <Field
                                name={`sizes[${index}][1]`}
                                as={Input}
                                className="col-span-4"
                              />
                              <Label className="col-span-2">Price (RM)</Label>
                              <Field
                                name={`sizes[${index}][2]`}
                                as={Input}
                                className="col-span-3"
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="grid grid-cols-1 items-center gap-2">
                      <Label htmlFor="product_title">
                        Images (separated by |)
                      </Label>
                      <Field name="images" as={Input} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    type="submit"
                    isSubmitting={isSubmitting}
                    disabled={isSubmitting}
                    className="w-[110.09px]"
                  >
                    Add
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
