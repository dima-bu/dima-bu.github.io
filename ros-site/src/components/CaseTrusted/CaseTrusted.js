import React from 'react'
import PropTypes from 'prop-types'
import CaseHeader from 'components/CaseHeader/CaseHeader.js'

class CaseTrusted extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <CaseHeader
          title='Trusted Insight'
          subTitle='iOS & Android mobile app'
          />
        <p className="case-paragraph">
          Trusted Insight is an institutional syndication platform for investment professionals from around the world. The mobile app developed by Rosberry helps its users to take financial decisions 24 hours a day, 7 days a week.
        </p>
        <h2 className="case-subtitle"></h2>
      </div>
    )
  }
}

export default CaseTrusted