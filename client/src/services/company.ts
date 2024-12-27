import { request } from "./general"


type TCompanyUpdate = {
  currentid: number,
  amount: any,
  amountDonat: any, 
  donator: string, 
  owner: string
}

const apiAddCompany = (data: any) => {
  return request({
    url: `/company`,
    method: "post",
    data,
    headers: {
      'Content-Type': 'application/json'
    },
  });
};


const apiGetCompany = () => {
  return request({
    url: `company`,
    method: "get",
    headers: {
      'Content-Type': 'application/json'
    },
  });
};



const apiGetOneCompany = (id: number) => request({url: `/company/${id}`, method: "get"})
const apiUpdateCompany = (data: TCompanyUpdate ) => request({url: `/company`, method: "put", data})



export {
  apiAddCompany,
  apiGetCompany,
  apiGetOneCompany,
  apiUpdateCompany
}