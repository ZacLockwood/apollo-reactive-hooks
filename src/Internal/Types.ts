export type ApolloReactiveHooksMobXMode =
  | "Disabled"
  | "UseAutoObservable"
  | "UseAnnotations";

export type ApolloReactiveHooksDomainOptions = {
  idPropName?: string;
  mobxMode?: ApolloReactiveHooksMobXMode;
  objectFactory?: () => Object;
};

type ApolloReactiveHooksCompleteDomainOptions = {
  idPropName: string;
  mobxMode: ApolloReactiveHooksMobXMode;
  objectFactory: () => Object;
};

export type ApolloReactiveHooksSchemaOptions = {
  [typename: string]: ApolloReactiveHooksDomainOptions;
};

export type ApolloReactiveHooksCompleteSchemaOptions<T extends string> = Record<
  T,
  ApolloReactiveHooksCompleteDomainOptions
>;

export enum SchemaObjectValues {
  SchemaObject = "SchemaObject",
  SchemaArray = "SchemaArray",
  NonSchemaValue = "NonSchemaValue",
  NonSchemaArray = "NonSchemaArray",
  EmptyArray = "EmptyArray",
  Falsey = "Falsey",
}

export type ServerResponseObj = { [key: string]: any };

export type ServerSchemaObj = {
  __typename: string;
} & { [key: string]: any };

export type MinifiedTreeRoot = {
  [key: string]: MinifiedTreeNode | MinifiedTreeNode[];
};

export type MinifiedTreeNode = {
  __typename: string;
  id: string;
} & {
  [key: string]: MinifiedTreeNode | MinifiedTreeNode[];
};
