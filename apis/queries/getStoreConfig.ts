import { gql } from "@apollo/client";
import type { DocumentNode } from "@apollo/client";

export const GET_STORE_CONFIG: DocumentNode = gql`
  query getStoreConfig {
    storeConfig {
      code: store_code
      copyright
      locale
      logo_alt
      shortcut_icon: head_shortcut_icon
      logo_src: header_logo_src
      base_url: secure_base_url
      media_url: secure_base_media_url
    }
    currency {
      code: base_currency_code
      symbol: base_currency_symbol
    }
  }
`;
