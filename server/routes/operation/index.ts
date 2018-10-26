import { Request, Response, Router } from "express";
import { Operation } from "./helper";

export class OperationRoutes {

    private router: Router = Router();

    public getRouter(): Router {

        this.router.post("/start", async (request: Request, response: Response) => {
            try {

                const progressId = request.body.progressId;

                if (!progressId) {
                    return response.json({
                        status: false,
                        message: "You didn't send progressId. Please send (1, 2 or 3).",
                    });
                }

                switch (progressId) {

                    // Progress bar 1
                    case 1: {
                        Operation.longOperationStartAndFinish();

                        return response.json({
                            progressId: progressId,
                            status: true,
                            message: "Operation started and it will finish and user is not able to cancel it.",
                        });

                    }
                    // Progress bar 2
                    case 2: {
                        Operation.longOperationStartAndStopInTheMiddle();

                        return response.json({
                            progressId: progressId,
                            status: true,
                            message: "Operation started and this progress bar will stop on 50%. We are simulating error exception.",
                        });

                    }
                    // Progress bar 3
                    case 3: {
                        Operation.longOperationStartAndStopOnUserCancel();

                        return response.json({
                            progressId: progressId,
                            status: true,
                            message: "Response returned immediatelly from a server as a info that operation start in a background. " +
                            "This operation will thrown an error on 50%.",
                        });

                    }
                    default: {
                        return response.json({
                            status: true,
                            message: "You sent progressId: " + progressId + " which is not valid. Please send (1, 2 or 3 ).",
                        });
                    }
                }

            } catch (e) {
                return response.json(e);
            }
        });

        return this.router;

    }

}
