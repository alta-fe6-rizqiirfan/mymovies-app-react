import { useParams, useNavigate} from "react-router-dom"

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        const navigate = useNavigate()

        return (<Component {...props} params={params} navigate={navigate}/>)
    }
    return Wrapper
}