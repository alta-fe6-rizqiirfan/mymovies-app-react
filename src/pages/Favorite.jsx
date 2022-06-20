import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { reduxAction } from '../utils/redux/actions/action'
import { useNavigate } from 'react-router-dom'

import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import { EmptyCard,Card } from '../components/Card'
import {RowLabel, EmptyRow} from '../components/Row'
import Page from '../components/Page'
import Container from '../components/Container'
import { FaStar } from 'react-icons/fa'

const Favorite = () => {
    const dispatch = useDispatch()
    const favorite = useSelector((state) => state.favorite)
    const navigate = useNavigate()
    const loading = useSelector((state)=>state.loading)
    const skeleton = []

    function delFavorite(movie_id) {
        let newFavorite = favorite.slice()
        let idx = favorite.findIndex((search)=>search.id === movie_id) 
        newFavorite.splice(idx, 1)
        localStorage.setItem("favoriteMov", JSON.stringify(newFavorite))
        dispatch(reduxAction("SET_FAVORITE", newFavorite))
    }

    function goToDetail(id) {
        navigate(`../movie/${id}`,{replace:true})
    }
    
    for (let i = 0; i < 18; i++) {
        skeleton.push(<EmptyCard key={i} />)
    }
    if (loading) {
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
                    <RowLabel title="Favorite list" icon={<FaStar className='text-xs mr-1' />}>
                        {favorite.map((movie) => (
                            <Card key={movie.id}
                                title={movie.title}
                                poster={movie.poster_path}
                                rating={movie.vote_average}
                                release={movie.release_date}
                                goToDetail={() => goToDetail(movie.id)}
                                isFavorite={true}
                                delFavorite={() => delFavorite(movie.id)}
                            />
                        ))}
                    </RowLabel>
                </Container>
                <Footer />
            </Page  >
        )
    }
}

export default Favorite