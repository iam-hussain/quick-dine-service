type ResponderInput = {
  status?: "success" | "error";
  data?: object | Array<any> | null;
  massage?: string | null;
};

export default (input?: ResponderInput) => {
  const { data = null, massage = "", status = "success" } = input || {};

  return {
    status,
    massage,
    data,
  };
};
