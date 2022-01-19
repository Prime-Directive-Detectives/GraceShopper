import axios from "axios";

const CREATE_USER_AND_ORDER = "CREATE_USER_AND_ORDER";

const _createUserAndOrder = (userId) => ({
  type: CREATE_USER_AND_ORDER,
  userId,
});

export const createOrderAndUser = (userInfo, localProducts) => {
  return async (dispatch) => {
    try {
      const { data: token } = await axios.post("/auth/signup", userInfo);
      if (token) {
        window.localStorage.setItem("token", token.token);
        const { data: user } = await axios.get("/auth/me", {
          headers: {
            authorization: token.token,
          },
        });
        const { data: order } = await axios.get(
          `/api/order/user/${user.id}/foc`,
          {
            headers: {
              authorization: token.token,
            },
          }
        );
        for (let i = 0; i < localProducts.length; i++) {
          await axios.post(
            `/api/order/${order.id}/${localProducts[i].productId}/${localProducts[i].qty}`,
            null,
            {
              headers: {
                authorization: token.token,
              },
            }
          );
        }
        dispatch(_createUserAndOrder(user.id));
      }
    } catch (err) {
      console.log("Error at create order and user thunk", err);
    }
  };
};

export default function guestCheckoutReducer(state = 0, action) {
  switch (action.type) {
    case CREATE_USER_AND_ORDER:
      return action.userId;

    default:
      return state;
  }
}
