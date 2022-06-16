import React, { Component } from 'react'
import Footer from '../components/Footer'
import Navbar, { NavbarEmpty } from '../components/Navbar'
import Label from '../components/Label'
import { EmptyCard} from '../components/Card'
import { EmptyRow} from '../components/Row'
import Page from '../components/Page'
import Container from '../components/Container'
import { withRouter } from '../utils/withRouter'

class Favorite extends Component {
    state = {
        loading:false
    }
    render() {
        let skeleton = []
        for (let i = 0; i < 18; i++) {
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
                    <Navbar/>
                    <Container>
                        <Label>My Favorite List</Label>
                        <EmptyRow>
                            {skeleton}
                        </EmptyRow>
                    </Container>
                    <Footer />
                </Page  >
            )
        }
  }
}

export default withRouter(Favorite)