import {
  ASYNC_FLAGS,
  CollectionsType,
  RESPONSE_MESSAGES,
  UserType,
} from "@/utils/constants";
import DBManager from "./dbManager";
import { setDataInAsync } from "@/utils/helpers";

class Controller {
  public static fetchAllEvents = async () => {
    try {
      const events = await DBManager.getAllDocumentsFromCollection(
        CollectionsType.events
      );
      return events || [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public static registerUser = async (userData: UserType) => {
    let msg = RESPONSE_MESSAGES.somethingWentWrong;
    let success = false;
    try {
      const user = await DBManager.getDocumentFromDatabase(
        CollectionsType.users,
        userData?.email
      );
      if (user) {
        msg = RESPONSE_MESSAGES.alreadyRegistered;
      } else {
        success = true;
        msg = RESPONSE_MESSAGES.registerSuccess;
        await DBManager.storeDataInDatabase(
          userData,
          CollectionsType.users,
          userData?.email
        );
      }
    } catch (e) {
      console.error(e);
      msg = RESPONSE_MESSAGES.somethingWentWrong;
    }
    return { success, msg };
  };

  public static loginUser = async (email: string, password: string) => {
    try {
      const user = await DBManager.getDocumentFromDatabase(
        CollectionsType.users,
        email
      );
      if (user && user?.password === password) {
        await setDataInAsync(ASYNC_FLAGS.user, user);
        return true;
      }
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
}

export default Controller;
