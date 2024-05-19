"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { graphql } from "@/gql";
import useMutation from "@/hooks/useMutation";
import { useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";

const SELLER_DASHBOARD__STOCK = graphql(`
  query SellerDashboard_StockQuery($slug: String!) {
    SellerDashboard_Stock(slug: $slug) {
      seller_dashboard_product_sizes {
        id
        seller_dashboard_size {
          size
        }
        seller_dashboard_offer {
          prod_size
          ready_stock
        }
      }
    }
  }
`);

const SELLER_DASHBOARD__UPDATE_STOCK = graphql(`
  mutation SellerDashboard_UpdateStockMutation($array: String!) {
    SellerDashboard_UpdateStock(array: $array) {
      success
      message
    }
  }
`);

export default function _SellerDashboard_Product_StockPage() {
  const { slug } = useParams();
  const { data } = useQuery(SELLER_DASHBOARD__STOCK, {
    variables: {
      slug: `${slug}`,
    },
  });
  const [updateStock] = useMutation(SELLER_DASHBOARD__UPDATE_STOCK, {});
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Size</TableHead>
            <TableHead className="w-[100px]">Quantity</TableHead>
          </TableRow>
        </TableHeader>
        {data?.SellerDashboard_Stock && (
          <TableBody>
            <Formik
              initialValues={data?.SellerDashboard_Stock?.seller_dashboard_product_sizes?.reduce(
                (acc: any, ps: any) => ({
                  ...acc,
                  [ps?.id]: ps?.seller_dashboard_offer?.ready_stock || 0,
                }),
                {}
              )}
              onSubmit={(values) => {
                updateStock({
                  variables: {
                    array: JSON.stringify(values),
                  },
                });
                console.log(values);
              }}
            >
              {({ values, handleChange, handleSubmit }) => {
                return (
                  <>
                    {data?.SellerDashboard_Stock?.seller_dashboard_product_sizes?.map(
                      (ps: any) => (
                        <TableRow key={ps?.id}>
                          <TableCell>
                            {ps?.seller_dashboard_size?.size}
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              name={ps?.id}
                              value={values[ps?.id]}
                              onChange={handleChange}
                            />
                          </TableCell>
                        </TableRow>
                      )
                    )}
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Button
                          type="submit"
                          onClick={() => {
                            handleSubmit();
                          }}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  </>
                );
              }}
            </Formik>
          </TableBody>
        )}
      </Table>
    </>
  );
}
