import { useQuery } from "@apollo/client";
import { type PropsWithChildren } from "react";

import { GET_STORE_CONFIG } from "@/apis/queries/getStoreConfig";

const AppLayout = ({ children }: PropsWithChildren) => {
  const { data } = useQuery(GET_STORE_CONFIG);
  console.info("data: ", data);

  return <>{children}</>;
};

export default AppLayout;
