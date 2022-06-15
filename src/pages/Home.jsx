import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import {Card, EmptyCard} from '../components/Card'
import { NowPlayingRow,EmptyRow } from '../components/Row'
import Container from '../components/Container'
import axios from 'axios'

export class Home extends Component {
    state = {
        movieList: [
            {
                id: 1,
                title: 'Star Wars Episode I',
                release: '1999',
                rating: 4.5,
                poster: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVzgBIcQs0LD4w3RXnKFoG6wSFlDO4IYn25nX3ZDoHRHPosZmL'
            },
            {
                id: 2,
                title: 'Star Wars Episode II',
                release: '2002',
                rating: 4.5,
                poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQPtk7GiMroneSay3d9NAjmyULHCz0wvDyL4aJd39S_qp4BOo9J'
            },
            {
                id: 3,
                title: 'Star Wars Episode III',
                release: '2005',
                rating: 4.5,
                poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfyoVPjY_kCTpEDw7oUySjrgBP25iiC0DxfICJ5VH4SkuVlWHI'
            },
            {
                id: 4,
                title: 'Star Wars Episode IV',
                release: '1977',
                rating: 4.5,
                poster: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSivwhA7pSNEMKFs_CmDbg9xhshhQdUGWeLUPlejL2qjm2LDwZg'
            },
            {
                id: 5,
                title: 'Star Wars Episode V',
                release: '1980',
                rating: 4.5,
                poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS-66DuPU8AgfvKv30sUpSVqTyRViBHTgjVBsftkL2gloK0lQ-p'
            },
            {
                id: 6,
                title: 'Star Wars Episode VI',
                release: '1983',
                rating: 4.5,
                poster: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGaq8o-5msQtc1OO8ptx_GXv4PdqWNRwUhBGkmhqc1Bw2ruQIY'
            },
            {
                id: 7,
                title: 'Star Wars The Force Awaken',
                release: '2015',
                rating: 4.5,
                poster: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSHJDX40pbMLcIpUBuZUFS01n7pfdKHDqXXBTan2ueBnUfKCTp1'
            },
            {
                id: 8,
                title: 'Star Wars The Last Jedi',
                release: '2017',
                rating: 4.5,
                poster: 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSU12gMo3rh9vF-0rmHrpDPEihSd5dHBnxAs7gwZWY5WPZEKgGQ'
            },
            {
                id: 9,
                title: 'Star Wars The Rise Of Skywalker',
                release: '2019',
                rating: 4.5,
                poster: 'https://cdn.cgv.id/uploads/movie/pictures/19042900.jpg'
            },
        ],
        movieFavorit: [],
        loading: true,
        theme:'light',
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        axios.get(
            "https://api.themoviedb.org/3/movie/now_playing?api_key=c1710d20ea4f07d19c21aadbae4cb062&language=en-US"
        ).then((res) => {
            const {results} = res.data
            this.setState({ movieList: results})
        }).catch((err) => {
            alert(err)
        }).finally(()=> this.setState({loading:false}))
    }
    addFavorit(movie) {
        let temp = this.state.movieFavorit.slice()
        temp.push(movie)
        this.setState({ movieFavorit: temp })
    }
    changeTheme() {
        if (this.state.theme === 'dark') {
            this.setState({theme : 'light'},()=>document.documentElement.classList.remove('dark'))
        } else if (this.state.theme === 'light') {
            this.setState({theme : 'dark'},()=>document.documentElement.classList.add('dark'))
        }
    }
    
    render() {
        let skeleton = []
        for (let i = 0; i < 20; i++) {
            skeleton.push(<EmptyCard key={i} />)
        }

        if (this.state.loading) {
            return (
                <div className='bg-slate-200 dark:bg-slate-900'>
                    <NavbarEmpty />
                    <Container>
                        <EmptyRow>
                            {skeleton}
                        </EmptyRow>
                    </Container>
                </div>
            )
        } else {
            return (
                <div className='bg-slate-200 dark:bg-slate-900'>
                    <Navbar onClick={() => this.changeTheme()} theme={ this.state.theme } />
                    <Container>
                        <NowPlayingRow>
                        {
                            this.state.movieList.map((movie) =>
                                (
                                    <Card key={movie.id}
                                        title={movie.title}
                                        poster={movie.poster_path}
                                        rating={movie.vote_average}
                                        release={movie.release_date}
                                        onClick={() => this.addFavorit(movie)}
                                    />
                                )
                            )
                        }            
                        </NowPlayingRow>
                    </Container>
                    <Footer />
                </div>
            )
        }
  }
}

export default Home