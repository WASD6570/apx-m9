import { decodeToken } from "lib/jwt";
import type { NextApiRequest, NextApiResponse } from "next";
import parseBearerToken from "parse-bearer-token";

// type middlewareCallback = (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   ...args: any[]
// ) => any;

// const authMiddleware = (callback: middlewareCallback) => {
//   return (req: NextApiRequest, res: NextApiResponse) => {
//     const token = parseBearerToken(req);
//     req.push({ _thing: "asdasd" });
//     if (!token) {
//       return res.status(401).send({ message: "Missing Token" });
//     }
//     const decodedToken = decodeToken(token);
//     if (decodedToken) {
//       return callback(req, res, decodedToken.id, token);
//     } else res.status(401).json({ message: "Invalid Token" });
//   };
// };
function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseBearerToken(req);
    if (!token) {
      res.status(401).send({
        message: "Missing Token",
      });
    }
    const decodedToken = decodeToken(token);
    if (decodedToken) {
      callback(req, res, decodedToken.id, token);
    } else {
      res.status(401).send({ mesagge: "Invalid Token" });
    }
  };
}
export { authMiddleware };
