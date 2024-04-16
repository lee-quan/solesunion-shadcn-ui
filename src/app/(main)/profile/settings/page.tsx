"use client";

import { FormField } from "@/components/form-field";
import { LoaderIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useMutation from "@/hooks/useMutation";
import {
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PROFILE,
} from "@/lib/graphql/mutations/profileMutations";
import { GET_VACATION_MODE } from "@/lib/graphql/queries/profileQueries";
import { useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function SettingsPage() {
  const { data } = useQuery(GET_VACATION_MODE);

  return (
    <>
      <div className="flex gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Settings</h1>
      </div>
      <VacationModeForm userVacationMode={data?.vacation_mode} />
      <PasswordForm />
    </>
  );
}

function VacationModeForm({ userVacationMode }: { userVacationMode: number }) {
  const [updateUserProfile, { data, loading, error }] =
    useMutation(UPDATE_USER_PROFILE);

  const validationSchema = Yup.object().shape({
    vacation_mode: Yup.number().required("Required"),
  });

  return (
    <>
      <Card className="py-3">
        <CardContent>
          <Label htmlFor="vacation-mode">Vacation Mode</Label>
          {userVacationMode === undefined ? (
            <LoaderIcon className="h-6 w-6 animate-spin" />
          ) : (
            <Formik
              validationSchema={validationSchema}
              initialValues={{
                vacation_mode: userVacationMode,
              }}
              onSubmit={(values) => {
                updateUserProfile({
                  variables: {
                    ...values,
                  },
                });
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <Form>
                  <Switch
                    name="vacation_mode"
                    type="submit"
                    checked={values.vacation_mode === 1}
                    onClick={() => {
                      setFieldValue(
                        "vacation_mode",
                        values.vacation_mode === 1 ? 0 : 1
                      );
                    }}
                  />
                </Form>
              )}
            </Formik>
          )}
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Enable vacation mode to temporarily disable your listings.
          </p>
        </CardContent>
      </Card>
    </>
  );
}

function PasswordForm() {
  const [updateUserPassword] = useMutation(UPDATE_USER_PASSWORD);

  const validationSchema = Yup.object().shape({
    current_password: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .notOneOf(
        [Yup.ref("current_password")],
        "New password cannot be the same as the current password"
      ),
    confirm_password: Yup.string()
      .required("Required")
      .equals([Yup.ref("password")], "Passwords do not match"),
  });

  return (
    <>
      <Formik
        validateOnChange={true}
        validationSchema={validationSchema}
        initialValues={{
          current_password: "",
          password: "",
          confirm_password: "",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          let response = await updateUserPassword({
            variables: {
              current_password: values.current_password,
              new_password: values.password,
            },
          });
          if (Object.values(response)[0].success) {
            resetForm();
          }
          // resetForm();
        }}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <Card className="py-3">
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="col-span-1 space-y-2">
                    <FormField
                      name="current_password"
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
                    />
                  </div>
                  <div className="col-span-1 hidden lg:block"></div>
                  <div>
                    <FormField
                      name="password"
                      label="New Password"
                      type="password"
                      placeholder="Enter your new password"
                    />
                  </div>
                  <div>
                    <FormField
                      name="confirm_password"
                      label="Confirm Password"
                      type="password"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center gap-2">
                <Button size="sm" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Loading" : "Save"}
                </Button>
              </CardFooter>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
}
