import React from "react"

export const withRouter = (Component) => {
    const Wrapper = (props) => {
        const params = useParams()
        const navigate = useNavigate()

        return (<Component {...props} params={params} navigate={navigate}/>)
    }
    return Wrapper
}