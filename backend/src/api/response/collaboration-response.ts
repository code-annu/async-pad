import { CollaborationOutput } from "../../application/dto/collaboration-dto";

export abstract class CollaborationResponse {
  public static toDetailResponse(
    collaboration: CollaborationOutput,
    message: string,
    code: number
  ) {
    const { document, user, sender } = collaboration;

    return {
      status: "success",
      message,
      code,
      data: {
        id: collaboration.id,
        document: {
          id: document.id,
          title: document.title,
        },
        user: {
          id: user.id,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
        sender: {
          id: sender.id,
          username: sender.username,
          avatarUrl: sender.avatarUrl,
        },
        role: collaboration.role,
        status: collaboration.status,
        acceptedAt: collaboration.acceptedAt,
        sentAt: collaboration.createdAt,
      },
    };
  }

  public static toListResponse(
    collaborations: CollaborationOutput[],
    message: string,
    code: number
  ) {
    return {
      status: "success",
      message,
      code,
      data: collaborations.map((collaboration) => {
        const { document, user, sender } = collaboration;
        return {
          id: collaboration.id,
          document: {
            id: document.id,
            title: document.title,
          },
          user: {
            id: user.id,
            username: user.username,
            avatarUrl: user.avatarUrl,
          },
          sender: {
            id: sender.id,
            username: sender.username,
            avatarUrl: sender.avatarUrl,
          },
          role: collaboration.role,
          status: collaboration.status,
          acceptedAt: collaboration.acceptedAt,
          sentAt: collaboration.createdAt,
        };
      }),
    };
  }
}
