//----------------------------------Get All Orders------------------
export const getAllOrders = async (token: string) => {
    const res = await fetch(`${process.env.BASE_URL_DBS}/api/order/getAllOrders`, {
        headers: {
            "token": token
        }
    });
    return res.json().then((data) => {
        return data
    })
}