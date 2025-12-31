import { injectable } from "inversify";
import { ISessionRepository } from "../../domain/repository/ISessionRepository";
import { Session, SessionCreate } from "../../domain/entities/session-entity";
import { SessionModel } from "../model/session-model";
import { SessionMapper } from "../mapper/session-mapper";
import { NotFoundError } from "../../domain/error/NotFoundError";

@injectable()
export class SessionRepository implements ISessionRepository {
  async create(session: SessionCreate): Promise<Session> {
    const newSession = new SessionModel(session);
    const savedSession = await newSession.save();
    return SessionMapper.toDomain(savedSession);
  }

  async delete(id: string): Promise<Session> {
    const deletedSession = await SessionModel.findByIdAndDelete(id);
    if (!deletedSession) {
      throw new Error(`Session with id ${id} not found`);
    }
    return SessionMapper.toDomain(deletedSession);
  }

  async findById(id: string): Promise<Session | null> {
    const session = await SessionModel.findById(id);
    return session ? SessionMapper.toDomain(session) : null;
  }

  async findByToken(token: string): Promise<Session | null> {
    const session = await SessionModel.findOne({ token });
    return session ? SessionMapper.toDomain(session) : null;
  }

  async findByUserId(userId: string): Promise<Session | null> {
    const session = await SessionModel.findOne({ userId });
    return session ? SessionMapper.toDomain(session) : null;
  }

  async deleteByUserId(userId: string): Promise<Session> {
    const deletedSession = await SessionModel.findOneAndDelete({ userId });
    if (!deletedSession) {
      throw new NotFoundError(`Session with userId ${userId} not found`);
    }
    return SessionMapper.toDomain(deletedSession);
  }

  async deleteByToken(token: string): Promise<Session> {
    const deletedSession = await SessionModel.findOneAndDelete({ token });
    if (!deletedSession) {
      throw new NotFoundError(`Session with token ${token} not found`);
    }
    return SessionMapper.toDomain(deletedSession);
  }
}
