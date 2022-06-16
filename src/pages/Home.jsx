import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import {Card, EmptyCard} from '../components/Card'
import { NowPlayingRow, EmptyRow } from '../components/Row'
import Page from '../components/Page'
import Container from '../components/Container'
import axios from 'axios'
import { withRouter } from '../utils/withRouter'

class Home extends Component {
    state = {
        movieList: [],
        movieFavorit: [],
        loading: true,
        theme:'light',
    }
    componentDidMount() {
        this.fetchData()
    }
    fetchData() {
        axios.get(
            `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
    goToDetail(id) {
        this.props.navigate(`movie/${id}`)
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
                                        goToDetail={() => this.goToDetail(movie.id)}
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
}

export default withRouter(Home)