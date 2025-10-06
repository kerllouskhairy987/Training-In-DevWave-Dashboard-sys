import toast from "react-hot-toast"

type IProps = {
    message: string;
}

export const ErrorMes = ({ message }: IProps) => {
    toast(message, {
        duration: 4000,
        position: 'top-center',

        // Styling
        className: '!bg-red-500 !text-white',

        // Custom Icon
        icon: '❌',

        // Change colors of success/error/loading icon
        iconTheme: {
            primary: '#000',
            secondary: '#fff',
        },

        // Additional Configuration
        removeDelay: 1000,

        // Toaster instance
        toasterId: 'default',
    })
}
