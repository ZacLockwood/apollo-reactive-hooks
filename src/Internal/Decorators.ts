import {
  ApolloReactiveHooksMobXMode,
  ApolloReactiveHooksSchemaOptions,
} from "./Types";

export const apolloReactiveHooksSchemaOptions: ApolloReactiveHooksSchemaOptions =
  {};

export const setApolloReactiveHooksID = (
  typename: string,
  idPropName: string
) => {
  const currentIDPropName =
    apolloReactiveHooksSchemaOptions[typename]?.idPropName;
  if (currentIDPropName && currentIDPropName !== idPropName) {
    throw new Error(
      `ApolloReactiveHooks found clashing idPropName definitions for type '${typename}'. Specifically, '${currentIDPropName}' and '${idPropName}'.\nMixing @ApolloReactiveHooksID() annotations with Schema Options is OK, but you'll need to make sure each option for each type gets exactly one definition (no omissions or conflicting duplicates).`
    );
  }
  if (!apolloReactiveHooksSchemaOptions[typename]) {
    apolloReactiveHooksSchemaOptions[typename] = {};
  }
  apolloReactiveHooksSchemaOptions[typename].idPropName = idPropName;
};

export const setMobxMode = (
  typename: string,
  mobxMode: ApolloReactiveHooksMobXMode
) => {
  const currentMobxMode = apolloReactiveHooksSchemaOptions[typename]?.mobxMode;
  if (currentMobxMode && currentMobxMode !== mobxMode) {
    throw new Error(
      `ApolloReactiveHooks found clashing mobXMode definitions for type '${typename}'. Specifically, '${currentMobxMode}' and '${mobxMode}'.\nMixing @ApolloReactiveHooksID() annotations with Schema Options is OK, but you'll need to make sure each option for each type gets exactly one definition (no omissions or conflicting duplicates).`
    );
  }
  if (!apolloReactiveHooksSchemaOptions[typename]) {
    apolloReactiveHooksSchemaOptions[typename] = {};
  }
  apolloReactiveHooksSchemaOptions[typename].mobxMode = mobxMode;
};

export const setObjectFactory = (
  typename: string,
  objectFactory: () => Object,
  overwrite?: boolean
) => {
  const currentObjectFactory =
    apolloReactiveHooksSchemaOptions[typename]?.objectFactory;
  if (!currentObjectFactory || overwrite) {
    if (!apolloReactiveHooksSchemaOptions[typename]) {
      apolloReactiveHooksSchemaOptions[typename] = {};
    }
    apolloReactiveHooksSchemaOptions[typename].objectFactory = objectFactory;
  }
};

export const ApolloReactiveHooksID =
  (settings?: { typename?: string; mobxMode?: ApolloReactiveHooksMobXMode }) =>
  (target: any, propertyKey: string) => {
    const ObjConstructor = target?.constructor;
    const classOrTypeName = settings?.typename || ObjConstructor?.name;

    if (!classOrTypeName) {
      throw new Error(`ApolloReactiveHooks was unable to infer class name / typename for id property '${propertyKey}'.
      \nTry adding the 'typename' setting to your @ApolloReactiveHooksID() decorator. This should match the '__typename' value that comes back from Apollo.
      \nExample: @ApolloReactiveHooksID({ typename: "Dog" })`);
    }

    if (propertyKey) {
      setApolloReactiveHooksID(classOrTypeName, propertyKey);
    }

    if (settings?.mobxMode) {
      setMobxMode(classOrTypeName, settings.mobxMode);
    }

    if (ObjConstructor) {
      setObjectFactory(classOrTypeName, () => new ObjConstructor());
    }
  };
