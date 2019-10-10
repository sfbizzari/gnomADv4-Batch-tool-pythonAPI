import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql'

import { xPosition } from '../../utilities/position'
import { UserVisibleError } from '../errors'

import { ReferenceGenomeType } from './referenceGenome'

export const RegionType = new GraphQLObjectType({
  name: 'Region',
  fields: {
    reference_genome: { type: new GraphQLNonNull(ReferenceGenomeType) },
    chrom: { type: new GraphQLNonNull(GraphQLString) },
    start: { type: new GraphQLNonNull(GraphQLInt) },
    stop: { type: new GraphQLNonNull(GraphQLInt) },
  },
})

const allChromosomes = [...Array.from(new Array(22), (x, i) => `${i + 1}`), 'X', 'Y', 'M']
const chromosomeNumbers = allChromosomes.reduce(
  (acc, chrom, i) => ({
    ...acc,
    [chrom]: i + 1,
  }),
  {}
)

export const resolveRegion = (ctx, { chrom, start, stop }, referenceGenome) => {
  if (chromosomeNumbers[chrom] === undefined) {
    throw new UserVisibleError(`Invalid chromosome: "${chrom}"`)
  }

  return {
    reference_genome: referenceGenome,
    chrom,
    start,
    stop,
    // xstart/xstop are not queryable, but may be used by other resolvers
    xstart: xPosition(chrom, start),
    xstop: xPosition(chrom, stop),
  }
}