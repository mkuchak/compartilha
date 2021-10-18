// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(req.body.input.object); // example to how to receive data from the client
  res.status(200).json({ // model to send data to the client
    email: "johndoe@gmail.com",
    id: 1,
  });
};
