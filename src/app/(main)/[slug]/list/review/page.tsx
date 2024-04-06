"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useMutation from "@/hooks/useMutation";
import { CREATE_PRODUCT_OFFER } from "@/lib/graphql/mutations/productOfferMutations";
import { decrypt, price2d } from "@/lib/utils";
import { Form, Formik } from "formik";
import { useSearchParams } from "next/navigation";
import * as yup from "yup";
export default function sellPage() {
  const searchParams = useSearchParams();
  const qParams = JSON.parse(decrypt(searchParams.get("q")) || "{}");

  console.log(qParams);
  const validationSchema = yup.object().shape({
    terms: yup.boolean().oneOf([true], "Please read and agree to the terms"),
  });

  const [createProductOffer] = useMutation(CREATE_PRODUCT_OFFER, {
    showToast: true,
  });

  return (
    <div className="h-full flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold">REVIEW LIST</div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <p>Size</p>
          <p>{qParams.size}</p>
        </div>
        <div className="flex justify-between">
          <p>List Type</p>
          <p>{qParams.listType}</p>
        </div>
        <div className="flex justify-between">
          <p>List Price</p>
          <p>RM {price2d(qParams.price)}</p>
        </div>
        <div className="flex justify-between">
          <p>Selling Fee (17%)</p>
          <p>RM {price2d(qParams.price * 0.17)}</p>
        </div>
        <div className="flex justify-between">
          <p>Processing Fee (3%)</p>
          <p>RM {price2d(qParams.price * 0.03)}</p>
        </div>
        <div className="flex justify-between font-bold">
          <p>Total Payout</p>
          <p>RM {price2d(qParams.price * 0.8)}</p>
        </div>
      </div>
      <Formik
        initialValues={{
          terms: false,
          size: qParams.size,
          product_size_id: qParams.id,
          price: qParams.price,
          list_type: qParams.listType,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          console.log(values);
          await createProductOffer({
            variables: {
              ...values,
            },
          });
        }}
      >
        {({ isSubmitting, errors, values, setFieldValue }) => {
          return (
            <Form>
              {qParams.listType && (
                <div>
                  <div className="mt-4 text-sm text-gray-600">
                    <label className="flex flex-col items-start">
                      <p className="text-red-500">
                        {typeof errors.terms === "string" ? errors.terms : ""}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          name="terms"
                          checked={values.terms}
                          onCheckedChange={(checked) => {
                            setFieldValue("terms", checked);
                          }}
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {qParams.listType === "online" ? (
                            <p>
                              I agree to ship the sneakers to Soles Union (SU)
                              within 2 business days after the sale to avoid
                              penalties.
                            </p>
                          ) : (
                            <p>
                              I agree to ship the sneakers to Soles Union (SU)
                              within 2 business days after listing to avoid
                              account restrictions.
                            </p>
                          )}
                        </Label>
                      </div>
                    </label>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    By checking this box, you confirm understanding of the
                    shipping commitments and agree to adhere to them to ensure a
                    smooth transaction process. Failure to comply may result in
                    penalties or account restrictions.
                    {/* as outlined in our Terms of Service. */}
                  </div>
                </div>
              )}
              <div className="flex space-x-4">
                <Button className="flex-1" variant="outline">
                  CANCEL
                </Button>
                <Button
                  className="flex-1"
                  disabled={isSubmitting}
                  isSubmitting={isSubmitting}
                  type="submit"
                >
                  CONFIRM LIST
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
