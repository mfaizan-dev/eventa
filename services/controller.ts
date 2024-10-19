import {
  ASYNC_FLAGS,
  CollectionsType,
  RESPONSE_MESSAGES,
  UserType,
} from "@/utils/constants";
import DBManager from "./dbManager";
import {
  getFormattedDate,
  isEventNear,
  isPastEvent,
  setDataInAsync,
} from "@/utils/helpers";
import { randomUUID } from "expo-crypto";

class Controller {
  public static fetchAllEvents = async () => {
    try {
      const events = await DBManager.getAllDocumentsFromCollection(
        CollectionsType.events
      );
      if (events) {
        return events?.filter((event: any) => !isPastEvent(event?.dateTime));
      }
      return [];
    } catch (e) {
      console.error(e);
      return [];
    }
  };

  public static fetchAllBookedEvents = async (userId: string) => {
    try {
      const docs: any[] = [];
      const events = await DBManager.getDocumentFromDatabase(
        CollectionsType.bookings,
        "",
        [["userId", "==", userId]]
      );
      if (events) {
        for (const event of events) {
          if (event?.eventId) {
            const doc = await DBManager.getDocumentFromDatabase(
              CollectionsType.events,
              event?.eventId
            );
            if (doc && !isPastEvent(doc?.dateTime)) {
              docs.push({
                ...doc,
                bookingId: event?.id,
                bookingDate: event?.bookingDate,
              });
            }
          }
        }
      }
      return docs;
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

  public static updateProfile = async (userData: UserType) => {
    let msg = RESPONSE_MESSAGES.somethingWentWrong;
    let success = false;
    try {
      await DBManager.storeDataInDatabase(
        userData,
        CollectionsType.users,
        userData?.email
      );
      await setDataInAsync(ASYNC_FLAGS.user, userData);
      success = true;
      msg = RESPONSE_MESSAGES.profileUpdated;
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
        return user;
      }
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  public static bookEvent = async (eventId: string, userId: string) => {
    try {
      const bookings = await DBManager.getDocumentFromDatabase(
        CollectionsType.bookings,
        "",
        [
          ["userId", "==", userId],
          ["eventId", "==", eventId],
        ]
      );
      if (bookings) {
        return { success: false, msg: RESPONSE_MESSAGES.bookedAlready };
      }
      const bookingDate = getFormattedDate();
      const id = randomUUID();
      await DBManager.storeDataInDatabase(
        {
          id,
          eventId,
          userId,
          bookingDate,
        },
        CollectionsType.bookings,
        id
      );
      return {
        success: true,
        msg: RESPONSE_MESSAGES.bookingSuccess,
      };
    } catch (e) {
      console.error(e);
      return {
        success: false,
        msg: RESPONSE_MESSAGES.somethingWentWrong,
      };
    }
  };

  public static deleteBooking = async (bookingId: string) => {
    try {
      await DBManager.deleteDocFromDatabase(
        CollectionsType.bookings,
        bookingId
      );
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  public static fetchAllAlerts = async (userId: string) => {
    try {
      let docs = await this.fetchAllBookedEvents(userId);
      docs = docs?.filter((doc) => isEventNear(doc?.dateTime) >= 0);
      docs = docs?.map((doc) => ({
        title: doc?.eventName,
        date: doc?.dateTime,
        bookingDate: doc?.bookingDate,
      }));
      return docs;
    } catch (e) {
      console.error(e);
      return [];
    }
  };
}

export default Controller;
