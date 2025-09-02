import { DocfileService } from "../../service/docfile-service";
import { Request, Response } from "express";
import { docfileCreateSchema } from "../schema/docfile-schema";
import { CustomError } from "../../error/custom-error";

export class DocfileController {
  private docfileService = new DocfileService();

  async docfilePost(req: Request, res: Response) {
    try {
      const { name, content } = req.body;
      const user = req.user;

      const docfileResponse = await this.docfileService.createNewDocfile({
        name: name,
        content: content,
        creatorId: user.userId,
      });

      res.status(201).json(docfileResponse);
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }

  async docfileGet(req: Request, res: Response) {
    try {
      const { docfileId } = req.params;
      if (!docfileId) throw Error("Include docfileId in path");

      const docfileResponse = await this.docfileService.getDocfile(docfileId);

      res.status(200).json(docfileResponse);
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }

  async docfilePatch(req: Request, res: Response) {
    try {
      const updates = req.body;
      const user = req.user;

      const { docfileId } = req.params;
      if (!docfileId) throw Error("Include docfileId in path");

      const docfileResponse = await this.docfileService.updateDocfile(
        user.userId,
        docfileId,
        updates
      );

      res.status(200).json(docfileResponse);
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }

  async docfileDelete(req: Request, res: Response) {
    try {
      const user = req.user;

      const { docfileId } = req.params;
      if (!docfileId) throw Error("Include docfileId in path");

      await this.docfileService.deleteDocfile(docfileId, user.userId);

      res
        .status(200)
        .json({ status: "success", message: "Document deleted successfully" });
    } catch (e) {
      let message: string;
      if (e instanceof CustomError) {
        res.status(e.errorType.valueOf());
        message = e.message;
      } else {
        res.status(400);
        message = (e as Error).message;
      }
      res.json({ status: "failed", message: message });
    }
  }
}
