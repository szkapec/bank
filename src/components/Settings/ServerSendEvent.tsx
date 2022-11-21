import { toast } from "react-toastify";
import { logOut } from "store/Login/loginSlice";

export const ServerSendEvent = (dispatch: any, userIdSelector: string) => {
  const ssEvents = new EventSource("http://localhost:5000/stream");
  ssEvents.addEventListener("message", (e) => {});

  ssEvents.addEventListener("logout_user", (e: any) => {
    if (e.data.replace(/"/g, "") === userIdSelector) {
      dispatch(logOut());
      toast.success("Zostałeś wylogowany przez Admina!");
    }
  });
};
