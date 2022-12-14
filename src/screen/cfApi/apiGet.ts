import { useState } from "react";
import axios from "axios";
import { CfInfo } from "../../redux/slice/contestant-slice";

export interface DataCfInfo{
  status: string;
  result: CfInfo[];
};
type GetResponse = {
  data: DataCfInfo;
};

const apiGet = () => {
  const fetch = async (handleData, handleError,url, headers) => {
     axios.get<GetResponse>(url, headers)
      .then(response=>{
        handleData(response.data)
      })
      .catch(err=>{
        handleError()
      });

  };

  return fetch;
};

export default apiGet;
