//---foreign Columns Setting
export let cp = ["red", "black", "blue", "green", "orange", "yellow"];

export const saleCatagory = {
  Households: "5",
  Clothing: "20",
  Food: "35",
  Electronics: "50",
  Vehicles: "65",
  "Land/House": "80",
  Others: "100",
};
export const saleUsage = { New: "100", Used: "75", All: "1" };

export const iservicei_Menu = {
  Home: {
    content: "Shoping",
    icon: "home",
    title: "Home",
    checked: false,
    path: "mesh",
    model: "saleit",
    _auth: false,
  },
  MyShops: {
    content: "what did i bought ?",
    icon: "shop",
    title: "MyShops",
    checked: false,
    path: "MyShops",
    model: "saleitClient",
    _auth: false,
  },
  MyServices: {
    content: "Shoping",
    icon: "store",
    title: "MyServices",
    checked: false,
    path: "MyServices",
    model: "saleit",
    _auth: true,
  },
};

export const _createTitle = [
  "Creating Product & Services",
  "Succefully Created",
  "Please Try Again",
];
export const _updateTitle = [
  "Updating Product & Services",
  "Succefully Updated",
  "Please Try Again",
];
export const _readTitle = ["Fetching Product & Services", "Done", "No Data"];
export const _deleteTitle = [
  "Deleting Product & Services",
  "Succefully Deleted",
  "Please Try Again",
];

export const httpStatusCodes = {
  200: "OK",
  201: "Created",
  202: "Accepted",
  204: "No Content",
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  // Add more status codes as needed
};
