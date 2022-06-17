import React, { useState,useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import {Card, EmptyCard} from '../components/Card'
import { NowPlayingRow, EmptyRow } from '../components/Row'
import Page from '../components/Page'
import Container from '../components/Container'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const [movieList,setMovieList]= useState([])
    const [loading,setLoading]=useState(true)
    const [theme, setTheme] = useState('light')
    const navigate = useNavigate()
    
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        theme === 'dark'?document.documentElement.classList.add('dark'):document.documentElement.classList.remove('dark')
    },[theme])
    
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
    function changeTheme() {
        theme === 'dark'? setTheme('light'):setTheme('dark')
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
                <Navbar onClick={() => changeTheme()} theme={ theme } />
                <Container>
                    <NowPlayingRow>
                    {
                        movieList.map((movie) =>
                            (
                                <Card key={movie.id}
                                    title={movie.title}
                                    poster={movie.poster_path}
                                    rating={movie.vote_average}
                                    release={movie.release_date}
                                    goToDetail={() => goToDetail(movie.id)}
                                />
                            )
                        )
                    }            
                    </NowPlayingRow>
                </Container>
                <Footer />
            </Page>
        )
    }
}

export default Home