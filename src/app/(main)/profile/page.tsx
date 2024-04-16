"use client";

import { LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useMutation from "@/hooks/useMutation";
import { UPDATE_USER_PROFILE } from "@/lib/graphql/mutations/profileMutations";
import { GET_USER_PROFILE } from "@/lib/graphql/queries/profileQueries";
import { useQuery } from "@apollo/client";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

export default function ProfileInformationPage() {
  const { data } = useQuery(GET_USER_PROFILE);

  return (
    <>
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-xl">
          Profile Information
        </h1>
      </div>
      {!!!data ? (
        <LoaderIcon className="h-6 w-6" />
      ) : (
        <ProfileInformationForm userProfile={data?.userProfile} />
      )}
    </>
  );
}

function ProfileInformationForm({
  userProfile,
}: {
  userProfile: {
    name: string;
    email: string;
    mobile: string;
    birthdate: string;
    referral_code: string;
  };
}) {
  const [updateUserProfile, { data, loading, error }] =
    useMutation(UPDATE_USER_PROFILE);

  const profileDetailsValidationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    mobile: Yup.string().required("Required"),
    birthdate: Yup.string().required("Required"),
    referral_code: Yup.string().required("Required"),
  });
  return (
    <>
      <Formik
        validationSchema={profileDetailsValidationSchema}
        initialValues={{
          ...userProfile,
          birthdate: userProfile.birthdate.split(" ")[0],
        }}
        onSubmit={async (values) => {
          await updateUserProfile({
            variables: {
              ...values,
            },
          });
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Card className="h-full py-3">
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Field
                      id="name"
                      name="name"
                      as={Input}
                      type="text"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Field
                      id="email"
                      as={Input}
                      placeholder="Enter your email"
                      type="email"
                      name="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Contact Number</Label>
                    <Field
                      id="mobile"
                      as={Input}
                      placeholder="Enter your mobile"
                      type="text"
                      name="mobile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Field
                      id="birthdate"
                      as={Input}
                      placeholder="Enter your birthdate"
                      type="date"
                      name="birthdate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthdate">Referral Code</Label>
                    <Field
                      id="referral_code"
                      as={Input}
                      placeholder="Enter your referral code"
                      type="text"
                      name="referral_code"
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                <Button
                  type="submit"
                  className="w-20"
                  isSubmitting={isSubmitting}
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
