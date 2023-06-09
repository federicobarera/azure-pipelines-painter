import { TemplateParameter } from "../utils/types";

export const initialState = {
  context: {
    variables: {
      "Build.Reason": "Manual"
    },
    __root: './',
  },
  yaml: undefined,
  jsonPipeline: undefined,
  pipeline: undefined,
}

type State = typeof initialState;
type Action = {
  type: string;
  payload: any;
}

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "UPDATE_PIPELINE":
      return {
        ...state,
        pipeline: action.payload,
      };
    case "UPDATE_CONTEXT":
      return {
        ...state,
        context: action.payload,
      }
    case "UPDATE_YAML":
      return { 
        ...state,
        yaml: action.payload.yaml,
        context: {
          parameters: {
            ...action.payload.p.reduce((acc: any, param: TemplateParameter) => ({ 
              ...acc,
              [param.name]: param.default ?? null
            }), {})
          },
          ...state.context
        }
      }
    default:
      return state;
  }
};


