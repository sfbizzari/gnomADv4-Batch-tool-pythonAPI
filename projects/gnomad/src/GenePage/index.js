/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-case-declarations */

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter, Route } from 'react-router-dom'

import FetchHoc from '@broad/gene-page/src/containers/FetchHoc'
import VariantTableConnected from '@broad/gene-page/src/containers/VariantTableConnected'
import { SectionTitle } from '@broad/gene-page/src/presentation/UserInterface'

import GeneInfo from './GeneInfo'
import Settings from '../Settings'
import GeneRegion from './RegionViewer'
import VariantPage from '../VariantPage'

import tableConfig from '../tableConfig'
import { fetchWithExac, fetchGnomadOnly } from './fetch'

const GenePage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #FAFAFA;
  color: black;
  margin-top: 40px;
  ${'' /* border: 5px solid yellow; */}
  width: 95%;
  flex-shrink: 0;
  @media (max-width: 900px) {
    padding-left: 0;
    align-items: center;
    margin-top: 100px;
  }
`

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 95%;
  padding-left: 60px;
  margin-bottom: 10px;
  ${'' /* border: 5px solid blue; */}

  @media (max-width: 900px) {
    padding-left: 0;
    align-items: center;
    justify-content: center;
  }
`

const TableSection = styled.div`
  margin-left: 70px;
  ${'' /* border: 1px solid green; */}
  margin-bottom: 100px;
  @media (max-width: 900px) {
    margin-left: 5px;
    align-items: center;
    margin-top: 10px;
  }
`
const VariantTable = withRouter(VariantTableConnected)

const AppGenePage = ({
  gene,
  isFetching,
}) => {
  if (isFetching || !gene) {
    return <div>Loading...!</div>
  }
  return (
    <GenePage>
      <Summary>
        <GeneInfo />
      </Summary>
      <GeneRegion />
      <TableSection>
        {/* <SectionTitle>Variant table</SectionTitle> */}
        <Settings />
        <Route path={'/gene/:gene/:variantId'} component={VariantPage} />
        {/* <Route
          exact
          path="/gene/:gene"
          component={Table}
        /> */}
        <Route
          exact
          path="/gene/:gene"
          render={() => {
            return (
              <div>
                <VariantTable
                  tableConfig={tableConfig}
                />
              </div>

            )
          }}
        />
      </TableSection>
    </GenePage>
  )
}

AppGenePage.propTypes = {
  gene: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
}
AppGenePage.defaultProps = {
  gene: null,
}

export default withRouter(FetchHoc(AppGenePage, fetchWithExac))
