const inputTransform = ({ body, params }: any) => {
  if (body?.price) {
    body.price = Number(body.price);
  }

  if (body?.position) {
    body.position = Number(body.position);
  }

  if (body?.tags) {
    body.tags = body.tags?.map(Number);
  }

  if (params?.id) {
    params.id = Number(params.id);
  }
};
export default inputTransform;
