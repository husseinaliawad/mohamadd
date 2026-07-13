import { Toaster } from "react-hot-toast";


const Toasty= () =>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#fff", // لون الخلفية
            color: "#115e59", // لون النص
            border: "#9f74cc solid 1px",
            height: "5em",
            minWidth: "20em"
          },
        }}
      />
export default Toasty;
