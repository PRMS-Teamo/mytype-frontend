import axios from "axios";
import type {User} from "../store/userStore.ts";

export default function useProfile() {
  async function saveUser(user: User) {
    try {
      // const res = await axios.patch(
      //   `${import.meta.env.VITE_BACKEND_URL}/users`
      //
      // )
      console.log('test')
    } catch (e) {
      console.log(e);
    }
  }
  return {
    saveUser,
  }
}