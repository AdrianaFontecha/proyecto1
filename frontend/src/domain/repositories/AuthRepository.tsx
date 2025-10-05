import { User } from "../entities/User";
import { ResponseApiDelivery } from "../../data/sources/remote/models/ResponseApiDelivery";
export interface AuthRepository {
  login(email: string, password: string): Promise<ResponseApiDelivery>;
  register(user: User): Promise<ResponseApiDelivery>;
}