import { Request, Response } from "express";

export type IRequest = Request;
export type IResponse = Response;

export const respondWithResult = (
  req: IRequest,
  res: IResponse,
  statusCode = 200
) => (entity: any) => {
  try {
    const message = {
      msg: "Success",
      statusCode,
      payload: entity,
    };
    res.status(200).send(message);
  } catch (error) {
    res.status(500).send("Server Fails");
  }
};

export const handleEntityNotFound = (
  req: IRequest,
  res: IResponse,
  statusCode = 404
) => ({
  msg = "Entity not found",
  code = "EntityNotFoundException",
}: {
  msg: string;
  code?: string;
}) => {
  try {
    const message = {
      msg: msg,
      code: code,
      statusCode,
    };
    res.status(404).send(message);
  } catch (error) {
    res.status(404).send(msg);
  }
};

export const handleTokenError = (
  req: IRequest,
  res: IResponse,
  statusCode = 401
) => ({
  msg = "Token Error",
  code = "TokenErrorException",
}: {
  msg: string;
  code?: string;
}) => {
  const message = {
    msg: msg,
    code: code,
    statusCode,
  };
  res.status(statusCode).send(message);
};

export const handleForbiddenAction = (
  req: IRequest,
  res: IResponse,
  statusCode = 403
) => ({
  msg = "Forbidden",
  code = "ForbiddenActionException",
}: {
  msg: string;
  code?: string;
}) => {
  const message = {
    msg: msg,
    code: code,
    statusCode,
  };
  res.status(403).send(message);
  return null;
};

export const handleError = (
  req: IRequest,
  res: IResponse,
  statusCode = 500
) => (err: any) => {
  const message = {
    msg: err.message,
    error: err,
    statusCode,
  };

  res.status(statusCode).send(message);
};
