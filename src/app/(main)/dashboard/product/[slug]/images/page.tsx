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
import { CLOUDFLARE_URL } from "@/lib/constants";
import { useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useParams } from "next/navigation";

const SELLER_DASHBOARD__IMAGES = graphql(`
  query SellerDashboard_ImageQuery($slug: String!) {
    SellerDashboard_Image(slug: $slug) {
      image_file
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

export default function _SellerDashboard_Product_ImagePage() {
  const { slug } = useParams();
  const { data } = useQuery(SELLER_DASHBOARD__IMAGES, {
    variables: {
      slug: `${slug}`,
    },
  });
  return (
    <>
      {data?.SellerDashboard_Image?.map((image, index) => (
        <img
          key={index}
          src={`${CLOUDFLARE_URL}/${image?.image_file}/public`}
          className="w-32 h-32 object-cover"
        />
      ))}
    </>
  );
}
