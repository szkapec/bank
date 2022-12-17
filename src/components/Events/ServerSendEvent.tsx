import { toast } from "react-toastify";
import { logOut } from "store/Login/loginSlice";

export const ServerSendEvent = (dispatch: any, userIdSelector: string) => {
  const ssEvents = new EventSource("http://localhost:5000/stream");
  ssEvents.addEventListener("message", (e) => {});

  ssEvents.addEventListener("logout_user", (e: any) => {

    if (e.data.replace(/"/g, "").split("||")[0] === userIdSelector) {
      dispatch(logOut());
      toast.info("Zostałeś wylogowany przez Admina!");
    }
  });

  ssEvents.addEventListener("ban_user", (e: any) => {
    if (e.data.replace(/"/g, "").split("||")[0] === userIdSelector) {
      dispatch(logOut());
      toast.info("Twoje konto zostało zbanowane!");
    }
  });
};
