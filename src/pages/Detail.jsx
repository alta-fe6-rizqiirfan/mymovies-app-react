import React, { useState,useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import { EmptyCard} from '../components/Card'
import { EmptyRow, HeadlineRow, SimilarRow } from '../components/Row'
import { Card } from '../components/Card'
import Page from '../components/Page'
import Container from '../components/Container'
import Button,{ButtonFav} from '../components/Button'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { FaTimes,FaPlus } from 'react-icons/fa'
import { reduxAction } from '../utils/redux/actions/action'
import { useDispatch,useSelector } from 'react-redux'

const Detail = () => {
    const dispatch = useDispatch()
    const favorite = useSelector((state)=>state.favorite)
    const [data,setData]= useState({})
    const [similarMovies,setSimilarMovies]= useState({})
    const [loading,setLoading]= useState(true)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchData()
    }, []) 
    
    useEffect(() => {
        if (loading) {
            fetchData()
        } else {
            window.scrollTo(0, 0)
        }
    },[loading])
    
    useEffect(() => {
        setLoading(true)
    }, [params])

    const fetchData = () => {
        const {movie_id} = params
        axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        ).then((res) => {
            const { data } = res
            setData(data)
        }).catch((err) => {
            alert(err)
        }).finally(() => fetchDataSimilarMovies())
    }

    function fetchDataSimilarMovies() {
        const {movie_id} = params
        axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        ).then((res) => {
            const { results } = res.data
            setSimilarMovies(results)
        }).catch((err) => {
            alert(err)
        }).finally(() => setLoading(false))
        
    }
    function goToDetail(id) {
        navigate(`/movie/${id}`, { replace: true })
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
    }
    function delFavorite(movie_id) {
        let newFavorite = favorite.slice()
        let idx = favorite.findIndex((search)=>search.id === movie_id) 
        newFavorite.splice(idx, 1)
        localStorage.setItem("favoriteMov", JSON.stringify(newFavorite))
        dispatch(reduxAction("SET_FAVORITE", newFavorite))
    }
    function convertTime (duration) {
        let h='',m=''
        if (duration-60>=0) {
            h = Math.floor(duration / 60)
            m = duration%60
        } else {
            m = duration
        }
        return h!=='' ? `${h}h ${m}m` : `${m}m`
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
                <Navbar/>
                <Container>
                    <HeadlineRow>
                        <div className='flex-1 p-4 xl:p-8'>
                            <p className='text-3xl xl:text-4xl font-monserat font-bold pl-4 xl:pl-8 border-l-8 border-l-red-900'>{data.title}</p>
                            <div className='ml-0 text-sm xl:text-base mt-4 xl:mt-6 flex flex-col gap-4'>
                                <p>
                                    <span className='p-1 border-2 border-slate-900 dark:border-slate-100'>{ data.original_language }</span>
                                    {' . ' + convertTime(data.runtime) + ' . ' + data.release_date.split('-')[0]}</p>
                                <p className='flex gap-2 flex-wrap'>
                                    {data.genres.map((genre) => (
                                        <span key={genre.id} className='py-[0.1rem] px-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-800 text-white font-bold rounded-full text-sm'>{ genre.name }</span>
                                    ))}
                                </p>
                                <p> <span className='font-bold text-xl leading-10'>Overview</span> <br />
                                    {data.overview}
                                </p>
                                <p className='font-bold text-center uppercase mb-8'>
                                    {data.tagline}
                                </p>
                                <p>
                                    {favorite.find((search) => search.id === data.id) ? (
                                        <ButtonFav onClick={()=>delFavorite(data.id)}><FaTimes className='mr-1' /> Favorite</ButtonFav>
                                    ): (       
                                        <Button onClick={()=>addFavorite(data)}><FaPlus className='mr-1' /> Add To Favorite</Button>
                                    )
                                    }
                                </p>
                            </div>
                        </div>
                        <a href={data.homepage} target='_blank' rel='noreferrer' className='xl:flex-1 relative bg-no-repeat bg-cover bg-center h-[30vh] xl:h-auto' style={{backgroundImage:data.backdrop_path!==null?`url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`:`url(https://image.tmdb.org/t/p/w500${data.poster_path})`}}>
                            <div className='bg-gradient-to-t from-slate-100 dark:from-slate-800 xl:bg-gradient-to-r xl:from-slate-100 w-full xl:w-[50%] absolute bottom-0 xl:top-0 z-10 h-[50%] xl:h-full'></div>
                        </a>
                    </HeadlineRow>
                    <SimilarRow>
                        {
                            similarMovies.map((movie) => {
                                if (String(movie.id) !== params.movie_id && movie.release_date!=='') {
                                    return (
                                        <Card key={movie.id}
                                        title={movie.title}
                                        poster={movie.poster_path}
                                        rating={movie.vote_average}
                                        release={movie.release_date}
                                        goToDetail={() => goToDetail(movie.id)}
                                        isFavorite={favorite.find((search) => search.id === movie.id)}
                                            addFavorite={() => addFavorite(movie)}
                                            delFavorite={()=> delFavorite(movie.id)}
                                    />)
                                } return ''
                            })
                        }
                    </SimilarRow>
                </Container>
                <Footer />
            </Page  >
        )
    }
}

export default Detail
