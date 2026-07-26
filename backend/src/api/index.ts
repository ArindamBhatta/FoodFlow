import express, {
  Request,
  Response,
  IRouter,
  RequestHandler,
  Router,
} from "express";
import { RouteDefinition } from "./route";
import { HttpMethod, ApiVersion } from "../constants";
import routes from "./route";
import { BusinessLogicError } from "./utils/Error";

const router: Router = express.Router();

export default (): IRouter => {
  // Apply authentication to GET routes (e.g., protected resources like vendor profile)
  const getMWs: RequestHandler[] = [];
  // Leave POST routes unauthenticated here (e.g., login). Apply per-route auth if needed.
  const postMWs: RequestHandler[] = [];

  const patchMWs: RequestHandler[] = [];

  // Route for GET requests with ID parameter
  router.get(
    "/:apiversion/:service/:action?",
    ...getMWs,
    async (req: Request, res: Response) => {
      await callService(HttpMethod.GET, req, res);
    }
  );

  // Route for POST requests
  router.post(
    "/:apiversion/:service/:action?",
    ...postMWs,
    async (req: Request, res: Response) => {
      await callService(HttpMethod.POST, req, res);
    }
  );

  // Route for PATCH requests
  router.patch(
    "/:apiversion/:service/:action?",
    ...patchMWs,
    async (req: Request, res: Response) => {
      await callService(HttpMethod.PATCH, req, res);
    }
  );

  return router;
};

const callService = async (method: HttpMethod, req: Request, res: Response) => {
  const apiVersion: string = (req.params.apiversion as string) || ApiVersion.V1;
  const servicePart: string = req.params.service as string;
  const actionPart: string = req.params.action as string;

  // Combine segments if action exists and is not a number (which would be an id)
  let serviceName = servicePart;
  if (actionPart && isNaN(Number(actionPart))) {
    serviceName = `${servicePart}-${actionPart}`;
  }

  console.log("callService", { method, apiVersion, serviceName, actionPart });

  let serviceDef: RouteDefinition | undefined;

  switch (apiVersion) {
    case ApiVersion.V1:
    case ApiVersion.V2:
      serviceDef = routes[method]?.[serviceName];
      break;
    default:
      // Try combining segments (e.g., /customer/login -> customer-login)
      serviceDef = routes[method]?.[`${apiVersion}-${serviceName}`];
      if (!serviceDef) {
        return res
          .status(404)
          .json({ success: false, message: "Service not found" });
      }
  }

  if (!serviceDef) {
    return res
      .status(404)
      .json({ success: false, message: "Service not found" });
  }

  try {
    // Build a payload that our controllers expect
    const payload = { req, res } as any;

    let result: any;

    // If an array, meaning there are middlewares + controller
    if (Array.isArray(serviceDef)) {
      const middlewares = serviceDef.slice(0, -1) as RequestHandler[];
      const controller = serviceDef[serviceDef.length - 1] as any;
      //1st  Execute middlewares sequentially
      for (const middleware of middlewares) {
        await new Promise<void>((resolve, reject) => {
          (middleware as RequestHandler)(req, res, (err?: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
        // If middleware already sent a response, stop further processing
        if (res.headersSent) return;
      }
      //2nd  Execute controller
      result = await controller(payload);
    } else {
      // It's a single controller function
      result = await serviceDef(payload);
    }

    if (result !== undefined && !res.headersSent) {
      let statusCode = 200;
      if (typeof result === 'object' && result.statusCode) {
        statusCode = result.statusCode;
        delete result.statusCode;
      } else if (method === HttpMethod.POST) {
        const isLogin = serviceName.toLowerCase().includes('login') ||
          serviceName.toLowerCase().includes('signin');
        statusCode = isLogin ? 200 : 201;
      }

      return res.status(statusCode).json({
        success: true,
        ...(typeof result === 'object' ? result : { data: result })
      });
    }

    return;
  } catch (error: any) {
    console.error("callService error:", error);
    const statusCode = error.statusCode || 500;
    return res
      .status(statusCode)
      .json({
        success: false,
        message: error.message || "Internal server error"
      });
  }
};
