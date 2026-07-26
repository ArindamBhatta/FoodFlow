import { ControllerPayload } from "../../../constants";

export default interface ICustomerController {
  signUp: (payload: ControllerPayload) => any;
  signIn: (payload: ControllerPayload) => any;
  addToWishlist: (payload: ControllerPayload) => any;
  profileDetails: (payload: ControllerPayload) => any;
  addDetailsOfUser: (payload: ControllerPayload) => any;
  allWishlistFood: (payload: ControllerPayload) => any;
  createOrder: (payload: ControllerPayload) => any;
}
