import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import { EmptyCard} from '../components/Card'
import { EmptyRow, HeadlineRow, SimilarRow } from '../components/Row'
import { Card } from '../components/Card'
import Page from '../components/Page'
import Container from '../components/Container'
import Button from '../components/Button'
import axios from 'axios'
import { withRouter } from '../utils/withRouter'
import { FaPlus } from 'react-icons/fa'

class Detail extends Component {
    state = {
        data: {},
        similarMovies:{},
        loading:true
    }
    componentDidMount() {
        window.scrollTo(0,0)
        this.fetchData()
    }
    fetchData() {
        const {movie_id} =this.props.params
        axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        ).then((res) => {
            const { data } = res
            this.setState({ data })
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            this.fetchDataSimilarMovies()
        })
    }
    fetchDataSimilarMovies() {
        const {movie_id} =this.props.params
        axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        ).then((res) => {
            const { results } = res.data
            this.setState({ similarMovies:results })
        }).catch((err) => {
            alert(err)
        }).finally(() => {
            this.setState({ loading: false })
        })
        
    }
    convertTime (duration) {
        let h='',m=''
        if (duration-60>=0) {
            h = Math.floor(duration / 60)
            m = duration%60
        } else {
            m = duration
        }
        return h!=='' ? `${h}h ${m}m` : `${m}m`
    }
    render() {
        if (this.state.loading) {
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
            const { data,similarMovies } = this.state
            return (
                <Page>
                    <Navbar/>
                    <Container>
                        <HeadlineRow>
                            <div className='flex-1 p-4 xl:p-8'>
                                <p className='text-3xl xl:text-4xl font-monserat font-bold pl-4 xl:pl-8 border-l-8 border-l-red-900'>{data.title}</p>
                                <div className='ml-0 text-sm xl:text-base mt-4 xl:mt-6 flex flex-col gap-2'>
                                    <p>
                                        <span className='p-1 border-2 border-slate-900 dark:border-slate-100'>{ data.original_language }</span>
                                        {' . ' + this.convertTime(data.runtime) + ' . ' + data.release_date.split('-')[0]}</p>
                                    <p className='flex gap-2 mt-1 flex-wrap'>
                                        {data.genres.map((genre) => (
                                            <span key={genre.id} className='py-[0.1rem] px-2 bg-slate-900 dark:bg-slate-100 dark:text-slate-800 text-white font-bold rounded-full text-sm'>{ genre.name }</span>
                                        ))}
                                    </p>
                                    <p> <span className='font-bold text-xl'>Overview</span> <br />
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
                            <a href={data.homepage} target='_blank' rel='noreferrer' className='xl:flex-1 relative bg-no-repeat bg-cover bg-center h-[30vh] xl:h-auto' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`}}>
                                <div className='bg-gradient-to-t from-slate-100 dark:from-slate-800 xl:bg-gradient-to-r xl:from-slate-100 w-full xl:w-[50%] absolute bottom-0 xl:top-0 z-10 h-[50%] xl:h-full'></div>
                            </a>
                        </HeadlineRow>
                        <SimilarRow>
                            {
                                similarMovies.map((movie) =>
                                (
                                    <Card key={movie.id}
                                        title={movie.title}
                                        poster={movie.poster_path}
                                        rating={movie.vote_average}
                                        release={movie.release_date}
                                    />
                                ))
                            }
                        </SimilarRow>
                    </Container>
                    <Footer />
                </Page  >
            )
        }
  }
}

export default withRouter(Detail)
