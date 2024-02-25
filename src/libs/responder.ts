type ResponderInput = {
  status?: "success" | "error";
  data?: object | Array<any> | null | unknown;
  massage?: string | null;
};

export default (input?: ResponderInput) => {
  const { data = null, massage = null, status = "success" } = input || {};

  return {
    status,
    massage,
    data,
  };
};
