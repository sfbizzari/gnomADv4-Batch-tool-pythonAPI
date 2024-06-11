# gnomAD v4.1 GraphQL query (using python and export to csv)

This repository is a fork of the [broadinstitute/gnomad-browser](https://github.com/broadinstitute/gnomad-browser) repository with a GraphQL API query to retrieve specific data from gnomAD and save it as a `csv`.

Please head to [this folder](https://github.com/sfbizzari/gnomad-af-hom-pop/tree/66d88911ce16259233d5b119ab15fe5e9afb5d8c/graphql-api/retrieve%20af-hom-pop)

- This is for using gnomAD's GraphQL API to retrieve allele frequencies, homozygote counts, and population specific numbers for your large list of variants (**gnomAD v4.1 dataset).

- The folder contains a [python file](https://github.com/sfbizzari/gnomad-af-hom-pop/blob/422216c6fa3acb053b7a40ac253a4d657fe2585f/graphql-api/retrieve%20af-hom-pop/retrieve-AF-Hom-Pop.py) with a specific GraphQL API query with the population parameter set to Middle East (MID).
### Requirements: 

- [Python](https://www.python.org/)
  
- Read python code with any code editor such as [Visual Studio Code](https://code.visualstudio.com/)

- The `requests` python package is required. Open the command terminal and install the library by entering the following:
```
pip install requests
```

- `time` and `csv` libraries are part of the standard Python library.

### Usage:

- Download the [python file](https://github.com/sfbizzari/gnomad-af-hom-pop/blob/422216c6fa3acb053b7a40ac253a4d657fe2585f/graphql-api/retrieve%20af-hom-pop/retrieve-AF-Hom-Pop.py) and open it in your code editor; install the necessary dependency.
  
- Prepare your list of VCF variants e.g.: 
```
"2-123450-C-T",
"11-61364336-G-A",
"18-31598655-G-A"
```

> Variants in HGVS nomenclature can be converted to VCF using [VariantValidator's batch tool](https://variantvalidator.org/service/validate/batch/), among many other tools and APIs.   

- Paste your variants in the variants variable in the python file.

- Run the code.
	- You will see the results outputted in the terminal. It will look something like this: 

```
Variant ID: 2-233760233-C-CAT
Chromosome: 2
Position: 233760233
Reference: C
Alternate: CAT

Exome Data:
  Allele Count (AC): 395737
  Allele Number (AN): 1315438
  Homozygote Count: 22055
  Allele Frequency (AF): 0.30084048050915363

Genome Data:
  Allele Count (AC): 52299
  Allele Number (AN): 151162
  Homozygote Count: 9162
  Allele Frequency (AF): 0.34597980974054326

Joint Data:
  Allele Count (AC): 448036
  Allele Number (AN): 1466600
  Homozygote Count: 31217
  Allele Frequency (AF): 0.30549297695349786

Middle Eastern Population Data:
  Allele Count (AC): 1259
  Allele Number (AN): 4002
  Homozygote Count: 78
  Allele Frequency (AF): 0.31459270364817593
```

- There is a time buffer of 5 seconds between each variant to make sure the code does not end due to too many requests. If there is an error, it will wait longer and retry a few times. 

- Once your full list of variants have been checked, it will save the results into an `csv` file named `gnomadresults.csv` This file will look something like this:
  
**Variant**     | **Exome Homozygote count** | **Exome AF** | **Genome Homozygote count** | **Genome AF** | **Joint Homozygote count** | **Joint AF** | **Middle Eastern Homozygote count** | **Middle Eastern AF** |
|-----------------|----------------------------|--------------|-----------------------------|---------------|----------------------------|--------------|-------------------------------------|-----------------------|
| 19-35848318-C-T | 0                          | 0            | 0                           | 6.57E-06      | 0                          | 6.20E-07     | 0                                   | 0                     |
| 5-161873196-G-A | 0                          | 0            | 0                           | 0             | 0                          | 0            | 0                                   | 0                     |
| 17-31261733-C-T | 0                          | 1.37E-06     | 0                           | 6.57E-06      | 0                          | 1.86E-06     | 0                                   | 0                     |

If you find this useful, please feel free to use and modify as you see fit. 

## Citation

As mentioned by the gnomad-browser repository, please cite the following if you use gnomAD data:

- [The mutational constraint spectrum quantified from variation in 141,456 humans](https://broad.io/gnomad_lof)
- [The ExAC browser: displaying reference data information from over 60 000 exomes](https://academic.oup.com/nar/article/45/D1/D840/2572071)


