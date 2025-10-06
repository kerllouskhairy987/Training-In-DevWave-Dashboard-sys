import toast from "react-hot-toast"

type IProps = {
    message: string;
}

export const SuccessMes = ({ message }: IProps) => {
    return (
        toast(message, {
            duration: 4000,
            position: 'top-center',

            // Styling
            style: {},
            className: '!bg-green-500 !text-white',

            // Custom Icon
            icon: '✔️',

            // Change colors of success/error/loading icon
            iconTheme: {
                primary: '#000',
                secondary: '#fff',
            },

            // Aria
            ariaProps: {
                role: 'status',
                'aria-live': 'polite',
            },

            // Additional Configuration
            removeDelay: 1000,

            // Toaster instance
            toasterId: 'default',
        })
    )
}
