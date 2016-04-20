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

/*import '../../public/dist/js/jQuery-2.1.4.min.js'
import '../../public/dist/bootstrap/js/bootstrap.min.js'
import '../../public/dist/js/app.min.js'
import '../../public/dist/js/demo.js'
import '../../public/dist/js/trinity.js'
import '../../public/dist/plugins/nicescroll/jquery.nicescroll.js'
import '../../public/dist/plugins/select2/select2.full.min.js'
import '../../public/dist/plugins/datatables/jquery.dataTables.min.js'
import '../../public/dist/plugins/datatables/dataTables.bootstrap.min.js'
import '../../public/dist/plugins/sweetalert/sweetalert.min.js'
import '../../public/dist/plugins/iCheck/icheck.min.js'
import '../../public/dist/plugins/slimScroll/jquery.slimscroll.min.js'
import '../../public/dist/js/moment.min.js'
import '../../public/dist/plugins/validator/bootstrapValidator.min.js'
import '../../public/dist/plugins/input-mask/jquery.inputmask.js'
import '../../public/dist/plugins/input-mask/jquery.inputmask.date.extensions.js'
import '../../public/dist/plugins/input-mask/jquery.inputmask.extensions.js'*/

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actionCreators';

import Footer from '../components/Footer'
import Header from '../components/Header'
import MenuContainer from './MenuContainer'
import Content from './Content'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props
    const boundActionCreators = bindActionCreators(ActionCreators, dispatch);
    return (
      <div class="wrapper">
        <Header />
        <MenuContainer />
        <Content {...boundActionCreators} store={this.props.store}/>
        <Footer />
      </div>
    )
  }
}

export default connect()(App)
