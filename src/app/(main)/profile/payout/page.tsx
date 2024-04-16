"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UPDATE_USER_PROFILE } from "@/lib/graphql/mutations/profileMutations";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import * as Yup from "yup";

const banks = [
  {
    ach_bank_code: "32",
    label: "Affin Bank",
    value: "PHBMMYKL",
  },
  {
    ach_bank_code: "32",
    label: "Affin Islamic Bank",
    value: "AIBBMYKL",
  },
  {
    ach_bank_code: "43",
    label: "Agrobank",
    value: "AGOBMYKL",
  },
  {
    ach_bank_code: "50",
    label: "Al-Rajhi Banking \u0026 Investment Corporation",
    value: "RJHIMYKL",
  },
  {
    ach_bank_code: "12",
    label: "Alliance Bank",
    value: "MFBBMYKL",
  },
  {
    ach_bank_code: "08",
    label: "AmBank",
    value: "ARBKMYKL",
  },
  {
    ach_bank_code: "08",
    label: "AmBank Islamic",
    value: "AISLMYKL",
  },
  {
    ach_bank_code: "63",
    label: "BNP Paribas",
    value: "BNPAMYKL",
  },
  {
    ach_bank_code: "04",
    label: "Bangkok Bank",
    value: "BKKBMYKL",
  },
  {
    ach_bank_code: "40",
    label: "Bank Islam",
    value: "BIMBMYKL",
  },
  {
    ach_bank_code: "99",
    label: "Bank Kerjasama Rakyat Malaysia",
    value: "BKRMMYKL",
  },
  {
    ach_bank_code: "41",
    label: "Bank Muamalat",
    value: "BMMBMYKL",
  },
  {
    ach_bank_code: "06",
    label: "Bank Simpanan Nasional",
    value: "BSNAMYK1",
  },
  {
    ach_bank_code: "07",
    label: "Bank of America",
    value: "BOFAMY2X",
  },
  {
    ach_bank_code: "42",
    label: "Bank of China",
    value: "BKCHMYKL",
  },
  {
    ach_bank_code: "10",
    label: "Bank of Tokyo-Mitsubishi UFJ",
    value: "BOTKMYKX",
  },
  {
    ach_bank_code: "35",
    label: "CIMB Bank",
    value: "CIBBMYKL",
  },
  {
    ach_bank_code: "35",
    label: "CIMB Islamic Bank",
    value: "CTBBMYKL",
  },
  {
    ach_bank_code: "46",
    label: "China Construction Bank",
    value: "PCBCMYKL",
  },
  {
    ach_bank_code: "17",
    label: "Citibank",
    value: "CITIMYKL",
  },
  {
    ach_bank_code: "19",
    label: "Deutsche Bank",
    value: "DEUTMYKL",
  },
  {
    ach_bank_code: "56",
    label: "HSBC Amanah",
    value: "HMABMYKL",
  },
  {
    ach_bank_code: "22",
    label: "HSBC Bank",
    value: "HBMBMYKL",
  },
  {
    ach_bank_code: "24",
    label: "Hong Leong Bank",
    value: "HLBBMYKL",
  },
  {
    ach_bank_code: "24",
    label: "Hong Leong Islamic Bank",
    value: "HLIBMYKL",
  },
  {
    ach_bank_code: "59",
    label: "Industrial \u0026 Commercial Bank of China (ICBC)",
    value: "ICBKMYKL",
  },
  {
    ach_bank_code: "15",
    label: "JP Morgan Chase",
    value: "CHASMYKX",
  },
  {
    ach_bank_code: "44",
    label: "Kuwait Finance House",
    value: "KFHOMYKL",
  },
  {
    ach_bank_code: "52",
    label: "MBSB Bank",
    value: "AFBQMYKL",
  },
  {
    ach_bank_code: "27",
    label: "Maybank",
    value: "MBBEMYKL",
  },
  {
    ach_bank_code: "60",
    label: "Mizuho Bank",
    value: "MHCBMYKA",
  },
  {
    ach_bank_code: "29",
    label: "OCBC Al-Amin Bank",
    value: "OABBMYKL",
  },
  {
    ach_bank_code: "29",
    label: "OCBC Bank",
    value: "OCBCMYKL",
  },
  {
    ach_bank_code: "33",
    label: "Public Bank",
    value: "PBBEMYKL",
  },
  {
    ach_bank_code: "18",
    label: "RHB Bank",
    value: "RHBBMYKL",
  },
  {
    ach_bank_code: "14",
    label: "Standard Chartered Bank",
    value: "SCBLMYKX",
  },
  {
    ach_bank_code: "45",
    label: "Sumitomo Mitsui Banking Corporation",
    value: "SMBCMYKL",
  },
  {
    ach_bank_code: "26",
    label: "United Overseas Bank",
    value: "UOVBMYKL",
  },
];

export default function PayoutPage() {
  return (
    <>
      <div className="flex gap-4">
        <h1 className="font-semibold text-lg md:text-xl">Payout Information</h1>
      </div>
      <PayoutInformationForm />
    </>
  );
}

function PayoutInformationForm() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<string | null>(null);

  console.log(value);
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
        initialValues={
          {
            // birthdate: userProfile.birthdate.split(" ")[0],
          }
        }
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
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                  <Label className="col-span-1 h-full flex items-center">
                    Bank
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="col-span-4 w-full">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? banks.find((bank) => bank.label === value)
                              ?.label
                          : "Select bank..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <BankList
                        value={value}
                        setValue={setValue}
                        setOpen={setOpen}
                      />
                    </PopoverContent>
                  </Popover>
                  <Label className="col-span-1 h-full flex items-center">
                    Account Number
                  </Label>
                  <Field
                    id="account_number"
                    name="account_number"
                    as={Input}
                    className="col-span-4"
                  />
                  <Label className="col-span-1 h-full flex items-center">
                    Account Holder Name
                  </Label>
                  <Field
                    id="account_holder_name"
                    name="account_holder_name"
                    as={Input}
                    className="col-span-4"
                  />
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

function BankList({
  value,
  setValue,
  setOpen,
}: {
  value: string | null;
  setValue: (value: string) => void;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search bank..." className="h-9" />
      <CommandEmpty>No bank found.</CommandEmpty>
      <CommandList>
        <CommandGroup>
          {banks.map((bank) => (
            <CommandItem
              key={bank.value}
              value={bank.label}
              onSelect={(currentValue) => {
                console.log(currentValue, value);
                setValue(currentValue === value ? "" : currentValue);
                setOpen(false);
              }}
              className={cn(value === bank.value && "bg-gray-100")}
            >
              {bank.label}
              <CheckIcon
                className={cn(
                  "ml-auto h-4 w-4",
                  value === bank.value ? "opacity-100" : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
