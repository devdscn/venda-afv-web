import axios from 'axios';

import {
  ERROR_ACCESS_DANIED,
  ERROR_CONNECTION,
} from '../../constants/errosStatus';
import { MethodsEnum } from '../../enums/methods.enum';

export default class ConnectionAPI {
  static async call<T>(url: string, metdod: string, body?: unknown) {
    switch (metdod) {
      case MethodsEnum.GET:
        return (await axios.get<T>(url)).data;

      case MethodsEnum.DELETE:
        return (await axios.delete<T>(url)).data;

      case MethodsEnum.POST:
        return (await axios.post<T>(url, body)).data;

      case MethodsEnum.PUT:
        return (await axios.put<T>(url, body)).data;

      case MethodsEnum.PATCH:
        return (await axios.patch<T>(url, body)).data;
    }
  }

  static async connect<T>(url: string, metdod: string, body?: unknown) {
    return ConnectionAPI.call<T>(url, metdod, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DANIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }
    });
  }
}

export const connectionAPIGet = async <T>(url: string) => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.GET);
};

export const connectionAPIDelete = async <T>(url: string) => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);
};

export const connectionAPIPost = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <T>(url: string, body: unknown) => {
  return ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
};
