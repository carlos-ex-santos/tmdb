import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()

    return (
        <div className="error-page text-center justify-content-center">
            <h1>Ooops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.status} {error.statusText || error.message}</i>
            </p>
        </div>
    )
}

export default ErrorPage