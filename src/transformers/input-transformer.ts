const inputTransform = ({ body, params }: any) => {
  if (body?.price) {
    body.price = Number(body.price);
  }

  if (body?.position) {
    body.position = Number(body.position);
  }
};
export default inputTransform;
