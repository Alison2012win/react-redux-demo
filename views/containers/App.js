import '../../public/dist/bootstrap/css/bootstrap.min.css'
import '../../public/dist/css/font-awesome.min.css'
import '../../public/dist/plugins/datatables/dataTables.bootstrap.css'
import '../../public/dist/plugins/select2/select2.min.css'
import '../../public/dist/plugins/iCheck/all.css'
import '../../public/dist/plugins/sweetalert/sweetalert.css'
import '../../public/dist/plugins/sweetalert/themes/facebook/facebook.css'
import '../../public/dist/plugins/validator/bootstrapValidator.min.css'
import '../../public/dist/css/budtrinity.min.css'
import '../../public/dist/css/skin-red-light.min.css'
import '../../public/dist/css/trinity.css'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Footer from '../components/common/Footer'
import Header from '../components/common/Header'
import MenuContainer from './MenuContainer'
import Content from './Content'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div class="wrapper">
        <Header />
        <MenuContainer />
        <Content />
        <Footer />
      </div>
    )
  }
}

export default App
