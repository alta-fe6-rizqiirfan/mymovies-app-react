import React, { useState,useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import { Card, EmptyCard } from '../components/Card'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert';
import { RowLabel, EmptyRow } from '../components/Row'
import { FaPlay } from 'react-icons/fa'
import Page from '../components/Page'
import Container from '../components/Container'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { reduxAction } from '../utils/redux/actions/action'
import { useDispatch,useSelector } from 'react-redux'

const Home = () => {
    const dispatch = useDispatch()
    const favorite = useSelector((state) => state.favorite)
    const [movieList,setMovieList]= useState([])
    const [loading, setLoading] = useState(true)
    const [snack, setSnack] = useState(false)
    const [condition, setCondition] = useState()
    const navigate = useNavigate()

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    
    useEffect(() => {
        fetchData()
    }, [])
    
    function fetchData() {
        axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        ).then((res) => {
            const {results} = res.data
            setMovieList(results)
        }).catch((err) => {
            alert(err)
        }).finally(()=> setLoading(false))
    }
    function goToDetail(id) {
        navigate(`movie/${id}`)
    }
    function addFavorite(movie) {
        let storageFavorite = localStorage.getItem("favoriteMov")
        if (storageFavorite) {
            const temp = JSON.parse(storageFavorite)
            temp.push(movie)
            localStorage.setItem("favoriteMov", JSON.stringify(temp))
            dispatch(reduxAction("SET_FAVORITE",temp))
        } else {
            localStorage.setItem("favoriteMov",JSON.stringify([movie]))
            dispatch(reduxAction("SET_FAVORITE",[movie]))
        }
        setSnack(true)
        setCondition('add')
    }

    function delFavorite(movie_id) {
        let newFavorite = favorite.slice()
        let idx = favorite.findIndex((search)=>search.id === movie_id) 
        newFavorite.splice(idx, 1)
        localStorage.setItem("favoriteMov", JSON.stringify(newFavorite))
        dispatch(reduxAction("SET_FAVORITE", newFavorite))
        setSnack(true)
        setCondition('del')
    }

    const closeSnack = () => {
        setSnack(false)
    }
    
    if (loading) {
        let skeleton = []
        for (let i = 0; i < 20; i++) {
            skeleton.push(<EmptyCard key={i} />)
        }
        return (
            <Page>
                <NavbarEmpty />
                <Container>
                    <EmptyRow>
                        {skeleton}
                    </EmptyRow>
                </Container>
            </Page>
        )
    } else {
        return (
            <Page>
                <Navbar />
                <Container>
                    <RowLabel title ="Now Playing" icon = {<FaPlay className='text-xs mr-1'/>}>
                    {
                        movieList.map((movie) =>
                            (
                                <Card key={movie.id}
                                    title={movie.title}
                                    poster={movie.poster_path}
                                    rating={movie.vote_average}
                                    release={movie.release_date}
                                    goToDetail={() => goToDetail(movie.id)}
                                    addFavorite={() => addFavorite(movie)}
                                    isFavorite={favorite.find((search) => search.id === movie.id)}
                                    delFavorite={()=> delFavorite(movie.id)}
                                />
                            )
                        )
                    }            
                    </RowLabel>
                    <Snackbar
                        anchorOrigin={{vertical:'bottom',horizontal:'right'}}
                    open={snack}
                    onClose={closeSnack}
                    autoHideDuration={2000}
                    >
                        {condition === "add" ?
                            (
                                <Alert onClose={closeSnack} severity="success" sx={{ width: '100%' }}>
                                    Success Added to My Favorite List
                                </Alert>
                            ) : (
                                <Alert onClose={closeSnack} className="bg-red-900" severity="error" sx={{ width: '100%' }}>
                                    Success Remove from My Favorite List
                                </Alert>
                            )
                        }
                    </Snackbar>
                </Container>
                <Footer />
            </Page>
        )
    }
}

export default Home