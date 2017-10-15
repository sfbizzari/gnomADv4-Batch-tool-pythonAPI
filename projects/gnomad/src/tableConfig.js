export default function (onHeaderClick) {
  return ({
    fields: [
      {
        dataKey: 'variant_id',
        title: 'Variant ID',
        dataType: 'variantId',
        width: window.innerWidth - 70 - 70 - 100 - 100 - 40 - 40 - 40 - 50 - 20 - 550,
        onHeaderClick,
        // searchable: true,
      },
      // {
      //   dataKey: 'filters',
      //   title: 'Filters',
      //   dataType: 'filter',
      //   width: 70,
      //   onHeaderClick,
      // },
      {
        dataKey: 'datasets',
        title: 'Source',
        dataType: 'datasets',
        width: 70,
        onHeaderClick,
      },
      {
        dataKey: 'rsid',
        title: 'RSID',
        dataType: 'string',
        width: 70,
        onHeaderClick,
        searchable: true,
      },
      {
        dataKey: 'hgvsp',
        title: 'HGVSp',
        dataType: 'string',
        width: 100,
        onHeaderClick,
        searchable: true,
      },
      // {
      //   dataKey: 'hgvsc',
      //   title: 'HGVSc',
      //   dataType: 'string',
      //   width: 100,
      //   onHeaderClick,
      //   searchable: true,
      // },
      {
        dataKey: 'consequence',
        title: 'Consequence',
        dataType: 'consequence',
        width: 100,
        onHeaderClick,
        // searchable: true,
      },
      {
        dataKey: 'allele_count',
        title: 'AC',
        dataType: 'integer',
        width: 40,
        onHeaderClick,
      },
      {
        dataKey: 'allele_num',
        title: 'AN',
        dataType: 'integer',
        width: 40,
        onHeaderClick,
      },
      {
        dataKey: 'allele_freq',
        title: 'AF',
        dataType: 'alleleFrequency',
        width: 50,
        onHeaderClick,
      },
      {
        dataKey: 'hom_count',
        title: 'Hom',
        dataType: 'integer',
        width: 20,
        onHeaderClick,
      },
    ],
  })
}
