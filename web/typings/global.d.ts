import {IMoonConfig} from "moon-core/declarations/typings/config";

declare const __DEV__: boolean;

declare const System: {
  import(module: string): Promise<any>;
};

declare interface AsyncResult<T> {
  res: T;
  err: Error;
}


declare interface TResult {
  code: string
  message: string
  context: any
}

declare interface Window {
  moon:{
    context:{
      pwd:string;
      projectName:string;
      apiIndex:{
        [controllerName:string]:object
      };
      pageDb:{
        [controllerName:string]:object
      };
      moonConfig:IMoonConfig;
    }
  }
}