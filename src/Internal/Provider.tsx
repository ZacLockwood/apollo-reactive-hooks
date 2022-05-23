import React, { createContext, useContext, useMemo } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import QueryStore from "./Stores/Query";
import SchemaStore from "./Stores/Schema";
import { ApolloReactiveHooksSchemaOptions } from "./Types";
import {
  apolloReactiveHooksSchemaOptions,
  setApolloReactiveHooksID,
  setMobxMode,
  setObjectFactory,
} from "./Decorators";

const defaultSchemaStore = new SchemaStore({});
const defaultQueryStore = new QueryStore(defaultSchemaStore);

const ApolloReactiveHooksContext = createContext<{
  queryStore: QueryStore;
}>({
  queryStore: defaultQueryStore,
});

type ApolloReactiveHooksProviderProps = {
  client: ApolloClient<any>;
  schemaOptions?: ApolloReactiveHooksSchemaOptions;
};

const ApolloReactiveHooksProvider: React.FC<
  ApolloReactiveHooksProviderProps
> = ({ client, schemaOptions, children }) => {
  const value = useMemo(() => {
    if (schemaOptions) {
      Object.keys(schemaOptions).forEach((typename) => {
        const def = schemaOptions[typename];
        if (def.idPropName) {
          setApolloReactiveHooksID(typename, def.idPropName);
        }
        if (def.mobxMode) {
          setMobxMode(typename, def.mobxMode);
        }
        if (def.objectFactory) {
          setObjectFactory(typename, def.objectFactory, true);
        }
      });
    }
    const schemaStore = new SchemaStore(apolloReactiveHooksSchemaOptions);
    const queryStore = new QueryStore(schemaStore);
    return {
      queryStore,
    };
  }, [schemaOptions]);

  return (
    <ApolloProvider client={client}>
      <ApolloReactiveHooksContext.Provider value={value}>
        {children}
      </ApolloReactiveHooksContext.Provider>
    </ApolloProvider>
  );
};

ApolloReactiveHooksProvider.defaultProps = {
  schemaOptions: {},
};

export const useApolloReactiveHooksContext = () =>
  useContext(ApolloReactiveHooksContext);

export default ApolloReactiveHooksProvider;
