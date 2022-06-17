import React, { useState,useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import { EmptyCard} from '../components/Card'
import { EmptyRow, HeadlineRow, SimilarRow } from '../components/Row'
import { Card } from '../components/Card'
import Page from '../components/Page'
import Container from '../components/Container'
import Button from '../components/Button'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

const Detail = () => {
    const [data,setData]= useState({})
    const [similarMovies,setSimilarMovies]= useState({})
    const [loading,setLoading]= useState(true)
    const params = useParams()
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    
    useEffect(() => {
        if (loading) {
            fetchData()
        } else {
            window.scrollTo(0, 0)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                    <Button><FaPlus className='mr-1' /> Add To Favorite</Button>
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
