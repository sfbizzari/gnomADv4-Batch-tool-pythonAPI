import queryString from 'query-string'
import PropTypes from 'prop-types'
import React from 'react'

import { parseVariantId } from '@gnomad/identifiers'

import { labelForDataset } from '../datasets'
import Link from '../Link'

const VariantLiftover = ({ variant }) => {
  if ((variant.liftover || []).length > 0) {
    const liftoverTargetReferenceGenome =
      variant.reference_genome === 'GRCh37' ? 'GRCh38' : 'GRCh37'
    const liftoverTargetDataset =
      variant.reference_genome === 'GRCh37' ? 'gnomad_r3' : 'gnomad_r2_1'

    const isPlural = variant.liftover.length > 1
    return (
      <div>
        <h3>Liftover</h3>
        <p>
          This variant lifts over to the following {liftoverTargetReferenceGenome} variant
          {isPlural ? 's' : ''}:
        </p>

        <ul>
          {variant.liftover.map(l => {
            const { chrom, pos } = parseVariantId(l.liftover.variant_id)
            return (
              <li key={l.liftover.variant_id}>
                {l.liftover.variant_id}
                <br />
                {l.datasets.includes(liftoverTargetDataset) ? (
                  <Link
                    preserveSelectedDataset={false}
                    to={{
                      pathname: `/variant/${l.liftover.variant_id}`,
                      search: queryString.stringify({ dataset: liftoverTargetDataset }),
                    }}
                  >
                    View variant in {labelForDataset(liftoverTargetDataset)}
                  </Link>
                ) : (
                  <Link
                    preserveSelectedDataset={false}
                    to={{
                      pathname: `/region/${chrom}-${Math.max(1, pos - 20)}-${pos + 20}`,
                      search: queryString.stringify({ dataset: liftoverTargetDataset }),
                    }}
                  >
                    View region in {labelForDataset(liftoverTargetDataset)}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  if ((variant.liftover_sources || []).length > 0) {
    const liftoverSourceReferenceGenome =
      variant.reference_genome === 'GRCh37' ? 'GRCh38' : 'GRCh37'
    const liftoverSourceDataset =
      variant.reference_genome === 'GRCh37' ? 'gnomad_r3' : 'gnomad_r2_1'

    const isPlural = variant.liftover_sources.length > 1
    return (
      <div>
        <h3>Liftover</h3>
        <p>
          The following {liftoverSourceReferenceGenome} variant{isPlural ? 's' : ''} lift
          {isPlural ? '' : 's'} over to this variant:
        </p>

        <ul>
          {variant.liftover_sources.map(l => {
            const { chrom, pos } = parseVariantId(l.source.variant_id)
            return (
              <li key={l.source.variant_id}>
                {l.source.variant_id}
                <br />
                {l.datasets.includes(liftoverSourceDataset) ? (
                  <Link
                    preserveSelectedDataset={false}
                    to={{
                      pathname: `/variant/${l.source.variant_id}`,
                      search: queryString.stringify({ dataset: liftoverSourceDataset }),
                    }}
                  >
                    View variant in {labelForDataset(liftoverSourceDataset)}
                  </Link>
                ) : (
                  <Link
                    preserveSelectedDataset={false}
                    to={{
                      pathname: `/region/${chrom}-${Math.max(1, pos - 20)}-${pos + 20}`,
                      search: queryString.stringify({ dataset: liftoverSourceDataset }),
                    }}
                  >
                    View region in {labelForDataset(liftoverSourceDataset)}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return null
}

VariantLiftover.propTypes = {
  variant: PropTypes.shape({
    reference_genome: PropTypes.oneOf(['GRCh37', 'GRCh38']).isRequired,
    liftover: PropTypes.arrayOf(
      PropTypes.shape({
        liftover: PropTypes.shape({
          variant_id: PropTypes.string.isRequired,
        }).isRequired,
        datasets: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
    liftover_sources: PropTypes.arrayOf(
      PropTypes.shape({
        source: PropTypes.shape({
          variant_id: PropTypes.string.isRequired,
        }).isRequired,
        datasets: PropTypes.arrayOf(PropTypes.string).isRequired,
      })
    ),
  }).isRequired,
}

export default VariantLiftover
